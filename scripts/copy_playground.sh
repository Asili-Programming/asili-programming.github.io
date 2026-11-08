#!/usr/bin/env bash
# Copies a built playground (asili-playground, after ./build.sh) into the site's output folder as
# public/playground/. Run after `zola build`. The page's own files and every module it imports
# (followed from main.js through the imports of each module) are copied, so a new module needs no
# change here. Only the files the page loads: the binary engine (not the base64 copy), the bundle,
# and the page's own files.
set -euo pipefail

playground="${1:?usage: copy_playground.sh <asili-playground dir> [public dir]}"
public="${2:-$(cd "$(dirname "$0")/.." && pwd)/public}"
target="$public/playground"

# Files the page needs that are not JavaScript modules.
static=(pkg/asili_wasm.js pkg/asili_wasm_bg.wasm index.html style.css favicon.svg vendor/codemirror.js samples/manifest.json logo-mark.svg manifest.webmanifest sw.js icons/icon-192.png icons/icon-512.png icons/icon-maskable-512.png)

# The modules reachable from main.js and from worker.js (the page starts the worker by URL, so it is
# not an import of main.js): each `from "./x.js"` import, followed transitively.
modules=(main.js worker.js)
for ((i = 0; i < ${#modules[@]}; i++)); do
  file="${modules[$i]}"
  [ -f "$playground/$file" ] || { echo "missing $playground/$file" >&2; exit 1; }
  while IFS= read -r dep; do
    dep="${dep#./}"
    case " ${modules[*]} " in *" $dep "*) ;; *) modules+=("$dep") ;; esac
  done < <(grep -o 'from "\./[^"]*"' "$playground/$file" | sed 's/^from "//; s/"$//' | grep -v '^\./vendor/')
done

for f in "${static[@]}" "${modules[@]}"; do
  [ -f "$playground/$f" ] || { echo "missing $playground/$f: run build.sh in the playground first" >&2; exit 1; }
done

rm -rf "$target"
mkdir -p "$target/pkg" "$target/vendor" "$target/samples"
cp "$playground/pkg/asili_wasm.js" "$playground/pkg/asili_wasm_bg.wasm" "$target/pkg/"
for f in "${modules[@]}"; do
  mkdir -p "$(dirname "$target/$f")"
  cp "$playground/$f" "$target/$f"
done
cp "$playground/index.html" "$playground/style.css" "$playground/favicon.svg" "$playground/logo-mark.svg" "$target/"
cp "$playground/vendor/codemirror.js" "$target/vendor/"
cp "$playground/samples/"*.as "$playground/samples/manifest.json" "$target/samples/"
# The installable app: its manifest, its service worker (scope /playground/) and its icons.
cp "$playground/manifest.webmanifest" "$playground/sw.js" "$target/"
mkdir -p "$target/icons"
cp "$playground/icons/"*.png "$target/icons/"
echo "copied playground to $target: ${modules[*]}"
