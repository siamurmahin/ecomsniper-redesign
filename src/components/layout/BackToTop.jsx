import { useCallback, useEffect, useState } from 'react';
import Icon from '../ui/Icon';
import { scrollToTarget } from '../../lib/smoothScroll';

/**
 * Back to the top of a very long page.
 *
 * The homepage runs to about 17,000px on a desktop and 22,000px on a phone.
 * Getting back to the header from the FAQ is a long drag on a trackpad and a
 * lot of thumb on a phone, and the nav is the only way back to any of the
 * anchors.
 *
 * SCROLLS THROUGH LENIS, never `window.scrollTo`. Lenis owns the scroll
 * position and keeps its own target; a native scroll behind its back leaves it
 * stale and the page slides back on the next wheel tick. `scrollToTarget`
 * is the shared helper every other jump on this site already routes through,
 * and it eases from rest rather than using Lenis' own wheel curve, which puts
 * a third of the distance into the first 50ms and reads as a teleport on a
 * trip this long.
 *
 * It sits above the sticky conversion bar, offset by that bar's own height
 * token so the two cannot overlap when it is showing.
 */

/** Roughly a screen and a half down before it is worth offering. */
const SHOW_AFTER = 1.6;

/** Measured directly, so the first answer does not wait on a frame. */
const pastThreshold = () =>
  typeof window !== 'undefined' && window.scrollY > window.innerHeight * SHOW_AFTER;

export default function BackToTop() {
  /* Was false until a requestAnimationFrame resolved. A background tab does
     not run frames, so a page restored mid-scroll showed no button until the
     next wheel tick. The first answer is cheap; measure it. */
  const [isVisible, setIsVisible] = useState(pastThreshold);

  /*
   * Set straight from the scroll handler, not batched into a frame.
   *
   * The frame was the bug. requestAnimationFrame does not run in a background
   * tab, so the first scroll set a pending id that never resolved, and every
   * later scroll returned early on that same id — the button stayed hidden for
   * the rest of the session. The work being deferred is one comparison, and
   * React drops a setState that does not change the value, so there is nothing
   * here worth a frame.
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
      aria-label="Back to top"
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
