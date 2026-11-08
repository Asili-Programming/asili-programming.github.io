+++
title = "Install Pata"
description = "How to build Pata from source on Linux, macOS and Windows."
template = "page.html"
slug = "install"
+++

Pata is built from source for now. Binary packages have not been released yet.

## Requirements

- Rust, through [rustup](https://rustup.rs/).
- Git, to download the source.

## Build Pata

Open a terminal and run these commands. They are the same on Linux, macOS and Windows (PowerShell).

```
git clone https://github.com/Asili-Programming/Asili.git
cd Asili
cargo build --release -p pata-cli
```

The `pata` binary is in `target/release/` (`target\release\pata.exe` on Windows). Add that folder to your `PATH` if you want.

## Try your first program

```
cd examples/asi_sample
cargo run -p pata-cli -- jenga --tenda
```

If it works, you see the output of `jumla(2, 3)`. When you are ready to write your own program, the [language tour](https://github.com/Asili-Programming/Asili/wiki/Language-Tour) explains the basic keywords.

## In the browser

You do not need to install anything to try Asili. The [browser playground](https://github.com/Asili-Programming/asili-playground) runs the sample programs directly in your browser.
