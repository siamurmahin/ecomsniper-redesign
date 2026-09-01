/**
 * One interruption per visitor, across every dialog that opens itself.
 *
 * Two exist now — the consultation offer at section 07 and the exit-intent
 * playbook offer — and each already remembered whether *it* had been shown.
 * Neither knew about the other, so a visitor who declined the first was
 * eligible for the second: read the page, get a modal, dismiss it, leave, get
 * another modal. That is the behaviour people install blockers for.
 *
 * So they share a claim. Whichever fires first takes it and the other stands
 * down for good, on top of its own per-dialog key.
 *
 * Storage can throw outright — Safari in private mode, a browser set to block
 * site data — so every access fails closed. An unreadable store means "already
 * interrupted", because nagging someone whose browser we cannot read is worse
 * than missing one capture.
 */

const CLAIM_KEY = 'ecomsniper:interrupted';

/** True when this visitor has already been interrupted by any dialog. */
export function alreadyInterrupted(ownKey) {
  try {
    return localStorage.getItem(CLAIM_KEY) === '1' || localStorage.getItem(ownKey) === '1';
  } catch {
    return true;
  }
}

/**
 * Take the one interruption this visitor gets. Call it as the dialog opens,
 * not when it is dismissed — a dialog that was seen and ignored was still an
 * interruption.
 */
export function claimInterruption(ownKey) {
  try {
    localStorage.setItem(CLAIM_KEY, '1');
    localStorage.setItem(ownKey, '1');
  } catch {
    /* Storage unavailable. Showing once per page load is an acceptable floor. */
  }
}
