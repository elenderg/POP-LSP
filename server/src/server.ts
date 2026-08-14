/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
  createConnection as CriarConexão,
  TextDocuments as DocumentosDeTexto,
  Diagnostic as Diagnóstico,
  //DiagnosticSeverity as SeveridadeDoDiagnóstico,
  ProposedFeatures as RecursosPropostos,
  InitializeParams as InicializarParâmetros,
  DidChangeConfigurationNotification as NotificaçãoDeMudançaDeConfiguração,
  CompletionItem as ItemDeConclusão,
  CompletionItemKind as TipoDeItemDeConclusão,
  TextDocumentPositionParams as ParâmetrosDePosiçãoDoDocumento,
  TextDocumentSyncKind as TipoDeSincronizaçãoDoDocumento,
  InitializeResult as ResultadoDeInicialização,
  DocumentDiagnosticReportKind as TipoDeRelatórioDeDiagnósticoDoDocumento,
  //Hover as InformacaoDeHover,
  //Location as Localização,
  //LocationLink as LinkDeLocalização,
  //ReferenceParams as ParametrosDeReferência,
  //DefinitionParams as ParametrosDeDefinição,
  //TypeDefinitionParams as ParametrosDeDefiniçãoDeTipo,
  //ImplementationParams as ParametrosDeImplementação,
  //HoverParams as ParâmetrosDeHover,
  //Position as Posição,
  //Range as Intervalo,
  type DocumentDiagnosticReport as RelatórioDeDiagnósticoDoDocumento
} from 'vscode-languageserver/node';

import { TextDocument as DocumentoDeTexto, } from 'vscode-languageserver-textdocument';
//import { Range } from "vscode-languageclient";

// Cria uma conexão para o servidor. A conexão usa Node's IPC como transporte.
// Também inclui todos os recursos LSP propostos.
export const conexão = CriarConexão(RecursosPropostos.all);

// Cria um gerenciador de documentos de texto. Ele lida com o sincronismo de documentos
export const documentos = new DocumentosDeTexto(DocumentoDeTexto);

export let possuiCapacidadeDeConfiguração = false;
export let possuiCapacidadeDeEspaçoDeTrabalho = false;
export let possuiCapacidadedeInformaçõesDeDiagnósticoRelacionadas = false;

conexão.onInitialize((parâmetros: InicializarParâmetros) => {
  console.log('Servidor de Linguagem para PoP iniciado.');
  const capacidades = parâmetros.capabilities;

  // Verifica se o cliente suporta as capacidades de configuração e espaço de trabalho.
  // Isso é importante para saber se o servidor pode registrar notificações de mudança de configuração
  //  e eventos de espaço de trabalho.
  possuiCapacidadeDeConfiguração = !!(capacidades.workspace && !!capacidades.workspace.configuration);
  possuiCapacidadeDeEspaçoDeTrabalho = !!(capacidades.workspace && !!capacidades.workspace.workspaceFolders);
  possuiCapacidadedeInformaçõesDeDiagnósticoRelacionadas = !!(
    capacidades.textDocument && capacidades.textDocument.publishDiagnostics &&
    capacidades.textDocument.publishDiagnostics.relatedInformation
  );
  // Se o cliente não suporta as capacidades de configuração e espaço de trabalho, 
  // o servidor usará configurações globais padrão.

  const resultado: ResultadoDeInicialização = {
    capabilities: {
      textDocumentSync: TipoDeSincronizaçãoDoDocumento.Incremental,
      // Informa ao cliente que o servidor suporta conclusão de código.
      completionProvider: { resolveProvider: true },
      diagnosticProvider: {
        interFileDependencies: false,
        workspaceDiagnostics: false
      },
      // ↓ ↓ ↓ ↓ ↓ Linhas adicionais
      definitionProvider: true,
      typeDefinitionProvider: true,
      implementationProvider: true,
      referencesProvider: true,
      selectionRangeProvider: true,
      hoverProvider: true,
      documentSymbolProvider: true,
      renameProvider: true
    }
  };
  if (possuiCapacidadeDeEspaçoDeTrabalho) {
    resultado.capabilities.workspace = {
      workspaceFolders: { supported: true }
    };
  }
  return resultado;
});

