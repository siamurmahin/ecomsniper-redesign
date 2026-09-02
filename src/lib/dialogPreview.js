/**
 * Open a self-triggering dialog on demand, in development only.
 *
 * Neither can be opened by hand — the exit-intent one needs a trusted pointer
 * event, which no script can fake — so the only way to see them was to edit
 * the component and put it back, which is how a temporary edit gets committed.
 *
 * ?dialog=consult or ?dialog=exit opens one now, skipping the trigger and the
 * once-per-visitor record. DEV-only, so it is dropped from the build.
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
