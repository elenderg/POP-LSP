import {
  DocumentSymbol,
  SymbolKind
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import {
  ByteArrayField,
  GlobalVariableDeclaration,
  NamedTypeField,
  ParsedDocument,
  RoutineDeclaration
} from './typeParser';
import { performance } from 'node:perf_hooks';

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

export function buildDocumentSymbols(
  parsed: ParsedDocument,
  document: TextDocument,
  measureTimings = false
): DocumentSymbolBuildResult {
  const now = () => measureTimings ? performance.now() : 0;
  const buildStartedAt = now();
  const typeDeclarations = parsed.declarations;
  const globalVariableDeclarations = parsed.globalVariables;
  const routineDeclarations = parsed.routines;
  const toRange = (range: { start: number; end: number }) => ({
    start: document.positionAt(range.start),
    end: document.positionAt(range.end)
  });
  let fields = 0;
  const fieldSymbol = (field: NamedTypeField | ByteArrayField): DocumentSymbol => {
    fields++;
    if (field.kind === 'byte-array') {
      const name = field.name?.name ?? `${field.count} bytes`;
      const range = toRange(field.name?.range ?? field.range);
      return DocumentSymbol.create(
        name,
        `${field.count} ${field.elementType.name}`,
        SymbolKind.Field,
        range,
        range
      );
    }
    return DocumentSymbol.create(
      field.name.name,
      field.type.name,
      SymbolKind.Field,
      toRange({
        start: Math.min(field.name.range.start, field.type.range.start),
        end: Math.max(field.name.range.end, field.type.range.end)
      }),
      toRange(field.name.range)
    );
  };
  const fieldChildren = (
    fieldDeclarations: (NamedTypeField | ByteArrayField)[] | undefined
  ): DocumentSymbol[] =>
    (fieldDeclarations ?? []).map(fieldSymbol);

  const typeConstructionStartedAt = now();
  let inheritanceDistanceQueries = 0;
  const typeSymbols = typeDeclarations.map(declaration => {
    const detail = declaration.pointedType
      ? `${declaration.baseType.name} para ${declaration.pointedType.name}`
      : declaration.baseType.name;
    inheritanceDistanceQueries++;
    const kind = parsed.symbols.getBaseTypeDistance(
      declaration.name.name,
      'estrutura'
    ) !== undefined
      ? SymbolKind.Struct
      : SymbolKind.Class;
    return DocumentSymbol.create(
      declaration.name.name,
      detail,
      kind,
      toRange(declaration.range),
      toRange(declaration.name.range),
      fieldChildren(declaration.fields)
    );
  });
  const typeConstructionMs = now() - typeConstructionStartedAt;

  const globalVariableConstructionStartedAt = now();
  const variableSymbols = globalVariableDeclarations.map(
    (declaration: GlobalVariableDeclaration) => {
      const detail = declaration.type?.name ??
        declaration.inferredTypeName ??
        declaration.initializer?.kind;
      return DocumentSymbol.create(
        declaration.name.name,
        detail,
        SymbolKind.Variable,
        toRange(declaration.range),
        toRange(declaration.name.range),
        fieldChildren(declaration.fields)
      );
    }
  );
  const globalVariableConstructionMs =
    now() - globalVariableConstructionStartedAt;

  const routineConstructionStartedAt = now();
  let routineParameters = 0;
  let routineLocals = 0;
  const routineSymbols = routineDeclarations.map((routine: RoutineDeclaration) => {
    routineParameters += routine.parameters.length;
    routineLocals += routine.localVariables.length;
    const children = [
      ...routine.parameters.map(parameter => DocumentSymbol.create(
        parameter.name.name,
        parameter.type.name,
        SymbolKind.Variable,
        toRange(parameter.name.range),
        toRange(parameter.name.range)
      )),
      ...routine.localVariables.map(variable => DocumentSymbol.create(
        variable.name.name,
        variable.type.name,
        SymbolKind.Variable,
        toRange(variable.range),
        toRange(variable.name.range)
      ))
    ];
    const range = {
      start: document.positionAt(routine.range.start),
      end: document.positionAt(routine.bodyRange.end)
    };
    const name = routine.qualifier
      ? `${routine.name.name} ${routine.qualifier}`
      : routine.name.name;
    const detail = [
      routine.annotation,
      ...routine.parameters.map(parameter =>
        `${parameter.type.name} ${parameter.name.name}`
      )
    ].filter(Boolean).join(' ');
    return DocumentSymbol.create(
      name,
      detail || undefined,
      SymbolKind.Function,
      range,
      toRange(routine.name.range),
      children
    );
  });
  const routineConstructionMs = now() - routineConstructionStartedAt;

  const sortStartedAt = now();
  const symbols = [...typeSymbols, ...variableSymbols, ...routineSymbols]
    .sort((first, second) =>
      first.range.start.line - second.range.start.line ||
      first.range.start.character - second.range.start.character
    );
  const sortMs = now() - sortStartedAt;

  return {
    symbols,
    metrics: {
      declarations: typeDeclarations.length,
      globalVariables: globalVariableDeclarations.length,
      routines: routineDeclarations.length,
      fields,
      routineParameters,
      routineLocals,
      symbols: symbols.length,
      documentSymbolNodes:
        symbols.length + fields + routineParameters + routineLocals,
      inheritanceDistanceQueries,
      typeConstructionMs,
      globalVariableConstructionMs,
      routineConstructionMs,
      sortMs,
      totalDurationMs: now() - buildStartedAt
    }
  };
}
