/**
 * The plans. Used by the pricing page and the homepage preview.
 *
 * Part of the copy deck — see `src/content/index.js`. English is the base;
 * German overlays it key by key from `../de`.
 */

import { SITE } from './site';

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
