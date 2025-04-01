/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens, fontSize } from "fluid-tailwind";
module.exports = {
  content: {
    files: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    extract,
  },
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
      },
    },
    screens,
    fontSize,
    fontFamily: {
      headings: "var(--font-montserrat)",
      text: "var(--font-inter)",
      manrope: "var(--font-manrope)",
      bungee: "var(--font-bungee)",
    },
    extend: {
      colors: {
        text: "#fff",
        secondary: "#C8E373",
        bg: "#f7f4e8",
        bg2: "#FFE0E0",
        text2: "#00E6B2",
        spare: "#01062e",
      },
    },
  },
  plugins: [fluid],
};
