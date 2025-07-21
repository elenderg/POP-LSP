/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
	createConnection as CriarConexao,
	TextDocuments as DocumentosDeTexto,
	Diagnostic as Diagnóstico,
	DiagnosticSeverity as SeveridadeDoDiagnóstico,
	ProposedFeatures as RecursosPropostos,
	InitializeParams as InicializarParametros,
	DidChangeConfigurationNotification as NotificacaoDeMudancaDeConfiguracao,
	CompletionItem as ItemDeConclusao,
	CompletionItemKind as TipoDeItemDeConclusao,
	TextDocumentPositionParams as ParametrosDePosicaoDoDocumento,
	TextDocumentSyncKind as TipoDeSincronizacaoDoDocumento,
	InitializeResult as ResultadoDeInicializacao,
	DocumentDiagnosticReportKind as TipoDeRelatórioDeDiagnósticoDoDocumento,
	Hover as InformacaoDeHover,
    Location as Localizacao,
    LocationLink as LinkDeLocalizacao,
    ReferenceParams as ParametrosDeReferencia,
    DefinitionParams as ParametrosDeDefinicao,
    TypeDefinitionParams as ParametrosDeDefinicaoDeTipo,
    ImplementationParams as ParametrosDeImplementacao,
    HoverParams as ParametrosDeHover,
    Position as Posicao,
	type DocumentDiagnosticReport as RelatórioDeDiagnósticoDoDocumento

} from 'vscode-languageserver/node';

import {
	TextDocument as DocumentoDeTexto,
} from 'vscode-languageserver-textdocument';




// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const conexão = CriarConexao(RecursosPropostos.all);

// Create a simple text document manager.
const documentos = new DocumentosDeTexto(DocumentoDeTexto);

let possuiCapacidadeDeConfiguração = false;
let possuiCapacidadeDeEspaçoDeTrabalho = false;
let possuiCapacidadedeInformaçõesDeDiagnósticoRelacionadas = false;

conexão.onInitialize((parâmetros: InicializarParametros) => {
	const capacidades = parâmetros.capabilities;

	// Does the client support the `workspace/configuration` request?
	// If not, we fall back using global settings.
	possuiCapacidadeDeConfiguração = !!(
		capacidades.workspace && !!capacidades.workspace.configuration
	);
	possuiCapacidadeDeEspaçoDeTrabalho = !!(
		capacidades.workspace && !!capacidades.workspace.workspaceFolders
	);
	possuiCapacidadedeInformaçõesDeDiagnósticoRelacionadas = !!(
		capacidades.textDocument &&
		capacidades.textDocument.publishDiagnostics &&
		capacidades.textDocument.publishDiagnostics.relatedInformation
	);

	const resultado: ResultadoDeInicializacao = {
		capabilities: {
			textDocumentSync: TipoDeSincronizacaoDoDocumento.Incremental,
			// Tell the client that this server supports code completion.
			completionProvider: {
				resolveProvider: true
			},
			diagnosticProvider: {
				interFileDependencies: false,
				workspaceDiagnostics: false
			},
        	definitionProvider: true, // <-- Adicione esta linha!
			typeDefinitionProvider: true,
			implementationProvider: true,
			referencesProvider: true,
		}
	};
	if (possuiCapacidadeDeEspaçoDeTrabalho) {
		resultado.capabilities.workspace = {
			workspaceFolders: {
				supported: true
			}
		};
	}
	return resultado;
});

conexão.onInitialized(() => {
	if (possuiCapacidadeDeConfiguração) {
		// Register for all configuration changes.
		conexão.client.register(NotificacaoDeMudancaDeConfiguracao.type, undefined);
	}
	if (possuiCapacidadeDeEspaçoDeTrabalho) {
		conexão.workspace.onDidChangeWorkspaceFolders(_event => {
			conexão.console.log('Recebido evento de alteração de Espaço de Trabalho.');
		});
	}
});

// The example settings
interface ExampleSettings {
	maxNumberOfProblems: number;
}

// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const configuraçõesPadrão: ExampleSettings = { maxNumberOfProblems: 1000 };
let configuraçõesGlobais: ExampleSettings = configuraçõesPadrão;

// Cache the settings of all open documents
const configuraçõesDoDocumento = new Map<string, Thenable<ExampleSettings>>();

conexão.onDidChangeConfiguration(alteração => {
	if (possuiCapacidadeDeConfiguração) {
		// Reset all cached document settings
		configuraçõesDoDocumento.clear();
	} else {
		configuraçõesGlobais = (
			(alteração.settings.languageServerExample || configuraçõesPadrão)
		);
	}
	// Refresh the diagnostics since the `maxNumberOfProblems` could have changed.
	// We could optimize things here and re-fetch the setting first can compare it
	// to the existing setting, but this is out of scope for this example.
	conexão.languages.diagnostics.refresh();
});

