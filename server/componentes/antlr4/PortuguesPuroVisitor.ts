// Generated from PortuguesPuro.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { Regra_espaçoContext } from "./PortuguesPuroParser.ts";
import { PalavraContext } from "./PortuguesPuroParser.ts";
import { Possessivo_inglêsContext } from "./PortuguesPuroParser.ts";
import { ArtigoContext } from "./PortuguesPuroParser.ts";
import { Artigo_definidoContext } from "./PortuguesPuroParser.ts";
import { Artigo_indefinidoContext } from "./PortuguesPuroParser.ts";
import { AdjacentesContext } from "./PortuguesPuroParser.ts";
import { AbrangentesContext } from "./PortuguesPuroParser.ts";
import { ContraçõesContext } from "./PortuguesPuroParser.ts";
import { Atribuidores_de_posseContext } from "./PortuguesPuroParser.ts";
import { P1Context } from "./PortuguesPuroParser.ts";
import { P2Context } from "./PortuguesPuroParser.ts";
import { Operadores_de_comparaçãoContext } from "./PortuguesPuroParser.ts";
import { Palavras_reservadasContext } from "./PortuguesPuroParser.ts";
import { DenominaçõesContext } from "./PortuguesPuroParser.ts";
import { VerbosContext } from "./PortuguesPuroParser.ts";
import { Caracteres_ignoráveisContext } from "./PortuguesPuroParser.ts";
import { ComentárioContext } from "./PortuguesPuroParser.ts";
import { Comentário_de_linhaContext } from "./PortuguesPuroParser.ts";
import { Comentário_de_blocoContext } from "./PortuguesPuroParser.ts";
import { TokenContext } from "./PortuguesPuroParser.ts";
import { AglomeradoContext } from "./PortuguesPuroParser.ts";
import { Caractere_aglomerávelContext } from "./PortuguesPuroParser.ts";
import { Iniciador_de_aglomeradoContext } from "./PortuguesPuroParser.ts";
import { Possessivo_novoContext } from "./PortuguesPuroParser.ts";
import { QualificadorContext } from "./PortuguesPuroParser.ts";
import { Caractere_não_aglomerávelContext } from "./PortuguesPuroParser.ts";
import { Sinal_de_pontuaçãoContext } from "./PortuguesPuroParser.ts";
import { Símbolos_especiaisContext } from "./PortuguesPuroParser.ts";
import { RuídoContext } from "./PortuguesPuroParser.ts";
import { Número_inteiroContext } from "./PortuguesPuroParser.ts";
import { Número_decimalContext } from "./PortuguesPuroParser.ts";
import { Número_fracionárioContext } from "./PortuguesPuroParser.ts";
import { Número_mistoContext } from "./PortuguesPuroParser.ts";
import { Número_hexadecimalContext } from "./PortuguesPuroParser.ts";
import { String_literalContext } from "./PortuguesPuroParser.ts";
import { ProgramaContext } from "./PortuguesPuroParser.ts";
import { Tipos_primitivosContext } from "./PortuguesPuroParser.ts";
import { TipoContext } from "./PortuguesPuroParser.ts";
import { NomeContext } from "./PortuguesPuroParser.ts";
import { Nome_do_tipoContext } from "./PortuguesPuroParser.ts";
import { Informação_opcionalContext } from "./PortuguesPuroParser.ts";
import { CamposContext } from "./PortuguesPuroParser.ts";
import { BytesContext } from "./PortuguesPuroParser.ts";
import { ReferênciaContext } from "./PortuguesPuroParser.ts";
import { CampoContext } from "./PortuguesPuroParser.ts";
import { PausaContext } from "./PortuguesPuroParser.ts";
import { PausasContext } from "./PortuguesPuroParser.ts";
import { ConjunçõesContext } from "./PortuguesPuroParser.ts";
import { PreposiçõesContext } from "./PortuguesPuroParser.ts";
import { ÉContext } from "./PortuguesPuroParser.ts";
import { EstruturaContext } from "./PortuguesPuroParser.ts";
import { Igual_aContext } from "./PortuguesPuroParser.ts";
import { Variável_globalContext } from "./PortuguesPuroParser.ts";
import { RotinaContext } from "./PortuguesPuroParser.ts";
import { ProcedimentoContext } from "./PortuguesPuroParser.ts";
import { Determine_seContext } from "./PortuguesPuroParser.ts";
import { DecisorContext } from "./PortuguesPuroParser.ts";
import { Função2Context } from "./PortuguesPuroParser.ts";
import { AtribuaContext } from "./PortuguesPuroParser.ts";
import { FunçãoContext } from "./PortuguesPuroParser.ts";
import { ParaContext } from "./PortuguesPuroParser.ts";
import { Que_seContext } from "./PortuguesPuroParser.ts";
import { Rotina2Context } from "./PortuguesPuroParser.ts";
import { CompativelmenteContext } from "./PortuguesPuroParser.ts";
import { RetroinvocaçãoContext } from "./PortuguesPuroParser.ts";
import { Nome_da_rotinaContext } from "./PortuguesPuroParser.ts";
import { Unidade_semânticaContext } from "./PortuguesPuroParser.ts";
import { ParâmetroContext } from "./PortuguesPuroParser.ts";
import { FraseContext } from "./PortuguesPuroParser.ts";
import { InstruçõesContext } from "./PortuguesPuroParser.ts";
import { InstruçãoContext } from "./PortuguesPuroParser.ts";
import { PreserveContext } from "./PortuguesPuroParser.ts";
import { PreservaçãoContext } from "./PortuguesPuroParser.ts";
import { IteraçãoContext } from "./PortuguesPuroParser.ts";
import { SeContext } from "./PortuguesPuroParser.ts";
import { CondicionalContext } from "./PortuguesPuroParser.ts";
import { Expressão_decisoraContext } from "./PortuguesPuroParser.ts";
import { IncondicionalContext } from "./PortuguesPuroParser.ts";
import { InterrupçãoContext } from "./PortuguesPuroParser.ts";
import { InvocaçãoContext } from "./PortuguesPuroParser.ts";
import { Invocação_internaContext } from "./PortuguesPuroParser.ts";
import { Invocação_externaContext } from "./PortuguesPuroParser.ts";
import { Aspas_duplasContext } from "./PortuguesPuroParser.ts";
import { Nome_da_DLLContext } from "./PortuguesPuroParser.ts";
import { Nome_da_funçãoContext } from "./PortuguesPuroParser.ts";
import { ProcesseContext } from "./PortuguesPuroParser.ts";
import { ComContext } from "./PortuguesPuroParser.ts";
import { EContext } from "./PortuguesPuroParser.ts";
import { RetornandoContext } from "./PortuguesPuroParser.ts";
import { Invocação_indiretaContext } from "./PortuguesPuroParser.ts";
import { RetornoContext } from "./PortuguesPuroParser.ts";
import { DecodifiqueContext } from "./PortuguesPuroParser.ts";
import { DecodificaçãoContext } from "./PortuguesPuroParser.ts";
import { AponteContext } from "./PortuguesPuroParser.ts";
import { Para_rotinaContext } from "./PortuguesPuroParser.ts";
import { IndireçãoContext } from "./PortuguesPuroParser.ts";
import { PushContext } from "./PortuguesPuroParser.ts";
import { EmpilhamentoContext } from "./PortuguesPuroParser.ts";
import { ReiteraçãoContext } from "./PortuguesPuroParser.ts";
import { DigaContext } from "./PortuguesPuroParser.ts";
import { Retorno_booleanoContext } from "./PortuguesPuroParser.ts";
import { ExpressãoContext } from "./PortuguesPuroParser.ts";
import { Operadores_comunsContext } from "./PortuguesPuroParser.ts";
import { BooleanoContext } from "./PortuguesPuroParser.ts";
import { NuloContext } from "./PortuguesPuroParser.ts";
import { Termo_constanteContext } from "./PortuguesPuroParser.ts";
import { Termo_constante_negativoContext } from "./PortuguesPuroParser.ts";
import { Termo_constante_positivoContext } from "./PortuguesPuroParser.ts";
import { NúmeroContext } from "./PortuguesPuroParser.ts";
import { LiteralContext } from "./PortuguesPuroParser.ts";
import { TermoContext } from "./PortuguesPuroParser.ts";
import { Sinal_de_divisãoContext } from "./PortuguesPuroParser.ts";
import { ComoContext } from "./PortuguesPuroParser.ts";
import { Termo_negativoContext } from "./PortuguesPuroParser.ts";
import { Termo_positivoContext } from "./PortuguesPuroParser.ts";
import { Variável_localContext } from "./PortuguesPuroParser.ts";
import { VariávelContext } from "./PortuguesPuroParser.ts";
import { Termo_literalContext } from "./PortuguesPuroParser.ts";
import { ConteúdoContext } from "./PortuguesPuroParser.ts";
import { MagnitudeContext } from "./PortuguesPuroParser.ts";
import { EndereçamentoContext } from "./PortuguesPuroParser.ts";
import { Possessivos_inglêsContext } from "./PortuguesPuroParser.ts";
import { Possessivo_inglês_antigoContext } from "./PortuguesPuroParser.ts";
import { Possessivo_portuguêsContext } from "./PortuguesPuroParser.ts";
import { ApóstrofoContext } from "./PortuguesPuroParser.ts";



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
	 * Visit a parse tree produced by `PortuguesPuroParser.regra_espaço`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRegra_espaço?: (ctx: Regra_espaçoContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.palavra`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPalavra?: (ctx: PalavraContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.possessivo_inglês`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPossessivo_inglês?: (ctx: Possessivo_inglêsContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.contrações`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContrações?: (ctx: ContraçõesContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.operadores_de_comparação`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOperadores_de_comparação?: (ctx: Operadores_de_comparaçãoContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.palavras_reservadas`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPalavras_reservadas?: (ctx: Palavras_reservadasContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.denominações`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDenominações?: (ctx: DenominaçõesContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.verbos`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVerbos?: (ctx: VerbosContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.caracteres_ignoráveis`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCaracteres_ignoráveis?: (ctx: Caracteres_ignoráveisContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.comentário`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComentário?: (ctx: ComentárioContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.comentário_de_linha`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComentário_de_linha?: (ctx: Comentário_de_linhaContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.comentário_de_bloco`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComentário_de_bloco?: (ctx: Comentário_de_blocoContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.caractere_aglomerável`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCaractere_aglomerável?: (ctx: Caractere_aglomerávelContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.caractere_não_aglomerável`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCaractere_não_aglomerável?: (ctx: Caractere_não_aglomerávelContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.sinal_de_pontuação`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSinal_de_pontuação?: (ctx: Sinal_de_pontuaçãoContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.símbolos_especiais`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSímbolos_especiais?: (ctx: Símbolos_especiaisContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.ruído`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRuído?: (ctx: RuídoContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.número_inteiro`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNúmero_inteiro?: (ctx: Número_inteiroContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.número_decimal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNúmero_decimal?: (ctx: Número_decimalContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.número_fracionário`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNúmero_fracionário?: (ctx: Número_fracionárioContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.número_misto`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNúmero_misto?: (ctx: Número_mistoContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.número_hexadecimal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNúmero_hexadecimal?: (ctx: Número_hexadecimalContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.informação_opcional`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInformação_opcional?: (ctx: Informação_opcionalContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.referência`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReferência?: (ctx: ReferênciaContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.conjunções`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConjunções?: (ctx: ConjunçõesContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.preposições`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPreposições?: (ctx: PreposiçõesContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.é`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitÉ?: (ctx: ÉContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.variável_global`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariável_global?: (ctx: Variável_globalContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.função2`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunção2?: (ctx: Função2Context) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.atribua`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtribua?: (ctx: AtribuaContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.função`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunção?: (ctx: FunçãoContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.retroinvocação`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRetroinvocação?: (ctx: RetroinvocaçãoContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.nome_da_rotina`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNome_da_rotina?: (ctx: Nome_da_rotinaContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.unidade_semântica`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnidade_semântica?: (ctx: Unidade_semânticaContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.parâmetro`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParâmetro?: (ctx: ParâmetroContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.frase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFrase?: (ctx: FraseContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.instruções`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstruções?: (ctx: InstruçõesContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.instrução`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstrução?: (ctx: InstruçãoContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.preserve`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPreserve?: (ctx: PreserveContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.preservação`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPreservação?: (ctx: PreservaçãoContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.iteração`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIteração?: (ctx: IteraçãoContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.expressão_decisora`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressão_decisora?: (ctx: Expressão_decisoraContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.incondicional`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIncondicional?: (ctx: IncondicionalContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.interrupção`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterrupção?: (ctx: InterrupçãoContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.invocação`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvocação?: (ctx: InvocaçãoContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.invocação_interna`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvocação_interna?: (ctx: Invocação_internaContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.invocação_externa`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvocação_externa?: (ctx: Invocação_externaContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.nome_da_função`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNome_da_função?: (ctx: Nome_da_funçãoContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.invocação_indireta`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvocação_indireta?: (ctx: Invocação_indiretaContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.decodificação`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecodificação?: (ctx: DecodificaçãoContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.indireção`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndireção?: (ctx: IndireçãoContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.reiteração`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReiteração?: (ctx: ReiteraçãoContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.expressão`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressão?: (ctx: ExpressãoContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.número`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNúmero?: (ctx: NúmeroContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.sinal_de_divisão`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSinal_de_divisão?: (ctx: Sinal_de_divisãoContext) => Result;
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
	 * Visit a parse tree produced by `PortuguesPuroParser.variável_local`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariável_local?: (ctx: Variável_localContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.variável`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariável?: (ctx: VariávelContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.termo_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTermo_literal?: (ctx: Termo_literalContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.conteúdo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConteúdo?: (ctx: ConteúdoContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.magnitude`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMagnitude?: (ctx: MagnitudeContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.endereçamento`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEndereçamento?: (ctx: EndereçamentoContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.possessivos_inglês`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPossessivos_inglês?: (ctx: Possessivos_inglêsContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.possessivo_inglês_antigo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPossessivo_inglês_antigo?: (ctx: Possessivo_inglês_antigoContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.possessivo_português`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPossessivo_português?: (ctx: Possessivo_portuguêsContext) => Result;
	/**
	 * Visit a parse tree produced by `PortuguesPuroParser.apóstrofo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitApóstrofo?: (ctx: ApóstrofoContext) => Result;
}

