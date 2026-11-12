const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { pathToFileURL } = require('node:url');

function createLspClient(child, workspaceFolder) {
  let buffer = Buffer.alloc(0);
  let nextRequestId = 0;
  const pendingRequests = new Map();
  const events = [];

  const send = message => {
    const body = Buffer.from(JSON.stringify(message));
    child.stdin.write(Buffer.concat([
      Buffer.from(`Content-Length: ${body.length}\r\n\r\n`),
      body
    ]));
  };

  const request = (method, params) => {
    const id = ++nextRequestId;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        pendingRequests.delete(id);
        reject(new Error(`Timed out waiting for LSP request "${method}".`));
      }, 15000);
      pendingRequests.set(id, message => {
        clearTimeout(timeout);
        resolve(message);
      });
      send({ jsonrpc: '2.0', id, method, params });
    });
  };

  child.stdout.on('data', data => {
    buffer = Buffer.concat([buffer, data]);
    while (true) {
      const headerEnd = buffer.indexOf('\r\n\r\n');
      if (headerEnd < 0) {
        return;
      }
      const header = buffer.subarray(0, headerEnd).toString('ascii');
      const length = Number(header.match(/Content-Length: (\d+)/i)?.[1]);
      if (!Number.isFinite(length) || buffer.length < headerEnd + 4 + length) {
        return;
      }
      const message = JSON.parse(
        buffer.subarray(headerEnd + 4, headerEnd + 4 + length).toString('utf8')
      );
      buffer = buffer.subarray(headerEnd + 4 + length);

      if (message.id !== undefined && pendingRequests.has(message.id)) {
        pendingRequests.get(message.id)(message);
      }
      if (message.method === 'workspace/workspaceFolders') {
        send({ jsonrpc: '2.0', id: message.id, result: [workspaceFolder] });
      }
      if (
        message.method === 'window/logMessage' &&
        message.params.message.includes('[POP-LSP profile]')
      ) {
        events.push(
          JSON.parse(message.params.message.slice(
            message.params.message.indexOf('{')
          ))
        );
      }
    }
  });

  return { events, request, send };
}

async function waitForEvent(
  events,
  predicate,
  description,
  startIndex = 0
) {
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    const match = events.slice(startIndex).find(predicate);
    if (match) {
      return match;
    }
    await new Promise(resolve => setTimeout(resolve, 25));
  }
  throw new Error(`Timed out waiting for ${description}.`);
}

function writeWindows1252(filePath, contents) {
  fs.writeFileSync(filePath, Buffer.from(contents, 'latin1'));
}

