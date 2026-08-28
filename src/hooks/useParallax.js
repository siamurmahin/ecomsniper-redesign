import { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';

/**
 * Scroll-linked parallax for a single element. `speed` is the fraction of the
 * scrolled distance travelled against the page; past ~0.35 it reads as broken
 * rather than deep.
 *
 * @param {number} [speed] Parallax factor, roughly -0.4 … 0.4.
 * @param {object} [options]
 * @param {'y'|'x'} [options.axis] Axis to translate on.
 * @param {number} [options.scale] Optional scale travelled across the scroll.
 */
export function useParallax(speed = 0.18, { axis = 'y', scale } = {}) {
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    const el = elementRef.current;
    if (!el || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      // Travel is measured against the viewport so the effect is resolution-stable.
      const distance = window.innerHeight * speed;

      gsap.fromTo(
        el,
        { [axis]: -distance, ...(scale ? { scale: 1 } : {}) },
        {
          [axis]: distance,
          ...(scale ? { scale } : {}),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true, // tie the tween directly to scroll position
            invalidateOnRefresh: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [speed, axis, scale]);

  return elementRef;
}
