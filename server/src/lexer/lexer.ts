/*
Este módulo implementa um analisador léxico (lexer) para a linguagem de programação "Português Puro". O lexer é responsável por ler o código-fonte e convertê-lo em uma sequência de tokens, que são as unidades básicas de significado na linguagem. Cada token representa um elemento sintático, como palavras-chave, identificadores, operadores, literais, etc. O lexer também lida com a remoção de comentários e espaços em branco, garantindo que apenas os tokens relevantes sejam passados para as etapas subsequentes do processo de compilação ou interpretação.

O lexer é uma parte fundamental do processo de análise sintática, pois fornece a base para a construção da árvore de sintaxe abstrata (AST) e a execução do código. Ele deve ser eficiente e preciso para garantir que o código-fonte seja interpretado corretamente.
*/

import Tokenizador from '../tokenizer/tokenizer';

type TipoToken =
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
  ;

interface Token {
  tipoDoToken: TipoToken;
  valor: string;
}

class AnalisadorLéxico {
  private tokenizador: Tokenizador;
  private tokensNãoCategorizados: string[];
  private posição: number;

  private palavrasChave = new Set([
    'aloque',
    'decodifique',
    'desempilhe',
    'empilhe',
    'itere',
    'para',
    'pare',
    'preserve',
    'reitere',
    'retorne',
    'se'
  ]);

  constructor(texto: string) {
    this.tokenizador = new Tokenizador(texto);
    this.tokensNãoCategorizados = this.tokenizador.tokenizar();
    this.posição = 0;
  }

  analisar(): Token[] {
    const tokens: Token[] = [];
    while (!this.chegouAoFim()) {
      const tokenNãoCategorizado = this.caractereAtual();
      tokens.push(this.classificar(tokenNãoCategorizado));
      this.posição++;
    }
    return tokens;
  }
  private classificar(valor: string): Token {
    if (this.éString(valor)) {
      return { tipoDoToken: 'string_literal', valor };
    }
    if (this.éNúmeroLiteral(valor)) {
      return { tipoDoToken: 'número_literal', valor };
    }
    if (this.éNúmeroHexadecimal(valor)) {
      return { tipoDoToken: 'número_hexadecimal', valor };
    }
    if (this.éFraçãoLiteral(valor)) {
      return { tipoDoToken: 'fração_literal', valor };
    }
    if (this.éNúmeroMisto(valor)) {
      return { tipoDoToken: 'número_misto', valor };
    }
    if (this.palavrasChave.has(valor)) {
      return { tipoDoToken: 'palavra_chave', valor };
    }
    if (this.éSinalDePontuação(valor)) {
      return { tipoDoToken: 'sinal_de_pontuacao', valor };
    }
    if (this.éOperadorDeInicialização(valor.toLowerCase())) {
      return { tipoDoToken: 'operador_de_inicialização', valor };
    }
    if (this.éAdvérbioDeNegação(valor.toLowerCase())) {
      return { tipoDoToken: 'advérbio_de_negação', valor };
    }
    if (this.éArtigoIndefinido(valor.toLowerCase())) {
      return { tipoDoToken: 'artigo_indefinido', valor };
    }
    if (this.éArtigoDefinido(valor.toLowerCase())) {
      return { tipoDoToken: 'artigo_definido', valor };
    }
    if (this.éConjunção(valor.toLowerCase())) {
      return { tipoDoToken: 'conjunção', valor };
    }
    if (this.éSímbolo(valor)) {
      return { tipoDoToken: 'símbolo', valor };
    }
    if (this.éOperadorAritmético(valor.toLowerCase())) {
      return { tipoDoToken: 'operador_aritmético', valor };
    }
    if (this.éOperadorDeConcatenação(valor.toLowerCase())) {
      return { tipoDoToken: 'operador_de_concatenação', valor };
    }
    if (this.éPreposição(valor.toLowerCase())) {
      return { tipoDoToken: 'preposição', valor };
    }
    if (this.éPonteiroLiteral(valor.toLowerCase())) {
      return { tipoDoToken: 'ponteiro_literal', valor };
    }
    if (this.éVerbo(valor.toLowerCase())) {
      return { tipoDoToken: 'verbo', valor };
    }

    return { tipoDoToken: 'identificador', valor };
  }

  // ========================
  // Funções auxiliares para classificação de tokens
  // ========================

  private caractereAtual(): string {
    return this.tokensNãoCategorizados[this.posição];
  }

  private chegouAoFim(): boolean {
    if (this.posição >= this.tokensNãoCategorizados.length) {
      return true;
    }
    return false;
  }

  private éString(texto: string): boolean {
    return texto.length >= 2 && texto.startsWith('"') && texto.endsWith('"');
  }

