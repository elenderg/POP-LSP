// Generated from PortuguesPuro.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { PortuguesPuroListener } from "./PortuguesPuroListener";
import { PortuguesPuroVisitor } from "./PortuguesPuroVisitor";


export class PortuguesPuroParser extends Parser {
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
	public static readonly DIGITO = 183;
	public static readonly SIMBOLO = 184;
	public static readonly ESPACO = 185;
	public static readonly APOSTROFO = 186;
	public static readonly ASPAS_DUPLAS = 187;
	public static readonly HIFEN = 188;
	public static readonly CIFRAO = 189;
	public static readonly ESPACO_EM_BRANCO = 190;
	public static readonly ESPACO_RIGIDO = 191;
	public static readonly QUEBRA_DE_LINHA = 192;
	public static readonly BARRA_INCLINADA = 193;
	public static readonly BARRA_INVERTIDA = 194;
	public static readonly SINAL_DE_ADICAO = 195;
	public static readonly PONTO = 196;
	public static readonly VIRGULA = 197;
	public static readonly PONTO_E_VIRGULA = 198;
	public static readonly DOIS_PONTOS = 199;
	public static readonly ABRE_PARENTESES = 200;
	public static readonly FECHA_PARENTESES = 201;
	public static readonly ABRE_COLCHETES = 202;
	public static readonly FECHA_COLCHETES = 203;
	public static readonly CARACTERES_IMPRIMIVEIS = 204;
	public static readonly CARACTERES_DE_CONTROLE = 205;
	public static readonly RULE_regra_espaco = 0;
	public static readonly RULE_palavra = 1;
	public static readonly RULE_possessivo_ingl�s = 2;
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
	public static readonly RULE_bytes = 43;
	public static readonly RULE_refer�ncia = 44;
	public static readonly RULE_campo = 45;
	public static readonly RULE_pausa = 46;
	public static readonly RULE_pausas = 47;
	public static readonly RULE_conjuncoes = 48;
	public static readonly RULE_preposicoes = 49;
	public static readonly RULE_� = 50;
	public static readonly RULE_estrutura = 51;
	public static readonly RULE_igual_a = 52;
	public static readonly RULE_variavel_global = 53;
	public static readonly RULE_rotina = 54;
	public static readonly RULE_procedimento = 55;
	public static readonly RULE_determine_se = 56;
	public static readonly RULE_decisor = 57;
	public static readonly RULE_fun��o2 = 58;
	public static readonly RULE_atribua = 59;
	public static readonly RULE_funcao = 60;
	public static readonly RULE_para = 61;
	public static readonly RULE_que_se = 62;
	public static readonly RULE_rotina2 = 63;
	public static readonly RULE_compativelmente = 64;
	public static readonly RULE_retroinvocacao = 65;
	public static readonly RULE_nome_da_rotina = 66;
	public static readonly RULE_unidade_semantica = 67;
	public static readonly RULE_parametro = 68;
	public static readonly RULE_frase = 69;
	public static readonly RULE_instrucoes = 70;
	public static readonly RULE_instrucao = 71;
	public static readonly RULE_preserve = 72;
	public static readonly RULE_preservacao = 73;
	public static readonly RULE_iteracao = 74;
	public static readonly RULE_se = 75;
	public static readonly RULE_condicional = 76;
	public static readonly RULE_expressao_decisora = 77;
	public static readonly RULE_incondicional = 78;
	public static readonly RULE_interrupcao = 79;
	public static readonly RULE_invocacao = 80;
	public static readonly RULE_invocacao_interna = 81;
	public static readonly RULE_invocacao_externa = 82;
	public static readonly RULE_aspas_duplas = 83;
	public static readonly RULE_nome_da_DLL = 84;
	public static readonly RULE_nome_da_funcao = 85;
	public static readonly RULE_processe = 86;
	public static readonly RULE_com = 87;
	public static readonly RULE_e = 88;
	public static readonly RULE_retornando = 89;
	public static readonly RULE_invocacao_indireta = 90;
	public static readonly RULE_retorno = 91;
	public static readonly RULE_decodifique = 92;
	public static readonly RULE_decodificacao = 93;
	public static readonly RULE_aponte = 94;
	public static readonly RULE_para_rotina = 95;
	public static readonly RULE_indirecao = 96;
	public static readonly RULE_push = 97;
	public static readonly RULE_empilhamento = 98;
	public static readonly RULE_reiteracao = 99;
	public static readonly RULE_diga = 100;
	public static readonly RULE_retorno_booleano = 101;
	public static readonly RULE_express�o = 102;
	public static readonly RULE_operadores_comuns = 103;
	public static readonly RULE_booleano = 104;
	public static readonly RULE_nulo = 105;
	public static readonly RULE_termo_constante = 106;
	public static readonly RULE_termo_constante_negativo = 107;
	public static readonly RULE_termo_constante_positivo = 108;
	public static readonly RULE_numero = 109;
	public static readonly RULE_literal = 110;
	public static readonly RULE_termo = 111;
	public static readonly RULE_sinal_de_divis�o = 112;
	public static readonly RULE_como = 113;
	public static readonly RULE_termo_negativo = 114;
	public static readonly RULE_termo_positivo = 115;
	public static readonly RULE_variavel_local = 116;
	public static readonly RULE_variavel = 117;
	public static readonly RULE_termo_literal = 118;
	public static readonly RULE_conte�do = 119;
	public static readonly RULE_magnitude = 120;
	public static readonly RULE_endere�amento = 121;
	public static readonly RULE_possessivos_ingl�s = 122;
	public static readonly RULE_possessivo_ingl�s_antigo = 123;
	public static readonly RULE_possessivo_portugu�s = 124;
	public static readonly RULE_apostrofo = 125;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"regra_espaco", "palavra", "possessivo_ingl�s", "artigo", "artigo_definido", 
		"artigo_indefinido", "adjacentes", "abrangentes", "contracoes", "atribuidores_de_posse", 
		"p1", "p2", "operadores_de_comparacao", "palavras_reservadas", "denominacoes", 
		"verbos", "caracteres_ignoraveis", "comentario", "comentario_de_linha", 
		"comentario_de_bloco", "token", "aglomerado", "caractere_aglomeravel", 
		"iniciador_de_aglomerado", "possessivo_novo", "qualificador", "caractere_nao_aglomeravel", 
		"sinal_de_pontuacao", "simbolos_especiais", "noise", "numero_inteiro", 
		"numero_decimal", "numero_fracionario", "numero_misto", "numero_hexadecimal", 
		"string_literal", "programa", "tipos_primitivos", "tipo", "nome", "nome_do_tipo", 
		"informacao_opcional", "campos", "bytes", "refer�ncia", "campo", "pausa", 
		"pausas", "conjuncoes", "preposicoes", "�", "estrutura", "igual_a", "variavel_global", 
		"rotina", "procedimento", "determine_se", "decisor", "fun��o2", "atribua", 
		"funcao", "para", "que_se", "rotina2", "compativelmente", "retroinvocacao", 
		"nome_da_rotina", "unidade_semantica", "parametro", "frase", "instrucoes", 
		"instrucao", "preserve", "preservacao", "iteracao", "se", "condicional", 
		"expressao_decisora", "incondicional", "interrupcao", "invocacao", "invocacao_interna", 
		"invocacao_externa", "aspas_duplas", "nome_da_DLL", "nome_da_funcao", 
		"processe", "com", "e", "retornando", "invocacao_indireta", "retorno", 
		"decodifique", "decodificacao", "aponte", "para_rotina", "indirecao", 
		"push", "empilhamento", "reiteracao", "diga", "retorno_booleano", "express�o", 
		"operadores_comuns", "booleano", "nulo", "termo_constante", "termo_constante_negativo", 
		"termo_constante_positivo", "numero", "literal", "termo", "sinal_de_divis�o", 
		"como", "termo_negativo", "termo_positivo", "variavel_local", "variavel", 
		"termo_literal", "conte�do", "magnitude", "endere�amento", "possessivos_ingl�s", 
		"possessivo_ingl�s_antigo", "possessivo_portugu�s", "apostrofo",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "' '", "'o'", "'a'", "'os'", "'as'", "'um'", "'uma'", "'uns'", 
		"'umas'", "'este'", "'esta'", "'estes'", "'estas'", "'esse'", "'essa'", 
		"'esses'", "'essas'", "'ao'", "'\uFFFD'", "'aos'", "'\uFFFDs'", "'no'", 
		"'na'", "'nos'", "'nas'", "'pelo'", "'pela'", "'pelos'", "'pelas'", "'num'", 
		"'numa'", "'nuns'", "'numas'", "'dum'", "'duma'", "'duns'", "'dumas'", 
		"'desse'", "'dessa'", "'desses'", "'dessas'", "'deste'", "'desta'", "'destes'", 
		"'destas'", "'igual a'", "'diferente de'", "'maior que'", "'maior do que'", 
		"'maior ou igual a'", "'menor que'", "'menor do que'", "'menor ou igual a'", 
		"'Se'", "'Itere'", "'Reitere'", "'Pare'", "'Retorne'", "'Preserve'", "'Diga'", 
		"'sim'", "'n\uFFFDo'", "'original'", "'Decodifique'", "'Processe'", "'retornando'", 
		"'Push'", "'Pop'", "'nulo'", "'vazio'", "'inexistente'", "'denominado'", 
		"'denominada'", "'denominados'", "'denominadas'", "'chamado'", "'chamada'", 
		"'chamados'", "'chamadas'", "'est\uFFFD'", "'estiver'", "'for'", "'forem'", 
		"'s\uFFFDo'", "'est\uFFFDo'", "'estiverem'", "'ser'", "'serem'", "'estar'", 
		"'poder'", "'puder'", "'foi'", "'estamos'", "'h\uFFFD'", "'pode'", "'existe'", 
		"'existir'", "'cont\uFFFDm'", "'contiver'", "'possui'", "'possuir'", "'~'", 
		"'@'", "'#'", "'%'", "'_'", "'&'", "'!'", "'?'", "'|'", "'*'", "'^'", 
		"'<'", "'>'", "'{'", "'}'", "'byte'", "'caractere'", "'word'", "'n\uFFFDmero'", 
		"'sinalizador'", "'ponteiro'", "'estrutura'", "'string'", "'subtexto'", 
		"'texto hexadecimal'", "'lista'", "'lista estruturada'", "'listas'", "'propor\uFFFD\uFFFDo'", 
		"'fra\uFFFD\uFFFDo'", "'numerador'", "'denominador'", "'bytes'", "'(refer\uFFFDncia)'", 
		"'sob'", "'e'", "'ou'", "'nem'", "'usando'", "'com'", "'por'", "'contendo'", 
		"'desde'", "'entre'", "'sobre'", "'cima'", "'embaixo'", "'abaixo'", "'antes'", 
		"'depois'", "'ap\uFFFDs'", "'cerca'", "'pr\uFFFDximo'", "'at\uFFFD'", 
		"'aproximadamente'", "'como'", "'determine se'", "'Fun\uFFFD\uFFFDo'", 
		"'atribua'", "'para'", "'que se'", "'Rotina'", "'compativelmente'", "'Itere.'", 
		"'Aponte'", "'para a rotina'", "'Empilhe'", "'mais'", "'menos'", "'vezes'", 
		"'multiplicado por'", "'dividido por'", "'junto com'", "'seguido de'", 
		"'acompanhado de'", "'tal como'", "'conte\uFFFDdo'", "'magnitude'", "'endere\uFFFDamento'", 
		"'''", undefined, undefined, undefined, undefined, "'''", "'\\'", "'-'", 
		"'$'", undefined, "'\u00A0'", undefined, "'/'", "'\\'", "'+'", "'.'", 
		"','", "';'", "':'", "'('", "')'", "'['", "']'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		"LETRA", "DIGITO", "SIMBOLO", "ESPACO", "APOSTROFO", "ASPAS_DUPLAS", "HIFEN", 
		"CIFRAO", "ESPACO_EM_BRANCO", "ESPACO_RIGIDO", "QUEBRA_DE_LINHA", "BARRA_INCLINADA", 
		"BARRA_INVERTIDA", "SINAL_DE_ADICAO", "PONTO", "VIRGULA", "PONTO_E_VIRGULA", 
		"DOIS_PONTOS", "ABRE_PARENTESES", "FECHA_PARENTESES", "ABRE_COLCHETES", 
		"FECHA_COLCHETES", "CARACTERES_IMPRIMIVEIS", "CARACTERES_DE_CONTROLE",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(PortuguesPuroParser._LITERAL_NAMES, PortuguesPuroParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return PortuguesPuroParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "PortuguesPuro.g4"; }

