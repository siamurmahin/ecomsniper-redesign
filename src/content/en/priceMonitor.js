/**
 * Price Monitor — the last of the four feature pages.
 *
 * Their copy is from `ecomsniper.io/priceMonitorV6`, and this is the one
 * feature page with **no second version to compare against**: there is no
 * readable slug, no sitemap entry, and the page is reachable only from their
 * nav and their JS bundle. So the slug question that hung over the other three
 * does not arise here — there is nothing to choose between. `/price-monitor`
 * is ours, written to match the three beside it, and `/priceMonitorV6` 301s
 * onto it exactly as the others do. Recorded in `docs/TODO.md`; the source
 * capture is `docs/source-copy/price-monitor.md`.
 *
 * **Page-owned copy, not part of the global deck.** Imported by the route and
 * merged with `usePageContent`, so it lands in that route's lazy chunk rather
 * than being downloaded by every visitor. Do not add it to either content
 * index.
 *
 * ## The one place their words are not reproduced
 *
 * Their page lists two things that change, and both entries repeat the
 * headline's own sentence with a single word swapped:
 *
 * > **Prices change** — Never have an issue keeping track of your inventory
 * > for price changes.
 * > **Items go out of stock** — Never have an issue keeping track of your
 * > inventory for stockouts.
 *
 * That is placeholder text that was never rewritten, and reproducing it
 * faithfully would ship the same hole in a rebuild whose whole argument is
 * that the details were looked at. The bodies below are **our draft**, written
 * to say what each case actually does — the same call taken for the job advert
 * and the blog bodies, and flagged the same way, in `docs/TODO.md` under
 * Blocked. Every claim in them is one their own page or the homepage already
 * makes; nothing new is promised.
 *
 * The headline, the lead, the section titles and the background claim are
 * theirs, verbatim.
 *
 * Two standing rules of the rebuild apply as on the other three pages: the
 * hero gets a call to action their page does not have above the fold, and the
 * guarantee that closes the page is qualified to the monthly plan by
 * `AssuranceSection`.
 */
export const PRICE_MONITOR = {
  eyebrow: 'The software · Real-time price monitoring',

  headlineParts: [
    { text: 'It ' },
    { text: 'watches', mark: true },
    { text: ' your store for you.' },
  ],
  headline: 'It watches your store for you.',

  lead: 'Never have an issue keeping track of your inventory for price changes and stockouts.',

  ctas: {
    primary: { label: 'Start your eBay business', href: '/pricing' },
    secondary: { label: 'Get the free playbook', href: '/free-play-book' },
  },

  /**
   * The panels.
   *
   * Their page carries one small animated sequence — store, monitoring, a
   * change detected, the listing updated, nothing needed from you — and that
   * sequence is the entire product. So it is the hero, and the two panels
   * below it show the two cases it covers rather than restating it.
   *
   * Prices, not earnings, as everywhere else on this site. The goods are the
   * same generic household items the Product Hunter and Competitor Research
   * panels use: a reader moving between the feature pages is looking at one
   * shop, and a mock naming a real manufacturer would be a claim about that
   * manufacturer.
   */
  panel: {
    /* The hero: the watch itself, as a feed. The last line is the point of
       the page — the work happened and nobody was asked to do anything. */
    feed: {
      title: 'Price Monitor — your store',
      note: 'Illustration of the interface. Prices are examples, not a forecast.',
      store: 'Your store',
      state: 'Monitoring',
      idleLabel: 'Nothing needed from you',
      idleNote: 'It ran in the background.',
      events: [
        {
          at: '04:12',
          tone: 'blue',
          detected: 'Price change detected',
          item: 'Garden kneeler and seat',
          from: '£11.40',
          to: '£12.85',
          done: 'Your listing updated',
        },
        {
          at: '09:38',
          tone: 'red',
          detected: 'Stock change detected',
          item: 'Cordless glue gun kit',
          from: 'In stock',
          to: 'Out of stock',
          done: 'Your listing paused',
        },
        {
          at: '17:05',
          tone: 'blue',
          detected: 'Price change detected',
          item: 'Car boot organiser',
          from: '£14.20',
          to: '£13.10',
          done: 'Your listing updated',
        },
      ],
    },

    /* Case one, as arithmetic: the cost moved, so the price moved with it and
       the margin held. The margin line is the reason a price change matters
       at all — without it this is a panel about a number changing. */
    price: {
      title: 'Price Monitor — cost rose',
      note: 'Illustration of the interface. Prices are examples, not a forecast.',
      item: 'Garden kneeler and seat',
      lines: [
        { label: 'Cost was', value: '£11.40' },
        { label: 'Cost now', value: '£12.85' },
        { label: 'Your listing was', value: '£24.49' },
        { label: 'Your listing now', value: '£25.95', highlight: true },
      ],
      footer: 'Margin held. You were not asked.',
    },

    /* Case two: what happens to a listing whose supplier has nothing left.
       Paused rather than ended, because that is what their homepage claims
       and it is the reversible one. */
    stock: {
      title: 'Price Monitor — went out of stock',
      note: 'Illustration of the interface.',
      column: 'Listing',
      status: 'Status',
      live: 'live',
      paused: 'paused',
      rows: [
        { name: 'Garden kneeler and seat', live: true },
        { name: 'Cordless glue gun kit', live: false },
        { name: 'Car boot organiser', live: true },
        { name: 'Draught excluder, 90cm', live: true },
      ],
      footer: 'A listing nobody can fulfil is the one that costs you the account.',
    },
  },

  /* Their section, their title, their sub. */
  changes: {
    eyebrow: 'Two things change',
    headlineParts: [{ text: 'Prices move. Stock ' }, { text: 'runs out.', mark: true }],
    headline: 'Prices move. Stock runs out.',
    lead: 'Both of them, all day, on every item you sell.',

    /* Titles theirs; bodies ours — see the header of this file. */
    items: [
      {
        n: '01',
        tone: 'blue',
        title: 'Prices change',
        body: 'The retailer moves a price and your listing is suddenly selling at the wrong one — sometimes below what the item now costs you. Price Monitor watches the source and moves your price with it, so the margin you listed at is the margin you keep.',
      },
      {
        n: '02',
        tone: 'red',
        title: 'Items go out of stock',
        body: 'A sale you cannot fulfil is worse than a sale you never made: it is a cancellation, a refund and a mark against the account eBay judges you on. When the source runs out, the listing comes down until it is back.',
      },
    ],
  },

  /* Their closing claim, verbatim, and the reason the page exists. */
  background: {
    eyebrow: '24 / 7, in the background',
    headlineParts: [{ text: 'So you do not have to ' }, { text: 'check anything.', mark: true }],
    headline: 'So you do not have to check anything.',
    lead: 'Prices or stock change? EcomSniper keeps your products updated in the background.',
    body: 'It runs beside the rest of the system. You find the products, you list them, and the monitoring keeps them right while you get on with your day.',
  },
};
