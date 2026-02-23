import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#090909",
        surface: "#111111",
        "surface-2": "#161616",
        line: "#232323",
        text: "#f4f4f4",
        muted: "#9d9d9d",
        accent: "#e94957",
      },
    },
  },
} satisfies Config;
