/**
 * The consent banner's words.
 *
 * Plain about what is being asked and what happens either way. No "we value
 * your privacy" — a banner that opens by claiming a virtue is a banner nobody
 * finishes reading, and the visitor is one click from either answer.
 *
 * The category descriptions name the actual vendors rather than saying
 * "our partners", because the cookie policy names them too and a visitor who
 * checks should find the same answer in both places.
 */
export const CONSENT = {
  banner: {
    title: 'Cookies',
    body: 'Essential cookies keep the site working. Everything else — measuring how the site is used, and advertising — only runs if you say yes.',
    policyLabel: 'Cookie policy',
    acceptAll: 'Accept all',
    rejectAll: 'Reject all',
    customise: 'Customise',
    /* On the region wrapping the banner, so a screen reader announces what
       arrived rather than reading the buttons out of nowhere. */
    ariaLabel: 'Cookie choices',
  },

  panel: {
    title: 'Choose what runs',
    body: 'You can change this any time from the link in the footer.',
    save: 'Save choices',
    acceptAll: 'Accept all',
    back: 'Back',
    close: 'Close',
    alwaysOn: 'Always on',
  },

  categories: {
    essential: {
      label: 'Essential',
      body: 'Remembers your language and this choice. The site cannot work without them, and they are never used to track you.',
    },
    analytics: {
      label: 'Analytics',
      body: 'Which pages get read and where people stop. Google Analytics, loaded through Google Tag Manager.',
    },
    marketing: {
      label: 'Marketing',
      body: 'Measures whether an ad led somewhere, and builds advertising audiences. Meta and TikTok, loaded through Google Tag Manager.',
    },
  },

  /* The footer link that reopens the choice. */
  reopen: 'Cookie choices',
};
