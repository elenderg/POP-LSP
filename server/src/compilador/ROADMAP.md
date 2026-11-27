# Roadmap: Linux x86

## Status

Linux x86 is **not an implemented compiler target yet**. The command-line
dispatcher still reports that the target is unimplemented, and the active
linker still builds PE output. No ELF has been generated or executed by this
compiler.

`linux x86.pop` currently defines ELF32 record types, fixed ELF constants,
initializers, relocation helpers, an external-call helper for i386 `cdecl`, and
initial PLT/GOT encoding primitives. Those primitives are not yet called by the
compiler pipeline and do not constitute a complete executable writer.

## Current architecture and constraints

- The current code generator emits x86 instructions and contains Windows-specific
  external-call behavior. Linux external calls must use `call rel32` to a PLT
  entry and caller-side stack cleanup under the i386 System V ABI.
- Linux i386 C functions receive arguments on the stack, right to left; the
  caller restores the stack. The first implementation should use integer and
  pointer arguments only and explicitly reject unsupported ABI cases.
- Traditional i386 Linux syscalls use `int 0x80`, with the syscall number in
  EAX, arguments in EBX/ECX/EDX/ESI/EDI/EBP, and the result in EAX.
- ELF32 structures use 32-bit little-endian fields. File offsets, virtual
  addresses, and relative displacements must remain distinct throughout layout
  and relocation.
- A dynamically linked i386 executable commonly uses
  `/lib/ld-linux.so.2` as `PT_INTERP` and depends on 32-bit system libraries.
  The interpreter path and actual dependencies must be verified on each target
  distribution.
- The source loader currently loads `.pop` files without filtering them by
  target. The Windows-oriented standard library declares many Windows APIs;
  those imports cannot be emitted for Linux. Target-specific source selection
  or a Linux runtime/library is a prerequisite.
- The current ELF helpers assume a fixed-address, non-PIE `ET_EXEC` when
  embedding absolute addresses in PLT instructions. PIE/ASLR requires a
  separate position-independent layout and relocation policy.

## Implementation roadmap

### 1. Preserve and test the existing x86/PE path

- Record a known-good Windows x86 build and execution test before changing
  shared code.
- Keep PE layout, import generation, calling convention, and output naming
  unchanged while introducing Linux-specific routines.
- Add target-specific validation so a Linux build cannot accidentally pass
  through the PE linker.

**Exit criteria:** Windows x86 still builds and runs; Linux selection cannot
silently produce a PE file.

### 2. Establish an ELF32 layout model

- Define and verify `Elf32_Ehdr`, `Elf32_Phdr`, `Elf32_Shdr`, `Elf32_Dyn`,
  `Elf32_Sym`, and `Elf32_Rel` sizes and field offsets.
- Add an explicit layout calculation for the ELF header, program-header table,
  loadable segments, interpreter string, dynamic metadata, code, data, and
  optional section table.
- Distinguish file offsets, virtual addresses, RVAs, and `rel32` values in
  names and helpers; validate every conversion and alignment.
- Build an initial fixed-address `ET_EXEC` with a single loadable segment and a
  minimal entry point before adding imports.

**Exit criteria:** `readelf -h -l` accepts the file and reports ELF32, little
endian, `EM_386`, the intended entry point, and valid `PT_LOAD` mappings.

### 3. Add a minimal Linux entry/runtime

- Add a Linux-specific startup routine that follows the process-entry stack
  contract rather than the Windows startup convention.
- Initially support a tiny freestanding runtime using Linux syscalls, including
  process exit and the minimum output/memory operations needed by test programs.
- Keep unsupported Windows APIs unavailable on this target and report a clear
  link-time diagnostic for unresolved or incompatible imports.
- Add target-specific standard-library selection; do not make Windows wrappers
  resolve to fake Linux functions.

**Exit criteria:** simple programs with constants, arithmetic, branches,
loops, internal calls, and process exit run under WSL/Linux without libc.

### 4. Integrate ELF code generation and relocation

- Route Linux x86 through a dedicated linker/emitter while reusing only
  architecture-independent parsing and semantic analysis.
- Emit all supported fragments with exact size accounting and patch relative
  branch/call displacements after final layout.
- Map imported symbols to PLT entries; ensure the external-call path emits
  `E8 rel32` to the PLT and applies caller cleanup exactly once.
