import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackRouter(), mdx(), tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
