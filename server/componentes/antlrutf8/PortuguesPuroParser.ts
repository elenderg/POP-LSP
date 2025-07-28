// Generated from PortuguesPuro.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import PortuguesPuroListener from "./PortuguesPuroListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class PortuguesPuroParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly T__19 = 20;
	public static readonly T__20 = 21;
	public static readonly T__21 = 22;
	public static readonly T__22 = 23;
	public static readonly T__23 = 24;
	public static readonly T__24 = 25;
	public static readonly T__25 = 26;
	public static readonly T__26 = 27;
	public static readonly T__27 = 28;
	public static readonly T__28 = 29;
	public static readonly T__29 = 30;
	public static readonly T__30 = 31;
	public static readonly T__31 = 32;
	public static readonly T__32 = 33;
	public static readonly T__33 = 34;
	public static readonly T__34 = 35;
	public static readonly T__35 = 36;
	public static readonly T__36 = 37;
	public static readonly T__37 = 38;
	public static readonly T__38 = 39;
	public static readonly T__39 = 40;
	public static readonly T__40 = 41;
	public static readonly T__41 = 42;
	public static readonly T__42 = 43;
	public static readonly T__43 = 44;
	public static readonly T__44 = 45;
	public static readonly T__45 = 46;
	public static readonly T__46 = 47;
	public static readonly T__47 = 48;
	public static readonly T__48 = 49;
	public static readonly T__49 = 50;
	public static readonly T__50 = 51;
	public static readonly T__51 = 52;
	public static readonly T__52 = 53;
	public static readonly T__53 = 54;
	public static readonly T__54 = 55;
	public static readonly T__55 = 56;
	public static readonly T__56 = 57;
	public static readonly T__57 = 58;
	public static readonly T__58 = 59;
	public static readonly T__59 = 60;
	public static readonly T__60 = 61;
	public static readonly T__61 = 62;
	public static readonly T__62 = 63;
	public static readonly T__63 = 64;
	public static readonly T__64 = 65;
	public static readonly T__65 = 66;
	public static readonly T__66 = 67;
	public static readonly T__67 = 68;
	public static readonly T__68 = 69;
	public static readonly T__69 = 70;
	public static readonly T__70 = 71;
	public static readonly T__71 = 72;
	public static readonly T__72 = 73;
	public static readonly T__73 = 74;
	public static readonly T__74 = 75;
	public static readonly T__75 = 76;
	public static readonly T__76 = 77;
	public static readonly T__77 = 78;
	public static readonly T__78 = 79;
	public static readonly T__79 = 80;
	public static readonly T__80 = 81;
	public static readonly T__81 = 82;
	public static readonly T__82 = 83;
	public static readonly T__83 = 84;
	public static readonly T__84 = 85;
	public static readonly T__85 = 86;
	public static readonly T__86 = 87;
	public static readonly T__87 = 88;
	public static readonly T__88 = 89;
	public static readonly T__89 = 90;
	public static readonly T__90 = 91;
	public static readonly T__91 = 92;
	public static readonly T__92 = 93;
	public static readonly T__93 = 94;
	public static readonly T__94 = 95;
	public static readonly T__95 = 96;
	public static readonly T__96 = 97;
	public static readonly T__97 = 98;
	public static readonly T__98 = 99;
	public static readonly T__99 = 100;
	public static readonly T__100 = 101;
	public static readonly T__101 = 102;
	public static readonly T__102 = 103;
	public static readonly T__103 = 104;
	public static readonly T__104 = 105;
	public static readonly T__105 = 106;
	public static readonly T__106 = 107;
	public static readonly T__107 = 108;
	public static readonly T__108 = 109;
	public static readonly T__109 = 110;
	public static readonly T__110 = 111;
	public static readonly T__111 = 112;
	public static readonly T__112 = 113;
	public static readonly T__113 = 114;
	public static readonly T__114 = 115;
	public static readonly T__115 = 116;
	public static readonly T__116 = 117;
	public static readonly T__117 = 118;
	public static readonly T__118 = 119;
	public static readonly T__119 = 120;
	public static readonly T__120 = 121;
	public static readonly T__121 = 122;
	public static readonly T__122 = 123;
	public static readonly T__123 = 124;
	public static readonly T__124 = 125;
	public static readonly T__125 = 126;
	public static readonly T__126 = 127;
	public static readonly T__127 = 128;
	public static readonly T__128 = 129;
	public static readonly T__129 = 130;
	public static readonly T__130 = 131;
	public static readonly T__131 = 132;
	public static readonly T__132 = 133;
	public static readonly T__133 = 134;
	public static readonly T__134 = 135;
	public static readonly T__135 = 136;
	public static readonly T__136 = 137;
	public static readonly T__137 = 138;
	public static readonly T__138 = 139;
	public static readonly T__139 = 140;
	public static readonly T__140 = 141;
	public static readonly T__141 = 142;
	public static readonly T__142 = 143;
	public static readonly T__143 = 144;
	public static readonly T__144 = 145;
	public static readonly T__145 = 146;
	public static readonly T__146 = 147;
	public static readonly T__147 = 148;
	public static readonly T__148 = 149;
	public static readonly T__149 = 150;
	public static readonly T__150 = 151;
	public static readonly T__151 = 152;
	public static readonly T__152 = 153;
	public static readonly T__153 = 154;
	public static readonly T__154 = 155;
	public static readonly T__155 = 156;
	public static readonly T__156 = 157;
	public static readonly T__157 = 158;
	public static readonly T__158 = 159;
	public static readonly T__159 = 160;
	public static readonly T__160 = 161;
	public static readonly T__161 = 162;
	public static readonly T__162 = 163;
	public static readonly T__163 = 164;
	public static readonly T__164 = 165;
	public static readonly T__165 = 166;
	public static readonly T__166 = 167;
	public static readonly T__167 = 168;
	public static readonly T__168 = 169;
	public static readonly T__169 = 170;
	public static readonly T__170 = 171;
	public static readonly T__171 = 172;
	public static readonly T__172 = 173;
	public static readonly T__173 = 174;
	public static readonly T__174 = 175;
	public static readonly T__175 = 176;
	public static readonly T__176 = 177;
	public static readonly T__177 = 178;
	public static readonly T__178 = 179;
	public static readonly T__179 = 180;
	public static readonly T__180 = 181;
	public static readonly T__181 = 182;
	public static readonly T__182 = 183;
	public static readonly T__183 = 184;
	public static readonly T__184 = 185;
	public static readonly LETRA = 186;
	public static readonly DIGITO = 187;
	public static readonly SIMBOLO = 188;
	public static readonly ESPACO = 189;
	public static readonly APOSTROFO = 190;
	public static readonly ASPAS_DUPLAS = 191;
	public static readonly HIFEN = 192;
	public static readonly CIFRAO = 193;
	public static readonly ESPACO_EM_BRANCO = 194;
	public static readonly ESPACO_RIGIDO = 195;
	public static readonly QUEBRA_DE_LINHA = 196;
	public static readonly BARRA_INCLINADA = 197;
	public static readonly BARRA_INVERTIDA = 198;
	public static readonly SINAL_DE_ADICAO = 199;
	public static readonly PONTO = 200;
	public static readonly VIRGULA = 201;
	public static readonly PONTO_E_VIRGULA = 202;
	public static readonly DOIS_PONTOS = 203;
	public static readonly ABRE_PARENTESES = 204;
	public static readonly FECHA_PARENTESES = 205;
	public static readonly ABRE_COLCHETES = 206;
	public static readonly FECHA_COLCHETES = 207;
	public static readonly CARACTERES_IMPRIMIVEIS = 208;
	public static readonly CARACTERES_DE_CONTROLE = 209;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_regra_espaco = 0;
	public static readonly RULE_palavra = 1;
	public static readonly RULE_possessivo = 2;
	public static readonly RULE_artigo = 3;
	public static readonly RULE_artigo_definido = 4;
	public static readonly RULE_artigo_indefinido = 5;
	public static readonly RULE_adjacentes = 6;
	public static readonly RULE_abrangentes = 7;
	public static readonly RULE_contracoes = 8;
	public static readonly RULE_atribuidores_de_posse = 9;
	public static readonly RULE_p1 = 10;
	public static readonly RULE_p2 = 11;
	public static readonly RULE_operadores_de_comparacao = 12;
	public static readonly RULE_palavras_reservadas = 13;
	public static readonly RULE_denominacoes = 14;
	public static readonly RULE_verbos = 15;
	public static readonly RULE_caracteres_ignoraveis = 16;
	public static readonly RULE_comentario = 17;
	public static readonly RULE_comentario_de_linha = 18;
	public static readonly RULE_comentario_de_bloco = 19;
	public static readonly RULE_token = 20;
	public static readonly RULE_aglomerado = 21;
	public static readonly RULE_caractere_aglomeravel = 22;
	public static readonly RULE_iniciador_de_aglomerado = 23;
	public static readonly RULE_possessivo_novo = 24;
	public static readonly RULE_qualificador = 25;
	public static readonly RULE_caractere_nao_aglomeravel = 26;
	public static readonly RULE_sinal_de_pontuacao = 27;
	public static readonly RULE_simbolos_especiais = 28;
	public static readonly RULE_noise = 29;
	public static readonly RULE_numero_inteiro = 30;
	public static readonly RULE_numero_decimal = 31;
	public static readonly RULE_numero_fracionario = 32;
	public static readonly RULE_numero_misto = 33;
	public static readonly RULE_numero_hexadecimal = 34;
	public static readonly RULE_string_literal = 35;
	public static readonly RULE_programa = 36;
	public static readonly RULE_tipos_primitivos = 37;
	public static readonly RULE_tipo = 38;
	public static readonly RULE_nome = 39;
	public static readonly RULE_nome_do_tipo = 40;
	public static readonly RULE_informacao_opcional = 41;
	public static readonly RULE_campos = 42;
	public static readonly RULE_campo = 43;
	public static readonly RULE_pausa = 44;
	public static readonly RULE_pausas = 45;
	public static readonly RULE_conjuncoes = 46;
	public static readonly RULE_preposicoes = 47;
	public static readonly RULE_variavel_global = 48;
	public static readonly RULE_rotina = 49;
	public static readonly RULE_procedimento = 50;
	public static readonly RULE_decisor = 51;
	public static readonly RULE_funcao = 52;
	public static readonly RULE_retroinvocacao = 53;
	public static readonly RULE_nome_da_rotina = 54;
	public static readonly RULE_unidade_semantica = 55;
	public static readonly RULE_parametro = 56;
	public static readonly RULE_frase = 57;
	public static readonly RULE_instrucoes = 58;
	public static readonly RULE_instrucao = 59;
	public static readonly RULE_preservacao = 60;
	public static readonly RULE_iteracao = 61;
	public static readonly RULE_condicional = 62;
	public static readonly RULE_expressao_decisora = 63;
	public static readonly RULE_incondicional = 64;
	public static readonly RULE_interrupcao = 65;
	public static readonly RULE_invocacao = 66;
	public static readonly RULE_invocacao_interna = 67;
	public static readonly RULE_invocacao_externa = 68;
	public static readonly RULE_nome_da_DLL = 69;
	public static readonly RULE_nome_da_funcao = 70;
	public static readonly RULE_invocacao_indireta = 71;
	public static readonly RULE_retorno = 72;
	public static readonly RULE_decodificacao = 73;
	public static readonly RULE_indirecao = 74;
	public static readonly RULE_empilhamento = 75;
	public static readonly RULE_reiteracao = 76;
	public static readonly RULE_retorno_booleano = 77;
	public static readonly RULE_expressao = 78;
	public static readonly RULE_operadores_comuns = 79;
	public static readonly RULE_termo_constante = 80;
	public static readonly RULE_termo_constante_negativo = 81;
	public static readonly RULE_termo_constante_positivo = 82;
	public static readonly RULE_numero = 83;
	public static readonly RULE_literal = 84;
	public static readonly RULE_termo = 85;
	public static readonly RULE_termo_negativo = 86;
	public static readonly RULE_termo_positivo = 87;
	public static readonly RULE_variavel_local = 88;
	public static readonly RULE_variavel = 89;
	public static readonly RULE_termo_literal = 90;
	public static readonly RULE_possessivos = 91;
	public static readonly RULE_possessivo_antigo = 92;
	public static readonly literalNames: (string | null)[] = [ null, "' '", 
                                                            "'o'", "'a'", 
                                                            "'os'", "'as'", 
                                                            "'um'", "'uma'", 
                                                            "'uns'", "'umas'", 
                                                            "'este'", "'esta'", 
                                                            "'estes'", "'estas'", 
                                                            "'esse'", "'essa'", 
                                                            "'esses'", "'essas'", 
                                                            "'ao'", "'\\u00C3\\u00A0'", 
                                                            "'aos'", "'\\u00C3\\u00A0s'", 
                                                            "'no'", "'na'", 
                                                            "'nos'", "'nas'", 
                                                            "'pelo'", "'pela'", 
                                                            "'pelos'", "'pelas'", 
                                                            "'num'", "'numa'", 
                                                            "'nuns'", "'numas'", 
                                                            "'dum'", "'duma'", 
                                                            "'duns'", "'dumas'", 
                                                            "'desse'", "'dessa'", 
                                                            "'desses'", 
                                                            "'dessas'", 
                                                            "'deste'", "'desta'", 
                                                            "'destes'", 
                                                            "'destas'", 
                                                            "'igual a'", 
                                                            "'diferente de'", 
                                                            "'maior que'", 
                                                            "'maior do que'", 
                                                            "'maior ou igual a'", 
                                                            "'menor que'", 
                                                            "'menor do que'", 
                                                            "'menor ou igual a'", 
                                                            "'Se'", "'Itere'", 
                                                            "'Reitere'", 
                                                            "'Pare'", "'Retorne'", 
                                                            "'Preserve'", 
                                                            "'Diga'", "'sim'", 
                                                            "'n\\u00C3\\u00A3o'", 
                                                            "'original'", 
                                                            "'Decodifique'", 
                                                            "'Processe'", 
                                                            "'retornando'", 
                                                            "'Push'", "'Pop'", 
                                                            "'nulo'", "'vazio'", 
                                                            "'inexistente'", 
                                                            "'denominado'", 
                                                            "'denominada'", 
                                                            "'denominados'", 
                                                            "'denominadas'", 
                                                            "'chamado'", 
                                                            "'chamada'", 
                                                            "'chamados'", 
                                                            "'chamadas'", 
                                                            "'\\u00C3\\u00A9'", 
                                                            "'est\\u00C3\\u00A1'", 
                                                            "'estiver'", 
                                                            "'for'", "'forem'", 
                                                            "'s\\u00C3\\u00A3o'", 
                                                            "'est\\u00C3\\u00A3o'", 
                                                            "'estiverem'", 
                                                            "'ser'", "'serem'", 
                                                            "'estar'", "'poder'", 
                                                            "'puder'", "'foi'", 
                                                            "'estamos'", 
                                                            "'h\\u00C3\\u00A1'", 
                                                            "'pode'", "'existe'", 
                                                            "'existir'", 
                                                            "'cont\\u00C3\\u00A9m'", 
                                                            "'contiver'", 
                                                            "'possui'", 
                                                            "'possuir'", 
                                                            "'~'", "'@'", 
                                                            "'#'", "'%'", 
                                                            "'_'", "'&'", 
                                                            "''s'", "'!'", 
                                                            "'?'", "'|'", 
                                                            "'*'", "'^'", 
                                                            "'<'", "'>'", 
                                                            "'{'", "'}'", 
                                                            "'byte'", "'caractere'", 
                                                            "'word'", "'n\\u00C3\\u00BAmero'", 
                                                            "'sinalizador'", 
                                                            "'ponteiro'", 
                                                            "'estrutura'", 
                                                            "'string'", 
                                                            "'subtexto'", 
                                                            "'texto hexadecimal'", 
                                                            "'lista'", "'lista estruturada'", 
                                                            "'listas'", 
                                                            "'propor\\u00C3\\u00A7\\u00C3\\u00A3o'", 
                                                            "'fra\\u00C3\\u00A7\\u00C3\\u00A3o'", 
                                                            "'numerador'", 
                                                            "'denominador'", 
                                                            "'\\u00C3\\u00A9 uma estrutura com'", 
                                                            "'para'", "'com'", 
                                                            "'bytes'", "'sob'", 
                                                            "'(refer\\u00C3\\u00AAncia)'", 
                                                            "'e'", "'ou'", 
                                                            "'nem'", "'usando'", 
                                                            "'por'", "'contendo'", 
                                                            "'desde'", "'entre'", 
                                                            "'sobre'", "'cima'", 
                                                            "'embaixo'", 
                                                            "'abaixo'", 
                                                            "'antes'", "'depois'", 
                                                            "'ap\\u00C3\\u00B3s'", 
                                                            "'cerca'", "'pr\\u00C3\\u00B3ximo'", 
                                                            "'at\\u00C3\\u00A9'", 
                                                            "'aproximadamente'", 
                                                            "'como'", "'Rotina'", 
                                                            "'para que se'", 
                                                            "'para que se determine se'", 
                                                            "'Fun\\u00C3\\u00A7\\u00C3\\u00A3o'", 
                                                            "'para que se atribua'", 
                                                            "'para que se compativelmente'", 
                                                            "'Itere.'", 
                                                            "'\"'", "'Aponte'", 
                                                            "'para a rotina'", 
                                                            "'Diga sim'", 
                                                            "'Diga n\\u00C3\\u00A3o'", 
                                                            "'mais'", "'menos'", 
                                                            "'vezes'", "'multiplicado por'", 
                                                            "'dividido por'", 
                                                            "'junto com'", 
                                                            "'seguido de'", 
                                                            "'acompanhado de'", 
                                                            "'inexistene'", 
                                                            "'conte\\u00C3\\u00BAdo'", 
                                                            "'magnitude'", 
                                                            "'endere\\u00C3\\u00A7amento'", 
                                                            null, null, 
                                                            null, null, 
                                                            "'''", "'\\\"'", 
                                                            "'-'", "'$'", 
                                                            null, "'\\u00A0'", 
                                                            null, "'/'", 
                                                            "'\\'", "'+'", 
                                                            "'.'", "','", 
                                                            "';'", "':'", 
                                                            "'('", "')'", 
                                                            "'['", "']'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             "LETRA", "DIGITO", 
                                                             "SIMBOLO", 
                                                             "ESPACO", "APOSTROFO", 
                                                             "ASPAS_DUPLAS", 
                                                             "HIFEN", "CIFRAO", 
                                                             "ESPACO_EM_BRANCO", 
                                                             "ESPACO_RIGIDO", 
                                                             "QUEBRA_DE_LINHA", 
                                                             "BARRA_INCLINADA", 
                                                             "BARRA_INVERTIDA", 
                                                             "SINAL_DE_ADICAO", 
                                                             "PONTO", "VIRGULA", 
                                                             "PONTO_E_VIRGULA", 
                                                             "DOIS_PONTOS", 
                                                             "ABRE_PARENTESES", 
                                                             "FECHA_PARENTESES", 
                                                             "ABRE_COLCHETES", 
                                                             "FECHA_COLCHETES", 
                                                             "CARACTERES_IMPRIMIVEIS", 
                                                             "CARACTERES_DE_CONTROLE" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"regra_espaco", "palavra", "possessivo", "artigo", "artigo_definido", 
		"artigo_indefinido", "adjacentes", "abrangentes", "contracoes", "atribuidores_de_posse", 
		"p1", "p2", "operadores_de_comparacao", "palavras_reservadas", "denominacoes", 
		"verbos", "caracteres_ignoraveis", "comentario", "comentario_de_linha", 
		"comentario_de_bloco", "token", "aglomerado", "caractere_aglomeravel", 
		"iniciador_de_aglomerado", "possessivo_novo", "qualificador", "caractere_nao_aglomeravel", 
		"sinal_de_pontuacao", "simbolos_especiais", "noise", "numero_inteiro", 
		"numero_decimal", "numero_fracionario", "numero_misto", "numero_hexadecimal", 
		"string_literal", "programa", "tipos_primitivos", "tipo", "nome", "nome_do_tipo", 
		"informacao_opcional", "campos", "campo", "pausa", "pausas", "conjuncoes", 
		"preposicoes", "variavel_global", "rotina", "procedimento", "decisor", 
		"funcao", "retroinvocacao", "nome_da_rotina", "unidade_semantica", "parametro", 
		"frase", "instrucoes", "instrucao", "preservacao", "iteracao", "condicional", 
		"expressao_decisora", "incondicional", "interrupcao", "invocacao", "invocacao_interna", 
		"invocacao_externa", "nome_da_DLL", "nome_da_funcao", "invocacao_indireta", 
		"retorno", "decodificacao", "indirecao", "empilhamento", "reiteracao", 
		"retorno_booleano", "expressao", "operadores_comuns", "termo_constante", 
		"termo_constante_negativo", "termo_constante_positivo", "numero", "literal", 
		"termo", "termo_negativo", "termo_positivo", "variavel_local", "variavel", 
		"termo_literal", "possessivos", "possessivo_antigo",
	];
	public get grammarFileName(): string { return "PortuguesPuro.g4"; }
	public get literalNames(): (string | null)[] { return PortuguesPuroParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return PortuguesPuroParser.symbolicNames; }
	public get ruleNames(): string[] { return PortuguesPuroParser.ruleNames; }
	public get serializedATN(): number[] { return PortuguesPuroParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, PortuguesPuroParser._ATN, PortuguesPuroParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public regra_espaco(): Regra_espacoContext {
		let localctx: Regra_espacoContext = new Regra_espacoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, PortuguesPuroParser.RULE_regra_espaco);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 186;
			this.match(PortuguesPuroParser.T__0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public palavra(): PalavraContext {
		let localctx: PalavraContext = new PalavraContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, PortuguesPuroParser.RULE_palavra);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 189;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 188;
					this.match(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 191;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 0, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public possessivo(): PossessivoContext {
		let localctx: PossessivoContext = new PossessivoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, PortuguesPuroParser.RULE_possessivo);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 193;
			this.palavra();
			this.state = 194;
			this.match(PortuguesPuroParser.APOSTROFO);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public artigo(): ArtigoContext {
		let localctx: ArtigoContext = new ArtigoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, PortuguesPuroParser.RULE_artigo);
		try {
			this.state = 198;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 2:
			case 3:
			case 4:
			case 5:
			case 10:
			case 11:
			case 12:
			case 13:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 196;
				this.artigo_definido();
				}
				break;
			case 6:
			case 7:
			case 8:
			case 9:
			case 14:
			case 15:
			case 16:
			case 17:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 197;
				this.artigo_indefinido();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public artigo_definido(): Artigo_definidoContext {
		let localctx: Artigo_definidoContext = new Artigo_definidoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, PortuguesPuroParser.RULE_artigo_definido);
		try {
			this.state = 205;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 2:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 200;
				this.match(PortuguesPuroParser.T__1);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 201;
				this.match(PortuguesPuroParser.T__2);
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 202;
				this.match(PortuguesPuroParser.T__3);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 203;
				this.match(PortuguesPuroParser.T__4);
				}
				break;
			case 10:
			case 11:
			case 12:
			case 13:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 204;
				this.adjacentes();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public artigo_indefinido(): Artigo_indefinidoContext {
		let localctx: Artigo_indefinidoContext = new Artigo_indefinidoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, PortuguesPuroParser.RULE_artigo_indefinido);
		try {
			this.state = 212;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 6:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 207;
				this.match(PortuguesPuroParser.T__5);
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 208;
				this.match(PortuguesPuroParser.T__6);
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 209;
				this.match(PortuguesPuroParser.T__7);
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 210;
				this.match(PortuguesPuroParser.T__8);
				}
				break;
			case 14:
			case 15:
			case 16:
			case 17:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 211;
				this.abrangentes();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public adjacentes(): AdjacentesContext {
		let localctx: AdjacentesContext = new AdjacentesContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, PortuguesPuroParser.RULE_adjacentes);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 214;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 15360) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public abrangentes(): AbrangentesContext {
		let localctx: AbrangentesContext = new AbrangentesContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, PortuguesPuroParser.RULE_abrangentes);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 216;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 245760) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public contracoes(): ContracoesContext {
		let localctx: ContracoesContext = new ContracoesContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, PortuguesPuroParser.RULE_contracoes);
		try {
			this.state = 237;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 18:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 218;
				this.match(PortuguesPuroParser.T__17);
				}
				break;
			case 19:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 219;
				this.match(PortuguesPuroParser.T__18);
				}
				break;
			case 20:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 220;
				this.match(PortuguesPuroParser.T__19);
				}
				break;
			case 21:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 221;
				this.match(PortuguesPuroParser.T__20);
				}
				break;
			case 22:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 222;
				this.match(PortuguesPuroParser.T__21);
				}
				break;
			case 23:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 223;
				this.match(PortuguesPuroParser.T__22);
				}
				break;
			case 24:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 224;
				this.match(PortuguesPuroParser.T__23);
				}
				break;
			case 25:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 225;
				this.match(PortuguesPuroParser.T__24);
				}
				break;
			case 26:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 226;
				this.match(PortuguesPuroParser.T__25);
				}
				break;
			case 27:
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 227;
				this.match(PortuguesPuroParser.T__26);
				}
				break;
			case 28:
				this.enterOuterAlt(localctx, 11);
				{
				this.state = 228;
				this.match(PortuguesPuroParser.T__27);
				}
				break;
			case 29:
				this.enterOuterAlt(localctx, 12);
				{
				this.state = 229;
				this.match(PortuguesPuroParser.T__28);
				}
				break;
			case 30:
				this.enterOuterAlt(localctx, 13);
				{
				this.state = 230;
				this.match(PortuguesPuroParser.T__29);
				}
				break;
			case 31:
				this.enterOuterAlt(localctx, 14);
				{
				this.state = 231;
				this.match(PortuguesPuroParser.T__30);
				}
				break;
			case 32:
				this.enterOuterAlt(localctx, 15);
				{
				this.state = 232;
				this.match(PortuguesPuroParser.T__31);
				}
				break;
			case 33:
				this.enterOuterAlt(localctx, 16);
				{
				this.state = 233;
				this.match(PortuguesPuroParser.T__32);
				}
				break;
			case 34:
			case 35:
			case 36:
			case 37:
				this.enterOuterAlt(localctx, 17);
				{
				this.state = 234;
				this.atribuidores_de_posse();
				}
				break;
			case 38:
			case 39:
			case 40:
			case 41:
				this.enterOuterAlt(localctx, 18);
				{
				this.state = 235;
				this.p1();
				}
				break;
			case 42:
			case 43:
			case 44:
			case 45:
				this.enterOuterAlt(localctx, 19);
				{
				this.state = 236;
				this.p2();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public atribuidores_de_posse(): Atribuidores_de_posseContext {
		let localctx: Atribuidores_de_posseContext = new Atribuidores_de_posseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, PortuguesPuroParser.RULE_atribuidores_de_posse);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 239;
			_la = this._input.LA(1);
			if(!(((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & 15) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public p1(): P1Context {
		let localctx: P1Context = new P1Context(this, this._ctx, this.state);
		this.enterRule(localctx, 20, PortuguesPuroParser.RULE_p1);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 241;
			_la = this._input.LA(1);
			if(!(((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 15) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public p2(): P2Context {
		let localctx: P2Context = new P2Context(this, this._ctx, this.state);
		this.enterRule(localctx, 22, PortuguesPuroParser.RULE_p2);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 243;
			_la = this._input.LA(1);
			if(!(((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 15) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public operadores_de_comparacao(): Operadores_de_comparacaoContext {
		let localctx: Operadores_de_comparacaoContext = new Operadores_de_comparacaoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, PortuguesPuroParser.RULE_operadores_de_comparacao);
		try {
			this.state = 254;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case -1:
				this.enterOuterAlt(localctx, 1);
				// tslint:disable-next-line:no-empty
				{
				}
				break;
			case 46:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 246;
				this.match(PortuguesPuroParser.T__45);
				}
				break;
			case 47:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 247;
				this.match(PortuguesPuroParser.T__46);
				}
				break;
			case 48:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 248;
				this.match(PortuguesPuroParser.T__47);
				}
				break;
			case 49:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 249;
				this.match(PortuguesPuroParser.T__48);
				}
				break;
			case 50:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 250;
				this.match(PortuguesPuroParser.T__49);
				}
				break;
			case 51:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 251;
				this.match(PortuguesPuroParser.T__50);
				}
				break;
			case 52:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 252;
				this.match(PortuguesPuroParser.T__51);
				}
				break;
			case 53:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 253;
				this.match(PortuguesPuroParser.T__52);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public palavras_reservadas(): Palavras_reservadasContext {
		let localctx: Palavras_reservadasContext = new Palavras_reservadasContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, PortuguesPuroParser.RULE_palavras_reservadas);
		try {
			this.state = 275;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 54:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 256;
				this.match(PortuguesPuroParser.T__53);
				}
				break;
			case 55:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 257;
				this.match(PortuguesPuroParser.T__54);
				}
				break;
			case 56:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 258;
				this.match(PortuguesPuroParser.T__55);
				}
				break;
			case 57:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 259;
				this.match(PortuguesPuroParser.T__56);
				}
				break;
			case 58:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 260;
				this.match(PortuguesPuroParser.T__57);
				}
				break;
			case 59:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 261;
				this.match(PortuguesPuroParser.T__58);
				}
				break;
			case 60:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 262;
				this.match(PortuguesPuroParser.T__59);
				}
				break;
			case 61:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 263;
				this.match(PortuguesPuroParser.T__60);
				}
				break;
			case 62:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 264;
				this.match(PortuguesPuroParser.T__61);
				}
				break;
			case 63:
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 265;
				this.match(PortuguesPuroParser.T__62);
				}
				break;
			case 64:
				this.enterOuterAlt(localctx, 11);
				{
				this.state = 266;
				this.match(PortuguesPuroParser.T__63);
				}
				break;
			case 65:
				this.enterOuterAlt(localctx, 12);
				{
				this.state = 267;
				this.match(PortuguesPuroParser.T__64);
				}
				break;
			case 66:
				this.enterOuterAlt(localctx, 13);
				{
				this.state = 268;
				this.match(PortuguesPuroParser.T__65);
				}
				break;
			case 67:
				this.enterOuterAlt(localctx, 14);
				{
				this.state = 269;
				this.match(PortuguesPuroParser.T__66);
				}
				break;
			case 68:
				this.enterOuterAlt(localctx, 15);
				{
				this.state = 270;
				this.match(PortuguesPuroParser.T__67);
				}
				break;
			case 69:
				this.enterOuterAlt(localctx, 16);
				{
				this.state = 271;
				this.match(PortuguesPuroParser.T__68);
				}
				break;
			case 70:
				this.enterOuterAlt(localctx, 17);
				{
				this.state = 272;
				this.match(PortuguesPuroParser.T__69);
				}
				break;
			case 71:
				this.enterOuterAlt(localctx, 18);
				{
				this.state = 273;
				this.match(PortuguesPuroParser.T__70);
				}
				break;
			case 72:
			case 73:
			case 74:
			case 75:
			case 76:
			case 77:
			case 78:
			case 79:
				this.enterOuterAlt(localctx, 19);
				{
				this.state = 274;
				this.denominacoes();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public denominacoes(): DenominacoesContext {
		let localctx: DenominacoesContext = new DenominacoesContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, PortuguesPuroParser.RULE_denominacoes);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 277;
			_la = this._input.LA(1);
			if(!(((((_la - 72)) & ~0x1F) === 0 && ((1 << (_la - 72)) & 255) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public verbos(): VerbosContext {
		let localctx: VerbosContext = new VerbosContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, PortuguesPuroParser.RULE_verbos);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 279;
			_la = this._input.LA(1);
			if(!(((((_la - 80)) & ~0x1F) === 0 && ((1 << (_la - 80)) & 8388607) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public caracteres_ignoraveis(): Caracteres_ignoraveisContext {
		let localctx: Caracteres_ignoraveisContext = new Caracteres_ignoraveisContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, PortuguesPuroParser.RULE_caracteres_ignoraveis);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 281;
			_la = this._input.LA(1);
			if(!(((((_la - 194)) & ~0x1F) === 0 && ((1 << (_la - 194)) & 32771) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public comentario(): ComentarioContext {
		let localctx: ComentarioContext = new ComentarioContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, PortuguesPuroParser.RULE_comentario);
		try {
			this.state = 285;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 198:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 283;
				this.comentario_de_linha();
				}
				break;
			case 206:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 284;
				this.comentario_de_bloco();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public comentario_de_linha(): Comentario_de_linhaContext {
		let localctx: Comentario_de_linhaContext = new Comentario_de_linhaContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, PortuguesPuroParser.RULE_comentario_de_linha);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 287;
			this.match(PortuguesPuroParser.BARRA_INVERTIDA);
			this.state = 291;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===208) {
				{
				{
				this.state = 288;
				this.match(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
				}
				}
				this.state = 293;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 294;
			this.match(PortuguesPuroParser.QUEBRA_DE_LINHA);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public comentario_de_bloco(): Comentario_de_blocoContext {
		let localctx: Comentario_de_blocoContext = new Comentario_de_blocoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, PortuguesPuroParser.RULE_comentario_de_bloco);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 296;
			this.match(PortuguesPuroParser.ABRE_COLCHETES);
			this.state = 300;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===208) {
				{
				{
				this.state = 297;
				this.match(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
				}
				}
				this.state = 302;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 303;
			this.match(PortuguesPuroParser.FECHA_COLCHETES);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public token(): TokenContext {
		let localctx: TokenContext = new TokenContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, PortuguesPuroParser.RULE_token);
		try {
			this.state = 309;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 103:
			case 104:
			case 105:
			case 106:
			case 107:
			case 108:
			case 186:
			case 187:
			case 190:
			case 193:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 305;
				this.aglomerado();
				}
				break;
			case 208:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 306;
				this.possessivo();
				}
				break;
			case 204:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 307;
				this.qualificador();
				}
				break;
			case 191:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 308;
				this.string_literal();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public aglomerado(): AglomeradoContext {
		let localctx: AglomeradoContext = new AglomeradoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, PortuguesPuroParser.RULE_aglomerado);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 311;
			this.iniciador_de_aglomerado();
			{
			this.state = 312;
			this.caractere_aglomeravel();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public caractere_aglomeravel(): Caractere_aglomeravelContext {
		let localctx: Caractere_aglomeravelContext = new Caractere_aglomeravelContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, PortuguesPuroParser.RULE_caractere_aglomeravel);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 314;
			_la = this._input.LA(1);
			if(!(((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 63) !== 0) || ((((_la - 186)) & ~0x1F) === 0 && ((1 << (_la - 186)) & 10435) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public iniciador_de_aglomerado(): Iniciador_de_aglomeradoContext {
		let localctx: Iniciador_de_aglomeradoContext = new Iniciador_de_aglomeradoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, PortuguesPuroParser.RULE_iniciador_de_aglomerado);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 316;
			_la = this._input.LA(1);
			if(!(((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 63) !== 0) || ((((_la - 186)) & ~0x1F) === 0 && ((1 << (_la - 186)) & 147) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public possessivo_novo(): Possessivo_novoContext {
		let localctx: Possessivo_novoContext = new Possessivo_novoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, PortuguesPuroParser.RULE_possessivo_novo);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 318;
			this.match(PortuguesPuroParser.T__108);
			this.state = 319;
			this.caractere_nao_aglomeravel();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public qualificador(): QualificadorContext {
		let localctx: QualificadorContext = new QualificadorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, PortuguesPuroParser.RULE_qualificador);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 321;
			this.match(PortuguesPuroParser.ABRE_PARENTESES);
			this.state = 325;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===208) {
				{
				{
				this.state = 322;
				this.match(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
				}
				}
				this.state = 327;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 328;
			this.match(PortuguesPuroParser.FECHA_PARENTESES);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public caractere_nao_aglomeravel(): Caractere_nao_aglomeravelContext {
		let localctx: Caractere_nao_aglomeravelContext = new Caractere_nao_aglomeravelContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, PortuguesPuroParser.RULE_caractere_nao_aglomeravel);
		let _la: number;
		try {
			this.state = 342;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 12, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 330;
				_la = this._input.LA(1);
				if(_la<=0 || _la===186) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 331;
				_la = this._input.LA(1);
				if(_la<=0 || _la===187) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 332;
				_la = this._input.LA(1);
				if(_la<=0 || _la===103) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 333;
				_la = this._input.LA(1);
				if(_la<=0 || _la===104) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 334;
				_la = this._input.LA(1);
				if(_la<=0 || _la===105) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 335;
				_la = this._input.LA(1);
				if(_la<=0 || _la===106) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 336;
				_la = this._input.LA(1);
				if(_la<=0 || _la===107) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 337;
				_la = this._input.LA(1);
				if(_la<=0 || _la===193) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 338;
				_la = this._input.LA(1);
				if(_la<=0 || _la===108) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 10:
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 339;
				_la = this._input.LA(1);
				if(_la<=0 || _la===192) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 11:
				this.enterOuterAlt(localctx, 11);
				{
				this.state = 340;
				_la = this._input.LA(1);
				if(_la<=0 || _la===199) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 12:
				this.enterOuterAlt(localctx, 12);
				{
				this.state = 341;
				_la = this._input.LA(1);
				if(_la<=0 || _la===197) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public sinal_de_pontuacao(): Sinal_de_pontuacaoContext {
		let localctx: Sinal_de_pontuacaoContext = new Sinal_de_pontuacaoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, PortuguesPuroParser.RULE_sinal_de_pontuacao);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 344;
			_la = this._input.LA(1);
			if(!(_la===110 || _la===111 || ((((_la - 200)) & ~0x1F) === 0 && ((1 << (_la - 200)) & 15) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public simbolos_especiais(): Simbolos_especiaisContext {
		let localctx: Simbolos_especiaisContext = new Simbolos_especiaisContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, PortuguesPuroParser.RULE_simbolos_especiais);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 346;
			_la = this._input.LA(1);
			if(!(((((_la - 112)) & ~0x1F) === 0 && ((1 << (_la - 112)) & 127) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 161) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public noise(): NoiseContext {
		let localctx: NoiseContext = new NoiseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, PortuguesPuroParser.RULE_noise);
		try {
			this.state = 351;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 194:
			case 195:
			case 209:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 348;
				this.caracteres_ignoraveis();
				}
				break;
			case 198:
			case 206:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 349;
				this.comentario();
				}
				break;
			case 204:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 350;
				this.qualificador();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public numero_inteiro(): Numero_inteiroContext {
		let localctx: Numero_inteiroContext = new Numero_inteiroContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, PortuguesPuroParser.RULE_numero_inteiro);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 354;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 353;
				this.match(PortuguesPuroParser.DIGITO);
				}
				}
				this.state = 356;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===187);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public numero_decimal(): Numero_decimalContext {
		let localctx: Numero_decimalContext = new Numero_decimalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, PortuguesPuroParser.RULE_numero_decimal);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 359;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===192) {
				{
				this.state = 358;
				this.match(PortuguesPuroParser.HIFEN);
				}
			}

			this.state = 361;
			this.numero_inteiro();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public numero_fracionario(): Numero_fracionarioContext {
		let localctx: Numero_fracionarioContext = new Numero_fracionarioContext(this, this._ctx, this.state);
		this.enterRule(localctx, 64, PortuguesPuroParser.RULE_numero_fracionario);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 363;
			this.numero_decimal();
			this.state = 364;
			this.match(PortuguesPuroParser.BARRA_INCLINADA);
			this.state = 365;
			this.numero_inteiro();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public numero_misto(): Numero_mistoContext {
		let localctx: Numero_mistoContext = new Numero_mistoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 66, PortuguesPuroParser.RULE_numero_misto);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 367;
			this.numero_decimal();
			this.state = 368;
			this.match(PortuguesPuroParser.SINAL_DE_ADICAO);
			this.state = 369;
			this.numero_fracionario();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public numero_hexadecimal(): Numero_hexadecimalContext {
		let localctx: Numero_hexadecimalContext = new Numero_hexadecimalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 68, PortuguesPuroParser.RULE_numero_hexadecimal);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 371;
			this.match(PortuguesPuroParser.CIFRAO);
			this.state = 372;
			this.numero_inteiro();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public string_literal(): String_literalContext {
		let localctx: String_literalContext = new String_literalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 70, PortuguesPuroParser.RULE_string_literal);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 374;
			this.match(PortuguesPuroParser.ASPAS_DUPLAS);
			this.state = 378;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===208) {
				{
				{
				this.state = 375;
				this.match(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
				}
				}
				this.state = 380;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 381;
			this.match(PortuguesPuroParser.ASPAS_DUPLAS);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public programa(): ProgramaContext {
		let localctx: ProgramaContext = new ProgramaContext(this, this._ctx, this.state);
		this.enterRule(localctx, 72, PortuguesPuroParser.RULE_programa);
		try {
			this.state = 386;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 6:
			case 7:
			case 8:
			case 9:
			case 14:
			case 15:
			case 16:
			case 17:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 383;
				this.tipo();
				}
				break;
			case -1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 10:
			case 11:
			case 12:
			case 13:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 384;
				this.variavel_global();
				}
				break;
			case 162:
			case 163:
			case 164:
			case 165:
			case 166:
			case 167:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 385;
				this.rotina();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public tipos_primitivos(): Tipos_primitivosContext {
		let localctx: Tipos_primitivosContext = new Tipos_primitivosContext(this, this._ctx, this.state);
		this.enterRule(localctx, 74, PortuguesPuroParser.RULE_tipos_primitivos);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 388;
			_la = this._input.LA(1);
			if(!(((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 131071) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public tipo(): TipoContext {
		let localctx: TipoContext = new TipoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 76, PortuguesPuroParser.RULE_tipo);
		let _la: number;
		try {
			this.state = 413;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 19, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 390;
				this.artigo_indefinido();
				this.state = 391;
				this.nome();
				this.state = 392;
				this.match(PortuguesPuroParser.T__79);
				this.state = 393;
				this.artigo_indefinido();
				this.state = 394;
				this.nome_do_tipo();
				this.state = 396;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===137 || _la===138) {
					{
					this.state = 395;
					this.informacao_opcional();
					}
				}

				this.state = 398;
				this.match(PortuguesPuroParser.PONTO);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 400;
				this.artigo_indefinido();
				this.state = 401;
				this.nome();
				this.state = 402;
				this.match(PortuguesPuroParser.T__135);
				this.state = 403;
				this.campos();
				this.state = 404;
				this.match(PortuguesPuroParser.PONTO);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 406;
				this.artigo_indefinido();
				this.state = 407;
				this.nome();
				this.state = 408;
				this.match(PortuguesPuroParser.T__79);
				this.state = 409;
				this.numero_inteiro();
				this.state = 410;
				this.nome_do_tipo();
				this.state = 411;
				this.match(PortuguesPuroParser.PONTO);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public nome(): NomeContext {
		let localctx: NomeContext = new NomeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 78, PortuguesPuroParser.RULE_nome);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 415;
			this.palavra();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public nome_do_tipo(): Nome_do_tipoContext {
		let localctx: Nome_do_tipoContext = new Nome_do_tipoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 80, PortuguesPuroParser.RULE_nome_do_tipo);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 417;
			this.nome();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public informacao_opcional(): Informacao_opcionalContext {
		let localctx: Informacao_opcionalContext = new Informacao_opcionalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 82, PortuguesPuroParser.RULE_informacao_opcional);
		try {
			this.state = 425;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 137:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 419;
				this.match(PortuguesPuroParser.T__136);
				this.state = 420;
				this.artigo_indefinido();
				this.state = 421;
				this.nome_do_tipo();
				}
				break;
			case 138:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 423;
				this.match(PortuguesPuroParser.T__137);
				this.state = 424;
				this.campos();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public campos(): CamposContext {
		let localctx: CamposContext = new CamposContext(this, this._ctx, this.state);
		this.enterRule(localctx, 84, PortuguesPuroParser.RULE_campos);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 427;
			this.campo();
			this.state = 433;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===142 || _la===143 || _la===201 || _la===202) {
				{
				{
				this.state = 428;
				this.pausas();
				this.state = 429;
				this.campo();
				}
				}
				this.state = 435;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public campo(): CampoContext {
		let localctx: CampoContext = new CampoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 86, PortuguesPuroParser.RULE_campo);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 440;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 6:
			case 7:
			case 8:
			case 9:
			case 14:
			case 15:
			case 16:
			case 17:
				{
				this.state = 436;
				this.artigo_indefinido();
				}
				break;
			case 187:
				{
				this.state = 437;
				this.numero_inteiro();
				this.state = 438;
				this.match(PortuguesPuroParser.T__138);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 450;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 72:
			case 73:
			case 74:
			case 75:
			case 76:
			case 77:
			case 78:
			case 79:
				{
				this.state = 442;
				this.denominacoes();
				this.state = 443;
				this.nome();
				}
				break;
			case 140:
				{
				this.state = 445;
				this.match(PortuguesPuroParser.T__139);
				this.state = 446;
				this.artigo_definido();
				this.state = 447;
				this.nome();
				}
				break;
			case 141:
				{
				this.state = 449;
				this.match(PortuguesPuroParser.T__140);
				}
				break;
			case 142:
			case 143:
			case 200:
			case 201:
			case 202:
				break;
			default:
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public pausa(): PausaContext {
		let localctx: PausaContext = new PausaContext(this, this._ctx, this.state);
		this.enterRule(localctx, 88, PortuguesPuroParser.RULE_pausa);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 452;
			_la = this._input.LA(1);
			if(!(_la===142 || _la===143 || _la===201 || _la===202)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public pausas(): PausasContext {
		let localctx: PausasContext = new PausasContext(this, this._ctx, this.state);
		this.enterRule(localctx, 90, PortuguesPuroParser.RULE_pausas);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 455;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 454;
				this.pausa();
				}
				}
				this.state = 457;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===142 || _la===143 || _la===201 || _la===202);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public conjuncoes(): ConjuncoesContext {
		let localctx: ConjuncoesContext = new ConjuncoesContext(this, this._ctx, this.state);
		this.enterRule(localctx, 92, PortuguesPuroParser.RULE_conjuncoes);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 459;
			_la = this._input.LA(1);
			if(!(((((_la - 142)) & ~0x1F) === 0 && ((1 << (_la - 142)) & 7) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public preposicoes(): PreposicoesContext {
		let localctx: PreposicoesContext = new PreposicoesContext(this, this._ctx, this.state);
		this.enterRule(localctx, 94, PortuguesPuroParser.RULE_preposicoes);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 461;
			_la = this._input.LA(1);
			if(!(_la===26 || _la===27 || ((((_la - 138)) & ~0x1F) === 0 && ((1 << (_la - 138)) & 16777093) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public variavel_global(): Variavel_globalContext {
		let localctx: Variavel_globalContext = new Variavel_globalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 96, PortuguesPuroParser.RULE_variavel_global);
		let _la: number;
		try {
			this.state = 494;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 26, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 463;
				this.artigo_definido();
				this.state = 464;
				this.nome();
				this.state = 465;
				this.match(PortuguesPuroParser.T__79);
				this.state = 466;
				this.artigo_indefinido();
				this.state = 467;
				this.nome_do_tipo();
				this.state = 469;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===137 || _la===138) {
					{
					this.state = 468;
					this.informacao_opcional();
					}
				}

				this.state = 471;
				this.match(PortuguesPuroParser.PONTO);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 473;
				this.artigo_definido();
				this.state = 474;
				this.nome();
				this.state = 475;
				this.match(PortuguesPuroParser.T__135);
				this.state = 476;
				this.campos();
				this.state = 477;
				this.match(PortuguesPuroParser.PONTO);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 479;
				this.artigo_definido();
				this.state = 480;
				this.nome();
				this.state = 481;
				this.match(PortuguesPuroParser.T__79);
				this.state = 482;
				this.artigo_indefinido();
				this.state = 483;
				this.nome_do_tipo();
				this.state = 484;
				this.match(PortuguesPuroParser.T__45);
				this.state = 485;
				this.termo_constante();
				this.state = 486;
				this.match(PortuguesPuroParser.PONTO);
				this.state = 487;
				this.artigo_definido();
				this.state = 488;
				this.nome();
				this.state = 489;
				this.match(PortuguesPuroParser.T__79);
				this.state = 490;
				this.termo_constante();
				this.state = 491;
				this.match(PortuguesPuroParser.PONTO);
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				// tslint:disable-next-line:no-empty
				{
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public rotina(): RotinaContext {
		let localctx: RotinaContext = new RotinaContext(this, this._ctx, this.state);
		this.enterRule(localctx, 98, PortuguesPuroParser.RULE_rotina);
		try {
			this.state = 500;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 27, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 496;
				this.procedimento();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 497;
				this.decisor();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 498;
				this.funcao();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 499;
				this.retroinvocacao();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public procedimento(): ProcedimentoContext {
		let localctx: ProcedimentoContext = new ProcedimentoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 100, PortuguesPuroParser.RULE_procedimento);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 516;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				{
				this.state = 503;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===162) {
					{
					this.state = 502;
					this.match(PortuguesPuroParser.T__161);
					}
				}

				this.state = 505;
				this.match(PortuguesPuroParser.T__162);
				this.state = 506;
				this.nome_da_rotina();
				this.state = 507;
				this.match(PortuguesPuroParser.PONTO_E_VIRGULA);
				}
				break;
			case 2:
				{
				this.state = 510;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===162) {
					{
					this.state = 509;
					this.match(PortuguesPuroParser.T__161);
					}
				}

				this.state = 512;
				this.match(PortuguesPuroParser.T__162);
				this.state = 513;
				this.nome_da_rotina();
				this.state = 514;
				this.match(PortuguesPuroParser.DOIS_PONTOS);
				}
				break;
			}
			this.state = 518;
			this.instrucoes();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public decisor(): DecisorContext {
		let localctx: DecisorContext = new DecisorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 102, PortuguesPuroParser.RULE_decisor);
		let _la: number;
		try {
			this.state = 534;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 33, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 521;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===162) {
					{
					this.state = 520;
					this.match(PortuguesPuroParser.T__161);
					}
				}

				this.state = 523;
				this.match(PortuguesPuroParser.T__163);
				this.state = 524;
				this.nome_da_rotina();
				this.state = 525;
				this.match(PortuguesPuroParser.PONTO_E_VIRGULA);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 528;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===162) {
					{
					this.state = 527;
					this.match(PortuguesPuroParser.T__161);
					}
				}

				this.state = 530;
				this.match(PortuguesPuroParser.T__163);
				this.state = 531;
				this.nome_da_rotina();
				this.state = 532;
				this.match(PortuguesPuroParser.DOIS_PONTOS);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public funcao(): FuncaoContext {
		let localctx: FuncaoContext = new FuncaoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 104, PortuguesPuroParser.RULE_funcao);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 562;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 36, this._ctx) ) {
			case 1:
				{
				this.state = 537;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===165) {
					{
					this.state = 536;
					this.match(PortuguesPuroParser.T__164);
					}
				}

				this.state = 539;
				this.match(PortuguesPuroParser.T__165);
				this.state = 540;
				this.artigo_definido();
				this.state = 541;
				this.nome_do_tipo();
				this.state = 542;
				this.atribuidores_de_posse();
				this.state = 543;
				this.nome();
				this.state = 544;
				this.match(PortuguesPuroParser.T__136);
				this.state = 545;
				this.artigo_indefinido();
				this.state = 546;
				this.nome_do_tipo();
				this.state = 547;
				this.match(PortuguesPuroParser.PONTO_E_VIRGULA);
				}
				break;
			case 2:
				{
				this.state = 550;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===165) {
					{
					this.state = 549;
					this.match(PortuguesPuroParser.T__164);
					}
				}

				this.state = 552;
				this.match(PortuguesPuroParser.T__165);
				this.state = 553;
				this.artigo_definido();
				this.state = 554;
				this.nome_do_tipo();
				this.state = 555;
				this.atribuidores_de_posse();
				this.state = 556;
				this.nome();
				this.state = 557;
				this.match(PortuguesPuroParser.T__136);
				this.state = 558;
				this.artigo_indefinido();
				this.state = 559;
				this.nome_do_tipo();
				this.state = 560;
				this.match(PortuguesPuroParser.DOIS_PONTOS);
				}
				break;
			}
			this.state = 564;
			this.instrucoes();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public retroinvocacao(): RetroinvocacaoContext {
		let localctx: RetroinvocacaoContext = new RetroinvocacaoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 106, PortuguesPuroParser.RULE_retroinvocacao);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 580;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				{
				this.state = 567;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===162) {
					{
					this.state = 566;
					this.match(PortuguesPuroParser.T__161);
					}
				}

				this.state = 569;
				this.match(PortuguesPuroParser.T__166);
				this.state = 570;
				this.nome_da_rotina();
				this.state = 571;
				this.match(PortuguesPuroParser.PONTO_E_VIRGULA);
				}
				break;
			case 2:
				{
				this.state = 574;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===162) {
					{
					this.state = 573;
					this.match(PortuguesPuroParser.T__161);
					}
				}

				this.state = 576;
				this.match(PortuguesPuroParser.T__166);
				this.state = 577;
				this.nome_da_rotina();
				this.state = 578;
				this.match(PortuguesPuroParser.DOIS_PONTOS);
				}
				break;
			}
			this.state = 582;
			this.instrucoes();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public nome_da_rotina(): Nome_da_rotinaContext {
		let localctx: Nome_da_rotinaContext = new Nome_da_rotinaContext(this, this._ctx, this.state);
		this.enterRule(localctx, 108, PortuguesPuroParser.RULE_nome_da_rotina);
		let _la: number;
		try {
			this.state = 590;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 208:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 584;
				this.unidade_semantica();
				}
				break;
			case 6:
			case 7:
			case 8:
			case 9:
			case 14:
			case 15:
			case 16:
			case 17:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 585;
				this.parametro();
				}
				break;
			case 2:
			case 3:
			case 4:
			case 5:
			case 10:
			case 11:
			case 12:
			case 13:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 586;
				this.frase();
				this.state = 588;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===204) {
					{
					this.state = 587;
					this.qualificador();
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public unidade_semantica(): Unidade_semanticaContext {
		let localctx: Unidade_semanticaContext = new Unidade_semanticaContext(this, this._ctx, this.state);
		this.enterRule(localctx, 110, PortuguesPuroParser.RULE_unidade_semantica);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 592;
			this.palavra();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public parametro(): ParametroContext {
		let localctx: ParametroContext = new ParametroContext(this, this._ctx, this.state);
		this.enterRule(localctx, 112, PortuguesPuroParser.RULE_parametro);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 594;
			this.artigo_indefinido();
			this.state = 595;
			this.nome();
			this.state = 599;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 72)) & ~0x1F) === 0 && ((1 << (_la - 72)) & 255) !== 0)) {
				{
				this.state = 596;
				this.denominacoes();
				this.state = 597;
				this.nome();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public frase(): FraseContext {
		let localctx: FraseContext = new FraseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 114, PortuguesPuroParser.RULE_frase);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 601;
			this.artigo_definido();
			this.state = 602;
			this.nome();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public instrucoes(): InstrucoesContext {
		let localctx: InstrucoesContext = new InstrucoesContext(this, this._ctx, this.state);
		this.enterRule(localctx, 116, PortuguesPuroParser.RULE_instrucoes);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 605;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 604;
				this.instrucao();
				}
				}
				this.state = 607;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 262140) !== 0) || ((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & 44477) !== 0) || ((((_la - 168)) & ~0x1F) === 0 && ((1 << (_la - 168)) & 2206744629) !== 0) || _la===208);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public instrucao(): InstrucaoContext {
		let localctx: InstrucaoContext = new InstrucaoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 118, PortuguesPuroParser.RULE_instrucao);
		try {
			this.state = 615;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 59:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 609;
				this.preservacao();
				}
				break;
			case 168:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 610;
				this.iteracao();
				}
				break;
			case 54:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 611;
				this.condicional();
				}
				break;
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 16:
			case 17:
			case 56:
			case 57:
			case 58:
			case 61:
			case 62:
			case 64:
			case 65:
			case 67:
			case 69:
			case 170:
			case 172:
			case 173:
			case 182:
			case 187:
			case 191:
			case 192:
			case 193:
			case 199:
			case 208:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 612;
				this.incondicional();
				this.state = 613;
				this.match(PortuguesPuroParser.VIRGULA);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public preservacao(): PreservacaoContext {
		let localctx: PreservacaoContext = new PreservacaoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 120, PortuguesPuroParser.RULE_preservacao);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 617;
			this.match(PortuguesPuroParser.T__58);
			this.state = 618;
			this.parametro();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public iteracao(): IteracaoContext {
		let localctx: IteracaoContext = new IteracaoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 122, PortuguesPuroParser.RULE_iteracao);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 620;
			this.match(PortuguesPuroParser.T__167);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public condicional(): CondicionalContext {
		let localctx: CondicionalContext = new CondicionalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 124, PortuguesPuroParser.RULE_condicional);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 622;
			this.match(PortuguesPuroParser.T__53);
			this.state = 623;
			this.expressao_decisora();
			this.state = 624;
			this.match(PortuguesPuroParser.VIRGULA);
			this.state = 625;
			this.incondicional();
			this.state = 630;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===202) {
				{
				{
				this.state = 626;
				this.match(PortuguesPuroParser.PONTO_E_VIRGULA);
				this.state = 627;
				this.incondicional();
				}
				}
				this.state = 632;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 633;
			this.match(PortuguesPuroParser.PONTO);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public expressao_decisora(): Expressao_decisoraContext {
		let localctx: Expressao_decisoraContext = new Expressao_decisoraContext(this, this._ctx, this.state);
		this.enterRule(localctx, 126, PortuguesPuroParser.RULE_expressao_decisora);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 636;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 635;
					this.palavra();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 638;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 46, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 641;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 80)) & ~0x1F) === 0 && ((1 << (_la - 80)) & 8388607) !== 0)) {
				{
				this.state = 640;
				this.verbos();
				}
			}

			this.state = 644;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===208) {
				{
				this.state = 643;
				this.expressao_decisora();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public incondicional(): IncondicionalContext {
		let localctx: IncondicionalContext = new IncondicionalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 128, PortuguesPuroParser.RULE_incondicional);
		try {
			this.state = 654;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 57:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 646;
				this.interrupcao();
				}
				break;
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 16:
			case 17:
			case 61:
			case 62:
			case 65:
			case 69:
			case 182:
			case 187:
			case 191:
			case 192:
			case 193:
			case 199:
			case 208:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 647;
				this.invocacao();
				}
				break;
			case 58:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 648;
				this.retorno();
				}
				break;
			case 64:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 649;
				this.decodificacao();
				}
				break;
			case 56:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 650;
				this.reiteracao();
				}
				break;
			case 170:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 651;
				this.indirecao();
				}
				break;
			case 67:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 652;
				this.empilhamento();
				}
				break;
			case 172:
			case 173:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 653;
				this.retorno_booleano();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public interrupcao(): InterrupcaoContext {
		let localctx: InterrupcaoContext = new InterrupcaoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 130, PortuguesPuroParser.RULE_interrupcao);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 656;
			this.match(PortuguesPuroParser.T__56);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public invocacao(): InvocacaoContext {
		let localctx: InvocacaoContext = new InvocacaoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 132, PortuguesPuroParser.RULE_invocacao);
		try {
			this.state = 661;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 50, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 658;
				this.invocacao_interna();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 659;
				this.invocacao_externa();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 660;
				this.invocacao_indireta();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public invocacao_interna(): Invocacao_internaContext {
		let localctx: Invocacao_internaContext = new Invocacao_internaContext(this, this._ctx, this.state);
		this.enterRule(localctx, 134, PortuguesPuroParser.RULE_invocacao_interna);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 666;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 51, this._ctx) ) {
			case 1:
				{
				this.state = 663;
				this.unidade_semantica();
				}
				break;
			case 2:
				{
				this.state = 664;
				this.expressao();
				}
				break;
			case 3:
				{
				this.state = 665;
				this.frase();
				}
				break;
			}
			this.state = 669;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===204) {
				{
				this.state = 668;
				this.qualificador();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public invocacao_externa(): Invocacao_externaContext {
		let localctx: Invocacao_externaContext = new Invocacao_externaContext(this, this._ctx, this.state);
		this.enterRule(localctx, 136, PortuguesPuroParser.RULE_invocacao_externa);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 671;
			this.match(PortuguesPuroParser.T__64);
			this.state = 672;
			this.match(PortuguesPuroParser.T__168);
			this.state = 673;
			this.nome_da_DLL();
			this.state = 674;
			this.match(PortuguesPuroParser.T__168);
			this.state = 675;
			this.match(PortuguesPuroParser.T__168);
			this.state = 676;
			this.nome_da_funcao();
			this.state = 677;
			this.match(PortuguesPuroParser.T__168);
			this.state = 692;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===138) {
				{
				{
				this.state = 678;
				this.match(PortuguesPuroParser.T__137);
				this.state = 679;
				this.expressao();
				}
				this.state = 685;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===142) {
					{
					{
					this.state = 681;
					this.match(PortuguesPuroParser.T__141);
					this.state = 682;
					this.expressao();
					}
					}
					this.state = 687;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 690;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===66) {
					{
					this.state = 688;
					this.match(PortuguesPuroParser.T__65);
					this.state = 689;
					this.termo();
					}
				}

				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public nome_da_DLL(): Nome_da_DLLContext {
		let localctx: Nome_da_DLLContext = new Nome_da_DLLContext(this, this._ctx, this.state);
		this.enterRule(localctx, 138, PortuguesPuroParser.RULE_nome_da_DLL);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 694;
			this.palavra();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public nome_da_funcao(): Nome_da_funcaoContext {
		let localctx: Nome_da_funcaoContext = new Nome_da_funcaoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 140, PortuguesPuroParser.RULE_nome_da_funcao);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 696;
			this.palavra();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public invocacao_indireta(): Invocacao_indiretaContext {
		let localctx: Invocacao_indiretaContext = new Invocacao_indiretaContext(this, this._ctx, this.state);
		this.enterRule(localctx, 142, PortuguesPuroParser.RULE_invocacao_indireta);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 698;
			this.match(PortuguesPuroParser.T__64);
			this.state = 699;
			this.expressao();
			this.state = 713;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===138) {
				{
				this.state = 700;
				this.match(PortuguesPuroParser.T__137);
				this.state = 701;
				this.expressao();
				this.state = 706;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===142) {
					{
					{
					this.state = 702;
					this.match(PortuguesPuroParser.T__141);
					this.state = 703;
					this.expressao();
					}
					}
					this.state = 708;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 711;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===66) {
					{
					this.state = 709;
					this.match(PortuguesPuroParser.T__65);
					this.state = 710;
					this.termo();
					}
				}

				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public retorno(): RetornoContext {
		let localctx: RetornoContext = new RetornoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 144, PortuguesPuroParser.RULE_retorno);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 715;
			this.match(PortuguesPuroParser.T__57);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public decodificacao(): DecodificacaoContext {
		let localctx: DecodificacaoContext = new DecodificacaoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 146, PortuguesPuroParser.RULE_decodificacao);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 717;
			this.match(PortuguesPuroParser.T__63);
			this.state = 718;
			this.numero_hexadecimal();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public indirecao(): IndirecaoContext {
		let localctx: IndirecaoContext = new IndirecaoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 148, PortuguesPuroParser.RULE_indirecao);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 720;
			this.match(PortuguesPuroParser.T__169);
			this.state = 721;
			this.artigo();
			this.state = 722;
			this.termo();
			this.state = 723;
			this.match(PortuguesPuroParser.T__170);
			this.state = 727;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 208:
				{
				this.state = 724;
				this.unidade_semantica();
				}
				break;
			case 6:
			case 7:
			case 8:
			case 9:
			case 14:
			case 15:
			case 16:
			case 17:
				{
				this.state = 725;
				this.parametro();
				}
				break;
			case 2:
			case 3:
			case 4:
			case 5:
			case 10:
			case 11:
			case 12:
			case 13:
				{
				this.state = 726;
				this.frase();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 730;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===204) {
				{
				this.state = 729;
				this.qualificador();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public empilhamento(): EmpilhamentoContext {
		let localctx: EmpilhamentoContext = new EmpilhamentoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 150, PortuguesPuroParser.RULE_empilhamento);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 732;
			this.match(PortuguesPuroParser.T__66);
			this.state = 733;
			this.expressao();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public reiteracao(): ReiteracaoContext {
		let localctx: ReiteracaoContext = new ReiteracaoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 152, PortuguesPuroParser.RULE_reiteracao);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 735;
			this.match(PortuguesPuroParser.T__55);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public retorno_booleano(): Retorno_booleanoContext {
		let localctx: Retorno_booleanoContext = new Retorno_booleanoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 154, PortuguesPuroParser.RULE_retorno_booleano);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 737;
			_la = this._input.LA(1);
			if(!(_la===172 || _la===173)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public expressao(): ExpressaoContext {
		let localctx: ExpressaoContext = new ExpressaoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 156, PortuguesPuroParser.RULE_expressao);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 739;
			this.termo();
			this.state = 745;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 174)) & ~0x1F) === 0 && ((1 << (_la - 174)) & 255) !== 0)) {
				{
				{
				this.state = 740;
				this.operadores_comuns();
				this.state = 741;
				this.termo();
				}
				}
				this.state = 747;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public operadores_comuns(): Operadores_comunsContext {
		let localctx: Operadores_comunsContext = new Operadores_comunsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 158, PortuguesPuroParser.RULE_operadores_comuns);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 748;
			_la = this._input.LA(1);
			if(!(((((_la - 174)) & ~0x1F) === 0 && ((1 << (_la - 174)) & 255) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public termo_constante(): Termo_constanteContext {
		let localctx: Termo_constanteContext = new Termo_constanteContext(this, this._ctx, this.state);
		this.enterRule(localctx, 160, PortuguesPuroParser.RULE_termo_constante);
		try {
			this.state = 753;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 62, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 750;
				this.termo_constante_negativo();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 751;
				this.termo_constante_positivo();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 752;
				this.literal();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public termo_constante_negativo(): Termo_constante_negativoContext {
		let localctx: Termo_constante_negativoContext = new Termo_constante_negativoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 162, PortuguesPuroParser.RULE_termo_constante_negativo);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 755;
			this.match(PortuguesPuroParser.HIFEN);
			this.state = 756;
			this.termo_constante();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public termo_constante_positivo(): Termo_constante_positivoContext {
		let localctx: Termo_constante_positivoContext = new Termo_constante_positivoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 164, PortuguesPuroParser.RULE_termo_constante_positivo);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 758;
			this.match(PortuguesPuroParser.SINAL_DE_ADICAO);
			this.state = 759;
			this.termo_constante();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public numero(): NumeroContext {
		let localctx: NumeroContext = new NumeroContext(this, this._ctx, this.state);
		this.enterRule(localctx, 166, PortuguesPuroParser.RULE_numero);
		try {
			this.state = 764;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 63, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 761;
				this.numero_decimal();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 762;
				this.numero_fracionario();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 763;
				this.numero_misto();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let localctx: LiteralContext = new LiteralContext(this, this._ctx, this.state);
		this.enterRule(localctx, 168, PortuguesPuroParser.RULE_literal);
		let _la: number;
		try {
			this.state = 776;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 187:
			case 192:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 766;
				this.numero();
				this.state = 768;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===208) {
					{
					this.state = 767;
					this.nome_do_tipo();
					}
				}

				}
				break;
			case 191:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 770;
				this.string_literal();
				}
				break;
			case 193:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 771;
				this.numero_hexadecimal();
				}
				break;
			case 61:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 772;
				this.match(PortuguesPuroParser.T__60);
				}
				break;
			case 62:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 773;
				this.match(PortuguesPuroParser.T__61);
				}
				break;
			case 69:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 774;
				this.match(PortuguesPuroParser.T__68);
				}
				break;
			case 182:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 775;
				this.match(PortuguesPuroParser.T__181);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public termo(): TermoContext {
		let localctx: TermoContext = new TermoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 170, PortuguesPuroParser.RULE_termo);
		let _la: number;
		try {
			this.state = 793;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 68, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 778;
				this.termo_negativo();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 779;
				this.termo_positivo();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 780;
				this.variavel_local();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 781;
				this.variavel();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 782;
				this.termo_literal();
				this.state = 787;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===161) {
					{
					this.state = 783;
					this.match(PortuguesPuroParser.T__160);
					this.state = 784;
					this.artigo_indefinido();
					this.state = 785;
					this.nome_do_tipo();
					}
				}

				this.state = 791;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===197) {
					{
					this.state = 789;
					this.match(PortuguesPuroParser.BARRA_INCLINADA);
					this.state = 790;
					this.termo();
					}
				}

				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public termo_negativo(): Termo_negativoContext {
		let localctx: Termo_negativoContext = new Termo_negativoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 172, PortuguesPuroParser.RULE_termo_negativo);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 795;
			this.match(PortuguesPuroParser.HIFEN);
			this.state = 796;
			this.termo();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public termo_positivo(): Termo_positivoContext {
		let localctx: Termo_positivoContext = new Termo_positivoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 174, PortuguesPuroParser.RULE_termo_positivo);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 798;
			this.match(PortuguesPuroParser.SINAL_DE_ADICAO);
			this.state = 799;
			this.termo();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public variavel_local(): Variavel_localContext {
		let localctx: Variavel_localContext = new Variavel_localContext(this, this._ctx, this.state);
		this.enterRule(localctx, 176, PortuguesPuroParser.RULE_variavel_local);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 801;
			this.artigo_indefinido();
			this.state = 802;
			this.nome();
			this.state = 806;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 72)) & ~0x1F) === 0 && ((1 << (_la - 72)) & 255) !== 0)) {
				{
				this.state = 803;
				this.denominacoes();
				this.state = 804;
				this.nome();
				}
			}

			this.state = 808;
			this.possessivos();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public variavel(): VariavelContext {
		let localctx: VariavelContext = new VariavelContext(this, this._ctx, this.state);
		this.enterRule(localctx, 178, PortuguesPuroParser.RULE_variavel);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 810;
			this.artigo_definido();
			this.state = 811;
			this.nome();
			this.state = 812;
			this.possessivos();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public termo_literal(): Termo_literalContext {
		let localctx: Termo_literalContext = new Termo_literalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 180, PortuguesPuroParser.RULE_termo_literal);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 814;
			this.literal();
			this.state = 815;
			this.possessivos();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public possessivos(): PossessivosContext {
		let localctx: PossessivosContext = new PossessivosContext(this, this._ctx, this.state);
		this.enterRule(localctx, 182, PortuguesPuroParser.RULE_possessivos);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 820;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===109) {
				{
				{
				this.state = 817;
				this.possessivo_antigo();
				}
				}
				this.state = 822;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public possessivo_antigo(): Possessivo_antigoContext {
		let localctx: Possessivo_antigoContext = new Possessivo_antigoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 184, PortuguesPuroParser.RULE_possessivo_antigo);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 823;
			this.match(PortuguesPuroParser.T__108);
			this.state = 829;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 208:
				{
				this.state = 824;
				this.nome();
				}
				break;
			case 165:
			case 166:
				{
				this.state = 825;
				this.funcao();
				}
				break;
			case 183:
				{
				this.state = 826;
				this.match(PortuguesPuroParser.T__182);
				}
				break;
			case 184:
				{
				this.state = 827;
				this.match(PortuguesPuroParser.T__183);
				}
				break;
			case 185:
				{
				this.state = 828;
				this.match(PortuguesPuroParser.T__184);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,209,832,2,0,7,0,
	2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,
	2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,
	17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,
	7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,
	31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,
	2,39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
	46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,2,53,
	7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,7,59,2,60,7,
	60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,2,66,7,66,2,67,7,67,
	2,68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,2,72,7,72,2,73,7,73,2,74,7,74,2,
	75,7,75,2,76,7,76,2,77,7,77,2,78,7,78,2,79,7,79,2,80,7,80,2,81,7,81,2,82,
	7,82,2,83,7,83,2,84,7,84,2,85,7,85,2,86,7,86,2,87,7,87,2,88,7,88,2,89,7,
	89,2,90,7,90,2,91,7,91,2,92,7,92,1,0,1,0,1,1,4,1,190,8,1,11,1,12,1,191,
	1,2,1,2,1,2,1,3,1,3,3,3,199,8,3,1,4,1,4,1,4,1,4,1,4,3,4,206,8,4,1,5,1,5,
	1,5,1,5,1,5,3,5,213,8,5,1,6,1,6,1,7,1,7,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,
	1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,3,8,238,8,8,1,9,1,9,1,10,1,
	10,1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,3,12,255,8,12,
	1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,
	13,1,13,1,13,1,13,1,13,3,13,276,8,13,1,14,1,14,1,15,1,15,1,16,1,16,1,17,
	1,17,3,17,286,8,17,1,18,1,18,5,18,290,8,18,10,18,12,18,293,9,18,1,18,1,
	18,1,19,1,19,5,19,299,8,19,10,19,12,19,302,9,19,1,19,1,19,1,20,1,20,1,20,
	1,20,3,20,310,8,20,1,21,1,21,1,21,1,22,1,22,1,23,1,23,1,24,1,24,1,24,1,
	25,1,25,5,25,324,8,25,10,25,12,25,327,9,25,1,25,1,25,1,26,1,26,1,26,1,26,
	1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,3,26,343,8,26,1,27,1,27,1,28,1,
	28,1,29,1,29,1,29,3,29,352,8,29,1,30,4,30,355,8,30,11,30,12,30,356,1,31,
	3,31,360,8,31,1,31,1,31,1,32,1,32,1,32,1,32,1,33,1,33,1,33,1,33,1,34,1,
	34,1,34,1,35,1,35,5,35,377,8,35,10,35,12,35,380,9,35,1,35,1,35,1,36,1,36,
	1,36,3,36,387,8,36,1,37,1,37,1,38,1,38,1,38,1,38,1,38,1,38,3,38,397,8,38,
	1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,
	38,3,38,414,8,38,1,39,1,39,1,40,1,40,1,41,1,41,1,41,1,41,1,41,1,41,3,41,
	426,8,41,1,42,1,42,1,42,1,42,5,42,432,8,42,10,42,12,42,435,9,42,1,43,1,
	43,1,43,1,43,3,43,441,8,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,3,43,
	451,8,43,1,44,1,44,1,45,4,45,456,8,45,11,45,12,45,457,1,46,1,46,1,47,1,
	47,1,48,1,48,1,48,1,48,1,48,1,48,3,48,470,8,48,1,48,1,48,1,48,1,48,1,48,
	1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,
	48,1,48,1,48,1,48,3,48,495,8,48,1,49,1,49,1,49,1,49,3,49,501,8,49,1,50,
	3,50,504,8,50,1,50,1,50,1,50,1,50,1,50,3,50,511,8,50,1,50,1,50,1,50,1,50,
	3,50,517,8,50,1,50,1,50,1,51,3,51,522,8,51,1,51,1,51,1,51,1,51,1,51,3,51,
	529,8,51,1,51,1,51,1,51,1,51,3,51,535,8,51,1,52,3,52,538,8,52,1,52,1,52,
	1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,3,52,551,8,52,1,52,1,52,1,
	52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,3,52,563,8,52,1,52,1,52,1,53,3,53,
	568,8,53,1,53,1,53,1,53,1,53,1,53,3,53,575,8,53,1,53,1,53,1,53,1,53,3,53,
	581,8,53,1,53,1,53,1,54,1,54,1,54,1,54,3,54,589,8,54,3,54,591,8,54,1,55,
	1,55,1,56,1,56,1,56,1,56,1,56,3,56,600,8,56,1,57,1,57,1,57,1,58,4,58,606,
	8,58,11,58,12,58,607,1,59,1,59,1,59,1,59,1,59,1,59,3,59,616,8,59,1,60,1,
	60,1,60,1,61,1,61,1,62,1,62,1,62,1,62,1,62,1,62,5,62,629,8,62,10,62,12,
	62,632,9,62,1,62,1,62,1,63,4,63,637,8,63,11,63,12,63,638,1,63,3,63,642,
	8,63,1,63,3,63,645,8,63,1,64,1,64,1,64,1,64,1,64,1,64,1,64,1,64,3,64,655,
	8,64,1,65,1,65,1,66,1,66,1,66,3,66,662,8,66,1,67,1,67,1,67,3,67,667,8,67,
	1,67,3,67,670,8,67,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,
	68,1,68,5,68,684,8,68,10,68,12,68,687,9,68,1,68,1,68,3,68,691,8,68,3,68,
	693,8,68,1,69,1,69,1,70,1,70,1,71,1,71,1,71,1,71,1,71,1,71,5,71,705,8,71,
	10,71,12,71,708,9,71,1,71,1,71,3,71,712,8,71,3,71,714,8,71,1,72,1,72,1,
	73,1,73,1,73,1,74,1,74,1,74,1,74,1,74,1,74,1,74,3,74,728,8,74,1,74,3,74,
	731,8,74,1,75,1,75,1,75,1,76,1,76,1,77,1,77,1,78,1,78,1,78,1,78,5,78,744,
	8,78,10,78,12,78,747,9,78,1,79,1,79,1,80,1,80,1,80,3,80,754,8,80,1,81,1,
	81,1,81,1,82,1,82,1,82,1,83,1,83,1,83,3,83,765,8,83,1,84,1,84,3,84,769,
	8,84,1,84,1,84,1,84,1,84,1,84,1,84,3,84,777,8,84,1,85,1,85,1,85,1,85,1,
	85,1,85,1,85,1,85,1,85,3,85,788,8,85,1,85,1,85,3,85,792,8,85,3,85,794,8,
	85,1,86,1,86,1,86,1,87,1,87,1,87,1,88,1,88,1,88,1,88,1,88,3,88,807,8,88,
	1,88,1,88,1,89,1,89,1,89,1,89,1,90,1,90,1,90,1,91,5,91,819,8,91,10,91,12,
	91,822,9,91,1,92,1,92,1,92,1,92,1,92,1,92,3,92,830,8,92,1,92,0,0,93,0,2,
	4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,
	54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,
	102,104,106,108,110,112,114,116,118,120,122,124,126,128,130,132,134,136,
	138,140,142,144,146,148,150,152,154,156,158,160,162,164,166,168,170,172,
	174,176,178,180,182,184,0,30,1,0,10,13,1,0,14,17,1,0,34,37,1,0,38,41,1,
	0,42,45,1,0,72,79,1,0,80,102,2,0,194,195,209,209,5,0,103,108,186,187,192,
	193,197,197,199,199,4,0,103,108,186,187,190,190,193,193,1,0,186,186,1,0,
	187,187,1,0,103,103,1,0,104,104,1,0,105,105,1,0,106,106,1,0,107,107,1,0,
	193,193,1,0,108,108,1,0,192,192,1,0,199,199,1,0,197,197,2,0,110,111,200,
	203,4,0,112,118,192,192,197,197,199,199,1,0,119,135,2,0,142,143,201,202,
	1,0,142,144,4,0,26,27,138,138,140,140,145,161,1,0,172,173,1,0,174,181,903,
	0,186,1,0,0,0,2,189,1,0,0,0,4,193,1,0,0,0,6,198,1,0,0,0,8,205,1,0,0,0,10,
	212,1,0,0,0,12,214,1,0,0,0,14,216,1,0,0,0,16,237,1,0,0,0,18,239,1,0,0,0,
	20,241,1,0,0,0,22,243,1,0,0,0,24,254,1,0,0,0,26,275,1,0,0,0,28,277,1,0,
	0,0,30,279,1,0,0,0,32,281,1,0,0,0,34,285,1,0,0,0,36,287,1,0,0,0,38,296,
	1,0,0,0,40,309,1,0,0,0,42,311,1,0,0,0,44,314,1,0,0,0,46,316,1,0,0,0,48,
	318,1,0,0,0,50,321,1,0,0,0,52,342,1,0,0,0,54,344,1,0,0,0,56,346,1,0,0,0,
	58,351,1,0,0,0,60,354,1,0,0,0,62,359,1,0,0,0,64,363,1,0,0,0,66,367,1,0,
	0,0,68,371,1,0,0,0,70,374,1,0,0,0,72,386,1,0,0,0,74,388,1,0,0,0,76,413,
	1,0,0,0,78,415,1,0,0,0,80,417,1,0,0,0,82,425,1,0,0,0,84,427,1,0,0,0,86,
	440,1,0,0,0,88,452,1,0,0,0,90,455,1,0,0,0,92,459,1,0,0,0,94,461,1,0,0,0,
	96,494,1,0,0,0,98,500,1,0,0,0,100,516,1,0,0,0,102,534,1,0,0,0,104,562,1,
	0,0,0,106,580,1,0,0,0,108,590,1,0,0,0,110,592,1,0,0,0,112,594,1,0,0,0,114,
	601,1,0,0,0,116,605,1,0,0,0,118,615,1,0,0,0,120,617,1,0,0,0,122,620,1,0,
	0,0,124,622,1,0,0,0,126,636,1,0,0,0,128,654,1,0,0,0,130,656,1,0,0,0,132,
	661,1,0,0,0,134,666,1,0,0,0,136,671,1,0,0,0,138,694,1,0,0,0,140,696,1,0,
	0,0,142,698,1,0,0,0,144,715,1,0,0,0,146,717,1,0,0,0,148,720,1,0,0,0,150,
	732,1,0,0,0,152,735,1,0,0,0,154,737,1,0,0,0,156,739,1,0,0,0,158,748,1,0,
	0,0,160,753,1,0,0,0,162,755,1,0,0,0,164,758,1,0,0,0,166,764,1,0,0,0,168,
	776,1,0,0,0,170,793,1,0,0,0,172,795,1,0,0,0,174,798,1,0,0,0,176,801,1,0,
	0,0,178,810,1,0,0,0,180,814,1,0,0,0,182,820,1,0,0,0,184,823,1,0,0,0,186,
	187,5,1,0,0,187,1,1,0,0,0,188,190,5,208,0,0,189,188,1,0,0,0,190,191,1,0,
	0,0,191,189,1,0,0,0,191,192,1,0,0,0,192,3,1,0,0,0,193,194,3,2,1,0,194,195,
	5,190,0,0,195,5,1,0,0,0,196,199,3,8,4,0,197,199,3,10,5,0,198,196,1,0,0,
	0,198,197,1,0,0,0,199,7,1,0,0,0,200,206,5,2,0,0,201,206,5,3,0,0,202,206,
	5,4,0,0,203,206,5,5,0,0,204,206,3,12,6,0,205,200,1,0,0,0,205,201,1,0,0,
	0,205,202,1,0,0,0,205,203,1,0,0,0,205,204,1,0,0,0,206,9,1,0,0,0,207,213,
	5,6,0,0,208,213,5,7,0,0,209,213,5,8,0,0,210,213,5,9,0,0,211,213,3,14,7,
	0,212,207,1,0,0,0,212,208,1,0,0,0,212,209,1,0,0,0,212,210,1,0,0,0,212,211,
	1,0,0,0,213,11,1,0,0,0,214,215,7,0,0,0,215,13,1,0,0,0,216,217,7,1,0,0,217,
	15,1,0,0,0,218,238,5,18,0,0,219,238,5,19,0,0,220,238,5,20,0,0,221,238,5,
	21,0,0,222,238,5,22,0,0,223,238,5,23,0,0,224,238,5,24,0,0,225,238,5,25,
	0,0,226,238,5,26,0,0,227,238,5,27,0,0,228,238,5,28,0,0,229,238,5,29,0,0,
	230,238,5,30,0,0,231,238,5,31,0,0,232,238,5,32,0,0,233,238,5,33,0,0,234,
	238,3,18,9,0,235,238,3,20,10,0,236,238,3,22,11,0,237,218,1,0,0,0,237,219,
	1,0,0,0,237,220,1,0,0,0,237,221,1,0,0,0,237,222,1,0,0,0,237,223,1,0,0,0,
	237,224,1,0,0,0,237,225,1,0,0,0,237,226,1,0,0,0,237,227,1,0,0,0,237,228,
	1,0,0,0,237,229,1,0,0,0,237,230,1,0,0,0,237,231,1,0,0,0,237,232,1,0,0,0,
	237,233,1,0,0,0,237,234,1,0,0,0,237,235,1,0,0,0,237,236,1,0,0,0,238,17,
	1,0,0,0,239,240,7,2,0,0,240,19,1,0,0,0,241,242,7,3,0,0,242,21,1,0,0,0,243,
	244,7,4,0,0,244,23,1,0,0,0,245,255,1,0,0,0,246,255,5,46,0,0,247,255,5,47,
	0,0,248,255,5,48,0,0,249,255,5,49,0,0,250,255,5,50,0,0,251,255,5,51,0,0,
	252,255,5,52,0,0,253,255,5,53,0,0,254,245,1,0,0,0,254,246,1,0,0,0,254,247,
	1,0,0,0,254,248,1,0,0,0,254,249,1,0,0,0,254,250,1,0,0,0,254,251,1,0,0,0,
	254,252,1,0,0,0,254,253,1,0,0,0,255,25,1,0,0,0,256,276,5,54,0,0,257,276,
	5,55,0,0,258,276,5,56,0,0,259,276,5,57,0,0,260,276,5,58,0,0,261,276,5,59,
	0,0,262,276,5,60,0,0,263,276,5,61,0,0,264,276,5,62,0,0,265,276,5,63,0,0,
	266,276,5,64,0,0,267,276,5,65,0,0,268,276,5,66,0,0,269,276,5,67,0,0,270,
	276,5,68,0,0,271,276,5,69,0,0,272,276,5,70,0,0,273,276,5,71,0,0,274,276,
	3,28,14,0,275,256,1,0,0,0,275,257,1,0,0,0,275,258,1,0,0,0,275,259,1,0,0,
	0,275,260,1,0,0,0,275,261,1,0,0,0,275,262,1,0,0,0,275,263,1,0,0,0,275,264,
	1,0,0,0,275,265,1,0,0,0,275,266,1,0,0,0,275,267,1,0,0,0,275,268,1,0,0,0,
	275,269,1,0,0,0,275,270,1,0,0,0,275,271,1,0,0,0,275,272,1,0,0,0,275,273,
	1,0,0,0,275,274,1,0,0,0,276,27,1,0,0,0,277,278,7,5,0,0,278,29,1,0,0,0,279,
	280,7,6,0,0,280,31,1,0,0,0,281,282,7,7,0,0,282,33,1,0,0,0,283,286,3,36,
	18,0,284,286,3,38,19,0,285,283,1,0,0,0,285,284,1,0,0,0,286,35,1,0,0,0,287,
	291,5,198,0,0,288,290,5,208,0,0,289,288,1,0,0,0,290,293,1,0,0,0,291,289,
	1,0,0,0,291,292,1,0,0,0,292,294,1,0,0,0,293,291,1,0,0,0,294,295,5,196,0,
	0,295,37,1,0,0,0,296,300,5,206,0,0,297,299,5,208,0,0,298,297,1,0,0,0,299,
	302,1,0,0,0,300,298,1,0,0,0,300,301,1,0,0,0,301,303,1,0,0,0,302,300,1,0,
	0,0,303,304,5,207,0,0,304,39,1,0,0,0,305,310,3,42,21,0,306,310,3,4,2,0,
	307,310,3,50,25,0,308,310,3,70,35,0,309,305,1,0,0,0,309,306,1,0,0,0,309,
	307,1,0,0,0,309,308,1,0,0,0,310,41,1,0,0,0,311,312,3,46,23,0,312,313,3,
	44,22,0,313,43,1,0,0,0,314,315,7,8,0,0,315,45,1,0,0,0,316,317,7,9,0,0,317,
	47,1,0,0,0,318,319,5,109,0,0,319,320,3,52,26,0,320,49,1,0,0,0,321,325,5,
	204,0,0,322,324,5,208,0,0,323,322,1,0,0,0,324,327,1,0,0,0,325,323,1,0,0,
	0,325,326,1,0,0,0,326,328,1,0,0,0,327,325,1,0,0,0,328,329,5,205,0,0,329,
	51,1,0,0,0,330,343,8,10,0,0,331,343,8,11,0,0,332,343,8,12,0,0,333,343,8,
	13,0,0,334,343,8,14,0,0,335,343,8,15,0,0,336,343,8,16,0,0,337,343,8,17,
	0,0,338,343,8,18,0,0,339,343,8,19,0,0,340,343,8,20,0,0,341,343,8,21,0,0,
	342,330,1,0,0,0,342,331,1,0,0,0,342,332,1,0,0,0,342,333,1,0,0,0,342,334,
	1,0,0,0,342,335,1,0,0,0,342,336,1,0,0,0,342,337,1,0,0,0,342,338,1,0,0,0,
	342,339,1,0,0,0,342,340,1,0,0,0,342,341,1,0,0,0,343,53,1,0,0,0,344,345,
	7,22,0,0,345,55,1,0,0,0,346,347,7,23,0,0,347,57,1,0,0,0,348,352,3,32,16,
	0,349,352,3,34,17,0,350,352,3,50,25,0,351,348,1,0,0,0,351,349,1,0,0,0,351,
	350,1,0,0,0,352,59,1,0,0,0,353,355,5,187,0,0,354,353,1,0,0,0,355,356,1,
	0,0,0,356,354,1,0,0,0,356,357,1,0,0,0,357,61,1,0,0,0,358,360,5,192,0,0,
	359,358,1,0,0,0,359,360,1,0,0,0,360,361,1,0,0,0,361,362,3,60,30,0,362,63,
	1,0,0,0,363,364,3,62,31,0,364,365,5,197,0,0,365,366,3,60,30,0,366,65,1,
	0,0,0,367,368,3,62,31,0,368,369,5,199,0,0,369,370,3,64,32,0,370,67,1,0,
	0,0,371,372,5,193,0,0,372,373,3,60,30,0,373,69,1,0,0,0,374,378,5,191,0,
	0,375,377,5,208,0,0,376,375,1,0,0,0,377,380,1,0,0,0,378,376,1,0,0,0,378,
	379,1,0,0,0,379,381,1,0,0,0,380,378,1,0,0,0,381,382,5,191,0,0,382,71,1,
	0,0,0,383,387,3,76,38,0,384,387,3,96,48,0,385,387,3,98,49,0,386,383,1,0,
	0,0,386,384,1,0,0,0,386,385,1,0,0,0,387,73,1,0,0,0,388,389,7,24,0,0,389,
	75,1,0,0,0,390,391,3,10,5,0,391,392,3,78,39,0,392,393,5,80,0,0,393,394,
	3,10,5,0,394,396,3,80,40,0,395,397,3,82,41,0,396,395,1,0,0,0,396,397,1,
	0,0,0,397,398,1,0,0,0,398,399,5,200,0,0,399,414,1,0,0,0,400,401,3,10,5,
	0,401,402,3,78,39,0,402,403,5,136,0,0,403,404,3,84,42,0,404,405,5,200,0,
	0,405,414,1,0,0,0,406,407,3,10,5,0,407,408,3,78,39,0,408,409,5,80,0,0,409,
	410,3,60,30,0,410,411,3,80,40,0,411,412,5,200,0,0,412,414,1,0,0,0,413,390,
	1,0,0,0,413,400,1,0,0,0,413,406,1,0,0,0,414,77,1,0,0,0,415,416,3,2,1,0,
	416,79,1,0,0,0,417,418,3,78,39,0,418,81,1,0,0,0,419,420,5,137,0,0,420,421,
	3,10,5,0,421,422,3,80,40,0,422,426,1,0,0,0,423,424,5,138,0,0,424,426,3,
	84,42,0,425,419,1,0,0,0,425,423,1,0,0,0,426,83,1,0,0,0,427,433,3,86,43,
	0,428,429,3,90,45,0,429,430,3,86,43,0,430,432,1,0,0,0,431,428,1,0,0,0,432,
	435,1,0,0,0,433,431,1,0,0,0,433,434,1,0,0,0,434,85,1,0,0,0,435,433,1,0,
	0,0,436,441,3,10,5,0,437,438,3,60,30,0,438,439,5,139,0,0,439,441,1,0,0,
	0,440,436,1,0,0,0,440,437,1,0,0,0,441,450,1,0,0,0,442,443,3,28,14,0,443,
	444,3,78,39,0,444,451,1,0,0,0,445,446,5,140,0,0,446,447,3,8,4,0,447,448,
	3,78,39,0,448,451,1,0,0,0,449,451,5,141,0,0,450,442,1,0,0,0,450,445,1,0,
	0,0,450,449,1,0,0,0,450,451,1,0,0,0,451,87,1,0,0,0,452,453,7,25,0,0,453,
	89,1,0,0,0,454,456,3,88,44,0,455,454,1,0,0,0,456,457,1,0,0,0,457,455,1,
	0,0,0,457,458,1,0,0,0,458,91,1,0,0,0,459,460,7,26,0,0,460,93,1,0,0,0,461,
	462,7,27,0,0,462,95,1,0,0,0,463,464,3,8,4,0,464,465,3,78,39,0,465,466,5,
	80,0,0,466,467,3,10,5,0,467,469,3,80,40,0,468,470,3,82,41,0,469,468,1,0,
	0,0,469,470,1,0,0,0,470,471,1,0,0,0,471,472,5,200,0,0,472,495,1,0,0,0,473,
	474,3,8,4,0,474,475,3,78,39,0,475,476,5,136,0,0,476,477,3,84,42,0,477,478,
	5,200,0,0,478,495,1,0,0,0,479,480,3,8,4,0,480,481,3,78,39,0,481,482,5,80,
	0,0,482,483,3,10,5,0,483,484,3,80,40,0,484,485,5,46,0,0,485,486,3,160,80,
	0,486,487,5,200,0,0,487,488,3,8,4,0,488,489,3,78,39,0,489,490,5,80,0,0,
	490,491,3,160,80,0,491,492,5,200,0,0,492,495,1,0,0,0,493,495,1,0,0,0,494,
	463,1,0,0,0,494,473,1,0,0,0,494,479,1,0,0,0,494,493,1,0,0,0,495,97,1,0,
	0,0,496,501,3,100,50,0,497,501,3,102,51,0,498,501,3,104,52,0,499,501,3,
	106,53,0,500,496,1,0,0,0,500,497,1,0,0,0,500,498,1,0,0,0,500,499,1,0,0,
	0,501,99,1,0,0,0,502,504,5,162,0,0,503,502,1,0,0,0,503,504,1,0,0,0,504,
	505,1,0,0,0,505,506,5,163,0,0,506,507,3,108,54,0,507,508,5,202,0,0,508,
	517,1,0,0,0,509,511,5,162,0,0,510,509,1,0,0,0,510,511,1,0,0,0,511,512,1,
	0,0,0,512,513,5,163,0,0,513,514,3,108,54,0,514,515,5,203,0,0,515,517,1,
	0,0,0,516,503,1,0,0,0,516,510,1,0,0,0,517,518,1,0,0,0,518,519,3,116,58,
	0,519,101,1,0,0,0,520,522,5,162,0,0,521,520,1,0,0,0,521,522,1,0,0,0,522,
	523,1,0,0,0,523,524,5,164,0,0,524,525,3,108,54,0,525,526,5,202,0,0,526,
	535,1,0,0,0,527,529,5,162,0,0,528,527,1,0,0,0,528,529,1,0,0,0,529,530,1,
	0,0,0,530,531,5,164,0,0,531,532,3,108,54,0,532,533,5,203,0,0,533,535,1,
	0,0,0,534,521,1,0,0,0,534,528,1,0,0,0,535,103,1,0,0,0,536,538,5,165,0,0,
	537,536,1,0,0,0,537,538,1,0,0,0,538,539,1,0,0,0,539,540,5,166,0,0,540,541,
	3,8,4,0,541,542,3,80,40,0,542,543,3,18,9,0,543,544,3,78,39,0,544,545,5,
	137,0,0,545,546,3,10,5,0,546,547,3,80,40,0,547,548,5,202,0,0,548,563,1,
	0,0,0,549,551,5,165,0,0,550,549,1,0,0,0,550,551,1,0,0,0,551,552,1,0,0,0,
	552,553,5,166,0,0,553,554,3,8,4,0,554,555,3,80,40,0,555,556,3,18,9,0,556,
	557,3,78,39,0,557,558,5,137,0,0,558,559,3,10,5,0,559,560,3,80,40,0,560,
	561,5,203,0,0,561,563,1,0,0,0,562,537,1,0,0,0,562,550,1,0,0,0,563,564,1,
	0,0,0,564,565,3,116,58,0,565,105,1,0,0,0,566,568,5,162,0,0,567,566,1,0,
	0,0,567,568,1,0,0,0,568,569,1,0,0,0,569,570,5,167,0,0,570,571,3,108,54,
	0,571,572,5,202,0,0,572,581,1,0,0,0,573,575,5,162,0,0,574,573,1,0,0,0,574,
	575,1,0,0,0,575,576,1,0,0,0,576,577,5,167,0,0,577,578,3,108,54,0,578,579,
	5,203,0,0,579,581,1,0,0,0,580,567,1,0,0,0,580,574,1,0,0,0,581,582,1,0,0,
	0,582,583,3,116,58,0,583,107,1,0,0,0,584,591,3,110,55,0,585,591,3,112,56,
	0,586,588,3,114,57,0,587,589,3,50,25,0,588,587,1,0,0,0,588,589,1,0,0,0,
	589,591,1,0,0,0,590,584,1,0,0,0,590,585,1,0,0,0,590,586,1,0,0,0,591,109,
	1,0,0,0,592,593,3,2,1,0,593,111,1,0,0,0,594,595,3,10,5,0,595,599,3,78,39,
	0,596,597,3,28,14,0,597,598,3,78,39,0,598,600,1,0,0,0,599,596,1,0,0,0,599,
	600,1,0,0,0,600,113,1,0,0,0,601,602,3,8,4,0,602,603,3,78,39,0,603,115,1,
	0,0,0,604,606,3,118,59,0,605,604,1,0,0,0,606,607,1,0,0,0,607,605,1,0,0,
	0,607,608,1,0,0,0,608,117,1,0,0,0,609,616,3,120,60,0,610,616,3,122,61,0,
	611,616,3,124,62,0,612,613,3,128,64,0,613,614,5,201,0,0,614,616,1,0,0,0,
	615,609,1,0,0,0,615,610,1,0,0,0,615,611,1,0,0,0,615,612,1,0,0,0,616,119,
	1,0,0,0,617,618,5,59,0,0,618,619,3,112,56,0,619,121,1,0,0,0,620,621,5,168,
	0,0,621,123,1,0,0,0,622,623,5,54,0,0,623,624,3,126,63,0,624,625,5,201,0,
	0,625,630,3,128,64,0,626,627,5,202,0,0,627,629,3,128,64,0,628,626,1,0,0,
	0,629,632,1,0,0,0,630,628,1,0,0,0,630,631,1,0,0,0,631,633,1,0,0,0,632,630,
	1,0,0,0,633,634,5,200,0,0,634,125,1,0,0,0,635,637,3,2,1,0,636,635,1,0,0,
	0,637,638,1,0,0,0,638,636,1,0,0,0,638,639,1,0,0,0,639,641,1,0,0,0,640,642,
	3,30,15,0,641,640,1,0,0,0,641,642,1,0,0,0,642,644,1,0,0,0,643,645,3,126,
	63,0,644,643,1,0,0,0,644,645,1,0,0,0,645,127,1,0,0,0,646,655,3,130,65,0,
	647,655,3,132,66,0,648,655,3,144,72,0,649,655,3,146,73,0,650,655,3,152,
	76,0,651,655,3,148,74,0,652,655,3,150,75,0,653,655,3,154,77,0,654,646,1,
	0,0,0,654,647,1,0,0,0,654,648,1,0,0,0,654,649,1,0,0,0,654,650,1,0,0,0,654,
	651,1,0,0,0,654,652,1,0,0,0,654,653,1,0,0,0,655,129,1,0,0,0,656,657,5,57,
	0,0,657,131,1,0,0,0,658,662,3,134,67,0,659,662,3,136,68,0,660,662,3,142,
	71,0,661,658,1,0,0,0,661,659,1,0,0,0,661,660,1,0,0,0,662,133,1,0,0,0,663,
	667,3,110,55,0,664,667,3,156,78,0,665,667,3,114,57,0,666,663,1,0,0,0,666,
	664,1,0,0,0,666,665,1,0,0,0,667,669,1,0,0,0,668,670,3,50,25,0,669,668,1,
	0,0,0,669,670,1,0,0,0,670,135,1,0,0,0,671,672,5,65,0,0,672,673,5,169,0,
	0,673,674,3,138,69,0,674,675,5,169,0,0,675,676,5,169,0,0,676,677,3,140,
	70,0,677,692,5,169,0,0,678,679,5,138,0,0,679,680,3,156,78,0,680,685,1,0,
	0,0,681,682,5,142,0,0,682,684,3,156,78,0,683,681,1,0,0,0,684,687,1,0,0,
	0,685,683,1,0,0,0,685,686,1,0,0,0,686,690,1,0,0,0,687,685,1,0,0,0,688,689,
	5,66,0,0,689,691,3,170,85,0,690,688,1,0,0,0,690,691,1,0,0,0,691,693,1,0,
	0,0,692,678,1,0,0,0,692,693,1,0,0,0,693,137,1,0,0,0,694,695,3,2,1,0,695,
	139,1,0,0,0,696,697,3,2,1,0,697,141,1,0,0,0,698,699,5,65,0,0,699,713,3,
	156,78,0,700,701,5,138,0,0,701,706,3,156,78,0,702,703,5,142,0,0,703,705,
	3,156,78,0,704,702,1,0,0,0,705,708,1,0,0,0,706,704,1,0,0,0,706,707,1,0,
	0,0,707,711,1,0,0,0,708,706,1,0,0,0,709,710,5,66,0,0,710,712,3,170,85,0,
	711,709,1,0,0,0,711,712,1,0,0,0,712,714,1,0,0,0,713,700,1,0,0,0,713,714,
	1,0,0,0,714,143,1,0,0,0,715,716,5,58,0,0,716,145,1,0,0,0,717,718,5,64,0,
	0,718,719,3,68,34,0,719,147,1,0,0,0,720,721,5,170,0,0,721,722,3,6,3,0,722,
	723,3,170,85,0,723,727,5,171,0,0,724,728,3,110,55,0,725,728,3,112,56,0,
	726,728,3,114,57,0,727,724,1,0,0,0,727,725,1,0,0,0,727,726,1,0,0,0,728,
	730,1,0,0,0,729,731,3,50,25,0,730,729,1,0,0,0,730,731,1,0,0,0,731,149,1,
	0,0,0,732,733,5,67,0,0,733,734,3,156,78,0,734,151,1,0,0,0,735,736,5,56,
	0,0,736,153,1,0,0,0,737,738,7,28,0,0,738,155,1,0,0,0,739,745,3,170,85,0,
	740,741,3,158,79,0,741,742,3,170,85,0,742,744,1,0,0,0,743,740,1,0,0,0,744,
	747,1,0,0,0,745,743,1,0,0,0,745,746,1,0,0,0,746,157,1,0,0,0,747,745,1,0,
	0,0,748,749,7,29,0,0,749,159,1,0,0,0,750,754,3,162,81,0,751,754,3,164,82,
	0,752,754,3,168,84,0,753,750,1,0,0,0,753,751,1,0,0,0,753,752,1,0,0,0,754,
	161,1,0,0,0,755,756,5,192,0,0,756,757,3,160,80,0,757,163,1,0,0,0,758,759,
	5,199,0,0,759,760,3,160,80,0,760,165,1,0,0,0,761,765,3,62,31,0,762,765,
	3,64,32,0,763,765,3,66,33,0,764,761,1,0,0,0,764,762,1,0,0,0,764,763,1,0,
	0,0,765,167,1,0,0,0,766,768,3,166,83,0,767,769,3,80,40,0,768,767,1,0,0,
	0,768,769,1,0,0,0,769,777,1,0,0,0,770,777,3,70,35,0,771,777,3,68,34,0,772,
	777,5,61,0,0,773,777,5,62,0,0,774,777,5,69,0,0,775,777,5,182,0,0,776,766,
	1,0,0,0,776,770,1,0,0,0,776,771,1,0,0,0,776,772,1,0,0,0,776,773,1,0,0,0,
	776,774,1,0,0,0,776,775,1,0,0,0,777,169,1,0,0,0,778,794,3,172,86,0,779,
	794,3,174,87,0,780,794,3,176,88,0,781,794,3,178,89,0,782,787,3,180,90,0,
	783,784,5,161,0,0,784,785,3,10,5,0,785,786,3,80,40,0,786,788,1,0,0,0,787,
	783,1,0,0,0,787,788,1,0,0,0,788,791,1,0,0,0,789,790,5,197,0,0,790,792,3,
	170,85,0,791,789,1,0,0,0,791,792,1,0,0,0,792,794,1,0,0,0,793,778,1,0,0,
	0,793,779,1,0,0,0,793,780,1,0,0,0,793,781,1,0,0,0,793,782,1,0,0,0,794,171,
	1,0,0,0,795,796,5,192,0,0,796,797,3,170,85,0,797,173,1,0,0,0,798,799,5,
	199,0,0,799,800,3,170,85,0,800,175,1,0,0,0,801,802,3,10,5,0,802,806,3,78,
	39,0,803,804,3,28,14,0,804,805,3,78,39,0,805,807,1,0,0,0,806,803,1,0,0,
	0,806,807,1,0,0,0,807,808,1,0,0,0,808,809,3,182,91,0,809,177,1,0,0,0,810,
	811,3,8,4,0,811,812,3,78,39,0,812,813,3,182,91,0,813,179,1,0,0,0,814,815,
	3,168,84,0,815,816,3,182,91,0,816,181,1,0,0,0,817,819,3,184,92,0,818,817,
	1,0,0,0,819,822,1,0,0,0,820,818,1,0,0,0,820,821,1,0,0,0,821,183,1,0,0,0,
	822,820,1,0,0,0,823,829,5,109,0,0,824,830,3,78,39,0,825,830,3,104,52,0,
	826,830,5,183,0,0,827,830,5,184,0,0,828,830,5,185,0,0,829,824,1,0,0,0,829,
	825,1,0,0,0,829,826,1,0,0,0,829,827,1,0,0,0,829,828,1,0,0,0,830,185,1,0,
	0,0,72,191,198,205,212,237,254,275,285,291,300,309,325,342,351,356,359,
	378,386,396,413,425,433,440,450,457,469,494,500,503,510,516,521,528,534,
	537,550,562,567,574,580,588,590,599,607,615,630,638,641,644,654,661,666,
	669,685,690,692,706,711,713,727,730,745,753,764,768,776,787,791,793,806,
	820,829];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!PortuguesPuroParser.__ATN) {
			PortuguesPuroParser.__ATN = new ATNDeserializer().deserialize(PortuguesPuroParser._serializedATN);
		}

		return PortuguesPuroParser.__ATN;
	}


	static DecisionsToDFA = PortuguesPuroParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class Regra_espacoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_regra_espaco;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterRegra_espaco) {
	 		listener.enterRegra_espaco(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitRegra_espaco) {
	 		listener.exitRegra_espaco(this);
		}
	}
}


export class PalavraContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CARACTERES_IMPRIMIVEIS_list(): TerminalNode[] {
	    	return this.getTokens(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
	}
	public CARACTERES_IMPRIMIVEIS(i: number): TerminalNode {
		return this.getToken(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS, i);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_palavra;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterPalavra) {
	 		listener.enterPalavra(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitPalavra) {
	 		listener.exitPalavra(this);
		}
	}
}


export class PossessivoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public palavra(): PalavraContext {
		return this.getTypedRuleContext(PalavraContext, 0) as PalavraContext;
	}
	public APOSTROFO(): TerminalNode {
		return this.getToken(PortuguesPuroParser.APOSTROFO, 0);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_possessivo;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterPossessivo) {
	 		listener.enterPossessivo(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitPossessivo) {
	 		listener.exitPossessivo(this);
		}
	}
}


export class ArtigoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public artigo_definido(): Artigo_definidoContext {
		return this.getTypedRuleContext(Artigo_definidoContext, 0) as Artigo_definidoContext;
	}
	public artigo_indefinido(): Artigo_indefinidoContext {
		return this.getTypedRuleContext(Artigo_indefinidoContext, 0) as Artigo_indefinidoContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_artigo;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterArtigo) {
	 		listener.enterArtigo(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitArtigo) {
	 		listener.exitArtigo(this);
		}
	}
}


export class Artigo_definidoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public adjacentes(): AdjacentesContext {
		return this.getTypedRuleContext(AdjacentesContext, 0) as AdjacentesContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_artigo_definido;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterArtigo_definido) {
	 		listener.enterArtigo_definido(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitArtigo_definido) {
	 		listener.exitArtigo_definido(this);
		}
	}
}


export class Artigo_indefinidoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public abrangentes(): AbrangentesContext {
		return this.getTypedRuleContext(AbrangentesContext, 0) as AbrangentesContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_artigo_indefinido;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterArtigo_indefinido) {
	 		listener.enterArtigo_indefinido(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitArtigo_indefinido) {
	 		listener.exitArtigo_indefinido(this);
		}
	}
}


export class AdjacentesContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_adjacentes;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterAdjacentes) {
	 		listener.enterAdjacentes(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitAdjacentes) {
	 		listener.exitAdjacentes(this);
		}
	}
}


export class AbrangentesContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_abrangentes;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterAbrangentes) {
	 		listener.enterAbrangentes(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitAbrangentes) {
	 		listener.exitAbrangentes(this);
		}
	}
}


export class ContracoesContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public atribuidores_de_posse(): Atribuidores_de_posseContext {
		return this.getTypedRuleContext(Atribuidores_de_posseContext, 0) as Atribuidores_de_posseContext;
	}
	public p1(): P1Context {
		return this.getTypedRuleContext(P1Context, 0) as P1Context;
	}
	public p2(): P2Context {
		return this.getTypedRuleContext(P2Context, 0) as P2Context;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_contracoes;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterContracoes) {
	 		listener.enterContracoes(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitContracoes) {
	 		listener.exitContracoes(this);
		}
	}
}


export class Atribuidores_de_posseContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_atribuidores_de_posse;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterAtribuidores_de_posse) {
	 		listener.enterAtribuidores_de_posse(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitAtribuidores_de_posse) {
	 		listener.exitAtribuidores_de_posse(this);
		}
	}
}


