const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const oniguruma = require('vscode-oniguruma');
const textmate = require('vscode-textmate');

const grammarPath = path.resolve(
  __dirname,
  '../../syntaxes/portugues-puro.tmLanguage.json'
);
const grammarDefinition = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));

let grammar;

test('load the POP grammar with the TextMate tokenizer', async () => {
  const wasmPath = require.resolve('vscode-oniguruma/release/onig.wasm');
  const wasm = fs.readFileSync(wasmPath);
  await oniguruma.loadWASM(wasm.buffer.slice(
    wasm.byteOffset,
    wasm.byteOffset + wasm.byteLength
  ));

  const registry = new textmate.Registry({
    onigLib: Promise.resolve({
      createOnigScanner: sources => new oniguruma.OnigScanner(sources),
      createOnigString: value => new oniguruma.OnigString(value)
    }),
    loadGrammar: async scopeName =>
      scopeName === grammarDefinition.scopeName ? grammarDefinition : null
  });
  grammar = await registry.loadGrammar(grammarDefinition.scopeName);
  assert.ok(grammar);
});

function tokenize(line) {
  assert.ok(grammar, 'the POP TextMate grammar must be initialized');
  return grammar.tokenizeLine(line).tokens;
}

function scopeAt(line, text, occurrence = 0) {
  let index = -1;
  for (let i = 0; i <= occurrence; i += 1) {
    index = line.indexOf(text, index + 1);
    assert.notEqual(index, -1, `could not find ${JSON.stringify(text)} in line`);
  }
  const token = tokenize(line).find(candidate =>
    candidate.startIndex <= index && candidate.endIndex > index
  );
  assert.ok(token, `no token found for ${JSON.stringify(text)}`);
  return token.scopes;
}

function assertHasScope(line, text, expected, occurrence = 0) {
  assert.ok(
    scopeAt(line, text, occurrence).includes(expected),
    `expected ${JSON.stringify(text)} to have ${expected} in: ${line}`
  );
}

const requiredScopes = {
  initialArticle: 'storage.type.language.article.pop',
  derivedName: 'entity.name.type.pop',
  operator: 'meta.type.declaration.simple.pop',
  baseArticle: 'storage.type.language.article.pop',
  terminator: 'punctuation.terminator.pop'
};

test('simple type declarations expose the required token scopes', () => {
  const line = 'Um nome do tipo derivado é um nome do tipo base.';
  assertHasScope(line, 'Um', requiredScopes.initialArticle);
  assertHasScope(line, 'derivado', requiredScopes.derivedName);
  assertHasScope(line, 'é', requiredScopes.operator);
  assertHasScope(line, 'um', requiredScopes.baseArticle);
  assertHasScope(line, '.', requiredScopes.terminator);
});

test('simple type fallback handles block comments between declaration tokens', () => {
  const line = 'Um [c1] nome [c2] do [c3] tipo [c4] derivado [c5] é [c6] um [c7] nome [c8] do [c9] tipo [c10] base [c11] .';
  assertHasScope(line, 'Um', requiredScopes.initialArticle);
  assertHasScope(line, 'derivado', requiredScopes.derivedName);
  assertHasScope(line, 'é', requiredScopes.operator);
  assertHasScope(line, 'um', requiredScopes.baseArticle);
  assertHasScope(line, '.', requiredScopes.terminator);
  assertHasScope(line, 'c4', 'comment.block.pop');
  assertHasScope(line, 'c10', 'comment.block.pop');
  assert.equal(scopeAt(line, 'c4').at(-1), 'comment.block.pop');

  const commentImmediatelyAfterArticle = 'Uma [comentário] coisa derivada é um tipo base.';
  assertHasScope(commentImmediatelyAfterArticle, 'comentário', 'comment.block.pop');
  assertHasScope(commentImmediatelyAfterArticle, 'derivada', requiredScopes.derivedName);
});

test('simple type fallback conservatively excludes other declarations', () => {
  const excludedDeclarations = [
    'Um pchar é um ponteiro para um byte.',
    'Um centímetro são 254/100 polegadas.',
    'Uma word é uma estrutura com Um byte denominado byte inicial.',
    'Uma referência é uma lista com Uma string.',
    'O contador é um número.',
    'A variável global é um byte.',
    'Uma coisa com nome é um tipo base.',
    'Uma coisa para nome é um tipo base.',
    'Uma coisa é um tipo, base.',
    'Uma coisa é um tipo; base.',
    'Uma coisa é um tipo: base.',
    'Uma coisa derivada são uns tipos\nbase.',
    'Um um derivado é um tipo base.',
    'Um o derivado é um tipo base.',
    'Um derivado é um a base.',
    'Um derivado com nome é um tipo base.'
  ];

  for (const line of excludedDeclarations) {
    assert.ok(
      !tokenize(line).some(token =>
        token.scopes.includes('meta.type.declaration.simple.pop')
      ),
      `unexpected simple-type scope in: ${line}`
    );
  }
});

test('multiline declarations remain available to semantic tokens, not fallback', () => {
  const firstLine = 'Um nome derivado é';
  const secondLine = 'um nome base.';
  for (const line of [firstLine, secondLine]) {
    assert.ok(
      !tokenize(line).some(token =>
        token.scopes.includes('meta.type.declaration.simple.pop') ||
        token.scopes.includes('entity.name.type.pop')
      ),
      `unexpected fallback scope in: ${line}`
    );
  }
});
