// Generated from PortuguesPuro.g4 by ANTLR 4.13.1

import {ParseTreeListener} from "antlr4";


import { Regra_espacoContext } from "./PortuguesPuroParser";
import { PalavraContext } from "./PortuguesPuroParser";
import { PossessivoContext } from "./PortuguesPuroParser";
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
import { CampoContext } from "./PortuguesPuroParser";
import { PausaContext } from "./PortuguesPuroParser";
import { PausasContext } from "./PortuguesPuroParser";
import { ConjuncoesContext } from "./PortuguesPuroParser";
import { PreposicoesContext } from "./PortuguesPuroParser";
import { Variavel_globalContext } from "./PortuguesPuroParser";
import { RotinaContext } from "./PortuguesPuroParser";
import { ProcedimentoContext } from "./PortuguesPuroParser";
import { DecisorContext } from "./PortuguesPuroParser";
import { FuncaoContext } from "./PortuguesPuroParser";
import { RetroinvocacaoContext } from "./PortuguesPuroParser";
import { Nome_da_rotinaContext } from "./PortuguesPuroParser";
import { Unidade_semanticaContext } from "./PortuguesPuroParser";
import { ParametroContext } from "./PortuguesPuroParser";
import { FraseContext } from "./PortuguesPuroParser";
import { InstrucoesContext } from "./PortuguesPuroParser";
import { InstrucaoContext } from "./PortuguesPuroParser";
import { PreservacaoContext } from "./PortuguesPuroParser";
import { IteracaoContext } from "./PortuguesPuroParser";
import { CondicionalContext } from "./PortuguesPuroParser";
import { Expressao_decisoraContext } from "./PortuguesPuroParser";
import { IncondicionalContext } from "./PortuguesPuroParser";
import { InterrupcaoContext } from "./PortuguesPuroParser";
import { InvocacaoContext } from "./PortuguesPuroParser";
import { Invocacao_internaContext } from "./PortuguesPuroParser";
import { Invocacao_externaContext } from "./PortuguesPuroParser";
import { Nome_da_DLLContext } from "./PortuguesPuroParser";
import { Nome_da_funcaoContext } from "./PortuguesPuroParser";
import { Invocacao_indiretaContext } from "./PortuguesPuroParser";
import { RetornoContext } from "./PortuguesPuroParser";
import { DecodificacaoContext } from "./PortuguesPuroParser";
import { IndirecaoContext } from "./PortuguesPuroParser";
import { EmpilhamentoContext } from "./PortuguesPuroParser";
import { ReiteracaoContext } from "./PortuguesPuroParser";
import { Retorno_booleanoContext } from "./PortuguesPuroParser";
import { ExpressaoContext } from "./PortuguesPuroParser";
import { Operadores_comunsContext } from "./PortuguesPuroParser";
import { Termo_constanteContext } from "./PortuguesPuroParser";
import { Termo_constante_negativoContext } from "./PortuguesPuroParser";
import { Termo_constante_positivoContext } from "./PortuguesPuroParser";
import { NumeroContext } from "./PortuguesPuroParser";
import { LiteralContext } from "./PortuguesPuroParser";
import { TermoContext } from "./PortuguesPuroParser";
import { Termo_negativoContext } from "./PortuguesPuroParser";
import { Termo_positivoContext } from "./PortuguesPuroParser";
import { Variavel_localContext } from "./PortuguesPuroParser";
import { VariavelContext } from "./PortuguesPuroParser";
import { Termo_literalContext } from "./PortuguesPuroParser";
import { PossessivosContext } from "./PortuguesPuroParser";
import { Possessivo_antigoContext } from "./PortuguesPuroParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `PortuguesPuroParser`.
 */
