/**
 * Every word on the site, from the approved copy deck. Two claim rules live
 * here: no "99% make 1-3k", and the guarantee always names the monthly plan.
 */

/* Global */

/* Named before SITE so the door below can be built from it. */
const SIGNUP_URL = 'https://ecomsniper.io/register';

export const SITE = {
  name: 'EcomSniper',
  domain: 'https://ecomsniper.io',
  /* All three were wrong and dead. app.ecomsniper.io has no DNS at all, and
     discord.gg/ecomsniper is not a server — it answers 200 for any code. */
  signupUrl: SIGNUP_URL,
  loginUrl: 'https://ecomsniper.io/login',
  discordUrl: 'https://discord.gg/DGkSJ5QZww',
  trustpilotUrl: 'https://uk.trustpilot.com/review/ecomsniper.io',

  /* One copy of the guarantee. "On the monthly plan" matters: the credits
     bundle and Enterprise are final sale, so the short version contradicts them. */
  guarantee: '30 day money back guarantee on the monthly plan',

  /* One signup door. Six sections used to carry their own copy of it. */
  startCta: { label: 'Start your eBay business', href: SIGNUP_URL },
  priceFrom: 'From $97 for your first month',

  /* Said wherever we ask for an email, so it exists once. */
  privacyNote: 'Your information is 100% secure and will never be shared.',
  /* Chrome the layout writes rather than a section: the header buttons and
     the skip link. In the deck so they translate too. */
  loginLabel: 'Log in',
  headerCta: 'Start for $97',
  skipLabel: 'Skip to content',

  /* The four things a member gets, in the order they reach them. Section 14
     and the /pricing header both read this list. */
  /* The icon belongs to the line, not to its position — tone is positional,
     the mark is not. */
  promises: [
    { text: 'The training teaches', icon: 'graduationCap' },
    { text: 'The software lifts', icon: 'robot' },
    { text: 'The community catches', icon: 'people' },
    { text: 'The guarantee protects', icon: 'shield' },
  ],
};

/* The nav maps this page, not the site. About points at our founders
   section; Contact goes to the live site, as the footer already does. */
