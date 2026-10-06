import { useEffect, useState } from "react";

type TypingOptions = {
  typeSpeed?: number; // ms per character typed
  deleteSpeed?: number; // ms per character erased
  pauseMs?: number; // how long a finished phrase stays on screen
};

/**
 * Typewriter that types a phrase, pauses, erases it, then moves to the next.
 *
 * It's a tiny state machine driven by one timeout per step:
 *   typing   → add one char  … until the phrase is complete → pause
 *   pause    → switch to deleting
 *   deleting → drop one char … until empty → next phrase, typing again
 *
 * Users with "reduce motion" enabled just see the first phrase, static.
 * Pass a stable array (e.g. a module constant) so the effect doesn't restart.
 */
export function useTypingEffect(
  phrases: readonly string[],
  { typeSpeed = 65, deleteSpeed = 30, pauseMs = 1800 }: TypingOptions = {},
): string {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || phrases.length === 0) return;

    const current = phrases[index % phrases.length];

    // Phrase fully typed → hold it, then start erasing.
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }

    // Phrase fully erased → advance to the next one.
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    // Otherwise add or remove a single character.
    const t = setTimeout(
      () => setText(current.slice(0, text.length + (deleting ? -1 : 1))),
      deleting ? deleteSpeed : typeSpeed,
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, phrases, typeSpeed, deleteSpeed, pauseMs, reducedMotion]);

  return reducedMotion ? (phrases[0] ?? "") : text;
}
