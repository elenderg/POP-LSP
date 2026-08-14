import {
  InitializeParams as ParametrosDeInicializacao,
  InitializeResult as ResultadoDeInicializacao,
  TextDocumentSyncKind as TipoDeSincronizacaoDeDocumentoTexto,
  DidChangeConfigurationNotification as NotificacaoDeAlteracaoDeConfiguracao
} from 'vscode-languageserver/node';

import { Connection as Conexao} from 'vscode-languageserver';

export function registerConnectionLifecycle(conexao: Conexao, state: any) { // TODO: definir tipo de state. Idealmente as propriedades de state deveriam ser obtidas através dos parâmetros recebidos pelo método conexão.onInitialize, mas isso não é possível porque o tipo de state é definido fora do escopo da função registerConnectionLifecycle. Talvez seja necessário refatorar o código para que o tipo de state seja definido dentro do escopo da função registerConnectionLifecycle, ou passar o tipo de state como parâmetro para a função registerConnectionLifecycle.
  conexao.onInitialize((parametros: ParametrosDeInicializacao) => {
    const capacidades = parametros.capabilities;

    state.hasConfigurationCapability = !!capacidades.workspace?.configuration;
    state.hasWorkspaceFolderCapability = !!capacidades.workspace?.workspaceFolders;
    state.hasDiagnosticRelatedInformationCapability =
      !!capacidades.textDocument?.publishDiagnostics?.relatedInformation;

    const result: ResultadoDeInicializacao = {
      capabilities: {
        textDocumentSync: TipoDeSincronizacaoDeDocumentoTexto.Incremental,
        completionProvider: { resolveProvider: true },
        diagnosticProvider: {
          interFileDependencies: false,
          workspaceDiagnostics: false
        }
      }
    };

    if (state.hasWorkspaceFolderCapability) {
      result.capabilities.workspace = {
        workspaceFolders: { supported: true }
      };
    }

    return result;
  });

  conexao.onInitialized(() => {
    if (state.hasConfigurationCapability) {
      conexao.client.register(NotificacaoDeAlteracaoDeConfiguracao.type);
    }
  });
}