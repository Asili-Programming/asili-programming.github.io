+++
title = "Asili"
description = "Asili ni lugha ya programu inayotumia Kiswahili. Pata ni zana yake."
template = "index.html"
+++

<section class="hero-stage" data-hero>
<picture class="hero-art"><source type="image/webp" srcset="/hero-banner-900.webp 900w, /hero-banner-1200.webp 1200w" sizes="100vw"><img src="/hero-banner-1200.webp" width="1200" height="538" alt="" fetchpriority="high"></picture>
<canvas class="hero-particles" aria-hidden="true"></canvas>
<div class="hero-copy">
<p class="eyebrow">Asili · Lugha ya programu</p>
<h1>Andika programu kwa Kiswahili.</h1>
<p class="lede">Asili ni lugha ya programu inayotumia Kiswahili kwa maneno yake ya msingi na maktaba yake ya kawaida. <strong>Pata</strong> ni zana yake: kikusanyaji, kiendeshi, nadhifu (kipangaji cha msimbo), kikagua msimbo na mwalimu (seva ya LSP kwa wahariri).</p>
<p class="cta"><a class="btn primary" href="https://github.com/Asili-Programming/Asili/wiki/Getting-Started">Anza sasa</a> <a class="btn ghost" href="/playground/">Uwanja wa kivinjari</a></p>
</div>
</section>

## Programu ya kwanza

Kiingilio cha programu ni `kuu`. `weka` hutangaza thamani, na `chapisha` huichapisha.

```asili
leta hisabati

kazi kuu(hoja: Orodha<Neno>) -> Tupu {
  weka j = jumla(2, 3)
  chapisha("jumla(2, 3) = " + (j kama Neno))
}
```

`kazi` (kazi), `weka` (tangaza thamani), `ikiwa` (sharti), `linganisha` (linganisha thamani), `rejesha` (rudisha matokeo), `leta` (ingiza moduli).

[Programu zaidi za mfano (karibu, sifa, makosa) →](/playground/)

## Kwa nini Asili?

- **Maneno ya Kiswahili.** Msimbo unasomeka kwa Kiswahili tangu neno la kwanza, na majina ya maktaba ni ya Kiswahili pia.
- **Hakuna `null` wala makosa yaliyofichwa.** Thamani inayoweza kukosekana ni `Chaguo<T>`. Kosa linarudishwa kama `Tokeo<T, E>`, kwa hiyo unaliona kwenye aina ya kazi.
- **Msimbo asilia tu.** Programu hukusanywa kuwa msimbo wa mashine (x86-64, AArch64) au moduli ya wasm kwa kivinjari. Hakuna mkalimani.

## Kasi

Kwenye benchmark ya Sudoku (kutatua fumbo moja kwa kurudi nyuma, majaribio 90,665), Asili huendesha karibu kasi sawa na C iliyokusanywa kwa clang -O2.

| Utekelezaji | Muda |
| --- | --- |
| C (clang -O2) | 6.5 ms |
| Rust (-O) | 6.8 ms |
| Asili (nguvu, msimbo asilia) | 7.2 ms |
| C (gcc -O2) | 8.1 ms |
| Python 3 | 302 ms |

Muda wa mchakato mzima kwenye core moja, pamoja na takriban 3.3 ms za kuanzisha mchakato. Nambari hizi ni za kawaida, si ahadi. Zinatoka kwenye [examples/sudoku](https://github.com/Asili-Programming/Asili/tree/main/examples/sudoku).

## Majukwaa yanayoungwa mkono

- **x86-64 na AArch64**: msimbo asilia kupitia `pata jenga`.
- **Kivinjari (wasm)**: moduli ya wasm inayoendesha uwanja wa kivinjari.
- **Cortex-M**: msimbo wa `strict` kwa `pata jenga --lengo cortex-m`.

## Maktaba ya kawaida

- `msingi`: aina na viunda vya msingi (bila `leta`)
- `hisabati`: hesabu, trigonometria, logi na namba za nasibu
- `mfumo`: mazingira, JSON, mtandao (TCP, TLS, HTTP) na ishara
- `majira`: saa, tarehe na muda (UTC)
- `matumizi`: kuandika na kusoma kwenye skrini
- `faili`: kusoma na kuandika faili, saraka na njia
- `sambamba`: nyuzi, kazi sawia, njia za ujumbe na kufuli
- `usimbaji`: base64, hex, hashi na vitambulisho
- `ruwaza`: misemo ya kawaida (Unicode)
- `runtime`: habari za kitekelezi na mfumo kinachoendeshwa
- `syscall`: wito wa moja kwa moja kwa kernel
- `kasha_gc`: thamani inayoshirikiwa kwa kuhesabu marejeo (si ya lazima)

[Maelezo kamili ya maktaba →](https://github.com/Asili-Programming/Asili/wiki/Standard-Library)

## Pata, zana ya Asili

- `pata jenga`: hujenga msimbo wa mashine. `pata jenga --tenda` huendesha mara moja.
- `nadhifu`: hupanga msimbo wako kwa mtindo mmoja.
- `mwalimu`: seva ya LSP inayoleta kukamilisha maneno, makosa na kuruka kwenye ufafanuzi kwenye wahariri.

[Marejeo ya amri →](https://github.com/Asili-Programming/Asili/wiki/CLI-Reference)

## Kwa walimu

Programu fupi za mfano zinazofaa somo moja ziko kwenye uwanja: `karibu` (ujumbe wa kwanza), `sifa` (sifa na mbinu) na `makosa` (makosa na jinsi ya kuyashughulikia). Kila mwanafunzi anaweza kufungua uwanja wa kivinjari na kuendesha msimbo bila kusakinisha chochote.

## Hali ya mradi

Asili iko katika toleo **0.6.0**, bado changa. Hakuna vifurushi vya binary bado; [sakinisha kwa kujenga kutoka chanzo](/sakinisha/).

[Mabadiliko (CHANGELOG) →](https://github.com/Asili-Programming/Asili/blob/main/CHANGELOG.md) · [Kilichokamilika →](https://github.com/Asili-Programming/Asili/blob/main/docs/design/implementation-status.md)

## Shiriki

Asili ni chanzo wazi. Ripoti za hitilafu, mifano na maombi ya kuvuta (pull requests) yanakaribishwa. Soma [CONTRIBUTING.md](https://github.com/Asili-Programming/Asili/blob/main/CONTRIBUTING.md) kabla ya kuanza, na [kanuni za maadili](https://github.com/Asili-Programming/Asili/blob/main/CODE_OF_CONDUCT.md) zinazomhusu kila mtu katika mradi.

- [Kazi rahisi za kuanzia (good first issue) →](https://github.com/Asili-Programming/Asili/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- [Fungua tatizo jipya →](https://github.com/Asili-Programming/Asili/issues)
- [Kiwango cha lugha (spec) →](https://github.com/Asili-Programming/Asili/tree/main/docs/spec)
