import { ParseTree } from 'antlr4ts/tree';
import { PortuguesPuroParserVisitor } from '../antlr/PortuguesPuroParserVisitor'
import { PortuguesPuroParser } from '../antlr/PortuguesPuroParser';
import { ASTNode } from './ASTNode';

export class ASTBuilderVisitor implements PortuguesPuroParserVisitor<ASTNode> {
  visit(tree: ParseTree): ASTNode {
    return tree.accept(this);
  }

  visitPrograma(ctx: PortuguesPuroParser.ProgramaContext): ASTNode {
    const children = ctx.children?.map(child => child.accept(this)) || [];
    return { type: 'Program', children, line: ctx.start.line, column: ctx.start.charPositionInLine };
  }

  visitTipo(ctx: PortuguesPuroParser.TipoContext): ASTNode {
    return {
      type: 'TypeDeclaration',
      name: ctx.nome()?.text,
      line: ctx.start.line,
      column: ctx.start.charPositionInLine
    };
  }

  visitVariavel_global(ctx: PortuguesPuroParser.Variavel_globalContext): ASTNode {
    return {
      type: 'GlobalVariable',
      name: ctx.nome()?.text,
      line: ctx.start.line,
      column: ctx.start.charPositionInLine
    };
  }

  visitRotina(ctx: PortuguesPuroParser.RotinaContext): ASTNode {
    return {
      type: 'Routine',
      name: ctx.nome_da_rotina()?.text,
      line: ctx.start.line,
      column: ctx.start.charPositionInLine
    };
  }

  visitChildren(ctx: ParseTree): ASTNode {
    const children = ctx.children?.map(child => child.accept(this)) || [];
    return { type: 'GenericNode', children, line: ctx.start.line, column: ctx.start.charPositionInLine };
  }

  // Fallback para nós não especificados
  visitTerminal(node: ParseTree): ASTNode {
    return {
      type: 'Terminal',
      name: node.text,
      line: node.symbol.line,
      column: node.symbol.charPositionInLine
    };
  }

  visitErrorNode(node: ParseTree): ASTNode {
    return {
      type: 'ErrorNode',
      name: node.text,
      line: node.symbol.line,
      column: node.symbol.charPositionInLine
    };
  }
}
