import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/usGovtCorn': {
        target: 'https://www.nass.usda.gov/Charts_and_Maps/graphics/data/pricecn.txt',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/usGovtCorn/, '')
      }
    }
  }
})
