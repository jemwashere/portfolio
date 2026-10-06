"use client";

import { useInView } from "@/hooks/useInView";
import { sections, skillGroups, type SkillGroup } from "@/lib/data";
import SectionWrapper from "./SectionWrapper";

export default function Skills() {
  return (
    <SectionWrapper {...sections.skills} glow="left">
      <div className="grid items-start gap-6 md:grid-cols-2">
        {skillGroups.map((group, i) => (
          <SkillCard key={group.id} group={group} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}

/**
 * One category card. When it scrolls into view the card slides up
 * (staggered by `index`), then its pills pop in one by one.
 */
function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const { ref, inView } = useInView<HTMLElement>();
  const cardDelay = 150 + index * 120;
  const hasNotes = group.items.some((item) => item.note);

  return (
    <article
      ref={ref}
      className={`group transition duration-300 ease-out hover:-translate-y-1 hover:drop-shadow-glow ${
        inView ? "animate-slide-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${cardDelay}ms` }}
    >
      <div className="frame cut h-full">
        <div className="cut h-full bg-card p-6 sm:p-7">
          <h3 className="flex items-center gap-3 font-mono text-sm font-semibold uppercase tracking-widest text-accent-fg">
            <span className="text-faint">{String(index + 1).padStart(2, "0")}</span>
            {group.category}
          </h3>

          {hasNotes ? (
            // Pill + explanation rows
            <ul className="mt-5 space-y-4">
              {group.items.map((item, j) => (
                <li
                  key={item.name}
                  className={inView ? "animate-pop-in" : "opacity-0"}
                  style={{ animationDelay: `${cardDelay + 300 + j * 60}ms` }}
                >
                  <span className="skill-pill">{item.name}</span>
                  {item.note && <p className="mt-1.5 pl-1 text-sm leading-relaxed text-muted">{item.note}</p>}
                </li>
              ))}
            </ul>
          ) : (
            // Compact pill cloud
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item, j) => (
                <li
                  key={item.name}
                  className={inView ? "animate-pop-in" : "opacity-0"}
                  style={{ animationDelay: `${cardDelay + 300 + j * 45}ms` }}
                >
                  <span className="skill-pill">{item.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}
