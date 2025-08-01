// Generated from PortuguesPuro.g4 by ANTLR 4.13.2

import {ParseTreeListener} from "antlr4";


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
 * This interface defines a complete listener for a parse tree produced by
 * `PortuguesPuroParser`.
 */
export default class PortuguesPuroListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.regra_espaço`.
	 * @param ctx the parse tree
	 */
	enterRegra_espaço?: (ctx: Regra_espaçoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.regra_espaço`.
	 * @param ctx the parse tree
	 */
	exitRegra_espaço?: (ctx: Regra_espaçoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.palavra`.
	 * @param ctx the parse tree
	 */
	enterPalavra?: (ctx: PalavraContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.palavra`.
	 * @param ctx the parse tree
	 */
	exitPalavra?: (ctx: PalavraContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.possessivo_inglês`.
	 * @param ctx the parse tree
	 */
	enterPossessivo_inglês?: (ctx: Possessivo_inglêsContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.possessivo_inglês`.
	 * @param ctx the parse tree
	 */
	exitPossessivo_inglês?: (ctx: Possessivo_inglêsContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.artigo`.
	 * @param ctx the parse tree
	 */
	enterArtigo?: (ctx: ArtigoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.artigo`.
	 * @param ctx the parse tree
	 */
	exitArtigo?: (ctx: ArtigoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.artigo_definido`.
	 * @param ctx the parse tree
	 */
	enterArtigo_definido?: (ctx: Artigo_definidoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.artigo_definido`.
	 * @param ctx the parse tree
	 */
	exitArtigo_definido?: (ctx: Artigo_definidoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.artigo_indefinido`.
	 * @param ctx the parse tree
	 */
	enterArtigo_indefinido?: (ctx: Artigo_indefinidoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.artigo_indefinido`.
	 * @param ctx the parse tree
	 */
	exitArtigo_indefinido?: (ctx: Artigo_indefinidoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.adjacentes`.
	 * @param ctx the parse tree
	 */
	enterAdjacentes?: (ctx: AdjacentesContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.adjacentes`.
	 * @param ctx the parse tree
	 */
	exitAdjacentes?: (ctx: AdjacentesContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.abrangentes`.
	 * @param ctx the parse tree
	 */
	enterAbrangentes?: (ctx: AbrangentesContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.abrangentes`.
	 * @param ctx the parse tree
	 */
	exitAbrangentes?: (ctx: AbrangentesContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.contrações`.
	 * @param ctx the parse tree
	 */
	enterContrações?: (ctx: ContraçõesContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.contrações`.
	 * @param ctx the parse tree
	 */
	exitContrações?: (ctx: ContraçõesContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.atribuidores_de_posse`.
	 * @param ctx the parse tree
	 */
	enterAtribuidores_de_posse?: (ctx: Atribuidores_de_posseContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.atribuidores_de_posse`.
	 * @param ctx the parse tree
	 */
	exitAtribuidores_de_posse?: (ctx: Atribuidores_de_posseContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.p1`.
	 * @param ctx the parse tree
	 */
	enterP1?: (ctx: P1Context) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.p1`.
	 * @param ctx the parse tree
	 */
	exitP1?: (ctx: P1Context) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.p2`.
	 * @param ctx the parse tree
	 */
	enterP2?: (ctx: P2Context) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.p2`.
	 * @param ctx the parse tree
	 */
	exitP2?: (ctx: P2Context) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.operadores_de_comparação`.
	 * @param ctx the parse tree
	 */
	enterOperadores_de_comparação?: (ctx: Operadores_de_comparaçãoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.operadores_de_comparação`.
	 * @param ctx the parse tree
	 */
	exitOperadores_de_comparação?: (ctx: Operadores_de_comparaçãoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.palavras_reservadas`.
	 * @param ctx the parse tree
	 */
	enterPalavras_reservadas?: (ctx: Palavras_reservadasContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.palavras_reservadas`.
	 * @param ctx the parse tree
	 */
	exitPalavras_reservadas?: (ctx: Palavras_reservadasContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.denominações`.
	 * @param ctx the parse tree
	 */
	enterDenominações?: (ctx: DenominaçõesContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.denominações`.
	 * @param ctx the parse tree
	 */
	exitDenominações?: (ctx: DenominaçõesContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.verbos`.
	 * @param ctx the parse tree
	 */
	enterVerbos?: (ctx: VerbosContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.verbos`.
	 * @param ctx the parse tree
	 */
	exitVerbos?: (ctx: VerbosContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.caracteres_ignoráveis`.
	 * @param ctx the parse tree
	 */
	enterCaracteres_ignoráveis?: (ctx: Caracteres_ignoráveisContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.caracteres_ignoráveis`.
	 * @param ctx the parse tree
	 */
	exitCaracteres_ignoráveis?: (ctx: Caracteres_ignoráveisContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.comentário`.
	 * @param ctx the parse tree
	 */
	enterComentário?: (ctx: ComentárioContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.comentário`.
	 * @param ctx the parse tree
	 */
	exitComentário?: (ctx: ComentárioContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.comentário_de_linha`.
	 * @param ctx the parse tree
	 */
	enterComentário_de_linha?: (ctx: Comentário_de_linhaContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.comentário_de_linha`.
	 * @param ctx the parse tree
	 */
	exitComentário_de_linha?: (ctx: Comentário_de_linhaContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.comentário_de_bloco`.
	 * @param ctx the parse tree
	 */
	enterComentário_de_bloco?: (ctx: Comentário_de_blocoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.comentário_de_bloco`.
	 * @param ctx the parse tree
	 */
	exitComentário_de_bloco?: (ctx: Comentário_de_blocoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.token`.
	 * @param ctx the parse tree
	 */
	enterToken?: (ctx: TokenContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.token`.
	 * @param ctx the parse tree
	 */
	exitToken?: (ctx: TokenContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.aglomerado`.
	 * @param ctx the parse tree
	 */
	enterAglomerado?: (ctx: AglomeradoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.aglomerado`.
	 * @param ctx the parse tree
	 */
	exitAglomerado?: (ctx: AglomeradoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.caractere_aglomerável`.
	 * @param ctx the parse tree
	 */
	enterCaractere_aglomerável?: (ctx: Caractere_aglomerávelContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.caractere_aglomerável`.
	 * @param ctx the parse tree
	 */
	exitCaractere_aglomerável?: (ctx: Caractere_aglomerávelContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.iniciador_de_aglomerado`.
	 * @param ctx the parse tree
	 */
	enterIniciador_de_aglomerado?: (ctx: Iniciador_de_aglomeradoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.iniciador_de_aglomerado`.
	 * @param ctx the parse tree
	 */
	exitIniciador_de_aglomerado?: (ctx: Iniciador_de_aglomeradoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.possessivo_novo`.
	 * @param ctx the parse tree
	 */
	enterPossessivo_novo?: (ctx: Possessivo_novoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.possessivo_novo`.
	 * @param ctx the parse tree
	 */
	exitPossessivo_novo?: (ctx: Possessivo_novoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.qualificador`.
	 * @param ctx the parse tree
	 */
	enterQualificador?: (ctx: QualificadorContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.qualificador`.
	 * @param ctx the parse tree
	 */
	exitQualificador?: (ctx: QualificadorContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.caractere_não_aglomerável`.
	 * @param ctx the parse tree
	 */
	enterCaractere_não_aglomerável?: (ctx: Caractere_não_aglomerávelContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.caractere_não_aglomerável`.
	 * @param ctx the parse tree
	 */
	exitCaractere_não_aglomerável?: (ctx: Caractere_não_aglomerávelContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.sinal_de_pontuação`.
	 * @param ctx the parse tree
	 */
	enterSinal_de_pontuação?: (ctx: Sinal_de_pontuaçãoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.sinal_de_pontuação`.
	 * @param ctx the parse tree
	 */
	exitSinal_de_pontuação?: (ctx: Sinal_de_pontuaçãoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.símbolos_especiais`.
	 * @param ctx the parse tree
	 */
	enterSímbolos_especiais?: (ctx: Símbolos_especiaisContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.símbolos_especiais`.
	 * @param ctx the parse tree
	 */
	exitSímbolos_especiais?: (ctx: Símbolos_especiaisContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.ruído`.
	 * @param ctx the parse tree
	 */
	enterRuído?: (ctx: RuídoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.ruído`.
	 * @param ctx the parse tree
	 */
	exitRuído?: (ctx: RuídoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.número_inteiro`.
	 * @param ctx the parse tree
	 */
	enterNúmero_inteiro?: (ctx: Número_inteiroContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.número_inteiro`.
	 * @param ctx the parse tree
	 */
	exitNúmero_inteiro?: (ctx: Número_inteiroContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.número_decimal`.
	 * @param ctx the parse tree
	 */
	enterNúmero_decimal?: (ctx: Número_decimalContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.número_decimal`.
	 * @param ctx the parse tree
	 */
	exitNúmero_decimal?: (ctx: Número_decimalContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.número_fracionário`.
	 * @param ctx the parse tree
	 */
	enterNúmero_fracionário?: (ctx: Número_fracionárioContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.número_fracionário`.
	 * @param ctx the parse tree
	 */
	exitNúmero_fracionário?: (ctx: Número_fracionárioContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.número_misto`.
	 * @param ctx the parse tree
	 */
	enterNúmero_misto?: (ctx: Número_mistoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.número_misto`.
	 * @param ctx the parse tree
	 */
	exitNúmero_misto?: (ctx: Número_mistoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.número_hexadecimal`.
	 * @param ctx the parse tree
	 */
	enterNúmero_hexadecimal?: (ctx: Número_hexadecimalContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.número_hexadecimal`.
	 * @param ctx the parse tree
	 */
	exitNúmero_hexadecimal?: (ctx: Número_hexadecimalContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.string_literal`.
	 * @param ctx the parse tree
	 */
	enterString_literal?: (ctx: String_literalContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.string_literal`.
	 * @param ctx the parse tree
	 */
	exitString_literal?: (ctx: String_literalContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.programa`.
	 * @param ctx the parse tree
	 */
	enterPrograma?: (ctx: ProgramaContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.programa`.
	 * @param ctx the parse tree
	 */
	exitPrograma?: (ctx: ProgramaContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.tipos_primitivos`.
	 * @param ctx the parse tree
	 */
	enterTipos_primitivos?: (ctx: Tipos_primitivosContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.tipos_primitivos`.
	 * @param ctx the parse tree
	 */
	exitTipos_primitivos?: (ctx: Tipos_primitivosContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.tipo`.
	 * @param ctx the parse tree
	 */
	enterTipo?: (ctx: TipoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.tipo`.
	 * @param ctx the parse tree
	 */
	exitTipo?: (ctx: TipoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.nome`.
	 * @param ctx the parse tree
	 */
	enterNome?: (ctx: NomeContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.nome`.
	 * @param ctx the parse tree
	 */
	exitNome?: (ctx: NomeContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.nome_do_tipo`.
	 * @param ctx the parse tree
	 */
	enterNome_do_tipo?: (ctx: Nome_do_tipoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.nome_do_tipo`.
	 * @param ctx the parse tree
	 */
	exitNome_do_tipo?: (ctx: Nome_do_tipoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.informação_opcional`.
	 * @param ctx the parse tree
	 */
	enterInformação_opcional?: (ctx: Informação_opcionalContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.informação_opcional`.
	 * @param ctx the parse tree
	 */
	exitInformação_opcional?: (ctx: Informação_opcionalContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.campos`.
	 * @param ctx the parse tree
	 */
	enterCampos?: (ctx: CamposContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.campos`.
	 * @param ctx the parse tree
	 */
	exitCampos?: (ctx: CamposContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.bytes`.
	 * @param ctx the parse tree
	 */
	enterBytes?: (ctx: BytesContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.bytes`.
	 * @param ctx the parse tree
	 */
	exitBytes?: (ctx: BytesContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.referência`.
	 * @param ctx the parse tree
	 */
	enterReferência?: (ctx: ReferênciaContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.referência`.
	 * @param ctx the parse tree
	 */
	exitReferência?: (ctx: ReferênciaContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.campo`.
	 * @param ctx the parse tree
	 */
	enterCampo?: (ctx: CampoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.campo`.
	 * @param ctx the parse tree
	 */
	exitCampo?: (ctx: CampoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.pausa`.
	 * @param ctx the parse tree
	 */
	enterPausa?: (ctx: PausaContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.pausa`.
	 * @param ctx the parse tree
	 */
	exitPausa?: (ctx: PausaContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.pausas`.
	 * @param ctx the parse tree
	 */
	enterPausas?: (ctx: PausasContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.pausas`.
	 * @param ctx the parse tree
	 */
	exitPausas?: (ctx: PausasContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.conjunções`.
	 * @param ctx the parse tree
	 */
	enterConjunções?: (ctx: ConjunçõesContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.conjunções`.
	 * @param ctx the parse tree
	 */
	exitConjunções?: (ctx: ConjunçõesContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.preposições`.
	 * @param ctx the parse tree
	 */
	enterPreposições?: (ctx: PreposiçõesContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.preposições`.
	 * @param ctx the parse tree
	 */
	exitPreposições?: (ctx: PreposiçõesContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.é`.
	 * @param ctx the parse tree
	 */
	enterÉ?: (ctx: ÉContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.é`.
	 * @param ctx the parse tree
	 */
	exitÉ?: (ctx: ÉContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.estrutura`.
	 * @param ctx the parse tree
	 */
	enterEstrutura?: (ctx: EstruturaContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.estrutura`.
	 * @param ctx the parse tree
	 */
	exitEstrutura?: (ctx: EstruturaContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.igual_a`.
	 * @param ctx the parse tree
	 */
	enterIgual_a?: (ctx: Igual_aContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.igual_a`.
	 * @param ctx the parse tree
	 */
	exitIgual_a?: (ctx: Igual_aContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.variável_global`.
	 * @param ctx the parse tree
	 */
	enterVariável_global?: (ctx: Variável_globalContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.variável_global`.
	 * @param ctx the parse tree
	 */
	exitVariável_global?: (ctx: Variável_globalContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.rotina`.
	 * @param ctx the parse tree
	 */
	enterRotina?: (ctx: RotinaContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.rotina`.
	 * @param ctx the parse tree
	 */
	exitRotina?: (ctx: RotinaContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.procedimento`.
	 * @param ctx the parse tree
	 */
	enterProcedimento?: (ctx: ProcedimentoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.procedimento`.
	 * @param ctx the parse tree
	 */
	exitProcedimento?: (ctx: ProcedimentoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.determine_se`.
	 * @param ctx the parse tree
	 */
	enterDetermine_se?: (ctx: Determine_seContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.determine_se`.
	 * @param ctx the parse tree
	 */
	exitDetermine_se?: (ctx: Determine_seContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.decisor`.
	 * @param ctx the parse tree
	 */
	enterDecisor?: (ctx: DecisorContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.decisor`.
	 * @param ctx the parse tree
	 */
	exitDecisor?: (ctx: DecisorContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.função2`.
	 * @param ctx the parse tree
	 */
	enterFunção2?: (ctx: Função2Context) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.função2`.
	 * @param ctx the parse tree
	 */
	exitFunção2?: (ctx: Função2Context) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.atribua`.
	 * @param ctx the parse tree
	 */
	enterAtribua?: (ctx: AtribuaContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.atribua`.
	 * @param ctx the parse tree
	 */
	exitAtribua?: (ctx: AtribuaContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.função`.
	 * @param ctx the parse tree
	 */
	enterFunção?: (ctx: FunçãoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.função`.
	 * @param ctx the parse tree
	 */
	exitFunção?: (ctx: FunçãoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.para`.
	 * @param ctx the parse tree
	 */
	enterPara?: (ctx: ParaContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.para`.
	 * @param ctx the parse tree
	 */
	exitPara?: (ctx: ParaContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.que_se`.
	 * @param ctx the parse tree
	 */
	enterQue_se?: (ctx: Que_seContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.que_se`.
	 * @param ctx the parse tree
	 */
	exitQue_se?: (ctx: Que_seContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.rotina2`.
	 * @param ctx the parse tree
	 */
	enterRotina2?: (ctx: Rotina2Context) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.rotina2`.
	 * @param ctx the parse tree
	 */
	exitRotina2?: (ctx: Rotina2Context) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.compativelmente`.
	 * @param ctx the parse tree
	 */
	enterCompativelmente?: (ctx: CompativelmenteContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.compativelmente`.
	 * @param ctx the parse tree
	 */
	exitCompativelmente?: (ctx: CompativelmenteContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.retroinvocação`.
	 * @param ctx the parse tree
	 */
	enterRetroinvocação?: (ctx: RetroinvocaçãoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.retroinvocação`.
	 * @param ctx the parse tree
	 */
	exitRetroinvocação?: (ctx: RetroinvocaçãoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.nome_da_rotina`.
	 * @param ctx the parse tree
	 */
	enterNome_da_rotina?: (ctx: Nome_da_rotinaContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.nome_da_rotina`.
	 * @param ctx the parse tree
	 */
	exitNome_da_rotina?: (ctx: Nome_da_rotinaContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.unidade_semântica`.
	 * @param ctx the parse tree
	 */
	enterUnidade_semântica?: (ctx: Unidade_semânticaContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.unidade_semântica`.
	 * @param ctx the parse tree
	 */
	exitUnidade_semântica?: (ctx: Unidade_semânticaContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.parâmetro`.
	 * @param ctx the parse tree
	 */
	enterParâmetro?: (ctx: ParâmetroContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.parâmetro`.
	 * @param ctx the parse tree
	 */
	exitParâmetro?: (ctx: ParâmetroContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.frase`.
	 * @param ctx the parse tree
	 */
	enterFrase?: (ctx: FraseContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.frase`.
	 * @param ctx the parse tree
	 */
	exitFrase?: (ctx: FraseContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.instruções`.
	 * @param ctx the parse tree
	 */
	enterInstruções?: (ctx: InstruçõesContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.instruções`.
	 * @param ctx the parse tree
	 */
	exitInstruções?: (ctx: InstruçõesContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.instrução`.
	 * @param ctx the parse tree
	 */
	enterInstrução?: (ctx: InstruçãoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.instrução`.
	 * @param ctx the parse tree
	 */
	exitInstrução?: (ctx: InstruçãoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.preserve`.
	 * @param ctx the parse tree
	 */
	enterPreserve?: (ctx: PreserveContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.preserve`.
	 * @param ctx the parse tree
	 */
	exitPreserve?: (ctx: PreserveContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.preservação`.
	 * @param ctx the parse tree
	 */
	enterPreservação?: (ctx: PreservaçãoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.preservação`.
	 * @param ctx the parse tree
	 */
	exitPreservação?: (ctx: PreservaçãoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.iteração`.
	 * @param ctx the parse tree
	 */
	enterIteração?: (ctx: IteraçãoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.iteração`.
	 * @param ctx the parse tree
	 */
	exitIteração?: (ctx: IteraçãoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.se`.
	 * @param ctx the parse tree
	 */
	enterSe?: (ctx: SeContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.se`.
	 * @param ctx the parse tree
	 */
	exitSe?: (ctx: SeContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.condicional`.
	 * @param ctx the parse tree
	 */
	enterCondicional?: (ctx: CondicionalContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.condicional`.
	 * @param ctx the parse tree
	 */
	exitCondicional?: (ctx: CondicionalContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.expressão_decisora`.
	 * @param ctx the parse tree
	 */
	enterExpressão_decisora?: (ctx: Expressão_decisoraContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.expressão_decisora`.
	 * @param ctx the parse tree
	 */
	exitExpressão_decisora?: (ctx: Expressão_decisoraContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.incondicional`.
	 * @param ctx the parse tree
	 */
	enterIncondicional?: (ctx: IncondicionalContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.incondicional`.
	 * @param ctx the parse tree
	 */
	exitIncondicional?: (ctx: IncondicionalContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.interrupção`.
	 * @param ctx the parse tree
	 */
	enterInterrupção?: (ctx: InterrupçãoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.interrupção`.
	 * @param ctx the parse tree
	 */
	exitInterrupção?: (ctx: InterrupçãoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.invocação`.
	 * @param ctx the parse tree
	 */
	enterInvocação?: (ctx: InvocaçãoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.invocação`.
	 * @param ctx the parse tree
	 */
	exitInvocação?: (ctx: InvocaçãoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.invocação_interna`.
	 * @param ctx the parse tree
	 */
	enterInvocação_interna?: (ctx: Invocação_internaContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.invocação_interna`.
	 * @param ctx the parse tree
	 */
	exitInvocação_interna?: (ctx: Invocação_internaContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.invocação_externa`.
	 * @param ctx the parse tree
	 */
	enterInvocação_externa?: (ctx: Invocação_externaContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.invocação_externa`.
	 * @param ctx the parse tree
	 */
	exitInvocação_externa?: (ctx: Invocação_externaContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.aspas_duplas`.
	 * @param ctx the parse tree
	 */
	enterAspas_duplas?: (ctx: Aspas_duplasContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.aspas_duplas`.
	 * @param ctx the parse tree
	 */
	exitAspas_duplas?: (ctx: Aspas_duplasContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.nome_da_DLL`.
	 * @param ctx the parse tree
	 */
	enterNome_da_DLL?: (ctx: Nome_da_DLLContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.nome_da_DLL`.
	 * @param ctx the parse tree
	 */
	exitNome_da_DLL?: (ctx: Nome_da_DLLContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.nome_da_função`.
	 * @param ctx the parse tree
	 */
	enterNome_da_função?: (ctx: Nome_da_funçãoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.nome_da_função`.
	 * @param ctx the parse tree
	 */
	exitNome_da_função?: (ctx: Nome_da_funçãoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.processe`.
	 * @param ctx the parse tree
	 */
	enterProcesse?: (ctx: ProcesseContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.processe`.
	 * @param ctx the parse tree
	 */
	exitProcesse?: (ctx: ProcesseContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.com`.
	 * @param ctx the parse tree
	 */
	enterCom?: (ctx: ComContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.com`.
	 * @param ctx the parse tree
	 */
	exitCom?: (ctx: ComContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.e`.
	 * @param ctx the parse tree
	 */
	enterE?: (ctx: EContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.e`.
	 * @param ctx the parse tree
	 */
	exitE?: (ctx: EContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.retornando`.
	 * @param ctx the parse tree
	 */
	enterRetornando?: (ctx: RetornandoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.retornando`.
	 * @param ctx the parse tree
	 */
	exitRetornando?: (ctx: RetornandoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.invocação_indireta`.
	 * @param ctx the parse tree
	 */
	enterInvocação_indireta?: (ctx: Invocação_indiretaContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.invocação_indireta`.
	 * @param ctx the parse tree
	 */
	exitInvocação_indireta?: (ctx: Invocação_indiretaContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.retorno`.
	 * @param ctx the parse tree
	 */
	enterRetorno?: (ctx: RetornoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.retorno`.
	 * @param ctx the parse tree
	 */
	exitRetorno?: (ctx: RetornoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.decodifique`.
	 * @param ctx the parse tree
	 */
	enterDecodifique?: (ctx: DecodifiqueContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.decodifique`.
	 * @param ctx the parse tree
	 */
	exitDecodifique?: (ctx: DecodifiqueContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.decodificação`.
	 * @param ctx the parse tree
	 */
	enterDecodificação?: (ctx: DecodificaçãoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.decodificação`.
	 * @param ctx the parse tree
	 */
	exitDecodificação?: (ctx: DecodificaçãoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.aponte`.
	 * @param ctx the parse tree
	 */
	enterAponte?: (ctx: AponteContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.aponte`.
	 * @param ctx the parse tree
	 */
	exitAponte?: (ctx: AponteContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.para_rotina`.
	 * @param ctx the parse tree
	 */
	enterPara_rotina?: (ctx: Para_rotinaContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.para_rotina`.
	 * @param ctx the parse tree
	 */
	exitPara_rotina?: (ctx: Para_rotinaContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.indireção`.
	 * @param ctx the parse tree
	 */
	enterIndireção?: (ctx: IndireçãoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.indireção`.
	 * @param ctx the parse tree
	 */
	exitIndireção?: (ctx: IndireçãoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.push`.
	 * @param ctx the parse tree
	 */
	enterPush?: (ctx: PushContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.push`.
	 * @param ctx the parse tree
	 */
	exitPush?: (ctx: PushContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.empilhamento`.
	 * @param ctx the parse tree
	 */
	enterEmpilhamento?: (ctx: EmpilhamentoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.empilhamento`.
	 * @param ctx the parse tree
	 */
	exitEmpilhamento?: (ctx: EmpilhamentoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.reiteração`.
	 * @param ctx the parse tree
	 */
	enterReiteração?: (ctx: ReiteraçãoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.reiteração`.
	 * @param ctx the parse tree
	 */
	exitReiteração?: (ctx: ReiteraçãoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.diga`.
	 * @param ctx the parse tree
	 */
	enterDiga?: (ctx: DigaContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.diga`.
	 * @param ctx the parse tree
	 */
	exitDiga?: (ctx: DigaContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.retorno_booleano`.
	 * @param ctx the parse tree
	 */
	enterRetorno_booleano?: (ctx: Retorno_booleanoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.retorno_booleano`.
	 * @param ctx the parse tree
	 */
	exitRetorno_booleano?: (ctx: Retorno_booleanoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.expressão`.
	 * @param ctx the parse tree
	 */
	enterExpressão?: (ctx: ExpressãoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.expressão`.
	 * @param ctx the parse tree
	 */
	exitExpressão?: (ctx: ExpressãoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.operadores_comuns`.
	 * @param ctx the parse tree
	 */
	enterOperadores_comuns?: (ctx: Operadores_comunsContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.operadores_comuns`.
	 * @param ctx the parse tree
	 */
	exitOperadores_comuns?: (ctx: Operadores_comunsContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.booleano`.
	 * @param ctx the parse tree
	 */
	enterBooleano?: (ctx: BooleanoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.booleano`.
	 * @param ctx the parse tree
	 */
	exitBooleano?: (ctx: BooleanoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.nulo`.
	 * @param ctx the parse tree
	 */
	enterNulo?: (ctx: NuloContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.nulo`.
	 * @param ctx the parse tree
	 */
	exitNulo?: (ctx: NuloContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.termo_constante`.
	 * @param ctx the parse tree
	 */
	enterTermo_constante?: (ctx: Termo_constanteContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.termo_constante`.
	 * @param ctx the parse tree
	 */
	exitTermo_constante?: (ctx: Termo_constanteContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.termo_constante_negativo`.
	 * @param ctx the parse tree
	 */
	enterTermo_constante_negativo?: (ctx: Termo_constante_negativoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.termo_constante_negativo`.
	 * @param ctx the parse tree
	 */
	exitTermo_constante_negativo?: (ctx: Termo_constante_negativoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.termo_constante_positivo`.
	 * @param ctx the parse tree
	 */
	enterTermo_constante_positivo?: (ctx: Termo_constante_positivoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.termo_constante_positivo`.
	 * @param ctx the parse tree
	 */
	exitTermo_constante_positivo?: (ctx: Termo_constante_positivoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.número`.
	 * @param ctx the parse tree
	 */
	enterNúmero?: (ctx: NúmeroContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.número`.
	 * @param ctx the parse tree
	 */
	exitNúmero?: (ctx: NúmeroContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.literal`.
	 * @param ctx the parse tree
	 */
	enterLiteral?: (ctx: LiteralContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.literal`.
	 * @param ctx the parse tree
	 */
	exitLiteral?: (ctx: LiteralContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.termo`.
	 * @param ctx the parse tree
	 */
	enterTermo?: (ctx: TermoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.termo`.
	 * @param ctx the parse tree
	 */
	exitTermo?: (ctx: TermoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.sinal_de_divisão`.
	 * @param ctx the parse tree
	 */
	enterSinal_de_divisão?: (ctx: Sinal_de_divisãoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.sinal_de_divisão`.
	 * @param ctx the parse tree
	 */
	exitSinal_de_divisão?: (ctx: Sinal_de_divisãoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.como`.
	 * @param ctx the parse tree
	 */
	enterComo?: (ctx: ComoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.como`.
	 * @param ctx the parse tree
	 */
	exitComo?: (ctx: ComoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.termo_negativo`.
	 * @param ctx the parse tree
	 */
	enterTermo_negativo?: (ctx: Termo_negativoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.termo_negativo`.
	 * @param ctx the parse tree
	 */
	exitTermo_negativo?: (ctx: Termo_negativoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.termo_positivo`.
	 * @param ctx the parse tree
	 */
	enterTermo_positivo?: (ctx: Termo_positivoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.termo_positivo`.
	 * @param ctx the parse tree
	 */
	exitTermo_positivo?: (ctx: Termo_positivoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.variável_local`.
	 * @param ctx the parse tree
	 */
	enterVariável_local?: (ctx: Variável_localContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.variável_local`.
	 * @param ctx the parse tree
	 */
	exitVariável_local?: (ctx: Variável_localContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.variável`.
	 * @param ctx the parse tree
	 */
	enterVariável?: (ctx: VariávelContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.variável`.
	 * @param ctx the parse tree
	 */
	exitVariável?: (ctx: VariávelContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.termo_literal`.
	 * @param ctx the parse tree
	 */
	enterTermo_literal?: (ctx: Termo_literalContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.termo_literal`.
	 * @param ctx the parse tree
	 */
	exitTermo_literal?: (ctx: Termo_literalContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.conteúdo`.
	 * @param ctx the parse tree
	 */
	enterConteúdo?: (ctx: ConteúdoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.conteúdo`.
	 * @param ctx the parse tree
	 */
	exitConteúdo?: (ctx: ConteúdoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.magnitude`.
	 * @param ctx the parse tree
	 */
	enterMagnitude?: (ctx: MagnitudeContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.magnitude`.
	 * @param ctx the parse tree
	 */
	exitMagnitude?: (ctx: MagnitudeContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.endereçamento`.
	 * @param ctx the parse tree
	 */
	enterEndereçamento?: (ctx: EndereçamentoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.endereçamento`.
	 * @param ctx the parse tree
	 */
	exitEndereçamento?: (ctx: EndereçamentoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.possessivos_inglês`.
	 * @param ctx the parse tree
	 */
	enterPossessivos_inglês?: (ctx: Possessivos_inglêsContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.possessivos_inglês`.
	 * @param ctx the parse tree
	 */
	exitPossessivos_inglês?: (ctx: Possessivos_inglêsContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.possessivo_inglês_antigo`.
	 * @param ctx the parse tree
	 */
	enterPossessivo_inglês_antigo?: (ctx: Possessivo_inglês_antigoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.possessivo_inglês_antigo`.
	 * @param ctx the parse tree
	 */
	exitPossessivo_inglês_antigo?: (ctx: Possessivo_inglês_antigoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.possessivo_português`.
	 * @param ctx the parse tree
	 */
	enterPossessivo_português?: (ctx: Possessivo_portuguêsContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.possessivo_português`.
	 * @param ctx the parse tree
	 */
	exitPossessivo_português?: (ctx: Possessivo_portuguêsContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.apóstrofo`.
	 * @param ctx the parse tree
	 */
	enterApóstrofo?: (ctx: ApóstrofoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.apóstrofo`.
	 * @param ctx the parse tree
	 */
	exitApóstrofo?: (ctx: ApóstrofoContext) => void;
}

