# Tagvico AI Landing Page

Landing page for **Tagvico AI v3.1.2**, the self-hosted Action Center,
Ask Tagvico workspace, and metadata automation layer for Paperless-ngx.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The build prerenders the landing, privacy, and terms pages so crawlers receive
the product content without executing JavaScript. It also copies the crawl
files from `public/` into `dist/`.

```bash
npm run check:seo
```

The SEO check validates canonical metadata, structured data, social cards,
the sitemap, robots policy, and crawlable HTML on important routes.

## Deployment

This is a static Vite/React site with a production Dockerfile for Coolify:

- Build pack: `dockerfile`
- Exposed port: `80`
- Domain: `tagvico.arturf.ch`
