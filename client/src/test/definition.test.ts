/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as vscode from 'vscode';
import * as assert from 'assert';
import { activate, getDocUri, setTestContent } from './helper';

suite('Português Puro definitions', () => {
  const docUri = getDocUri('definition.pop');

  test('Resolves a multi-word type name without confusing similar names', async () => {
    await activate(docUri);
    const document = await vscode.workspace.openTextDocument(docUri);
    assert.equal(document.languageId, 'portugues-puro');
    assert.equal(
      vscode.workspace.getConfiguration('files', document).get('encoding'),
      'windows1252'
    );

    const source = [
      'Um carro branco é uma estrutura.',
      'Um tipo de carro é um carro branco.',
      'Um carro azul é um byte.',
      'Um transporte é um carro azul.'
    ].join('\n');
    await setTestContent(source);

    const referenceOffset = document.getText().indexOf('branco', document.getText().indexOf('\n')) + 2;
    const position = document.positionAt(referenceOffset);
    const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      position
    );

    assert.ok(definitions);
    assert.equal(definitions.length, 1);
    assert.deepEqual(definitions[0].range, new vscode.Range(
      new vscode.Position(0, 3),
      new vscode.Position(0, 15)
    ));
  });

  test('Resolves a user-defined type whose name includes a primitive type word', async () => {
    await activate(docUri);
    const source = [
      'Um byte novo é um byte.',
      'Um caractere é um byte novo.'
    ].join('\n');
    await setTestContent(source);

    const document = await vscode.workspace.openTextDocument(docUri);
    const referenceOffset = document.getText().lastIndexOf('byte novo') + 6;
    const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(referenceOffset)
    );

    assert.ok(definitions);
    assert.equal(definitions.length, 1);
    assert.deepEqual(definitions[0].range, new vscode.Range(
      new vscode.Position(0, 3),
      new vscode.Position(0, 12)
    ));
  });

  test('Resolves both the pointer base type and its pointed-to type', async () => {
    await activate(docUri);
    const source = [
      'Um caractere é um byte.',
      'Um ponteiro é uma estrutura.',
      'Um pchar é um ponteiro para um caractere.',
      'Um índice é um pchar.'
    ].join('\n');
    await setTestContent(source);

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const baseOffset = text.lastIndexOf('ponteiro');
    const baseDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(baseOffset + 2)
    );
    assert.ok(baseDefinition);
    assert.equal(baseDefinition.length, 1);
    assert.deepEqual(baseDefinition[0].range, new vscode.Range(
      new vscode.Position(1, 3),
      new vscode.Position(1, 11)
    ));

    const pointedTypeOffset = text.lastIndexOf('caractere') + 3;
    const pointedTypeDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(pointedTypeOffset)
    );
    assert.ok(pointedTypeDefinition);
    assert.equal(pointedTypeDefinition.length, 1);
    assert.deepEqual(pointedTypeDefinition[0].range, new vscode.Range(
      new vscode.Position(0, 3),
      new vscode.Position(0, 12)
    ));

    const pcharOffset = text.lastIndexOf('pchar') + 2;
    const pcharDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(pcharOffset)
    );
    assert.ok(pcharDefinition);
    assert.equal(pcharDefinition.length, 1);
    assert.deepEqual(pcharDefinition[0].range, new vscode.Range(
      new vscode.Position(2, 3),
      new vscode.Position(2, 8)
    ));
  });

  test('Updates definition locations after declarations are moved', async () => {
    await activate(docUri);
    await setTestContent([
      'Um caractere é um byte.',
      'Um ponteiro é uma estrutura.',
      'Um pchar é um ponteiro para um caractere.',
      'Um índice é um pchar.'
    ].join('\n'));

    const document = await vscode.workspace.openTextDocument(docUri);
    const originalText = document.getText();
    const originalReferenceOffset = originalText.lastIndexOf('pchar') + 2;
    const originalDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(originalReferenceOffset)
    );
    assert.ok(originalDefinition);
    assert.equal(originalDefinition.length, 1);
    assert.equal(originalDefinition[0].range.start.line, 2);

    await setTestContent([
      'Um caractere é um byte.',
      'Um ponteiro é uma estrutura.',
      'Um índice é um pchar.',
      'Um pchar é um ponteiro para um caractere.'
    ].join('\n'));

    const text = document.getText();
    const pcharOffset = text.indexOf('pchar', text.indexOf('índice')) + 2;
    const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(pcharOffset)
    );

    assert.ok(definitions);
    assert.equal(definitions.length, 1);
    assert.deepEqual(definitions[0].range, new vscode.Range(
      new vscode.Position(3, 3),
      new vscode.Position(3, 8)
    ));
  });

  test('Resolves a reference when the cursor is immediately after its final character', async () => {
    await activate(docUri);
    await setTestContent([
      'Um caractere é um byte.',
      'Um ponteiro é uma estrutura.',
      'Um pchar é um ponteiro para um caractere.',
      'Um índice é um pchar.'
    ].join('\n'));

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const referenceOffset = text.lastIndexOf('pchar') + 'pchar'.length;
    const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(referenceOffset)
    );

    assert.ok(definitions);
    assert.equal(definitions.length, 1);
    assert.deepEqual(definitions[0].range, new vscode.Range(
      new vscode.Position(2, 3),
      new vscode.Position(2, 8)
    ));
  });

  test('Resolves plural scalar base names to their singular declarations', async () => {
    await activate(docUri);
    await setTestContent([
      'Um número é uma estrutura.',
      'Uma unidade é um número.',
      'Uma dezena são 10 unidades.',
      'Uma centena são 10 dezenas.',
      'Um milissegundo é um número.',
      'Um segundo são 1000 milissegundos.',
      'Um minuto são 60 segundos.',
      'Uma hora são 60 minutos.',
      'Um dia são 24 horas.'
    ].join('\n'));

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const unitsOffset = text.indexOf('unidades') + 3;
    const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(unitsOffset)
    );

    assert.ok(definitions);
    assert.equal(definitions.length, 1);
    assert.equal(definitions[0].range.start.line, 1);

    const millisecondsOffset = text.indexOf('milissegundos') + 5;
    const millisecondDefinitions = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(millisecondsOffset)
    );

    assert.ok(millisecondDefinitions);
    assert.equal(millisecondDefinitions.length, 1);
    assert.equal(millisecondDefinitions[0].range.start.line, 4);
  });

  test('Requires a final period and treats line breaks as whitespace', async () => {
    await activate(docUri);
    await setTestContent([
      'Uma unidade',
      'é um número.',
      'Uma incompleta é um número'
    ].join('\n'));

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const completeNameOffset = text.indexOf('unidade') + 3;
    const completeDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(completeNameOffset)
    );
    assert.ok(completeDefinition);
    assert.equal(completeDefinition.length, 1);

    const incompleteNameOffset = text.indexOf('incompleta') + 3;
    const incompleteDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(incompleteNameOffset)
    );
    assert.deepEqual(incompleteDefinition, []);
  });

  test('Parses structure fields separated by commas and conjunctions', async () => {
    await activate(docUri);
    await setTestContent([
      'Um octeto é um byte.',
      'Um número é uma estrutura com',
      '  Um octeto denominado primeiro byte,',
      '  Um octeto denominado segundo byte,',
      '  Um octeto denominado terceiro byte e',
      '  Um octeto denominado quarto byte.',
      'Uma word é uma estrutura com',
      '  Um byte denominado byte inicial e',
      '  Um byte denominado byte final .'
    ].join('\n'));

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const fieldTypeOffsets = [...text.matchAll(/octeto denominado/gu)]
      .map(match => match.index!);
    assert.equal(fieldTypeOffsets.length, 4);

    for (const offset of fieldTypeOffsets) {
      const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeDefinitionProvider',
        docUri,
        document.positionAt(offset + 2)
      );
      assert.ok(definitions);
      assert.equal(definitions.length, 1);
      assert.equal(definitions[0].range.start.line, 0);
    }
  });

  test('Parses singular and plural field markers and type names', async () => {
    await activate(docUri);
    await setTestContent([
      'Uma unidade é uma estrutura.',
      'Uma medida é uma estrutura com',
      '  Uma unidade denominada unidade base,',
      '  Umas unidades denominadas unidades adicionais e',
      '  Uma unidade denominada unidade final.'
    ].join('\n'));

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const pluralTypeOffset = text.indexOf('unidades denominadas') + 3;
    const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(pluralTypeOffset)
    );

    assert.ok(definitions);
    assert.equal(definitions.length, 1);
    assert.equal(definitions[0].range.start.line, 0);
  });

  test('Parses union fields introduced by sob without absorbing the target into the field name', async () => {
    await activate(docUri);
    await setTestContent([
      'Uma word é uma estrutura com',
      '  Um byte denominado byte inicial e',
      '  Um byte denominado byte final.',
      'Um número é uma estrutura com',
      '  Um byte denominado primeiro byte,',
      '  Um byte denominado segundo byte,',
      '  Um byte denominado terceiro byte,',
      '  Um byte denominado quarto byte,',
      '  Uma word denominada word de ordem inferior sob o primeiro byte,',
      '  Uma word denominada word de ordem superior sob o terceiro byte,',
      '  Uma word denominada palavra baixa sob a primeira word,',
      '  Uma word denominada palavra alta sob a segunda word,',
      '  Uma word denominada palavras baixas sob os primeiros bytes,',
      '  Uma word denominada palavras altas sob os últimos bytes.',
      'Uma medida é um número.'
    ].join('\n'));

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const unionTypeOffsets = [...text.matchAll(/word denominada/gu)]
      .map(match => match.index! + 2);
    assert.equal(unionTypeOffsets.length, 6);
    for (const offset of unionTypeOffsets) {
      const unionTypeDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeDefinitionProvider',
        docUri,
        document.positionAt(offset)
      );
      assert.ok(unionTypeDefinition);
      assert.equal(unionTypeDefinition.length, 1);
      assert.equal(unionTypeDefinition[0].range.start.line, 0);
    }

    const numberReferenceOffset = text.lastIndexOf('número') + 2;
    const numberDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(numberReferenceOffset)
    );

    assert.ok(numberDefinition);
    assert.equal(numberDefinition.length, 1);
    assert.equal(numberDefinition[0].range.start.line, 3);
  });

  test('Accepts byte arrays and reports arrays of other element types', async () => {
    await activate(docUri);
    const diagnosticsUpdated = new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(uri => uri.toString() === docUri.toString())) {
          listener.dispose();
          resolve();
        }
      });
    });
    await setTestContent([
      'Um número é uma estrutura com',
      '  4 bytes,',
      '  4 palavras.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.length, 1);
    assert.equal(diagnostics[0].severity, vscode.DiagnosticSeverity.Error);
    assert.equal(diagnostics[0].message, 'Only contiguous arrays of byte are supported.');
    assert.deepEqual(diagnostics[0].range, new vscode.Range(
      new vscode.Position(2, 4),
      new vscode.Position(2, 12)
    ));
  });

  test('Infers field names and resolves type aliases from their longest suffix', async () => {
    await activate(docUri);
    await setTestContent([
      'Um octeto é um byte.',
      'Uma string é uma estrutura.',
      'Um número é uma estrutura com',
      '  Um primeiro byte,',
      '  Um segundo byte,',
      '  Um terceiro byte e',
      '  Um quarto byte.',
      'Uma caixa é uma estrutura com Um primeiro\tocteto e Um octeto denominado explícito.',
      'Uma pessoa é uma estrutura com',
      '  Uma string e',
      '  Um número.'
    ].join('\n'));

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const byteAliasOffset = text.indexOf('primeiro octeto') + 10;
    const byteDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(byteAliasOffset)
    );
    assert.ok(byteDefinition);
    assert.equal(byteDefinition.length, 1);

    const diagnosticsUpdated = new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(uri => uri.toString() === docUri.toString())) {
          listener.dispose();
          resolve();
        }
      });
    });
    await setTestContent([
      'Uma repetida é uma estrutura com',
      '  Um byte,',
      '  Um byte.',
      'Uma palavra é uma estrutura.',
      'Uma inválida é uma estrutura com',
      '  Um campo inexistente e',
      '  Uma palavra de ordem inferior.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.length, 3);
    assert.ok(diagnostics.some(diagnostic => diagnostic.message.includes('Duplicate field name')));
    assert.equal(
      diagnostics.filter(diagnostic => diagnostic.message.includes('No type matches field alias')).length,
      2
    );
  });

  test('Treats complete multi-word field names as a single definition reference', async () => {
    await activate(docUri);
    await setTestContent([
      'Uma word é uma estrutura.',
      'Uma word de ordem inferior é uma word.',
      'Uma word de ordem superior é uma word.',
      'Um número é uma estrutura com',
      '  Uma word denominada word de ordem inferior,',
      '  Uma word denominada word de ordem superior.',
      'Uma estrutura de exemplo é uma estrutura com',
      '  Um número,',
      '  Um segundo número.'
    ].join('\n'));

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const lowerFieldName = text.indexOf('word de ordem inferior', text.indexOf('Uma word denominada'));
    for (const word of ['word', 'de', 'ordem', 'inferior']) {
      const wordOffset = text.indexOf(word, lowerFieldName);
      const definition = await vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeDefinitionProvider',
        docUri,
        document.positionAt(wordOffset)
      );
      assert.ok(definition);
      assert.equal(definition.length, 1);
      assert.equal(definition[0].range.start.line, 1);
    }

    const inferredNameStart = text.lastIndexOf('segundo número');
    for (const word of ['segundo', 'número']) {
      const wordOffset = text.indexOf(word, inferredNameStart);
      const definition = await vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeDefinitionProvider',
        docUri,
        document.positionAt(wordOffset)
      );
      assert.ok(definition);
      assert.equal(definition.length, 1);
      assert.equal(definition[0].range.start.line, 3);
    }
  });

  test('Parses reference field markers as field terminators, not navigable names', async () => {
    await activate(docUri);
    await setTestContent([
      'Um número é uma estrutura.',
      'Um marcador do pdf é uma estrutura.',
      'Um pdf state é uma estrutura com',
      '  Um marcador do pdf denominado marcador (referência),',
      '  Um segundo número (referência) e',
      '  Um número denominado número armazenado.'
    ].join('\n'));

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const markerOffset = text.indexOf('(referência)') + 3;
    const markerDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(markerOffset)
    );
    assert.deepEqual(markerDefinition, []);

    const fieldNameOffset = text.indexOf('marcador (referência)') + 2;
    const fieldNameDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(fieldNameOffset)
    );
    assert.ok(fieldNameDefinition);
    assert.equal(fieldNameDefinition.length, 1);
    assert.equal(fieldNameDefinition[0].range.start.line, 1);

    const inferredTypeOffset = text.indexOf('segundo número') + 2;
    const inferredTypeDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(inferredTypeOffset)
    );
    assert.ok(inferredTypeDefinition);
    assert.equal(inferredTypeDefinition.length, 1);
    assert.equal(inferredTypeDefinition[0].range.start.line, 0);

    const referenceOnlyNameOffset = text.indexOf('(referência)', text.indexOf('segundo número')) - 2;
    const referenceOnlyFieldDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(referenceOnlyNameOffset)
    );
    assert.ok(referenceOnlyFieldDefinition);
    assert.equal(referenceOnlyFieldDefinition.length, 1);
    assert.equal(referenceOnlyFieldDefinition[0].range.start.line, 0);
  });

  test('Reports unknown base types without ignoring accent differences', async () => {
    await activate(docUri);
    const diagnosticsUpdated = new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(uri => uri.toString() === docUri.toString())) {
          listener.dispose();
          resolve();
        }
      });
    });
    await setTestContent([
      'Um dígito binário é um byte.',
      'Uma caractere é um digito binario.'
    ].join('\n'));
    await diagnosticsUpdated;

    const document = await vscode.workspace.openTextDocument(docUri);
    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.length, 1);
    assert.equal(diagnostics[0].severity, vscode.DiagnosticSeverity.Error);
    assert.equal(diagnostics[0].message, 'Unknown base type "digito binario".');
    const misspelledStart = document.getText().lastIndexOf('digito binario');
    assert.deepEqual(diagnostics[0].range, new vscode.Range(
      document.positionAt(misspelledStart),
      document.positionAt(misspelledStart + 'digito binario'.length)
    ));

    const misspelledOffset = misspelledStart + 3;
    const definition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(misspelledOffset)
    );
    assert.deepEqual(definition, []);
  });

  test('Parses global variables into a separate catalog from types', async () => {
    await activate(docUri);
    const diagnosticsUpdated = new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(uri => uri.toString() === docUri.toString())) {
          listener.dispose();
          resolve();
        }
      });
    });
    await setTestContent([
      'Uma cor é uma estrutura.',
      'Uma aba é uma estrutura.',
      'Um número é uma estrutura.',
      'A cor do ambiente de trabalho é uma cor.',
      'A aba atual é uma aba.',
      'O número é um número.',
      'AS CORES DO AMBIENTE SÃO UMAS CORES.'
    ].join('\n'));
    await diagnosticsUpdated;

    const document = await vscode.workspace.openTextDocument(docUri);
    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);

    const sameNamedTypeOffset = document.getText().lastIndexOf('número') + 2;
    const typeDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(sameNamedTypeOffset)
    );
    assert.ok(typeDefinition);
    assert.equal(typeDefinition.length, 1);
    assert.equal(typeDefinition[0].range.start.line, 2);
  });

  test('Reports global variables with unknown types', async () => {
    await activate(docUri);
    const diagnosticsUpdated = new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(uri => uri.toString() === docUri.toString())) {
          listener.dispose();
          resolve();
        }
      });
    });
    await setTestContent('A cor atual é uma cor inexistente.');
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.length, 1);
    assert.equal(diagnostics[0].message, 'Unknown global variable type "cor inexistente".');
  });

  test('Recognizes initialized global variables with supported literal forms', async () => {
    await activate(docUri);
    const diagnosticsUpdated = new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(uri => uri.toString() === docUri.toString())) {
          listener.dispose();
          resolve();
        }
      });
    });
    await setTestContent([
      'Uma fração é uma estrutura.',
      'Uma string é uma estrutura.',
      'Um byte é uma estrutura.',
      'Um texto hexadecimal é uma estrutura.',
      'Um sinalizador é uma estrutura.',
      'A fração simples é uma fração igual a 123.',
      'A fração negativa é uma fração igual a -67.',
      'A razão é uma fração igual a +9/-5.',
      'O número misto é uma fração igual a -2+-7/-1.',
      'O código é um texto hexadecimal igual a $BeBaC0cA.',
      'O servidor SMTP é uma string igual a "localhost".',
      'O texto citado é uma string igual a "Ele disse:""Olá. João""".',
      'As aspas duplas são um byte igual a 34.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
  });

  test('Reports invalid initialized global variable literals', async () => {
    await activate(docUri);
    const diagnosticsUpdated = new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(uri => uri.toString() === docUri.toString())) {
          listener.dispose();
          resolve();
        }
      });
    });
    await setTestContent([
      'Uma fração é uma estrutura.',
      'Uma string é uma estrutura.',
      'A fora de faixa é uma fração igual a 2147483648.',
      'A sintaxe incorreta é uma fração igual a 2-7/1.',
      'A stringcomtab é uma string igual a "texto\ttab".'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.length, 3);
    assert.ok(diagnostics.every(diagnostic =>
      diagnostic.message === 'Invalid global variable initializer.'
    ));
  });

  test('Infers global variable types from abbreviated initializers', async () => {
    await activate(docUri);
    const diagnosticsUpdated = new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(uri => uri.toString() === docUri.toString())) {
          listener.dispose();
          resolve();
        }
      });
    });
    await setTestContent([
      'Um número é uma estrutura.',
      'O maior número é 2147483647.',
      'O número pi é 355/113.',
      'O servidor SMTP é "localhost".',
      'As aspas duplas são 34.',
      'O texto CRLF é $0D0A.',
      'O sinalizador de problemas é 0.',
      'O número negativo é -2147483648.',
      'O número misto é -2+-7/-1.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);

    const document = await vscode.workspace.openTextDocument(docUri);
    const integerLiteralOffset = document.getText().indexOf('34');
    const literalDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(integerLiteralOffset)
    );
    assert.deepEqual(literalDefinition, []);
  });

  test('Parses fields in global structure variables using the type field rules', async () => {
    await activate(docUri);
    const diagnosticsUpdated = new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(uri => uri.toString() === docUri.toString())) {
          listener.dispose();
          resolve();
        }
      });
    });
    await setTestContent([
      'Um endereço é uma estrutura.',
      'Um sinalizador é uma estrutura.',
      'Um sinalizador de erros é uma estrutura.',
      'Uma mensagem de erro é uma estrutura.',
      'Uma listagem é uma estrutura.',
      'O compilador é uma estrutura com',
      '  Um endereço denominado endereço da pasta,',
      '  Um sinalizador de erros,',
      '  Uma mensagem de erro e',
      '  Uma listagem (referência).'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const inferredAliasOffset = text.indexOf('sinalizador de erros') + 13;
    const aliasDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(inferredAliasOffset)
    );
    assert.ok(aliasDefinition);
    assert.equal(aliasDefinition.length, 1);
    assert.equal(aliasDefinition[0].range.start.line, 2);

    const explicitlyNamedTypeOffset = text.indexOf('endereço denominado') + 2;
    const explicitlyNamedDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(explicitlyNamedTypeOffset)
    );
    assert.ok(explicitlyNamedDefinition);
    assert.equal(explicitlyNamedDefinition.length, 1);
    assert.equal(explicitlyNamedDefinition[0].range.start.line, 0);

    const referenceMarkerOffset = text.indexOf('(referência)') + 4;
    const referenceMarkerDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(referenceMarkerOffset)
    );
    assert.deepEqual(referenceMarkerDefinition, []);
  });

  test('Ignores line and block comments while preserving source navigation ranges', async () => {
    await activate(docUri);
    const diagnosticsUpdated = new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(uri => uri.toString() === docUri.toString())) {
          listener.dispose();
          resolve();
        }
      });
    });
    await setTestContent([
      'Um número é uma estrutura. \\ comentário com ponto.',
      'Uma string é uma estrutura.',
      'Uma word é uma estrutura com',
      '  Um byte denominado byte [comentário. e é um tipo] inicial e',
      '  Um número.',
      'O compilador é uma estrutura com',
      '  Um número denominado contador [comentário com ponto.].',
      'A mensagem é uma string igual a "texto [literal] \\ literal". \\ comentário final.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const numberOffset = text.indexOf('número', text.indexOf('Um número.'));
    const typeDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(numberOffset + 2)
    );
    assert.ok(typeDefinition);
    assert.equal(typeDefinition.length, 1);
    assert.equal(typeDefinition[0].range.start.line, 0);

    const commentOffset = text.indexOf('[comentário', text.indexOf('Um byte denominado'));
    const commentDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(commentOffset + 3)
    );
    assert.deepEqual(commentDefinition, []);
  });

  test('Reports non-printable characters in comments except line-comment terminators', async () => {
    await activate(docUri);
    const diagnosticsUpdated = new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(uri => uri.toString() === docUri.toString())) {
          listener.dispose();
          resolve();
        }
      });
    });
    const source = [
      'Um número é uma estrutura [TAB\tCR\rLF\n]. \\ comentário de linha\r\n',
      'A medida é um número.'
    ].join('');
    await setTestContent(source);
    await diagnosticsUpdated;

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const diagnostics = vscode.languages.getDiagnostics(docUri);
    const blockStart = text.indexOf('[');
    const blockEnd = text.indexOf(']', blockStart);
    const expectedOffsets: number[] = [];
    for (let offset = blockStart + 1; offset < blockEnd; offset++) {
      if (/[\p{Cc}]/u.test(text[offset])) {
        expectedOffsets.push(offset);
      }
    }
    assert.ok(expectedOffsets.length >= 3);
    assert.equal(diagnostics.length, expectedOffsets.length);
    assert.ok(diagnostics.every(diagnostic =>
      diagnostic.message === 'Non-printable characters are not allowed in comments.'
    ));

    assert.ok(diagnostics.every(diagnostic =>
      expectedOffsets.some(offset =>
        document.positionAt(offset).line === diagnostic.range.start.line
      )
    ));

    const secondTypeOffset = text.lastIndexOf('número') + 2;
    const definition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(secondTypeOffset)
    );
    assert.ok(definition);
    assert.equal(definition.length, 1);
    assert.equal(definition[0].range.start.line, 0);
  });

  test('Parses routine aliases, named and inferred parameters, and return types', async () => {
    await activate(docUri);
    const diagnosticsUpdated = new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(uri => uri.toString() === docUri.toString())) {
          listener.dispose();
          resolve();
        }
      });
    });
    await setTestContent([
      'Um número é uma estrutura.',
      'Rotina para que se calcule o IMC do usuário usando um número denominado peso e um segundo número retornando um número denominado IMC:',
      '  código normal do corpo da rotina',
      'para que se Baz;',
      'para que se Bar;',
      'para que se Foo:'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const parameterOffsets = [
      text.indexOf('número denominado peso') + 2,
      text.indexOf('segundo número') + 10,
      text.lastIndexOf('número denominado IMC') + 2
    ];
    for (const offset of parameterOffsets) {
      const definition = await vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeDefinitionProvider',
        docUri,
        document.positionAt(offset)
      );
      assert.ok(definition);
      assert.equal(definition.length, 1);
      assert.equal(definition[0].range.start.line, 0);
    }
  });

  test('Ends routine bodies at following top-level declarations and routine headers', async () => {
    await activate(docUri);
    const diagnosticsUpdated = new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(uri => uri.toString() === docUri.toString())) {
          listener.dispose();
          resolve();
        }
      });
    });
    await setTestContent([
      'Um byte é uma estrutura.',
      'para que se Foo:',
      '  corpo da rotina sem delimitador de bloco',
      'Um identificador é um byte.',
      'para que se Bar:',
      '  corpo da segunda rotina',
      'A variável global é um identificador.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const referenceOffset = text.lastIndexOf('identificador') + 4;
    const definition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(referenceOffset)
    );
    assert.ok(definition);
    assert.equal(definition.length, 1);
    assert.equal(definition[0].range.start.line, 3);
  });

  test('Reports unknown types used in routine parameters and return values', async () => {
    await activate(docUri);
    const diagnosticsUpdated = new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(uri => uri.toString() === docUri.toString())) {
          listener.dispose();
          resolve();
        }
      });
    });
    await setTestContent(
      'para que se processe usando um tipo inexistente denominado entrada retornando uma saída inexistente:'
    );
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.length, 2);
    assert.ok(diagnostics.every(diagnostic =>
      diagnostic.message.includes('Unknown routine parameter type')
    ));
  });

  test('Reports reserved words in type and global variable identifiers', async () => {
    await activate(docUri);
    const diagnosticsUpdated = new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(uri => uri.toString() === docUri.toString())) {
          listener.dispose();
          resolve();
        }
      });
    });
    await setTestContent([
      'Um tipo usando reservado é uma estrutura.',
      'A variável retornando reservado é um tipo usando reservado.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.length, 2);
    assert.ok(diagnostics.every(diagnostic =>
      diagnostic.message.includes('cannot be used in an identifier')
    ));
  });

  test('Restricts punctuation in type and global variable identifiers', async () => {
    await activate(docUri);
    const diagnosticsUpdated = new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(uri => uri.toString() === docUri.toString())) {
          listener.dispose();
          resolve();
        }
      });
    });
    await setTestContent([
      'Um tipo: inválido é uma estrutura.',
      'Um tipo é uma estrutura.',
      'A variável; inválida é um tipo.',
      'para que se nome alternativo;',
      'para que se nome principal:'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.length, 2);
    assert.ok(diagnostics.some(diagnostic =>
      diagnostic.message === 'The character ":" cannot appear in an identifier.'
    ));
    assert.ok(diagnostics.some(diagnostic =>
      diagnostic.message === 'The character ";" cannot appear in an identifier.'
    ));
  });
});
