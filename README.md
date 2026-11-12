# Português Puro Language Server

The VS Code extension recognizes Português Puro source files with the `.pop`
extension. The workspace configures `windows1252` for the `portugues-puro`
language ID in `.vscode/settings.json`; the extension also contributes this
language-specific default.

## Functionality

- Go to Definition for declared types, including multi-word names and
  declarations in other open `.pop` documents, as well as both the base type
  and pointed-to type in pointer declarations.
- Document Symbols for type declarations, global variables, routines,
  parameters, local variables, and structure fields.
- Workspace Symbol search across `.pop` files in configured workspace folders,
  including files that are not currently open.
- Find All References for types, routines, fields, and variables, with optional
  declaration inclusion and workspace-wide lookup for non-local symbols.
- Rename Symbol creates workspace edits for every parsed occurrence of types,
  routines, fields, and variables across open and closed `.pop` files.
- Format Document applies two-space indentation to structure fields, routine
  statements, conditional and loop blocks, and wraps supported expression
  operators and `retornando` clauses while preserving strings and comments.
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
  Multi-word aliases such as `primeiro byte` and `coordenada X` are resolved
  by matching a known type suffix or prefix; unresolved aliases and duplicate
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
  mixed numbers, hexadecimal values, null literals, or quoted strings. String
  literals support doubled quotes as escapes and reject control characters.
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
- Parenthesized groups at the end of routine headers and calls distinguish
  otherwise similar routine names, for example
  `para que se centralize uma caixa (horizontalmente)` and
  `para que se centralize uma caixa (verticalmente)`. Their contents are
  literal name qualifiers, not syntax: keywords and articles inside them do
  not define statements or parameters, and line breaks are allowed.
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
- `Aloque memória para` accepts a variable or type based on `lista` (for
  example, `Aloque memória para a imagem.`).
- `Direcione`, `Aponte`, and `Redirecione` accept a type based on `ponteiro`
  followed by `para a rotina` and the name of a routine declared with
  `compativelmente` (for example,
  `Direcione um ponteiro para a rotina faça alguma coisa.`). The routine name
  is resolved as a reference to its declaration.
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
- A type derived from `lista` is also treated as a pointer for routine argument
  compatibility. List types support implicit fields: `primeiro/primeira`,
  `último/última`, and `próximo/próxima` followed by the element type name,
  plus the list type name followed by `anterior` or `precedente`. For example,
  `o primeiro vértice deste polígono`, `o próximo vértice deste vértice`, and
  `o fragmento anterior deste fragmento` resolve to their respective list
  element types. These implicit fields can be chained with physical fields.
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
- Numeric expressions also accept unary `-` and `+` before an operand, as in
  `Atribua - o número para o número negativo.` and
  `Atribua + o número para o número inalterado.`. The `/` operator forms a
  fraction from variable or literal numerator and denominator values, for
  example `Atribua o numerador / 123 para uma fração.`.
- Null literals are `nulo`, `nula`, `nulos`, `nulas`, `inexistente`,
  `inexistentes`, `zerado`, and `nil`. They are accepted as assignment values
  and routine arguments and match routine parameters as null pointer values.
  In conditions, they are resolved as arguments to ordinary boolean function
  signatures; for example, `Se o ponteiro for inexistente,` matches a function
  declared as `para que se determine se um ponteiro é um segundo ponteiro`.
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
The word `não` may negate a condition and is ignored when matching its
boolean function; it is not part of the function signature and is diagnosed
if it appears in a boolean function header.
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
- Set `POP_LSP_PROFILE=1` in the environment before launching VS Code to emit
  optional `[POP-LSP profile]` timing and catalog-size records, including
  correlated request timings, per-document parse phases, cache activity,
  catalog sizes, memory, CPU, event-loop lag, and garbage collection, to the
  language server output. Requests still pending after 5 seconds emit a
  watchdog record; slow completed phases also report their stage and available
  counters. Set `POP_LSP_PROFILE_SLOW_MS` to change the threshold. A synchronous
  phase can delay the watchdog until control returns to the event loop, whose
  lag is measured separately. Profiling is diagnostic only and never interrupts
  an operation. The parser has no token stream; lexical comment masking and
  syntax parsing are measured separately. Comment-free documents reuse their
  original source string instead of allocating and rebuilding a masked copy.
- Set `POP_LSP_CPU_PROFILE=1` before launching VS Code to capture a Node.js CPU
  profile for the language-server process. The `.cpuprofile` file is written to
  the operating system's temporary directory; profiling is disabled by default.

The workspace catalog and parsed references are reused while source text is
unchanged, regardless of LSP document-version changes. A source change or
watched `.pop` file update rebuilds context-sensitive results for documents in
the same directory. Declaration-level incremental parsing is not yet enabled.
The parser now records fingerprinted declaration/routine regions and
conservatively marks incomplete or diagnosed regions as non-reusable.
Unchanged, complete type and global-variable declarations can reuse their
syntax records after source offsets are rebased. An initial region dependency
graph records resolved and unresolved references and can calculate candidate
impact sets. During selective workspace reuse, the region graph is now
cross-checked against the existing document dependency index. The server
widens invalidation with the graph's affected regions, and falls back to a
full directory refresh if the graph misses any affected document identified
by the document index. This validates dependency coverage without yet skipping
semantic work: type, variable, routine, and reference resolution still run
for every document that is not reused as a whole. Declaration-level semantic
resolution remains disabled until region-level differential equivalence is
established.

The parser exposes `parseTypeDeclarationSyntax` as a syntax-only phase and
`resolveTypeDeclarationSyntax` as a separate semantic phase. The regular
`parseTypeDeclarations` API composes both, preserving the existing fully
resolved result. `parseTypeDeclarationRegion` can parse a single fingerprint-
verified, syntactically complete region and rebase its ranges; syntactic
completeness is tracked separately from semantic diagnostics. These APIs are
validated against repository fixtures, including semantic snapshots from the
full parser. Profiling also records region-graph construction and invalidation
selection/closure duration, alongside existing parse-phase, memory, and LSP
request latency records. A semantic resolution worklist and its full-parse
verifier are still pending.

Routine-call resolution indexes normalized names per parse instead of
comparing every call against every routine. Name matching normalizes each
candidate word once, bounds lookahead by the longest declared routine name,
and uses a bounded cache for repeated normalized names. Workspace updates
coalesce concurrent open/change notifications and avoid invalidating cached
analysis when the source text is unchanged. Routine parsing also tracks
parenthesis depth in one pass, and searches for cast markers are bounded to
their argument ranges to avoid rescanning the rest of large documents. Type
name normalization uses a bounded string cache, and computed-field routine
lookup indexes candidates by field name.
