import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import mdx from "@mdx-js/rollup";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  server: {
    fs: {
      allow: [rootDir],
    },
  },
  plugins: [tanstackRouter(), mdx(), tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
    },
  },
});
