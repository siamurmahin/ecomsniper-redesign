/**
 * The site's own facts. No logic, no imports from app code.
 *
 * Everything here was previously inlined at the point of use — the hostname
 * test lived in `lib/trackingGate.js`, the domain in the copy deck, the
 * contact details in the footer's words. A value repeated in three places
 * drifts in two of them, and the one that matters is never the one you check.
 */

/** Where the site lives. Used for canonicals, hreflang and absolute links. */
export const DOMAIN = 'https://ecomsniper.io';

/**
 * Which hostnames count as production.
 *
 * Third-party scripts are gated on this so localhost, every Netlify preview
 * and every staging URL stay out of the real support queue and the real
 * analytics. The port is not part of `location.hostname`, so no dev port
 * needs listing.
 *
 * Consent is checked separately and on top of this: production is necessary
 * for a vendor to load, never sufficient.
 */
export const PRODUCTION_HOSTNAME = /(^|\.)ecomsniper\.io$/i;

/** Whether this browser is on a production hostname. False during SSR. */
export function isProductionHost() {
  if (typeof location === 'undefined') return false;
  return PRODUCTION_HOSTNAME.test(location.hostname);
}

/** How to reach a human. The footer and the legal pages both read these. */
export const CONTACT = {
  phone: '+1 (800) 994-9831',
  phoneHref: 'tel:+18009949831',
  email: 'management@ecomsniper.io',
  privacyEmail: 'sammy@ecomsniper.io',
  address: 'Toronto, Ontario, Canada',
};

/** The routes that carry the site's legal text, unprefixed. */
export const LEGAL_ROUTES = {
  terms: '/terms-and-conditions',
  privacy: '/privacy-policy',
  cookies: '/cookie-policy',
};
