import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Stock-visualizer/',
  server: {
    port: 3000
  }
})