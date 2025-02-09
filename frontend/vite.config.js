import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: "/", // Ensure base is set properly
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true, // Ensures client-side routing works
  },
})