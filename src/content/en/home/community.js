/**
 * 08 — The community.
 *
 * Part of the copy deck — see `src/content/index.js`. English is the base;
 * German overlays it key by key from `../de`.
 */

/* 08 — Support and community Deck: this is the real differentiator against cheaper tools. */

export const COMMUNITY = {
  eyebrow: 'Support and community',
  /* Split so the mark lives in the copy, not in the component. */
  headline: 'Here’s what',
  headlineMark: '“never alone”',
  headlineTail: ' looks like.',
  lead: 'Ask once. We’ve got you.',
  body: 'Get stuck at 2am and a real person answers. Behind that reply is a private community of members walking the same path, and a live meeting every week where you can ask anything.',
  items: [
    {
      icon: 'headset',
      title: '24/7',
      label: 'Help that never sleeps',
      body: 'Chat support answered around the clock, 7 days a week.',
      tone: 'blue',
    },
    {
      icon: 'people',
      title: '400+',
      label: 'A private community',
      body: 'Members at every stage, from first listing to full-time.',
      tone: 'gold',
    },
    {
      icon: 'videoCamera',
      title: 'Weekly',
      label: 'Live meetings',
      body: 'Ask anything, live, with the people who built the tool.',
      tone: 'green',
    },
  ],

  /* The illustration this section is built on, labelled as one. */
  drawn: {
    /* The live site heads this card the same way, down to the online dot. */
    support: { name: 'EcomSniper Support', status: 'Online now' },
    question: { time: '02:14', body: 'My listing just got blocked. Anyone seen this before?' },
    replies: [
      {
        time: '02:16',
        body: 'Seen it — it is the category, not the listing. Fix is two clicks.',
        role: 'EcomSniper Support',
      },
      {
        time: '02:17',
        body: 'Same thing happened to me last week. That fixed it.',
        role: 'Member',
      },
    ],
    typing: 'Two more members replying',
    call: {
      title: 'Weekly live call',
      body: 'Ask anything, live, with the people who built the tool.',
      /* Overlapping initial discs and a count, as the live site draws them. */
      initials: [
        { letter: 'A', tone: 'blue' },
        { letter: 'S', tone: 'red' },
        { letter: 'M', tone: 'green' },
        { letter: 'L', tone: 'gold' },
      ],
      overflow: '400+',
    },
    caption:
      'An illustration of how a question gets answered — not a capture of a real conversation.',
  },

  /* A verbatim member quote about support, from the reviews above. */
};

/* 09 — The course Deck: rename the middle plan so it stops colliding with the course name. */
