# Português Puro Language Server architecture

## Overview

The server currently uses a two-stage analysis pipeline: a parser that produces a typed `ParsedDocument`, and a semantic workspace index that combines document declarations, type/field references, and routine binding metadata. The architecture keeps syntax understanding and navigation semantics separate while reusing a shared projection model for diagnostics, hover, references, and document symbols.

## Main components

### 1. Parser and syntax projection (`server/src/typeParser.ts`)

The parser is the source of truth for the concrete grammar actually accepted by the language. It reads the document text, masks comments and strings, and produces a `ParsedDocument` containing:

- `declarations`: user-defined types
- `globalVariables`: global variables and literals
- `routines`: routines, overloads, parameters, locals, returns, and body records
- `diagnostics`: parser and semantic diagnostics with source ranges
- `symbols`: symbol catalog for declarations and references

The parser does not try to force a fully generic AST where the grammar is not explicitly supported. Instead, it records parser-specific payloads and produces a projection into `SyntaxNode` entries when the source item can be projected meaningfully as a typed node. The projection is used for Document Symbols, position queries, and structural navigation.

### 2. Semantic model (`server/src/analysisModel.ts`)

`analysisModel.ts` builds a shared semantic representation over the parsed document. It provides:

- position-based reference lookup
- symbol lookup and declaration binding
- document-level dependency graph
- affected-document closure for declaration changes
- support for hover, definition, implementation, references, and rename

This layer centralizes logic that would otherwise be duplicated across LSP providers.

### 3. Workspace refresh and invalidation (`server/src/server.ts`)

The server keeps a cached workspace index by URI and directory. It refreshes it on document open/change/save/close events and coalesces repeated updates. The refresh pipeline:

1. collect open documents and directory groups
2. reuse cached source analysis when the text is unchanged
3. parse base documents and contextual documents per directory
4. assemble a catalog for cross-document semantic resolution
5. compute affected documents for declaration changes
6. reuse contextual analysis only under a conservative safety gate
7. publish diagnostics and build symbol data for the active document

## Data flow from editor change to LSP response

### End-to-end flow

1. VS Code opens or edits a `.pop` document.
2. `documents.onDidOpen` / `onDidChangeContent` trigger workspace refresh bookkeeping.
3. `getWorkspaceDocuments(...)` rebuilds or reuses a workspace snapshot.
4. `parseTypeDeclarations(...)` parses changed documents and contextual documents that need cross-document resolution.
5. `getDocumentAnalysis(...)` indexes references, declarations, and ranges for the active document.
6. LSP features read the shared semantic index and return locations or symbols.
7. Diagnostics are published only if the document and workspace snapshot are still current.

### Important design choices

- Source text is cached separately from parsed results so unchanged documents avoid reparse work.
- The workspace index keeps document/directory grouping and cross-document type/routine dependencies.
- Declaration changes are converted into impact sets using the dependency graph and name-based fallback logic.
- Selective reuse is intentionally conservative: changed documents with
  diagnostics and declaration changes in a diagnostic-bearing snapshot force
  directory-wide reparsing.

## Dependency and graph model

The workspace index records semantic edges between documents for:

- type references
- routine bindings and overload candidates
- global variable references
- field references and computed field access
- name-specific and conservative unresolved-name dependents

For cross-document structure-field accesses, the parser resolves a field's
owner type through the contextual `TypeSymbolTable` when the owner declaration
is not local to the consuming document. That preserves the field container in
the reference identity, allowing the workspace index to connect the access to
the defining file and include it in field-change impact closure.
Tests also verify that adding a previously missing variable or field invalidates
consumers by name, and that unresolved routine calls conservatively invalidate
consumers when a routine declaration is added.

The graph is used for:

- affected-document closure after a declaration is added, removed, or renamed
- safe invalidation of dependent documents
- future incremental reanalysis planning

The graph is not used as a fully trusted proof of semantic safety in all
cases. A declaration change in a diagnostic-bearing prior snapshot falls back
to full contextual reparsing; body-only edits may still reuse unrelated
documents.

## Selective invalidation policy

