"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const node_1 = require("vscode-languageserver/node");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const node_url_1 = require("node:url");
const typeParser_1 = require("./typeParser");
const documentFormatter_1 = require("./documentFormatter");
const connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
const documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
const parsedDocuments = new Map();
connection.onInitialize(() => ({
    capabilities: {
        textDocumentSync: node_1.TextDocumentSyncKind.Incremental,
        definitionProvider: true,
        typeDefinitionProvider: true,
        hoverProvider: true,
        documentSymbolProvider: true,
        workspaceSymbolProvider: true,
        referencesProvider: true,
        renameProvider: { prepareProvider: true },
        documentFormattingProvider: true
    }
}));
connection.onDocumentFormatting((params) => {
    const document = documents.get(params.textDocument.uri);
    if (!document) {
        return [];
    }
    const original = document.getText();
    const formatted = (0, documentFormatter_1.formatDocument)(original);
    if (formatted === original) {
        return [];
    }
    return [node_1.TextEdit.replace({
            start: document.positionAt(0),
            end: document.positionAt(original.length)
        }, formatted)];
});
connection.onHover((params) => {
    const document = documents.get(params.textDocument.uri);
    const parsedDocument = document && parsedDocuments.get(document.uri);
    if (!document || !parsedDocument) {
        return undefined;
    }
    const reference = (0, typeParser_1.findTypeReferenceAtOffset)(parsedDocument, document.offsetAt(params.position));
    if (!reference) {
        return undefined;
    }
    const normalizedName = (0, typeParser_1.normalizeTypeName)(reference.name);
    const primitiveName = normalizedName === 'byte' || normalizedName === 'bytes'
        ? 'byte'
        : normalizedName === 'estrutura' || normalizedName === 'estruturas'
            ? 'estrutura'
            : undefined;
    if (!primitiveName) {
        return undefined;
    }
    const contents = primitiveName === 'byte'
        ? [
            '*byte*',
            '',
            'Tipo primitivo',
            'Representa um valor inteiro sem sinal de 8 bits.',
            '',
            '*Intervalo de valores*',
            '`0` a `255`',
            '',
            '*Tamanho*',
            '`1 byte`'
        ].join('\n')
        : [
            '*estrutura*',
            '',
            'Tipo primitivo',
            'Representa um tipo de dado composto, formado por um conjunto de campos que podem possuir diferentes tipos de dados.',
            '',
            '*Características*',
            '',
            '- Permite agrupar diferentes campos em uma única unidade de dados.',
            '- Cada campo possui seu próprio tipo.',
            '- Os campos são acessíveis individualmente.'
        ].join('\n');
    return {
        contents: { kind: node_1.MarkupKind.Markdown, value: contents },
        range: {
            start: document.positionAt(reference.range.start),
            end: document.positionAt(reference.range.end)
        }
    };
});
function updateDocumentSymbols(document) {
    const parsedDocument = (0, typeParser_1.parseTypeDeclarations)(document.getText());
    parsedDocuments.set(document.uri, parsedDocument);
    const diagnostics = parsedDocument.diagnostics.map(diagnostic => ({
        severity: diagnostic.severity === 'hint'
            ? node_1.DiagnosticSeverity.Hint
            : node_1.DiagnosticSeverity.Error,
        range: {
            start: document.positionAt(diagnostic.range.start),
            end: document.positionAt(diagnostic.range.end)
        },
        message: diagnostic.message,
        source: 'portugues-puro'
    }));
    connection.sendDiagnostics({ uri: document.uri, diagnostics });
}
documents.onDidOpen(({ document }) => {
    updateDocumentSymbols(document);
});
documents.onDidChangeContent(({ document }) => {
    updateDocumentSymbols(document);
});
documents.onDidSave(({ document }) => {
    updateDocumentSymbols(document);
});
documents.onDidClose(({ document }) => {
    parsedDocuments.delete(document.uri);
    connection.sendDiagnostics({ uri: document.uri, diagnostics: [] });
});
connection.onDefinition((params) => {
    const document = documents.get(params.textDocument.uri);
    if (!document) {
        return undefined;
    }
    const parsedDocument = parsedDocuments.get(document.uri);
    if (!parsedDocument) {
        return undefined;
    }
    const offset = document.offsetAt(params.position);
    const parsedReference = (0, typeParser_1.findParsedReferenceAtOffset)(parsedDocument, offset);
    if (parsedReference?.kind === 'variable') {
        const isTypePosition = parsedReference.scope !== undefined &&
            parsedDocument.routines
                .filter(routine => routine.range.start === parsedReference.scope)
                .some(routine => {
                const variables = [
                    ...routine.parameters,
                    ...(routine.returnParameter ? [routine.returnParameter] : []),
                    ...routine.localVariables,
                    ...routine.calls.flatMap(call => call.localVariable ? [call.localVariable] : []),
                    ...routine.processes.flatMap(process => process.returnVariable ? [process.returnVariable] : [])
                ];
                return variables.some(variable => offset >= variable.type.range.start &&
                    offset < variable.type.range.end);
            });
        if (parsedReference.scope !== undefined && !isTypePosition) {
            const declaration = (0, typeParser_1.getParsedReferences)(parsedDocument).find(reference => reference.kind === 'variable' &&
                reference.name === parsedReference.name &&
                reference.scope === parsedReference.scope &&
                reference.declaration);
            if (declaration) {
                return node_1.Location.create(document.uri, {
                    start: document.positionAt(declaration.range.start),
                    end: document.positionAt(declaration.range.end)
                });
            }
        }
        else {
            const globalVariable = parsedDocument.globalVariableSymbols.lookup(parsedReference.name);
            if (globalVariable) {
                return node_1.Location.create(document.uri, {
                    start: document.positionAt(globalVariable.declaration.name.range.start),
                    end: document.positionAt(globalVariable.declaration.name.range.end)
                });
            }
        }
    }
    const field = (0, typeParser_1.findRoutineFieldAtOffset)(parsedDocument, offset);
    if (field) {
        return node_1.Location.create(document.uri, {
            start: document.positionAt(field.name.range.start),
            end: document.positionAt(field.name.range.end)
        });
    }
    const reference = (0, typeParser_1.findTypeReferenceAtOffset)(parsedDocument, offset);
    if (reference) {
        const candidates = [
            { document, parsed: parsedDocument },
            ...documents.all()
                .filter(openDocument => openDocument.uri !== document.uri)
                .flatMap(openDocument => {
                const parsed = parsedDocuments.get(openDocument.uri);
                return parsed ? [{ document: openDocument, parsed }] : [];
            })
        ];
        for (const candidate of candidates) {
            const symbol = candidate.parsed.symbols.lookup(reference.name);
            if (symbol?.declaration) {
                return node_1.Location.create(candidate.document.uri, {
                    start: candidate.document.positionAt(symbol.declaration.name.range.start),
                    end: candidate.document.positionAt(symbol.declaration.name.range.end)
                });
            }
        }
    }
    const routine = (0, typeParser_1.findRoutineDeclarationAtOffset)(parsedDocument, document.offsetAt(params.position));
    if (routine) {
        return node_1.Location.create(document.uri, {
            start: document.positionAt(routine.name.range.start),
            end: document.positionAt(routine.name.range.end)
        });
    }
    return undefined;
});
connection.onTypeDefinition((params) => {
    const document = documents.get(params.textDocument.uri);
    if (!document) {
        return undefined;
    }
    const parsedDocument = parsedDocuments.get(document.uri);
    if (!parsedDocument) {
        return undefined;
    }
    const reference = (0, typeParser_1.findTypeDefinitionReferenceAtOffset)(parsedDocument, document.offsetAt(params.position));
    if (!reference) {
        return undefined;
    }
    const candidates = [
        { document, parsed: parsedDocument },
        ...documents.all()
            .filter(openDocument => openDocument.uri !== document.uri)
            .flatMap(openDocument => {
            const parsed = parsedDocuments.get(openDocument.uri);
            return parsed ? [{ document: openDocument, parsed }] : [];
        })
    ];
    for (const candidate of candidates) {
        const symbol = candidate.parsed.symbols.lookup(reference.name);
        if (symbol?.declaration) {
            return node_1.Location.create(candidate.document.uri, {
                start: candidate.document.positionAt(symbol.declaration.name.range.start),
                end: candidate.document.positionAt(symbol.declaration.name.range.end)
            });
        }
    }
    return undefined;
});
connection.onDocumentSymbol(params => {
    const document = documents.get(params.textDocument.uri);
    const parsedDocument = document && parsedDocuments.get(document.uri);
    if (!document || !parsedDocument) {
        return undefined;
    }
    return createDocumentSymbols(parsedDocument, document);
});
connection.onWorkspaceSymbol(async (params) => {
    const workspaceDocuments = await getWorkspaceDocuments();
    const query = (0, typeParser_1.normalizeTypeName)(params.query);
    const results = [];
    for (const { document, parsed } of workspaceDocuments.values()) {
        const visit = (symbol, containerName) => {
            if (!query || (0, typeParser_1.normalizeTypeName)(symbol.name).includes(query)) {
                results.push(node_1.SymbolInformation.create(symbol.name, symbol.kind, symbol.range, document.uri, containerName));
            }
            const childContainer = containerName
                ? `${containerName}.${symbol.name}`
                : symbol.name;
            for (const child of symbol.children ?? []) {
                visit(child, childContainer);
            }
        };
        for (const symbol of createDocumentSymbols(parsed, document)) {
            visit(symbol);
        }
    }
    return results;
});
connection.onReferences(async (params) => {
    const document = documents.get(params.textDocument.uri);
    const parsedDocument = document && parsedDocuments.get(document.uri);
    if (!document || !parsedDocument) {
        return undefined;
    }
    const target = (0, typeParser_1.findParsedReferenceAtOffset)(parsedDocument, document.offsetAt(params.position));
    if (!target) {
        return undefined;
    }
    const workspaceDocuments = await getWorkspaceDocuments();
    const results = [];
    const seen = new Set();
    for (const [uri, candidate] of workspaceDocuments) {
        if (target.scope !== undefined && uri !== document.uri) {
            continue;
        }
        for (const reference of (0, typeParser_1.getParsedReferences)(candidate.parsed)) {
            if (reference.kind !== target.kind ||
                reference.name !== target.name ||
                reference.container !== target.container ||
                target.scope !== undefined &&
                    (reference.scope !== target.scope || uri !== document.uri) ||
                !params.context.includeDeclaration &&
                    reference.declaration) {
                continue;
            }
            const locationKey = `${uri}:${reference.range.start}:${reference.range.end}`;
            if (seen.has(locationKey)) {
                continue;
            }
            seen.add(locationKey);
            results.push(node_1.Location.create(uri, {
                start: candidate.document.positionAt(reference.range.start),
                end: candidate.document.positionAt(reference.range.end)
            }));
        }
    }
    return results;
});
connection.onPrepareRename((params) => {
    const document = documents.get(params.textDocument.uri);
    const parsed = document && parsedDocuments.get(document.uri);
    if (!document || !parsed) {
        return undefined;
    }
    const reference = (0, typeParser_1.findParsedReferenceAtOffset)(parsed, document.offsetAt(params.position));
    if (!reference) {
        return undefined;
    }
    return {
        range: {
            start: document.positionAt(reference.range.start),
            end: document.positionAt(reference.range.end)
        },
        placeholder: reference.name
    };
});
connection.onRenameRequest(async (params) => {
    const document = documents.get(params.textDocument.uri);
    const parsed = document && parsedDocuments.get(document.uri);
    const newName = params.newName.trim();
    if (!document || !parsed || !newName) {
        return undefined;
    }
    const target = (0, typeParser_1.findParsedReferenceAtOffset)(parsed, document.offsetAt(params.position));
    if (!target) {
        return undefined;
    }
    const workspaceDocuments = await getWorkspaceDocuments();
    const changes = {};
    const seen = new Set();
    for (const [uri, candidate] of workspaceDocuments) {
        if (target.scope !== undefined && uri !== document.uri) {
            continue;
        }
        for (const reference of (0, typeParser_1.getParsedReferences)(candidate.parsed)) {
            if (reference.kind !== target.kind ||
                reference.name !== target.name ||
                reference.container !== target.container ||
                target.scope !== undefined &&
                    (reference.scope !== target.scope || uri !== document.uri)) {
                continue;
            }
            const locationKey = `${uri}:${reference.range.start}:${reference.range.end}`;
            if (seen.has(locationKey)) {
                continue;
            }
            seen.add(locationKey);
            (changes[uri] ??= []).push(node_1.TextEdit.replace({
                start: candidate.document.positionAt(reference.range.start),
                end: candidate.document.positionAt(reference.range.end)
            }, newName));
        }
    }
    return Object.keys(changes).length > 0 ? { changes } : undefined;
});
function createDocumentSymbols(parsed, document) {
    const toRange = (range) => ({
        start: document.positionAt(range.start),
        end: document.positionAt(range.end)
    });
    const fieldSymbol = (field) => {
        if (field.kind === 'byte-array') {
            const name = `${field.count} bytes`;
            const range = toRange(field.range);
            return node_1.DocumentSymbol.create(name, field.elementType.name, node_1.SymbolKind.Field, range, range);
        }
        return node_1.DocumentSymbol.create(field.name.name, field.type.name, node_1.SymbolKind.Field, toRange({
            start: Math.min(field.name.range.start, field.type.range.start),
            end: Math.max(field.name.range.end, field.type.range.end)
        }), toRange(field.name.range));
    };
    const fieldChildren = (fields) => (fields ?? []).map(fieldSymbol);
    const typeSymbols = parsed.declarations.map(declaration => {
        const detail = declaration.pointedType
            ? `${declaration.baseType.name} para ${declaration.pointedType.name}`
            : declaration.baseType.name;
        const kind = parsed.symbols.getBaseTypeDistance(declaration.name.name, 'estrutura') !== undefined
            ? node_1.SymbolKind.Struct
            : node_1.SymbolKind.Class;
        return node_1.DocumentSymbol.create(declaration.name.name, detail, kind, toRange(declaration.range), toRange(declaration.name.range), fieldChildren(declaration.fields));
    });
    const variableSymbols = parsed.globalVariables.map((declaration) => {
        const detail = declaration.type?.name ??
            declaration.inferredTypeName ??
            declaration.initializer?.kind;
        return node_1.DocumentSymbol.create(declaration.name.name, detail, node_1.SymbolKind.Variable, toRange(declaration.range), toRange(declaration.name.range), fieldChildren(declaration.fields));
    });
    const routineSymbols = parsed.routines.map((routine) => {
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
    return [...typeSymbols, ...variableSymbols, ...routineSymbols]
        .sort((first, second) => first.range.start.line - second.range.start.line ||
        first.range.start.character - second.range.start.character);
}
async function getWorkspaceDocuments() {
    const result = new Map();
    for (const document of documents.all()) {
        const parsed = parsedDocuments.get(document.uri);
        if (parsed) {
            result.set(document.uri, { document, parsed });
        }
    }
    const folders = await connection.workspace.getWorkspaceFolders();
    for (const folder of folders ?? []) {
        await collectWorkspacePopFiles((0, node_url_1.fileURLToPath)(folder.uri), result);
    }
    return result;
}
async function collectWorkspacePopFiles(directory, result) {
    const ignoredDirectories = new Set([
        '.git',
        '.vscode',
        'node_modules',
        'out',
        'dist',
        '.vscode-test'
    ]);
    const entries = await (0, promises_1.readdir)(directory, { withFileTypes: true });
    for (const entry of entries) {
        const filePath = (0, node_path_1.join)(directory, entry.name);
        if (entry.isDirectory()) {
            if (!ignoredDirectories.has(entry.name)) {
                await collectWorkspacePopFiles(filePath, result);
            }
            continue;
        }
        if (!entry.isFile() || (0, node_path_1.extname)(entry.name).toLocaleLowerCase() !== '.pop') {
            continue;
        }
        const uri = (0, node_url_1.pathToFileURL)(filePath).toString();
        if (result.has(uri)) {
            continue;
        }
        const content = new TextDecoder('windows-1252').decode(await (0, promises_1.readFile)(filePath));
        const document = vscode_languageserver_textdocument_1.TextDocument.create(uri, 'portugues-puro', 0, content);
        result.set(uri, { document, parsed: (0, typeParser_1.parseTypeDeclarations)(content) });
    }
}
documents.listen(connection);
connection.listen();
//# sourceMappingURL=server.js.map