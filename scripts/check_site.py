#!/usr/bin/env python3
"""Quality gates for the site that Zola cannot check itself.

Usage:
  python3 scripts/check_site.py sources   # before the build: pairs and reserved names
  python3 scripts/check_site.py build     # after `zola build`: internal links, home page weight

Standard library only, so the gate needs no toolchain beyond Python 3.
"""
import gzip
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content"
STATIC = ROOT / "static"
PUBLIC = ROOT / "public"

# Paths served by other repos' Pages deployments (see docs/02-technical-requirements.md).
RESERVED = {"Asili", "asili-vscode", "asili-playground"}
HOME_BUDGET_BYTES = 100 * 1024  # NFR-1: transferred home page under 100 KB


def check_sources() -> list[str]:
    errors = []
    # Every page exists in both languages: X.md <-> X.en.md (FR-6).
    for md in sorted(CONTENT.rglob("*.md")):
        name = md.name
        if name.endswith(".en.md"):
            twin = md.with_name(name[: -len(".en.md")] + ".md")
        else:
            twin = md.with_name(name[: -len(".md")] + ".en.md")
        if not twin.exists():
            errors.append(f"missing translation: {md.relative_to(ROOT)} has no {twin.name}")
    # Reserved folder names at the top of content/ and static/ (docs/02, Risks).
    for top in (CONTENT, STATIC):
        if not top.exists():
            continue
        for child in top.iterdir():
            if child.name in RESERVED:
                errors.append(f"reserved name: {child.relative_to(ROOT)} would shadow a repo's Pages path")
    return errors


def transferred_bytes(paths: list[pathlib.Path]) -> int:
    return sum(len(gzip.compress(p.read_bytes(), 9)) for p in paths)


def check_internal_links() -> list[str]:
    """Every same-site href in the built pages must point at a built file.

    External links are left to a separate link checker (lychee, weekly), so a flaky remote
    server never fails a pull request.
    """
    errors = []
    for page in sorted(PUBLIC.rglob("*.html")):
        html = page.read_text(encoding="utf-8")
        for href in re.findall(r'href="(/[^"#?]*)', html):
            href = href.replace("&#x2F;", "/")
            target = PUBLIC / href.lstrip("/")
            if href.endswith("/"):
                target = target / "index.html"
            if not target.exists():
                errors.append(f"broken internal link in {page.relative_to(PUBLIC)}: {href}")
    return errors


def check_build() -> list[str]:
    home = PUBLIC / "index.html"
    if not home.exists():
        return ["public/index.html not found: run `zola build` first"]
    errors = check_internal_links()
    if errors:
        return errors
    html = home.read_text(encoding="utf-8")
    # Count the stylesheets and scripts the home page loads from the site (not fonts or CDNs).
    assets = re.findall(r'(?:href|src)="(/[^"]+\.(?:css|js))"', html)
    paths = [home] + [PUBLIC / a.lstrip("/") for a in assets]
    missing = [p for p in paths if not p.exists()]
    if missing:
        return [f"asset not built: {p.relative_to(ROOT)}" for p in missing]
    size = transferred_bytes(paths)
    print(f"home page transfer (gzip, html + css + js): {size} bytes, budget {HOME_BUDGET_BYTES}")
    if size > HOME_BUDGET_BYTES:
        return [f"home page is {size} bytes, over the {HOME_BUDGET_BYTES}-byte budget"]
    return []


def main(argv: list[str]) -> int:
    mode = argv[1] if len(argv) > 1 else ""
    if mode == "sources":
        errors = check_sources()
    elif mode == "build":
        errors = check_build()
    else:
        print(__doc__)
        return 2
    for e in errors:
        print(f"error: {e}")
    if errors:
        return 1
    print(f"ok: {mode} checks passed")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