Selective contextual reuse is enabled under conservative conditions:

- a previous directory snapshot and source snapshot must exist
- changed documents are compared by source text
- public declaration surfaces are compared, including type/field shape,
  variable type/initializer, and routine signature
- changed documents with diagnostics force directory-wide contextual
  reparsing
- declaration changes in a diagnostic-bearing previous snapshot force the
  same fallback
- documents outside the impact closure can reuse their contextual parse
  result

A body-only edit in a clean document can reuse unchanged contextual parses
even if unrelated documents in the directory have diagnostics. This is safe
because the document's public declaration surface is unchanged. The change
improves reuse, but it does not make the semantic engine fully incremental:
the workspace index is rebuilt for each new workspace snapshot, and affected
documents are still reparsed as complete files.

## Syntax coverage audit

The inventory below enumerates the parser's implemented production families
and statement dispatch branches. It is an exhaustive code-path inventory of
the current parser, not a normative grammar for Portuguese Puro or a claim
that every legal language form is accepted. `typeParser.ts` remains the
behavioral source of truth.

**Status: partial, not complete grammar coverage.** The current projection
captures the parser's structured records for navigation, but it is not a
complete concrete or abstract syntax tree for every accepted or malformed
source form. No formal grammar source is present in the repository against
which exhaustive coverage can be proven.

The automated projection-parity test now checks that representative parser
records for declarations, base and pointer type references, scalar factors,
fields, globals and every accepted global literal kind, routine parameters, assignments,
outputs, calls, locals, conditionals, loops, process operations, returns, and
instructions have corresponding typed syntax nodes. Separate tests check
range integrity, nested loop/body ownership, resolved conditional targets,
and incomplete syntax. This verifies projection of those exercised records;
it does not establish exhaustive coverage of every accepted spelling or
recovery path.

### Status snapshot for the requested language constructs

| Area | Implemented and represented | Remaining limitation / example |
| --- | --- | --- |
| Types | Simple derived types, structures with fields, pointer targets, scalar factors, aliases/unions, and byte arrays are parsed. List roots and types derived from `lista` project as `list-declaration`; other types project as `type-declaration`. List special fields project as `list-field-access` nodes with the resolved element type and exact ranges. | List-specific accesses have typed nodes; structure and declared-list payload fields still share `TypeField`. Articles/operators and some field details remain payloads, not token nodes. |
| Global variables | Explicit or inferred types, inline fields, and integer, fraction, mixed, hexadecimal, string, and null initializers are supported and projected. Explicit form `O nome da pessoa é uma string igual a "João".` is tested. | No exhaustive shorthand conformance suite exists beyond these parser forms and the tested literal cases. |
| Routine locals | Parameters, inferred/implicit local names, explicitly named locals, call/process return locals, and duplicate-name checks are represented. Indefinite articles in routine statements are inspected as local-variable starts, including `Limpe uma nova string.` | A local name/type is recorded only when the phrase can be matched to a known type; malformed or unknown-type phrases remain diagnostics/ranges rather than typed declarations. |
| Routine headers | Primary and alternate headers, annotations, parameters, boolean predicate headers, return parameters, qualifiers, and computed-field headers have parser records and projection nodes. | The accepted header forms are parser-specific and do not have exhaustive grammar-derived tests. |
| Statements and control flow | Preserve, decode, push, allocation/deallocation, process, calls, return, loop instructions and conditional blocks are dispatched; loop/body nodes include incomplete and implicit loop forms. | Nested conditionals are rejected. Conditions intentionally resolve to calls to declared boolean routines; `e`, `ou`, and comparison-like phrases are ordinary words in routine names, not built-in boolean operators. |

