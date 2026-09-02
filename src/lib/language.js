/**
 * Which language the site is in, and how a visitor changes it.
 *
 * The URL is the source of truth: /de/pricing is German, /pricing is English.
 * A language you can link to and bookmark beats one hidden in storage, and
 * search engines can only index what has its own address.
 *
 * German currently renders the English copy. The switcher, the routing and the
 * lang attribute are all real, so when translations arrive the only thing that
 * changes is where the words come from.
 */

/** Every language offered, in the order the menu lists them. */
export const LANGUAGES = [
  { code: 'en', short: 'EN', label: 'English', prefix: '' },
  { code: 'de', short: 'DE', label: 'Deutsch', prefix: '/de' },
];

export const DEFAULT_LANGUAGE = 'en';

/** Remembered so a return visit lands in the language they last chose. */
export const LANGUAGE_STORAGE_KEY = 'ecomsniper:language';
export const LANGUAGE_COOKIE = 'ecomsniper_lang';

/** The language a path is in. Anything unprefixed is English. */
export function languageFromPath(pathname) {
  const match = LANGUAGES.find(
    (language) =>
      language.prefix && (pathname === language.prefix || pathname.startsWith(`${language.prefix}/`))
  );

  return match ? match.code : DEFAULT_LANGUAGE;
}

/** The same page without its language prefix, always starting with a slash. */
export function stripLanguage(pathname) {
  const language = LANGUAGES.find(
    (item) =>
      item.prefix && (pathname === item.prefix || pathname.startsWith(`${item.prefix}/`))
  );

  if (!language) return pathname;

  const rest = pathname.slice(language.prefix.length);
  return rest === '' ? '/' : rest;
}

/**
 * The same target in another language. Handles a bare path, a hash or both:
 * "/#proof" in German is "/de#proof", not "/#proof", which is how a reader
 * ends up back in English by clicking their own nav.
 */
export function pathForLanguage(target, code) {
  const language = LANGUAGES.find((item) => item.code === code);
  if (!language || !target) return target;

  const cut = target.search(/[#?]/);
  const path = cut === -1 ? target : target.slice(0, cut);
  const tail = cut === -1 ? '' : target.slice(cut);

  const bare = stripLanguage(path || '/');
  if (!language.prefix) return `${bare}${tail}`;

  // Avoid "/de/" for the homepage.
  return bare === '/' ? `${language.prefix}${tail}` : `${language.prefix}${bare}${tail}`;
}

/**
 * A choice is kept in both a cookie and localStorage.
 *
 * The cookie so a host or CDN can read it before React runs and serve the
 * right page outright; localStorage because a cookie can be cleared on its own
 * and this is a preference, not tracking. Either can throw, so neither is
 * allowed to break a language switch.
 */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // one year

export function rememberLanguage(code) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
  } catch {
    /* Private mode, or site data blocked. */
  }

  try {
    document.cookie = `${LANGUAGE_COOKIE}=${code}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
  } catch {
    /* Cookies refused. The URL still carries the choice. */
  }
}

export function rememberedLanguage() {
  try {
    const fromCookie = document.cookie
      .split('; ')
      .find((pair) => pair.startsWith(`${LANGUAGE_COOKIE}=`));

    if (fromCookie) {
      const value = fromCookie.split('=')[1];
      if (LANGUAGES.some((language) => language.code === value)) return value;
    }
  } catch {
    /* No cookies. Fall through to storage. */
  }

  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch {
    return null;
  }
}
