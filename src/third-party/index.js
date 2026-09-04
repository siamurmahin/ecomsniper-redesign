/**
 * The only place in the app that turns a consent decision into a script tag.
 *
 * Every external service has a module beside this one, and nothing outside
 * this directory may create a `<script>` element. That rule is the point of
 * the directory: when a regulator, or the client, asks what this site loads
 * and on what terms, the answer is `config/vendors.js` and these few files —
 * not a search for `appendChild` across forty components.
 *
 * Loaders are idempotent and never reject, so applying a decision twice is
 * harmless and one blocked vendor cannot stop another from loading.
 */

import { OPTIONAL_CATEGORIES } from '../config/consent';
import { vendorsInCategory } from '../config/vendors';
import { updateConsent } from '../consent/consentMode';
import { loadClarity } from './clarity';
import { loadGtm } from './gtm';

/**
 * Which loader belongs to which vendor.
 *
 * Tawk is deliberately absent: it is essential, and it loads on click from
 * the launcher rather than from a consent decision. See `tawk.js`.
 */
const LOADERS = { gtm: loadGtm, clarity: loadClarity };

/**
 * Act on a decision.
 *
 * Tells Google first and loads second, in that order and not the other way:
 * the container reads the current consent state as it initialises, so an
 * update that arrives after the container has started is an update the first
 * batch of tags never saw.
 *
 * @param {string[]} granted Category ids the visitor allowed.
 */
export async function applyConsent(granted) {
  const allowed = Array.isArray(granted) ? granted : [];

  updateConsent(allowed);

  const loads = [];
  for (const category of OPTIONAL_CATEGORIES) {
    if (!allowed.includes(category)) continue;

    for (const vendor of vendorsInCategory(category)) {
      const load = LOADERS[vendor.name];
      if (load) loads.push(load());
    }
  }

  await Promise.all(loads);
}

export { loadTawk, openTawk } from './tawk';
