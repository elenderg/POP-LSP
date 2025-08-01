grammar PortuguesPuro;

regra_espaco:
  ' '; // regra combina tokens léxicos com outras regras.

palavra: CARACTERES_IMPRIMIVEIS+;

possessivo_inglês: palavra APOSTROFO;
artigo: artigo_definido | artigo_indefinido;
artigo_definido: 'o' | 'a' | 'os' | 'as' | adjacentes;
artigo_indefinido: 'um' | 'uma' | 'uns' | 'umas' | abrangentes;
adjacentes: 'este' | 'esta' | 'estes' | 'estas';
abrangentes: 'esse' | 'essa' | 'esses' | 'essas';
contracoes:
    'ao'
  | 'à'
  | 'aos'
  | 'às'
  | 'no'
  | 'na'
  | 'nos'
  | 'nas'
  | 'pelo'
  | 'pela'
  | 'pelos'
  | 'pelas'
  | 'num'
  | 'numa'
  | 'nuns'
  | 'numas' 
  | atribuidores_de_posse
  | p1
  | p2;

atribuidores_de_posse: 
    'dum'
  | 'duma'
  | 'duns'
  | 'dumas';

p1: 'desse' | 'dessa' | 'desses' | 'dessas';
p2: 'deste' | 'desta' | 'destes' | 'destas';




operadores_de_comparacao:
  | 'igual a'
  | 'diferente de'
  | 'maior que'
  | 'maior do que'
  | 'maior ou igual a'
  | 'menor que'
  | 'menor do que'
  | 'menor ou igual a' ;

palavras_reservadas:
    'Se'
  | 'Itere'
  | 'Reitere'
  | 'Pare'
  | 'Retorne'
  | 'Preserve'
  | 'Diga'
  | 'sim'
  | 'não'
  | 'original'
  | 'Decodifique'
  | 'Processe'
  | 'retornando'
  | 'Push'
  | 'Pop'
  | 'nulo'
  | 'vazio'
  | 'inexistente' 
  | denominacoes;

denominacoes:
    'denominado'
  | 'denominada'
  | 'denominados'
  | 'denominadas'
  | 'chamado'
  | 'chamada'
  | 'chamados'
  | 'chamadas';



verbos:
    'é'
  | 'está'
  | 'estiver'
  | 'for'
  | 'forem'
  | 'são'
  | 'estão'
  | 'estiverem'
  | 'ser'
  | 'serem'
  | 'estar'
  | 'poder'
  | 'puder'
  | 'foi'
  | 'estamos'
  | 'há'
  | 'pode'
  | 'existe'
  | 'existir'
  | 'contém'
  | 'contiver'
  | 'possui'
  | 'possuir';

// --- LEXICAL BNF ---

caracteres_ignoraveis: CARACTERES_DE_CONTROLE | ESPACO_EM_BRANCO | ESPACO_RIGIDO;

comentario: comentario_de_linha | comentario_de_bloco;
comentario_de_linha: BARRA_INVERTIDA CARACTERES_IMPRIMIVEIS* QUEBRA_DE_LINHA;
comentario_de_bloco: ABRE_COLCHETES CARACTERES_IMPRIMIVEIS* FECHA_COLCHETES;


token: aglomerado | possessivo_inglês | qualificador | string_literal;
aglomerado: iniciador_de_aglomerado (caractere_aglomeravel);
caractere_aglomeravel: LETRA | DIGITO | '~'| '@' | '#' | '%' | '_' | '$' | '&' | '-' | '+' | '/';
iniciador_de_aglomerado: LETRA | DIGITO | '~'| '@' | '#' | '%' | '_' | '$' | '&' | '\'';
// 

possessivo_novo: apostrofo caractere_nao_aglomeravel; // should be followed by any terminal that is not a caractere_aglomeravel
qualificador:ABRE_PARENTESES CARACTERES_IMPRIMIVEIS* FECHA_PARENTESES;

caractere_nao_aglomeravel: ~LETRA | ~DIGITO | ~'~'| ~'@' | ~'#' | ~'%' | ~'_' | ~'$' | ~'&' | ~'-' | ~'+' | ~'/';
sinal_de_pontuacao: PONTO | VIRGULA | PONTO_E_VIRGULA | DOIS_PONTOS | '!' | '?';
simbolos_especiais: '|' | '*' | '+' | '-' | '^' | '/' | '<' | '>' | '{' | '}' ;

// --- ONE LEVEL UP FROM LEXICAL ---

noise: caracteres_ignoraveis | comentario | qualificador;
numero_inteiro: DIGITO+;
numero_decimal: HIFEN? numero_inteiro;
numero_fracionario: numero_decimal BARRA_INCLINADA numero_inteiro;
numero_misto: numero_decimal SINAL_DE_ADICAO numero_fracionario;
numero_hexadecimal: CIFRAO numero_inteiro;
string_literal:  ASPAS_DUPLAS CARACTERES_IMPRIMIVEIS* ASPAS_DUPLAS;

