// ========================
// Tokens brutos (Scanner)
// ========================

export type TipoTokenBruto =
  | 'string_literal'
  | 'outro'
  | 'sinal_de_pontuação'
  | 'EOF';

export interface TokenBruto {
  tipo: TipoTokenBruto;
  valor: string;
  pos: number;
}

// ========================
// Tokens finais (Lexer)
// ========================

export type TipoToken =
  | 'string_literal'
  | 'número_literal'
  | 'número_hexadecimal'
  | 'fração_literal'
  | 'número_misto'
  | 'identificador'
  | 'palavra_chave'
  | 'sinal_de_pontuacao'
  | 'operador_de_inicialização'
  | 'advérbio_de_negação'
  | 'artigo_indefinido'
  | 'artigo_definido'
  | 'conjunção'
  | 'símbolo'
  | 'operador_aritmético'
  | 'operador_de_concatenação'
  | 'preposição'
  | 'ponteiro_literal'
  | 'verbo'
  | 'EOF';

export interface Token {
  tipo: TipoToken;
  valor: string;

  // posição absoluta (índice no texto)
  pos: number;

  // preparação para mensagens de erro (recomendado)
  linha?: number;
  coluna?: number;
}
