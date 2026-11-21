const assert = require('node:assert/strict');
const test = require('node:test');
const { formatDocument } = require('../out/documentFormatter');

test('preserves instructions before conditionals and separates top-level blocks', () => {
  const source = [
    'Um tipo estruturado é uma estrutura com',
    '  32 bytes,',
    '  Um campo denominado primeiro campo,',
    '\tUm segundo campo e',
    '\tUm terceiro campo sob o campo.',
    'Uma escolha é uma estrutura com um byte ou um número.',
    'A variável global é uma lista com',
    '  Uma string e',
    '\tUm número.',
    'Rotina para que se faça algo:',
    '  Decodifique $90.',
    '  Se válido, retorne.',
    '  Decodifique $91.',
    'Função para que se determine se algo é verdadeiro:',
    '  Diga sim.'
  ].join('\r\n');

  const formatted = formatDocument(source);
  assert.equal(formatted, [
    'Um tipo estruturado é uma estrutura com',
    '  32 bytes,',
    '  Um campo denominado primeiro campo,',
    '  Um segundo campo e',
    '  Um terceiro campo sob o campo.',
    '',
    'Uma escolha é uma estrutura com',
    '  um byte ou',
    '  um número.',
    '',
    'A variável global é uma lista com',
    '  Uma string e',
    '  Um número.',
    '',
    'Rotina para que se faça algo:',
    '  Decodifique $90.',
    '  Se válido,',
    '    Retorne.',
    '  Decodifique $91.',
    '',
    'Função para que se determine se algo é verdadeiro:',
    '  Diga sim.'
  ].join('\r\n'));
  assert.equal(formatDocument(formatted), formatted);
});

test('capitalizes conditional statements and wraps argument lists before the first argument', () => {
  const source = [
    'Um número é uma estrutura.',
    'para que se faça outra coisa com um primeiro número e um segundo número e um terceiro número e um quarto número:',
    '  Se válido, retorne.',
    'para que se faça algo com um primeiro número e um segundo número e um terceiro número e um quarto número:',
    '  Faça outra coisa com o primeiro número e o segundo número e o terceiro número e o quarto número.',
    'Rotina para que se processem quatro números:',
    '  Processe "lib.dll" "func" com 1 e 2 e 3 e 4.'
  ].join('\r\n');

  const formatted = formatDocument(source);
  assert.ok(formatted.includes([
    'Faça outra coisa com',
    '    o primeiro número e',
    '    o segundo número e',
    '    o terceiro número e',
    '    o quarto número.'
  ].join('\r\n')));
  assert.ok(formatted.includes([
    'Processe "lib.dll" "func" com',
    '    1 e',
    '    2 e',
    '    3 e',
    '    4.'
  ].join('\r\n')));
  assert.ok(formatted.includes('  Se válido,\r\n    Retorne.'));
  assert.equal(formatDocument(formatted), formatted);
});

test('preserves block comments after statements inside conditionals', () => {
  const source = [
    'Rotina para que se desmanche algumas mensagens:',
    '  Itere.',
    '  Processe "user32.dll" "PeekMessageA" com',
    '  \\ Despacha mensagens de entrada não enfileiradas,',
    '    O endereçamento duma MSG [lpMsg]',
    '    e 0 [hWnd]',
    '    e 0 [wMsgFilterMin]',
    '    e 0 [wMsgFilterMax]',
    '    e 1 [wRemoveMsg = PM_REMOVE]',
    '  retornando um número.',
    '  Se o número for 0, retorne.',
    '  Se o número for 15,',
    '    Processe "user32.dll" "ValidateRect" com',
    '  \\ Valida a área do cliente dentro de um retângulo.',
    '      A janela principal do programa [hWnd]',
    '      e 0.  [*lpRect]',
    '  Reitere.'
  ].join('\r\n');

  const formatted = formatDocument(source);
  assert.ok(formatted.includes('[*lpRect]'));
  assert.match(
    formatted,
    /A janela principal do programa \[hWnd\] e\r?\n\s+0\. \[\*lpRect\]/u
  );
  assert.ok(formatted.includes([
    '    O endereçamento duma MSG [lpMsg] e',
    '    0 [hWnd] e',
    '    0 [wMsgFilterMin] e',
    '    0 [wMsgFilterMax] e',
    '    1 [wRemoveMsg = PM_REMOVE]'
  ].join('\r\n')), formatted);
  assert.ok(formatted.includes('    Retornando\r\n      um número.'));
  assert.ok(formatted.includes('\\ Valida a área do cliente dentro de um retângulo.'));
  assert.doesNotMatch(formatted, /^\s*\]\s*$/mu);
  assert.equal(formatDocument(formatted), formatted);
});

test('moves argument conjunctions before trailing line comments', () => {
  const source = [
    'Rotina para que se faça algo:',
    '  Adicione',
    '    1 \\ comentário',
    '\te 2 \\ outro comentário',
    '\te 3.'
  ].join('\r\n');

  const formatted = formatDocument(source);
  assert.match(
    formatted,
    /Adicione\r?\n\s+1 e \\ comentário\r?\n\s+2 e \\ outro comentário\r?\n\s+3\./u
  );
  assert.equal(formatDocument(formatted), formatted);
});

test('preserves loop depth after conditional Reitere and assumes an implicit loop', () => {
  const source = [
    'Rotina para que se mova um percorredor:',
    '  [Itere.]',
    '    Avance o percorredor.',
    '    Se válido, retorne.',
    '    Se válido, reitere.',
    '    Avance o percorredor.',
    '  Reitere.'
  ].join('\r\n');

  const formatted = formatDocument(source);
  assert.ok(formatted.includes([
    '  [Itere.]',
    '    Avance o percorredor.',
    '    Se válido,',
    '      Retorne.',
    '    Se válido,',
    '      Reitere.',
    '    Avance o percorredor.',
    '  Reitere.'
  ].join('\r\n')), formatted);
  assert.equal(formatDocument(formatted), formatted);
});