conexão.onInitialized(() => {
  conexão.console.log('Servidor inicializado com sucesso.');
  if (possuiCapacidadeDeConfiguração) {
    conexão.client.register(NotificaçãoDeMudançaDeConfiguração.type, undefined);
  }
  if (possuiCapacidadeDeEspaçoDeTrabalho) {
    conexão.workspace.onDidChangeWorkspaceFolders(_event => {
      conexão.console.log('Recebido evento solicitando alteração para Espaço de Trabalho.');
    });
  }
});

// As configurações de exemplo
export interface ConfiguraçõesDeExemplo {
  maxNumberOfProblems: number;
}

// As configurações globais, usadas quando a solicitação `workspace/configuration` não é suportada pelo cliente.
// Por favor, note que este não é o caso do VSCode, que suporta essa solicitação por padrão.
// mas pode acontecer com outros clientes.
export const configuraçõesPadrão: ConfiguraçõesDeExemplo = { maxNumberOfProblems: 1000 };
export let configuraçõesGlobais: ConfiguraçõesDeExemplo = configuraçõesPadrão;

// Armazena em cache as configurações específicas do documento.
export const configuraçõesDoDocumento = new Map<string, Thenable<ConfiguraçõesDeExemplo>>();

conexão.onDidChangeConfiguration(alteração => {
  if (possuiCapacidadeDeConfiguração) {
    // Redefine todas as configurações de documento armazenadas em cache
    configuraçõesDoDocumento.clear();
  } else {
    configuraçõesGlobais = (
      (alteração.settings.languageServerExample || configuraçõesPadrão)
    );
  }
  // Atualiza os diagnósticos, uma vez que o `maxNumberOfProblems` pode ter mudado.
  // Pode ser otimizado posteriormente
  conexão.languages.diagnostics.refresh();
});

function obterConfiguraçõesDoDocumento(recurso: string): Thenable<ConfiguraçõesDeExemplo> {
	if (!possuiCapacidadeDeConfiguração) {
		return Promise.resolve(configuraçõesGlobais);
	}
	let resultado = configuraçõesDoDocumento.get(recurso);
	if (!resultado) {
		resultado = conexão.workspace.getConfiguration({
			scopeUri: recurso,
			section: 'languageServerExample'
		});
		configuraçõesDoDocumento.set(recurso, resultado);
	}
	return resultado;
}

// As configurações só são mantidas em cache para documentos abertos.
documentos.onDidClose(e => {
  configuraçõesDoDocumento.delete(e.document.uri);
});

conexão.languages.diagnostics.on(async (parâmetros) => {
  const documento = documentos.get(parâmetros.textDocument.uri);
  if (documento !== undefined) {
    return {
      kind: TipoDeRelatórioDeDiagnósticoDoDocumento.Full,
      items: await validateTextDocument(documento)
    } satisfies RelatórioDeDiagnósticoDoDocumento;
  } else {
    // Quando não conhecemos o documento, podemos tentar lê-lo do disco
    // ou simplesmente não relatar problemas para ele.
    return {
      kind: TipoDeRelatórioDeDiagnósticoDoDocumento.Full,
      items: []
    } satisfies RelatórioDeDiagnósticoDoDocumento;
  }
});

// O conteúdo de um documento de texto foi alterado. Este evento é emitido
// quando o documento de texto é aberto pela primeira vez ou quando seu conteúdo é alterado.
documentos.onDidChangeContent(alteração => {
  validateTextDocument(alteração.document);
});

