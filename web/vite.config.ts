import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));
const contentDir = path.resolve(rootDir, "../content");

export default defineConfig({
  resolve: {
    alias: {
      "@content": contentDir,
    },
  },
  server: {
    fs: {
      allow: [rootDir, contentDir],
    },
  },
  plugins: [tanstackRouter(), tailwindcss(), react()],
});
