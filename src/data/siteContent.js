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

  /* The guarantee, in one place. "On the monthly plan" is not decoration: the
     10K credits bundle and Enterprise are final sale, so the unqualified
     version is contradicted by the pricing page and the FAQ — one of the two
     claim rules this file exists to enforce.

     `TRAINING.guarantee` and `FEATURES.closer.guarantee` are older copies of
     the same sentence and should fold into this one. Three copies of a claim
     is three places for it to drift. */
  guarantee: '30 day money back guarantee on the monthly plan',
  priceFrom: 'From $97 for your first month',
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
      value: '4.7',
      countTo: 4.7,
      label: 'Trustpilot score',
      /* Both figures are what the linked profile showed on 29 Aug 2026. The
         card links straight to it, so anything that does not match is checked
         and found wrong in one click — which costs more than the larger number
         could ever be worth. */
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
  /* Every member leads with a line and then tells the story. Rory's line is a
     `quote`, because it is his own words and is set in quote marks. The other
     seven carry a `title` instead: they are told in the third person, and
     putting quote marks around a sentence nobody said would be putting words
     in a real member's mouth.

     Those seven titles are drawn from the facts already in each story — no
     figure or claim in them is new — but they are written rather than
     supplied, so they are the first thing to replace if the real ones exist. */
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
  /* The same three sentences, kept as their three beats: the line sets the
     eight apart, then puts them back together, then turns on the reader. Split
     here rather than in the component so the wording and its rhythm stay in one
     place, and stored the way the headline above it is — the closer marks the
     same word the headline marks, which is what makes the section land where it
     started. */
  closer: {
    beats: ['Different lives.', 'Same system.'],
    questionLead: 'Could',
    questionMark: 'you',
    questionTail: 'be next?',
    /* The question is rhetorical until something answers it, so the closer ends
       on a way forward rather than on a full stop. This label is written rather
       than from the deck — the shortcut it offers is real, but the wording is
       the first thing to replace. */
    cta: { label: 'See what it costs', href: '/#pricing', nudge: 'Be next' },
  },
};

/* 04 — Proof: video, reviews, receipts Deck: strongest section, keep the structure. Three fixes applied: live Trustpilot link, no truncated reviews, disclaimer under the receipts. */

