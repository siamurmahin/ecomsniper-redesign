/**
 * 09 — Step by step, and the course that teaches it.
 *
 * Part of the copy deck — see `src/content/index.js`. English is the base;
 * German overlays it key by key from `../de`.
 */

import { SITE } from '../site';

/**
 * 09 — Step by step. The steps and the course, in one section: the steps are
 * what the course teaches, so listing them separately said it all twice.
 */
export const TRAINING = {
  eyebrow: 'Step by step',
  headline: 'Starting from ',
  headlineMark: 'zero',
  headlineTail: '?',
  lead: 'Dropship Mastery teaches the entire process, step by step.',
  steps: [
    { n: '01', text: 'Find an item on a retailer’s site and list it on eBay for a higher price.' },
    { n: '02', text: 'A customer buys the item from your eBay store.' },
    { n: '03', text: 'You order it from the retailer, shipped straight to your customer.' },
    { n: '04', text: 'You keep the difference in price. That is your profit.' },
  ],
  closer: {
    lead: 'You never buy stock. You never ship a box.',
    detail: 'No warehouse. No website. No money tied up in stock you might not sell.',
  },

  cta: SITE.startCta,
  guarantee: SITE.guarantee,
  course: {
    eyebrow: 'The course',
    name: 'Dropship Mastery',
    body: 'The step by step eBay dropshipping training that takes a complete beginner through the whole process. Included with every plan.',
    bullets: [
      'No inventory, no website',
      'Taught step by step',
      'Updated as eBay and the market change',
    ],

    /* The live site names the instructors inside the course card with both
       faces, so the old "taught by" bullet is gone rather than said twice.
       The people come from FOUNDERS.people, so the two lists cannot drift. */
    instructorsLabel: 'Your instructors',

    /* `modules` is unused. The live site shows no module list in this section,
       and adding one put four numbered things on screen twice — the model's
       steps, then four more inside the course card. Kept because it is real
       course structure and the pricing page may want it; nothing renders it. */
    modules: ['Account setup', 'Finding products', 'Your first listing', 'Scaling up'],
  },
};
