# Português Puro Language Server

The VS Code extension recognizes Português Puro source files with the `.pop`
extension. The workspace configures `windows1252` for the `portugues-puro`
language ID in `.vscode/settings.json`; the extension also contributes this
language-specific default.

## Functionality

- Go to Definition for declared types, including multi-word names and
  declarations in other open `.pop` documents, as well as both the base type
  and pointed-to type in pointer declarations.
- Each open document's symbol table is refreshed when the document opens,
  changes, or is saved, and discarded when it closes.
- Initial parser and type symbol table in `server/src/typeParser.ts`, recognizing
  dot-terminated type declarations, including `ponteiro para um tipo`,
  structures with named fields, and union fields using `sob o/a/os/as`. The
  primitive type names are `byte`/`bytes` and `estrutura`/`estruturas`.
  `número` is a declared structure type, not a primitive.
- Structure fields may include an unnamed contiguous byte array, such as
  `4 bytes.`. Other array element types are reported as errors.
- A field may omit `denominado/a/os/as` to infer its name from the field type.
  Multi-word aliases such as `primeiro byte` are resolved by removing leading
  words until a known type suffix is found; unresolved aliases and duplicate
  field names are reported as errors.
- Structure fields may end with `(referência)` to mark that the field stores a
  reference to its type. The marker is excluded from the field name and is not
  treated as a type reference for navigation.
- Scalar declarations can use integer multipliers (for example,
  `Uma dezena são 10 unidades.`). Type lookup accepts generated plural names,
  and scalar types store their reduced scale as a fraction relative to the
  declared type `número`.
- Type names are case-insensitive for lookup, and runs of whitespace (including
  line breaks and tabs) are normalized.
- Unknown base types are reported as errors on the type name, including names
  that differ from a declared type only by missing or incorrect accents.
- Global variables use the definite articles `o`, `os`, `a`, and `as` and are
  stored in a symbol catalog separate from types. Their declared types are
  checked against the type catalog.
- Global variables declared as structures may contain fields, using the same
  named, inferred, aliased, union, byte-array, and reference-marker rules as
  structure types.
- Global variables may be initialized with signed 32-bit integers, fractions,
  mixed numbers, hexadecimal values, or quoted strings. String literals support
  doubled quotes as escapes and reject control characters.
- Global variable types may be inferred from abbreviated literal initializers:
  integers infer `número`, fractions and mixed numbers infer `fração`,
  hexadecimal values infer `texto hexadecimal`, and strings infer `string`.
- End-to-end coverage for Go to Definition.

## Development

- Run `npm install` in this folder to install the client and server dependencies.
- Open this folder in VS Code and press Ctrl+Shift+B to compile in watch mode.
- Press F5 and open a `.pop` file in the Extension Development Host to test the
  language server.
- Run `npm test` to compile and execute the VS Code end-to-end tests against
  this workspace, including the language-specific encoding setting.
