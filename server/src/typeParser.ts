import pluralize from './plural';
import { performance } from 'node:perf_hooks';

export interface SourceRange {
  start: number;
  end: number;
}

export interface TypeReference {
  name: string;
  normalizedName: string;
  range: SourceRange;
  qualifier?: string;
}

export interface NamedTypeField {
  kind: 'named';
  type: TypeReference;
  name: TypeReference;
  range: SourceRange;
  unionTarget?: TypeReference;
  usesTypeAlias: boolean;
  isReference: boolean;
}

export interface ByteArrayField {
  kind: 'byte-array';
  count: string;
  elementType: TypeReference;
  name?: TypeReference;
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
  kind: 'integer' | 'fraction' | 'mixed' | 'hexadecimal' | 'string' | 'null';
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
  | 'seguido de'
  | '/';

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

export interface RoutineExpressionUnary {
  kind: 'unary';
  operator: '+' | '-';
  operand: RoutineExpression;
  range: SourceRange;
}

export type RoutineExpression =
  | RoutineExpressionOperand
  | RoutineExpressionBinary
  | RoutineExpressionUnary;

export interface RoutineAssignment {
  target: TypeReference;
  expression: RoutineExpression;
  fieldAccesses?: RoutineFieldAccess[];
  variableAccesses?: RoutineVariableAccess[];
  range: SourceRange;
}

export interface RoutineVariableAccess {
  reference: TypeReference;
  type: TypeReference;
  scope?: number;
}

export interface RoutineOutput {
  expression: RoutineExpression;
  destination: TypeReference;
  fieldAccesses?: RoutineFieldAccess[];
  variableAccesses?: RoutineVariableAccess[];
  range: SourceRange;
}

export interface RoutineLocalVariable {
  name: TypeReference;
  type: TypeReference;
  range: SourceRange;
  inputArgumentRange?: SourceRange;
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
  qualifier?: string;
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
  qualifierRange?: SourceRange;
  arguments: TypeReference[];
  fieldAccesses?: RoutineFieldAccess[];
  variableAccesses?: RoutineVariableAccess[];
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
  argumentTypes: TypeReference[];
  fieldAccesses: RoutineFieldAccess[];
  variableAccesses?: RoutineVariableAccess[];
  computedFieldAccesses?: RoutineComputedFieldAccess[];
  returnVariable?: RoutineLocalVariable;
  returnVariableIsReference?: boolean;
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
      for (const name of routineNames(declaration)) {
        this.routines.set(routineNameKey(name), declaration);
      }
    }
  }

  lookup(name: string): RoutineDeclaration | undefined {
    const qualifier = findTrailingParentheticalQualifier(name, 0, name.length);
    const baseName = name.slice(0, qualifier?.start ?? name.length);
    return this.routines.get(`${normalizeRoutineName(baseName)}${qualifier?.text ?? ''}`);
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
      const [factorNumerator, factorDenominator] = parseFraction(symbol.scalarFactor);
      symbol.scale = formatFraction(factorNumerator, factorDenominator);
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
    const [factorNumerator, factorDenominator] = parseFraction(symbol.scalarFactor);
    symbol.scale = formatFraction(
      baseNumerator * factorNumerator,
      baseDenominator * factorDenominator
    );
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

export interface ParserSymbolCatalog {
  declarations: TypeDeclaration[];
  globalVariables: GlobalVariableDeclaration[];
  routines: RoutineDeclaration[];
}

export interface ParsePerformanceMetrics {
  syntaxMs: number;
  symbolCatalogMs: number;
  typeResolutionMs: number;
  referenceResolutionMs: number;
  semanticResolutionMs: number;
  totalMs: number;
}

export interface ParsedReference {
  kind: 'type' | 'routine' | 'variable' | 'field';
  name: string;
  range: SourceRange;
  scope?: number;
  container?: string;
  declaration?: boolean;
}

const indefiniteArticles = new Set([
  'um', 'uma', 'uns', 'umas', 'esse', 'essa', 'esses', 'essas'
]);
const definiteArticles = new Set([
  'o', 'os', 'a', 'as', 'este', 'esta', 'estes', 'estas'
]);
const nullLiteralWords = new Set([
  'nulo',
  'nula',
  'nulos',
  'nulas',
  'inexistente',
  'inexistentes',
  'zerado',
  'nil'
]);
const conjunctions = new Set(['e', 'ou', 'nem']);
const localVariableNameMarkers = new Set([
  'denominado', 'denominada', 'denominados', 'denominadas',
  'chamado', 'chamada', 'chamados', 'chamadas'
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
  ['contém', 'contém'],
  ['contiver', 'contém'],
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
  'voltado', 'contendo', 'embaixo', 'por', 'retornando', 'é', 'está',
  'estiver', 'for', 'forem', 'são', 'estão', 'estiverem', 'ser', 'serem', 'estar',
  'poder', 'puder', 'foi', 'estamos', 'há', 'pode', 'existe', 'existir', 'contém',
  'contiver', 'possui', 'possuir', 'dum', 'duma', 'duns', 'dumas'
]);
const reservedIdentifierWords = new Set([
  ...routineNameDelimiters,
  ...conjunctions,
  'denominado', 'denominada', 'denominados', 'denominadas', 'chamado', 'chamada',
  'chamados', 'chamadas', 'para', 'se', 'determine'
]);

const normalizedTypeNameCache = new Map<string, string>();
const normalizedTypeNameCacheLimit = 4096;

export function normalizeTypeName(name: string): string {
  const cached = normalizedTypeNameCache.get(name);
  if (cached !== undefined) {
    return cached;
  }

  const normalized = name.trim().replace(/\s+/gu, ' ').toLocaleLowerCase('pt-BR');
  if (name.length <= 256) {
    if (normalizedTypeNameCache.size >= normalizedTypeNameCacheLimit) {
      normalizedTypeNameCache.clear();
    }
    normalizedTypeNameCache.set(name, normalized);
  }
  return normalized;
}

function normalizeRoutineName(name: string): string {
  let normalized = '';
  let segmentStart = 0;
  let depth = 0;
  for (let index = 0; index < name.length; index++) {
    if (name[index] === '(') {
      if (depth === 0) {
        normalized += normalizeRoutineNameWords(name.slice(segmentStart, index));
        segmentStart = index;
      }
      depth++;
    } else if (name[index] === ')' && depth > 0) {
      depth--;
      if (depth === 0) {
        normalized += `(${normalizeTypeName(name.slice(segmentStart + 1, index))})`;
        segmentStart = index + 1;
      }
    }
  }
  normalized += depth === 0
    ? normalizeRoutineNameWords(name.slice(segmentStart))
    : normalizeRoutineNameWords(name.slice(segmentStart));
  return normalized.trim().replace(/\s+/gu, ' ');
}

function normalizeRoutineNameWords(name: string): string {
  const words = normalizeTypeName(name).split(' ').filter(Boolean);
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

function routineNameKey(name: TypeReference): string {
  return `${normalizeRoutineName(name.name)}${name.qualifier ?? ''}`;
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

export function parseTypeDeclarations(
  source: string,
  workspaceSymbols?: ParserSymbolCatalog,
  onProfile?: (metrics: ParsePerformanceMetrics) => void
): ParsedDocument {
  const startedAt = onProfile ? performance.now() : 0;
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
  const syntaxFinishedAt = onProfile ? performance.now() : 0;
  const symbols = new TypeSymbolTable([
    ...declarations,
    ...(workspaceSymbols?.declarations ?? [])
  ]);
  const globalVariableSymbols = new GlobalVariableSymbolTable([
    ...globalVariables,
    ...(workspaceSymbols?.globalVariables ?? [])
  ]);
  const routineSymbols = new RoutineSymbolTable(routines);
  setRoutineBodyRanges(
    parserSource,
    routines,
    [...declarations, ...globalVariables].map(declaration => declaration.range)
  );
  const catalogFinishedAt = onProfile ? performance.now() : 0;
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
  const typeResolutionFinishedAt = onProfile ? performance.now() : 0;
  resolveRoutineCalls(
    parserSource,
    routines,
    globalVariableSymbols.entries.map(symbol => symbol.declaration),
    symbols,
    diagnostics,
    [...routines, ...(workspaceSymbols?.routines ?? [])]
  );
  const referenceResolutionFinishedAt = onProfile ? performance.now() : 0;
  validateRoutineVariableNames(routines, diagnostics);
  if (onProfile) {
    const finishedAt = performance.now();
    onProfile({
      syntaxMs: syntaxFinishedAt - startedAt,
      symbolCatalogMs: catalogFinishedAt - syntaxFinishedAt,
      typeResolutionMs: typeResolutionFinishedAt - catalogFinishedAt,
      referenceResolutionMs: referenceResolutionFinishedAt - typeResolutionFinishedAt,
      semanticResolutionMs: finishedAt - catalogFinishedAt,
      totalMs: finishedAt - startedAt
    });
  }

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
  const routineStarts = routines
    .map(routine => routine.range.start)
    .sort((first, second) => first - second);
  const declarationStarts = declarationRanges
    .map(range => range.start)
    .sort((first, second) => first - second);
  let routineIndex = 0;
  let declarationIndex = 0;

  for (const routine of routines) {
    const bodyStart = routine.bodyRange.start;
    while (
      routineIndex < routineStarts.length &&
      routineStarts[routineIndex] <= routine.range.start
    ) {
      routineIndex++;
    }
    while (
      declarationIndex < declarationStarts.length &&
      declarationStarts[declarationIndex] <= bodyStart
    ) {
      declarationIndex++;
    }
    const nextRoutineStart = routineStarts[routineIndex] ?? source.length;
    const nextDeclarationStart = declarationStarts[declarationIndex] ?? source.length;
    routine.bodyRange.end = Math.min(nextRoutineStart, nextDeclarationStart, source.length);
  }
}

function resolveRoutineCalls(
  source: string,
  routines: RoutineDeclaration[],
  globalVariables: GlobalVariableDeclaration[],
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[],
  routineCandidates: RoutineDeclaration[] = routines
): void {
  const globalVariableSymbols = new GlobalVariableSymbolTable(globalVariables);
  for (const routine of routines) {
    const body = source.slice(routine.bodyRange.start, routine.bodyRange.end);
    let hasValidBooleanReturn = false;
    let hasDecodeInstruction = false;
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
          routineCandidates,
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
            hasDecodeInstruction = isDecodeInstruction(
              source,
              conditionalStatement
            ) || hasDecodeInstruction;
            if (
              !conditional.nestedRange ||
              conditionalStatement.start < conditional.nestedRange.start
            ) {
              hasValidBooleanReturn = processRoutineStatement(
                source,
                conditionalStatement,
                routine,
                routineCandidates,
                globalVariableSymbols,
                symbols,
                diagnostics
              ) || hasValidBooleanReturn;
            }
          }
        } else {
          hasDecodeInstruction = isDecodeInstruction(
            source,
            statementRange
          ) || hasDecodeInstruction;
          hasValidBooleanReturn = processRoutineStatement(
            source,
            statementRange,
            routine,
            routineCandidates,
            globalVariableSymbols,
            symbols,
            diagnostics
          ) || hasValidBooleanReturn;
        }
      }
      statementStart = periodIndex + 1;
      periodIndex = findDeclarationPeriod(source, statementStart);
    }

    if (
      routine.isBooleanFunction &&
      !hasValidBooleanReturn &&
      !hasDecodeInstruction
    ) {
      diagnostics.push({
        message: 'Boolean functions must contain a valid "Diga sim" or "Diga não" statement.',
        range: routine.name.range
      });
    }
  }
}

