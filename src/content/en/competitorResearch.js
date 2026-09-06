/**
 * Competitor Research.
 *
 * Their copy exists twice and this page is the join of both, which is new:
 * for Product Hunter and the AI Lister the `V6` rewrite was simply the fuller
 * draft and the readable slug could be dropped. Here it is the other way
 * round. `V6` compresses the whole procedure into two atmospheric sections —
 * "first you learn who is winning", "then you go slightly lower" — while the
 * readable slug carries four concrete steps. So the hero is `V6`'s, because
 * "Find. Snipe. Profit." is the tighter line, and the steps are the readable
 * slug's four, verbatim. See `docs/source-copy/competitor-research.md` and
 * `competitor-research-v6.md`, which carry both captures.
 *
 * **Page-owned copy, not part of the global deck.** Imported by the route and
 * merged with `usePageContent`, so it lands in that route's lazy chunk rather
 * than being downloaded by every visitor. Do not add it to either content
 * index.
 *
 * Three changes from their pages, all standing rules of the rebuild:
 *
 * 1. **The refund is qualified to the monthly plan.** Their `V6` page closes
 *    on a flat "30 day money back guarantee". It is the monthly plan only, and
 *    `AssuranceSection` — which closes this page — says so.
 * 2. **The hero gets a door.** Neither of their versions has a call to action
 *    above the fold; the first is at the foot, past every step.
 * 3. **A design note that leaked into their copy is dropped.** "Prices shown
 *    as blocks on purpose. The real numbers come from the live listings you
 *    are looking at" is an apology for a mock, printed as if it were product
 *    copy. The panels here say they are illustrations, which is the same
 *    admission made once and in the right voice.
 *
 * **What is not softened.** The page is built on undercutting named
 * competitors — spot them, save them, post under them. That is their product
 * and their positioning, and it is written here as they wrote it. It is
 * flagged in `docs/TODO.md` for the client rather than quietly reworded,
 * because a rebuild that edits what a business says about its own product has
 * stopped being a rebuild.
 */
