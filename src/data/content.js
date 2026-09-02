import * as english from './siteContent';
import { de } from './translations/de';

/**
 * The copy deck in the language being read.
 *
 * English is the base and every other language is an overlay: German supplies
 * only the keys it has translated, and anything it does not have falls through
 * to English. That means a half-finished translation shows English rather than
 * a blank, and a new English string can never break the German site.
 *
 * Arrays merge by position, which is what lets `NAV_LINKS` carry German labels
 * while keeping the English hrefs — so a translator never touches a URL, an
 * icon name or a tone.
 */
const OVERLAYS = { de };

function merge(base, overlay) {
  if (overlay === undefined) return base;

  if (Array.isArray(base)) {
    if (!Array.isArray(overlay)) return overlay;
    return base.map((item, index) => merge(item, overlay[index]));
  }

  if (base && typeof base === 'object' && overlay && typeof overlay === 'object') {
    const out = { ...base };
    for (const key of Object.keys(overlay)) out[key] = merge(base[key], overlay[key]);
    return out;
  }

  return overlay;
}

/* Built once per language rather than on every read: these are large objects
   and the sections that use them re-render often. */
const cache = new Map();

export function contentFor(language) {
  if (cache.has(language)) return cache.get(language);

  const overlay = OVERLAYS[language];
  const resolved = overlay
    ? Object.fromEntries(
        Object.entries(english).map(([key, value]) => [key, merge(value, overlay[key])])
      )
    : { ...english };

  cache.set(language, resolved);
  return resolved;
}