export class P1Context extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_p1;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterP1) {
	 		listener.enterP1(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitP1) {
	 		listener.exitP1(this);
		}
	}
}


export class P2Context extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_p2;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterP2) {
	 		listener.enterP2(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitP2) {
	 		listener.exitP2(this);
		}
	}
}


export class Operadores_de_comparacaoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_operadores_de_comparacao;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterOperadores_de_comparacao) {
	 		listener.enterOperadores_de_comparacao(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitOperadores_de_comparacao) {
	 		listener.exitOperadores_de_comparacao(this);
		}
	}
}


export class Palavras_reservadasContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public denominacoes(): DenominacoesContext {
		return this.getTypedRuleContext(DenominacoesContext, 0) as DenominacoesContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_palavras_reservadas;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterPalavras_reservadas) {
	 		listener.enterPalavras_reservadas(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitPalavras_reservadas) {
	 		listener.exitPalavras_reservadas(this);
		}
	}
}


export class DenominacoesContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_denominacoes;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterDenominacoes) {
	 		listener.enterDenominacoes(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitDenominacoes) {
	 		listener.exitDenominacoes(this);
		}
	}
}


export class VerbosContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_verbos;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterVerbos) {
	 		listener.enterVerbos(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitVerbos) {
	 		listener.exitVerbos(this);
		}
	}
}


