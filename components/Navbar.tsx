"use client";

import { useEffect, useState } from "react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { dev, links, navbar, navLinks } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

const SCROLL_THRESHOLD = 40; // px scrolled before the navbar gets its glass backdrop
const DESKTOP_BREAKPOINT = 1024; // matches Tailwind `lg`: links inline at ≥ 1024px

export default function Navbar() {
  const scrollY = useScrollPosition();
  const scrolled = scrollY > SCROLL_THRESHOLD;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(navLinks[0].id);

  // Scroll-spy: the active link is the last section whose top has passed
  // ~40% of the viewport. At the very bottom, force the last link (the
  // footer is too short to ever reach that line on tall screens).
  useEffect(() => {
    const atBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 8;
    if (atBottom) {
      setActive(navLinks[navLinks.length - 1].id);
      return;
    }
    let current = navLinks[0].id;
    for (const { id } of navLinks) {
      const section = document.getElementById(id);
      if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
    }
    setActive(current);
  }, [scrollY]);

  // Close the mobile menu with Escape, or when resizing up to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= DESKTOP_BREAKPOINT && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        open
          ? "border-accent-500/20 bg-base" // solid while the mobile menu is open
          : scrolled
            ? "border-accent-500/20 bg-[#fafafa]/70 backdrop-blur-md dark:bg-black/60"
            : "border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Logo: slanted accent chip + handle */}
        <a href="#home" className="group flex min-h-[44px] items-center gap-2.5 font-mono text-sm" onClick={() => setOpen(false)}>
          <span className="grid h-7 w-7 -skew-x-12 place-items-center bg-accent-600 text-xs font-bold text-white transition-shadow duration-300 group-hover:shadow-glow">
            <span className="skew-x-12">{dev.name.charAt(0)}</span>
          </span>
          <span className="font-semibold text-primary">
            {navbar.logo}
            <span className="text-accent-fg">{navbar.logoSuffix}</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`nav-link ${active === id ? "is-active" : ""}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <a href={links.resume} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
            <span className="btn-label">{navbar.resumeLabel}</span>
          </a>
          <ThemeToggle />

          {/* Hamburger (below lg): three bars morph into an X */}
          <button
            type="button"
            className="grid h-11 w-11 place-items-center lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((isOpen) => !isOpen)}
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={`absolute left-0 top-0 h-0.5 w-6 bg-primary transition-transform duration-300 ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-4 bg-accent-500 transition-opacity duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-6 bg-primary transition-transform duration-300 ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile slide-down panel: same 0fr → 1fr grid trick as the cards */}
      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="mx-5 flex flex-col border-t border-subtle py-3">
            {navLinks.map(({ id, label }, i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-[48px] items-center gap-3 font-mono text-sm transition-colors ${
                    active === id ? "text-accent-fg" : "text-muted hover:text-primary"
                  }`}
                >
                  <span className="text-xs text-faint">{String(i).padStart(2, "0")}</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
