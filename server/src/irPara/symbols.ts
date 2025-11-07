import {
  Location as Localização,
  Range as Intervalo,
  Position as Posição
} from 'vscode-languageserver/node';

export interface SymbolInfo {
  nome: string;
  tipo: 'variável' | 'tipo' | 'rotina' | 'função';
  caminhoArquivo: string;
  linha: number;
  coluna: number;
  intervalo: Intervalo;
}

export interface SymbolCache {
  símbolos: Map<string, SymbolInfo[]>;
  últimoEscaneamento: number;
}

export interface PatternDefinição {
  padrão: RegExp;
  tipo: 'variável' | 'tipo' | 'rotina' | 'função';
  grupoNome: number;
}

/**
 * Cache global de símbolos do projeto
 */
export const cacheSímbolos: SymbolCache = {
  símbolos: new Map(),
  últimoEscaneamento: 0
};

/**
 * Padrões regex para detectar diferentes tipos de definições em Português Puro
 */
export const padrõesSímbolos: PatternDefinição[] = [
  {
    // Variáveis globais: "A cor é uma cor" ou "As aspas duplas são um byte"
    padrão: /(?<!\bSe\s)(?:O|A|Os|As)\s+(.+?)\s+(?:é|são)\s+(?:um|uma|uns|umas)\s+(.+?)(?=\.|$)/gs,
    tipo: 'variável',
    grupoNome: 1
  },
  {
    // Variáveis locais: "um número denominado idade" ou "uma string denominada nome"
    padrão: /(?:um|uma|uns|umas)\s+(.+?)\s+denominado\s+(.+?)(?=\.|$)/gs,
    tipo: 'variável',
    grupoNome: 2
  },
  {
    // Tipos/Estruturas: "Uma string é uma estrutura com um caractere inicial e um caractere final"
    padrão: /(?:Um|Uma|Uns|Umas)\s+(.+?)\s+(?:é|são)\s+(?:uma estrutura|um estrutura)\s+(?:com|que contêm)/gs,
    tipo: 'tipo',
    grupoNome: 1
  },
  {
    // Rotinas: "Rotina para que se adicione uma cor e um rótulo para um menu:"
    padrão: /(?:Rotina|rotina)\s+(?:para\s+que\s+se\s+)?(.+?)(?=\:|\n)/gs,
    tipo: 'rotina',
    grupoNome: 1
  },
  {
    // Funções: "Função para que se determine se um número é negativo:"
    padrão: /(?:Função|função)\s+(?:para\s+que\s+se\s+(?:determine\s+se\s+)?)?(.+?)(?=\:|\n)/gs,
    tipo: 'função',
    grupoNome: 1
  }
];

/**
 * Extrai informações de um símbolo baseado na correspondência regex
 */
export function extrairInfoSímbolo(
  correspondência: RegExpExecArray,
  padrão: PatternDefinição,
  caminhoArquivo: string,
  conteúdoArquivo: string
): SymbolInfo | null {
  try {
    const nomeSímbolo = correspondência[padrão.grupoNome];
    if (!nomeSímbolo) {
      return null;
    }

    // Encontrar posição do match no conteúdo
    const índiceInício = correspondência.index!;
    const nomeLimpado = nomeSímbolo.trim();

    // Calcular linha e coluna
    const linhas = conteúdoArquivo.substring(0, índiceInício).split(/\r?\n/);
    const linha = linhas.length;
    const coluna = linhas[linha - 1]?.length || 0;

    // Criar intervalo
    const posiçãoInício = Posição.create(linha, coluna);
    const posiçãoFim = Posição.create(linha, coluna + nomeLimpado.length);
    const intervalo = Intervalo.create(posiçãoInício, posiçãoFim);

    return {
      nome: nomeLimpado,
      tipo: padrão.tipo,
      caminhoArquivo,
      linha,
      coluna,
      intervalo
    };
  } catch (erro) {
    console.error(`Erro ao extrair info do símbolo: ${erro}`);
    return null;
  }
}

/**
 * Parseia todas as definições de símbolos de um arquivo
 */
export function parsearSímbolosArquivo(conteúdoArquivo: string, caminhoArquivo: string): SymbolInfo[] {
  const símbolos: SymbolInfo[] = [];

  for (const padrão of padrõesSímbolos) {
    let correspondência: RegExpExecArray | null;
    padrão.padrão.lastIndex = 0; // Reset regex state

    while ((correspondência = padrão.padrão.exec(conteúdoArquivo)) !== null) {
      const infoSímbolo = extrairInfoSímbolo(correspondência, padrão, caminhoArquivo, conteúdoArquivo);
      if (infoSímbolo) {
        símbolos.push(infoSímbolo);
      }
    }
  }

  return símbolos;
}

/**
 * Adiciona símbolos ao cache
 */
export function adicionarSímbolosCache(símbolos: SymbolInfo[]): void {
  for (const símbolo of símbolos) {
    const listaSímbolos = cacheSímbolos.símbolos.get(símbolo.nome) || [];
    listaSímbolos.push(símbolo);
    cacheSímbolos.símbolos.set(símbolo.nome, listaSímbolos);
  }
}

/**
 * Busca definição de um símbolo no cache
 */
export function encontrarDefiniçãoCache(nomeSímbolo: string, arquivoAtual?: string): SymbolInfo | null {
  const símbolos = cacheSímbolos.símbolos.get(nomeSímbolo);
  if (!símbolos || símbolos.length === 0) {
    return null;
  }

  // Se temos múltiplas definições, priorizar arquivo atual se fornecido
  if (arquivoAtual) {
    const definiçãoLocal = símbolos.find(s => s.caminhoArquivo === arquivoAtual);
    if (definiçãoLocal) {
      return definiçãoLocal;
    }
  }

  // Retornar primeira definição encontrada
  return símbolos[0];
}

/**
 * Limpa o cache de símbolos
 */
export function limparCacheSímbolos(): void {
  cacheSímbolos.símbolos.clear();
  cacheSímbolos.últimoEscaneamento = 0;
}
