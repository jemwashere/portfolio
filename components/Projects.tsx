"use client";

import { useState } from "react";
import { projectLabels, projects, sections, type Project } from "@/lib/data";
import SectionWrapper, { Reveal } from "./SectionWrapper";

export default function Projects() {
  return (
    <SectionWrapper {...sections.projects} glow="right">
      {/* 1 → 2 → 3 columns. items-start so an expanded card grows on its own. */}
      <ul className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <li key={project.id}>
            <Reveal delay={150 + (i % 3) * 100}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}

/**
 * No external link: the card itself is the interaction.
 *  - Hover (desktop): lifts, red border + glow, and the details panel expands.
 *  - Tap / click: toggles `data-open`, which keeps it expanded.
 *  - Keyboard: the chevron button is focusable and toggles it too.
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `project-${project.id}-details`;

  return (
    <article
      data-open={open}
      onClick={() => setOpen((isOpen) => !isOpen)}
      className="group relative cursor-pointer transition duration-300 ease-out hover:-translate-y-1 hover:drop-shadow-glow data-[open=true]:-translate-y-1 data-[open=true]:drop-shadow-glow"
    >
      <div className="frame cut">
        <div className="cut relative flex flex-col bg-card p-6">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-accent-fg">{`// ${String(index + 1).padStart(2, "0")}`}</span>
            {/* the click bubbles up to the <article>, which does the toggling */}
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={`${open ? "Hide" : "Show"} details for ${project.name}`}
              className="chevron -m-3 grid h-11 w-11 place-items-center text-faint group-hover:text-accent-500"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>

          <h3 className="mt-3 text-xl font-bold tracking-tight text-primary transition-colors duration-300 group-hover:text-accent-fg">
            {project.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted">{project.shortDescription}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
            {project.tech.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>

          {/* ── Hidden details: long description + full tool list ── */}
          <div id={panelId} className="expandable">
            <div>
              <div className="mt-5 border-t border-subtle pt-4">
                <p className="text-sm leading-relaxed text-muted">{project.longDescription}</p>
                <h4 className="mt-4 font-mono text-[11px] uppercase tracking-widest text-faint">{projectLabels.techHeading}</h4>
                <ul className="mt-2 space-y-1.5">
                  {project.tech.map((tech) => (
                    <li key={tech} className="flex items-center gap-2.5 text-sm text-primary">
                      <span aria-hidden="true" className="h-2.5 w-[2px] shrink-0 skew-x-[-20deg] bg-accent-500" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* hint: "Hover" on mouse devices, "Tap" on touch screens */}
          <span className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-faint transition-opacity duration-300 group-hover:opacity-0 group-data-[open=true]:opacity-0">
            <span className="hidden [@media(hover:hover)]:inline">{projectLabels.hoverHint}</span>
            <span className="[@media(hover:hover)]:hidden">{projectLabels.tapHint}</span>
          </span>
        </div>
      </div>
    </article>
  );
}
