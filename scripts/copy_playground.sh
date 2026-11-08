#!/usr/bin/env bash
# Copies a built playground (asili-playground, after ./build.sh) into the site's output folder as
# public/playground/. Run after `zola build`. Only the files the page loads are copied: the
# binary engine (not the base64 copy), the bundle, and the page's own files.
set -euo pipefail

playground="${1:?usage: copy_playground.sh <asili-playground dir> [public dir]}"
public="${2:-$(cd "$(dirname "$0")/.." && pwd)/public}"
target="$public/playground"

for f in pkg/asili_wasm.js pkg/asili_wasm_bg.wasm index.html main.js worker.js layout.js share.js style.css favicon.svg vendor/codemirror.js samples/manifest.json logo-mark.svg; do
  [ -f "$playground/$f" ] || { echo "missing $playground/$f: run build.sh in the playground first" >&2; exit 1; }
done

# Every relative module main.js imports must be in the list above, or the page fails to load.
for m in $(grep -o 'from "\./[^"]*"' "$playground/main.js" | sed 's/from "\.\///; s/"$//'); do
  case " pkg/asili_wasm.js pkg/asili_wasm_bg.wasm index.html main.js worker.js layout.js share.js style.css favicon.svg vendor/codemirror.js samples/manifest.json logo-mark.svg " in
    *" $m "*) ;;
    *) echo "main.js imports $m, which this script does not copy: add it to the list" >&2; exit 1 ;;
  esac
done

rm -rf "$target"
mkdir -p "$target/pkg" "$target/vendor" "$target/samples"
cp "$playground/pkg/asili_wasm.js" "$playground/pkg/asili_wasm_bg.wasm" "$target/pkg/"
cp "$playground/index.html" "$playground/main.js" "$playground/worker.js" "$playground/layout.js" \
   "$playground/share.js" "$playground/style.css" \
   "$playground/favicon.svg" "$playground/logo-mark.svg" "$target/"
cp "$playground/vendor/codemirror.js" "$target/vendor/"
cp "$playground/samples/"*.as "$playground/samples/manifest.json" "$target/samples/"
echo "copied playground to $target"
