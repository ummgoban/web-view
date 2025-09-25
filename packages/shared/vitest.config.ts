import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "**/index.ts",
        "node_modules/**",
        "dist/**",
        "**/*.d.ts",
        "**/*.type.ts",
        "**/*.config.*",
        "**/*.{test,spec}.{js,jsx,ts,tsx}",
        "__tests__/**",
      ],
    },
  },
});
