import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The release video is optional: the page renders its section only when the file
// has been added to public/video/. The same constant reaches the client and the
// server render, so the prerendered HTML and the hydrated page agree.
const hasVideo = existsSync(resolve(import.meta.dirname, 'public/video/tagvico-3-5.mp4'));

// The mascot is optional in the same way: drop mascot.svg (or mascot.png) into
// public/mascot/ and it appears in the hero, the closing call to action and on the
// 404 page. Without a file those slots render nothing.
const mascotFile = ['mascot.svg', 'mascot.png', 'mascot.webp']
  .find((name) => existsSync(resolve(import.meta.dirname, 'public/mascot', name)));

export default defineConfig({
  plugins: [react()],
  define: {
    __HAS_VIDEO__: JSON.stringify(hasVideo),
    __MASCOT_SRC__: JSON.stringify(mascotFile ? `/mascot/${mascotFile}` : null),
  },
});
