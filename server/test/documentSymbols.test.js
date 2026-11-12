const assert = require('node:assert/strict');
const test = require('node:test');
const { SymbolKind } = require('vscode-languageserver/node');
const { TextDocument } = require('vscode-languageserver-textdocument');
const { buildDocumentSymbols } = require('../out/documentSymbols.js');
const { parseTypeDeclarations } = require('../out/typeParser.js');

test('builds ordered document symbols directly from parsed declarations', () => {
  const source = [
    'Um caractere é um byte.',
    'Uma pessoa é uma estrutura com um byte denominado idade.',
    'O usuário é uma pessoa.',
    'para que se conte usando um caractere denominado letra:',
    '  Retorne.'
  ].join('\n');
  const uri = 'file:///project/Tipos.pop';
  const document = TextDocument.create(uri, 'portugues-puro', 1, source);
  const parsed = parseTypeDeclarations(source);
  const { symbols, metrics } = buildDocumentSymbols(
    parsed,
    document
  );

  assert.deepEqual(symbols.map(symbol => symbol.name), [
    'caractere',
    'pessoa',
    'usuário',
    'conte usando'
  ]);
  assert.equal(symbols[1].kind, SymbolKind.Struct);
  assert.equal(symbols[1].children[0].name, 'idade');
  assert.equal(symbols[3].kind, SymbolKind.Function);
  assert.equal(symbols[3].children[0].name, 'letra');
  assert.equal(metrics.declarations, 2);
  assert.equal(metrics.globalVariables, 1);
  assert.equal(metrics.routines, 1);
  assert.equal(metrics.fields, 1);
  assert.equal(metrics.routineParameters, 1);
  assert.equal(metrics.symbols, symbols.length);
  assert.equal(
    metrics.documentSymbolNodes,
    symbols.length + metrics.fields +
      metrics.routineParameters + metrics.routineLocals
  );
  for (const symbol of symbols) {
    assert.ok(symbol.range.start.line <= symbol.range.end.line);
  }
});
