/**
 * 10 — Who is behind it.
 *
 * Part of the copy deck — see `src/content/index.js`. English is the base;
 * German overlays it key by key from `../de`.
 */

/* 10 — Founders (NEW per deck) Trust in this category rests on the operator, not the software. */

export const FOUNDERS = {
  eyebrow: 'Who is behind this',
  headline: 'We built the tool we needed.',
  body: [
    'Sammy has been selling on eBay for seven years, starting from a bedroom and a borrowed laptop. Marc spent years in security before he moved into e-commerce full time, and now teaches the training end to end.',
    'EcomSniper started as the scripts we wrote to stop doing the same three tasks every night. Everything in it exists because it solved a problem we had first.',
  ],
  closer: 'We still run stores. We still take the questions in chat.',

  /* This section's own free door. It sits under two founders beside a book
     that says who the product is wrong for, so "before you pay" is the
     argument already being made — and it is a promise we can keep. */
  bookCta: { label: 'Read it before you pay', href: '/free-play-book' },
  /* Section 09's instructor row reads this too, so a change here moves both.
     detail is unused — section 10 says the same thing in full sentences —
     but it is real copy, so it stays for the pages that may want it. */
  people: [
    {
      name: 'Sammy',
      role: 'Co-founder',
      detail: '7 years selling on eBay. Still running stores today.',
      photo: 'founder-sammy',
    },
    {
      name: 'Marc Augustine',
      role: 'Co-founder, Head of Training',
      detail: 'Former security professional. Teaches Dropship Mastery.',
      photo: 'founder-marc',
    },
  ],
};
