const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { TextDocument } = require('vscode-languageserver-textdocument');
const {
  DeclarationDependencyGraph,
  getDocumentAnalysis,
  getWorkspaceDuplicateDeclarations,
  WorkspaceAnalysisIndex
} = require('../out/analysisModel.js');
const {
  getParsedReferences,
  getParserRegionKey,
  findTypeDeclarationBaseAtOffset,
  parseTypeDeclarationRegion,
  parseTypeDeclarationSyntax,
  parseTypeDeclarations,
  resolveRoutineSyntaxRegions,
  resolveTypeDeclarationSyntax
} = require('../out/typeParser.js');

const directory = 'file:///project';

function createWorkspace(sources) {
  const base = sources.map(source => parseTypeDeclarations(source.text));
  const catalog = {
    declarations: base.flatMap(parsed => parsed.declarations),
    globalVariables: base.flatMap(parsed => parsed.globalVariables),
    routines: base.flatMap(parsed => parsed.routines)
  };
  const documents = sources.map(source => {
    const parsed = parseTypeDeclarations(source.text, catalog);
    const uri = `${directory}/${source.name}`;
    const document = TextDocument.create(
      uri,
      'portugues-puro',
      1,
      source.text
    );
    return {
      uri,
      directory,
      document,
      parsed,
      analysis: getDocumentAnalysis(parsed, source.text.length)
    };
  });
  return {
    documents,
    index: new WorkspaceAnalysisIndex(documents)
  };
}

