#!/usr/bin/env bash
# Copies a built playground (asili-playground, after ./build.sh) into the site's output folder as
# public/playground/. Run after `zola build`. Only the files the page loads are copied: the
# binary engine (not the base64 copy), the bundle, and the page's own files.
set -euo pipefail

playground="${1:?usage: copy_playground.sh <asili-playground dir> [public dir]}"
public="${2:-$(cd "$(dirname "$0")/.." && pwd)/public}"
target="$public/playground"

for f in pkg/asili_wasm.js pkg/asili_wasm_bg.wasm index.html main.js worker.js style.css favicon.svg vendor/codemirror.js samples/manifest.json; do
  [ -f "$playground/$f" ] || { echo "missing $playground/$f: run build.sh in the playground first" >&2; exit 1; }
done

rm -rf "$target"
mkdir -p "$target/pkg" "$target/vendor" "$target/samples"
cp "$playground/pkg/asili_wasm.js" "$playground/pkg/asili_wasm_bg.wasm" "$target/pkg/"
cp "$playground/index.html" "$playground/main.js" "$playground/worker.js" "$playground/style.css" \
   "$playground/favicon.svg" "$target/"
cp "$playground/vendor/codemirror.js" "$target/vendor/"
cp "$playground/samples/"*.as "$playground/samples/manifest.json" "$target/samples/"
echo "copied playground to $target"
