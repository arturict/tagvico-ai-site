# Tagvico landing page

Landing page for **Tagvico**, the self-hosted companion for Paperless-ngx, served at
https://tagvico.arturf.ch. Vite and React, prerendered to static HTML and served by nginx.

The design follows OpenAI's: system font, white and grey surfaces, a near-black primary
button and one blue accent. The colour and type tokens in `src/styles/openai/` are from
OpenAI's Apps SDK UI (MIT, see the `LICENSE` in that folder); page rules are in
`src/styles.css`. Light and dark follow the OS setting.

## Development

```bash
npm ci
npm run dev        # http://localhost:5173
npm run check:seo  # build, then check metadata, structured data, sitemap, robots, analytics
```

`npm run build` prerenders `/`, `/privacy`, `/terms` and a `404.html` into `dist/`.

## Screenshots

The page uses product screenshots from a demo instance. `scripts/optimize-shots.mjs`
crops them and writes AVIF, WebP and PNG files into `public/shots/` plus their sizes
into `src/shots.json`:

```bash
npm i --no-save sharp
node scripts/optimize-shots.mjs --from /path/to/demo-shots
node scripts/make-og-card.mjs   # rebuilds public/og-card.png from the Needs you shot
```

## Optional assets

- Release video: `scripts/encode-video.sh <release.mp4> [poster.png]` (needs ffmpeg) writes
  `public/video/tagvico-3-5.mp4` (1280x720, about 1.5 MB) and the poster. The section only
  renders while the MP4 exists, loads nothing until played and is muted by default.
- Mascot Tagi: pixel-art SVGs from the app in `public/mascot/`, shown at whole multiples of
  16 px in the hero (waving), the closing call to action (idle) and on the 404 page (searching).

## Deployment

The production Dockerfile builds the site and serves it with nginx:

- Build pack: `dockerfile`
- Exposed port: `80`
- Domain: `tagvico.arturf.ch`
- Health endpoint: `/health`
- Unknown paths return `404.html`; `/docs/` is served by the separate docs container.
