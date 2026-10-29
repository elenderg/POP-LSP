import pluralize from './plural';

export interface SourceRange {
  start: number;
  end: number;
}

export interface TypeReference {
  name: string;
  normalizedName: string;
  range: SourceRange;
}

export interface NamedTypeField {
  kind: 'named';
  type: TypeReference;
  name: TypeReference;
  unionTarget?: TypeReference;
  usesTypeAlias: boolean;
  isReference: boolean;
}

export interface ByteArrayField {
  kind: 'byte-array';
  count: string;
  elementType: TypeReference;
  range: SourceRange;
}

export type TypeField = NamedTypeField | ByteArrayField;

export interface ParserDiagnostic {
  message: string;
  range: SourceRange;
  severity?: 'error' | 'hint';
}

export interface TypeDeclaration {
  kind: 'type-declaration';
  name: TypeReference;
  baseType: TypeReference;
  pointedType?: TypeReference;
  fields?: TypeField[];
  scalarFactor?: string;
  operator: 'é' | 'são';
  range: SourceRange;
}

export interface GlobalVariableDeclaration {
  kind: 'global-variable-declaration';
  name: TypeReference;
  type?: TypeReference;
  inferredTypeName?: string;
  initializer?: GlobalVariableLiteral;
  fields?: TypeField[];
  article: string;
  operator: 'é' | 'são';
  range: SourceRange;
}

export interface GlobalVariableLiteral {
  kind: 'integer' | 'fraction' | 'mixed' | 'hexadecimal' | 'string';
  text: string;
  range: SourceRange;
}

export interface RoutineParameter {
  name: TypeReference;
  type: TypeReference;
}

export interface PreservedRoutineParameter {
  parameter: RoutineParameter;
  copyName: string;
  originalName: string;
  range: SourceRange;
}

export type ExpressionOperator =
  | 'mais'
  | 'menos'
  | 'vezes'
  | 'dividido por'
  | 'junto com'
  | 'seguido de';

export interface RoutineExpressionOperand {
  kind: 'operand';
  text: string;
  range: SourceRange;
}

export interface RoutineExpressionBinary {
  kind: 'binary';
  operator: ExpressionOperator;
  left: RoutineExpression;
  right: RoutineExpression;
  range: SourceRange;
}

export type RoutineExpression = RoutineExpressionOperand | RoutineExpressionBinary;

export interface RoutineAssignment {
  target: TypeReference;
  expression: RoutineExpression;
  range: SourceRange;
}

export interface RoutineOutput {
  expression: RoutineExpression;
  destination: TypeReference;
  range: SourceRange;
}

export interface RoutineLocalVariable {
  name: TypeReference;
  type: TypeReference;
  range: SourceRange;
}

export interface RoutineConditionalBlock {
  condition: TypeReference;
  conditionArguments: TypeReference[];
  target?: RoutineDeclaration;
  statements: SourceRange[];
  range: SourceRange;
}

export interface RoutineDeclaration {
  name: TypeReference;
  alternateNames: TypeReference[];
  parameters: RoutineParameter[];
  preservedParameters: PreservedRoutineParameter[];
  assignments: RoutineAssignment[];
  outputs: RoutineOutput[];
  localVariables: RoutineLocalVariable[];
  conditionals: RoutineConditionalBlock[];
  processes: RoutineProcess[];
  loopInstructions: RoutineLoopInstruction[];
  computedFieldAccesses: RoutineComputedFieldAccess[];
  computedField?: RoutineComputedField;
  returnParameter?: RoutineParameter;
  calls: RoutineCall[];
  annotation?: 'rotina' | 'função';
  isBooleanFunction: boolean;
  range: SourceRange;
  bodyRange: SourceRange;
}

export interface RoutineCall {
  name: TypeReference;
  arguments: TypeReference[];
  fieldAccesses?: RoutineFieldAccess[];
  computedFieldAccesses?: RoutineComputedFieldAccess[];
  localVariable?: RoutineLocalVariable;
  target?: RoutineDeclaration;
}

export interface RoutineProcess {
  kind: 'internal' | 'external';
  target?: TypeReference;
  library?: string;
  functionName?: string;
  arguments: TypeReference[];
  fieldAccesses: RoutineFieldAccess[];
  computedFieldAccesses?: RoutineComputedFieldAccess[];
  returnVariable?: RoutineLocalVariable;
  range: SourceRange;
}

export interface RoutineLoopInstruction {
  kind: 'iterate' | 'break' | 'repeat';
  range: SourceRange;
}

export interface RoutineComputedField {
  name: TypeReference;
  structureType: TypeReference;
  valueType?: TypeReference;
}

export interface RoutineComputedFieldAccess {
  reference: TypeReference;
  target: RoutineDeclaration;
}

export interface RoutineFieldAccess {
  reference: TypeReference;
  target: NamedTypeField;
}

export class RoutineSymbolTable {
  private readonly routines = new Map<string, RoutineDeclaration>();

  constructor(declarations: RoutineDeclaration[] = []) {
    for (const declaration of declarations) {
      this.routines.set(normalizeRoutineName(declaration.name.name), declaration);
      for (const alternateName of declaration.alternateNames) {
        this.routines.set(normalizeRoutineName(alternateName.name), declaration);
      }
    }
  }

  lookup(name: string): RoutineDeclaration | undefined {
    return this.routines.get(normalizeRoutineName(name));
  }

  get entries(): RoutineDeclaration[] {
    return [...new Set(this.routines.values())];
  }
}

export interface GlobalVariableSymbol {
  name: string;
  normalizedName: string;
  typeName?: string;
  type?: TypeReference;
  declaration: GlobalVariableDeclaration;
}

export class GlobalVariableSymbolTable {
  private readonly symbols = new Map<string, GlobalVariableSymbol>();

  constructor(declarations: GlobalVariableDeclaration[] = []) {
    for (const declaration of declarations) {
      const key = declaration.name.normalizedName;
      if (!this.symbols.has(key)) {
        this.symbols.set(key, {
          name: declaration.name.name,
          normalizedName: key,
          typeName: declaration.type?.name ?? declaration.inferredTypeName,
          type: declaration.type,
          declaration
        });
      }
    }
  }

  lookup(name: string): GlobalVariableSymbol | undefined {
    return this.symbols.get(normalizeTypeName(name));
  }

  get entries(): GlobalVariableSymbol[] {
    return [...this.symbols.values()];
  }
}

export interface TypeSymbol {
  name: string;
  normalizedName: string;
  pluralName: string;
  kind: 'primitive' | 'derived' | 'scalar';
  isScalar: boolean;
  scale: string;
  baseType?: TypeReference;
  pointedType?: TypeReference;
  fields?: TypeField[];
  scalarFactor?: string;
  declaration?: TypeDeclaration;
}

export class TypeSymbolTable {
  private readonly symbols = new Map<string, TypeSymbol>();
  private readonly names = new Map<string, TypeSymbol>();

  constructor(declarations: TypeDeclaration[] = []) {
    this.addPrimitive('byte', false);
    this.addPrimitive('estrutura', false);

    for (const declaration of declarations) {
      const key = declaration.name.normalizedName;
      if (!this.symbols.has(key)) {
        const symbol: TypeSymbol = {
          name: declaration.name.name,
          normalizedName: key,
          pluralName: pluralizeTypeName(declaration.name.name),
          kind: 'derived',
          isScalar: false,
          scale: '0/1',
          baseType: declaration.baseType,
          pointedType: declaration.pointedType,
          fields: declaration.fields,
          scalarFactor: declaration.scalarFactor,
          declaration
        };
        this.symbols.set(key, symbol);
      }
    }

    for (const symbol of this.symbols.values()) {
      this.names.set(symbol.normalizedName, symbol);
    }
    for (const symbol of this.symbols.values()) {
      this.addName(symbol.pluralName, symbol);
    }

    for (const symbol of this.symbols.values()) {
      this.resolveScale(symbol, new Set());
    }
  }

  lookup(name: string): TypeSymbol | undefined {
    return this.names.get(normalizeTypeName(name));
  }

  getBaseTypeDistance(actualName: string, expectedName: string): number | undefined {
    const expected = this.lookup(expectedName);
    let actual = this.lookup(actualName);
    if (!expected || !actual) {
      return undefined;
    }

    const visited = new Set<TypeSymbol>();
    let distance = 0;
    while (actual && !visited.has(actual)) {
      if (actual === expected) {
        return distance;
      }
      visited.add(actual);
      actual = actual.baseType ? this.lookup(actual.baseType.name) : undefined;
      distance++;
    }
    return undefined;
  }

  get entries(): TypeSymbol[] {
    return [...new Set(this.symbols.values())];
  }

  private addPrimitive(name: string, isScalar: boolean): void {
    const symbol: TypeSymbol = {
      name,
      normalizedName: normalizeTypeName(name),
      pluralName: pluralizeTypeName(name),
      kind: 'primitive',
      isScalar,
      scale: isScalar ? '1/1' : '0/1'
    };
    this.symbols.set(symbol.normalizedName, symbol);
    this.addName(symbol.normalizedName, symbol);
    this.addName(symbol.pluralName, symbol);
  }

  private addName(name: string, symbol: TypeSymbol): void {
    const key = normalizeTypeName(name);
    if (!this.names.has(key)) {
      this.names.set(key, symbol);
    }
  }

  private resolveScale(symbol: TypeSymbol, resolving: Set<TypeSymbol>): boolean {
    if (symbol.kind === 'primitive') {
      return symbol.isScalar;
    }
    if (symbol.scalarFactor === undefined || !symbol.declaration) {
      return false;
    }
    if (resolving.has(symbol)) {
      return false;
    }

    if (
      isNumberTypeName(symbol.declaration.baseType.name) &&
      this.lookup(symbol.declaration.baseType.name)
    ) {
      symbol.scale = formatFraction(BigInt(symbol.scalarFactor), 1n);
      symbol.isScalar = true;
      symbol.kind = 'scalar';
      return true;
    }

    resolving.add(symbol);
    const baseType = this.lookup(symbol.declaration.baseType.name);
    if (!baseType || !this.resolveScale(baseType, resolving)) {
      resolving.delete(symbol);
      return false;
    }

    const [baseNumerator, baseDenominator] = parseFraction(baseType.scale);
    const numerator = baseNumerator * BigInt(symbol.scalarFactor);
    symbol.scale = formatFraction(numerator, baseDenominator);
    symbol.isScalar = true;
    symbol.kind = 'scalar';
    resolving.delete(symbol);
    return true;
  }
}

function isNumberTypeName(name: string): boolean {
  const normalizedName = normalizeTypeName(name);
  return normalizedName === 'número' || normalizedName === normalizeTypeName(pluralize('número'));
}

export interface ParsedDocument {
  declarations: TypeDeclaration[];
  globalVariables: GlobalVariableDeclaration[];
  routines: RoutineDeclaration[];
  symbols: TypeSymbolTable;
  globalVariableSymbols: GlobalVariableSymbolTable;
  routineSymbols: RoutineSymbolTable;
  diagnostics: ParserDiagnostic[];
}

const indefiniteArticles = new Set(['um', 'uma', 'uns', 'umas']);
const definiteArticles = new Set(['o', 'os', 'a', 'as']);
const conjunctions = new Set(['e', 'ou', 'nem']);
const routineUsingMarkers = new Set([
  'usando', 'desde', 'dada', 'dado', 'dadas', 'dados', 'com', 'contendo'
]);
const routinePredicateWords = new Set([
  'é', 'for', 'foi', 'foram', 'forem', 'seja', 'sejam', 'são', 'está',
  'estão', 'estiver', 'estiverem', 'estamos'
]);
const routineWordReplacements = new Map([
  ['é', 'é'],
  ['for', 'é'],
  ['foi', 'é'],
  ['foram', 'é'],
  ['forem', 'é'],
  ['seja', 'é'],
  ['sejam', 'é'],
  ['são', 'é'],
  ['está', 'é'],
  ['estão', 'é'],
  ['estiver', 'é'],
  ['estiverem', 'é'],
  ['estamos', 'é'],
  ['tiver', 'tem'],
  ['houver', 'há'],
  ['existir', 'existe'],
  ['começar', 'começa'],
  ['começa', 'começa'],
  ['terminar', 'termina'],
  ['termina', 'termina'],
  ['puder', 'pode'],
  ['puderem', 'pode'],
  ['possuir', 'possui'],
  ['possui', 'possui'],
  ['cabe', 'cabe'],
  ['couber', 'cabe'],
  ['desde', 'usando'],
  ['dada', 'usando'],
  ['dado', 'usando'],
  ['dadas', 'usando'],
  ['dados', 'usando'],
  ['com', 'usando'],
  ['usando', 'usando'],
  ['contendo', 'usando'],
  ['sob', 'sobre'],
  ['sobre', 'sobre'],
  ['em', 'para']
]);
const routineContractions = new Map([
  ['ao', 'para o'],
  ['à', 'para a'],
  ['aos', 'para os'],
  ['às', 'para as'],
  ['dum', 'de esse'],
  ['duma', 'de essa'],
  ['dumas', 'de esses'],
  ['duns', 'de esses'],
  ['desse', 'de o'],
  ['dessa', 'de a'],
  ['desses', 'de os'],
  ['dessas', 'de as'],
  ['deste', 'de este'],
  ['desta', 'de esta'],
  ['destes', 'de estes'],
  ['destas', 'de estas'],
  ['nesse', 'em esse'],
  ['nesses', 'em esses'],
  ['neste', 'em este'],
  ['nestes', 'em estes'],
  ['nessa', 'em essa'],
  ['nessas', 'em essas'],
  ['nesta', 'em esta'],
  ['na', 'em a'],
  ['nas', 'em as'],
  ['no', 'em o'],
  ['nos', 'em os'],
  ['num', 'em um'],
  ['numa', 'em uma'],
  ['nuns', 'em uns'],
  ['numas', 'em umas'],
  ['pelo', 'por o'],
  ['pela', 'por a'],
  ['pelos', 'por os'],
  ['pelas', 'por as']
]);
const articlesAfterPrepositionA = new Set([
  'um', 'uma', 'uns', 'umas', 'o', 'a', 'os', 'as'
]);
const builtInStatementStarts = new Set([
  'atribua', 'escreva', 'diga', 'retorne', 'decodifique', 'preserve', 'empilhe', 'se',
  'processe', 'itere', 'pare', 'reitere', 'adicione', 'incremente', 'feche', 'defina',
  'ative', 'converta', 'dobre', 'multiplique', 'desloque', 'subtraia', 'faça'
]);
const routineNameDelimiters = new Set([
  'abaixo', 'acerca', 'acima', 'acordo', 'algum', 'ante', 'antes', 'aproximadamente',
  'após', 'através', 'até', 'cerca', 'com', 'começando', 'como', 'comprida', 'comprido',
  'dada', 'dado', 'dando', 'debaixo', 'dentre', 'dentro', 'depois', 'desde', 'durante',
  'em', 'enquanto', 'entre', 'então', 'menores', 'para', 'parde', 'parecida', 'parecido',
  'partindo', 'partir', 'perante', 'perto', 'por', 'próximo', 'qual', 'quanto', 'quão',
  'regressivamente', 'relativa', 'resultando', 'sem', 'semelhante', 'similar', 'sob',
  'sobre', 'somente', 'só', 'tal', 'tanto', 'tão', 'usando', 'versus', 'via', 'voltada',
  'voltado', 'cima', 'contendo', 'embaixo', 'por', 'retornando', 'é', 'está',
  'estiver', 'for', 'forem', 'são', 'estão', 'estiverem', 'ser', 'serem', 'estar',
  'poder', 'puder', 'foi', 'estamos', 'há', 'pode', 'existe', 'existir', 'contém',
  'contiver', 'possui', 'possuir', 'dum', 'duma', 'duns', 'dumas'
]);
const reservedIdentifierWords = new Set([
  ...routineNameDelimiters,
  ...conjunctions,
  'denominado', 'denominada', 'denominados', 'denominadas', 'chamado', 'chamada',
  'chamados', 'chamadas', 'para', 'que', 'se', 'determine', 'rotina', 'função'
]);

