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
  encontrarDefiniçãoCache
} from './symbols';

import {
  éPalavraChave,
  éNomeSímboloVálido,
  extrairNomeSímbolo
} from './keywords';

/**
 * Padrões específicos para detectar definições de tipos em Português Puro
 */
const padrõesTipos = {
  // Declaração simples de tipo: "Uma string é uma estrutura."
  tipoSimples: /^(?:Um|Uma|Uns|Umas)\s+(.+?)\s+(?:é|são)\s+(?:um|uma|uns|umas)\s+(.+?)(?=\.|$)/,

  // Declaração de tipo com campos em linha única: "Um objeto é uma estrutura com um identificador denominado id."
  tipoComCampos: /^(?:Um|Uma|Uns|Umas)\s+(.+?)\s+(?:é|são)\s+(?:um|uma|uns|umas)\s+(.+?)\s+(?:com|para)\s+(.+?)(?=\.|$)/,

  // Declaração de tipo com múltiplos campos: "Um objeto é uma estrutura com\n  Um campo denominado campo."
  tipoComCamposMultilinha: /^(?:Um|Uma|Uns|Umas)\s+(.+?)\s+(?:é|são)\s+(?:um|uma|uns|umas)\s+(.+?)\s+com\s*$/i,

  // Declaração de ponteiro: "Um ponteiro é um número."
  ponteiro: /^(?:Um|Uma|Uns|Umas)\s+(.+?)\s+(?:é|são)\s+(?:um|uma|uns|umas)\s+(?:ponteiro|byte|string|número|lógico|estrutura)/,

  // Declaração de lista: "Uma lista é um ponteiro para uma lista estruturada."
  lista: /^(?:Um|Uma|Uns|Umas)\s+(.+?)\s+(?:é|são)\s+(?:um|uma|uns|umas)\s+(?:ponteiro\s+para\s+)?(?:uma\s+)?(?:lista|matriz|estrutura)/,
};

/**
 * Função para buscar definições de tipos no documento
 */
function buscarDefiniçãoTipoLocal(termo: string, documento: DocumentoDeTexto): Localização | null {
  const textoCompleto = documento.getText();
  const linhas = textoCompleto.split(/\r?\n/);

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i].trim();

    // Verificar cada padrão de tipo
    for (const [tipo, padrão] of Object.entries(padrõesTipos)) {
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

            console.log(`Definição de tipo encontrada (${tipo}): "${nomeExtraído}" na linha ${i + 1}`);
            return Localização.create(documento.uri, intervalo);
          }
        }
      }
    }
  }

  return null;
}

/**
 * Função principal para encontrar definições de tipos
 */
function encontrarDefiniçãoTipo(termo: string, documento: DocumentoDeTexto): Localização | null {
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

  // Primeiro, buscar no cache de símbolos global (apenas tipos)
  const definiçãoCache = encontrarDefiniçãoCache(termo, documento.uri);
  if (definiçãoCache && definiçãoCache.tipo === 'tipo') {
    console.log(`Definição de tipo encontrada no cache: "${termo}"`);
    return Localização.create(definiçãoCache.caminhoArquivo, definiçãoCache.intervalo);
  }

  // Se não encontrou no cache, buscar localmente no documento atual
  const definiçãoLocal = buscarDefiniçãoTipoLocal(termo, documento);
  if (definiçãoLocal) {
    console.log(`Definição de tipo encontrada localmente: "${termo}"`);
    return definiçãoLocal;
  }

  console.log(`Nenhuma definição de tipo encontrada para: "${termo}"`);
  return null;
}

/**
 * Handler LSP para funcionalidade "Ir Para Definição de Tipo"
 */
export default servidor.conexão.onTypeDefinition((_params: ParametrosDeDefiniçãoDeTipo): Localização[] | null | undefined => {
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

    console.log(`Procurando definição de tipo para: "${palavra}"`);

    // Buscar definição de tipo
    const definição = encontrarDefiniçãoTipo(palavra, documento);

    if (definição) {
      return [definição];
    }

    return null;
  } catch (erro) {
    console.error('Erro no handler de definição de tipo:', erro);
    return null;
  }
});
