/**
 * WebsyChat, the support chatbot, loaded when someone asks for it.
 *
 * It arrived as a `useEffect` that appended the embed to `document.body` on
 * every page: 13.3KB brotli and 61.9KB parsed per page view, a boot request to
 * a second origin, a Google Fonts stylesheet the embed injects for itself, an
 * 8-second poll and an `EventSource` held open — all paid by every visitor,
 * including the ones who never open it. It is the same bill Tawk used to
 * present, and the same answer: nothing happens until the launcher is clicked.
 *
 * Which is also why it is filed essential rather than behind a category. A
 * support widget a visitor has deliberately opened is not tracking, and gating
 * it would mean someone who rejected analytics could not ask for help. What it
 * puts in `localStorage` is declared in `config/vendors.js` and listed in the
 * cookie policy like everything else.
 */

import { vendorNamed } from '../config/vendors';
import { isSupportHost } from '../config/site';

/** The embed's own origin, and the API it is told to talk to. */
const EMBED_SRC = 'https://apps.websychat.com/embed.js';
const API_BASE = 'https://api.websychat.com/api/v1';

/** The id the embed's launcher renders under, once the script has run. */
const LAUNCHER_ID = 'websychat-launcher';

/**
 * The embed injects its own Google Fonts stylesheet — Fraunces and Manrope —
 * guarded on this id being absent. Claiming the id first is the whole of the
 * suppression: two origins and a render-blocking sheet never happen.
 *
 * The rule that takes the id's place hands the widget the typeface this site
 * already serves. `!important` because the embed writes `font-family` to its
 * root as an inline style once its config lands, and an author `!important`
 * is what outranks that. Its four Fraunces headings are left to fall back to
 * their own Georgia rather than chased through selectors on ids that belong
 * to somebody else's markup.
 */
const FONT_GUARD_ID = 'websychat-fonts';
const FONT_GUARD_CSS =
  '#websychat-root{font-family:var(--font-sans),system-ui,sans-serif!important}';

let started = null;

/**
 * Load the widget once, on demand.
 *
 * Resolves false when there is nothing to load — no site key, or a hostname
 * the chat is not staffed on, which is what keeps localhost and every deploy
 * preview out of the client's real support queue. `isSupportHost` rather than
 * `isProductionHost`: the review site is allowed a working chat button
 * without being allowed analytics. See `config/site`.
 *
 * @returns {Promise<boolean>} Whether the widget is now on the page.
 */
export function loadWebsyChat() {
  if (started) return started;

  const vendor = vendorNamed('websychat');
  if (!vendor?.id || !isSupportHost()) {
    started = Promise.resolve(false);
    return started;
  }

  started = new Promise((resolve) => {
    if (!document.getElementById(FONT_GUARD_ID)) {
      const guard = document.createElement('style');
      guard.id = FONT_GUARD_ID;
      guard.textContent = FONT_GUARD_CSS;
      document.head.appendChild(guard);
    }

    const script = document.createElement('script');
    script.async = true;
    /* The embed reads its own `src` for the site key, so it is a query
       parameter rather than an attribute, and it is encoded because the value
       comes from the environment. */
    script.src = `${EMBED_SRC}?site=${encodeURIComponent(vendor.id)}`;
    script.setAttribute('data-api', API_BASE);
    script.onload = () => resolve(true);
    /* A blocked widget is not an error worth surfacing — an ad blocker is a
       visitor exercising a choice. */
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });

  return started;
}

/**
 * Load the widget and open it.
 *
 * The click that loads the chat is also the click that meant to open it, and
 * the visitor should not have to click twice. The embed exposes no API — its
 * open/close lives in a closure — but it appends its own launcher to the body
 * while the script runs, so clicking that is how the panel is opened from
 * outside. It exists by `onload`; the config it styles itself with arrives a
 * moment later and repaints the panel in place.
 *
 * @returns {Promise<boolean>} Whether the panel was opened.
 */
export async function openWebsyChat() {
  const loaded = await loadWebsyChat();
  if (!loaded) return false;

  const launcher = document.getElementById(LAUNCHER_ID);
  if (!launcher) return false;

  launcher.click();
  return true;
}
