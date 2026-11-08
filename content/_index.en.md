+++
title = "Asili"
description = "Asili is a programming language that uses Swahili. Pata is its toolchain."
template = "index.html"
+++

<section class="hero">

<p class="eyebrow">Asili · A programming language</p>

# Write programs in Swahili.

Asili is a programming language whose keywords and standard library are in Swahili. <strong>Pata</strong> is its toolchain: compiler, runner, formatter (<em>nadhifu</em>), linter and language server (<em>mwalimu</em>).

<p class="cta">
<a class="btn primary" href="https://github.com/Asili-Programming/Asili/wiki/Getting-Started">Get started</a>
<a class="btn ghost" href="/playground/">Browser playground</a>
</p>

</section>

## A first program

The entry point is `kuu`. `weka` declares a value, and `chapisha` prints it.

```asili
leta hisabati

kazi kuu(hoja: Orodha<Neno>) -> Tupu {
  weka j = jumla(2, 3)
  chapisha("jumla(2, 3) = " + (j kama Neno))
}
```

`kazi` (function), `weka` (let), `ikiwa` (if), `linganisha` (match), `rejesha` (return), `leta` (import a module).

[More sample programs (karibu, sifa, makosa) →](/playground/)

## Why Asili?

- **Swahili keywords.** Code reads in Swahili from the first word, and library names are Swahili too.
- **No `null`, no hidden exceptions.** A value that may be missing is `Chaguo<T>`. An error comes back as `Tokeo<T, E>`, so it shows in the function's type.
- **Native code only.** Programs compile to machine code (x86-64, AArch64) or a wasm module for the browser. There is no interpreter.

## Speed

On the Sudoku benchmark (solving one puzzle by backtracking, 90,665 attempts), Asili runs close to C built with clang -O2.

| Implementation | Time |
| --- | --- |
| C (clang -O2) | 6.5 ms |
| Rust (-O) | 6.8 ms |
| Asili (nguvu, native) | 7.2 ms |
| C (gcc -O2) | 8.1 ms |
| Python 3 | 302 ms |

Whole-process time on one core, including about 3.3 ms of process start-up. These are typical results, not guarantees. They come from [examples/sudoku](https://github.com/Asili-Programming/Asili/tree/main/examples/sudoku).

## Supported targets

- **x86-64 and AArch64**: native code through `pata jenga`.
- **Browser (wasm)**: a wasm module that runs the browser playground.
- **Cortex-M**: `strict` code for `pata jenga --lengo cortex-m`.

## Standard library

- `msingi`: basic types and constructors (no `leta` needed)
- `hisabati`: arithmetic, trigonometry, logarithms and random numbers
- `mfumo`: environment, JSON, networking (TCP, TLS, HTTP) and signals
- `majira`: time, dates and durations (UTC)
- `matumizi`: reading and writing the terminal
- `faili`: reading and writing files, directories and paths
- `sambamba`: threads, async tasks, message channels and locks
- `usimbaji`: base64, hex, hashes and identifiers
- `ruwaza`: regular expressions (Unicode)
- `runtime`: information about the runtime and the host system
- `syscall`: direct calls to the kernel
- `kasha_gc`: shared values with reference counting (optional)

[Full standard library reference →](https://github.com/Asili-Programming/Asili/wiki/Standard-Library)

## Pata, the Asili toolchain

- `pata jenga`: builds native code. `pata jenga --tenda` builds and runs.
- `nadhifu`: formats your code in one consistent style.
- `mwalimu`: the language server: completion, diagnostics and go-to-definition in editors.

[CLI reference →](https://github.com/Asili-Programming/Asili/wiki/CLI-Reference)

## For teachers

Short sample programs that fit one lesson are in the playground: `karibu` (a first message), `sifa` (structs and methods) and `makosa` (errors and how to handle them). Every student can open the browser playground and run code without installing anything.

## Project status

Asili is at version **0.6.0** and still young. There are no binary packages yet; [install by building from source](/en/install/).

[Changes (CHANGELOG) →](https://github.com/Asili-Programming/Asili/blob/main/CHANGELOG.md) · [What is done →](https://github.com/Asili-Programming/Asili/blob/main/docs/design/implementation-status.md)

## Contribute

Asili is open source. Bug reports, examples and pull requests are welcome. Read [CONTRIBUTING.md](https://github.com/Asili-Programming/Asili/blob/main/CONTRIBUTING.md) before you start, and the [code of conduct](https://github.com/Asili-Programming/Asili/blob/main/CODE_OF_CONDUCT.md) that applies to everyone in the project.

- [Good first issues →](https://github.com/Asili-Programming/Asili/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- [Open an issue →](https://github.com/Asili-Programming/Asili/issues)
- [Read the specification →](https://github.com/Asili-Programming/Asili/tree/main/docs/spec)
