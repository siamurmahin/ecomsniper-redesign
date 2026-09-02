import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion, MOTION } from '../lib/motion';

/**
 * One `ScrollTrigger.refresh()` for the whole page, however many sections ask
 * for it.
 *
 * `refresh()` is global: it re-measures every trigger on the document, not the
 * caller's. Seventeen sections use this hook, so seventeen of them resolved
 * `document.fonts.ready` in the same microtask and each re-measured the whole
 * page — the same work, seventeen times, all before first paint. It showed up
 * in a production trace as 555ms of forced reflow inside GSAP.
 *
 * Collapsing them on a frame keeps the behaviour (measurements still land
 * after fonts settle) and does the work once. A late-mounting section still
 * gets its own refresh, because the handle is cleared when the frame runs.
 */
let pendingRefresh = 0;

const scheduleRefresh = () => {
  cancelAnimationFrame(pendingRefresh);
  pendingRefresh = requestAnimationFrame(() => {
    pendingRefresh = 0;
    ScrollTrigger.refresh();
  });
};

/**
 * Reveals every `[data-reveal]` descendant of the returned ref as it scrolls
 * in. The hiding CSS only applies while JS runs, so no-JS and reduced-motion
 * visitors never lose content. A shared `data-reveal-group` staggers together.
 *
 * @param {object} [options]
 * @param {string} [options.start] ScrollTrigger start position.
 * @param {number} [options.y] Vertical travel in pixels.
 * @returns {import('react').RefObject<HTMLElement>} ref to attach to the section
 */
export function useRevealOnScroll({ start = 'top 82%', y = MOTION.rise } = {}) {
  const scopeRef = useRef(null);

  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return undefined;

    // Reduced motion: show everything immediately, register nothing.
    if (prefersReducedMotion()) {
      gsap.set(scope.querySelectorAll('[data-reveal]'), { opacity: 1, y: 0, clearProps: 'all' });
      return undefined;
    }

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray('[data-reveal]', scope);
      if (!targets.length) return;

      // Bucket targets by group so related items rise together.
      const groups = new Map();
      targets.forEach((el) => {
        const key = el.dataset.revealGroup ?? '__solo__' + groups.size;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(el);
      });

      groups.forEach((els) => {
        gsap.fromTo(
          els,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.duration,
            ease: MOTION.ease,
            stagger: MOTION.stagger,
            /* Promote for the entrance, then hand the layer back. A permanent
               will-change left ~97 live compositor layers on the homepage,
               which the compositor re-rasterises during scroll. */
            onStart: () => gsap.set(els, { willChange: 'transform, opacity' }),
            onComplete: () => gsap.set(els, { willChange: 'auto' }),
            scrollTrigger: { trigger: els[0], start, once: true },
          },
        );
      });
    }, scope);

    // Layout settles after fonts load; refresh so triggers use final positions.
    // Shared and frame-collapsed — see `scheduleRefresh` above.
    document.fonts?.ready.then(scheduleRefresh);

    return () => ctx.revert();
  }, [start, y]);

  return scopeRef;
}
