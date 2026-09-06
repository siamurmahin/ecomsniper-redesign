/**
 * Dropship Mastery — the course sales page.
 *
 * Their copy is from `ecomsniper.io/course/dropshipMastery`, captured 3 Sep
 * and carried in `docs/source-copy/course-dropship-mastery.md`. Their sitemap
 * lists it twice, `/course/dropshipMastery` and a lowercase
 * `/course/dropshipmastery`; ours is `/course/dropship-mastery`, kebab-case
 * like every other route here, and both of theirs 301 onto it.
 *
 * **Page-owned copy, not part of the global deck.** Imported by the route and
 * merged with `usePageContent`, so it lands in that route's lazy chunk rather
 * than being downloaded by every visitor. Do not add it to either content
 * index.
 *
 * ## This is a sales page, and it is the most claim-heavy page they have
 *
 * It is built as a funnel, because that is what it is for: the promise, the
 * mechanic, why the market works, what you get, who teaches it, what other
 * people say, what happens if it goes wrong, and one door held open the whole
 * way down. Nothing here is softened for its own sake.
 *
 * Four things are held out, and each is flagged in `docs/TODO.md` for the
 * client rather than quietly reworded. Three of them are held out because
 * **the About page promises, in the client's own words, that they will not do
 * exactly this** — and a site that makes a promise on one page and breaks it
 * two clicks away has not been rebuilt, it has been re-typeset.
 *
 * 1. **"Learn How to Build a Six-Figure eBay Dropshipping Business"** — an
 *    income claim in an H2. About: "We will not show you screenshots of big
 *    earnings. Those create false hope."
 * 2. **"Already Helped People Create A Second Income Stream"** — the same
 *    claim in the H1's subheading.
 * 3. **"I have done over $1,000,000 on eBay"** in Marc's bio — a personal
 *    earnings figure, unverifiable, and the same promise again.
 * 4. **"Limited Time Bonus"** over three items struck from $97 to $0. About:
 *    "We will not rush you with countdown timers or limited spots. If you need
 *    a week to decide, take a week."
 *
 * The bonuses themselves are kept — they are real things the package includes,
 * and saying what they are worth is ordinary. What is gone is the false
 * urgency around them.
 *
 * ## And one thing that is not a claim but an error
 *
 * Their page says eBay has **"over 2 billion transactions daily"**. eBay's own
 * reported figures are nowhere near that — its annual GMV implies a tiny
 * fraction of it, and the number appears to be a garbled version of its live
 * listing count. It is stated as a fact about a third party, so it is not
 * carried: the section makes the same argument from figures that are true and
 * checkable, and the client is asked what they meant.
 *
 * The mechanic, the instructors, the offer and the shape of the page are
 * theirs.
 */
