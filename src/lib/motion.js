/**
 * Central GSAP configuration.
 *
 * Every component imports gsap and ScrollTrigger from here rather than from
 * the package directly, so plugins are registered exactly once and the
 * reduced-motion decision is made in a single place.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

/*
 * SplitText is bundled with GSAP itself from 3.13 — the whole plugin set is
 * free now, so this is a registration, not a dependency. It is registered
 * here rather than at the call site so a second component using it cannot
 * register it twice.
 */
gsap.registerPlugin(ScrollTrigger, SplitText);

// Fewer, cheaper ScrollTrigger recalculations on mobile address-bar resize.
ScrollTrigger.config({ ignoreMobileResize: true });

gsap.defaults({ ease: 'expo.out', duration: 1 });

/** True when the visitor has asked the OS to reduce motion. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Shared easing + distance values so every section animates with one voice.
 * Distances are deliberately small — premium reads as restrained, not bouncy.
 */
export const MOTION = {
  ease: 'expo.out',
  easeSoft: 'power3.out',
  rise: 28, // default y offset for reveals
  stagger: 0.08,
  duration: 0.9,
};

export { gsap, ScrollTrigger, SplitText };
