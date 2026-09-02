import { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion, MOTION } from '../lib/motion';
import { getScrollTrigger, loadScrollTrigger } from '../lib/scrollMotion';

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
    getScrollTrigger()?.refresh();
  });
};

/**
 * How far ahead of the viewport a section builds its triggers.
 *
 * Creating a ScrollTrigger measures the page there and then, and fifteen
 * sections were doing that inside the commit that mounted them. A trace at 4x
 * CPU put 40-80% of every blocking frame in forced layout — the browser being
 * asked for geometry it had just been told to recompute.
 *
 * A screen and a half ahead: far enough that the trigger is always in place
 * before its section can be reached, even on a flick, and near enough that a
 * section three screens down costs nothing at load.
 */
const BUILD_MARGIN = '1500px 0px';

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

    const setUp = () => {
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
    };

    let ctx = null;
    let cancelled = false;

    const build = () => {
      if (cancelled) return;
      ctx = gsap.context(setUp, scope);

      /* Layout settles after fonts load; refresh so triggers use final
         positions. Shared and frame-collapsed — see `scheduleRefresh` above.
         Only while the fonts are still arriving: a section built later
         measured itself against the final glyphs already, and a global
         refresh per section mid-scroll is the work this hook exists to
         avoid. */
      if (document.fonts && document.fonts.status !== 'loaded') {
        document.fonts.ready.then(scheduleRefresh);
      }
    };

    /* Built on approach rather than on mount — see `BUILD_MARGIN` — and the
       plugin itself is fetched by whichever section approaches first. */
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        loadScrollTrigger().then(build);
      },
      { rootMargin: BUILD_MARGIN },
    );

    observer.observe(scope);

    return () => {
      cancelled = true;
      observer.disconnect();
      ctx?.revert();
    };
  }, [start, y]);

  return scopeRef;
}