export function normalizeTypeName(name: string): string {
  return name.trim().replace(/\s+/gu, ' ').toLocaleLowerCase('pt-BR');
}

function normalizeRoutineName(name: string): string {
  const words = normalizeTypeName(name).split(' ');
  const expandedWords = words.flatMap(word =>
    (routineContractions.get(word) ?? word).split(' ')
  );
  for (let index = 0; index < expandedWords.length; index++) {
    const word = expandedWords[index];
    if (word === 'a' && articlesAfterPrepositionA.has(expandedWords[index + 1] ?? '')) {
      expandedWords[index] = 'para';
    } else {
      expandedWords[index] = routineWordReplacements.get(word) ?? word;
    }
  }
  return expandedWords.join(' ');
}

function pluralizeTypeName(name: string): string {
  const words = name.trim().split(/\s+/u);
  const prepositionIndex = words.findIndex(word =>
    normalizeTypeName(word) === 'de'
  );
  return words.map((word, index) =>
    prepositionIndex !== -1 && index >= prepositionIndex
      ? word
      : pluralize(word)
  ).join(' ');
}

export function parseTypeDeclarations(source: string): ParsedDocument {
  const diagnostics: ParserDiagnostic[] = [];
  const parserSource = maskComments(source, diagnostics);
  const declarations: TypeDeclaration[] = [];
  const globalVariables: GlobalVariableDeclaration[] = [];
  const routines = parseRoutineDeclarations(parserSource, diagnostics);
  let segmentStart = 0;
  let periodIndex = findDeclarationPeriod(parserSource, segmentStart);

  while (periodIndex !== -1) {
    const declarationStart = findDeclarationStart(parserSource, segmentStart, periodIndex);
    const article = declarationStart === undefined
      ? undefined
      : readWord(parserSource, declarationStart, periodIndex);
    if (article && definiteArticles.has(article.value.toLocaleLowerCase('pt-BR'))) {
      const variable = parseGlobalVariableDeclaration(
        parserSource,
        declarationStart!,
        periodIndex,
        diagnostics
      );
      if (variable) {
        globalVariables.push(variable);
      }
    } else if (article) {
      const declaration = parseDeclaration(parserSource, declarationStart!, periodIndex, diagnostics);
      if (declaration) {
        declarations.push(declaration);
      }
    }
    segmentStart = periodIndex + 1;
    periodIndex = findDeclarationPeriod(parserSource, segmentStart);
  }
  const symbols = new TypeSymbolTable(declarations);
  const globalVariableSymbols = new GlobalVariableSymbolTable(globalVariables);
  const routineSymbols = new RoutineSymbolTable(routines);
  setRoutineBodyRanges(
    parserSource,
    routines,
    [...declarations, ...globalVariables].map(declaration => declaration.range)
  );
  validateBaseTypes(declarations, symbols, diagnostics);
  validateGlobalVariableTypes(globalVariables, symbols, diagnostics);
  validateReservedNames(parserSource, declarations, globalVariables, diagnostics);
  validateIdentifierPunctuation(
    parserSource,
    [...declarations, ...globalVariables].map(declaration => declaration.name),
    diagnostics
  );
  resolveFields(parserSource, [...declarations, ...globalVariables], symbols, diagnostics);
  resolveRoutineParameters(parserSource, routines, symbols, diagnostics);
  resolveComputedFields(routines, symbols, diagnostics);
  resolveRoutineCalls(parserSource, routines, globalVariables, symbols, diagnostics);

  return {
    declarations,
    globalVariables,
    routines,
    symbols,
    globalVariableSymbols,
    routineSymbols,
    diagnostics
  };
}

function validateIdentifierPunctuation(
  source: string,
  identifiers: TypeReference[],
  diagnostics: ParserDiagnostic[]
): void {
  for (const identifier of identifiers) {
    for (let index = identifier.range.start; index < identifier.range.end; index++) {
      const character = source[index];
      if (character !== ':' && character !== ';' && character !== '.') {
        continue;
      }
      diagnostics.push({
        message: `The character "${character}" cannot appear in an identifier.`,
        range: { start: index, end: index + 1 }
      });
    }
  }
}

function findDeclarationStart(source: string, start: number, end: number): number | undefined {
  let lineStart = start;
  while (lineStart <= end) {
    if (lineStart < end && !/\s/u.test(source[lineStart])) {
      const article = readWord(source, lineStart, end);
      if (
        article &&
        (indefiniteArticles.has(article.value.toLocaleLowerCase('pt-BR')) ||
          definiteArticles.has(article.value.toLocaleLowerCase('pt-BR')))
      ) {
        return lineStart;
      }
    }
    const nextLineFeed = source.indexOf('\n', lineStart);
    const nextCarriageReturn = source.indexOf('\r', lineStart);
    const nextLineBreak = [nextLineFeed, nextCarriageReturn]
      .filter(index => index !== -1)
      .reduce((nearest, index) => Math.min(nearest, index), Number.POSITIVE_INFINITY);
    if (!Number.isFinite(nextLineBreak) || nextLineBreak >= end) {
      break;
    }
    lineStart = nextLineBreak + 1;
  }
  return undefined;
}

function setRoutineBodyRanges(
  source: string,
  routines: RoutineDeclaration[],
  declarationRanges: SourceRange[]
): void {
  for (const routine of routines) {
    const bodyStart = routine.bodyRange.start;
    const nextRoutineStart = routines
      .filter(candidate => candidate.range.start > routine.range.start)
      .reduce((nearest, candidate) => Math.min(nearest, candidate.range.start), source.length);
    const nextDeclarationStart = declarationRanges
      .filter(range => range.start > bodyStart)
      .reduce((nearest, range) => Math.min(nearest, range.start), source.length);
    routine.bodyRange.end = Math.min(nextRoutineStart, nextDeclarationStart, source.length);
  }
}

function resolveRoutineCalls(
  source: string,
  routines: RoutineDeclaration[],
  globalVariables: GlobalVariableDeclaration[],
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[]
): void {
  const globalVariableSymbols = new GlobalVariableSymbolTable(globalVariables);
  for (const routine of routines) {
    const body = source.slice(routine.bodyRange.start, routine.bodyRange.end);
    let hasValidBooleanReturn = false;
    if (!body.trim()) {
      diagnostics.push({
        message: `Routine "${routine.name.name}" has no statements.`,
        range: { start: routine.bodyRange.start, end: routine.bodyRange.start },
        severity: 'hint'
      });
    }

    let statementStart = routine.bodyRange.start;
    let periodIndex = findDeclarationPeriod(source, statementStart);
    while (periodIndex !== -1 && periodIndex < routine.bodyRange.end) {
      const statementRange = trimRange(source, statementStart, periodIndex);
      if (statementRange.start < statementRange.end) {
        const conditional = parseConditionalBlock(
          source,
          statementRange,
          periodIndex,
          routines,
          routine,
          globalVariableSymbols,
          symbols,
          diagnostics
        );
        if (conditional) {
          routine.conditionals.push(conditional.block);
          if (conditional.nestedRange) {
            diagnostics.push({
              message: 'Conditional blocks cannot be nested.',
              range: conditional.nestedRange
            });
          }
          for (const conditionalStatement of conditional.block.statements) {
            if (
              !conditional.nestedRange ||
              conditionalStatement.start < conditional.nestedRange.start
            ) {
              hasValidBooleanReturn = processRoutineStatement(
                source,
                conditionalStatement,
                routine,
                routines,
                globalVariableSymbols,
                symbols,
                diagnostics
              ) || hasValidBooleanReturn;
            }
          }
        } else {
          hasValidBooleanReturn = processRoutineStatement(
            source,
            statementRange,
            routine,
            routines,
            globalVariableSymbols,
            symbols,
            diagnostics
          ) || hasValidBooleanReturn;
        }
      }
      statementStart = periodIndex + 1;
      periodIndex = findDeclarationPeriod(source, statementStart);
    }

    if (routine.isBooleanFunction && !hasValidBooleanReturn) {
      diagnostics.push({
        message: 'Boolean functions must contain a valid "Diga sim" or "Diga não" statement.',
        range: routine.name.range
      });
    }
  }
}

function processRoutineStatement(
  source: string,
  statement: SourceRange,
  caller: RoutineDeclaration,
  routines: RoutineDeclaration[],
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[]
): boolean {
  const statementKeyword = readWord(source, statement.start, statement.end);
  if (
    statementKeyword &&
    ['atribua', 'escreva'].includes(statementKeyword.value.toLocaleLowerCase('pt-BR'))
  ) {
    const destinationMarker =
      findWordOutsideStrings(source, statementKeyword.end, statement.end, 'para') ??
      findWordOutsideStrings(source, statementKeyword.end, statement.end, 'à');
    if (destinationMarker) {
      resolveFieldAccessRange(
        source,
        trimRange(source, statementKeyword.end, destinationMarker.start),
        caller,
        routines,
        globalVariables,
        symbols,
        diagnostics
      );
    }
  }
  if (validatePreserveStatement(source, statement, caller, diagnostics)) {
    return false;
  }
  const assignment = parseRoutineAssignment(source, statement, diagnostics);
  if (assignment) {
    caller.assignments.push(assignment);
    return false;
  }
  const output = parseRoutineOutput(source, statement, diagnostics);
  if (output) {
    caller.outputs.push(output);
    return false;
  }
  if (validateDigaStatement(source, statement, caller.isBooleanFunction, diagnostics)) {
    return true;
  }
  if (validateReturnStatement(source, statement, diagnostics)) {
    return false;
  }
  if (validateDecodeStatement(source, statement, diagnostics)) {
    return false;
  }
  if (validatePushStatement(
    source,
    statement,
    caller,
    routines,
    globalVariables,
    symbols,
    diagnostics
  )) {
    return false;
  }
  const firstWord = readWord(source, statement.start, statement.end);
  const loopInstruction = parseLoopInstruction(source, statement, diagnostics);
  if (loopInstruction) {
    caller.loopInstructions.push(loopInstruction);
    return false;
  }
  if (firstWord?.value.toLocaleLowerCase('pt-BR') === 'processe') {
    const process = parseRoutineProcess(
      source,
      statement,
      caller,
      routines,
      globalVariables,
      symbols,
      diagnostics
    );
    if (process) {
      caller.processes.push(process);
      if (process.returnVariable) {
        caller.localVariables.push(process.returnVariable);
      }
    }
    return false;
  }
  const call = resolveRoutineCall(
    source,
    statement,
    routines,
    caller,
    globalVariables,
    symbols,
  );
  if (call) {
    caller.calls.push(call);
    if (call.localVariable) {
      caller.localVariables.push(call.localVariable);
    }
  } else {
    diagnoseUnresolvedRoutineCall(
      source,
      statement,
      routines,
      caller,
      globalVariables,
      symbols,
      diagnostics
    );
  }
  return false;
}

function parseConditionalBlock(
  source: string,
  statement: SourceRange,
  blockEnd: number,
  routines: RoutineDeclaration[],
  caller: RoutineDeclaration,
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[]
): { block: RoutineConditionalBlock; nestedRange?: SourceRange } | undefined {
  const keyword = readWord(source, statement.start, statement.end);
  if (!keyword || keyword.value.toLocaleLowerCase('pt-BR') !== 'se') {
    return undefined;
  }
  const comma = source.indexOf(',', keyword.end);
  if (comma === -1 || comma >= blockEnd) {
    return undefined;
  }

  const conditionRange = trimRange(source, keyword.end, comma);
  const condition = resolveBooleanCondition(
    source,
    conditionRange,
    routines,
    caller,
    globalVariables,
    symbols
  );
  if (!condition) {
    diagnostics.push({
      message: `No boolean function found for condition "${source.slice(conditionRange.start, conditionRange.end)}".`,
      range: conditionRange
    });
  } else {
    caller.calls.push(condition.call);
  }

  const bodyRange = trimRange(source, comma + 1, blockEnd);
  const statements: SourceRange[] = [];
  let nestedRange: SourceRange | undefined;
  let statementStart = bodyRange.start;
  for (let index = bodyRange.start; index <= bodyRange.end; index++) {
    if (index !== bodyRange.end && source[index] !== ';') {
      continue;
    }
    const childStatement = trimRange(source, statementStart, index);
    if (childStatement.start < childStatement.end) {
      const childKeyword = readWord(source, childStatement.start, childStatement.end);
      if (childKeyword?.value.toLocaleLowerCase('pt-BR') === 'se') {
        nestedRange ??= { start: childStatement.start, end: childKeyword.end };
      }
      statements.push(childStatement);
    }
    statementStart = index + 1;
  }

  return {
    block: {
      condition: createTypeReference(source, conditionRange),
      conditionArguments: condition?.call.arguments ?? [],
      target: condition?.call.target,
      statements,
      range: { start: statement.start, end: blockEnd + 1 }
    },
    nestedRange
  };
}

