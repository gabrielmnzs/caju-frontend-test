import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react(), eslintPlugin()],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    'process.env': JSON.stringify(process.env),
  },
});
