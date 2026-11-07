# Asili website — Design Brief

As of 7 November 2026 · Victor Kaiuki

The site should look like the logo: a tree whose roots are circuit traces, olive canopy over copper
roots on warm paper. The live landing page uses a teal and orange palette that does not match the
brand; this brief replaces it.

## Brand and positioning

Asili means origin or nature, and the logo draws it literally: a tree (nature, growth) whose roots
turn into circuit traces (code), with hexagon nodes in the canopy. The site should feel rooted and
warm, closer to a well-made textbook than to a startup landing page.

- **One line:** *Asili ni lugha ya programu inayotumia Kiswahili.* (Asili is a programming language
  that uses Swahili.) Confirm the wording in native-speaker review.
- **Feel:** calm, confident, generous with space. Earth tones, not neon. Code shown big and
  readable, because the code is the product.
- **Not:** tech-bro gradients, dark-mode-only hacker styling, stock photos of people at laptops,
  African clichés (savannah sunsets, kente borders as decoration).
- **Existing assets:** `assets/Asili_Logo.png` (colour, off-white ground) and
  `assets/Asili_Banner.png` (monochrome metal on black, Asili keywords as background texture) in the
  Asili repo. Both are raster only; a vector logo is the first deliverable.

## Voice and copy

Write Swahili first, in the register the compiler's own messages use: direct, polite, plain. English
is a translation of the Swahili, never the source.

- Sentences under 20 words; one idea each.
- Name things by what they do: "Endesha" (Run), not "Anza safari yako" (Start your journey).
- Keywords stay in code formatting and are never translated: `kazi`, `weka`, `ikiwa`.
- Numbers over adjectives: "as fast as C on the Sudoku benchmark", not "blazingly fast".
- No exclamation marks, no emoji.

Interface strings (drafts for native-speaker review):

| Where | Swahili | English |
| --- | --- | --- |
| Hero button | Iendeshe | Run it |
| Playground button | Endesha | Run |
| Playground button | Simamisha | Stop |
| Next step | Jifunze zaidi | Learn more |
| Next step | Sakinisha Pata | Install Pata |
| Language switch | English | Kiswahili |
| 404 heading | Ukurasa haupatikani | Page not found |
| Loading | Inapakia… | Loading… |

## Colour

Four colours come straight from the logo (sampled from `Asili_Logo.png`); olive carries links and
buttons, copper is decoration only because it fails contrast as text. Every text pairing below passes
WCAG AA (4.5:1) and was measured, light theme against `paper`, dark theme against `paper` dark.

| Token | Light | Dark | Use | Contrast light / dark |
| --- | --- | --- | --- | --- |
| `paper` | #f0f0ed | #161712 | Page background (logo ground) | — |
| `ink` | #2a2a26 | #ecebe4 | Body text, headings (wordmark) | 12.6 / 15.1 |
| `muted` | #5e5d55 | #a8a69c | Secondary text, captions | 5.8 / 7.4 |
| `olive` | #485028 | #a9bb72 | Links, primary button fill, focus ring (canopy) | 7.5 / 8.6 |
| `copper` | #d09860 | #e0aa74 | Lines, root motif, borders; never text on light (2.2:1) | decoration only / 8.7 |
| `copper-text` | #8a5a2e | #e0aa74 | Small accents that must be read, such as an eyebrow label | 5.1 / 8.7 |

White text on an `olive` button measures 8.6:1. Dark theme follows `prefers-color-scheme`, with a
manual override saved per visitor.

## Typography

One self-hosted web font for headings, system fonts for everything else, within a 30 KB font budget
so the home page stays under 100 KB (NFR-1).

| Role | Family | Size, line height | Notes |
| --- | --- | --- | --- |
| Headings | One geometric sans echoing the wordmark (candidates: Outfit, Lexend), one weight, Latin subset, WOFF2 | 40 / 28 / 22 px, 1.2 | Self-hosted, `font-display: swap`; designer picks the family |
| Body | System UI stack (`system-ui, -apple-system, Segoe UI, Roboto, sans-serif`) | 18 px, 1.6 | No download; reads well on Android, the main phone platform |
| Code | System monospace stack (`ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`) | 16 px, 1.5 | Same stack in the playground editor |

