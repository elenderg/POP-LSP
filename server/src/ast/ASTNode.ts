export interface ASTNode {
  type: string;
  name?: string;
  children?: ASTNode[];
  line: number;
  column: number;
  text?: string; // Optional text for nodes that have associated text
  value?: string | number | boolean | null; // Optional value for nodes that can have a value
  rawValue?: string; // Optional raw value for nodes that can have a raw value
}

export interface ASTNodeWithValue extends ASTNode {
  value?: string | number | boolean | null;
  rawValue?: string;
}