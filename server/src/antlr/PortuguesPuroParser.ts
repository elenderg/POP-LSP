// Generated from PortuguesPuro.g4 by ANTLR 4.13.2
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
import PortuguesPuroListener from "./PortuguesPuroListener";
import PortuguesPuroVisitor from "./PortuguesPuroVisitor";

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
  public static readonly LETRA = 182;
  public static readonly DÍGITO = 183;
  public static readonly SÍMBOLO = 184;
  public static readonly ESPAÇO = 185;
  public static readonly APÓSTROFO = 186;
  public static readonly ASPAS_DUPLAS = 187;
  public static readonly HÍFEN = 188;
  public static readonly CIFRÃO = 189;
  public static readonly ESPAÇO_EM_BRANCO = 190;
  public static readonly ESPAÇO_RÍGIDO = 191;
  public static readonly QUEBRA_DE_LINHA = 192;
  public static readonly BARRA_INCLINADA = 193;
  public static readonly BARRA_INVERTIDA = 194;
  public static readonly SINAL_DE_ADIÇÃO = 195;
  public static readonly PONTO = 196;
  public static readonly VÍRGULA = 197;
  public static readonly PONTO_E_VÍRGULA = 198;
  public static readonly DOIS_PONTOS = 199;
  public static readonly ABRE_PARÊNTESES = 200;
  public static readonly FECHA_PARÊNTESES = 201;
  public static readonly ABRE_COLCHETES = 202;
  public static readonly FECHA_COLCHETES = 203;
  public static readonly CARACTERES_IMPRIMÍVEIS = 204;
  public static readonly CARACTERES_DE_CONTROLE = 205;
  public static override readonly EOF = Token.EOF;
  public static readonly RULE_regra_espaço = 0;
  public static readonly RULE_palavra = 1;
  public static readonly RULE_possessivo_inglês = 2;
  public static readonly RULE_artigo = 3;
  public static readonly RULE_artigo_definido = 4;
  public static readonly RULE_artigo_indefinido = 5;
  public static readonly RULE_adjacentes = 6;
  public static readonly RULE_abrangentes = 7;
  public static readonly RULE_contrações = 8;
  public static readonly RULE_atribuidores_de_posse = 9;
  public static readonly RULE_p1 = 10;
  public static readonly RULE_p2 = 11;
  public static readonly RULE_operadores_de_comparação = 12;
  public static readonly RULE_palavras_reservadas = 13;
  public static readonly RULE_denominações = 14;
  public static readonly RULE_verbos = 15;
  public static readonly RULE_caracteres_ignoráveis = 16;
  public static readonly RULE_comentário = 17;
  public static readonly RULE_comentário_de_linha = 18;
  public static readonly RULE_comentário_de_bloco = 19;
  public static readonly RULE_token = 20;
  public static readonly RULE_aglomerado = 21;
  public static readonly RULE_caractere_aglomerável = 22;
  public static readonly RULE_iniciador_de_aglomerado = 23;
  public static readonly RULE_possessivo_novo = 24;
  public static readonly RULE_qualificador = 25;
  public static readonly RULE_caractere_não_aglomerável = 26;
  public static readonly RULE_sinal_de_pontuação = 27;
  public static readonly RULE_símbolos_especiais = 28;
  public static readonly RULE_ruído = 29;
  public static readonly RULE_número_inteiro = 30;
  public static readonly RULE_número_decimal = 31;
  public static readonly RULE_número_fracionário = 32;
  public static readonly RULE_número_misto = 33;
  public static readonly RULE_número_hexadecimal = 34;
  public static readonly RULE_string_literal = 35;
  public static readonly RULE_programa = 36;
  public static readonly RULE_tipos_primitivos = 37;
  public static readonly RULE_tipo = 38;
  public static readonly RULE_nome = 39;
  public static readonly RULE_nome_do_tipo = 40;
  public static readonly RULE_informação_opcional = 41;
  public static readonly RULE_campos = 42;
  public static readonly RULE_bytes = 43;
  public static readonly RULE_referência = 44;
  public static readonly RULE_campo = 45;
  public static readonly RULE_pausa = 46;
  public static readonly RULE_pausas = 47;
  public static readonly RULE_conjunções = 48;
  public static readonly RULE_preposições = 49;
  public static readonly RULE_é = 50;
  public static readonly RULE_estrutura = 51;
  public static readonly RULE_igual_a = 52;
  public static readonly RULE_variável_global = 53;
  public static readonly RULE_rotina = 54;
  public static readonly RULE_procedimento = 55;
  public static readonly RULE_determine_se = 56;
  public static readonly RULE_decisor = 57;
  public static readonly RULE_função2 = 58;
  public static readonly RULE_atribua = 59;
  public static readonly RULE_função = 60;
  public static readonly RULE_para = 61;
  public static readonly RULE_que_se = 62;
  public static readonly RULE_rotina2 = 63;
  public static readonly RULE_compativelmente = 64;
  public static readonly RULE_retroinvocação = 65;
  public static readonly RULE_nome_da_rotina = 66;
  public static readonly RULE_unidade_semântica = 67;
  public static readonly RULE_parâmetro = 68;
  public static readonly RULE_frase = 69;
  public static readonly RULE_instruções = 70;
  public static readonly RULE_instrução = 71;
  public static readonly RULE_preserve = 72;
  public static readonly RULE_preservação = 73;
  public static readonly RULE_iteração = 74;
  public static readonly RULE_se = 75;
  public static readonly RULE_condicional = 76;
  public static readonly RULE_expressão_decisora = 77;
  public static readonly RULE_incondicional = 78;
  public static readonly RULE_interrupção = 79;
  public static readonly RULE_invocação = 80;
  public static readonly RULE_invocação_interna = 81;
  public static readonly RULE_invocação_externa = 82;
  public static readonly RULE_aspas_duplas = 83;
  public static readonly RULE_nome_da_DLL = 84;
  public static readonly RULE_nome_da_função = 85;
  public static readonly RULE_processe = 86;
  public static readonly RULE_com = 87;
  public static readonly RULE_e = 88;
  public static readonly RULE_retornando = 89;
  public static readonly RULE_invocação_indireta = 90;
  public static readonly RULE_retorno = 91;
  public static readonly RULE_decodifique = 92;
  public static readonly RULE_decodificação = 93;
  public static readonly RULE_aponte = 94;
  public static readonly RULE_para_rotina = 95;
  public static readonly RULE_indireção = 96;
  public static readonly RULE_push = 97;
  public static readonly RULE_empilhamento = 98;
  public static readonly RULE_reiteração = 99;
  public static readonly RULE_diga = 100;
  public static readonly RULE_retorno_booleano = 101;
  public static readonly RULE_expressão = 102;
  public static readonly RULE_operadores_comuns = 103;
  public static readonly RULE_booleano = 104;
  public static readonly RULE_nulo = 105;
  public static readonly RULE_termo_constante = 106;
  public static readonly RULE_termo_constante_negativo = 107;
  public static readonly RULE_termo_constante_positivo = 108;
  public static readonly RULE_número = 109;
  public static readonly RULE_literal = 110;
  public static readonly RULE_termo = 111;
  public static readonly RULE_sinal_de_divisão = 112;
  public static readonly RULE_como = 113;
  public static readonly RULE_termo_negativo = 114;
  public static readonly RULE_termo_positivo = 115;
  public static readonly RULE_variável_local = 116;
  public static readonly RULE_variável = 117;
  public static readonly RULE_termo_literal = 118;
  public static readonly RULE_conteúdo = 119;
  public static readonly RULE_magnitude = 120;
  public static readonly RULE_endereçamento = 121;
  public static readonly RULE_possessivos_inglês = 122;
  public static readonly RULE_possessivo_inglês_antigo = 123;
  public static readonly RULE_possessivo_português = 124;
  public static readonly RULE_apóstrofo = 125;
  public static readonly literalNames: (string | null)[] = [ null, "' '", 
                                                            "'o'", "'a'", 
                                                            "'os'", "'as'", 
                                                            "'um'", "'uma'", 
                                                            "'uns'", "'umas'", 
                                                            "'este'", "'esta'", 
                                                            "'estes'", "'estas'", 
                                                            "'esse'", "'essa'", 
                                                            "'esses'", "'essas'", 
                                                            "'ao'", "'\\u00E0'", 
                                                            "'aos'", "'\\u00E0s'", 
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
                                                            "'n\\u00E3o'", 
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
                                                            "'\\u00E9'", 
                                                            "'est\\u00E1'", 
                                                            "'estiver'", 
                                                            "'for'", "'forem'", 
                                                            "'s\\u00E3o'", 
                                                            "'est\\u00E3o'", 
                                                            "'estiverem'", 
                                                            "'ser'", "'serem'", 
                                                            "'estar'", "'poder'", 
                                                            "'puder'", "'foi'", 
                                                            "'estamos'", 
                                                            "'h\\u00E1'", 
                                                            "'pode'", "'existe'", 
                                                            "'existir'", 
                                                            "'cont\\u00E9m'", 
                                                            "'contiver'", 
                                                            "'possui'", 
                                                            "'possuir'", 
                                                            "'~'", "'@'", 
                                                            "'#'", "'%'", 
                                                            "'_'", "'&'", 
                                                            "'!'", "'?'", 
                                                            "'|'", "'*'", 
                                                            "'^'", "'<'", 
                                                            "'>'", "'{'", 
                                                            "'}'", "'byte'", 
                                                            "'caractere'", 
                                                            "'word'", "'n\\u00FAmero'", 
                                                            "'sinalizador'", 
                                                            "'ponteiro'", 
                                                            "'estrutura'", 
                                                            "'string'", 
                                                            "'subtexto'", 
                                                            "'texto hexadecimal'", 
                                                            "'lista'", "'lista estruturada'", 
                                                            "'listas'", 
                                                            "'propor\\u00E7\\u00E3o'", 
                                                            "'fra\\u00E7\\u00E3o'", 
                                                            "'numerador'", 
                                                            "'denominador'", 
                                                            "'bytes'", "'(refer\\u00EAncia)'", 
                                                            "'sob'", "'e'", 
                                                            "'ou'", "'nem'", 
                                                            "'usando'", 
                                                            "'com'", "'por'", 
                                                            "'contendo'", 
                                                            "'desde'", "'entre'", 
                                                            "'sobre'", "'cima'", 
                                                            "'embaixo'", 
                                                            "'abaixo'", 
                                                            "'antes'", "'depois'", 
                                                            "'ap\\u00F3s'", 
                                                            "'cerca'", "'pr\\u00F3ximo'", 
                                                            "'at\\u00E9'", 
                                                            "'aproximadamente'", 
                                                            "'como'", "'determine se'", 
                                                            "'Fun\\u00E7\\u00E3o'", 
                                                            "'atribua'", 
                                                            "'para'", "'que se'", 
                                                            "'Rotina'", 
                                                            "'compativelmente'", 
                                                            "'Aponte'", 
                                                            "'para a rotina'", 
                                                            "'Empilhe'", 
                                                            "'mais'", "'menos'", 
                                                            "'vezes'", "'multiplicado por'", 
                                                            "'dividido por'", 
                                                            "'junto com'", 
                                                            "'seguido de'", 
                                                            "'acompanhado de'", 
                                                            "'tal como'", 
                                                            "'conte\\u00FAdo'", 
                                                            "'magnitude'", 
                                                            "'endere\\u00E7amento'", 
                                                            "''s'", null, 
                                                            null, null, 
                                                            null, "'''", 
                                                            "'\\\"'", "'-'", 
                                                            "'$'", null, 
                                                            "'\\u00A0'", 
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
                                                             "LETRA", "D\u0001GITO", 
                                                             "S\u0001MBOLO", 
                                                             "ESPA\u0004O", 
                                                             "AP\u0002STROFO", 
                                                             "ASPAS_DUPLAS", 
                                                             "H\u0001FEN", 
                                                             "CIFR\u0004O", 
                                                             "ESPA\u0004O_EM_BRANCO", 
                                                             "ESPA\u0004O_R\u0008GIDO", 
                                                             "QUEBRA_DE_LINHA", 
                                                             "BARRA_INCLINADA", 
                                                             "BARRA_INVERTIDA", 
                                                             "SINAL_DE_ADI\u000C\u000DO", 
                                                             "PONTO", "V\u0001RGULA", 
                                                             "PONTO_E_V\u0009RGULA", 
                                                             "DOIS_PONTOS", 
                                                             "ABRE_PAR\u0008NTESES", 
                                                             "FECHA_PAR\u0009NTESES", 
                                                             "ABRE_COLCHETES", 
                                                             "FECHA_COLCHETES", 
                                                             "CARACTERES_IMPRIM\u0011VEIS", 
                                                             "CARACTERES_DE_CONTROLE" ];
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    "regra_espaço", "palavra", "possessivo_inglês", "artigo", "artigo_definido", 
    "artigo_indefinido", "adjacentes", "abrangentes", "contrações", "atribuidores_de_posse", 
    "p1", "p2", "operadores_de_comparação", "palavras_reservadas", "denominações", 
    "verbos", "caracteres_ignoráveis", "comentário", "comentário_de_linha", 
    "comentário_de_bloco", "token", "aglomerado", "caractere_aglomerável", 
    "iniciador_de_aglomerado", "possessivo_novo", "qualificador", "caractere_não_aglomerável", 
    "sinal_de_pontuação", "símbolos_especiais", "ruído", "número_inteiro", 
    "número_decimal", "número_fracionário", "número_misto", "número_hexadecimal", 
    "string_literal", "programa", "tipos_primitivos", "tipo", "nome", "nome_do_tipo", 
    "informação_opcional", "campos", "bytes", "referência", "campo", "pausa", 
    "pausas", "conjunções", "preposições", "é", "estrutura", "igual_a", "variável_global", 
    "rotina", "procedimento", "determine_se", "decisor", "função2", "atribua", 
    "função", "para", "que_se", "rotina2", "compativelmente", "retroinvocação", 
    "nome_da_rotina", "unidade_semântica", "parâmetro", "frase", "instruções", 
    "instrução", "preserve", "preservação", "iteração", "se", "condicional", 
    "expressão_decisora", "incondicional", "interrupção", "invocação", "invocação_interna", 
    "invocação_externa", "aspas_duplas", "nome_da_DLL", "nome_da_função", 
    "processe", "com", "e", "retornando", "invocação_indireta", "retorno", 
    "decodifique", "decodificação", "aponte", "para_rotina", "indireção", 
    "push", "empilhamento", "reiteração", "diga", "retorno_booleano", "expressão", 
    "operadores_comuns", "booleano", "nulo", "termo_constante", "termo_constante_negativo", 
    "termo_constante_positivo", "número", "literal", "termo", "sinal_de_divisão", 
    "como", "termo_negativo", "termo_positivo", "variável_local", "variável", 
    "termo_literal", "conteúdo", "magnitude", "endereçamento", "possessivos_inglês", 
    "possessivo_inglês_antigo", "possessivo_português", "apóstrofo",
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
  public regra_espaço(): Regra_espaçoContext {
    let localctx: Regra_espaçoContext = new Regra_espaçoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, PortuguesPuroParser.RULE_regra_espaço);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 252;
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
      this.state = 255;
      this._errHandler.sync(this);
      _alt = 1;
      do {
        switch (_alt) {
        case 1:
          {
          {
          this.state = 254;
          this.match(PortuguesPuroParser.CARACTERES_IMPRIMÍVEIS);
          }
          }
          break;
        default:
          throw new NoViableAltException(this);
        }
        this.state = 257;
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
  public possessivo_inglês(): Possessivo_inglêsContext {
    let localctx: Possessivo_inglêsContext = new Possessivo_inglêsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, PortuguesPuroParser.RULE_possessivo_inglês);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 259;
      this.palavra();
      this.state = 260;
      this.match(PortuguesPuroParser.APÓSTROFO);
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
      this.state = 264;
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
        this.state = 262;
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
        this.state = 263;
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
      this.state = 271;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
      case 2:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 266;
        this.match(PortuguesPuroParser.T__1);
        }
        break;
      case 3:
        this.enterOuterAlt(localctx, 2);
        {
        this.state = 267;
        this.match(PortuguesPuroParser.T__2);
        }
        break;
      case 4:
        this.enterOuterAlt(localctx, 3);
        {
        this.state = 268;
        this.match(PortuguesPuroParser.T__3);
        }
        break;
      case 5:
        this.enterOuterAlt(localctx, 4);
        {
        this.state = 269;
        this.match(PortuguesPuroParser.T__4);
        }
        break;
      case 10:
      case 11:
      case 12:
      case 13:
        this.enterOuterAlt(localctx, 5);
        {
        this.state = 270;
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
      this.state = 278;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
      case 6:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 273;
        this.match(PortuguesPuroParser.T__5);
        }
        break;
      case 7:
        this.enterOuterAlt(localctx, 2);
        {
        this.state = 274;
        this.match(PortuguesPuroParser.T__6);
        }
        break;
      case 8:
        this.enterOuterAlt(localctx, 3);
        {
        this.state = 275;
        this.match(PortuguesPuroParser.T__7);
        }
        break;
      case 9:
        this.enterOuterAlt(localctx, 4);
        {
        this.state = 276;
        this.match(PortuguesPuroParser.T__8);
        }
        break;
      case 14:
      case 15:
      case 16:
      case 17:
        this.enterOuterAlt(localctx, 5);
        {
        this.state = 277;
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
      this.state = 280;
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
      this.state = 282;
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
  public contrações(): ContraçõesContext {
    let localctx: ContraçõesContext = new ContraçõesContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, PortuguesPuroParser.RULE_contrações);
    try {
      this.state = 303;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
      case 18:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 284;
        this.match(PortuguesPuroParser.T__17);
        }
        break;
      case 19:
        this.enterOuterAlt(localctx, 2);
        {
        this.state = 285;
        this.match(PortuguesPuroParser.T__18);
        }
        break;
      case 20:
        this.enterOuterAlt(localctx, 3);
        {
        this.state = 286;
        this.match(PortuguesPuroParser.T__19);
        }
        break;
      case 21:
        this.enterOuterAlt(localctx, 4);
        {
        this.state = 287;
        this.match(PortuguesPuroParser.T__20);
        }
        break;
      case 22:
        this.enterOuterAlt(localctx, 5);
        {
        this.state = 288;
        this.match(PortuguesPuroParser.T__21);
        }
        break;
      case 23:
        this.enterOuterAlt(localctx, 6);
        {
        this.state = 289;
        this.match(PortuguesPuroParser.T__22);
        }
        break;
      case 24:
        this.enterOuterAlt(localctx, 7);
        {
        this.state = 290;
        this.match(PortuguesPuroParser.T__23);
        }
        break;
      case 25:
        this.enterOuterAlt(localctx, 8);
        {
        this.state = 291;
        this.match(PortuguesPuroParser.T__24);
        }
        break;
      case 26:
        this.enterOuterAlt(localctx, 9);
        {
        this.state = 292;
        this.match(PortuguesPuroParser.T__25);
        }
        break;
      case 27:
        this.enterOuterAlt(localctx, 10);
        {
        this.state = 293;
        this.match(PortuguesPuroParser.T__26);
        }
        break;
      case 28:
        this.enterOuterAlt(localctx, 11);
        {
        this.state = 294;
        this.match(PortuguesPuroParser.T__27);
        }
        break;
      case 29:
        this.enterOuterAlt(localctx, 12);
        {
        this.state = 295;
        this.match(PortuguesPuroParser.T__28);
        }
        break;
      case 30:
        this.enterOuterAlt(localctx, 13);
        {
        this.state = 296;
        this.match(PortuguesPuroParser.T__29);
        }
        break;
      case 31:
        this.enterOuterAlt(localctx, 14);
        {
        this.state = 297;
        this.match(PortuguesPuroParser.T__30);
        }
        break;
      case 32:
        this.enterOuterAlt(localctx, 15);
        {
        this.state = 298;
        this.match(PortuguesPuroParser.T__31);
        }
        break;
      case 33:
        this.enterOuterAlt(localctx, 16);
        {
        this.state = 299;
        this.match(PortuguesPuroParser.T__32);
        }
        break;
      case 34:
      case 35:
      case 36:
      case 37:
        this.enterOuterAlt(localctx, 17);
        {
        this.state = 300;
        this.atribuidores_de_posse();
        }
        break;
      case 38:
      case 39:
      case 40:
      case 41:
        this.enterOuterAlt(localctx, 18);
        {
        this.state = 301;
        this.p1();
        }
        break;
      case 42:
      case 43:
      case 44:
      case 45:
        this.enterOuterAlt(localctx, 19);
        {
        this.state = 302;
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
      this.state = 305;
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
      this.state = 307;
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
      this.state = 309;
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
  public operadores_de_comparação(): Operadores_de_comparaçãoContext {
    let localctx: Operadores_de_comparaçãoContext = new Operadores_de_comparaçãoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, PortuguesPuroParser.RULE_operadores_de_comparação);
    try {
      this.state = 320;
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
        this.state = 312;
        this.match(PortuguesPuroParser.T__45);
        }
        break;
      case 47:
        this.enterOuterAlt(localctx, 3);
        {
        this.state = 313;
        this.match(PortuguesPuroParser.T__46);
        }
        break;
      case 48:
        this.enterOuterAlt(localctx, 4);
        {
        this.state = 314;
        this.match(PortuguesPuroParser.T__47);
        }
        break;
      case 49:
        this.enterOuterAlt(localctx, 5);
        {
        this.state = 315;
        this.match(PortuguesPuroParser.T__48);
        }
        break;
      case 50:
        this.enterOuterAlt(localctx, 6);
        {
        this.state = 316;
        this.match(PortuguesPuroParser.T__49);
        }
        break;
      case 51:
        this.enterOuterAlt(localctx, 7);
        {
        this.state = 317;
        this.match(PortuguesPuroParser.T__50);
        }
        break;
      case 52:
        this.enterOuterAlt(localctx, 8);
        {
        this.state = 318;
        this.match(PortuguesPuroParser.T__51);
        }
        break;
      case 53:
        this.enterOuterAlt(localctx, 9);
        {
        this.state = 319;
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
      this.state = 341;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
      case 54:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 322;
        this.match(PortuguesPuroParser.T__53);
        }
        break;
      case 55:
        this.enterOuterAlt(localctx, 2);
        {
        this.state = 323;
        this.match(PortuguesPuroParser.T__54);
        }
        break;
      case 56:
        this.enterOuterAlt(localctx, 3);
        {
        this.state = 324;
        this.match(PortuguesPuroParser.T__55);
        }
        break;
      case 57:
        this.enterOuterAlt(localctx, 4);
        {
        this.state = 325;
        this.match(PortuguesPuroParser.T__56);
        }
        break;
      case 58:
        this.enterOuterAlt(localctx, 5);
        {
        this.state = 326;
        this.match(PortuguesPuroParser.T__57);
        }
        break;
      case 59:
        this.enterOuterAlt(localctx, 6);
        {
        this.state = 327;
        this.match(PortuguesPuroParser.T__58);
        }
        break;
      case 60:
        this.enterOuterAlt(localctx, 7);
        {
        this.state = 328;
        this.match(PortuguesPuroParser.T__59);
        }
        break;
      case 61:
        this.enterOuterAlt(localctx, 8);
        {
        this.state = 329;
        this.match(PortuguesPuroParser.T__60);
        }
        break;
      case 62:
        this.enterOuterAlt(localctx, 9);
        {
        this.state = 330;
        this.match(PortuguesPuroParser.T__61);
        }
        break;
      case 63:
        this.enterOuterAlt(localctx, 10);
        {
        this.state = 331;
        this.match(PortuguesPuroParser.T__62);
        }
        break;
      case 64:
        this.enterOuterAlt(localctx, 11);
        {
        this.state = 332;
        this.match(PortuguesPuroParser.T__63);
        }
        break;
      case 65:
        this.enterOuterAlt(localctx, 12);
        {
        this.state = 333;
        this.match(PortuguesPuroParser.T__64);
        }
        break;
      case 66:
        this.enterOuterAlt(localctx, 13);
        {
        this.state = 334;
        this.match(PortuguesPuroParser.T__65);
        }
        break;
      case 67:
        this.enterOuterAlt(localctx, 14);
        {
        this.state = 335;
        this.match(PortuguesPuroParser.T__66);
        }
        break;
      case 68:
        this.enterOuterAlt(localctx, 15);
        {
        this.state = 336;
        this.match(PortuguesPuroParser.T__67);
        }
        break;
      case 69:
        this.enterOuterAlt(localctx, 16);
        {
        this.state = 337;
        this.match(PortuguesPuroParser.T__68);
        }
        break;
      case 70:
        this.enterOuterAlt(localctx, 17);
        {
        this.state = 338;
        this.match(PortuguesPuroParser.T__69);
        }
        break;
      case 71:
        this.enterOuterAlt(localctx, 18);
        {
        this.state = 339;
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
        this.state = 340;
        this.denominações();
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
  public denominações(): DenominaçõesContext {
    let localctx: DenominaçõesContext = new DenominaçõesContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, PortuguesPuroParser.RULE_denominações);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 343;
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
      this.state = 345;
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
  public caracteres_ignoráveis(): Caracteres_ignoráveisContext {
    let localctx: Caracteres_ignoráveisContext = new Caracteres_ignoráveisContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, PortuguesPuroParser.RULE_caracteres_ignoráveis);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 347;
      _la = this._input.LA(1);
      if(!(((((_la - 190)) & ~0x1F) === 0 && ((1 << (_la - 190)) & 32771) !== 0))) {
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
  public comentário(): ComentárioContext {
    let localctx: ComentárioContext = new ComentárioContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, PortuguesPuroParser.RULE_comentário);
    try {
      this.state = 351;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
      case 194:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 349;
        this.comentário_de_linha();
        }
        break;
      case 202:
        this.enterOuterAlt(localctx, 2);
        {
        this.state = 350;
        this.comentário_de_bloco();
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
  public comentário_de_linha(): Comentário_de_linhaContext {
    let localctx: Comentário_de_linhaContext = new Comentário_de_linhaContext(this, this._ctx, this.state);
    this.enterRule(localctx, 36, PortuguesPuroParser.RULE_comentário_de_linha);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 353;
      this.match(PortuguesPuroParser.BARRA_INVERTIDA);
      this.state = 357;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la===204) {
        {
        {
        this.state = 354;
        this.match(PortuguesPuroParser.CARACTERES_IMPRIMÍVEIS);
        }
        }
        this.state = 359;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 360;
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
  public comentário_de_bloco(): Comentário_de_blocoContext {
    let localctx: Comentário_de_blocoContext = new Comentário_de_blocoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 38, PortuguesPuroParser.RULE_comentário_de_bloco);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 362;
      this.match(PortuguesPuroParser.ABRE_COLCHETES);
      this.state = 366;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la===204) {
        {
        {
        this.state = 363;
        this.match(PortuguesPuroParser.CARACTERES_IMPRIMÍVEIS);
        }
        }
        this.state = 368;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 369;
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
      this.state = 375;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
      case 103:
      case 104:
      case 105:
      case 106:
      case 107:
      case 108:
      case 182:
      case 183:
      case 186:
      case 189:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 371;
        this.aglomerado();
        }
        break;
      case 204:
        this.enterOuterAlt(localctx, 2);
        {
        this.state = 372;
        this.possessivo_inglês();
        }
        break;
      case 200:
        this.enterOuterAlt(localctx, 3);
        {
        this.state = 373;
        this.qualificador();
        }
        break;
      case 187:
        this.enterOuterAlt(localctx, 4);
        {
        this.state = 374;
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
      this.state = 377;
      this.iniciador_de_aglomerado();
      {
      this.state = 378;
      this.caractere_aglomerável();
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
  public caractere_aglomerável(): Caractere_aglomerávelContext {
    let localctx: Caractere_aglomerávelContext = new Caractere_aglomerávelContext(this, this._ctx, this.state);
    this.enterRule(localctx, 44, PortuguesPuroParser.RULE_caractere_aglomerável);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 380;
      _la = this._input.LA(1);
      if(!(((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 63) !== 0) || ((((_la - 182)) & ~0x1F) === 0 && ((1 << (_la - 182)) & 10435) !== 0))) {
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
      this.state = 382;
      _la = this._input.LA(1);
      if(!(((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 63) !== 0) || ((((_la - 182)) & ~0x1F) === 0 && ((1 << (_la - 182)) & 147) !== 0))) {
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
      this.state = 384;
      this.apóstrofo();
      this.state = 385;
      this.caractere_não_aglomerável();
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
      this.state = 387;
      this.match(PortuguesPuroParser.ABRE_PARÊNTESES);
      this.state = 391;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la===204) {
        {
        {
        this.state = 388;
        this.match(PortuguesPuroParser.CARACTERES_IMPRIMÍVEIS);
        }
        }
        this.state = 393;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 394;
      this.match(PortuguesPuroParser.FECHA_PARÊNTESES);
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
  public caractere_não_aglomerável(): Caractere_não_aglomerávelContext {
    let localctx: Caractere_não_aglomerávelContext = new Caractere_não_aglomerávelContext(this, this._ctx, this.state);
    this.enterRule(localctx, 52, PortuguesPuroParser.RULE_caractere_não_aglomerável);
    let _la: number;
    try {
      this.state = 408;
      this._errHandler.sync(this);
      switch ( this._interp.adaptivePredict(this._input, 12, this._ctx) ) {
      case 1:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 396;
        _la = this._input.LA(1);
        if(_la<=0 || _la===182) {
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
        this.state = 397;
        _la = this._input.LA(1);
        if(_la<=0 || _la===183) {
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
        this.state = 398;
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
        this.state = 399;
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
        this.state = 400;
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
        this.state = 401;
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
        this.state = 402;
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
        this.state = 403;
        _la = this._input.LA(1);
        if(_la<=0 || _la===189) {
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
        this.state = 404;
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
        this.state = 405;
        _la = this._input.LA(1);
        if(_la<=0 || _la===188) {
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
        this.state = 406;
        _la = this._input.LA(1);
        if(_la<=0 || _la===195) {
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
        this.state = 407;
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
  public sinal_de_pontuação(): Sinal_de_pontuaçãoContext {
    let localctx: Sinal_de_pontuaçãoContext = new Sinal_de_pontuaçãoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 54, PortuguesPuroParser.RULE_sinal_de_pontuação);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 410;
      _la = this._input.LA(1);
      if(!(_la===109 || _la===110 || ((((_la - 196)) & ~0x1F) === 0 && ((1 << (_la - 196)) & 15) !== 0))) {
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
  public símbolos_especiais(): Símbolos_especiaisContext {
    let localctx: Símbolos_especiaisContext = new Símbolos_especiaisContext(this, this._ctx, this.state);
    this.enterRule(localctx, 56, PortuguesPuroParser.RULE_símbolos_especiais);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 412;
      _la = this._input.LA(1);
      if(!(((((_la - 111)) & ~0x1F) === 0 && ((1 << (_la - 111)) & 127) !== 0) || ((((_la - 188)) & ~0x1F) === 0 && ((1 << (_la - 188)) & 161) !== 0))) {
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
  public ruído(): RuídoContext {
    let localctx: RuídoContext = new RuídoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 58, PortuguesPuroParser.RULE_ruído);
    try {
      this.state = 417;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
      case 190:
      case 191:
      case 205:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 414;
        this.caracteres_ignoráveis();
        }
        break;
      case 194:
      case 202:
        this.enterOuterAlt(localctx, 2);
        {
        this.state = 415;
        this.comentário();
        }
        break;
      case 200:
        this.enterOuterAlt(localctx, 3);
        {
        this.state = 416;
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
  public número_inteiro(): Número_inteiroContext {
    let localctx: Número_inteiroContext = new Número_inteiroContext(this, this._ctx, this.state);
    this.enterRule(localctx, 60, PortuguesPuroParser.RULE_número_inteiro);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 420;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      do {
        {
        {
        this.state = 419;
        this.match(PortuguesPuroParser.DÍGITO);
        }
        }
        this.state = 422;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      } while (_la===183);
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
  public número_decimal(): Número_decimalContext {
    let localctx: Número_decimalContext = new Número_decimalContext(this, this._ctx, this.state);
    this.enterRule(localctx, 62, PortuguesPuroParser.RULE_número_decimal);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 425;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la===188) {
        {
        this.state = 424;
        this.match(PortuguesPuroParser.HÍFEN);
        }
      }

      this.state = 427;
      this.número_inteiro();
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
  public número_fracionário(): Número_fracionárioContext {
    let localctx: Número_fracionárioContext = new Número_fracionárioContext(this, this._ctx, this.state);
    this.enterRule(localctx, 64, PortuguesPuroParser.RULE_número_fracionário);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 429;
      this.número_decimal();
      this.state = 430;
      this.match(PortuguesPuroParser.BARRA_INCLINADA);
      this.state = 431;
      this.número_inteiro();
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
  public número_misto(): Número_mistoContext {
    let localctx: Número_mistoContext = new Número_mistoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 66, PortuguesPuroParser.RULE_número_misto);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 433;
      this.número_decimal();
      this.state = 434;
      this.match(PortuguesPuroParser.SINAL_DE_ADIÇÃO);
      this.state = 435;
      this.número_fracionário();
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
  public número_hexadecimal(): Número_hexadecimalContext {
    let localctx: Número_hexadecimalContext = new Número_hexadecimalContext(this, this._ctx, this.state);
    this.enterRule(localctx, 68, PortuguesPuroParser.RULE_número_hexadecimal);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 437;
      this.match(PortuguesPuroParser.CIFRÃO);
      this.state = 438;
      this.número_inteiro();
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
      this.state = 440;
      this.match(PortuguesPuroParser.ASPAS_DUPLAS);
      this.state = 444;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la===204) {
        {
        {
        this.state = 441;
        this.match(PortuguesPuroParser.CARACTERES_IMPRIMÍVEIS);
        }
        }
        this.state = 446;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 447;
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
      this.state = 452;
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
        this.state = 449;
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
        this.state = 450;
        this.variável_global();
        }
        break;
      case 160:
      case 162:
      case 164:
        this.enterOuterAlt(localctx, 3);
        {
        this.state = 451;
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
      this.state = 454;
      _la = this._input.LA(1);
      if(!(((((_la - 118)) & ~0x1F) === 0 && ((1 << (_la - 118)) & 131071) !== 0))) {
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
      this.state = 482;
      this._errHandler.sync(this);
      switch ( this._interp.adaptivePredict(this._input, 19, this._ctx) ) {
      case 1:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 456;
        this.artigo_indefinido();
        this.state = 457;
        this.nome();
        this.state = 458;
        this.é();
        this.state = 459;
        this.artigo_indefinido();
        this.state = 460;
        this.nome_do_tipo();
        this.state = 462;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la===142 || _la===162) {
          {
          this.state = 461;
          this.informação_opcional();
          }
        }

        this.state = 464;
        this.match(PortuguesPuroParser.PONTO);
        }
        break;
      case 2:
        this.enterOuterAlt(localctx, 2);
        {
        this.state = 466;
        this.artigo_indefinido();
        this.state = 467;
        this.nome();
        this.state = 468;
        this.é();
        this.state = 469;
        this.artigo_indefinido();
        this.state = 470;
        this.estrutura();
        this.state = 471;
        this.com();
        this.state = 472;
        this.campos();
        this.state = 473;
        this.match(PortuguesPuroParser.PONTO);
        }
        break;
      case 3:
        this.enterOuterAlt(localctx, 3);
        {
        this.state = 475;
        this.artigo_indefinido();
        this.state = 476;
        this.nome();
        this.state = 477;
        this.é();
        this.state = 478;
        this.número_inteiro();
        this.state = 479;
        this.nome_do_tipo();
        this.state = 480;
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
      this.state = 484;
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
      this.state = 486;
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
  public informação_opcional(): Informação_opcionalContext {
    let localctx: Informação_opcionalContext = new Informação_opcionalContext(this, this._ctx, this.state);
    this.enterRule(localctx, 82, PortuguesPuroParser.RULE_informação_opcional);
    try {
      this.state = 495;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
      case 162:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 488;
        this.para();
        this.state = 489;
        this.artigo_indefinido();
        this.state = 490;
        this.nome_do_tipo();
        }
        break;
      case 142:
        this.enterOuterAlt(localctx, 2);
        {
        this.state = 492;
        this.com();
        this.state = 493;
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
      this.state = 497;
      this.campo();
      this.state = 503;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la===138 || _la===139 || _la===197 || _la===198) {
        {
        {
        this.state = 498;
        this.pausas();
        this.state = 499;
        this.campo();
        }
        }
        this.state = 505;
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
  public bytes(): BytesContext {
    let localctx: BytesContext = new BytesContext(this, this._ctx, this.state);
    this.enterRule(localctx, 86, PortuguesPuroParser.RULE_bytes);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 506;
      this.match(PortuguesPuroParser.T__134);
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
  public referência(): ReferênciaContext {
    let localctx: ReferênciaContext = new ReferênciaContext(this, this._ctx, this.state);
    this.enterRule(localctx, 88, PortuguesPuroParser.RULE_referência);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 508;
      this.match(PortuguesPuroParser.T__135);
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
    this.enterRule(localctx, 90, PortuguesPuroParser.RULE_campo);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 514;
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
        this.state = 510;
        this.artigo_indefinido();
        }
        break;
      case 183:
        {
        this.state = 511;
        this.número_inteiro();
        this.state = 512;
        this.bytes();
        }
        break;
      default:
        throw new NoViableAltException(this);
      }
      this.state = 524;
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
        this.state = 516;
        this.denominações();
        this.state = 517;
        this.nome();
        }
        break;
      case 137:
        {
        this.state = 519;
        this.match(PortuguesPuroParser.T__136);
        this.state = 520;
        this.artigo_definido();
        this.state = 521;
        this.nome();
        }
        break;
      case 136:
        {
        this.state = 523;
        this.referência();
        }
        break;
      case 138:
      case 139:
      case 196:
      case 197:
      case 198:
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
    this.enterRule(localctx, 92, PortuguesPuroParser.RULE_pausa);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 526;
      _la = this._input.LA(1);
      if(!(_la===138 || _la===139 || _la===197 || _la===198)) {
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
    this.enterRule(localctx, 94, PortuguesPuroParser.RULE_pausas);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 529;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      do {
        {
        {
        this.state = 528;
        this.pausa();
        }
        }
        this.state = 531;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      } while (_la===138 || _la===139 || _la===197 || _la===198);
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
  public conjunções(): ConjunçõesContext {
    let localctx: ConjunçõesContext = new ConjunçõesContext(this, this._ctx, this.state);
    this.enterRule(localctx, 96, PortuguesPuroParser.RULE_conjunções);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 533;
      _la = this._input.LA(1);
      if(!(((((_la - 138)) & ~0x1F) === 0 && ((1 << (_la - 138)) & 7) !== 0))) {
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
  public preposições(): PreposiçõesContext {
    let localctx: PreposiçõesContext = new PreposiçõesContext(this, this._ctx, this.state);
    this.enterRule(localctx, 98, PortuguesPuroParser.RULE_preposições);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 535;
      _la = this._input.LA(1);
      if(!(_la===26 || _la===27 || ((((_la - 137)) & ~0x1F) === 0 && ((1 << (_la - 137)) & 4194289) !== 0))) {
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
  public é(): ÉContext {
    let localctx: ÉContext = new ÉContext(this, this._ctx, this.state);
    this.enterRule(localctx, 100, PortuguesPuroParser.RULE_é);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 537;
      _la = this._input.LA(1);
      if(!(_la===80 || _la===85)) {
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
  public estrutura(): EstruturaContext {
    let localctx: EstruturaContext = new EstruturaContext(this, this._ctx, this.state);
    this.enterRule(localctx, 102, PortuguesPuroParser.RULE_estrutura);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 539;
      this.match(PortuguesPuroParser.T__123);
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
  public igual_a(): Igual_aContext {
    let localctx: Igual_aContext = new Igual_aContext(this, this._ctx, this.state);
    this.enterRule(localctx, 104, PortuguesPuroParser.RULE_igual_a);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 541;
      this.match(PortuguesPuroParser.T__45);
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
  public variável_global(): Variável_globalContext {
    let localctx: Variável_globalContext = new Variável_globalContext(this, this._ctx, this.state);
    this.enterRule(localctx, 106, PortuguesPuroParser.RULE_variável_global);
    let _la: number;
    try {
      this.state = 577;
      this._errHandler.sync(this);
      switch ( this._interp.adaptivePredict(this._input, 26, this._ctx) ) {
      case 1:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 543;
        this.artigo_definido();
        this.state = 544;
        this.nome();
        this.state = 545;
        this.é();
        this.state = 546;
        this.artigo_indefinido();
        this.state = 547;
        this.nome_do_tipo();
        this.state = 549;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la===142 || _la===162) {
          {
          this.state = 548;
          this.informação_opcional();
          }
        }

        this.state = 551;
        this.match(PortuguesPuroParser.PONTO);
        }
        break;
      case 2:
        this.enterOuterAlt(localctx, 2);
        {
        this.state = 553;
        this.artigo_definido();
        this.state = 554;
        this.nome();
        this.state = 555;
        this.é();
        this.state = 556;
        this.artigo_indefinido();
        this.state = 557;
        this.estrutura();
        this.state = 558;
        this.com();
        this.state = 559;
        this.campos();
        this.state = 560;
        this.match(PortuguesPuroParser.PONTO);
        }
        break;
      case 3:
        this.enterOuterAlt(localctx, 3);
        {
        this.state = 562;
        this.artigo_definido();
        this.state = 563;
        this.nome();
        this.state = 564;
        this.é();
        this.state = 565;
        this.artigo_indefinido();
        this.state = 566;
        this.nome_do_tipo();
        this.state = 567;
        this.igual_a();
        this.state = 568;
        this.termo_constante();
        this.state = 569;
        this.match(PortuguesPuroParser.PONTO);
        this.state = 570;
        this.artigo_definido();
        this.state = 571;
        this.nome();
        this.state = 572;
        this.é();
        this.state = 573;
        this.termo_constante();
        this.state = 574;
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
    this.enterRule(localctx, 108, PortuguesPuroParser.RULE_rotina);
    try {
      this.state = 583;
      this._errHandler.sync(this);
      switch ( this._interp.adaptivePredict(this._input, 27, this._ctx) ) {
      case 1:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 579;
        this.procedimento();
        }
        break;
      case 2:
        this.enterOuterAlt(localctx, 2);
        {
        this.state = 580;
        this.decisor();
        }
        break;
      case 3:
        this.enterOuterAlt(localctx, 3);
        {
        this.state = 581;
        this.função();
        }
        break;
      case 4:
        this.enterOuterAlt(localctx, 4);
        {
        this.state = 582;
        this.retroinvocação();
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
    this.enterRule(localctx, 110, PortuguesPuroParser.RULE_procedimento);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 601;
      this._errHandler.sync(this);
      switch ( this._interp.adaptivePredict(this._input, 30, this._ctx) ) {
      case 1:
        {
        this.state = 586;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la===164) {
          {
          this.state = 585;
          this.rotina2();
          }
        }

        this.state = 588;
        this.para();
        this.state = 589;
        this.que_se();
        this.state = 590;
        this.nome_da_rotina();
        this.state = 591;
        this.match(PortuguesPuroParser.PONTO_E_VÍRGULA);
        }
        break;
      case 2:
        {
        this.state = 594;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la===164) {
          {
          this.state = 593;
          this.rotina2();
          }
        }

        this.state = 596;
        this.para();
        this.state = 597;
        this.que_se();
        this.state = 598;
        this.nome_da_rotina();
        this.state = 599;
        this.match(PortuguesPuroParser.DOIS_PONTOS);
        }
        break;
      }
      this.state = 603;
      this.instruções();
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
  public determine_se(): Determine_seContext {
    let localctx: Determine_seContext = new Determine_seContext(this, this._ctx, this.state);
    this.enterRule(localctx, 112, PortuguesPuroParser.RULE_determine_se);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 605;
      this.match(PortuguesPuroParser.T__158);
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
    this.enterRule(localctx, 114, PortuguesPuroParser.RULE_decisor);
    let _la: number;
    try {
      this.state = 625;
      this._errHandler.sync(this);
      switch ( this._interp.adaptivePredict(this._input, 33, this._ctx) ) {
      case 1:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 608;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la===160) {
          {
          this.state = 607;
          this.função2();
          }
        }

        this.state = 610;
        this.para();
        this.state = 611;
        this.que_se();
        this.state = 612;
        this.determine_se();
        this.state = 613;
        this.nome_da_rotina();
        this.state = 614;
        this.match(PortuguesPuroParser.PONTO_E_VÍRGULA);
        }
        break;
      case 2:
        this.enterOuterAlt(localctx, 2);
        {
        this.state = 617;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la===160) {
          {
          this.state = 616;
          this.função2();
          }
        }

        this.state = 619;
        this.para();
        this.state = 620;
        this.que_se();
        this.state = 621;
        this.determine_se();
        this.state = 622;
        this.nome_da_rotina();
        this.state = 623;
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
  public função2(): Função2Context {
    let localctx: Função2Context = new Função2Context(this, this._ctx, this.state);
    this.enterRule(localctx, 116, PortuguesPuroParser.RULE_função2);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 627;
      this.match(PortuguesPuroParser.T__159);
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
  public atribua(): AtribuaContext {
    let localctx: AtribuaContext = new AtribuaContext(this, this._ctx, this.state);
    this.enterRule(localctx, 118, PortuguesPuroParser.RULE_atribua);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 629;
      this.match(PortuguesPuroParser.T__160);
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
  public função(): FunçãoContext {
    let localctx: FunçãoContext = new FunçãoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 120, PortuguesPuroParser.RULE_função);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 661;
      this._errHandler.sync(this);
      switch ( this._interp.adaptivePredict(this._input, 36, this._ctx) ) {
      case 1:
        {
        this.state = 632;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la===160) {
          {
          this.state = 631;
          this.função2();
          }
        }

        this.state = 634;
        this.para();
        this.state = 635;
        this.que_se();
        this.state = 636;
        this.atribua();
        this.state = 637;
        this.artigo_definido();
        this.state = 638;
        this.nome_do_tipo();
        this.state = 639;
        this.atribuidores_de_posse();
        this.state = 640;
        this.nome();
        this.state = 641;
        this.para();
        this.state = 642;
        this.artigo_indefinido();
        this.state = 643;
        this.nome_do_tipo();
        this.state = 644;
        this.match(PortuguesPuroParser.PONTO_E_VÍRGULA);
        }
        break;
      case 2:
        {
        this.state = 647;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la===160) {
          {
          this.state = 646;
          this.função2();
          }
        }

        this.state = 649;
        this.para();
        this.state = 650;
        this.que_se();
        this.state = 651;
        this.atribua();
        this.state = 652;
        this.artigo_definido();
        this.state = 653;
        this.nome_do_tipo();
        this.state = 654;
        this.atribuidores_de_posse();
        this.state = 655;
        this.nome();
        this.state = 656;
        this.para();
        this.state = 657;
        this.artigo_indefinido();
        this.state = 658;
        this.nome_do_tipo();
        this.state = 659;
        this.match(PortuguesPuroParser.DOIS_PONTOS);
        }
        break;
      }
      this.state = 663;
      this.instruções();
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
  public para(): ParaContext {
    let localctx: ParaContext = new ParaContext(this, this._ctx, this.state);
    this.enterRule(localctx, 122, PortuguesPuroParser.RULE_para);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 665;
      this.match(PortuguesPuroParser.T__161);
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
  public que_se(): Que_seContext {
    let localctx: Que_seContext = new Que_seContext(this, this._ctx, this.state);
    this.enterRule(localctx, 124, PortuguesPuroParser.RULE_que_se);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 667;
      this.match(PortuguesPuroParser.T__162);
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
  public rotina2(): Rotina2Context {
    let localctx: Rotina2Context = new Rotina2Context(this, this._ctx, this.state);
    this.enterRule(localctx, 126, PortuguesPuroParser.RULE_rotina2);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 669;
      this.match(PortuguesPuroParser.T__163);
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
  public compativelmente(): CompativelmenteContext {
    let localctx: CompativelmenteContext = new CompativelmenteContext(this, this._ctx, this.state);
    this.enterRule(localctx, 128, PortuguesPuroParser.RULE_compativelmente);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 671;
      this.match(PortuguesPuroParser.T__164);
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
  public retroinvocação(): RetroinvocaçãoContext {
    let localctx: RetroinvocaçãoContext = new RetroinvocaçãoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 130, PortuguesPuroParser.RULE_retroinvocação);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 691;
      this._errHandler.sync(this);
      switch ( this._interp.adaptivePredict(this._input, 39, this._ctx) ) {
      case 1:
        {
        this.state = 674;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la===164) {
          {
          this.state = 673;
          this.rotina2();
          }
        }

        this.state = 676;
        this.para();
        this.state = 677;
        this.que_se();
        this.state = 678;
        this.compativelmente();
        this.state = 679;
        this.nome_da_rotina();
        this.state = 680;
        this.match(PortuguesPuroParser.PONTO_E_VÍRGULA);
        }
        break;
      case 2:
        {
        this.state = 683;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la===164) {
          {
          this.state = 682;
          this.rotina2();
          }
        }

        this.state = 685;
        this.para();
        this.state = 686;
        this.que_se();
        this.state = 687;
        this.compativelmente();
        this.state = 688;
        this.nome_da_rotina();
        this.state = 689;
        this.match(PortuguesPuroParser.DOIS_PONTOS);
        }
        break;
      }
      this.state = 693;
      this.instruções();
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
    this.enterRule(localctx, 132, PortuguesPuroParser.RULE_nome_da_rotina);
    let _la: number;
    try {
      this.state = 701;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
      case 204:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 695;
        this.unidade_semântica();
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
        this.state = 696;
        this.parâmetro();
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
        this.state = 697;
        this.frase();
        this.state = 699;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la===200) {
          {
          this.state = 698;
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
  public unidade_semântica(): Unidade_semânticaContext {
    let localctx: Unidade_semânticaContext = new Unidade_semânticaContext(this, this._ctx, this.state);
    this.enterRule(localctx, 134, PortuguesPuroParser.RULE_unidade_semântica);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 703;
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
  public parâmetro(): ParâmetroContext {
    let localctx: ParâmetroContext = new ParâmetroContext(this, this._ctx, this.state);
    this.enterRule(localctx, 136, PortuguesPuroParser.RULE_parâmetro);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 705;
      this.artigo_indefinido();
      this.state = 706;
      this.nome();
      this.state = 710;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (((((_la - 72)) & ~0x1F) === 0 && ((1 << (_la - 72)) & 255) !== 0)) {
        {
        this.state = 707;
        this.denominações();
        this.state = 708;
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
    this.enterRule(localctx, 138, PortuguesPuroParser.RULE_frase);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 712;
      this.artigo_definido();
      this.state = 713;
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
  public instruções(): InstruçõesContext {
    let localctx: InstruçõesContext = new InstruçõesContext(this, this._ctx, this.state);
    this.enterRule(localctx, 140, PortuguesPuroParser.RULE_instruções);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 716;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      do {
        {
        {
        this.state = 715;
        this.instrução();
        }
        }
        this.state = 718;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 262140) !== 0) || ((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & 241151) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 551682053) !== 0) || _la===204);
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
  public instrução(): InstruçãoContext {
    let localctx: InstruçãoContext = new InstruçãoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 142, PortuguesPuroParser.RULE_instrução);
    try {
      this.state = 726;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
      case 59:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 720;
        this.preservação();
        }
        break;
      case 55:
        this.enterOuterAlt(localctx, 2);
        {
        this.state = 721;
        this.iteração();
        }
        break;
      case 54:
        this.enterOuterAlt(localctx, 3);
        {
        this.state = 722;
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
      case 60:
      case 61:
      case 62:
      case 64:
      case 65:
      case 67:
      case 69:
      case 70:
      case 71:
      case 166:
      case 168:
      case 183:
      case 187:
      case 188:
      case 189:
      case 195:
      case 204:
        this.enterOuterAlt(localctx, 4);
        {
        this.state = 723;
        this.incondicional();
        this.state = 724;
        this.match(PortuguesPuroParser.VÍRGULA);
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
  public preserve(): PreserveContext {
    let localctx: PreserveContext = new PreserveContext(this, this._ctx, this.state);
    this.enterRule(localctx, 144, PortuguesPuroParser.RULE_preserve);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 728;
      this.match(PortuguesPuroParser.T__58);
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
  public preservação(): PreservaçãoContext {
    let localctx: PreservaçãoContext = new PreservaçãoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 146, PortuguesPuroParser.RULE_preservação);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 730;
      this.preserve();
      this.state = 731;
      this.parâmetro();
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
  public iteração(): IteraçãoContext {
    let localctx: IteraçãoContext = new IteraçãoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 148, PortuguesPuroParser.RULE_iteração);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 733;
      this.match(PortuguesPuroParser.T__54);
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
  public se(): SeContext {
    let localctx: SeContext = new SeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 150, PortuguesPuroParser.RULE_se);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 735;
      this.match(PortuguesPuroParser.T__53);
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
    this.enterRule(localctx, 152, PortuguesPuroParser.RULE_condicional);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 737;
      this.se();
      this.state = 738;
      this.expressão_decisora();
      this.state = 739;
      this.match(PortuguesPuroParser.VÍRGULA);
      this.state = 740;
      this.incondicional();
      this.state = 745;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la===198) {
        {
        {
        this.state = 741;
        this.match(PortuguesPuroParser.PONTO_E_VÍRGULA);
        this.state = 742;
        this.incondicional();
        }
        }
        this.state = 747;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 748;
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
  public expressão_decisora(): Expressão_decisoraContext {
    let localctx: Expressão_decisoraContext = new Expressão_decisoraContext(this, this._ctx, this.state);
    this.enterRule(localctx, 154, PortuguesPuroParser.RULE_expressão_decisora);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 751;
      this._errHandler.sync(this);
      _alt = 1;
      do {
        switch (_alt) {
        case 1:
          {
          {
          this.state = 750;
          this.palavra();
          }
          }
          break;
        default:
          throw new NoViableAltException(this);
        }
        this.state = 753;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 46, this._ctx);
      } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
      this.state = 756;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (((((_la - 80)) & ~0x1F) === 0 && ((1 << (_la - 80)) & 8388607) !== 0)) {
        {
        this.state = 755;
        this.verbos();
        }
      }

      this.state = 759;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la===204) {
        {
        this.state = 758;
        this.expressão_decisora();
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
    this.enterRule(localctx, 156, PortuguesPuroParser.RULE_incondicional);
    try {
      this.state = 769;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
      case 57:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 761;
        this.interrupção();
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
      case 70:
      case 71:
      case 183:
      case 187:
      case 188:
      case 189:
      case 195:
      case 204:
        this.enterOuterAlt(localctx, 2);
        {
        this.state = 762;
        this.invocação();
        }
        break;
      case 58:
        this.enterOuterAlt(localctx, 3);
        {
        this.state = 763;
        this.retorno();
        }
        break;
      case 64:
        this.enterOuterAlt(localctx, 4);
        {
        this.state = 764;
        this.decodificação();
        }
        break;
      case 56:
        this.enterOuterAlt(localctx, 5);
        {
        this.state = 765;
        this.reiteração();
        }
        break;
      case 166:
        this.enterOuterAlt(localctx, 6);
        {
        this.state = 766;
        this.indireção();
        }
        break;
      case 67:
      case 168:
        this.enterOuterAlt(localctx, 7);
        {
        this.state = 767;
        this.empilhamento();
        }
        break;
      case 60:
        this.enterOuterAlt(localctx, 8);
        {
        this.state = 768;
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
  public interrupção(): InterrupçãoContext {
    let localctx: InterrupçãoContext = new InterrupçãoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 158, PortuguesPuroParser.RULE_interrupção);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 771;
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
  public invocação(): InvocaçãoContext {
    let localctx: InvocaçãoContext = new InvocaçãoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 160, PortuguesPuroParser.RULE_invocação);
    try {
      this.state = 776;
      this._errHandler.sync(this);
      switch ( this._interp.adaptivePredict(this._input, 50, this._ctx) ) {
      case 1:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 773;
        this.invocação_interna();
        }
        break;
      case 2:
        this.enterOuterAlt(localctx, 2);
        {
        this.state = 774;
        this.invocação_externa();
        }
        break;
      case 3:
        this.enterOuterAlt(localctx, 3);
        {
        this.state = 775;
        this.invocação_indireta();
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
  public invocação_interna(): Invocação_internaContext {
    let localctx: Invocação_internaContext = new Invocação_internaContext(this, this._ctx, this.state);
    this.enterRule(localctx, 162, PortuguesPuroParser.RULE_invocação_interna);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 781;
      this._errHandler.sync(this);
      switch ( this._interp.adaptivePredict(this._input, 51, this._ctx) ) {
      case 1:
        {
        this.state = 778;
        this.unidade_semântica();
        }
        break;
      case 2:
        {
        this.state = 779;
        this.expressão();
        }
        break;
      case 3:
        {
        this.state = 780;
        this.frase();
        }
        break;
      }
      this.state = 784;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la===200) {
        {
        this.state = 783;
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
  public invocação_externa(): Invocação_externaContext {
    let localctx: Invocação_externaContext = new Invocação_externaContext(this, this._ctx, this.state);
    this.enterRule(localctx, 164, PortuguesPuroParser.RULE_invocação_externa);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 786;
      this.processe();
      this.state = 787;
      this.aspas_duplas();
      this.state = 788;
      this.nome_da_DLL();
      this.state = 789;
      this.aspas_duplas();
      this.state = 790;
      this.aspas_duplas();
      this.state = 791;
      this.nome_da_função();
      this.state = 792;
      this.aspas_duplas();
      this.state = 796;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la===142) {
        {
        this.state = 793;
        this.com();
        this.state = 794;
        this.expressão();
        }
      }

      this.state = 803;
      this._errHandler.sync(this);
      _alt = this._interp.adaptivePredict(this._input, 54, this._ctx);
      while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
        if (_alt === 1 + 1) {
          {
          {
          this.state = 798;
          this.e();
          this.state = 799;
          this.expressão();
          }
          }
        }
        this.state = 805;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 54, this._ctx);
      }
      this.state = 809;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la===66) {
        {
        this.state = 806;
        this.retornando();
        this.state = 807;
        this.termo();
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
  public aspas_duplas(): Aspas_duplasContext {
    let localctx: Aspas_duplasContext = new Aspas_duplasContext(this, this._ctx, this.state);
    this.enterRule(localctx, 166, PortuguesPuroParser.RULE_aspas_duplas);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 811;
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
  public nome_da_DLL(): Nome_da_DLLContext {
    let localctx: Nome_da_DLLContext = new Nome_da_DLLContext(this, this._ctx, this.state);
    this.enterRule(localctx, 168, PortuguesPuroParser.RULE_nome_da_DLL);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 813;
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
  public nome_da_função(): Nome_da_funçãoContext {
    let localctx: Nome_da_funçãoContext = new Nome_da_funçãoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 170, PortuguesPuroParser.RULE_nome_da_função);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 815;
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
  public processe(): ProcesseContext {
    let localctx: ProcesseContext = new ProcesseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 172, PortuguesPuroParser.RULE_processe);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 817;
      this.match(PortuguesPuroParser.T__64);
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
  public com(): ComContext {
    let localctx: ComContext = new ComContext(this, this._ctx, this.state);
    this.enterRule(localctx, 174, PortuguesPuroParser.RULE_com);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 819;
      this.match(PortuguesPuroParser.T__141);
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
  public e(): EContext {
    let localctx: EContext = new EContext(this, this._ctx, this.state);
    this.enterRule(localctx, 176, PortuguesPuroParser.RULE_e);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 821;
      this.match(PortuguesPuroParser.T__137);
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
  public retornando(): RetornandoContext {
    let localctx: RetornandoContext = new RetornandoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 178, PortuguesPuroParser.RULE_retornando);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 823;
      this.match(PortuguesPuroParser.T__65);
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
  public invocação_indireta(): Invocação_indiretaContext {
    let localctx: Invocação_indiretaContext = new Invocação_indiretaContext(this, this._ctx, this.state);
    this.enterRule(localctx, 180, PortuguesPuroParser.RULE_invocação_indireta);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 825;
      this.processe();
      this.state = 826;
      this.expressão();
      this.state = 842;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la===142) {
        {
        this.state = 827;
        this.com();
        this.state = 828;
        this.expressão();
        this.state = 834;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la===138) {
          {
          {
          this.state = 829;
          this.e();
          this.state = 830;
          this.expressão();
          }
          }
          this.state = 836;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 840;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la===66) {
          {
          this.state = 837;
          this.retornando();
          this.state = 838;
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
    this.enterRule(localctx, 182, PortuguesPuroParser.RULE_retorno);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 844;
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
  public decodifique(): DecodifiqueContext {
    let localctx: DecodifiqueContext = new DecodifiqueContext(this, this._ctx, this.state);
    this.enterRule(localctx, 184, PortuguesPuroParser.RULE_decodifique);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 846;
      this.match(PortuguesPuroParser.T__63);
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
  public decodificação(): DecodificaçãoContext {
    let localctx: DecodificaçãoContext = new DecodificaçãoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 186, PortuguesPuroParser.RULE_decodificação);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 848;
      this.decodifique();
      this.state = 849;
      this.número_hexadecimal();
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
  public aponte(): AponteContext {
    let localctx: AponteContext = new AponteContext(this, this._ctx, this.state);
    this.enterRule(localctx, 188, PortuguesPuroParser.RULE_aponte);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 851;
      this.match(PortuguesPuroParser.T__165);
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
  public para_rotina(): Para_rotinaContext {
    let localctx: Para_rotinaContext = new Para_rotinaContext(this, this._ctx, this.state);
    this.enterRule(localctx, 190, PortuguesPuroParser.RULE_para_rotina);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 853;
      this.match(PortuguesPuroParser.T__166);
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
  public indireção(): IndireçãoContext {
    let localctx: IndireçãoContext = new IndireçãoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 192, PortuguesPuroParser.RULE_indireção);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 855;
      this.aponte();
      this.state = 856;
      this.artigo();
      this.state = 857;
      this.termo();
      this.state = 858;
      this.para_rotina();
      this.state = 862;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
      case 204:
        {
        this.state = 859;
        this.unidade_semântica();
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
        this.state = 860;
        this.parâmetro();
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
        this.state = 861;
        this.frase();
        }
        break;
      default:
        throw new NoViableAltException(this);
      }
      this.state = 865;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la===200) {
        {
        this.state = 864;
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
  public push(): PushContext {
    let localctx: PushContext = new PushContext(this, this._ctx, this.state);
    this.enterRule(localctx, 194, PortuguesPuroParser.RULE_push);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 867;
      _la = this._input.LA(1);
      if(!(_la===67 || _la===168)) {
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
  public empilhamento(): EmpilhamentoContext {
    let localctx: EmpilhamentoContext = new EmpilhamentoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 196, PortuguesPuroParser.RULE_empilhamento);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 869;
      this.push();
      this.state = 870;
      this.expressão();
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
  public reiteração(): ReiteraçãoContext {
    let localctx: ReiteraçãoContext = new ReiteraçãoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 198, PortuguesPuroParser.RULE_reiteração);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 872;
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
  public diga(): DigaContext {
    let localctx: DigaContext = new DigaContext(this, this._ctx, this.state);
    this.enterRule(localctx, 200, PortuguesPuroParser.RULE_diga);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 874;
      this.match(PortuguesPuroParser.T__59);
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
    this.enterRule(localctx, 202, PortuguesPuroParser.RULE_retorno_booleano);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 876;
      this.diga();
      this.state = 877;
      this.booleano();
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
  public expressão(): ExpressãoContext {
    let localctx: ExpressãoContext = new ExpressãoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 204, PortuguesPuroParser.RULE_expressão);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 879;
      this.termo();
      this.state = 885;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (((((_la - 169)) & ~0x1F) === 0 && ((1 << (_la - 169)) & 255) !== 0)) {
        {
        {
        this.state = 880;
        this.operadores_comuns();
        this.state = 881;
        this.termo();
        }
        }
        this.state = 887;
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
    this.enterRule(localctx, 206, PortuguesPuroParser.RULE_operadores_comuns);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 888;
      _la = this._input.LA(1);
      if(!(((((_la - 169)) & ~0x1F) === 0 && ((1 << (_la - 169)) & 255) !== 0))) {
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
  public booleano(): BooleanoContext {
    let localctx: BooleanoContext = new BooleanoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 208, PortuguesPuroParser.RULE_booleano);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 890;
      _la = this._input.LA(1);
      if(!(_la===61 || _la===62)) {
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
  public nulo(): NuloContext {
    let localctx: NuloContext = new NuloContext(this, this._ctx, this.state);
    this.enterRule(localctx, 210, PortuguesPuroParser.RULE_nulo);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 892;
      _la = this._input.LA(1);
      if(!(((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 7) !== 0))) {
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
    this.enterRule(localctx, 212, PortuguesPuroParser.RULE_termo_constante);
    try {
      this.state = 897;
      this._errHandler.sync(this);
      switch ( this._interp.adaptivePredict(this._input, 62, this._ctx) ) {
      case 1:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 894;
        this.termo_constante_negativo();
        }
        break;
      case 2:
        this.enterOuterAlt(localctx, 2);
        {
        this.state = 895;
        this.termo_constante_positivo();
        }
        break;
      case 3:
        this.enterOuterAlt(localctx, 3);
        {
        this.state = 896;
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
    this.enterRule(localctx, 214, PortuguesPuroParser.RULE_termo_constante_negativo);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 899;
      this.match(PortuguesPuroParser.HÍFEN);
      this.state = 900;
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
    this.enterRule(localctx, 216, PortuguesPuroParser.RULE_termo_constante_positivo);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 902;
      this.match(PortuguesPuroParser.SINAL_DE_ADIÇÃO);
      this.state = 903;
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
  public número(): NúmeroContext {
    let localctx: NúmeroContext = new NúmeroContext(this, this._ctx, this.state);
    this.enterRule(localctx, 218, PortuguesPuroParser.RULE_número);
    try {
      this.state = 908;
      this._errHandler.sync(this);
      switch ( this._interp.adaptivePredict(this._input, 63, this._ctx) ) {
      case 1:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 905;
        this.número_decimal();
        }
        break;
      case 2:
        this.enterOuterAlt(localctx, 2);
        {
        this.state = 906;
        this.número_fracionário();
        }
        break;
      case 3:
        this.enterOuterAlt(localctx, 3);
        {
        this.state = 907;
        this.número_misto();
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
    this.enterRule(localctx, 220, PortuguesPuroParser.RULE_literal);
    let _la: number;
    try {
      this.state = 918;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
      case 183:
      case 188:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 910;
        this.número();
        this.state = 912;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la===204) {
          {
          this.state = 911;
          this.nome_do_tipo();
          }
        }

        }
        break;
      case 187:
        this.enterOuterAlt(localctx, 2);
        {
        this.state = 914;
        this.string_literal();
        }
        break;
      case 189:
        this.enterOuterAlt(localctx, 3);
        {
        this.state = 915;
        this.número_hexadecimal();
        }
        break;
      case 61:
      case 62:
        this.enterOuterAlt(localctx, 4);
        {
        this.state = 916;
        this.booleano();
        }
        break;
      case 69:
      case 70:
      case 71:
        this.enterOuterAlt(localctx, 5);
        {
        this.state = 917;
        this.nulo();
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
    this.enterRule(localctx, 222, PortuguesPuroParser.RULE_termo);
    let _la: number;
    try {
      this.state = 936;
      this._errHandler.sync(this);
      switch ( this._interp.adaptivePredict(this._input, 68, this._ctx) ) {
      case 1:
        this.enterOuterAlt(localctx, 1);
        {
        this.state = 920;
        this.termo_negativo();
        }
        break;
      case 2:
        this.enterOuterAlt(localctx, 2);
        {
        this.state = 921;
        this.termo_positivo();
        }
        break;
      case 3:
        this.enterOuterAlt(localctx, 3);
        {
        this.state = 922;
        this.variável_local();
        }
        break;
      case 4:
        this.enterOuterAlt(localctx, 4);
        {
        this.state = 923;
        this.variável();
        }
        break;
      case 5:
        this.enterOuterAlt(localctx, 5);
        {
        this.state = 924;
        this.termo_literal();
        this.state = 929;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la===177) {
          {
          this.state = 925;
          this.como();
          this.state = 926;
          this.artigo_indefinido();
          this.state = 927;
          this.nome_do_tipo();
          }
        }

        this.state = 934;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la===193) {
          {
          this.state = 931;
          this.sinal_de_divisão();
          this.state = 932;
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
  public sinal_de_divisão(): Sinal_de_divisãoContext {
    let localctx: Sinal_de_divisãoContext = new Sinal_de_divisãoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 224, PortuguesPuroParser.RULE_sinal_de_divisão);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 938;
      this.match(PortuguesPuroParser.BARRA_INCLINADA);
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
  public como(): ComoContext {
    let localctx: ComoContext = new ComoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 226, PortuguesPuroParser.RULE_como);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 940;
      this.match(PortuguesPuroParser.T__176);
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
    this.enterRule(localctx, 228, PortuguesPuroParser.RULE_termo_negativo);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 942;
      this.match(PortuguesPuroParser.HÍFEN);
      this.state = 943;
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
    this.enterRule(localctx, 230, PortuguesPuroParser.RULE_termo_positivo);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 945;
      this.match(PortuguesPuroParser.SINAL_DE_ADIÇÃO);
      this.state = 946;
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
  public variável_local(): Variável_localContext {
    let localctx: Variável_localContext = new Variável_localContext(this, this._ctx, this.state);
    this.enterRule(localctx, 232, PortuguesPuroParser.RULE_variável_local);
    let _la: number;
    try {
      this.state = 960;
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
        {
        this.state = 948;
        this.artigo_indefinido();
        this.state = 949;
        this.nome();
        this.state = 953;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (((((_la - 72)) & ~0x1F) === 0 && ((1 << (_la - 72)) & 255) !== 0)) {
          {
          this.state = 950;
          this.denominações();
          this.state = 951;
          this.nome();
          }
        }

        }
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
        this.enterOuterAlt(localctx, 2);
        {
        {
        this.state = 955;
        this.artigo_definido();
        this.state = 956;
        this.nome();
        this.state = 957;
        this.atribuidores_de_posse();
        this.state = 958;
        this.nome();
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
  public variável(): VariávelContext {
    let localctx: VariávelContext = new VariávelContext(this, this._ctx, this.state);
    this.enterRule(localctx, 234, PortuguesPuroParser.RULE_variável);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 962;
      this.artigo_definido();
      this.state = 963;
      this.possessivo_português();
      this.state = 964;
      this.p2();
      this.state = 965;
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
  public termo_literal(): Termo_literalContext {
    let localctx: Termo_literalContext = new Termo_literalContext(this, this._ctx, this.state);
    this.enterRule(localctx, 236, PortuguesPuroParser.RULE_termo_literal);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 967;
      this.literal();
      this.state = 968;
      this.possessivos_inglês();
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
  public conteúdo(): ConteúdoContext {
    let localctx: ConteúdoContext = new ConteúdoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 238, PortuguesPuroParser.RULE_conteúdo);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 970;
      this.match(PortuguesPuroParser.T__177);
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
  public magnitude(): MagnitudeContext {
    let localctx: MagnitudeContext = new MagnitudeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 240, PortuguesPuroParser.RULE_magnitude);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 972;
      this.match(PortuguesPuroParser.T__178);
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
  public endereçamento(): EndereçamentoContext {
    let localctx: EndereçamentoContext = new EndereçamentoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 242, PortuguesPuroParser.RULE_endereçamento);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 974;
      this.match(PortuguesPuroParser.T__179);
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
  public possessivos_inglês(): Possessivos_inglêsContext {
    let localctx: Possessivos_inglêsContext = new Possessivos_inglêsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 244, PortuguesPuroParser.RULE_possessivos_inglês);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 979;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la===181) {
        {
        {
        this.state = 976;
        this.possessivo_inglês_antigo();
        }
        }
        this.state = 981;
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
  public possessivo_inglês_antigo(): Possessivo_inglês_antigoContext {
    let localctx: Possessivo_inglês_antigoContext = new Possessivo_inglês_antigoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 246, PortuguesPuroParser.RULE_possessivo_inglês_antigo);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 982;
      this.apóstrofo();
      this.state = 988;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
      case 204:
        {
        this.state = 983;
        this.nome();
        }
        break;
      case 160:
      case 162:
        {
        this.state = 984;
        this.função();
        }
        break;
      case 178:
        {
        this.state = 985;
        this.conteúdo();
        }
        break;
      case 179:
        {
        this.state = 986;
        this.magnitude();
        }
        break;
      case 180:
        {
        this.state = 987;
        this.endereçamento();
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
  // @RuleVersion(0)
  public possessivo_português(): Possessivo_portuguêsContext {
    let localctx: Possessivo_portuguêsContext = new Possessivo_portuguêsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 248, PortuguesPuroParser.RULE_possessivo_português);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 995;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
      case 204:
        {
        this.state = 990;
        this.nome();
        }
        break;
      case 160:
      case 162:
        {
        this.state = 991;
        this.função();
        }
        break;
      case 178:
        {
        this.state = 992;
        this.conteúdo();
        }
        break;
      case 179:
        {
        this.state = 993;
        this.magnitude();
        }
        break;
      case 180:
        {
        this.state = 994;
        this.endereçamento();
        }
        break;
      default:
        throw new NoViableAltException(this);
      }
      this.state = 997;
      this.p2();
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
  public apóstrofo(): ApóstrofoContext {
    let localctx: ApóstrofoContext = new ApóstrofoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 250, PortuguesPuroParser.RULE_apóstrofo);
    try {
      this.enterOuterAlt(localctx, 1);
      {
      this.state = 999;
      this.match(PortuguesPuroParser.T__180);
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

  public static readonly _serializedATN: number[] = [4,1,205,1002,2,0,7,0,
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
  89,2,90,7,90,2,91,7,91,2,92,7,92,2,93,7,93,2,94,7,94,2,95,7,95,2,96,7,96,
  2,97,7,97,2,98,7,98,2,99,7,99,2,100,7,100,2,101,7,101,2,102,7,102,2,103,
  7,103,2,104,7,104,2,105,7,105,2,106,7,106,2,107,7,107,2,108,7,108,2,109,
  7,109,2,110,7,110,2,111,7,111,2,112,7,112,2,113,7,113,2,114,7,114,2,115,
  7,115,2,116,7,116,2,117,7,117,2,118,7,118,2,119,7,119,2,120,7,120,2,121,
  7,121,2,122,7,122,2,123,7,123,2,124,7,124,2,125,7,125,1,0,1,0,1,1,4,1,256,
  8,1,11,1,12,1,257,1,2,1,2,1,2,1,3,1,3,3,3,265,8,3,1,4,1,4,1,4,1,4,1,4,3,
  4,272,8,4,1,5,1,5,1,5,1,5,1,5,3,5,279,8,5,1,6,1,6,1,7,1,7,1,8,1,8,1,8,1,
  8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,3,8,304,8,
  8,1,9,1,9,1,10,1,10,1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,
  12,3,12,321,8,12,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,
  1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,3,13,342,8,13,1,14,1,14,1,15,1,
  15,1,16,1,16,1,17,1,17,3,17,352,8,17,1,18,1,18,5,18,356,8,18,10,18,12,18,
  359,9,18,1,18,1,18,1,19,1,19,5,19,365,8,19,10,19,12,19,368,9,19,1,19,1,
  19,1,20,1,20,1,20,1,20,3,20,376,8,20,1,21,1,21,1,21,1,22,1,22,1,23,1,23,
  1,24,1,24,1,24,1,25,1,25,5,25,390,8,25,10,25,12,25,393,9,25,1,25,1,25,1,
  26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,3,26,409,8,26,
  1,27,1,27,1,28,1,28,1,29,1,29,1,29,3,29,418,8,29,1,30,4,30,421,8,30,11,
  30,12,30,422,1,31,3,31,426,8,31,1,31,1,31,1,32,1,32,1,32,1,32,1,33,1,33,
  1,33,1,33,1,34,1,34,1,34,1,35,1,35,5,35,443,8,35,10,35,12,35,446,9,35,1,
  35,1,35,1,36,1,36,1,36,3,36,453,8,36,1,37,1,37,1,38,1,38,1,38,1,38,1,38,
  1,38,3,38,463,8,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,
  38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,3,38,483,8,38,1,39,1,39,1,40,1,40,
  1,41,1,41,1,41,1,41,1,41,1,41,1,41,3,41,496,8,41,1,42,1,42,1,42,1,42,5,
  42,502,8,42,10,42,12,42,505,9,42,1,43,1,43,1,44,1,44,1,45,1,45,1,45,1,45,
  3,45,515,8,45,1,45,1,45,1,45,1,45,1,45,1,45,1,45,1,45,3,45,525,8,45,1,46,
  1,46,1,47,4,47,530,8,47,11,47,12,47,531,1,48,1,48,1,49,1,49,1,50,1,50,1,
  51,1,51,1,52,1,52,1,53,1,53,1,53,1,53,1,53,1,53,3,53,550,8,53,1,53,1,53,
  1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,
  53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,3,53,578,8,53,1,54,1,54,
  1,54,1,54,3,54,584,8,54,1,55,3,55,587,8,55,1,55,1,55,1,55,1,55,1,55,1,55,
  3,55,595,8,55,1,55,1,55,1,55,1,55,1,55,3,55,602,8,55,1,55,1,55,1,56,1,56,
  1,57,3,57,609,8,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,3,57,618,8,57,1,57,
  1,57,1,57,1,57,1,57,1,57,3,57,626,8,57,1,58,1,58,1,59,1,59,1,60,3,60,633,
  8,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,3,
  60,648,8,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,
  3,60,662,8,60,1,60,1,60,1,61,1,61,1,62,1,62,1,63,1,63,1,64,1,64,1,65,3,
  65,675,8,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,3,65,684,8,65,1,65,1,65,
  1,65,1,65,1,65,1,65,3,65,692,8,65,1,65,1,65,1,66,1,66,1,66,1,66,3,66,700,
  8,66,3,66,702,8,66,1,67,1,67,1,68,1,68,1,68,1,68,1,68,3,68,711,8,68,1,69,
  1,69,1,69,1,70,4,70,717,8,70,11,70,12,70,718,1,71,1,71,1,71,1,71,1,71,1,
  71,3,71,727,8,71,1,72,1,72,1,73,1,73,1,73,1,74,1,74,1,75,1,75,1,76,1,76,
  1,76,1,76,1,76,1,76,5,76,744,8,76,10,76,12,76,747,9,76,1,76,1,76,1,77,4,
  77,752,8,77,11,77,12,77,753,1,77,3,77,757,8,77,1,77,3,77,760,8,77,1,78,
  1,78,1,78,1,78,1,78,1,78,1,78,1,78,3,78,770,8,78,1,79,1,79,1,80,1,80,1,
  80,3,80,777,8,80,1,81,1,81,1,81,3,81,782,8,81,1,81,3,81,785,8,81,1,82,1,
  82,1,82,1,82,1,82,1,82,1,82,1,82,1,82,1,82,3,82,797,8,82,1,82,1,82,1,82,
  5,82,802,8,82,10,82,12,82,805,9,82,1,82,1,82,1,82,3,82,810,8,82,1,83,1,
  83,1,84,1,84,1,85,1,85,1,86,1,86,1,87,1,87,1,88,1,88,1,89,1,89,1,90,1,90,
  1,90,1,90,1,90,1,90,1,90,5,90,833,8,90,10,90,12,90,836,9,90,1,90,1,90,1,
  90,3,90,841,8,90,3,90,843,8,90,1,91,1,91,1,92,1,92,1,93,1,93,1,93,1,94,
  1,94,1,95,1,95,1,96,1,96,1,96,1,96,1,96,1,96,1,96,3,96,863,8,96,1,96,3,
  96,866,8,96,1,97,1,97,1,98,1,98,1,98,1,99,1,99,1,100,1,100,1,101,1,101,
  1,101,1,102,1,102,1,102,1,102,5,102,884,8,102,10,102,12,102,887,9,102,1,
  103,1,103,1,104,1,104,1,105,1,105,1,106,1,106,1,106,3,106,898,8,106,1,107,
  1,107,1,107,1,108,1,108,1,108,1,109,1,109,1,109,3,109,909,8,109,1,110,1,
  110,3,110,913,8,110,1,110,1,110,1,110,1,110,3,110,919,8,110,1,111,1,111,
  1,111,1,111,1,111,1,111,1,111,1,111,1,111,3,111,930,8,111,1,111,1,111,1,
  111,3,111,935,8,111,3,111,937,8,111,1,112,1,112,1,113,1,113,1,114,1,114,
  1,114,1,115,1,115,1,115,1,116,1,116,1,116,1,116,1,116,3,116,954,8,116,1,
  116,1,116,1,116,1,116,1,116,3,116,961,8,116,1,117,1,117,1,117,1,117,1,117,
  1,118,1,118,1,118,1,119,1,119,1,120,1,120,1,121,1,121,1,122,5,122,978,8,
  122,10,122,12,122,981,9,122,1,123,1,123,1,123,1,123,1,123,1,123,3,123,989,
  8,123,1,124,1,124,1,124,1,124,1,124,3,124,996,8,124,1,124,1,124,1,125,1,
  125,1,125,1,803,0,126,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,
  36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,
  84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,
  124,126,128,130,132,134,136,138,140,142,144,146,148,150,152,154,156,158,
  160,162,164,166,168,170,172,174,176,178,180,182,184,186,188,190,192,194,
  196,198,200,202,204,206,208,210,212,214,216,218,220,222,224,226,228,230,
  232,234,236,238,240,242,244,246,248,250,0,33,1,0,10,13,1,0,14,17,1,0,34,
  37,1,0,38,41,1,0,42,45,1,0,72,79,1,0,80,102,2,0,190,191,205,205,5,0,103,
  108,182,183,188,189,193,193,195,195,4,0,103,108,182,183,186,186,189,189,
  1,0,182,182,1,0,183,183,1,0,103,103,1,0,104,104,1,0,105,105,1,0,106,106,
  1,0,107,107,1,0,189,189,1,0,108,108,1,0,188,188,1,0,195,195,1,0,193,193,
  2,0,109,110,196,199,4,0,111,117,188,188,193,193,195,195,1,0,118,134,2,0,
  138,139,197,198,1,0,138,140,3,0,26,27,137,137,141,158,2,0,80,80,85,85,2,
  0,67,67,168,168,1,0,169,176,1,0,61,62,1,0,69,71,1043,0,252,1,0,0,0,2,255,
  1,0,0,0,4,259,1,0,0,0,6,264,1,0,0,0,8,271,1,0,0,0,10,278,1,0,0,0,12,280,
  1,0,0,0,14,282,1,0,0,0,16,303,1,0,0,0,18,305,1,0,0,0,20,307,1,0,0,0,22,
  309,1,0,0,0,24,320,1,0,0,0,26,341,1,0,0,0,28,343,1,0,0,0,30,345,1,0,0,0,
  32,347,1,0,0,0,34,351,1,0,0,0,36,353,1,0,0,0,38,362,1,0,0,0,40,375,1,0,
  0,0,42,377,1,0,0,0,44,380,1,0,0,0,46,382,1,0,0,0,48,384,1,0,0,0,50,387,
  1,0,0,0,52,408,1,0,0,0,54,410,1,0,0,0,56,412,1,0,0,0,58,417,1,0,0,0,60,
  420,1,0,0,0,62,425,1,0,0,0,64,429,1,0,0,0,66,433,1,0,0,0,68,437,1,0,0,0,
  70,440,1,0,0,0,72,452,1,0,0,0,74,454,1,0,0,0,76,482,1,0,0,0,78,484,1,0,
  0,0,80,486,1,0,0,0,82,495,1,0,0,0,84,497,1,0,0,0,86,506,1,0,0,0,88,508,
  1,0,0,0,90,514,1,0,0,0,92,526,1,0,0,0,94,529,1,0,0,0,96,533,1,0,0,0,98,
  535,1,0,0,0,100,537,1,0,0,0,102,539,1,0,0,0,104,541,1,0,0,0,106,577,1,0,
  0,0,108,583,1,0,0,0,110,601,1,0,0,0,112,605,1,0,0,0,114,625,1,0,0,0,116,
  627,1,0,0,0,118,629,1,0,0,0,120,661,1,0,0,0,122,665,1,0,0,0,124,667,1,0,
  0,0,126,669,1,0,0,0,128,671,1,0,0,0,130,691,1,0,0,0,132,701,1,0,0,0,134,
  703,1,0,0,0,136,705,1,0,0,0,138,712,1,0,0,0,140,716,1,0,0,0,142,726,1,0,
  0,0,144,728,1,0,0,0,146,730,1,0,0,0,148,733,1,0,0,0,150,735,1,0,0,0,152,
  737,1,0,0,0,154,751,1,0,0,0,156,769,1,0,0,0,158,771,1,0,0,0,160,776,1,0,
  0,0,162,781,1,0,0,0,164,786,1,0,0,0,166,811,1,0,0,0,168,813,1,0,0,0,170,
  815,1,0,0,0,172,817,1,0,0,0,174,819,1,0,0,0,176,821,1,0,0,0,178,823,1,0,
  0,0,180,825,1,0,0,0,182,844,1,0,0,0,184,846,1,0,0,0,186,848,1,0,0,0,188,
  851,1,0,0,0,190,853,1,0,0,0,192,855,1,0,0,0,194,867,1,0,0,0,196,869,1,0,
  0,0,198,872,1,0,0,0,200,874,1,0,0,0,202,876,1,0,0,0,204,879,1,0,0,0,206,
  888,1,0,0,0,208,890,1,0,0,0,210,892,1,0,0,0,212,897,1,0,0,0,214,899,1,0,
  0,0,216,902,1,0,0,0,218,908,1,0,0,0,220,918,1,0,0,0,222,936,1,0,0,0,224,
  938,1,0,0,0,226,940,1,0,0,0,228,942,1,0,0,0,230,945,1,0,0,0,232,960,1,0,
  0,0,234,962,1,0,0,0,236,967,1,0,0,0,238,970,1,0,0,0,240,972,1,0,0,0,242,
  974,1,0,0,0,244,979,1,0,0,0,246,982,1,0,0,0,248,995,1,0,0,0,250,999,1,0,
  0,0,252,253,5,1,0,0,253,1,1,0,0,0,254,256,5,204,0,0,255,254,1,0,0,0,256,
  257,1,0,0,0,257,255,1,0,0,0,257,258,1,0,0,0,258,3,1,0,0,0,259,260,3,2,1,
  0,260,261,5,186,0,0,261,5,1,0,0,0,262,265,3,8,4,0,263,265,3,10,5,0,264,
  262,1,0,0,0,264,263,1,0,0,0,265,7,1,0,0,0,266,272,5,2,0,0,267,272,5,3,0,
  0,268,272,5,4,0,0,269,272,5,5,0,0,270,272,3,12,6,0,271,266,1,0,0,0,271,
  267,1,0,0,0,271,268,1,0,0,0,271,269,1,0,0,0,271,270,1,0,0,0,272,9,1,0,0,
  0,273,279,5,6,0,0,274,279,5,7,0,0,275,279,5,8,0,0,276,279,5,9,0,0,277,279,
  3,14,7,0,278,273,1,0,0,0,278,274,1,0,0,0,278,275,1,0,0,0,278,276,1,0,0,
  0,278,277,1,0,0,0,279,11,1,0,0,0,280,281,7,0,0,0,281,13,1,0,0,0,282,283,
  7,1,0,0,283,15,1,0,0,0,284,304,5,18,0,0,285,304,5,19,0,0,286,304,5,20,0,
  0,287,304,5,21,0,0,288,304,5,22,0,0,289,304,5,23,0,0,290,304,5,24,0,0,291,
  304,5,25,0,0,292,304,5,26,0,0,293,304,5,27,0,0,294,304,5,28,0,0,295,304,
  5,29,0,0,296,304,5,30,0,0,297,304,5,31,0,0,298,304,5,32,0,0,299,304,5,33,
  0,0,300,304,3,18,9,0,301,304,3,20,10,0,302,304,3,22,11,0,303,284,1,0,0,
  0,303,285,1,0,0,0,303,286,1,0,0,0,303,287,1,0,0,0,303,288,1,0,0,0,303,289,
  1,0,0,0,303,290,1,0,0,0,303,291,1,0,0,0,303,292,1,0,0,0,303,293,1,0,0,0,
  303,294,1,0,0,0,303,295,1,0,0,0,303,296,1,0,0,0,303,297,1,0,0,0,303,298,
  1,0,0,0,303,299,1,0,0,0,303,300,1,0,0,0,303,301,1,0,0,0,303,302,1,0,0,0,
  304,17,1,0,0,0,305,306,7,2,0,0,306,19,1,0,0,0,307,308,7,3,0,0,308,21,1,
  0,0,0,309,310,7,4,0,0,310,23,1,0,0,0,311,321,1,0,0,0,312,321,5,46,0,0,313,
  321,5,47,0,0,314,321,5,48,0,0,315,321,5,49,0,0,316,321,5,50,0,0,317,321,
  5,51,0,0,318,321,5,52,0,0,319,321,5,53,0,0,320,311,1,0,0,0,320,312,1,0,
  0,0,320,313,1,0,0,0,320,314,1,0,0,0,320,315,1,0,0,0,320,316,1,0,0,0,320,
  317,1,0,0,0,320,318,1,0,0,0,320,319,1,0,0,0,321,25,1,0,0,0,322,342,5,54,
  0,0,323,342,5,55,0,0,324,342,5,56,0,0,325,342,5,57,0,0,326,342,5,58,0,0,
  327,342,5,59,0,0,328,342,5,60,0,0,329,342,5,61,0,0,330,342,5,62,0,0,331,
  342,5,63,0,0,332,342,5,64,0,0,333,342,5,65,0,0,334,342,5,66,0,0,335,342,
  5,67,0,0,336,342,5,68,0,0,337,342,5,69,0,0,338,342,5,70,0,0,339,342,5,71,
  0,0,340,342,3,28,14,0,341,322,1,0,0,0,341,323,1,0,0,0,341,324,1,0,0,0,341,
  325,1,0,0,0,341,326,1,0,0,0,341,327,1,0,0,0,341,328,1,0,0,0,341,329,1,0,
  0,0,341,330,1,0,0,0,341,331,1,0,0,0,341,332,1,0,0,0,341,333,1,0,0,0,341,
  334,1,0,0,0,341,335,1,0,0,0,341,336,1,0,0,0,341,337,1,0,0,0,341,338,1,0,
  0,0,341,339,1,0,0,0,341,340,1,0,0,0,342,27,1,0,0,0,343,344,7,5,0,0,344,
  29,1,0,0,0,345,346,7,6,0,0,346,31,1,0,0,0,347,348,7,7,0,0,348,33,1,0,0,
  0,349,352,3,36,18,0,350,352,3,38,19,0,351,349,1,0,0,0,351,350,1,0,0,0,352,
  35,1,0,0,0,353,357,5,194,0,0,354,356,5,204,0,0,355,354,1,0,0,0,356,359,
  1,0,0,0,357,355,1,0,0,0,357,358,1,0,0,0,358,360,1,0,0,0,359,357,1,0,0,0,
  360,361,5,192,0,0,361,37,1,0,0,0,362,366,5,202,0,0,363,365,5,204,0,0,364,
  363,1,0,0,0,365,368,1,0,0,0,366,364,1,0,0,0,366,367,1,0,0,0,367,369,1,0,
  0,0,368,366,1,0,0,0,369,370,5,203,0,0,370,39,1,0,0,0,371,376,3,42,21,0,
  372,376,3,4,2,0,373,376,3,50,25,0,374,376,3,70,35,0,375,371,1,0,0,0,375,
  372,1,0,0,0,375,373,1,0,0,0,375,374,1,0,0,0,376,41,1,0,0,0,377,378,3,46,
  23,0,378,379,3,44,22,0,379,43,1,0,0,0,380,381,7,8,0,0,381,45,1,0,0,0,382,
  383,7,9,0,0,383,47,1,0,0,0,384,385,3,250,125,0,385,386,3,52,26,0,386,49,
  1,0,0,0,387,391,5,200,0,0,388,390,5,204,0,0,389,388,1,0,0,0,390,393,1,0,
  0,0,391,389,1,0,0,0,391,392,1,0,0,0,392,394,1,0,0,0,393,391,1,0,0,0,394,
  395,5,201,0,0,395,51,1,0,0,0,396,409,8,10,0,0,397,409,8,11,0,0,398,409,
  8,12,0,0,399,409,8,13,0,0,400,409,8,14,0,0,401,409,8,15,0,0,402,409,8,16,
  0,0,403,409,8,17,0,0,404,409,8,18,0,0,405,409,8,19,0,0,406,409,8,20,0,0,
  407,409,8,21,0,0,408,396,1,0,0,0,408,397,1,0,0,0,408,398,1,0,0,0,408,399,
  1,0,0,0,408,400,1,0,0,0,408,401,1,0,0,0,408,402,1,0,0,0,408,403,1,0,0,0,
  408,404,1,0,0,0,408,405,1,0,0,0,408,406,1,0,0,0,408,407,1,0,0,0,409,53,
  1,0,0,0,410,411,7,22,0,0,411,55,1,0,0,0,412,413,7,23,0,0,413,57,1,0,0,0,
  414,418,3,32,16,0,415,418,3,34,17,0,416,418,3,50,25,0,417,414,1,0,0,0,417,
  415,1,0,0,0,417,416,1,0,0,0,418,59,1,0,0,0,419,421,5,183,0,0,420,419,1,
  0,0,0,421,422,1,0,0,0,422,420,1,0,0,0,422,423,1,0,0,0,423,61,1,0,0,0,424,
  426,5,188,0,0,425,424,1,0,0,0,425,426,1,0,0,0,426,427,1,0,0,0,427,428,3,
  60,30,0,428,63,1,0,0,0,429,430,3,62,31,0,430,431,5,193,0,0,431,432,3,60,
  30,0,432,65,1,0,0,0,433,434,3,62,31,0,434,435,5,195,0,0,435,436,3,64,32,
  0,436,67,1,0,0,0,437,438,5,189,0,0,438,439,3,60,30,0,439,69,1,0,0,0,440,
  444,5,187,0,0,441,443,5,204,0,0,442,441,1,0,0,0,443,446,1,0,0,0,444,442,
  1,0,0,0,444,445,1,0,0,0,445,447,1,0,0,0,446,444,1,0,0,0,447,448,5,187,0,
  0,448,71,1,0,0,0,449,453,3,76,38,0,450,453,3,106,53,0,451,453,3,108,54,
  0,452,449,1,0,0,0,452,450,1,0,0,0,452,451,1,0,0,0,453,73,1,0,0,0,454,455,
  7,24,0,0,455,75,1,0,0,0,456,457,3,10,5,0,457,458,3,78,39,0,458,459,3,100,
  50,0,459,460,3,10,5,0,460,462,3,80,40,0,461,463,3,82,41,0,462,461,1,0,0,
  0,462,463,1,0,0,0,463,464,1,0,0,0,464,465,5,196,0,0,465,483,1,0,0,0,466,
  467,3,10,5,0,467,468,3,78,39,0,468,469,3,100,50,0,469,470,3,10,5,0,470,
  471,3,102,51,0,471,472,3,174,87,0,472,473,3,84,42,0,473,474,5,196,0,0,474,
  483,1,0,0,0,475,476,3,10,5,0,476,477,3,78,39,0,477,478,3,100,50,0,478,479,
  3,60,30,0,479,480,3,80,40,0,480,481,5,196,0,0,481,483,1,0,0,0,482,456,1,
  0,0,0,482,466,1,0,0,0,482,475,1,0,0,0,483,77,1,0,0,0,484,485,3,2,1,0,485,
  79,1,0,0,0,486,487,3,78,39,0,487,81,1,0,0,0,488,489,3,122,61,0,489,490,
  3,10,5,0,490,491,3,80,40,0,491,496,1,0,0,0,492,493,3,174,87,0,493,494,3,
  84,42,0,494,496,1,0,0,0,495,488,1,0,0,0,495,492,1,0,0,0,496,83,1,0,0,0,
  497,503,3,90,45,0,498,499,3,94,47,0,499,500,3,90,45,0,500,502,1,0,0,0,501,
  498,1,0,0,0,502,505,1,0,0,0,503,501,1,0,0,0,503,504,1,0,0,0,504,85,1,0,
  0,0,505,503,1,0,0,0,506,507,5,135,0,0,507,87,1,0,0,0,508,509,5,136,0,0,
  509,89,1,0,0,0,510,515,3,10,5,0,511,512,3,60,30,0,512,513,3,86,43,0,513,
  515,1,0,0,0,514,510,1,0,0,0,514,511,1,0,0,0,515,524,1,0,0,0,516,517,3,28,
  14,0,517,518,3,78,39,0,518,525,1,0,0,0,519,520,5,137,0,0,520,521,3,8,4,
  0,521,522,3,78,39,0,522,525,1,0,0,0,523,525,3,88,44,0,524,516,1,0,0,0,524,
  519,1,0,0,0,524,523,1,0,0,0,524,525,1,0,0,0,525,91,1,0,0,0,526,527,7,25,
  0,0,527,93,1,0,0,0,528,530,3,92,46,0,529,528,1,0,0,0,530,531,1,0,0,0,531,
  529,1,0,0,0,531,532,1,0,0,0,532,95,1,0,0,0,533,534,7,26,0,0,534,97,1,0,
  0,0,535,536,7,27,0,0,536,99,1,0,0,0,537,538,7,28,0,0,538,101,1,0,0,0,539,
  540,5,124,0,0,540,103,1,0,0,0,541,542,5,46,0,0,542,105,1,0,0,0,543,544,
  3,8,4,0,544,545,3,78,39,0,545,546,3,100,50,0,546,547,3,10,5,0,547,549,3,
  80,40,0,548,550,3,82,41,0,549,548,1,0,0,0,549,550,1,0,0,0,550,551,1,0,0,
  0,551,552,5,196,0,0,552,578,1,0,0,0,553,554,3,8,4,0,554,555,3,78,39,0,555,
  556,3,100,50,0,556,557,3,10,5,0,557,558,3,102,51,0,558,559,3,174,87,0,559,
  560,3,84,42,0,560,561,5,196,0,0,561,578,1,0,0,0,562,563,3,8,4,0,563,564,
  3,78,39,0,564,565,3,100,50,0,565,566,3,10,5,0,566,567,3,80,40,0,567,568,
  3,104,52,0,568,569,3,212,106,0,569,570,5,196,0,0,570,571,3,8,4,0,571,572,
  3,78,39,0,572,573,3,100,50,0,573,574,3,212,106,0,574,575,5,196,0,0,575,
  578,1,0,0,0,576,578,1,0,0,0,577,543,1,0,0,0,577,553,1,0,0,0,577,562,1,0,
  0,0,577,576,1,0,0,0,578,107,1,0,0,0,579,584,3,110,55,0,580,584,3,114,57,
  0,581,584,3,120,60,0,582,584,3,130,65,0,583,579,1,0,0,0,583,580,1,0,0,0,
  583,581,1,0,0,0,583,582,1,0,0,0,584,109,1,0,0,0,585,587,3,126,63,0,586,
  585,1,0,0,0,586,587,1,0,0,0,587,588,1,0,0,0,588,589,3,122,61,0,589,590,
  3,124,62,0,590,591,3,132,66,0,591,592,5,198,0,0,592,602,1,0,0,0,593,595,
  3,126,63,0,594,593,1,0,0,0,594,595,1,0,0,0,595,596,1,0,0,0,596,597,3,122,
  61,0,597,598,3,124,62,0,598,599,3,132,66,0,599,600,5,199,0,0,600,602,1,
  0,0,0,601,586,1,0,0,0,601,594,1,0,0,0,602,603,1,0,0,0,603,604,3,140,70,
  0,604,111,1,0,0,0,605,606,5,159,0,0,606,113,1,0,0,0,607,609,3,116,58,0,
  608,607,1,0,0,0,608,609,1,0,0,0,609,610,1,0,0,0,610,611,3,122,61,0,611,
  612,3,124,62,0,612,613,3,112,56,0,613,614,3,132,66,0,614,615,5,198,0,0,
  615,626,1,0,0,0,616,618,3,116,58,0,617,616,1,0,0,0,617,618,1,0,0,0,618,
  619,1,0,0,0,619,620,3,122,61,0,620,621,3,124,62,0,621,622,3,112,56,0,622,
  623,3,132,66,0,623,624,5,199,0,0,624,626,1,0,0,0,625,608,1,0,0,0,625,617,
  1,0,0,0,626,115,1,0,0,0,627,628,5,160,0,0,628,117,1,0,0,0,629,630,5,161,
  0,0,630,119,1,0,0,0,631,633,3,116,58,0,632,631,1,0,0,0,632,633,1,0,0,0,
  633,634,1,0,0,0,634,635,3,122,61,0,635,636,3,124,62,0,636,637,3,118,59,
  0,637,638,3,8,4,0,638,639,3,80,40,0,639,640,3,18,9,0,640,641,3,78,39,0,
  641,642,3,122,61,0,642,643,3,10,5,0,643,644,3,80,40,0,644,645,5,198,0,0,
  645,662,1,0,0,0,646,648,3,116,58,0,647,646,1,0,0,0,647,648,1,0,0,0,648,
  649,1,0,0,0,649,650,3,122,61,0,650,651,3,124,62,0,651,652,3,118,59,0,652,
  653,3,8,4,0,653,654,3,80,40,0,654,655,3,18,9,0,655,656,3,78,39,0,656,657,
  3,122,61,0,657,658,3,10,5,0,658,659,3,80,40,0,659,660,5,199,0,0,660,662,
  1,0,0,0,661,632,1,0,0,0,661,647,1,0,0,0,662,663,1,0,0,0,663,664,3,140,70,
  0,664,121,1,0,0,0,665,666,5,162,0,0,666,123,1,0,0,0,667,668,5,163,0,0,668,
  125,1,0,0,0,669,670,5,164,0,0,670,127,1,0,0,0,671,672,5,165,0,0,672,129,
  1,0,0,0,673,675,3,126,63,0,674,673,1,0,0,0,674,675,1,0,0,0,675,676,1,0,
  0,0,676,677,3,122,61,0,677,678,3,124,62,0,678,679,3,128,64,0,679,680,3,
  132,66,0,680,681,5,198,0,0,681,692,1,0,0,0,682,684,3,126,63,0,683,682,1,
  0,0,0,683,684,1,0,0,0,684,685,1,0,0,0,685,686,3,122,61,0,686,687,3,124,
  62,0,687,688,3,128,64,0,688,689,3,132,66,0,689,690,5,199,0,0,690,692,1,
  0,0,0,691,674,1,0,0,0,691,683,1,0,0,0,692,693,1,0,0,0,693,694,3,140,70,
  0,694,131,1,0,0,0,695,702,3,134,67,0,696,702,3,136,68,0,697,699,3,138,69,
  0,698,700,3,50,25,0,699,698,1,0,0,0,699,700,1,0,0,0,700,702,1,0,0,0,701,
  695,1,0,0,0,701,696,1,0,0,0,701,697,1,0,0,0,702,133,1,0,0,0,703,704,3,2,
  1,0,704,135,1,0,0,0,705,706,3,10,5,0,706,710,3,78,39,0,707,708,3,28,14,
  0,708,709,3,78,39,0,709,711,1,0,0,0,710,707,1,0,0,0,710,711,1,0,0,0,711,
  137,1,0,0,0,712,713,3,8,4,0,713,714,3,78,39,0,714,139,1,0,0,0,715,717,3,
  142,71,0,716,715,1,0,0,0,717,718,1,0,0,0,718,716,1,0,0,0,718,719,1,0,0,
  0,719,141,1,0,0,0,720,727,3,146,73,0,721,727,3,148,74,0,722,727,3,152,76,
  0,723,724,3,156,78,0,724,725,5,197,0,0,725,727,1,0,0,0,726,720,1,0,0,0,
  726,721,1,0,0,0,726,722,1,0,0,0,726,723,1,0,0,0,727,143,1,0,0,0,728,729,
  5,59,0,0,729,145,1,0,0,0,730,731,3,144,72,0,731,732,3,136,68,0,732,147,
  1,0,0,0,733,734,5,55,0,0,734,149,1,0,0,0,735,736,5,54,0,0,736,151,1,0,0,
  0,737,738,3,150,75,0,738,739,3,154,77,0,739,740,5,197,0,0,740,745,3,156,
  78,0,741,742,5,198,0,0,742,744,3,156,78,0,743,741,1,0,0,0,744,747,1,0,0,
  0,745,743,1,0,0,0,745,746,1,0,0,0,746,748,1,0,0,0,747,745,1,0,0,0,748,749,
  5,196,0,0,749,153,1,0,0,0,750,752,3,2,1,0,751,750,1,0,0,0,752,753,1,0,0,
  0,753,751,1,0,0,0,753,754,1,0,0,0,754,756,1,0,0,0,755,757,3,30,15,0,756,
  755,1,0,0,0,756,757,1,0,0,0,757,759,1,0,0,0,758,760,3,154,77,0,759,758,
  1,0,0,0,759,760,1,0,0,0,760,155,1,0,0,0,761,770,3,158,79,0,762,770,3,160,
  80,0,763,770,3,182,91,0,764,770,3,186,93,0,765,770,3,198,99,0,766,770,3,
  192,96,0,767,770,3,196,98,0,768,770,3,202,101,0,769,761,1,0,0,0,769,762,
  1,0,0,0,769,763,1,0,0,0,769,764,1,0,0,0,769,765,1,0,0,0,769,766,1,0,0,0,
  769,767,1,0,0,0,769,768,1,0,0,0,770,157,1,0,0,0,771,772,5,57,0,0,772,159,
  1,0,0,0,773,777,3,162,81,0,774,777,3,164,82,0,775,777,3,180,90,0,776,773,
  1,0,0,0,776,774,1,0,0,0,776,775,1,0,0,0,777,161,1,0,0,0,778,782,3,134,67,
  0,779,782,3,204,102,0,780,782,3,138,69,0,781,778,1,0,0,0,781,779,1,0,0,
  0,781,780,1,0,0,0,782,784,1,0,0,0,783,785,3,50,25,0,784,783,1,0,0,0,784,
  785,1,0,0,0,785,163,1,0,0,0,786,787,3,172,86,0,787,788,3,166,83,0,788,789,
  3,168,84,0,789,790,3,166,83,0,790,791,3,166,83,0,791,792,3,170,85,0,792,
  796,3,166,83,0,793,794,3,174,87,0,794,795,3,204,102,0,795,797,1,0,0,0,796,
  793,1,0,0,0,796,797,1,0,0,0,797,803,1,0,0,0,798,799,3,176,88,0,799,800,
  3,204,102,0,800,802,1,0,0,0,801,798,1,0,0,0,802,805,1,0,0,0,803,804,1,0,
  0,0,803,801,1,0,0,0,804,809,1,0,0,0,805,803,1,0,0,0,806,807,3,178,89,0,
  807,808,3,222,111,0,808,810,1,0,0,0,809,806,1,0,0,0,809,810,1,0,0,0,810,
  165,1,0,0,0,811,812,5,187,0,0,812,167,1,0,0,0,813,814,3,2,1,0,814,169,1,
  0,0,0,815,816,3,2,1,0,816,171,1,0,0,0,817,818,5,65,0,0,818,173,1,0,0,0,
  819,820,5,142,0,0,820,175,1,0,0,0,821,822,5,138,0,0,822,177,1,0,0,0,823,
  824,5,66,0,0,824,179,1,0,0,0,825,826,3,172,86,0,826,842,3,204,102,0,827,
  828,3,174,87,0,828,834,3,204,102,0,829,830,3,176,88,0,830,831,3,204,102,
  0,831,833,1,0,0,0,832,829,1,0,0,0,833,836,1,0,0,0,834,832,1,0,0,0,834,835,
  1,0,0,0,835,840,1,0,0,0,836,834,1,0,0,0,837,838,3,178,89,0,838,839,3,222,
  111,0,839,841,1,0,0,0,840,837,1,0,0,0,840,841,1,0,0,0,841,843,1,0,0,0,842,
  827,1,0,0,0,842,843,1,0,0,0,843,181,1,0,0,0,844,845,5,58,0,0,845,183,1,
  0,0,0,846,847,5,64,0,0,847,185,1,0,0,0,848,849,3,184,92,0,849,850,3,68,
  34,0,850,187,1,0,0,0,851,852,5,166,0,0,852,189,1,0,0,0,853,854,5,167,0,
  0,854,191,1,0,0,0,855,856,3,188,94,0,856,857,3,6,3,0,857,858,3,222,111,
  0,858,862,3,190,95,0,859,863,3,134,67,0,860,863,3,136,68,0,861,863,3,138,
  69,0,862,859,1,0,0,0,862,860,1,0,0,0,862,861,1,0,0,0,863,865,1,0,0,0,864,
  866,3,50,25,0,865,864,1,0,0,0,865,866,1,0,0,0,866,193,1,0,0,0,867,868,7,
  29,0,0,868,195,1,0,0,0,869,870,3,194,97,0,870,871,3,204,102,0,871,197,1,
  0,0,0,872,873,5,56,0,0,873,199,1,0,0,0,874,875,5,60,0,0,875,201,1,0,0,0,
  876,877,3,200,100,0,877,878,3,208,104,0,878,203,1,0,0,0,879,885,3,222,111,
  0,880,881,3,206,103,0,881,882,3,222,111,0,882,884,1,0,0,0,883,880,1,0,0,
  0,884,887,1,0,0,0,885,883,1,0,0,0,885,886,1,0,0,0,886,205,1,0,0,0,887,885,
  1,0,0,0,888,889,7,30,0,0,889,207,1,0,0,0,890,891,7,31,0,0,891,209,1,0,0,
  0,892,893,7,32,0,0,893,211,1,0,0,0,894,898,3,214,107,0,895,898,3,216,108,
  0,896,898,3,220,110,0,897,894,1,0,0,0,897,895,1,0,0,0,897,896,1,0,0,0,898,
  213,1,0,0,0,899,900,5,188,0,0,900,901,3,212,106,0,901,215,1,0,0,0,902,903,
  5,195,0,0,903,904,3,212,106,0,904,217,1,0,0,0,905,909,3,62,31,0,906,909,
  3,64,32,0,907,909,3,66,33,0,908,905,1,0,0,0,908,906,1,0,0,0,908,907,1,0,
  0,0,909,219,1,0,0,0,910,912,3,218,109,0,911,913,3,80,40,0,912,911,1,0,0,
  0,912,913,1,0,0,0,913,919,1,0,0,0,914,919,3,70,35,0,915,919,3,68,34,0,916,
  919,3,208,104,0,917,919,3,210,105,0,918,910,1,0,0,0,918,914,1,0,0,0,918,
  915,1,0,0,0,918,916,1,0,0,0,918,917,1,0,0,0,919,221,1,0,0,0,920,937,3,228,
  114,0,921,937,3,230,115,0,922,937,3,232,116,0,923,937,3,234,117,0,924,929,
  3,236,118,0,925,926,3,226,113,0,926,927,3,10,5,0,927,928,3,80,40,0,928,
  930,1,0,0,0,929,925,1,0,0,0,929,930,1,0,0,0,930,934,1,0,0,0,931,932,3,224,
  112,0,932,933,3,222,111,0,933,935,1,0,0,0,934,931,1,0,0,0,934,935,1,0,0,
  0,935,937,1,0,0,0,936,920,1,0,0,0,936,921,1,0,0,0,936,922,1,0,0,0,936,923,
  1,0,0,0,936,924,1,0,0,0,937,223,1,0,0,0,938,939,5,193,0,0,939,225,1,0,0,
  0,940,941,5,177,0,0,941,227,1,0,0,0,942,943,5,188,0,0,943,944,3,222,111,
  0,944,229,1,0,0,0,945,946,5,195,0,0,946,947,3,222,111,0,947,231,1,0,0,0,
  948,949,3,10,5,0,949,953,3,78,39,0,950,951,3,28,14,0,951,952,3,78,39,0,
  952,954,1,0,0,0,953,950,1,0,0,0,953,954,1,0,0,0,954,961,1,0,0,0,955,956,
  3,8,4,0,956,957,3,78,39,0,957,958,3,18,9,0,958,959,3,78,39,0,959,961,1,
  0,0,0,960,948,1,0,0,0,960,955,1,0,0,0,961,233,1,0,0,0,962,963,3,8,4,0,963,
  964,3,248,124,0,964,965,3,22,11,0,965,966,3,78,39,0,966,235,1,0,0,0,967,
  968,3,220,110,0,968,969,3,244,122,0,969,237,1,0,0,0,970,971,5,178,0,0,971,
  239,1,0,0,0,972,973,5,179,0,0,973,241,1,0,0,0,974,975,5,180,0,0,975,243,
  1,0,0,0,976,978,3,246,123,0,977,976,1,0,0,0,978,981,1,0,0,0,979,977,1,0,
  0,0,979,980,1,0,0,0,980,245,1,0,0,0,981,979,1,0,0,0,982,988,3,250,125,0,
  983,989,3,78,39,0,984,989,3,120,60,0,985,989,3,238,119,0,986,989,3,240,
  120,0,987,989,3,242,121,0,988,983,1,0,0,0,988,984,1,0,0,0,988,985,1,0,0,
  0,988,986,1,0,0,0,988,987,1,0,0,0,989,247,1,0,0,0,990,996,3,78,39,0,991,
  996,3,120,60,0,992,996,3,238,119,0,993,996,3,240,120,0,994,996,3,242,121,
  0,995,990,1,0,0,0,995,991,1,0,0,0,995,992,1,0,0,0,995,993,1,0,0,0,995,994,
  1,0,0,0,996,997,1,0,0,0,997,998,3,22,11,0,998,249,1,0,0,0,999,1000,5,181,
  0,0,1000,251,1,0,0,0,74,257,264,271,278,303,320,341,351,357,366,375,391,
  408,417,422,425,444,452,462,482,495,503,514,524,531,549,577,583,586,594,
  601,608,617,625,632,647,661,674,683,691,699,701,710,718,726,745,753,756,
  759,769,776,781,784,796,803,809,834,840,842,862,865,885,897,908,912,918,
  929,934,936,953,960,979,988,995];

  private static __ATN: ATN;
  public static get _ATN(): ATN {
    if (!PortuguesPuroParser.__ATN) {
      PortuguesPuroParser.__ATN = new ATNDeserializer().deserialize(PortuguesPuroParser._serializedATN);
    }

    return PortuguesPuroParser.__ATN;
  }


  static DecisionsToDFA = PortuguesPuroParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class Regra_espaçoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_regra_espaço;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterRegra_espaço) {
       listener.enterRegra_espaço();

    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitRegra_espaço) {
       listener.exitRegra_espaço(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitRegra_espaço) {
      return visitor.visitRegra_espaço(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class PalavraContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public CARACTERES_IMPRIMÍVEIS_list(): TerminalNode[] {
        return this.getTokens(PortuguesPuroParser.CARACTERES_IMPRIMÍVEIS);
  }
  public CARACTERES_IMPRIMÍVEIS(i: number): TerminalNode {
    return this.getToken(PortuguesPuroParser.CARACTERES_IMPRIMÍVEIS, i);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitPalavra) {
      return visitor.visitPalavra(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Possessivo_inglêsContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public palavra(): PalavraContext {
    return this.getTypedRuleContext(PalavraContext, 0) as PalavraContext;
  }
  public APÓSTROFO(): TerminalNode {
    return this.getToken(PortuguesPuroParser.APÓSTROFO, 0);
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_possessivo_inglês;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterPossessivo_inglês) {
       listener.enterPossessivo_inglês(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitPossessivo_inglês) {
       listener.exitPossessivo_inglês(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitPossessivo_inglês) {
      return visitor.visitPossessivo_inglês(this);
    } else {
      return visitor.visitChildren(this);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitArtigo) {
      return visitor.visitArtigo(this);
    } else {
      return visitor.visitChildren(this);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitArtigo_definido) {
      return visitor.visitArtigo_definido(this);
    } else {
      return visitor.visitChildren(this);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitArtigo_indefinido) {
      return visitor.visitArtigo_indefinido(this);
    } else {
      return visitor.visitChildren(this);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitAdjacentes) {
      return visitor.visitAdjacentes(this);
    } else {
      return visitor.visitChildren(this);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitAbrangentes) {
      return visitor.visitAbrangentes(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class ContraçõesContext extends ParserRuleContext {
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
      return PortuguesPuroParser.RULE_contrações;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterContrações) {
       listener.enterContrações(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitContrações) {
       listener.exitContrações(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitContrações) {
      return visitor.visitContrações(this);
    } else {
      return visitor.visitChildren(this);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitAtribuidores_de_posse) {
      return visitor.visitAtribuidores_de_posse(this);
    } else {
      return visitor.visitChildren(this);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitP1) {
      return visitor.visitP1(this);
    } else {
      return visitor.visitChildren(this);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitP2) {
      return visitor.visitP2(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Operadores_de_comparaçãoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_operadores_de_comparação;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterOperadores_de_comparação) {
       listener.enterOperadores_de_comparação(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitOperadores_de_comparação) {
       listener.exitOperadores_de_comparação(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitOperadores_de_comparação) {
      return visitor.visitOperadores_de_comparação(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Palavras_reservadasContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public denominações(): DenominaçõesContext {
    return this.getTypedRuleContext(DenominaçõesContext, 0) as DenominaçõesContext;
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitPalavras_reservadas) {
      return visitor.visitPalavras_reservadas(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class DenominaçõesContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_denominações;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterDenominações) {
       listener.enterDenominações(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitDenominações) {
       listener.exitDenominações(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitDenominações) {
      return visitor.visitDenominações(this);
    } else {
      return visitor.visitChildren(this);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitVerbos) {
      return visitor.visitVerbos(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Caracteres_ignoráveisContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public CARACTERES_DE_CONTROLE(): TerminalNode {
    return this.getToken(PortuguesPuroParser.CARACTERES_DE_CONTROLE, 0);
  }
  public ESPAÇO_EM_BRANCO(): TerminalNode {
    return this.getToken(PortuguesPuroParser.ESPAÇO_EM_BRANCO, 0);
  }
  public ESPAÇO_RÍGIDO(): TerminalNode {
    return this.getToken(PortuguesPuroParser.ESPAÇO_RÍGIDO, 0);
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_caracteres_ignoráveis;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterCaracteres_ignoráveis) {
       listener.enterCaracteres_ignoráveis(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitCaracteres_ignoráveis) {
       listener.exitCaracteres_ignoráveis(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitCaracteres_ignoráveis) {
      return visitor.visitCaracteres_ignoráveis(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class ComentárioContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public comentário_de_linha(): Comentário_de_linhaContext {
    return this.getTypedRuleContext(Comentário_de_linhaContext, 0) as Comentário_de_linhaContext;
  }
  public comentário_de_bloco(): Comentário_de_blocoContext {
    return this.getTypedRuleContext(Comentário_de_blocoContext, 0) as Comentário_de_blocoContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_comentário;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterComentário) {
       listener.enterComentário(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitComentário) {
       listener.exitComentário(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitComentário) {
      return visitor.visitComentário(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Comentário_de_linhaContext extends ParserRuleContext {
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
  public CARACTERES_IMPRIMÍVEIS_list(): TerminalNode[] {
        return this.getTokens(PortuguesPuroParser.CARACTERES_IMPRIMÍVEIS);
  }
  public CARACTERES_IMPRIMÍVEIS(i: number): TerminalNode {
    return this.getToken(PortuguesPuroParser.CARACTERES_IMPRIMÍVEIS, i);
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_comentário_de_linha;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterComentário_de_linha) {
       listener.enterComentário_de_linha(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitComentário_de_linha) {
       listener.exitComentário_de_linha(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitComentário_de_linha) {
      return visitor.visitComentário_de_linha(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Comentário_de_blocoContext extends ParserRuleContext {
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
  public CARACTERES_IMPRIMÍVEIS_list(): TerminalNode[] {
        return this.getTokens(PortuguesPuroParser.CARACTERES_IMPRIMÍVEIS);
  }
  public CARACTERES_IMPRIMÍVEIS(i: number): TerminalNode {
    return this.getToken(PortuguesPuroParser.CARACTERES_IMPRIMÍVEIS, i);
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_comentário_de_bloco;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterComentário_de_bloco) {
       listener.enterComentário_de_bloco(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitComentário_de_bloco) {
       listener.exitComentário_de_bloco(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitComentário_de_bloco) {
      return visitor.visitComentário_de_bloco(this);
    } else {
      return visitor.visitChildren(this);
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
  public possessivo_inglês(): Possessivo_inglêsContext {
    return this.getTypedRuleContext(Possessivo_inglêsContext, 0) as Possessivo_inglêsContext;
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitToken) {
      return visitor.visitToken(this);
    } else {
      return visitor.visitChildren(this);
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
  public caractere_aglomerável(): Caractere_aglomerávelContext {
    return this.getTypedRuleContext(Caractere_aglomerávelContext, 0) as Caractere_aglomerávelContext;
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitAglomerado) {
      return visitor.visitAglomerado(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Caractere_aglomerávelContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public LETRA(): TerminalNode {
    return this.getToken(PortuguesPuroParser.LETRA, 0);
  }
  public DÍGITO(): TerminalNode {
    return this.getToken(PortuguesPuroParser.DÍGITO, 0);
  }
  public CIFRÃO(): TerminalNode {
    return this.getToken(PortuguesPuroParser.CIFRÃO, 0);
  }
  public HÍFEN(): TerminalNode {
    return this.getToken(PortuguesPuroParser.HÍFEN, 0);
  }
  public SINAL_DE_ADIÇÃO(): TerminalNode {
    return this.getToken(PortuguesPuroParser.SINAL_DE_ADIÇÃO, 0);
  }
  public BARRA_INCLINADA(): TerminalNode {
    return this.getToken(PortuguesPuroParser.BARRA_INCLINADA, 0);
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_caractere_aglomerável;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterCaractere_aglomerável) {
       listener.enterCaractere_aglomerável(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitCaractere_aglomerável) {
       listener.exitCaractere_aglomerável(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitCaractere_aglomerável) {
      return visitor.visitCaractere_aglomerável(this);
    } else {
      return visitor.visitChildren(this);
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
  public DÍGITO(): TerminalNode {
    return this.getToken(PortuguesPuroParser.DÍGITO, 0);
  }
  public CIFRÃO(): TerminalNode {
    return this.getToken(PortuguesPuroParser.CIFRÃO, 0);
  }
  public APÓSTROFO(): TerminalNode {
    return this.getToken(PortuguesPuroParser.APÓSTROFO, 0);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitIniciador_de_aglomerado) {
      return visitor.visitIniciador_de_aglomerado(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Possessivo_novoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public apóstrofo(): ApóstrofoContext {
    return this.getTypedRuleContext(ApóstrofoContext, 0) as ApóstrofoContext;
  }
  public caractere_não_aglomerável(): Caractere_não_aglomerávelContext {
    return this.getTypedRuleContext(Caractere_não_aglomerávelContext, 0) as Caractere_não_aglomerávelContext;
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitPossessivo_novo) {
      return visitor.visitPossessivo_novo(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class QualificadorContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public ABRE_PARÊNTESES(): TerminalNode {
    return this.getToken(PortuguesPuroParser.ABRE_PARÊNTESES, 0);
  }
  public FECHA_PARÊNTESES(): TerminalNode {
    return this.getToken(PortuguesPuroParser.FECHA_PARÊNTESES, 0);
  }
  public CARACTERES_IMPRIMÍVEIS_list(): TerminalNode[] {
        return this.getTokens(PortuguesPuroParser.CARACTERES_IMPRIMÍVEIS);
  }
  public CARACTERES_IMPRIMÍVEIS(i: number): TerminalNode {
    return this.getToken(PortuguesPuroParser.CARACTERES_IMPRIMÍVEIS, i);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitQualificador) {
      return visitor.visitQualificador(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Caractere_não_aglomerávelContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public LETRA(): TerminalNode {
    return this.getToken(PortuguesPuroParser.LETRA, 0);
  }
  public DÍGITO(): TerminalNode {
    return this.getToken(PortuguesPuroParser.DÍGITO, 0);
  }
  public CIFRÃO(): TerminalNode {
    return this.getToken(PortuguesPuroParser.CIFRÃO, 0);
  }
  public HÍFEN(): TerminalNode {
    return this.getToken(PortuguesPuroParser.HÍFEN, 0);
  }
  public SINAL_DE_ADIÇÃO(): TerminalNode {
    return this.getToken(PortuguesPuroParser.SINAL_DE_ADIÇÃO, 0);
  }
  public BARRA_INCLINADA(): TerminalNode {
    return this.getToken(PortuguesPuroParser.BARRA_INCLINADA, 0);
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_caractere_não_aglomerável;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterCaractere_não_aglomerável) {
       listener.enterCaractere_não_aglomerável(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitCaractere_não_aglomerável) {
       listener.exitCaractere_não_aglomerável(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitCaractere_não_aglomerável) {
      return visitor.visitCaractere_não_aglomerável(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Sinal_de_pontuaçãoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public PONTO(): TerminalNode {
    return this.getToken(PortuguesPuroParser.PONTO, 0);
  }
  public VÍRGULA(): TerminalNode {
    return this.getToken(PortuguesPuroParser.VÍRGULA, 0);
  }
  public PONTO_E_VÍRGULA(): TerminalNode {
    return this.getToken(PortuguesPuroParser.PONTO_E_VÍRGULA, 0);
  }
  public DOIS_PONTOS(): TerminalNode {
    return this.getToken(PortuguesPuroParser.DOIS_PONTOS, 0);
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_sinal_de_pontuação;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterSinal_de_pontuação) {
       listener.enterSinal_de_pontuação(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitSinal_de_pontuação) {
       listener.exitSinal_de_pontuação(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitSinal_de_pontuação) {
      return visitor.visitSinal_de_pontuação(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Símbolos_especiaisContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public SINAL_DE_ADIÇÃO(): TerminalNode {
    return this.getToken(PortuguesPuroParser.SINAL_DE_ADIÇÃO, 0);
  }
  public HÍFEN(): TerminalNode {
    return this.getToken(PortuguesPuroParser.HÍFEN, 0);
  }
  public BARRA_INCLINADA(): TerminalNode {
    return this.getToken(PortuguesPuroParser.BARRA_INCLINADA, 0);
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_símbolos_especiais;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterSímbolos_especiais) {
       listener.enterSímbolos_especiais(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitSímbolos_especiais) {
       listener.exitSímbolos_especiais(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitSímbolos_especiais) {
      return visitor.visitSímbolos_especiais(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class RuídoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public caracteres_ignoráveis(): Caracteres_ignoráveisContext {
    return this.getTypedRuleContext(Caracteres_ignoráveisContext, 0) as Caracteres_ignoráveisContext;
  }
  public comentário(): ComentárioContext {
    return this.getTypedRuleContext(ComentárioContext, 0) as ComentárioContext;
  }
  public qualificador(): QualificadorContext {
    return this.getTypedRuleContext(QualificadorContext, 0) as QualificadorContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_ruído;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterRuído) {
       listener.enterRuído(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitRuído) {
       listener.exitRuído(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitRuído) {
      return visitor.visitRuído(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Número_inteiroContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public DÍGITO_list(): TerminalNode[] {
        return this.getTokens(PortuguesPuroParser.DÍGITO);
  }
  public DÍGITO(i: number): TerminalNode {
    return this.getToken(PortuguesPuroParser.DÍGITO, i);
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_número_inteiro;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterNúmero_inteiro) {
       listener.enterNúmero_inteiro(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitNúmero_inteiro) {
       listener.exitNúmero_inteiro(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitNúmero_inteiro) {
      return visitor.visitNúmero_inteiro(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Número_decimalContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public número_inteiro(): Número_inteiroContext {
    return this.getTypedRuleContext(Número_inteiroContext, 0) as Número_inteiroContext;
  }
  public HÍFEN(): TerminalNode {
    return this.getToken(PortuguesPuroParser.HÍFEN, 0);
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_número_decimal;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterNúmero_decimal) {
       listener.enterNúmero_decimal(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitNúmero_decimal) {
       listener.exitNúmero_decimal(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitNúmero_decimal) {
      return visitor.visitNúmero_decimal(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Número_fracionárioContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public número_decimal(): Número_decimalContext {
    return this.getTypedRuleContext(Número_decimalContext, 0) as Número_decimalContext;
  }
  public BARRA_INCLINADA(): TerminalNode {
    return this.getToken(PortuguesPuroParser.BARRA_INCLINADA, 0);
  }
  public número_inteiro(): Número_inteiroContext {
    return this.getTypedRuleContext(Número_inteiroContext, 0) as Número_inteiroContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_número_fracionário;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterNúmero_fracionário) {
       listener.enterNúmero_fracionário(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitNúmero_fracionário) {
       listener.exitNúmero_fracionário(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitNúmero_fracionário) {
      return visitor.visitNúmero_fracionário(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Número_mistoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public número_decimal(): Número_decimalContext {
    return this.getTypedRuleContext(Número_decimalContext, 0) as Número_decimalContext;
  }
  public SINAL_DE_ADIÇÃO(): TerminalNode {
    return this.getToken(PortuguesPuroParser.SINAL_DE_ADIÇÃO, 0);
  }
  public número_fracionário(): Número_fracionárioContext {
    return this.getTypedRuleContext(Número_fracionárioContext, 0) as Número_fracionárioContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_número_misto;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterNúmero_misto) {
       listener.enterNúmero_misto(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitNúmero_misto) {
       listener.exitNúmero_misto(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitNúmero_misto) {
      return visitor.visitNúmero_misto(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Número_hexadecimalContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public CIFRÃO(): TerminalNode {
    return this.getToken(PortuguesPuroParser.CIFRÃO, 0);
  }
  public número_inteiro(): Número_inteiroContext {
    return this.getTypedRuleContext(Número_inteiroContext, 0) as Número_inteiroContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_número_hexadecimal;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterNúmero_hexadecimal) {
       listener.enterNúmero_hexadecimal(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitNúmero_hexadecimal) {
       listener.exitNúmero_hexadecimal(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitNúmero_hexadecimal) {
      return visitor.visitNúmero_hexadecimal(this);
    } else {
      return visitor.visitChildren(this);
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
  public CARACTERES_IMPRIMÍVEIS_list(): TerminalNode[] {
        return this.getTokens(PortuguesPuroParser.CARACTERES_IMPRIMÍVEIS);
  }
  public CARACTERES_IMPRIMÍVEIS(i: number): TerminalNode {
    return this.getToken(PortuguesPuroParser.CARACTERES_IMPRIMÍVEIS, i);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitString_literal) {
      return visitor.visitString_literal(this);
    } else {
      return visitor.visitChildren(this);
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
  public variável_global(): Variável_globalContext {
    return this.getTypedRuleContext(Variável_globalContext, 0) as Variável_globalContext;
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitPrograma) {
      return visitor.visitPrograma(this);
    } else {
      return visitor.visitChildren(this);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitTipos_primitivos) {
      return visitor.visitTipos_primitivos(this);
    } else {
      return visitor.visitChildren(this);
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
  public é(): ÉContext {
    return this.getTypedRuleContext(ÉContext, 0) as ÉContext;
  }
  public nome_do_tipo(): Nome_do_tipoContext {
    return this.getTypedRuleContext(Nome_do_tipoContext, 0) as Nome_do_tipoContext;
  }
  public PONTO(): TerminalNode {
    return this.getToken(PortuguesPuroParser.PONTO, 0);
  }
  public informação_opcional(): Informação_opcionalContext {
    return this.getTypedRuleContext(Informação_opcionalContext, 0) as Informação_opcionalContext;
  }
  public estrutura(): EstruturaContext {
    return this.getTypedRuleContext(EstruturaContext, 0) as EstruturaContext;
  }
  public com(): ComContext {
    return this.getTypedRuleContext(ComContext, 0) as ComContext;
  }
  public campos(): CamposContext {
    return this.getTypedRuleContext(CamposContext, 0) as CamposContext;
  }
  public número_inteiro(): Número_inteiroContext {
    return this.getTypedRuleContext(Número_inteiroContext, 0) as Número_inteiroContext;
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitTipo) {
      return visitor.visitTipo(this);
    } else {
      return visitor.visitChildren(this);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitNome) {
      return visitor.visitNome(this);
    } else {
      return visitor.visitChildren(this);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitNome_do_tipo) {
      return visitor.visitNome_do_tipo(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Informação_opcionalContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public para(): ParaContext {
    return this.getTypedRuleContext(ParaContext, 0) as ParaContext;
  }
  public artigo_indefinido(): Artigo_indefinidoContext {
    return this.getTypedRuleContext(Artigo_indefinidoContext, 0) as Artigo_indefinidoContext;
  }
  public nome_do_tipo(): Nome_do_tipoContext {
    return this.getTypedRuleContext(Nome_do_tipoContext, 0) as Nome_do_tipoContext;
  }
  public com(): ComContext {
    return this.getTypedRuleContext(ComContext, 0) as ComContext;
  }
  public campos(): CamposContext {
    return this.getTypedRuleContext(CamposContext, 0) as CamposContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_informação_opcional;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterInformação_opcional) {
       listener.enterInformação_opcional(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitInformação_opcional) {
       listener.exitInformação_opcional(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitInformação_opcional) {
      return visitor.visitInformação_opcional(this);
    } else {
      return visitor.visitChildren(this);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitCampos) {
      return visitor.visitCampos(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class BytesContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_bytes;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterBytes) {
       listener.enterBytes(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitBytes) {
       listener.exitBytes(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitBytes) {
      return visitor.visitBytes(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class ReferênciaContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_referência;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterReferência) {
       listener.enterReferência(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitReferência) {
       listener.exitReferência(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitReferência) {
      return visitor.visitReferência(this);
    } else {
      return visitor.visitChildren(this);
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
  public número_inteiro(): Número_inteiroContext {
    return this.getTypedRuleContext(Número_inteiroContext, 0) as Número_inteiroContext;
  }
  public bytes(): BytesContext {
    return this.getTypedRuleContext(BytesContext, 0) as BytesContext;
  }
  public denominações(): DenominaçõesContext {
    return this.getTypedRuleContext(DenominaçõesContext, 0) as DenominaçõesContext;
  }
  public nome(): NomeContext {
    return this.getTypedRuleContext(NomeContext, 0) as NomeContext;
  }
  public artigo_definido(): Artigo_definidoContext {
    return this.getTypedRuleContext(Artigo_definidoContext, 0) as Artigo_definidoContext;
  }
  public referência(): ReferênciaContext {
    return this.getTypedRuleContext(ReferênciaContext, 0) as ReferênciaContext;
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitCampo) {
      return visitor.visitCampo(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class PausaContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public VÍRGULA(): TerminalNode {
    return this.getToken(PortuguesPuroParser.VÍRGULA, 0);
  }
  public PONTO_E_VÍRGULA(): TerminalNode {
    return this.getToken(PortuguesPuroParser.PONTO_E_VÍRGULA, 0);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitPausa) {
      return visitor.visitPausa(this);
    } else {
      return visitor.visitChildren(this);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitPausas) {
      return visitor.visitPausas(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class ConjunçõesContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_conjunções;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterConjunções) {
       listener.enterConjunções(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitConjunções) {
       listener.exitConjunções(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitConjunções) {
      return visitor.visitConjunções(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class PreposiçõesContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_preposições;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterPreposições) {
       listener.enterPreposições(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitPreposições) {
       listener.exitPreposições(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitPreposições) {
      return visitor.visitPreposições(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class ÉContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_é;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterÉ) {
       listener.enterÉ(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitÉ) {
       listener.exitÉ(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitÉ) {
      return visitor.visitÉ(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class EstruturaContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_estrutura;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterEstrutura) {
       listener.enterEstrutura(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitEstrutura) {
       listener.exitEstrutura(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitEstrutura) {
      return visitor.visitEstrutura(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Igual_aContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_igual_a;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterIgual_a) {
       listener.enterIgual_a(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitIgual_a) {
       listener.exitIgual_a(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitIgual_a) {
      return visitor.visitIgual_a(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Variável_globalContext extends ParserRuleContext {
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
  public é_list(): ÉContext[] {
    return this.getTypedRuleContexts(ÉContext) as ÉContext[];
  }
  public é(i: number): ÉContext {
    return this.getTypedRuleContext(ÉContext, i) as ÉContext;
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
  public informação_opcional(): Informação_opcionalContext {
    return this.getTypedRuleContext(Informação_opcionalContext, 0) as Informação_opcionalContext;
  }
  public estrutura(): EstruturaContext {
    return this.getTypedRuleContext(EstruturaContext, 0) as EstruturaContext;
  }
  public com(): ComContext {
    return this.getTypedRuleContext(ComContext, 0) as ComContext;
  }
  public campos(): CamposContext {
    return this.getTypedRuleContext(CamposContext, 0) as CamposContext;
  }
  public igual_a(): Igual_aContext {
    return this.getTypedRuleContext(Igual_aContext, 0) as Igual_aContext;
  }
  public termo_constante_list(): Termo_constanteContext[] {
    return this.getTypedRuleContexts(Termo_constanteContext) as Termo_constanteContext[];
  }
  public termo_constante(i: number): Termo_constanteContext {
    return this.getTypedRuleContext(Termo_constanteContext, i) as Termo_constanteContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_variável_global;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterVariável_global) {
       listener.enterVariável_global(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitVariável_global) {
       listener.exitVariável_global(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitVariável_global) {
      return visitor.visitVariável_global(this);
    } else {
      return visitor.visitChildren(this);
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
  public função(): FunçãoContext {
    return this.getTypedRuleContext(FunçãoContext, 0) as FunçãoContext;
  }
  public retroinvocação(): RetroinvocaçãoContext {
    return this.getTypedRuleContext(RetroinvocaçãoContext, 0) as RetroinvocaçãoContext;
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitRotina) {
      return visitor.visitRotina(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class ProcedimentoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public instruções(): InstruçõesContext {
    return this.getTypedRuleContext(InstruçõesContext, 0) as InstruçõesContext;
  }
  public para(): ParaContext {
    return this.getTypedRuleContext(ParaContext, 0) as ParaContext;
  }
  public que_se(): Que_seContext {
    return this.getTypedRuleContext(Que_seContext, 0) as Que_seContext;
  }
  public nome_da_rotina(): Nome_da_rotinaContext {
    return this.getTypedRuleContext(Nome_da_rotinaContext, 0) as Nome_da_rotinaContext;
  }
  public PONTO_E_VÍRGULA(): TerminalNode {
    return this.getToken(PortuguesPuroParser.PONTO_E_VÍRGULA, 0);
  }
  public DOIS_PONTOS(): TerminalNode {
    return this.getToken(PortuguesPuroParser.DOIS_PONTOS, 0);
  }
  public rotina2(): Rotina2Context {
    return this.getTypedRuleContext(Rotina2Context, 0) as Rotina2Context;
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitProcedimento) {
      return visitor.visitProcedimento(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Determine_seContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_determine_se;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterDetermine_se) {
       listener.enterDetermine_se(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitDetermine_se) {
       listener.exitDetermine_se(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitDetermine_se) {
      return visitor.visitDetermine_se(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class DecisorContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public para(): ParaContext {
    return this.getTypedRuleContext(ParaContext, 0) as ParaContext;
  }
  public que_se(): Que_seContext {
    return this.getTypedRuleContext(Que_seContext, 0) as Que_seContext;
  }
  public determine_se(): Determine_seContext {
    return this.getTypedRuleContext(Determine_seContext, 0) as Determine_seContext;
  }
  public nome_da_rotina(): Nome_da_rotinaContext {
    return this.getTypedRuleContext(Nome_da_rotinaContext, 0) as Nome_da_rotinaContext;
  }
  public PONTO_E_VÍRGULA(): TerminalNode {
    return this.getToken(PortuguesPuroParser.PONTO_E_VÍRGULA, 0);
  }
  public função2(): Função2Context {
    return this.getTypedRuleContext(Função2Context, 0) as Função2Context;
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitDecisor) {
      return visitor.visitDecisor(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Função2Context extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_função2;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterFunção2) {
       listener.enterFunção2(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitFunção2) {
       listener.exitFunção2(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitFunção2) {
      return visitor.visitFunção2(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class AtribuaContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_atribua;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterAtribua) {
       listener.enterAtribua(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitAtribua) {
       listener.exitAtribua(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitAtribua) {
      return visitor.visitAtribua(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class FunçãoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public instruções(): InstruçõesContext {
    return this.getTypedRuleContext(InstruçõesContext, 0) as InstruçõesContext;
  }
  public para_list(): ParaContext[] {
    return this.getTypedRuleContexts(ParaContext) as ParaContext[];
  }
  public para(i: number): ParaContext {
    return this.getTypedRuleContext(ParaContext, i) as ParaContext;
  }
  public que_se(): Que_seContext {
    return this.getTypedRuleContext(Que_seContext, 0) as Que_seContext;
  }
  public atribua(): AtribuaContext {
    return this.getTypedRuleContext(AtribuaContext, 0) as AtribuaContext;
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
  public PONTO_E_VÍRGULA(): TerminalNode {
    return this.getToken(PortuguesPuroParser.PONTO_E_VÍRGULA, 0);
  }
  public DOIS_PONTOS(): TerminalNode {
    return this.getToken(PortuguesPuroParser.DOIS_PONTOS, 0);
  }
  public função2(): Função2Context {
    return this.getTypedRuleContext(Função2Context, 0) as Função2Context;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_função;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterFunção) {
       listener.enterFunção(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitFunção) {
       listener.exitFunção(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitFunção) {
      return visitor.visitFunção(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class ParaContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_para;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterPara) {
       listener.enterPara(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitPara) {
       listener.exitPara(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitPara) {
      return visitor.visitPara(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Que_seContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_que_se;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterQue_se) {
       listener.enterQue_se(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitQue_se) {
       listener.exitQue_se(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitQue_se) {
      return visitor.visitQue_se(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Rotina2Context extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_rotina2;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterRotina2) {
       listener.enterRotina2(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitRotina2) {
       listener.exitRotina2(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitRotina2) {
      return visitor.visitRotina2(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class CompativelmenteContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_compativelmente;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterCompativelmente) {
       listener.enterCompativelmente(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitCompativelmente) {
       listener.exitCompativelmente(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitCompativelmente) {
      return visitor.visitCompativelmente(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class RetroinvocaçãoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public instruções(): InstruçõesContext {
    return this.getTypedRuleContext(InstruçõesContext, 0) as InstruçõesContext;
  }
  public para(): ParaContext {
    return this.getTypedRuleContext(ParaContext, 0) as ParaContext;
  }
  public que_se(): Que_seContext {
    return this.getTypedRuleContext(Que_seContext, 0) as Que_seContext;
  }
  public compativelmente(): CompativelmenteContext {
    return this.getTypedRuleContext(CompativelmenteContext, 0) as CompativelmenteContext;
  }
  public nome_da_rotina(): Nome_da_rotinaContext {
    return this.getTypedRuleContext(Nome_da_rotinaContext, 0) as Nome_da_rotinaContext;
  }
  public PONTO_E_VÍRGULA(): TerminalNode {
    return this.getToken(PortuguesPuroParser.PONTO_E_VÍRGULA, 0);
  }
  public DOIS_PONTOS(): TerminalNode {
    return this.getToken(PortuguesPuroParser.DOIS_PONTOS, 0);
  }
  public rotina2(): Rotina2Context {
    return this.getTypedRuleContext(Rotina2Context, 0) as Rotina2Context;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_retroinvocação;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterRetroinvocação) {
       listener.enterRetroinvocação(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitRetroinvocação) {
       listener.exitRetroinvocação(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitRetroinvocação) {
      return visitor.visitRetroinvocação(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Nome_da_rotinaContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public unidade_semântica(): Unidade_semânticaContext {
    return this.getTypedRuleContext(Unidade_semânticaContext, 0) as Unidade_semânticaContext;
  }
  public parâmetro(): ParâmetroContext {
    return this.getTypedRuleContext(ParâmetroContext, 0) as ParâmetroContext;
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitNome_da_rotina) {
      return visitor.visitNome_da_rotina(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Unidade_semânticaContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public palavra(): PalavraContext {
    return this.getTypedRuleContext(PalavraContext, 0) as PalavraContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_unidade_semântica;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterUnidade_semântica) {
       listener.enterUnidade_semântica(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitUnidade_semântica) {
       listener.exitUnidade_semântica(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitUnidade_semântica) {
      return visitor.visitUnidade_semântica(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class ParâmetroContext extends ParserRuleContext {
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
  public denominações(): DenominaçõesContext {
    return this.getTypedRuleContext(DenominaçõesContext, 0) as DenominaçõesContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_parâmetro;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterParâmetro) {
       listener.enterParâmetro(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitParâmetro) {
       listener.exitParâmetro(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitParâmetro) {
      return visitor.visitParâmetro(this);
    } else {
      return visitor.visitChildren(this);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitFrase) {
      return visitor.visitFrase(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class InstruçõesContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public instrução_list(): InstruçãoContext[] {
    return this.getTypedRuleContexts(InstruçãoContext) as InstruçãoContext[];
  }
  public instrução(i: number): InstruçãoContext {
    return this.getTypedRuleContext(InstruçãoContext, i) as InstruçãoContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_instruções;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterInstruções) {
       listener.enterInstruções(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitInstruções) {
       listener.exitInstruções(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitInstruções) {
      return visitor.visitInstruções(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class InstruçãoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public preservação(): PreservaçãoContext {
    return this.getTypedRuleContext(PreservaçãoContext, 0) as PreservaçãoContext;
  }
  public iteração(): IteraçãoContext {
    return this.getTypedRuleContext(IteraçãoContext, 0) as IteraçãoContext;
  }
  public condicional(): CondicionalContext {
    return this.getTypedRuleContext(CondicionalContext, 0) as CondicionalContext;
  }
  public incondicional(): IncondicionalContext {
    return this.getTypedRuleContext(IncondicionalContext, 0) as IncondicionalContext;
  }
  public VÍRGULA(): TerminalNode {
    return this.getToken(PortuguesPuroParser.VÍRGULA, 0);
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_instrução;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterInstrução) {
       listener.enterInstrução(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitInstrução) {
       listener.exitInstrução(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitInstrução) {
      return visitor.visitInstrução(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class PreserveContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_preserve;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterPreserve) {
       listener.enterPreserve(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitPreserve) {
       listener.exitPreserve(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitPreserve) {
      return visitor.visitPreserve(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class PreservaçãoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public preserve(): PreserveContext {
    return this.getTypedRuleContext(PreserveContext, 0) as PreserveContext;
  }
  public parâmetro(): ParâmetroContext {
    return this.getTypedRuleContext(ParâmetroContext, 0) as ParâmetroContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_preservação;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterPreservação) {
       listener.enterPreservação(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitPreservação) {
       listener.exitPreservação(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitPreservação) {
      return visitor.visitPreservação(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class IteraçãoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_iteração;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterIteração) {
       listener.enterIteração(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitIteração) {
       listener.exitIteração(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitIteração) {
      return visitor.visitIteração(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class SeContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_se;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterSe) {
       listener.enterSe(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitSe) {
       listener.exitSe(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitSe) {
      return visitor.visitSe(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class CondicionalContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public se(): SeContext {
    return this.getTypedRuleContext(SeContext, 0) as SeContext;
  }
  public expressão_decisora(): Expressão_decisoraContext {
    return this.getTypedRuleContext(Expressão_decisoraContext, 0) as Expressão_decisoraContext;
  }
  public VÍRGULA(): TerminalNode {
    return this.getToken(PortuguesPuroParser.VÍRGULA, 0);
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
  public PONTO_E_VÍRGULA_list(): TerminalNode[] {
        return this.getTokens(PortuguesPuroParser.PONTO_E_VÍRGULA);
  }
  public PONTO_E_VÍRGULA(i: number): TerminalNode {
    return this.getToken(PortuguesPuroParser.PONTO_E_VÍRGULA, i);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitCondicional) {
      return visitor.visitCondicional(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Expressão_decisoraContext extends ParserRuleContext {
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
  public expressão_decisora(): Expressão_decisoraContext {
    return this.getTypedRuleContext(Expressão_decisoraContext, 0) as Expressão_decisoraContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_expressão_decisora;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterExpressão_decisora) {
       listener.enterExpressão_decisora(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitExpressão_decisora) {
       listener.exitExpressão_decisora(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitExpressão_decisora) {
      return visitor.visitExpressão_decisora(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class IncondicionalContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public interrupção(): InterrupçãoContext {
    return this.getTypedRuleContext(InterrupçãoContext, 0) as InterrupçãoContext;
  }
  public invocação(): InvocaçãoContext {
    return this.getTypedRuleContext(InvocaçãoContext, 0) as InvocaçãoContext;
  }
  public retorno(): RetornoContext {
    return this.getTypedRuleContext(RetornoContext, 0) as RetornoContext;
  }
  public decodificação(): DecodificaçãoContext {
    return this.getTypedRuleContext(DecodificaçãoContext, 0) as DecodificaçãoContext;
  }
  public reiteração(): ReiteraçãoContext {
    return this.getTypedRuleContext(ReiteraçãoContext, 0) as ReiteraçãoContext;
  }
  public indireção(): IndireçãoContext {
    return this.getTypedRuleContext(IndireçãoContext, 0) as IndireçãoContext;
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitIncondicional) {
      return visitor.visitIncondicional(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class InterrupçãoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_interrupção;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterInterrupção) {
       listener.enterInterrupção(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitInterrupção) {
       listener.exitInterrupção(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitInterrupção) {
      return visitor.visitInterrupção(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class InvocaçãoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public invocação_interna(): Invocação_internaContext {
    return this.getTypedRuleContext(Invocação_internaContext, 0) as Invocação_internaContext;
  }
  public invocação_externa(): Invocação_externaContext {
    return this.getTypedRuleContext(Invocação_externaContext, 0) as Invocação_externaContext;
  }
  public invocação_indireta(): Invocação_indiretaContext {
    return this.getTypedRuleContext(Invocação_indiretaContext, 0) as Invocação_indiretaContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_invocação;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterInvocação) {
       listener.enterInvocação(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitInvocação) {
       listener.exitInvocação(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitInvocação) {
      return visitor.visitInvocação(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Invocação_internaContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public unidade_semântica(): Unidade_semânticaContext {
    return this.getTypedRuleContext(Unidade_semânticaContext, 0) as Unidade_semânticaContext;
  }
  public expressão(): ExpressãoContext {
    return this.getTypedRuleContext(ExpressãoContext, 0) as ExpressãoContext;
  }
  public frase(): FraseContext {
    return this.getTypedRuleContext(FraseContext, 0) as FraseContext;
  }
  public qualificador(): QualificadorContext {
    return this.getTypedRuleContext(QualificadorContext, 0) as QualificadorContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_invocação_interna;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterInvocação_interna) {
       listener.enterInvocação_interna(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitInvocação_interna) {
       listener.exitInvocação_interna(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitInvocação_interna) {
      return visitor.visitInvocação_interna(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Invocação_externaContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public processe(): ProcesseContext {
    return this.getTypedRuleContext(ProcesseContext, 0) as ProcesseContext;
  }
  public aspas_duplas_list(): Aspas_duplasContext[] {
    return this.getTypedRuleContexts(Aspas_duplasContext) as Aspas_duplasContext[];
  }
  public aspas_duplas(i: number): Aspas_duplasContext {
    return this.getTypedRuleContext(Aspas_duplasContext, i) as Aspas_duplasContext;
  }
  public nome_da_DLL(): Nome_da_DLLContext {
    return this.getTypedRuleContext(Nome_da_DLLContext, 0) as Nome_da_DLLContext;
  }
  public nome_da_função(): Nome_da_funçãoContext {
    return this.getTypedRuleContext(Nome_da_funçãoContext, 0) as Nome_da_funçãoContext;
  }
  public com(): ComContext {
    return this.getTypedRuleContext(ComContext, 0) as ComContext;
  }
  public expressão_list(): ExpressãoContext[] {
    return this.getTypedRuleContexts(ExpressãoContext) as ExpressãoContext[];
  }
  public expressão(i: number): ExpressãoContext {
    return this.getTypedRuleContext(ExpressãoContext, i) as ExpressãoContext;
  }
  public e_list(): EContext[] {
    return this.getTypedRuleContexts(EContext) as EContext[];
  }
  public e(i: number): EContext {
    return this.getTypedRuleContext(EContext, i) as EContext;
  }
  public retornando(): RetornandoContext {
    return this.getTypedRuleContext(RetornandoContext, 0) as RetornandoContext;
  }
  public termo(): TermoContext {
    return this.getTypedRuleContext(TermoContext, 0) as TermoContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_invocação_externa;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterInvocação_externa) {
       listener.enterInvocação_externa(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitInvocação_externa) {
       listener.exitInvocação_externa(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitInvocação_externa) {
      return visitor.visitInvocação_externa(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Aspas_duplasContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public ASPAS_DUPLAS(): TerminalNode {
    return this.getToken(PortuguesPuroParser.ASPAS_DUPLAS, 0);
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_aspas_duplas;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterAspas_duplas) {
       listener.enterAspas_duplas(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitAspas_duplas) {
       listener.exitAspas_duplas(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitAspas_duplas) {
      return visitor.visitAspas_duplas(this);
    } else {
      return visitor.visitChildren(this);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitNome_da_DLL) {
      return visitor.visitNome_da_DLL(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Nome_da_funçãoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public palavra(): PalavraContext {
    return this.getTypedRuleContext(PalavraContext, 0) as PalavraContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_nome_da_função;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterNome_da_função) {
       listener.enterNome_da_função(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitNome_da_função) {
       listener.exitNome_da_função(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitNome_da_função) {
      return visitor.visitNome_da_função(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class ProcesseContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_processe;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterProcesse) {
       listener.enterProcesse(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitProcesse) {
       listener.exitProcesse(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitProcesse) {
      return visitor.visitProcesse(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class ComContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_com;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterCom) {
       listener.enterCom(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitCom) {
       listener.exitCom(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitCom) {
      return visitor.visitCom(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class EContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_e;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterE) {
       listener.enterE(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitE) {
       listener.exitE(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitE) {
      return visitor.visitE(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class RetornandoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_retornando;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterRetornando) {
       listener.enterRetornando(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitRetornando) {
       listener.exitRetornando(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitRetornando) {
      return visitor.visitRetornando(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Invocação_indiretaContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public processe(): ProcesseContext {
    return this.getTypedRuleContext(ProcesseContext, 0) as ProcesseContext;
  }
  public expressão_list(): ExpressãoContext[] {
    return this.getTypedRuleContexts(ExpressãoContext) as ExpressãoContext[];
  }
  public expressão(i: number): ExpressãoContext {
    return this.getTypedRuleContext(ExpressãoContext, i) as ExpressãoContext;
  }
  public com(): ComContext {
    return this.getTypedRuleContext(ComContext, 0) as ComContext;
  }
  public e_list(): EContext[] {
    return this.getTypedRuleContexts(EContext) as EContext[];
  }
  public e(i: number): EContext {
    return this.getTypedRuleContext(EContext, i) as EContext;
  }
  public retornando(): RetornandoContext {
    return this.getTypedRuleContext(RetornandoContext, 0) as RetornandoContext;
  }
  public termo(): TermoContext {
    return this.getTypedRuleContext(TermoContext, 0) as TermoContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_invocação_indireta;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterInvocação_indireta) {
       listener.enterInvocação_indireta(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitInvocação_indireta) {
       listener.exitInvocação_indireta(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitInvocação_indireta) {
      return visitor.visitInvocação_indireta(this);
    } else {
      return visitor.visitChildren(this);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitRetorno) {
      return visitor.visitRetorno(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class DecodifiqueContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_decodifique;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterDecodifique) {
       listener.enterDecodifique(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitDecodifique) {
       listener.exitDecodifique(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitDecodifique) {
      return visitor.visitDecodifique(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class DecodificaçãoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public decodifique(): DecodifiqueContext {
    return this.getTypedRuleContext(DecodifiqueContext, 0) as DecodifiqueContext;
  }
  public número_hexadecimal(): Número_hexadecimalContext {
    return this.getTypedRuleContext(Número_hexadecimalContext, 0) as Número_hexadecimalContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_decodificação;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterDecodificação) {
       listener.enterDecodificação(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitDecodificação) {
       listener.exitDecodificação(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitDecodificação) {
      return visitor.visitDecodificação(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class AponteContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_aponte;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterAponte) {
       listener.enterAponte(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitAponte) {
       listener.exitAponte(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitAponte) {
      return visitor.visitAponte(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Para_rotinaContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_para_rotina;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterPara_rotina) {
       listener.enterPara_rotina(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitPara_rotina) {
       listener.exitPara_rotina(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitPara_rotina) {
      return visitor.visitPara_rotina(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class IndireçãoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public aponte(): AponteContext {
    return this.getTypedRuleContext(AponteContext, 0) as AponteContext;
  }
  public artigo(): ArtigoContext {
    return this.getTypedRuleContext(ArtigoContext, 0) as ArtigoContext;
  }
  public termo(): TermoContext {
    return this.getTypedRuleContext(TermoContext, 0) as TermoContext;
  }
  public para_rotina(): Para_rotinaContext {
    return this.getTypedRuleContext(Para_rotinaContext, 0) as Para_rotinaContext;
  }
  public unidade_semântica(): Unidade_semânticaContext {
    return this.getTypedRuleContext(Unidade_semânticaContext, 0) as Unidade_semânticaContext;
  }
  public parâmetro(): ParâmetroContext {
    return this.getTypedRuleContext(ParâmetroContext, 0) as ParâmetroContext;
  }
  public frase(): FraseContext {
    return this.getTypedRuleContext(FraseContext, 0) as FraseContext;
  }
  public qualificador(): QualificadorContext {
    return this.getTypedRuleContext(QualificadorContext, 0) as QualificadorContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_indireção;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterIndireção) {
       listener.enterIndireção(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitIndireção) {
       listener.exitIndireção(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitIndireção) {
      return visitor.visitIndireção(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class PushContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_push;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterPush) {
       listener.enterPush(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitPush) {
       listener.exitPush(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitPush) {
      return visitor.visitPush(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class EmpilhamentoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public push(): PushContext {
    return this.getTypedRuleContext(PushContext, 0) as PushContext;
  }
  public expressão(): ExpressãoContext {
    return this.getTypedRuleContext(ExpressãoContext, 0) as ExpressãoContext;
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitEmpilhamento) {
      return visitor.visitEmpilhamento(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class ReiteraçãoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_reiteração;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterReiteração) {
       listener.enterReiteração(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitReiteração) {
       listener.exitReiteração(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitReiteração) {
      return visitor.visitReiteração(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class DigaContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_diga;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterDiga) {
       listener.enterDiga(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitDiga) {
       listener.exitDiga(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitDiga) {
      return visitor.visitDiga(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Retorno_booleanoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public diga(): DigaContext {
    return this.getTypedRuleContext(DigaContext, 0) as DigaContext;
  }
  public booleano(): BooleanoContext {
    return this.getTypedRuleContext(BooleanoContext, 0) as BooleanoContext;
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitRetorno_booleano) {
      return visitor.visitRetorno_booleano(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class ExpressãoContext extends ParserRuleContext {
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
      return PortuguesPuroParser.RULE_expressão;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterExpressão) {
       listener.enterExpressão(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitExpressão) {
       listener.exitExpressão(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitExpressão) {
      return visitor.visitExpressão(this);
    } else {
      return visitor.visitChildren(this);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitOperadores_comuns) {
      return visitor.visitOperadores_comuns(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class BooleanoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_booleano;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterBooleano) {
       listener.enterBooleano(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitBooleano) {
       listener.exitBooleano(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitBooleano) {
      return visitor.visitBooleano(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class NuloContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_nulo;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterNulo) {
       listener.enterNulo(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitNulo) {
       listener.exitNulo(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitNulo) {
      return visitor.visitNulo(this);
    } else {
      return visitor.visitChildren(this);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitTermo_constante) {
      return visitor.visitTermo_constante(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Termo_constante_negativoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public HÍFEN(): TerminalNode {
    return this.getToken(PortuguesPuroParser.HÍFEN, 0);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitTermo_constante_negativo) {
      return visitor.visitTermo_constante_negativo(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Termo_constante_positivoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public SINAL_DE_ADIÇÃO(): TerminalNode {
    return this.getToken(PortuguesPuroParser.SINAL_DE_ADIÇÃO, 0);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitTermo_constante_positivo) {
      return visitor.visitTermo_constante_positivo(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class NúmeroContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public número_decimal(): Número_decimalContext {
    return this.getTypedRuleContext(Número_decimalContext, 0) as Número_decimalContext;
  }
  public número_fracionário(): Número_fracionárioContext {
    return this.getTypedRuleContext(Número_fracionárioContext, 0) as Número_fracionárioContext;
  }
  public número_misto(): Número_mistoContext {
    return this.getTypedRuleContext(Número_mistoContext, 0) as Número_mistoContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_número;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterNúmero) {
       listener.enterNúmero(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitNúmero) {
       listener.exitNúmero(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitNúmero) {
      return visitor.visitNúmero(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class LiteralContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public número(): NúmeroContext {
    return this.getTypedRuleContext(NúmeroContext, 0) as NúmeroContext;
  }
  public nome_do_tipo(): Nome_do_tipoContext {
    return this.getTypedRuleContext(Nome_do_tipoContext, 0) as Nome_do_tipoContext;
  }
  public string_literal(): String_literalContext {
    return this.getTypedRuleContext(String_literalContext, 0) as String_literalContext;
  }
  public número_hexadecimal(): Número_hexadecimalContext {
    return this.getTypedRuleContext(Número_hexadecimalContext, 0) as Número_hexadecimalContext;
  }
  public booleano(): BooleanoContext {
    return this.getTypedRuleContext(BooleanoContext, 0) as BooleanoContext;
  }
  public nulo(): NuloContext {
    return this.getTypedRuleContext(NuloContext, 0) as NuloContext;
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitLiteral) {
      return visitor.visitLiteral(this);
    } else {
      return visitor.visitChildren(this);
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
  public variável_local(): Variável_localContext {
    return this.getTypedRuleContext(Variável_localContext, 0) as Variável_localContext;
  }
  public variável(): VariávelContext {
    return this.getTypedRuleContext(VariávelContext, 0) as VariávelContext;
  }
  public termo_literal(): Termo_literalContext {
    return this.getTypedRuleContext(Termo_literalContext, 0) as Termo_literalContext;
  }
  public como(): ComoContext {
    return this.getTypedRuleContext(ComoContext, 0) as ComoContext;
  }
  public artigo_indefinido(): Artigo_indefinidoContext {
    return this.getTypedRuleContext(Artigo_indefinidoContext, 0) as Artigo_indefinidoContext;
  }
  public nome_do_tipo(): Nome_do_tipoContext {
    return this.getTypedRuleContext(Nome_do_tipoContext, 0) as Nome_do_tipoContext;
  }
  public sinal_de_divisão(): Sinal_de_divisãoContext {
    return this.getTypedRuleContext(Sinal_de_divisãoContext, 0) as Sinal_de_divisãoContext;
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitTermo) {
      return visitor.visitTermo(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Sinal_de_divisãoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public BARRA_INCLINADA(): TerminalNode {
    return this.getToken(PortuguesPuroParser.BARRA_INCLINADA, 0);
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_sinal_de_divisão;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterSinal_de_divisão) {
       listener.enterSinal_de_divisão(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitSinal_de_divisão) {
       listener.exitSinal_de_divisão(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitSinal_de_divisão) {
      return visitor.visitSinal_de_divisão(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class ComoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_como;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterComo) {
       listener.enterComo(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitComo) {
       listener.exitComo(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitComo) {
      return visitor.visitComo(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Termo_negativoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public HÍFEN(): TerminalNode {
    return this.getToken(PortuguesPuroParser.HÍFEN, 0);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitTermo_negativo) {
      return visitor.visitTermo_negativo(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Termo_positivoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public SINAL_DE_ADIÇÃO(): TerminalNode {
    return this.getToken(PortuguesPuroParser.SINAL_DE_ADIÇÃO, 0);
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitTermo_positivo) {
      return visitor.visitTermo_positivo(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Variável_localContext extends ParserRuleContext {
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
  public denominações(): DenominaçõesContext {
    return this.getTypedRuleContext(DenominaçõesContext, 0) as DenominaçõesContext;
  }
  public artigo_definido(): Artigo_definidoContext {
    return this.getTypedRuleContext(Artigo_definidoContext, 0) as Artigo_definidoContext;
  }
  public atribuidores_de_posse(): Atribuidores_de_posseContext {
    return this.getTypedRuleContext(Atribuidores_de_posseContext, 0) as Atribuidores_de_posseContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_variável_local;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterVariável_local) {
       listener.enterVariável_local(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitVariável_local) {
       listener.exitVariável_local(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitVariável_local) {
      return visitor.visitVariável_local(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class VariávelContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public artigo_definido(): Artigo_definidoContext {
    return this.getTypedRuleContext(Artigo_definidoContext, 0) as Artigo_definidoContext;
  }
  public possessivo_português(): Possessivo_portuguêsContext {
    return this.getTypedRuleContext(Possessivo_portuguêsContext, 0) as Possessivo_portuguêsContext;
  }
  public p2(): P2Context {
    return this.getTypedRuleContext(P2Context, 0) as P2Context;
  }
  public nome(): NomeContext {
    return this.getTypedRuleContext(NomeContext, 0) as NomeContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_variável;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterVariável) {
       listener.enterVariável(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitVariável) {
       listener.exitVariável(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitVariável) {
      return visitor.visitVariável(this);
    } else {
      return visitor.visitChildren(this);
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
  public possessivos_inglês(): Possessivos_inglêsContext {
    return this.getTypedRuleContext(Possessivos_inglêsContext, 0) as Possessivos_inglêsContext;
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
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitTermo_literal) {
      return visitor.visitTermo_literal(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class ConteúdoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_conteúdo;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterConteúdo) {
       listener.enterConteúdo(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitConteúdo) {
       listener.exitConteúdo(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitConteúdo) {
      return visitor.visitConteúdo(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class MagnitudeContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_magnitude;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterMagnitude) {
       listener.enterMagnitude(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitMagnitude) {
       listener.exitMagnitude(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitMagnitude) {
      return visitor.visitMagnitude(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class EndereçamentoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_endereçamento;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterEndereçamento) {
       listener.enterEndereçamento(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitEndereçamento) {
       listener.exitEndereçamento(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitEndereçamento) {
      return visitor.visitEndereçamento(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Possessivos_inglêsContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public possessivo_inglês_antigo_list(): Possessivo_inglês_antigoContext[] {
    return this.getTypedRuleContexts(Possessivo_inglês_antigoContext) as Possessivo_inglês_antigoContext[];
  }
  public possessivo_inglês_antigo(i: number): Possessivo_inglês_antigoContext {
    return this.getTypedRuleContext(Possessivo_inglês_antigoContext, i) as Possessivo_inglês_antigoContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_possessivos_inglês;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterPossessivos_inglês) {
       listener.enterPossessivos_inglês(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitPossessivos_inglês) {
       listener.exitPossessivos_inglês(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitPossessivos_inglês) {
      return visitor.visitPossessivos_inglês(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Possessivo_inglês_antigoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public apóstrofo(): ApóstrofoContext {
    return this.getTypedRuleContext(ApóstrofoContext, 0) as ApóstrofoContext;
  }
  public nome(): NomeContext {
    return this.getTypedRuleContext(NomeContext, 0) as NomeContext;
  }
  public função(): FunçãoContext {
    return this.getTypedRuleContext(FunçãoContext, 0) as FunçãoContext;
  }
  public conteúdo(): ConteúdoContext {
    return this.getTypedRuleContext(ConteúdoContext, 0) as ConteúdoContext;
  }
  public magnitude(): MagnitudeContext {
    return this.getTypedRuleContext(MagnitudeContext, 0) as MagnitudeContext;
  }
  public endereçamento(): EndereçamentoContext {
    return this.getTypedRuleContext(EndereçamentoContext, 0) as EndereçamentoContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_possessivo_inglês_antigo;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterPossessivo_inglês_antigo) {
       listener.enterPossessivo_inglês_antigo(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitPossessivo_inglês_antigo) {
       listener.exitPossessivo_inglês_antigo(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitPossessivo_inglês_antigo) {
      return visitor.visitPossessivo_inglês_antigo(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class Possessivo_portuguêsContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
  public p2(): P2Context {
    return this.getTypedRuleContext(P2Context, 0) as P2Context;
  }
  public nome(): NomeContext {
    return this.getTypedRuleContext(NomeContext, 0) as NomeContext;
  }
  public função(): FunçãoContext {
    return this.getTypedRuleContext(FunçãoContext, 0) as FunçãoContext;
  }
  public conteúdo(): ConteúdoContext {
    return this.getTypedRuleContext(ConteúdoContext, 0) as ConteúdoContext;
  }
  public magnitude(): MagnitudeContext {
    return this.getTypedRuleContext(MagnitudeContext, 0) as MagnitudeContext;
  }
  public endereçamento(): EndereçamentoContext {
    return this.getTypedRuleContext(EndereçamentoContext, 0) as EndereçamentoContext;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_possessivo_português;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterPossessivo_português) {
       listener.enterPossessivo_português(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitPossessivo_português) {
       listener.exitPossessivo_português(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitPossessivo_português) {
      return visitor.visitPossessivo_português(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}


export class ApóstrofoContext extends ParserRuleContext {
  constructor(parser?: PortuguesPuroParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState);
      this.parser = parser;
  }
    public get ruleIndex(): number {
      return PortuguesPuroParser.RULE_apóstrofo;
  }
  public enterRule(listener: PortuguesPuroListener): void {
      if(listener.enterApóstrofo) {
       listener.enterApóstrofo(this);
    }
  }
  public exitRule(listener: PortuguesPuroListener): void {
      if(listener.exitApóstrofo) {
       listener.exitApóstrofo(this);
    }
  }
  // @Override
  public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
    if (visitor.visitApóstrofo) {
      return visitor.visitApóstrofo(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
