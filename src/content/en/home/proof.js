/**
 * 02 and 04 — The proof bar, and every piece of evidence behind it.
 *
 * Part of the copy deck — see `src/content/index.js`. English is the base;
 * German overlays it key by key from `../de`.
 */

import { SITE } from '../site';

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
    {
      value: '400+',
      countTo: 400,
      suffix: '+',
      label: 'Members',
      detail: 'building income on eBay',
    },
    { value: '24/7', label: 'Support answered', detail: '7 days a week' },
    { value: 'eBay · Amazon', label: 'Works with', detail: 'the marketplaces you already know' },
  ],
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
    {
      id: 'oEjX-90LJ8w',
      figure: '$100/day',
      figureWho: '17-year-old',
      title: '17-Year-Old Reveals the Secret to Making $100/Day Dropshipping on eBay',
      guest: 'Member interview',
      thumb: 'thumb-17-year-old-100-day',
      views: '1.8K',
    },
    {
      id: 'SosyiNFvbVc',
      figure: '$1,600/month',
      figureWho: '21-year-old',
      title: 'Learn how this 21 year old makes $1600 a month dropshipping on eBay',
      guest: 'Member interview',
      thumb: 'thumb-21-year-old-1600-month',
    },
    {
      id: '2IFJl0gzbpg',
      figure: '$18K/month',
      figureWho: 'Beginner',
      title: 'How This Beginner Makes $18K/Month by Dropshipping from Amazon',
      guest: 'Member interview',
      thumb: 'thumb-beginner-18k-month',
      views: '1.2K',
    },
    /* Not a member story despite sitting here — it is the founder's own book
       summary, and the 300K figure it used to carry is unsourced. */
    {
      id: 'AIy19fmMutw',
      title:
        'From Broke Security Guard to 300K Sales on eBay — Full Summary of The Invisible Store',
      guest: 'Sammy, co-founder',
      thumb: 'thumb-security-guard-300k',
      views: '958',
    },
    {
      id: 'San_W1iQByc',
      figure: '$3,000/month',
      figureWho: 'College student',
      title: 'How This College Student Earns $3,000/Month From Dropshipping on eBay',
      guest: 'Member interview',
      thumb: 'thumb-college-student-3000-month',
      views: '941',
    },
    {
      id: 'h0CgxvLsgXw',
      figure: '$800/week',
      figureWho: 'Work-from-home dad',
      title: 'Work-from-Home Dad Makes $800/Week with eBay Dropshipping',
      guest: 'Member interview',
      thumb: 'thumb-wfh-dad-800-week',
      views: '842',
    },
    {
      id: 'okyFZuQ0e1c',
      figure: '$200 on day two',
      figureWho: 'New starter',
      title: 'Made $200 Profit on My Second Day Dropshipping on eBay',
      guest: 'Member interview',
      thumb: 'thumb-200-profit-second-day',
      views: '800',
    },
    {
      id: 'tRcpMYN2W6w',
      figure: '$2K/month',
      figureWho: 'Lance',
      title: 'Ebay Dropshipping Changed My Life: Lance Reveals His $2k/Month Strategy',
      guest: 'Ft. Lance',
      thumb: 'thumb-lance-2k-month',
      views: '794',
    },
    {
      id: 'sTVqFsxxwIo',
      title: 'From selling books to dropshipping on eBay, an in-depth comparison',
      guest: 'Ft. Adam',
      thumb: 'thumb-book-seller-comparison',
    },
    {
      id: '-cDk4ztkWaw',
      title: 'From TikTok dropshipping to eBay, what it takes to be successful',
      guest: 'Ft. Dollins',
      thumb: 'thumb-tiktok-to-ebay',
    },
    {
      id: 'uW1LL8NSvaI',
      title: 'Why you will never be rich dropshipping on eBay without virtual assistants',
      guest: 'Ft. Oleg',
      thumb: 'thumb-virtual-assistants',
    },
    {
      id: 'Bm9UKs-Lw_o',
      title: 'Converting eBay traffic into loyal customers, a forgotten art',
      guest: 'Ft. Jon',
      thumb: 'thumb-loyal-customers',
    },
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
