# Tagvico Landing Page

Static Paper & Pine landing page for **Tagvico**, the self-hosted Paperless-ngx
workspace.

## Development

```bash
python -m http.server 4173 --directory public
```

The production build uses the reviewed static landing page and prerenders the
privacy and terms pages so crawlers receive their content without executing
JavaScript. It also copies the crawl files from `public/` into `dist/`.

```bash
npm run check:seo
```

The SEO check validates canonical metadata, structured data, social cards,
the sitemap, robots policy, and crawlable HTML on important routes.

## Deployment

The production Dockerfile builds the complete static site and serves it with
nginx:

- Build pack: `dockerfile`
- Exposed port: `80`
- Domain: `tagvico.arturf.ch`
- Health endpoint: `/health`