export const PROOF = {
  eyebrow: "Let's see",
  headline: 'But does it',
  headlineMark: 'really',
  headlineTail: 'work?',
  lead: 'Real members answer that question. Watch them, read them, or look at the receipts.',

  /* Thumbnails are local and named after the video, so a poster can never end
     up on the wrong clip. Nothing loads from YouTube until play is pressed.

     Ordered by how well a video answers "could this be me", not by upload
     date. The seven added on 30 Aug 2026 are the channel's most-watched
     member stories; the view count each one had is recorded so whoever
     prunes this list next can see what was popular then rather than guess.

     Deliberately excluded: the channel’s other popular videos are stealth
     account, suspension-evasion and MC011-removal guides. They do well on
     YouTube and they do not belong on a page selling the product. */
  videos: [
    { id: 'oEjX-90LJ8w', figure: '$100/day', figureWho: '17-year-old', title: '17-Year-Old Reveals the Secret to Making $100/Day Dropshipping on eBay', guest: 'Member interview', thumb: 'thumb-17-year-old-100-day', views: '1.8K' },
    { id: 'SosyiNFvbVc', figure: '$1,600/month', figureWho: '21-year-old', title: 'Learn how this 21 year old makes $1600 a month dropshipping on eBay', guest: 'Member interview', thumb: 'thumb-21-year-old-1600-month' },
    { id: '2IFJl0gzbpg', figure: '$18K/month', figureWho: 'Beginner', title: 'How This Beginner Makes $18K/Month by Dropshipping from Amazon', guest: 'Member interview', thumb: 'thumb-beginner-18k-month', views: '1.2K' },
    /* NOT a member story, despite where it sits. Checked on the channel on
       1 Sep 2026: the real title ends "— Full Summary of The Invisible Store",
       it is on Sammy's own channel, and its description links to the free
       playbook. It is the founder summarising his own book.

       So it carries no `figure`. The 300K in the title belongs to the book's
       story and is attributed to nobody, and a rail of member results is the
       last place to put an unattributed number. The `guest` line now says who
       is actually speaking.

       It still sits among twelve videos introduced as "members on what
       actually happened", which it is not. Whether it belongs in this set at
       all is the client's call, not a labelling fix. */
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

  /* Screenshots members posted themselves. The deck's "receipts".
     Ordered strongest first: the first one is what opens the section.

     `caption` is split into `figure` and `figureLabel` so the number can be
     set as display type on its own. In a row of three equal cards the figure
     was a caption under a picture; the number is the claim and the screenshot
     is the evidence for it, so the number gets to be the headline. `caption`
     stays as the one-line name used by the thumbnail buttons. */
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
     There were six here before, which put every name on screen twice across
     two marquee rows — the repeat was the honest problem and more reviews are
     the honest fix, not a layout trick that hides it.

     `rating` is now carried on every one, because it is not always 5: Manor
     left FOUR stars and was being rendered with five by the `?? 5` fallback.
     Same class of error as the 4.6→4.7 score and the "90+"→41 count.

     Rules used when copying, so the next person can apply the same ones:
     - Capitalisation and punctuation tidied. Not a word added, removed,
       reordered or swapped. The four that were already here are untouched.
     - Where Trustpilot truncated a title with an ellipsis, the title is a
       VERBATIM fragment of that review's own body — never a written one.
     - Two reviews naming a competitor were left out. They are genuine and the
       client may well want them; putting a rival's name on this page is their
       call, not this file's.
     - One was left out as too garbled to tidy without rewriting it.

     Gone from the profile since these were last collected: `Rayhan` and
     `greenapplecrunch` are no longer among the 42, so they are dropped. The
     section's lead claims every review shown is on the public profile, and
     with those two it was not. */
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

  /* --- Added for the section 04 variants -------------------------------
     A door inside the evidence: someone convinced by the receipts should not
     have to scroll past five more sections before they can act on it. */
  cta: { label: 'See what it costs', href: '/#pricing' },

  verifyLabel: 'Verify every review on Trustpilot',

  /* Sections 04b, 04c and 04d. The wall in 04a makes the case by volume;
     these are where each kind of proof is actually read. They are three
     sections and not three groups in one, because a reader who wants the
     receipts should not have to scroll through twelve interviews to reach
     them, and because each kind wants a different shape. */
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
    /* The door, at the end of the evidence. Someone convinced by the figures
       should not have to scroll past four more sections to act on it.

       `guarantee` carries "on the monthly plan" and must keep carrying it.
       That qualification is one of the two claim rules this file exists to
       enforce (see the note at the top): the 10K credits bundle and the
       Enterprise plan are final sale, so an unqualified "30 day money back
       guarantee" is a promise the pricing page then contradicts. That exact
       contradiction was already found and fixed once in section 14. */
    closer: {
      cta: { label: 'Start your eBay business', href: SITE.signupUrl },
      guarantee: '30 day money back guarantee on the monthly plan',
    },
  },

  testimonials: {
    eyebrow: 'In writing',
    /* Split for the ink mark, the same three-part shape as section 03's
       "…work for [you]?" and the wall's "But does it [really] work?".
       Trustpilot is the word carrying the claim here: these are not our
       reviews, they are on someone else's public profile. */
    headline: 'What members wrote on',
    headlineMark: 'Trustpilot',
    headlineTail: '.',
    /* Was "Unedited and in full". Dropped "unedited": the reviews carry tidied
       capitalisation and punctuation, so the claim was not exactly true. "In
       full" still is — none of them is clipped. */
    lead: 'In full, in their words. Every one of them is on the public profile.',
  },
};

