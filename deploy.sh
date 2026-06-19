#!/usr/bin/env bash
# Build a statický export → push do gh-pages větve (GitHub Pages).
set -euo pipefail

USER="matyassingel1"
REPO="zakouti-apartments"

[ -s "$HOME/.nvm/nvm.sh" ] && . "$HOME/.nvm/nvm.sh"

echo "▸ Build…"
npm run build

echo "▸ .nojekyll (kvůli _next/ na GitHub Pages)…"
touch out/.nojekyll

echo "▸ Push do gh-pages…"
rm -rf out/.git
git -C out init -q
git -C out checkout -q -b gh-pages
git -C out add -A
git -C out commit -q -m "Deploy $(date +%Y-%m-%d_%H:%M)"
git -C out push -q --force "https://github.com/$USER/$REPO.git" gh-pages

echo "✓ Hotovo → https://$USER.github.io/$REPO/"
