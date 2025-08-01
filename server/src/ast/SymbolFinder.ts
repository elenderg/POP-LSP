import { ASTNode } from './ASTNode';

export function findSymbols(ast: ASTNode, symbols: ASTNode[] = []): ASTNode[] {
  if (['TypeDeclaration', 'GlobalVariable', 'Routine'].includes(ast.type)) {
    symbols.push(ast);
  }

  if (ast.children) {
    for (const child of ast.children) {
      findSymbols(child, symbols);
    }
  }

  return symbols;
}
