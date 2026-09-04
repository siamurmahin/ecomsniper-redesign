/**
 * Every external service the site can load, and the terms it loads on.
 *
 * One entry per service, and the entry is the whole truth about it: which
 * consent category releases it, where its id comes from, and what it puts on
 * a visitor's machine. The loader in `src/third-party/` reads this; so does
 * the cookie policy, which is generated from `cookies` below rather than
 * written by hand — a policy typed out separately is a policy that describes
 * last quarter's vendors.
 *
 * `id` is read from the environment at build time. Vite only exposes
 * `VITE_`-prefixed vars, and an unset var arrives as `undefined`, which
 * `enabled` turns into "this vendor does not exist". That is deliberate: the
 * site ships and behaves correctly with no ids configured at all.
 */

import { ESSENTIAL } from './consent';

/** Trimmed because an env var set to an empty string is not an id. */
const env = (key) => {
  const value = import.meta.env[key];
  return typeof value === 'string' && value.trim() ? value.trim() : null;
};

export const VENDORS = [
  {
    name: 'gtm',
    label: 'Google Tag Manager',
    /* One container for GA4, Meta and TikTok. The tags live in the container,
       so adding one is a change the client makes without touching this repo —
       which is also why the whole container sits behind the strictest
       category it can carry rather than behind analytics alone. */
    category: 'marketing',
    id: env('VITE_GTM_ID'),
    privacyUrl: 'https://policies.google.com/privacy',
    cookies: [
      { name: '_ga', purpose: 'analytics', retention: '2 years' },
      { name: '_ga_*', purpose: 'analytics', retention: '2 years' },
      { name: '_gid', purpose: 'analytics', retention: '24 hours' },
      { name: '_fbp', purpose: 'marketing', retention: '3 months' },
      { name: '_ttp', purpose: 'marketing', retention: '13 months' },
    ],
  },
  {
    name: 'clarity',
    label: 'Microsoft Clarity',
    /* Behind marketing rather than analytics, which is not where a heatmap
       tool instinctively belongs. Clarity integrates with Microsoft
       Advertising and sets `MUID`, an advertising identifier shared across
       Microsoft properties, and the client's own policy says the data may be
       used for advertising. Same rule as the GTM container above: the consent
       has to cover the worst thing the vendor might do, not the mildest.

       It records sessions — heatmaps, clicks, scrolls and replay. That is the
       most invasive thing this site loads, which is the other reason it sits
       behind the strictest optional category. */
    category: 'marketing',
    id: env('VITE_CLARITY_ID'),
    privacyUrl: 'https://privacy.microsoft.com/en-US/privacystatement',
    cookies: [
      { name: '_clck', purpose: 'analytics', retention: '1 year' },
      { name: '_clsk', purpose: 'analytics', retention: '1 day' },
      { name: 'CLID', purpose: 'analytics', retention: '1 year' },
      { name: 'MUID', purpose: 'marketing', retention: '390 days' },
      { name: 'ANONCHK', purpose: 'marketing', retention: '10 minutes' },
      { name: 'SRM_B', purpose: 'marketing', retention: '390 days' },
    ],
  },
  {
    name: 'tawk',
    label: 'Tawk.to live chat',
    /* Essential, but not loaded until it is opened — see `third-party/tawk`.
       A support widget a visitor has deliberately clicked is not tracking,
       and gating it behind a category would mean someone who rejected
       analytics could not ask for help. */
    category: ESSENTIAL,
    id: env('VITE_TAWK_ID'),
    privacyUrl: 'https://www.tawk.to/privacy-policy/',
    cookies: [
      { name: 'TawkConnectionTime', purpose: 'essential', retention: 'session' },
      { name: '__tawkuuid', purpose: 'essential', retention: '6 months' },
    ],
  },
];

/** A vendor by name, or undefined. */
export const vendorNamed = (name) => VENDORS.find((v) => v.name === name);

/**
 * Whether a vendor is configured at all.
 *
 * Separate from consent: an unconfigured vendor never loads no matter what a
 * visitor allows, which is what makes this safe to merge before the client
 * has handed over a container id.
 */
export const isConfigured = (vendor) => Boolean(vendor?.id);

/** Configured vendors in a category. The loader registry works from this. */
export const vendorsInCategory = (category) =>
  VENDORS.filter((v) => v.category === category && isConfigured(v));

/**
 * Every cookie a configured vendor may set, flattened for the cookie policy.
 * Unconfigured vendors are excluded — the policy describes what this build
 * actually loads, not what it could load if someone filled in an env var.
 */
export const declaredCookies = () =>
  VENDORS.filter(isConfigured).flatMap((vendor) =>
    vendor.cookies.map((cookie) => ({ ...cookie, vendor: vendor.label })),
  );
