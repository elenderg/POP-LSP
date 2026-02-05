//     Modificado e adaptado a partir do wink-tokenizer
//     Tokenizador multilíngue que etiqueta automaticamente cada token com seu tipo.
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     Este arquivo é parte do “wink-tokenizer”.
//
//     A permissão é concedida, gratuitamente, a qualquer pessoa que obtenha uma
//     cópia deste software e arquivos de documentação associados (o "Software"),
//     para lidar com o Software sem restrições, incluindo, sem limitação, os direitos
//     de uso, cópia, modificação, mesclagem, publicação, distribuição, sublicenciamento
//     e/ou venda de cópias do Software, e para permitir que as pessoas a quem o
//     Software é fornecido o façam, sujeito às seguintes condições:
//
//     O aviso de copyright acima e este aviso de permissão deverão ser incluídos
//     em todas as cópias ou partes substanciais do Software.
//
//     O SOFTWARE É FORNECIDO "COMO ESTÁ", SEM GARANTIA DE QUALQUER TIPO, EXPRESSA
//     OU IMPLÍCITA, INCLUINDO, MAS NÃO SE LIMITANDO ÀS GARANTIAS DE COMERCIALIZAÇÃO,
//     ADEQUAÇÃO A UM PROPÓSITO ESPECÍFICO E NÃO VIOLAÇÃO. EM NENHUMA CIRCUNSTÂNCIA OS
//     AUTORES OU TITULARES DE COPYRIGHT SERÃO RESPONSÁVEIS POR QUALQUER RECLAMAÇÃO,
//     DANOS OU OUTRA RESPONSABILIDADE, SEJA EM UMA AÇÃO DE CONTRATO, ATO ILÍCITO OU
//     OUTRA FORMA, DECORRENTE DE, FORA DE OU EM CONEXÃO COM O SOFTWARE OU O USO OU
//     OUTRAS NEGOCIAÇÕES NO SOFTWARE.


// eng-tokenizer.ts

// Importação das contrações
import contracoes from './eng-contractions';

// =====================
// Tipos e Interfaces
// =====================

export interface Token {
  value: string;
  tag: string;
}

interface RegexCategoria {
  regex: RegExp;
  category: string;
}

interface ConfiguracaoCategorias {
  [categoria: string]: boolean | undefined | null;
}

interface ContracaoToken {
  value: string;
  tag: string;
}

// =====================
// Regex globais
// =====================

const rgxEspacos = /\s+/g;

const rgxNumeroL1 = /\d+\/\d+|\d(?:[\.,-\/]?\d)*(?:\.\d+)?/g;

const rgxPontuacao = /[’'‘’`“”"\[\]\(\){}…,\.!;\?\-:]/g;
const rgxFraseEntreAspas = /"(?:[^"]|"")*"/g;
const rgxComentarioLinhaUnica = /\\[^\r\n]*/g;
const rgxComentarioBloco = /\[[^\]]*\]/g;

