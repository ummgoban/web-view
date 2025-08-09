import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: true,
        titleProp: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
