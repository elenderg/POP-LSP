export interface SourceRange {
    start: number;
    end: number;
}
export declare function getParserRegionKey(region: ParserRegion, occurrence?: number): string;
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
export type ExpressionOperator = 'mais' | 'menos' | 'vezes' | 'dividido por' | 'junto com' | 'seguido de' | '/';
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
export type RoutineExpression = RoutineExpressionOperand | RoutineExpressionBinary | RoutineExpressionUnary;
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
export declare class RoutineSymbolTable {
    private readonly routines;
    constructor(declarations?: RoutineDeclaration[]);
    lookup(name: string): RoutineDeclaration | undefined;
    get entries(): RoutineDeclaration[];
}
export interface GlobalVariableSymbol {
    name: string;
    normalizedName: string;
    typeName?: string;
    type?: TypeReference;
    declaration: GlobalVariableDeclaration;
}
export declare class GlobalVariableSymbolTable {
    private readonly symbols;
    constructor(declarations?: GlobalVariableDeclaration[]);
    lookup(name: string): GlobalVariableSymbol | undefined;
    get entries(): GlobalVariableSymbol[];
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
export declare class TypeSymbolTable {
    private readonly symbols;
    private readonly names;
    private readonly symbolsByPluralName;
    private readonly symbolEntries;
    private scalarTypeNames;
    private readonly inheritanceEntryTimes;
    private readonly inheritanceExitTimes;
    private readonly inheritanceDepths;
    private readonly scaleResolutionStates;
    constructor(declarations?: TypeDeclaration[], onDependencyProfile?: (durationMs: number, startTimeMs: number, endTimeMs: number) => void);
    lookup(name: string): TypeSymbol | undefined;
    getBaseTypeDistance(actualName: string, expectedName: string): number | undefined;
    get entries(): readonly TypeSymbol[];
    getPluralMatches(name: string): readonly TypeSymbol[];
    get scalarNames(): readonly string[];
    private addPrimitive;
    private addName;
    private indexResolvedTypeNames;
    private buildInheritanceIndex;
    private resolveScale;
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
    reusableSemanticRegions?: {
        source: string;
        parsed: ParsedDocument;
        regionKeys: ReadonlySet<string>;
    };
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
export type ParsedSyntaxRegion = {
    kind: 'type';
    region: ParserRegion;
    declaration: TypeDeclaration;
} | {
    kind: 'global-variable';
    region: ParserRegion;
    declaration: GlobalVariableDeclaration;
} | {
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
    reusedSemanticRegionCount?: number;
    routineResolutionStrategy?: 'complete' | 'worklist';
    declarationResolutionStrategy?: 'complete' | 'worklist';
    routineVerificationStatus?: 'not-requested' | 'matched' | 'fallback';
    routineVerificationMs?: number;
    incrementalVerificationStatus?: 'not-requested' | 'matched' | 'fallback';
    incrementalVerificationMs?: number;
}
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
export declare function normalizeTypeName(name: string): string;
export declare function parseTypeDeclarationSyntax(source: string, options?: Pick<ParseOptions, 'reusableDeclarationRegions'>, profile?: boolean): ParsedDocumentSyntax;
export declare function parseTypeDeclarationRegion(source: string, region: ParserRegion, onProfile?: (metrics: DeclarationRegionParseMetrics) => void): ParsedSyntaxRegion;
export declare function resolveRoutineSyntaxRegions(source: string, syntax: ParsedDocumentSyntax, regions: readonly ParserRegion[], workspaceSymbols?: ParserSymbolCatalog, onProfile?: (metrics: RoutineResolutionWorklistMetrics) => void): RoutineResolutionWorklistResult;
export declare function parseTypeDeclarations(source: string, workspaceSymbols?: ParserSymbolCatalog, onProfile?: (metrics: ParsePerformanceMetrics) => void, options?: ParseOptions): ParsedDocument;
export declare function resolveTypeDeclarationSyntax(source: string, syntax: ParsedDocumentSyntax, workspaceSymbols?: ParserSymbolCatalog, onProfile?: (metrics: ParsePerformanceMetrics) => void, options?: ParseOptions): ParsedDocument;
export declare function findRoutineDeclarationAtOffset(parsedDocument: ParsedDocument, offset: number): RoutineDeclaration | undefined;
export declare function findRoutineFieldAtOffset(parsedDocument: ParsedDocument, offset: number): TypeField | undefined;
export declare function findTypeDefinitionReferenceAtOffset(parsedDocument: ParsedDocument, offset: number): TypeReference | undefined;
export declare function findTypeReferenceAtOffset(parsedDocument: ParsedDocument, offset: number): TypeReference | undefined;
export declare function getParsedReferences(parsed: ParsedDocument, onProfile?: (metrics: ParsedReferencesMetrics) => void): ParsedReference[];
