import { defineConfig } from "vite";
import { URL, fileURLToPath } from 'node:url'
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: './',
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url)),
      "~": fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  define: {
    'process.env.VITE_BASE_URL': JSON.stringify(process.env.VITE_BASE_URL)
  },
  server: {
    port: 5174,
  },
});
