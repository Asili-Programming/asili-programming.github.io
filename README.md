# asili-programming.github.io

The landing page for Asili at <https://asili-programming.github.io>.

The site is one static file, `index.html`, with no build step and no external dependencies.
GitHub Pages serves it from the `main` branch.

- The API reference at `/Asili/` is published by the `Asili` repository's `docs.yml` workflow
  (rustdoc), which deploys to this site's `Asili/` path once Pages is enabled for that repository.
- The language docs, the wiki and the source live in
  [Asili-Programming/Asili](https://github.com/Asili-Programming/Asili).
- The VS Code extension is [Asili-Programming/asili-vscode](https://github.com/Asili-Programming/asili-vscode),
  and the browser playground is [Asili-Programming/asili-playground](https://github.com/Asili-Programming/asili-playground).

The plan for the site (requirements, architecture, app flow, design brief, implementation plan) is
in [`docs/`](docs/README.md).

To preview locally, open `index.html` in a browser. Links to `Asili/` resolve only after the API
reference has been deployed.
