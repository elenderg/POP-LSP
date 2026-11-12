"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceAnalysisIndex = exports.DeclarationDependencyGraph = void 0;
exports.getWorkspaceDuplicateDeclarations = getWorkspaceDuplicateDeclarations;
exports.getDocumentAnalysis = getDocumentAnalysis;
const node_perf_hooks_1 = require("node:perf_hooks");
const typeParser_1 = require("./typeParser");
class DeclarationDependencyGraph {
    nodes;
    edges;
    unresolvedReferenceCount;
    regionsByUri = new Map();
    potentialDependentsByDirectoryAndName = new Map();
    ambiguousDependentsByDirectoryAndKind = new Map();
    dependentsByRegion = new Map();
    constructor(documents) {
        const workspaceDocuments = [...documents];
        const nodes = [];
        const declarationsBySymbol = new Map();
        const declarationsByReference = new Map();
        const pendingReferences = [];
        const addAmbiguousDependent = (directory, kind, node) => {
            let byKind = this.ambiguousDependentsByDirectoryAndKind.get(directory);
            if (!byKind) {
                byKind = new Map();
                this.ambiguousDependentsByDirectoryAndKind.set(directory, byKind);
            }
            const dependents = byKind.get(kind) ?? new Set();
            dependents.add(node.id);
            byKind.set(kind, dependents);
        };
        const addPotentialName = (node, kind, name, container) => {
            const key = workspaceNameKey(kind, name, container);
            let byName = this.potentialDependentsByDirectoryAndName.get(node.directory);
            if (!byName) {
                byName = new Map();
                this.potentialDependentsByDirectoryAndName.set(node.directory, byName);
            }
            const dependents = byName.get(key) ?? new Set();
            dependents.add(node.id);
            byName.set(key, dependents);
        };
        for (const { uri, directory, parsed, analysis } of workspaceDocuments) {
            const occurrenceByFingerprint = new Map();
            const documentNodes = parsed.regions.map(region => {
                const occurrence = occurrenceByFingerprint.get(region.fingerprint) ?? 0;
                occurrenceByFingerprint.set(region.fingerprint, occurrence + 1);
                const node = {
                    id: `${uri}\u0000${region.fingerprint}\u0000${occurrence}`,
                    uri,
                    directory,
                    region
                };
                nodes.push(node);
                return node;
            });
            this.regionsByUri.set(uri, documentNodes);
            const references = analysis?.references ?? (0, typeParser_1.getParsedReferences)(parsed);
            const routinesByStart = new Map(parsed.routines.map(routine => [routine.range.start, routine]));
            const declarationsByStart = new Map([
                ...parsed.declarations.map(declaration => [
                    declaration.range.start,
                    declaration
                ]),
                ...parsed.globalVariables.map(declaration => [
                    declaration.range.start,
                    declaration
                ])
            ]);
            for (const reference of references) {
                const owner = findDeclarationRegion(documentNodes, reference.range);
                if (!owner) {
                    continue;
                }
                if (reference.declaration) {
                    const key = declarationRegionReferenceKey(uri, reference);
                    addDeclarationRegion(declarationsByReference, key, owner);
                    if (reference.symbolId) {
                        addDeclarationRegion(declarationsBySymbol, key, owner);
                    }
                }
                else {
                    pendingReferences.push({ node: owner, reference });
                }
                if (reference.kind === 'field' && !reference.container) {
                    addAmbiguousDependent(directory, 'field', owner);
                }
            }
            const analysisReferences = references;
            for (const regionNode of documentNodes) {
                if (regionNode.region.kind === 'routine') {
                    const routine = routinesByStart.get(regionNode.region.range.start);
                    if (!routine) {
                        addAmbiguousDependent(directory, 'type', regionNode);
                        addAmbiguousDependent(directory, 'routine', regionNode);
                        addAmbiguousDependent(directory, 'variable', regionNode);
                        addAmbiguousDependent(directory, 'field', regionNode);
                        continue;
                    }
                    if (routine.parameters.length > 0 ||
                        routine.alternateParameters.some(parameters => parameters.length > 0) ||
                        routine.returnParameter ||
                        routine.computedField) {
                        addAmbiguousDependent(directory, 'type', regionNode);
                    }
                    if (routine.calls.length > 0 ||
                        routine.conditionals.some(conditional => conditional.predicateCall)) {
                        addAmbiguousDependent(directory, 'routine', regionNode);
                    }
                    if (routine.localVariables.length > 0 ||
                        routine.calls.some(call => (call.variableAccesses?.length ?? 0) > 0) ||
                        routine.assignments.some(assignment => (assignment.variableAccesses?.length ?? 0) > 0) ||
                        routine.outputs.some(output => (output.variableAccesses?.length ?? 0) > 0) ||
                        routine.processes.some(process => (process.variableAccesses?.length ?? 0) > 0)) {
                        addAmbiguousDependent(directory, 'variable', regionNode);
                    }
                    if (routine.computedFieldAccesses.length > 0 ||
                        routine.listSpecialFieldAccesses.length > 0 ||
                        routine.assignments.some(assignment => (assignment.fieldAccesses?.length ?? 0) > 0) ||
                        routine.outputs.some(output => (output.fieldAccesses?.length ?? 0) > 0) ||
                        routine.calls.some(call => (call.fieldAccesses?.length ?? 0) > 0) ||
                        routine.processes.some(process => process.fieldAccesses.length > 0) ||
                        routine.memoryDeallocations.some(deallocation => (deallocation.fieldAccesses?.length ?? 0) > 0)) {
                        addAmbiguousDependent(directory, 'field', regionNode);
                    }
                    continue;
                }
                const declaration = declarationsByStart.get(regionNode.region.range.start);
                if (declaration?.fields?.some(field => field.kind === 'named' && field.usesTypeAlias)) {
                    addAmbiguousDependent(directory, 'type', regionNode);
                    const aliases = declaration.fields?.filter((field) => field.kind === 'named' && field.usesTypeAlias) ?? [];
                    for (const field of aliases) {
                        const words = (0, typeParser_1.normalizeTypeName)(field.name.name)
                            .split(/\s+/u)
                            .filter(Boolean);
                        for (let start = 0; start < words.length; start++) {
                            addPotentialName(regionNode, 'type', words.slice(start).join(' '));
                        }
                        if (regionNode.region.kind === 'type' &&
                            'baseType' in declaration &&
                            parsed.symbols.getBaseTypeDistance(declaration.name.name, 'lista') !== undefined) {
                            for (let end = 1; end <= words.length; end++) {
                                addPotentialName(regionNode, 'type', words.slice(0, end).join(' '));
                            }
                        }
                    }
                }
            }
            for (const reference of analysisReferences) {
                if (reference.kind === 'type' && reference.scope !== undefined) {
                    const owner = findDeclarationRegion(documentNodes, reference.range);
                    if (owner) {
                        addAmbiguousDependent(directory, 'type', owner);
                    }
                }
            }
            for (const diagnostic of parsed.diagnostics) {
                const owner = findDeclarationRegion(documentNodes, diagnostic.range);
                if (!owner) {
                    continue;
                }
                const message = diagnostic.message;
                const quotedName = /"([^"]+)"/u.exec(message)?.[1];
                if (/type|tipo/u.test(message) ||
                    message.startsWith('No type matches field alias')) {
                    addAmbiguousDependent(directory, 'type', owner);
                    if (quotedName) {
                        const words = (0, typeParser_1.normalizeTypeName)(quotedName)
                            .split(/\s+/u)
                            .filter(Boolean);
                        for (let start = 0; start < words.length; start++) {
                            addPotentialName(owner, 'type', words.slice(start).join(' '));
                        }
                    }
                }
                if (/routine|function|rotina|função/u.test(message)) {
                    addAmbiguousDependent(directory, 'routine', owner);
                    if (quotedName) {
                        addPotentialName(owner, 'routine', (0, typeParser_1.normalizeTypeName)(quotedName));
                    }
                }
                if (/variable|variável/u.test(message)) {
                    addAmbiguousDependent(directory, 'variable', owner);
                    if (quotedName) {
                        addPotentialName(owner, 'variable', (0, typeParser_1.normalizeTypeName)(quotedName));
                    }
                }
                if (/field|campo/u.test(message)) {
                    addAmbiguousDependent(directory, 'field', owner);
                    if (quotedName) {
                        addPotentialName(owner, 'field', (0, typeParser_1.normalizeTypeName)(quotedName));
                    }
                }
            }
        }
        const edges = [];
        let unresolvedReferenceCount = 0;
        for (const { node, reference } of pendingReferences) {
            const targets = reference.symbolId
                ? declarationsBySymbol.get(declarationRegionReferenceKey(node.uri, reference)) ?? []
                : declarationsByReference.get(declarationRegionReferenceKey(node.uri, reference)) ?? [];
            if (targets.length === 0) {
                unresolvedReferenceCount++;
            }
            for (const target of targets) {
                edges.push({ from: node, to: target, reference });
                const dependents = this.dependentsByRegion.get(target.id) ?? new Set();
                dependents.add(node.id);
                this.dependentsByRegion.set(target.id, dependents);
            }
            const nameKey = workspaceNameKey(reference.kind, reference.name, reference.container);
            let byName = this.potentialDependentsByDirectoryAndName.get(node.directory);
            if (!byName) {
                byName = new Map();
                this.potentialDependentsByDirectoryAndName.set(node.directory, byName);
            }
            const dependents = byName.get(nameKey) ?? new Set();
            dependents.add(node.id);
            byName.set(nameKey, dependents);
            if (reference.container !== undefined) {
                const unqualifiedKey = workspaceNameKey(reference.kind, reference.name);
                const unqualifiedDependents = byName.get(unqualifiedKey) ?? new Set();
                unqualifiedDependents.add(node.id);
                byName.set(unqualifiedKey, unqualifiedDependents);
            }
        }
        this.nodes = nodes;
        this.edges = edges;
        this.unresolvedReferenceCount = unresolvedReferenceCount;
    }
    getRegions(uri) {
        return this.regionsByUri.get(uri) ?? [];
    }
    getAffectedRegionsForDeclarationChanges(directory, changes, changedRegionIds = []) {
        const affected = new Set(changedRegionIds);
        const pending = [...affected];
        for (const change of changes) {
            const byName = this.potentialDependentsByDirectoryAndName.get(directory);
            const keys = [
                workspaceNameKey(change.kind, change.normalizedName, change.normalizedContainer)
            ];
            if (change.normalizedContainer !== undefined) {
                keys.push(workspaceNameKey(change.kind, change.normalizedName));
            }
            for (const key of keys) {
                for (const dependent of byName?.get(key) ?? []) {
                    if (!affected.has(dependent)) {
                        affected.add(dependent);
                        pending.push(dependent);
                    }
                }
                for (const dependent of this.ambiguousDependentsByDirectoryAndKind
                    .get(directory)
                    ?.get(change.kind) ?? []) {
                    if (!affected.has(dependent)) {
                        affected.add(dependent);
                        pending.push(dependent);
                    }
                }
            }
        }
        while (pending.length > 0) {
            const current = pending.pop();
            for (const dependent of this.dependentsByRegion.get(current) ?? []) {
                if (!affected.has(dependent)) {
                    affected.add(dependent);
                    pending.push(dependent);
                }
            }
        }
        return affected;
    }
}
exports.DeclarationDependencyGraph = DeclarationDependencyGraph;
function addDeclarationRegion(declarations, key, region) {
    const regions = declarations.get(key) ?? [];
    if (!regions.includes(region)) {
        regions.push(region);
        declarations.set(key, regions);
    }
}
function declarationRegionReferenceKey(uri, reference) {
    const key = referenceKey(reference);
    return reference.scope === undefined ? key : `${uri}\u0000${key}`;
}
function findDeclarationRegion(regions, range) {
    let low = 0;
    let high = regions.length - 1;
    while (low <= high) {
        const middle = (low + high) >>> 1;
        const region = regions[middle].region.range;
        if (range.start < region.start) {
            high = middle - 1;
        }
        else if (range.start >= region.end) {
            low = middle + 1;
        }
        else {
            return range.end <= region.end ? regions[middle] : undefined;
        }
    }
    return undefined;
}
function getWorkspaceDuplicateDeclarations(documents) {
    const declarationsByDirectory = new Map();
    const add = (directory, uri, kind, name, identity, range) => {
        let declarationsByIdentity = declarationsByDirectory.get(directory);
        if (!declarationsByIdentity) {
            declarationsByIdentity = new Map();
            declarationsByDirectory.set(directory, declarationsByIdentity);
        }
        const declarations = declarationsByIdentity.get(identity) ?? [];
        declarations.push({ uri, declaration: { kind, name, range } });
        declarationsByIdentity.set(identity, declarations);
    };
    for (const { uri, directory, parsed } of documents) {
        for (const declaration of parsed.declarations) {
            add(directory, uri, 'type', declaration.name.name, `type:${declaration.name.normalizedName}`, declaration.name.range);
        }
        for (const declaration of parsed.globalVariables) {
            add(directory, uri, 'variable', declaration.name.name, `variable:${declaration.name.normalizedName}`, declaration.name.range);
        }
        for (const routine of parsed.routines) {
            add(directory, uri, 'routine', routine.name.name, `routine:${routine.bindingId ?? routine.name.normalizedName}`, routine.name.range);
            const computedField = routine.computedField;
            if (computedField) {
                add(directory, uri, 'field', computedField.name.name, `field:${computedField.structureType.normalizedName}:` +
                    computedField.name.normalizedName, computedField.name.range);
            }
        }
    }
    const duplicatesByUri = new Map();
    for (const declarationsByIdentity of declarationsByDirectory.values()) {
        for (const declarations of declarationsByIdentity.values()) {
            if (declarations.length < 2) {
                continue;
            }
            for (const duplicate of declarations.slice(1)) {
                const duplicates = duplicatesByUri.get(duplicate.uri) ?? [];
                duplicates.push(duplicate.declaration);
                duplicatesByUri.set(duplicate.uri, duplicates);
            }
        }
    }
    return duplicatesByUri;
}
class WorkspaceAnalysisIndex {
    documentCount;
    referenceCount;
    dependencyCount;
    referencesByDirectoryAndSymbol = new Map();
    referencesByDocumentAndSymbol = new Map();
    typeDeclarationsByDirectoryAndName = new Map();
    routineDeclarationsByDirectoryAndSymbol = new Map();
    routineDeclarationsByDirectoryAndName = new Map();
    potentialDependentsByDirectoryAndName = new Map();
    unresolvedDependentsByDirectoryAndKind = new Map();
    dependenciesByDocument = new Map();
    dependentsByDocument = new Map();
    dependencyKindsByDocument = new Map();
    constructor(documents) {
        const workspaceDocuments = [...documents].map(entry => {
            if (!entry.parsed && !entry.analysis) {
                throw new Error('Workspace analysis documents require a parsed document or document analysis.');
            }
            const references = entry.analysis?.references ??
                (0, typeParser_1.getParsedReferences)(entry.parsed);
            const routines = entry.parsed?.routines ??
                [...entry.analysis.nodes.values()].flatMap(node => node.kind === 'routine-declaration' && node.routineDeclaration
                    ? [node.routineDeclaration]
                    : []);
            const diagnostics = entry.parsed?.diagnostics ??
                entry.analysis?.diagnostics ?? [];
            return {
                ...entry,
                references,
                routines,
                diagnostics
            };
        });
        let documentCount = 0;
        let referenceCount = 0;
        let dependencyCount = 0;
        const addPotentialDependent = (directory, kind, name, container, uri) => {
            const key = workspaceNameKey(kind, name, container);
            let dependentsByName = this.potentialDependentsByDirectoryAndName.get(directory);
            if (!dependentsByName) {
                dependentsByName = new Map();
                this.potentialDependentsByDirectoryAndName.set(directory, dependentsByName);
            }
            const dependents = dependentsByName.get(key) ?? new Set();
            dependents.add(uri);
            dependentsByName.set(key, dependents);
        };
        const addUnresolvedDependent = (directory, kind, uri) => {
            let dependentsByKind = this.unresolvedDependentsByDirectoryAndKind.get(directory);
            if (!dependentsByKind) {
                dependentsByKind = new Map();
                this.unresolvedDependentsByDirectoryAndKind.set(directory, dependentsByKind);
            }
            const dependents = dependentsByKind.get(kind) ?? new Set();
            dependents.add(uri);
            dependentsByKind.set(kind, dependents);
        };
        const addDependency = (uri, dependencyUri, kind) => {
            if (uri === dependencyUri) {
                return;
            }
            const dependencies = this.dependenciesByDocument.get(uri);
            if (!dependencies) {
                return;
            }
            const kindsByDependency = this.dependencyKindsByDocument.get(uri);
            if (!kindsByDependency) {
                return;
            }
            const kinds = kindsByDependency.get(dependencyUri) ?? new Set();
            kinds.add(kind);
            kindsByDependency.set(dependencyUri, kinds);
            const isNewDependency = !dependencies.has(dependencyUri);
            dependencies.add(dependencyUri);
            this.dependentsByDocument.get(dependencyUri)?.add(uri);
            if (isNewDependency) {
                dependencyCount++;
            }
        };
        for (const { uri, directory, references, routines } of workspaceDocuments) {
            documentCount++;
            this.dependenciesByDocument.set(uri, new Set());
            this.dependentsByDocument.set(uri, new Set());
            this.dependencyKindsByDocument.set(uri, new Map());
            let referencesBySymbol = this.referencesByDirectoryAndSymbol.get(directory);
            if (!referencesBySymbol) {
                referencesBySymbol = new Map();
                this.referencesByDirectoryAndSymbol.set(directory, referencesBySymbol);
            }
            const documentReferencesBySymbol = new Map();
            this.referencesByDocumentAndSymbol.set(uri, documentReferencesBySymbol);
            let routinesBySymbol = this.routineDeclarationsByDirectoryAndSymbol.get(directory);
            if (!routinesBySymbol) {
                routinesBySymbol = new Map();
                this.routineDeclarationsByDirectoryAndSymbol.set(directory, routinesBySymbol);
            }
            let routinesByName = this.routineDeclarationsByDirectoryAndName.get(directory);
            if (!routinesByName) {
                routinesByName = new Map();
                this.routineDeclarationsByDirectoryAndName.set(directory, routinesByName);
            }
            const routineReferencesByRange = new Map(references
                .filter(reference => reference.kind === 'routine' && reference.declaration)
                .map(reference => [
                `${reference.range.start}:${reference.range.end}`,
                reference
            ]));
            for (const routine of routines) {
                const primaryReference = routineReferencesByRange.get(`${routine.name.range.start}:${routine.name.range.end}`);
                if (!primaryReference) {
                    continue;
                }
                const symbolId = referenceKey(primaryReference);
                const symbolRoutines = routinesBySymbol.get(symbolId) ?? [];
                symbolRoutines.push({ uri, declaration: routine });
                routinesBySymbol.set(symbolId, symbolRoutines);
                const routinesWithName = routinesByName.get(routine.name.normalizedName) ?? [];
                routinesWithName.push({ uri, declaration: routine });
                routinesByName.set(routine.name.normalizedName, routinesWithName);
                for (const alias of routine.alternateNames) {
                    const aliasCandidates = routinesByName.get(alias.normalizedName) ?? [];
                    aliasCandidates.push({ uri, declaration: routine });
                    routinesByName.set(alias.normalizedName, aliasCandidates);
                    addPotentialDependent(directory, 'routine', alias.normalizedName, undefined, uri);
                }
            }
            for (const reference of references) {
                referenceCount++;
                const symbolId = referenceKey(reference);
                if (reference.declaration) {
                    addPotentialDependent(directory, reference.kind, reference.name, reference.container, uri);
                }
                const documentReferences = documentReferencesBySymbol.get(symbolId) ?? [];
                documentReferences.push({ uri, reference });
                documentReferencesBySymbol.set(symbolId, documentReferences);
                if (reference.scope === undefined) {
                    const symbolReferences = referencesBySymbol.get(symbolId) ?? [];
                    symbolReferences.push({ uri, reference });
                    referencesBySymbol.set(symbolId, symbolReferences);
                }
                if (reference.kind === 'type' && reference.declaration) {
                    let declarationsByName = this.typeDeclarationsByDirectoryAndName.get(directory);
                    if (!declarationsByName) {
                        declarationsByName = new Map();
                        this.typeDeclarationsByDirectoryAndName.set(directory, declarationsByName);
                    }
                    const declarations = declarationsByName.get(reference.name) ?? [];
                    declarations.push({ uri, reference });
                    declarationsByName.set(reference.name, declarations);
                }
            }
        }
        for (const { uri, directory, references, diagnostics, routines } of workspaceDocuments) {
            for (const diagnostic of diagnostics) {
                const quotedName = /"([^"]+)"/u.exec(diagnostic.message)?.[1];
                const normalizedName = quotedName
                    ? normalizeUnresolvedName(quotedName)
                    : undefined;
                if (diagnostic.message.startsWith('No compatible routine found') ||
                    diagnostic.message.startsWith('No routine found for address reference') ||
                    diagnostic.message.startsWith('No boolean function found for condition')) {
                    addUnresolvedDependent(directory, 'routine', uri);
                }
                else if (diagnostic.message.startsWith('Unknown structure field access')) {
                    if (normalizedName) {
                        addPotentialDependent(directory, 'field', normalizedName, undefined, uri);
                    }
                    addUnresolvedDependent(directory, 'field', uri);
                }
                else if (diagnostic.message.startsWith('Unknown variable or field')) {
                    if (normalizedName) {
                        addPotentialDependent(directory, 'variable', normalizedName, undefined, uri);
                        addPotentialDependent(directory, 'field', normalizedName, undefined, uri);
                    }
                    addUnresolvedDependent(directory, 'variable', uri);
                    addUnresolvedDependent(directory, 'field', uri);
                }
                else if (diagnostic.message.startsWith('Unknown variable or type')) {
                    if (normalizedName) {
                        addPotentialDependent(directory, 'variable', normalizedName, undefined, uri);
                        addPotentialDependent(directory, 'type', normalizedName, undefined, uri);
                    }
                    else {
                        addUnresolvedDependent(directory, 'variable', uri);
                        addUnresolvedDependent(directory, 'type', uri);
                    }
                }
                else if (diagnostic.message.startsWith('Unknown function pointer')) {
                    if (normalizedName) {
                        addPotentialDependent(directory, 'variable', normalizedName, undefined, uri);
                        addPotentialDependent(directory, 'field', normalizedName, undefined, uri);
                    }
                    else {
                        addUnresolvedDependent(directory, 'variable', uri);
                        addUnresolvedDependent(directory, 'field', uri);
                    }
                }
                else if (diagnostic.message.startsWith('Unknown "Processe" output type') ||
                    diagnostic.message.startsWith('Unknown "Processe" return type')) {
                    const typeName = /^Unknown "Processe" (?:output|return) type "(.+)"\.$/u
                        .exec(diagnostic.message)?.[1];
                    if (typeName) {
                        addPotentialDependent(directory, 'type', (0, typeParser_1.normalizeTypeName)(typeName), undefined, uri);
                    }
                    else {
                        addUnresolvedDependent(directory, 'type', uri);
                    }
                }
                else if (diagnostic.message.startsWith('No type matches field alias')) {
                    addUnresolvedDependent(directory, 'type', uri);
                }
                else if (diagnostic.message.startsWith('Unknown variable')) {
                    if (normalizedName) {
                        addPotentialDependent(directory, 'variable', normalizedName, undefined, uri);
                    }
                    else {
                        addUnresolvedDependent(directory, 'variable', uri);
                    }
                }
            }
            for (const reference of references) {
                if (reference.declaration) {
                    continue;
                }
                const declarationUris = reference.kind === 'type'
                    ? this.getTypeDeclarations(directory, reference.name)
                        .map(declaration => declaration.uri)
                    : reference.kind === 'routine'
                        ? this.getRoutineDeclarations(directory, reference)
                            .map(declaration => declaration.uri)
                        : [];
                for (const declarationUri of declarationUris) {
                    addDependency(uri, declarationUri, reference.kind);
                }
                if (declarationUris.length === 0 &&
                    reference.scope === undefined &&
                    !(reference.kind === 'type' &&
                        isPrimitiveTypeName(reference.name))) {
                    addPotentialDependent(directory, reference.kind, reference.name, reference.container, uri);
                }
            }
            for (const routine of routines) {
                const calls = [
                    ...routine.calls,
                    ...routine.conditionals.flatMap(conditional => conditional.predicateCall ? [conditional.predicateCall] : [])
                ];
                for (const call of calls) {
                    addPotentialDependent(directory, 'routine', call.name.normalizedName, undefined, uri);
                    if (call.target) {
                        continue;
                    }
                    const candidates = this.routineDeclarationsByDirectoryAndName
                        .get(directory)
                        ?.get(call.name.normalizedName) ?? [];
                    if (candidates.length > 0) {
                        for (const candidate of candidates) {
                            addDependency(uri, candidate.uri, 'routine');
                        }
                    }
                    else {
                        addPotentialDependent(directory, 'routine', call.name.normalizedName, undefined, uri);
                    }
                }
            }
        }
        for (const symbols of this.referencesByDirectoryAndSymbol.values()) {
            for (const references of symbols.values()) {
                const declarationUris = new Set(references
                    .filter(({ reference }) => reference.declaration &&
                    (reference.kind === 'variable' || reference.kind === 'field'))
                    .map(({ uri }) => uri));
                for (const { uri, reference } of references) {
                    if (!reference.declaration &&
                        (reference.kind === 'variable' || reference.kind === 'field')) {
                        for (const declarationUri of declarationUris) {
                            addDependency(uri, declarationUri, reference.kind);
                        }
                    }
                }
            }
        }
        this.documentCount = documentCount;
        this.referenceCount = referenceCount;
        this.dependencyCount = dependencyCount;
    }
    getReferences(directory, reference, documentUri) {
        const symbolId = referenceKey(reference);
        if (reference.scope !== undefined) {
            return documentUri
                ? this.referencesByDocumentAndSymbol
                    .get(documentUri)
                    ?.get(symbolId) ?? []
                : [];
        }
        return this.referencesByDirectoryAndSymbol
            .get(directory)
            ?.get(symbolId) ?? [];
    }
    getDeclaration(directory, reference, documentUri) {
        return this.getReferences(directory, reference, documentUri)
            .find(candidate => candidate.reference.declaration);
    }
    getTypeDeclarations(directory, name) {
        return this.typeDeclarationsByDirectoryAndName
            .get(directory)
            ?.get(name) ?? [];
    }
    getTypeDeclaration(directory, name) {
        return this.getTypeDeclarations(directory, name)[0];
    }
    getRoutineDeclarations(directory, reference) {
        const symbolId = referenceKey(reference);
        return this.routineDeclarationsByDirectoryAndSymbol
            .get(directory)
            ?.get(symbolId) ?? [];
    }
    getDependencies(uri) {
        return this.dependenciesByDocument.get(uri) ?? new Set();
    }
    getDependents(uri) {
        return this.dependentsByDocument.get(uri) ?? new Set();
    }
    getDependencyKinds(uri, dependencyUri) {
        return this.dependencyKindsByDocument.get(uri)?.get(dependencyUri) ??
            new Set();
    }
    getPotentialDependents(directory, kind, name, container) {
        const dependentsByName = this.potentialDependentsByDirectoryAndName
            .get(directory);
        const potential = new Set(dependentsByName?.get(workspaceNameKey(kind, name, container)) ?? []);
        if (container !== undefined) {
            for (const uri of dependentsByName?.get(workspaceNameKey(kind, name, undefined)) ?? []) {
                potential.add(uri);
            }
        }
        for (const uri of this.unresolvedDependentsByDirectoryAndKind
            .get(directory)?.get(kind) ?? []) {
            potential.add(uri);
        }
        return potential;
    }
    getAffectedDocuments(uri) {
        const affected = new Set([uri]);
        const pending = [uri];
        while (pending.length > 0) {
            const current = pending.pop();
            for (const dependent of this.getDependents(current)) {
                if (!affected.has(dependent)) {
                    affected.add(dependent);
                    pending.push(dependent);
                }
            }
        }
        return affected;
    }
    getAffectedDocumentsForDeclarationChanges(uri, directory, changes) {
        const affected = new Set([uri]);
        const pending = [uri];
        for (const change of changes) {
            for (const dependent of this.getPotentialDependents(directory, change.kind, change.normalizedName, change.normalizedContainer)) {
                if (!affected.has(dependent)) {
                    affected.add(dependent);
                    pending.push(dependent);
                }
            }
        }
        while (pending.length > 0) {
            const current = pending.pop();
            for (const dependent of this.getDependents(current)) {
                if (!affected.has(dependent)) {
                    affected.add(dependent);
                    pending.push(dependent);
                }
            }
        }
        return affected;
    }
    hasDependencyCycle(uri) {
        const visited = new Set();
        const visiting = new Set();
        const pending = [
            { uri, dependencies: [...this.getDependencies(uri)], index: 0 }
        ];
        visiting.add(uri);
        while (pending.length > 0) {
            const current = pending[pending.length - 1];
            if (current.index >= current.dependencies.length) {
                pending.pop();
                visiting.delete(current.uri);
                visited.add(current.uri);
                continue;
            }
            const dependency = current.dependencies[current.index++];
            if (visiting.has(dependency)) {
                return true;
            }
            if (!visited.has(dependency)) {
                visiting.add(dependency);
                pending.push({
                    uri: dependency,
                    dependencies: [...this.getDependencies(dependency)],
                    index: 0
                });
            }
        }
        return false;
    }
}
exports.WorkspaceAnalysisIndex = WorkspaceAnalysisIndex;
const documentAnalysisCache = new WeakMap();
function referenceKey(reference) {
    if (reference.symbolId) {
        return reference.symbolId;
    }
    return JSON.stringify([
        reference.kind,
        reference.name,
        reference.scope ?? null,
        reference.container ?? null
    ]);
}
function workspaceNameKey(kind, name, container) {
    return JSON.stringify([kind, name, container ?? null]);
}
function isPrimitiveTypeName(name) {
    return name === 'byte' ||
        name === 'bytes' ||
        name === 'estrutura' ||
        name === 'estruturas';
}
function normalizeUnresolvedName(name) {
    const normalizedName = (0, typeParser_1.normalizeTypeName)(name);
    return normalizedName.replace(/^(?:o|a|os|as|um|uma|uns|umas)\s+/u, '');
}
function rangeKey(kind, range) {
    return `${kind}:${range.start}:${range.end}`;
}
function buildIntervalIndex(values) {
    const sorted = [...values].sort((first, second) => first.range.start - second.range.start ||
        first.range.end - second.range.end);
    const prefixMaxEnd = [];
    let maxEnd = Number.NEGATIVE_INFINITY;
    for (const value of sorted) {
        maxEnd = Math.max(maxEnd, value.range.end);
        prefixMaxEnd.push(maxEnd);
    }
    return { values: sorted, prefixMaxEnd };
}
function findContainingNode(index, range) {
    let low = 0;
    let high = index.values.length;
    while (low < high) {
        const middle = (low + high) >>> 1;
        if (index.values[middle].range.start <= range.start) {
            low = middle + 1;
        }
        else {
            high = middle;
        }
    }
    let selected;
    for (let position = low - 1; position >= 0; position--) {
        if (index.prefixMaxEnd[position] < range.end) {
            break;
        }
        const candidate = index.values[position];
        if (candidate.range.start <= range.start &&
            candidate.range.end >= range.end &&
            (!selected ||
                candidate.range.end - candidate.range.start <
                    selected.range.end - selected.range.start)) {
            selected = candidate;
        }
    }
    return selected;
}
function findReference(index, offset, kind) {
    let low = 0;
    let high = index.references.length;
    while (low < high) {
        const middle = (low + high) >>> 1;
        if (index.references[middle].range.start <= offset) {
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
        const candidate = index.references[position];
        if (offset > candidate.range.end ||
            kind !== undefined && candidate.kind !== kind) {
            continue;
        }
        const candidatePriority = priority[candidate.kind];
        const declarationDifference = Number(candidate.declaration) - Number(selected?.declaration);
        if (candidatePriority < selectedPriority ||
            candidatePriority === selectedPriority &&
                !Number.isNaN(declarationDifference) &&
                declarationDifference > 0 ||
            candidatePriority === selectedPriority &&
                (Number.isNaN(declarationDifference) || declarationDifference === 0) &&
                position < selectedOrder) {
            selected = candidate;
            selectedPriority = candidatePriority;
            selectedOrder = position;
        }
    }
    return selected;
}
function containsOffset(ranges, offset) {
    let low = 0;
    let high = ranges.length;
    while (low < high) {
        const middle = (low + high) >>> 1;
        if (ranges[middle].start <= offset) {
            low = middle + 1;
        }
        else {
            high = middle;
        }
    }
    const candidate = ranges[low - 1];
    return Boolean(candidate && offset < candidate.end);
}
function findTypeDefinitionTarget(index, offset) {
    let low = 0;
    let high = index.targets.length;
    while (low < high) {
        const middle = (low + high) >>> 1;
        if (index.targets[middle].range.start <= offset) {
            low = middle + 1;
        }
        else {
            high = middle;
        }
    }
    let selected;
    for (let position = low - 1; position >= 0; position--) {
        if (index.prefixMaxEnd[position] < offset) {
            break;
        }
        const candidate = index.targets[position];
        if (offset > candidate.range.end ||
            selected && (candidate.priority > selected.priority ||
                candidate.priority === selected.priority &&
                    candidate.order > selected.order)) {
            continue;
        }
        selected = candidate;
    }
    return selected;
}
function getFieldTypeName(field) {
    return field.kind === 'named' ? field.type.name : field.elementType.name;
}
function fieldRange(field) {
    return field.range;
}
function createExpressionReferenceIndex(references) {
    return {
        references: references
            .filter(reference => !reference.declaration)
            .sort((first, second) => first.range.start - second.range.start ||
            first.range.end - second.range.end)
    };
}
function addExpressionNodes(parent, expression, referenceIndex, addNode) {
    if (!expression) {
        return;
    }
    const pending = [{ expression, parent }];
    while (pending.length > 0) {
        const current = pending.pop();
        const kind = current.expression.kind === 'binary'
            ? 'binary-expression'
            : current.expression.kind === 'unary'
                ? 'unary-expression'
                : 'expression-operand';
        const node = addNode(kind, current.expression.range, current.parent, undefined, { expression: current.expression });
        if (current.expression.kind === 'binary') {
            pending.push({ expression: current.expression.right, parent: node }, { expression: current.expression.left, parent: node });
        }
        else if (current.expression.kind === 'unary') {
            pending.push({ expression: current.expression.operand, parent: node });
        }
        else {
            const { references } = referenceIndex;
            let low = 0;
            let high = references.length;
            while (low < high) {
                const middle = (low + high) >>> 1;
                if (references[middle].range.start < current.expression.range.start) {
                    low = middle + 1;
                }
                else {
                    high = middle;
                }
            }
            const parts = [];
            let cursor = current.expression.range.start;
            for (let index = low; index < references.length; index++) {
                const reference = references[index];
                if (reference.range.start >= current.expression.range.end) {
                    break;
                }
                if (reference.range.end > current.expression.range.end) {
                    continue;
                }
                if (reference.range.start < cursor)
                    continue;
                if (cursor < reference.range.start) {
                    parts.push({
                        kind: 'text',
                        text: current.expression.text.slice(cursor - current.expression.range.start, reference.range.start - current.expression.range.start),
                        range: { start: cursor, end: reference.range.start }
                    });
                }
                parts.push({
                    kind: 'reference',
                    text: current.expression.text.slice(reference.range.start - current.expression.range.start, reference.range.end - current.expression.range.start),
                    range: reference.range,
                    reference
                });
                cursor = reference.range.end;
            }
            if (cursor < current.expression.range.end) {
                parts.push({
                    kind: 'text',
                    text: current.expression.text.slice(cursor - current.expression.range.start),
                    range: {
                        start: cursor,
                        end: current.expression.range.end
                    }
                });
            }
            node.expressionOperandParts = parts;
        }
    }
}
function getDocumentAnalysis(parsed, sourceLength = getDocumentSourceEnd(parsed), onProfile) {
    const startedAt = onProfile ? node_perf_hooks_1.performance.now() : 0;
    const analysisSourceLength = Math.max(sourceLength, getDocumentSourceEnd(parsed));
    const cached = documentAnalysisCache.get(parsed)?.get(analysisSourceLength);
    if (cached) {
        onProfile?.({
            durationMs: node_perf_hooks_1.performance.now() - startedAt,
            referenceExtractionMs: 0,
            semanticIndexMs: 0,
            syntaxProjectionMs: 0,
            positionIndexMs: 0,
            topLevelIntervalIndexMs: 0,
            referenceIntervalIndexMs: 0,
            syntaxChildIndexMs: 0,
            referenceNodePlacementMs: 0,
            declarationSymbolIndexMs: 0,
            finalChildIndexMs: 0,
            references: cached.references.length,
            typeDefinitionTargets: cached.typeDefinitionTargetCount,
            symbols: cached.symbols.size,
            scopes: cached.scopes.size,
            nodes: cached.nodes.size,
            cacheHit: true
        });
        return cached;
    }
    const referenceExtractionStartedAt = onProfile ? node_perf_hooks_1.performance.now() : 0;
    const references = (0, typeParser_1.getParsedReferences)(parsed);
    const expressionReferenceIndex = createExpressionReferenceIndex(references);
    const referenceExtractionMs = onProfile
        ? node_perf_hooks_1.performance.now() - referenceExtractionStartedAt
        : 0;
    const semanticIndexStartedAt = onProfile ? node_perf_hooks_1.performance.now() : 0;
    const typeDefinitionTargets = [];
    const addTypeDefinitionTarget = (range, name, priority) => {
        if (name) {
            typeDefinitionTargets.push({
                range,
                name,
                priority,
                order: typeDefinitionTargets.length
            });
        }
    };
    for (const declaration of parsed.globalVariables) {
        addTypeDefinitionTarget(declaration.name.range, declaration.type?.name ?? declaration.inferredTypeName, 0);
    }
    for (const declaration of parsed.declarations) {
        for (const field of declaration.fields ?? []) {
            if (field.name) {
                addTypeDefinitionTarget(field.name.range, field.kind === 'named' ? field.type.name : field.elementType.name, 0);
            }
        }
    }
    const addFieldTargets = (accesses) => {
        for (const access of accesses ?? []) {
            addTypeDefinitionTarget(access.reference.range, getFieldTypeName(access.target), 1);
        }
    };
    for (const routine of parsed.routines) {
        for (const assignment of routine.assignments) {
            addFieldTargets(assignment.fieldAccesses);
        }
        for (const process of routine.processes) {
            addFieldTargets(process.fieldAccesses);
        }
        for (const call of routine.calls) {
            addFieldTargets(call.fieldAccesses);
        }
        for (const deallocation of routine.memoryDeallocations) {
            addFieldTargets(deallocation.fieldAccesses);
        }
    }
    for (const routine of parsed.routines) {
        for (const allocation of routine.memoryAllocations) {
            addTypeDefinitionTarget(allocation.variableAccess?.reference.range ?? allocation.range, allocation.variableAccess?.type.name, 2);
        }
        for (const deallocation of routine.memoryDeallocations) {
            addTypeDefinitionTarget(deallocation.variableAccess?.reference.range ?? deallocation.range, deallocation.variableAccess?.type.name, 2);
        }
        for (const variable of routine.localVariables) {
            addTypeDefinitionTarget(variable.name.range, variable.type.name, 3);
        }
        for (const assignment of routine.assignments) {
            for (const access of assignment.variableAccesses ?? []) {
                addTypeDefinitionTarget(access.reference.range, access.type.name, 4);
            }
        }
        for (const call of routine.calls) {
            for (const access of call.variableAccesses ?? []) {
                addTypeDefinitionTarget(access.reference.range, access.type.name, 4);
            }
        }
        for (const process of routine.processes) {
            for (const access of process.variableAccesses ?? []) {
                addTypeDefinitionTarget(access.reference.range, access.type.name, 4);
            }
        }
    }
    for (const reference of references) {
        if (reference.kind === 'type') {
            addTypeDefinitionTarget(reference.range, reference.name, 5);
        }
    }
    const sortedTypeDefinitionTargets = typeDefinitionTargets.sort((first, second) => first.range.start - second.range.start ||
        first.range.end - second.range.end ||
        first.order - second.order);
    const typeDefinitionIndex = {
        targets: sortedTypeDefinitionTargets,
        prefixMaxEnd: []
    };
    let maxTypeDefinitionEnd = Number.NEGATIVE_INFINITY;
    for (const target of sortedTypeDefinitionTargets) {
        maxTypeDefinitionEnd = Math.max(maxTypeDefinitionEnd, target.range.end);
        typeDefinitionIndex.prefixMaxEnd.push(maxTypeDefinitionEnd);
    }
    const typeScopeIdsByName = new Map();
    for (const declaration of parsed.declarations) {
        if (!typeScopeIdsByName.has(declaration.name.normalizedName)) {
            typeScopeIdsByName.set(declaration.name.normalizedName, `type:${declaration.name.range.start}`);
        }
    }
    const routineScopeIdsByStart = new Map();
    for (const routine of parsed.routines) {
        routineScopeIdsByStart.set(routine.range.start, `routine:${routine.range.start}`);
    }
    const scopeIdForReference = (reference) => {
        if (reference.kind === 'field' && reference.container) {
            return typeScopeIdsByName.get(reference.container) ?? 'document';
        }
        if (reference.kind === 'variable' && reference.scope !== undefined) {
            return routineScopeIdsByStart.get(reference.scope) ?? 'document';
        }
        return 'document';
    };
    const symbols = new Map();
    const referencesByKey = new Map();
    for (const reference of references) {
        const key = referenceKey(reference);
        const bucket = referencesByKey.get(key) ?? [];
        bucket.push(reference);
        referencesByKey.set(key, bucket);
        let symbol = symbols.get(key);
        if (!symbol) {
            symbol = {
                id: key,
                kind: reference.kind,
                name: reference.name,
                scopeId: scopeIdForReference(reference),
                scope: reference.scope,
                container: reference.container,
                declarations: [],
                references: bucket
            };
            symbols.set(key, symbol);
        }
        if (reference.declaration) {
            symbol.declarations.push(reference);
        }
    }
    const symbolsByRange = new Map();
    for (const symbol of symbols.values()) {
        for (const reference of symbol.references) {
            symbolsByRange.set(rangeKey(reference.kind, reference.range), symbol.id);
        }
    }
    const semanticIndexMs = onProfile
        ? node_perf_hooks_1.performance.now() - semanticIndexStartedAt
        : 0;
    const syntaxProjectionStartedAt = onProfile ? node_perf_hooks_1.performance.now() : 0;
    let nextNodeId = 0;
    const nodes = new Map();
    const root = {
        id: nextNodeId++,
        kind: 'document',
        range: { start: 0, end: analysisSourceLength },
        childIds: [],
        scopeId: 'document'
    };
    nodes.set(root.id, root);
    const scopes = new Map([
        ['document', {
                id: 'document',
                kind: 'document',
                range: root.range,
                ownerNodeId: root.id,
                symbolIds: []
            }]
    ]);
    const addNode = (kind, range, parent, symbolId, declarations, scopeId) => {
        const node = {
            id: nextNodeId++,
            kind,
            range: { start: range.start, end: range.end },
            parentId: parent.id,
            childIds: [],
            symbolId,
            scopeId: scopeId ?? parent.scopeId,
            ...declarations
        };
        nodes.set(node.id, node);
        parent.childIds.push(node.id);
        return node;
    };
    const symbolIdFor = (kind, range) => symbolsByRange.get(rangeKey(kind, range));
    const addFieldNodes = (fields, parent) => {
        for (const field of fields ?? []) {
            const fieldName = field.name;
            const symbolId = fieldName
                ? symbolIdFor('field', fieldName.range)
                : undefined;
            addNode('field-declaration', fieldRange(field), parent, symbolId, { fieldDeclaration: field }, symbolId ? symbols.get(symbolId)?.scopeId : undefined);
        }
    };
    const addAccessNodes = (parent, fieldAccesses, variableAccesses, computedFieldAccesses) => {
        for (const access of fieldAccesses ?? []) {
            addNode('field-access', access.reference.range, parent, symbolIdFor('field', access.reference.range), { fieldAccess: access });
        }
        for (const access of variableAccesses ?? []) {
            addNode('variable-access', access.reference.range, parent, symbolIdFor('variable', access.reference.range), { variableAccess: access });
        }
        for (const access of computedFieldAccesses ?? []) {
            addNode('computed-field-access', access.reference.range, parent, symbolIdFor('field', access.reference.range), { computedFieldAccess: access });
        }
    };
    for (const declaration of parsed.declarations) {
        const isList = declaration.name.normalizedName === 'lista' ||
            parsed.symbols.getBaseTypeDistance(declaration.name.name, 'lista') !== undefined;
        const declarationKind = isList ? 'list-declaration' : 'type-declaration';
        const node = addNode(declarationKind, declaration.range, root, symbolIdFor('type', declaration.name.range), {
            typeDeclaration: declaration,
            listDeclaration: isList ? declaration : undefined
        }, `type:${declaration.name.range.start}`);
        if (declaration.scalarFactorRange && declaration.scalarFactor !== undefined) {
            addNode('scalar-factor', declaration.scalarFactorRange, node, undefined, { scalarFactor: declaration.scalarFactor });
        }
        const typeScopeId = node.scopeId;
        scopes.set(typeScopeId, {
            id: typeScopeId,
            kind: 'type',
            range: node.range,
            parentId: 'document',
            ownerNodeId: node.id,
            symbolIds: []
        });
        addFieldNodes(declaration.fields, node);
    }
    for (const declaration of parsed.globalVariables) {
        const node = addNode('global-variable-declaration', declaration.range, root, symbolIdFor('variable', declaration.name.range), { globalVariableDeclaration: declaration });
        addFieldNodes(declaration.fields, node);
        if (declaration.initializer) {
            addNode('global-initializer', declaration.initializer.range, node, undefined, { globalInitializer: declaration.initializer });
        }
    }
    for (const routine of parsed.routines) {
        const node = addNode('routine-declaration', { start: routine.range.start, end: routine.bodyRange.end }, root, symbolIdFor('routine', routine.name.range), { routineDeclaration: routine }, routineScopeIdsByStart.get(routine.range.start));
        const routineScopeId = node.scopeId;
        scopes.set(routineScopeId, {
            id: routineScopeId,
            kind: 'routine',
            range: node.range,
            parentId: 'document',
            ownerNodeId: node.id,
            symbolIds: []
        });
        const routineBodyNode = addNode('routine-body', routine.bodyRange, node);
        for (const [aliasIndex, alias] of routine.alternateNames.entries()) {
            const aliasParameters = routine.alternateParameters[aliasIndex] ?? [];
            const aliasRanges = [
                alias.range,
                ...aliasParameters.flatMap(parameter => [
                    parameter.name.range,
                    parameter.type.range
                ])
            ];
            const aliasHeaderRange = {
                start: Math.min(...aliasRanges.map(range => range.start)),
                end: Math.max(...aliasRanges.map(range => range.end))
            };
            const aliasHeaderNode = addNode('alternate-routine-header', aliasHeaderRange, node, undefined, { routineDeclaration: routine });
            addNode('routine-name', alias.range, aliasHeaderNode, symbolIdFor('routine', alias.range), { routineDeclaration: routine }, 'document');
            for (const parameter of aliasParameters) {
                addNode('alternate-parameter', {
                    start: Math.min(parameter.name.range.start, parameter.type.range.start),
                    end: Math.max(parameter.name.range.end, parameter.type.range.end)
                }, aliasHeaderNode, undefined, { parameterDeclaration: parameter });
            }
        }
        const addParameter = (parameter, parent) => addNode('parameter-declaration', parameter.name.range, parent, symbolIdFor('variable', parameter.name.range), { parameterDeclaration: parameter });
        for (const parameter of routine.parameters) {
            addParameter(parameter, node);
        }
        if (routine.returnParameter) {
            addParameter(routine.returnParameter, node);
        }
        if (routine.computedField) {
            const symbolId = symbolIdFor('field', routine.computedField.name.range);
            addNode('computed-field-declaration', routine.computedField.name.range, node, symbolId, { computedFieldDeclaration: routine.computedField }, symbolId ? symbols.get(symbolId)?.scopeId : undefined);
        }
        addAccessNodes(node, undefined, undefined, routine.computedFieldAccesses);
        const statementNodes = new Map();
        const structuralContainers = [{
                node: routineBodyNode,
                range: routine.bodyRange
            }];
        const structuralSpecs = [
            ...routine.conditionals.map(conditional => ({
                kind: 'conditional',
                range: conditional.range,
                conditional
            })),
            ...routine.loopBlocks.map(loopBlock => ({
                kind: 'loop',
                range: loopBlock.range,
                loopBlock
            }))
        ].sort((first, second) => first.range.start - second.range.start ||
            second.range.end - first.range.end);
        const containingStructuralNode = (range) => structuralContainers
            .filter(container => container.range.start <= range.start &&
            container.range.end >= range.end)
            .sort((first, second) => first.range.end - first.range.start -
            (second.range.end - second.range.start) ||
            nodeDepth(second.node) - nodeDepth(first.node))[0]?.node ?? routineBodyNode;
        const conditionalExpressionNodes = [];
        const loopNodesByBlock = new Map();
        const conditionalBodyNodes = new Map();
        const nodeDepth = (candidate) => {
            let depth = 0;
            let current = candidate;
            while (current.parentId !== undefined) {
                depth++;
                current = nodes.get(current.parentId);
            }
            return depth;
        };
        for (const spec of structuralSpecs) {
            if (spec.kind === 'conditional') {
                const conditionalNode = addNode('conditional', spec.range, containingStructuralNode(spec.range), undefined, { conditional: spec.conditional });
                const bodyNode = addNode('conditional-body', spec.conditional.bodyRange, conditionalNode);
                conditionalBodyNodes.set(spec.conditional, bodyNode);
                conditionalExpressionNodes.push(addNode('condition-expression', spec.conditional.condition.range, conditionalNode, undefined, {
                    conditionExpression: {
                        condition: spec.conditional.condition,
                        arguments: spec.conditional.conditionArguments,
                        target: spec.conditional.target,
                        predicateCall: spec.conditional.predicateCall
                    }
                }));
                structuralContainers.push({
                    node: bodyNode,
                    range: spec.conditional.bodyRange
                });
            }
            else {
                const loopNode = addNode('loop-block', spec.range, containingStructuralNode(spec.range), undefined, { routineLoopBlock: spec.loopBlock });
                loopNodesByBlock.set(spec.loopBlock, loopNode);
                const bodyNode = addNode('loop-body', spec.loopBlock.bodyRange, loopNode, undefined, { routineLoopBlock: spec.loopBlock });
                structuralContainers.push({ node: loopNode, range: spec.loopBlock.range }, { node: bodyNode, range: spec.loopBlock.bodyRange });
            }
        }
        conditionalExpressionNodes.sort((first, second) => first.range.start - second.range.start ||
            first.range.end - second.range.end);
        const structuralContainerIds = new Set(structuralContainers.map(container => container.node.id));
        const structuralChildIndexes = new Map();
        const structuralNodes = [routineBodyNode];
        for (let position = 0; position < structuralNodes.length; position++) {
            const parent = structuralNodes[position];
            const children = parent.childIds
                .map(childId => nodes.get(childId))
                .filter(child => child.kind === 'conditional' ||
                structuralContainerIds.has(child.id));
            if (children.length === 0) {
                continue;
            }
            structuralChildIndexes.set(parent.id, buildIntervalIndex(children));
            structuralNodes.push(...children);
        }
        const statementParentForRange = (range) => {
            let current = routineBodyNode;
            let selected = routineBodyNode;
            while (true) {
                const index = structuralChildIndexes.get(current.id);
                const child = index && findContainingNode(index, range);
                if (!child) {
                    return selected;
                }
                current = child;
                if (structuralContainerIds.has(current.id)) {
                    selected = current;
                }
            }
        };
        for (const conditional of routine.conditionals) {
            const bodyNode = conditionalBodyNodes.get(conditional);
            for (const statement of conditional.statements) {
                const statementNode = addNode('statement', statement, bodyNode ?? routineBodyNode);
                statementNodes.set(`${statement.start}:${statement.end}`, statementNode);
            }
        }
        for (const statement of routine.statements) {
            const key = `${statement.start}:${statement.end}`;
            if (statementNodes.has(key)) {
                continue;
            }
            statementNodes.set(key, addNode('statement', statement, statementParentForRange(statement)));
        }
        const orderedStatementNodes = [
            ...statementNodes.values()
        ].sort((first, second) => first.range.start - second.range.start ||
            first.range.end - second.range.end);
        const statementParentForRangeWithCondition = (range) => {
            let low = 0;
            let high = orderedStatementNodes.length;
            while (low < high) {
                const middle = (low + high) >>> 1;
                if (orderedStatementNodes[middle].range.start <= range.start) {
                    low = middle + 1;
                }
                else {
                    high = middle;
                }
            }
            const candidate = orderedStatementNodes[low - 1];
            if (candidate &&
                range.start >= candidate.range.start &&
                range.end <= candidate.range.end) {
                return candidate;
            }
            low = 0;
            high = conditionalExpressionNodes.length;
            while (low < high) {
                const middle = (low + high) >>> 1;
                if (conditionalExpressionNodes[middle].range.start <= range.start) {
                    low = middle + 1;
                }
                else {
                    high = middle;
                }
            }
            const condition = conditionalExpressionNodes[low - 1];
            return condition &&
                range.start >= condition.range.start &&
                range.end <= condition.range.end
                ? condition
                : statementParentForRange(range);
        };
        const operationLocalVariableKeys = new Set();
        for (const call of routine.calls) {
            for (const local of call.localVariables ?? []) {
                operationLocalVariableKeys.add(`${local.name.range.start}:${local.name.range.end}`);
            }
        }
        for (const process of routine.processes) {
            if (process.returnVariable && !process.returnVariableIsReference) {
                operationLocalVariableKeys.add(`${process.returnVariable.name.range.start}:` +
                    `${process.returnVariable.name.range.end}`);
            }
        }
        const routineLocalsByNameRange = new Map(routine.localVariables.map(local => [
            `${local.name.range.start}:${local.name.range.end}`,
            local
        ]));
        for (const assignment of routine.assignments) {
            const child = addNode('assignment', assignment.range, statementParentForRangeWithCondition(assignment.range), undefined, { assignment });
            addExpressionNodes(child, assignment.expression, expressionReferenceIndex, addNode);
            addAccessNodes(child, assignment.fieldAccesses, assignment.variableAccesses);
        }
        for (const output of routine.outputs) {
            const child = addNode('output', output.range, statementParentForRangeWithCondition(output.range), undefined, { output });
            addExpressionNodes(child, output.expression, expressionReferenceIndex, addNode);
            addAccessNodes(child, output.fieldAccesses, output.variableAccesses);
        }
        for (const call of routine.calls) {
            const callParent = statementParentForRangeWithCondition(call.name.range);
            const callChildRanges = [
                ...call.arguments.map(argument => argument.range),
                ...(call.qualifierRange ? [call.qualifierRange] : [])
            ].filter(range => range.start >= callParent.range.start &&
                range.end <= callParent.range.end);
            let callStart = call.name.range.start;
            let callEnd = call.name.range.end;
            for (const range of callChildRanges) {
                callStart = Math.min(callStart, range.start);
                callEnd = Math.max(callEnd, range.end);
            }
            const callRange = {
                start: callStart,
                end: callEnd
            };
            const callNode = addNode('routine-call', callRange, callParent, symbolIdFor('routine', call.name.range), { routineCall: call });
            for (const argument of call.arguments) {
                if (argument.range.start < callRange.start ||
                    argument.range.end > callRange.end) {
                    continue;
                }
                addNode('argument', argument.range, callNode);
            }
            for (const local of call.localVariables ?? []) {
                if (local.range.start < callRange.start ||
                    local.range.end > callRange.end) {
                    continue;
                }
                addNode('local-variable-declaration', local.range, callNode, symbolIdFor('variable', local.name.range), { localVariableDeclaration: local });
            }
            addAccessNodes(callNode, call.fieldAccesses?.filter(access => access.reference.range.start >= callRange.start &&
                access.reference.range.end <= callRange.end), call.variableAccesses?.filter(access => access.reference.range.start >= callRange.start &&
                access.reference.range.end <= callRange.end), call.computedFieldAccesses?.filter(access => access.reference.range.start >= callRange.start &&
                access.reference.range.end <= callRange.end));
        }
        for (const allocation of routine.memoryAllocations) {
            const child = addNode('memory-allocation', allocation.range, statementParentForRangeWithCondition(allocation.range), undefined, { memoryAllocation: allocation });
            if (allocation.variableAccess) {
                const key = `${allocation.variableAccess.reference.range.start}:` +
                    `${allocation.variableAccess.reference.range.end}`;
                const local = routineLocalsByNameRange.get(key);
                if (local) {
                    operationLocalVariableKeys.add(key);
                    addNode('local-variable-declaration', local.range, child, symbolIdFor('variable', local.name.range), { localVariableDeclaration: local });
                }
            }
            addAccessNodes(child, undefined, allocation.variableAccess
                ? [allocation.variableAccess]
                : undefined);
        }
        for (const deallocation of routine.memoryDeallocations) {
            const child = addNode('memory-deallocation', deallocation.range, statementParentForRangeWithCondition(deallocation.range), undefined, { memoryDeallocation: deallocation });
            addAccessNodes(child, deallocation.fieldAccesses, deallocation.variableAccess ? [deallocation.variableAccess] : undefined);
        }
        const addedRoutineLocalRanges = new Set();
        for (const local of routine.localVariables) {
            const key = `${local.name.range.start}:${local.name.range.end}`;
            if (operationLocalVariableKeys.has(key) ||
                addedRoutineLocalRanges.has(key)) {
                continue;
            }
            addedRoutineLocalRanges.add(key);
            addNode('local-variable-declaration', local.range, statementParentForRangeWithCondition(local.range), symbolIdFor('variable', local.name.range), { localVariableDeclaration: local });
        }
        for (const preserved of routine.preservedParameters) {
            const parent = statementNodes.get(`${preserved.range.start}:${preserved.range.end}`);
            addNode('preserve-statement', preserved.range, parent ?? node, symbolIdFor('variable', preserved.parameter.name.range), { preservedParameter: preserved });
        }
        for (const returnStatement of routine.returnStatements) {
            const parent = statementNodes.get(`${returnStatement.range.start}:${returnStatement.range.end}`);
            addNode('return-statement', returnStatement.range, parent ?? node, undefined, { returnStatement });
        }
        for (const process of routine.processes) {
            const child = addNode('process', process.range, statementParentForRangeWithCondition(process.range), undefined, { process });
            for (const argument of process.arguments) {
                addNode('argument', argument.range, child);
            }
            if (process.returnVariable && !process.returnVariableIsReference) {
                addNode('local-variable-declaration', process.returnVariable.range, child, symbolIdFor('variable', process.returnVariable.name.range), { localVariableDeclaration: process.returnVariable });
            }
            addAccessNodes(child, process.fieldAccesses, process.variableAccesses, process.computedFieldAccesses);
        }
        for (const instruction of routine.loopInstructions) {
            addNode('loop-instruction', instruction.range, statementParentForRangeWithCondition(instruction.range), undefined, { loopInstruction: instruction });
        }
        for (const instruction of routine.simpleInstructions) {
            const instructionNode = addNode(instruction.kind === 'decode'
                ? 'decode-instruction'
                : 'push-instruction', instruction.range, statementParentForRangeWithCondition(instruction.range), undefined, { simpleInstruction: instruction });
            addAccessNodes(instructionNode, undefined, instruction.variableAccesses);
        }
        for (const access of routine.listSpecialFieldAccesses) {
            addNode('list-field-access', access.reference.range, statementParentForRangeWithCondition(access.reference.range), symbolIdFor('field', access.reference.range), { listFieldAccess: access });
        }
    }
    const syntaxProjectionMs = onProfile
        ? node_perf_hooks_1.performance.now() - syntaxProjectionStartedAt
        : 0;
    const positionIndexStartedAt = onProfile ? node_perf_hooks_1.performance.now() : 0;
    let positionPhaseStartedAt = onProfile ? node_perf_hooks_1.performance.now() : 0;
    const nonReferenceNodes = [...nodes.values()].filter(node => node.kind !== 'document');
    const topLevelIntervalIndex = buildIntervalIndex(nonReferenceNodes.filter(node => node.parentId === root.id));
    const topLevelIntervalIndexMs = onProfile
        ? node_perf_hooks_1.performance.now() - positionPhaseStartedAt
        : 0;
    positionPhaseStartedAt = onProfile ? node_perf_hooks_1.performance.now() : 0;
    const referenceEntries = references.map((reference, order) => ({
        reference,
        order
    })).sort((first, second) => first.reference.range.start - second.reference.range.start ||
        first.order - second.order);
    const referenceIntervalIndex = {
        references: referenceEntries.map(entry => entry.reference),
        prefixMaxEnd: []
    };
    let maxReferenceEnd = Number.NEGATIVE_INFINITY;
    for (const reference of referenceIntervalIndex.references) {
        maxReferenceEnd = Math.max(maxReferenceEnd, reference.range.end);
        referenceIntervalIndex.prefixMaxEnd.push(maxReferenceEnd);
    }
    const referenceNodesByPosition = [...references]
        .sort((first, second) => first.range.start - second.range.start ||
        first.range.end - second.range.end);
    const referenceIntervalIndexMs = onProfile
        ? node_perf_hooks_1.performance.now() - positionPhaseStartedAt
        : 0;
    const buildChildIntervalIndexes = () => {
        const indexes = new Map();
        for (const node of nodes.values()) {
            if (node.childIds.length === 0) {
                continue;
            }
            indexes.set(node.id, buildIntervalIndex(node.childIds.map(childId => nodes.get(childId))));
        }
        return indexes;
    };
    positionPhaseStartedAt = onProfile ? node_perf_hooks_1.performance.now() : 0;
    const syntaxChildIndexes = buildChildIntervalIndexes();
    const syntaxChildIndexMs = onProfile
        ? node_perf_hooks_1.performance.now() - positionPhaseStartedAt
        : 0;
    positionPhaseStartedAt = onProfile ? node_perf_hooks_1.performance.now() : 0;
    for (const diagnostic of parsed.diagnostics) {
        let parent = findContainingNode(topLevelIntervalIndex, diagnostic.range) ?? root;
        while (true) {
            const index = syntaxChildIndexes.get(parent.id);
            const child = index && findContainingNode(index, diagnostic.range);
            if (!child) {
                break;
            }
            parent = child;
        }
        addNode('parser-diagnostic', diagnostic.range, parent, undefined, { parserDiagnostic: diagnostic });
    }
    const typeReferenceKinds = new Map();
    for (const declaration of parsed.declarations) {
        typeReferenceKinds.set(`${declaration.baseType.range.start}:${declaration.baseType.range.end}`, 'base-type-reference');
        if (declaration.pointedType) {
            typeReferenceKinds.set(`${declaration.pointedType.range.start}:${declaration.pointedType.range.end}`, 'pointer-target');
        }
    }
    for (const reference of referenceNodesByPosition) {
        let parent = findContainingNode(topLevelIntervalIndex, reference.range) ?? root;
        while (true) {
            const index = syntaxChildIndexes.get(parent.id);
            const child = index && findContainingNode(index, reference.range);
            if (!child) {
                break;
            }
            parent = child;
        }
        addNode(reference.kind === 'type'
            ? typeReferenceKinds.get(`${reference.range.start}:${reference.range.end}`) ??
                'type-reference'
            : 'reference', reference.range, parent, symbols.get(referenceKey(reference))?.id, { semanticReference: reference });
    }
    const referenceNodePlacementMs = onProfile
        ? node_perf_hooks_1.performance.now() - positionPhaseStartedAt
        : 0;
    positionPhaseStartedAt = onProfile ? node_perf_hooks_1.performance.now() : 0;
    const declarationNodesBySymbol = new Map();
    for (const node of nodes.values()) {
        if (!node.symbolId ||
            !(node.typeDeclaration ||
                node.globalVariableDeclaration ||
                node.routineDeclaration ||
                node.fieldDeclaration ||
                node.parameterDeclaration ||
                node.localVariableDeclaration ||
                node.computedFieldDeclaration)) {
            continue;
        }
        const declarations = declarationNodesBySymbol.get(node.symbolId) ?? [];
        declarations.push(node);
        declarationNodesBySymbol.set(node.symbolId, declarations);
    }
    const declarationSymbolIndexMs = onProfile
        ? node_perf_hooks_1.performance.now() - positionPhaseStartedAt
        : 0;
    positionPhaseStartedAt = onProfile ? node_perf_hooks_1.performance.now() : 0;
    const childIntervalIndexes = buildChildIntervalIndexes();
    const finalChildIndexMs = onProfile
        ? node_perf_hooks_1.performance.now() - positionPhaseStartedAt
        : 0;
    for (const symbol of symbols.values()) {
        scopes.get(symbol.scopeId)?.symbolIds.push(symbol.id);
    }
    const getNodeAt = (offset) => {
        let selected = root;
        let current = root;
        while (true) {
            const index = childIntervalIndexes.get(current.id);
            const child = index && findContainingNode(index, {
                start: offset,
                end: offset
            });
            if (!child) {
                return selected;
            }
            selected = child;
            current = child;
        }
    };
    const analysis = {
        root,
        nodes,
        scopes,
        symbols,
        references,
        diagnostics: parsed.diagnostics,
        typeDefinitionTargetCount: typeDefinitionTargets.length,
        getNodeAt,
        findReferenceAt(offset, kind) {
            if (containsOffset(parsed.commentRanges ?? [], offset)) {
                return undefined;
            }
            return findReference(referenceIntervalIndex, offset, kind);
        },
        getReferences(reference) {
            return referencesByKey.get(referenceKey(reference)) ?? [];
        },
        getDeclaration(reference) {
            return referencesByKey
                .get(referenceKey(reference))
                ?.find(candidate => candidate.declaration);
        },
        getDeclarationNodes(reference) {
            return declarationNodesBySymbol.get(referenceKey(reference)) ?? [];
        },
        getSymbol(reference) {
            return symbols.get(referenceKey(reference));
        },
        getScopeAt(offset) {
            let node = getNodeAt(offset);
            while (node) {
                const scope = node.scopeId && scopes.get(node.scopeId);
                if (scope) {
                    return scope;
                }
                node = node.parentId === undefined
                    ? undefined
                    : nodes.get(node.parentId);
            }
            return scopes.get('document');
        },
        findTypeDefinitionAt(offset) {
            if (containsOffset(parsed.commentRanges ?? [], offset)) {
                return undefined;
            }
            return findTypeDefinitionTarget(typeDefinitionIndex, offset)?.name;
        }
    };
    const analysesForDocument = documentAnalysisCache.get(parsed) ?? new Map();
    analysesForDocument.set(analysisSourceLength, analysis);
    documentAnalysisCache.set(parsed, analysesForDocument);
    onProfile?.({
        durationMs: node_perf_hooks_1.performance.now() - startedAt,
        referenceExtractionMs,
        semanticIndexMs,
        syntaxProjectionMs,
        positionIndexMs: node_perf_hooks_1.performance.now() - positionIndexStartedAt,
        topLevelIntervalIndexMs,
        referenceIntervalIndexMs,
        syntaxChildIndexMs,
        referenceNodePlacementMs,
        declarationSymbolIndexMs,
        finalChildIndexMs,
        references: references.length,
        typeDefinitionTargets: typeDefinitionTargets.length,
        symbols: symbols.size,
        scopes: scopes.size,
        nodes: nodes.size,
        cacheHit: false
    });
    return analysis;
}
function getDocumentSourceEnd(parsed) {
    let end = 0;
    for (const declaration of parsed.declarations) {
        end = Math.max(end, declaration.range.end);
    }
    for (const declaration of parsed.globalVariables) {
        end = Math.max(end, declaration.range.end);
    }
    for (const routine of parsed.routines) {
        end = Math.max(end, routine.bodyRange.end);
    }
    for (const diagnostic of parsed.diagnostics) {
        end = Math.max(end, diagnostic.range.end);
    }
    return end;
}
//# sourceMappingURL=analysisModel.js.map