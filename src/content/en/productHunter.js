/**
 * Product Hunter.
 *
 * Their copy, from `ecomsniper.io/productHunterV6` — the newer of the two
 * spellings and the tighter rewrite. Both are live with different words; the
 * readable slug is the one we keep and `V6` redirects onto it, decided 4 Sep
 * and recorded in `docs/TODO.md`. See `docs/source-copy/product-hunter.md`,
 * which carries both versions and the correction to an earlier reading that
 * was taken before their page had hydrated.
 *
 * **Page-owned copy, not part of the global deck.** Imported by the route and
 * merged with `usePageContent`, so it lands in that route's lazy chunk rather
 * than being downloaded by every visitor. Do not add it to either content
 * index.
 *
 * Two changes from their page, both the rebuild's standing rules:
 *
 * 1. **The refund is qualified to the monthly plan.** Their V6 page says
 *    "30 day money back guarantee" flat. It is the monthly plan only — not the
 *    credits bundle, not Enterprise — and every other page here says so.
 * 2. **The hero gets a door.** Their page has no call to action above the
 *    fold at all: the first one is at the foot, past three steps. The words
 *    are theirs; the buttons are the ones the rest of this site uses.
 */
export const PRODUCT_HUNTER = {
  eyebrow: 'The software · Product Hunter',

  /* Their headline sets one word in an inverted block, the same device as the
     homepage and About. Split so the mark is content rather than markup
     guesswork — the concatenation still reads as the sentence for the meta
     tag and for a screen reader. */
  headlineParts: [
    { text: 'Find ' },
    { text: 'profitable', mark: true },
    { text: ' items to hunt.' },
  ],
  headline: 'Find profitable items to hunt.',

  lead: 'Uncover top eBay sellers, extract their best listings, and source them from Amazon. All in one tool.',

  ctas: {
    primary: { label: 'Start your eBay business', href: '/pricing' },
    secondary: { label: 'Get the free playbook', href: '/free-play-book' },
  },

  steps: {
    eyebrow: 'The hunt',
    headlineParts: [
      { text: 'The hunt takes ' },
      { text: 'three', mark: true },
      { text: ' steps.' },
    ],
    headline: 'The hunt takes three steps.',
    lead: 'Just follow these quick steps and you’re done.',

    /* Their three, verbatim. `tone` carries the signal colour through the
       marker, the rule and the mock beside each one. */
    items: [
      {
        n: '01',
        tone: 'blue',
        title: 'Identify dropshippers and extract listings',
        body: 'Search eBay for items priced higher than on Amazon, which indicates a likely dropshipper. Once you’ve found one, open their profile and use EcomSniper’s “Extract All Titles” button to gather a list of everything they’ve sold recently.',
      },
      {
        n: '02',
        tone: 'gold',
        title: 'Open Product Hunter',
        body: 'Open the EcomSniper extension, select “Open Product Hunter,” and paste the extracted product titles into the designated text box.',
      },
      {
        n: '03',
        tone: 'red',
        title: 'Click Search Titles',
        body: 'With a single click, Product Hunter scans Amazon for every title on your list. In seconds, you’ll have a curated list of profitable items, ready to list with EcomSniper’s AI Lister.',
      },
    ],
  },
};
