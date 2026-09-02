/**
 * 07 — What the software does.
 *
 * Part of the copy deck — see `src/content/index.js`. English is the base;
 * German overlays it key by key from `../de`.
 */

import { SITE } from '../site';

/* 07 — What the software does */

export const FEATURES = {
  eyebrow: "Let's start with the software",
  headline: 'The software does the heavy lifting.',
  lead: 'It handles the repetitive work. You make the decisions.',
  /* One colour per step, in the live site's order: find, list, watch, fulfil. */
  items: [
    {
      n: '1',
      title: 'Find products already selling',
      body: 'Product Hunter and Competitor Research surface items that are moving right now, so you are not guessing.',
      metric: 'Live sales data',
      tone: 'blue',
      links: [
        { label: 'Product Hunter', href: 'https://ecomsniper.io/productHunterV6' },
        { label: 'Competitor Research', href: 'https://ecomsniper.io/competitorResearchV6' },
      ],
    },
    {
      n: '2',
      title: 'List them in one click',
      body: 'AI writes the title, the description and the item specifics. Up to 3,000 listings a month on the monthly plan.',
      metric: 'Up to 3,000 listings / month',
      tone: 'red',
      links: [{ label: 'AI Powered Lister', href: 'https://ecomsniper.io/aiListerV6' }],
    },
    {
      n: '3',
      title: 'It watches your store for you',
      body: 'Price or stock changes at the retailer, and your listing updates in the background.',
      metric: '24/7 price & stock monitoring',
      tone: 'green',
      links: [{ label: 'Price Monitoring', href: 'https://ecomsniper.io/priceMonitorV6' }],
    },
    {
      n: '4',
      title: 'Orders finish in one click',
      body: 'A sale comes in, you confirm once, and EcomSniper prepares the rest.',
      metric: 'One-click fulfilment',
      tone: 'gold',
      links: [],
    },
  ],
  /* The live site closes this way too: payoff, door, then a question that
     section 08 answers in the same words. */
  closer: {
    lead: 'More time building. Less time clicking.',
    cta: SITE.startCta,
    guarantee: SITE.guarantee,
    /* Marked on the same two words section 08's headline quotes. */
    bridge: {
      lead: 'And if you ever get stuck? You are',
      mark: 'never alone',
      tail: '.',
    },
  },
};
