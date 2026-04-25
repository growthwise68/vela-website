import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF6F0",
        parchment: "#F2EBE0",
        warmMid: "#E8DECE",
        warmLine: "#D9CFC0",
        ink: "#2C2418",
        inkMid: "#5A4F3E",
        inkFaint: "#9A8E7E",
        gold: "#C49A3C",
        goldSoft: "#E2BF7A",
        goldPale: "#F5E9C8",
        night: "#1A2540",
        nightMid: "#253352",
        nightPale: "#E8ECF5",
        navy: "#040D1A",
        amber: "#C4976A",
        coral: "#C45A4A",
        teal: "#4ECDC4",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
