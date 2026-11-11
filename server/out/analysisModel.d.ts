import { GlobalVariableDeclaration, GlobalVariableLiteral, ParsedDocument, ParsedReference, ParserDiagnostic, RoutineAssignment, RoutineCall, RoutineConditionalBlock, RoutineComputedFieldAccess, RoutineDeclaration, RoutineExpression, RoutineFieldAccess, RoutineLocalVariable, RoutineListSpecialFieldAccess, RoutineLoopInstruction, RoutineLoopBlock, RoutineMemoryAllocation, RoutineMemoryDeallocation, RoutineOutput, RoutineParameter, RoutineProcess, PreservedRoutineParameter, RoutineReturnStatement, RoutineSimpleInstruction, RoutineVariableAccess, SourceRange, TypeDeclaration, TypeField } from './typeParser';
export type SyntaxNodeKind = 'document' | 'type-declaration' | 'list-declaration' | 'global-variable-declaration' | 'global-initializer' | 'field-declaration' | 'base-type-reference' | 'pointer-target' | 'scalar-factor' | 'routine-declaration' | 'alternate-routine-header' | 'routine-name' | 'alternate-parameter' | 'parameter-declaration' | 'local-variable-declaration' | 'computed-field-declaration' | 'routine-call' | 'field-access' | 'list-field-access' | 'variable-access' | 'computed-field-access' | 'argument' | 'assignment' | 'statement' | 'output' | 'memory-allocation' | 'memory-deallocation' | 'conditional' | 'routine-body' | 'conditional-body' | 'loop-block' | 'loop-body' | 'process' | 'loop-instruction' | 'decode-instruction' | 'push-instruction' | 'return-statement' | 'preserve-statement' | 'parser-diagnostic' | 'condition-expression' | 'expression-operand' | 'expression-operand-part' | 'binary-expression' | 'unary-expression' | 'type-reference' | 'reference';
export interface SyntaxNode {
    id: number;
    kind: SyntaxNodeKind;
    range: SourceRange;
    parentId?: number;
    childIds: number[];
    symbolId?: string;
    scopeId?: string;
    typeDeclaration?: TypeDeclaration;
    listDeclaration?: TypeDeclaration;
    scalarFactor?: string;
    globalVariableDeclaration?: GlobalVariableDeclaration;
    globalInitializer?: GlobalVariableLiteral;
    routineDeclaration?: RoutineDeclaration;
    fieldDeclaration?: TypeField;
    parameterDeclaration?: RoutineParameter;
    localVariableDeclaration?: RoutineLocalVariable;
    computedFieldDeclaration?: RoutineDeclaration['computedField'];
    expression?: RoutineExpression;
    expressionOperandParts?: ExpressionOperandPart[];
    assignment?: RoutineAssignment;
    output?: RoutineOutput;
    routineCall?: RoutineCall;
    fieldAccess?: RoutineFieldAccess;
    listFieldAccess?: RoutineListSpecialFieldAccess;
    variableAccess?: RoutineVariableAccess;
    computedFieldAccess?: RoutineComputedFieldAccess;
    conditional?: RoutineConditionalBlock;
    routineLoopBlock?: RoutineLoopBlock;
    conditionExpression?: {
        condition: RoutineConditionalBlock['condition'];
        arguments: RoutineConditionalBlock['conditionArguments'];
        target?: RoutineDeclaration;
        predicateCall?: RoutineCall;
    };
    process?: RoutineProcess;
    memoryAllocation?: RoutineMemoryAllocation;
    memoryDeallocation?: RoutineMemoryDeallocation;
    loopInstruction?: RoutineLoopInstruction;
    simpleInstruction?: RoutineSimpleInstruction;
    returnStatement?: RoutineReturnStatement;
    preservedParameter?: PreservedRoutineParameter;
    parserDiagnostic?: ParserDiagnostic;
    semanticReference?: ParsedReference;
}
export interface ExpressionOperandPart {
    kind: 'reference' | 'text';
    text: string;
    range: SourceRange;
    reference?: ParsedReference;
}
export interface SemanticScope {
    id: string;
    kind: 'document' | 'type' | 'routine';
    range: SourceRange;
    parentId?: string;
    ownerNodeId: number;
    symbolIds: string[];
}
export interface SemanticSymbol {
    id: string;
    kind: ParsedReference['kind'];
    name: string;
    scopeId: string;
    scope?: number;
    container?: string;
    declarations: ParsedReference[];
    references: ParsedReference[];
}
export interface DocumentAnalysisMetrics {
    durationMs: number;
    referenceExtractionMs: number;
    semanticIndexMs: number;
    syntaxProjectionMs: number;
    positionIndexMs: number;
    topLevelIntervalIndexMs: number;
    referenceIntervalIndexMs: number;
    syntaxChildIndexMs: number;
    referenceNodePlacementMs: number;
    declarationSymbolIndexMs: number;
    finalChildIndexMs: number;
    references: number;
    typeDefinitionTargets: number;
    symbols: number;
    scopes: number;
    nodes: number;
    cacheHit: boolean;
}
export interface DocumentAnalysis {
    root: SyntaxNode;
    nodes: Map<number, SyntaxNode>;
    scopes: Map<string, SemanticScope>;
    symbols: Map<string, SemanticSymbol>;
    references: ParsedReference[];
    diagnostics: ParserDiagnostic[];
    typeDefinitionTargetCount: number;
    getNodeAt(offset: number): SyntaxNode | undefined;
    findReferenceAt(offset: number, kind?: ParsedReference['kind']): ParsedReference | undefined;
    getReferences(reference: ParsedReference): readonly ParsedReference[];
    getDeclaration(reference: ParsedReference): ParsedReference | undefined;
    getDeclarationNodes(reference: ParsedReference): readonly SyntaxNode[];
    getSymbol(reference: ParsedReference): SemanticSymbol | undefined;
    getScopeAt(offset: number): SemanticScope | undefined;
    findTypeDefinitionAt(offset: number): string | undefined;
}
export interface WorkspaceReference {
    uri: string;
    reference: ParsedReference;
}
export interface WorkspaceDeclarationChange {
    kind: WorkspaceDependencyKind;
    normalizedName: string;
    normalizedContainer?: string;
}
export interface WorkspaceRoutineDeclaration {
    uri: string;
    declaration: RoutineDeclaration;
}
export interface WorkspaceDuplicateDeclaration {
    kind: 'type' | 'variable' | 'routine' | 'field';
    name: string;
    range: SourceRange;
}
export declare function getWorkspaceDuplicateDeclarations(documents: Iterable<{
    uri: string;
    directory: string;
    parsed: ParsedDocument;
}>): Map<string, WorkspaceDuplicateDeclaration[]>;
export type WorkspaceDependencyKind = 'type' | 'routine' | 'variable' | 'field';
export declare class WorkspaceAnalysisIndex {
    readonly documentCount: number;
    readonly referenceCount: number;
    readonly dependencyCount: number;
    private readonly referencesByDirectoryAndSymbol;
    private readonly referencesByDocumentAndSymbol;
    private readonly typeDeclarationsByDirectoryAndName;
    private readonly routineDeclarationsByDirectoryAndSymbol;
    private readonly routineDeclarationsByDirectoryAndName;
    private readonly potentialDependentsByDirectoryAndName;
    private readonly unresolvedDependentsByDirectoryAndKind;
    private readonly dependenciesByDocument;
    private readonly dependentsByDocument;
    private readonly dependencyKindsByDocument;
    constructor(documents: Iterable<{
        uri: string;
        directory: string;
        analysis: DocumentAnalysis;
    }>);
    getReferences(directory: string, reference: ParsedReference, documentUri?: string): readonly WorkspaceReference[];
    getDeclaration(directory: string, reference: ParsedReference, documentUri?: string): WorkspaceReference | undefined;
    getTypeDeclarations(directory: string, name: string): readonly WorkspaceReference[];
    getTypeDeclaration(directory: string, name: string): WorkspaceReference | undefined;
    getRoutineDeclarations(directory: string, reference: ParsedReference): readonly WorkspaceRoutineDeclaration[];
    getDependencies(uri: string): ReadonlySet<string>;
    getDependents(uri: string): ReadonlySet<string>;
    getDependencyKinds(uri: string, dependencyUri: string): ReadonlySet<WorkspaceDependencyKind>;
    getPotentialDependents(directory: string, kind: WorkspaceDependencyKind, name: string, container?: string): ReadonlySet<string>;
    getAffectedDocuments(uri: string): ReadonlySet<string>;
    getAffectedDocumentsForDeclarationChanges(uri: string, directory: string, changes: readonly WorkspaceDeclarationChange[]): ReadonlySet<string>;
    hasDependencyCycle(uri: string): boolean;
}
export declare function getDocumentAnalysis(parsed: ParsedDocument, sourceLength?: number, onProfile?: (metrics: DocumentAnalysisMetrics) => void): DocumentAnalysis;
