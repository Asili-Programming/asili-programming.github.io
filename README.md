# asili-programming.github.io

The website for Asili at <https://asili-programming.github.io>. It is built with
[Zola](https://www.getzola.org/) and deployed by `.github/workflows/site.yml`.

## Layout

- `config.toml`: site settings and the interface strings, one table per language. Templates read
  strings with `trans(key=..., lang=lang)`; no string lives in a template.
- `content/`: pages in Markdown. Every page has two files: `page.md` (Swahili, the default at `/`)
  and `page.en.md` (English, under `/en/`).
- `templates/`: Tera layouts (`base.html`, `index.html`, `page.html`, `404.html`).
- `static/`: copied to the site root as is: `tokens.css` (colours, from the design brief),
  `site.css`, `site.js` (the language switch) and `favicon.svg`.
- `scripts/check_site.py`: quality gates Zola does not cover. `sources` checks that every page has
  its twin and that no folder is named after another repo; `build` checks internal links and the
  home page's transferred size (budget 100 KB).
- `docs/`: the plan (requirements, technical design, app flow, design brief, implementation plan).

## Build locally

Install [Zola 0.19.2](https://github.com/getzola/zola/releases/tag/v0.19.2), then:

```bash
python3 scripts/check_site.py sources
zola serve            # preview at http://127.0.0.1:1111
zola build            # writes public/
python3 scripts/check_site.py build
```

`public/` is generated and not committed.

## Status

The site is being rebuilt in stages; see [`docs/05-implementation-plan.md`](docs/05-implementation-plan.md)
for the task list. Pages built so far: Home (both languages), Install (both languages) and 404.
The Learn page, the playground at `/playground/`, and the Lighthouse and sample checks are still to
do.

Until Pages is switched to the GitHub Actions source, the live site is still served from the
`main` branch by Jekyll, and this repository's root `index.html` is what visitors see.

## Related repositories

- [Asili-Programming/Asili](https://github.com/Asili-Programming/Asili): the language, the wiki and the spec.
- [Asili-Programming/asili-vscode](https://github.com/Asili-Programming/asili-vscode): the VS Code extension.
- [Asili-Programming/asili-playground](https://github.com/Asili-Programming/asili-playground): the browser playground.
