/**
 * Central GSAP configuration. Everything imports from here rather than the
 * package, so plugins register once and reduced motion is decided in one place.
 */

import gsap from 'gsap';

/* Neither plugin is here any more, and both were on the first screen's
   critical path because the hero imports this file.

   ScrollTrigger and Lenis are 64KB and nothing on the first screen scrolls;
   `scrollMotion.js` fetches them for the first caller that does. SplitText is
   `textMotion.js`, which travels in the chunk of the one section that still
   splits by line — the hero splits its own headline in the markup. */

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

export { gsap };
