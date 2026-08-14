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

class Tokenizador {
  private texto: string;
  private posição: number;

  constructor(texto: string) {
    this.texto = texto;
    this.posição = 0;
  }

  proximoToken(): TokenBruto {
    this.pularEspacosEComentarios();

    if (this.chegouAoFim()) {
      return { tipo: 'EOF', valor: '', pos: this.posição };
    }

    const caractereAtual = this.caractereAtual();
    const inicio = this.posição;

    if (caractereAtual === '"') {
      return {
        tipo: 'string_literal',
        valor: this.lerString(),
        pos: inicio
      };
    }

    if (this.éSinalDePontuacao(caractereAtual)) {
      this.avançarPosição();
      return {
        tipo: 'sinal_de_pontuação',
        valor: caractereAtual,
        pos: inicio
      };
    }
    return {
      tipo: 'outro',
      valor: this.lerTexto(),
      pos: inicio
    };
  }

  // ========================

  private pularEspacosEComentarios(): void {
    while (!this.chegouAoFim()) {
      const caractereAtual = this.caractereAtual();

      if (this.éEspaçoEmBranco(caractereAtual)) {
        this.avançarPosição();
        continue;
      }

      if (caractereAtual === '\\') {
        this.irParaPróximaLinha();
        continue;
      }

      if (caractereAtual === '[') {
        this.IgnorarComentárioDeBloco();
        continue;
      }

      break;
    }
  }
  private lerString(): string {
    const inicio = this.posição;
    this.avançarPosição();

    while (!this.chegouAoFim()) {
      if (this.caractereAtual() === '"') {
        if (this.consultarPróximoCaractere() === '"') {
          this.avançarPosição();
          this.avançarPosição();
          continue;
        }

        this.avançarPosição();
        return this.texto.slice(inicio, this.posição);
      }

      this.avançarPosição();
    }

    throw new Error("String não terminada");
  }
  private lerTexto(): string {
    const inicio = this.posição;

    while (
      !this.chegouAoFim() &&
      !this.éEspaçoEmBranco(this.caractereAtual()) &&
      !this.éSinalDePontuacao(this.caractereAtual()) &&
      this.caractereAtual() !== '"' &&
      this.caractereAtual() !== '[' &&
      this.caractereAtual() !== '\\'
    ) {
      this.avançarPosição();
    }
    return this.texto.slice(inicio, this.posição);
  }
  private irParaPróximaLinha(): void {
    while (!this.chegouAoFim() && this.caractereAtual() !== '\n' && this.caractereAtual() !== '\r') {
      this.avançarPosição();
    }
  }
  private IgnorarComentárioDeBloco(): void {
    this.avançarPosição();
    while (!this.chegouAoFim() && this.caractereAtual() !== ']') {
      this.avançarPosição();
    }
    if (this.chegouAoFim()) {
      throw new Error("Comentário não fechado");
    }
    this.avançarPosição();
  }

  // ========================
  // Helpers
  // ========================

  private caractereAtual(): string {
    return this.texto[this.posição];
  }

  private consultarPróximoCaractere(): string {
    return this.texto[this.posição + 1];
  }

  private avançarPosição(): void {
    this.posição++;
  }

  private chegouAoFim(): boolean {
    return this.posição >= this.texto.length;
  }

  private éEspaçoEmBranco(caractere: string): boolean {
    return caractere === ' ' || caractere === '\n' || caractere === '\r' || caractere === '\t';
  }

  private éSinalDePontuacao(caractere: string): boolean {
    return ',.;():'.includes(caractere);
  }
}

export default Tokenizador;