export const NAV_LINKS = [
  /* In the order the page actually runs, measured not assumed. The routes
     and the outside link come last, because they leave the page. */
  { label: 'Proof', href: '/#proof' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Training', href: '/#training' },
  { label: 'About', href: '/#founders' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: 'https://ecomsniper.io/contact' },
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

/* 02 — Proof bar (NEW per deck) One static strip, directly under the hero. Every number is checkable. */

export const PROOF_BAR = {
  intro: 'Trusted by sellers in the US, UK, Canada, Australia, Germany, France, Spain and Italy',
  /* The count is filled in from the country list, so the number cannot
     drift away from the flags beside it. */
  countriesLabel: 'Trusted by sellers in {count} countries',
  /* countTo opts a figure into the count-up; value is what it settles on. */
  items: [
    {
      value: '4.7',
      countTo: 4.7,
      label: 'Trustpilot score',
      /* Both read off the linked profile on 29 Aug 2026. */
      // Read off the profile on 30 Aug 2026. Was 41 the day before.
      detail: 'from 42 reviews',
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

/* 04 — Proof: video, reviews, receipts Deck: strongest section, keep the structure. Three fixes applied: live Trustpilot link, no truncated reviews, disclaimer under the receipts. */

export const PROOF = {
  eyebrow: "Let's see",
  headline: 'But does it',
  headlineMark: 'really',
  headlineTail: 'work?',
  lead: 'Real members answer that question. Watch them, read them, or look at the receipts.',

  /* Thumbnails are local and named after the video, so they cannot mismatch. */
  videos: [
    { id: 'oEjX-90LJ8w', figure: '$100/day', figureWho: '17-year-old', title: '17-Year-Old Reveals the Secret to Making $100/Day Dropshipping on eBay', guest: 'Member interview', thumb: 'thumb-17-year-old-100-day', views: '1.8K' },
    { id: 'SosyiNFvbVc', figure: '$1,600/month', figureWho: '21-year-old', title: 'Learn how this 21 year old makes $1600 a month dropshipping on eBay', guest: 'Member interview', thumb: 'thumb-21-year-old-1600-month' },
    { id: '2IFJl0gzbpg', figure: '$18K/month', figureWho: 'Beginner', title: 'How This Beginner Makes $18K/Month by Dropshipping from Amazon', guest: 'Member interview', thumb: 'thumb-beginner-18k-month', views: '1.2K' },
    /* Not a member story despite sitting here — it is the founder's own book
       summary, and the 300K figure it used to carry is unsourced. */
    { id: 'AIy19fmMutw', title: 'From Broke Security Guard to 300K Sales on eBay — Full Summary of The Invisible Store', guest: 'Sammy, co-founder', thumb: 'thumb-security-guard-300k', views: '958' },
    { id: 'San_W1iQByc', figure: '$3,000/month', figureWho: 'College student', title: 'How This College Student Earns $3,000/Month From Dropshipping on eBay', guest: 'Member interview', thumb: 'thumb-college-student-3000-month', views: '941' },
    { id: 'h0CgxvLsgXw', figure: '$800/week', figureWho: 'Work-from-home dad', title: 'Work-from-Home Dad Makes $800/Week with eBay Dropshipping', guest: 'Member interview', thumb: 'thumb-wfh-dad-800-week', views: '842' },
    { id: 'okyFZuQ0e1c', figure: '$200 on day two', figureWho: 'New starter', title: 'Made $200 Profit on My Second Day Dropshipping on eBay', guest: 'Member interview', thumb: 'thumb-200-profit-second-day', views: '800' },
    { id: 'tRcpMYN2W6w', figure: '$2K/month', figureWho: 'Lance', title: 'Ebay Dropshipping Changed My Life: Lance Reveals His $2k/Month Strategy', guest: 'Ft. Lance', thumb: 'thumb-lance-2k-month', views: '794' },
    { id: 'sTVqFsxxwIo', title: 'From selling books to dropshipping on eBay, an in-depth comparison', guest: 'Ft. Adam', thumb: 'thumb-book-seller-comparison' },
    { id: '-cDk4ztkWaw', title: 'From TikTok dropshipping to eBay, what it takes to be successful', guest: 'Ft. Dollins', thumb: 'thumb-tiktok-to-ebay' },
    { id: 'uW1LL8NSvaI', title: 'Why you will never be rich dropshipping on eBay without virtual assistants', guest: 'Ft. Oleg', thumb: 'thumb-virtual-assistants' },
    { id: 'Bm9UKs-Lw_o', title: 'Converting eBay traffic into loyal customers, a forgotten art', guest: 'Ft. Jon', thumb: 'thumb-loyal-customers' },
  ],

  /* Screenshots members posted themselves — the deck's "receipts". */
  receipts: [
    {
      key: 'receipt-sales-31-days',
      figure: '$5,059.44',
      figureLabel: 'in 31 days',
      caption: '$5,059.44 in 31 days',
      detail: 'A member’s eBay sales dashboard, shared in the community.',
    },
    {
      key: 'receipt-rory-listings',
      figure: '4,224',
      figureLabel: 'active listings',
      caption: '4,224 active listings',
      detail: 'Rory, on his way to 10,000 listings at a 65% profit margin.',
    },
    {
      key: 'receipt-two-accounts',
      figure: '2 accounts',
      figureLabel: 'both at all-time highs',
      caption: 'Two accounts, all-time highs',
      detail: 'Posted in the Discord: results across two stores in the same week.',
    },
  ],

  /* Eighteen of the 42 on the public profile, read off it on 30 Aug 2026.
     Verbatim, including the critical ones. */
  reviews: [
    {
      name: 'Manor',
      country: 'GB',
      rating: 4,
      when: '3 months ago',
      title: 'Good software, very few issues',
      body: 'Good software very few issues, team is super helpful. You can ask a question 24/7 and someone will respond. Cost 99 USD for the first month and it made me 500 USD, so 100% worth it in regards to money spent for what you get back. Overall I am happy.',
    },
    {
      name: 'Aldair Manzanares',
      country: 'US',
      rating: 5,
      when: '3 months ago',
      title: 'Finally found something that actually works',
      body: 'Finally found something that actually works. For over a year I have searched and tried several different remote work methods but EcomSniper delivers on its promise. The community is great with everyone being helpful and welcoming. Definitely happy I found this opportunity.',
    },
    {
      name: 'Clay C',
      country: 'US',
      rating: 5,
      when: '3 months ago',
      title: 'Well worth the price',
      body: 'EcomSniper is great and well worth the price. Anytime you have a problem the team is there to help you 24/7 through chat support. The program itself works great and I can tell a ton of work has been put into it.',
    },
    {
      name: 'TWONGYEIRWE ALLEN',
      country: 'GB',
      rating: 5,
      when: '3 months ago',
      title: 'Grateful',
      body: 'Whoever hasn’t got this is missing out. This is all I needed to run my business. I am so grateful for EcomSniper. I am here to stay.',
    },
    {
      name: 'Manar Kazi',
      country: 'US',
      rating: 5,
      when: 'this month',
      title: 'High quality software with amazing support',
      body: 'A quality software with amazing results. Consistency and a great supporting community have really given me hope that things can get better. Stable builds, stellar support, and constant quality of life updates make this software a no brainer. If you’re looking to start earning more, make sure you try EcomSniper. Highly recommend.',
    },
    {
      name: 'Samuele Cannavò',
      country: 'IT',
      rating: 5,
      when: '2 months ago',
      title: 'Great software',
      body: 'I’ve been using EcomSniper for the past 8 months and have had a great experience so far. Like any software, it has a few minor bugs occasionally, but the support team is available 24/7 and is always quick to help. Overall, it’s a fantastic tool, and I definitely plan to keep using it for the long term.',
    },
    {
      name: 'Jacob Harwood',
      country: 'AU',
      rating: 5,
      when: '4 months ago',
      title: 'Amazing program',
      body: 'Amazing program, does pretty much everything you can think of. Dedicated support team. Very happy with EcomSniper.',
    },
    {
      name: 'Hasan-Ali Yesiltas',
      country: 'FR',
      rating: 5,
      when: '4 months ago',
      title: 'Really good',
      body: 'I started this Monday, and like most reviews said, they really want you to succeed and support you to the best of their abilities.',
    },
    {
      name: 'Justin H',
      country: 'CA',
      rating: 5,
      when: '4 months ago',
      title: 'Legit they want you to succeed',
      body: 'Legit they want you to succeed. Fantastic community and the tools they provide make everything very easy.',
    },
    {
      name: 'Ellie Moor',
      country: 'GB',
      rating: 5,
      when: '4 months ago',
      title: 'A great tool',
      body: 'I’ve been with EcomSniper for three months now, and have had a great experience. While it is a great tool with lots of helpful features to build a dropshipping store, the support they offer puts them above and beyond other companies. Someone is on hand 24/7 to assist with any issues or queries, whether that’s via message or a video call. I’m excited for the future and to scale my stores with the help of EcomSniper.',
    },
    {
      name: 'Samuel A. Harvey',
      country: 'GB',
      rating: 5,
      when: '4 months ago',
      title: 'Great tool',
      body: 'EcomSniper has been a great tool so far. It saves a huge amount of time with product sourcing and listing, and makes scaling easy. The interface is simple to use, and once you get into a rhythm, it really speeds up your workflow. The community is great, and the support from the Ecom team is second to none. Overall, definitely worth it if you’re serious about growing your store.',
    },
    {
      name: 'Tyrone Guyton',
      country: 'US',
      rating: 5,
      when: '3 months ago',
      title: 'Started almost a month ago',
      body: 'Started almost a month ago, already seeing the success.',
    },
    {
      name: 'Lynx',
      country: 'US',
      rating: 5,
      when: '5 months ago',
      title: 'Best community and tool',
      body: 'This is a GREAT tool! It has essentially supplemented my full-time job and allowed me to regain my time. The community is incredibly supportive and helpful to newcomers. If you ever have any questions, there’s always someone ready to assist you, ensuring you never get lost. I’ll always be an EcomSniper.',
    },
    {
      name: 'Mattias farinaccia',
      country: 'CA',
      rating: 5,
      when: '5 months ago',
      title: 'Great team and support',
      body: 'There is a team willing to help you every step along the way. The program works great and is working great for me. They are quick to help you and advise on any questions, worth checking out for sure.',
    },
    {
      // Title truncated on Trustpilot; this is a verbatim fragment of the body.
      name: 'zsaltsman',
      country: 'US',
      rating: 5,
      when: '5 months ago',
      title: 'The tool alone is a 5 stars product',
      body: 'The tool alone is a 5 stars product but the fact you also get an amazing community with it makes it so much better. I was able to quit my job with EcomSniper, and they also give you a money back guarantee so you can’t lose.',
    },
    {
      name: 'Delta',
      country: 'US',
      rating: 5,
      when: '5 months ago',
      title: 'Experience is pretty good',
      body: 'Experience is pretty good, software works nice and all the features combine to make a well advised plan. Definitely recommend.',
    },
    {
      name: 'Toto Visotsky',
      country: 'AR',
      rating: 5,
      when: '8 months ago',
      title: 'Perfect from A to Z',
      body: 'Great tool overall, super helpful community and support is always there if there is a bug. Makes sniping easy, and the product hunter and bulk lister saved me hundreds of hours. I am yet to find a tool that automates so much of the listing process. Total revenue done with EcomSniper on eBay is around 85,000 USD. Update: as of August 2026 the revenue I’ve made with the help of EcomSniper is around 200,000 USD.',
    },
    {
      name: 'Rupp',
      country: 'GB',
      rating: 5,
      when: '8 months ago',
      title: 'EcomSniper on the UK market',
      body: 'I used EcomSniper on the UK eBay market and it worked great. The tool works very well but the community is even better. I get 24/7 support and also access to weekly calls which helps me scale my business after getting tips from others who are doing very well. So far on my main account I’ve generated over 6 figures since I started using the tool.',
    },
  ],
  // Deck: this line goes under the receipts, not in a footnote nobody reaches.
  disclaimer:
    'Results shown are from individual members and are not typical. Your results depend on the time you put in, your market, and factors outside anyone’s control. See our results disclaimer.',

  /* Added for the section 04 variants. */
  cta: { label: 'See what it costs', href: '/pricing' },

  verifyLabel: 'Verify every review on Trustpilot',

  /* The wall makes the case by volume; these make it by weight. */
  interviews: {
    eyebrow: 'Watch them',
    headline: 'The people, in their own words.',
    lead: 'Members on what actually happened — the numbers, the mistakes, and how long it really took.',
    listLabel: 'All interviews',
    channelLabel: 'More on the EcomSniper channel',
    channelHref: 'https://www.youtube.com/@sammyecomsniper',
    privacyNote: 'Nothing loads from YouTube until you press play.',
  },

  receiptsSection: {
    eyebrow: 'The receipts',
    headline: 'Screenshots members posted themselves.',
    lead: 'Shared in the community as they happened, not produced for this page.',
    /* A door at the end of the evidence, so nobody convinced has to scroll
       past four more sections to act. Claim and door both come from SITE. */
    closer: {
      cta: SITE.startCta,
      guarantee: SITE.guarantee,
    },
  },

  testimonials: {
    eyebrow: 'In writing',
    /* Split for the ink mark, like section 03's headline. */
    headline: 'What members wrote on',
    headlineMark: 'Trustpilot',
    headlineTail: '.',
    /* Not "unedited" — the reviews carry tidied punctuation. */
    lead: 'In full, in their words. Every one of them is on the public profile.',
  },
};

/* 05 — REMOVED. It explained the same four steps a third of a page above the
   course that teaches them. Both now open section 09, as the live site does. */

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
    { icon: 'headset', title: '24/7', label: 'Help that never sleeps', body: 'Chat support answered around the clock, 7 days a week.', tone: 'blue' },
    { icon: 'people', title: '400+', label: 'A private community', body: 'Members at every stage, from first listing to full-time.', tone: 'gold' },
    { icon: 'videoCamera', title: 'Weekly', label: 'Live meetings', body: 'Ask anything, live, with the people who built the tool.', tone: 'green' },
  ],

  /* The illustration this section is built on, labelled as one. */
  drawn: {
    /* The live site heads this card the same way, down to the online dot. */
    support: { name: 'EcomSniper Support', status: 'Online now' },
    question: { time: '02:14', body: 'My listing just got blocked. Anyone seen this before?' },
    replies: [
      { time: '02:16', body: 'Seen it — it is the category, not the listing. Fix is two clicks.', role: 'EcomSniper Support' },
      { time: '02:17', body: 'Same thing happened to me last week. That fixed it.', role: 'Member' },
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
    caption: 'An illustration of how a question gets answered — not a capture of a real conversation.',
  },

  /* A verbatim member quote about support, from the reviews above. */
};

/* 09 — The course Deck: rename the middle plan so it stops colliding with the course name. */

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

/* 10 — Founders (NEW per deck) Trust in this category rests on the operator, not the software. */

export const FOUNDERS = {
  eyebrow: 'Who is behind this',
  headline: 'We built the tool we needed.',
  body: [
    'Sammy has been selling on eBay for seven years, starting from a bedroom and a borrowed laptop. Marc spent years in security before he moved into e-commerce full time, and now teaches the training end to end.',
    'EcomSniper started as the scripts we wrote to stop doing the same three tasks every night. Everything in it exists because it solved a problem we had first.',
  ],
  closer: 'We still run stores. We still take the questions in chat.',

  /* This section's own free door. It sits under two founders beside a book
     that says who the product is wrong for, so "before you pay" is the
     argument already being made — and it is a promise we can keep. */
  bookCta: { label: 'Read it before you pay', href: '/free-play-book' },
  /* Section 09's instructor row reads this too, so a change here moves both.
     detail is unused — section 10 says the same thing in full sentences —
     but it is real copy, so it stays for the pages that may want it. */
  people: [
    {
      name: 'Sammy',
      role: 'Co-founder',
      detail: '7 years selling on eBay. Still running stores today.',
      photo: 'founder-sammy',
    },
    {
      name: 'Marc Augustine',
      role: 'Co-founder, Head of Training',
      detail: 'Former security professional. Teaches Dropship Mastery.',
      photo: 'founder-marc',
    },
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

/* 12 — Pricing preview (NEW per deck) Deck: "$" must appear on the homepage. Most visitors never reach /pricing. */

export const PRICING = {
  eyebrow: 'Plans',
  headline: 'Start for $97.',
  lead: 'Three ways in. The guarantee below covers the monthly plan.',
  plans: [
    {
      id: 'monthly',
      /* The plan names were ours, not theirs. A buyer who reads "Monthly"
         here and is charged for "Dropship Mastery" has been handed a
         reason to doubt the page. These are the client's own names, and
         the kickers are their own labels off the same cards. */
      name: 'Dropship Mastery',
      badge: 'Most popular',
      priceLabel: '$97',
      priceSuffix: 'first month',
      thereafter: 'then $199 a month',
      featured: true,
      summary: 'For the one starting from zero.',
      features: [
        'List 3,000 products every month',
        'Sniper Chrome Extension, to list and track with automation',
        'The full Dropship Mastery course',
        'Private Dropshipping Community',
        'Priority support',
        'We will do everything until you get your first sale',
      ],
      /* Only this plan is covered. The card reads the flag rather than the
         sentence, so the tick and the shield cannot end up on a final sale. */
      guaranteeProtected: true,
      guarantee: 'Protected by the 30 day money back guarantee.',
      cta: { label: 'Start for $97', href: SITE.signupUrl },
    },
    {
      id: 'credits',
      name: '10K Credits Bundle',
      badge: 'Volume deal',
      /* was and saving are theirs, off their pricing page: $597 struck to
         $499. We were showing only $499 and losing a real discount. recurring
         is stated because "billed every 3 months" implies it without saying it. */
      priceLabel: '$499',
      was: '$597',
      saving: 'You save $98',
      priceSuffix: 'billed every 3 months',
      thereafter: 'works out at $166.33 a month',
      recurring: 'Recurring 3-month billing cycle',
      featured: false,
      summary: 'For the one ready to list in volume.',
      features: [
        '10,000 credits (9,000 plus a 1,000 bonus)',
        'List 10,000 products',
        // Named, not summarised. "Same software, same training" is our
        // shorthand; a buyer comparing the two pages wants the same list.
        'Sniper Chrome Extension, to list and track with automation',
        'The full Dropship Mastery course',
        'Private Dropshipping Community',
      ],
      guarantee: 'No refunds on this plan, final sale.',
      cta: { label: 'Get the 10K Bundle', href: SITE.signupUrl },
    },
    {
      id: 'enterprise',
      name: 'Monthly Unlimited',
      badge: 'Enterprise',
      priceLabel: '$2,000',
      priceSuffix: 'a month',
      // Was "unlimited listings", which is the first feature in the list
      // below, not a billing term. Their card says billed monthly.
      thereafter: 'billed monthly',
      featured: false,
      summary: 'For the one building at full scale.',
      features: [
        'Unlimited product listings',
        'The full Dropship Mastery course',
        'VIP private community access',
        'Priority 24/7 support',
        'Done-for-you setup service',
        '1-on-1 business coaching',
        'We will do everything until you build a successful dropshipping business',
      ],
      guarantee: 'No refunds on this plan, final sale.',
      /* Was a contact form. Enterprise is not a sales call on their page:
         the button buys it, like the other two. Sending a buyer to a form
         for a plan they can purchase loses the sale. */
      cta: { label: 'Get the Enterprise plan', href: SITE.signupUrl },
    },
  ],
  /* The client's own header, and better than ours was: it opens on the
     question the visitor arrived with. The promises are the same four lines as
     the guarantee section, which drops its own copy on this page. */
  page: {
    eyebrow: 'The decision',
    headline: 'Is this going to work for you?',
    lead: 'One protected month will answer that better than any page.',
    guarantee: {
      title: '30 day money back guarantee',
      note: 'No questions asked',
      promises: SITE.promises,
    },
  },
  // Deck: state the real cost of entry so nobody is ambushed later.
  footnote:
    'Budget beyond the subscription: an eBay store subscription and, in the US, an Amazon Prime membership. See the FAQ for typical monthly costs.',
};

/* 13 — FAQ (NEW on the homepage, marked up as FAQPage) Ten questions drawn from the ones support already answers. */

export const FAQ = {
  eyebrow: 'Before you ask',
  headline: 'The questions we actually get.',
  lead: 'Answers written to match what our own FAQ and support team say. Nothing here contradicts the help centre.',
  /* Four groups, one signal tone each, in the order an objection actually
     arrives: is this even legal, what will it cost me, can I do it, what
     am I buying. Thirteen rows with no grouping is a wall. */
  /* The door out of the section, for the question the thirteen do not cover.
     It fills the column the sticky heading used to leave empty, and it sends
     people to the community rather than to a form nobody answers on a
     Sunday. */
  support: {
    title: 'Still stuck on something?',
    body: 'Support answers 24/7, and the community is several hundred people who have already asked the same thing.',
    cta: { label: 'Ask in the Discord' },
  },
  groups: [
    { id: 'rules', label: 'Rules and risk', tone: 'red' },
    { id: 'money', label: 'Money', tone: 'blue' },
    { id: 'start', label: 'Getting started', tone: 'green' },
    { id: 'product', label: 'What you get', tone: 'gold' },
  ],
  items: [
    {
      group: 'rules',
      q: 'Is dropshipping from Amazon to eBay actually allowed?',
      a: 'You need to know the rules before you start, so here they are plainly. eBay’s dropshipping policy allows fulfilment through a wholesale supplier. It does not allow you to buy from another retailer or marketplace and have that retailer ship directly to your buyer. eBay can restrict or remove listings that break this, and VeRO takedowns are a separate risk when you list a brand that protects its listings. The training covers VeRO, account limits and what to avoid, and two of our guides are free to read now: how we avoid VeRO, and how to increase your eBay selling limits.',
    },
    {
      group: 'money',
      q: 'How much does it cost to start, in total?',
      a: 'The software is $97 for your first month, then $199 a month. On top of that you should budget for an eBay store subscription, which starts at around $7.95 a month for a Starter store, and in the US an Amazon Prime membership at $14.99 a month for free shipping. You also need enough on a card to pay for an item after a customer has paid you for it, since you order only once you have been paid. Most members start with a few hundred dollars of working capital.',
    },
    {
      group: 'start',
      q: 'How many hours a week does this take?',
      a: 'Expect 1 to 2 hours a day at the start, mostly listing and learning. Once the software is doing the monitoring and the repricing, members typically spend 30 to 45 minutes a day on sourcing and orders. It is not passive in month one. The listing volume you build in month one is what makes month three quieter.',
    },
    {
      group: 'start',
      q: 'I have never sold anything online. Will this still work?',
      a: 'Most people who join have never sold anything. Dropship Mastery starts at account setup and takes you through your first listing, your first sale and your first payout. When you get stuck, support answers 24/7 and the community has several hundred people who were exactly where you are.',
    },
    /* The next three are lifted from questions the client’s own help
       centre answers and this deck did not. The packing slip and the
       Amazon ban are the two objections every eBay dropshipper hears and
       neither was addressed anywhere on this site; credits were being sold
       on /pricing without a word on what one buys. */
    {
      group: 'rules',
      q: 'Will my buyer get a packing slip from Amazon?',
      a: 'Most suppliers let you hide the invoice by marking the order as a gift at checkout, and that is what the training tells you to do on every order. Beyond that, buyers open a parcel to check the item, not the paperwork. Our own data puts the complaint at under 0.1% of buyers, which is not zero — so the training also covers how to answer it when it happens.',
    },
    {
      group: 'rules',
      q: 'Can my supplier account get suspended?',
      a: 'It can, and pretending otherwise would be dishonest. Amazon suspensions typically start to appear at high order volume, around 150 orders a month and up. Below that it is rarely an issue, and most members are nowhere near it in their first few months. The course covers how to manage the account properly, and how to open more than one when your volume gets there.',
    },
    {
      group: 'money',
      q: 'How do credits work?',
      a: 'A credit is a listing. An AI optimised listing — title, description and item specifics written for you — costs 1 credit. A standard listing, copied straight across from the supplier with your own title if you want one, costs 0.2 credits. So a 1,000 credit month is 1,000 AI listings or 5,000 standard ones. Pace yourself at 100 to 200 a day rather than spending it all at once: eBay reads a sudden flood as a new seller behaving oddly.',
    },
    {
      group: 'money',
      q: 'Can I get a refund if it is not for me?',
      a: 'The monthly plan is covered by a 30 day money back guarantee. Try it for 30 days, and if it is not for you, message us and we send your money back. No questions asked. The 10K credits bundle and the Enterprise plan are final sale and are not refundable, because both are discounted against the monthly price.',
    },
    {
      group: 'start',
      q: 'Does it work in my country?',
      a: 'EcomSniper supports the United States, the United Kingdom, Germany, France, Australia, Canada, Spain and Italy. Wherever you start, it is the same training, the same software and the same support.',
    },
    {
      group: 'product',
      q: 'What does the software actually do for me?',
      a: 'Four things. It finds products that are already selling, using Product Hunter and Competitor Research. It writes and posts your listings, including title, description and item specifics. It monitors price and stock at the retailer and updates your listing automatically. And it prepares your orders so fulfilment is one click.',
    },
    {
      group: 'product',
      q: 'Can I run more than one eBay store?',
      a: 'Yes. Members regularly run several stores from one account, and the plans are priced on listing volume rather than store count. The Enterprise plan removes the listing cap entirely.',
    },
    {
      group: 'product',
      q: 'What happens to my listings if I cancel?',
      a: 'Your listings stay on eBay. They are your listings on your eBay account. What stops is the automation: price and stock monitoring, bulk listing and one click fulfilment. You keep the store, you lose the machine that maintains it.',
    },
    {
      group: 'product',
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

/* Conversion furniture */

export const STICKY_CTA = {
  // Deck: appears after 25% scroll.
  showAfterScrollRatio: 0.25,
  /* Was "Software, training and community." — true of the whole site and
     therefore an argument for nothing. The bar is the offer following the
     reader down the page, so the second line is the reason to press the
     button rather than a description of the product. */
  message: SITE.guarantee,
  price: 'From $97 first month',
  cta: { label: 'Start now', href: SITE.signupUrl },
};

/* The consultation offer, opened when section 07 comes into view. The copy
   promises a reply and nothing else — no response time, no named person —
   because none of that is confirmed. Tighten it once the client says who
   answers these and how fast. */

export const CONSULT = {
  eyebrow: 'Free consultation',
  title: 'Talk to someone before you decide.',
  /* The dialog asks for one thing — an email — so the copy asks for one
     thing. It used to say "tell us where you are starting from", which is a
     request for a paragraph the form has nowhere to put: the reader is invited
     to explain themselves into a single-line email field. What the email buys
     is the conversation, and that is what this says now. */
  body: 'Leave your name and email and we will arrange a free consultation: a straight conversation about where you are starting from and whether this is right for you.',
  points: [
    'A conversation, not a sales call',
    'What your first month would realistically look like',
    'Whether EcomSniper is wrong for you',
  ],
  /* Name first, then the address. A consultation is answered by a person
     writing to a person, and 'Hi there' is a worse first line than a name.
     Both are required: an address with nobody attached to it is a lead, not
     a request for a conversation. */
  nameLabel: 'Full name',
  namePlaceholder: 'Your name',
  fieldLabel: 'Email address',
  placeholder: 'you@example.com',
  cta: 'Request my free consultation',
  dismiss: 'No thanks',
  /* The same promise the playbook page makes, read from one place. */
  privacy: SITE.privacyNote,
  done: {
    title: 'Request received.',
    body: 'We will email that address to arrange your consultation. Nothing else lands in your inbox.',
  },
  error: 'That did not send. Try again, or email us directly.',
  /* Section 07. The dialog waits for it rather than for a scroll depth: a
     percentage is a different place on a phone and on a desktop. */
  triggerId: 'how-it-works',
  storageKey: 'ecomsniper:consult-seen',
};

export const EXIT_INTENT = {
  eyebrow: 'Before you go',
  title: 'Take the playbook with you.',
  body: 'The Invisible Store: how eBay dropshipping actually works when you have no stock, no website and no experience. 83 pages, free, no card.',
  cta: { label: 'Send me the playbook', href: '/free-play-book' },
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

  /* The four things a reader wants settled before typing an email, from the
     client's own page. privacy is a promise, not decoration: it belongs with
     the form, and the endpoint behind it must not pass the address on. */
  reassurances: ['83 pages', 'No spam', 'No credit card', 'Instant access'],

  /* The book. Counted from the PDF rather than described: 83 pages, 16MB.
     Every "ten pages" on this site was wrong, including the meta description
     search results were showing. */
  file: {
    href: '/the-invisible-store.pdf',
    name: 'the-invisible-store.pdf',
    pages: 83,
    size: '16 MB',
  },

  /* What they see once the address is in. The file is handed over straight
     away, not just promised by email — they earned it by typing it. The offer
     underneath is the one place we ask for money right after giving something
     away, so it is framed as a next step and carries the guarantee. */
  done: {
    title: 'It is yours.',
    body: 'The download starts from the button below. A copy is on its way to your inbox too — if it has not arrived in a few minutes, look in promotions, and reply to it either way. A person reads those.',
    downloadCta: 'Download the playbook',
    upsell: {
      title: 'Read it first. Then, if it makes sense, start.',
      body: 'The playbook is the whole model with nothing held back. The software is what stops you doing it by hand.',
    },
  },
  privacy: SITE.privacyNote,
};

/* This rebuild ships /, /pricing and /free-playbook. The other footer paths
   exist on the current production site — point them there or add the routes
   before this replaces it, or they land on the 404 page. */
export const FOOTER = {
  tagline: 'Software, training and community for eBay sellers.',

  /* Checked against what exists. Eight of these used to point at routes this
     app does not have, so three whole columns were 404s — they go to the live
     site now, at its own slugs. Note it answers 200 for any path, so a link
     checker proves nothing; these came from their markup. */
  columns: [
    {
      title: 'Product',
      links: [
        { label: 'How it works', href: '/#how-it-works' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Dropship Mastery', href: '/#training' },
        { label: 'Free playbook', href: '/free-play-book' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: 'https://ecomsniper.io/about' },
        { label: 'Blog', href: 'https://ecomsniper.io/blog' },
        { label: 'Careers', href: 'https://ecomsniper.io/careers' },
        { label: 'Contact', href: 'https://ecomsniper.io/contact' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'FAQ', href: '/faq' },
        { label: 'The guarantee', href: '/#guarantee' },
        { label: 'Join the Discord', href: SITE.discordUrl },
        { label: 'Log in', href: SITE.loginUrl },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms and conditions', href: 'https://ecomsniper.io/terms-and-conditions' },
        { label: 'Privacy policy', href: 'https://ecomsniper.io/privacy-policy' },
        { label: 'Reviews', href: SITE.trustpilotUrl },
      ],
    },
  ],

  /* Their own contact block, which this footer did not carry at all. A page
     that asks for $97 and states no phone number, no email and no address is
     asking to be taken on faith. Every value is off their live footer. */
  contact: {
    title: 'Contact',
    phone: { label: '1 (800) 994-9831', href: 'tel:+18009949831' },
    email: { label: 'management@ecomsniper.io', href: 'mailto:management@ecomsniper.io' },
    location: 'Toronto, Ontario, Canada',
  },

  /* Telegram is on their footer too and is deliberately not here: their own
     link points back at the page it sits on, so there is no address to use. */
  social: {
    title: 'Join our community',
    links: [
      { label: 'Discord', href: SITE.discordUrl, icon: 'discord' },
      { label: 'YouTube', href: 'https://www.youtube.com/@sammyecomsniper', icon: 'youtube' },
      {
        label: 'Facebook',
        href: 'https://www.facebook.com/profile.php?id=61558534291940',
        icon: 'facebook',
      },
    ],
  },

  /* The second door. It lived at the foot of section 15 until that section
     was cut, and it is the only offer on the site that costs nothing — worth
     more than the blank space it would otherwise leave here. Copy is the
     deleted section's, unchanged. */
  secondDoor: {
    title: 'Not ready yet?',
    body: 'Take the free playbook and read it first. No card, no pressure.',
    cta: { label: 'Get the free playbook', href: '/free-play-book' },
  },

  reviewsCta: 'Read the reviews on Trustpilot',

  disclaimer:
    'EcomSniper is not affiliated with, endorsed by, or sponsored by eBay Inc. or Amazon.com, Inc. Results shown are from individual members and are not typical. Your results depend on the time you put in, your market, and factors outside anyone’s control.',
};

/**
 * What each page tells search engines and the browser tab.
 *
 * In the deck rather than in the pages so it translates with everything else:
 * a German search result showed an English title before this.
 */
export const SEO = {
  home: {
    title: 'EcomSniper — eBay Dropshipping Software, Training & Community',
    description:
      'Find products already selling, list them in one click, and let EcomSniper watch your eBay store 24/7. Software, step-by-step training and a 400+ member community. From $97, 30 day money back guarantee on the monthly plan.',
  },
  pricing: {
    title: 'Pricing — EcomSniper eBay Dropshipping Software',
    description:
      'Start for $97 your first month, then $199 a month, with a 30 day money back guarantee on the monthly plan. Every plan includes the full Dropship Mastery course, the private community and 24/7 support.',
  },
  faq: {
    title: 'FAQ — EcomSniper eBay Dropshipping Software',
    description:
      'The questions we actually get: whether eBay dropshipping is allowed, what it costs to start in total, how credits work, refunds, supported countries, and what happens to your listings if you cancel.',
  },
  playbook: {
    title: 'The Invisible Store — Free eBay Dropshipping Playbook | EcomSniper',
    description:
      'A free 83 page playbook on how eBay dropshipping actually works with no stock, no website and no experience. Includes whether it is even allowed, and who EcomSniper is wrong for.',
  },
  notFound: {
    title: 'Page not found — EcomSniper',
    description: 'That page does not exist. Head back to the homepage or take the free playbook.',
  },
};

/** 404 copy. In the deck so the German 404 is German too. */
export const NOT_FOUND = {
  eyebrow: 'Error 404',
  headline: 'That page is not here.',
  body: 'The link may be old, or the page may have moved. Either way, the two things worth reading are below.',
  homeCta: 'Back to the homepage',
  playbookCta: 'Get the free playbook',
};

/**
 * Labels only assistive tech reads, plus the few visible ones the layout
 * writes itself. Hardcoded in the JSX before this, so a screen reader on the
 * German site announced every one of them in English.
 *
 * {n} and {total} are filled in at the call site.
 */
export const A11Y = {
  close: 'Close',
  backToTop: 'Back to top',
  home: 'EcomSniper home',
  navPrimary: 'Primary',
  navMobile: 'Mobile',
  navFooter: 'Footer',
  navQuestionGroups: 'Question groups',
  proofRegion: 'Proof and trust signals',
  prevReview: 'Previous review',
  nextReview: 'Next review',
  prevInterview: 'Previous interview',
  nextInterview: 'Next interview',
  included: 'Included',
  partlyIncluded: 'Partly included',
  notIncluded: 'Not included',
  rating: 'Rated {n} out of 5',
  step: 'Step {n} of {total}',
  stepWithTitle: 'Step {n} of {total}: {title}',
};
