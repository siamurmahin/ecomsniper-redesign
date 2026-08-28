/**
 * Single source of truth for every word on the site, from the approved copy
 * deck (27 Aug 2026). Two rules are enforced here rather than in the UI
 * because they are claim issues: no "99% make 1-3k", and the guarantee always
 * carries the same qualification.
 */

/* Global */

export const SITE = {
  name: 'EcomSniper',
  domain: 'https://ecomsniper.io',
  // App links live on a separate host; kept here so a change is one edit.
  signupUrl: 'https://app.ecomsniper.io/register',
  loginUrl: 'https://app.ecomsniper.io/login',
  discordUrl: 'https://discord.gg/ecomsniper',
  trustpilotUrl: 'https://uk.trustpilot.com/review/ecomsniper.io',
};

export const NAV_LINKS = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Proof', href: '/#proof' },
  { label: 'Training', href: '/#training' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/#faq' },
];

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
  /* Only the last word is typed: deleting the whole phrase would empty the
     gradient block twice a cycle. Single words so it breathes evenly. */
  markPrefix: 'WHILE YOU',
  markWords: ['SLEEP', 'WORK', 'COMMUTE'],
  subhead:
    'Software that lists for you. Training that starts from zero. And people who answer at 2 in the morning.',
  primaryCta: { label: 'Start your eBay business', href: SITE.signupUrl },
  secondaryCta: { label: 'Get the free playbook', href: '/free-playbook' },
  /* Deck: price and risk reversal go under the hero buttons, not 900px down.
     Lead and detail are separate so the hero can set them at two weights —
     three equal-weight sentences read as small print. "On the monthly plan"
     keeps the guarantee honest and stays attached to it. */
  assurances: [
    { lead: 'From $97', detail: 'for your first month', tone: 'blue', icon: 'salesGrowth' },
    { lead: '30 day', detail: 'money back on the monthly plan', tone: 'green', icon: 'shield' },
    { lead: 'No inventory', detail: 'and no website to build', tone: 'gold', icon: 'seedling' },
  ],
  /* The two objections a beginner arrives with, answered in one line each so
     nobody leaves before the sections that answer them properly. */
  support: [
    { title: 'No experience needed', body: 'Guided step by step' },
    { title: 'An active community', body: 'You are not walking alone' },
  ],
};

/* 01b — The hero panel */

/**
 * What the software does to one product, in four beats. The numbers are an
 * illustration, labelled as one in the panel, and deliberately ordinary — the
 * argument is that it repeats, not that it is spectacular.
 */
export const HERO_PANEL = {
  windowLabel: 'EcomSniper',
  statusLabel: 'Working',
  caption: 'An illustration of the flow. Not a screenshot of a live account.',
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
  /* The fifth step, and why the sequence does not loop: a demonstration that
     restarts itself spends the highest-intent moment on a repeat. The run ends
     here, autoplay stops, and the ask sits where the interest is. The claim is
     a plan limit, not a promise about earnings. */
  finale: {
    chip: 'And again',
    title: 'That was one product. The software does not stop at one.',
    body: 'Up to 3,000 listings a month on the monthly plan, running while you are asleep.',
    cta: { label: 'Start for $97', href: SITE.signupUrl },
    replay: 'Watch it again',
  },
};

/* 02 — Proof bar (NEW per deck) One static strip, directly under the hero. Every number is checkable. */

export const PROOF_BAR = {
  intro: 'Trusted by sellers in the US, UK, Canada, Australia, Germany, France, Spain and Italy',
  /* `countTo` opts a figure into the count-up; `value` is what it settles on,
     and what shows without JS. Only real quantities count — animating "24/7"
     would be decoration pretending to be data. */
  items: [
    {
      value: '4.6',
      countTo: 4.6,
      label: 'Trustpilot score',
      detail: 'from 90+ reviews',
      href: SITE.trustpilotUrl,
    },
    { value: '400+', countTo: 400, suffix: '+', label: 'Members', detail: 'building income on eBay' },
    { value: '24/7', label: 'Support answered', detail: '7 days a week' },
    { value: 'eBay · Amazon', label: 'Works with', detail: 'the marketplaces you already know' },
  ],
};

