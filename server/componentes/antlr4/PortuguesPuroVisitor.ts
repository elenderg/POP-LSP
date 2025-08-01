// Generated from PortuguesPuro.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { Regra_espacoContext } from "./PortuguesPuroParser";
import { PalavraContext } from "./PortuguesPuroParser";
import { Possessivo_ingl�sContext } from "./PortuguesPuroParser";
import { ArtigoContext } from "./PortuguesPuroParser";
import { Artigo_definidoContext } from "./PortuguesPuroParser";
import { Artigo_indefinidoContext } from "./PortuguesPuroParser";
import { AdjacentesContext } from "./PortuguesPuroParser";
import { AbrangentesContext } from "./PortuguesPuroParser";
import { ContracoesContext } from "./PortuguesPuroParser";
import { Atribuidores_de_posseContext } from "./PortuguesPuroParser";
import { P1Context } from "./PortuguesPuroParser";
import { P2Context } from "./PortuguesPuroParser";
import { Operadores_de_comparacaoContext } from "./PortuguesPuroParser";
import { Palavras_reservadasContext } from "./PortuguesPuroParser";
import { DenominacoesContext } from "./PortuguesPuroParser";
import { VerbosContext } from "./PortuguesPuroParser";
import { Caracteres_ignoraveisContext } from "./PortuguesPuroParser";
import { ComentarioContext } from "./PortuguesPuroParser";
import { Comentario_de_linhaContext } from "./PortuguesPuroParser";
import { Comentario_de_blocoContext } from "./PortuguesPuroParser";
import { TokenContext } from "./PortuguesPuroParser";
import { AglomeradoContext } from "./PortuguesPuroParser";
import { Caractere_aglomeravelContext } from "./PortuguesPuroParser";
import { Iniciador_de_aglomeradoContext } from "./PortuguesPuroParser";
import { Possessivo_novoContext } from "./PortuguesPuroParser";
import { QualificadorContext } from "./PortuguesPuroParser";
import { Caractere_nao_aglomeravelContext } from "./PortuguesPuroParser";
import { Sinal_de_pontuacaoContext } from "./PortuguesPuroParser";
import { Simbolos_especiaisContext } from "./PortuguesPuroParser";
import { NoiseContext } from "./PortuguesPuroParser";
import { Numero_inteiroContext } from "./PortuguesPuroParser";
import { Numero_decimalContext } from "./PortuguesPuroParser";
import { Numero_fracionarioContext } from "./PortuguesPuroParser";
import { Numero_mistoContext } from "./PortuguesPuroParser";
import { Numero_hexadecimalContext } from "./PortuguesPuroParser";
import { String_literalContext } from "./PortuguesPuroParser";
import { ProgramaContext } from "./PortuguesPuroParser";
import { Tipos_primitivosContext } from "./PortuguesPuroParser";
import { TipoContext } from "./PortuguesPuroParser";
import { NomeContext } from "./PortuguesPuroParser";
import { Nome_do_tipoContext } from "./PortuguesPuroParser";
import { Informacao_opcionalContext } from "./PortuguesPuroParser";
import { CamposContext } from "./PortuguesPuroParser";
import { BytesContext } from "./PortuguesPuroParser";
import { Refer�nciaContext } from "./PortuguesPuroParser";
import { CampoContext } from "./PortuguesPuroParser";
import { PausaContext } from "./PortuguesPuroParser";
import { PausasContext } from "./PortuguesPuroParser";
import { ConjuncoesContext } from "./PortuguesPuroParser";
import { PreposicoesContext } from "./PortuguesPuroParser";
import { �Context } from "./PortuguesPuroParser";
import { EstruturaContext } from "./PortuguesPuroParser";
import { Igual_aContext } from "./PortuguesPuroParser";
import { Variavel_globalContext } from "./PortuguesPuroParser";
import { RotinaContext } from "./PortuguesPuroParser";
import { ProcedimentoContext } from "./PortuguesPuroParser";
import { Determine_seContext } from "./PortuguesPuroParser";
import { DecisorContext } from "./PortuguesPuroParser";
import { Fun��o2Context } from "./PortuguesPuroParser";
import { AtribuaContext } from "./PortuguesPuroParser";
import { FuncaoContext } from "./PortuguesPuroParser";
import { ParaContext } from "./PortuguesPuroParser";
import { Que_seContext } from "./PortuguesPuroParser";
import { Rotina2Context } from "./PortuguesPuroParser";
import { CompativelmenteContext } from "./PortuguesPuroParser";
import { RetroinvocacaoContext } from "./PortuguesPuroParser";
import { Nome_da_rotinaContext } from "./PortuguesPuroParser";
import { Unidade_semanticaContext } from "./PortuguesPuroParser";
import { ParametroContext } from "./PortuguesPuroParser";
import { FraseContext } from "./PortuguesPuroParser";
import { InstrucoesContext } from "./PortuguesPuroParser";
import { InstrucaoContext } from "./PortuguesPuroParser";
import { PreserveContext } from "./PortuguesPuroParser";
import { PreservacaoContext } from "./PortuguesPuroParser";
import { IteracaoContext } from "./PortuguesPuroParser";
import { SeContext } from "./PortuguesPuroParser";
import { CondicionalContext } from "./PortuguesPuroParser";
import { Expressao_decisoraContext } from "./PortuguesPuroParser";
import { IncondicionalContext } from "./PortuguesPuroParser";
import { InterrupcaoContext } from "./PortuguesPuroParser";
import { InvocacaoContext } from "./PortuguesPuroParser";
import { Invocacao_internaContext } from "./PortuguesPuroParser";
import { Invocacao_externaContext } from "./PortuguesPuroParser";
import { Aspas_duplasContext } from "./PortuguesPuroParser";
import { Nome_da_DLLContext } from "./PortuguesPuroParser";
import { Nome_da_funcaoContext } from "./PortuguesPuroParser";
import { ProcesseContext } from "./PortuguesPuroParser";
import { ComContext } from "./PortuguesPuroParser";
import { EContext } from "./PortuguesPuroParser";
import { RetornandoContext } from "./PortuguesPuroParser";
import { Invocacao_indiretaContext } from "./PortuguesPuroParser";
import { RetornoContext } from "./PortuguesPuroParser";
import { DecodifiqueContext } from "./PortuguesPuroParser";
import { DecodificacaoContext } from "./PortuguesPuroParser";
import { AponteContext } from "./PortuguesPuroParser";
import { Para_rotinaContext } from "./PortuguesPuroParser";
import { IndirecaoContext } from "./PortuguesPuroParser";
import { PushContext } from "./PortuguesPuroParser";
import { EmpilhamentoContext } from "./PortuguesPuroParser";
import { ReiteracaoContext } from "./PortuguesPuroParser";
import { DigaContext } from "./PortuguesPuroParser";
import { Retorno_booleanoContext } from "./PortuguesPuroParser";
import { Express�oContext } from "./PortuguesPuroParser";
import { Operadores_comunsContext } from "./PortuguesPuroParser";
import { BooleanoContext } from "./PortuguesPuroParser";
import { NuloContext } from "./PortuguesPuroParser";
import { Termo_constanteContext } from "./PortuguesPuroParser";
import { Termo_constante_negativoContext } from "./PortuguesPuroParser";
import { Termo_constante_positivoContext } from "./PortuguesPuroParser";
import { NumeroContext } from "./PortuguesPuroParser";
import { LiteralContext } from "./PortuguesPuroParser";
import { TermoContext } from "./PortuguesPuroParser";
import { Sinal_de_divis�oContext } from "./PortuguesPuroParser";
import { ComoContext } from "./PortuguesPuroParser";
import { Termo_negativoContext } from "./PortuguesPuroParser";
import { Termo_positivoContext } from "./PortuguesPuroParser";
import { Variavel_localContext } from "./PortuguesPuroParser";
import { VariavelContext } from "./PortuguesPuroParser";
import { Termo_literalContext } from "./PortuguesPuroParser";
import { Conte�doContext } from "./PortuguesPuroParser";
import { MagnitudeContext } from "./PortuguesPuroParser";
import { Endere�amentoContext } from "./PortuguesPuroParser";
import { Possessivos_ingl�sContext } from "./PortuguesPuroParser";
import { Possessivo_ingl�s_antigoContext } from "./PortuguesPuroParser";
import { Possessivo_portugu�sContext } from "./PortuguesPuroParser";
import { ApostrofoContext } from "./PortuguesPuroParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `PortuguesPuroParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface PortuguesPuroVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.regra_espaco`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRegra_espaco?: (ctx: Regra_espacoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.palavra`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPalavra?: (ctx: PalavraContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.possessivo_ingl�s`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPossessivo_ingl�s?: (ctx: Possessivo_ingl�sContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.artigo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArtigo?: (ctx: ArtigoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.artigo_definido`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArtigo_definido?: (ctx: Artigo_definidoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.artigo_indefinido`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArtigo_indefinido?: (ctx: Artigo_indefinidoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.adjacentes`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdjacentes?: (ctx: AdjacentesContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.abrangentes`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAbrangentes?: (ctx: AbrangentesContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.contracoes`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContracoes?: (ctx: ContracoesContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.atribuidores_de_posse`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtribuidores_de_posse?: (ctx: Atribuidores_de_posseContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.p1`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitP1?: (ctx: P1Context) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.p2`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitP2?: (ctx: P2Context) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.operadores_de_comparacao`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOperadores_de_comparacao?: (ctx: Operadores_de_comparacaoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.palavras_reservadas`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPalavras_reservadas?: (ctx: Palavras_reservadasContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.denominacoes`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDenominacoes?: (ctx: DenominacoesContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.verbos`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVerbos?: (ctx: VerbosContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.caracteres_ignoraveis`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCaracteres_ignoraveis?: (ctx: Caracteres_ignoraveisContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.comentario`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComentario?: (ctx: ComentarioContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.comentario_de_linha`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComentario_de_linha?: (ctx: Comentario_de_linhaContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.comentario_de_bloco`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComentario_de_bloco?: (ctx: Comentario_de_blocoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.token`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitToken?: (ctx: TokenContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.aglomerado`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAglomerado?: (ctx: AglomeradoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.caractere_aglomeravel`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCaractere_aglomeravel?: (ctx: Caractere_aglomeravelContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.iniciador_de_aglomerado`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIniciador_de_aglomerado?: (ctx: Iniciador_de_aglomeradoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.possessivo_novo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPossessivo_novo?: (ctx: Possessivo_novoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.qualificador`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualificador?: (ctx: QualificadorContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.caractere_nao_aglomeravel`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCaractere_nao_aglomeravel?: (ctx: Caractere_nao_aglomeravelContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.sinal_de_pontuacao`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSinal_de_pontuacao?: (ctx: Sinal_de_pontuacaoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.simbolos_especiais`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimbolos_especiais?: (ctx: Simbolos_especiaisContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.noise`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNoise?: (ctx: NoiseContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.numero_inteiro`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumero_inteiro?: (ctx: Numero_inteiroContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.numero_decimal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumero_decimal?: (ctx: Numero_decimalContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.numero_fracionario`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumero_fracionario?: (ctx: Numero_fracionarioContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.numero_misto`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumero_misto?: (ctx: Numero_mistoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.numero_hexadecimal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumero_hexadecimal?: (ctx: Numero_hexadecimalContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.string_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitString_literal?: (ctx: String_literalContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.programa`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrograma?: (ctx: ProgramaContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.tipos_primitivos`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTipos_primitivos?: (ctx: Tipos_primitivosContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.tipo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTipo?: (ctx: TipoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.nome`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNome?: (ctx: NomeContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.nome_do_tipo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNome_do_tipo?: (ctx: Nome_do_tipoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.informacao_opcional`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInformacao_opcional?: (ctx: Informacao_opcionalContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.campos`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCampos?: (ctx: CamposContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.bytes`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBytes?: (ctx: BytesContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.refer�ncia`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRefer�ncia?: (ctx: Refer�nciaContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.campo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCampo?: (ctx: CampoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.pausa`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPausa?: (ctx: PausaContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.pausas`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPausas?: (ctx: PausasContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.conjuncoes`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConjuncoes?: (ctx: ConjuncoesContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.preposicoes`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPreposicoes?: (ctx: PreposicoesContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.�`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visit�?: (ctx: �Context) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.estrutura`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEstrutura?: (ctx: EstruturaContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.igual_a`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIgual_a?: (ctx: Igual_aContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.variavel_global`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariavel_global?: (ctx: Variavel_globalContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.rotina`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRotina?: (ctx: RotinaContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.procedimento`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcedimento?: (ctx: ProcedimentoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.determine_se`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDetermine_se?: (ctx: Determine_seContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.decisor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecisor?: (ctx: DecisorContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.fun��o2`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFun��o2?: (ctx: Fun��o2Context) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.atribua`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtribua?: (ctx: AtribuaContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.funcao`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFuncao?: (ctx: FuncaoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.para`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPara?: (ctx: ParaContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.que_se`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQue_se?: (ctx: Que_seContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.rotina2`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRotina2?: (ctx: Rotina2Context) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.compativelmente`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompativelmente?: (ctx: CompativelmenteContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.retroinvocacao`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRetroinvocacao?: (ctx: RetroinvocacaoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.nome_da_rotina`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNome_da_rotina?: (ctx: Nome_da_rotinaContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.unidade_semantica`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnidade_semantica?: (ctx: Unidade_semanticaContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.parametro`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParametro?: (ctx: ParametroContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.frase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFrase?: (ctx: FraseContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.instrucoes`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstrucoes?: (ctx: InstrucoesContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.instrucao`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstrucao?: (ctx: InstrucaoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.preserve`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPreserve?: (ctx: PreserveContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.preservacao`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPreservacao?: (ctx: PreservacaoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.iteracao`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIteracao?: (ctx: IteracaoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.se`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSe?: (ctx: SeContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.condicional`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCondicional?: (ctx: CondicionalContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.expressao_decisora`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressao_decisora?: (ctx: Expressao_decisoraContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.incondicional`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIncondicional?: (ctx: IncondicionalContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.interrupcao`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterrupcao?: (ctx: InterrupcaoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.invocacao`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvocacao?: (ctx: InvocacaoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.invocacao_interna`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvocacao_interna?: (ctx: Invocacao_internaContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.invocacao_externa`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvocacao_externa?: (ctx: Invocacao_externaContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.aspas_duplas`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAspas_duplas?: (ctx: Aspas_duplasContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.nome_da_DLL`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNome_da_DLL?: (ctx: Nome_da_DLLContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.nome_da_funcao`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNome_da_funcao?: (ctx: Nome_da_funcaoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.processe`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcesse?: (ctx: ProcesseContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.com`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCom?: (ctx: ComContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.e`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitE?: (ctx: EContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.retornando`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRetornando?: (ctx: RetornandoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.invocacao_indireta`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvocacao_indireta?: (ctx: Invocacao_indiretaContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.retorno`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRetorno?: (ctx: RetornoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.decodifique`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecodifique?: (ctx: DecodifiqueContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.decodificacao`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecodificacao?: (ctx: DecodificacaoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.aponte`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAponte?: (ctx: AponteContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.para_rotina`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPara_rotina?: (ctx: Para_rotinaContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.indirecao`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndirecao?: (ctx: IndirecaoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.push`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPush?: (ctx: PushContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.empilhamento`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEmpilhamento?: (ctx: EmpilhamentoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.reiteracao`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReiteracao?: (ctx: ReiteracaoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.diga`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiga?: (ctx: DigaContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.retorno_booleano`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRetorno_booleano?: (ctx: Retorno_booleanoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.express�o`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpress�o?: (ctx: Express�oContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.operadores_comuns`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOperadores_comuns?: (ctx: Operadores_comunsContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.booleano`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleano?: (ctx: BooleanoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.nulo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNulo?: (ctx: NuloContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.termo_constante`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTermo_constante?: (ctx: Termo_constanteContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.termo_constante_negativo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTermo_constante_negativo?: (ctx: Termo_constante_negativoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.termo_constante_positivo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTermo_constante_positivo?: (ctx: Termo_constante_positivoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.numero`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumero?: (ctx: NumeroContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteral?: (ctx: LiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.termo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTermo?: (ctx: TermoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.sinal_de_divis�o`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSinal_de_divis�o?: (ctx: Sinal_de_divis�oContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.como`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComo?: (ctx: ComoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.termo_negativo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTermo_negativo?: (ctx: Termo_negativoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.termo_positivo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTermo_positivo?: (ctx: Termo_positivoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.variavel_local`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariavel_local?: (ctx: Variavel_localContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.variavel`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariavel?: (ctx: VariavelContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.termo_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTermo_literal?: (ctx: Termo_literalContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.conte�do`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConte�do?: (ctx: Conte�doContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.magnitude`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMagnitude?: (ctx: MagnitudeContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.endere�amento`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEndere�amento?: (ctx: Endere�amentoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.possessivos_ingl�s`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPossessivos_ingl�s?: (ctx: Possessivos_ingl�sContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.possessivo_ingl�s_antigo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPossessivo_ingl�s_antigo?: (ctx: Possessivo_ingl�s_antigoContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.possessivo_portugu�s`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPossessivo_portugu�s?: (ctx: Possessivo_portugu�sContext) => Result;

	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.apostrofo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitApostrofo?: (ctx: ApostrofoContext) => Result;
}

