const fs = require('node:fs');
const path = require('node:path');
const { performance } = require('node:perf_hooks');
const { pathToFileURL } = require('node:url');
const { TextDocument } = require('vscode-languageserver-textdocument');
const {
  getDocumentAnalysis,
  WorkspaceAnalysisIndex
} = require('../out/analysisModel.js');
const {
  buildDocumentSymbols
} = require('../out/documentSymbols.js');
const {
  parseTypeDeclarations
} = require('../out/typeParser.js');

const fileNames = ['Tipos.pop', 'VariaveisGlobais.pop', 'rotinas.pop'];
const directory = process.argv[2];
const selectedFileNames = process.argv.slice(3);

if (!directory) {
  throw new Error(
    'Usage: node server/benchmark/profile-real-files.js <workspace-directory> [file ...]'
  );
}

for (const fileName of selectedFileNames) {
  if (!fileNames.includes(fileName)) {
    throw new Error(`Unsupported profile file: ${fileName}`);
  }
}

const files = selectedFileNames.length > 0 ? selectedFileNames : fileNames;
const decoder = new TextDecoder('windows-1252');
const workspaceDocuments = [];
const sourceDocuments = files.map(fileName => {
  const filePath = path.join(directory, fileName);
  const bytes = fs.readFileSync(filePath);
  return {
    fileName,
    filePath,
    bytes,
    source: decoder.decode(bytes)
  };
});

const baseParses = sourceDocuments.map(entry => {
  const heapBeforeParseBytes = process.memoryUsage().heapUsed;
  let parserMetrics;
  const parseStartedAt = performance.now();
  const parsed = parseTypeDeclarations(
    entry.source,
    undefined,
    metrics => { parserMetrics = metrics; }
  );
  const memoryAfterBaseParse = process.memoryUsage();
  return {
    ...entry,
    parsed,
    parserMetrics,
    heapBeforeParseBytes,
    heapAfterBaseParseBytes: memoryAfterBaseParse.heapUsed,
    parseDurationMs: performance.now() - parseStartedAt
  };
});

const catalog = {
  declarations: baseParses.flatMap(entry => entry.parsed.declarations),
  globalVariables: baseParses.flatMap(entry => entry.parsed.globalVariables),
  routines: baseParses.flatMap(entry => entry.parsed.routines)
};

for (const entry of baseParses) {
  let contextualParserMetrics;
  const contextualParseStartedAt = performance.now();
  const localRoutineDeclarations = new Set(entry.parsed.routines);
  const contextualCatalog = {
    ...catalog,
    routines: catalog.routines.filter(routine =>
      !localRoutineDeclarations.has(routine)
    )
  };
  const parsed = parseTypeDeclarations(
    entry.source,
    contextualCatalog,
    metrics => { contextualParserMetrics = metrics; }
  );
  const contextualParseDurationMs =
    performance.now() - contextualParseStartedAt;
  const memoryAfterParse = process.memoryUsage();
  let analysisMetrics;
  const analysisStartedAt = performance.now();
  const analysis = getDocumentAnalysis(
    parsed,
    entry.source.length,
    metrics => { analysisMetrics = metrics; }
  );
  const analysisDurationMs = performance.now() - analysisStartedAt;
  const memoryAfterAnalysis = process.memoryUsage();
  const uri = pathToFileURL(entry.filePath).toString();
  const textDocument = TextDocument.create(
    uri,
    'portugues-puro',
    1,
    entry.source
  );
  const heapBeforeSymbolsBytes = process.memoryUsage().heapUsed;
  const symbolsStartedAt = performance.now();
  const { symbols, metrics: symbolMetrics } = buildDocumentSymbols(
    parsed,
    textDocument,
    analysis,
    true
  );
  const documentSymbolsDurationMs = performance.now() - symbolsStartedAt;
  const memoryAfterSymbols = process.memoryUsage();
  workspaceDocuments.push({
    uri,
    directory: path.resolve(directory),
    analysis
  });

  console.log(JSON.stringify({
    file: entry.fileName,
    bytes: entry.bytes.length,
    codeUnits: entry.source.length,
    baseParseDurationMs: entry.parseDurationMs,
    baseParsePhases: entry.parserMetrics.phases,
    contextualParseDurationMs,
    contextualParsePhases: contextualParserMetrics.phases,
    totalParseDurationMs:
      entry.parseDurationMs + contextualParseDurationMs,
    routineStatementsVisited:
      contextualParserMetrics.routineStatementsVisited,
    routineNameMatchSearches:
      contextualParserMetrics.routineNameMatchSearches,
    routineNameSpanChecks:
      contextualParserMetrics.routineNameSpanChecks,
    routineNameCandidateChecks:
      contextualParserMetrics.routineNameCandidateChecks,
    routineNameNormalizationCalls:
      contextualParserMetrics.routineNameNormalizationCalls,
    routineNameNormalizationCacheHits:
      contextualParserMetrics.routineNameNormalizationCacheHits,
    routineNameNormalizationCacheMisses:
      contextualParserMetrics.routineNameNormalizationCacheMisses,
    declarations: parsed.declarations.length,
    globalVariables: parsed.globalVariables.length,
    routines: parsed.routines.length,
    analysisDurationMs,
    analysisMetrics,
    analysisCacheHit: analysisMetrics.cacheHit,
    references: analysis.references.length,
    syntaxNodes: analysis.nodes.size,
    documentSymbolsDurationMs,
    topLevelDocumentSymbols: symbolMetrics.symbols,
    documentSymbols: symbolMetrics.documentSymbolNodes,
    documentSymbolMetrics: symbolMetrics,
    heapUsedBeforeParseBytes: entry.heapBeforeParseBytes,
    heapUsedAfterBaseParseBytes: entry.heapAfterBaseParseBytes,
    heapUsedAfterContextualParseBytes: memoryAfterParse.heapUsed,
    rssAfterContextualParseBytes: memoryAfterParse.rss,
    heapDeltaAnalysisBytes:
      memoryAfterAnalysis.heapUsed - memoryAfterParse.heapUsed,
    heapDeltaDocumentSymbolsBytes:
      memoryAfterSymbols.heapUsed - heapBeforeSymbolsBytes
  }));
}

const heapBeforeWorkspaceIndexBytes = process.memoryUsage().heapUsed;
const workspaceIndexStartedAt = performance.now();
const workspaceIndex = new WorkspaceAnalysisIndex(workspaceDocuments);
console.log(JSON.stringify({
  event: 'workspace-reference-index',
  durationMs: performance.now() - workspaceIndexStartedAt,
  documents: workspaceIndex.documentCount,
  references: workspaceIndex.referenceCount,
  dependencyEdges: workspaceIndex.dependencyCount,
  heapDeltaBytes:
    process.memoryUsage().heapUsed - heapBeforeWorkspaceIndexBytes
}));
