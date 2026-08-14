/*
Este módulo implementa um tokenizador para a linguagem de programação "Português Puro". O tokenizador é responsável por dividir o código-fonte em unidades menores chamadas tokens, que são as menores partes significativas do código. Cada token representa um elemento sintático, como palavras-chave, identificadores, operadores, literais, etc. O tokenizador é uma etapa crucial no processo de análise léxica, pois fornece a base para a construção da árvore de sintaxe abstrata (AST) e a execução do código. Ele deve ser eficiente e preciso para garantir que o código-fonte seja interpretado corretamente. O tokenizador também lida com a remoção de comentários e espaços em branco, garantindo que apenas os tokens relevantes sejam passados para as etapas subsequentes do processo de compilação ou interpretação.

Português Puro é uma linguagem de programação que tem como objetivo ser fácil de aprender e usar, especialmente para falantes nativos de português. Ela é projetada para ser intuitiva e acessível, com uma sintaxe que se assemelha à linguagem natural.

O tokenizador irá reconhecer comentários e descartá-los. Em Português Puro, os comentários de linha única são iniciados por uma barra invertida '\' e continuam até o final da linha. Comentários de múltiplas linhas são delimitados por '[' no início e ']' no final. O tokenizador irá ignorar qualquer texto que esteja dentro desses delimitadores, garantindo que os comentários não sejam processados como código.

Sinais de pontuação, como vírgulas, pontos, parênteses, e outros, são tratados como tokens separados. O tokenizador irá reconhecer esses caracteres e adicioná-los à lista de tokens como unidades distintas. 

Strings literais são sequências de caracteres delimitadas por aspas duplas. 
Por exemplo, "Olá, mundo!" é uma string literal. 
Para incluir citações dentro de uma string, você pode usar escapar as aspas duplas com as próprias aspas duplas, assim:
"Ele disse:""Olá!"" e depois foi embora".
O tokenizador irá reconhecer as aspas e tratar o conteúdo entre elas como um único token, mesmo que contenha espaços ou outros caracteres especiais.

*/


class Tokenizador {
  private texto: string;
  private posição: number;

  constructor(texto: string) {
    this.texto = texto;
    this.posição = 0;
  }

  tokenizar(): string[] {
    const tokens: string[] = [];

    while (!this.chegouAoFim()) {
      const caractereAtual = this.caractereAtual();

      // whitespace
      if (this.éEspaçoEmBranco(caractereAtual)) {
        this.avançarPosição();
        continue;
      }

      // comentário de linha ( \ ... \n )
      if (caractereAtual === '\\') {
        this.lerComentarioLinha();
        continue;
      }

      // comentário de bloco [ ... ]
      if (caractereAtual === '[') {
        this.lerComentarioBloco();
        continue;
      }

      // string literal
      if (caractereAtual === '"') {
        tokens.push(this.lerString());
        continue;
      }

      // pontuação isolada
      if (this.ehPontuacao(caractereAtual)) {
        tokens.push(caractereAtual);
        this.avançarPosição();
        continue;
      }

      // identificador / palavra
      tokens.push(this.lerTokenAtual());
    }

    return tokens;
  }

  // ========================
  // Leitura especializada
  // ========================

  private lerString(): string {
    const inicio = this.posição;
    this.avançarPosição(); // pular "

    while (!this.chegouAoFim()) {
      if (this.caractereAtual() === '"') {
        // escape ""
        if (this.próximoCaractere() === '"') {
          this.avançarPosição();
          this.avançarPosição();
          continue;
        }

        this.avançarPosição(); // consumir fechamento
        return this.texto.slice(inicio, this.posição);
      }

      this.avançarPosição();
    }

    throw new Error("String literal não terminada corretamente");
  }

  private lerComentarioLinha(): void {
    while (!this.chegouAoFim() && !this.éNovaLinha(this.caractereAtual())) {
      this.avançarPosição();
    }
  }

  private lerComentarioBloco(): void {
    this.avançarPosição(); // pular [

    while (!this.chegouAoFim() && this.caractereAtual() !== ']') {
      this.avançarPosição();
    }

    if (this.chegouAoFim()) {
      throw new Error("Comentário de bloco não terminado corretamente");
    }

    this.avançarPosição(); // pular ]
  }

  private lerTokenAtual(): string {
    const inicio = this.posição;

    while (
      !this.chegouAoFim() &&
      !this.éEspaçoEmBranco(this.caractereAtual()) &&
      !this.ehPontuacao(this.caractereAtual()) &&
      this.caractereAtual() !== '"' &&
      this.caractereAtual() !== '[' &&
      this.caractereAtual() !== '\\'
    ) {
      this.avançarPosição();
    }

    return this.texto.slice(inicio, this.posição);
  }

  // ========================
  // Helpers de caractere
  // ========================

  private caractereAtual(): string {
    return this.texto[this.posição];
  }

  private próximoCaractere(): string {
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

  private éNovaLinha(caractere: string): boolean {
    return caractere === '\n' || caractere === '\r';
  }

  private ehPontuacao(caractere: string): boolean {
    return ',.;():'.includes(caractere);
  }
}

export default Tokenizador;