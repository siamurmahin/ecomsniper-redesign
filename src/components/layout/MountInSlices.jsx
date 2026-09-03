import { Children, useEffect, useState } from 'react';

/**
 * Mounts its children one at a time, a slice per idle callback.
 *
 * Deferring the page below the hero fixed the blank first frame but left one
 * 308ms task — thirteen sections and ~4,000 nodes committed together — and a
 * task that long is a third of a second in which a tap does nothing. Total
 * Blocking Time counts every millisecond of it past 50.
 *
 * The same work in thirteen pieces costs the same overall and blocks nothing:
 * the browser can paint, scroll and answer a tap between them, and everything
 * is on the page within a few frames either way.
 *
 * Nothing here is viewport-based — see `DeferUntilPainted` for why the page
 * must reach full height on its own rather than as it is scrolled.
 */

/** An idle slot, or the next frame where the browser has none to give. The
    timeout keeps a busy main thread from starving the queue. */
const scheduleSlice = (run) =>
  typeof window.requestIdleCallback === 'function'
    ? { id: window.requestIdleCallback(run, { timeout: 120 }), isIdle: true }
    : { id: window.setTimeout(run, 16), isIdle: false };

const cancelSlice = ({ id, isIdle }) => {
  if (isIdle) window.cancelIdleCallback(id);
  else clearTimeout(id);
};

/** See `DeferUntilPainted` — the prerendered document already holds all of
    these, so the render that attaches to it has to hold them too. */
let hasHydrated = false;

export default function MountInSlices({ children, immediate = false }) {
  const slices = Children.toArray(children);
  const total = slices.length;

  const [isHydrating] = useState(() => !hasHydrated);
  const [mounted, setMounted] = useState(() => (immediate || isHydrating ? total : 0));

  useEffect(() => {
    hasHydrated = true;
  }, []);

  useEffect(() => {
    if (mounted >= total) return undefined;

    const slice = scheduleSlice(() => setMounted((count) => count + 1));

    /* A scroll means the visitor is already past what is mounted, and pacing
       is worth less to them than the rest of the page existing. */
    const finishNow = () => setMounted(total);
    window.addEventListener('scroll', finishNow, { once: true, passive: true });

    return () => {
      cancelSlice(slice);
      window.removeEventListener('scroll', finishNow);
    };
  }, [mounted, total]);

  return slices.slice(0, mounted);
}
