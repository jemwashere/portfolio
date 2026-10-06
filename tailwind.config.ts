import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

/**
 * ACCENT TOKEN: the single "slash of light" color for the whole site.
 * Every accent class is `accent-*` (e.g. `text-accent-500`, `bg-accent-600`),
 * and every glow below is derived from it. To switch red → blue, change ONE word:
 *   const accentPalette = colors.red;   →   const accentPalette = colors.blue;
 */
const accentPalette = colors.red;

/** "#ef4444" + 0.6 → "rgba(239, 68, 68, 0.6)": keeps glows tied to the token. */
function withAlpha(hex: string, alpha: number): string {
  const value = parseInt(hex.replace("#", ""), 16);
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`;
}

const config: Config = {
  // The theme toggle adds/removes `dark` on <html>.
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  future: {
    // `hover:` styles only apply on devices that can really hover,
    // so tapping a card on a phone doesn't leave it stuck "hovered".
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        accent: {
          ...accentPalette,
          // Accent for small text: slightly darker in light mode for contrast.
          fg: "var(--accent-fg)",
        },
        // Theme tokens: values live in app/globals.css (:root = light, .dark = dark).
        base: "var(--bg-base)", //          bg-base
        card: "var(--bg-card)", //          bg-card
        primary: "var(--text-primary)", //  text-primary  (headings)
        muted: "var(--text-muted)", //      text-muted    (body)
        faint: "var(--text-faint)", //      text-faint    (labels, meta)
        subtle: "var(--border-subtle)", //  border-subtle (hairlines)
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        jp: ["var(--font-jp)", '"Hiragino Mincho ProN"', '"Yu Mincho"', "serif"],
      },
      boxShadow: {
        glow: `0 0 24px ${withAlpha(accentPalette[500], 0.6)}`,
        "glow-sm": `0 0 14px ${withAlpha(accentPalette[500], 0.35)}`,
      },
      dropShadow: {
        // drop-shadow (not box-shadow) so the glow follows clip-path cut corners
        glow: `0 0 18px ${withAlpha(accentPalette[500], 0.35)}`,
      },
      // Keyframes live in app/globals.css.
      animation: {
        // `both` keeps the element hidden during its stagger delay
        "slide-up": "slideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "pop-in": "popIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
        blink: "blink 1s step-end infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spinSlow 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
