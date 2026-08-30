import { useEffect, useState } from 'react';
import { HERO_READY_EVENT, isHeroReady } from '../../lib/heroReady';

/**
 * Holds its children back until the first screen has both painted AND finished
 * animating.
 *
 * The homepage is eighteen sections and about 4,500 DOM nodes, and React
 * mounted all of it in one synchronous pass before anything could appear —
 * 4,500 nodes plus seventeen sections' worth of GSAP contexts, ScrollTriggers
 * and SplitText, measured as a single ~450ms blocking task with the whole
 * screen blank behind it.
 *
 * WAITING FOR THE PAINT ALONE WAS NOT ENOUGH, and this is the part that is
 * easy to get wrong. Mounting one frame after first paint moves that work
 * straight into the middle of the hero's entrance: measured on a reload, the
 * opening frames ran 16.7, 83.4, 16.8, 16.7, 283.5, 33.4 … ms. A 283ms frame
 * is seventeen dropped in a row, and the hero stutters through its own
 * animation — which is worse than the blank screen it replaced, because now
 * the visitor is watching it happen.
 *
 * So the trigger is the hero's own completion signal. First screen paints
 * fast, animates on a main thread nobody else is using, and the remaining
 * sixteen sections mount the moment it is done.
 *
 * DELIBERATELY NOT viewport-based lazy mounting. Mounting sections as they
 * approach the viewport would save more, and would also mean the page has no
 * stable height, anchor targets that do not exist until you scroll near them,
 * and a find-in-page that only searches what you have already seen.
 */

/**
 * A deep link has to find its target immediately.
 *
 * `/#pricing` scrolls on mount, and a target that has not rendered yet is a
 * target the router cannot find — the page would silently stay at the top.
 * Deferring is a load-time optimisation for the common case; correctness for
 * the deep-link case is worth more than the frame it costs.
 */
const needsEverythingNow = () =>
  (typeof window !== 'undefined' && window.location.hash.length > 1) ||
  // The hero may have announced before this subscribed — see `heroReady`.
  isHeroReady();

/**
 * Backstop, in ms. The signal should arrive at ~950ms once the hero's
 * timeline ends. If the hero is not on the page, threw, or never animates,
 * the rest of the site must still exist.
 */
const FALLBACK_DELAY = 1400;

export default function DeferUntilPainted({ children }) {
  const [isReady, setIsReady] = useState(needsEverythingNow);

  useEffect(() => {
    if (isReady) return undefined;

    const reveal = () => setIsReady(true);

    window.addEventListener(HERO_READY_EVENT, reveal, { once: true });
    const timer = window.setTimeout(reveal, FALLBACK_DELAY);

    return () => {
      window.removeEventListener(HERO_READY_EVENT, reveal);
      clearTimeout(timer);
    };
  }, [isReady]);

  return isReady ? children : null;
}