export class Caracteres_ignoraveisContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CARACTERES_DE_CONTROLE(): TerminalNode {
		return this.getToken(PortuguesPuroParser.CARACTERES_DE_CONTROLE, 0);
	}
	public ESPACO_EM_BRANCO(): TerminalNode {
		return this.getToken(PortuguesPuroParser.ESPACO_EM_BRANCO, 0);
	}
	public ESPACO_RIGIDO(): TerminalNode {
		return this.getToken(PortuguesPuroParser.ESPACO_RIGIDO, 0);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_caracteres_ignoraveis;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterCaracteres_ignoraveis) {
	 		listener.enterCaracteres_ignoraveis(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitCaracteres_ignoraveis) {
	 		listener.exitCaracteres_ignoraveis(this);
		}
	}
}


export class ComentarioContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public comentario_de_linha(): Comentario_de_linhaContext {
		return this.getTypedRuleContext(Comentario_de_linhaContext, 0) as Comentario_de_linhaContext;
	}
	public comentario_de_bloco(): Comentario_de_blocoContext {
		return this.getTypedRuleContext(Comentario_de_blocoContext, 0) as Comentario_de_blocoContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_comentario;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterComentario) {
	 		listener.enterComentario(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitComentario) {
	 		listener.exitComentario(this);
		}
	}
}


