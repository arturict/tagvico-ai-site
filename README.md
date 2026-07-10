# Tagvico AI Landing Page

Landing page for **Tagvico AI**, a ground-up AI extension for Paperless-ngx.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

This is a static Vite/React site with a production Dockerfile for Coolify:

- Build pack: `dockerfile`
- Exposed port: `80`
- Domain: `tagvico.arturf.ch`
- Versioned documentation: a separate Coolify application serves
  `tagvico.arturf.ch/docs` from the main Tagvico repository.
