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
        routines: previous.routines
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
        routines: previous.routines
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
        routines: previous.routines
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
  const metrics = {};
  const verificationResults = [];
  const incrementalOptions = {
    incrementalRoutineResolution: true,
    verifyIncrementalRoutineResolution: true,
    onIncrementalVerification: matched => verificationResults.push(matched),
    reusableRoutineRegions: {
      source,
      routines: previous.routines
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

test('projects parser declaration and routine records into typed syntax nodes', () => {
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

test('projects explicit and implicit local declarations from assignments', () => {
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
    'seguido de',
    '/'
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

test('projects explicit loop bodies and nested conditional bodies', () => {
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

test('nests explicit loop blocks and assigns statements to their nearest body', () => {
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
