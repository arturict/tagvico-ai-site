# Cloudflare Worker

Since 2026-11-05 tagvico.arturf.ch is served by the Worker `tagvico-site` with static assets (route
`tagvico.arturf.ch/*`): this repository's build at the root and the docs of `arturict/tagvico-ai` under `/docs/`.
`src/index.js` reproduces `../nginx.conf` and the docs image's nginx config (`/health`, `/docs` redirect,
`/privacy` and `/terms`, 404 pages, `.md` and `.txt` types, cache headers). `src/range.js` answers byte ranges with
206, because the asset binding ignores `Range` and Safari needs 206 for video.

Deploy: `DOCS_DIST=… CLOUDFLARE_API_TOKEN=… CLOUDFLARE_ACCOUNT_ID=… ./cloudflare/deploy.sh`.
Rollback: `npx wrangler rollback` in this folder, or remove the route in Cloudflare to send traffic back to the
nginx containers while they are kept.
