import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'packages/calendar/demo',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'packages/calendar/src'),
    },
  },
  build: {
    outDir: '../../dist/calendar-demo',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'packages/calendar/demo/index.html'),
    },
  },
  server: {
    port: 4202,
  },
});