import { useContent } from '../../hooks/useContent';
import { useCallback, useEffect, useState } from 'react';
import Icon from '../ui/Icon';
import { scrollToTarget } from '../../lib/smoothScroll';

/**
 * Back to the top of a very long page — 17,000px on a desktop, 22,000 on a
 * phone, with the nav the only other way back.
 *
 * Goes through scrollToTarget, never window.scrollTo: Lenis keeps its own
 * position, and scrolling behind its back leaves it stale. Sits above the
 * sticky bar, offset by that bar's published height.
 */

/** Roughly a screen and a half down before it is worth offering. */
const SHOW_AFTER = 1.6;

/** Measured directly, so the first answer does not wait on a frame. */
const pastThreshold = () =>
  typeof window !== 'undefined' && window.scrollY > window.innerHeight * SHOW_AFTER;

export default function BackToTop() {
  const { A11Y } = useContent();
  /* Was false until a requestAnimationFrame resolved. A background tab does
     not run frames, so a page restored mid-scroll showed no button until the
     next wheel tick. The first answer is cheap; measure it. */
  const [isVisible, setIsVisible] = useState(pastThreshold);

  /*
   * Set straight from the scroll handler. Batching it into a frame was the
   * bug: rAF does not run in a background tab, so the first pending id never
   * resolved and every later scroll returned early on it.
   */
  useEffect(() => {
    const onScroll = () => setIsVisible(pastThreshold());

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const toTop = useCallback(() => scrollToTarget(0), []);

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={A11Y.backToTop}
      /* `hidden` rather than only faded out: an invisible fixed button still
         takes the clicks aimed at whatever is under it, and this one sits over
         the page's own content. */
      hidden={!isVisible}
      /* Ink, not paper. A white disc with a hairline border, on a page that is
         almost entirely white, sitting directly above a dark bar the eye reads
         instead — it was there and nobody could find it. */
      className={`group fixed right-4 z-50 grid size-12 place-items-center rounded-full border border-ink-line bg-ink text-paper shadow-float transition-[opacity,transform] duration-400 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-accent hover:border-accent sm:right-6 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      /* The bar measures and publishes its own height; this clears it. */
      style={{ bottom: 'calc(var(--sticky-cta-height, 4.25rem) + 1rem)' }}
    >
      <Icon
        name="chevronDown"
        className="size-5 rotate-180 transition-transform duration-300 group-hover:-translate-y-0.5"
      />
    </button>
  );
}
