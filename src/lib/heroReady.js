/**
 * The signal that the first screen has finished animating.
 *
 * The homepage defers sixteen sections until after the hero has painted, and
 * "after painted" turned out to be the wrong moment: mounting ~4,000 nodes one
 * frame after first paint drops the work squarely into the middle of the
 * hero's entrance. Measured, the first frames of a reload ran
 * 16.7, 83.4, 16.8, 16.7, 283.5, 33.4 … ms — a 283ms frame is seventeen
 * dropped in a row, and the hero visibly stutters through its own animation.
 *
 * So the mount waits for this instead. The hero says when it is done, and the
 * rest of the page mounts into a main thread nobody is animating on.
 *
 * A plain window event rather than context or a store: the two ends are a
 * section and a layout wrapper that never meet in the tree, and this needs to
 * work whether the hero is on the page at all.
 */
export const HERO_READY_EVENT = 'ecomsniper:hero-ready';

/**
 * Latched, because the signal can beat its listener.
 *
 * The hero announces from a layout effect, and the waiting wrapper subscribes
 * from a passive one — React runs every layout effect first. With reduced
 * motion the hero has no timeline to wait for and announces synchronously, so
 * the event fires before anything is listening and the page would sit on the
 * fallback timeout for no reason. Anyone mounting late reads the flag instead.
 */
let announced = false;

/** True once the first screen is done — or was never going to animate. */
export const isHeroReady = () => announced;

/** Fired by the hero when its entrance finishes — or immediately if it has none. */
export const announceHeroReady = () => {
  announced = true;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(HERO_READY_EVENT));
  }
};
