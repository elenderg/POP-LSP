"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeSymbolTable = exports.GlobalVariableSymbolTable = exports.RoutineSymbolTable = void 0;
exports.normalizeTypeName = normalizeTypeName;
exports.parseTypeDeclarations = parseTypeDeclarations;
exports.findRoutineDeclarationAtOffset = findRoutineDeclarationAtOffset;
exports.findRoutineFieldAtOffset = findRoutineFieldAtOffset;
exports.findTypeDefinitionReferenceAtOffset = findTypeDefinitionReferenceAtOffset;
exports.findTypeReferenceAtOffset = findTypeReferenceAtOffset;
exports.getParsedReferences = getParsedReferences;
exports.findParsedReferenceAtOffset = findParsedReferenceAtOffset;
const plural_1 = __importDefault(require("./plural"));
const node_perf_hooks_1 = require("node:perf_hooks");
class RoutineSymbolTable {
    routines = new Map();
    constructor(declarations = []) {
        for (const declaration of declarations) {
            for (const name of routineNames(declaration)) {
                this.routines.set(routineNameKey(name), declaration);
            }
        }
    }
    lookup(name) {
        const qualifier = findTrailingParentheticalQualifier(name, 0, name.length);
        const baseName = name.slice(0, qualifier?.start ?? name.length);
        return this.routines.get(`${normalizeRoutineName(baseName)}${qualifier?.text ?? ''}`);
    }
    get entries() {
        return [...new Set(this.routines.values())];
    }
}
exports.RoutineSymbolTable = RoutineSymbolTable;
class GlobalVariableSymbolTable {
    symbols = new Map();
    constructor(declarations = []) {
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
    lookup(name) {
        return this.symbols.get(normalizeTypeName(name));
    }
    get entries() {
        return [...this.symbols.values()];
    }
}
exports.GlobalVariableSymbolTable = GlobalVariableSymbolTable;
class TypeSymbolTable {
    symbols = new Map();
    names = new Map();
    constructor(declarations = []) {
        this.addPrimitive('byte', false);
        this.addPrimitive('estrutura', false);
        for (const declaration of declarations) {
            const key = declaration.name.normalizedName;
            if (!this.symbols.has(key)) {
                const symbol = {
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
    lookup(name) {
        return this.names.get(normalizeTypeName(name));
    }
    getBaseTypeDistance(actualName, expectedName) {
        const expected = this.lookup(expectedName);
        let actual = this.lookup(actualName);
        if (!expected || !actual) {
            return undefined;
        }
        const visited = new Set();
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
    get entries() {
        return [...new Set(this.symbols.values())];
    }
    addPrimitive(name, isScalar) {
        const symbol = {
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
    addName(name, symbol) {
        const key = normalizeTypeName(name);
        if (!this.names.has(key)) {
            this.names.set(key, symbol);
        }
    }
    resolveScale(symbol, resolving) {
        if (symbol.kind === 'primitive') {
            return symbol.isScalar;
        }
        if (symbol.scalarFactor === undefined || !symbol.declaration) {
            return false;
        }
        if (resolving.has(symbol)) {
            return false;
        }
        if (isNumberTypeName(symbol.declaration.baseType.name) &&
            this.lookup(symbol.declaration.baseType.name)) {
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
        symbol.scale = formatFraction(baseNumerator * factorNumerator, baseDenominator * factorDenominator);
        symbol.isScalar = true;
        symbol.kind = 'scalar';
        resolving.delete(symbol);
        return true;
    }
}
exports.TypeSymbolTable = TypeSymbolTable;
function isNumberTypeName(name) {
    const normalizedName = normalizeTypeName(name);
    return normalizedName === 'número' || normalizedName === normalizeTypeName((0, plural_1.default)('número'));
}
const indefiniteArticles = new Set(['um', 'uma', 'uns', 'umas']);
const definiteArticles = new Set(['o', 'os', 'a', 'as']);
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
const routineUsingMarkers = new Set([
    'usando', 'desde', 'dada', 'dado', 'dadas', 'dados', 'com', 'contendo'
]);
const routineParameterMarkers = new Set([
    ...routineUsingMarkers,
    'para',
    'em'
]);
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
const normalizedTypeNameCache = new Map();
const normalizedTypeNameCacheLimit = 4096;
function normalizeTypeName(name) {
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
function normalizeRoutineName(name) {
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
        }
        else if (name[index] === ')' && depth > 0) {
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
function normalizeRoutineNameWords(name) {
    const words = normalizeTypeName(name).split(' ').filter(Boolean);
    const expandedWords = words.flatMap(word => (routineContractions.get(word) ?? word).split(' '));
    for (let index = 0; index < expandedWords.length; index++) {
        const word = expandedWords[index];
        if (word === 'a' && articlesAfterPrepositionA.has(expandedWords[index + 1] ?? '')) {
            expandedWords[index] = 'para';
        }
        else {
            expandedWords[index] = routineWordReplacements.get(word) ?? word;
        }
    }
    return expandedWords.join(' ');
}
function routineNameKey(name) {
    return `${normalizeRoutineName(name.name)}${name.qualifier ?? ''}`;
}
function pluralizeTypeName(name) {
    const words = name.trim().split(/\s+/u);
    const prepositionIndex = words.findIndex(word => normalizeTypeName(word) === 'de');
    return words.map((word, index) => prepositionIndex !== -1 && index >= prepositionIndex
        ? word
        : (0, plural_1.default)(word)).join(' ');
}
function parseTypeDeclarations(source, workspaceSymbols, onProfile) {
    const startedAt = onProfile ? node_perf_hooks_1.performance.now() : 0;
    const diagnostics = [];
    const parserSource = maskComments(source, diagnostics);
    const declarations = [];
    const globalVariables = [];
    const routines = parseRoutineDeclarations(parserSource, diagnostics);
    let segmentStart = 0;
    let periodIndex = findDeclarationPeriod(parserSource, segmentStart);
    while (periodIndex !== -1) {
        const declarationStart = findDeclarationStart(parserSource, segmentStart, periodIndex);
        const article = declarationStart === undefined
            ? undefined
            : readWord(parserSource, declarationStart, periodIndex);
        if (article && definiteArticles.has(article.value.toLocaleLowerCase('pt-BR'))) {
            const variable = parseGlobalVariableDeclaration(parserSource, declarationStart, periodIndex, diagnostics);
            if (variable) {
                globalVariables.push(variable);
            }
        }
        else if (article) {
            const declaration = parseDeclaration(parserSource, declarationStart, periodIndex, diagnostics);
            if (declaration) {
                declarations.push(declaration);
            }
        }
        segmentStart = periodIndex + 1;
        periodIndex = findDeclarationPeriod(parserSource, segmentStart);
    }
    const syntaxFinishedAt = onProfile ? node_perf_hooks_1.performance.now() : 0;
    const symbols = new TypeSymbolTable([
        ...declarations,
        ...(workspaceSymbols?.declarations ?? [])
    ]);
    const globalVariableSymbols = new GlobalVariableSymbolTable([
        ...globalVariables,
        ...(workspaceSymbols?.globalVariables ?? [])
    ]);
    const routineSymbols = new RoutineSymbolTable(routines);
    setRoutineBodyRanges(parserSource, routines, [...declarations, ...globalVariables].map(declaration => declaration.range));
    const catalogFinishedAt = onProfile ? node_perf_hooks_1.performance.now() : 0;
    validateBaseTypes(declarations, symbols, diagnostics);
    validateGlobalVariableTypes(globalVariables, symbols, diagnostics);
    validateReservedNames(parserSource, declarations, globalVariables, diagnostics);
    validateIdentifierPunctuation(parserSource, [...declarations, ...globalVariables].map(declaration => declaration.name), diagnostics);
    resolveFields(parserSource, [...declarations, ...globalVariables], symbols, diagnostics);
    resolveRoutineParameters(parserSource, routines, symbols, diagnostics);
    resolveComputedFields(routines, symbols, diagnostics);
    const typeResolutionFinishedAt = onProfile ? node_perf_hooks_1.performance.now() : 0;
    resolveRoutineCalls(parserSource, routines, globalVariableSymbols.entries.map(symbol => symbol.declaration), symbols, diagnostics, [...routines, ...(workspaceSymbols?.routines ?? [])]);
    const referenceResolutionFinishedAt = onProfile ? node_perf_hooks_1.performance.now() : 0;
    validateRoutineVariableNames(routines, diagnostics);
    if (onProfile) {
        const finishedAt = node_perf_hooks_1.performance.now();
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
function validateIdentifierPunctuation(source, identifiers, diagnostics) {
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
function findDeclarationStart(source, start, end) {
    let lineStart = start;
    while (lineStart <= end) {
        if (lineStart < end && !/\s/u.test(source[lineStart])) {
            const article = readWord(source, lineStart, end);
            if (article &&
                (indefiniteArticles.has(article.value.toLocaleLowerCase('pt-BR')) ||
                    definiteArticles.has(article.value.toLocaleLowerCase('pt-BR')))) {
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
function setRoutineBodyRanges(source, routines, declarationRanges) {
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
        while (routineIndex < routineStarts.length &&
            routineStarts[routineIndex] <= routine.range.start) {
            routineIndex++;
        }
        while (declarationIndex < declarationStarts.length &&
            declarationStarts[declarationIndex] <= bodyStart) {
            declarationIndex++;
        }
        const nextRoutineStart = routineStarts[routineIndex] ?? source.length;
        const nextDeclarationStart = declarationStarts[declarationIndex] ?? source.length;
        routine.bodyRange.end = Math.min(nextRoutineStart, nextDeclarationStart, source.length);
    }
}
function resolveRoutineCalls(source, routines, globalVariables, symbols, diagnostics, routineCandidates = routines) {
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
                const conditional = parseConditionalBlock(source, statementRange, periodIndex, routineCandidates, routine, globalVariableSymbols, symbols, diagnostics);
                if (conditional) {
                    routine.conditionals.push(conditional.block);
                    if (conditional.nestedRange) {
                        diagnostics.push({
                            message: 'Conditional blocks cannot be nested.',
                            range: conditional.nestedRange
                        });
                    }
                    for (const conditionalStatement of conditional.block.statements) {
                        if (!conditional.nestedRange ||
                            conditionalStatement.start < conditional.nestedRange.start) {
                            hasValidBooleanReturn = processRoutineStatement(source, conditionalStatement, routine, routineCandidates, globalVariableSymbols, symbols, diagnostics) || hasValidBooleanReturn;
                        }
                    }
                }
                else {
                    hasValidBooleanReturn = processRoutineStatement(source, statementRange, routine, routineCandidates, globalVariableSymbols, symbols, diagnostics) || hasValidBooleanReturn;
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
function validateRoutineVariableNames(routines, diagnostics) {
    for (const routine of routines) {
        const declarations = [
            ...routine.parameters,
            ...(routine.returnParameter ? [routine.returnParameter] : []),
            ...routine.localVariables,
            ...routine.calls.flatMap(call => call.localVariable ? [call.localVariable] : []),
            ...routine.processes.flatMap(process => process.returnVariable ? [process.returnVariable] : [])
        ];
        const names = new Map();
        const seenRanges = new Set();
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
            }
            else {
                names.set(name.normalizedName, name.range);
            }
        }
    }
}
function processRoutineStatement(source, statement, caller, routines, globalVariables, symbols, diagnostics) {
    const statementKeyword = readWord(source, statement.start, statement.end);
    if (statementKeyword?.value.toLocaleLowerCase('pt-BR') === 'atribua') {
        const destinationMarker = findWordOutsideStrings(source, statementKeyword.end, statement.end, 'para');
        if (destinationMarker) {
            const targetRange = trimRange(source, destinationMarker.end, statement.end);
            const targetArticle = readWord(source, targetRange.start, targetRange.end);
            const localNameMarker = findAnyWord(source, targetArticle?.end ?? targetRange.end, targetRange.end, localVariableNameMarkers);
            if (targetArticle &&
                indefiniteArticles.has(targetArticle.value.toLocaleLowerCase('pt-BR')) &&
                localNameMarker) {
                const localVariable = parseLocalVariableDeclaration(source, targetRange, symbols);
                if (localVariable) {
                    caller.localVariables.push(localVariable);
                }
            }
        }
    }
    if (statementKeyword &&
        ['atribua', 'escreva'].includes(statementKeyword.value.toLocaleLowerCase('pt-BR'))) {
        const destinationMarker = findWordOutsideStrings(source, statementKeyword.end, statement.end, 'para') ??
            findWordOutsideStrings(source, statementKeyword.end, statement.end, 'à');
        if (destinationMarker) {
            resolveFieldAccessRange(source, trimRange(source, statementKeyword.end, destinationMarker.start), caller, routines, globalVariables, symbols, diagnostics);
        }
    }
    if (validatePreserveStatement(source, statement, caller, diagnostics)) {
        return false;
    }
    const assignment = parseRoutineAssignment(source, statement, diagnostics);
    if (assignment) {
        const fieldAccesses = [];
        const variableAccesses = [];
        resolveExpressionFieldAccesses(source, assignment.expression, caller, routines, globalVariables, symbols, [], fieldAccesses, variableAccesses);
        resolveRoutineArgumentType(source, assignment.target.range, caller, globalVariables, symbols, fieldAccesses, routines, [], variableAccesses);
        assignment.fieldAccesses = fieldAccesses;
        assignment.variableAccesses = variableAccesses;
        caller.assignments.push(assignment);
        return false;
    }
    const output = parseRoutineOutput(source, statement, diagnostics);
    if (output) {
        const fieldAccesses = [];
        const variableAccesses = [];
        resolveExpressionFieldAccesses(source, output.expression, caller, routines, globalVariables, symbols, diagnostics, fieldAccesses, variableAccesses);
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
    if (validatePushStatement(source, statement, caller, routines, globalVariables, symbols, diagnostics)) {
        return false;
    }
    const firstWord = readWord(source, statement.start, statement.end);
    const loopInstruction = parseLoopInstruction(source, statement, diagnostics);
    if (loopInstruction) {
        caller.loopInstructions.push(loopInstruction);
        return false;
    }
    if (firstWord?.value.toLocaleLowerCase('pt-BR') === 'processe') {
        const process = parseRoutineProcess(source, statement, caller, routines, globalVariables, symbols, diagnostics);
        if (process) {
            caller.processes.push(process);
            if (process.returnVariable) {
                caller.localVariables.push(process.returnVariable);
            }
        }
        return false;
    }
    const call = resolveRoutineCall(source, statement, routines, caller, globalVariables, symbols);
    if (call) {
        caller.calls.push(call);
        if (call.localVariable) {
            caller.localVariables.push(call.localVariable);
        }
    }
    else {
        diagnoseUnresolvedRoutineCall(source, statement, routines, caller, globalVariables, symbols, diagnostics);
    }
    return false;
}
function parseConditionalBlock(source, statement, blockEnd, routines, caller, globalVariables, symbols, diagnostics) {
    const keyword = readWord(source, statement.start, statement.end);
    if (!keyword || keyword.value.toLocaleLowerCase('pt-BR') !== 'se') {
        return undefined;
    }
    const comma = source.indexOf(',', keyword.end);
    if (comma === -1 || comma >= blockEnd) {
        return undefined;
    }
    const conditionRange = trimRange(source, keyword.end, comma);
    const condition = resolveBooleanCondition(source, conditionRange, routines, caller, globalVariables, symbols);
    if (!condition) {
        diagnostics.push({
            message: `No boolean function found for condition "${source.slice(conditionRange.start, conditionRange.end)}".`,
            range: conditionRange
        });
    }
    else {
        caller.calls.push(condition.call);
    }
    const bodyRange = trimRange(source, comma + 1, blockEnd);
    const statements = [];
    let nestedRange;
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
function resolveBooleanCondition(source, condition, routines, caller, globalVariables, symbols) {
    const conditionSource = maskWordInRange(source, condition, 'não');
    const conditionName = normalizeRoutineName(conditionSource.slice(condition.start, condition.end));
    const routineNameIndex = getRoutineNameIndex(routines);
    const exact = routineNameIndex.byNormalizedName.get(conditionName)?.find(candidate => candidate.routine.isBooleanFunction &&
        candidate.routine.parameters.length === 0);
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
    const matches = [];
    for (const nameMatch of findRoutineNameMatches(conditionSource, condition, routines, true)) {
        const { routine, nameStart, nameEnd, order } = nameMatch;
        if (!routine.isBooleanFunction || routine.parameters.length === 0) {
            continue;
        }
        if (nameEnd < condition.end &&
            !/\s/u.test(conditionSource[nameEnd] ?? '')) {
            continue;
        }
        const prefix = trimRange(conditionSource, condition.start, nameStart);
        const suffix = trimRange(conditionSource, nameEnd, condition.end);
        const argumentsList = [prefix, suffix].filter(range => range.start < range.end);
        if (argumentsList.length !== routine.parameters.length) {
            continue;
        }
        const distances = [];
        const fieldAccesses = [];
        const variableAccesses = [];
        const computedFieldAccesses = [];
        for (let index = 0; index < argumentsList.length; index++) {
            const actualType = resolveRoutineArgumentType(conditionSource, argumentsList[index], caller, globalVariables, symbols, fieldAccesses, routines, computedFieldAccesses, variableAccesses);
            const distance = actualType
                ? getRoutineArgumentTypeDistance(actualType, routine.parameters[index].type.name, symbols)
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
    return matches.sort((first, second) => first.distance - second.distance ||
        first.order - second.order ||
        first.nameStart - second.nameStart)[0];
}
function maskWordInRange(source, range, word) {
    const rangeText = source.slice(range.start, range.end);
    if (!rangeText.toLocaleLowerCase('pt-BR').includes(word)) {
        return source;
    }
    const characters = rangeText.split('');
    const words = /\p{L}+/gu;
    let match;
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
function parseRoutineAssignment(source, statement, diagnostics) {
    const keyword = readWord(source, statement.start, statement.end);
    if (!keyword || keyword.value.toLocaleLowerCase('pt-BR') !== 'atribua') {
        return undefined;
    }
    const destinationMarker = ['para', 'à', 'ao', 'aos', 'às']
        .map(marker => findWordOutsideStrings(source, keyword.end, statement.end, marker))
        .filter((marker) => marker !== undefined)
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
function parseRoutineOutput(source, statement, diagnostics) {
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
function parseRoutineExpression(source, range, diagnostics) {
    const words = /\p{L}+/gu;
    words.lastIndex = range.start;
    const quotedRanges = findQuotedRanges(source, range);
    const operators = [];
    let match;
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
        }
        else if (word === 'junto' || word === 'seguido') {
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
        }
        else {
            operators.push({
                operator: word,
                range: { start: match.index, end: wordEnd }
            });
        }
    }
    for (let index = range.start; index < range.end; index++) {
        if (source[index] === '/' &&
            !quotedRanges.some(quoted => index >= quoted.start && index < quoted.end)) {
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
    const operands = [];
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
    let expression = operands[0];
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
function parseSignedExpressionOperand(source, range) {
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
    const operand = {
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
function validatePreserveStatement(source, statement, routine, diagnostics) {
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
    const parameterName = normalizeTypeName(source.slice(parameterNameRange.start, parameterNameRange.end));
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
    if (!routine.preservedParameters.some(preserved => preserved.parameter === parameter)) {
        routine.preservedParameters.push({
            parameter,
            copyName: parameter.name.name,
            originalName: `${parameter.name.name} original`,
            range: statement
        });
    }
    return true;
}
function validateDigaStatement(source, statement, isBooleanFunction, diagnostics) {
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
function validateReturnStatement(source, statement, diagnostics) {
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
function parseLoopInstruction(source, statement, diagnostics) {
    const keyword = readWord(source, statement.start, statement.end);
    if (!keyword) {
        return undefined;
    }
    const instructionKinds = new Map([
        ['itere', 'iterate'],
        ['pare', 'break'],
        ['reitere', 'repeat']
    ]);
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
function validateDecodeStatement(source, statement, diagnostics) {
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
function validatePushStatement(source, statement, caller, routines, globalVariables, symbols, diagnostics) {
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
        const variableType = resolveRoutineArgumentType(source, valueRange, caller, globalVariables, symbols);
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
function isPushableNumericType(typeName, symbols) {
    return ['byte', 'word', 'número'].some(baseType => symbols.getBaseTypeDistance(typeName, baseType) !== undefined);
}
function parseRoutineProcess(source, statement, caller, routines, globalVariables, symbols, diagnostics) {
    const keyword = readWord(source, statement.start, statement.end);
    if (!keyword) {
        return undefined;
    }
    const returnMarker = findWordOutsideStrings(source, keyword.end, statement.end, 'retornando');
    const invocationEnd = returnMarker?.start ?? statement.end;
    const withMarker = findWordOutsideStrings(source, keyword.end, invocationEnd, 'com');
    const targetRange = trimRange(source, keyword.end, withMarker?.start ?? invocationEnd);
    const fieldAccesses = [];
    const variableAccesses = [];
    const computedFieldAccesses = [];
    let kind;
    let target;
    let library;
    let functionName;
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
    }
    else {
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
        if (!resolveRoutineArgumentType(source, targetRange, caller, globalVariables, symbols, fieldAccesses, routines, computedFieldAccesses, variableAccesses)) {
            diagnostics.push({
                message: `Unknown function pointer "${source.slice(targetRange.start, targetRange.end)}".`,
                range: targetRange
            });
            return undefined;
        }
    }
    const argumentsList = [];
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
        if (!resolveRoutineArgumentType(source, argument, caller, globalVariables, symbols, fieldAccesses, routines, computedFieldAccesses, variableAccesses)) {
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
        variableAccesses,
        computedFieldAccesses,
        returnVariable,
        range: statement
    };
}
function splitProcessArguments(source, range) {
    const argumentsList = [];
    const quotedRanges = findQuotedRanges(source, range);
    const words = /\p{L}+/gu;
    words.lastIndex = range.start;
    let argumentStart = range.start;
    let match;
    while ((match = words.exec(source)) && match.index < range.end) {
        if (quotedRanges.some(quoted => match.index >= quoted.start && match.index < quoted.end)) {
            continue;
        }
        const wordEnd = match.index + match[0].length;
        if (match[0].toLocaleLowerCase('pt-BR') !== 'e' ||
            isWordCharacter(match.index > range.start ? source[match.index - 1] : '') ||
            isWordCharacter(wordEnd < range.end ? source[wordEnd] : '')) {
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
function parseProcessReturnVariable(source, start, end, symbols, diagnostics) {
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
    let type;
    for (let firstWord = 0; firstWord < words.length; firstWord++) {
        const candidate = words.slice(firstWord).map(word => word[0]).join(' ');
        if (!symbols.lookup(candidate)) {
            continue;
        }
        type = createTypeReference(source, {
            start: typeRange.start + words[firstWord].index,
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
function resolveExpressionFieldAccesses(source, expression, caller, routines, globalVariables, symbols, diagnostics, fieldAccesses = [], variableAccesses = []) {
    if (expression.kind === 'binary') {
        resolveExpressionFieldAccesses(source, expression.left, caller, routines, globalVariables, symbols, diagnostics, fieldAccesses, variableAccesses);
        resolveExpressionFieldAccesses(source, expression.right, caller, routines, globalVariables, symbols, diagnostics, fieldAccesses, variableAccesses);
        return;
    }
    if (expression.kind === 'unary') {
        resolveExpressionFieldAccesses(source, expression.operand, caller, routines, globalVariables, symbols, diagnostics, fieldAccesses, variableAccesses);
        return;
    }
    resolveFieldAccessRange(source, expression.range, caller, routines, globalVariables, symbols, diagnostics, fieldAccesses, variableAccesses);
}
function resolveFieldAccessRange(source, range, caller, routines, globalVariables, symbols, diagnostics, fieldAccesses = [], variableAccesses = []) {
    const hasStructureAccess = findStructureAccessMarkers(source, range).length > 0;
    const expression = parseRoutineExpression(source, range, []);
    if (expression && expression.kind !== 'operand') {
        resolveExpressionFieldAccesses(source, expression, caller, routines, globalVariables, symbols, diagnostics, fieldAccesses, variableAccesses);
        return;
    }
    const computedFieldAccesses = [];
    const resolvedType = resolveRoutineArgumentType(source, range, caller, globalVariables, symbols, fieldAccesses, routines, computedFieldAccesses, variableAccesses);
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
function resolveRoutineCall(source, statementRange, routines, caller, globalVariables, symbols) {
    const statementQualifier = findTrailingParentheticalQualifier(source, statementRange.start, statementRange.end);
    const statementEnd = statementQualifier?.start ?? statementRange.end;
    const statement = normalizeRoutineName(source.slice(statementRange.start, statementEnd));
    const routineNameIndex = getRoutineNameIndex(routines);
    const exactMatch = routineNameIndex.byNormalizedName.get(statement)?.find(candidate => candidate.routine.parameters.length === 0 &&
        candidate.name.qualifier === statementQualifier?.text);
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
    const matchingCalls = [];
    const parsedArgumentsByNameEnd = new Map();
    for (const nameMatch of findRoutineNameMatches(source, statementRange, routines)) {
        const { routine, name: routineName, nameEnd } = nameMatch;
        if (routine.parameters.length === 0) {
            continue;
        }
        if (nameEnd < statementRange.end &&
            !/\s/u.test(source[nameEnd] ?? '')) {
            continue;
        }
        const callQualifier = findTrailingParentheticalQualifier(source, nameEnd, statementRange.end);
        if (routineName.qualifier !== callQualifier?.text) {
            continue;
        }
        let parsedArguments = parsedArgumentsByNameEnd.get(nameEnd);
        if (!parsedArguments) {
            const argumentRange = trimRange(source, nameEnd, callQualifier?.start ?? statementRange.end);
            const localVariable = parseLocalVariableDeclaration(source, argumentRange, symbols);
            const precedingArgumentsRange = localVariable
                ? trimTrailingWord(source, trimRange(source, argumentRange.start, localVariable.range.start), 'para')
                : argumentRange;
            const argumentsList = localVariable
                ? [
                    ...splitRoutineArguments(source, precedingArgumentsRange).filter(argument => normalizeTypeName(source.slice(argument.start, argument.end)) !== 'para'),
                    localVariable.name.range
                ]
                : splitRoutineArguments(source, argumentRange);
            parsedArguments = {
                argumentsList,
                localVariable,
                localVariableIndex: localVariable ? argumentsList.length - 1 : -1
            };
            parsedArgumentsByNameEnd.set(nameEnd, parsedArguments);
        }
        const { argumentsList, localVariable, localVariableIndex } = parsedArguments;
        if (argumentsList.length !== routine.parameters.length) {
            continue;
        }
        const distances = [];
        const fieldAccesses = [];
        const variableAccesses = [];
        const computedFieldAccesses = [];
        for (let index = 0; index < argumentsList.length; index++) {
            const argumentType = localVariableIndex === index
                ? localVariable?.type
                : resolveRoutineArgumentType(source, argumentsList[index], caller, globalVariables, symbols, fieldAccesses, routines, computedFieldAccesses, variableAccesses);
            const distance = argumentType
                ? getRoutineArgumentTypeDistance(argumentType, routine.parameters[index].type.name, symbols)
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
    return matchingCalls.sort((first, second) => second.nameLength - first.nameLength || first.distance - second.distance)[0]?.call;
}
function diagnoseUnresolvedRoutineCall(source, statement, routines, caller, globalVariables, symbols, diagnostics) {
    const firstWord = readWord(source, statement.start, statement.end);
    if (!firstWord || builtInStatementStarts.has(firstWord.value.toLocaleLowerCase('pt-BR'))) {
        return;
    }
    const rest = trimRange(source, firstWord.end, statement.end);
    const definiteArticle = findAnyWord(source, rest.start, rest.end, definiteArticles);
    const nameMatches = findRoutineNameMatches(source, statement, routines);
    const matchesDeclaredRoutineName = nameMatches.some(({ nameEnd }) => /\s/u.test(source[nameEnd] ?? '') &&
        trimRange(source, nameEnd, statement.end).start < statement.end);
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
            if (!article ||
                !definiteArticles.has(article.value.toLocaleLowerCase('pt-BR'))) {
                continue;
            }
            const variableNameRange = trimRange(source, article.end, argument.end);
            const variableName = normalizeTypeName(source.slice(variableNameRange.start, variableNameRange.end));
            if (resolveVariableType(caller, globalVariables, variableName)) {
                continue;
            }
            const argumentType = findTypeSuffix(source, variableNameRange, symbols);
            if (argumentType &&
                isCompatibleType(argumentType, candidate.parameters[index].type, symbols)) {
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
function findTypeSuffix(source, nameRange, symbols) {
    const words = [...source.slice(nameRange.start, nameRange.end).matchAll(/\S+/gu)];
    for (let firstWord = 0; firstWord < words.length; firstWord++) {
        const candidateName = words.slice(firstWord).map(word => word[0]).join(' ');
        if (!symbols.lookup(candidateName)) {
            continue;
        }
        const typeStart = nameRange.start + words[firstWord].index;
        return createTypeReference(source, { start: typeStart, end: nameRange.end });
    }
    return undefined;
}
function routineNames(routine) {
    return [routine.name, ...routine.alternateNames];
}
const routineNameLookupIndexes = new WeakMap();
function getRoutineNameIndex(routines) {
    const cachedIndex = routineNameLookupIndexes.get(routines);
    if (cachedIndex) {
        return cachedIndex;
    }
    const byNormalizedName = new Map();
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
function findRoutineNameMatches(source, range, routines, searchAnyStart = false) {
    const { byNormalizedName } = getRoutineNameIndex(routines);
    const matches = [];
    for (let nameStart = range.start; nameStart < range.end; nameStart++) {
        if (nameStart > range.start &&
            (!searchAnyStart || isWordCharacter(source[nameStart - 1]))) {
            if (!searchAnyStart) {
                break;
            }
            continue;
        }
        const matchedCandidates = new Set();
        for (let nameEnd = nameStart + 1; nameEnd <= range.end; nameEnd++) {
            if (nameEnd < range.end && !/\s/u.test(source[nameEnd])) {
                continue;
            }
            const normalizedName = normalizeRoutineName(source.slice(nameStart, nameEnd));
            for (const candidate of byNormalizedName.get(normalizedName) ?? []) {
                if (matchedCandidates.has(candidate)) {
                    continue;
                }
                matchedCandidates.add(candidate);
                matches.push({ ...candidate, nameStart, nameEnd });
            }
        }
        if (!searchAnyStart) {
            break;
        }
    }
    return matches.sort((first, second) => first.order - second.order ||
        first.nameStart - second.nameStart);
}
function splitRoutineArguments(source, range) {
    const argumentsList = [];
    let argumentStart = range.start;
    const words = /\p{L}+/gu;
    words.lastIndex = range.start;
    let match;
    while ((match = words.exec(source)) && match.index < range.end) {
        const wordEnd = match.index + match[0].length;
        if (!conjunctions.has(match[0].toLocaleLowerCase('pt-BR')) ||
            isWordCharacter(match.index > range.start ? source[match.index - 1] : '') ||
            isWordCharacter(wordEnd < range.end ? source[wordEnd] : '')) {
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
function resolveRoutineArgumentType(source, argument, caller, globalVariables, symbols, fieldAccesses = [], routines = [], computedFieldAccesses = [], variableAccesses = []) {
    const cast = parseTypeCast(source, argument, symbols);
    if (cast) {
        const originalType = resolveRoutineArgumentType(source, cast.valueRange, caller, globalVariables, symbols, fieldAccesses, routines, computedFieldAccesses, variableAccesses);
        return originalType ? cast.type : undefined;
    }
    const fieldAccessType = resolveStructureFieldAccess(source, argument, caller, globalVariables, symbols, fieldAccesses, routines, computedFieldAccesses, variableAccesses);
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
    if (firstWord &&
        (definiteArticles.has(firstWord.value.toLocaleLowerCase('pt-BR')) ||
            ['este', 'esta', 'estes', 'estas'].includes(firstWord.value.toLocaleLowerCase('pt-BR')))) {
        const variableName = normalizeTypeName(source.slice(firstWord.end, argument.end));
        const localVariable = findRoutineVariable(caller, variableName);
        const globalVariable = globalVariables.lookup(variableName);
        if (localVariable) {
            variableAccesses.push({
                reference: createTypeReference(source, trimRange(source, firstWord.end, argument.end)),
                type: localVariable.type,
                scope: caller.range.start
            });
        }
        else if (globalVariable?.typeName) {
            variableAccesses.push({
                reference: createTypeReference(source, trimRange(source, firstWord.end, argument.end)),
                type: createSyntheticTypeReference(globalVariable.typeName, argument)
            });
        }
        const variableType = resolveVariableType(caller, globalVariables, variableName);
        return variableType;
    }
    return undefined;
}
function parseTypeCast(source, argument, symbols) {
    const marker = /\btal\s+(?:como|qual)\b/iu.exec(source.slice(argument.start, argument.end));
    if (!marker) {
        return undefined;
    }
    const markerStart = argument.start + marker.index;
    const valueRange = trimRange(source, argument.start, markerStart);
    const typeRange = trimRange(source, markerStart + marker[0].length, argument.end);
    const article = readWord(source, typeRange.start, typeRange.end);
    if (valueRange.start === valueRange.end ||
        !article ||
        !indefiniteArticles.has(article.value.toLocaleLowerCase('pt-BR'))) {
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
function resolveStructureFieldAccess(source, argument, caller, globalVariables, symbols, fieldAccesses, routines, computedFieldAccesses, variableAccesses = []) {
    const segments = [];
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
    const firstSegmentStart = hasArticle ? firstArticle.end : segments[0].start;
    const firstSegmentName = normalizeTypeName(source.slice(firstSegmentStart, segments[0].end));
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
    }
    else if (globalVariable?.typeName) {
        variableAccesses.push({
            reference: createTypeReference(source, rootNameRange),
            type: createSyntheticTypeReference(globalVariable.typeName, rootNameRange)
        });
    }
    const rootType = resolveVariableType(caller, globalVariables, rootName) ?? (caller.computedField &&
        normalizeTypeName(caller.computedField.structureType.name) === rootName
        ? caller.computedField.structureType
        : undefined);
    if (!rootType && fieldRanges.length === 1) {
        const operatorName = normalizeTypeName(source.slice(fieldRanges[0].start, fieldRanges[0].end));
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
    const resolvedAccesses = [];
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
                const computedField = findComputedFieldRoutine(currentType.name, memberName, routines, symbols);
                if (!computedField?.computedField?.valueType) {
                    return undefined;
                }
                computedFieldAccesses.push({
                    reference: createTypeReference(source, fieldRange),
                    target: computedField
                });
                currentType = computedField.computedField.valueType;
            }
            else {
                resolvedAccesses.push({
                    reference: createTypeReference(source, fieldRange),
                    target: member
                });
                currentType = member.type;
            }
            const operatorType = resolveTypeOperator(operator[1], currentType, symbols);
            if (operatorType) {
                currentType = operatorType;
            }
            continue;
        }
        const field = findStructureField(currentType.name, fieldName, symbols);
        if (!field) {
            const computedField = findComputedFieldRoutine(currentType.name, fieldName, routines, symbols);
            if (!computedField?.computedField?.valueType) {
                const listElementType = resolveListSpecialField(currentType.name, fieldName, fieldRange, symbols);
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
function resolveListSpecialField(listTypeName, fieldName, range, symbols) {
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
function resolveTypeOperator(operator, type, symbols) {
    if (operator === 'magnitude') {
        const numberType = symbols.lookup('número');
        return numberType
            ? createSyntheticTypeReference(numberType.name, type.range)
            : undefined;
    }
    if (operator === 'endereçamento') {
        const pointerType = symbols.entries
            .filter(symbol => symbol.pointedType &&
            symbols.getBaseTypeDistance(type.name, symbol.pointedType.name) !== undefined)
            .sort((first, second) => (symbols.getBaseTypeDistance(type.name, first.pointedType.name) ?? Number.MAX_SAFE_INTEGER) -
            (symbols.getBaseTypeDistance(type.name, second.pointedType.name) ?? Number.MAX_SAFE_INTEGER))[0];
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
function createSyntheticTypeReference(name, range) {
    return {
        name,
        normalizedName: normalizeTypeName(name),
        range
    };
}
function findComputedFieldRoutine(structureType, fieldName, routines, symbols) {
    const candidates = getComputedFieldRoutineIndex(routines).get(fieldName) ?? [];
    return candidates
        .filter(routine => routine.computedField &&
        symbols.getBaseTypeDistance(structureType, routine.computedField.structureType.name) !== undefined)
        .sort((first, second) => (symbols.getBaseTypeDistance(structureType, first.computedField.structureType.name) ?? Number.MAX_SAFE_INTEGER) -
        (symbols.getBaseTypeDistance(structureType, second.computedField.structureType.name) ?? Number.MAX_SAFE_INTEGER))[0];
}
const computedFieldRoutineIndexes = new WeakMap();
function getComputedFieldRoutineIndex(routines) {
    const cachedIndex = computedFieldRoutineIndexes.get(routines);
    if (cachedIndex) {
        return cachedIndex;
    }
    const index = new Map();
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
function findStructureAccessMarkers(source, range) {
    const markers = [];
    const words = /\p{L}+/gu;
    words.lastIndex = range.start;
    let match;
    while ((match = words.exec(source)) && match.index < range.end) {
        const word = match[0].toLocaleLowerCase('pt-BR');
        if (!['deste', 'desta', 'destes', 'destas'].includes(word)) {
            continue;
        }
        markers.push({ start: match.index, end: match.index + match[0].length });
    }
    return markers;
}
function findStructureField(typeName, fieldName, symbols) {
    let symbol = symbols.lookup(typeName);
    const visited = new Set();
    while (symbol && !visited.has(symbol)) {
        visited.add(symbol);
        const field = symbol.fields?.find(candidate => candidate.kind === 'named' &&
            normalizeTypeName(candidate.name.name) === fieldName);
        if (field?.kind === 'named') {
            return field;
        }
        symbol = symbol.baseType ? symbols.lookup(symbol.baseType.name) : undefined;
    }
    return undefined;
}
function resolveVariableType(routine, globalVariables, name) {
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
function findRoutineVariable(routine, name) {
    const localVariable = [...routine.localVariables]
        .reverse()
        .find(variable => variable.name.normalizedName === name);
    return localVariable ?? routine.parameters.find(parameter => parameter.name.normalizedName === name);
}
function isCompatibleType(actual, expected, symbols) {
    return nullLiteralWords.has(actual.normalizedName) ||
        symbols.getBaseTypeDistance(actual.name, expected.name) !== undefined ||
        actual.normalizedName === expected.normalizedName;
}
function getRoutineArgumentTypeDistance(actual, expectedName, symbols) {
    return nullLiteralWords.has(actual.normalizedName)
        ? 0
        : symbols.getBaseTypeDistance(actual.name, expectedName);
}
function parseLocalVariableDeclaration(source, argumentsRange, symbols) {
    const castMatch = /\btal\s+(?:como|qual)\b/iu.exec(source.slice(argumentsRange.start, argumentsRange.end));
    const declarationEnd = castMatch
        ? argumentsRange.start + castMatch.index
        : argumentsRange.end;
    const articles = /\p{L}+/gu;
    articles.lastIndex = argumentsRange.start;
    let articleMatch;
    let localVariable;
    while ((articleMatch = articles.exec(source)) && articleMatch.index < declarationEnd) {
        const article = articleMatch[0].toLocaleLowerCase('pt-BR');
        if (!indefiniteArticles.has(article)) {
            continue;
        }
        const articleEnd = articleMatch.index + articleMatch[0].length;
        const marker = findAnyWord(source, articleEnd, declarationEnd, localVariableNameMarkers);
        const typeRange = trimRange(source, articleEnd, marker?.start ?? declarationEnd);
        if (typeRange.start === typeRange.end) {
            continue;
        }
        const typeWords = [...source.slice(typeRange.start, typeRange.end).matchAll(/\S+/gu)];
        let resolvedType;
        for (let firstWord = 0; firstWord < typeWords.length; firstWord++) {
            const candidateName = typeWords.slice(firstWord).map(word => word[0]).join(' ');
            if (!symbols.lookup(candidateName)) {
                continue;
            }
            const typeStart = typeRange.start + typeWords[firstWord].index;
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
function trimTrailingWord(source, range, word) {
    const words = [...source.slice(range.start, range.end).matchAll(/\p{L}+/gu)];
    const lastWord = words[words.length - 1];
    if (!lastWord || lastWord[0].toLocaleLowerCase('pt-BR') !== word) {
        return range;
    }
    return trimRange(source, range.start, range.start + lastWord.index);
}
function findRoutineDeclarationAtOffset(parsedDocument, offset) {
    for (const routine of parsedDocument.routines) {
        for (const call of routine.calls) {
            if (call.target &&
                offset >= call.name.range.start &&
                offset <= call.name.range.end ||
                call.target &&
                    call.qualifierRange !== undefined &&
                    offset >= call.qualifierRange.start &&
                    offset <= call.qualifierRange.end) {
                return call.target;
            }
        }
    }
    return undefined;
}
function findRoutineFieldAtOffset(parsedDocument, offset) {
    for (const routine of parsedDocument.routines) {
        for (const assignment of routine.assignments) {
            const access = assignment.fieldAccesses?.find(candidate => offset >= candidate.reference.range.start &&
                offset <= candidate.reference.range.end);
            if (access) {
                return access.target;
            }
        }
        for (const process of routine.processes) {
            const access = process.fieldAccesses.find(candidate => offset >= candidate.reference.range.start &&
                offset <= candidate.reference.range.end);
            if (access) {
                return access.target;
            }
        }
        for (const call of routine.calls) {
            const access = call.fieldAccesses?.find(candidate => offset >= candidate.reference.range.start &&
                offset <= candidate.reference.range.end);
            if (access) {
                return access.target;
            }
        }
    }
    return undefined;
}
function findTypeDefinitionReferenceAtOffset(parsedDocument, offset) {
    for (const declaration of parsedDocument.globalVariables) {
        if (offset >= declaration.name.range.start &&
            offset <= declaration.name.range.end) {
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
        const localVariable = routine.localVariables.find(variable => offset >= variable.name.range.start &&
            offset <= variable.name.range.end);
        if (localVariable) {
            return localVariable.type;
        }
        const accesses = [
            ...routine.assignments.flatMap(assignment => assignment.variableAccesses ?? []),
            ...routine.calls.flatMap(call => call.variableAccesses ?? []),
            ...routine.processes.flatMap(process => process.variableAccesses ?? [])
        ];
        const access = accesses.find(candidate => offset >= candidate.reference.range.start &&
            offset <= candidate.reference.range.end);
        if (access) {
            return access.type;
        }
    }
    return findTypeReferenceAtOffset(parsedDocument, offset);
}
function validateReservedNames(source, declarations, globalVariables, diagnostics) {
    for (const identifier of [
        ...declarations.map(declaration => declaration.name),
        ...globalVariables.map(declaration => declaration.name)
    ]) {
        const words = /\p{L}+/gu;
        const text = source.slice(identifier.range.start, identifier.range.end);
        let match;
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
            if (match[0] === 'EM' ||
                reservedWord === 'e' && isLetterName(text, match.index, match[0].length)) {
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
function isIdentifierJoiner(character) {
    return character === '-' || character === '/' || character === "'";
}
function isLetterName(text, start, length) {
    const prefix = text.slice(0, start);
    const suffix = text.slice(start + length);
    return /^(?:(?:o|a|letra)\s*)?$/iu.test(prefix) &&
        /^\s+(?:maiúscul[oa]|minúscul[oa])(?:\s|$)/iu.test(suffix);
}
function parseComputedFieldHeader(source, start, end) {
    const verb = readWord(source, start, end);
    if (!verb || verb.value.toLocaleLowerCase('pt-BR') !== 'atribua') {
        return undefined;
    }
    const fieldArticle = readWord(source, verb.end, end);
    if (!fieldArticle || !definiteArticles.has(fieldArticle.value.toLocaleLowerCase('pt-BR'))) {
        return undefined;
    }
    const structureMarker = findAnyWord(source, fieldArticle.end, end, new Set(['dum', 'duma', 'duns', 'dumas']));
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
    if (nameRange.start === nameRange.end ||
        structureRange.start === structureRange.end ||
        !returnArticle ||
        !indefiniteArticles.has(returnArticle.value.toLocaleLowerCase('pt-BR'))) {
        return undefined;
    }
    return {
        name: createTypeReference(source, nameRange),
        structureType: createTypeReference(source, structureRange),
        returnMarker
    };
}
function maskParenthesizedGroups(source, start, end) {
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
function findHeaderTerminator(source, start) {
    let depth = 0;
    for (let index = start; index < source.length; index++) {
        if (source[index] === '(') {
            depth++;
        }
        else if (source[index] === ')' && depth > 0) {
            depth--;
        }
        else if (depth === 0 && (source[index] === ':' || source[index] === ';')) {
            return index;
        }
    }
    return -1;
}
function getParenthesisDepth(source, start, end, initialDepth = 0) {
    let depth = initialDepth;
    for (let index = start; index < end; index++) {
        if (source[index] === '(') {
            depth++;
        }
        else if (source[index] === ')' && depth > 0) {
            depth--;
        }
    }
    return depth;
}
function findTrailingParentheticalQualifier(source, start, end) {
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
            }
            else if (source[index] === '(') {
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
function parseRoutineDeclarations(source, diagnostics) {
    const headerPattern = /(?:(rotina|função)\s+)?para\s+que\s+se(?:\s+(determine)\s+(se))?/giu;
    const headers = [];
    let match;
    let parenthesisScanOffset = 0;
    let parenthesisDepth = 0;
    while ((match = headerPattern.exec(source))) {
        parenthesisDepth = getParenthesisDepth(source, parenthesisScanOffset, match.index, parenthesisDepth);
        parenthesisScanOffset = match.index;
        if (parenthesisDepth > 0) {
            continue;
        }
        const lineStart = Math.max(source.lastIndexOf('\n', match.index), source.lastIndexOf('\r', match.index)) + 1;
        if (match.index !== lineStart) {
            continue;
        }
        const headerEnd = findHeaderTerminator(source, headerPattern.lastIndex);
        if (headerEnd === -1) {
            continue;
        }
        const qualifier = findTrailingParentheticalQualifier(source, headerPattern.lastIndex, headerEnd);
        const syntaxSource = maskParenthesizedGroups(source, headerPattern.lastIndex, headerEnd);
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
            ? maskWordInRange(syntaxSource, { start: headerPattern.lastIndex, end: headerEnd }, 'não')
            : syntaxSource;
        const returningMarker = findWord(headerSyntaxSource, headerPattern.lastIndex, headerEnd, 'retornando');
        const signatureEnd = Math.min(returningMarker?.start ?? headerEnd, qualifier?.start ?? headerEnd);
        const computedField = parseComputedFieldHeader(headerSyntaxSource, headerPattern.lastIndex, headerEnd);
        const firstParameterArticle = findAnyWord(headerSyntaxSource, headerPattern.lastIndex, signatureEnd, indefiniteArticles);
        const parameterMarkerCandidate = findAnyWord(headerSyntaxSource, headerPattern.lastIndex, signatureEnd, routineParameterMarkers);
        const articleAfterParameterMarker = parameterMarkerCandidate
            ? findAnyWord(headerSyntaxSource, parameterMarkerCandidate.end, signatureEnd, indefiniteArticles)
            : undefined;
        const parameterMarker = articleAfterParameterMarker
            && firstParameterArticle
            && parameterMarkerCandidate.start < firstParameterArticle.start
            ? parameterMarkerCandidate
            : undefined;
        const parameterArticle = parameterMarker
            ? articleAfterParameterMarker
            : firstParameterArticle;
        const predicateMarker = isBooleanFunction
            ? findAnyWord(headerSyntaxSource, parameterArticle?.end ?? headerPattern.lastIndex, signatureEnd, routinePredicateWords)
            : undefined;
        const predicateParameters = predicateMarker && parameterArticle
            ? [
                parseRoutineParameter(headerSyntaxSource, parameterArticle.start, predicateMarker.start),
                parseRoutineParameter(headerSyntaxSource, predicateMarker.end, signatureEnd)
            ].filter((parameter) => parameter !== undefined)
            : undefined;
        const predicateTailArticle = predicateMarker
            ? readWord(headerSyntaxSource, predicateMarker.end, signatureEnd)
            : undefined;
        const predicateHasSecondParameter = Boolean(predicateTailArticle &&
            indefiniteArticles.has(predicateTailArticle.value.toLocaleLowerCase('pt-BR')));
        const parameterStart = parameterMarker?.end ?? parameterArticle?.start;
        const nameEnd = Math.min(parameterArticle?.start ?? headerEnd, returningMarker?.start ?? headerEnd, qualifier?.start ?? headerEnd);
        const nameRange = predicateMarker
            ? {
                start: predicateMarker.start,
                end: predicateHasSecondParameter ? predicateMarker.end : signatureEnd
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
        const parameters = predicateParameters ?? (parameterStart !== undefined
            ? parseRoutineParameters(headerSyntaxSource, parameterStart, Math.min(parametersEnd, qualifier?.start ?? headerEnd), diagnostics)
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
            ? parseRoutineParameter(headerSyntaxSource, returningMarker.end, Math.min(headerEnd, qualifier?.start ?? headerEnd))
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
            annotation: match[1]?.toLocaleLowerCase('pt-BR'),
            isBooleanFunction,
            isPrimary: source[headerEnd] === ':',
            range: { start: match.index, end: headerEnd + 1 }
        });
        headerPattern.lastIndex = headerEnd + 1;
    }
    const declarations = [];
    let alternateHeaders = [];
    let previousEnd;
    for (const header of headers) {
        if (previousEnd !== undefined &&
            source.slice(previousEnd, header.range.start).trim().length > 0) {
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
        const headersAreAdjacent = source.slice(header.range.end, nextHeader.range.start).trim().length === 0;
        if (!header.isPrimary || !headersAreAdjacent) {
            continue;
        }
        if (nextHeader.isPrimary) {
            diagnostics.push({
                message: 'Consecutive primary routine headers may leave the preceding routine without a body.',
                range: { start: header.range.end - 1, end: header.range.end },
                severity: 'hint'
            });
        }
        else {
            diagnostics.push({
                message: 'Alternate routine headers must end with ";"; use ":" only on the primary header.',
                range: { start: header.range.end - 1, end: header.range.end },
                severity: 'hint'
            });
        }
    }
    return declarations;
}
function hasEquivalentRoutineSignature(alternate, primary) {
    return normalizeRoutineName(alternate.name.name) === normalizeRoutineName(primary.name.name) &&
        alternate.qualifier === primary.qualifier &&
        alternate.parameters.length === primary.parameters.length &&
        alternate.parameters.every((parameter, index) => parameter.type.normalizedName === primary.parameters[index].type.normalizedName);
}
function parseRoutineParameters(source, start, end, diagnostics) {
    const parameters = [];
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
        }
        else {
            parameters.push(parameter);
        }
        if (!separator) {
            break;
        }
        parameterStart = separator.nextStart;
    }
    return parameters;
}
function parseRoutineParameter(source, start, end) {
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
function findRoutineParameterSeparator(source, start, end) {
    const commaIndex = source.indexOf(',', start);
    let separator = commaIndex !== -1 && commaIndex < end
        ? { start: commaIndex, nextStart: skipWhitespace(source, commaIndex + 1, end) }
        : undefined;
    const words = /\p{L}+/gu;
    words.lastIndex = start;
    let match;
    while ((match = words.exec(source)) && match.index < end) {
        const wordEnd = match.index + match[0].length;
        const word = match[0].toLocaleLowerCase('pt-BR');
        if ((!conjunctions.has(word) && word !== 'para') ||
            isWordCharacter(match.index > start ? source[match.index - 1] : '') ||
            isWordCharacter(wordEnd < end ? source[wordEnd] : '')) {
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
function resolveRoutineParameters(source, routines, symbols, diagnostics) {
    for (const routine of routines) {
        const parameters = [
            ...routine.parameters,
            ...(routine.returnParameter ? [routine.returnParameter] : [])
        ];
        for (const parameter of parameters) {
            const typeText = source.slice(parameter.type.range.start, parameter.type.range.end);
            const words = [...typeText.matchAll(/\S+/gu)];
            let resolvedType;
            for (let firstWord = 0; firstWord < words.length; firstWord++) {
                const candidateName = words.slice(firstWord).map(word => word[0]).join(' ');
                if (!symbols.lookup(candidateName)) {
                    continue;
                }
                resolvedType = createTypeReference(source, {
                    start: parameter.type.range.start + words[firstWord].index,
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
function resolveComputedFields(routines, symbols, diagnostics) {
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
function maskComments(source, diagnostics) {
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
            }
            else if (/[\p{Cc}]/u.test(character)) {
                diagnostics.push({
                    message: 'Non-printable characters are not allowed in comments.',
                    range: { start: index, end: index + 1 }
                });
                if (character !== '\n' && character !== '\r') {
                    characters[index] = 32;
                }
            }
            else {
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
    const chunks = [];
    const chunkSize = 8192;
    for (let start = 0; start < characters.length; start += chunkSize) {
        chunks.push(String.fromCharCode(...characters.subarray(start, Math.min(start + chunkSize, characters.length))));
    }
    return chunks.join('');
}
function parseGlobalVariableDeclaration(source, segmentStart, periodIndex, diagnostics) {
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
    const hasExplicitType = Boolean(typeArticle && indefiniteArticles.has(typeArticle.value.toLocaleLowerCase('pt-BR')));
    let type;
    let initializer;
    let inferredTypeName;
    if (hasExplicitType && typeArticle) {
        const fieldsKeyword = findWord(source, typeArticle.end, periodIndex, 'com');
        const initializerMarker = findEqualTo(source, fieldsKeyword?.start ?? typeArticle.end, periodIndex);
        const typeRange = trimRange(source, typeArticle.end, fieldsKeyword?.start ?? initializerMarker?.start ?? periodIndex);
        if (typeRange.start === typeRange.end) {
            return undefined;
        }
        type = createTypeReference(source, typeRange);
        let fields;
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
    }
    else {
        const initializerRange = trimRange(source, operator.end, periodIndex);
        initializer = parseGlobalVariableLiteral(source, initializerRange);
        if (!initializer) {
            diagnostics.push({
                message: 'Invalid global variable initializer.',
                range: initializerRange
            });
        }
        else {
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
function inferGlobalVariableTypeName(literal) {
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
function findDeclarationPeriod(source, start) {
    let inString = false;
    let parenthesisDepth = 0;
    for (let index = start; index < source.length; index++) {
        if (source[index] === '"') {
            if (!inString) {
                inString = true;
                continue;
            }
            if (source[index + 1] === '"') {
                if (source[index + 2] === '.' &&
                    (index + 3 === source.length || /\s/u.test(source[index + 3]))) {
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
function findEqualTo(source, start, end) {
    const match = /\bigual\s+a\b/iu.exec(source.slice(start, end));
    if (!match) {
        return undefined;
    }
    const matchStart = start + match.index;
    return { start: matchStart, end: matchStart + match[0].length };
}
function parseGlobalVariableLiteral(source, range) {
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
function isSigned32BitInteger(value) {
    const number = Number(value);
    return Number.isSafeInteger(number) && number >= -2147483648 && number <= 2147483647;
}
function isValidStringLiteral(text) {
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
function validateGlobalVariableTypes(declarations, symbols, diagnostics) {
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
function validateBaseTypes(declarations, symbols, diagnostics) {
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
function resolveFields(source, declarations, symbols, diagnostics) {
    for (const declaration of declarations) {
        const ownerTypeName = 'baseType' in declaration
            ? declaration.name.name
            : declaration.type?.name;
        const isListType = ownerTypeName !== undefined &&
            symbols.getBaseTypeDistance(ownerTypeName, 'lista') !== undefined;
        const fields = declaration.fields?.filter((field) => field.kind === 'named') ?? [];
        const fieldNames = new Map();
        for (const field of fields) {
            let resolvedType;
            if (field.usesTypeAlias) {
                const aliasText = source.slice(field.name.range.start, field.name.range.end);
                const words = [...aliasText.matchAll(/\S+/gu)];
                for (let firstWord = 0; firstWord < words.length; firstWord++) {
                    const candidateName = words.slice(firstWord).map(word => word[0]).join(' ');
                    if (!symbols.lookup(candidateName)) {
                        continue;
                    }
                    const typeStart = field.name.range.start + words[firstWord].index;
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
                            words[lastWord].index +
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
                }
                else {
                    field.type = resolvedType;
                }
            }
            else if (symbols.lookup(field.type.name)) {
                resolvedType = field.type;
            }
            else {
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
            }
            else {
                fieldNames.set(fieldName, field.name);
            }
        }
    }
}
function parseFraction(fraction) {
    const [numerator, denominator = '1'] = fraction.split('/');
    return [BigInt(numerator), BigInt(denominator)];
}
function formatFraction(numerator, denominator) {
    const divisor = greatestCommonDivisor(numerator, denominator);
    return `${numerator / divisor}/${denominator / divisor}`;
}
function greatestCommonDivisor(first, second) {
    let a = first < 0n ? -first : first;
    let b = second < 0n ? -second : second;
    while (b !== 0n) {
        [a, b] = [b, a % b];
    }
    return a || 1n;
}
function findTypeReferenceAtOffset(parsedDocument, offset) {
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
        if (declaration.type &&
            offset >= declaration.type.range.start &&
            offset <= declaration.type.range.end) {
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
            if (offset >= localVariable.type.range.start &&
                offset <= localVariable.type.range.end) {
                return localVariable.type;
            }
        }
        for (const parameter of [
            ...routine.parameters,
            ...(routine.returnParameter ? [routine.returnParameter] : [])
        ]) {
            if (offset >= parameter.type.range.start &&
                offset <= parameter.type.range.end) {
                return parameter.type;
            }
        }
        for (const call of routine.calls) {
            const localVariableType = call.localVariable?.type;
            if (localVariableType &&
                offset >= localVariableType.range.start &&
                offset <= localVariableType.range.end) {
                return localVariableType;
            }
        }
        for (const process of routine.processes) {
            const returnType = process.returnVariable?.type;
            if (returnType &&
                offset >= returnType.range.start &&
                offset <= returnType.range.end) {
                return returnType;
            }
        }
    }
    return undefined;
}
const parsedReferencesCache = new WeakMap();
const parsedReferenceIndexCache = new WeakMap();
function getParsedReferences(parsed) {
    const cachedReferences = parsedReferencesCache.get(parsed);
    if (cachedReferences) {
        return cachedReferences;
    }
    const references = [];
    const add = (kind, name, range, options = {}) => {
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
    const addType = (reference, declaration = false) => {
        if (!reference) {
            return;
        }
        const symbol = parsed.symbols.lookup(reference.name);
        add('type', symbol?.normalizedName ?? reference.name, reference.range, { declaration });
    };
    const addFields = (fields, ownerTypeName) => {
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
    const addVariableAccesses = (accesses, routine) => {
        for (const access of accesses ?? []) {
            add('variable', access.reference.name, access.reference.range, {
                scope: access.scope === undefined ? undefined : routine.range.start
            });
        }
    };
    const addFieldAccesses = (accesses, ownerTypeName) => {
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
function findParsedReferenceAtOffset(parsed, offset) {
    const references = getParsedReferences(parsed);
    let index = parsedReferenceIndexCache.get(parsed);
    if (!index) {
        const entries = references.map((reference, order) => ({ reference, order }));
        entries.sort((first, second) => first.reference.range.start - second.reference.range.start ||
            first.order - second.order);
        const prefixMaxEnd = [];
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
        }
        else {
            high = middle;
        }
    }
    const priority = {
        variable: 0,
        field: 1,
        routine: 2,
        type: 3
    };
    let selected;
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
        if (candidatePriority < selectedPriority ||
            candidatePriority === selectedPriority &&
                !Number.isNaN(declarationDifference) &&
                declarationDifference > 0 ||
            candidatePriority === selectedPriority &&
                (Number.isNaN(declarationDifference) || declarationDifference === 0) &&
                order < selectedOrder) {
            selected = reference;
            selectedPriority = candidatePriority;
            selectedOrder = order;
        }
    }
    return selected;
}
function findFieldOwner(field, parsed) {
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
function parseDeclaration(source, segmentStart, periodIndex, diagnostics) {
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
    let baseNameRange;
    let pointedType;
    let fields;
    if (scalarFactor) {
        baseNameRange = trimRange(source, scalarFactor.end, periodIndex);
    }
    else {
        const baseArticle = readWord(source, operator.end, periodIndex);
        if (!baseArticle || !indefiniteArticles.has(baseArticle.value.toLocaleLowerCase('pt-BR'))) {
            return undefined;
        }
        const pointerTarget = findWord(source, baseArticle.end, periodIndex, 'para');
        const fieldsKeyword = findWord(source, baseArticle.end, pointerTarget?.start ?? periodIndex, 'com');
        baseNameRange = trimRange(source, baseArticle.end, fieldsKeyword?.start ?? pointerTarget?.start ?? periodIndex);
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
function parseFields(source, start, end) {
    const fields = [];
    const diagnostics = [];
    let fieldStart = start;
    while (fieldStart < end) {
        const count = readInteger(source, fieldStart, end);
        if (count) {
            const typeStart = skipWhitespace(source, count.end, end);
            const fieldSeparator = findFieldSeparator(source, typeStart, end);
            const marker = findFieldMarker(source, typeStart, fieldSeparator?.start ?? end);
            const separator = marker
                ? findFieldSeparator(source, marker.end, end)
                : fieldSeparator;
            const typeRange = trimRange(source, typeStart, marker?.start ?? separator?.start ?? end);
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
function findReferenceMarker(source, start, end) {
    const match = /\(\s*referência\s*\)/iu.exec(source.slice(start, end));
    if (!match) {
        return undefined;
    }
    const matchStart = start + match.index;
    return { start: matchStart, end: matchStart + match[0].length };
}
function skipWhitespace(source, start, end) {
    while (start < end && /\s/u.test(source[start])) {
        start++;
    }
    return start;
}
function parseUnionTarget(source, start, end) {
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
function findFieldMarker(source, start, end) {
    const markers = new Set(['denominado', 'denominada', 'denominados', 'denominadas']);
    const words = /\p{L}+/gu;
    words.lastIndex = start;
    let match;
    while ((match = words.exec(source)) && match.index < end) {
        const wordEnd = match.index + match[0].length;
        const previousCharacter = match.index > start ? source[match.index - 1] : '';
        const nextCharacter = wordEnd < end ? source[wordEnd] : '';
        if (!isWordCharacter(previousCharacter) &&
            !isWordCharacter(nextCharacter) &&
            markers.has(match[0].toLocaleLowerCase('pt-BR'))) {
            return { start: match.index, end: wordEnd };
        }
    }
    return undefined;
}
function findAnyWord(source, start, end, expectedWords) {
    const words = /\p{L}+/gu;
    words.lastIndex = start;
    let match;
    while ((match = words.exec(source)) && match.index < end) {
        const wordEnd = match.index + match[0].length;
        if (!isWordCharacter(match.index > start ? source[match.index - 1] : '') &&
            !isWordCharacter(wordEnd < end ? source[wordEnd] : '') &&
            expectedWords.has(match[0].toLocaleLowerCase('pt-BR'))) {
            return { start: match.index, end: wordEnd, value: match[0] };
        }
    }
    return undefined;
}
function findFieldSeparator(source, start, end) {
    const commaIndex = source.indexOf(',', start);
    let separator = commaIndex !== -1 && commaIndex < end
        ? { start: commaIndex, nextStart: skipWhitespace(source, commaIndex + 1, end) }
        : undefined;
    const words = /\p{L}+/gu;
    words.lastIndex = start;
    let match;
    while ((match = words.exec(source)) && match.index < end) {
        const wordEnd = match.index + match[0].length;
        if (match[0].toLocaleLowerCase('pt-BR') !== 'e' ||
            isWordCharacter(match.index > start ? source[match.index - 1] : '') ||
            isWordCharacter(wordEnd < end ? source[wordEnd] : '')) {
            continue;
        }
        if (separator && separator.start < match.index) {
            break;
        }
        const nextStart = skipWhitespace(source, wordEnd, end);
        const nextArticle = readWord(source, nextStart, end);
        const nextCount = readInteger(source, nextStart, end);
        if ((nextArticle && indefiniteArticles.has(nextArticle.value.toLocaleLowerCase('pt-BR'))) ||
            nextCount) {
            separator = { start: match.index, nextStart };
            break;
        }
    }
    return separator;
}
function readInteger(source, start, end) {
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
function readScalarFactor(source, start, end) {
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
function findOperator(source, start, end) {
    const words = /\p{L}+/gu;
    words.lastIndex = start;
    let match;
    while ((match = words.exec(source)) && match.index < end) {
        const wordEnd = match.index + match[0].length;
        const previousCharacter = match.index > start ? source[match.index - 1] : '';
        const nextCharacter = wordEnd < end ? source[wordEnd] : '';
        if (isWordCharacter(previousCharacter) ||
            isWordCharacter(nextCharacter) ||
            isIdentifierJoiner(previousCharacter) ||
            isIdentifierJoiner(nextCharacter)) {
            continue;
        }
        const normalizedWord = match[0].toLocaleLowerCase('pt-BR');
        if (normalizedWord === 'é' || normalizedWord === 'são') {
            return { value: normalizedWord, start: match.index, end: wordEnd };
        }
    }
    return undefined;
}
function findWord(source, start, end, expectedWord) {
    const words = /\p{L}+/gu;
    words.lastIndex = start;
    let match;
    while ((match = words.exec(source)) && match.index < end) {
        const wordEnd = match.index + match[0].length;
        const previousCharacter = match.index > start ? source[match.index - 1] : '';
        const nextCharacter = wordEnd < end ? source[wordEnd] : '';
        if (!isWordCharacter(previousCharacter) &&
            !isWordCharacter(nextCharacter) &&
            match[0].toLocaleLowerCase('pt-BR') === expectedWord) {
            return { start: match.index, end: wordEnd };
        }
    }
    return undefined;
}
function findWordOutsideStrings(source, start, end, expectedWord) {
    const quotedRanges = findQuotedRanges(source, { start, end });
    const words = /\p{L}+/gu;
    words.lastIndex = start;
    let match;
    while ((match = words.exec(source)) && match.index < end) {
        const wordStart = match.index;
        if (quotedRanges.some(quoted => wordStart >= quoted.start && wordStart < quoted.end)) {
            continue;
        }
        const wordEnd = match.index + match[0].length;
        if (!isWordCharacter(match.index > start ? source[match.index - 1] : '') &&
            !isWordCharacter(wordEnd < end ? source[wordEnd] : '') &&
            match[0].toLocaleLowerCase('pt-BR') === expectedWord) {
            return { start: match.index, end: wordEnd };
        }
    }
    return undefined;
}
function findQuotedRanges(source, range) {
    const quotedRanges = [];
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
function readWord(source, start, end) {
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
function isWordCharacter(character) {
    return /[\p{L}\p{N}_]/u.test(character);
}
function trimRange(source, start, end) {
    while (start < end && /\s/u.test(source[start])) {
        start++;
    }
    while (end > start && /\s/u.test(source[end - 1])) {
        end--;
    }
    return { start, end };
}
function createTypeReference(source, range) {
    const name = source.slice(range.start, range.end).replace(/\s+/gu, ' ');
    return {
        name,
        normalizedName: normalizeTypeName(name),
        range
    };
}
//# sourceMappingURL=typeParser.js.map