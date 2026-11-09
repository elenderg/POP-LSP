"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const path = require("path");
const node_os_1 = require("node:os");
const vscode_1 = require("vscode");
const node_1 = require("vscode-languageclient/node");
let client;
function activate(context) {
    // The server is implemented in node
    const serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js'));
    const cpuProfileOptions = process.env.POP_LSP_CPU_PROFILE === '1'
        ? { execArgv: ['--cpu-prof', `--cpu-prof-dir=${(0, node_os_1.tmpdir)()}`] }
        : undefined;
    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions = {
        run: {
            module: serverModule,
            transport: node_1.TransportKind.ipc,
            ...(cpuProfileOptions ? { options: cpuProfileOptions } : {})
        },
        debug: {
            module: serverModule,
            transport: node_1.TransportKind.ipc,
            ...(cpuProfileOptions ? { options: cpuProfileOptions } : {})
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
    client = new node_1.LanguageClient('languageServerExample', 'Language Server Example', serverOptions, clientOptions);
    // Start the client. This will also launch the server
    client.start();
}
function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
//# sourceMappingURL=extension.js.map