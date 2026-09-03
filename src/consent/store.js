/**
 * What the visitor decided, and how the rest of the app hears about it.
 *
 * The decision is kept in both a cookie and localStorage, for the same reasons
 * `lib/language.js` keeps the language in both: the cookie so a host or CDN
 * can read it before React runs, localStorage because a cookie can be cleared
 * on its own and this is a preference. Either can throw — private mode, site
 * data blocked — and neither is allowed to break a consent choice. A visitor
 * whose browser refuses both is asked on every visit, which is the correct
 * failure: it never assumes a yes it could not store.
 *
 * Nothing here loads a script. It holds a decision and tells subscribers it
 * changed; `src/third-party/` is what acts on it. Keeping those apart is what
 * makes the decision testable without a browser.
 */

import { CONSENT_MAX_AGE_DAYS, CONSENT_VERSION, OPTIONAL_CATEGORIES } from '../config/consent';

const STORAGE_KEY = 'ecomsniper:consent';
const COOKIE = 'ecomsniper_consent';
const MAX_AGE_SECONDS = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60;

/**
 * A stored decision.
 *
 * @typedef {object} Decision
 * @property {number} version Which set of categories was being agreed to.
 * @property {string} at ISO timestamp, so an expiry can be judged.
 * @property {string[]} granted Category ids the visitor allowed.
 */

/** Only categories we still offer, so a stale id cannot grant anything. */
const clean = (granted) =>
  Array.isArray(granted) ? granted.filter((id) => OPTIONAL_CATEGORIES.includes(id)) : [];

function expired(at) {
  const when = Date.parse(at);
  if (Number.isNaN(when)) return true;
  return Date.now() - when > MAX_AGE_SECONDS * 1000;
}

function fromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    /* Private mode, site data blocked, or a value that is not JSON. */
    return null;
  }
}

function fromCookie() {
  try {
    const pair = document.cookie.split('; ').find((c) => c.startsWith(`${COOKIE}=`));
    if (!pair) return null;
    return JSON.parse(decodeURIComponent(pair.slice(COOKIE.length + 1)));
  } catch {
    return null;
  }
}

/**
 * The decision in force, or null if there is none to honour.
 *
 * Null covers three cases that all mean the same thing to a caller — never
 * asked, asked too long ago, and asked about a different set of categories —
 * because all three end with the banner being shown again.
 */
export function readDecision() {
  if (typeof document === 'undefined') return null;

  const stored = fromStorage() ?? fromCookie();
  if (!stored || typeof stored !== 'object') return null;
  if (stored.version !== CONSENT_VERSION) return null;
  if (!stored.at || expired(stored.at)) return null;

  return { version: stored.version, at: stored.at, granted: clean(stored.granted) };
}

const listeners = new Set();

/** Called with the new decision whenever one is made. Returns an unsubscribe. */
export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function announce(decision) {
  for (const listener of listeners) {
    try {
      listener(decision);
    } catch {
      /* One bad subscriber must not stop the others from being told. */
    }
  }
}

/**
 * Record a decision and tell everyone.
 *
 * Written to both stores, and announced even if both writes fail: the visitor
 * said yes and the page they are on should honour it for as long as it is
 * open, whatever the browser will let us remember.
 */
export function decide(granted) {
  const decision = {
    version: CONSENT_VERSION,
    at: new Date().toISOString(),
    granted: clean(granted),
  };
  const encoded = encodeURIComponent(JSON.stringify(decision));

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decision));
  } catch {
    /* Nothing to do — the cookie may still take it. */
  }

  try {
    document.cookie = `${COOKIE}=${encoded}; path=/; max-age=${MAX_AGE_SECONDS}; samesite=lax`;
  } catch {
    /* Cookies refused. The choice still stands for this page. */
  }

  announce(decision);
  return decision;
}

export const acceptAll = () => decide(OPTIONAL_CATEGORIES);
export const rejectAll = () => decide([]);

/** Forget the decision, so the banner asks again. Behind "change your choices". */
export function reset() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* Ignored. */
  }

  try {
    document.cookie = `${COOKIE}=; path=/; max-age=0; samesite=lax`;
  } catch {
    /* Ignored. */
  }

  announce(null);
}

/** Whether a category is allowed right now. Unknown categories are never. */
export function isGranted(category) {
  return readDecision()?.granted.includes(category) ?? false;
}
