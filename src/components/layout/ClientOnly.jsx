import { useSyncExternalStore } from 'react';

/* Nothing ever changes, so the subscribe callback never fires. It exists
   because useSyncExternalStore requires one. */
const noop = () => () => {};
const onClient = () => true;
const onServer = () => false;

/**
 * Renders its children only in the browser, and only after hydration.
 *
 * `useSyncExternalStore` rather than a `useState` + `useEffect` flag because
 * it is the one primitive React guarantees is hydration-safe: the server
 * snapshot and the first client snapshot are both `false`, so the first client
 * render matches the server exactly, and the switch to `true` happens in the
 * commit after. A `useState(false)` flag reaches the same place, but React is
 * allowed to render the effect's result in the same pass, and this is the
 * thing whose whole job is to not do that.
 *
 * Use it for interface that has no meaning without JavaScript — the scroll
 * bar, the back-to-top button, the dialogs. Do NOT use it for content: a
 * client-only subtree is absent from the prerendered HTML, so a crawler and a
 * link preview never see it. That is the point for furniture and a bug for
 * anything a reader came for.
 */
export default function ClientOnly({ children, fallback = null }) {
  return useSyncExternalStore(noop, onClient, onServer) ? children : fallback;
}
