/**
 * The blog — the index and the posts.
 *
 * Their live blog, captured 3 Sep 2026, is in `docs/source-copy/blog.md`.
 *
 * ## What is real here and what is not
 *
 * The **slugs, titles, categories and authorship are theirs**, read off the
 * live index. The **bodies are our draft**, written 6 Sep on the same
 * instruction as the job advert: build it with useful copy now, the client
 * replaces it later. Their real posts run to 25,000 characters each and would
 * be imported rather than retyped — see the source-copy file, which
 * deliberately transcribed one post and no more.
 *
 * **Replace before launch.** On the Blocked list in `docs/TODO.md`.
 *
 * ## Two defects on their blog that this does not reproduce
 *
 * 1. **Their index and their sitemap share no posts at all.** Twelve are live
 *    and linked, nine are in the sitemap, and the intersection is empty — so
 *    every live post is invisible to search and every indexed post is an
 *    orphan. Here the sitemap is written from these slugs.
 * 2. **Their post pages carry two `<h1>`s** with identical text: once as the
 *    page heading and again as the article's first line. The template renders
 *    the title once.
 *
 * ## Shape
 *
 * A post owns its slug, which is its page at `/blog/<slug>` and, prefixed, at
 * `/de/blog/<slug>`. `react-router.config.js` reads the slugs from this file,
 * so adding a post prerenders its page without a second list to keep in step.
 *
 * `body` is a list of typed blocks rather than a string of HTML. A CMS is on
 * the roadmap and rich text arrives as structured data from every one of them;
 * a block list maps onto that, and a blob of HTML would have to be sanitised
 * and would carry someone else's markup into this design. `p`, `h2` and `ul`
 * are all the current copy needs — add a type when a post needs one, not
 * before.
 *
 * `date` is ISO, and formatted for the reader at render. Theirs prints the raw
 * `Date` string — "Thu May 28 2026" — which is what a `Date` looks like when
 * nobody formatted it.
 */
