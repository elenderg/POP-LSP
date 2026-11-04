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
export type ExpressionOperator = 'mais' | 'menos' | 'vezes' | 'dividido por' | 'junto com' | 'seguido de' | '/';
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
    memoryAllocations: RoutineMemoryAllocation[];
    conditionals: RoutineConditionalBlock[];
    processes: RoutineProcess[];
    loopInstructions: RoutineLoopInstruction[];
    computedFieldAccesses: RoutineComputedFieldAccess[];
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
    constructor(declarations?: TypeDeclaration[]);
    lookup(name: string): TypeSymbol | undefined;
    getBaseTypeDistance(actualName: string, expectedName: string): number | undefined;
    get entries(): TypeSymbol[];
    private addPrimitive;
    private addName;
    private resolveScale;
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
export declare function normalizeTypeName(name: string): string;
export declare function parseTypeDeclarations(source: string, workspaceSymbols?: ParserSymbolCatalog, onProfile?: (metrics: ParsePerformanceMetrics) => void): ParsedDocument;
export declare function findRoutineDeclarationAtOffset(parsedDocument: ParsedDocument, offset: number): RoutineDeclaration | undefined;
export declare function findRoutineFieldAtOffset(parsedDocument: ParsedDocument, offset: number): NamedTypeField | undefined;
export declare function findTypeDefinitionReferenceAtOffset(parsedDocument: ParsedDocument, offset: number): TypeReference | undefined;
export declare function findTypeReferenceAtOffset(parsedDocument: ParsedDocument, offset: number): TypeReference | undefined;
export declare function getParsedReferences(parsed: ParsedDocument): ParsedReference[];
export declare function findParsedReferenceAtOffset(parsed: ParsedDocument, offset: number): ParsedReference | undefined;