async function validateTextDocument(documentoDeTexto: DocumentoDeTexto): Promise<Diagnóstico[]> {
  // Neste simples exemplo, obtemos as configurações para cada execução de validação. 
  // Em um cenário real, você provavelmente gostaria de armazenar isso em cache para evitar chamadas repetidas ao cliente.  
  const diagnósticos: Diagnóstico[] = [];
  const configurações = await obterConfiguraçõesDoDocumento(documentoDeTexto.uri);
  if (configurações.maxNumberOfProblems <= 0) { // TODO: REMOVER ESTA VERIFICAÇÃO APÓS TESTES
    return diagnósticos;
  }
  const texto = documentoDeTexto.getText();
  const linhas = texto.split(/\r?\n/);

  let últimaLinhaDeCódigo: string | undefined;
  //let índiceDaLinha: number | undefined;

  // Percorre de trás para frente
  for (let índice = linhas.length - 1; índice >= 0; índice--) {
    const linha = linhas[índice].trim();
    // Ignora linhas vazias
    if (linha === "") { continue; }
    // Ignora comentários iniciados por "\"
    if (linha.startsWith("\\")) { continue; }
    // Encontramos a última linha de código
    últimaLinhaDeCódigo = linha;
    //índiceDaLinha = índice;
    break;
  }

  if (últimaLinhaDeCódigo /*&& índiceDaLinha !== undefined*/) {
    // Verifica se termina com "." ou "]"
    if (!(últimaLinhaDeCódigo.endsWith(".") || últimaLinhaDeCódigo.endsWith("]"))) {
      // Pega último caractere não-espaço
      const últimoCaractere = últimaLinhaDeCódigo[últimaLinhaDeCódigo.length - 1];
      diagnósticos.push({
        severity: 1, // 1 = Error no LSP
        range: {
          start: {
            line: linhas.length - 1, character: últimaLinhaDeCódigo.length - 1
          },
          end: {
            line: linhas.length - 1, character: últimaLinhaDeCódigo.length
          }
        },
        message: `Documento inválido: O último caractere do documento deve ser um ponto final ou um comentário, não um "${últimoCaractere}".`,
        source: "servidor-de-linguagem"
      });
    }
  }
  return diagnósticos;
}

conexão.onDidChangeWatchedFiles(_change => {
  // Monitora arquivos no espaço de trabalho do VS Code.   
  conexão.console.log('Recebido evento de alteração de arquivos.');
});


// Este método é chamado para completar o código no editor.
// O provedor de conclusão é acionado quando o usuário solicita a conclusão
//  (por exemplo, ao pressionar Ctrl+Space) ou automaticamente dependendo do
//  configurações do editor.
conexão.onCompletion(
  (_textDocumentPosition: ParâmetrosDePosiçãoDoDocumento): ItemDeConclusão[] => {
    // Retorna uma lista de itens de conclusão de exemplo.
    // Em um cenário real, você provavelmente buscaria esses itens de um banco de dados
    //  ou os geraria dinamicamente com base no contexto atual do documento.
    return [
      {
        label: 'TypeScript',
        kind: TipoDeItemDeConclusão.Text,
        data: 1
      },
      {
        label: 'JavaScript',
        kind: TipoDeItemDeConclusão.Text,
        data: 2
      }
    ];
  }
);

// Este método fornece informações adicionais para um item de conclusão selecionado na lista de conclusão.
// Por exemplo, o item de conclusão pode ter sido selecionado na lista de conclusão
//  e agora o cliente quer saber mais detalhes sobre esse item, como documentação ou detalhes.
// O servidor deve retornar o item de conclusão com os campos adicionais preenchidos.
// Note que a propriedade 'data' do item de conclusão é usada para identificar qual item
// o cliente está solicitando mais informações. Neste exemplo, usamos valores numéricos simples,
// mas em um cenário real, você poderia usar identificadores mais complexos.
conexão.onCompletionResolve(
  (item: ItemDeConclusão): ItemDeConclusão => {
    if (item.data === 1) {
      item.detail = 'Detalhes do TypeScript';
      item.documentation = 'Documentação do TypeScript';
    } else if (item.data === 2) {
      item.detail = 'Detalhes do JavaScript';
      item.documentation = 'Documentação do JavaScript';
    }
    return item;
  }
);


// Faz com que o gerenciador de documentos de texto aguarde os eventos da conexão
// por exemplo, eventos de abertura, mudança e fechamento de documentos de texto.
documentos.listen(conexão);

// Faz com que a conexão aguarde por eventos de inicialização, conclusão, hover, definição de tipo, implementação e referências.
conexão.listen();