// --- SYNTATICAL BNF ---

programa: tipo | variavel_global | rotina;

tipos_primitivos: 'byte' | 'caractere' | 'word' | 'número' | 
                  'sinalizador' | 'ponteiro' | 'estrutura' | 
                  'string' | 'subtexto' | 'texto hexadecimal' | 
                  'lista' | 'lista estruturada' | 'listas' | 
                  'proporção' | 'fração' | 'numerador' | 'denominador';

tipo: 
    artigo_indefinido nome é artigo_indefinido nome_do_tipo informacao_opcional? PONTO |
    artigo_indefinido nome é artigo_indefinido estrutura com campos PONTO |
    artigo_indefinido nome é numero_inteiro nome_do_tipo PONTO ;

nome: palavra;
nome_do_tipo: nome;

informacao_opcional: para artigo_indefinido nome_do_tipo | com campos;

campos: campo (pausas campo)*;

bytes: 'bytes';
referência: '(referência)';
campo: (artigo_indefinido | numero_inteiro bytes) 
       (denominacoes nome | 'sob' artigo_definido nome | referência)?;

pausa: ',' | ';' | 'e' | 'ou';
pausas: pausa+;

conjuncoes: 'e' | 'ou' | 'nem';
preposicoes:
    'usando'
  | 'com'
  | 'por'
  | 'contendo'
  | 'desde'
  | 'pelo'
  | 'pela'
  | 'entre'
  | 'sobre'
  | 'sob'
  | 'cima'
  | 'embaixo'
  | 'abaixo'
  | 'antes'
  | 'depois'
  | 'após'
  | 'cerca'
  | 'próximo'
  | 'até'
  | 'aproximadamente'
  | 'como';

é: 'é' | 'são';
estrutura: 'estrutura';
igual_a: 'igual a';
variavel_global: 
    artigo_definido nome é artigo_indefinido nome_do_tipo informacao_opcional? PONTO |
    artigo_definido nome é artigo_indefinido estrutura com campos PONTO |    
    artigo_definido nome é artigo_indefinido nome_do_tipo igual_a termo_constante PONTO
    artigo_definido nome é termo_constante PONTO |
    ;

rotina: procedimento | decisor | funcao | retroinvocacao;

procedimento:  (rotina2? para que_se nome_da_rotina PONTO_E_VIRGULA |
                rotina2? para que_se nome_da_rotina DOIS_PONTOS) instrucoes;

determine_se: 'determine se';

decisor: rotina2? para que_se determine_se nome_da_rotina PONTO_E_VIRGULA |
                rotina2? para que_se determine_se nome_da_rotina DOIS_PONTOS;

função2: 'Função';
atribua: 'atribua';
funcao: (função2? 
        para que_se atribua 
        artigo_definido nome_do_tipo 
        atribuidores_de_posse nome para
        artigo_indefinido nome_do_tipo PONTO_E_VIRGULA |                
        função2? 
        para que_se atribua 
        artigo_definido nome_do_tipo 
        atribuidores_de_posse nome para
        artigo_indefinido nome_do_tipo DOIS_PONTOS) instrucoes;
para: 'para';
que_se: 'que se';
rotina2: 'Rotina';
compativelmente: 'compativelmente';
retroinvocacao: (rotina2? para que_se compativelmente nome_da_rotina PONTO_E_VIRGULA |
                rotina2? para que_se compativelmente nome_da_rotina DOIS_PONTOS) instrucoes;

nome_da_rotina: unidade_semantica | parametro | frase qualificador?;
unidade_semantica: palavra;
parametro: artigo_indefinido nome (denominacoes nome)?;
frase: artigo_definido nome;

instrucoes: instrucao+;
instrucao: preservacao | iteracao | condicional | incondicional VIRGULA;
preserve: 'Preserve';
preservacao: preserve parametro;
iteracao: 'Itere.';

se: 'Se';

condicional: se expressao_decisora VIRGULA incondicional (PONTO_E_VIRGULA incondicional)* PONTO;

expressao_decisora: palavra+ verbos? expressao_decisora?;

incondicional: interrupcao | invocacao | retorno | decodificacao | reiteracao | 
               indirecao | empilhamento | retorno_booleano;

