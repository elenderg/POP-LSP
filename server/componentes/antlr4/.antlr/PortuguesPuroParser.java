// Generated from e:/POP-LSP/server/componentes/antlr4/PortuguesPuro.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue"})
public class PortuguesPuroParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.13.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, T__11=12, T__12=13, T__13=14, T__14=15, T__15=16, T__16=17, 
		T__17=18, T__18=19, T__19=20, T__20=21, T__21=22, T__22=23, T__23=24, 
		T__24=25, T__25=26, T__26=27, T__27=28, T__28=29, T__29=30, T__30=31, 
		T__31=32, T__32=33, T__33=34, T__34=35, T__35=36, T__36=37, T__37=38, 
		T__38=39, T__39=40, T__40=41, T__41=42, T__42=43, T__43=44, T__44=45, 
		T__45=46, T__46=47, T__47=48, T__48=49, T__49=50, T__50=51, T__51=52, 
		T__52=53, T__53=54, T__54=55, T__55=56, T__56=57, T__57=58, T__58=59, 
		T__59=60, T__60=61, T__61=62, T__62=63, T__63=64, T__64=65, T__65=66, 
		T__66=67, T__67=68, T__68=69, T__69=70, T__70=71, T__71=72, T__72=73, 
		T__73=74, T__74=75, T__75=76, T__76=77, T__77=78, T__78=79, T__79=80, 
		T__80=81, T__81=82, T__82=83, T__83=84, T__84=85, T__85=86, T__86=87, 
		T__87=88, T__88=89, T__89=90, T__90=91, T__91=92, T__92=93, T__93=94, 
		T__94=95, T__95=96, T__96=97, T__97=98, T__98=99, T__99=100, T__100=101, 
		T__101=102, T__102=103, T__103=104, T__104=105, T__105=106, T__106=107, 
		T__107=108, T__108=109, T__109=110, T__110=111, T__111=112, T__112=113, 
		T__113=114, T__114=115, T__115=116, T__116=117, T__117=118, T__118=119, 
		T__119=120, T__120=121, T__121=122, T__122=123, T__123=124, T__124=125, 
		T__125=126, T__126=127, T__127=128, T__128=129, T__129=130, T__130=131, 
		T__131=132, T__132=133, T__133=134, T__134=135, T__135=136, T__136=137, 
		T__137=138, T__138=139, T__139=140, T__140=141, T__141=142, T__142=143, 
		T__143=144, T__144=145, T__145=146, T__146=147, T__147=148, T__148=149, 
		T__149=150, T__150=151, T__151=152, T__152=153, T__153=154, T__154=155, 
		T__155=156, T__156=157, T__157=158, T__158=159, T__159=160, T__160=161, 
		T__161=162, T__162=163, T__163=164, T__164=165, T__165=166, T__166=167, 
		T__167=168, T__168=169, T__169=170, T__170=171, T__171=172, T__172=173, 
		T__173=174, T__174=175, T__175=176, T__176=177, T__177=178, T__178=179, 
		T__179=180, T__180=181, T__181=182, LETRA=183, DIGITO=184, SIMBOLO=185, 
		ESPACO=186, APOSTROFO=187, ASPAS_DUPLAS=188, HIFEN=189, CIFRAO=190, ESPACO_EM_BRANCO=191, 
		ESPACO_RIGIDO=192, QUEBRA_DE_LINHA=193, BARRA_INCLINADA=194, BARRA_INVERTIDA=195, 
		SINAL_DE_ADICAO=196, PONTO=197, VIRGULA=198, PONTO_E_VIRGULA=199, DOIS_PONTOS=200, 
		ABRE_PARENTESES=201, FECHA_PARENTESES=202, ABRE_COLCHETES=203, FECHA_COLCHETES=204, 
		CARACTERES_IMPRIMIVEIS=205, CARACTERES_DE_CONTROLE=206;
	public static final int
		RULE_regra_espaco = 0, RULE_palavra = 1, RULE_possessivo_inglês = 2, RULE_artigo = 3, 
		RULE_artigo_definido = 4, RULE_artigo_indefinido = 5, RULE_adjacentes = 6, 
		RULE_abrangentes = 7, RULE_contracoes = 8, RULE_atribuidores_de_posse = 9, 
		RULE_p1 = 10, RULE_p2 = 11, RULE_operadores_de_comparacao = 12, RULE_palavras_reservadas = 13, 
		RULE_denominacoes = 14, RULE_verbos = 15, RULE_caracteres_ignoraveis = 16, 
		RULE_comentario = 17, RULE_comentario_de_linha = 18, RULE_comentario_de_bloco = 19, 
		RULE_token = 20, RULE_aglomerado = 21, RULE_caractere_aglomeravel = 22, 
		RULE_iniciador_de_aglomerado = 23, RULE_possessivo_novo = 24, RULE_qualificador = 25, 
		RULE_caractere_nao_aglomeravel = 26, RULE_sinal_de_pontuacao = 27, RULE_simbolos_especiais = 28, 
		RULE_noise = 29, RULE_numero_inteiro = 30, RULE_numero_decimal = 31, RULE_numero_fracionario = 32, 
		RULE_numero_misto = 33, RULE_numero_hexadecimal = 34, RULE_string_literal = 35, 
		RULE_programa = 36, RULE_tipos_primitivos = 37, RULE_tipo = 38, RULE_nome = 39, 
		RULE_nome_do_tipo = 40, RULE_informacao_opcional = 41, RULE_campos = 42, 
		RULE_bytes = 43, RULE_referência = 44, RULE_campo = 45, RULE_pausa = 46, 
		RULE_pausas = 47, RULE_conjuncoes = 48, RULE_preposicoes = 49, RULE_é = 50, 
		RULE_estrutura = 51, RULE_igual_a = 52, RULE_variavel_global = 53, RULE_rotina = 54, 
		RULE_procedimento = 55, RULE_determine_se = 56, RULE_decisor = 57, RULE_função2 = 58, 
		RULE_atribua = 59, RULE_funcao = 60, RULE_para = 61, RULE_que_se = 62, 
		RULE_rotina2 = 63, RULE_compativelmente = 64, RULE_retroinvocacao = 65, 
		RULE_nome_da_rotina = 66, RULE_unidade_semantica = 67, RULE_parametro = 68, 
		RULE_frase = 69, RULE_instrucoes = 70, RULE_instrucao = 71, RULE_preserve = 72, 
		RULE_preservacao = 73, RULE_iteracao = 74, RULE_se = 75, RULE_condicional = 76, 
		RULE_expressao_decisora = 77, RULE_incondicional = 78, RULE_interrupcao = 79, 
		RULE_invocacao = 80, RULE_invocacao_interna = 81, RULE_invocacao_externa = 82, 
		RULE_aspas_duplas = 83, RULE_nome_da_DLL = 84, RULE_nome_da_funcao = 85, 
		RULE_processe = 86, RULE_com = 87, RULE_e = 88, RULE_retornando = 89, 
		RULE_invocacao_indireta = 90, RULE_retorno = 91, RULE_decodifique = 92, 
		RULE_decodificacao = 93, RULE_aponte = 94, RULE_para_rotina = 95, RULE_indirecao = 96, 
		RULE_push = 97, RULE_empilhamento = 98, RULE_reiteracao = 99, RULE_diga = 100, 
		RULE_retorno_booleano = 101, RULE_expressão = 102, RULE_operadores_comuns = 103, 
		RULE_booleano = 104, RULE_nulo = 105, RULE_termo_constante = 106, RULE_termo_constante_negativo = 107, 
		RULE_termo_constante_positivo = 108, RULE_numero = 109, RULE_literal = 110, 
		RULE_termo = 111, RULE_sinal_de_divisão = 112, RULE_como = 113, RULE_termo_negativo = 114, 
		RULE_termo_positivo = 115, RULE_variavel_local = 116, RULE_variavel = 117, 
		RULE_termo_literal = 118, RULE_conteúdo = 119, RULE_magnitude = 120, RULE_endereçamento = 121, 
		RULE_possessivos_inglês = 122, RULE_possessivo_inglês_antigo = 123, RULE_possessivo_português = 124, 
		RULE_apostrofo = 125;
	private static String[] makeRuleNames() {
		return new String[] {
			"regra_espaco", "palavra", "possessivo_inglês", "artigo", "artigo_definido", 
			"artigo_indefinido", "adjacentes", "abrangentes", "contracoes", "atribuidores_de_posse", 
			"p1", "p2", "operadores_de_comparacao", "palavras_reservadas", "denominacoes", 
			"verbos", "caracteres_ignoraveis", "comentario", "comentario_de_linha", 
			"comentario_de_bloco", "token", "aglomerado", "caractere_aglomeravel", 
			"iniciador_de_aglomerado", "possessivo_novo", "qualificador", "caractere_nao_aglomeravel", 
			"sinal_de_pontuacao", "simbolos_especiais", "noise", "numero_inteiro", 
			"numero_decimal", "numero_fracionario", "numero_misto", "numero_hexadecimal", 
			"string_literal", "programa", "tipos_primitivos", "tipo", "nome", "nome_do_tipo", 
			"informacao_opcional", "campos", "bytes", "referência", "campo", "pausa", 
			"pausas", "conjuncoes", "preposicoes", "é", "estrutura", "igual_a", "variavel_global", 
			"rotina", "procedimento", "determine_se", "decisor", "função2", "atribua", 
			"funcao", "para", "que_se", "rotina2", "compativelmente", "retroinvocacao", 
			"nome_da_rotina", "unidade_semantica", "parametro", "frase", "instrucoes", 
			"instrucao", "preserve", "preservacao", "iteracao", "se", "condicional", 
			"expressao_decisora", "incondicional", "interrupcao", "invocacao", "invocacao_interna", 
			"invocacao_externa", "aspas_duplas", "nome_da_DLL", "nome_da_funcao", 
			"processe", "com", "e", "retornando", "invocacao_indireta", "retorno", 
			"decodifique", "decodificacao", "aponte", "para_rotina", "indirecao", 
			"push", "empilhamento", "reiteracao", "diga", "retorno_booleano", "expressão", 
			"operadores_comuns", "booleano", "nulo", "termo_constante", "termo_constante_negativo", 
			"termo_constante_positivo", "numero", "literal", "termo", "sinal_de_divisão", 
			"como", "termo_negativo", "termo_positivo", "variavel_local", "variavel", 
			"termo_literal", "conteúdo", "magnitude", "endereçamento", "possessivos_inglês", 
			"possessivo_inglês_antigo", "possessivo_português", "apostrofo"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "' '", "'o'", "'a'", "'os'", "'as'", "'um'", "'uma'", "'uns'", 
			"'umas'", "'este'", "'esta'", "'estes'", "'estas'", "'esse'", "'essa'", 
			"'esses'", "'essas'", "'ao'", "'\\u00E0'", "'aos'", "'\\u00E0s'", "'no'", 
			"'na'", "'nos'", "'nas'", "'pelo'", "'pela'", "'pelos'", "'pelas'", "'num'", 
			"'numa'", "'nuns'", "'numas'", "'dum'", "'duma'", "'duns'", "'dumas'", 
			"'desse'", "'dessa'", "'desses'", "'dessas'", "'deste'", "'desta'", "'destes'", 
			"'destas'", "'igual a'", "'diferente de'", "'maior que'", "'maior do que'", 
			"'maior ou igual a'", "'menor que'", "'menor do que'", "'menor ou igual a'", 
			"'Se'", "'Itere'", "'Reitere'", "'Pare'", "'Retorne'", "'Preserve'", 
			"'Diga'", "'sim'", "'n\\u00E3o'", "'original'", "'Decodifique'", "'Processe'", 
			"'retornando'", "'Push'", "'Pop'", "'nulo'", "'vazio'", "'inexistente'", 
			"'denominado'", "'denominada'", "'denominados'", "'denominadas'", "'chamado'", 
			"'chamada'", "'chamados'", "'chamadas'", "'\\u00E9'", "'est\\u00E1'", 
			"'estiver'", "'for'", "'forem'", "'s\\u00E3o'", "'est\\u00E3o'", "'estiverem'", 
			"'ser'", "'serem'", "'estar'", "'poder'", "'puder'", "'foi'", "'estamos'", 
			"'h\\u00E1'", "'pode'", "'existe'", "'existir'", "'cont\\u00E9m'", "'contiver'", 
			"'possui'", "'possuir'", "'~'", "'@'", "'#'", "'%'", "'_'", "'&'", "'!'", 
			"'?'", "'|'", "'*'", "'^'", "'<'", "'>'", "'{'", "'}'", "'byte'", "'caractere'", 
			"'word'", "'n\\u00FAmero'", "'sinalizador'", "'ponteiro'", "'estrutura'", 
			"'string'", "'subtexto'", "'texto hexadecimal'", "'lista'", "'lista estruturada'", 
			"'listas'", "'propor\\u00E7\\u00E3o'", "'fra\\u00E7\\u00E3o'", "'numerador'", 
			"'denominador'", "'bytes'", "'(refer\\u00EAncia)'", "'sob'", "'e'", "'ou'", 
			"'nem'", "'usando'", "'com'", "'por'", "'contendo'", "'desde'", "'entre'", 
			"'sobre'", "'cima'", "'embaixo'", "'abaixo'", "'antes'", "'depois'", 
			"'ap\\u00F3s'", "'cerca'", "'pr\\u00F3ximo'", "'at\\u00E9'", "'aproximadamente'", 
			"'como'", "'determine se'", "'Fun\\u00E7\\u00E3o'", "'atribua'", "'para'", 
			"'que se'", "'Rotina'", "'compativelmente'", "'Itere.'", "'Aponte'", 
			"'para a rotina'", "'Empilhe'", "'mais'", "'menos'", "'vezes'", "'multiplicado por'", 
			"'dividido por'", "'junto com'", "'seguido de'", "'acompanhado de'", 
			"'tal como'", "'conte\\u00FAdo'", "'magnitude'", "'endere\\u00E7amento'", 
			"''s'", null, null, null, null, "'''", "'\\\"'", "'-'", "'$'", null, 
			"'\\u00A0'", null, "'/'", "'\\'", "'+'", "'.'", "','", "';'", "':'", 
			"'('", "')'", "'['", "']'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, "LETRA", "DIGITO", "SIMBOLO", "ESPACO", "APOSTROFO", 
			"ASPAS_DUPLAS", "HIFEN", "CIFRAO", "ESPACO_EM_BRANCO", "ESPACO_RIGIDO", 
			"QUEBRA_DE_LINHA", "BARRA_INCLINADA", "BARRA_INVERTIDA", "SINAL_DE_ADICAO", 
			"PONTO", "VIRGULA", "PONTO_E_VIRGULA", "DOIS_PONTOS", "ABRE_PARENTESES", 
			"FECHA_PARENTESES", "ABRE_COLCHETES", "FECHA_COLCHETES", "CARACTERES_IMPRIMIVEIS", 
			"CARACTERES_DE_CONTROLE"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "PortuguesPuro.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public PortuguesPuroParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Regra_espacoContext extends ParserRuleContext {
		public Regra_espacoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_regra_espaco; }
	}

	public final Regra_espacoContext regra_espaco() throws RecognitionException {
		Regra_espacoContext _localctx = new Regra_espacoContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_regra_espaco);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(252);
			match(T__0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class PalavraContext extends ParserRuleContext {
		public List<TerminalNode> CARACTERES_IMPRIMIVEIS() { return getTokens(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS); }
		public TerminalNode CARACTERES_IMPRIMIVEIS(int i) {
			return getToken(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS, i);
		}
		public PalavraContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_palavra; }
	}

	public final PalavraContext palavra() throws RecognitionException {
		PalavraContext _localctx = new PalavraContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_palavra);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(255); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(254);
					match(CARACTERES_IMPRIMIVEIS);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(257); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,0,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Possessivo_inglêsContext extends ParserRuleContext {
		public PalavraContext palavra() {
			return getRuleContext(PalavraContext.class,0);
		}
		public TerminalNode APOSTROFO() { return getToken(PortuguesPuroParser.APOSTROFO, 0); }
		public Possessivo_inglêsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_possessivo_inglês; }
	}

	public final Possessivo_inglêsContext possessivo_inglês() throws RecognitionException {
		Possessivo_inglêsContext _localctx = new Possessivo_inglêsContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_possessivo_inglês);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(259);
			palavra();
			setState(260);
			match(APOSTROFO);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ArtigoContext extends ParserRuleContext {
		public Artigo_definidoContext artigo_definido() {
			return getRuleContext(Artigo_definidoContext.class,0);
		}
		public Artigo_indefinidoContext artigo_indefinido() {
			return getRuleContext(Artigo_indefinidoContext.class,0);
		}
		public ArtigoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_artigo; }
	}

	public final ArtigoContext artigo() throws RecognitionException {
		ArtigoContext _localctx = new ArtigoContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_artigo);
		try {
			setState(264);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__1:
			case T__2:
			case T__3:
			case T__4:
			case T__9:
			case T__10:
			case T__11:
			case T__12:
				enterOuterAlt(_localctx, 1);
				{
				setState(262);
				artigo_definido();
				}
				break;
			case T__5:
			case T__6:
			case T__7:
			case T__8:
			case T__13:
			case T__14:
			case T__15:
			case T__16:
				enterOuterAlt(_localctx, 2);
				{
				setState(263);
				artigo_indefinido();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Artigo_definidoContext extends ParserRuleContext {
		public AdjacentesContext adjacentes() {
			return getRuleContext(AdjacentesContext.class,0);
		}
		public Artigo_definidoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_artigo_definido; }
	}

	public final Artigo_definidoContext artigo_definido() throws RecognitionException {
		Artigo_definidoContext _localctx = new Artigo_definidoContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_artigo_definido);
		try {
			setState(271);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__1:
				enterOuterAlt(_localctx, 1);
				{
				setState(266);
				match(T__1);
				}
				break;
			case T__2:
				enterOuterAlt(_localctx, 2);
				{
				setState(267);
				match(T__2);
				}
				break;
			case T__3:
				enterOuterAlt(_localctx, 3);
				{
				setState(268);
				match(T__3);
				}
				break;
			case T__4:
				enterOuterAlt(_localctx, 4);
				{
				setState(269);
				match(T__4);
				}
				break;
			case T__9:
			case T__10:
			case T__11:
			case T__12:
				enterOuterAlt(_localctx, 5);
				{
				setState(270);
				adjacentes();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Artigo_indefinidoContext extends ParserRuleContext {
		public AbrangentesContext abrangentes() {
			return getRuleContext(AbrangentesContext.class,0);
		}
		public Artigo_indefinidoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_artigo_indefinido; }
	}

	public final Artigo_indefinidoContext artigo_indefinido() throws RecognitionException {
		Artigo_indefinidoContext _localctx = new Artigo_indefinidoContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_artigo_indefinido);
		try {
			setState(278);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__5:
				enterOuterAlt(_localctx, 1);
				{
				setState(273);
				match(T__5);
				}
				break;
			case T__6:
				enterOuterAlt(_localctx, 2);
				{
				setState(274);
				match(T__6);
				}
				break;
			case T__7:
				enterOuterAlt(_localctx, 3);
				{
				setState(275);
				match(T__7);
				}
				break;
			case T__8:
				enterOuterAlt(_localctx, 4);
				{
				setState(276);
				match(T__8);
				}
				break;
			case T__13:
			case T__14:
			case T__15:
			case T__16:
				enterOuterAlt(_localctx, 5);
				{
				setState(277);
				abrangentes();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class AdjacentesContext extends ParserRuleContext {
		public AdjacentesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_adjacentes; }
	}

	public final AdjacentesContext adjacentes() throws RecognitionException {
		AdjacentesContext _localctx = new AdjacentesContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_adjacentes);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(280);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 15360L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class AbrangentesContext extends ParserRuleContext {
		public AbrangentesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_abrangentes; }
	}

	public final AbrangentesContext abrangentes() throws RecognitionException {
		AbrangentesContext _localctx = new AbrangentesContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_abrangentes);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(282);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 245760L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ContracoesContext extends ParserRuleContext {
		public Atribuidores_de_posseContext atribuidores_de_posse() {
			return getRuleContext(Atribuidores_de_posseContext.class,0);
		}
		public P1Context p1() {
			return getRuleContext(P1Context.class,0);
		}
		public P2Context p2() {
			return getRuleContext(P2Context.class,0);
		}
		public ContracoesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_contracoes; }
	}

	public final ContracoesContext contracoes() throws RecognitionException {
		ContracoesContext _localctx = new ContracoesContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_contracoes);
		try {
			setState(303);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__17:
				enterOuterAlt(_localctx, 1);
				{
				setState(284);
				match(T__17);
				}
				break;
			case T__18:
				enterOuterAlt(_localctx, 2);
				{
				setState(285);
				match(T__18);
				}
				break;
			case T__19:
				enterOuterAlt(_localctx, 3);
				{
				setState(286);
				match(T__19);
				}
				break;
			case T__20:
				enterOuterAlt(_localctx, 4);
				{
				setState(287);
				match(T__20);
				}
				break;
			case T__21:
				enterOuterAlt(_localctx, 5);
				{
				setState(288);
				match(T__21);
				}
				break;
			case T__22:
				enterOuterAlt(_localctx, 6);
				{
				setState(289);
				match(T__22);
				}
				break;
			case T__23:
				enterOuterAlt(_localctx, 7);
				{
				setState(290);
				match(T__23);
				}
				break;
			case T__24:
				enterOuterAlt(_localctx, 8);
				{
				setState(291);
				match(T__24);
				}
				break;
			case T__25:
				enterOuterAlt(_localctx, 9);
				{
				setState(292);
				match(T__25);
				}
				break;
			case T__26:
				enterOuterAlt(_localctx, 10);
				{
				setState(293);
				match(T__26);
				}
				break;
			case T__27:
				enterOuterAlt(_localctx, 11);
				{
				setState(294);
				match(T__27);
				}
				break;
			case T__28:
				enterOuterAlt(_localctx, 12);
				{
				setState(295);
				match(T__28);
				}
				break;
			case T__29:
				enterOuterAlt(_localctx, 13);
				{
				setState(296);
				match(T__29);
				}
				break;
			case T__30:
				enterOuterAlt(_localctx, 14);
				{
				setState(297);
				match(T__30);
				}
				break;
			case T__31:
				enterOuterAlt(_localctx, 15);
				{
				setState(298);
				match(T__31);
				}
				break;
			case T__32:
				enterOuterAlt(_localctx, 16);
				{
				setState(299);
				match(T__32);
				}
				break;
			case T__33:
			case T__34:
			case T__35:
			case T__36:
				enterOuterAlt(_localctx, 17);
				{
				setState(300);
				atribuidores_de_posse();
				}
				break;
			case T__37:
			case T__38:
			case T__39:
			case T__40:
				enterOuterAlt(_localctx, 18);
				{
				setState(301);
				p1();
				}
				break;
			case T__41:
			case T__42:
			case T__43:
			case T__44:
				enterOuterAlt(_localctx, 19);
				{
				setState(302);
				p2();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Atribuidores_de_posseContext extends ParserRuleContext {
		public Atribuidores_de_posseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_atribuidores_de_posse; }
	}

	public final Atribuidores_de_posseContext atribuidores_de_posse() throws RecognitionException {
		Atribuidores_de_posseContext _localctx = new Atribuidores_de_posseContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_atribuidores_de_posse);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(305);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 257698037760L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class P1Context extends ParserRuleContext {
		public P1Context(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_p1; }
	}

	public final P1Context p1() throws RecognitionException {
		P1Context _localctx = new P1Context(_ctx, getState());
		enterRule(_localctx, 20, RULE_p1);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(307);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 4123168604160L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class P2Context extends ParserRuleContext {
		public P2Context(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_p2; }
	}

	public final P2Context p2() throws RecognitionException {
		P2Context _localctx = new P2Context(_ctx, getState());
		enterRule(_localctx, 22, RULE_p2);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(309);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 65970697666560L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Operadores_de_comparacaoContext extends ParserRuleContext {
		public Operadores_de_comparacaoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_operadores_de_comparacao; }
	}

	public final Operadores_de_comparacaoContext operadores_de_comparacao() throws RecognitionException {
		Operadores_de_comparacaoContext _localctx = new Operadores_de_comparacaoContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_operadores_de_comparacao);
		try {
			setState(320);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case EOF:
				enterOuterAlt(_localctx, 1);
				{
				}
				break;
			case T__45:
				enterOuterAlt(_localctx, 2);
				{
				setState(312);
				match(T__45);
				}
				break;
			case T__46:
				enterOuterAlt(_localctx, 3);
				{
				setState(313);
				match(T__46);
				}
				break;
			case T__47:
				enterOuterAlt(_localctx, 4);
				{
				setState(314);
				match(T__47);
				}
				break;
			case T__48:
				enterOuterAlt(_localctx, 5);
				{
				setState(315);
				match(T__48);
				}
				break;
			case T__49:
				enterOuterAlt(_localctx, 6);
				{
				setState(316);
				match(T__49);
				}
				break;
			case T__50:
				enterOuterAlt(_localctx, 7);
				{
				setState(317);
				match(T__50);
				}
				break;
			case T__51:
				enterOuterAlt(_localctx, 8);
				{
				setState(318);
				match(T__51);
				}
				break;
			case T__52:
				enterOuterAlt(_localctx, 9);
				{
				setState(319);
				match(T__52);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Palavras_reservadasContext extends ParserRuleContext {
		public DenominacoesContext denominacoes() {
			return getRuleContext(DenominacoesContext.class,0);
		}
		public Palavras_reservadasContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_palavras_reservadas; }
	}

	public final Palavras_reservadasContext palavras_reservadas() throws RecognitionException {
		Palavras_reservadasContext _localctx = new Palavras_reservadasContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_palavras_reservadas);
		try {
			setState(341);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__53:
				enterOuterAlt(_localctx, 1);
				{
				setState(322);
				match(T__53);
				}
				break;
			case T__54:
				enterOuterAlt(_localctx, 2);
				{
				setState(323);
				match(T__54);
				}
				break;
			case T__55:
				enterOuterAlt(_localctx, 3);
				{
				setState(324);
				match(T__55);
				}
				break;
			case T__56:
				enterOuterAlt(_localctx, 4);
				{
				setState(325);
				match(T__56);
				}
				break;
			case T__57:
				enterOuterAlt(_localctx, 5);
				{
				setState(326);
				match(T__57);
				}
				break;
			case T__58:
				enterOuterAlt(_localctx, 6);
				{
				setState(327);
				match(T__58);
				}
				break;
			case T__59:
				enterOuterAlt(_localctx, 7);
				{
				setState(328);
				match(T__59);
				}
				break;
			case T__60:
				enterOuterAlt(_localctx, 8);
				{
				setState(329);
				match(T__60);
				}
				break;
			case T__61:
				enterOuterAlt(_localctx, 9);
				{
				setState(330);
				match(T__61);
				}
				break;
			case T__62:
				enterOuterAlt(_localctx, 10);
				{
				setState(331);
				match(T__62);
				}
				break;
			case T__63:
				enterOuterAlt(_localctx, 11);
				{
				setState(332);
				match(T__63);
				}
				break;
			case T__64:
				enterOuterAlt(_localctx, 12);
				{
				setState(333);
				match(T__64);
				}
				break;
			case T__65:
				enterOuterAlt(_localctx, 13);
				{
				setState(334);
				match(T__65);
				}
				break;
			case T__66:
				enterOuterAlt(_localctx, 14);
				{
				setState(335);
				match(T__66);
				}
				break;
			case T__67:
				enterOuterAlt(_localctx, 15);
				{
				setState(336);
				match(T__67);
				}
				break;
			case T__68:
				enterOuterAlt(_localctx, 16);
				{
				setState(337);
				match(T__68);
				}
				break;
			case T__69:
				enterOuterAlt(_localctx, 17);
				{
				setState(338);
				match(T__69);
				}
				break;
			case T__70:
				enterOuterAlt(_localctx, 18);
				{
				setState(339);
				match(T__70);
				}
				break;
			case T__71:
			case T__72:
			case T__73:
			case T__74:
			case T__75:
			case T__76:
			case T__77:
			case T__78:
				enterOuterAlt(_localctx, 19);
				{
				setState(340);
				denominacoes();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DenominacoesContext extends ParserRuleContext {
		public DenominacoesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_denominacoes; }
	}

	public final DenominacoesContext denominacoes() throws RecognitionException {
		DenominacoesContext _localctx = new DenominacoesContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_denominacoes);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(343);
			_la = _input.LA(1);
			if ( !(((((_la - 72)) & ~0x3f) == 0 && ((1L << (_la - 72)) & 255L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class VerbosContext extends ParserRuleContext {
		public VerbosContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_verbos; }
	}

	public final VerbosContext verbos() throws RecognitionException {
		VerbosContext _localctx = new VerbosContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_verbos);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(345);
			_la = _input.LA(1);
			if ( !(((((_la - 80)) & ~0x3f) == 0 && ((1L << (_la - 80)) & 8388607L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Caracteres_ignoraveisContext extends ParserRuleContext {
		public TerminalNode CARACTERES_DE_CONTROLE() { return getToken(PortuguesPuroParser.CARACTERES_DE_CONTROLE, 0); }
		public TerminalNode ESPACO_EM_BRANCO() { return getToken(PortuguesPuroParser.ESPACO_EM_BRANCO, 0); }
		public TerminalNode ESPACO_RIGIDO() { return getToken(PortuguesPuroParser.ESPACO_RIGIDO, 0); }
		public Caracteres_ignoraveisContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_caracteres_ignoraveis; }
	}

	public final Caracteres_ignoraveisContext caracteres_ignoraveis() throws RecognitionException {
		Caracteres_ignoraveisContext _localctx = new Caracteres_ignoraveisContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_caracteres_ignoraveis);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(347);
			_la = _input.LA(1);
			if ( !(((((_la - 191)) & ~0x3f) == 0 && ((1L << (_la - 191)) & 32771L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ComentarioContext extends ParserRuleContext {
		public Comentario_de_linhaContext comentario_de_linha() {
			return getRuleContext(Comentario_de_linhaContext.class,0);
		}
		public Comentario_de_blocoContext comentario_de_bloco() {
			return getRuleContext(Comentario_de_blocoContext.class,0);
		}
		public ComentarioContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_comentario; }
	}

	public final ComentarioContext comentario() throws RecognitionException {
		ComentarioContext _localctx = new ComentarioContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_comentario);
		try {
			setState(351);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case BARRA_INVERTIDA:
				enterOuterAlt(_localctx, 1);
				{
				setState(349);
				comentario_de_linha();
				}
				break;
			case ABRE_COLCHETES:
				enterOuterAlt(_localctx, 2);
				{
				setState(350);
				comentario_de_bloco();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Comentario_de_linhaContext extends ParserRuleContext {
		public TerminalNode BARRA_INVERTIDA() { return getToken(PortuguesPuroParser.BARRA_INVERTIDA, 0); }
		public TerminalNode QUEBRA_DE_LINHA() { return getToken(PortuguesPuroParser.QUEBRA_DE_LINHA, 0); }
		public List<TerminalNode> CARACTERES_IMPRIMIVEIS() { return getTokens(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS); }
		public TerminalNode CARACTERES_IMPRIMIVEIS(int i) {
			return getToken(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS, i);
		}
		public Comentario_de_linhaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_comentario_de_linha; }
	}

	public final Comentario_de_linhaContext comentario_de_linha() throws RecognitionException {
		Comentario_de_linhaContext _localctx = new Comentario_de_linhaContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_comentario_de_linha);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(353);
			match(BARRA_INVERTIDA);
			setState(357);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==CARACTERES_IMPRIMIVEIS) {
				{
				{
				setState(354);
				match(CARACTERES_IMPRIMIVEIS);
				}
				}
				setState(359);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(360);
			match(QUEBRA_DE_LINHA);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Comentario_de_blocoContext extends ParserRuleContext {
		public TerminalNode ABRE_COLCHETES() { return getToken(PortuguesPuroParser.ABRE_COLCHETES, 0); }
		public TerminalNode FECHA_COLCHETES() { return getToken(PortuguesPuroParser.FECHA_COLCHETES, 0); }
		public List<TerminalNode> CARACTERES_IMPRIMIVEIS() { return getTokens(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS); }
		public TerminalNode CARACTERES_IMPRIMIVEIS(int i) {
			return getToken(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS, i);
		}
		public Comentario_de_blocoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_comentario_de_bloco; }
	}

	public final Comentario_de_blocoContext comentario_de_bloco() throws RecognitionException {
		Comentario_de_blocoContext _localctx = new Comentario_de_blocoContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_comentario_de_bloco);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(362);
			match(ABRE_COLCHETES);
			setState(366);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==CARACTERES_IMPRIMIVEIS) {
				{
				{
				setState(363);
				match(CARACTERES_IMPRIMIVEIS);
				}
				}
				setState(368);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(369);
			match(FECHA_COLCHETES);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TokenContext extends ParserRuleContext {
		public AglomeradoContext aglomerado() {
			return getRuleContext(AglomeradoContext.class,0);
		}
		public Possessivo_inglêsContext possessivo_inglês() {
			return getRuleContext(Possessivo_inglêsContext.class,0);
		}
		public QualificadorContext qualificador() {
			return getRuleContext(QualificadorContext.class,0);
		}
		public String_literalContext string_literal() {
			return getRuleContext(String_literalContext.class,0);
		}
		public TokenContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_token; }
	}

	public final TokenContext token() throws RecognitionException {
		TokenContext _localctx = new TokenContext(_ctx, getState());
		enterRule(_localctx, 40, RULE_token);
		try {
			setState(375);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__102:
			case T__103:
			case T__104:
			case T__105:
			case T__106:
			case T__107:
			case LETRA:
			case DIGITO:
			case APOSTROFO:
			case CIFRAO:
				enterOuterAlt(_localctx, 1);
				{
				setState(371);
				aglomerado();
				}
				break;
			case CARACTERES_IMPRIMIVEIS:
				enterOuterAlt(_localctx, 2);
				{
				setState(372);
				possessivo_inglês();
				}
				break;
			case ABRE_PARENTESES:
				enterOuterAlt(_localctx, 3);
				{
				setState(373);
				qualificador();
				}
				break;
			case ASPAS_DUPLAS:
				enterOuterAlt(_localctx, 4);
				{
				setState(374);
				string_literal();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class AglomeradoContext extends ParserRuleContext {
		public Iniciador_de_aglomeradoContext iniciador_de_aglomerado() {
			return getRuleContext(Iniciador_de_aglomeradoContext.class,0);
		}
		public Caractere_aglomeravelContext caractere_aglomeravel() {
			return getRuleContext(Caractere_aglomeravelContext.class,0);
		}
		public AglomeradoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_aglomerado; }
	}

	public final AglomeradoContext aglomerado() throws RecognitionException {
		AglomeradoContext _localctx = new AglomeradoContext(_ctx, getState());
		enterRule(_localctx, 42, RULE_aglomerado);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(377);
			iniciador_de_aglomerado();
			{
			setState(378);
			caractere_aglomeravel();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Caractere_aglomeravelContext extends ParserRuleContext {
		public TerminalNode LETRA() { return getToken(PortuguesPuroParser.LETRA, 0); }
		public TerminalNode DIGITO() { return getToken(PortuguesPuroParser.DIGITO, 0); }
		public TerminalNode CIFRAO() { return getToken(PortuguesPuroParser.CIFRAO, 0); }
		public TerminalNode HIFEN() { return getToken(PortuguesPuroParser.HIFEN, 0); }
		public TerminalNode SINAL_DE_ADICAO() { return getToken(PortuguesPuroParser.SINAL_DE_ADICAO, 0); }
		public TerminalNode BARRA_INCLINADA() { return getToken(PortuguesPuroParser.BARRA_INCLINADA, 0); }
		public Caractere_aglomeravelContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_caractere_aglomeravel; }
	}

	public final Caractere_aglomeravelContext caractere_aglomeravel() throws RecognitionException {
		Caractere_aglomeravelContext _localctx = new Caractere_aglomeravelContext(_ctx, getState());
		enterRule(_localctx, 44, RULE_caractere_aglomeravel);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(380);
			_la = _input.LA(1);
			if ( !(((((_la - 103)) & ~0x3f) == 0 && ((1L << (_la - 103)) & 63L) != 0) || ((((_la - 183)) & ~0x3f) == 0 && ((1L << (_la - 183)) & 10435L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Iniciador_de_aglomeradoContext extends ParserRuleContext {
		public TerminalNode LETRA() { return getToken(PortuguesPuroParser.LETRA, 0); }
		public TerminalNode DIGITO() { return getToken(PortuguesPuroParser.DIGITO, 0); }
		public TerminalNode CIFRAO() { return getToken(PortuguesPuroParser.CIFRAO, 0); }
		public TerminalNode APOSTROFO() { return getToken(PortuguesPuroParser.APOSTROFO, 0); }
		public Iniciador_de_aglomeradoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_iniciador_de_aglomerado; }
	}

	public final Iniciador_de_aglomeradoContext iniciador_de_aglomerado() throws RecognitionException {
		Iniciador_de_aglomeradoContext _localctx = new Iniciador_de_aglomeradoContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_iniciador_de_aglomerado);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(382);
			_la = _input.LA(1);
			if ( !(((((_la - 103)) & ~0x3f) == 0 && ((1L << (_la - 103)) & 63L) != 0) || ((((_la - 183)) & ~0x3f) == 0 && ((1L << (_la - 183)) & 147L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Possessivo_novoContext extends ParserRuleContext {
		public ApostrofoContext apostrofo() {
			return getRuleContext(ApostrofoContext.class,0);
		}
		public Caractere_nao_aglomeravelContext caractere_nao_aglomeravel() {
			return getRuleContext(Caractere_nao_aglomeravelContext.class,0);
		}
		public Possessivo_novoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_possessivo_novo; }
	}

	public final Possessivo_novoContext possessivo_novo() throws RecognitionException {
		Possessivo_novoContext _localctx = new Possessivo_novoContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_possessivo_novo);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(384);
			apostrofo();
			setState(385);
			caractere_nao_aglomeravel();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class QualificadorContext extends ParserRuleContext {
		public TerminalNode ABRE_PARENTESES() { return getToken(PortuguesPuroParser.ABRE_PARENTESES, 0); }
		public TerminalNode FECHA_PARENTESES() { return getToken(PortuguesPuroParser.FECHA_PARENTESES, 0); }
		public List<TerminalNode> CARACTERES_IMPRIMIVEIS() { return getTokens(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS); }
		public TerminalNode CARACTERES_IMPRIMIVEIS(int i) {
			return getToken(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS, i);
		}
		public QualificadorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_qualificador; }
	}

	public final QualificadorContext qualificador() throws RecognitionException {
		QualificadorContext _localctx = new QualificadorContext(_ctx, getState());
		enterRule(_localctx, 50, RULE_qualificador);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(387);
			match(ABRE_PARENTESES);
			setState(391);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==CARACTERES_IMPRIMIVEIS) {
				{
				{
				setState(388);
				match(CARACTERES_IMPRIMIVEIS);
				}
				}
				setState(393);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(394);
			match(FECHA_PARENTESES);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Caractere_nao_aglomeravelContext extends ParserRuleContext {
		public TerminalNode LETRA() { return getToken(PortuguesPuroParser.LETRA, 0); }
		public TerminalNode DIGITO() { return getToken(PortuguesPuroParser.DIGITO, 0); }
		public TerminalNode CIFRAO() { return getToken(PortuguesPuroParser.CIFRAO, 0); }
		public TerminalNode HIFEN() { return getToken(PortuguesPuroParser.HIFEN, 0); }
		public TerminalNode SINAL_DE_ADICAO() { return getToken(PortuguesPuroParser.SINAL_DE_ADICAO, 0); }
		public TerminalNode BARRA_INCLINADA() { return getToken(PortuguesPuroParser.BARRA_INCLINADA, 0); }
		public Caractere_nao_aglomeravelContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_caractere_nao_aglomeravel; }
	}

	public final Caractere_nao_aglomeravelContext caractere_nao_aglomeravel() throws RecognitionException {
		Caractere_nao_aglomeravelContext _localctx = new Caractere_nao_aglomeravelContext(_ctx, getState());
		enterRule(_localctx, 52, RULE_caractere_nao_aglomeravel);
		int _la;
		try {
			setState(408);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,12,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(396);
				_la = _input.LA(1);
				if ( _la <= 0 || (_la==LETRA) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(397);
				_la = _input.LA(1);
				if ( _la <= 0 || (_la==DIGITO) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(398);
				_la = _input.LA(1);
				if ( _la <= 0 || (_la==T__102) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(399);
				_la = _input.LA(1);
				if ( _la <= 0 || (_la==T__103) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(400);
				_la = _input.LA(1);
				if ( _la <= 0 || (_la==T__104) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(401);
				_la = _input.LA(1);
				if ( _la <= 0 || (_la==T__105) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(402);
				_la = _input.LA(1);
				if ( _la <= 0 || (_la==T__106) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(403);
				_la = _input.LA(1);
				if ( _la <= 0 || (_la==CIFRAO) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(404);
				_la = _input.LA(1);
				if ( _la <= 0 || (_la==T__107) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(405);
				_la = _input.LA(1);
				if ( _la <= 0 || (_la==HIFEN) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(406);
				_la = _input.LA(1);
				if ( _la <= 0 || (_la==SINAL_DE_ADICAO) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
				break;
			case 12:
				enterOuterAlt(_localctx, 12);
				{
				setState(407);
				_la = _input.LA(1);
				if ( _la <= 0 || (_la==BARRA_INCLINADA) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Sinal_de_pontuacaoContext extends ParserRuleContext {
		public TerminalNode PONTO() { return getToken(PortuguesPuroParser.PONTO, 0); }
		public TerminalNode VIRGULA() { return getToken(PortuguesPuroParser.VIRGULA, 0); }
		public TerminalNode PONTO_E_VIRGULA() { return getToken(PortuguesPuroParser.PONTO_E_VIRGULA, 0); }
		public TerminalNode DOIS_PONTOS() { return getToken(PortuguesPuroParser.DOIS_PONTOS, 0); }
		public Sinal_de_pontuacaoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_sinal_de_pontuacao; }
	}

	public final Sinal_de_pontuacaoContext sinal_de_pontuacao() throws RecognitionException {
		Sinal_de_pontuacaoContext _localctx = new Sinal_de_pontuacaoContext(_ctx, getState());
		enterRule(_localctx, 54, RULE_sinal_de_pontuacao);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(410);
			_la = _input.LA(1);
			if ( !(_la==T__108 || _la==T__109 || ((((_la - 197)) & ~0x3f) == 0 && ((1L << (_la - 197)) & 15L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Simbolos_especiaisContext extends ParserRuleContext {
		public TerminalNode SINAL_DE_ADICAO() { return getToken(PortuguesPuroParser.SINAL_DE_ADICAO, 0); }
		public TerminalNode HIFEN() { return getToken(PortuguesPuroParser.HIFEN, 0); }
		public TerminalNode BARRA_INCLINADA() { return getToken(PortuguesPuroParser.BARRA_INCLINADA, 0); }
		public Simbolos_especiaisContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_simbolos_especiais; }
	}

	public final Simbolos_especiaisContext simbolos_especiais() throws RecognitionException {
		Simbolos_especiaisContext _localctx = new Simbolos_especiaisContext(_ctx, getState());
		enterRule(_localctx, 56, RULE_simbolos_especiais);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(412);
			_la = _input.LA(1);
			if ( !(((((_la - 111)) & ~0x3f) == 0 && ((1L << (_la - 111)) & 127L) != 0) || ((((_la - 189)) & ~0x3f) == 0 && ((1L << (_la - 189)) & 161L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class NoiseContext extends ParserRuleContext {
		public Caracteres_ignoraveisContext caracteres_ignoraveis() {
			return getRuleContext(Caracteres_ignoraveisContext.class,0);
		}
		public ComentarioContext comentario() {
			return getRuleContext(ComentarioContext.class,0);
		}
		public QualificadorContext qualificador() {
			return getRuleContext(QualificadorContext.class,0);
		}
		public NoiseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_noise; }
	}

	public final NoiseContext noise() throws RecognitionException {
		NoiseContext _localctx = new NoiseContext(_ctx, getState());
		enterRule(_localctx, 58, RULE_noise);
		try {
			setState(417);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ESPACO_EM_BRANCO:
			case ESPACO_RIGIDO:
			case CARACTERES_DE_CONTROLE:
				enterOuterAlt(_localctx, 1);
				{
				setState(414);
				caracteres_ignoraveis();
				}
				break;
			case BARRA_INVERTIDA:
			case ABRE_COLCHETES:
				enterOuterAlt(_localctx, 2);
				{
				setState(415);
				comentario();
				}
				break;
			case ABRE_PARENTESES:
				enterOuterAlt(_localctx, 3);
				{
				setState(416);
				qualificador();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Numero_inteiroContext extends ParserRuleContext {
		public List<TerminalNode> DIGITO() { return getTokens(PortuguesPuroParser.DIGITO); }
		public TerminalNode DIGITO(int i) {
			return getToken(PortuguesPuroParser.DIGITO, i);
		}
		public Numero_inteiroContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_numero_inteiro; }
	}

	public final Numero_inteiroContext numero_inteiro() throws RecognitionException {
		Numero_inteiroContext _localctx = new Numero_inteiroContext(_ctx, getState());
		enterRule(_localctx, 60, RULE_numero_inteiro);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(420); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(419);
				match(DIGITO);
				}
				}
				setState(422); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==DIGITO );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Numero_decimalContext extends ParserRuleContext {
		public Numero_inteiroContext numero_inteiro() {
			return getRuleContext(Numero_inteiroContext.class,0);
		}
		public TerminalNode HIFEN() { return getToken(PortuguesPuroParser.HIFEN, 0); }
		public Numero_decimalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_numero_decimal; }
	}

	public final Numero_decimalContext numero_decimal() throws RecognitionException {
		Numero_decimalContext _localctx = new Numero_decimalContext(_ctx, getState());
		enterRule(_localctx, 62, RULE_numero_decimal);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(425);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==HIFEN) {
				{
				setState(424);
				match(HIFEN);
				}
			}

			setState(427);
			numero_inteiro();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Numero_fracionarioContext extends ParserRuleContext {
		public Numero_decimalContext numero_decimal() {
			return getRuleContext(Numero_decimalContext.class,0);
		}
		public TerminalNode BARRA_INCLINADA() { return getToken(PortuguesPuroParser.BARRA_INCLINADA, 0); }
		public Numero_inteiroContext numero_inteiro() {
			return getRuleContext(Numero_inteiroContext.class,0);
		}
		public Numero_fracionarioContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_numero_fracionario; }
	}

	public final Numero_fracionarioContext numero_fracionario() throws RecognitionException {
		Numero_fracionarioContext _localctx = new Numero_fracionarioContext(_ctx, getState());
		enterRule(_localctx, 64, RULE_numero_fracionario);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(429);
			numero_decimal();
			setState(430);
			match(BARRA_INCLINADA);
			setState(431);
			numero_inteiro();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Numero_mistoContext extends ParserRuleContext {
		public Numero_decimalContext numero_decimal() {
			return getRuleContext(Numero_decimalContext.class,0);
		}
		public TerminalNode SINAL_DE_ADICAO() { return getToken(PortuguesPuroParser.SINAL_DE_ADICAO, 0); }
		public Numero_fracionarioContext numero_fracionario() {
			return getRuleContext(Numero_fracionarioContext.class,0);
		}
		public Numero_mistoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_numero_misto; }
	}

	public final Numero_mistoContext numero_misto() throws RecognitionException {
		Numero_mistoContext _localctx = new Numero_mistoContext(_ctx, getState());
		enterRule(_localctx, 66, RULE_numero_misto);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(433);
			numero_decimal();
			setState(434);
			match(SINAL_DE_ADICAO);
			setState(435);
			numero_fracionario();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Numero_hexadecimalContext extends ParserRuleContext {
		public TerminalNode CIFRAO() { return getToken(PortuguesPuroParser.CIFRAO, 0); }
		public Numero_inteiroContext numero_inteiro() {
			return getRuleContext(Numero_inteiroContext.class,0);
		}
		public Numero_hexadecimalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_numero_hexadecimal; }
	}

	public final Numero_hexadecimalContext numero_hexadecimal() throws RecognitionException {
		Numero_hexadecimalContext _localctx = new Numero_hexadecimalContext(_ctx, getState());
		enterRule(_localctx, 68, RULE_numero_hexadecimal);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(437);
			match(CIFRAO);
			setState(438);
			numero_inteiro();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class String_literalContext extends ParserRuleContext {
		public List<TerminalNode> ASPAS_DUPLAS() { return getTokens(PortuguesPuroParser.ASPAS_DUPLAS); }
		public TerminalNode ASPAS_DUPLAS(int i) {
			return getToken(PortuguesPuroParser.ASPAS_DUPLAS, i);
		}
		public List<TerminalNode> CARACTERES_IMPRIMIVEIS() { return getTokens(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS); }
		public TerminalNode CARACTERES_IMPRIMIVEIS(int i) {
			return getToken(PortuguesPuroParser.CARACTERES_IMPRIMIVEIS, i);
		}
		public String_literalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_string_literal; }
	}

	public final String_literalContext string_literal() throws RecognitionException {
		String_literalContext _localctx = new String_literalContext(_ctx, getState());
		enterRule(_localctx, 70, RULE_string_literal);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(440);
			match(ASPAS_DUPLAS);
			setState(444);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==CARACTERES_IMPRIMIVEIS) {
				{
				{
				setState(441);
				match(CARACTERES_IMPRIMIVEIS);
				}
				}
				setState(446);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(447);
			match(ASPAS_DUPLAS);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ProgramaContext extends ParserRuleContext {
		public TipoContext tipo() {
			return getRuleContext(TipoContext.class,0);
		}
		public Variavel_globalContext variavel_global() {
			return getRuleContext(Variavel_globalContext.class,0);
		}
		public RotinaContext rotina() {
			return getRuleContext(RotinaContext.class,0);
		}
		public ProgramaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_programa; }
	}

	public final ProgramaContext programa() throws RecognitionException {
		ProgramaContext _localctx = new ProgramaContext(_ctx, getState());
		enterRule(_localctx, 72, RULE_programa);
		try {
			setState(452);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__5:
			case T__6:
			case T__7:
			case T__8:
			case T__13:
			case T__14:
			case T__15:
			case T__16:
				enterOuterAlt(_localctx, 1);
				{
				setState(449);
				tipo();
				}
				break;
			case EOF:
			case T__1:
			case T__2:
			case T__3:
			case T__4:
			case T__9:
			case T__10:
			case T__11:
			case T__12:
				enterOuterAlt(_localctx, 2);
				{
				setState(450);
				variavel_global();
				}
				break;
			case T__159:
			case T__161:
			case T__163:
				enterOuterAlt(_localctx, 3);
				{
				setState(451);
				rotina();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Tipos_primitivosContext extends ParserRuleContext {
		public Tipos_primitivosContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tipos_primitivos; }
	}

	public final Tipos_primitivosContext tipos_primitivos() throws RecognitionException {
		Tipos_primitivosContext _localctx = new Tipos_primitivosContext(_ctx, getState());
		enterRule(_localctx, 74, RULE_tipos_primitivos);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(454);
			_la = _input.LA(1);
			if ( !(((((_la - 118)) & ~0x3f) == 0 && ((1L << (_la - 118)) & 131071L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TipoContext extends ParserRuleContext {
		public List<Artigo_indefinidoContext> artigo_indefinido() {
			return getRuleContexts(Artigo_indefinidoContext.class);
		}
		public Artigo_indefinidoContext artigo_indefinido(int i) {
			return getRuleContext(Artigo_indefinidoContext.class,i);
		}
		public NomeContext nome() {
			return getRuleContext(NomeContext.class,0);
		}
		public ÉContext é() {
			return getRuleContext(ÉContext.class,0);
		}
		public Nome_do_tipoContext nome_do_tipo() {
			return getRuleContext(Nome_do_tipoContext.class,0);
		}
		public TerminalNode PONTO() { return getToken(PortuguesPuroParser.PONTO, 0); }
		public Informacao_opcionalContext informacao_opcional() {
			return getRuleContext(Informacao_opcionalContext.class,0);
		}
		public EstruturaContext estrutura() {
			return getRuleContext(EstruturaContext.class,0);
		}
		public ComContext com() {
			return getRuleContext(ComContext.class,0);
		}
		public CamposContext campos() {
			return getRuleContext(CamposContext.class,0);
		}
		public Numero_inteiroContext numero_inteiro() {
			return getRuleContext(Numero_inteiroContext.class,0);
		}
		public TipoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tipo; }
	}

	public final TipoContext tipo() throws RecognitionException {
		TipoContext _localctx = new TipoContext(_ctx, getState());
		enterRule(_localctx, 76, RULE_tipo);
		int _la;
		try {
			setState(482);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,19,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(456);
				artigo_indefinido();
				setState(457);
				nome();
				setState(458);
				é();
				setState(459);
				artigo_indefinido();
				setState(460);
				nome_do_tipo();
				setState(462);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__141 || _la==T__161) {
					{
					setState(461);
					informacao_opcional();
					}
				}

				setState(464);
				match(PONTO);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(466);
				artigo_indefinido();
				setState(467);
				nome();
				setState(468);
				é();
				setState(469);
				artigo_indefinido();
				setState(470);
				estrutura();
				setState(471);
				com();
				setState(472);
				campos();
				setState(473);
				match(PONTO);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(475);
				artigo_indefinido();
				setState(476);
				nome();
				setState(477);
				é();
				setState(478);
				numero_inteiro();
				setState(479);
				nome_do_tipo();
				setState(480);
				match(PONTO);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class NomeContext extends ParserRuleContext {
		public PalavraContext palavra() {
			return getRuleContext(PalavraContext.class,0);
		}
		public NomeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_nome; }
	}

	public final NomeContext nome() throws RecognitionException {
		NomeContext _localctx = new NomeContext(_ctx, getState());
		enterRule(_localctx, 78, RULE_nome);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(484);
			palavra();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Nome_do_tipoContext extends ParserRuleContext {
		public NomeContext nome() {
			return getRuleContext(NomeContext.class,0);
		}
		public Nome_do_tipoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_nome_do_tipo; }
	}

	public final Nome_do_tipoContext nome_do_tipo() throws RecognitionException {
		Nome_do_tipoContext _localctx = new Nome_do_tipoContext(_ctx, getState());
		enterRule(_localctx, 80, RULE_nome_do_tipo);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(486);
			nome();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Informacao_opcionalContext extends ParserRuleContext {
		public ParaContext para() {
			return getRuleContext(ParaContext.class,0);
		}
		public Artigo_indefinidoContext artigo_indefinido() {
			return getRuleContext(Artigo_indefinidoContext.class,0);
		}
		public Nome_do_tipoContext nome_do_tipo() {
			return getRuleContext(Nome_do_tipoContext.class,0);
		}
		public ComContext com() {
			return getRuleContext(ComContext.class,0);
		}
		public CamposContext campos() {
			return getRuleContext(CamposContext.class,0);
		}
		public Informacao_opcionalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_informacao_opcional; }
	}

	public final Informacao_opcionalContext informacao_opcional() throws RecognitionException {
		Informacao_opcionalContext _localctx = new Informacao_opcionalContext(_ctx, getState());
		enterRule(_localctx, 82, RULE_informacao_opcional);
		try {
			setState(495);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__161:
				enterOuterAlt(_localctx, 1);
				{
				setState(488);
				para();
				setState(489);
				artigo_indefinido();
				setState(490);
				nome_do_tipo();
				}
				break;
			case T__141:
				enterOuterAlt(_localctx, 2);
				{
				setState(492);
				com();
				setState(493);
				campos();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CamposContext extends ParserRuleContext {
		public List<CampoContext> campo() {
			return getRuleContexts(CampoContext.class);
		}
		public CampoContext campo(int i) {
			return getRuleContext(CampoContext.class,i);
		}
		public List<PausasContext> pausas() {
			return getRuleContexts(PausasContext.class);
		}
		public PausasContext pausas(int i) {
			return getRuleContext(PausasContext.class,i);
		}
		public CamposContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_campos; }
	}

	public final CamposContext campos() throws RecognitionException {
		CamposContext _localctx = new CamposContext(_ctx, getState());
		enterRule(_localctx, 84, RULE_campos);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(497);
			campo();
			setState(503);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 138)) & ~0x3f) == 0 && ((1L << (_la - 138)) & 3458764513820540931L) != 0)) {
				{
				{
				setState(498);
				pausas();
				setState(499);
				campo();
				}
				}
				setState(505);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class BytesContext extends ParserRuleContext {
		public BytesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_bytes; }
	}

	public final BytesContext bytes() throws RecognitionException {
		BytesContext _localctx = new BytesContext(_ctx, getState());
		enterRule(_localctx, 86, RULE_bytes);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(506);
			match(T__134);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ReferênciaContext extends ParserRuleContext {
		public ReferênciaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_referência; }
	}

	public final ReferênciaContext referência() throws RecognitionException {
		ReferênciaContext _localctx = new ReferênciaContext(_ctx, getState());
		enterRule(_localctx, 88, RULE_referência);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(508);
			match(T__135);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CampoContext extends ParserRuleContext {
		public Artigo_indefinidoContext artigo_indefinido() {
			return getRuleContext(Artigo_indefinidoContext.class,0);
		}
		public Numero_inteiroContext numero_inteiro() {
			return getRuleContext(Numero_inteiroContext.class,0);
		}
		public BytesContext bytes() {
			return getRuleContext(BytesContext.class,0);
		}
		public DenominacoesContext denominacoes() {
			return getRuleContext(DenominacoesContext.class,0);
		}
		public NomeContext nome() {
			return getRuleContext(NomeContext.class,0);
		}
		public Artigo_definidoContext artigo_definido() {
			return getRuleContext(Artigo_definidoContext.class,0);
		}
		public ReferênciaContext referência() {
			return getRuleContext(ReferênciaContext.class,0);
		}
		public CampoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_campo; }
	}

	public final CampoContext campo() throws RecognitionException {
		CampoContext _localctx = new CampoContext(_ctx, getState());
		enterRule(_localctx, 90, RULE_campo);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(514);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__5:
			case T__6:
			case T__7:
			case T__8:
			case T__13:
			case T__14:
			case T__15:
			case T__16:
				{
				setState(510);
				artigo_indefinido();
				}
				break;
			case DIGITO:
				{
				setState(511);
				numero_inteiro();
				setState(512);
				bytes();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(524);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__71:
			case T__72:
			case T__73:
			case T__74:
			case T__75:
			case T__76:
			case T__77:
			case T__78:
				{
				setState(516);
				denominacoes();
				setState(517);
				nome();
				}
				break;
			case T__136:
				{
				setState(519);
				match(T__136);
				setState(520);
				artigo_definido();
				setState(521);
				nome();
				}
				break;
			case T__135:
				{
				setState(523);
				referência();
				}
				break;
			case T__137:
			case T__138:
			case PONTO:
			case VIRGULA:
			case PONTO_E_VIRGULA:
				break;
			default:
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class PausaContext extends ParserRuleContext {
		public TerminalNode VIRGULA() { return getToken(PortuguesPuroParser.VIRGULA, 0); }
		public TerminalNode PONTO_E_VIRGULA() { return getToken(PortuguesPuroParser.PONTO_E_VIRGULA, 0); }
		public PausaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_pausa; }
	}

	public final PausaContext pausa() throws RecognitionException {
		PausaContext _localctx = new PausaContext(_ctx, getState());
		enterRule(_localctx, 92, RULE_pausa);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(526);
			_la = _input.LA(1);
			if ( !(((((_la - 138)) & ~0x3f) == 0 && ((1L << (_la - 138)) & 3458764513820540931L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class PausasContext extends ParserRuleContext {
		public List<PausaContext> pausa() {
			return getRuleContexts(PausaContext.class);
		}
		public PausaContext pausa(int i) {
			return getRuleContext(PausaContext.class,i);
		}
		public PausasContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_pausas; }
	}

	public final PausasContext pausas() throws RecognitionException {
		PausasContext _localctx = new PausasContext(_ctx, getState());
		enterRule(_localctx, 94, RULE_pausas);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(529); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(528);
				pausa();
				}
				}
				setState(531); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( ((((_la - 138)) & ~0x3f) == 0 && ((1L << (_la - 138)) & 3458764513820540931L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ConjuncoesContext extends ParserRuleContext {
		public ConjuncoesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_conjuncoes; }
	}

	public final ConjuncoesContext conjuncoes() throws RecognitionException {
		ConjuncoesContext _localctx = new ConjuncoesContext(_ctx, getState());
		enterRule(_localctx, 96, RULE_conjuncoes);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(533);
			_la = _input.LA(1);
			if ( !(((((_la - 138)) & ~0x3f) == 0 && ((1L << (_la - 138)) & 7L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class PreposicoesContext extends ParserRuleContext {
		public PreposicoesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_preposicoes; }
	}

	public final PreposicoesContext preposicoes() throws RecognitionException {
		PreposicoesContext _localctx = new PreposicoesContext(_ctx, getState());
		enterRule(_localctx, 98, RULE_preposicoes);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(535);
			_la = _input.LA(1);
			if ( !(_la==T__25 || _la==T__26 || ((((_la - 137)) & ~0x3f) == 0 && ((1L << (_la - 137)) & 4194289L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ÉContext extends ParserRuleContext {
		public ÉContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_é; }
	}

	public final ÉContext é() throws RecognitionException {
		ÉContext _localctx = new ÉContext(_ctx, getState());
		enterRule(_localctx, 100, RULE_é);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(537);
			_la = _input.LA(1);
			if ( !(_la==T__79 || _la==T__84) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class EstruturaContext extends ParserRuleContext {
		public EstruturaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_estrutura; }
	}

	public final EstruturaContext estrutura() throws RecognitionException {
		EstruturaContext _localctx = new EstruturaContext(_ctx, getState());
		enterRule(_localctx, 102, RULE_estrutura);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(539);
			match(T__123);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Igual_aContext extends ParserRuleContext {
		public Igual_aContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_igual_a; }
	}

	public final Igual_aContext igual_a() throws RecognitionException {
		Igual_aContext _localctx = new Igual_aContext(_ctx, getState());
		enterRule(_localctx, 104, RULE_igual_a);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(541);
			match(T__45);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Variavel_globalContext extends ParserRuleContext {
		public List<Artigo_definidoContext> artigo_definido() {
			return getRuleContexts(Artigo_definidoContext.class);
		}
		public Artigo_definidoContext artigo_definido(int i) {
			return getRuleContext(Artigo_definidoContext.class,i);
		}
		public List<NomeContext> nome() {
			return getRuleContexts(NomeContext.class);
		}
		public NomeContext nome(int i) {
			return getRuleContext(NomeContext.class,i);
		}
		public List<ÉContext> é() {
			return getRuleContexts(ÉContext.class);
		}
		public ÉContext é(int i) {
			return getRuleContext(ÉContext.class,i);
		}
		public Artigo_indefinidoContext artigo_indefinido() {
			return getRuleContext(Artigo_indefinidoContext.class,0);
		}
		public Nome_do_tipoContext nome_do_tipo() {
			return getRuleContext(Nome_do_tipoContext.class,0);
		}
		public List<TerminalNode> PONTO() { return getTokens(PortuguesPuroParser.PONTO); }
		public TerminalNode PONTO(int i) {
			return getToken(PortuguesPuroParser.PONTO, i);
		}
		public Informacao_opcionalContext informacao_opcional() {
			return getRuleContext(Informacao_opcionalContext.class,0);
		}
		public EstruturaContext estrutura() {
			return getRuleContext(EstruturaContext.class,0);
		}
		public ComContext com() {
			return getRuleContext(ComContext.class,0);
		}
		public CamposContext campos() {
			return getRuleContext(CamposContext.class,0);
		}
		public Igual_aContext igual_a() {
			return getRuleContext(Igual_aContext.class,0);
		}
		public List<Termo_constanteContext> termo_constante() {
			return getRuleContexts(Termo_constanteContext.class);
		}
		public Termo_constanteContext termo_constante(int i) {
			return getRuleContext(Termo_constanteContext.class,i);
		}
		public Variavel_globalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_variavel_global; }
	}

	public final Variavel_globalContext variavel_global() throws RecognitionException {
		Variavel_globalContext _localctx = new Variavel_globalContext(_ctx, getState());
		enterRule(_localctx, 106, RULE_variavel_global);
		int _la;
		try {
			setState(577);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,26,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(543);
				artigo_definido();
				setState(544);
				nome();
				setState(545);
				é();
				setState(546);
				artigo_indefinido();
				setState(547);
				nome_do_tipo();
				setState(549);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__141 || _la==T__161) {
					{
					setState(548);
					informacao_opcional();
					}
				}

				setState(551);
				match(PONTO);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(553);
				artigo_definido();
				setState(554);
				nome();
				setState(555);
				é();
				setState(556);
				artigo_indefinido();
				setState(557);
				estrutura();
				setState(558);
				com();
				setState(559);
				campos();
				setState(560);
				match(PONTO);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(562);
				artigo_definido();
				setState(563);
				nome();
				setState(564);
				é();
				setState(565);
				artigo_indefinido();
				setState(566);
				nome_do_tipo();
				setState(567);
				igual_a();
				setState(568);
				termo_constante();
				setState(569);
				match(PONTO);
				setState(570);
				artigo_definido();
				setState(571);
				nome();
				setState(572);
				é();
				setState(573);
				termo_constante();
				setState(574);
				match(PONTO);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class RotinaContext extends ParserRuleContext {
		public ProcedimentoContext procedimento() {
			return getRuleContext(ProcedimentoContext.class,0);
		}
		public DecisorContext decisor() {
			return getRuleContext(DecisorContext.class,0);
		}
		public FuncaoContext funcao() {
			return getRuleContext(FuncaoContext.class,0);
		}
		public RetroinvocacaoContext retroinvocacao() {
			return getRuleContext(RetroinvocacaoContext.class,0);
		}
		public RotinaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_rotina; }
	}

	public final RotinaContext rotina() throws RecognitionException {
		RotinaContext _localctx = new RotinaContext(_ctx, getState());
		enterRule(_localctx, 108, RULE_rotina);
		try {
			setState(583);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,27,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(579);
				procedimento();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(580);
				decisor();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(581);
				funcao();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(582);
				retroinvocacao();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ProcedimentoContext extends ParserRuleContext {
		public InstrucoesContext instrucoes() {
			return getRuleContext(InstrucoesContext.class,0);
		}
		public ParaContext para() {
			return getRuleContext(ParaContext.class,0);
		}
		public Que_seContext que_se() {
			return getRuleContext(Que_seContext.class,0);
		}
		public Nome_da_rotinaContext nome_da_rotina() {
			return getRuleContext(Nome_da_rotinaContext.class,0);
		}
		public TerminalNode PONTO_E_VIRGULA() { return getToken(PortuguesPuroParser.PONTO_E_VIRGULA, 0); }
		public TerminalNode DOIS_PONTOS() { return getToken(PortuguesPuroParser.DOIS_PONTOS, 0); }
		public Rotina2Context rotina2() {
			return getRuleContext(Rotina2Context.class,0);
		}
		public ProcedimentoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procedimento; }
	}

	public final ProcedimentoContext procedimento() throws RecognitionException {
		ProcedimentoContext _localctx = new ProcedimentoContext(_ctx, getState());
		enterRule(_localctx, 110, RULE_procedimento);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(601);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,30,_ctx) ) {
			case 1:
				{
				setState(586);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__163) {
					{
					setState(585);
					rotina2();
					}
				}

				setState(588);
				para();
				setState(589);
				que_se();
				setState(590);
				nome_da_rotina();
				setState(591);
				match(PONTO_E_VIRGULA);
				}
				break;
			case 2:
				{
				setState(594);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__163) {
					{
					setState(593);
					rotina2();
					}
				}

				setState(596);
				para();
				setState(597);
				que_se();
				setState(598);
				nome_da_rotina();
				setState(599);
				match(DOIS_PONTOS);
				}
				break;
			}
			setState(603);
			instrucoes();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Determine_seContext extends ParserRuleContext {
		public Determine_seContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_determine_se; }
	}

	public final Determine_seContext determine_se() throws RecognitionException {
		Determine_seContext _localctx = new Determine_seContext(_ctx, getState());
		enterRule(_localctx, 112, RULE_determine_se);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(605);
			match(T__158);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DecisorContext extends ParserRuleContext {
		public ParaContext para() {
			return getRuleContext(ParaContext.class,0);
		}
		public Que_seContext que_se() {
			return getRuleContext(Que_seContext.class,0);
		}
		public Determine_seContext determine_se() {
			return getRuleContext(Determine_seContext.class,0);
		}
		public Nome_da_rotinaContext nome_da_rotina() {
			return getRuleContext(Nome_da_rotinaContext.class,0);
		}
		public TerminalNode PONTO_E_VIRGULA() { return getToken(PortuguesPuroParser.PONTO_E_VIRGULA, 0); }
		public Rotina2Context rotina2() {
			return getRuleContext(Rotina2Context.class,0);
		}
		public TerminalNode DOIS_PONTOS() { return getToken(PortuguesPuroParser.DOIS_PONTOS, 0); }
		public DecisorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_decisor; }
	}

	public final DecisorContext decisor() throws RecognitionException {
		DecisorContext _localctx = new DecisorContext(_ctx, getState());
		enterRule(_localctx, 114, RULE_decisor);
		int _la;
		try {
			setState(625);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,33,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(608);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__163) {
					{
					setState(607);
					rotina2();
					}
				}

				setState(610);
				para();
				setState(611);
				que_se();
				setState(612);
				determine_se();
				setState(613);
				nome_da_rotina();
				setState(614);
				match(PONTO_E_VIRGULA);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(617);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__163) {
					{
					setState(616);
					rotina2();
					}
				}

				setState(619);
				para();
				setState(620);
				que_se();
				setState(621);
				determine_se();
				setState(622);
				nome_da_rotina();
				setState(623);
				match(DOIS_PONTOS);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Função2Context extends ParserRuleContext {
		public Função2Context(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_função2; }
	}

	public final Função2Context função2() throws RecognitionException {
		Função2Context _localctx = new Função2Context(_ctx, getState());
		enterRule(_localctx, 116, RULE_função2);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(627);
			match(T__159);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class AtribuaContext extends ParserRuleContext {
		public AtribuaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_atribua; }
	}

	public final AtribuaContext atribua() throws RecognitionException {
		AtribuaContext _localctx = new AtribuaContext(_ctx, getState());
		enterRule(_localctx, 118, RULE_atribua);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(629);
			match(T__160);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class FuncaoContext extends ParserRuleContext {
		public InstrucoesContext instrucoes() {
			return getRuleContext(InstrucoesContext.class,0);
		}
		public List<ParaContext> para() {
			return getRuleContexts(ParaContext.class);
		}
		public ParaContext para(int i) {
			return getRuleContext(ParaContext.class,i);
		}
		public Que_seContext que_se() {
			return getRuleContext(Que_seContext.class,0);
		}
		public AtribuaContext atribua() {
			return getRuleContext(AtribuaContext.class,0);
		}
		public Artigo_definidoContext artigo_definido() {
			return getRuleContext(Artigo_definidoContext.class,0);
		}
		public List<Nome_do_tipoContext> nome_do_tipo() {
			return getRuleContexts(Nome_do_tipoContext.class);
		}
		public Nome_do_tipoContext nome_do_tipo(int i) {
			return getRuleContext(Nome_do_tipoContext.class,i);
		}
		public Atribuidores_de_posseContext atribuidores_de_posse() {
			return getRuleContext(Atribuidores_de_posseContext.class,0);
		}
		public NomeContext nome() {
			return getRuleContext(NomeContext.class,0);
		}
		public Artigo_indefinidoContext artigo_indefinido() {
			return getRuleContext(Artigo_indefinidoContext.class,0);
		}
		public TerminalNode PONTO_E_VIRGULA() { return getToken(PortuguesPuroParser.PONTO_E_VIRGULA, 0); }
		public TerminalNode DOIS_PONTOS() { return getToken(PortuguesPuroParser.DOIS_PONTOS, 0); }
		public Função2Context função2() {
			return getRuleContext(Função2Context.class,0);
		}
		public FuncaoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_funcao; }
	}

	public final FuncaoContext funcao() throws RecognitionException {
		FuncaoContext _localctx = new FuncaoContext(_ctx, getState());
		enterRule(_localctx, 120, RULE_funcao);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(661);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,36,_ctx) ) {
			case 1:
				{
				setState(632);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__159) {
					{
					setState(631);
					função2();
					}
				}

				setState(634);
				para();
				setState(635);
				que_se();
				setState(636);
				atribua();
				setState(637);
				artigo_definido();
				setState(638);
				nome_do_tipo();
				setState(639);
				atribuidores_de_posse();
				setState(640);
				nome();
				setState(641);
				para();
				setState(642);
				artigo_indefinido();
				setState(643);
				nome_do_tipo();
				setState(644);
				match(PONTO_E_VIRGULA);
				}
				break;
			case 2:
				{
				setState(647);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__159) {
					{
					setState(646);
					função2();
					}
				}

				setState(649);
				para();
				setState(650);
				que_se();
				setState(651);
				atribua();
				setState(652);
				artigo_definido();
				setState(653);
				nome_do_tipo();
				setState(654);
				atribuidores_de_posse();
				setState(655);
				nome();
				setState(656);
				para();
				setState(657);
				artigo_indefinido();
				setState(658);
				nome_do_tipo();
				setState(659);
				match(DOIS_PONTOS);
				}
				break;
			}
			setState(663);
			instrucoes();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ParaContext extends ParserRuleContext {
		public ParaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_para; }
	}

	public final ParaContext para() throws RecognitionException {
		ParaContext _localctx = new ParaContext(_ctx, getState());
		enterRule(_localctx, 122, RULE_para);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(665);
			match(T__161);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Que_seContext extends ParserRuleContext {
		public Que_seContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_que_se; }
	}

	public final Que_seContext que_se() throws RecognitionException {
		Que_seContext _localctx = new Que_seContext(_ctx, getState());
		enterRule(_localctx, 124, RULE_que_se);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(667);
			match(T__162);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Rotina2Context extends ParserRuleContext {
		public Rotina2Context(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_rotina2; }
	}

	public final Rotina2Context rotina2() throws RecognitionException {
		Rotina2Context _localctx = new Rotina2Context(_ctx, getState());
		enterRule(_localctx, 126, RULE_rotina2);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(669);
			match(T__163);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CompativelmenteContext extends ParserRuleContext {
		public CompativelmenteContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_compativelmente; }
	}

	public final CompativelmenteContext compativelmente() throws RecognitionException {
		CompativelmenteContext _localctx = new CompativelmenteContext(_ctx, getState());
		enterRule(_localctx, 128, RULE_compativelmente);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(671);
			match(T__164);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class RetroinvocacaoContext extends ParserRuleContext {
		public InstrucoesContext instrucoes() {
			return getRuleContext(InstrucoesContext.class,0);
		}
		public ParaContext para() {
			return getRuleContext(ParaContext.class,0);
		}
		public Que_seContext que_se() {
			return getRuleContext(Que_seContext.class,0);
		}
		public CompativelmenteContext compativelmente() {
			return getRuleContext(CompativelmenteContext.class,0);
		}
		public Nome_da_rotinaContext nome_da_rotina() {
			return getRuleContext(Nome_da_rotinaContext.class,0);
		}
		public TerminalNode PONTO_E_VIRGULA() { return getToken(PortuguesPuroParser.PONTO_E_VIRGULA, 0); }
		public TerminalNode DOIS_PONTOS() { return getToken(PortuguesPuroParser.DOIS_PONTOS, 0); }
		public Rotina2Context rotina2() {
			return getRuleContext(Rotina2Context.class,0);
		}
		public RetroinvocacaoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_retroinvocacao; }
	}

	public final RetroinvocacaoContext retroinvocacao() throws RecognitionException {
		RetroinvocacaoContext _localctx = new RetroinvocacaoContext(_ctx, getState());
		enterRule(_localctx, 130, RULE_retroinvocacao);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(691);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,39,_ctx) ) {
			case 1:
				{
				setState(674);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__163) {
					{
					setState(673);
					rotina2();
					}
				}

				setState(676);
				para();
				setState(677);
				que_se();
				setState(678);
				compativelmente();
				setState(679);
				nome_da_rotina();
				setState(680);
				match(PONTO_E_VIRGULA);
				}
				break;
			case 2:
				{
				setState(683);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__163) {
					{
					setState(682);
					rotina2();
					}
				}

				setState(685);
				para();
				setState(686);
				que_se();
				setState(687);
				compativelmente();
				setState(688);
				nome_da_rotina();
				setState(689);
				match(DOIS_PONTOS);
				}
				break;
			}
			setState(693);
			instrucoes();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Nome_da_rotinaContext extends ParserRuleContext {
		public Unidade_semanticaContext unidade_semantica() {
			return getRuleContext(Unidade_semanticaContext.class,0);
		}
		public ParametroContext parametro() {
			return getRuleContext(ParametroContext.class,0);
		}
		public FraseContext frase() {
			return getRuleContext(FraseContext.class,0);
		}
		public QualificadorContext qualificador() {
			return getRuleContext(QualificadorContext.class,0);
		}
		public Nome_da_rotinaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_nome_da_rotina; }
	}

	public final Nome_da_rotinaContext nome_da_rotina() throws RecognitionException {
		Nome_da_rotinaContext _localctx = new Nome_da_rotinaContext(_ctx, getState());
		enterRule(_localctx, 132, RULE_nome_da_rotina);
		int _la;
		try {
			setState(701);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case CARACTERES_IMPRIMIVEIS:
				enterOuterAlt(_localctx, 1);
				{
				setState(695);
				unidade_semantica();
				}
				break;
			case T__5:
			case T__6:
			case T__7:
			case T__8:
			case T__13:
			case T__14:
			case T__15:
			case T__16:
				enterOuterAlt(_localctx, 2);
				{
				setState(696);
				parametro();
				}
				break;
			case T__1:
			case T__2:
			case T__3:
			case T__4:
			case T__9:
			case T__10:
			case T__11:
			case T__12:
				enterOuterAlt(_localctx, 3);
				{
				setState(697);
				frase();
				setState(699);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==ABRE_PARENTESES) {
					{
					setState(698);
					qualificador();
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Unidade_semanticaContext extends ParserRuleContext {
		public PalavraContext palavra() {
			return getRuleContext(PalavraContext.class,0);
		}
		public Unidade_semanticaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_unidade_semantica; }
	}

	public final Unidade_semanticaContext unidade_semantica() throws RecognitionException {
		Unidade_semanticaContext _localctx = new Unidade_semanticaContext(_ctx, getState());
		enterRule(_localctx, 134, RULE_unidade_semantica);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(703);
			palavra();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ParametroContext extends ParserRuleContext {
		public Artigo_indefinidoContext artigo_indefinido() {
			return getRuleContext(Artigo_indefinidoContext.class,0);
		}
		public List<NomeContext> nome() {
			return getRuleContexts(NomeContext.class);
		}
		public NomeContext nome(int i) {
			return getRuleContext(NomeContext.class,i);
		}
		public DenominacoesContext denominacoes() {
			return getRuleContext(DenominacoesContext.class,0);
		}
		public ParametroContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_parametro; }
	}

	public final ParametroContext parametro() throws RecognitionException {
		ParametroContext _localctx = new ParametroContext(_ctx, getState());
		enterRule(_localctx, 136, RULE_parametro);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(705);
			artigo_indefinido();
			setState(706);
			nome();
			setState(710);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (((((_la - 72)) & ~0x3f) == 0 && ((1L << (_la - 72)) & 255L) != 0)) {
				{
				setState(707);
				denominacoes();
				setState(708);
				nome();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class FraseContext extends ParserRuleContext {
		public Artigo_definidoContext artigo_definido() {
			return getRuleContext(Artigo_definidoContext.class,0);
		}
		public NomeContext nome() {
			return getRuleContext(NomeContext.class,0);
		}
		public FraseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_frase; }
	}

	public final FraseContext frase() throws RecognitionException {
		FraseContext _localctx = new FraseContext(_ctx, getState());
		enterRule(_localctx, 138, RULE_frase);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(712);
			artigo_definido();
			setState(713);
			nome();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class InstrucoesContext extends ParserRuleContext {
		public List<InstrucaoContext> instrucao() {
			return getRuleContexts(InstrucaoContext.class);
		}
		public InstrucaoContext instrucao(int i) {
			return getRuleContext(InstrucaoContext.class,i);
		}
		public InstrucoesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_instrucoes; }
	}

	public final InstrucoesContext instrucoes() throws RecognitionException {
		InstrucoesContext _localctx = new InstrucoesContext(_ctx, getState());
		enterRule(_localctx, 140, RULE_instrucoes);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(716); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(715);
				instrucao();
				}
				}
				setState(718); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 9169328841326591996L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 235L) != 0) || ((((_la - 166)) & ~0x3f) == 0 && ((1L << (_la - 166)) & 550859177995L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class InstrucaoContext extends ParserRuleContext {
		public PreservacaoContext preservacao() {
			return getRuleContext(PreservacaoContext.class,0);
		}
		public IteracaoContext iteracao() {
			return getRuleContext(IteracaoContext.class,0);
		}
		public CondicionalContext condicional() {
			return getRuleContext(CondicionalContext.class,0);
		}
		public IncondicionalContext incondicional() {
			return getRuleContext(IncondicionalContext.class,0);
		}
		public TerminalNode VIRGULA() { return getToken(PortuguesPuroParser.VIRGULA, 0); }
		public InstrucaoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_instrucao; }
	}

	public final InstrucaoContext instrucao() throws RecognitionException {
		InstrucaoContext _localctx = new InstrucaoContext(_ctx, getState());
		enterRule(_localctx, 142, RULE_instrucao);
		try {
			setState(726);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__58:
				enterOuterAlt(_localctx, 1);
				{
				setState(720);
				preservacao();
				}
				break;
			case T__165:
				enterOuterAlt(_localctx, 2);
				{
				setState(721);
				iteracao();
				}
				break;
			case T__53:
				enterOuterAlt(_localctx, 3);
				{
				setState(722);
				condicional();
				}
				break;
			case T__1:
			case T__2:
			case T__3:
			case T__4:
			case T__5:
			case T__6:
			case T__7:
			case T__8:
			case T__9:
			case T__10:
			case T__11:
			case T__12:
			case T__13:
			case T__14:
			case T__15:
			case T__16:
			case T__55:
			case T__56:
			case T__57:
			case T__59:
			case T__60:
			case T__61:
			case T__63:
			case T__64:
			case T__66:
			case T__68:
			case T__69:
			case T__70:
			case T__166:
			case T__168:
			case DIGITO:
			case ASPAS_DUPLAS:
			case HIFEN:
			case CIFRAO:
			case SINAL_DE_ADICAO:
			case CARACTERES_IMPRIMIVEIS:
				enterOuterAlt(_localctx, 4);
				{
				setState(723);
				incondicional();
				setState(724);
				match(VIRGULA);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class PreserveContext extends ParserRuleContext {
		public PreserveContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_preserve; }
	}

	public final PreserveContext preserve() throws RecognitionException {
		PreserveContext _localctx = new PreserveContext(_ctx, getState());
		enterRule(_localctx, 144, RULE_preserve);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(728);
			match(T__58);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class PreservacaoContext extends ParserRuleContext {
		public PreserveContext preserve() {
			return getRuleContext(PreserveContext.class,0);
		}
		public ParametroContext parametro() {
			return getRuleContext(ParametroContext.class,0);
		}
		public PreservacaoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_preservacao; }
	}

	public final PreservacaoContext preservacao() throws RecognitionException {
		PreservacaoContext _localctx = new PreservacaoContext(_ctx, getState());
		enterRule(_localctx, 146, RULE_preservacao);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(730);
			preserve();
			setState(731);
			parametro();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class IteracaoContext extends ParserRuleContext {
		public IteracaoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_iteracao; }
	}

	public final IteracaoContext iteracao() throws RecognitionException {
		IteracaoContext _localctx = new IteracaoContext(_ctx, getState());
		enterRule(_localctx, 148, RULE_iteracao);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(733);
			match(T__165);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class SeContext extends ParserRuleContext {
		public SeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_se; }
	}

	public final SeContext se() throws RecognitionException {
		SeContext _localctx = new SeContext(_ctx, getState());
		enterRule(_localctx, 150, RULE_se);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(735);
			match(T__53);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CondicionalContext extends ParserRuleContext {
		public SeContext se() {
			return getRuleContext(SeContext.class,0);
		}
		public Expressao_decisoraContext expressao_decisora() {
			return getRuleContext(Expressao_decisoraContext.class,0);
		}
		public TerminalNode VIRGULA() { return getToken(PortuguesPuroParser.VIRGULA, 0); }
		public List<IncondicionalContext> incondicional() {
			return getRuleContexts(IncondicionalContext.class);
		}
		public IncondicionalContext incondicional(int i) {
			return getRuleContext(IncondicionalContext.class,i);
		}
		public TerminalNode PONTO() { return getToken(PortuguesPuroParser.PONTO, 0); }
		public List<TerminalNode> PONTO_E_VIRGULA() { return getTokens(PortuguesPuroParser.PONTO_E_VIRGULA); }
		public TerminalNode PONTO_E_VIRGULA(int i) {
			return getToken(PortuguesPuroParser.PONTO_E_VIRGULA, i);
		}
		public CondicionalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_condicional; }
	}

	public final CondicionalContext condicional() throws RecognitionException {
		CondicionalContext _localctx = new CondicionalContext(_ctx, getState());
		enterRule(_localctx, 152, RULE_condicional);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(737);
			se();
			setState(738);
			expressao_decisora();
			setState(739);
			match(VIRGULA);
			setState(740);
			incondicional();
			setState(745);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==PONTO_E_VIRGULA) {
				{
				{
				setState(741);
				match(PONTO_E_VIRGULA);
				setState(742);
				incondicional();
				}
				}
				setState(747);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(748);
			match(PONTO);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Expressao_decisoraContext extends ParserRuleContext {
		public List<PalavraContext> palavra() {
			return getRuleContexts(PalavraContext.class);
		}
		public PalavraContext palavra(int i) {
			return getRuleContext(PalavraContext.class,i);
		}
		public VerbosContext verbos() {
			return getRuleContext(VerbosContext.class,0);
		}
		public Expressao_decisoraContext expressao_decisora() {
			return getRuleContext(Expressao_decisoraContext.class,0);
		}
		public Expressao_decisoraContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expressao_decisora; }
	}

	public final Expressao_decisoraContext expressao_decisora() throws RecognitionException {
		Expressao_decisoraContext _localctx = new Expressao_decisoraContext(_ctx, getState());
		enterRule(_localctx, 154, RULE_expressao_decisora);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(751); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(750);
					palavra();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(753); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,46,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
			setState(756);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (((((_la - 80)) & ~0x3f) == 0 && ((1L << (_la - 80)) & 8388607L) != 0)) {
				{
				setState(755);
				verbos();
				}
			}

			setState(759);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==CARACTERES_IMPRIMIVEIS) {
				{
				setState(758);
				expressao_decisora();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class IncondicionalContext extends ParserRuleContext {
		public InterrupcaoContext interrupcao() {
			return getRuleContext(InterrupcaoContext.class,0);
		}
		public InvocacaoContext invocacao() {
			return getRuleContext(InvocacaoContext.class,0);
		}
		public RetornoContext retorno() {
			return getRuleContext(RetornoContext.class,0);
		}
		public DecodificacaoContext decodificacao() {
			return getRuleContext(DecodificacaoContext.class,0);
		}
		public ReiteracaoContext reiteracao() {
			return getRuleContext(ReiteracaoContext.class,0);
		}
		public IndirecaoContext indirecao() {
			return getRuleContext(IndirecaoContext.class,0);
		}
		public EmpilhamentoContext empilhamento() {
			return getRuleContext(EmpilhamentoContext.class,0);
		}
		public Retorno_booleanoContext retorno_booleano() {
			return getRuleContext(Retorno_booleanoContext.class,0);
		}
		public IncondicionalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_incondicional; }
	}

	public final IncondicionalContext incondicional() throws RecognitionException {
		IncondicionalContext _localctx = new IncondicionalContext(_ctx, getState());
		enterRule(_localctx, 156, RULE_incondicional);
		try {
			setState(769);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__56:
				enterOuterAlt(_localctx, 1);
				{
				setState(761);
				interrupcao();
				}
				break;
			case T__1:
			case T__2:
			case T__3:
			case T__4:
			case T__5:
			case T__6:
			case T__7:
			case T__8:
			case T__9:
			case T__10:
			case T__11:
			case T__12:
			case T__13:
			case T__14:
			case T__15:
			case T__16:
			case T__60:
			case T__61:
			case T__64:
			case T__68:
			case T__69:
			case T__70:
			case DIGITO:
			case ASPAS_DUPLAS:
			case HIFEN:
			case CIFRAO:
			case SINAL_DE_ADICAO:
			case CARACTERES_IMPRIMIVEIS:
				enterOuterAlt(_localctx, 2);
				{
				setState(762);
				invocacao();
				}
				break;
			case T__57:
				enterOuterAlt(_localctx, 3);
				{
				setState(763);
				retorno();
				}
				break;
			case T__63:
				enterOuterAlt(_localctx, 4);
				{
				setState(764);
				decodificacao();
				}
				break;
			case T__55:
				enterOuterAlt(_localctx, 5);
				{
				setState(765);
				reiteracao();
				}
				break;
			case T__166:
				enterOuterAlt(_localctx, 6);
				{
				setState(766);
				indirecao();
				}
				break;
			case T__66:
			case T__168:
				enterOuterAlt(_localctx, 7);
				{
				setState(767);
				empilhamento();
				}
				break;
			case T__59:
				enterOuterAlt(_localctx, 8);
				{
				setState(768);
				retorno_booleano();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class InterrupcaoContext extends ParserRuleContext {
		public InterrupcaoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_interrupcao; }
	}

	public final InterrupcaoContext interrupcao() throws RecognitionException {
		InterrupcaoContext _localctx = new InterrupcaoContext(_ctx, getState());
		enterRule(_localctx, 158, RULE_interrupcao);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(771);
			match(T__56);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class InvocacaoContext extends ParserRuleContext {
		public Invocacao_internaContext invocacao_interna() {
			return getRuleContext(Invocacao_internaContext.class,0);
		}
		public Invocacao_externaContext invocacao_externa() {
			return getRuleContext(Invocacao_externaContext.class,0);
		}
		public Invocacao_indiretaContext invocacao_indireta() {
			return getRuleContext(Invocacao_indiretaContext.class,0);
		}
		public InvocacaoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_invocacao; }
	}

	public final InvocacaoContext invocacao() throws RecognitionException {
		InvocacaoContext _localctx = new InvocacaoContext(_ctx, getState());
		enterRule(_localctx, 160, RULE_invocacao);
		try {
			setState(776);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,50,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(773);
				invocacao_interna();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(774);
				invocacao_externa();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(775);
				invocacao_indireta();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Invocacao_internaContext extends ParserRuleContext {
		public Unidade_semanticaContext unidade_semantica() {
			return getRuleContext(Unidade_semanticaContext.class,0);
		}
		public ExpressãoContext expressão() {
			return getRuleContext(ExpressãoContext.class,0);
		}
		public FraseContext frase() {
			return getRuleContext(FraseContext.class,0);
		}
		public QualificadorContext qualificador() {
			return getRuleContext(QualificadorContext.class,0);
		}
		public Invocacao_internaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_invocacao_interna; }
	}

	public final Invocacao_internaContext invocacao_interna() throws RecognitionException {
		Invocacao_internaContext _localctx = new Invocacao_internaContext(_ctx, getState());
		enterRule(_localctx, 162, RULE_invocacao_interna);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(781);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,51,_ctx) ) {
			case 1:
				{
				setState(778);
				unidade_semantica();
				}
				break;
			case 2:
				{
				setState(779);
				expressão();
				}
				break;
			case 3:
				{
				setState(780);
				frase();
				}
				break;
			}
			setState(784);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==ABRE_PARENTESES) {
				{
				setState(783);
				qualificador();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Invocacao_externaContext extends ParserRuleContext {
		public ProcesseContext processe() {
			return getRuleContext(ProcesseContext.class,0);
		}
		public List<Aspas_duplasContext> aspas_duplas() {
			return getRuleContexts(Aspas_duplasContext.class);
		}
		public Aspas_duplasContext aspas_duplas(int i) {
			return getRuleContext(Aspas_duplasContext.class,i);
		}
		public Nome_da_DLLContext nome_da_DLL() {
			return getRuleContext(Nome_da_DLLContext.class,0);
		}
		public Nome_da_funcaoContext nome_da_funcao() {
			return getRuleContext(Nome_da_funcaoContext.class,0);
		}
		public ComContext com() {
			return getRuleContext(ComContext.class,0);
		}
		public List<ExpressãoContext> expressão() {
			return getRuleContexts(ExpressãoContext.class);
		}
		public ExpressãoContext expressão(int i) {
			return getRuleContext(ExpressãoContext.class,i);
		}
		public List<EContext> e() {
			return getRuleContexts(EContext.class);
		}
		public EContext e(int i) {
			return getRuleContext(EContext.class,i);
		}
		public RetornandoContext retornando() {
			return getRuleContext(RetornandoContext.class,0);
		}
		public TermoContext termo() {
			return getRuleContext(TermoContext.class,0);
		}
		public Invocacao_externaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_invocacao_externa; }
	}

	public final Invocacao_externaContext invocacao_externa() throws RecognitionException {
		Invocacao_externaContext _localctx = new Invocacao_externaContext(_ctx, getState());
		enterRule(_localctx, 164, RULE_invocacao_externa);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(786);
			processe();
			setState(787);
			aspas_duplas();
			setState(788);
			nome_da_DLL();
			setState(789);
			aspas_duplas();
			setState(790);
			aspas_duplas();
			setState(791);
			nome_da_funcao();
			setState(792);
			aspas_duplas();
			setState(809);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__141) {
				{
				{
				setState(793);
				com();
				setState(794);
				expressão();
				}
				setState(801);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__137) {
					{
					{
					setState(796);
					e();
					setState(797);
					expressão();
					}
					}
					setState(803);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(807);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__65) {
					{
					setState(804);
					retornando();
					setState(805);
					termo();
					}
				}

				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Aspas_duplasContext extends ParserRuleContext {
		public TerminalNode ASPAS_DUPLAS() { return getToken(PortuguesPuroParser.ASPAS_DUPLAS, 0); }
		public Aspas_duplasContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_aspas_duplas; }
	}

	public final Aspas_duplasContext aspas_duplas() throws RecognitionException {
		Aspas_duplasContext _localctx = new Aspas_duplasContext(_ctx, getState());
		enterRule(_localctx, 166, RULE_aspas_duplas);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(811);
			match(ASPAS_DUPLAS);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Nome_da_DLLContext extends ParserRuleContext {
		public PalavraContext palavra() {
			return getRuleContext(PalavraContext.class,0);
		}
		public Nome_da_DLLContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_nome_da_DLL; }
	}

	public final Nome_da_DLLContext nome_da_DLL() throws RecognitionException {
		Nome_da_DLLContext _localctx = new Nome_da_DLLContext(_ctx, getState());
		enterRule(_localctx, 168, RULE_nome_da_DLL);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(813);
			palavra();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Nome_da_funcaoContext extends ParserRuleContext {
		public PalavraContext palavra() {
			return getRuleContext(PalavraContext.class,0);
		}
		public Nome_da_funcaoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_nome_da_funcao; }
	}

	public final Nome_da_funcaoContext nome_da_funcao() throws RecognitionException {
		Nome_da_funcaoContext _localctx = new Nome_da_funcaoContext(_ctx, getState());
		enterRule(_localctx, 170, RULE_nome_da_funcao);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(815);
			palavra();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ProcesseContext extends ParserRuleContext {
		public ProcesseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_processe; }
	}

	public final ProcesseContext processe() throws RecognitionException {
		ProcesseContext _localctx = new ProcesseContext(_ctx, getState());
		enterRule(_localctx, 172, RULE_processe);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(817);
			match(T__64);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ComContext extends ParserRuleContext {
		public ComContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_com; }
	}

	public final ComContext com() throws RecognitionException {
		ComContext _localctx = new ComContext(_ctx, getState());
		enterRule(_localctx, 174, RULE_com);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(819);
			match(T__141);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class EContext extends ParserRuleContext {
		public EContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_e; }
	}

	public final EContext e() throws RecognitionException {
		EContext _localctx = new EContext(_ctx, getState());
		enterRule(_localctx, 176, RULE_e);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(821);
			match(T__137);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class RetornandoContext extends ParserRuleContext {
		public RetornandoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_retornando; }
	}

	public final RetornandoContext retornando() throws RecognitionException {
		RetornandoContext _localctx = new RetornandoContext(_ctx, getState());
		enterRule(_localctx, 178, RULE_retornando);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(823);
			match(T__65);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Invocacao_indiretaContext extends ParserRuleContext {
		public ProcesseContext processe() {
			return getRuleContext(ProcesseContext.class,0);
		}
		public List<ExpressãoContext> expressão() {
			return getRuleContexts(ExpressãoContext.class);
		}
		public ExpressãoContext expressão(int i) {
			return getRuleContext(ExpressãoContext.class,i);
		}
		public ComContext com() {
			return getRuleContext(ComContext.class,0);
		}
		public List<EContext> e() {
			return getRuleContexts(EContext.class);
		}
		public EContext e(int i) {
			return getRuleContext(EContext.class,i);
		}
		public RetornandoContext retornando() {
			return getRuleContext(RetornandoContext.class,0);
		}
		public TermoContext termo() {
			return getRuleContext(TermoContext.class,0);
		}
		public Invocacao_indiretaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_invocacao_indireta; }
	}

	public final Invocacao_indiretaContext invocacao_indireta() throws RecognitionException {
		Invocacao_indiretaContext _localctx = new Invocacao_indiretaContext(_ctx, getState());
		enterRule(_localctx, 180, RULE_invocacao_indireta);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(825);
			processe();
			setState(826);
			expressão();
			setState(842);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__141) {
				{
				setState(827);
				com();
				setState(828);
				expressão();
				setState(834);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__137) {
					{
					{
					setState(829);
					e();
					setState(830);
					expressão();
					}
					}
					setState(836);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(840);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__65) {
					{
					setState(837);
					retornando();
					setState(838);
					termo();
					}
				}

				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class RetornoContext extends ParserRuleContext {
		public RetornoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_retorno; }
	}

	public final RetornoContext retorno() throws RecognitionException {
		RetornoContext _localctx = new RetornoContext(_ctx, getState());
		enterRule(_localctx, 182, RULE_retorno);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(844);
			match(T__57);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DecodifiqueContext extends ParserRuleContext {
		public DecodifiqueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_decodifique; }
	}

	public final DecodifiqueContext decodifique() throws RecognitionException {
		DecodifiqueContext _localctx = new DecodifiqueContext(_ctx, getState());
		enterRule(_localctx, 184, RULE_decodifique);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(846);
			match(T__63);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DecodificacaoContext extends ParserRuleContext {
		public DecodifiqueContext decodifique() {
			return getRuleContext(DecodifiqueContext.class,0);
		}
		public Numero_hexadecimalContext numero_hexadecimal() {
			return getRuleContext(Numero_hexadecimalContext.class,0);
		}
		public DecodificacaoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_decodificacao; }
	}

	public final DecodificacaoContext decodificacao() throws RecognitionException {
		DecodificacaoContext _localctx = new DecodificacaoContext(_ctx, getState());
		enterRule(_localctx, 186, RULE_decodificacao);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(848);
			decodifique();
			setState(849);
			numero_hexadecimal();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class AponteContext extends ParserRuleContext {
		public AponteContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_aponte; }
	}

	public final AponteContext aponte() throws RecognitionException {
		AponteContext _localctx = new AponteContext(_ctx, getState());
		enterRule(_localctx, 188, RULE_aponte);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(851);
			match(T__166);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Para_rotinaContext extends ParserRuleContext {
		public Para_rotinaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_para_rotina; }
	}

	public final Para_rotinaContext para_rotina() throws RecognitionException {
		Para_rotinaContext _localctx = new Para_rotinaContext(_ctx, getState());
		enterRule(_localctx, 190, RULE_para_rotina);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(853);
			match(T__167);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class IndirecaoContext extends ParserRuleContext {
		public AponteContext aponte() {
			return getRuleContext(AponteContext.class,0);
		}
		public ArtigoContext artigo() {
			return getRuleContext(ArtigoContext.class,0);
		}
		public TermoContext termo() {
			return getRuleContext(TermoContext.class,0);
		}
		public Para_rotinaContext para_rotina() {
			return getRuleContext(Para_rotinaContext.class,0);
		}
		public Unidade_semanticaContext unidade_semantica() {
			return getRuleContext(Unidade_semanticaContext.class,0);
		}
		public ParametroContext parametro() {
			return getRuleContext(ParametroContext.class,0);
		}
		public FraseContext frase() {
			return getRuleContext(FraseContext.class,0);
		}
		public QualificadorContext qualificador() {
			return getRuleContext(QualificadorContext.class,0);
		}
		public IndirecaoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_indirecao; }
	}

	public final IndirecaoContext indirecao() throws RecognitionException {
		IndirecaoContext _localctx = new IndirecaoContext(_ctx, getState());
		enterRule(_localctx, 192, RULE_indirecao);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(855);
			aponte();
			setState(856);
			artigo();
			setState(857);
			termo();
			setState(858);
			para_rotina();
			setState(862);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case CARACTERES_IMPRIMIVEIS:
				{
				setState(859);
				unidade_semantica();
				}
				break;
			case T__5:
			case T__6:
			case T__7:
			case T__8:
			case T__13:
			case T__14:
			case T__15:
			case T__16:
				{
				setState(860);
				parametro();
				}
				break;
			case T__1:
			case T__2:
			case T__3:
			case T__4:
			case T__9:
			case T__10:
			case T__11:
			case T__12:
				{
				setState(861);
				frase();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(865);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==ABRE_PARENTESES) {
				{
				setState(864);
				qualificador();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class PushContext extends ParserRuleContext {
		public PushContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_push; }
	}

	public final PushContext push() throws RecognitionException {
		PushContext _localctx = new PushContext(_ctx, getState());
		enterRule(_localctx, 194, RULE_push);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(867);
			_la = _input.LA(1);
			if ( !(_la==T__66 || _la==T__168) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class EmpilhamentoContext extends ParserRuleContext {
		public PushContext push() {
			return getRuleContext(PushContext.class,0);
		}
		public ExpressãoContext expressão() {
			return getRuleContext(ExpressãoContext.class,0);
		}
		public EmpilhamentoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_empilhamento; }
	}

	public final EmpilhamentoContext empilhamento() throws RecognitionException {
		EmpilhamentoContext _localctx = new EmpilhamentoContext(_ctx, getState());
		enterRule(_localctx, 196, RULE_empilhamento);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(869);
			push();
			setState(870);
			expressão();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ReiteracaoContext extends ParserRuleContext {
		public ReiteracaoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_reiteracao; }
	}

	public final ReiteracaoContext reiteracao() throws RecognitionException {
		ReiteracaoContext _localctx = new ReiteracaoContext(_ctx, getState());
		enterRule(_localctx, 198, RULE_reiteracao);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(872);
			match(T__55);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DigaContext extends ParserRuleContext {
		public DigaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_diga; }
	}

	public final DigaContext diga() throws RecognitionException {
		DigaContext _localctx = new DigaContext(_ctx, getState());
		enterRule(_localctx, 200, RULE_diga);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(874);
			match(T__59);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Retorno_booleanoContext extends ParserRuleContext {
		public DigaContext diga() {
			return getRuleContext(DigaContext.class,0);
		}
		public BooleanoContext booleano() {
			return getRuleContext(BooleanoContext.class,0);
		}
		public Retorno_booleanoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_retorno_booleano; }
	}

	public final Retorno_booleanoContext retorno_booleano() throws RecognitionException {
		Retorno_booleanoContext _localctx = new Retorno_booleanoContext(_ctx, getState());
		enterRule(_localctx, 202, RULE_retorno_booleano);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(876);
			diga();
			setState(877);
			booleano();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ExpressãoContext extends ParserRuleContext {
		public List<TermoContext> termo() {
			return getRuleContexts(TermoContext.class);
		}
		public TermoContext termo(int i) {
			return getRuleContext(TermoContext.class,i);
		}
		public List<Operadores_comunsContext> operadores_comuns() {
			return getRuleContexts(Operadores_comunsContext.class);
		}
		public Operadores_comunsContext operadores_comuns(int i) {
			return getRuleContext(Operadores_comunsContext.class,i);
		}
		public ExpressãoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expressão; }
	}

	public final ExpressãoContext expressão() throws RecognitionException {
		ExpressãoContext _localctx = new ExpressãoContext(_ctx, getState());
		enterRule(_localctx, 204, RULE_expressão);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(879);
			termo();
			setState(885);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 170)) & ~0x3f) == 0 && ((1L << (_la - 170)) & 255L) != 0)) {
				{
				{
				setState(880);
				operadores_comuns();
				setState(881);
				termo();
				}
				}
				setState(887);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Operadores_comunsContext extends ParserRuleContext {
		public Operadores_comunsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_operadores_comuns; }
	}

	public final Operadores_comunsContext operadores_comuns() throws RecognitionException {
		Operadores_comunsContext _localctx = new Operadores_comunsContext(_ctx, getState());
		enterRule(_localctx, 206, RULE_operadores_comuns);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(888);
			_la = _input.LA(1);
			if ( !(((((_la - 170)) & ~0x3f) == 0 && ((1L << (_la - 170)) & 255L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class BooleanoContext extends ParserRuleContext {
		public BooleanoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_booleano; }
	}

	public final BooleanoContext booleano() throws RecognitionException {
		BooleanoContext _localctx = new BooleanoContext(_ctx, getState());
		enterRule(_localctx, 208, RULE_booleano);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(890);
			_la = _input.LA(1);
			if ( !(_la==T__60 || _la==T__61) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class NuloContext extends ParserRuleContext {
		public NuloContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_nulo; }
	}

	public final NuloContext nulo() throws RecognitionException {
		NuloContext _localctx = new NuloContext(_ctx, getState());
		enterRule(_localctx, 210, RULE_nulo);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(892);
			_la = _input.LA(1);
			if ( !(((((_la - 69)) & ~0x3f) == 0 && ((1L << (_la - 69)) & 7L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Termo_constanteContext extends ParserRuleContext {
		public Termo_constante_negativoContext termo_constante_negativo() {
			return getRuleContext(Termo_constante_negativoContext.class,0);
		}
		public Termo_constante_positivoContext termo_constante_positivo() {
			return getRuleContext(Termo_constante_positivoContext.class,0);
		}
		public LiteralContext literal() {
			return getRuleContext(LiteralContext.class,0);
		}
		public Termo_constanteContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_termo_constante; }
	}

	public final Termo_constanteContext termo_constante() throws RecognitionException {
		Termo_constanteContext _localctx = new Termo_constanteContext(_ctx, getState());
		enterRule(_localctx, 212, RULE_termo_constante);
		try {
			setState(897);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,62,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(894);
				termo_constante_negativo();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(895);
				termo_constante_positivo();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(896);
				literal();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Termo_constante_negativoContext extends ParserRuleContext {
		public TerminalNode HIFEN() { return getToken(PortuguesPuroParser.HIFEN, 0); }
		public Termo_constanteContext termo_constante() {
			return getRuleContext(Termo_constanteContext.class,0);
		}
		public Termo_constante_negativoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_termo_constante_negativo; }
	}

	public final Termo_constante_negativoContext termo_constante_negativo() throws RecognitionException {
		Termo_constante_negativoContext _localctx = new Termo_constante_negativoContext(_ctx, getState());
		enterRule(_localctx, 214, RULE_termo_constante_negativo);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(899);
			match(HIFEN);
			setState(900);
			termo_constante();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Termo_constante_positivoContext extends ParserRuleContext {
		public TerminalNode SINAL_DE_ADICAO() { return getToken(PortuguesPuroParser.SINAL_DE_ADICAO, 0); }
		public Termo_constanteContext termo_constante() {
			return getRuleContext(Termo_constanteContext.class,0);
		}
		public Termo_constante_positivoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_termo_constante_positivo; }
	}

	public final Termo_constante_positivoContext termo_constante_positivo() throws RecognitionException {
		Termo_constante_positivoContext _localctx = new Termo_constante_positivoContext(_ctx, getState());
		enterRule(_localctx, 216, RULE_termo_constante_positivo);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(902);
			match(SINAL_DE_ADICAO);
			setState(903);
			termo_constante();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class NumeroContext extends ParserRuleContext {
		public Numero_decimalContext numero_decimal() {
			return getRuleContext(Numero_decimalContext.class,0);
		}
		public Numero_fracionarioContext numero_fracionario() {
			return getRuleContext(Numero_fracionarioContext.class,0);
		}
		public Numero_mistoContext numero_misto() {
			return getRuleContext(Numero_mistoContext.class,0);
		}
		public NumeroContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_numero; }
	}

	public final NumeroContext numero() throws RecognitionException {
		NumeroContext _localctx = new NumeroContext(_ctx, getState());
		enterRule(_localctx, 218, RULE_numero);
		try {
			setState(908);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,63,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(905);
				numero_decimal();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(906);
				numero_fracionario();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(907);
				numero_misto();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class LiteralContext extends ParserRuleContext {
		public NumeroContext numero() {
			return getRuleContext(NumeroContext.class,0);
		}
		public Nome_do_tipoContext nome_do_tipo() {
			return getRuleContext(Nome_do_tipoContext.class,0);
		}
		public String_literalContext string_literal() {
			return getRuleContext(String_literalContext.class,0);
		}
		public Numero_hexadecimalContext numero_hexadecimal() {
			return getRuleContext(Numero_hexadecimalContext.class,0);
		}
		public BooleanoContext booleano() {
			return getRuleContext(BooleanoContext.class,0);
		}
		public NuloContext nulo() {
			return getRuleContext(NuloContext.class,0);
		}
		public LiteralContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_literal; }
	}

	public final LiteralContext literal() throws RecognitionException {
		LiteralContext _localctx = new LiteralContext(_ctx, getState());
		enterRule(_localctx, 220, RULE_literal);
		int _la;
		try {
			setState(918);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case DIGITO:
			case HIFEN:
				enterOuterAlt(_localctx, 1);
				{
				setState(910);
				numero();
				setState(912);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==CARACTERES_IMPRIMIVEIS) {
					{
					setState(911);
					nome_do_tipo();
					}
				}

				}
				break;
			case ASPAS_DUPLAS:
				enterOuterAlt(_localctx, 2);
				{
				setState(914);
				string_literal();
				}
				break;
			case CIFRAO:
				enterOuterAlt(_localctx, 3);
				{
				setState(915);
				numero_hexadecimal();
				}
				break;
			case T__60:
			case T__61:
				enterOuterAlt(_localctx, 4);
				{
				setState(916);
				booleano();
				}
				break;
			case T__68:
			case T__69:
			case T__70:
				enterOuterAlt(_localctx, 5);
				{
				setState(917);
				nulo();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TermoContext extends ParserRuleContext {
		public Termo_negativoContext termo_negativo() {
			return getRuleContext(Termo_negativoContext.class,0);
		}
		public Termo_positivoContext termo_positivo() {
			return getRuleContext(Termo_positivoContext.class,0);
		}
		public Variavel_localContext variavel_local() {
			return getRuleContext(Variavel_localContext.class,0);
		}
		public VariavelContext variavel() {
			return getRuleContext(VariavelContext.class,0);
		}
		public Termo_literalContext termo_literal() {
			return getRuleContext(Termo_literalContext.class,0);
		}
		public ComoContext como() {
			return getRuleContext(ComoContext.class,0);
		}
		public Artigo_indefinidoContext artigo_indefinido() {
			return getRuleContext(Artigo_indefinidoContext.class,0);
		}
		public Nome_do_tipoContext nome_do_tipo() {
			return getRuleContext(Nome_do_tipoContext.class,0);
		}
		public Sinal_de_divisãoContext sinal_de_divisão() {
			return getRuleContext(Sinal_de_divisãoContext.class,0);
		}
		public TermoContext termo() {
			return getRuleContext(TermoContext.class,0);
		}
		public TermoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_termo; }
	}

	public final TermoContext termo() throws RecognitionException {
		TermoContext _localctx = new TermoContext(_ctx, getState());
		enterRule(_localctx, 222, RULE_termo);
		int _la;
		try {
			setState(936);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,68,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(920);
				termo_negativo();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(921);
				termo_positivo();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(922);
				variavel_local();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(923);
				variavel();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(924);
				termo_literal();
				setState(929);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__177) {
					{
					setState(925);
					como();
					setState(926);
					artigo_indefinido();
					setState(927);
					nome_do_tipo();
					}
				}

				setState(934);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==BARRA_INCLINADA) {
					{
					setState(931);
					sinal_de_divisão();
					setState(932);
					termo();
					}
				}

				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Sinal_de_divisãoContext extends ParserRuleContext {
		public TerminalNode BARRA_INCLINADA() { return getToken(PortuguesPuroParser.BARRA_INCLINADA, 0); }
		public Sinal_de_divisãoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_sinal_de_divisão; }
	}

	public final Sinal_de_divisãoContext sinal_de_divisão() throws RecognitionException {
		Sinal_de_divisãoContext _localctx = new Sinal_de_divisãoContext(_ctx, getState());
		enterRule(_localctx, 224, RULE_sinal_de_divisão);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(938);
			match(BARRA_INCLINADA);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ComoContext extends ParserRuleContext {
		public ComoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_como; }
	}

	public final ComoContext como() throws RecognitionException {
		ComoContext _localctx = new ComoContext(_ctx, getState());
		enterRule(_localctx, 226, RULE_como);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(940);
			match(T__177);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Termo_negativoContext extends ParserRuleContext {
		public TerminalNode HIFEN() { return getToken(PortuguesPuroParser.HIFEN, 0); }
		public TermoContext termo() {
			return getRuleContext(TermoContext.class,0);
		}
		public Termo_negativoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_termo_negativo; }
	}

	public final Termo_negativoContext termo_negativo() throws RecognitionException {
		Termo_negativoContext _localctx = new Termo_negativoContext(_ctx, getState());
		enterRule(_localctx, 228, RULE_termo_negativo);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(942);
			match(HIFEN);
			setState(943);
			termo();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Termo_positivoContext extends ParserRuleContext {
		public TerminalNode SINAL_DE_ADICAO() { return getToken(PortuguesPuroParser.SINAL_DE_ADICAO, 0); }
		public TermoContext termo() {
			return getRuleContext(TermoContext.class,0);
		}
		public Termo_positivoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_termo_positivo; }
	}

	public final Termo_positivoContext termo_positivo() throws RecognitionException {
		Termo_positivoContext _localctx = new Termo_positivoContext(_ctx, getState());
		enterRule(_localctx, 230, RULE_termo_positivo);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(945);
			match(SINAL_DE_ADICAO);
			setState(946);
			termo();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Variavel_localContext extends ParserRuleContext {
		public Artigo_indefinidoContext artigo_indefinido() {
			return getRuleContext(Artigo_indefinidoContext.class,0);
		}
		public List<NomeContext> nome() {
			return getRuleContexts(NomeContext.class);
		}
		public NomeContext nome(int i) {
			return getRuleContext(NomeContext.class,i);
		}
		public DenominacoesContext denominacoes() {
			return getRuleContext(DenominacoesContext.class,0);
		}
		public Artigo_definidoContext artigo_definido() {
			return getRuleContext(Artigo_definidoContext.class,0);
		}
		public Atribuidores_de_posseContext atribuidores_de_posse() {
			return getRuleContext(Atribuidores_de_posseContext.class,0);
		}
		public Variavel_localContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_variavel_local; }
	}

	public final Variavel_localContext variavel_local() throws RecognitionException {
		Variavel_localContext _localctx = new Variavel_localContext(_ctx, getState());
		enterRule(_localctx, 232, RULE_variavel_local);
		int _la;
		try {
			setState(960);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__5:
			case T__6:
			case T__7:
			case T__8:
			case T__13:
			case T__14:
			case T__15:
			case T__16:
				enterOuterAlt(_localctx, 1);
				{
				{
				setState(948);
				artigo_indefinido();
				setState(949);
				nome();
				setState(953);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (((((_la - 72)) & ~0x3f) == 0 && ((1L << (_la - 72)) & 255L) != 0)) {
					{
					setState(950);
					denominacoes();
					setState(951);
					nome();
					}
				}

				}
				}
				break;
			case T__1:
			case T__2:
			case T__3:
			case T__4:
			case T__9:
			case T__10:
			case T__11:
			case T__12:
				enterOuterAlt(_localctx, 2);
				{
				{
				setState(955);
				artigo_definido();
				setState(956);
				nome();
				setState(957);
				atribuidores_de_posse();
				setState(958);
				nome();
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class VariavelContext extends ParserRuleContext {
		public Artigo_definidoContext artigo_definido() {
			return getRuleContext(Artigo_definidoContext.class,0);
		}
		public Possessivo_portuguêsContext possessivo_português() {
			return getRuleContext(Possessivo_portuguêsContext.class,0);
		}
		public P2Context p2() {
			return getRuleContext(P2Context.class,0);
		}
		public NomeContext nome() {
			return getRuleContext(NomeContext.class,0);
		}
		public VariavelContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_variavel; }
	}

	public final VariavelContext variavel() throws RecognitionException {
		VariavelContext _localctx = new VariavelContext(_ctx, getState());
		enterRule(_localctx, 234, RULE_variavel);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(962);
			artigo_definido();
			setState(963);
			possessivo_português();
			setState(964);
			p2();
			setState(965);
			nome();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Termo_literalContext extends ParserRuleContext {
		public LiteralContext literal() {
			return getRuleContext(LiteralContext.class,0);
		}
		public Possessivos_inglêsContext possessivos_inglês() {
			return getRuleContext(Possessivos_inglêsContext.class,0);
		}
		public Termo_literalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_termo_literal; }
	}

	public final Termo_literalContext termo_literal() throws RecognitionException {
		Termo_literalContext _localctx = new Termo_literalContext(_ctx, getState());
		enterRule(_localctx, 236, RULE_termo_literal);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(967);
			literal();
			setState(968);
			possessivos_inglês();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ConteúdoContext extends ParserRuleContext {
		public ConteúdoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_conteúdo; }
	}

	public final ConteúdoContext conteúdo() throws RecognitionException {
		ConteúdoContext _localctx = new ConteúdoContext(_ctx, getState());
		enterRule(_localctx, 238, RULE_conteúdo);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(970);
			match(T__178);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class MagnitudeContext extends ParserRuleContext {
		public MagnitudeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_magnitude; }
	}

	public final MagnitudeContext magnitude() throws RecognitionException {
		MagnitudeContext _localctx = new MagnitudeContext(_ctx, getState());
		enterRule(_localctx, 240, RULE_magnitude);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(972);
			match(T__179);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class EndereçamentoContext extends ParserRuleContext {
		public EndereçamentoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_endereçamento; }
	}

	public final EndereçamentoContext endereçamento() throws RecognitionException {
		EndereçamentoContext _localctx = new EndereçamentoContext(_ctx, getState());
		enterRule(_localctx, 242, RULE_endereçamento);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(974);
			match(T__180);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Possessivos_inglêsContext extends ParserRuleContext {
		public List<Possessivo_inglês_antigoContext> possessivo_inglês_antigo() {
			return getRuleContexts(Possessivo_inglês_antigoContext.class);
		}
		public Possessivo_inglês_antigoContext possessivo_inglês_antigo(int i) {
			return getRuleContext(Possessivo_inglês_antigoContext.class,i);
		}
		public Possessivos_inglêsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_possessivos_inglês; }
	}

	public final Possessivos_inglêsContext possessivos_inglês() throws RecognitionException {
		Possessivos_inglêsContext _localctx = new Possessivos_inglêsContext(_ctx, getState());
		enterRule(_localctx, 244, RULE_possessivos_inglês);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(979);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__181) {
				{
				{
				setState(976);
				possessivo_inglês_antigo();
				}
				}
				setState(981);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Possessivo_inglês_antigoContext extends ParserRuleContext {
		public ApostrofoContext apostrofo() {
			return getRuleContext(ApostrofoContext.class,0);
		}
		public NomeContext nome() {
			return getRuleContext(NomeContext.class,0);
		}
		public FuncaoContext funcao() {
			return getRuleContext(FuncaoContext.class,0);
		}
		public ConteúdoContext conteúdo() {
			return getRuleContext(ConteúdoContext.class,0);
		}
		public MagnitudeContext magnitude() {
			return getRuleContext(MagnitudeContext.class,0);
		}
		public EndereçamentoContext endereçamento() {
			return getRuleContext(EndereçamentoContext.class,0);
		}
		public Possessivo_inglês_antigoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_possessivo_inglês_antigo; }
	}

	public final Possessivo_inglês_antigoContext possessivo_inglês_antigo() throws RecognitionException {
		Possessivo_inglês_antigoContext _localctx = new Possessivo_inglês_antigoContext(_ctx, getState());
		enterRule(_localctx, 246, RULE_possessivo_inglês_antigo);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(982);
			apostrofo();
			setState(988);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case CARACTERES_IMPRIMIVEIS:
				{
				setState(983);
				nome();
				}
				break;
			case T__159:
			case T__161:
				{
				setState(984);
				funcao();
				}
				break;
			case T__178:
				{
				setState(985);
				conteúdo();
				}
				break;
			case T__179:
				{
				setState(986);
				magnitude();
				}
				break;
			case T__180:
				{
				setState(987);
				endereçamento();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Possessivo_portuguêsContext extends ParserRuleContext {
		public P2Context p2() {
			return getRuleContext(P2Context.class,0);
		}
		public NomeContext nome() {
			return getRuleContext(NomeContext.class,0);
		}
		public FuncaoContext funcao() {
			return getRuleContext(FuncaoContext.class,0);
		}
		public ConteúdoContext conteúdo() {
			return getRuleContext(ConteúdoContext.class,0);
		}
		public MagnitudeContext magnitude() {
			return getRuleContext(MagnitudeContext.class,0);
		}
		public EndereçamentoContext endereçamento() {
			return getRuleContext(EndereçamentoContext.class,0);
		}
		public Possessivo_portuguêsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_possessivo_português; }
	}

	public final Possessivo_portuguêsContext possessivo_português() throws RecognitionException {
		Possessivo_portuguêsContext _localctx = new Possessivo_portuguêsContext(_ctx, getState());
		enterRule(_localctx, 248, RULE_possessivo_português);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(995);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case CARACTERES_IMPRIMIVEIS:
				{
				setState(990);
				nome();
				}
				break;
			case T__159:
			case T__161:
				{
				setState(991);
				funcao();
				}
				break;
			case T__178:
				{
				setState(992);
				conteúdo();
				}
				break;
			case T__179:
				{
				setState(993);
				magnitude();
				}
				break;
			case T__180:
				{
				setState(994);
				endereçamento();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(997);
			p2();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ApostrofoContext extends ParserRuleContext {
		public ApostrofoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_apostrofo; }
	}

	public final ApostrofoContext apostrofo() throws RecognitionException {
		ApostrofoContext _localctx = new ApostrofoContext(_ctx, getState());
		enterRule(_localctx, 250, RULE_apostrofo);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(999);
			match(T__181);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\u0004\u0001\u00ce\u03ea\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001"+
		"\u0002\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004"+
		"\u0002\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007\u0007\u0007"+
		"\u0002\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b\u0007\u000b"+
		"\u0002\f\u0007\f\u0002\r\u0007\r\u0002\u000e\u0007\u000e\u0002\u000f\u0007"+
		"\u000f\u0002\u0010\u0007\u0010\u0002\u0011\u0007\u0011\u0002\u0012\u0007"+
		"\u0012\u0002\u0013\u0007\u0013\u0002\u0014\u0007\u0014\u0002\u0015\u0007"+
		"\u0015\u0002\u0016\u0007\u0016\u0002\u0017\u0007\u0017\u0002\u0018\u0007"+
		"\u0018\u0002\u0019\u0007\u0019\u0002\u001a\u0007\u001a\u0002\u001b\u0007"+
		"\u001b\u0002\u001c\u0007\u001c\u0002\u001d\u0007\u001d\u0002\u001e\u0007"+
		"\u001e\u0002\u001f\u0007\u001f\u0002 \u0007 \u0002!\u0007!\u0002\"\u0007"+
		"\"\u0002#\u0007#\u0002$\u0007$\u0002%\u0007%\u0002&\u0007&\u0002\'\u0007"+
		"\'\u0002(\u0007(\u0002)\u0007)\u0002*\u0007*\u0002+\u0007+\u0002,\u0007"+
		",\u0002-\u0007-\u0002.\u0007.\u0002/\u0007/\u00020\u00070\u00021\u0007"+
		"1\u00022\u00072\u00023\u00073\u00024\u00074\u00025\u00075\u00026\u0007"+
		"6\u00027\u00077\u00028\u00078\u00029\u00079\u0002:\u0007:\u0002;\u0007"+
		";\u0002<\u0007<\u0002=\u0007=\u0002>\u0007>\u0002?\u0007?\u0002@\u0007"+
		"@\u0002A\u0007A\u0002B\u0007B\u0002C\u0007C\u0002D\u0007D\u0002E\u0007"+
		"E\u0002F\u0007F\u0002G\u0007G\u0002H\u0007H\u0002I\u0007I\u0002J\u0007"+
		"J\u0002K\u0007K\u0002L\u0007L\u0002M\u0007M\u0002N\u0007N\u0002O\u0007"+
		"O\u0002P\u0007P\u0002Q\u0007Q\u0002R\u0007R\u0002S\u0007S\u0002T\u0007"+
		"T\u0002U\u0007U\u0002V\u0007V\u0002W\u0007W\u0002X\u0007X\u0002Y\u0007"+
		"Y\u0002Z\u0007Z\u0002[\u0007[\u0002\\\u0007\\\u0002]\u0007]\u0002^\u0007"+
		"^\u0002_\u0007_\u0002`\u0007`\u0002a\u0007a\u0002b\u0007b\u0002c\u0007"+
		"c\u0002d\u0007d\u0002e\u0007e\u0002f\u0007f\u0002g\u0007g\u0002h\u0007"+
		"h\u0002i\u0007i\u0002j\u0007j\u0002k\u0007k\u0002l\u0007l\u0002m\u0007"+
		"m\u0002n\u0007n\u0002o\u0007o\u0002p\u0007p\u0002q\u0007q\u0002r\u0007"+
		"r\u0002s\u0007s\u0002t\u0007t\u0002u\u0007u\u0002v\u0007v\u0002w\u0007"+
		"w\u0002x\u0007x\u0002y\u0007y\u0002z\u0007z\u0002{\u0007{\u0002|\u0007"+
		"|\u0002}\u0007}\u0001\u0000\u0001\u0000\u0001\u0001\u0004\u0001\u0100"+
		"\b\u0001\u000b\u0001\f\u0001\u0101\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0003\u0001\u0003\u0003\u0003\u0109\b\u0003\u0001\u0004\u0001\u0004"+
		"\u0001\u0004\u0001\u0004\u0001\u0004\u0003\u0004\u0110\b\u0004\u0001\u0005"+
		"\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u0117\b\u0005"+
		"\u0001\u0006\u0001\u0006\u0001\u0007\u0001\u0007\u0001\b\u0001\b\u0001"+
		"\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001"+
		"\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0003\b\u0130"+
		"\b\b\u0001\t\u0001\t\u0001\n\u0001\n\u0001\u000b\u0001\u000b\u0001\f\u0001"+
		"\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0003\f\u0141"+
		"\b\f\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001"+
		"\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001"+
		"\r\u0001\r\u0003\r\u0156\b\r\u0001\u000e\u0001\u000e\u0001\u000f\u0001"+
		"\u000f\u0001\u0010\u0001\u0010\u0001\u0011\u0001\u0011\u0003\u0011\u0160"+
		"\b\u0011\u0001\u0012\u0001\u0012\u0005\u0012\u0164\b\u0012\n\u0012\f\u0012"+
		"\u0167\t\u0012\u0001\u0012\u0001\u0012\u0001\u0013\u0001\u0013\u0005\u0013"+
		"\u016d\b\u0013\n\u0013\f\u0013\u0170\t\u0013\u0001\u0013\u0001\u0013\u0001"+
		"\u0014\u0001\u0014\u0001\u0014\u0001\u0014\u0003\u0014\u0178\b\u0014\u0001"+
		"\u0015\u0001\u0015\u0001\u0015\u0001\u0016\u0001\u0016\u0001\u0017\u0001"+
		"\u0017\u0001\u0018\u0001\u0018\u0001\u0018\u0001\u0019\u0001\u0019\u0005"+
		"\u0019\u0186\b\u0019\n\u0019\f\u0019\u0189\t\u0019\u0001\u0019\u0001\u0019"+
		"\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001a"+
		"\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001a"+
		"\u0003\u001a\u0199\b\u001a\u0001\u001b\u0001\u001b\u0001\u001c\u0001\u001c"+
		"\u0001\u001d\u0001\u001d\u0001\u001d\u0003\u001d\u01a2\b\u001d\u0001\u001e"+
		"\u0004\u001e\u01a5\b\u001e\u000b\u001e\f\u001e\u01a6\u0001\u001f\u0003"+
		"\u001f\u01aa\b\u001f\u0001\u001f\u0001\u001f\u0001 \u0001 \u0001 \u0001"+
		" \u0001!\u0001!\u0001!\u0001!\u0001\"\u0001\"\u0001\"\u0001#\u0001#\u0005"+
		"#\u01bb\b#\n#\f#\u01be\t#\u0001#\u0001#\u0001$\u0001$\u0001$\u0003$\u01c5"+
		"\b$\u0001%\u0001%\u0001&\u0001&\u0001&\u0001&\u0001&\u0001&\u0003&\u01cf"+
		"\b&\u0001&\u0001&\u0001&\u0001&\u0001&\u0001&\u0001&\u0001&\u0001&\u0001"+
		"&\u0001&\u0001&\u0001&\u0001&\u0001&\u0001&\u0001&\u0001&\u0003&\u01e3"+
		"\b&\u0001\'\u0001\'\u0001(\u0001(\u0001)\u0001)\u0001)\u0001)\u0001)\u0001"+
		")\u0001)\u0003)\u01f0\b)\u0001*\u0001*\u0001*\u0001*\u0005*\u01f6\b*\n"+
		"*\f*\u01f9\t*\u0001+\u0001+\u0001,\u0001,\u0001-\u0001-\u0001-\u0001-"+
		"\u0003-\u0203\b-\u0001-\u0001-\u0001-\u0001-\u0001-\u0001-\u0001-\u0001"+
		"-\u0003-\u020d\b-\u0001.\u0001.\u0001/\u0004/\u0212\b/\u000b/\f/\u0213"+
		"\u00010\u00010\u00011\u00011\u00012\u00012\u00013\u00013\u00014\u0001"+
		"4\u00015\u00015\u00015\u00015\u00015\u00015\u00035\u0226\b5\u00015\u0001"+
		"5\u00015\u00015\u00015\u00015\u00015\u00015\u00015\u00015\u00015\u0001"+
		"5\u00015\u00015\u00015\u00015\u00015\u00015\u00015\u00015\u00015\u0001"+
		"5\u00015\u00015\u00015\u00015\u00035\u0242\b5\u00016\u00016\u00016\u0001"+
		"6\u00036\u0248\b6\u00017\u00037\u024b\b7\u00017\u00017\u00017\u00017\u0001"+
		"7\u00017\u00037\u0253\b7\u00017\u00017\u00017\u00017\u00017\u00037\u025a"+
		"\b7\u00017\u00017\u00018\u00018\u00019\u00039\u0261\b9\u00019\u00019\u0001"+
		"9\u00019\u00019\u00019\u00019\u00039\u026a\b9\u00019\u00019\u00019\u0001"+
		"9\u00019\u00019\u00039\u0272\b9\u0001:\u0001:\u0001;\u0001;\u0001<\u0003"+
		"<\u0279\b<\u0001<\u0001<\u0001<\u0001<\u0001<\u0001<\u0001<\u0001<\u0001"+
		"<\u0001<\u0001<\u0001<\u0001<\u0003<\u0288\b<\u0001<\u0001<\u0001<\u0001"+
		"<\u0001<\u0001<\u0001<\u0001<\u0001<\u0001<\u0001<\u0001<\u0003<\u0296"+
		"\b<\u0001<\u0001<\u0001=\u0001=\u0001>\u0001>\u0001?\u0001?\u0001@\u0001"+
		"@\u0001A\u0003A\u02a3\bA\u0001A\u0001A\u0001A\u0001A\u0001A\u0001A\u0001"+
		"A\u0003A\u02ac\bA\u0001A\u0001A\u0001A\u0001A\u0001A\u0001A\u0003A\u02b4"+
		"\bA\u0001A\u0001A\u0001B\u0001B\u0001B\u0001B\u0003B\u02bc\bB\u0003B\u02be"+
		"\bB\u0001C\u0001C\u0001D\u0001D\u0001D\u0001D\u0001D\u0003D\u02c7\bD\u0001"+
		"E\u0001E\u0001E\u0001F\u0004F\u02cd\bF\u000bF\fF\u02ce\u0001G\u0001G\u0001"+
		"G\u0001G\u0001G\u0001G\u0003G\u02d7\bG\u0001H\u0001H\u0001I\u0001I\u0001"+
		"I\u0001J\u0001J\u0001K\u0001K\u0001L\u0001L\u0001L\u0001L\u0001L\u0001"+
		"L\u0005L\u02e8\bL\nL\fL\u02eb\tL\u0001L\u0001L\u0001M\u0004M\u02f0\bM"+
		"\u000bM\fM\u02f1\u0001M\u0003M\u02f5\bM\u0001M\u0003M\u02f8\bM\u0001N"+
		"\u0001N\u0001N\u0001N\u0001N\u0001N\u0001N\u0001N\u0003N\u0302\bN\u0001"+
		"O\u0001O\u0001P\u0001P\u0001P\u0003P\u0309\bP\u0001Q\u0001Q\u0001Q\u0003"+
		"Q\u030e\bQ\u0001Q\u0003Q\u0311\bQ\u0001R\u0001R\u0001R\u0001R\u0001R\u0001"+
		"R\u0001R\u0001R\u0001R\u0001R\u0001R\u0001R\u0001R\u0005R\u0320\bR\nR"+
		"\fR\u0323\tR\u0001R\u0001R\u0001R\u0003R\u0328\bR\u0003R\u032a\bR\u0001"+
		"S\u0001S\u0001T\u0001T\u0001U\u0001U\u0001V\u0001V\u0001W\u0001W\u0001"+
		"X\u0001X\u0001Y\u0001Y\u0001Z\u0001Z\u0001Z\u0001Z\u0001Z\u0001Z\u0001"+
		"Z\u0005Z\u0341\bZ\nZ\fZ\u0344\tZ\u0001Z\u0001Z\u0001Z\u0003Z\u0349\bZ"+
		"\u0003Z\u034b\bZ\u0001[\u0001[\u0001\\\u0001\\\u0001]\u0001]\u0001]\u0001"+
		"^\u0001^\u0001_\u0001_\u0001`\u0001`\u0001`\u0001`\u0001`\u0001`\u0001"+
		"`\u0003`\u035f\b`\u0001`\u0003`\u0362\b`\u0001a\u0001a\u0001b\u0001b\u0001"+
		"b\u0001c\u0001c\u0001d\u0001d\u0001e\u0001e\u0001e\u0001f\u0001f\u0001"+
		"f\u0001f\u0005f\u0374\bf\nf\ff\u0377\tf\u0001g\u0001g\u0001h\u0001h\u0001"+
		"i\u0001i\u0001j\u0001j\u0001j\u0003j\u0382\bj\u0001k\u0001k\u0001k\u0001"+
		"l\u0001l\u0001l\u0001m\u0001m\u0001m\u0003m\u038d\bm\u0001n\u0001n\u0003"+
		"n\u0391\bn\u0001n\u0001n\u0001n\u0001n\u0003n\u0397\bn\u0001o\u0001o\u0001"+
		"o\u0001o\u0001o\u0001o\u0001o\u0001o\u0001o\u0003o\u03a2\bo\u0001o\u0001"+
		"o\u0001o\u0003o\u03a7\bo\u0003o\u03a9\bo\u0001p\u0001p\u0001q\u0001q\u0001"+
		"r\u0001r\u0001r\u0001s\u0001s\u0001s\u0001t\u0001t\u0001t\u0001t\u0001"+
		"t\u0003t\u03ba\bt\u0001t\u0001t\u0001t\u0001t\u0001t\u0003t\u03c1\bt\u0001"+
		"u\u0001u\u0001u\u0001u\u0001u\u0001v\u0001v\u0001v\u0001w\u0001w\u0001"+
		"x\u0001x\u0001y\u0001y\u0001z\u0005z\u03d2\bz\nz\fz\u03d5\tz\u0001{\u0001"+
		"{\u0001{\u0001{\u0001{\u0001{\u0003{\u03dd\b{\u0001|\u0001|\u0001|\u0001"+
		"|\u0001|\u0003|\u03e4\b|\u0001|\u0001|\u0001}\u0001}\u0001}\u0000\u0000"+
		"~\u0000\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a"+
		"\u001c\u001e \"$&(*,.02468:<>@BDFHJLNPRTVXZ\\^`bdfhjlnprtvxz|~\u0080\u0082"+
		"\u0084\u0086\u0088\u008a\u008c\u008e\u0090\u0092\u0094\u0096\u0098\u009a"+
		"\u009c\u009e\u00a0\u00a2\u00a4\u00a6\u00a8\u00aa\u00ac\u00ae\u00b0\u00b2"+
		"\u00b4\u00b6\u00b8\u00ba\u00bc\u00be\u00c0\u00c2\u00c4\u00c6\u00c8\u00ca"+
		"\u00cc\u00ce\u00d0\u00d2\u00d4\u00d6\u00d8\u00da\u00dc\u00de\u00e0\u00e2"+
		"\u00e4\u00e6\u00e8\u00ea\u00ec\u00ee\u00f0\u00f2\u00f4\u00f6\u00f8\u00fa"+
		"\u0000!\u0001\u0000\n\r\u0001\u0000\u000e\u0011\u0001\u0000\"%\u0001\u0000"+
		"&)\u0001\u0000*-\u0001\u0000HO\u0001\u0000Pf\u0002\u0000\u00bf\u00c0\u00ce"+
		"\u00ce\u0005\u0000gl\u00b7\u00b8\u00bd\u00be\u00c2\u00c2\u00c4\u00c4\u0004"+
		"\u0000gl\u00b7\u00b8\u00bb\u00bb\u00be\u00be\u0001\u0000\u00b7\u00b7\u0001"+
		"\u0000\u00b8\u00b8\u0001\u0000gg\u0001\u0000hh\u0001\u0000ii\u0001\u0000"+
		"jj\u0001\u0000kk\u0001\u0000\u00be\u00be\u0001\u0000ll\u0001\u0000\u00bd"+
		"\u00bd\u0001\u0000\u00c4\u00c4\u0001\u0000\u00c2\u00c2\u0002\u0000mn\u00c5"+
		"\u00c8\u0004\u0000ou\u00bd\u00bd\u00c2\u00c2\u00c4\u00c4\u0001\u0000v"+
		"\u0086\u0002\u0000\u008a\u008b\u00c6\u00c7\u0001\u0000\u008a\u008c\u0003"+
		"\u0000\u001a\u001b\u0089\u0089\u008d\u009e\u0002\u0000PPUU\u0002\u0000"+
		"CC\u00a9\u00a9\u0001\u0000\u00aa\u00b1\u0001\u0000=>\u0001\u0000EG\u0413"+
		"\u0000\u00fc\u0001\u0000\u0000\u0000\u0002\u00ff\u0001\u0000\u0000\u0000"+
		"\u0004\u0103\u0001\u0000\u0000\u0000\u0006\u0108\u0001\u0000\u0000\u0000"+
		"\b\u010f\u0001\u0000\u0000\u0000\n\u0116\u0001\u0000\u0000\u0000\f\u0118"+
		"\u0001\u0000\u0000\u0000\u000e\u011a\u0001\u0000\u0000\u0000\u0010\u012f"+
		"\u0001\u0000\u0000\u0000\u0012\u0131\u0001\u0000\u0000\u0000\u0014\u0133"+
		"\u0001\u0000\u0000\u0000\u0016\u0135\u0001\u0000\u0000\u0000\u0018\u0140"+
		"\u0001\u0000\u0000\u0000\u001a\u0155\u0001\u0000\u0000\u0000\u001c\u0157"+
		"\u0001\u0000\u0000\u0000\u001e\u0159\u0001\u0000\u0000\u0000 \u015b\u0001"+
		"\u0000\u0000\u0000\"\u015f\u0001\u0000\u0000\u0000$\u0161\u0001\u0000"+
		"\u0000\u0000&\u016a\u0001\u0000\u0000\u0000(\u0177\u0001\u0000\u0000\u0000"+
		"*\u0179\u0001\u0000\u0000\u0000,\u017c\u0001\u0000\u0000\u0000.\u017e"+
		"\u0001\u0000\u0000\u00000\u0180\u0001\u0000\u0000\u00002\u0183\u0001\u0000"+
		"\u0000\u00004\u0198\u0001\u0000\u0000\u00006\u019a\u0001\u0000\u0000\u0000"+
		"8\u019c\u0001\u0000\u0000\u0000:\u01a1\u0001\u0000\u0000\u0000<\u01a4"+
		"\u0001\u0000\u0000\u0000>\u01a9\u0001\u0000\u0000\u0000@\u01ad\u0001\u0000"+
		"\u0000\u0000B\u01b1\u0001\u0000\u0000\u0000D\u01b5\u0001\u0000\u0000\u0000"+
		"F\u01b8\u0001\u0000\u0000\u0000H\u01c4\u0001\u0000\u0000\u0000J\u01c6"+
		"\u0001\u0000\u0000\u0000L\u01e2\u0001\u0000\u0000\u0000N\u01e4\u0001\u0000"+
		"\u0000\u0000P\u01e6\u0001\u0000\u0000\u0000R\u01ef\u0001\u0000\u0000\u0000"+
		"T\u01f1\u0001\u0000\u0000\u0000V\u01fa\u0001\u0000\u0000\u0000X\u01fc"+
		"\u0001\u0000\u0000\u0000Z\u0202\u0001\u0000\u0000\u0000\\\u020e\u0001"+
		"\u0000\u0000\u0000^\u0211\u0001\u0000\u0000\u0000`\u0215\u0001\u0000\u0000"+
		"\u0000b\u0217\u0001\u0000\u0000\u0000d\u0219\u0001\u0000\u0000\u0000f"+
		"\u021b\u0001\u0000\u0000\u0000h\u021d\u0001\u0000\u0000\u0000j\u0241\u0001"+
		"\u0000\u0000\u0000l\u0247\u0001\u0000\u0000\u0000n\u0259\u0001\u0000\u0000"+
		"\u0000p\u025d\u0001\u0000\u0000\u0000r\u0271\u0001\u0000\u0000\u0000t"+
		"\u0273\u0001\u0000\u0000\u0000v\u0275\u0001\u0000\u0000\u0000x\u0295\u0001"+
		"\u0000\u0000\u0000z\u0299\u0001\u0000\u0000\u0000|\u029b\u0001\u0000\u0000"+
		"\u0000~\u029d\u0001\u0000\u0000\u0000\u0080\u029f\u0001\u0000\u0000\u0000"+
		"\u0082\u02b3\u0001\u0000\u0000\u0000\u0084\u02bd\u0001\u0000\u0000\u0000"+
		"\u0086\u02bf\u0001\u0000\u0000\u0000\u0088\u02c1\u0001\u0000\u0000\u0000"+
		"\u008a\u02c8\u0001\u0000\u0000\u0000\u008c\u02cc\u0001\u0000\u0000\u0000"+
		"\u008e\u02d6\u0001\u0000\u0000\u0000\u0090\u02d8\u0001\u0000\u0000\u0000"+
		"\u0092\u02da\u0001\u0000\u0000\u0000\u0094\u02dd\u0001\u0000\u0000\u0000"+
		"\u0096\u02df\u0001\u0000\u0000\u0000\u0098\u02e1\u0001\u0000\u0000\u0000"+
		"\u009a\u02ef\u0001\u0000\u0000\u0000\u009c\u0301\u0001\u0000\u0000\u0000"+
		"\u009e\u0303\u0001\u0000\u0000\u0000\u00a0\u0308\u0001\u0000\u0000\u0000"+
		"\u00a2\u030d\u0001\u0000\u0000\u0000\u00a4\u0312\u0001\u0000\u0000\u0000"+
		"\u00a6\u032b\u0001\u0000\u0000\u0000\u00a8\u032d\u0001\u0000\u0000\u0000"+
		"\u00aa\u032f\u0001\u0000\u0000\u0000\u00ac\u0331\u0001\u0000\u0000\u0000"+
		"\u00ae\u0333\u0001\u0000\u0000\u0000\u00b0\u0335\u0001\u0000\u0000\u0000"+
		"\u00b2\u0337\u0001\u0000\u0000\u0000\u00b4\u0339\u0001\u0000\u0000\u0000"+
		"\u00b6\u034c\u0001\u0000\u0000\u0000\u00b8\u034e\u0001\u0000\u0000\u0000"+
		"\u00ba\u0350\u0001\u0000\u0000\u0000\u00bc\u0353\u0001\u0000\u0000\u0000"+
		"\u00be\u0355\u0001\u0000\u0000\u0000\u00c0\u0357\u0001\u0000\u0000\u0000"+
		"\u00c2\u0363\u0001\u0000\u0000\u0000\u00c4\u0365\u0001\u0000\u0000\u0000"+
		"\u00c6\u0368\u0001\u0000\u0000\u0000\u00c8\u036a\u0001\u0000\u0000\u0000"+
		"\u00ca\u036c\u0001\u0000\u0000\u0000\u00cc\u036f\u0001\u0000\u0000\u0000"+
		"\u00ce\u0378\u0001\u0000\u0000\u0000\u00d0\u037a\u0001\u0000\u0000\u0000"+
		"\u00d2\u037c\u0001\u0000\u0000\u0000\u00d4\u0381\u0001\u0000\u0000\u0000"+
		"\u00d6\u0383\u0001\u0000\u0000\u0000\u00d8\u0386\u0001\u0000\u0000\u0000"+
		"\u00da\u038c\u0001\u0000\u0000\u0000\u00dc\u0396\u0001\u0000\u0000\u0000"+
		"\u00de\u03a8\u0001\u0000\u0000\u0000\u00e0\u03aa\u0001\u0000\u0000\u0000"+
		"\u00e2\u03ac\u0001\u0000\u0000\u0000\u00e4\u03ae\u0001\u0000\u0000\u0000"+
		"\u00e6\u03b1\u0001\u0000\u0000\u0000\u00e8\u03c0\u0001\u0000\u0000\u0000"+
		"\u00ea\u03c2\u0001\u0000\u0000\u0000\u00ec\u03c7\u0001\u0000\u0000\u0000"+
		"\u00ee\u03ca\u0001\u0000\u0000\u0000\u00f0\u03cc\u0001\u0000\u0000\u0000"+
		"\u00f2\u03ce\u0001\u0000\u0000\u0000\u00f4\u03d3\u0001\u0000\u0000\u0000"+
		"\u00f6\u03d6\u0001\u0000\u0000\u0000\u00f8\u03e3\u0001\u0000\u0000\u0000"+
		"\u00fa\u03e7\u0001\u0000\u0000\u0000\u00fc\u00fd\u0005\u0001\u0000\u0000"+
		"\u00fd\u0001\u0001\u0000\u0000\u0000\u00fe\u0100\u0005\u00cd\u0000\u0000"+
		"\u00ff\u00fe\u0001\u0000\u0000\u0000\u0100\u0101\u0001\u0000\u0000\u0000"+
		"\u0101\u00ff\u0001\u0000\u0000\u0000\u0101\u0102\u0001\u0000\u0000\u0000"+
		"\u0102\u0003\u0001\u0000\u0000\u0000\u0103\u0104\u0003\u0002\u0001\u0000"+
		"\u0104\u0105\u0005\u00bb\u0000\u0000\u0105\u0005\u0001\u0000\u0000\u0000"+
		"\u0106\u0109\u0003\b\u0004\u0000\u0107\u0109\u0003\n\u0005\u0000\u0108"+
		"\u0106\u0001\u0000\u0000\u0000\u0108\u0107\u0001\u0000\u0000\u0000\u0109"+
		"\u0007\u0001\u0000\u0000\u0000\u010a\u0110\u0005\u0002\u0000\u0000\u010b"+
		"\u0110\u0005\u0003\u0000\u0000\u010c\u0110\u0005\u0004\u0000\u0000\u010d"+
		"\u0110\u0005\u0005\u0000\u0000\u010e\u0110\u0003\f\u0006\u0000\u010f\u010a"+
		"\u0001\u0000\u0000\u0000\u010f\u010b\u0001\u0000\u0000\u0000\u010f\u010c"+
		"\u0001\u0000\u0000\u0000\u010f\u010d\u0001\u0000\u0000\u0000\u010f\u010e"+
		"\u0001\u0000\u0000\u0000\u0110\t\u0001\u0000\u0000\u0000\u0111\u0117\u0005"+
		"\u0006\u0000\u0000\u0112\u0117\u0005\u0007\u0000\u0000\u0113\u0117\u0005"+
		"\b\u0000\u0000\u0114\u0117\u0005\t\u0000\u0000\u0115\u0117\u0003\u000e"+
		"\u0007\u0000\u0116\u0111\u0001\u0000\u0000\u0000\u0116\u0112\u0001\u0000"+
		"\u0000\u0000\u0116\u0113\u0001\u0000\u0000\u0000\u0116\u0114\u0001\u0000"+
		"\u0000\u0000\u0116\u0115\u0001\u0000\u0000\u0000\u0117\u000b\u0001\u0000"+
		"\u0000\u0000\u0118\u0119\u0007\u0000\u0000\u0000\u0119\r\u0001\u0000\u0000"+
		"\u0000\u011a\u011b\u0007\u0001\u0000\u0000\u011b\u000f\u0001\u0000\u0000"+
		"\u0000\u011c\u0130\u0005\u0012\u0000\u0000\u011d\u0130\u0005\u0013\u0000"+
		"\u0000\u011e\u0130\u0005\u0014\u0000\u0000\u011f\u0130\u0005\u0015\u0000"+
		"\u0000\u0120\u0130\u0005\u0016\u0000\u0000\u0121\u0130\u0005\u0017\u0000"+
		"\u0000\u0122\u0130\u0005\u0018\u0000\u0000\u0123\u0130\u0005\u0019\u0000"+
		"\u0000\u0124\u0130\u0005\u001a\u0000\u0000\u0125\u0130\u0005\u001b\u0000"+
		"\u0000\u0126\u0130\u0005\u001c\u0000\u0000\u0127\u0130\u0005\u001d\u0000"+
		"\u0000\u0128\u0130\u0005\u001e\u0000\u0000\u0129\u0130\u0005\u001f\u0000"+
		"\u0000\u012a\u0130\u0005 \u0000\u0000\u012b\u0130\u0005!\u0000\u0000\u012c"+
		"\u0130\u0003\u0012\t\u0000\u012d\u0130\u0003\u0014\n\u0000\u012e\u0130"+
		"\u0003\u0016\u000b\u0000\u012f\u011c\u0001\u0000\u0000\u0000\u012f\u011d"+
		"\u0001\u0000\u0000\u0000\u012f\u011e\u0001\u0000\u0000\u0000\u012f\u011f"+
		"\u0001\u0000\u0000\u0000\u012f\u0120\u0001\u0000\u0000\u0000\u012f\u0121"+
		"\u0001\u0000\u0000\u0000\u012f\u0122\u0001\u0000\u0000\u0000\u012f\u0123"+
		"\u0001\u0000\u0000\u0000\u012f\u0124\u0001\u0000\u0000\u0000\u012f\u0125"+
		"\u0001\u0000\u0000\u0000\u012f\u0126\u0001\u0000\u0000\u0000\u012f\u0127"+
		"\u0001\u0000\u0000\u0000\u012f\u0128\u0001\u0000\u0000\u0000\u012f\u0129"+
		"\u0001\u0000\u0000\u0000\u012f\u012a\u0001\u0000\u0000\u0000\u012f\u012b"+
		"\u0001\u0000\u0000\u0000\u012f\u012c\u0001\u0000\u0000\u0000\u012f\u012d"+
		"\u0001\u0000\u0000\u0000\u012f\u012e\u0001\u0000\u0000\u0000\u0130\u0011"+
		"\u0001\u0000\u0000\u0000\u0131\u0132\u0007\u0002\u0000\u0000\u0132\u0013"+
		"\u0001\u0000\u0000\u0000\u0133\u0134\u0007\u0003\u0000\u0000\u0134\u0015"+
		"\u0001\u0000\u0000\u0000\u0135\u0136\u0007\u0004\u0000\u0000\u0136\u0017"+
		"\u0001\u0000\u0000\u0000\u0137\u0141\u0001\u0000\u0000\u0000\u0138\u0141"+
		"\u0005.\u0000\u0000\u0139\u0141\u0005/\u0000\u0000\u013a\u0141\u00050"+
		"\u0000\u0000\u013b\u0141\u00051\u0000\u0000\u013c\u0141\u00052\u0000\u0000"+
		"\u013d\u0141\u00053\u0000\u0000\u013e\u0141\u00054\u0000\u0000\u013f\u0141"+
		"\u00055\u0000\u0000\u0140\u0137\u0001\u0000\u0000\u0000\u0140\u0138\u0001"+
		"\u0000\u0000\u0000\u0140\u0139\u0001\u0000\u0000\u0000\u0140\u013a\u0001"+
		"\u0000\u0000\u0000\u0140\u013b\u0001\u0000\u0000\u0000\u0140\u013c\u0001"+
		"\u0000\u0000\u0000\u0140\u013d\u0001\u0000\u0000\u0000\u0140\u013e\u0001"+
		"\u0000\u0000\u0000\u0140\u013f\u0001\u0000\u0000\u0000\u0141\u0019\u0001"+
		"\u0000\u0000\u0000\u0142\u0156\u00056\u0000\u0000\u0143\u0156\u00057\u0000"+
		"\u0000\u0144\u0156\u00058\u0000\u0000\u0145\u0156\u00059\u0000\u0000\u0146"+
		"\u0156\u0005:\u0000\u0000\u0147\u0156\u0005;\u0000\u0000\u0148\u0156\u0005"+
		"<\u0000\u0000\u0149\u0156\u0005=\u0000\u0000\u014a\u0156\u0005>\u0000"+
		"\u0000\u014b\u0156\u0005?\u0000\u0000\u014c\u0156\u0005@\u0000\u0000\u014d"+
		"\u0156\u0005A\u0000\u0000\u014e\u0156\u0005B\u0000\u0000\u014f\u0156\u0005"+
		"C\u0000\u0000\u0150\u0156\u0005D\u0000\u0000\u0151\u0156\u0005E\u0000"+
		"\u0000\u0152\u0156\u0005F\u0000\u0000\u0153\u0156\u0005G\u0000\u0000\u0154"+
		"\u0156\u0003\u001c\u000e\u0000\u0155\u0142\u0001\u0000\u0000\u0000\u0155"+
		"\u0143\u0001\u0000\u0000\u0000\u0155\u0144\u0001\u0000\u0000\u0000\u0155"+
		"\u0145\u0001\u0000\u0000\u0000\u0155\u0146\u0001\u0000\u0000\u0000\u0155"+
		"\u0147\u0001\u0000\u0000\u0000\u0155\u0148\u0001\u0000\u0000\u0000\u0155"+
		"\u0149\u0001\u0000\u0000\u0000\u0155\u014a\u0001\u0000\u0000\u0000\u0155"+
		"\u014b\u0001\u0000\u0000\u0000\u0155\u014c\u0001\u0000\u0000\u0000\u0155"+
		"\u014d\u0001\u0000\u0000\u0000\u0155\u014e\u0001\u0000\u0000\u0000\u0155"+
		"\u014f\u0001\u0000\u0000\u0000\u0155\u0150\u0001\u0000\u0000\u0000\u0155"+
		"\u0151\u0001\u0000\u0000\u0000\u0155\u0152\u0001\u0000\u0000\u0000\u0155"+
		"\u0153\u0001\u0000\u0000\u0000\u0155\u0154\u0001\u0000\u0000\u0000\u0156"+
		"\u001b\u0001\u0000\u0000\u0000\u0157\u0158\u0007\u0005\u0000\u0000\u0158"+
		"\u001d\u0001\u0000\u0000\u0000\u0159\u015a\u0007\u0006\u0000\u0000\u015a"+
		"\u001f\u0001\u0000\u0000\u0000\u015b\u015c\u0007\u0007\u0000\u0000\u015c"+
		"!\u0001\u0000\u0000\u0000\u015d\u0160\u0003$\u0012\u0000\u015e\u0160\u0003"+
		"&\u0013\u0000\u015f\u015d\u0001\u0000\u0000\u0000\u015f\u015e\u0001\u0000"+
		"\u0000\u0000\u0160#\u0001\u0000\u0000\u0000\u0161\u0165\u0005\u00c3\u0000"+
		"\u0000\u0162\u0164\u0005\u00cd\u0000\u0000\u0163\u0162\u0001\u0000\u0000"+
		"\u0000\u0164\u0167\u0001\u0000\u0000\u0000\u0165\u0163\u0001\u0000\u0000"+
		"\u0000\u0165\u0166\u0001\u0000\u0000\u0000\u0166\u0168\u0001\u0000\u0000"+
		"\u0000\u0167\u0165\u0001\u0000\u0000\u0000\u0168\u0169\u0005\u00c1\u0000"+
		"\u0000\u0169%\u0001\u0000\u0000\u0000\u016a\u016e\u0005\u00cb\u0000\u0000"+
		"\u016b\u016d\u0005\u00cd\u0000\u0000\u016c\u016b\u0001\u0000\u0000\u0000"+
		"\u016d\u0170\u0001\u0000\u0000\u0000\u016e\u016c\u0001\u0000\u0000\u0000"+
		"\u016e\u016f\u0001\u0000\u0000\u0000\u016f\u0171\u0001\u0000\u0000\u0000"+
		"\u0170\u016e\u0001\u0000\u0000\u0000\u0171\u0172\u0005\u00cc\u0000\u0000"+
		"\u0172\'\u0001\u0000\u0000\u0000\u0173\u0178\u0003*\u0015\u0000\u0174"+
		"\u0178\u0003\u0004\u0002\u0000\u0175\u0178\u00032\u0019\u0000\u0176\u0178"+
		"\u0003F#\u0000\u0177\u0173\u0001\u0000\u0000\u0000\u0177\u0174\u0001\u0000"+
		"\u0000\u0000\u0177\u0175\u0001\u0000\u0000\u0000\u0177\u0176\u0001\u0000"+
		"\u0000\u0000\u0178)\u0001\u0000\u0000\u0000\u0179\u017a\u0003.\u0017\u0000"+
		"\u017a\u017b\u0003,\u0016\u0000\u017b+\u0001\u0000\u0000\u0000\u017c\u017d"+
		"\u0007\b\u0000\u0000\u017d-\u0001\u0000\u0000\u0000\u017e\u017f\u0007"+
		"\t\u0000\u0000\u017f/\u0001\u0000\u0000\u0000\u0180\u0181\u0003\u00fa"+
		"}\u0000\u0181\u0182\u00034\u001a\u0000\u01821\u0001\u0000\u0000\u0000"+
		"\u0183\u0187\u0005\u00c9\u0000\u0000\u0184\u0186\u0005\u00cd\u0000\u0000"+
		"\u0185\u0184\u0001\u0000\u0000\u0000\u0186\u0189\u0001\u0000\u0000\u0000"+
		"\u0187\u0185\u0001\u0000\u0000\u0000\u0187\u0188\u0001\u0000\u0000\u0000"+
		"\u0188\u018a\u0001\u0000\u0000\u0000\u0189\u0187\u0001\u0000\u0000\u0000"+
		"\u018a\u018b\u0005\u00ca\u0000\u0000\u018b3\u0001\u0000\u0000\u0000\u018c"+
		"\u0199\b\n\u0000\u0000\u018d\u0199\b\u000b\u0000\u0000\u018e\u0199\b\f"+
		"\u0000\u0000\u018f\u0199\b\r\u0000\u0000\u0190\u0199\b\u000e\u0000\u0000"+
		"\u0191\u0199\b\u000f\u0000\u0000\u0192\u0199\b\u0010\u0000\u0000\u0193"+
		"\u0199\b\u0011\u0000\u0000\u0194\u0199\b\u0012\u0000\u0000\u0195\u0199"+
		"\b\u0013\u0000\u0000\u0196\u0199\b\u0014\u0000\u0000\u0197\u0199\b\u0015"+
		"\u0000\u0000\u0198\u018c\u0001\u0000\u0000\u0000\u0198\u018d\u0001\u0000"+
		"\u0000\u0000\u0198\u018e\u0001\u0000\u0000\u0000\u0198\u018f\u0001\u0000"+
		"\u0000\u0000\u0198\u0190\u0001\u0000\u0000\u0000\u0198\u0191\u0001\u0000"+
		"\u0000\u0000\u0198\u0192\u0001\u0000\u0000\u0000\u0198\u0193\u0001\u0000"+
		"\u0000\u0000\u0198\u0194\u0001\u0000\u0000\u0000\u0198\u0195\u0001\u0000"+
		"\u0000\u0000\u0198\u0196\u0001\u0000\u0000\u0000\u0198\u0197\u0001\u0000"+
		"\u0000\u0000\u01995\u0001\u0000\u0000\u0000\u019a\u019b\u0007\u0016\u0000"+
		"\u0000\u019b7\u0001\u0000\u0000\u0000\u019c\u019d\u0007\u0017\u0000\u0000"+
		"\u019d9\u0001\u0000\u0000\u0000\u019e\u01a2\u0003 \u0010\u0000\u019f\u01a2"+
		"\u0003\"\u0011\u0000\u01a0\u01a2\u00032\u0019\u0000\u01a1\u019e\u0001"+
		"\u0000\u0000\u0000\u01a1\u019f\u0001\u0000\u0000\u0000\u01a1\u01a0\u0001"+
		"\u0000\u0000\u0000\u01a2;\u0001\u0000\u0000\u0000\u01a3\u01a5\u0005\u00b8"+
		"\u0000\u0000\u01a4\u01a3\u0001\u0000\u0000\u0000\u01a5\u01a6\u0001\u0000"+
		"\u0000\u0000\u01a6\u01a4\u0001\u0000\u0000\u0000\u01a6\u01a7\u0001\u0000"+
		"\u0000\u0000\u01a7=\u0001\u0000\u0000\u0000\u01a8\u01aa\u0005\u00bd\u0000"+
		"\u0000\u01a9\u01a8\u0001\u0000\u0000\u0000\u01a9\u01aa\u0001\u0000\u0000"+
		"\u0000\u01aa\u01ab\u0001\u0000\u0000\u0000\u01ab\u01ac\u0003<\u001e\u0000"+
		"\u01ac?\u0001\u0000\u0000\u0000\u01ad\u01ae\u0003>\u001f\u0000\u01ae\u01af"+
		"\u0005\u00c2\u0000\u0000\u01af\u01b0\u0003<\u001e\u0000\u01b0A\u0001\u0000"+
		"\u0000\u0000\u01b1\u01b2\u0003>\u001f\u0000\u01b2\u01b3\u0005\u00c4\u0000"+
		"\u0000\u01b3\u01b4\u0003@ \u0000\u01b4C\u0001\u0000\u0000\u0000\u01b5"+
		"\u01b6\u0005\u00be\u0000\u0000\u01b6\u01b7\u0003<\u001e\u0000\u01b7E\u0001"+
		"\u0000\u0000\u0000\u01b8\u01bc\u0005\u00bc\u0000\u0000\u01b9\u01bb\u0005"+
		"\u00cd\u0000\u0000\u01ba\u01b9\u0001\u0000\u0000\u0000\u01bb\u01be\u0001"+
		"\u0000\u0000\u0000\u01bc\u01ba\u0001\u0000\u0000\u0000\u01bc\u01bd\u0001"+
		"\u0000\u0000\u0000\u01bd\u01bf\u0001\u0000\u0000\u0000\u01be\u01bc\u0001"+
		"\u0000\u0000\u0000\u01bf\u01c0\u0005\u00bc\u0000\u0000\u01c0G\u0001\u0000"+
		"\u0000\u0000\u01c1\u01c5\u0003L&\u0000\u01c2\u01c5\u0003j5\u0000\u01c3"+
		"\u01c5\u0003l6\u0000\u01c4\u01c1\u0001\u0000\u0000\u0000\u01c4\u01c2\u0001"+
		"\u0000\u0000\u0000\u01c4\u01c3\u0001\u0000\u0000\u0000\u01c5I\u0001\u0000"+
		"\u0000\u0000\u01c6\u01c7\u0007\u0018\u0000\u0000\u01c7K\u0001\u0000\u0000"+
		"\u0000\u01c8\u01c9\u0003\n\u0005\u0000\u01c9\u01ca\u0003N\'\u0000\u01ca"+
		"\u01cb\u0003d2\u0000\u01cb\u01cc\u0003\n\u0005\u0000\u01cc\u01ce\u0003"+
		"P(\u0000\u01cd\u01cf\u0003R)\u0000\u01ce\u01cd\u0001\u0000\u0000\u0000"+
		"\u01ce\u01cf\u0001\u0000\u0000\u0000\u01cf\u01d0\u0001\u0000\u0000\u0000"+
		"\u01d0\u01d1\u0005\u00c5\u0000\u0000\u01d1\u01e3\u0001\u0000\u0000\u0000"+
		"\u01d2\u01d3\u0003\n\u0005\u0000\u01d3\u01d4\u0003N\'\u0000\u01d4\u01d5"+
		"\u0003d2\u0000\u01d5\u01d6\u0003\n\u0005\u0000\u01d6\u01d7\u0003f3\u0000"+
		"\u01d7\u01d8\u0003\u00aeW\u0000\u01d8\u01d9\u0003T*\u0000\u01d9\u01da"+
		"\u0005\u00c5\u0000\u0000\u01da\u01e3\u0001\u0000\u0000\u0000\u01db\u01dc"+
		"\u0003\n\u0005\u0000\u01dc\u01dd\u0003N\'\u0000\u01dd\u01de\u0003d2\u0000"+
		"\u01de\u01df\u0003<\u001e\u0000\u01df\u01e0\u0003P(\u0000\u01e0\u01e1"+
		"\u0005\u00c5\u0000\u0000\u01e1\u01e3\u0001\u0000\u0000\u0000\u01e2\u01c8"+
		"\u0001\u0000\u0000\u0000\u01e2\u01d2\u0001\u0000\u0000\u0000\u01e2\u01db"+
		"\u0001\u0000\u0000\u0000\u01e3M\u0001\u0000\u0000\u0000\u01e4\u01e5\u0003"+
		"\u0002\u0001\u0000\u01e5O\u0001\u0000\u0000\u0000\u01e6\u01e7\u0003N\'"+
		"\u0000\u01e7Q\u0001\u0000\u0000\u0000\u01e8\u01e9\u0003z=\u0000\u01e9"+
		"\u01ea\u0003\n\u0005\u0000\u01ea\u01eb\u0003P(\u0000\u01eb\u01f0\u0001"+
		"\u0000\u0000\u0000\u01ec\u01ed\u0003\u00aeW\u0000\u01ed\u01ee\u0003T*"+
		"\u0000\u01ee\u01f0\u0001\u0000\u0000\u0000\u01ef\u01e8\u0001\u0000\u0000"+
		"\u0000\u01ef\u01ec\u0001\u0000\u0000\u0000\u01f0S\u0001\u0000\u0000\u0000"+
		"\u01f1\u01f7\u0003Z-\u0000\u01f2\u01f3\u0003^/\u0000\u01f3\u01f4\u0003"+
		"Z-\u0000\u01f4\u01f6\u0001\u0000\u0000\u0000\u01f5\u01f2\u0001\u0000\u0000"+
		"\u0000\u01f6\u01f9\u0001\u0000\u0000\u0000\u01f7\u01f5\u0001\u0000\u0000"+
		"\u0000\u01f7\u01f8\u0001\u0000\u0000\u0000\u01f8U\u0001\u0000\u0000\u0000"+
		"\u01f9\u01f7\u0001\u0000\u0000\u0000\u01fa\u01fb\u0005\u0087\u0000\u0000"+
		"\u01fbW\u0001\u0000\u0000\u0000\u01fc\u01fd\u0005\u0088\u0000\u0000\u01fd"+
		"Y\u0001\u0000\u0000\u0000\u01fe\u0203\u0003\n\u0005\u0000\u01ff\u0200"+
		"\u0003<\u001e\u0000\u0200\u0201\u0003V+\u0000\u0201\u0203\u0001\u0000"+
		"\u0000\u0000\u0202\u01fe\u0001\u0000\u0000\u0000\u0202\u01ff\u0001\u0000"+
		"\u0000\u0000\u0203\u020c\u0001\u0000\u0000\u0000\u0204\u0205\u0003\u001c"+
		"\u000e\u0000\u0205\u0206\u0003N\'\u0000\u0206\u020d\u0001\u0000\u0000"+
		"\u0000\u0207\u0208\u0005\u0089\u0000\u0000\u0208\u0209\u0003\b\u0004\u0000"+
		"\u0209\u020a\u0003N\'\u0000\u020a\u020d\u0001\u0000\u0000\u0000\u020b"+
		"\u020d\u0003X,\u0000\u020c\u0204\u0001\u0000\u0000\u0000\u020c\u0207\u0001"+
		"\u0000\u0000\u0000\u020c\u020b\u0001\u0000\u0000\u0000\u020c\u020d\u0001"+
		"\u0000\u0000\u0000\u020d[\u0001\u0000\u0000\u0000\u020e\u020f\u0007\u0019"+
		"\u0000\u0000\u020f]\u0001\u0000\u0000\u0000\u0210\u0212\u0003\\.\u0000"+
		"\u0211\u0210\u0001\u0000\u0000\u0000\u0212\u0213\u0001\u0000\u0000\u0000"+
		"\u0213\u0211\u0001\u0000\u0000\u0000\u0213\u0214\u0001\u0000\u0000\u0000"+
		"\u0214_\u0001\u0000\u0000\u0000\u0215\u0216\u0007\u001a\u0000\u0000\u0216"+
		"a\u0001\u0000\u0000\u0000\u0217\u0218\u0007\u001b\u0000\u0000\u0218c\u0001"+
		"\u0000\u0000\u0000\u0219\u021a\u0007\u001c\u0000\u0000\u021ae\u0001\u0000"+
		"\u0000\u0000\u021b\u021c\u0005|\u0000\u0000\u021cg\u0001\u0000\u0000\u0000"+
		"\u021d\u021e\u0005.\u0000\u0000\u021ei\u0001\u0000\u0000\u0000\u021f\u0220"+
		"\u0003\b\u0004\u0000\u0220\u0221\u0003N\'\u0000\u0221\u0222\u0003d2\u0000"+
		"\u0222\u0223\u0003\n\u0005\u0000\u0223\u0225\u0003P(\u0000\u0224\u0226"+
		"\u0003R)\u0000\u0225\u0224\u0001\u0000\u0000\u0000\u0225\u0226\u0001\u0000"+
		"\u0000\u0000\u0226\u0227\u0001\u0000\u0000\u0000\u0227\u0228\u0005\u00c5"+
		"\u0000\u0000\u0228\u0242\u0001\u0000\u0000\u0000\u0229\u022a\u0003\b\u0004"+
		"\u0000\u022a\u022b\u0003N\'\u0000\u022b\u022c\u0003d2\u0000\u022c\u022d"+
		"\u0003\n\u0005\u0000\u022d\u022e\u0003f3\u0000\u022e\u022f\u0003\u00ae"+
		"W\u0000\u022f\u0230\u0003T*\u0000\u0230\u0231\u0005\u00c5\u0000\u0000"+
		"\u0231\u0242\u0001\u0000\u0000\u0000\u0232\u0233\u0003\b\u0004\u0000\u0233"+
		"\u0234\u0003N\'\u0000\u0234\u0235\u0003d2\u0000\u0235\u0236\u0003\n\u0005"+
		"\u0000\u0236\u0237\u0003P(\u0000\u0237\u0238\u0003h4\u0000\u0238\u0239"+
		"\u0003\u00d4j\u0000\u0239\u023a\u0005\u00c5\u0000\u0000\u023a\u023b\u0003"+
		"\b\u0004\u0000\u023b\u023c\u0003N\'\u0000\u023c\u023d\u0003d2\u0000\u023d"+
		"\u023e\u0003\u00d4j\u0000\u023e\u023f\u0005\u00c5\u0000\u0000\u023f\u0242"+
		"\u0001\u0000\u0000\u0000\u0240\u0242\u0001\u0000\u0000\u0000\u0241\u021f"+
		"\u0001\u0000\u0000\u0000\u0241\u0229\u0001\u0000\u0000\u0000\u0241\u0232"+
		"\u0001\u0000\u0000\u0000\u0241\u0240\u0001\u0000\u0000\u0000\u0242k\u0001"+
		"\u0000\u0000\u0000\u0243\u0248\u0003n7\u0000\u0244\u0248\u0003r9\u0000"+
		"\u0245\u0248\u0003x<\u0000\u0246\u0248\u0003\u0082A\u0000\u0247\u0243"+
		"\u0001\u0000\u0000\u0000\u0247\u0244\u0001\u0000\u0000\u0000\u0247\u0245"+
		"\u0001\u0000\u0000\u0000\u0247\u0246\u0001\u0000\u0000\u0000\u0248m\u0001"+
		"\u0000\u0000\u0000\u0249\u024b\u0003~?\u0000\u024a\u0249\u0001\u0000\u0000"+
		"\u0000\u024a\u024b\u0001\u0000\u0000\u0000\u024b\u024c\u0001\u0000\u0000"+
		"\u0000\u024c\u024d\u0003z=\u0000\u024d\u024e\u0003|>\u0000\u024e\u024f"+
		"\u0003\u0084B\u0000\u024f\u0250\u0005\u00c7\u0000\u0000\u0250\u025a\u0001"+
		"\u0000\u0000\u0000\u0251\u0253\u0003~?\u0000\u0252\u0251\u0001\u0000\u0000"+
		"\u0000\u0252\u0253\u0001\u0000\u0000\u0000\u0253\u0254\u0001\u0000\u0000"+
		"\u0000\u0254\u0255\u0003z=\u0000\u0255\u0256\u0003|>\u0000\u0256\u0257"+
		"\u0003\u0084B\u0000\u0257\u0258\u0005\u00c8\u0000\u0000\u0258\u025a\u0001"+
		"\u0000\u0000\u0000\u0259\u024a\u0001\u0000\u0000\u0000\u0259\u0252\u0001"+
		"\u0000\u0000\u0000\u025a\u025b\u0001\u0000\u0000\u0000\u025b\u025c\u0003"+
		"\u008cF\u0000\u025co\u0001\u0000\u0000\u0000\u025d\u025e\u0005\u009f\u0000"+
		"\u0000\u025eq\u0001\u0000\u0000\u0000\u025f\u0261\u0003~?\u0000\u0260"+
		"\u025f\u0001\u0000\u0000\u0000\u0260\u0261\u0001\u0000\u0000\u0000\u0261"+
		"\u0262\u0001\u0000\u0000\u0000\u0262\u0263\u0003z=\u0000\u0263\u0264\u0003"+
		"|>\u0000\u0264\u0265\u0003p8\u0000\u0265\u0266\u0003\u0084B\u0000\u0266"+
		"\u0267\u0005\u00c7\u0000\u0000\u0267\u0272\u0001\u0000\u0000\u0000\u0268"+
		"\u026a\u0003~?\u0000\u0269\u0268\u0001\u0000\u0000\u0000\u0269\u026a\u0001"+
		"\u0000\u0000\u0000\u026a\u026b\u0001\u0000\u0000\u0000\u026b\u026c\u0003"+
		"z=\u0000\u026c\u026d\u0003|>\u0000\u026d\u026e\u0003p8\u0000\u026e\u026f"+
		"\u0003\u0084B\u0000\u026f\u0270\u0005\u00c8\u0000\u0000\u0270\u0272\u0001"+
		"\u0000\u0000\u0000\u0271\u0260\u0001\u0000\u0000\u0000\u0271\u0269\u0001"+
		"\u0000\u0000\u0000\u0272s\u0001\u0000\u0000\u0000\u0273\u0274\u0005\u00a0"+
		"\u0000\u0000\u0274u\u0001\u0000\u0000\u0000\u0275\u0276\u0005\u00a1\u0000"+
		"\u0000\u0276w\u0001\u0000\u0000\u0000\u0277\u0279\u0003t:\u0000\u0278"+
		"\u0277\u0001\u0000\u0000\u0000\u0278\u0279\u0001\u0000\u0000\u0000\u0279"+
		"\u027a\u0001\u0000\u0000\u0000\u027a\u027b\u0003z=\u0000\u027b\u027c\u0003"+
		"|>\u0000\u027c\u027d\u0003v;\u0000\u027d\u027e\u0003\b\u0004\u0000\u027e"+
		"\u027f\u0003P(\u0000\u027f\u0280\u0003\u0012\t\u0000\u0280\u0281\u0003"+
		"N\'\u0000\u0281\u0282\u0003z=\u0000\u0282\u0283\u0003\n\u0005\u0000\u0283"+
		"\u0284\u0003P(\u0000\u0284\u0285\u0005\u00c7\u0000\u0000\u0285\u0296\u0001"+
		"\u0000\u0000\u0000\u0286\u0288\u0003t:\u0000\u0287\u0286\u0001\u0000\u0000"+
		"\u0000\u0287\u0288\u0001\u0000\u0000\u0000\u0288\u0289\u0001\u0000\u0000"+
		"\u0000\u0289\u028a\u0003z=\u0000\u028a\u028b\u0003|>\u0000\u028b\u028c"+
		"\u0003v;\u0000\u028c\u028d\u0003\b\u0004\u0000\u028d\u028e\u0003P(\u0000"+
		"\u028e\u028f\u0003\u0012\t\u0000\u028f\u0290\u0003N\'\u0000\u0290\u0291"+
		"\u0003z=\u0000\u0291\u0292\u0003\n\u0005\u0000\u0292\u0293\u0003P(\u0000"+
		"\u0293\u0294\u0005\u00c8\u0000\u0000\u0294\u0296\u0001\u0000\u0000\u0000"+
		"\u0295\u0278\u0001\u0000\u0000\u0000\u0295\u0287\u0001\u0000\u0000\u0000"+
		"\u0296\u0297\u0001\u0000\u0000\u0000\u0297\u0298\u0003\u008cF\u0000\u0298"+
		"y\u0001\u0000\u0000\u0000\u0299\u029a\u0005\u00a2\u0000\u0000\u029a{\u0001"+
		"\u0000\u0000\u0000\u029b\u029c\u0005\u00a3\u0000\u0000\u029c}\u0001\u0000"+
		"\u0000\u0000\u029d\u029e\u0005\u00a4\u0000\u0000\u029e\u007f\u0001\u0000"+
		"\u0000\u0000\u029f\u02a0\u0005\u00a5\u0000\u0000\u02a0\u0081\u0001\u0000"+
		"\u0000\u0000\u02a1\u02a3\u0003~?\u0000\u02a2\u02a1\u0001\u0000\u0000\u0000"+
		"\u02a2\u02a3\u0001\u0000\u0000\u0000\u02a3\u02a4\u0001\u0000\u0000\u0000"+
		"\u02a4\u02a5\u0003z=\u0000\u02a5\u02a6\u0003|>\u0000\u02a6\u02a7\u0003"+
		"\u0080@\u0000\u02a7\u02a8\u0003\u0084B\u0000\u02a8\u02a9\u0005\u00c7\u0000"+
		"\u0000\u02a9\u02b4\u0001\u0000\u0000\u0000\u02aa\u02ac\u0003~?\u0000\u02ab"+
		"\u02aa\u0001\u0000\u0000\u0000\u02ab\u02ac\u0001\u0000\u0000\u0000\u02ac"+
		"\u02ad\u0001\u0000\u0000\u0000\u02ad\u02ae\u0003z=\u0000\u02ae\u02af\u0003"+
		"|>\u0000\u02af\u02b0\u0003\u0080@\u0000\u02b0\u02b1\u0003\u0084B\u0000"+
		"\u02b1\u02b2\u0005\u00c8\u0000\u0000\u02b2\u02b4\u0001\u0000\u0000\u0000"+
		"\u02b3\u02a2\u0001\u0000\u0000\u0000\u02b3\u02ab\u0001\u0000\u0000\u0000"+
		"\u02b4\u02b5\u0001\u0000\u0000\u0000\u02b5\u02b6\u0003\u008cF\u0000\u02b6"+
		"\u0083\u0001\u0000\u0000\u0000\u02b7\u02be\u0003\u0086C\u0000\u02b8\u02be"+
		"\u0003\u0088D\u0000\u02b9\u02bb\u0003\u008aE\u0000\u02ba\u02bc\u00032"+
		"\u0019\u0000\u02bb\u02ba\u0001\u0000\u0000\u0000\u02bb\u02bc\u0001\u0000"+
		"\u0000\u0000\u02bc\u02be\u0001\u0000\u0000\u0000\u02bd\u02b7\u0001\u0000"+
		"\u0000\u0000\u02bd\u02b8\u0001\u0000\u0000\u0000\u02bd\u02b9\u0001\u0000"+
		"\u0000\u0000\u02be\u0085\u0001\u0000\u0000\u0000\u02bf\u02c0\u0003\u0002"+
		"\u0001\u0000\u02c0\u0087\u0001\u0000\u0000\u0000\u02c1\u02c2\u0003\n\u0005"+
		"\u0000\u02c2\u02c6\u0003N\'\u0000\u02c3\u02c4\u0003\u001c\u000e\u0000"+
		"\u02c4\u02c5\u0003N\'\u0000\u02c5\u02c7\u0001\u0000\u0000\u0000\u02c6"+
		"\u02c3\u0001\u0000\u0000\u0000\u02c6\u02c7\u0001\u0000\u0000\u0000\u02c7"+
		"\u0089\u0001\u0000\u0000\u0000\u02c8\u02c9\u0003\b\u0004\u0000\u02c9\u02ca"+
		"\u0003N\'\u0000\u02ca\u008b\u0001\u0000\u0000\u0000\u02cb\u02cd\u0003"+
		"\u008eG\u0000\u02cc\u02cb\u0001\u0000\u0000\u0000\u02cd\u02ce\u0001\u0000"+
		"\u0000\u0000\u02ce\u02cc\u0001\u0000\u0000\u0000\u02ce\u02cf\u0001\u0000"+
		"\u0000\u0000\u02cf\u008d\u0001\u0000\u0000\u0000\u02d0\u02d7\u0003\u0092"+
		"I\u0000\u02d1\u02d7\u0003\u0094J\u0000\u02d2\u02d7\u0003\u0098L\u0000"+
		"\u02d3\u02d4\u0003\u009cN\u0000\u02d4\u02d5\u0005\u00c6\u0000\u0000\u02d5"+
		"\u02d7\u0001\u0000\u0000\u0000\u02d6\u02d0\u0001\u0000\u0000\u0000\u02d6"+
		"\u02d1\u0001\u0000\u0000\u0000\u02d6\u02d2\u0001\u0000\u0000\u0000\u02d6"+
		"\u02d3\u0001\u0000\u0000\u0000\u02d7\u008f\u0001\u0000\u0000\u0000\u02d8"+
		"\u02d9\u0005;\u0000\u0000\u02d9\u0091\u0001\u0000\u0000\u0000\u02da\u02db"+
		"\u0003\u0090H\u0000\u02db\u02dc\u0003\u0088D\u0000\u02dc\u0093\u0001\u0000"+
		"\u0000\u0000\u02dd\u02de\u0005\u00a6\u0000\u0000\u02de\u0095\u0001\u0000"+
		"\u0000\u0000\u02df\u02e0\u00056\u0000\u0000\u02e0\u0097\u0001\u0000\u0000"+
		"\u0000\u02e1\u02e2\u0003\u0096K\u0000\u02e2\u02e3\u0003\u009aM\u0000\u02e3"+
		"\u02e4\u0005\u00c6\u0000\u0000\u02e4\u02e9\u0003\u009cN\u0000\u02e5\u02e6"+
		"\u0005\u00c7\u0000\u0000\u02e6\u02e8\u0003\u009cN\u0000\u02e7\u02e5\u0001"+
		"\u0000\u0000\u0000\u02e8\u02eb\u0001\u0000\u0000\u0000\u02e9\u02e7\u0001"+
		"\u0000\u0000\u0000\u02e9\u02ea\u0001\u0000\u0000\u0000\u02ea\u02ec\u0001"+
		"\u0000\u0000\u0000\u02eb\u02e9\u0001\u0000\u0000\u0000\u02ec\u02ed\u0005"+
		"\u00c5\u0000\u0000\u02ed\u0099\u0001\u0000\u0000\u0000\u02ee\u02f0\u0003"+
		"\u0002\u0001\u0000\u02ef\u02ee\u0001\u0000\u0000\u0000\u02f0\u02f1\u0001"+
		"\u0000\u0000\u0000\u02f1\u02ef\u0001\u0000\u0000\u0000\u02f1\u02f2\u0001"+
		"\u0000\u0000\u0000\u02f2\u02f4\u0001\u0000\u0000\u0000\u02f3\u02f5\u0003"+
		"\u001e\u000f\u0000\u02f4\u02f3\u0001\u0000\u0000\u0000\u02f4\u02f5\u0001"+
		"\u0000\u0000\u0000\u02f5\u02f7\u0001\u0000\u0000\u0000\u02f6\u02f8\u0003"+
		"\u009aM\u0000\u02f7\u02f6\u0001\u0000\u0000\u0000\u02f7\u02f8\u0001\u0000"+
		"\u0000\u0000\u02f8\u009b\u0001\u0000\u0000\u0000\u02f9\u0302\u0003\u009e"+
		"O\u0000\u02fa\u0302\u0003\u00a0P\u0000\u02fb\u0302\u0003\u00b6[\u0000"+
		"\u02fc\u0302\u0003\u00ba]\u0000\u02fd\u0302\u0003\u00c6c\u0000\u02fe\u0302"+
		"\u0003\u00c0`\u0000\u02ff\u0302\u0003\u00c4b\u0000\u0300\u0302\u0003\u00ca"+
		"e\u0000\u0301\u02f9\u0001\u0000\u0000\u0000\u0301\u02fa\u0001\u0000\u0000"+
		"\u0000\u0301\u02fb\u0001\u0000\u0000\u0000\u0301\u02fc\u0001\u0000\u0000"+
		"\u0000\u0301\u02fd\u0001\u0000\u0000\u0000\u0301\u02fe\u0001\u0000\u0000"+
		"\u0000\u0301\u02ff\u0001\u0000\u0000\u0000\u0301\u0300\u0001\u0000\u0000"+
		"\u0000\u0302\u009d\u0001\u0000\u0000\u0000\u0303\u0304\u00059\u0000\u0000"+
		"\u0304\u009f\u0001\u0000\u0000\u0000\u0305\u0309\u0003\u00a2Q\u0000\u0306"+
		"\u0309\u0003\u00a4R\u0000\u0307\u0309\u0003\u00b4Z\u0000\u0308\u0305\u0001"+
		"\u0000\u0000\u0000\u0308\u0306\u0001\u0000\u0000\u0000\u0308\u0307\u0001"+
		"\u0000\u0000\u0000\u0309\u00a1\u0001\u0000\u0000\u0000\u030a\u030e\u0003"+
		"\u0086C\u0000\u030b\u030e\u0003\u00ccf\u0000\u030c\u030e\u0003\u008aE"+
		"\u0000\u030d\u030a\u0001\u0000\u0000\u0000\u030d\u030b\u0001\u0000\u0000"+
		"\u0000\u030d\u030c\u0001\u0000\u0000\u0000\u030e\u0310\u0001\u0000\u0000"+
		"\u0000\u030f\u0311\u00032\u0019\u0000\u0310\u030f\u0001\u0000\u0000\u0000"+
		"\u0310\u0311\u0001\u0000\u0000\u0000\u0311\u00a3\u0001\u0000\u0000\u0000"+
		"\u0312\u0313\u0003\u00acV\u0000\u0313\u0314\u0003\u00a6S\u0000\u0314\u0315"+
		"\u0003\u00a8T\u0000\u0315\u0316\u0003\u00a6S\u0000\u0316\u0317\u0003\u00a6"+
		"S\u0000\u0317\u0318\u0003\u00aaU\u0000\u0318\u0329\u0003\u00a6S\u0000"+
		"\u0319\u031a\u0003\u00aeW\u0000\u031a\u031b\u0003\u00ccf\u0000\u031b\u0321"+
		"\u0001\u0000\u0000\u0000\u031c\u031d\u0003\u00b0X\u0000\u031d\u031e\u0003"+
		"\u00ccf\u0000\u031e\u0320\u0001\u0000\u0000\u0000\u031f\u031c\u0001\u0000"+
		"\u0000\u0000\u0320\u0323\u0001\u0000\u0000\u0000\u0321\u031f\u0001\u0000"+
		"\u0000\u0000\u0321\u0322\u0001\u0000\u0000\u0000\u0322\u0327\u0001\u0000"+
		"\u0000\u0000\u0323\u0321\u0001\u0000\u0000\u0000\u0324\u0325\u0003\u00b2"+
		"Y\u0000\u0325\u0326\u0003\u00deo\u0000\u0326\u0328\u0001\u0000\u0000\u0000"+
		"\u0327\u0324\u0001\u0000\u0000\u0000\u0327\u0328\u0001\u0000\u0000\u0000"+
		"\u0328\u032a\u0001\u0000\u0000\u0000\u0329\u0319\u0001\u0000\u0000\u0000"+
		"\u0329\u032a\u0001\u0000\u0000\u0000\u032a\u00a5\u0001\u0000\u0000\u0000"+
		"\u032b\u032c\u0005\u00bc\u0000\u0000\u032c\u00a7\u0001\u0000\u0000\u0000"+
		"\u032d\u032e\u0003\u0002\u0001\u0000\u032e\u00a9\u0001\u0000\u0000\u0000"+
		"\u032f\u0330\u0003\u0002\u0001\u0000\u0330\u00ab\u0001\u0000\u0000\u0000"+
		"\u0331\u0332\u0005A\u0000\u0000\u0332\u00ad\u0001\u0000\u0000\u0000\u0333"+
		"\u0334\u0005\u008e\u0000\u0000\u0334\u00af\u0001\u0000\u0000\u0000\u0335"+
		"\u0336\u0005\u008a\u0000\u0000\u0336\u00b1\u0001\u0000\u0000\u0000\u0337"+
		"\u0338\u0005B\u0000\u0000\u0338\u00b3\u0001\u0000\u0000\u0000\u0339\u033a"+
		"\u0003\u00acV\u0000\u033a\u034a\u0003\u00ccf\u0000\u033b\u033c\u0003\u00ae"+
		"W\u0000\u033c\u0342\u0003\u00ccf\u0000\u033d\u033e\u0003\u00b0X\u0000"+
		"\u033e\u033f\u0003\u00ccf\u0000\u033f\u0341\u0001\u0000\u0000\u0000\u0340"+
		"\u033d\u0001\u0000\u0000\u0000\u0341\u0344\u0001\u0000\u0000\u0000\u0342"+
		"\u0340\u0001\u0000\u0000\u0000\u0342\u0343\u0001\u0000\u0000\u0000\u0343"+
		"\u0348\u0001\u0000\u0000\u0000\u0344\u0342\u0001\u0000\u0000\u0000\u0345"+
		"\u0346\u0003\u00b2Y\u0000\u0346\u0347\u0003\u00deo\u0000\u0347\u0349\u0001"+
		"\u0000\u0000\u0000\u0348\u0345\u0001\u0000\u0000\u0000\u0348\u0349\u0001"+
		"\u0000\u0000\u0000\u0349\u034b\u0001\u0000\u0000\u0000\u034a\u033b\u0001"+
		"\u0000\u0000\u0000\u034a\u034b\u0001\u0000\u0000\u0000\u034b\u00b5\u0001"+
		"\u0000\u0000\u0000\u034c\u034d\u0005:\u0000\u0000\u034d\u00b7\u0001\u0000"+
		"\u0000\u0000\u034e\u034f\u0005@\u0000\u0000\u034f\u00b9\u0001\u0000\u0000"+
		"\u0000\u0350\u0351\u0003\u00b8\\\u0000\u0351\u0352\u0003D\"\u0000\u0352"+
		"\u00bb\u0001\u0000\u0000\u0000\u0353\u0354\u0005\u00a7\u0000\u0000\u0354"+
		"\u00bd\u0001\u0000\u0000\u0000\u0355\u0356\u0005\u00a8\u0000\u0000\u0356"+
		"\u00bf\u0001\u0000\u0000\u0000\u0357\u0358\u0003\u00bc^\u0000\u0358\u0359"+
		"\u0003\u0006\u0003\u0000\u0359\u035a\u0003\u00deo\u0000\u035a\u035e\u0003"+
		"\u00be_\u0000\u035b\u035f\u0003\u0086C\u0000\u035c\u035f\u0003\u0088D"+
		"\u0000\u035d\u035f\u0003\u008aE\u0000\u035e\u035b\u0001\u0000\u0000\u0000"+
		"\u035e\u035c\u0001\u0000\u0000\u0000\u035e\u035d\u0001\u0000\u0000\u0000"+
		"\u035f\u0361\u0001\u0000\u0000\u0000\u0360\u0362\u00032\u0019\u0000\u0361"+
		"\u0360\u0001\u0000\u0000\u0000\u0361\u0362\u0001\u0000\u0000\u0000\u0362"+
		"\u00c1\u0001\u0000\u0000\u0000\u0363\u0364\u0007\u001d\u0000\u0000\u0364"+
		"\u00c3\u0001\u0000\u0000\u0000\u0365\u0366\u0003\u00c2a\u0000\u0366\u0367"+
		"\u0003\u00ccf\u0000\u0367\u00c5\u0001\u0000\u0000\u0000\u0368\u0369\u0005"+
		"8\u0000\u0000\u0369\u00c7\u0001\u0000\u0000\u0000\u036a\u036b\u0005<\u0000"+
		"\u0000\u036b\u00c9\u0001\u0000\u0000\u0000\u036c\u036d\u0003\u00c8d\u0000"+
		"\u036d\u036e\u0003\u00d0h\u0000\u036e\u00cb\u0001\u0000\u0000\u0000\u036f"+
		"\u0375\u0003\u00deo\u0000\u0370\u0371\u0003\u00ceg\u0000\u0371\u0372\u0003"+
		"\u00deo\u0000\u0372\u0374\u0001\u0000\u0000\u0000\u0373\u0370\u0001\u0000"+
		"\u0000\u0000\u0374\u0377\u0001\u0000\u0000\u0000\u0375\u0373\u0001\u0000"+
		"\u0000\u0000\u0375\u0376\u0001\u0000\u0000\u0000\u0376\u00cd\u0001\u0000"+
		"\u0000\u0000\u0377\u0375\u0001\u0000\u0000\u0000\u0378\u0379\u0007\u001e"+
		"\u0000\u0000\u0379\u00cf\u0001\u0000\u0000\u0000\u037a\u037b\u0007\u001f"+
		"\u0000\u0000\u037b\u00d1\u0001\u0000\u0000\u0000\u037c\u037d\u0007 \u0000"+
		"\u0000\u037d\u00d3\u0001\u0000\u0000\u0000\u037e\u0382\u0003\u00d6k\u0000"+
		"\u037f\u0382\u0003\u00d8l\u0000\u0380\u0382\u0003\u00dcn\u0000\u0381\u037e"+
		"\u0001\u0000\u0000\u0000\u0381\u037f\u0001\u0000\u0000\u0000\u0381\u0380"+
		"\u0001\u0000\u0000\u0000\u0382\u00d5\u0001\u0000\u0000\u0000\u0383\u0384"+
		"\u0005\u00bd\u0000\u0000\u0384\u0385\u0003\u00d4j\u0000\u0385\u00d7\u0001"+
		"\u0000\u0000\u0000\u0386\u0387\u0005\u00c4\u0000\u0000\u0387\u0388\u0003"+
		"\u00d4j\u0000\u0388\u00d9\u0001\u0000\u0000\u0000\u0389\u038d\u0003>\u001f"+
		"\u0000\u038a\u038d\u0003@ \u0000\u038b\u038d\u0003B!\u0000\u038c\u0389"+
		"\u0001\u0000\u0000\u0000\u038c\u038a\u0001\u0000\u0000\u0000\u038c\u038b"+
		"\u0001\u0000\u0000\u0000\u038d\u00db\u0001\u0000\u0000\u0000\u038e\u0390"+
		"\u0003\u00dam\u0000\u038f\u0391\u0003P(\u0000\u0390\u038f\u0001\u0000"+
		"\u0000\u0000\u0390\u0391\u0001\u0000\u0000\u0000\u0391\u0397\u0001\u0000"+
		"\u0000\u0000\u0392\u0397\u0003F#\u0000\u0393\u0397\u0003D\"\u0000\u0394"+
		"\u0397\u0003\u00d0h\u0000\u0395\u0397\u0003\u00d2i\u0000\u0396\u038e\u0001"+
		"\u0000\u0000\u0000\u0396\u0392\u0001\u0000\u0000\u0000\u0396\u0393\u0001"+
		"\u0000\u0000\u0000\u0396\u0394\u0001\u0000\u0000\u0000\u0396\u0395\u0001"+
		"\u0000\u0000\u0000\u0397\u00dd\u0001\u0000\u0000\u0000\u0398\u03a9\u0003"+
		"\u00e4r\u0000\u0399\u03a9\u0003\u00e6s\u0000\u039a\u03a9\u0003\u00e8t"+
		"\u0000\u039b\u03a9\u0003\u00eau\u0000\u039c\u03a1\u0003\u00ecv\u0000\u039d"+
		"\u039e\u0003\u00e2q\u0000\u039e\u039f\u0003\n\u0005\u0000\u039f\u03a0"+
		"\u0003P(\u0000\u03a0\u03a2\u0001\u0000\u0000\u0000\u03a1\u039d\u0001\u0000"+
		"\u0000\u0000\u03a1\u03a2\u0001\u0000\u0000\u0000\u03a2\u03a6\u0001\u0000"+
		"\u0000\u0000\u03a3\u03a4\u0003\u00e0p\u0000\u03a4\u03a5\u0003\u00deo\u0000"+
		"\u03a5\u03a7\u0001\u0000\u0000\u0000\u03a6\u03a3\u0001\u0000\u0000\u0000"+
		"\u03a6\u03a7\u0001\u0000\u0000\u0000\u03a7\u03a9\u0001\u0000\u0000\u0000"+
		"\u03a8\u0398\u0001\u0000\u0000\u0000\u03a8\u0399\u0001\u0000\u0000\u0000"+
		"\u03a8\u039a\u0001\u0000\u0000\u0000\u03a8\u039b\u0001\u0000\u0000\u0000"+
		"\u03a8\u039c\u0001\u0000\u0000\u0000\u03a9\u00df\u0001\u0000\u0000\u0000"+
		"\u03aa\u03ab\u0005\u00c2\u0000\u0000\u03ab\u00e1\u0001\u0000\u0000\u0000"+
		"\u03ac\u03ad\u0005\u00b2\u0000\u0000\u03ad\u00e3\u0001\u0000\u0000\u0000"+
		"\u03ae\u03af\u0005\u00bd\u0000\u0000\u03af\u03b0\u0003\u00deo\u0000\u03b0"+
		"\u00e5\u0001\u0000\u0000\u0000\u03b1\u03b2\u0005\u00c4\u0000\u0000\u03b2"+
		"\u03b3\u0003\u00deo\u0000\u03b3\u00e7\u0001\u0000\u0000\u0000\u03b4\u03b5"+
		"\u0003\n\u0005\u0000\u03b5\u03b9\u0003N\'\u0000\u03b6\u03b7\u0003\u001c"+
		"\u000e\u0000\u03b7\u03b8\u0003N\'\u0000\u03b8\u03ba\u0001\u0000\u0000"+
		"\u0000\u03b9\u03b6\u0001\u0000\u0000\u0000\u03b9\u03ba\u0001\u0000\u0000"+
		"\u0000\u03ba\u03c1\u0001\u0000\u0000\u0000\u03bb\u03bc\u0003\b\u0004\u0000"+
		"\u03bc\u03bd\u0003N\'\u0000\u03bd\u03be\u0003\u0012\t\u0000\u03be\u03bf"+
		"\u0003N\'\u0000\u03bf\u03c1\u0001\u0000\u0000\u0000\u03c0\u03b4\u0001"+
		"\u0000\u0000\u0000\u03c0\u03bb\u0001\u0000\u0000\u0000\u03c1\u00e9\u0001"+
		"\u0000\u0000\u0000\u03c2\u03c3\u0003\b\u0004\u0000\u03c3\u03c4\u0003\u00f8"+
		"|\u0000\u03c4\u03c5\u0003\u0016\u000b\u0000\u03c5\u03c6\u0003N\'\u0000"+
		"\u03c6\u00eb\u0001\u0000\u0000\u0000\u03c7\u03c8\u0003\u00dcn\u0000\u03c8"+
		"\u03c9\u0003\u00f4z\u0000\u03c9\u00ed\u0001\u0000\u0000\u0000\u03ca\u03cb"+
		"\u0005\u00b3\u0000\u0000\u03cb\u00ef\u0001\u0000\u0000\u0000\u03cc\u03cd"+
		"\u0005\u00b4\u0000\u0000\u03cd\u00f1\u0001\u0000\u0000\u0000\u03ce\u03cf"+
		"\u0005\u00b5\u0000\u0000\u03cf\u00f3\u0001\u0000\u0000\u0000\u03d0\u03d2"+
		"\u0003\u00f6{\u0000\u03d1\u03d0\u0001\u0000\u0000\u0000\u03d2\u03d5\u0001"+
		"\u0000\u0000\u0000\u03d3\u03d1\u0001\u0000\u0000\u0000\u03d3\u03d4\u0001"+
		"\u0000\u0000\u0000\u03d4\u00f5\u0001\u0000\u0000\u0000\u03d5\u03d3\u0001"+
		"\u0000\u0000\u0000\u03d6\u03dc\u0003\u00fa}\u0000\u03d7\u03dd\u0003N\'"+
		"\u0000\u03d8\u03dd\u0003x<\u0000\u03d9\u03dd\u0003\u00eew\u0000\u03da"+
		"\u03dd\u0003\u00f0x\u0000\u03db\u03dd\u0003\u00f2y\u0000\u03dc\u03d7\u0001"+
		"\u0000\u0000\u0000\u03dc\u03d8\u0001\u0000\u0000\u0000\u03dc\u03d9\u0001"+
		"\u0000\u0000\u0000\u03dc\u03da\u0001\u0000\u0000\u0000\u03dc\u03db\u0001"+
		"\u0000\u0000\u0000\u03dd\u00f7\u0001\u0000\u0000\u0000\u03de\u03e4\u0003"+
		"N\'\u0000\u03df\u03e4\u0003x<\u0000\u03e0\u03e4\u0003\u00eew\u0000\u03e1"+
		"\u03e4\u0003\u00f0x\u0000\u03e2\u03e4\u0003\u00f2y\u0000\u03e3\u03de\u0001"+
		"\u0000\u0000\u0000\u03e3\u03df\u0001\u0000\u0000\u0000\u03e3\u03e0\u0001"+
		"\u0000\u0000\u0000\u03e3\u03e1\u0001\u0000\u0000\u0000\u03e3\u03e2\u0001"+
		"\u0000\u0000\u0000\u03e4\u03e5\u0001\u0000\u0000\u0000\u03e5\u03e6\u0003"+
		"\u0016\u000b\u0000\u03e6\u00f9\u0001\u0000\u0000\u0000\u03e7\u03e8\u0005"+
		"\u00b6\u0000\u0000\u03e8\u00fb\u0001\u0000\u0000\u0000J\u0101\u0108\u010f"+
		"\u0116\u012f\u0140\u0155\u015f\u0165\u016e\u0177\u0187\u0198\u01a1\u01a6"+
		"\u01a9\u01bc\u01c4\u01ce\u01e2\u01ef\u01f7\u0202\u020c\u0213\u0225\u0241"+
		"\u0247\u024a\u0252\u0259\u0260\u0269\u0271\u0278\u0287\u0295\u02a2\u02ab"+
		"\u02b3\u02bb\u02bd\u02c6\u02ce\u02d6\u02e9\u02f1\u02f4\u02f7\u0301\u0308"+
		"\u030d\u0310\u0321\u0327\u0329\u0342\u0348\u034a\u035e\u0361\u0375\u0381"+
		"\u038c\u0390\u0396\u03a1\u03a6\u03a8\u03b9\u03c0\u03d3\u03dc\u03e3";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}