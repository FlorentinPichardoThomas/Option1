import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: './', // Ensures relative paths for assets
  build: {
    outDir: 'dist' // Netlify serves files from 'dist'
  }
});
