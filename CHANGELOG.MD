# Changelog

All notable changes to the Português Puro Language Server are documented in this file.

## [Unreleased]

### Improved

- Improved routine-call resolution and symbol lookup.
- Improved workspace analysis and reuse of previously parsed documents.
- Improved handling of routine declarations, parameters, aliases, and overloaded names.
- Improved analysis of large source files and complex routine definitions.
- Improved consistency when resolving references across documents.
- Preserved explicit type names ahead of generated plural aliases while retaining generated plurals as compatibility fallbacks. Computed-field lookup now uses the same argument-type compatibility as routine calls, so a field declared for `listas` can resolve on a type derived from `lista` without changing exact-name precedence.
- Ensured startup workspace indexing falls back to the initialized project root when the client reports no workspace folders, so unopened root-level `.pop` files are cataloged immediately.
- Decoded unopened `.pop` files as UTF-8 when valid, falling back to Windows-1252, so accented symbols remain resolvable in the workspace catalog.
- Warned when UTF-8 `.pop` files are detected and added confirmed client-side conversion to Windows-1252, with explicit choices to remove or replace unrepresentable characters or keep UTF-8.

## [2026-11-17]

### Improved

- Optimized routine-call resolution and name matching.
- Improved reuse of parsed workspace data and cached analysis results.
- Reduced unnecessary workspace invalidation when source files remain unchanged.
- Improved handling of routine names, computed fields, and nested structure accesses.
- Improved performance of repeated language-server requests.

## [2026-11-12]

### Added

- Semantic analysis of type declarations separated from syntactic parsing.
- Selective routine resolution and support for reusing previously analyzed routine regions.
- Dependency tracking for types, variables, routines, and structure fields.
- Differential verification of incremental analysis against complete parsing.
- Conservative fallback to complete analysis when inconsistencies are detected.

### Improved

- Improved workspace invalidation and dependency tracking.
- Improved handling of cross-document references.
- Improved document symbol generation and caching.
- Improved analysis of large files and complex declarations.

## [2026-11-11]

### Added

- Incremental semantic analysis infrastructure.
- Selective reuse of previously analyzed type and global-variable declarations.
- Routine analysis checkpoints and selective routine resolution.
- Profiling support for parsing, semantic analysis, workspace updates, invalidation, memory usage, and LSP request timings.

### Improved

- Improved parser architecture by separating syntax analysis from semantic resolution.
- Improved dependency tracking to avoid unnecessary reanalysis.
- Added validation and fallback mechanisms to ensure incremental analysis remains consistent with complete analysis.

## [2026-11-06]

### Added

- Support for additional scalar types.
- Improved recognition of pointer and scalar type declarations.

## [2026-11-05]

### Added

- Support for local variables and multiple local declarations.
- Improved handling of routine arguments and parameters.
- Support for additional plural forms in identifiers and declarations.
- Support for fractions in scalar type declarations.

### Improved

- Improved structure