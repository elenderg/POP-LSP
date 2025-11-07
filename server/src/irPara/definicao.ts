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

import * as servidor from '../server';

import {
  obterPalavraSobCursor,
  escanearSímbolosProjeto
} from './utils';

import {
  cacheSímbolos,
  parsearSímbolosArquivo,
  encontrarDefiniçãoCache
} from './symbols';

import {
  éPalavraChave,
  éNomeSímboloVálido,
  identificarTipoDeclaração,
  extrairNomeSímbolo
} from './keywords';

/**
 * Padrões regex para detectar diferentes tipos de definições em Português Puro
 */
const padrõesDefinição = {
  // Declaração de variável global: "A cor é uma string."
  variávelGlobal: /^(?:O|A|Os|As)\s+(.+?)\s+(?:é|são)\s+(?:um|uma|uns|umas)\s+(.+?)(?=\.|$)/,

  // Declaração de variável global com inicialização: "A cor é uma string igual a 'azul'."
  variávelGlobalInicializada: /^(?:O|A|Os|As)\s+(.+?)\s+(?:é|são)\s+(?:um|uma|uns|umas)\s+(.+?)\s+(?:igual a|igual)\s+(.+?)(?=\.|$)/,

  // Declaração de tipo: "Uma string é uma estrutura."
  tipo: /^(?:Um|Uma|Uns|Umas)\s+(.+?)\s+(?:é|são)\s+(?:um|uma|uns|umas)\s+(.+?)(?=\.|$)/,

  // Declaração de rotina: "Rotina para que se..."
  rotina: /(?:Rotina|rotina)\s+(?:para\s+que\s+se\s+)?(.+?)(?=\:|\n)/,

  // Declaração de função: "Função para que se..."
  função: /(?:Função|função)\s+(?:para\s+que\s+se\s+(?:determine\s+se\s+)?)?(.+?)(?=\:|\n)/
};

/**
 * Função para buscar definições de símbolos no documento
 */
function buscarDefiniçãoLocal(termo: string, documento: DocumentoDeTexto): Localização | null {
  const textoCompleto = documento.getText();
  const linhas = textoCompleto.split(/\r?\n/);

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i].trim();

    // Verificar cada padrão de definição
    for (const [tipo, padrão] of Object.entries(padrõesDefinição)) {
      const correspondência = padrão.exec(linha);
      if (correspondência) {
        const nomeExtraído = extrairNomeSímbolo(correspondência[1] || correspondência[0]);

        if (nomeExtraído.toLowerCase().includes(termo.toLowerCase()) ||
            termo.toLowerCase().includes(nomeExtraído.toLowerCase())) {

          // Encontrar a posição do nome na linha
          const posiçãoNome = linha.toLowerCase().indexOf(nomeExtraído.toLowerCase());
          if (posiçãoNome !== -1) {
            const posiçãoInício = Posição.create(i, posiçãoNome);
            const posiçãoFim = Posição.create(i, posiçãoNome + nomeExtraído.length);
            const intervalo = Intervalo.create(posiçãoInício, posiçãoFim);

            console.log(`Definição encontrada (${tipo}): "${nomeExtraído}" na linha ${i + 1}`);
            return Localização.create(documento.uri, intervalo);
          }
        }
      }
    }
  }

  return null;
}

/**
 * Função principal para encontrar definições de símbolos
 */
function encontrarDefiniçãoSímbolo(termo: string, documento: DocumentoDeTexto): Localização | null {
  if (!termo || !documento) {
    return null;
  }

  // Verificar se é uma palavra-chave
  if (éPalavraChave(termo)) {
    console.log(`Termo "${termo}" é uma palavra-chave, ignorando...`);
    return null;
  }

  // Verificar se é um nome de símbolo válido
  if (!éNomeSímboloVálido(termo)) {
    console.log(`Termo "${termo}" não é um nome de símbolo válido...`);
    return null;
  }

  // Primeiro, buscar no cache de símbolos global
  const definiçãoCache = encontrarDefiniçãoCache(termo, documento.uri);
  if (definiçãoCache) {
    console.log(`Definição encontrada no cache: "${termo}"`);
    return Localização.create(definiçãoCache.caminhoArquivo, definiçãoCache.intervalo);
  }

  // Se não encontrou no cache, buscar localmente no documento atual
  const definiçãoLocal = buscarDefiniçãoLocal(termo, documento);
  if (definiçãoLocal) {
    console.log(`Definição encontrada localmente: "${termo}"`);
    return definiçãoLocal;
  }

  console.log(`Nenhuma definição encontrada para: "${termo}"`);
  return null;
}

/**
 * Handler LSP para funcionalidade "Ir Para Definição"
 */
export default servidor.conexão.onDefinition((_params: ParametrosDeDefinição): Localização[] | null | undefined => {
  const documento = servidor.documentos.get(_params.textDocument.uri);
  if (!documento) {
    return null;
  }

  try {
    // Extrair a palavra sob o cursor
    const linhaTexto = documento.getText(Intervalo.create(_params.position.line, 0, _params.position.line + 1, 0));
    const palavra = obterPalavraSobCursor(linhaTexto, _params.position.character);

    // Se não há palavra válida, retornar null
    if (!palavra || palavra.length === 0) {
      return null;
    }

    console.log(`Procurando definição para: "${palavra}"`);

    // Buscar definição
    const definição = encontrarDefiniçãoSímbolo(palavra, documento);

    if (definição) {
      return [definição];
    }

    return null;
  } catch (erro) {
    console.error('Erro no handler de definição:', erro);
    return null;
  }
});
