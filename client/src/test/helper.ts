/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as vscode from 'vscode';
import * as path from 'path';

export let doc: vscode.TextDocument;
export let editor: vscode.TextEditor;
export let documentEol: string;
export let platformEol: string;

let extensionActivation: Thenable<unknown> | undefined;
let languageServerReadiness: Promise<void> | undefined;
const editors = new Map<string, vscode.TextEditor>();

/**
 * Activates the vscode.lsp-sample extension
 */
export async function activate(docUri: vscode.Uri) {
	const ext = vscode.extensions.getExtension('vscode-samples.lsp-sample');
	if (!ext) {
		throw new Error('The Português Puro extension is not available in the test host.');
	}
	extensionActivation ??= ext.activate();
	await extensionActivation;

	doc = await vscode.workspace.openTextDocument(docUri);
	const key = docUri.toString();
	const cachedEditor = editors.get(key);
	editor = cachedEditor?.document === doc &&
		vscode.window.visibleTextEditors.includes(cachedEditor)
		? cachedEditor
		: await vscode.window.showTextDocument(doc);
	editors.set(key, editor);

	languageServerReadiness ??= waitForLanguageServer(docUri);
	await languageServerReadiness;
}

async function waitForLanguageServer(uri: vscode.Uri): Promise<void> {
	const token = Math.random().toString(36).replace(/[^a-z]/gu, '') || 'probe';
	const missingType = `tipoAusenteProntidao${token}`;
	const markerType = `testeProntidao${token}`;
	const expectedDiagnostic = `Unknown base type "${missingType}".`;
	const diagnosticsUpdated = waitForDiagnostic(
		uri,
		diagnostics => diagnostics.some(diagnostic =>
			diagnostic.message === expectedDiagnostic
		)
	);
	const changed = await setTestContent(
		`Uma ${markerType} é um ${missingType}.`
	);
	if (!changed) {
		throw new Error('Could not update the readiness probe document.');
	}
	await diagnosticsUpdated;
}

export const getDocPath = (p: string) => {
	return path.resolve(__dirname, '../../testFixture', p);
};
export const getDocUri = (p: string) => {
	return vscode.Uri.file(getDocPath(p));
};

export async function setTestContent(content: string): Promise<boolean> {
	const all = new vscode.Range(
		doc.positionAt(0),
		doc.positionAt(doc.getText().length)
	);
	return editor.edit(eb => eb.replace(all, content));
}

export function waitForDiagnosticsUpdate(uri: vscode.Uri): Promise<void> {
	return waitForDiagnostic(uri);
}

function waitForDiagnostic(
	uri: vscode.Uri,
	predicate?: (diagnostics: readonly vscode.Diagnostic[]) => boolean
): Promise<void> {
	return new Promise((resolve, reject) => {
		let settled = false;
		let listener: vscode.Disposable;
		const timeout = setTimeout(() => {
			finish(new Error(`Timed out waiting for diagnostics for ${uri.toString()}.`));
		}, 15000);
		const finish = (error?: Error) => {
			if (settled) {
				return;
			}
			settled = true;
			clearTimeout(timeout);
			listener.dispose();
			if (error) {
				reject(error);
			} else {
				resolve();
			}
		};
		listener = vscode.languages.onDidChangeDiagnostics(event => {
			if (!event.uris.some(changedUri => changedUri.toString() === uri.toString())) {
				return;
			}
			if (!predicate || predicate(vscode.languages.getDiagnostics(uri))) {
				finish();
			}
		});
		if (predicate && predicate(vscode.languages.getDiagnostics(uri))) {
			finish();
		}
	});
}
