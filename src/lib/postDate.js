import { LANGUAGES } from './language';

/**
 * A post's date, written the way the reader's language writes dates.
 *
 * Their blog prints `Thu May 28 2026` — a raw JavaScript `Date` cast to a
 * string, which is what a date looks like when nobody formatted it. It is also
 * English regardless of who is reading.
 *
 * `Intl` is in the browser and in Node, costs nothing to import, and knows
 * that German writes "28. Mai 2026". The deck stores ISO, which is the only
 * format that sorts correctly as a string — the index relies on that.
 *
 * A date that cannot be parsed is returned as it was given rather than
 * rendered as "Invalid Date", which is the exact string their terms page
 * shipped with for a while.
 *
 * @param {string} iso A date as `YYYY-MM-DD`.
 * @param {string} code A language code from `LANGUAGES`.
 * @returns {string}
 */
export function formatPostDate(iso, code) {
  const parsed = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return iso;

  const locale = LANGUAGES.find((item) => item.code === code)?.locale ?? 'en-GB';

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsed);
}
