import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const home = await readFile(resolve(root, 'dist/index.html'), 'utf8');
const privacy = await readFile(resolve(root, 'dist/privacy/index.html'), 'utf8');
const terms = await readFile(resolve(root, 'dist/terms/index.html'), 'utf8');
const robots = await readFile(resolve(root, 'dist/robots.txt'), 'utf8');
const sitemap = await readFile(resolve(root, 'dist/sitemap.xml'), 'utf8');
const llms = await readFile(resolve(root, 'dist/llms.txt'), 'utf8');
const ogImage = await readFile(resolve(root, 'dist/og-card.png'));
const nginx = await readFile(resolve(root, 'nginx.conf'), 'utf8');
const analytics = await readFile(resolve(root, 'dist/analytics.js'), 'utf8');

assert(home.includes('<h1'), 'home page must contain a prerendered h1');
assert(!home.includes('<div id="root"></div>'), 'home page must not ship an empty app root');
assert(home.includes('rel="canonical" href="https://tagvico.arturf.ch/"'), 'home canonical is missing');
assert(home.includes('property="og:image" content="https://tagvico.arturf.ch/og-card.png"'), 'Open Graph image is missing');
assert(home.includes('type="application/ld+json"'), 'structured data is missing');
assert(home.includes('"@type": "SoftwareApplication"'), 'software schema is missing');
assert(home.includes('data-website-id="32125e56-263c-42ee-a556-a2f2867a9b94"'), 'Umami tracking is missing from the landing page');
assert(home.includes('src="/analytics.js"'), 'detailed Umami event tracking is missing from the landing page');
assert(home.includes('data-auto-track="false"'), 'Umami must not send unsanitized automatic page views');
assert(home.includes('data-do-not-track="true"'), 'Umami must respect Do Not Track');
assert(home.includes('data-domains="tagvico.arturf.ch"'), 'Umami must stay scoped to the production landing domain');
assert(home.includes('data-analytics-action="installation-open"'), 'landing CTAs need stable actions');
assert(home.includes('data-analytics-target="docs-installation"'), 'landing CTAs need bounded targets');
assert(analytics.includes('const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"]'), 'campaign attribution must use the bounded UTM allowlist');
assert(analytics.includes('track("landing-cta"'), 'CTA event schema is missing');
assert(analytics.includes('track("landing-section-view"'), 'section event schema is missing');
assert(analytics.includes('track("landing-scroll-depth"'), 'scroll-depth event schema is missing');
assert(analytics.includes('track("landing-engaged-time"'), 'engaged-time event schema is missing');
assert(analytics.includes('[25, 50, 75, 100]'), 'scroll-depth thresholds must match the shared schema');
assert(analytics.includes('const seenSections = new Set()'), 'section views need exactly-once guards');
assert(analytics.includes('const seenDepths = new Set()'), 'scroll-depth events need exactly-once guards');
assert(analytics.includes('const seenEngagement = new Set()'), 'engaged-time events need exactly-once guards');
assert(analytics.includes('navigator.globalPrivacyControl !== true'), 'custom analytics must respect Global Privacy Control');
assert(analytics.includes('navigator.doNotTrack !== "1"'), 'custom analytics must respect Do Not Track');
assert(!analytics.includes('utm_term'), 'search terms must not be collected');
assert(!analytics.includes('campaign-arrival'), 'UTM values must not be duplicated into custom event properties');
assert(!/(textContent|innerText|aria-label)/.test(analytics), 'analytics must not collect visible labels or free text');
assert(!/(localStorage|sessionStorage|document\.cookie|umami\.identify)/.test(analytics), 'analytics must not use persistent identifiers or browser storage');
assert(privacy.includes('<h1'), 'privacy page must be prerendered');
assert(!privacy.includes('32125e56-263c-42ee-a556-a2f2867a9b94'), 'Umami tracking must stay off the privacy page');
assert(privacy.includes('rel="canonical" href="https://tagvico.arturf.ch/privacy"'), 'privacy canonical is incorrect');
assert(privacy.includes('name="robots" content="noindex,follow"'), 'privacy page must be noindex');
assert(terms.includes('rel="canonical" href="https://tagvico.arturf.ch/terms"'), 'terms canonical is incorrect');
assert(!terms.includes('32125e56-263c-42ee-a556-a2f2867a9b94'), 'Umami tracking must stay off the terms page');
assert(robots.includes('Sitemap: https://tagvico.arturf.ch/sitemap.xml'), 'robots.txt must declare the sitemap');
assert(
  /User-agent: OAI-SearchBot\r?\nAllow: \/(?:\r?\n|$)/.test(robots),
  'robots.txt must explicitly allow OpenAI search discovery',
);
assert(sitemap.includes('<loc>https://tagvico.arturf.ch/</loc>'), 'sitemap must include the landing page');
assert(sitemap.includes('<loc>https://tagvico.arturf.ch/docs/</loc>'), 'sitemap must include documentation');
assert(llms.includes('Paperless-ngx document automation and research'), 'llms.txt must state the product category');
assert(
  llms.includes('- Source: https://github.com/arturict/tagvico-ai'),
  'llms.txt must link to the canonical source',
);
assert(
  llms.includes('- Documentation: https://github.com/arturict/tagvico-ai#readme'),
  'llms.txt documentation must not depend on the landing container docs redirect',
);
assert(await stat(resolve(root, 'dist/site.webmanifest')), 'web manifest is missing');
assert(ogImage.toString('ascii', 1, 4) === 'PNG', 'Open Graph card must be a PNG');
assert(ogImage.readUInt32BE(16) === 1200, 'Open Graph card width must be 1200px');
assert(ogImage.readUInt32BE(20) === 630, 'Open Graph card height must be 630px');
assert(nginx.includes('location = /privacy {'), 'nginx must serve the canonical privacy route without a scheme-changing redirect');
assert(nginx.includes('location = /terms {'), 'nginx must serve the canonical terms route without a scheme-changing redirect');

console.log('SEO checks passed.');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
