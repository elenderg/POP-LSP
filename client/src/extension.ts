/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as endereço from 'path';
import { 
  workspace as espaçoDeTrabalho, 
  ExtensionContext as ContextoDeExtensão
} from 'vscode';

import {
  LanguageClient as ClienteDeLinguagem,
  LanguageClientOptions as OpçõesDoClienteDeLinguagem,
  ServerOptions as OpçõesDoServidor,
  TransportKind as TipoDeTransporte
} from 'vscode-languageclient/node';
import * as vscode from 'vscode';
let cliente: ClienteDeLinguagem;


export function activate(contexto: ContextoDeExtensão) {
  console.log('Extensão do cliente foi ativada!');
  const executávelDoServidor = contexto.asAbsolutePath(endereço.join('server', 'out', 'server.js'));

  const opçõesDoServidor: OpçõesDoServidor = {
    run:     {module: executávelDoServidor,transport: TipoDeTransporte.ipc},
    debug:   {module: executávelDoServidor,transport: TipoDeTransporte.ipc,}
  };

  const opçõesDoCliente: OpçõesDoClienteDeLinguagem = {
    documentSelector: [      
      { scheme: 'file',language: 'pop'}
    ],
    synchronize: {
      // Notify the server about file changes to '.clientrc files contained in the workspace
      fileEvents: espaçoDeTrabalho.createFileSystemWatcher('**/.clientrc')
    }
  };

  cliente = new ClienteDeLinguagem(
    'languageServerExample',
    'Language Server Example',
    opçõesDoServidor,
    opçõesDoCliente
  );


  // Comando personalizado
  contexto.subscriptions.push(
    vscode.commands.registerCommand(
      'meuLsp.enviarSelecao', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {return;}

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
  cliente.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!cliente) {
    return undefined;
  }
  return cliente.stop();
}
