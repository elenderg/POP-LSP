grammar PortuguesPuro;

regra_espaco:
  ' '; // regra combina tokens l�xicos com outras regras.

palavra: CARACTERES_IMPRIMIVEIS+;

possessivo_ingl�s: palavra APOSTROFO;
artigo: artigo_definido | artigo_indefinido;
artigo_definido: 'o' | 'a' | 'os' | 'as' | adjacentes;
artigo_indefinido: 'um' | 'uma' | 'uns' | 'umas' | abrangentes;
adjacentes: 'este' | 'esta' | 'estes' | 'estas';
abrangentes: 'esse' | 'essa' | 'esses' | 'essas';
contracoes:
    'ao'
  | '�'
  | 'aos'
  | '�s'
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
  | 'n�o'
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
    '�'
  | 'est�'
  | 'estiver'
  | 'for'
  | 'forem'
  | 's�o'
  | 'est�o'
  | 'estiverem'
  | 'ser'
  | 'serem'
  | 'estar'
  | 'poder'
  | 'puder'
  | 'foi'
  | 'estamos'
  | 'h�'
  | 'pode'
  | 'existe'
  | 'existir'
  | 'cont�m'
  | 'contiver'
  | 'possui'
  | 'possuir';

// --- LEXICAL BNF ---

caracteres_ignoraveis: CARACTERES_DE_CONTROLE | ESPACO_EM_BRANCO | ESPACO_RIGIDO;

comentario: comentario_de_linha | comentario_de_bloco;
comentario_de_linha: BARRA_INVERTIDA CARACTERES_IMPRIMIVEIS* QUEBRA_DE_LINHA;
comentario_de_bloco: ABRE_COLCHETES CARACTERES_IMPRIMIVEIS* FECHA_COLCHETES;


token: aglomerado | possessivo_ingl�s | qualificador | string_literal;
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

tipos_primitivos: 'byte' | 'caractere' | 'word' | 'n�mero' | 
                  'sinalizador' | 'ponteiro' | 'estrutura' | 
                  'string' | 'subtexto' | 'texto hexadecimal' | 
                  'lista' | 'lista estruturada' | 'listas' | 
                  'propor��o' | 'fra��o' | 'numerador' | 'denominador';

tipo: 
    artigo_indefinido nome � artigo_indefinido nome_do_tipo informacao_opcional? PONTO |
    artigo_indefinido nome � artigo_indefinido estrutura com campos PONTO |
    artigo_indefinido nome � numero_inteiro nome_do_tipo PONTO ;

nome: palavra;
nome_do_tipo: nome;

informacao_opcional: para artigo_indefinido nome_do_tipo | com campos;

campos: campo (pausas campo)*;

bytes: 'bytes';
refer�ncia: '(refer�ncia)';
campo: (artigo_indefinido | numero_inteiro bytes) 
       (denominacoes nome | 'sob' artigo_definido nome | refer�ncia)?;

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
  | 'ap�s'
  | 'cerca'
  | 'pr�ximo'
  | 'at�'
  | 'aproximadamente'
  | 'como';

�: '�' | 's�o';
estrutura: 'estrutura';
igual_a: 'igual a';
variavel_global: 
    artigo_definido nome � artigo_indefinido nome_do_tipo informacao_opcional? PONTO |
    artigo_definido nome � artigo_indefinido estrutura com campos PONTO |    
    artigo_definido nome � artigo_indefinido nome_do_tipo igual_a termo_constante PONTO
    artigo_definido nome � termo_constante PONTO |
    ;

rotina: procedimento | decisor | funcao | retroinvocacao;

procedimento:  (rotina2? para que_se nome_da_rotina PONTO_E_VIRGULA |
                rotina2? para que_se nome_da_rotina DOIS_PONTOS) instrucoes;

determine_se: 'determine se';

decisor: rotina2? para que_se determine_se nome_da_rotina PONTO_E_VIRGULA |
                rotina2? para que_se determine_se nome_da_rotina DOIS_PONTOS;

