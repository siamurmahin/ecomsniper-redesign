/**
 * Microsoft Clarity.
 *
 * Heatmaps, click tracking and session replay. It is the most invasive thing
 * this site can load — a session recording is a copy of what a visitor did on
 * the page — which is why it sits behind the marketing category in
 * `config/vendors.js` rather than behind analytics, and why it loads from here
 * and nowhere else.
 *
 * Shipped inert. With no `VITE_CLARITY_ID` the loader resolves false and no
 * script is created, so the site runs and behaves correctly until the client
 * hands over a project id. That is the same posture as the GTM container
 * beside it, and it is what makes this safe to merge before the id exists.
 *
 * Clarity's own snippet is the queue-then-load shape below rather than a bare
 * script tag: calls made before the library arrives are collected on
 * `window.clarity.q` and replayed when it does, so nothing is lost in the gap.
 */

import { vendorNamed } from '../config/vendors';
import { isProductionHost } from '../config/site';

let started = null;

/**
 * Load Clarity once.
 *
 * Returns the same promise on every call, so a decision applied twice cannot
 * inject two script tags. Resolves to false when there is nothing to load —
 * no id configured, or not a production hostname — which is a normal outcome
 * rather than a failure.
 *
 * @returns {Promise<boolean>} Whether Clarity is now on the page.
 */
export function loadClarity() {
  if (started) return started;

  const vendor = vendorNamed('clarity');
  if (!vendor?.id || !isProductionHost()) {
    started = Promise.resolve(false);
    return started;
  }

  started = new Promise((resolve) => {
    /* The queue Clarity's own snippet installs. Anything called before the
       library loads lands here and is replayed by it on arrival. */
    window.clarity =
      window.clarity ||
      function clarity(...args) {
        (window.clarity.q = window.clarity.q || []).push(args);
      };

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${encodeURIComponent(vendor.id)}`;
    script.onload = () => resolve(true);
    /* A blocked recorder is not an error worth surfacing — an ad blocker is a
       visitor exercising the same choice the banner offers. */
    script.onerror = () => resolve(false);

    document.head.appendChild(script);
  });

  return started;
}
