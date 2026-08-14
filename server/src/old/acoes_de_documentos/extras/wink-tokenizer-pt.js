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

// Importação das contrações (atualmente configurado para inglês).
var contracoes = require('./eng-contractions.js');
var rgxEspacos = /\s+/g;

// Além de detectar inteiros puros ou decimais, também detecta números contendo
// `. - / ,` para que datas, endereços IP, frações e códigos sejam detectados apenas como números.
// Exemplo: 8.8.8.8 ou 12-12-1924 ou 1/4.
var rgxNumeroL1 = /\d+\/\d+|\d(?:[\.,-\/]?\d)*(?:\.\d+)?/g;

// Expressões para pontuação, frases entre aspas e comentários.
var rgxPontuacao = /[’'‘’`“”"\[\]\(\){}…,\.!;\?\-:]/g;
var rgxFraseEntreAspas = /"(?:[^"]|"")*"/g;
var rgxComentarioLinhaUnica = /\\[^\r\n]*/g;
var rgxComentarioBloco = /\[[^\]]*\]/g;

// Inclui o Bloco Unicode Latin-1 Supplement.
var rgxPalavraL1 = /[a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF][a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF']*/gi;

// Símbolos diversos.
var rgxSimbolo = /[~@#%\^\+=\*\|\/<>&]/g;

// Para detectar se uma palavra é uma potencial contração.
var rgxContracao = /'/;

// Possessivos em Inglês (Singular e Plural).
var rgxPossessivoSingular = /([a-z]+)('s)$/i;
var rgxPossessivoPlural = /([a-z]+s)(')$/i;

// Lista mestra de Regex e suas categorias. A sequência é CRÍTICA para a tokenização correta.
var listaMestraRegex = [
  { regex: rgxComentarioLinhaUnica, categoria: 'comentario_linha_unica' },
  { regex: rgxComentarioBloco, categoria: 'comentario_bloco' },
  { regex: rgxFraseEntreAspas, category: 'frase_entre_aspas' },
  { regex: rgxNumeroL1, category: 'numero' },
  { regex: rgxPalavraL1, category: 'palavra' },
  { regex: rgxPontuacao, category: 'pontuacao' },
  { regex: rgxSimbolo, category: 'simbolo' }
];

// Mapeamento de códigos para a geração da impressão digital (fingerprint).
var codigosImpressaoDigital = {
  comentario_bloco: 'b',
  comentario_linha_unica: 'l',
  numero: 'n',
  frase_entre_aspas: 'q',
  simbolo: 's',
  palavra: 'w',
  desconhecido: 'z'
};

/**
 * Cria uma instância do Tokenizador.
 *
 * @return {object} Objeto contendo os métodos da API para tokenização e configuração.
 */
var criarTokenizador = function () {
  // Configuração padrão: cópia da lista mestra.
  var expressoesRegulares = listaMestraRegex.slice(0);

  // Armazena os resultados da última chamada ao mpetodo `tokenizar()`.
  var tokensFinais = [];

  var metodos = Object.create(null);

  /**
   * Divide contrações em palavras, primeiro tentando uma busca no dicionário de contrações;
   * se falhar, verifica possessivos ('s ou s') e separa a parte possessiva.
   *
   * @param {string} palavra Palavra que pode ser uma contração.
   * @param {object[]} tokens Lista de tokens onde o resultado será adicionado.
   * @return {object[]} Lista de tokens atualizada.
   * @private
   */
  var gerenciarContracao = function (palavra, tokens) {
    var contracaoEncontrada = contracoes[palavra];
    var correspondencias;

    if (contracaoEncontrada === undefined) {
      // Tenta possessivos de formas singular e plural.
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
      // Gerencia via dicionário; garante a clonagem dos objetos.
      tokens.push(Object.assign({}, contracaoEncontrada[0]));
      tokens.push(Object.assign({}, contracaoEncontrada[1]));
      if (contracaoEncontrada[2]) tokens.push(Object.assign({}, contracaoEncontrada[2]));
    }
    return tokens;
  };

  /**
   * Tenta tokenizar uma unidade de texto usando uma regex específica.
   *
   * @param {string} texto Texto a ser tokenizado.
   * @param {object} divisorRegex Objeto contendo a regex e sua categoria.
   * @return {array} Lista de tokens resultantes (strings para re-tokenizar ou objetos para tokens finais).
   * @private
   */
  var tokenizarUnidadeTexto = function (texto, divisorRegex) {
    var correspondencias = texto.match(divisorRegex.regex);
    var restante = texto.split(divisorRegex.regex);
    var tokens = [];
    var etiqueta = divisorRegex.category;

    var palavraAtual,
      indice,
      totalRestante,
      correspondenciaAtual = 0,
      fragmento;

    correspondencias = (correspondencias) ? correspondencias : [];

    for (indice = 0, totalRestante = restante.length; indice < totalRestante; indice += 1) {
      fragmento = restante[indice];
      fragmento = fragmento.trim();

      if (fragmento) tokens.push(fragmento);

      if (correspondenciaAtual < correspondencias.length) {
        if (etiqueta === 'palavra') {
          palavraAtual = correspondencias[correspondenciaAtual];
          if (rgxContracao.test(palavraAtual)) {
            tokens = gerenciarContracao(palavraAtual, tokens);
          } else {
            tokens.push({ value: palavraAtual, tag: etiqueta });
          }
        } else {
          tokens.push({ value: correspondencias[correspondenciaAtual], tag: etiqueta });
        }
      }
      correspondenciaAtual += 1;
    }

    return tokens;
  };

  /**
   * Tokeniza o texto de forma recursiva usando a lista de regexes.
   *
   * @param {string} texto Texto a ser tokenizado.
   * @param {object[]} listaRegex Lista de expressões regulares restantes.
   * @private
   */
  var tokenizarTextoRecursivamente = function (texto, listaRegex) {
    var sentenca = texto.trim();
    var tokensTemporarios = [];
    var indice, total;

    if (!listaRegex.length) {
      // Nenhuma regex restante, divide por espaços e marca como 'desconhecido'.
      texto.split(rgxEspacos).forEach(function (tkn) {
        tokensFinais.push({ value: tkn.trim(), tag: 'desconhecido' });
      });
      return;
    }

    var regexAtual = listaRegex[0];
    tokensTemporarios = tokenizarUnidadeTexto(sentenca, regexAtual);

    for (indice = 0, total = tokensTemporarios.length; indice < total; indice += 1) {
      if (typeof tokensTemporarios[indice] === 'string') {
        // Strings ainda são candidatas para tokenização adicional.
        tokenizarTextoRecursivamente(tokensTemporarios[indice], listaRegex.slice(1));
      } else {
        tokensFinais.push(tokensTemporarios[indice]);
      }
    }
  };

  /**
   * Define a configuração dos tipos de tokens que serão extraídos.
   *
   * @param {object} configuracao Objeto definindo quais propriedades serão verdadeiras/falsas.
   * @return {number} Número de propriedades configuradas como verdadeiras.
   */
  var definirConfiguracao = function (configuracao) {
    if (typeof configuracao === 'object' && Object.keys(configuracao).length) {
      expressoesRegulares = listaMestraRegex.filter(function (rgx) {
        var categoriaAtiva = configuracao[rgx.category];
        return (categoriaAtiva === undefined || categoriaAtiva === null || !!categoriaAtiva);
      });
    } else {
      expressoesRegulares = [];
    }

    const categoriasUnicas = Object.create(null);
    expressoesRegulares.forEach(function (rgx) {
      categoriasUnicas[rgx.category] = true;
    });

    // Reinicia os códigos de impressão digital.
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
  };

  /**
   * Tokeniza a sentença de entrada com base na configuração definida.
   *
   * @param {string} sentenca A frase ou texto de entrada.
   * @return {object[]} Array de tokens (objetos com 'value' e 'tag').
   */
  var tokenizar = function (sentenca) {
    tokensFinais = [];
    tokenizarTextoRecursivamente(sentenca, expressoesRegulares);
    return tokensFinais;
  };

  /**
   * Retorna a "impressão digital" (fingerprint) dos tokens gerados na última chamada ao `tokenizar()`.
   *
   * @return {string} String representando a sequência de tipos de tokens.
   */
  var obterImpressaoDigitalTokens = function () {
    var impressaoDigital = [];
    tokensFinais.forEach(function (token) {
      impressaoDigital.push((codigosImpressaoDigital[token.tag]) ? codigosImpressaoDigital[token.tag] : token.value);
    });
    return impressaoDigital.join('');
  };

  /**
   * Adiciona uma nova etiqueta ao sistema de impressão digital.
   *
   * @param {string} nome Nome da tag.
   * @param {string} codigoImpressaoDigital Código representativo.
   */
  var adicionarTag = function (nome, codigoImpressaoDigitalNovo) {
    if (codigosImpressaoDigital[nome]) {
      throw new Error('A tag ' + nome + ' já existe');
    }
    codigosImpressaoDigital[nome] = codigoImpressaoDigitalNovo;
  };

  /**
   * Adiciona uma regex personalizada para um novo tipo de token.
   *
   * @param {RegExp} regex A nova expressão regular.
   * @param {string} tag A etiqueta associada.
   * @param {string} [codigoImpressaoDigital] Obrigatório se for uma nova tag.
   */
  var adicionarRegex = function (regex, tag, codigoImpressaoDigitalNovo) {
    if (!codigosImpressaoDigital[tag] && !codigoImpressaoDigitalNovo) {
      throw new Error('A tag ' + tag + ' não existe; forneça um código de impressão digital para adicioná-la.');
    } else if (!codigosImpressaoDigital[tag]) {
      adicionarTag(tag, codigoImpressaoDigitalNovo);
    }

    expressoesRegulares.unshift({ regex: regex, category: tag });
  };

  // Configuração inicial: desativa frases entre aspas por padrão.
  definirConfiguracao({ frase_entre_aspas: false });

  metodos.definirConfiguracao = definirConfiguracao;
  metodos.tokenizar = tokenizar;
  metodos.obterImpressaoDigitalTokens = obterImpressaoDigitalTokens;
  metodos.adicionarTag = adicionarTag;
  metodos.adicionarRegex = adicionarRegex;

  return metodos;
};

module.exports = criarTokenizador;