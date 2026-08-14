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
/*
import { getDocumentSettings, hasConfigurationCapability, hasWorkspaceFolderCapability } from '../configuracao';
import { getDiagnostics } from '../diagnosticos';
import { getCompletions } from '../completions';
import { getHover } from '../hover';
import { getDefinition } from '../definition';
import { getTypeDefinition } from '../typeDefinition';
import { getImplementation } from '../implementation';
import { getReferences } from '../references';
*/

import * as servidor from '../server';
import { create } from 'domain';

export function irParaDefinição(termo: string, documentoAtual: DocumentoDeTexto) : Localização | LinkDeLocalização | null {
  // Verifica o path do documento
  const documentos = servidor.documentos;
  let documento = documentoAtual;
  let posição: Posição | null = null;
  let intervalo: Intervalo | null = null;
  let textoDoDocumento = documento.getText();
  let linhas = textoDoDocumento.split(/\r?\n/g);
  let linhaAtual = 0;
  let caractereAtual = 0;
  let encontrou = false;
  let totalDeLinhas = linhas.length;
  if(!documento) {return null;}
  const expressão_regular = /(?<!\bSe\s)(Um|Uma|Uns|Umas|O|A|O|A)\s+(.+?)\s+(é|são)/is;
  const correspondência = expressão_regular.exec(textoDoDocumento);
  if (correspondência) {
    // A variável "correspondência" é um array onde o primeiro elemento é a correspondência completa
    // e os próximos elementos são os grupos capturados pela expressão regular
    const termoCapturado = correspondência[2]; // O segundo grupo capturado é o termo que queremos
    const índiceDoTermo = textoDoDocumento.indexOf(termoCapturado);
    if (índiceDoTermo !== -1) {
      // Calcula a linha e o caractere do termo capturado
      const linhasAntesDoTermo = textoDoDocumento.substring(0, índiceDoTermo).split(/\r?\n/g);
      linhaAtual = linhasAntesDoTermo.length - 1;
      caractereAtual = linhasAntesDoTermo[linhaAtual].length;
      posição = Posição.create(linhaAtual, caractereAtual);
      intervalo = Intervalo.create(posição, Posição.create(linhaAtual, caractereAtual + termoCapturado.length));
      return Localização.create(documento.uri, intervalo);
    }
  }
  return null;
}

export default servidor.conexão.onDefinition((_params: ParametrosDeDefiniçãoDeTipo): Localização[] |LinkDeLocalização[] | null | undefined => {
  const documento = servidor.documentos.get(_params.textDocument.uri);
  if (!documento) {
    return null;
  }
  let uri = documento.uri;
  let intervalo: Intervalo;
  intervalo = Intervalo.create(_params.position, _params.position);
  // Cria uma localização inicial fictícia
  let localização = Localização.create(uri, intervalo);
  const linhaTexto = documento.getText(Intervalo.create(_params.position.line, 0, _params.position.line + 1, 0));
  const palavra = servidor.obtémPalavraSobCursor(linhaTexto, _params.position.character);
  let definição = irParaDefinição(palavra, documento);
  if (definição) {
    return [definição] as LinkDeLocalização[] | Localização[];
  }
  return null;
}); 
