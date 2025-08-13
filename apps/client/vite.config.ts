import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __DEV__: process.env.NODE_ENV === "development",
    __LOCAL__: process.env.NODE_ENV === "local",
  },
  preview: {
    port: 8080,
    allowedHosts: [".ngrok-free.app", "localhost", "127.0.0.1"],
  },
  server: {
    port: 5173,
    allowedHosts: [".ngrok-free.app", "localhost", "127.0.0.1"],
    proxy: {
      "/api-dev": {
        target: "https://dev.ummgoban.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-dev/, "/v1"),
        secure: false,
      },
      "/api-prod": {
        target: "https://api.ummgoban.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-prod/, "/v1"),
        secure: false,
      },
    },
  },
});