function resolveBooleanCondition(
  source: string,
  condition: SourceRange,
  routines: RoutineDeclaration[],
  caller: RoutineDeclaration,
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable
): { call: RoutineCall; distance: number } | undefined {
  const conditionName = normalizeRoutineName(source.slice(condition.start, condition.end));
  const exact = routines.find(routine =>
    routine.isBooleanFunction &&
    routine.parameters.length === 0 &&
    routineNames(routine).some(name => normalizeRoutineName(name.name) === conditionName)
  );
  if (exact) {
    return {
      call: {
        name: createTypeReference(source, condition),
        arguments: [],
        target: exact
      },
      distance: 0
    };
  }

  const matches: { call: RoutineCall; distance: number }[] = [];
  for (const routine of routines) {
    if (!routine.isBooleanFunction || routine.parameters.length === 0) {
      continue;
    }
    for (const name of routineNames(routine)) {
      for (let nameStart = condition.start; nameStart < condition.end; nameStart++) {
        if (
          nameStart > condition.start &&
          isWordCharacter(source[nameStart - 1])
        ) {
          continue;
        }
        const nameRange = { start: nameStart, end: condition.end };
        const nameEnd = matchRoutineNamePrefix(source, nameRange, name);
        if (nameEnd === undefined || !/\s/u.test(source[nameEnd] ?? '')) {
          continue;
        }
        const prefix = trimRange(source, condition.start, nameStart);
        const suffix = trimRange(source, nameEnd, condition.end);
        const argumentsList = [prefix, suffix].filter(range => range.start < range.end);
        if (argumentsList.length !== routine.parameters.length) {
          continue;
        }
        const distances: number[] = [];
        const fieldAccesses: RoutineFieldAccess[] = [];
        const computedFieldAccesses: RoutineComputedFieldAccess[] = [];
        for (let index = 0; index < argumentsList.length; index++) {
          const actualType = resolveRoutineArgumentType(
            source,
            argumentsList[index],
            caller,
            globalVariables,
            symbols,
            fieldAccesses,
            routines,
            computedFieldAccesses
          );
          const distance = actualType
            ? symbols.getBaseTypeDistance(
              actualType.name,
              routine.parameters[index].type.name
            )
            : undefined;
          if (distance === undefined) {
            break;
          }
          distances.push(distance);
        }
        if (distances.length !== argumentsList.length) {
          continue;
        }
        matches.push({
          call: {
            name: createTypeReference(source, { start: nameStart, end: nameEnd }),
            arguments: argumentsList.map(range => createTypeReference(source, range)),
            fieldAccesses,
            computedFieldAccesses,
            target: routine
          },
          distance: distances.reduce((total, distance) => total + distance, 0)
        });
      }
    }
  }
  return matches.sort((first, second) => first.distance - second.distance)[0];
}

function parseRoutineAssignment(
  source: string,
  statement: SourceRange,
  diagnostics: ParserDiagnostic[]
): RoutineAssignment | undefined {
  const keyword = readWord(source, statement.start, statement.end);
  if (!keyword || keyword.value.toLocaleLowerCase('pt-BR') !== 'atribua') {
    return undefined;
  }

  const destinationMarker =
    findWordOutsideStrings(source, keyword.end, statement.end, 'para') ??
    findWordOutsideStrings(source, keyword.end, statement.end, 'à');
  if (!destinationMarker) {
    return undefined;
  }
  const expressionRange = trimRange(source, keyword.end, destinationMarker.start);
  const targetRange = trimRange(source, destinationMarker.end, statement.end);
  const targetArticle = readWord(source, targetRange.start, targetRange.end);
  if (targetArticle && indefiniteArticles.has(targetArticle.value.toLocaleLowerCase('pt-BR'))) {
    return undefined;
  }
  const expression = parseRoutineExpression(source, expressionRange, diagnostics);
  if (!expression || targetRange.start === targetRange.end) {
    return undefined;
  }

  return {
    target: createTypeReference(source, targetRange),
    expression,
    range: statement
  };
}

function parseRoutineOutput(
  source: string,
  statement: SourceRange,
  diagnostics: ParserDiagnostic[]
): RoutineOutput | undefined {
  const keyword = readWord(source, statement.start, statement.end);
  if (!keyword || keyword.value.toLocaleLowerCase('pt-BR') !== 'escreva') {
    return undefined;
  }

  const destinationMarker = findWordOutsideStrings(source, keyword.end, statement.end, 'para');
  if (!destinationMarker) {
    return undefined;
  }
  const expressionRange = trimRange(source, keyword.end, destinationMarker.start);
  const destinationRange = trimRange(source, destinationMarker.end, statement.end);
  const expression = parseRoutineExpression(source, expressionRange, diagnostics);
  if (!expression || destinationRange.start === destinationRange.end) {
    return undefined;
  }

  return {
    expression,
    destination: createTypeReference(source, destinationRange),
    range: statement
  };
}

function parseRoutineExpression(
  source: string,
  range: SourceRange,
  diagnostics: ParserDiagnostic[]
): RoutineExpression | undefined {
  const words = /\p{L}+/gu;
  words.lastIndex = range.start;
  const quotedRanges = findQuotedRanges(source, range);
  const operators: { operator: ExpressionOperator; range: SourceRange }[] = [];
  let match: RegExpExecArray | null;
  while ((match = words.exec(source)) && match.index < range.end) {
    const wordStart = match.index;
    if (quotedRanges.some(quoted => wordStart >= quoted.start && wordStart < quoted.end)) {
      continue;
    }
    const word = match[0].toLocaleLowerCase('pt-BR');
    if (!['mais', 'menos', 'vezes', 'dividido', 'junto', 'seguido'].includes(word)) {
      continue;
    }
    const wordEnd = match.index + match[0].length;
    const start = match.index > range.start ? source[match.index - 1] : '';
    const end = wordEnd < range.end ? source[wordEnd] : '';
    if (isWordCharacter(start) || isWordCharacter(end)) {
      continue;
    }

    if (word === 'dividido') {
      const nextWord = readWord(source, wordEnd, range.end);
      if (!nextWord || nextWord.value.toLocaleLowerCase('pt-BR') !== 'por') {
        continue;
      }
      operators.push({
        operator: 'dividido por',
        range: { start: match.index, end: nextWord.end }
      });
      words.lastIndex = nextWord.end;
    } else if (word === 'junto' || word === 'seguido') {
      const nextWord = readWord(source, wordEnd, range.end);
      const expectedNextWord = word === 'junto' ? 'com' : 'de';
      if (!nextWord || nextWord.value.toLocaleLowerCase('pt-BR') !== expectedNextWord) {
        continue;
      }
      operators.push({
        operator: word === 'junto' ? 'junto com' : 'seguido de',
        range: { start: match.index, end: nextWord.end }
      });
      words.lastIndex = nextWord.end;
    } else {
      operators.push({
        operator: word as ExpressionOperator,
        range: { start: match.index, end: wordEnd }
      });
    }
  }

  if (operators.length === 0) {
    return undefined;
  }

  const operands: RoutineExpressionOperand[] = [];
  let operandStart = range.start;
  for (const operator of operators) {
    const operandRange = trimRange(source, operandStart, operator.range.start);
    if (operandRange.start === operandRange.end) {
      diagnostics.push({
        message: `Expected an operand before "${operator.operator}".`,
        range: operator.range
      });
      return undefined;
    }
    operands.push({
      kind: 'operand',
      text: source.slice(operandRange.start, operandRange.end),
      range: operandRange
    });
    operandStart = operator.range.end;
  }

  const finalOperandRange = trimRange(source, operandStart, range.end);
  if (finalOperandRange.start === finalOperandRange.end) {
    diagnostics.push({
      message: `Expected an operand after "${operators[operators.length - 1].operator}".`,
      range: operators[operators.length - 1].range
    });
    return undefined;
  }
  operands.push({
    kind: 'operand',
    text: source.slice(finalOperandRange.start, finalOperandRange.end),
    range: finalOperandRange
  });

  let expression: RoutineExpression = operands[0];
  for (let index = 0; index < operators.length; index++) {
    expression = {
      kind: 'binary',
      operator: operators[index].operator,
      left: expression,
      right: operands[index + 1],
      range: { start: expression.range.start, end: operands[index + 1].range.end }
    };
  }
  return expression;
}

function validatePreserveStatement(
  source: string,
  statement: SourceRange,
  routine: RoutineDeclaration,
  diagnostics: ParserDiagnostic[]
): boolean {
  const keyword = readWord(source, statement.start, statement.end);
  if (!keyword || keyword.value.toLocaleLowerCase('pt-BR') !== 'preserve') {
    return false;
  }

  const argumentRange = trimRange(source, keyword.end, statement.end);
  const article = readWord(source, argumentRange.start, argumentRange.end);
  const parameterNameRange = article &&
    definiteArticles.has(article.value.toLocaleLowerCase('pt-BR'))
    ? trimRange(source, article.end, argumentRange.end)
    : argumentRange;
  const parameterName = normalizeTypeName(
    source.slice(parameterNameRange.start, parameterNameRange.end)
  );
  const parameter = article &&
    definiteArticles.has(article.value.toLocaleLowerCase('pt-BR'))
    ? routine.parameters.find(candidate => candidate.name.normalizedName === parameterName)
    : undefined;

  if (!parameter) {
    diagnostics.push({
      message: '"Preserve" must be followed by a definite article and the name of a routine parameter.',
      range: argumentRange.start < argumentRange.end ? argumentRange : keyword
    });
    return true;
  }

  if (!routine.preservedParameters.some(
    preserved => preserved.parameter === parameter
  )) {
    routine.preservedParameters.push({
      parameter,
      copyName: parameter.name.name,
      originalName: `${parameter.name.name} original`,
      range: statement
    });
  }
  return true;
}

function validateDigaStatement(
  source: string,
  statement: SourceRange,
  isBooleanFunction: boolean,
  diagnostics: ParserDiagnostic[]
): boolean {
  const keyword = findWord(source, statement.start, statement.end, 'diga');
  if (!keyword) {
    return false;
  }

  const valueRange = trimRange(source, keyword.end, statement.end);
  if (!isBooleanFunction) {
    diagnostics.push({
      message: '"Diga" can only be used in a boolean function.',
      range: keyword
    });
    return false;
  }

  const value = normalizeTypeName(source.slice(valueRange.start, valueRange.end));
  if (value === 'sim' || value === 'não') {
    return true;
  }

  diagnostics.push({
    message: '"Diga" requires the boolean literal "sim" or "não".',
    range: valueRange.start < valueRange.end ? valueRange : keyword
  });
  return false;
}

function validateReturnStatement(
  source: string,
  statement: SourceRange,
  diagnostics: ParserDiagnostic[]
): boolean {
  const keyword = readWord(source, statement.start, statement.end);
  if (!keyword || keyword.value.toLocaleLowerCase('pt-BR') !== 'retorne') {
    return false;
  }

  const valueRange = trimRange(source, keyword.end, statement.end);
  if (valueRange.start < valueRange.end) {
    diagnostics.push({
      message: '"Retorne" does not accept a value or variable.',
      range: valueRange
    });
  }
  return true;
}

function parseLoopInstruction(
  source: string,
  statement: SourceRange,
  diagnostics: ParserDiagnostic[]
): RoutineLoopInstruction | undefined {
  const keyword = readWord(source, statement.start, statement.end);
  if (!keyword) {
    return undefined;
  }
  const instructionKinds = new Map<string, RoutineLoopInstruction['kind']>([
    ['itere', 'iterate'],
    ['pare', 'break'],
    ['reitere', 'repeat']
  ] as const);
  const kind = instructionKinds.get(keyword.value.toLocaleLowerCase('pt-BR'));
  if (!kind) {
    return undefined;
  }

  const valueRange = trimRange(source, keyword.end, statement.end);
  if (valueRange.start < valueRange.end) {
    diagnostics.push({
      message: `"${keyword.value}" does not accept an argument.`,
      range: valueRange
    });
  }
  return { kind, range: statement };
}

function validateDecodeStatement(
  source: string,
  statement: SourceRange,
  diagnostics: ParserDiagnostic[]
): boolean {
  const keyword = readWord(source, statement.start, statement.end);
  if (!keyword || keyword.value.toLocaleLowerCase('pt-BR') !== 'decodifique') {
    return false;
  }

  const valueRange = trimRange(source, keyword.end, statement.end);
  if (valueRange.start < valueRange.end && /^\$[a-f\d]+$/iu.test(source.slice(valueRange.start, valueRange.end))) {
    return true;
  }

  diagnostics.push({
    message: 'Expected a hexadecimal literal after "Decodifique".',
    range: valueRange.start < valueRange.end
      ? valueRange
      : { start: keyword.start, end: keyword.end }
  });
  return true;
}

function validatePushStatement(
  source: string,
  statement: SourceRange,
  caller: RoutineDeclaration,
  routines: RoutineDeclaration[],
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[]
): boolean {
  const keyword = readWord(source, statement.start, statement.end);
  if (!keyword || keyword.value.toLocaleLowerCase('pt-BR') !== 'empilhe') {
    return false;
  }

  const valueRange = trimRange(source, keyword.end, statement.end);
  const literal = parseGlobalVariableLiteral(source, valueRange);
  if (literal && literal.kind !== 'string') {
    return true;
  }

  const article = readWord(source, valueRange.start, valueRange.end);
  if (article && definiteArticles.has(article.value.toLocaleLowerCase('pt-BR'))) {
    const variableNameRange = trimRange(source, article.end, valueRange.end);
    const variableType = resolveRoutineArgumentType(
      source,
      valueRange,
      caller,
      globalVariables,
      symbols
    );
    if (!variableType) {
      diagnostics.push({
        message: `Unknown variable "${source.slice(variableNameRange.start, variableNameRange.end)}" after "Empilhe".`,
        range: variableNameRange.start < variableNameRange.end
          ? variableNameRange
          : { start: keyword.start, end: keyword.end }
      });
      return true;
    }

    if (isPushableNumericType(variableType.name, symbols)) {
      return true;
    }
    diagnostics.push({
      message: '"Empilhe" only accepts variables of type "byte", "word", or "número".',
      range: valueRange
    });
    return true;
  }

  diagnostics.push({
    message: 'Expected a numeric literal or a definite-article variable after "Empilhe".',
    range: valueRange.start < valueRange.end
      ? valueRange
      : { start: keyword.start, end: keyword.end }
  });
  return true;
}