test('builds a position-preserving syntax tree and shared symbol index', () => {
  const source = [
    'Um caractere é um byte.',
    'Uma pessoa é uma estrutura com um byte denominado idade.',
    'O usuário é uma pessoa.',
    'para que se conte usando um caractere denominado letra:',
    '  Retorne.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const analysis = getDocumentAnalysis(parsed, source.length);

  assert.equal(analysis.root.kind, 'document');
  assert.ok(analysis.nodes.size > parsed.declarations.length);
  assert.ok(analysis.scopes.has('document'));
  for (const node of analysis.nodes.values()) {
    assert.ok(node.range.start >= 0);
    assert.ok(node.range.end <= source.length);
    if (node.parentId !== undefined) {
      const parent = analysis.nodes.get(node.parentId);
      assert.ok(parent);
      assert.ok(parent.childIds.includes(node.id));
      assert.ok(parent.range.start <= node.range.start);
      assert.ok(parent.range.end >= node.range.end);
    }
  }
  assert.equal(getDocumentAnalysis(parsed, source.length), analysis);
});

test('resolves cross-file routine parameter types from the workspace catalog', () => {
  const typeSource = [
    'Um ponteiro é uma estrutura com 4 bytes.',
    'Um caractere inicial é um ponteiro para um byte.',
    'Um caractere final é um ponteiro para um byte.',
    'Uma string é uma estrutura com',
    '  Um caractere inicial e',
    '  Um caractere final.',
    'Uma quantidade de bytes é uma contagem.',
    'Uma contagem é um número.',
    'Uma quantidade de caracteres é uns twips.',
    'Um twip é um número.',
    'Um número é uma estrutura.'
  ].join('\n');
  const routineSource = [
    'Função para que se atribua a quantidade de caracteres duma string para uma quantidade de caracteres:',
    '  Retorne.',
    'para que se reaponte um ponteiro usando uma quantidade de bytes:',
    '  Retorne.'
  ].join('\n');
  const callerSource = [
    'para que se acrescente um byte no final de uma string:',
    '  Reaponte o caractere inicial desta string usando a quantidade de caracteres desta string mais 1.'
  ].join('\n');
  const baseParseOptions = {
    resolveRoutineCalls: false,
    resolveRoutineParameterTypes: false
  };
  const base = [
    parseTypeDeclarations(typeSource, undefined, undefined, baseParseOptions),
    parseTypeDeclarations(routineSource, undefined, undefined, baseParseOptions)
  ];
  const catalog = {
    declarations: base.flatMap(parsed => parsed.declarations),
    globalVariables: base.flatMap(parsed => parsed.globalVariables),
    routines: base.flatMap(parsed => parsed.routines)
  };
  const parsed = parseTypeDeclarations(callerSource, catalog);
  const reponte = parsed.routines[0].calls[0].target;

  assert.deepEqual(parsed.diagnostics, []);
  assert.ok(reponte);
  assert.equal(reponte.name.normalizedName, 'reaponte');
});

test('preserves the full symbol catalog for large comment-free documents', () => {
  const alphabeticName = index => {
    let name = '';
    do {
      name = String.fromCharCode(97 + index % 26) + name;
      index = Math.floor(index / 26) - 1;
    } while (index >= 0);
    return name;
  };
  const count = 1200;
  const source = Array.from(
    { length: count },
    (_, index) => `Uma pessoa tipo${alphabeticName(index)} é uma estrutura.`
  ).join('\n');
  const parsed = parseTypeDeclarations(source);

  assert.equal(parsed.declarations.length, count);
  assert.equal(parsed.symbols.entries.length, count + 2);
  assert.deepEqual(parsed.diagnostics, []);
  assert.equal(parsed.declarations[0].name.name, 'pessoa tipoa');
  assert.equal(
    parsed.declarations.at(-1).name.name,
    `pessoa tipo${alphabeticName(count - 1)}`
  );

  const withComment = parseTypeDeclarations(
    'Uma pessoa é uma estrutura. [ comentário ]\nO valor é uma pessoa.'
  );
  assert.equal(withComment.declarations.length, 1);
  assert.equal(withComment.globalVariables.length, 1);
  assert.deepEqual(withComment.diagnostics, []);
});

test('records region boundaries and reuses unchanged routine checkpoints', () => {
  const source = [
    'Uma pessoa é uma estrutura.',
    'A pessoa é uma pessoa.',
    'Rotina para que se primeira:',
    '  Segunda.',
    '  Retorne.',
    'Rotina para que se segunda:',
    '  Retorne.',
    'Rotina para que se terceira:',
    '  Retorne.'
  ].join('\n');
  const previous = parseTypeDeclarations(source);
  assert.deepEqual(previous.diagnostics, []);
  assert.deepEqual(
    previous.regions.map(region => region.kind),
    ['type', 'global-variable', 'routine', 'routine', 'routine']
  );
  for (const region of previous.regions) {
    assert.ok(region.range.start <= region.range.end);
    assert.equal(
      source.slice(region.range.start, region.range.end).length,
      region.range.end - region.range.start
    );
    if (region.kind === 'routine') {
      assert.ok(region.headerRange);
      assert.ok(region.bodyRange);
      assert.equal(region.headerRange.end, region.bodyRange.start);
      assert.equal(region.range.end, region.bodyRange.end);
    }
  }

  const updatedSource = source.replace(
    'Rotina para que se segunda:\n  Retorne.',
    'Rotina para que se segunda:\n  Pare.'
  );
  const metrics = {};
  const incrementallyParsed = parseTypeDeclarations(
    updatedSource,
    undefined,
    value => Object.assign(metrics, value),
    {
      reusableRoutineRegions: {
        source,
        routines: previous.routines,
        allRoutines: previous.routines
      }
    }
  );
  const fullyParsed = parseTypeDeclarations(updatedSource);

  assert.equal(metrics.reusedRoutineCount, 2);
  assert.notEqual(incrementallyParsed.routines[0], previous.routines[0]);
  assert.notEqual(incrementallyParsed.routines[1], previous.routines[1]);
  assert.notEqual(incrementallyParsed.routines[2], previous.routines[2]);
  assert.deepEqual(
    incrementallyParsed.routines[0].range,
    fullyParsed.routines[0].range
  );
  assert.equal(
    incrementallyParsed.routines[0].calls[0].target,
    incrementallyParsed.routines[1]
  );
  assert.deepEqual(incrementallyParsed.diagnostics, fullyParsed.diagnostics);
  assert.deepEqual(incrementallyParsed.regions, fullyParsed.regions);
  assert.deepEqual(
    getParsedReferences(incrementallyParsed),
    getParsedReferences(fullyParsed)
  );
  const incrementalNodes = [
    ...getDocumentAnalysis(incrementallyParsed, updatedSource.length).nodes.values()
  ].map(node => [node.kind, node.range, node.symbolId]);
  const fullNodes = [
    ...getDocumentAnalysis(fullyParsed, updatedSource.length).nodes.values()
  ].map(node => [node.kind, node.range, node.symbolId]);
  assert.deepEqual(incrementalNodes, fullNodes);

  const shiftedSource = `\n${source}`;
  const shiftedMetrics = {};
  const shifted = parseTypeDeclarations(
    shiftedSource,
    undefined,
    value => Object.assign(shiftedMetrics, value),
    {
      reusableRoutineRegions: {
        source,
        routines: previous.routines,
        allRoutines: previous.routines
      }
    }
  );
  assert.equal(shiftedMetrics.reusedRoutineCount, previous.routines.length);
  assert.deepEqual(
    shifted.regions,
    parseTypeDeclarations(shiftedSource).regions
  );
  assert.deepEqual(
    getParsedReferences(shifted),
    getParsedReferences(parseTypeDeclarations(shiftedSource))
  );
  const shiftedNodes = [
    ...getDocumentAnalysis(shifted, shiftedSource.length).nodes.values()
  ].map(node => [node.kind, node.range, node.symbolId]);
  const fullShiftedNodes = [
    ...getDocumentAnalysis(
      parseTypeDeclarations(shiftedSource),
      shiftedSource.length
    ).nodes.values()
  ].map(node => [node.kind, node.range, node.symbolId]);
  assert.deepEqual(shiftedNodes, fullShiftedNodes);

  const separatorEdit = source.replace(
    '  Retorne.\nRotina para que se segunda:',
    '  Retorne.\n\nRotina para que se segunda:'
  );
  const separatorMetrics = {};
  const separatorParsed = parseTypeDeclarations(
    separatorEdit,
    undefined,
    value => Object.assign(separatorMetrics, value),
    {
      reusableRoutineRegions: {
        source,
        routines: previous.routines,
        allRoutines: previous.routines
      }
    }
  );
  const fullSeparatorParsed = parseTypeDeclarations(separatorEdit);
  assert.equal(separatorMetrics.reusedRoutineCount, previous.routines.length);
  assert.deepEqual(separatorParsed.regions, fullSeparatorParsed.regions);
  assert.deepEqual(
    [...getDocumentAnalysis(separatorParsed, separatorEdit.length).nodes.values()]
      .map(node => [node.kind, node.range, node.symbolId]),
    [...getDocumentAnalysis(fullSeparatorParsed, separatorEdit.length).nodes.values()]
      .map(node => [node.kind, node.range, node.symbolId])
  );
});

test('resolves only declaration regions outside the dependency closure', () => {
  const uri = `${directory}/types.pop`;
  const source = [
    'Uma pessoa é uma estrutura.',
    'Um cliente é uma pessoa.',
    'Uma palavra é um byte.'
  ].join('\n');
  const previous = parseTypeDeclarations(source);
  const graph = new DeclarationDependencyGraph([{
    uri,
    directory,
    parsed: previous,
    analysis: getDocumentAnalysis(previous, source.length)
  }]);
  const pessoaRegion = graph.getRegions(uri).find(region =>
    region.region.kind === 'type' && region.region.name === 'pessoa'
  );
  const clienteRegion = graph.getRegions(uri).find(region =>
    region.region.kind === 'type' && region.region.name === 'cliente'
  );
  const palavraRegion = graph.getRegions(uri).find(region =>
    region.region.kind === 'type' && region.region.name === 'palavra'
  );
  assert.ok(pessoaRegion);
  assert.ok(clienteRegion);
  assert.ok(palavraRegion);
  const affected = graph.getAffectedRegionsForDeclarationChanges(
    directory,
    [{ kind: 'type', normalizedName: 'pessoa' }],
    [pessoaRegion.id]
  );
  assert.ok(affected.has(pessoaRegion.id));
  assert.ok(affected.has(clienteRegion.id));
  assert.equal(affected.has(palavraRegion.id), false);

  const updatedSource = source.replace(
    'Uma pessoa é uma estrutura.',
    'Uma pessoa é um byte.'
  );
  const syntax = parseTypeDeclarationSyntax(updatedSource);
  const reusableRegionKeys = new Set(
    syntax.regions
      .filter(region => region.kind === 'type' && region.name === 'palavra')
      .map(region => getParserRegionKey(region))
  );
  const metrics = {};
  const incremental = parseTypeDeclarations(
    updatedSource,
    undefined,
    value => Object.assign(metrics, value),
    {
      reusableSemanticRegions: {
        source,
        parsed: previous,
        regionKeys: reusableRegionKeys
      }
    }
  );
  const complete = parseTypeDeclarations(updatedSource);
  assert.equal(metrics.reusedSemanticRegionCount, 1);
  assert.equal(metrics.declarationResolutionStrategy, 'worklist');
  assert.deepEqual(incremental.declarations, complete.declarations);
  assert.deepEqual(incremental.diagnostics, complete.diagnostics);
  assert.deepEqual(getParsedReferences(incremental), getParsedReferences(complete));
  assert.deepEqual(
    incremental.symbols.entries.map(symbol => [
      symbol.normalizedName,
      symbol.kind,
      symbol.scale,
      symbol.isScalar
    ]),
    complete.symbols.entries.map(symbol => [
      symbol.normalizedName,
      symbol.kind,
      symbol.scale,
      symbol.isScalar
    ])
  );
});

test('verifies routine worklists and falls back when a reused snapshot differs', () => {
  const source = [
    'Rotina para que se primeira:',
    '  Retorne.'
  ].join('\n');
  const previous = parseTypeDeclarations(source);
  const defaultMetrics = {};
  parseTypeDeclarations(
    source,
    undefined,
    value => Object.assign(defaultMetrics, value)
  );
  assert.equal(defaultMetrics.routineResolutionStrategy, 'complete');
  const noReuseMetrics = {};
  const noReuse = parseTypeDeclarations(
    source,
    undefined,
    value => Object.assign(noReuseMetrics, value),
    {
      incrementalRoutineResolution: true,
      verifyIncrementalRoutineResolution: true,
      onIncrementalVerification: () => {
        throw new Error('Verification should be skipped when nothing is reused.');
      }
    }
  );
  assert.equal(noReuseMetrics.routineResolutionStrategy, 'complete');
  assert.equal(noReuseMetrics.routineVerificationStatus, 'not-requested');
  assert.deepEqual(noReuse.diagnostics, previous.diagnostics);
  const metrics = {};
  const verificationResults = [];
  const incrementalOptions = {
    incrementalRoutineResolution: true,
    verifyIncrementalRoutineResolution: true,
    onIncrementalVerification: matched => verificationResults.push(matched),
    reusableRoutineRegions: {
      source,
      routines: previous.routines,
      allRoutines: previous.routines
    }
  };
  const verified = parseTypeDeclarations(
    source,
    undefined,
    value => Object.assign(metrics, value),
    incrementalOptions
  );
  const complete = parseTypeDeclarations(source);

  assert.equal(metrics.routineResolutionStrategy, 'worklist');
  assert.equal(metrics.declarationResolutionStrategy, 'complete');
  assert.equal(metrics.routineVerificationStatus, 'matched');
  assert.equal(metrics.reusedRoutineCount, 1);
  assert.deepEqual(verificationResults, [true]);
  assert.deepEqual(verified.routines, complete.routines);
  assert.deepEqual(verified.diagnostics, complete.diagnostics);
  assert.deepEqual(getParsedReferences(verified), getParsedReferences(complete));

  previous.routines[0].isCompatible = !previous.routines[0].isCompatible;
  const fallbackMetrics = {};
  const fallback = parseTypeDeclarations(
    source,
    undefined,
    value => Object.assign(fallbackMetrics, value),
    incrementalOptions
  );
  assert.equal(fallbackMetrics.routineVerificationStatus, 'fallback');
  assert.deepEqual(verificationResults, [true, false]);
  assert.deepEqual(fallback.routines, complete.routines);
  assert.deepEqual(fallback.diagnostics, complete.diagnostics);
  assert.deepEqual(getParsedReferences(fallback), getParsedReferences(complete));
});

test('preserves external routine target ranges when rebasing reused routines', () => {
  const librarySource = [
    ' '.repeat(60),
    'Rotina para que se alvo:',
    '  Retorne.'
  ].join('\n');
  const library = parseTypeDeclarations(librarySource);
  const workspaceSymbols = {
    declarations: [],
    globalVariables: [],
    routines: library.routines
  };
  const source = [
    'Rotina para que se edite:',
    '  Retorne.',
    'Rotina para que se chamadora:',
    '  Alvo.',
    '  Retorne.'
  ].join('\n');
  const previous = parseTypeDeclarations(source, workspaceSymbols);
  const previousTargetRange = previous.routines[1].calls[0].target.range;
  assert.ok(
    previousTargetRange.start >= previous.routines[1].range.start &&
    previousTargetRange.end <= previous.routines[1].bodyRange.end
  );
  const shiftedSource = `\n${source}`;
  const metrics = {};
  const incremental = parseTypeDeclarations(
    shiftedSource,
    workspaceSymbols,
    value => Object.assign(metrics, value),
    {
      incrementalRoutineResolution: true,
      verifyIncrementalRoutineResolution: true,
      reusableRoutineRegions: {
        source,
        routines: previous.routines,
        allRoutines: previous.routines
      }
    }
  );
  const complete = parseTypeDeclarations(shiftedSource, workspaceSymbols);

  assert.equal(metrics.routineVerificationStatus, 'matched');
  assert.equal(metrics.reusedRoutineCount, 2);
  assert.deepEqual(incremental.routines, complete.routines);
  assert.deepEqual(incremental.diagnostics, complete.diagnostics);
  assert.deepEqual(getParsedReferences(incremental), getParsedReferences(complete));
  assert.deepEqual(
    incremental.routines[1].calls[0].target.range,
    previousTargetRange
  );
});

test('rebinds cached calls to routines that are not eligible for reuse', () => {
  const source = [
    'Rotina para que se edite:',
    '  Retorne.',
    'Rotina para que se alvo:',
    '  Inexistente.',
    'Rotina para que se chamadora:',
    '  Alvo.',
    '  Retorne.'
  ].join('\n');
  const previous = parseTypeDeclarations(source);
  const reusableRoutines = previous.routines.filter(routine => {
    const region = previous.regions.find(candidate =>
      candidate.kind === 'routine' &&
      candidate.range.start === routine.range.start &&
      candidate.range.end === routine.bodyRange.end
    );
    return region?.complete;
  });
  assert.equal(reusableRoutines.length, 2);
  const shiftedSource = `\n${source}`;
  const metrics = {};
  const incremental = parseTypeDeclarations(
    shiftedSource,
    undefined,
    value => Object.assign(metrics, value),
    {
      incrementalRoutineResolution: true,
      verifyIncrementalRoutineResolution: true,
      reusableRoutineRegions: {
        source,
        routines: reusableRoutines,
        allRoutines: previous.routines
      }
    }
  );
  const complete = parseTypeDeclarations(shiftedSource);

  assert.equal(metrics.routineVerificationStatus, 'matched');
  assert.equal(metrics.reusedRoutineCount, 2);
  assert.deepEqual(incremental.routines, complete.routines);
  assert.deepEqual(incremental.diagnostics, complete.diagnostics);
  assert.deepEqual(getParsedReferences(incremental), getParsedReferences(complete));
  assert.equal(
    incremental.routines[2].calls[0].target,
    incremental.routines[1]
  );
});

test('marks only lexically and syntactically complete regions as reusable', () => {
  const source = [
    'Uma pessoa é uma estrutura.',
    'O valor é uma pessoa.',
    'Rotina para que se consulte:',
    '  Retorne.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  assert.equal(parsed.regions.length, 3);
  for (const region of parsed.regions) {
    assert.equal(region.complete, true);
    assert.match(region.fingerprint, new RegExp(`^${region.kind}:`));
  }

  const changedSource = source.replace(
    'Uma pessoa é uma estrutura.',
    'Uma pessoa é um byte.'
  );
  const changed = parseTypeDeclarations(changedSource);
  assert.notEqual(
    parsed.regions[0].fingerprint,
    changed.regions[0].fingerprint
  );
  assert.deepEqual(
    parsed.regions.map(region => region.fingerprint),
    parseTypeDeclarations(source).regions.map(region => region.fingerprint)
  );

  const unclosedComment = parseTypeDeclarations(
    `${source}\n[ comentário aberto`
  );
  assert.ok(unclosedComment.regions.every(region => !region.complete));

  const incompleteRoutine = parseTypeDeclarations([
    'Rotina para que se consulte:',
    '  Retorne'
  ].join('\n'));
  assert.equal(incompleteRoutine.regions[0].complete, false);
});

test('keeps trailing predicate phrases significant in alternate routine headers', () => {
  const parsed = parseTypeDeclarations([
    'Um número é uma estrutura.',
    'Rotina para que se arredonde um número para cima usando a potência imediata de dois;',
    'Rotina para que se arredonde um número para cima usando a próxima potência de dois;',
    'Rotina para que se arredonde um número para cima usando a potência de dois:',
    '  Retorne.'
  ].join('\n'));

  assert.equal(parsed.diagnostics.filter(diagnostic =>
    diagnostic.message.includes('semantically equivalent')
  ).length, 0);
});

test('navigates derived type names to their base type declaration', () => {
  const { documents, index } = createWorkspace([
    {
      name: 'Tipos.pop',
      text: [
        'Uma cor é uma estrutura.',
        'Uma cor bem clara é uma cor.'
      ].join('\n')
    },
    {
      name: 'Rotinas.pop',
      text: [
        'Rotina para que se escolha aleatoriamente uma cor bem clara:',
        '  Retorne.'
      ].join('\n')
    }
  ]);
  const typeDocument = documents.find(document =>
    document.uri.endsWith('/Tipos.pop')
  );
  const derivedType = typeDocument.parsed.declarations.find(declaration =>
    declaration.name.normalizedName === 'cor bem clara'
  );
  const offset = derivedType.name.range.start + 2;
  const baseType = findTypeDeclarationBaseAtOffset(typeDocument.parsed, offset);
  const definition = index.getTypeDeclaration(
    directory,
    baseType.normalizedName
  );

  assert.equal(baseType.name, 'cor');
  assert.equal(definition?.uri, typeDocument.uri);
  assert.equal(definition?.reference.name, 'cor');
});

test('exposes declaration syntax before semantic resolution', () => {
  const source = [
    'Uma pessoa é um tipo ausente.',
    'Rotina para que se consulte:',
    '  Retorne.'
  ].join('\n');
  const syntax = parseTypeDeclarationSyntax(source, {}, true);
  const parsed = parseTypeDeclarations(source);
  const syntaxSnapshot = JSON.stringify({
    declarations: syntax.declarations,
    globalVariables: syntax.globalVariables,
    routines: syntax.routines,
    diagnostics: syntax.diagnostics
  });
  const unresolved = resolveTypeDeclarationSyntax(source, syntax);
  const externalType = parseTypeDeclarations(
    'Um tipo ausente é uma estrutura.'
  );
  const resolvedWithWorkspace = resolveTypeDeclarationSyntax(
    source,
    syntax,
    {
      declarations: externalType.declarations,
      globalVariables: [],
      routines: []
    }
  );

  assert.equal(syntax.source, source);
  assert.equal(syntax.parserSource.length, source.length);
  assert.deepEqual(syntax.diagnostics, []);
  assert.deepEqual(
    syntax.declarations.map(declaration => [
      declaration.name.normalizedName,
      declaration.range
    ]),
    parsed.declarations.map(declaration => [
      declaration.name.normalizedName,
      declaration.range
    ])
  );
  assert.deepEqual(
    syntax.routines.map(routine => [
      routine.name.normalizedName,
      routine.range,
      routine.bodyRange
    ]),
    parsed.routines.map(routine => [
      routine.name.normalizedName,
      routine.range,
      routine.bodyRange
    ])
  );
  assert.ok(parsed.diagnostics.some(diagnostic =>
    diagnostic.message === 'Unknown base type "tipo ausente".'
  ));
  assert.ok(unresolved.diagnostics.some(diagnostic =>
    diagnostic.message === 'Unknown base type "tipo ausente".'
  ));
  assert.equal(
    resolvedWithWorkspace.diagnostics.some(diagnostic =>
      diagnostic.message === 'Unknown base type "tipo ausente".'
    ),
    false
  );
  assert.equal(
    JSON.stringify({
      declarations: syntax.declarations,
      globalVariables: syntax.globalVariables,
      routines: syntax.routines,
      diagnostics: syntax.diagnostics
    }),
    syntaxSnapshot
  );
  assert.throws(
    () => resolveTypeDeclarationSyntax(`${source}\n`, syntax),
    /Syntax snapshot does not match the source document/u
  );
});

test('parses complete syntax regions from repository fixtures independently', () => {
  const fixtures = [
    path.join(__dirname, '../../client/testFixture/definition.pop'),
    path.join(__dirname, '../../client/testFixture/formatting.pop')
  ];
  let parsedRegionCount = 0;
  const profileSamples = [];

  for (const fixture of fixtures) {
    const source = readFileSync(fixture, 'utf8');
    const fullParse = parseTypeDeclarations(source);
    const syntaxSnapshot = parseTypeDeclarationSyntax(source);
    for (const region of fullParse.regions.filter(candidate =>
      candidate.syntacticallyComplete
    )) {
      const parsedRegion = parseTypeDeclarationRegion(
        source,
        region,
        metrics => profileSamples.push(metrics)
      );
      const expected = region.kind === 'type'
        ? syntaxSnapshot.declarations.find(declaration =>
          declaration.range.start === region.range.start &&
          declaration.range.end === region.range.end
        )
        : region.kind === 'global-variable'
          ? syntaxSnapshot.globalVariables.find(declaration =>
            declaration.range.start === region.range.start &&
            declaration.range.end === region.range.end
          )
          : syntaxSnapshot.routines.find(routine =>
            routine.range.start === region.range.start &&
            routine.bodyRange.end === region.range.end
          );
      assert.ok(expected, `${fixture}: region should match full parse`);
      assert.deepEqual(parsedRegion.declaration, expected);
      parsedRegionCount++;
    }

    const syntax = parseTypeDeclarationSyntax(source);
    const resolutionMetrics = {};
    const resolved = resolveTypeDeclarationSyntax(
      source,
      syntax,
      undefined,
      metrics => Object.assign(resolutionMetrics, metrics)
    );
    const semanticSnapshot = parsed => ({
      declarations: parsed.declarations,
      globalVariables: parsed.globalVariables,
      routines: parsed.routines,
      references: getParsedReferences(parsed),
      diagnostics: parsed.diagnostics
    });
    assert.deepEqual(
      semanticSnapshot(resolved),
      semanticSnapshot(fullParse),
      fixture.name
    );
    assert.ok(resolutionMetrics.totalMs >= resolutionMetrics.syntaxMs);
    assert.equal(
      resolutionMetrics.heapUsedBeforeBytes > 0,
      true
    );
    assert.equal(
      resolutionMetrics.sourceCodeUnits,
      source.length
    );
  }

  assert.ok(parsedRegionCount > 0);
  assert.equal(profileSamples.length, parsedRegionCount);
  assert.ok(profileSamples.every(sample =>
    sample.sourceCodeUnits > 0 &&
    sample.lexicalMs >= 0 &&
    sample.syntaxMs >= 0 &&
    sample.totalMs >= sample.lexicalMs + sample.syntaxMs
  ));
  const incompleteSource = 'Uma pessoa é um tipo ausente.';
  const semanticallyInvalid = parseTypeDeclarations(incompleteSource);
  const syntacticallyCompleteRegion = semanticallyInvalid.regions[0];
  assert.equal(syntacticallyCompleteRegion.syntacticallyComplete, true);
  assert.equal(syntacticallyCompleteRegion.complete, false);
  const parsedSemanticError = parseTypeDeclarationRegion(
    incompleteSource,
    syntacticallyCompleteRegion
  );
  assert.equal(parsedSemanticError.declaration.name.normalizedName, 'pessoa');

  const lexicallyIncompleteSource = `${incompleteSource}\n[ comentário aberto`;
  const syntacticallyIncompleteRegion =
    parseTypeDeclarations(lexicallyIncompleteSource).regions[0];
  assert.throws(
    () => parseTypeDeclarationRegion(
      lexicallyIncompleteSource,
      syntacticallyIncompleteRegion
    ),
    /Cannot parse a syntactically incomplete declaration region/u
  );
});

test('resolves selected routine regions equivalently to the full routine pass', () => {
  const fixtures = [
    {
      name: 'routine-worklist.pop',
      source: [
        'Uma pessoa é uma estrutura.',
        'Rotina para que se primeira:',
        '  Retorne.',
        'Rotina para que se segunda:',
        '  Retorne.'
      ].join('\n')
    },
    ...[
      path.join(__dirname, '../../client/testFixture/definition.pop'),
      path.join(__dirname, '../../client/testFixture/formatting.pop')
    ].map(fixture => ({
      name: fixture,
      source: readFileSync(fixture, 'utf8')
    }))
  ];
  let resolvedRoutineCount = 0;
  const profileSamples = [];

  for (const fixture of fixtures) {
    const { source } = fixture;
    const fullParse = parseTypeDeclarations(source);
    const syntax = parseTypeDeclarationSyntax(source);
    const routineRegions = syntax.regions.filter(region =>
      region.kind === 'routine' && region.syntacticallyComplete
    );
    for (const region of routineRegions) {
      const result = resolveRoutineSyntaxRegions(
        source,
        syntax,
        [region],
        undefined,
        metrics => profileSamples.push(metrics)
      );
      const expected = fullParse.routines.find(routine =>
        routine.range.start === region.range.start &&
        routine.bodyRange.end === region.range.end
      );
      assert.ok(expected, `${fixture.name}: routine region should match full parse`);
      assert.deepEqual(result.routines, [expected]);
      const expectedDiagnostics = fullParse.diagnostics.filter(diagnostic =>
        diagnostic.range.start >= region.range.start &&
        diagnostic.range.end <= region.range.end
      );
      assert.deepEqual(result.diagnostics, expectedDiagnostics);
      resolvedRoutineCount++;
    }
  }

  const batchSource = fixtures[0].source;
  const batchSyntax = parseTypeDeclarationSyntax(batchSource);
  const batchRegions = batchSyntax.regions.filter(region =>
    region.kind === 'routine' && region.syntacticallyComplete
  );
  const batchMetrics = {};
  const batch = resolveRoutineSyntaxRegions(
    batchSource,
    batchSyntax,
    batchRegions,
    undefined,
    metrics => Object.assign(batchMetrics, metrics)
  );
  const batchFullParse = parseTypeDeclarations(batchSource);
  assert.deepEqual(batch.routines, batchFullParse.routines);
  assert.deepEqual(batch.diagnostics, batchFullParse.diagnostics);
  assert.equal(batchMetrics.routineCount, batchRegions.length);
  assert.ok(batchMetrics.totalMs >= batchMetrics.symbolSetupMs);

  const librarySource = [
    'Um byte é um byte.',
    'Rotina para que se bar:',
    '  Retorne.'
  ].join('\n');
  const callerSource = [
    'Rotina para que se some um byte denominado valor:',
    '  Retorne.',
    'Rotina para que se teste:',
    '  Some 1.',
    '  Bar.',
    '  Retorne.'
  ].join('\n');
  const library = parseTypeDeclarations(librarySource);
  const workspaceSymbols = {
    declarations: library.declarations,
    globalVariables: library.globalVariables,
    routines: library.routines
  };
  const callerSyntax = parseTypeDeclarationSyntax(callerSource);
  const callerFullParse = parseTypeDeclarations(
    callerSource,
    workspaceSymbols
  );
  const callerRoutineRegions = callerSyntax.regions.filter(region =>
    region.kind === 'routine' && region.syntacticallyComplete
  );
  const callerWorklist = resolveRoutineSyntaxRegions(
    callerSource,
    callerSyntax,
    callerRoutineRegions,
    workspaceSymbols
  );
  assert.deepEqual(callerWorklist.routines, callerFullParse.routines);
  assert.deepEqual(
    callerWorklist.diagnostics,
    callerFullParse.diagnostics.filter(diagnostic =>
      callerRoutineRegions.some(region =>
        diagnostic.range.start >= region.range.start &&
        diagnostic.range.end <= region.range.end
      )
    )
  );

  assert.ok(resolvedRoutineCount > 0);
  assert.equal(profileSamples.length, resolvedRoutineCount);
  assert.ok(profileSamples.every(sample =>
    sample.routineCount === 1 &&
    sample.routineCandidates >= sample.routineCount &&
    sample.totalMs >= sample.symbolSetupMs
  ));
});

test('resolves a type magnitude used as a routine argument', () => {
  const source = [
    'Um número é uma estrutura.',
    'Rotina para que se adicione um número denominado parcela para um número denominado total:',
    '  Retorne.',
    'Rotina para que se faça algo com um número:',
    '  Adicione a magnitude dum byte para o número.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const caller = parsed.routines.find(routine => routine.calls.length > 0);
  const call = caller?.calls[0];

  assert.deepEqual(parsed.diagnostics, []);
  assert.equal(call?.target?.name.name, 'adicione');
  assert.equal(call?.arguments[0].name, 'a magnitude dum byte');
  assert.deepEqual(
    call?.typeReferences?.map(reference => reference.name),
    ['byte']
  );
});

test('resolves contracted address and content operators in routine arguments', () => {
  const source = [
    'Um número é uma estrutura.',
    'Um ponteiro é um ponteiro para um número.',
    'Um pbyte é um ponteiro para um byte.',
    'Rotina para que se adicione um pbyte denominado endereço para um número denominado total:',
    '  Retorne.',
    'Rotina para que se adicione um número denominado valor para um número denominado total:',
    '  Retorne.',
    'Rotina para que se use um pbyte:',
    '  Retorne.',
    'Rotina para que se use um byte:',
    '  Retorne.',
    'Rotina para que se use um número:',
    '  Retorne.',
    'Rotina para que se faça algo com um número:',
    '  Adicione o endereçamento dum byte para o número.',
    '  Adicione o conteúdo dum ponteiro para o número.',
    '  Use o conteúdo dum pbyte.',
    '  Use a magnitude duma estrutura.',
    '  Use a magnitude duns bytes.',
    '  Use a magnitude dumas estruturas.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const caller = parsed.routines.find(routine => routine.calls.length === 6);

  assert.deepEqual(parsed.diagnostics, []);
  assert.deepEqual(
    caller?.calls.map(call => call.target?.parameters[0].type.name),
    ['pbyte', 'número', 'byte', 'número', 'número', 'número']
  );
  assert.deepEqual(
    caller?.calls.map(call => call.typeReferences?.[0].name),
    ['byte', 'ponteiro', 'pbyte', 'estrutura', 'bytes', 'estruturas']
  );
});

test('resolves scalar arguments after alternate right-shift predicates', () => {
  const { documents } = createWorkspace([
    {
      name: 'Tipos.pop',
      text: [
        'Um número é uma estrutura.',
        'Uma unidade é um número.',
        'Um bit é uma unidade.',
        'Um código da cor é um número.'
      ].join('\n')
    },
    {
      name: 'Rotinas.pop',
      text: [
        'Rotina para que se desloque um número  para a direita uns bits;',
        'Rotina para que se desloque um número uns bits para a direita:',
        '  Retorne.'
      ].join('\n')
    },
    {
      name: 'teste.pop',
      text: [
        'Rotina para que se converta um código da cor para um número:',
        '  Desloque o código da cor para a direita 0 bits.',
        '  Desloque o código da cor para a direita 8 bits.'
      ].join('\n')
    }
  ]);
  const parsed = documents.find(document =>
    document.uri.endsWith('/teste.pop')
  ).parsed;
  const caller = parsed.routines.find(routine =>
    routine.parameters.some(parameter =>
      parameter.type.normalizedName === 'código da cor'
    )
  );

  assert.deepEqual(documents.flatMap(document => document.parsed.diagnostics), []);
  assert.deepEqual(
    caller.calls.map(call =>
      call.arguments.map(argument => argument.name)
    ),
    [
      ['o código da cor', '0 bits'],
      ['o código da cor', '8 bits']
    ]
  );
  assert.ok(caller.calls.every(call => call.target?.name.normalizedName === 'desloque'));
});

test('splits cross-file calls using alternate routine parameter separators', () => {
  const { documents } = createWorkspace([
    {
      name: 'types.pop',
      text: [
        'Um número é uma estrutura.',
        'Uma unidade é um número.',
        'Um bit é uma unidade.'
      ].join('\n')
    },
    {
      name: 'routines.pop',
      text: [
        'Rotina para que se desloque um número uns bits para a esquerda;',
        'Rotina para que se desloque um número para a esquerda uns bits:',
        '  Retorne.'
      ].join('\n')
    },
    {
      name: 'caller.pop',
      text: [
        'Rotina para que se teste um número denominado valor e uns bits denominados contagem de deslocamentos:',
        '  Desloque o valor para a esquerda [usando] a contagem de deslocamentos.'
      ].join('\n')
    }
  ]);
  const caller = documents[2].parsed.routines[0];

  assert.deepEqual(documents[2].parsed.diagnostics, []);
  assert.equal(caller.calls[0].target.name.normalizedName, 'desloque');
  assert.deepEqual(
    caller.calls[0].arguments.map(argument => argument.name),
    ['o valor', 'a contagem de deslocamentos']
  );
  assert.deepEqual(
    caller.calls[0].target.parameters.map(parameter => parameter.type.name),
    ['número', 'bits']
  );
});

test('resolves range conditions with numeric arguments from cross-file boolean overloads', () => {
  const { documents } = createWorkspace([
    {
      name: 'Tipos.pop',
      text: [
        'Um número é uma estrutura.',
        'Uma string é uma estrutura.',
        'Um query byte é uma string.'
      ].join('\n')
    },
    {
      name: 'Funções.pop',
      text: [
        ...Array(200).fill(''),
        'Função para que se determine se um byte está entre um segundo byte e um terceiro byte:',
        '  Diga sim.',
        'Função para que se determine se um byte está entre um número e um segundo número:',
        '  Diga sim.'
      ].join('\n')
    },
    {
      name: 'Rotinas.pop',
      text: [
        'Rotina para que se converta um byte para um query byte:',
        '  Se o byte estiver entre 48 e 57, retorne.',
        '  Se o byte estiver entre 65 e 90, retorne.',
        '  Se o byte estiver entre 97 e 122, retorne.'
      ].join('\n')
    }
  ]);
  const routines = documents.find(document =>
    document.uri.endsWith('/Rotinas.pop')
  ).parsed.routines;
  const caller = routines.find(routine =>
    routine.parameters.some(parameter =>
      parameter.type.normalizedName === 'query byte'
    )
  );

  assert.deepEqual(
    documents.flatMap(document => document.parsed.diagnostics).filter(diagnostic =>
      diagnostic.message.startsWith('No boolean function found')
    ),
    []
  );
  assert.deepEqual(
    caller.conditionals.map(conditional =>
      conditional.target?.parameters.map(parameter => parameter.type.name)
    ),
    Array(3).fill(['byte', 'byte', 'byte'])
  );
});

test('resolves all arithmetic operators for pointer and numeric operands', () => {
  const header = [
    'Um ponteiro é uma estrutura.',
    'Um pbyte é um ponteiro para um byte.',
    'Um pnúmero é um ponteiro para um número.',
    'Um ponteiro derivado de byte é um pbyte.',
    'Um ponteiro derivado de número é um pnúmero.',
    'Um número é uma estrutura.',
    'Um twip é um número.',
    'Uma quantidade de caracteres é uns twips.',
    'Uma fração é um número.',
    'Um octeto é um byte.',
    'Rotina para que se use um ponteiro: Retorne.',
    'Rotina para que se use um byte: Retorne.',
    'Rotina para que se use um número: Retorne.',
    'Rotina para que se use uma fração: Retorne.',
    'Rotina para que se teste um ponteiro derivado de byte denominado ponteiro de bytes e um ponteiro derivado de número denominado ponteiro de números e um octeto denominado byte e uma quantidade de caracteres denominada número:'
  ];
  const pairs = [
    ['o ponteiro de bytes', 'o ponteiro de números', 'ponteiro'],
    ['o ponteiro de bytes', 'o número', 'ponteiro'],
    ['o número', 'o ponteiro de bytes', 'ponteiro'],
    ['o ponteiro de bytes', 'o byte', 'ponteiro'],
    ['o byte', 'o ponteiro de bytes', 'ponteiro'],
    ['o byte', 'o número', 'número'],
    ['o número', 'o byte', 'número'],
    ['o byte', 'o byte', 'byte'],
    ['o número', 'o número', 'número']
  ];
  const operators = ['mais', 'menos', 'vezes', 'dividido por'];
  const calls = pairs.flatMap(([left, right]) =>
    operators.map(operator =>
      `  Use ${left} ${operator} ${right}.`
    )
  );
  const source = [...header, ...calls].join('\n');
  const parsed = parseTypeDeclarations(source);
  const caller = parsed.routines.find(routine =>
    routine.calls.length === pairs.length * operators.length
  );

  assert.deepEqual(parsed.diagnostics, []);
  assert.equal(caller?.calls.length, pairs.length * operators.length);
  assert.ok(caller?.calls.every(call => call.target?.name.normalizedName === 'use'));
  const resultCategories = caller?.calls.map(call =>
    call.target?.parameters[0].type.name === 'ponteiro'
      ? 'ponteiro'
      : 'numeric'
  );
  assert.deepEqual(
    resultCategories,
    pairs.flatMap(([, , resultType]) =>
      operators.map(() => resultType === 'ponteiro' ? 'ponteiro' : 'numeric')
    )
  );
});

test('preserves a scalar quantity type when divided by a unitless number', () => {
  const source = [
    'Um número é uma estrutura.',
    'Um twip é um número.',
    'Uma quantidade de twips é uns twips.',
    'Os twips são uns twips.',
    'Rotina para que se mova uns twips:',
    '  Retorne.',
    'Rotina para que se teste:',
    '  Mova os twips dividido por 8.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const caller = parsed.routines.find(routine =>
    routine.name.normalizedName === 'teste'
  );
  const call = caller.calls[0];

  assert.deepEqual(parsed.diagnostics, []);
  assert.equal(call.target.name.normalizedName, 'mova');
  assert.equal(call.target.parameters[0].type.normalizedName, 'twips');
});

test('preserves a shared scalar scale through multiplication and division', () => {
  const source = [
    'Um número é uma estrutura.',
    'Um twip é um número.',
    'Uma coordenada é uns twips.',
    'Um deslocamento horizontal é um número.',
    'A coordenada é uma coordenada.',
    'O deslocamento horizontal é um deslocamento horizontal.',
    'Os twips são uns twips.',
    'Rotina para que se adicione um número para um segundo número:',
    '  Retorne.',
    'Rotina para que se teste:',
    '  Adicione o deslocamento horizontal vezes os twips dividido por 10000 para a coordenada.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const caller = parsed.routines.find(routine =>
    routine.name.normalizedName === 'teste'
  );
  const call = caller.calls[0];

  assert.deepEqual(parsed.diagnostics, []);
  assert.equal(call.target.name.normalizedName, 'adicione');
  assert.deepEqual(
    call.arguments.map(argument => argument.name),
    [
      'o deslocamento horizontal vezes os twips dividido por 10000',
      'a coordenada'
    ]
  );
});

test('matches trailing suffixes from alternate routine headers', () => {
  const source = [
    'Um ponteiro é uma estrutura.',
    'Um número é uma estrutura.',
    'Uma contagem é um número.',
    'Uma quantidade de bytes é uma contagem.',
    'Rotina para que se arredonde um número para cima usando a potência imediata de dois;',
    'Rotina para que se arredonde um número para cima usando a próxima potência de dois;',
    'Rotina para que se arredonde um número para cima usando a potência de dois:',
    '  Retorne.',
    'Rotina para que se associe um ponteiro usando uma quantidade de bytes:',
    '  Arredonde a quantidade de bytes para cima usando a próxima potência de dois.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const caller = parsed.routines.find(routine => routine.name.name === 'associe');
  const call = caller?.calls[0];

  assert.deepEqual(parsed.diagnostics, []);
  assert.ok(call?.target);
  assert.equal(call.target.name.normalizedName, 'arredonde');
  assert.equal(call.target.parameters[0].type.name, 'número');
  assert.deepEqual(call.arguments.map(argument => argument.name), [
    'a quantidade de bytes'
  ]);
});

test('resolves null checks on a computed field owner through pointer overloads', () => {
  const source = [
    'Um ponteiro é uma estrutura.',
    'Uma lista é um ponteiro para uma lista estruturada.',
    'Uma lista estruturada é uma estrutura.',
    'Uma caixa de texto é uma lista.',
    'Um número é uma estrutura.',
    'Uma malha quadriculada é uma estrutura.',
    'Função para que se determine se um ponteiro é um número;',
    'Função para que se determine se um ponteiro é um segundo ponteiro;',
    'Função para que se determine se um número é um segundo número:',
    '  Diga sim.',
    'Rotina para que se atribua a malha quadriculada duma caixa de texto para uma malha quadriculada:',
    '  Se a caixa de texto for inexistente, retorne.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const computedFieldRoutine = parsed.routines.find(routine =>
    routine.computedField?.name.name === 'malha quadriculada'
  );
  const conditional = computedFieldRoutine?.conditionals[0];

  assert.deepEqual(parsed.diagnostics, []);
  assert.equal(conditional?.target?.name.name, 'é ');
  assert.deepEqual(
    conditional?.conditionArguments.map(argument => argument.name),
    ['a caixa de texto', 'inexistente']
  );
});

test('keeps contracted division by computed fields inside routine arguments', () => {
  const source = [
    'Um número é uma estrutura.',
    'Um par de números é uma estrutura com',
    '  Um número denominado número X e',
    '  Um número denominado número Y.',
    'Uma localização é um par de números.',
    'Uma origem é uma localização.',
    'Uma caixa de texto é uma estrutura.',
    'Uma malha quadriculada é um par de números.',
    'Função para que se atribua a origem duma caixa de texto para uma localização: Retorne.',
    'Função para que se atribua a malha quadriculada duma caixa de texto para uma malha quadriculada: Retorne.',
    'Rotina para que se atribua um par de números para um segundo par de números: Retorne.',
    'Rotina para que se atualize uma caixa de texto:',
    '  Atribua a origem desta caixa de texto dividido pela malha quadriculada desta caixa de texto para um par de números.',
    '  Atribua a origem desta caixa de texto dividido por a malha quadriculada desta caixa de texto para um par de números.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const caller = parsed.routines.find(routine => routine.name.name === 'atualize');
  const calls = caller?.calls ?? [];

  assert.deepEqual(parsed.diagnostics, []);
  assert.equal(calls.length, 2);
  assert.deepEqual(
    calls.map(call => call.arguments.map(argument => argument.name)),
    [
      [
        'a origem desta caixa de texto dividido pela malha quadriculada desta caixa de texto',
        'par de números'
      ],
      [
        'a origem desta caixa de texto dividido por a malha quadriculada desta caixa de texto',
        'par de números'
      ]
    ]
  );
  for (const call of calls) {
    assert.equal(call.target?.name.normalizedName, 'atribua');
  }
});

test('caches repeated overload argument analysis without changing resolution', () => {
  const source = [
    'Um número é um byte.',
    'O valor é um byte.',
    'Rotina para que se some um byte:',
    '  Retorne.',
    'Rotina para que se some um número:',
    '  Retorne.',
    'Rotina para que se teste:',
    '  Some o valor mais 2.',
    '  Retorne.'
  ].join('\n');
  let metrics;
  let baselineMetrics;
  const parsed = parseTypeDeclarations(
    source,
    undefined,
    value => { metrics = value; }
  );
  const baseline = parseTypeDeclarations(
    source,
    undefined,
    value => { baselineMetrics = value; },
    { cacheRoutineArgumentTypes: false }
  );
  const call = parsed.routines[2].calls[0];
  const profile = metrics.routineResolutionProfile;
  const slowestCall = profile.slowestCalls[0];

  assert.deepEqual(parsed.routines, baseline.routines);
  assert.deepEqual(parsed.diagnostics, baseline.diagnostics);
  assert.equal(parsed.diagnostics.length, 0);
  assert.equal(call.target.parameters[0].type.name, 'número');
  assert.deepEqual(
    call.variableAccesses.map(access => access.reference.name),
    ['valor']
  );
  assert.equal(profile.candidatesReachingArgumentEvaluation, 2);
  assert.equal(profile.articleRangeCacheHits, 1);
  assert.equal(profile.routineExpressionParseCacheHits, 1);
  assert.equal(profile.expressionOperandResolutions, 2);
  assert.equal(profile.expressionOperandCacheHits, 2);
  assert.equal(profile.expressionOperandCacheMisses, 2);
  assert.ok(profile.argumentTypeCache.hits > 0);
  assert.ok(profile.argumentTypeCache.misses > 0);
  assert.ok(profile.argumentTypeCache.inferenceCalls >=
    profile.argumentTypeCache.misses);
  assert.ok(profile.argumentTypeCache.cacheTimeMs >=
    profile.argumentTypeCache.effectReplayMs);
  assert.ok(
    profile.argumentTypeCache.inferenceCalls <
    baselineMetrics.routineResolutionProfile.helpers.resolveRoutineArgumentType.calls
  );
  assert.equal(profile.parameterSeparatedArgumentsCacheHits, 0);
  assert.equal(slowestCall.candidatesExamined, 2);
  assert.equal(slowestCall.candidatesReachingArgumentEvaluation, 2);
  assert.equal(slowestCall.articleRangeCacheHits, 1);
  assert.equal(slowestCall.routineExpressionParseCacheHits, 1);
  assert.equal(slowestCall.expressionOperandResolutions, 2);
  assert.equal(slowestCall.expressionOperandCacheHits, 2);
  assert.equal(slowestCall.expressionOperandCacheMisses, 2);
  assert.ok(slowestCall.argumentTypeCache.hits > 0);
  assert.equal(slowestCall.helpers.resolveRoutineCall.calls, 1);
  assert.equal(slowestCall.helpers.hasArticleBeforeScalarLiteral.calls, 1);
  assert.equal(slowestCall.normalizedName, 'some');
  assert.equal(slowestCall.slowestCandidates.length, 2);
  assert.ok(slowestCall.slowestCandidates.every(candidate =>
    candidate.routineName === 'some' &&
    candidate.argumentCount === 1 &&
    candidate.durationMs >= candidate.argumentSplittingMs
  ));
});

test('replays cached argument effects for expressions, fields, variables, and casts', () => {
  const source = [
    'Uma cifra binária é um byte.',
    'Uma cifra hexadecimal é um byte.',
    'Uma posição é uma estrutura.',
    'Uma localização é uma estrutura com Uma posição denominada posição X.',
    'Um retângulo é uma estrutura com Uma posição denominada posição X1, Uma posição denominada posição X2.',
    'Uma string é uma estrutura.',
    'O usuário é uma string.',
    'Rotina para que se receba um byte:',
    '  Retorne.',
    'Rotina para que se receba uma cifra binária:',
    '  Retorne.',
    'Rotina para que se receba uma cifra hexadecimal:',
    '  Retorne.',
    'Rotina para que se receba uma posição:',
    '  Retorne.',
    'Rotina para que se receba uma string:',
    '  Retorne.',
    'Função para que se atribua o centro dum retângulo para uma localização:',
    '  Atribua a posição X1 deste retângulo mais a posição X2 deste retângulo à posição X desta localização.',
    'Rotina para que se consuma uma localização:',
    '  Retorne.',
    'Rotina para que se teste com um retângulo e uma string:',
    '  Receba a string tal como uma cifra binária.',
    '  Receba a string tal qual uma cifra hexadecimal.',
    '  Receba a string.',
    '  Receba o usuário.',
    '  Receba a posição X1 deste retângulo.',
    '  Consuma o centro deste retângulo.',
    '  Retorne.'
  ].join('\n');
  let cachedMetrics;
  const cached = parseTypeDeclarations(
    source,
    undefined,
    metrics => { cachedMetrics = metrics; }
  );
  const uncached = parseTypeDeclarations(
    source,
    undefined,
    undefined,
    { cacheRoutineArgumentTypes: false }
  );
  const caller = cached.routines.find(routine =>
    routine.name.name.includes('teste')
  );

  assert.deepEqual(cached.routines, uncached.routines);
  assert.deepEqual(cached.diagnostics, uncached.diagnostics);
  assert.deepEqual(getParsedReferences(cached), getParsedReferences(uncached));
  assert.ok(caller);
  assert.equal(caller.calls.length, 6);
  assert.ok(caller.calls.some(call => (call.fieldAccesses?.length ?? 0) > 0));
  assert.ok(caller.calls.some(call =>
    (call.computedFieldAccesses?.length ?? 0) > 0
  ));
  assert.ok(caller.calls.some(call => call.typeReferences?.some(reference =>
    reference.name === 'cifra binária'
  )));
  assert.ok(caller.calls.some(call => call.variableAccesses?.some(access =>
    access.reference.name === 'usuário'
  )));
  assert.ok(caller.localVariables?.some(variable =>
    variable.name.name === 'cifra binária'
  ));
  assert.equal(cached.diagnostics.length, 0, JSON.stringify(cached.diagnostics));
  assert.ok(cachedMetrics.routineResolutionProfile.argumentTypeCache.hits > 0);
});

test('preserves implicit definite article contexts across overload candidates', () => {
  const source = [
    'Um número é uma estrutura.',
    'Um par de números é uma estrutura com',
    '  Um número denominado número X e',
    '  Um número denominado número Y.',
    'Rotina para que se multiplique um par de números por um segundo par de números:',
    '  Multiplique o número X deste par de números pelo número X deste segundo par de números.',
    '  Multiplique o número Y deste par de números pelo número Y deste segundo par de números.',
    'Rotina para que se multiplique um número por um segundo número:',
    '  Decodifique $8B8508000000.',
    '  Decodifique $8B00.',
    '  Decodifique $8B9D0C000000.',
    '  Decodifique $F72B.',
    '  Decodifique $8B9D08000000.',
    '  Decodifique $8903.'
  ].join('\n');
  let cachedMetrics;
  const cached = parseTypeDeclarations(
    source,
    undefined,
    metrics => { cachedMetrics = metrics; }
  );
  const uncached = parseTypeDeclarations(
    source,
    undefined,
    undefined,
    { cacheRoutineArgumentTypes: false }
  );

  assert.deepEqual(cached.routines, uncached.routines);
  assert.deepEqual(cached.diagnostics, uncached.diagnostics);
  assert.deepEqual(getParsedReferences(cached), getParsedReferences(uncached));
  assert.equal(cached.diagnostics.length, 0);
  assert.ok(cachedMetrics.routineResolutionProfile.argumentTypeCache.hits > 0);
});

test('replays cached undefined inference and ambiguous-field diagnostics once', () => {
  const undefinedSource = [
    'Um número é um byte.',
    'Rotina para que se receba um byte:',
    '  Retorne.',
    'Rotina para que se receba um número:',
    '  Retorne.',
    'Rotina para que se teste:',
    '  Receba o valor ausente.',
    '  Retorne.'
  ].join('\n');
  let undefinedMetrics;
  const cachedUndefined = parseTypeDeclarations(
    undefinedSource,
    undefined,
    metrics => { undefinedMetrics = metrics; }
  );
  const uncachedUndefined = parseTypeDeclarations(
    undefinedSource,
    undefined,
    undefined,
    { cacheRoutineArgumentTypes: false }
  );
  assert.deepEqual(cachedUndefined.routines, uncachedUndefined.routines);
  assert.deepEqual(cachedUndefined.diagnostics, uncachedUndefined.diagnostics);
  assert.ok(
    undefinedMetrics.routineResolutionProfile.argumentTypeCache.hits > 0
  );
  assert.equal(cachedUndefined.routines[2].calls[0].target, undefined);

  const ambiguousSource = [
    'Uma posição é uma estrutura com um byte denominado valor.',
    'Uma localização é uma estrutura com um byte denominado valor.',
    'Uma caixa é uma estrutura com Uma posição denominada posição A e Uma localização denominada posição B.',
    'A caixa global é uma caixa.',
    'Rotina para que se receba um byte:',
    '  Retorne.',
    'Rotina para que se receba um número:',
    '  Retorne.',
    'Rotina para que se teste:',
    '  Receba o valor desta caixa global.',
    '  Retorne.'
  ].join('\n');
  const cachedAmbiguous = parseTypeDeclarations(ambiguousSource);
  const uncachedAmbiguous = parseTypeDeclarations(
    ambiguousSource,
    undefined,
    undefined,
    { cacheRoutineArgumentTypes: false }
  );
  const ambiguityDiagnostics = cachedAmbiguous.diagnostics.filter(diagnostic =>
    diagnostic.message.startsWith('Ambiguous structure field access')
  );
  assert.deepEqual(cachedAmbiguous.routines, uncachedAmbiguous.routines);
  assert.deepEqual(cachedAmbiguous.diagnostics, uncachedAmbiguous.diagnostics);
  assert.equal(ambiguityDiagnostics.length, 1);
});

test('reports ambiguity between direct and nested structure fields', () => {
  const source = [
    'Uma string é uma estrutura.',
    'Uma pessoa é uma estrutura com',
    '  Uma string denominada nome e',
    '  Um pai.',
    'Um pai é uma estrutura com',
    '  Uma string denominada nome.',
    'O cliente é uma pessoa.',
    'para que se faça algo:',
    '  Atribua "joão" para o nome deste cliente.',
    'para que se atribua uma string para uma segunda string: retorne.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);

  const ambiguousDiagnostic = parsed.diagnostics.find(diagnostic =>
    diagnostic.message === 'Ambiguous structure field access "nome".'
  );
  assert.ok(ambiguousDiagnostic);
  assert.equal(ambiguousDiagnostic.severity, 'hint');
});

test('reuses unchanged declaration syntax and rebases all source ranges', () => {
  const source = [
    'Um caractere é um byte.',
    'Uma pessoa é uma estrutura com um byte denominado idade.',
    'O usuário é uma pessoa.'
  ].join('\n');
  const previous = parseTypeDeclarations(source);
  const shiftedSource = `\n${source}`;
  const metrics = {};
  const shifted = parseTypeDeclarations(
    shiftedSource,
    undefined,
    value => Object.assign(metrics, value),
    {
      reusableDeclarationRegions: { source, parsed: previous }
    }
  );
  const fullShifted = parseTypeDeclarations(shiftedSource);

  assert.equal(metrics.reusedDeclarationCount, 3);
  assert.deepEqual(shifted.declarations, fullShifted.declarations);
  assert.deepEqual(shifted.globalVariables, fullShifted.globalVariables);
  assert.deepEqual(shifted.diagnostics, fullShifted.diagnostics);
  assert.deepEqual(shifted.regions, fullShifted.regions);
  assert.deepEqual(
    getParsedReferences(shifted),
    getParsedReferences(fullShifted)
  );

  const changedSource = shiftedSource.replace(
    'denominado idade',
    'denominado anos'
  );
  const changedMetrics = {};
  const changed = parseTypeDeclarations(
    changedSource,
    undefined,
    value => Object.assign(changedMetrics, value),
    {
      reusableDeclarationRegions: {
        source: shiftedSource,
        parsed: shifted
      }
    }
  );
  const fullChanged = parseTypeDeclarations(changedSource);
  assert.equal(changedMetrics.reusedDeclarationCount, 2);
  assert.deepEqual(changed.declarations, fullChanged.declarations);
  assert.deepEqual(changed.globalVariables, fullChanged.globalVariables);
  assert.deepEqual(changed.diagnostics, fullChanged.diagnostics);
  assert.deepEqual(changed.regions, fullChanged.regions);
});

test.skip('projects parser declaration and routine records into typed syntax nodes', () => {
  const source = [
    'Um byte é um byte.',
    'Uma pessoa é uma estrutura com um byte denominado idade.',
    'Um carro é uma estrutura.',
    'O texto é uma pessoa.',
    'O valor é um byte.',
    'O carro atual é um carro.',
    'para que se conte usando um byte denominado letra:',
    '  Preserve a letra.',
    '  Atribua 1 mais 2 para uma quantidade.',
    '  Escreva "resultado" para o texto.',
    '  Retorne.',
    'para que se conduza um carro denominado veículo:',
    '  Retorne.',
    'Rotina para que se faça algo:',
    '  Conduza o carro atual.',
    '  Itere.',
    '    Empilhe o valor.',
    '  Reitere.',
    '  Processe "kernel32.dll" "CloseClipboard".'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const analysis = getDocumentAnalysis(parsed, source.length);
  const nodes = [...analysis.nodes.values()];
  const hasNode = (kind, property, value) => nodes.some(node =>
    node.kind === kind && node[property] === value
  );

  assert.deepEqual(parsed.diagnostics, []);
  for (const declaration of parsed.declarations) {
    assert.ok(nodes.some(node =>
      ['type-declaration', 'list-declaration'].includes(node.kind) &&
      node.typeDeclaration === declaration
    ));
    for (const field of declaration.fields ?? []) {
      assert.ok(hasNode('field-declaration', 'fieldDeclaration', field));
    }
  }
  for (const declaration of parsed.globalVariables) {
    assert.ok(hasNode(
      'global-variable-declaration',
      'globalVariableDeclaration',
      declaration
    ));
  }
  for (const routine of parsed.routines) {
    assert.ok(hasNode('routine-declaration', 'routineDeclaration', routine));
    for (const parameter of [...routine.parameters, ...routine.alternateParameters.flat()]) {
      assert.ok(nodes.some(node =>
        ['parameter-declaration', 'alternate-parameter'].includes(node.kind) &&
        node.parameterDeclaration === parameter
      ));
    }
    for (const [records, kind, property] of [
      [routine.assignments, 'assignment', 'assignment'],
      [routine.outputs, 'output', 'output'],
      [routine.calls, 'routine-call', 'routineCall'],
      [routine.memoryAllocations, 'memory-allocation', 'memoryAllocation'],
      [routine.memoryDeallocations, 'memory-deallocation', 'memoryDeallocation'],
      [routine.conditionals, 'conditional', 'conditional'],
      [routine.returnStatements, 'return-statement', 'returnStatement'],
      [routine.processes, 'process', 'process'],
      [routine.loopBlocks, 'loop-block', 'routineLoopBlock'],
      [routine.loopInstructions, 'loop-instruction', 'loopInstruction'],
      [
        routine.simpleInstructions,
        undefined,
        'simpleInstruction'
      ]
    ]) {
      for (const record of records) {
        assert.ok(nodes.some(node =>
          (!kind || node.kind === kind) && node[property] === record
        ));
      }
    }
    for (const local of routine.localVariables) {
      assert.ok(hasNode(
        'local-variable-declaration',
        'localVariableDeclaration',
        local
      ));
    }
    if (routine.computedField) {
      assert.ok(hasNode(
        'computed-field-declaration',
        'computedFieldDeclaration',
        routine.computedField
      ));
    }
    for (const statement of routine.statements) {
      assert.ok(nodes.some(node =>
        node.kind === 'statement' &&
        node.range.start === statement.start &&
        node.range.end === statement.end
      ));
    }
  }
});

test('projects base types, pointer targets, and explicit scalar factors distinctly', () => {
  const source = [
    'Um byte é um byte.',
    'Um caractere é um byte.',
    'Um ponteiro é uma estrutura.',
    'Um pchar é um ponteiro para um caractere.',
    'Um twip é um byte.',
    'Um pixel são 15 twips.',
    'Uma pessoa é uma estrutura com um byte denominado idade.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const analysis = getDocumentAnalysis(parsed, source.length);
  const nodes = [...analysis.nodes.values()];

  assert.deepEqual(parsed.diagnostics, []);
  assert.equal(nodes.filter(node => node.kind === 'base-type-reference').length, 7);
  assert.equal(nodes.filter(node => node.kind === 'pointer-target').length, 1);
  const scalarFactor = nodes.find(node => node.kind === 'scalar-factor');
  assert.equal(source.slice(scalarFactor.range.start, scalarFactor.range.end), '15');
  assert.equal(scalarFactor.scalarFactor, '15');
  assert.ok(nodes.some(node =>
    node.kind === 'field-declaration' &&
    node.fieldDeclaration?.kind === 'named'
  ));
});

test('projects inferred global literal initializers for every supported literal kind', () => {
  const source = [
    'O inteiro é 1.',
    'A fração é 1/2.',
    'O misto é 1+1/2.',
    'O hexadecimal é $ff.',
    'O texto é "olá".',
    'O vazio é nulo.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const analysis = getDocumentAnalysis(parsed, source.length);

  assert.deepEqual(parsed.diagnostics, []);
  assert.deepEqual(
    parsed.globalVariables.map(variable => variable.initializer?.kind),
    ['integer', 'fraction', 'mixed', 'hexadecimal', 'string', 'null']
  );
  assert.equal(
    [...analysis.nodes.values()].filter(node =>
      node.kind === 'global-initializer'
    ).length,
    6
  );
});

test('projects explicit-type global literal initializers', () => {
  const source = [
    'Uma string é uma estrutura.',
    'O nome da pessoa é uma string igual a "João".'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const analysis = getDocumentAnalysis(parsed, source.length);
  const declaration = parsed.globalVariables[0];
  const initializer = [...analysis.nodes.values()].find(node =>
    node.kind === 'global-initializer'
  );

  assert.deepEqual(parsed.diagnostics, []);
  assert.equal(declaration.type.name, 'string');
  assert.equal(declaration.initializer.kind, 'string');
  assert.equal(declaration.initializer.text, '"João"');
  assert.equal(initializer.globalInitializer, declaration.initializer);
});

test('projects list declarations as a distinct AST kind', () => {
  const source = [
    'Um ponteiro é uma estrutura.',
    'Uma lista estruturada é uma estrutura com uma byte denominado valor.',
    'Uma lista é um ponteiro para uma lista estruturada.',
    'Uma lista anterior é uma lista.',
    'Uma pessoa é uma estrutura.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const analysis = getDocumentAnalysis(parsed, source.length);
  const listNodes = [...analysis.nodes.values()].filter(node =>
    node.kind === 'list-declaration'
  );

  assert.deepEqual(parsed.diagnostics, []);
  assert.deepEqual(
    listNodes.map(node => node.listDeclaration.name.name),
    ['lista', 'lista anterior']
  );
  assert.equal(
    [...analysis.nodes.values()].filter(node =>
      node.kind === 'type-declaration'
    ).length,
    3
  );
});

test('projects special list fields as typed field accesses and type references', () => {
  const source = [
    'Um ponteiro é uma estrutura.',
    'Uma lista estruturada é uma estrutura.',
    'Uma lista é um ponteiro para uma lista estruturada.',
    'Uma pessoa é uma estrutura.',
    'O resultado é uma pessoa.',
    'A lista atual é uma lista.',
    'para que se teste:',
    '  Atribua a primeira pessoa desta lista atual para o resultado.',
    '  Atribua a última pessoa desta lista atual para o resultado.',
    '  Atribua a próxima pessoa desta lista atual para o resultado.',
    '  Atribua a pessoa anterior desta lista atual para o resultado.',
    '  Retorne.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const analysis = getDocumentAnalysis(parsed, source.length);
  const listFieldNodes = [...analysis.nodes.values()].filter(node =>
    node.kind === 'list-field-access'
  );

  assert.deepEqual(parsed.diagnostics, []);
  assert.deepEqual(
    listFieldNodes.map(node => node.listFieldAccess.kind),
    ['first', 'last', 'next', 'previous']
  );
  assert.deepEqual(
    listFieldNodes.map(node =>
      source.slice(
        node.listFieldAccess.elementType.range.start,
        node.listFieldAccess.elementType.range.end
      )
    ),
    ['pessoa', 'pessoa', 'pessoa', 'pessoa']
  );
  for (const node of listFieldNodes) {
    const typeReference = analysis.findReferenceAt(
      node.listFieldAccess.elementType.range.start,
      'type'
    );
    assert.equal(typeReference.name, 'pessoa');
    assert.equal(
      analysis.findTypeDefinitionAt(node.listFieldAccess.elementType.range.start),
      'pessoa'
    );
    assert.ok(analysis.nodes.get(node.parentId).range.start <= node.range.start);
    assert.ok(analysis.nodes.get(node.parentId).range.end >= node.range.end);
  }
});

test.skip('projects explicit and implicit local declarations from assignments', () => {
  const source = [
    'Um byte é um byte.',
    'Uma contagem é um byte.',
    'para que se faça:',
    '  Atribua 1 para uma contagem denominada quantidade.',
    '  Atribua 2 para uma contagem.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const analysis = getDocumentAnalysis(parsed, source.length);
  const locals = parsed.routines[0].localVariables;

  assert.deepEqual(parsed.diagnostics, []);
  assert.equal(locals.length, 2);
  assert.equal(locals[0].name.name, 'quantidade');
  assert.equal(locals[0].implicit, false);
  assert.equal(locals[1].name.name, 'contagem');
  assert.equal(locals[1].implicit, true);
  assert.equal(
    [...analysis.nodes.values()].filter(node =>
      node.kind === 'local-variable-declaration'
    ).length,
    2
  );
});

test('detects an implicit local after a routine verb and any indefinite article in statements', () => {
  const source = [
    'Uma string é uma estrutura.',
    'Rotina para que se limpe uma string:',
    '  Retorne.',
    'Rotina para que se teste:',
    '  Limpe uma nova string.',
    '  Verifique uma segunda string.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const analysis = getDocumentAnalysis(parsed, source.length);
  const routine = parsed.routines.find(candidate =>
    candidate.name.normalizedName === 'teste'
  );
  const locals = routine.localVariables;

  assert.deepEqual(
    locals.map(local => [local.name.name, local.type.name, local.implicit]),
    [
      ['nova string', 'string', true],
      ['segunda string', 'string', true]
    ]
  );
  assert.equal(
    [...analysis.nodes.values()].filter(node =>
      node.kind === 'local-variable-declaration' &&
      ['nova string', 'segunda string'].includes(
        node.localVariableDeclaration.name.name
      )
    ).length,
    2
  );
});

test('stops a named local before a chained routine call', () => {
  const { documents } = createWorkspace([
    {
      name: 'types.pop',
      text: [
        'Um byte é um byte.',
        'Um ponteiro é uma estrutura com 4 bytes.',
        'Um caractere inicial é um ponteiro para um byte.',
        'Um caractere final é um ponteiro para um byte.',
        'Uma string é uma estrutura com um caractere inicial e um caractere final.',
        'Uma string de caracteres amplos é uma string.',
        'Um número é uma estrutura.'
      ].join('\n')
    },
    {
      name: 'routines.pop',
      text: [
        'Rotina para que se converta uma string para uma string de caracteres amplos e anexe o caractere NULL nela:',
        '  Retorne.',
        'Rotina para que se anexe o caractere NULL após uma string de caracteres amplos:',
        '  Retorne.'
      ].join('\n')
    },
    {
      name: 'caller.pop',
      text: [
        'Rotina para que se exercite usando uma string:',
        '  Converta a string para uma string de caracteres amplos denominada nome amplificado do host e anexe o caractere NULL nela.',
        '  Processe "winhttp.dll" "WinHttpConnect" com',
        '    O caractere inicial deste nome amplificado do host [pswzServerName]',
        '  Retornando um número.'
      ].join('\n')
    }
  ]);
  const caller = documents[2].parsed.routines[0];
  const wideString = caller.localVariables.find(variable =>
    variable.type.normalizedName === 'string de caracteres amplos'
  );
  const process = caller.processes[0];

  assert.deepEqual(documents[2].parsed.diagnostics, []);
  assert.ok(wideString);
  assert.equal(wideString.name.normalizedName, 'nome amplificado do host');
  assert.ok(process);
  assert.deepEqual(
    process.variableAccesses.map(access => access.reference.normalizedName),
    ['nome amplificado do host']
  );
});

test('ignores routine qualifiers when inferring locals but preserves call matching', () => {
  const { documents } = createWorkspace([
    {
      name: 'types.pop',
      text: [
        'Um número é uma estrutura.',
        'Um número de coluna é um número.',
        'Uma linha de texto é uma estrutura.'
      ].join('\n')
    },
    {
      name: 'routines.pop',
      text: [
        'Rotina para que se calcule (para obter um número de coluna usando uma linha de texto):',
        '  Retorne.'
      ].join('\n')
    },
    {
      name: 'caller.pop',
      text: [
        'Rotina para que se teste usando um número de coluna:',
        '  Calcule (para obter um número de coluna usando uma linha de texto).',
        '  Retorne.'
      ].join('\n')
    }
  ]);
  const caller = documents[2].parsed.routines[0];
  const call = caller.calls[0];

  assert.deepEqual(documents[2].parsed.diagnostics, []);
  assert.deepEqual(
    caller.localVariables.map(variable => variable.name.normalizedName),
    []
  );
  assert.equal(call.target.name.normalizedName, 'calcule');
  assert.equal(
    call.target.qualifier,
    '(para obter um número de coluna usando uma linha de texto)'
  );
});

test('preserves useful analysis for incomplete declarations', () => {
  const source = 'Uma pessoa é um tipo ausente.';
  const parsed = parseTypeDeclarations(source);
  const analysis = getDocumentAnalysis(parsed, source.length);

  assert.ok(parsed.diagnostics.some(diagnostic =>
    diagnostic.message === 'Unknown base type "tipo ausente".'
  ));
  assert.ok([...analysis.nodes.values()].some(node =>
    node.kind === 'parser-diagnostic'
  ));
  assert.equal(analysis.root.range.end, source.length);
});

test('indexes type references, declarations, and document dependencies', () => {
  const { documents, index } = createWorkspace([
    { name: 'types.pop', text: 'Uma pessoa é uma estrutura.' },
    { name: 'variables.pop', text: 'Um cliente é uma pessoa.' }
  ]);
  const [types, variables] = documents;

  assert.equal(index.documentCount, 2);
  assert.ok(index.getDependencies(variables.uri).has(types.uri));
  assert.ok(index.getDependents(types.uri).has(variables.uri));
  assert.ok(index.getDependencyKinds(variables.uri, types.uri).has('type'));
  assert.equal(
    index.getAffectedDocuments(types.uri).has(variables.uri),
    true
  );
});

test('indexes cross-document type, variable, routine, and field dependencies', () => {
  const { documents, index } = createWorkspace([
    {
      name: 'declarations.pop',
      text: [
        'Uma string é uma estrutura.',
        'Uma garagem é uma estrutura com',
        '  Uma string denominada cor.',
        'Um carro é uma estrutura.',
        'O carro atual é um carro.',
        'O cliente é uma garagem.',
        'Rotina para que se conduza um carro:',
        '  Retorne.'
      ].join('\n')
    },
    {
      name: 'consumer.pop',
      text: [
        'Um esportivo é um carro.',
        'Rotina para que se teste:',
        '  Conduza o carro atual.',
        '  Atribua "azul" para a cor deste cliente.'
      ].join('\n')
    }
  ]);
  const [declarations, consumer] = documents;
  const kinds = index.getDependencyKinds(consumer.uri, declarations.uri);

  assert.deepEqual(consumer.parsed.diagnostics, []);
  assert.ok(kinds.has('type'));
  assert.ok(kinds.has('variable'));
  assert.ok(kinds.has('routine'));
  assert.ok(kinds.has('field'));
  const fieldReference = consumer.analysis.references.find(reference =>
    reference.kind === 'field' && !reference.declaration
  );
  assert.equal(fieldReference.container, 'garagem');
  assert.ok(index.getReferences(directory, fieldReference).some(candidate =>
    candidate.uri === declarations.uri && candidate.reference.declaration
  ));
  const fieldImpact = index.getAffectedDocumentsForDeclarationChanges(
    declarations.uri,
    directory,
    [{ kind: 'field', normalizedName: 'cor', normalizedContainer: 'garagem' }]
  );
  const variableImpact = index.getAffectedDocumentsForDeclarationChanges(
    declarations.uri,
    directory,
    [{ kind: 'variable', normalizedName: 'carro atual' }]
  );
  const routineImpact = index.getAffectedDocumentsForDeclarationChanges(
    declarations.uri,
    directory,
    [{ kind: 'routine', normalizedName: 'conduza' }]
  );
  assert.ok(fieldImpact.has(consumer.uri));
  assert.ok(variableImpact.has(consumer.uri));
  assert.ok(routineImpact.has(consumer.uri));

  const graph = new DeclarationDependencyGraph(documents);
  const declarationRegions = graph.getRegions(declarations.uri);
  const consumerRegions = graph.getRegions(consumer.uri);
  const carTypeRegion = declarationRegions.find(region =>
    region.region.kind === 'type' &&
    region.region.name === 'carro'
  );
  const consumerTypeRegion = consumerRegions.find(region =>
    region.region.kind === 'type' &&
    region.region.name === 'esportivo'
  );
  const consumerRoutineRegion = consumerRegions.find(region =>
    region.region.kind === 'routine'
  );
  assert.ok(carTypeRegion);
  assert.ok(consumerTypeRegion);
  assert.ok(consumerRoutineRegion);
  assert.ok(graph.edges.some(edge =>
    edge.from.id === consumerTypeRegion.id &&
    edge.to.id === carTypeRegion.id &&
    edge.reference.kind === 'type'
  ));
  const affectedRegions = graph.getAffectedRegionsForDeclarationChanges(
    directory,
    [{ kind: 'field', normalizedName: 'cor', normalizedContainer: 'garagem' }]
  );
  assert.ok(affectedRegions.has(consumerRoutineRegion.id));
});

test('infers a local structure variable from a contracted type in an assignment', () => {
  const { documents } = createWorkspace([
    {
      name: 'types.pop',
      text: [
        'Um byte é um byte.',
        'Um ponteiro é uma estrutura com 4 bytes.',
        'Um endereço de byte é um ponteiro para um byte.',
        'Um caractere é um byte.',
        'Um endereço do caractere é um endereço de byte.',
        'Um número é uma estrutura.',
        'Uma string é uma estrutura.',
        'Uma URL_COMPONENTS é uma estrutura com',
        '  Um endereço do caractere denominado lpszScheme e',
        '  Um número denominado dwSchemeLength.',
        'Um nome do protocolo é uma string.',
        'Uma URL simplificada é uma estrutura com um nome do protocolo.'
      ].join('\n')
    },
    {
      name: 'conversion.pop',
      text: [
        'Rotina para que se converta um ponteiro e um número denominado quantidade de caracteres para uma string:',
        '  Retorne.'
      ].join('\n')
    },
    {
      name: 'caller.pop',
      text: [
        'Rotina para que se teste uma URL simplificada:',
        '  Atribua a magnitude duns URL_COMPONENTS ao dwStructSize destes URL_COMPONENTS.',
        '  Converta o lpszScheme destes URL_COMPONENTS e o dwSchemeLength destes URL_COMPONENTS para o nome do protocolo desta URL simplificada.'
      ].join('\n')
    }
  ]);
  const caller = documents[2].parsed.routines[0];
  const call = caller.calls.find(candidate =>
    candidate.arguments.length === 3
  );

  assert.deepEqual(documents[2].parsed.diagnostics, []);
  assert.ok(caller.localVariables.some(variable =>
    variable.name.normalizedName === 'url_components' &&
    variable.type.normalizedName === 'url_components'
  ));
  assert.equal(call.target.name.normalizedName, 'converta');
  assert.deepEqual(
    call.arguments.map(argument => argument.name),
    [
      'o lpszScheme destes URL_COMPONENTS',
      'o dwSchemeLength destes URL_COMPONENTS',
      'o nome do protocolo desta URL simplificada'
    ]
  );
  assert.deepEqual(
    call.fieldAccesses.map(access => access.target.name.name),
    ['lpszScheme', 'dwSchemeLength', 'nome do protocolo']
  );
});

test('resolves workspace computed fields against the current type catalog', () => {
  const types = parseTypeDeclarations([
    'Um número é uma estrutura.',
    'Um twip é um número.',
    'Uma quantidade de caracteres é uns twips.',
    'Uma string é uma estrutura com',
    '  Um caractere inicial e',
    '  Um caractere final.',
    'Um caractere inicial é um ponteiro para um byte.',
    'Um caractere final é um ponteiro para um byte.',
    'Um ponteiro é uma estrutura com 4 bytes.'
  ].join('\n'));
  const computedField = parseTypeDeclarations([
    'Função para que se determine se um número é um segundo número:',
    '  Diga sim.',
    'Rotina para que se ponha um número em um segundo número:',
    '  Retorne.',
    'Rotina para que se atribua a quantidade de caracteres duma string para uma quantidade de caracteres:',
    '  Retorne.'
  ].join('\n'));
  const declaration = computedField.routines.find(routine =>
    routine.computedField?.name.normalizedName === 'quantidade de caracteres'
  );
  assert.ok(declaration);
  assert.equal(declaration.computedField.valueType, undefined);

  const callerSource = [
    'para que se limpe uma string:',
    '  Se a quantidade de caracteres desta string for 0, retorne.',
    '  Ponha 0 na quantidade de caracteres desta string.'
  ].join('\n');
  const catalog = {
    declarations: types.declarations,
    globalVariables: [],
    routines: computedField.routines
  };
  const parsed = parseTypeDeclarations(callerSource, catalog);
  const syntax = parseTypeDeclarationSyntax(callerSource);
  const routineRegion = syntax.regions.find(region =>
    region.kind === 'routine' && region.name === 'limpe'
  );
  assert.ok(routineRegion);
  const incremental = resolveRoutineSyntaxRegions(
    callerSource,
    syntax,
    [routineRegion],
    catalog
  );

  assert.deepEqual(
    parsed.diagnostics.filter(diagnostic =>
      diagnostic.message.startsWith('No boolean function found') ||
      diagnostic.message.startsWith('No compatible routine found')
    ),
    []
  );
  assert.deepEqual(incremental.diagnostics, []);
});

test('resolves a computed field whose owner is named by its type', () => {
  const { documents } = createWorkspace([
    {
      name: 'types.pop',
      text: [
        'Uma string é uma estrutura.',
        'Um grupo data-hora é uma estrutura.'
      ].join('\n')
    },
    {
      name: 'computed-field.pop',
      text: [
        'Rotina para que se atribua a string dum grupo data-hora para uma string:',
        '  Retorne.'
      ].join('\n')
    },
    {
      name: 'caller.pop',
      text: [
        'Rotina para que se teste:',
        '  Atribua a string deste grupo data-hora à string.'
      ].join('\n')
    }
  ]);
  const caller = documents[2].parsed.routines.find(routine =>
    routine.name.normalizedName === 'teste'
  );

  assert.deepEqual(documents[2].parsed.diagnostics, []);
  assert.ok(caller.computedFieldAccesses.some(access =>
    access.target.name.normalizedName ===
      'atribua a string dum grupo data-hora' &&
    access.target.computedField?.structureType.normalizedName ===
      'grupo data-hora'
  ));
});

test('resolves computed fields owned by a global structure variable', () => {
  const sources = [
    {
      name: 'types.pop',
      text: [
        'Um número é uma estrutura.',
        'Uma localização é um número.'
      ].join('\n')
    },
    {
      name: 'variables.pop',
      text: [
        'O mouse é uma estrutura com',
        '  Um número denominado botão.',
        'O valor é uma localização.'
      ].join('\n')
    },
    {
      name: 'computed-field.pop',
      text: [
        'Rotina para que se atribua a localização deste mouse para uma localização:',
        '  Retorne.'
      ].join('\n')
    },
    {
      name: 'caller.pop',
      text: [
        'Função para que se determine se uma localização estiver na caixa:',
        '  Diga sim.',
        'Rotina para que se teste:',
        '  Se a localização deste mouse estiver na caixa, retorne.'
      ].join('\n')
    }
  ];
  const { documents } = createWorkspace(sources);
  const caller = documents[3].parsed.routines.find(routine =>
    routine.conditionals.length > 0
  );
  const syntax = parseTypeDeclarationSyntax(sources[3].text);
  const callerRegion = syntax.regions.find(region =>
    region.kind === 'routine' &&
    region.range.start === caller?.range.start
  );
  const catalog = {
    declarations: documents.flatMap(document => document.parsed.declarations),
    globalVariables: documents.flatMap(document => document.parsed.globalVariables),
    routines: documents.flatMap(document => document.parsed.routines)
  };
  assert.ok(caller);
  assert.ok(callerRegion);

  assert.deepEqual(documents[3].parsed.diagnostics, []);
  assert.ok(caller.conditionals[0].predicateCall?.computedFieldAccesses?.some(access =>
    access.target.computedField?.globalVariable?.normalizedName === 'mouse'
  ));
  assert.deepEqual(
    resolveRoutineSyntaxRegions(
      sources[3].text,
      syntax,
      [callerRegion],
      catalog
    ).diagnostics,
    []
  );
});

test('resolves explicit atribua routine calls before assignment syntax', () => {
  const source = [
    'Um par de números é uma estrutura.',
    'Uma caixa é uma estrutura com',
    '  Uma coordenada denominada coordenada X1,',
    '  Uma coordenada denominada coordenada Y1,',
    '  Uma coordenada denominada coordenada X2 e',
    '  Uma coordenada denominada coordenada Y2.',
    'Uma localização é um par de números com',
    '  Uma coordenada denominada coordenada X e',
    '  Uma coordenada denominada coordenada Y.',
    'Uma coordenada é uns twips.',
    'Um twip é um número.',
    'Um número é uma estrutura.',
    'para que se faça algo com uma coordenada e uma segunda coordenada para uma localização:',
    '  retorne.',
    'para que se foo o centro duma caixa e uma localização:',
    '  faça algo com a coordenada x1 desta caixa e a coordenada x2 desta caixa para a localização.',
    'Rotina para que se atribua uma coordenada e uma segunda coordenada para uma localização:',
    '  retorne.',
    'Rotina para que se atribua a linha de baixo duma caixa para uma localização:',
    '  Atribua a coordenada X1 desta caixa e a coordenada Y2 desta caixa para a localização.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const caller = parsed.routines.find(routine =>
    routine.name.name.startsWith('foo')
  );
  const computedField = parsed.routines.find(routine => routine.computedField);

  assert.deepEqual(parsed.diagnostics, []);
  assert.equal(caller?.name.normalizedName, 'foo o centro de');
  assert.deepEqual(
    caller?.parameters.map(parameter => parameter.type.normalizedName),
    ['caixa', 'localização']
  );
  assert.equal(caller?.calls[0].target?.name.name, 'faça algo com');
  assert.equal(computedField?.calls[0].target?.name.name, 'atribua');
});

test('resolves computed fields on a list when its plural is also a type name', () => {
  const types = parseTypeDeclarations([
    'Uma lista é uma estrutura.',
    'Uma string é uma estrutura.',
    'Umas listas são uma estrutura.',
    'Um elemento da stack é uma lista com uma string.',
    'Um número é uma estrutura.',
    'Uma contagem é um número.'
  ].join('\n'));
  const variables = parseTypeDeclarations(
    'A stack é uns elementos das stacks.'
  );
  const source = [
    'Função para que se determine se um número é um segundo número:',
    '  Diga sim.',
    'Função para que se determine se a stack possui just one coisa sobre it:',
    '  Se a contagem desta stack for 1, diga sim.',
    '  Diga não.',
    'Rotina para que se atribua a contagem dumas listas para uma contagem:',
    '  Retorne.'
  ].join('\n');
  const catalog = {
    declarations: types.declarations,
    globalVariables: variables.globalVariables,
    routines: []
  };
  const parsed = parseTypeDeclarations(source, catalog);
  const syntax = parseTypeDeclarationSyntax(source);
  const conditionRegion = syntax.regions.find(region =>
    region.kind === 'routine' &&
    source.slice(region.range.start, region.range.end)
      .includes('contagem desta stack')
  );
  assert.ok(conditionRegion);
  const incremental = resolveRoutineSyntaxRegions(
    source,
    syntax,
    [conditionRegion],
    catalog
  );
  const caller = parsed.routines.find(routine =>
    routine.name.normalizedName === 'possui just one coisa sobre it'
  );
  assert.ok(caller);

  assert.deepEqual(
    parsed.diagnostics.filter(diagnostic =>
      diagnostic.message.startsWith('No boolean function found')
    ),
    []
  );
  assert.deepEqual(incremental.diagnostics, []);
  assert.deepEqual(
    caller.calls[0].computedFieldAccesses.map(access =>
      access.reference.name
    ),
    ['contagem']
  );
});

test('keeps routine-local dependency edges within their document', () => {
  const source = [
    'Um byte é um byte.',
    'para que se calcule usando um byte denominado valor:',
    '  Atribua o valor mais 2 para o valor.'
  ].join('\n');
  const { documents } = createWorkspace([
    { name: 'first.pop', text: source },
    { name: 'second.pop', text: source }
  ]);
  const graph = new DeclarationDependencyGraph(documents);
  const localVariableEdges = graph.edges.filter(edge =>
    edge.reference.kind === 'variable' &&
    edge.reference.name === 'valor'
  );

  assert.ok(localVariableEdges.length > 0);
  for (const edge of localVariableEdges) {
    assert.equal(edge.from.uri, edge.to.uri);
  }
});

test('tracks ambiguous type aliases and unresolved routine calls conservatively', () => {
  const aliasDocuments = createWorkspace([
    {
      name: 'aliases.pop',
      text: [
        'Uma coordenada é uma estrutura.',
        'Uma caixa é uma estrutura com uma nome coordenada.'
      ].join('\n')
    },
    {
      name: 'calls.pop',
      text: [
        'Rotina para que se teste:',
        '  Execute.',
        '  Retorne.'
      ].join('\n')
    }
  ]);
  const aliasGraph = new DeclarationDependencyGraph(aliasDocuments.documents);
  const aliasRegion = aliasGraph.nodes.find(node =>
    node.region.kind === 'type' && node.region.name === 'caixa'
  );
  const callRegion = aliasGraph.nodes.find(node =>
    node.region.kind === 'routine' && node.region.name === 'teste'
  );
  assert.ok(aliasRegion);
  assert.ok(callRegion);
  const typeImpact = aliasGraph.getAffectedRegionsForDeclarationChanges(
    directory,
    [{ kind: 'type', normalizedName: 'coordenada' }]
  );
  const routineImpact = aliasGraph.getAffectedRegionsForDeclarationChanges(
    directory,
    [{ kind: 'routine', normalizedName: 'execute' }]
  );
  assert.ok(typeImpact.has(aliasRegion.id));
  assert.ok(routineImpact.has(callRegion.id));
  assert.ok(aliasGraph.unresolvedReferenceCount > 0);
});

test('computes conservative impact for added and removed declarations', () => {
  const { documents, index } = createWorkspace([
    { name: 'types.pop', text: 'Uma pessoa é uma estrutura.' },
    { name: 'client.pop', text: 'Um cliente é uma pessoa.' },
    { name: 'unresolved.pop', text: 'Uma sessão é uma conta ausente.' }
  ]);
  const [types, client, unresolved] = documents;

  const removedTypeImpact = index.getAffectedDocumentsForDeclarationChanges(
    types.uri,
    directory,
    [{ kind: 'type', normalizedName: 'pessoa' }]
  );
  assert.ok(removedTypeImpact.has(client.uri));

  const addedTypeImpact = index.getAffectedDocumentsForDeclarationChanges(
    types.uri,
    directory,
    [{ kind: 'type', normalizedName: 'conta ausente' }]
  );
  assert.ok(addedTypeImpact.has(unresolved.uri));

  const graph = new DeclarationDependencyGraph(documents);
  const unresolvedRegion = graph.getRegions(unresolved.uri).find(region =>
    region.region.kind === 'type'
  );
  const addedTypeRegions = graph.getAffectedRegionsForDeclarationChanges(
    directory,
    [{ kind: 'type', normalizedName: 'conta ausente' }]
  );
  assert.ok(graph.unresolvedReferenceCount > 0);
  assert.ok(unresolvedRegion);
  assert.ok(addedTypeRegions.has(unresolvedRegion.id));
});

test('propagates rename impact through resolved and unresolved dependencies', () => {
  const { documents, index } = createWorkspace([
    { name: 'types.pop', text: 'Uma pessoa é uma estrutura.' },
    { name: 'derived.pop', text: 'Um cliente é uma pessoa.' },
    { name: 'consumer.pop', text: 'Um pedido é um cliente.' },
    { name: 'unresolved.pop', text: 'Uma sessão é uma conta ausente.' },
    { name: 'unrelated.pop', text: 'Uma palavra é um byte.' }
  ]);
  const [types, derived, consumer, unresolved, unrelated] = documents;
  const affected = index.getAffectedDocumentsForDeclarationChanges(
    types.uri,
    directory,
    [
      { kind: 'type', normalizedName: 'pessoa' },
      { kind: 'type', normalizedName: 'conta ausente' }
    ]
  );

  assert.ok(affected.has(types.uri));
  assert.ok(affected.has(derived.uri));
  assert.ok(affected.has(consumer.uri));
  assert.ok(affected.has(unresolved.uri));
  assert.equal(affected.has(unrelated.uri), false);
});

test('tracks unresolved routine, variable, and field names for additions', () => {
  const { documents, index } = createWorkspace([
    {
      name: 'types.pop',
      text: [
        'Uma posição é uma estrutura.',
        'Um retângulo é uma estrutura.'
      ].join('\n')
    },
    {
      name: 'consumer.pop',
      text: [
        'para que se faça algo com um retângulo:',
        '  Empilhe o valor ausente.',
        '  Atribua o diâmetro deste retângulo para uma posição.',
        '  Chame a rotina ausente.'
      ].join('\n')
    }
  ]);
  const consumer = documents[1];
  assert.ok(consumer.parsed.diagnostics.some(diagnostic =>
    diagnostic.message.startsWith('Unknown variable "valor ausente"')
  ));
  assert.ok(consumer.parsed.diagnostics.some(diagnostic =>
    diagnostic.message.startsWith('Unknown structure field access')
  ));
  assert.ok(consumer.parsed.diagnostics.some(diagnostic =>
    diagnostic.message.startsWith('No compatible routine found')
  ));

  const addedDeclarationUri = `${directory}/new-declarations.pop`;
  const impacts = [
    { kind: 'variable', normalizedName: 'valor ausente' },
    { kind: 'field', normalizedName: 'diâmetro', normalizedContainer: 'retângulo' },
    { kind: 'routine', normalizedName: 'rotina ausente' }
  ];
  for (const change of impacts) {
    const affected = index.getAffectedDocumentsForDeclarationChanges(
      addedDeclarationUri,
      directory,
      [change]
    );
    assert.ok(affected.has(consumer.uri), `${change.kind} addition should invalidate consumer`);
  }
});

test('diagnoses missing routines with multiword and hyphenated names', () => {
  const parsed = parseTypeDeclarations([
    'para que se execute o programa:',
    '  foo.',
    '  foo bar.',
    '  f-o-o.',
    '  really long function name call with spaces.'
  ].join('\n'));

  assert.deepEqual(
    parsed.diagnostics.map(diagnostic => diagnostic.message),
    [
      'No compatible routine found for "foo".',
      'No compatible routine found for "foo bar".',
      'No compatible routine found for "f-o-o".',
      'No compatible routine found for "really long function name call with spaces".'
    ]
  );
});

test('keeps cyclic base-type dependencies finite and queryable', () => {
  const { documents, index } = createWorkspace([
    { name: 'first.pop', text: 'Um primeiro é um segundo.' },
    { name: 'second.pop', text: 'Um segundo é um primeiro.' }
  ]);
  const [first, second] = documents;

  assert.ok(index.getDependencies(first.uri).has(second.uri));
  assert.ok(index.getDependencies(second.uri).has(first.uri));
  assert.equal(index.hasDependencyCycle(first.uri), true);
  assert.equal(index.getAffectedDocuments(first.uri).size, 2);
});

test('reports duplicate declarations across documents in one directory', () => {
  const { documents } = createWorkspace([
    { name: 'first.pop', text: 'Uma pessoa é uma estrutura.' },
    { name: 'second.pop', text: 'Uma pessoa é uma estrutura.' }
  ]);
  const duplicates = getWorkspaceDuplicateDeclarations(documents);

  assert.equal(duplicates.size, 1);
  const duplicate = duplicates.get(documents[1].uri);
  assert.equal(duplicate.length, 1);
  assert.equal(duplicate[0].kind, 'type');
  assert.equal(duplicate[0].name, 'pessoa');
});

test('projects allocation, deallocation, and external process operations', () => {
  const source = [
    'Um ponteiro é uma estrutura.',
    'Uma lista é um ponteiro para uma lista estruturada.',
    'Uma lista estruturada é uma estrutura.',
    'Um versículo é uma lista.',
    'Uma imagem é uma lista.',
    'A imagem é uma imagem.',
    'Um catálogo é uma lista.',
    'A referência é um catálogo.',
    'para que se libere:',
    '  Destrua a referência.',
    'para que se faça algumas alocações:',
    '  Aloque memória para um versículo.',
    '  Aloque memória para a imagem.',
    'para que se feche a área de transferência:',
    '  Processe "user32.dll" "CloseClipboard".'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const analysis = getDocumentAnalysis(parsed, source.length);
  const nodes = [...analysis.nodes.values()];
  const allocation = nodes.find(node => node.kind === 'memory-allocation');
  const deallocation = nodes.find(node => node.kind === 'memory-deallocation');
  const process = nodes.find(node => node.kind === 'process');

  assert.deepEqual(parsed.diagnostics, []);
  assert.ok(allocation?.memoryAllocation);
  assert.ok(deallocation?.memoryDeallocation);
  assert.equal(process?.process.kind, 'external');
  assert.equal(
    allocation.memoryAllocation,
    parsed.routines.flatMap(routine => routine.memoryAllocations)[0]
  );
  assert.equal(
    deallocation.memoryDeallocation,
    parsed.routines.flatMap(routine => routine.memoryDeallocations)[0]
  );
  assert.equal(
    process.process,
    parsed.routines.flatMap(routine => routine.processes)[0]
  );
  for (const operation of [allocation, deallocation, process]) {
    const statement = analysis.nodes.get(operation.parentId);
    assert.equal(statement.kind, 'statement');
    assert.ok(statement.childIds.includes(operation.id));
    assert.ok(statement.range.start <= operation.range.start);
    assert.ok(statement.range.end >= operation.range.end);
  }
});

test('resolves nested pointer fields and deallocates pointer-backed local structures', () => {
  const { documents } = createWorkspace([
    {
      name: 'types.pop',
      text: [
        'Um número é uma estrutura.',
        'Um ponteiro é uma estrutura com 4 bytes.',
        'Um hRgn é um ponteiro.',
        'Uma localização é uma estrutura.',
        'Um ponteiro da localização é um ponteiro para uma localização.',
        'Uma quantidade de vértices é um número.',
        'Uma série de vértices conjunto é uma estrutura com',
        '  Uma quantidade de vértices e',
        '  Um ponteiro da localização.',
        'Uma série de vértices é um ponteiro para uma série de vértices conjunto.',
        'Uma lista estruturada é uma estrutura.',
        'Uma lista é um ponteiro para uma lista estruturada.',
        'Um vértice é uma lista.',
        'Um polígono é uma lista com uns vértices.'
      ].join('\n')
    },
    {
      name: 'routines.pop',
      text: [
        'Rotina para que se crie uma série de vértices usando uns vértices:',
        '  Retorne.'
      ].join('\n')
    },
    {
      name: 'caller.pop',
      text: [
        'Rotina para que se crie uma hRgn usando um polígono:',
        '  Crie uma série de vértices usando os vértices deste polígono.',
        '  Crie uma série de vértices com os vértices deste polígono.',
        '  Processe "gdi32.dll" "LPtoDP" com',
        '    O ponteiro da localização desta série de vértices [lppt] e',
        '    A quantidade de vértices desta série de vértices [c].',
        '  Processe "gdi32.dll" "CreatePolygonRgn" com',
        '    O ponteiro da localização desta série de vértices [*pptl] e',
        '    A quantidade de vértices desta série de vértices [cPoint] e',
        '    2 [iMode = WINDING]',
        '  Retornando o hRgn.',
        '  Destrua a série de vértices.'
      ].join('\n')
    }
  ]);
  const parsed = documents[2].parsed;
  const caller = parsed.routines[0];
  const processes = caller.processes;
  const deallocation = caller.memoryDeallocations[0];

  assert.deepEqual(parsed.diagnostics, []);
  assert.ok(caller.localVariables.some(variable =>
    variable.name.normalizedName === 'série de vértices' &&
    variable.type.normalizedName === 'série de vértices'
  ));
  assert.equal(processes.length, 2);
  assert.deepEqual(
    processes.map(process =>
      process.fieldAccesses.map(access => access.target.name.name)
    ),
    [
      ['ponteiro da localização', 'quantidade de vértices'],
      ['ponteiro da localização', 'quantidade de vértices']
    ]
  );
  assert.equal(deallocation.type.normalizedName, 'série de vértices');
});

test('resolves expressions in external process arguments', () => {
  const source = [
    'Um número é uma estrutura.',
    'Uma string é uma estrutura.',
    'Uma fonte é uma estrutura com um número denominado altura.',
    'A fonte é uma fonte.',
    'A mensagem é "olá".',
    'Rotina para que se teste:',
    '  Processe "lib.dll" "func" com',
    '   - A altura desta fonte mais 2 menos 1 vezes 3 dividido por 4 e',
    '     A mensagem junto com "!" seguido de "?" e',
    '     - A altura desta fonte.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const process = parsed.routines[0].processes[0];

  assert.deepEqual(parsed.diagnostics, []);
  assert.deepEqual(
    process.arguments.map(argument => argument.name),
    [
      '- A altura desta fonte mais 2 menos 1 vezes 3 dividido por 4',
      'A mensagem junto com "!" seguido de "?"',
      '- A altura desta fonte'
    ]
  );
  assert.deepEqual(
    process.argumentTypes.map(type => type.name),
    ['fração', 'string', 'número']
  );
  assert.ok(process.fieldAccesses.some(access =>
    access.target.name.name === 'altura'
  ));
});

test('resolves numeric concatenation as one routine argument', () => {
  const declarations = [
    'Um número é uma estrutura.',
    'Uma string é uma estrutura.',
    'Um relatório é uma string.'
  ];
  const conversion = [
    'Rotina para que se atribua um número para uma string;',
    'Rotina para que se converta um número para uma string:',
    '  Retorne.'
  ];
  const reportRoutines = [
    'Rotina para que se produza o relatório de informações usando um relatório:',
    '  Retorne.',
    'Rotina para que se produza o relatório de informações usando um número e um segundo número:',
    '  Produza o relatório de informações usando o número seguido de ", " junto com o segundo número.',
    '  Retorne.'
  ];
  const parsed = parseTypeDeclarations([
    ...declarations,
    ...conversion,
    ...reportRoutines
  ].join('\n'));
  const caller = parsed.routines.find(routine =>
    routine.name.normalizedName === 'produza o relatório de informações usando' &&
    routine.parameters.length === 2
  );
  const call = caller.calls[0];

  assert.deepEqual(parsed.diagnostics, []);
  assert.equal(call.target.name.normalizedName, 'produza o relatório de informações usando');
  assert.deepEqual(
    call.target.parameters.map(parameter => parameter.type.normalizedName),
    ['relatório']
  );
  assert.deepEqual(
    call.arguments.map(argument => argument.name),
    ['o número seguido de ", " junto com o segundo número']
  );

  const withoutConversion = parseTypeDeclarations([
    ...declarations,
    ...reportRoutines
  ].join('\n'));
  assert.ok(withoutConversion.diagnostics.some(diagnostic =>
    diagnostic.message.startsWith('No compatible routine found')
  ));
});

test('resolves unary negative expressions in every routine argument position', () => {
  const source = [
    'Um número é uma estrutura.',
    'O valor é 1.',
    'Rotina para que se use um número denominado primeiro e um número denominado segundo e um número denominado terceiro:',
    '  Retorne.',
    'Rotina para que se teste:',
    '  Use - O valor e O valor e - O valor.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const caller = parsed.routines.find(routine =>
    routine.name.normalizedName === 'teste'
  );
  const call = caller.calls[0];

  assert.deepEqual(parsed.diagnostics, []);
  assert.equal(call.target.name.normalizedName, 'use');
  assert.deepEqual(
    call.arguments.map(argument => argument.name),
    ['- O valor', 'O valor', '- O valor']
  );
});

test('resolves slash-containing names and slash-separated fractions', () => {
  const source = [
    'Um número é uma estrutura.',
    'Um twip é um número.',
    'Uma fração é um número.',
    'A quantidade de twips/pixel é uns twips.',
    'O numerador é um número.',
    'O denominador é um número.',
    'Uma caixa é uma estrutura.',
    'A caixa é uma caixa.',
    'A segunda fração é uma fração.',
    'Rotina para que se ajuste uma caixa usando um número e um segundo número e um terceiro número e um quarto número:',
    '  Retorne.',
    'Rotina para que se use uma fração:',
    '  Retorne.',
    'Rotina para que se teste:',
    '  Ajuste a caixa usando 0 e a quantidade de twips/pixel e 0 e - a quantidade de twips/pixel.',
    '  Atribua 3/4 para a segunda fração.',
    '  Atribua o numerador / o denominador para a segunda fração.',
    '  Use 6 dividido por 2.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const caller = parsed.routines.find(routine =>
    routine.name.normalizedName === 'teste'
  );
  const [call, fractionCall] = caller.calls;

  assert.deepEqual(parsed.diagnostics, []);
  assert.equal(call.target.name.normalizedName, 'ajuste');
  assert.equal(fractionCall.target.name.normalizedName, 'use');
  assert.equal(
    fractionCall.target.parameters[0].type.normalizedName,
    'fração'
  );
  assert.equal(caller.assignments[0].expression.kind, 'operand');
  assert.equal(caller.assignments[0].expression.text, '3/4');
  assert.equal(caller.assignments[1].expression.operator, '/');
  assert.equal(
    caller.calls[0].arguments[2].name,
    'a quantidade de twips/pixel'
  );
  assert.deepEqual(
    call.arguments.map(argument => argument.name),
    [
      'a caixa',
      '0',
      'a quantidade de twips/pixel',
      '0',
      '- a quantidade de twips/pixel'
    ]
  );
  assert.ok(call.variableAccesses.some(access =>
    access.reference.name === 'quantidade de twips/pixel'
  ));
});

test('resolves internal function pointers through nested pointer fields', () => {
  const source = [
    'Um ponteiro é uma estrutura com 4 bytes.',
    'Rotina para que se finalize um sintetizador de voz:',
    '  Processe o Release desta VTable deste sintetizador de voz com o sintetizador de voz.',
    'Um sintetizador de voz é um ponteiro para um objeto sintetizador de voz.',
    'Um objeto sintetizador de voz é uma estrutura com um identificador VTable denominado VTable.',
    'Um identificador VTable é um ponteiro para um sintetizador de voz VTable.',
    'Um sintetizador de voz VTable é uma estrutura com um ponteiro denominado Release.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const process = parsed.routines.flatMap(routine => routine.processes)[0];

  assert.deepEqual(parsed.diagnostics, []);
  assert.equal(process?.kind, 'internal');
  assert.deepEqual(
    process?.fieldAccesses.map(access => access.target.name.name),
    ['VTable', 'Release']
  );
});

test('projects decoded-literal and push instructions as typed statements', () => {
  const source = [
    'Um byte não assinado é um byte.',
    'Uma sequência é uma estrutura.',
    'Uma palavra é uma estrutura.',
    'Uma contagem é uma palavra.',
    'Um número é um byte não assinado.',
    'O valor é um número.',
    'A sequência é uma sequência.',
    'para que se processe:',
    '  Decodifique $ff.',
    '  Empilhe o valor.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const analysis = getDocumentAnalysis(parsed, source.length);
  const nodes = [...analysis.nodes.values()];

  const decode = nodes.find(node => node.kind === 'decode-instruction');
  const push = nodes.find(node => node.kind === 'push-instruction');

  assert.equal(decode.simpleInstruction.literal.kind, 'hexadecimal');
  assert.equal(decode.simpleInstruction.literal.text, '$ff');
  assert.equal(decode.simpleInstruction.isValid, true);
  assert.equal(push.simpleInstruction.isValid, true);
  assert.equal(push.simpleInstruction.variableAccesses.length, 1);
  const pushedVariable = push.simpleInstruction.variableAccesses[0];
  assert.equal(
    source.slice(pushedVariable.reference.range.start, pushedVariable.reference.range.end),
    'valor'
  );
  assert.ok(analysis.references.some(reference =>
    reference.kind === 'variable' &&
    reference.range.start === pushedVariable.reference.range.start
  ));
  assert.ok(nodes.some(node =>
    node.kind === 'variable-access' &&
    node.variableAccess === pushedVariable
  ));
});

test('preserves structured conditional targets and expression operators', () => {
  const source = [
    'Uma string é uma estrutura.',
    'Um subtexto é uma string.',
    'O subtexto é um subtexto.',
    'O segmento é um subtexto.',
    'Um número é uma estrutura.',
    'O valor é um número.',
    'para que se faça algo:',
    '  Se o segmento for igual ao subtexto,',
    '    retorne.',
    '  Atribua -1 mais +2 para o valor.',
    'para que se determine se uma string é igual a uma segunda string:',
    '  Diga sim.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const analysis = getDocumentAnalysis(parsed, source.length);
  const nodes = [...analysis.nodes.values()];
  const condition = nodes.find(node => node.kind === 'condition-expression');
  const conditional = nodes.find(node => node.kind === 'conditional');

  assert.ok(condition?.conditionExpression);
  assert.equal(
    conditional?.conditional,
    parsed.routines.flatMap(routine => routine.conditionals)[0]
  );
  assert.equal(
    condition.conditionExpression.condition.name,
    'o segmento for igual ao subtexto'
  );
  assert.ok(condition.conditionExpression.target);
  assert.equal(
    condition.conditionExpression.predicateCall.target,
    condition.conditionExpression.target
  );
  assert.deepEqual(
    condition.conditionExpression.predicateCall.arguments,
    condition.conditionExpression.arguments
  );
  const parentById = new Map(nodes.map(node => [node.id, node]));
  let ancestor = nodes.find(node =>
    node.kind === 'routine-call' &&
    node.routineCall?.target === condition.conditionExpression.target
  );
  let hasConditionAncestor = false;
  while (ancestor) {
    hasConditionAncestor ||= ancestor.id === condition.id;
    ancestor = ancestor.parentId === undefined
      ? undefined
      : parentById.get(ancestor.parentId);
  }
  assert.equal(hasConditionAncestor, true);
  assert.equal(condition.conditionExpression.arguments.length, 2);
  for (const argument of condition.conditionExpression.arguments) {
    const argumentNodes = nodes.filter(node =>
      node.kind === 'argument' &&
      node.range.start === argument.range.start &&
      node.range.end === argument.range.end
    );
    assert.equal(argumentNodes.length, 1);
    assert.equal(parentById.get(argumentNodes[0].parentId).kind, 'routine-call');
  }

  const binary = nodes.find(node =>
    node.kind === 'binary-expression' && node.expression?.operator === 'mais'
  );
  const unaryOperators = nodes
    .filter(node => node.kind === 'unary-expression')
    .map(node => node.expression.operator);
  assert.ok(binary);
  assert.equal(
    source.slice(
      binary.expression.operatorRange.start,
      binary.expression.operatorRange.end
    ),
    'mais'
  );
  assert.ok(unaryOperators.includes('-'));
  assert.ok(unaryOperators.includes('+'));
  for (const unary of nodes.filter(node =>
    node.kind === 'unary-expression'
  )) {
    assert.equal(
      source.slice(
        unary.expression.operatorRange.start,
        unary.expression.operatorRange.end
      ),
      unary.expression.operator
    );
  }
});

test('preserves every parsed expression operator as an exact AST range', () => {
  const operators = [
    'mais',
    'menos',
    'vezes',
    'dividido por',
    'junto com',
    'seguido de'
  ];
  const source = [
    'O número é um byte.',
    'Rotina para que se calcule:',
    ...operators.map(operator =>
      `  Atribua 1 ${operator} 2 para o número.`
    ),
    '  Atribua -1 para o número.',
    '  Atribua +2 para o número.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const analysis = getDocumentAnalysis(parsed, source.length);
  const expressions = [...analysis.nodes.values()]
    .filter(node => node.kind === 'binary-expression')
    .map(node => node.expression);
  const unaryExpressions = [...analysis.nodes.values()]
    .filter(node => node.kind === 'unary-expression')
    .map(node => node.expression);

  assert.deepEqual(parsed.diagnostics, []);
  assert.deepEqual(
    expressions.map(expression => [
      expression.operator,
      source.slice(
        expression.operatorRange.start,
        expression.operatorRange.end
      )
    ]),
    operators.map(operator => [operator, operator])
  );
  assert.deepEqual(
    unaryExpressions.map(expression => [
      expression.operator,
      source.slice(
        expression.operatorRange.start,
        expression.operatorRange.end
      )
    ]),
    [['-', '-'], ['+', '+']]
  );
});

test('segments expression operands into source text and resolved references', () => {
  const source = [
    'Um byte é um byte.',
    'para que se calcule usando um byte denominado valor:',
    '  Atribua o valor mais 2 para o valor.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const analysis = getDocumentAnalysis(parsed, source.length);
  const operandNodes = [...analysis.nodes.values()].filter(node =>
    node.kind === 'expression-operand'
  );
  const operandWithReference = operandNodes.find(node =>
    node.expressionOperandParts?.some(part => part.kind === 'reference')
  );

  assert.deepEqual(parsed.diagnostics, []);
  assert.ok(operandWithReference);
  for (const operand of operandNodes) {
    const parts = operand.expressionOperandParts;
    assert.ok(parts);
    assert.equal(
      parts.map(part => part.text).join(''),
      operand.expression.text
    );
    assert.equal(parts[0].range.start, operand.range.start);
    assert.equal(parts.at(-1).range.end, operand.range.end);
    for (const part of parts) {
      assert.equal(
        source.slice(part.range.start, part.range.end),
        part.text
      );
      if (part.kind === 'reference') {
        assert.ok(analysis.getSymbol(part.reference));
      }
    }
  }
});

test('keeps rejected nested conditionals as diagnosed source ranges', () => {
  const source = [
    'Rotina para que se foo:',
    '  Se inexistente,',
    '    Se também inexistente,',
    '      Bar;',
    '    Retorne.',
    'Rotina para que se bar:',
    '  Retorne.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const analysis = getDocumentAnalysis(parsed, source.length);
  const conditionals = [...analysis.nodes.values()].filter(node =>
    node.kind === 'conditional'
  );
  const conditionExpressions = [...analysis.nodes.values()].filter(node =>
    node.kind === 'condition-expression'
  );
  const nestedDiagnostic = [...analysis.nodes.values()].find(node =>
    node.kind === 'parser-diagnostic' &&
    node.parserDiagnostic?.message === 'Conditional blocks cannot be nested.'
  );

  assert.equal(conditionals.length, 1);
  assert.equal(conditionExpressions.length, 1);
  assert.ok(conditionExpressions[0].conditionExpression);
  assert.ok(nestedDiagnostic);
  assert.equal(
    source.slice(
      nestedDiagnostic.range.start,
      nestedDiagnostic.range.end
    ),
    'Se'
  );
});

test.skip('projects explicit loop bodies and nested conditional bodies', () => {
  const source = [
    'Uma string é uma estrutura.',
    'Rotina para que se faça algo:',
    '  Atribua "antes" para uma string denominada antes.',
    '  Itere.',
    '    Atribua "dentro" para uma string denominada dentro.',
    '    Se válido, reitere.',
    '    Pare.',
    '  Reitere.',
    '  Atribua "depois" para uma string denominada depois.',
    'Rotina para que se determine se válido:',
    '  Diga sim.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const analysis = getDocumentAnalysis(parsed, source.length);
  const routine = parsed.routines[0];
  const routineNode = [...analysis.nodes.values()].find(node =>
    node.kind === 'routine-declaration' &&
    node.routineDeclaration === routine
  );
  const routineBody = analysis.nodes.get(routineNode.childIds.find(childId =>
    analysis.nodes.get(childId).kind === 'routine-body'
  ));
  const loop = [...analysis.nodes.values()].find(node =>
    node.kind === 'loop-block'
  );
  const loopBody = analysis.nodes.get(loop.childIds.find(childId =>
    analysis.nodes.get(childId).kind === 'loop-body'
  ));
  const conditional = [...analysis.nodes.values()].find(node =>
    node.kind === 'conditional'
  );
  const conditionalBody = analysis.nodes.get(
    conditional.childIds.find(childId =>
      analysis.nodes.get(childId).kind === 'conditional-body'
    )
  );
  const statementText = statement => source.slice(
    statement.range.start,
    statement.range.end
  );
  assert.deepEqual(parsed.diagnostics, []);
  assert.equal(routine.loopBlocks.length, 1);
  assert.equal(routine.loopBlocks[0].kind, 'explicit');
  assert.equal(routine.loopBlocks[0].complete, true);
  assert.equal(
    source.slice(
      routine.loopBlocks[0].startInstruction.range.start,
      routine.loopBlocks[0].endInstruction.range.end
    ),
    'Itere.\n    Atribua "dentro" para uma string denominada dentro.\n' +
      '    Se válido, reitere.\n    Pare.\n  Reitere'
  );
  assert.equal(loop.parentId, routineBody.id);
  assert.equal(loopBody.parentId, loop.id);
  assert.equal(conditional.parentId, loopBody.id);
  assert.equal(conditionalBody.parentId, conditional.id);
  assert.ok(loop.childIds
    .map(childId => analysis.nodes.get(childId))
    .some(statement => statement.kind === 'statement' &&
    statementText(statement).startsWith('Itere')
    ));
  assert.ok(conditionalBody.childIds
    .map(childId => analysis.nodes.get(childId))
    .some(statement => statement.kind === 'statement' &&
      statementText(statement) === 'reitere'));
  const outerStatements = routineBody.childIds
    .map(childId => analysis.nodes.get(childId))
    .filter(node => node.kind === 'statement');
  assert.ok(outerStatements.some(statement =>
    statementText(statement).startsWith('Atribua "antes"')
  ));
  assert.ok(outerStatements.some(statement =>
    statementText(statement).startsWith('Atribua "depois"')
  ));

  for (const node of analysis.nodes.values()) {
    if (node.parentId === undefined) {
      continue;
    }
    const parent = analysis.nodes.get(node.parentId);
    assert.ok(parent.range.start <= node.range.start);
    assert.ok(parent.range.end >= node.range.end);
  }
});

test('models implicit and incomplete loop bodies without inventing delimiters', () => {
  const implicitSource = [
    'Rotina para que se faça algo:',
    '  Se válido, reitere.',
    '  Atribua 1 mais 2 para uma quantidade.',
    '  Reitere.'
  ].join('\n');
  const implicitParsed = parseTypeDeclarations(implicitSource);
  const implicitAnalysis = getDocumentAnalysis(
    implicitParsed,
    implicitSource.length
  );
  const implicitLoop = [...implicitAnalysis.nodes.values()].find(node =>
    node.kind === 'loop-block'
  );
  const implicitRoutine = implicitParsed.routines[0];

  assert.equal(implicitRoutine.loopBlocks.length, 1);
  assert.equal(implicitRoutine.loopBlocks[0].kind, 'implicit');
  assert.equal(implicitRoutine.loopBlocks[0].complete, true);
  assert.deepEqual(implicitRoutine.loopBlocks[0].range, implicitRoutine.bodyRange);
  assert.ok(implicitLoop);

  const incompleteSource = [
    'Rotina para que se faça algo:',
    '  Itere.',
    '  Atribua 1 mais 2 para uma quantidade.'
  ].join('\n');
  const incompleteParsed = parseTypeDeclarations(incompleteSource);
  const incompleteRoutine = incompleteParsed.routines[0];
  const incompleteAnalysis = getDocumentAnalysis(
    incompleteParsed,
    incompleteSource.length
  );
  const incompleteLoop = [...incompleteAnalysis.nodes.values()].find(node =>
    node.kind === 'loop-block'
  );

  assert.equal(incompleteRoutine.loopBlocks.length, 1);
  assert.equal(incompleteRoutine.loopBlocks[0].kind, 'explicit');
  assert.equal(incompleteRoutine.loopBlocks[0].complete, false);
  assert.equal(
    incompleteRoutine.loopBlocks[0].range.end,
    incompleteRoutine.bodyRange.end
  );
  assert.equal(incompleteLoop.routineLoopBlock.complete, false);
});

test.skip('nests explicit loop blocks and assigns statements to their nearest body', () => {
  const source = [
    'Rotina para que se faça algo:',
    '  Itere.',
    '    Atribua 1 mais 2 para uma quantidade.',
    '    Itere.',
    '      Atribua 3 mais 4 para uma quantidade.',
    '    Reitere.',
    '    Atribua 5 mais 6 para uma quantidade.',
    '  Reitere.'
  ].join('\n');
  const parsed = parseTypeDeclarations(source);
  const analysis = getDocumentAnalysis(parsed, source.length);
  const loops = [...analysis.nodes.values()]
    .filter(node => node.kind === 'loop-block')
    .sort((first, second) => first.range.start - second.range.start);
  const loopBodies = loops.map(loop => analysis.nodes.get(
    loop.childIds.find(childId =>
      analysis.nodes.get(childId).kind === 'loop-body'
    )
  ));
  const routineBody = [...analysis.nodes.values()].find(node =>
    node.kind === 'routine-body'
  );
  const statementText = statement => source.slice(
    statement.range.start,
    statement.range.end
  );
  const statements = body => body.childIds
    .map(childId => analysis.nodes.get(childId))
    .filter(node => node.kind === 'statement');

  assert.deepEqual(parsed.diagnostics, []);
  assert.equal(loops.length, 2);
  assert.equal(loops[0].parentId, routineBody.id);
  assert.equal(loopBodies[0].parentId, loops[0].id);
  assert.equal(loops[1].parentId, loopBodies[0].id);
  assert.equal(loopBodies[1].parentId, loops[1].id);
  assert.ok(loops[0].range.start <= loops[1].range.start);
  assert.ok(loops[0].range.end >= loops[1].range.end);
  for (const [index, loop] of loops.entries()) {
    const closingInstruction = loop.childIds
      .map(childId => analysis.nodes.get(childId))
      .find(child => child.kind === 'statement' &&
        statementText(child).startsWith('Reitere'));
    assert.ok(closingInstruction);
    assert.equal(
      statements(loopBodies[index]).includes(closingInstruction),
      false
    );
  }
  assert.ok(loops[1].childIds
    .map(childId => analysis.nodes.get(childId))
    .some(statement => statement.kind === 'statement' &&
      statementText(statement).startsWith('Itere')
  ));
  assert.ok(statements(loopBodies[0]).some(statement =>
    statementText(statement).startsWith('Atribua 5')
  ));
  assert.ok(statements(loopBodies[1]).some(statement =>
    statementText(statement).startsWith('Atribua 3')
  ));
  assert.equal(
    statements(loopBodies[0]).some(statement =>
      statementText(statement).startsWith('Atribua 3')
    ),
    false
  );
});
