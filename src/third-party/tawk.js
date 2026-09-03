/**
 * Tawk.to live chat, loaded when someone asks for it.
 *
 * It used to load on every page view, from an inline block in `index.html`
 * gated on the hostname alone — 200KB of chat widget on the critical path of
 * a visitor who never opens it, and a third-party connection opened before
 * anyone was asked. Now nothing happens until the launcher is clicked.
 *
 * Which is also why it is filed as essential rather than behind a category: a
 * support widget a visitor has deliberately opened is not tracking, and gating
 * it would mean someone who rejected analytics could not ask for help. The
 * cookies it sets are declared in `config/vendors.js` and listed in the cookie
 * policy like everything else.
 */

import { vendorNamed } from '../config/vendors';
import { isProductionHost } from '../config/site';

let started = null;

/**
 * Load the widget once, on demand.
 *
 * Resolves false when there is nothing to load — no id, or a non-production
 * hostname, which is what keeps localhost and preview builds out of the real
 * support queue.
 *
 * @returns {Promise<boolean>} Whether the widget is now on the page.
 */
export function loadTawk() {
  if (started) return started;

  const vendor = vendorNamed('tawk');
  if (!vendor?.id || !isProductionHost()) {
    started = Promise.resolve(false);
    return started;
  }

  started = new Promise((resolve) => {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${vendor.id}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.head.appendChild(script);
  });

  return started;
}

/**
 * Load the widget and open it.
 *
 * The click that loads the chat is also the click that meant to open it, and
 * the visitor should not have to click twice. `maximize` is only available
 * once the embed has run, so it waits for the load rather than assuming it.
 */
export async function openTawk() {
  const loaded = await loadTawk();
  if (!loaded) return false;

  /* The API appears a moment after the script does. */
  if (typeof window.Tawk_API?.maximize === 'function') {
    window.Tawk_API.maximize();
    return true;
  }

  window.Tawk_API.onLoad = () => window.Tawk_API.maximize();
  return true;
}