function obtémConfiguraçõesDoDocumento(recurso: string): Thenable<ExampleSettings> {
	if (!possuiCapacidadeDeConfiguração) {
		return Promise.resolve(configuraçõesGlobais);
	}
	let resultado = configuraçõesDoDocumento.get(recurso);
	if (!resultado) {
		resultado = conexão.workspace.getConfiguration({
			scopeUri: recurso,
			section: 'languageServerExample'
		});
		configuraçõesDoDocumento.set(recurso, resultado);
	}
	return resultado;
}

// Only keep settings for open documents
documentos.onDidClose(e => {
	configuraçõesDoDocumento.delete(e.document.uri);
});


conexão.languages.diagnostics.on(async (parâmetros) => {
	const documento = documentos.get(parâmetros.textDocument.uri);
	if (documento !== undefined) {
		return {
			kind: TipoDeRelatórioDeDiagnósticoDoDocumento.Full,
			items: await validateTextDocument(documento)
		} satisfies RelatórioDeDiagnósticoDoDocumento;
	} else {
		// We don't know the document. We can either try to read it from disk
		// or we don't report problems for it.
		return {
			kind: TipoDeRelatórioDeDiagnósticoDoDocumento.Full,
			items: []
		} satisfies RelatórioDeDiagnósticoDoDocumento;
	}
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documentos.onDidChangeContent(alteração => {
	validateTextDocument(alteração.document);
});

function analisarLexico(texto: string): Diagnóstico[] {

	if( !texto || texto.length === 0) {
		return []; // Retorna um array vazio se o texto estiver vazio
	};

	// Simula a análise léxica e retorna erros lexicos
	const errosLexicos: Diagnóstico[] = [];

	return errosLexicos;
	// Aqui você implementaria a lógica de análise léxica real.
	// Por exemplo, você poderia usar uma biblioteca de análise léxica
	// para identificar tokens inválidos, palavras-chave desconhecidas, etc.
	// Os erros lexicos devem ser retornados como um array de Diagnóstico.
}

function tentarParsear(texto: string): { válida: boolean; erros: Diagnóstico[] } {
	if( !texto || texto.length === 0) {
		return { válida: false, erros: [] }; // Retorna inválido se o texto estiver vazio
	};
	// Simula a análise sintática e retorna erros sintáticos
	const errosSintaticos: Diagnóstico[] = [];
	// Aqui você implementaria a lógica de análise sintática real.
	// Por exemplo, você poderia usar uma biblioteca de análise sintática
	// para construir uma árvore de sintaxe abstrata (AST) e identificar erros.
	// Os erros sintáticos devem ser retornados como um array de Diagnóstico.
	return {
		válida: errosSintaticos.length === 0,
		erros: errosSintaticos
	};
}

function analisarSemantica(arvore: { válida: boolean; erros: Diagnóstico[] }): Diagnóstico[] {
	if (!arvore) {
		return []; // Retorna um array vazio se a árvore não for válida
	};

	// Simula a análise semântica e retorna erros semânticos
	const errosSemanticos: Diagnóstico[] = [];
	// Aqui você implementaria a lógica de análise semântica real.
	// Por exemplo, você poderia verificar tipos, escopos, variáveis não declaradas
	// e outros aspectos semânticos do código.
	// Os erros semânticos devem ser retornados como um array de Diagnóstico.
	return errosSemanticos;
}

function verificarBoasPraticas(arvore: { válida: boolean; erros: Diagnóstico[] }): Diagnóstico[] {
	if (!arvore || !arvore.válida) {
		return []; // Retorna um array vazio se a árvore não for válida
	};

	// Simula a verificação de boas práticas e retorna avisos
	const avisos: Diagnóstico[] = [];
	// Aqui você implementaria a lógica de verificação de boas práticas real.
	// Por exemplo, você poderia verificar se o código segue convenções de estilo,
	// se há código morto, se as variáveis são usadas corretamente, etc.
	// Os avisos devem ser retornados como um array de Diagnóstico.
	return avisos;
}


async function validateTextDocument(documentoDeTexto: DocumentoDeTexto): Promise<Diagnóstico[]> {
   
    const diagnostics: Diagnóstico[] = [];	

	// No momento apenas um template, falta definir o que é um documento válido.
	// 1. Etapa léxica
	const texto = documentoDeTexto.getText();
	const errosLexicos = analisarLexico(texto);
	diagnostics.push(...errosLexicos);

	// 2. Etapa sintática
	const arvore = tentarParsear(texto);
	if (!arvore.válida) {
		diagnostics.push(...arvore.erros);
		return diagnostics; // não continua se a sintaxe estiver errada
	}

	// 3. Etapa semântica
	const errosSemanticos = analisarSemantica(arvore);
	diagnostics.push(...errosSemanticos);

	// 4. Avisos e boas práticas
	const avisos = verificarBoasPraticas(arvore);
	diagnostics.push(...avisos);

	return diagnostics;
}

conexão.onDidChangeWatchedFiles(_change => {
	// Monitored files have change in VSCode
	conexão.console.log('Recebido evento de alteração de arquivos.');
});

// This handler provides the initial list of the completion items.
conexão.onCompletion(
	(_textDocumentPosition: ParametrosDePosicaoDoDocumento): ItemDeConclusao[] => {
		// The pass parameter contains the position of the text document in
		// which code complete got requested. For the example we ignore this
		// info and always provide the same completion items.
		return [
			{
				label: 'TypeScript',
				kind: TipoDeItemDeConclusao.Text,
				data: 1
			},
			{
				label: 'JavaScript',
				kind: TipoDeItemDeConclusao.Text,
				data: 2
			}
		];
	}
);

// This handler resolves additional information for the item selected in
// the completion list.
conexão.onCompletionResolve(
	(item: ItemDeConclusao): ItemDeConclusao => {
		if (item.data === 1) {
			item.detail = 'Detalhes do TypeScript';
			item.documentation = 'Documentação do TypeScript';
		} else if (item.data === 2) {
			item.detail = 'Detalhes do JavaScript';
			item.documentation = 'Documentação do JavaScript';
		}
		return item;
	}
);


// Handler para Hover
conexão.onHover(
    (_params: ParametrosDeHover): InformacaoDeHover | null => {
        // Retorna uma informação de hover simulada
        return {
            contents: {
                kind: 'markdown',
                value: 'Informação de **Hover** de exemplo.'
            }
        };
    }
);

// Handler para Goto Definition
/*(_params: ParametrosDeDefinicao): Localizacao[] => {
        // Retorna uma localização simulada (sempre aponta para o início do documento)
        return [{
            uri: _params.textDocument.uri,
            range: {
                start: { line: 0, character: 0 },
                end: { line: 0, character: 10 }
            }
        }];
    }*/

conexão.onDefinition(    
   (params: ParametrosDeDefinicao): Localizacao[] => {
        const documento = documentos.get(params.textDocument.uri);
        if (!documento) return [];

        const posição = params.position;
        const texto = documento.getText();
        const linhas = texto.split(/\r?\n/g);

        // Extrai a palavra sob o cursor
        const linhaAtual = linhas[posição.line];
        if (!linhaAtual) return [];

        const regexPalavra = /\w+/g; 
		// Regex para capturar palavras. 
		// \w+ captura uma sequência de caracteres alfanuméricos (incluindo _).
		// O /g permite capturar todas as ocorrências na linha.
        let correspondência: RegExpExecArray | null; 
        let palavra = '';
        while ((correspondência = regexPalavra.exec(linhaAtual))) {
            if (correspondência.index <= posição.character && regexPalavra.lastIndex >= posição.character) {
                palavra = correspondência[0];
                break;
            }
        }
        if (!palavra) return [];

        // Regex para definição exata conforme solicitado
        // Exemplo: "A idade do usuário é um inteiro."
        //          "O nome do usuário é uma string."
        //          "As aspas duplas são um caractere."
        const regexDefinicao = /^(A|O|As|Os|Um|Uma|Uns|Umas)\s+([\w\s]+)\s+(é|são)\s+(um|uma|uns|umas)\s+([\w\s]+)\.$/;
		//const regexDefinicao = /^(A|O|As|Os|Um|Uma|Uns|Umas)[\s\S]+?(é|são)[\s\S]+?(um|uma|uns|umas)[\s\S]+?\.$/m;
		// Regex para capturar definições de variáveis
		// ^(A|O|As|Os|Um|Uma|Uns|Umas) captura o artigo inicial
		// \s+([\w\s]+) captura o nome da variável (permitindo espaços)
		// \s+(é|são) captura o verbo de ligação
		// \s+(um|uma|uns|umas) captura o artigo do tipo
		// \s+([\w\s]+) captura o tipo base (permitindo espaços)
		// \.$ captura o ponto final da frase. O cifrão $ garante que a frase termina com um ponto.

        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i];
            // Garante que não há vírgula, ponto e vírgula ou dois pontos
            if (linha.includes(',') || linha.includes(';') || linha.includes(':')) continue;

            const resultado = regexDefinicao.exec(linha);
            if (resultado) {
                // resultado[2] é o nome da variável
                // resultado[5] é o tipo base
                // Verifica se a palavra sob o cursor corresponde ao nome da variável
                // ou ao tipo base
                const nomeVariavel = resultado[2].trim();
                const tipoBase = resultado[5].trim();
                // Divide nomeVariavel em palavras para permitir match em qualquer uma delas
                const palavrasVariavel = nomeVariavel.split(/\s+/);
                if (palavrasVariavel.includes(palavra) || tipoBase === palavra) {
                    // Retorna a posição da palavra na linha
                    const idx = linha.indexOf(palavra);
                    if (idx !== -1) {
                        return [{
                            uri: params.textDocument.uri,
                            range: {
                                start: { line: i, character: idx },
                                end: { line: i, character: idx + palavra.length }
                            }
                        }];
                    }
                }
            }
        }

        return [];
    }
);