export class Comentario_de_linhaContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public BARRA_INVERTIDA(): TerminalNode {
		return this.getToken(PortuguesPuroParser.BARRA_INVERTIDA, 0);
	}
	public QUEBRA_DE_LINHA(): TerminalNode {
		return this.getToken(PortuguesPuroParser.QUEBRA_DE_LINHA, 0);
	}
	public CARACTERES_IMPRIMIVEIS_list(): TerminalNode[] {
	    	return this.getTokens(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
	}
	public CARACTERES_IMPRIMIVEIS(i: number): TerminalNode {
		return this.getToken(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS, i);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_comentario_de_linha;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterComentario_de_linha) {
	 		listener.enterComentario_de_linha(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitComentario_de_linha) {
	 		listener.exitComentario_de_linha(this);
		}
	}
}


export class Comentario_de_blocoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ABRE_COLCHETES(): TerminalNode {
		return this.getToken(PortuguesPuroParser.ABRE_COLCHETES, 0);
	}
	public FECHA_COLCHETES(): TerminalNode {
		return this.getToken(PortuguesPuroParser.FECHA_COLCHETES, 0);
	}
	public CARACTERES_IMPRIMIVEIS_list(): TerminalNode[] {
	    	return this.getTokens(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
	}
	public CARACTERES_IMPRIMIVEIS(i: number): TerminalNode {
		return this.getToken(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS, i);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_comentario_de_bloco;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterComentario_de_bloco) {
	 		listener.enterComentario_de_bloco(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitComentario_de_bloco) {
	 		listener.exitComentario_de_bloco(this);
		}
	}
}


