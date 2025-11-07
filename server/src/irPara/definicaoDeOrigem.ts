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

import { irParaDefinição } from './definicao';

/**
 * Handler para "Definição de Origem" (Alias para Go to Definition em Português Puro)
 * Em Português Puro, "origem" refere-se à definição original de um símbolo
 * Esta funcionalidade é idêntica à definição normal, pois não há conceitos de importação
 */
export default servidor.conexão.onDefinition((_params: ParametrosDeDefinição): Localização[] | LinkDeLocalização[] | null | undefined => {
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

    console.log(`Procurando origem da definição para: "${palavra}"`);

    // Em Português Puro, origem é idêntica à definição
    // pois não há importação ou namespaces - tudo é definido no escopo global
    const definição = irParaDefinição(palavra, documento);

    if (definição) {
      console.log(`Origem da definição encontrada para: "${palavra}"`);
      return [definição] as LinkDeLocalização[] | Localização[];
    }

    console.log(`Nenhuma origem encontrada para: "${palavra}"`);
    return null;
  } catch (erro) {
    console.error('Erro no handler de definição de origem:', erro);
    return null;
  }
});