| Parser form | Projection | Remaining gap |
| --- | --- | --- |
| Derived type declarations, pointer targets, scalar factors, and fields | Type declarations retain typed payloads; base types and pointer targets have distinct reference nodes; explicit scalar factors have exact-range nodes; declared fields retain named/byte-array payloads; special list accesses have typed nodes and link to their element type | Articles and operators remain declaration payloads; declared structure/list fields share the `TypeField` representation |
| Global variables and literal initializers | Typed `global-variable-declaration` and `global-initializer` nodes | Literal internals are payloads rather than a token tree |
| Routine headers, alternate parameters, and computed fields | Typed routine, header, parameter, and computed-field nodes | Incomplete header productions recover through ranges/diagnostics |
| Calls, assignments, outputs, and expressions | Typed operation and expression nodes, with indexed reference nodes; supported arithmetic/concatenation operators retain exact source ranges and are represented as binary nodes; unary `+`/`-` have unary nodes | Operand text that is not a resolved reference is retained as an exact-range text part; the parser does not define an independent operator-precedence grammar |
| Conditionals and predicate calls | Conditional and condition-expression nodes retain the matched boolean-routine call, arguments, and resolved target; `e`, `ou`, and comparison-like phrases participate in matching complete routine names and parameter separators | No general boolean-operator AST is needed for the accepted syntax; a condition composes behavior by calling one declared boolean routine |
| Allocation, deallocation, processes, loops, decode/push, returns, and Preserve | Typed operation nodes under statement nodes; decode literals and push literals/variable references are retained as payloads and references | Some invalid forms remain generic statement/diagnostic ranges; invalid decode/push retains its instruction node and diagnostic |
| Comments and strings | Original ranges retained; comments excluded from reference lookup | No trivia/token AST is maintained |
| Incomplete and malformed productions | Positioned `parser-diagnostic` nodes beneath the deepest known syntax parent | Recovery is parser-specific, not a complete error-production tree |

### Comparison with the pre-refactor parser

The attached `Old_typeParser.ts` was compared with the current parser for
global variable declarations, local variable declarations, computed-field
headers, and list-special-field resolution. Those implementations are
identical, confirming that explicit-type global initializers, inferred locals
in recognized calls, computed-field headers, and existing list-special-field
type inference predate the AST refactor. The legacy parser did not provide the
current typed syntax projection. The current parser additionally records
indefinite-article local declarations at statement level, so a resolvable local
type can still be recorded even when the verb does not bind to a known routine.
Special list-field accesses are now retained on the routine model and
projected into the syntax tree, including their access category and resolved
element-type reference.

### Implemented parser production inventory

| Area | Implemented forms / parser path | Projection and test status |
| --- | --- | --- |
| Lexical preprocessing | Comment masking with source ranges; quoted strings are protected from statement/operator scans | Comment ranges are retained; representative strings and comments occur in fixtures; no standalone token/trivia tree |
| Top-level type declarations | Indefinite-article type names, `é`/`são`, base type, pointer target, scalar factor, structure fields, aliases/unions, byte arrays | Type, list-type, base-type, pointer-target, scalar-factor and declared-field nodes; special list accesses have typed nodes linked to the element type |
| Top-level variables | Definite-article names, explicit or inferred types, literal initializer, inline fields | Variable and initializer nodes; tests cover explicit-type string initialization and inferred integer, fraction, mixed, hexadecimal, string, and null literals |
| Routine headers | Optional `Rotina`/`Função` annotation, predicate/function header, compatible marker, aliases, parameters, return parameter, qualifier, computed-field header | Routine/header/parameter/computed-field nodes; malformed headers retain diagnostics and ranges |
| Routine statement dispatch | Preserve; assignment; output; boolean return; return; decode; push; allocation; routine address; loop control; external/internal `Processe`; routine call; deallocation fallback | Typed nodes for accepted records; dispatch precedence is significant and remains implemented in `processRoutineStatement` |
| Conditional body | `Se` predicate with comma-delimited body; semicolon-separated child statements; nested `Se` diagnosed and rejected | Conditional and condition-expression nodes; matched predicate call, arguments, resolved routine, and exact ranges are retained |
| Loop construction | `Itere`/`Reitere` explicit pairing, unmatched explicit starts, implicit body from `Reitere`, nested explicit loops | Typed block/body/instruction nodes; complete, incomplete, implicit, and nested cases have focused tests |
| Expressions | Operands, leading unary `+`/`-`, and parser-recognized binary `mais`, `menos`, `vezes`, `dividido por`, `junto com`, `seguido de`, `/` | Operator and operand ranges; operands are segmented into exact opaque-text spans and resolved symbol-reference spans |
| Recovery | Diagnostics for malformed or unresolved declarations/statements and incomplete bodies | Positioned diagnostic nodes; recovery behavior is not a formal error grammar |