test('falls back for diagnostic snapshots and reuses unaffected clean documents', async () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'pop-lsp-context-'));
  const alphaPath = path.join(workspace, 'alpha.pop');
  const betaPath = path.join(workspace, 'beta.pop');
  const gammaPath = path.join(workspace, 'gamma.pop');
  const alphaUri = pathToFileURL(alphaPath).toString();
  const betaUri = pathToFileURL(betaPath).toString();
  const workspaceFolder = {
    uri: pathToFileURL(workspace).toString(),
    name: 'selective-context-test'
  };
  const initialAlpha = 'Uma alfa é um tipo ausente.';
  const initialBeta = 'Um beta é uma alfa.';
  const initialGamma = 'Uma gama é um byte.';
  writeWindows1252(alphaPath, initialAlpha);
  writeWindows1252(betaPath, initialBeta);
  writeWindows1252(gammaPath, initialGamma);

  const child = spawn(
    process.execPath,
    [path.resolve(__dirname, '../out/server.js'), '--stdio'],
    {
      env: { ...process.env, POP_LSP_PROFILE: '1' },
      stdio: ['pipe', 'pipe', 'pipe']
    }
  );
  const client = createLspClient(child, workspaceFolder);
  let stderr = '';
  child.stderr.on('data', data => {
    stderr += data.toString();
  });

  try {
    const initialize = await client.request('initialize', {
      processId: process.pid,
      rootUri: workspaceFolder.uri,
      workspaceFolders: [workspaceFolder],
      capabilities: {
        workspace: { workspaceFolders: { supported: true } }
      }
    });

    assert.ok(initialize.result);
    client.send({ jsonrpc: '2.0', method: 'initialized', params: {} });

    await waitForEvent(
      client.events,
      event => event.event === 'workspace-refresh' &&
        event.documents === 3 &&
        event.sourceChanges === 3,
      'the initial three-document workspace analysis'
    );

    client.send({
      jsonrpc: '2.0',
      method: 'textDocument/didOpen',
      params: {
        textDocument: {
          uri: alphaUri,
          languageId: 'portugues-puro',
          version: 1,
          text: initialAlpha
        }
      }
    });
    client.send({
      jsonrpc: '2.0',
      method: 'textDocument/didOpen',
      params: {
        textDocument: {
          uri: betaUri,
          languageId: 'portugues-puro',
          version: 1,
          text: initialBeta
        }
      }
    });

    client.send({
      jsonrpc: '2.0',
      method: 'textDocument/didChange',
      params: {
        textDocument: { uri: alphaUri, version: 2 },
        contentChanges: [{ text: 'Uma alfa é um byte.' }]
      }
    });
    const fallbackSelection = await waitForEvent(
      client.events,
      event => event.event === 'workspace-context-reuse-selection' &&
        event.reason === 'changed-document-has-diagnostics',
      'the changed diagnostic-bearing document fallback'
    );
    const fallbackIndex = client.events.indexOf(fallbackSelection);
    const fallbackRefresh = await waitForEvent(
      client.events,
      event => event.event === 'workspace-refresh',
      'the directory-wide fallback parse',
      fallbackIndex + 1
    );
    assert.equal(fallbackRefresh.contextualParseCount, 3);
    assert.equal(fallbackRefresh.selectiveContextCacheHits, 0);

    client.send({
      jsonrpc: '2.0',
      method: 'textDocument/didChange',
      params: {
        textDocument: { uri: alphaUri, version: 3 },
        contentChanges: [{ text: 'Uma alfa final é um byte.' }]
      }
    });
    const selectiveStartIndex = client.events.length;
    const selectiveRefresh = await waitForEvent(
      client.events,
      event => event.event === 'workspace-refresh' &&
        event.sourceChanges === 1 &&
        event.selectiveContextCacheHits > 0,
      'selective reuse for an unaffected document',
      selectiveStartIndex
    );
    assert.equal(selectiveRefresh.documents, 3);
    assert.equal(selectiveRefresh.contextualParseCount, 2);
    assert.equal(selectiveRefresh.selectiveContextCacheHits, 1);
    const dependencySelection = client.events.slice(selectiveStartIndex).find(
      event => event.event === 'workspace-context-reuse-selection'
    );
    assert.equal(dependencySelection.reason, 'dependency-closure');
    assert.equal(dependencySelection.affectedDocuments, 2);
    assert.equal(dependencySelection.regionAffectedDocuments, 2);
    assert.equal(dependencySelection.reusableDocuments, 1);
    assert.ok(dependencySelection.durationMs >= 0);
    const regionGraphProfile = client.events.slice(selectiveStartIndex).find(
      event => event.event === 'declaration-region-graph'
    );
    assert.ok(regionGraphProfile);
    assert.ok(regionGraphProfile.durationMs >= 0);
    assert.ok(regionGraphProfile.regions > 0);
    assert.ok(regionGraphProfile.dependencyEdges > 0);

    await client.request('shutdown', null);
    client.send({ jsonrpc: '2.0', method: 'exit', params: null });
    await once(child, 'close');
  } catch (error) {
    child.stdin.end();
    if (child.exitCode === null) {
      child.kill();
      await once(child, 'close');
    }
    throw new Error(
      `${error instanceof Error ? error.message : String(error)}\n${stderr}`
    );
  } finally {
    fs.rmSync(workspace, { recursive: true, force: true });
  }
});

