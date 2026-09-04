/**
 * AI Lister.
 *
 * Their copy from `ecomsniper.io/aiListerV6`, re-read on 4 Sep after
 * `readyState === 'complete'` — 1,822 characters, and the headings match the
 * capture in `docs/source-copy/ai-powered-lister.md` exactly. V6 is the fuller
 * of the two live spellings (1,822 against 1,339) and the tighter draft; the
 * readable slug is the one we keep, with `/aiListerV6` redirecting onto it.
 * Decided 4 Sep, in `docs/TODO.md`.
 *
 * **Page-owned copy, not part of the global deck.** Imported by the route and
 * merged with `usePageContent`, so it lands in that route's lazy chunk. Do not
 * add it to either content index.
 *
 * Two changes, both standing rules here: the refund is qualified to the
 * monthly plan — their page says "30 day money back guarantee" flat — and the
 * hero gets a call to action, which theirs does not have above the fold.
 *
 * The product's own buttons keep their names. "Generate Title" and "Opti List"
 * are what the extension says, and a translated button that does not exist is
 * an instruction into thin air.
 */
export const AI_LISTER = {
  eyebrow: 'The software · AI powered lister',

  /* Punctuation goes INSIDE the marked run. The mark is an inline-block, so a
     comma left outside it gets its own break opportunity and orphans onto the
     next line: the headline rendered as "List smarter" / ", not harder." */
  headlineParts: [{ text: 'List ' }, { text: 'smarter,', mark: true }, { text: ' not harder.' }],
  headline: 'List smarter, not harder.',

  lead: 'A single item or a full batch. The AI powered tools get your products live on eBay. Fast, easy, and ready to sell.',

  ctas: {
    primary: { label: 'Start your eBay business', href: '/pricing' },
    secondary: { label: 'Get the free playbook', href: '/free-play-book' },
  },

  /**
   * The panels that show the software working.
   *
   * Same rule as Product Hunter: only what the software produces animates.
   * Picking a product and pasting links are things the seller does and are
   * drawn as finished; finding the images, writing the title and posting the
   * listings are the software's work and play out.
   *
   * Nothing here implies a return. The About page promises no screenshots of
   * big earnings, so the panels show a listing being made, not what it made.
   */
  panel: {
    pick: {
      title: 'Amazon — product page',
      note: 'Illustration of the interface.',
      price: '£11.40',
      name: 'Garden kneeler and seat, folding bench',
      meta: 'Prime · In stock',
      action: 'Send to EcomSniper',
    },

    image: {
      title: 'EcomSniper — images found',
      note: 'Illustration of the interface.',
      label: 'Images found on the listing',
      found: '6 found',
      chosen: 'Selected',
    },

    title: {
      title: 'EcomSniper — Generate Title',
      note: 'Illustration of the interface.',
      before: 'Garden Kneeler Seat Folding Bench Pad Cushion Knee Protector',
      button: 'Generate Title',
      after: 'Garden Kneeler and Seat — Folding Bench with Thick Knee Pad, Heavy Duty Steel Frame',
      badge: 'AI optimised',
    },

    list: {
      title: 'EcomSniper — Opti List',
      note: 'Illustration of the interface.',
      button: 'Opti List',
      steps: ['Title written', 'Images attached', 'Item specifics filled', 'Posted to eBay'],
      done: 'Live on your store',
    },

    bulk: {
      title: 'EcomSniper — Bulk Lister',
      note: 'Illustration of the interface. Counts are examples.',
      label: 'Amazon links',
      pasted: '184 links',
      posting: 'Posting to eBay',
      done: '{n} of 184 posted',
      button: 'Opti List',
    },

    /* What the seller pasted. Generic goods rather than real brands: a mock
       naming a manufacturer makes a claim about that manufacturer. */
    links: [
      'amazon.co.uk/dp/B08GARDEN01',
      'amazon.co.uk/dp/B08MIXBOWL5',
      'amazon.co.uk/dp/B08GLUEGUN3',
      'amazon.co.uk/dp/B08PRODUCE1',
      'amazon.co.uk/dp/B08BOOTORG2',
    ],
  },

  moves: {
    eyebrow: 'The four moves',
    headlineParts: [
      { text: 'List your product in ' },
      { text: 'minutes', mark: true },
      { text: '.' },
    ],
    headline: 'List your product in minutes.',
    lead: 'Four quick moves and you are done.',

    items: [
      {
        n: '01',
        tone: 'blue',
        title: 'Pick a product from Amazon',
        body: 'Just choose any item you want to sell. No extra steps needed.',
      },
      {
        n: '02',
        tone: 'gold',
        title: 'Select your image',
        body: 'EcomSniper automatically finds product images. Pick the one you like best. No manual editing!',
      },
      {
        n: '03',
        tone: 'green',
        title: 'Get an AI optimized title',
        body: 'Click the “Generate Title” button and EcomSniper’s AI creates a great title for you.',
      },
      {
        n: '04',
        tone: 'red',
        title: 'Click “Opti List” and relax',
        body: 'Hit the button and let EcomSniper do the rest. Your product is listed on your eBay store automatically, with no extra work on your end.',
      },
    ],
  },

  bulk: {
    eyebrow: 'Bulk',
    headlineParts: [
      { text: 'Then scale to ' },
      { text: 'hundreds', mark: true },
      { text: ' at once.' },
    ],
    headline: 'Then scale to hundreds at once.',
    lead: 'The Bulk Lister posts hundreds of products at once. Hassle free.',

    items: [
      {
        n: '01',
        tone: 'blue',
        title: 'Gather your Amazon links',
        body: 'After using the Product Hunter, simply copy all the Amazon product links you want to list.',
      },
      {
        n: '02',
        tone: 'red',
        title: 'List your items',
        body: 'That’s it! Hit “Opti List” and let the Bulk Lister handle the rest. It automatically generates titles, optimizes listings, and posts them to your eBay account. If you ever pause, just refresh, reset, and start again.',
      },
    ],
  },
};