export class TokenContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public aglomerado(): AglomeradoContext {
		return this.getTypedRuleContext(AglomeradoContext, 0) as AglomeradoContext;
	}
	public possessivo(): PossessivoContext {
		return this.getTypedRuleContext(PossessivoContext, 0) as PossessivoContext;
	}
	public qualificador(): QualificadorContext {
		return this.getTypedRuleContext(QualificadorContext, 0) as QualificadorContext;
	}
	public string_literal(): String_literalContext {
		return this.getTypedRuleContext(String_literalContext, 0) as String_literalContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_token;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterToken) {
	 		listener.enterToken(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitToken) {
	 		listener.exitToken(this);
		}
	}
}


export class AglomeradoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public iniciador_de_aglomerado(): Iniciador_de_aglomeradoContext {
		return this.getTypedRuleContext(Iniciador_de_aglomeradoContext, 0) as Iniciador_de_aglomeradoContext;
	}
	public caractere_aglomeravel(): Caractere_aglomeravelContext {
		return this.getTypedRuleContext(Caractere_aglomeravelContext, 0) as Caractere_aglomeravelContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_aglomerado;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterAglomerado) {
	 		listener.enterAglomerado(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitAglomerado) {
	 		listener.exitAglomerado(this);
		}
	}
}


