/**
 * Central GSAP configuration. Everything imports from here rather than the
 * package, so plugins register once and reduced motion is decided in one place.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// SplitText ships with GSAP from 3.13 — a registration, not a dependency.
gsap.registerPlugin(ScrollTrigger, SplitText);

// Fewer, cheaper ScrollTrigger recalculations on mobile address-bar resize.
ScrollTrigger.config({ ignoreMobileResize: true });

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

export { gsap, ScrollTrigger, SplitText };
