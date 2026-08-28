/**
 * Shared handle on the page's Lenis instance.
 *
 * Anything that wants to move the page must go through here. Mixing native
 * smooth scrolling with Lenis makes the two ease toward different targets on
 * every frame, and the page visibly drifts on its own — so every programmatic
 * scroll is routed to Lenis when it exists, and falls back to an instant jump
 * when it does not (touch, reduced motion, no JS-driven scrolling).
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
 * Scrolls to an element or an absolute Y position.
 *
 * @param {Element|number} target Element to reveal, or a Y offset.
 * @param {object} [options]
 * @param {boolean} [options.immediate] Jump rather than animate.
 */
export function scrollToTarget(target, { immediate = false } = {}) {
  const lenis = lenisInstance;

  if (lenis) {
    lenis.scrollTo(target, {
      offset: typeof target === 'number' ? 0 : -HEADER_SCROLL_OFFSET,
      immediate,
      duration: immediate ? 0 : 1.1,
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
