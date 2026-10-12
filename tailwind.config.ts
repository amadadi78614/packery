import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 950: "#060E1F", 900: "#0A1A33", 800: "#10264A", 700: "#183563", 600: "#22477F" },
        gold: { 300: "#E6CF9A", 400: "#D7B672", 500: "#C29A4E", 600: "#A27F3C" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      maxWidth: { site: "76rem" },
    },
  },
  plugins: [],
};
export default config;
