/**
 * 11 — Against a listing tool.
 *
 * Part of the copy deck — see `src/content/index.js`. English is the base;
 * German overlays it key by key from `../de`.
 */

/* 11 — Comparison (NEW per deck) Honest: we lose rows on purpose, which is what makes the wins believable. */

export const COMPARISON = {
  eyebrow: 'Honest comparison',
  headline: 'What you get that a listing tool does not.',
  lead: 'Most dropshipping tools sell you software and leave you to work out the business. Here is the difference, including where we lose.',
  columns: ['EcomSniper', 'Typical listing tool'],
  rows: [
    { feature: 'Bulk lister', us: true, them: true },
    { feature: 'Price and stock monitoring', us: true, them: true },
    { feature: 'Competitor research', us: true, them: true },
    { feature: 'One click fulfilment', us: true, them: 'partial' },
    { feature: 'Full training course included', us: true, them: false },
    { feature: 'Private community', us: true, them: false },
    { feature: 'Live weekly calls', us: true, them: false },
    { feature: '24/7 human support', us: true, them: false },
    { feature: 'Done for you setup', us: 'Enterprise plan', them: false },
    { feature: 'Cheapest possible price per month', us: false, them: true },
    { feature: 'Free plan', us: false, them: 'partial' },
  ],
  /* Labels only. Which group a row belongs to is worked out from its own
     values at render — `us === false` is a loss, `them === false` is a win,
     anything else is shared — so the grouping cannot drift out of step with
     the table it describes. */
  groupLabels: {
    both: 'Both do this',
    ours: 'Only EcomSniper',
    theirs: 'Where a listing tool wins',
  },
  /* The two lost rows are the section's whole credibility. Said plainly once,
     so a shape can lead with it rather than leaving it to be inferred from
     two dashes at the bottom of a table. */
  concession: 'A bare listing tool is cheaper, and some have a free plan. Both true.',

  /* The line that turns the admission into an offer. The concession above it
     hands the reader the cheaper option; this is the question that puts the
     decision back in front of them without arguing. */
  pivot: 'So the only question left is which one you actually want.',

  /* The plans live on /pricing rather than on this page, so every door
     labelled with the price goes there. Same label section 03 and the proof
     wall use for the same jump. */
  cta: { label: 'See what it costs', href: '/pricing' },
  closer:
    'If price per month is the only thing that matters to you, a bare listing tool will be cheaper. If you want the business taught and the people around it, that is what we built.',
};
