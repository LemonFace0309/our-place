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
        "dark-blue": "#2b3a67",
        "light-blue": "#3f5ba9",
        "very-dark-blue": "#242634",
        "dark-gray": "#333",
        "light-gray": "#444",
      },
      boxShadow: {
        inset: "inset 0 0 8px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
