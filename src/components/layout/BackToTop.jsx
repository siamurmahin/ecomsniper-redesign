import { useCallback, useEffect, useRef, useState } from 'react';
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

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const frameRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = 0;
        setIsVisible(window.scrollY > window.innerHeight * SHOW_AFTER);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frameRef.current);
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
      className={`group fixed right-4 z-40 grid size-12 place-items-center rounded-full border border-hairline bg-paper text-ink shadow-float transition-[opacity,transform] duration-400 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-ink hover:text-paper sm:right-6 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ bottom: 'calc(var(--sticky-cta-height) + 1rem)' }}
    >
      <Icon
        name="chevronDown"
        className="size-5 rotate-180 transition-transform duration-300 group-hover:-translate-y-0.5"
      />
    </button>
  );
}
