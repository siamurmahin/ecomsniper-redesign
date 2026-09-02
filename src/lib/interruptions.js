/**
 * What the two self-opening dialogs know about each other, so nobody is
 * stopped twice in a visit. The rule is the outcome, not just "has it shown":
 *
 * - never while another dialog is open
 * - gave their details: never asked again
 * - dismissed it: one more, smaller ask on the way out
 *
 * Storage fails closed — an unreadable store counts as already seen, because
 * nagging someone we cannot read is worse than missing one capture.
 */

/** What a dialog did, once it has been shown. */
export const OUTCOME = {
  dismissed: 'dismissed',
  converted: 'converted',
};

/** Has this dialog had its turn, whatever came of it? Fails closed. */
export function hasSeen(key) {
  try {
    return localStorage.getItem(key) !== null;
  } catch {
    return true;
  }
}

/** What became of a dialog, or null if never shown. Fails closed to converted. */
export function outcomeOf(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return OUTCOME.converted;
  }
}

/** Record what became of a dialog, as it happens. */
export function mark(key, outcome) {
  try {
    localStorage.setItem(key, outcome);
  } catch {
    /* Storage unavailable. Showing once per page load is an acceptable floor. */
  }
}

/*
 * Is a dialog on screen right now? A module variable, not storage: it
 * describes this page view, and a stale value would lock every dialog out.
 */
let dialogOpen = false;

export const isDialogOpen = () => dialogOpen;
export const setDialogOpen = (open) => {
  dialogOpen = open;
};
