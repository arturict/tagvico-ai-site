#!/usr/bin/env bash
# Deploys tagvico.arturf.ch to the Cloudflare Worker `tagvico-site`: the site build of this repository at the root
# and the docs build of arturict/tagvico-ai (docs-site, base /docs/) under /docs/.
# Usage: DOCS_DIST=/path/to/tagvico-ai/docs-site/.vitepress/dist ./cloudflare/deploy.sh
# Needs CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID in the environment.
set -euo pipefail
: "${DOCS_DIST:?set DOCS_DIST to the built docs of arturict/tagvico-ai}"
cd "$(dirname "$0")/.."
pnpm install --frozen-lockfile && pnpm build
rm -rf cloudflare/public && mkdir -p cloudflare/public/docs
cp -R dist/. cloudflare/public/
cp -R "$DOCS_DIST"/. cloudflare/public/docs/
cd cloudflare
node src/build-sizes.mjs public "" src/sizes.json
npx -y wrangler@4 deploy