test('reuses unchanged documents with unrelated diagnostics after body-only edits', async () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'pop-lsp-body-edit-'));
  const invalidPath = path.join(workspace, 'invalid.pop');
  const routinePath = path.join(workspace, 'routine.pop');
  const invalidUri = pathToFileURL(invalidPath).toString();
  const routineUri = pathToFileURL(routinePath).toString();
  const workspaceFolder = {
    uri: pathToFileURL(workspace).toString(),
    name: 'body-only-incremental-test'
  };
  const invalidSource = 'Uma alfa é um tipo ausente.';
  const initialRoutine = [
    'Um valor é um byte.',
    'Rotina para que se altere:',
    '  Retorne.'
  ].join('\n');
  writeWindows1252(invalidPath, invalidSource);
  writeWindows1252(routinePath, initialRoutine);

  const child = spawn(
    process.execPath,
    [path.resolve(__dirname, '../out/server.js'), '--stdio'],
    {
      env: { ...process.env, POP_LSP_PROFILE: '1' },
      stdio: ['pipe', 'pipe', 'pipe']
    }
  );
  const client = createLspClient(child, workspaceFolder);
  let stderr = '';
  child.stderr.on('data', data => {
    stderr += data.toString();
  });

  try {
    const initialize = await client.request('initialize', {
      processId: process.pid,
      rootUri: workspaceFolder.uri,
      workspaceFolders: [workspaceFolder],
      capabilities: {
        workspace: { workspaceFolders: { supported: true } }
      }
    });

    assert.ok(initialize.result);
    client.send({ jsonrpc: '2.0', method: 'initialized', params: {} });
    await waitForEvent(
      client.events,
      event => event.event === 'workspace-refresh' &&
        event.documents === 2 &&
        event.sourceChanges === 2,
      'initial analysis with an unrelated diagnostic'
    );

    client.send({
      jsonrpc: '2.0',
      method: 'textDocument/didOpen',
      params: {
        textDocument: {
          uri: invalidUri,
          languageId: 'portugues-puro',
          version: 1,
          text: invalidSource
        }
      }
    });
    client.send({
      jsonrpc: '2.0',
      method: 'textDocument/didOpen',
      params: {
        textDocument: {
          uri: routineUri,
          languageId: 'portugues-puro',
          version: 1,
          text: initialRoutine
        }
      }
    });
    const changedRoutine = [
      'Um valor é um byte.',
      'Rotina para que se altere:',
      '  Atribua 1 para o valor.'
    ].join('\n');
    const startIndex = client.events.length;
    client.send({
      jsonrpc: '2.0',
      method: 'textDocument/didChange',
      params: {
        textDocument: { uri: routineUri, version: 2 },
        contentChanges: [{ text: changedRoutine }]
      }
    });

    const refresh = await waitForEvent(
      client.events,
      event => event.event === 'workspace-refresh' &&
        event.sourceChanges === 1,
      'incremental reuse for a body-only change',
      startIndex
    );
    assert.equal(refresh.documents, 2);
    assert.equal(refresh.contextualParseCount, 1);
    assert.equal(refresh.selectiveContextCacheHits, 1);

    await client.request('shutdown', null);
    client.send({ jsonrpc: '2.0', method: 'exit', params: null });
    await once(child, 'close');
  } catch (error) {
    child.stdin.end();
    if (child.exitCode === null) {
      child.kill();
      await once(child, 'close');
    }
    throw new Error(
      `${error instanceof Error ? error.message : String(error)}\n${stderr}`
    );
  } finally {
    fs.rmSync(workspace, { recursive: true, force: true });
  }
});