/*

conexão.onDefinition(
    (params: ParametrosDeDefinicao): Localizacao[] => {
        const documento = documentos.get(params.textDocument.uri);
        if (!documento) return [];

        const posição = params.position;
        const texto = documento.getText();
        const linhas = texto.split(/\r?\n/g);

        // Determina o intervalo de seleção
        // Se não houver seleção, início e fim são iguais à posição do cursor
        const selectionStart = (params as any).selection && (params as any).selection.start
            ? (params as any).selection.start
            : posição;
        const selectionEnd = (params as any).selection && (params as any).selection.end
            ? (params as any).selection.end
            : posição;

        const linhaAtual = linhas[selectionStart.line];
        if (!linhaAtual) return [];

        const regexPalavra = /\w+/g;
        let correspondência: RegExpExecArray | null;
        let palavrasSelecionadas: string[] = [];

        // Percorre todas as palavras da linha e seleciona as que estão dentro do intervalo da seleção
        while ((correspondência = regexPalavra.exec(linhaAtual))) {
            const inicioPalavra = correspondência.index;
            const fimPalavra = regexPalavra.lastIndex;
            // Verifica se a palavra se sobrepõe ao intervalo da seleção
            if (
                fimPalavra > selectionStart.character &&
                inicioPalavra < selectionEnd.character
            ) {
                palavrasSelecionadas.push(correspondência[0]);
            }
        }

        if (palavrasSelecionadas.length === 0) return [];

        // Regex para definição exata conforme solicitado
        const regexDefinicao = /^(A|O|As|Os|Um|Uma|Uns|Umas)\s+([\w\s]+)\s+(é|são)\s+(um|uma|uns|umas)\s+([\w\s]+)\.$/;

        const localizacoes: Localizacao[] = [];

        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i];
            // Garante que não há vírgula, ponto e vírgula ou dois pontos
            if (linha.includes(',') || linha.includes(';') || linha.includes(':')) continue;

            const resultado = regexDefinicao.exec(linha);
            if (resultado) {
                const nomeVariavel = resultado[2].trim();
                const tipoBase = resultado[5].trim();
                const palavrasVariavel = nomeVariavel.split(/\s+/);

                for (const palavra of palavrasSelecionadas) {
                    if (palavrasVariavel.includes(palavra) || tipoBase === palavra) {
                        const idx = linha.indexOf(palavra);
                        if (idx !== -1) {
                            localizacoes.push({
                                uri: params.textDocument.uri,
                                range: {
                                    start: { line: i, character: idx },
                                    end: { line: i, character: idx + palavra.length }
                                }
                            });
                        }
                    }
                }
            }
        }

        return localizacoes;
    }
);

*/