	// @Override
	public get ruleNames(): string[] { return PortuguesPuroParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return PortuguesPuroParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(PortuguesPuroParser._ATN, this);
	}
	// @RuleVersion(0)
	public regra_espaco(): Regra_espacoContext {
		let _localctx: Regra_espacoContext = new Regra_espacoContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, PortuguesPuroParser.RULE_regra_espaco);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 252;
			this.match(PortuguesPuroParser.T__0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public palavra(): PalavraContext {
		let _localctx: PalavraContext = new PalavraContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, PortuguesPuroParser.RULE_palavra);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
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
					this.match(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 257;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 0, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public possessivo_ingl�s(): Possessivo_ingl�sContext {
		let _localctx: Possessivo_ingl�sContext = new Possessivo_ingl�sContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, PortuguesPuroParser.RULE_possessivo_ingl�s);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 259;
			this.palavra();
			this.state = 260;
			this.match(PortuguesPuroParser.APOSTROFO);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public artigo(): ArtigoContext {
		let _localctx: ArtigoContext = new ArtigoContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, PortuguesPuroParser.RULE_artigo);
		try {
			this.state = 264;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PortuguesPuroParser.T__1:
			case PortuguesPuroParser.T__2:
			case PortuguesPuroParser.T__3:
			case PortuguesPuroParser.T__4:
			case PortuguesPuroParser.T__9:
			case PortuguesPuroParser.T__10:
			case PortuguesPuroParser.T__11:
			case PortuguesPuroParser.T__12:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 262;
				this.artigo_definido();
				}
				break;
			case PortuguesPuroParser.T__5:
			case PortuguesPuroParser.T__6:
			case PortuguesPuroParser.T__7:
			case PortuguesPuroParser.T__8:
			case PortuguesPuroParser.T__13:
			case PortuguesPuroParser.T__14:
			case PortuguesPuroParser.T__15:
			case PortuguesPuroParser.T__16:
				this.enterOuterAlt(_localctx, 2);
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public artigo_definido(): Artigo_definidoContext {
		let _localctx: Artigo_definidoContext = new Artigo_definidoContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, PortuguesPuroParser.RULE_artigo_definido);
		try {
			this.state = 271;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PortuguesPuroParser.T__1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 266;
				this.match(PortuguesPuroParser.T__1);
				}
				break;
			case PortuguesPuroParser.T__2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 267;
				this.match(PortuguesPuroParser.T__2);
				}
				break;
			case PortuguesPuroParser.T__3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 268;
				this.match(PortuguesPuroParser.T__3);
				}
				break;
			case PortuguesPuroParser.T__4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 269;
				this.match(PortuguesPuroParser.T__4);
				}
				break;
			case PortuguesPuroParser.T__9:
			case PortuguesPuroParser.T__10:
			case PortuguesPuroParser.T__11:
			case PortuguesPuroParser.T__12:
				this.enterOuterAlt(_localctx, 5);
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public artigo_indefinido(): Artigo_indefinidoContext {
		let _localctx: Artigo_indefinidoContext = new Artigo_indefinidoContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, PortuguesPuroParser.RULE_artigo_indefinido);
		try {
			this.state = 278;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PortuguesPuroParser.T__5:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 273;
				this.match(PortuguesPuroParser.T__5);
				}
				break;
			case PortuguesPuroParser.T__6:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 274;
				this.match(PortuguesPuroParser.T__6);
				}
				break;
			case PortuguesPuroParser.T__7:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 275;
				this.match(PortuguesPuroParser.T__7);
				}
				break;
			case PortuguesPuroParser.T__8:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 276;
				this.match(PortuguesPuroParser.T__8);
				}
				break;
			case PortuguesPuroParser.T__13:
			case PortuguesPuroParser.T__14:
			case PortuguesPuroParser.T__15:
			case PortuguesPuroParser.T__16:
				this.enterOuterAlt(_localctx, 5);
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public adjacentes(): AdjacentesContext {
		let _localctx: AdjacentesContext = new AdjacentesContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, PortuguesPuroParser.RULE_adjacentes);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 280;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << PortuguesPuroParser.T__9) | (1 << PortuguesPuroParser.T__10) | (1 << PortuguesPuroParser.T__11) | (1 << PortuguesPuroParser.T__12))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public abrangentes(): AbrangentesContext {
		let _localctx: AbrangentesContext = new AbrangentesContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, PortuguesPuroParser.RULE_abrangentes);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 282;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << PortuguesPuroParser.T__13) | (1 << PortuguesPuroParser.T__14) | (1 << PortuguesPuroParser.T__15) | (1 << PortuguesPuroParser.T__16))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public contracoes(): ContracoesContext {
		let _localctx: ContracoesContext = new ContracoesContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, PortuguesPuroParser.RULE_contracoes);
		try {
			this.state = 303;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PortuguesPuroParser.T__17:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 284;
				this.match(PortuguesPuroParser.T__17);
				}
				break;
			case PortuguesPuroParser.T__18:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 285;
				this.match(PortuguesPuroParser.T__18);
				}
				break;
			case PortuguesPuroParser.T__19:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 286;
				this.match(PortuguesPuroParser.T__19);
				}
				break;
			case PortuguesPuroParser.T__20:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 287;
				this.match(PortuguesPuroParser.T__20);
				}
				break;
			case PortuguesPuroParser.T__21:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 288;
				this.match(PortuguesPuroParser.T__21);
				}
				break;
			case PortuguesPuroParser.T__22:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 289;
				this.match(PortuguesPuroParser.T__22);
				}
				break;
			case PortuguesPuroParser.T__23:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 290;
				this.match(PortuguesPuroParser.T__23);
				}
				break;
			case PortuguesPuroParser.T__24:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 291;
				this.match(PortuguesPuroParser.T__24);
				}
				break;
			case PortuguesPuroParser.T__25:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 292;
				this.match(PortuguesPuroParser.T__25);
				}
				break;
			case PortuguesPuroParser.T__26:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 293;
				this.match(PortuguesPuroParser.T__26);
				}
				break;
			case PortuguesPuroParser.T__27:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 294;
				this.match(PortuguesPuroParser.T__27);
				}
				break;
			case PortuguesPuroParser.T__28:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 295;
				this.match(PortuguesPuroParser.T__28);
				}
				break;
			case PortuguesPuroParser.T__29:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 296;
				this.match(PortuguesPuroParser.T__29);
				}
				break;
			case PortuguesPuroParser.T__30:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 297;
				this.match(PortuguesPuroParser.T__30);
				}
				break;
			case PortuguesPuroParser.T__31:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 298;
				this.match(PortuguesPuroParser.T__31);
				}
				break;
			case PortuguesPuroParser.T__32:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 299;
				this.match(PortuguesPuroParser.T__32);
				}
				break;
			case PortuguesPuroParser.T__33:
			case PortuguesPuroParser.T__34:
			case PortuguesPuroParser.T__35:
			case PortuguesPuroParser.T__36:
				this.enterOuterAlt(_localctx, 17);
				{
				this.state = 300;
				this.atribuidores_de_posse();
				}
				break;
			case PortuguesPuroParser.T__37:
			case PortuguesPuroParser.T__38:
			case PortuguesPuroParser.T__39:
			case PortuguesPuroParser.T__40:
				this.enterOuterAlt(_localctx, 18);
				{
				this.state = 301;
				this.p1();
				}
				break;
			case PortuguesPuroParser.T__41:
			case PortuguesPuroParser.T__42:
			case PortuguesPuroParser.T__43:
			case PortuguesPuroParser.T__44:
				this.enterOuterAlt(_localctx, 19);
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public atribuidores_de_posse(): Atribuidores_de_posseContext {
		let _localctx: Atribuidores_de_posseContext = new Atribuidores_de_posseContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, PortuguesPuroParser.RULE_atribuidores_de_posse);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 305;
			_la = this._input.LA(1);
			if (!(((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (PortuguesPuroParser.T__33 - 34)) | (1 << (PortuguesPuroParser.T__34 - 34)) | (1 << (PortuguesPuroParser.T__35 - 34)) | (1 << (PortuguesPuroParser.T__36 - 34)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public p1(): P1Context {
		let _localctx: P1Context = new P1Context(this._ctx, this.state);
		this.enterRule(_localctx, 20, PortuguesPuroParser.RULE_p1);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 307;
			_la = this._input.LA(1);
			if (!(((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & ((1 << (PortuguesPuroParser.T__37 - 38)) | (1 << (PortuguesPuroParser.T__38 - 38)) | (1 << (PortuguesPuroParser.T__39 - 38)) | (1 << (PortuguesPuroParser.T__40 - 38)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public p2(): P2Context {
		let _localctx: P2Context = new P2Context(this._ctx, this.state);
		this.enterRule(_localctx, 22, PortuguesPuroParser.RULE_p2);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 309;
			_la = this._input.LA(1);
			if (!(((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & ((1 << (PortuguesPuroParser.T__41 - 42)) | (1 << (PortuguesPuroParser.T__42 - 42)) | (1 << (PortuguesPuroParser.T__43 - 42)) | (1 << (PortuguesPuroParser.T__44 - 42)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operadores_de_comparacao(): Operadores_de_comparacaoContext {
		let _localctx: Operadores_de_comparacaoContext = new Operadores_de_comparacaoContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, PortuguesPuroParser.RULE_operadores_de_comparacao);
		try {
			this.state = 320;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PortuguesPuroParser.EOF:
				this.enterOuterAlt(_localctx, 1);
				// tslint:disable-next-line:no-empty
				{
				}
				break;
			case PortuguesPuroParser.T__45:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 312;
				this.match(PortuguesPuroParser.T__45);
				}
				break;
			case PortuguesPuroParser.T__46:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 313;
				this.match(PortuguesPuroParser.T__46);
				}
				break;
			case PortuguesPuroParser.T__47:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 314;
				this.match(PortuguesPuroParser.T__47);
				}
				break;
			case PortuguesPuroParser.T__48:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 315;
				this.match(PortuguesPuroParser.T__48);
				}
				break;
			case PortuguesPuroParser.T__49:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 316;
				this.match(PortuguesPuroParser.T__49);
				}
				break;
			case PortuguesPuroParser.T__50:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 317;
				this.match(PortuguesPuroParser.T__50);
				}
				break;
			case PortuguesPuroParser.T__51:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 318;
				this.match(PortuguesPuroParser.T__51);
				}
				break;
			case PortuguesPuroParser.T__52:
				this.enterOuterAlt(_localctx, 9);
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public palavras_reservadas(): Palavras_reservadasContext {
		let _localctx: Palavras_reservadasContext = new Palavras_reservadasContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, PortuguesPuroParser.RULE_palavras_reservadas);
		try {
			this.state = 341;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PortuguesPuroParser.T__53:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 322;
				this.match(PortuguesPuroParser.T__53);
				}
				break;
			case PortuguesPuroParser.T__54:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 323;
				this.match(PortuguesPuroParser.T__54);
				}
				break;
			case PortuguesPuroParser.T__55:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 324;
				this.match(PortuguesPuroParser.T__55);
				}
				break;
			case PortuguesPuroParser.T__56:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 325;
				this.match(PortuguesPuroParser.T__56);
				}
				break;
			case PortuguesPuroParser.T__57:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 326;
				this.match(PortuguesPuroParser.T__57);
				}
				break;
			case PortuguesPuroParser.T__58:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 327;
				this.match(PortuguesPuroParser.T__58);
				}
				break;
			case PortuguesPuroParser.T__59:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 328;
				this.match(PortuguesPuroParser.T__59);
				}
				break;
			case PortuguesPuroParser.T__60:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 329;
				this.match(PortuguesPuroParser.T__60);
				}
				break;
			case PortuguesPuroParser.T__61:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 330;
				this.match(PortuguesPuroParser.T__61);
				}
				break;
			case PortuguesPuroParser.T__62:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 331;
				this.match(PortuguesPuroParser.T__62);
				}
				break;
			case PortuguesPuroParser.T__63:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 332;
				this.match(PortuguesPuroParser.T__63);
				}
				break;
			case PortuguesPuroParser.T__64:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 333;
				this.match(PortuguesPuroParser.T__64);
				}
				break;
			case PortuguesPuroParser.T__65:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 334;
				this.match(PortuguesPuroParser.T__65);
				}
				break;
			case PortuguesPuroParser.T__66:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 335;
				this.match(PortuguesPuroParser.T__66);
				}
				break;
			case PortuguesPuroParser.T__67:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 336;
				this.match(PortuguesPuroParser.T__67);
				}
				break;
			case PortuguesPuroParser.T__68:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 337;
				this.match(PortuguesPuroParser.T__68);
				}
				break;
			case PortuguesPuroParser.T__69:
				this.enterOuterAlt(_localctx, 17);
				{
				this.state = 338;
				this.match(PortuguesPuroParser.T__69);
				}
				break;
			case PortuguesPuroParser.T__70:
				this.enterOuterAlt(_localctx, 18);
				{
				this.state = 339;
				this.match(PortuguesPuroParser.T__70);
				}
				break;
			case PortuguesPuroParser.T__71:
			case PortuguesPuroParser.T__72:
			case PortuguesPuroParser.T__73:
			case PortuguesPuroParser.T__74:
			case PortuguesPuroParser.T__75:
			case PortuguesPuroParser.T__76:
			case PortuguesPuroParser.T__77:
			case PortuguesPuroParser.T__78:
				this.enterOuterAlt(_localctx, 19);
				{
				this.state = 340;
				this.denominacoes();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public denominacoes(): DenominacoesContext {
		let _localctx: DenominacoesContext = new DenominacoesContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, PortuguesPuroParser.RULE_denominacoes);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 343;
			_la = this._input.LA(1);
			if (!(((((_la - 72)) & ~0x1F) === 0 && ((1 << (_la - 72)) & ((1 << (PortuguesPuroParser.T__71 - 72)) | (1 << (PortuguesPuroParser.T__72 - 72)) | (1 << (PortuguesPuroParser.T__73 - 72)) | (1 << (PortuguesPuroParser.T__74 - 72)) | (1 << (PortuguesPuroParser.T__75 - 72)) | (1 << (PortuguesPuroParser.T__76 - 72)) | (1 << (PortuguesPuroParser.T__77 - 72)) | (1 << (PortuguesPuroParser.T__78 - 72)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public verbos(): VerbosContext {
		let _localctx: VerbosContext = new VerbosContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, PortuguesPuroParser.RULE_verbos);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 345;
			_la = this._input.LA(1);
			if (!(_la === PortuguesPuroParser.T__18 || ((((_la - 80)) & ~0x1F) === 0 && ((1 << (_la - 80)) & ((1 << (PortuguesPuroParser.T__79 - 80)) | (1 << (PortuguesPuroParser.T__80 - 80)) | (1 << (PortuguesPuroParser.T__81 - 80)) | (1 << (PortuguesPuroParser.T__82 - 80)) | (1 << (PortuguesPuroParser.T__83 - 80)) | (1 << (PortuguesPuroParser.T__84 - 80)) | (1 << (PortuguesPuroParser.T__85 - 80)) | (1 << (PortuguesPuroParser.T__86 - 80)) | (1 << (PortuguesPuroParser.T__87 - 80)) | (1 << (PortuguesPuroParser.T__88 - 80)) | (1 << (PortuguesPuroParser.T__89 - 80)) | (1 << (PortuguesPuroParser.T__90 - 80)) | (1 << (PortuguesPuroParser.T__91 - 80)) | (1 << (PortuguesPuroParser.T__92 - 80)) | (1 << (PortuguesPuroParser.T__93 - 80)) | (1 << (PortuguesPuroParser.T__94 - 80)) | (1 << (PortuguesPuroParser.T__95 - 80)) | (1 << (PortuguesPuroParser.T__96 - 80)) | (1 << (PortuguesPuroParser.T__97 - 80)) | (1 << (PortuguesPuroParser.T__98 - 80)) | (1 << (PortuguesPuroParser.T__99 - 80)) | (1 << (PortuguesPuroParser.T__100 - 80)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public caracteres_ignoraveis(): Caracteres_ignoraveisContext {
		let _localctx: Caracteres_ignoraveisContext = new Caracteres_ignoraveisContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, PortuguesPuroParser.RULE_caracteres_ignoraveis);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 347;
			_la = this._input.LA(1);
			if (!(((((_la - 190)) & ~0x1F) === 0 && ((1 << (_la - 190)) & ((1 << (PortuguesPuroParser.ESPACO_EM_BRANCO - 190)) | (1 << (PortuguesPuroParser.ESPACO_RIGIDO - 190)) | (1 << (PortuguesPuroParser.CARACTERES_DE_CONTROLE - 190)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public comentario(): ComentarioContext {
		let _localctx: ComentarioContext = new ComentarioContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, PortuguesPuroParser.RULE_comentario);
		try {
			this.state = 351;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PortuguesPuroParser.BARRA_INVERTIDA:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 349;
				this.comentario_de_linha();
				}
				break;
			case PortuguesPuroParser.ABRE_COLCHETES:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 350;
				this.comentario_de_bloco();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public comentario_de_linha(): Comentario_de_linhaContext {
		let _localctx: Comentario_de_linhaContext = new Comentario_de_linhaContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, PortuguesPuroParser.RULE_comentario_de_linha);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 353;
			this.match(PortuguesPuroParser.BARRA_INVERTIDA);
			this.state = 357;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === PortuguesPuroParser.CARACTERES_IMPRIMIVEIS) {
				{
				{
				this.state = 354;
				this.match(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public comentario_de_bloco(): Comentario_de_blocoContext {
		let _localctx: Comentario_de_blocoContext = new Comentario_de_blocoContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, PortuguesPuroParser.RULE_comentario_de_bloco);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 362;
			this.match(PortuguesPuroParser.ABRE_COLCHETES);
			this.state = 366;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === PortuguesPuroParser.CARACTERES_IMPRIMIVEIS) {
				{
				{
				this.state = 363;
				this.match(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public token(): TokenContext {
		let _localctx: TokenContext = new TokenContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, PortuguesPuroParser.RULE_token);
		try {
			this.state = 375;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PortuguesPuroParser.T__101:
			case PortuguesPuroParser.T__102:
			case PortuguesPuroParser.T__103:
			case PortuguesPuroParser.T__104:
			case PortuguesPuroParser.T__105:
			case PortuguesPuroParser.T__106:
			case PortuguesPuroParser.LETRA:
			case PortuguesPuroParser.DIGITO:
			case PortuguesPuroParser.APOSTROFO:
			case PortuguesPuroParser.CIFRAO:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 371;
				this.aglomerado();
				}
				break;
			case PortuguesPuroParser.CARACTERES_IMPRIMIVEIS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 372;
				this.possessivo_ingl�s();
				}
				break;
			case PortuguesPuroParser.ABRE_PARENTESES:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 373;
				this.qualificador();
				}
				break;
			case PortuguesPuroParser.ASPAS_DUPLAS:
				this.enterOuterAlt(_localctx, 4);
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public aglomerado(): AglomeradoContext {
		let _localctx: AglomeradoContext = new AglomeradoContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, PortuguesPuroParser.RULE_aglomerado);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 377;
			this.iniciador_de_aglomerado();
			{
			this.state = 378;
			this.caractere_aglomeravel();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public caractere_aglomeravel(): Caractere_aglomeravelContext {
		let _localctx: Caractere_aglomeravelContext = new Caractere_aglomeravelContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, PortuguesPuroParser.RULE_caractere_aglomeravel);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 380;
			_la = this._input.LA(1);
			if (!(((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & ((1 << (PortuguesPuroParser.T__101 - 102)) | (1 << (PortuguesPuroParser.T__102 - 102)) | (1 << (PortuguesPuroParser.T__103 - 102)) | (1 << (PortuguesPuroParser.T__104 - 102)) | (1 << (PortuguesPuroParser.T__105 - 102)) | (1 << (PortuguesPuroParser.T__106 - 102)))) !== 0) || ((((_la - 182)) & ~0x1F) === 0 && ((1 << (_la - 182)) & ((1 << (PortuguesPuroParser.LETRA - 182)) | (1 << (PortuguesPuroParser.DIGITO - 182)) | (1 << (PortuguesPuroParser.HIFEN - 182)) | (1 << (PortuguesPuroParser.CIFRAO - 182)) | (1 << (PortuguesPuroParser.BARRA_INCLINADA - 182)) | (1 << (PortuguesPuroParser.SINAL_DE_ADICAO - 182)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public iniciador_de_aglomerado(): Iniciador_de_aglomeradoContext {
		let _localctx: Iniciador_de_aglomeradoContext = new Iniciador_de_aglomeradoContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, PortuguesPuroParser.RULE_iniciador_de_aglomerado);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 382;
			_la = this._input.LA(1);
			if (!(((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & ((1 << (PortuguesPuroParser.T__101 - 102)) | (1 << (PortuguesPuroParser.T__102 - 102)) | (1 << (PortuguesPuroParser.T__103 - 102)) | (1 << (PortuguesPuroParser.T__104 - 102)) | (1 << (PortuguesPuroParser.T__105 - 102)) | (1 << (PortuguesPuroParser.T__106 - 102)))) !== 0) || ((((_la - 182)) & ~0x1F) === 0 && ((1 << (_la - 182)) & ((1 << (PortuguesPuroParser.LETRA - 182)) | (1 << (PortuguesPuroParser.DIGITO - 182)) | (1 << (PortuguesPuroParser.APOSTROFO - 182)) | (1 << (PortuguesPuroParser.CIFRAO - 182)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public possessivo_novo(): Possessivo_novoContext {
		let _localctx: Possessivo_novoContext = new Possessivo_novoContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, PortuguesPuroParser.RULE_possessivo_novo);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 384;
			this.apostrofo();
			this.state = 385;
			this.caractere_nao_aglomeravel();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qualificador(): QualificadorContext {
		let _localctx: QualificadorContext = new QualificadorContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, PortuguesPuroParser.RULE_qualificador);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 387;
			this.match(PortuguesPuroParser.ABRE_PARENTESES);
			this.state = 391;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === PortuguesPuroParser.CARACTERES_IMPRIMIVEIS) {
				{
				{
				this.state = 388;
				this.match(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
				}
				}
				this.state = 393;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 394;
			this.match(PortuguesPuroParser.FECHA_PARENTESES);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public caractere_nao_aglomeravel(): Caractere_nao_aglomeravelContext {
		let _localctx: Caractere_nao_aglomeravelContext = new Caractere_nao_aglomeravelContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, PortuguesPuroParser.RULE_caractere_nao_aglomeravel);
		let _la: number;
		try {
			this.state = 408;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 12, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 396;
				_la = this._input.LA(1);
				if (_la <= 0 || (_la === PortuguesPuroParser.LETRA)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 397;
				_la = this._input.LA(1);
				if (_la <= 0 || (_la === PortuguesPuroParser.DIGITO)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 398;
				_la = this._input.LA(1);
				if (_la <= 0 || (_la === PortuguesPuroParser.T__101)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 399;
				_la = this._input.LA(1);
				if (_la <= 0 || (_la === PortuguesPuroParser.T__102)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 400;
				_la = this._input.LA(1);
				if (_la <= 0 || (_la === PortuguesPuroParser.T__103)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 401;
				_la = this._input.LA(1);
				if (_la <= 0 || (_la === PortuguesPuroParser.T__104)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 402;
				_la = this._input.LA(1);
				if (_la <= 0 || (_la === PortuguesPuroParser.T__105)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 403;
				_la = this._input.LA(1);
				if (_la <= 0 || (_la === PortuguesPuroParser.CIFRAO)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 404;
				_la = this._input.LA(1);
				if (_la <= 0 || (_la === PortuguesPuroParser.T__106)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 405;
				_la = this._input.LA(1);
				if (_la <= 0 || (_la === PortuguesPuroParser.HIFEN)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 406;
				_la = this._input.LA(1);
				if (_la <= 0 || (_la === PortuguesPuroParser.SINAL_DE_ADICAO)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 407;
				_la = this._input.LA(1);
				if (_la <= 0 || (_la === PortuguesPuroParser.BARRA_INCLINADA)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sinal_de_pontuacao(): Sinal_de_pontuacaoContext {
		let _localctx: Sinal_de_pontuacaoContext = new Sinal_de_pontuacaoContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, PortuguesPuroParser.RULE_sinal_de_pontuacao);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 410;
			_la = this._input.LA(1);
			if (!(_la === PortuguesPuroParser.T__107 || _la === PortuguesPuroParser.T__108 || ((((_la - 196)) & ~0x1F) === 0 && ((1 << (_la - 196)) & ((1 << (PortuguesPuroParser.PONTO - 196)) | (1 << (PortuguesPuroParser.VIRGULA - 196)) | (1 << (PortuguesPuroParser.PONTO_E_VIRGULA - 196)) | (1 << (PortuguesPuroParser.DOIS_PONTOS - 196)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simbolos_especiais(): Simbolos_especiaisContext {
		let _localctx: Simbolos_especiaisContext = new Simbolos_especiaisContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, PortuguesPuroParser.RULE_simbolos_especiais);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 412;
			_la = this._input.LA(1);
			if (!(((((_la - 110)) & ~0x1F) === 0 && ((1 << (_la - 110)) & ((1 << (PortuguesPuroParser.T__109 - 110)) | (1 << (PortuguesPuroParser.T__110 - 110)) | (1 << (PortuguesPuroParser.T__111 - 110)) | (1 << (PortuguesPuroParser.T__112 - 110)) | (1 << (PortuguesPuroParser.T__113 - 110)) | (1 << (PortuguesPuroParser.T__114 - 110)) | (1 << (PortuguesPuroParser.T__115 - 110)))) !== 0) || ((((_la - 188)) & ~0x1F) === 0 && ((1 << (_la - 188)) & ((1 << (PortuguesPuroParser.HIFEN - 188)) | (1 << (PortuguesPuroParser.BARRA_INCLINADA - 188)) | (1 << (PortuguesPuroParser.SINAL_DE_ADICAO - 188)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public noise(): NoiseContext {
		let _localctx: NoiseContext = new NoiseContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, PortuguesPuroParser.RULE_noise);
		try {
			this.state = 417;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PortuguesPuroParser.ESPACO_EM_BRANCO:
			case PortuguesPuroParser.ESPACO_RIGIDO:
			case PortuguesPuroParser.CARACTERES_DE_CONTROLE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 414;
				this.caracteres_ignoraveis();
				}
				break;
			case PortuguesPuroParser.BARRA_INVERTIDA:
			case PortuguesPuroParser.ABRE_COLCHETES:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 415;
				this.comentario();
				}
				break;
			case PortuguesPuroParser.ABRE_PARENTESES:
				this.enterOuterAlt(_localctx, 3);
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public numero_inteiro(): Numero_inteiroContext {
		let _localctx: Numero_inteiroContext = new Numero_inteiroContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, PortuguesPuroParser.RULE_numero_inteiro);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 420;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 419;
				this.match(PortuguesPuroParser.DIGITO);
				}
				}
				this.state = 422;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === PortuguesPuroParser.DIGITO);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public numero_decimal(): Numero_decimalContext {
		let _localctx: Numero_decimalContext = new Numero_decimalContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, PortuguesPuroParser.RULE_numero_decimal);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 425;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PortuguesPuroParser.HIFEN) {
				{
				this.state = 424;
				this.match(PortuguesPuroParser.HIFEN);
				}
			}

			this.state = 427;
			this.numero_inteiro();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public numero_fracionario(): Numero_fracionarioContext {
		let _localctx: Numero_fracionarioContext = new Numero_fracionarioContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, PortuguesPuroParser.RULE_numero_fracionario);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 429;
			this.numero_decimal();
			this.state = 430;
			this.match(PortuguesPuroParser.BARRA_INCLINADA);
			this.state = 431;
			this.numero_inteiro();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public numero_misto(): Numero_mistoContext {
		let _localctx: Numero_mistoContext = new Numero_mistoContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, PortuguesPuroParser.RULE_numero_misto);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 433;
			this.numero_decimal();
			this.state = 434;
			this.match(PortuguesPuroParser.SINAL_DE_ADICAO);
			this.state = 435;
			this.numero_fracionario();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public numero_hexadecimal(): Numero_hexadecimalContext {
		let _localctx: Numero_hexadecimalContext = new Numero_hexadecimalContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, PortuguesPuroParser.RULE_numero_hexadecimal);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 437;
			this.match(PortuguesPuroParser.CIFRAO);
			this.state = 438;
			this.numero_inteiro();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public string_literal(): String_literalContext {
		let _localctx: String_literalContext = new String_literalContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, PortuguesPuroParser.RULE_string_literal);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 440;
			this.match(PortuguesPuroParser.ASPAS_DUPLAS);
			this.state = 444;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === PortuguesPuroParser.CARACTERES_IMPRIMIVEIS) {
				{
				{
				this.state = 441;
				this.match(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public programa(): ProgramaContext {
		let _localctx: ProgramaContext = new ProgramaContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, PortuguesPuroParser.RULE_programa);
		try {
			this.state = 452;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PortuguesPuroParser.T__5:
			case PortuguesPuroParser.T__6:
			case PortuguesPuroParser.T__7:
			case PortuguesPuroParser.T__8:
			case PortuguesPuroParser.T__13:
			case PortuguesPuroParser.T__14:
			case PortuguesPuroParser.T__15:
			case PortuguesPuroParser.T__16:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 449;
				this.tipo();
				}
				break;
			case PortuguesPuroParser.EOF:
			case PortuguesPuroParser.T__1:
			case PortuguesPuroParser.T__2:
			case PortuguesPuroParser.T__3:
			case PortuguesPuroParser.T__4:
			case PortuguesPuroParser.T__9:
			case PortuguesPuroParser.T__10:
			case PortuguesPuroParser.T__11:
			case PortuguesPuroParser.T__12:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 450;
				this.variavel_global();
				}
				break;
			case PortuguesPuroParser.T__158:
			case PortuguesPuroParser.T__160:
			case PortuguesPuroParser.T__162:
				this.enterOuterAlt(_localctx, 3);
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tipos_primitivos(): Tipos_primitivosContext {
		let _localctx: Tipos_primitivosContext = new Tipos_primitivosContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, PortuguesPuroParser.RULE_tipos_primitivos);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 454;
			_la = this._input.LA(1);
			if (!(((((_la - 117)) & ~0x1F) === 0 && ((1 << (_la - 117)) & ((1 << (PortuguesPuroParser.T__116 - 117)) | (1 << (PortuguesPuroParser.T__117 - 117)) | (1 << (PortuguesPuroParser.T__118 - 117)) | (1 << (PortuguesPuroParser.T__119 - 117)) | (1 << (PortuguesPuroParser.T__120 - 117)) | (1 << (PortuguesPuroParser.T__121 - 117)) | (1 << (PortuguesPuroParser.T__122 - 117)) | (1 << (PortuguesPuroParser.T__123 - 117)) | (1 << (PortuguesPuroParser.T__124 - 117)) | (1 << (PortuguesPuroParser.T__125 - 117)) | (1 << (PortuguesPuroParser.T__126 - 117)) | (1 << (PortuguesPuroParser.T__127 - 117)) | (1 << (PortuguesPuroParser.T__128 - 117)) | (1 << (PortuguesPuroParser.T__129 - 117)) | (1 << (PortuguesPuroParser.T__130 - 117)) | (1 << (PortuguesPuroParser.T__131 - 117)) | (1 << (PortuguesPuroParser.T__132 - 117)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tipo(): TipoContext {
		let _localctx: TipoContext = new TipoContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, PortuguesPuroParser.RULE_tipo);
		let _la: number;
		try {
			this.state = 482;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 19, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 456;
				this.artigo_indefinido();
				this.state = 457;
				this.nome();
				this.state = 458;
				this.�();
				this.state = 459;
				this.artigo_indefinido();
				this.state = 460;
				this.nome_do_tipo();
				this.state = 462;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PortuguesPuroParser.T__140 || _la === PortuguesPuroParser.T__160) {
					{
					this.state = 461;
					this.informacao_opcional();
					}
				}

				this.state = 464;
				this.match(PortuguesPuroParser.PONTO);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 466;
				this.artigo_indefinido();
				this.state = 467;
				this.nome();
				this.state = 468;
				this.�();
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
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 475;
				this.artigo_indefinido();
				this.state = 476;
				this.nome();
				this.state = 477;
				this.�();
				this.state = 478;
				this.numero_inteiro();
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nome(): NomeContext {
		let _localctx: NomeContext = new NomeContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, PortuguesPuroParser.RULE_nome);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 484;
			this.palavra();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nome_do_tipo(): Nome_do_tipoContext {
		let _localctx: Nome_do_tipoContext = new Nome_do_tipoContext(this._ctx, this.state);
		this.enterRule(_localctx, 80, PortuguesPuroParser.RULE_nome_do_tipo);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 486;
			this.nome();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public informacao_opcional(): Informacao_opcionalContext {
		let _localctx: Informacao_opcionalContext = new Informacao_opcionalContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, PortuguesPuroParser.RULE_informacao_opcional);
		try {
			this.state = 495;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PortuguesPuroParser.T__160:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 488;
				this.para();
				this.state = 489;
				this.artigo_indefinido();
				this.state = 490;
				this.nome_do_tipo();
				}
				break;
			case PortuguesPuroParser.T__140:
				this.enterOuterAlt(_localctx, 2);
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public campos(): CamposContext {
		let _localctx: CamposContext = new CamposContext(this._ctx, this.state);
		this.enterRule(_localctx, 84, PortuguesPuroParser.RULE_campos);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 497;
			this.campo();
			this.state = 503;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === PortuguesPuroParser.T__136 || _la === PortuguesPuroParser.T__137 || _la === PortuguesPuroParser.VIRGULA || _la === PortuguesPuroParser.PONTO_E_VIRGULA) {
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public bytes(): BytesContext {
		let _localctx: BytesContext = new BytesContext(this._ctx, this.state);
		this.enterRule(_localctx, 86, PortuguesPuroParser.RULE_bytes);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 506;
			this.match(PortuguesPuroParser.T__133);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public refer�ncia(): Refer�nciaContext {
		let _localctx: Refer�nciaContext = new Refer�nciaContext(this._ctx, this.state);
		this.enterRule(_localctx, 88, PortuguesPuroParser.RULE_refer�ncia);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 508;
			this.match(PortuguesPuroParser.T__134);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public campo(): CampoContext {
		let _localctx: CampoContext = new CampoContext(this._ctx, this.state);
		this.enterRule(_localctx, 90, PortuguesPuroParser.RULE_campo);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 514;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PortuguesPuroParser.T__5:
			case PortuguesPuroParser.T__6:
			case PortuguesPuroParser.T__7:
			case PortuguesPuroParser.T__8:
			case PortuguesPuroParser.T__13:
			case PortuguesPuroParser.T__14:
			case PortuguesPuroParser.T__15:
			case PortuguesPuroParser.T__16:
				{
				this.state = 510;
				this.artigo_indefinido();
				}
				break;
			case PortuguesPuroParser.DIGITO:
				{
				this.state = 511;
				this.numero_inteiro();
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
			case PortuguesPuroParser.T__71:
			case PortuguesPuroParser.T__72:
			case PortuguesPuroParser.T__73:
			case PortuguesPuroParser.T__74:
			case PortuguesPuroParser.T__75:
			case PortuguesPuroParser.T__76:
			case PortuguesPuroParser.T__77:
			case PortuguesPuroParser.T__78:
				{
				this.state = 516;
				this.denominacoes();
				this.state = 517;
				this.nome();
				}
				break;
			case PortuguesPuroParser.T__135:
				{
				this.state = 519;
				this.match(PortuguesPuroParser.T__135);
				this.state = 520;
				this.artigo_definido();
				this.state = 521;
				this.nome();
				}
				break;
			case PortuguesPuroParser.T__134:
				{
				this.state = 523;
				this.refer�ncia();
				}
				break;
			case PortuguesPuroParser.T__136:
			case PortuguesPuroParser.T__137:
			case PortuguesPuroParser.PONTO:
			case PortuguesPuroParser.VIRGULA:
			case PortuguesPuroParser.PONTO_E_VIRGULA:
				break;
			default:
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public pausa(): PausaContext {
		let _localctx: PausaContext = new PausaContext(this._ctx, this.state);
		this.enterRule(_localctx, 92, PortuguesPuroParser.RULE_pausa);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 526;
			_la = this._input.LA(1);
			if (!(_la === PortuguesPuroParser.T__136 || _la === PortuguesPuroParser.T__137 || _la === PortuguesPuroParser.VIRGULA || _la === PortuguesPuroParser.PONTO_E_VIRGULA)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public pausas(): PausasContext {
		let _localctx: PausasContext = new PausasContext(this._ctx, this.state);
		this.enterRule(_localctx, 94, PortuguesPuroParser.RULE_pausas);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
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
			} while (_la === PortuguesPuroParser.T__136 || _la === PortuguesPuroParser.T__137 || _la === PortuguesPuroParser.VIRGULA || _la === PortuguesPuroParser.PONTO_E_VIRGULA);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public conjuncoes(): ConjuncoesContext {
		let _localctx: ConjuncoesContext = new ConjuncoesContext(this._ctx, this.state);
		this.enterRule(_localctx, 96, PortuguesPuroParser.RULE_conjuncoes);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 533;
			_la = this._input.LA(1);
			if (!(((((_la - 137)) & ~0x1F) === 0 && ((1 << (_la - 137)) & ((1 << (PortuguesPuroParser.T__136 - 137)) | (1 << (PortuguesPuroParser.T__137 - 137)) | (1 << (PortuguesPuroParser.T__138 - 137)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public preposicoes(): PreposicoesContext {
		let _localctx: PreposicoesContext = new PreposicoesContext(this._ctx, this.state);
		this.enterRule(_localctx, 98, PortuguesPuroParser.RULE_preposicoes);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 535;
			_la = this._input.LA(1);
			if (!(_la === PortuguesPuroParser.T__25 || _la === PortuguesPuroParser.T__26 || ((((_la - 136)) & ~0x1F) === 0 && ((1 << (_la - 136)) & ((1 << (PortuguesPuroParser.T__135 - 136)) | (1 << (PortuguesPuroParser.T__139 - 136)) | (1 << (PortuguesPuroParser.T__140 - 136)) | (1 << (PortuguesPuroParser.T__141 - 136)) | (1 << (PortuguesPuroParser.T__142 - 136)) | (1 << (PortuguesPuroParser.T__143 - 136)) | (1 << (PortuguesPuroParser.T__144 - 136)) | (1 << (PortuguesPuroParser.T__145 - 136)) | (1 << (PortuguesPuroParser.T__146 - 136)) | (1 << (PortuguesPuroParser.T__147 - 136)) | (1 << (PortuguesPuroParser.T__148 - 136)) | (1 << (PortuguesPuroParser.T__149 - 136)) | (1 << (PortuguesPuroParser.T__150 - 136)) | (1 << (PortuguesPuroParser.T__151 - 136)) | (1 << (PortuguesPuroParser.T__152 - 136)) | (1 << (PortuguesPuroParser.T__153 - 136)) | (1 << (PortuguesPuroParser.T__154 - 136)) | (1 << (PortuguesPuroParser.T__155 - 136)) | (1 << (PortuguesPuroParser.T__156 - 136)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public �(): �Context {
		let _localctx: �Context = new �Context(this._ctx, this.state);
		this.enterRule(_localctx, 100, PortuguesPuroParser.RULE_�);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 537;
			_la = this._input.LA(1);
			if (!(_la === PortuguesPuroParser.T__18 || _la === PortuguesPuroParser.T__83)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public estrutura(): EstruturaContext {
		let _localctx: EstruturaContext = new EstruturaContext(this._ctx, this.state);
		this.enterRule(_localctx, 102, PortuguesPuroParser.RULE_estrutura);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 539;
			this.match(PortuguesPuroParser.T__122);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public igual_a(): Igual_aContext {
		let _localctx: Igual_aContext = new Igual_aContext(this._ctx, this.state);
		this.enterRule(_localctx, 104, PortuguesPuroParser.RULE_igual_a);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 541;
			this.match(PortuguesPuroParser.T__45);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variavel_global(): Variavel_globalContext {
		let _localctx: Variavel_globalContext = new Variavel_globalContext(this._ctx, this.state);
		this.enterRule(_localctx, 106, PortuguesPuroParser.RULE_variavel_global);
		let _la: number;
		try {
			this.state = 577;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 26, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 543;
				this.artigo_definido();
				this.state = 544;
				this.nome();
				this.state = 545;
				this.�();
				this.state = 546;
				this.artigo_indefinido();
				this.state = 547;
				this.nome_do_tipo();
				this.state = 549;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PortuguesPuroParser.T__140 || _la === PortuguesPuroParser.T__160) {
					{
					this.state = 548;
					this.informacao_opcional();
					}
				}

				this.state = 551;
				this.match(PortuguesPuroParser.PONTO);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 553;
				this.artigo_definido();
				this.state = 554;
				this.nome();
				this.state = 555;
				this.�();
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
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 562;
				this.artigo_definido();
				this.state = 563;
				this.nome();
				this.state = 564;
				this.�();
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
				this.�();
				this.state = 573;
				this.termo_constante();
				this.state = 574;
				this.match(PortuguesPuroParser.PONTO);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				// tslint:disable-next-line:no-empty
				{
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public rotina(): RotinaContext {
		let _localctx: RotinaContext = new RotinaContext(this._ctx, this.state);
		this.enterRule(_localctx, 108, PortuguesPuroParser.RULE_rotina);
		try {
			this.state = 583;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 27, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 579;
				this.procedimento();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 580;
				this.decisor();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 581;
				this.funcao();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 582;
				this.retroinvocacao();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public procedimento(): ProcedimentoContext {
		let _localctx: ProcedimentoContext = new ProcedimentoContext(this._ctx, this.state);
		this.enterRule(_localctx, 110, PortuguesPuroParser.RULE_procedimento);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 601;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				{
				this.state = 586;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PortuguesPuroParser.T__162) {
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
				this.match(PortuguesPuroParser.PONTO_E_VIRGULA);
				}
				break;

			case 2:
				{
				this.state = 594;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PortuguesPuroParser.T__162) {
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
			this.instrucoes();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public determine_se(): Determine_seContext {
		let _localctx: Determine_seContext = new Determine_seContext(this._ctx, this.state);
		this.enterRule(_localctx, 112, PortuguesPuroParser.RULE_determine_se);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 605;
			this.match(PortuguesPuroParser.T__157);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public decisor(): DecisorContext {
		let _localctx: DecisorContext = new DecisorContext(this._ctx, this.state);
		this.enterRule(_localctx, 114, PortuguesPuroParser.RULE_decisor);
		let _la: number;
		try {
			this.state = 625;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 33, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 608;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PortuguesPuroParser.T__162) {
					{
					this.state = 607;
					this.rotina2();
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
				this.match(PortuguesPuroParser.PONTO_E_VIRGULA);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 617;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PortuguesPuroParser.T__162) {
					{
					this.state = 616;
					this.rotina2();
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fun��o2(): Fun��o2Context {
		let _localctx: Fun��o2Context = new Fun��o2Context(this._ctx, this.state);
		this.enterRule(_localctx, 116, PortuguesPuroParser.RULE_fun��o2);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 627;
			this.match(PortuguesPuroParser.T__158);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public atribua(): AtribuaContext {
		let _localctx: AtribuaContext = new AtribuaContext(this._ctx, this.state);
		this.enterRule(_localctx, 118, PortuguesPuroParser.RULE_atribua);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 629;
			this.match(PortuguesPuroParser.T__159);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public funcao(): FuncaoContext {
		let _localctx: FuncaoContext = new FuncaoContext(this._ctx, this.state);
		this.enterRule(_localctx, 120, PortuguesPuroParser.RULE_funcao);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 661;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 36, this._ctx) ) {
			case 1:
				{
				this.state = 632;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PortuguesPuroParser.T__158) {
					{
					this.state = 631;
					this.fun��o2();
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
				this.match(PortuguesPuroParser.PONTO_E_VIRGULA);
				}
				break;

			case 2:
				{
				this.state = 647;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PortuguesPuroParser.T__158) {
					{
					this.state = 646;
					this.fun��o2();
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
			this.instrucoes();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public para(): ParaContext {
		let _localctx: ParaContext = new ParaContext(this._ctx, this.state);
		this.enterRule(_localctx, 122, PortuguesPuroParser.RULE_para);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 665;
			this.match(PortuguesPuroParser.T__160);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public que_se(): Que_seContext {
		let _localctx: Que_seContext = new Que_seContext(this._ctx, this.state);
		this.enterRule(_localctx, 124, PortuguesPuroParser.RULE_que_se);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 667;
			this.match(PortuguesPuroParser.T__161);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public rotina2(): Rotina2Context {
		let _localctx: Rotina2Context = new Rotina2Context(this._ctx, this.state);
		this.enterRule(_localctx, 126, PortuguesPuroParser.RULE_rotina2);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 669;
			this.match(PortuguesPuroParser.T__162);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public compativelmente(): CompativelmenteContext {
		let _localctx: CompativelmenteContext = new CompativelmenteContext(this._ctx, this.state);
		this.enterRule(_localctx, 128, PortuguesPuroParser.RULE_compativelmente);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 671;
			this.match(PortuguesPuroParser.T__163);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public retroinvocacao(): RetroinvocacaoContext {
		let _localctx: RetroinvocacaoContext = new RetroinvocacaoContext(this._ctx, this.state);
		this.enterRule(_localctx, 130, PortuguesPuroParser.RULE_retroinvocacao);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 691;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				{
				this.state = 674;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PortuguesPuroParser.T__162) {
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
				this.match(PortuguesPuroParser.PONTO_E_VIRGULA);
				}
				break;

			case 2:
				{
				this.state = 683;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PortuguesPuroParser.T__162) {
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
			this.instrucoes();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nome_da_rotina(): Nome_da_rotinaContext {
		let _localctx: Nome_da_rotinaContext = new Nome_da_rotinaContext(this._ctx, this.state);
		this.enterRule(_localctx, 132, PortuguesPuroParser.RULE_nome_da_rotina);
		let _la: number;
		try {
			this.state = 701;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PortuguesPuroParser.CARACTERES_IMPRIMIVEIS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 695;
				this.unidade_semantica();
				}
				break;
			case PortuguesPuroParser.T__5:
			case PortuguesPuroParser.T__6:
			case PortuguesPuroParser.T__7:
			case PortuguesPuroParser.T__8:
			case PortuguesPuroParser.T__13:
			case PortuguesPuroParser.T__14:
			case PortuguesPuroParser.T__15:
			case PortuguesPuroParser.T__16:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 696;
				this.parametro();
				}
				break;
			case PortuguesPuroParser.T__1:
			case PortuguesPuroParser.T__2:
			case PortuguesPuroParser.T__3:
			case PortuguesPuroParser.T__4:
			case PortuguesPuroParser.T__9:
			case PortuguesPuroParser.T__10:
			case PortuguesPuroParser.T__11:
			case PortuguesPuroParser.T__12:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 697;
				this.frase();
				this.state = 699;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PortuguesPuroParser.ABRE_PARENTESES) {
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unidade_semantica(): Unidade_semanticaContext {
		let _localctx: Unidade_semanticaContext = new Unidade_semanticaContext(this._ctx, this.state);
		this.enterRule(_localctx, 134, PortuguesPuroParser.RULE_unidade_semantica);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 703;
			this.palavra();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parametro(): ParametroContext {
		let _localctx: ParametroContext = new ParametroContext(this._ctx, this.state);
		this.enterRule(_localctx, 136, PortuguesPuroParser.RULE_parametro);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 705;
			this.artigo_indefinido();
			this.state = 706;
			this.nome();
			this.state = 710;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 72)) & ~0x1F) === 0 && ((1 << (_la - 72)) & ((1 << (PortuguesPuroParser.T__71 - 72)) | (1 << (PortuguesPuroParser.T__72 - 72)) | (1 << (PortuguesPuroParser.T__73 - 72)) | (1 << (PortuguesPuroParser.T__74 - 72)) | (1 << (PortuguesPuroParser.T__75 - 72)) | (1 << (PortuguesPuroParser.T__76 - 72)) | (1 << (PortuguesPuroParser.T__77 - 72)) | (1 << (PortuguesPuroParser.T__78 - 72)))) !== 0)) {
				{
				this.state = 707;
				this.denominacoes();
				this.state = 708;
				this.nome();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public frase(): FraseContext {
		let _localctx: FraseContext = new FraseContext(this._ctx, this.state);
		this.enterRule(_localctx, 138, PortuguesPuroParser.RULE_frase);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 712;
			this.artigo_definido();
			this.state = 713;
			this.nome();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public instrucoes(): InstrucoesContext {
		let _localctx: InstrucoesContext = new InstrucoesContext(this._ctx, this.state);
		this.enterRule(_localctx, 140, PortuguesPuroParser.RULE_instrucoes);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 716;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 715;
				this.instrucao();
				}
				}
				this.state = 718;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << PortuguesPuroParser.T__1) | (1 << PortuguesPuroParser.T__2) | (1 << PortuguesPuroParser.T__3) | (1 << PortuguesPuroParser.T__4) | (1 << PortuguesPuroParser.T__5) | (1 << PortuguesPuroParser.T__6) | (1 << PortuguesPuroParser.T__7) | (1 << PortuguesPuroParser.T__8) | (1 << PortuguesPuroParser.T__9) | (1 << PortuguesPuroParser.T__10) | (1 << PortuguesPuroParser.T__11) | (1 << PortuguesPuroParser.T__12) | (1 << PortuguesPuroParser.T__13) | (1 << PortuguesPuroParser.T__14) | (1 << PortuguesPuroParser.T__15) | (1 << PortuguesPuroParser.T__16))) !== 0) || ((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & ((1 << (PortuguesPuroParser.T__53 - 54)) | (1 << (PortuguesPuroParser.T__55 - 54)) | (1 << (PortuguesPuroParser.T__56 - 54)) | (1 << (PortuguesPuroParser.T__57 - 54)) | (1 << (PortuguesPuroParser.T__58 - 54)) | (1 << (PortuguesPuroParser.T__59 - 54)) | (1 << (PortuguesPuroParser.T__60 - 54)) | (1 << (PortuguesPuroParser.T__61 - 54)) | (1 << (PortuguesPuroParser.T__63 - 54)) | (1 << (PortuguesPuroParser.T__64 - 54)) | (1 << (PortuguesPuroParser.T__66 - 54)) | (1 << (PortuguesPuroParser.T__68 - 54)) | (1 << (PortuguesPuroParser.T__69 - 54)) | (1 << (PortuguesPuroParser.T__70 - 54)))) !== 0) || ((((_la - 165)) & ~0x1F) === 0 && ((1 << (_la - 165)) & ((1 << (PortuguesPuroParser.T__164 - 165)) | (1 << (PortuguesPuroParser.T__165 - 165)) | (1 << (PortuguesPuroParser.T__167 - 165)) | (1 << (PortuguesPuroParser.DIGITO - 165)) | (1 << (PortuguesPuroParser.ASPAS_DUPLAS - 165)) | (1 << (PortuguesPuroParser.HIFEN - 165)) | (1 << (PortuguesPuroParser.CIFRAO - 165)) | (1 << (PortuguesPuroParser.SINAL_DE_ADICAO - 165)))) !== 0) || _la === PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public instrucao(): InstrucaoContext {
		let _localctx: InstrucaoContext = new InstrucaoContext(this._ctx, this.state);
		this.enterRule(_localctx, 142, PortuguesPuroParser.RULE_instrucao);
		try {
			this.state = 726;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PortuguesPuroParser.T__58:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 720;
				this.preservacao();
				}
				break;
			case PortuguesPuroParser.T__164:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 721;
				this.iteracao();
				}
				break;
			case PortuguesPuroParser.T__53:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 722;
				this.condicional();
				}
				break;
			case PortuguesPuroParser.T__1:
			case PortuguesPuroParser.T__2:
			case PortuguesPuroParser.T__3:
			case PortuguesPuroParser.T__4:
			case PortuguesPuroParser.T__5:
			case PortuguesPuroParser.T__6:
			case PortuguesPuroParser.T__7:
			case PortuguesPuroParser.T__8:
			case PortuguesPuroParser.T__9:
			case PortuguesPuroParser.T__10:
			case PortuguesPuroParser.T__11:
			case PortuguesPuroParser.T__12:
			case PortuguesPuroParser.T__13:
			case PortuguesPuroParser.T__14:
			case PortuguesPuroParser.T__15:
			case PortuguesPuroParser.T__16:
			case PortuguesPuroParser.T__55:
			case PortuguesPuroParser.T__56:
			case PortuguesPuroParser.T__57:
			case PortuguesPuroParser.T__59:
			case PortuguesPuroParser.T__60:
			case PortuguesPuroParser.T__61:
			case PortuguesPuroParser.T__63:
			case PortuguesPuroParser.T__64:
			case PortuguesPuroParser.T__66:
			case PortuguesPuroParser.T__68:
			case PortuguesPuroParser.T__69:
			case PortuguesPuroParser.T__70:
			case PortuguesPuroParser.T__165:
			case PortuguesPuroParser.T__167:
			case PortuguesPuroParser.DIGITO:
			case PortuguesPuroParser.ASPAS_DUPLAS:
			case PortuguesPuroParser.HIFEN:
			case PortuguesPuroParser.CIFRAO:
			case PortuguesPuroParser.SINAL_DE_ADICAO:
			case PortuguesPuroParser.CARACTERES_IMPRIMIVEIS:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 723;
				this.incondicional();
				this.state = 724;
				this.match(PortuguesPuroParser.VIRGULA);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public preserve(): PreserveContext {
		let _localctx: PreserveContext = new PreserveContext(this._ctx, this.state);
		this.enterRule(_localctx, 144, PortuguesPuroParser.RULE_preserve);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 728;
			this.match(PortuguesPuroParser.T__58);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public preservacao(): PreservacaoContext {
		let _localctx: PreservacaoContext = new PreservacaoContext(this._ctx, this.state);
		this.enterRule(_localctx, 146, PortuguesPuroParser.RULE_preservacao);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 730;
			this.preserve();
			this.state = 731;
			this.parametro();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public iteracao(): IteracaoContext {
		let _localctx: IteracaoContext = new IteracaoContext(this._ctx, this.state);
		this.enterRule(_localctx, 148, PortuguesPuroParser.RULE_iteracao);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 733;
			this.match(PortuguesPuroParser.T__164);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public se(): SeContext {
		let _localctx: SeContext = new SeContext(this._ctx, this.state);
		this.enterRule(_localctx, 150, PortuguesPuroParser.RULE_se);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 735;
			this.match(PortuguesPuroParser.T__53);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public condicional(): CondicionalContext {
		let _localctx: CondicionalContext = new CondicionalContext(this._ctx, this.state);
		this.enterRule(_localctx, 152, PortuguesPuroParser.RULE_condicional);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 737;
			this.se();
			this.state = 738;
			this.expressao_decisora();
			this.state = 739;
			this.match(PortuguesPuroParser.VIRGULA);
			this.state = 740;
			this.incondicional();
			this.state = 745;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === PortuguesPuroParser.PONTO_E_VIRGULA) {
				{
				{
				this.state = 741;
				this.match(PortuguesPuroParser.PONTO_E_VIRGULA);
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressao_decisora(): Expressao_decisoraContext {
		let _localctx: Expressao_decisoraContext = new Expressao_decisoraContext(this._ctx, this.state);
		this.enterRule(_localctx, 154, PortuguesPuroParser.RULE_expressao_decisora);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
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
				_alt = this.interpreter.adaptivePredict(this._input, 46, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 756;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PortuguesPuroParser.T__18 || ((((_la - 80)) & ~0x1F) === 0 && ((1 << (_la - 80)) & ((1 << (PortuguesPuroParser.T__79 - 80)) | (1 << (PortuguesPuroParser.T__80 - 80)) | (1 << (PortuguesPuroParser.T__81 - 80)) | (1 << (PortuguesPuroParser.T__82 - 80)) | (1 << (PortuguesPuroParser.T__83 - 80)) | (1 << (PortuguesPuroParser.T__84 - 80)) | (1 << (PortuguesPuroParser.T__85 - 80)) | (1 << (PortuguesPuroParser.T__86 - 80)) | (1 << (PortuguesPuroParser.T__87 - 80)) | (1 << (PortuguesPuroParser.T__88 - 80)) | (1 << (PortuguesPuroParser.T__89 - 80)) | (1 << (PortuguesPuroParser.T__90 - 80)) | (1 << (PortuguesPuroParser.T__91 - 80)) | (1 << (PortuguesPuroParser.T__92 - 80)) | (1 << (PortuguesPuroParser.T__93 - 80)) | (1 << (PortuguesPuroParser.T__94 - 80)) | (1 << (PortuguesPuroParser.T__95 - 80)) | (1 << (PortuguesPuroParser.T__96 - 80)) | (1 << (PortuguesPuroParser.T__97 - 80)) | (1 << (PortuguesPuroParser.T__98 - 80)) | (1 << (PortuguesPuroParser.T__99 - 80)) | (1 << (PortuguesPuroParser.T__100 - 80)))) !== 0)) {
				{
				this.state = 755;
				this.verbos();
				}
			}

			this.state = 759;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PortuguesPuroParser.CARACTERES_IMPRIMIVEIS) {
				{
				this.state = 758;
				this.expressao_decisora();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public incondicional(): IncondicionalContext {
		let _localctx: IncondicionalContext = new IncondicionalContext(this._ctx, this.state);
		this.enterRule(_localctx, 156, PortuguesPuroParser.RULE_incondicional);
		try {
			this.state = 769;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PortuguesPuroParser.T__56:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 761;
				this.interrupcao();
				}
				break;
			case PortuguesPuroParser.T__1:
			case PortuguesPuroParser.T__2:
			case PortuguesPuroParser.T__3:
			case PortuguesPuroParser.T__4:
			case PortuguesPuroParser.T__5:
			case PortuguesPuroParser.T__6:
			case PortuguesPuroParser.T__7:
			case PortuguesPuroParser.T__8:
			case PortuguesPuroParser.T__9:
			case PortuguesPuroParser.T__10:
			case PortuguesPuroParser.T__11:
			case PortuguesPuroParser.T__12:
			case PortuguesPuroParser.T__13:
			case PortuguesPuroParser.T__14:
			case PortuguesPuroParser.T__15:
			case PortuguesPuroParser.T__16:
			case PortuguesPuroParser.T__60:
			case PortuguesPuroParser.T__61:
			case PortuguesPuroParser.T__64:
			case PortuguesPuroParser.T__68:
			case PortuguesPuroParser.T__69:
			case PortuguesPuroParser.T__70:
			case PortuguesPuroParser.DIGITO:
			case PortuguesPuroParser.ASPAS_DUPLAS:
			case PortuguesPuroParser.HIFEN:
			case PortuguesPuroParser.CIFRAO:
			case PortuguesPuroParser.SINAL_DE_ADICAO:
			case PortuguesPuroParser.CARACTERES_IMPRIMIVEIS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 762;
				this.invocacao();
				}
				break;
			case PortuguesPuroParser.T__57:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 763;
				this.retorno();
				}
				break;
			case PortuguesPuroParser.T__63:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 764;
				this.decodificacao();
				}
				break;
			case PortuguesPuroParser.T__55:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 765;
				this.reiteracao();
				}
				break;
			case PortuguesPuroParser.T__165:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 766;
				this.indirecao();
				}
				break;
			case PortuguesPuroParser.T__66:
			case PortuguesPuroParser.T__167:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 767;
				this.empilhamento();
				}
				break;
			case PortuguesPuroParser.T__59:
				this.enterOuterAlt(_localctx, 8);
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interrupcao(): InterrupcaoContext {
		let _localctx: InterrupcaoContext = new InterrupcaoContext(this._ctx, this.state);
		this.enterRule(_localctx, 158, PortuguesPuroParser.RULE_interrupcao);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 771;
			this.match(PortuguesPuroParser.T__56);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public invocacao(): InvocacaoContext {
		let _localctx: InvocacaoContext = new InvocacaoContext(this._ctx, this.state);
		this.enterRule(_localctx, 160, PortuguesPuroParser.RULE_invocacao);
		try {
			this.state = 776;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 50, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 773;
				this.invocacao_interna();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 774;
				this.invocacao_externa();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 775;
				this.invocacao_indireta();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public invocacao_interna(): Invocacao_internaContext {
		let _localctx: Invocacao_internaContext = new Invocacao_internaContext(this._ctx, this.state);
		this.enterRule(_localctx, 162, PortuguesPuroParser.RULE_invocacao_interna);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 781;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 51, this._ctx) ) {
			case 1:
				{
				this.state = 778;
				this.unidade_semantica();
				}
				break;

			case 2:
				{
				this.state = 779;
				this.express�o();
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
			if (_la === PortuguesPuroParser.ABRE_PARENTESES) {
				{
				this.state = 783;
				this.qualificador();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public invocacao_externa(): Invocacao_externaContext {
		let _localctx: Invocacao_externaContext = new Invocacao_externaContext(this._ctx, this.state);
		this.enterRule(_localctx, 164, PortuguesPuroParser.RULE_invocacao_externa);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
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
			this.nome_da_funcao();
			this.state = 792;
			this.aspas_duplas();
			this.state = 809;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PortuguesPuroParser.T__140) {
				{
				{
				this.state = 793;
				this.com();
				this.state = 794;
				this.express�o();
				}
				this.state = 801;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === PortuguesPuroParser.T__136) {
					{
					{
					this.state = 796;
					this.e();
					this.state = 797;
					this.express�o();
					}
					}
					this.state = 803;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 807;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PortuguesPuroParser.T__65) {
					{
					this.state = 804;
					this.retornando();
					this.state = 805;
					this.termo();
					}
				}

				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public aspas_duplas(): Aspas_duplasContext {
		let _localctx: Aspas_duplasContext = new Aspas_duplasContext(this._ctx, this.state);
		this.enterRule(_localctx, 166, PortuguesPuroParser.RULE_aspas_duplas);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 811;
			this.match(PortuguesPuroParser.ASPAS_DUPLAS);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nome_da_DLL(): Nome_da_DLLContext {
		let _localctx: Nome_da_DLLContext = new Nome_da_DLLContext(this._ctx, this.state);
		this.enterRule(_localctx, 168, PortuguesPuroParser.RULE_nome_da_DLL);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 813;
			this.palavra();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nome_da_funcao(): Nome_da_funcaoContext {
		let _localctx: Nome_da_funcaoContext = new Nome_da_funcaoContext(this._ctx, this.state);
		this.enterRule(_localctx, 170, PortuguesPuroParser.RULE_nome_da_funcao);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 815;
			this.palavra();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public processe(): ProcesseContext {
		let _localctx: ProcesseContext = new ProcesseContext(this._ctx, this.state);
		this.enterRule(_localctx, 172, PortuguesPuroParser.RULE_processe);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 817;
			this.match(PortuguesPuroParser.T__64);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public com(): ComContext {
		let _localctx: ComContext = new ComContext(this._ctx, this.state);
		this.enterRule(_localctx, 174, PortuguesPuroParser.RULE_com);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 819;
			this.match(PortuguesPuroParser.T__140);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public e(): EContext {
		let _localctx: EContext = new EContext(this._ctx, this.state);
		this.enterRule(_localctx, 176, PortuguesPuroParser.RULE_e);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 821;
			this.match(PortuguesPuroParser.T__136);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public retornando(): RetornandoContext {
		let _localctx: RetornandoContext = new RetornandoContext(this._ctx, this.state);
		this.enterRule(_localctx, 178, PortuguesPuroParser.RULE_retornando);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 823;
			this.match(PortuguesPuroParser.T__65);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public invocacao_indireta(): Invocacao_indiretaContext {
		let _localctx: Invocacao_indiretaContext = new Invocacao_indiretaContext(this._ctx, this.state);
		this.enterRule(_localctx, 180, PortuguesPuroParser.RULE_invocacao_indireta);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 825;
			this.processe();
			this.state = 826;
			this.express�o();
			this.state = 842;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PortuguesPuroParser.T__140) {
				{
				this.state = 827;
				this.com();
				this.state = 828;
				this.express�o();
				this.state = 834;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === PortuguesPuroParser.T__136) {
					{
					{
					this.state = 829;
					this.e();
					this.state = 830;
					this.express�o();
					}
					}
					this.state = 836;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 840;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PortuguesPuroParser.T__65) {
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public retorno(): RetornoContext {
		let _localctx: RetornoContext = new RetornoContext(this._ctx, this.state);
		this.enterRule(_localctx, 182, PortuguesPuroParser.RULE_retorno);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 844;
			this.match(PortuguesPuroParser.T__57);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public decodifique(): DecodifiqueContext {
		let _localctx: DecodifiqueContext = new DecodifiqueContext(this._ctx, this.state);
		this.enterRule(_localctx, 184, PortuguesPuroParser.RULE_decodifique);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 846;
			this.match(PortuguesPuroParser.T__63);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public decodificacao(): DecodificacaoContext {
		let _localctx: DecodificacaoContext = new DecodificacaoContext(this._ctx, this.state);
		this.enterRule(_localctx, 186, PortuguesPuroParser.RULE_decodificacao);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 848;
			this.decodifique();
			this.state = 849;
			this.numero_hexadecimal();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public aponte(): AponteContext {
		let _localctx: AponteContext = new AponteContext(this._ctx, this.state);
		this.enterRule(_localctx, 188, PortuguesPuroParser.RULE_aponte);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 851;
			this.match(PortuguesPuroParser.T__165);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public para_rotina(): Para_rotinaContext {
		let _localctx: Para_rotinaContext = new Para_rotinaContext(this._ctx, this.state);
		this.enterRule(_localctx, 190, PortuguesPuroParser.RULE_para_rotina);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 853;
			this.match(PortuguesPuroParser.T__166);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public indirecao(): IndirecaoContext {
		let _localctx: IndirecaoContext = new IndirecaoContext(this._ctx, this.state);
		this.enterRule(_localctx, 192, PortuguesPuroParser.RULE_indirecao);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
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
			case PortuguesPuroParser.CARACTERES_IMPRIMIVEIS:
				{
				this.state = 859;
				this.unidade_semantica();
				}
				break;
			case PortuguesPuroParser.T__5:
			case PortuguesPuroParser.T__6:
			case PortuguesPuroParser.T__7:
			case PortuguesPuroParser.T__8:
			case PortuguesPuroParser.T__13:
			case PortuguesPuroParser.T__14:
			case PortuguesPuroParser.T__15:
			case PortuguesPuroParser.T__16:
				{
				this.state = 860;
				this.parametro();
				}
				break;
			case PortuguesPuroParser.T__1:
			case PortuguesPuroParser.T__2:
			case PortuguesPuroParser.T__3:
			case PortuguesPuroParser.T__4:
			case PortuguesPuroParser.T__9:
			case PortuguesPuroParser.T__10:
			case PortuguesPuroParser.T__11:
			case PortuguesPuroParser.T__12:
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
			if (_la === PortuguesPuroParser.ABRE_PARENTESES) {
				{
				this.state = 864;
				this.qualificador();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public push(): PushContext {
		let _localctx: PushContext = new PushContext(this._ctx, this.state);
		this.enterRule(_localctx, 194, PortuguesPuroParser.RULE_push);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 867;
			_la = this._input.LA(1);
			if (!(_la === PortuguesPuroParser.T__66 || _la === PortuguesPuroParser.T__167)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public empilhamento(): EmpilhamentoContext {
		let _localctx: EmpilhamentoContext = new EmpilhamentoContext(this._ctx, this.state);
		this.enterRule(_localctx, 196, PortuguesPuroParser.RULE_empilhamento);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 869;
			this.push();
			this.state = 870;
			this.express�o();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public reiteracao(): ReiteracaoContext {
		let _localctx: ReiteracaoContext = new ReiteracaoContext(this._ctx, this.state);
		this.enterRule(_localctx, 198, PortuguesPuroParser.RULE_reiteracao);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 872;
			this.match(PortuguesPuroParser.T__55);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public diga(): DigaContext {
		let _localctx: DigaContext = new DigaContext(this._ctx, this.state);
		this.enterRule(_localctx, 200, PortuguesPuroParser.RULE_diga);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 874;
			this.match(PortuguesPuroParser.T__59);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public retorno_booleano(): Retorno_booleanoContext {
		let _localctx: Retorno_booleanoContext = new Retorno_booleanoContext(this._ctx, this.state);
		this.enterRule(_localctx, 202, PortuguesPuroParser.RULE_retorno_booleano);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 876;
			this.diga();
			this.state = 877;
			this.booleano();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public express�o(): Express�oContext {
		let _localctx: Express�oContext = new Express�oContext(this._ctx, this.state);
		this.enterRule(_localctx, 204, PortuguesPuroParser.RULE_express�o);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 879;
			this.termo();
			this.state = 885;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 169)) & ~0x1F) === 0 && ((1 << (_la - 169)) & ((1 << (PortuguesPuroParser.T__168 - 169)) | (1 << (PortuguesPuroParser.T__169 - 169)) | (1 << (PortuguesPuroParser.T__170 - 169)) | (1 << (PortuguesPuroParser.T__171 - 169)) | (1 << (PortuguesPuroParser.T__172 - 169)) | (1 << (PortuguesPuroParser.T__173 - 169)) | (1 << (PortuguesPuroParser.T__174 - 169)) | (1 << (PortuguesPuroParser.T__175 - 169)))) !== 0)) {
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operadores_comuns(): Operadores_comunsContext {
		let _localctx: Operadores_comunsContext = new Operadores_comunsContext(this._ctx, this.state);
		this.enterRule(_localctx, 206, PortuguesPuroParser.RULE_operadores_comuns);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 888;
			_la = this._input.LA(1);
			if (!(((((_la - 169)) & ~0x1F) === 0 && ((1 << (_la - 169)) & ((1 << (PortuguesPuroParser.T__168 - 169)) | (1 << (PortuguesPuroParser.T__169 - 169)) | (1 << (PortuguesPuroParser.T__170 - 169)) | (1 << (PortuguesPuroParser.T__171 - 169)) | (1 << (PortuguesPuroParser.T__172 - 169)) | (1 << (PortuguesPuroParser.T__173 - 169)) | (1 << (PortuguesPuroParser.T__174 - 169)) | (1 << (PortuguesPuroParser.T__175 - 169)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public booleano(): BooleanoContext {
		let _localctx: BooleanoContext = new BooleanoContext(this._ctx, this.state);
		this.enterRule(_localctx, 208, PortuguesPuroParser.RULE_booleano);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 890;
			_la = this._input.LA(1);
			if (!(_la === PortuguesPuroParser.T__60 || _la === PortuguesPuroParser.T__61)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nulo(): NuloContext {
		let _localctx: NuloContext = new NuloContext(this._ctx, this.state);
		this.enterRule(_localctx, 210, PortuguesPuroParser.RULE_nulo);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 892;
			_la = this._input.LA(1);
			if (!(((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & ((1 << (PortuguesPuroParser.T__68 - 69)) | (1 << (PortuguesPuroParser.T__69 - 69)) | (1 << (PortuguesPuroParser.T__70 - 69)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public termo_constante(): Termo_constanteContext {
		let _localctx: Termo_constanteContext = new Termo_constanteContext(this._ctx, this.state);
		this.enterRule(_localctx, 212, PortuguesPuroParser.RULE_termo_constante);
		try {
			this.state = 897;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 62, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 894;
				this.termo_constante_negativo();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 895;
				this.termo_constante_positivo();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 896;
				this.literal();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public termo_constante_negativo(): Termo_constante_negativoContext {
		let _localctx: Termo_constante_negativoContext = new Termo_constante_negativoContext(this._ctx, this.state);
		this.enterRule(_localctx, 214, PortuguesPuroParser.RULE_termo_constante_negativo);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 899;
			this.match(PortuguesPuroParser.HIFEN);
			this.state = 900;
			this.termo_constante();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public termo_constante_positivo(): Termo_constante_positivoContext {
		let _localctx: Termo_constante_positivoContext = new Termo_constante_positivoContext(this._ctx, this.state);
		this.enterRule(_localctx, 216, PortuguesPuroParser.RULE_termo_constante_positivo);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 902;
			this.match(PortuguesPuroParser.SINAL_DE_ADICAO);
			this.state = 903;
			this.termo_constante();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public numero(): NumeroContext {
		let _localctx: NumeroContext = new NumeroContext(this._ctx, this.state);
		this.enterRule(_localctx, 218, PortuguesPuroParser.RULE_numero);
		try {
			this.state = 908;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 63, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 905;
				this.numero_decimal();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 906;
				this.numero_fracionario();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 907;
				this.numero_misto();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let _localctx: LiteralContext = new LiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 220, PortuguesPuroParser.RULE_literal);
		let _la: number;
		try {
			this.state = 918;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PortuguesPuroParser.DIGITO:
			case PortuguesPuroParser.HIFEN:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 910;
				this.numero();
				this.state = 912;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PortuguesPuroParser.CARACTERES_IMPRIMIVEIS) {
					{
					this.state = 911;
					this.nome_do_tipo();
					}
				}

				}
				break;
			case PortuguesPuroParser.ASPAS_DUPLAS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 914;
				this.string_literal();
				}
				break;
			case PortuguesPuroParser.CIFRAO:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 915;
				this.numero_hexadecimal();
				}
				break;
			case PortuguesPuroParser.T__60:
			case PortuguesPuroParser.T__61:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 916;
				this.booleano();
				}
				break;
			case PortuguesPuroParser.T__68:
			case PortuguesPuroParser.T__69:
			case PortuguesPuroParser.T__70:
				this.enterOuterAlt(_localctx, 5);
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public termo(): TermoContext {
		let _localctx: TermoContext = new TermoContext(this._ctx, this.state);
		this.enterRule(_localctx, 222, PortuguesPuroParser.RULE_termo);
		let _la: number;
		try {
			this.state = 936;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 68, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 920;
				this.termo_negativo();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 921;
				this.termo_positivo();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 922;
				this.variavel_local();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 923;
				this.variavel();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 924;
				this.termo_literal();
				this.state = 929;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PortuguesPuroParser.T__176) {
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
				if (_la === PortuguesPuroParser.BARRA_INCLINADA) {
					{
					this.state = 931;
					this.sinal_de_divis�o();
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sinal_de_divis�o(): Sinal_de_divis�oContext {
		let _localctx: Sinal_de_divis�oContext = new Sinal_de_divis�oContext(this._ctx, this.state);
		this.enterRule(_localctx, 224, PortuguesPuroParser.RULE_sinal_de_divis�o);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 938;
			this.match(PortuguesPuroParser.BARRA_INCLINADA);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public como(): ComoContext {
		let _localctx: ComoContext = new ComoContext(this._ctx, this.state);
		this.enterRule(_localctx, 226, PortuguesPuroParser.RULE_como);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 940;
			this.match(PortuguesPuroParser.T__176);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public termo_negativo(): Termo_negativoContext {
		let _localctx: Termo_negativoContext = new Termo_negativoContext(this._ctx, this.state);
		this.enterRule(_localctx, 228, PortuguesPuroParser.RULE_termo_negativo);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 942;
			this.match(PortuguesPuroParser.HIFEN);
			this.state = 943;
			this.termo();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public termo_positivo(): Termo_positivoContext {
		let _localctx: Termo_positivoContext = new Termo_positivoContext(this._ctx, this.state);
		this.enterRule(_localctx, 230, PortuguesPuroParser.RULE_termo_positivo);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 945;
			this.match(PortuguesPuroParser.SINAL_DE_ADICAO);
			this.state = 946;
			this.termo();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variavel_local(): Variavel_localContext {
		let _localctx: Variavel_localContext = new Variavel_localContext(this._ctx, this.state);
		this.enterRule(_localctx, 232, PortuguesPuroParser.RULE_variavel_local);
		let _la: number;
		try {
			this.state = 960;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PortuguesPuroParser.T__5:
			case PortuguesPuroParser.T__6:
			case PortuguesPuroParser.T__7:
			case PortuguesPuroParser.T__8:
			case PortuguesPuroParser.T__13:
			case PortuguesPuroParser.T__14:
			case PortuguesPuroParser.T__15:
			case PortuguesPuroParser.T__16:
				this.enterOuterAlt(_localctx, 1);
				{
				{
				this.state = 948;
				this.artigo_indefinido();
				this.state = 949;
				this.nome();
				this.state = 953;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 72)) & ~0x1F) === 0 && ((1 << (_la - 72)) & ((1 << (PortuguesPuroParser.T__71 - 72)) | (1 << (PortuguesPuroParser.T__72 - 72)) | (1 << (PortuguesPuroParser.T__73 - 72)) | (1 << (PortuguesPuroParser.T__74 - 72)) | (1 << (PortuguesPuroParser.T__75 - 72)) | (1 << (PortuguesPuroParser.T__76 - 72)) | (1 << (PortuguesPuroParser.T__77 - 72)) | (1 << (PortuguesPuroParser.T__78 - 72)))) !== 0)) {
					{
					this.state = 950;
					this.denominacoes();
					this.state = 951;
					this.nome();
					}
				}

				}
				}
				break;
			case PortuguesPuroParser.T__1:
			case PortuguesPuroParser.T__2:
			case PortuguesPuroParser.T__3:
			case PortuguesPuroParser.T__4:
			case PortuguesPuroParser.T__9:
			case PortuguesPuroParser.T__10:
			case PortuguesPuroParser.T__11:
			case PortuguesPuroParser.T__12:
				this.enterOuterAlt(_localctx, 2);
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variavel(): VariavelContext {
		let _localctx: VariavelContext = new VariavelContext(this._ctx, this.state);
		this.enterRule(_localctx, 234, PortuguesPuroParser.RULE_variavel);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 962;
			this.artigo_definido();
			this.state = 963;
			this.possessivo_portugu�s();
			this.state = 964;
			this.p2();
			this.state = 965;
			this.nome();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public termo_literal(): Termo_literalContext {
		let _localctx: Termo_literalContext = new Termo_literalContext(this._ctx, this.state);
		this.enterRule(_localctx, 236, PortuguesPuroParser.RULE_termo_literal);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 967;
			this.literal();
			this.state = 968;
			this.possessivos_ingl�s();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public conte�do(): Conte�doContext {
		let _localctx: Conte�doContext = new Conte�doContext(this._ctx, this.state);
		this.enterRule(_localctx, 238, PortuguesPuroParser.RULE_conte�do);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 970;
			this.match(PortuguesPuroParser.T__177);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public magnitude(): MagnitudeContext {
		let _localctx: MagnitudeContext = new MagnitudeContext(this._ctx, this.state);
		this.enterRule(_localctx, 240, PortuguesPuroParser.RULE_magnitude);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 972;
			this.match(PortuguesPuroParser.T__178);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public endere�amento(): Endere�amentoContext {
		let _localctx: Endere�amentoContext = new Endere�amentoContext(this._ctx, this.state);
		this.enterRule(_localctx, 242, PortuguesPuroParser.RULE_endere�amento);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 974;
			this.match(PortuguesPuroParser.T__179);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public possessivos_ingl�s(): Possessivos_ingl�sContext {
		let _localctx: Possessivos_ingl�sContext = new Possessivos_ingl�sContext(this._ctx, this.state);
		this.enterRule(_localctx, 244, PortuguesPuroParser.RULE_possessivos_ingl�s);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 979;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === PortuguesPuroParser.T__180) {
				{
				{
				this.state = 976;
				this.possessivo_ingl�s_antigo();
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public possessivo_ingl�s_antigo(): Possessivo_ingl�s_antigoContext {
		let _localctx: Possessivo_ingl�s_antigoContext = new Possessivo_ingl�s_antigoContext(this._ctx, this.state);
		this.enterRule(_localctx, 246, PortuguesPuroParser.RULE_possessivo_ingl�s_antigo);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 982;
			this.apostrofo();
			this.state = 988;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PortuguesPuroParser.CARACTERES_IMPRIMIVEIS:
				{
				this.state = 983;
				this.nome();
				}
				break;
			case PortuguesPuroParser.T__158:
			case PortuguesPuroParser.T__160:
				{
				this.state = 984;
				this.funcao();
				}
				break;
			case PortuguesPuroParser.T__177:
				{
				this.state = 985;
				this.conte�do();
				}
				break;
			case PortuguesPuroParser.T__178:
				{
				this.state = 986;
				this.magnitude();
				}
				break;
			case PortuguesPuroParser.T__179:
				{
				this.state = 987;
				this.endere�amento();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public possessivo_portugu�s(): Possessivo_portugu�sContext {
		let _localctx: Possessivo_portugu�sContext = new Possessivo_portugu�sContext(this._ctx, this.state);
		this.enterRule(_localctx, 248, PortuguesPuroParser.RULE_possessivo_portugu�s);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 995;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PortuguesPuroParser.CARACTERES_IMPRIMIVEIS:
				{
				this.state = 990;
				this.nome();
				}
				break;
			case PortuguesPuroParser.T__158:
			case PortuguesPuroParser.T__160:
				{
				this.state = 991;
				this.funcao();
				}
				break;
			case PortuguesPuroParser.T__177:
				{
				this.state = 992;
				this.conte�do();
				}
				break;
			case PortuguesPuroParser.T__178:
				{
				this.state = 993;
				this.magnitude();
				}
				break;
			case PortuguesPuroParser.T__179:
				{
				this.state = 994;
				this.endere�amento();
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
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public apostrofo(): ApostrofoContext {
		let _localctx: ApostrofoContext = new ApostrofoContext(this._ctx, this.state);
		this.enterRule(_localctx, 250, PortuguesPuroParser.RULE_apostrofo);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 999;
			this.match(PortuguesPuroParser.T__180);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	private static readonly _serializedATNSegments: number = 2;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\xCF\u03EC\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
		"\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12" +
		"\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17" +
		"\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C" +
		"\x04\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04" +
		"#\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t" +
		"+\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x04" +
		"4\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04" +
		"=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04" +
		"F\tF\x04G\tG\x04H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04M\tM\x04N\tN\x04" +
		"O\tO\x04P\tP\x04Q\tQ\x04R\tR\x04S\tS\x04T\tT\x04U\tU\x04V\tV\x04W\tW\x04" +
		"X\tX\x04Y\tY\x04Z\tZ\x04[\t[\x04\\\t\\\x04]\t]\x04^\t^\x04_\t_\x04`\t" +
		"`\x04a\ta\x04b\tb\x04c\tc\x04d\td\x04e\te\x04f\tf\x04g\tg\x04h\th\x04" +
		"i\ti\x04j\tj\x04k\tk\x04l\tl\x04m\tm\x04n\tn\x04o\to\x04p\tp\x04q\tq\x04" +
		"r\tr\x04s\ts\x04t\tt\x04u\tu\x04v\tv\x04w\tw\x04x\tx\x04y\ty\x04z\tz\x04" +
		"{\t{\x04|\t|\x04}\t}\x04~\t~\x04\x7F\t\x7F\x03\x02\x03\x02\x03\x03\x06" +
		"\x03\u0102\n\x03\r\x03\x0E\x03\u0103\x03\x04\x03\x04\x03\x04\x03\x05\x03" +
		"\x05\x05\x05\u010B\n\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06" +
		"\u0112\n\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x05\x07\u0119\n\x07" +
		"\x03\b\x03\b\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03" +
		"\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x05" +
		"\n\u0132\n\n\x03\v\x03\v\x03\f\x03\f\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E" +
		"\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E\u0143\n\x0E\x03" +
		"\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03" +
		"\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03" +
		"\x0F\x05\x0F\u0158\n\x0F\x03\x10\x03\x10\x03\x11\x03\x11\x03\x12\x03\x12" +
		"\x03\x13\x03\x13\x05\x13\u0162\n\x13\x03\x14\x03\x14\x07\x14\u0166\n\x14" +
		"\f\x14\x0E\x14\u0169\v\x14\x03\x14\x03\x14\x03\x15\x03\x15\x07\x15\u016F" +
		"\n\x15\f\x15\x0E\x15\u0172\v\x15\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16" +
		"\x03\x16\x05\x16\u017A\n\x16\x03\x17\x03\x17\x03\x17\x03\x18\x03\x18\x03" +
		"\x19\x03\x19\x03\x1A\x03\x1A\x03\x1A\x03\x1B\x03\x1B\x07\x1B\u0188\n\x1B" +
		"\f\x1B\x0E\x1B\u018B\v\x1B\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x03\x1C\x03" +
		"\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x05" +
		"\x1C\u019B\n\x1C\x03\x1D\x03\x1D\x03\x1E\x03\x1E\x03\x1F\x03\x1F\x03\x1F" +
		"\x05\x1F\u01A4\n\x1F\x03 \x06 \u01A7\n \r \x0E \u01A8\x03!\x05!\u01AC" +
		"\n!\x03!\x03!\x03\"\x03\"\x03\"\x03\"\x03#\x03#\x03#\x03#\x03$\x03$\x03" +
		"$\x03%\x03%\x07%\u01BD\n%\f%\x0E%\u01C0\v%\x03%\x03%\x03&\x03&\x03&\x05" +
		"&\u01C7\n&\x03\'\x03\'\x03(\x03(\x03(\x03(\x03(\x03(\x05(\u01D1\n(\x03" +
		"(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03" +
		"(\x03(\x03(\x03(\x05(\u01E5\n(\x03)\x03)\x03*\x03*\x03+\x03+\x03+\x03" +
		"+\x03+\x03+\x03+\x05+\u01F2\n+\x03,\x03,\x03,\x03,\x07,\u01F8\n,\f,\x0E" +
		",\u01FB\v,\x03-\x03-\x03.\x03.\x03/\x03/\x03/\x03/\x05/\u0205\n/\x03/" +
		"\x03/\x03/\x03/\x03/\x03/\x03/\x03/\x05/\u020F\n/\x030\x030\x031\x061" +
		"\u0214\n1\r1\x0E1\u0215\x032\x032\x033\x033\x034\x034\x035\x035\x036\x03" +
		"6\x037\x037\x037\x037\x037\x037\x057\u0228\n7\x037\x037\x037\x037\x03" +
		"7\x037\x037\x037\x037\x037\x037\x037\x037\x037\x037\x037\x037\x037\x03" +
		"7\x037\x037\x037\x037\x037\x037\x037\x057\u0244\n7\x038\x038\x038\x03" +
		"8\x058\u024A\n8\x039\x059\u024D\n9\x039\x039\x039\x039\x039\x039\x059" +
		"\u0255\n9\x039\x039\x039\x039\x039\x059\u025C\n9\x039\x039\x03:\x03:\x03" +
		";\x05;\u0263\n;\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x05;\u026C\n;\x03;" +
		"\x03;\x03;\x03;\x03;\x03;\x05;\u0274\n;\x03<\x03<\x03=\x03=\x03>\x05>" +
		"\u027B\n>\x03>\x03>\x03>\x03>\x03>\x03>\x03>\x03>\x03>\x03>\x03>\x03>" +
		"\x03>\x05>\u028A\n>\x03>\x03>\x03>\x03>\x03>\x03>\x03>\x03>\x03>\x03>" +
		"\x03>\x03>\x05>\u0298\n>\x03>\x03>\x03?\x03?\x03@\x03@\x03A\x03A\x03B" +
		"\x03B\x03C\x05C\u02A5\nC\x03C\x03C\x03C\x03C\x03C\x03C\x03C\x05C\u02AE" +
		"\nC\x03C\x03C\x03C\x03C\x03C\x03C\x05C\u02B6\nC\x03C\x03C\x03D\x03D\x03" +
		"D\x03D\x05D\u02BE\nD\x05D\u02C0\nD\x03E\x03E\x03F\x03F\x03F\x03F\x03F" +
		"\x05F\u02C9\nF\x03G\x03G\x03G\x03H\x06H\u02CF\nH\rH\x0EH\u02D0\x03I\x03" +
		"I\x03I\x03I\x03I\x03I\x05I\u02D9\nI\x03J\x03J\x03K\x03K\x03K\x03L\x03" +
		"L\x03M\x03M\x03N\x03N\x03N\x03N\x03N\x03N\x07N\u02EA\nN\fN\x0EN\u02ED" +
		"\vN\x03N\x03N\x03O\x06O\u02F2\nO\rO\x0EO\u02F3\x03O\x05O\u02F7\nO\x03" +
		"O\x05O\u02FA\nO\x03P\x03P\x03P\x03P\x03P\x03P\x03P\x03P\x05P\u0304\nP" +
		"\x03Q\x03Q\x03R\x03R\x03R\x05R\u030B\nR\x03S\x03S\x03S\x05S\u0310\nS\x03" +
		"S\x05S\u0313\nS\x03T\x03T\x03T\x03T\x03T\x03T\x03T\x03T\x03T\x03T\x03" +
		"T\x03T\x03T\x07T\u0322\nT\fT\x0ET\u0325\vT\x03T\x03T\x03T\x05T\u032A\n" +
		"T\x05T\u032C\nT\x03U\x03U\x03V\x03V\x03W\x03W\x03X\x03X\x03Y\x03Y\x03" +
		"Z\x03Z\x03[\x03[\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x07\\\u0343" +
		"\n\\\f\\\x0E\\\u0346\v\\\x03\\\x03\\\x03\\\x05\\\u034B\n\\\x05\\\u034D" +
		"\n\\\x03]\x03]\x03^\x03^\x03_\x03_\x03_\x03`\x03`\x03a\x03a\x03b\x03b" +
		"\x03b\x03b\x03b\x03b\x03b\x05b\u0361\nb\x03b\x05b\u0364\nb\x03c\x03c\x03" +
		"d\x03d\x03d\x03e\x03e\x03f\x03f\x03g\x03g\x03g\x03h\x03h\x03h\x03h\x07" +
		"h\u0376\nh\fh\x0Eh\u0379\vh\x03i\x03i\x03j\x03j\x03k\x03k\x03l\x03l\x03" +
		"l\x05l\u0384\nl\x03m\x03m\x03m\x03n\x03n\x03n\x03o\x03o\x03o\x05o\u038F" +
		"\no\x03p\x03p\x05p\u0393\np\x03p\x03p\x03p\x03p\x05p\u0399\np\x03q\x03" +
		"q\x03q\x03q\x03q\x03q\x03q\x03q\x03q\x05q\u03A4\nq\x03q\x03q\x03q\x05" +
		"q\u03A9\nq\x05q\u03AB\nq\x03r\x03r\x03s\x03s\x03t\x03t\x03t\x03u\x03u" +
		"\x03u\x03v\x03v\x03v\x03v\x03v\x05v\u03BC\nv\x03v\x03v\x03v\x03v\x03v" +
		"\x05v\u03C3\nv\x03w\x03w\x03w\x03w\x03w\x03x\x03x\x03x\x03y\x03y\x03z" +
		"\x03z\x03{\x03{\x03|\x07|\u03D4\n|\f|\x0E|\u03D7\v|\x03}\x03}\x03}\x03" +
		"}\x03}\x03}\x05}\u03DF\n}\x03~\x03~\x03~\x03~\x03~\x05~\u03E6\n~\x03~" +
		"\x03~\x03\x7F\x03\x7F\x03\x7F\x02\x02\x02\x80\x02\x02\x04\x02\x06\x02" +
		"\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A" +
		"\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x02" +
		"4\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02" +
		"P\x02R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02f\x02h\x02j\x02" +
		"l\x02n\x02p\x02r\x02t\x02v\x02x\x02z\x02|\x02~\x02\x80\x02\x82\x02\x84" +
		"\x02\x86\x02\x88\x02\x8A\x02\x8C\x02\x8E\x02\x90\x02\x92\x02\x94\x02\x96" +
		"\x02\x98\x02\x9A\x02\x9C\x02\x9E\x02\xA0\x02\xA2\x02\xA4\x02\xA6\x02\xA8" +
		"\x02\xAA\x02\xAC\x02\xAE\x02\xB0\x02\xB2\x02\xB4\x02\xB6\x02\xB8\x02\xBA" +
		"\x02\xBC\x02\xBE\x02\xC0\x02\xC2\x02\xC4\x02\xC6\x02\xC8\x02\xCA\x02\xCC" +
		"\x02\xCE\x02\xD0\x02\xD2\x02\xD4\x02\xD6\x02\xD8\x02\xDA\x02\xDC\x02\xDE" +
		"\x02\xE0\x02\xE2\x02\xE4\x02\xE6\x02\xE8\x02\xEA\x02\xEC\x02\xEE\x02\xF0" +
		"\x02\xF2\x02\xF4\x02\xF6\x02\xF8\x02\xFA\x02\xFC\x02\x02#\x03\x02\f\x0F" +
		"\x03\x02\x10\x13\x03\x02$\'\x03\x02(+\x03\x02,/\x03\x02JQ\x04\x02\x15" +
		"\x15Rg\x04\x02\xC0\xC1\xCF\xCF\x07\x02hm\xB8\xB9\xBE\xBF\xC3\xC3\xC5\xC5" +
		"\x06\x02hm\xB8\xB9\xBC\xBC\xBF\xBF\x03\x02\xB8\xB8\x03\x02\xB9\xB9\x03" +
		"\x02hh\x03\x02ii\x03\x02jj\x03\x02kk\x03\x02ll\x03\x02\xBF\xBF\x03\x02" +
		"mm\x03\x02\xBE\xBE\x03\x02\xC5\xC5\x03\x02\xC3\xC3\x04\x02no\xC6\xC9\x06" +
		"\x02pv\xBE\xBE\xC3\xC3\xC5\xC5\x03\x02w\x87\x04\x02\x8B\x8C\xC7\xC8\x03" +
		"\x02\x8B\x8D\x05\x02\x1C\x1D\x8A\x8A\x8E\x9F\x04\x02\x15\x15VV\x04\x02" +
		"EE\xAA\xAA\x03\x02\xAB\xB2\x03\x02?@\x03\x02GI\x02\u0415\x02\xFE\x03\x02" +
		"\x02\x02\x04\u0101\x03\x02\x02\x02\x06\u0105\x03\x02\x02\x02\b\u010A\x03" +
		"\x02\x02\x02\n\u0111\x03\x02\x02\x02\f\u0118\x03\x02\x02\x02\x0E\u011A" +
		"\x03\x02\x02\x02\x10\u011C\x03\x02\x02\x02\x12\u0131\x03\x02\x02\x02\x14" +
		"\u0133\x03\x02\x02\x02\x16\u0135\x03\x02\x02\x02\x18\u0137\x03\x02\x02" +
		"\x02\x1A\u0142\x03\x02\x02\x02\x1C\u0157\x03\x02\x02\x02\x1E\u0159\x03" +
		"\x02\x02\x02 \u015B\x03\x02\x02\x02\"\u015D\x03\x02\x02\x02$\u0161\x03" +
		"\x02\x02\x02&\u0163\x03\x02\x02\x02(\u016C\x03\x02\x02\x02*\u0179\x03" +
		"\x02\x02\x02,\u017B\x03\x02\x02\x02.\u017E\x03\x02\x02\x020\u0180\x03" +
		"\x02\x02\x022\u0182\x03\x02\x02\x024\u0185\x03\x02\x02\x026\u019A\x03" +
		"\x02\x02\x028\u019C\x03\x02\x02\x02:\u019E\x03\x02\x02\x02<\u01A3\x03" +
		"\x02\x02\x02>\u01A6\x03\x02\x02\x02@\u01AB\x03\x02\x02\x02B\u01AF\x03" +
		"\x02\x02\x02D\u01B3\x03\x02\x02\x02F\u01B7\x03\x02\x02\x02H\u01BA\x03" +
		"\x02\x02\x02J\u01C6\x03\x02\x02\x02L\u01C8\x03\x02\x02\x02N\u01E4\x03" +
		"\x02\x02\x02P\u01E6\x03\x02\x02\x02R\u01E8\x03\x02\x02\x02T\u01F1\x03" +
		"\x02\x02\x02V\u01F3\x03\x02\x02\x02X\u01FC\x03\x02\x02\x02Z\u01FE\x03" +
		"\x02\x02\x02\\\u0204\x03\x02\x02\x02^\u0210\x03\x02\x02\x02`\u0213\x03" +
		"\x02\x02\x02b\u0217\x03\x02\x02\x02d\u0219\x03\x02\x02\x02f\u021B\x03" +
		"\x02\x02\x02h\u021D\x03\x02\x02\x02j\u021F\x03\x02\x02\x02l\u0243\x03" +
		"\x02\x02\x02n\u0249\x03\x02\x02\x02p\u025B\x03\x02\x02\x02r\u025F\x03" +
		"\x02\x02\x02t\u0273\x03\x02\x02\x02v\u0275\x03\x02\x02\x02x\u0277\x03" +
		"\x02\x02\x02z\u0297\x03\x02\x02\x02|\u029B\x03\x02\x02\x02~\u029D\x03" +
		"\x02\x02\x02\x80\u029F\x03\x02\x02\x02\x82\u02A1\x03\x02\x02\x02\x84\u02B5" +
		"\x03\x02\x02\x02\x86\u02BF\x03\x02\x02\x02\x88\u02C1\x03\x02\x02\x02\x8A" +
		"\u02C3\x03\x02\x02\x02\x8C\u02CA\x03\x02\x02\x02\x8E\u02CE\x03\x02\x02" +
		"\x02\x90\u02D8\x03\x02\x02\x02\x92\u02DA\x03\x02\x02\x02\x94\u02DC\x03" +
		"\x02\x02\x02\x96\u02DF\x03\x02\x02\x02\x98\u02E1\x03\x02\x02\x02\x9A\u02E3" +
		"\x03\x02\x02\x02\x9C\u02F1\x03\x02\x02\x02\x9E\u0303\x03\x02\x02\x02\xA0" +
		"\u0305\x03\x02\x02\x02\xA2\u030A\x03\x02\x02\x02\xA4\u030F\x03\x02\x02" +
		"\x02\xA6\u0314\x03\x02\x02\x02\xA8\u032D\x03\x02\x02\x02\xAA\u032F\x03" +
		"\x02\x02\x02\xAC\u0331\x03\x02\x02\x02\xAE\u0333\x03\x02\x02\x02\xB0\u0335" +
		"\x03\x02\x02\x02\xB2\u0337\x03\x02\x02\x02\xB4\u0339\x03\x02\x02\x02\xB6" +
		"\u033B\x03\x02\x02\x02\xB8\u034E\x03\x02\x02\x02\xBA\u0350\x03\x02\x02" +
		"\x02\xBC\u0352\x03\x02\x02\x02\xBE\u0355\x03\x02\x02\x02\xC0\u0357\x03" +
		"\x02\x02\x02\xC2\u0359\x03\x02\x02\x02\xC4\u0365\x03\x02\x02\x02\xC6\u0367" +
		"\x03\x02\x02\x02\xC8\u036A\x03\x02\x02\x02\xCA\u036C\x03\x02\x02\x02\xCC" +
		"\u036E\x03\x02\x02\x02\xCE\u0371\x03\x02\x02\x02\xD0\u037A\x03\x02\x02" +
		"\x02\xD2\u037C\x03\x02\x02\x02\xD4\u037E\x03\x02\x02\x02\xD6\u0383\x03" +
		"\x02\x02\x02\xD8\u0385\x03\x02\x02\x02\xDA\u0388\x03\x02\x02\x02\xDC\u038E" +
		"\x03\x02\x02\x02\xDE\u0398\x03\x02\x02\x02\xE0\u03AA\x03\x02\x02\x02\xE2" +
		"\u03AC\x03\x02\x02\x02\xE4\u03AE\x03\x02\x02\x02\xE6\u03B0\x03\x02\x02" +
		"\x02\xE8\u03B3\x03\x02\x02\x02\xEA\u03C2\x03\x02\x02\x02\xEC\u03C4\x03" +
		"\x02\x02\x02\xEE\u03C9\x03\x02\x02\x02\xF0\u03CC\x03\x02\x02\x02\xF2\u03CE" +
		"\x03\x02\x02\x02\xF4\u03D0\x03\x02\x02\x02\xF6\u03D5\x03\x02\x02\x02\xF8" +
		"\u03D8\x03\x02\x02\x02\xFA\u03E5\x03\x02\x02\x02\xFC\u03E9\x03\x02\x02" +
		"\x02\xFE\xFF\x07\x03\x02\x02\xFF\x03\x03\x02\x02\x02\u0100\u0102\x07\xCE" +
		"\x02\x02\u0101\u0100\x03\x02\x02\x02\u0102\u0103\x03\x02\x02\x02\u0103" +
		"\u0101\x03\x02\x02\x02\u0103\u0104\x03\x02\x02\x02\u0104\x05\x03\x02\x02" +
		"\x02\u0105\u0106\x05\x04\x03\x02\u0106\u0107\x07\xBC\x02\x02\u0107\x07" +
		"\x03\x02\x02\x02\u0108\u010B\x05\n\x06\x02\u0109\u010B\x05\f\x07\x02\u010A" +
		"\u0108\x03\x02\x02\x02\u010A\u0109\x03\x02\x02\x02\u010B\t\x03\x02\x02" +
		"\x02\u010C\u0112\x07\x04\x02\x02\u010D\u0112\x07\x05\x02\x02\u010E\u0112" +
		"\x07\x06\x02\x02\u010F\u0112\x07\x07\x02\x02\u0110\u0112\x05\x0E\b\x02" +
		"\u0111\u010C\x03\x02\x02\x02\u0111\u010D\x03\x02\x02\x02\u0111\u010E\x03" +
		"\x02\x02\x02\u0111\u010F\x03\x02\x02\x02\u0111\u0110\x03\x02\x02\x02\u0112" +
		"\v\x03\x02\x02\x02\u0113\u0119\x07\b\x02\x02\u0114\u0119\x07\t\x02\x02" +
		"\u0115\u0119\x07\n\x02\x02\u0116\u0119\x07\v\x02\x02\u0117\u0119\x05\x10" +
		"\t\x02\u0118\u0113\x03\x02\x02\x02\u0118\u0114\x03\x02\x02\x02\u0118\u0115" +
		"\x03\x02\x02\x02\u0118\u0116\x03\x02\x02\x02\u0118\u0117\x03\x02\x02\x02" +
		"\u0119\r\x03\x02\x02\x02\u011A\u011B\t\x02\x02\x02\u011B\x0F\x03\x02\x02" +
		"\x02\u011C\u011D\t\x03\x02\x02\u011D\x11\x03\x02\x02\x02\u011E\u0132\x07" +
		"\x14\x02\x02\u011F\u0132\x07\x15\x02\x02\u0120\u0132\x07\x16\x02\x02\u0121" +
		"\u0132\x07\x17\x02\x02\u0122\u0132\x07\x18\x02\x02\u0123\u0132\x07\x19" +
		"\x02\x02\u0124\u0132\x07\x1A\x02\x02\u0125\u0132\x07\x1B\x02\x02\u0126" +
		"\u0132\x07\x1C\x02\x02\u0127\u0132\x07\x1D\x02\x02\u0128\u0132\x07\x1E" +
		"\x02\x02\u0129\u0132\x07\x1F\x02\x02\u012A\u0132\x07 \x02\x02\u012B\u0132" +
		"\x07!\x02\x02\u012C\u0132\x07\"\x02\x02\u012D\u0132\x07#\x02\x02\u012E" +
		"\u0132\x05\x14\v\x02\u012F\u0132\x05\x16\f\x02\u0130\u0132\x05\x18\r\x02" +
		"\u0131\u011E\x03\x02\x02\x02\u0131\u011F\x03\x02\x02\x02\u0131\u0120\x03" +
		"\x02\x02\x02\u0131\u0121\x03\x02\x02\x02\u0131\u0122\x03\x02\x02\x02\u0131" +
		"\u0123\x03\x02\x02\x02\u0131\u0124\x03\x02\x02\x02\u0131\u0125\x03\x02" +
		"\x02\x02\u0131\u0126\x03\x02\x02\x02\u0131\u0127\x03\x02\x02\x02\u0131" +
		"\u0128\x03\x02\x02\x02\u0131\u0129\x03\x02\x02\x02\u0131\u012A\x03\x02" +
		"\x02\x02\u0131\u012B\x03\x02\x02\x02\u0131\u012C\x03\x02\x02\x02\u0131" +
		"\u012D\x03\x02\x02\x02\u0131\u012E\x03\x02\x02\x02\u0131\u012F\x03\x02" +
		"\x02\x02\u0131\u0130\x03\x02\x02\x02\u0132\x13\x03\x02\x02\x02\u0133\u0134" +
		"\t\x04\x02\x02\u0134\x15\x03\x02\x02\x02\u0135\u0136\t\x05\x02\x02\u0136" +
		"\x17\x03\x02\x02\x02\u0137\u0138\t\x06\x02\x02\u0138\x19\x03\x02\x02\x02" +
		"\u0139\u0143\x03\x02\x02\x02\u013A\u0143\x070\x02\x02\u013B\u0143\x07" +
		"1\x02\x02\u013C\u0143\x072\x02\x02\u013D\u0143\x073\x02\x02\u013E\u0143" +
		"\x074\x02\x02\u013F\u0143\x075\x02\x02\u0140\u0143\x076\x02\x02\u0141" +
		"\u0143\x077\x02\x02\u0142\u0139\x03\x02\x02\x02\u0142\u013A\x03\x02\x02" +
		"\x02\u0142\u013B\x03\x02\x02\x02\u0142\u013C\x03\x02\x02\x02\u0142\u013D" +
		"\x03\x02\x02\x02\u0142\u013E\x03\x02\x02\x02\u0142\u013F\x03\x02\x02\x02" +
		"\u0142\u0140\x03\x02\x02\x02\u0142\u0141\x03\x02\x02\x02\u0143\x1B\x03" +
		"\x02\x02\x02\u0144\u0158\x078\x02\x02\u0145\u0158\x079\x02\x02\u0146\u0158" +
		"\x07:\x02\x02\u0147\u0158\x07;\x02\x02\u0148\u0158\x07<\x02\x02\u0149" +
		"\u0158\x07=\x02\x02\u014A\u0158\x07>\x02\x02\u014B\u0158\x07?\x02\x02" +
		"\u014C\u0158\x07@\x02\x02\u014D\u0158\x07A\x02\x02\u014E\u0158\x07B\x02" +
		"\x02\u014F\u0158\x07C\x02\x02\u0150\u0158\x07D\x02\x02\u0151\u0158\x07" +
		"E\x02\x02\u0152\u0158\x07F\x02\x02\u0153\u0158\x07G\x02\x02\u0154\u0158" +
		"\x07H\x02\x02\u0155\u0158\x07I\x02\x02\u0156\u0158\x05\x1E\x10\x02\u0157" +
		"\u0144\x03\x02\x02\x02\u0157\u0145\x03\x02\x02\x02\u0157\u0146\x03\x02" +
		"\x02\x02\u0157\u0147\x03\x02\x02\x02\u0157\u0148\x03\x02\x02\x02\u0157" +
		"\u0149\x03\x02\x02\x02\u0157\u014A\x03\x02\x02\x02\u0157\u014B\x03\x02" +
		"\x02\x02\u0157\u014C\x03\x02\x02\x02\u0157\u014D\x03\x02\x02\x02\u0157" +
		"\u014E\x03\x02\x02\x02\u0157\u014F\x03\x02\x02\x02\u0157\u0150\x03\x02" +
		"\x02\x02\u0157\u0151\x03\x02\x02\x02\u0157\u0152\x03\x02\x02\x02\u0157" +
		"\u0153\x03\x02\x02\x02\u0157\u0154\x03\x02\x02\x02\u0157\u0155\x03\x02" +
		"\x02\x02\u0157\u0156\x03\x02\x02\x02\u0158\x1D\x03\x02\x02\x02\u0159\u015A" +
		"\t\x07\x02\x02\u015A\x1F\x03\x02\x02\x02\u015B\u015C\t\b\x02\x02\u015C" +
		"!\x03\x02\x02\x02\u015D\u015E\t\t\x02\x02\u015E#\x03\x02\x02\x02\u015F" +
		"\u0162\x05&\x14\x02\u0160\u0162\x05(\x15\x02\u0161\u015F\x03\x02\x02\x02" +
		"\u0161\u0160\x03\x02\x02\x02\u0162%\x03\x02\x02\x02\u0163\u0167\x07\xC4" +
		"\x02\x02\u0164\u0166\x07\xCE\x02\x02\u0165\u0164\x03\x02\x02\x02\u0166" +
		"\u0169\x03\x02\x02\x02\u0167\u0165\x03\x02\x02\x02\u0167\u0168\x03\x02" +
		"\x02\x02\u0168\u016A\x03\x02\x02\x02\u0169\u0167\x03\x02\x02\x02\u016A" +
		"\u016B\x07\xC2\x02\x02\u016B\'\x03\x02\x02\x02\u016C\u0170\x07\xCC\x02" +
		"\x02\u016D\u016F\x07\xCE\x02\x02\u016E\u016D\x03\x02\x02\x02\u016F\u0172" +
		"\x03\x02\x02\x02\u0170\u016E\x03\x02\x02\x02\u0170\u0171\x03\x02\x02\x02" +
		"\u0171\u0173\x03\x02\x02\x02\u0172\u0170\x03\x02\x02\x02\u0173\u0174\x07" +
		"\xCD\x02\x02\u0174)\x03\x02\x02\x02\u0175\u017A\x05,\x17\x02\u0176\u017A" +
		"\x05\x06\x04\x02\u0177\u017A\x054\x1B\x02\u0178\u017A\x05H%\x02\u0179" +
		"\u0175\x03\x02\x02\x02\u0179\u0176\x03\x02\x02\x02\u0179\u0177\x03\x02" +
		"\x02\x02\u0179\u0178\x03\x02\x02\x02\u017A+\x03\x02\x02\x02\u017B\u017C" +
		"\x050\x19\x02\u017C\u017D\x05.\x18\x02\u017D-\x03\x02\x02\x02\u017E\u017F" +
		"\t\n\x02\x02\u017F/\x03\x02\x02\x02\u0180\u0181\t\v\x02\x02\u01811\x03" +
		"\x02\x02\x02\u0182\u0183\x05\xFC\x7F\x02\u0183\u0184\x056\x1C\x02\u0184" +
		"3\x03\x02\x02\x02\u0185\u0189\x07\xCA\x02\x02\u0186\u0188\x07\xCE\x02" +
		"\x02\u0187\u0186\x03\x02\x02\x02\u0188\u018B\x03\x02\x02\x02\u0189\u0187" +
		"\x03\x02\x02\x02\u0189\u018A\x03\x02\x02\x02\u018A\u018C\x03\x02\x02\x02" +
		"\u018B\u0189\x03\x02\x02\x02\u018C\u018D\x07\xCB\x02\x02\u018D5\x03\x02" +
		"\x02\x02\u018E\u019B\n\f\x02\x02\u018F\u019B\n\r\x02\x02\u0190\u019B\n" +
		"\x0E\x02\x02\u0191\u019B\n\x0F\x02\x02\u0192\u019B\n\x10\x02\x02\u0193" +
		"\u019B\n\x11\x02\x02\u0194\u019B\n\x12\x02\x02\u0195\u019B\n\x13\x02\x02" +
		"\u0196\u019B\n\x14\x02\x02\u0197\u019B\n\x15\x02\x02\u0198\u019B\n\x16" +
		"\x02\x02\u0199\u019B\n\x17\x02\x02\u019A\u018E\x03\x02\x02\x02\u019A\u018F" +
		"\x03\x02\x02\x02\u019A\u0190\x03\x02\x02\x02\u019A\u0191\x03\x02\x02\x02" +
		"\u019A\u0192\x03\x02\x02\x02\u019A\u0193\x03\x02\x02\x02\u019A\u0194\x03" +
		"\x02\x02\x02\u019A\u0195\x03\x02\x02\x02\u019A\u0196\x03\x02\x02\x02\u019A" +
		"\u0197\x03\x02\x02\x02\u019A\u0198\x03\x02\x02\x02\u019A\u0199\x03\x02" +
		"\x02\x02\u019B7\x03\x02\x02\x02\u019C\u019D\t\x18\x02\x02\u019D9\x03\x02" +
		"\x02\x02\u019E\u019F\t\x19\x02\x02\u019F;\x03\x02\x02\x02\u01A0\u01A4" +
		"\x05\"\x12\x02\u01A1\u01A4\x05$\x13\x02\u01A2\u01A4\x054\x1B\x02\u01A3" +
		"\u01A0\x03\x02\x02\x02\u01A3\u01A1\x03\x02\x02\x02\u01A3\u01A2\x03\x02" +
		"\x02\x02\u01A4=\x03\x02\x02\x02\u01A5\u01A7\x07\xB9\x02\x02\u01A6\u01A5" +
		"\x03\x02\x02\x02\u01A7\u01A8\x03\x02\x02\x02\u01A8\u01A6\x03\x02\x02\x02" +
		"\u01A8\u01A9\x03\x02\x02\x02\u01A9?\x03\x02\x02\x02\u01AA\u01AC\x07\xBE" +
		"\x02\x02\u01AB\u01AA\x03\x02\x02\x02\u01AB\u01AC\x03\x02\x02\x02\u01AC" +
		"\u01AD\x03\x02\x02\x02\u01AD\u01AE\x05> \x02\u01AEA\x03\x02\x02\x02\u01AF" +
		"\u01B0\x05@!\x02\u01B0\u01B1\x07\xC3\x02\x02\u01B1\u01B2\x05> \x02\u01B2" +
		"C\x03\x02\x02\x02\u01B3\u01B4\x05@!\x02\u01B4\u01B5\x07\xC5\x02\x02\u01B5" +
		"\u01B6\x05B\"\x02\u01B6E\x03\x02\x02\x02\u01B7\u01B8\x07\xBF\x02\x02\u01B8" +
		"\u01B9\x05> \x02\u01B9G\x03\x02\x02\x02\u01BA\u01BE\x07\xBD\x02\x02\u01BB" +
		"\u01BD\x07\xCE\x02\x02\u01BC\u01BB\x03\x02\x02\x02\u01BD\u01C0\x03\x02" +
		"\x02\x02\u01BE\u01BC\x03\x02\x02\x02\u01BE\u01BF\x03\x02\x02\x02\u01BF" +
		"\u01C1\x03\x02\x02\x02\u01C0\u01BE\x03\x02\x02\x02\u01C1\u01C2\x07\xBD" +
		"\x02\x02\u01C2I\x03\x02\x02\x02\u01C3\u01C7\x05N(\x02\u01C4\u01C7\x05" +
		"l7\x02\u01C5\u01C7\x05n8\x02\u01C6\u01C3\x03\x02\x02\x02\u01C6\u01C4\x03" +
		"\x02\x02\x02\u01C6\u01C5\x03\x02\x02\x02\u01C7K\x03\x02\x02\x02\u01C8" +
		"\u01C9\t\x1A\x02\x02\u01C9M\x03\x02\x02\x02\u01CA\u01CB\x05\f\x07\x02" +
		"\u01CB\u01CC\x05P)\x02\u01CC";
	private static readonly _serializedATNSegment1: string =
		"\u01CD\x05f4\x02\u01CD\u01CE\x05\f\x07\x02\u01CE\u01D0\x05R*\x02\u01CF" +
		"\u01D1\x05T+\x02\u01D0\u01CF\x03\x02\x02\x02\u01D0\u01D1\x03\x02\x02\x02" +
		"\u01D1\u01D2\x03\x02\x02\x02\u01D2\u01D3\x07\xC6\x02\x02\u01D3\u01E5\x03" +
		"\x02\x02\x02\u01D4\u01D5\x05\f\x07\x02\u01D5\u01D6\x05P)\x02\u01D6\u01D7" +
		"\x05f4\x02\u01D7\u01D8\x05\f\x07\x02\u01D8\u01D9\x05h5\x02\u01D9\u01DA" +
		"\x05\xB0Y\x02\u01DA\u01DB\x05V,\x02\u01DB\u01DC\x07\xC6\x02\x02\u01DC" +
		"\u01E5\x03\x02\x02\x02\u01DD\u01DE\x05\f\x07\x02\u01DE\u01DF\x05P)\x02" +
		"\u01DF\u01E0\x05f4\x02\u01E0\u01E1\x05> \x02\u01E1\u01E2\x05R*\x02\u01E2" +
		"\u01E3\x07\xC6\x02\x02\u01E3\u01E5\x03\x02\x02\x02\u01E4\u01CA\x03\x02" +
		"\x02\x02\u01E4\u01D4\x03\x02\x02\x02\u01E4\u01DD\x03\x02\x02\x02\u01E5" +
		"O\x03\x02\x02\x02\u01E6\u01E7\x05\x04\x03\x02\u01E7Q\x03\x02\x02\x02\u01E8" +
		"\u01E9\x05P)\x02\u01E9S\x03\x02\x02\x02\u01EA\u01EB\x05|?\x02\u01EB\u01EC" +
		"\x05\f\x07\x02\u01EC\u01ED\x05R*\x02\u01ED\u01F2\x03\x02\x02\x02\u01EE" +
		"\u01EF\x05\xB0Y\x02\u01EF\u01F0\x05V,\x02\u01F0\u01F2\x03\x02\x02\x02" +
		"\u01F1\u01EA\x03\x02\x02\x02\u01F1\u01EE\x03\x02\x02\x02\u01F2U\x03\x02" +
		"\x02\x02\u01F3\u01F9\x05\\/\x02\u01F4\u01F5\x05`1\x02\u01F5\u01F6\x05" +
		"\\/\x02\u01F6\u01F8\x03\x02\x02\x02\u01F7\u01F4\x03\x02\x02\x02\u01F8" +
		"\u01FB\x03\x02\x02\x02\u01F9\u01F7\x03\x02\x02\x02\u01F9\u01FA\x03\x02" +
		"\x02\x02\u01FAW\x03\x02\x02\x02\u01FB\u01F9\x03\x02\x02\x02\u01FC\u01FD" +
		"\x07\x88\x02\x02\u01FDY\x03\x02\x02\x02\u01FE\u01FF\x07\x89\x02\x02\u01FF" +
		"[\x03\x02\x02\x02\u0200\u0205\x05\f\x07\x02\u0201\u0202\x05> \x02\u0202" +
		"\u0203\x05X-\x02\u0203\u0205\x03\x02\x02\x02\u0204\u0200\x03\x02\x02\x02" +
		"\u0204\u0201\x03\x02\x02\x02\u0205\u020E\x03\x02\x02\x02\u0206\u0207\x05" +
		"\x1E\x10\x02\u0207\u0208\x05P)\x02\u0208\u020F\x03\x02\x02\x02\u0209\u020A" +
		"\x07\x8A\x02\x02\u020A\u020B\x05\n\x06\x02\u020B\u020C\x05P)\x02\u020C" +
		"\u020F\x03\x02\x02\x02\u020D\u020F\x05Z.\x02\u020E\u0206\x03\x02\x02\x02" +
		"\u020E\u0209\x03\x02\x02\x02\u020E\u020D\x03\x02\x02\x02\u020E\u020F\x03" +
		"\x02\x02\x02\u020F]\x03\x02\x02\x02\u0210\u0211\t\x1B\x02\x02\u0211_\x03" +
		"\x02\x02\x02\u0212\u0214\x05^0\x02\u0213\u0212\x03\x02\x02\x02\u0214\u0215" +
		"\x03\x02\x02\x02\u0215\u0213\x03\x02\x02\x02\u0215\u0216\x03\x02\x02\x02" +
		"\u0216a\x03\x02\x02\x02\u0217\u0218\t\x1C\x02\x02\u0218c\x03\x02\x02\x02" +
		"\u0219\u021A\t\x1D\x02\x02\u021Ae\x03\x02\x02\x02\u021B\u021C\t\x1E\x02" +
		"\x02\u021Cg\x03\x02\x02\x02\u021D\u021E\x07}\x02\x02\u021Ei\x03\x02\x02" +
		"\x02\u021F\u0220\x070\x02\x02\u0220k\x03\x02\x02\x02\u0221\u0222\x05\n" +
		"\x06\x02\u0222\u0223\x05P)\x02\u0223\u0224\x05f4\x02\u0224\u0225\x05\f" +
		"\x07\x02\u0225\u0227\x05R*\x02\u0226\u0228\x05T+\x02\u0227\u0226\x03\x02" +
		"\x02\x02\u0227\u0228\x03\x02\x02\x02\u0228\u0229\x03\x02\x02\x02\u0229" +
		"\u022A\x07\xC6\x02\x02\u022A\u0244\x03\x02\x02\x02\u022B\u022C\x05\n\x06" +
		"\x02\u022C\u022D\x05P)\x02\u022D\u022E\x05f4\x02\u022E\u022F\x05\f\x07" +
		"\x02\u022F\u0230\x05h5\x02\u0230\u0231\x05\xB0Y\x02\u0231\u0232\x05V," +
		"\x02\u0232\u0233\x07\xC6\x02\x02\u0233\u0244\x03\x02\x02\x02\u0234\u0235" +
		"\x05\n\x06\x02\u0235\u0236\x05P)\x02\u0236\u0237\x05f4\x02\u0237\u0238" +
		"\x05\f\x07\x02\u0238\u0239\x05R*\x02\u0239\u023A\x05j6\x02\u023A\u023B" +
		"\x05\xD6l\x02\u023B\u023C\x07\xC6\x02\x02\u023C\u023D\x05\n\x06\x02\u023D" +
		"\u023E\x05P)\x02\u023E\u023F\x05f4\x02\u023F\u0240\x05\xD6l\x02\u0240" +
		"\u0241\x07\xC6\x02\x02\u0241\u0244\x03\x02\x02\x02\u0242\u0244\x03\x02" +
		"\x02\x02\u0243\u0221\x03\x02\x02\x02\u0243\u022B\x03\x02\x02\x02\u0243" +
		"\u0234\x03\x02\x02\x02\u0243\u0242\x03\x02\x02\x02\u0244m\x03\x02\x02" +
		"\x02\u0245\u024A\x05p9\x02\u0246\u024A\x05t;\x02\u0247\u024A\x05z>\x02" +
		"\u0248\u024A\x05\x84C\x02\u0249\u0245\x03\x02\x02\x02\u0249\u0246\x03" +
		"\x02\x02\x02\u0249\u0247\x03\x02\x02\x02\u0249\u0248\x03\x02\x02\x02\u024A" +
		"o\x03\x02\x02\x02\u024B\u024D\x05\x80A\x02\u024C\u024B\x03\x02\x02\x02" +
		"\u024C\u024D\x03\x02\x02\x02\u024D\u024E\x03\x02\x02\x02\u024E\u024F\x05" +
		"|?\x02\u024F\u0250\x05~@\x02\u0250\u0251\x05\x86D\x02\u0251\u0252\x07" +
		"\xC8\x02\x02\u0252\u025C\x03\x02\x02\x02\u0253\u0255\x05\x80A\x02\u0254" +
		"\u0253\x03\x02\x02\x02\u0254\u0255\x03\x02\x02\x02\u0255\u0256\x03\x02" +
		"\x02\x02\u0256\u0257\x05|?\x02\u0257\u0258\x05~@\x02\u0258\u0259\x05\x86" +
		"D\x02\u0259\u025A\x07\xC9\x02\x02\u025A\u025C\x03\x02\x02\x02\u025B\u024C" +
		"\x03\x02\x02\x02\u025B\u0254\x03\x02\x02\x02\u025C\u025D\x03\x02\x02\x02" +
		"\u025D\u025E\x05\x8EH\x02\u025Eq\x03\x02\x02\x02\u025F\u0260\x07\xA0\x02" +
		"\x02\u0260s\x03\x02\x02\x02\u0261\u0263\x05\x80A\x02\u0262\u0261\x03\x02" +
		"\x02\x02\u0262\u0263\x03\x02\x02\x02\u0263\u0264\x03\x02\x02\x02\u0264" +
		"\u0265\x05|?\x02\u0265\u0266\x05~@\x02\u0266\u0267\x05r:\x02\u0267\u0268" +
		"\x05\x86D\x02\u0268\u0269\x07\xC8\x02\x02\u0269\u0274\x03\x02\x02\x02" +
		"\u026A\u026C\x05\x80A\x02\u026B\u026A\x03\x02\x02\x02\u026B\u026C\x03" +
		"\x02\x02\x02\u026C\u026D\x03\x02\x02\x02\u026D\u026E\x05|?\x02\u026E\u026F" +
		"\x05~@\x02\u026F\u0270\x05r:\x02\u0270\u0271\x05\x86D\x02\u0271\u0272" +
		"\x07\xC9\x02\x02\u0272\u0274\x03\x02\x02\x02\u0273\u0262\x03\x02\x02\x02" +
		"\u0273\u026B\x03\x02\x02\x02\u0274u\x03\x02\x02\x02\u0275\u0276\x07\xA1" +
		"\x02\x02\u0276w\x03\x02\x02\x02\u0277\u0278\x07\xA2\x02\x02\u0278y\x03" +
		"\x02\x02\x02\u0279\u027B\x05v<\x02\u027A\u0279\x03\x02\x02\x02\u027A\u027B" +
		"\x03\x02\x02\x02\u027B\u027C\x03\x02\x02\x02\u027C\u027D\x05|?\x02\u027D" +
		"\u027E\x05~@\x02\u027E\u027F\x05x=\x02\u027F\u0280\x05\n\x06\x02\u0280" +
		"\u0281\x05R*\x02\u0281\u0282\x05\x14\v\x02\u0282\u0283\x05P)\x02\u0283" +
		"\u0284\x05|?\x02\u0284\u0285\x05\f\x07\x02\u0285\u0286\x05R*\x02\u0286" +
		"\u0287\x07\xC8\x02\x02\u0287\u0298\x03\x02\x02\x02\u0288\u028A\x05v<\x02" +
		"\u0289\u0288\x03\x02\x02\x02\u0289\u028A\x03\x02\x02\x02\u028A\u028B\x03" +
		"\x02\x02\x02\u028B\u028C\x05|?\x02\u028C\u028D\x05~@\x02\u028D\u028E\x05" +
		"x=\x02\u028E\u028F\x05\n\x06\x02\u028F\u0290\x05R*\x02\u0290\u0291\x05" +
		"\x14\v\x02\u0291\u0292\x05P)\x02\u0292\u0293\x05|?\x02\u0293\u0294\x05" +
		"\f\x07\x02\u0294\u0295\x05R*\x02\u0295\u0296\x07\xC9\x02\x02\u0296\u0298" +
		"\x03\x02\x02\x02\u0297\u027A\x03\x02\x02\x02\u0297\u0289\x03\x02\x02\x02" +
		"\u0298\u0299\x03\x02\x02\x02\u0299\u029A\x05\x8EH\x02\u029A{\x03\x02\x02" +
		"\x02\u029B\u029C\x07\xA3\x02\x02\u029C}\x03\x02\x02\x02\u029D\u029E\x07" +
		"\xA4\x02\x02\u029E\x7F\x03\x02\x02\x02\u029F\u02A0\x07\xA5\x02\x02\u02A0" +
		"\x81\x03\x02\x02\x02\u02A1\u02A2\x07\xA6\x02\x02\u02A2\x83\x03\x02\x02" +
		"\x02\u02A3\u02A5\x05\x80A\x02\u02A4\u02A3\x03\x02\x02\x02\u02A4\u02A5" +
		"\x03\x02\x02\x02\u02A5\u02A6\x03\x02\x02\x02\u02A6\u02A7\x05|?\x02\u02A7" +
		"\u02A8\x05~@\x02\u02A8\u02A9\x05\x82B\x02\u02A9\u02AA\x05\x86D\x02\u02AA" +
		"\u02AB\x07\xC8\x02\x02\u02AB\u02B6\x03\x02\x02\x02\u02AC\u02AE\x05\x80" +
		"A\x02\u02AD\u02AC\x03\x02\x02\x02\u02AD\u02AE\x03\x02\x02\x02\u02AE\u02AF" +
		"\x03\x02\x02\x02\u02AF\u02B0\x05|?\x02\u02B0\u02B1\x05~@\x02\u02B1\u02B2" +
		"\x05\x82B\x02\u02B2\u02B3\x05\x86D\x02\u02B3\u02B4\x07\xC9\x02\x02\u02B4" +
		"\u02B6\x03\x02\x02\x02\u02B5\u02A4\x03\x02\x02\x02\u02B5\u02AD\x03\x02" +
		"\x02\x02\u02B6\u02B7\x03\x02\x02\x02\u02B7\u02B8\x05\x8EH\x02\u02B8\x85" +
		"\x03\x02\x02\x02\u02B9\u02C0\x05\x88E\x02\u02BA\u02C0\x05\x8AF\x02\u02BB" +
		"\u02BD\x05\x8CG\x02\u02BC\u02BE\x054\x1B\x02\u02BD\u02BC\x03\x02\x02\x02" +
		"\u02BD\u02BE\x03\x02\x02\x02\u02BE\u02C0\x03\x02\x02\x02\u02BF\u02B9\x03" +
		"\x02\x02\x02\u02BF\u02BA\x03\x02\x02\x02\u02BF\u02BB\x03\x02\x02\x02\u02C0" +
		"\x87\x03\x02\x02\x02\u02C1\u02C2\x05\x04\x03\x02\u02C2\x89\x03\x02\x02" +
		"\x02\u02C3\u02C4\x05\f\x07\x02\u02C4\u02C8\x05P)\x02\u02C5\u02C6\x05\x1E" +
		"\x10\x02\u02C6\u02C7\x05P)\x02\u02C7\u02C9\x03\x02\x02\x02\u02C8\u02C5" +
		"\x03\x02\x02\x02\u02C8\u02C9\x03\x02\x02\x02\u02C9\x8B\x03\x02\x02\x02" +
		"\u02CA\u02CB\x05\n\x06\x02\u02CB\u02CC\x05P)\x02\u02CC\x8D\x03\x02\x02" +
		"\x02\u02CD\u02CF\x05\x90I\x02\u02CE\u02CD\x03\x02\x02\x02\u02CF\u02D0" +
		"\x03\x02\x02\x02\u02D0\u02CE\x03\x02\x02\x02\u02D0\u02D1\x03\x02\x02\x02" +
		"\u02D1\x8F\x03\x02\x02\x02\u02D2\u02D9\x05\x94K\x02\u02D3\u02D9\x05\x96" +
		"L\x02\u02D4\u02D9\x05\x9AN\x02\u02D5\u02D6\x05\x9EP\x02\u02D6\u02D7\x07" +
		"\xC7\x02\x02\u02D7\u02D9\x03\x02\x02\x02\u02D8\u02D2\x03\x02\x02\x02\u02D8" +
		"\u02D3\x03\x02\x02\x02\u02D8\u02D4\x03\x02\x02\x02\u02D8\u02D5\x03\x02" +
		"\x02\x02\u02D9\x91\x03\x02\x02\x02\u02DA\u02DB\x07=\x02\x02\u02DB\x93" +
		"\x03\x02\x02\x02\u02DC\u02DD\x05\x92J\x02\u02DD\u02DE\x05\x8AF\x02\u02DE" +
		"\x95\x03\x02\x02\x02\u02DF\u02E0\x07\xA7\x02\x02\u02E0\x97\x03\x02\x02" +
		"\x02\u02E1\u02E2\x078\x02\x02\u02E2\x99\x03\x02\x02\x02\u02E3\u02E4\x05" +
		"\x98M\x02\u02E4\u02E5\x05\x9CO\x02\u02E5\u02E6\x07\xC7\x02\x02\u02E6\u02EB" +
		"\x05\x9EP\x02\u02E7\u02E8\x07\xC8\x02\x02\u02E8\u02EA\x05\x9EP\x02\u02E9" +
		"\u02E7\x03\x02\x02\x02\u02EA\u02ED\x03\x02\x02\x02\u02EB\u02E9\x03\x02" +
		"\x02\x02\u02EB\u02EC\x03\x02\x02\x02\u02EC\u02EE\x03\x02\x02\x02\u02ED" +
		"\u02EB\x03\x02\x02\x02\u02EE\u02EF\x07\xC6\x02\x02\u02EF\x9B\x03\x02\x02" +
		"\x02\u02F0\u02F2\x05\x04\x03\x02\u02F1\u02F0\x03\x02\x02\x02\u02F2\u02F3" +
		"\x03\x02\x02\x02\u02F3\u02F1\x03\x02\x02\x02\u02F3\u02F4\x03\x02\x02\x02" +
		"\u02F4\u02F6\x03\x02\x02\x02\u02F5\u02F7\x05 \x11\x02\u02F6\u02F5\x03" +
		"\x02\x02\x02\u02F6\u02F7\x03\x02\x02\x02\u02F7\u02F9\x03\x02\x02\x02\u02F8" +
		"\u02FA\x05\x9CO\x02\u02F9\u02F8\x03\x02\x02\x02\u02F9\u02FA\x03\x02\x02" +
		"\x02\u02FA\x9D\x03\x02\x02\x02\u02FB\u0304\x05\xA0Q\x02\u02FC\u0304\x05" +
		"\xA2R\x02\u02FD\u0304\x05\xB8]\x02\u02FE\u0304\x05\xBC_\x02\u02FF\u0304" +
		"\x05\xC8e\x02\u0300\u0304\x05\xC2b\x02\u0301\u0304\x05\xC6d\x02\u0302" +
		"\u0304\x05\xCCg\x02\u0303\u02FB\x03\x02\x02\x02\u0303\u02FC\x03\x02\x02" +
		"\x02\u0303\u02FD\x03\x02\x02\x02\u0303\u02FE\x03\x02\x02\x02\u0303\u02FF" +
		"\x03\x02\x02\x02\u0303\u0300\x03\x02\x02\x02\u0303\u0301\x03\x02\x02\x02" +
		"\u0303\u0302\x03\x02\x02\x02\u0304\x9F\x03\x02\x02\x02\u0305\u0306\x07" +
		";\x02\x02\u0306\xA1\x03\x02\x02\x02\u0307\u030B\x05\xA4S\x02\u0308\u030B" +
		"\x05\xA6T\x02\u0309\u030B\x05\xB6\\\x02\u030A\u0307\x03\x02\x02\x02\u030A" +
		"\u0308\x03\x02\x02\x02\u030A\u0309\x03\x02\x02\x02\u030B\xA3\x03\x02\x02" +
		"\x02\u030C\u0310\x05\x88E\x02\u030D\u0310\x05\xCEh\x02\u030E\u0310\x05" +
		"\x8CG\x02\u030F\u030C\x03\x02\x02\x02\u030F\u030D\x03\x02\x02\x02\u030F" +
		"\u030E\x03\x02\x02\x02\u0310\u0312\x03\x02\x02\x02\u0311\u0313\x054\x1B" +
		"\x02\u0312\u0311\x03\x02\x02\x02\u0312\u0313\x03\x02\x02\x02\u0313\xA5" +
		"\x03\x02\x02\x02\u0314\u0315\x05\xAEX\x02\u0315\u0316\x05\xA8U\x02\u0316" +
		"\u0317\x05\xAAV\x02\u0317\u0318\x05\xA8U\x02\u0318\u0319\x05\xA8U\x02" +
		"\u0319\u031A\x05\xACW\x02\u031A\u032B\x05\xA8U\x02\u031B\u031C\x05\xB0" +
		"Y\x02\u031C\u031D\x05\xCEh\x02\u031D\u0323\x03\x02\x02\x02\u031E\u031F" +
		"\x05\xB2Z\x02\u031F\u0320\x05\xCEh\x02\u0320\u0322\x03\x02\x02\x02\u0321" +
		"\u031E\x03\x02\x02\x02\u0322\u0325\x03\x02\x02\x02\u0323\u0321\x03\x02" +
		"\x02\x02\u0323\u0324\x03\x02\x02\x02\u0324\u0329\x03\x02\x02\x02\u0325" +
		"\u0323\x03\x02\x02\x02\u0326\u0327\x05\xB4[\x02\u0327\u0328\x05\xE0q\x02" +
		"\u0328\u032A\x03\x02\x02\x02\u0329\u0326\x03\x02\x02\x02\u0329\u032A\x03" +
		"\x02\x02\x02\u032A\u032C\x03\x02\x02\x02\u032B\u031B\x03\x02\x02\x02\u032B" +
		"\u032C\x03\x02\x02\x02\u032C\xA7\x03\x02\x02\x02\u032D\u032E\x07\xBD\x02" +
		"\x02\u032E\xA9\x03\x02\x02\x02\u032F\u0330\x05\x04\x03\x02\u0330\xAB\x03" +
		"\x02\x02\x02\u0331\u0332\x05\x04\x03\x02\u0332\xAD\x03\x02\x02\x02\u0333" +
		"\u0334\x07C\x02\x02\u0334\xAF\x03\x02\x02\x02\u0335\u0336\x07\x8F\x02" +
		"\x02\u0336\xB1\x03\x02\x02\x02\u0337\u0338\x07\x8B\x02\x02\u0338\xB3\x03" +
		"\x02\x02\x02\u0339\u033A\x07D\x02\x02\u033A\xB5\x03\x02\x02\x02\u033B" +
		"\u033C\x05\xAEX\x02\u033C\u034C\x05\xCEh\x02\u033D\u033E\x05\xB0Y\x02" +
		"\u033E\u0344\x05\xCEh\x02\u033F\u0340\x05\xB2Z\x02\u0340\u0341\x05\xCE" +
		"h\x02\u0341\u0343\x03\x02\x02\x02\u0342\u033F\x03\x02\x02\x02\u0343\u0346" +
		"\x03\x02\x02\x02\u0344\u0342\x03\x02\x02\x02\u0344\u0345\x03\x02\x02\x02" +
		"\u0345\u034A\x03\x02\x02\x02\u0346\u0344\x03\x02\x02\x02\u0347\u0348\x05" +
		"\xB4[\x02\u0348\u0349\x05\xE0q\x02\u0349\u034B\x03\x02\x02\x02\u034A\u0347" +
		"\x03\x02\x02\x02\u034A\u034B\x03\x02\x02\x02\u034B\u034D\x03\x02\x02\x02" +
		"\u034C\u033D\x03\x02\x02\x02\u034C\u034D\x03\x02\x02\x02\u034D\xB7\x03" +
		"\x02\x02\x02\u034E\u034F\x07<\x02\x02\u034F\xB9\x03\x02\x02\x02\u0350" +
		"\u0351\x07B\x02\x02\u0351\xBB\x03\x02\x02\x02\u0352\u0353\x05\xBA^\x02" +
		"\u0353\u0354\x05F$\x02\u0354\xBD\x03\x02\x02\x02\u0355\u0356\x07\xA8\x02" +
		"\x02\u0356\xBF\x03\x02\x02\x02\u0357\u0358\x07\xA9\x02\x02\u0358\xC1\x03" +
		"\x02\x02\x02\u0359\u035A\x05\xBE`\x02\u035A\u035B\x05\b\x05\x02\u035B" +
		"\u035C\x05\xE0q\x02\u035C\u0360\x05\xC0a\x02\u035D\u0361\x05\x88E\x02" +
		"\u035E\u0361\x05\x8AF\x02\u035F\u0361\x05\x8CG\x02\u0360\u035D\x03\x02" +
		"\x02\x02\u0360\u035E\x03\x02\x02\x02\u0360\u035F\x03\x02\x02\x02\u0361" +
		"\u0363\x03\x02\x02\x02\u0362\u0364\x054\x1B\x02\u0363\u0362\x03\x02\x02" +
		"\x02\u0363\u0364\x03\x02\x02\x02\u0364\xC3\x03\x02\x02\x02\u0365\u0366" +
		"\t\x1F\x02\x02\u0366\xC5\x03\x02\x02\x02\u0367\u0368\x05\xC4c\x02\u0368" +
		"\u0369\x05\xCEh\x02\u0369\xC7\x03\x02\x02\x02\u036A\u036B\x07:\x02\x02" +
		"\u036B\xC9\x03\x02\x02\x02\u036C\u036D\x07>\x02\x02\u036D\xCB\x03\x02" +
		"\x02\x02\u036E\u036F\x05\xCAf\x02\u036F\u0370\x05\xD2j\x02\u0370\xCD\x03" +
		"\x02\x02\x02\u0371\u0377\x05\xE0q\x02\u0372\u0373\x05\xD0i\x02\u0373\u0374" +
		"\x05\xE0q\x02\u0374\u0376\x03\x02\x02\x02\u0375\u0372\x03\x02\x02\x02" +
		"\u0376\u0379\x03\x02\x02\x02\u0377\u0375\x03\x02\x02\x02\u0377\u0378\x03" +
		"\x02\x02\x02\u0378\xCF\x03\x02\x02\x02\u0379\u0377\x03\x02\x02\x02\u037A" +
		"\u037B\t \x02\x02\u037B\xD1\x03\x02\x02\x02\u037C\u037D\t!\x02\x02\u037D" +
		"\xD3\x03\x02\x02\x02\u037E\u037F\t\"\x02\x02\u037F\xD5\x03\x02\x02\x02" +
		"\u0380\u0384\x05\xD8m\x02\u0381\u0384\x05\xDAn\x02\u0382\u0384\x05\xDE" +
		"p\x02\u0383\u0380\x03\x02\x02\x02\u0383\u0381\x03\x02\x02\x02\u0383\u0382" +
		"\x03\x02\x02\x02\u0384\xD7\x03\x02\x02\x02\u0385\u0386\x07\xBE\x02\x02" +
		"\u0386\u0387\x05\xD6l\x02\u0387\xD9\x03\x02\x02\x02\u0388\u0389\x07\xC5" +
		"\x02\x02\u0389\u038A\x05\xD6l\x02\u038A\xDB\x03\x02\x02\x02\u038B\u038F" +
		"\x05@!\x02\u038C\u038F\x05B\"\x02\u038D\u038F\x05D#\x02\u038E\u038B\x03" +
		"\x02\x02\x02\u038E\u038C\x03\x02\x02\x02\u038E\u038D\x03\x02\x02\x02\u038F" +
		"\xDD\x03\x02\x02\x02\u0390\u0392\x05\xDCo\x02\u0391\u0393\x05R*\x02\u0392" +
		"\u0391\x03\x02\x02\x02\u0392\u0393\x03\x02\x02\x02\u0393\u0399\x03\x02" +
		"\x02\x02\u0394\u0399\x05H%\x02\u0395\u0399\x05F$\x02\u0396\u0399\x05\xD2" +
		"j\x02\u0397\u0399\x05\xD4k\x02\u0398\u0390\x03\x02\x02\x02\u0398\u0394" +
		"\x03\x02\x02\x02\u0398\u0395\x03\x02\x02\x02\u0398\u0396\x03\x02\x02\x02" +
		"\u0398\u0397\x03\x02\x02\x02\u0399\xDF\x03\x02\x02\x02\u039A\u03AB\x05" +
		"\xE6t\x02\u039B\u03AB\x05\xE8u\x02\u039C\u03AB\x05\xEAv\x02\u039D\u03AB" +
		"\x05\xECw\x02\u039E\u03A3\x05\xEEx\x02\u039F\u03A0\x05\xE4s\x02\u03A0" +
		"\u03A1\x05\f\x07\x02\u03A1\u03A2\x05R*\x02\u03A2\u03A4\x03\x02\x02\x02" +
		"\u03A3\u039F\x03\x02\x02\x02\u03A3\u03A4\x03\x02\x02\x02\u03A4\u03A8\x03" +
		"\x02\x02\x02\u03A5\u03A6\x05\xE2r\x02\u03A6\u03A7\x05\xE0q\x02\u03A7\u03A9" +
		"\x03\x02\x02\x02\u03A8\u03A5\x03\x02\x02\x02\u03A8\u03A9\x03\x02\x02\x02" +
		"\u03A9\u03AB\x03\x02\x02\x02\u03AA\u039A\x03\x02\x02\x02\u03AA\u039B\x03" +
		"\x02\x02\x02\u03AA\u039C\x03\x02\x02\x02\u03AA\u039D\x03\x02\x02\x02\u03AA" +
		"\u039E\x03\x02\x02\x02\u03AB\xE1\x03\x02\x02\x02\u03AC\u03AD\x07\xC3\x02" +
		"\x02\u03AD\xE3\x03\x02\x02\x02\u03AE\u03AF\x07\xB3\x02\x02\u03AF\xE5\x03" +
		"\x02\x02\x02\u03B0\u03B1\x07\xBE\x02\x02\u03B1\u03B2\x05\xE0q\x02\u03B2" +
		"\xE7\x03\x02\x02\x02\u03B3\u03B4\x07\xC5\x02\x02\u03B4\u03B5\x05\xE0q" +
		"\x02\u03B5\xE9\x03\x02\x02\x02\u03B6\u03B7\x05\f\x07\x02\u03B7\u03BB\x05" +
		"P)\x02\u03B8\u03B9\x05\x1E\x10\x02\u03B9\u03BA\x05P)\x02\u03BA\u03BC\x03" +
		"\x02\x02\x02\u03BB\u03B8\x03\x02\x02\x02\u03BB\u03BC\x03\x02\x02\x02\u03BC" +
		"\u03C3\x03\x02\x02\x02\u03BD\u03BE\x05\n\x06\x02\u03BE\u03BF\x05P)\x02" +
		"\u03BF\u03C0\x05\x14\v\x02\u03C0\u03C1\x05P)\x02\u03C1\u03C3\x03\x02\x02" +
		"\x02\u03C2\u03B6\x03\x02\x02\x02\u03C2\u03BD\x03\x02\x02\x02\u03C3\xEB" +
		"\x03\x02\x02\x02\u03C4\u03C5\x05\n\x06\x02\u03C5\u03C6\x05\xFA~\x02\u03C6" +
		"\u03C7\x05\x18\r\x02\u03C7\u03C8\x05P)\x02\u03C8\xED\x03\x02\x02\x02\u03C9" +
		"\u03CA\x05\xDEp\x02\u03CA\u03CB\x05\xF6|\x02\u03CB\xEF\x03\x02\x02\x02" +
		"\u03CC\u03CD\x07\xB4\x02\x02\u03CD\xF1\x03\x02\x02\x02\u03CE\u03CF\x07" +
		"\xB5\x02\x02\u03CF\xF3\x03\x02\x02\x02\u03D0\u03D1\x07\xB6\x02\x02\u03D1" +
		"\xF5\x03\x02\x02\x02\u03D2\u03D4\x05\xF8}\x02\u03D3\u03D2\x03\x02\x02" +
		"\x02\u03D4\u03D7\x03\x02\x02\x02\u03D5\u03D3\x03\x02\x02\x02\u03D5\u03D6" +
		"\x03\x02\x02\x02\u03D6\xF7\x03\x02\x02\x02\u03D7\u03D5\x03\x02\x02\x02" +
		"\u03D8\u03DE\x05\xFC\x7F\x02\u03D9\u03DF\x05P)\x02\u03DA\u03DF\x05z>\x02" +
		"\u03DB\u03DF\x05\xF0y\x02\u03DC\u03DF\x05\xF2z\x02\u03DD\u03DF\x05\xF4" +
		"{\x02\u03DE\u03D9\x03\x02\x02\x02\u03DE\u03DA\x03\x02\x02\x02\u03DE\u03DB" +
		"\x03\x02\x02\x02\u03DE\u03DC\x03\x02\x02\x02\u03DE\u03DD\x03\x02\x02\x02" +
		"\u03DF\xF9\x03\x02\x02\x02\u03E0\u03E6\x05P)\x02\u03E1\u03E6\x05z>\x02" +
		"\u03E2\u03E6\x05\xF0y\x02\u03E3\u03E6\x05\xF2z\x02\u03E4\u03E6\x05\xF4" +
		"{\x02\u03E5\u03E0\x03\x02\x02\x02\u03E5\u03E1\x03\x02\x02\x02\u03E5\u03E2" +
		"\x03\x02\x02\x02\u03E5\u03E3\x03\x02\x02\x02\u03E5\u03E4\x03\x02\x02\x02" +
		"\u03E6\u03E7\x03\x02\x02\x02\u03E7\u03E8\x05\x18\r\x02\u03E8\xFB\x03\x02" +
		"\x02\x02\u03E9\u03EA\x07\xB7\x02\x02\u03EA\xFD\x03\x02\x02\x02L\u0103" +
		"\u010A\u0111\u0118\u0131\u0142\u0157\u0161\u0167\u0170\u0179\u0189\u019A" +
		"\u01A3\u01A8\u01AB\u01BE\u01C6\u01D0\u01E4\u01F1\u01F9\u0204\u020E\u0215" +
		"\u0227\u0243\u0249\u024C\u0254\u025B\u0262\u026B\u0273\u027A\u0289\u0297" +
		"\u02A4\u02AD\u02B5\u02BD\u02BF\u02C8\u02D0\u02D8\u02EB\u02F3\u02F6\u02F9" +
		"\u0303\u030A\u030F\u0312\u0323\u0329\u032B\u0344\u034A\u034C\u0360\u0363" +
		"\u0377\u0383\u038E\u0392\u0398\u03A3\u03A8\u03AA\u03BB\u03C2\u03D5\u03DE" +
		"\u03E5";
	public static readonly _serializedATN: string = Utils.join(
		[
			PortuguesPuroParser._serializedATNSegment0,
			PortuguesPuroParser._serializedATNSegment1,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!PortuguesPuroParser.__ATN) {
			PortuguesPuroParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(PortuguesPuroParser._serializedATN));
		}

		return PortuguesPuroParser.__ATN;
	}

}

export class Regra_espacoContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_regra_espaco; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterRegra_espaco) {
			listener.enterRegra_espaco(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitRegra_espaco) {
			listener.exitRegra_espaco(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitRegra_espaco) {
			return visitor.visitRegra_espaco(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PalavraContext extends ParserRuleContext {
	public CARACTERES_IMPRIMIVEIS(): TerminalNode[];
	public CARACTERES_IMPRIMIVEIS(i: number): TerminalNode;
	public CARACTERES_IMPRIMIVEIS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
		} else {
			return this.getToken(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_palavra; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterPalavra) {
			listener.enterPalavra(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitPalavra) {
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


export class Possessivo_ingl�sContext extends ParserRuleContext {
	public palavra(): PalavraContext {
		return this.getRuleContext(0, PalavraContext);
	}
	public APOSTROFO(): TerminalNode { return this.getToken(PortuguesPuroParser.APOSTROFO, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_possessivo_ingl�s; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterPossessivo_ingl�s) {
			listener.enterPossessivo_ingl�s(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitPossessivo_ingl�s) {
			listener.exitPossessivo_ingl�s(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitPossessivo_ingl�s) {
			return visitor.visitPossessivo_ingl�s(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArtigoContext extends ParserRuleContext {
	public artigo_definido(): Artigo_definidoContext | undefined {
		return this.tryGetRuleContext(0, Artigo_definidoContext);
	}
	public artigo_indefinido(): Artigo_indefinidoContext | undefined {
		return this.tryGetRuleContext(0, Artigo_indefinidoContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_artigo; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterArtigo) {
			listener.enterArtigo(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitArtigo) {
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
	public adjacentes(): AdjacentesContext | undefined {
		return this.tryGetRuleContext(0, AdjacentesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_artigo_definido; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterArtigo_definido) {
			listener.enterArtigo_definido(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitArtigo_definido) {
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
	public abrangentes(): AbrangentesContext | undefined {
		return this.tryGetRuleContext(0, AbrangentesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_artigo_indefinido; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterArtigo_indefinido) {
			listener.enterArtigo_indefinido(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitArtigo_indefinido) {
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_adjacentes; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterAdjacentes) {
			listener.enterAdjacentes(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitAdjacentes) {
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_abrangentes; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterAbrangentes) {
			listener.enterAbrangentes(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitAbrangentes) {
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


export class ContracoesContext extends ParserRuleContext {
	public atribuidores_de_posse(): Atribuidores_de_posseContext | undefined {
		return this.tryGetRuleContext(0, Atribuidores_de_posseContext);
	}
	public p1(): P1Context | undefined {
		return this.tryGetRuleContext(0, P1Context);
	}
	public p2(): P2Context | undefined {
		return this.tryGetRuleContext(0, P2Context);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_contracoes; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterContracoes) {
			listener.enterContracoes(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitContracoes) {
			listener.exitContracoes(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitContracoes) {
			return visitor.visitContracoes(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Atribuidores_de_posseContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_atribuidores_de_posse; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterAtribuidores_de_posse) {
			listener.enterAtribuidores_de_posse(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitAtribuidores_de_posse) {
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_p1; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterP1) {
			listener.enterP1(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitP1) {
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_p2; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterP2) {
			listener.enterP2(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitP2) {
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


export class Operadores_de_comparacaoContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_operadores_de_comparacao; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterOperadores_de_comparacao) {
			listener.enterOperadores_de_comparacao(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitOperadores_de_comparacao) {
			listener.exitOperadores_de_comparacao(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitOperadores_de_comparacao) {
			return visitor.visitOperadores_de_comparacao(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Palavras_reservadasContext extends ParserRuleContext {
	public denominacoes(): DenominacoesContext | undefined {
		return this.tryGetRuleContext(0, DenominacoesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_palavras_reservadas; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterPalavras_reservadas) {
			listener.enterPalavras_reservadas(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitPalavras_reservadas) {
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


export class DenominacoesContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_denominacoes; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterDenominacoes) {
			listener.enterDenominacoes(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitDenominacoes) {
			listener.exitDenominacoes(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitDenominacoes) {
			return visitor.visitDenominacoes(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VerbosContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_verbos; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterVerbos) {
			listener.enterVerbos(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitVerbos) {
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


export class Caracteres_ignoraveisContext extends ParserRuleContext {
	public CARACTERES_DE_CONTROLE(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.CARACTERES_DE_CONTROLE, 0); }
	public ESPACO_EM_BRANCO(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.ESPACO_EM_BRANCO, 0); }
	public ESPACO_RIGIDO(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.ESPACO_RIGIDO, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_caracteres_ignoraveis; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterCaracteres_ignoraveis) {
			listener.enterCaracteres_ignoraveis(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitCaracteres_ignoraveis) {
			listener.exitCaracteres_ignoraveis(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitCaracteres_ignoraveis) {
			return visitor.visitCaracteres_ignoraveis(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ComentarioContext extends ParserRuleContext {
	public comentario_de_linha(): Comentario_de_linhaContext | undefined {
		return this.tryGetRuleContext(0, Comentario_de_linhaContext);
	}
	public comentario_de_bloco(): Comentario_de_blocoContext | undefined {
		return this.tryGetRuleContext(0, Comentario_de_blocoContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_comentario; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterComentario) {
			listener.enterComentario(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitComentario) {
			listener.exitComentario(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitComentario) {
			return visitor.visitComentario(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Comentario_de_linhaContext extends ParserRuleContext {
	public BARRA_INVERTIDA(): TerminalNode { return this.getToken(PortuguesPuroParser.BARRA_INVERTIDA, 0); }
	public QUEBRA_DE_LINHA(): TerminalNode { return this.getToken(PortuguesPuroParser.QUEBRA_DE_LINHA, 0); }
	public CARACTERES_IMPRIMIVEIS(): TerminalNode[];
	public CARACTERES_IMPRIMIVEIS(i: number): TerminalNode;
	public CARACTERES_IMPRIMIVEIS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
		} else {
			return this.getToken(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_comentario_de_linha; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterComentario_de_linha) {
			listener.enterComentario_de_linha(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitComentario_de_linha) {
			listener.exitComentario_de_linha(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitComentario_de_linha) {
			return visitor.visitComentario_de_linha(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Comentario_de_blocoContext extends ParserRuleContext {
	public ABRE_COLCHETES(): TerminalNode { return this.getToken(PortuguesPuroParser.ABRE_COLCHETES, 0); }
	public FECHA_COLCHETES(): TerminalNode { return this.getToken(PortuguesPuroParser.FECHA_COLCHETES, 0); }
	public CARACTERES_IMPRIMIVEIS(): TerminalNode[];
	public CARACTERES_IMPRIMIVEIS(i: number): TerminalNode;
	public CARACTERES_IMPRIMIVEIS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
		} else {
			return this.getToken(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_comentario_de_bloco; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterComentario_de_bloco) {
			listener.enterComentario_de_bloco(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitComentario_de_bloco) {
			listener.exitComentario_de_bloco(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitComentario_de_bloco) {
			return visitor.visitComentario_de_bloco(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TokenContext extends ParserRuleContext {
	public aglomerado(): AglomeradoContext | undefined {
		return this.tryGetRuleContext(0, AglomeradoContext);
	}
	public possessivo_ingl�s(): Possessivo_ingl�sContext | undefined {
		return this.tryGetRuleContext(0, Possessivo_ingl�sContext);
	}
	public qualificador(): QualificadorContext | undefined {
		return this.tryGetRuleContext(0, QualificadorContext);
	}
	public string_literal(): String_literalContext | undefined {
		return this.tryGetRuleContext(0, String_literalContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_token; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterToken) {
			listener.enterToken(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitToken) {
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
	public iniciador_de_aglomerado(): Iniciador_de_aglomeradoContext {
		return this.getRuleContext(0, Iniciador_de_aglomeradoContext);
	}
	public caractere_aglomeravel(): Caractere_aglomeravelContext | undefined {
		return this.tryGetRuleContext(0, Caractere_aglomeravelContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_aglomerado; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterAglomerado) {
			listener.enterAglomerado(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitAglomerado) {
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


export class Caractere_aglomeravelContext extends ParserRuleContext {
	public LETRA(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.LETRA, 0); }
	public DIGITO(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.DIGITO, 0); }
	public CIFRAO(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.CIFRAO, 0); }
	public HIFEN(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.HIFEN, 0); }
	public SINAL_DE_ADICAO(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.SINAL_DE_ADICAO, 0); }
	public BARRA_INCLINADA(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.BARRA_INCLINADA, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_caractere_aglomeravel; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterCaractere_aglomeravel) {
			listener.enterCaractere_aglomeravel(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitCaractere_aglomeravel) {
			listener.exitCaractere_aglomeravel(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitCaractere_aglomeravel) {
			return visitor.visitCaractere_aglomeravel(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Iniciador_de_aglomeradoContext extends ParserRuleContext {
	public LETRA(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.LETRA, 0); }
	public DIGITO(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.DIGITO, 0); }
	public CIFRAO(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.CIFRAO, 0); }
	public APOSTROFO(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.APOSTROFO, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_iniciador_de_aglomerado; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterIniciador_de_aglomerado) {
			listener.enterIniciador_de_aglomerado(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitIniciador_de_aglomerado) {
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
	public apostrofo(): ApostrofoContext {
		return this.getRuleContext(0, ApostrofoContext);
	}
	public caractere_nao_aglomeravel(): Caractere_nao_aglomeravelContext {
		return this.getRuleContext(0, Caractere_nao_aglomeravelContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_possessivo_novo; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterPossessivo_novo) {
			listener.enterPossessivo_novo(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitPossessivo_novo) {
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
	public ABRE_PARENTESES(): TerminalNode { return this.getToken(PortuguesPuroParser.ABRE_PARENTESES, 0); }
	public FECHA_PARENTESES(): TerminalNode { return this.getToken(PortuguesPuroParser.FECHA_PARENTESES, 0); }
	public CARACTERES_IMPRIMIVEIS(): TerminalNode[];
	public CARACTERES_IMPRIMIVEIS(i: number): TerminalNode;
	public CARACTERES_IMPRIMIVEIS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
		} else {
			return this.getToken(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_qualificador; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterQualificador) {
			listener.enterQualificador(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitQualificador) {
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


export class Caractere_nao_aglomeravelContext extends ParserRuleContext {
	public LETRA(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.LETRA, 0); }
	public DIGITO(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.DIGITO, 0); }
	public CIFRAO(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.CIFRAO, 0); }
	public HIFEN(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.HIFEN, 0); }
	public SINAL_DE_ADICAO(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.SINAL_DE_ADICAO, 0); }
	public BARRA_INCLINADA(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.BARRA_INCLINADA, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_caractere_nao_aglomeravel; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterCaractere_nao_aglomeravel) {
			listener.enterCaractere_nao_aglomeravel(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitCaractere_nao_aglomeravel) {
			listener.exitCaractere_nao_aglomeravel(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitCaractere_nao_aglomeravel) {
			return visitor.visitCaractere_nao_aglomeravel(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Sinal_de_pontuacaoContext extends ParserRuleContext {
	public PONTO(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.PONTO, 0); }
	public VIRGULA(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.VIRGULA, 0); }
	public PONTO_E_VIRGULA(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.PONTO_E_VIRGULA, 0); }
	public DOIS_PONTOS(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.DOIS_PONTOS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_sinal_de_pontuacao; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterSinal_de_pontuacao) {
			listener.enterSinal_de_pontuacao(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitSinal_de_pontuacao) {
			listener.exitSinal_de_pontuacao(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitSinal_de_pontuacao) {
			return visitor.visitSinal_de_pontuacao(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Simbolos_especiaisContext extends ParserRuleContext {
	public SINAL_DE_ADICAO(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.SINAL_DE_ADICAO, 0); }
	public HIFEN(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.HIFEN, 0); }
	public BARRA_INCLINADA(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.BARRA_INCLINADA, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_simbolos_especiais; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterSimbolos_especiais) {
			listener.enterSimbolos_especiais(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitSimbolos_especiais) {
			listener.exitSimbolos_especiais(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitSimbolos_especiais) {
			return visitor.visitSimbolos_especiais(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NoiseContext extends ParserRuleContext {
	public caracteres_ignoraveis(): Caracteres_ignoraveisContext | undefined {
		return this.tryGetRuleContext(0, Caracteres_ignoraveisContext);
	}
	public comentario(): ComentarioContext | undefined {
		return this.tryGetRuleContext(0, ComentarioContext);
	}
	public qualificador(): QualificadorContext | undefined {
		return this.tryGetRuleContext(0, QualificadorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_noise; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterNoise) {
			listener.enterNoise(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitNoise) {
			listener.exitNoise(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitNoise) {
			return visitor.visitNoise(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Numero_inteiroContext extends ParserRuleContext {
	public DIGITO(): TerminalNode[];
	public DIGITO(i: number): TerminalNode;
	public DIGITO(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(PortuguesPuroParser.DIGITO);
		} else {
			return this.getToken(PortuguesPuroParser.DIGITO, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_numero_inteiro; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterNumero_inteiro) {
			listener.enterNumero_inteiro(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitNumero_inteiro) {
			listener.exitNumero_inteiro(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitNumero_inteiro) {
			return visitor.visitNumero_inteiro(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Numero_decimalContext extends ParserRuleContext {
	public numero_inteiro(): Numero_inteiroContext {
		return this.getRuleContext(0, Numero_inteiroContext);
	}
	public HIFEN(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.HIFEN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_numero_decimal; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterNumero_decimal) {
			listener.enterNumero_decimal(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitNumero_decimal) {
			listener.exitNumero_decimal(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitNumero_decimal) {
			return visitor.visitNumero_decimal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Numero_fracionarioContext extends ParserRuleContext {
	public numero_decimal(): Numero_decimalContext {
		return this.getRuleContext(0, Numero_decimalContext);
	}
	public BARRA_INCLINADA(): TerminalNode { return this.getToken(PortuguesPuroParser.BARRA_INCLINADA, 0); }
	public numero_inteiro(): Numero_inteiroContext {
		return this.getRuleContext(0, Numero_inteiroContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_numero_fracionario; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterNumero_fracionario) {
			listener.enterNumero_fracionario(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitNumero_fracionario) {
			listener.exitNumero_fracionario(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitNumero_fracionario) {
			return visitor.visitNumero_fracionario(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Numero_mistoContext extends ParserRuleContext {
	public numero_decimal(): Numero_decimalContext {
		return this.getRuleContext(0, Numero_decimalContext);
	}
	public SINAL_DE_ADICAO(): TerminalNode { return this.getToken(PortuguesPuroParser.SINAL_DE_ADICAO, 0); }
	public numero_fracionario(): Numero_fracionarioContext {
		return this.getRuleContext(0, Numero_fracionarioContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_numero_misto; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterNumero_misto) {
			listener.enterNumero_misto(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitNumero_misto) {
			listener.exitNumero_misto(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitNumero_misto) {
			return visitor.visitNumero_misto(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Numero_hexadecimalContext extends ParserRuleContext {
	public CIFRAO(): TerminalNode { return this.getToken(PortuguesPuroParser.CIFRAO, 0); }
	public numero_inteiro(): Numero_inteiroContext {
		return this.getRuleContext(0, Numero_inteiroContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_numero_hexadecimal; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterNumero_hexadecimal) {
			listener.enterNumero_hexadecimal(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitNumero_hexadecimal) {
			listener.exitNumero_hexadecimal(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitNumero_hexadecimal) {
			return visitor.visitNumero_hexadecimal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class String_literalContext extends ParserRuleContext {
	public ASPAS_DUPLAS(): TerminalNode[];
	public ASPAS_DUPLAS(i: number): TerminalNode;
	public ASPAS_DUPLAS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(PortuguesPuroParser.ASPAS_DUPLAS);
		} else {
			return this.getToken(PortuguesPuroParser.ASPAS_DUPLAS, i);
		}
	}
	public CARACTERES_IMPRIMIVEIS(): TerminalNode[];
	public CARACTERES_IMPRIMIVEIS(i: number): TerminalNode;
	public CARACTERES_IMPRIMIVEIS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS);
		} else {
			return this.getToken(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_string_literal; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterString_literal) {
			listener.enterString_literal(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitString_literal) {
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
	public tipo(): TipoContext | undefined {
		return this.tryGetRuleContext(0, TipoContext);
	}
	public variavel_global(): Variavel_globalContext | undefined {
		return this.tryGetRuleContext(0, Variavel_globalContext);
	}
	public rotina(): RotinaContext | undefined {
		return this.tryGetRuleContext(0, RotinaContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_programa; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterPrograma) {
			listener.enterPrograma(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitPrograma) {
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_tipos_primitivos; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterTipos_primitivos) {
			listener.enterTipos_primitivos(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitTipos_primitivos) {
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
	public artigo_indefinido(): Artigo_indefinidoContext[];
	public artigo_indefinido(i: number): Artigo_indefinidoContext;
	public artigo_indefinido(i?: number): Artigo_indefinidoContext | Artigo_indefinidoContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Artigo_indefinidoContext);
		} else {
			return this.getRuleContext(i, Artigo_indefinidoContext);
		}
	}
	public nome(): NomeContext {
		return this.getRuleContext(0, NomeContext);
	}
	public �(): �Context {
		return this.getRuleContext(0, �Context);
	}
	public nome_do_tipo(): Nome_do_tipoContext | undefined {
		return this.tryGetRuleContext(0, Nome_do_tipoContext);
	}
	public PONTO(): TerminalNode { return this.getToken(PortuguesPuroParser.PONTO, 0); }
	public informacao_opcional(): Informacao_opcionalContext | undefined {
		return this.tryGetRuleContext(0, Informacao_opcionalContext);
	}
	public estrutura(): EstruturaContext | undefined {
		return this.tryGetRuleContext(0, EstruturaContext);
	}
	public com(): ComContext | undefined {
		return this.tryGetRuleContext(0, ComContext);
	}
	public campos(): CamposContext | undefined {
		return this.tryGetRuleContext(0, CamposContext);
	}
	public numero_inteiro(): Numero_inteiroContext | undefined {
		return this.tryGetRuleContext(0, Numero_inteiroContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_tipo; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterTipo) {
			listener.enterTipo(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitTipo) {
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
	public palavra(): PalavraContext {
		return this.getRuleContext(0, PalavraContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_nome; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterNome) {
			listener.enterNome(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitNome) {
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
	public nome(): NomeContext {
		return this.getRuleContext(0, NomeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_nome_do_tipo; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterNome_do_tipo) {
			listener.enterNome_do_tipo(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitNome_do_tipo) {
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


export class Informacao_opcionalContext extends ParserRuleContext {
	public para(): ParaContext | undefined {
		return this.tryGetRuleContext(0, ParaContext);
	}
	public artigo_indefinido(): Artigo_indefinidoContext | undefined {
		return this.tryGetRuleContext(0, Artigo_indefinidoContext);
	}
	public nome_do_tipo(): Nome_do_tipoContext | undefined {
		return this.tryGetRuleContext(0, Nome_do_tipoContext);
	}
	public com(): ComContext | undefined {
		return this.tryGetRuleContext(0, ComContext);
	}
	public campos(): CamposContext | undefined {
		return this.tryGetRuleContext(0, CamposContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_informacao_opcional; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterInformacao_opcional) {
			listener.enterInformacao_opcional(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitInformacao_opcional) {
			listener.exitInformacao_opcional(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitInformacao_opcional) {
			return visitor.visitInformacao_opcional(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CamposContext extends ParserRuleContext {
	public campo(): CampoContext[];
	public campo(i: number): CampoContext;
	public campo(i?: number): CampoContext | CampoContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CampoContext);
		} else {
			return this.getRuleContext(i, CampoContext);
		}
	}
	public pausas(): PausasContext[];
	public pausas(i: number): PausasContext;
	public pausas(i?: number): PausasContext | PausasContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PausasContext);
		} else {
			return this.getRuleContext(i, PausasContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_campos; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterCampos) {
			listener.enterCampos(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitCampos) {
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_bytes; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterBytes) {
			listener.enterBytes(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitBytes) {
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


export class Refer�nciaContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_refer�ncia; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterRefer�ncia) {
			listener.enterRefer�ncia(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitRefer�ncia) {
			listener.exitRefer�ncia(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitRefer�ncia) {
			return visitor.visitRefer�ncia(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CampoContext extends ParserRuleContext {
	public artigo_indefinido(): Artigo_indefinidoContext | undefined {
		return this.tryGetRuleContext(0, Artigo_indefinidoContext);
	}
	public numero_inteiro(): Numero_inteiroContext | undefined {
		return this.tryGetRuleContext(0, Numero_inteiroContext);
	}
	public bytes(): BytesContext | undefined {
		return this.tryGetRuleContext(0, BytesContext);
	}
	public denominacoes(): DenominacoesContext | undefined {
		return this.tryGetRuleContext(0, DenominacoesContext);
	}
	public nome(): NomeContext | undefined {
		return this.tryGetRuleContext(0, NomeContext);
	}
	public artigo_definido(): Artigo_definidoContext | undefined {
		return this.tryGetRuleContext(0, Artigo_definidoContext);
	}
	public refer�ncia(): Refer�nciaContext | undefined {
		return this.tryGetRuleContext(0, Refer�nciaContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_campo; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterCampo) {
			listener.enterCampo(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitCampo) {
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
	public VIRGULA(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.VIRGULA, 0); }
	public PONTO_E_VIRGULA(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.PONTO_E_VIRGULA, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_pausa; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterPausa) {
			listener.enterPausa(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitPausa) {
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
	public pausa(): PausaContext[];
	public pausa(i: number): PausaContext;
	public pausa(i?: number): PausaContext | PausaContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PausaContext);
		} else {
			return this.getRuleContext(i, PausaContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_pausas; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterPausas) {
			listener.enterPausas(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitPausas) {
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


export class ConjuncoesContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_conjuncoes; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterConjuncoes) {
			listener.enterConjuncoes(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitConjuncoes) {
			listener.exitConjuncoes(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitConjuncoes) {
			return visitor.visitConjuncoes(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PreposicoesContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_preposicoes; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterPreposicoes) {
			listener.enterPreposicoes(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitPreposicoes) {
			listener.exitPreposicoes(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitPreposicoes) {
			return visitor.visitPreposicoes(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class �Context extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_�; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enter�) {
			listener.enter�(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exit�) {
			listener.exit�(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visit�) {
			return visitor.visit�(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EstruturaContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_estrutura; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterEstrutura) {
			listener.enterEstrutura(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitEstrutura) {
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_igual_a; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterIgual_a) {
			listener.enterIgual_a(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitIgual_a) {
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


export class Variavel_globalContext extends ParserRuleContext {
	public artigo_definido(): Artigo_definidoContext[];
	public artigo_definido(i: number): Artigo_definidoContext;
	public artigo_definido(i?: number): Artigo_definidoContext | Artigo_definidoContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Artigo_definidoContext);
		} else {
			return this.getRuleContext(i, Artigo_definidoContext);
		}
	}
	public nome(): NomeContext[];
	public nome(i: number): NomeContext;
	public nome(i?: number): NomeContext | NomeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NomeContext);
		} else {
			return this.getRuleContext(i, NomeContext);
		}
	}
	public �(): �Context[];
	public �(i: number): �Context;
	public �(i?: number): �Context | �Context[] {
		if (i === undefined) {
			return this.getRuleContexts(�Context);
		} else {
			return this.getRuleContext(i, �Context);
		}
	}
	public artigo_indefinido(): Artigo_indefinidoContext | undefined {
		return this.tryGetRuleContext(0, Artigo_indefinidoContext);
	}
	public nome_do_tipo(): Nome_do_tipoContext | undefined {
		return this.tryGetRuleContext(0, Nome_do_tipoContext);
	}
	public PONTO(): TerminalNode[];
	public PONTO(i: number): TerminalNode;
	public PONTO(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(PortuguesPuroParser.PONTO);
		} else {
			return this.getToken(PortuguesPuroParser.PONTO, i);
		}
	}
	public informacao_opcional(): Informacao_opcionalContext | undefined {
		return this.tryGetRuleContext(0, Informacao_opcionalContext);
	}
	public estrutura(): EstruturaContext | undefined {
		return this.tryGetRuleContext(0, EstruturaContext);
	}
	public com(): ComContext | undefined {
		return this.tryGetRuleContext(0, ComContext);
	}
	public campos(): CamposContext | undefined {
		return this.tryGetRuleContext(0, CamposContext);
	}
	public igual_a(): Igual_aContext | undefined {
		return this.tryGetRuleContext(0, Igual_aContext);
	}
	public termo_constante(): Termo_constanteContext[];
	public termo_constante(i: number): Termo_constanteContext;
	public termo_constante(i?: number): Termo_constanteContext | Termo_constanteContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Termo_constanteContext);
		} else {
			return this.getRuleContext(i, Termo_constanteContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_variavel_global; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterVariavel_global) {
			listener.enterVariavel_global(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitVariavel_global) {
			listener.exitVariavel_global(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitVariavel_global) {
			return visitor.visitVariavel_global(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RotinaContext extends ParserRuleContext {
	public procedimento(): ProcedimentoContext | undefined {
		return this.tryGetRuleContext(0, ProcedimentoContext);
	}
	public decisor(): DecisorContext | undefined {
		return this.tryGetRuleContext(0, DecisorContext);
	}
	public funcao(): FuncaoContext | undefined {
		return this.tryGetRuleContext(0, FuncaoContext);
	}
	public retroinvocacao(): RetroinvocacaoContext | undefined {
		return this.tryGetRuleContext(0, RetroinvocacaoContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_rotina; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterRotina) {
			listener.enterRotina(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitRotina) {
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
	public instrucoes(): InstrucoesContext {
		return this.getRuleContext(0, InstrucoesContext);
	}
	public para(): ParaContext | undefined {
		return this.tryGetRuleContext(0, ParaContext);
	}
	public que_se(): Que_seContext | undefined {
		return this.tryGetRuleContext(0, Que_seContext);
	}
	public nome_da_rotina(): Nome_da_rotinaContext | undefined {
		return this.tryGetRuleContext(0, Nome_da_rotinaContext);
	}
	public PONTO_E_VIRGULA(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.PONTO_E_VIRGULA, 0); }
	public DOIS_PONTOS(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.DOIS_PONTOS, 0); }
	public rotina2(): Rotina2Context | undefined {
		return this.tryGetRuleContext(0, Rotina2Context);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_procedimento; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterProcedimento) {
			listener.enterProcedimento(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitProcedimento) {
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_determine_se; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterDetermine_se) {
			listener.enterDetermine_se(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitDetermine_se) {
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
	public para(): ParaContext {
		return this.getRuleContext(0, ParaContext);
	}
	public que_se(): Que_seContext {
		return this.getRuleContext(0, Que_seContext);
	}
	public determine_se(): Determine_seContext {
		return this.getRuleContext(0, Determine_seContext);
	}
	public nome_da_rotina(): Nome_da_rotinaContext {
		return this.getRuleContext(0, Nome_da_rotinaContext);
	}
	public PONTO_E_VIRGULA(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.PONTO_E_VIRGULA, 0); }
	public rotina2(): Rotina2Context | undefined {
		return this.tryGetRuleContext(0, Rotina2Context);
	}
	public DOIS_PONTOS(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.DOIS_PONTOS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_decisor; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterDecisor) {
			listener.enterDecisor(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitDecisor) {
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


export class Fun��o2Context extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_fun��o2; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterFun��o2) {
			listener.enterFun��o2(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitFun��o2) {
			listener.exitFun��o2(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitFun��o2) {
			return visitor.visitFun��o2(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AtribuaContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_atribua; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterAtribua) {
			listener.enterAtribua(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitAtribua) {
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


export class FuncaoContext extends ParserRuleContext {
	public instrucoes(): InstrucoesContext {
		return this.getRuleContext(0, InstrucoesContext);
	}
	public para(): ParaContext[];
	public para(i: number): ParaContext;
	public para(i?: number): ParaContext | ParaContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParaContext);
		} else {
			return this.getRuleContext(i, ParaContext);
		}
	}
	public que_se(): Que_seContext | undefined {
		return this.tryGetRuleContext(0, Que_seContext);
	}
	public atribua(): AtribuaContext | undefined {
		return this.tryGetRuleContext(0, AtribuaContext);
	}
	public artigo_definido(): Artigo_definidoContext | undefined {
		return this.tryGetRuleContext(0, Artigo_definidoContext);
	}
	public nome_do_tipo(): Nome_do_tipoContext[];
	public nome_do_tipo(i: number): Nome_do_tipoContext;
	public nome_do_tipo(i?: number): Nome_do_tipoContext | Nome_do_tipoContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Nome_do_tipoContext);
		} else {
			return this.getRuleContext(i, Nome_do_tipoContext);
		}
	}
	public atribuidores_de_posse(): Atribuidores_de_posseContext | undefined {
		return this.tryGetRuleContext(0, Atribuidores_de_posseContext);
	}
	public nome(): NomeContext | undefined {
		return this.tryGetRuleContext(0, NomeContext);
	}
	public artigo_indefinido(): Artigo_indefinidoContext | undefined {
		return this.tryGetRuleContext(0, Artigo_indefinidoContext);
	}
	public PONTO_E_VIRGULA(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.PONTO_E_VIRGULA, 0); }
	public DOIS_PONTOS(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.DOIS_PONTOS, 0); }
	public fun��o2(): Fun��o2Context | undefined {
		return this.tryGetRuleContext(0, Fun��o2Context);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_funcao; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterFuncao) {
			listener.enterFuncao(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitFuncao) {
			listener.exitFuncao(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitFuncao) {
			return visitor.visitFuncao(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParaContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_para; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterPara) {
			listener.enterPara(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitPara) {
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_que_se; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterQue_se) {
			listener.enterQue_se(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitQue_se) {
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_rotina2; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterRotina2) {
			listener.enterRotina2(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitRotina2) {
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_compativelmente; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterCompativelmente) {
			listener.enterCompativelmente(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitCompativelmente) {
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


export class RetroinvocacaoContext extends ParserRuleContext {
	public instrucoes(): InstrucoesContext {
		return this.getRuleContext(0, InstrucoesContext);
	}
	public para(): ParaContext | undefined {
		return this.tryGetRuleContext(0, ParaContext);
	}
	public que_se(): Que_seContext | undefined {
		return this.tryGetRuleContext(0, Que_seContext);
	}
	public compativelmente(): CompativelmenteContext | undefined {
		return this.tryGetRuleContext(0, CompativelmenteContext);
	}
	public nome_da_rotina(): Nome_da_rotinaContext | undefined {
		return this.tryGetRuleContext(0, Nome_da_rotinaContext);
	}
	public PONTO_E_VIRGULA(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.PONTO_E_VIRGULA, 0); }
	public DOIS_PONTOS(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.DOIS_PONTOS, 0); }
	public rotina2(): Rotina2Context | undefined {
		return this.tryGetRuleContext(0, Rotina2Context);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_retroinvocacao; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterRetroinvocacao) {
			listener.enterRetroinvocacao(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitRetroinvocacao) {
			listener.exitRetroinvocacao(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitRetroinvocacao) {
			return visitor.visitRetroinvocacao(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Nome_da_rotinaContext extends ParserRuleContext {
	public unidade_semantica(): Unidade_semanticaContext | undefined {
		return this.tryGetRuleContext(0, Unidade_semanticaContext);
	}
	public parametro(): ParametroContext | undefined {
		return this.tryGetRuleContext(0, ParametroContext);
	}
	public frase(): FraseContext | undefined {
		return this.tryGetRuleContext(0, FraseContext);
	}
	public qualificador(): QualificadorContext | undefined {
		return this.tryGetRuleContext(0, QualificadorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_nome_da_rotina; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterNome_da_rotina) {
			listener.enterNome_da_rotina(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitNome_da_rotina) {
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


export class Unidade_semanticaContext extends ParserRuleContext {
	public palavra(): PalavraContext {
		return this.getRuleContext(0, PalavraContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_unidade_semantica; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterUnidade_semantica) {
			listener.enterUnidade_semantica(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitUnidade_semantica) {
			listener.exitUnidade_semantica(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitUnidade_semantica) {
			return visitor.visitUnidade_semantica(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParametroContext extends ParserRuleContext {
	public artigo_indefinido(): Artigo_indefinidoContext {
		return this.getRuleContext(0, Artigo_indefinidoContext);
	}
	public nome(): NomeContext[];
	public nome(i: number): NomeContext;
	public nome(i?: number): NomeContext | NomeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NomeContext);
		} else {
			return this.getRuleContext(i, NomeContext);
		}
	}
	public denominacoes(): DenominacoesContext | undefined {
		return this.tryGetRuleContext(0, DenominacoesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_parametro; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterParametro) {
			listener.enterParametro(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitParametro) {
			listener.exitParametro(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitParametro) {
			return visitor.visitParametro(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FraseContext extends ParserRuleContext {
	public artigo_definido(): Artigo_definidoContext {
		return this.getRuleContext(0, Artigo_definidoContext);
	}
	public nome(): NomeContext {
		return this.getRuleContext(0, NomeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_frase; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterFrase) {
			listener.enterFrase(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitFrase) {
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


export class InstrucoesContext extends ParserRuleContext {
	public instrucao(): InstrucaoContext[];
	public instrucao(i: number): InstrucaoContext;
	public instrucao(i?: number): InstrucaoContext | InstrucaoContext[] {
		if (i === undefined) {
			return this.getRuleContexts(InstrucaoContext);
		} else {
			return this.getRuleContext(i, InstrucaoContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_instrucoes; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterInstrucoes) {
			listener.enterInstrucoes(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitInstrucoes) {
			listener.exitInstrucoes(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitInstrucoes) {
			return visitor.visitInstrucoes(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InstrucaoContext extends ParserRuleContext {
	public preservacao(): PreservacaoContext | undefined {
		return this.tryGetRuleContext(0, PreservacaoContext);
	}
	public iteracao(): IteracaoContext | undefined {
		return this.tryGetRuleContext(0, IteracaoContext);
	}
	public condicional(): CondicionalContext | undefined {
		return this.tryGetRuleContext(0, CondicionalContext);
	}
	public incondicional(): IncondicionalContext | undefined {
		return this.tryGetRuleContext(0, IncondicionalContext);
	}
	public VIRGULA(): TerminalNode | undefined { return this.tryGetToken(PortuguesPuroParser.VIRGULA, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_instrucao; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterInstrucao) {
			listener.enterInstrucao(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitInstrucao) {
			listener.exitInstrucao(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitInstrucao) {
			return visitor.visitInstrucao(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PreserveContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_preserve; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterPreserve) {
			listener.enterPreserve(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitPreserve) {
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


export class PreservacaoContext extends ParserRuleContext {
	public preserve(): PreserveContext {
		return this.getRuleContext(0, PreserveContext);
	}
	public parametro(): ParametroContext {
		return this.getRuleContext(0, ParametroContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_preservacao; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterPreservacao) {
			listener.enterPreservacao(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitPreservacao) {
			listener.exitPreservacao(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitPreservacao) {
			return visitor.visitPreservacao(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IteracaoContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_iteracao; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterIteracao) {
			listener.enterIteracao(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitIteracao) {
			listener.exitIteracao(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitIteracao) {
			return visitor.visitIteracao(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SeContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_se; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterSe) {
			listener.enterSe(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitSe) {
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
	public se(): SeContext {
		return this.getRuleContext(0, SeContext);
	}
	public expressao_decisora(): Expressao_decisoraContext {
		return this.getRuleContext(0, Expressao_decisoraContext);
	}
	public VIRGULA(): TerminalNode { return this.getToken(PortuguesPuroParser.VIRGULA, 0); }
	public incondicional(): IncondicionalContext[];
	public incondicional(i: number): IncondicionalContext;
	public incondicional(i?: number): IncondicionalContext | IncondicionalContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IncondicionalContext);
		} else {
			return this.getRuleContext(i, IncondicionalContext);
		}
	}
	public PONTO(): TerminalNode { return this.getToken(PortuguesPuroParser.PONTO, 0); }
	public PONTO_E_VIRGULA(): TerminalNode[];
	public PONTO_E_VIRGULA(i: number): TerminalNode;
	public PONTO_E_VIRGULA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(PortuguesPuroParser.PONTO_E_VIRGULA);
		} else {
			return this.getToken(PortuguesPuroParser.PONTO_E_VIRGULA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_condicional; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterCondicional) {
			listener.enterCondicional(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitCondicional) {
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


export class Expressao_decisoraContext extends ParserRuleContext {
	public palavra(): PalavraContext[];
	public palavra(i: number): PalavraContext;
	public palavra(i?: number): PalavraContext | PalavraContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PalavraContext);
		} else {
			return this.getRuleContext(i, PalavraContext);
		}
	}
	public verbos(): VerbosContext | undefined {
		return this.tryGetRuleContext(0, VerbosContext);
	}
	public expressao_decisora(): Expressao_decisoraContext | undefined {
		return this.tryGetRuleContext(0, Expressao_decisoraContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_expressao_decisora; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterExpressao_decisora) {
			listener.enterExpressao_decisora(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitExpressao_decisora) {
			listener.exitExpressao_decisora(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitExpressao_decisora) {
			return visitor.visitExpressao_decisora(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IncondicionalContext extends ParserRuleContext {
	public interrupcao(): InterrupcaoContext | undefined {
		return this.tryGetRuleContext(0, InterrupcaoContext);
	}
	public invocacao(): InvocacaoContext | undefined {
		return this.tryGetRuleContext(0, InvocacaoContext);
	}
	public retorno(): RetornoContext | undefined {
		return this.tryGetRuleContext(0, RetornoContext);
	}
	public decodificacao(): DecodificacaoContext | undefined {
		return this.tryGetRuleContext(0, DecodificacaoContext);
	}
	public reiteracao(): ReiteracaoContext | undefined {
		return this.tryGetRuleContext(0, ReiteracaoContext);
	}
	public indirecao(): IndirecaoContext | undefined {
		return this.tryGetRuleContext(0, IndirecaoContext);
	}
	public empilhamento(): EmpilhamentoContext | undefined {
		return this.tryGetRuleContext(0, EmpilhamentoContext);
	}
	public retorno_booleano(): Retorno_booleanoContext | undefined {
		return this.tryGetRuleContext(0, Retorno_booleanoContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_incondicional; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterIncondicional) {
			listener.enterIncondicional(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitIncondicional) {
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


export class InterrupcaoContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_interrupcao; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterInterrupcao) {
			listener.enterInterrupcao(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitInterrupcao) {
			listener.exitInterrupcao(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitInterrupcao) {
			return visitor.visitInterrupcao(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InvocacaoContext extends ParserRuleContext {
	public invocacao_interna(): Invocacao_internaContext | undefined {
		return this.tryGetRuleContext(0, Invocacao_internaContext);
	}
	public invocacao_externa(): Invocacao_externaContext | undefined {
		return this.tryGetRuleContext(0, Invocacao_externaContext);
	}
	public invocacao_indireta(): Invocacao_indiretaContext | undefined {
		return this.tryGetRuleContext(0, Invocacao_indiretaContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_invocacao; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterInvocacao) {
			listener.enterInvocacao(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitInvocacao) {
			listener.exitInvocacao(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitInvocacao) {
			return visitor.visitInvocacao(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Invocacao_internaContext extends ParserRuleContext {
	public unidade_semantica(): Unidade_semanticaContext | undefined {
		return this.tryGetRuleContext(0, Unidade_semanticaContext);
	}
	public express�o(): Express�oContext | undefined {
		return this.tryGetRuleContext(0, Express�oContext);
	}
	public frase(): FraseContext | undefined {
		return this.tryGetRuleContext(0, FraseContext);
	}
	public qualificador(): QualificadorContext | undefined {
		return this.tryGetRuleContext(0, QualificadorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_invocacao_interna; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterInvocacao_interna) {
			listener.enterInvocacao_interna(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitInvocacao_interna) {
			listener.exitInvocacao_interna(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitInvocacao_interna) {
			return visitor.visitInvocacao_interna(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Invocacao_externaContext extends ParserRuleContext {
	public processe(): ProcesseContext {
		return this.getRuleContext(0, ProcesseContext);
	}
	public aspas_duplas(): Aspas_duplasContext[];
	public aspas_duplas(i: number): Aspas_duplasContext;
	public aspas_duplas(i?: number): Aspas_duplasContext | Aspas_duplasContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Aspas_duplasContext);
		} else {
			return this.getRuleContext(i, Aspas_duplasContext);
		}
	}
	public nome_da_DLL(): Nome_da_DLLContext {
		return this.getRuleContext(0, Nome_da_DLLContext);
	}
	public nome_da_funcao(): Nome_da_funcaoContext {
		return this.getRuleContext(0, Nome_da_funcaoContext);
	}
	public com(): ComContext | undefined {
		return this.tryGetRuleContext(0, ComContext);
	}
	public express�o(): Express�oContext[];
	public express�o(i: number): Express�oContext;
	public express�o(i?: number): Express�oContext | Express�oContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Express�oContext);
		} else {
			return this.getRuleContext(i, Express�oContext);
		}
	}
	public e(): EContext[];
	public e(i: number): EContext;
	public e(i?: number): EContext | EContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EContext);
		} else {
			return this.getRuleContext(i, EContext);
		}
	}
	public retornando(): RetornandoContext | undefined {
		return this.tryGetRuleContext(0, RetornandoContext);
	}
	public termo(): TermoContext | undefined {
		return this.tryGetRuleContext(0, TermoContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_invocacao_externa; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterInvocacao_externa) {
			listener.enterInvocacao_externa(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitInvocacao_externa) {
			listener.exitInvocacao_externa(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitInvocacao_externa) {
			return visitor.visitInvocacao_externa(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Aspas_duplasContext extends ParserRuleContext {
	public ASPAS_DUPLAS(): TerminalNode { return this.getToken(PortuguesPuroParser.ASPAS_DUPLAS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_aspas_duplas; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterAspas_duplas) {
			listener.enterAspas_duplas(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitAspas_duplas) {
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
	public palavra(): PalavraContext {
		return this.getRuleContext(0, PalavraContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_nome_da_DLL; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterNome_da_DLL) {
			listener.enterNome_da_DLL(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitNome_da_DLL) {
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


export class Nome_da_funcaoContext extends ParserRuleContext {
	public palavra(): PalavraContext {
		return this.getRuleContext(0, PalavraContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_nome_da_funcao; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterNome_da_funcao) {
			listener.enterNome_da_funcao(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitNome_da_funcao) {
			listener.exitNome_da_funcao(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitNome_da_funcao) {
			return visitor.visitNome_da_funcao(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ProcesseContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_processe; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterProcesse) {
			listener.enterProcesse(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitProcesse) {
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_com; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterCom) {
			listener.enterCom(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitCom) {
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_e; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterE) {
			listener.enterE(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitE) {
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_retornando; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterRetornando) {
			listener.enterRetornando(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitRetornando) {
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


export class Invocacao_indiretaContext extends ParserRuleContext {
	public processe(): ProcesseContext {
		return this.getRuleContext(0, ProcesseContext);
	}
	public express�o(): Express�oContext[];
	public express�o(i: number): Express�oContext;
	public express�o(i?: number): Express�oContext | Express�oContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Express�oContext);
		} else {
			return this.getRuleContext(i, Express�oContext);
		}
	}
	public com(): ComContext | undefined {
		return this.tryGetRuleContext(0, ComContext);
	}
	public e(): EContext[];
	public e(i: number): EContext;
	public e(i?: number): EContext | EContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EContext);
		} else {
			return this.getRuleContext(i, EContext);
		}
	}
	public retornando(): RetornandoContext | undefined {
		return this.tryGetRuleContext(0, RetornandoContext);
	}
	public termo(): TermoContext | undefined {
		return this.tryGetRuleContext(0, TermoContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_invocacao_indireta; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterInvocacao_indireta) {
			listener.enterInvocacao_indireta(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitInvocacao_indireta) {
			listener.exitInvocacao_indireta(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitInvocacao_indireta) {
			return visitor.visitInvocacao_indireta(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RetornoContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_retorno; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterRetorno) {
			listener.enterRetorno(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitRetorno) {
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_decodifique; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterDecodifique) {
			listener.enterDecodifique(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitDecodifique) {
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


export class DecodificacaoContext extends ParserRuleContext {
	public decodifique(): DecodifiqueContext {
		return this.getRuleContext(0, DecodifiqueContext);
	}
	public numero_hexadecimal(): Numero_hexadecimalContext {
		return this.getRuleContext(0, Numero_hexadecimalContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_decodificacao; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterDecodificacao) {
			listener.enterDecodificacao(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitDecodificacao) {
			listener.exitDecodificacao(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitDecodificacao) {
			return visitor.visitDecodificacao(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AponteContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_aponte; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterAponte) {
			listener.enterAponte(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitAponte) {
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_para_rotina; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterPara_rotina) {
			listener.enterPara_rotina(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitPara_rotina) {
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


export class IndirecaoContext extends ParserRuleContext {
	public aponte(): AponteContext {
		return this.getRuleContext(0, AponteContext);
	}
	public artigo(): ArtigoContext {
		return this.getRuleContext(0, ArtigoContext);
	}
	public termo(): TermoContext {
		return this.getRuleContext(0, TermoContext);
	}
	public para_rotina(): Para_rotinaContext {
		return this.getRuleContext(0, Para_rotinaContext);
	}
	public unidade_semantica(): Unidade_semanticaContext | undefined {
		return this.tryGetRuleContext(0, Unidade_semanticaContext);
	}
	public parametro(): ParametroContext | undefined {
		return this.tryGetRuleContext(0, ParametroContext);
	}
	public frase(): FraseContext | undefined {
		return this.tryGetRuleContext(0, FraseContext);
	}
	public qualificador(): QualificadorContext | undefined {
		return this.tryGetRuleContext(0, QualificadorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_indirecao; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterIndirecao) {
			listener.enterIndirecao(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitIndirecao) {
			listener.exitIndirecao(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitIndirecao) {
			return visitor.visitIndirecao(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PushContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_push; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterPush) {
			listener.enterPush(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitPush) {
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
	public push(): PushContext {
		return this.getRuleContext(0, PushContext);
	}
	public express�o(): Express�oContext {
		return this.getRuleContext(0, Express�oContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_empilhamento; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterEmpilhamento) {
			listener.enterEmpilhamento(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitEmpilhamento) {
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


export class ReiteracaoContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_reiteracao; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterReiteracao) {
			listener.enterReiteracao(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitReiteracao) {
			listener.exitReiteracao(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitReiteracao) {
			return visitor.visitReiteracao(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DigaContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_diga; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterDiga) {
			listener.enterDiga(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitDiga) {
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
	public diga(): DigaContext {
		return this.getRuleContext(0, DigaContext);
	}
	public booleano(): BooleanoContext {
		return this.getRuleContext(0, BooleanoContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_retorno_booleano; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterRetorno_booleano) {
			listener.enterRetorno_booleano(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitRetorno_booleano) {
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


export class Express�oContext extends ParserRuleContext {
	public termo(): TermoContext[];
	public termo(i: number): TermoContext;
	public termo(i?: number): TermoContext | TermoContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TermoContext);
		} else {
			return this.getRuleContext(i, TermoContext);
		}
	}
	public operadores_comuns(): Operadores_comunsContext[];
	public operadores_comuns(i: number): Operadores_comunsContext;
	public operadores_comuns(i?: number): Operadores_comunsContext | Operadores_comunsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Operadores_comunsContext);
		} else {
			return this.getRuleContext(i, Operadores_comunsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_express�o; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterExpress�o) {
			listener.enterExpress�o(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitExpress�o) {
			listener.exitExpress�o(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitExpress�o) {
			return visitor.visitExpress�o(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Operadores_comunsContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_operadores_comuns; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterOperadores_comuns) {
			listener.enterOperadores_comuns(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitOperadores_comuns) {
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_booleano; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterBooleano) {
			listener.enterBooleano(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitBooleano) {
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_nulo; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterNulo) {
			listener.enterNulo(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitNulo) {
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
	public termo_constante_negativo(): Termo_constante_negativoContext | undefined {
		return this.tryGetRuleContext(0, Termo_constante_negativoContext);
	}
	public termo_constante_positivo(): Termo_constante_positivoContext | undefined {
		return this.tryGetRuleContext(0, Termo_constante_positivoContext);
	}
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_termo_constante; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterTermo_constante) {
			listener.enterTermo_constante(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitTermo_constante) {
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
	public HIFEN(): TerminalNode { return this.getToken(PortuguesPuroParser.HIFEN, 0); }
	public termo_constante(): Termo_constanteContext {
		return this.getRuleContext(0, Termo_constanteContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_termo_constante_negativo; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterTermo_constante_negativo) {
			listener.enterTermo_constante_negativo(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitTermo_constante_negativo) {
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
	public SINAL_DE_ADICAO(): TerminalNode { return this.getToken(PortuguesPuroParser.SINAL_DE_ADICAO, 0); }
	public termo_constante(): Termo_constanteContext {
		return this.getRuleContext(0, Termo_constanteContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_termo_constante_positivo; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterTermo_constante_positivo) {
			listener.enterTermo_constante_positivo(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitTermo_constante_positivo) {
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


export class NumeroContext extends ParserRuleContext {
	public numero_decimal(): Numero_decimalContext | undefined {
		return this.tryGetRuleContext(0, Numero_decimalContext);
	}
	public numero_fracionario(): Numero_fracionarioContext | undefined {
		return this.tryGetRuleContext(0, Numero_fracionarioContext);
	}
	public numero_misto(): Numero_mistoContext | undefined {
		return this.tryGetRuleContext(0, Numero_mistoContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_numero; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterNumero) {
			listener.enterNumero(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitNumero) {
			listener.exitNumero(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitNumero) {
			return visitor.visitNumero(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	public numero(): NumeroContext | undefined {
		return this.tryGetRuleContext(0, NumeroContext);
	}
	public nome_do_tipo(): Nome_do_tipoContext | undefined {
		return this.tryGetRuleContext(0, Nome_do_tipoContext);
	}
	public string_literal(): String_literalContext | undefined {
		return this.tryGetRuleContext(0, String_literalContext);
	}
	public numero_hexadecimal(): Numero_hexadecimalContext | undefined {
		return this.tryGetRuleContext(0, Numero_hexadecimalContext);
	}
	public booleano(): BooleanoContext | undefined {
		return this.tryGetRuleContext(0, BooleanoContext);
	}
	public nulo(): NuloContext | undefined {
		return this.tryGetRuleContext(0, NuloContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_literal; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterLiteral) {
			listener.enterLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitLiteral) {
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
	public termo_negativo(): Termo_negativoContext | undefined {
		return this.tryGetRuleContext(0, Termo_negativoContext);
	}
	public termo_positivo(): Termo_positivoContext | undefined {
		return this.tryGetRuleContext(0, Termo_positivoContext);
	}
	public variavel_local(): Variavel_localContext | undefined {
		return this.tryGetRuleContext(0, Variavel_localContext);
	}
	public variavel(): VariavelContext | undefined {
		return this.tryGetRuleContext(0, VariavelContext);
	}
	public termo_literal(): Termo_literalContext | undefined {
		return this.tryGetRuleContext(0, Termo_literalContext);
	}
	public como(): ComoContext | undefined {
		return this.tryGetRuleContext(0, ComoContext);
	}
	public artigo_indefinido(): Artigo_indefinidoContext | undefined {
		return this.tryGetRuleContext(0, Artigo_indefinidoContext);
	}
	public nome_do_tipo(): Nome_do_tipoContext | undefined {
		return this.tryGetRuleContext(0, Nome_do_tipoContext);
	}
	public sinal_de_divis�o(): Sinal_de_divis�oContext | undefined {
		return this.tryGetRuleContext(0, Sinal_de_divis�oContext);
	}
	public termo(): TermoContext | undefined {
		return this.tryGetRuleContext(0, TermoContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_termo; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterTermo) {
			listener.enterTermo(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitTermo) {
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


export class Sinal_de_divis�oContext extends ParserRuleContext {
	public BARRA_INCLINADA(): TerminalNode { return this.getToken(PortuguesPuroParser.BARRA_INCLINADA, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_sinal_de_divis�o; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterSinal_de_divis�o) {
			listener.enterSinal_de_divis�o(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitSinal_de_divis�o) {
			listener.exitSinal_de_divis�o(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitSinal_de_divis�o) {
			return visitor.visitSinal_de_divis�o(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ComoContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_como; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterComo) {
			listener.enterComo(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitComo) {
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
	public HIFEN(): TerminalNode { return this.getToken(PortuguesPuroParser.HIFEN, 0); }
	public termo(): TermoContext {
		return this.getRuleContext(0, TermoContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_termo_negativo; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterTermo_negativo) {
			listener.enterTermo_negativo(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitTermo_negativo) {
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
	public SINAL_DE_ADICAO(): TerminalNode { return this.getToken(PortuguesPuroParser.SINAL_DE_ADICAO, 0); }
	public termo(): TermoContext {
		return this.getRuleContext(0, TermoContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_termo_positivo; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterTermo_positivo) {
			listener.enterTermo_positivo(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitTermo_positivo) {
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


export class Variavel_localContext extends ParserRuleContext {
	public artigo_indefinido(): Artigo_indefinidoContext | undefined {
		return this.tryGetRuleContext(0, Artigo_indefinidoContext);
	}
	public nome(): NomeContext[];
	public nome(i: number): NomeContext;
	public nome(i?: number): NomeContext | NomeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NomeContext);
		} else {
			return this.getRuleContext(i, NomeContext);
		}
	}
	public denominacoes(): DenominacoesContext | undefined {
		return this.tryGetRuleContext(0, DenominacoesContext);
	}
	public artigo_definido(): Artigo_definidoContext | undefined {
		return this.tryGetRuleContext(0, Artigo_definidoContext);
	}
	public atribuidores_de_posse(): Atribuidores_de_posseContext | undefined {
		return this.tryGetRuleContext(0, Atribuidores_de_posseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_variavel_local; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterVariavel_local) {
			listener.enterVariavel_local(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitVariavel_local) {
			listener.exitVariavel_local(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitVariavel_local) {
			return visitor.visitVariavel_local(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariavelContext extends ParserRuleContext {
	public artigo_definido(): Artigo_definidoContext {
		return this.getRuleContext(0, Artigo_definidoContext);
	}
	public possessivo_portugu�s(): Possessivo_portugu�sContext {
		return this.getRuleContext(0, Possessivo_portugu�sContext);
	}
	public p2(): P2Context {
		return this.getRuleContext(0, P2Context);
	}
	public nome(): NomeContext {
		return this.getRuleContext(0, NomeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_variavel; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterVariavel) {
			listener.enterVariavel(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitVariavel) {
			listener.exitVariavel(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitVariavel) {
			return visitor.visitVariavel(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Termo_literalContext extends ParserRuleContext {
	public literal(): LiteralContext {
		return this.getRuleContext(0, LiteralContext);
	}
	public possessivos_ingl�s(): Possessivos_ingl�sContext {
		return this.getRuleContext(0, Possessivos_ingl�sContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_termo_literal; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterTermo_literal) {
			listener.enterTermo_literal(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitTermo_literal) {
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


export class Conte�doContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_conte�do; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterConte�do) {
			listener.enterConte�do(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitConte�do) {
			listener.exitConte�do(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitConte�do) {
			return visitor.visitConte�do(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MagnitudeContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_magnitude; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterMagnitude) {
			listener.enterMagnitude(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitMagnitude) {
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


export class Endere�amentoContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_endere�amento; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterEndere�amento) {
			listener.enterEndere�amento(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitEndere�amento) {
			listener.exitEndere�amento(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitEndere�amento) {
			return visitor.visitEndere�amento(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Possessivos_ingl�sContext extends ParserRuleContext {
	public possessivo_ingl�s_antigo(): Possessivo_ingl�s_antigoContext[];
	public possessivo_ingl�s_antigo(i: number): Possessivo_ingl�s_antigoContext;
	public possessivo_ingl�s_antigo(i?: number): Possessivo_ingl�s_antigoContext | Possessivo_ingl�s_antigoContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Possessivo_ingl�s_antigoContext);
		} else {
			return this.getRuleContext(i, Possessivo_ingl�s_antigoContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_possessivos_ingl�s; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterPossessivos_ingl�s) {
			listener.enterPossessivos_ingl�s(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitPossessivos_ingl�s) {
			listener.exitPossessivos_ingl�s(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitPossessivos_ingl�s) {
			return visitor.visitPossessivos_ingl�s(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Possessivo_ingl�s_antigoContext extends ParserRuleContext {
	public apostrofo(): ApostrofoContext {
		return this.getRuleContext(0, ApostrofoContext);
	}
	public nome(): NomeContext | undefined {
		return this.tryGetRuleContext(0, NomeContext);
	}
	public funcao(): FuncaoContext | undefined {
		return this.tryGetRuleContext(0, FuncaoContext);
	}
	public conte�do(): Conte�doContext | undefined {
		return this.tryGetRuleContext(0, Conte�doContext);
	}
	public magnitude(): MagnitudeContext | undefined {
		return this.tryGetRuleContext(0, MagnitudeContext);
	}
	public endere�amento(): Endere�amentoContext | undefined {
		return this.tryGetRuleContext(0, Endere�amentoContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_possessivo_ingl�s_antigo; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterPossessivo_ingl�s_antigo) {
			listener.enterPossessivo_ingl�s_antigo(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitPossessivo_ingl�s_antigo) {
			listener.exitPossessivo_ingl�s_antigo(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitPossessivo_ingl�s_antigo) {
			return visitor.visitPossessivo_ingl�s_antigo(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Possessivo_portugu�sContext extends ParserRuleContext {
	public p2(): P2Context {
		return this.getRuleContext(0, P2Context);
	}
	public nome(): NomeContext | undefined {
		return this.tryGetRuleContext(0, NomeContext);
	}
	public funcao(): FuncaoContext | undefined {
		return this.tryGetRuleContext(0, FuncaoContext);
	}
	public conte�do(): Conte�doContext | undefined {
		return this.tryGetRuleContext(0, Conte�doContext);
	}
	public magnitude(): MagnitudeContext | undefined {
		return this.tryGetRuleContext(0, MagnitudeContext);
	}
	public endere�amento(): Endere�amentoContext | undefined {
		return this.tryGetRuleContext(0, Endere�amentoContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_possessivo_portugu�s; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterPossessivo_portugu�s) {
			listener.enterPossessivo_portugu�s(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitPossessivo_portugu�s) {
			listener.exitPossessivo_portugu�s(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitPossessivo_portugu�s) {
			return visitor.visitPossessivo_portugu�s(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ApostrofoContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PortuguesPuroParser.RULE_apostrofo; }
	// @Override
	public enterRule(listener: PortuguesPuroListener): void {
		if (listener.enterApostrofo) {
			listener.enterApostrofo(this);
		}
	}
	// @Override
	public exitRule(listener: PortuguesPuroListener): void {
		if (listener.exitApostrofo) {
			listener.exitApostrofo(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PortuguesPuroVisitor<Result>): Result {
		if (visitor.visitApostrofo) {
			return visitor.visitApostrofo(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