function isPushableNumericType(typeName: string, symbols: TypeSymbolTable): boolean {
  return ['byte', 'word', 'número'].some(baseType =>
    symbols.getBaseTypeDistance(typeName, baseType) !== undefined
  );
}

function parseRoutineProcess(
  source: string,
  statement: SourceRange,
  caller: RoutineDeclaration,
  routines: RoutineDeclaration[],
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[]
): RoutineProcess | undefined {
  const keyword = readWord(source, statement.start, statement.end);
  if (!keyword) {
    return undefined;
  }

  const returnMarker = findWordOutsideStrings(source, keyword.end, statement.end, 'retornando');
  const invocationEnd = returnMarker?.start ?? statement.end;
  const withMarker = findWordOutsideStrings(source, keyword.end, invocationEnd, 'com');
  const targetRange = trimRange(source, keyword.end, withMarker?.start ?? invocationEnd);
  const fieldAccesses: RoutineFieldAccess[] = [];
  const computedFieldAccesses: RoutineComputedFieldAccess[] = [];
  let kind: RoutineProcess['kind'];
  let target: TypeReference | undefined;
  let library: string | undefined;
  let functionName: string | undefined;

  const quotedRanges = findQuotedRanges(source, targetRange);
  if (quotedRanges.length > 0) {
    const first = quotedRanges[0];
    const second = quotedRanges[1];
    const isExternalTarget = first.start === targetRange.start &&
      second !== undefined &&
      trimRange(source, first.end, second.start).start ===
        trimRange(source, first.end, second.start).end &&
      trimRange(source, second.end, targetRange.end).start ===
        trimRange(source, second.end, targetRange.end).end &&
      isValidStringLiteral(source.slice(first.start, first.end)) &&
      isValidStringLiteral(source.slice(second.start, second.end));
    if (!isExternalTarget) {
      diagnostics.push({
        message: '"Processe" external calls require a library name and function name as string literals.',
        range: targetRange
      });
      return undefined;
    }

    kind = 'external';
    library = source.slice(first.start + 1, first.end - 1).replace(/""/gu, '"');
    functionName = source.slice(second.start + 1, second.end - 1).replace(/""/gu, '"');
  } else {
    kind = 'internal';
    const article = readWord(source, targetRange.start, targetRange.end);
    if (!article || !definiteArticles.has(article.value.toLocaleLowerCase('pt-BR'))) {
      diagnostics.push({
        message: '"Processe" internal calls require a definite article and a function identifier.',
        range: targetRange.start < targetRange.end
          ? targetRange
          : { start: keyword.start, end: keyword.end }
      });
      return undefined;
    }
    target = createTypeReference(source, targetRange);
    if (!resolveRoutineArgumentType(
      source,
      targetRange,
      caller,
      globalVariables,
      symbols,
      fieldAccesses,
      routines,
      computedFieldAccesses
    )) {
      diagnostics.push({
        message: `Unknown function pointer "${source.slice(targetRange.start, targetRange.end)}".`,
        range: targetRange
      });
      return undefined;
    }
  }

  const argumentsList: SourceRange[] = [];
  if (withMarker) {
    const argumentsRange = trimRange(source, withMarker.end, invocationEnd);
    argumentsList.push(...splitProcessArguments(source, argumentsRange));
    if (argumentsList.length === 0) {
      diagnostics.push({
        message: '"Processe" requires at least one argument after "com".',
        range: { start: withMarker.start, end: withMarker.end }
      });
      return undefined;
    }
  }

  for (const argument of argumentsList) {
    if (parseGlobalVariableLiteral(source, argument)) {
      continue;
    }
    const article = readWord(source, argument.start, argument.end);
    if (!article || !definiteArticles.has(article.value.toLocaleLowerCase('pt-BR'))) {
      diagnostics.push({
        message: '"Processe" arguments must be literals or variables introduced by a definite article.',
        range: argument
      });
      return undefined;
    }
    if (!resolveRoutineArgumentType(
      source,
      argument,
      caller,
      globalVariables,
      symbols,
      fieldAccesses,
      routines,
      computedFieldAccesses
    )) {
      diagnostics.push({
        message: `Unknown variable or field "${source.slice(argument.start, argument.end)}" passed to "Processe".`,
        range: argument
      });
      return undefined;
    }
  }

  const returnVariable = returnMarker
    ? parseProcessReturnVariable(source, returnMarker.end, statement.end, symbols, diagnostics)
    : undefined;
  if (returnMarker && !returnVariable) {
    return undefined;
  }

  return {
    kind,
    target,
    library,
    functionName,
    arguments: argumentsList.map(argument => createTypeReference(source, argument)),
    fieldAccesses,
    computedFieldAccesses,
    returnVariable,
    range: statement
  };
}

function splitProcessArguments(source: string, range: SourceRange): SourceRange[] {
  const argumentsList: SourceRange[] = [];
  const quotedRanges = findQuotedRanges(source, range);
  const words = /\p{L}+/gu;
  words.lastIndex = range.start;
  let argumentStart = range.start;
  let match: RegExpExecArray | null;
  while ((match = words.exec(source)) && match.index < range.end) {
    if (quotedRanges.some(quoted => match!.index >= quoted.start && match!.index < quoted.end)) {
      continue;
    }
    const wordEnd = match.index + match[0].length;
    if (
      match[0].toLocaleLowerCase('pt-BR') !== 'e' ||
      isWordCharacter(match.index > range.start ? source[match.index - 1] : '') ||
      isWordCharacter(wordEnd < range.end ? source[wordEnd] : '')
    ) {
      continue;
    }
    const argument = trimRange(source, argumentStart, match.index);
    if (argument.start === argument.end) {
      return [];
    }
    argumentsList.push(argument);
    argumentStart = wordEnd;
  }
  const finalArgument = trimRange(source, argumentStart, range.end);
  if (finalArgument.start === finalArgument.end) {
    return [];
  }
  argumentsList.push(finalArgument);
  return argumentsList;
}

function parseProcessReturnVariable(
  source: string,
  start: number,
  end: number,
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[]
): RoutineLocalVariable | undefined {
  const article = readWord(source, start, end);
  if (!article || !indefiniteArticles.has(article.value.toLocaleLowerCase('pt-BR'))) {
    diagnostics.push({
      message: '"Processe" return values require an indefinite article and a return type.',
      range: trimRange(source, start, end)
    });
    return undefined;
  }

  const markers = new Set([
    'denominado', 'denominada', 'denominados', 'denominadas',
    'chamado', 'chamada', 'chamados', 'chamadas'
  ]);
  const marker = findAnyWord(source, article.end, end, markers);
  const typeRange = trimRange(source, article.end, marker?.start ?? end);
  const words = [...source.slice(typeRange.start, typeRange.end).matchAll(/\S+/gu)];
  let type: TypeReference | undefined;
  for (let firstWord = 0; firstWord < words.length; firstWord++) {
    const candidate = words.slice(firstWord).map(word => word[0]).join(' ');
    if (!symbols.lookup(candidate)) {
      continue;
    }
    type = createTypeReference(source, {
      start: typeRange.start + words[firstWord].index!,
      end: typeRange.end
    });
    break;
  }
  if (!type) {
    diagnostics.push({
      message: `Unknown "Processe" return type "${source.slice(typeRange.start, typeRange.end)}".`,
      range: typeRange
    });
    return undefined;
  }

  const nameRange = marker
    ? trimRange(source, marker.end, end)
    : type.range;
  if (nameRange.start === nameRange.end) {
    diagnostics.push({
      message: 'A variable name is required after "denominado" in a "Processe" return clause.',
      range: marker ?? typeRange
    });
    return undefined;
  }
  return {
    name: createTypeReference(source, nameRange),
    type,
    range: trimRange(source, start, end)
  };
}

function resolveExpressionFieldAccesses(
  source: string,
  expression: RoutineExpression,
  caller: RoutineDeclaration,
  routines: RoutineDeclaration[],
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[]
): void {
  if (expression.kind === 'binary') {
    resolveExpressionFieldAccesses(
      source,
      expression.left,
      caller,
      routines,
      globalVariables,
      symbols,
      diagnostics
    );
    resolveExpressionFieldAccesses(
      source,
      expression.right,
      caller,
      routines,
      globalVariables,
      symbols,
      diagnostics
    );
    return;
  }
  resolveFieldAccessRange(
    source,
    expression.range,
    caller,
    routines,
    globalVariables,
    symbols,
    diagnostics
  );
}

function resolveFieldAccessRange(
  source: string,
  range: SourceRange,
  caller: RoutineDeclaration,
  routines: RoutineDeclaration[],
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[]
): void {
  if (findStructureAccessMarkers(source, range).length === 0) {
    return;
  }
  const expression = parseRoutineExpression(source, range, []);
  if (expression) {
    resolveExpressionFieldAccesses(
      source,
      expression,
      caller,
      routines,
      globalVariables,
      symbols,
      diagnostics
    );
    return;
  }

  const fieldAccesses: RoutineFieldAccess[] = [];
  const computedFieldAccesses: RoutineComputedFieldAccess[] = [];
  const resolvedType = resolveRoutineArgumentType(
    source,
    range,
    caller,
    globalVariables,
    symbols,
    fieldAccesses,
    routines,
    computedFieldAccesses
  );
  if (!resolvedType) {
    diagnostics.push({
      message: `Unknown structure field access "${source.slice(range.start, range.end)}".`,
      range
    });
    return;
  }
  caller.computedFieldAccesses.push(...computedFieldAccesses);
}

function resolveRoutineCall(
  source: string,
  statementRange: SourceRange,
  routines: RoutineDeclaration[],
  caller: RoutineDeclaration,
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable
): RoutineCall | undefined {
  const statement = normalizeRoutineName(source.slice(statementRange.start, statementRange.end));
  const exactMatch = routines.find(routine =>
    routine.parameters.length === 0 &&
    routineNames(routine).some(name => normalizeRoutineName(name.name) === statement)
  );
  if (exactMatch) {
    return {
      name: createTypeReference(source, statementRange),
      arguments: [],
      target: exactMatch
    };
  }

  const matchingCalls: { call: RoutineCall; distance: number }[] = [];
  for (const routine of routines) {
    if (routine.parameters.length === 0) {
      continue;
    }
    for (const routineName of routineNames(routine)) {
      const nameEnd = matchRoutineNamePrefix(source, statementRange, routineName);
      if (nameEnd === undefined || !/\s/u.test(source[nameEnd] ?? '')) {
        continue;
      }
      const argumentRange = trimRange(
        source,
        nameEnd,
        statementRange.end
      );
      const localVariable = parseLocalVariableDeclaration(
        source,
        argumentRange,
        symbols
      );
      const precedingArgumentsRange = localVariable
        ? trimTrailingWord(
          source,
          trimRange(source, argumentRange.start, localVariable.range.start),
          'para'
        )
        : argumentRange;
      const argumentsList = localVariable
        ? [
          ...splitRoutineArguments(
            source,
            precedingArgumentsRange
          ).filter(argument =>
            normalizeTypeName(source.slice(argument.start, argument.end)) !== 'para'
          ),
          localVariable.name.range
        ]
        : splitRoutineArguments(source, argumentRange);
      const localVariableIndex = localVariable ? argumentsList.length - 1 : -1;
      if (argumentsList.length !== routine.parameters.length) {
        continue;
      }

      const distances: number[] = [];
      const fieldAccesses: RoutineFieldAccess[] = [];
      const computedFieldAccesses: RoutineComputedFieldAccess[] = [];
      for (let index = 0; index < argumentsList.length; index++) {
        const argumentType = localVariableIndex === index
          ? localVariable?.type
          : resolveRoutineArgumentType(
            source,
            argumentsList[index],
            caller,
            globalVariables,
            symbols,
            fieldAccesses,
            routines,
            computedFieldAccesses
          );
        const distance = argumentType
          ? symbols.getBaseTypeDistance(
            argumentType.name,
            routine.parameters[index].type.name
          )
          : undefined;
        if (distance === undefined) {
          break;
        }
        distances.push(distance);
      }
      if (distances.length !== argumentsList.length) {
        continue;
      }

      matchingCalls.push({
        call: {
          name: createTypeReference(source, {
            start: statementRange.start,
            end: nameEnd
          }),
          arguments: argumentsList.map(range => createTypeReference(source, range)),
          fieldAccesses,
          computedFieldAccesses,
          localVariable,
          target: routine
        },
        distance: distances.reduce((total, distance) => total + distance, 0)
      });
    }
  }
  return matchingCalls.sort((first, second) => first.distance - second.distance)[0]?.call;
}

function diagnoseUnresolvedRoutineCall(
  source: string,
  statement: SourceRange,
  routines: RoutineDeclaration[],
  caller: RoutineDeclaration,
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[]
): void {
  const firstWord = readWord(source, statement.start, statement.end);
  if (!firstWord || builtInStatementStarts.has(firstWord.value.toLocaleLowerCase('pt-BR'))) {
    return;
  }

  const rest = trimRange(source, firstWord.end, statement.end);
  const definiteArticle = findAnyWord(source, rest.start, rest.end, definiteArticles);
  const matchesDeclaredRoutineName = routines.some(candidate =>
    routineNames(candidate).some(name => {
      const nameEnd = matchRoutineNamePrefix(source, statement, name);
      return nameEnd !== undefined &&
        /\s/u.test(source[nameEnd] ?? '') &&
        trimRange(source, nameEnd, statement.end).start < statement.end;
    })
  );
  const looksLikeCall = rest.start === rest.end ||
    Boolean(definiteArticle || parseGlobalVariableLiteral(source, rest) || matchesDeclaredRoutineName);
  if (!looksLikeCall) {
    return;
  }

  for (const candidate of routines) {
    if (!candidate.parameters.length) {
      continue;
    }
    for (const name of routineNames(candidate)) {
      const nameEnd = matchRoutineNamePrefix(source, statement, name);
      if (nameEnd === undefined || !/\s/u.test(source[nameEnd] ?? '')) {
        continue;
      }
      const argumentsRange = trimRange(source, nameEnd, statement.end);
      const argumentsList = splitRoutineArguments(source, argumentsRange);
      if (argumentsList.length !== candidate.parameters.length) {
        continue;
      }
      for (let index = 0; index < argumentsList.length; index++) {
        const argument = argumentsList[index];
        const article = readWord(source, argument.start, argument.end);
        if (
          !article ||
          !definiteArticles.has(article.value.toLocaleLowerCase('pt-BR'))
        ) {
          continue;
        }
        const variableNameRange = trimRange(source, article.end, argument.end);
        const variableName = normalizeTypeName(
          source.slice(variableNameRange.start, variableNameRange.end)
        );
        if (resolveVariableType(caller, globalVariables, variableName)) {
          continue;
        }
        const argumentType = findTypeSuffix(source, variableNameRange, symbols);
        if (
          argumentType &&
          isCompatibleType(argumentType, candidate.parameters[index].type, symbols)
        ) {
          diagnostics.push({
            message: `Unknown variable "${source.slice(variableNameRange.start, variableNameRange.end)}" passed to routine "${name.name}".`,
            range: variableNameRange
          });
          return;
        }
      }
    }
  }

  diagnostics.push({
    message: `No compatible routine found for "${source.slice(statement.start, statement.end)}".`,
    range: statement
  });
}

