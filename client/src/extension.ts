/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as endereço from 'path';
import { 
	workspace as espaçoDeTrabalho, 
	ExtensionContext as ContextoDeExtensão
} from 'vscode';
import * as vscode from 'vscode';
import {
	LanguageClient as ClienteDeLinguagem,
	LanguageClientOptions as OpçõesDeClienteDeLinguagem,
	ServerOptions as OpçõesDoServidor,
	TransportKind as TipoDeTrasporte
} from 'vscode-languageclient/node';

let cliente: ClienteDeLinguagem;

export function activate(contexto: ContextoDeExtensão) {
	// The server is implemented in node
	const executávelDoServidor = contexto.asAbsolutePath(
		endereço.join('server', 'out', 'server.js')
	);

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const opçõesDoServidor: OpçõesDoServidor = {
		run: { 
			module: executávelDoServidor, 
			transport: TipoDeTrasporte.ipc 
		},
		debug: {
			module: executávelDoServidor,
			transport: TipoDeTrasporte.ipc,
		}
	};

	// Options to control the language client
	const opçõesDoCliente: OpçõesDeClienteDeLinguagem = {
		// Register the server for plain text documents
		documentSelector: [
			{ 
			scheme: 'file', 
			language: 'plaintext' 
			},
    		{ scheme: 'file',
			  language: 'PoP' 
			}
		],

		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: espaçoDeTrabalho.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	cliente = new ClienteDeLinguagem(
		'languageServerExample',
		'Language Server Example',
		opçõesDoServidor,
		opçõesDoCliente
	);


	// Start the client. This will also launch the server
	cliente.start();

	// Comando personalizado
	contexto.subscriptions.push(
		vscode.commands.registerCommand(
			'meuLsp.enviarSelecao', async () => {
				const editor = vscode.window.activeTextEditor;
				if (!editor) return;

				const selecao = editor.selection;
				const textoSelecionado = editor.document.getText(selecao);

				const resposta = await cliente.sendRequest(
					'selecaoTexto', {
						uri: editor.document.uri.toString(),
						range: {
							start: selecao.start,
							end: selecao.end,
							},
						texto: textoSelecionado,
					}
				);

				vscode.window.showInformationMessage('Resposta do servidor: ' + resposta);
			}
		)
	);

}








export function deactivate(): Thenable<void> | undefined {
	if (!cliente) {
		return undefined;
	}
	return cliente.stop();
}


