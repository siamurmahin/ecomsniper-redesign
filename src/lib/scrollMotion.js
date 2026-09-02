import { gsap } from './motion';

/**
 * ScrollTrigger, fetched the first time something actually needs it.
 *
 * Nothing on the first screen does. The hero's entrance is CSS keyed off
 * attributes GSAP's SplitText writes, the reveals build on approach, and the
 * page's smooth scrolling starts after the first paint — but the plugin was
 * registered in `motion.js`, which the hero imports, so 64KB of scrolling
 * machinery had to be parsed and executed before the hero could be drawn.
 *
 * The promise is cached, so however many callers ask, one request is made and
 * the plugin is registered once.
 */
let loading = null;
let plugin = null;

export function loadScrollTrigger() {
  if (loading) return loading;

  loading = import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
    gsap.registerPlugin(ScrollTrigger);
    // Fewer, cheaper recalculations on a mobile address-bar resize.
    ScrollTrigger.config({ ignoreMobileResize: true });
    plugin = ScrollTrigger;
    return ScrollTrigger;
  });

  return loading;
}

/**
 * The plugin if it is already here, else null.
 *
 * For callers whose work only makes sense against triggers that exist —
 * re-measuring after a route paints, say. Loading the plugin to refresh
 * nothing would be paying for the thing this file exists to avoid.
 */
export const getScrollTrigger = () => plugin;