/* 03 — Who this is for Deck: collapse three near-empty viewports into one screen. */

export const AUDIENCE = {
  eyebrow: 'First things first',
  headline: 'Is this going to work for',
  headlineMark: 'you',
  headlineTail: '?',
  lead: "Let's start with the people already doing it.",
  people: [
    { name: 'Rory', role: 'Works a 9 to 5', icon: 'briefcase', quote: "I didn't want to quit my job, I wanted a safety net." },
    { name: 'Opeyemi', role: 'Delivery driver', icon: 'scooter', quote: 'I list between shifts. It adds up.' },
    { name: 'Jennifer', role: 'Stay at home parent', icon: 'home', quote: 'Two hours after bedtime is all I get. It is enough.' },
    { name: 'Skyler', role: 'Career switcher', icon: 'graduationCap', quote: 'I needed something I could learn without a degree.' },
    { name: 'Will', role: 'Complete beginner', icon: 'seedling', quote: 'I had never sold anything online. Not one thing.' },
    { name: 'Steven', role: 'Just starting out', icon: 'magnifier', quote: 'The first sale is the part nobody tells you about.' },
    { name: 'Caleb', role: 'Full time income', icon: 'verified', quote: 'This replaced my wage in under a year.' },
    { name: 'Chris', role: 'Scaled up seller', icon: 'salesGrowth', quote: 'One store became three. The software handles it.' },
  ],
  closer: 'Different lives. Same system. Could you be next?',
};

/* 04 — Proof: video, reviews, receipts Deck: strongest section, keep the structure. Three fixes applied: live Trustpilot link, no truncated reviews, disclaimer under the receipts. */

export const PROOF = {
  eyebrow: "Let's see",
  headline: 'But does it',
  headlineMark: 'really',
  headlineTail: 'work?',
  lead: 'Real members answer that question. Watch them, read them, or look at the receipts.',

  /* Thumbnails are local and named after the video, so a poster can never end
     up on the wrong clip. Nothing loads from YouTube until play is pressed. */
  videos: [
    {
      id: 'SosyiNFvbVc',
      title: 'Learn how this 21 year old makes $1600 a month dropshipping on eBay',
      guest: 'Member interview',
      thumb: 'thumb-21-year-old-1600-month',
    },
    {
      id: 'sTVqFsxxwIo',
      title: 'From selling books to dropshipping on eBay, an in-depth comparison',
      guest: 'Ft. Adam',
      thumb: 'thumb-book-seller-comparison',
    },
    {
      id: '-cDk4ztkWaw',
      title: 'From TikTok dropshipping to eBay, what it takes to be successful',
      guest: 'Ft. Dollins',
      thumb: 'thumb-tiktok-to-ebay',
    },
    {
      id: 'uW1LL8NSvaI',
      title: 'Why you will never be rich dropshipping on eBay without virtual assistants',
      guest: 'Ft. Oleg',
      thumb: 'thumb-virtual-assistants',
    },
    {
      id: 'Bm9UKs-Lw_o',
      title: 'Converting eBay traffic into loyal customers, a forgotten art',
      guest: 'Ft. Jon',
      thumb: 'thumb-loyal-customers',
    },
  ],

  /* Screenshots members posted themselves. The deck's "receipts". */
  receipts: [
    {
      key: 'receipt-sales-31-days',
      caption: '$5,059.44 in 31 days',
      detail: 'A member’s eBay sales dashboard, shared in the community.',
    },
    {
      key: 'receipt-rory-listings',
      caption: '4,224 active listings',
      detail: 'Rory, on his way to 10,000 listings at a 65% profit margin.',
    },
    {
      key: 'receipt-two-accounts',
      caption: 'Two accounts, all-time highs',
      detail: 'Posted in the Discord: results across two stores in the same week.',
    },
  ],

  reviews: [
    {
      name: 'Manor',
      country: 'GB',
      when: '2 months ago',
      title: 'Good software, very few issues',
      body: 'Good software very few issues, team is super helpful. You can ask a question 24/7 and someone will respond. Cost 99 USD for the first month and it made me 500 USD, so 100% worth it in regards to money spent for what you get back. Overall I am happy.',
    },
    {
      name: 'Rayhan',
      country: 'GB',
      when: '3 months ago',
      title: 'Great software',
      body: "I've been using EcomSniper for just under a month and it's been amazing. The software is legit and helps save so much time and is super effective, and the team are so helpful with supporting you to ensure that if you have any issues at all they are resolved as quickly as possible. Thanks EcomSniper xx",
    },
    {
      name: 'Aldair Manzanares',
      country: 'US',
      when: '3 months ago',
      title: 'Finally found something that actually works',
      body: 'Finally found something that actually works. For over a year I have searched and tried several different remote work methods but EcomSniper delivers on its promise. The community is great with everyone being helpful and welcoming. Definitely happy I found this opportunity.',
    },
    {
      name: 'Clay C',
      country: 'US',
      when: '3 months ago',
      title: 'Well worth the price',
      body: 'EcomSniper is great and well worth the price. Anytime you have a problem the team is there to help you 24/7 through chat support. The program itself works great and I can tell a ton of work has been put into it.',
    },
    {
      name: 'TWONGYEIRWE ALLEN',
      country: 'GB',
      when: '3 months ago',
      title: 'Grateful',
      body: 'Whoever hasn’t got this is missing out. This is all I needed to run my business. I am so grateful for EcomSniper. I am here to stay.',
    },
    {
      name: 'greenapplecrunch',
      country: 'CA',
      when: '3 months ago',
      title: 'Great course for learning Amazon to eBay dropshipping',
      body: "I've been really pleased with EcomSniper so far. The course explains Amazon to eBay dropshipping in a simple and easy-to-follow way, especially for beginners. Lots of useful information, practical tips, and overall a great learning experience. Definitely worth checking out if you're looking to get started with dropshipping.",
    },
  ],
  // Deck: this line goes under the receipts, not in a footnote nobody reaches.
  disclaimer:
    'Results shown are from individual members and are not typical. Your results depend on the time you put in, your market, and factors outside anyone’s control. See our results disclaimer.',
};