function findTypeSuffix(
  source: string,
  nameRange: SourceRange,
  symbols: TypeSymbolTable
): TypeReference | undefined {
  const words = [...source.slice(nameRange.start, nameRange.end).matchAll(/\S+/gu)];
  for (let firstWord = 0; firstWord < words.length; firstWord++) {
    const candidateName = words.slice(firstWord).map(word => word[0]).join(' ');
    if (!symbols.lookup(candidateName)) {
      continue;
    }
    const typeStart = nameRange.start + words[firstWord].index!;
    return createTypeReference(source, { start: typeStart, end: nameRange.end });
  }
  return undefined;
}

function routineNames(routine: RoutineDeclaration): TypeReference[] {
  return [routine.name, ...routine.alternateNames];
}

function matchRoutineNamePrefix(
  source: string,
  statementRange: SourceRange,
  routineName: TypeReference
): number | undefined {
  const expectedName = normalizeRoutineName(routineName.name);
  for (let end = statementRange.start + 1; end <= statementRange.end; end++) {
    if (end < statementRange.end && !/\s/u.test(source[end])) {
      continue;
    }
    const prefix = normalizeRoutineName(source.slice(statementRange.start, end));
    if (prefix === expectedName) {
      return end;
    }
  }
  return undefined;
}

function splitRoutineArguments(source: string, range: SourceRange): SourceRange[] {
  const argumentsList: SourceRange[] = [];
  let argumentStart = range.start;
  const words = /\p{L}+/gu;
  words.lastIndex = range.start;
  let match: RegExpExecArray | null;
  while ((match = words.exec(source)) && match.index < range.end) {
    const wordEnd = match.index + match[0].length;
    if (
      !conjunctions.has(match[0].toLocaleLowerCase('pt-BR')) ||
      isWordCharacter(match.index > range.start ? source[match.index - 1] : '') ||
      isWordCharacter(wordEnd < range.end ? source[wordEnd] : '')
    ) {
      continue;
    }
    const nextStart = skipWhitespace(source, wordEnd, range.end);
    if (nextStart >= range.end) {
      continue;
    }
    argumentsList.push(trimRange(source, argumentStart, match.index));
    argumentStart = nextStart;
  }
  argumentsList.push(trimRange(source, argumentStart, range.end));
  return argumentsList.filter(argument => argument.start < argument.end);
}

function resolveRoutineArgumentType(
  source: string,
  argument: SourceRange,
  caller: RoutineDeclaration,
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable,
  fieldAccesses: RoutineFieldAccess[] = [],
  routines: RoutineDeclaration[] = [],
  computedFieldAccesses: RoutineComputedFieldAccess[] = []
): TypeReference | undefined {
  const fieldAccessType = resolveStructureFieldAccess(
    source,
    argument,
    caller,
    globalVariables,
    symbols,
    fieldAccesses,
    routines,
    computedFieldAccesses
  );
  if (fieldAccessType) {
    return fieldAccessType;
  }

  const literal = parseGlobalVariableLiteral(source, argument);
  if (literal) {
    const name = inferGlobalVariableTypeName(literal);
    return { name, normalizedName: normalizeTypeName(name), range: argument };
  }
  const firstWord = readWord(source, argument.start, argument.end);
  if (
    firstWord &&
    (definiteArticles.has(firstWord.value.toLocaleLowerCase('pt-BR')) ||
      ['este', 'esta', 'estes', 'estas'].includes(firstWord.value.toLocaleLowerCase('pt-BR')))
  ) {
    const variableName = normalizeTypeName(source.slice(firstWord.end, argument.end));
    const variableType = resolveVariableType(
      caller,
      globalVariables,
      variableName
    );
    return variableType;
  }
  return undefined;
}

function resolveStructureFieldAccess(
  source: string,
  argument: SourceRange,
  caller: RoutineDeclaration,
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable,
  fieldAccesses: RoutineFieldAccess[],
  routines: RoutineDeclaration[],
  computedFieldAccesses: RoutineComputedFieldAccess[]
): TypeReference | undefined {
  const segments: SourceRange[] = [];
  const accessMarkers = findStructureAccessMarkers(source, argument);
  if (accessMarkers.length === 0) {
    return undefined;
  }

  let segmentStart = argument.start;
  for (const marker of accessMarkers) {
    segments.push(trimRange(source, segmentStart, marker.start));
    segmentStart = marker.end;
  }
  segments.push(trimRange(source, segmentStart, argument.end));
  if (segments.some(segment => segment.start === segment.end)) {
    return undefined;
  }

  const firstArticle = readWord(source, segments[0].start, segments[0].end);
  if (!firstArticle || !definiteArticles.has(firstArticle.value.toLocaleLowerCase('pt-BR'))) {
    return undefined;
  }
  const fieldRanges = [
    trimRange(source, firstArticle.end, segments[0].end),
    ...segments.slice(1, -1)
  ].reverse();
  const rootRange = segments[segments.length - 1];
  const rootArticle = readWord(source, rootRange.start, rootRange.end);
  const rootNameRange = rootArticle &&
    definiteArticles.has(rootArticle.value.toLocaleLowerCase('pt-BR'))
    ? trimRange(source, rootArticle.end, rootRange.end)
    : rootRange;
  const rootName = normalizeTypeName(source.slice(rootNameRange.start, rootNameRange.end));
  const rootType = resolveVariableType(
    caller,
    globalVariables,
    rootName
  ) ?? (
    caller.computedField &&
      normalizeTypeName(caller.computedField.structureType.name) === rootName
      ? caller.computedField.structureType
      : undefined
  );
  if (!rootType || fieldRanges.some(fieldRange => fieldRange.start === fieldRange.end)) {
    return undefined;
  }

  let currentType = rootType;
  const resolvedAccesses: RoutineFieldAccess[] = [];
  for (const fieldRange of fieldRanges) {
    const fieldName = normalizeTypeName(source.slice(fieldRange.start, fieldRange.end));
    const field = findStructureField(currentType.name, fieldName, symbols);
    if (!field) {
      const computedField = findComputedFieldRoutine(
        currentType.name,
        fieldName,
        routines,
        symbols
      );
      if (!computedField?.computedField?.valueType) {
        return undefined;
      }
      computedFieldAccesses.push({
        reference: createTypeReference(source, fieldRange),
        target: computedField
      });
      currentType = computedField.computedField.valueType;
      continue;
    }
    resolvedAccesses.push({
      reference: createTypeReference(source, fieldRange),
      target: field
    });
    currentType = field.type;
  }
  fieldAccesses.push(...resolvedAccesses);
  return currentType;
}

function findComputedFieldRoutine(
  structureType: string,
  fieldName: string,
  routines: RoutineDeclaration[],
  symbols: TypeSymbolTable
): RoutineDeclaration | undefined {
  return routines
    .filter(routine =>
      routine.computedField &&
      routine.computedField.name.normalizedName === fieldName &&
      symbols.getBaseTypeDistance(
        structureType,
        routine.computedField.structureType.name
      ) !== undefined
    )
    .sort((first, second) =>
      (symbols.getBaseTypeDistance(
        structureType,
        first.computedField!.structureType.name
      ) ?? Number.MAX_SAFE_INTEGER) -
      (symbols.getBaseTypeDistance(
        structureType,
        second.computedField!.structureType.name
      ) ?? Number.MAX_SAFE_INTEGER)
    )[0];
}

function findStructureAccessMarkers(
  source: string,
  range: SourceRange
): SourceRange[] {
  const markers: SourceRange[] = [];
  const words = /\p{L}+/gu;
  words.lastIndex = range.start;
  let match: RegExpExecArray | null;
  while ((match = words.exec(source)) && match.index < range.end) {
    const word = match[0].toLocaleLowerCase('pt-BR');
    if (!['deste', 'desta', 'destes', 'destas'].includes(word)) {
      continue;
    }
    markers.push({ start: match.index, end: match.index + match[0].length });
  }
  return markers;
}

function findStructureField(
  typeName: string,
  fieldName: string,
  symbols: TypeSymbolTable
): NamedTypeField | undefined {
  let symbol = symbols.lookup(typeName);
  const visited = new Set<TypeSymbol>();
  while (symbol && !visited.has(symbol)) {
    visited.add(symbol);
    const field = symbol.fields?.find(candidate =>
      candidate.kind === 'named' &&
      normalizeTypeName(candidate.name.name) === fieldName
    );
    if (field?.kind === 'named') {
      return field;
    }
    symbol = symbol.baseType ? symbols.lookup(symbol.baseType.name) : undefined;
  }
  return undefined;
}

function resolveVariableType(
  routine: RoutineDeclaration,
  globalVariables: GlobalVariableSymbolTable,
  name: string
): TypeReference | undefined {
  const localVariable = findRoutineVariable(routine, name);
  if (localVariable) {
    return localVariable.type;
  }

  const globalVariable = globalVariables.lookup(name);
  const typeName = globalVariable?.typeName;
  return typeName
    ? {
      name: typeName,
      normalizedName: normalizeTypeName(typeName),
      range: globalVariable.type?.range ?? globalVariable.declaration.name.range
    }
    : undefined;
}

function findRoutineVariable(
  routine: RoutineDeclaration,
  name: string
): RoutineParameter | RoutineLocalVariable | undefined {
  const localVariable = [...routine.localVariables]
    .reverse()
    .find(variable => variable.name.normalizedName === name);
  return localVariable ?? routine.parameters.find(parameter => parameter.name.normalizedName === name);
}

function isCompatibleType(
  actual: TypeReference,
  expected: TypeReference,
  symbols: TypeSymbolTable
): boolean {
  return symbols.getBaseTypeDistance(actual.name, expected.name) !== undefined ||
    actual.normalizedName === expected.normalizedName;
}

function parseLocalVariableDeclaration(
  source: string,
  argumentsRange: SourceRange,
  symbols: TypeSymbolTable
): RoutineLocalVariable | undefined {
  const articles = /\p{L}+/gu;
  articles.lastIndex = argumentsRange.start;
  let articleMatch: RegExpExecArray | null;
  let localVariable: RoutineLocalVariable | undefined;
  while ((articleMatch = articles.exec(source)) && articleMatch.index < argumentsRange.end) {
    const article = articleMatch[0].toLocaleLowerCase('pt-BR');
    if (!indefiniteArticles.has(article)) {
      continue;
    }
    const articleEnd = articleMatch.index + articleMatch[0].length;
    const markers = new Set([
      'denominado', 'denominada', 'denominados', 'denominadas',
      'chamado', 'chamada', 'chamados', 'chamadas'
    ]);
    const marker = findAnyWord(source, articleEnd, argumentsRange.end, markers);
    const typeRange = trimRange(source, articleEnd, marker?.start ?? argumentsRange.end);
    if (typeRange.start === typeRange.end) {
      continue;
    }

    const typeWords = [...source.slice(typeRange.start, typeRange.end).matchAll(/\S+/gu)];
    let resolvedType: TypeReference | undefined;
    for (let firstWord = 0; firstWord < typeWords.length; firstWord++) {
      const candidateName = typeWords.slice(firstWord).map(word => word[0]).join(' ');
      if (!symbols.lookup(candidateName)) {
        continue;
      }
      const typeStart = typeRange.start + typeWords[firstWord].index!;
      resolvedType = createTypeReference(source, { start: typeStart, end: typeRange.end });
      break;
    }
    if (!resolvedType) {
      continue;
    }

    const nameRange = marker
      ? trimRange(source, marker.end, argumentsRange.end)
      : typeRange;
    if (nameRange.start === nameRange.end) {
      continue;
    }
    localVariable = {
      name: createTypeReference(source, nameRange),
      type: resolvedType,
      range: { start: articleMatch.index, end: argumentsRange.end }
    };
    articles.lastIndex = argumentsRange.end;
  }
  return localVariable;
}

function trimTrailingWord(source: string, range: SourceRange, word: string): SourceRange {
  const words = [...source.slice(range.start, range.end).matchAll(/\p{L}+/gu)];
  const lastWord = words[words.length - 1];
  if (!lastWord || lastWord[0].toLocaleLowerCase('pt-BR') !== word) {
    return range;
  }
  return trimRange(source, range.start, range.start + lastWord.index!);
}

export function findRoutineDeclarationAtOffset(
  parsedDocument: ParsedDocument,
  offset: number
): RoutineDeclaration | undefined {
  for (const routine of parsedDocument.routines) {
    for (const call of routine.calls) {
      if (
        call.target &&
        offset >= call.name.range.start &&
        offset <= call.name.range.end
      ) {
        return call.target;
      }
    }
  }
  return undefined;
}

export function findRoutineFieldAtOffset(
  parsedDocument: ParsedDocument,
  offset: number
): NamedTypeField | undefined {
  for (const routine of parsedDocument.routines) {
  	for (const process of routine.processes) {
  	  const access = process.fieldAccesses.find(candidate =>
  	    offset >= candidate.reference.range.start &&
  	    offset <= candidate.reference.range.end
  	  );
  	  if (access) {
  	    return access.target;
  	  }
  	}
  	for (const call of routine.calls) {
  		const access = call.fieldAccesses?.find(candidate =>
  			offset >= candidate.reference.range.start &&
  			offset <= candidate.reference.range.end
  		);
  		if (access) {
  			return access.target;
  		}
  	}
  }
  return undefined;
}

