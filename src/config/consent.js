/**
 * What a visitor is being asked, and what their answer means to Google.
 *
 * The categories are the contract between three things that must not drift:
 * the toggles in the customise panel, the `category` field on every vendor in
 * `vendors.js`, and the Consent Mode signals below. Add a category here and
 * all three follow; add one anywhere else and two of them are wrong.
 */

/**
 * Essential is not a choice and is never stored as one.
 *
 * It covers the language cookie and the consent decision itself — a site that
 * cannot remember "no" has to ask again on every page, which is worse for the
 * visitor than the cookie it was avoiding.
 */
export const ESSENTIAL = 'essential';

export const CATEGORIES = [
  {
    id: ESSENTIAL,
    /* Locked on in the panel. Shown so the visitor can see what it covers
       rather than wondering what they are not being offered. */
    locked: true,
  },
  { id: 'analytics', locked: false },
  { id: 'marketing', locked: false },
];

/** The ones a visitor can actually turn on and off. */
export const OPTIONAL_CATEGORIES = CATEGORIES.filter((c) => !c.locked).map((c) => c.id);

/**
 * Google Consent Mode v2.
 *
 * Every signal starts denied except `security_storage`, and the defaults are
 * written before GTM loads — that is the whole point of the mechanism. A tag
 * that fires before the default block has run is a tag that fired without
 * consent, and no later `update` undoes it.
 *
 * `functionality_storage` and `personalization_storage` are granted outright:
 * they cover remembering a language and a consent decision, which is the
 * essential category, which is not optional.
 */
export const CONSENT_MODE_DEFAULTS = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  personalization_storage: 'granted',
  security_storage: 'granted',
};

/** Which Consent Mode signals each category releases when it is granted. */
export const CONSENT_MODE_BY_CATEGORY = {
  analytics: ['analytics_storage'],
  marketing: ['ad_storage', 'ad_user_data', 'ad_personalization'],
};

/**
 * A decision, as Consent Mode wants to hear it.
 *
 * Takes the set of granted category ids and returns every signal with its
 * value, rather than only the granted ones — an `update` that omits a signal
 * leaves the previous value in place, so a visitor who grants analytics and
 * then withdraws it would keep `analytics_storage: granted` forever.
 *
 * @param {string[]} granted Category ids the visitor has allowed.
 * @returns {Record<string, 'granted' | 'denied'>}
 */
export function consentModeFor(granted) {
  const signals = { ...CONSENT_MODE_DEFAULTS };

  for (const category of granted) {
    for (const signal of CONSENT_MODE_BY_CATEGORY[category] ?? []) {
      signals[signal] = 'granted';
    }
  }

  return signals;
}

/**
 * How long a decision stands before being asked again.
 *
 * Six months, which is the shortest of the common regulator guidances rather
 * than the longest — being asked twice a year is a smaller imposition than a
 * consent nobody remembers giving.
 */
export const CONSENT_MAX_AGE_DAYS = 182;

/** Bumped when the categories or the vendors behind them change materially. */
export const CONSENT_VERSION = 1;
