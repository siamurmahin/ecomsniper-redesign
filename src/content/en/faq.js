/**
 * The questions. Used by the FAQ page and the homepage section.
 *
 * Part of the copy deck — see `src/content/index.js`. English is the base;
 * German overlays it key by key from `../de`.
 */

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
