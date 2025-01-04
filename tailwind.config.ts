import type { Config } from "tailwindcss";

export default {
  plugins: [],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondary: "#735024",
        "secondary-100": "#e0c29c",
        "secondary-200": "#dab688",
        "secondary-300": "#d3aa75",
        "secondary-400": "#cd9e62",
        "secondary-500": "#c7924e",
        "secondary-600": "#c0863c",
        "secondary-700": "#ad7836",
        "secondary-800": "#996b30",
        "secondary-900": "#865d2a",
      },
    },
  },
} satisfies Config;
