"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDocumentSymbols = buildDocumentSymbols;
const node_1 = require("vscode-languageserver/node");
const node_perf_hooks_1 = require("node:perf_hooks");
function buildDocumentSymbols(parsed, document, measureTimings = false) {
    const now = () => measureTimings ? node_perf_hooks_1.performance.now() : 0;
    const buildStartedAt = now();
    const typeDeclarations = parsed.declarations;
    const globalVariableDeclarations = parsed.globalVariables;
    const routineDeclarations = parsed.routines;
    const toRange = (range) => ({
        start: document.positionAt(range.start),
        end: document.positionAt(range.end)
    });
    let fields = 0;
    const fieldSymbol = (field) => {
        fields++;
        if (field.kind === 'byte-array') {
            const name = field.name?.name ?? `${field.count} bytes`;
            const range = toRange(field.name?.range ?? field.range);
            return node_1.DocumentSymbol.create(name, `${field.count} ${field.elementType.name}`, node_1.SymbolKind.Field, range, range);
        }
        return node_1.DocumentSymbol.create(field.name.name, field.type.name, node_1.SymbolKind.Field, toRange({
            start: Math.min(field.name.range.start, field.type.range.start),
            end: Math.max(field.name.range.end, field.type.range.end)
        }), toRange(field.name.range));
    };
    const fieldChildren = (fieldDeclarations) => (fieldDeclarations ?? []).map(fieldSymbol);
    const typeConstructionStartedAt = now();
    let inheritanceDistanceQueries = 0;
    const typeSymbols = typeDeclarations.map(declaration => {
        const detail = declaration.pointedType
            ? `${declaration.baseType.name} para ${declaration.pointedType.name}`
            : declaration.baseType.name;
        inheritanceDistanceQueries++;
        const kind = parsed.symbols.getBaseTypeDistance(declaration.name.name, 'estrutura') !== undefined
            ? node_1.SymbolKind.Struct
            : node_1.SymbolKind.Class;
        return node_1.DocumentSymbol.create(declaration.name.name, detail, kind, toRange(declaration.range), toRange(declaration.name.range), fieldChildren(declaration.fields));
    });
    const typeConstructionMs = now() - typeConstructionStartedAt;
    const globalVariableConstructionStartedAt = now();
    const variableSymbols = globalVariableDeclarations.map((declaration) => {
        const detail = declaration.type?.name ??
            declaration.inferredTypeName ??
            declaration.initializer?.kind;
        return node_1.DocumentSymbol.create(declaration.name.name, detail, node_1.SymbolKind.Variable, toRange(declaration.range), toRange(declaration.name.range), fieldChildren(declaration.fields));
    });
    const globalVariableConstructionMs = now() - globalVariableConstructionStartedAt;
    const routineConstructionStartedAt = now();
    let routineParameters = 0;
    let routineLocals = 0;
    const routineSymbols = routineDeclarations.map((routine) => {
        routineParameters += routine.parameters.length;
        routineLocals += routine.localVariables.length;
        const children = [
            ...routine.parameters.map(parameter => node_1.DocumentSymbol.create(parameter.name.name, parameter.type.name, node_1.SymbolKind.Variable, toRange(parameter.name.range), toRange(parameter.name.range))),
            ...routine.localVariables.map(variable => node_1.DocumentSymbol.create(variable.name.name, variable.type.name, node_1.SymbolKind.Variable, toRange(variable.range), toRange(variable.name.range)))
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
            ...routine.parameters.map(parameter => `${parameter.type.name} ${parameter.name.name}`)
        ].filter(Boolean).join(' ');
        return node_1.DocumentSymbol.create(name, detail || undefined, node_1.SymbolKind.Function, range, toRange(routine.name.range), children);
    });
    const routineConstructionMs = now() - routineConstructionStartedAt;
    const sortStartedAt = now();
    const symbols = [...typeSymbols, ...variableSymbols, ...routineSymbols]
        .sort((first, second) => first.range.start.line - second.range.start.line ||
        first.range.start.character - second.range.start.character);
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
            documentSymbolNodes: symbols.length + fields + routineParameters + routineLocals,
            inheritanceDistanceQueries,
            typeConstructionMs,
            globalVariableConstructionMs,
            routineConstructionMs,
            sortMs,
            totalDurationMs: now() - buildStartedAt
        }
    };
}
//# sourceMappingURL=documentSymbols.js.map