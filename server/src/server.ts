/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
  createConnection,
  Diagnostic,
  DiagnosticSeverity,
  DocumentSymbol,
  DocumentFormattingParams,
  InitializeResult,
  Location,
  MarkupKind,
  PrepareRenameParams,
  ProposedFeatures,
  ReferenceParams,
  RenameParams,
  SymbolInformation,
  SymbolKind,
  TextEdit,
  TextDocumentPositionParams,
  TextDocumentSyncKind,
  TextDocuments,
  WorkspaceEdit
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { readdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  ByteArrayField,
  GlobalVariableDeclaration,
  NamedTypeField,
  ParsedDocument,
  RoutineDeclaration,
  findRoutineDeclarationAtOffset,
  findRoutineFieldAtOffset,
  findParsedReferenceAtOffset,
  findTypeDefinitionReferenceAtOffset,
  findTypeReferenceAtOffset,
  getParsedReferences,
  normalizeTypeName,
  parseTypeDeclarations
} from './typeParser';
import { formatDocument } from './documentFormatter';

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);
const parsedDocuments = new Map<string, ReturnType<typeof parseTypeDeclarations>>();

connection.onInitialize((): InitializeResult => ({
  capabilities: {
    textDocumentSync: TextDocumentSyncKind.Incremental,
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

connection.onDocumentFormatting((params: DocumentFormattingParams) => {
  const document = documents.get(params.textDocument.uri);
  if (!document) {
    return [];
  }
  const original = document.getText();
  const formatted = formatDocument(original);
  if (formatted === original) {
    return [];
  }
  return [TextEdit.replace({
    start: document.positionAt(0),
    end: document.positionAt(original.length)
  }, formatted)];
});

connection.onHover((params: TextDocumentPositionParams) => {
  const document = documents.get(params.textDocument.uri);
  const parsedDocument = document && parsedDocuments.get(document.uri);
  if (!document || !parsedDocument) {
    return undefined;
  }

  const reference = findTypeReferenceAtOffset(
    parsedDocument,
    document.offsetAt(params.position)
  );
  if (!reference) {
    return undefined;
  }

  const normalizedName = normalizeTypeName(reference.name);
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
    contents: { kind: MarkupKind.Markdown, value: contents },
    range: {
      start: document.positionAt(reference.range.start),
      end: document.positionAt(reference.range.end)
    }
  };
});

function updateDocumentSymbols(document: TextDocument): void {
  const parsedDocument = parseTypeDeclarations(document.getText());
  parsedDocuments.set(document.uri, parsedDocument);
  const diagnostics: Diagnostic[] = parsedDocument.diagnostics.map(diagnostic => ({
    severity: diagnostic.severity === 'hint'
      ? DiagnosticSeverity.Hint
      : DiagnosticSeverity.Error,
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

connection.onDefinition((params: TextDocumentPositionParams) => {
  const document = documents.get(params.textDocument.uri);
  if (!document) {
    return undefined;
  }

  const parsedDocument = parsedDocuments.get(document.uri);
  if (!parsedDocument) {
    return undefined;
  }
  const offset = document.offsetAt(params.position);
  const parsedReference = findParsedReferenceAtOffset(parsedDocument, offset);
  if (parsedReference?.kind === 'variable') {
    const isTypePosition = parsedReference.scope !== undefined &&
      parsedDocument.routines
        .filter(routine => routine.range.start === parsedReference.scope)
        .some(routine => {
          const variables = [
            ...routine.parameters,
            ...(routine.returnParameter ? [routine.returnParameter] : []),
            ...routine.localVariables,
            ...routine.calls.flatMap(call =>
              call.localVariable ? [call.localVariable] : []
            ),
            ...routine.processes.flatMap(process =>
              process.returnVariable ? [process.returnVariable] : []
            )
          ];
          return variables.some(variable =>
            offset >= variable.type.range.start &&
            offset < variable.type.range.end
          );
        });
    if (parsedReference.scope !== undefined && !isTypePosition) {
      const declaration = getParsedReferences(parsedDocument).find(reference =>
        reference.kind === 'variable' &&
        reference.name === parsedReference.name &&
        reference.scope === parsedReference.scope &&
        reference.declaration
      );
      if (declaration) {
        return Location.create(document.uri, {
          start: document.positionAt(declaration.range.start),
          end: document.positionAt(declaration.range.end)
        });
      }
    } else {
      const globalVariable = parsedDocument.globalVariableSymbols.lookup(parsedReference.name);
      if (globalVariable) {
        return Location.create(document.uri, {
          start: document.positionAt(globalVariable.declaration.name.range.start),
          end: document.positionAt(globalVariable.declaration.name.range.end)
        });
      }
    }
  }
  const field = findRoutineFieldAtOffset(parsedDocument, offset);
  if (field) {
    return Location.create(document.uri, {
      start: document.positionAt(field.name.range.start),
      end: document.positionAt(field.name.range.end)
    });
  }
  const reference = findTypeReferenceAtOffset(
    parsedDocument,
    offset
  );
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
        return Location.create(candidate.document.uri, {
          start: candidate.document.positionAt(symbol.declaration.name.range.start),
          end: candidate.document.positionAt(symbol.declaration.name.range.end)
        });
      }
    }
  }

  const routine = findRoutineDeclarationAtOffset(
    parsedDocument,
    document.offsetAt(params.position)
  );
  if (routine) {
    return Location.create(document.uri, {
      start: document.positionAt(routine.name.range.start),
      end: document.positionAt(routine.name.range.end)
    });
  }

  return undefined;
});

connection.onTypeDefinition((params: TextDocumentPositionParams) => {
  const document = documents.get(params.textDocument.uri);
  if (!document) {
    return undefined;
  }

  const parsedDocument = parsedDocuments.get(document.uri);
  if (!parsedDocument) {
    return undefined;
  }

  const reference = findTypeDefinitionReferenceAtOffset(
    parsedDocument,
    document.offsetAt(params.position)
  );
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
      return Location.create(candidate.document.uri, {
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

connection.onWorkspaceSymbol(async params => {
  const workspaceDocuments = await getWorkspaceDocuments();
  const query = normalizeTypeName(params.query);
  const results: SymbolInformation[] = [];

  for (const { document, parsed } of workspaceDocuments.values()) {
    const visit = (symbol: DocumentSymbol, containerName?: string): void => {
      if (!query || normalizeTypeName(symbol.name).includes(query)) {
        results.push(SymbolInformation.create(
          symbol.name,
          symbol.kind,
          symbol.range,
          document.uri,
          containerName
        ));
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

connection.onReferences(async (params: ReferenceParams) => {
  const document = documents.get(params.textDocument.uri);
  const parsedDocument = document && parsedDocuments.get(document.uri);
  if (!document || !parsedDocument) {
    return undefined;
  }
  const target = findParsedReferenceAtOffset(
    parsedDocument,
    document.offsetAt(params.position)
  );
  if (!target) {
    return undefined;
  }

  const workspaceDocuments = await getWorkspaceDocuments();
  const results: ReturnType<typeof Location.create>[] = [];
  const seen = new Set<string>();
  for (const [uri, candidate] of workspaceDocuments) {
    if (target.scope !== undefined && uri !== document.uri) {
      continue;
    }
    for (const reference of getParsedReferences(candidate.parsed)) {
      if (
        reference.kind !== target.kind ||
        reference.name !== target.name ||
        reference.container !== target.container ||
        target.scope !== undefined &&
          (reference.scope !== target.scope || uri !== document.uri) ||
        !params.context.includeDeclaration &&
          reference.declaration
      ) {
        continue;
      }
      const locationKey = `${uri}:${reference.range.start}:${reference.range.end}`;
      if (seen.has(locationKey)) {
        continue;
      }
      seen.add(locationKey);
      results.push(Location.create(uri, {
        start: candidate.document.positionAt(reference.range.start),
        end: candidate.document.positionAt(reference.range.end)
      }));
    }
  }
  return results;
});

connection.onPrepareRename((params: PrepareRenameParams) => {
  const document = documents.get(params.textDocument.uri);
  const parsed = document && parsedDocuments.get(document.uri);
  if (!document || !parsed) {
    return undefined;
  }
  const reference = findParsedReferenceAtOffset(parsed, document.offsetAt(params.position));
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

connection.onRenameRequest(async (params: RenameParams): Promise<WorkspaceEdit | undefined> => {
  const document = documents.get(params.textDocument.uri);
  const parsed = document && parsedDocuments.get(document.uri);
  const newName = params.newName.trim();
  if (!document || !parsed || !newName) {
    return undefined;
  }
  const target = findParsedReferenceAtOffset(parsed, document.offsetAt(params.position));
  if (!target) {
    return undefined;
  }

  const workspaceDocuments = await getWorkspaceDocuments();
  const changes: NonNullable<WorkspaceEdit['changes']> = {};
  const seen = new Set<string>();
  for (const [uri, candidate] of workspaceDocuments) {
    if (target.scope !== undefined && uri !== document.uri) {
      continue;
    }
    for (const reference of getParsedReferences(candidate.parsed)) {
      if (
        reference.kind !== target.kind ||
        reference.name !== target.name ||
        reference.container !== target.container ||
        target.scope !== undefined &&
          (reference.scope !== target.scope || uri !== document.uri)
      ) {
        continue;
      }

      const locationKey = `${uri}:${reference.range.start}:${reference.range.end}`;
      if (seen.has(locationKey)) {
        continue;
      }
      seen.add(locationKey);
      (changes[uri] ??= []).push(TextEdit.replace({
        start: candidate.document.positionAt(reference.range.start),
        end: candidate.document.positionAt(reference.range.end)
      }, newName));
    }
  }

  return Object.keys(changes).length > 0 ? { changes } : undefined;
});

function createDocumentSymbols(
  parsed: ParsedDocument,
  document: TextDocument
): DocumentSymbol[] {
  const toRange = (range: { start: number; end: number }) => ({
    start: document.positionAt(range.start),
    end: document.positionAt(range.end)
  });
  const fieldSymbol = (field: NamedTypeField | ByteArrayField): DocumentSymbol => {
    if (field.kind === 'byte-array') {
      const name = `${field.count} bytes`;
      const range = toRange(field.range);
      return DocumentSymbol.create(
        name,
        field.elementType.name,
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
    fields: (NamedTypeField | ByteArrayField)[] | undefined
  ): DocumentSymbol[] => (fields ?? []).map(fieldSymbol);

  const typeSymbols = parsed.declarations.map(declaration => {
    const detail = declaration.pointedType
      ? `${declaration.baseType.name} para ${declaration.pointedType.name}`
      : declaration.baseType.name;
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

  const variableSymbols = parsed.globalVariables.map(
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

  const routineSymbols = parsed.routines.map((routine: RoutineDeclaration) => {
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

  return [...typeSymbols, ...variableSymbols, ...routineSymbols]
    .sort((first, second) => first.range.start.line - second.range.start.line ||
      first.range.start.character - second.range.start.character);
}

async function getWorkspaceDocuments(): Promise<
  Map<string, { document: TextDocument; parsed: ParsedDocument }>
> {
  const result = new Map<string, { document: TextDocument; parsed: ParsedDocument }>();
  for (const document of documents.all()) {
    const parsed = parsedDocuments.get(document.uri);
    if (parsed) {
      result.set(document.uri, { document, parsed });
    }
  }

  const folders = await connection.workspace.getWorkspaceFolders();
  for (const folder of folders ?? []) {
    await collectWorkspacePopFiles(fileURLToPath(folder.uri), result);
  }
  return result;
}

async function collectWorkspacePopFiles(
  directory: string,
  result: Map<string, { document: TextDocument; parsed: ParsedDocument }>
): Promise<void> {
  const ignoredDirectories = new Set([
    '.git',
    '.vscode',
    'node_modules',
    'out',
    'dist',
    '.vscode-test'
  ]);
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const filePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        await collectWorkspacePopFiles(filePath, result);
      }
      continue;
    }
    if (!entry.isFile() || extname(entry.name).toLocaleLowerCase() !== '.pop') {
      continue;
    }

    const uri = pathToFileURL(filePath).toString();
    if (result.has(uri)) {
      continue;
    }
    const content = new TextDecoder('windows-1252').decode(await readFile(filePath));
    const document = TextDocument.create(uri, 'portugues-puro', 0, content);
    result.set(uri, { document, parsed: parseTypeDeclarations(content) });
  }
}

documents.listen(connection);
connection.listen();