- Add relocation records for each imported symbol and verify
  `r_info = (symbol_index << 8) | relocation_type`.
- Keep the initial image non-PIE with an explicit fixed base; reject any
  unsupported absolute relocation rather than emitting a corrupt image.

**Exit criteria:** a generated static ELF executes, internal calls and branches
land at the expected instructions, and emitted bytes match an independent
disassembler.

### 5. Implement dynamic linking (PLT/GOT)

- Build `.interp`, `.dynamic`, `.dynsym`, `.dynstr`, SysV `.hash`,
  `.rel.plt`, `.plt`, and `.got.plt`; include the terminating entries and
  correctly sized/aligned records.
- Emit `PT_INTERP`, `PT_DYNAMIC`, and suitable `PT_LOAD` segments. Populate
  `DT_NEEDED`, `DT_PLTGOT`, `DT_HASH`, `DT_STRTAB`, `DT_SYMTAB`, `DT_STRSZ`,
  `DT_SYMENT`, `DT_PLTRELSZ`, `DT_PLTREL`, and `DT_JMPREL`.
- Use `R_386_JMP_SLOT` for imported functions and verify the lazy-binding PLT
  protocol against the chosen Linux dynamic loader. Alternatively, implement
  and test eager binding explicitly.
- Include only actually referenced imports. Do not copy the full Windows DLL
  import catalog into ELF metadata.
- Decide whether to support non-PIE only initially or also implement PIE with
  `R_386_RELATIVE` and position-independent PLT/GOT sequences.

**Exit criteria:** `readelf -d -r -s` reports coherent dynamic metadata and
relocations; the dynamic loader resolves a controlled libc import and the
program executes.

### 6. Port the runtime and standard library

- Inventory OS-facing operations used by the compiler and library: file I/O,
  directories, memory allocation, console output, process startup/exit, and
  errors.
- Provide Linux implementations or a deliberate unsupported-operation
  diagnostic for each one.
- Adapt signatures and structure layouts to Linux; do not reuse Windows
  `HANDLE`, `DWORD`, window, or message-loop semantics.
- Keep GUI, Win32, COM, GDI, WinHTTP, and similar APIs out of the Linux target
  until an actual compatible implementation exists.

**Exit criteria:** selected standard-library routines work on Linux and no
Windows DLL names or Windows-only ABI assumptions remain in the emitted ELF.

### 7. Validate and expand coverage

- Test both static and dynamically linked outputs with `file`, `readelf`, and
  `objdump`, then execute them under WSL and a native 32-bit Linux environment.
- Cover arithmetic, signed division/comparisons, loops, internal calls,
  returns, by-reference parameters, globals/locals, structures, memory access,
  syscalls, and imported calls with more than one argument.
- Verify stack balance, caller cleanup, entry/exit status, segment permissions,
  address truncation, and dynamic-loader diagnostics.
- Re-run the Windows x86 baseline after each shared-code change.

**Exit criteria:** documented tests pass for both the existing PE32 backend and
the Linux ELF32 backend; ELF inspection and runtime execution both succeed.

## Static linking and AppImage

Static linking is **not a prerequisite for producing a usable Linux executable**.
The simplest first runtime is a small freestanding ELF using Linux syscalls;
it has no shared-library dependency, but each required runtime operation must
be implemented. A dynamically linked libc runtime is also viable, provided the
target system has the i386 loader and compatible 32-bit libraries installed.
Static glibc can reduce runtime dependencies but has portability caveats and
does not replace the compiler's Linux runtime.

AppImage is an optional distribution format, not an executable format or a
compiler backend. Consider it only after ELF generation and runtime behavior
are stable. It cannot provide kernel support for 32-bit execution, and bundling
the i386 loader and libraries needs separate compatibility and licensing
review.

## Current implementation boundary

Implemented in `linux x86.pop`: ELF32 record definitions and initializers,
basic ELF constants, `r_info` calculation, an i386 `cdecl` call/cleanup helper,
and fixed-address PLT0/PLT entry byte templates.

Not implemented: ELF file layout/writing, Linux startup/runtime, target-specific
source selection, complete dynamic tables, final-address assignment, actual
relocation application, pipeline integration, executable permission handling,
or an ELF runtime test. The Linux target must remain marked unimplemented until
the relevant exit criteria above pass.
