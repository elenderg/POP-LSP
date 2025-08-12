// Generated from e:/POP-LSP/server/src/antlr/pascal.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue"})
public class pascalParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.13.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		AND=1, ARRAY=2, BEGIN=3, BOOLEAN=4, CASE=5, CHAR=6, CHR=7, CONST=8, DIV=9, 
		DO=10, DOWNTO=11, ELSE=12, END=13, FILE=14, FOR=15, FUNCTION=16, GOTO=17, 
		IF=18, IN=19, INTEGER=20, LABEL=21, MOD=22, NIL=23, NOT=24, OF=25, OR=26, 
		PACKED=27, PROCEDURE=28, PROGRAM=29, REAL=30, RECORD=31, REPEAT=32, SET=33, 
		THEN=34, TO=35, TYPE=36, UNTIL=37, VAR=38, WHILE=39, WITH=40, SINAL_DE_ADICAO=41, 
		SINAL_DE_SUBTRACAO=42, STAR=43, SLASH=44, ASSIGN=45, VIRGULA=46, SEMI=47, 
		DOIS_PONTOS=48, IGUAL_A=49, NOT_EQUAL=50, LT=51, LE=52, GE=53, GT=54, 
		PARENTESESESQUERDO=55, PARENTESESDIREITO=56, COLCHETE_ESQUERDO=57, LBRACK2=58, 
		COLCHETE_DIREITO=59, RBRACK2=60, PONTEIRO=61, AT=62, DOT=63, PONTO_E_PONTO=64, 
		LCURLY=65, RCURLY=66, UNIT=67, INTERFACE=68, USES=69, STRING=70, IMPLEMENTATION=71, 
		TRUE=72, FALSE=73, WS=74, COMMENT_1=75, COMMENT_2=76, IDENT=77, STRING_LITERAL=78, 
		NUM_INT=79, NUM_REAL=80;
	public static final int
		RULE_program = 0, RULE_cabecalhoDoPrograma = 1, RULE_identificador = 2, 
		RULE_bloco = 3, RULE_usesUnitsPart = 4, RULE_labelDeclarationPart = 5, 
		RULE_label = 6, RULE_constantDefinitionPart = 7, RULE_constantDefinition = 8, 
		RULE_constantChr = 9, RULE_constante = 10, RULE_numeroSemSinal = 11, RULE_inteiroSemSinal = 12, 
		RULE_fracaoSemSinal = 13, RULE_sinal = 14, RULE_bool_ = 15, RULE_string = 16, 
		RULE_typeDefinitionPart = 17, RULE_definicaoDeTipo = 18, RULE_functionType = 19, 
		RULE_procedureType = 20, RULE_tipo_ = 21, RULE_tipoSimples = 22, RULE_tipoEscalar = 23, 
		RULE_tipoDeSubIntervalo = 24, RULE_identificadorDeTipo = 25, RULE_tipoEstruturado = 26, 
		RULE_tipoEstruturadoNaoEmpacotado = 27, RULE_tipoTextual = 28, RULE_tipoMatriz = 29, 
		RULE_listaDeTipos = 30, RULE_tipoDeIndice = 31, RULE_tipoComponente = 32, 
		RULE_tipoEstrutura = 33, RULE_listaDeCampos = 34, RULE_parteFixa = 35, 
		RULE_secaoDaEstrutura = 36, RULE_parteVariante = 37, RULE_etiqueta = 38, 
		RULE_variante = 39, RULE_tipoConjunto = 40, RULE_tipoBase = 41, RULE_tipoArquivo = 42, 
		RULE_tipoPonteiro = 43, RULE_variableDeclarationPart = 44, RULE_variableDeclaration = 45, 
		RULE_procedureAndFunctionDeclarationPart = 46, RULE_procedureOrFunctionDeclaration = 47, 
		RULE_procedureDeclaration = 48, RULE_listaFormalDeParametros = 49, RULE_formalParameterSection = 50, 
		RULE_parameterGroup = 51, RULE_listaDeIdentificadores = 52, RULE_constList = 53, 
		RULE_functionDeclaration = 54, RULE_tipoDeRetorno = 55, RULE_statement = 56, 
		RULE_unlabelledStatement = 57, RULE_simpleStatement = 58, RULE_assignmentStatement = 59, 
		RULE_variable = 60, RULE_expression = 61, RULE_relationaloperator = 62, 
		RULE_simpleExpression = 63, RULE_additiveoperator = 64, RULE_term = 65, 
		RULE_multiplicativeoperator = 66, RULE_signedFactor = 67, RULE_factor = 68, 
		RULE_unsignedConstant = 69, RULE_functionDesignator = 70, RULE_parameterList = 71, 
		RULE_set_ = 72, RULE_elementList = 73, RULE_element = 74, RULE_procedureStatement = 75, 
		RULE_actualParameter = 76, RULE_parameterwidth = 77, RULE_gotoStatement = 78, 
		RULE_emptyStatement_ = 79, RULE_empty_ = 80, RULE_structuredStatement = 81, 
		RULE_compoundStatement = 82, RULE_statements = 83, RULE_conditionalStatement = 84, 
		RULE_ifStatement = 85, RULE_caseStatement = 86, RULE_caseListElement = 87, 
		RULE_repetetiveStatement = 88, RULE_whileStatement = 89, RULE_repeatStatement = 90, 
		RULE_forStatement = 91, RULE_forList = 92, RULE_initialValue = 93, RULE_finalValue = 94, 
		RULE_withStatement = 95, RULE_recordVariableList = 96;
	private static String[] makeRuleNames() {
		return new String[] {
			"program", "cabecalhoDoPrograma", "identificador", "bloco", "usesUnitsPart", 
			"labelDeclarationPart", "label", "constantDefinitionPart", "constantDefinition", 
			"constantChr", "constante", "numeroSemSinal", "inteiroSemSinal", "fracaoSemSinal", 
			"sinal", "bool_", "string", "typeDefinitionPart", "definicaoDeTipo", 
			"functionType", "procedureType", "tipo_", "tipoSimples", "tipoEscalar", 
			"tipoDeSubIntervalo", "identificadorDeTipo", "tipoEstruturado", "tipoEstruturadoNaoEmpacotado", 
			"tipoTextual", "tipoMatriz", "listaDeTipos", "tipoDeIndice", "tipoComponente", 
			"tipoEstrutura", "listaDeCampos", "parteFixa", "secaoDaEstrutura", "parteVariante", 
			"etiqueta", "variante", "tipoConjunto", "tipoBase", "tipoArquivo", "tipoPonteiro", 
			"variableDeclarationPart", "variableDeclaration", "procedureAndFunctionDeclarationPart", 
			"procedureOrFunctionDeclaration", "procedureDeclaration", "listaFormalDeParametros", 
			"formalParameterSection", "parameterGroup", "listaDeIdentificadores", 
			"constList", "functionDeclaration", "tipoDeRetorno", "statement", "unlabelledStatement", 
			"simpleStatement", "assignmentStatement", "variable", "expression", "relationaloperator", 
			"simpleExpression", "additiveoperator", "term", "multiplicativeoperator", 
			"signedFactor", "factor", "unsignedConstant", "functionDesignator", "parameterList", 
			"set_", "elementList", "element", "procedureStatement", "actualParameter", 
			"parameterwidth", "gotoStatement", "emptyStatement_", "empty_", "structuredStatement", 
			"compoundStatement", "statements", "conditionalStatement", "ifStatement", 
			"caseStatement", "caseListElement", "repetetiveStatement", "whileStatement", 
			"repeatStatement", "forStatement", "forList", "initialValue", "finalValue", 
			"withStatement", "recordVariableList"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'AND'", "'ARRAY'", "'BEGIN'", "'BOOLEAN'", "'CASE'", "'CHAR'", 
			"'CHR'", "'CONST'", "'DIV'", "'DO'", "'DOWNTO'", "'ELSE'", "'END'", "'FILE'", 
			"'FOR'", "'FUNCTION'", "'GOTO'", "'IF'", "'IN'", "'INTEGER'", "'LABEL'", 
			"'MOD'", "'NIL'", "'NOT'", "'OF'", "'OR'", "'PACKED'", "'PROCEDURE'", 
			"'PROGRAM'", "'REAL'", "'RECORD'", "'REPEAT'", "'SET'", "'THEN'", "'TO'", 
			"'TYPE'", "'UNTIL'", "'VAR'", "'WHILE'", "'WITH'", "'+'", "'-'", "'*'", 
			"'/'", "':='", "','", "';'", "':'", "'='", "'<>'", "'<'", "'<='", "'>='", 
			"'>'", "'('", "')'", "'['", "'(.'", "']'", "'.)'", "'^'", "'@'", "'.'", 
			"'..'", "'{'", "'}'", "'UNIT'", "'INTERFACE'", "'USES'", "'STRING'", 
			"'IMPLEMENTATION'", "'TRUE'", "'FALSE'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "AND", "ARRAY", "BEGIN", "BOOLEAN", "CASE", "CHAR", "CHR", "CONST", 
			"DIV", "DO", "DOWNTO", "ELSE", "END", "FILE", "FOR", "FUNCTION", "GOTO", 
			"IF", "IN", "INTEGER", "LABEL", "MOD", "NIL", "NOT", "OF", "OR", "PACKED", 
			"PROCEDURE", "PROGRAM", "REAL", "RECORD", "REPEAT", "SET", "THEN", "TO", 
			"TYPE", "UNTIL", "VAR", "WHILE", "WITH", "SINAL_DE_ADICAO", "SINAL_DE_SUBTRACAO", 
			"STAR", "SLASH", "ASSIGN", "VIRGULA", "SEMI", "DOIS_PONTOS", "IGUAL_A", 
			"NOT_EQUAL", "LT", "LE", "GE", "GT", "PARENTESESESQUERDO", "PARENTESESDIREITO", 
			"COLCHETE_ESQUERDO", "LBRACK2", "COLCHETE_DIREITO", "RBRACK2", "PONTEIRO", 
			"AT", "DOT", "PONTO_E_PONTO", "LCURLY", "RCURLY", "UNIT", "INTERFACE", 
			"USES", "STRING", "IMPLEMENTATION", "TRUE", "FALSE", "WS", "COMMENT_1", 
			"COMMENT_2", "IDENT", "STRING_LITERAL", "NUM_INT", "NUM_REAL"
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
	public String getGrammarFileName() { return "pascal.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public pascalParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ProgramContext extends ParserRuleContext {
		public CabecalhoDoProgramaContext cabecalhoDoPrograma() {
			return getRuleContext(CabecalhoDoProgramaContext.class,0);
		}
		public BlocoContext bloco() {
			return getRuleContext(BlocoContext.class,0);
		}
		public TerminalNode DOT() { return getToken(pascalParser.DOT, 0); }
		public TerminalNode EOF() { return getToken(pascalParser.EOF, 0); }
		public TerminalNode INTERFACE() { return getToken(pascalParser.INTERFACE, 0); }
		public ProgramContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_program; }
	}

	public final ProgramContext program() throws RecognitionException {
		ProgramContext _localctx = new ProgramContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_program);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(194);
			cabecalhoDoPrograma();
			setState(196);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==INTERFACE) {
				{
				setState(195);
				match(INTERFACE);
				}
			}

			setState(198);
			bloco();
			setState(199);
			match(DOT);
			setState(200);
			match(EOF);
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
	public static class CabecalhoDoProgramaContext extends ParserRuleContext {
		public TerminalNode PROGRAM() { return getToken(pascalParser.PROGRAM, 0); }
		public IdentificadorContext identificador() {
			return getRuleContext(IdentificadorContext.class,0);
		}
		public TerminalNode SEMI() { return getToken(pascalParser.SEMI, 0); }
		public TerminalNode PARENTESESESQUERDO() { return getToken(pascalParser.PARENTESESESQUERDO, 0); }
		public ListaDeIdentificadoresContext listaDeIdentificadores() {
			return getRuleContext(ListaDeIdentificadoresContext.class,0);
		}
		public TerminalNode PARENTESESDIREITO() { return getToken(pascalParser.PARENTESESDIREITO, 0); }
		public TerminalNode UNIT() { return getToken(pascalParser.UNIT, 0); }
		public CabecalhoDoProgramaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_cabecalhoDoPrograma; }
	}

	public final CabecalhoDoProgramaContext cabecalhoDoPrograma() throws RecognitionException {
		CabecalhoDoProgramaContext _localctx = new CabecalhoDoProgramaContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_cabecalhoDoPrograma);
		int _la;
		try {
			setState(216);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case PROGRAM:
				enterOuterAlt(_localctx, 1);
				{
				setState(202);
				match(PROGRAM);
				setState(203);
				identificador();
				setState(208);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==PARENTESESESQUERDO) {
					{
					setState(204);
					match(PARENTESESESQUERDO);
					setState(205);
					listaDeIdentificadores();
					setState(206);
					match(PARENTESESDIREITO);
					}
				}

				setState(210);
				match(SEMI);
				}
				break;
			case UNIT:
				enterOuterAlt(_localctx, 2);
				{
				setState(212);
				match(UNIT);
				setState(213);
				identificador();
				setState(214);
				match(SEMI);
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
	public static class IdentificadorContext extends ParserRuleContext {
		public TerminalNode IDENT() { return getToken(pascalParser.IDENT, 0); }
		public IdentificadorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identificador; }
	}

	public final IdentificadorContext identificador() throws RecognitionException {
		IdentificadorContext _localctx = new IdentificadorContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_identificador);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(218);
			match(IDENT);
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
	public static class BlocoContext extends ParserRuleContext {
		public CompoundStatementContext compoundStatement() {
			return getRuleContext(CompoundStatementContext.class,0);
		}
		public List<LabelDeclarationPartContext> labelDeclarationPart() {
			return getRuleContexts(LabelDeclarationPartContext.class);
		}
		public LabelDeclarationPartContext labelDeclarationPart(int i) {
			return getRuleContext(LabelDeclarationPartContext.class,i);
		}
		public List<ConstantDefinitionPartContext> constantDefinitionPart() {
			return getRuleContexts(ConstantDefinitionPartContext.class);
		}
		public ConstantDefinitionPartContext constantDefinitionPart(int i) {
			return getRuleContext(ConstantDefinitionPartContext.class,i);
		}
		public List<TypeDefinitionPartContext> typeDefinitionPart() {
			return getRuleContexts(TypeDefinitionPartContext.class);
		}
		public TypeDefinitionPartContext typeDefinitionPart(int i) {
			return getRuleContext(TypeDefinitionPartContext.class,i);
		}
		public List<VariableDeclarationPartContext> variableDeclarationPart() {
			return getRuleContexts(VariableDeclarationPartContext.class);
		}
		public VariableDeclarationPartContext variableDeclarationPart(int i) {
			return getRuleContext(VariableDeclarationPartContext.class,i);
		}
		public List<ProcedureAndFunctionDeclarationPartContext> procedureAndFunctionDeclarationPart() {
			return getRuleContexts(ProcedureAndFunctionDeclarationPartContext.class);
		}
		public ProcedureAndFunctionDeclarationPartContext procedureAndFunctionDeclarationPart(int i) {
			return getRuleContext(ProcedureAndFunctionDeclarationPartContext.class,i);
		}
		public List<UsesUnitsPartContext> usesUnitsPart() {
			return getRuleContexts(UsesUnitsPartContext.class);
		}
		public UsesUnitsPartContext usesUnitsPart(int i) {
			return getRuleContext(UsesUnitsPartContext.class,i);
		}
		public List<TerminalNode> IMPLEMENTATION() { return getTokens(pascalParser.IMPLEMENTATION); }
		public TerminalNode IMPLEMENTATION(int i) {
			return getToken(pascalParser.IMPLEMENTATION, i);
		}
		public BlocoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_bloco; }
	}

	public final BlocoContext bloco() throws RecognitionException {
		BlocoContext _localctx = new BlocoContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_bloco);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(229);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 8)) & ~0x3f) == 0 && ((1L << (_la - 8)) & -6917529026297847551L) != 0)) {
				{
				setState(227);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case LABEL:
					{
					setState(220);
					labelDeclarationPart();
					}
					break;
				case CONST:
					{
					setState(221);
					constantDefinitionPart();
					}
					break;
				case TYPE:
					{
					setState(222);
					typeDefinitionPart();
					}
					break;
				case VAR:
					{
					setState(223);
					variableDeclarationPart();
					}
					break;
				case FUNCTION:
				case PROCEDURE:
					{
					setState(224);
					procedureAndFunctionDeclarationPart();
					}
					break;
				case USES:
					{
					setState(225);
					usesUnitsPart();
					}
					break;
				case IMPLEMENTATION:
					{
					setState(226);
					match(IMPLEMENTATION);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				setState(231);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(232);
			compoundStatement();
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
	public static class UsesUnitsPartContext extends ParserRuleContext {
		public TerminalNode USES() { return getToken(pascalParser.USES, 0); }
		public ListaDeIdentificadoresContext listaDeIdentificadores() {
			return getRuleContext(ListaDeIdentificadoresContext.class,0);
		}
		public TerminalNode SEMI() { return getToken(pascalParser.SEMI, 0); }
		public UsesUnitsPartContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_usesUnitsPart; }
	}

	public final UsesUnitsPartContext usesUnitsPart() throws RecognitionException {
		UsesUnitsPartContext _localctx = new UsesUnitsPartContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_usesUnitsPart);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(234);
			match(USES);
			setState(235);
			listaDeIdentificadores();
			setState(236);
			match(SEMI);
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
	public static class LabelDeclarationPartContext extends ParserRuleContext {
		public TerminalNode LABEL() { return getToken(pascalParser.LABEL, 0); }
		public List<LabelContext> label() {
			return getRuleContexts(LabelContext.class);
		}
		public LabelContext label(int i) {
			return getRuleContext(LabelContext.class,i);
		}
		public TerminalNode SEMI() { return getToken(pascalParser.SEMI, 0); }
		public List<TerminalNode> VIRGULA() { return getTokens(pascalParser.VIRGULA); }
		public TerminalNode VIRGULA(int i) {
			return getToken(pascalParser.VIRGULA, i);
		}
		public LabelDeclarationPartContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_labelDeclarationPart; }
	}

	public final LabelDeclarationPartContext labelDeclarationPart() throws RecognitionException {
		LabelDeclarationPartContext _localctx = new LabelDeclarationPartContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_labelDeclarationPart);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(238);
			match(LABEL);
			setState(239);
			label();
			setState(244);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==VIRGULA) {
				{
				{
				setState(240);
				match(VIRGULA);
				setState(241);
				label();
				}
				}
				setState(246);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(247);
			match(SEMI);
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
	public static class LabelContext extends ParserRuleContext {
		public InteiroSemSinalContext inteiroSemSinal() {
			return getRuleContext(InteiroSemSinalContext.class,0);
		}
		public LabelContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_label; }
	}

	public final LabelContext label() throws RecognitionException {
		LabelContext _localctx = new LabelContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_label);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(249);
			inteiroSemSinal();
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
	public static class ConstantDefinitionPartContext extends ParserRuleContext {
		public TerminalNode CONST() { return getToken(pascalParser.CONST, 0); }
		public List<ConstantDefinitionContext> constantDefinition() {
			return getRuleContexts(ConstantDefinitionContext.class);
		}
		public ConstantDefinitionContext constantDefinition(int i) {
			return getRuleContext(ConstantDefinitionContext.class,i);
		}
		public List<TerminalNode> SEMI() { return getTokens(pascalParser.SEMI); }
		public TerminalNode SEMI(int i) {
			return getToken(pascalParser.SEMI, i);
		}
		public ConstantDefinitionPartContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_constantDefinitionPart; }
	}

	public final ConstantDefinitionPartContext constantDefinitionPart() throws RecognitionException {
		ConstantDefinitionPartContext _localctx = new ConstantDefinitionPartContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_constantDefinitionPart);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(251);
			match(CONST);
			setState(255); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(252);
				constantDefinition();
				setState(253);
				match(SEMI);
				}
				}
				setState(257); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==IDENT );
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
	public static class ConstantDefinitionContext extends ParserRuleContext {
		public IdentificadorContext identificador() {
			return getRuleContext(IdentificadorContext.class,0);
		}
		public TerminalNode IGUAL_A() { return getToken(pascalParser.IGUAL_A, 0); }
		public ConstanteContext constante() {
			return getRuleContext(ConstanteContext.class,0);
		}
		public ConstantDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_constantDefinition; }
	}

	public final ConstantDefinitionContext constantDefinition() throws RecognitionException {
		ConstantDefinitionContext _localctx = new ConstantDefinitionContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_constantDefinition);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(259);
			identificador();
			setState(260);
			match(IGUAL_A);
			setState(261);
			constante();
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
	public static class ConstantChrContext extends ParserRuleContext {
		public TerminalNode CHR() { return getToken(pascalParser.CHR, 0); }
		public TerminalNode PARENTESESESQUERDO() { return getToken(pascalParser.PARENTESESESQUERDO, 0); }
		public InteiroSemSinalContext inteiroSemSinal() {
			return getRuleContext(InteiroSemSinalContext.class,0);
		}
		public TerminalNode PARENTESESDIREITO() { return getToken(pascalParser.PARENTESESDIREITO, 0); }
		public ConstantChrContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_constantChr; }
	}

	public final ConstantChrContext constantChr() throws RecognitionException {
		ConstantChrContext _localctx = new ConstantChrContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_constantChr);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(263);
			match(CHR);
			setState(264);
			match(PARENTESESESQUERDO);
			setState(265);
			inteiroSemSinal();
			setState(266);
			match(PARENTESESDIREITO);
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
	public static class ConstanteContext extends ParserRuleContext {
		public NumeroSemSinalContext numeroSemSinal() {
			return getRuleContext(NumeroSemSinalContext.class,0);
		}
		public SinalContext sinal() {
			return getRuleContext(SinalContext.class,0);
		}
		public IdentificadorContext identificador() {
			return getRuleContext(IdentificadorContext.class,0);
		}
		public StringContext string() {
			return getRuleContext(StringContext.class,0);
		}
		public ConstantChrContext constantChr() {
			return getRuleContext(ConstantChrContext.class,0);
		}
		public ConstanteContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_constante; }
	}

	public final ConstanteContext constante() throws RecognitionException {
		ConstanteContext _localctx = new ConstanteContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_constante);
		try {
			setState(278);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,7,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(268);
				numeroSemSinal();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(269);
				sinal();
				setState(270);
				numeroSemSinal();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(272);
				identificador();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(273);
				sinal();
				setState(274);
				identificador();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(276);
				string();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(277);
				constantChr();
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
	public static class NumeroSemSinalContext extends ParserRuleContext {
		public InteiroSemSinalContext inteiroSemSinal() {
			return getRuleContext(InteiroSemSinalContext.class,0);
		}
		public FracaoSemSinalContext fracaoSemSinal() {
			return getRuleContext(FracaoSemSinalContext.class,0);
		}
		public NumeroSemSinalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_numeroSemSinal; }
	}

	public final NumeroSemSinalContext numeroSemSinal() throws RecognitionException {
		NumeroSemSinalContext _localctx = new NumeroSemSinalContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_numeroSemSinal);
		try {
			setState(282);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case NUM_INT:
				enterOuterAlt(_localctx, 1);
				{
				setState(280);
				inteiroSemSinal();
				}
				break;
			case NUM_REAL:
				enterOuterAlt(_localctx, 2);
				{
				setState(281);
				fracaoSemSinal();
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
	public static class InteiroSemSinalContext extends ParserRuleContext {
		public TerminalNode NUM_INT() { return getToken(pascalParser.NUM_INT, 0); }
		public InteiroSemSinalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_inteiroSemSinal; }
	}

	public final InteiroSemSinalContext inteiroSemSinal() throws RecognitionException {
		InteiroSemSinalContext _localctx = new InteiroSemSinalContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_inteiroSemSinal);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(284);
			match(NUM_INT);
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
	public static class FracaoSemSinalContext extends ParserRuleContext {
		public TerminalNode NUM_REAL() { return getToken(pascalParser.NUM_REAL, 0); }
		public FracaoSemSinalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_fracaoSemSinal; }
	}

	public final FracaoSemSinalContext fracaoSemSinal() throws RecognitionException {
		FracaoSemSinalContext _localctx = new FracaoSemSinalContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_fracaoSemSinal);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(286);
			match(NUM_REAL);
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
	public static class SinalContext extends ParserRuleContext {
		public TerminalNode SINAL_DE_ADICAO() { return getToken(pascalParser.SINAL_DE_ADICAO, 0); }
		public TerminalNode SINAL_DE_SUBTRACAO() { return getToken(pascalParser.SINAL_DE_SUBTRACAO, 0); }
		public SinalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_sinal; }
	}

	public final SinalContext sinal() throws RecognitionException {
		SinalContext _localctx = new SinalContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_sinal);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(288);
			_la = _input.LA(1);
			if ( !(_la==SINAL_DE_ADICAO || _la==SINAL_DE_SUBTRACAO) ) {
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
	public static class Bool_Context extends ParserRuleContext {
		public TerminalNode TRUE() { return getToken(pascalParser.TRUE, 0); }
		public TerminalNode FALSE() { return getToken(pascalParser.FALSE, 0); }
		public Bool_Context(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_bool_; }
	}

	public final Bool_Context bool_() throws RecognitionException {
		Bool_Context _localctx = new Bool_Context(_ctx, getState());
		enterRule(_localctx, 30, RULE_bool_);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(290);
			_la = _input.LA(1);
			if ( !(_la==TRUE || _la==FALSE) ) {
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
	public static class StringContext extends ParserRuleContext {
		public TerminalNode STRING_LITERAL() { return getToken(pascalParser.STRING_LITERAL, 0); }
		public StringContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_string; }
	}

	public final StringContext string() throws RecognitionException {
		StringContext _localctx = new StringContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_string);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(292);
			match(STRING_LITERAL);
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
	public static class TypeDefinitionPartContext extends ParserRuleContext {
		public TerminalNode TYPE() { return getToken(pascalParser.TYPE, 0); }
		public List<DefinicaoDeTipoContext> definicaoDeTipo() {
			return getRuleContexts(DefinicaoDeTipoContext.class);
		}
		public DefinicaoDeTipoContext definicaoDeTipo(int i) {
			return getRuleContext(DefinicaoDeTipoContext.class,i);
		}
		public List<TerminalNode> SEMI() { return getTokens(pascalParser.SEMI); }
		public TerminalNode SEMI(int i) {
			return getToken(pascalParser.SEMI, i);
		}
		public TypeDefinitionPartContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_typeDefinitionPart; }
	}

	public final TypeDefinitionPartContext typeDefinitionPart() throws RecognitionException {
		TypeDefinitionPartContext _localctx = new TypeDefinitionPartContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_typeDefinitionPart);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(294);
			match(TYPE);
			setState(298); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(295);
				definicaoDeTipo();
				setState(296);
				match(SEMI);
				}
				}
				setState(300); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==IDENT );
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
	public static class DefinicaoDeTipoContext extends ParserRuleContext {
		public IdentificadorContext identificador() {
			return getRuleContext(IdentificadorContext.class,0);
		}
		public TerminalNode IGUAL_A() { return getToken(pascalParser.IGUAL_A, 0); }
		public Tipo_Context tipo_() {
			return getRuleContext(Tipo_Context.class,0);
		}
		public FunctionTypeContext functionType() {
			return getRuleContext(FunctionTypeContext.class,0);
		}
		public ProcedureTypeContext procedureType() {
			return getRuleContext(ProcedureTypeContext.class,0);
		}
		public DefinicaoDeTipoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_definicaoDeTipo; }
	}

	public final DefinicaoDeTipoContext definicaoDeTipo() throws RecognitionException {
		DefinicaoDeTipoContext _localctx = new DefinicaoDeTipoContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_definicaoDeTipo);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(302);
			identificador();
			setState(303);
			match(IGUAL_A);
			setState(307);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ARRAY:
			case BOOLEAN:
			case CHAR:
			case CHR:
			case FILE:
			case INTEGER:
			case PACKED:
			case REAL:
			case RECORD:
			case SET:
			case SINAL_DE_ADICAO:
			case SINAL_DE_SUBTRACAO:
			case PARENTESESESQUERDO:
			case PONTEIRO:
			case STRING:
			case IDENT:
			case STRING_LITERAL:
			case NUM_INT:
			case NUM_REAL:
				{
				setState(304);
				tipo_();
				}
				break;
			case FUNCTION:
				{
				setState(305);
				functionType();
				}
				break;
			case PROCEDURE:
				{
				setState(306);
				procedureType();
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
	public static class FunctionTypeContext extends ParserRuleContext {
		public TerminalNode FUNCTION() { return getToken(pascalParser.FUNCTION, 0); }
		public TerminalNode DOIS_PONTOS() { return getToken(pascalParser.DOIS_PONTOS, 0); }
		public TipoDeRetornoContext tipoDeRetorno() {
			return getRuleContext(TipoDeRetornoContext.class,0);
		}
		public ListaFormalDeParametrosContext listaFormalDeParametros() {
			return getRuleContext(ListaFormalDeParametrosContext.class,0);
		}
		public FunctionTypeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionType; }
	}

	public final FunctionTypeContext functionType() throws RecognitionException {
		FunctionTypeContext _localctx = new FunctionTypeContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_functionType);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(309);
			match(FUNCTION);
			setState(311);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==PARENTESESESQUERDO) {
				{
				setState(310);
				listaFormalDeParametros();
				}
			}

			setState(313);
			match(DOIS_PONTOS);
			setState(314);
			tipoDeRetorno();
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
	public static class ProcedureTypeContext extends ParserRuleContext {
		public TerminalNode PROCEDURE() { return getToken(pascalParser.PROCEDURE, 0); }
		public ListaFormalDeParametrosContext listaFormalDeParametros() {
			return getRuleContext(ListaFormalDeParametrosContext.class,0);
		}
		public ProcedureTypeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procedureType; }
	}

	public final ProcedureTypeContext procedureType() throws RecognitionException {
		ProcedureTypeContext _localctx = new ProcedureTypeContext(_ctx, getState());
		enterRule(_localctx, 40, RULE_procedureType);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(316);
			match(PROCEDURE);
			setState(318);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==PARENTESESESQUERDO) {
				{
				setState(317);
				listaFormalDeParametros();
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
	public static class Tipo_Context extends ParserRuleContext {
		public TipoSimplesContext tipoSimples() {
			return getRuleContext(TipoSimplesContext.class,0);
		}
		public TipoEstruturadoContext tipoEstruturado() {
			return getRuleContext(TipoEstruturadoContext.class,0);
		}
		public TipoPonteiroContext tipoPonteiro() {
			return getRuleContext(TipoPonteiroContext.class,0);
		}
		public Tipo_Context(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tipo_; }
	}

	public final Tipo_Context tipo_() throws RecognitionException {
		Tipo_Context _localctx = new Tipo_Context(_ctx, getState());
		enterRule(_localctx, 42, RULE_tipo_);
		try {
			setState(323);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case BOOLEAN:
			case CHAR:
			case CHR:
			case INTEGER:
			case REAL:
			case SINAL_DE_ADICAO:
			case SINAL_DE_SUBTRACAO:
			case PARENTESESESQUERDO:
			case STRING:
			case IDENT:
			case STRING_LITERAL:
			case NUM_INT:
			case NUM_REAL:
				enterOuterAlt(_localctx, 1);
				{
				setState(320);
				tipoSimples();
				}
				break;
			case ARRAY:
			case FILE:
			case PACKED:
			case RECORD:
			case SET:
				enterOuterAlt(_localctx, 2);
				{
				setState(321);
				tipoEstruturado();
				}
				break;
			case PONTEIRO:
				enterOuterAlt(_localctx, 3);
				{
				setState(322);
				tipoPonteiro();
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
	public static class TipoSimplesContext extends ParserRuleContext {
		public TipoEscalarContext tipoEscalar() {
			return getRuleContext(TipoEscalarContext.class,0);
		}
		public TipoDeSubIntervaloContext tipoDeSubIntervalo() {
			return getRuleContext(TipoDeSubIntervaloContext.class,0);
		}
		public IdentificadorDeTipoContext identificadorDeTipo() {
			return getRuleContext(IdentificadorDeTipoContext.class,0);
		}
		public TipoTextualContext tipoTextual() {
			return getRuleContext(TipoTextualContext.class,0);
		}
		public TipoSimplesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tipoSimples; }
	}

	public final TipoSimplesContext tipoSimples() throws RecognitionException {
		TipoSimplesContext _localctx = new TipoSimplesContext(_ctx, getState());
		enterRule(_localctx, 44, RULE_tipoSimples);
		try {
			setState(329);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,14,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(325);
				tipoEscalar();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(326);
				tipoDeSubIntervalo();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(327);
				identificadorDeTipo();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(328);
				tipoTextual();
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
	public static class TipoEscalarContext extends ParserRuleContext {
		public TerminalNode PARENTESESESQUERDO() { return getToken(pascalParser.PARENTESESESQUERDO, 0); }
		public ListaDeIdentificadoresContext listaDeIdentificadores() {
			return getRuleContext(ListaDeIdentificadoresContext.class,0);
		}
		public TerminalNode PARENTESESDIREITO() { return getToken(pascalParser.PARENTESESDIREITO, 0); }
		public TipoEscalarContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tipoEscalar; }
	}

	public final TipoEscalarContext tipoEscalar() throws RecognitionException {
		TipoEscalarContext _localctx = new TipoEscalarContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_tipoEscalar);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(331);
			match(PARENTESESESQUERDO);
			setState(332);
			listaDeIdentificadores();
			setState(333);
			match(PARENTESESDIREITO);
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
	public static class TipoDeSubIntervaloContext extends ParserRuleContext {
		public List<ConstanteContext> constante() {
			return getRuleContexts(ConstanteContext.class);
		}
		public ConstanteContext constante(int i) {
			return getRuleContext(ConstanteContext.class,i);
		}
		public TerminalNode PONTO_E_PONTO() { return getToken(pascalParser.PONTO_E_PONTO, 0); }
		public TipoDeSubIntervaloContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tipoDeSubIntervalo; }
	}

	public final TipoDeSubIntervaloContext tipoDeSubIntervalo() throws RecognitionException {
		TipoDeSubIntervaloContext _localctx = new TipoDeSubIntervaloContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_tipoDeSubIntervalo);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(335);
			constante();
			setState(336);
			match(PONTO_E_PONTO);
			setState(337);
			constante();
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
	public static class IdentificadorDeTipoContext extends ParserRuleContext {
		public IdentificadorContext identificador() {
			return getRuleContext(IdentificadorContext.class,0);
		}
		public TerminalNode CHAR() { return getToken(pascalParser.CHAR, 0); }
		public TerminalNode BOOLEAN() { return getToken(pascalParser.BOOLEAN, 0); }
		public TerminalNode INTEGER() { return getToken(pascalParser.INTEGER, 0); }
		public TerminalNode REAL() { return getToken(pascalParser.REAL, 0); }
		public TerminalNode STRING() { return getToken(pascalParser.STRING, 0); }
		public IdentificadorDeTipoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identificadorDeTipo; }
	}

	public final IdentificadorDeTipoContext identificadorDeTipo() throws RecognitionException {
		IdentificadorDeTipoContext _localctx = new IdentificadorDeTipoContext(_ctx, getState());
		enterRule(_localctx, 50, RULE_identificadorDeTipo);
		int _la;
		try {
			setState(341);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case IDENT:
				enterOuterAlt(_localctx, 1);
				{
				setState(339);
				identificador();
				}
				break;
			case BOOLEAN:
			case CHAR:
			case INTEGER:
			case REAL:
			case STRING:
				enterOuterAlt(_localctx, 2);
				{
				setState(340);
				_la = _input.LA(1);
				if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 1074790480L) != 0) || _la==STRING) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
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
	public static class TipoEstruturadoContext extends ParserRuleContext {
		public TerminalNode PACKED() { return getToken(pascalParser.PACKED, 0); }
		public TipoEstruturadoNaoEmpacotadoContext tipoEstruturadoNaoEmpacotado() {
			return getRuleContext(TipoEstruturadoNaoEmpacotadoContext.class,0);
		}
		public TipoEstruturadoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tipoEstruturado; }
	}

	public final TipoEstruturadoContext tipoEstruturado() throws RecognitionException {
		TipoEstruturadoContext _localctx = new TipoEstruturadoContext(_ctx, getState());
		enterRule(_localctx, 52, RULE_tipoEstruturado);
		try {
			setState(346);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case PACKED:
				enterOuterAlt(_localctx, 1);
				{
				setState(343);
				match(PACKED);
				setState(344);
				tipoEstruturadoNaoEmpacotado();
				}
				break;
			case ARRAY:
			case FILE:
			case RECORD:
			case SET:
				enterOuterAlt(_localctx, 2);
				{
				setState(345);
				tipoEstruturadoNaoEmpacotado();
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
	public static class TipoEstruturadoNaoEmpacotadoContext extends ParserRuleContext {
		public TipoMatrizContext tipoMatriz() {
			return getRuleContext(TipoMatrizContext.class,0);
		}
		public TipoEstruturaContext tipoEstrutura() {
			return getRuleContext(TipoEstruturaContext.class,0);
		}
		public TipoConjuntoContext tipoConjunto() {
			return getRuleContext(TipoConjuntoContext.class,0);
		}
		public TipoArquivoContext tipoArquivo() {
			return getRuleContext(TipoArquivoContext.class,0);
		}
		public TipoEstruturadoNaoEmpacotadoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tipoEstruturadoNaoEmpacotado; }
	}

	public final TipoEstruturadoNaoEmpacotadoContext tipoEstruturadoNaoEmpacotado() throws RecognitionException {
		TipoEstruturadoNaoEmpacotadoContext _localctx = new TipoEstruturadoNaoEmpacotadoContext(_ctx, getState());
		enterRule(_localctx, 54, RULE_tipoEstruturadoNaoEmpacotado);
		try {
			setState(352);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ARRAY:
				enterOuterAlt(_localctx, 1);
				{
				setState(348);
				tipoMatriz();
				}
				break;
			case RECORD:
				enterOuterAlt(_localctx, 2);
				{
				setState(349);
				tipoEstrutura();
				}
				break;
			case SET:
				enterOuterAlt(_localctx, 3);
				{
				setState(350);
				tipoConjunto();
				}
				break;
			case FILE:
				enterOuterAlt(_localctx, 4);
				{
				setState(351);
				tipoArquivo();
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
	public static class TipoTextualContext extends ParserRuleContext {
		public TerminalNode STRING() { return getToken(pascalParser.STRING, 0); }
		public TerminalNode COLCHETE_ESQUERDO() { return getToken(pascalParser.COLCHETE_ESQUERDO, 0); }
		public TerminalNode COLCHETE_DIREITO() { return getToken(pascalParser.COLCHETE_DIREITO, 0); }
		public IdentificadorContext identificador() {
			return getRuleContext(IdentificadorContext.class,0);
		}
		public NumeroSemSinalContext numeroSemSinal() {
			return getRuleContext(NumeroSemSinalContext.class,0);
		}
		public TipoTextualContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tipoTextual; }
	}

	public final TipoTextualContext tipoTextual() throws RecognitionException {
		TipoTextualContext _localctx = new TipoTextualContext(_ctx, getState());
		enterRule(_localctx, 56, RULE_tipoTextual);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(354);
			match(STRING);
			setState(355);
			match(COLCHETE_ESQUERDO);
			setState(358);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case IDENT:
				{
				setState(356);
				identificador();
				}
				break;
			case NUM_INT:
			case NUM_REAL:
				{
				setState(357);
				numeroSemSinal();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(360);
			match(COLCHETE_DIREITO);
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
	public static class TipoMatrizContext extends ParserRuleContext {
		public TerminalNode ARRAY() { return getToken(pascalParser.ARRAY, 0); }
		public TerminalNode COLCHETE_ESQUERDO() { return getToken(pascalParser.COLCHETE_ESQUERDO, 0); }
		public ListaDeTiposContext listaDeTipos() {
			return getRuleContext(ListaDeTiposContext.class,0);
		}
		public TerminalNode COLCHETE_DIREITO() { return getToken(pascalParser.COLCHETE_DIREITO, 0); }
		public TerminalNode OF() { return getToken(pascalParser.OF, 0); }
		public TipoComponenteContext tipoComponente() {
			return getRuleContext(TipoComponenteContext.class,0);
		}
		public TerminalNode LBRACK2() { return getToken(pascalParser.LBRACK2, 0); }
		public TerminalNode RBRACK2() { return getToken(pascalParser.RBRACK2, 0); }
		public TipoMatrizContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tipoMatriz; }
	}

	public final TipoMatrizContext tipoMatriz() throws RecognitionException {
		TipoMatrizContext _localctx = new TipoMatrizContext(_ctx, getState());
		enterRule(_localctx, 58, RULE_tipoMatriz);
		try {
			setState(376);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,19,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(362);
				match(ARRAY);
				setState(363);
				match(COLCHETE_ESQUERDO);
				setState(364);
				listaDeTipos();
				setState(365);
				match(COLCHETE_DIREITO);
				setState(366);
				match(OF);
				setState(367);
				tipoComponente();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(369);
				match(ARRAY);
				setState(370);
				match(LBRACK2);
				setState(371);
				listaDeTipos();
				setState(372);
				match(RBRACK2);
				setState(373);
				match(OF);
				setState(374);
				tipoComponente();
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
	public static class ListaDeTiposContext extends ParserRuleContext {
		public List<TipoDeIndiceContext> tipoDeIndice() {
			return getRuleContexts(TipoDeIndiceContext.class);
		}
		public TipoDeIndiceContext tipoDeIndice(int i) {
			return getRuleContext(TipoDeIndiceContext.class,i);
		}
		public List<TerminalNode> VIRGULA() { return getTokens(pascalParser.VIRGULA); }
		public TerminalNode VIRGULA(int i) {
			return getToken(pascalParser.VIRGULA, i);
		}
		public ListaDeTiposContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_listaDeTipos; }
	}

	public final ListaDeTiposContext listaDeTipos() throws RecognitionException {
		ListaDeTiposContext _localctx = new ListaDeTiposContext(_ctx, getState());
		enterRule(_localctx, 60, RULE_listaDeTipos);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(378);
			tipoDeIndice();
			setState(383);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==VIRGULA) {
				{
				{
				setState(379);
				match(VIRGULA);
				setState(380);
				tipoDeIndice();
				}
				}
				setState(385);
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
	public static class TipoDeIndiceContext extends ParserRuleContext {
		public TipoSimplesContext tipoSimples() {
			return getRuleContext(TipoSimplesContext.class,0);
		}
		public TipoDeIndiceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tipoDeIndice; }
	}

	public final TipoDeIndiceContext tipoDeIndice() throws RecognitionException {
		TipoDeIndiceContext _localctx = new TipoDeIndiceContext(_ctx, getState());
		enterRule(_localctx, 62, RULE_tipoDeIndice);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(386);
			tipoSimples();
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
	public static class TipoComponenteContext extends ParserRuleContext {
		public Tipo_Context tipo_() {
			return getRuleContext(Tipo_Context.class,0);
		}
		public TipoComponenteContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tipoComponente; }
	}

	public final TipoComponenteContext tipoComponente() throws RecognitionException {
		TipoComponenteContext _localctx = new TipoComponenteContext(_ctx, getState());
		enterRule(_localctx, 64, RULE_tipoComponente);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(388);
			tipo_();
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
	public static class TipoEstruturaContext extends ParserRuleContext {
		public TerminalNode RECORD() { return getToken(pascalParser.RECORD, 0); }
		public TerminalNode END() { return getToken(pascalParser.END, 0); }
		public ListaDeCamposContext listaDeCampos() {
			return getRuleContext(ListaDeCamposContext.class,0);
		}
		public TipoEstruturaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tipoEstrutura; }
	}

	public final TipoEstruturaContext tipoEstrutura() throws RecognitionException {
		TipoEstruturaContext _localctx = new TipoEstruturaContext(_ctx, getState());
		enterRule(_localctx, 66, RULE_tipoEstrutura);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(390);
			match(RECORD);
			setState(392);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==CASE || _la==IDENT) {
				{
				setState(391);
				listaDeCampos();
				}
			}

			setState(394);
			match(END);
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
	public static class ListaDeCamposContext extends ParserRuleContext {
		public ParteFixaContext parteFixa() {
			return getRuleContext(ParteFixaContext.class,0);
		}
		public TerminalNode SEMI() { return getToken(pascalParser.SEMI, 0); }
		public ParteVarianteContext parteVariante() {
			return getRuleContext(ParteVarianteContext.class,0);
		}
		public ListaDeCamposContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_listaDeCampos; }
	}

	public final ListaDeCamposContext listaDeCampos() throws RecognitionException {
		ListaDeCamposContext _localctx = new ListaDeCamposContext(_ctx, getState());
		enterRule(_localctx, 68, RULE_listaDeCampos);
		int _la;
		try {
			setState(402);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case IDENT:
				enterOuterAlt(_localctx, 1);
				{
				setState(396);
				parteFixa();
				setState(399);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==SEMI) {
					{
					setState(397);
					match(SEMI);
					setState(398);
					parteVariante();
					}
				}

				}
				break;
			case CASE:
				enterOuterAlt(_localctx, 2);
				{
				setState(401);
				parteVariante();
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
	public static class ParteFixaContext extends ParserRuleContext {
		public List<SecaoDaEstruturaContext> secaoDaEstrutura() {
			return getRuleContexts(SecaoDaEstruturaContext.class);
		}
		public SecaoDaEstruturaContext secaoDaEstrutura(int i) {
			return getRuleContext(SecaoDaEstruturaContext.class,i);
		}
		public List<TerminalNode> SEMI() { return getTokens(pascalParser.SEMI); }
		public TerminalNode SEMI(int i) {
			return getToken(pascalParser.SEMI, i);
		}
		public ParteFixaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_parteFixa; }
	}

	public final ParteFixaContext parteFixa() throws RecognitionException {
		ParteFixaContext _localctx = new ParteFixaContext(_ctx, getState());
		enterRule(_localctx, 70, RULE_parteFixa);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(404);
			secaoDaEstrutura();
			setState(409);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,24,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(405);
					match(SEMI);
					setState(406);
					secaoDaEstrutura();
					}
					} 
				}
				setState(411);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,24,_ctx);
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
	public static class SecaoDaEstruturaContext extends ParserRuleContext {
		public ListaDeIdentificadoresContext listaDeIdentificadores() {
			return getRuleContext(ListaDeIdentificadoresContext.class,0);
		}
		public TerminalNode DOIS_PONTOS() { return getToken(pascalParser.DOIS_PONTOS, 0); }
		public Tipo_Context tipo_() {
			return getRuleContext(Tipo_Context.class,0);
		}
		public SecaoDaEstruturaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_secaoDaEstrutura; }
	}

	public final SecaoDaEstruturaContext secaoDaEstrutura() throws RecognitionException {
		SecaoDaEstruturaContext _localctx = new SecaoDaEstruturaContext(_ctx, getState());
		enterRule(_localctx, 72, RULE_secaoDaEstrutura);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(412);
			listaDeIdentificadores();
			setState(413);
			match(DOIS_PONTOS);
			setState(414);
			tipo_();
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
	public static class ParteVarianteContext extends ParserRuleContext {
		public TerminalNode CASE() { return getToken(pascalParser.CASE, 0); }
		public EtiquetaContext etiqueta() {
			return getRuleContext(EtiquetaContext.class,0);
		}
		public TerminalNode OF() { return getToken(pascalParser.OF, 0); }
		public List<VarianteContext> variante() {
			return getRuleContexts(VarianteContext.class);
		}
		public VarianteContext variante(int i) {
			return getRuleContext(VarianteContext.class,i);
		}
		public List<TerminalNode> SEMI() { return getTokens(pascalParser.SEMI); }
		public TerminalNode SEMI(int i) {
			return getToken(pascalParser.SEMI, i);
		}
		public ParteVarianteContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_parteVariante; }
	}

	public final ParteVarianteContext parteVariante() throws RecognitionException {
		ParteVarianteContext _localctx = new ParteVarianteContext(_ctx, getState());
		enterRule(_localctx, 74, RULE_parteVariante);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(416);
			match(CASE);
			setState(417);
			etiqueta();
			setState(418);
			match(OF);
			setState(419);
			variante();
			setState(424);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==SEMI) {
				{
				{
				setState(420);
				match(SEMI);
				setState(421);
				variante();
				}
				}
				setState(426);
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
	public static class EtiquetaContext extends ParserRuleContext {
		public IdentificadorContext identificador() {
			return getRuleContext(IdentificadorContext.class,0);
		}
		public TerminalNode DOIS_PONTOS() { return getToken(pascalParser.DOIS_PONTOS, 0); }
		public IdentificadorDeTipoContext identificadorDeTipo() {
			return getRuleContext(IdentificadorDeTipoContext.class,0);
		}
		public EtiquetaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_etiqueta; }
	}

	public final EtiquetaContext etiqueta() throws RecognitionException {
		EtiquetaContext _localctx = new EtiquetaContext(_ctx, getState());
		enterRule(_localctx, 76, RULE_etiqueta);
		try {
			setState(432);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,26,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(427);
				identificador();
				setState(428);
				match(DOIS_PONTOS);
				setState(429);
				identificadorDeTipo();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(431);
				identificadorDeTipo();
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
	public static class VarianteContext extends ParserRuleContext {
		public ConstListContext constList() {
			return getRuleContext(ConstListContext.class,0);
		}
		public TerminalNode DOIS_PONTOS() { return getToken(pascalParser.DOIS_PONTOS, 0); }
		public TerminalNode PARENTESESESQUERDO() { return getToken(pascalParser.PARENTESESESQUERDO, 0); }
		public ListaDeCamposContext listaDeCampos() {
			return getRuleContext(ListaDeCamposContext.class,0);
		}
		public TerminalNode PARENTESESDIREITO() { return getToken(pascalParser.PARENTESESDIREITO, 0); }
		public VarianteContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_variante; }
	}

	public final VarianteContext variante() throws RecognitionException {
		VarianteContext _localctx = new VarianteContext(_ctx, getState());
		enterRule(_localctx, 78, RULE_variante);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(434);
			constList();
			setState(435);
			match(DOIS_PONTOS);
			setState(436);
			match(PARENTESESESQUERDO);
			setState(437);
			listaDeCampos();
			setState(438);
			match(PARENTESESDIREITO);
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
	public static class TipoConjuntoContext extends ParserRuleContext {
		public TerminalNode SET() { return getToken(pascalParser.SET, 0); }
		public TerminalNode OF() { return getToken(pascalParser.OF, 0); }
		public TipoBaseContext tipoBase() {
			return getRuleContext(TipoBaseContext.class,0);
		}
		public TipoConjuntoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tipoConjunto; }
	}

	public final TipoConjuntoContext tipoConjunto() throws RecognitionException {
		TipoConjuntoContext _localctx = new TipoConjuntoContext(_ctx, getState());
		enterRule(_localctx, 80, RULE_tipoConjunto);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(440);
			match(SET);
			setState(441);
			match(OF);
			setState(442);
			tipoBase();
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
	public static class TipoBaseContext extends ParserRuleContext {
		public TipoSimplesContext tipoSimples() {
			return getRuleContext(TipoSimplesContext.class,0);
		}
		public TipoBaseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tipoBase; }
	}

	public final TipoBaseContext tipoBase() throws RecognitionException {
		TipoBaseContext _localctx = new TipoBaseContext(_ctx, getState());
		enterRule(_localctx, 82, RULE_tipoBase);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(444);
			tipoSimples();
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
	public static class TipoArquivoContext extends ParserRuleContext {
		public TerminalNode FILE() { return getToken(pascalParser.FILE, 0); }
		public TerminalNode OF() { return getToken(pascalParser.OF, 0); }
		public Tipo_Context tipo_() {
			return getRuleContext(Tipo_Context.class,0);
		}
		public TipoArquivoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tipoArquivo; }
	}

	public final TipoArquivoContext tipoArquivo() throws RecognitionException {
		TipoArquivoContext _localctx = new TipoArquivoContext(_ctx, getState());
		enterRule(_localctx, 84, RULE_tipoArquivo);
		try {
			setState(450);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,27,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(446);
				match(FILE);
				setState(447);
				match(OF);
				setState(448);
				tipo_();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(449);
				match(FILE);
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
	public static class TipoPonteiroContext extends ParserRuleContext {
		public TerminalNode PONTEIRO() { return getToken(pascalParser.PONTEIRO, 0); }
		public IdentificadorDeTipoContext identificadorDeTipo() {
			return getRuleContext(IdentificadorDeTipoContext.class,0);
		}
		public TipoPonteiroContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tipoPonteiro; }
	}

	public final TipoPonteiroContext tipoPonteiro() throws RecognitionException {
		TipoPonteiroContext _localctx = new TipoPonteiroContext(_ctx, getState());
		enterRule(_localctx, 86, RULE_tipoPonteiro);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(452);
			match(PONTEIRO);
			setState(453);
			identificadorDeTipo();
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
	public static class VariableDeclarationPartContext extends ParserRuleContext {
		public TerminalNode VAR() { return getToken(pascalParser.VAR, 0); }
		public List<VariableDeclarationContext> variableDeclaration() {
			return getRuleContexts(VariableDeclarationContext.class);
		}
		public VariableDeclarationContext variableDeclaration(int i) {
			return getRuleContext(VariableDeclarationContext.class,i);
		}
		public List<TerminalNode> SEMI() { return getTokens(pascalParser.SEMI); }
		public TerminalNode SEMI(int i) {
			return getToken(pascalParser.SEMI, i);
		}
		public VariableDeclarationPartContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_variableDeclarationPart; }
	}

	public final VariableDeclarationPartContext variableDeclarationPart() throws RecognitionException {
		VariableDeclarationPartContext _localctx = new VariableDeclarationPartContext(_ctx, getState());
		enterRule(_localctx, 88, RULE_variableDeclarationPart);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(455);
			match(VAR);
			setState(456);
			variableDeclaration();
			setState(461);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,28,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(457);
					match(SEMI);
					setState(458);
					variableDeclaration();
					}
					} 
				}
				setState(463);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,28,_ctx);
			}
			setState(464);
			match(SEMI);
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
	public static class VariableDeclarationContext extends ParserRuleContext {
		public ListaDeIdentificadoresContext listaDeIdentificadores() {
			return getRuleContext(ListaDeIdentificadoresContext.class,0);
		}
		public TerminalNode DOIS_PONTOS() { return getToken(pascalParser.DOIS_PONTOS, 0); }
		public Tipo_Context tipo_() {
			return getRuleContext(Tipo_Context.class,0);
		}
		public VariableDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_variableDeclaration; }
	}

	public final VariableDeclarationContext variableDeclaration() throws RecognitionException {
		VariableDeclarationContext _localctx = new VariableDeclarationContext(_ctx, getState());
		enterRule(_localctx, 90, RULE_variableDeclaration);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(466);
			listaDeIdentificadores();
			setState(467);
			match(DOIS_PONTOS);
			setState(468);
			tipo_();
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
	public static class ProcedureAndFunctionDeclarationPartContext extends ParserRuleContext {
		public ProcedureOrFunctionDeclarationContext procedureOrFunctionDeclaration() {
			return getRuleContext(ProcedureOrFunctionDeclarationContext.class,0);
		}
		public TerminalNode SEMI() { return getToken(pascalParser.SEMI, 0); }
		public ProcedureAndFunctionDeclarationPartContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procedureAndFunctionDeclarationPart; }
	}

	public final ProcedureAndFunctionDeclarationPartContext procedureAndFunctionDeclarationPart() throws RecognitionException {
		ProcedureAndFunctionDeclarationPartContext _localctx = new ProcedureAndFunctionDeclarationPartContext(_ctx, getState());
		enterRule(_localctx, 92, RULE_procedureAndFunctionDeclarationPart);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(470);
			procedureOrFunctionDeclaration();
			setState(471);
			match(SEMI);
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
	public static class ProcedureOrFunctionDeclarationContext extends ParserRuleContext {
		public ProcedureDeclarationContext procedureDeclaration() {
			return getRuleContext(ProcedureDeclarationContext.class,0);
		}
		public FunctionDeclarationContext functionDeclaration() {
			return getRuleContext(FunctionDeclarationContext.class,0);
		}
		public ProcedureOrFunctionDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procedureOrFunctionDeclaration; }
	}

	public final ProcedureOrFunctionDeclarationContext procedureOrFunctionDeclaration() throws RecognitionException {
		ProcedureOrFunctionDeclarationContext _localctx = new ProcedureOrFunctionDeclarationContext(_ctx, getState());
		enterRule(_localctx, 94, RULE_procedureOrFunctionDeclaration);
		try {
			setState(475);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case PROCEDURE:
				enterOuterAlt(_localctx, 1);
				{
				setState(473);
				procedureDeclaration();
				}
				break;
			case FUNCTION:
				enterOuterAlt(_localctx, 2);
				{
				setState(474);
				functionDeclaration();
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
	public static class ProcedureDeclarationContext extends ParserRuleContext {
		public TerminalNode PROCEDURE() { return getToken(pascalParser.PROCEDURE, 0); }
		public IdentificadorContext identificador() {
			return getRuleContext(IdentificadorContext.class,0);
		}
		public TerminalNode SEMI() { return getToken(pascalParser.SEMI, 0); }
		public BlocoContext bloco() {
			return getRuleContext(BlocoContext.class,0);
		}
		public ListaFormalDeParametrosContext listaFormalDeParametros() {
			return getRuleContext(ListaFormalDeParametrosContext.class,0);
		}
		public ProcedureDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procedureDeclaration; }
	}

	public final ProcedureDeclarationContext procedureDeclaration() throws RecognitionException {
		ProcedureDeclarationContext _localctx = new ProcedureDeclarationContext(_ctx, getState());
		enterRule(_localctx, 96, RULE_procedureDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(477);
			match(PROCEDURE);
			setState(478);
			identificador();
			setState(480);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==PARENTESESESQUERDO) {
				{
				setState(479);
				listaFormalDeParametros();
				}
			}

			setState(482);
			match(SEMI);
			setState(483);
			bloco();
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
	public static class ListaFormalDeParametrosContext extends ParserRuleContext {
		public TerminalNode PARENTESESESQUERDO() { return getToken(pascalParser.PARENTESESESQUERDO, 0); }
		public List<FormalParameterSectionContext> formalParameterSection() {
			return getRuleContexts(FormalParameterSectionContext.class);
		}
		public FormalParameterSectionContext formalParameterSection(int i) {
			return getRuleContext(FormalParameterSectionContext.class,i);
		}
		public TerminalNode PARENTESESDIREITO() { return getToken(pascalParser.PARENTESESDIREITO, 0); }
		public List<TerminalNode> SEMI() { return getTokens(pascalParser.SEMI); }
		public TerminalNode SEMI(int i) {
			return getToken(pascalParser.SEMI, i);
		}
		public ListaFormalDeParametrosContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_listaFormalDeParametros; }
	}

	public final ListaFormalDeParametrosContext listaFormalDeParametros() throws RecognitionException {
		ListaFormalDeParametrosContext _localctx = new ListaFormalDeParametrosContext(_ctx, getState());
		enterRule(_localctx, 98, RULE_listaFormalDeParametros);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(485);
			match(PARENTESESESQUERDO);
			setState(486);
			formalParameterSection();
			setState(491);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==SEMI) {
				{
				{
				setState(487);
				match(SEMI);
				setState(488);
				formalParameterSection();
				}
				}
				setState(493);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(494);
			match(PARENTESESDIREITO);
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
	public static class FormalParameterSectionContext extends ParserRuleContext {
		public ParameterGroupContext parameterGroup() {
			return getRuleContext(ParameterGroupContext.class,0);
		}
		public TerminalNode VAR() { return getToken(pascalParser.VAR, 0); }
		public TerminalNode FUNCTION() { return getToken(pascalParser.FUNCTION, 0); }
		public TerminalNode PROCEDURE() { return getToken(pascalParser.PROCEDURE, 0); }
		public FormalParameterSectionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_formalParameterSection; }
	}

	public final FormalParameterSectionContext formalParameterSection() throws RecognitionException {
		FormalParameterSectionContext _localctx = new FormalParameterSectionContext(_ctx, getState());
		enterRule(_localctx, 100, RULE_formalParameterSection);
		try {
			setState(503);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case IDENT:
				enterOuterAlt(_localctx, 1);
				{
				setState(496);
				parameterGroup();
				}
				break;
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(497);
				match(VAR);
				setState(498);
				parameterGroup();
				}
				break;
			case FUNCTION:
				enterOuterAlt(_localctx, 3);
				{
				setState(499);
				match(FUNCTION);
				setState(500);
				parameterGroup();
				}
				break;
			case PROCEDURE:
				enterOuterAlt(_localctx, 4);
				{
				setState(501);
				match(PROCEDURE);
				setState(502);
				parameterGroup();
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
	public static class ParameterGroupContext extends ParserRuleContext {
		public ListaDeIdentificadoresContext listaDeIdentificadores() {
			return getRuleContext(ListaDeIdentificadoresContext.class,0);
		}
		public TerminalNode DOIS_PONTOS() { return getToken(pascalParser.DOIS_PONTOS, 0); }
		public IdentificadorDeTipoContext identificadorDeTipo() {
			return getRuleContext(IdentificadorDeTipoContext.class,0);
		}
		public ParameterGroupContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_parameterGroup; }
	}

	public final ParameterGroupContext parameterGroup() throws RecognitionException {
		ParameterGroupContext _localctx = new ParameterGroupContext(_ctx, getState());
		enterRule(_localctx, 102, RULE_parameterGroup);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(505);
			listaDeIdentificadores();
			setState(506);
			match(DOIS_PONTOS);
			setState(507);
			identificadorDeTipo();
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
	public static class ListaDeIdentificadoresContext extends ParserRuleContext {
		public List<IdentificadorContext> identificador() {
			return getRuleContexts(IdentificadorContext.class);
		}
		public IdentificadorContext identificador(int i) {
			return getRuleContext(IdentificadorContext.class,i);
		}
		public List<TerminalNode> VIRGULA() { return getTokens(pascalParser.VIRGULA); }
		public TerminalNode VIRGULA(int i) {
			return getToken(pascalParser.VIRGULA, i);
		}
		public ListaDeIdentificadoresContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_listaDeIdentificadores; }
	}

	public final ListaDeIdentificadoresContext listaDeIdentificadores() throws RecognitionException {
		ListaDeIdentificadoresContext _localctx = new ListaDeIdentificadoresContext(_ctx, getState());
		enterRule(_localctx, 104, RULE_listaDeIdentificadores);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(509);
			identificador();
			setState(514);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==VIRGULA) {
				{
				{
				setState(510);
				match(VIRGULA);
				setState(511);
				identificador();
				}
				}
				setState(516);
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
	public static class ConstListContext extends ParserRuleContext {
		public List<ConstanteContext> constante() {
			return getRuleContexts(ConstanteContext.class);
		}
		public ConstanteContext constante(int i) {
			return getRuleContext(ConstanteContext.class,i);
		}
		public List<TerminalNode> VIRGULA() { return getTokens(pascalParser.VIRGULA); }
		public TerminalNode VIRGULA(int i) {
			return getToken(pascalParser.VIRGULA, i);
		}
		public ConstListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_constList; }
	}

	public final ConstListContext constList() throws RecognitionException {
		ConstListContext _localctx = new ConstListContext(_ctx, getState());
		enterRule(_localctx, 106, RULE_constList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(517);
			constante();
			setState(522);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==VIRGULA) {
				{
				{
				setState(518);
				match(VIRGULA);
				setState(519);
				constante();
				}
				}
				setState(524);
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
	public static class FunctionDeclarationContext extends ParserRuleContext {
		public TerminalNode FUNCTION() { return getToken(pascalParser.FUNCTION, 0); }
		public IdentificadorContext identificador() {
			return getRuleContext(IdentificadorContext.class,0);
		}
		public TerminalNode DOIS_PONTOS() { return getToken(pascalParser.DOIS_PONTOS, 0); }
		public TipoDeRetornoContext tipoDeRetorno() {
			return getRuleContext(TipoDeRetornoContext.class,0);
		}
		public TerminalNode SEMI() { return getToken(pascalParser.SEMI, 0); }
		public BlocoContext bloco() {
			return getRuleContext(BlocoContext.class,0);
		}
		public ListaFormalDeParametrosContext listaFormalDeParametros() {
			return getRuleContext(ListaFormalDeParametrosContext.class,0);
		}
		public FunctionDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionDeclaration; }
	}

	public final FunctionDeclarationContext functionDeclaration() throws RecognitionException {
		FunctionDeclarationContext _localctx = new FunctionDeclarationContext(_ctx, getState());
		enterRule(_localctx, 108, RULE_functionDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(525);
			match(FUNCTION);
			setState(526);
			identificador();
			setState(528);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==PARENTESESESQUERDO) {
				{
				setState(527);
				listaFormalDeParametros();
				}
			}

			setState(530);
			match(DOIS_PONTOS);
			setState(531);
			tipoDeRetorno();
			setState(532);
			match(SEMI);
			setState(533);
			bloco();
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
	public static class TipoDeRetornoContext extends ParserRuleContext {
		public IdentificadorDeTipoContext identificadorDeTipo() {
			return getRuleContext(IdentificadorDeTipoContext.class,0);
		}
		public TipoDeRetornoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tipoDeRetorno; }
	}

	public final TipoDeRetornoContext tipoDeRetorno() throws RecognitionException {
		TipoDeRetornoContext _localctx = new TipoDeRetornoContext(_ctx, getState());
		enterRule(_localctx, 110, RULE_tipoDeRetorno);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(535);
			identificadorDeTipo();
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
	public static class StatementContext extends ParserRuleContext {
		public LabelContext label() {
			return getRuleContext(LabelContext.class,0);
		}
		public TerminalNode DOIS_PONTOS() { return getToken(pascalParser.DOIS_PONTOS, 0); }
		public UnlabelledStatementContext unlabelledStatement() {
			return getRuleContext(UnlabelledStatementContext.class,0);
		}
		public StatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_statement; }
	}

	public final StatementContext statement() throws RecognitionException {
		StatementContext _localctx = new StatementContext(_ctx, getState());
		enterRule(_localctx, 112, RULE_statement);
		try {
			setState(542);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case NUM_INT:
				enterOuterAlt(_localctx, 1);
				{
				setState(537);
				label();
				setState(538);
				match(DOIS_PONTOS);
				setState(539);
				unlabelledStatement();
				}
				break;
			case BEGIN:
			case CASE:
			case ELSE:
			case END:
			case FOR:
			case GOTO:
			case IF:
			case REPEAT:
			case UNTIL:
			case WHILE:
			case WITH:
			case SEMI:
			case AT:
			case IDENT:
				enterOuterAlt(_localctx, 2);
				{
				setState(541);
				unlabelledStatement();
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
	public static class UnlabelledStatementContext extends ParserRuleContext {
		public SimpleStatementContext simpleStatement() {
			return getRuleContext(SimpleStatementContext.class,0);
		}
		public StructuredStatementContext structuredStatement() {
			return getRuleContext(StructuredStatementContext.class,0);
		}
		public UnlabelledStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_unlabelledStatement; }
	}

	public final UnlabelledStatementContext unlabelledStatement() throws RecognitionException {
		UnlabelledStatementContext _localctx = new UnlabelledStatementContext(_ctx, getState());
		enterRule(_localctx, 114, RULE_unlabelledStatement);
		try {
			setState(546);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ELSE:
			case END:
			case GOTO:
			case UNTIL:
			case SEMI:
			case AT:
			case IDENT:
				enterOuterAlt(_localctx, 1);
				{
				setState(544);
				simpleStatement();
				}
				break;
			case BEGIN:
			case CASE:
			case FOR:
			case IF:
			case REPEAT:
			case WHILE:
			case WITH:
				enterOuterAlt(_localctx, 2);
				{
				setState(545);
				structuredStatement();
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
	public static class SimpleStatementContext extends ParserRuleContext {
		public AssignmentStatementContext assignmentStatement() {
			return getRuleContext(AssignmentStatementContext.class,0);
		}
		public ProcedureStatementContext procedureStatement() {
			return getRuleContext(ProcedureStatementContext.class,0);
		}
		public GotoStatementContext gotoStatement() {
			return getRuleContext(GotoStatementContext.class,0);
		}
		public EmptyStatement_Context emptyStatement_() {
			return getRuleContext(EmptyStatement_Context.class,0);
		}
		public SimpleStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_simpleStatement; }
	}

	public final SimpleStatementContext simpleStatement() throws RecognitionException {
		SimpleStatementContext _localctx = new SimpleStatementContext(_ctx, getState());
		enterRule(_localctx, 116, RULE_simpleStatement);
		try {
			setState(552);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,38,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(548);
				assignmentStatement();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(549);
				procedureStatement();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(550);
				gotoStatement();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(551);
				emptyStatement_();
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
	public static class AssignmentStatementContext extends ParserRuleContext {
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public TerminalNode ASSIGN() { return getToken(pascalParser.ASSIGN, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public AssignmentStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assignmentStatement; }
	}

	public final AssignmentStatementContext assignmentStatement() throws RecognitionException {
		AssignmentStatementContext _localctx = new AssignmentStatementContext(_ctx, getState());
		enterRule(_localctx, 118, RULE_assignmentStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(554);
			variable();
			setState(555);
			match(ASSIGN);
			setState(556);
			expression();
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
	public static class VariableContext extends ParserRuleContext {
		public TerminalNode AT() { return getToken(pascalParser.AT, 0); }
		public List<IdentificadorContext> identificador() {
			return getRuleContexts(IdentificadorContext.class);
		}
		public IdentificadorContext identificador(int i) {
			return getRuleContext(IdentificadorContext.class,i);
		}
		public List<TerminalNode> COLCHETE_ESQUERDO() { return getTokens(pascalParser.COLCHETE_ESQUERDO); }
		public TerminalNode COLCHETE_ESQUERDO(int i) {
			return getToken(pascalParser.COLCHETE_ESQUERDO, i);
		}
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public List<TerminalNode> COLCHETE_DIREITO() { return getTokens(pascalParser.COLCHETE_DIREITO); }
		public TerminalNode COLCHETE_DIREITO(int i) {
			return getToken(pascalParser.COLCHETE_DIREITO, i);
		}
		public List<TerminalNode> LBRACK2() { return getTokens(pascalParser.LBRACK2); }
		public TerminalNode LBRACK2(int i) {
			return getToken(pascalParser.LBRACK2, i);
		}
		public List<TerminalNode> RBRACK2() { return getTokens(pascalParser.RBRACK2); }
		public TerminalNode RBRACK2(int i) {
			return getToken(pascalParser.RBRACK2, i);
		}
		public List<TerminalNode> DOT() { return getTokens(pascalParser.DOT); }
		public TerminalNode DOT(int i) {
			return getToken(pascalParser.DOT, i);
		}
		public List<TerminalNode> PONTEIRO() { return getTokens(pascalParser.PONTEIRO); }
		public TerminalNode PONTEIRO(int i) {
			return getToken(pascalParser.PONTEIRO, i);
		}
		public List<TerminalNode> VIRGULA() { return getTokens(pascalParser.VIRGULA); }
		public TerminalNode VIRGULA(int i) {
			return getToken(pascalParser.VIRGULA, i);
		}
		public VariableContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_variable; }
	}

	public final VariableContext variable() throws RecognitionException {
		VariableContext _localctx = new VariableContext(_ctx, getState());
		enterRule(_localctx, 120, RULE_variable);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(561);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case AT:
				{
				setState(558);
				match(AT);
				setState(559);
				identificador();
				}
				break;
			case IDENT:
				{
				setState(560);
				identificador();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(590);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & -6485183463413514240L) != 0)) {
				{
				setState(588);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case COLCHETE_ESQUERDO:
					{
					setState(563);
					match(COLCHETE_ESQUERDO);
					setState(564);
					expression();
					setState(569);
					_errHandler.sync(this);
					_la = _input.LA(1);
					while (_la==VIRGULA) {
						{
						{
						setState(565);
						match(VIRGULA);
						setState(566);
						expression();
						}
						}
						setState(571);
						_errHandler.sync(this);
						_la = _input.LA(1);
					}
					setState(572);
					match(COLCHETE_DIREITO);
					}
					break;
				case LBRACK2:
					{
					setState(574);
					match(LBRACK2);
					setState(575);
					expression();
					setState(580);
					_errHandler.sync(this);
					_la = _input.LA(1);
					while (_la==VIRGULA) {
						{
						{
						setState(576);
						match(VIRGULA);
						setState(577);
						expression();
						}
						}
						setState(582);
						_errHandler.sync(this);
						_la = _input.LA(1);
					}
					setState(583);
					match(RBRACK2);
					}
					break;
				case DOT:
					{
					setState(585);
					match(DOT);
					setState(586);
					identificador();
					}
					break;
				case PONTEIRO:
					{
					setState(587);
					match(PONTEIRO);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				setState(592);
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
	public static class ExpressionContext extends ParserRuleContext {
		public SimpleExpressionContext simpleExpression() {
			return getRuleContext(SimpleExpressionContext.class,0);
		}
		public RelationaloperatorContext relationaloperator() {
			return getRuleContext(RelationaloperatorContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public ExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expression; }
	}

	public final ExpressionContext expression() throws RecognitionException {
		ExpressionContext _localctx = new ExpressionContext(_ctx, getState());
		enterRule(_localctx, 122, RULE_expression);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(593);
			simpleExpression();
			setState(597);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 35465847066066944L) != 0)) {
				{
				setState(594);
				relationaloperator();
				setState(595);
				expression();
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
	public static class RelationaloperatorContext extends ParserRuleContext {
		public TerminalNode IGUAL_A() { return getToken(pascalParser.IGUAL_A, 0); }
		public TerminalNode NOT_EQUAL() { return getToken(pascalParser.NOT_EQUAL, 0); }
		public TerminalNode LT() { return getToken(pascalParser.LT, 0); }
		public TerminalNode LE() { return getToken(pascalParser.LE, 0); }
		public TerminalNode GE() { return getToken(pascalParser.GE, 0); }
		public TerminalNode GT() { return getToken(pascalParser.GT, 0); }
		public TerminalNode IN() { return getToken(pascalParser.IN, 0); }
		public RelationaloperatorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_relationaloperator; }
	}

	public final RelationaloperatorContext relationaloperator() throws RecognitionException {
		RelationaloperatorContext _localctx = new RelationaloperatorContext(_ctx, getState());
		enterRule(_localctx, 124, RULE_relationaloperator);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(599);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 35465847066066944L) != 0)) ) {
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
	public static class SimpleExpressionContext extends ParserRuleContext {
		public TermContext term() {
			return getRuleContext(TermContext.class,0);
		}
		public AdditiveoperatorContext additiveoperator() {
			return getRuleContext(AdditiveoperatorContext.class,0);
		}
		public SimpleExpressionContext simpleExpression() {
			return getRuleContext(SimpleExpressionContext.class,0);
		}
		public SimpleExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_simpleExpression; }
	}

	public final SimpleExpressionContext simpleExpression() throws RecognitionException {
		SimpleExpressionContext _localctx = new SimpleExpressionContext(_ctx, getState());
		enterRule(_localctx, 126, RULE_simpleExpression);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(601);
			term();
			setState(605);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 6597136875520L) != 0)) {
				{
				setState(602);
				additiveoperator();
				setState(603);
				simpleExpression();
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
	public static class AdditiveoperatorContext extends ParserRuleContext {
		public TerminalNode SINAL_DE_ADICAO() { return getToken(pascalParser.SINAL_DE_ADICAO, 0); }
		public TerminalNode SINAL_DE_SUBTRACAO() { return getToken(pascalParser.SINAL_DE_SUBTRACAO, 0); }
		public TerminalNode OR() { return getToken(pascalParser.OR, 0); }
		public AdditiveoperatorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_additiveoperator; }
	}

	public final AdditiveoperatorContext additiveoperator() throws RecognitionException {
		AdditiveoperatorContext _localctx = new AdditiveoperatorContext(_ctx, getState());
		enterRule(_localctx, 128, RULE_additiveoperator);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(607);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 6597136875520L) != 0)) ) {
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
	public static class TermContext extends ParserRuleContext {
		public SignedFactorContext signedFactor() {
			return getRuleContext(SignedFactorContext.class,0);
		}
		public MultiplicativeoperatorContext multiplicativeoperator() {
			return getRuleContext(MultiplicativeoperatorContext.class,0);
		}
		public TermContext term() {
			return getRuleContext(TermContext.class,0);
		}
		public TermContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_term; }
	}

	public final TermContext term() throws RecognitionException {
		TermContext _localctx = new TermContext(_ctx, getState());
		enterRule(_localctx, 130, RULE_term);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(609);
			signedFactor();
			setState(613);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 26388283261442L) != 0)) {
				{
				setState(610);
				multiplicativeoperator();
				setState(611);
				term();
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
	public static class MultiplicativeoperatorContext extends ParserRuleContext {
		public TerminalNode STAR() { return getToken(pascalParser.STAR, 0); }
		public TerminalNode SLASH() { return getToken(pascalParser.SLASH, 0); }
		public TerminalNode DIV() { return getToken(pascalParser.DIV, 0); }
		public TerminalNode MOD() { return getToken(pascalParser.MOD, 0); }
		public TerminalNode AND() { return getToken(pascalParser.AND, 0); }
		public MultiplicativeoperatorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_multiplicativeoperator; }
	}

	public final MultiplicativeoperatorContext multiplicativeoperator() throws RecognitionException {
		MultiplicativeoperatorContext _localctx = new MultiplicativeoperatorContext(_ctx, getState());
		enterRule(_localctx, 132, RULE_multiplicativeoperator);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(615);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 26388283261442L) != 0)) ) {
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
	public static class SignedFactorContext extends ParserRuleContext {
		public FactorContext factor() {
			return getRuleContext(FactorContext.class,0);
		}
		public TerminalNode SINAL_DE_ADICAO() { return getToken(pascalParser.SINAL_DE_ADICAO, 0); }
		public TerminalNode SINAL_DE_SUBTRACAO() { return getToken(pascalParser.SINAL_DE_SUBTRACAO, 0); }
		public SignedFactorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_signedFactor; }
	}

	public final SignedFactorContext signedFactor() throws RecognitionException {
		SignedFactorContext _localctx = new SignedFactorContext(_ctx, getState());
		enterRule(_localctx, 134, RULE_signedFactor);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(618);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==SINAL_DE_ADICAO || _la==SINAL_DE_SUBTRACAO) {
				{
				setState(617);
				_la = _input.LA(1);
				if ( !(_la==SINAL_DE_ADICAO || _la==SINAL_DE_SUBTRACAO) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
			}

			setState(620);
			factor();
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
	public static class FactorContext extends ParserRuleContext {
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public TerminalNode PARENTESESESQUERDO() { return getToken(pascalParser.PARENTESESESQUERDO, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode PARENTESESDIREITO() { return getToken(pascalParser.PARENTESESDIREITO, 0); }
		public FunctionDesignatorContext functionDesignator() {
			return getRuleContext(FunctionDesignatorContext.class,0);
		}
		public UnsignedConstantContext unsignedConstant() {
			return getRuleContext(UnsignedConstantContext.class,0);
		}
		public Set_Context set_() {
			return getRuleContext(Set_Context.class,0);
		}
		public TerminalNode NOT() { return getToken(pascalParser.NOT, 0); }
		public FactorContext factor() {
			return getRuleContext(FactorContext.class,0);
		}
		public Bool_Context bool_() {
			return getRuleContext(Bool_Context.class,0);
		}
		public FactorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_factor; }
	}

	public final FactorContext factor() throws RecognitionException {
		FactorContext _localctx = new FactorContext(_ctx, getState());
		enterRule(_localctx, 136, RULE_factor);
		try {
			setState(633);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,48,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(622);
				variable();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(623);
				match(PARENTESESESQUERDO);
				setState(624);
				expression();
				setState(625);
				match(PARENTESESDIREITO);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(627);
				functionDesignator();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(628);
				unsignedConstant();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(629);
				set_();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(630);
				match(NOT);
				setState(631);
				factor();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(632);
				bool_();
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
	public static class UnsignedConstantContext extends ParserRuleContext {
		public NumeroSemSinalContext numeroSemSinal() {
			return getRuleContext(NumeroSemSinalContext.class,0);
		}
		public ConstantChrContext constantChr() {
			return getRuleContext(ConstantChrContext.class,0);
		}
		public StringContext string() {
			return getRuleContext(StringContext.class,0);
		}
		public TerminalNode NIL() { return getToken(pascalParser.NIL, 0); }
		public UnsignedConstantContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_unsignedConstant; }
	}

	public final UnsignedConstantContext unsignedConstant() throws RecognitionException {
		UnsignedConstantContext _localctx = new UnsignedConstantContext(_ctx, getState());
		enterRule(_localctx, 138, RULE_unsignedConstant);
		try {
			setState(639);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case NUM_INT:
			case NUM_REAL:
				enterOuterAlt(_localctx, 1);
				{
				setState(635);
				numeroSemSinal();
				}
				break;
			case CHR:
				enterOuterAlt(_localctx, 2);
				{
				setState(636);
				constantChr();
				}
				break;
			case STRING_LITERAL:
				enterOuterAlt(_localctx, 3);
				{
				setState(637);
				string();
				}
				break;
			case NIL:
				enterOuterAlt(_localctx, 4);
				{
				setState(638);
				match(NIL);
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
	public static class FunctionDesignatorContext extends ParserRuleContext {
		public IdentificadorContext identificador() {
			return getRuleContext(IdentificadorContext.class,0);
		}
		public TerminalNode PARENTESESESQUERDO() { return getToken(pascalParser.PARENTESESESQUERDO, 0); }
		public ParameterListContext parameterList() {
			return getRuleContext(ParameterListContext.class,0);
		}
		public TerminalNode PARENTESESDIREITO() { return getToken(pascalParser.PARENTESESDIREITO, 0); }
		public FunctionDesignatorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionDesignator; }
	}

	public final FunctionDesignatorContext functionDesignator() throws RecognitionException {
		FunctionDesignatorContext _localctx = new FunctionDesignatorContext(_ctx, getState());
		enterRule(_localctx, 140, RULE_functionDesignator);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(641);
			identificador();
			setState(642);
			match(PARENTESESESQUERDO);
			setState(643);
			parameterList();
			setState(644);
			match(PARENTESESDIREITO);
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
	public static class ParameterListContext extends ParserRuleContext {
		public List<ActualParameterContext> actualParameter() {
			return getRuleContexts(ActualParameterContext.class);
		}
		public ActualParameterContext actualParameter(int i) {
			return getRuleContext(ActualParameterContext.class,i);
		}
		public List<TerminalNode> VIRGULA() { return getTokens(pascalParser.VIRGULA); }
		public TerminalNode VIRGULA(int i) {
			return getToken(pascalParser.VIRGULA, i);
		}
		public ParameterListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_parameterList; }
	}

	public final ParameterListContext parameterList() throws RecognitionException {
		ParameterListContext _localctx = new ParameterListContext(_ctx, getState());
		enterRule(_localctx, 142, RULE_parameterList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(646);
			actualParameter();
			setState(651);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==VIRGULA) {
				{
				{
				setState(647);
				match(VIRGULA);
				setState(648);
				actualParameter();
				}
				}
				setState(653);
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
	public static class Set_Context extends ParserRuleContext {
		public TerminalNode COLCHETE_ESQUERDO() { return getToken(pascalParser.COLCHETE_ESQUERDO, 0); }
		public ElementListContext elementList() {
			return getRuleContext(ElementListContext.class,0);
		}
		public TerminalNode COLCHETE_DIREITO() { return getToken(pascalParser.COLCHETE_DIREITO, 0); }
		public TerminalNode LBRACK2() { return getToken(pascalParser.LBRACK2, 0); }
		public TerminalNode RBRACK2() { return getToken(pascalParser.RBRACK2, 0); }
		public Set_Context(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_set_; }
	}

	public final Set_Context set_() throws RecognitionException {
		Set_Context _localctx = new Set_Context(_ctx, getState());
		enterRule(_localctx, 144, RULE_set_);
		try {
			setState(662);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case COLCHETE_ESQUERDO:
				enterOuterAlt(_localctx, 1);
				{
				setState(654);
				match(COLCHETE_ESQUERDO);
				setState(655);
				elementList();
				setState(656);
				match(COLCHETE_DIREITO);
				}
				break;
			case LBRACK2:
				enterOuterAlt(_localctx, 2);
				{
				setState(658);
				match(LBRACK2);
				setState(659);
				elementList();
				setState(660);
				match(RBRACK2);
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
	public static class ElementListContext extends ParserRuleContext {
		public List<ElementContext> element() {
			return getRuleContexts(ElementContext.class);
		}
		public ElementContext element(int i) {
			return getRuleContext(ElementContext.class,i);
		}
		public List<TerminalNode> VIRGULA() { return getTokens(pascalParser.VIRGULA); }
		public TerminalNode VIRGULA(int i) {
			return getToken(pascalParser.VIRGULA, i);
		}
		public ElementListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_elementList; }
	}

	public final ElementListContext elementList() throws RecognitionException {
		ElementListContext _localctx = new ElementListContext(_ctx, getState());
		enterRule(_localctx, 146, RULE_elementList);
		int _la;
		try {
			setState(673);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case CHR:
			case NIL:
			case NOT:
			case SINAL_DE_ADICAO:
			case SINAL_DE_SUBTRACAO:
			case PARENTESESESQUERDO:
			case COLCHETE_ESQUERDO:
			case LBRACK2:
			case AT:
			case TRUE:
			case FALSE:
			case IDENT:
			case STRING_LITERAL:
			case NUM_INT:
			case NUM_REAL:
				enterOuterAlt(_localctx, 1);
				{
				setState(664);
				element();
				setState(669);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==VIRGULA) {
					{
					{
					setState(665);
					match(VIRGULA);
					setState(666);
					element();
					}
					}
					setState(671);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				break;
			case COLCHETE_DIREITO:
			case RBRACK2:
				enterOuterAlt(_localctx, 2);
				{
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
	public static class ElementContext extends ParserRuleContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode PONTO_E_PONTO() { return getToken(pascalParser.PONTO_E_PONTO, 0); }
		public ElementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_element; }
	}

	public final ElementContext element() throws RecognitionException {
		ElementContext _localctx = new ElementContext(_ctx, getState());
		enterRule(_localctx, 148, RULE_element);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(675);
			expression();
			setState(678);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==PONTO_E_PONTO) {
				{
				setState(676);
				match(PONTO_E_PONTO);
				setState(677);
				expression();
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
	public static class ProcedureStatementContext extends ParserRuleContext {
		public IdentificadorContext identificador() {
			return getRuleContext(IdentificadorContext.class,0);
		}
		public TerminalNode PARENTESESESQUERDO() { return getToken(pascalParser.PARENTESESESQUERDO, 0); }
		public ParameterListContext parameterList() {
			return getRuleContext(ParameterListContext.class,0);
		}
		public TerminalNode PARENTESESDIREITO() { return getToken(pascalParser.PARENTESESDIREITO, 0); }
		public ProcedureStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procedureStatement; }
	}

	public final ProcedureStatementContext procedureStatement() throws RecognitionException {
		ProcedureStatementContext _localctx = new ProcedureStatementContext(_ctx, getState());
		enterRule(_localctx, 150, RULE_procedureStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(680);
			identificador();
			setState(685);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==PARENTESESESQUERDO) {
				{
				setState(681);
				match(PARENTESESESQUERDO);
				setState(682);
				parameterList();
				setState(683);
				match(PARENTESESDIREITO);
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
	public static class ActualParameterContext extends ParserRuleContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public List<ParameterwidthContext> parameterwidth() {
			return getRuleContexts(ParameterwidthContext.class);
		}
		public ParameterwidthContext parameterwidth(int i) {
			return getRuleContext(ParameterwidthContext.class,i);
		}
		public ActualParameterContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_actualParameter; }
	}

	public final ActualParameterContext actualParameter() throws RecognitionException {
		ActualParameterContext _localctx = new ActualParameterContext(_ctx, getState());
		enterRule(_localctx, 152, RULE_actualParameter);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(687);
			expression();
			setState(691);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==DOIS_PONTOS) {
				{
				{
				setState(688);
				parameterwidth();
				}
				}
				setState(693);
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
	public static class ParameterwidthContext extends ParserRuleContext {
		public TerminalNode DOIS_PONTOS() { return getToken(pascalParser.DOIS_PONTOS, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public ParameterwidthContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_parameterwidth; }
	}

	public final ParameterwidthContext parameterwidth() throws RecognitionException {
		ParameterwidthContext _localctx = new ParameterwidthContext(_ctx, getState());
		enterRule(_localctx, 154, RULE_parameterwidth);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(694);
			match(DOIS_PONTOS);
			setState(695);
			expression();
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
	public static class GotoStatementContext extends ParserRuleContext {
		public TerminalNode GOTO() { return getToken(pascalParser.GOTO, 0); }
		public LabelContext label() {
			return getRuleContext(LabelContext.class,0);
		}
		public GotoStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_gotoStatement; }
	}

	public final GotoStatementContext gotoStatement() throws RecognitionException {
		GotoStatementContext _localctx = new GotoStatementContext(_ctx, getState());
		enterRule(_localctx, 156, RULE_gotoStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(697);
			match(GOTO);
			setState(698);
			label();
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
	public static class EmptyStatement_Context extends ParserRuleContext {
		public EmptyStatement_Context(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_emptyStatement_; }
	}

	public final EmptyStatement_Context emptyStatement_() throws RecognitionException {
		EmptyStatement_Context _localctx = new EmptyStatement_Context(_ctx, getState());
		enterRule(_localctx, 158, RULE_emptyStatement_);
		try {
			enterOuterAlt(_localctx, 1);
			{
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
	public static class Empty_Context extends ParserRuleContext {
		public Empty_Context(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_empty_; }
	}

	public final Empty_Context empty_() throws RecognitionException {
		Empty_Context _localctx = new Empty_Context(_ctx, getState());
		enterRule(_localctx, 160, RULE_empty_);
		try {
			enterOuterAlt(_localctx, 1);
			{
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
	public static class StructuredStatementContext extends ParserRuleContext {
		public CompoundStatementContext compoundStatement() {
			return getRuleContext(CompoundStatementContext.class,0);
		}
		public ConditionalStatementContext conditionalStatement() {
			return getRuleContext(ConditionalStatementContext.class,0);
		}
		public RepetetiveStatementContext repetetiveStatement() {
			return getRuleContext(RepetetiveStatementContext.class,0);
		}
		public WithStatementContext withStatement() {
			return getRuleContext(WithStatementContext.class,0);
		}
		public StructuredStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_structuredStatement; }
	}

	public final StructuredStatementContext structuredStatement() throws RecognitionException {
		StructuredStatementContext _localctx = new StructuredStatementContext(_ctx, getState());
		enterRule(_localctx, 162, RULE_structuredStatement);
		try {
			setState(708);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case BEGIN:
				enterOuterAlt(_localctx, 1);
				{
				setState(704);
				compoundStatement();
				}
				break;
			case CASE:
			case IF:
				enterOuterAlt(_localctx, 2);
				{
				setState(705);
				conditionalStatement();
				}
				break;
			case FOR:
			case REPEAT:
			case WHILE:
				enterOuterAlt(_localctx, 3);
				{
				setState(706);
				repetetiveStatement();
				}
				break;
			case WITH:
				enterOuterAlt(_localctx, 4);
				{
				setState(707);
				withStatement();
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
	public static class CompoundStatementContext extends ParserRuleContext {
		public TerminalNode BEGIN() { return getToken(pascalParser.BEGIN, 0); }
		public StatementsContext statements() {
			return getRuleContext(StatementsContext.class,0);
		}
		public TerminalNode END() { return getToken(pascalParser.END, 0); }
		public CompoundStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_compoundStatement; }
	}

	public final CompoundStatementContext compoundStatement() throws RecognitionException {
		CompoundStatementContext _localctx = new CompoundStatementContext(_ctx, getState());
		enterRule(_localctx, 164, RULE_compoundStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(710);
			match(BEGIN);
			setState(711);
			statements();
			setState(712);
			match(END);
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
	public static class StatementsContext extends ParserRuleContext {
		public List<StatementContext> statement() {
			return getRuleContexts(StatementContext.class);
		}
		public StatementContext statement(int i) {
			return getRuleContext(StatementContext.class,i);
		}
		public List<TerminalNode> SEMI() { return getTokens(pascalParser.SEMI); }
		public TerminalNode SEMI(int i) {
			return getToken(pascalParser.SEMI, i);
		}
		public StatementsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_statements; }
	}

	public final StatementsContext statements() throws RecognitionException {
		StatementsContext _localctx = new StatementsContext(_ctx, getState());
		enterRule(_localctx, 166, RULE_statements);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(714);
			statement();
			setState(719);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==SEMI) {
				{
				{
				setState(715);
				match(SEMI);
				setState(716);
				statement();
				}
				}
				setState(721);
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
	public static class ConditionalStatementContext extends ParserRuleContext {
		public IfStatementContext ifStatement() {
			return getRuleContext(IfStatementContext.class,0);
		}
		public CaseStatementContext caseStatement() {
			return getRuleContext(CaseStatementContext.class,0);
		}
		public ConditionalStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_conditionalStatement; }
	}

	public final ConditionalStatementContext conditionalStatement() throws RecognitionException {
		ConditionalStatementContext _localctx = new ConditionalStatementContext(_ctx, getState());
		enterRule(_localctx, 168, RULE_conditionalStatement);
		try {
			setState(724);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case IF:
				enterOuterAlt(_localctx, 1);
				{
				setState(722);
				ifStatement();
				}
				break;
			case CASE:
				enterOuterAlt(_localctx, 2);
				{
				setState(723);
				caseStatement();
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
	public static class IfStatementContext extends ParserRuleContext {
		public TerminalNode IF() { return getToken(pascalParser.IF, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode THEN() { return getToken(pascalParser.THEN, 0); }
		public List<StatementContext> statement() {
			return getRuleContexts(StatementContext.class);
		}
		public StatementContext statement(int i) {
			return getRuleContext(StatementContext.class,i);
		}
		public TerminalNode ELSE() { return getToken(pascalParser.ELSE, 0); }
		public IfStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ifStatement; }
	}

	public final IfStatementContext ifStatement() throws RecognitionException {
		IfStatementContext _localctx = new IfStatementContext(_ctx, getState());
		enterRule(_localctx, 170, RULE_ifStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(726);
			match(IF);
			setState(727);
			expression();
			setState(728);
			match(THEN);
			setState(729);
			statement();
			setState(732);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,60,_ctx) ) {
			case 1:
				{
				setState(730);
				match(ELSE);
				setState(731);
				statement();
				}
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
	public static class CaseStatementContext extends ParserRuleContext {
		public TerminalNode CASE() { return getToken(pascalParser.CASE, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode OF() { return getToken(pascalParser.OF, 0); }
		public List<CaseListElementContext> caseListElement() {
			return getRuleContexts(CaseListElementContext.class);
		}
		public CaseListElementContext caseListElement(int i) {
			return getRuleContext(CaseListElementContext.class,i);
		}
		public TerminalNode END() { return getToken(pascalParser.END, 0); }
		public List<TerminalNode> SEMI() { return getTokens(pascalParser.SEMI); }
		public TerminalNode SEMI(int i) {
			return getToken(pascalParser.SEMI, i);
		}
		public TerminalNode ELSE() { return getToken(pascalParser.ELSE, 0); }
		public StatementsContext statements() {
			return getRuleContext(StatementsContext.class,0);
		}
		public CaseStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_caseStatement; }
	}

	public final CaseStatementContext caseStatement() throws RecognitionException {
		CaseStatementContext _localctx = new CaseStatementContext(_ctx, getState());
		enterRule(_localctx, 172, RULE_caseStatement);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(734);
			match(CASE);
			setState(735);
			expression();
			setState(736);
			match(OF);
			setState(737);
			caseListElement();
			setState(742);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,61,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(738);
					match(SEMI);
					setState(739);
					caseListElement();
					}
					} 
				}
				setState(744);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,61,_ctx);
			}
			setState(748);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==SEMI) {
				{
				setState(745);
				match(SEMI);
				setState(746);
				match(ELSE);
				setState(747);
				statements();
				}
			}

			setState(750);
			match(END);
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
	public static class CaseListElementContext extends ParserRuleContext {
		public ConstListContext constList() {
			return getRuleContext(ConstListContext.class,0);
		}
		public TerminalNode DOIS_PONTOS() { return getToken(pascalParser.DOIS_PONTOS, 0); }
		public StatementContext statement() {
			return getRuleContext(StatementContext.class,0);
		}
		public CaseListElementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_caseListElement; }
	}

	public final CaseListElementContext caseListElement() throws RecognitionException {
		CaseListElementContext _localctx = new CaseListElementContext(_ctx, getState());
		enterRule(_localctx, 174, RULE_caseListElement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(752);
			constList();
			setState(753);
			match(DOIS_PONTOS);
			setState(754);
			statement();
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
	public static class RepetetiveStatementContext extends ParserRuleContext {
		public WhileStatementContext whileStatement() {
			return getRuleContext(WhileStatementContext.class,0);
		}
		public RepeatStatementContext repeatStatement() {
			return getRuleContext(RepeatStatementContext.class,0);
		}
		public ForStatementContext forStatement() {
			return getRuleContext(ForStatementContext.class,0);
		}
		public RepetetiveStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_repetetiveStatement; }
	}

	public final RepetetiveStatementContext repetetiveStatement() throws RecognitionException {
		RepetetiveStatementContext _localctx = new RepetetiveStatementContext(_ctx, getState());
		enterRule(_localctx, 176, RULE_repetetiveStatement);
		try {
			setState(759);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case WHILE:
				enterOuterAlt(_localctx, 1);
				{
				setState(756);
				whileStatement();
				}
				break;
			case REPEAT:
				enterOuterAlt(_localctx, 2);
				{
				setState(757);
				repeatStatement();
				}
				break;
			case FOR:
				enterOuterAlt(_localctx, 3);
				{
				setState(758);
				forStatement();
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
	public static class WhileStatementContext extends ParserRuleContext {
		public TerminalNode WHILE() { return getToken(pascalParser.WHILE, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode DO() { return getToken(pascalParser.DO, 0); }
		public StatementContext statement() {
			return getRuleContext(StatementContext.class,0);
		}
		public WhileStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_whileStatement; }
	}

	public final WhileStatementContext whileStatement() throws RecognitionException {
		WhileStatementContext _localctx = new WhileStatementContext(_ctx, getState());
		enterRule(_localctx, 178, RULE_whileStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(761);
			match(WHILE);
			setState(762);
			expression();
			setState(763);
			match(DO);
			setState(764);
			statement();
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
	public static class RepeatStatementContext extends ParserRuleContext {
		public TerminalNode REPEAT() { return getToken(pascalParser.REPEAT, 0); }
		public StatementsContext statements() {
			return getRuleContext(StatementsContext.class,0);
		}
		public TerminalNode UNTIL() { return getToken(pascalParser.UNTIL, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public RepeatStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_repeatStatement; }
	}

	public final RepeatStatementContext repeatStatement() throws RecognitionException {
		RepeatStatementContext _localctx = new RepeatStatementContext(_ctx, getState());
		enterRule(_localctx, 180, RULE_repeatStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(766);
			match(REPEAT);
			setState(767);
			statements();
			setState(768);
			match(UNTIL);
			setState(769);
			expression();
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
	public static class ForStatementContext extends ParserRuleContext {
		public TerminalNode FOR() { return getToken(pascalParser.FOR, 0); }
		public IdentificadorContext identificador() {
			return getRuleContext(IdentificadorContext.class,0);
		}
		public TerminalNode ASSIGN() { return getToken(pascalParser.ASSIGN, 0); }
		public ForListContext forList() {
			return getRuleContext(ForListContext.class,0);
		}
		public TerminalNode DO() { return getToken(pascalParser.DO, 0); }
		public StatementContext statement() {
			return getRuleContext(StatementContext.class,0);
		}
		public ForStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_forStatement; }
	}

	public final ForStatementContext forStatement() throws RecognitionException {
		ForStatementContext _localctx = new ForStatementContext(_ctx, getState());
		enterRule(_localctx, 182, RULE_forStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(771);
			match(FOR);
			setState(772);
			identificador();
			setState(773);
			match(ASSIGN);
			setState(774);
			forList();
			setState(775);
			match(DO);
			setState(776);
			statement();
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
	public static class ForListContext extends ParserRuleContext {
		public InitialValueContext initialValue() {
			return getRuleContext(InitialValueContext.class,0);
		}
		public FinalValueContext finalValue() {
			return getRuleContext(FinalValueContext.class,0);
		}
		public TerminalNode TO() { return getToken(pascalParser.TO, 0); }
		public TerminalNode DOWNTO() { return getToken(pascalParser.DOWNTO, 0); }
		public ForListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_forList; }
	}

	public final ForListContext forList() throws RecognitionException {
		ForListContext _localctx = new ForListContext(_ctx, getState());
		enterRule(_localctx, 184, RULE_forList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(778);
			initialValue();
			setState(779);
			_la = _input.LA(1);
			if ( !(_la==DOWNTO || _la==TO) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			setState(780);
			finalValue();
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
	public static class InitialValueContext extends ParserRuleContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public InitialValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_initialValue; }
	}

	public final InitialValueContext initialValue() throws RecognitionException {
		InitialValueContext _localctx = new InitialValueContext(_ctx, getState());
		enterRule(_localctx, 186, RULE_initialValue);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(782);
			expression();
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
	public static class FinalValueContext extends ParserRuleContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public FinalValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_finalValue; }
	}

	public final FinalValueContext finalValue() throws RecognitionException {
		FinalValueContext _localctx = new FinalValueContext(_ctx, getState());
		enterRule(_localctx, 188, RULE_finalValue);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(784);
			expression();
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
	public static class WithStatementContext extends ParserRuleContext {
		public TerminalNode WITH() { return getToken(pascalParser.WITH, 0); }
		public RecordVariableListContext recordVariableList() {
			return getRuleContext(RecordVariableListContext.class,0);
		}
		public TerminalNode DO() { return getToken(pascalParser.DO, 0); }
		public StatementContext statement() {
			return getRuleContext(StatementContext.class,0);
		}
		public WithStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_withStatement; }
	}

	public final WithStatementContext withStatement() throws RecognitionException {
		WithStatementContext _localctx = new WithStatementContext(_ctx, getState());
		enterRule(_localctx, 190, RULE_withStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(786);
			match(WITH);
			setState(787);
			recordVariableList();
			setState(788);
			match(DO);
			setState(789);
			statement();
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
	public static class RecordVariableListContext extends ParserRuleContext {
		public List<VariableContext> variable() {
			return getRuleContexts(VariableContext.class);
		}
		public VariableContext variable(int i) {
			return getRuleContext(VariableContext.class,i);
		}
		public List<TerminalNode> VIRGULA() { return getTokens(pascalParser.VIRGULA); }
		public TerminalNode VIRGULA(int i) {
			return getToken(pascalParser.VIRGULA, i);
		}
		public RecordVariableListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_recordVariableList; }
	}

	public final RecordVariableListContext recordVariableList() throws RecognitionException {
		RecordVariableListContext _localctx = new RecordVariableListContext(_ctx, getState());
		enterRule(_localctx, 192, RULE_recordVariableList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(791);
			variable();
			setState(796);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==VIRGULA) {
				{
				{
				setState(792);
				match(VIRGULA);
				setState(793);
				variable();
				}
				}
				setState(798);
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

	public static final String _serializedATN =
		"\u0004\u0001P\u0320\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
		"\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004\u0002"+
		"\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007\u0007\u0007\u0002"+
		"\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b\u0007\u000b\u0002"+
		"\f\u0007\f\u0002\r\u0007\r\u0002\u000e\u0007\u000e\u0002\u000f\u0007\u000f"+
		"\u0002\u0010\u0007\u0010\u0002\u0011\u0007\u0011\u0002\u0012\u0007\u0012"+
		"\u0002\u0013\u0007\u0013\u0002\u0014\u0007\u0014\u0002\u0015\u0007\u0015"+
		"\u0002\u0016\u0007\u0016\u0002\u0017\u0007\u0017\u0002\u0018\u0007\u0018"+
		"\u0002\u0019\u0007\u0019\u0002\u001a\u0007\u001a\u0002\u001b\u0007\u001b"+
		"\u0002\u001c\u0007\u001c\u0002\u001d\u0007\u001d\u0002\u001e\u0007\u001e"+
		"\u0002\u001f\u0007\u001f\u0002 \u0007 \u0002!\u0007!\u0002\"\u0007\"\u0002"+
		"#\u0007#\u0002$\u0007$\u0002%\u0007%\u0002&\u0007&\u0002\'\u0007\'\u0002"+
		"(\u0007(\u0002)\u0007)\u0002*\u0007*\u0002+\u0007+\u0002,\u0007,\u0002"+
		"-\u0007-\u0002.\u0007.\u0002/\u0007/\u00020\u00070\u00021\u00071\u0002"+
		"2\u00072\u00023\u00073\u00024\u00074\u00025\u00075\u00026\u00076\u0002"+
		"7\u00077\u00028\u00078\u00029\u00079\u0002:\u0007:\u0002;\u0007;\u0002"+
		"<\u0007<\u0002=\u0007=\u0002>\u0007>\u0002?\u0007?\u0002@\u0007@\u0002"+
		"A\u0007A\u0002B\u0007B\u0002C\u0007C\u0002D\u0007D\u0002E\u0007E\u0002"+
		"F\u0007F\u0002G\u0007G\u0002H\u0007H\u0002I\u0007I\u0002J\u0007J\u0002"+
		"K\u0007K\u0002L\u0007L\u0002M\u0007M\u0002N\u0007N\u0002O\u0007O\u0002"+
		"P\u0007P\u0002Q\u0007Q\u0002R\u0007R\u0002S\u0007S\u0002T\u0007T\u0002"+
		"U\u0007U\u0002V\u0007V\u0002W\u0007W\u0002X\u0007X\u0002Y\u0007Y\u0002"+
		"Z\u0007Z\u0002[\u0007[\u0002\\\u0007\\\u0002]\u0007]\u0002^\u0007^\u0002"+
		"_\u0007_\u0002`\u0007`\u0001\u0000\u0001\u0000\u0003\u0000\u00c5\b\u0000"+
		"\u0001\u0000\u0001\u0000\u0001\u0000\u0001\u0000\u0001\u0001\u0001\u0001"+
		"\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0003\u0001\u00d1\b\u0001"+
		"\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001"+
		"\u0003\u0001\u00d9\b\u0001\u0001\u0002\u0001\u0002\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0005\u0003"+
		"\u00e4\b\u0003\n\u0003\f\u0003\u00e7\t\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0005\u0001\u0005\u0001"+
		"\u0005\u0001\u0005\u0005\u0005\u00f3\b\u0005\n\u0005\f\u0005\u00f6\t\u0005"+
		"\u0001\u0005\u0001\u0005\u0001\u0006\u0001\u0006\u0001\u0007\u0001\u0007"+
		"\u0001\u0007\u0001\u0007\u0004\u0007\u0100\b\u0007\u000b\u0007\f\u0007"+
		"\u0101\u0001\b\u0001\b\u0001\b\u0001\b\u0001\t\u0001\t\u0001\t\u0001\t"+
		"\u0001\t\u0001\n\u0001\n\u0001\n\u0001\n\u0001\n\u0001\n\u0001\n\u0001"+
		"\n\u0001\n\u0001\n\u0003\n\u0117\b\n\u0001\u000b\u0001\u000b\u0003\u000b"+
		"\u011b\b\u000b\u0001\f\u0001\f\u0001\r\u0001\r\u0001\u000e\u0001\u000e"+
		"\u0001\u000f\u0001\u000f\u0001\u0010\u0001\u0010\u0001\u0011\u0001\u0011"+
		"\u0001\u0011\u0001\u0011\u0004\u0011\u012b\b\u0011\u000b\u0011\f\u0011"+
		"\u012c\u0001\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0003"+
		"\u0012\u0134\b\u0012\u0001\u0013\u0001\u0013\u0003\u0013\u0138\b\u0013"+
		"\u0001\u0013\u0001\u0013\u0001\u0013\u0001\u0014\u0001\u0014\u0003\u0014"+
		"\u013f\b\u0014\u0001\u0015\u0001\u0015\u0001\u0015\u0003\u0015\u0144\b"+
		"\u0015\u0001\u0016\u0001\u0016\u0001\u0016\u0001\u0016\u0003\u0016\u014a"+
		"\b\u0016\u0001\u0017\u0001\u0017\u0001\u0017\u0001\u0017\u0001\u0018\u0001"+
		"\u0018\u0001\u0018\u0001\u0018\u0001\u0019\u0001\u0019\u0003\u0019\u0156"+
		"\b\u0019\u0001\u001a\u0001\u001a\u0001\u001a\u0003\u001a\u015b\b\u001a"+
		"\u0001\u001b\u0001\u001b\u0001\u001b\u0001\u001b\u0003\u001b\u0161\b\u001b"+
		"\u0001\u001c\u0001\u001c\u0001\u001c\u0001\u001c\u0003\u001c\u0167\b\u001c"+
		"\u0001\u001c\u0001\u001c\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001d"+
		"\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001d"+
		"\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0003\u001d\u0179\b\u001d"+
		"\u0001\u001e\u0001\u001e\u0001\u001e\u0005\u001e\u017e\b\u001e\n\u001e"+
		"\f\u001e\u0181\t\u001e\u0001\u001f\u0001\u001f\u0001 \u0001 \u0001!\u0001"+
		"!\u0003!\u0189\b!\u0001!\u0001!\u0001\"\u0001\"\u0001\"\u0003\"\u0190"+
		"\b\"\u0001\"\u0003\"\u0193\b\"\u0001#\u0001#\u0001#\u0005#\u0198\b#\n"+
		"#\f#\u019b\t#\u0001$\u0001$\u0001$\u0001$\u0001%\u0001%\u0001%\u0001%"+
		"\u0001%\u0001%\u0005%\u01a7\b%\n%\f%\u01aa\t%\u0001&\u0001&\u0001&\u0001"+
		"&\u0001&\u0003&\u01b1\b&\u0001\'\u0001\'\u0001\'\u0001\'\u0001\'\u0001"+
		"\'\u0001(\u0001(\u0001(\u0001(\u0001)\u0001)\u0001*\u0001*\u0001*\u0001"+
		"*\u0003*\u01c3\b*\u0001+\u0001+\u0001+\u0001,\u0001,\u0001,\u0001,\u0005"+
		",\u01cc\b,\n,\f,\u01cf\t,\u0001,\u0001,\u0001-\u0001-\u0001-\u0001-\u0001"+
		".\u0001.\u0001.\u0001/\u0001/\u0003/\u01dc\b/\u00010\u00010\u00010\u0003"+
		"0\u01e1\b0\u00010\u00010\u00010\u00011\u00011\u00011\u00011\u00051\u01ea"+
		"\b1\n1\f1\u01ed\t1\u00011\u00011\u00012\u00012\u00012\u00012\u00012\u0001"+
		"2\u00012\u00032\u01f8\b2\u00013\u00013\u00013\u00013\u00014\u00014\u0001"+
		"4\u00054\u0201\b4\n4\f4\u0204\t4\u00015\u00015\u00015\u00055\u0209\b5"+
		"\n5\f5\u020c\t5\u00016\u00016\u00016\u00036\u0211\b6\u00016\u00016\u0001"+
		"6\u00016\u00016\u00017\u00017\u00018\u00018\u00018\u00018\u00018\u0003"+
		"8\u021f\b8\u00019\u00019\u00039\u0223\b9\u0001:\u0001:\u0001:\u0001:\u0003"+
		":\u0229\b:\u0001;\u0001;\u0001;\u0001;\u0001<\u0001<\u0001<\u0003<\u0232"+
		"\b<\u0001<\u0001<\u0001<\u0001<\u0005<\u0238\b<\n<\f<\u023b\t<\u0001<"+
		"\u0001<\u0001<\u0001<\u0001<\u0001<\u0005<\u0243\b<\n<\f<\u0246\t<\u0001"+
		"<\u0001<\u0001<\u0001<\u0001<\u0005<\u024d\b<\n<\f<\u0250\t<\u0001=\u0001"+
		"=\u0001=\u0001=\u0003=\u0256\b=\u0001>\u0001>\u0001?\u0001?\u0001?\u0001"+
		"?\u0003?\u025e\b?\u0001@\u0001@\u0001A\u0001A\u0001A\u0001A\u0003A\u0266"+
		"\bA\u0001B\u0001B\u0001C\u0003C\u026b\bC\u0001C\u0001C\u0001D\u0001D\u0001"+
		"D\u0001D\u0001D\u0001D\u0001D\u0001D\u0001D\u0001D\u0001D\u0003D\u027a"+
		"\bD\u0001E\u0001E\u0001E\u0001E\u0003E\u0280\bE\u0001F\u0001F\u0001F\u0001"+
		"F\u0001F\u0001G\u0001G\u0001G\u0005G\u028a\bG\nG\fG\u028d\tG\u0001H\u0001"+
		"H\u0001H\u0001H\u0001H\u0001H\u0001H\u0001H\u0003H\u0297\bH\u0001I\u0001"+
		"I\u0001I\u0005I\u029c\bI\nI\fI\u029f\tI\u0001I\u0003I\u02a2\bI\u0001J"+
		"\u0001J\u0001J\u0003J\u02a7\bJ\u0001K\u0001K\u0001K\u0001K\u0001K\u0003"+
		"K\u02ae\bK\u0001L\u0001L\u0005L\u02b2\bL\nL\fL\u02b5\tL\u0001M\u0001M"+
		"\u0001M\u0001N\u0001N\u0001N\u0001O\u0001O\u0001P\u0001P\u0001Q\u0001"+
		"Q\u0001Q\u0001Q\u0003Q\u02c5\bQ\u0001R\u0001R\u0001R\u0001R\u0001S\u0001"+
		"S\u0001S\u0005S\u02ce\bS\nS\fS\u02d1\tS\u0001T\u0001T\u0003T\u02d5\bT"+
		"\u0001U\u0001U\u0001U\u0001U\u0001U\u0001U\u0003U\u02dd\bU\u0001V\u0001"+
		"V\u0001V\u0001V\u0001V\u0001V\u0005V\u02e5\bV\nV\fV\u02e8\tV\u0001V\u0001"+
		"V\u0001V\u0003V\u02ed\bV\u0001V\u0001V\u0001W\u0001W\u0001W\u0001W\u0001"+
		"X\u0001X\u0001X\u0003X\u02f8\bX\u0001Y\u0001Y\u0001Y\u0001Y\u0001Y\u0001"+
		"Z\u0001Z\u0001Z\u0001Z\u0001Z\u0001[\u0001[\u0001[\u0001[\u0001[\u0001"+
		"[\u0001[\u0001\\\u0001\\\u0001\\\u0001\\\u0001]\u0001]\u0001^\u0001^\u0001"+
		"_\u0001_\u0001_\u0001_\u0001_\u0001`\u0001`\u0001`\u0005`\u031b\b`\n`"+
		"\f`\u031e\t`\u0001`\u0000\u0000a\u0000\u0002\u0004\u0006\b\n\f\u000e\u0010"+
		"\u0012\u0014\u0016\u0018\u001a\u001c\u001e \"$&(*,.02468:<>@BDFHJLNPR"+
		"TVXZ\\^`bdfhjlnprtvxz|~\u0080\u0082\u0084\u0086\u0088\u008a\u008c\u008e"+
		"\u0090\u0092\u0094\u0096\u0098\u009a\u009c\u009e\u00a0\u00a2\u00a4\u00a6"+
		"\u00a8\u00aa\u00ac\u00ae\u00b0\u00b2\u00b4\u00b6\u00b8\u00ba\u00bc\u00be"+
		"\u00c0\u0000\u0007\u0001\u0000)*\u0001\u0000HI\u0005\u0000\u0004\u0004"+
		"\u0006\u0006\u0014\u0014\u001e\u001eFF\u0002\u0000\u0013\u001316\u0002"+
		"\u0000\u001a\u001a)*\u0004\u0000\u0001\u0001\t\t\u0016\u0016+,\u0002\u0000"+
		"\u000b\u000b##\u031e\u0000\u00c2\u0001\u0000\u0000\u0000\u0002\u00d8\u0001"+
		"\u0000\u0000\u0000\u0004\u00da\u0001\u0000\u0000\u0000\u0006\u00e5\u0001"+
		"\u0000\u0000\u0000\b\u00ea\u0001\u0000\u0000\u0000\n\u00ee\u0001\u0000"+
		"\u0000\u0000\f\u00f9\u0001\u0000\u0000\u0000\u000e\u00fb\u0001\u0000\u0000"+
		"\u0000\u0010\u0103\u0001\u0000\u0000\u0000\u0012\u0107\u0001\u0000\u0000"+
		"\u0000\u0014\u0116\u0001\u0000\u0000\u0000\u0016\u011a\u0001\u0000\u0000"+
		"\u0000\u0018\u011c\u0001\u0000\u0000\u0000\u001a\u011e\u0001\u0000\u0000"+
		"\u0000\u001c\u0120\u0001\u0000\u0000\u0000\u001e\u0122\u0001\u0000\u0000"+
		"\u0000 \u0124\u0001\u0000\u0000\u0000\"\u0126\u0001\u0000\u0000\u0000"+
		"$\u012e\u0001\u0000\u0000\u0000&\u0135\u0001\u0000\u0000\u0000(\u013c"+
		"\u0001\u0000\u0000\u0000*\u0143\u0001\u0000\u0000\u0000,\u0149\u0001\u0000"+
		"\u0000\u0000.\u014b\u0001\u0000\u0000\u00000\u014f\u0001\u0000\u0000\u0000"+
		"2\u0155\u0001\u0000\u0000\u00004\u015a\u0001\u0000\u0000\u00006\u0160"+
		"\u0001\u0000\u0000\u00008\u0162\u0001\u0000\u0000\u0000:\u0178\u0001\u0000"+
		"\u0000\u0000<\u017a\u0001\u0000\u0000\u0000>\u0182\u0001\u0000\u0000\u0000"+
		"@\u0184\u0001\u0000\u0000\u0000B\u0186\u0001\u0000\u0000\u0000D\u0192"+
		"\u0001\u0000\u0000\u0000F\u0194\u0001\u0000\u0000\u0000H\u019c\u0001\u0000"+
		"\u0000\u0000J\u01a0\u0001\u0000\u0000\u0000L\u01b0\u0001\u0000\u0000\u0000"+
		"N\u01b2\u0001\u0000\u0000\u0000P\u01b8\u0001\u0000\u0000\u0000R\u01bc"+
		"\u0001\u0000\u0000\u0000T\u01c2\u0001\u0000\u0000\u0000V\u01c4\u0001\u0000"+
		"\u0000\u0000X\u01c7\u0001\u0000\u0000\u0000Z\u01d2\u0001\u0000\u0000\u0000"+
		"\\\u01d6\u0001\u0000\u0000\u0000^\u01db\u0001\u0000\u0000\u0000`\u01dd"+
		"\u0001\u0000\u0000\u0000b\u01e5\u0001\u0000\u0000\u0000d\u01f7\u0001\u0000"+
		"\u0000\u0000f\u01f9\u0001\u0000\u0000\u0000h\u01fd\u0001\u0000\u0000\u0000"+
		"j\u0205\u0001\u0000\u0000\u0000l\u020d\u0001\u0000\u0000\u0000n\u0217"+
		"\u0001\u0000\u0000\u0000p\u021e\u0001\u0000\u0000\u0000r\u0222\u0001\u0000"+
		"\u0000\u0000t\u0228\u0001\u0000\u0000\u0000v\u022a\u0001\u0000\u0000\u0000"+
		"x\u0231\u0001\u0000\u0000\u0000z\u0251\u0001\u0000\u0000\u0000|\u0257"+
		"\u0001\u0000\u0000\u0000~\u0259\u0001\u0000\u0000\u0000\u0080\u025f\u0001"+
		"\u0000\u0000\u0000\u0082\u0261\u0001\u0000\u0000\u0000\u0084\u0267\u0001"+
		"\u0000\u0000\u0000\u0086\u026a\u0001\u0000\u0000\u0000\u0088\u0279\u0001"+
		"\u0000\u0000\u0000\u008a\u027f\u0001\u0000\u0000\u0000\u008c\u0281\u0001"+
		"\u0000\u0000\u0000\u008e\u0286\u0001\u0000\u0000\u0000\u0090\u0296\u0001"+
		"\u0000\u0000\u0000\u0092\u02a1\u0001\u0000\u0000\u0000\u0094\u02a3\u0001"+
		"\u0000\u0000\u0000\u0096\u02a8\u0001\u0000\u0000\u0000\u0098\u02af\u0001"+
		"\u0000\u0000\u0000\u009a\u02b6\u0001\u0000\u0000\u0000\u009c\u02b9\u0001"+
		"\u0000\u0000\u0000\u009e\u02bc\u0001\u0000\u0000\u0000\u00a0\u02be\u0001"+
		"\u0000\u0000\u0000\u00a2\u02c4\u0001\u0000\u0000\u0000\u00a4\u02c6\u0001"+
		"\u0000\u0000\u0000\u00a6\u02ca\u0001\u0000\u0000\u0000\u00a8\u02d4\u0001"+
		"\u0000\u0000\u0000\u00aa\u02d6\u0001\u0000\u0000\u0000\u00ac\u02de\u0001"+
		"\u0000\u0000\u0000\u00ae\u02f0\u0001\u0000\u0000\u0000\u00b0\u02f7\u0001"+
		"\u0000\u0000\u0000\u00b2\u02f9\u0001\u0000\u0000\u0000\u00b4\u02fe\u0001"+
		"\u0000\u0000\u0000\u00b6\u0303\u0001\u0000\u0000\u0000\u00b8\u030a\u0001"+
		"\u0000\u0000\u0000\u00ba\u030e\u0001\u0000\u0000\u0000\u00bc\u0310\u0001"+
		"\u0000\u0000\u0000\u00be\u0312\u0001\u0000\u0000\u0000\u00c0\u0317\u0001"+
		"\u0000\u0000\u0000\u00c2\u00c4\u0003\u0002\u0001\u0000\u00c3\u00c5\u0005"+
		"D\u0000\u0000\u00c4\u00c3\u0001\u0000\u0000\u0000\u00c4\u00c5\u0001\u0000"+
		"\u0000\u0000\u00c5\u00c6\u0001\u0000\u0000\u0000\u00c6\u00c7\u0003\u0006"+
		"\u0003\u0000\u00c7\u00c8\u0005?\u0000\u0000\u00c8\u00c9\u0005\u0000\u0000"+
		"\u0001\u00c9\u0001\u0001\u0000\u0000\u0000\u00ca\u00cb\u0005\u001d\u0000"+
		"\u0000\u00cb\u00d0\u0003\u0004\u0002\u0000\u00cc\u00cd\u00057\u0000\u0000"+
		"\u00cd\u00ce\u0003h4\u0000\u00ce\u00cf\u00058\u0000\u0000\u00cf\u00d1"+
		"\u0001\u0000\u0000\u0000\u00d0\u00cc\u0001\u0000\u0000\u0000\u00d0\u00d1"+
		"\u0001\u0000\u0000\u0000\u00d1\u00d2\u0001\u0000\u0000\u0000\u00d2\u00d3"+
		"\u0005/\u0000\u0000\u00d3\u00d9\u0001\u0000\u0000\u0000\u00d4\u00d5\u0005"+
		"C\u0000\u0000\u00d5\u00d6\u0003\u0004\u0002\u0000\u00d6\u00d7\u0005/\u0000"+
		"\u0000\u00d7\u00d9\u0001\u0000\u0000\u0000\u00d8\u00ca\u0001\u0000\u0000"+
		"\u0000\u00d8\u00d4\u0001\u0000\u0000\u0000\u00d9\u0003\u0001\u0000\u0000"+
		"\u0000\u00da\u00db\u0005M\u0000\u0000\u00db\u0005\u0001\u0000\u0000\u0000"+
		"\u00dc\u00e4\u0003\n\u0005\u0000\u00dd\u00e4\u0003\u000e\u0007\u0000\u00de"+
		"\u00e4\u0003\"\u0011\u0000\u00df\u00e4\u0003X,\u0000\u00e0\u00e4\u0003"+
		"\\.\u0000\u00e1\u00e4\u0003\b\u0004\u0000\u00e2\u00e4\u0005G\u0000\u0000"+
		"\u00e3\u00dc\u0001\u0000\u0000\u0000\u00e3\u00dd\u0001\u0000\u0000\u0000"+
		"\u00e3\u00de\u0001\u0000\u0000\u0000\u00e3\u00df\u0001\u0000\u0000\u0000"+
		"\u00e3\u00e0\u0001\u0000\u0000\u0000\u00e3\u00e1\u0001\u0000\u0000\u0000"+
		"\u00e3\u00e2\u0001\u0000\u0000\u0000\u00e4\u00e7\u0001\u0000\u0000\u0000"+
		"\u00e5\u00e3\u0001\u0000\u0000\u0000\u00e5\u00e6\u0001\u0000\u0000\u0000"+
		"\u00e6\u00e8\u0001\u0000\u0000\u0000\u00e7\u00e5\u0001\u0000\u0000\u0000"+
		"\u00e8\u00e9\u0003\u00a4R\u0000\u00e9\u0007\u0001\u0000\u0000\u0000\u00ea"+
		"\u00eb\u0005E\u0000\u0000\u00eb\u00ec\u0003h4\u0000\u00ec\u00ed\u0005"+
		"/\u0000\u0000\u00ed\t\u0001\u0000\u0000\u0000\u00ee\u00ef\u0005\u0015"+
		"\u0000\u0000\u00ef\u00f4\u0003\f\u0006\u0000\u00f0\u00f1\u0005.\u0000"+
		"\u0000\u00f1\u00f3\u0003\f\u0006\u0000\u00f2\u00f0\u0001\u0000\u0000\u0000"+
		"\u00f3\u00f6\u0001\u0000\u0000\u0000\u00f4\u00f2\u0001\u0000\u0000\u0000"+
		"\u00f4\u00f5\u0001\u0000\u0000\u0000\u00f5\u00f7\u0001\u0000\u0000\u0000"+
		"\u00f6\u00f4\u0001\u0000\u0000\u0000\u00f7\u00f8\u0005/\u0000\u0000\u00f8"+
		"\u000b\u0001\u0000\u0000\u0000\u00f9\u00fa\u0003\u0018\f\u0000\u00fa\r"+
		"\u0001\u0000\u0000\u0000\u00fb\u00ff\u0005\b\u0000\u0000\u00fc\u00fd\u0003"+
		"\u0010\b\u0000\u00fd\u00fe\u0005/\u0000\u0000\u00fe\u0100\u0001\u0000"+
		"\u0000\u0000\u00ff\u00fc\u0001\u0000\u0000\u0000\u0100\u0101\u0001\u0000"+
		"\u0000\u0000\u0101\u00ff\u0001\u0000\u0000\u0000\u0101\u0102\u0001\u0000"+
		"\u0000\u0000\u0102\u000f\u0001\u0000\u0000\u0000\u0103\u0104\u0003\u0004"+
		"\u0002\u0000\u0104\u0105\u00051\u0000\u0000\u0105\u0106\u0003\u0014\n"+
		"\u0000\u0106\u0011\u0001\u0000\u0000\u0000\u0107\u0108\u0005\u0007\u0000"+
		"\u0000\u0108\u0109\u00057\u0000\u0000\u0109\u010a\u0003\u0018\f\u0000"+
		"\u010a\u010b\u00058\u0000\u0000\u010b\u0013\u0001\u0000\u0000\u0000\u010c"+
		"\u0117\u0003\u0016\u000b\u0000\u010d\u010e\u0003\u001c\u000e\u0000\u010e"+
		"\u010f\u0003\u0016\u000b\u0000\u010f\u0117\u0001\u0000\u0000\u0000\u0110"+
		"\u0117\u0003\u0004\u0002\u0000\u0111\u0112\u0003\u001c\u000e\u0000\u0112"+
		"\u0113\u0003\u0004\u0002\u0000\u0113\u0117\u0001\u0000\u0000\u0000\u0114"+
		"\u0117\u0003 \u0010\u0000\u0115\u0117\u0003\u0012\t\u0000\u0116\u010c"+
		"\u0001\u0000\u0000\u0000\u0116\u010d\u0001\u0000\u0000\u0000\u0116\u0110"+
		"\u0001\u0000\u0000\u0000\u0116\u0111\u0001\u0000\u0000\u0000\u0116\u0114"+
		"\u0001\u0000\u0000\u0000\u0116\u0115\u0001\u0000\u0000\u0000\u0117\u0015"+
		"\u0001\u0000\u0000\u0000\u0118\u011b\u0003\u0018\f\u0000\u0119\u011b\u0003"+
		"\u001a\r\u0000\u011a\u0118\u0001\u0000\u0000\u0000\u011a\u0119\u0001\u0000"+
		"\u0000\u0000\u011b\u0017\u0001\u0000\u0000\u0000\u011c\u011d\u0005O\u0000"+
		"\u0000\u011d\u0019\u0001\u0000\u0000\u0000\u011e\u011f\u0005P\u0000\u0000"+
		"\u011f\u001b\u0001\u0000\u0000\u0000\u0120\u0121\u0007\u0000\u0000\u0000"+
		"\u0121\u001d\u0001\u0000\u0000\u0000\u0122\u0123\u0007\u0001\u0000\u0000"+
		"\u0123\u001f\u0001\u0000\u0000\u0000\u0124\u0125\u0005N\u0000\u0000\u0125"+
		"!\u0001\u0000\u0000\u0000\u0126\u012a\u0005$\u0000\u0000\u0127\u0128\u0003"+
		"$\u0012\u0000\u0128\u0129\u0005/\u0000\u0000\u0129\u012b\u0001\u0000\u0000"+
		"\u0000\u012a\u0127\u0001\u0000\u0000\u0000\u012b\u012c\u0001\u0000\u0000"+
		"\u0000\u012c\u012a\u0001\u0000\u0000\u0000\u012c\u012d\u0001\u0000\u0000"+
		"\u0000\u012d#\u0001\u0000\u0000\u0000\u012e\u012f\u0003\u0004\u0002\u0000"+
		"\u012f\u0133\u00051\u0000\u0000\u0130\u0134\u0003*\u0015\u0000\u0131\u0134"+
		"\u0003&\u0013\u0000\u0132\u0134\u0003(\u0014\u0000\u0133\u0130\u0001\u0000"+
		"\u0000\u0000\u0133\u0131\u0001\u0000\u0000\u0000\u0133\u0132\u0001\u0000"+
		"\u0000\u0000\u0134%\u0001\u0000\u0000\u0000\u0135\u0137\u0005\u0010\u0000"+
		"\u0000\u0136\u0138\u0003b1\u0000\u0137\u0136\u0001\u0000\u0000\u0000\u0137"+
		"\u0138\u0001\u0000\u0000\u0000\u0138\u0139\u0001\u0000\u0000\u0000\u0139"+
		"\u013a\u00050\u0000\u0000\u013a\u013b\u0003n7\u0000\u013b\'\u0001\u0000"+
		"\u0000\u0000\u013c\u013e\u0005\u001c\u0000\u0000\u013d\u013f\u0003b1\u0000"+
		"\u013e\u013d\u0001\u0000\u0000\u0000\u013e\u013f\u0001\u0000\u0000\u0000"+
		"\u013f)\u0001\u0000\u0000\u0000\u0140\u0144\u0003,\u0016\u0000\u0141\u0144"+
		"\u00034\u001a\u0000\u0142\u0144\u0003V+\u0000\u0143\u0140\u0001\u0000"+
		"\u0000\u0000\u0143\u0141\u0001\u0000\u0000\u0000\u0143\u0142\u0001\u0000"+
		"\u0000\u0000\u0144+\u0001\u0000\u0000\u0000\u0145\u014a\u0003.\u0017\u0000"+
		"\u0146\u014a\u00030\u0018\u0000\u0147\u014a\u00032\u0019\u0000\u0148\u014a"+
		"\u00038\u001c\u0000\u0149\u0145\u0001\u0000\u0000\u0000\u0149\u0146\u0001"+
		"\u0000\u0000\u0000\u0149\u0147\u0001\u0000\u0000\u0000\u0149\u0148\u0001"+
		"\u0000\u0000\u0000\u014a-\u0001\u0000\u0000\u0000\u014b\u014c\u00057\u0000"+
		"\u0000\u014c\u014d\u0003h4\u0000\u014d\u014e\u00058\u0000\u0000\u014e"+
		"/\u0001\u0000\u0000\u0000\u014f\u0150\u0003\u0014\n\u0000\u0150\u0151"+
		"\u0005@\u0000\u0000\u0151\u0152\u0003\u0014\n\u0000\u01521\u0001\u0000"+
		"\u0000\u0000\u0153\u0156\u0003\u0004\u0002\u0000\u0154\u0156\u0007\u0002"+
		"\u0000\u0000\u0155\u0153\u0001\u0000\u0000\u0000\u0155\u0154\u0001\u0000"+
		"\u0000\u0000\u01563\u0001\u0000\u0000\u0000\u0157\u0158\u0005\u001b\u0000"+
		"\u0000\u0158\u015b\u00036\u001b\u0000\u0159\u015b\u00036\u001b\u0000\u015a"+
		"\u0157\u0001\u0000\u0000\u0000\u015a\u0159\u0001\u0000\u0000\u0000\u015b"+
		"5\u0001\u0000\u0000\u0000\u015c\u0161\u0003:\u001d\u0000\u015d\u0161\u0003"+
		"B!\u0000\u015e\u0161\u0003P(\u0000\u015f\u0161\u0003T*\u0000\u0160\u015c"+
		"\u0001\u0000\u0000\u0000\u0160\u015d\u0001\u0000\u0000\u0000\u0160\u015e"+
		"\u0001\u0000\u0000\u0000\u0160\u015f\u0001\u0000\u0000\u0000\u01617\u0001"+
		"\u0000\u0000\u0000\u0162\u0163\u0005F\u0000\u0000\u0163\u0166\u00059\u0000"+
		"\u0000\u0164\u0167\u0003\u0004\u0002\u0000\u0165\u0167\u0003\u0016\u000b"+
		"\u0000\u0166\u0164\u0001\u0000\u0000\u0000\u0166\u0165\u0001\u0000\u0000"+
		"\u0000\u0167\u0168\u0001\u0000\u0000\u0000\u0168\u0169\u0005;\u0000\u0000"+
		"\u01699\u0001\u0000\u0000\u0000\u016a\u016b\u0005\u0002\u0000\u0000\u016b"+
		"\u016c\u00059\u0000\u0000\u016c\u016d\u0003<\u001e\u0000\u016d\u016e\u0005"+
		";\u0000\u0000\u016e\u016f\u0005\u0019\u0000\u0000\u016f\u0170\u0003@ "+
		"\u0000\u0170\u0179\u0001\u0000\u0000\u0000\u0171\u0172\u0005\u0002\u0000"+
		"\u0000\u0172\u0173\u0005:\u0000\u0000\u0173\u0174\u0003<\u001e\u0000\u0174"+
		"\u0175\u0005<\u0000\u0000\u0175\u0176\u0005\u0019\u0000\u0000\u0176\u0177"+
		"\u0003@ \u0000\u0177\u0179\u0001\u0000\u0000\u0000\u0178\u016a\u0001\u0000"+
		"\u0000\u0000\u0178\u0171\u0001\u0000\u0000\u0000\u0179;\u0001\u0000\u0000"+
		"\u0000\u017a\u017f\u0003>\u001f\u0000\u017b\u017c\u0005.\u0000\u0000\u017c"+
		"\u017e\u0003>\u001f\u0000\u017d\u017b\u0001\u0000\u0000\u0000\u017e\u0181"+
		"\u0001\u0000\u0000\u0000\u017f\u017d\u0001\u0000\u0000\u0000\u017f\u0180"+
		"\u0001\u0000\u0000\u0000\u0180=\u0001\u0000\u0000\u0000\u0181\u017f\u0001"+
		"\u0000\u0000\u0000\u0182\u0183\u0003,\u0016\u0000\u0183?\u0001\u0000\u0000"+
		"\u0000\u0184\u0185\u0003*\u0015\u0000\u0185A\u0001\u0000\u0000\u0000\u0186"+
		"\u0188\u0005\u001f\u0000\u0000\u0187\u0189\u0003D\"\u0000\u0188\u0187"+
		"\u0001\u0000\u0000\u0000\u0188\u0189\u0001\u0000\u0000\u0000\u0189\u018a"+
		"\u0001\u0000\u0000\u0000\u018a\u018b\u0005\r\u0000\u0000\u018bC\u0001"+
		"\u0000\u0000\u0000\u018c\u018f\u0003F#\u0000\u018d\u018e\u0005/\u0000"+
		"\u0000\u018e\u0190\u0003J%\u0000\u018f\u018d\u0001\u0000\u0000\u0000\u018f"+
		"\u0190\u0001\u0000\u0000\u0000\u0190\u0193\u0001\u0000\u0000\u0000\u0191"+
		"\u0193\u0003J%\u0000\u0192\u018c\u0001\u0000\u0000\u0000\u0192\u0191\u0001"+
		"\u0000\u0000\u0000\u0193E\u0001\u0000\u0000\u0000\u0194\u0199\u0003H$"+
		"\u0000\u0195\u0196\u0005/\u0000\u0000\u0196\u0198\u0003H$\u0000\u0197"+
		"\u0195\u0001\u0000\u0000\u0000\u0198\u019b\u0001\u0000\u0000\u0000\u0199"+
		"\u0197\u0001\u0000\u0000\u0000\u0199\u019a\u0001\u0000\u0000\u0000\u019a"+
		"G\u0001\u0000\u0000\u0000\u019b\u0199\u0001\u0000\u0000\u0000\u019c\u019d"+
		"\u0003h4\u0000\u019d\u019e\u00050\u0000\u0000\u019e\u019f\u0003*\u0015"+
		"\u0000\u019fI\u0001\u0000\u0000\u0000\u01a0\u01a1\u0005\u0005\u0000\u0000"+
		"\u01a1\u01a2\u0003L&\u0000\u01a2\u01a3\u0005\u0019\u0000\u0000\u01a3\u01a8"+
		"\u0003N\'\u0000\u01a4\u01a5\u0005/\u0000\u0000\u01a5\u01a7\u0003N\'\u0000"+
		"\u01a6\u01a4\u0001\u0000\u0000\u0000\u01a7\u01aa\u0001\u0000\u0000\u0000"+
		"\u01a8\u01a6\u0001\u0000\u0000\u0000\u01a8\u01a9\u0001\u0000\u0000\u0000"+
		"\u01a9K\u0001\u0000\u0000\u0000\u01aa\u01a8\u0001\u0000\u0000\u0000\u01ab"+
		"\u01ac\u0003\u0004\u0002\u0000\u01ac\u01ad\u00050\u0000\u0000\u01ad\u01ae"+
		"\u00032\u0019\u0000\u01ae\u01b1\u0001\u0000\u0000\u0000\u01af\u01b1\u0003"+
		"2\u0019\u0000\u01b0\u01ab\u0001\u0000\u0000\u0000\u01b0\u01af\u0001\u0000"+
		"\u0000\u0000\u01b1M\u0001\u0000\u0000\u0000\u01b2\u01b3\u0003j5\u0000"+
		"\u01b3\u01b4\u00050\u0000\u0000\u01b4\u01b5\u00057\u0000\u0000\u01b5\u01b6"+
		"\u0003D\"\u0000\u01b6\u01b7\u00058\u0000\u0000\u01b7O\u0001\u0000\u0000"+
		"\u0000\u01b8\u01b9\u0005!\u0000\u0000\u01b9\u01ba\u0005\u0019\u0000\u0000"+
		"\u01ba\u01bb\u0003R)\u0000\u01bbQ\u0001\u0000\u0000\u0000\u01bc\u01bd"+
		"\u0003,\u0016\u0000\u01bdS\u0001\u0000\u0000\u0000\u01be\u01bf\u0005\u000e"+
		"\u0000\u0000\u01bf\u01c0\u0005\u0019\u0000\u0000\u01c0\u01c3\u0003*\u0015"+
		"\u0000\u01c1\u01c3\u0005\u000e\u0000\u0000\u01c2\u01be\u0001\u0000\u0000"+
		"\u0000\u01c2\u01c1\u0001\u0000\u0000\u0000\u01c3U\u0001\u0000\u0000\u0000"+
		"\u01c4\u01c5\u0005=\u0000\u0000\u01c5\u01c6\u00032\u0019\u0000\u01c6W"+
		"\u0001\u0000\u0000\u0000\u01c7\u01c8\u0005&\u0000\u0000\u01c8\u01cd\u0003"+
		"Z-\u0000\u01c9\u01ca\u0005/\u0000\u0000\u01ca\u01cc\u0003Z-\u0000\u01cb"+
		"\u01c9\u0001\u0000\u0000\u0000\u01cc\u01cf\u0001\u0000\u0000\u0000\u01cd"+
		"\u01cb\u0001\u0000\u0000\u0000\u01cd\u01ce\u0001\u0000\u0000\u0000\u01ce"+
		"\u01d0\u0001\u0000\u0000\u0000\u01cf\u01cd\u0001\u0000\u0000\u0000\u01d0"+
		"\u01d1\u0005/\u0000\u0000\u01d1Y\u0001\u0000\u0000\u0000\u01d2\u01d3\u0003"+
		"h4\u0000\u01d3\u01d4\u00050\u0000\u0000\u01d4\u01d5\u0003*\u0015\u0000"+
		"\u01d5[\u0001\u0000\u0000\u0000\u01d6\u01d7\u0003^/\u0000\u01d7\u01d8"+
		"\u0005/\u0000\u0000\u01d8]\u0001\u0000\u0000\u0000\u01d9\u01dc\u0003`"+
		"0\u0000\u01da\u01dc\u0003l6\u0000\u01db\u01d9\u0001\u0000\u0000\u0000"+
		"\u01db\u01da\u0001\u0000\u0000\u0000\u01dc_\u0001\u0000\u0000\u0000\u01dd"+
		"\u01de\u0005\u001c\u0000\u0000\u01de\u01e0\u0003\u0004\u0002\u0000\u01df"+
		"\u01e1\u0003b1\u0000\u01e0\u01df\u0001\u0000\u0000\u0000\u01e0\u01e1\u0001"+
		"\u0000\u0000\u0000\u01e1\u01e2\u0001\u0000\u0000\u0000\u01e2\u01e3\u0005"+
		"/\u0000\u0000\u01e3\u01e4\u0003\u0006\u0003\u0000\u01e4a\u0001\u0000\u0000"+
		"\u0000\u01e5\u01e6\u00057\u0000\u0000\u01e6\u01eb\u0003d2\u0000\u01e7"+
		"\u01e8\u0005/\u0000\u0000\u01e8\u01ea\u0003d2\u0000\u01e9\u01e7\u0001"+
		"\u0000\u0000\u0000\u01ea\u01ed\u0001\u0000\u0000\u0000\u01eb\u01e9\u0001"+
		"\u0000\u0000\u0000\u01eb\u01ec\u0001\u0000\u0000\u0000\u01ec\u01ee\u0001"+
		"\u0000\u0000\u0000\u01ed\u01eb\u0001\u0000\u0000\u0000\u01ee\u01ef\u0005"+
		"8\u0000\u0000\u01efc\u0001\u0000\u0000\u0000\u01f0\u01f8\u0003f3\u0000"+
		"\u01f1\u01f2\u0005&\u0000\u0000\u01f2\u01f8\u0003f3\u0000\u01f3\u01f4"+
		"\u0005\u0010\u0000\u0000\u01f4\u01f8\u0003f3\u0000\u01f5\u01f6\u0005\u001c"+
		"\u0000\u0000\u01f6\u01f8\u0003f3\u0000\u01f7\u01f0\u0001\u0000\u0000\u0000"+
		"\u01f7\u01f1\u0001\u0000\u0000\u0000\u01f7\u01f3\u0001\u0000\u0000\u0000"+
		"\u01f7\u01f5\u0001\u0000\u0000\u0000\u01f8e\u0001\u0000\u0000\u0000\u01f9"+
		"\u01fa\u0003h4\u0000\u01fa\u01fb\u00050\u0000\u0000\u01fb\u01fc\u0003"+
		"2\u0019\u0000\u01fcg\u0001\u0000\u0000\u0000\u01fd\u0202\u0003\u0004\u0002"+
		"\u0000\u01fe\u01ff\u0005.\u0000\u0000\u01ff\u0201\u0003\u0004\u0002\u0000"+
		"\u0200\u01fe\u0001\u0000\u0000\u0000\u0201\u0204\u0001\u0000\u0000\u0000"+
		"\u0202\u0200\u0001\u0000\u0000\u0000\u0202\u0203\u0001\u0000\u0000\u0000"+
		"\u0203i\u0001\u0000\u0000\u0000\u0204\u0202\u0001\u0000\u0000\u0000\u0205"+
		"\u020a\u0003\u0014\n\u0000\u0206\u0207\u0005.\u0000\u0000\u0207\u0209"+
		"\u0003\u0014\n\u0000\u0208\u0206\u0001\u0000\u0000\u0000\u0209\u020c\u0001"+
		"\u0000\u0000\u0000\u020a\u0208\u0001\u0000\u0000\u0000\u020a\u020b\u0001"+
		"\u0000\u0000\u0000\u020bk\u0001\u0000\u0000\u0000\u020c\u020a\u0001\u0000"+
		"\u0000\u0000\u020d\u020e\u0005\u0010\u0000\u0000\u020e\u0210\u0003\u0004"+
		"\u0002\u0000\u020f\u0211\u0003b1\u0000\u0210\u020f\u0001\u0000\u0000\u0000"+
		"\u0210\u0211\u0001\u0000\u0000\u0000\u0211\u0212\u0001\u0000\u0000\u0000"+
		"\u0212\u0213\u00050\u0000\u0000\u0213\u0214\u0003n7\u0000\u0214\u0215"+
		"\u0005/\u0000\u0000\u0215\u0216\u0003\u0006\u0003\u0000\u0216m\u0001\u0000"+
		"\u0000\u0000\u0217\u0218\u00032\u0019\u0000\u0218o\u0001\u0000\u0000\u0000"+
		"\u0219\u021a\u0003\f\u0006\u0000\u021a\u021b\u00050\u0000\u0000\u021b"+
		"\u021c\u0003r9\u0000\u021c\u021f\u0001\u0000\u0000\u0000\u021d\u021f\u0003"+
		"r9\u0000\u021e\u0219\u0001\u0000\u0000\u0000\u021e\u021d\u0001\u0000\u0000"+
		"\u0000\u021fq\u0001\u0000\u0000\u0000\u0220\u0223\u0003t:\u0000\u0221"+
		"\u0223\u0003\u00a2Q\u0000\u0222\u0220\u0001\u0000\u0000\u0000\u0222\u0221"+
		"\u0001\u0000\u0000\u0000\u0223s\u0001\u0000\u0000\u0000\u0224\u0229\u0003"+
		"v;\u0000\u0225\u0229\u0003\u0096K\u0000\u0226\u0229\u0003\u009cN\u0000"+
		"\u0227\u0229\u0003\u009eO\u0000\u0228\u0224\u0001\u0000\u0000\u0000\u0228"+
		"\u0225\u0001\u0000\u0000\u0000\u0228\u0226\u0001\u0000\u0000\u0000\u0228"+
		"\u0227\u0001\u0000\u0000\u0000\u0229u\u0001\u0000\u0000\u0000\u022a\u022b"+
		"\u0003x<\u0000\u022b\u022c\u0005-\u0000\u0000\u022c\u022d\u0003z=\u0000"+
		"\u022dw\u0001\u0000\u0000\u0000\u022e\u022f\u0005>\u0000\u0000\u022f\u0232"+
		"\u0003\u0004\u0002\u0000\u0230\u0232\u0003\u0004\u0002\u0000\u0231\u022e"+
		"\u0001\u0000\u0000\u0000\u0231\u0230\u0001\u0000\u0000\u0000\u0232\u024e"+
		"\u0001\u0000\u0000\u0000\u0233\u0234\u00059\u0000\u0000\u0234\u0239\u0003"+
		"z=\u0000\u0235\u0236\u0005.\u0000\u0000\u0236\u0238\u0003z=\u0000\u0237"+
		"\u0235\u0001\u0000\u0000\u0000\u0238\u023b\u0001\u0000\u0000\u0000\u0239"+
		"\u0237\u0001\u0000\u0000\u0000\u0239\u023a\u0001\u0000\u0000\u0000\u023a"+
		"\u023c\u0001\u0000\u0000\u0000\u023b\u0239\u0001\u0000\u0000\u0000\u023c"+
		"\u023d\u0005;\u0000\u0000\u023d\u024d\u0001\u0000\u0000\u0000\u023e\u023f"+
		"\u0005:\u0000\u0000\u023f\u0244\u0003z=\u0000\u0240\u0241\u0005.\u0000"+
		"\u0000\u0241\u0243\u0003z=\u0000\u0242\u0240\u0001\u0000\u0000\u0000\u0243"+
		"\u0246\u0001\u0000\u0000\u0000\u0244\u0242\u0001\u0000\u0000\u0000\u0244"+
		"\u0245\u0001\u0000\u0000\u0000\u0245\u0247\u0001\u0000\u0000\u0000\u0246"+
		"\u0244\u0001\u0000\u0000\u0000\u0247\u0248\u0005<\u0000\u0000\u0248\u024d"+
		"\u0001\u0000\u0000\u0000\u0249\u024a\u0005?\u0000\u0000\u024a\u024d\u0003"+
		"\u0004\u0002\u0000\u024b\u024d\u0005=\u0000\u0000\u024c\u0233\u0001\u0000"+
		"\u0000\u0000\u024c\u023e\u0001\u0000\u0000\u0000\u024c\u0249\u0001\u0000"+
		"\u0000\u0000\u024c\u024b\u0001\u0000\u0000\u0000\u024d\u0250\u0001\u0000"+
		"\u0000\u0000\u024e\u024c\u0001\u0000\u0000\u0000\u024e\u024f\u0001\u0000"+
		"\u0000\u0000\u024fy\u0001\u0000\u0000\u0000\u0250\u024e\u0001\u0000\u0000"+
		"\u0000\u0251\u0255\u0003~?\u0000\u0252\u0253\u0003|>\u0000\u0253\u0254"+
		"\u0003z=\u0000\u0254\u0256\u0001\u0000\u0000\u0000\u0255\u0252\u0001\u0000"+
		"\u0000\u0000\u0255\u0256\u0001\u0000\u0000\u0000\u0256{\u0001\u0000\u0000"+
		"\u0000\u0257\u0258\u0007\u0003\u0000\u0000\u0258}\u0001\u0000\u0000\u0000"+
		"\u0259\u025d\u0003\u0082A\u0000\u025a\u025b\u0003\u0080@\u0000\u025b\u025c"+
		"\u0003~?\u0000\u025c\u025e\u0001\u0000\u0000\u0000\u025d\u025a\u0001\u0000"+
		"\u0000\u0000\u025d\u025e\u0001\u0000\u0000\u0000\u025e\u007f\u0001\u0000"+
		"\u0000\u0000\u025f\u0260\u0007\u0004\u0000\u0000\u0260\u0081\u0001\u0000"+
		"\u0000\u0000\u0261\u0265\u0003\u0086C\u0000\u0262\u0263\u0003\u0084B\u0000"+
		"\u0263\u0264\u0003\u0082A\u0000\u0264\u0266\u0001\u0000\u0000\u0000\u0265"+
		"\u0262\u0001\u0000\u0000\u0000\u0265\u0266\u0001\u0000\u0000\u0000\u0266"+
		"\u0083\u0001\u0000\u0000\u0000\u0267\u0268\u0007\u0005\u0000\u0000\u0268"+
		"\u0085\u0001\u0000\u0000\u0000\u0269\u026b\u0007\u0000\u0000\u0000\u026a"+
		"\u0269\u0001\u0000\u0000\u0000\u026a\u026b\u0001\u0000\u0000\u0000\u026b"+
		"\u026c\u0001\u0000\u0000\u0000\u026c\u026d\u0003\u0088D\u0000\u026d\u0087"+
		"\u0001\u0000\u0000\u0000\u026e\u027a\u0003x<\u0000\u026f\u0270\u00057"+
		"\u0000\u0000\u0270\u0271\u0003z=\u0000\u0271\u0272\u00058\u0000\u0000"+
		"\u0272\u027a\u0001\u0000\u0000\u0000\u0273\u027a\u0003\u008cF\u0000\u0274"+
		"\u027a\u0003\u008aE\u0000\u0275\u027a\u0003\u0090H\u0000\u0276\u0277\u0005"+
		"\u0018\u0000\u0000\u0277\u027a\u0003\u0088D\u0000\u0278\u027a\u0003\u001e"+
		"\u000f\u0000\u0279\u026e\u0001\u0000\u0000\u0000\u0279\u026f\u0001\u0000"+
		"\u0000\u0000\u0279\u0273\u0001\u0000\u0000\u0000\u0279\u0274\u0001\u0000"+
		"\u0000\u0000\u0279\u0275\u0001\u0000\u0000\u0000\u0279\u0276\u0001\u0000"+
		"\u0000\u0000\u0279\u0278\u0001\u0000\u0000\u0000\u027a\u0089\u0001\u0000"+
		"\u0000\u0000\u027b\u0280\u0003\u0016\u000b\u0000\u027c\u0280\u0003\u0012"+
		"\t\u0000\u027d\u0280\u0003 \u0010\u0000\u027e\u0280\u0005\u0017\u0000"+
		"\u0000\u027f\u027b\u0001\u0000\u0000\u0000\u027f\u027c\u0001\u0000\u0000"+
		"\u0000\u027f\u027d\u0001\u0000\u0000\u0000\u027f\u027e\u0001\u0000\u0000"+
		"\u0000\u0280\u008b\u0001\u0000\u0000\u0000\u0281\u0282\u0003\u0004\u0002"+
		"\u0000\u0282\u0283\u00057\u0000\u0000\u0283\u0284\u0003\u008eG\u0000\u0284"+
		"\u0285\u00058\u0000\u0000\u0285\u008d\u0001\u0000\u0000\u0000\u0286\u028b"+
		"\u0003\u0098L\u0000\u0287\u0288\u0005.\u0000\u0000\u0288\u028a\u0003\u0098"+
		"L\u0000\u0289\u0287\u0001\u0000\u0000\u0000\u028a\u028d\u0001\u0000\u0000"+
		"\u0000\u028b\u0289\u0001\u0000\u0000\u0000\u028b\u028c\u0001\u0000\u0000"+
		"\u0000\u028c\u008f\u0001\u0000\u0000\u0000\u028d\u028b\u0001\u0000\u0000"+
		"\u0000\u028e\u028f\u00059\u0000\u0000\u028f\u0290\u0003\u0092I\u0000\u0290"+
		"\u0291\u0005;\u0000\u0000\u0291\u0297\u0001\u0000\u0000\u0000\u0292\u0293"+
		"\u0005:\u0000\u0000\u0293\u0294\u0003\u0092I\u0000\u0294\u0295\u0005<"+
		"\u0000\u0000\u0295\u0297\u0001\u0000\u0000\u0000\u0296\u028e\u0001\u0000"+
		"\u0000\u0000\u0296\u0292\u0001\u0000\u0000\u0000\u0297\u0091\u0001\u0000"+
		"\u0000\u0000\u0298\u029d\u0003\u0094J\u0000\u0299\u029a\u0005.\u0000\u0000"+
		"\u029a\u029c\u0003\u0094J\u0000\u029b\u0299\u0001\u0000\u0000\u0000\u029c"+
		"\u029f\u0001\u0000\u0000\u0000\u029d\u029b\u0001\u0000\u0000\u0000\u029d"+
		"\u029e\u0001\u0000\u0000\u0000\u029e\u02a2\u0001\u0000\u0000\u0000\u029f"+
		"\u029d\u0001\u0000\u0000\u0000\u02a0\u02a2\u0001\u0000\u0000\u0000\u02a1"+
		"\u0298\u0001\u0000\u0000\u0000\u02a1\u02a0\u0001\u0000\u0000\u0000\u02a2"+
		"\u0093\u0001\u0000\u0000\u0000\u02a3\u02a6\u0003z=\u0000\u02a4\u02a5\u0005"+
		"@\u0000\u0000\u02a5\u02a7\u0003z=\u0000\u02a6\u02a4\u0001\u0000\u0000"+
		"\u0000\u02a6\u02a7\u0001\u0000\u0000\u0000\u02a7\u0095\u0001\u0000\u0000"+
		"\u0000\u02a8\u02ad\u0003\u0004\u0002\u0000\u02a9\u02aa\u00057\u0000\u0000"+
		"\u02aa\u02ab\u0003\u008eG\u0000\u02ab\u02ac\u00058\u0000\u0000\u02ac\u02ae"+
		"\u0001\u0000\u0000\u0000\u02ad\u02a9\u0001\u0000\u0000\u0000\u02ad\u02ae"+
		"\u0001\u0000\u0000\u0000\u02ae\u0097\u0001\u0000\u0000\u0000\u02af\u02b3"+
		"\u0003z=\u0000\u02b0\u02b2\u0003\u009aM\u0000\u02b1\u02b0\u0001\u0000"+
		"\u0000\u0000\u02b2\u02b5\u0001\u0000\u0000\u0000\u02b3\u02b1\u0001\u0000"+
		"\u0000\u0000\u02b3\u02b4\u0001\u0000\u0000\u0000\u02b4\u0099\u0001\u0000"+
		"\u0000\u0000\u02b5\u02b3\u0001\u0000\u0000\u0000\u02b6\u02b7\u00050\u0000"+
		"\u0000\u02b7\u02b8\u0003z=\u0000\u02b8\u009b\u0001\u0000\u0000\u0000\u02b9"+
		"\u02ba\u0005\u0011\u0000\u0000\u02ba\u02bb\u0003\f\u0006\u0000\u02bb\u009d"+
		"\u0001\u0000\u0000\u0000\u02bc\u02bd\u0001\u0000\u0000\u0000\u02bd\u009f"+
		"\u0001\u0000\u0000\u0000\u02be\u02bf\u0001\u0000\u0000\u0000\u02bf\u00a1"+
		"\u0001\u0000\u0000\u0000\u02c0\u02c5\u0003\u00a4R\u0000\u02c1\u02c5\u0003"+
		"\u00a8T\u0000\u02c2\u02c5\u0003\u00b0X\u0000\u02c3\u02c5\u0003\u00be_"+
		"\u0000\u02c4\u02c0\u0001\u0000\u0000\u0000\u02c4\u02c1\u0001\u0000\u0000"+
		"\u0000\u02c4\u02c2\u0001\u0000\u0000\u0000\u02c4\u02c3\u0001\u0000\u0000"+
		"\u0000\u02c5\u00a3\u0001\u0000\u0000\u0000\u02c6\u02c7\u0005\u0003\u0000"+
		"\u0000\u02c7\u02c8\u0003\u00a6S\u0000\u02c8\u02c9\u0005\r\u0000\u0000"+
		"\u02c9\u00a5\u0001\u0000\u0000\u0000\u02ca\u02cf\u0003p8\u0000\u02cb\u02cc"+
		"\u0005/\u0000\u0000\u02cc\u02ce\u0003p8\u0000\u02cd\u02cb\u0001\u0000"+
		"\u0000\u0000\u02ce\u02d1\u0001\u0000\u0000\u0000\u02cf\u02cd\u0001\u0000"+
		"\u0000\u0000\u02cf\u02d0\u0001\u0000\u0000\u0000\u02d0\u00a7\u0001\u0000"+
		"\u0000\u0000\u02d1\u02cf\u0001\u0000\u0000\u0000\u02d2\u02d5\u0003\u00aa"+
		"U\u0000\u02d3\u02d5\u0003\u00acV\u0000\u02d4\u02d2\u0001\u0000\u0000\u0000"+
		"\u02d4\u02d3\u0001\u0000\u0000\u0000\u02d5\u00a9\u0001\u0000\u0000\u0000"+
		"\u02d6\u02d7\u0005\u0012\u0000\u0000\u02d7\u02d8\u0003z=\u0000\u02d8\u02d9"+
		"\u0005\"\u0000\u0000\u02d9\u02dc\u0003p8\u0000\u02da\u02db\u0005\f\u0000"+
		"\u0000\u02db\u02dd\u0003p8\u0000\u02dc\u02da\u0001\u0000\u0000\u0000\u02dc"+
		"\u02dd\u0001\u0000\u0000\u0000\u02dd\u00ab\u0001\u0000\u0000\u0000\u02de"+
		"\u02df\u0005\u0005\u0000\u0000\u02df\u02e0\u0003z=\u0000\u02e0\u02e1\u0005"+
		"\u0019\u0000\u0000\u02e1\u02e6\u0003\u00aeW\u0000\u02e2\u02e3\u0005/\u0000"+
		"\u0000\u02e3\u02e5\u0003\u00aeW\u0000\u02e4\u02e2\u0001\u0000\u0000\u0000"+
		"\u02e5\u02e8\u0001\u0000\u0000\u0000\u02e6\u02e4\u0001\u0000\u0000\u0000"+
		"\u02e6\u02e7\u0001\u0000\u0000\u0000\u02e7\u02ec\u0001\u0000\u0000\u0000"+
		"\u02e8\u02e6\u0001\u0000\u0000\u0000\u02e9\u02ea\u0005/\u0000\u0000\u02ea"+
		"\u02eb\u0005\f\u0000\u0000\u02eb\u02ed\u0003\u00a6S\u0000\u02ec\u02e9"+
		"\u0001\u0000\u0000\u0000\u02ec\u02ed\u0001\u0000\u0000\u0000\u02ed\u02ee"+
		"\u0001\u0000\u0000\u0000\u02ee\u02ef\u0005\r\u0000\u0000\u02ef\u00ad\u0001"+
		"\u0000\u0000\u0000\u02f0\u02f1\u0003j5\u0000\u02f1\u02f2\u00050\u0000"+
		"\u0000\u02f2\u02f3\u0003p8\u0000\u02f3\u00af\u0001\u0000\u0000\u0000\u02f4"+
		"\u02f8\u0003\u00b2Y\u0000\u02f5\u02f8\u0003\u00b4Z\u0000\u02f6\u02f8\u0003"+
		"\u00b6[\u0000\u02f7\u02f4\u0001\u0000\u0000\u0000\u02f7\u02f5\u0001\u0000"+
		"\u0000\u0000\u02f7\u02f6\u0001\u0000\u0000\u0000\u02f8\u00b1\u0001\u0000"+
		"\u0000\u0000\u02f9\u02fa\u0005\'\u0000\u0000\u02fa\u02fb\u0003z=\u0000"+
		"\u02fb\u02fc\u0005\n\u0000\u0000\u02fc\u02fd\u0003p8\u0000\u02fd\u00b3"+
		"\u0001\u0000\u0000\u0000\u02fe\u02ff\u0005 \u0000\u0000\u02ff\u0300\u0003"+
		"\u00a6S\u0000\u0300\u0301\u0005%\u0000\u0000\u0301\u0302\u0003z=\u0000"+
		"\u0302\u00b5\u0001\u0000\u0000\u0000\u0303\u0304\u0005\u000f\u0000\u0000"+
		"\u0304\u0305\u0003\u0004\u0002\u0000\u0305\u0306\u0005-\u0000\u0000\u0306"+
		"\u0307\u0003\u00b8\\\u0000\u0307\u0308\u0005\n\u0000\u0000\u0308\u0309"+
		"\u0003p8\u0000\u0309\u00b7\u0001\u0000\u0000\u0000\u030a\u030b\u0003\u00ba"+
		"]\u0000\u030b\u030c\u0007\u0006\u0000\u0000\u030c\u030d\u0003\u00bc^\u0000"+
		"\u030d\u00b9\u0001\u0000\u0000\u0000\u030e\u030f\u0003z=\u0000\u030f\u00bb"+
		"\u0001\u0000\u0000\u0000\u0310\u0311\u0003z=\u0000\u0311\u00bd\u0001\u0000"+
		"\u0000\u0000\u0312\u0313\u0005(\u0000\u0000\u0313\u0314\u0003\u00c0`\u0000"+
		"\u0314\u0315\u0005\n\u0000\u0000\u0315\u0316\u0003p8\u0000\u0316\u00bf"+
		"\u0001\u0000\u0000\u0000\u0317\u031c\u0003x<\u0000\u0318\u0319\u0005."+
		"\u0000\u0000\u0319\u031b\u0003x<\u0000\u031a\u0318\u0001\u0000\u0000\u0000"+
		"\u031b\u031e\u0001\u0000\u0000\u0000\u031c\u031a\u0001\u0000\u0000\u0000"+
		"\u031c\u031d\u0001\u0000\u0000\u0000\u031d\u00c1\u0001\u0000\u0000\u0000"+
		"\u031e\u031c\u0001\u0000\u0000\u0000A\u00c4\u00d0\u00d8\u00e3\u00e5\u00f4"+
		"\u0101\u0116\u011a\u012c\u0133\u0137\u013e\u0143\u0149\u0155\u015a\u0160"+
		"\u0166\u0178\u017f\u0188\u018f\u0192\u0199\u01a8\u01b0\u01c2\u01cd\u01db"+
		"\u01e0\u01eb\u01f7\u0202\u020a\u0210\u021e\u0222\u0228\u0231\u0239\u0244"+
		"\u024c\u024e\u0255\u025d\u0265\u026a\u0279\u027f\u028b\u0296\u029d\u02a1"+
		"\u02a6\u02ad\u02b3\u02c4\u02cf\u02d4\u02dc\u02e6\u02ec\u02f7\u031c";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}