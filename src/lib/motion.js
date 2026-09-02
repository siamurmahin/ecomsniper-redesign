/**
 * Central GSAP configuration. Everything imports from here rather than the
 * package, so plugins register once and reduced motion is decided in one place.
 */

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

// SplitText ships with GSAP from 3.13 — a registration, not a dependency.
// It is here rather than behind a fetch because the hero's entrance needs it
// in the same breath as the hero itself.
gsap.registerPlugin(SplitText);

/* ScrollTrigger is not here: nothing on the first screen scrolls, and it and
   Lenis are 64KB. `scrollMotion.js` fetches it for the first caller that
   needs it — the reveals, the smooth scrolling, a route re-measure. */

gsap.defaults({ ease: 'expo.out', duration: 1 });

/** True when the visitor has asked the OS to reduce motion. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Shared easing and distances so every section animates with one voice. */
export const MOTION = {
  ease: 'expo.out',
  easeSoft: 'power3.out',
  rise: 28, // default y offset for reveals
  stagger: 0.08,
  duration: 0.9,
};

export { gsap, SplitText };
