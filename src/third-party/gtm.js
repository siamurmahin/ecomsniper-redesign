/**
 * Google Tag Manager.
 *
 * One container holding GA4, Meta and TikTok, so adding a tag is something the
 * client does in the GTM console without touching this repo. That is also why
 * the whole container sits behind the marketing category rather than analytics
 * — it can carry an advertising tag at any time, and the consent a visitor
 * gave has to cover the worst thing the container might do, not the mildest.
 *
 * `gtag('consent', 'default', ...)` has already run from the inline block in
 * `root.jsx` before this can be called. That ordering is the whole mechanism;
 * see `consent/consentMode.js`.
 */

import { vendorNamed } from '../config/vendors';
import { isProductionHost } from '../config/site';

let started = null;

/**
 * Load the container once.
 *
 * Returns the same promise on every call, so two categories being granted in
 * one click cannot inject two script tags. Resolves to false when there is
 * nothing to load — no id configured, or not a production hostname — which is
 * a normal outcome, not a failure: the site is expected to run with no
 * container at all.
 *
 * @returns {Promise<boolean>} Whether the container is now on the page.
 */
export function loadGtm() {
  if (started) return started;

  const vendor = vendorNamed('gtm');
  if (!vendor?.id || !isProductionHost()) {
    started = Promise.resolve(false);
    return started;
  }

  started = new Promise((resolve) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(vendor.id)}`;
    script.onload = () => resolve(true);
    /* A blocked container is not an error worth surfacing — an ad blocker is
       a visitor exercising the same choice the banner offers. */
    script.onerror = () => resolve(false);

    document.head.appendChild(script);
  });

  return started;
}
