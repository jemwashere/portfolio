import { useEffect, useState } from "react";

/**
 * Current vertical scroll offset in px.
 * Updates are batched with requestAnimationFrame so we re-render at most
 * once per frame, and the listener is passive so scrolling never blocks.
 */
export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrollY(window.scrollY);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update(); // sync on mount (e.g. page reloaded mid-scroll)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return scrollY;
}
