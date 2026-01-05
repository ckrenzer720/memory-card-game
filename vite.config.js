import { defineConfig } from 'vite';

export default defineConfig({
  // Explicitly set root to current directory
  root: '.',
  // Ensure proper handling of HTML files
  server: {
    port: 5173,
    open: true
  },
  // Build configuration for vanilla JS
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: './index.html'
    }
  }
});

