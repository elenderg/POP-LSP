const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const grammar = JSON.parse(fs.readFileSync(
  path.resolve(__dirname, '../../syntaxes/portugues-puro.tmLanguage.json'),
  'utf8'
));
const simpleTypeRule = grammar.repository.types.patterns[0];
const simpleTypeRegex = new RegExp(
  simpleTypeRule.match.replace(/^\(\?i\)/, ''),
  'imu'
);
const expectedScopes = [
  'storage.type.language.article.pop',
  'entity.name.type.pop',
  'meta.type.declaration.simple.pop',
  'storage.type.language.article.pop',
  'support.type.pop',
  'punctuation.terminator.pop'
];

function getScopedCaptures(source) {
  const match = simpleTypeRegex.exec(source);
  if (!match) {
    return undefined;
  }
  return expectedScopes.map((scope, index) => ({
    scope,
    text: match[index + 1]
  }));
}

test('TextMate assigns explicit scopes to both articles in simple declarations', () => {
  const declarations = [
    'Um nome do tipo derivado é um nome do tipo base.',
    'Uma coisa derivada são uns tipos base.',
    'Esse tipo derivado é essa classe base.'
  ];

  for (const declaration of declarations) {
    const captures = getScopedCaptures(declaration);
    assert.ok(captures, `expected a simple-type match: ${declaration}`);
    assert.equal(captures[0].scope, 'storage.type.language.article.pop');
    assert.equal(captures[3].scope, 'storage.type.language.article.pop');
    assert.ok(captures[0].text);
    assert.ok(captures[3].text);
  }
});

test('TextMate simple type fallback rejects other declaration forms', () => {
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
    'Um [comentário] nome é um tipo base.'
  ];

  for (const declaration of excludedDeclarations) {
    assert.equal(
      simpleTypeRegex.test(declaration),
      false,
      `unexpected simple-type match: ${declaration}`
    );
  }
});

test('captured type names cannot contain articles, reserved words, or punctuation', () => {
  const declarationsWithInvalidNames = [
    'Um nome um derivado é um tipo base.',
    'Um nome com derivado é um tipo base.',
    'Um nome para derivado é um tipo base.',
    'Um nome é um tipo com base.',
    'Um nome é um tipo para base.',
    'Um nome, derivado é um tipo base.',
    'Um nome é um tipo; base.',
    'Um nome é um tipo: base.'
  ];

  for (const declaration of declarationsWithInvalidNames) {
    assert.equal(
      simpleTypeRegex.test(declaration),
      false,
      `unexpected simple-type match: ${declaration}`
    );
  }
});
