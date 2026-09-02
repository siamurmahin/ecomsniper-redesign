/**
 * Shared handle on the page's Lenis instance. Everything that moves the page
 * goes through here, or native scrolling and Lenis fight over the position.
 * Falls back to an instant jump when Lenis is absent — touch, reduced motion.
 */

let lenisInstance = null;

/** Height of the fixed header, so anchored headings are not hidden under it. */
export const HEADER_SCROLL_OFFSET = 96;

export const registerLenis = (instance) => {
  lenisInstance = instance;
};

export const unregisterLenis = () => {
  lenisInstance = null;
};

export const getLenis = () => lenisInstance;

/**
 * Eased at both ends, for travel the reader did not start with a wheel.
 * Lenis' own curve puts a third of the distance into the first 50ms, which
 * reads as a teleport on a long trip.
 */
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/** Seconds per pixel travelled, and the bounds that keeps it sane. */
const SECONDS_PER_PIXEL = 1 / 2200;
const MIN_DURATION = 0.7;
const MAX_DURATION = 1.5;

/**
 * Scroll to an element or a Y position.
 *
 * @param {Element|number} target Element to reveal, or a Y offset.
 * @param {object} [options]
 * @param {boolean} [options.immediate] Jump rather than animate.
 */
export function scrollToTarget(target, { immediate = false } = {}) {
  const lenis = lenisInstance;

  if (lenis) {
    /*
     * Time scales with the trip: one fixed duration cannot serve both a hop
     * to the next section and a run the length of the page.
     */
    const from = window.scrollY;
    const to =
      typeof target === 'number'
        ? target
        : from + target.getBoundingClientRect().top - HEADER_SCROLL_OFFSET;
    const distance = Math.abs(to - from);
    const duration = Math.min(
      MAX_DURATION,
      Math.max(MIN_DURATION, distance * SECONDS_PER_PIXEL),
    );

    lenis.scrollTo(target, {
      offset: typeof target === 'number' ? 0 : -HEADER_SCROLL_OFFSET,
      immediate,
      duration: immediate ? 0 : duration,
      easing: easeInOutCubic,
    });
    return;
  }

  // No Lenis: `scroll-margin-top` in the stylesheet handles the header offset.
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
  } else {
    target.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth', block: 'start' });
  }
}