/* 05 — How it works (MOVED UP per deck) A cold visitor needs the mechanism before the feature tour. */

export const MODEL = {
  eyebrow: 'The model, in plain English',
  headline: 'You never buy stock. You never ship a box.',
  steps: [
    { n: '01', text: 'You find an item on a retailer’s site and list it on eBay for a higher price.' },
    { n: '02', text: 'A customer buys it from your eBay store.' },
    { n: '03', text: 'You order it from the retailer, shipped straight to your customer.' },
    { n: '04', text: 'You keep the difference. That is your profit.' },
  ],
  closer: 'No warehouse. No website. No money tied up in stock you might not sell.',
};

/* 06 — Three things, one system */

export const PILLARS = {
  eyebrow: 'The system',
  headline: 'Three things. One system.',
  lead: 'Everything you need to build your eBay business.',
  /* `tone` follows the live site: software blue, community gold, training
     green. It travels with the item so sections downstream inherit it. */
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

/* 07 — What the software does */

export const FEATURES = {
  eyebrow: "Let's start with the software",
  headline: 'The software does the heavy lifting.',
  lead: 'It handles the repetitive work. You make the decisions.',
  // One signal colour per step, in the live site's order: find, list, watch,
  // fulfil → blue, red, green, gold.
  items: [
    {
      n: '1',
      title: 'Find products already selling',
      body: 'Product Hunter and Competitor Research surface items that are moving right now, so you are not guessing.',
      metric: 'Live sales data',
      tone: 'blue',
    },
    {
      n: '2',
      title: 'List them in one click',
      body: 'AI writes the title, the description and the item specifics. Up to 3,000 listings a month on the monthly plan.',
      metric: 'Up to 3,000 listings / month',
      tone: 'red',
    },
    {
      n: '3',
      title: 'It watches your store for you',
      body: 'Price or stock changes at the retailer, and your listing updates in the background.',
      metric: '24/7 price & stock monitoring',
      tone: 'green',
    },
    {
      n: '4',
      title: 'Orders finish in one click',
      body: 'A sale comes in, you confirm once, and EcomSniper prepares the rest.',
      metric: 'One-click fulfilment',
      tone: 'gold',
    },
  ],
  closer: 'More time building. Less time clicking.',
};

/* 08 — Support and community Deck: this is the real differentiator against cheaper tools. */

export const COMMUNITY = {
  eyebrow: 'Support and community',
  headline: 'Here’s what “never alone” looks like.',
  lead: 'Ask once. We’ve got you.',
  body: 'Get stuck at 2am and a real person answers. Behind that reply is a private community of members walking the same path, and a live meeting every week where you can ask anything.',
  items: [
    { icon: 'headset', title: '24/7', label: 'Help that never sleeps', body: 'Chat support answered around the clock, 7 days a week.' },
    { icon: 'people', title: '400+', label: 'A private community', body: 'Members at every stage, from first listing to full-time.' },
    { icon: 'videoCamera', title: 'Weekly', label: 'Live meetings', body: 'Ask anything, live, with the people who built the tool.' },
  ],
  // Deck: add one verbatim member quote about support.
  pullQuote: {
    quote:
      'Anytime you have a problem the team is there to help you 24/7 through chat support.',
    author: 'Clay C',
    source: 'Trustpilot, United States',
  },
};

/* 09 — The course Deck: rename the middle plan so it stops colliding with the course name. */

export const TRAINING = {
  eyebrow: 'Starting from zero',
  headline: 'Dropship Mastery',
  lead: 'The step by step eBay dropshipping training that takes a complete beginner through the whole process. Included with every plan.',
  bullets: [
    'No inventory, no website',
    'Taught step by step',
    'Updated as eBay and the market change',
    'Taught by Marc Augustine and Sammy',
  ],
  cta: { label: 'See what the training covers', href: '/pricing' },
};

/* 10 — Founders (NEW per deck) Trust in this category rests on the operator, not the software. */

export const FOUNDERS = {
  eyebrow: 'Who is behind this',
  headline: 'We built the tool we needed.',
  body: [
    'Sammy has been selling on eBay for seven years, starting from a bedroom and a borrowed laptop. Marc spent years in security before he moved into e-commerce full time, and now teaches the training end to end.',
    'EcomSniper started as the scripts we wrote to stop doing the same three tasks every night. Everything in it exists because it solved a problem we had first.',
  ],
  closer: 'We still run stores. We still take the questions in chat.',
  people: [
    { name: 'Sammy', role: 'Co-founder', detail: '7 years selling on eBay. Still running stores today.', photo: 'founder-sammy' },
    { name: 'Marc Augustine', role: 'Co-founder, Head of Training', detail: 'Former security professional. Teaches Dropship Mastery.', photo: 'founder-marc' },
  ],
};

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
  closer:
    'If price per month is the only thing that matters to you, a bare listing tool will be cheaper. If you want the business taught and the people around it, that is what we built.',
};

