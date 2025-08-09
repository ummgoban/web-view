import { defineWorkspace } from "vitest/config";

export default defineWorkspace(["./apps/client/vite.config.ts", "./apps/admin/vite.config.ts", "./packages/shared/vitest.config.ts", "./packages/ui/vitest.config.ts"]);
