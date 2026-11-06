"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const node_1 = require("vscode-languageserver/node");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const promises_1 = require("node:fs/promises");
const node_perf_hooks_1 = require("node:perf_hooks");
const node_path_1 = require("node:path");
const node_url_1 = require("node:url");
const typeParser_1 = require("./typeParser");
const documentFormatter_1 = require("./documentFormatter");
const connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
const documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
const parsedDocuments = new Map();
const profileEnabled = process.env.POP_LSP_PROFILE === '1';
const sourceAnalysisCache = new Map();
let nextSourceRevision = 0;
let workspaceDocumentIndex;
let workspaceRefreshPromise;
let workspaceRevision = 0;
let workspaceDirectorySnapshots = new Map();
const documentSymbolsCache = new WeakMap();
function logProfile(metrics) {
    if (profileEnabled) {
        connection.console.log(`[POP-LSP profile] ${JSON.stringify(metrics)}`);
    }
}
function profileRequest(name, handler) {
    if (!profileEnabled) {
        return handler();
    }
    const startedAt = node_perf_hooks_1.performance.now();
    const logCompletion = (success) => {
        logProfile({
            event: 'lsp-request',
            name,
            durationMs: node_perf_hooks_1.performance.now() - startedAt,
            success
        });
    };
    try {
        const result = handler();
        if (result instanceof Promise) {
            return result.then(value => {
                logCompletion(true);
                return value;
            }, error => {
                logCompletion(false);
                throw error;
            });
        }
        logCompletion(true);
        return result;
    }
    catch (error) {
        logCompletion(false);
        throw error;
    }
}
connection.onInitialize(() => ({
    capabilities: {
        textDocumentSync: node_1.TextDocumentSyncKind.Incremental,
        definitionProvider: true,
        typeDefinitionProvider: true,
        hoverProvider: true,
        documentSymbolProvider: true,
        workspaceSymbolProvider: true,
        referencesProvider: true,
        renameProvider: { prepareProvider: true },
        documentFormattingProvider: true
    }
}));
connection.onDocumentFormatting(params => profileRequest('formatting', () => {
    const document = documents.get(params.textDocument.uri);
    if (!document) {
        return [];
    }
    const original = document.getText();
    const formatted = (0, documentFormatter_1.formatDocument)(original);
    if (formatted === original) {
        return [];
    }
    return [node_1.TextEdit.replace({
            start: document.positionAt(0),
            end: document.positionAt(original.length)
        }, formatted)];
}));
connection.onHover(params => profileRequest('hover', () => {
    const document = documents.get(params.textDocument.uri);
    const parsedDocument = document && parsedDocuments.get(document.uri);
    if (!document || !parsedDocument) {
        return undefined;
    }
    const reference = (0, typeParser_1.findTypeReferenceAtOffset)(parsedDocument, document.offsetAt(params.position));
    if (!reference) {
        return undefined;
    }
    const normalizedName = (0, typeParser_1.normalizeTypeName)(reference.name);
    const primitiveName = normalizedName === 'byte' || normalizedName === 'bytes'
        ? 'byte'
        : normalizedName === 'estrutura' || normalizedName === 'estruturas'
            ? 'estrutura'
            : undefined;
    if (!primitiveName) {
        return undefined;
    }
    const contents = primitiveName === 'byte'
        ? [
            '*byte*',
            '',
            'Tipo primitivo',
            'Representa um valor inteiro sem sinal de 8 bits.',
            '',
            '*Intervalo de valores*',
            '`0` a `255`',
            '',
            '*Tamanho*',
            '`1 byte`'
        ].join('\n')
        : [
            '*estrutura*',
            '',
            'Tipo primitivo',
            'Representa um tipo de dado composto, formado por um conjunto de campos que podem possuir diferentes tipos de dados.',
            '',
            '*Características*',
            '',
            '- Permite agrupar diferentes campos em uma única unidade de dados.',
            '- Cada campo possui seu próprio tipo.',
            '- Os campos são acessíveis individualmente.'
        ].join('\n');
    return {
        contents: { kind: node_1.MarkupKind.Markdown, value: contents },
        range: {
            start: document.positionAt(reference.range.start),
            end: document.positionAt(reference.range.end)
        }
    };
}));
async function updateDocumentSymbols() {
    invalidateWorkspaceDocuments();
    const startedAt = profileEnabled ? node_perf_hooks_1.performance.now() : 0;
    const workspaceDocuments = await getWorkspaceDocuments();
    for (const document of documents.all()) {
        const parsedDocument = workspaceDocuments.get(document.uri)?.parsed;
        if (!parsedDocument) {
            continue;
        }
        parsedDocuments.set(document.uri, parsedDocument);
        publishDiagnostics(document, parsedDocument);
    }
    if (profileEnabled) {
        logProfile({
            event: 'document-update',
            durationMs: node_perf_hooks_1.performance.now() - startedAt,
            openDocuments: documents.all().length,
            indexedDocuments: workspaceDocuments.size
        });
    }
}
function invalidateWorkspaceDocuments() {
    workspaceDocumentIndex = undefined;
    workspaceRevision++;
}
function publishDiagnostics(document, parsedDocument) {
    const diagnostics = parsedDocument.diagnostics.map(diagnostic => ({
        severity: diagnostic.severity === 'hint'
            ? node_1.DiagnosticSeverity.Hint
            : node_1.DiagnosticSeverity.Error,
        range: {
            start: document.positionAt(diagnostic.range.start),
            end: document.positionAt(diagnostic.range.end)
        },
        message: diagnostic.message,
        source: 'portugues-puro'
    }));
    connection.sendDiagnostics({ uri: document.uri, diagnostics });
}
documents.onDidOpen(() => {
    void updateDocumentSymbols();
});
documents.onDidChangeContent(() => {
    void updateDocumentSymbols();
});
documents.onDidSave(() => {
    void updateDocumentSymbols();
});
documents.onDidClose(({ document }) => {
    parsedDocuments.delete(document.uri);
    connection.sendDiagnostics({ uri: document.uri, diagnostics: [] });
    void updateDocumentSymbols();
});
connection.onDidChangeWatchedFiles(() => {
    void updateDocumentSymbols();
});
connection.onInitialized(async () => {
    invalidateWorkspaceDocuments();
    const workspaceDocuments = await getWorkspaceDocuments();
    for (const document of documents.all()) {
        const parsedDocument = workspaceDocuments.get(document.uri)?.parsed;
        if (!parsedDocument) {
            continue;
        }
        parsedDocuments.set(document.uri, parsedDocument);
        publishDiagnostics(document, parsedDocument);
    }
});
connection.onDefinition(params => profileRequest('definition', async () => {
    const document = documents.get(params.textDocument.uri);
    if (!document) {
        return undefined;
    }
    const workspaceDocuments = await getWorkspaceDocuments();
    const parsedDocument = workspaceDocuments.get(document.uri)?.parsed ??
        parsedDocuments.get(document.uri);
    if (!parsedDocument) {
        return undefined;
    }
    const documentDirectory = (0, node_path_1.dirname)((0, node_url_1.fileURLToPath)(document.uri));
    const candidates = [...workspaceDocuments.values()].filter(candidate => (0, node_path_1.dirname)((0, node_url_1.fileURLToPath)(candidate.document.uri)) === documentDirectory);
    const offset = document.offsetAt(params.position);
    const parsedReference = (0, typeParser_1.findParsedReferenceAtOffset)(parsedDocument, offset);
    if (parsedReference?.kind === 'variable') {
        const isTypePosition = parsedReference.scope !== undefined &&
            parsedDocument.routines
                .filter(routine => routine.range.start === parsedReference.scope)
                .some(routine => {
                const variables = [
                    ...routine.parameters,
                    ...(routine.returnParameter ? [routine.returnParameter] : []),
                    ...routine.localVariables,
                    ...routine.calls.flatMap(call => call.localVariables ?? []),
                    ...routine.processes.flatMap(process => process.returnVariable ? [process.returnVariable] : [])
                ];
                return variables.some(variable => offset >= variable.type.range.start &&
                    offset < variable.type.range.end);
            });
        if (parsedReference.scope !== undefined && !isTypePosition) {
            const declaration = (0, typeParser_1.getParsedReferences)(parsedDocument).find(reference => reference.kind === 'variable' &&
                reference.name === parsedReference.name &&
                reference.scope === parsedReference.scope &&
                reference.declaration);
            if (declaration) {
                return node_1.Location.create(document.uri, {
                    start: document.positionAt(declaration.range.start),
                    end: document.positionAt(declaration.range.end)
                });
            }
        }
        else {
            const globalVariable = parsedDocument.globalVariableSymbols.lookup(parsedReference.name);
            const owner = globalVariable && candidates.find(candidate => candidate.parsed.globalVariables.some(declaration => declaration.name.normalizedName ===
                globalVariable.declaration.name.normalizedName &&
                declaration.name.range.start === globalVariable.declaration.name.range.start &&
                declaration.name.range.end === globalVariable.declaration.name.range.end));
            if (globalVariable && owner) {
                return node_1.Location.create(owner.document.uri, {
                    start: owner.document.positionAt(globalVariable.declaration.name.range.start),
                    end: owner.document.positionAt(globalVariable.declaration.name.range.end)
                });
            }
        }
    }
    if (parsedReference?.kind === 'routine') {
        const callTarget = parsedDocument.routines
            .flatMap(routine => routine.calls)
            .find(call => offset >= call.name.range.start &&
            offset <= call.name.range.end)?.target;
        if (callTarget) {
            const owner = candidates.find(candidate => candidate.parsed.routines.some(routine => routine.name.normalizedName === callTarget.name.normalizedName &&
                (0, typeParser_1.normalizeTypeName)(routine.qualifier ?? '') ===
                    (0, typeParser_1.normalizeTypeName)(callTarget.qualifier ?? '') &&
                routine.parameters.length === callTarget.parameters.length &&
                routine.parameters.every((parameter, index) => (0, typeParser_1.normalizeTypeName)(parameter.type.name) ===
                    (0, typeParser_1.normalizeTypeName)(callTarget.parameters[index].type.name))));
            if (owner) {
                return node_1.Location.create(owner.document.uri, {
                    start: owner.document.positionAt(callTarget.name.range.start),
                    end: owner.document.positionAt(callTarget.name.range.end)
                });
            }
        }
        for (const candidate of candidates) {
            const declaration = (0, typeParser_1.getParsedReferences)(candidate.parsed).find(reference => reference.kind === 'routine' &&
                reference.name === parsedReference.name &&
                reference.declaration);
            if (declaration) {
                return node_1.Location.create(candidate.document.uri, {
                    start: candidate.document.positionAt(declaration.range.start),
                    end: candidate.document.positionAt(declaration.range.end)
                });
            }
        }
    }
    const field = (0, typeParser_1.findRoutineFieldAtOffset)(parsedDocument, offset);
    if (field?.name) {
        return node_1.Location.create(document.uri, {
            start: document.positionAt(field.name.range.start),
            end: document.positionAt(field.name.range.end)
        });
    }
    const reference = (0, typeParser_1.findTypeReferenceAtOffset)(parsedDocument, offset);
    if (reference) {
        const symbol = parsedDocument.symbols.lookup(reference.name);
        const owner = symbol?.declaration && candidates.find(candidate => candidate.parsed.declarations.some(declaration => declaration.name.normalizedName === symbol.declaration.name.normalizedName &&
            declaration.name.range.start === symbol.declaration.name.range.start &&
            declaration.name.range.end === symbol.declaration.name.range.end));
        if (symbol?.declaration && owner) {
            return node_1.Location.create(owner.document.uri, {
                start: owner.document.positionAt(symbol.declaration.name.range.start),
                end: owner.document.positionAt(symbol.declaration.name.range.end)
            });
        }
    }
    const routine = (0, typeParser_1.findRoutineDeclarationAtOffset)(parsedDocument, document.offsetAt(params.position));
    if (routine) {
        return node_1.Location.create(document.uri, {
            start: document.positionAt(routine.name.range.start),
            end: document.positionAt(routine.name.range.end)
        });
    }
    return undefined;
}));
connection.onTypeDefinition(params => profileRequest('type-definition', async () => {
    const document = documents.get(params.textDocument.uri);
    if (!document) {
        return undefined;
    }
    const workspaceDocuments = await getWorkspaceDocuments();
    const parsedDocument = workspaceDocuments.get(document.uri)?.parsed ??
        parsedDocuments.get(document.uri);
    if (!parsedDocument) {
        return undefined;
    }
    const reference = (0, typeParser_1.findTypeDefinitionReferenceAtOffset)(parsedDocument, document.offsetAt(params.position));
    if (!reference) {
        return undefined;
    }
    const documentDirectory = (0, node_path_1.dirname)((0, node_url_1.fileURLToPath)(document.uri));
    for (const candidate of workspaceDocuments.values()) {
        if ((0, node_path_1.dirname)((0, node_url_1.fileURLToPath)(candidate.document.uri)) !== documentDirectory) {
            continue;
        }
        const symbol = parsedDocument.symbols.lookup(reference.name);
        const declaration = symbol?.declaration &&
            candidate.parsed.declarations.find(candidateDeclaration => candidateDeclaration.name.normalizedName ===
                symbol.declaration.name.normalizedName &&
                candidateDeclaration.name.range.start === symbol.declaration.name.range.start &&
                candidateDeclaration.name.range.end === symbol.declaration.name.range.end);
        if (declaration) {
            return node_1.Location.create(candidate.document.uri, {
                start: candidate.document.positionAt(declaration.name.range.start),
                end: candidate.document.positionAt(declaration.name.range.end)
            });
        }
    }
    return undefined;
}));
connection.onDocumentSymbol(params => profileRequest('document-symbol', async () => {
    const document = documents.get(params.textDocument.uri);
    if (!document) {
        if (profileEnabled) {
            logProfile({
                event: 'document-symbol-result',
                documentFound: false,
                parsedDocumentFound: false,
                symbols: 0
            });
        }
        return undefined;
    }
    let parsedDocument = parsedDocuments.get(document.uri);
    if (!parsedDocument) {
        parsedDocument = (await getWorkspaceDocuments()).get(document.uri)?.parsed;
        if (parsedDocument) {
            parsedDocuments.set(document.uri, parsedDocument);
        }
    }
    const symbols = parsedDocument
        ? createDocumentSymbols(parsedDocument, document)
        : undefined;
    if (profileEnabled) {
        logProfile({
            event: 'document-symbol-result',
            documentFound: true,
            parsedDocumentFound: Boolean(parsedDocument),
            symbols: symbols?.length ?? 0
        });
    }
    return symbols;
}));
connection.onWorkspaceSymbol(params => profileRequest('workspace-symbol', async () => {
    const workspaceDocuments = await getWorkspaceDocuments();
    const query = (0, typeParser_1.normalizeTypeName)(params.query);
    const results = [];
    for (const { document, parsed } of workspaceDocuments.values()) {
        const visit = (symbol, containerName) => {
            if (!query || (0, typeParser_1.normalizeTypeName)(symbol.name).includes(query)) {
                results.push(node_1.SymbolInformation.create(symbol.name, symbol.kind, symbol.range, document.uri, containerName));
            }
            const childContainer = containerName
                ? `${containerName}.${symbol.name}`
                : symbol.name;
            for (const child of symbol.children ?? []) {
                visit(child, childContainer);
            }
        };
        for (const symbol of createDocumentSymbols(parsed, document)) {
            visit(symbol);
        }
    }
    return results;
}));
connection.onReferences(params => profileRequest('references', async () => {
    const document = documents.get(params.textDocument.uri);
    const workspaceDocuments = await getWorkspaceDocuments();
    const parsedDocument = document &&
        (workspaceDocuments.get(document.uri)?.parsed ?? parsedDocuments.get(document.uri));
    if (!document || !parsedDocument) {
        return undefined;
    }
    const target = (0, typeParser_1.findParsedReferenceAtOffset)(parsedDocument, document.offsetAt(params.position));
    if (!target) {
        return undefined;
    }
    const results = [];
    const seen = new Set();
    for (const [uri, candidate] of workspaceDocuments) {
        if ((0, node_path_1.dirname)((0, node_url_1.fileURLToPath)(candidate.document.uri)) !==
            (0, node_path_1.dirname)((0, node_url_1.fileURLToPath)(document.uri))) {
            continue;
        }
        if (target.scope !== undefined && uri !== document.uri) {
            continue;
        }
        for (const reference of (0, typeParser_1.getParsedReferences)(candidate.parsed)) {
            if (reference.kind !== target.kind ||
                reference.name !== target.name ||
                reference.container !== target.container ||
                target.scope !== undefined &&
                    (reference.scope !== target.scope || uri !== document.uri) ||
                !params.context.includeDeclaration &&
                    reference.declaration) {
                continue;
            }
            const locationKey = `${uri}:${reference.range.start}:${reference.range.end}`;
            if (seen.has(locationKey)) {
                continue;
            }
            seen.add(locationKey);
            results.push(node_1.Location.create(uri, {
                start: candidate.document.positionAt(reference.range.start),
                end: candidate.document.positionAt(reference.range.end)
            }));
        }
    }
    return results;
}));
connection.onPrepareRename(params => profileRequest('prepare-rename', () => {
    const document = documents.get(params.textDocument.uri);
    const parsed = document && parsedDocuments.get(document.uri);
    if (!document || !parsed) {
        return undefined;
    }
    const reference = (0, typeParser_1.findParsedReferenceAtOffset)(parsed, document.offsetAt(params.position));
    if (!reference) {
        return undefined;
    }
    return {
        range: {
            start: document.positionAt(reference.range.start),
            end: document.positionAt(reference.range.end)
        },
        placeholder: reference.name
    };
}));
connection.onRenameRequest(params => profileRequest('rename', async () => {
    const document = documents.get(params.textDocument.uri);
    const workspaceDocuments = await getWorkspaceDocuments();
    const parsed = document &&
        (workspaceDocuments.get(document.uri)?.parsed ?? parsedDocuments.get(document.uri));
    const newName = params.newName.trim();
    if (!document || !parsed || !newName) {
        return undefined;
    }
    const target = (0, typeParser_1.findParsedReferenceAtOffset)(parsed, document.offsetAt(params.position));
    if (!target) {
        return undefined;
    }
    const changes = {};
    const seen = new Set();
    for (const [uri, candidate] of workspaceDocuments) {
        if ((0, node_path_1.dirname)((0, node_url_1.fileURLToPath)(candidate.document.uri)) !==
            (0, node_path_1.dirname)((0, node_url_1.fileURLToPath)(document.uri))) {
            continue;
        }
        if (target.scope !== undefined && uri !== document.uri) {
            continue;
        }
        for (const reference of (0, typeParser_1.getParsedReferences)(candidate.parsed)) {
            if (reference.kind !== target.kind ||
                reference.name !== target.name ||
                reference.container !== target.container ||
                target.scope !== undefined &&
                    (reference.scope !== target.scope || uri !== document.uri)) {
                continue;
            }
            const locationKey = `${uri}:${reference.range.start}:${reference.range.end}`;
            if (seen.has(locationKey)) {
                continue;
            }
            seen.add(locationKey);
            (changes[uri] ??= []).push(node_1.TextEdit.replace({
                start: candidate.document.positionAt(reference.range.start),
                end: candidate.document.positionAt(reference.range.end)
            }, newName));
        }
    }
    return Object.keys(changes).length > 0 ? { changes } : undefined;
}));
function createDocumentSymbols(parsed, document) {
    const cachedSymbols = documentSymbolsCache.get(parsed);
    if (cachedSymbols) {
        return cachedSymbols;
    }
    const toRange = (range) => ({
        start: document.positionAt(range.start),
        end: document.positionAt(range.end)
    });
    const fieldSymbol = (field) => {
        if (field.kind === 'byte-array') {
            const name = field.name?.name ?? `${field.count} bytes`;
            const range = toRange(field.name?.range ?? field.range);
            return node_1.DocumentSymbol.create(name, `${field.count} ${field.elementType.name}`, node_1.SymbolKind.Field, range, range);
        }
        return node_1.DocumentSymbol.create(field.name.name, field.type.name, node_1.SymbolKind.Field, toRange({
            start: Math.min(field.name.range.start, field.type.range.start),
            end: Math.max(field.name.range.end, field.type.range.end)
        }), toRange(field.name.range));
    };
    const fieldChildren = (fields) => (fields ?? []).map(fieldSymbol);
    const typeSymbols = parsed.declarations.map(declaration => {
        const detail = declaration.pointedType
            ? `${declaration.baseType.name} para ${declaration.pointedType.name}`
            : declaration.baseType.name;
        const kind = parsed.symbols.getBaseTypeDistance(declaration.name.name, 'estrutura') !== undefined
            ? node_1.SymbolKind.Struct
            : node_1.SymbolKind.Class;
        return node_1.DocumentSymbol.create(declaration.name.name, detail, kind, toRange(declaration.range), toRange(declaration.name.range), fieldChildren(declaration.fields));
    });
    const variableSymbols = parsed.globalVariables.map((declaration) => {
        const detail = declaration.type?.name ??
            declaration.inferredTypeName ??
            declaration.initializer?.kind;
        return node_1.DocumentSymbol.create(declaration.name.name, detail, node_1.SymbolKind.Variable, toRange(declaration.range), toRange(declaration.name.range), fieldChildren(declaration.fields));
    });
    const routineSymbols = parsed.routines.map((routine) => {
        const children = [
            ...routine.parameters.map(parameter => node_1.DocumentSymbol.create(parameter.name.name, parameter.type.name, node_1.SymbolKind.Variable, toRange(parameter.name.range), toRange(parameter.name.range))),
            ...routine.localVariables.map(variable => node_1.DocumentSymbol.create(variable.name.name, variable.type.name, node_1.SymbolKind.Variable, toRange(variable.range), toRange(variable.name.range)))
        ];
        const range = {
            start: document.positionAt(routine.range.start),
            end: document.positionAt(routine.bodyRange.end)
        };
        const name = routine.qualifier
            ? `${routine.name.name} ${routine.qualifier}`
            : routine.name.name;
        const detail = [
            routine.annotation,
            ...routine.parameters.map(parameter => `${parameter.type.name} ${parameter.name.name}`)
        ].filter(Boolean).join(' ');
        return node_1.DocumentSymbol.create(name, detail || undefined, node_1.SymbolKind.Function, range, toRange(routine.name.range), children);
    });
    const symbols = [...typeSymbols, ...variableSymbols, ...routineSymbols]
        .sort((first, second) => first.range.start.line - second.range.start.line ||
        first.range.start.character - second.range.start.character);
    documentSymbolsCache.set(parsed, symbols);
    return symbols;
}
async function getWorkspaceDocuments() {
    const cachedIndex = workspaceDocumentIndex;
    if (cachedIndex) {
        const snapshot = workspaceDirectorySnapshots;
        const directories = [...snapshot.entries()];
        const changedDirectory = await Promise.all(directories.map(async ([directory, stamp]) => {
            const current = await (0, promises_1.stat)(directory);
            return current.mtimeMs !== stamp.modificationTime ||
                current.ctimeMs !== stamp.changeTime;
        })).then(changes => changes.some(Boolean));
        if (!changedDirectory && workspaceDocumentIndex === cachedIndex) {
            if (profileEnabled) {
                logProfile({
                    event: 'workspace-cache-hit',
                    indexedDocuments: cachedIndex.size
                });
            }
            return cachedIndex;
        }
        if (workspaceDocumentIndex === cachedIndex) {
            invalidateWorkspaceDocuments();
        }
    }
    return refreshWorkspaceDocuments();
}
async function refreshWorkspaceDocuments() {
    if (workspaceDocumentIndex) {
        return workspaceDocumentIndex;
    }
    if (workspaceRefreshPromise) {
        return workspaceRefreshPromise;
    }
    const refreshPromise = buildWorkspaceDocumentIndex();
    workspaceRefreshPromise = refreshPromise;
    try {
        return await refreshPromise;
    }
    finally {
        if (workspaceRefreshPromise === refreshPromise) {
            workspaceRefreshPromise = undefined;
        }
    }
}
async function buildWorkspaceDocumentIndex() {
    while (true) {
        const revision = workspaceRevision;
        const startedAt = profileEnabled ? node_perf_hooks_1.performance.now() : 0;
        const discoveryStartedAt = profileEnabled ? node_perf_hooks_1.performance.now() : 0;
        const sourceDocuments = new Map();
        const directories = new Set();
        for (const document of documents.all()) {
            const directory = (0, node_path_1.dirname)((0, node_url_1.fileURLToPath)(document.uri));
            directories.add(directory);
            sourceDocuments.set(document.uri, { document, directory });
        }
        const folders = await connection.workspace.getWorkspaceFolders();
        for (const folder of folders ?? []) {
            directories.add((0, node_url_1.fileURLToPath)(folder.uri));
        }
        const directorySnapshots = new Map();
        for (const directory of directories) {
            const directoryStats = await (0, promises_1.stat)(directory);
            directorySnapshots.set(directory, {
                modificationTime: directoryStats.mtimeMs,
                changeTime: directoryStats.ctimeMs
            });
            const entries = await (0, promises_1.readdir)(directory, { withFileTypes: true });
            for (const entry of entries) {
                if (!entry.isFile() || (0, node_path_1.extname)(entry.name).toLocaleLowerCase() !== '.pop') {
                    continue;
                }
                const filePath = (0, node_path_1.join)(directory, entry.name);
                const uri = (0, node_url_1.pathToFileURL)(filePath).toString();
                if (sourceDocuments.has(uri)) {
                    continue;
                }
                const content = new TextDecoder('windows-1252').decode(await (0, promises_1.readFile)(filePath));
                sourceDocuments.set(uri, {
                    document: vscode_languageserver_textdocument_1.TextDocument.create(uri, 'portugues-puro', 0, content),
                    directory
                });
            }
        }
        const sourceDiscoveryMs = profileEnabled
            ? node_perf_hooks_1.performance.now() - discoveryStartedAt
            : 0;
        const parseTotals = {
            syntaxMs: 0,
            symbolCatalogMs: 0,
            typeResolutionMs: 0,
            referenceResolutionMs: 0,
            semanticResolutionMs: 0,
            totalMs: 0
        };
        let sourceCacheHits = 0;
        let sourceChanges = 0;
        const groups = new Map();
        const activeUris = new Set();
        for (const [uri, { document, directory }] of sourceDocuments) {
            const source = document.getText();
            activeUris.add(uri);
            let analysis = sourceAnalysisCache.get(uri);
            if (analysis && analysis.source === source) {
                analysis.version = document.version;
                sourceCacheHits++;
            }
            else {
                sourceChanges++;
                analysis = {
                    source,
                    version: document.version,
                    revision: ++nextSourceRevision
                };
                sourceAnalysisCache.set(uri, analysis);
            }
            const group = groups.get(directory) ?? [];
            group.push({ uri, document, source, analysis });
            groups.set(directory, group);
        }
        for (const uri of sourceAnalysisCache.keys()) {
            if (!activeUris.has(uri)) {
                sourceAnalysisCache.delete(uri);
            }
        }
        const result = new Map();
        let baseParseCount = 0;
        let contextualParseCount = 0;
        let contextualCacheHits = 0;
        let catalogAssemblyMs = 0;
        for (const group of groups.values()) {
            const catalogKey = group
                .map(entry => `${entry.uri}:${entry.analysis.revision}`)
                .join('|');
            if (group.every(entry => entry.analysis.catalogKey === catalogKey && entry.analysis.parsed)) {
                contextualCacheHits += group.length;
                for (const entry of group) {
                    const parsed = entry.analysis.parsed;
                    if (!parsed) {
                        throw new Error('A reusable workspace catalog entry is missing its parsed document.');
                    }
                    result.set(entry.uri, {
                        document: entry.document,
                        parsed
                    });
                }
                continue;
            }
            baseParseCount += group.length;
            const baseParses = group.map(entry => ({
                entry,
                parsed: (0, typeParser_1.parseTypeDeclarations)(entry.source, undefined, profileEnabled
                    ? metrics => {
                        parseTotals.syntaxMs += metrics.syntaxMs;
                        parseTotals.symbolCatalogMs += metrics.symbolCatalogMs;
                        parseTotals.typeResolutionMs += metrics.typeResolutionMs;
                        parseTotals.referenceResolutionMs += metrics.referenceResolutionMs;
                        parseTotals.semanticResolutionMs += metrics.semanticResolutionMs;
                        parseTotals.totalMs += metrics.totalMs;
                    }
                    : undefined)
            }));
            // Local declarations are prepended by the parser, so their precedence is unchanged.
            const catalogStartedAt = profileEnabled ? node_perf_hooks_1.performance.now() : 0;
            const catalog = {
                declarations: baseParses.flatMap(entry => entry.parsed.declarations),
                globalVariables: baseParses.flatMap(entry => entry.parsed.globalVariables),
                routines: baseParses.flatMap(entry => entry.parsed.routines)
            };
            if (profileEnabled) {
                catalogAssemblyMs += node_perf_hooks_1.performance.now() - catalogStartedAt;
            }
            for (const { entry } of baseParses) {
                contextualParseCount++;
                const parsed = (0, typeParser_1.parseTypeDeclarations)(entry.source, catalog, profileEnabled
                    ? metrics => {
                        parseTotals.syntaxMs += metrics.syntaxMs;
                        parseTotals.symbolCatalogMs += metrics.symbolCatalogMs;
                        parseTotals.typeResolutionMs += metrics.typeResolutionMs;
                        parseTotals.referenceResolutionMs += metrics.referenceResolutionMs;
                        parseTotals.semanticResolutionMs += metrics.semanticResolutionMs;
                        parseTotals.totalMs += metrics.totalMs;
                    }
                    : undefined);
                entry.analysis.parsed = parsed;
                entry.analysis.catalogKey = catalogKey;
                result.set(entry.uri, { document: entry.document, parsed });
            }
        }
        if (profileEnabled) {
            logProfile({
                event: 'workspace-refresh',
                accepted: revision === workspaceRevision,
                refreshMs: node_perf_hooks_1.performance.now() - startedAt,
                sourceDiscoveryMs,
                catalogAssemblyMs,
                documents: result.size,
                sourceCodeUnits: [...sourceDocuments.values()].reduce((total, entry) => total + entry.document.getText().length, 0),
                sourceChanges,
                sourceCacheHits,
                baseParseCount,
                contextualParseCount,
                contextualCacheHits,
                declarations: [...result.values()].reduce((total, entry) => total + entry.parsed.declarations.length, 0),
                globalVariables: [...result.values()].reduce((total, entry) => total + entry.parsed.globalVariables.length, 0),
                routines: [...result.values()].reduce((total, entry) => total + entry.parsed.routines.length, 0),
                symbols: [...result.values()].reduce((total, entry) => total +
                    entry.parsed.symbols.entries.length +
                    entry.parsed.globalVariableSymbols.entries.length +
                    entry.parsed.routineSymbols.entries.length, 0),
                ...parseTotals
            });
        }
        if (revision !== workspaceRevision) {
            continue;
        }
        workspaceDocumentIndex = result;
        workspaceDirectorySnapshots = directorySnapshots;
        return result;
    }
}
documents.listen(connection);
connection.listen();
//# sourceMappingURL=server.js.map