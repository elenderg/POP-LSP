/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
	createConnection,
	Diagnostic,
	DiagnosticSeverity,
	InitializeResult,
	Location,
	ProposedFeatures,
	TextDocumentPositionParams,
	TextDocumentSyncKind,
	TextDocuments
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import {
	findRoutineDeclarationAtOffset,
	findTypeReferenceAtOffset,
	parseTypeDeclarations
} from './typeParser';

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);
const parsedDocuments = new Map<string, ReturnType<typeof parseTypeDeclarations>>();

connection.onInitialize((): InitializeResult => ({
	capabilities: {
		textDocumentSync: TextDocumentSyncKind.Incremental,
		definitionProvider: true
	}
}));

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
	const reference = findTypeReferenceAtOffset(
		parsedDocument,
		document.offsetAt(params.position)
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

documents.listen(connection);
connection.listen();
