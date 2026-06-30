/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      // ── Typography ─────────────────────────────────────────────
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      // ── Brand Colors ──────────────────────────────────────────
      colors: {
        brand: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1", // Primary indigo
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        accent: {
          50:  "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef", // Violet accent
          600: "#c026d3",
          700: "#a21caf",
          800: "#86198f",
          900: "#701a75",
        },
        surface: {
          DEFAULT: "#0f0e17",  // Dark background
          card:    "#1a1929",  // Card background
          border:  "#2d2b50",  // Border
          muted:   "#6b6b8a",  // Muted text
        },
      },

      // ── Shadows ───────────────────────────────────────────────
      boxShadow: {
        "glow-sm":  "0 0 12px 0 rgba(99, 102, 241, 0.25)",
        "glow":     "0 0 24px 0 rgba(99, 102, 241, 0.35)",
        "glow-lg":  "0 0 48px 0 rgba(99, 102, 241, 0.45)",
        "card":     "0 4px 24px 0 rgba(0, 0, 0, 0.40)",
      },

      // ── Border Radius ─────────────────────────────────────────
      borderRadius: {
        "xl":  "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },

      // ── Animations ────────────────────────────────────────────
      keyframes: {
        "fade-in": {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-scale": {
          "0%":   { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%":   { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-in":        "fade-in 0.4s ease-out forwards",
        "fade-in-scale":  "fade-in-scale 0.3s ease-out forwards",
        "slide-in-right": "slide-in-right 0.4s ease-out forwards",
        "gradient-shift": "gradient-shift 6s ease infinite",
        "shimmer":        "shimmer 2s linear infinite",
        "float":          "float 4s ease-in-out infinite",
      },

      // ── Background sizes (for gradient animations) ────────────
      backgroundSize: {
        "300%": "300%",
        "200%": "200%",
      },
    },
  },
  plugins: [],
};