export const COMPETITOR_RESEARCH = {
  eyebrow: 'The software · Competitor Research',

  headlineParts: [{ text: 'Find. Snipe. ' }, { text: 'Profit.', mark: true }],
  headline: 'Find. Snipe. Profit.',

  lead: "Discover your competition's best-selling listings and undercut them for fast sales.",

  ctas: {
    primary: { label: 'Start your eBay business', href: '/pricing' },
    secondary: { label: 'Get the free playbook', href: '/free-play-book' },
  },

  /**
   * The panels that show the software working.
   *
   * Prices, not earnings, for the reason `productHunter.js` gives: this site
   * promises on the About page not to show screenshots of big earnings, so
   * nothing here implies a return. The goods are the same generic household
   * items the Product Hunter panels use — a reader who has seen that page is
   * looking at the same shop, and a mock naming a real manufacturer would be
   * making a claim about that manufacturer.
   *
   * Five panels and no two alike. The hero holds the snipe itself, because
   * that is the argument for the whole page; each step then answers the one
   * question it raises — who counts as a competitor, what their store shows,
   * what price to post at, and what happens when you press the button.
   */
  panel: {
    /* The hero: the same item on four listings, ordered by price, with yours
       arriving underneath. The floor line is deliberate — it is the only
       thing on the page that says undercutting has a bottom, and without it
       the panel reads as a race to zero. */
    ladder: {
      title: 'Competitor Research — price ladder',
      note: 'Illustration of the interface. Prices are examples, not a forecast.',
      item: 'Garden kneeler and seat, folding bench',
      seller: 'Seller',
      price: 'Listed at',
      yoursLabel: 'Your listing',
      floor: 'Your cost from Amazon · £11.40',
      summary: 'Cheapest listing on the item',
      rows: [
        { seller: 'topgarden_uk', price: '£28.50' },
        { seller: 'ukbargainshed', price: '£26.95' },
        { seller: 'homeandgarden_uk', price: '£24.99', lowest: true },
        { seller: 'You', price: '£24.49', yours: true },
      ],
    },

    /* Step one: the tell. A listing priced above Amazon is the signal their
       own copy names, so the panel shows the comparison that identifies a
       dropshipper rather than a list of shops. */
    dossier: {
      title: 'eBay — search results',
      note: 'Illustration of the interface.',
      column: 'Seller',
      ebay: 'eBay',
      amazon: 'Amazon',
      flag: 'Likely dropshipper',
      button: 'Save competitor',
      saved: '{n} saved',
      rows: [
        { seller: 'homeandgarden_uk', ebay: '£24.99', amazon: '£11.40', flagged: true },
        { seller: 'ukbargainshed', ebay: '£26.95', amazon: '£12.10', flagged: true },
        { seller: 'craft_supplies_direct', ebay: '£9.40', amazon: '£8.80', flagged: false },
      ],
    },

    /* Step two: their store, filtered to what sold more than once. The count
       is the whole point — one sale is an accident, four in three days is a
       product. */
    scan: {
      title: 'Competitor Research — homeandgarden_uk',
      note: 'Illustration of the interface.',
      window: 'Sold in the last 3 days',
      repeat: '× {n}',
      summary: '{n} items sold more than once',
      rows: [
        { name: 'Garden kneeler and seat, folding bench', sold: 4 },
        { name: 'Cordless glue gun kit with 30 sticks', sold: 3 },
        { name: 'Car boot organiser, collapsible', sold: 3 },
        { name: 'Draught excluder, 90cm', sold: 2 },
        { name: 'Reusable produce bags, mesh, 12 pack', sold: 2 },
      ],
    },

    /* Step three: the decision, as arithmetic. Four numbers and nothing else,
       because this is the step a reader will want to check rather than
       admire. */
    price: {
      title: 'Competitor Research — undercut',
      note: 'Illustration of the interface. Prices are examples, not a forecast.',
      lines: [
        { label: 'Lowest listing', value: '£24.99' },
        { label: 'Your price', value: '£24.49', highlight: true },
        { label: 'Cost from Amazon', value: '£11.40' },
        { label: 'Left after fees', value: '£9.85' },
      ],
      caveat: 'Fees are eBay’s standard rate on this category. Yours may differ.',
    },

    /* Step four: the button, pressed. What comes back is a listing that
       exists, which is the only claim this panel makes. */
    listed: {
      title: 'EcomSniper — listing published',
      note: 'Illustration of the interface.',
      button: 'List it now',
      state: 'Status',
      live: 'live',
      queued: 'listing',
      summary: '{n} of 4 published',
      rows: [
        { name: 'Garden kneeler and seat', price: '£24.49', live: true },
        { name: 'Cordless glue gun kit', price: '£41.50', live: true },
        { name: 'Car boot organiser', price: '£31.40', live: true },
        { name: 'Draught excluder, 90cm', price: '£14.20', live: false },
      ],
    },
  },

  steps: {
    eyebrow: 'The snipe',
    headlineParts: [
      { text: 'Easy steps to ' },
      { text: 'outshine', mark: true },
      { text: ' the competition.' },
    ],
    headline: 'Easy steps to outshine the competition.',
    lead: 'Harness EcomSniper to locate winning products, undercut rivals, and boost your sales.',

    /* Their four, verbatim from the readable slug. `tone` carries the signal
       colour through the marker, the rule and the panel beside each one. */
    items: [
      {
        n: '01',
        tone: 'blue',
        title: 'Identify competitors',
        body: "Spot Amazon-to-eBay dropshippers and save their info with EcomSniper's Competitor Research tool.",
      },
      {
        n: '02',
        tone: 'gold',
        title: 'Scan for top sellers',
        body: "Automatically scan each competitor's store to find items that sold multiple times in the last few days.",
      },
      {
        n: '03',
        tone: 'red',
        title: 'Undercut the lowest price',
        body: 'Check who’s cheapest, then “snipe” their listing to post yours at a slightly lower cost.',
      },
      {
        n: '04',
        tone: 'green',
        title: 'Launch your listings',
        body: 'Click to list immediately. EcomSniper fills in details and publishes your undercut listing on eBay.',
      },
    ],
  },
};
