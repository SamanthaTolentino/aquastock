import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    dynamicImportVars: true
  },
  resolve: {
    $fonts: resolve('./static/fonts')
  }
})