/* 12 — Pricing preview (NEW per deck) Deck: "$" must appear on the homepage. Most visitors never reach /pricing. */

export const PRICING = {
  eyebrow: 'Plans',
  headline: 'Start for $97.',
  lead: 'Three ways in. The guarantee below covers the monthly plan.',
  plans: [
    {
      id: 'monthly',
      name: 'Monthly',
      priceLabel: '$97',
      priceSuffix: 'first month',
      thereafter: 'then $199 a month',
      featured: true,
      summary: 'Everything, with a guarantee behind it.',
      features: [
        'List up to 3,000 products a month',
        'Chrome extension',
        'The full Dropship Mastery course',
        'Private community',
        'Priority support',
        'We will do everything until you get your first sale',
      ],
      guarantee: 'Protected by the 30 day money back guarantee.',
      cta: { label: 'Start for $97', href: SITE.signupUrl },
    },
    {
      id: 'credits',
      name: '10K credits bundle',
      priceLabel: '$499',
      priceSuffix: 'billed every 3 months',
      thereafter: 'works out at $166.33 a month',
      featured: false,
      summary: 'For sellers who already know the volume they need.',
      features: ['List 10,000 products', 'Same software, same training', 'Same community access'],
      guarantee: 'Final sale, no refunds.',
      cta: { label: 'Choose credits', href: SITE.signupUrl },
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      priceLabel: '$2,000',
      priceSuffix: 'a month',
      thereafter: 'unlimited listings',
      featured: false,
      summary: 'We set it up and run alongside you.',
      features: ['Unlimited listings', 'Done for you setup', '1 on 1 coaching', 'VIP community'],
      guarantee: 'Final sale, no refunds.',
      cta: { label: 'Talk to us', href: '/contact' },
    },
  ],
  cta: { label: 'See full plan details', href: '/pricing' },
  // Deck: state the real cost of entry so nobody is ambushed later.
  footnote:
    'Budget beyond the subscription: an eBay store subscription and, in the US, an Amazon Prime membership. See the FAQ for typical monthly costs.',
};

