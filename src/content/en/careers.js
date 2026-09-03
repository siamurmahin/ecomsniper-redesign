/**
 * Careers.
 *
 * Their copy from ecomsniper.io/careers, captured 3 Sep 2026 — see
 * `docs/source-copy/careers.md`.
 *
 * Two decisions carried from that file:
 *
 * 1. **Ships static.** One open role does not need a CMS, and it certainly
 *    does not need the department/location/type/search filters their page
 *    renders over a single listing. A plain list until there is a second job.
 *
 * 2. **No invented description.** Their live listing reads "This is a one
 *    liner description" — placeholder text that reached production. Every
 *    other fact about the role is real and is kept; the description is left
 *    for the client rather than written by us, because a job advert is a
 *    promise about work and pay.
 */
export const CAREERS = {
  eyebrow: 'Careers',
  headline: 'Do the best work of your career, with us.',
  lead: 'A focused team building tools used by thousands of eBay sellers. Bring your craft. We will bring the runway.',

  openRoles: {
    eyebrow: 'Open roles',
    /* Their page says "1 open role". Written as a count so it stays honest
       when the list changes. */
    headline: 'One role open right now.',
    roles: [
      {
        title: 'Video Editor',
        department: 'Marketing',
        location: 'Remote',
        type: 'Full time',
        salary: 'BDT 15,000 – 25,000 / month',
        /* Awaiting the client. See the file header. */
        summary: null,
      },
    ],
  },

  speculative: {
    eyebrow: 'Nothing that fits',
    headline: 'Tell us what you do anyway.',
    body: 'We would rather hear from someone good with no matching role than miss them. Send what you have made and what you want to work on.',
    email: 'management@ecomsniper.io',
    cta: 'Email us',
  },
};