// Handler para Goto Type Definition
conexão.onTypeDefinition(
    (_params: ParametrosDeDefinicaoDeTipo): Localizacao[] => {
        // Retorna uma localização simulada (sempre aponta para a linha 1)
        return [{
            uri: _params.textDocument.uri,
            range: {
                start: { line: 1, character: 0 },
                end: { line: 1, character: 10 }
            }
        }];
    }
);

// Handler para Goto Implementation
conexão.onImplementation(
    (_params: ParametrosDeImplementacao): Localizacao[] => {
        // Retorna uma localização simulada (sempre aponta para a linha 2)
        return [{
            uri: _params.textDocument.uri,
            range: {
                start: { line: 2, character: 0 },
                end: { line: 2, character: 10 }
            }
        }];
    }
);

// Handler para Find References
conexão.onReferences(
    (_params: ParametrosDeReferencia): Localizacao[] => {
        // Retorna duas localizações simuladas
        return [
            {
                uri: _params.textDocument.uri,
                range: {
                    start: { line: 0, character: 0 },
                    end: { line: 0, character: 10 }
                }
            },
            {
                uri: _params.textDocument.uri,
                range: {
                    start: { line: 3, character: 0 },
                    end: { line: 3, character: 10 }
                }
            }
        ];
    }
);













// Make the text document manager listen on the connection
// for open, change and close text document events
documentos.listen(conexão);

// Listen on the connection
conexão.listen();