  private éNúmeroLiteral(valor: string): boolean {
    if (/^-?[0-9]+([0-9]+)?$/.test(valor)) {
      return true;
    }
    return false;
  }
  private éNúmeroHexadecimal(valor: string): boolean {
    if (/^\$[0-9a-fA-F]+$/.test(valor)) {
      return true;
    }
    return false;
  }
  private éFraçãoLiteral(valor: string): boolean {
    if (/^-?[0-9]+\/[0-9]+$/.test(valor)) {
      return true;
    }
    return false;
  }
  private éNúmeroMisto(valor: string): boolean {
    if (/^-?[0-9]+\+[0-9]+\/[0-9]+$/.test(valor)) {
      return true;
    }
    return false;
  }
  private éSinalDePontuação(caractere: string): boolean {
    if (caractere.length === 1 && ',.;():'.includes(caractere)) {
      return true;
    }
    return false;
  }
  private éArtigoIndefinido(texto: string): boolean {
    if (texto === 'um' || texto === 'uma' || texto === 'uns' || texto === 'umas') {
      return true;
    }
    if (this.éPronomeDemonstrativoAbrangente(texto)) {
      return true;
    }
    return false;
  }
  private éArtigoDefinido(texto: string): boolean {
    if (texto === 'o' || texto === 'a' || texto === 'os' || texto === 'as') {
      return true;
    }
    if (this.éPronomeDemonstrativoAdjacente(texto)) {
      return true;
    }
    return false;
  }
  private éArtigo(texto: string): boolean {
    if (this.éArtigoIndefinido(texto) || this.éArtigoDefinido(texto)) {
      return true;
    }
    if (this.éPronomeDemonstrativo(texto)) {
      return true;
    }
    return false;
  }
  private éPronomeDemonstrativoAdjacente(texto: string): boolean {
    if (texto === 'este' || texto === 'esta' || texto === 'estes' || texto === 'estas') {
      return true;
    }
    return false;
  }
  private éPronomeDemonstrativoAbrangente(texto: string): boolean {
    if (texto === 'esse' || texto === 'essa' || texto === 'esses' || texto === 'essas') {
      return true;
    }
    return false;
  }
  private éPronomeDemonstrativo(texto: string): boolean {
    if (this.éPronomeDemonstrativoAdjacente(texto) || this.éPronomeDemonstrativoAbrangente(texto)) {
      return true;
    }
    return false;
  }
  private éConjunção(texto: string): boolean {
    if (texto === 'e' || texto === 'ou' || texto === 'nem') {
      return true;
    }
    return false;
  }
  private éSímbolo(texto: string): boolean {
    const simbolos = '^|*+-<>{}=€‚„…†‡ˆ‰‹‘’“”•–—˜™›¡¢£¤¥¦§¨©ª«¬­®¯°±´·¸º»¼½¾¿×÷';
    if (texto.length === 1 && simbolos.includes(texto)) {
      return true;
    }
    return false;
  }
  private éVerbo(texto: string): boolean {
    const verbos = [
      'cabe', 'começa', 'começar', 'conter', 'contiver', 'contém', 'couber', 
      'deve', 'devem', 'deveria', 'deveriam', 'estamos', 'estar', 'estará', 
      'estarão', 'estava', 'estavam', 'estiver', 'estiverem', 'está', 'estão', 
      'excede', 'excedem', 'existe', 'existem', 'existir', 'finaliza', 'finalizar', 
      'foi', 'for', 'foram', 'forem', 'houver', 'há', 'inicia', 'iniciar', 
      'necessita', 'necessitar', 'parece', 'pode', 'podem', 'podemos', 
      'poderia', 'poderia', 'possuem', 'possui', 'possuir', 'puder', 'puderem', 
      'requer', 'ser', 'será', 'serão', 'supera', 'superam', 'superar', 'são', 'tem', 
      'ter', 'termina', 'terminar', 'tiver', 'têm', 'é'];
    if (verbos.includes(texto)) {
      return true;
    }
    return false;
  }
  private éOperadorAritmético(texto: string): boolean {
    if (texto === 'mais' || texto === 'menos' || texto === 'vezes' || texto === 'multiplicado' || texto === 'dividido') {
      return true;
    }
    return false;
  }
  private éOperadorDeConcatenação(texto: string): boolean {
    if (texto === 'seguido' || texto === 'juntamente' || texto === 'junto' || texto === 'acompanhado') {
      return true;
    }
    return false;
  }
  private éPreposição(texto: string): boolean {
    const preposições = [
      'abaixo', 'acerca', 'acima', 'acordo', 'algum', 'ante', 'antes',
      'aproximadamente', 'após', 'através', 'até', 'cerca', 'com',
      'começando', 'começando', 'como', 'comprida', 'comprido',
      'dada', 'dado', 'dando', 'debaixo', 'debaixo', 'dentre', 'dentro', 'depois',
      'desde', 'durante', 'em', 'enquanto', 'entre', 'então', 'menores', 'para',
      'parecida', 'parecido', 'partindo', 'partir', 'perante', 'perto', 'por', 'próximo',
      'qual', 'quanto', 'quão', 'regressivamente', 'relativa', 'resultando', 'retornando',
      'sem', 'semelhante', 'similar', 'sob', 'sobre', 'somente', 'só', 'tal', 'tanto', 'tão', 'usando',
      'versus', 'via', 'voltada', 'voltado', 'então'
    ];
    if (preposições.includes(texto)) {
      return true;
    }
    return false;
  }
  private éPonteiroLiteral(texto: string): boolean {
    if (texto === 'nulo'    || texto === 'nula' 
      || texto === 'nulos'  || texto === 'nulas' 
      || texto === 'inexistente' || texto === 'inexistentes' 
      || texto === 'zerado') 
    {//begin
        return true;
    }//end
    return false;
  }
  private éOperadorDeInicialização(texto: string): boolean {
    if (texto === 'igual') {
      return true;
    }
    return false;
  }
  private éAdvérbioDeNegação(texto: string): boolean {
    if (texto === 'não') {
      return true;
    }
    return false;
  }

}

export default AnalisadorLéxico;
