"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const path = require("path");
//import { tmpdir } from 'node:os';
const vscode_1 = require("vscode");
const node_1 = require("vscode-languageclient/node");
const windows1252_1 = require("./windows1252");
const vscode = require("vscode");
//import context from 'vscode';
let client;
let encodingPromptQueue = Promise.resolve();
const handledEncodingPrompts = new Set();
async function convertUtf8File(uriString) {
    const uri = vscode.Uri.parse(uriString);
    const openDocument = vscode_1.workspace.textDocuments.find(document => document.uri.toString() === uriString);
    const fileBytes = await vscode_1.workspace.fs.readFile(uri);
    let diskSource;
    try {
        diskSource = new TextDecoder('utf-8', { fatal: true }).decode(fileBytes);
    }
    catch (error) {
        if (!(error instanceof TypeError)) {
            throw error;
        }
        await vscode.window.showInformationMessage(`"${path.basename(uri.fsPath)}" não está mais codificado em UTF-8.`);
        return false;
    }
    const source = openDocument?.isDirty
        ? openDocument.getText()
        : diskSource;
    const probe = (0, windows1252_1.convertToWindows1252)(source, 'replace');
    let policy = 'replace';
    if (probe.unrepresentableCount > 0) {
        const removeAction = 'Remover caracteres incompatíveis';
        const replaceAction = 'Substituir por ?';
        const keepAction = 'Manter UTF-8';
        const choice = await vscode.window.showWarningMessage(`"${path.basename(uri.fsPath)}" contém ${probe.unrepresentableCount} caractere(s) que não podem ser representados em Windows-1252.`, { modal: true }, removeAction, replaceAction, keepAction);
        if (choice === removeAction) {
            policy = 'remove';
        }
        else if (choice !== replaceAction) {
            return false;
        }
    }
    else {
        const convertAction = 'Converter para Windows-1252';
        const keepAction = 'Manter UTF-8';
        const choice = await vscode.window.showWarningMessage(`"${path.basename(uri.fsPath)}" está em UTF-8, mas o compilador aceita Windows-1252. Deseja converter o arquivo?`, { modal: true }, convertAction, keepAction);
        if (choice !== convertAction) {
            return false;
        }
    }
    const conversion = (0, windows1252_1.convertToWindows1252)(source, policy);
    if (openDocument) {
        const currentText = openDocument.getText();
        if (currentText !== conversion.text) {
            const edit = new vscode.WorkspaceEdit();
            edit.replace(uri, new vscode.Range(new vscode.Position(0, 0), openDocument.positionAt(currentText.length)), conversion.text);
            if (!await vscode_1.workspace.applyEdit(edit)) {
                throw new Error(`Não foi possível atualizar o documento "${uri.fsPath}".`);
            }
        }
        if (openDocument.isDirty && !await openDocument.save()) {
            throw new Error(`Não foi possível salvar o documento "${uri.fsPath}".`);
        }
    }
    await vscode_1.workspace.fs.writeFile(uri, conversion.bytes);
    const lossSummary = conversion.unrepresentableCount > 0
        ? ` ${conversion.unrepresentableCount} caractere(s) incompatível(is) foram ${policy === 'remove' ? 'removidos' : 'substituídos por ?'}.`
        : '';
    await vscode.window.showInformationMessage(`"${path.basename(uri.fsPath)}" foi convertido para Windows-1252.${lossSummary}`);
    return true;
}
function activate(context) {
    // The server is implemented in node
    const serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js')); /*
    const cpuProfileOptions = process.env.POP_LSP_CPU_PROFILE === '1'
      ? { execArgv: ['--cpu-prof', `--cpu-prof-dir=${tmpdir()}`] }
      : undefined;
  */
    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions = {
        run: {
            module: serverModule,
            transport: node_1.TransportKind.ipc
            /*,
            ...(cpuProfileOptions ? { options: cpuProfileOptions } : {})*/
        },
        debug: {
            module: serverModule,
            transport: node_1.TransportKind.ipc
            /*,
            ...(cpuProfileOptions ? { options: cpuProfileOptions } : {})*/
        }
    };
    // Options to control the language client
    const clientOptions = {
        documentSelector: [{ scheme: 'file', language: 'portugues-puro' }],
        synchronize: {
            fileEvents: vscode_1.workspace.createFileSystemWatcher('**/*.pop')
        }
    };
    // Create the language client and start the client.
    client = new node_1.LanguageClient('servidorDeLinguagemPortuguesPuro', 'Servidor de Linguagem Português Puro', serverOptions, clientOptions);
    context.subscriptions.push(client.onNotification('pop/utf8FileDetected', (params) => {
        if (handledEncodingPrompts.has(params.uri)) {
            return;
        }
        handledEncodingPrompts.add(params.uri);
        encodingPromptQueue = encodingPromptQueue
            .then(async () => {
            const converted = await convertUtf8File(params.uri);
            if (converted) {
                await client.sendNotification('pop/encodingConverted', { uri: params.uri });
            }
        })
            .catch(error => {
            handledEncodingPrompts.delete(params.uri);
            void vscode.window.showErrorMessage(`Falha ao converter "${path.basename(vscode.Uri.parse(params.uri).fsPath)}": ${error instanceof Error ? error.message : String(error)}`);
        });
    }));
    // Start the client. This will also launch the server
    client.start();
    context.subscriptions.push(stopProfileCommand);
}
const stopProfileCommand = vscode.commands.registerCommand('portugues-puro.stopCpuProfile', async () => {
    if (!client) {
        return;
    }
    await client.sendRequest('pop/profile/stop');
    vscode.window.showInformationMessage('Captura de CPU encerrada. Verifique a saída do servidor de linguagem para localizar o arquivo.');
});
function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
//# sourceMappingURL=extension.js.map