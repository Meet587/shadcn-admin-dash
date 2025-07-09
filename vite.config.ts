import tailwindcssVite from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcssVite()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@radix-ui/react-dialog',
      '@radix-ui/react-tooltip',
      '@reduxjs/toolkit',
      'react-redux',
    ],
  },
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
  },
  build: {
    sourcemap: false,
  },
});
