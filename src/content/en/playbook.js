/**
 * The free playbook, and the form that delivers it.
 *
 * Part of the copy deck — see `src/content/index.js`. English is the base;
 * German overlays it key by key from `../de`.
 */

import { SITE } from './site';

export const PLAYBOOK = {
  eyebrow: 'Free, no card',
  headline: 'The Invisible Store',
  lead: 'How eBay dropshipping actually works when you have no stock, no website and no experience.',
  bullets: [
    'Whether eBay dropshipping is even allowed, answered straight',
    'What one member’s first 30 days actually looked like',
    'What the daily work is, once your listings are live',
    'Whether EcomSniper is worth paying for, including who it is wrong for',
  ],
  formCta: 'Send me the playbook',
  smallprint: 'No countdown timers, no fake scarcity. Unsubscribe at the bottom of any email.',

  /* The four things a reader wants settled before typing an email, from the
     client's own page. privacy is a promise, not decoration: it belongs with
     the form, and the endpoint behind it must not pass the address on. */
  reassurances: ['83 pages', 'No spam', 'No credit card', 'Instant access'],

  /* The book. Counted from the PDF rather than described: 83 pages, 16MB.
     Every "ten pages" on this site was wrong, including the meta description
     search results were showing. */
  file: {
    href: '/the-invisible-store.pdf',
    name: 'the-invisible-store.pdf',
    pages: 83,
    size: '16 MB',
  },

  /* What they see once the address is in. The file is handed over straight
     away, not just promised by email — they earned it by typing it. The offer
     underneath is the one place we ask for money right after giving something
     away, so it is framed as a next step and carries the guarantee. */
  done: {
    title: 'It is yours.',
    body: 'The download starts from the button below. A copy is on its way to your inbox too — if it has not arrived in a few minutes, look in promotions, and reply to it either way. A person reads those.',
    downloadCta: 'Download the playbook',
    upsell: {
      title: 'Read it first. Then, if it makes sense, start.',
      body: 'The playbook is the whole model with nothing held back. The software is what stops you doing it by hand.',
    },
  },
  privacy: SITE.privacyNote,
};