export const BLOG = {
  /* This page's own meta, rather than a key in `content/en/seo.js`.

     That deck is re-exported from `content/en/index.js`, so the header and
     footer pull it on every route — anything added to it is downloaded by
     every visitor on every page, including the ones who never open the blog.
     It is the right home for site-wide copy and the wrong home for a page's.

     `metaForContent` takes it from here instead, and this file already
     travels in the blog route's own lazy chunk. */
  meta: {
    title: 'Blog — eBay dropshipping, written down | EcomSniper',
    description:
      'What is working on eBay right now, what changed this month, and what we got wrong. Margins, Cassini, VeRO and supplier vetting, from the people who build the software and sell on it.',
  },

  eyebrow: 'Blog',
  headlineParts: [{ text: 'What we learn, ' }, { text: 'written down.', mark: true }],
  headline: 'What we learn, written down.',
  lead: 'What is working on eBay right now, what changed this month, and what we got wrong. Written by the people who build the software and sell on it.',

  /* Their index puts a search field and six category filters over twelve
     posts. Neither is here yet, for the reason the careers page has no filter
     either: a control that cannot change what you see is furniture. The
     categories are still on each card, because that is a label, not a
     control. */
  featuredLabel: 'Featured',
  readMore: 'Read the post',
  readTimeSuffix: 'min read',
  author: 'EcomSniper Team',
  empty: 'Nothing published yet. The playbook is the thing to read in the meantime.',

  post: {
    backLabel: 'All posts',
    byLabel: 'By',
    shareLabel: 'Share this post',
    nextLabel: 'Read next',
  },

  posts: [
    {
      slug: 'ebay-dropshipping-profit-margins-in-2026',
      title:
        'eBay dropshipping profit margins in 2026: real numbers, hidden fees, and how to never sell at a loss',
      category: 'Dropshipping',
      date: '2026-08-19',
      readTime: 11,
      featured: true,
      tags: ['margins', 'fees', 'pricing'],
      excerpt:
        'The gap between the margin a listing shows you and the margin you keep is made of six fees, and most sellers only know three of them.',
      /* DRAFT — see the file header. Not client-approved. */
      body: [
        {
          type: 'p',
          text: 'Every seller who has ever run the numbers on a product has done the same subtraction: what it sells for, minus what it costs, minus the eBay fee. That number is wrong, and it is wrong in the same direction every time.',
        },
        { type: 'h2', text: 'The six fees, not the three you remember' },
        {
          type: 'p',
          text: 'The final value fee is the one everyone knows. It is not the one that decides whether a listing is worth running.',
        },
        {
          type: 'ul',
          items: [
            'Final value fee, charged on the total including postage — not on the item price.',
            'The per-order fixed fee, which is invisible on a £90 sale and brutal on a £6 one.',
            'Payment processing, folded into the same line on the statement.',
            'Currency conversion, when the supplier and the buyer are not in the same market.',
            'Promoted Listings, if the item only sells while promoted.',
            'Returns — not the refund, the postage and the item you cannot resell.',
          ],
        },
        { type: 'h2', text: 'Where the margin actually goes' },
        {
          type: 'p',
          text: 'On a typical £24.99 listing sourced at £11.40, the naive calculation says a margin near £9. Once the six fees above are counted, and once the return rate for that category is applied across a month rather than to a single order, the real figure lands closer to £4.60 — and a single return inside that month takes it under £2.',
        },
        {
          type: 'p',
          text: 'That is not an argument against the product. It is an argument for knowing the number before you list rather than at the end of the quarter.',
        },
        { type: 'h2', text: 'The floor price, and why it is not a guess' },
        {
          type: 'p',
          text: 'Work out the price at which the order makes nothing, add the return rate for the category, and never list beneath it. The number is dull and it is the whole discipline. Most accounts that quietly lose money for a year are not selling badly; they are selling below a floor nobody calculated.',
        },
      ],
    },
    {
      slug: 'ebay-cassini-algorithm-in-2026',
      title: 'The eBay Cassini algorithm in 2026: what dropshippers must know to rank higher',
      category: 'eBay Tips',
      date: '2026-08-04',
      readTime: 9,
      tags: ['search', 'listings', 'seo'],
      excerpt:
        'Cassini does not rank listings. It ranks the seller behind them, and the listing inherits the score.',
      body: [
        {
          type: 'p',
          text: 'Sellers talk about "ranking a listing" as though the listing were the thing being judged. It is not. Cassini is scoring an account and applying it to everything under that account.',
        },
        { type: 'h2', text: 'What it is actually measuring' },
        {
          type: 'ul',
          items: [
            'How often a search that showed your listing ended in a sale.',
            'How fast you dispatch, measured against what you promised.',
            'How often buyers open cases, and how quickly you close them.',
            'How complete the item specifics are — the fields most sellers skip.',
          ],
        },
        { type: 'h2', text: 'The item specifics nobody fills in' },
        {
          type: 'p',
          text: 'A listing missing brand, MPN and the two category-specific fields will not surface for the filtered searches that convert best. This is the cheapest ranking work available and it takes minutes per listing.',
        },
        { type: 'h2', text: 'What does not work' },
        {
          type: 'p',
          text: 'Keyword-stuffed titles read as spam to buyers and are discounted by the algorithm. A title that a human would read aloud without wincing is the correct target.',
        },
      ],
    },
    {
      slug: 'ebay-vero-violations-the-complete-2026-guide',
      title: 'eBay VeRO violations: the complete 2026 guide for dropshippers',
      category: 'Dropshipping',
      date: '2026-07-22',
      readTime: 12,
      tags: ['vero', 'compliance', 'suspensions'],
      excerpt:
        'Most VeRO strikes are not counterfeits. They are real products listed with the brand owner’s own photographs.',
      body: [
        {
          type: 'p',
          text: 'VeRO is eBay’s Verified Rights Owner programme, and the fastest way to lose an account that is otherwise healthy. The thing sellers get wrong is assuming it is about fakes.',
        },
        { type: 'h2', text: 'The three kinds of strike' },
        {
          type: 'ul',
          items: [
            'Counterfeit — the product is not what it claims. Rare among dropshippers.',
            'Image rights — the product is genuine and the photograph belongs to someone else. This is most of them.',
            'Unauthorised reseller — the brand restricts who may sell it at all.',
          ],
        },
        { type: 'h2', text: 'Checking before you list' },
        {
          type: 'p',
          text: 'Search the brand on eBay’s VeRO participant list before sourcing, not after the strike. If the brand is listed, assume every image on the supplier page is theirs.',
        },
        { type: 'h2', text: 'If a strike lands' },
        {
          type: 'p',
          text: 'Remove the listing immediately, do not relist a variation, and reply to the notice. An account with one strike and a fast removal usually survives. An account that relists the same item under a new title usually does not.',
        },
      ],
    },
    {
      slug: 'building-the-engine-for-the-next-era-of-ecomsniper',
      title: 'Building the engine for the next era of EcomSniper',
      category: 'News & Updates',
      date: '2026-05-28',
      readTime: 24,
      tags: ['company'],
      excerpt: "A founder's letter to the EcomSniper community.",
      /* Their real post runs to 25,723 characters and is a personal letter. It
         is not ours to paraphrase, so this carries its opening as captured and
         says plainly that the rest is theirs to restore. */
      body: [
        { type: 'p', text: 'Bismillahirrahmanirrahim. Assalamu Alaikum.' },
        {
          type: 'p',
          text: 'To Baba, Icy, and everyone in the EcomSniper community — first and foremost, I want to thank you honestly from the bottom of my heart.',
        },
        {
          type: 'p',
          text: 'For those of you who have been here for a long time, I want you to know that I remember you. We remember you. You are not just a username in a group or a customer in a system. You are people who believed in us, supported us, and stayed with us through different phases of this journey.',
        },
        {
          type: 'p',
          text: 'The rest of this letter is the client’s own writing and is restored from their site rather than rewritten here.',
        },
      ],
    },
  ],
};

/** Every post's slug, for the prerender list and the sitemap. */
export const POST_SLUGS = BLOG.posts.map((post) => post.slug);
