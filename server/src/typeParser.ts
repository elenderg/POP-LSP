import pluralize from './plural';
import { performance } from 'node:perf_hooks';
import { isDeepStrictEqual } from 'node:util';

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
  scalarFactorRange?: SourceRange;
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
  implicitDefiniteArticle?: boolean;
}

export interface RoutineExpressionBinary {
  kind: 'binary';
  operator: ExpressionOperator;
  operatorRange: SourceRange;
  left: RoutineExpression;
  right: RoutineExpression;
  range: SourceRange;
}

export interface RoutineExpressionUnary {
  kind: 'unary';
  operator: '+' | '-';
  operatorRange: SourceRange;
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
  implicit?: boolean;
}

export interface RoutineConditionalBlock {
  condition: TypeReference;
  conditionArguments: TypeReference[];
  target?: RoutineDeclaration;
  predicateCall?: RoutineCall;
  bodyRange: SourceRange;
  statements: SourceRange[];
  range: SourceRange;
}

export interface RoutineLoopBlock {
  kind: 'explicit' | 'implicit';
  range: SourceRange;
  bodyRange: SourceRange;
  startInstruction?: RoutineLoopInstruction;
  endInstruction?: RoutineLoopInstruction;
  complete: boolean;
}

export interface RoutineDeclaration {
  bindingId?: string;
  name: TypeReference;
  qualifier?: string;
  alternateNames: TypeReference[];
  alternateParameters: RoutineParameter[][];
  parameters: RoutineParameter[];
  preservedParameters: PreservedRoutineParameter[];
  assignments: RoutineAssignment[];
  outputs: RoutineOutput[];
  returnStatements: RoutineReturnStatement[];
  simpleInstructions: RoutineSimpleInstruction[];
  localVariables: RoutineLocalVariable[];
  memoryAllocations: RoutineMemoryAllocation[];
  memoryDeallocations: RoutineMemoryDeallocation[];
  conditionals: RoutineConditionalBlock[];
  loopBlocks: RoutineLoopBlock[];
  statements: SourceRange[];
  processes: RoutineProcess[];
  loopInstructions: RoutineLoopInstruction[];
  computedFieldAccesses: RoutineComputedFieldAccess[];
  listSpecialFieldAccesses: RoutineListSpecialFieldAccess[];
  computedField?: RoutineComputedField;
  returnParameter?: RoutineParameter;
  calls: RoutineCall[];
  annotation?: 'rotina' | 'função';
  isBooleanFunction: boolean;
  isCompatible: boolean;
  range: SourceRange;
  bodyRange: SourceRange;
}

export interface RoutineCall {
  name: TypeReference;
  qualifierRange?: SourceRange;
  arguments: TypeReference[];
  typeReferences?: TypeReference[];
  addressType?: TypeReference;
  fieldAccesses?: RoutineFieldAccess[];
  variableAccesses?: RoutineVariableAccess[];
  computedFieldAccesses?: RoutineComputedFieldAccess[];
  localVariables?: RoutineLocalVariable[];
  target?: RoutineDeclaration;
}

export interface RoutineMemoryAllocation {
  type: TypeReference;
  variableAccess?: RoutineVariableAccess;
  range: SourceRange;
}

export interface RoutineMemoryDeallocation {
  type: TypeReference;
  variableAccess?: RoutineVariableAccess;
  fieldAccesses?: RoutineFieldAccess[];
  range: SourceRange;
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

export interface RoutineReturnStatement {
  kind: 'return' | 'boolean-return';
  range: SourceRange;
}

export interface RoutineSimpleInstruction {
  kind: 'decode' | 'push';
  range: SourceRange;
  literal?: GlobalVariableLiteral;
  variableAccesses?: RoutineVariableAccess[];
  isValid: boolean;
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

export interface RoutineListSpecialFieldAccess {
  kind: 'first' | 'last' | 'next' | 'previous';
  reference: TypeReference;
  listType: TypeReference;
  elementType: TypeReference;
}

export interface RoutineFieldAccess {
  reference: TypeReference;
  target: TypeField;
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
  private readonly symbolsByPluralName = new Map<string, TypeSymbol[]>();
  private readonly symbolEntries: TypeSymbol[];
  private scalarTypeNames: string[] = [];
  private readonly inheritanceEntryTimes = new Map<TypeSymbol, number>();
  private readonly inheritanceExitTimes = new Map<TypeSymbol, number>();
  private readonly inheritanceDepths = new Map<TypeSymbol, number>();
  private readonly scaleResolutionStates = new Map<
    TypeSymbol,
    'resolving' | 'resolved' | 'failed'
  >();

