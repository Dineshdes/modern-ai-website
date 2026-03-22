import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          green: "#00E599",
          "green-dark": "#34D59A",
          bg: "#000000",
          surface: "#18191B",
          elevated: "#111215",
          mint: "#E4F1EB",
          "mint-dark": "#CAE6D9",
          forest: "#2C6D4C",
          muted: "#94979E",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
