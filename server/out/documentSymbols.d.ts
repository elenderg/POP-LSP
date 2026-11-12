import { DocumentSymbol } from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { ParsedDocument } from './typeParser';
export interface DocumentSymbolBuildMetrics {
    declarations: number;
    globalVariables: number;
    routines: number;
    fields: number;
    routineParameters: number;
    routineLocals: number;
    symbols: number;
    documentSymbolNodes: number;
    inheritanceDistanceQueries: number;
    typeConstructionMs: number;
    globalVariableConstructionMs: number;
    routineConstructionMs: number;
    sortMs: number;
    totalDurationMs: number;
}
export interface DocumentSymbolBuildResult {
    symbols: DocumentSymbol[];
    metrics: DocumentSymbolBuildMetrics;
}
export declare function buildDocumentSymbols(parsed: ParsedDocument, document: TextDocument, measureTimings?: boolean): DocumentSymbolBuildResult;
