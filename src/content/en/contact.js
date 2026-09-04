/**
 * Contact.
 *
 * Their copy, captured from ecomsniper.io/contact and re-verified against the
 * live page on 4 Sep 2026 after `readyState === 'complete'` — the 3 Sep pass
 * was from the batch that got About and Terms wrong, so it was checked rather
 * than trusted. It was accurate. See `docs/source-copy/contact.md`.
 *
 * Two things the first capture missed, both kept here because they are the
 * best copy on the page: the field placeholders, and the message field's
 * "We read every message ourselves" — which is the same promise the About
 * page makes about the team answering its own support.
 *
 * **Page-owned copy, not part of the global deck.** Imported by the route and
 * merged with `usePageContent`, so it lands in that route's lazy chunk rather
 * than being downloaded by every visitor. Do not add it to either content
 * index.
 *
 * Their phone, email and address are already in the footer deck; they are
 * repeated here rather than imported because a contact page that goes blank
 * when someone edits the footer is a contact page nobody can use.
 */
export const CONTACT = {
  eyebrow: 'Contact',
  headline: 'How can we help?',
  lead: 'Ask once. We’ve got you.',
  /* The ink panel's heading, over their line. The right-hand form panel has
     one, and a heading on one side of a two-column layout and not the other
     reads as an oversight. */
  methodsTitle: 'Reach us directly',
  intro: 'Send a message and a real person gets back to you.',

  /* Their three, in their order. `href` decides whether it becomes a link:
     a phone number and an address behave differently from an email. */
  methods: [
    {
      label: 'Call us',
      value: '1 (800) 994-9831',
      href: 'tel:+18009949831',
    },
    {
      label: 'Email us',
      value: 'management@ecomsniper.io',
      href: 'mailto:management@ecomsniper.io',
    },
    {
      label: 'Address',
      value: 'Toronto, Ontario, Canada',
    },
  ],

  hours: 'Support is 24/7. Any hour.',

  /* The same promise as `hours`, set to run round a ring. Padded with a
     separator so it fills the circle evenly; the seal reads it aloud as one
     sentence rather than as loose characters. */
  seal: '24/7 SUPPORT • ANY HOUR • ',

  form: {
    /* Real labels, because their page has them and losing them would be a
       regression in a rebuild that fixed six accessibility defects. */
    name: { label: 'Your name', placeholder: 'John Carter' },
    email: { label: 'Your email', placeholder: 'you@email.com' },
    message: {
      label: 'Your message',
      placeholder: 'Tell us what you need. We read every message ourselves.',
    },
    /* The form panel's own heading. Their page has none: three unlabelled
       inputs sit under the contact block with nothing saying what they are
       for. */
    panelTitle: 'Send a message',
    panelNote: 'We read every one ourselves. No ticket numbers, no bots.',

    submit: 'Send message',
    sending: 'Sending…',

    /* Shown when a message has been handed to the visitor's mail client
       rather than posted. It says what actually happened, because a form that
       reports success it did not have is the failure this page was built to
       avoid — see the header of `ContactPage`. */
    handoff: 'Your email app should be open with the message ready. Press send there.',
    handoffFallback:
      'If nothing opened, email us at management@ecomsniper.io and we will pick it up.',

    done: 'Thanks — that reached us. We answer every message, usually the same day.',
    error: 'That did not send. Email us at management@ecomsniper.io and we will pick it up.',
  },

  /* The second door, the same offer the footer makes. It was hardcoded in
     the component, which is content in a page file — it belongs here so it
     translates with everything else. */
  secondDoor: {
    title: 'Not ready to ask yet?',
    body: 'Take the free playbook and read it first. No card, no pressure.',
    cta: { label: 'Get the free playbook', href: '/free-play-book' },
  },

  closing: 'The training, the software, and the people who guide you. All in one place.',
};
