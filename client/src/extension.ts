/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
//import { tmpdir } from 'node:os';
import { workspace, ExtensionContext } from 'vscode';

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from 'vscode-languageclient/node';
import {
  convertToWindows1252,
  UnrepresentableCharacterPolicy
} from './windows1252';

import * as vscode from 'vscode';
//import context from 'vscode';

let client: LanguageClient;
let encodingPromptQueue = Promise.resolve();
const handledEncodingPrompts = new Set<string>();

interface Utf8FileDetectedParams {
  uri: string;
}

interface EncodingConvertedParams {
  uri: string;
}

async function convertUtf8File(uriString: string): Promise<boolean> {
  const uri = vscode.Uri.parse(uriString);
  const openDocument = workspace.textDocuments.find(
    document => document.uri.toString() === uriString
  );
  const fileBytes = await workspace.fs.readFile(uri);
  let diskSource: string;
  try {
    diskSource = new TextDecoder('utf-8', { fatal: true }).decode(fileBytes);
  } catch (error) {
    if (!(error instanceof TypeError)) {
      throw error;
    }
    await vscode.window.showInformationMessage(
      `"${path.basename(uri.fsPath)}" não está mais codificado em UTF-8.`
    );
    return false;
  }

  const source = openDocument?.isDirty
    ? openDocument.getText()
    : diskSource;
  const probe = convertToWindows1252(source, 'replace');
  let policy: UnrepresentableCharacterPolicy = 'replace';
  if (probe.unrepresentableCount > 0) {
    const removeAction = 'Remover caracteres incompatíveis';
    const replaceAction = 'Substituir por ?';
    const keepAction = 'Manter UTF-8';
    const choice = await vscode.window.showWarningMessage(
      `"${path.basename(uri.fsPath)}" contém ${probe.unrepresentableCount} caractere(s) que não podem ser representados em Windows-1252.`,
      { modal: true },
      removeAction,
      replaceAction,
      keepAction
    );
    if (choice === removeAction) {
      policy = 'remove';
    } else if (choice !== replaceAction) {
      return false;
    }
  } else {
    const convertAction = 'Converter para Windows-1252';
    const keepAction = 'Manter UTF-8';
    const choice = await vscode.window.showWarningMessage(
      `"${path.basename(uri.fsPath)}" está em UTF-8, mas o compilador aceita Windows-1252. Deseja converter o arquivo?`,
      { modal: true },
      convertAction,
      keepAction
    );
    if (choice !== convertAction) {
      return false;
    }
  }

  const conversion = convertToWindows1252(source, policy);
  if (openDocument) {
    const currentText = openDocument.getText();
    if (currentText !== conversion.text) {
      const edit = new vscode.WorkspaceEdit();
      edit.replace(
        uri,
        new vscode.Range(
          new vscode.Position(0, 0),
          openDocument.positionAt(currentText.length)
        ),
        conversion.text
      );
      if (!await workspace.applyEdit(edit)) {
        throw new Error(`Não foi possível atualizar o documento "${uri.fsPath}".`);
      }
    }
    if (openDocument.isDirty && !await openDocument.save()) {
      throw new Error(`Não foi possível salvar o documento "${uri.fsPath}".`);
    }
  }

  await workspace.fs.writeFile(uri, conversion.bytes);
  const lossSummary = conversion.unrepresentableCount > 0
    ? ` ${conversion.unrepresentableCount} caractere(s) incompatível(is) foram ${
      policy === 'remove' ? 'removidos' : 'substituídos por ?'
    }.`
    : '';
  await vscode.window.showInformationMessage(
    `"${path.basename(uri.fsPath)}" foi convertido para Windows-1252.${lossSummary}`
  );
  return true;
}

export function activate(context: ExtensionContext) {
  // The server is implemented in node
  const serverModule = context.asAbsolutePath(
    path.join('server', 'out', 'server.js')
  );/*
  const cpuProfileOptions = process.env.POP_LSP_CPU_PROFILE === '1'
    ? { execArgv: ['--cpu-prof', `--cpu-prof-dir=${tmpdir()}`] }
    : undefined;
*/
  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: {
      module: serverModule,
      transport: TransportKind.ipc
      /*,
      ...(cpuProfileOptions ? { options: cpuProfileOptions } : {})*/
    },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc
      /*,
      ...(cpuProfileOptions ? { options: cpuProfileOptions } : {})*/
    }
  };

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'portugues-puro' }],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher('**/*.pop')
    }
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    'servidorDeLinguagemPortuguesPuro',
    'Servidor de Linguagem Português Puro',
    serverOptions,
    clientOptions
  );

  context.subscriptions.push(
    client.onNotification(
      'pop/utf8FileDetected',
      (params: Utf8FileDetectedParams) => {
        if (handledEncodingPrompts.has(params.uri)) {
          return;
        }
        handledEncodingPrompts.add(params.uri);
        encodingPromptQueue = encodingPromptQueue
          .then(async () => {
            const converted = await convertUtf8File(params.uri);
            if (converted) {
              await client.sendNotification(
                'pop/encodingConverted',
                { uri: params.uri } satisfies EncodingConvertedParams
              );
            }
          })
          .catch(error => {
            handledEncodingPrompts.delete(params.uri);
            void vscode.window.showErrorMessage(
              `Falha ao converter "${path.basename(vscode.Uri.parse(params.uri).fsPath)}": ${
                error instanceof Error ? error.message : String(error)
              }`
            );
          });
      }
    )
  );

  // Start the client. This will also launch the server
  client.start();
  context.subscriptions.push(stopProfileCommand);
}

const stopProfileCommand = vscode.commands.registerCommand(
    'portugues-puro.stopCpuProfile',
    async () => {
        if (!client) {
            return;
        }

        await client.sendRequest('pop/profile/stop');

        vscode.window.showInformationMessage(
            'Captura de CPU encerrada. Verifique a saída do servidor de linguagem para localizar o arquivo.'
        );
    }
);


export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
