import path from "path";
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

const documentos = new DocumentosDeTexto(DocumentoDeTexto);

const documentUri = (fileName: string): string => {
  return `file://${path.join(__dirname, '../..', fileName)}`;
};

const documentPath = (fileName: string): string => {
  return path.join(__dirname, '../..', fileName);
};

// Get all .pop documents present on documentPath
const documentosPoP = documentos.all().filter(doc => doc.uri.endsWith('.pop'));

// Get the content of each .pop document
const conteúdoDosDocumentos = documentosPoP.map(doc => doc.getText());

// Create a symbol table
const tabelaDeSímbolos = new Map<string, string[]>();

conteúdoDosDocumentos.forEach((conteúdo, índice) => {
  const linhas = conteúdo.split('\n');
  linhas.forEach((line, lineIndex) => {
    const correspondências = line.match(/(\w+)\s*=\s*(\w+)/); // Match variable assignments
    if (correspondências) {
      const [, chave, valor] = correspondências;
      if (!tabelaDeSímbolos.has(chave)) {
        tabelaDeSímbolos.set(chave, []);
      }
      tabelaDeSímbolos.get(chave)!.push(`Documento: ${índice + 1}, Linha ${lineIndex + 1}: ${valor}`);
    }
  });
});


// Encontra todos os tipos de dados utilizados nos documentos

// A definição de tipos segue a seguinte sintaxe:
// <artigo indefinido> <nome do tipo> <é|são> <artigo indefinido> <nome do tipo>.
// Exemplo: 
// Um caractere é um byte.
// Um número inteiro é um número.
// Uma word é um número.
// Estruturas e listas usam a seguinte sintaxe:
// <artigo indefinido> <nome da estrutura> <é|são> <artigo indefinido> estrutura com <membros>.
// Exemplo:
// Uma pessoa é uma estrutura com um nome e uma idade.
// onde "nome" é uma string e "idade" é um número inteiro.