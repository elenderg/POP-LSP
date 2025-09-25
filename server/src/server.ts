/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
  createConnection as CriarConexão,
  TextDocuments as DocumentosDeTexto,
  Diagnostic as Diagnóstico,
  DiagnosticSeverity as SeveridadeDoDiagnóstico,
  ProposedFeatures as RecursosPropostos,
  InitializeParams as InicializarParâmetros,
  DidChangeConfigurationNotification as NotificaçãoDeMudançaDeConfiguração,
  CompletionItem as ItemDeConclusão,
  CompletionItemKind as TipoDeItemDeConclusão,
  TextDocumentPositionParams as ParâmetrosDePosiçãoDoDocumento,
  TextDocumentSyncKind as TipoDeSincronizaçãoDoDocumento,
  InitializeResult as ResultadoDeInicialização,
  DocumentDiagnosticReportKind as TipoDeRelatórioDeDiagnósticoDoDocumento,
  Hover as InformacaoDeHover,
  Location as Localização,
  LocationLink as LinkDeLocalização,
  ReferenceParams as ParametrosDeReferência,
  DefinitionParams as ParametrosDeDefinição,
  TypeDefinitionParams as ParametrosDeDefiniçãoDeTipo,
  ImplementationParams as ParametrosDeImplementação,
  HoverParams as ParâmetrosDeHover,
  Position as Posição,
  Range as Intervalo,
  type DocumentDiagnosticReport as RelatórioDeDiagnósticoDoDocumento
} from 'vscode-languageserver/node';

import {TextDocument as DocumentoDeTexto,} from 'vscode-languageserver-textdocument';
//import { Range } from "vscode-languageclient";

// Cria uma conexão para o servidor. A conexão usa Node's IPC como transporte.
// Também inclui todos os recursos LSP propostos.
export const conexão = CriarConexão(RecursosPropostos.all);

// Cria um gerenciador de documentos de texto. Ele lida com o sincronismo de documentos
export const documentos = new DocumentosDeTexto(DocumentoDeTexto);

export let possuiCapacidadeDeConfiguração = false;
export let possuiCapacidadeDeEspaçoDeTrabalho = false;
export let possuiCapacidadedeInformaçõesDeDiagnósticoRelacionadas = false;


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

export const palavrasContexto = [
  'a', 'o', 'as', 'os', 'um', 'uma', 'uns', 'umas',
  //'se', 'itere', 'pare', 'retorne', 
	'no', 'na', 'nos', 'nas',
  'ao', 'aos', 'à', 'às', 'num', 'nuns', 'numa', 'numas', 'não',
  'desse', 'desses', 'deste', 'destes', 'dessa', 'dessas', 'desta', 'destas',
  'cabe', 'couber', 'começa', 'começar', 'conter', 'contiver', 'contém',
  'deve', 'devem', 'deveria', 'deveriam', 'estamos', 'estar', 'estará',
  'estarão', 'estava', 'estavam', 'estiver', 'estiverem', 'está', 'estão',
  'excede', 'excedem', 'existe', 'existem', 'existir', 'finaliza', 'finalizar',
  'é', 'foi', 'for', 'foram', 'forem', 'há', 'houver', 'inicia', 'iniciar',
  'necessita', 'necessitar', 'parece', 'pode', 'podem', 'podemos', 'poderia',
  'possuem', 'possui', 'possuir', 'puder', 'puderem', 'requer', 'ser', 'será',
  'serão', 'supera', 'superam', 'superar', 'são', 'tem', 'ter', 'termina',
  'terminar', 'tiver', 'têm', 'mais', 'menos', 'vezes', 'multiplicado',
  'dividido', 'junto', 'seguido', 'partir', 'partindo', 'abaixo', 'ante',
  'perante', 'antes', 'debaixo', 'sob', 'acerca', 'cerca', 'cuja', 'cujo',
  'cujas', 'cujos', 'próximo', 'perto', 'com', 'tal', 'como', 'contra', 'dada',
  'dado', 'dando', 'gerando', 'resultando', 'retornando', 'desde', 'depois',
  'após', 'durante', 'em', 'entre', 'dentre', 'até', 'mediante', 'para', 'via',
  //'segundo', 
	'acordo', 'sem', 'então', 'sobre', 'usando', 'versus', 'enquanto',
  'aproximadamente', 'através', 'algum', 'referente', 'pertencente', 'pertinente',
  'relativo', 'relativa', 'concernente', 'atinente', 'começando', 'iniciando',
  'orientada', 'orientado', 'orientando', 'orientando-se', 'voltada', 'voltado',
  'virada', 'virado', 'virando', 'virando-se', 'tão', 'tanto', 'quanto', 'quão',
  'qual', 'regressivamente', 'dentro', 'parecida', 'parecido', 'semelhante',
  'similar', 'só', 'somente', 'unicamente', 'exclusivamente', 'apenas', 'fora',
  'menores', 'alta', 'alto', 'comprido', 'comprida', 'largo', 'larga',
  'chamado', 'chamados', 'chamada', 'chamadas', 'denominado', 'denominados',
  'denominada', 'denominadas', 'e', 'ou', 'nem', ',', '.', ';', ':'
];

