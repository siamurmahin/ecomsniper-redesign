/**
 * 06 — The three pillars, the page's own table of contents.
 *
 * Part of the copy deck — see `src/content/index.js`. English is the base;
 * German overlays it key by key from `../de`.
 */

import { SITE } from '../site';

/* 06 — Three things, one system */

export const PILLARS = {
  eyebrow: 'The system',
  /* Marked on the one word that carries the sentence, like section 03's "you". */
  headline: 'Three things.',
  headlineMark: 'One system',
  headlineTail: '.',
  /* Closes the section and hands over to 07, as the live site does. */
  closer: {
    lead: 'Each one plays a different role.',
    cta: SITE.startCta,
  },
  lead: 'Everything you need to build your eBay business.',
  /* Tones follow the live site: software blue, community gold, training green. */
  items: [
    {
      n: '01',
      title: 'The software',
      body: 'It finds products, lists them with one click, fulfils orders, and watches your store for you.',
      icon: 'robot',
      anchor: '#how-it-works',
      tone: 'blue',
    },
    {
      n: '02',
      title: 'The community',
      body: 'Support 24/7, a private community, and weekly live meetings.',
      icon: 'people',
      anchor: '#community',
      tone: 'gold',
    },
    {
      n: '03',
      title: 'The training',
      body: 'Dropship Mastery: the entire process, taught step by step.',
      icon: 'graduationCap',
      anchor: '#training',
      tone: 'green',
    },
  ],
};