function validateReservedNames(
  source: string,
  declarations: TypeDeclaration[],
  globalVariables: GlobalVariableDeclaration[],
  diagnostics: ParserDiagnostic[]
): void {
  for (const identifier of [
    ...declarations.map(declaration => declaration.name),
    ...globalVariables.map(declaration => declaration.name)
  ]) {
    const words = /\p{L}+/gu;
    const text = source.slice(identifier.range.start, identifier.range.end);
    let match: RegExpExecArray | null;
    while ((match = words.exec(text))) {
      if (!reservedIdentifierWords.has(match[0].toLocaleLowerCase('pt-BR'))) {
        continue;
      }
      const start = identifier.range.start + match.index;
      diagnostics.push({
        message: `Reserved word "${match[0]}" cannot be used in an identifier.`,
        range: { start, end: start + match[0].length }
      });
    }
  }
}

interface ParsedRoutineHeader {
  name: TypeReference;
  parameters: RoutineParameter[];
  computedField?: RoutineComputedField;
  returnParameter?: RoutineParameter;
  annotation?: 'rotina' | 'função';
  isBooleanFunction: boolean;
  isPrimary: boolean;
  range: SourceRange;
}

function parseComputedFieldHeader(
  source: string,
  start: number,
  end: number
): {
  name: TypeReference;
  structureType: TypeReference;
  returnMarker: SourceRange;
} | undefined {
  const verb = readWord(source, start, end);
  if (!verb || verb.value.toLocaleLowerCase('pt-BR') !== 'atribua') {
  	return undefined;
  }
  const fieldArticle = readWord(source, verb.end, end);
  if (!fieldArticle || !definiteArticles.has(fieldArticle.value.toLocaleLowerCase('pt-BR'))) {
  	return undefined;
  }
  const structureMarker = findAnyWord(
  	source,
  	fieldArticle.end,
  	end,
  	new Set(['dum', 'duma', 'duns', 'dumas'])
  );
  if (!structureMarker) {
  	return undefined;
  }
  const structureStart = skipWhitespace(source, structureMarker.end, end);
  const returnMarker = findWord(source, structureStart, end, 'para');
  if (!returnMarker) {
  	return undefined;
  }
  const nameRange = trimRange(source, fieldArticle.end, structureMarker.start);
  const structureRange = trimRange(source, structureStart, returnMarker.start);
  const returnArticle = readWord(source, returnMarker.end, end);
  if (
  	nameRange.start === nameRange.end ||
  	structureRange.start === structureRange.end ||
  	!returnArticle ||
  	!indefiniteArticles.has(returnArticle.value.toLocaleLowerCase('pt-BR'))
  ) {
  	return undefined;
  }
  return {
  	name: createTypeReference(source, nameRange),
  	structureType: createTypeReference(source, structureRange),
  	returnMarker
  };
}

function parseRoutineDeclarations(
  source: string,
  diagnostics: ParserDiagnostic[]
): RoutineDeclaration[] {
    const headerPattern = /(?:(rotina|função)\s+)?para\s+que\s+se(?:\s+(determine)\s+(se))?/giu;
    const headers: ParsedRoutineHeader[] = [];
    let match: RegExpExecArray | null;

    while ((match = headerPattern.exec(source))) {
      const lineStart = Math.max(
        source.lastIndexOf('\n', match.index),
        source.lastIndexOf('\r', match.index)
      ) + 1;
      if (match.index !== lineStart) {
        continue;
      }

      const terminatorIndex = source.slice(headerPattern.lastIndex, source.length)
        .search(/[:;]/u);
      if (terminatorIndex === -1) {
        continue;
      }
      const headerEnd = headerPattern.lastIndex + terminatorIndex;
      const usingMarker = findAnyWord(
        source,
        headerPattern.lastIndex,
        headerEnd,
        routineUsingMarkers
      );
      const returningMarker = findWord(source, headerPattern.lastIndex, headerEnd, 'retornando');
      const signatureEnd = returningMarker?.start ?? headerEnd;
      const isBooleanFunction = Boolean(match[2]);
      const computedField = parseComputedFieldHeader(
        source,
        headerPattern.lastIndex,
        headerEnd
      );
      const parameterArticle = findAnyWord(
        source,
        usingMarker?.end ?? headerPattern.lastIndex,
        signatureEnd,
        indefiniteArticles
      );
      const predicateMarker = isBooleanFunction
        ? findAnyWord(
          source,
          parameterArticle?.end ?? headerPattern.lastIndex,
          signatureEnd,
          routinePredicateWords
        )
        : undefined;
      const predicateParameters = predicateMarker && parameterArticle
        ? [
          parseRoutineParameter(source, parameterArticle.start, predicateMarker.start),
          parseRoutineParameter(source, predicateMarker.end, signatureEnd)
        ].filter((parameter): parameter is RoutineParameter => parameter !== undefined)
        : undefined;
      const parameterStart = usingMarker?.end ?? parameterArticle?.start;
      const nameEnd = Math.min(
        usingMarker?.start ?? parameterArticle?.start ?? headerEnd,
        returningMarker?.start ?? headerEnd
      );
      const nameRange = predicateMarker
        ? { start: predicateMarker.start, end: predicateMarker.end }
        : computedField
          ? trimRange(source, headerPattern.lastIndex, computedField.returnMarker.start)
        : trimRange(source, headerPattern.lastIndex, nameEnd);
      if (nameRange.start === nameRange.end) {
        diagnostics.push({
          message: 'Routine name is required.',
          range: { start: match.index, end: headerEnd }
        });
        headerPattern.lastIndex = headerEnd + 1;
        continue;
      }
      for (const reservedKeyword of [
        'retorne', 'diga', 'preserve', 'empilhe', 'processe', 'itere', 'pare', 'reitere'
      ]) {
        const reservedWord = findWord(source, nameRange.start, nameRange.end, reservedKeyword);
        if (!reservedWord) {
          continue;
        }
        const displayName = reservedKeyword === 'preserve'
          ? 'Preserve'
          : reservedKeyword === 'empilhe'
            ? 'Empilhe'
            : reservedKeyword === 'processe'
              ? 'Processe'
              : reservedKeyword === 'itere'
                ? 'Itere'
                : reservedKeyword === 'pare'
                  ? 'Pare'
                  : reservedKeyword === 'reitere'
                    ? 'Reitere'
                    : reservedKeyword === 'diga' ? 'Diga' : 'Retorne';
        diagnostics.push({
          message: `"${displayName}" is a reserved statement keyword and cannot be used in a routine name.`,
          range: reservedWord
        });
      }

      const parametersEnd = returningMarker?.start ?? headerEnd;
      const parameters = predicateParameters ?? (parameterStart !== undefined
        ? parseRoutineParameters(source, parameterStart, parametersEnd, diagnostics)
        : []);
      if (parameterStart !== undefined && parameters.length === 0) {
        const parameterMarker = usingMarker ?? parameterArticle;
        diagnostics.push({
          message: 'At least one parameter is required in the routine header.',
          range: parameterMarker
            ? { start: parameterMarker.start, end: parameterMarker.end }
            : { start: parameterStart, end: parametersEnd }
        });
      }
      const returnParameter = returningMarker
        ? parseRoutineParameter(source, returningMarker.end, headerEnd)
        : undefined;
      if (returningMarker && !returnParameter) {
        diagnostics.push({
          message: 'A return type is required after "retornando".',
          range: { start: returningMarker.start, end: headerEnd }
        });
      }

      headers.push({
        name: createTypeReference(source, nameRange),
        parameters,
        computedField: computedField
          ? {
            name: computedField.name,
            structureType: computedField.structureType
          }
          : undefined,
        returnParameter,
        annotation: match[1]?.toLocaleLowerCase('pt-BR') as 'rotina' | 'função' | undefined,
        isBooleanFunction,
        isPrimary: source[headerEnd] === ':',
        range: { start: match.index, end: headerEnd + 1 }
      });
      headerPattern.lastIndex = headerEnd + 1;
    }

    const declarations: RoutineDeclaration[] = [];
    let alternateHeaders: ParsedRoutineHeader[] = [];
    let previousEnd: number | undefined;
    for (const header of headers) {
      if (
        previousEnd !== undefined &&
        source.slice(previousEnd, header.range.start).trim().length > 0
      ) {
        alternateHeaders = [];
      }
      previousEnd = header.range.end;
      if (!header.isPrimary) {
        alternateHeaders.push(header);
        continue;
      }

      for (const alternate of alternateHeaders) {
        if (hasEquivalentRoutineSignature(alternate, header)) {
          diagnostics.push({
            message: 'Alternate routine header is semantically equivalent to the primary header.',
            range: alternate.name.range
          });
        }
      }

      declarations.push({
        name: header.name,
        alternateNames: alternateHeaders.map(alternate => alternate.name),
        parameters: header.parameters,
        preservedParameters: [],
        assignments: [],
        outputs: [],
        localVariables: [],
        conditionals: [],
        processes: [],
        loopInstructions: [],
        computedFieldAccesses: [],
        computedField: header.computedField,
        returnParameter: header.returnParameter,
        calls: [],
        annotation: header.annotation,
        isBooleanFunction: header.isBooleanFunction,
        range: {
          start: alternateHeaders[0]?.range.start ?? header.range.start,
          end: header.range.end
        },
        bodyRange: { start: header.range.end, end: source.length }
      });
      alternateHeaders = [];
    }

    for (let index = 0; index < headers.length - 1; index++) {
      const header = headers[index];
      const nextHeader = headers[index + 1];
      const headersAreAdjacent =
        source.slice(header.range.end, nextHeader.range.start).trim().length === 0;
      if (!header.isPrimary || !headersAreAdjacent) {
        continue;
      }

      if (nextHeader.isPrimary) {
        diagnostics.push({
          message: 'Consecutive primary routine headers may leave the preceding routine without a body.',
          range: { start: header.range.end - 1, end: header.range.end },
          severity: 'hint'
        });
      } else {
        diagnostics.push({
          message: 'Alternate routine headers must end with ";"; use ":" only on the primary header.',
          range: { start: header.range.end - 1, end: header.range.end },
          severity: 'hint'
        });
      }
    }

    return declarations;
  }

function hasEquivalentRoutineSignature(
  alternate: ParsedRoutineHeader,
  primary: ParsedRoutineHeader
): boolean {
  return normalizeRoutineName(alternate.name.name) === normalizeRoutineName(primary.name.name) &&
    alternate.parameters.length === primary.parameters.length &&
    alternate.parameters.every((parameter, index) =>
      parameter.type.normalizedName === primary.parameters[index].type.normalizedName
    );
}

function parseRoutineParameters(
  source: string,
  start: number,
  end: number,
  diagnostics: ParserDiagnostic[]
): RoutineParameter[] {
    const parameters: RoutineParameter[] = [];
    let parameterStart = skipWhitespace(source, start, end);
    while (parameterStart < end) {
      const separator = findRoutineParameterSeparator(source, parameterStart, end);
      const parameterEnd = separator?.start ?? end;
      const parameter = parseRoutineParameter(source, parameterStart, parameterEnd);
      if (!parameter) {
        diagnostics.push({
          message: 'Invalid routine parameter declaration.',
          range: trimRange(source, parameterStart, parameterEnd)
        });
      } else {
        parameters.push(parameter);
      }
      if (!separator) {
        break;
      }
      parameterStart = separator.nextStart;
    }
    return parameters;
  }

function parseRoutineParameter(
  source: string,
  start: number,
  end: number
): RoutineParameter | undefined {
    const parameterStart = skipWhitespace(source, start, end);
    const article = readWord(source, parameterStart, end);
    if (!article || !indefiniteArticles.has(article.value.toLocaleLowerCase('pt-BR'))) {
      return undefined;
    }

    const markers = new Set([
      'denominado', 'denominada', 'denominados', 'denominadas',
      'chamado', 'chamada', 'chamados', 'chamadas'
    ]);
    const marker = findAnyWord(source, article.end, end, markers);
    const typeRange = trimRange(source, article.end, marker?.start ?? end);
    const nameRange = marker
      ? trimRange(source, marker.end, end)
      : typeRange;
    if (typeRange.start === typeRange.end || nameRange.start === nameRange.end) {
      return undefined;
    }

    return {
      name: createTypeReference(source, nameRange),
      type: createTypeReference(source, typeRange)
    };
  }

function findRoutineParameterSeparator(
  source: string,
  start: number,
  end: number
): { start: number; nextStart: number } | undefined {
    const commaIndex = source.indexOf(',', start);
    let separator = commaIndex !== -1 && commaIndex < end
      ? { start: commaIndex, nextStart: skipWhitespace(source, commaIndex + 1, end) }
      : undefined;
    const words = /\p{L}+/gu;
    words.lastIndex = start;
    let match: RegExpExecArray | null;
    while ((match = words.exec(source)) && match.index < end) {
      const wordEnd = match.index + match[0].length;
      const word = match[0].toLocaleLowerCase('pt-BR');
      if (
        (!conjunctions.has(word) && word !== 'para') ||
        isWordCharacter(match.index > start ? source[match.index - 1] : '') ||
        isWordCharacter(wordEnd < end ? source[wordEnd] : '')
      ) {
        continue;
      }
      if (separator && separator.start < match.index) {
        break;
      }
      const nextStart = skipWhitespace(source, wordEnd, end);
      const nextArticle = readWord(source, nextStart, end);
      if (nextArticle && indefiniteArticles.has(nextArticle.value.toLocaleLowerCase('pt-BR'))) {
        separator = { start: match.index, nextStart };
        break;
      }
    }
    return separator;
  }

function resolveRoutineParameters(
  source: string,
  routines: RoutineDeclaration[],
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[]
): void {
    for (const routine of routines) {
      const parameters = [
        ...routine.parameters,
        ...(routine.returnParameter ? [routine.returnParameter] : [])
      ];
      for (const parameter of parameters) {
        const typeText = source.slice(parameter.type.range.start, parameter.type.range.end);
        const words = [...typeText.matchAll(/\S+/gu)];
        let resolvedType: TypeReference | undefined;
        for (let firstWord = 0; firstWord < words.length; firstWord++) {
          const candidateName = words.slice(firstWord).map(word => word[0]).join(' ');
          if (!symbols.lookup(candidateName)) {
            continue;
          }
          resolvedType = createTypeReference(source, {
            start: parameter.type.range.start + words[firstWord].index!,
            end: parameter.type.range.end
          });
          break;
        }
        if (!resolvedType) {
          diagnostics.push({
            message: `Unknown routine parameter type "${parameter.type.name}".`,
            range: parameter.type.range
          });
          continue;
        }
        parameter.type = resolvedType;
    }
  }
}

