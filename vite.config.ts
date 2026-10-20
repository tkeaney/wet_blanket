import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://tkeaney.github.io/wet_blanket/
  base: '/wet_blanket/',
  plugins: [react()],
})
