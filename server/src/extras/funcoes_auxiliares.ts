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
  // Corta a linha desde o caractere atual até o final, removendo espaços e quebras de linha do início
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