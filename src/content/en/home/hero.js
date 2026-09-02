/**
 * 01 — The hero, and the panel beside it.
 *
 * Part of the copy deck — see `src/content/index.js`. English is the base;
 * German overlays it key by key from `../de`.
 */

import { SITE } from '../site';

/* 01 — Hero Deck: keep the strike-through, replace the 99% claim with a price signal, add a second, free door for the 95% who are not ready to pay today. */

export const HERO = {
  eyebrow: '400+ members · 8 countries · 24/7 support',
  headlineParts: [
    { text: 'ESCAPE THE ', tone: 'plain' },
    { text: '9 TO 5', tone: 'strike' },
    { text: '.', tone: 'plain' },
    { text: 'BUILD PASSIVE INCOME THAT RUNS ', tone: 'plain', breakBefore: true },
    { text: 'WHILE YOU SLEEP', tone: 'mark' },
    { text: '.', tone: 'plain' },
  ],
  blessing: { arabic: 'In shaa Allah', translation: 'IF GOD WILLS' },
  /* Only the last word is typed. Deleting the whole phrase empties the line. */
  markPrefix: 'WHILE YOU',
  markWords: ['SLEEP', 'WORK', 'COMMUTE'],
  subhead:
    'Software that lists for you. Training that starts from zero. And people who answer at 2 in the morning.',
  primaryCta: SITE.startCta,
  secondaryCta: { label: 'Get the free playbook', href: '/free-play-book' },
  /* The handwritten note pointing at the secondary button. */
  secondaryNote: 'Grab it for free',
  /* Price and risk reversal sit under the hero buttons, not 900px down. */
  assurances: [
    { lead: 'From $97', detail: 'for your first month', tone: 'blue', icon: 'salesGrowth' },
    { lead: '30 day', detail: 'money back on the monthly plan', tone: 'green', icon: 'shield' },
    { lead: 'No inventory', detail: 'and no website to build', tone: 'gold', icon: 'seedling' },
  ],
  /* The two objections a beginner arrives with, answered before we argue. */
  support: [
    { title: 'No experience needed', body: 'Guided step by step' },
    { title: 'An active community', body: 'You are not walking alone' },
  ],
};

/* 01b — The hero panel */

/**
 * What the software does to one product, in four beats. The numbers are an
 * illustration and labelled as one — the point is that it repeats.
 */
export const HERO_PANEL = {
  windowLabel: 'EcomSniper',
  statusLabel: 'Working',
  beats: [
    {
      tone: 'blue',
      chip: 'Product Hunter',
      title: 'Finds a product already selling',
      rows: [
        { label: 'Sold in the last 30 days', value: '142' },
        { label: 'Margin per sale', value: '$11.40' },
      ],
      status: 'Found',
    },
    {
      tone: 'red',
      chip: 'AI Lister',
      title: 'Writes the listing and puts it live',
      rows: [
        { label: 'Title, specifics, description', value: 'Written for you' },
        { label: 'Your part', value: 'One click' },
      ],
      status: 'Listed',
    },
    {
      tone: 'green',
      chip: 'Price & stock monitor',
      title: 'The retailer moves. Your listing follows.',
      rows: [
        { label: 'Retailer price', value: '$24.99 → $22.49' },
        { label: 'Checked', value: '24/7' },
      ],
      status: 'Updated',
    },
    {
      tone: 'gold',
      chip: 'One-click fulfilment',
      title: 'A sale lands. You confirm once.',
      rows: [
        { label: 'Order total', value: '$38.90' },
        { label: 'Your profit', value: '$13.20' },
      ],
      status: 'Paid',
    },
  ],
  /* The fifth beat, and why it does not loop: the demo ends, the work does not. */
  finale: {
    chip: 'And again',
    title: 'That was one product. The software does not stop at one.',
    body: 'Up to 3,000 listings a month on the monthly plan, running while you are asleep.',
    cta: { label: 'Start for $97', href: SITE.signupUrl },
    replay: 'Watch it again',
  },
};
