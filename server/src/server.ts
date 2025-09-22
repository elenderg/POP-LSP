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
const conexão = CriarConexão(RecursosPropostos.all);

// Cria um gerenciador de documentos de texto. Ele lida com o sincronismo de documentos
const documentos = new DocumentosDeTexto(DocumentoDeTexto);

let possuiCapacidadeDeConfiguração = false;
let possuiCapacidadeDeEspaçoDeTrabalho = false;
let possuiCapacidadedeInformaçõesDeDiagnósticoRelacionadas = false;

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

// As configurações de exemplo
interface ConfiguraçõesDeExemplo {
  maxNumberOfProblems: number;
}

// As configurações globais, usadas quando a solicitação `workspace/configuration` não é suportada pelo cliente.
// Por favor, note que este não é o caso do VSCode, que suporta essa solicitação por padrão.
// mas pode acontecer com outros clientes.
const configuraçõesPadrão: ConfiguraçõesDeExemplo = { maxNumberOfProblems: 1000 };
let configuraçõesGlobais: ConfiguraçõesDeExemplo = configuraçõesPadrão;

// Armazena em cache as configurações específicas do documento.
const configuraçõesDoDocumento = new Map<string, Thenable<ConfiguraçõesDeExemplo>>();

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

function obtémConfiguraçõesDoDocumento(recurso: string): Thenable<ConfiguraçõesDeExemplo> {
  if (!possuiCapacidadeDeConfiguração) {
    return Promise.resolve(configuraçõesGlobais);
  }
  let resultado = configuraçõesDoDocumento.get(recurso);
  if (!resultado) {
    resultado = conexão.workspace.getConfiguration({
      scopeUri: recurso,
      section: 'languageServerExample' 
      // Nome da seção de configuração no cliente (ex.: ..\client\package.json)
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
    // Quando não conhecemos o documento. Podemos tentar lê-lo do disco
    // ou não relatar problemas para ele.
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

function analisarLexico(texto: string): Diagnóstico[] {

  if( !texto || texto.length === 0) {
    return []; // Retorna um array vazio se o texto estiver vazio
  };

  // Simula a análise léxica e retorna erros lexicos
  const errosLexicos: Diagnóstico[] = [];

  return errosLexicos;
  // Aqui você implementaria a lógica de análise léxica real.
  // Por exemplo, você poderia usar uma biblioteca de análise léxica
  // para identificar tokens inválidos, palavras-chave desconhecidas, etc.
  // Os erros lexicos devem ser retornados como um array de Diagnóstico.
}

function tentarParsear(texto: string): { válida: boolean; erros: Diagnóstico[] } {
  if( !texto || texto.length === 0) {
    return { válida: false, erros: [] }; // Retorna inválido se o texto estiver vazio
  };
  // Simula a análise sintática e retorna erros sintáticos
  const errosSintaticos: Diagnóstico[] = [];
  // Aqui você implementaria a lógica de análise sintática real.
  // Por exemplo, você poderia usar uma biblioteca de análise sintática
  // para construir uma árvore de sintaxe abstrata (AST) e identificar erros.
  // Os erros sintáticos devem ser retornados como um array de Diagnóstico.
  return {
    válida: errosSintaticos.length === 0,
    erros: errosSintaticos
  };
}

function analisarSemantica(arvore: { válida: boolean; erros: Diagnóstico[] }): Diagnóstico[] {
  if (!arvore) {
    return []; // Retorna um array vazio se a árvore não for válida
  };

  // Simula a análise semântica e retorna erros semânticos
  const errosSemanticos: Diagnóstico[] = [];
  // Aqui você implementaria a lógica de análise semântica real.
  // Por exemplo, você poderia verificar tipos, escopos, variáveis não declaradas
  // e outros aspectos semânticos do código.
  // Os erros semânticos devem ser retornados como um array de Diagnóstico.
  return errosSemanticos;
}

function verificarBoasPraticas(arvore: { válida: boolean; erros: Diagnóstico[] }): Diagnóstico[] {
  if (!arvore || !arvore.válida) {
    return []; // Retorna um array vazio se a árvore não for válida
  };

  // Simula a verificação de boas práticas e retorna avisos
  const avisos: Diagnóstico[] = [];
  // Aqui você implementaria a lógica de verificação de boas práticas real.
  // Por exemplo, você poderia verificar se o código segue convenções de estilo,
  // se há código morto, se as variáveis são usadas corretamente, etc.
  // Os avisos devem ser retornados como um array de Diagnóstico.
  return avisos;
}

conexão.onDocumentSymbol(
  (parâmetros) => {
    if (!parâmetros.textDocument.uri)  {
      return []; // Retorna um array vazio se o documento não existir
    }
    // Retorne um array vazio ou implemente a lógica de símbolos conforme sua linguagem
    return [];
  }
);


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


conexão.onDidChangeWatchedFiles(_change => {
  // Monitored files have change in VSCode
  conexão.console.log('Recebido evento de alteração de arquivos.');
});

// This handler provides the initial list of the completion items.
conexão.onCompletion(
  (_textDocumentPosition: ParâmetrosDePosiçãoDoDocumento): ItemDeConclusão[] => {
    // The pass parameter contains the position of the text document in
    // which code complete got requested. For the example we ignore this
    // info and always provide the same completion items.
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

// This handler resolves additional information for the item selected in
// the completion list.
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

// Handler para Goto Definition
/*(_params: ParametrosDeDefinicao): Localizacao[] => {
    // Retorna uma localização simulada (sempre aponta para o início do documento)
    return [{
      uri: _params.textDocument.uri,
      range: {
        start: { line: 0, character: 0 },
        end: { line: 0, character: 10 }
      }
    }];
  }*/


conexão.onRequest('selecaoTexto', (
  parâmetros: { 
    uri: string, 
    range: Intervalo, 
    texto: string 
  }) => {
      conexão.console.log(`Texto recebido: "${parâmetros.texto}"`);
      return `O servidor recebeu ${parâmetros.texto.length} caracteres`;
});



const palavrasContexto = [
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

const conjuntoDePalavrasContexto = new Set(palavrasContexto.map(palavra => palavra.toLowerCase()));

const listaDeArtigos = new Set([
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

// Função auxiliar para extrair a palavra anterior ao índice
function extraiPalavraAnterior(linha: string, indice: number): string {
  // o índice corresponde ao caractere atual, então precisamos olhar para trás
  if (indice <= 0) { // Se o índice for menor ou igual a zero, então não há palavra anterior
    return '';  
  }
  const antes = linha.slice(0, indice).trimEnd(); 
  // Corta a linha desde o início até o caractere atual, removendo espaços e quebras de linha do final

  const partes = antes.split(/\s+/); 
  // Divide a string em partes usando espaços em branco como delimitadores
  
  if (partes.length > 0) {
    // Retorna a última parte, que é a palavra anterior
    return partes[partes.length - 1].toLowerCase(); 
  }
  // Se não houver partes, retorna uma string vazia
  else {
    return '';
  }
  
  //return partes.length > 0 ? partes[partes.length - 1].toLowerCase() : '';
}

// Função auxiliar para extrair a próxima palavra a partir do índice
function extraiPalavraPosterior(linha: string, indice: number): string {
  // o índice corresponde ao caractere atual, então precisamos olhar para trás
  if (indice <= 0) { // Se o índice for menor ou igual a zero, então não há palavra anterior
    return '';  
  }
  const depois = linha.slice(indice).trimStart();
  // Corta a linha desde o caractere atual até o final, removendo espaços e quebras de linha
  
  
  const partes = depois.split(/\s+/);
  // Divide a string em partes usando espaços em branco como delimitadores

  if (partes.length > 0) {
    // Retorna a primeira parte, que é a próxima palavra
    return partes[0].toLowerCase();
  }
  // Se não houver partes, retorna uma string vazia
  else {
    return '';
  }
  //return partes.length > 0 ? partes[0].toLowerCase() : '';
}


function obtémPalavraSobCursor(linha: string, posicao: number): string {
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

function recuaAtéEncontrarArtigoInicial(linhaAtual: string, posiçãoAtual: number): number {
  while (posiçãoAtual > 0) { // Enquanto estivermos na linha atual
    const artigoMaisPróximo = extraiPalavraAnterior(linhaAtual, posiçãoAtual); // Extrai a palavra anterior à palavra atual
    if (listaDeArtigos.has(artigoMaisPróximo)) { // Verifica se a palavra anterior é um artigo
      const índiceDoArtigo = linhaAtual.lastIndexOf(artigoMaisPróximo, posiçãoAtual - 1); // Encontra o índice do artigo na linha atual
      if (índiceDoArtigo !== -1 && (índiceDoArtigo === 0 || /\s/.test(linhaAtual[índiceDoArtigo - 1]))) { 
				// Verifica se o artigo está no início da linha ou precedido por um espaço
        return índiceDoArtigo + artigoMaisPróximo.length; // Ajusta o início para o final do artigo
      }
    }
    posiçãoAtual--;
  }
  return posiçãoAtual;
}

function avançaProFimDoTermoAtual(linhaAtual: string, posiçãoAtual: number): number {
  while (posiçãoAtual < linhaAtual.length) { // Enquanto estivermos na linha atual
    const próximoTermo = extraiPalavraPosterior(linhaAtual, posiçãoAtual);
    if (conjuntoDePalavrasContexto.has(próximoTermo)) {
      const índiceDoÚltimoTermo = linhaAtual.indexOf(próximoTermo, posiçãoAtual);
      if (
        índiceDoÚltimoTermo !== -1 &&
        (índiceDoÚltimoTermo + próximoTermo.length === linhaAtual.length || /\s/.test(linhaAtual[índiceDoÚltimoTermo + próximoTermo.length]))
      ) {
        return índiceDoÚltimoTermo - (próximoTermo.length + 1);
      }
    }
    posiçãoAtual++;
  }
  return posiçãoAtual;
}

function encontrarDefinicaoNasLinhas(
  linhas: string[], regexDefinicao: RegExp,
  palavra: string, palavraCompleta: string,
  parâmetros: ParametrosDeDefinição): Localização[] 
{
  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i];
    if (linha.includes(',') || linha.includes(';') || linha.includes(':')) continue;
    const resultado = regexDefinicao.exec(linha);
    if (resultado) {
      const nomeVariavel = resultado[2].trim();
      const tipoBase = resultado[5].trim();
      const palavrasVariavel = nomeVariavel.split(/\s+/);
      if (
        palavraCompleta === nomeVariavel ||
        palavrasVariavel.includes(palavra) ||
        tipoBase === palavra ||
        palavraCompleta === tipoBase
      ) {
        const idx = linha.indexOf(palavraCompleta !== '' ? palavraCompleta : palavra);
        if (idx !== -1) {
          return [{
            uri: parâmetros.textDocument.uri,
            range: {
              start: { line: i, character: idx },
              end: { line: i, character: idx + (palavraCompleta !== '' ? palavraCompleta.length : palavra.length) }
            }
          }];
        }
      }
    }
  }
  return [];
}

conexão.onDefinition((parâmetros: ParametrosDeDefinição): Localização[] => {
  console.log(`Parâmetros de definição recebidos: ${JSON.stringify(parâmetros)}`);
  const documento = documentos.get(parâmetros.textDocument.uri);
  if (!documento) {return [];}
  const texto = documento.getText();
  const posição = parâmetros.position;
  const linhas = texto.split(/\r?\n/g);
  // Extrai a palavra sob o cursor
  const linhaAtual = linhas[posição.line];
  if (!linhaAtual) {return [];} 
  
  let palavra = obtémPalavraSobCursor(linhaAtual, posição.character); // OK
  if (!palavra) {return [];}
  console.log(`Palavra atual: "${palavra}"`);

  const posiçãoDaPalavra = linhaAtual.indexOf(palavra);
  let inicio = posiçãoDaPalavra;
  let fim = posiçãoDaPalavra + palavra.length;
  console.log(`Início: ${inicio}, Fim: ${fim}`);

  inicio = recuaAtéEncontrarArtigoInicial(linhaAtual, inicio);
  fim = avançaProFimDoTermoAtual(linhaAtual, fim);

  const palavraCompleta = linhaAtual.substring(inicio, fim).trim();
  console.log(`Palavra completa: "${palavraCompleta}"`);

  // Regex para definição exata conforme solicitado
  //const regexDefinicao = /^(A|O|As|Os|Um|Uma|Uns|Umas)\s+([\w\s]+)\s+(é|são)\s+(um|uma|uns|umas)\s+([\w\s]+)(\.|com)$/;
	const regexDefinicao = /^(A|O|As|Os|Um|Uma|Uns|Umas)\s+([\wÀ-ÿ\s\-]+?)\s+(é|são)\s+(um|uma|uns|umas)\s+([\wÀ-ÿ\s\-]+)(\.| com)?$/i;
	const regexDefinicaoTipo = /^(Um|Uma|Uns|Umas)\s+([\wÀ-ÿ\s\-]+)\s+é\s+(um|uma|uns|umas)\s+([\wÀ-ÿ\s\-]+)\.$/i;

	// Uma string denominada abc,

  const localizacao = encontrarDefinicaoNasLinhas(linhas, regexDefinicao, palavra, palavraCompleta, parâmetros);
  if (localizacao.length > 0) {return localizacao;}  
  else{return [];}
  }
);


function avançaAtéVerboSer(linhaAtual: string, posiçãoAtual: number): number {
  const regexVerbo = /\b(é|são)\b/gi;
  let correspondencia;
  while ((correspondencia = regexVerbo.exec(linhaAtual)) !== null) {
    if (correspondencia.index >= posiçãoAtual) {
      return correspondencia.index;
    }
  }
  // Se não encontrar, vai até o fim da linha
  return linhaAtual.length;
}


function encontrarUltimoDelimitadorAntes(texto: string, deslocamento: number, delimitadores: string[]): number {
  let posição = -1;
  for (const delimitador of delimitadores) {
    console.log(`Procurando delimitador: "${delimitador}"`);
    const expressão_regular = new RegExp(`\\b${delimitador}\\b`, "g");
    let correspondência: RegExpExecArray | null;
    while ((correspondência = expressão_regular.exec(texto)) !== null) {
      if (correspondência.index < deslocamento && correspondência.index > posição) {
        posição = correspondência.index + delimitador.length;
        console.log(`Delimitador "${delimitador}" encontrado na posição ${correspondência.index}, atualizando posição para ${posição}`);
      }
      else {
        console.log(`Delimitador "${delimitador}" encontrado, mas fora do intervalo (posição: ${correspondência.index}, deslocamento: ${deslocamento}, posição atual: ${posição})`);
      }
      //console.log(`Delimitador encontrado: "${delimitador}" na posição ${correspondência.index}`);
    }
    console.log('Delimitador não encontrado nesta iteração.');
  }
  return posição;
}

function encontrarPrimeiroDelimitadorDepois(texto: string, deslocamento: number, delimitadores: string[]): number {
  let posição = texto.length;
  for (const delimitador of delimitadores) {
    const expressão_regular = new RegExp(`\\b${delimitador}\\b`, "g");
    let correspondência: RegExpExecArray | null;
    while ((correspondência = expressão_regular.exec(texto)) !== null) {
      if (correspondência.index > deslocamento && correspondência.index < posição) {
        posição = correspondência.index;
      }
    }
  }
  return posição;
}

function extrairEntreDelimitadoresRegex(
  texto: string,
  deslocamento: number,
  delimitadores: string[]
): string {
  // Último delimitador antes do cursor
  let início = -1; // Posição do último delimitador antes do cursor. 
  // O valor -1 indica que não foi encontrado nenhum delimitador antes do cursor

  for (const delimitador of delimitadores) { // Para cada delimitador presente na lista de delimitadores
    const expressão_regular = new RegExp(`\\b${delimitador}\\b`, "g"); // Cria uma expressão regular para encontrar o delimitador
    let correspondência: RegExpExecArray | null; // Variável para armazenar a correspondência da regex
    while ((correspondência = expressão_regular.exec(texto)) !== null) { // Enquanto houver correspondências
      if (correspondência.index < deslocamento && correspondência.index > início) {
      // se a correspondência estiver antes do deslocamento e for a correspondência mais próxima do deslocamento
        início = correspondência.index + delimitador.length;
        // Atualiza a posição do início para o final do delimitador encontrado
        console.log(`Delimitador encontrado antes: "${delimitador}" na posição ${início}`); // Log para depuração
      }
    }
  }

  // Primeiro delimitador depois
  let fim = texto.length;
  for (const delimitador of delimitadores) {
    const expressão_regular = new RegExp(`\\b${delimitador}\\b`, "g");
    let correspondência: RegExpExecArray | null;
    while ((correspondência = expressão_regular.exec(texto)) !== null) {
      if (correspondência.index > deslocamento && correspondência.index < fim) {
        fim = correspondência.index;
        console.log(`Delimitador encontrado depois: "${delimitador}" na posição ${fim}`); // Log para depuração
      }
    }
  }
  let resultado = '';
  if(início === -1 && fim === texto.length) {
    console.log(`Nenhum delimitador encontrado. Retornando texto completo.`);
    resultado = texto.trim();
  }
  else{
    console.log(`Início: ${início}, Fim: ${fim}`);
    resultado = texto.substring(início, fim).trim();
  }
  return  resultado;
}

function extrairEntreDelimitadoresTokenizado(
  texto: string,
  deslocamento: number,
  delimitadores: string[]
): string {
  // Regex básica para tokens (identificadores ou palavras-chave)
  const regexTokens = /[a-zA-Z_][a-zA-Z0-9_]*/g;
  let tokens: {valor: string; início: number; fim: number }[] = [];

  // Tokeniza o texto
  let correspondência: RegExpExecArray | null;
  while ((correspondência = regexTokens.exec(texto)) !== null) {
    tokens.push({
      valor: correspondência[0],
      início: correspondência.index,
      fim: correspondência.index + correspondência[0].length
    });
  }

  // Encontra o token em que o cursor está
  const tokenAtual = tokens.find(
    t => t.início <= deslocamento && deslocamento <= t.fim
  );

  // Agora procura delimitadores
  let inicio = 0;
  let fim = texto.length;

  // Último delimitador antes
  for (const token of tokens) {
    if (delimitadores.includes(token.valor) && token.fim <= deslocamento) {
      inicio = Math.max(inicio, token.fim);
    }
  }

  // Primeiro delimitador depois
  for (const token of tokens) {
    if (delimitadores.includes(token.valor) && token.início >= deslocamento) {
      fim = Math.min(fim, token.início);
    }
  }

  return texto.substring(inicio, fim).trim();
}


function recuaParaAPalavraAnterior(linha: string, índiceAtual: number): string {
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

function avançaParaAPalavraSeguinte(linha: string, índiceAtual: number): string {
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

function obterLinhaSeguinte(linhaAtual: string): string {
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

function obterLinhaAnterior(linhaAtual: string): string {
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

function encontraFimDoTermo(linhaAtual: string, posiçãoAtual: number): string {
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

function encontraInícioDoTermo(linhaAtual: string, posiçãoAtual: number): string {
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


// Make the text document manager listen on the connection
// for open, change and close text document events
documentos.listen(conexão);

// Listen on the connection
conexão.listen();

