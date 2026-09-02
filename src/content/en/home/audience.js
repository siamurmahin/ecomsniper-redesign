/**
 * 03 — Who it is for.
 *
 * Part of the copy deck — see `src/content/index.js`. English is the base;
 * German overlays it key by key from `../de`.
 */

/* 03 — Who this is for Deck: collapse three near-empty viewports into one screen. */

export const AUDIENCE = {
  eyebrow: 'First things first',
  headline: 'Is this going to work for',
  headlineMark: 'you',
  headlineTail: '?',
  lead: "Let's start with the people already doing it.",
  /* The label under every story. Named once so the eight cannot drift apart. */
  memberLabel: 'Real EcomSniper member',
  /* Rory's line is a real quote. The other seven are written from facts
     already in each story, so they are the first thing to swap for real ones. */
  people: [
    {
      name: 'Rory',
      role: 'Works a 9-to-5',
      icon: 'briefcase',
      quote: "I didn't want to quit my job, I wanted a safety net.",
      story:
        'Rory lists around his work schedule, aiming to eventually replace his 9-to-5 and get more time back for his family.',
    },
    {
      name: 'Opeyemi',
      role: 'Delivery driver and gig worker',
      icon: 'scooter',
      title: 'Still riding, 3,500+ orders in',
      story:
        'Opeyemi delivers on a bike between shifts. Hit £400/day at his peak, got hit with a suspension, came back anyway. 3,500+ orders and still riding.',
    },
    {
      name: 'Jennifer',
      role: 'Stay-at-home parent',
      icon: 'home',
      title: 'Years on Poshmark, now a real store',
      story:
        'Mother of two, background in childcare, been reselling on Poshmark for years. Jennifer just moved that same hustle into a real store, one listing at a time.',
    },
    {
      name: 'Skyler',
      role: 'Career switcher, corporate job',
      icon: 'graduationCap',
      title: '2,300+ orders, listed on the side',
      story:
        "Skyler's worked retail, vending machines, even therapy. Now he's in tech support by day. Lists 100 to 300 items daily on the side. 2,300+ orders in.",
    },
    {
      name: 'Will',
      role: 'Complete beginner, first time online',
      icon: 'seedling',
      title: 'Never made a dollar online, until he automated it',
      story:
        "Will had never made a dollar online. Found the founder's book on Reddit, figured manual listing wasn't it, automated the whole thing instead.",
    },
    {
      name: 'Steven',
      role: 'Young and just starting out',
      icon: 'magnifier',
      title: '20 years old, 70,000+ credits used',
      story:
        '20 years old, no business background, heard about it from a friend. Steven just kept listing through the slow weeks. 70,000+ credits used since.',
    },
    {
      name: 'Caleb',
      role: 'Started with nothing, now full-time',
      icon: 'verified',
      title: 'Rebuilt from scratch, now his main income',
      story:
        'Caleb was unemployed, dropshipping alone and losing money elsewhere. Rebuilt from scratch. 5,600+ real orders later, this is his main income now.',
    },
    {
      name: 'Chris',
      role: 'Established seller who scaled up',
      icon: 'salesGrowth',
      title: 'Night shifts five days a week, still lists daily',
      story:
        '52, married, two kids, already selling on Walmart. Chris works night shifts five days a week and still finds time to list daily. Nearly 1,000 orders.',
    },
  ],
  /* Three beats, kept apart: the line, the turn, the question. */
  closer: {
    beats: ['Different lives.', 'Same system.'],
    questionLead: 'Could',
    questionMark: 'you',
    questionTail: 'be next?',
    /* Ends on the cue, not a full stop — the question needs an answer below. */
    cta: { label: 'See what it costs', href: '/pricing', nudge: 'Be next' },
  },
};