export class Caractere_aglomeravelContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LETRA(): TerminalNode {
		return this.getToken(PortuguesPuroParser.LETRA, 0);
	}
	public DIGITO(): TerminalNode {
		return this.getToken(PortuguesPuroParser.DIGITO, 0);
	}
	public CIFRAO(): TerminalNode {
		return this.getToken(PortuguesPuroParser.CIFRAO, 0);
	}
	public HIFEN(): TerminalNode {
		return this.getToken(PortuguesPuroParser.HIFEN, 0);
	}
	public SINAL_DE_ADICAO(): TerminalNode {
		return this.getToken(PortuguesPuroParser.SINAL_DE_ADICAO, 0);
	}
	public BARRA_INCLINADA(): TerminalNode {
		return this.getToken(PortuguesPuroParser.BARRA_INCLINADA, 0);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_caractere_aglomeravel;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterCaractere_aglomeravel) {
	 		listener.enterCaractere_aglomeravel(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitCaractere_aglomeravel) {
	 		listener.exitCaractere_aglomeravel(this);
		}
	}
}


export class Iniciador_de_aglomeradoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LETRA(): TerminalNode {
		return this.getToken(PortuguesPuroParser.LETRA, 0);
	}
	public DIGITO(): TerminalNode {
		return this.getToken(PortuguesPuroParser.DIGITO, 0);
	}
	public CIFRAO(): TerminalNode {
		return this.getToken(PortuguesPuroParser.CIFRAO, 0);
	}
	public APOSTROFO(): TerminalNode {
		return this.getToken(PortuguesPuroParser.APOSTROFO, 0);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_iniciador_de_aglomerado;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterIniciador_de_aglomerado) {
	 		listener.enterIniciador_de_aglomerado(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitIniciador_de_aglomerado) {
	 		listener.exitIniciador_de_aglomerado(this);
		}
	}
}


export class Possessivo_novoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public caractere_nao_aglomeravel(): Caractere_nao_aglomeravelContext {
		return this.getTypedRuleContext(Caractere_nao_aglomeravelContext, 0) as Caractere_nao_aglomeravelContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_possessivo_novo;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterPossessivo_novo) {
	 		listener.enterPossessivo_novo(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitPossessivo_novo) {
	 		listener.exitPossessivo_novo(this);
		}
	}
}


export class QualificadorContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ABRE_PARENTESES(): TerminalNode {
		return this.getToken(PortuguesPuroParser.ABRE_PARENTESES, 0);
	}
	public FECHA_PARENTESES(): TerminalNode {
		return this.getToken(PortuguesPuroParser.FECHA_PARENTESES, 0);
	}
	public CARACTERES_IMPRIMIVEIS_list(): TerminalNode[] {
	    	return this.getTokens(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
	}
	public CARACTERES_IMPRIMIVEIS(i: number): TerminalNode {
		return this.getToken(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS, i);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_qualificador;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterQualificador) {
	 		listener.enterQualificador(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitQualificador) {
	 		listener.exitQualificador(this);
		}
	}
}


export class Caractere_nao_aglomeravelContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LETRA(): TerminalNode {
		return this.getToken(PortuguesPuroParser.LETRA, 0);
	}
	public DIGITO(): TerminalNode {
		return this.getToken(PortuguesPuroParser.DIGITO, 0);
	}
	public CIFRAO(): TerminalNode {
		return this.getToken(PortuguesPuroParser.CIFRAO, 0);
	}
	public HIFEN(): TerminalNode {
		return this.getToken(PortuguesPuroParser.HIFEN, 0);
	}
	public SINAL_DE_ADICAO(): TerminalNode {
		return this.getToken(PortuguesPuroParser.SINAL_DE_ADICAO, 0);
	}
	public BARRA_INCLINADA(): TerminalNode {
		return this.getToken(PortuguesPuroParser.BARRA_INCLINADA, 0);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_caractere_nao_aglomeravel;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterCaractere_nao_aglomeravel) {
	 		listener.enterCaractere_nao_aglomeravel(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitCaractere_nao_aglomeravel) {
	 		listener.exitCaractere_nao_aglomeravel(this);
		}
	}
}


export class Sinal_de_pontuacaoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PONTO(): TerminalNode {
		return this.getToken(PortuguesPuroParser.PONTO, 0);
	}
	public VIRGULA(): TerminalNode {
		return this.getToken(PortuguesPuroParser.VIRGULA, 0);
	}
	public PONTO_E_VIRGULA(): TerminalNode {
		return this.getToken(PortuguesPuroParser.PONTO_E_VIRGULA, 0);
	}
	public DOIS_PONTOS(): TerminalNode {
		return this.getToken(PortuguesPuroParser.DOIS_PONTOS, 0);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_sinal_de_pontuacao;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterSinal_de_pontuacao) {
	 		listener.enterSinal_de_pontuacao(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitSinal_de_pontuacao) {
	 		listener.exitSinal_de_pontuacao(this);
		}
	}
}


