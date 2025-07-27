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




// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const conexão = CriarConexão(RecursosPropostos.all);

// Create a simple text document manager.
const documentos = new DocumentosDeTexto(DocumentoDeTexto);

let possuiCapacidadeDeConfiguração = false;
let possuiCapacidadeDeEspaçoDeTrabalho = false;
let possuiCapacidadedeInformaçõesDeDiagnósticoRelacionadas = false;

conexão.onInitialize((parâmetros: InicializarParâmetros) => {
  const capacidades = parâmetros.capabilities;

  // Verifica se o cliente suporta as capacidades de configuração e espaço de trabalho.
  // Isso é importante para saber se o servidor pode registrar notificações de mudança de configuração e eventos de espaço de trabalho.
  possuiCapacidadeDeConfiguração = !!(capacidades.workspace && !!capacidades.workspace.configuration);
  possuiCapacidadeDeEspaçoDeTrabalho = !!(capacidades.workspace && !!capacidades.workspace.workspaceFolders);
  possuiCapacidadedeInformaçõesDeDiagnósticoRelacionadas = !!(
    capacidades.textDocument && capacidades.textDocument.publishDiagnostics &&
    capacidades.textDocument.publishDiagnostics.relatedInformation
  );
  // Se o cliente não suporta as capacidades de configuração e espaço de trabalho, o servidor usará configurações globais padrão.

  const resultado: ResultadoDeInicialização = {
    capabilities: {
      textDocumentSync: TipoDeSincronizaçãoDoDocumento.Incremental,
      // Tell the client that this server supports code completion.
      completionProvider: {resolveProvider: true},
      diagnosticProvider: {interFileDependencies: false,workspaceDiagnostics: false},
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
  if (possuiCapacidadeDeEspaçoDeTrabalho){resultado.capabilities.workspace = {workspaceFolders: {supported: true}};}
  return resultado;
});

conexão.onInitialized(() => {
  conexão.console.log('Servidor inicializado com sucesso.');
  if (possuiCapacidadeDeConfiguração) {conexão.client.register(NotificaçãoDeMudançaDeConfiguração.type, undefined);}
  if (possuiCapacidadeDeEspaçoDeTrabalho) {
    conexão.workspace.onDidChangeWorkspaceFolders(_event => {
      conexão.console.log('Recebido evento de alteração para Espaço de Trabalho.');
    });
  }
});

// The example settings
interface ExampleSettings {
  maxNumberOfProblems: number;
}

// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const configuraçõesPadrão: ExampleSettings = { maxNumberOfProblems: 1000 };
let configuraçõesGlobais: ExampleSettings = configuraçõesPadrão;

// Cache the settings of all open documents
const configuraçõesDoDocumento = new Map<string, Thenable<ExampleSettings>>();

conexão.onDidChangeConfiguration(alteração => {
  if (possuiCapacidadeDeConfiguração) {
    // Reset all cached document settings
    configuraçõesDoDocumento.clear();
  } else {
    configuraçõesGlobais = (
      (alteração.settings.languageServerExample || configuraçõesPadrão)
    );
  }
  // Refresh the diagnostics since the `maxNumberOfProblems` could have changed.
  // We could optimize things here and re-fetch the setting first can compare it
  // to the existing setting, but this is out of scope for this example.
  conexão.languages.diagnostics.refresh();
});

function obtémConfiguraçõesDoDocumento(recurso: string): Thenable<ExampleSettings> {
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

// Only keep settings for open documents
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
    // We don't know the document. We can either try to read it from disk
    // or we don't report problems for it.
    return {
      kind: TipoDeRelatórioDeDiagnósticoDoDocumento.Full,
      items: []
    } satisfies RelatórioDeDiagnósticoDoDocumento;
  }
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
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
  const diagnósticos: Diagnóstico[] = [];   
  /*

  // No momento apenas um template, falta definir o que é um documento válido.
  // 1. Etapa léxica
  const texto = documentoDeTexto.getText();
  const errosLexicos = analisarLexico(texto);

	let diagnóstico: Diagnóstico = {
      severity: SeveridadeDoDiagnóstico.Warning,
      range: {
        start: documentoDeTexto.positionAt(0),
        end: documentoDeTexto.positionAt(-1)
      },
      message: "Este é um exemplo de diagnóstico.",
      source: 'ex'
    };

  // Send the computed diagnostics to VS Code.
  //conexão.sendDiagnostics({ uri: documentoDeTexto.uri, diagnostics });

	

  diagnósticos.push(...errosLexicos);

  // 2. Etapa sintática
  const arvore = tentarParsear(texto);
  if (!arvore.válida) {
    diagnósticos.push(...arvore.erros);
    return diagnósticos; // não continua se a sintaxe estiver errada
  }

  // 3. Etapa semântica
  const errosSemanticos = analisarSemantica(arvore);
  diagnósticos.push(...errosSemanticos);

  // 4. Avisos e boas práticas
  const avisos = verificarBoasPraticas(arvore);
  diagnósticos.push(...avisos);

  

	*/
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

function ObtémTextoSelecionado(): string {
  // Obtém o texto selecionado no editor

  

  return ''; // Retorna o texto selecionado
}

const palavrasContexto = [
  'a', 'o', 'as', 'os', 'um', 'uma', 'uns', 'umas',
  'se', 'itere', 'pare', 'retorne', 'no', 'na', 'nos', 'nas',
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
  'segundo', 'acordo', 'sem', 'então', 'sobre', 'usando', 'versus', 'enquanto',
  'aproximadamente', 'através', 'algum', 'referente', 'pertencente', 'pertinente',
  'relativo', 'relativa', 'concernente', 'atinente', 'começando', 'iniciando',
  'orientada', 'orientado', 'orientando', 'orientando-se', 'voltada', 'voltado',
  'virada', 'virado', 'virando', 'virando-se', 'tão', 'tanto', 'quanto', 'quão',
  'qual', 'regressivamente', 'dentro', 'parecida', 'parecido', 'semelhante',
  'similar', 'só', 'somente', 'unicamente', 'exclusivamente', 'apenas', 'fora',
  'menores', 'alta', 'alto', 'comprido', 'comprida', 'largo', 'larga',
  'chamado', 'chamados', 'chamada', 'chamadas', 'denominado', 'denominados',
  'denominada', 'denominadas', 'e', 'ou', 'nem'
];

const conjuntoDePalavrasContexto = new Set(palavrasContexto.map(palavra => palavra.toLowerCase()));

const listaDeArtigos = new Set([
  'a', 'o', 'as', 'os', 
  'um', 'uma', 'uns', 'umas',
  'ao', 'aos', 'à', 'às', 
  'num', 'nuns', 'numa', 'numas',
  'no', 'na', 'nos', 'nas',
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
  while (posiçãoAtual > 0) {
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
  while (posiçãoAtual < linhaAtual.length) {
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
  linhas: string[],
  regexDefinicao: RegExp,
  palavra: string,
  palavraCompleta: string,
  parâmetros: ParametrosDeDefinição
): Localização[] {
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
  
  let palavra = obtémPalavraSobCursor(linhaAtual, posição.character);
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
  const regexDefinicao = /^(A|O|As|Os|Um|Uma|Uns|Umas)\s+([\w\s]+)\s+(é|são)\s+(um|uma|uns|umas)\s+([\w\s]+)\.$/;

  const localizacao = encontrarDefinicaoNasLinhas(linhas, regexDefinicao, palavra, palavraCompleta, parâmetros);
  if (localizacao.length > 0) {return localizacao;}  
  else{return [];}
  }
);





/*
conexão.onDefinition(  
   (parâmetros: ParametrosDeDefinicao): Localizacao[] => {
  const documento = documentos.get(parâmetros.textDocument.uri);
  if (!documento) {
    return []; // Retorna um array vazio se o documento não for encontrado
  }
  const posição = parâmetros.position;
  const texto = documento.getText();
  const linhas = texto.split(/\r?\n/g);
  if (linhas.length === 0) {
    return []; // Retorna um array vazio se não houver linhas
  }
  // Obtém todo o conteúdo da linha atual
  const linhaAtual = linhas[posição.line];
  if (!linhaAtual) {
    return []; // Retorna um array vazio se a linha atual não existir
  }

  
  


  
  // Divide a linha em palavras, removendo espaços em branco e sinais de pontuação
  let conjuntoDePalavras = linhaAtual.toLowerCase().split(/[\s.,!?;:"'()]+/).filter(Boolean);

  //conjuntoDePalavras = conjuntoDePalavras.filter(palavra => palavra.length > 0); // Remove palavras vazias
  //conjuntoDePalavras = conjuntoDePalavras.map(palavra => palavra.trim()); // Remove espaços em branco
  // Remove o artigo inicial da linha, se houver
  const palavrasIndesejadas = new Set([
    'a', 'o', 'as', 'os', 'um', 'uma', 'uns', 'umas',
    'se', 'itere', 'pare', 'retorne',
    'no', 'na', 'nos', 'nas', 'ao', 'aos', 'à', 'às',
    'num', 'nuns', 'numa', 'numas']);
  
  indicePalavraIndesejada =conjuntoDePalavras.findIndex(palavra =>
      palavrasIndesejadas.has(palavra)
  );

  // remove os itens indesejados do início do conjunto de palavras
  if (indicePalavraIndesejada !== -1) {
    conjuntoDePalavras = conjuntoDePalavras.slice(indicePalavraIndesejada + 1);
  }*/

  /*
  while(conjuntoDePalavras.length > 0 && palavrasIndesejadas.has(conjuntoDePalavras[0])) {
      conjuntoDePalavras.shift(); // Remove o primeiro elemento se for um artigo
  }*/

/*
  const palavrasChave = new Set([
  'não', 'desse', 'desses', 'deste', 'destes', 'dessa', 'dessas',
  'desta', 'destas', 'cabe', 'couber', 'começa', 'começar', 'conter',
  'contiver', 'contém', 'deve', 'devem', 'deveria', 'deveriam',
  'estamos', 'estar', 'estará', 'estarão', 'estava', 'estavam',
  'estiver', 'estiverem', 'está', 'estão', 'excede', 'excedem',
  'existe', 'existem', 'existir', 'finaliza', 'finalizar', 'é', 'foi',
  'for', 'foram', 'forem', 'há', 'houver', 'inicia', 'iniciar',
  'necessita', 'necessitar', 'parece', 'pode', 'podem', 'podemos',
  'poderia', 'possuem', 'possui', 'possuir', 'puder', 'puderem',
  'requer', 'ser', 'será', 'serão', 'supera', 'superam', 'superar',
  'são', 'tem', 'ter', 'termina', 'terminar', 'tiver', 'têm',
  'mais' , 'menos' , 'vezes' , 'multiplicado' , 'dividido',
  'junto', 'seguido', 'partir', 'partindo', 'abaixo',  'ante', 
  'perante', 'antes', 'debaixo', 'sob', 'acerca', 'cerca', 
  'cuja', 'cujo', 'cujas', 'cujos', 'próximo', 'perto', 'com', 
  'tal', 'como', 'contra', 'dada', 'dado', 'dando', 'gerando', 
  'resultando', 'retornando', 'desde', 'depois', 'após', 'durante',
  'em', 'entre', 'dentre', 'até', 'mediante', 'para', 'via', 'segundo', 
  'acordo', 'sem', 'então', 'sobre', 'usando', 'versus', 'enquanto',
  'aproximadamente', 'através', 'algum', 'sob', 'debaixo', 
  'entre', 'por', 'usando', 'referente', 'pertencente', 
  'pertinente', 'relativo', 'relativa', 'concernente', 
  'atinente', 'pertinente', 'retornando', 'começando', 
  'começando', 'iniciando', 'usando', 'via', 'com', 'aproada', 
  'aproado', 'aproando', 'orientada', 'orientado', 'orientando', 
  'orientando-se', 'voltada', 'voltado', 'virada', 'virado', 'virando', 
  'virando-se', 'tão', 'tanto', 'quanto', 'quão', 'qual', 
  'regressivamente', 'dentro', 'parecida', 'parecido', 'semelhante', 
  'similar', 'só', 'somente', 'unicamente', 'exclusivamente', 'apenas', 
  'fora', 'menores', 'alta', 'alto', 'comprido', 'comprida', 'largo', 'larga', 
  'chamado', 'chamados', 'chamada', 'chamadas',
  'denominado', 'denominados', 'denominada', 'denominadas',
  'e', 'ou', 'nem'

  ]);

  const indicePalavraChave = conjuntoDePalavras.findIndex(palavra =>
      palavrasChave.has(palavra)
  );

  if (indicePalavraChave !== -1) {
    conjuntoDePalavras = conjuntoDePalavras.slice(0, indicePalavraChave);
    // Remove as palavras-chave indesejadas do final do conjunto de palavras
  }

  //console.log(`Conjunto de palavras: ${conjuntoDePalavras}`); // Log para depuração
  const termoSelecionado = conjuntoDePalavras.join(' ');
  console.log(`Termo atual: "${termoSelecionado}"`); // Log para depuração


  //console.log(`Linha atual: "${linhaAtual}"`); // Log para depuração

  

  //return []; // Retorna a localização da linha atual
  
  
  const regexPalavra = /\w+/g; 
  // Regex para capturar palavras. 
  // \w+ captura uma sequência de caracteres alfanuméricos (incluindo _).
  // O /g permite capturar todas as ocorrências na linha.
  let correspondência: RegExpExecArray | null; 
  let palavra = '';
  while ((correspondência = regexPalavra.exec(termoSelecionado))) {
    if (correspondência.index <= posição.character && regexPalavra.lastIndex >= posição.character) {
        palavra = correspondência[0];
        break;
      }
    }
    if (!palavra) return [];

    // Regex para definição exata conforme solicitado
    // Exemplo: "A idade do usuário é um inteiro."
    //      "O nome do usuário é uma string."
    //      "As aspas duplas são um caractere."
    const regexDefinicao = /^(A|O|As|Os|Um|Uma|Uns|Umas)\s+([\w\s]+)\s+(é|são)\s+(um|uma|uns|umas)\s+([\w\s]+)\.$/;
    //const regexDefinicao = /^(A|O|As|Os|Um|Uma|Uns|Umas)[\s\S]+?(é|são)[\s\S]+?(um|uma|uns|umas)[\s\S]+?\.$/m;
    // Regex para capturar definições de variáveis
    // ^(A|O|As|Os|Um|Uma|Uns|Umas) captura o artigo inicial
    // \s+([\w\s]+) captura o nome da variável (permitindo espaços)
    // \s+(é|são) captura o verbo de ligação
    // \s+(um|uma|uns|umas) captura o artigo do tipo
    // \s+([\w\s]+) captura o tipo base (permitindo espaços)
    // \.$ captura o ponto final da frase. O cifrão $ garante que a frase termina com um ponto.

    for (let i = 0; i < linhas.length; i++) {
      const linha = linhas[i];
      // Garante que não há vírgula, ponto e vírgula ou dois pontos
      if (linha.includes(',') || linha.includes(';') || linha.includes(':')) continue;

      const resultado = regexDefinicao.exec(linha);
      if (resultado) {
        // resultado[2] é o nome da variável
        // resultado[5] é o tipo base
        // Verifica se a palavra sob o cursor corresponde ao nome da variável
        // ou ao tipo base
        const nomeVariavel = resultado[2].trim();
        const tipoBase = resultado[5].trim();
        // Divide nomeVariavel em palavras para permitir match em qualquer uma delas
        const palavrasVariavel = nomeVariavel.split(/\s+/);
        if (palavrasVariavel.includes(palavra) || tipoBase === palavra) {
          // Retorna a posição da palavra na linha
          const idx = linha.indexOf(palavra);
          if (idx !== -1) {
            return [{
              uri: parâmetros.textDocument.uri,
              range: {
                start: { line: i, character: idx },
                end: { line: i, character: idx + palavra.length }
              }
            }];
          }
        }
      }
    }
    //console.log(Localizacao);
    return [];
  }
);



conexão.onDefinition(
  (params: ParametrosDeDefinicao): Localizacao[] => {
    const documento = documentos.get(params.textDocument.uri);
    if (!documento) return [];

    const posição = params.position;
    const texto = documento.getText();
    const linhas = texto.split(/\r?\n/g);

    // Determina o intervalo de seleção
    // Se não houver seleção, início e fim são iguais à posição do cursor
    const selectionStart = (params as any).selection && (params as any).selection.start
      ? (params as any).selection.start
      : posição;
    const selectionEnd = (params as any).selection && (params as any).selection.end
      ? (params as any).selection.end
      : posição;

    const linhaAtual = linhas[selectionStart.line];
    if (!linhaAtual) return [];

    const regexPalavra = /\w+/g;
    let correspondência: RegExpExecArray | null;
    let palavrasSelecionadas: string[] = [];

    // Percorre todas as palavras da linha e seleciona as que estão dentro do intervalo da seleção
    while ((correspondência = regexPalavra.exec(linhaAtual))) {
      const inicioPalavra = correspondência.index;
      const fimPalavra = regexPalavra.lastIndex;
      // Verifica se a palavra se sobrepõe ao intervalo da seleção
      if (
        fimPalavra > selectionStart.character &&
        inicioPalavra < selectionEnd.character
      ) {
        palavrasSelecionadas.push(correspondência[0]);
      }
    }

    if (palavrasSelecionadas.length === 0) return [];

    // Regex para definição exata conforme solicitado
    const regexDefinicao = /^(A|O|As|Os|Um|Uma|Uns|Umas)\s+([\w\s]+)\s+(é|são)\s+(um|uma|uns|umas)\s+([\w\s]+)\.$/;

    const localizacoes: Localizacao[] = [];

    for (let i = 0; i < linhas.length; i++) {
      const linha = linhas[i];
      // Garante que não há vírgula, ponto e vírgula ou dois pontos
      if (linha.includes(',') || linha.includes(';') || linha.includes(':')) continue;

      const resultado = regexDefinicao.exec(linha);
      if (resultado) {
        const nomeVariavel = resultado[2].trim();
        const tipoBase = resultado[5].trim();
        const palavrasVariavel = nomeVariavel.split(/\s+/);

        for (const palavra of palavrasSelecionadas) {
          if (palavrasVariavel.includes(palavra) || tipoBase === palavra) {
            const idx = linha.indexOf(palavra);
            if (idx !== -1) {
              localizacoes.push({
                uri: params.textDocument.uri,
                range: {
                  start: { line: i, character: idx },
                  end: { line: i, character: idx + palavra.length }
                }
              });
            }
          }
        }
      }
    }

    return localizacoes;
  }
);

*/


// Handler para Goto Type Definition
conexão.onTypeDefinition(
  (_params: ParametrosDeDefiniçãoDeTipo): Localização[] => {
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
