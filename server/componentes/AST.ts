// Este módulo define a estrutura de um AST (Árvore de Sintaxe Abstrata) que é usada para representar a estrutura de um programa.
// O AST é composto por diferentes tipos de nós, cada um representando uma construção sintática específica.


// Obtém a lista de todos os documentos com a extensão .pop no diretório do arquivo atualmente aberto no editor

import {
  createConnection as CriarConexão,
  TextDocuments as DocumentosDeTexto,
  Diagnostic as Diagnóstico,
  DiagnosticSeverity as SeveridadeDoDiagnóstico,
  ProposedFeatures as RecursosPropostos,
  InitializeParams as InicializarParâmetros,
  DidChangeConfigurationNotification as NotificaçãoDeMudançaDeConfiguração,
  CompletionItem as ItemDeConclusão,
  CompletionItemKind as TipoDeItemDeConclusão,
  TextDocumentPositionParams as ParâmetrosDePosiçãoDoDocumento,
  TextDocumentSyncKind as TipoDeSincronizaçãoDoDocumento,
  InitializeResult as ResultadoDeInicialização,
  DocumentDiagnosticReportKind as TipoDeRelatórioDeDiagnósticoDoDocumento,
  Hover as InformacaoDeHover,
  Location as Localização,
  LocationLink as LinkDeLocalização,
  ReferenceParams as ParametrosDeReferência,
  DefinitionParams as ParametrosDeDefinição,
  TypeDefinitionParams as ParametrosDeDefiniçãoDeTipo,
  ImplementationParams as ParametrosDeImplementação,
  HoverParams as ParâmetrosDeHover,
  Position as Posição,
  Range as Intervalo,
  type DocumentDiagnosticReport as RelatórioDeDiagnósticoDoDocumento
} from 'vscode-languageserver/node';

import {TextDocument as DocumentoDeTexto,} from 'vscode-languageserver-textdocument';


const path = require('path');

function obtémListaDeDocumentosComExtensão(diretorio: string, extensão: string): string[] {
	const fs = require('fs');
	const arquivos = fs.readdirSync(diretorio);
	return arquivos.filter((arquivo: string) => arquivo.endsWith(extensão));
}

let listaDeDocumentosComExtensão = obtémListaDeDocumentosComExtensão(path.dirname(__filename), '.pop');

// armazena o conteúdo dos documentos da lista em uma string
let conteúdoDosDocumentos = listaDeDocumentosComExtensão.map((documento: string) => {
	const fs = require('fs');
	return fs.readFileSync(path.join(path.dirname(__filename), documento), 'utf8');
});

// itera sobre cada linha do conteúdo dos documentos e imprime o número da linha e o conteúdo
conteúdoDosDocumentos.forEach((conteúdo: string, índice: number) => {
	const linhas = conteúdo.split('\n');
	linhas.forEach((linha: string, linhaÍndice: number) => {
		//console.log(`Documento ${índice + 1}, Linha ${linhaÍndice + 1}: ${linha}`);
		adicionaSimboloParaAST(linha, linhaÍndice + 1, índice + 1);
	});
});

function adicionaSimboloParaAST(linha: string, linhaÍndice: number, documentoÍndice: number) {
	// Aqui você pode implementar a lógica para adicionar o símbolo à sua AST
	// Por exemplo, você pode criar um nó de declaração de variável ou função com base no conteúdo da linha
	console.log(`Adicionando símbolo: "${linha}" na linha ${linhaÍndice} do documento ${documentoÍndice}`);
}









/*
export type NóDaÁrvoreSintaxeAbstrata =
	| NóDeDeclaraçãoDeVariável
	| NóDeDeclaraçãoDeFunção
	| NóDeChamadaDeFunção
	| NóDeExpressão
	| NóDeAtribuição
	| NóDeCondição
	| NóDeLoop
	| NóDeRetorno
	| NóDeImportação
	| NóDeExportação;
*/

export interface NóDaÁrvoreSintaxeAbstrata {
		tipo: string;
		nome?: string;
		valor?: any;
		filhos?: NóDaÁrvoreSintaxeAbstrata[];
		linha?: number;
		coluna?: number;
}