test('reuses unchanged routine checkpoints after a clean body-only edit', async () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'pop-lsp-routine-checkpoint-'));
  const routinePath = path.join(workspace, 'routine.pop');
  const routineUri = pathToFileURL(routinePath).toString();
  const workspaceFolder = {
    uri: pathToFileURL(workspace).toString(),
    name: 'routine-checkpoint-test'
  };
  const initialSource = [
    'Uma pessoa é uma estrutura.',
    'O usuário é uma pessoa.',
    'Rotina para que se primeira:',
    '  Retorne.',
    'Rotina para que se segunda:',
    '  Retorne.'
  ].join('\n');
  const changedSource = initialSource.replace(
    'Rotina para que se segunda:\n  Retorne.',
    'Rotina para que se segunda:\n  Pare.'
  );
  writeWindows1252(routinePath, initialSource);

  const child = spawn(
    process.execPath,
    [path.resolve(__dirname, '../out/server.js'), '--stdio'],
    {
      env: {
        ...process.env,
        POP_LSP_PROFILE: '1',
        POP_LSP_INCREMENTAL_ROUTINES: '1',
        POP_LSP_VERIFY_INCREMENTAL_ROUTINES: '1'
      },
      stdio: ['pipe', 'pipe', 'pipe']
    }
  );
  const client = createLspClient(child, workspaceFolder);
  let stderr = '';
  child.stderr.on('data', data => {
    stderr += data.toString();
  });

  try {
    const initialize = await client.request('initialize', {
      processId: process.pid,
      rootUri: workspaceFolder.uri,
      workspaceFolders: [workspaceFolder],
      capabilities: {
        workspace: { workspaceFolders: { supported: true } }
      }
    });
    assert.ok(initialize.result);
    client.send({ jsonrpc: '2.0', method: 'initialized', params: {} });
    await waitForEvent(
      client.events,
      event => event.event === 'workspace-refresh' &&
        event.documents === 1,
      'the initial clean routine analysis'
    );
    client.send({
      jsonrpc: '2.0',
      method: 'textDocument/didOpen',
      params: {
        textDocument: {
          uri: routineUri,
          languageId: 'portugues-puro',
          version: 1,
          text: initialSource
        }
      }
    });

    const startIndex = client.events.length;
    client.send({
      jsonrpc: '2.0',
      method: 'textDocument/didChange',
      params: {
        textDocument: { uri: routineUri, version: 2 },
        contentChanges: [{ text: changedSource }]
      }
    });
    const contextualParse = await waitForEvent(
      client.events,
      event => event.event === 'document-parse' &&
        event.pass === 'contextual' &&
        event.documentUri === routineUri &&
        event.sourceCodeUnits === changedSource.length,
      'the edited document contextual parse',
      startIndex
    );
    assert.equal(contextualParse.reusedRoutineCount, 1);
    assert.equal(contextualParse.routineResolutionStrategy, 'worklist');
    assert.equal(contextualParse.routineVerificationStatus, 'matched');
    const baseParse = await waitForEvent(
      client.events,
      event => event.event === 'document-parse' &&
        event.pass === 'base' &&
        event.documentUri === routineUri &&
        event.sourceCodeUnits === changedSource.length,
      'the edited document base parse',
      startIndex
    );
    assert.equal(baseParse.reusedDeclarationCount, 2);
    const refresh = await waitForEvent(
      client.events,
      event => event.event === 'workspace-refresh' &&
        event.sourceChanges === 1,
      'the routine-checkpoint refresh',
      startIndex
    );
    assert.equal(refresh.contextualParseCount, 1);

    const symbols = await client.request('textDocument/documentSymbol', {
      textDocument: { uri: routineUri }
    });
    assert.equal(symbols.error, undefined);
    assert.equal(symbols.result.length, 4);

    const changedHeaderSource = changedSource.replace(
      'Rotina para que se segunda:',
      'Rotina para que se terceira:'
    );
    const headerEditStart = client.events.length;
    client.send({
      jsonrpc: '2.0',
      method: 'textDocument/didChange',
      params: {
        textDocument: { uri: routineUri, version: 3 },
        contentChanges: [{ text: changedHeaderSource }]
      }
    });
    const headerParse = await waitForEvent(
      client.events,
      event => event.event === 'document-parse' &&
        event.pass === 'contextual' &&
        event.documentUri === routineUri &&
        event.sourceCodeUnits === changedHeaderSource.length,
      'the routine-header edit parse',
      headerEditStart
    );
    assert.equal(headerParse.reusedRoutineCount, 0);

    const shiftedSource = `\n${changedHeaderSource}`;
    const shiftEditStart = client.events.length;
    client.send({
      jsonrpc: '2.0',
      method: 'textDocument/didChange',
      params: {
        textDocument: { uri: routineUri, version: 4 },
        contentChanges: [{ text: shiftedSource }]
      }
    });
    const shiftedParse = await waitForEvent(
      client.events,
      event => event.event === 'document-parse' &&
        event.pass === 'contextual' &&
        event.documentUri === routineUri &&
        event.sourceCodeUnits === shiftedSource.length,
      'the offset-shifted routine parse',
      shiftEditStart
    );
    assert.equal(shiftedParse.reusedRoutineCount, 2);

    await client.request('shutdown', null);
    client.send({ jsonrpc: '2.0', method: 'exit', params: null });
    await once(child, 'close');
  } catch (error) {
    child.stdin.end();
    if (child.exitCode === null) {
      child.kill();
      await once(child, 'close');
    }
    throw new Error(
      `${error instanceof Error ? error.message : String(error)}\n${stderr}`
    );
  } finally {
    fs.rmSync(workspace, { recursive: true, force: true });
  }
});

