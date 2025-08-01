// Generated from PortuguesPuro.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { Regra_espa�oContext } from "./PortuguesPuroParser.js";
import { PalavraContext } from "./PortuguesPuroParser.js";
import { Possessivo_ingl�sContext } from "./PortuguesPuroParser.js";
import { ArtigoContext } from "./PortuguesPuroParser.js";
import { Artigo_definidoContext } from "./PortuguesPuroParser.js";
import { Artigo_indefinidoContext } from "./PortuguesPuroParser.js";
import { AdjacentesContext } from "./PortuguesPuroParser.js";
import { AbrangentesContext } from "./PortuguesPuroParser.js";
import { Contra��esContext } from "./PortuguesPuroParser.js";
import { Atribuidores_de_posseContext } from "./PortuguesPuroParser.js";
import { P1Context } from "./PortuguesPuroParser.js";
import { P2Context } from "./PortuguesPuroParser.js";
import { Operadores_de_compara��oContext } from "./PortuguesPuroParser.js";
import { Palavras_reservadasContext } from "./PortuguesPuroParser.js";
import { Denomina��esContext } from "./PortuguesPuroParser.js";
import { VerbosContext } from "./PortuguesPuroParser.js";
import { Caracteres_ignor�veisContext } from "./PortuguesPuroParser.js";
import { Coment�rioContext } from "./PortuguesPuroParser.js";
import { Coment�rio_de_linhaContext } from "./PortuguesPuroParser.js";
import { Coment�rio_de_blocoContext } from "./PortuguesPuroParser.js";
import { TokenContext } from "./PortuguesPuroParser.js";
import { AglomeradoContext } from "./PortuguesPuroParser.js";
import { Caractere_aglomer�velContext } from "./PortuguesPuroParser.js";
import { Iniciador_de_aglomeradoContext } from "./PortuguesPuroParser.js";
import { Possessivo_novoContext } from "./PortuguesPuroParser.js";
import { QualificadorContext } from "./PortuguesPuroParser.js";
import { Caractere_n�o_aglomer�velContext } from "./PortuguesPuroParser.js";
import { Sinal_de_pontua��oContext } from "./PortuguesPuroParser.js";
import { S�mbolos_especiaisContext } from "./PortuguesPuroParser.js";
import { Ru�doContext } from "./PortuguesPuroParser.js";
import { N�mero_inteiroContext } from "./PortuguesPuroParser.js";
import { N�mero_decimalContext } from "./PortuguesPuroParser.js";
import { N�mero_fracion�rioContext } from "./PortuguesPuroParser.js";
import { N�mero_mistoContext } from "./PortuguesPuroParser.js";
import { N�mero_hexadecimalContext } from "./PortuguesPuroParser.js";
import { String_literalContext } from "./PortuguesPuroParser.js";
import { ProgramaContext } from "./PortuguesPuroParser.js";
import { Tipos_primitivosContext } from "./PortuguesPuroParser.js";
import { TipoContext } from "./PortuguesPuroParser.js";
import { NomeContext } from "./PortuguesPuroParser.js";
import { Nome_do_tipoContext } from "./PortuguesPuroParser.js";
import { Informa��o_opcionalContext } from "./PortuguesPuroParser.js";
import { CamposContext } from "./PortuguesPuroParser.js";
import { BytesContext } from "./PortuguesPuroParser.js";
import { Refer�nciaContext } from "./PortuguesPuroParser.js";
import { CampoContext } from "./PortuguesPuroParser.js";
import { PausaContext } from "./PortuguesPuroParser.js";
import { PausasContext } from "./PortuguesPuroParser.js";
import { Conjun��esContext } from "./PortuguesPuroParser.js";
import { Preposi��esContext } from "./PortuguesPuroParser.js";
import { �Context } from "./PortuguesPuroParser.js";
import { EstruturaContext } from "./PortuguesPuroParser.js";
import { Igual_aContext } from "./PortuguesPuroParser.js";
import { Vari�vel_globalContext } from "./PortuguesPuroParser.js";
import { RotinaContext } from "./PortuguesPuroParser.js";
import { ProcedimentoContext } from "./PortuguesPuroParser.js";
import { Determine_seContext } from "./PortuguesPuroParser.js";
import { DecisorContext } from "./PortuguesPuroParser.js";
import { Fun��o2Context } from "./PortuguesPuroParser.js";
import { AtribuaContext } from "./PortuguesPuroParser.js";
import { Fun��oContext } from "./PortuguesPuroParser.js";
import { ParaContext } from "./PortuguesPuroParser.js";
import { Que_seContext } from "./PortuguesPuroParser.js";
import { Rotina2Context } from "./PortuguesPuroParser.js";
import { CompativelmenteContext } from "./PortuguesPuroParser.js";
import { Retroinvoca��oContext } from "./PortuguesPuroParser.js";
import { Nome_da_rotinaContext } from "./PortuguesPuroParser.js";
import { Unidade_sem�nticaContext } from "./PortuguesPuroParser.js";
import { Par�metroContext } from "./PortuguesPuroParser.js";
import { FraseContext } from "./PortuguesPuroParser.js";
import { Instru��esContext } from "./PortuguesPuroParser.js";
import { Instru��oContext } from "./PortuguesPuroParser.js";
import { PreserveContext } from "./PortuguesPuroParser.js";
import { Preserva��oContext } from "./PortuguesPuroParser.js";
import { Itera��oContext } from "./PortuguesPuroParser.js";
import { SeContext } from "./PortuguesPuroParser.js";
import { CondicionalContext } from "./PortuguesPuroParser.js";
import { Express�o_decisoraContext } from "./PortuguesPuroParser.js";
import { IncondicionalContext } from "./PortuguesPuroParser.js";
import { Interrup��oContext } from "./PortuguesPuroParser.js";
import { Invoca��oContext } from "./PortuguesPuroParser.js";
import { Invoca��o_internaContext } from "./PortuguesPuroParser.js";
import { Invoca��o_externaContext } from "./PortuguesPuroParser.js";
import { Aspas_duplasContext } from "./PortuguesPuroParser.js";
import { Nome_da_DLLContext } from "./PortuguesPuroParser.js";
import { Nome_da_fun��oContext } from "./PortuguesPuroParser.js";
import { ProcesseContext } from "./PortuguesPuroParser.js";
import { ComContext } from "./PortuguesPuroParser.js";
import { EContext } from "./PortuguesPuroParser.js";
import { RetornandoContext } from "./PortuguesPuroParser.js";
import { Invoca��o_indiretaContext } from "./PortuguesPuroParser.js";
import { RetornoContext } from "./PortuguesPuroParser.js";
import { DecodifiqueContext } from "./PortuguesPuroParser.js";
import { Decodifica��oContext } from "./PortuguesPuroParser.js";
import { AponteContext } from "./PortuguesPuroParser.js";
import { Para_rotinaContext } from "./PortuguesPuroParser.js";
import { Indire��oContext } from "./PortuguesPuroParser.js";
import { PushContext } from "./PortuguesPuroParser.js";
import { EmpilhamentoContext } from "./PortuguesPuroParser.js";
import { Reitera��oContext } from "./PortuguesPuroParser.js";
import { DigaContext } from "./PortuguesPuroParser.js";
import { Retorno_booleanoContext } from "./PortuguesPuroParser.js";
import { Express�oContext } from "./PortuguesPuroParser.js";
import { Operadores_comunsContext } from "./PortuguesPuroParser.js";
import { BooleanoContext } from "./PortuguesPuroParser.js";
import { NuloContext } from "./PortuguesPuroParser.js";
import { Termo_constanteContext } from "./PortuguesPuroParser.js";
import { Termo_constante_negativoContext } from "./PortuguesPuroParser.js";
import { Termo_constante_positivoContext } from "./PortuguesPuroParser.js";
import { N�meroContext } from "./PortuguesPuroParser.js";
import { LiteralContext } from "./PortuguesPuroParser.js";
import { TermoContext } from "./PortuguesPuroParser.js";
import { Sinal_de_divis�oContext } from "./PortuguesPuroParser.js";
import { ComoContext } from "./PortuguesPuroParser.js";
import { Termo_negativoContext } from "./PortuguesPuroParser.js";
import { Termo_positivoContext } from "./PortuguesPuroParser.js";
import { Vari�vel_localContext } from "./PortuguesPuroParser.js";
import { Vari�velContext } from "./PortuguesPuroParser.js";
import { Termo_literalContext } from "./PortuguesPuroParser.js";
import { Conte�doContext } from "./PortuguesPuroParser.js";
import { MagnitudeContext } from "./PortuguesPuroParser.js";
import { Endere�amentoContext } from "./PortuguesPuroParser.js";
import { Possessivos_ingl�sContext } from "./PortuguesPuroParser.js";
import { Possessivo_ingl�s_antigoContext } from "./PortuguesPuroParser.js";
import { Possessivo_portugu�sContext } from "./PortuguesPuroParser.js";
import { Ap�strofoContext } from "./PortuguesPuroParser.js";



