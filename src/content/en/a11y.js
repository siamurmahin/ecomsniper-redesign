/**
 * Strings only a screen reader hears.
 *
 * Part of the copy deck — see `src/content/index.js`. English is the base;
 * German overlays it key by key from `../de`.
 */

/**
 * Labels only assistive tech reads, plus the few visible ones the layout
 * writes itself. Hardcoded in the JSX before this, so a screen reader on the
 * German site announced every one of them in English.
 *
 * {n} and {total} are filled in at the call site.
 */
export const A11Y = {
  close: 'Close',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  language: 'Language',
  backToTop: 'Back to top',
  home: 'EcomSniper home',
  navPrimary: 'Primary',
  navMobile: 'Mobile',
  navFooter: 'Footer',
  navQuestionGroups: 'Question groups',
  proofRegion: 'Proof and trust signals',
  prevReview: 'Previous review',
  nextReview: 'Next review',
  prevInterview: 'Previous interview',
  nextInterview: 'Next interview',
  included: 'Included',
  partlyIncluded: 'Partly included',
  notIncluded: 'Not included',
  rating: 'Rated {n} out of 5',
  step: 'Step {n} of {total}',
  stepWithTitle: 'Step {n} of {total}: {title}',
};