test('treats declaration whitespace as non-semantic but preserves literal spaces', async () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'pop-lsp-declaration-whitespace-'));
  const declarationsPath = path.join(workspace, 'declarations.pop');
  const consumerPath = path.join(workspace, 'consumer.pop');
  const declarationsUri = pathToFileURL(declarationsPath).toString();
  const consumerUri = pathToFileURL(consumerPath).toString();
  const workspaceFolder = {
    uri: pathToFileURL(workspace).toString(),
    name: 'declaration-whitespace-test'
  };
  const initialDeclarations = [
    'Uma pessoa é uma estrutura com um byte denominado idade.',
    'Uma string é uma estrutura.',
    'O padrão é uma string igual a "a  b".',
    'Rotina para que se consulte:',
    '  Retorne.'
  ].join('\n');
  const consumerSource = [
    'Um cliente é uma pessoa.',
    'O texto é uma string.',
    'Rotina para que se copie:',
    '  Atribua o padrão para o texto.',
    '  Retorne.'
  ].join('\n');
  const whitespaceChangedDeclarations = [
    'Uma pessoa é uma',
    '  estrutura com um byte',
    '  denominado idade.',
    'Uma string é uma estrutura.',
    'O padrão é uma string igual a "a  b".',
    '',
    'Rotina para que se consulte:',
    '  Retorne.'
  ].join('\n');
  const literalChangedDeclarations = whitespaceChangedDeclarations.replace(
    '"a  b"',
    '"a b"'
  );
  writeWindows1252(declarationsPath, initialDeclarations);
  writeWindows1252(consumerPath, consumerSource);

  const child = spawn(
    process.execPath,
    [path.resolve(__dirname, '../out/server.js'), '--stdio'],
    {
      env: {
        ...process.env,
        POP_LSP_PROFILE: '1',
        POP_LSP_INCREMENTAL_ROUTINES: '1',
        POP_LSP_VERIFY_INCREMENTAL_ROUTINES: '1'
      },
      stdio: ['pipe', 'pipe', 'pipe']
    }
  );
  const client = createLspClient(child, workspaceFolder);
  let stderr = '';
  child.stderr.on('data', data => {
    stderr += data.toString();
  });

  try {
    const initialize = await client.request('initialize', {
      processId: process.pid,
      rootUri: workspaceFolder.uri,
      workspaceFolders: [workspaceFolder],
      capabilities: {
        workspace: { workspaceFolders: { supported: true } }
      }
    });
    assert.ok(initialize.result);
    client.send({ jsonrpc: '2.0', method: 'initialized', params: {} });
    await waitForEvent(
      client.events,
      event => event.event === 'workspace-refresh' &&
        event.documents === 2,
      'the initial declaration dependency analysis'
    );
    for (const [uri, text] of [
      [declarationsUri, initialDeclarations],
      [consumerUri, consumerSource]
    ]) {
      client.send({
        jsonrpc: '2.0',
        method: 'textDocument/didOpen',
        params: {
          textDocument: {
            uri,
            languageId: 'portugues-puro',
            version: 1,
            text
          }
        }
      });
    }

    const whitespaceStart = client.events.length;
    client.send({
      jsonrpc: '2.0',
      method: 'textDocument/didChange',
      params: {
        textDocument: { uri: declarationsUri, version: 2 },
        contentChanges: [{ text: whitespaceChangedDeclarations }]
      }
    });
    const whitespaceRefresh = await waitForEvent(
      client.events,
      event => event.event === 'workspace-refresh' &&
        event.sourceChanges === 1,
      'the declaration-whitespace refresh',
      whitespaceStart
    );
    assert.equal(
      whitespaceRefresh.contextualParseCount,
      1,
      JSON.stringify({
        refresh: whitespaceRefresh,
        selection: client.events.slice(whitespaceStart).filter(event =>
          event.event === 'workspace-context-reuse-selection'
        )
      })
    );
    assert.equal(
      whitespaceRefresh.selectiveContextCacheHits,
      1,
      JSON.stringify(whitespaceRefresh)
    );
    const whitespaceParse = client.events.find(event =>
      event.event === 'document-parse' &&
      event.pass === 'contextual' &&
      event.documentUri === declarationsUri &&
      event.sourceCodeUnits === whitespaceChangedDeclarations.length
    );
    assert.equal(whitespaceParse.reusedRoutineCount, 1);
    assert.equal(whitespaceParse.routineVerificationStatus, 'matched');

    const literalStart = client.events.length;
    client.send({
      jsonrpc: '2.0',
      method: 'textDocument/didChange',
      params: {
        textDocument: { uri: declarationsUri, version: 3 },
        contentChanges: [{ text: literalChangedDeclarations }]
      }
    });
    const literalRefresh = await waitForEvent(
      client.events,
      event => event.event === 'workspace-refresh' &&
        event.sourceChanges === 1,
      'the string-literal-change refresh',
      literalStart
    );
    assert.equal(literalRefresh.contextualParseCount, 2);
    assert.equal(literalRefresh.selectiveContextCacheHits, 0);

    await client.request('shutdown', null);
    client.send({ jsonrpc: '2.0', method: 'exit', params: null });
    await once(child, 'close');
  } catch (error) {
    child.stdin.end();
    if (child.exitCode === null) {
      child.kill();
      await once(child, 'close');
    }
    throw new Error(
      `${error instanceof Error ? error.message : String(error)}\n${stderr}`
    );
  } finally {
    fs.rmSync(workspace, { recursive: true, force: true });
  }
});

