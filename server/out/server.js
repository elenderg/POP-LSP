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
const configuredSlowProfileThreshold = Number(process.env.POP_LSP_PROFILE_SLOW_MS);
const slowProfileThresholdMs = Number.isFinite(configuredSlowProfileThreshold) &&
    configuredSlowProfileThreshold > 0
    ? configuredSlowProfileThreshold
    : 5000;
const eventLoopDelay = profileEnabled
    ? (0, node_perf_hooks_1.monitorEventLoopDelay)({ resolution: 20 })
    : undefined;
let nextProfileRequestId = 0;
let pendingProfileRequests = 0;
const sourceAnalysisCache = new Map();
let nextSourceRevision = 0;
let workspaceDocumentIndex;
let workspaceRefreshPromise;
let workspaceRevision = 0;
let workspaceDirectorySnapshots = new Map();
const documentSymbolsCache = new WeakMap();
let documentSymbolsUpdatePromise;
let documentSymbolsUpdatePending = false;
let workspaceInvalidationPending = false;
function logReferenceMetrics(metrics) {
    logProfile({
        event: 'reference-catalog',
        durationMs: metrics.durationMs,
        references: metrics.references,
        cacheHit: metrics.cacheHit
    });
}
function getDocumentReferences(parsed) {
    return (0, typeParser_1.getParsedReferences)(parsed, profileEnabled ? logReferenceMetrics : undefined);
}
function findDocumentReference(parsed, offset) {
    return (0, typeParser_1.findParsedReferenceAtOffset)(parsed, offset, profileEnabled ? logReferenceMetrics : undefined);
}
function logProfile(metrics) {
    if (profileEnabled) {
        connection.console.log(`[POP-LSP profile] ${JSON.stringify(metrics)}`);
    }
}
if (profileEnabled && eventLoopDelay) {
    eventLoopDelay.enable();
    let previousCpuUsage = process.cpuUsage();
    const healthInterval = setInterval(() => {
        const currentCpuUsage = process.cpuUsage();
        const cpuUsage = {
            userMs: (currentCpuUsage.user - previousCpuUsage.user) / 1000,
            systemMs: (currentCpuUsage.system - previousCpuUsage.system) / 1000
        };
        previousCpuUsage = currentCpuUsage;
        const memory = process.memoryUsage();
        logProfile({
            event: 'process-health',
            timestampMs: node_perf_hooks_1.performance.now(),
            pendingRequests: pendingProfileRequests,
            cpuUserMs: cpuUsage.userMs,
            cpuSystemMs: cpuUsage.systemMs,
            rssBytes: memory.rss,
            heapUsedBytes: memory.heapUsed,
            heapTotalBytes: memory.heapTotal,
            eventLoopMeanMs: eventLoopDelay.mean / 1e6,
            eventLoopMaxMs: eventLoopDelay.max / 1e6,
            eventLoopP99Ms: eventLoopDelay.percentile(99) / 1e6
        });
        eventLoopDelay.reset();
    }, 5000);
    healthInterval.unref();
    const gcObserver = new node_perf_hooks_1.PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
            logProfile({
                event: 'garbage-collection',
                timestampMs: entry.startTime,
                durationMs: entry.duration,
                kind: entry.name
            });
        }
    });
    gcObserver.observe({ entryTypes: ['gc'] });
}
function profileRequest(name, handler, documentUri) {
    if (!profileEnabled) {
        return handler(0);
    }
    const startedAt = node_perf_hooks_1.performance.now();
    const requestId = ++nextProfileRequestId;
    pendingProfileRequests++;
    logProfile({
        event: 'lsp-request-start',
        requestId,
        name,
        documentUri: documentUri ?? '',
        timestampMs: startedAt,
        pendingRequests: pendingProfileRequests
    });
    let requestCompleted = false;
    const watchdog = setTimeout(() => {
        if (requestCompleted) {
            return;
        }
        const memory = process.memoryUsage();
        logProfile({
            event: 'request-watchdog',
            requestId,
            stage: name,
            documentUri: documentUri ?? '',
            startTimeMs: startedAt,
            endTimeMs: node_perf_hooks_1.performance.now(),
            elapsedMs: node_perf_hooks_1.performance.now() - startedAt,
            pendingRequests: pendingProfileRequests,
            rssBytes: memory.rss,
            heapUsedBytes: memory.heapUsed
        });
    }, slowProfileThresholdMs);
    watchdog.unref();
    const logCompletion = (success) => {
        requestCompleted = true;
        clearTimeout(watchdog);
        pendingProfileRequests--;
        const endTimeMs = node_perf_hooks_1.performance.now();
        const durationMs = endTimeMs - startedAt;
        logProfile({
            event: 'lsp-request',
            requestId,
            name,
            documentUri: documentUri ?? '',
            startTimeMs: startedAt,
            endTimeMs,
            durationMs,
            success,
            pendingRequests: pendingProfileRequests
        });
        if (durationMs >= slowProfileThresholdMs) {
            const memory = process.memoryUsage();
            logProfile({
                event: 'slow-operation',
                requestId,
                stage: name,
                documentUri: documentUri ?? '',
                startTimeMs: startedAt,
                endTimeMs,
                elapsedMs: durationMs,
                pendingRequests: pendingProfileRequests,
                rssBytes: memory.rss,
                heapUsedBytes: memory.heapUsed
            });
        }
    };
    try {
        const result = handler(requestId);
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
function logDocumentSymbolStage(requestId, documentUri, stage, startTimeMs, metrics = {}) {
    if (!profileEnabled || requestId === 0) {
        return;
    }
    const endTimeMs = node_perf_hooks_1.performance.now();
    logProfile({
        event: 'document-symbol-stage',
        requestId,
        documentUri,
        stage,
        startTimeMs,
        endTimeMs,
        durationMs: endTimeMs - startTimeMs,
        ...metrics
    });
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
    const analysis = sourceAnalysisCache.get(document.uri);
    const cachedParse = analysis?.source === original
        ? analysis.parsed
        : undefined;
    const formatted = (0, documentFormatter_1.formatDocument)(original, cachedParse);
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
function hasOpenDocumentSourceChanges() {
    for (const document of documents.all()) {
        const source = document.getText();
        const analysis = sourceAnalysisCache.get(document.uri);
        if (analysis) {
            if (analysis.source !== source) {
                return true;
            }
            continue;
        }
        const indexedDocument = workspaceDocumentIndex?.get(document.uri)?.document;
        if (!indexedDocument || indexedDocument.getText() !== source) {
            return true;
        }
    }
    return false;
}
function updateDocumentSymbols(forceWorkspaceRefresh = false) {
    documentSymbolsUpdatePending = true;
    workspaceInvalidationPending ||= forceWorkspaceRefresh;
    if (documentSymbolsUpdatePromise) {
        return documentSymbolsUpdatePromise;
    }
    const updatePromise = (async () => {
        while (documentSymbolsUpdatePending) {
            documentSymbolsUpdatePending = false;
            const forceRefresh = workspaceInvalidationPending;
            workspaceInvalidationPending = false;
            if (forceRefresh || hasOpenDocumentSourceChanges()) {
                invalidateWorkspaceDocuments();
            }
            await publishOpenDocumentDiagnostics();
        }
    })();
    documentSymbolsUpdatePromise = updatePromise;
    void updatePromise.then(() => finishDocumentSymbolsUpdate(updatePromise), () => finishDocumentSymbolsUpdate(updatePromise));
    return updatePromise;
}
function finishDocumentSymbolsUpdate(updatePromise) {
    if (documentSymbolsUpdatePromise !== updatePromise) {
        return;
    }
    documentSymbolsUpdatePromise = undefined;
    if (documentSymbolsUpdatePending) {
        void updateDocumentSymbols();
    }
}
async function publishOpenDocumentDiagnostics() {
    const startedAt = profileEnabled ? node_perf_hooks_1.performance.now() : 0;
    const openDocuments = documents.all();
    logProfile({
        event: 'document-update-start',
        timestampMs: startedAt,
        openDocuments: openDocuments.length,
        pendingRequests: pendingProfileRequests
    });
    const workspaceDocuments = await getWorkspaceDocuments();
    for (const document of openDocuments) {
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
            startTimeMs: startedAt,
            endTimeMs: node_perf_hooks_1.performance.now(),
            durationMs: node_perf_hooks_1.performance.now() - startedAt,
            openDocuments: openDocuments.length,
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
documents.onDidOpen(({ document }) => {
    if (profileEnabled) {
        const source = document.getText();
        logProfile({
            event: 'document-lifecycle',
            action: 'open',
            documentUri: document.uri,
            sourceCodeUnits: source.length,
            sourceBytes: Buffer.byteLength(source, 'utf8')
        });
    }
    void updateDocumentSymbols();
});
documents.onDidChangeContent(({ document }) => {
    if (profileEnabled) {
        const source = document.getText();
        logProfile({
            event: 'document-lifecycle',
            action: 'change',
            documentUri: document.uri,
            sourceCodeUnits: source.length,
            sourceBytes: Buffer.byteLength(source, 'utf8')
        });
    }
    void updateDocumentSymbols();
});
documents.onDidSave(({ document }) => {
    if (profileEnabled) {
        const source = document.getText();
        logProfile({
            event: 'document-lifecycle',
            action: 'save',
            documentUri: document.uri,
            sourceCodeUnits: source.length,
            sourceBytes: Buffer.byteLength(source, 'utf8')
        });
    }
    void updateDocumentSymbols();
});
documents.onDidClose(({ document }) => {
    if (profileEnabled) {
        const source = document.getText();
        logProfile({
            event: 'document-lifecycle',
            action: 'close',
            documentUri: document.uri,
            sourceCodeUnits: source.length,
            sourceBytes: Buffer.byteLength(source, 'utf8')
        });
    }
    parsedDocuments.delete(document.uri);
    connection.sendDiagnostics({ uri: document.uri, diagnostics: [] });
    void updateDocumentSymbols(true);
});
connection.onDidChangeWatchedFiles(() => {
    void updateDocumentSymbols(true);
});
connection.onInitialized(async () => {
    const initializationStartedAt = profileEnabled ? node_perf_hooks_1.performance.now() : 0;
    await updateDocumentSymbols(true);
    logProfile({
        event: 'workspace-initialization',
        startTimeMs: initializationStartedAt,
        endTimeMs: node_perf_hooks_1.performance.now(),
        durationMs: node_perf_hooks_1.performance.now() - initializationStartedAt,
        openDocuments: documents.all().length,
        indexedDocuments: workspaceDocumentIndex?.size ?? 0
    });
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
    const parsedReference = findDocumentReference(parsedDocument, offset);
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
            const declaration = getDocumentReferences(parsedDocument).find(reference => reference.kind === 'variable' &&
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
            const declaration = getDocumentReferences(candidate.parsed).find(reference => reference.kind === 'routine' &&
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
    if (parsedReference?.kind === 'type') {
        const symbol = parsedDocument.symbols.lookup(parsedReference.name);
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
connection.onDocumentSymbol(params => profileRequest('document-symbol', async (requestId) => {
    const documentLookupStartedAt = profileEnabled ? node_perf_hooks_1.performance.now() : 0;
    const document = documents.get(params.textDocument.uri);
    logDocumentSymbolStage(requestId, params.textDocument.uri, 'document-lookup', documentLookupStartedAt, { documentFound: Boolean(document) });
    if (!document) {
        if (profileEnabled) {
            logProfile({
                event: 'document-symbol-result',
                requestId,
                documentUri: params.textDocument.uri,
                documentFound: false,
                parsedDocumentFound: false,
                symbols: 0
            });
        }
        return undefined;
    }
    const documentSource = profileEnabled ? document.getText() : undefined;
    const parsedLookupStartedAt = profileEnabled ? node_perf_hooks_1.performance.now() : 0;
    let parsedDocument = parsedDocuments.get(document.uri);
    const parsedCacheHit = Boolean(parsedDocument);
    if (!parsedDocument) {
        parsedDocument = (await getWorkspaceDocuments(requestId, document.uri)).get(document.uri)?.parsed;
        if (parsedDocument) {
            parsedDocuments.set(document.uri, parsedDocument);
        }
    }
    logDocumentSymbolStage(requestId, document.uri, 'parsed-analysis-and-context-catalog', parsedLookupStartedAt, {
        parsedCacheHit,
        parsedDocumentFound: Boolean(parsedDocument),
        sourceCodeUnits: documentSource?.length ?? 0,
        sourceBytes: documentSource === undefined
            ? 0
            : Buffer.byteLength(documentSource, 'utf8'),
        declarations: parsedDocument?.declarations.length ?? 0,
        globalVariables: parsedDocument?.globalVariables.length ?? 0,
        routines: parsedDocument?.routines.length ?? 0,
        symbols: parsedDocument?.symbols.entries.length ?? 0
    });
    const symbolConstructionStartedAt = profileEnabled ? node_perf_hooks_1.performance.now() : 0;
    const symbols = parsedDocument
        ? createDocumentSymbols(parsedDocument, document, requestId)
        : undefined;
    if (profileEnabled) {
        logProfile({
            event: 'document-symbol-result',
            requestId,
            documentUri: document.uri,
            documentFound: true,
            parsedDocumentFound: Boolean(parsedDocument),
            symbols: symbols?.length ?? 0
        });
    }
    logDocumentSymbolStage(requestId, document.uri, 'handler-return', symbolConstructionStartedAt, { symbols: symbols?.length ?? 0 });
    return symbols;
}, params.textDocument.uri));
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
    const target = findDocumentReference(parsedDocument, document.offsetAt(params.position));
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
        for (const reference of getDocumentReferences(candidate.parsed)) {
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
    const reference = findDocumentReference(parsed, document.offsetAt(params.position));
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
    const target = findDocumentReference(parsed, document.offsetAt(params.position));
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
        for (const reference of getDocumentReferences(candidate.parsed)) {
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
function createDocumentSymbols(parsed, document, requestId = 0) {
    const documentUri = document.uri;
    const cacheLookupStartedAt = profileEnabled ? node_perf_hooks_1.performance.now() : 0;
    const cachedSymbols = documentSymbolsCache.get(parsed);
    logDocumentSymbolStage(requestId, documentUri, 'symbol-cache-lookup', cacheLookupStartedAt, { cacheHit: Boolean(cachedSymbols) });
    if (cachedSymbols) {
        return cachedSymbols;
    }
    const toRange = (range) => ({
        start: document.positionAt(range.start),
        end: document.positionAt(range.end)
    });
    const fieldSymbol = (field) => {
        fieldSymbols++;
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
    const typeConstructionStartedAt = profileEnabled ? node_perf_hooks_1.performance.now() : 0;
    let inheritanceDistanceQueries = 0;
    let fieldSymbols = 0;
    const typeSymbols = parsed.declarations.map(declaration => {
        const detail = declaration.pointedType
            ? `${declaration.baseType.name} para ${declaration.pointedType.name}`
            : declaration.baseType.name;
        inheritanceDistanceQueries++;
        const kind = parsed.symbols.getBaseTypeDistance(declaration.name.name, 'estrutura') !== undefined
            ? node_1.SymbolKind.Struct
            : node_1.SymbolKind.Class;
        return node_1.DocumentSymbol.create(declaration.name.name, detail, kind, toRange(declaration.range), toRange(declaration.name.range), fieldChildren(declaration.fields));
    });
    const typeConstructionMs = profileEnabled
        ? node_perf_hooks_1.performance.now() - typeConstructionStartedAt
        : 0;
    const globalVariableConstructionStartedAt = profileEnabled
        ? node_perf_hooks_1.performance.now()
        : 0;
    const variableSymbols = parsed.globalVariables.map((declaration) => {
        const detail = declaration.type?.name ??
            declaration.inferredTypeName ??
            declaration.initializer?.kind;
        return node_1.DocumentSymbol.create(declaration.name.name, detail, node_1.SymbolKind.Variable, toRange(declaration.range), toRange(declaration.name.range), fieldChildren(declaration.fields));
    });
    const globalVariableConstructionMs = profileEnabled
        ? node_perf_hooks_1.performance.now() - globalVariableConstructionStartedAt
        : 0;
    const routineConstructionStartedAt = profileEnabled ? node_perf_hooks_1.performance.now() : 0;
    let routineParameters = 0;
    let routineLocals = 0;
    const routineSymbols = parsed.routines.map((routine) => {
        routineParameters += routine.parameters.length;
        routineLocals += routine.localVariables.length;
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
    const routineConstructionMs = profileEnabled
        ? node_perf_hooks_1.performance.now() - routineConstructionStartedAt
        : 0;
    const sortStartedAt = profileEnabled ? node_perf_hooks_1.performance.now() : 0;
    const symbols = [...typeSymbols, ...variableSymbols, ...routineSymbols]
        .sort((first, second) => first.range.start.line - second.range.start.line ||
        first.range.start.character - second.range.start.character);
    const sortMs = profileEnabled ? node_perf_hooks_1.performance.now() - sortStartedAt : 0;
    if (profileEnabled) {
        logDocumentSymbolStage(requestId, documentUri, 'construct-sort-and-cache-symbols', cacheLookupStartedAt, {
            cacheHit: false,
            declarations: parsed.declarations.length,
            globalVariables: parsed.globalVariables.length,
            routines: parsed.routines.length,
            fields: fieldSymbols,
            routineParameters,
            routineLocals,
            symbols: symbols.length,
            inheritanceDistanceQueries,
            typeConstructionMs,
            globalVariableConstructionMs,
            routineConstructionMs,
            sortMs
        });
    }
    documentSymbolsCache.set(parsed, symbols);
    return symbols;
}
async function getWorkspaceDocuments(requestId = 0, requestDocumentUri = '') {
    const validationStartedAt = profileEnabled ? node_perf_hooks_1.performance.now() : 0;
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
            logDocumentSymbolStage(requestId, requestDocumentUri, 'workspace-cache-validation', validationStartedAt, {
                cacheHit: true,
                directoriesChecked: directories.length,
                indexedDocuments: cachedIndex.size
            });
            return cachedIndex;
        }
        if (workspaceDocumentIndex === cachedIndex) {
            invalidateWorkspaceDocuments();
        }
    }
    else {
        logDocumentSymbolStage(requestId, requestDocumentUri, 'workspace-cache-validation', validationStartedAt, { cacheHit: false, directoriesChecked: 0, indexedDocuments: 0 });
    }
    return refreshWorkspaceDocuments(requestId, requestDocumentUri);
}
async function refreshWorkspaceDocuments(requestId = 0, requestDocumentUri = '') {
    if (workspaceDocumentIndex) {
        return workspaceDocumentIndex;
    }
    if (workspaceRefreshPromise) {
        logDocumentSymbolStage(requestId, requestDocumentUri, 'workspace-refresh-shared-promise', profileEnabled ? node_perf_hooks_1.performance.now() : 0, { sharedPromise: true });
        return workspaceRefreshPromise;
    }
    const refreshPromise = buildWorkspaceDocumentIndex(requestId, requestDocumentUri);
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
async function buildWorkspaceDocumentIndex(requestId = 0, requestDocumentUri = '') {
    while (true) {
        const revision = workspaceRevision;
        const startedAt = profileEnabled ? node_perf_hooks_1.performance.now() : 0;
        const discoveryStartedAt = profileEnabled ? node_perf_hooks_1.performance.now() : 0;
        const sourceDocuments = new Map();
        const sourceByteLengths = new Map();
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
                    sourceByteLengths.set(uri, (await (0, promises_1.stat)(filePath)).size);
                    continue;
                }
                const contentBytes = await (0, promises_1.readFile)(filePath);
                sourceByteLengths.set(uri, contentBytes.byteLength);
                const content = new TextDecoder('windows-1252').decode(contentBytes);
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
            lexicalMs: 0,
            syntaxMs: 0,
            symbolCatalogMs: 0,
            dependencyResolutionMs: 0,
            typeResolutionMs: 0,
            globalVariableResolutionMs: 0,
            routineResolutionMs: 0,
            tokenCount: 0,
            totalMs: 0
        };
        const collectParseMetrics = profileEnabled
            ? (metrics) => {
                parseTotals.lexicalMs += metrics.lexicalMs;
                parseTotals.syntaxMs += metrics.syntaxMs;
                parseTotals.symbolCatalogMs += metrics.symbolCatalogMs;
                parseTotals.dependencyResolutionMs += metrics.dependencyResolutionMs;
                parseTotals.typeResolutionMs += metrics.typeResolutionMs;
                parseTotals.globalVariableResolutionMs += metrics.globalVariableResolutionMs;
                parseTotals.routineResolutionMs += metrics.routineResolutionMs;
                parseTotals.tokenCount += metrics.tokenCount;
                parseTotals.totalMs += metrics.totalMs;
            }
            : undefined;
        const collectDocumentParseMetrics = (uri, source, pass) => profileEnabled
            ? (metrics) => {
                collectParseMetrics?.(metrics);
                const { phases, ...parseMetrics } = metrics;
                logProfile({
                    event: 'document-parse',
                    requestId,
                    requestDocumentUri,
                    documentUri: uri,
                    pass,
                    ...parseMetrics,
                    sourceCodeUnits: source.length,
                    sourceBytes: sourceByteLengths.get(uri) ??
                        Buffer.byteLength(source, 'utf8')
                });
                for (const phase of phases) {
                    logProfile({
                        event: 'parse-phase',
                        requestId,
                        requestDocumentUri,
                        documentUri: uri,
                        pass,
                        ...phase
                    });
                    if (phase.durationMs >= slowProfileThresholdMs) {
                        logProfile({
                            event: 'slow-operation',
                            requestId,
                            stage: phase.name,
                            documentUri: uri,
                            pass,
                            startTimeMs: phase.startTimeMs,
                            endTimeMs: phase.endTimeMs,
                            elapsedMs: phase.durationMs,
                            statementsVisited: metrics.routineStatementsVisited,
                            nameMatchSearches: metrics.routineNameMatchSearches,
                            nameSpanChecks: metrics.routineNameSpanChecks,
                            nameCandidateChecks: metrics.routineNameCandidateChecks,
                            heapUsedBeforeBytes: metrics.heapUsedBeforeBytes,
                            heapUsedAfterBytes: metrics.heapUsedAfterBytes,
                            rssBeforeBytes: metrics.rssBeforeBytes,
                            rssAfterBytes: metrics.rssAfterBytes
                        });
                    }
                }
            }
            : undefined;
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
        let baseParseCacheHits = 0;
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
            const baseParses = group.map(entry => {
                let parsed = entry.analysis.baseParsed;
                if (parsed) {
                    baseParseCacheHits++;
                }
                else {
                    parsed = (0, typeParser_1.parseTypeDeclarations)(entry.source, undefined, collectDocumentParseMetrics(entry.uri, entry.source, 'base'));
                    entry.analysis.baseParsed = parsed;
                    baseParseCount++;
                }
                return { entry, parsed };
            });
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
                const parsed = (0, typeParser_1.parseTypeDeclarations)(entry.source, catalog, collectDocumentParseMetrics(entry.uri, entry.source, 'contextual'));
                entry.analysis.parsed = parsed;
                entry.analysis.catalogKey = catalogKey;
                result.set(entry.uri, { document: entry.document, parsed });
            }
        }
        if (profileEnabled) {
            logProfile({
                event: 'workspace-refresh',
                requestId,
                requestDocumentUri,
                accepted: revision === workspaceRevision,
                startTimeMs: startedAt,
                endTimeMs: node_perf_hooks_1.performance.now(),
                refreshMs: node_perf_hooks_1.performance.now() - startedAt,
                sourceDiscoveryMs,
                catalogAssemblyMs,
                documents: result.size,
                sourceCodeUnits: [...sourceDocuments.values()].reduce((total, entry) => total + entry.document.getText().length, 0),
                sourceBytes: [...sourceByteLengths.values()].reduce((total, length) => total + length, 0),
                sourceChanges,
                sourceCacheHits,
                baseParseCount,
                baseParseCacheHits,
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