export default class PortuguesPuroListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.regra_espaco`.
	 * @param ctx the parse tree
	 */
	enterRegra_espaco?: (ctx: Regra_espacoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.regra_espaco`.
	 * @param ctx the parse tree
	 */
	exitRegra_espaco?: (ctx: Regra_espacoContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.possessivo`.
	 * @param ctx the parse tree
	 */
	enterPossessivo?: (ctx: PossessivoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.possessivo`.
	 * @param ctx the parse tree
	 */
	exitPossessivo?: (ctx: PossessivoContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.contracoes`.
	 * @param ctx the parse tree
	 */
	enterContracoes?: (ctx: ContracoesContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.contracoes`.
	 * @param ctx the parse tree
	 */
	exitContracoes?: (ctx: ContracoesContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.operadores_de_comparacao`.
	 * @param ctx the parse tree
	 */
	enterOperadores_de_comparacao?: (ctx: Operadores_de_comparacaoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.operadores_de_comparacao`.
	 * @param ctx the parse tree
	 */
	exitOperadores_de_comparacao?: (ctx: Operadores_de_comparacaoContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.denominacoes`.
	 * @param ctx the parse tree
	 */
	enterDenominacoes?: (ctx: DenominacoesContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.denominacoes`.
	 * @param ctx the parse tree
	 */
	exitDenominacoes?: (ctx: DenominacoesContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.caracteres_ignoraveis`.
	 * @param ctx the parse tree
	 */
	enterCaracteres_ignoraveis?: (ctx: Caracteres_ignoraveisContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.caracteres_ignoraveis`.
	 * @param ctx the parse tree
	 */
	exitCaracteres_ignoraveis?: (ctx: Caracteres_ignoraveisContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.comentario`.
	 * @param ctx the parse tree
	 */
	enterComentario?: (ctx: ComentarioContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.comentario`.
	 * @param ctx the parse tree
	 */
	exitComentario?: (ctx: ComentarioContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.comentario_de_linha`.
	 * @param ctx the parse tree
	 */
	enterComentario_de_linha?: (ctx: Comentario_de_linhaContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.comentario_de_linha`.
	 * @param ctx the parse tree
	 */
	exitComentario_de_linha?: (ctx: Comentario_de_linhaContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.comentario_de_bloco`.
	 * @param ctx the parse tree
	 */
	enterComentario_de_bloco?: (ctx: Comentario_de_blocoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.comentario_de_bloco`.
	 * @param ctx the parse tree
	 */
	exitComentario_de_bloco?: (ctx: Comentario_de_blocoContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.caractere_aglomeravel`.
	 * @param ctx the parse tree
	 */
	enterCaractere_aglomeravel?: (ctx: Caractere_aglomeravelContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.caractere_aglomeravel`.
	 * @param ctx the parse tree
	 */
	exitCaractere_aglomeravel?: (ctx: Caractere_aglomeravelContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.caractere_nao_aglomeravel`.
	 * @param ctx the parse tree
	 */
	enterCaractere_nao_aglomeravel?: (ctx: Caractere_nao_aglomeravelContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.caractere_nao_aglomeravel`.
	 * @param ctx the parse tree
	 */
	exitCaractere_nao_aglomeravel?: (ctx: Caractere_nao_aglomeravelContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.sinal_de_pontuacao`.
	 * @param ctx the parse tree
	 */
	enterSinal_de_pontuacao?: (ctx: Sinal_de_pontuacaoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.sinal_de_pontuacao`.
	 * @param ctx the parse tree
	 */
	exitSinal_de_pontuacao?: (ctx: Sinal_de_pontuacaoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.simbolos_especiais`.
	 * @param ctx the parse tree
	 */
	enterSimbolos_especiais?: (ctx: Simbolos_especiaisContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.simbolos_especiais`.
	 * @param ctx the parse tree
	 */
	exitSimbolos_especiais?: (ctx: Simbolos_especiaisContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.noise`.
	 * @param ctx the parse tree
	 */
	enterNoise?: (ctx: NoiseContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.noise`.
	 * @param ctx the parse tree
	 */
	exitNoise?: (ctx: NoiseContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.numero_inteiro`.
	 * @param ctx the parse tree
	 */
	enterNumero_inteiro?: (ctx: Numero_inteiroContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.numero_inteiro`.
	 * @param ctx the parse tree
	 */
	exitNumero_inteiro?: (ctx: Numero_inteiroContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.numero_decimal`.
	 * @param ctx the parse tree
	 */
	enterNumero_decimal?: (ctx: Numero_decimalContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.numero_decimal`.
	 * @param ctx the parse tree
	 */
	exitNumero_decimal?: (ctx: Numero_decimalContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.numero_fracionario`.
	 * @param ctx the parse tree
	 */
	enterNumero_fracionario?: (ctx: Numero_fracionarioContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.numero_fracionario`.
	 * @param ctx the parse tree
	 */
	exitNumero_fracionario?: (ctx: Numero_fracionarioContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.numero_misto`.
	 * @param ctx the parse tree
	 */
	enterNumero_misto?: (ctx: Numero_mistoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.numero_misto`.
	 * @param ctx the parse tree
	 */
	exitNumero_misto?: (ctx: Numero_mistoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.numero_hexadecimal`.
	 * @param ctx the parse tree
	 */
	enterNumero_hexadecimal?: (ctx: Numero_hexadecimalContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.numero_hexadecimal`.
	 * @param ctx the parse tree
	 */
	exitNumero_hexadecimal?: (ctx: Numero_hexadecimalContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.informacao_opcional`.
	 * @param ctx the parse tree
	 */
	enterInformacao_opcional?: (ctx: Informacao_opcionalContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.informacao_opcional`.
	 * @param ctx the parse tree
	 */
	exitInformacao_opcional?: (ctx: Informacao_opcionalContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.conjuncoes`.
	 * @param ctx the parse tree
	 */
	enterConjuncoes?: (ctx: ConjuncoesContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.conjuncoes`.
	 * @param ctx the parse tree
	 */
	exitConjuncoes?: (ctx: ConjuncoesContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.preposicoes`.
	 * @param ctx the parse tree
	 */
	enterPreposicoes?: (ctx: PreposicoesContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.preposicoes`.
	 * @param ctx the parse tree
	 */
	exitPreposicoes?: (ctx: PreposicoesContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.variavel_global`.
	 * @param ctx the parse tree
	 */
	enterVariavel_global?: (ctx: Variavel_globalContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.variavel_global`.
	 * @param ctx the parse tree
	 */
	exitVariavel_global?: (ctx: Variavel_globalContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.funcao`.
	 * @param ctx the parse tree
	 */
	enterFuncao?: (ctx: FuncaoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.funcao`.
	 * @param ctx the parse tree
	 */
	exitFuncao?: (ctx: FuncaoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.retroinvocacao`.
	 * @param ctx the parse tree
	 */
	enterRetroinvocacao?: (ctx: RetroinvocacaoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.retroinvocacao`.
	 * @param ctx the parse tree
	 */
	exitRetroinvocacao?: (ctx: RetroinvocacaoContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.unidade_semantica`.
	 * @param ctx the parse tree
	 */
	enterUnidade_semantica?: (ctx: Unidade_semanticaContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.unidade_semantica`.
	 * @param ctx the parse tree
	 */
	exitUnidade_semantica?: (ctx: Unidade_semanticaContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.parametro`.
	 * @param ctx the parse tree
	 */
	enterParametro?: (ctx: ParametroContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.parametro`.
	 * @param ctx the parse tree
	 */
	exitParametro?: (ctx: ParametroContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.instrucoes`.
	 * @param ctx the parse tree
	 */
	enterInstrucoes?: (ctx: InstrucoesContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.instrucoes`.
	 * @param ctx the parse tree
	 */
	exitInstrucoes?: (ctx: InstrucoesContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.instrucao`.
	 * @param ctx the parse tree
	 */
	enterInstrucao?: (ctx: InstrucaoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.instrucao`.
	 * @param ctx the parse tree
	 */
	exitInstrucao?: (ctx: InstrucaoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.preservacao`.
	 * @param ctx the parse tree
	 */
	enterPreservacao?: (ctx: PreservacaoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.preservacao`.
	 * @param ctx the parse tree
	 */
	exitPreservacao?: (ctx: PreservacaoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.iteracao`.
	 * @param ctx the parse tree
	 */
	enterIteracao?: (ctx: IteracaoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.iteracao`.
	 * @param ctx the parse tree
	 */
	exitIteracao?: (ctx: IteracaoContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.expressao_decisora`.
	 * @param ctx the parse tree
	 */
	enterExpressao_decisora?: (ctx: Expressao_decisoraContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.expressao_decisora`.
	 * @param ctx the parse tree
	 */
	exitExpressao_decisora?: (ctx: Expressao_decisoraContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.interrupcao`.
	 * @param ctx the parse tree
	 */
	enterInterrupcao?: (ctx: InterrupcaoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.interrupcao`.
	 * @param ctx the parse tree
	 */
	exitInterrupcao?: (ctx: InterrupcaoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.invocacao`.
	 * @param ctx the parse tree
	 */
	enterInvocacao?: (ctx: InvocacaoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.invocacao`.
	 * @param ctx the parse tree
	 */
	exitInvocacao?: (ctx: InvocacaoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.invocacao_interna`.
	 * @param ctx the parse tree
	 */
	enterInvocacao_interna?: (ctx: Invocacao_internaContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.invocacao_interna`.
	 * @param ctx the parse tree
	 */
	exitInvocacao_interna?: (ctx: Invocacao_internaContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.invocacao_externa`.
	 * @param ctx the parse tree
	 */
	enterInvocacao_externa?: (ctx: Invocacao_externaContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.invocacao_externa`.
	 * @param ctx the parse tree
	 */
	exitInvocacao_externa?: (ctx: Invocacao_externaContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.nome_da_funcao`.
	 * @param ctx the parse tree
	 */
	enterNome_da_funcao?: (ctx: Nome_da_funcaoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.nome_da_funcao`.
	 * @param ctx the parse tree
	 */
	exitNome_da_funcao?: (ctx: Nome_da_funcaoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.invocacao_indireta`.
	 * @param ctx the parse tree
	 */
	enterInvocacao_indireta?: (ctx: Invocacao_indiretaContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.invocacao_indireta`.
	 * @param ctx the parse tree
	 */
	exitInvocacao_indireta?: (ctx: Invocacao_indiretaContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.decodificacao`.
	 * @param ctx the parse tree
	 */
	enterDecodificacao?: (ctx: DecodificacaoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.decodificacao`.
	 * @param ctx the parse tree
	 */
	exitDecodificacao?: (ctx: DecodificacaoContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.indirecao`.
	 * @param ctx the parse tree
	 */
	enterIndirecao?: (ctx: IndirecaoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.indirecao`.
	 * @param ctx the parse tree
	 */
	exitIndirecao?: (ctx: IndirecaoContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.reiteracao`.
	 * @param ctx the parse tree
	 */
	enterReiteracao?: (ctx: ReiteracaoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.reiteracao`.
	 * @param ctx the parse tree
	 */
	exitReiteracao?: (ctx: ReiteracaoContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.expressao`.
	 * @param ctx the parse tree
	 */
	enterExpressao?: (ctx: ExpressaoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.expressao`.
	 * @param ctx the parse tree
	 */
	exitExpressao?: (ctx: ExpressaoContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.numero`.
	 * @param ctx the parse tree
	 */
	enterNumero?: (ctx: NumeroContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.numero`.
	 * @param ctx the parse tree
	 */
	exitNumero?: (ctx: NumeroContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.variavel_local`.
	 * @param ctx the parse tree
	 */
	enterVariavel_local?: (ctx: Variavel_localContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.variavel_local`.
	 * @param ctx the parse tree
	 */
	exitVariavel_local?: (ctx: Variavel_localContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.variavel`.
	 * @param ctx the parse tree
	 */
	enterVariavel?: (ctx: VariavelContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.variavel`.
	 * @param ctx the parse tree
	 */
	exitVariavel?: (ctx: VariavelContext) => void;
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
	 * Enter a parse tree produced by `PortuguesPuroParser.possessivos`.
	 * @param ctx the parse tree
	 */
	enterPossessivos?: (ctx: PossessivosContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.possessivos`.
	 * @param ctx the parse tree
	 */
	exitPossessivos?: (ctx: PossessivosContext) => void;
	/**
	 * Enter a parse tree produced by `PortuguesPuroParser.possessivo_antigo`.
	 * @param ctx the parse tree
	 */
	enterPossessivo_antigo?: (ctx: Possessivo_antigoContext) => void;
	/**
	 * Exit a parse tree produced by `PortuguesPuroParser.possessivo_antigo`.
	 * @param ctx the parse tree
	 */
	exitPossessivo_antigo?: (ctx: Possessivo_antigoContext) => void;
}

