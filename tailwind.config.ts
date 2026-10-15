import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 950: "#151829", 900: "#1F2340", 800: "#2B304F", 700: "#3A4068", 600: "#4E5584" },
        accent: { 300: "#BFE0F7", 400: "#8CC6EE", 500: "#5AA9E0", 600: "#2F86C2" },
        ez: { emerald: "#16542A", deep: "#0C3519", gold: "#C9A44C", light: "#E9D9A6" },
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
