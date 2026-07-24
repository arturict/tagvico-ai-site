import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const home = await readFile(resolve(root, 'dist/index.html'), 'utf8');
const privacy = await readFile(resolve(root, 'dist/privacy/index.html'), 'utf8');
const terms = await readFile(resolve(root, 'dist/terms/index.html'), 'utf8');
const robots = await readFile(resolve(root, 'dist/robots.txt'), 'utf8');
const sitemap = await readFile(resolve(root, 'dist/sitemap.xml'), 'utf8');
const ogImage = await readFile(resolve(root, 'dist/og-card.png'));

assert(home.includes('<h1'), 'home page must contain a prerendered h1');
assert(!home.includes('<div id="root"></div>'), 'home page must not ship an empty app root');
assert(home.includes('rel="canonical" href="https://tagvico.arturf.ch/"'), 'home canonical is missing');
assert(home.includes('property="og:image" content="https://tagvico.arturf.ch/og-card.png"'), 'Open Graph image is missing');
assert(home.includes('type="application/ld+json"'), 'structured data is missing');
assert(home.includes('"@type": "SoftwareApplication"'), 'software schema is missing');
assert(privacy.includes('<h1'), 'privacy page must be prerendered');
assert(privacy.includes('rel="canonical" href="https://tagvico.arturf.ch/privacy"'), 'privacy canonical is incorrect');
assert(privacy.includes('name="robots" content="noindex,follow"'), 'privacy page must be noindex');
assert(terms.includes('rel="canonical" href="https://tagvico.arturf.ch/terms"'), 'terms canonical is incorrect');
assert(robots.includes('Sitemap: https://tagvico.arturf.ch/sitemap.xml'), 'robots.txt must declare the sitemap');
assert(sitemap.includes('<loc>https://tagvico.arturf.ch/</loc>'), 'sitemap must include the landing page');
assert(sitemap.includes('<loc>https://tagvico.arturf.ch/docs/</loc>'), 'sitemap must include documentation');
assert(await stat(resolve(root, 'dist/site.webmanifest')), 'web manifest is missing');
assert(ogImage.toString('ascii', 1, 4) === 'PNG', 'Open Graph card must be a PNG');
assert(ogImage.readUInt32BE(16) === 1200, 'Open Graph card width must be 1200px');
assert(ogImage.readUInt32BE(20) === 630, 'Open Graph card height must be 630px');

console.log('SEO checks passed.');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
