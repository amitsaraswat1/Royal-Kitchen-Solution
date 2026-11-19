import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#111111",
        "royal-black": "#111111",
        "royal-dark": "#181818",
        "royal-card": "#202020",
        "royal-gold": "#C9A227",
        "warm-gold": "#E0B84C",
        "royal-gold-light": "#F3E7C4",
        "royal-text": "#333333",
        "royal-muted": "#666666",
        "royal-light": "#FAFAF8",
        "royal-surface": "#F4F1EB",
        "royal-border": "rgba(201, 162, 39, 0.25)",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        gold: "0 10px 30px -10px rgba(201, 162, 39, 0.3)",
        "gold-glow": "0 0 25px rgba(201, 162, 39, 0.25)",
        premium: "0 20px 40px -15px rgba(0, 0, 0, 0.08)",
        "premium-dark": "0 20px 40px -15px rgba(0, 0, 0, 0.5)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