test('excludes the current document base routines from contextual candidates', async () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'pop-lsp-catalog-'));
  const librarySource = [
    'Rotina para que se bar:',
    '  Retorne.'
  ].join('\n');
  const source = [
    'Rotina para que se some um byte:',
    '  Retorne.',
    'Rotina para que se teste:',
    '  Some 1.',
    '  Bar.',
    '  Retorne.'
  ].join('\n');
  const filePath = path.join(workspace, 'routines.pop');
  const libraryPath = path.join(workspace, 'library.pop');
  const uri = pathToFileURL(filePath).toString();
  const libraryUri = pathToFileURL(libraryPath).toString();
  const workspaceFolder = {
    uri: pathToFileURL(workspace).toString(),
    name: 'routine-catalog-test'
  };
  writeWindows1252(filePath, source);
  writeWindows1252(libraryPath, librarySource);

  const child = spawn(
    process.execPath,
    [path.resolve(__dirname, '../out/server.js'), '--stdio'],
    {
      env: { ...process.env, POP_LSP_PROFILE: '1' },
      stdio: ['pipe', 'pipe', 'pipe']
    }
  );
  const client = createLspClient(child, workspaceFolder);
  let stderr = '';
  child.stderr.on('data', data => {
    stderr += data.toString();
  });

  try {
    const initialize = await client.request('initialize', {
      processId: process.pid,
      rootUri: workspaceFolder.uri,
      workspaceFolders: [workspaceFolder],
      capabilities: {
        workspace: { workspaceFolders: { supported: true } }
      }
    });
    assert.ok(initialize.result);
    client.send({ jsonrpc: '2.0', method: 'initialized', params: {} });

    await waitForEvent(
      client.events,
      event => event.event === 'workspace-refresh' &&
        event.documents === 2,
      'the routine catalog workspace analysis'
    );
    const contextualParse = client.events.find(event =>
      event.event === 'document-parse' &&
      event.pass === 'contextual' &&
      event.documentUri === uri
    ) ?? await waitForEvent(
      client.events,
      event => event.event === 'document-parse' &&
        event.pass === 'contextual' &&
        event.documentUri === uri,
      'the contextual routine parse'
    );
    assert.equal(contextualParse.routineNameCandidateChecks, 1);
    for (const [documentUri, documentSource] of [
      [uri, source],
      [libraryUri, librarySource]
    ]) {
      client.send({
        jsonrpc: '2.0',
        method: 'textDocument/didOpen',
        params: {
          textDocument: {
            uri: documentUri,
            languageId: 'portugues-puro',
            version: 1,
            text: documentSource
          }
        }
      });
    }

    const symbols = await client.request('textDocument/documentSymbol', {
      textDocument: { uri }
    });
    assert.equal(symbols.error, undefined);
    assert.equal(symbols.result.length, 2);
    const callOffset = source.indexOf('Bar.');
    const position = {
      line: source.slice(0, callOffset).split('\n').length - 1,
      character: callOffset - source.lastIndexOf('\n', callOffset) - 1
    };
    const definitions = await client.request('textDocument/definition', {
      textDocument: { uri },
      position
    });
    const definitionLocations = Array.isArray(definitions.result)
      ? definitions.result
      : definitions.result
        ? [definitions.result]
        : [];
    assert.ok(definitionLocations.some(location =>
      location.uri === libraryUri
    ));

    await client.request('shutdown', null);
    client.send({ jsonrpc: '2.0', method: 'exit', params: null });
    await once(child, 'close');
  } catch (error) {
    child.stdin.end();
    if (child.exitCode === null) {
      child.kill();
      await once(child, 'close');
    }
    throw new Error(
      `${error instanceof Error ? error.message : String(error)}\n${stderr}`
    );
  } finally {
    fs.rmSync(workspace, { recursive: true, force: true });
  }
});
