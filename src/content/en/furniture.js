/**
 * The conversion furniture that follows a visitor across every route.
 *
 * Part of the copy deck — see `src/content/index.js`. English is the base;
 * German overlays it key by key from `../de`.
 */

import { SITE } from './site';

/* Conversion furniture */

export const STICKY_CTA = {
  // Deck: appears after 25% scroll.
  showAfterScrollRatio: 0.25,
  /* Was "Software, training and community." — true of the whole site and
     therefore an argument for nothing. The bar is the offer following the
     reader down the page, so the second line is the reason to press the
     button rather than a description of the product. */
  message: SITE.guarantee,
  price: 'From $97 first month',
  cta: { label: 'Start now', href: SITE.signupUrl },
};

/* The consultation offer, opened when section 07 comes into view. The copy
   promises a reply and nothing else — no response time, no named person —
   because none of that is confirmed. Tighten it once the client says who
   answers these and how fast. */

export const CONSULT = {
  eyebrow: 'Free consultation',
  title: 'Talk to someone before you decide.',
  /* The dialog asks for one thing — an email — so the copy asks for one
     thing. It used to say "tell us where you are starting from", which is a
     request for a paragraph the form has nowhere to put: the reader is invited
     to explain themselves into a single-line email field. What the email buys
     is the conversation, and that is what this says now. */
  body: 'Leave your name and email and we will arrange a free consultation: a straight conversation about where you are starting from and whether this is right for you.',
  points: [
    'A conversation, not a sales call',
    'What your first month would realistically look like',
    'Whether EcomSniper is wrong for you',
  ],
  /* Name first, then the address. A consultation is answered by a person
     writing to a person, and 'Hi there' is a worse first line than a name.
     Both are required: an address with nobody attached to it is a lead, not
     a request for a conversation. */
  nameLabel: 'Full name',
  namePlaceholder: 'Your name',
  fieldLabel: 'Email address',
  placeholder: 'you@example.com',
  cta: 'Request my free consultation',
  dismiss: 'No thanks',
  /* The same promise the playbook page makes, read from one place. */
  privacy: SITE.privacyNote,
  done: {
    title: 'Request received.',
    body: 'We will email that address to arrange your consultation. Nothing else lands in your inbox.',
  },
  error: 'That did not send. Try again, or email us directly.',
  /* Section 07. The dialog waits for it rather than for a scroll depth: a
     percentage is a different place on a phone and on a desktop. */
  triggerId: 'how-it-works',
  storageKey: 'ecomsniper:consult-seen',
};

export const EXIT_INTENT = {
  eyebrow: 'Before you go',
  title: 'Take the playbook with you.',
  body: 'The Invisible Store: how eBay dropshipping actually works when you have no stock, no website and no experience. 83 pages, free, no card.',
  cta: { label: 'Send me the playbook', href: '/free-play-book' },
  dismiss: 'No thanks',
  storageKey: 'ecomsniper:exit-intent-seen',
};
