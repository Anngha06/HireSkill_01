// tailwind.config.ts
import type { Config } from "tailwindcss"

export default {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        neutralLight: "#f6f8fb",
        nearBlack: "#0b0b14"
      },
      fontFamily: {
        ui: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config