export const conjuntoDePalavrasContexto = new Set(palavrasContexto.map(palavra => palavra.toLowerCase()));

export const listaDeArtigos = new Set([
  'a', 'o', 'as', 'os', 
  'um', 'uma', 'uns', 'umas',
  'ao', 'aos', 'à', 'às', 
  'num', 'nuns', 'numa', 'numas',
  'no', 'na', 'nos', 'nas',
	//'pro', 'pros', 'pra', 'pras',
  'desse', 'desses', 'deste', 'destes', 
  'dessa', 'dessas', 'desta', 'destas'
]);

//const padraoContexto = palavrasContexto.join('|');
//const expressao = new RegExp(`\\b(?:${padraoContexto})\\s+(\\w+)\\s+(?:${padraoContexto})\\b`, 'gi');

// As configurações só são mantidas em cache para documentos abertos.
documentos.onDidClose(e => {
  configuraçõesDoDocumento.delete(e.document.uri);
});

// O conteúdo de um documento de texto foi alterado. Este evento é emitido
// quando o documento de texto é aberto pela primeira vez ou quando seu conteúdo é alterado.
documentos.onDidChangeContent(alteração => {
  validateTextDocument(alteração.document);
});


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
      completionProvider: {resolveProvider: true},
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
  if (possuiCapacidadeDeEspaçoDeTrabalho){
    resultado.capabilities.workspace = {
      workspaceFolders: {supported: true}
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


conexão.languages.diagnostics.on(async (parâmetros) => {
  const documento = documentos.get(parâmetros.textDocument.uri);
  if (documento !== undefined) {
    return {
      kind: TipoDeRelatórioDeDiagnósticoDoDocumento.Full,
      items: await validateTextDocument(documento)
    } satisfies RelatórioDeDiagnósticoDoDocumento;
  } else {
    // Quando não conhecemos o documento. Podemos tentar lê-lo do disco
    // ou não relatar problemas para ele.
    return {
      kind: TipoDeRelatórioDeDiagnósticoDoDocumento.Full,
      items: []
    } satisfies RelatórioDeDiagnósticoDoDocumento;
  }
});

conexão.onDocumentSymbol(
  (parâmetros) => {
    if (!parâmetros.textDocument.uri)  {
      return []; // Retorna um array vazio se o documento não existir
    }
    // Retorne um array vazio ou implemente a lógica de símbolos conforme sua linguagem
    return [];
  }
);



conexão.onDidChangeWatchedFiles(_change => {
  // Monitora arquivos no espaço de trabalho. Neste exemplo, não fazemos nada
  // quando um arquivo é alterado.
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


// Handler para Hover
conexão.onHover(
  (_params: ParâmetrosDeHover): InformacaoDeHover | null => {
    // Retorna uma informação de hover simulada
    return {
      contents: {
        kind: 'markdown',
        value: 'Informação de **Hover** de exemplo.'
      }
    };
  }
);


conexão.onRequest('selecaoTexto', (
  parâmetros: { 
    uri: string, 
    range: Intervalo, 
    texto: string 
  }) => {
      conexão.console.log(`Texto recebido: "${parâmetros.texto}"`);
      return `O servidor recebeu ${parâmetros.texto.length} caracteres`;
});


// Handler para Goto Type Definition
conexão.onTypeDefinition(
  (_params: ParametrosDeDefiniçãoDeTipo): Localização[] => {
    let conteúdoLinha = '';
    let documento = documentos.get(_params.textDocument.uri);
    if (!documento) {
      console.log('Documento não encontrado.');
      return [];
    }
    // Pega a posição enviada pelo cliente
    let posição = _params.position;
    // Descobre os limites (início e fim) da linha
    let inícioDaLinha = { line: posição.line, character: 0 };
    let fimDaLinha = { line: posição.line, character: Number.MAX_SAFE_INTEGER };

    // Extrai o texto da linha
    let linha = documento.getText({
      start: inícioDaLinha,
      end: fimDaLinha
    });

    if (linha) {
      conteúdoLinha = linha;
    }

    console.log(`Conteúdo da linha: "${conteúdoLinha}"`);

    let palavra = obtémPalavraSobCursor(conteúdoLinha, posição.character);
    if (!palavra) {
      return [];
    }
    console.log(`Palavra atual: "${palavra}"`);

    let posiçãoDaPalavra = conteúdoLinha.indexOf(palavra);

    let inícioDoTermo = encontraInícioDoTermo(conteúdoLinha, posiçãoDaPalavra);
    let fimDoTermo = encontraFimDoTermo(conteúdoLinha, posiçãoDaPalavra + palavra.length);

    let palavraCompleta = (inícioDoTermo + " " + palavra + " " + fimDoTermo).trim();

    console.log(`Palavra completa: "${palavraCompleta}"`);

    // Retorna uma localização simulada (sempre aponta para a linha 1)
    return [{
      uri: _params.textDocument.uri,
      range: {
        start: { line: 1, character: 0 },
        end: { line: 1, character: 10 }
      }
    }];
  }
);


// Handler para Goto Implementation
conexão.onImplementation(
  (_params: ParametrosDeImplementação): Localização[] => {
    // Retorna uma localização simulada (sempre aponta para a linha 2)
    return [{
      uri: _params.textDocument.uri,
      range: {
        start: { line: 2, character: 0 },
        end: { line: 2, character: 10 }
      }
    }];
  }
);

// Handler para Find References
conexão.onReferences(
  (_params: ParametrosDeReferência): Localização[] => {
    // Retorna duas localizações simuladas
    return [
      {
        uri: _params.textDocument.uri,
        range: {
          start: { line: 0, character: 0 },
          end: { line: 0, character: 10 }
        }
      },
      {
        uri: _params.textDocument.uri,
        range: {
          start: { line: 3, character: 0 },
          end: { line: 3, character: 10 }
        }
      }
    ];
  }
);

conexão.onDefinition((_params: ParametrosDeDefiniçãoDeTipo): Localização[] |LinkDeLocalização[] | null => {
  const documento = documentos.get(_params.textDocument.uri);
  if (!documento) {
    return null;
  }
  return null;

}); 

// Make the text document manager listen on the connection
// for open, change and close text document events
documentos.listen(conexão);

// Listen on the connection
conexão.listen();




export function obtémPalavraSobCursor(linha: string, posicao: number): string {
  const regexPalavra = /\w+/g;
  let correspondência: RegExpExecArray | null; // RegExpExecArray é o tipo usado em correspondências de regex
  while ((correspondência = regexPalavra.exec(linha))) { 
    // sempre que encontrar uma correspondência, isto é, uma palavra sob o cursor
    if (correspondência.index <= posicao && regexPalavra.lastIndex >= posicao) {
      // Se correspondência atual estiver na posição do cursor
      return correspondência[0]; // Retorna a palavra encontrada
    }
  }
  // Se nenhuma palavra for encontrada sob o cursor, retorna uma string vazia
  return '';
}


export function recuaParaAPalavraAnterior(linha: string, índiceAtual: number): string {
  if (índiceAtual <= 0) {
    // vai para a linha anterior
    let linhaAnterior = obterLinhaAnterior(linha);
    // recua para a última palavra da linha anterior
    let palavraAnterior = recuaParaAPalavraAnterior(linhaAnterior, linhaAnterior.length);
    return palavraAnterior;
  ;} 
  let conteúdoAnterior = linha.slice(0, índiceAtual).trimEnd();
  let partes = conteúdoAnterior.split(/\s+/);
  if (partes.length > 0) {
    return partes[partes.length - 1].toLowerCase();
  } else {
    return '';
  }
}

export function avançaParaAPalavraSeguinte(linha: string, índiceAtual: number): string {
  if (índiceAtual >= linha.length) {
    // vai para a linha seguinte
    let linhaSeguinte = obterLinhaSeguinte(linha);
    // avança para a primeira palavra da linha seguinte
    let palavraSeguinte = avançaParaAPalavraSeguinte(linhaSeguinte, 0);
    return palavraSeguinte;
  }
  let conteúdoPosterior = linha.slice(índiceAtual).trimStart();
  let partes = conteúdoPosterior.split(/\s+/);
  if (partes.length > 0) {
    return partes[0].toLowerCase();
  } else {
    return '';
  }
}

export function obterLinhaSeguinte(linhaAtual: string): string {
  // Esta função deve retornar a linha seguinte ao conteúdo da linha atual
  
  // procura o índice da linha atual no array de linhas
  const linhas = linhaAtual.split(/\r?\n/g);
  const índiceLinhaAtual = linhas.indexOf(linhaAtual);
  let índiceLinhaSeguinte = índiceLinhaAtual + 1;
  let conteúdoLinhaSeguinte = '';
  // atribui o conteúdo da linha seguinte se existir
  if (índiceLinhaSeguinte >= 0 && índiceLinhaSeguinte < linhas.length) {
    conteúdoLinhaSeguinte = linhas[índiceLinhaSeguinte];
  }
  return conteúdoLinhaSeguinte;
}

export function obterLinhaAnterior(linhaAtual: string): string {
  // Esta função deve retornar a linha anterior ao conteúdo da linha atual  
  // procura o índice da linha atual no array de linhas
  const linhas = linhaAtual.split(/\r?\n/g);
  const índiceLinhaAtual = linhas.indexOf(linhaAtual);
  let índiceLinhaAnterior = índiceLinhaAtual - 1;
  let conteúdoLinhaAnterior = '';
  // atribui o conteúdo da linha anterior se existir
  if (índiceLinhaAnterior >= 0 && índiceLinhaAnterior < linhas.length) {
    conteúdoLinhaAnterior = linhas[índiceLinhaAnterior];
  }
  return conteúdoLinhaAnterior;
}

export function encontraFimDoTermo(linhaAtual: string, posiçãoAtual: number): string {
  let próximoTermo = '';
  while (posiçãoAtual < linhaAtual.length) { // Enquanto estivermos na linha atual
    let termoEmAnalise = avançaParaAPalavraSeguinte(linhaAtual, posiçãoAtual);
    if (conjuntoDePalavrasContexto.has(termoEmAnalise)) {
      // Se o próximo termo for um dos termos de contexto, então paramos aqui
      console.log(`Termo encontrado na lista de contexto: "${termoEmAnalise}"`);
      break;
    }
    else {
      console.log(`Termo não encontrado na lista de contexto: "${termoEmAnalise}"`);
      próximoTermo = próximoTermo + " " + termoEmAnalise;
      posiçãoAtual = posiçãoAtual + termoEmAnalise.length + 1; // avança o índice atual
    }
  }
  return próximoTermo.trim();// O trim remove espaços em branco extras no início e no fim
}

export function encontraInícioDoTermo(linhaAtual: string, posiçãoAtual: number): string {
  let termoAnterior = '';
  while (posiçãoAtual > 0) { // Enquanto estivermos na linha atual
    let termoEmAnalise = recuaParaAPalavraAnterior(linhaAtual, posiçãoAtual);
    console.log(`Analisando termo: "${termoEmAnalise}"`);
    if (conjuntoDePalavrasContexto.has(termoEmAnalise)) {
      // Se o termo anterior for um dos termos de contexto, então paramos aqui
      console.log(`Termo encontrado na lista de contexto: "${termoEmAnalise}"`);
      break;
    }
    else {
      console.log(`Termo não encontrado na lista de contexto: "${termoEmAnalise}"`);
      termoAnterior = termoEmAnalise + " " + termoAnterior;
      posiçãoAtual = posiçãoAtual - termoEmAnalise.length - 1; // recua o índice atual
    }
  }
  return termoAnterior.trim();// O trim remove espaços em branco extras no início e no fim
}

async function validateTextDocument(documentoDeTexto: DocumentoDeTexto): Promise<Diagnóstico[]> {
  let diagnósticos: Diagnóstico[] = [];

  let texto = documentoDeTexto.getText();
  let linhas = texto.split(/\r?\n/);

  let últimaLinhaDeCódigo: string | undefined;
  //let índiceDaLinha: number | undefined;

  // Percorre de trás para frente
  for (let índice = linhas.length - 1; índice >= 0; índice--) {
    let linha = linhas[índice].trim();
    // Ignora linhas vazias
    if (linha === "") {continue;}
    // Ignora comentários iniciados por "\"
    if (linha.startsWith("\\")) {continue;}
    // Encontramos a última linha de código
    últimaLinhaDeCódigo = linha;
    //índiceDaLinha = índice;
    break;
  }

  if (últimaLinhaDeCódigo /*&& índiceDaLinha !== undefined*/) {
    // Verifica se termina com "." ou "]"
    if (!(últimaLinhaDeCódigo.endsWith(".") || últimaLinhaDeCódigo.endsWith("]"))) {
      // Pega último caractere não-espaço
      let últimoCaractere = últimaLinhaDeCódigo[últimaLinhaDeCódigo.length - 1];
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