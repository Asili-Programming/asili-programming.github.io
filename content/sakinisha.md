+++
title = "Sakinisha Pata"
description = "Jinsi ya kujenga Pata kutoka chanzo, kwa Linux, macOS na Windows."
template = "page.html"
+++

Pata hujengwa kutoka chanzo kwa sasa. Vifurushi vya binary bado havijatolewa.

## Mahitaji

- Rust, kupitia [rustup](https://rustup.rs/).
- Git, kupakua chanzo.

## Jenga Pata

Fungua terminal, kisha endesha amri hizi. Ni zile zile kwenye Linux, macOS na Windows (PowerShell).

```bash
git clone https://github.com/Asili-Programming/Asili.git
cd Asili
cargo build --release -p pata-cli
```

Binary ya `pata` iko kwenye `target/release/` (`target\release\pata.exe` kwenye Windows). Ongeza folda hiyo kwenye `PATH` yako ukipenda.

## Jaribu programu ya kwanza

```bash
cd examples/asi_sample
cargo run -p pata-cli -- jenga --tenda
```

Ikifanikiwa, utaona matokeo ya `jumla(2, 3)`. Ukiwa tayari kuandika programu yako, [mwongozo wa lugha](https://github.com/Asili-Programming/Asili/wiki/Language-Tour) unaeleza maneno ya msingi.

## Kwenye kivinjari

Hutahitaji kusakinisha chochote ili kujaribu. [Uwanja wa kivinjari](/playground/) unaendesha programu za mfano moja kwa moja kwenye kivinjari chako.
