/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
  createConnection,
  CompletionItem,
  CompletionItemKind,
  CompletionParams,
  Diagnostic,
  DiagnosticSeverity,
  DocumentSymbol,
  InitializeResult,
  ImplementationParams,
  Location,
  MarkupKind,
  ProposedFeatures,
  SymbolInformation,
  TextEdit,
  TextDocumentSyncKind,
  TextDocuments,
  WorkspaceEdit
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { readdir, readFile, stat } from 'node:fs/promises';
import {
  monitorEventLoopDelay,
  PerformanceObserver,
  performance
} from 'node:perf_hooks';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  ParsedDocument,
  ParsedReference,
  ParsePerformanceMetrics,
  ParserSymbolCatalog,
  RoutineParameter,
  RoutineDeclaration,
  normalizeTypeName,
  parseTypeDeclarations
} from './typeParser';
import {
  DeclarationDependencyGraph,
  getWorkspaceDuplicateDeclarations,
  DocumentAnalysisMetrics,
  getDocumentAnalysis,
  SyntaxNode,
  WorkspaceDuplicateDeclaration,
  WorkspaceDeclarationChange,
  WorkspaceAnalysisIndex
} from './analysisModel';
import { isCurrentDocumentSnapshot } from './documentDiagnostics';
import { buildDocumentSymbols } from './documentSymbols';
import { formatDocument } from './documentFormatter';

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);
const parsedDocuments = new Map<string, ReturnType<typeof parseTypeDeclarations>>();
const profileEnabled = process.env.POP_LSP_PROFILE === '1';
const incrementalRoutineResolutionEnabled =
  process.env.POP_LSP_INCREMENTAL_ROUTINES === '1';
const verifyIncrementalRoutineResolution =
  incrementalRoutineResolutionEnabled &&
  process.env.POP_LSP_VERIFY_INCREMENTAL_ROUTINES === '1';
const configuredSlowProfileThreshold = Number(
  process.env.POP_LSP_PROFILE_SLOW_MS
);
const slowProfileThresholdMs = Number.isFinite(configuredSlowProfileThreshold) &&
  configuredSlowProfileThreshold > 0
  ? configuredSlowProfileThreshold
  : 5000;
const eventLoopDelay = profileEnabled
  ? monitorEventLoopDelay({ resolution: 20 })
  : undefined;
let nextProfileRequestId = 0;
let pendingProfileRequests = 0;
interface SourceAnalysisCacheEntry {
  source: string;
  version: number;
  revision: number;
  baseParsed?: ParsedDocument;
  parsed?: ParsedDocument;
  catalogKey?: string;
}
const sourceAnalysisCache = new Map<string, SourceAnalysisCacheEntry>();
let nextSourceRevision = 0;
let workspaceDocumentIndex: Map<
  string,
  { document: TextDocument; parsed: ParsedDocument }
> | undefined;
let previousWorkspaceDocumentIndex: Map<
  string,
  { document: TextDocument; parsed: ParsedDocument }
> | undefined;
const workspaceDocumentSources = new WeakMap<
  Map<string, { document: TextDocument; parsed: ParsedDocument }>,
  Map<string, string>
>();
let workspaceRefreshPromise: Promise<
  Map<string, { document: TextDocument; parsed: ParsedDocument }>
> | undefined;
let workspaceRevision = 0;
let workspaceDirectorySnapshots = new Map<string, {
  modificationTime: number;
  changeTime: number;
}>();
const documentSymbolsCache = new WeakMap<ParsedDocument, DocumentSymbol[]>();
const workspaceAnalysisIndexes = new WeakMap<
  Map<string, { document: TextDocument; parsed: ParsedDocument }>,
  WorkspaceAnalysisIndex
>();
const workspaceDeclarationDependencyGraphs = new WeakMap<
  Map<string, { document: TextDocument; parsed: ParsedDocument }>,
  DeclarationDependencyGraph
>();
const workspaceCompletionItems = new WeakMap<
  Map<string, { document: TextDocument; parsed: ParsedDocument }>,
  Map<string, CompletionItem[]>
>();
let documentSymbolsUpdatePromise: Promise<void> | undefined;
let documentSymbolsUpdatePending = false;
let workspaceInvalidationPending = false;

function documentAnalysisProfiler(
  requestId: number,
  requestDocumentUri: string,
  documentUri = requestDocumentUri
): ((metrics: DocumentAnalysisMetrics) => void) | undefined {
  if (!profileEnabled) {
    return undefined;
  }
  return metrics => logProfile({
    event: 'document-analysis-index',
    requestId,
    requestDocumentUri,
    documentUri,
    ...metrics
  });
}

function findDocumentReference(
  parsed: ParsedDocument,
  offset: number,
  requestId: number,
  documentUri: string,
  sourceLength?: number,
  kind?: ParsedReference['kind']
) {
  return getDocumentAnalysis(
    parsed,
    sourceLength,
    documentAnalysisProfiler(requestId, documentUri)
  ).findReferenceAt(offset, kind);
}

function getWorkspaceAnalysisIndex(
  workspaceDocuments: Map<
    string,
    { document: TextDocument; parsed: ParsedDocument }
  >,
  requestId = 0,
  requestDocumentUri = ''
): WorkspaceAnalysisIndex {
  const cachedIndex = workspaceAnalysisIndexes.get(workspaceDocuments);
  if (cachedIndex) {
    logProfile({
      event: 'workspace-reference-index',
      requestId,
      requestDocumentUri,
      durationMs: 0,
      documents: cachedIndex.documentCount,
      references: cachedIndex.referenceCount,
      dependencyEdges: cachedIndex.dependencyCount,
      cacheHit: true
    });
    return cachedIndex;
  }
  const startedAt = profileEnabled ? performance.now() : 0;
  const index = new WorkspaceAnalysisIndex(
    [...workspaceDocuments.values()].map(({ document, parsed }) => ({
      uri: document.uri,
      directory: dirname(fileURLToPath(document.uri)),
      analysis: getDocumentAnalysis(parsed, document.getText().length)
    }))
  );
  workspaceAnalysisIndexes.set(workspaceDocuments, index);
  logProfile({
    event: 'workspace-reference-index',
    requestId,
    requestDocumentUri,
    durationMs: profileEnabled ? performance.now() - startedAt : 0,
    documents: index.documentCount,
    references: index.referenceCount,
    dependencyEdges: index.dependencyCount,
    cacheHit: false
  });
  return index;
}

function getWorkspaceDeclarationDependencyGraph(
  workspaceDocuments: Map<
    string,
    { document: TextDocument; parsed: ParsedDocument }
  >
): DeclarationDependencyGraph {
  const cachedGraph = workspaceDeclarationDependencyGraphs.get(
    workspaceDocuments
  );
  if (cachedGraph) {
    logProfile({
      event: 'declaration-region-graph',
      durationMs: 0,
      regions: cachedGraph.nodes.length,
      dependencyEdges: cachedGraph.edges.length,
      unresolvedReferences: cachedGraph.unresolvedReferenceCount,
      cacheHit: true
    });
    return cachedGraph;
  }
  const startedAt = profileEnabled ? performance.now() : 0;
  const graph = new DeclarationDependencyGraph(
    [...workspaceDocuments.values()].map(({ document, parsed }) => ({
      uri: document.uri,
      directory: dirname(fileURLToPath(document.uri)),
      parsed,
      analysis: getDocumentAnalysis(parsed, document.getText().length)
    }))
  );
  workspaceDeclarationDependencyGraphs.set(workspaceDocuments, graph);
  logProfile({
    event: 'declaration-region-graph',
    durationMs: profileEnabled ? performance.now() - startedAt : 0,
    regions: graph.nodes.length,
    dependencyEdges: graph.edges.length,
    unresolvedReferences: graph.unresolvedReferenceCount,
    cacheHit: false
  });
  return graph;
}

interface DeclarationSurfaceEntry {
  change: WorkspaceDeclarationChange;
  fingerprints: string[];
}

