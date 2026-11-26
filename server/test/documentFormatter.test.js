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
    'Rotina para que se processem cinco números:',
    '  Processe "lib.dll" "func" com 1 e 2 e 3 e 4 e 5.'
  ].join('\r\n');

  const formatted = formatDocument(source);
  assert.ok(formatted.includes([
    'Faça outra coisa com',
    '      o primeiro número e',
    '      o segundo número e',
    '      o terceiro número e',
    '      o quarto número.'
  ].join('\r\n')));
  assert.ok(formatted.includes([
    'Processe "lib.dll" "func" com',
    '      1 e',
    '      2 e',
    '      3 e',
    '      4 e',
    '      5.'
  ].join('\r\n')));
  assert.ok(formatted.includes('  Se válido,\r\n    Retorne.'));
  assert.equal(formatDocument(formatted), formatted);
});

test('keeps short arguments separated by a routine preposition on one line', () => {
  const source = [
    'Rotina para que se mova uma linha reta para a direita uns twips:',
    '  Mova a linha reta usando os twips e 0.'
  ].join('\r\n');

  const formatted = formatDocument(source);
  assert.ok(formatted.includes('  Mova a linha reta usando os twips e 0.'), formatted);
  assert.equal(formatDocument(formatted), formatted);
});

test('wraps statements above four arguments or column 80 and rejoins shorter input', () => {
  const source = [
    'Um número é uma estrutura.',
    'Um deslocamento vertical é um número.',
    'para que se faça algo com um primeiro número e um segundo número e um terceiro número e um quarto número:',
    '  retorne.',
    'para que se faça outra coisa com um primeiro número e um segundo número e um terceiro número e um quarto número e um quinto número:',
    '  retorne.',
    'para que se adicione um deslocamento vertical para um segundo deslocamento vertical:',
    '  retorne.',
    'para que se subtraia um deslocamento vertical desde um segundo deslocamento vertical:',
    '  retorne.',
    'Rotina para que se teste:',
    '  Faça algo com',
    '    1 e',
    '    2 e',
    '    3 e',
    '    4.',
    '  Faça outra coisa com 1 e 2 e 3 e 4 e 5.',
    '  Adicione o deslocamento vertical inferior mais o superior deslocamento vertical dividido por 2 para o deslocamento vertical.',
    '  Subtraia o deslocamento vertical inferior mais o deslocamento vertical superior dividido por 2 desde o deslocamento vertical.',
    '  Atribua ',
    '    o número para',
    '    o byte.'
  ].join('\r\n');

  const formatted = formatDocument(source);
  assert.ok(formatted.includes('  Faça algo com 1 e 2 e 3 e 4.'), formatted);
  assert.ok(formatted.includes([
    '  Faça outra coisa com',
    '      1 e',
    '      2 e',
    '      3 e',
    '      4 e',
    '      5.'
  ].join('\r\n')), formatted);
  assert.ok(formatted.includes([
    '  Adicione',
    '      o deslocamento vertical inferior',
    '    mais',
    '      o superior deslocamento vertical',
    '    dividido por',
    '      2',
    '    para',
    '      o deslocamento vertical.'
  ].join('\r\n')), formatted);
  assert.ok(formatted.includes([
    '  Subtraia',
    '      o deslocamento vertical inferior',
    '    mais',
    '      o deslocamento vertical superior',
    '    dividido por',
    '      2',
    '    desde',
    '      o deslocamento vertical.'
  ].join('\r\n')), formatted);
  assert.ok(formatted.includes('  Atribua o número para o byte.'), formatted);
  assert.equal(formatDocument(formatted), formatted);
});

test('wraps a two-argument statement only when its end column exceeds 80', () => {
  const prefix = 'Atribua "';
  const suffix = '" para o byte.';
  const makeSource = endColumn => {
    const literalLength = endColumn - 2 - prefix.length - suffix.length;
    const statement = `${prefix}${'x'.repeat(literalLength)}${suffix}`;
    return [
      'Rotina para que se teste:',
      `  ${statement}`
    ].join('\r\n');
  };
  const atLimit = formatDocument(makeSource(80));
  const beyondLimit = formatDocument(makeSource(81));

  assert.ok(
    atLimit.includes(`  ${prefix}${'x'.repeat(80 - 2 - prefix.length - suffix.length)}${suffix}`),
    atLimit
  );
  assert.ok(beyondLimit.includes([
    '  Atribua',
    `      "${'x'.repeat(81 - 2 - prefix.length - suffix.length)}"`,
    '    para',
    '      o byte.'
  ].join('\r\n')), beyondLimit);
});

test('keeps wrapped statement lines within the absolute column limit', () => {
  const longOperand = `o ${Array(14).fill('número').join(' ')}`;
  const source = [
    'Rotina para que se teste:',
    `  Atribua ${longOperand} para o byte.`
  ].join('\r\n');
  const formatted = formatDocument(source);

  assert.ok(formatted.split(/\r?\n/u).every(line => line.length <= 80), formatted);
});

test('adds one continuation level for statements containing separators and operators', () => {
  const sources = [
    [
      'Um número é uma estrutura.',
      'para que se faça algo com um número usando um segundo número para um terceiro número retornando um quarto número:',
      '  retorne.',
      'Rotina para que se teste:',
      '  Faça algo com o número usando o segundo número para o terceiro número retornando o quarto número.'
    ].join('\r\n'),
    [
      'Um número é uma estrutura.',
      'para que se adicione um número para um segundo número:',
      '  retorne.',
      'Rotina para que se teste:',
      '  Adicione o número mais o segundo número vezes o terceiro número dividido pelo quarto número para o quinto número.'
    ].join('\r\n')
  ];

  const first = formatDocument(sources[0]);
  const second = formatDocument(sources[1]);
  assert.ok(first.includes([
    '  Faça algo com',
    '      o número',
    '    usando',
    '      o segundo número',
    '    para',
    '      o terceiro número',
    '    retornando',
    '      o quarto número.'
  ].join('\r\n')), first);
  assert.ok(second.includes([
    '  Adicione',
    '      o número',
    '    mais',
    '      o segundo número',
    '    vezes',
    '      o terceiro número',
    '    dividido pelo',
    '      quarto número',
    '    para',
    '      o quinto número.'
  ].join('\r\n')), second);
  assert.equal(formatDocument(first), first);
  assert.equal(formatDocument(second), second);
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
  assert.ok(formatted.includes('      Retornando\r\n        um número.'));
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
