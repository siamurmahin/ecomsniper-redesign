import { useEffect, useState } from 'react';
import { HERO_READY_EVENT, isHeroReady } from '../../lib/heroReady';

/**
 * Holds its children back until the hero has painted and finished animating.
 *
 * The homepage is ~4,500 nodes and React mounted all of it in one blocking
 * ~450ms pass with the screen blank. Waiting for paint alone was not enough:
 * that dropped the work into the middle of the hero's entrance instead, so a
 * frame ran 283ms and the hero stuttered through its own animation.
 *
 * Not viewport-based lazy mounting: that would leave the page with no stable
 * height, anchors that do not exist yet, and a broken find-in-page.
 */

/**
 * A deep link has to find its target immediately.
 *
 * `/#training` scrolls on mount, and a target that has not rendered yet is a
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

/**
 * Whether React has finished attaching to the prerendered document.
 *
 * The page is built to HTML ahead of time, so the document a visitor receives
 * already contains all fifteen sections. Deferring during hydration would
 * render nothing where the browser can see something, and React would take the
 * page apart and build it again — the opposite of what this component is for.
 *
 * So the first render on a page load mounts everything, matching the HTML.
 * The deferral is for what it was always for: a page React has to build
 * itself, which now means a client-side navigation to a route the visitor did
 * not land on.
 *
 * Module-level rather than a hook because hydration happens once per document,
 * not once per component.
 */
let hasHydrated = false;

export default function DeferUntilPainted({ children }) {
  const [isHydrating] = useState(() => !hasHydrated);
  const [isReady, setIsReady] = useState(() => isHydrating || needsEverythingNow());

  useEffect(() => {
    hasHydrated = true;
  }, []);

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
