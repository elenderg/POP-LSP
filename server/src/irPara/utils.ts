import * as fs from 'fs';
import * as path from 'path';
import {
  TextDocument as DocumentoDeTexto
} from 'vscode-languageserver-textdocument';
import {
  Location as Localização,
  Range as Intervalo,
  Position as Posição,
  TextDocuments as DocumentosDeTexto
} from 'vscode-languageserver/node';

import {
  parsearSímbolosArquivo,
  adicionarSímbolosCache,
  encontrarDefiniçãoCache,
  limparCacheSímbolos,
  SymbolInfo,
  cacheSímbolos
} from './symbols';

/**
 * Obtém a palavra sob o cursor
 */
export function obterPalavraSobCursor(linhaTexto: string, character: number): string {
  // Encontra o início da palavra
  let início = character;
  while (início > 0 && /\w/.test(linhaTexto[início - 1])) {
    início--;
  }

  // Encontra o fim da palavra
  let fim = character;
  while (fim < linhaTexto.length && /\w/.test(linhaTexto[fim])) {
    fim++;
  }

  return linhaTexto.substring(início, fim);
}

/**
 * Escaneia todos os arquivos .pop no workspace e constrói cache de símbolos
 */
export async function escanearSímbolosProjeto(
  workspacePath: string,
  documentos: Map<string, DocumentoDeTexto>
): Promise<void> {
  try {
    // Limpar cache anterior
    limparCacheSímbolos();

    console.log(`Escaneando projeto: ${workspacePath}`);

    // Processar documentos já abertos
    for (const [uri, documento] of documentos) {
      if (uri.endsWith('.pop') || uri.includes('.pop')) {
        const conteúdo = documento.getText();
        const símbolos = parsearSímbolosArquivo(conteúdo, uri);
        adicionarSímbolosCache(símbolos);
        console.log(`Processado: ${uri} (${símbolos.length} símbolos)`);
      }
    }

    // Ler arquivos .pop do sistema de arquivos
    await processarDiretório(workspacePath, documentos);

    console.log(`Cache de símbolos atualizado: ${Array.from(cacheSímbolos.símbolos.keys()).length} símbolos únicos`);
  } catch (erro) {
    console.error('Erro ao escanear símbolos do projeto:', erro);
  }
}

/**
 * Processa recursivamente um diretório buscando arquivos .pop
 */
async function processarDiretório(
  dirPath: string,
  documentos: Map<string, DocumentoDeTexto>
): Promise<void> {
  try {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // Ignorar diretórios especiais
        if (entry.name.startsWith('.') ||
            entry.name === 'node_modules' ||
            entry.name === 'dist' ||
            entry.name === 'build') {
          continue;
        }
        await processarDiretório(fullPath, documentos);
      } else if (entry.isFile() && fullPath.endsWith('.pop')) {
        // Ler arquivo .pop se não estiver já na memória
        const uri = pathToUri(fullPath);
        if (!documentos.has(uri)) {
          try {
            const conteúdo = await fs.promises.readFile(fullPath, 'utf-8');
            const símbolos = parsearSímbolosArquivo(conteúdo, uri);
            adicionarSímbolosCache(símbolos);
            console.log(`Arquivo processado: ${fullPath} (${símbolos.length} símbolos)`);
          } catch (erro) {
            console.warn(`Erro ao ler arquivo ${fullPath}:`, erro);
          }
        }
      }
    }
  } catch (erro) {
    console.warn(`Erro ao processar diretório ${dirPath}:`, erro);
  }
}

/**
 * Converte caminho de arquivo para URI
 */
function pathToUri(filePath: string): string {
  return `file://${filePath.replace(/\\/g, '/')}`;
}

/**
 * Encontra definição de um símbolo no projeto
 */
export function encontrarDefinição(
  nomeSímbolo: string,
  documentoAtual: DocumentoDeTexto
): Localização | null {
  try {
    // Buscar no cache primeiro
    const símbolo = encontrarDefiniçãoCache(nomeSímbolo, documentoAtual.uri);
    if (símbolo) {
      return Localização.create(símbolo.caminhoArquivo, símbolo.intervalo);
    }

    // Se não encontrou no cache, fazer busca simples no documento atual
    return buscarDefiniçãoLocal(documentoAtual, nomeSímbolo);
  } catch (erro) {
    console.error(`Erro ao encontrar definição para "${nomeSímbolo}":`, erro);
    return null;
  }
}