interrupcao: 'Pare';
invocacao: invocacao_interna | invocacao_externa | invocacao_indireta;
invocacao_interna: (unidade_semantica | expressão | frase) qualificador?;
invocacao_externa: processe aspas_duplas nome_da_DLL aspas_duplas aspas_duplas nome_da_funcao aspas_duplas ((com expressão) (e expressão)* (retornando termo)?)?;
aspas_duplas: ASPAS_DUPLAS;
nome_da_DLL: palavra;
nome_da_funcao: palavra;
processe: 'Processe';
com: 'com';
e: 'e';
retornando: 'retornando';
invocacao_indireta: processe expressão (com expressão (e expressão)* (retornando termo)?)?;
retorno: 'Retorne';
decodifique: 'Decodifique';
decodificacao: decodifique numero_hexadecimal;
aponte: 'Aponte';
para_rotina: 'para a rotina';
indirecao: aponte artigo termo para_rotina (unidade_semantica | parametro | frase) qualificador?;
push: 'Push' | 'Empilhe';
empilhamento: push expressão;
reiteracao: 'Reitere';
diga: 'Diga';
retorno_booleano: diga booleano;

expressão: termo (operadores_comuns termo)*;
operadores_comuns:
    'mais'
  | 'menos'
  | 'vezes'
  | 'multiplicado por'
  | 'dividido por'
  | 'junto com'
  | 'seguido de'
  | 'acompanhado de';


booleano: 'sim' | 'não';
nulo: 'nulo' | 'inexistente' | 'vazio';

termo_constante: termo_constante_negativo | termo_constante_positivo | literal;
termo_constante_negativo: '-' termo_constante;
termo_constante_positivo: '+' termo_constante;
numero: numero_decimal | numero_fracionario | numero_misto;
literal: numero (nome_do_tipo)? | string_literal | numero_hexadecimal | booleano | nulo;

termo: termo_negativo | 
       termo_positivo | 
       variavel_local | 
       variavel | 
       termo_literal (como artigo_indefinido nome_do_tipo)? (sinal_de_divisão termo)?;

sinal_de_divisão: '/';

como: 'tal como';

termo_negativo: '-' termo;
termo_positivo: '+' termo;
variavel_local: (artigo_indefinido nome (denominacoes nome)? ) | (artigo_definido nome atribuidores_de_posse nome);
// era artigo_indefinido nome (denominacoes nome)? possessivos_inglês;
variavel: artigo_definido possessivo_português p2 nome;
// era artigo_definido nome possessivos_inglês;
termo_literal: literal possessivos_inglês; // ainda não está implementado em português. Exemplo: "texto"'s comprimento

conteúdo: 'conteúdo';
magnitude: 'magnitude';
endereçamento: 'endereçamento';

possessivos_inglês: (possessivo_inglês_antigo)*;
possessivo_inglês_antigo: apostrofo (nome | funcao | conteúdo| magnitude | endereçamento);
possessivo_português: (nome | funcao | conteúdo | magnitude | endereçamento) p2;

apostrofo: '\'s';

// Uma regra pode ser usada para definir um conjunto de caracteres. Exemplo:

// TOKENS LÉXICOS Tokens léxicos são os elementos básicos da linguagem que são reconhecidos pelo
// analisador léxico. Não chamam outras regras.

LETRA: [a-zA-ZÀ-ÖØ-öø-ÿ]; // Letras do alfabeto latino com acentos e cedilha.
DIGITO: [0-9]; // Dígitos de 0 a 9.
SIMBOLO:
  [!@#$%^&*()_+{}|:"<>?`\-=[\];',./]; // Símbolos especiais.
ESPACO: (' ' | '\t' | '\r' | '\n'); // Espaço em branco.
APOSTROFO: '\''; // Aspas simples.
ASPAS_DUPLAS: '\\"'; // Aspas duplas.
HIFEN: '-'; // HIFEN.
CIFRAO: '$'; // Símbolo de moeda.
ESPACO_EM_BRANCO: (' ' | '\t');
ESPACO_RIGIDO: '\u00A0'; // Espaço rígido.
QUEBRA_DE_LINHA: ('\r\n')+;
BARRA_INCLINADA: '/'; // Barra inclinada.
BARRA_INVERTIDA: '\\'; // Barra invertida.
SINAL_DE_ADICAO: '+'; // Sinal de adição.
PONTO: '.'; // Ponto.
VIRGULA: ','; // Vírgula.
PONTO_E_VIRGULA: ';'; // Ponto e VIRGULA.
DOIS_PONTOS: ':'; // Dois pontos.
ABRE_PARENTESES: '('; // Abre parênteses.
FECHA_PARENTESES: ')'; // Fecha parênteses.
ABRE_COLCHETES: '['; // Abre colchetes.
FECHA_COLCHETES: ']'; // Fecha colchetes.

CARACTERES_IMPRIMIVEIS:
  [\u0020-\u00FF]; // Caracteres imprimíveis do código ASCII Extended. (Codepage Windows 1252)
CARACTERES_DE_CONTROLE:
  [\u0000-\u001F]; // Caracteres de controle do código ASCII Extended. (Codepage Windows 1252)
