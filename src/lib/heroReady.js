/**
 * The signal that the hero has finished animating.
 *
 * The page defers sixteen sections until the hero is done, not merely painted:
 * mounting ~4,000 nodes one frame after first paint drops the work into the
 * middle of the entrance, and a 283ms frame is seventeen dropped in a row.
 *
 * A plain window event, because the two ends never meet in the tree and this
 * has to work whether the hero is on the page at all.
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