- Line length 60 to 75 characters. Swahili words run long (*haupatikani*, *inayotumia*), so never set
  body text in narrow columns or justified.
- Do not rely on `hyphens: auto` for Swahili: browser hyphenation dictionaries for it are not
  dependable.
- The wordmark is part of the logo artwork, never typeset in a web font.

## Home page layout

Home leads with real code and one button into the playground.

```text
1 HEADER     (o) Asili  Jifunze · Uwanja · Sakinisha · Nyaraka  English
             -> Same header on every page; folds into a menu below 640 px

2 HERO       Andika programu kwa Kiswahili.
             Lugha ya programu inayotumia Kiswahili, na zana zake, Pata.
             [ Iendeshe ]   ( Sakinisha Pata )
             +------------------------------------------------+
             |  real program, built in CI                     |
             +------------------------------------------------+
             -> Code is the largest element; Iendeshe opens it in /playground/

3 CLAIMS     [ Kiswahili     ]  [ Msimbo asilia    ]  [ Kasi ya C      ]
             [ maneno yote   ]  [ hakuna mkalimani ]  [ dhidi ya clang ]
             -> Each claim links to its proof: wiki, spec, benchmark

4 LEARN      Jifunze kwa hatua sita   ( ) ( ) ( ) ( ) ( ) ( )
             -> Six concepts, each with a link to Learn and the playground

5 CONTRIBUTE Changia: Asili, asili-vscode, asili-playground, tovuti hii
             -> Where Journey 3 starts (see App Flow)

6 FOOTER     Spec · API · Changia · Maadili · Usalama · Leseni
             -> Secondary links only
```

On a phone the bands stack in the same order; the three claims become a single column. `Iendeshe` is
the only filled button on the page, so there is one obvious next step.

## Imagery and motion

The only imagery is the brand's own: the circuit-root line work and real Asili code. No photographs,
no illustrations of people, no stock icons beyond a small line-icon set.

- **Root lines.** Thin copper traces, taken from the logo's roots, used as section dividers and as
  the edge of the hero. SVG, inline, under 2 KB each.
- **Keyword texture.** The banner's faded keywords (`weka`, `ikiwa`, `rejesha`, `kazi`) may sit
  behind the hero at very low contrast (decoration, `aria-hidden`), never behind body text.
- **Code as hero.** The hero's largest element is a real program in a code block, built in CI so it
  always compiles (NFR-9).
- **Motion.** Only state changes: a button press, the playground's run indicator, a menu opening;
  150 to 200 ms. Nothing moves on scroll. Under `prefers-reduced-motion: reduce`, all transitions are
  off.
- **Icons.** One open-licence line set, inlined as SVG, only where a word alone is ambiguous
  (outward link, GitHub, menu).

## Deliverables and review

Design hands over files the Zola templates can use directly, then the site passes four reviews
before launch.

**Deliverables**

- [ ] Vector logo (SVG): full colour, one-colour olive, one-colour white; mark without the wordmark
  for the favicon and the header.
- [ ] Favicon set from the mark: `favicon.svg`, 32 px PNG, 180 px Apple touch icon.
- [ ] Social preview image, 1200 × 630, one per language.
- [ ] Root-line SVG dividers (two or three variants).
- [ ] Desktop and 375 px mobile layouts for Home, Learn, Install, Playground header and 404, light
  and dark.
- [ ] Colour and type tokens as one CSS file (`static/tokens.css`).

**Reviews before launch**

- [ ] Native Swahili speaker reads every Swahili page and string.
- [ ] Contrast spot-check of the built pages in both themes (all text at 4.5:1 or more).
- [ ] Keyboard-only pass: every control reachable, focus always visible.
- [ ] Phone test on a mid-range Android device over throttled 3G (NFR-1, NFR-2).
