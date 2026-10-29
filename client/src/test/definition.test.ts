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

  test('Pluralizes every word in compound type names except after "de"', async () => {
    await activate(docUri);
    await setTestContent([
      'Uma casa do pato é uma estrutura.',
      'Uma casa da Maria são umas casas dos patos.',
      'Um conjunto são umas casas das Marias.',
      'Uma escova de dente é uma estrutura.',
      'Uma caixa de texto são umas escovas de dente.',
      'Um ponto osmosiano é uma estrutura.',
      'Uns extra pontos osmosianos são uns pontos osmosianos.'
    ].join('\n'));

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const cases = [
      { reference: 'casas dos patos', declarationLine: 0 },
      { reference: 'casas das Marias', declarationLine: 1 },
      { reference: 'escovas de dente', declarationLine: 3 },
      { reference: 'pontos osmosianos', declarationLine: 5 }
    ];

    for (const testCase of cases) {
      const offset = text.lastIndexOf(testCase.reference) + 2;
      const definition = await vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeDefinitionProvider',
        docUri,
        document.positionAt(offset)
      );
      assert.ok(definition, `Expected a definition for "${testCase.reference}".`);
      assert.equal(definition.length, 1, `Unexpected definition count for "${testCase.reference}".`);
      assert.equal(
        definition[0].range.start.line,
        testCase.declarationLine,
        `Unexpected declaration for "${testCase.reference}".`
      );
    }
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

  test('Resolves computed structure fields through their assigning function', async () => {
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
      'Uma posição é uma estrutura.',
      'Uma localização é uma estrutura com Uma posição denominada posição X, Uma posição denominada posição Y.',
      'Um retângulo é uma estrutura com Uma posição denominada posição X1, Uma posição denominada posição X2.',
      'A localização é uma localização.',
      'Função para que se atribua o centro dum retângulo para uma localização:',
      '  Atribua a posição X1 deste retângulo mais a posição X2 deste retângulo à posição X desta localização.',
      'para que se consuma uma localização:',
      '  Retorne.',
      'para que se faça algo com um retângulo:',
      '  Consuma o centro deste retângulo.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
  });

  test('Reports invalid computed-field owners and unresolved computed fields', async () => {
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
      'Uma posição é uma estrutura.',
      'Um retângulo é uma estrutura.',
      'Função para que se atribua o centro dum byte para uma posição:',
      '  Retorne.',
      'Função para que se atribua o raio dum polígono para uma posição:',
      '  Retorne.',
      'Função para que se calcule o diâmetro dum retângulo para uma posição:',
      '  Retorne.',
      'para que se faça algo com um retângulo:',
      '  Atribua o diâmetro deste retângulo para uma posição.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.ok(diagnostics.some(diagnostic =>
      diagnostic.message.includes('cannot own a computed field')
    ));
    assert.ok(diagnostics.some(diagnostic =>
      diagnostic.message.includes('Unknown computed field structure type "polígono"')
    ));
    assert.ok(diagnostics.some(diagnostic =>
      diagnostic.message.includes('Unknown structure field access')
    ));
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
      'para que se Foo:',
      '  alguma instrução.'
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
      'para que se processe usando um tipo inexistente denominado entrada retornando uma saída inexistente:\n  alguma instrução.'
    );
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message.includes('Unknown routine parameter type')
    ).length, 2);
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
    const errors = diagnostics.filter(diagnostic =>
      diagnostic.severity === vscode.DiagnosticSeverity.Error
    );
    assert.equal(errors.length, 2);
    assert.ok(errors.some(diagnostic =>
      diagnostic.message === 'The character ":" cannot appear in an identifier.'
    ));
    assert.ok(errors.some(diagnostic =>
      diagnostic.message === 'The character ";" cannot appear in an identifier.'
    ));
  });

  test('Resolves routine calls with arguments and prioritizes exact no-parameter names', async () => {
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
      'Rotina para que se Foo:',
      '  Bar 123.',
      'Rotina para que se Bar um número:',
      '  Baz o número.',
      '  Baz este número.',
      'Rotina para que se Baz um número:',
      '  Escreva este número para StdOut.',
      'Rotina para que se Baz o número:',
      '  Escreva 456 para StdOut.'
    ].join('\n'));
    await diagnosticsUpdated;

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const cases = [
      { reference: 'Bar 123', expectedLine: 3 },
      { reference: 'Baz o número', expectedLine: 8 },
      { reference: 'Baz este número', expectedLine: 6 }
    ];
    for (const testCase of cases) {
      const offset = text.indexOf(testCase.reference) + 1;
      const definition = await vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeDefinitionProvider',
        docUri,
        document.positionAt(offset)
      );
      assert.ok(definition);
      assert.equal(definition.length, 1);
      assert.equal(definition[0].range.start.line, testCase.expectedLine);
    }
  });

  test('Emits a hint when a routine body contains no statements', async () => {
    await activate(docUri);
    const diagnosticsUpdated = new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(uri => uri.toString() === docUri.toString())) {
          listener.dispose();
          resolve();
        }
      });
    });
    await setTestContent('Rotina para que se vazia:\n  [apenas comentário]');
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.length, 1);
    assert.equal(diagnostics[0].severity, vscode.DiagnosticSeverity.Hint);
    assert.ok(diagnostics[0].message.includes('has no statements'));
  });

  test('Diagnoses equivalent alternate headers and hints on colon-terminated aliases', async () => {
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
      'Rotina para que se foo um número denominado quantidade;',
      'Rotina para que se bar um número denominado valor;',
      'Rotina para que se foo um número denominado contagem:',
      '  alguma instrução.',
      'Rotina para que se baz:',
      'Rotina para que se qux:',
      '  alguma instrução.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    const equivalentHeaderDiagnostics = diagnostics.filter(diagnostic =>
      diagnostic.message.includes('semantically equivalent')
    );
    assert.equal(equivalentHeaderDiagnostics.length, 1);
    assert.equal(equivalentHeaderDiagnostics[0].severity, vscode.DiagnosticSeverity.Error);

    const colonTerminatorHints = diagnostics.filter(diagnostic =>
      diagnostic.message.includes('Consecutive primary routine headers')
    );
    assert.equal(colonTerminatorHints.length, 1);
    assert.equal(colonTerminatorHints[0].severity, vscode.DiagnosticSeverity.Hint);
    assert.equal(colonTerminatorHints[0].range.start.line, 5);
  });

  test('Hints when primary routine headers follow an alternate header without a body', async () => {
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
      'Rotina para que se baz;',
      'Rotina para que se bar:',
      'Rotina para que se foo:'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    const consecutiveHeaderHints = diagnostics.filter(diagnostic =>
      diagnostic.message.includes('Consecutive primary routine headers')
    );
    assert.equal(consecutiveHeaderHints.length, 1);
    assert.equal(consecutiveHeaderHints[0].severity, vscode.DiagnosticSeverity.Hint);
    assert.equal(consecutiveHeaderHints[0].range.start.line, 1);
  });

  test('Requires hexadecimal literals after the Decodifique instruction', async () => {
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
      'Rotina para que se execute:',
      '  Decodifique $8B8508000000.',
      '  Decodifique a letra.',
      '  Decodifique 123.',
      '  Decodifique "oi".',
      '  Decodifique.',
      'Rotina para que se decodifique a letra:',
      '  Escreva "letra" para StdOut.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    const decodeErrors = diagnostics.filter(diagnostic =>
      diagnostic.message === 'Expected a hexadecimal literal after "Decodifique".'
    );
    assert.equal(decodeErrors.length, 4);
    assert.ok(decodeErrors.every(diagnostic =>
      diagnostic.severity === vscode.DiagnosticSeverity.Error
    ));
    assert.deepEqual(diagnostics.filter(diagnostic =>
      diagnostic.message.includes('has no statements')
    ), []);
  });

  test('Empilhe accepts numeric literals and numeric variables only', async () => {
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
      'Um word é um byte.',
      'Um word duplo é um word.',
      'Um número é um byte.',
      'Uma contagem é um número.',
      'Uma string é uma estrutura.',
      'Rotina para que se execute usando um byte denominado octeto, um word duplo denominado palavra, uma contagem denominada quantidade e uma string denominada texto:',
      '  Empilhe 123.',
      '  Empilhe $7B.',
      '  Empilhe o octeto.',
      '  Empilhe a palavra.',
      '  Empilhe a quantidade.',
      '  Empilhe o texto.',
      '  Empilhe a variável inexistente.',
      '  Empilhe.',
      'Rotina para que se empilhe um número:',
      '  Retorne.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === '"Empilhe" only accepts variables of type "byte", "word", or "número".'
    ).length, 1);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message.startsWith('Unknown variable "') &&
      diagnostic.message.endsWith('" after "Empilhe".')
    ).length, 1);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === 'Expected a numeric literal or a definite-article variable after "Empilhe".'
    ).length, 1);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === '"Empilhe" is a reserved statement keyword and cannot be used in a routine name.'
    ).length, 1);
  });

  test('Parses internal and external Processe instructions with arguments and returns', async () => {
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
      'Um ponteiro é um byte.',
      'Uma estrutura de exemplo é uma estrutura com',
      '  Um ponteiro denominado ponteiro de função.',
      'A estrutura é uma estrutura de exemplo.',
      'Rotina para que se foo:',
      '  Processe o ponteiro de função desta estrutura.',
      'Rotina para que se bar usando um número:',
      '  Processe o ponteiro de função desta estrutura com 1 e o número retornando um número denominado resultado.',
      '  Empilhe o resultado.',
      'Rotina para que se baz:',
      '  Processe o ponteiro de função desta estrutura retornando um número.',
      '  Empilhe o número.',
      'Rotina para que se feche a área de transferência:',
      '  Processe "user32.dll" "CloseClipboard".',
      'Rotina para que se emita um bipe usando um número denominado bipe:',
      '  Processe "user32.dll" "MessageBeep" com o bipe retornando um número denominado resultado.',
      '  Empilhe o resultado.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const fieldOffset = text.indexOf('ponteiro de função desta estrutura') + 2;
    const fieldDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(fieldOffset)
    );
    assert.ok(fieldDefinition);
    assert.equal(fieldDefinition.length, 1);
    assert.equal(fieldDefinition[0].range.start.line, 3);

    const returnTypeOffset = text.indexOf('número denominado resultado') + 2;
    const returnTypeDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(returnTypeOffset)
    );
    assert.ok(returnTypeDefinition);
    assert.equal(returnTypeDefinition.length, 1);
    assert.equal(returnTypeDefinition[0].range.start.line, 0);
  });

  test('Reserves Processe in routine names', async () => {
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
      'Rotina para que se processe:',
      '  Retorne.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === '"Processe" is a reserved statement keyword and cannot be used in a routine name.'
    ).length, 1);
  });

  test('Allows bare Retorne statements and rejects values and routine names using the keyword', async () => {
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
      'Rotina para que se exemplo:',
      '  Retorne.',
      '  Retorne 0.',
      '  Retorne o número.',
      '  Retorne falso.',
      'Rotina para que se retorne alguma coisa:',
      '  Escreva "teste" para StdOut.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    const returnValueErrors = diagnostics.filter(diagnostic =>
      diagnostic.message === '"Retorne" does not accept a value or variable.'
    );
    assert.equal(returnValueErrors.length, 3);
    assert.ok(returnValueErrors.every(diagnostic =>
      diagnostic.severity === vscode.DiagnosticSeverity.Error
    ));

    const reservedNameErrors = diagnostics.filter(diagnostic =>
      diagnostic.message === '"Retorne" is a reserved statement keyword and cannot be used in a routine name.'
    );
    assert.equal(reservedNameErrors.length, 1);
    assert.equal(reservedNameErrors[0].severity, vscode.DiagnosticSeverity.Error);
  });

  test('Requires boolean functions to return sim or não with Diga', async () => {
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
      'Função para que se determine se válido:',
      '  Se uma condição for verdadeira, diga sim.',
      'Função para que se determine se inválido:',
      '  Diga talvez.',
      'Função para que se determine se sem resposta:',
      '  Escreva "sem retorno" para StdOut.',
      'Função para que se determine se vazio:'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === '"Diga" requires the boolean literal "sim" or "não".'
    ).length, 1);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === 'Boolean functions must contain a valid "Diga sim" or "Diga não" statement.'
    ).length, 3);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message.includes('has no statements')
    ).length, 1);
  });

  test('Rejects Diga in ordinary routines and routine names', async () => {
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
      'Rotina para que se diga sim:',
      '  Diga sim.',
      'Rotina para que se comum:',
      '  Diga não.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === '"Diga" can only be used in a boolean function.'
    ).length, 2);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === '"Diga" is a reserved statement keyword and cannot be used in a routine name.'
    ).length, 1);
  });

  test('Preserves routine parameters by creating an original-name binding', async () => {
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
      'Rotina para que se subdivida um número denominado valor e um número denominado quantidade:',
      '  Preserve o valor.',
      '  Preserve a quantidade.',
      '  Desloque o valor 16 bits para a direita.',
      '  Preserve o valor.',
      '  Preserve a variável inexistente.',
      '  Preserve número.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    const preserveErrors = diagnostics.filter(diagnostic =>
      diagnostic.message === '"Preserve" must be followed by a definite article and the name of a routine parameter.'
    );
    assert.equal(preserveErrors.length, 2);
    assert.ok(preserveErrors.every(diagnostic =>
      diagnostic.severity === vscode.DiagnosticSeverity.Error
    ));
  });

  test('Reserves Preserve in routine names', async () => {
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
      'Rotina para que se preserve um número:',
      '  Escreva "teste" para StdOut.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === '"Preserve" is a reserved statement keyword and cannot be used in a routine name.'
    ).length, 1);
  });

  test('Parses arithmetic assignment operators from left to right', async () => {
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
      'Rotina para que se faça algo com um número e um segundo número:',
      '  Atribua o número mais 2 menos 1 vezes o número dividido por 2 para o segundo número.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
  });

  test('Parses both string concatenation operators in output expressions', async () => {
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
      'Rotina para que se faça algo:',
      '  Escreva "Olá, " junto com o nome junto com o sobrenome seguido de "!" para StdOut.',
      '  Escreva "junto com seguido de" junto com "!" para StdOut.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
  });

  test('Declares local variables through routine-call arguments and resolves their types', async () => {
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
      'Rotina para que se foo:',
      '  bar 42.',
      '  bar um número denominado contagem.',
      '  baz a contagem.',
      '  bar um segundo número.',
      '  baz o segundo número.',
      '  Atribua 123 para um número denominado valor de exemplo.',
      'Rotina para que se bar um número:',
      '  Retorne.',
      'Rotina para que se baz um número:',
      '  Retorne.',
      'Rotina para que se atribua um número para um segundo número:',
      '  Retorne.'
    ].join('\n'));
    await diagnosticsUpdated;

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const cases = [
      { call: 'bar 42', expectedLine: 8 },
      { call: 'bar um número denominado contagem', expectedLine: 8 },
      { call: 'baz a contagem', expectedLine: 10 },
      { call: 'bar um segundo número', expectedLine: 8 },
      { call: 'baz o segundo número', expectedLine: 10 },
      { call: 'Atribua 123', expectedLine: 12 }
    ];
    for (const testCase of cases) {
      const offset = text.indexOf(testCase.call) + 1;
      const definition = await vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeDefinitionProvider',
        docUri,
        document.positionAt(offset)
      );
      assert.ok(definition, testCase.call);
      assert.equal(definition.length, 1, testCase.call);
      assert.equal(definition[0].range.start.line, testCase.expectedLine, testCase.call);
    }

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
  });

  test('Resolves type definitions within local-variable routine arguments', async () => {
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
      'Um caractere é um byte.',
      'Rotina para que se foo:',
      '  bar um caractere.',
      'Rotina para que se bar um byte:',
      '  Retorne.'
    ].join('\n'));
    await diagnosticsUpdated;

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const callOffset = text.indexOf('bar um caractere') + 1;
    const callDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(callOffset)
    );
    assert.ok(callDefinition);
    assert.equal(callDefinition.length, 1);
    assert.equal(callDefinition[0].range.start.line, 3);

    const typeOffset = text.indexOf('caractere', text.indexOf('bar um')) + 2;
    const typeDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(typeOffset)
    );
    assert.ok(typeDefinition);
    assert.equal(typeDefinition.length, 1);
    assert.equal(typeDefinition[0].range.start.line, 0);
    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
  });

  test('Does not resolve routine calls when an existing argument has an incompatible type', async () => {
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
      'Uma string é uma estrutura.',
      'A mensagem é uma string.',
      'Rotina para que se execute:',
      '  processe a mensagem.',
      'Rotina para que se processe um número:',
      '  Retorne.'
    ].join('\n'));
    await diagnosticsUpdated;

    const document = await vscode.workspace.openTextDocument(docUri);
    const callOffset = document.getText().indexOf('processe a mensagem') + 2;
    const definition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(callOffset)
    );
    assert.deepEqual(definition, []);
  });

  test('Local variables shadow global variables with the same name', async () => {
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
      'Uma string é uma estrutura.',
      'O nome é um número.',
      'Rotina para que se execute:',
      '  Atribua "João" para uma string denominada nome.',
      '  consuma o nome.',
      'Rotina para que se atribua uma string para uma string:',
      '  Retorne.',
      'Rotina para que se consuma uma string:',
      '  Retorne.'
    ].join('\n'));
    await diagnosticsUpdated;

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const callOffset = text.indexOf('consuma o nome') + 2;
    const definition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(callOffset)
    );
    assert.ok(definition);
    assert.equal(definition.length, 1);
    assert.equal(definition[0].range.start.line, 8);
    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
  });

  test('Diagnoses missing routines and unresolved variables passed to routine parameters', async () => {
    await activate(docUri);
    const updateContent = async (lines: string[]) => {
      const diagnosticsUpdated = new Promise<void>(resolve => {
        const listener = vscode.languages.onDidChangeDiagnostics(event => {
          if (event.uris.some(uri => uri.toString() === docUri.toString())) {
            listener.dispose();
            resolve();
          }
        });
      });
      await setTestContent(lines.join('\n'));
      await diagnosticsUpdated;
      return vscode.languages.getDiagnostics(docUri);
    };

    const missingRoutineDiagnostics = await updateContent([
      'Uma string é uma estrutura.',
      'Rotina para que se bar:',
      '  Baz a string.',
      '  Retorne.'
    ]);
    assert.equal(missingRoutineDiagnostics.filter(diagnostic =>
      diagnostic.message.includes('No compatible routine found')
    ).length, 1);

    const missingVariableDiagnostics = await updateContent([
      'Uma string é uma estrutura.',
      'Rotina para que se bar:',
      '  Baz a string.',
      '  Retorne.',
      'Rotina para que se baz uma string:',
      '  Retorne.'
    ]);
    assert.equal(missingVariableDiagnostics.filter(diagnostic =>
      diagnostic.message.includes('Unknown variable "string"')
    ).length, 1);
    assert.equal(missingVariableDiagnostics.filter(diagnostic =>
      diagnostic.message.includes('No compatible routine found')
    ).length, 0);

    const globalVariableDiagnostics = await updateContent([
      'Uma string é uma estrutura.',
      'A string é uma string igual a "teste".',
      'Rotina para que se bar:',
      '  Baz a string.',
      '  Retorne.',
      'Rotina para que se baz uma string:',
      '  Retorne.'
    ]);
    assert.deepEqual(globalVariableDiagnostics, []);

    const localVariableDiagnostics = await updateContent([
      'Uma string é uma estrutura.',
      'Rotina para que se bar:',
      '  Baz uma string.',
      '  Retorne.',
      'Rotina para que se baz uma string:',
      '  Retorne.'
    ]);
    assert.deepEqual(localVariableDiagnostics, []);

    const wrongArityDiagnostics = await updateContent([
      'Uma string é uma estrutura.',
      'Rotina para que se foo:',
      '  Baz uma string.',
      '  Retorne.',
      'Rotina para que se baz:',
      '  Retorne.'
    ]);
    const wrongArityError = wrongArityDiagnostics.find(diagnostic =>
      diagnostic.message.includes('No compatible routine found for "Baz uma string"')
    );
    assert.ok(wrongArityError);
  });

  test('Resolves routine overloads through derived types from most to least specific', async () => {
    await activate(docUri);
    const updateContent = async (lines: string[]) => {
      const diagnosticsUpdated = new Promise<void>(resolve => {
        const listener = vscode.languages.onDidChangeDiagnostics(event => {
          if (event.uris.some(uri => uri.toString() === docUri.toString())) {
            listener.dispose();
            resolve();
          }
        });
      });
      await setTestContent(lines.join('\n'));
      await diagnosticsUpdated;
    };

    await updateContent([
      'Um número é uma estrutura.',
      'Uma contagem é um número.',
      'Uma quantidade é um número.',
      'Um contador é uma contagem.',
      'Rotina para que se foo:',
      '  Baz um contador.',
      'Rotina para que se baz uma contagem:',
      '  Retorne.',
      'Rotina para que se baz um número:',
      '  Retorne.'
    ]);

    const document = await vscode.workspace.openTextDocument(docUri);
    const callOffset = document.getText().indexOf('Baz um contador') + 1;
    const specificDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(callOffset)
    );
    assert.ok(specificDefinition);
    assert.equal(specificDefinition.length, 1);
    assert.equal(specificDefinition[0].range.start.line, 6);
    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);

    await updateContent([
      'Um número é uma estrutura.',
      'Uma contagem é um número.',
      'Um contador é uma contagem.',
      'Rotina para que se foo:',
      '  Baz um contador.',
      'Rotina para que se baz um número:',
      '  Retorne.'
    ]);

    const fallbackDocument = await vscode.workspace.openTextDocument(docUri);
    const fallbackOffset = fallbackDocument.getText().indexOf('Baz um contador') + 1;
    const fallbackDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      fallbackDocument.positionAt(fallbackOffset)
    );
    assert.ok(fallbackDefinition);
    assert.equal(fallbackDefinition.length, 1);
    assert.equal(fallbackDefinition[0].range.start.line, 5);
    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
  });

  test('Parses conditional blocks and resolves their boolean conditions', async () => {
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
      'Rotina para que se foo:',
      '  Se válido,',
      '    Bar;',
      '    Retorne.',
      'Função para que se determine se válido:',
      '  Diga sim.',
      'Rotina para que se bar:',
      '  Retorne.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.deepEqual(diagnostics, []);
  });

  test('Parses loop control instructions and keeps block variables in routine scope', async () => {
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
      'Uma string é uma estrutura.',
      'Rotina para que se faça algo:',
      '  Se válido,',
      '    Atribua "oi" para uma string denominada string de teste.',
      '  Bar a string de teste.',
      '  Itere.',
      '    Atribua "olá" para uma string denominada nova string.',
      '    Se válido, reitere.',
      '    Pare.',
      '  Reitere.',
      '  Bar a nova string.',
      'Rotina para que se atribua uma string para uma segunda string:',
      '  Retorne.',
      'Rotina para que se bar uma string:',
      '  Retorne.',
      'Função para que se determine se válido:',
      '  Diga sim.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
  });

  test('Rejects arguments on loop control instructions and reserves their names', async () => {
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
      'Rotina para que se itere algo:',
      '  Itere 1.',
      '  Pare agora.',
      '  Reitere outra vez.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === '"Itere" is a reserved statement keyword and cannot be used in a routine name.'
    ).length, 1);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === '"Itere" does not accept an argument.'
    ).length, 1);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === '"Pare" does not accept an argument.'
    ).length, 1);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === '"Reitere" does not accept an argument.'
    ).length, 1);
  });

  test('Resolves conditional boolean functions with typed arguments', async () => {
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
      'Uma contagem é um número.',
      'Rotina para que se foo contendo uma contagem:',
      '  Se a contagem for 2,',
      '    Retorne.',
      'Função para que se determine se um número é um segundo número:',
      '  Diga sim.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);

    const document = await vscode.workspace.openTextDocument(docUri);
    const predicateOffset = document.getText().indexOf('for 2') + 1;
    const definition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(predicateOffset)
    );
    assert.ok(definition);
    assert.equal(definition.length, 1);
    assert.equal(definition[0].range.start.line, 5);
  });

  test('Normalizes routine prepositions and contractions when resolving calls', async () => {
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
      'Rotina para que se foo:',
      '  Bar ao número.',
      'Rotina para que se bar para o número:',
      '  Retorne.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);

    const document = await vscode.workspace.openTextDocument(docUri);
    const callOffset = document.getText().indexOf('Bar ao número') + 1;
    const definition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(callOffset)
    );
    assert.ok(definition);
    assert.equal(definition.length, 1);
    assert.equal(definition[0].range.start.line, 2);
  });

  test('Resolves direct and nested structure field accesses as routine arguments', async () => {
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
      'Uma string é uma estrutura.',
      'Um número é uma estrutura.',
      'Um endereço é uma estrutura com',
      '  Uma string denominada logradouro,',
      '  Um número denominado número da casa,',
      '  Um número denominado código postal.',
      'Uma pessoa é uma estrutura com',
      '  Uma string denominada nome,',
      '  Um endereço.',
      'O cliente é uma pessoa.',
      'Rotina para que se foo:',
      '  Bar o nome deste cliente.',
      '  Bar o logradouro deste endereço deste cliente.',
      'Rotina para que se bar uma string:',
      '  Retorne.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const directFieldOffset = text.indexOf('nome deste cliente') + 1;
    const directFieldDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(directFieldOffset)
    );
    assert.ok(directFieldDefinition);
    assert.equal(directFieldDefinition.length, 1);
    assert.equal(directFieldDefinition[0].range.start.line, 7);

    const nestedFieldOffset = text.indexOf('logradouro deste endereço') + 2;
    const nestedFieldDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(nestedFieldOffset)
    );
    assert.ok(nestedFieldDefinition);
    assert.equal(nestedFieldDefinition.length, 1);
    assert.equal(nestedFieldDefinition[0].range.start.line, 3);
  });

  test('Diagnoses missing boolean conditions and nested conditional blocks', async () => {
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
      'Rotina para que se foo:',
      '  Se inexistente,',
      '    Se também inexistente,',
      '      Bar;',
      '    Retorne.',
      'Rotina para que se bar:',
      '  Retorne.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === 'No boolean function found for condition "inexistente".'
    ).length, 1);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === 'No boolean function found for condition "também inexistente".'
    ).length, 0);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === 'Conditional blocks cannot be nested.'
    ).length, 1);
  });
});