function validateRoutineVariableNames(
  routines: RoutineDeclaration[],
  diagnostics: ParserDiagnostic[]
): void {
  for (const routine of routines) {
    const declarations = [
      ...routine.parameters,
      ...(routine.returnParameter ? [routine.returnParameter] : []),
      ...routine.localVariables,
      ...routine.calls.flatMap(call =>
        call.localVariable ? [call.localVariable] : []
      ),
      ...routine.processes.flatMap(process =>
        process.returnVariable && !process.returnVariableIsReference
          ? [process.returnVariable]
          : []
      )
    ];
    const names = new Map<string, SourceRange>();
    const seenRanges = new Set<string>();
    for (const declaration of declarations) {
      const { name } = declaration;
      const rangeKey = `${name.range.start}:${name.range.end}`;
      if (seenRanges.has(rangeKey)) {
        continue;
      }
      seenRanges.add(rangeKey);

      const previousRange = names.get(name.normalizedName);
      if (previousRange) {
        diagnostics.push({
          message: `Local variable "${name.name}" is already declared in this routine.`,
          range: name.range
        });
      } else {
        names.set(name.normalizedName, name.range);
      }
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
    statementKeyword?.value.toLocaleLowerCase('pt-BR') === 'atribua'
  ) {
    const destinationMarker = findWordOutsideStrings(
      source,
      statementKeyword.end,
      statement.end,
      'para'
    );
    if (destinationMarker) {
      const targetRange = trimRange(source, destinationMarker.end, statement.end);
      const targetArticle = readWord(source, targetRange.start, targetRange.end);
      if (
        targetArticle &&
        indefiniteArticles.has(targetArticle.value.toLocaleLowerCase('pt-BR'))
      ) {
        const localVariable = parseLocalVariableDeclaration(
          source,
          targetRange,
          symbols
        );
        if (localVariable) {
          caller.localVariables.push(localVariable);
        }
      }
    }
  }
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
    const fieldAccesses: RoutineFieldAccess[] = [];
    const variableAccesses: RoutineVariableAccess[] = [];
    resolveExpressionFieldAccesses(
      source,
      assignment.expression,
      caller,
      routines,
      globalVariables,
      symbols,
      [],
      fieldAccesses,
      variableAccesses
    );
    resolveRoutineArgumentType(
      source,
      assignment.target.range,
      caller,
      globalVariables,
      symbols,
      fieldAccesses,
      routines,
      [],
      variableAccesses
    );
    assignment.fieldAccesses = fieldAccesses;
    assignment.variableAccesses = variableAccesses;
    caller.assignments.push(assignment);
    return false;
  }
  const output = parseRoutineOutput(source, statement, diagnostics);
  if (output) {
    const fieldAccesses: RoutineFieldAccess[] = [];
    const variableAccesses: RoutineVariableAccess[] = [];
    resolveExpressionFieldAccesses(
      source,
      output.expression,
      caller,
      routines,
      globalVariables,
      symbols,
      diagnostics,
      fieldAccesses,
      variableAccesses
    );
    output.fieldAccesses = fieldAccesses;
    output.variableAccesses = variableAccesses;
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
      if (process.returnVariable && !process.returnVariableIsReference) {
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
  const conditionSource = maskWordInRange(source, condition, 'não');
  const conditionName = normalizeRoutineName(
    conditionSource.slice(condition.start, condition.end)
  );
  const routineNameIndex = getRoutineNameIndex(routines);
  const exact = routineNameIndex.byNormalizedName.get(conditionName)?.find(
    candidate =>
      candidate.routine.isBooleanFunction &&
      candidate.routine.parameters.length === 0
  );
  if (exact) {
    return {
      call: {
        name: createTypeReference(source, condition),
        arguments: [],
        target: exact.routine
      },
      distance: 0
    };
  }

  const matches: {
    call: RoutineCall;
    distance: number;
    order: number;
    nameStart: number;
  }[] = [];
  for (const nameMatch of findRoutineNameMatches(
    conditionSource,
    condition,
    routines,
    true
  )) {
    const { routine, nameStart, nameEnd, order } = nameMatch;
    if (!routine.isBooleanFunction || routine.parameters.length === 0) {
      continue;
    }
    if (
      nameEnd < condition.end &&
      !/\s/u.test(conditionSource[nameEnd] ?? '')
    ) {
      continue;
    }
    const prefix = trimRange(conditionSource, condition.start, nameStart);
    const suffix = trimRange(conditionSource, nameEnd, condition.end);
    const argumentsList = [prefix, suffix].filter(range => range.start < range.end);
    if (argumentsList.length !== routine.parameters.length) {
      continue;
    }
    const distances: number[] = [];
    const fieldAccesses: RoutineFieldAccess[] = [];
    const variableAccesses: RoutineVariableAccess[] = [];
    const computedFieldAccesses: RoutineComputedFieldAccess[] = [];
    for (let index = 0; index < argumentsList.length; index++) {
      const actualType = resolveRoutineArgumentType(
        conditionSource,
        argumentsList[index],
        caller,
        globalVariables,
        symbols,
        fieldAccesses,
        routines,
        computedFieldAccesses,
        variableAccesses,
        index === argumentsList.length - 1 &&
          nameMatch.implicitDefiniteArticle === true
      );
      const distance = actualType
        ? getRoutineArgumentTypeDistance(
          actualType,
          routine.parameters[index].type.name,
          symbols
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
        variableAccesses,
        computedFieldAccesses,
        target: routine
      },
      distance: distances.reduce((total, distance) => total + distance, 0),
      order,
      nameStart
    });
  }
  return matches.sort((first, second) =>
    first.distance - second.distance ||
    first.order - second.order ||
    first.nameStart - second.nameStart
  )[0];
}

function maskWordInRange(
  source: string,
  range: SourceRange,
  word: string
): string {
  const rangeText = source.slice(range.start, range.end);
  if (!rangeText.toLocaleLowerCase('pt-BR').includes(word)) {
    return source;
  }

  const characters = rangeText.split('');
  const words = /\p{L}+/gu;
  let match: RegExpExecArray | null;
  while ((match = words.exec(rangeText))) {
    if (match[0].toLocaleLowerCase('pt-BR') !== word) {
      continue;
    }
    for (let index = match.index; index < match.index + match[0].length; index++) {
      characters[index] = ' ';
    }
  }
  return source.slice(0, range.start) + characters.join('') + source.slice(range.end);
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

  const destinationMarker = ['para', 'à', 'ao', 'aos', 'às']
    .map(marker => findWordOutsideStrings(source, keyword.end, statement.end, marker))
    .filter((marker): marker is SourceRange => marker !== undefined)
    .sort((first, second) => first.start - second.start)[0];
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

  for (let index = range.start; index < range.end; index++) {
    if (
      source[index] === '/' &&
      !quotedRanges.some(quoted => index >= quoted.start && index < quoted.end)
    ) {
      operators.push({
        operator: '/',
        range: { start: index, end: index + 1 }
      });
    }
  }
  operators.sort((first, second) => first.range.start - second.range.start);

  if (operators.length === 0) {
    return parseSignedExpressionOperand(source, range);
  }

  const operands: RoutineExpression[] = [];
  let operandStart = range.start;
  for (const operator of operators) {
    const operandRange = trimRange(source, operandStart, operator.range.start);
    const operand = parseSignedExpressionOperand(source, operandRange);
    if (!operand) {
      diagnostics.push({
        message: `Expected an operand before "${operator.operator}".`,
        range: operator.range
      });
      return undefined;
    }
    operands.push(operand);
    operandStart = operator.range.end;
  }

  const finalOperandRange = trimRange(source, operandStart, range.end);
  const finalOperand = parseSignedExpressionOperand(source, finalOperandRange);
  if (!finalOperand) {
    diagnostics.push({
      message: `Expected an operand after "${operators[operators.length - 1].operator}".`,
      range: operators[operators.length - 1].range
    });
    return undefined;
  }
  operands.push(finalOperand);

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

function parseSignedExpressionOperand(
  source: string,
  range: SourceRange
): RoutineExpression | undefined {
  const operandRange = trimRange(source, range.start, range.end);
  if (operandRange.start === operandRange.end) {
    return undefined;
  }

  const firstCharacter = source[operandRange.start];
  if (firstCharacter !== '+' && firstCharacter !== '-') {
    return {
      kind: 'operand',
      text: source.slice(operandRange.start, operandRange.end),
      range: operandRange
    };
  }

  const valueRange = trimRange(source, operandRange.start + 1, operandRange.end);
  if (valueRange.start === valueRange.end) {
    return undefined;
  }
  const operand: RoutineExpressionOperand = {
    kind: 'operand',
    text: source.slice(valueRange.start, valueRange.end),
    range: valueRange
  };
  return {
    kind: 'unary',
    operator: firstCharacter,
    operand,
    range: operandRange
  };
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
  if (!isDecodeInstruction(source, statement)) {
    return false;
  }

  if (!keyword) {
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

function isDecodeInstruction(source: string, statement: SourceRange): boolean {
  const keyword = readWord(source, statement.start, statement.end);
  return keyword?.value.toLocaleLowerCase('pt-BR') === 'decodifique';
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
  const variableAccesses: RoutineVariableAccess[] = [];
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
      computedFieldAccesses,
      variableAccesses
    )) {
      diagnostics.push({
        message: `Unknown function pointer "${source.slice(targetRange.start, targetRange.end)}".`,
        range: targetRange
      });
      return undefined;
    }
  }

  const argumentsList: SourceRange[] = [];
  const argumentTypes: TypeReference[] = [];
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
    const literal = parseGlobalVariableLiteral(source, argument);
    if (literal) {
      argumentTypes.push(createSyntheticTypeReference(
        literal.kind === 'null'
          ? 'nulo'
          : inferGlobalVariableTypeName(literal) ?? 'nulo',
        argument
      ));
      continue;
    }
    const outputVariable = parseProcessAddressOutput(
      source,
      argument,
      symbols,
      diagnostics
    );
    if (outputVariable) {
      caller.localVariables.push(outputVariable.variable);
      argumentTypes.push(outputVariable.argumentType);
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
    const argumentType = resolveRoutineArgumentType(
      source,
      argument,
      caller,
      globalVariables,
      symbols,
      fieldAccesses,
      routines,
      computedFieldAccesses,
      variableAccesses
    );
    if (!argumentType) {
      diagnostics.push({
        message: `Unknown variable or field "${source.slice(argument.start, argument.end)}" passed to "Processe".`,
        range: argument
      });
      return undefined;
    }
    argumentTypes.push(argumentType);
  }

  const parsedReturn = returnMarker
    ? parseProcessReturnVariable(
      source,
      returnMarker.end,
      statement.end,
      caller,
      globalVariables,
      symbols,
      fieldAccesses,
      variableAccesses,
      computedFieldAccesses,
      routines,
      diagnostics
    )
    : undefined;
  if (returnMarker && !parsedReturn) {
    return undefined;
  }

  return {
    kind,
    target,
    library,
    functionName,
    arguments: argumentsList.map(argument => createTypeReference(source, argument)),
    argumentTypes,
    fieldAccesses,
    variableAccesses,
    computedFieldAccesses,
    returnVariable: parsedReturn?.variable,
    returnVariableIsReference: parsedReturn?.isReference,
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

function parseProcessAddressOutput(
  source: string,
  argument: SourceRange,
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[]
): { variable: RoutineLocalVariable; argumentType: TypeReference } | undefined {
  const outerArticle = readWord(source, argument.start, argument.end);
  if (
    !outerArticle ||
    !definiteArticles.has(outerArticle.value.toLocaleLowerCase('pt-BR'))
  ) {
    return undefined;
  }
  const operator = readWord(source, outerArticle.end, argument.end);
  if (
    !operator ||
    operator.value.toLocaleLowerCase('pt-BR') !== 'endereçamento'
  ) {
    return undefined;
  }

  const sourceAfterOperator = skipWhitespace(source, operator.end, argument.end);
  const contraction = readWord(source, sourceAfterOperator, argument.end);
  const expansion = contraction
    ? routineContractions.get(contraction.value.toLocaleLowerCase('pt-BR'))
    : undefined;
  let typeArticle: ReturnType<typeof readWord>;
  if (expansion?.startsWith('de ')) {
    const expandedArticle = expansion.slice(3);
    if (!indefiniteArticles.has(expandedArticle)) {
      return undefined;
    }
    typeArticle = { start: contraction!.start, end: contraction!.end, value: expandedArticle };
  } else {
    const preposition = readWord(source, sourceAfterOperator, argument.end);
    if (!preposition || preposition.value.toLocaleLowerCase('pt-BR') !== 'de') {
      return undefined;
    }
    typeArticle = readWord(source, preposition.end, argument.end);
    if (!typeArticle || !indefiniteArticles.has(typeArticle.value.toLocaleLowerCase('pt-BR'))) {
      return undefined;
    }
  }

  const markers = findAnyWord(source, typeArticle.end, argument.end, localVariableNameMarkers);
  const typeRange = trimRange(source, typeArticle.end, markers?.start ?? argument.end);
  const type = findTypeSuffix(source, typeRange, symbols);
  if (!type) {
    diagnostics.push({
      message: `Unknown "Processe" output type "${source.slice(typeRange.start, typeRange.end)}".`,
      range: typeRange
    });
    return undefined;
  }

  const nameRange = markers
    ? trimRange(source, markers.end, argument.end)
    : type.range;
  if (nameRange.start === nameRange.end) {
    diagnostics.push({
      message: 'A variable name is required after the type in a "Processe" address argument.',
      range: markers ?? typeRange
    });
    return undefined;
  }

  return {
    variable: {
      name: createTypeReference(source, nameRange),
      type,
      range: argument
    },
    argumentType: resolveTypeOperator('endereçamento', type, symbols) ??
      createSyntheticTypeReference('ponteiro', type.range)
  };
}

function parseProcessReturnVariable(
  source: string,
  start: number,
  end: number,
  caller: RoutineDeclaration,
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable,
  fieldAccesses: RoutineFieldAccess[],
  variableAccesses: RoutineVariableAccess[],
  computedFieldAccesses: RoutineComputedFieldAccess[],
  routines: RoutineDeclaration[],
  diagnostics: ParserDiagnostic[]
): { variable: RoutineLocalVariable; isReference: boolean } | undefined {
  const valueRange = trimRange(source, start, end);
  const article = readWord(source, valueRange.start, valueRange.end);
  if (!article) {
    diagnostics.push({
      message: '"Processe" return values require a variable or an indefinite article and a return type.',
      range: valueRange
    });
    return undefined;
  }
  const articleWord = article.value.toLocaleLowerCase('pt-BR');
  if (definiteArticles.has(articleWord)) {
    const type = resolveRoutineArgumentType(
      source,
      valueRange,
      caller,
      globalVariables,
      symbols,
      fieldAccesses,
      routines,
      computedFieldAccesses,
      variableAccesses
    );
    if (!type) {
      diagnostics.push({
        message: `Unknown variable or field "${source.slice(valueRange.start, valueRange.end)}" in "Processe" return clause.`,
        range: valueRange
      });
      return undefined;
    }
    return {
      variable: {
        name: createTypeReference(source, trimRange(source, article.end, valueRange.end)),
        type,
        range: valueRange
      },
      isReference: true
    };
  }
  if (!indefiniteArticles.has(articleWord)) {
    diagnostics.push({
      message: '"Processe" return values require a variable or an indefinite article and a return type.',
      range: valueRange
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
    variable: {
      name: createTypeReference(source, nameRange),
      type,
      range: valueRange
    },
    isReference: false
  };
}

function resolveExpressionFieldAccesses(
  source: string,
  expression: RoutineExpression,
  caller: RoutineDeclaration,
  routines: RoutineDeclaration[],
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[],
  fieldAccesses: RoutineFieldAccess[] = [],
  variableAccesses: RoutineVariableAccess[] = []
): void {
  if (expression.kind === 'binary') {
    resolveExpressionFieldAccesses(
      source,
      expression.left,
      caller,
      routines,
      globalVariables,
      symbols,
      diagnostics,
      fieldAccesses,
      variableAccesses
    );
    resolveExpressionFieldAccesses(
      source,
      expression.right,
      caller,
      routines,
      globalVariables,
      symbols,
      diagnostics,
      fieldAccesses,
      variableAccesses
    );
    return;
  }
  if (expression.kind === 'unary') {
    resolveExpressionFieldAccesses(
      source,
      expression.operand,
      caller,
      routines,
      globalVariables,
      symbols,
      diagnostics,
      fieldAccesses,
      variableAccesses
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
    diagnostics,
    fieldAccesses,
    variableAccesses
  );
}

function resolveFieldAccessRange(
  source: string,
  range: SourceRange,
  caller: RoutineDeclaration,
  routines: RoutineDeclaration[],
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[],
  fieldAccesses: RoutineFieldAccess[] = [],
  variableAccesses: RoutineVariableAccess[] = []
): void {
  const hasStructureAccess = findStructureAccessMarkers(source, range).length > 0;
  const expression = parseRoutineExpression(source, range, []);
  if (expression && expression.kind !== 'operand') {
    resolveExpressionFieldAccesses(
      source,
      expression,
      caller,
      routines,
      globalVariables,
      symbols,
      diagnostics,
      fieldAccesses,
      variableAccesses
    );
    return;
  }

  const computedFieldAccesses: RoutineComputedFieldAccess[] = [];
  const resolvedType = resolveRoutineArgumentType(
    source,
    range,
    caller,
    globalVariables,
    symbols,
    fieldAccesses,
    routines,
    computedFieldAccesses,
    variableAccesses
  );
  if (!resolvedType) {
    if (hasStructureAccess) {
      diagnostics.push({
        message: `Unknown structure field access "${source.slice(range.start, range.end)}".`,
        range
      });
    }
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
  const statementQualifier = findTrailingParentheticalQualifier(
    source,
    statementRange.start,
    statementRange.end
  );
  const statementEnd = statementQualifier?.start ?? statementRange.end;
  const statement = normalizeRoutineName(
    source.slice(statementRange.start, statementEnd)
  );
  const routineNameIndex = getRoutineNameIndex(routines);
  const exactMatch = routineNameIndex.byNormalizedName.get(statement)?.find(
    candidate =>
      candidate.routine.parameters.length === 0 &&
      candidate.name.qualifier === statementQualifier?.text
  );
  if (exactMatch) {
    return {
      name: createTypeReference(source, statementRange),
      qualifierRange: statementQualifier
        ? { start: statementQualifier.start, end: statementRange.end }
        : undefined,
      arguments: [],
      target: exactMatch.routine
    };
  }

  const matchingCalls: {
    call: RoutineCall;
    distance: number;
    nameLength: number;
  }[] = [];
  const parsedArgumentsByNameEnd = new Map<number, {
    argumentsList: SourceRange[];
    localVariable: RoutineLocalVariable | undefined;
    localVariableIndex: number;
  }>();
  for (const nameMatch of findRoutineNameMatches(source, statementRange, routines)) {
    const { routine, name: routineName, nameEnd } = nameMatch;
    if (routine.parameters.length === 0) {
      continue;
    }
    if (
      nameEnd < statementRange.end &&
      !/\s/u.test(source[nameEnd] ?? '')
    ) {
      continue;
    }
    const callQualifier = findTrailingParentheticalQualifier(
      source,
      nameEnd,
      statementRange.end
    );
    if (routineName.qualifier !== callQualifier?.text) {
      continue;
    }
    let parsedArguments = parsedArgumentsByNameEnd.get(nameEnd);
    if (!parsedArguments) {
      const argumentRange = trimRange(
        source,
        nameEnd,
        callQualifier?.start ?? statementRange.end
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
          ...(localVariable.inputArgumentRange
            ? [localVariable.name.range]
            : []),
          localVariable.inputArgumentRange ?? localVariable.name.range
        ]
        : splitRoutineArguments(source, argumentRange);
      parsedArguments = {
        argumentsList,
        localVariable,
        localVariableIndex: localVariable
          ? localVariable.inputArgumentRange
            ? argumentsList.length - 2
            : argumentsList.length - 1
          : -1
      };
      parsedArgumentsByNameEnd.set(nameEnd, parsedArguments);
    }
    const { argumentsList, localVariable, localVariableIndex } = parsedArguments;
    if (argumentsList.length !== routine.parameters.length) {
      continue;
    }

    const distances: number[] = [];
    const fieldAccesses: RoutineFieldAccess[] = [];
    const variableAccesses: RoutineVariableAccess[] = [];
    const computedFieldAccesses: RoutineComputedFieldAccess[] = [];
    for (let index = 0; index < argumentsList.length; index++) {
      const parameter = routine.parameters[index];
      const scalarArgumentType = localVariableIndex === index
        ? undefined
        : resolveScalarRoutineArgumentType(
          source,
          argumentsList[index],
          parameter.type,
          symbols
        );
      const argumentType = localVariableIndex === index
        ? localVariable?.type
        : scalarArgumentType ?? resolveRoutineArgumentType(
          source,
          argumentsList[index],
          caller,
          globalVariables,
          symbols,
          fieldAccesses,
          routines,
          computedFieldAccesses,
          variableAccesses
        );
      const distance = argumentType
        ? getRoutineArgumentTypeDistance(
          argumentType,
          parameter.type.name,
          symbols
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
        qualifierRange: callQualifier
          ? { start: callQualifier.start, end: statementRange.end }
          : undefined,
        arguments: argumentsList.map(range => createTypeReference(source, range)),
        fieldAccesses,
        variableAccesses,
        computedFieldAccesses,
        localVariable,
        target: routine
      },
      distance: distances.reduce((total, distance) => total + distance, 0),
      nameLength: nameEnd - statementRange.start
    });
  }
  return matchingCalls.sort((first, second) =>
    second.nameLength - first.nameLength || first.distance - second.distance
  )[0]?.call;
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
  const nameMatches = findRoutineNameMatches(source, statement, routines);
  const matchesDeclaredRoutineName = nameMatches.some(({ nameEnd }) =>
    /\s/u.test(source[nameEnd] ?? '') &&
    trimRange(source, nameEnd, statement.end).start < statement.end
  );
  const looksLikeCall = rest.start === rest.end ||
    Boolean(definiteArticle || parseGlobalVariableLiteral(source, rest) || matchesDeclaredRoutineName);
  if (!looksLikeCall) {
    return;
  }

  for (const { routine: candidate, name, nameEnd } of nameMatches) {
    if (!candidate.parameters.length) {
      continue;
    }
    if (nameEnd >= statement.end || !/\s/u.test(source[nameEnd] ?? '')) {
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

interface RoutineNameCandidate {
  routine: RoutineDeclaration;
  name: TypeReference;
  order: number;
}

interface RoutineNameMatch extends RoutineNameCandidate {
  nameStart: number;
  nameEnd: number;
  implicitDefiniteArticle?: boolean;
}

interface RoutineNameLookupIndex {
  byNormalizedName: Map<string, RoutineNameCandidate[]>;
}

const routineNameLookupIndexes = new WeakMap<
  RoutineDeclaration[],
  RoutineNameLookupIndex
>();

function getRoutineNameIndex(routines: RoutineDeclaration[]): RoutineNameLookupIndex {
  const cachedIndex = routineNameLookupIndexes.get(routines);
  if (cachedIndex) {
    return cachedIndex;
  }

  const byNormalizedName = new Map<string, RoutineNameCandidate[]>();
  let order = 0;
  for (const routine of routines) {
    for (const name of routineNames(routine)) {
      const normalizedName = normalizeRoutineName(name.name);
      const candidates = byNormalizedName.get(normalizedName) ?? [];
      candidates.push({ routine, name, order: order++ });
      byNormalizedName.set(normalizedName, candidates);
    }
  }

  const index = { byNormalizedName };
  routineNameLookupIndexes.set(routines, index);
  return index;
}

function findRoutineNameMatches(
  source: string,
  range: SourceRange,
  routines: RoutineDeclaration[],
  searchAnyStart = false
): RoutineNameMatch[] {
  const { byNormalizedName } = getRoutineNameIndex(routines);
  const matches: RoutineNameMatch[] = [];
  for (let nameStart = range.start; nameStart < range.end; nameStart++) {
    if (
      nameStart > range.start &&
      (!searchAnyStart || isWordCharacter(source[nameStart - 1]))
    ) {
      if (!searchAnyStart) {
        break;
      }
      continue;
    }

    const matchedCandidates = new Set<RoutineNameCandidate>();
    for (let nameEnd = nameStart + 1; nameEnd <= range.end; nameEnd++) {
      if (nameEnd < range.end && !/\s/u.test(source[nameEnd])) {
        continue;
      }
      const sourceName = source.slice(nameStart, nameEnd);
      const normalizedName = normalizeRoutineName(sourceName);
      const possibleNames = [{ name: normalizedName, implicitDefiniteArticle: false }];
      if (searchAnyStart) {
        const sourceWords = [...sourceName.matchAll(/\p{L}+/gu)];
        const finalWord = sourceWords[sourceWords.length - 1];
        const expansion = finalWord
          ? routineContractions.get(finalWord[0].toLocaleLowerCase('pt-BR'))
          : undefined;
        const expandedWords = expansion?.split(' ');
        if (
          finalWord &&
          expandedWords &&
          definiteArticles.has(expandedWords[expandedWords.length - 1])
        ) {
          const prefix = sourceName.slice(0, finalWord.index);
          const nameWithoutArticle = [
            prefix,
            ...expandedWords.slice(0, -1)
          ].join(' ');
          possibleNames.push({
            name: normalizeRoutineName(nameWithoutArticle),
            implicitDefiniteArticle: true
          });
        }
      }
      for (const possibleName of possibleNames) {
        for (const candidate of byNormalizedName.get(possibleName.name) ?? []) {
          if (matchedCandidates.has(candidate)) {
            continue;
          }
          matchedCandidates.add(candidate);
          matches.push({
            ...candidate,
            nameStart,
            nameEnd,
            implicitDefiniteArticle: possibleName.implicitDefiniteArticle
          });
        }
      }
    }

    if (!searchAnyStart) {
      break;
    }
  }
  return matches.sort((first, second) =>
    first.order - second.order ||
    first.nameStart - second.nameStart
  );
}

function splitRoutineArguments(source: string, range: SourceRange): SourceRange[] {
  const argumentsList: SourceRange[] = [];
  let argumentStart = range.start;
  const words = /\p{L}+/gu;
  words.lastIndex = range.start;
  let match: RegExpExecArray | null;
  while ((match = words.exec(source)) && match.index < range.end) {
    const wordEnd = match.index + match[0].length;
    const word = match[0].toLocaleLowerCase('pt-BR');
    const isArgumentSeparator = reservedIdentifierWords.has(word);
    if (
      !isArgumentSeparator ||
      isWordCharacter(match.index > range.start ? source[match.index - 1] : '') ||
      isWordCharacter(wordEnd < range.end ? source[wordEnd] : '') ||
      ['como', 'qual'].includes(word) &&
        /\btal\s*$/iu.test(source.slice(range.start, match.index))
    ) {
      continue;
    }
    const nextStart = skipWhitespace(source, wordEnd, range.end);
    if (nextStart >= range.end) {
      continue;
    }
    if (!conjunctions.has(word)) {
      const nextArticle = readWord(source, nextStart, range.end);
      if (
        !nextArticle ||
        !definiteArticles.has(nextArticle.value.toLocaleLowerCase('pt-BR')) &&
        !indefiniteArticles.has(nextArticle.value.toLocaleLowerCase('pt-BR'))
      ) {
        continue;
      }
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
  computedFieldAccesses: RoutineComputedFieldAccess[] = [],
  variableAccesses: RoutineVariableAccess[] = [],
  implicitDefiniteArticle = false
): TypeReference | undefined {
  const cast = parseTypeCast(source, argument, symbols);
  if (cast) {
    const originalType = resolveRoutineArgumentType(
      source,
      cast.valueRange,
      caller,
      globalVariables,
      symbols,
      fieldAccesses,
      routines,
      computedFieldAccesses,
      variableAccesses,
      implicitDefiniteArticle
    );
    return originalType ? cast.type : undefined;
  }

  const fieldAccessType = resolveStructureFieldAccess(
    source,
    argument,
    caller,
    globalVariables,
    symbols,
    fieldAccesses,
    routines,
    computedFieldAccesses,
    variableAccesses
  );
  if (fieldAccessType) {
    return fieldAccessType;
  }

  const literal = parseGlobalVariableLiteral(source, argument);
  if (literal) {
    if (literal.kind === 'null') {
      return {
        name: 'nulo',
        normalizedName: 'nulo',
        range: argument
      };
    }
    const name = inferGlobalVariableTypeName(literal);
    if (!name) {
      return undefined;
    }
    return { name, normalizedName: normalizeTypeName(name), range: argument };
  }
  const firstWord = readWord(source, argument.start, argument.end);
  if (
    firstWord &&
    (implicitDefiniteArticle ||
      definiteArticles.has(firstWord.value.toLocaleLowerCase('pt-BR')) ||
      ['este', 'esta', 'estes', 'estas'].includes(firstWord.value.toLocaleLowerCase('pt-BR')))
  ) {
    const hasDefiniteArticle = !implicitDefiniteArticle ||
      definiteArticles.has(firstWord.value.toLocaleLowerCase('pt-BR'));
    const variableRange = trimRange(
      source,
      hasDefiniteArticle ? firstWord.end : argument.start,
      argument.end
    );
    const variableName = normalizeTypeName(
      source.slice(variableRange.start, variableRange.end)
    );
    const localVariable = findRoutineVariable(caller, variableName);
    const globalVariable = globalVariables.lookup(variableName);
    if (localVariable) {
      variableAccesses.push({
        reference: createTypeReference(source, variableRange),
        type: localVariable.type,
        scope: caller.range.start
      });
    } else if (globalVariable?.typeName) {
      variableAccesses.push({
        reference: createTypeReference(source, variableRange),
        type: createSyntheticTypeReference(globalVariable.typeName, argument)
      });
    }
    const variableType = resolveVariableType(
      caller,
      globalVariables,
      variableName
    );
    return variableType;
  }
  return undefined;
}

function resolveScalarRoutineArgumentType(
  source: string,
  argument: SourceRange,
  expectedType: TypeReference,
  symbols: TypeSymbolTable
): TypeReference | undefined {
  const expectedSymbol = symbols.lookup(expectedType.name);
  if (
    !expectedSymbol ||
    expectedSymbol.pluralName !== expectedType.normalizedName
  ) {
    return undefined;
  }

  const text = source.slice(argument.start, argument.end);
  const literalMatch = /^([+-]?\d+(?:\+[+-]?\d+\/[+-]?\d+|\/[+-]?\d+)?)(\s+)([\s\S]+)$/u.exec(text);
  if (!literalMatch) {
    return undefined;
  }

  const literalEnd = argument.start + literalMatch[1].length;
  const literal = parseGlobalVariableLiteral(source, {
    start: argument.start,
    end: literalEnd
  });
  if (!literal || !['integer', 'fraction', 'mixed'].includes(literal.kind)) {
    return undefined;
  }

  const typeRange = trimRange(
    source,
    literalEnd + literalMatch[2].length,
    argument.end
  );
  const actualType = symbols.lookup(source.slice(typeRange.start, typeRange.end));
  if (
    !actualType ||
    actualType.pluralName !== normalizeTypeName(
      source.slice(typeRange.start, typeRange.end)
    )
  ) {
    return undefined;
  }

  return createTypeReference(source, typeRange);
}

function parseTypeCast(
  source: string,
  argument: SourceRange,
  symbols: TypeSymbolTable
): { valueRange: SourceRange; type: TypeReference } | undefined {
  const marker = /\btal\s+(?:como|qual)\b/iu.exec(
    source.slice(argument.start, argument.end)
  );
  if (!marker) {
    return undefined;
  }
  const markerStart = argument.start + marker.index;
  const valueRange = trimRange(source, argument.start, markerStart);
  const typeRange = trimRange(
    source,
    markerStart + marker[0].length,
    argument.end
  );
  const article = readWord(source, typeRange.start, typeRange.end);
  if (
    valueRange.start === valueRange.end ||
    !article ||
    !indefiniteArticles.has(article.value.toLocaleLowerCase('pt-BR'))
  ) {
    return undefined;
  }

  const typeNameRange = trimRange(source, article.end, typeRange.end);
  const type = symbols.lookup(source.slice(typeNameRange.start, typeNameRange.end));
  if (!type) {
    return undefined;
  }
  return {
    valueRange,
    type: createTypeReference(source, typeNameRange)
  };
}

function resolveStructureFieldAccess(
  source: string,
  argument: SourceRange,
  caller: RoutineDeclaration,
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable,
  fieldAccesses: RoutineFieldAccess[],
  routines: RoutineDeclaration[],
  computedFieldAccesses: RoutineComputedFieldAccess[],
  variableAccesses: RoutineVariableAccess[] = []
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
  const firstArticleWord = firstArticle?.value.toLocaleLowerCase('pt-BR');
  const hasArticle = Boolean(firstArticleWord && definiteArticles.has(firstArticleWord));
  const firstSegmentStart = hasArticle ? firstArticle!.end : segments[0].start;
  const firstSegmentName = normalizeTypeName(
    source.slice(firstSegmentStart, segments[0].end)
  );
  const firstIsTypeOperator = [
    'endereçamento',
    'magnitude',
    'conteúdo'
  ].includes(firstSegmentName);
  if (!hasArticle && !firstIsTypeOperator) {
    return undefined;
  }
  const fieldRanges = [
    trimRange(source, firstSegmentStart, segments[0].end),
    ...segments.slice(1, -1)
  ].reverse();
  const rootRange = segments[segments.length - 1];
  const rootArticle = readWord(source, rootRange.start, rootRange.end);
  const rootArticleWord = rootArticle?.value.toLocaleLowerCase('pt-BR');
  const rootNameRange = rootArticle &&
    (definiteArticles.has(rootArticleWord ?? '') ||
      ['deste', 'desta', 'destes', 'destas'].includes(rootArticleWord ?? ''))
    ? trimRange(source, rootArticle.end, rootRange.end)
    : rootRange;
  const rootName = normalizeTypeName(source.slice(rootNameRange.start, rootNameRange.end));
  const globalVariable = globalVariables.lookup(rootName);
  const rootLocalVariable = findRoutineVariable(caller, rootName);
  if (rootLocalVariable) {
    variableAccesses.push({
      reference: createTypeReference(source, rootNameRange),
      type: rootLocalVariable.type,
      scope: caller.range.start
    });
  } else if (globalVariable?.typeName) {
    variableAccesses.push({
      reference: createTypeReference(source, rootNameRange),
      type: createSyntheticTypeReference(globalVariable.typeName, rootNameRange)
    });
  }
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
  if (!rootType && fieldRanges.length === 1) {
    const operatorName = normalizeTypeName(
      source.slice(fieldRanges[0].start, fieldRanges[0].end)
    );
    if (operatorName === 'magnitude') {
      return createSyntheticTypeReference('número', fieldRanges[0]);
    }
    if (operatorName === 'endereçamento') {
      return createSyntheticTypeReference('ponteiro', fieldRanges[0]);
    }
  }
  if (!rootType || fieldRanges.some(fieldRange => fieldRange.start === fieldRange.end)) {
    return undefined;
  }

  let currentType = rootType;
  const resolvedAccesses: RoutineFieldAccess[] = [];
  for (const fieldRange of fieldRanges) {
    const fieldName = normalizeTypeName(source.slice(fieldRange.start, fieldRange.end));
    if (['endereçamento', 'magnitude', 'conteúdo'].includes(fieldName)) {
      const operatorType = resolveTypeOperator(fieldName, currentType, symbols);
      if (operatorType) {
        currentType = operatorType;
      }
      continue;
    }

    const operator = fieldName.match(/^(endereçamento|magnitude|conteúdo)\s+(.+)$/u);
    if (operator) {
      const memberName = normalizeTypeName(operator[2]);
      const member = findStructureField(currentType.name, memberName, symbols);
      if (!member) {
        const computedField = findComputedFieldRoutine(
          currentType.name,
          memberName,
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
      } else {
        resolvedAccesses.push({
          reference: createTypeReference(source, fieldRange),
          target: member
        });
        currentType = member.type;
      }
      const operatorType = resolveTypeOperator(
        operator[1],
        currentType,
        symbols
      );
      if (operatorType) {
        currentType = operatorType;
      }
      continue;
    }

    const field = findStructureField(currentType.name, fieldName, symbols);
    if (!field) {
      const computedField = findComputedFieldRoutine(
        currentType.name,
        fieldName,
        routines,
        symbols
      );
      if (!computedField?.computedField?.valueType) {
        const listElementType = resolveListSpecialField(
          currentType.name,
          fieldName,
          fieldRange,
          symbols
        );
        if (listElementType) {
          currentType = listElementType;
          continue;
        }
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

function resolveListSpecialField(
  listTypeName: string,
  fieldName: string,
  range: SourceRange,
  symbols: TypeSymbolTable
): TypeReference | undefined {
  if (symbols.getBaseTypeDistance(listTypeName, 'lista') === undefined) {
    return undefined;
  }

  const prefixForm = /^(?:primeiro|primeira|último|última|próximo|próxima)\s+(.+)$/u.exec(fieldName);
  if (prefixForm) {
    const elementType = symbols.lookup(prefixForm[1]);
    return elementType
      ? createSyntheticTypeReference(elementType.name, range)
      : undefined;
  }

  const suffixForm = /^(.+)\s+(?:anterior|precedente)$/u.exec(fieldName);
  if (suffixForm) {
    const elementType = symbols.lookup(suffixForm[1]);
    return elementType
      ? createSyntheticTypeReference(elementType.name, range)
      : undefined;
  }
  return undefined;
}

function resolveTypeOperator(
  operator: string,
  type: TypeReference,
  symbols: TypeSymbolTable
): TypeReference | undefined {
  if (operator === 'magnitude') {
    const numberType = symbols.lookup('número');
    return numberType
      ? createSyntheticTypeReference(numberType.name, type.range)
      : undefined;
  }
  if (operator === 'endereçamento') {
    const pointerType = symbols.entries
      .filter(symbol =>
        symbol.pointedType &&
        symbols.getBaseTypeDistance(type.name, symbol.pointedType.name) !== undefined
      )
      .sort((first, second) =>
        (symbols.getBaseTypeDistance(type.name, first.pointedType!.name) ?? Number.MAX_SAFE_INTEGER) -
        (symbols.getBaseTypeDistance(type.name, second.pointedType!.name) ?? Number.MAX_SAFE_INTEGER)
      )[0];
    if (pointerType) {
      return createSyntheticTypeReference(pointerType.name, type.range);
    }
    const genericPointer = symbols.lookup('ponteiro');
    return genericPointer
      ? createSyntheticTypeReference(genericPointer.name, type.range)
      : undefined;
  }
  if (operator === 'conteúdo') {
    const pointer = symbols.lookup(type.name);
    return pointer?.pointedType
      ? createSyntheticTypeReference(pointer.pointedType.name, type.range)
      : undefined;
  }
  return undefined;
}

function createSyntheticTypeReference(name: string, range: SourceRange): TypeReference {
  return {
    name,
    normalizedName: normalizeTypeName(name),
    range
  };
}

function findComputedFieldRoutine(
  structureType: string,
  fieldName: string,
  routines: RoutineDeclaration[],
  symbols: TypeSymbolTable
): RoutineDeclaration | undefined {
  const candidates = getComputedFieldRoutineIndex(routines).get(fieldName) ?? [];
  return candidates
    .filter(routine =>
      routine.computedField &&
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

const computedFieldRoutineIndexes = new WeakMap<
  RoutineDeclaration[],
  Map<string, RoutineDeclaration[]>
>();

function getComputedFieldRoutineIndex(
  routines: RoutineDeclaration[]
): Map<string, RoutineDeclaration[]> {
  const cachedIndex = computedFieldRoutineIndexes.get(routines);
  if (cachedIndex) {
    return cachedIndex;
  }

  const index = new Map<string, RoutineDeclaration[]>();
  for (const routine of routines) {
    if (!routine.computedField) {
      continue;
    }
    const candidates = index.get(routine.computedField.name.normalizedName) ?? [];
    candidates.push(routine);
    index.set(routine.computedField.name.normalizedName, candidates);
  }
  computedFieldRoutineIndexes.set(routines, index);
  return index;
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
  return nullLiteralWords.has(actual.normalizedName) ||
    symbols.getBaseTypeDistance(actual.name, expected.name) !== undefined ||
    actual.normalizedName === expected.normalizedName;
}

function getRoutineArgumentTypeDistance(
  actual: TypeReference,
  expectedName: string,
  symbols: TypeSymbolTable
): number | undefined {
  return nullLiteralWords.has(actual.normalizedName)
    ? 0
    : symbols.getBaseTypeDistance(actual.name, expectedName);
}

function parseLocalVariableDeclaration(
  source: string,
  argumentsRange: SourceRange,
  symbols: TypeSymbolTable
): RoutineLocalVariable | undefined {
  const castMatch = /\btal\s+(?:como|qual)\b/iu.exec(
    source.slice(argumentsRange.start, argumentsRange.end)
  );
  const declarationEnd = castMatch
    ? argumentsRange.start + castMatch.index
    : argumentsRange.end;
  const articles = /\p{L}+/gu;
  articles.lastIndex = argumentsRange.start;
  let articleMatch: RegExpExecArray | null;
  let localVariable: RoutineLocalVariable | undefined;
  while ((articleMatch = articles.exec(source)) && articleMatch.index < declarationEnd) {
    const article = articleMatch[0].toLocaleLowerCase('pt-BR');
    if (!indefiniteArticles.has(article)) {
      continue;
    }
    const articleEnd = articleMatch.index + articleMatch[0].length;
    const outputMarker = findWordOutsideStrings(
      source,
      articleEnd,
      declarationEnd,
      'sobre'
    );
    if (outputMarker) {
      const inputArticle = readWord(source, outputMarker.end, declarationEnd);
      const outputTypeRange = trimRange(source, articleEnd, outputMarker.start);
      const outputType = findTypeSuffix(source, outputTypeRange, symbols);
      if (
        inputArticle &&
        definiteArticles.has(inputArticle.value.toLocaleLowerCase('pt-BR')) &&
        outputType
      ) {
        localVariable = {
          name: createTypeReference(source, outputTypeRange),
          type: outputType,
          range: { start: articleMatch.index, end: declarationEnd },
          inputArgumentRange: trimRange(source, inputArticle.start, declarationEnd)
        };
        articles.lastIndex = declarationEnd;
        continue;
      }
    }

    const marker = findAnyWord(
      source,
      articleEnd,
      declarationEnd,
      localVariableNameMarkers
    );
    const typeRange = trimRange(source, articleEnd, marker?.start ?? declarationEnd);
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
      range: { start: articleMatch.index, end: declarationEnd }
    };
    articles.lastIndex = declarationEnd;
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
        offset <= call.name.range.end ||
        call.target &&
        call.qualifierRange !== undefined &&
        offset >= call.qualifierRange.start &&
        offset <= call.qualifierRange.end
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
    for (const assignment of routine.assignments) {
      const access = assignment.fieldAccesses?.find(candidate =>
        offset >= candidate.reference.range.start &&
        offset <= candidate.reference.range.end
      );
      if (access) {
        return access.target;
      }
    }
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

export function findTypeDefinitionReferenceAtOffset(
  parsedDocument: ParsedDocument,
  offset: number
): TypeReference | undefined {
  for (const declaration of parsedDocument.globalVariables) {
    if (
      offset >= declaration.name.range.start &&
      offset <= declaration.name.range.end
    ) {
      const typeName = declaration.type?.name ?? declaration.inferredTypeName;
      return typeName
        ? createSyntheticTypeReference(typeName, declaration.name.range)
        : undefined;
    }
  }

  const field = findRoutineFieldAtOffset(parsedDocument, offset);
  if (field) {
    return field.type;
  }

  for (const routine of parsedDocument.routines) {
    const localVariable = routine.localVariables.find(variable =>
      offset >= variable.name.range.start &&
      offset <= variable.name.range.end
    );
    if (localVariable) {
      return localVariable.type;
    }

    const accesses = [
      ...routine.assignments.flatMap(assignment => assignment.variableAccesses ?? []),
      ...routine.calls.flatMap(call => call.variableAccesses ?? []),
      ...routine.processes.flatMap(process => process.variableAccesses ?? [])
    ];
    const access = accesses.find(candidate =>
      offset >= candidate.reference.range.start &&
      offset <= candidate.reference.range.end
    );
    if (access) {
      return access.type;
    }
  }

  return findTypeReferenceAtOffset(parsedDocument, offset);
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
      const reservedWord = match[0].toLocaleLowerCase('pt-BR');
      if (!reservedIdentifierWords.has(reservedWord)) {
        continue;
      }
      const previousCharacter = match.index > 0 ? text[match.index - 1] : '';
      const nextCharacter = text[match.index + match[0].length] ?? '';
      if (isIdentifierJoiner(previousCharacter) || isIdentifierJoiner(nextCharacter)) {
        continue;
      }
      if (
        match[0] === 'EM' ||
        reservedWord === 'e' && isLetterName(text, match.index, match[0].length)
      ) {
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

function isIdentifierJoiner(character: string): boolean {
  return character === '-' || character === '/' || character === "'";
}

function isLetterName(text: string, start: number, length: number): boolean {
  const prefix = text.slice(0, start);
  const suffix = text.slice(start + length);
  return /^(?:(?:o|a|letra)\s*)?$/iu.test(prefix) &&
    /^\s+(?:maiúscul[oa]|minúscul[oa])(?:\s|$)/iu.test(suffix);
}

interface ParsedRoutineHeader {
  name: TypeReference;
  qualifier?: string;
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

function maskParenthesizedGroups(
  source: string,
  start: number,
  end: number
): string {
  const firstGroup = source.indexOf('(', start);
  if (firstGroup === -1 || firstGroup >= end) {
    return source;
  }

  const header = source.slice(start, end);
  const characters = header.split('');
  let depth = 0;
  for (let index = 0; index < header.length; index++) {
    if (header[index] === '(') {
      depth++;
    }
    if (depth > 0) {
      if (header[index] !== '\n' && header[index] !== '\r') {
        characters[index] = ' ';
      }
    }
    if (header[index] === ')' && depth > 0) {
      depth--;
    }
  }
  return source.slice(0, start) + characters.join('') + source.slice(end);
}

function findHeaderTerminator(source: string, start: number): number {
  let depth = 0;
  for (let index = start; index < source.length; index++) {
    if (source[index] === '(') {
      depth++;
    } else if (source[index] === ')' && depth > 0) {
      depth--;
    } else if (depth === 0 && (source[index] === ':' || source[index] === ';')) {
      return index;
    }
  }
  return -1;
}

function getParenthesisDepth(
  source: string,
  start: number,
  end: number,
  initialDepth = 0
): number {
  let depth = initialDepth;
  for (let index = start; index < end; index++) {
    if (source[index] === '(') {
      depth++;
    } else if (source[index] === ')' && depth > 0) {
      depth--;
    }
  }
  return depth;
}

function findTrailingParentheticalQualifier(
  source: string,
  start: number,
  end: number
): { start: number; text: string } | undefined {
  let cursor = end - 1;
  while (cursor >= start && /\s/u.test(source[cursor])) {
    cursor--;
  }
  if (source[cursor] !== ')') {
    return undefined;
  }

  let suffixStart = cursor + 1;
  while (cursor >= start && source[cursor] === ')') {
    let depth = 0;
    let groupStart = -1;
    for (let index = cursor; index >= start; index--) {
      if (source[index] === ')') {
        depth++;
      } else if (source[index] === '(') {
        depth--;
        if (depth === 0) {
          groupStart = index;
          break;
        }
      }
    }
    if (groupStart === -1) {
      return undefined;
    }
    suffixStart = groupStart;
    cursor = groupStart - 1;
    while (cursor >= start && /\s/u.test(source[cursor])) {
      cursor--;
    }
  }
  return {
    start: suffixStart,
    text: normalizeTypeName(source.slice(suffixStart, end))
  };
}

function parseRoutineDeclarations(
  source: string,
  diagnostics: ParserDiagnostic[]
): RoutineDeclaration[] {
    const headerPattern = /(?:(rotina|função)\s+)?para\s+que\s+se(?:\s+(determine)\s+(se))?/giu;
    const headers: ParsedRoutineHeader[] = [];
    let match: RegExpExecArray | null;
    let parenthesisScanOffset = 0;
    let parenthesisDepth = 0;

    while ((match = headerPattern.exec(source))) {
      parenthesisDepth = getParenthesisDepth(
        source,
        parenthesisScanOffset,
        match.index,
        parenthesisDepth
      );
      parenthesisScanOffset = match.index;
      if (parenthesisDepth > 0) {
        continue;
      }
      const headerEnd = findHeaderTerminator(source, headerPattern.lastIndex);
      if (headerEnd === -1) {
        continue;
      }
      const qualifier = findTrailingParentheticalQualifier(
        source,
        headerPattern.lastIndex,
        headerEnd
      );
      const syntaxSource = maskParenthesizedGroups(
        source,
        headerPattern.lastIndex,
        headerEnd
      );
      const isBooleanFunction = Boolean(match[2]);
      const negativeHeaderWord = isBooleanFunction
        ? findWord(syntaxSource, headerPattern.lastIndex, headerEnd, 'não')
        : undefined;
      if (negativeHeaderWord) {
        diagnostics.push({
          message: '"não" cannot be part of a boolean function header.',
          range: negativeHeaderWord
        });
      }
      const headerSyntaxSource = isBooleanFunction
        ? maskWordInRange(
          syntaxSource,
          { start: headerPattern.lastIndex, end: headerEnd },
          'não'
        )
        : syntaxSource;
      const returningMarker = findWord(headerSyntaxSource, headerPattern.lastIndex, headerEnd, 'retornando');
      const signatureEnd = Math.min(
        returningMarker?.start ?? headerEnd,
        qualifier?.start ?? headerEnd
      );
      const computedField = parseComputedFieldHeader(
        headerSyntaxSource,
        headerPattern.lastIndex,
        headerEnd
      );
      const firstParameterArticle = findAnyWord(
        headerSyntaxSource,
        headerPattern.lastIndex,
        signatureEnd,
        indefiniteArticles
      );
      const parameterArticle = firstParameterArticle;
      const predicateMarker = isBooleanFunction
        ? findAnyWord(
          headerSyntaxSource,
          parameterArticle?.end ?? headerPattern.lastIndex,
          signatureEnd,
          routinePredicateWords
        )
        : undefined;
      const predicateTailArticle = predicateMarker
        ? findAnyWord(
          headerSyntaxSource,
          predicateMarker.end,
          signatureEnd,
          indefiniteArticles
        )
        : undefined;
      const predicateParameters = predicateMarker && parameterArticle
        ? [
          parseRoutineParameter(headerSyntaxSource, parameterArticle.start, predicateMarker.start),
          predicateTailArticle
            ? parseRoutineParameter(headerSyntaxSource, predicateTailArticle.start, signatureEnd)
            : undefined
        ].filter((parameter): parameter is RoutineParameter => parameter !== undefined)
        : undefined;
      const parameterStart = parameterArticle?.start;
      const nameEnd = Math.min(
        parameterArticle?.start ?? headerEnd,
        returningMarker?.start ?? headerEnd,
        qualifier?.start ?? headerEnd
      );
      const nameRange = predicateMarker
        ? {
          start: predicateMarker.start,
          end: predicateTailArticle?.start ?? signatureEnd
        }
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
        const reservedWord = findWord(headerSyntaxSource, nameRange.start, nameRange.end, reservedKeyword);
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
      const parameterEnd = Math.min(
        parametersEnd,
        qualifier?.start ?? headerEnd
      );
      const trailingRoutineNameSuffix = parameterStart === undefined
        ? undefined
        : findTrailingRoutineNameSuffix(
          headerSyntaxSource,
          parameterStart,
          parameterEnd
        );
      const parameters = predicateParameters ?? (parameterStart !== undefined
        ? parseRoutineHeaderParameters(
          headerSyntaxSource,
          parameterStart,
          trailingRoutineNameSuffix?.start ?? parameterEnd,
          diagnostics
        )
        : []);
      if (parameterStart !== undefined && parameters.length === 0) {
        const parameterArticleMarker = parameterArticle;
        diagnostics.push({
          message: 'At least one parameter is required in the routine header.',
          range: parameterArticleMarker
            ? { start: parameterArticleMarker.start, end: parameterArticleMarker.end }
            : { start: parameterStart, end: parametersEnd }
        });
      }
      const returnParameter = returningMarker
        ? parseRoutineParameter(
          headerSyntaxSource,
          returningMarker.end,
          Math.min(headerEnd, qualifier?.start ?? headerEnd)
        )
        : undefined;
      if (returningMarker && !returnParameter) {
        diagnostics.push({
          message: 'A return type is required after "retornando".',
          range: { start: returningMarker.start, end: headerEnd }
        });
      }

      headers.push({
        name: {
          ...createTypeReference(headerSyntaxSource, nameRange),
          qualifier: qualifier?.text
        },
        qualifier: qualifier?.text,
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
        qualifier: header.qualifier,
        alternateNames: alternateHeaders.map(alternate => ({
          ...alternate.name,
          qualifier: alternate.qualifier
        })),
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
    alternate.qualifier === primary.qualifier &&
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

function parseRoutineHeaderParameters(
  source: string,
  start: number,
  end: number,
  diagnostics: ParserDiagnostic[]
): RoutineParameter[] {
  return parseRoutineParameters(source, start, end, diagnostics);
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
      const isIndefiniteArticle = indefiniteArticles.has(word);
      const previousWord = source.slice(start, match.index).match(/\p{L}+\s*$/u)?.[0]
        .trim()
        .toLocaleLowerCase('pt-BR');
      const isParameterStart = isIndefiniteArticle &&
        match.index > start &&
        !reservedIdentifierWords.has(previousWord ?? '');
      if (
        (!routineNameDelimiters.has(word) && !conjunctions.has(word) && !isParameterStart) ||
        isWordCharacter(match.index > start ? source[match.index - 1] : '') ||
        isWordCharacter(wordEnd < end ? source[wordEnd] : '') ||
        ['como', 'qual'].includes(word) &&
          /\btal\s*$/iu.test(source.slice(start, match.index))
      ) {
        continue;
      }
      if (separator && separator.start < match.index) {
        break;
      }
      if (isIndefiniteArticle) {
        separator = { start: match.index, nextStart: match.index };
        break;
      }
      const nextParameter = findAnyWord(source, wordEnd, end, indefiniteArticles);
      if (nextParameter) {
        separator = { start: match.index, nextStart: nextParameter.start };
        break;
      }
    }
    return separator;
  }

function findTrailingRoutineNameSuffix(
  source: string,
  start: number,
  end: number
): SourceRange | undefined {
  const words = /\p{L}+/gu;
  words.lastIndex = start;
  let match: RegExpExecArray | null;
  while ((match = words.exec(source)) && match.index < end) {
    const word = match[0].toLocaleLowerCase('pt-BR');
    if (!routineNameDelimiters.has(word)) {
      continue;
    }

    const wordEnd = match.index + match[0].length;
    if (!findAnyWord(source, wordEnd, end, indefiniteArticles)) {
      return { start: match.index, end };
    }
  }
  return undefined;
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
  const characters = new Uint16Array(source.length);
  for (let index = 0; index < source.length; index++) {
    characters[index] = source.charCodeAt(index);
  }
  let inString = false;
  let inBlockComment = false;

  for (let index = 0; index < characters.length; index++) {
    const character = source[index];
    const nextCharacter = source[index + 1];

    if (inBlockComment) {
      if (character === ']') {
        characters[index] = 32;
        inBlockComment = false;
      } else if (/[\p{Cc}]/u.test(character)) {
        diagnostics.push({
          message: 'Non-printable characters are not allowed in comments.',
          range: { start: index, end: index + 1 }
        });
        if (character !== '\n' && character !== '\r') {
          characters[index] = 32;
        }
      } else {
        characters[index] = 32;
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
      characters[index] = 32;
      inBlockComment = true;
      continue;
    }

    if (character === '\\') {
      characters[index] = 32;
      for (; index < characters.length; index++) {
        const commentCharacter = source[index];
        if (commentCharacter === '\n' || commentCharacter === '\r') {
          break;
        }
        if (/[\p{Cc}]/u.test(commentCharacter)) {
          diagnostics.push({
            message: 'Non-printable characters are not allowed in comments.',
            range: { start: index, end: index + 1 }
          });
        }
        characters[index] = 32;
      }
    }
  }

  const chunks: string[] = [];
  const chunkSize = 8192;
  for (let start = 0; start < characters.length; start += chunkSize) {
    chunks.push(String.fromCharCode(...characters.subarray(
      start,
      Math.min(start + chunkSize, characters.length)
    )));
  }
  return chunks.join('');
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

function inferGlobalVariableTypeName(literal: GlobalVariableLiteral): string | undefined {
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
    case 'null':
      return undefined;
  }
}

function findDeclarationPeriod(source: string, start: number): number {
  let inString = false;
  let parenthesisDepth = 0;
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
    if (inString) {
      continue;
    }
    if (source[index] === '(') {
      parenthesisDepth++;
      continue;
    }
    if (source[index] === ')' && parenthesisDepth > 0) {
      parenthesisDepth--;
      continue;
    }
    if (source[index] === '.' && parenthesisDepth === 0) {
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
  const match = /\bigual\s+a\b/iu.exec(source.slice(start, end));
  if (!match) {
    return undefined;
  }
  const matchStart = start + match.index;
  return { start: matchStart, end: matchStart + match[0].length };
}

function parseGlobalVariableLiteral(
  source: string,
  range: SourceRange
): GlobalVariableLiteral | undefined {
  const text = source.slice(range.start, range.end);
  if (nullLiteralWords.has(normalizeTypeName(text))) {
    return { kind: 'null', text, range };
  }
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
  declarations: (TypeDeclaration | GlobalVariableDeclaration)[],
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[]
): void {
  for (const declaration of declarations) {
    const ownerTypeName = 'baseType' in declaration
      ? declaration.name.name
      : declaration.type?.name;
    const isListType = ownerTypeName !== undefined &&
      symbols.getBaseTypeDistance(ownerTypeName, 'lista') !== undefined;
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
        if (!resolvedType && isListType) {
          for (let lastWord = words.length - 1; lastWord >= 0; lastWord--) {
            const candidateName = words.slice(0, lastWord + 1).map(word => word[0]).join(' ');
            if (!symbols.lookup(candidateName)) {
              continue;
            }
            const typeEnd = field.name.range.start +
              words[lastWord].index! +
              words[lastWord][0].length;
            resolvedType = createTypeReference(source, {
              start: field.name.range.start,
              end: typeEnd
            });
            break;
          }
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
  const [numerator, denominator = '1'] = fraction.split('/');
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

const parsedReferencesCache = new WeakMap<ParsedDocument, ParsedReference[]>();
const parsedReferenceIndexCache = new WeakMap<
  ParsedDocument,
  { entries: { reference: ParsedReference; order: number }[]; prefixMaxEnd: number[] }
>();

export function getParsedReferences(parsed: ParsedDocument): ParsedReference[] {
  const cachedReferences = parsedReferencesCache.get(parsed);
  if (cachedReferences) {
    return cachedReferences;
  }

  const references: ParsedReference[] = [];
  const add = (
    kind: ParsedReference['kind'],
    name: string,
    range: SourceRange,
    options: Pick<ParsedReference, 'scope' | 'container' | 'declaration'> = {}
  ): void => {
    if (range.start >= range.end) {
      return;
    }
    references.push({
      kind,
      name: normalizeTypeName(name),
      range,
      ...options
    });
  };
  const addType = (reference: TypeReference | undefined, declaration = false): void => {
    if (!reference) {
      return;
    }
    const symbol = parsed.symbols.lookup(reference.name);
    add('type', symbol?.normalizedName ?? reference.name, reference.range, { declaration });
  };
  const addFields = (
    fields: TypeField[] | undefined,
    ownerTypeName: string
  ): void => {
    for (const field of fields ?? []) {
      if (field.kind === 'byte-array') {
        if (field.name) {
          add('field', field.name.name, field.name.range, {
            container: normalizeTypeName(ownerTypeName),
            declaration: true
          });
        }
        addType(field.elementType);
        continue;
      }
      add('field', field.name.name, field.name.range, {
        container: normalizeTypeName(ownerTypeName),
        declaration: true
      });
      addType(field.type);
      addType(field.unionTarget);
    }
  };
  const addVariableAccesses = (
    accesses: RoutineVariableAccess[] | undefined,
    routine: RoutineDeclaration
  ): void => {
    for (const access of accesses ?? []) {
      add('variable', access.reference.name, access.reference.range, {
        scope: access.scope === undefined ? undefined : routine.range.start
      });
    }
  };
  const addFieldAccesses = (
    accesses: RoutineFieldAccess[] | undefined,
    ownerTypeName?: string
  ): void => {
    for (const access of accesses ?? []) {
      add('field', access.target.name.name, access.reference.range, {
        container: normalizeTypeName(ownerTypeName ?? findFieldOwner(access.target, parsed) ?? '')
      });
    }
  };

  for (const declaration of parsed.declarations) {
    add('type', declaration.name.name, declaration.name.range, { declaration: true });
    addType(declaration.baseType);
    addType(declaration.pointedType);
    addFields(declaration.fields, declaration.name.name);
  }
  for (const declaration of parsed.globalVariables) {
    add('variable', declaration.name.name, declaration.name.range, { declaration: true });
    addType(declaration.type);
    addFields(declaration.fields, declaration.type?.name ?? declaration.inferredTypeName ?? '');
  }
  for (const routine of parsed.routines) {
    const routineName = normalizeTypeName(routine.name.name);
    add('routine', routineName, routine.name.range, { declaration: true });
    for (const alias of routine.alternateNames) {
      add('routine', routineName, alias.range, { declaration: true });
    }
    for (const parameter of routine.parameters) {
      add('variable', parameter.name.name, parameter.name.range, {
        scope: routine.range.start,
        declaration: true
      });
      addType(parameter.type);
    }
    if (routine.returnParameter) {
      add('variable', routine.returnParameter.name.name, routine.returnParameter.name.range, {
        scope: routine.range.start,
        declaration: true
      });
      addType(routine.returnParameter.type);
    }
    for (const variable of routine.localVariables) {
      add('variable', variable.name.name, variable.name.range, {
        scope: routine.range.start,
        declaration: true
      });
      addType(variable.type);
    }
    if (routine.computedField) {
      add('field', routine.computedField.name.name, routine.computedField.name.range, {
        container: normalizeTypeName(routine.computedField.structureType.name),
        declaration: true
      });
      addType(routine.computedField.structureType);
      addType(routine.computedField.valueType);
    }

    for (const assignment of routine.assignments) {
      addVariableAccesses(assignment.variableAccesses, routine);
      addFieldAccesses(assignment.fieldAccesses);
    }
    for (const output of routine.outputs) {
      addVariableAccesses(output.variableAccesses, routine);
      addFieldAccesses(output.fieldAccesses);
    }
    for (const call of routine.calls) {
      if (call.target) {
        add('routine', call.target.name.name, call.name.range);
      }
      addVariableAccesses(call.variableAccesses, routine);
      addFieldAccesses(call.fieldAccesses);
    }
    for (const process of routine.processes) {
      addVariableAccesses(process.variableAccesses, routine);
      addFieldAccesses(process.fieldAccesses);
    }
  }

  parsedReferencesCache.set(parsed, references);
  return references;
}

export function findParsedReferenceAtOffset(
  parsed: ParsedDocument,
  offset: number
): ParsedReference | undefined {
  const references = getParsedReferences(parsed);
  let index = parsedReferenceIndexCache.get(parsed);
  if (!index) {
    const entries = references.map((reference, order) => ({ reference, order }));
    entries.sort((first, second) =>
      first.reference.range.start - second.reference.range.start ||
      first.order - second.order
    );
    const prefixMaxEnd: number[] = [];
    let maxEnd = Number.NEGATIVE_INFINITY;
    for (const entry of entries) {
      maxEnd = Math.max(maxEnd, entry.reference.range.end);
      prefixMaxEnd.push(maxEnd);
    }
    index = { entries, prefixMaxEnd };
    parsedReferenceIndexCache.set(parsed, index);
  }

  let low = 0;
  let high = index.entries.length;
  while (low < high) {
    const middle = (low + high) >>> 1;
    if (index.entries[middle].reference.range.start <= offset) {
      low = middle + 1;
    } else {
      high = middle;
    }
  }

  const priority: Record<ParsedReference['kind'], number> = {
    variable: 0,
    field: 1,
    routine: 2,
    type: 3
  };
  let selected: ParsedReference | undefined;
  let selectedPriority = Number.POSITIVE_INFINITY;
  let selectedOrder = Number.POSITIVE_INFINITY;
  for (let position = low - 1; position >= 0; position--) {
    if (index.prefixMaxEnd[position] < offset) {
      break;
    }
    const { reference, order } = index.entries[position];
    if (offset > reference.range.end) {
      continue;
    }
    const candidatePriority = priority[reference.kind];
    const declarationDifference = Number(reference.declaration) -
      Number(selected?.declaration);
    if (
      candidatePriority < selectedPriority ||
      candidatePriority === selectedPriority &&
        !Number.isNaN(declarationDifference) &&
        declarationDifference > 0 ||
      candidatePriority === selectedPriority &&
        (Number.isNaN(declarationDifference) || declarationDifference === 0) &&
        order < selectedOrder
    ) {
      selected = reference;
      selectedPriority = candidatePriority;
      selectedOrder = order;
    }
  }
  return selected;
}

function findFieldOwner(field: NamedTypeField, parsed: ParsedDocument): string | undefined {
  for (const declaration of parsed.declarations) {
    if (declaration.fields?.includes(field)) {
      return declaration.name.name;
    }
  }
  for (const declaration of parsed.globalVariables) {
    if (declaration.fields?.includes(field)) {
      return declaration.type?.name ?? declaration.name.name;
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
  const scalarFactor = readScalarFactor(source, operator.end, periodIndex);
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
      const fieldSeparator = findFieldSeparator(source, typeStart, end);
      const marker = findFieldMarker(
        source,
        typeStart,
        fieldSeparator?.start ?? end
      );
      const separator = marker
        ? findFieldSeparator(source, marker.end, end)
        : fieldSeparator;
      const typeRange = trimRange(
        source,
        typeStart,
        marker?.start ?? separator?.start ?? end
      );
      if (typeRange.start === typeRange.end) {
        return undefined;
      }
      const nameRange = marker
        ? trimRange(source, marker.end, separator?.start ?? end)
        : undefined;
      const elementType = createTypeReference(source, typeRange);
      fields.push({
        kind: 'byte-array',
        count: count.value,
        elementType,
        name: nameRange && nameRange.start < nameRange.end
          ? createTypeReference(source, nameRange)
          : undefined,
        range: { start: count.start, end: (separator?.start ?? end) }
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
      range: { start: article.start, end: fieldEnd },
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
  const match = /\(\s*referência\s*\)/iu.exec(source.slice(start, end));
  if (!match) {
    return undefined;
  }
  const matchStart = start + match.index;
  return { start: matchStart, end: matchStart + match[0].length };
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

function readScalarFactor(
  source: string,
  start: number,
  end: number
): { value: string; start: number; end: number } | undefined {
  let numberStart = start;
  while (numberStart < end && /\s/u.test(source[numberStart])) {
    numberStart++;
  }
  const match = /^\d+(?:\/\d+)?/u.exec(source.slice(numberStart, end));
  if (!match || !/\s/u.test(source[numberStart + match[0].length] ?? '')) {
    return undefined;
  }
  const fraction = match[0].split('/');
  if (fraction.length === 2 && BigInt(fraction[1]) === 0n) {
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
    if (
      isWordCharacter(previousCharacter) ||
      isWordCharacter(nextCharacter) ||
      isIdentifierJoiner(previousCharacter) ||
      isIdentifierJoiner(nextCharacter)
    ) {
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