/**
 * Busca definição local no documento atual (implementação original expandida)
 */
function buscarDefiniçãoLocal(documento: DocumentoDeTexto, termo: string): Localização | null {
  const textoDoDocumento = documento.getText();
  const linhas = textoDoDocumento.split(/\r?\n/g);

  // Padrão original expandido para cobrir mais casos
  const padrões = [
    // Padrão original
    /(?<!\bSe\s)(?:Um|Uma|Uns|Umas|O|A|Os|As)\s+(.+?)\s+(?:é|são)/is,

    // Variáveis globais com artigos definidos
    /(?:O|A|Os|As)\s+(.+?)\s+(?:é|são)\s+(?:um|uma|uns|umas)\s+(.+?)(?=\.|$)/i,

    // Variáveis locais com "denominado"
    /(?:um|uma|uns|umas)\s+(.+?)\s+denominado\s+(.+?)(?=\.|$)/i,

    // Rotinas
    /(?:Rotina|rotina)\s+(?:para\s+que\s+se\s+)?(.+?)(?=\:|\n)/i,

    // Funções
    /(?:Função|função)\s+(?:para\s+que\s+se\s+(?:determine\s+se\s+)?)?(.+?)(?=\:|\n)/i
  ];

  for (const padrão of padrões) {
    const correspondência = padrão.exec(textoDoDocumento);
    if (correspondência) {
      // Extrair o nome do símbolo baseado no padrão
      let nomeSímbolo: string;
      if (padrão === padrões[0] || padrão === padrões[1]) {
        // Padrão "Artigo Nome é/são" - grupo 1 é o nome
        nomeSímbolo = correspondência[1]?.trim();
      } else if (padrão === padrões[2]) {
        // Padrão "denominado Nome" - grupo 2 é o nome
        nomeSímbolo = correspondência[2]?.trim();
      } else {
        // Padrão rotina/função - grupo 1 é o nome
        nomeSímbolo = correspondência[1]?.trim();
      }

      if (nomeSímbolo && nomeSímbolo.toLowerCase().includes(termo.toLowerCase())) {
        const índiceDoTermo = textoDoDocumento.indexOf(nomeSímbolo);
        if (índiceDoTermo !== -1) {
          const linhasAntesDoTermo = textoDoDocumento.substring(0, índiceDoTermo).split(/\r?\n/g);
          const linhaAtual = linhasAntesDoTermo.length - 1;
          const caractereAtual = linhasAntesDoTermo[linhaAtual]?.length || 0;

          const posição = Posição.create(linhaAtual, caractereAtual);
          const intervalo = Intervalo.create(posição, Posição.create(linhaAtual, caractereAtual + nomeSímbolo.length));
          return Localização.create(documento.uri, intervalo);
        }
      }
    }
  }

  return null;
}

/**
 * Valida se uma string é um nome de símbolo válido em Português Puro
 */
export function éNomeSímboloVálido(nome: string): boolean {
  if (!nome || nome.length === 0) {
    return false;
  }

  // Verificar se não é uma palavra reservada muito comum
  const palavrasReservadas = [
    'se', 'então', 'senão', 'para', 'que', 'uma', 'um', 'com', 'por', 'de',
    'do', 'da', 'dos', 'das', 'e', 'ou', 'em', 'na', 'no', 'nas', 'nos',
    'rotina', 'função', 'determine', 'retorne', 'itere', 'pare', 'reitere'
  ];

  return !palavrasReservadas.includes(nome.toLowerCase());
}

/**
 * Extrai termos de contexto ao redor de uma posição
 */
export function extrairContexto(
  documento: DocumentoDeTexto,
  posição: Posição,
  raioLinhas: number = 2
): string {
  const inícioLinha = Math.max(0, posição.line - raioLinhas);
  const fimLinha = Math.min(documento.lineCount - 1, posição.line + raioLinhas);

  const intervalo = Intervalo.create(
    Posição.create(inícioLinha, 0),
    Posição.create(fimLinha, Number.MAX_SAFE_INTEGER)
  );

  return documento.getText(intervalo);
}
