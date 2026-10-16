import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import seoFiles from './seo/vite-plugin-seo.js'

export default defineConfig(({ mode }) => ({
  plugins: [react(), seoFiles(mode)],
  server: { host: true, port: 5173 },
  build: { target: 'es2020', sourcemap: false },
}))
