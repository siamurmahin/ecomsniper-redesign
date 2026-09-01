/**
 * What the self-opening dialogs know about each other.
 *
 * Two exist: the consultation offer at section 07 and the exit-intent playbook
 * offer. Each remembers whether it has been shown, which is not enough on its
 * own — a visitor who declined the first was eligible for the second, so the
 * page could stop the same person twice in a visit.
 *
 * They used to share a single claim: whichever fired first took it and the
 * other stood down for good. That is quiet, but it spends the one interruption
 * on whoever gets there first and leaves the playbook offer reaching almost
 * nobody, since the consultation dialog opens partway down the page.
 *
 * So the rule is now the outcome, not the fact:
 *
 * - nobody is interrupted while another dialog is open
 * - a visitor who GAVE their details is never asked again. They said yes; a
 *   second popup on the way out is the reward for converting
 * - a visitor who DISMISSED the first offer can be asked once more on the way
 *   out, with a different and smaller thing to say yes to
 *
 * Storage access fails closed throughout — Safari in private mode and a
 * browser set to block site data both throw outright. An unreadable store
 * counts as already seen, because nagging someone whose browser we cannot read
 * is worse than missing one capture.
 */

/** What a dialog did, once it has been shown. */
export const OUTCOME = {
  dismissed: 'dismissed',
  converted: 'converted',
};

/**
 * Whether a dialog has already had its turn with this visitor, whatever came
 * of it. Fails closed: an unreadable store answers yes.
 */
export function hasSeen(key) {
  try {
    return localStorage.getItem(key) !== null;
  } catch {
    return true;
  }
}

/**
 * What became of a dialog: an OUTCOME, or null if it has never been shown.
 * Fails closed to `converted`, which is the answer that stops another dialog
 * from opening.
 */
export function outcomeOf(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return OUTCOME.converted;
  }
}

/** Record what became of a dialog. Call it as the outcome happens. */
export function mark(key, outcome) {
  try {
    localStorage.setItem(key, outcome);
  } catch {
    /* Storage unavailable. Showing once per page load is an acceptable floor. */
  }
}

/*
 * Whether a dialog is on screen right now. Deliberately a module variable and
 * not storage: it describes this page view, and a value that outlived a crash
 * or a reload would lock every dialog out permanently.
 */
let dialogOpen = false;

export const isDialogOpen = () => dialogOpen;
export const setDialogOpen = (open) => {
  dialogOpen = open;
};
