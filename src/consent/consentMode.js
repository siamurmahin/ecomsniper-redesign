/**
 * Google Consent Mode v2.
 *
 * Two halves that must run in this order:
 *
 * `CONSENT_MODE_BOOTSTRAP` is a literal string inlined in `root.jsx`, for the
 * same reason `preloaderShell` is — it has to execute before anything else on
 * the page. It creates `dataLayer` and `gtag`, and sets every signal to its
 * default. A tag that fires before this has run is a tag that fired without
 * consent, and no later update takes that back. Being a string is what
 * guarantees it is in the HTML rather than in a module the browser fetches.
 *
 * `updateConsent` is the second half, called after the visitor chooses. It
 * sends every signal rather than only the granted ones: an `update` that omits
 * a signal leaves the previous value in place, so a visitor who allows
 * analytics and later withdraws it would otherwise stay granted forever.
 */

import { CONSENT_MODE_DEFAULTS, consentModeFor } from '../config/consent';

/*
 * Built from the same object the update path uses, so the defaults in the HTML
 * and the defaults in the module can never disagree. `JSON.stringify` also
 * escapes anything awkward in the values, which matters for a string being
 * dropped into a script tag.
 */
export const CONSENT_MODE_BOOTSTRAP = `      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      window.gtag = window.gtag || gtag;
      gtag('consent', 'default', ${JSON.stringify({ ...CONSENT_MODE_DEFAULTS, wait_for_update: 500 })});`;

/**
 * Tell Google what the visitor allowed.
 *
 * Safe to call before GTM has loaded, and safe to call when it never will:
 * `gtag` only pushes onto `dataLayer`, which the bootstrap above always
 * creates, so the call queues harmlessly and is read if a container arrives.
 *
 * @param {string[]} granted Category ids the visitor allowed.
 */
export function updateConsent(granted) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', consentModeFor(granted));
}
