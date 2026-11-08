#!/usr/bin/env python3
"""Compile every Asili example the site shows, with the real `pata` (NFR-9).

Each ```asili block in content/ and each samples/*.as file of the playground (when given with
--playground) is written to its own project and compiled with `pata jenga`. A sample that does
not compile fails the check. Set PATA to the binary to use (default: pata on PATH).

Usage:
  PATA=path/to/pata python3 scripts/check_samples.py [--playground DIR]
"""
import os
import pathlib
import re
import shutil
import subprocess
import sys
import tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content"
FENCE = re.compile(r"^```asili\n(.*?)^```", re.DOTALL | re.MULTILINE)

MANIFEST = """[jumla]
jina = "sampuli"
toleo = "0.1.0"
asili = "1.1"

[chanzo]
kuingia = "src/kuu.as"

[tegemezi]
"""


def samples_from_content() -> list[tuple[str, str]]:
    found = []
    for md in sorted(CONTENT.rglob("*.md")):
        for i, m in enumerate(FENCE.finditer(md.read_text(encoding="utf-8")), start=1):
            found.append((f"{md.relative_to(ROOT)} (block {i})", m.group(1)))
    return found


def samples_from_playground(root: pathlib.Path) -> list[tuple[str, str]]:
    return [(f"playground {p.name}", p.read_text(encoding="utf-8")) for p in sorted((root / "samples").glob("*.as"))]


def compile_one(pata: str, label: str, source: str) -> str | None:
    work = pathlib.Path(tempfile.mkdtemp(prefix="asili-sample-"))
    try:
        (work / "src").mkdir()
        (work / "pata.toml").write_text(MANIFEST, encoding="utf-8")
        (work / "src" / "kuu.as").write_text(source, encoding="utf-8")
        res = subprocess.run([pata, "jenga"], cwd=work, capture_output=True, text=True)
        if res.returncode != 0:
            return f"{label} does not compile:\n{res.stdout}{res.stderr}".rstrip()
        return None
    finally:
        shutil.rmtree(work, ignore_errors=True)


def main(argv: list[str]) -> int:
    pata = os.environ.get("PATA", "pata")
    samples = samples_from_content()
    if "--playground" in argv:
        samples += samples_from_playground(pathlib.Path(argv[argv.index("--playground") + 1]))
    if not samples:
        print("error: no samples found")
        return 1
    errors = [e for e in (compile_one(pata, label, src) for label, src in samples) if e]
    for e in errors:
        print(f"error: {e}")
    if errors:
        return 1
    print(f"ok: {len(samples)} samples compile with {pata}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
