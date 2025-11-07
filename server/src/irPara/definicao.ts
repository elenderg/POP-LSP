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
import { create } from 'domain';

import {
  encontrarDefinição,
  escanearSímbolosProjeto,
  obterPalavraSobCursor,
  éNomeSímboloVálido
} from './utils';

/**
 * Função principal para encontrar definições de símbolos em Português Puro
 * Implementa busca multi-arquivo usando cache de símbolos
 */
export function irParaDefinição(termo: string, documentoAtual: DocumentoDeTexto): Localização | LinkDeLocalização | null {
  if (!termo || !documentoAtual) {
    return null;
  }

  // Validar se o termo é um nome de símbolo válido
  if (!éNomeSímboloVálido(termo)) {
    return null;
  }

  try {
    // Usar a nova função de busca que utiliza o cache de símbolos
    const definição = encontrarDefinição(termo, documentoAtual);
    return definição;
  } catch (erro) {
    console.error(`Erro ao procurar definição para "${termo}":`, erro);
    return null;
  }
}

/**
 * Handler LSP para funcionalidade "Ir Para Definição"
 * Processa requisições de definição do cliente e retorna localizações
 */
export default servidor.conexão.onDefinition(async (_params: ParametrosDeDefiniçãoDeTipo): Promise<Localização[] | LinkDeLocalização[] | null | undefined> => {
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

    // Buscar definição usando o novo sistema
    const definição = irParaDefinição(palavra, documento);

    if (definição) {
      // Log da definição encontrada (com type guard para LocationLink)
      if ('uri' in definição) {
        console.log(`Definição encontrada: ${definição.uri}`);
      } else {
        console.log('Definição encontrada (LocationLink)');
      }
      return [definição] as LinkDeLocalização[] | Localização[];
    }

    console.log(`Nenhuma definição encontrada para: "${palavra}"`);
    return null;
  } catch (erro) {
    console.error('Erro no handler de definição:', erro);
    return null;
  }
});
