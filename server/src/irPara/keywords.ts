/**
 * Função para verificar se uma palavra é uma palavra-chave que não deve ter funcionalidade "Ir Para..."
 */
export function éPalavraChave(termo: string): boolean {
  if (!termo || typeof termo !== 'string') {
    return true;
  }

  const termoLower = termo.toLowerCase().trim();

  // Palavras-chave reservadas para WinAPI32
  const winApi32Keywords = ['processe'];

  // Operadores
  const operators = [
    'mais', 'menos', 'vezes', 'dividido', 'igual', 'diferente', 'maior que', 'menor que',
    'maior ou igual', 'menor ou igual', 'e', 'ou', 'não'
  ];

  // Recursos de declaração (Artigos)
  const articles = [
    'uma', 'um', 'uns', 'umas',  // artigos indefinidos
    'o', 'a', 'os', 'as'         // artigos definidos
  ];

  // Marcadores de fim de bloco
  const blockMarkers = ['reitere', 'fim', 'então', 'senão', 'alternativa'];

  // Verbos de rotinas
  const verbs = [
    'defina', 'configure', 'calcule', 'determine', 'verifique', 'teste', 'execute',
    'processe', 'limpe', 'inicie', 'finalize'
  ];

  // Conectores e preposições
  const connectors = [
    'como', 'com', 'para', 'de', 'da', 'dos', 'das', 'no', 'na', 'nos', 'nas',
    'por', 'sobre', 'entre', 'durante'
  ];

  // Palavras de controle de fluxo
  const flowControl = [
    'se', 'então', 'senão', 'para', 'enquanto', 'repita', 'até', 'caso',
    'escolha', 'quando', 'sempre', 'nunca'
  ];

  // Tipos de dados básicos
  const dataTypes = [
    'byte', 'string', 'número', 'lógico', 'estrutura', 'ponteiro', 'lista',
    'matriz', 'objeto'
  ];

  // Literais e valores
  const literals = ['verdadeiro', 'falso', 'nulo', 'vazio', 'zero'];

  // Combinar todas as listas
  const allKeywords = [
    ...winApi32Keywords,
    ...operators,
    ...articles,
    ...blockMarkers,
    ...verbs,
    ...connectors,
    ...flowControl,
    ...dataTypes,
    ...literals
  ];

  return allKeywords.includes(termoLower);
}

/**
 * Função para validar se um termo pode ser um nome de símbolo válido
 * (não é palavra-chave e contém caracteres válidos)
 */
export function éNomeSímboloVálido(termo: string): boolean {
  // Não pode ser palavra-chave
  if (éPalavraChave(termo)) {
    return false;
  }

  // Deve ter pelo menos 2 caracteres
  if (!termo || termo.length < 2) {
    return false;
  }

  // Não pode ser apenas números
  if (/^\d+$/.test(termo)) {
    return false;
  }

  // Deve conter pelo menos uma letra
  if (!/[a-zA-Z]/.test(termo)) {
    return false;
  }

  return true;
}

/**
 * Função para extrair o nome real de um símbolo removendo artigos e conectores
 */
export function extrairNomeSímbolo(texto: string): string {
  if (!texto) return '';

  // Remover comentários de colchetes e barra invertida
  let nome = texto.replace(/\[.*?\]/g, ''); // Remove [comentário]
  nome = nome.replace(/\\.*$/g, '');        // Remove \comentário

  // Remover artigos do início
  nome = nome.replace(/^(?:o|a|os|as|um|uma|uns|umas)\s+/i, '');

  // Remover conectores comuns
  nome = nome.replace(/\s+(?:é|são|denominado|com|para|de|da|dos|das)\s+/g, ' ');

  // Limpar espaços extras
  nome = nome.trim();

  return nome;
}

/**
 * Função para identificar o tipo de declaração baseada no contexto
 */
export function identificarTipoDeclaração(linha: string): 'variável' | 'tipo' | 'rotina' | 'função' | null {
  const linhaLower = linha.toLowerCase().trim();

  // Declaração de tipo: "Uma string é uma estrutura..."
  if (/^(?:um|uma|uns|umas)\s+.+\s+(?:é|são)\s+(?:um|uma|uns|umas)\s+(?:estrutura|ponteiro|lista|byte|string|número|lógico)/.test(linhaLower)) {
    return 'tipo';
  }

  // Declaração de variável global: "A cor é uma string."
  if (/^(?:o|a|os|as)\s+.+\s+(?:é|são)\s+(?:um|uma|uns|umas)\s+.+\./.test(linhaLower)) {
    return 'variável';
  }

  // Declaração de rotina: "Rotina para que se..."
  if (/^(?:rotina|função)\s+/.test(linhaLower)) {
    return linhaLower.includes('função') ? 'função' : 'rotina';
  }

  return null;
}
