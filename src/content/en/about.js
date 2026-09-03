/**
 * The About page.
 *
 * Their copy, captured from ecomsniper.io/about on 3 Sep 2026 — see
 * `docs/source-copy/about.md`. It is the best-written page on their site and
 * it is kept close to verbatim, because its whole argument is that the company
 * is careful with other people's money and the plain voice is the argument.
 *
 * Two changes, both decided with the client:
 *
 * 1. Their page closes on "30-day refund policy". The refund is the monthly
 *    plan only — not the credits bundle, not Enterprise — so it says so here,
 *    as the rest of this deck already does. An unqualified promise the pricing
 *    page contradicts is the one thing this rebuild will not carry forward.
 *
 * 2. Two of their sections render a heading and no body: "How this started"
 *    and "What you actually get". Nothing was invented to fill them. The
 *    second is answered by the closing line the page already has, and the
 *    first is left out until the client supplies it — a heading over silence
 *    reads worse than an absence.
 */
export const ABOUT = {
  eyebrow: 'About us',
  headline: 'We know what it took to earn this money.',
  /* Their page sets one word of the headline in an inverted block, and the
     same device on the statement below it. Split so the mark is content
     rather than markup guesswork — the concatenation still reads as the
     sentence above, which is what a screen reader and the meta tag get. */
  headlineParts: [
    { text: 'We know what it ' },
    { text: 'took', mark: true },
    { text: ' to earn this money.' },
  ],
  statementParts: [
    { text: 'When you pay for something, you are giving us ' },
    { text: 'hours of your life', mark: true },
    { text: '. We think about that.' },
  ],

  /* The figure their page opens on. $200 is the monthly charge as the client
     frames it — $97 the first month, $199 after. */
  /* Their hero runs these three as short separate lines before the
     statement. Missed on the first capture. */
  hours: ['The late shifts.', 'The overtime.', 'The tired mornings.'],
  statement:
    'When you pay for something, you are giving us hours of your life. We think about that.',

  figure: {
    value: '$200',
    label: 'What a month costs',
  },

  /* The page had no door until its last screen. Pricing first, then the
     playbook — the free one matters here, because this page is written for
     the person who is not ready and is told not to rush. */
  ctas: {
    primary: { label: 'View pricing', href: '/pricing' },
    secondary: { label: 'Get the free playbook', href: '/free-play-book' },
  },

  cost: {
    eyebrow: 'The cost',
    headline: 'We know what this costs.',
    /* The first sentence of `body`, split so the hero can show it as a
       comparison. Their words, rearranged — the hero and the section below it
       therefore say the same thing twice on purpose: once as a figure, once
       as prose. If the hero variant that uses these is not chosen, delete
       `hours` and `unknown` with it. */
    hours: [
      { who: 'For some people', what: 'a few hours of work' },
      { who: 'For others', what: 'a week of early mornings and long days' },
    ],
    unknown: 'We do not know which one you are.',
    body: [
      'For some people, $200 is a few hours of work. For others, it is a week of early mornings and long days. We do not know which one you are. So we treat everyone like the second.',
      'That means we are careful. We do not rush features that are not ready. We do not promise things we are not sure about. We would rather move slow and get it right.',
      'It also means we answer support messages like the person on the other end worked hard for this. Because they did.',
    ],
  },

  /* Missed on the first capture: their page renders this in full. */
  origin: {
    eyebrow: 'How this started',
    headline: 'How this started.',
    body: [
      'Years ago, we were doing all of this by hand. Finding products. Making listings. Checking prices every day. It took hours. The results were okay, but the work never stopped.',
      'So we built some tools to make it easier for ourselves. Then other people asked if they could use them too. That is how this became a company.',
      'We are not geniuses. We just got tired of doing the same thing over and over. And now we feel responsible for the people who pay us to make their work easier.',
    ],
  },

  giving: {
    eyebrow: 'The giving',
    headline: 'Where some of it goes.',
    lead: 'Part of what you pay us goes to people who need it more.',
    /* Their copy names three things in one sentence. Split into three so the
       page can show them rather than bury them mid-paragraph. The bodies are
       their sentence verbatim; the labels are headers over their own words,
       not new claims. */
    gifts: [
      { label: 'Orphanages', body: 'We visit orphanages.' },
      {
        label: 'Medical care',
        body: 'We help families who cannot afford medical care.',
      },
      {
        label: 'Schools',
        body: 'We support schools that are struggling to stay open.',
      },
    ],
    body: [
      'This is not marketing. It is just something we do. When you join, you become part of it too.',
    ],
    everySubscription: 'Every subscription helps us do a little more for people who need it.',
    /* Their gallery. Six captions on their page; the sixth image is a stock
       photograph and is deliberately not carried over — see
       `docs/source-copy/about.md`. Photographs still to be supplied. */
    gallery: [
      { caption: 'School supplies for children', alt: 'Supporting education', image: 'education' },
      { caption: 'Time spent at the orphanage', alt: 'Orphanage visit', image: 'orphanage' },
      { caption: 'School supplies distribution', alt: 'Community support', image: 'supplies' },
      { caption: 'Medical support program', alt: 'Medical assistance', image: 'medical' },
      { caption: 'Orphanage visit', alt: 'Education program', image: 'visit' },
      /* The stock photograph. Their caption, their slot — but not their
         photograph, and it must not launch this way. */
      {
        caption: 'Moments that matter',
        alt: 'Children smiling',
        image: 'moments',
        placeholder: true,
      },
    ],
    closer: 'We share this because you are part of it now. Not to impress.',
  },

  boundaries: {
    eyebrow: 'The boundaries',
    headline: 'Things we will not do.',
    items: [
      {
        icon: 'salesGrowth',
        tone: 'blue',
        lead: 'We will not show you screenshots of big earnings.',
        body: 'Those create false hope. They make people spend money expecting the same results. That is not fair to you.',
      },
      {
        icon: 'close',
        tone: 'red',
        lead: 'We will not rush you with countdown timers',
        body: 'or "limited spots." If you need a week to decide, take a week. We will still be here.',
      },
      {
        icon: 'people',
        tone: 'gold',
        lead: 'We will not try to get as many signups as possible.',
        body: 'We would rather have 100 users who get real value than 1,000 who feel like they wasted their money.',
      },
      {
        icon: 'shield',
        tone: 'green',
        lead: 'We will not disappear',
        body: 'when things go wrong. If something breaks or does not work for you, that is our problem to fix. Not yours to figure out alone.',
      },
    ],
    closer: 'These choices mean slower growth. That is okay with us.',
  },

  responsibility: {
    eyebrow: 'The responsibility',
    headline: 'When things do not work out.',
    body: [
      'Sometimes people try everything and it still does not click. They put in the time. They follow the steps. And it just does not work for them.',
      'When that happens, we do not shrug and say "well, we never promised anything." That might be true on paper. But it does not feel right to us.',
      'We offer refunds. We try to help. But more than that, we remember that this person gave us their money and their time. Those hours do not come back.',
      'We cannot promise everyone will succeed. Nobody can. But we can promise that if it does not work out, we will not act like that is not our business.',
      'If you give this an honest try and it still does not work, we share some of that responsibility. That is how we see it.',
    ],
  },

  /* Missed on the first capture. Their eyebrow for it is "The offer". */
  offer: {
    eyebrow: 'The offer',
    headline: 'What you actually get.',
    items: [
      {
        lead: 'Tools that do the boring stuff.',
        body: 'Listing products. Watching prices. Tracking stock. The things that eat up hours when you do them by hand.',
      },
      {
        lead: 'Support from people who have actually done this work.',
        body: 'When you ask a question, you get a real answer. Not a script.',
      },
      {
        lead: 'A community of people figuring it out together.',
        body: 'Some days are good. Some are frustrating. People share both.',
      },
    ],
    closer:
      'That is it. We save you time on the repetitive stuff so you can spend it on the parts that need a human brain.',
  },

  team: {
    eyebrow: 'The team',
    headline: 'Who we are.',
    body: [
      'A small team. We like it that way. It means we actually know what is going on with our users. We read the support messages ourselves.',
      'We are not trying to become a huge company. We are trying to be useful to the people who trust us.',
    ],
    /* Missed on the first capture. Their page runs it beside a portrait. */
    quote: {
      text: 'I remember spending full weekends on work that went nowhere. That feeling stuck with me. It is why I care about not wasting other people’s time. Time is the one thing you cannot get back.',
      name: 'Sammy',
      role: 'Founder',
      portraitAlt: 'Sammy, founder of EcomSniper',
    },
  },

  invitation: {
    eyebrow: 'The invitation',
    headline: 'If you are thinking about it.',
    body: [
      'Take your time. Look around. Read the reviews. There is no rush.',
      'If it is not right for you, that is fine. We would rather you make the right choice than a fast one.',
      'And if you do join, we will do our best to be worth the hours you worked to pay for this.',
    ],
    cta: { label: 'View pricing', href: '/pricing' },
    /* "Take your time. There is no rush." is this section's own copy, and
       until now the only thing to do after reading it cost $97. */
    secondaryCta: { label: 'Get the free playbook', href: '/free-play-book' },
    /* Qualified. Their page says "30-day refund policy" flat; the credits
       bundle and Enterprise are final sale. */
    assurance: '30 day money back guarantee on the monthly plan',
    closer: 'The training, the software, and the people who guide you. All in one place.',
  },
};