export class Simbolos_especiaisContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SINAL_DE_ADICAO(): TerminalNode {
		return this.getToken(PortuguesPuroParser.SINAL_DE_ADICAO, 0);
	}
	public HIFEN(): TerminalNode {
		return this.getToken(PortuguesPuroParser.HIFEN, 0);
	}
	public BARRA_INCLINADA(): TerminalNode {
		return this.getToken(PortuguesPuroParser.BARRA_INCLINADA, 0);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_simbolos_especiais;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterSimbolos_especiais) {
	 		listener.enterSimbolos_especiais(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitSimbolos_especiais) {
	 		listener.exitSimbolos_especiais(this);
		}
	}
}


export class NoiseContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public caracteres_ignoraveis(): Caracteres_ignoraveisContext {
		return this.getTypedRuleContext(Caracteres_ignoraveisContext, 0) as Caracteres_ignoraveisContext;
	}
	public comentario(): ComentarioContext {
		return this.getTypedRuleContext(ComentarioContext, 0) as ComentarioContext;
	}
	public qualificador(): QualificadorContext {
		return this.getTypedRuleContext(QualificadorContext, 0) as QualificadorContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_noise;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterNoise) {
	 		listener.enterNoise(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitNoise) {
	 		listener.exitNoise(this);
		}
	}
}


export class Numero_inteiroContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DIGITO_list(): TerminalNode[] {
	    	return this.getTokens(PortuguesPuroParser.DIGITO);
	}
	public DIGITO(i: number): TerminalNode {
		return this.getToken(PortuguesPuroParser.DIGITO, i);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_numero_inteiro;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterNumero_inteiro) {
	 		listener.enterNumero_inteiro(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitNumero_inteiro) {
	 		listener.exitNumero_inteiro(this);
		}
	}
}


export class Numero_decimalContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public numero_inteiro(): Numero_inteiroContext {
		return this.getTypedRuleContext(Numero_inteiroContext, 0) as Numero_inteiroContext;
	}
	public HIFEN(): TerminalNode {
		return this.getToken(PortuguesPuroParser.HIFEN, 0);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_numero_decimal;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterNumero_decimal) {
	 		listener.enterNumero_decimal(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitNumero_decimal) {
	 		listener.exitNumero_decimal(this);
		}
	}
}


export class Numero_fracionarioContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public numero_decimal(): Numero_decimalContext {
		return this.getTypedRuleContext(Numero_decimalContext, 0) as Numero_decimalContext;
	}
	public BARRA_INCLINADA(): TerminalNode {
		return this.getToken(PortuguesPuroParser.BARRA_INCLINADA, 0);
	}
	public numero_inteiro(): Numero_inteiroContext {
		return this.getTypedRuleContext(Numero_inteiroContext, 0) as Numero_inteiroContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_numero_fracionario;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterNumero_fracionario) {
	 		listener.enterNumero_fracionario(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitNumero_fracionario) {
	 		listener.exitNumero_fracionario(this);
		}
	}
}


export class Numero_mistoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public numero_decimal(): Numero_decimalContext {
		return this.getTypedRuleContext(Numero_decimalContext, 0) as Numero_decimalContext;
	}
	public SINAL_DE_ADICAO(): TerminalNode {
		return this.getToken(PortuguesPuroParser.SINAL_DE_ADICAO, 0);
	}
	public numero_fracionario(): Numero_fracionarioContext {
		return this.getTypedRuleContext(Numero_fracionarioContext, 0) as Numero_fracionarioContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_numero_misto;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterNumero_misto) {
	 		listener.enterNumero_misto(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitNumero_misto) {
	 		listener.exitNumero_misto(this);
		}
	}
}


export class Numero_hexadecimalContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CIFRAO(): TerminalNode {
		return this.getToken(PortuguesPuroParser.CIFRAO, 0);
	}
	public numero_inteiro(): Numero_inteiroContext {
		return this.getTypedRuleContext(Numero_inteiroContext, 0) as Numero_inteiroContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_numero_hexadecimal;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterNumero_hexadecimal) {
	 		listener.enterNumero_hexadecimal(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitNumero_hexadecimal) {
	 		listener.exitNumero_hexadecimal(this);
		}
	}
}


export class String_literalContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ASPAS_DUPLAS_list(): TerminalNode[] {
	    	return this.getTokens(PortuguesPuroParser.ASPAS_DUPLAS);
	}
	public ASPAS_DUPLAS(i: number): TerminalNode {
		return this.getToken(PortuguesPuroParser.ASPAS_DUPLAS, i);
	}
	public CARACTERES_IMPRIMIVEIS_list(): TerminalNode[] {
	    	return this.getTokens(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
	}
	public CARACTERES_IMPRIMIVEIS(i: number): TerminalNode {
		return this.getToken(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS, i);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_string_literal;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterString_literal) {
	 		listener.enterString_literal(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitString_literal) {
	 		listener.exitString_literal(this);
		}
	}
}


export class ProgramaContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public tipo(): TipoContext {
		return this.getTypedRuleContext(TipoContext, 0) as TipoContext;
	}
	public variavel_global(): Variavel_globalContext {
		return this.getTypedRuleContext(Variavel_globalContext, 0) as Variavel_globalContext;
	}
	public rotina(): RotinaContext {
		return this.getTypedRuleContext(RotinaContext, 0) as RotinaContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_programa;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterPrograma) {
	 		listener.enterPrograma(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitPrograma) {
	 		listener.exitPrograma(this);
		}
	}
}


export class Tipos_primitivosContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_tipos_primitivos;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterTipos_primitivos) {
	 		listener.enterTipos_primitivos(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitTipos_primitivos) {
	 		listener.exitTipos_primitivos(this);
		}
	}
}


export class TipoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public artigo_indefinido_list(): Artigo_indefinidoContext[] {
		return this.getTypedRuleContexts(Artigo_indefinidoContext) as Artigo_indefinidoContext[];
	}
	public artigo_indefinido(i: number): Artigo_indefinidoContext {
		return this.getTypedRuleContext(Artigo_indefinidoContext, i) as Artigo_indefinidoContext;
	}
	public nome(): NomeContext {
		return this.getTypedRuleContext(NomeContext, 0) as NomeContext;
	}
	public nome_do_tipo(): Nome_do_tipoContext {
		return this.getTypedRuleContext(Nome_do_tipoContext, 0) as Nome_do_tipoContext;
	}
	public PONTO(): TerminalNode {
		return this.getToken(PortuguesPuroParser.PONTO, 0);
	}
	public informacao_opcional(): Informacao_opcionalContext {
		return this.getTypedRuleContext(Informacao_opcionalContext, 0) as Informacao_opcionalContext;
	}
	public campos(): CamposContext {
		return this.getTypedRuleContext(CamposContext, 0) as CamposContext;
	}
	public numero_inteiro(): Numero_inteiroContext {
		return this.getTypedRuleContext(Numero_inteiroContext, 0) as Numero_inteiroContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_tipo;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterTipo) {
	 		listener.enterTipo(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitTipo) {
	 		listener.exitTipo(this);
		}
	}
}


export class NomeContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public palavra(): PalavraContext {
		return this.getTypedRuleContext(PalavraContext, 0) as PalavraContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_nome;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterNome) {
	 		listener.enterNome(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitNome) {
	 		listener.exitNome(this);
		}
	}
}


export class Nome_do_tipoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public nome(): NomeContext {
		return this.getTypedRuleContext(NomeContext, 0) as NomeContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_nome_do_tipo;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterNome_do_tipo) {
	 		listener.enterNome_do_tipo(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitNome_do_tipo) {
	 		listener.exitNome_do_tipo(this);
		}
	}
}


export class Informacao_opcionalContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public artigo_indefinido(): Artigo_indefinidoContext {
		return this.getTypedRuleContext(Artigo_indefinidoContext, 0) as Artigo_indefinidoContext;
	}
	public nome_do_tipo(): Nome_do_tipoContext {
		return this.getTypedRuleContext(Nome_do_tipoContext, 0) as Nome_do_tipoContext;
	}
	public campos(): CamposContext {
		return this.getTypedRuleContext(CamposContext, 0) as CamposContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_informacao_opcional;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterInformacao_opcional) {
	 		listener.enterInformacao_opcional(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitInformacao_opcional) {
	 		listener.exitInformacao_opcional(this);
		}
	}
}


export class CamposContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public campo_list(): CampoContext[] {
		return this.getTypedRuleContexts(CampoContext) as CampoContext[];
	}
	public campo(i: number): CampoContext {
		return this.getTypedRuleContext(CampoContext, i) as CampoContext;
	}
	public pausas_list(): PausasContext[] {
		return this.getTypedRuleContexts(PausasContext) as PausasContext[];
	}
	public pausas(i: number): PausasContext {
		return this.getTypedRuleContext(PausasContext, i) as PausasContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_campos;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterCampos) {
	 		listener.enterCampos(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitCampos) {
	 		listener.exitCampos(this);
		}
	}
}


export class CampoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public artigo_indefinido(): Artigo_indefinidoContext {
		return this.getTypedRuleContext(Artigo_indefinidoContext, 0) as Artigo_indefinidoContext;
	}
	public numero_inteiro(): Numero_inteiroContext {
		return this.getTypedRuleContext(Numero_inteiroContext, 0) as Numero_inteiroContext;
	}
	public denominacoes(): DenominacoesContext {
		return this.getTypedRuleContext(DenominacoesContext, 0) as DenominacoesContext;
	}
	public nome(): NomeContext {
		return this.getTypedRuleContext(NomeContext, 0) as NomeContext;
	}
	public artigo_definido(): Artigo_definidoContext {
		return this.getTypedRuleContext(Artigo_definidoContext, 0) as Artigo_definidoContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_campo;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterCampo) {
	 		listener.enterCampo(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitCampo) {
	 		listener.exitCampo(this);
		}
	}
}


export class PausaContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public VIRGULA(): TerminalNode {
		return this.getToken(PortuguesPuroParser.VIRGULA, 0);
	}
	public PONTO_E_VIRGULA(): TerminalNode {
		return this.getToken(PortuguesPuroParser.PONTO_E_VIRGULA, 0);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_pausa;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterPausa) {
	 		listener.enterPausa(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitPausa) {
	 		listener.exitPausa(this);
		}
	}
}


export class PausasContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public pausa_list(): PausaContext[] {
		return this.getTypedRuleContexts(PausaContext) as PausaContext[];
	}
	public pausa(i: number): PausaContext {
		return this.getTypedRuleContext(PausaContext, i) as PausaContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_pausas;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterPausas) {
	 		listener.enterPausas(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitPausas) {
	 		listener.exitPausas(this);
		}
	}
}


export class ConjuncoesContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_conjuncoes;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterConjuncoes) {
	 		listener.enterConjuncoes(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitConjuncoes) {
	 		listener.exitConjuncoes(this);
		}
	}
}


export class PreposicoesContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_preposicoes;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterPreposicoes) {
	 		listener.enterPreposicoes(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitPreposicoes) {
	 		listener.exitPreposicoes(this);
		}
	}
}


export class Variavel_globalContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public artigo_definido_list(): Artigo_definidoContext[] {
		return this.getTypedRuleContexts(Artigo_definidoContext) as Artigo_definidoContext[];
	}
	public artigo_definido(i: number): Artigo_definidoContext {
		return this.getTypedRuleContext(Artigo_definidoContext, i) as Artigo_definidoContext;
	}
	public nome_list(): NomeContext[] {
		return this.getTypedRuleContexts(NomeContext) as NomeContext[];
	}
	public nome(i: number): NomeContext {
		return this.getTypedRuleContext(NomeContext, i) as NomeContext;
	}
	public artigo_indefinido(): Artigo_indefinidoContext {
		return this.getTypedRuleContext(Artigo_indefinidoContext, 0) as Artigo_indefinidoContext;
	}
	public nome_do_tipo(): Nome_do_tipoContext {
		return this.getTypedRuleContext(Nome_do_tipoContext, 0) as Nome_do_tipoContext;
	}
	public PONTO_list(): TerminalNode[] {
	    	return this.getTokens(PortuguesPuroParser.PONTO);
	}
	public PONTO(i: number): TerminalNode {
		return this.getToken(PortuguesPuroParser.PONTO, i);
	}
	public informacao_opcional(): Informacao_opcionalContext {
		return this.getTypedRuleContext(Informacao_opcionalContext, 0) as Informacao_opcionalContext;
	}
	public campos(): CamposContext {
		return this.getTypedRuleContext(CamposContext, 0) as CamposContext;
	}
	public termo_constante_list(): Termo_constanteContext[] {
		return this.getTypedRuleContexts(Termo_constanteContext) as Termo_constanteContext[];
	}
	public termo_constante(i: number): Termo_constanteContext {
		return this.getTypedRuleContext(Termo_constanteContext, i) as Termo_constanteContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_variavel_global;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterVariavel_global) {
	 		listener.enterVariavel_global(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitVariavel_global) {
	 		listener.exitVariavel_global(this);
		}
	}
}


export class RotinaContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public procedimento(): ProcedimentoContext {
		return this.getTypedRuleContext(ProcedimentoContext, 0) as ProcedimentoContext;
	}
	public decisor(): DecisorContext {
		return this.getTypedRuleContext(DecisorContext, 0) as DecisorContext;
	}
	public funcao(): FuncaoContext {
		return this.getTypedRuleContext(FuncaoContext, 0) as FuncaoContext;
	}
	public retroinvocacao(): RetroinvocacaoContext {
		return this.getTypedRuleContext(RetroinvocacaoContext, 0) as RetroinvocacaoContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_rotina;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterRotina) {
	 		listener.enterRotina(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitRotina) {
	 		listener.exitRotina(this);
		}
	}
}


export class ProcedimentoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public instrucoes(): InstrucoesContext {
		return this.getTypedRuleContext(InstrucoesContext, 0) as InstrucoesContext;
	}
	public nome_da_rotina(): Nome_da_rotinaContext {
		return this.getTypedRuleContext(Nome_da_rotinaContext, 0) as Nome_da_rotinaContext;
	}
	public PONTO_E_VIRGULA(): TerminalNode {
		return this.getToken(PortuguesPuroParser.PONTO_E_VIRGULA, 0);
	}
	public DOIS_PONTOS(): TerminalNode {
		return this.getToken(PortuguesPuroParser.DOIS_PONTOS, 0);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_procedimento;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterProcedimento) {
	 		listener.enterProcedimento(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitProcedimento) {
	 		listener.exitProcedimento(this);
		}
	}
}


export class DecisorContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public nome_da_rotina(): Nome_da_rotinaContext {
		return this.getTypedRuleContext(Nome_da_rotinaContext, 0) as Nome_da_rotinaContext;
	}
	public PONTO_E_VIRGULA(): TerminalNode {
		return this.getToken(PortuguesPuroParser.PONTO_E_VIRGULA, 0);
	}
	public DOIS_PONTOS(): TerminalNode {
		return this.getToken(PortuguesPuroParser.DOIS_PONTOS, 0);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_decisor;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterDecisor) {
	 		listener.enterDecisor(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitDecisor) {
	 		listener.exitDecisor(this);
		}
	}
}


export class FuncaoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public instrucoes(): InstrucoesContext {
		return this.getTypedRuleContext(InstrucoesContext, 0) as InstrucoesContext;
	}
	public artigo_definido(): Artigo_definidoContext {
		return this.getTypedRuleContext(Artigo_definidoContext, 0) as Artigo_definidoContext;
	}
	public nome_do_tipo_list(): Nome_do_tipoContext[] {
		return this.getTypedRuleContexts(Nome_do_tipoContext) as Nome_do_tipoContext[];
	}
	public nome_do_tipo(i: number): Nome_do_tipoContext {
		return this.getTypedRuleContext(Nome_do_tipoContext, i) as Nome_do_tipoContext;
	}
	public atribuidores_de_posse(): Atribuidores_de_posseContext {
		return this.getTypedRuleContext(Atribuidores_de_posseContext, 0) as Atribuidores_de_posseContext;
	}
	public nome(): NomeContext {
		return this.getTypedRuleContext(NomeContext, 0) as NomeContext;
	}
	public artigo_indefinido(): Artigo_indefinidoContext {
		return this.getTypedRuleContext(Artigo_indefinidoContext, 0) as Artigo_indefinidoContext;
	}
	public PONTO_E_VIRGULA(): TerminalNode {
		return this.getToken(PortuguesPuroParser.PONTO_E_VIRGULA, 0);
	}
	public DOIS_PONTOS(): TerminalNode {
		return this.getToken(PortuguesPuroParser.DOIS_PONTOS, 0);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_funcao;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterFuncao) {
	 		listener.enterFuncao(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitFuncao) {
	 		listener.exitFuncao(this);
		}
	}
}


export class RetroinvocacaoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public instrucoes(): InstrucoesContext {
		return this.getTypedRuleContext(InstrucoesContext, 0) as InstrucoesContext;
	}
	public nome_da_rotina(): Nome_da_rotinaContext {
		return this.getTypedRuleContext(Nome_da_rotinaContext, 0) as Nome_da_rotinaContext;
	}
	public PONTO_E_VIRGULA(): TerminalNode {
		return this.getToken(PortuguesPuroParser.PONTO_E_VIRGULA, 0);
	}
	public DOIS_PONTOS(): TerminalNode {
		return this.getToken(PortuguesPuroParser.DOIS_PONTOS, 0);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_retroinvocacao;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterRetroinvocacao) {
	 		listener.enterRetroinvocacao(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitRetroinvocacao) {
	 		listener.exitRetroinvocacao(this);
		}
	}
}


export class Nome_da_rotinaContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public unidade_semantica(): Unidade_semanticaContext {
		return this.getTypedRuleContext(Unidade_semanticaContext, 0) as Unidade_semanticaContext;
	}
	public parametro(): ParametroContext {
		return this.getTypedRuleContext(ParametroContext, 0) as ParametroContext;
	}
	public frase(): FraseContext {
		return this.getTypedRuleContext(FraseContext, 0) as FraseContext;
	}
	public qualificador(): QualificadorContext {
		return this.getTypedRuleContext(QualificadorContext, 0) as QualificadorContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_nome_da_rotina;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterNome_da_rotina) {
	 		listener.enterNome_da_rotina(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitNome_da_rotina) {
	 		listener.exitNome_da_rotina(this);
		}
	}
}


export class Unidade_semanticaContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public palavra(): PalavraContext {
		return this.getTypedRuleContext(PalavraContext, 0) as PalavraContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_unidade_semantica;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterUnidade_semantica) {
	 		listener.enterUnidade_semantica(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitUnidade_semantica) {
	 		listener.exitUnidade_semantica(this);
		}
	}
}


export class ParametroContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public artigo_indefinido(): Artigo_indefinidoContext {
		return this.getTypedRuleContext(Artigo_indefinidoContext, 0) as Artigo_indefinidoContext;
	}
	public nome_list(): NomeContext[] {
		return this.getTypedRuleContexts(NomeContext) as NomeContext[];
	}
	public nome(i: number): NomeContext {
		return this.getTypedRuleContext(NomeContext, i) as NomeContext;
	}
	public denominacoes(): DenominacoesContext {
		return this.getTypedRuleContext(DenominacoesContext, 0) as DenominacoesContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_parametro;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterParametro) {
	 		listener.enterParametro(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitParametro) {
	 		listener.exitParametro(this);
		}
	}
}


export class FraseContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public artigo_definido(): Artigo_definidoContext {
		return this.getTypedRuleContext(Artigo_definidoContext, 0) as Artigo_definidoContext;
	}
	public nome(): NomeContext {
		return this.getTypedRuleContext(NomeContext, 0) as NomeContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_frase;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterFrase) {
	 		listener.enterFrase(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitFrase) {
	 		listener.exitFrase(this);
		}
	}
}


export class InstrucoesContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public instrucao_list(): InstrucaoContext[] {
		return this.getTypedRuleContexts(InstrucaoContext) as InstrucaoContext[];
	}
	public instrucao(i: number): InstrucaoContext {
		return this.getTypedRuleContext(InstrucaoContext, i) as InstrucaoContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_instrucoes;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterInstrucoes) {
	 		listener.enterInstrucoes(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitInstrucoes) {
	 		listener.exitInstrucoes(this);
		}
	}
}