/* 13 — FAQ (NEW on the homepage, marked up as FAQPage) Ten questions drawn from the ones support already answers. */

export const FAQ = {
  eyebrow: 'Before you ask',
  headline: 'The ten questions we actually get.',
  lead: 'Answers written to match what our own FAQ and support team say. Nothing here contradicts the help centre.',
  items: [
    {
      q: 'Is dropshipping from Amazon to eBay actually allowed?',
      a: 'You need to know the rules before you start, so here they are plainly. eBay’s dropshipping policy allows fulfilment through a wholesale supplier. It does not allow you to buy from another retailer or marketplace and have that retailer ship directly to your buyer. eBay can restrict or remove listings that break this, and VeRO takedowns are a separate risk when you list a brand that protects its listings. The training covers VeRO, account limits and what to avoid, and two of our guides are free to read now: how we avoid VeRO, and how to increase your eBay selling limits.',
    },
    {
      q: 'How much does it cost to start, in total?',
      a: 'The software is $97 for your first month, then $199 a month. On top of that you should budget for an eBay store subscription, which starts at around $7.95 a month for a Starter store, and in the US an Amazon Prime membership at $14.99 a month for free shipping. You also need enough on a card to pay for an item after a customer has paid you for it, since you order only once you have been paid. Most members start with a few hundred dollars of working capital.',
    },
    {
      q: 'How many hours a week does this take?',
      a: 'Expect 1 to 2 hours a day at the start, mostly listing and learning. Once the software is doing the monitoring and the repricing, members typically spend 30 to 45 minutes a day on sourcing and orders. It is not passive in month one. The listing volume you build in month one is what makes month three quieter.',
    },
    {
      q: 'I have never sold anything online. Will this still work?',
      a: 'Most people who join have never sold anything. Dropship Mastery starts at account setup and takes you through your first listing, your first sale and your first payout. When you get stuck, support answers 24/7 and the community has several hundred people who were exactly where you are.',
    },
    {
      q: 'Can I get a refund if it is not for me?',
      a: 'The monthly plan is covered by a 30 day money back guarantee. Try it for 30 days, and if it is not for you, message us and we send your money back. No questions asked. The 10K credits bundle and the Enterprise plan are final sale and are not refundable, because both are discounted against the monthly price.',
    },
    {
      q: 'Does it work in my country?',
      a: 'EcomSniper supports the United States, the United Kingdom, Germany, France, Australia, Canada, Spain and Italy. Wherever you start, it is the same training, the same software and the same support.',
    },
    {
      q: 'What does the software actually do for me?',
      a: 'Four things. It finds products that are already selling, using Product Hunter and Competitor Research. It writes and posts your listings, including title, description and item specifics. It monitors price and stock at the retailer and updates your listing automatically. And it prepares your orders so fulfilment is one click.',
    },
    {
      q: 'Can I run more than one eBay store?',
      a: 'Yes. Members regularly run several stores from one account, and the plans are priced on listing volume rather than store count. The Enterprise plan removes the listing cap entirely.',
    },
    {
      q: 'What happens to my listings if I cancel?',
      a: 'Your listings stay on eBay. They are your listings on your eBay account. What stops is the automation: price and stock monitoring, bulk listing and one click fulfilment. You keep the store, you lose the machine that maintains it.',
    },
    {
      q: 'Why would you teach this if it makes you money?',
      a: 'Because the software is the business, not the secret. We make money when members stay, and members stay when they are actually selling. A member who never makes a sale cancels in month two. Teaching the whole model properly is the cheapest retention we have.',
    },
  ],
};

