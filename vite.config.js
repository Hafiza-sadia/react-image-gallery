import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/react-image-gallery/', // 🔑 This is required for GitHub Pages
  plugins: [react(), tailwindcss()],
})