export class InstrucaoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public preservacao(): PreservacaoContext {
		return this.getTypedRuleContext(PreservacaoContext, 0) as PreservacaoContext;
	}
	public iteracao(): IteracaoContext {
		return this.getTypedRuleContext(IteracaoContext, 0) as IteracaoContext;
	}
	public condicional(): CondicionalContext {
		return this.getTypedRuleContext(CondicionalContext, 0) as CondicionalContext;
	}
	public incondicional(): IncondicionalContext {
		return this.getTypedRuleContext(IncondicionalContext, 0) as IncondicionalContext;
	}
	public VIRGULA(): TerminalNode {
		return this.getToken(PortuguesPuroParser.VIRGULA, 0);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_instrucao;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterInstrucao) {
	 		listener.enterInstrucao(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitInstrucao) {
	 		listener.exitInstrucao(this);
		}
	}
}


export class PreservacaoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public parametro(): ParametroContext {
		return this.getTypedRuleContext(ParametroContext, 0) as ParametroContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_preservacao;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterPreservacao) {
	 		listener.enterPreservacao(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitPreservacao) {
	 		listener.exitPreservacao(this);
		}
	}
}


export class IteracaoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_iteracao;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterIteracao) {
	 		listener.enterIteracao(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitIteracao) {
	 		listener.exitIteracao(this);
		}
	}
}


export class CondicionalContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expressao_decisora(): Expressao_decisoraContext {
		return this.getTypedRuleContext(Expressao_decisoraContext, 0) as Expressao_decisoraContext;
	}
	public VIRGULA(): TerminalNode {
		return this.getToken(PortuguesPuroParser.VIRGULA, 0);
	}
	public incondicional_list(): IncondicionalContext[] {
		return this.getTypedRuleContexts(IncondicionalContext) as IncondicionalContext[];
	}
	public incondicional(i: number): IncondicionalContext {
		return this.getTypedRuleContext(IncondicionalContext, i) as IncondicionalContext;
	}
	public PONTO(): TerminalNode {
		return this.getToken(PortuguesPuroParser.PONTO, 0);
	}
	public PONTO_E_VIRGULA_list(): TerminalNode[] {
	    	return this.getTokens(PortuguesPuroParser.PONTO_E_VIRGULA);
	}
	public PONTO_E_VIRGULA(i: number): TerminalNode {
		return this.getToken(PortuguesPuroParser.PONTO_E_VIRGULA, i);
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_condicional;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterCondicional) {
	 		listener.enterCondicional(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitCondicional) {
	 		listener.exitCondicional(this);
		}
	}
}


export class Expressao_decisoraContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public palavra_list(): PalavraContext[] {
		return this.getTypedRuleContexts(PalavraContext) as PalavraContext[];
	}
	public palavra(i: number): PalavraContext {
		return this.getTypedRuleContext(PalavraContext, i) as PalavraContext;
	}
	public verbos(): VerbosContext {
		return this.getTypedRuleContext(VerbosContext, 0) as VerbosContext;
	}
	public expressao_decisora(): Expressao_decisoraContext {
		return this.getTypedRuleContext(Expressao_decisoraContext, 0) as Expressao_decisoraContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_expressao_decisora;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterExpressao_decisora) {
	 		listener.enterExpressao_decisora(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitExpressao_decisora) {
	 		listener.exitExpressao_decisora(this);
		}
	}
}


export class IncondicionalContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public interrupcao(): InterrupcaoContext {
		return this.getTypedRuleContext(InterrupcaoContext, 0) as InterrupcaoContext;
	}
	public invocacao(): InvocacaoContext {
		return this.getTypedRuleContext(InvocacaoContext, 0) as InvocacaoContext;
	}
	public retorno(): RetornoContext {
		return this.getTypedRuleContext(RetornoContext, 0) as RetornoContext;
	}
	public decodificacao(): DecodificacaoContext {
		return this.getTypedRuleContext(DecodificacaoContext, 0) as DecodificacaoContext;
	}
	public reiteracao(): ReiteracaoContext {
		return this.getTypedRuleContext(ReiteracaoContext, 0) as ReiteracaoContext;
	}
	public indirecao(): IndirecaoContext {
		return this.getTypedRuleContext(IndirecaoContext, 0) as IndirecaoContext;
	}
	public empilhamento(): EmpilhamentoContext {
		return this.getTypedRuleContext(EmpilhamentoContext, 0) as EmpilhamentoContext;
	}
	public retorno_booleano(): Retorno_booleanoContext {
		return this.getTypedRuleContext(Retorno_booleanoContext, 0) as Retorno_booleanoContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_incondicional;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterIncondicional) {
	 		listener.enterIncondicional(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitIncondicional) {
	 		listener.exitIncondicional(this);
		}
	}
}


export class InterrupcaoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_interrupcao;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterInterrupcao) {
	 		listener.enterInterrupcao(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitInterrupcao) {
	 		listener.exitInterrupcao(this);
		}
	}
}


export class InvocacaoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public invocacao_interna(): Invocacao_internaContext {
		return this.getTypedRuleContext(Invocacao_internaContext, 0) as Invocacao_internaContext;
	}
	public invocacao_externa(): Invocacao_externaContext {
		return this.getTypedRuleContext(Invocacao_externaContext, 0) as Invocacao_externaContext;
	}
	public invocacao_indireta(): Invocacao_indiretaContext {
		return this.getTypedRuleContext(Invocacao_indiretaContext, 0) as Invocacao_indiretaContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_invocacao;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterInvocacao) {
	 		listener.enterInvocacao(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitInvocacao) {
	 		listener.exitInvocacao(this);
		}
	}
}


export class Invocacao_internaContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public unidade_semantica(): Unidade_semanticaContext {
		return this.getTypedRuleContext(Unidade_semanticaContext, 0) as Unidade_semanticaContext;
	}
	public expressao(): ExpressaoContext {
		return this.getTypedRuleContext(ExpressaoContext, 0) as ExpressaoContext;
	}
	public frase(): FraseContext {
		return this.getTypedRuleContext(FraseContext, 0) as FraseContext;
	}
	public qualificador(): QualificadorContext {
		return this.getTypedRuleContext(QualificadorContext, 0) as QualificadorContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_invocacao_interna;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterInvocacao_interna) {
	 		listener.enterInvocacao_interna(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitInvocacao_interna) {
	 		listener.exitInvocacao_interna(this);
		}
	}
}


export class Invocacao_externaContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public nome_da_DLL(): Nome_da_DLLContext {
		return this.getTypedRuleContext(Nome_da_DLLContext, 0) as Nome_da_DLLContext;
	}
	public nome_da_funcao(): Nome_da_funcaoContext {
		return this.getTypedRuleContext(Nome_da_funcaoContext, 0) as Nome_da_funcaoContext;
	}
	public expressao_list(): ExpressaoContext[] {
		return this.getTypedRuleContexts(ExpressaoContext) as ExpressaoContext[];
	}
	public expressao(i: number): ExpressaoContext {
		return this.getTypedRuleContext(ExpressaoContext, i) as ExpressaoContext;
	}
	public termo(): TermoContext {
		return this.getTypedRuleContext(TermoContext, 0) as TermoContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_invocacao_externa;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterInvocacao_externa) {
	 		listener.enterInvocacao_externa(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitInvocacao_externa) {
	 		listener.exitInvocacao_externa(this);
		}
	}
}


export class Nome_da_DLLContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public palavra(): PalavraContext {
		return this.getTypedRuleContext(PalavraContext, 0) as PalavraContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_nome_da_DLL;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterNome_da_DLL) {
	 		listener.enterNome_da_DLL(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitNome_da_DLL) {
	 		listener.exitNome_da_DLL(this);
		}
	}
}


export class Nome_da_funcaoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public palavra(): PalavraContext {
		return this.getTypedRuleContext(PalavraContext, 0) as PalavraContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_nome_da_funcao;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterNome_da_funcao) {
	 		listener.enterNome_da_funcao(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitNome_da_funcao) {
	 		listener.exitNome_da_funcao(this);
		}
	}
}


export class Invocacao_indiretaContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expressao_list(): ExpressaoContext[] {
		return this.getTypedRuleContexts(ExpressaoContext) as ExpressaoContext[];
	}
	public expressao(i: number): ExpressaoContext {
		return this.getTypedRuleContext(ExpressaoContext, i) as ExpressaoContext;
	}
	public termo(): TermoContext {
		return this.getTypedRuleContext(TermoContext, 0) as TermoContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_invocacao_indireta;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterInvocacao_indireta) {
	 		listener.enterInvocacao_indireta(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitInvocacao_indireta) {
	 		listener.exitInvocacao_indireta(this);
		}
	}
}


export class RetornoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_retorno;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterRetorno) {
	 		listener.enterRetorno(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitRetorno) {
	 		listener.exitRetorno(this);
		}
	}
}


export class DecodificacaoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public numero_hexadecimal(): Numero_hexadecimalContext {
		return this.getTypedRuleContext(Numero_hexadecimalContext, 0) as Numero_hexadecimalContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_decodificacao;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterDecodificacao) {
	 		listener.enterDecodificacao(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitDecodificacao) {
	 		listener.exitDecodificacao(this);
		}
	}
}


export class IndirecaoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public artigo(): ArtigoContext {
		return this.getTypedRuleContext(ArtigoContext, 0) as ArtigoContext;
	}
	public termo(): TermoContext {
		return this.getTypedRuleContext(TermoContext, 0) as TermoContext;
	}
	public unidade_semantica(): Unidade_semanticaContext {
		return this.getTypedRuleContext(Unidade_semanticaContext, 0) as Unidade_semanticaContext;
	}
	public parametro(): ParametroContext {
		return this.getTypedRuleContext(ParametroContext, 0) as ParametroContext;
	}
	public frase(): FraseContext {
		return this.getTypedRuleContext(FraseContext, 0) as FraseContext;
	}
	public qualificador(): QualificadorContext {
		return this.getTypedRuleContext(QualificadorContext, 0) as QualificadorContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_indirecao;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterIndirecao) {
	 		listener.enterIndirecao(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitIndirecao) {
	 		listener.exitIndirecao(this);
		}
	}
}


export class EmpilhamentoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expressao(): ExpressaoContext {
		return this.getTypedRuleContext(ExpressaoContext, 0) as ExpressaoContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_empilhamento;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterEmpilhamento) {
	 		listener.enterEmpilhamento(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitEmpilhamento) {
	 		listener.exitEmpilhamento(this);
		}
	}
}


export class ReiteracaoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_reiteracao;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterReiteracao) {
	 		listener.enterReiteracao(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitReiteracao) {
	 		listener.exitReiteracao(this);
		}
	}
}


export class Retorno_booleanoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_retorno_booleano;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterRetorno_booleano) {
	 		listener.enterRetorno_booleano(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitRetorno_booleano) {
	 		listener.exitRetorno_booleano(this);
		}
	}
}


export class ExpressaoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public termo_list(): TermoContext[] {
		return this.getTypedRuleContexts(TermoContext) as TermoContext[];
	}
	public termo(i: number): TermoContext {
		return this.getTypedRuleContext(TermoContext, i) as TermoContext;
	}
	public operadores_comuns_list(): Operadores_comunsContext[] {
		return this.getTypedRuleContexts(Operadores_comunsContext) as Operadores_comunsContext[];
	}
	public operadores_comuns(i: number): Operadores_comunsContext {
		return this.getTypedRuleContext(Operadores_comunsContext, i) as Operadores_comunsContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_expressao;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterExpressao) {
	 		listener.enterExpressao(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitExpressao) {
	 		listener.exitExpressao(this);
		}
	}
}


export class Operadores_comunsContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_operadores_comuns;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterOperadores_comuns) {
	 		listener.enterOperadores_comuns(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitOperadores_comuns) {
	 		listener.exitOperadores_comuns(this);
		}
	}
}


export class Termo_constanteContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public termo_constante_negativo(): Termo_constante_negativoContext {
		return this.getTypedRuleContext(Termo_constante_negativoContext, 0) as Termo_constante_negativoContext;
	}
	public termo_constante_positivo(): Termo_constante_positivoContext {
		return this.getTypedRuleContext(Termo_constante_positivoContext, 0) as Termo_constante_positivoContext;
	}
	public literal(): LiteralContext {
		return this.getTypedRuleContext(LiteralContext, 0) as LiteralContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_termo_constante;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterTermo_constante) {
	 		listener.enterTermo_constante(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitTermo_constante) {
	 		listener.exitTermo_constante(this);
		}
	}
}


export class Termo_constante_negativoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public HIFEN(): TerminalNode {
		return this.getToken(PortuguesPuroParser.HIFEN, 0);
	}
	public termo_constante(): Termo_constanteContext {
		return this.getTypedRuleContext(Termo_constanteContext, 0) as Termo_constanteContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_termo_constante_negativo;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterTermo_constante_negativo) {
	 		listener.enterTermo_constante_negativo(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitTermo_constante_negativo) {
	 		listener.exitTermo_constante_negativo(this);
		}
	}
}


export class Termo_constante_positivoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SINAL_DE_ADICAO(): TerminalNode {
		return this.getToken(PortuguesPuroParser.SINAL_DE_ADICAO, 0);
	}
	public termo_constante(): Termo_constanteContext {
		return this.getTypedRuleContext(Termo_constanteContext, 0) as Termo_constanteContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_termo_constante_positivo;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterTermo_constante_positivo) {
	 		listener.enterTermo_constante_positivo(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitTermo_constante_positivo) {
	 		listener.exitTermo_constante_positivo(this);
		}
	}
}


export class NumeroContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public numero_decimal(): Numero_decimalContext {
		return this.getTypedRuleContext(Numero_decimalContext, 0) as Numero_decimalContext;
	}
	public numero_fracionario(): Numero_fracionarioContext {
		return this.getTypedRuleContext(Numero_fracionarioContext, 0) as Numero_fracionarioContext;
	}
	public numero_misto(): Numero_mistoContext {
		return this.getTypedRuleContext(Numero_mistoContext, 0) as Numero_mistoContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_numero;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterNumero) {
	 		listener.enterNumero(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitNumero) {
	 		listener.exitNumero(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public numero(): NumeroContext {
		return this.getTypedRuleContext(NumeroContext, 0) as NumeroContext;
	}
	public nome_do_tipo(): Nome_do_tipoContext {
		return this.getTypedRuleContext(Nome_do_tipoContext, 0) as Nome_do_tipoContext;
	}
	public string_literal(): String_literalContext {
		return this.getTypedRuleContext(String_literalContext, 0) as String_literalContext;
	}
	public numero_hexadecimal(): Numero_hexadecimalContext {
		return this.getTypedRuleContext(Numero_hexadecimalContext, 0) as Numero_hexadecimalContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_literal;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterLiteral) {
	 		listener.enterLiteral(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitLiteral) {
	 		listener.exitLiteral(this);
		}
	}
}


export class TermoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public termo_negativo(): Termo_negativoContext {
		return this.getTypedRuleContext(Termo_negativoContext, 0) as Termo_negativoContext;
	}
	public termo_positivo(): Termo_positivoContext {
		return this.getTypedRuleContext(Termo_positivoContext, 0) as Termo_positivoContext;
	}
	public variavel_local(): Variavel_localContext {
		return this.getTypedRuleContext(Variavel_localContext, 0) as Variavel_localContext;
	}
	public variavel(): VariavelContext {
		return this.getTypedRuleContext(VariavelContext, 0) as VariavelContext;
	}
	public termo_literal(): Termo_literalContext {
		return this.getTypedRuleContext(Termo_literalContext, 0) as Termo_literalContext;
	}
	public artigo_indefinido(): Artigo_indefinidoContext {
		return this.getTypedRuleContext(Artigo_indefinidoContext, 0) as Artigo_indefinidoContext;
	}
	public nome_do_tipo(): Nome_do_tipoContext {
		return this.getTypedRuleContext(Nome_do_tipoContext, 0) as Nome_do_tipoContext;
	}
	public BARRA_INCLINADA(): TerminalNode {
		return this.getToken(PortuguesPuroParser.BARRA_INCLINADA, 0);
	}
	public termo(): TermoContext {
		return this.getTypedRuleContext(TermoContext, 0) as TermoContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_termo;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterTermo) {
	 		listener.enterTermo(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitTermo) {
	 		listener.exitTermo(this);
		}
	}
}


export class Termo_negativoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public HIFEN(): TerminalNode {
		return this.getToken(PortuguesPuroParser.HIFEN, 0);
	}
	public termo(): TermoContext {
		return this.getTypedRuleContext(TermoContext, 0) as TermoContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_termo_negativo;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterTermo_negativo) {
	 		listener.enterTermo_negativo(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitTermo_negativo) {
	 		listener.exitTermo_negativo(this);
		}
	}
}


export class Termo_positivoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SINAL_DE_ADICAO(): TerminalNode {
		return this.getToken(PortuguesPuroParser.SINAL_DE_ADICAO, 0);
	}
	public termo(): TermoContext {
		return this.getTypedRuleContext(TermoContext, 0) as TermoContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_termo_positivo;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterTermo_positivo) {
	 		listener.enterTermo_positivo(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitTermo_positivo) {
	 		listener.exitTermo_positivo(this);
		}
	}
}


export class Variavel_localContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public artigo_indefinido(): Artigo_indefinidoContext {
		return this.getTypedRuleContext(Artigo_indefinidoContext, 0) as Artigo_indefinidoContext;
	}
	public nome_list(): NomeContext[] {
		return this.getTypedRuleContexts(NomeContext) as NomeContext[];
	}
	public nome(i: number): NomeContext {
		return this.getTypedRuleContext(NomeContext, i) as NomeContext;
	}
	public possessivos(): PossessivosContext {
		return this.getTypedRuleContext(PossessivosContext, 0) as PossessivosContext;
	}
	public denominacoes(): DenominacoesContext {
		return this.getTypedRuleContext(DenominacoesContext, 0) as DenominacoesContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_variavel_local;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterVariavel_local) {
	 		listener.enterVariavel_local(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitVariavel_local) {
	 		listener.exitVariavel_local(this);
		}
	}
}


export class VariavelContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public artigo_definido(): Artigo_definidoContext {
		return this.getTypedRuleContext(Artigo_definidoContext, 0) as Artigo_definidoContext;
	}
	public nome(): NomeContext {
		return this.getTypedRuleContext(NomeContext, 0) as NomeContext;
	}
	public possessivos(): PossessivosContext {
		return this.getTypedRuleContext(PossessivosContext, 0) as PossessivosContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_variavel;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterVariavel) {
	 		listener.enterVariavel(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitVariavel) {
	 		listener.exitVariavel(this);
		}
	}
}


export class Termo_literalContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public literal(): LiteralContext {
		return this.getTypedRuleContext(LiteralContext, 0) as LiteralContext;
	}
	public possessivos(): PossessivosContext {
		return this.getTypedRuleContext(PossessivosContext, 0) as PossessivosContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_termo_literal;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterTermo_literal) {
	 		listener.enterTermo_literal(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitTermo_literal) {
	 		listener.exitTermo_literal(this);
		}
	}
}


export class PossessivosContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public possessivo_antigo_list(): Possessivo_antigoContext[] {
		return this.getTypedRuleContexts(Possessivo_antigoContext) as Possessivo_antigoContext[];
	}
	public possessivo_antigo(i: number): Possessivo_antigoContext {
		return this.getTypedRuleContext(Possessivo_antigoContext, i) as Possessivo_antigoContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_possessivos;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterPossessivos) {
	 		listener.enterPossessivos(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitPossessivos) {
	 		listener.exitPossessivos(this);
		}
	}
}


export class Possessivo_antigoContext extends ParserRuleContext {
	constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public nome(): NomeContext {
		return this.getTypedRuleContext(NomeContext, 0) as NomeContext;
	}
	public funcao(): FuncaoContext {
		return this.getTypedRuleContext(FuncaoContext, 0) as FuncaoContext;
	}
    public get ruleIndex(): number {
    	return PortuguesPuroParser.RULE_possessivo_antigo;
	}
	public enterRule(listener: PortuguesPuroListener): void {
	    if(listener.enterPossessivo_antigo) {
	 		listener.enterPossessivo_antigo(this);
		}
	}
	public exitRule(listener: PortuguesPuroListener): void {
	    if(listener.exitPossessivo_antigo) {
	 		listener.exitPossessivo_antigo(this);
		}
	}
}
