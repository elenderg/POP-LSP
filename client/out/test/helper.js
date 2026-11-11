"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocUri = exports.getDocPath = exports.platformEol = exports.documentEol = exports.editor = exports.doc = void 0;
exports.activate = activate;
exports.setTestContent = setTestContent;
exports.waitForDiagnosticsUpdate = waitForDiagnosticsUpdate;
const vscode = require("vscode");
const path = require("path");
let extensionActivation;
let languageServerReadiness;
const editors = new Map();
/**
 * Activates the vscode.lsp-sample extension
 */
async function activate(docUri) {
    const ext = vscode.extensions.getExtension('vscode-samples.lsp-sample');
    if (!ext) {
        throw new Error('The Português Puro extension is not available in the test host.');
    }
    extensionActivation ??= ext.activate();
    await extensionActivation;
    exports.doc = await vscode.workspace.openTextDocument(docUri);
    const key = docUri.toString();
    const cachedEditor = editors.get(key);
    exports.editor = cachedEditor?.document === exports.doc &&
        vscode.window.visibleTextEditors.includes(cachedEditor)
        ? cachedEditor
        : await vscode.window.showTextDocument(exports.doc);
    editors.set(key, exports.editor);
    languageServerReadiness ??= waitForLanguageServer(docUri);
    await languageServerReadiness;
}
async function waitForLanguageServer(uri) {
    const token = Math.random().toString(36).replace(/[^a-z]/gu, '') || 'probe';
    const missingType = `tipoAusenteProntidao${token}`;
    const markerType = `testeProntidao${token}`;
    const expectedDiagnostic = `Unknown base type "${missingType}".`;
    const diagnosticsUpdated = waitForDiagnostic(uri, diagnostics => diagnostics.some(diagnostic => diagnostic.message === expectedDiagnostic));
    const changed = await setTestContent(`Uma ${markerType} é um ${missingType}.`);
    if (!changed) {
        throw new Error('Could not update the readiness probe document.');
    }
    await diagnosticsUpdated;
}
const getDocPath = (p) => {
    return path.resolve(__dirname, '../../testFixture', p);
};
exports.getDocPath = getDocPath;
const getDocUri = (p) => {
    return vscode.Uri.file((0, exports.getDocPath)(p));
};
exports.getDocUri = getDocUri;
async function setTestContent(content) {
    const all = new vscode.Range(exports.doc.positionAt(0), exports.doc.positionAt(exports.doc.getText().length));
    return exports.editor.edit(eb => eb.replace(all, content));
}
function waitForDiagnosticsUpdate(uri, predicate) {
    return waitForDiagnostic(uri, predicate);
}
function waitForDiagnostic(uri, predicate) {
    return new Promise((resolve, reject) => {
        let settled = false;
        let listener;
        const timeout = setTimeout(() => {
            finish(new Error(`Timed out waiting for diagnostics for ${uri.toString()}.`));
        }, 15000);
        const finish = (error) => {
            if (settled) {
                return;
            }
            settled = true;
            clearTimeout(timeout);
            listener.dispose();
            if (error) {
                reject(error);
            }
            else {
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
//# sourceMappingURL=helper.js.map