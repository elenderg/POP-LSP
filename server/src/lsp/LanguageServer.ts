import { ASTNode } from '../ast/ASTNode';

export function nodeToLocation(node: ASTNode, fileName: string) {
  return {
    uri: `file://${fileName}`,
    range: {
      start: { line: node.line - 1, character: node.column },
      end: { line: node.line - 1, character: node.column + (node.name?.length || 1) }
    }
  };
}