Operator association is the parser's current left fold over the recognized
arithmetic and concatenation operators; it is not evidence of a
language-defined precedence hierarchy. For example, in
`Atribua o valor mais 2 para o total.`, the exact span `o valor` can be split
into an article/text portion and a resolved reference to `valor`, while `2`
is preserved as text because literals are not variable/type references.
Conjunctions, disjunctions, and comparison-like phrases in boolean headers
are not decomposed into boolean operators: they remain part of the ordinary
routine name and are resolved against declared boolean routines.

Consequently, the projection is useful for editor navigation but is not a
complete token-level AST or a complete expression/statement grammar. Tests
assert parent/child range integrity, projection of representative structured
parser records, global initializers, type references, arithmetic expression
operators, resolved conditional targets, decode/push instructions,
allocation/deallocation, and external process nodes. Nested conditionals are
explicitly rejected by the parser and remain represented as a parser
diagnostic and source range rather than an invented nested syntax node.

Routine bodies, conditional bodies, and loop blocks are represented as
structural nodes. Explicit loops are paired by `Itere`/`Reitere`; a loop
without a matching `Reitere` remains an incomplete block ending at the known
routine-body boundary. A routine containing `Reitere` without an explicit
`Itere` is represented as an implicit loop, matching the documented syntax.
`Reitere` inside a conditional body is treated as a continuation and does not
close an explicit loop. Nested explicit loops are paired with a stack. The
loop-body range lies between the opening and closing instructions; the closing
`Reitere` statement is a child of the loop block rather than the body.
Statements are attached to the nearest containing body using structural child
indexes. `Pare` remains a typed control instruction rather than a loop
delimiter, and loops do not introduce a separate variable scope.

## Current strengths

- shared semantic lookup across hover/definition/references/rename
- directory-level dependency indexing and impacted-document closure
- conservative selective reuse for intact snapshots
- profiling hooks for parse, symbol, and workspace refresh stages
- parser diagnostics preserved in the projection for incomplete documents

## Known limits

- This does not implement fully incremental semantic analysis.
- The dependency graph is still intentionally conservative.
- Completion remains declaration-based and does not invent a broader ranking or snippet grammar.
- Declaration changes still trigger directory-wide fallback when the prior
  snapshot has diagnostics, because incomplete syntax may hide dependencies.
- Some grammar branches remain payload-based rather than full explicit AST subnodes.
- Expression operands now retain ordered, exact-range text/reference segments;
  internal natural-language phrasing is deliberately not recursively parsed.
- Nested conditional syntax is rejected by the parser; the projection does not
  invent nested conditional nodes for rejected input.
- There is no exhaustive grammar-derived conformance suite. Existing tests
  cover representative forms and parser-record projection, not every lexical
  variant accepted by the parser.
- There is no controlled before/after performance comparison against the
  previous implementation or memory benchmark across project sizes.
- The semantic workspace index is rebuilt for each new workspace snapshot.
  Parsing and document analysis are reused for unchanged/unaffected documents,
  but index contribution removal/addition is not yet incremental.
- Routine-body semantic resolution can reuse unchanged region checkpoints
  under conservative conditions; declaration parsing and workspace indexing
  are still rebuilt at document/snapshot granularity.

## Regional incremental analysis and checkpoints

`ParsedDocument.regions` records position ranges for each parsed top-level
type declaration, global variable declaration, and routine. A routine region
includes its grouped header and body, with separate header and body ranges.
Declaration regions use their parsed declaration ranges. These are semantic
regions rather than a token/trivia tree; gaps such as comments and whitespace
are not independent regions.

