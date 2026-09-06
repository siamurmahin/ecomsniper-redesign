import { useSyncExternalStore } from 'react';

/**
 * Whether the visitor has asked the OS to reduce motion, read in a way that
 * survives hydration.
 *
 * `prefersReducedMotion()` from `lib/motion` is the right thing to call from
 * an effect, where the DOM already exists. Called during render it is a
 * hydration bug: the prerender has no `window`, so it always renders the
 * animated branch into the HTML, and a visitor with the preference set renders
 * the still one. React 19 does not patch that up — it reports
 * `Hydration failed because the server rendered HTML didn't match the client`
 * and **regenerates the whole tree on the client**, throwing away the
 * prerendered document it was handed. Everything the prerender bought is lost,
 * and `js-motion` — set on `<html>` by the inline script before first paint —
 * goes with it, so nothing on the page can animate for the rest of the visit.
 *
 * `useSyncExternalStore` is the mechanism React provides for exactly this. The
 * server snapshot is `false`, which is what the prerender rendered, so the
 * first client render matches the HTML byte for byte; the real value arrives in
 * the render immediately after and the still markup replaces the animated
 * markup as a normal update rather than a mismatch. Reduced motion is a media
 * query, so the subscription also means toggling the OS setting takes effect
 * without a reload — free, and the correct behaviour.
 *
 * Nothing is added to the bundle: `useSyncExternalStore` is part of React.
 *
 * Use this anywhere the answer decides what is **rendered**. Anywhere it only
 * decides what an effect does — `useRevealOnScroll`, `useParallax`,
 * `SmoothScrollProvider` — keep calling `prefersReducedMotion()`, which runs
 * after hydration and cannot mismatch anything.
 */

const QUERY = '(prefers-reduced-motion: reduce)';

const mediaQuery = () =>
  typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(QUERY) : null;

const subscribe = (onChange) => {
  const mql = mediaQuery();
  if (!mql) return () => {};

  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
};

const getSnapshot = () => mediaQuery()?.matches ?? false;

/* What the prerender rendered. Also what React uses for the hydrating render,
   which is the whole point of this file. */
const getServerSnapshot = () => false;

/** @returns {boolean} true when the visitor has asked the OS to reduce motion */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
