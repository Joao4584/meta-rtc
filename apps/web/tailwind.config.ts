import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        100: "24rem"
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundColor: {
        "gray-header": "#272d3a",
        "gray-header-input": "#202430",
        "gray-main-1": "#0E1117",
        "gray-main-2": "#11141B",
        "gray-btn-card": "#222632",
        'cyber-grape': {
            50: '#F6F5F8',
            100: '#CAC3D4',
            200: '#9E92B0',
            300: '#71608D',
            400: '#4A356A',
            500: '#412E5D',
            600: '#372850',
            700: '#2E2142',
            800: '#251A35',
            900: '#1B1427',
            950: '#120D1A',
        },
      },
      boxShadowColor: {
        'cyber-grape': {
            50: '#F6F5F8',
            100: '#CAC3D4',
            200: '#9E92B0',
            300: '#71608D',
            400: '#4A356A',
            500: '#412E5D',
            600: '#372850',
            700: '#2E2142',
            800: '#251A35',
            900: '#1B1427',
            950: '#120D1A',
        },
      }
    },
  },
  plugins: [],
};
export default config;
