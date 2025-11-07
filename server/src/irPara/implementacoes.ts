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
  obterPalavraSobCursor
} from './utils';

import {
  encontrarDefiniçãoCache,
  cacheSímbolos
} from './symbols';

import {
  éPalavraChave,
  éNomeSímboloVálido,
  extrairNomeSímbolo
} from './keywords';

/**
 * Padrões específicos para detectar implementações (rotinas/funções) em Português Puro
 */
const padrõesImplementações = {
  // Declaração de rotina: "Rotina para que se adicione uma cor e um rótulo para um menu:"
  rotina: /(?:Rotina|rotina)\s+(?:para\s+que\s+se\s+)?(.+?)(?=\:|\n)/i,

  // Declaração de função: "Função para que se determine se um número é negativo:"
  função: /(?:Função|função)\s+(?:para\s+que\s+se\s+(?:determine\s+se\s+)?)?(.+?)(?=\:|\n)/i,

  // Padrão genérico para "para que se"
  genérico: /(?:para\s+que\s+se\s+)(.+?)(?=\:|\n)/i
};

/**
 * Função para buscar implementações (rotinas/funções) no documento
 */
function buscarImplementaçãoLocal(termo: string, documento: DocumentoDeTexto): Localização | null {
  const textoCompleto = documento.getText();
  const linhas = textoCompleto.split(/\r?\n/);

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i].trim();

    // Verificar cada padrão de implementação
    for (const [tipo, padrão] of Object.entries(padrõesImplementações)) {
      const correspondência = padrão.exec(linha);
      if (correspondência) {
        const nomeExtraído = extrairNomeSímbolo(correspondência[1]);

        if (nomeExtraído.toLowerCase().includes(termo.toLowerCase()) ||
            termo.toLowerCase().includes(nomeExtraído.toLowerCase())) {

          // Encontrar a posição do nome na linha
          const posiçãoNome = linha.toLowerCase().indexOf(nomeExtraído.toLowerCase());
          if (posiçãoNome !== -1) {
            const posiçãoInício = Posição.create(i, posiçãoNome);
            const posiçãoFim = Posição.create(i, posiçãoNome + nomeExtraído.length);
            const intervalo = Intervalo.create(posiçãoInício, posiçãoFim);

            console.log(`Implementação encontrada (${tipo}): "${nomeExtraído}" na linha ${i + 1}`);
            return Localização.create(documento.uri, intervalo);
          }
        }
      }
    }
  }

  return null;
}

/**
 * Função para verificar se um símbolo no cache é uma implementação (rotina/função)
 */
function éImplementaçãoNoCache(nomeSímbolo: string): boolean {
  const símbolos = cacheSímbolos.símbolos.get(nomeSímbolo);
  if (!símbolos) {
    return false;
  }

  return símbolos.some(símbolo => símbolo.tipo === 'rotina' || símbolo.tipo === 'função');
}

/**
 * Função principal para encontrar implementações
 */
function encontrarImplementação(termo: string, documento: DocumentoDeTexto): Localização | null {
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

  // Primeiro, buscar no cache de símbolos global (apenas rotinas/funções)
  const definiçãoCache = encontrarDefiniçãoCache(termo, documento.uri);
  if (definiçãoCache && (definiçãoCache.tipo === 'rotina' || definiçãoCache.tipo === 'função')) {
    console.log(`Implementação encontrada no cache: "${termo}"`);
    return Localização.create(definiçãoCache.caminhoArquivo, definiçãoCache.intervalo);
  }

  // Se não encontrou no cache, buscar localmente no documento atual
  const implementaçãoLocal = buscarImplementaçãoLocal(termo, documento);
  if (implementaçãoLocal) {
    console.log(`Implementação encontrada localmente: "${termo}"`);
    return implementaçãoLocal;
  }

  console.log(`Nenhuma implementação encontrada para: "${termo}"`);
  return null;
}

/**
 * Handler LSP para funcionalidade "Ir Para Implementação"
 */
export default servidor.conexão.onImplementation((_params: ParametrosDeImplementação): Localização[] | null | undefined => {
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

    console.log(`Procurando implementação para: "${palavra}"`);

    // Buscar implementação
    const implementação = encontrarImplementação(palavra, documento);

    if (implementação) {
      return [implementação];
    }

    return null;
  } catch (erro) {
    console.error('Erro no handler de implementação:', erro);
    return null;
  }
});
