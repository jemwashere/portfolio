"use client";

import { sections, seminars } from "@/lib/data";
import SectionWrapper, { Reveal } from "./SectionWrapper";

/** Vertical timeline: a red line with a glowing diamond + year badge per seminar. */
export default function Seminars() {
  return (
    <SectionWrapper {...sections.seminars} glow="right">
      <ol className="relative max-w-3xl space-y-8 pl-8 sm:pl-12">
        {/* the timeline rail */}
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-accent-500 via-accent-500/40 to-transparent"
        />
        {seminars.map((seminar, i) => (
          <li key={seminar.id} className="relative">
            <Reveal delay={150 + i * 120}>
              {/* glowing diamond node on the rail */}
              <span aria-hidden="true" className="absolute -left-8 top-7 grid h-4 w-4 place-items-center sm:-left-12">
                <span className="absolute h-4 w-4 rotate-45 animate-ping bg-accent-500/40" />
                <span className="relative h-3 w-3 rotate-45 bg-accent-500 shadow-glow" />
              </span>

              <article className="group transition duration-300 ease-out hover:-translate-y-1 hover:drop-shadow-glow">
                <div className="frame cut">
                  <div className="cut bg-card p-6 sm:p-7">
                    <span className="inline-flex -skew-x-12 bg-accent-500/[0.12] px-3 py-1 ring-1 ring-inset ring-accent-500/30">
                      <span className="skew-x-12 font-mono text-xs font-semibold tracking-widest text-accent-fg">
                        {seminar.year}
                      </span>
                    </span>
                    <h3 className="mt-4 text-xl font-bold tracking-tight text-primary transition-colors duration-300 group-hover:text-accent-fg">
                      {seminar.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted">{seminar.description}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </SectionWrapper>
  );
}
