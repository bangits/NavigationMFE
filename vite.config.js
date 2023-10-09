import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'styled-system': path.resolve(__dirname, './styled-system')
    }
  },
  plugins: [react()],
  preview: {
    port: 9003
  },
  build: {
    cssCodeSplit: true,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/atom-navigation.tsx'),
      formats: ['system'],
      fileName: () => 'atom-navigation.js'
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'inversify',
        'react-router-dom',
        'reflect-metadata',
        'react-redux',
        '@automapper/core',
        '@automapper/classes',
        /^@atom/
      ],
      output: {
        intro: `const process = {env: ${JSON.stringify(process.env)}}`
      }
    }
  }
});
