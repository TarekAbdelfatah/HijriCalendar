import { defineConfig } from 'vite';
import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';

/**
 * Serve these paths raw (no Vite transform) so download links work correctly.
 * Without this, Vite converts .css → JS module and .ts → JS before serving.
 */
const RAW_DOWNLOAD_PATHS: Record<string, string> = {
  '/calendar/src/hijri-calendar.css':                 'text/css; charset=utf-8',
  '/calendar/src/hijri-calendar.lib.ts':              'text/plain; charset=utf-8',
  '/calendar/dist/hijri-calendar.lib.js':             'application/javascript; charset=utf-8',
  '/calendar/angular/hijri-calendar.directive.ts':    'text/plain; charset=utf-8',
  '/calendar/legacy/hijri-calender-ng7.directive.ts': 'text/plain; charset=utf-8',
};

export default defineConfig({
  root: '.',
  plugins: [
    {
      name: 'raw-download',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = (req.url || '').split('?')[0];
          const contentType = RAW_DOWNLOAD_PATHS[url];
          if (!contentType) { return next(); }

          // Module imports (import statements, <script type="module">) have
          // Sec-Fetch-Dest: 'script' — let Vite handle those normally.
          // Download links and direct navigation have Sec-Fetch-Dest: 'empty' | 'document'.
          if (req.headers['sec-fetch-dest'] === 'script') { return next(); }

          const filePath = resolve(__dirname, url.slice(1));
          if (!existsSync(filePath)) { return next(); }
          res.setHeader('Content-Type', contentType);
          res.end(readFileSync(filePath));
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'calendar/src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        calendar: resolve(__dirname, 'calendar/demo/index.html'),
      },
    },
  },
  server: {
    port: 4202,
  },
});