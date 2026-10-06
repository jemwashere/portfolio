"use client";

import { useState } from "react";
import { education, educationLabels, sections, type Education as EducationItem } from "@/lib/data";
import SectionWrapper, { Reveal } from "./SectionWrapper";

export default function Education() {
  return (
    <SectionWrapper {...sections.education} glow="left">
      <div className="space-y-6">
        {education.map((item, i) => (
          <Reveal key={item.id} delay={150 + i * 100}>
            <EducationCard item={item} />
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}

/**
 * Expandable card.
 *  - Desktop: hovering the card (`.group:hover`) expands `.expandable` and flips the chevron.
 *  - Touch / click: the header button toggles `data-open`, which pins it open.
 *  - Keyboard: focusing the button (`:has(:focus-visible)`) expands it too.
 * The expand logic is pure CSS in globals.css ("EXPAND-ON-HOVER").
 */
function EducationCard({ item }: { item: EducationItem }) {
  const [open, setOpen] = useState(false);
  const panelId = `education-${item.id}-details`;

  return (
    <article
      data-open={open}
      className="group relative transition duration-300 hover:-translate-y-1 hover:drop-shadow-glow data-[open=true]:drop-shadow-glow"
    >
      <div className="frame cut [--cut:22px]">
        <div className="cut relative overflow-hidden bg-card [--cut:22px]">
          {/* faint accent wash that fades in on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-500/[0.07] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((isOpen) => !isOpen)}
            className="relative flex w-full items-start gap-4 p-6 text-left focus-visible:outline-none sm:gap-6 sm:p-8"
          >
            <span className="grid h-12 w-12 shrink-0 -skew-x-6 place-items-center border border-accent-500/40 bg-accent-500/10 text-accent-500">
              <CapIcon />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block font-mono text-xs uppercase tracking-widest text-accent-fg">
                {item.yearRange}
                {item.level && <span className="text-faint"> · {item.level}</span>}
              </span>
              <span className="mt-2 block text-xl font-bold tracking-tight text-primary sm:text-2xl">{item.school}</span>
              <span className="mt-1 block text-muted">{item.program}</span>
              {item.location && <span className="mt-2 block font-mono text-xs text-faint">{item.location}</span>}
              <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.25em] text-faint transition-opacity duration-300 group-hover:opacity-0 group-data-[open=true]:opacity-0">
                {educationLabels.expandHint}
              </span>
            </span>

            <span className="chevron mt-1 grid h-11 w-11 shrink-0 place-items-center text-faint group-hover:text-accent-500">
              <ChevronIcon />
            </span>
          </button>

          {/* ── Hidden details: grid-rows 0fr → 1fr on hover/open ── */}
          <div id={panelId} className="expandable relative">
            <div>
              <div className="mx-6 grid gap-8 border-t border-subtle pb-8 pt-6 sm:mx-8 md:grid-cols-[1fr_auto]">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-faint">{educationLabels.detailsHeading}</h4>
                  <ul className="mt-3 space-y-2">
                    {item.details.map((detail) => (
                      <li key={detail} className="flex gap-3 text-sm text-muted">
                        <span aria-hidden="true" className="mt-1.5 h-3 w-[2px] shrink-0 skew-x-[-20deg] bg-accent-500" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:text-right">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-faint">{educationLabels.gpaLabel}</h4>
                  <p className="mt-2 text-4xl font-black tracking-tight text-primary">{item.gpa}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function CapIcon() {
  return (
    <svg className="skew-x-6" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c3 2 9 2 12 0v-5" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