function normalizeDeclarationText(
  source: string,
  range: { start: number; end: number },
  commentRanges: readonly { start: number; end: number }[]
): string {
  const comments = commentRanges.filter(comment =>
    comment.start < range.end && comment.end > range.start
  );
  let normalized = '';
  let inString = false;
  let pendingWhitespace = false;
  let commentIndex = 0;
  for (let offset = range.start; offset < range.end; offset++) {
    while (
      commentIndex < comments.length &&
      comments[commentIndex].end <= offset
    ) {
      commentIndex++;
    }
    const comment = comments[commentIndex];
    if (comment && offset >= comment.start && offset < comment.end) {
      pendingWhitespace = true;
      continue;
    }
    const character = source[offset];
    if (inString) {
      normalized += character;
      if (character === '"' && source[offset + 1] === '"') {
        normalized += source[++offset];
      } else if (character === '"') {
        inString = false;
      }
      continue;
    }
    if (character === '"') {
      if (pendingWhitespace && normalized.length > 0) {
        normalized += ' ';
      }
      pendingWhitespace = false;
      normalized += character;
      inString = true;
    } else if (/\s/u.test(character)) {
      pendingWhitespace = true;
    } else {
      if (pendingWhitespace && normalized.length > 0) {
        normalized += ' ';
      }
      pendingWhitespace = false;
      normalized += character;
    }
  }
  return normalized.trim();
}

function getDeclarationSurface(
  parsed: ParsedDocument | undefined,
  source: string
): Map<string, DeclarationSurfaceEntry> {
  const declarations = new Map<string, DeclarationSurfaceEntry>();
  if (!parsed) {
    return declarations;
  }
  const add = (
    kind: WorkspaceDeclarationChange['kind'],
    name: string | undefined,
    range: { start: number; end: number },
    semanticShape: unknown,
    container?: string
  ): void => {
    if (!name) {
      return;
    }
    const change = {
      kind,
      normalizedName: normalizeTypeName(name),
      normalizedContainer: container
        ? normalizeTypeName(container)
        : undefined
    };
    const key = JSON.stringify(change);
    const entry = declarations.get(key) ?? { change, fingerprints: [] };
    entry.fingerprints.push(JSON.stringify([
      normalizeDeclarationText(source, range, parsed.commentRanges ?? []),
      semanticShape
    ]));
    declarations.set(key, entry);
  };
  const addFields = (
    fields: NonNullable<ParsedDocument['declarations'][number]['fields']>,
    container: string | undefined
  ): void => {
    for (const field of fields) {
      const fieldType = field.kind === 'named'
        ? field.type.normalizedName
        : field.elementType.normalizedName;
      add(
        'field',
        field.name?.normalizedName,
        field.range,
        [field.kind, fieldType],
        container
      );
    }
  };

  for (const declaration of parsed.declarations) {
    add(
      'type',
      declaration.name.normalizedName,
      declaration.range,
      [
        declaration.baseType.normalizedName,
        declaration.pointedType?.normalizedName,
        declaration.scalarFactor
      ]
    );
    addFields(declaration.fields ?? [], declaration.name.normalizedName);
  }
  for (const declaration of parsed.globalVariables) {
    add(
      'variable',
      declaration.name.normalizedName,
      declaration.range,
      [
        declaration.type?.normalizedName,
        declaration.inferredTypeName,
        declaration.initializer?.kind,
        declaration.initializer?.text
      ]
    );
    addFields(
      declaration.fields ?? [],
      declaration.type?.normalizedName ?? declaration.inferredTypeName
    );
  }
  for (const routine of parsed.routines) {
    const commonShape = [
      routine.qualifier,
      routine.annotation,
      routine.isBooleanFunction,
      routine.isCompatible,
      routine.returnParameter
        ? [
          routine.returnParameter.name.normalizedName,
          routine.returnParameter.type.normalizedName
        ]
        : undefined,
      routine.computedField
        ? [
          routine.computedField.name.normalizedName,
          routine.computedField.structureType.normalizedName,
          routine.computedField.valueType?.normalizedName
        ]
        : undefined
    ];
    const parameterShape = (parameters: RoutineParameter[]) =>
      parameters.map(parameter => [
        parameter.name.normalizedName,
        parameter.type.normalizedName
      ]);
    add(
      'routine',
      routine.name.normalizedName,
      routine.range,
      [commonShape, parameterShape(routine.parameters)]
    );
    for (const [index, alias] of routine.alternateNames.entries()) {
      add(
        'routine',
        alias.normalizedName,
        alias.range,
        [
          alias.qualifier,
          commonShape,
          parameterShape(routine.alternateParameters[index] ?? [])
        ]
      );
    }
    if (routine.computedField) {
      add(
        'field',
        routine.computedField.name.normalizedName,
        routine.computedField.name.range,
        [
          routine.computedField.structureType.normalizedName,
          routine.computedField.valueType?.normalizedName
        ],
        routine.computedField.structureType.normalizedName
      );
    }
  }
  for (const entry of declarations.values()) {
    entry.fingerprints.sort();
  }
  return declarations;
}

function getSelectiveContextReuseUris(
  directory: string,
  current: {
    uri: string;
    document: TextDocument;
    source: string;
    analysis: SourceAnalysisCacheEntry;
    parsed: ParsedDocument;
  }[],
  previous: Map<string, {
    document: TextDocument;
    parsed: ParsedDocument;
  }> | undefined,
  previousSources: Map<string, string> | undefined,
  requestId: number,
  requestDocumentUri: string
): Set<string> | undefined {
  const selectionStartedAt = profileEnabled ? performance.now() : 0;
  const logSelection = (
    metrics: Record<string, number | string | boolean>
  ): void => {
    logProfile({
      event: 'workspace-context-reuse-selection',
      requestId,
      requestDocumentUri,
      directory,
      durationMs: profileEnabled
        ? performance.now() - selectionStartedAt
        : 0,
      ...metrics
    });
  };
  if (!previous) {
    logSelection({
      reuse: false,
      reason: 'no-previous-snapshot',
      currentDocuments: current.length
    });
    return undefined;
  }
  if (!previousSources) {
    logSelection({
      reuse: false,
      reason: 'previous-source-snapshot-unavailable',
      currentDocuments: current.length
    });
    return undefined;
  }
  const oldEntries = new Map(
    [...previous].filter(([uri]) =>
      dirname(fileURLToPath(uri)) === directory
    )
  );
  const currentByUri = new Map(current.map(entry => [entry.uri, entry]));
  const changedUris = new Set<string>();
  const allUris = new Set([...oldEntries.keys(), ...currentByUri.keys()]);
  for (const uri of allUris) {
    const oldEntry = oldEntries.get(uri);
    const currentEntry = currentByUri.get(uri);
    if (
      oldEntry &&
      currentEntry &&
      previousSources.get(uri) === currentEntry.source
    ) {
      continue;
    }
    changedUris.add(uri);
  }
  if (changedUris.size === 0) {
    logSelection({
      reuse: false,
      reason: 'no-source-changes',
      previousDocuments: oldEntries.size,
      currentDocuments: current.length
    });
    return new Set();
  }

  const changedDocumentHasDiagnostics = [...changedUris].some(uri =>
    (oldEntries.get(uri)?.parsed.diagnostics.length ?? 0) > 0 ||
    (currentByUri.get(uri)?.parsed.diagnostics.length ?? 0) > 0
  );
  if (changedDocumentHasDiagnostics) {
    logSelection({
      reuse: false,
      reason: 'changed-document-has-diagnostics',
      previousDocuments: oldEntries.size,
      currentDocuments: current.length,
      changedDocuments: changedUris.size
    });
    return undefined;
  }

  const declarationChangesByKey = new Map<
    string,
    WorkspaceDeclarationChange
  >();
  for (const uri of changedUris) {
    const oldEntry = oldEntries.get(uri);
    const currentEntry = currentByUri.get(uri);
    const previousSurface = getDeclarationSurface(
      oldEntry?.parsed,
      previousSources.get(uri) ?? ''
    );
    const currentSurface = getDeclarationSurface(
      currentEntry?.parsed,
      currentEntry?.source ?? ''
    );
    const declarationKeys = new Set([
      ...previousSurface.keys(),
      ...currentSurface.keys()
    ]);
    for (const key of declarationKeys) {
      const previousDeclaration = previousSurface.get(key);
      const currentDeclaration = currentSurface.get(key);
      if (
        previousDeclaration &&
        currentDeclaration &&
        JSON.stringify(previousDeclaration.fingerprints) ===
          JSON.stringify(currentDeclaration.fingerprints)
      ) {
        continue;
      }
      if (previousDeclaration) {
        declarationChangesByKey.set(key, previousDeclaration.change);
      }
      if (currentDeclaration) {
        declarationChangesByKey.set(key, currentDeclaration.change);
      }
    }
  }
  const declarationChanges = [...declarationChangesByKey.values()];
  const diagnosticDocuments = [...oldEntries.values()].filter(entry =>
    entry.parsed.diagnostics.length > 0
  ).length;
  if (declarationChanges.length > 0 && diagnosticDocuments > 0) {
    logSelection({
      reuse: false,
      reason: 'diagnostic-snapshot-has-declaration-changes',
      previousDocuments: oldEntries.size,
      currentDocuments: current.length,
      changedDocuments: changedUris.size,
      declarationChanges: declarationChanges.length,
      diagnosticDocuments
    });
    return undefined;
  }

  const previousIndex = getWorkspaceAnalysisIndex(previous);
  const regionGraph = getWorkspaceDeclarationDependencyGraph(previous);
  const affected = new Set<string>();
  const regionAffected = new Set<string>();
  const changedRegionIds = declarationChanges.length > 0
    ? [...changedUris].flatMap(uri =>
      regionGraph.getRegions(uri).map(region => region.id)
    )
    : [];
  const affectedRegionIds = regionGraph.getAffectedRegionsForDeclarationChanges(
    directory,
    declarationChanges,
    changedRegionIds
  );
  for (const region of regionGraph.nodes) {
    if (affectedRegionIds.has(region.id)) {
      regionAffected.add(region.uri);
    }
  }
  for (const uri of changedUris) {
    if (currentByUri.has(uri)) {
      regionAffected.add(uri);
    }
  }
  for (const uri of changedUris) {
    if (declarationChanges.length === 0) {
      affected.add(uri);
      continue;
    }
    for (const affectedUri of
      previousIndex.getAffectedDocumentsForDeclarationChanges(
        uri,
        directory,
        declarationChanges
      )) {
      affected.add(affectedUri);
    }
  }
  const missingRegionCoverage = [...affected].filter(uri =>
    currentByUri.has(uri) && !regionAffected.has(uri)
  );
  if (missingRegionCoverage.length > 0) {
    logSelection({
      reuse: false,
      reason: 'region-graph-missed-document-dependency',
      previousDocuments: oldEntries.size,
      currentDocuments: current.length,
      changedDocuments: changedUris.size,
      declarationChanges: declarationChanges.length,
      affectedDocuments: affected.size,
      affectedRegions: affectedRegionIds.size,
      regionAffectedDocuments: regionAffected.size,
      missingRegionCoverage: missingRegionCoverage.length
    });
    return undefined;
  }
  for (const uri of regionAffected) {
    affected.add(uri);
  }
  const reusableUris = new Set(
    current
      .filter(entry =>
        !affected.has(entry.uri) &&
        entry.analysis.parsed !== undefined
      )
      .map(entry => entry.uri)
  );
  logSelection({
    reuse: true,
    reason: 'dependency-closure',
    previousDocuments: oldEntries.size,
    currentDocuments: current.length,
    changedDocuments: changedUris.size,
    declarationChanges: declarationChanges.length,
    affectedDocuments: affected.size,
    affectedRegions: affectedRegionIds.size,
    regionAffectedDocuments: regionAffected.size,
    reusableDocuments: reusableUris.size
  });
  return reusableUris;
}