  constructor(
    declarations: TypeDeclaration[] = [],
    onDependencyProfile?: (
      durationMs: number,
      startTimeMs: number,
      endTimeMs: number
    ) => void
  ) {
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

    this.symbolEntries = [...this.symbols.values()];
    this.buildInheritanceIndex();

    const dependencyStartedAt = onDependencyProfile ? performance.now() : 0;
    for (const symbol of this.symbolEntries) {
      this.resolveScale(symbol);
    }
    this.indexResolvedTypeNames();
    if (onDependencyProfile) {
      const dependencyFinishedAt = performance.now();
      onDependencyProfile(
        dependencyFinishedAt - dependencyStartedAt,
        dependencyStartedAt,
        dependencyFinishedAt
      );
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

    const actualEntry = this.inheritanceEntryTimes.get(actual);
    if (actualEntry !== undefined) {
      const expectedEntry = this.inheritanceEntryTimes.get(expected);
      if (expectedEntry === undefined) {
        return undefined;
      }

      const actualExit = this.inheritanceExitTimes.get(actual);
      const expectedExit = this.inheritanceExitTimes.get(expected);
      const actualDepth = this.inheritanceDepths.get(actual);
      const expectedDepth = this.inheritanceDepths.get(expected);
      if (
        expectedEntry <= actualEntry &&
        actualExit !== undefined &&
        expectedExit !== undefined &&
        actualExit <= expectedExit &&
        actualDepth !== undefined &&
        expectedDepth !== undefined
      ) {
        return actualDepth - expectedDepth;
      }
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

  get entries(): readonly TypeSymbol[] {
    return this.symbolEntries;
  }

  getPluralMatches(name: string): readonly TypeSymbol[] {
    return this.symbolsByPluralName.get(normalizeTypeName(name)) ?? [];
  }

  get scalarNames(): readonly string[] {
    return this.scalarTypeNames;
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

  private indexResolvedTypeNames(): void {
    const scalarNames: string[] = [];
    for (const symbol of this.symbolEntries) {
      const pluralKey = normalizeTypeName(symbol.pluralName);
      const pluralSymbols = this.symbolsByPluralName.get(pluralKey) ?? [];
      pluralSymbols.push(symbol);
      this.symbolsByPluralName.set(pluralKey, pluralSymbols);
      if (symbol.isScalar) {
        scalarNames.push(symbol.name, symbol.pluralName);
      }
    }
    this.scalarTypeNames = scalarNames.sort(
      (first, second) => second.length - first.length
    );
  }

  private buildInheritanceIndex(): void {
    const children = new Map<TypeSymbol, TypeSymbol[]>();
    const roots: TypeSymbol[] = [];

    for (const symbol of this.symbols.values()) {
      const parent = symbol.declaration
        ? this.lookup(symbol.declaration.baseType.name)
        : undefined;
      if (!parent) {
        roots.push(symbol);
        continue;
      }

      const parentChildren = children.get(parent);
      if (parentChildren) {
        parentChildren.push(symbol);
      } else {
        children.set(parent, [symbol]);
      }
    }

    let timestamp = 0;
    for (const root of roots) {
      if (this.inheritanceEntryTimes.has(root)) {
        continue;
      }
      this.inheritanceEntryTimes.set(root, ++timestamp);
      this.inheritanceDepths.set(root, 0);
      const stack = [{ symbol: root, nextChild: 0 }];

      while (stack.length > 0) {
        const frame = stack[stack.length - 1];
        const descendants = children.get(frame.symbol);
        if (descendants && frame.nextChild < descendants.length) {
          const child = descendants[frame.nextChild++];
          if (this.inheritanceEntryTimes.has(child)) {
            continue;
          }
          this.inheritanceEntryTimes.set(child, ++timestamp);
          this.inheritanceDepths.set(
            child,
            this.inheritanceDepths.get(frame.symbol)! + 1
          );
          stack.push({ symbol: child, nextChild: 0 });
        } else {
          this.inheritanceExitTimes.set(frame.symbol, ++timestamp);
          stack.pop();
        }
      }
    }
  }

  private resolveScale(symbol: TypeSymbol): boolean {
    if (symbol.kind === 'primitive') {
      return symbol.isScalar;
    }
    const state = this.scaleResolutionStates.get(symbol);
    if (state === 'resolved') {
      return true;
    }
    if (state === 'failed' || state === 'resolving') {
      return false;
    }

    const path: TypeSymbol[] = [];
    const baseTypes: TypeSymbol[] = [];
    let current = symbol;
    let baseIsScalar = false;

    while (true) {
      if (current.kind === 'primitive') {
        baseIsScalar = current.isScalar;
        break;
      }

      const currentState = this.scaleResolutionStates.get(current);
      if (currentState === 'resolved') {
        baseIsScalar = true;
        break;
      }
      if (currentState === 'failed' || currentState === 'resolving') {
        break;
      }

      const declaration = current.declaration;
      if (!declaration) {
        this.scaleResolutionStates.set(current, 'failed');
        break;
      }

      const baseType = this.lookup(declaration.baseType.name);
      if (!baseType) {
        this.scaleResolutionStates.set(current, 'failed');
        break;
      }

      if (
        isNumberTypeName(declaration.baseType.name) &&
        current.scalarFactor !== undefined
      ) {
        const [factorNumerator, factorDenominator] = parseFraction(current.scalarFactor);
        current.scale = formatFraction(factorNumerator, factorDenominator);
        current.isScalar = true;
        current.kind = 'scalar';
        this.scaleResolutionStates.set(current, 'resolved');
        baseIsScalar = true;
        break;
      }

      this.scaleResolutionStates.set(current, 'resolving');
      path.push(current);
      baseTypes.push(baseType);
      current = baseType;
    }

    if (!baseIsScalar) {
      for (const unresolved of path) {
        this.scaleResolutionStates.set(unresolved, 'failed');
      }
      return false;
    }

    for (let index = path.length - 1; index >= 0; index--) {
      const resolved = path[index];
      const baseType = baseTypes[index];
      const [baseNumerator, baseDenominator] = parseFraction(baseType.scale);
      const [factorNumerator, factorDenominator] = parseFraction(
        resolved.scalarFactor ?? '1/1'
      );
      resolved.scale = formatFraction(
        baseNumerator * factorNumerator,
        baseDenominator * factorDenominator
      );
      resolved.isScalar = true;
      resolved.kind = 'scalar';
      this.scaleResolutionStates.set(resolved, 'resolved');
    }
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
  regions: ParserRegion[];
  commentRanges?: SourceRange[];
  symbols: TypeSymbolTable;
  globalVariableSymbols: GlobalVariableSymbolTable;
  routineSymbols: RoutineSymbolTable;
  diagnostics: ParserDiagnostic[];
}

export interface ParserRegion {
  kind: 'type' | 'global-variable' | 'routine';
  name: string;
  range: SourceRange;
  headerRange?: SourceRange;
  bodyRange?: SourceRange;
  fingerprint: string;
  syntacticallyComplete: boolean;
  complete: boolean;
}

export interface ParserSymbolCatalog {
  declarations: TypeDeclaration[];
  globalVariables: GlobalVariableDeclaration[];
  routines: RoutineDeclaration[];
}

export interface ParseOptions {
  resolveRoutineCalls?: boolean;
  incrementalRoutineResolution?: boolean;
  verifyIncrementalRoutineResolution?: boolean;
  onIncrementalVerification?: (matched: boolean) => void;
  reusableDeclarationRegions?: {
    source: string;
    parsed: ParsedDocument;
  };
  reusableRoutineRegions?: {
    source: string;
    routines: readonly RoutineDeclaration[];
  };
}

export interface SyntaxParseMetrics {
  lexicalStartedAt: number;
  lexicalFinishedAt: number;
  syntaxStartedAt: number;
  syntaxFinishedAt: number;
  reusedDeclarationCount: number;
  heapUsedBeforeBytes: number;
  rssBeforeBytes: number;
}

export interface ParsedDocumentSyntax {
  source: string;
  parserSource: string;
  declarations: TypeDeclaration[];
  globalVariables: GlobalVariableDeclaration[];
  routines: RoutineDeclaration[];
  commentRanges: SourceRange[];
  diagnostics: ParserDiagnostic[];
  regions: ParserRegion[];
  lexicallyComplete: boolean;
  syntaxDiagnostics: ParserDiagnostic[];
  metrics: SyntaxParseMetrics;
}

export type ParsedSyntaxRegion =
  | {
    kind: 'type';
    region: ParserRegion;
    declaration: TypeDeclaration;
  }
  | {
    kind: 'global-variable';
    region: ParserRegion;
    declaration: GlobalVariableDeclaration;
  }
  | {
    kind: 'routine';
    region: ParserRegion;
    declaration: RoutineDeclaration;
  };

export interface DeclarationRegionParseMetrics {
  kind: ParserRegion['kind'];
  sourceCodeUnits: number;
  lexicalMs: number;
  syntaxMs: number;
  totalMs: number;
}

export interface RoutineResolutionWorklistMetrics {
  routineCount: number;
  declarationCount: number;
  globalVariableCount: number;
  routineCandidates: number;
  statementsVisited: number;
  symbolSetupMs: number;
  routineParameterResolutionMs: number;
  computedFieldResolutionMs: number;
  routineCallResolutionMs: number;
  routineVariableValidationMs: number;
  totalMs: number;
}

export interface RoutineResolutionWorklistResult {
  routines: RoutineDeclaration[];
  diagnostics: ParserDiagnostic[];
}

export interface ParsePerformanceMetrics {
  phases: Array<{
    name: string;
    startTimeMs: number;
    endTimeMs: number;
    durationMs: number;
  }>;
  heapUsedBeforeBytes: number;
  heapUsedAfterBytes: number;
  rssBeforeBytes: number;
  rssAfterBytes: number;
  lexicalMs: number;
  syntaxMs: number;
  symbolCatalogMs: number;
  dependencyResolutionMs: number;
  typeResolutionMs: number;
  globalVariableResolutionMs: number;
  routineResolutionMs: number;
  routineParameterResolutionMs: number;
  computedFieldResolutionMs: number;
  routineCallResolutionMs: number;
  routineVariableValidationMs: number;
  routineStatementsVisited: number;
  routineNameMatchSearches: number;
  routineNameSpanChecks: number;
  routineNameCandidateChecks: number;
  routineNameCandidatesSkippedByQualifier: number;
  routineNameNormalizationCalls: number;
  routineNameNormalizationCacheHits: number;
  routineNameNormalizationCacheMisses: number;
  totalMs: number;
  sourceCodeUnits: number;
  tokenCount: number;
  declarations: number;
  globalVariables: number;
  routines: number;
  reusedDeclarationCount: number;
  reusedRoutineCount: number;
  symbols: number;
  routineResolutionStrategy?: 'complete' | 'worklist';
  routineVerificationStatus?: 'not-requested' | 'matched' | 'fallback';
  routineVerificationMs?: number;
}

interface RoutineResolutionProfileCounters {
  statementsVisited: number;
  nameMatchSearches: number;
  nameSpanChecks: number;
  nameCandidateChecks: number;
  nameCandidatesSkippedByQualifier: number;
  nameNormalizationCalls: number;
  nameNormalizationCacheHits: number;
  nameNormalizationCacheMisses: number;
}

let activeRoutineResolutionProfileCounters: RoutineResolutionProfileCounters | undefined;

export interface ParsedReferencesMetrics {
  durationMs: number;
  references: number;
  cacheHit: boolean;
}

export interface ParsedReference {
  kind: 'type' | 'routine' | 'variable' | 'field';
  name: string;
  range: SourceRange;
  symbolId?: string;
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
  'estão', 'estiver', 'estiverem', 'estamos', 'tem', 'tiver', 'há', 'houver',
  'começar', 'começa', 'terminar', 'termina', 'pode', 'puder', 'puderem',
  'contém', 'contiver', 'possuir', 'possui', 'cabe', 'couber', 'existe',
  'existir', 'ultrapassou', 'limitando-o'
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
const routineNameWordPattern = /\p{L}+/gu;
const articles = new Set([
  ...definiteArticles, ...indefiniteArticles
]);
const builtInStatementStarts = new Set([
  'atribua','diga', 'retorne', 'decodifique', 'preserve', 'empilhe', 'se',
  'processe', 'itere', 'pare', 'reitere',
  'aloque', 'aponte', 'direcione', 'redirecione'
]);
const reservedStatementKeywordDisplayNames = new Map<string, string>([
  ['retorne', 'Retorne'],
  ['diga', 'Diga'],
  ['preserve', 'Preserve'],
  ['empilhe', 'Empilhe'],
  ['processe', 'Processe'],
  ['itere', 'Itere'],
  ['pare', 'Pare'],
  ['reitere', 'Reitere'],
  ['aloque', 'Aloque'],
  ['aponte', 'Aponte'],
  ['direcione', 'Direcione'],
  ['redirecione', 'Redirecione']
]);
const routineNameDelimiters = new Set([
  'abaixo', 'acerca', 'acima', 'acordo', 'algum', 'ante', 'antes', 'aproximadamente',
  'após', 'através', 'até', 'cerca', 'com', 'começando', 'como', 'comprida', 'comprido',
  'dada', 'dado', 'dando', 'debaixo', 'dentre', 'dentro', 'depois', 'desde', 'durante',
  , 'em', 'enquanto', 'entre', 'então', 'menores', 'para', 'parde', 'parecida', 'parecido',
  'partindo', 'partir', 'perante', 'perto', 'por', 'próximo', 'qual', 'quanto', 'quão',
  'regressivamente', 'relativa', 'resultando', 'sem', 'semelhante', 'similar', 'sob',
  'sobre', 'somente', 'só', 'tal', 'tanto', 'tão', 'usando', 'versus', 'via', 'voltada',
  'voltado', 'contendo', 'embaixo', 'por', 'retornando', 'é', 'está',
  'estiver', 'for', 'forem', 'são', 'estão', 'estiverem', 'ser', 'serem', 'estar',
  'poder', 'puder', 'foi', 'estamos', 'há', 'pode', 'existe', 'existir', 'contém',
  'contiver', 'possui', 'possuir', 'dum', 'duma', 'duns', 'dumas',
  'limitando-o', 'igual', 'while', 'ultrapassou', 'usando',
  ...definiteArticles, ...conjunctions,
  ...routineContractions.keys(), ...routineWordReplacements.keys()
]);
const reservedIdentifierWords = new Set([
  ...routineNameDelimiters,
  ...conjunctions,
  'denominado', 'denominada', 'denominados', 'denominadas', 'chamado', 'chamada',
  'chamados', 'chamadas', 'para', 'se', 'determine'
]);

const normalizedTypeNameCache = new Map<string, string>();
const normalizedTypeNameCacheLimit = 4096;
const normalizedRoutineNameCache = new Map<string, string>();
const normalizedRoutineNameCacheLimit = 8192;

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
  const profileCounters = activeRoutineResolutionProfileCounters;
  if (profileCounters) {
    profileCounters.nameNormalizationCalls++;
  }
  const cached = normalizedRoutineNameCache.get(name);
  if (cached !== undefined) {
    if (profileCounters) {
      profileCounters.nameNormalizationCacheHits++;
    }
    return cached;
  }
  if (profileCounters) {
    profileCounters.nameNormalizationCacheMisses++;
  }

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
  normalized = normalized.trim().replace(/\s+/gu, ' ');
  if (name.length <= 256) {
    if (normalizedRoutineNameCache.size >= normalizedRoutineNameCacheLimit) {
      const oldest = normalizedRoutineNameCache.keys().next().value;
      if (oldest !== undefined) {
        normalizedRoutineNameCache.delete(oldest);
      }
    }
    normalizedRoutineNameCache.set(name, normalized);
  }
  return normalized;
}

function normalizeRoutineNameWords(name: string): string {
  const words = normalizeTypeName(name).split(' ').filter(Boolean);
  const expandedWords = words.flatMap(word =>
    (routineContractions.get(word) ?? word).split(' ')
  );
  for (let index = 0; index < expandedWords.length; index++) {
    const word = expandedWords[index];
    if (word === 'a' && articles.has(expandedWords[index + 1] ?? '')) {
      expandedWords[index] = 'para';
    } else {
      expandedWords[index] = routineWordReplacements.get(word) ?? word;
    }
  }
  for (let index = 1; index < expandedWords.length; index++) {
    if (expandedWords[index - 1] === 'igual' && expandedWords[index] === 'para') {
      expandedWords[index] = 'a';
    }
  }
  return expandedWords.join(' ');
}

function appendNormalizedRoutineWord(
  normalizedWords: string[],
  sourceWord: string
): void {
  const normalizedWord = normalizeTypeName(sourceWord);
  const expandedWords = (
    routineContractions.get(normalizedWord) ?? normalizedWord
  ).split(' ');
  for (const expandedWord of expandedWords) {
    const previousIndex = normalizedWords.length - 1;
    if (
      previousIndex >= 0 &&
      normalizedWords[previousIndex] === 'a' &&
      articles.has(expandedWord)
    ) {
      normalizedWords[previousIndex] = 'para';
      if (
        previousIndex > 0 &&
        normalizedWords[previousIndex - 1] === 'igual'
      ) {
        normalizedWords[previousIndex] = 'a';
      }
    }

    let word = routineWordReplacements.get(expandedWord) ?? expandedWord;
    if (
      previousIndex >= 0 &&
      normalizedWords[previousIndex] === 'igual' &&
      word === 'para'
    ) {
      word = 'a';
    }
    normalizedWords.push(word);
  }
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

export function parseTypeDeclarationSyntax(
  source: string,
  options: Pick<ParseOptions, 'reusableDeclarationRegions'> = {},
  profile = false
): ParsedDocumentSyntax {
  const diagnostics: ParserDiagnostic[] = [];
  const memoryBefore = profile ? process.memoryUsage() : undefined;
  const lexicalStartedAt = profile ? performance.now() : 0;
  const commentRanges: SourceRange[] = [];
  const maskedSource = maskComments(source, diagnostics, commentRanges);
  const parserSource = maskedSource.source;
  const lexicalFinishedAt = profile ? performance.now() : 0;
  const syntaxStartedAt = lexicalFinishedAt;
  const declarations: TypeDeclaration[] = [];
  const globalVariables: GlobalVariableDeclaration[] = [];
  const routines = parseRoutineDeclarations(parserSource, diagnostics);
  const reusableDeclarations = createReusableDeclarationIndex(
    options.reusableDeclarationRegions
  );
  let reusedDeclarationCount = 0;
  let segmentStart = 0;
  let periodIndex = findDeclarationPeriod(parserSource, segmentStart);

  while (periodIndex !== -1) {
    const declarationStart = findDeclarationStart(
      parserSource,
      segmentStart,
      periodIndex
    );
    const article = declarationStart === undefined
      ? undefined
      : readWord(parserSource, declarationStart, periodIndex);
    if (article && definiteArticles.has(article.value.toLocaleLowerCase('pt-BR'))) {
      const currentRange = {
        start: declarationStart!,
        end: periodIndex + 1
      };
      const reusable = takeReusableDeclaration<GlobalVariableDeclaration>(
        reusableDeclarations.globalVariables,
        'global-variable',
        source,
        currentRange
      );
      const variable = reusable
        ? rebaseParsedRegion(
          reusable.declaration,
          currentRange.start - reusable.region.range.start
        )
        : parseGlobalVariableDeclaration(
          parserSource,
          declarationStart!,
          periodIndex,
          diagnostics
        );
      if (variable) {
        globalVariables.push(variable);
        reusedDeclarationCount += Number(Boolean(reusable));
      }
    } else if (article) {
      const currentRange = {
        start: declarationStart!,
        end: periodIndex + 1
      };
      const reusable = takeReusableDeclaration<TypeDeclaration>(
        reusableDeclarations.types,
        'type',
        source,
        currentRange
      );
      const declaration = reusable
        ? rebaseParsedRegion(
          reusable.declaration,
          currentRange.start - reusable.region.range.start
        )
        : parseDeclaration(
          parserSource,
          declarationStart!,
          periodIndex,
          diagnostics
        );
      if (declaration) {
        declarations.push(declaration);
        reusedDeclarationCount += Number(Boolean(reusable));
      }
    }
    segmentStart = periodIndex + 1;
    periodIndex = findDeclarationPeriod(parserSource, segmentStart);
  }
  setRoutineBodyRanges(
    parserSource,
    routines,
    [...declarations, ...globalVariables].map(declaration => declaration.range)
  );
  const syntaxFinishedAt = profile ? performance.now() : 0;
  const syntaxDiagnostics = diagnostics.map(diagnostic => ({
    ...diagnostic,
    range: { ...diagnostic.range }
  }));
  const regions = createParserRegions(
    source,
    parserSource,
    declarations,
    globalVariables,
    routines,
    syntaxDiagnostics,
    maskedSource.complete,
    syntaxDiagnostics
  );

  return {
    source,
    parserSource,
    declarations,
    globalVariables,
    routines,
    commentRanges,
    diagnostics,
    regions,
    lexicallyComplete: maskedSource.complete,
    syntaxDiagnostics,
    metrics: {
      lexicalStartedAt,
      lexicalFinishedAt,
      syntaxStartedAt,
      syntaxFinishedAt,
      reusedDeclarationCount,
      heapUsedBeforeBytes: memoryBefore?.heapUsed ?? 0,
      rssBeforeBytes: memoryBefore?.rss ?? 0
    }
  };
}

export function parseTypeDeclarationRegion(
  source: string,
  region: ParserRegion,
  onProfile?: (metrics: DeclarationRegionParseMetrics) => void
): ParsedSyntaxRegion {
  const startedAt = onProfile ? performance.now() : 0;
  if (!region.syntacticallyComplete) {
    throw new Error('Cannot parse a syntactically incomplete declaration region.');
  }
  if (
    region.range.start < 0 ||
    region.range.end > source.length ||
    region.range.start >= region.range.end
  ) {
    throw new Error('Declaration region range is outside the source document.');
  }
  const regionSource = source.slice(region.range.start, region.range.end);
  if (
    fingerprintRegion(region.kind, region.name, regionSource) !==
    region.fingerprint
  ) {
    throw new Error('Declaration region fingerprint does not match the source.');
  }
  const syntax = parseTypeDeclarationSyntax(
    regionSource,
    {},
    Boolean(onProfile)
  );
  if (syntax.diagnostics.length > 0) {
    throw new Error('Declaration region produced syntax diagnostics.');
  }
  if (
    syntax.regions.length !== 1 ||
    !syntax.regions[0].syntacticallyComplete
  ) {
    throw new Error('Declaration region did not produce one complete syntax region.');
  }
  const reportProfile = (): void => {
    onProfile?.({
      kind: region.kind,
      sourceCodeUnits: regionSource.length,
      lexicalMs: syntax.metrics.lexicalFinishedAt -
        syntax.metrics.lexicalStartedAt,
      syntaxMs: syntax.metrics.syntaxFinishedAt -
        syntax.metrics.syntaxStartedAt,
      totalMs: performance.now() - startedAt
    });
  };

  if (region.kind === 'type') {
    if (syntax.declarations.length !== 1) {
      throw new Error('Declaration region did not parse as exactly one type.');
    }
    const declaration = rebaseParsedRegion(
      syntax.declarations[0],
      region.range.start
    );
    if (declaration.name.normalizedName !== region.name) {
      throw new Error('Parsed type name does not match its declaration region.');
    }
    reportProfile();
    return { kind: 'type', region, declaration };
  }
  if (region.kind === 'global-variable') {
    if (syntax.globalVariables.length !== 1) {
      throw new Error(
        'Declaration region did not parse as exactly one global variable.'
      );
    }
    const declaration = rebaseParsedRegion(
      syntax.globalVariables[0],
      region.range.start
    );
    if (declaration.name.normalizedName !== region.name) {
      throw new Error(
        'Parsed variable name does not match its declaration region.'
      );
    }
    reportProfile();
    return { kind: 'global-variable', region, declaration };
  }
  if (syntax.routines.length !== 1) {
    throw new Error('Declaration region did not parse as exactly one routine.');
  }
  const declaration = rebaseParsedRegion(
    syntax.routines[0],
    region.range.start,
    { from: 0, to: region.range.start }
  );
  if (declaration.name.normalizedName !== region.name) {
    throw new Error('Parsed routine name does not match its declaration region.');
  }
  reportProfile();
  return { kind: 'routine', region, declaration };
}

export function resolveRoutineSyntaxRegions(
  source: string,
  syntax: ParsedDocumentSyntax,
  regions: readonly ParserRegion[],
  workspaceSymbols?: ParserSymbolCatalog,
  onProfile?: (metrics: RoutineResolutionWorklistMetrics) => void
): RoutineResolutionWorklistResult {
  const startedAt = onProfile ? performance.now() : 0;
  if (syntax.source !== source) {
    throw new Error('Syntax snapshot does not match the source document.');
  }
  const syntaxRoutinesByRegion = new Map(
    syntax.regions
      .filter(region => region.kind === 'routine')
      .map(region => [
        `${region.range.start}:${region.range.end}:${region.fingerprint}`,
        region
      ])
  );
  const requestedRoutines: RoutineDeclaration[] = regions.map(region => {
    if (region.kind !== 'routine' || !region.syntacticallyComplete) {
      throw new Error(
        'Routine resolution worklists require syntactically complete routine regions.'
      );
    }
    const key = `${region.range.start}:${region.range.end}:${region.fingerprint}`;
    if (!syntaxRoutinesByRegion.has(key)) {
      throw new Error('Routine region does not belong to the syntax snapshot.');
    }
    const parsedRegion = parseTypeDeclarationRegion(source, region);
    if (parsedRegion.kind !== 'routine') {
      throw new Error('Routine region parser returned a non-routine declaration.');
    }
    return parsedRegion.declaration;
  });

  const localDeclarations = syntax.declarations.map(declaration =>
    rebaseParsedRegion(declaration, 0)
  );
  const localGlobalVariables = syntax.globalVariables.map(declaration =>
    rebaseParsedRegion(declaration, 0)
  );
  const workspaceDeclarations = (workspaceSymbols?.declarations ?? []).map(
    declaration => rebaseParsedRegion(declaration, 0)
  );
  const workspaceGlobalVariables = (
    workspaceSymbols?.globalVariables ?? []
  ).map(declaration => rebaseParsedRegion(declaration, 0));
  const workspaceRoutines = (workspaceSymbols?.routines ?? []).map(routine =>
    rebaseParsedRegion(routine, 0)
  );
  const symbols = new TypeSymbolTable([
    ...localDeclarations,
    ...workspaceDeclarations
  ]);
  resolveFields(
    syntax.parserSource,
    [...localDeclarations, ...localGlobalVariables],
    symbols,
    []
  );
  const globalVariables = [
    ...localGlobalVariables,
    ...workspaceGlobalVariables
  ];
  const requestedByRegion = new Map(
    regions.map((region, index) => [
      `${region.range.start}:${region.range.end}:${region.fingerprint}`,
      requestedRoutines[index]
    ])
  );
  const routineRegionsByRange = new Map(
    syntax.regions
      .filter(region => region.kind === 'routine')
      .map(region => [
        `${region.range.start}:${region.range.end}`,
        region
      ])
  );
  const routineCandidates = [
    ...syntax.routines.map(routine => {
      const region = routineRegionsByRange.get(
        `${routine.range.start}:${routine.bodyRange.end}`
      );
      const requested = region
        ? requestedByRegion.get(
          `${region.range.start}:${region.range.end}:${region.fingerprint}`
        )
        : undefined;
      return requested ?? rebaseParsedRegion(routine, 0);
    }),
    ...workspaceRoutines
  ];
  const symbolSetupMs = onProfile ? performance.now() - startedAt : 0;
  const profileCounters: RoutineResolutionProfileCounters | undefined =
    onProfile
      ? {
        statementsVisited: 0,
        nameMatchSearches: 0,
        nameSpanChecks: 0,
        nameCandidateChecks: 0,
        nameCandidatesSkippedByQualifier: 0,
        nameNormalizationCalls: 0,
        nameNormalizationCacheHits: 0,
        nameNormalizationCacheMisses: 0
      }
      : undefined;
  const previousCounters = activeRoutineResolutionProfileCounters;
  activeRoutineResolutionProfileCounters = profileCounters;
  const diagnostics: ParserDiagnostic[] = [];
  let routineParameterResolutionMs = 0;
  let computedFieldResolutionMs = 0;
  let routineCallResolutionMs = 0;
  let routineVariableValidationMs = 0;
  try {
    let phaseStartedAt = onProfile ? performance.now() : 0;
    const candidateDiagnostics: ParserDiagnostic[] = [];
    resolveRoutineParameters(
      source,
      routineCandidates,
      symbols,
      candidateDiagnostics
    );
    diagnostics.push(...candidateDiagnostics.filter(diagnostic =>
      regions.some(region =>
        diagnostic.range.start >= region.range.start &&
        diagnostic.range.end <= region.range.end
      )
    ));
    routineParameterResolutionMs = onProfile
      ? performance.now() - phaseStartedAt
      : 0;
    phaseStartedAt = onProfile ? performance.now() : 0;
    candidateDiagnostics.length = 0;
    resolveComputedFields(routineCandidates, symbols, candidateDiagnostics);
    diagnostics.push(...candidateDiagnostics.filter(diagnostic =>
      regions.some(region =>
        diagnostic.range.start >= region.range.start &&
        diagnostic.range.end <= region.range.end
      )
    ));
    computedFieldResolutionMs = onProfile
      ? performance.now() - phaseStartedAt
      : 0;
    phaseStartedAt = onProfile ? performance.now() : 0;
    resolveRoutineCalls(
      syntax.parserSource,
      requestedRoutines,
      globalVariables,
      symbols,
      diagnostics,
      routineCandidates
    );
    routineCallResolutionMs = onProfile
      ? performance.now() - phaseStartedAt
      : 0;
    phaseStartedAt = onProfile ? performance.now() : 0;
    validateRoutineVariableNames(requestedRoutines, diagnostics);
    routineVariableValidationMs = onProfile
      ? performance.now() - phaseStartedAt
      : 0;
  } finally {
    activeRoutineResolutionProfileCounters = previousCounters;
  }

  if (onProfile) {
    onProfile({
      routineCount: requestedRoutines.length,
      declarationCount: localDeclarations.length,
      globalVariableCount: globalVariables.length,
      routineCandidates: routineCandidates.length,
      statementsVisited: profileCounters?.statementsVisited ?? 0,
      symbolSetupMs,
      routineParameterResolutionMs,
      computedFieldResolutionMs,
      routineCallResolutionMs,
      routineVariableValidationMs,
      totalMs: performance.now() - startedAt
    });
  }
  return { routines: requestedRoutines, diagnostics };
}

export function parseTypeDeclarations(
  source: string,
  workspaceSymbols?: ParserSymbolCatalog,
  onProfile?: (metrics: ParsePerformanceMetrics) => void,
  options: ParseOptions = {}
): ParsedDocument {
  const syntax = parseTypeDeclarationSyntax(
    source,
    options,
    Boolean(onProfile)
  );
  return resolveTypeDeclarationSyntaxCore(
    source,
    syntax,
    workspaceSymbols,
    onProfile,
    options,
    false
  );
}

export function resolveTypeDeclarationSyntax(
  source: string,
  syntax: ParsedDocumentSyntax,
  workspaceSymbols?: ParserSymbolCatalog,
  onProfile?: (metrics: ParsePerformanceMetrics) => void,
  options: ParseOptions = {}
): ParsedDocument {
  return resolveTypeDeclarationSyntaxCore(
    source,
    syntax,
    workspaceSymbols,
    onProfile,
    options,
    true
  );
}

function resolveTypeDeclarationSyntaxCore(
  source: string,
  syntax: ParsedDocumentSyntax,
  workspaceSymbols: ParserSymbolCatalog | undefined,
  onProfile: ((metrics: ParsePerformanceMetrics) => void) | undefined,
  options: ParseOptions,
  preserveSyntax: boolean
): ParsedDocument {
  if (syntax.source !== source) {
    throw new Error('Syntax snapshot does not match the source document.');
  }
  const hasSyntaxProfile = syntax.metrics.heapUsedBeforeBytes > 0;
  const startedAt = onProfile
    ? hasSyntaxProfile
      ? syntax.metrics.lexicalStartedAt
      : performance.now()
    : 0;
  const memoryBefore = onProfile
    ? hasSyntaxProfile
      ? {
        heapUsed: syntax.metrics.heapUsedBeforeBytes,
        rss: syntax.metrics.rssBeforeBytes
      }
      : process.memoryUsage()
    : undefined;
  const routineProfileCounters = onProfile
    ? {
      statementsVisited: 0,
      nameMatchSearches: 0,
      nameSpanChecks: 0,
      nameCandidateChecks: 0,
      nameCandidatesSkippedByQualifier: 0,
      nameNormalizationCalls: 0,
      nameNormalizationCacheHits: 0,
      nameNormalizationCacheMisses: 0
    }
    : undefined;
  activeRoutineResolutionProfileCounters = routineProfileCounters;
  const {
    parserSource,
    commentRanges,
    lexicallyComplete,
    metrics: {
      lexicalStartedAt,
      lexicalFinishedAt,
      syntaxStartedAt,
      syntaxFinishedAt,
      reusedDeclarationCount
    }
  } = syntax;
  const declarations = preserveSyntax
    ? syntax.declarations.map(declaration => rebaseParsedRegion(declaration, 0))
    : syntax.declarations;
  const globalVariables = preserveSyntax
    ? syntax.globalVariables.map(declaration =>
      rebaseParsedRegion(declaration, 0)
    )
    : syntax.globalVariables;
  const routines = preserveSyntax
    ? syntax.routines.map(routine => rebaseParsedRegion(routine, 0))
    : syntax.routines;
  const diagnostics = preserveSyntax
    ? syntax.diagnostics.map(diagnostic => ({
      ...diagnostic,
      range: { ...diagnostic.range }
    }))
    : syntax.diagnostics;
  let dependencyResolutionMs = 0;
  let dependencyResolutionStartedAt = 0;
  let dependencyResolutionFinishedAt = 0;
  const catalogStartedAt = syntaxFinishedAt;
  const symbols = new TypeSymbolTable([
    ...declarations,
    ...(workspaceSymbols?.declarations ?? [])
  ], onProfile
    ? (durationMs, startTimeMs, endTimeMs) => {
      dependencyResolutionMs += durationMs;
      dependencyResolutionStartedAt = startTimeMs;
      dependencyResolutionFinishedAt = endTimeMs;
    }
    : undefined);
  const globalVariableSymbols = new GlobalVariableSymbolTable([
    ...globalVariables,
    ...(workspaceSymbols?.globalVariables ?? [])
  ]);
  const reusedRoutines = reuseRoutineRegions(
    source,
    routines,
    options.reusableRoutineRegions
  );
  const routinesToResolve = routines.filter(routine =>
    !reusedRoutines.has(routine)
  );
  const routineSymbols = new RoutineSymbolTable(routines);
  const catalogFinishedAt = onProfile ? performance.now() : 0;
  const catalogBuildMs = catalogFinishedAt - catalogStartedAt;
  const typeResolutionStartedAt = catalogFinishedAt;
  validateBaseTypes(declarations, symbols, diagnostics);
  resolveFields(parserSource, [...declarations, ...globalVariables], symbols, diagnostics);
  const typeResolutionFinishedAt = onProfile ? performance.now() : 0;
  const globalVariableResolutionStartedAt = typeResolutionFinishedAt;
  validateGlobalVariableTypes(globalVariables, symbols, diagnostics);
  const globalVariableResolutionFinishedAt = onProfile ? performance.now() : 0;
  validateReservedNames(parserSource, declarations, globalVariables, diagnostics);
  validateIdentifierPunctuation(
    parserSource,
    [...declarations, ...globalVariables].map(declaration => declaration.name),
    diagnostics
  );
  const routineResolutionStartedAt = onProfile ? performance.now() : 0;
  const routineParameterResolutionStartedAt = routineResolutionStartedAt;
  resolveRoutineParameters(
    parserSource,
    routinesToResolve,
    symbols,
    diagnostics
  );
  const routineParameterResolutionFinishedAt = onProfile
    ? performance.now()
    : 0;
  const routineParameterResolutionMs = onProfile
    ? routineParameterResolutionFinishedAt - routineParameterResolutionStartedAt
    : 0;
  const computedFieldResolutionStartedAt = onProfile ? performance.now() : 0;
  resolveComputedFields(routinesToResolve, symbols, diagnostics);
  const computedFieldResolutionFinishedAt = onProfile
    ? performance.now()
    : 0;
  const computedFieldResolutionMs = onProfile
    ? computedFieldResolutionFinishedAt - computedFieldResolutionStartedAt
    : 0;
  const routineCallResolutionStartedAt = onProfile ? performance.now() : 0;
  if (options.resolveRoutineCalls !== false) {
    resolveRoutineCalls(
      parserSource,
      routinesToResolve,
      globalVariableSymbols.entries.map(symbol => symbol.declaration),
      symbols,
      diagnostics,
      [...routines, ...(workspaceSymbols?.routines ?? [])]
    );
  }
  const routineCallResolutionFinishedAt = onProfile ? performance.now() : 0;
  const routineCallResolutionMs = onProfile
    ? routineCallResolutionFinishedAt - routineCallResolutionStartedAt
    : 0;
  const routineVariableValidationStartedAt = onProfile
    ? performance.now()
    : 0;
  validateRoutineVariableNames(routinesToResolve, diagnostics);
  const routineVariableValidationFinishedAt = onProfile
    ? performance.now()
    : 0;
  const routineVariableValidationMs = onProfile
    ? routineVariableValidationFinishedAt - routineVariableValidationStartedAt
    : 0;
  const routineResolutionFinishedAt = onProfile ? performance.now() : 0;
  const parsedDocument: ParsedDocument = {
    declarations,
    globalVariables,
    routines,
    regions: createParserRegions(
      source,
      parserSource,
      declarations,
      globalVariables,
      routines,
      diagnostics,
      lexicallyComplete,
      syntax.syntaxDiagnostics
    ),
    commentRanges,
    symbols,
    globalVariableSymbols,
    routineSymbols,
    diagnostics
  };
  let routineVerificationStatus: ParsePerformanceMetrics[
    'routineVerificationStatus'
  ] = 'not-requested';
  let routineVerificationStartedAt = 0;
  let routineVerificationMs = 0;
  let verificationFallback: ParsedDocument | undefined;
  if (
    options.incrementalRoutineResolution &&
    options.verifyIncrementalRoutineResolution &&
    reusedRoutines.size > 0
  ) {
    routineVerificationStartedAt = performance.now();
    const completeParse = parseTypeDeclarations(
      source,
      workspaceSymbols,
      undefined,
      {
        ...options,
        incrementalRoutineResolution: false,
        verifyIncrementalRoutineResolution: false,
        onIncrementalVerification: undefined,
        reusableRoutineRegions: undefined
      }
    );
    const getSnapshot = (parsed: ParsedDocument) => ({
      declarations: parsed.declarations,
      globalVariables: parsed.globalVariables,
      routines: parsed.routines,
      references: getParsedReferences(parsed),
      diagnostics: parsed.diagnostics
    });
    const matched = isDeepStrictEqual(
      getSnapshot(parsedDocument),
      getSnapshot(completeParse)
    );
    routineVerificationStatus = matched ? 'matched' : 'fallback';
    routineVerificationMs = performance.now() - routineVerificationStartedAt;
    options.onIncrementalVerification?.(matched);
    if (!matched) {
      verificationFallback = completeParse;
    }
  }
  if (onProfile) {
    const tokenCountingStartedAt = performance.now();
    const tokenPattern = /[\p{L}\p{N}_]+|[^\s]/gu;
    let tokenCount = 0;
    while (tokenPattern.exec(parserSource)) {
      tokenCount++;
    }
    const finishedAt = performance.now();
    const memoryAfter = process.memoryUsage();
    onProfile({
      phases: [
        {
          name: 'comment-masking',
          startTimeMs: lexicalStartedAt,
          endTimeMs: lexicalFinishedAt,
          durationMs: lexicalFinishedAt - lexicalStartedAt
        },
        {
          name: 'syntax-parsing',
          startTimeMs: syntaxStartedAt,
          endTimeMs: syntaxFinishedAt,
          durationMs: syntaxFinishedAt - syntaxStartedAt
        },
        {
          name: 'symbol-catalog',
          startTimeMs: catalogStartedAt,
          endTimeMs: catalogFinishedAt,
          durationMs: catalogFinishedAt - catalogStartedAt
        },
        ...(dependencyResolutionFinishedAt > dependencyResolutionStartedAt
          ? [{
            name: 'type-dependency-resolution',
            startTimeMs: dependencyResolutionStartedAt,
            endTimeMs: dependencyResolutionFinishedAt,
            durationMs: dependencyResolutionMs
          }]
          : []),
        {
          name: 'type-resolution',
          startTimeMs: typeResolutionStartedAt,
          endTimeMs: typeResolutionFinishedAt,
          durationMs: typeResolutionFinishedAt - typeResolutionStartedAt
        },
        {
          name: 'global-variable-resolution',
          startTimeMs: globalVariableResolutionStartedAt,
          endTimeMs: globalVariableResolutionFinishedAt,
          durationMs:
            globalVariableResolutionFinishedAt -
            globalVariableResolutionStartedAt
        },
        {
          name: 'declaration-validation',
          startTimeMs: globalVariableResolutionFinishedAt,
          endTimeMs: routineResolutionStartedAt,
          durationMs: routineResolutionStartedAt -
            globalVariableResolutionFinishedAt
        },
        {
          name: 'routine-parameter-resolution',
          startTimeMs: routineParameterResolutionStartedAt,
          endTimeMs: routineParameterResolutionFinishedAt,
          durationMs: routineParameterResolutionMs
        },
        {
          name: 'computed-field-resolution',
          startTimeMs: computedFieldResolutionStartedAt,
          endTimeMs: computedFieldResolutionFinishedAt,
          durationMs: computedFieldResolutionMs
        },
        {
          name: 'routine-call-resolution',
          startTimeMs: routineCallResolutionStartedAt,
          endTimeMs: routineCallResolutionFinishedAt,
          durationMs: routineCallResolutionMs
        },
        {
          name: 'routine-variable-validation',
          startTimeMs: routineVariableValidationStartedAt,
          endTimeMs: routineVariableValidationFinishedAt,
          durationMs: routineVariableValidationMs
        },
        {
          name: 'routine-resolution',
          startTimeMs: routineResolutionStartedAt,
          endTimeMs: routineResolutionFinishedAt,
          durationMs: routineResolutionFinishedAt - routineResolutionStartedAt
        },
        ...(routineVerificationMs > 0
          ? [{
            name: 'incremental-verification',
            startTimeMs: routineVerificationStartedAt,
            endTimeMs: routineVerificationStartedAt + routineVerificationMs,
            durationMs: routineVerificationMs
          }]
          : []),
        {
          name: 'profile-token-count',
          startTimeMs: tokenCountingStartedAt,
          endTimeMs: finishedAt,
          durationMs: finishedAt - tokenCountingStartedAt
        },
        {
          name: 'parse-total',
          startTimeMs: startedAt,
          endTimeMs: finishedAt,
          durationMs: finishedAt - startedAt
        }
      ],
      heapUsedBeforeBytes: memoryBefore?.heapUsed ?? 0,
      heapUsedAfterBytes: memoryAfter.heapUsed,
      rssBeforeBytes: memoryBefore?.rss ?? 0,
      rssAfterBytes: memoryAfter.rss,
      lexicalMs: lexicalFinishedAt - lexicalStartedAt,
      syntaxMs: syntaxFinishedAt - syntaxStartedAt,
      symbolCatalogMs: Math.max(0, catalogBuildMs - dependencyResolutionMs),
      dependencyResolutionMs,
      typeResolutionMs: typeResolutionFinishedAt - typeResolutionStartedAt,
      globalVariableResolutionMs:
        globalVariableResolutionFinishedAt - globalVariableResolutionStartedAt,
      routineResolutionMs:
        routineResolutionFinishedAt - routineResolutionStartedAt,
      routineParameterResolutionMs,
      computedFieldResolutionMs,
      routineCallResolutionMs,
      routineVariableValidationMs,
      routineStatementsVisited: routineProfileCounters?.statementsVisited ?? 0,
      routineNameMatchSearches: routineProfileCounters?.nameMatchSearches ?? 0,
      routineNameSpanChecks: routineProfileCounters?.nameSpanChecks ?? 0,
      routineNameCandidateChecks:
        routineProfileCounters?.nameCandidateChecks ?? 0,
      routineNameCandidatesSkippedByQualifier:
        routineProfileCounters?.nameCandidatesSkippedByQualifier ?? 0,
      routineNameNormalizationCalls:
        routineProfileCounters?.nameNormalizationCalls ?? 0,
      routineNameNormalizationCacheHits:
        routineProfileCounters?.nameNormalizationCacheHits ?? 0,
      routineNameNormalizationCacheMisses:
        routineProfileCounters?.nameNormalizationCacheMisses ?? 0,
      totalMs: finishedAt - startedAt,
      sourceCodeUnits: source.length,
      tokenCount,
      declarations: declarations.length,
      globalVariables: globalVariables.length,
      routines: routines.length,
      reusedDeclarationCount,
      reusedRoutineCount: reusedRoutines.size,
      symbols: symbols.entries.length +
        globalVariableSymbols.entries.length +
        routineSymbols.entries.length,
      routineResolutionStrategy: reusedRoutines.size > 0
        ? 'worklist'
        : 'complete',
      routineVerificationStatus,
      routineVerificationMs
    });
  }
  activeRoutineResolutionProfileCounters = undefined;

  return verificationFallback ?? parsedDocument;
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
    while (
      lineStart < end &&
      source[lineStart] !== '\n' &&
      source[lineStart] !== '\r'
    ) {
      lineStart++;
    }
    if (lineStart >= end) {
      break;
    }
    if (
      source[lineStart] === '\r' &&
      lineStart + 1 < end &&
      source[lineStart + 1] === '\n'
    ) {
      lineStart += 2;
    } else {
      lineStart++;
    }
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

function getRoutineRegionKey(routine: RoutineDeclaration): string {
  return routine.bindingId ?? JSON.stringify([
    routine.name.normalizedName,
    routine.qualifier,
    routine.parameters.map(parameter => parameter.type.normalizedName)
  ]);
}

function routineHasResolvedFieldTargets(routine: RoutineDeclaration): boolean {
  return [
    ...routine.assignments.flatMap(assignment =>
      assignment.fieldAccesses ?? []
    ),
    ...routine.outputs.flatMap(output => output.fieldAccesses ?? []),
    ...routine.calls.flatMap(call => call.fieldAccesses ?? []),
    ...routine.processes.flatMap(process => process.fieldAccesses),
    ...routine.memoryDeallocations.flatMap(
      deallocation => deallocation.fieldAccesses ?? []
    )
  ].length > 0;
}

function reuseRoutineRegions(
  source: string,
  routines: RoutineDeclaration[],
  previous: ParseOptions['reusableRoutineRegions']
): Set<RoutineDeclaration> {
  const reused = new Set<RoutineDeclaration>();
  if (!previous) {
    return reused;
  }
  const previousByRegion = new Map<string, RoutineDeclaration[]>();
  const currentByIdentity = new Map<string, RoutineDeclaration[]>();
  const oldToCurrent = new Map<object, object>();
  const getRegionText = (
    regionSource: string,
    routine: RoutineDeclaration
  ): string => regionSource.slice(
    routine.range.start,
    routine.bodyRange.end
  ).trimEnd();
  for (const routine of previous.routines) {
    const key = `${getRoutineRegionKey(routine)}\n${getRegionText(
      previous.source,
      routine
    )}`;
    const candidates = previousByRegion.get(key) ?? [];
    candidates.push(routine);
    previousByRegion.set(key, candidates);
  }
  for (const routine of routines) {
    const identity = getRoutineRegionKey(routine);
    const candidates = currentByIdentity.get(identity) ?? [];
    candidates.push(routine);
    currentByIdentity.set(identity, candidates);
  }
  for (const oldRoutine of previous.routines) {
    const candidates = currentByIdentity.get(
      getRoutineRegionKey(oldRoutine)
    );
    const currentRoutine = candidates?.shift();
    if (currentRoutine) {
      oldToCurrent.set(oldRoutine, currentRoutine);
    }
  }
  for (let index = 0; index < routines.length; index++) {
    const current = routines[index];
    const key = `${getRoutineRegionKey(current)}\n${getRegionText(
      source,
      current
    )}`;
    const previousRoutine = previousByRegion.get(key)?.shift();
    if (
      !previousRoutine ||
      routineHasResolvedFieldTargets(previousRoutine) ||
      !oldToCurrent.has(previousRoutine)
    ) {
      continue;
    }
    const delta = current.range.start - previousRoutine.range.start;
    const clone = <T>(value: T, visited = new Map<object, unknown>()): T => {
      if (value === null || typeof value !== 'object') {
        return value;
      }
      const routineTarget = oldToCurrent.get(value);
      if (routineTarget && !Object.is(value, previousRoutine)) {
        return routineTarget as T;
      }
      const existing = visited.get(value);
      if (existing) {
        return existing as T;
      }
      if (Array.isArray(value)) {
        const cloned: unknown[] = [];
        visited.set(value, cloned);
        for (const item of value) {
          cloned.push(clone(item, visited));
        }
        return cloned as T;
      }
      const sourceObject = value as Record<string, unknown>;
      const cloned: Record<string, unknown> = {};
      visited.set(value, cloned);
      for (const [property, child] of Object.entries(sourceObject)) {
        if (
          (property === 'start' || property === 'end') &&
          typeof child === 'number' &&
          typeof sourceObject.start === 'number' &&
          typeof sourceObject.end === 'number'
        ) {
          cloned[property] = child + delta;
        } else if (
          property === 'scope' &&
          child === previousRoutine.range.start
        ) {
          cloned[property] = current.range.start;
        } else {
          cloned[property] = clone(child, visited);
        }
      }
      return cloned as T;
    };
    const rebased = clone(previousRoutine);
    Object.assign(current, rebased, {
      range: { ...current.range },
      bodyRange: { ...current.bodyRange }
    });
    reused.add(current);
  }
  return reused;
}

function createParserRegions(
  source: string,
  parserSource: string,
  declarations: readonly TypeDeclaration[],
  globalVariables: readonly GlobalVariableDeclaration[],
  routines: readonly RoutineDeclaration[],
  diagnostics: readonly ParserDiagnostic[],
  lexicallyComplete: boolean,
  syntaxDiagnostics: readonly ParserDiagnostic[] = diagnostics
): ParserRegion[] {
  const regions: Omit<
    ParserRegion,
    'fingerprint' | 'syntacticallyComplete' | 'complete'
  >[] = [
    ...declarations.map(declaration => ({
      kind: 'type' as const,
      name: declaration.name.normalizedName,
      range: { ...declaration.range }
    })),
    ...globalVariables.map(declaration => ({
      kind: 'global-variable' as const,
      name: declaration.name.normalizedName,
      range: { ...declaration.range }
    })),
    ...routines.map(routine => ({
      kind: 'routine' as const,
      name: routine.name.normalizedName,
      range: {
        start: routine.range.start,
        end: routine.bodyRange.end
      },
      headerRange: {
        start: routine.range.start,
        end: routine.bodyRange.start
      },
      bodyRange: { ...routine.bodyRange }
    }))
  ];
  regions.sort((first, second) =>
    first.range.start - second.range.start ||
    first.range.end - second.range.end
  );
  const sortedDiagnostics = [...diagnostics].sort((first, second) =>
    first.range.start - second.range.start ||
    first.range.end - second.range.end
  );
  const sortedSyntaxDiagnostics = [...syntaxDiagnostics].sort((first, second) =>
    first.range.start - second.range.start ||
    first.range.end - second.range.end
  );
  let diagnosticIndex = 0;
  let syntaxDiagnosticIndex = 0;
  return regions.map(region => {
    while (
      diagnosticIndex < sortedDiagnostics.length &&
      sortedDiagnostics[diagnosticIndex].range.end <= region.range.start
    ) {
      diagnosticIndex++;
    }
    const hasDiagnostic = diagnosticIndex < sortedDiagnostics.length &&
      sortedDiagnostics[diagnosticIndex].range.start < region.range.end;
    while (
      syntaxDiagnosticIndex < sortedSyntaxDiagnostics.length &&
      sortedSyntaxDiagnostics[syntaxDiagnosticIndex].range.end <=
        region.range.start
    ) {
      syntaxDiagnosticIndex++;
    }
    const hasSyntaxDiagnostic =
      syntaxDiagnosticIndex < sortedSyntaxDiagnostics.length &&
      sortedSyntaxDiagnostics[syntaxDiagnosticIndex].range.start <
        region.range.end;
    const text = source.slice(region.range.start, region.range.end);
    const hasCompleteTerminatedBody = region.kind !== 'routine' ||
      hasCompleteRoutineBody(parserSource, region.bodyRange!);
    const syntacticallyComplete = lexicallyComplete &&
      !hasSyntaxDiagnostic &&
      hasCompleteTerminatedBody;
    return {
      ...region,
      fingerprint: fingerprintRegion(region.kind, region.name, text),
      syntacticallyComplete,
      complete: syntacticallyComplete && !hasDiagnostic
    };
  });
}

interface ReusableDeclaration<T> {
  region: ParserRegion;
  declaration: T;
  source: string;
}

function createReusableDeclarationIndex(
  previous: ParseOptions['reusableDeclarationRegions']
): {
  types: Map<string, ReusableDeclaration<TypeDeclaration>[]>;
  globalVariables: Map<
    string,
    ReusableDeclaration<GlobalVariableDeclaration>[]
  >;
} {
  const types = new Map<string, ReusableDeclaration<TypeDeclaration>[]>();
  const globalVariables = new Map<
    string,
    ReusableDeclaration<GlobalVariableDeclaration>[]
  >();
  if (!previous) {
    return { types, globalVariables };
  }

  const declarationsByRange = new Map<string, TypeDeclaration>();
  for (const declaration of previous.parsed.declarations) {
    declarationsByRange.set(
      `${declaration.range.start}:${declaration.range.end}`,
      declaration
    );
  }
  const variablesByRange = new Map<string, GlobalVariableDeclaration>();
  for (const declaration of previous.parsed.globalVariables) {
    variablesByRange.set(
      `${declaration.range.start}:${declaration.range.end}`,
      declaration
    );
  }

  for (const region of previous.parsed.regions) {
    if (!region.complete || region.kind === 'routine') {
      continue;
    }
    const key = fingerprintRegion(
      region.kind,
      '',
      previous.source.slice(region.range.start, region.range.end)
    );
    if (region.kind === 'type') {
      const declaration = declarationsByRange.get(
        `${region.range.start}:${region.range.end}`
      );
      if (declaration) {
        const candidates = types.get(key) ?? [];
        candidates.push({ region, declaration, source: previous.source });
        types.set(key, candidates);
      }
    } else {
      const declaration = variablesByRange.get(
        `${region.range.start}:${region.range.end}`
      );
      if (declaration) {
        const candidates = globalVariables.get(key) ?? [];
        candidates.push({ region, declaration, source: previous.source });
        globalVariables.set(key, candidates);
      }
    }
  }
  return { types, globalVariables };
}

function takeReusableDeclaration<T>(
  candidatesByFingerprint: Map<string, ReusableDeclaration<T>[]>,
  kind: ParserRegion['kind'],
  source: string,
  range: SourceRange
): ReusableDeclaration<T> | undefined {
  const text = source.slice(range.start, range.end);
  const key = fingerprintRegion(kind, '', text);
  const candidates = candidatesByFingerprint.get(key);
  while (candidates?.length) {
    const candidate = candidates.shift()!;
    if (
      candidate.region.kind === kind &&
      candidate.region.complete &&
      candidate.region.fingerprint.length > 0 &&
      candidate.source.slice(
        candidate.region.range.start,
        candidate.region.range.end
      ) === text
    ) {
      return candidate;
    }
  }
  return undefined;
}

function rebaseParsedRegion<T>(
  value: T,
  delta: number,
  scopeRebase?: { from: number; to: number }
): T {
  const clone = (current: unknown, visited: Map<object, unknown>): unknown => {
    if (current === null || typeof current !== 'object') {
      return current;
    }
    const existing = visited.get(current);
    if (existing) {
      return existing;
    }
    if (Array.isArray(current)) {
      const result: unknown[] = [];
      visited.set(current, result);
      for (const item of current) {
        result.push(clone(item, visited));
      }
      return result;
    }
    const sourceObject = current as Record<string, unknown>;
    const result: Record<string, unknown> = {};
    visited.set(current, result);
    for (const [property, child] of Object.entries(sourceObject)) {
      if (
        (property === 'start' || property === 'end') &&
        typeof child === 'number' &&
        typeof sourceObject.start === 'number' &&
        typeof sourceObject.end === 'number'
      ) {
        result[property] = child + delta;
      } else if (
        property === 'scope' &&
        scopeRebase &&
        child === scopeRebase.from
      ) {
        result[property] = scopeRebase.to;
      } else {
        result[property] = clone(child, visited);
      }
    }
    return result;
  };
  return clone(value, new Map()) as T;
}

function fingerprintRegion(kind: string, name: string, source: string): string {
  let hash = 2166136261;
  for (let index = 0; index < source.length; index++) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `${kind}:${name}:${source.length}:${(hash >>> 0).toString(16)}`;
}

function hasCompleteRoutineBody(
  source: string,
  bodyRange: SourceRange
): boolean {
  let segmentStart = bodyRange.start;
  let periodIndex = findDeclarationPeriod(source, segmentStart);
  if (periodIndex === -1 || periodIndex >= bodyRange.end) {
    return false;
  }
  while (periodIndex !== -1 && periodIndex < bodyRange.end) {
    segmentStart = periodIndex + 1;
    periodIndex = findDeclarationPeriod(source, segmentStart);
  }
  return trimRange(source, segmentStart, bodyRange.end).start === bodyRange.end;
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
        if (activeRoutineResolutionProfileCounters) {
          activeRoutineResolutionProfileCounters.statementsVisited++;
        }
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
          routine.statements.push(...conditional.block.statements);
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
          routine.statements.push(statementRange);
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
    const seenLocalRanges = new Set<string>();
    routine.localVariables = routine.localVariables.filter(variable => {
      const key = `${variable.name.range.start}:${variable.name.range.end}`;
      if (seenLocalRanges.has(key)) {
        return false;
      }
      seenLocalRanges.add(key);
      return true;
    });
    if (
      routine.isBooleanFunction &&
      !hasValidBooleanReturn &&
      !hasDecodeInstruction
    ) {
      diagnostics.push({
        message: 'Boolean functions should contain a valid "Diga sim" or "Diga não" statement.',
        range: routine.name.range
      });
    }
    routine.loopBlocks = buildRoutineLoopBlocks(routine);
  }
}

function buildRoutineLoopBlocks(
  routine: RoutineDeclaration
): RoutineLoopBlock[] {
  const instructions = [...routine.loopInstructions].sort(
    (first, second) => first.range.start - second.range.start
  );
  const explicitStarts = instructions.filter(
    instruction => instruction.kind === 'iterate'
  );
  const pending: RoutineLoopInstruction[] = [];
  const blocks: RoutineLoopBlock[] = [];
  for (const instruction of instructions) {
    if (instruction.kind === 'iterate') {
      pending.push(instruction);
      continue;
    }
    if (
      instruction.kind !== 'repeat' ||
      routine.conditionals.some(conditional =>
        instruction.range.start >= conditional.bodyRange.start &&
        instruction.range.end <= conditional.bodyRange.end
      )
    ) {
      continue;
    }
    const startInstruction = pending.pop();
    if (!startInstruction) {
      continue;
    }
    const bodyRange = {
      start: startInstruction.range.end,
      end: instruction.range.start
    };
    blocks.push({
      kind: 'explicit',
      range: {
        start: startInstruction.range.start,
        end: instruction.range.end
      },
      bodyRange,
      startInstruction,
      endInstruction: instruction,
      complete: true
    });
  }

  for (const startInstruction of pending) {
    const bodyRange = {
      start: startInstruction.range.end,
      end: routine.bodyRange.end
    };
    blocks.push({
      kind: 'explicit',
      range: {
        start: startInstruction.range.start,
        end: routine.bodyRange.end
      },
      bodyRange,
      startInstruction,
      complete: false
    });
  }

  if (
    explicitStarts.length === 0 &&
    instructions.some(instruction => instruction.kind === 'repeat')
  ) {
    blocks.push({
      kind: 'implicit',
      range: { ...routine.bodyRange },
      bodyRange: { ...routine.bodyRange },
      complete: true
    });
  }
  return blocks.sort((first, second) =>
    first.range.start - second.range.start ||
    second.range.end - first.range.end
  );
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
      ...routine.calls.flatMap(call => call.localVariables ?? []),
      ...routine.processes.flatMap(process =>
        process.returnVariable && !process.returnVariableIsReference
          ? [process.returnVariable]
          : []
      )
    ];
    const names = new Map<string, RoutineParameter | RoutineLocalVariable>();
    const seenRanges = new Set<string>();
    for (const declaration of declarations) {
      const { name } = declaration;
      const rangeKey = `${name.range.start}:${name.range.end}`;
      if (seenRanges.has(rangeKey)) {
        continue;
      }
      seenRanges.add(rangeKey);

      const previousDeclaration = names.get(name.normalizedName);
      if (
        previousDeclaration &&
        'implicit' in previousDeclaration &&
        previousDeclaration.implicit &&
        'implicit' in declaration &&
        declaration.implicit &&
        previousDeclaration.type.normalizedName === declaration.type.normalizedName
      ) {
        continue;
      }
      if (previousDeclaration) {
        diagnostics.push({
          message: `Local variable "${name.name}" is already declared in this routine.`,
          range: name.range
        });
      } else {
        names.set(name.normalizedName, declaration);
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
  const statementDiagnosticStart = diagnostics.length;
  const statementKeyword = readWord(source, statement.start, statement.end);
  for (const localVariable of parseRoutineStatementLocalVariables(
    source,
    statement,
    symbols
  )) {
    caller.localVariables.push(localVariable);
  }
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
  const statementKind = statementKeyword?.value.toLocaleLowerCase('pt-BR');
  if (statementKind === 'diga' || statementKind === 'retorne') {
    caller.returnStatements.push({
      kind: statementKind === 'diga' ? 'boolean-return' : 'return',
      range: statement
    });
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
      variableAccesses,
      false,
      diagnostics
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
  const decodeInstruction = parseDecodeStatement(source, statement, diagnostics);
  if (decodeInstruction) {
    caller.simpleInstructions.push(decodeInstruction);
    return false;
  }
  const pushInstruction = parsePushStatement(
    source,
    statement,
    caller,
    routines,
    globalVariables,
    symbols,
    diagnostics
  );
  if (pushInstruction) {
    caller.simpleInstructions.push(pushInstruction);
    return false;
  }
  const firstWord = readWord(source, statement.start, statement.end);
  if (validateMemoryAllocationStatement(
    source,
    statement,
    caller,
    globalVariables,
    symbols,
    diagnostics
  )) {
    return false;
  }
  if (validateRoutineAddressStatement(
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
  const routineNameMatches: { matches: RoutineNameMatch[] } = {
    matches: []
  };
  const call = resolveRoutineCall(
    source,
    statement,
    routines,
    caller,
    globalVariables,
    symbols,
    diagnostics,
    routineNameMatches
  );
  if (call) {
    caller.calls.push(call);
    if (call.localVariables) {
      caller.localVariables.push(...call.localVariables);
    }
  } else {
    for (
      let index = statementDiagnosticStart;
      index < diagnostics.length;
      index++
    ) {
      const diagnostic = diagnostics[index];
      if (
        diagnostic.message.startsWith('Ambiguous structure field access') &&
        diagnostic.range.start >= statement.start &&
        diagnostic.range.end <= statement.end
      ) {
        return false;
      }
    }
    if (validateMemoryDeallocationStatement(
      source,
      statement,
      caller,
      routines,
      globalVariables,
      symbols
    )) {
      return false;
    }
    diagnoseUnresolvedRoutineCall(
      source,
      statement,
      caller,
      globalVariables,
      symbols,
      diagnostics,
      routineNameMatches.matches
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
    symbols,
    diagnostics
  );
  if (condition && 'diagnostic' in condition) {
    diagnostics.push(condition.diagnostic);
  } else if (!condition) {
    const hasAmbiguousFieldAccess = diagnostics.some(diagnostic =>
      diagnostic.message.startsWith('Ambiguous structure field access') &&
      diagnostic.range.start >= conditionRange.start &&
      diagnostic.range.end <= conditionRange.end
    );
    if (!hasAmbiguousFieldAccess) {
      diagnostics.push({
        message: `No boolean function found for condition "${source.slice(conditionRange.start, conditionRange.end)}".`,
        range: conditionRange
      });
    }
  } else {
    caller.calls.push(condition.call);
  }

  const resolvedCondition = condition && 'call' in condition
    ? condition
    : undefined;
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
      conditionArguments: resolvedCondition?.call.arguments ?? [],
      target: resolvedCondition?.call.target,
      predicateCall: resolvedCondition?.call,
      bodyRange,
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
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[]
): { call: RoutineCall; distance: number } | { diagnostic: ParserDiagnostic } | undefined {
  const conditionSource = replaceWordInRange(
    maskWordInRange(source, condition, 'não'),
    condition,
    'nada',
    'algo'
  );
  const conditionName = normalizeRoutineName(
    conditionSource.slice(condition.start, condition.end)
  );
  const routineNameIndex = getRoutineNameIndex(routines);
  const exact = routineNameIndex.byNormalizedName.get(conditionName)?.find(
    candidate =>
      candidate.routine.isBooleanFunction &&
      candidate.parameters.length === 0
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
  const outOfRangeIntegerMatches: {
    range: SourceRange;
    order: number;
    nameStart: number;
  }[] = [];
  for (const nameMatch of findRoutineNameMatches(
    conditionSource,
    condition,
    routines,
    true
  )) {
    const { routine, nameStart, nameEnd, order, parameters } = nameMatch;
    if (!routine.isBooleanFunction) {
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
    if (parameters.length === 0) {
      if (
        normalizeTypeName(conditionSource.slice(prefix.start, prefix.end)) === 'algo' &&
        suffix.start === suffix.end
      ) {
        matches.push({
          call: {
            name: createTypeReference(source, { start: nameStart, end: nameEnd }),
            arguments: [],
            target: routine
          },
          distance: 0,
          order,
          nameStart
        });
      }
      continue;
    }
    let argumentsList = [prefix, suffix].filter(range => range.start < range.end);
    if (
      argumentsList.length < parameters.length &&
      prefix.start < prefix.end &&
      suffix.start < suffix.end &&
      parameters.length > 1
    ) {
      const trailingArguments = splitRoutineArgumentsUsingParameterSeparators(
        conditionSource,
        suffix,
        parameters.slice(1),
        routine
      );
      if (trailingArguments?.length === parameters.length - 1) {
        argumentsList = [prefix, ...trailingArguments];
      }
    }
    if (
      argumentsList.length < parameters.length &&
      suffix.start === suffix.end
    ) {
      argumentsList = splitRoutineArgumentsUsingParameterSeparators(
        conditionSource,
        prefix,
        parameters,
        routine
      ) ?? argumentsList;
    }
    if (argumentsList.length !== parameters.length) {
      continue;
    }
    const distances: number[] = [];
    let outOfRangeIntegerRange: SourceRange | undefined;
    const fieldAccesses: RoutineFieldAccess[] = [];
    const variableAccesses: RoutineVariableAccess[] = [];
    const computedFieldAccesses: RoutineComputedFieldAccess[] = [];
    for (let index = 0; index < argumentsList.length; index++) {
      const expressionType = resolveRoutineExpressionType(
        conditionSource,
        argumentsList[index],
        caller,
        globalVariables,
        symbols,
        fieldAccesses,
        routines,
        computedFieldAccesses,
        variableAccesses,
        diagnostics
      );
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
        (index === argumentsList.length - 1 &&
          nameMatch.implicitDefiniteArticle === true) ||
          hasContractedDefiniteArticleBefore(
            source,
            argumentsList[index].start,
            condition.start
          ),
        diagnostics
      ) ?? resolveIndefiniteTypeArgument(
        conditionSource,
        argumentsList[index],
        symbols
      );
      const distance = actualType
        ? getRoutineArgumentTypeDistance(
          actualType,
          parameters[index].type.name,
          symbols
        ) ?? getLiteralRoutineArgumentTypeDistance(
          source,
          argumentsList[index],
          parameters[index].type.name,
          symbols
        )
        : undefined;
      const compatibleDistance = distance ?? (expressionType
        ? getRoutineExpressionTypeDistance(
          expressionType,
          parameters[index].type.name,
          symbols
        )
        : undefined);
      if (compatibleDistance === undefined) {
        const outOfRangeInteger = getOutOfRangeIntegerLiteralRange(
          conditionSource,
          argumentsList[index]
        );
        if (
          outOfRangeInteger &&
          symbols.getBaseTypeDistance(parameters[index].type.name, 'número') !== undefined
        ) {
          outOfRangeIntegerRange ??= outOfRangeInteger;
          distances.push(0);
          continue;
        }
        break;
      }
      distances.push(compatibleDistance);
    }
    if (distances.length !== argumentsList.length) {
      continue;
    }
    if (outOfRangeIntegerRange) {
      outOfRangeIntegerMatches.push({
        range: outOfRangeIntegerRange,
        order,
        nameStart
      });
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
  const match = matches.sort((first, second) =>
    first.distance - second.distance ||
    first.order - second.order ||
    first.nameStart - second.nameStart
  )[0];
  if (match) {
    return match;
  }

  const outOfRangeInteger = outOfRangeIntegerMatches.sort((first, second) =>
    first.order - second.order ||
    first.nameStart - second.nameStart
  )[0]?.range;
  if (outOfRangeInteger) {
    return {
      diagnostic: {
        message: `Integer literal "${source.slice(outOfRangeInteger.start, outOfRangeInteger.end)}" is outside the supported signed 32-bit range.`,
        range: outOfRangeInteger
      }
    };
  }
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
    const previousCharacter = match.index > 0 ? rangeText[match.index - 1] : '';
    const wordEnd = match.index + match[0].length;
    const nextCharacter = wordEnd < rangeText.length ? rangeText[wordEnd] : '';
    if (
      isWordCharacter(previousCharacter) ||
      isIdentifierJoiner(previousCharacter) ||
      isWordCharacter(nextCharacter) ||
      isIdentifierJoiner(nextCharacter)
    ) {
      continue;
    }
    for (let index = match.index; index < match.index + match[0].length; index++) {
      characters[index] = ' ';
    }
  }
  return source.slice(0, range.start) + characters.join('') + source.slice(range.end);
}

function replaceWordInRange(
  source: string,
  range: SourceRange,
  word: string,
  replacement: string
): string {
  if (word.length !== replacement.length) {
    throw new Error('Word replacements must preserve source offsets.');
  }
  const rangeText = source.slice(range.start, range.end);
  const characters = rangeText.split('');
  const words = /\p{L}+/gu;
  let match: RegExpExecArray | null;
  while ((match = words.exec(rangeText))) {
    if (match[0].toLocaleLowerCase('pt-BR') !== word) {
      continue;
    }
    const previousCharacter = match.index > 0 ? rangeText[match.index - 1] : '';
    const wordEnd = match.index + match[0].length;
    const nextCharacter = wordEnd < rangeText.length ? rangeText[wordEnd] : '';
    if (
      isWordCharacter(previousCharacter) ||
      isIdentifierJoiner(previousCharacter) ||
      isWordCharacter(nextCharacter) ||
      isIdentifierJoiner(nextCharacter)
    ) {
      continue;
    }
    for (let index = 0; index < replacement.length; index++) {
      characters[match.index + index] = replacement[index];
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
  const operators: {
    operator: ExpressionOperator;
    range: SourceRange;
    implicitDefiniteArticle?: boolean;
  }[] = [];
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
      const nextWordValue = nextWord?.value.toLocaleLowerCase('pt-BR');
      const contraction = nextWordValue
        ? routineContractions.get(nextWordValue)
        : undefined;
      const implicitDefiniteArticle = Boolean(
        contraction?.startsWith('por ') &&
        definiteArticles.has(contraction.slice('por '.length))
      );
      if (
        !nextWord ||
        nextWordValue !== 'por' &&
          !implicitDefiniteArticle
      ) {
        continue;
      }
      operators.push({
        operator: 'dividido por',
        range: { start: match.index, end: nextWord.end },
        implicitDefiniteArticle
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
    if (operators[index].implicitDefiniteArticle) {
      const rightOperand = operands[index + 1];
      if (rightOperand.kind === 'operand') {
        rightOperand.implicitDefiniteArticle = true;
      } else if (rightOperand.kind === 'unary' && rightOperand.operand.kind === 'operand') {
        rightOperand.operand.implicitDefiniteArticle = true;
      }
    }
    expression = {
      kind: 'binary',
      operator: operators[index].operator,
      operatorRange: operators[index].range,
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
    operatorRange: { start: operandRange.start, end: operandRange.start + 1 },
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

function parseDecodeStatement(
  source: string,
  statement: SourceRange,
  diagnostics: ParserDiagnostic[]
): RoutineSimpleInstruction | undefined {
  const keyword = readWord(source, statement.start, statement.end);
  if (!isDecodeInstruction(source, statement)) {
    return undefined;
  }

  if (!keyword) {
    return undefined;
  }

  const valueRange = trimRange(source, keyword.end, statement.end);
  if (valueRange.start < valueRange.end && /^\$[a-f\d]+$/iu.test(source.slice(valueRange.start, valueRange.end))) {
    return {
      kind: 'decode',
      range: statement,
      literal: {
        kind: 'hexadecimal',
        text: source.slice(valueRange.start, valueRange.end),
        range: valueRange
      },
      isValid: true
    };
  }

  diagnostics.push({
    message: 'Expected a hexadecimal literal after "Decodifique".',
    range: valueRange.start < valueRange.end
      ? valueRange
      : { start: keyword.start, end: keyword.end }
  });
  return {
    kind: 'decode',
    range: statement,
    isValid: false
  };
}

function isDecodeInstruction(source: string, statement: SourceRange): boolean {
  const keyword = readWord(source, statement.start, statement.end);
  return keyword?.value.toLocaleLowerCase('pt-BR') === 'decodifique';
}

function parsePushStatement(
  source: string,
  statement: SourceRange,
  caller: RoutineDeclaration,
  routines: RoutineDeclaration[],
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[]
): RoutineSimpleInstruction | undefined {
  const keyword = readWord(source, statement.start, statement.end);
  if (!keyword || keyword.value.toLocaleLowerCase('pt-BR') !== 'empilhe') {
    return undefined;
  }

  const valueRange = trimRange(source, keyword.end, statement.end);
  const literal = parseGlobalVariableLiteral(source, valueRange);
  if (literal && literal.kind !== 'string') {
    return {
      kind: 'push',
      range: statement,
      literal,
      isValid: true
    };
  }

  const article = readWord(source, valueRange.start, valueRange.end);
  if (article && definiteArticles.has(article.value.toLocaleLowerCase('pt-BR'))) {
    const variableNameRange = trimRange(source, article.end, valueRange.end);
    const variableAccesses: RoutineVariableAccess[] = [];
    const variableType = resolveRoutineArgumentType(
      source,
      valueRange,
      caller,
      globalVariables,
      symbols,
      [],
      routines,
      [],
      variableAccesses
    );
    if (!variableType) {
      diagnostics.push({
        message: `Unknown variable "${source.slice(variableNameRange.start, variableNameRange.end)}" after "Empilhe".`,
        range: variableNameRange.start < variableNameRange.end
          ? variableNameRange
          : { start: keyword.start, end: keyword.end }
      });
      return {
        kind: 'push',
        range: statement,
        isValid: false
      };
    }

    if (isPushableNumericType(variableType.name, symbols)) {
      return {
        kind: 'push',
        range: statement,
        variableAccesses,
        isValid: true
      };
    }
    diagnostics.push({
      message: '"Empilhe" only accepts variables of type "byte", "word", or "número".',
      range: valueRange
    });
    return {
      kind: 'push',
      range: statement,
      variableAccesses,
      isValid: false
    };
  }

  diagnostics.push({
    message: 'Expected a numeric literal or a definite-article variable after "Empilhe".',
    range: valueRange.start < valueRange.end
      ? valueRange
      : { start: keyword.start, end: keyword.end }
  });
  return {
    kind: 'push',
    range: statement,
    isValid: false
  };
}

function validateMemoryAllocationStatement(
  source: string,
  statement: SourceRange,
  routine: RoutineDeclaration,
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[]
): boolean {
  const keyword = readWord(source, statement.start, statement.end);
  if (keyword?.value.toLocaleLowerCase('pt-BR') !== 'aloque') {
    return false;
  }

  const instructionTail = trimRange(source, keyword.end, statement.end);
  const prefix = /^memória\s+para\b/iu.exec(
    source.slice(instructionTail.start, instructionTail.end)
  );
  const targetStart = prefix
    ? skipWhitespace(source, instructionTail.start + prefix[0].length, instructionTail.end)
    : instructionTail.end;
  const article = readWord(source, targetStart, instructionTail.end);
  if (
    !prefix ||
    !article ||
    ![...indefiniteArticles, ...definiteArticles].includes(
      article.value.toLocaleLowerCase('pt-BR')
    )
  ) {
    diagnostics.push({
      message: '"Aloque memória para" requires an article and a list variable or type.',
      range: instructionTail.start < instructionTail.end
        ? instructionTail
        : { start: keyword.start, end: keyword.end }
    });
    return true;
  }

  const targetRange = trimRange(source, article.end, instructionTail.end);
  const targetName = normalizeTypeName(source.slice(targetRange.start, targetRange.end));
  const localVariable = findRoutineVariable(routine, targetName);
  const globalVariable = globalVariables.lookup(targetName);
  const isIndefiniteArticle = indefiniteArticles.has(
    article.value.toLocaleLowerCase('pt-BR')
  );
  const declaredType = isIndefiniteArticle && !localVariable
    ? symbols.lookup(source.slice(targetRange.start, targetRange.end))
    : undefined;
  let type: TypeReference | undefined;
  let variableAccess: RoutineVariableAccess | undefined;

  if (declaredType) {
    type = createSyntheticTypeReference(declaredType.name, targetRange);
    const allocatedVariable: RoutineLocalVariable = {
      name: createTypeReference(source, targetRange),
      type,
      range: statement
    };
    routine.localVariables.push(allocatedVariable);
    variableAccess = {
      reference: allocatedVariable.name,
      type,
      scope: routine.range.start
    };
  } else if (localVariable) {
    type = localVariable.type;
    variableAccess = {
      reference: createTypeReference(source, targetRange),
      type,
      scope: routine.range.start
    };
  } else if (globalVariable?.typeName) {
    type = createSyntheticTypeReference(globalVariable.typeName, targetRange);
    variableAccess = {
      reference: createTypeReference(source, targetRange),
      type
    };
  } else if (symbols.lookup(source.slice(targetRange.start, targetRange.end))) {
    type = createTypeReference(source, targetRange);
  }

  if (!type) {
    diagnostics.push({
      message: `Unknown variable or type "${source.slice(targetRange.start, targetRange.end)}" after "Aloque memória para".`,
      range: targetRange.start < targetRange.end
        ? targetRange
        : { start: keyword.start, end: keyword.end }
    });
    return true;
  }

  if (symbols.getBaseTypeDistance(type.name, 'ponteiro') === undefined) {
    diagnostics.push({
      message: '"Aloque memória para" only accepts variables and types based on "ponteiro".',
      range: targetRange
    });
    return true;
  }

  routine.memoryAllocations.push({
    type,
    variableAccess,
    range: statement
  });
  return true;
}

function validateMemoryDeallocationStatement(
  source: string,
  statement: SourceRange,
  routine: RoutineDeclaration,
  routines: RoutineDeclaration[],
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable
): boolean {
  const keyword = readWord(source, statement.start, statement.end);
  if (keyword?.value.toLocaleLowerCase('pt-BR') !== 'destrua') {
    return false;
  }

  const targetRange = trimRange(source, keyword.end, statement.end);
  const article = readWord(source, targetRange.start, targetRange.end);
  if (!article) {
    return false;
  }

  const articleWord = article.value.toLocaleLowerCase('pt-BR');
  if (!definiteArticles.has(articleWord)) {
    return false;
  }

  const fieldAccesses: RoutineFieldAccess[] = [];
  const computedFieldAccesses: RoutineComputedFieldAccess[] = [];
  const variableAccesses: RoutineVariableAccess[] = [];
  const type = resolveRoutineArgumentType(
    source,
    targetRange,
    routine,
    globalVariables,
    symbols,
    fieldAccesses,
    routines,
    computedFieldAccesses,
    variableAccesses
  );
  if (!type || symbols.getBaseTypeDistance(type.name, 'lista') === undefined) {
    return false;
  }

  routine.memoryDeallocations.push({
    type,
    variableAccess: variableAccesses[0],
    fieldAccesses,
    range: statement
  });
  routine.computedFieldAccesses.push(...computedFieldAccesses);
  return true;
}

function validateRoutineAddressStatement(
  source: string,
  statement: SourceRange,
  caller: RoutineDeclaration,
  routines: RoutineDeclaration[],
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[]
): boolean {
  const keyword = readWord(source, statement.start, statement.end);
  const instruction = keyword?.value.toLocaleLowerCase('pt-BR');
  if (!keyword || !instruction || !['aponte', 'direcione', 'redirecione'].includes(instruction)) {
    return false;
  }

  const typeArticle = readWord(source, keyword.end, statement.end);
  if (
    !typeArticle ||
    !articles.has(typeArticle.value.toLocaleLowerCase('pt-BR'))
  ) {
    diagnostics.push({
      message: `"${keyword.value}" requires an article and a pointer type before "para a rotina".`,
      range: { start: keyword.start, end: statement.end }
    });
    return true;
  }

  let markerStart = -1;
  let markerEnd = -1;
  let type: TypeReference | undefined;
  const fieldAccesses: RoutineFieldAccess[] = [];
  const variableAccesses: RoutineVariableAccess[] = [];
  const computedFieldAccesses: RoutineComputedFieldAccess[] = [];
  let searchStart = typeArticle.end;
  while (searchStart < statement.end) {
    const preposition = findWord(source, searchStart, statement.end, 'para');
    if (!preposition) {
      break;
    }
    const routineArticle = readWord(source, preposition.end, statement.end);
    const routineWord = routineArticle
      ? readWord(source, routineArticle.end, statement.end)
      : undefined;
    if (
      routineArticle?.value.toLocaleLowerCase('pt-BR') === 'a' &&
      routineWord?.value.toLocaleLowerCase('pt-BR') === 'rotina'
    ) {
      const candidateRange = trimRange(source, typeArticle.end, preposition.start);
      const candidateType = symbols.lookup(source.slice(candidateRange.start, candidateRange.end))
        ? createTypeReference(source, candidateRange)
        : resolveRoutineArgumentType(
          source,
          trimRange(source, typeArticle.start, preposition.start),
          caller,
          globalVariables,
          symbols,
          fieldAccesses,
          routines,
          computedFieldAccesses,
          variableAccesses,
          false,
          diagnostics
        );
      if (candidateType) {
        markerStart = preposition.start;
        markerEnd = routineWord.end;
        type = candidateType;
        break;
      }
    }
    searchStart = preposition.end;
  }

  if (!type || markerStart === -1) {
    diagnostics.push({
      message: `"${keyword.value}" requires a known pointer type followed by "para a rotina".`,
      range: { start: typeArticle.end, end: statement.end }
    });
    return true;
  }

  if (symbols.getBaseTypeDistance(type.name, 'ponteiro') === undefined) {
    diagnostics.push({
      message: `"${keyword.value}" only accepts types based on "ponteiro".`,
      range: type.range
    });
  }

  const routineRange = trimRange(source, markerEnd, statement.end);
  const routineNameMatches: { matches: RoutineNameMatch[] } = {
    matches: []
  };
  const call = resolveRoutineCall(
    source,
    routineRange,
    routines,
    caller,
    globalVariables,
    symbols,
    diagnostics,
    routineNameMatches
  );
  if (!call?.target) {
    if (routineNameMatches.matches.length === 0) {
      diagnostics.push({
        message: `No routine found for address reference "${source.slice(routineRange.start, routineRange.end)}".`,
        range: routineRange
      });
    } else {
      diagnostics.push({
        message: `No compatible routine found for "${source.slice(routineRange.start, routineRange.end)}".`,
        range: routineRange
      });
    }
    return true;
  }

  if (!call.target.isCompatible) {
    diagnostics.push({
      message: `Routine "${source.slice(routineRange.start, routineRange.end)}" must be declared with "compativelmente" to provide its address.`,
      range: routineRange
    });
    return true;
  }

  const addressCall: RoutineCall = {
    ...call,
    addressType: type,
    fieldAccesses: [...fieldAccesses, ...(call.fieldAccesses ?? [])],
    variableAccesses: [...variableAccesses, ...(call.variableAccesses ?? [])],
    computedFieldAccesses: [
      ...computedFieldAccesses,
      ...(call.computedFieldAccesses ?? [])
    ]
  };
  caller.calls.push(addressCall);
  if (addressCall.localVariables) {
    caller.localVariables.push(...addressCall.localVariables);
  }
  caller.computedFieldAccesses.push(...computedFieldAccesses);
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
      variableAccesses,
      false,
      diagnostics
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
    : typeRange;
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
      range: argument,
      implicit: !markers
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
    : typeRange;
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
    variableAccesses,
    expression.implicitDefiniteArticle
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
  variableAccesses: RoutineVariableAccess[] = [],
  implicitDefiniteArticle = false
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
    variableAccesses,
    implicitDefiniteArticle
  );
  if (!resolvedType) {
    const hasAmbiguousFieldAccess = diagnostics.some(diagnostic =>
      diagnostic.message.startsWith('Ambiguous structure field access') &&
      diagnostic.range.start >= range.start &&
      diagnostic.range.end <= range.end
    );
    if (hasStructureAccess && !hasAmbiguousFieldAccess) {
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
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[],
  nameMatchResult?: { matches: RoutineNameMatch[] }
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
      candidate.parameters.length === 0 &&
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
    separatorDistance: number;
  }[] = [];
  const parsedArgumentsByNameEnd = new Map<string, {
    argumentsList: SourceRange[];
    localVariablesByArgument: Map<number, RoutineLocalVariable>;
  }>();
  const nameMatches = findRoutineNameMatches(source, statementRange, routines);
  if (nameMatchResult) {
    nameMatchResult.matches = nameMatches;
  }
  for (const nameMatch of nameMatches) {
    const {
      routine,
      name: routineName,
      nameEnd,
      implicitDefiniteArticle
    } = nameMatch;
    const returnMarker = findWordOutsideStrings(
      source,
      nameEnd,
      statementRange.end,
      'retornando'
    );
    const parameters = returnMarker && routine.returnParameter
      ? [...nameMatch.parameters, routine.returnParameter]
      : nameMatch.parameters;
    if (parameters.length === 0) {
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
    const argumentEnd = trimRoutineTrailingNameSuffix(
      source,
      nameEnd,
      callQualifier?.start ?? statementRange.end,
      routine,
      nameMatch.parameters
    );
    if (hasArticleBeforeScalarLiteral(source, {
      start: nameEnd,
      end: argumentEnd
    })) {
      continue;
    }
    const parsedArgumentsKey = `${nameEnd}:${argumentEnd}`;
    let parsedArguments = parsedArgumentsByNameEnd.get(parsedArgumentsKey);
    if (!parsedArguments) {
      const argumentRange = trimRange(
        source,
        nameEnd,
        argumentEnd
      );
      const localVariable = parseLocalVariableDeclaration(
        source,
        argumentRange,
        symbols
      );
      let argumentsList: SourceRange[];
      const localVariablesByArgument = new Map<number, RoutineLocalVariable>();
      if (localVariable?.inputArgumentRange) {
        const precedingArgumentsRange = trimTrailingWord(
          source,
          trimRange(source, argumentRange.start, localVariable.range.start),
          'para'
        );
        argumentsList = [
          ...splitRoutineArguments(source, precedingArgumentsRange).filter(argument =>
            normalizeTypeName(source.slice(argument.start, argument.end)) !== 'para'
          ),
          localVariable.name.range,
          localVariable.inputArgumentRange
        ];
        localVariablesByArgument.set(argumentsList.length - 2, localVariable);
      } else {
        argumentsList = splitRoutineArguments(source, argumentRange);
      }
      parsedArguments = {
        argumentsList,
        localVariablesByArgument
      };
      parsedArgumentsByNameEnd.set(parsedArgumentsKey, parsedArguments);
    }
    let { argumentsList } = parsedArguments;
    const localVariablesByArgument = new Map(
      parsedArguments.localVariablesByArgument
    );
    const parameterSeparatedArguments = splitRoutineArgumentsUsingParameterSeparators(
      source,
      trimRange(source, nameEnd, argumentEnd),
      parameters,
      routine
    );
    argumentsList = parameterSeparatedArguments ?? argumentsList;
    if (
      argumentsList.length < parameters.length &&
      localVariablesByArgument.size === 0
    ) {
      argumentsList = splitScalarRoutineArguments(
        source,
        argumentsList,
        parameters,
        caller,
        globalVariables,
        symbols,
        routines
      );
    }
    if (localVariablesByArgument.size === 0) {
      argumentsList = argumentsList.map((argument, index) => {
        const argumentLocalVariable = parseLocalVariableDeclaration(
          source,
          argument,
          symbols
        );
        if (!argumentLocalVariable) {
          return argument;
        }
        const article = readWord(source, argument.start, argument.end);
        const hasNameMarker = Boolean(findAnyWord(
          source,
          article?.end ?? argument.end,
          argument.end,
          localVariableNameMarkers
        ));
        argumentLocalVariable.implicit = !hasNameMarker;
        localVariablesByArgument.set(index, argumentLocalVariable);
        return argumentLocalVariable.name.range;
      });
    }
    if (argumentsList.length !== parameters.length) {
      continue;
    }
    const separatorMatch = getRoutineArgumentSeparatorMatch(
      source,
      argumentsList,
      parameters,
      routine
    );
    if (
      separatorMatch?.mismatch &&
      argumentsList.slice(1).some(argument =>
        isScalarRoutineLiteral(source, argument)
      )
    ) {
      continue;
    }
    const separatorDistance = separatorMatch?.distance ?? 0;

    const distances: number[] = [];
    const fieldAccesses: RoutineFieldAccess[] = [];
    const variableAccesses: RoutineVariableAccess[] = [];
    const computedFieldAccesses: RoutineComputedFieldAccess[] = [];
    const typeReferences: TypeReference[] = [];
    for (let index = 0; index < argumentsList.length; index++) {
      const parameter = parameters[index];
      const localVariable = localVariablesByArgument.get(index);
      const typeCast = localVariable
        ? undefined
        : parseTypeCast(source, argumentsList[index], symbols);
      if (typeCast) {
        typeReferences.push(typeCast.type);
      }
      const scalarArgumentType = localVariable
        ? undefined
        : resolveScalarRoutineArgumentType(
          source,
          argumentsList[index],
          parameter.type,
          symbols
        );
      const argumentType = localVariable
        ? localVariable.type
        : scalarArgumentType ?? resolveRoutineArgumentType(
          source,
          argumentsList[index],
          caller,
          globalVariables,
          symbols,
          fieldAccesses,
          routines,
          computedFieldAccesses,
          variableAccesses,
          hasContractedDefiniteArticleBefore(
            source,
            argumentsList[index].start,
            nameEnd
          ) || implicitDefiniteArticle,
          diagnostics
        );
      if (scalarArgumentType) {
        typeReferences.push(scalarArgumentType);
      }
      const expressionType = localVariable
        ? undefined
        : resolveRoutineExpressionType(
          source,
          argumentsList[index],
          caller,
          globalVariables,
          symbols,
          fieldAccesses,
          routines,
          computedFieldAccesses,
          variableAccesses,
          diagnostics
        );
      const distance = argumentType
        ? getRoutineArgumentTypeDistance(
          argumentType,
          parameter.type.name,
          symbols
        ) ?? getLiteralRoutineArgumentTypeDistance(
          source,
          argumentsList[index],
          parameter.type.name,
          symbols
        )
        : undefined;
      const compatibleDistance = distance ?? (expressionType
        ? getRoutineExpressionTypeDistance(
          expressionType,
          parameter.type.name,
          symbols
        )
        : undefined);
      if (compatibleDistance === undefined) {
        break;
      }
      distances.push(compatibleDistance);
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
        typeReferences,
        fieldAccesses,
        variableAccesses,
        computedFieldAccesses,
        localVariables: [...localVariablesByArgument.values()],
        target: routine
      },
      distance: distances.reduce((total, distance) => total + distance, 0),
      nameLength: nameEnd - statementRange.start,
      separatorDistance
    });
  }
  const resolvedCall = matchingCalls.sort((first, second) =>
    second.nameLength - first.nameLength ||
    first.distance - second.distance ||
    first.separatorDistance - second.separatorDistance
  )[0]?.call;
  if (!resolvedCall) {
    recordUnresolvedRoutineCallReferences(
      source,
      statementRange,
      routines,
      caller,
      globalVariables,
      symbols,
      nameMatches
    );
  }
  return resolvedCall;
}

function getRoutineArgumentSeparatorMatch(
  source: string,
  argumentsList: SourceRange[],
  parameters: RoutineParameter[],
  routine: RoutineDeclaration
): { distance: number; mismatch: boolean } | undefined {
  const expectedSeparators = getRoutineParameterSeparators(
    source,
    parameters,
    routine
  );
  if (!expectedSeparators) {
    return { distance: 0, mismatch: false };
  }

  let distance = 0;
  let mismatch = false;
  for (let index = 0; index < argumentsList.length - 1; index++) {
    const gap = source.slice(argumentsList[index].end, argumentsList[index + 1].start);
    const gapWords = [...gap.matchAll(/[\p{L}]+/gu)]
      .map(match => match[0].toLocaleLowerCase('pt-BR'));
    const actualSeparators = getRoutineParameterSeparatorWords(gapWords);
    const expected = expectedSeparators[index] ?? [];
    if (actualSeparators.length !== expected.length) {
      mismatch = true;
    }
    distance += Math.abs(actualSeparators.length - expected.length) * 4;
    for (
      let separatorIndex = 0;
      separatorIndex < Math.min(actualSeparators.length, expected.length);
      separatorIndex++
    ) {
      if (
        normalizeRoutineSeparatorWord(actualSeparators[separatorIndex]) !==
        normalizeRoutineSeparatorWord(expected[separatorIndex])
      ) {
        mismatch = true;
        distance += 4;
      } else if (
        actualSeparators[separatorIndex].toLocaleLowerCase('pt-BR') !==
        expected[separatorIndex].toLocaleLowerCase('pt-BR')
      ) {
        distance++;
      }
    }
  }
  return { distance, mismatch };
}

function trimRoutineTrailingNameSuffix(
  source: string,
  start: number,
  end: number,
  routine: RoutineDeclaration,
  parameters: RoutineParameter[]
): number {
  if (parameters !== routine.parameters || parameters.length === 0) {
    return end;
  }
  const headerEnd = routine.bodyRange.start - 1;
  const lastParameter = parameters[parameters.length - 1];
  if (
    headerEnd < lastParameter.type.range.end ||
    headerEnd > source.length
  ) {
    return end;
  }
  const returnMarker = findWord(
    source,
    lastParameter.type.range.end,
    headerEnd,
    'retornando'
  );
  const suffix = findTrailingRoutineNameSuffix(
    source,
    lastParameter.type.range.end,
    returnMarker?.start ?? headerEnd
  );
  if (!suffix) {
    return end;
  }
  const expectedSuffix = normalizeRoutineName(
    source.slice(suffix.start, suffix.end)
  );
  const callEnd = trimRange(source, start, end).end;
  const words = [...source.slice(start, callEnd).matchAll(/\S+/gu)];
  for (const word of words) {
    const suffixStart = start + (word.index ?? 0);
    if (
      normalizeRoutineName(source.slice(suffixStart, callEnd)) ===
      expectedSuffix
    ) {
      return suffixStart;
    }
  }
  return end;
}

function getRoutineParameterSeparators(
  source: string,
  parameters: RoutineParameter[],
  routine: RoutineDeclaration
): string[][] | undefined {
  if (
    routine.range.end > source.length ||
    routine.name.range.end > source.length ||
    normalizeRoutineName(source.slice(routine.name.range.start, routine.name.range.end)) !==
      normalizeRoutineName(routine.name.name)
  ) {
    return undefined;
  }

  return getHeaderRoutineParameterSeparators(source, parameters);
}

function getHeaderRoutineParameterSeparators(
  source: string,
  parameters: RoutineParameter[]
): string[][] {
  return parameters.slice(0, -1).map((parameter, index) => {
    const nextParameter = parameters[index + 1];
    const gap = source.slice(parameter.type.range.end, nextParameter.type.range.start);
    const words = [...gap.matchAll(/[\p{L}]+/gu)]
      .map(match => match[0].toLocaleLowerCase('pt-BR'));
    let nextParameterArticleIndex = -1;
    for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
      if (indefiniteArticles.has(words[wordIndex])) {
        nextParameterArticleIndex = wordIndex;
      }
    }
    if (nextParameterArticleIndex !== -1) {
      const separators = words.slice(0, nextParameterArticleIndex);
      return getRoutineParameterSeparatorWords(separators);
    }

    return getRoutineParameterSeparatorWords(words);
  });
}

function getRoutineParameterSeparatorWords(words: string[]): string[] {
  const markerIndex = words.findIndex(word => localVariableNameMarkers.has(word));
  let wordsWithoutName = words;
  if (markerIndex !== -1) {
    const wordsAfterNameMarker = words.slice(markerIndex + 1);
    const firstSeparatorIndex = wordsAfterNameMarker.findIndex(word =>
      routineNameDelimiters.has(word) || conjunctions.has(word)
    );
    wordsWithoutName = firstSeparatorIndex === -1
      ? []
      : wordsAfterNameMarker.slice(firstSeparatorIndex);
  }
  return wordsWithoutName.filter(word => !articles.has(word));
}

function isScalarRoutineLiteral(source: string, range: SourceRange): boolean {
  return /^\s*[+-]?\d/u.test(source.slice(range.start, range.end));
}

function hasArticleBeforeScalarLiteral(
  source: string,
  range: SourceRange
): boolean {
  const words = [...source.slice(range.start, range.end).matchAll(
    /[\p{L}]+|[+-]?\d+/gu
  )];
  return words.some((word, index) =>
    indefiniteArticles.has(word[0].toLocaleLowerCase('pt-BR')) &&
    /^\s*[+-]?\d/u.test(words[index + 1]?.[0] ?? '')
  );
}

function splitRoutineArgumentsUsingParameterSeparators(
  source: string,
  range: SourceRange,
  parameters: RoutineParameter[],
  routine: RoutineDeclaration
): SourceRange[] | undefined {
  const expectedSeparators = getRoutineParameterSeparators(
    source,
    parameters,
    routine
  );
  if (
    !expectedSeparators ||
    expectedSeparators.length !== parameters.length - 1 ||
    expectedSeparators.some(separators => separators.length === 0)
  ) {
    return undefined;
  }

  const words = [...source.slice(range.start, range.end).matchAll(/\p{L}+/gu)];
  const argumentsList: SourceRange[] = [];
  let argumentStart = range.start;
  let wordIndex = 0;
  for (const separators of expectedSeparators) {
    let firstSeparator: RegExpMatchArray | undefined;
    let lastSeparator: RegExpMatchArray | undefined;
    for (const separator of separators) {
      let matchedSeparator: RegExpMatchArray | undefined;
      while (wordIndex < words.length) {
        const word = words[wordIndex++];
        if (
          normalizeRoutineSeparatorWord(word[0]) ===
          normalizeRoutineSeparatorWord(separator)
        ) {
          matchedSeparator = word;
          break;
        }
      }
      if (!matchedSeparator) {
        return undefined;
      }
      firstSeparator ??= matchedSeparator;
      lastSeparator = matchedSeparator;
    }
    if (
      !firstSeparator ||
      !lastSeparator ||
      firstSeparator.index === undefined ||
      lastSeparator.index === undefined
    ) {
      return undefined;
    }

    const firstSeparatorStart = range.start + firstSeparator.index;
    const lastSeparatorEnd =
      range.start + lastSeparator.index + lastSeparator[0].length;
    argumentsList.push(trimRange(source, argumentStart, firstSeparatorStart));
    argumentStart = skipWhitespace(source, lastSeparatorEnd, range.end);
  }
  argumentsList.push(trimRange(source, argumentStart, range.end));
  return argumentsList.every(argument => argument.start < argument.end)
    ? argumentsList
    : undefined;
}

function normalizeRoutineSeparatorWord(word: string): string {
  const normalized = word.toLocaleLowerCase('pt-BR');
  const expanded = routineContractions.get(normalized)?.split(' ')[0] ?? normalized;
  return routineWordReplacements.get(expanded) ?? expanded;
}

function recordUnresolvedRoutineCallReferences(
  source: string,
  statement: SourceRange,
  routines: RoutineDeclaration[],
  caller: RoutineDeclaration,
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable,
  nameMatches: readonly RoutineNameMatch[]
): void {
  const nameMatch = nameMatches
    .filter(match => match.parameters.length > 0)
    .sort((first, second) =>
      second.nameEnd - first.nameEnd || first.order - second.order
    )[0];
  if (!nameMatch) {
    return;
  }

  const argumentRange = trimRange(source, nameMatch.nameEnd, statement.end);
  let argumentsList = splitRoutineArguments(source, argumentRange);
  if (argumentsList.length < nameMatch.parameters.length) {
    argumentsList = splitScalarRoutineArguments(
      source,
      argumentsList,
      nameMatch.parameters,
      caller,
      globalVariables,
      symbols,
      routines
    );
  }

  const variableAccesses: RoutineVariableAccess[] = [];
  const typeReferences: TypeReference[] = [];
  for (let index = 0; index < argumentsList.length; index++) {
    const range = argumentsList[index];
    const typeCast = parseTypeCast(source, range, symbols);
    if (typeCast) {
      typeReferences.push(typeCast.type);
    }
    const scalarType = resolveScalarRoutineArgumentType(
      source,
      range,
      nameMatch.parameters[index]?.type ?? nameMatch.parameters[0].type,
      symbols
    );
    if (scalarType) {
      typeReferences.push(scalarType);
      continue;
    }
    resolveRoutineArgumentType(
      source,
      range,
      caller,
      globalVariables,
      symbols,
      [],
      routines,
      [],
      variableAccesses
    );
  }

  caller.calls.push({
    name: createTypeReference(source, {
      start: statement.start,
      end: nameMatch.nameEnd
    }),
    arguments: argumentsList.map(range => createTypeReference(source, range)),
    variableAccesses,
    typeReferences
  });
}

function splitScalarRoutineArguments(
  source: string,
  argumentsList: SourceRange[],
  parameters: RoutineParameter[],
  caller: RoutineDeclaration,
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable,
  routines: RoutineDeclaration[]
): SourceRange[] {
  const result = [...argumentsList];
  for (
    let index = 0;
    index < result.length && result.length < parameters.length;
    index++
  ) {
    const argument = result[index];
    for (let literalStart = argument.start + 1; literalStart < argument.end; literalStart++) {
      if (!/\s/u.test(source[literalStart - 1])) {
        continue;
      }

      const nextParameterType = parameters[index + 1]?.type;
      const scalarLiteralRange = findScalarRoutineLiteral(
        source,
        literalStart,
        argument.end,
        nextParameterType,
        symbols
      );
      const article = scalarLiteralRange
        ? undefined
        : readWord(source, literalStart, argument.end);
      const startsWithArticle = article && (
        indefiniteArticles.has(article.value.toLocaleLowerCase('pt-BR')) ||
        definiteArticles.has(article.value.toLocaleLowerCase('pt-BR'))
      );
      if (
        startsWithArticle &&
        hasArticleBeforeScalarLiteral(source, {
          start: literalStart,
          end: argument.end
        })
      ) {
        continue;
      }
      const typedArgumentRange = scalarLiteralRange ??
        (startsWithArticle
          ? trimRange(source, literalStart, argument.end)
          : undefined);
      if (!typedArgumentRange || !nextParameterType) {
        continue;
      }

      const prefixRange = trimRange(source, argument.start, literalStart);
      const prefixLocalVariable = parseLocalVariableDeclaration(
        source,
        prefixRange,
        symbols
      );
      const prefixType = prefixLocalVariable?.type ?? resolveRoutineArgumentType(
        source,
        prefixRange,
        caller,
        globalVariables,
        symbols,
        [],
        routines,
        [],
        []
      ) ?? resolveIndefiniteTypeArgument(source, prefixRange, symbols);
      const suffixType = scalarLiteralRange
        ? resolveScalarRoutineArgumentType(
          source,
          typedArgumentRange,
          nextParameterType,
          symbols
        )
        : resolveRoutineArgumentType(
          source,
          typedArgumentRange,
          caller,
          globalVariables,
          symbols,
          [],
          routines,
          [],
          []
        ) ?? resolveIndefiniteTypeArgument(source, typedArgumentRange, symbols);
      if (
        !prefixType ||
        getRoutineArgumentTypeDistance(
          prefixType,
          parameters[index].type.name,
          symbols
        ) === undefined ||
        !suffixType ||
        getRoutineArgumentTypeDistance(
          suffixType,
          nextParameterType.name,
          symbols
        ) === undefined
      ) {
        continue;
      }

      result.splice(index, 1, prefixRange, typedArgumentRange);
      break;
    }
  }
  return result;
}

function findScalarRoutineLiteral(
  source: string,
  start: number,
  end: number,
  expectedType: TypeReference | undefined,
  symbols: TypeSymbolTable
): SourceRange | undefined {
  if (!expectedType) {
    return undefined;
  }
  const numberPrefix = /^([+-]?\d+(?:\+[+-]?\d+\/[+-]?\d+|\/[+-]?\d+)?)(\s+)/u.exec(
    source.slice(start, end)
  );
  if (!numberPrefix) {
    return undefined;
  }

  const numberRange = {
    start,
    end: start + numberPrefix[1].length
  };
  if (!parseGlobalVariableLiteral(source, numberRange)) {
    return undefined;
  }

  const typeStart = start + numberPrefix[0].length;
  for (const typeName of symbols.scalarNames) {
    const escapedTypeName = typeName
      .replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')
      .replace(/\s+/gu, '\\s+');
    const typePattern = new RegExp(`^${escapedTypeName}(?=$|\\s)`, 'iu');
    const typeMatch = typePattern.exec(source.slice(typeStart, end));
    if (!typeMatch) {
      continue;
    }
    const literalRange = {
      start,
      end: typeStart + typeMatch[0].length
    };
    if (
      resolveScalarRoutineArgumentType(
        source,
        literalRange,
        expectedType,
        symbols
      )
    ) {
      return literalRange;
    }
  }
  return undefined;
}

function diagnoseUnresolvedRoutineCall(
  source: string,
  statement: SourceRange,
  caller: RoutineDeclaration,
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable,
  diagnostics: ParserDiagnostic[],
  nameMatches: readonly RoutineNameMatch[]
): void {
  const firstWord = readWord(source, statement.start, statement.end);
  if (!firstWord || builtInStatementStarts.has(firstWord.value.toLocaleLowerCase('pt-BR'))) {
    return;
  }

  const rest = trimRange(source, firstWord.end, statement.end);
  const definiteArticle = findAnyWord(source, rest.start, rest.end, definiteArticles);
  const matchesDeclaredRoutineName = nameMatches.some(({ nameEnd }) =>
    /\s/u.test(source[nameEnd] ?? '') &&
    trimRange(source, nameEnd, statement.end).start < statement.end
  );
  const looksLikeCall = rest.start === rest.end ||
    Boolean(definiteArticle || parseGlobalVariableLiteral(source, rest) || matchesDeclaredRoutineName);
  if (!looksLikeCall) {
    return;
  }

  for (const { name, nameEnd, parameters } of nameMatches) {
    if (!parameters.length) {
      continue;
    }
    if (nameEnd >= statement.end || !/\s/u.test(source[nameEnd] ?? '')) {
      continue;
    }
    const argumentsRange = trimRange(source, nameEnd, statement.end);
    const argumentsList = splitRoutineArguments(source, argumentsRange);
    if (argumentsList.length !== parameters.length) {
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
        isCompatibleType(argumentType, parameters[index].type, symbols)
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
  parameters: RoutineParameter[];
  order: number;
}

interface RoutineNameMatch extends RoutineNameCandidate {
  nameStart: number;
  nameEnd: number;
  implicitDefiniteArticle?: boolean;
}

interface RoutineNameLookupIndex {
  byNormalizedName: Map<string, RoutineNameCandidate[]>;
  byNormalizedNameAndQualifier: Map<string, RoutineNameCandidate[]>;
  maximumNameWords: number;
}

function routineNameQualifierKey(name: string, qualifier?: string): string {
  return `${name}\u0000${qualifier ?? ''}`;
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
  const byNormalizedNameAndQualifier = new Map<
    string,
    RoutineNameCandidate[]
  >();
  let order = 0;
  let maximumNameWords = 0;
  for (const routine of routines) {
    const variants = [
      { name: routine.name, parameters: routine.parameters },
      ...routine.alternateNames.map((name, index) => ({
        name,
        parameters: routine.alternateParameters[index] ?? routine.parameters
      }))
    ];
    for (const { name, parameters } of variants) {
      const normalizedName = normalizeRoutineName(name.name);
      maximumNameWords = Math.max(
        maximumNameWords,
        normalizedName.split(/\s+/u).filter(Boolean).length
      );
      const candidates = byNormalizedName.get(normalizedName) ?? [];
      const candidate = { routine, name, parameters, order: order++ };
      candidates.push(candidate);
      byNormalizedName.set(normalizedName, candidates);
      const qualifierKey = routineNameQualifierKey(
        normalizedName,
        name.qualifier
      );
      const qualifiedCandidates =
        byNormalizedNameAndQualifier.get(qualifierKey) ?? [];
      qualifiedCandidates.push(candidate);
      byNormalizedNameAndQualifier.set(qualifierKey, qualifiedCandidates);
    }
  }

  const index = {
    byNormalizedName,
    byNormalizedNameAndQualifier,
    maximumNameWords
  };
  routineNameLookupIndexes.set(routines, index);
  return index;
}

function findRoutineNameMatches(
  source: string,
  range: SourceRange,
  routines: RoutineDeclaration[],
  searchAnyStart = false
): RoutineNameMatch[] {
  const profileCounters = activeRoutineResolutionProfileCounters;
  if (profileCounters) {
    profileCounters.nameMatchSearches++;
  }
  const {
    byNormalizedName,
    byNormalizedNameAndQualifier,
    maximumNameWords
  } = getRoutineNameIndex(routines);
  const matches: RoutineNameMatch[] = [];
  if (maximumNameWords === 0) {
    return matches;
  }

  const addCandidates = (
    normalizedName: string,
    nameStart: number,
    nameEnd: number,
    implicitDefiniteArticle: boolean,
    matchedCandidates: Set<RoutineNameCandidate>
  ): void => {
    const allCandidates = byNormalizedName.get(normalizedName);
    if (!allCandidates) {
      return;
    }
    const callQualifier = findTrailingParentheticalQualifier(
      source,
      nameEnd,
      range.end
    )?.text;
    const candidates = byNormalizedNameAndQualifier.get(
      routineNameQualifierKey(normalizedName, callQualifier)
    );
    if (profileCounters) {
      profileCounters.nameCandidatesSkippedByQualifier +=
        allCandidates.length - (candidates?.length ?? 0);
    }
    for (const candidate of candidates ?? []) {
      if (matchedCandidates.has(candidate)) {
        continue;
      }
      if (profileCounters) {
        profileCounters.nameCandidateChecks++;
      }
      matchedCandidates.add(candidate);
      matches.push({
        ...candidate,
        nameStart,
        nameEnd,
        implicitDefiniteArticle
      });
    }
  };
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
    let wordCount = 0;
    let wordStart = nameStart;
    const normalizedWords: string[] = [];
    let hasParentheses = false;
    while (wordStart < range.end) {
      while (wordStart < range.end && /\s/u.test(source[wordStart])) {
        wordStart++;
      }
      if (wordStart >= range.end) {
        break;
      }
      let nameEnd = wordStart;
      while (nameEnd < range.end && !/\s/u.test(source[nameEnd])) {
        nameEnd++;
      }
      if (profileCounters) {
        profileCounters.nameSpanChecks++;
      }
      wordCount++;
      if (wordCount > maximumNameWords) {
        break;
      }

      const sourceWord = source.slice(wordStart, nameEnd);
      hasParentheses ||= sourceWord.includes('(') || sourceWord.includes(')');
      if (!hasParentheses) {
        appendNormalizedRoutineWord(normalizedWords, sourceWord);
      }
      const normalizedName = hasParentheses
        ? normalizeRoutineName(source.slice(nameStart, nameEnd))
        : normalizedWords.join(' ');
      addCandidates(
        normalizedName,
        nameStart,
        nameEnd,
        false,
        matchedCandidates
      );

      let finalWordMatch: RegExpExecArray | undefined;
      routineNameWordPattern.lastIndex = 0;
      let wordMatch: RegExpExecArray | null;
      while ((wordMatch = routineNameWordPattern.exec(sourceWord))) {
        finalWordMatch = wordMatch;
      }
      const expansion = finalWordMatch
        ? routineContractions.get(finalWordMatch[0].toLocaleLowerCase('pt-BR'))
        : undefined;
      const expandedWords = expansion?.split(' ');
      if (
        finalWordMatch &&
        expandedWords &&
        definiteArticles.has(expandedWords[expandedWords.length - 1])
      ) {
        const nameWithoutArticle = [
          source.slice(nameStart, wordStart + finalWordMatch.index),
          ...expandedWords.slice(0, -1)
        ].join(' ');
        addCandidates(
          normalizeRoutineName(nameWithoutArticle),
          nameStart,
          nameEnd,
          true,
          matchedCandidates
        );
      }
      wordStart = nameEnd;
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
  const quotedRanges = findQuotedRanges(source, range);
  words.lastIndex = range.start;
  let match: RegExpExecArray | null;
  while ((match = words.exec(source)) && match.index < range.end) {
    if (quotedRanges.some(quoted => match!.index >= quoted.start && match!.index < quoted.end)) {
      continue;
    }
    const wordEnd = match.index + match[0].length;
    const word = match[0].toLocaleLowerCase('pt-BR');
    const followsTypeCast = /\btal\s+(?:como|qual)\b/iu.test(
      source.slice(range.start, match.index)
    );
    const contractionPreposition = routineContractions.get(word)?.split(' ')[0];
    if (
      followsTypeCast &&
      (word === 'em' || contractionPreposition === 'em')
    ) {
      continue;
    }
    const previousWord = /([\p{L}]+)\s*$/u.exec(
      source.slice(range.start, match.index)
    )?.[1].toLocaleLowerCase('pt-BR');
    if (
      word === 'de' && previousWord === 'seguido' ||
      word === 'com' && previousWord === 'junto'
    ) {
      continue;
    }
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
      const nextArgumentStartsWithLiteral =
        /^(?:[+-]?\d+(?:\+[+-]?\d+\/[+-]?\d+|\/[+-]?\d+)?|\$[a-f\d]+|")/iu
          .test(source.slice(nextStart, range.end));
      const contractionExpansion = routineContractions.get(word)?.split(' ');
      const hasContractedDefiniteArticle = Boolean(
        contractionExpansion &&
        ['o', 'a', 'os', 'as'].includes(
          contractionExpansion[contractionExpansion.length - 1]
        )
      );
      if (
        (!nextArticle ||
          !definiteArticles.has(nextArticle.value.toLocaleLowerCase('pt-BR')) &&
          !indefiniteArticles.has(nextArticle.value.toLocaleLowerCase('pt-BR')) &&
          !hasContractedDefiniteArticle) &&
        !nextArgumentStartsWithLiteral
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

function hasContractedDefiniteArticleBefore(
  source: string,
  argumentStart: number,
  rangeStart: number
): boolean {
  const precedingText = source.slice(rangeStart, argumentStart).trimEnd();
  const precedingWord = /([\p{L}]+)$/u.exec(precedingText)?.[1];
  if (!precedingWord) {
    return false;
  }
  const expansion = routineContractions.get(
    precedingWord.toLocaleLowerCase('pt-BR')
  )?.split(' ');
  return Boolean(expansion && ['o', 'a', 'os', 'as'].includes(expansion[expansion.length - 1]));
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
  implicitDefiniteArticle = false,
  diagnostics?: ParserDiagnostic[]
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
      implicitDefiniteArticle,
      diagnostics
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
    variableAccesses,
    implicitDefiniteArticle,
    diagnostics
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
  return resolveIndefiniteTypeArgument(source, argument, symbols);
}

function resolveIndefiniteTypeArgument(
  source: string,
  argument: SourceRange,
  symbols: TypeSymbolTable
): TypeReference | undefined {
  const article = readWord(source, argument.start, argument.end);
  if (!article || !indefiniteArticles.has(article.value.toLocaleLowerCase('pt-BR'))) {
    return undefined;
  }
  let typeRange = trimRange(source, article.end, argument.end);
  if (typeRange.start === typeRange.end) {
    return undefined;
  }
  let type = symbols.lookup(source.slice(typeRange.start, typeRange.end));
  if (!type) {
    const modifier = readWord(source, typeRange.start, typeRange.end);
    if (
      modifier &&
      ['outro', 'outra', 'outros', 'outras'].includes(
        modifier.value.toLocaleLowerCase('pt-BR')
      )
    ) {
      typeRange = trimRange(source, modifier.end, typeRange.end);
      type = symbols.lookup(source.slice(typeRange.start, typeRange.end));
    }
  }
  return type
    ? createSyntheticTypeReference(type.name, typeRange)
    : undefined;
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
    ![
      actualType.normalizedName,
      normalizeTypeName(actualType.pluralName)
    ].includes(normalizeTypeName(source.slice(typeRange.start, typeRange.end)))
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

  const typeNameRange = trimTypeCastNameAtPreposition(
    source,
    trimRange(source, article.end, typeRange.end)
  );
  if (typeNameRange.start === typeNameRange.end) {
    return undefined;
  }
  const type = symbols.lookup(source.slice(typeNameRange.start, typeNameRange.end));
  if (!type) {
    return undefined;
  }
  return {
    valueRange,
    type: createTypeReference(source, typeNameRange)
  };
}

function trimTypeCastNameAtPreposition(
  source: string,
  typeName: SourceRange
): SourceRange {
  const words = /\p{L}+/gu;
  words.lastIndex = typeName.start;
  let match: RegExpExecArray | null;
  while ((match = words.exec(source)) && match.index < typeName.end) {
    const word = match[0].toLocaleLowerCase('pt-BR');
    const contractionPreposition = routineContractions.get(word)?.split(' ')[0];
    if (word === 'em' || contractionPreposition === 'em') {
      return trimRange(source, typeName.start, match.index);
    }
  }
  return typeName;
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
  variableAccesses: RoutineVariableAccess[] = [],
  implicitDefiniteArticle = false,
  diagnostics?: ParserDiagnostic[]
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
  if (!hasArticle && !implicitDefiniteArticle && !firstIsTypeOperator) {
    return undefined;
  }
  const fieldRanges = [
    trimRange(
      source,
      hasArticle ? firstArticle!.end : segments[0].start,
      segments[0].end
    ),
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
  const rootLocalVariable = findRoutineVariable(caller, rootName);
  const globalVariable = rootLocalVariable
    ? undefined
    : globalVariables.lookup(rootName);
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
  if (fieldRanges.length === 1) {
    const fieldRange = fieldRanges[0];
    const fieldName = normalizeTypeName(
      source.slice(fieldRange.start, fieldRange.end)
    );
    const globalField = findGlobalVariableField(
      globalVariable,
      fieldName,
      symbols
    );
    if (globalField) {
      fieldAccesses.push({
        reference: createTypeReference(source, fieldRange),
        target: globalField
      });
      return globalField.kind === 'named'
        ? globalField.type
        : globalField.elementType;
    }
    const matches = findNestedStructureFields(
      currentType.name,
      fieldName,
      symbols
    );
    if (matches.length > 1) {
      const message = `Ambiguous structure field access "${source.slice(fieldRange.start, fieldRange.end).trim()}".`;
      if (!diagnostics?.some(diagnostic =>
        diagnostic.message === message &&
        diagnostic.range.start === fieldRange.start &&
        diagnostic.range.end === fieldRange.end
      )) {
        diagnostics?.push({ message, range: fieldRange });
      }
      return undefined;
    }
    if (matches.length === 1) {
      const field = matches[0];
      fieldAccesses.push({
        reference: createTypeReference(source, fieldRange),
        target: field
      });
      return field.type;
    }
  }

  for (let index = 0; index < fieldRanges.length; index++) {
    const fieldRange = fieldRanges[index];
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
        currentType = member.kind === 'named' ? member.type : member.elementType;
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

    let field = index === 0
      ? findGlobalVariableField(globalVariable, fieldName, symbols) ??
        findStructureField(currentType.name, fieldName, symbols)
      : findStructureField(currentType.name, fieldName, symbols);
    if (!field) {
      const nestedFields = findNestedStructureFields(
        currentType.name,
        fieldName,
        symbols
      );
      if (nestedFields.length > 1) {
        const message = `Ambiguous structure field access "${source.slice(fieldRange.start, fieldRange.end).trim()}".`;
        if (!diagnostics?.some(diagnostic =>
          diagnostic.message === message &&
          diagnostic.range.start === fieldRange.start &&
          diagnostic.range.end === fieldRange.end
        )) {
          diagnostics?.push({ message, range: fieldRange });
        }
        return undefined;
      }
      field = nestedFields[0];
    }
    if (!field) {
      const computedField = findComputedFieldRoutine(
        currentType.name,
        fieldName,
        routines,
        symbols
      );
      if (!computedField?.computedField?.valueType) {
        const listElementType = resolveListSpecialField(
          source,
          currentType,
          fieldRange,
          symbols,
          caller
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
    currentType = field.kind === 'named' ? field.type : field.elementType;
  }
  fieldAccesses.push(...resolvedAccesses);
  return currentType;
}

function resolveListSpecialField(
  source: string,
  listType: TypeReference,
  range: SourceRange,
  symbols: TypeSymbolTable,
  caller: RoutineDeclaration
): TypeReference | undefined {
  if (symbols.getBaseTypeDistance(listType.name, 'lista') === undefined) {
    return undefined;
  }

  const rawFieldName = source.slice(range.start, range.end);
  const prefixForm = /^(primeiro|primeira|último|última|próximo|próxima)\s+(.+)$/iu.exec(rawFieldName);
  const suffixForm = /^(.+)\s+(anterior|precedente)$/iu.exec(rawFieldName);
  const match = prefixForm ?? suffixForm;
  if (!match) {
    return undefined;
  }
  const accessWord = (prefixForm ? match[1] : match[2]).toLocaleLowerCase('pt-BR');
  const elementName = prefixForm ? match[2] : match[1];
  const accessKind: RoutineListSpecialFieldAccess['kind'] =
    ['primeiro', 'primeira'].includes(accessWord)
      ? 'first'
      : ['último', 'última'].includes(accessWord)
        ? 'last'
        : ['próximo', 'próxima'].includes(accessWord)
          ? 'next'
          : 'previous';
  const elementNameStart = rawFieldName.indexOf(elementName);
  const elementRange = trimRange(
    source,
    range.start + elementNameStart,
    range.start + elementNameStart + elementName.length
  );
  const elementSymbol = symbols.lookup(elementName);
  if (!elementSymbol) {
    return undefined;
  }

  const access: RoutineListSpecialFieldAccess = {
    kind: accessKind,
    reference: createTypeReference(source, range),
    listType: createSyntheticTypeReference(listType.name, range),
    elementType: createSyntheticTypeReference(elementSymbol.name, elementRange)
  };
  if (!caller.listSpecialFieldAccesses.some(existing =>
    existing.kind === access.kind &&
    existing.reference.range.start === access.reference.range.start &&
    existing.reference.range.end === access.reference.range.end
  )) {
    caller.listSpecialFieldAccesses.push(access);
  }
  return access.elementType;
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
    let pointer = symbols.lookup(type.name);
    const visited = new Set<TypeSymbol>();
    while (pointer && !visited.has(pointer)) {
      if (pointer.pointedType) {
        return createSyntheticTypeReference(pointer.pointedType.name, type.range);
      }
      visited.add(pointer);
      pointer = pointer.baseType
        ? symbols.lookup(pointer.baseType.name)
        : undefined;
    }
    return undefined;
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
): TypeField | undefined {
  let symbol = symbols.lookup(typeName);
  const visited = new Set<TypeSymbol>();
  while (symbol && !visited.has(symbol)) {
    visited.add(symbol);
    const field = symbol.fields?.find(candidate =>
      candidate.name &&
      normalizeTypeName(candidate.name.name) === fieldName
    );
    if (field) {
      return field;
    }
    symbol = symbol.baseType ? symbols.lookup(symbol.baseType.name) : undefined;
  }
  return undefined;
}

function findGlobalVariableField(
  variable: GlobalVariableSymbol | undefined,
  fieldName: string,
  symbols: TypeSymbolTable
): TypeField | undefined {
  return variable?.declaration.fields?.find(field =>
    field.name &&
    (
      normalizeTypeName(field.name.name) === fieldName ||
      field.kind === 'named' && isSingularListFieldAlias(field, fieldName, symbols)
    )
  );
}

function findNestedStructureFields(
  typeName: string,
  fieldName: string,
  symbols: TypeSymbolTable,
  ancestors: Set<string> = new Set()
): NamedTypeField[] {
  const symbol = symbols.lookup(typeName);
  if (!symbol || ancestors.has(symbol.normalizedName)) {
    return [];
  }

  const nestedAncestors = new Set(ancestors);
  nestedAncestors.add(symbol.normalizedName);
  const visibleFields: NamedTypeField[] = [];
  const visibleNames = new Set<string>();
  const visited = new Set<TypeSymbol>();
  let currentSymbol: TypeSymbol | undefined = symbol;
  while (currentSymbol && !visited.has(currentSymbol)) {
    visited.add(currentSymbol);
    for (const field of currentSymbol.fields ?? []) {
      if (field.kind !== 'named') {
        continue;
      }
      const normalizedName = normalizeTypeName(field.name.name);
      if (!visibleNames.has(normalizedName)) {
        visibleNames.add(normalizedName);
        visibleFields.push(field);
      }
    }
    currentSymbol = currentSymbol.baseType
      ? symbols.lookup(currentSymbol.baseType.name)
      : undefined;
  }

  const matches: NamedTypeField[] = [];
  for (const field of visibleFields) {
    if (
      normalizeTypeName(field.name.name) === fieldName ||
      isSingularListFieldAlias(field, fieldName, symbols)
    ) {
      matches.push(field);
    }
    if (
      symbols.getBaseTypeDistance(field.type.name, 'estrutura') !== undefined ||
      symbols.getBaseTypeDistance(field.type.name, 'lista') !== undefined
    ) {
      matches.push(...findNestedStructureFields(
        field.type.name,
        fieldName,
        symbols,
        nestedAncestors
      ));
    }
  }
  return matches;
}

function isSingularListFieldAlias(
  field: NamedTypeField,
  fieldName: string,
  symbols: TypeSymbolTable
): boolean {
  const fieldType = symbols.lookup(field.type.name);
  return Boolean(
    fieldType &&
    symbols.getBaseTypeDistance(fieldType.name, 'lista') !== undefined &&
    normalizeTypeName(fieldType.name) === fieldName &&
    normalizeTypeName(field.name.name) === normalizeTypeName(fieldType.pluralName)
  );
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
  return localVariable ??
    routine.parameters.find(parameter => parameter.name.normalizedName === name) ??
    (routine.returnParameter?.name.normalizedName === name
      ? routine.returnParameter
      : undefined);
}

function isCompatibleType(
  actual: TypeReference,
  expected: TypeReference,
  symbols: TypeSymbolTable
): boolean {
  return nullLiteralWords.has(actual.normalizedName) ||
    getRoutineArgumentTypeDistance(actual, expected.name, symbols) !== undefined ||
    actual.normalizedName === expected.normalizedName;
}

function getRoutineArgumentTypeDistance(
  actual: TypeReference,
  expectedName: string,
  symbols: TypeSymbolTable
): number | undefined {
  if (nullLiteralWords.has(actual.normalizedName)) {
    return 0;
  }

  const exactDistance = symbols.getBaseTypeDistance(actual.name, expectedName);
  if (exactDistance !== undefined) {
    return exactDistance;
  }

  const expectedSymbol = symbols.lookup(expectedName);
  const reverseDistance = expectedSymbol?.isScalar &&
    expectedSymbol.scale === '1/1' &&
    isNumberTypeName(actual.name)
    ? symbols.getBaseTypeDistance(expectedName, actual.name)
    : undefined;
  if (reverseDistance !== undefined) {
    return -reverseDistance;
  }

  const actualSymbol = symbols.lookup(actual.name);
  if (
    actualSymbol?.isScalar &&
    expectedSymbol?.isScalar &&
    actualSymbol.scale === expectedSymbol.scale
  ) {
    return 0;
  }

  return symbols.getPluralMatches(expectedName)
    .map(symbol => symbols.getBaseTypeDistance(actual.name, symbol.name))
    .find((distance): distance is number => distance !== undefined);
}

function getLiteralRoutineArgumentTypeDistance(
  source: string,
  argument: SourceRange,
  expectedName: string,
  symbols: TypeSymbolTable
): number | undefined {
  const literal = parseGlobalVariableLiteral(source, argument);
  if (!literal || literal.kind === 'null') {
    return undefined;
  }

  const candidateTypes = literal.kind === 'integer'
    ? [
      ...(Number(literal.text) >= 0 && Number(literal.text) <= 255 ? ['byte'] : []),
      'número'
    ]
    : literal.kind === 'fraction' || literal.kind === 'mixed'
      ? ['fração']
      : literal.kind === 'hexadecimal'
        ? ['texto hexadecimal']
        : ['string'];
  const distances = candidateTypes
    .map(typeName => symbols.getBaseTypeDistance(expectedName, typeName))
    .filter((distance): distance is number => distance !== undefined);

  return distances.length
    ? -Math.min(...distances)
    : undefined;
}

function resolveRoutineExpressionType(
  source: string,
  argument: SourceRange,
  caller: RoutineDeclaration,
  globalVariables: GlobalVariableSymbolTable,
  symbols: TypeSymbolTable,
  fieldAccesses: RoutineFieldAccess[],
  routines: RoutineDeclaration[],
  computedFieldAccesses: RoutineComputedFieldAccess[],
  variableAccesses: RoutineVariableAccess[],
  diagnostics?: ParserDiagnostic[]
): TypeReference | undefined {
  const expression = parseRoutineExpression(source, argument, []);
  if (!expression || expression.kind === 'operand') {
    return undefined;
  }

  const resolveType = (node: RoutineExpression): TypeReference | undefined => {
    if (node.kind === 'unary') {
      return resolveType(node.operand);
    }
    if (node.kind === 'operand') {
      return resolveRoutineArgumentType(
        source,
        node.range,
        caller,
        globalVariables,
        symbols,
        fieldAccesses,
        routines,
        computedFieldAccesses,
        variableAccesses,
        node.implicitDefiniteArticle ?? false,
        diagnostics
      );
    }
    if (![
      'mais',
      'menos',
      'vezes',
      'dividido por',
      'junto com',
      'seguido de',
      '/'
    ].includes(node.operator)) {
      return undefined;
    }

    const leftType = resolveType(node.left);
    const rightType = resolveType(node.right);
    if (!leftType || !rightType) {
      return undefined;
    }

    if (node.operator === 'junto com' || node.operator === 'seguido de') {
      return isStringConvertibleType(leftType, routines, symbols) &&
        isStringConvertibleType(rightType, routines, symbols)
        ? createSyntheticTypeReference('string', node.range)
        : undefined;
    }

    const numericTypes = ['fração', 'número', 'byte'];
    const leftBase = numericTypes.find(typeName =>
      symbols.getBaseTypeDistance(leftType.name, typeName) !== undefined
    );
    const rightBase = numericTypes.find(typeName =>
      symbols.getBaseTypeDistance(rightType.name, typeName) !== undefined
    );
    if (!leftBase || !rightBase) {
      return undefined;
    }

    const resultBase = node.operator === 'dividido por' || node.operator === '/' ||
      leftBase === 'fração' || rightBase === 'fração'
      ? 'fração'
      : leftBase === 'número' || rightBase === 'número'
        ? 'número'
        : 'byte';
    return createSyntheticTypeReference(resultBase, node.range);
  };

  return resolveType(expression);
}

function isStringConvertibleType(
  actualType: TypeReference,
  routines: RoutineDeclaration[],
  symbols: TypeSymbolTable
): boolean {
  if (getRoutineArgumentTypeDistance(actualType, 'string', symbols) !== undefined) {
    return true;
  }

  return routines.some(routine =>
    normalizeRoutineName(routine.name.name) === 'atribua' &&
    routine.parameters.length === 2 &&
    symbols.getBaseTypeDistance(routine.parameters[1].type.name, 'string') !== undefined &&
    getRoutineArgumentTypeDistance(actualType, routine.parameters[0].type.name, symbols) !== undefined
  );
}

function getRoutineExpressionTypeDistance(
  expressionType: TypeReference,
  expectedName: string,
  symbols: TypeSymbolTable
): number | undefined {
  const directDistance = getRoutineArgumentTypeDistance(
    expressionType,
    expectedName,
    symbols
  );
  if (directDistance !== undefined) {
    return directDistance;
  }

  const expectedDistance = symbols.getBaseTypeDistance(
    expectedName,
    expressionType.name
  );
  if (expectedDistance !== undefined) {
    return -expectedDistance;
  }

  const pluralDistances = symbols.getPluralMatches(expectedName)
    .map(symbol => symbols.getBaseTypeDistance(symbol.name, expressionType.name))
    .filter((distance): distance is number => distance !== undefined);
  return pluralDistances.length
    ? -Math.min(...pluralDistances)
    : undefined;
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
      const type = symbols.lookup(candidateName);
      if (!type) {
        continue;
      }
      const typeStart = typeRange.start + typeWords[firstWord].index!;
      resolvedType = createSyntheticTypeReference(type.name, {
        start: typeStart,
        end: typeRange.end
      });
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
      range: { start: articleMatch.index, end: declarationEnd },
      implicit: !marker
    };
    articles.lastIndex = declarationEnd;
  }
  return localVariable;
}

function parseRoutineStatementLocalVariables(
  source: string,
  statement: SourceRange,
  symbols: TypeSymbolTable
): RoutineLocalVariable[] {
  const quotedRanges = findQuotedRanges(source, statement);
  const articles: SourceRange[] = [];
  const words = /\p{L}+/gu;
  words.lastIndex = statement.start;
  let match: RegExpExecArray | null;
  while ((match = words.exec(source)) && match.index < statement.end) {
    if (!indefiniteArticles.has(match[0].toLocaleLowerCase('pt-BR'))) {
      continue;
    }
    const range = { start: match.index, end: match.index + match[0].length };
    if (quotedRanges.some(quoted =>
      range.start >= quoted.start && range.end <= quoted.end
    )) {
      continue;
    }
    articles.push(range);
  }

  const variables: RoutineLocalVariable[] = [];
  for (let index = 0; index < articles.length; index++) {
    const article = articles[index];
    const argumentEnd = articles[index + 1]?.start ?? statement.end;
    const candidate = parseLocalVariableDeclaration(
      source,
      trimRange(source, article.start, argumentEnd),
      symbols
    );
    if (candidate) {
      variables.push(candidate);
    }
  }
  return variables;
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
): TypeField | undefined {
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
    for (const deallocation of routine.memoryDeallocations) {
      const access = deallocation.fieldAccesses?.find(candidate =>
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
    return field.kind === 'named' ? field.type : field.elementType;
  }

  for (const routine of parsedDocument.routines) {
    const allocationAccess = routine.memoryAllocations
      .map(allocation => allocation.variableAccess)
      .find(access => access &&
        offset >= access.reference.range.start &&
        offset <= access.reference.range.end
      );
    const deallocationAccess = routine.memoryDeallocations
      .map(deallocation => deallocation.variableAccess)
      .find(access => access &&
        offset >= access.reference.range.start &&
        offset <= access.reference.range.end
      );
    const memoryAccess = allocationAccess ?? deallocationAccess;
    if (memoryAccess) {
      return memoryAccess.type;
    }
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
  isCompatible: boolean;
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
      const firstHeaderWordStart = skipWhitespace(
        headerSyntaxSource,
        headerPattern.lastIndex,
        headerEnd
      );
      const firstHeaderWord = readWord(
        headerSyntaxSource,
        firstHeaderWordStart,
        headerEnd
      );
      const isCompatible = firstHeaderWord?.value.toLocaleLowerCase('pt-BR') ===
        'compativelmente';
      const routineNameStart = isCompatible
        ? firstHeaderWord.end
        : headerPattern.lastIndex;
      const returningMarker = findWord(headerSyntaxSource, headerPattern.lastIndex, headerEnd, 'retornando');
      const signatureEnd = Math.min(
        returningMarker?.start ?? headerEnd,
        qualifier?.start ?? headerEnd
      );
      const computedField = parseComputedFieldHeader(
        headerSyntaxSource,
        routineNameStart,
        headerEnd
      );
      const firstParameterArticle = findAnyWord(
        headerSyntaxSource,
        routineNameStart,
        signatureEnd,
        indefiniteArticles
      );
      const parameterArticle = firstParameterArticle;
      const predicateMarker = isBooleanFunction
        ? findAnyWord(
          headerSyntaxSource,
          parameterArticle?.end ?? routineNameStart,
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
          ...parseRoutineParameters(
            headerSyntaxSource,
            parameterArticle.start,
            predicateMarker.start,
            diagnostics
          ),
          ...(predicateTailArticle
            ? parseRoutineParameters(
              headerSyntaxSource,
              predicateTailArticle.start,
              signatureEnd,
              diagnostics
            )
            : [])
        ]
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
        ? trimRange(source, routineNameStart, computedField.returnMarker.start)
        : trimRange(source, routineNameStart, nameEnd);
      if (nameRange.start === nameRange.end) {
        diagnostics.push({
          message: 'Routine name is required.',
          range: { start: match.index, end: headerEnd }
        });
        headerPattern.lastIndex = headerEnd + 1;
        continue;
      }
      for (const [reservedKeyword, displayName] of reservedStatementKeywordDisplayNames) {
        const reservedWord = findWord(headerSyntaxSource, nameRange.start, nameRange.end, reservedKeyword);
        if (!reservedWord) {
          continue;
        }
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
        isCompatible,
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
        if (hasEquivalentRoutineSignature(source, alternate, header)) {
          diagnostics.push({
            message: 'Alternate routine header is semantically equivalent to the primary header.',
            range: alternate.name.range
          });
        }
      }
      declarations.push({
        bindingId: `routine:${normalizeTypeName(
          source.slice(header.range.start, header.range.end)
        )}`,
        name: header.name,
        qualifier: header.qualifier,
        alternateNames: alternateHeaders.map(alternate => ({
          ...alternate.name,
          qualifier: alternate.qualifier
        })),
        alternateParameters: alternateHeaders.map(alternate => alternate.parameters),
        parameters: header.parameters,
        preservedParameters: [],
        assignments: [],
        outputs: [],
        returnStatements: [],
        simpleInstructions: [],
        localVariables: [],
        conditionals: [],
        loopBlocks: [],
        statements: [],
        processes: [],
        loopInstructions: [],
        computedFieldAccesses: [],
        listSpecialFieldAccesses: [],
        computedField: header.computedField,
        returnParameter: header.returnParameter,
        calls: [],
        memoryAllocations: [],
        memoryDeallocations: [],
        annotation: header.annotation,
        isBooleanFunction: header.isBooleanFunction,
        isCompatible: header.isCompatible ||
          alternateHeaders.some(alternate => alternate.isCompatible),
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
  source: string,
  alternate: ParsedRoutineHeader,
  primary: ParsedRoutineHeader
): boolean {
  return normalizeRoutineName(alternate.name.name) === normalizeRoutineName(primary.name.name) &&
    alternate.qualifier === primary.qualifier &&
    alternate.parameters.length === primary.parameters.length &&
    alternate.parameters.every((parameter, index) =>
      parameter.type.normalizedName === primary.parameters[index].type.normalizedName
    ) &&
    areEquivalentRoutineParameterSeparators(
      getHeaderRoutineParameterSeparators(source, alternate.parameters),
      getHeaderRoutineParameterSeparators(source, primary.parameters)
    );
}

function areEquivalentRoutineParameterSeparators(
  first: string[][],
  second: string[][]
): boolean {
  return first.length === second.length &&
    first.every((separators, index) =>
      separators.length === second[index].length &&
      separators.every((word, wordIndex) =>
        normalizeRoutineSeparatorWord(word) ===
        normalizeRoutineSeparatorWord(second[index][wordIndex])
      )
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
    const words = /[\p{L}\p{N}_]+(?:-[\p{L}\p{N}_]+)*/gu;
    words.lastIndex = start;
    let match: RegExpExecArray | null;
    while ((match = words.exec(source)) && match.index < end) {
      const wordEnd = match.index + match[0].length;
      const word = match[0].toLocaleLowerCase('pt-BR');
      const isIndefiniteArticle = indefiniteArticles.has(word);
      const nextWordStart = skipWhitespace(source, wordEnd, end);
      const nextWord = readWord(source, nextWordStart, end);
      const isDeNameEnder = word === 'de' &&
        nextWord !== undefined &&
        (indefiniteArticles.has(nextWord.value.toLocaleLowerCase('pt-BR')) ||
          definiteArticles.has(nextWord.value.toLocaleLowerCase('pt-BR')));
      const previousWord = source.slice(start, match.index).match(/\p{L}+\s*$/u)?.[0]
        .trim()
        .toLocaleLowerCase('pt-BR');
      const isParameterStart = isIndefiniteArticle &&
        match.index > start &&
        !reservedIdentifierWords.has(previousWord ?? '');
      if (
        (!routineNameDelimiters.has(word) &&
          !conjunctions.has(word) &&
          !isParameterStart &&
          !isDeNameEnder) ||
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
      if (isDeNameEnder) {
        separator = { start: match.index, nextStart: nextWordStart };
        break;
      }
      const nextParameter = findAnyWord(source, wordEnd, end, indefiniteArticles);
      if (nextParameter) {
        separator = { start: match.index, nextStart: nextParameter.start };
        break;
      }
      if (word === 'ou') {
        separator = { start: match.index, nextStart: end };
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
  const words = /[\p{L}\p{N}_]+(?:-[\p{L}\p{N}_]+)*/gu;
  words.lastIndex = start;
  let match: RegExpExecArray | null;
  while ((match = words.exec(source)) && match.index < end) {
    const word = match[0].toLocaleLowerCase('pt-BR');
    if (!routineNameDelimiters.has(word)) {
      continue;
    }

    const wordEnd = match.index + match[0].length;
    const nextArticle = findAnyWord(source, wordEnd, end, indefiniteArticles);
    if (!nextArticle) {
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
        ...routine.alternateParameters.flat(),
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

function maskComments(
  source: string,
  diagnostics: ParserDiagnostic[],
  commentRanges: SourceRange[]
): { source: string; complete: boolean } {
  let characters: Uint16Array | undefined;
  const ensureCharacters = (): Uint16Array => {
    if (!characters) {
      characters = new Uint16Array(source.length);
      for (let index = 0; index < source.length; index++) {
        characters[index] = source.charCodeAt(index);
      }
    }
    return characters;
  };
  let inString = false;
  let inBlockComment = false;
  let blockCommentStart = -1;
  let parenthesisDepth = 0;
  let balancedParentheses = true;

  for (let index = 0; index < source.length; index++) {
    const character = source[index];
    const nextCharacter = source[index + 1];

    if (inBlockComment) {
      const maskedCharacters = ensureCharacters();
      if (character === ']') {
        maskedCharacters[index] = 32;
        inBlockComment = false;
        commentRanges.push({ start: blockCommentStart, end: index + 1 });
        blockCommentStart = -1;
      } else if (/[\p{Cc}]/u.test(character)) {
        diagnostics.push({
          message: 'Non-printable characters are not allowed in comments.',
          range: { start: index, end: index + 1 }
        });
        if (character !== '\n' && character !== '\r') {
          maskedCharacters[index] = 32;
        }
      } else {
        maskedCharacters[index] = 32;
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
      ensureCharacters()[index] = 32;
      inBlockComment = true;
      blockCommentStart = index;
      continue;
    }

    if (character === '\\') {
      const maskedCharacters = ensureCharacters();
      maskedCharacters[index] = 32;
      const commentStart = index;
      for (; index < source.length; index++) {
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
        maskedCharacters[index] = 32;
      }
      commentRanges.push({
        start: commentStart,
        end: index < source.length ? index : source.length
      });
      continue;
    }

    if (character === '(') {
      parenthesisDepth++;
    } else if (character === ')') {
      if (parenthesisDepth === 0) {
        balancedParentheses = false;
      } else {
        parenthesisDepth--;
      }
    }
  }

  if (blockCommentStart !== -1) {
    commentRanges.push({
      start: blockCommentStart,
      end: source.length
    });
  }

  const maskedCharacters = characters;
  if (!maskedCharacters) {
    return {
      source,
      complete: !inString && !inBlockComment &&
        parenthesisDepth === 0 && balancedParentheses
    };
  }

  const chunks: string[] = [];
  const chunkSize = 8192;
  for (let start = 0; start < maskedCharacters.length; start += chunkSize) {
    chunks.push(String.fromCharCode(...maskedCharacters.subarray(
      start,
      Math.min(start + chunkSize, maskedCharacters.length)
    )));
  }
  return {
    source: chunks.join(''),
    complete: !inString && !inBlockComment &&
      parenthesisDepth === 0 && balancedParentheses
  };
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

function getOutOfRangeIntegerLiteralRange(
  source: string,
  range: SourceRange
): SourceRange | undefined {
  const text = source.slice(range.start, range.end);
  if (!/^[+-]?\d+$/u.test(text)) {
    return undefined;
  }

  const value = BigInt(text);
  return value < -2147483648n || value > 2147483647n
    ? range
    : undefined;
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
    for (const allocation of routine.memoryAllocations) {
      if (
        !allocation.variableAccess &&
        offset >= allocation.type.range.start &&
        offset <= allocation.type.range.end
      ) {
        return allocation.type;
      }
    }
    for (const deallocation of routine.memoryDeallocations) {
      if (
        !deallocation.variableAccess &&
        offset >= deallocation.type.range.start &&
        offset <= deallocation.type.range.end
      ) {
        return deallocation.type;
      }
    }
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
      const callTypeReference = call.typeReferences?.find(reference =>
        offset >= reference.range.start &&
        offset <= reference.range.end
      );
      if (callTypeReference) {
        return callTypeReference;
      }
      if (
        call.addressType &&
        offset >= call.addressType.range.start &&
        offset <= call.addressType.range.end
      ) {
        return call.addressType;
      }
      for (const localVariable of call.localVariables ?? []) {
        if (
          offset >= localVariable.type.range.start &&
          offset <= localVariable.type.range.end
        ) {
          return localVariable.type;
        }
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
const fieldOwnersByDocument = new WeakMap<
  ParsedDocument,
  WeakMap<TypeField, string>
>();

export function getParsedReferences(
  parsed: ParsedDocument,
  onProfile?: (metrics: ParsedReferencesMetrics) => void
): ParsedReference[] {
  const startedAt = onProfile ? performance.now() : 0;
  const cachedReferences = parsedReferencesCache.get(parsed);
  if (cachedReferences) {
    if (onProfile) {
      onProfile({
        durationMs: performance.now() - startedAt,
        references: cachedReferences.length,
        cacheHit: true
      });
    }
    return cachedReferences;
  }

  const references: ParsedReference[] = [];
  const add = (
    kind: ParsedReference['kind'],
    name: string,
    range: SourceRange,
    options: Pick<
      ParsedReference,
      'scope' | 'container' | 'declaration' | 'symbolId'
    > = {}
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
      const name = access.target.name;
      if (name) {
        add('field', name.name, access.reference.range, {
          container: normalizeTypeName(ownerTypeName ?? findFieldOwner(access.target, parsed) ?? '')
        });
      }
    }
  };
  const addComputedFieldAccesses = (
    accesses: RoutineComputedFieldAccess[] | undefined
  ): void => {
    for (const access of accesses ?? []) {
      const field = access.target.computedField;
      if (!field) {
        continue;
      }
      add('field', field.name.name, access.reference.range, {
        container: normalizeTypeName(field.structureType.name)
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
  const routineSymbolId = (routine: RoutineDeclaration): string =>
    routine.bindingId ?? `routine:${JSON.stringify([
      routine.name.normalizedName,
      normalizeTypeName(routine.qualifier ?? ''),
      routine.parameters.map(parameter =>
        parameter.type.normalizedName
      ),
      routine.range.start,
      routine.range.end
    ])}`;
  for (const routine of parsed.routines) {
    const routineName = normalizeTypeName(routine.name.name);
    const symbolId = routineSymbolId(routine);
    add('routine', routineName, routine.name.range, {
      declaration: true,
      symbolId
    });
    for (const alias of routine.alternateNames) {
      add('routine', routineName, alias.range, {
        declaration: true,
        symbolId
      });
    }
    for (const parameter of routine.parameters) {
      add('variable', parameter.name.name, parameter.name.range, {
        scope: routine.range.start,
        declaration: true
      });
      addType(parameter.type);
    }
    for (const parameter of routine.alternateParameters.flat()) {
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
        add('routine', call.target.name.name, call.name.range, {
          symbolId: routineSymbolId(call.target)
        });
      }
      addType(call.addressType);
      call.typeReferences?.forEach(reference => addType(reference));
      addVariableAccesses(call.variableAccesses, routine);
      addFieldAccesses(call.fieldAccesses);
      addComputedFieldAccesses(call.computedFieldAccesses);
    }
    for (const allocation of routine.memoryAllocations) {
      addType(allocation.variableAccess ? undefined : allocation.type);
      addVariableAccesses(
        allocation.variableAccess ? [allocation.variableAccess] : undefined,
        routine
      );
    }
    for (const deallocation of routine.memoryDeallocations) {
      addType(deallocation.variableAccess ? undefined : deallocation.type);
      addVariableAccesses(
        deallocation.variableAccess ? [deallocation.variableAccess] : undefined,
        routine
      );
      addFieldAccesses(deallocation.fieldAccesses);
    }
    for (const process of routine.processes) {
      addVariableAccesses(process.variableAccesses, routine);
      addFieldAccesses(process.fieldAccesses);
      addComputedFieldAccesses(process.computedFieldAccesses);
    }
    for (const instruction of routine.simpleInstructions) {
      addVariableAccesses(instruction.variableAccesses, routine);
    }
    for (const access of routine.listSpecialFieldAccesses) {
      add('field', access.reference.name, access.reference.range, {
        container: 'lista'
      });
      addType(access.elementType);
    }
    addComputedFieldAccesses(routine.computedFieldAccesses);
  }

  parsedReferencesCache.set(parsed, references);
  if (onProfile) {
    onProfile({
      durationMs: performance.now() - startedAt,
      references: references.length,
      cacheHit: false
    });
  }
  return references;
}


function findFieldOwner(field: TypeField, parsed: ParsedDocument): string | undefined {
  let owners = fieldOwnersByDocument.get(parsed);
  if (!owners) {
    owners = new WeakMap();
    for (const declaration of parsed.declarations) {
      for (const declaredField of declaration.fields ?? []) {
        owners.set(declaredField, declaration.name.name);
      }
    }
    for (const declaration of parsed.globalVariables) {
      for (const declaredField of declaration.fields ?? []) {
        owners.set(
          declaredField,
          declaration.type?.name ?? declaration.name.name
        );
      }
    }
    for (const symbol of parsed.symbols.entries) {
      for (const declaredField of symbol.fields ?? []) {
        if (!owners.has(declaredField)) {
          owners.set(declaredField, symbol.name);
        }
      }
    }
    fieldOwnersByDocument.set(parsed, owners);
  }
  return owners.get(field);
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
    scalarFactorRange: scalarFactor
      ? { start: scalarFactor.start, end: scalarFactor.end }
      : undefined,
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
      !isIdentifierJoiner(match.index > start ? source[match.index - 1] : '') &&
      !isWordCharacter(wordEnd < end ? source[wordEnd] : '') &&
      !isIdentifierJoiner(wordEnd < end ? source[wordEnd] : '') &&
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
  let separator: { start: number; nextStart: number } | undefined;
  if (commaIndex !== -1 && commaIndex < end) {
    let nextStart = skipWhitespace(source, commaIndex + 1, end);
    const conjunction = readWord(source, nextStart, end);
    if (conjunction?.value.toLocaleLowerCase('pt-BR') === 'e') {
      const afterConjunction = skipWhitespace(source, conjunction.end, end);
      const nextArticle = readWord(source, afterConjunction, end);
      if (nextArticle && indefiniteArticles.has(nextArticle.value.toLocaleLowerCase('pt-BR'))) {
        nextStart = afterConjunction;
      }
    }
    separator = { start: commaIndex, nextStart };
  }
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
      !isIdentifierJoiner(previousCharacter) &&
      !isWordCharacter(nextCharacter) &&
      !isIdentifierJoiner(nextCharacter) &&
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
