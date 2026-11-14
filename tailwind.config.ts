import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── XYZUS "Sovereign Minimalism" tokens (CSS-var driven, dark-aware) ──
        ivory: "rgb(var(--ivory) / <alpha-value>)",
        graphite: "rgb(var(--graphite) / <alpha-value>)",
        stone: "rgb(var(--stone) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        sage: "rgb(var(--sage) / <alpha-value>)",
        teal: "rgb(var(--teal) / <alpha-value>)",
        "teal-ink": "rgb(var(--teal-ink) / <alpha-value>)",
        terracotta: "rgb(var(--terracotta) / <alpha-value>)",
        "terracotta-ink": "rgb(var(--terracotta-ink) / <alpha-value>)",
        signal: "rgb(var(--signal) / <alpha-value>)",
        // Warisan (cyan/tech) — tetap dipakai halaman lama sampai fase redesign
        brand: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
          950: "#083344",
        },
        tech: {
          dark: "#0b0f19",
          card: "#111827",
          border: "#1f2937",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        serif: [
          "var(--font-display)",
          "Fraunces",
          "Georgia",
          "Cambria",
          "serif",
        ],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        // Skala tipe responsif — display & judul halaman
        "display-xl": [
          "clamp(2.75rem, 7vw, 5.25rem)",
          { lineHeight: "1.02", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
        "display-lg": [
          "clamp(2.25rem, 5.5vw, 4rem)",
          { lineHeight: "1.05", letterSpacing: "-0.015em", fontWeight: "500" },
        ],
        "display-md": [
          "clamp(1.75rem, 4vw, 3rem)",
          { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "500" },
        ],
        // Judul seksi
        "title-lg": [
          "clamp(1.375rem, 2.5vw, 1.75rem)",
          { lineHeight: "1.2", letterSpacing: "-0.005em", fontWeight: "600" },
        ],
        "title-md": [
          "clamp(1.125rem, 2vw, 1.375rem)",
          { lineHeight: "1.3", fontWeight: "600" },
        ],
        // Lead paragraph
        lead: [
          "clamp(1.0625rem, 1.6vw, 1.25rem)",
          { lineHeight: "1.65" },
        ],
      },
      borderRadius: {
        // Radius kecil khas sovereign minimalism
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "10px",
      },
      maxWidth: {
        shell: "76rem", // lebar kontainer utama (≈ max-w-6xl + napas)
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "75ch",
            color: "inherit",
            a: {
              color: "#3F6566",
              "&:hover": {
                color: "#527F80",
              },
            },
            code: {
              color: "#3F6566",
              backgroundColor: "rgb(220 217 208 / 0.5)",
              padding: "0.2rem 0.4rem",
              borderRadius: "0.25rem",
              fontWeight: "400",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
