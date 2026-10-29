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
  pluralizing every word in compound names except `de` and the words after it
  (for example, `casa do pato` becomes `casas dos patos`, while `escova de
  dente` becomes `escovas de dente`). Scalar types store their reduced scale
  as a fraction relative to the declared type `número`.
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
- Comments are ignored by the parser: `\` starts a line comment, while `[ ... ]`
  delimits a block comment. Comment contents do not affect declarations or
  source locations. Non-printable control characters in comments are diagnosed,
  except CR/LF that terminate line comments.
- Routine and function headers use `para que se`, optionally preceded by
  `Rotina` or `Função`. Semicolon-terminated alternate names are associated
  with the following colon-terminated header. Headers may declare parameters
  after `usando` (or its equivalents `desde`, `dado/a(s)`, `com`, and
  `contendo`) and a return value after `retornando`; parameter and return types
  are resolved against the type catalog. Routine-name matching normalizes the
  specified verb forms (for example, `for` to `é`), prepositions (`sob` to
  `sobre`, `em` to `para`), and Portuguese contractions (for example, `ao`
  to `a o`, then `a` before an article to `para`). The routine body begins
  after the header colon and ends at the next top-level type declaration,
  global variable declaration, or routine header; no block delimiter is
  required.
- Alternate headers that repeat the primary name and parameter types are
  diagnosed as semantically equivalent. A colon-terminated header immediately
  followed by another routine header receives a hint to use `;` for the
  alternate header.
- Statements in routine bodies end with a period. Routine calls are resolved
  against declared names and aliases, matching calls without parameters first;
  definite or demonstrative articles in arguments can identify passed
  parameters. Calls resolve to the matching routine definition, and an empty
  routine body receives a hint diagnostic.
- The `Decodifique` instruction accepts a hexadecimal literal (for example,
  `Decodifique $8B8508000000.`). A diagnostic is reported when it is followed
  by another value or no value; routine names beginning with `Decodifique`
  therefore cannot be invoked as normal calls.
- The `Empilhe` instruction accepts a numeric literal or a variable introduced
  by a definite article (for example, `Empilhe 123.` or `Empilhe o byte.`).
  Variables must have type `byte`, `word`, or `número`, or derive from one of
  those types. The keyword is reserved and cannot be used in a routine name.
- The `Processe` instruction invokes an internal function pointer or an
  external function identified by library and function string literals.
  Optional arguments follow `com` and are separated by `e`; each argument is
  a literal or definite-article variable. An optional `retornando` clause
  declares a local variable from the return type, with an optional name after
  `denominado/a/os/as`. The keyword is reserved and cannot be used in a routine
  name.
- The `Retorne` statement returns control to the caller and must appear without
  a value or variable (for example, `Retorne.`). The keyword is reserved and
  cannot be used in a routine name.
- Loops use `Itere.` to begin a loop, `Pare.` to leave the loop, and `Reitere.`
  to restart it. A loop beginning at the start of a routine may omit `Itere`;
  `Reitere` inside a condition also continues from the loop start, while
  `Retorne` still returns from the routine. These instructions do not create a
  separate variable scope: locals declared in conditional or loop statements
  remain visible throughout the routine.
- Routine parameters are passed by reference, so a routine can modify the
  arguments supplied by its caller without returning a replacement value.
- Routine calls accept compatible literal values or variables/parameters of the
  expected type. An indefinite article in a call argument declares a local
  variable of the following type, optionally named with `denominado/a/os/as`
  (for example, `bar um número denominado contagem.`). Without an explicit
  name, the type phrase supplies the variable name and may be reduced to find
  its base type. A variable can then be passed to later calls using a definite
  article, as in `baz a contagem.`. Declarations can also be initialized in
  the call, for example `Atribua 123 para um número denominado valor.`.
- Structure fields can be accessed in routine arguments with `deste`, `desta`,
  `destes`, or `destas`. For example, `Bar o nome deste cliente.` accesses
  `nome` on `cliente`; chains such as
  `Bar o logradouro deste endereço deste cliente.` access nested fields.
  Field access resolves the final field type for routine argument matching,
  supports inherited structure fields, and navigates to the field definition.
- Computed structure fields are declared by functions named
  `para que se atribua <artigo definido> <campo> dum/duma/duns/dumas
  <estrutura> para <artigo indefinido> <tipo de resultado>`. For example,
  `Função para que se atribua o centro dum retângulo para uma localização:`
  defines `centro` as a computed field of `retângulo`, with result type
  `localização`. The owner must be a defined structure type, and the result
  type is declared as the function's single parameter. Computed fields are
  resolved as fallback after physical fields, including when matching routine
  arguments; an unresolved access is diagnosed. Unlike physical fields,
  computed fields do not navigate to a definition.
- The type operators `endereçamento`, `magnitude`, and `conteúdo` can be used
  before a type or field access. `endereçamento deste caractere` represents the
  address of the value, `a magnitude desta string` represents its size in bytes,
  and `o conteúdo deste ponteiro` represents the pointed-to value. `conteúdo`
  can follow a physical or computed field in a chained access. These operators
  do not require a matching structure member or computed-field function. Their
  words remain valid in ordinary identifiers, such as a variable named
  `conteúdo`.
- Local variables take precedence over global variables with the same
  normalized name throughout the containing routine. Thus, declaring a local
  `nome` shadows a global `nome` when resolving later arguments and references.
- Routine calls that have no matching declared routine produce a diagnostic.
  When a parameter call passes an unresolved variable name (for example,
  `Baz a string.` for a routine expecting a `string`), the parser reports the
  missing variable. A matching global variable or a local declaration such as
  `Baz uma string.` resolves the argument instead.
- A routine parameter accepts values of its declared type and any derived
  subtype. When multiple overloads match, the parser selects the closest
  declared parameter type first, following the derived type's base chain; it
  falls back to more general overloads only when no closer match exists.
- Routine arguments may use `tal como` or `tal qual` followed by an indefinite
  article and a type to match the value as that type (for example,
  `Foo a cifra binária tal como um byte.`). This only affects argument
  compatibility for that call; it does not convert or change the variable's
  declared type.
- `Preserve` creates a local copy of a routine parameter. The copy keeps the
  parameter's original name, while the received argument is renamed by adding
  `original` (for example, preserving `valor` creates `valor` as the copy and
  `valor original` as the original argument). It must be followed by a definite
  article and a parameter name, and cannot be used in a routine name.
- Arithmetic assignment expressions support `mais`, `menos`, `vezes`, and
  `dividido por`. They are evaluated strictly from left to right with no
  precedence rules; for example, `Atribua o número mais 2 menos 1 vezes o
  número dividido por 2 para o segundo número.` is grouped as sequential
  left-associated operations.
- String expressions support the equivalent concatenation operators `junto
  com` and `seguido de`. They may be mixed in one expression and are evaluated
  left to right, for example: `Escreva "Olá, " junto com o nome junto com o
  sobrenome seguido de "!" para StdOut.`
- Boolean functions use the `para que se determine se` header and must contain
  a `Diga sim.` or `Diga não.` statement. `Diga` accepts only these boolean
  literals and cannot be used in ordinary routines or routine names.
- Conditional blocks use `Se <condition>,` and end at the final period.
  Intermediate statements are separated with semicolons; the last statement
  ends the block. Conditions resolve to boolean functions, including functions
with parameters. For example, `Se o número for 2,` resolves to a boolean
function declared with parameters for a number and a second number; `for` is
normalized to `é` when matching the predicate. Argument types may match
through the type inheritance chain. Else/elseif clauses and nested
conditionals are not supported.
- A period terminates type and global-variable declarations and statements;
  it also terminates conditional blocks. A colon is used for the end of a
  routine header and start of its body. Semicolons separate statements in
  conditional blocks, with alternate routine headers as the existing syntax
  exception. These punctuation marks are diagnosed when used in type or
  global-variable names.
- Reserved grammar words are diagnosed when used in type or global-variable
  identifiers.
- End-to-end coverage for Go to Definition.

## Development

- Run `npm install` in this folder to install the client and server dependencies.
- Open this folder in VS Code and press Ctrl+Shift+B to compile in watch mode.
- Press F5 and open a `.pop` file in the Extension Development Host to test the
  language server.
- Run `npm test` to compile and execute the VS Code end-to-end tests against
  this workspace, including the language-specific encoding setting.