On a clean previous snapshot, when exactly one existing document in a
directory changed and its declaration surface is unchanged, the parser can
reuse resolved routine records whose header and non-trailing body text are
identical, even when a whitespace-only edit before the routine shifts its
offset. It still parses current declarations and routine
headers, but skips parameter, computed-field, call/body, and local-variable
resolution for those reused routines. The changed routine is resolved against
the current catalog. Diagnostics in the prior directory snapshot, document
addition/removal, multiple changed documents, or any declaration-surface
change disable routine checkpoint reuse. A routine retaining resolved
structure-field target objects is also reparsed rather than carrying those
document-owned object references into the new snapshot.

For reuse, all nested source ranges are cloned and shifted by the routine's
start-offset delta, and the current body boundary replaces the cached one.
Trailing whitespace between a routine's final statement and the next header
is excluded from its matching text, so inserting a blank line there does not
force semantic re-resolution of the preceding routine. Changes within the
header or non-trailing body still change the checkpoint text and are resolved
again. The dependency-surface check ensures cached routine bindings are reused
only when the catalog's public declarations are unchanged; unresolved names
and other uncertain cases therefore remain on the full-resolution path.

Declaration-surface fingerprints collapse whitespace outside quoted strings
and ignore comment contents. Consequently, whitespace or comment-only edits
inside type and global-variable declarations do not appear as semantic
declaration changes: the edited document is parsed to refresh current ranges,
unchanged dependent documents are reused, and its unchanged routines may use
their rebased checkpoints. Whitespace inside string literals is preserved and
continues to count as a semantic change.

The workspace dependency index can select which **documents** may be affected
by a changed type, global variable, routine, or field. A semantic declaration
change therefore reanalyzes its owner and dependent documents while reusing
unaffected documents. Dependency contributions are currently aggregated per
document, however, so this does not yet isolate individual dependent routines
inside an affected document. Finer-grained invalidation needs per-region
resolved and unresolved dependency records, including routine candidate
compatibility, before it can safely skip those routines.

Two different parity suites are needed:

1. **Legacy behavior parity:** on a fixture corpus, compare the pre-refactor
   parser and current parser for behavior both are expected to share. Review
   each difference as an intentional change, a legacy bug, or a regression.
   This protects compatibility but does not prove that the legacy parser
   covered the whole language.
2. **Incremental/full parity:** after each edit sequence, compare the
   incremental result with a clean full parse of the final source and
   workspace. Focused tests now compare declaration regions, syntax nodes,
   references, diagnostics, and exact ranges for reused body-only routine
   checkpoints, verify signature edits invalidate reuse, and cover both a
   document-prefix shift and a blank line between routines. Further corpus
   coverage should include adding/removing/renaming symbols, previously
   unresolved names becoming resolvable, and incomplete syntax that must
   trigger fallback.

“Full parser coverage” cannot be proven from implementation branches alone
without a normative grammar. The practical standard is a versioned syntax
inventory based on the legacy parser, real `.pop` sources, and user-confirmed
rules, with at least one positive and negative fixture for each production
and important variant. Differential corpus tests then establish compatibility
with known behavior; they do not establish that no undocumented syntax exists.

## Validation status

The current full validation passed TypeScript compilation, all 33 server tests,
and all 156 VS Code integration tests. New coverage checks exact operator spans for
all seven parsed binary operators and both unary signs, links resolved
condition predicates to their calls, distinguishes list declarations, verifies
explicit-type global initialization, and tests statement-level implicit locals.
It also verifies the four recognized special-list access categories and their
element-type navigation, contextual reuse after a body-only edit despite
unrelated diagnostics, distinct AST nodes for type bases, pointer targets,
and explicit scalar factors, all six inferred global literal kinds, explicit
and implicit local declarations, and reference-bearing push instructions.
The refresh tests use synthetic documents and validate invalidation behavior,
not real-workspace performance.

## Summary

The architecture is now centered on a shared syntax + semantic model rather than per-feature ad hoc scans. The main optimization is not a blanket rewrite, but a conservative reuse strategy: parse aggressively when needed, reuse safely when the dependency graph and declaration-surface comparison prove it is safe, and fall back to directory-wide reparsing when changed syntax or public declaration changes make the graph insufficient.
