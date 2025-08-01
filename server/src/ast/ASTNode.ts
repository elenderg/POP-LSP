export interface ASTNode {
  type: string;
  name?: string;
  children?: ASTNode[];
  line: number;
  column: number;
}

export interface ASTNodeWithValue extends ASTNode {
  value?: string | number | boolean | null;
  rawValue?: string;
}