function resolveComputedFields(
  routines: RoutineDeclaration[],
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[]
): void {
  for (const routine of routines) {
  	const computedField = routine.computedField;
  	if (!computedField) {
  		continue;
  	}

  	const structure = symbols.lookup(computedField.structureType.name);
  	if (!structure) {
  		diagnostics.push({
  			message: `Unknown computed field structure type "${computedField.structureType.name}".`,
  			range: computedField.structureType.range
  		});
  		continue;
  	}
  	if (symbols.getBaseTypeDistance(structure.name, 'estrutura') === undefined) {
  		diagnostics.push({
  			message: `Type "${computedField.structureType.name}" is not a structure and cannot own a computed field.`,
  			range: computedField.structureType.range
  		});
  	}
  	if (routine.parameters.length !== 1) {
  		diagnostics.push({
  			message: 'A computed field routine must declare exactly one result parameter after "para".',
  			range: routine.name.range
  		});
  		continue;
  	}
  	computedField.valueType = routine.parameters[0].type;
  }
}

function maskComments(source: string, diagnostics: ParserDiagnostic[]): string {
  const characters = source.split('');
  let inString = false;
  let inBlockComment = false;

  for (let index = 0; index < characters.length; index++) {
    const character = characters[index];
    const nextCharacter = characters[index + 1];

    if (inBlockComment) {
      if (character === ']') {
        characters[index] = ' ';
        inBlockComment = false;
      } else if (/[\p{Cc}]/u.test(character)) {
        diagnostics.push({
          message: 'Non-printable characters are not allowed in comments.',
          range: { start: index, end: index + 1 }
        });
        if (character !== '\n' && character !== '\r') {
          characters[index] = ' ';
        }
      } else {
        characters[index] = ' ';
      }
      continue;
    }

    if (inString) {
      if (character === '"' && nextCharacter === '"') {
        index++;
        continue;
      }
      if (character === '"') {
        inString = false;
      }
      continue;
    }

    if (character === '"') {
      inString = true;
      continue;
    }

    if (character === '[') {
      characters[index] = ' ';
      inBlockComment = true;
      continue;
    }

    if (character === '\\') {
      characters[index] = ' ';
      for (; index < characters.length; index++) {
        const commentCharacter = characters[index];
        if (commentCharacter === '\n' || commentCharacter === '\r') {
          break;
        }
        if (/[\p{Cc}]/u.test(commentCharacter)) {
          diagnostics.push({
            message: 'Non-printable characters are not allowed in comments.',
            range: { start: index, end: index + 1 }
          });
        }
        characters[index] = ' ';
      }
    }
  }

  return characters.join('');
}

function parseGlobalVariableDeclaration(
  source: string,
  segmentStart: number,
  periodIndex: number,
  diagnostics: ParserDiagnostic[]
): GlobalVariableDeclaration | undefined {
  let contentStart = segmentStart;
  while (contentStart < periodIndex && /\s/u.test(source[contentStart])) {
    contentStart++;
  }

  const article = readWord(source, contentStart, periodIndex);
  if (!article || !definiteArticles.has(article.value.toLocaleLowerCase('pt-BR'))) {
    return undefined;
  }
  const operator = findOperator(source, article.end, periodIndex);
  if (!operator) {
    return undefined;
  }
  const nameRange = trimRange(source, article.end, operator.start);
  if (nameRange.start === nameRange.end) {
    return undefined;
  }

  const typeArticle = readWord(source, operator.end, periodIndex);
  const hasExplicitType = Boolean(
    typeArticle && indefiniteArticles.has(typeArticle.value.toLocaleLowerCase('pt-BR'))
  );
  let type: TypeReference | undefined;
  let initializer: GlobalVariableLiteral | undefined;
  let inferredTypeName: string | undefined;

  if (hasExplicitType && typeArticle) {
    const fieldsKeyword = findWord(source, typeArticle.end, periodIndex, 'com');
    const initializerMarker = findEqualTo(
      source,
      fieldsKeyword?.start ?? typeArticle.end,
      periodIndex
    );
    const typeRange = trimRange(
      source,
      typeArticle.end,
      fieldsKeyword?.start ?? initializerMarker?.start ?? periodIndex
    );
    if (typeRange.start === typeRange.end) {
      return undefined;
    }
    type = createTypeReference(source, typeRange);
    let fields: TypeField[] | undefined;
    if (fieldsKeyword) {
      const fieldsEnd = initializerMarker?.start ?? periodIndex;
      const parsedFields = parseFields(source, fieldsKeyword.end, fieldsEnd);
      if (!parsedFields) {
        return undefined;
      }
      fields = parsedFields.fields;
      diagnostics.push(...parsedFields.diagnostics);
    }
    if (initializerMarker) {
      const initializerRange = trimRange(source, initializerMarker.end, periodIndex);
      initializer = parseGlobalVariableLiteral(source, initializerRange);
      if (!initializer) {
        diagnostics.push({
          message: 'Invalid global variable initializer.',
          range: initializerRange
        });
      }
    }
    return {
      kind: 'global-variable-declaration',
      name: createTypeReference(source, nameRange),
      type,
      fields,
      initializer,
      article: article.value.toLocaleLowerCase('pt-BR'),
      operator: operator.value,
      range: { start: contentStart, end: periodIndex + 1 }
    };
  } else {
    const initializerRange = trimRange(source, operator.end, periodIndex);
    initializer = parseGlobalVariableLiteral(source, initializerRange);
    if (!initializer) {
      diagnostics.push({
        message: 'Invalid global variable initializer.',
        range: initializerRange
      });
    } else {
      inferredTypeName = inferGlobalVariableTypeName(initializer);
    }
  }

  return {
    kind: 'global-variable-declaration',
    name: createTypeReference(source, nameRange),
    type,
    inferredTypeName,
    initializer,
    article: article.value.toLocaleLowerCase('pt-BR'),
    operator: operator.value,
    range: { start: contentStart, end: periodIndex + 1 }
  };
}

function inferGlobalVariableTypeName(literal: GlobalVariableLiteral): string {
  switch (literal.kind) {
    case 'integer':
      return 'número';
    case 'fraction':
    case 'mixed':
      return 'fração';
    case 'hexadecimal':
      return 'texto hexadecimal';
    case 'string':
      return 'string';
  }
}

function findDeclarationPeriod(source: string, start: number): number {
  let inString = false;
  for (let index = start; index < source.length; index++) {
    if (source[index] === '"') {
      if (!inString) {
        inString = true;
        continue;
      }
      if (source[index + 1] === '"') {
        if (
          source[index + 2] === '.' &&
          (index + 3 === source.length || /\s/u.test(source[index + 3]))
        ) {
          inString = false;
          index++;
          continue;
        }
        index++;
        continue;
      }
      inString = false;
      continue;
    }
    if (source[index] === '.' && !inString) {
      return index;
    }
  }
  return -1;
}

function findEqualTo(
  source: string,
  start: number,
  end: number
): { start: number; end: number } | undefined {
  const marker = /\bigual\s+a\b/giu;
  marker.lastIndex = start;
  const match = marker.exec(source);
  if (!match || match.index >= end || match.index + match[0].length > end) {
    return undefined;
  }
  return { start: match.index, end: match.index + match[0].length };
}

function parseGlobalVariableLiteral(
  source: string,
  range: SourceRange
): GlobalVariableLiteral | undefined {
  const text = source.slice(range.start, range.end);
  if (/^[+-]?\d+$/u.test(text)) {
    const value = Number(text);
    return Number.isSafeInteger(value) && value >= -2147483648 && value <= 2147483647
      ? { kind: 'integer', text, range }
      : undefined;
  }

  const mixed = /^([+-]?\d+)\+([+-]?\d+)\/([+-]?\d+)$/u.exec(text);
  if (mixed) {
    return mixed.slice(1).every(isSigned32BitInteger)
      ? { kind: 'mixed', text, range }
      : undefined;
  }

  const fraction = /^([+-]?\d+)\/([+-]?\d+)$/u.exec(text);
  if (fraction) {
    return fraction.slice(1).every(isSigned32BitInteger)
      ? { kind: 'fraction', text, range }
      : undefined;
  }

  if (/^\$[a-f\d]+$/iu.test(text)) {
    return { kind: 'hexadecimal', text, range };
  }

  if (isValidStringLiteral(text)) {
    return { kind: 'string', text, range };
  }

  return undefined;
}

function isSigned32BitInteger(value: string): boolean {
  const number = Number(value);
  return Number.isSafeInteger(number) && number >= -2147483648 && number <= 2147483647;
}

function isValidStringLiteral(text: string): boolean {
  if (text.length < 2 || text[0] !== '"' || text[text.length - 1] !== '"') {
    return false;
  }

  const hasEscapedQuoteAndTerminator = text.endsWith('""') && !text.endsWith('"""');
  const contentEnd = hasEscapedQuoteAndTerminator ? text.length - 2 : text.length - 1;
  for (let index = 1; index < contentEnd; index++) {
    const character = text[index];
    if (/[\p{Cc}]/u.test(character)) {
      return false;
    }
    if (character === '"') {
      if (text[index + 1] !== '"' || index + 1 >= contentEnd) {
        return false;
      }
      index++;
    }
  }
  return true;
}

function validateGlobalVariableTypes(
  declarations: GlobalVariableDeclaration[],
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[]
): void {
  for (const declaration of declarations) {
    if (!declaration.type || symbols.lookup(declaration.type.name)) {
      continue;
    }
    diagnostics.push({
      message: `Unknown global variable type "${declaration.type.name}".`,
      range: declaration.type.range
    });
  }
}

function validateBaseTypes(
  declarations: TypeDeclaration[],
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[]
): void {
  for (const declaration of declarations) {
    if (symbols.lookup(declaration.baseType.name)) {
      continue;
    }
    diagnostics.push({
      message: `Unknown base type "${declaration.baseType.name}".`,
      range: declaration.baseType.range
    });
  }
}

function resolveFields(
  source: string,
  declarations: Pick<TypeDeclaration | GlobalVariableDeclaration, 'fields'>[],
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[]
): void {
  for (const declaration of declarations) {
    const fields = declaration.fields?.filter(
      (field): field is NamedTypeField => field.kind === 'named'
    ) ?? [];
    const fieldNames = new Map<string, TypeReference>();

    for (const field of fields) {
      let resolvedType: TypeReference | undefined;
      if (field.usesTypeAlias) {
        const aliasText = source.slice(field.name.range.start, field.name.range.end);
        const words = [...aliasText.matchAll(/\S+/gu)];
        for (let firstWord = 0; firstWord < words.length; firstWord++) {
          const candidateName = words.slice(firstWord).map(word => word[0]).join(' ');
          if (!symbols.lookup(candidateName)) {
            continue;
          }
          const typeStart = field.name.range.start + words[firstWord].index!;
          resolvedType = createTypeReference(source, {
            start: typeStart,
            end: field.name.range.end
          });
          break;
        }
        if (!resolvedType) {
          diagnostics.push({
            message: `No type matches field alias "${field.name.name}".`,
            range: field.name.range
          });
        } else {
          field.type = resolvedType;
        }
      } else if (symbols.lookup(field.type.name)) {
        resolvedType = field.type;
      } else {
        diagnostics.push({
          message: `Unknown field type "${field.type.name}".`,
          range: field.type.range
        });
      }

      const fieldName = normalizeTypeName(field.name.name);
      if (fieldNames.has(fieldName)) {
        diagnostics.push({
          message: `Duplicate field name "${field.name.name}".`,
          range: field.name.range
        });
      } else {
        fieldNames.set(fieldName, field.name);
      }
    }
  }
}

function parseFraction(fraction: string): [bigint, bigint] {
  const [numerator, denominator] = fraction.split('/');
  return [BigInt(numerator), BigInt(denominator)];
}

function formatFraction(numerator: bigint, denominator: bigint): string {
  const divisor = greatestCommonDivisor(numerator, denominator);
  return `${numerator / divisor}/${denominator / divisor}`;
}

function greatestCommonDivisor(first: bigint, second: bigint): bigint {
  let a = first < 0n ? -first : first;
  let b = second < 0n ? -second : second;
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a || 1n;
}

export function findTypeReferenceAtOffset(
  parsedDocument: ParsedDocument,
  offset: number
): TypeReference | undefined {
  for (const declaration of parsedDocument.declarations) {
    const declarationReferences = [
      declaration.name,
      declaration.baseType,
      declaration.pointedType
    ];
    for (const reference of declarationReferences) {
      if (!reference) {
        continue;
      }
      if (offset >= reference.range.start && offset <= reference.range.end) {
        return reference;
      }
    }

    for (const field of declaration.fields ?? []) {
      if (field.kind === 'byte-array') {
        if (offset >= field.elementType.range.start && offset <= field.elementType.range.end) {
          return field.elementType;
        }
        continue;
      }

      if (offset >= field.name.range.start && offset <= field.name.range.end) {
        return parsedDocument.symbols.lookup(field.name.name)
          ? field.name
          : field.type;
      }
      if (offset >= field.type.range.start && offset <= field.type.range.end) {
        return field.type;
      }
    }
  }
  for (const declaration of parsedDocument.globalVariables) {
    if (
      declaration.type &&
      offset >= declaration.type.range.start &&
      offset <= declaration.type.range.end
    ) {
      return declaration.type;
    }
    for (const field of declaration.fields ?? []) {
      if (field.kind === 'byte-array') {
        if (offset >= field.elementType.range.start && offset <= field.elementType.range.end) {
          return field.elementType;
        }
        continue;
      }

      if (offset >= field.name.range.start && offset <= field.name.range.end) {
        return parsedDocument.symbols.lookup(field.name.name)
          ? field.name
          : field.type;
      }
      if (offset >= field.type.range.start && offset <= field.type.range.end) {
        return field.type;
      }
    }
  }
  for (const routine of parsedDocument.routines) {
    for (const localVariable of routine.localVariables) {
      if (
        offset >= localVariable.type.range.start &&
        offset <= localVariable.type.range.end
      ) {
        return localVariable.type;
      }
    }
    for (const parameter of [
      ...routine.parameters,
      ...(routine.returnParameter ? [routine.returnParameter] : [])
    ]) {
      if (
        offset >= parameter.type.range.start &&
        offset <= parameter.type.range.end
      ) {
        return parameter.type;
      }
    }
    for (const call of routine.calls) {
      const localVariableType = call.localVariable?.type;
      if (
        localVariableType &&
        offset >= localVariableType.range.start &&
        offset <= localVariableType.range.end
      ) {
        return localVariableType;
      }
    }
    for (const process of routine.processes) {
      const returnType = process.returnVariable?.type;
      if (
        returnType &&
        offset >= returnType.range.start &&
        offset <= returnType.range.end
      ) {
        return returnType;
      }
    }
  }
  return undefined;
}

