import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Noto_Serif_JP } from "next/font/google";
import { dev, hero } from "@/lib/data";
import "./globals.css";

// Self-hosted at build time by next/font: no layout shift, no external requests.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
// Kanji accents. Not preloaded: the browser only fetches the tiny
// unicode-range slices that contain those few glyphs.
const jp = Noto_Serif_JP({ weight: "900", variable: "--font-jp", display: "swap", preload: false });

export const metadata: Metadata = {
  title: `${dev.fullName} — ${dev.role} Developer`,
  description: hero.bio,
  openGraph: {
    title: `${dev.fullName} — ${dev.role} Developer`,
    description: hero.bio,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

/**
 * No-flash theme script. Runs before the page paints:
 * saved choice in localStorage("theme") → otherwise the OS preference.
 * (Key must match THEME_STORAGE_KEY in hooks/useTheme.ts.)
 */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var r=document.documentElement;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // `dark` is the server default; the script above corrects it instantly.
    // suppressHydrationWarning: the script may change the class before React loads.
    <html lang="en" className={`dark ${inter.variable} ${mono.variable} ${jp.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">
        {children}
        {/* Grain + scanline overlay (purely decorative) */}
        <div aria-hidden="true" className="grain" />
      </body>
    </html>
  );
}