/* 05 — REMOVED. "The model, in plain English" explained the four steps on its
   own ink band, a third of the page above the course that teaches them. The
   live site runs the two as one section and it is the better shape; the steps
   and both closing lines now live in TRAINING below. */

/* 06 — Three things, one system */

export const PILLARS = {
  eyebrow: 'The system',
  /* Marked like section 03's "you", the wall's "really" and 04d's
     "Trustpilot". The mark is the second half of the sentence: three things
     is the setup, one system is the claim — and the wire drawn through the
     three cards below is the same claim made visually. The full stop sits
     outside the block, as it does in the other three. */
  headline: 'Three things.',
  headlineMark: 'One system',
  headlineTail: '.',
  /* Closes the section. The live site follows this with "Let us take them one
     at a time", which handed over to the three sections below; the button does
     that job better here — by this point the reader has been through the wall,
     the interviews, the receipts and the reviews, and someone already
     convinced should not have to read four more sections to find a door.
     The cards themselves still link into the detail for anyone who wants it. */
  closer: {
    lead: 'Each one plays a different role.',
    cta: { label: 'Start your eBay business', href: SITE.signupUrl },
  },
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
  /* One signal colour per step, in the live site's order: find, list, watch,
     fulfil → blue, red, green, gold.

     `links` are the named tools the live site puts inside each tile as dashed
     pills. They point at its feature pages, which THIS SITE DOES NOT HAVE —
     so they are absolute URLs to the live site for now. When those pages are
     rebuilt here, repoint them; until then a relative path would be a 404 and
     dropping them would lose the product names entirely, which are the most
     concrete thing in the section. */
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
  /* How the live site closes this section too: the payoff line, a door, and a
     question that hands over to the community section directly below — which
     opens "Here's what 'never alone' looks like", so the bridge and the
     section it introduces are the same sentence answered.

     `guarantee` carries "on the monthly plan" and has to keep carrying it.
     That qualification is one of the two claim rules this file exists to
     enforce: the credits bundle and the Enterprise plan are final sale, so
     the unqualified version is contradicted by the pricing page and the FAQ. */
  closer: {
    lead: 'More time building. Less time clicking.',
    cta: { label: 'Start your eBay business', href: SITE.signupUrl },
    guarantee: '30 day money back guarantee on the monthly plan',
    /* Marked on exactly the two words the next section's headline puts in
       quotes — "Here's what 'never alone' looks like." The bridge asks it and
       the section below answers it in the same words, so the mark is the
       hinge between them rather than emphasis for its own sake. */
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
  /* Split three ways so the mark is set in the copy file rather than
     hardcoded in JSX, like §03's "you" and §06's "One system" — and the full
     stop stays outside the block.

     The marked words are exactly the two section 07's closing bridge marks:
     it asks "you are never alone", this answers it in the same words, and now
     both are set the same way. Rewriting either breaks the hinge. */
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

  /* The illustration the section is built on. Labelled in words under the
     panel, on the hero panel's rule: nothing on this site draws an interface a
     visitor could mistake for a capture of their own account without saying
     so. The times are the section's own "get stuck at 2am" claim, shown. */
  drawn: {
    /* The live site heads this card with the brand mark, "EcomSniper Support"
       and "Online now" rather than a channel name — which is the more honest
       label anyway: the claim being made is 24/7 support, not a Discord. */
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
      /* Overlapping initial discs, as the live site draws them: four circles
         in the four signal tones, ringed in the card's own ground, running
         into the member figure.

         The initials are real members' — Aldair, Samuele, Manor and Lynx all
         review the community by name in `PROOF.reviews`. The live site's
         fourth disc is a K that belongs to nobody, and a made-up initial is a
         made-up member.

         Tones are assigned in the page's usual order. The glyph colour comes
         from `toneOf`, not from the live site: it puts white on all four, and
         white on the green and the gold misses even the 3:1 non-text bar. */
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

  /* The deck asked this section for one verbatim member quote about support.
     It has one, in 04d: Clay C's "Anytime you have a problem the team is there
     to help you 24/7 through chat support" is one of the eighteen in
     `PROOF.reviews`, so it already renders in full on this page with its
     attribution and a link to the profile. A second copy here would be the
     page quoting the same member twice. */
};

/* 09 — The course Deck: rename the middle plan so it stops colliding with the course name. */

/**
 * 09 — Step by step. The model and the course, in one section.
 *
 * These were two: section 05 explained the four-step model on its own ink
 * band, and this one sold the course. The live site (ecomsniper.io, read
 * 31 Aug 2026) runs them as one — "Step by step / Starting from zero?", the
 * four steps, then the course underneath — and it is the better shape: the
 * steps ARE what the course teaches, so explaining them and then separately
 * offering to teach them was saying the same thing twice, a third of the page
 * apart.
 *
 * `steps` is section 05's, kept close to the live site's wording. `closer`
 * keeps both of section 05's payoff lines, which the live site does not have —
 * they answer the objection the steps raise, so they are not thrown away with
 * the section they came from.
 */
export const TRAINING = {
  eyebrow: 'Step by step',
  headline: 'Starting from zero?',
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

  /* Carries "on the monthly plan" and has to keep carrying it: the 10K credits
     bundle and Enterprise are final sale, so the unqualified version is
     contradicted by the pricing page and the FAQ. One of the two claim rules
     this file exists to enforce. */
  cta: { label: 'Start your eBay business', href: SITE.signupUrl },
  guarantee: '30 day money back guarantee on the monthly plan',
  course: {
    eyebrow: 'The course',
    name: 'Dropship Mastery',
    body: 'The step by step eBay dropshipping training that takes a complete beginner through the whole process. Included with every plan.',
    bullets: [
      'No inventory, no website',
      'Taught step by step',
      'Updated as eBay and the market change',
    ],

    /* The live site names the instructors under a rule inside the course card
       rather than as a fourth tick, with both faces. "Taught by Marc Augustine
       and Sammy" was that bullet; it is redundant beside two portraits and
       their names, so it is gone rather than said twice.

       The people are read from `FOUNDERS.people` at render, not copied here:
       two lists of the same two names drift, and section 10 already owns them. */
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

  /* The free door in this section. "Get the free playbook" is the hero's
     label and stays the hero's; this one earns its own because of where it
     sits — under two founders, beside a book that names who the product is
     wrong for. Saying "before you pay" is the argument the section is already
     making, and it is a promise the site can keep: the playbook is free and
     takes no card. No claim about the book's contents is added. */
  bookCta: { label: 'Read it before you pay', href: '/free-playbook' },
  /* `people` is read by section 09's instructor row as well, so a name or a
     photo key changed here moves both sections.

     Nothing renders `detail`. Section 10 signs off with the name and the role
     only, because `body[0]` above already says both of these things in full
     sentences — a card repeating "7 years selling on eBay" under a paragraph
     that just said "selling on eBay for seven years" reads as a stutter. It
     stays because it is real copy and the pricing or about pages may want it. */
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

  /* This section sits directly above pricing, so its door is the price. Same
     label the proof bar and section 03 use for the same jump. */
  cta: { label: 'See what it costs', href: '/#pricing' },
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

  /* The four things a reader wants settled before typing an email address,
     from the client's own free-playbook page. "Ten pages" is added from the
     exit-intent copy because scale is the other thing they want to know.

     `privacy` is a promise the site has to keep, not a decoration: it belongs
     wherever the form is, and it means the endpoint behind
     `VITE_PLAYBOOK_ENDPOINT` cannot sell or pass on the address. */
  reassurances: ['Ten pages', 'No spam', 'No credit card', 'Instant access'],
  privacy: 'Your information is 100% secure and will never be shared.',
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
