/*

import { CharStreams, CommonTokenStream } from 'antlr4ts';
import  PortuguesPuroLexer from "./antlr/PortuguesPuroLexer";

import { PortuguesPuroParser } from './antlr/PortuguesPuroParser';
import { ASTBuilderVisitor } from './ast/ASTBuilderVisitor';
import { findSymbols } from './ast/SymbolFinder';
import { nodeToLocation } from './lsp/LanguageServer';

// Exemplo de código de entrada
const code = `
uma Pessoa é uma estrutura com campos.
o total é um número igual a 10.
Rotina para que se calcule:
    Preserve um nome.
`;

// Lexer e Parser
const inputStream = CharStreams.fromString(code);
const lexer = new PortuguesPuroLexer(inputStream);
const tokenStream = new CommonTokenStream(lexer);
const parser = new PortuguesPuroParser(tokenStream);
const tree = parser.programa();

// Construção da AST
const visitor = new ASTBuilderVisitor();
const ast = visitor.visit(tree);

// Encontrando símbolos
const symbols = findSymbols(ast);

// Exibindo símbolos e localizações
for (const symbol of symbols) {
  console.log(symbol);
  console.log(nodeToLocation(symbol, "teste.pop"));
}

*/