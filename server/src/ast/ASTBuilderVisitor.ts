import { ASTNode } from './ASTNode';


export default class ASTBuilderVisitor {
  /*visit(tree: ParseTree): ASTNode {
    return tree.accept(this);
  }*/

  visitEspacoEmBranco(contexto: any): ASTNode {
    return visitaEspaçoEmBranco(contexto);
  }

  visitComentario(contexto: any): ASTNode {
    return visitaComentario(contexto);
  }

  visitIdentificador(contexto: any): ASTNode {
    return visitaIdentificador(contexto);
  }

  visitLiteral(contexto: any): ASTNode {
    return visitaLiteral(contexto);
  }

  visitRotina(contexto: any): ASTNode {
    return visitaRotina(contexto);
  }

  visitOperador(contexto: any): ASTNode {
    return visitaOperador(contexto);
  }
}


/*

import { ParseTree } from 'antlr4ts/tree';
import { PortuguesPuroParserVisitor } from '../antlr/PortuguesPuroParserVisitor'
import { PortuguesPuroParser } from '../antlr/PortuguesPuroParser';


export class ASTBuilderVisitor implements PortuguesPuroParserVisitor<ASTNode> {
  visit(tree: ParseTree): ASTNode {
    return tree.accept(this);
  }

  visitPrograma(contexto: PortuguesPuroParser.ProgramaContext): ASTNode {
    const children = contexto.children?.map(child => child.accept(this)) || [];
    return { type: 'Program', children, line: contexto.start.line, column: contexto.start.charPositionInLine };
  }

  visitTipo(contexto: PortuguesPuroParser.TipoContext): ASTNode {
    return {
      type: 'TypeDeclaration',
      name: contexto.nome()?.text,
      line: contexto.start.line,
      column: contexto.start.charPositionInLine
    };
  }

  visitVariavel_global(contexto: PortuguesPuroParser.Variavel_globalContext): ASTNode {
    return {
      type: 'GlobalVariable',
      name: contexto.nome()?.text,
      line: contexto.start.line,
      column: contexto.start.charPositionInLine
    };
  }

  visitRotina(contexto: PortuguesPuroParser.RotinaContext): ASTNode {
    return {
      type: 'Routine',
      name: contexto.nome_da_rotina()?.text,
      line: contexto.start.line,
      column: contexto.start.charPositionInLine
    };
  }

  visitChildren(contexto: ParseTree): ASTNode {
    const children = contexto.children?.map(child => child.accept(this)) || [];
    return { type: 'GenericNode', children, line: contexto.start.line, column: contexto.start.charPositionInLine };
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
*/


function visitaEspaçoEmBranco(contexto: any): ASTNode {
  const espaçoEmBranco: ASTNode = {
    type: 'EspacoEmBranco',
    line: contexto.start.line,
    column: contexto.start.charPositionInLine,
    text: contexto.text
  };
  return espaçoEmBranco;
}

function visitaComentario(contexto: any): ASTNode {
  const comentário: ASTNode = {
    type: 'Comentário',
    line: contexto.start.line,
    column: contexto.start.charPositionInLine,
    text: contexto.text
  };
  return comentário;
}

function visitaIdentificador(contexto: any): ASTNode {
  const identificador: ASTNode = {
    type: 'Identificador',
    name: contexto.text,
    line: contexto.start.line,
    column: contexto.start.charPositionInLine,
    text: contexto.text
  };
  return identificador;
}

function visitaLiteral(contexto: any): ASTNode {
  const literal: ASTNode = {
    type: 'Literal',
    value: contexto.text,
    line: contexto.start.line,
    column: contexto.start.charPositionInLine,
    text: contexto.text
  };
  return literal;
}

function visitaRotina(contexto: any): ASTNode {
  const rotina: ASTNode = {
    type: 'Rotina',
    name: contexto.nome_da_rotina()?.text,
    line: contexto.start.line,
    column: contexto.start.charPositionInLine
  };
  return rotina;
}

function visitaOperador(contexto: any): ASTNode {
  const operador: ASTNode = {
    type: 'Operador',
    name: contexto.text,
    line: contexto.start.line,
    column: contexto.start.charPositionInLine,
    text: contexto.text
  };
  return operador;
}
