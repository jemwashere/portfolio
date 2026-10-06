"use client";

import { useTypingEffect } from "@/hooks/useTypingEffect";
import { dev, hero, links } from "@/lib/data";
import GearCluster from "./GearCluster";
import { Reveal } from "./SectionWrapper";

// Fixed (not random) positions so server and client render identically.
const DOTS = [
  { top: "14%", left: "8%", size: 3, delay: "0s" },
  { top: "28%", left: "88%", size: 4, delay: "1.2s" },
  { top: "72%", left: "12%", size: 2, delay: "2.4s" },
  { top: "82%", left: "70%", size: 3, delay: "0.8s" },
  { top: "45%", left: "52%", size: 2, delay: "3s" },
  { top: "20%", left: "40%", size: 2, delay: "1.8s" },
  { top: "60%", left: "94%", size: 3, delay: "2s" },
];

// Every key of `dev` except fullName becomes a line in the code card.
const codeEntries = Object.entries(dev).filter(([key]) => key !== "fullName");

export default function About() {
  const typed = useTypingEffect(hero.typingPhrases);
  const [firstLine, secondLine] = hero.headline;

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28">
      {/* ── Background layers ─────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0" />
        <div className="glow-radial absolute -right-40 -top-40 h-[40rem] w-[40rem]" />
        <div className="glow-radial absolute -bottom-60 -left-60 h-[36rem] w-[36rem] opacity-60" />
        {/* the "slash of light" cutting across the hero */}
        <div className="absolute -left-[10%] top-[68%] h-px w-[120%] -rotate-[8deg] bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" />
        {DOTS.map((dot, i) => (
          <span
            key={i}
            className="absolute animate-float rounded-full bg-accent-500/60 shadow-glow-sm"
            style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size, animationDelay: dot.delay }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ── Text column (first → on top when stacked) ─────────────────── */}
        <div>
          {hero.showAvailability && (
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-subtle bg-card px-3 py-1.5 font-mono text-xs text-muted">
                {/* pulsing dot: solid dot + expanding `animate-ping` halo */}
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
                </span>
                {hero.availability}
              </span>
            </Reveal>
          )}

          <Reveal delay={100}>
            <p className="mt-8 font-mono text-sm text-accent-fg">{hero.greeting}</p>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-tighter text-primary sm:text-7xl lg:text-8xl">
              {firstLine}
              <br />
              {/* second line: accent gradient, like light catching a blade */}
              <span className="bg-gradient-to-r from-accent-500 via-accent-500 to-accent-800 bg-clip-text text-transparent">
                {secondLine}
              </span>
              <span className="text-accent-500">.</span>
            </h1>
          </Reveal>

          {/* ── dev object as a terminal-style code card ── */}
          <Reveal delay={300}>
            <div className="mt-8 max-w-lg drop-shadow-glow">
              <div className="frame cut [--cut:16px]">
                <div className="cut bg-card p-5 font-mono text-[12.5px] leading-relaxed [--cut:16px] sm:text-[13px]">
                  <div className="mb-3 flex items-center gap-2 border-b border-subtle pb-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-accent-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    <span className="ml-auto text-[11px] text-faint">dev.ts</span>
                  </div>
                  <p className="text-primary">
                    <span className="text-accent-fg">export const</span> dev = {"{"}
                  </p>
                  {codeEntries.map(([key, value]) => (
                    <p key={key} className="pl-4 text-muted">
                      {key}:{" "}
                      {Array.isArray(value) ? (
                        <>
                          [
                          {value.map((item: string, i: number) => (
                            <span key={item}>
                              <CodeString>{item}</CodeString>
                              {i < value.length - 1 ? ", " : ""}
                            </span>
                          ))}
                          ]
                        </>
                      ) : (
                        <CodeString>{String(value)}</CodeString>
                      )}
                      ,
                    </p>
                  ))}
                  <p className="text-primary">{"};"}</p>
                  {/* typewriter comment line */}
                  <p className="mt-2 min-h-[1.5em] text-faint" aria-label={hero.typingPhrases[0]}>
                    <span aria-hidden="true">{"// "}{typed}</span>
                    <span aria-hidden="true" className="ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[0.18em] animate-blink bg-accent-500" />
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* stack chips + location */}
          <Reveal delay={400}>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {dev.stack.map((item) => (
                <span key={item} className="skill-pill">
                  {item}
                </span>
              ))}
              <span className="ml-1 inline-flex items-center gap-1.5 font-mono text-xs text-faint">
                <PinIcon />
                {dev.based}
              </span>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <p className="mt-6 max-w-prose leading-relaxed text-muted">{hero.bio}</p>
          </Reveal>

          <Reveal delay={600}>
            <div className="mt-10 flex flex-wrap gap-4 pl-1">
              <a href={hero.primaryButton.href} className="btn btn-primary">
                <span className="btn-label">
                  {hero.primaryButton.label}
                  <ArrowIcon />
                </span>
              </a>
              <a href={`mailto:${links.email}`} className="btn btn-outline">
                <span className="btn-label">{hero.secondaryButton.label}</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* ── Visual column: anime gear cluster ───────────────────────── */}
        <Reveal delay={400} className="relative w-full">
          <GearCluster />
        </Reveal>
      </div>

      {/* Scroll cue */}
      <a
        href="#education"
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-faint transition-colors hover:text-accent-fg sm:flex"
      >
        {hero.scrollCue}
        <span className="h-10 w-px bg-gradient-to-b from-accent-500 to-transparent" />
      </a>
    </section>
  );
}

function CodeString({ children }: { children: string }) {
  return <span className="text-emerald-600 dark:text-emerald-400/90">&quot;{children}&quot;</span>;
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-500" aria-hidden="true">
      <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
