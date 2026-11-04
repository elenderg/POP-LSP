/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as vscode from 'vscode';
import * as assert from 'assert';
import { unlink, writeFile } from 'node:fs/promises';
import { activate, getDocPath, getDocUri, setTestContent } from './helper';

suite('Português Puro definitions', () => {
  const docUri = getDocUri('definitions/definition.pop');

  test('Provides document symbols for an open source document', async () => {
    await activate(docUri);
    const diagnosticsUpdated = new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(uri => uri.toString() === docUri.toString())) {
          listener.dispose();
          resolve();
        }
      });
    });
    await setTestContent('Um tipo é um byte.');
    await diagnosticsUpdated;

    const symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>(
      'vscode.executeDocumentSymbolProvider',
      docUri
    );

    assert.ok(symbols?.some(symbol => symbol.name === 'tipo'));
  });

  test('Resolves declarations and diagnostics from sibling source files', async () => {
    await activate(docUri);
    const externalPath = getDocPath('definitions/cross-file-types.pop');
    const externalUri = vscode.Uri.file(externalPath);
    await writeFile(externalPath, [
      'Um caractere é um byte.',
      'O símbolo externo é um caractere.',
      'para que se conte um caractere:',
      '  Retorne.'
    ].join('\n'), 'latin1');
    const diagnosticsUpdated = new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(uri => uri.toString() === docUri.toString())) {
          listener.dispose();
          resolve();
        }
      });

    });

    try {
      await setTestContent([
        'Uma letra é um caractere.',
        'O símbolo local é um caractere.',
        'Rotina para que se teste:',
        '  Conte um caractere.',
        '  Atribua 1 para o símbolo externo.'
      ].join('\n'));
      await diagnosticsUpdated;

      const document = await vscode.workspace.openTextDocument(docUri);
      const text = document.getText();
      const diagnostics = vscode.languages.getDiagnostics(docUri);
      assert.deepEqual(
        diagnostics.filter(diagnostic =>
          /Unknown (base type|global variable type|variable)|No compatible routine found/u
            .test(diagnostic.message)
        ),
        []
      );

      const typeOffset = text.indexOf('caractere');
      const typeDefinitions = await vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeDefinitionProvider',
        docUri,
        document.positionAt(typeOffset + 2)
      );
      assert.ok(typeDefinitions);
      assert.equal(typeDefinitions[0].uri.toString(), externalUri.toString());

      const typeDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeTypeDefinitionProvider',
        docUri,
        document.positionAt(text.indexOf('símbolo local') + 2)
      );
      assert.ok(typeDefinition);
      assert.equal(typeDefinition[0].uri.toString(), externalUri.toString());

      const routineOffset = text.indexOf('Conte') + 1;
      const routineDefinitions = await vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeDefinitionProvider',
        docUri,
        document.positionAt(routineOffset)
      );
      assert.ok(routineDefinitions);
      assert.equal(routineDefinitions[0].uri.toString(), externalUri.toString());

      const variableOffset = text.lastIndexOf('símbolo externo') + 3;
      const variableDefinitions = await vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeDefinitionProvider',
        docUri,
        document.positionAt(variableOffset)
      );
      assert.ok(variableDefinitions);
      assert.equal(variableDefinitions[0].uri.toString(), externalUri.toString());
    } finally {
      await unlink(externalPath);
    }
  });

  test('Keeps invalid-call diagnostics consistent when routine headers have indentation', async () => {
    await activate(docUri);
    const unindentedPath = getDocPath('definitions/routine-unindented.pop');
    const indentedPath = getDocPath('definitions/routine-indented.pop');
    const unindentedUri = vscode.Uri.file(unindentedPath);
    const indentedUri = vscode.Uri.file(indentedPath);
    const routine = 'para que se faça algo com um caractere: Foo.';
    await writeFile(
      unindentedPath,
      `Um caractere é um byte. ${routine}`,
      'latin1'
    );
    await writeFile(
      indentedPath,
      `Um caractere é um byte.       ${routine}`,
      'latin1'
    );

    const waitForDiagnostics = (uri: vscode.Uri) => new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(changedUri => changedUri.toString() === uri.toString())) {
          listener.dispose();
          resolve();
        }
      });
    });

    try {
      const unindentedDiagnosticsUpdated = waitForDiagnostics(unindentedUri);
      const unindentedDocument = await vscode.workspace.openTextDocument(unindentedUri);
      await vscode.window.showTextDocument(unindentedDocument);
      await unindentedDiagnosticsUpdated;
      const unindentedDiagnostics = vscode.languages.getDiagnostics(unindentedUri);

      const indentedDiagnosticsUpdated = waitForDiagnostics(indentedUri);
      const indentedDocument = await vscode.workspace.openTextDocument(indentedUri);
      await vscode.window.showTextDocument(indentedDocument);
      await indentedDiagnosticsUpdated;
      const indentedDiagnostics = vscode.languages.getDiagnostics(indentedUri);

      const invalidCallMessages = (diagnostics: readonly vscode.Diagnostic[]) =>
        diagnostics
          .map(diagnostic => diagnostic.message)
          .filter(message => message.startsWith('No compatible routine found for '));
      assert.deepEqual(invalidCallMessages(unindentedDiagnostics), [
        'No compatible routine found for "Foo".'
      ]);
      assert.deepEqual(
        invalidCallMessages(indentedDiagnostics),
        invalidCallMessages(unindentedDiagnostics)
      );
    } finally {
      await unlink(unindentedPath);
      await unlink(indentedPath);
    }
  });

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

  test('Shows documentation for primitive byte and structure types on hover', async () => {
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
      'Uma pessoa é uma estrutura.'
    ].join('\n'));
    await diagnosticsUpdated;

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const hoverAt = async (term: string): Promise<vscode.Hover[] | undefined> => {
      const offset = text.indexOf(term);
      return vscode.commands.executeCommand<vscode.Hover[]>(
        'vscode.executeHoverProvider',
        docUri,
        document.positionAt(offset + 1)
      );
    };
    const hoverText = (hover: vscode.Hover | undefined): string =>
      hover?.contents.map(content =>
        typeof content === 'string' ? content : content.value
      ).join('\n') ?? '';

    const byteHover = (await hoverAt('byte'))?.[0];
    assert.ok(byteHover);
    assert.match(hoverText(byteHover), /Representa um valor inteiro sem sinal de 8 bits/u);
    assert.match(hoverText(byteHover), /`0` a `255`/u);
    assert.match(hoverText(byteHover), /`1 byte`/u);

    const structureHover = (await hoverAt('estrutura'))?.[0];
    assert.ok(structureHover);
    assert.match(hoverText(structureHover), /tipo de dado composto/u);
    assert.match(hoverText(structureHover), /Permite agrupar diferentes campos/u);
    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
  });

  test('Resolves definitions of global variables in assignment targets', async () => {
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
      'A variável global é um byte.',
      'rotina para que se faça algo:',
      '  Atribua 1 para a variável global.'
    ].join('\n'));
    await diagnosticsUpdated;

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const usageOffset = text.lastIndexOf('variável global') + 4;
    const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(usageOffset)
    );

    assert.ok(definitions);
    assert.equal(definitions.length, 1);
    assert.deepEqual(definitions[0].range, new vscode.Range(
      new vscode.Position(0, 2),
      new vscode.Position(0, 17)
    ));
  });

  test('Resolves local variable declarations and references in Go to Definition', async () => {
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
      'Um contador é um byte.',
      'rotina para que se exemplifique:',
      '  Foo um contador.',
      '  Atribua 0 para um contador denominado segundo contador.',
      '  Foo para o segundo contador.',
      'para que se foo um contador:',
      '  Retorne.',
      'para que se foo para um contador:',
      '  Retorne.'
    ].join('\n'));
    await diagnosticsUpdated;

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const declarationOffset = text.indexOf('segundo contador');
    const usageOffset = text.lastIndexOf('segundo contador');
    const definitionAt = async (offset: number): Promise<vscode.Location[] | undefined> =>
      vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeDefinitionProvider',
        docUri,
        document.positionAt(offset + 2)
      );
    const expectedRange = new vscode.Range(
      document.positionAt(declarationOffset),
      document.positionAt(declarationOffset + 'segundo contador'.length)
    );

    for (const definitions of [
      await definitionAt(declarationOffset),
      await definitionAt(usageOffset)
    ]) {
      assert.ok(definitions);
      assert.equal(definitions.length, 1);
      assert.deepEqual(definitions[0].range, expectedRange);
    }

    const typeDefinitionAt = async (
      offset: number
    ): Promise<vscode.Location[] | undefined> =>
      vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeTypeDefinitionProvider',
        docUri,
        document.positionAt(offset + 2)
      );
    for (const typeDefinitions of [
      await typeDefinitionAt(declarationOffset),
      await typeDefinitionAt(usageOffset)
    ]) {
      assert.ok(typeDefinitions);
      assert.equal(typeDefinitions.length, 1);
      assert.deepEqual(typeDefinitions[0].range, new vscode.Range(
        new vscode.Position(0, 3),
        new vscode.Position(0, 11)
      ));
    }
    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
  });

  test('Resolves type definitions for global variables and structure fields', async () => {
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
      'Uma string é uma estrutura.',
      'Um número é uma estrutura.',
      '',
      'Uma pessoa é uma estrutura com',
      '  Uma string denominada nome,',
      '  Um número denominado idade,',
      '  Um endereço.',
      '',
      'Um endereço é uma estrutura com',
      '  Uma string denominada logradouro,',
      '  Um número denominado número da casa.',
      '',
      'O cliente é uma pessoa.',
      '',
      'Rotina para que se consuma uma pessoa:',
      '  Retorne.',
      '',
      'Rotina para que se exemplifique:',
      '  Consuma o cliente.',
      '  Atribua "João" para o nome deste cliente.',
      '  Atribua "Rua José da Silva" para o logradouro deste endereço deste cliente.'
    ].join('\n');
    await setTestContent(source);
    await diagnosticsUpdated;
    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const typeDefinitionAt = async (offset: number): Promise<vscode.Location[] | undefined> =>
      vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeTypeDefinitionProvider',
        docUri,
        document.positionAt(offset)
      );

    const globalDeclarationName = text.indexOf('cliente');
    const globalTypeDefinition = await typeDefinitionAt(globalDeclarationName + 2);
    assert.ok(globalTypeDefinition);
    assert.equal(globalTypeDefinition.length, 1);
    assert.deepEqual(globalTypeDefinition[0].range, new vscode.Range(
      new vscode.Position(3, 4),
      new vscode.Position(3, 10)
    ));

    const globalReferenceName = text.lastIndexOf('cliente');
    const globalReferenceTypeDefinition = await typeDefinitionAt(globalReferenceName + 2);
    assert.ok(globalReferenceTypeDefinition);
    assert.equal(globalReferenceTypeDefinition.length, 1);
    assert.deepEqual(globalReferenceTypeDefinition[0].range, new vscode.Range(
      new vscode.Position(3, 4),
      new vscode.Position(3, 10)
    ));

    const routineCallVariable = text.indexOf('cliente.', text.indexOf('Consuma'));
    const routineCallTypeDefinition = await typeDefinitionAt(routineCallVariable + 2);
    assert.ok(routineCallTypeDefinition);
    assert.equal(routineCallTypeDefinition.length, 1);
    assert.deepEqual(routineCallTypeDefinition[0].range, new vscode.Range(
      new vscode.Position(3, 4),
      new vscode.Position(3, 10)
    ));

    const fieldName = text.lastIndexOf('logradouro');
    const fieldTypeDefinition = await typeDefinitionAt(fieldName + 2);
    assert.ok(fieldTypeDefinition);
    assert.equal(fieldTypeDefinition.length, 1);
    assert.deepEqual(fieldTypeDefinition[0].range, new vscode.Range(
      new vscode.Position(0, 4),
      new vscode.Position(0, 10)
    ));
  });

  test('Provides hierarchical document symbols for declarations and fields', async () => {
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
      'Uma pessoa é uma estrutura com',
      '  Um número denominado idade.',
      'O cliente é uma pessoa.',
      'Rotina para que se exemplifique com uma pessoa:',
      '  Retorne.'
    ].join('\n'));
    await diagnosticsUpdated;

    const symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>(
      'vscode.executeDocumentSymbolProvider',
      docUri
    );
    assert.ok(symbols);
    assert.deepEqual(symbols.map(symbol => symbol.name), [
      'pessoa',
      'cliente',
      'exemplifique com'
    ]);
    assert.equal(symbols[0].kind, vscode.SymbolKind.Struct);
    assert.equal(symbols[0].children?.[0].name, 'idade');
    assert.equal(symbols[1].kind, vscode.SymbolKind.Variable);
    assert.equal(symbols[2].kind, vscode.SymbolKind.Function);
    assert.equal(symbols[2].children?.[0].name, 'pessoa');
  });

  test('Searches symbols in closed workspace source files', async () => {
    await activate(docUri);
    const filePath = getDocPath('definitions/workspace-symbol-test.pop');
    const fileUri = vscode.Uri.file(filePath);
    await writeFile(filePath, 'Um WorkspaceSymbolProbe é uma estrutura.\n', 'ascii');
    try {
      const symbols = await vscode.commands.executeCommand<vscode.SymbolInformation[]>(
        'vscode.executeWorkspaceSymbolProvider',
        'WorkspaceSymbolProbe'
      );
      const match = symbols?.find(symbol => symbol.name === 'WorkspaceSymbolProbe');
      assert.ok(match);
      assert.equal(match.location.uri.toString(), fileUri.toString());
    } finally {
      await unlink(filePath);
    }
  });

  test('Finds type, routine, and global-variable references across the workspace', async () => {
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
      'Um carro é uma estrutura.',
      'Um esportivo é um carro.',
      'Uma garagem é uma estrutura com um carro denominado veículo.',
      'O carro atual é um carro.',
      'O carro destino é um carro.',
      'Rotina para que se conduza um carro:',
      '  Retorne.',
      'Rotina para que se teste:',
      '  Conduza o carro atual.',
      '  Atribua o carro atual para o carro destino.'
    ].join('\n');
    await setTestContent(source);
    await diagnosticsUpdated;
    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const externalPath = getDocPath('definitions/references-test.pop');
    const externalUri = vscode.Uri.file(externalPath);
    await writeFile(externalPath, 'Um conversivel é um carro.\n', 'latin1');
    try {
      const referencesAt = (offset: number) =>
        vscode.commands.executeCommand<vscode.Location[]>(
          'vscode.executeReferenceProvider',
          docUri,
          document.positionAt(offset),
          true
        );

      const typeOffset = text.indexOf('carro') + 1;
      const typeReferences = await referencesAt(typeOffset);
      assert.ok(typeReferences);
      assert.ok(typeReferences.length >= 5);
      assert.ok(typeReferences.some(reference =>
        reference.uri.toString() === externalUri.toString()
      ));

      const routineOffset = text.indexOf('conduza') + 2;
      const routineReferences = await referencesAt(routineOffset);
      assert.ok(routineReferences);
      assert.equal(routineReferences.length, 2);

      const variableOffset = text.indexOf('carro atual') + 2;
      const variableReferences = await referencesAt(variableOffset);
      assert.ok(variableReferences);
      assert.equal(variableReferences.length, 3);
    } finally {
      await unlink(externalPath);
    }
  });

  test('Renames types, routines, and global variables across the workspace', async () => {
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
      'Um veiculo é uma estrutura.',
      'Um esportivo é um veiculo.',
      'Um carro é uma estrutura com um byte denominado cor.',
      'O veiculo atual é um carro.',
      'O carro destino é um carro.',
      'Rotina para que se conduza um carro:',
      '  Retorne.',
      'Rotina para que se teste:',
      '  Conduza o veiculo atual.',
      '  Atribua o veiculo atual para o carro destino.',
      '  Atribua 1 para a cor deste veiculo atual.'
    ].join('\n'));
    await diagnosticsUpdated;

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const externalPath = getDocPath('definitions/rename-test.pop');
    const externalUri = vscode.Uri.file(externalPath);
    await writeFile(externalPath, 'Um caminhao é um veiculo.\n', 'latin1');
    try {
      const renameAt = (offset: number, newName: string) =>
        vscode.commands.executeCommand<vscode.WorkspaceEdit>(
          'vscode.executeDocumentRenameProvider',
          docUri,
          document.positionAt(offset),
          newName
        );

      const typeRename = await renameAt(text.indexOf('veiculo') + 1, 'transporte');
      assert.ok(typeRename);
      assert.equal(typeRename.get(docUri).length, 2);
      assert.equal(typeRename.get(externalUri).length, 1);

      const routineRename = await renameAt(text.indexOf('conduza') + 2, 'dirija');
      assert.ok(routineRename);
      assert.equal(routineRename.get(docUri).length, 2);

      const variableRename = await renameAt(text.indexOf('veiculo atual') + 2, 'automovel atual');
      assert.ok(variableRename);
      assert.equal(variableRename.get(docUri).length, 4);

      const fieldRename = await renameAt(text.indexOf('cor') + 1, 'pintura');
      assert.ok(fieldRename);
      assert.equal(fieldRename.get(docUri).length, 2);
    } finally {
      await unlink(externalPath);
    }
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

  test('Reuses parsed catalogs across requests and refreshes them after edits and renames', async () => {
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
      'Uma letra é um byte.',
      'Um símbolo é uma letra.'
    ].join('\n'));
    await diagnosticsUpdated;

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const referenceOffset = text.lastIndexOf('letra') + 2;
    const requestDefinitions = () => vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(referenceOffset)
    );
    const requestReferences = () => vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeReferenceProvider',
      docUri,
      document.positionAt(text.indexOf('letra') + 1),
      true
    );

    for (let request = 0; request < 2; request++) {
      const definitions = await requestDefinitions();
      assert.equal(definitions?.[0].range.start.line, 0);
      assert.equal((await requestReferences())?.length, 2);
      const symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>(
        'vscode.executeDocumentSymbolProvider',
        docUri
      );
      assert.deepEqual(symbols?.map(symbol => symbol.name), ['letra', 'símbolo']);
    }

    const rename = await vscode.commands.executeCommand<vscode.WorkspaceEdit>(
      'vscode.executeDocumentRenameProvider',
      docUri,
      document.positionAt(text.indexOf('letra') + 1),
      'caractere'
    );
    assert.equal(rename?.get(docUri).length, 2);

    const renamedDiagnosticsUpdated = new Promise<void>(resolve => {
      const listener = vscode.languages.onDidChangeDiagnostics(event => {
        if (event.uris.some(uri => uri.toString() === docUri.toString())) {
          listener.dispose();
          resolve();
        }
      });
    });
    assert.ok(await vscode.workspace.applyEdit(rename!));
    await renamedDiagnosticsUpdated;

    const renamedText = document.getText();
    const renamedDefinitions = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(renamedText.lastIndexOf('caractere') + 2)
    );
    assert.equal(renamedDefinitions?.[0].range.start.line, 0);
    const updatedSymbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>(
      'vscode.executeDocumentSymbolProvider',
      docUri
    );
    assert.deepEqual(updatedSymbols?.map(symbol => symbol.name), ['caractere', 'símbolo']);
  });

  test('Builds type catalogs for small, medium, and large documents', async () => {
    await activate(docUri);
    const typeName = (value: number): string => {
      let suffix = '';
      do {
        suffix = String.fromCharCode(97 + value % 26) + suffix;
        value = Math.floor(value / 26) - 1;
      } while (value >= 0);
      return `tipo${suffix}`;
    };

    for (const size of [20, 1000, 6000]) {
      const diagnosticsUpdated = new Promise<void>(resolve => {
        const listener = vscode.languages.onDidChangeDiagnostics(event => {
          if (event.uris.some(uri => uri.toString() === docUri.toString())) {
            listener.dispose();
            resolve();
          }
        });
      });
      const source = Array.from({ length: size }, (_, index) =>
        index === 0
          ? `Um ${typeName(index)} é uma estrutura.`
          : `Um ${typeName(index)} é uma estrutura com um ${typeName(index - 1)} denominado campo.`
      ).join('\n');
      await setTestContent(source);
      await diagnosticsUpdated;

      const symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>(
        'vscode.executeDocumentSymbolProvider',
        docUri
      );
      assert.equal(symbols?.length, size);
      assert.equal(symbols?.[size - 1].children?.length, size > 1 ? 1 : 0);
      assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
    }
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

  test('Accepts unsigned fractional scalar factors', async () => {
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
      'Uma polegada é um número.',
      'Um centímetro são 254/100 polegadas.',
      'Um milímetro é 1/10 centímetros.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const baseOffset = text.indexOf('polegadas', text.indexOf('centímetro'));
    const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(baseOffset + 3)
    );
    assert.ok(definitions);
    assert.equal(definitions.length, 1);
    assert.equal(definitions[0].range.start.line, 1);
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

  test('Resolves endereçamento, magnitude, and conteúdo as type operators', async () => {
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
      'Um ponteiro é uma estrutura.',
      'Um pchar é um ponteiro para um caractere.',
      'Um número é uma estrutura.',
      'Uma string é uma estrutura com',
      '  Um caractere inicial,',
      '  Um caractere final.',
      'Um caractere inicial é um ponteiro para um byte.',
      'Um caractere final é um ponteiro para um byte.',
      'O conteúdo é uma string igual a "conteúdo".',
      'A magnitude é uma string igual a "magnitude".',
      'O endereçamento é uma string igual a "endereçamento".',
      'Rotina para que se faça algo com um caractere:',
      '  Atribua endereçamento deste caractere para um pchar denominado endereço.',
      '  Atribua "oi" para uma string.',
      '  Atribua a magnitude desta string para um número denominado tamanho.',
      'Rotina para que se use um número:',
      '  Retorne.',
      'Rotina para que se use um byte:',
      '  Retorne.',
      'Um ppcinicial é um ponteiro para um caractere inicial.',
      'Rotina para que se use um ppcinicial:',
      '  Retorne.',
      'Rotina para que se faça algo com uma string:',
      '  Atribua o conteúdo deste caractere inicial desta string para um byte denominado valor.',
      '  Atribua a magnitude deste caractere inicial desta string para um número denominado tamanho do caractere.',
      '  Atribua o endereçamento deste caractere inicial desta string para um pchar denominado endereço do caractere.',
      '  Use a magnitude deste caractere inicial desta string.',
      '  Use o conteúdo deste caractere inicial desta string.',
      '  Use o endereçamento deste caractere inicial desta string.',
      '  Escreva o conteúdo junto com o endereçamento junto com a magnitude para StdOut.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
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
      '  4 palavras.',
      'Um tipo de exemplo é uma estrutura com',
      '  32 bytes denominados bytes de teste.'
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

    const symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>(
      'vscode.executeDocumentSymbolProvider',
      docUri
    );
    const namedByteArray = symbols?.find(symbol => symbol.name === 'tipo de exemplo')
      ?.children?.find(symbol => symbol.name === 'bytes de teste');
    assert.ok(namedByteArray);
    assert.equal(namedByteArray.detail, '32 bytes');
  });

  test('Keeps named byte fields separate from neighboring byte arrays', async () => {
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
      'Uma estrutura de exemplo é uma estrutura com',
      '  3 bytes,',
      '  Um byte denominado x,',
      '  1 byte.',
      '',
      'Uma nova estrutura de exemplo é uma estrutura com',
      '  3 bytes,',
      '  1 byte denominado x,',
      '  1 byte.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
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
      'As aspas duplas são um byte igual a 34.',
      "A letra 'É' maiúscula é um byte igual a 201.",
      "O 'É' maiúsculo é um byte igual a 201."
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
  });

  test('Recognizes null literals in initializers, assignments, process arguments, and conditions', async () => {
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
      'Um ponteiro é uma estrutura.',
      'O ponteiro nulo é um ponteiro igual a nulo.',
      'Rotina para que se consuma um ponteiro:',
      '  Retorne.',
      'Rotina para que se faça algo com um ponteiro:',
      '  Atribua nulo ao ponteiro.',
      '  Consuma nulo.',
      '  Processe "lib.dll" "consume" com nulo e nula e nulos e nulas e inexistente e inexistentes e zerado e nil.',
      '  Se o ponteiro for inexistente, retorne.',
      'Função para que se determine se um ponteiro é um segundo ponteiro:',
      '  Diga sim.'
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

  test('Allows reserved words joined by hyphens, slashes, or apostrophes', async () => {
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
      'O caractere EM é um byte igual a 25.',
      'A letra E maiúscula é um byte igual a 69.',
      "O 'E' maiúsculo é um byte igual a 69.",
      'O e minúsculo é um byte igual a 101.',
      'O sinal de mais-ou-menos é um byte igual a 177.',
      'O little-e-acute byte é um byte igual a 233.',
      'A tecla E/e é uma tecla igual a 69.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.deepEqual(
      diagnostics.filter(diagnostic =>
        diagnostic.message.includes('cannot be used in an identifier')
      ),
      []
    );
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

  test('Uses tal como and tal qual to type routine arguments without changing variables', async () => {
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
      'Uma cifra binária é um byte.',
      'Uma cifra hexadecimal é um byte.',
      'Uma string é uma estrutura.',
      'Rotina para que se receba um byte:',
      '  Retorne.',
      'Rotina para que se receba uma cifra hexadecimal:',
      '  Retorne.',
      'Rotina para que se receba uma string:',
      '  Retorne.',
      'Rotina para que se teste com uma string:',
      '  Receba a string tal como uma cifra binária.',
      '  Receba a string tal qual uma cifra hexadecimal.',
      '  Receba a string.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.deepEqual(diagnostics, []);

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const calls = [
      { reference: 'Receba a string tal como', expectedLine: 3 },
      { reference: 'Receba a string tal qual', expectedLine: 5 },
      { reference: 'Receba a string.', expectedLine: 7 }
    ];
    for (const testCase of calls) {
      const offset = text.indexOf(testCase.reference, text.indexOf('teste'));
      const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeDefinitionProvider',
        docUri,
        document.positionAt(offset + 2)
      );
      assert.ok(definitions);
      assert.equal(definitions.length, 1);
      assert.equal(definitions[0].range.start.line, testCase.expectedLine);
    }
  });

  test('Uses parenthetical header qualifiers to distinguish routines', async () => {
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
      'Uma caixa é uma estrutura.',
      'A janela é uma caixa.',
      'Rotina para que se centralize uma caixa:',
      '  Retorne.',
      'Rotina para que se centralize uma caixa (horizontalmente):',
      '  Retorne.',
      'Rotina para que se centralize uma caixa (verticalmente):',
      '  Retorne.',
      'Rotina para que se finalize (itere uma string',
      '  decodifique):',
      '  Retorne.',
      'Rotina para que se teste:',
      '  Centralize a janela.',
      '  Centralize a janela (horizontalmente).',
      '  Centralize a janela (verticalmente).',
      '  Finalize (itere uma string',
      '    decodifique).'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const cases = [
      { reference: 'Centralize a janela.', expectedLine: 2 },
      { reference: 'Centralize a janela (horizontalmente)', expectedLine: 4 },
      { reference: 'Centralize a janela (verticalmente)', expectedLine: 6 },
      { reference: 'Finalize (itere uma string', expectedLine: 8 }
    ];
    for (const testCase of cases) {
      const offset = text.indexOf(testCase.reference, text.indexOf('teste'));
      const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeDefinitionProvider',
        docUri,
        document.positionAt(offset + 2)
      );
      assert.ok(definitions);
      assert.equal(definitions.length, 1);
      assert.equal(definitions[0].range.start.line, testCase.expectedLine);
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

  test('Recognizes Aloque memória para on list variables and types', async () => {
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
      'Uma lista é uma estrutura.',
      'Um versículo é uma lista.',
      'Uma imagem é uma lista.',
      'A imagem é uma imagem.',
      'para que se faça algumas alocações:',
      '  Aloque memória para um versículo.',
      '  Aloque memória para a imagem.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
  });

  test('Declares an allocated local variable for later routine calls', async () => {
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
      'Rotina para que se adicione um nome para umas alternativas:',
      '  Aloque memória para uma alternativa.',
      '  Acrescente a alternativa para as alternativas.',
      'Rotina para que se atribua uma string para uma segunda string:',
      '  Retorne.',
      'Rotina para que se acrescente uma lista em umas listas:',
      '  Retorne.',
      'As alternativas são umas alternativas.',
      'Uma alternativa é uma lista.',
      'Um ponteiro é uma estrutura com 4 bytes.',
      'Uma lista é um ponteiro para uma lista estruturada.',
      'Uma lista estruturada é uma estrutura com',
      '  Uma lista denominada lista posterior e',
      '  Uma lista denominada lista anterior.',
      'Umas listas são uma estrutura com',
      '  Uma lista denominada lista inicial e',
      '  Uma lista denominada lista final.',
      'Uma string é uma estrutura.',
      'Um nome é um byte.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const callOffset = text.indexOf('a alternativa para') + 4;
    const definition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(callOffset)
    );
    assert.ok(definition);
    assert.equal(definition.length, 1);
    assert.equal(definition[0].range.start.line, 1);

    const routineCallOffset = text.indexOf('Acrescente a alternativa') + 2;
    const routineDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(routineCallOffset)
    );
    assert.ok(routineDefinition);
    assert.equal(routineDefinition.length, 1);
    assert.equal(routineDefinition[0].range.start.line, 5);
  });

  test('Validates list types and variables passed to Aloque memória para', async () => {
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
      'Uma lista é uma estrutura.',
      'Um número é uma estrutura.',
      'A contagem é um número.',
      'para que se faça alocações:',
      '  Aloque memória para a contagem.',
      '  Aloque memória para uma variável desconhecida.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === '"Aloque memória para" only accepts variables and types based on "lista".'
    ).length, 1);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === 'Unknown variable or type "variável desconhecida" after "Aloque memória para".'
    ).length, 1);
  });

  test('Resolves routine addresses through Direcione, Aponte, and Redirecione', async () => {
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
      'Um ponteiro é uma estrutura.',
      'Um ponteiro de rotina é um ponteiro.',
      'para que se demonstre os direcionamentos:',
      '  Direcione um ponteiro de rotina para a rotina faça alguma coisa.',
      '  Aponte um ponteiro de rotina para a rotina faça alguma coisa.',
      '  Redirecione um ponteiro de rotina para a rotina faça alguma coisa.',
      'para que se compativelmente faça alguma coisa:',
      '  Retorne.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const routineNameOffset = text.indexOf('Direcione um ponteiro de rotina para a rotina') +
      'Direcione um ponteiro de rotina para a rotina '.length + 2;
    const definition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(routineNameOffset)
    );
    assert.ok(definition);
    assert.equal(definition.length, 1);
    assert.equal(definition[0].range.start.line, 6);
  });

  test('Requires routine addresses to use pointer types and compatible routines', async () => {
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
      'Um ponteiro é uma estrutura.',
      'Um número é uma estrutura.',
      'para que se demonstre os direcionamentos:',
      '  Direcione um número para a rotina faça alguma coisa.',
      'para que se faça alguma coisa:',
      '  Retorne.',
      'para que se redirecione:',
      '  Retorne.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === '"Direcione" only accepts types based on "ponteiro".'
    ).length, 1);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === 'Routine "faça alguma coisa" must be declared with "compativelmente" to provide its address.'
    ).length, 1);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message.includes('No compatible routine found')
    ).length, 0);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === '"Redirecione" is a reserved statement keyword and cannot be used in a routine name.'
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
      'Um bipe é um byte.',
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
      'Rotina para que se emita um bipe usando um número denominado valor:',
      '  Processe "user32.dll" "MessageBeep" com o valor retornando um número denominado resultado.',
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
    assert.equal(fieldDefinition[0].range.start.line, 4);

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

  test('Accepts endereçamento of a newly declared type as a Processe argument', async () => {
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
      'Um status de erro é uma estrutura.',
      'O número identificador do fluxo de entrada padrão é um número igual a 0.',
      'Rotina para que se obtenha o modo do console:',
      '  Processe "kernel32.dll" "GetConsoleMode" com',
      '    O número identificador do fluxo de entrada padrão e',
      '    O endereçamento dum número denominado modo do console',
      '    Retornando um status de erro.',
      '  Atribua 1 para o modo do console.',
      'Rotina para que se obtenha o endereço de um byte:',
      '  Processe "kernel32.dll" "GetConsoleMode" com',
      '    O endereçamento dum byte denominado endereço de byte.',
      'Rotina para que se consuma esse byte:',
      '  Retorne.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
  });

  test('Stores a Processe return value in an existing routine parameter', async () => {
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
      'O total global é um número igual a 0.',
      'Uma fração é uma estrutura com',
      '  Um número denominado numerador e',
      '  Um número denominado denominador.',
      'Rotina para que se multiplique um número por uma fração:',
      '  Processe "kernel32.dll" "MulDiv" retornando o número.',
      'Rotina para que se atualize:',
      '  Processe "kernel32.dll" "GetTickCount" retornando o total global.',
      'Rotina para que se crie um número:',
      '  Retorne.',
      'Rotina para que se use:',
      '  Crie um número denominado valor local.',
      '  Processe "kernel32.dll" "GetTickCount" retornando o valor local.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
    const document = await vscode.workspace.openTextDocument(docUri);
    const returnedParameterOffset = document.getText().lastIndexOf('o número') + 3;
    const definition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(returnedParameterOffset)
    );
    assert.ok(definition);
    assert.equal(definition.length, 1);
    assert.equal(definition[0].range.start.line, 5);
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

  test('Allows boolean functions with Decodifique instructions to manage their own return', async () => {
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
      'Função para que se determine se codificado:',
      '  Decodifique $C7C001000000.',
      '  Decodifique $8B9D08000000.',
      'Função para que se determine se texto:',
      '  Escreva "Decodifique" para StdOut.',
      'Função para que se determine se comentário:',
      '  Escreva "teste" para StdOut. \\ Decodifique $C7C001000000'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === 'Boolean functions must contain a valid "Diga sim" or "Diga não" statement.'
    ).length, 2);
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

  test('Parses unary numeric signs and fraction division in assignments', async () => {
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
      'Uma fração é uma estrutura.',
      'Rotina para que se exemplifique com um número, um segundo número, uma fração:',
      '  Atribua - o número para o segundo número.',
      '  Atribua + o número para o segundo número.',
      '  Atribua o número / o segundo número para a fração.',
      '  Atribua o número / 123 para a fração.',
      '  Atribua 456 / o segundo número para a fração.'
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

  test('Declares a local variable from one routine argument without consuming later arguments', async () => {
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
      'Rotina para que se adicione uma string para uns conjuntos de texto:',
      '  Crie um conjunto de texto usando a string.',
      '  Acrescente o conjunto de texto para os conjuntos de texto.',
      'Rotina para que se crie um conjunto de texto usando uma string:',
      '  Retorne.',
      'Rotina para que se acrescente uma lista para umas listas:',
      '  Retorne.',
      'Uma lista é uma estrutura.',
      'Um conjunto de texto é uma lista com uma string.',
      'Um caractere é um byte.',
      'Um ponteiro é uma estrutura com 4 bytes.',
      'Um endereço de byte é um ponteiro para um byte.',
      'Um caractere inicial é um ponteiro para um byte.',
      'Um caractere final é um ponteiro para um byte.',
      'Uma string é uma estrutura com',
      '  Um caractere inicial e',
      '  Um caractere final.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
  });

  test('Declares multiple local variables from separate routine arguments', async () => {
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
      'Uma word é uma estrutura com',
      '  Um byte denominado byte inicial e',
      '  Um byte denominado byte final.',
      'Uma word de ordem inferior é uma word.',
      'Uma word de ordem superior é uma word.',
      'Um número é uma estrutura com',
      '  Um byte denominado primeiro byte,',
      '  Um byte denominado segundo byte,',
      '  Um byte denominado terceiro byte,',
      '  Um byte denominado quarto byte,',
      '  Uma word de ordem inferior sob o primeiro byte,',
      '  Uma word de ordem superior sob o terceiro byte.',
      'Uma string é uma estrutura.',
      'Uma cifra hexadecimal é uma string.',
      'Rotina para que se converta um número para uma cifra hexadecimal:',
      '  Subdivida o número em um word e uma segunda word.',
      '  Converta a word para a cifra hexadecimal.',
      '  Converta a segunda word para uma segunda cifra hexadecimal.',
      '  Acrescente a segunda cifra hexadecimal para a cifra hexadecimal.',
      'Rotina para que se subdivida um número em uma word e uma segunda word:',
      '  Retorne.',
      'Rotina para que se acrescente uma string para uma segunda string:',
      '  Retorne.',
      'Rotina para que se converta uma word para uma cifra hexadecimal:',
      '  Retorne.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
  });

  test('Diagnoses local variables that reuse routine parameter names', async () => {
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
      'para que se foo um byte:',
      '  Adicione 1 para o byte.',
      '  Bar um byte.',
      'para que se bar um byte:',
      '  Retorne.'
    ].join('\n'));
    await diagnosticsUpdated;

    const duplicateDiagnostic = vscode.languages.getDiagnostics(docUri).find(
      diagnostic => diagnostic.message.includes('already declared in this routine')
    );
    assert.ok(duplicateDiagnostic);
    assert.deepEqual(
      duplicateDiagnostic.range,
      new vscode.Range(new vscode.Position(2, 9), new vscode.Position(2, 13))
    );
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
      'Rotina para que se atribua uma string para uma segunda string:',
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

  test('Accepts scalar literals when routine parameters use plural type names', async () => {
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

    const pluralParameterDiagnostics = await updateContent([
      'Um número é uma estrutura.',
      'Um quadrado é um número.',
      'Uma palavra de ordem é um número.',
      'para que se exemplifique:',
      '  Pinte 5 quadrados.',
      '  Pinte 1/2 palavras de ordem.',
      'para que se pinte uns quadrados:',
      '  Retorne.',
      'para que se pinte umas palavras de ordem:',
      '  Retorne.'
    ]);
    assert.deepEqual(pluralParameterDiagnostics, []);

    const singularParameterDiagnostics = await updateContent([
      'Um número é uma estrutura.',
      'Um quadrado é um número.',
      'para que se exemplifique:',
      '  Pinte 5 quadrados.',
      'para que se pinte um quadrado:',
      '  Retorne.'
    ]);
    assert.equal(
      singularParameterDiagnostics.filter(diagnostic =>
        diagnostic.message === 'No compatible routine found for "Pinte 5 quadrados".'
      ).length,
      1
    );
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

  test('Resolves estar predicates and derived types in conditional expressions', async () => {
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
      'Um ponteiro é uma estrutura.',
      'Um caractere inicial é um ponteiro para um byte.',
      'Um caractere final é um ponteiro para um byte.',
      'Uma string é uma estrutura com',
      '  Um caractere inicial e',
      '  Um caractere final.',
      'Um subtexto é uma string.',
      'para que se faça algo com um subtexto:',
      '  Se o subtexto estiver em branco, retorne.',
      'Função para que se determine se uma string está em branco:',
      '  Decodifique $B801000000.',
      '  Decodifique $8B9D08000000.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.deepEqual(diagnostics, []);

    const document = await vscode.workspace.openTextDocument(docUri);
    const predicateOffset = document.getText().indexOf('estiver') + 2;
    const definition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(predicateOffset)
    );
    assert.ok(definition);
    assert.equal(definition.length, 1);
    assert.equal(definition[0].range.start.line, 9);

    const variableOffset = document.getText().indexOf('subtexto', document.getText().indexOf('Se '));
    const typeDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeTypeDefinitionProvider',
      docUri,
      document.positionAt(variableOffset + 2)
    );
    assert.ok(typeDefinition);
    assert.equal(typeDefinition.length, 1);
    assert.equal(typeDefinition[0].range.start.line, 6);
  });

  test('Resolves boolean predicates followed by a preposition and second parameter', async () => {
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
      'Um ponteiro é uma estrutura.',
      'Rotina para que se teste um subtexto e uma string:',
      '  Se o subtexto estiver na string, retorne.',
      'Função para que se determine se uma string está em uma segunda string:',
      '  Diga sim.',
      'Um caractere inicial é um ponteiro para um byte.',
      'Um caractere final é um ponteiro para um byte.',
      'Uma string é uma estrutura com',
      '  Um caractere inicial e',
      '  Um caractere final.',
      'Um subtexto é uma string.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
    const document = await vscode.workspace.openTextDocument(docUri);
    const predicateOffset = document.getText().indexOf('estiver') + 2;
    const definition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(predicateOffset)
    );
    assert.ok(definition);
    assert.equal(definition.length, 1);
    assert.equal(definition[0].range.start.line, 3);
  });

  test('Resolves boolean conditions using locals introduced by calls inside loops', async () => {
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
      'Rotina para que se cite uma string:',
      '  Lance um subtexto sobre a string.',
      '  Itere.',
      '    Se o subtexto estiver em branco, pare.',
      '  Reitere.',
      'Rotina para que se lance um subtexto sobre uma string:',
      '  Decodifique $8B8508000000.',
      '  Decodifique $8B9D0C000000.',
      '  Decodifique $8B8B00000000.',
      '  Decodifique $898800000000.',
      '  Decodifique $8B8B04000000.',
      '  Decodifique $898804000000.',
      'Função para que se determine se uma string está em branco:',
      '  Decodifique $B801000000.',
      '  Decodifique $8B9D08000000.',
      '  Decodifique $833B00.',
      '  Decodifique $0F8410000000.',
      '  Decodifique $8B5304.',
      '  Decodifique $3B13.',
      '  Decodifique $0F8C05000000.',
      '  Decodifique $B800000000.',
      'Um ponteiro é uma estrutura.',
      'Um caractere inicial é um ponteiro para um byte.',
      'Um caractere final é um ponteiro para um byte.',
      'Uma string é uma estrutura com',
      '  Um caractere inicial e',
      '  Um caractere final.',
      'Um subtexto é uma string.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.filter(diagnostic =>
      diagnostic.message === 'No boolean function found for condition "o subtexto estiver em branco".'
    ).length, 0, diagnostics.map(diagnostic => diagnostic.message).join('\n'));

    const document = await vscode.workspace.openTextDocument(docUri);
    const text = document.getText();
    const predicateOffset = text.indexOf('estiver') + 2;
    const definition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(predicateOffset)
    );
    assert.ok(definition);
    assert.equal(definition.length, 1);
    assert.equal(definition[0].range.start.line, 12);

    const variableOffset = text.indexOf('subtexto', text.indexOf('Se '));
    const typeDefinition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeTypeDefinitionProvider',
      docUri,
      document.positionAt(variableOffset + 2)
    );
    assert.ok(typeDefinition);
    assert.equal(typeDefinition.length, 1);
    assert.equal(typeDefinition[0].range.start.line, 27);
  });

  test('Resolves appended structure fields and derived string arguments', async () => {
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
      'As aspas duplas são um byte igual a 34.',
      'Um ponteiro é uma estrutura.',
      'Uma cifra hexadecimal é uma estrutura.',
      'Um caractere inicial é um ponteiro para um byte.',
      'Um caractere final é um ponteiro para um byte.',
      'Uma string é uma estrutura com',
      '  Um caractere inicial e',
      '  Um caractere final.',
      'Um subtexto é uma string.',
      'Rotina para que se cite uma string:',
      '  Atribua as aspas duplas para uma segunda string.',
      '  Lance um subtexto sobre a string.',
      '  Itere.',
      '    Se o subtexto estiver em branco, pare.',
      '    Acrescente o conteúdo deste caractere inicial deste subtexto para a segunda string.',
      '  Reitere.',
      '  Acrescente as aspas duplas para a segunda string.',
      '  Atribua a segunda string à string.',
      'Rotina para que se acrescente um byte para uma string:',
      '  Retorne.',
      'Rotina para que se lance um subtexto sobre uma string:',
      '  Decodifique $8B8508000000.',
      '  Decodifique $8B9D0C000000.',
      '  Decodifique $8B8B00000000.',
      '  Decodifique $898800000000.',
      '  Decodifique $8B8B04000000.',
      '  Decodifique $898804000000.',
      'Rotina para que se acrescente um ponteiro para uma string:',
      '  Converta o ponteiro para uma segunda string.',
      '  Acrescente a segunda string para a string.',
      'Rotina para que se acrescente uma string para uma segunda string:',
      '  Se a string estiver em branco, retorne.',
      'Rotina para que se converta um ponteiro para uma string:',
      '  Converta o ponteiro para a string tal como uma cifra hexadecimal.',
      'Rotina para que se converta um ponteiro para uma cifra hexadecimal:',
      '  Retorne.',
      'Função para que se determine se uma string está em branco:',
      '  Decodifique $B801000000.',
      '  Decodifique $8B9D08000000.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.deepEqual(diagnostics, []);
  });

  test('Ignores não in boolean conditions and rejects it in boolean headers', async () => {
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
      'Rotina para que se foo usando um número:',
      '  Se o número não for positivo, retorne.',
      'Função para que se determine se um número é positivo:',
      '  Diga sim.',
      'Função para que se determine se um número não é negativo:',
      '  Diga sim.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.equal(diagnostics.length, 1);
    assert.equal(
      diagnostics[0].message,
      '"não" cannot be part of a boolean function header.'
    );

    const document = await vscode.workspace.openTextDocument(docUri);
    const conditionOffset = document.getText().indexOf('positivo', document.getText().indexOf('Se '));
    const definition = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      docUri,
      document.positionAt(conditionOffset + 2)
    );
    assert.ok(definition);
    assert.equal(definition.length, 1);
    assert.equal(definition[0].range.start.line, 3);
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

  test('Keeps routine parameter prepositions distinct while matching their synonyms', async () => {
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
      'Um contador é um número.',
      'Rotina para que se exemplifique:',
      '  Foo um contador.',
      '  Atribua 0 para um contador denominado segundo contador.',
      '  Foo para o segundo contador.',
      '  Foo em um contador denominado terceiro contador.',
      '  Atribua 1 para um contador denominado quarto contador.',
      '  Foo com o quarto contador.',
      '  Foo usando um contador denominado quinto contador.',
      '  Foo com um sexto contador.',
      'para que se foo um contador:',
      '  Retorne.',
      'para que se foo para um contador:',
      '  Retorne.',
      'para que se foo com um contador:',
      '  Retorne.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
    const document = await vscode.workspace.openTextDocument(docUri);
    for (const [callText, expectedLine] of [
      ['Foo um contador', 11],
      ['Foo para o segundo contador', 13],
      ['Foo em um contador', 13],
      ['Foo com o quarto contador', 15],
      ['Foo usando um contador', 15]
    ] as const) {
      const offset = document.getText().indexOf(callText) + 1;
      const definition = await vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeDefinitionProvider',
        docUri,
        document.positionAt(offset)
      );
      assert.ok(definition);
      assert.equal(definition.length, 1);
      assert.equal(definition[0].range.start.line, expectedLine);
    }
  });

  test('Parses routine parameter lists around trailing and interleaved direction phrases', async () => {
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
      'Uma word é uma estrutura com',
      '  Um byte denominado byte inicial e',
      '  Um byte denominado byte final.',
      'Uma word de ordem inferior é uma word.',
      'Uma word de ordem superior é uma word.',
      'Um número é uma estrutura com',
      '  Um byte denominado primeiro byte,',
      '  Um byte denominado segundo byte,',
      '  Um byte denominado terceiro byte,',
      '  Um byte denominado quarto byte,',
      '  Uma word de ordem inferior sob o primeiro byte,',
      '  Uma word de ordem superior sob o terceiro byte.',
      'Uma unidade é um número.',
      'Um bit é uma unidade.',
      'Uns bits são umas unidades.',
      'Rotina para que se desloque para a direita uns bits em um byte;',
      'Rotina para que se desloque uns bits em um byte para a direita:',
      '  Decodifique $8B8D0C000000.',
      'Rotina para que se desloque um byte uns bits para a direita:',
      '  Decodifique $8B8D0C000000.',
      'Rotina para que se mova um byte para a esquerda uns bits:',
      '  Decodifique $8B8D0C000000.',
      'Rotina para que se efetue o deslocamento de uns bits para a esquerda em um byte:',
      '  Decodifique $8B8D0C000000.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.deepEqual(diagnostics, []);
    const symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>(
      'vscode.executeDocumentSymbolProvider',
      docUri
    );
    const shiftRoutines = symbols.filter(symbol => symbol.name === 'desloque');
    assert.deepEqual(
      shiftRoutines.map(symbol => symbol.detail),
      ['rotina bits bits byte byte', 'rotina byte byte bits bits']
    );
    const directionalRoutine = symbols.find(symbol => symbol.name === 'mova');
    assert.equal(directionalRoutine?.detail, 'rotina byte byte bits bits');
    const interleavedDirectionRoutine = symbols.find(symbol =>
      symbol.name === 'efetue o deslocamento de'
    );
    assert.equal(interleavedDirectionRoutine?.detail, 'rotina bits bits byte byte');
  });

  test('Uses each indefinite article to start a routine parameter', async () => {
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
      'Um bipe é um byte.',
      'Um número é uma estrutura.',
      'Rotina para que se emita um bipe usando um número denominado bipe:',
      '  Retorne.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.ok(diagnostics.some(diagnostic =>
      diagnostic.message === 'Local variable "bipe" is already declared in this routine.'
    ));
    assert.ok(diagnostics.every(diagnostic =>
      !diagnostic.message.startsWith('Unknown routine parameter type ')
    ));
  });

  test('Ends a routine parameter type at any routine-name delimiter', async () => {
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
      'Um ponteiro é uma estrutura com 4 bytes.',
      'Uma word é uma estrutura com',
      '  Um byte denominado byte inicial e',
      '  Um byte denominado byte final.',
      'Uma word de ordem inferior é uma word.',
      'Uma word de ordem superior é uma word.',
      'Um número é uma estrutura com',
      '  Um byte denominado primeiro byte,',
      '  Um byte denominado segundo byte,',
      '  Um byte denominado terceiro byte,',
      '  Um byte denominado quarto byte,',
      '  Uma word de ordem inferior sob o primeiro byte,',
      '  Uma word de ordem superior sob o terceiro byte.',
      'Uma quantidade de bytes é uma estrutura.',
      'Rotina para que se preencha bytes com um byte começando sob um ponteiro por um quantidade de bytes:',
      '  Decodifique $8BBD0C000000.',
      '  Decodifique $8B3F.',
      '  Decodifique $8B8D10000000.',
      '  Decodifique $8B09.',
      '  Decodifique $8B8508000000.',
      '  Decodifique $8A00.',
      '  Decodifique $FC.',
      '  Decodifique $F3AA.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.deepEqual(diagnostics, []);
    const symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>(
      'vscode.executeDocumentSymbolProvider',
      docUri
    );
    const routine = symbols.find(symbol => symbol.name === 'preencha bytes com');
    assert.equal(
      routine?.detail,
      'rotina byte byte ponteiro ponteiro quantidade de bytes quantidade de bytes'
    );
  });

  test('Keeps trailing routine-name phrases out of the final parameter type', async () => {
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
      'Rotina para que se arredonde um número para cima usando a potência de dois:',
      '  Decodifique $8B8D08000000.',
      'Rotina para que se atribua uma word para eax:',
      '  Decodifique $8B9D08000000.',
      '  Decodifique $0FBF03.',
      'Rotina para que se atribua um número para eax:',
      '  Decodifique $8B9D08000000.',
      '  Decodifique $8B03.',
      'Rotina para que se atribua um byte para eax:',
      '  Decodifique $8B9D08000000.',
      '  Decodifique $0FB603.',
      'Uma word é uma estrutura.',
      'Um número é uma estrutura.'
    ].join('\n'));
    await diagnosticsUpdated;

    const diagnostics = vscode.languages.getDiagnostics(docUri);
    assert.deepEqual(diagnostics, []);
    const symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>(
      'vscode.executeDocumentSymbolProvider',
      docUri
    );
    const routines = symbols.filter(symbol =>
      ['arredonde', 'atribua'].includes(symbol.name)
    );
    assert.deepEqual(
      routines.map(symbol => symbol.detail),
      [
        'rotina número número',
        'rotina word word',
        'rotina número número',
        'rotina byte byte'
      ]
    );
  });

  test('Treats an indefinite article after a contraction as a new parameter', async () => {
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
      'Rotina para que se inclua um byte no final de uma string:',
      '  Retorne.',
      'Um ponteiro é uma estrutura.',
      'Um caractere inicial é um ponteiro para um byte.',
      'Um caractere final é um ponteiro para um byte.',
      'Uma string é uma estrutura com',
      '  Um caractere inicial e',
      '  Um caractere final.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
    const symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>(
      'vscode.executeDocumentSymbolProvider',
      docUri
    );
    const routine = symbols.find(symbol => symbol.name === 'inclua');
    assert.equal(routine?.detail, 'rotina byte byte string string');
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

  test('Resolves hidden fields for linked-list types and derived lists', async () => {
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
      'Um ponteiro é uma estrutura.',
      'Uma lista é um ponteiro para uma lista estruturada.',
      'Uma lista estruturada é uma estrutura com',
      '  Uma lista denominada lista posterior e',
      '  Uma lista denominada lista anterior.',
      'Um número é uma estrutura.',
      'Uma coordenada é um número.',
      'Uma localização é uma estrutura com',
      '  Uma coordenada denominada coordenada X e',
      '  Uma coordenada denominada coordenada Y.',
      'Um vértice é uma lista com',
      '  Uma coordenada X,',
      '  Uma coordenada Y,',
      '  Uma localização sob a coordenada X.',
      'Um polígono é uma lista com uns vértices.',
      'Uma etiqueta é um número.',
      'Um fragmento é uma lista com uma etiqueta.',
      'Rotina para que se receba um vértice:',
      '  Retorne.',
      'Rotina para que se receba uma localização:',
      '  Retorne.',
      'Rotina para que se receba uma coordenada:',
      '  Retorne.',
      'Rotina para que se receba um fragmento:',
      '  Retorne.',
      'Rotina para que se receba um ponteiro:',
      '  Retorne.',
      'Rotina para que se teste com um polígono, um vértice, um fragmento:',
      '  Receba o primeiro vértice deste polígono.',
      '  Receba a primeira vértice deste polígono.',
      '  Receba o último vértice deste polígono.',
      '  Receba a última vértice deste polígono.',
      '  Receba o próximo vértice deste vértice.',
      '  Receba o vértice anterior deste vértice.',
      '  Receba o vértice precedente deste vértice.',
      '  Receba a localização deste primeiro vértice deste polígono.',
      '  Receba a coordenada X desta localização deste primeiro vértice deste polígono.',
      '  Receba o fragmento anterior deste fragmento.',
      '  Receba o fragmento precedente deste fragmento.',
      '  Receba este polígono.'
    ].join('\n'));
    await diagnosticsUpdated;

    assert.deepEqual(vscode.languages.getDiagnostics(docUri), []);
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
