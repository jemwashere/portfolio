import type { ReactNode } from "react";
import { contact, dev, links, sections } from "@/lib/data";
import { Reveal, SectionHeading } from "./SectionWrapper";

/** Splits the contact title so one word (contact.titleAccentWord) is red. */
function accentTitle(title: string, word: string): ReactNode {
  const at = title.indexOf(word);
  if (!word || at === -1) return title;
  return (
    <>
      {title.slice(0, at)}
      <span className="text-accent-fg">{word}</span>
      {title.slice(at + word.length)}
    </>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const socials: { label: string; href: string; icon: ReactNode }[] = [
    { label: "GitHub", href: links.github, icon: <GitHubIcon /> },
    { label: "Email", href: `mailto:${links.email}`, icon: <MailIcon /> },
  ];

  return (
    <footer id={sections.contact.id} className="relative overflow-hidden pt-24">
      <div aria-hidden="true" className="glow-radial pointer-events-none absolute -bottom-40 left-1/2 h-[30rem] w-[40rem] -translate-x-1/2" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading {...sections.contact} title={accentTitle(sections.contact.title, contact.titleAccentWord)} />

        <Reveal delay={150}>
          <p className="max-w-prose leading-relaxed text-muted">{contact.message}</p>
          <a
            href={`mailto:${links.email}`}
            className="mt-4 inline-flex min-h-[44px] items-center break-all font-mono text-sm text-primary underline decoration-accent-500/50 underline-offset-4 transition-colors hover:text-accent-fg hover:decoration-accent-500"
          >
            {links.email}
          </a>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-6 flex flex-wrap items-center gap-6 pl-1">
            <a href={`mailto:${links.email}`} className="btn btn-primary">
              <span className="btn-label">{contact.buttonLabel}</span>
            </a>
            <ul className="flex items-center gap-2">
              {socials.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="grid h-11 w-11 place-items-center border border-subtle text-faint transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-500 hover:text-accent-fg hover:shadow-glow-sm"
                  >
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* Thin red gradient divider */}
      <div aria-hidden="true" className="relative mt-24 h-px bg-gradient-to-r from-transparent via-accent-500/60 to-transparent" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-8 text-center text-sm text-faint sm:flex-row sm:px-8 sm:text-left">
        <p>
          © {year} {dev.fullName}. {contact.builtWith}
        </p>
        <a href="#home" className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs uppercase tracking-wider transition-colors hover:text-accent-fg">
          {contact.backToTop}
        </a>
      </div>
    </footer>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
