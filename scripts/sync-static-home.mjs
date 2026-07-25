import { copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();

await copyFile(
  resolve(root, 'public/index.html'),
  resolve(root, 'dist/index.html'),
);
