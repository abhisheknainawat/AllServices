import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '127.0.0.1',
    strictPort: false,
    middlewareMode: false,
  },
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  define: {
    'process.env': {}
  }
})
