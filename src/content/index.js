import * as english from './en';
import { merge } from './merge';
import { de } from './de';

/**
 * The copy deck, one file per page and per section.
 *
 * `en/` is the site's words, split the way the site is: `en/site.js` for what
 * every route shares, `en/home/` for the homepage's sections, and a file each
 * for the pages that stand on their own. `de/` mirrors it filename for
 * filename. A section's copy is one file, which is also the shape a CMS
 * document wants when the client edits this themselves.
 *
 * Two claim rules survive the split and apply to every file: no "99% make
 * 1-3k", and the guarantee always names the monthly plan.
 */

/**
 * The copy deck in the language being read. English is the base; every other
 * language overlays it key by key — see `./merge`.
 */
const OVERLAYS = { de };

/* Built once per language rather than on every read: these are large objects
   and the sections that use them re-render often. */
const cache = new Map();

export function contentFor(language) {
  if (cache.has(language)) return cache.get(language);

  const overlay = OVERLAYS[language];
  const resolved = overlay
    ? Object.fromEntries(
        Object.entries(english).map(([key, value]) => [key, merge(value, overlay[key])]),
      )
    : { ...english };

  cache.set(language, resolved);
  return resolved;
}