function parseDeclaration(
  source: string,
  segmentStart: number,
  periodIndex: number,
  diagnostics: ParserDiagnostic[]
): TypeDeclaration | undefined {
  let contentStart = segmentStart;
  while (contentStart < periodIndex && /\s/u.test(source[contentStart])) {
    contentStart++;
  }

  const derivedArticle = readWord(source, contentStart, periodIndex);
  if (!derivedArticle || !indefiniteArticles.has(derivedArticle.value.toLocaleLowerCase('pt-BR'))) {
    return undefined;
  }

  const operator = findOperator(source, derivedArticle.end, periodIndex);
  if (!operator) {
    return undefined;
  }

  const derivedNameRange = trimRange(source, derivedArticle.end, operator.start);
  const scalarFactor = readInteger(source, operator.end, periodIndex);
  let baseNameRange: SourceRange;
  let pointedType: TypeReference | undefined;
  let fields: TypeField[] | undefined;
  if (scalarFactor) {
    baseNameRange = trimRange(source, scalarFactor.end, periodIndex);
  } else {
    const baseArticle = readWord(source, operator.end, periodIndex);
    if (!baseArticle || !indefiniteArticles.has(baseArticle.value.toLocaleLowerCase('pt-BR'))) {
      return undefined;
    }

    const pointerTarget = findWord(source, baseArticle.end, periodIndex, 'para');
    const fieldsKeyword = findWord(source, baseArticle.end, pointerTarget?.start ?? periodIndex, 'com');
    baseNameRange = trimRange(
      source,
      baseArticle.end,
      fieldsKeyword?.start ?? pointerTarget?.start ?? periodIndex
    );
    if (pointerTarget) {
      const pointedArticle = readWord(source, pointerTarget.end, periodIndex);
      if (!pointedArticle || !indefiniteArticles.has(pointedArticle.value.toLocaleLowerCase('pt-BR'))) {
        return undefined;
      }
      const pointedNameRange = trimRange(source, pointedArticle.end, periodIndex);
      if (pointedNameRange.start === pointedNameRange.end) {
        return undefined;
      }
      pointedType = createTypeReference(source, pointedNameRange);
    }
    if (fieldsKeyword) {
      const parsedFields = parseFields(source, fieldsKeyword.end, periodIndex);
      if (!parsedFields) {
        return undefined;
      }
      fields = parsedFields.fields;
      diagnostics.push(...parsedFields.diagnostics);
    }
  }

  if (derivedNameRange.start === derivedNameRange.end || baseNameRange.start === baseNameRange.end) {
    return undefined;
  }

  const name = createTypeReference(source, derivedNameRange);
  const baseType = createTypeReference(source, baseNameRange);
  const normalizedScalarFactor = scalarFactor?.value
    ?? (isNumberTypeName(baseType.name) ? '1' : undefined);
  if (!name.normalizedName || !baseType.normalizedName || (pointedType && !pointedType.normalizedName)) {
    return undefined;
  }

  return {
    kind: 'type-declaration',
    name,
    baseType,
    pointedType,
    fields,
    scalarFactor: normalizedScalarFactor,
    operator: operator.value,
    range: {
      start: contentStart,
      end: periodIndex + 1
    }
  };
}

function parseFields(
  source: string,
  start: number,
  end: number
): { fields: TypeField[]; diagnostics: ParserDiagnostic[] } | undefined {
  const fields: TypeField[] = [];
  const diagnostics: ParserDiagnostic[] = [];
  let fieldStart = start;

  while (fieldStart < end) {
    const count = readInteger(source, fieldStart, end);
    if (count) {
      const typeStart = skipWhitespace(source, count.end, end);
      const separator = findFieldSeparator(source, typeStart, end);
      const typeRange = trimRange(source, typeStart, separator?.start ?? end);
      if (typeRange.start === typeRange.end) {
        return undefined;
      }
      const elementType = createTypeReference(source, typeRange);
      fields.push({
        kind: 'byte-array',
        count: count.value,
        elementType,
        range: { start: count.start, end: typeRange.end }
      });
      if (!['byte', 'bytes'].includes(elementType.normalizedName)) {
        diagnostics.push({
          message: 'Only contiguous arrays of byte are supported.',
          range: typeRange
        });
      }
      if (!separator) {
        break;
      }
      fieldStart = separator.nextStart;
      continue;
    }

    const article = readWord(source, fieldStart, end);
    if (!article || !indefiniteArticles.has(article.value.toLocaleLowerCase('pt-BR'))) {
      return undefined;
    }

    const separator = findFieldSeparator(source, article.end, end);
    const fieldEnd = separator?.start ?? end;
    const marker = findFieldMarker(source, article.end, fieldEnd);
    const explicitName = marker !== undefined;
    const contentStart = explicitName ? marker.end : article.end;
    const referenceMarker = findReferenceMarker(source, contentStart, fieldEnd);
    const contentEnd = referenceMarker?.start ?? fieldEnd;
    const unionMarker = findWord(source, contentStart, contentEnd, 'sob');
    const nameRange = trimRange(source, contentStart, unionMarker?.start ?? contentEnd);
    const typeRange = explicitName
      ? trimRange(source, article.end, marker.start)
      : nameRange;
    if (typeRange.start === typeRange.end || nameRange.start === nameRange.end) {
      return undefined;
    }
    const unionTarget = unionMarker
      ? parseUnionTarget(source, unionMarker.end, contentEnd)
      : undefined;
    if (unionMarker && !unionTarget) {
      return undefined;
    }

    fields.push({
      kind: 'named',
      type: createTypeReference(source, typeRange),
      name: createTypeReference(source, nameRange),
      unionTarget,
      usesTypeAlias: !explicitName,
      isReference: referenceMarker !== undefined
    });
    if (!separator) {
      break;
    }
    fieldStart = separator.nextStart;
  }

  return fields.length > 0 ? { fields, diagnostics } : undefined;
}

function findReferenceMarker(
  source: string,
  start: number,
  end: number
): { start: number; end: number } | undefined {
  const marker = /\(\s*referência\s*\)/giu;
  marker.lastIndex = start;
  const match = marker.exec(source);
  return match && match.index < end && match.index + match[0].length <= end
    ? { start: match.index, end: match.index + match[0].length }
    : undefined;
}

function skipWhitespace(source: string, start: number, end: number): number {
  while (start < end && /\s/u.test(source[start])) {
    start++;
  }
  return start;
}

function parseUnionTarget(source: string, start: number, end: number): TypeReference | undefined {
  const article = readWord(source, start, end);
  if (!article || !new Set(['o', 'a', 'os', 'as']).has(article.value.toLocaleLowerCase('pt-BR'))) {
    return undefined;
  }

  const targetRange = trimRange(source, article.end, end);
  if (targetRange.start === targetRange.end) {
    return undefined;
  }
  return createTypeReference(source, targetRange);
}

function findFieldMarker(
  source: string,
  start: number,
  end: number
): { start: number; end: number } | undefined {
  const markers = new Set(['denominado', 'denominada', 'denominados', 'denominadas']);
  const words = /\p{L}+/gu;
  words.lastIndex = start;
  let match: RegExpExecArray | null;
  while ((match = words.exec(source)) && match.index < end) {
    const wordEnd = match.index + match[0].length;
    const previousCharacter = match.index > start ? source[match.index - 1] : '';
    const nextCharacter = wordEnd < end ? source[wordEnd] : '';
    if (
      !isWordCharacter(previousCharacter) &&
      !isWordCharacter(nextCharacter) &&
      markers.has(match[0].toLocaleLowerCase('pt-BR'))
    ) {
      return { start: match.index, end: wordEnd };
    }
  }
  return undefined;
}

function findAnyWord(
  source: string,
  start: number,
  end: number,
  expectedWords: Set<string>
): { start: number; end: number; value: string } | undefined {
  const words = /\p{L}+/gu;
  words.lastIndex = start;
  let match: RegExpExecArray | null;
  while ((match = words.exec(source)) && match.index < end) {
    const wordEnd = match.index + match[0].length;
    if (
      !isWordCharacter(match.index > start ? source[match.index - 1] : '') &&
      !isWordCharacter(wordEnd < end ? source[wordEnd] : '') &&
      expectedWords.has(match[0].toLocaleLowerCase('pt-BR'))
    ) {
      return { start: match.index, end: wordEnd, value: match[0] };
    }
  }
  return undefined;
}

function findFieldSeparator(
  source: string,
  start: number,
  end: number
): { start: number; nextStart: number } | undefined {
  const commaIndex = source.indexOf(',', start);
  let separator = commaIndex !== -1 && commaIndex < end
    ? { start: commaIndex, nextStart: skipWhitespace(source, commaIndex + 1, end) }
    : undefined;
  const words = /\p{L}+/gu;
  words.lastIndex = start;
  let match: RegExpExecArray | null;
  while ((match = words.exec(source)) && match.index < end) {
    const wordEnd = match.index + match[0].length;
    if (
      match[0].toLocaleLowerCase('pt-BR') !== 'e' ||
      isWordCharacter(match.index > start ? source[match.index - 1] : '') ||
      isWordCharacter(wordEnd < end ? source[wordEnd] : '')
    ) {
      continue;
    }
    if (separator && separator.start < match.index) {
      break;
    }
    const nextStart = skipWhitespace(source, wordEnd, end);
    const nextArticle = readWord(source, nextStart, end);
    const nextCount = readInteger(source, nextStart, end);
    if (
      (nextArticle && indefiniteArticles.has(nextArticle.value.toLocaleLowerCase('pt-BR'))) ||
      nextCount
    ) {
      separator = { start: match.index, nextStart };
      break;
    }
  }

  return separator;
}

function readInteger(
  source: string,
  start: number,
  end: number
): { value: string; start: number; end: number } | undefined {
  let numberStart = start;
  while (numberStart < end && /\s/u.test(source[numberStart])) {
    numberStart++;
  }
  const match = /^\d+/u.exec(source.slice(numberStart, end));
  if (!match || !/\s/u.test(source[numberStart + match[0].length] ?? '')) {
    return undefined;
  }
  return {
    value: match[0],
    start: numberStart,
    end: numberStart + match[0].length
  };
}

function findOperator(
  source: string,
  start: number,
  end: number
): { value: 'é' | 'são'; start: number; end: number } | undefined {
  const words = /\p{L}+/gu;
  words.lastIndex = start;
  let match: RegExpExecArray | null;
  while ((match = words.exec(source)) && match.index < end) {
    const wordEnd = match.index + match[0].length;
    const previousCharacter = match.index > start ? source[match.index - 1] : '';
    const nextCharacter = wordEnd < end ? source[wordEnd] : '';
    if (isWordCharacter(previousCharacter) || isWordCharacter(nextCharacter)) {
      continue;
    }

    const normalizedWord = match[0].toLocaleLowerCase('pt-BR');
    if (normalizedWord === 'é' || normalizedWord === 'são') {
      return { value: normalizedWord, start: match.index, end: wordEnd };
    }
  }
  return undefined;
}

function findWord(
  source: string,
  start: number,
  end: number,
  expectedWord: string
): { start: number; end: number } | undefined {
  const words = /\p{L}+/gu;
  words.lastIndex = start;
  let match: RegExpExecArray | null;
  while ((match = words.exec(source)) && match.index < end) {
    const wordEnd = match.index + match[0].length;
    const previousCharacter = match.index > start ? source[match.index - 1] : '';
    const nextCharacter = wordEnd < end ? source[wordEnd] : '';
    if (
      !isWordCharacter(previousCharacter) &&
      !isWordCharacter(nextCharacter) &&
      match[0].toLocaleLowerCase('pt-BR') === expectedWord
    ) {
      return { start: match.index, end: wordEnd };
    }
  }
  return undefined;
}

function findWordOutsideStrings(
  source: string,
  start: number,
  end: number,
  expectedWord: string
): { start: number; end: number } | undefined {
  const quotedRanges = findQuotedRanges(source, { start, end });
  const words = /\p{L}+/gu;
  words.lastIndex = start;
  let match: RegExpExecArray | null;
  while ((match = words.exec(source)) && match.index < end) {
    const wordStart = match.index;
    if (quotedRanges.some(quoted => wordStart >= quoted.start && wordStart < quoted.end)) {
      continue;
    }
    const wordEnd = match.index + match[0].length;
    if (
      !isWordCharacter(match.index > start ? source[match.index - 1] : '') &&
      !isWordCharacter(wordEnd < end ? source[wordEnd] : '') &&
      match[0].toLocaleLowerCase('pt-BR') === expectedWord
    ) {
      return { start: match.index, end: wordEnd };
    }
  }
  return undefined;
}

function findQuotedRanges(source: string, range: SourceRange): SourceRange[] {
  const quotedRanges: SourceRange[] = [];
  let index = range.start;
  while (index < range.end) {
    if (source[index] !== '"') {
      index++;
      continue;
    }

    const quoteStart = index++;
    while (index < range.end) {
      if (source[index] !== '"') {
        index++;
        continue;
      }
      if (source[index + 1] === '"') {
        index += 2;
        continue;
      }
      index++;
      break;
    }
    quotedRanges.push({ start: quoteStart, end: index });
  }
  return quotedRanges;
}

function readWord(
  source: string,
  start: number,
  end: number
): { value: string; start: number; end: number } | undefined {
  let wordStart = start;
  while (wordStart < end && /\s/u.test(source[wordStart])) {
    wordStart++;
  }

  const match = /^[\p{L}\p{N}_]+/u.exec(source.slice(wordStart, end));
  if (!match) {
    return undefined;
  }
  return {
    value: match[0],
    start: wordStart,
    end: wordStart + match[0].length
  };
}

function isWordCharacter(character: string): boolean {
  return /[\p{L}\p{N}_]/u.test(character);
}

function trimRange(source: string, start: number, end: number): SourceRange {
  while (start < end && /\s/u.test(source[start])) {
    start++;
  }
  while (end > start && /\s/u.test(source[end - 1])) {
    end--;
  }
  return { start, end };
}

function createTypeReference(source: string, range: SourceRange): TypeReference {
  const name = source.slice(range.start, range.end).replace(/\s+/gu, ' ');
  return {
    name,
    normalizedName: normalizeTypeName(name),
    range
  };
}
