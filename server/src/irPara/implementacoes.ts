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
  éNomeSímboloVálido
} from './utils';

import {
  encontrarDefiniçãoCache,
  SymbolInfo
} from './symbols';

/**
 * Handler para "Implementações"
 * Encontra implementações de rotinas e funções em Português Puro
 * Em PP, implementação é onde a rotina/função é efetivamente definida
 */
export default servidor.conexão.onImplementation((_params: ParametrosDeImplementação): Localização[] | LinkDeLocalização[] | null | undefined => {
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

    // Buscar especificamente implementações (rotinas/funções) no cache
    const símbolo = encontrarDefiniçãoCache(palavra, documento.uri);
    if (símbolo && (símbolo.tipo === 'rotina' || símbolo.tipo === 'função')) {
      console.log(`Implementação encontrada para: "${palavra}"`);
      return [Localização.create(símbolo.caminhoArquivo, símbolo.intervalo)] as LinkDeLocalização[] | Localização[];
    }

    // Se não encontrou no cache, fazer busca manual por rotinas/funções
    const implementação = buscarImplementaçãoLocal(documento, palavra);
    if (implementação) {
      console.log(`Implementação encontrada localmente para: "${palavra}"`);
      return [implementação] as LinkDeLocalização[] | Localização[];
    }

    console.log(`Nenhuma implementação encontrada para: "${palavra}"`);
    return null;
  } catch (erro) {
    console.error('Erro no handler de implementação:', erro);
    return null;
  }
});

/**
 * Busca implementações (rotinas/funções) no documento local
 */
function buscarImplementaçãoLocal(documento: DocumentoDeTexto, termo: string): Localização | null {
  const textoDoDocumento = documento.getText();

  // Padrões específicos para rotinas e funções em Português Puro
  const padrõesImplementações = [
    // "Rotina para que se adicione uma cor e um rótulo para um menu:"
    /(?:Rotina|rotina)\s+(?:para\s+que\s+se\s+)?(.+?)(?=\:|\n)/gi,

    // "Função para que se determine se um número é negativo:"
    /(?:Função|função)\s+(?:para\s+que\s+se\s+(?:determine\s+se\s+)?)?(.+?)(?=\:|\n)/gi,

    // Busca simples por "para que se"
    /(?:para\s+que\s+se\s+)(.+?)(?=\:|\n)/gi
  ];

  for (const padrão of padrõesImplementações) {
    let correspondência: RegExpExecArray | null;
    padrão.lastIndex = 0; // Reset regex state

    while ((correspondência = padrão.exec(textoDoDocumento)) !== null) {
      const nomeRotina = correspondência[1]?.trim();

      if (nomeRotina && nomeRotina.toLowerCase().includes(termo.toLowerCase())) {
        const índiceDoTermo = textoDoDocumento.indexOf(nomeRotina);
        if (índiceDoTermo !== -1) {
          const linhasAntesDoTermo = textoDoDocumento.substring(0, índiceDoTermo).split(/\r?\n/g);
          const linhaAtual = linhasAntesDoTermo.length - 1;
          const caractereAtual = linhasAntesDoTermo[linhaAtual]?.length || 0;

          const posição = Posição.create(linhaAtual, caractereAtual);
          const intervalo = Intervalo.create(posição, Posição.create(linhaAtual, caractereAtual + nomeRotina.length));
          return Localização.create(documento.uri, intervalo);
        }
      }
    }
  }

  return null;
}
