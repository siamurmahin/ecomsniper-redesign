/**
 * Opening a self-triggering dialog on demand, in development only.
 *
 * Neither of these can be opened by hand. The consultation dialog waits for
 * section 07 to scroll into view and then never shows again on that browser;
 * the exit-intent one additionally requires a trusted pointer leaving the top
 * edge of the window, which no script can fake — event.isTrusted is false for
 * anything dispatched from JavaScript, and that check is the whole reason the
 * dialog does not fire on every stray mouse event.
 *
 * That left the only way to see either one being to edit the component,
 * reload, look, and put the code back — which is a change to shipping code in
 * order to look at shipping code, and it is how a temporary edit ends up
 * committed.
 *
 * So: `?dialog=consult` or `?dialog=exit` opens one immediately, skipping the
 * trigger, the timer and the once-per-visitor record. Guarded on
 * import.meta.env.DEV, so it is dead code in a production build — Vite
 * replaces the flag with false and the branch is dropped entirely.
 *
 * @param {'consult'|'exit'} name
 * @returns {boolean} true if this dialog should open now
 */
export function isPreviewing(name) {
  if (!import.meta.env.DEV) return false;

  try {
    return new URLSearchParams(window.location.search).get('dialog') === name;
  } catch {
    return false;
  }
}
