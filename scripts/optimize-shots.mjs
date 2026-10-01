// Turns product screenshots into the responsive assets the landing page uses.
//
//   node scripts/optimize-shots.mjs --from /tmp/v36/demo-shots \
//        --stills ~/tagvico-video-out/stills                       # real screenshots
//   node scripts/optimize-shots.mjs --placeholders                  # neutral stand-ins
//
// For each entry in SHOTS it reads <from>/<file>.png, crops it (pixels of the source,
// which are 2x screenshots of a 1440x900 window) and writes
// public/shots/<name>-800.{avif,webp}, <name>-1600.{avif,webp} and a 1600px PNG
// fallback, then records the pixel size in src/shots.json so the page can set
// width and height and avoid layout shift. Needs sharp: npm i --no-save sharp
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Crops show the content column without the sidebar where that reads better, and
// keep demo-only details such as the test model name out of the frame.
const SHOTS = {
  chat: { file: 'desktop-chat', crop: { left: 0, top: 108, width: 2880, height: 1692 } },
  // Stills from the release video (1920x1080 frames of the app with a caption below). The crops stay
  // inside the window, away from its rounded corners, and leave out the caption.
  answer: { stills: 'tagvico-3.5-02-chat-answer', crop: { left: 700, top: 118, width: 830, height: 310 } },
  approval: { stills: 'tagvico-3.5-03-approval-card', crop: { left: 700, top: 118, width: 830, height: 490 } },
  'needs-you': { file: 'desktop-needs-you', crop: { left: 940, top: 0, width: 1520, height: 1180 } },
  person: { file: 'desktop-person-sandra', crop: { left: 940, top: 0, width: 1520, height: 620 } },
  models: { file: 'desktop-settings-ai', crop: { left: 1100, top: 140, width: 1540, height: 790 } },
  channels: { file: 'desktop-settings-channels', crop: { left: 1100, top: 130, width: 1540, height: 1180 } },
  filing: { file: 'extra-automation', crop: { left: 1100, top: 130, width: 1540, height: 880 } },
  // Phone-sized versions, shown instead of the desktop crop below 768px. The white box hides the test model name.
  'chat-mobile': {
    file: 'mobile-chat',
    crop: { left: 0, top: 100, width: 780, height: 1588 },
    mask: [{ left: 20, top: 30, width: 380, height: 80 }],
    widths: [780],
  },
  'needs-you-mobile': { file: 'mobile-needs-you', crop: { left: 0, top: 0, width: 780, height: 1688 }, widths: [780] },
};
const DEFAULT_WIDTHS = [800, 1600];
const PLACEHOLDER_SIZE = { width: 1600, height: 1000 };

let sharp;
try {
  ({ default: sharp } = await import('sharp'));
} catch {
  console.error('sharp is not installed. Run: npm i --no-save sharp');
  process.exit(1);
}

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);

const root = process.cwd();
const outDir = resolve(root, 'public/shots');
const manifestPath = resolve(root, 'src/shots.json');
await mkdir(outDir, { recursive: true });

const manifest = existsSync(manifestPath) ? JSON.parse(await readFile(manifestPath, 'utf8')) : {};

const placeholderSvg = ({ width, height }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="#f3f3f3"/><rect x="48" y="48" width="${width - 96}" height="${height - 96}" rx="16" fill="#ffffff" stroke="#e3e3e3" stroke-width="2"/></svg>`;

async function writeVariants(name, input, size, crop, { widths = DEFAULT_WIDTHS, mask = [] } = {}) {
  let base = sharp(input, { density: 144 });
  if (crop) base = sharp(await base.extract(crop).toBuffer());
  if (mask.length) {
    const boxes = mask.map(({ left, top, width, height }) => `<rect x="${left}" y="${top}" width="${width}" height="${height}" fill="#fff"/>`).join('');
    base = sharp(await base.composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}">${boxes}</svg>`) }]).toBuffer());
  }
  for (const target of widths) {
    const width = Math.min(target, size.width);
    const resized = base.clone().resize({ width, withoutEnlargement: true });
    await resized.clone().avif({ quality: 55, effort: 6 }).toFile(resolve(outDir, `${name}-${target}.avif`));
    await resized.clone().webp({ quality: 82 }).toFile(resolve(outDir, `${name}-${target}.webp`));
  }
  await base
    .clone()
    .resize({ width: Math.min(Math.max(...widths), size.width), withoutEnlargement: true })
    .png({ palette: true, quality: 92, compressionLevel: 9 })
    .toFile(resolve(outDir, `${name}.png`));
}

const from = option('--from');
const stillsDir = option('--stills');
for (const [name, { file, stills, crop, ...options }] of Object.entries(SHOTS)) {
  if (flag('--placeholders')) {
    if (manifest[name] && !manifest[name].placeholder) continue;
    await writeVariants(name, Buffer.from(placeholderSvg(PLACEHOLDER_SIZE)), PLACEHOLDER_SIZE, null, options);
    manifest[name] = { ...PLACEHOLDER_SIZE, placeholder: true };
    console.log(`${name}: placeholder`);
    continue;
  }
  if (!from) {
    console.error('Pass --from <directory> or --placeholders.');
    process.exit(1);
  }
  const directory = stills ? stillsDir : from;
  const base = stills ?? file;
  const source = directory && ['png', 'jpg', 'jpeg', 'webp'].map((ext) => resolve(directory, `${base}.${ext}`)).find(existsSync);
  if (!source) {
    console.warn(`${name}: no source for ${base}, keeping the current asset`);
    continue;
  }
  const { width, height } = crop;
  await writeVariants(name, source, { width, height }, crop, options);
  const scale = Math.min(Math.max(...(options.widths ?? DEFAULT_WIDTHS)), width) / width;
  manifest[name] = { width: Math.round(width * scale), height: Math.round(height * scale) };
  console.log(`${name}: ${width}x${height} -> ${manifest[name].width}x${manifest[name].height}`);
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
