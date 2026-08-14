
import Tokenizador, { TokenBruto } from '../tokenizer/scanner';
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
  | 'EOF';

interface Token {
  tipo: TipoToken;
  valor: string;
  pos: number;
}

class AnalisadorLéxico {
  private scanner: Tokenizador;
  private atual: TokenBruto;

  constructor(texto: string) {
    this.scanner = new Tokenizador(texto);
    this.atual = this.scanner.proximoToken();
  }

  analisar(): Token[] {
    const tokens: Token[] = [];

    while (this.atual.tipo !== 'EOF') {
      tokens.push(this.classificar(this.atual));
      this.avancar();
    }

    tokens.push({ tipo: 'EOF', valor: '', pos: this.atual.pos });
    return tokens;
  }

  private avancar() {
    this.atual = this.scanner.proximoToken();
  }

  private classificar(bruto: TokenBruto): Token {
    const v = bruto.valor;
    const lower = v.toLowerCase();

    if (bruto.tipo === 'string_literal') {
      return { tipo: 'string_literal', valor: v, pos: bruto.pos };
    }

    if (this.ehNumeroLiteral(v)) {
      return { tipo: 'número_literal', valor: v, pos: bruto.pos };
    }

    if (this.ehNúmeroHexadecimal(v)) {
      return { tipo: 'número_hexadecimal', valor: v, pos: bruto.pos };
    }

    if (this.palavrasChave.has(lower)) {
      return { tipo: 'palavra_chave', valor: v, pos: bruto.pos };
    }

    if (bruto.tipo === 'sinal_de_pontuação') {
      return { tipo: 'sinal_de_pontuacao', valor: v, pos: bruto.pos };
    }

    // restante igual ao seu código...
    return { tipo: 'identificador', valor: v, pos: bruto.pos };
  }

  private palavrasChave = new Set([
    'aloque','decodifique','desempilhe','empilhe','itere',
    'para','pare','preserve','reitere','retorne','se'
  ]);

  private ehNumeroLiteral(v: string): boolean {
    return /^-?[0-9]+$/.test(v);
  }

  private ehNúmeroHexadecimal(v: string): boolean {
    return /^\$[0-9a-fA-F]+$/.test(v);
  }
}

export default AnalisadorLéxico;