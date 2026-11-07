# Asili website — Product Requirements Document

As of 7 November 2026 · Victor Kaiuki

asili-programming.github.io becomes the front door to Asili: one place where a newcomer learns what
the language is, runs a first program in the browser, installs Pata, and finds the docs, without
reading a GitHub README first.

## Problem and goals

Today a newcomer has to piece Asili together from five places: the Asili README, a 29-page GitHub
wiki, the spec in `docs/spec/`, the VS Code extension repo, and a playground that is not hosted
anywhere. The site at asili-programming.github.io is a single static landing page that links out to
these, and two of its links lead nowhere yet: the API reference at `/Asili/` returns 404, and there
is no way to run code without building from source.

The site must deliver three outcomes:

1. **Understand in one minute.** A visitor can say what Asili is, who it is for, and what a program
   looks like, from the home page alone.
2. **Run code in the browser.** A visitor can edit and run an Asili program on the site, with no
   install, using the existing wasm build.
3. **Find the next step.** A visitor who wants more reaches installation, the language tour, the
   standard library reference or the contribution guide in at most two clicks from the home page.

## Audiences

The primary audience is Swahili-speaking learners; developers evaluating the language and
contributors follow.

| Audience | Arrives from | Needs from the site | Success looks like |
| --- | --- | --- | --- |
| Swahili-speaking learner (student, teacher, first-time programmer) | A class, social media, word of mouth | Content in Swahili, a program running in seconds, no install | Runs and edits a sample in the playground |
| Curious developer | GitHub, Hacker News, a conference talk | What makes Asili different, a code sample, performance claims with numbers | Reads the language tour or installs Pata |
| Educator | A colleague, a search for programming in Swahili | Lesson-sized examples, a stable link to share with a class | Shares a playground link that opens with their code |
| Contributor | The GitHub org | Architecture, build steps, where to start, API reference | Opens an issue or a pull request |
| Embedded or systems developer | The C-speed and Cortex-M claims | Benchmark numbers, supported targets | Reads the benchmark page and the target list |

## Scope

v1 is a small static site with five pages and the playground; docs stay where they are and the site
links to them.

**v1 (in scope)**

- Home page: what Asili is, a code sample, links to the next steps (replaces today's single page).
- Playground hosted on the site at `/playground/` (self-hostable with Asili's own static server),
  built from `asili-playground` and the `asili-wasm` build.
- Install page: build Pata from source today; binary downloads once releases exist.
- Learn page: a short tour that links into the wiki and the spec.
- Swahili and English versions of every page.
- Working links to the API references at `/Asili/` (rustdoc) and `/asili-vscode/` (TypeDoc).

**v2 (later)**

- Docs hosted on the site, generated from `docs/` and the wiki instead of linked.
- Shareable playground links that carry the code in the URL.
- Blog or release notes page fed from `CHANGELOG.md`.
- Benchmark page with the Sudoku numbers against C.

**Out of scope**

- Accounts, logins or any server-side code: GitHub Pages serves static files only.
- A package registry front end.
- Running code on a server: every program runs in the visitor's browser.

## Functional requirements

Thirteen requirements: nine ship in v1, four wait for v2. IDs are referenced by the technical
requirements and the implementation plan.

| ID | Requirement | Priority | Release |
| --- | --- | --- | --- |
| FR-1 | Home page states what Asili is in one sentence and shows a runnable code sample | Must | v1 |
| FR-2 | Every page has the same navigation: Learn, Playground, Install, Docs, GitHub | Must | v1 |
| FR-3 | Playground edits and runs Asili in the browser and shows output and diagnostics | Must | v1 |
| FR-4 | Playground offers the sample programs (karibu, sifa, makosa) from a picker | Must | v1 |
| FR-5 | Install page gives build-from-source steps for Linux, macOS and Windows | Must | v1 |
| FR-6 | Every page exists in Swahili and English; a switch changes language and the choice is remembered | Must | v1 |
| FR-7 | API reference links resolve: rustdoc at `/Asili/` and TypeDoc at `/asili-vscode/` | Must | v1 |
| FR-8 | Learn page gives a short tour of six concepts, each linking to its wiki page | Should | v1 |
| FR-9 | A 404 page in both languages points back to Home | Should | v1 |
| FR-10 | Playground links carry the program in the URL so a teacher can share it | Could | v2 |
| FR-11 | Docs from `docs/` and the wiki are rendered on the site, not only linked | Could | v2 |
| FR-12 | Release notes page built from `CHANGELOG.md` | Could | v2 |
| FR-13 | Benchmark page shows the Sudoku numbers against clang -O2 C | Could | v2 |

## Non-functional requirements

The site must be fast on a mid-range phone over a 3G connection, because that is how many of the
primary audience will reach it.

| ID | Area | Requirement |
| --- | --- | --- |
| NFR-1 | Performance | Home page under 100 KB transferred and Largest Contentful Paint under 2.5 s on a throttled 3G profile |
| NFR-2 | Performance | Playground interactive within 5 s on 3G; the wasm module loads only on the playground page |
| NFR-3 | Accessibility | WCAG 2.2 AA: contrast, keyboard navigation, focus states, alt text, `lang` set per page |
| NFR-4 | Language | Swahili text follows the project's existing conventions (the `swahili-docs-and-errors` vocabulary), not machine translation |
| NFR-5 | Hosting | Static files only, served by GitHub Pages; no server, no database |
| NFR-6 | Privacy | No third-party trackers or cookies; code typed in the playground never leaves the browser |
| NFR-7 | Compatibility | Last two versions of Chrome, Firefox, Safari and Edge, plus Chrome on Android 10 and later |
| NFR-8 | Maintainability | A maintainer can change page text without a JavaScript toolchain; the build, if any, runs in GitHub Actions |
| NFR-9 | Consistency | Code samples on the site compile with the current `pata`; CI fails when one does not |

## Success metrics

With no trackers (NFR-6), the metrics come from GitHub's own data and from checks in CI. Targets are
for 90 days after v1 launches.

| Metric | Source | Target |
| --- | --- | --- |
| Visitors referred from the site to the Asili repo | GitHub repo Insights, Traffic, referring sites | Site is a top-3 referrer |
| Playground runs that succeed | Not measurable without analytics (none at launch, by decision) | Revisit after 90 days |
| Broken links on the site | Link checker in CI | 0 |
| Code samples that fail to compile | Sample check in CI (NFR-9) | 0 |
| Lighthouse scores, home and playground | Lighthouse CI on every pull request | Performance at least 90, Accessibility at least 95 |
| Issues opened that cite the site or playground | GitHub issues with the `website` label | Tracked, no target |

## Open questions

Decided on 7 November 2026: the primary audience is Swahili-speaking learners; Swahili is the
default at `/`, with English at `/en/`; the site launches with no analytics. Still open:

- [ ] When will Pata ship binary releases? The install page can only say "build from source" until
  then.
- [ ] Should the rustdoc deploy (`/Asili/`, 404 today) run from `develop` as well as `main`, so the
  link works before the next release?
- [ ] Custom domain (for example asili.dev) now, or stay on asili-programming.github.io?
