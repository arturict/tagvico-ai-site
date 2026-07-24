import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const template = await readFile(resolve(root, 'dist/index.html'), 'utf8');
const serverEntry = pathToFileURL(resolve(root, 'dist-ssr/entry-server.mjs')).href;
const { render } = await import(serverEntry);

const pages = [
  {
    path: '/',
    output: 'dist/index.html',
    title: 'Tagvico: Paperless-ngx automation, chat and tag cleanup',
    description: 'Self-host Tagvico beside Paperless-ngx to automate metadata, research documents, track actions and review every write with Ollama, APIs, ChatGPT or Copilot.',
    canonical: 'https://tagvico.arturf.ch/',
    robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
  },
  {
    path: '/privacy',
    output: 'dist/privacy/index.html',
    title: 'Privacy | Tagvico',
    description: 'How the self-hosted Tagvico application and public website handle documents, credentials and provider connections.',
    canonical: 'https://tagvico.arturf.ch/privacy',
    robots: 'noindex,follow',
  },
  {
    path: '/terms',
    output: 'dist/terms/index.html',
    title: 'Terms | Tagvico',
    description: 'Terms for the Tagvico public website and self-hosted Paperless-ngx companion.',
    canonical: 'https://tagvico.arturf.ch/terms',
    robots: 'noindex,follow',
  },
];

for (const page of pages) {
  const appHtml = render(page.path);
  let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = replaceAttribute(html, 'meta', 'name', 'description', 'content', page.description);
  html = replaceAttribute(html, 'meta', 'name', 'robots', 'content', page.robots);
  html = replaceAttribute(html, 'link', 'rel', 'canonical', 'href', page.canonical);
  html = replaceAttribute(html, 'meta', 'property', 'og:title', 'content', page.title);
  html = replaceAttribute(html, 'meta', 'property', 'og:description', 'content', page.description);
  html = replaceAttribute(html, 'meta', 'property', 'og:url', 'content', page.canonical);
  html = replaceAttribute(html, 'meta', 'name', 'twitter:title', 'content', page.title);
  html = replaceAttribute(html, 'meta', 'name', 'twitter:description', 'content', page.description);

  const outputPath = resolve(root, page.output);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
}

await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true });

function replaceAttribute(html, tag, key, value, target, replacement) {
  const pattern = new RegExp(`(<${tag}[^>]*${key}="${escapeRegExp(value)}"[^>]*${target}=")[^"]*(")`);
  return html.replace(pattern, `$1${escapeHtml(replacement)}$2`);
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