/* 14 — Countries and guarantee (MERGED per deck) Deck: the unqualified "no refunds, final sale" line contradicted this. Fixed by naming exactly which plans the guarantee covers. */

export const ASSURANCE = {
  countries: {
    eyebrow: 'Supported countries',
    headline: 'Will it work where you live?',
    body: 'EcomSniper supports the United States, the United Kingdom, Germany, France, Australia, Canada, Spain and Italy. Wherever you start, it is the same training, the same software, the same support.',
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
    closer: 'The training teaches. The software lifts. The community catches. The guarantee protects.',
  },
};

/* 15 — Final CTA + the second door Deck: the single most important change on the page. Give the 95% who are not ready to pay a way to stay in touch. */

export const FINAL_CTA = {
  headlineParts: ['ESCAPE THE 9 TO 5.', 'BUILD SOMETHING OF YOUR OWN.'],
  blessing: { arabic: 'In shaa Allah', translation: 'IF GOD WILLS' },
  primaryCta: { label: 'Start your eBay business, $97', href: SITE.signupUrl },
  reassurance: '30 day money back guarantee on the monthly plan.',
  secondDoor: {
    title: 'Not ready yet?',
    body: 'Take the free playbook and read it first. Or join the Discord and watch how members actually work. No card, no pressure.',
    ctas: [
      { label: 'Get the free playbook', href: '/free-playbook', variant: 'primary' },
      { label: 'Join the Discord', href: SITE.discordUrl, variant: 'ghost' },
    ],
  },
};

/* Conversion furniture */

export const STICKY_CTA = {
  // Deck: appears after 25% scroll.
  showAfterScrollRatio: 0.25,
  message: 'Software, training and community.',
  price: 'From $97 first month',
  cta: { label: 'Start now', href: SITE.signupUrl },
};

export const EXIT_INTENT = {
  eyebrow: 'Before you go',
  title: 'Take the playbook with you.',
  body: 'The Invisible Store: how eBay dropshipping actually works when you have no stock, no website and no experience. Ten pages, free, no card.',
  cta: { label: 'Send me the playbook', href: '/free-playbook' },
  dismiss: 'No thanks',
  storageKey: 'ecomsniper:exit-intent-seen',
};

export const PLAYBOOK = {
  eyebrow: 'Free, no card',
  headline: 'The Invisible Store',
  lead: 'How eBay dropshipping actually works when you have no stock, no website and no experience.',
  bullets: [
    'Whether eBay dropshipping is even allowed, answered straight',
    'What one member’s first 30 days actually looked like',
    'What the daily work is, once your listings are live',
    'Whether EcomSniper is worth paying for, including who it is wrong for',
  ],
  formCta: 'Send me the playbook',
  smallprint: 'No countdown timers, no fake scarcity. Unsubscribe at the bottom of any email.',
};

/* This rebuild ships /, /pricing and /free-playbook. The other footer paths
   exist on the current production site — point them there or add the routes
   before this replaces it, or they land on the 404 page. */
export const FOOTER = {
  tagline: 'Software, training and community for eBay sellers.',
  columns: [
    {
      title: 'Product',
      links: [
        { label: 'How it works', href: '/#how-it-works' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Dropship Mastery', href: '/#training' },
        { label: 'Free playbook', href: '/free-playbook' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
        { label: 'Reviews', href: SITE.trustpilotUrl },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'FAQ', href: '/#faq' },
        { label: 'Help centre', href: '/help' },
        { label: 'Join the Discord', href: SITE.discordUrl },
        { label: 'Log in', href: SITE.loginUrl },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms', href: '/terms' },
        { label: 'Privacy', href: '/privacy' },
        { label: 'Refund policy', href: '/refunds' },
        { label: 'Results disclaimer', href: '/results-disclaimer' },
      ],
    },
  ],
  disclaimer:
    'EcomSniper is not affiliated with, endorsed by, or sponsored by eBay Inc. or Amazon.com, Inc. Results shown are from individual members and are not typical. Your results depend on the time you put in, your market, and factors outside anyone’s control.',
};
