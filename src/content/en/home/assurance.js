/**
 * 14 — Countries, and the guarantee.
 *
 * Part of the copy deck — see `src/content/index.js`. English is the base;
 * German overlays it key by key from `../de`.
 */

import { SITE } from '../site';

/* 14 — Countries and guarantee (MERGED per deck) Deck: the unqualified "no refunds, final sale" line contradicted this. Fixed by naming exactly which plans the guarantee covers. */

export const ASSURANCE = {
  countries: {
    eyebrow: 'Supported countries',
    headline: 'Will it work where you live?',
    body: 'EcomSniper supports the United States, the United Kingdom, Germany, France, Australia, Canada, Spain and Italy.',
    /* Split out of `body`. On their own page it closes the block after the
       flags rather than trailing the sentence that lists them. */
    closer: 'Wherever you start, it is the same training, the same software, the same support.',
    list: [
      { name: 'United States', code: 'US' },
      { name: 'United Kingdom', code: 'UK' },
      { name: 'Germany', code: 'DE' },
      { name: 'France', code: 'FR' },
      { name: 'Australia', code: 'AU' },
      { name: 'Canada', code: 'CA' },
      { name: 'Spain', code: 'ES' },
      { name: 'Italy', code: 'IT' },
    ],
  },
  guarantee: {
    eyebrow: 'The guarantee',
    headline: 'Still not sure?',
    body: 'Try the monthly plan for 30 days. If it is not for you, message us and we send your money back. No questions asked.',
    /* Four lines, not one sentence. Run together in a paragraph they read
       as a slogan; stacked they read as four separate promises, which is
       what they are. Shared with /pricing so neither can drift. */
    promises: SITE.promises,
    /* The stamp. Two words, because it is read as a mark and not as a
       sentence. */
    seal: { top: '30', bottom: 'Days' },
    /* The strip. Repeated by the component, so the copy states it once. */
    marquee: '30 day money back guarantee',
    /* A door. Their pricing page puts a button under this claim and this
       section had none, so the reader hit the end of the argument with
       nowhere to go. The reassurance names the plan, as it does everywhere. */
    /* The label above the price in the close panel. Two words, because the
       panel is a door and not a pitch. */
    ctaEyebrow: 'Start today',
    cta: SITE.startCta,
    reassurance: SITE.guarantee + '.',
    /* Their own closing line, off the live pricing page. It is the whole
       argument of the section in seven words. */
    closer: 'Now you have no risk. So you have no excuses.',
  },
};
