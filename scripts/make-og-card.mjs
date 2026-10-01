// Renders public/og-card.png (1200x630) from the icon, the headline and the
// Needs you screenshot. Needs sharp: npm i --no-save sharp
import { resolve } from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const W = 1200;
const H = 630;
const shotHeight = 470;
const shotWidth = Math.round(shotHeight * (1520 / 1180));

const shot = await sharp(resolve(root, 'public/shots/needs-you.png'))
  .resize({ height: shotHeight })
  .composite([{
    input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${shotWidth}" height="${shotHeight}"><rect x="0.5" y="0.5" width="${shotWidth - 1}" height="${shotHeight - 1}" rx="16" fill="none" stroke="#0d0d0d" stroke-opacity="0.12"/></svg>`),
  }])
  .png()
  .toBuffer();
const rounded = await sharp(shot)
  .composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${shotWidth}" height="${shotHeight}"><rect width="${shotWidth}" height="${shotHeight}" rx="16"/></svg>`), blend: 'dest-in' }])
  .png()
  .toBuffer();

const icon = await sharp(resolve(root, 'public/tagvico-icon.png')).resize(56, 56).png().toBuffer();
const font = 'font-family="Noto Sans, Helvetica, Arial, sans-serif"';
const text = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#ffffff"/>
  <text x="140" y="92" ${font} font-size="30" font-weight="600" fill="#0d0d0d">Tagvico</text>
  <text x="72" y="300" ${font} font-size="62" font-weight="500" fill="#0d0d0d">Ask your</text>
  <text x="72" y="370" ${font} font-size="62" font-weight="500" fill="#0d0d0d">archive.</text>
  <text x="72" y="440" ${font} font-size="62" font-weight="500" fill="#5d5d5d">Approve what</text>
  <text x="72" y="510" ${font} font-size="62" font-weight="500" fill="#5d5d5d">changes.</text>
  <text x="72" y="568" ${font} font-size="24" fill="#5d5d5d">A self-hosted companion for Paperless-ngx</text>
</svg>`;

await sharp(Buffer.from(text))
  .composite([
    { input: icon, left: 72, top: 52 },
    { input: rounded, left: W - shotWidth - 56, top: Math.round((H - shotHeight) / 2) },
  ])
  .png({ compressionLevel: 9 })
  .toFile(resolve(root, 'public/og-card.png'));