/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `PortuguesPuroParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class PortuguesPuroVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
   * 
	 * Visit a parse tree produced by `PortuguesPuroParser.regra_espa�o`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRegra_espa�o?: (ctx: Regra_espa�oContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.contra��es`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContra��es?: (ctx: Contra��esContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.operadores_de_compara��o`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOperadores_de_compara��o?: (ctx: Operadores_de_compara��oContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.palavras_reservadas`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPalavras_reservadas?: (ctx: Palavras_reservadasContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.denomina��es`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDenomina��es?: (ctx: Denomina��esContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.verbos`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVerbos?: (ctx: VerbosContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.caracteres_ignor�veis`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCaracteres_ignor�veis?: (ctx: Caracteres_ignor�veisContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.coment�rio`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComent�rio?: (ctx: Coment�rioContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.coment�rio_de_linha`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComent�rio_de_linha?: (ctx: Coment�rio_de_linhaContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.coment�rio_de_bloco`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComent�rio_de_bloco?: (ctx: Coment�rio_de_blocoContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.caractere_aglomer�vel`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCaractere_aglomer�vel?: (ctx: Caractere_aglomer�velContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.caractere_n�o_aglomer�vel`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCaractere_n�o_aglomer�vel?: (ctx: Caractere_n�o_aglomer�velContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.sinal_de_pontua��o`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSinal_de_pontua��o?: (ctx: Sinal_de_pontua��oContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.s�mbolos_especiais`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitS�mbolos_especiais?: (ctx: S�mbolos_especiaisContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.ru�do`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRu�do?: (ctx: Ru�doContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.n�mero_inteiro`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitN�mero_inteiro?: (ctx: N�mero_inteiroContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.n�mero_decimal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitN�mero_decimal?: (ctx: N�mero_decimalContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.n�mero_fracion�rio`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitN�mero_fracion�rio?: (ctx: N�mero_fracion�rioContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.n�mero_misto`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitN�mero_misto?: (ctx: N�mero_mistoContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.n�mero_hexadecimal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitN�mero_hexadecimal?: (ctx: N�mero_hexadecimalContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.informa��o_opcional`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInforma��o_opcional?: (ctx: Informa��o_opcionalContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.conjun��es`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConjun��es?: (ctx: Conjun��esContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.preposi��es`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPreposi��es?: (ctx: Preposi��esContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.vari�vel_global`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVari�vel_global?: (ctx: Vari�vel_globalContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.fun��o`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFun��o?: (ctx: Fun��oContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.retroinvoca��o`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRetroinvoca��o?: (ctx: Retroinvoca��oContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.nome_da_rotina`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNome_da_rotina?: (ctx: Nome_da_rotinaContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.unidade_sem�ntica`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnidade_sem�ntica?: (ctx: Unidade_sem�nticaContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.par�metro`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPar�metro?: (ctx: Par�metroContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.frase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFrase?: (ctx: FraseContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.instru��es`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstru��es?: (ctx: Instru��esContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.instru��o`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstru��o?: (ctx: Instru��oContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.preserve`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPreserve?: (ctx: PreserveContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.preserva��o`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPreserva��o?: (ctx: Preserva��oContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.itera��o`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitItera��o?: (ctx: Itera��oContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.express�o_decisora`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpress�o_decisora?: (ctx: Express�o_decisoraContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.incondicional`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIncondicional?: (ctx: IncondicionalContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.interrup��o`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterrup��o?: (ctx: Interrup��oContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.invoca��o`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvoca��o?: (ctx: Invoca��oContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.invoca��o_interna`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvoca��o_interna?: (ctx: Invoca��o_internaContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.invoca��o_externa`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvoca��o_externa?: (ctx: Invoca��o_externaContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.nome_da_fun��o`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNome_da_fun��o?: (ctx: Nome_da_fun��oContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.invoca��o_indireta`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvoca��o_indireta?: (ctx: Invoca��o_indiretaContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.decodifica��o`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecodifica��o?: (ctx: Decodifica��oContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.indire��o`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndire��o?: (ctx: Indire��oContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.reitera��o`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReitera��o?: (ctx: Reitera��oContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.n�mero`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitN�mero?: (ctx: N�meroContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.vari�vel_local`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVari�vel_local?: (ctx: Vari�vel_localContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.vari�vel`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVari�vel?: (ctx: Vari�velContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.ap�strofo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAp�strofo?: (ctx: Ap�strofoContext) => Result;
}

