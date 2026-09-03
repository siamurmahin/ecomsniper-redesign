/**
 * Overlaying one language on another.
 *
 * Its own file so a page can scope its copy to its own route chunk without
 * importing `content/index.js` — which imports every word of both languages
 * by design, and would drag the whole deck back into the chunk that was
 * trying to escape it.
 */

/**
 * English is the base and every other language is an overlay: German supplies
 * only the keys it has translated, and anything it does not have falls through
 * to English. That means a half-finished translation shows English rather than
 * a blank, and a new English string can never break the German site.
 *
 * Arrays merge by position, which is what lets `NAV_LINKS` carry German labels
 * while keeping the English hrefs — so a translator never touches a URL, an
 * icon name or a tone.
 */
export function merge(base, overlay) {
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