fun��o2: 'Fun��o';
atribua: 'atribua';
funcao: (fun��o2? 
        para que_se atribua 
        artigo_definido nome_do_tipo 
        atribuidores_de_posse nome para
        artigo_indefinido nome_do_tipo PONTO_E_VIRGULA |                
        fun��o2? 
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
invocacao_interna: (unidade_semantica | express�o | frase) qualificador?;
invocacao_externa: processe aspas_duplas nome_da_DLL aspas_duplas aspas_duplas nome_da_funcao aspas_duplas ((com express�o) (e express�o)* (retornando termo)?)?;
aspas_duplas: ASPAS_DUPLAS;
nome_da_DLL: palavra;
nome_da_funcao: palavra;
processe: 'Processe';
com: 'com';
e: 'e';
retornando: 'retornando';
invocacao_indireta: processe express�o (com express�o (e express�o)* (retornando termo)?)?;
retorno: 'Retorne';
decodifique: 'Decodifique';
decodificacao: decodifique numero_hexadecimal;
aponte: 'Aponte';
para_rotina: 'para a rotina';
indirecao: aponte artigo termo para_rotina (unidade_semantica | parametro | frase) qualificador?;
push: 'Push' | 'Empilhe';
empilhamento: push express�o;
reiteracao: 'Reitere';
diga: 'Diga';
retorno_booleano: diga booleano;

express�o: termo (operadores_comuns termo)*;
operadores_comuns:
    'mais'
  | 'menos'
  | 'vezes'
  | 'multiplicado por'
  | 'dividido por'
  | 'junto com'
  | 'seguido de'
  | 'acompanhado de';


booleano: 'sim' | 'n�o';
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
       termo_literal (como artigo_indefinido nome_do_tipo)? (sinal_de_divis�o termo)?;

sinal_de_divis�o: '/';

como: 'tal como';

termo_negativo: '-' termo;
termo_positivo: '+' termo;
variavel_local: (artigo_indefinido nome (denominacoes nome)? ) | (artigo_definido nome atribuidores_de_posse nome);
// era artigo_indefinido nome (denominacoes nome)? possessivos_ingl�s;
variavel: artigo_definido possessivo_portugu�s p2 nome;
// era artigo_definido nome possessivos_ingl�s;
termo_literal: literal possessivos_ingl�s; // ainda n�o est� implementado em portugu�s. Exemplo: "texto"'s comprimento

conte�do: 'conte�do';
magnitude: 'magnitude';
endere�amento: 'endere�amento';

possessivos_ingl�s: (possessivo_ingl�s_antigo)*;
possessivo_ingl�s_antigo: apostrofo (nome | funcao | conte�do| magnitude | endere�amento);
possessivo_portugu�s: (nome | funcao | conte�do | magnitude | endere�amento) p2;

apostrofo: '\'s';

// Uma regra pode ser usada para definir um conjunto de caracteres. Exemplo:

// TOKENS L�XICOS Tokens l�xicos s�o os elementos b�sicos da linguagem que s�o reconhecidos pelo
// analisador l�xico. N�o chamam outras regras.

LETRA: [a-zA-Z�-��-��-�]; // Letras do alfabeto latino com acentos e cedilha.
DIGITO: [0-9]; // D�gitos de 0 a 9.
SIMBOLO:
  [!@#$%^&*()_+{}|:"<>?`\-=[\];',./]; // S�mbolos especiais.
ESPACO: (' ' | '\t' | '\r' | '\n'); // Espa�o em branco.
APOSTROFO: '\''; // Aspas simples.
ASPAS_DUPLAS: '\\"'; // Aspas duplas.
HIFEN: '-'; // HIFEN.
CIFRAO: '$'; // S�mbolo de moeda.
ESPACO_EM_BRANCO: (' ' | '\t');
ESPACO_RIGIDO: '\u00A0'; // Espa�o r�gido.
QUEBRA_DE_LINHA: ('\r\n')+;
BARRA_INCLINADA: '/'; // Barra inclinada.
BARRA_INVERTIDA: '\\'; // Barra invertida.
SINAL_DE_ADICAO: '+'; // Sinal de adi��o.
PONTO: '.'; // Ponto.
VIRGULA: ','; // V�rgula.
PONTO_E_VIRGULA: ';'; // Ponto e VIRGULA.
DOIS_PONTOS: ':'; // Dois pontos.
ABRE_PARENTESES: '('; // Abre par�nteses.
FECHA_PARENTESES: ')'; // Fecha par�nteses.
ABRE_COLCHETES: '['; // Abre colchetes.
FECHA_COLCHETES: ']'; // Fecha colchetes.

CARACTERES_IMPRIMIVEIS:
  [\u0020-\u00FF]; // Caracteres imprim�veis do c�digo ASCII Extended. (Codepage Windows 1252)
CARACTERES_DE_CONTROLE:
  [\u0000-\u001F]; // Caracteres de controle do c�digo ASCII Extended. (Codepage Windows 1252)