export const COURSE = {
  eyebrow: 'The course',

  headlineParts: [{ text: 'Dropship ' }, { text: 'Mastery', mark: true }],
  headline: 'Dropship Mastery',

  /* Their subheading, with the income promise taken out of it. What is left is
     what the course actually is, which is also the part a reader can check. */
  lead: 'The step-by-step eBay dropshipping training, taught with the Sniper package — no inventory, no website, no stock you have paid for and cannot sell.',

  ctas: {
    /* Their above-the-fold button is Join Discord. It stays, as the second
       one: the free room is the right door for a reader who has not decided,
       and this page is long enough that it should not be the only door. */
    primary: { label: 'Enrol now', href: '/pricing' },
    secondary: { label: 'Join the Discord', href: null },
  },

  /* Checkable, and every one of them appears somewhere a reader can verify it.
     This is what stands in for the income claims: the figures we can stand
     behind. */
  proof: [
    { value: '4.7', label: 'on Trustpilot, from 42 reviews' },
    { value: '400+', label: 'members in 8 countries' },
    { value: '30 days', label: 'money back on the monthly plan' },
  ],

  mechanic: {
    eyebrow: 'How it works',
    headlineParts: [
      { text: 'Sell the item ' },
      { text: 'before', mark: true },
      { text: ' you buy it.' },
    ],
    headline: 'Sell the item before you buy it.',
    lead: 'eBay dropshipping is a simple model: you list what a retailer already stocks, and you only buy it once somebody has paid you for it.',

    /* Their four steps, their order. The homepage runs the same four in
       section 09 — this page is where the detail belongs, so each carries the
       part their homepage version leaves out. */
    steps: [
      {
        n: '01',
        tone: 'blue',
        icon: 'magnifier',
        kicker: 'Nothing spent',
        title: 'Find it, and list it',
        body: 'Find an item on a retailer’s site and list it on your eBay store at a higher price. Nothing is bought and nothing is owed.',
      },
      {
        n: '02',
        tone: 'gold',
        icon: 'salesGrowth',
        kicker: 'You are paid',
        title: 'A customer buys it',
        body: 'The sale happens on eBay, in front of an audience that is already there. You are paid before you have spent anything.',
      },
      {
        n: '03',
        tone: 'red',
        icon: 'scooter',
        kicker: 'They ship it',
        title: 'You order it to their address',
        body: 'You buy the same item from the retailer and enter your customer’s name and shipping address instead of your own. The retailer ships it directly.',
      },
      {
        n: '04',
        tone: 'green',
        icon: 'checkCircle',
        kicker: 'What is left',
        title: 'You keep the difference',
        body: 'What the customer paid, minus what the item cost and the fees eBay charges, is yours. No warehouse, no boxes, no stock sitting in a room.',
      },
    ],

    /* The line under the hero panel. It says what the four nodes above it
       add up to, which is the one thing a picture of a loop cannot say. */
    flowCaption:
      'You never buy stock, and you never pay for an item before somebody has paid you for it. That is the whole reason this can start from nothing.',

    /* Their example, kept as an example and labelled as one. Their own blog
       post on margins argues that the gap is thinner than this once fees are
       counted, which is why the note is here rather than a bigger number. */
    example: {
      label: 'Their example, as they write it',
      cost: '$89',
      costLabel: 'costs at the retailer',
      list: '$150',
      listLabel: 'listed on your store',
      note: 'An illustration, not a typical result. What is left after eBay’s fees is smaller than the gap — the blog post on profit margins works through the six fees that come out of it.',
      noteCta: {
        label: 'Read the margins post',
        href: '/blog/ebay-dropshipping-profit-margins-in-2026',
      },
    },
  },

  market: {
    eyebrow: 'Why eBay',
    headlineParts: [{ text: 'The buyers are ' }, { text: 'already there.', mark: true }],
    headline: 'The buyers are already there.',
    /* Their argument, made from figures that are true. Theirs said "over 2
       billion transactions daily", which is not a real eBay figure — see the
       header of this file. */
    body: [
      'eBay has been running for over twenty-five years and has built a buying audience that arrives with the intention to buy. That is the part most sellers spend years and a marketing budget trying to build, and on eBay it is already assembled.',
      'It is also why this model can start without a website, a brand or an advertising spend. You are not persuading somebody to visit a shop. You are putting an item in front of people who came to the platform looking for it.',
    ],
    points: [
      {
        label: '25+ years',
        body: 'The platform has been trading since 1995, through several recessions.',
      },
      {
        label: 'A market, not an audience',
        body: 'People arrive on eBay to buy something, not to be advertised at.',
      },
      {
        label: 'No shop to build',
        body: 'No website, no brand, no ad budget before the first sale.',
      },
    ],
  },

  /* Their bonus table, without the countdown. See this file's header. */
  included: {
    eyebrow: 'What you get',
    headlineParts: [{ text: 'The course, and ' }, { text: 'what comes with it.', mark: true }],
    headline: 'The course, and what comes with it.',
    lead: 'Included with the package rather than sold beside it. No timer, and the price does not go up if you take a week to decide.',

    course: {
      name: 'Dropship Mastery',
      body: 'The whole process, taught step by step, from a completely cold start through to a store that is running. Updated as eBay and the market change.',
      bullets: [
        'Taught from zero — no experience assumed',
        'The setup, the sourcing, the listing, the fulfilment',
        'Updated when the platform changes, not left to rot',
      ],
    },

    /* Their three, their words, with the struck pricing kept as a statement of
       value rather than a countdown. */
    bonuses: [
      {
        icon: 'robot',
        tone: 'blue',
        name: 'AI Powered Automation',
        body: 'One click, thousands of listings — the AI handles the rest, adding best-sellers to your eBay store while you get on with something else.',
        value: '$97',
      },
      {
        icon: 'openBook',
        tone: 'gold',
        name: 'Step by Step Blueprint',
        body: 'A proven path to launch and scale, from setup through to the point where the process runs without being re-learned each time.',
        value: '$97',
      },
      {
        icon: 'telegram',
        tone: 'green',
        name: 'Private Telegram',
        body: 'The private community for real-time tips, insights and support, from the people who teach this and the people doing it beside you.',
        value: '$97',
      },
    ],
    valueLabel: 'Sold separately',
    includedLabel: 'Included',
  },

  instructors: {
    eyebrow: 'Who teaches it',
    headlineParts: [{ text: 'Two people, and ' }, { text: 'their own inboxes.', mark: true }],
    headline: 'Two people, and their own inboxes.',
    lead: 'Both instructors publish their email addresses on this page. That is the same claim the About page makes about support, and it is the one worth checking.',

    people: [
      {
        name: 'Marc Augustine',
        role: 'Instructor',
        /* Their bio, minus the earnings figure — see this file's header. */
        body: 'My goal is to teach as many students as I can the knowledge, the tools and the tricks to succeeding in dropshipping that I wish I had known when I started. I have passed that on to people who want to establish another income stream for themselves, and I am here to give guidance that suits where you actually are.',
        emailLabel: 'marc@ecomsniper.io',
        email: 'mailto:marc@ecomsniper.io',
      },
      {
        name: 'Sammy',
        role: 'Founder and instructor',
        body: 'I am your go-to mentor for the world of dropshipping. I have a passion for online business and a track record behind it, and I am here to guide you through building something that works — not just to hand over a set of videos.',
        emailLabel: 'sammy@ecomsniper.io',
        email: 'mailto:sammy@ecomsniper.io',
      },
    ],
  },

  close: {
    eyebrow: 'Ready when you are',
    headlineParts: [
      { text: 'Start the course, or ' },
      { text: 'come and look first.', mark: true },
    ],
    headline: 'Start the course, or come and look first.',
    body: 'The Discord is free and nobody sells at you in it. If you would rather read before you decide, the playbook is free too, and the guarantee below is what happens if the course is not what you wanted.',
    ctas: {
      primary: { label: 'Enrol now', href: '/pricing' },
      secondary: { label: 'Get the free playbook', href: '/free-play-book' },
    },
  },
};
