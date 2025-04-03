import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        sans: ['Poppins', 'sans-serif']
      },
      colors: {
        // Nueva paleta basada en la imagen
        primary: {
          DEFAULT: "#502C48",    // Color 1
          foreground: "#FFFFFF", // Color 3 (blanco)
          dark: "#3A1F35",       // Versión oscura del primary
          light: "#6A3F5C"       // Versión clara del primary
        },
        secondary: {
          DEFAULT: "#662F65",    // Color 2
          foreground: "#FFFFFF", 
          dark: "#4C224B",
          light: "#80437E"
        },
        success: {
          DEFAULT: "#38866C",    // Color 4
          foreground: "#FFFFFF"
        },
        destructive: {
          DEFAULT: "#E22E22",    // Color 6
          foreground: "#FFFFFF"
        },
        background: "#FFFFFF",   // Color 3
        foreground: "#000000",   // Color 5
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#000000"
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#000000"
        },
        muted: {
          DEFAULT: "#F3F4F6",
          foreground: "#6B7280"
        },
        accent: {
          DEFAULT: "#662F65",    // Usamos secondary
          foreground: "#FFFFFF"
        },
        border: "#E5E7EB",
        input: "#FFFFFF",
        ring: "#502C48",         // Color primary
        chart: {
          "1": "#502C48",        // Primary
          "2": "#662F65",        // Secondary
          "3": "#38866C",        // Success
          "4": "#E22E22",        // Destructive
          "5": "#6A3F5C"         // Primary light
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;