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
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://dev.ummgoban.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/v1"),
        secure: false,
      },
    },
  },
});