export interface NóDeDeclaraçãoDeVariável extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'declaração_variável';
	nome: string;
	valor?: any; // Pode ser uma expressão ou um valor literal
}

export interface NóDeDeclaraçãoDeFunção extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'declaração_função';
	nome: string;
	parametros: string[];
	corpo: NóDaÁrvoreSintaxeAbstrata[];
}

export interface NóDeChamadaDeFunção extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'chamada_função';
	nome: string;
	argumentos: any[]; // Pode ser uma lista de expressões ou valores
}

export interface NóDeExpressão extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'expressão';
	operador: string; // Ex: '+', '-', '*', '/', etc.
	esquerda: any; // Pode ser uma variável, valor literal ou outra expressão
	direita: any; // Pode ser uma variável, valor literal ou outra expressão
}

export interface NóDeAtribuição extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'atribuição';
	nome: string; // Nome da variável a ser atribuída
	valor: any; // Pode ser uma expressão ou um valor literal
}

export interface NóDeCondição extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'condição';
	expressão: any; // Pode ser uma expressão booleana
	corpo: NóDaÁrvoreSintaxeAbstrata[]; // Bloco de código a ser executado se a condição for verdadeira
	senão?: NóDaÁrvoreSintaxeAbstrata[]; // Bloco de código a ser executado se a condição for falsa
}

export interface NóDeLoop extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'loop';
	expressão: any; // Pode ser uma expressão booleana ou um contador
	corpo: NóDaÁrvoreSintaxeAbstrata[]; // Bloco de código a ser executado em cada iteração
}

export interface NóDeRetorno extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'retorno';
	valor?: any; // Valor a ser retornado pela função
}

export interface NóDeImportação extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'importação';
	modulo: string; // Nome do módulo a ser importado
}

export interface NóDeExportação extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'exportação';
	nome: string; // Nome da variável ou função a ser exportada
	valor?: any; // Valor ou função a ser exportada
}

export interface NóDeBloco extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'bloco';
	corpo: NóDaÁrvoreSintaxeAbstrata[]; // Lista de nós dentro do bloco
}

export interface NóDePrograma extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'programa';
	corpo: NóDaÁrvoreSintaxeAbstrata[]; // Lista de nós que compõem o programa
}

export interface NóDeErro extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'erro';
	mensagem: string; // Mensagem de erro
	linha: number; // Linha onde o erro ocorreu
	coluna: number; // Coluna onde o erro ocorreu
}

export interface NóDeComentário extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'comentário';
	conteúdo: string; // Conteúdo do comentário
	linha: number; // Linha onde o comentário está localizado
	coluna: number; // Coluna onde o comentário está localizado
}

export interface NóDeValorLiteral extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'literal';
	valor: any; // Valor literal (número, string, booleano, etc.)
}

export interface NóDeOperadorUnário extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'operador_unário';
	operador: string; // Ex: '!', '-', etc.
	expressão: any; // A expressão sobre a qual o operador é aplicado
}

export interface NóDeOperadorBinário extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'operador_binário';
	operador: string; // Ex: '+', '-', '*', '/', etc.
	esquerda: any; // A expressão à esquerda do operador
	direita: any; // A expressão à direita do operador
}

export interface NóDeAcessoPropriedade extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'acesso_propriedade';
	objeto: any; // O objeto ao qual a propriedade pertence
	propriedade: string; // Nome da propriedade a ser acessada
}

export interface NóDeAcessoArray extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'acesso_array';
	array: any; // O array ao qual o índice pertence
	índice: any; // O índice do array a ser acessado
}

export interface NóDeDeclaraçãoDeVariávelGlobal extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'declaração_global';
	nome: string; // Nome da variável global
	valor: any; // Valor da variável global
}

export interface NóDeDeclaraçãoDeVariávelLocal extends NóDaÁrvoreSintaxeAbstrata {
	tipo: 'declaração_local';
	nome: string; // Nome da variável local
	valor?: any; // Valor da variável local, se houver
	escopo: string; // Escopo onde a variável local é declarada
}



