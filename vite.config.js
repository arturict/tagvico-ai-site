import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The release video is optional: the page renders its section only when the file
// has been added to public/video/. The same constant reaches the client and the
// server render, so the prerendered HTML and the hydrated page agree.
const hasVideo = existsSync(resolve(import.meta.dirname, 'public/video/tagvico-3-5.mp4'));

export default defineConfig({
  plugins: [react()],
  define: {
    __HAS_VIDEO__: JSON.stringify(hasVideo),
  },
});
