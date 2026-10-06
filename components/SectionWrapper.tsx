"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

/* --------------------------------------------------------------------------
   <Reveal>: the scroll-in animation primitive.
   Starts invisible; the first time it enters the viewport it gets
   `animate-slide-up` (fade + rise 40px). Pass `delay` to stagger siblings:
     items.map((x, i) => <Reveal delay={i * 100}>…</Reveal>)
   The keyframe uses `fill-mode: both`, so it stays hidden during its delay.
   -------------------------------------------------------------------------- */
type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${inView ? "animate-slide-up" : "opacity-0"} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* --------------------------------------------------------------------------
   <SectionHeading>: "01 — Eyebrow" label, big title, red slash bar,
   and a faint kanji numeral floating behind it.
   -------------------------------------------------------------------------- */
type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  kanji: string;
};

export function SectionHeading({ index, eyebrow, title, kanji }: SectionHeadingProps) {
  return (
    <Reveal className="relative mb-12 sm:mb-16">
      <span aria-hidden="true" className="kanji absolute -left-2 -top-14 text-[7rem] sm:-left-6 sm:-top-20 sm:text-[10rem]">
        {kanji}
      </span>
      <p className="relative font-mono text-xs uppercase tracking-[0.3em] text-accent-fg">
        {index} <span className="text-faint">—</span> {eyebrow}
      </p>
      <h2 className="relative mt-3 text-3xl font-bold tracking-tight text-primary sm:text-5xl">{title}</h2>
      <div className="accent-bar relative mt-5" />
    </Reveal>
  );
}

/* --------------------------------------------------------------------------
   <SectionWrapper>: consistent spacing, max width, heading and a soft red
   radial glow tucked into one corner of every section.
   -------------------------------------------------------------------------- */
type SectionWrapperProps = SectionHeadingProps & {
  id: string;
  children: ReactNode;
  glow?: "left" | "right";
};

export default function SectionWrapper({ id, glow = "right", children, ...heading }: SectionWrapperProps) {
  return (
    <section id={id} className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden="true"
        className={`glow-radial pointer-events-none absolute -top-40 h-[28rem] w-[28rem] ${
          glow === "right" ? "-right-40" : "-left-40"
        }`}
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading {...heading} />
        {children}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   <SlashDivider>: hairline red gradient with a double "katana slash" mark.
   -------------------------------------------------------------------------- */
export function SlashDivider() {
  return (
    <div aria-hidden="true" className="mx-auto flex max-w-6xl items-center px-5 sm:px-8">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent-500/50" />
      <div className="mx-3 flex gap-1.5">
        <span className="h-4 w-[3px] skew-x-[-30deg] bg-accent-500 shadow-glow-sm" />
        <span className="h-4 w-[3px] skew-x-[-30deg] bg-accent-500/50" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent-500/50" />
    </div>
  );
}