const rgxPalavraL1 =
  /[a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF][a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF']*/gi;

const rgxSimbolo = /[~@#%\^\+=\*\|\/<>&]/g;

const rgxContracao = /'/;

const rgxPossessivoSingular = /([a-z]+)('s)$/i;
const rgxPossessivoPlural = /([a-z]+s)(')$/i;

// =====================
// Lista mestra de regex
// =====================

const listaMestraRegex: RegexCategoria[] = [
  { regex: rgxComentarioLinhaUnica, category: 'comentario_linha_unica' },
  { regex: rgxComentarioBloco, category: 'comentario_bloco' },
  { regex: rgxFraseEntreAspas, category: 'frase_entre_aspas' },
  { regex: rgxNumeroL1, category: 'numero' },
  { regex: rgxPalavraL1, category: 'palavra' },
  { regex: rgxPontuacao, category: 'pontuacao' },
  { regex: rgxSimbolo, category: 'simbolo' }
];

// =====================
// Impressão digital
// =====================

let codigosImpressaoDigital: Record<string, string> = {
  comentario_bloco: 'b',
  comentario_linha_unica: 'l',
  numero: 'n',
  frase_entre_aspas: 'q',
  simbolo: 's',
  palavra: 'w',
  desconhecido: 'z'
};

// =====================
// Tokenizador
// =====================

export default function criarTokenizador() {
  let expressoesRegulares: RegexCategoria[] = listaMestraRegex.slice();
  let tokensFinais: Token[] = [];

  // ---------------------
  // Contrações
  // ---------------------

  function gerenciarContracao(palavra: string, tokens: Token[]): Token[] {
    const contracaoEncontrada = (contracoes as Record<
      string,
      ContracaoToken[]
    >)[palavra];

    let correspondencias: RegExpMatchArray | null;

    if (!contracaoEncontrada) {
      correspondencias = palavra.match(rgxPossessivoSingular);
      if (correspondencias) {
        tokens.push({ value: correspondencias[1], tag: 'palavra' });
        tokens.push({ value: correspondencias[2], tag: 'palavra' });
      } else {
        correspondencias = palavra.match(rgxPossessivoPlural);
        if (correspondencias) {
          tokens.push({ value: correspondencias[1], tag: 'palavra' });
          tokens.push({ value: correspondencias[2], tag: 'palavra' });
        } else {
          tokens.push({ value: palavra, tag: 'palavra' });
        }
      }
    } else {
      contracaoEncontrada.forEach(t =>
        tokens.push({ ...t })
      );
    }

    return tokens;
  }

  // ---------------------
  // Tokenização unitária
  // ---------------------

  function tokenizarUnidadeTexto(
    texto: string,
    divisorRegex: RegexCategoria
  ): Array<string | Token> {
    const correspondencias = texto.match(divisorRegex.regex) ?? [];
    const restante = texto.split(divisorRegex.regex);
    const tokens: Array<string | Token> = [];
    const etiqueta = divisorRegex.category;

    let correspondenciaAtual = 0;

    for (let i = 0; i < restante.length; i++) {
      let fragmento = restante[i].trim();
      if (fragmento) tokens.push(fragmento);

      if (correspondenciaAtual < correspondencias.length) {
        const atual = correspondencias[correspondenciaAtual];

        if (etiqueta === 'palavra' && rgxContracao.test(atual)) {
          gerenciarContracao(atual, tokens as Token[]);
        } else {
          tokens.push({ value: atual, tag: etiqueta });
        }
      }

      correspondenciaAtual++;
    }

    return tokens;
  }

  // ---------------------
  // Tokenização recursiva
  // ---------------------

  function tokenizarTextoRecursivamente(
    texto: string,
    listaRegex: RegexCategoria[]
  ): void {
    const sentenca = texto.trim();

    if (!listaRegex.length) {
      sentenca.split(rgxEspacos).forEach(tkn => {
        tokensFinais.push({ value: tkn.trim(), tag: 'desconhecido' });
      });
      return;
    }

    const regexAtual = listaRegex[0];
    const tokensTemp = tokenizarUnidadeTexto(sentenca, regexAtual);

    tokensTemp.forEach(token => {
      if (typeof token === 'string') {
        tokenizarTextoRecursivamente(token, listaRegex.slice(1));
      } else {
        tokensFinais.push(token);
      }
    });
  }

  // ---------------------
  // API pública
  // ---------------------

  function definirConfiguracao(configuracao?: ConfiguracaoCategorias): number {
    if (configuracao && Object.keys(configuracao).length) {
      expressoesRegulares = listaMestraRegex.filter(rgx => {
        const ativa = configuracao[rgx.category];
        return ativa === undefined || ativa === null || !!ativa;
      });
    } else {
      expressoesRegulares = [];
    }

    const categoriasUnicas: Record<string, true> = {};
    expressoesRegulares.forEach(rgx => {
      categoriasUnicas[rgx.category] = true;
    });

    codigosImpressaoDigital = {
      comentario_bloco: 'b',
      comentario_linha_unica: 'l',
      numero: 'n',
      frase_entre_aspas: 'q',
      simbolo: 's',
      palavra: 'w',
      desconhecido: 'z'
    };

    return Object.keys(categoriasUnicas).length;
  }

  function tokenizar(sentenca: string): Token[] {
    tokensFinais = [];
    tokenizarTextoRecursivamente(sentenca, expressoesRegulares);
    return tokensFinais;
  }

  function obterImpressaoDigitalTokens(): string {
    return tokensFinais
      .map(t => codigosImpressaoDigital[t.tag] ?? t.value)
      .join('');
  }

  function adicionarTag(nome: string, codigo: string): void {
    if (codigosImpressaoDigital[nome]) {
      throw new Error(`A tag ${nome} já existe`);
    }
    codigosImpressaoDigital[nome] = codigo;
  }

  function adicionarRegex(
    regex: RegExp,
    tag: string,
    codigoImpressaoDigitalNovo?: string
  ): void {
    if (!codigosImpressaoDigital[tag] && !codigoImpressaoDigitalNovo) {
      throw new Error(
        `A tag ${tag} não existe; forneça um código de impressão digital`
      );
    } else if (!codigosImpressaoDigital[tag]) {
      adicionarTag(tag, codigoImpressaoDigitalNovo as string);
    }

    expressoesRegulares.unshift({ regex, category: tag });
  }

  // Configuração inicial
  definirConfiguracao({ frase_entre_aspas: false });

  return {
    definirConfiguracao,
    tokenizar,
    obterImpressaoDigitalTokens,
    adicionarTag,
    adicionarRegex
  };
}