function getReusableRoutineRegionSnapshots(
  directory: string,
  current: {
    uri: string;
    source: string;
    parsed: ParsedDocument;
  }[],
  previous: Map<string, {
    document: TextDocument;
    parsed: ParsedDocument;
  }> | undefined,
  previousSources: Map<string, string> | undefined
): Map<string, { source: string; routines: readonly RoutineDeclaration[] }> {
  const snapshots = new Map<
    string,
    { source: string; routines: readonly RoutineDeclaration[] }
  >();
  if (!previous || !previousSources) {
    return snapshots;
  }
  const oldEntries = new Map(
    [...previous].filter(([uri]) =>
      dirname(fileURLToPath(uri)) === directory
    )
  );
  const currentByUri = new Map(current.map(entry => [entry.uri, entry]));
  if (
    oldEntries.size !== currentByUri.size ||
    [...oldEntries.keys()].some(uri => !currentByUri.has(uri)) ||
    [...oldEntries.values()].some(entry =>
      entry.parsed.diagnostics.length > 0
    )
  ) {
    return snapshots;
  }
  const changedUris = [...currentByUri.values()].filter(entry =>
    previousSources.get(entry.uri) !== entry.source
  );
  if (changedUris.length !== 1) {
    return snapshots;
  }
  const changed = changedUris[0];
  const previousEntry = oldEntries.get(changed.uri);
  if (!previousEntry) {
    return snapshots;
  }
  const previousSurface = getDeclarationSurface(
    previousEntry.parsed,
    previousSources.get(changed.uri) ?? ''
  );
  const currentSurface = getDeclarationSurface(changed.parsed, changed.source);
  if (
    previousSurface.size !== currentSurface.size ||
    [...previousSurface].some(([key, oldDeclaration]) => {
      const currentDeclaration = currentSurface.get(key);
      return !currentDeclaration ||
        JSON.stringify(oldDeclaration.fingerprints) !==
          JSON.stringify(currentDeclaration.fingerprints);
    })
  ) {
    return snapshots;
  }
  snapshots.set(changed.uri, {
    source: previousSources.get(changed.uri) ?? '',
    routines: previousEntry.parsed.routines
  });
  return snapshots;
}

function getWorkspaceCompletions(
  workspaceDocuments: Map<
    string,
    { document: TextDocument; parsed: ParsedDocument }
  >,
  directory: string
): CompletionItem[] {
  let itemsByDirectory = workspaceCompletionItems.get(workspaceDocuments);
  const cachedItems = itemsByDirectory?.get(directory);
  if (cachedItems) {
    return cachedItems;
  }
  const items: CompletionItem[] = [];
  const seen = new Set<string>();
  const add = (
    key: string,
    label: string,
    kind: CompletionItemKind,
    detail: string,
    sortPrefix: string
  ): void => {
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    items.push({
      label,
      kind,
      detail,
      filterText: normalizeTypeName(label),
      sortText: `${sortPrefix}-${normalizeTypeName(label)}`
    });
  };

  for (const [uri, { parsed }] of workspaceDocuments) {
    if (dirname(fileURLToPath(uri)) !== directory) {
      continue;
    }
    for (const type of parsed.symbols.entries.filter(symbol =>
      symbol.kind === 'primitive' ||
      Boolean(
        symbol.declaration &&
        parsed.declarations.includes(symbol.declaration)
      )
    )) {
      add(
        `type:${type.normalizedName}`,
        type.name,
        CompletionItemKind.Class,
        type.kind === 'primitive' ? 'Tipo primitivo' : 'Tipo',
        '0'
      );
      if (type.pluralName !== type.name) {
        add(
          `type:${normalizeTypeName(type.pluralName)}`,
          type.pluralName,
          CompletionItemKind.Class,
          'Tipo no plural',
          '0'
        );
      }
    }
    for (const variable of parsed.globalVariableSymbols.entries.filter(symbol =>
      parsed.globalVariables.includes(symbol.declaration)
    )) {
      add(
        `variable:${variable.normalizedName}`,
        variable.name,
        CompletionItemKind.Variable,
        variable.typeName ? `Variável: ${variable.typeName}` : 'Variável global',
        '1'
      );
    }
    for (const routine of parsed.routines) {
      const bindingId = routine.bindingId ??
        `${routine.name.normalizedName}:${routine.range.start}:${routine.range.end}`;
      const parameters = routine.parameters
        .map(parameter => parameter.type.name)
        .join(', ');
      const detail = `${routine.annotation === 'função' ? 'Função' : 'Rotina'}${parameters ? ` (${parameters})` : ''}`;
      const routineNames = [
        {
          ...routine.name,
          name: routine.qualifier
            ? `${routine.name.name} ${routine.qualifier}`
            : routine.name.name
        },
        ...routine.alternateNames
      ];
      for (const name of routineNames) {
        const label = name.qualifier
          ? `${name.name} ${name.qualifier}`
          : name.name;
        add(
          `routine:${bindingId}:${normalizeTypeName(label)}`,
          label,
          routine.annotation === 'função'
            ? CompletionItemKind.Function
            : CompletionItemKind.Method,
          detail,
          '2'
        );
      }
    }
    for (const type of parsed.symbols.entries.filter(symbol =>
      Boolean(
        symbol.declaration &&
        parsed.declarations.includes(symbol.declaration)
      )
    )) {
      for (const field of type.fields ?? []) {
        if (!field.name) {
          continue;
        }
        add(
          `field:${type.normalizedName}:${field.name.normalizedName}`,
          field.name.name,
          CompletionItemKind.Field,
          `${type.name}: ${field.kind === 'named' ? field.type.name : field.elementType.name}`,
          '3'
        );
      }
    }
  }

  if (!itemsByDirectory) {
    itemsByDirectory = new Map();
    workspaceCompletionItems.set(workspaceDocuments, itemsByDirectory);
  }
  itemsByDirectory.set(directory, items);
  return items;
}

