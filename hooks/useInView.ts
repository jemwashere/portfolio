import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  /** How much of the element must be visible (0–1) before it counts as "in view". */
  threshold?: number;
  /** Shrinks the viewport's bottom edge so elements trigger a bit after they appear. */
  rootMargin?: string;
  /** Stop observing after the first reveal so the animation only plays once. */
  once?: boolean;
};

/**
 * Reports whether an element has scrolled into the viewport.
 *
 *   const { ref, inView } = useInView<HTMLDivElement>();
 *   <div ref={ref} className={inView ? "animate-slide-up" : "opacity-0"} />
 *
 * IntersectionObserver runs off the main thread, so this is far cheaper than
 * measuring positions in a scroll listener.
 */
export function useInView<T extends Element = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Very old browsers: just show everything.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect(); // reveal once, then stop watching
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