function logProfile(metrics: Record<string, number | string | boolean>): void {
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
      timestampMs: performance.now(),
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
  const gcObserver = new PerformanceObserver(list => {
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

function profileRequest<T>(
  name: string,
  handler: (requestId: number) => T | Promise<T>,
  documentUri?: string
): T | Promise<T> {
  if (!profileEnabled) {
    return handler(0);
  }
  const startedAt = performance.now();
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
      endTimeMs: performance.now(),
      elapsedMs: performance.now() - startedAt,
      pendingRequests: pendingProfileRequests,
      rssBytes: memory.rss,
      heapUsedBytes: memory.heapUsed
    });
  }, slowProfileThresholdMs);
  watchdog.unref();
  const logCompletion = (success: boolean): void => {
    requestCompleted = true;
    clearTimeout(watchdog);
    pendingProfileRequests--;
    const endTimeMs = performance.now();
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
      return result.then(
        value => {
          logCompletion(true);
          return value;
        },
        error => {
          logCompletion(false);
          throw error;
        }
      );
    }
    logCompletion(true);
    return result;
  } catch (error) {
    logCompletion(false);
    throw error;
  }
}

function logDocumentSymbolStage(
  requestId: number,
  documentUri: string,
  stage: string,
  startTimeMs: number,
  metrics: Record<string, number | string | boolean> = {}
): void {
  if (!profileEnabled || requestId === 0) {
    return;
  }
  const endTimeMs = performance.now();
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

connection.onInitialize((): InitializeResult => ({
  capabilities: {
    textDocumentSync: TextDocumentSyncKind.Incremental,
    definitionProvider: true,
    typeDefinitionProvider: true,
    hoverProvider: true,
    documentSymbolProvider: true,
    workspaceSymbolProvider: true,
    referencesProvider: true,
    renameProvider: { prepareProvider: true },
    implementationProvider: true,
    completionProvider: { triggerCharacters: [' '] },
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
  const formatted = formatDocument(original, cachedParse);
  if (formatted === original) {
    return [];
  }
  return [TextEdit.replace({
    start: document.positionAt(0),
    end: document.positionAt(original.length)
  }, formatted)];
}));

connection.onHover(params => profileRequest('hover', async requestId => {
  const document = documents.get(params.textDocument.uri);
  const parsedDocument = document && parsedDocuments.get(document.uri);
  if (!document || !parsedDocument) {
    return undefined;
  }

  const analysis = getDocumentAnalysis(
    parsedDocument,
    document.getText().length,
    documentAnalysisProfiler(requestId, document.uri)
  );
  const reference = analysis.findReferenceAt(
    document.offsetAt(params.position)
  );
  const symbol = reference && analysis.getSymbol(reference);
  if (!reference || !symbol) {
    return undefined;
  }

  let declarationNodes = analysis.getDeclarationNodes(reference);
  if (declarationNodes.length === 0) {
    const workspaceDocuments = await getWorkspaceDocuments(
      requestId,
      document.uri
    );
    const directory = dirname(fileURLToPath(document.uri));
    const declaration = getWorkspaceAnalysisIndex(
      workspaceDocuments,
      requestId,
      document.uri
    ).getDeclaration(directory, reference, document.uri);
    const owner = declaration &&
      workspaceDocuments.get(declaration.uri);
    if (declaration && owner) {
      const ownerAnalysis = getDocumentAnalysis(
        owner.parsed,
        owner.document.getText().length,
        documentAnalysisProfiler(requestId, document.uri, owner.document.uri)
      );
      declarationNodes = ownerAnalysis.getDeclarationNodes(
        declaration.reference
      );
    }
  }

  let contents: string | undefined;
  if (reference.kind === 'type') {
    const normalizedName = normalizeTypeName(reference.name);
    const primitiveName = normalizedName === 'byte' || normalizedName === 'bytes'
      ? 'byte'
      : normalizedName === 'estrutura' || normalizedName === 'estruturas'
        ? 'estrutura'
        : undefined;
    if (primitiveName === 'byte') {
      contents = [
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
      ].join('\n');
    } else if (primitiveName === 'estrutura') {
      contents = [
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
    } else {
      const type = parsedDocument.symbols.lookup(reference.name);
      if (type) {
        const details = [
          `**${type.name}**`,
          '',
          type.kind === 'scalar' ? 'Tipo escalar derivado.' : 'Tipo derivado.',
          type.baseType ? `Tipo base: \`${type.baseType.name}\`.` : undefined,
          type.pointedType
            ? `Tipo apontado: \`${type.pointedType.name}\`.`
            : undefined,
          type.scalarFactor
            ? `Fator escalar: \`${type.scalarFactor}\`.`
            : undefined
        ].filter((line): line is string => Boolean(line));
        const fields = (type.fields ?? []).map(field =>
          field.kind === 'named'
            ? `- \`${field.type.name}\` ${field.name.name}`
            : `- \`${field.elementType.name}\` ${field.count}${field.name ? ` ${field.name.name}` : ''}`
        );
        if (fields.length > 0) {
          details.push('', '**Campos**', ...fields);
        }
        contents = details.join('\n');
      }
    }
  } else {
    const declarationNode = declarationNodes.find(node =>
      node.globalVariableDeclaration ||
      node.parameterDeclaration ||
      node.localVariableDeclaration ||
      node.fieldDeclaration ||
      node.computedFieldDeclaration
    ) ?? declarationNodes[0];
    if (declarationNode?.globalVariableDeclaration) {
      const variable = declarationNode.globalVariableDeclaration;
      const typeName = variable.type?.name ??
        variable.inferredTypeName ??
        'desconhecido';
      contents = `**${variable.name.name}**\n\nVariável global\n\nTipo: \`${typeName}\``;
    } else if (declarationNode?.parameterDeclaration) {
      const parameter = declarationNode.parameterDeclaration;
      contents = `**${parameter.name.name}**\n\nParâmetro\n\nTipo: \`${parameter.type.name}\``;
    } else if (declarationNode?.localVariableDeclaration) {
      const variable = declarationNode.localVariableDeclaration;
      contents = `**${variable.name.name}**\n\nVariável local\n\nTipo: \`${variable.type.name}\``;
    } else if (declarationNode?.fieldDeclaration) {
      const field = declarationNode.fieldDeclaration;
      contents = field.kind === 'named'
        ? `**${field.name.name}**\n\nCampo\n\nTipo: \`${field.type.name}\``
        : field.name
          ? `**${field.name.name}**\n\nCampo de lista\n\nTipo dos elementos: \`${field.elementType.name}\`\n\nQuantidade: \`${field.count}\``
          : undefined;
    } else if (declarationNode?.computedFieldDeclaration) {
      const computedField = declarationNode.computedFieldDeclaration;
      contents = computedField
        ? `**${computedField.name.name}**\n\nCampo calculado\n\nEstrutura: \`${computedField.structureType.name}\`${computedField.valueType ? `\n\nTipo do valor: \`${computedField.valueType.name}\`` : ''}`
        : undefined;
    } else {
      let owner: SyntaxNode | undefined = declarationNode;
      while (
        owner &&
        !owner.routineDeclaration &&
        owner.parentId !== undefined
      ) {
        owner = analysis.nodes.get(owner.parentId);
      }
      const routine = owner?.routineDeclaration;
      if (routine) {
        const routineKind = routine.annotation === 'função'
          ? 'Função'
          : 'Rotina';
        const parameters = routine.parameters.map(parameter =>
          `${parameter.type.name} ${parameter.name.name}`
        );
        contents = `**${routineKind} ${routine.name.name}**${routine.qualifier ? ` ${routine.qualifier}` : ''}${parameters.length > 0 ? `\n\nParâmetros: ${parameters.join(', ')}` : ''}`;
      }
    }
  }

  if (!contents) {
    return undefined;
  }
  return {
    contents: { kind: MarkupKind.Markdown, value: contents },
    range: {
      start: document.positionAt(reference.range.start),
      end: document.positionAt(reference.range.end)
    }
  };
}));

connection.onCompletion((params: CompletionParams) =>
  profileRequest('completion', async requestId => {
    const document = documents.get(params.textDocument.uri);
    if (!document) {
      return [];
    }
    const workspaceDocuments = await getWorkspaceDocuments(
      requestId,
      document.uri
    );
    const parsedDocument = workspaceDocuments.get(document.uri)?.parsed;
    if (!parsedDocument) {
      return [];
    }

    const analysis = getDocumentAnalysis(
      parsedDocument,
      document.getText().length,
      documentAnalysisProfiler(requestId, document.uri)
    );
    const directory = dirname(fileURLToPath(document.uri));
    const items = [...getWorkspaceCompletions(workspaceDocuments, directory)];
    const scope = analysis.getScopeAt(document.offsetAt(params.position));
    const routine = scope?.kind === 'routine'
      ? analysis.nodes.get(scope.ownerNodeId)?.routineDeclaration
      : undefined;
    if (routine) {
      const localVariables = [
        ...routine.parameters,
        ...routine.preservedParameters.map(parameter => parameter.parameter),
        ...(routine.returnParameter ? [routine.returnParameter] : []),
        ...routine.localVariables,
        ...routine.calls.flatMap(call => call.localVariables ?? []),
        ...routine.processes.flatMap(process =>
          process.returnVariable ? [process.returnVariable] : []
        )
      ];
      const seenLocals = new Set<string>();
      for (const variable of localVariables) {
        const key = normalizeTypeName(variable.name.name);
        if (seenLocals.has(key)) {
          continue;
        }
        seenLocals.add(key);
        items.push({
          label: variable.name.name,
          kind: CompletionItemKind.Variable,
          detail: `Variável local: ${variable.type.name}`,
          filterText: key,
          sortText: `0-${key}`
        });
      }
    }
    return items;
  })
);

function hasOpenDocumentSourceChanges(): boolean {
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

function updateDocumentSymbols(forceWorkspaceRefresh = false): Promise<void> {
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
  void updatePromise.then(
    () => finishDocumentSymbolsUpdate(updatePromise),
    () => finishDocumentSymbolsUpdate(updatePromise)
  );
  return updatePromise;
}

function finishDocumentSymbolsUpdate(updatePromise: Promise<void>): void {
  if (documentSymbolsUpdatePromise !== updatePromise) {
    return;
  }
  documentSymbolsUpdatePromise = undefined;
  if (documentSymbolsUpdatePending) {
    void updateDocumentSymbols();
  }
}

async function publishOpenDocumentDiagnostics(): Promise<void> {
  const startedAt = profileEnabled ? performance.now() : 0;
  const openDocuments = documents.all();
  logProfile({
    event: 'document-update-start',
    timestampMs: startedAt,
    openDocuments: openDocuments.length,
    pendingRequests: pendingProfileRequests
  });
  const workspaceDocuments = await getWorkspaceDocuments();
  const duplicateDeclarations = getWorkspaceDuplicateDeclarations(
    [...workspaceDocuments].map(([uri, { parsed }]) => ({
      uri,
      directory: dirname(fileURLToPath(uri)),
      parsed
    }))
  );
  for (const document of openDocuments) {
    const currentDocument = documents.get(document.uri);
    const indexedDocument = workspaceDocuments.get(document.uri);
    if (
      !currentDocument ||
      !indexedDocument ||
      !isCurrentDocumentSnapshot(
        document.version,
        currentDocument.version,
        indexedDocument.document.version
      )
    ) {
      if (profileEnabled) {
        logProfile({
          event: 'diagnostics-skipped-stale-snapshot',
          documentUri: document.uri,
          capturedVersion: document.version,
          currentVersion: currentDocument?.version ?? -1,
          indexedVersion: indexedDocument?.document.version ?? -1
        });
      }
      continue;
    }
    const parsedDocument = indexedDocument.parsed;
    if (!parsedDocument) {
      continue;
    }
    parsedDocuments.set(currentDocument.uri, parsedDocument);
    publishDiagnostics(
      currentDocument,
      parsedDocument,
      duplicateDeclarations.get(currentDocument.uri) ?? []
    );
  }
  if (profileEnabled) {
    logProfile({
      event: 'document-update',
      startTimeMs: startedAt,
      endTimeMs: performance.now(),
      durationMs: performance.now() - startedAt,
      openDocuments: openDocuments.length,
      indexedDocuments: workspaceDocuments.size
    });
  }
}

function invalidateWorkspaceDocuments(): void {
  if (workspaceDocumentIndex) {
    previousWorkspaceDocumentIndex = workspaceDocumentIndex;
  }
  workspaceDocumentIndex = undefined;
  workspaceRevision++;
}

function publishDiagnostics(
  document: TextDocument,
  parsedDocument: ParsedDocument,
  duplicateDeclarations: WorkspaceDuplicateDeclaration[] = []
): void {
  const diagnostics: Diagnostic[] = parsedDocument.diagnostics.map(diagnostic => ({
    severity: diagnostic.severity === 'hint'
      ? DiagnosticSeverity.Hint
      : DiagnosticSeverity.Error,
    range: {
      start: document.positionAt(diagnostic.range.start),
      end: document.positionAt(diagnostic.range.end)
    },
    message: diagnostic.message,
    source: 'portugues-puro'
  }));
  for (const duplicate of duplicateDeclarations) {
    diagnostics.push({
      severity: DiagnosticSeverity.Error,
      range: {
        start: document.positionAt(duplicate.range.start),
        end: document.positionAt(duplicate.range.end)
      },
      message: `Identificador "${duplicate.name}" (${duplicate.kind}) já declarado neste diretório.`,
      source: 'portugues-puro'
    });
  }
  connection.sendDiagnostics({
    uri: document.uri,
    version: document.version,
    diagnostics
  });
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
  const initializationStartedAt = profileEnabled ? performance.now() : 0;
  await updateDocumentSymbols(true);
  logProfile({
    event: 'workspace-initialization',
    startTimeMs: initializationStartedAt,
    endTimeMs: performance.now(),
    durationMs: performance.now() - initializationStartedAt,
    openDocuments: documents.all().length,
    indexedDocuments: workspaceDocumentIndex?.size ?? 0
  });
});

connection.onDefinition(params => profileRequest('definition', async requestId => {
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
  const documentDirectory = dirname(fileURLToPath(document.uri));
  const workspaceAnalysis = getWorkspaceAnalysisIndex(
    workspaceDocuments,
    requestId,
    document.uri
  );
  const offset = document.offsetAt(params.position);
  const analysis = getDocumentAnalysis(
    parsedDocument,
    document.getText().length,
    documentAnalysisProfiler(requestId, document.uri)
  );
  const parsedReference = findDocumentReference(
    parsedDocument,
    offset,
    requestId,
    document.uri,
    document.getText().length,
    undefined
  );
  const resolveReferenceDeclaration = (
    reference: ParsedReference
  ): ReturnType<typeof Location.create> | undefined => {
    const declaration = workspaceAnalysis.getDeclaration(
      documentDirectory,
      reference,
      document.uri
    );
    const owner = declaration &&
      workspaceDocuments.get(declaration.uri);
    if (declaration && owner) {
      return Location.create(declaration.uri, {
        start: owner.document.positionAt(declaration.reference.range.start),
        end: owner.document.positionAt(declaration.reference.range.end)
      });
    }
    return undefined;
  };
  const resolveTypeDefinition = (
    reference: ParsedReference
  ): ReturnType<typeof Location.create> | undefined =>
    resolveReferenceDeclaration(reference);
  const resolveTypeName = (
    typeName: string
  ): ReturnType<typeof Location.create> | undefined => {
    const declaration = workspaceAnalysis.getTypeDeclaration(
      documentDirectory,
      normalizeTypeName(typeName)
    );
    const owner = declaration &&
      workspaceDocuments.get(declaration.uri);
    if (declaration && owner) {
      return Location.create(declaration.uri, {
        start: owner.document.positionAt(declaration.reference.range.start),
        end: owner.document.positionAt(declaration.reference.range.end)
      });
    }
    return undefined;
  };
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
            ...routine.processes.flatMap(process =>
              process.returnVariable ? [process.returnVariable] : []
            )
          ];
          return variables.some(variable =>
            offset >= variable.type.range.start &&
            offset < variable.type.range.end
          );
        });
    if (parsedReference.scope !== undefined) {
      if (!isTypePosition) {
        const declaration = workspaceAnalysis.getDeclaration(
          documentDirectory,
          parsedReference,
          document.uri
        );
        const owner = declaration && workspaceDocuments.get(declaration.uri);
        if (declaration && owner) {
          return Location.create(declaration.uri, {
            start: owner.document.positionAt(declaration.reference.range.start),
            end: owner.document.positionAt(declaration.reference.range.end)
          });
        }
      }
    } else {
      const declaration = workspaceAnalysis.getDeclaration(
        documentDirectory,
        parsedReference,
        document.uri
      );
      const owner = declaration && workspaceDocuments.get(declaration.uri);
      if (declaration && owner) {
        return Location.create(declaration.uri, {
          start: owner.document.positionAt(declaration.reference.range.start),
          end: owner.document.positionAt(declaration.reference.range.end)
        });
      }
    }
    if (isTypePosition) {
      const typeReference = analysis.findReferenceAt(offset, 'type');
      const location = typeReference &&
        resolveTypeDefinition(typeReference);
      if (location) {
        return location;
      }
    }
  }
  if (parsedReference?.kind === 'routine') {
    const declaration = resolveReferenceDeclaration(parsedReference);
    if (declaration) {
      return declaration;
    }
  }
  if (parsedReference?.kind === 'type') {
    const location = resolveTypeDefinition(parsedReference);
    if (location) {
      return location;
    }
  }
  if (parsedReference?.kind === 'field') {
    if (parsedReference.declaration) {
      const matchingType = workspaceAnalysis.getTypeDeclaration(
        documentDirectory,
        normalizeTypeName(parsedReference.name)
      ) !== undefined;
      const typeName = matchingType
        ? parsedReference.name
        : analysis.findTypeDefinitionAt(offset);
      const typeLocation = typeName && resolveTypeName(typeName);
      if (typeLocation) {
        return typeLocation;
      }
    }
    const declaration = resolveReferenceDeclaration(parsedReference);
    if (declaration) {
      return declaration;
    }
  }

  if (parsedReference?.kind === 'routine') {
    return resolveReferenceDeclaration(parsedReference);
  }

  return undefined;
}));

connection.onTypeDefinition(params => profileRequest('type-definition', async requestId => {
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

  const analysis = getDocumentAnalysis(
    parsedDocument,
    document.getText().length,
    documentAnalysisProfiler(requestId, document.uri)
  );
  const typeName = analysis.findTypeDefinitionAt(
    document.offsetAt(params.position)
  );
  if (!typeName) {
    return undefined;
  }

  const documentDirectory = dirname(fileURLToPath(document.uri));
  const declaration = getWorkspaceAnalysisIndex(
    workspaceDocuments,
    requestId,
    document.uri
  ).getTypeDeclaration(documentDirectory, normalizeTypeName(typeName));
  const owner = declaration && workspaceDocuments.get(declaration.uri);
  if (declaration && owner) {
    return Location.create(declaration.uri, {
      start: owner.document.positionAt(declaration.reference.range.start),
      end: owner.document.positionAt(declaration.reference.range.end)
    });
  }

  return undefined;
}));

connection.onImplementation((params: ImplementationParams) =>
  profileRequest('implementation', async requestId => {
    const document = documents.get(params.textDocument.uri);
    if (!document) {
      return undefined;
    }

    const workspaceDocuments = await getWorkspaceDocuments(
      requestId,
      document.uri
    );
    const parsedDocument = workspaceDocuments.get(document.uri)?.parsed;
    if (!parsedDocument) {
      return undefined;
    }
    const reference = findDocumentReference(
      parsedDocument,
      document.offsetAt(params.position),
      requestId,
      document.uri,
      document.getText().length,
      'routine'
    );
    if (!reference) {
      return undefined;
    }

    const directory = dirname(fileURLToPath(document.uri));
    const declarations = getWorkspaceAnalysisIndex(
      workspaceDocuments,
      requestId,
      document.uri
    ).getRoutineDeclarations(directory, reference);
    const locations = declarations.flatMap(({ uri, declaration }) => {
      const owner = workspaceDocuments.get(uri);
      if (!owner || declaration.bodyRange.end < declaration.bodyRange.start) {
        return [];
      }
      return [Location.create(uri, {
        start: owner.document.positionAt(declaration.bodyRange.start),
        end: owner.document.positionAt(declaration.bodyRange.end)
      })];
    });
    return locations.length > 0 ? locations : undefined;
  })
);

connection.onDocumentSymbol(params => profileRequest('document-symbol', async requestId => {
  const documentLookupStartedAt = profileEnabled ? performance.now() : 0;
  const document = documents.get(params.textDocument.uri);
  logDocumentSymbolStage(
    requestId,
    params.textDocument.uri,
    'document-lookup',
    documentLookupStartedAt,
    { documentFound: Boolean(document) }
  );
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
  const parsedLookupStartedAt = profileEnabled ? performance.now() : 0;
  let parsedDocument = parsedDocuments.get(document.uri);
  const parsedCacheHit = Boolean(parsedDocument);
  if (!parsedDocument) {
    parsedDocument = (
      await getWorkspaceDocuments(requestId, document.uri)
    ).get(document.uri)?.parsed;
    if (parsedDocument) {
      parsedDocuments.set(document.uri, parsedDocument);
    }
  }
  logDocumentSymbolStage(
    requestId,
    document.uri,
    'parsed-analysis-and-context-catalog',
    parsedLookupStartedAt,
    {
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
    }
  );
  const symbolConstructionStartedAt = profileEnabled ? performance.now() : 0;
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
  logDocumentSymbolStage(
    requestId,
    document.uri,
    'handler-return',
    symbolConstructionStartedAt,
    { symbols: symbols?.length ?? 0 }
  );
  return symbols;
}, params.textDocument.uri));

connection.onWorkspaceSymbol(params => profileRequest('workspace-symbol', async () => {
  const workspaceDocuments = await getWorkspaceDocuments();
  const query = normalizeTypeName(params.query);
  const results: SymbolInformation[] = [];

  for (const { document, parsed } of workspaceDocuments.values()) {
    const visit = (symbol: DocumentSymbol, containerName?: string): void => {
      if (!query || normalizeTypeName(symbol.name).includes(query)) {
        results.push(SymbolInformation.create(
          symbol.name,
          symbol.kind,
          symbol.range,
          document.uri,
          containerName
        ));
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

connection.onReferences(params => profileRequest('references', async requestId => {
  const document = documents.get(params.textDocument.uri);
  const workspaceDocuments = await getWorkspaceDocuments();
  const parsedDocument = document &&
    (workspaceDocuments.get(document.uri)?.parsed ?? parsedDocuments.get(document.uri));
  if (!document || !parsedDocument) {
    return undefined;
  }
  const target = findDocumentReference(
    parsedDocument,
    document.offsetAt(params.position),
    requestId,
    document.uri,
    document.getText().length,
    undefined
  );
  if (!target) {
    return undefined;
  }

  const results: ReturnType<typeof Location.create>[] = [];
  const seen = new Set<string>();
  const directory = dirname(fileURLToPath(document.uri));
  for (const { uri, reference } of getWorkspaceAnalysisIndex(
    workspaceDocuments,
    requestId,
    document.uri
  ).getReferences(directory, target, document.uri)) {
    const candidate = workspaceDocuments.get(uri);
    if (!candidate || target.scope !== undefined && uri !== document.uri) {
      continue;
    }
    if (!params.context.includeDeclaration && reference.declaration) {
      continue;
    }
    const locationKey = `${uri}:${reference.range.start}:${reference.range.end}`;
    if (seen.has(locationKey)) {
      continue;
    }
    seen.add(locationKey);
    results.push(Location.create(uri, {
      start: candidate.document.positionAt(reference.range.start),
      end: candidate.document.positionAt(reference.range.end)
    }));
  }
  return results;
}));

connection.onPrepareRename(params => profileRequest('prepare-rename', requestId => {
  const document = documents.get(params.textDocument.uri);
  const parsed = document && parsedDocuments.get(document.uri);
  if (!document || !parsed) {
    return undefined;
  }
  const reference = findDocumentReference(
    parsed,
    document.offsetAt(params.position),
    requestId,
    document.uri,
    document.getText().length,
    undefined
  );
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

connection.onRenameRequest(params => profileRequest('rename', async (requestId): Promise<WorkspaceEdit | undefined> => {
  const document = documents.get(params.textDocument.uri);
  const workspaceDocuments = await getWorkspaceDocuments();
  const parsed = document &&
    (workspaceDocuments.get(document.uri)?.parsed ?? parsedDocuments.get(document.uri));
  const newName = params.newName.trim();
  if (!document || !parsed || !newName) {
    return undefined;
  }
  const target = findDocumentReference(
    parsed,
    document.offsetAt(params.position),
    requestId,
    document.uri,
    document.getText().length,
    undefined
  );
  if (!target) {
    return undefined;
  }

  const changes: NonNullable<WorkspaceEdit['changes']> = {};
  const seen = new Set<string>();
  const directory = dirname(fileURLToPath(document.uri));
  for (const { uri, reference } of getWorkspaceAnalysisIndex(
    workspaceDocuments,
    requestId,
    document.uri
  ).getReferences(directory, target, document.uri)) {
    const candidate = workspaceDocuments.get(uri);
    if (!candidate || target.scope !== undefined && uri !== document.uri) {
      continue;
    }
    const locationKey = `${uri}:${reference.range.start}:${reference.range.end}`;
    if (seen.has(locationKey)) {
      continue;
    }
    seen.add(locationKey);
    (changes[uri] ??= []).push(TextEdit.replace({
      start: candidate.document.positionAt(reference.range.start),
      end: candidate.document.positionAt(reference.range.end)
    }, newName));
  }

  return Object.keys(changes).length > 0 ? { changes } : undefined;
}));

function createDocumentSymbols(
  parsed: ParsedDocument,
  document: TextDocument,
  requestId = 0
): DocumentSymbol[] {
  const analysis = getDocumentAnalysis(
    parsed,
    document.getText().length,
    documentAnalysisProfiler(requestId, document.uri)
  );
  const documentUri = document.uri;
  const cacheLookupStartedAt = profileEnabled ? performance.now() : 0;
  const cachedSymbols = documentSymbolsCache.get(parsed);
  logDocumentSymbolStage(
    requestId,
    documentUri,
    'symbol-cache-lookup',
    cacheLookupStartedAt,
    { cacheHit: Boolean(cachedSymbols) }
  );
  if (cachedSymbols) {
    return cachedSymbols;
  }

  const { symbols, metrics } = buildDocumentSymbols(
    parsed,
    document,
    analysis,
    profileEnabled
  );
  if (profileEnabled) {
    logDocumentSymbolStage(
      requestId,
      documentUri,
      'construct-sort-and-cache-symbols',
      cacheLookupStartedAt,
      { cacheHit: false, ...metrics }
    );
  }
  documentSymbolsCache.set(parsed, symbols);
  return symbols;
}

async function getWorkspaceDocuments(
  requestId = 0,
  requestDocumentUri = ''
): Promise<
  Map<string, { document: TextDocument; parsed: ParsedDocument }>
> {
  const validationStartedAt = profileEnabled ? performance.now() : 0;
  const cachedIndex = workspaceDocumentIndex;
  if (cachedIndex) {
    const snapshot = workspaceDirectorySnapshots;
    const directories = [...snapshot.entries()];
    const changedDirectory = await Promise.all(directories.map(async ([directory, stamp]) => {
      const current = await stat(directory);
      return current.mtimeMs !== stamp.modificationTime ||
        current.ctimeMs !== stamp.changeTime;
    })).then(changes => changes.some(Boolean));
    if (!changedDirectory && workspaceDocumentIndex === cachedIndex) {
      logDocumentSymbolStage(
        requestId,
        requestDocumentUri,
        'workspace-cache-validation',
        validationStartedAt,
        {
          cacheHit: true,
          directoriesChecked: directories.length,
          indexedDocuments: cachedIndex.size
        }
      );
      return cachedIndex;
    }
    if (workspaceDocumentIndex === cachedIndex) {
      invalidateWorkspaceDocuments();
    }
  } else {
    logDocumentSymbolStage(
      requestId,
      requestDocumentUri,
      'workspace-cache-validation',
      validationStartedAt,
      { cacheHit: false, directoriesChecked: 0, indexedDocuments: 0 }
    );
  }
  return refreshWorkspaceDocuments(requestId, requestDocumentUri);
}

async function refreshWorkspaceDocuments(
  requestId = 0,
  requestDocumentUri = ''
): Promise<
  Map<string, { document: TextDocument; parsed: ParsedDocument }>
> {
  if (workspaceDocumentIndex) {
    return workspaceDocumentIndex;
  }
  if (workspaceRefreshPromise) {
    logDocumentSymbolStage(
      requestId,
      requestDocumentUri,
      'workspace-refresh-shared-promise',
      profileEnabled ? performance.now() : 0,
      { sharedPromise: true }
    );
    return workspaceRefreshPromise;
  }

  const refreshPromise = buildWorkspaceDocumentIndex(
    requestId,
    requestDocumentUri
  );
  workspaceRefreshPromise = refreshPromise;
  try {
    return await refreshPromise;
  } finally {
    if (workspaceRefreshPromise === refreshPromise) {
      workspaceRefreshPromise = undefined;
    }
  }
}

async function buildWorkspaceDocumentIndex(
  requestId = 0,
  requestDocumentUri = ''
): Promise<
  Map<string, { document: TextDocument; parsed: ParsedDocument }>
> {
  while (true) {
    const revision = workspaceRevision;
    const startedAt = profileEnabled ? performance.now() : 0;
    const discoveryStartedAt = profileEnabled ? performance.now() : 0;
    const sourceDocuments = new Map<string, {
      document: TextDocument;
      directory: string;
    }>();
    const sourceByteLengths = new Map<string, number>();
    const directories = new Set<string>();
    for (const document of documents.all()) {
      const directory = dirname(fileURLToPath(document.uri));
      directories.add(directory);
      sourceDocuments.set(document.uri, { document, directory });
    }

    const folders = await connection.workspace.getWorkspaceFolders();
    for (const folder of folders ?? []) {
      directories.add(fileURLToPath(folder.uri));
    }

    const directorySnapshots = new Map<string, {
      modificationTime: number;
      changeTime: number;
    }>();
    for (const directory of directories) {
      const directoryStats = await stat(directory);
      directorySnapshots.set(directory, {
        modificationTime: directoryStats.mtimeMs,
        changeTime: directoryStats.ctimeMs
      });
      const entries = await readdir(directory, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isFile() || extname(entry.name).toLocaleLowerCase() !== '.pop') {
          continue;
        }

        const filePath = join(directory, entry.name);
        const uri = pathToFileURL(filePath).toString();
        if (sourceDocuments.has(uri)) {
          sourceByteLengths.set(uri, (await stat(filePath)).size);
          continue;
        }
        const contentBytes = await readFile(filePath);
        sourceByteLengths.set(uri, contentBytes.byteLength);
        const content = new TextDecoder('windows-1252').decode(contentBytes);
        sourceDocuments.set(uri, {
          document: TextDocument.create(uri, 'portugues-puro', 0, content),
          directory
        });
      }
    }
    const sourceDiscoveryMs = profileEnabled
      ? performance.now() - discoveryStartedAt
      : 0;

    const parseTotals = {
      lexicalMs: 0,
      syntaxMs: 0,
      symbolCatalogMs: 0,
      dependencyResolutionMs: 0,
      typeResolutionMs: 0,
      globalVariableResolutionMs: 0,
      routineResolutionMs: 0,
      routineVerificationMs: 0,
      reusedDeclarationCount: 0,
      tokenCount: 0,
      totalMs: 0
    };
    const collectParseMetrics = profileEnabled
      ? (metrics: ParsePerformanceMetrics): void => {
        parseTotals.lexicalMs += metrics.lexicalMs;
        parseTotals.syntaxMs += metrics.syntaxMs;
        parseTotals.symbolCatalogMs += metrics.symbolCatalogMs;
        parseTotals.dependencyResolutionMs += metrics.dependencyResolutionMs;
        parseTotals.typeResolutionMs += metrics.typeResolutionMs;
        parseTotals.globalVariableResolutionMs += metrics.globalVariableResolutionMs;
        parseTotals.routineResolutionMs += metrics.routineResolutionMs;
        parseTotals.routineVerificationMs +=
          metrics.routineVerificationMs ?? 0;
        parseTotals.reusedDeclarationCount += metrics.reusedDeclarationCount;
        parseTotals.tokenCount += metrics.tokenCount;
        parseTotals.totalMs += metrics.totalMs;
      }
      : undefined;
    const collectDocumentParseMetrics = (
      uri: string,
      source: string,
      pass: 'base' | 'contextual'
    ) => profileEnabled
      ? (metrics: ParsePerformanceMetrics): void => {
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
    const groups = new Map<string, {
      uri: string;
      document: TextDocument;
      source: string;
      analysis: SourceAnalysisCacheEntry;
    }[]>();
    const activeUris = new Set<string>();

    for (const [uri, { document, directory }] of sourceDocuments) {
      const source = document.getText();
      activeUris.add(uri);
      let analysis = sourceAnalysisCache.get(uri);
      if (analysis && analysis.source === source) {
        analysis.version = document.version;
        sourceCacheHits++;
      } else {
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

    const result = new Map<string, { document: TextDocument; parsed: ParsedDocument }>();
    let baseParseCount = 0;
    let baseParseCacheHits = 0;
    let contextualParseCount = 0;
    let contextualCacheHits = 0;
    let selectiveContextCacheHits = 0;
    let catalogAssemblyMs = 0;
    for (const group of groups.values()) {
      const catalogKey = group
        .map(entry => `${entry.uri}:${entry.analysis.revision}`)
        .join('|');
      if (group.every(entry =>
        entry.analysis.catalogKey === catalogKey && entry.analysis.parsed
      )) {
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
        } else {
          const previousIndex = previousWorkspaceDocumentIndex;
          const previousDocument = previousIndex?.get(entry.uri);
          const previousSource = previousIndex
            ? workspaceDocumentSources.get(previousIndex)?.get(entry.uri)
            : undefined;
          parsed = parseTypeDeclarations(
            entry.source,
            undefined,
            collectDocumentParseMetrics(entry.uri, entry.source, 'base'),
            previousDocument && previousSource !== undefined
              ? {
                reusableDeclarationRegions: {
                  source: previousSource,
                  parsed: previousDocument.parsed
                }
              }
              : undefined
          );
          entry.analysis.baseParsed = parsed;
          baseParseCount++;
        }
        return { entry, parsed };
      });
      // Local declarations are prepended by the parser, so their precedence is unchanged.
      const catalogStartedAt = profileEnabled ? performance.now() : 0;
      const catalog: ParserSymbolCatalog = {
        declarations: baseParses.flatMap(entry => entry.parsed.declarations),
        globalVariables: baseParses.flatMap(entry => entry.parsed.globalVariables),
        routines: baseParses.flatMap(entry => entry.parsed.routines)
      };
      if (profileEnabled) {
        catalogAssemblyMs += performance.now() - catalogStartedAt;
      }
      const directory = dirname(fileURLToPath(group[0].uri));
      const reusableRoutineSnapshots = incrementalRoutineResolutionEnabled
        ? getReusableRoutineRegionSnapshots(
          directory,
          baseParses.map(({ entry, parsed }) => ({
            uri: entry.uri,
            source: entry.source,
            parsed
          })),
          previousWorkspaceDocumentIndex,
          previousWorkspaceDocumentIndex
            ? workspaceDocumentSources.get(previousWorkspaceDocumentIndex)
            : undefined
        )
        : new Map<
          string,
          { source: string; routines: readonly RoutineDeclaration[] }
        >();
      if (profileEnabled) {
        logProfile({
          event: 'workspace-region-checkpoints',
          requestId,
          requestDocumentUri,
          directory,
          incrementalRoutineResolutionEnabled,
          eligibleDocuments: reusableRoutineSnapshots.size,
          eligibleRoutines: [...reusableRoutineSnapshots.values()].reduce(
            (total, snapshot) => total + snapshot.routines.length,
            0
          )
        });
      }
      const selectiveReusableUris = getSelectiveContextReuseUris(
        directory,
        baseParses.map(({ entry, parsed }) => ({
          ...entry,
          parsed
        })),
        previousWorkspaceDocumentIndex,
        previousWorkspaceDocumentIndex
          ? workspaceDocumentSources.get(previousWorkspaceDocumentIndex)
          : undefined,
        requestId,
        requestDocumentUri
      );
      for (const { entry } of baseParses) {
        if (
          selectiveReusableUris?.has(entry.uri) &&
          entry.analysis.parsed
        ) {
          entry.analysis.catalogKey = catalogKey;
          result.set(entry.uri, {
            document: entry.document,
            parsed: entry.analysis.parsed
          });
          contextualCacheHits++;
          selectiveContextCacheHits++;
          continue;
        }
        contextualParseCount++;
        const localRoutineDeclarations = new Set(
          entry.analysis.baseParsed?.routines ?? []
        );
        const contextualCatalog: ParserSymbolCatalog = {
          ...catalog,
          routines: catalog.routines.filter(routine =>
            !localRoutineDeclarations.has(routine)
          )
        };
        const parsed = parseTypeDeclarations(
          entry.source,
          contextualCatalog,
          collectDocumentParseMetrics(entry.uri, entry.source, 'contextual'),
          {
            reusableRoutineRegions: incrementalRoutineResolutionEnabled
              ? reusableRoutineSnapshots.get(entry.uri)
              : undefined,
            incrementalRoutineResolution:
              incrementalRoutineResolutionEnabled,
            verifyIncrementalRoutineResolution,
            onIncrementalVerification: verifyIncrementalRoutineResolution
              ? matched => {
                if (!matched) {
                  connection.console.warn(
                    `Incremental routine verification failed for ${entry.uri}; using complete parse.`
                  );
                }
              }
              : undefined
          }
        );
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
        endTimeMs: performance.now(),
        refreshMs: performance.now() - startedAt,
        sourceDiscoveryMs,
        catalogAssemblyMs,
        documents: result.size,
        sourceCodeUnits: [...sourceDocuments.values()].reduce(
          (total, entry) => total + entry.document.getText().length,
          0
        ),
        sourceBytes: [...sourceByteLengths.values()].reduce(
          (total, length) => total + length,
          0
        ),
        sourceChanges,
        sourceCacheHits,
        baseParseCount,
        baseParseCacheHits,
        contextualParseCount,
        contextualCacheHits,
        selectiveContextCacheHits,
        declarations: [...result.values()].reduce(
          (total, entry) => total + entry.parsed.declarations.length,
          0
        ),
        globalVariables: [...result.values()].reduce(
          (total, entry) => total + entry.parsed.globalVariables.length,
          0
        ),
        routines: [...result.values()].reduce(
          (total, entry) => total + entry.parsed.routines.length,
          0
        ),
        symbols: [...result.values()].reduce(
          (total, entry) => total +
            entry.parsed.symbols.entries.length +
            entry.parsed.globalVariableSymbols.entries.length +
            entry.parsed.routineSymbols.entries.length,
          0
        ),
        ...parseTotals
      });
    }
    if (revision !== workspaceRevision) {
      continue;
    }
    workspaceDocumentIndex = result;
    workspaceDocumentSources.set(
      result,
      new Map(
        [...result].map(([uri, entry]) => [uri, entry.document.getText()])
      )
    );
    previousWorkspaceDocumentIndex = undefined;
    workspaceDirectorySnapshots = directorySnapshots;
    return result;
  }
}

documents.listen(connection);
connection.listen();
