/**
 * The affiliate programme — the landing page and its application form.
 *
 * Their site has no page like this. `/affiliate` renders blank on their live
 * site: their router has no such route, only `/affiliate/join`, which is the
 * contract and nothing else. So a reader who wants to know what the programme
 * pays has a legal document and no offer. This page is the offer.
 *
 * **Every claim here is taken from a clause, not invented.** The programme's
 * facts come from `affiliateTerms.js`, and where the terms decline to say
 * something, so does this page:
 *
 *   quarterly payouts, 1st-10th   clause 8, payment schedule
 *   PayPal only                   clause 8, payment method
 *   $100 minimum                  clause 8, minimum payout
 *   active paid subscription      clause 1, enrollment
 *   18 or older                   clause 1, enrollment
 *   approval at their discretion  clause 1, enrollment
 *   links or coupon codes         clause 5, promotion guidelines
 *
 * **There is no commission percentage on this page, and there cannot be.**
 * Clause 7 says percentages "may vary and will be communicated separately".
 * A landing page that headlines a rate the contract refuses to state would be
 * making the company's offer for it. The hero sells the mechanics instead —
 * which is honest, and is the same reason the playbook page does not promise
 * a figure. If the client supplies a rate, it belongs here and in clause 7 at
 * the same time. Recorded in `docs/TODO.md` as blocked on them.
 *
 * **Page-owned copy, not part of the global deck.** Imported by the route and
 * merged with `usePageContent`, so it lands in that route's lazy chunk.
 */
export const AFFILIATE = {
  eyebrow: 'Affiliate programme',

  /* Punctuation inside the marked run — the mark is an inline-block, so a
     stop left outside it gets its own break opportunity and orphans. */
  headlineParts: [{ text: 'Get paid for the people you ' }, { text: 'bring.', mark: true }],
  headline: 'Get paid for the people you bring.',

  lead: 'Share a referral link, and earn on every subscription that comes through it. Payouts run quarterly through PayPal, once you pass $100.',

  ctas: {
    primary: { label: 'Apply to join', href: '#apply' },
    secondary: { label: 'Read the terms', href: '/affiliate/terms' },
  },

  /**
   * The four facts a reader actually wants before applying, and the four the
   * contract states plainly. Deliberately not dressed as achievements.
   */
  facts: [
    { tone: 'blue', label: 'Payouts', value: 'Quarterly', note: 'Paid between the 1st and 10th' },
    { tone: 'gold', label: 'Paid through', value: 'PayPal', note: 'The only method offered' },
    { tone: 'green', label: 'Minimum payout', value: '$100', note: 'Before a request is made' },
    { tone: 'red', label: 'Eligibility', value: '18+', note: 'And a paid subscription' },
  ],

  /**
   * Three steps, and this is a genuine sequence — apply, then promote, then
   * get paid — which is the only reason it carries numbers.
   */
  steps: {
    eyebrow: 'How it works',
    headlineParts: [{ text: 'Three steps, then it ' }, { text: 'runs itself.', mark: true }],
    headline: 'Three steps, then it runs itself.',

    items: [
      {
        n: '01',
        tone: 'blue',
        title: 'Apply',
        body: 'Tell us who you reach and how. Applications are reviewed by a person, and EcomSniper approves or declines at its own discretion.',
      },
      {
        n: '02',
        tone: 'gold',
        title: 'Share your link',
        body: 'Approved affiliates get a unique referral link or coupon code. Promote it honestly — no fake urgency, no income claims, no spam.',
      },
      {
        n: '03',
        tone: 'green',
        title: 'Request a payout',
        body: 'Commissions build up on qualifying sales. Once your balance passes $100, request a payout from the affiliate dashboard.',
      },
    ],
  },

  /** What gets an application declined. Better said before than after. */
  eligibility: {
    title: 'Before you apply',
    lead: 'The programme has real conditions, and they are worth knowing now rather than after a rejection.',
    items: [
      'You are 18, or the legal age where you live.',
      'You hold an active paid EcomSniper subscription — affiliate status is suspended if it lapses.',
      'You promote it honestly. Misleading income claims and fake testimonials end a partnership.',
      'Commission rates are set by EcomSniper and shared with you after approval.',
    ],
  },

  /**
   * The application.
   *
   * It collects what an approve-or-decline decision is actually made on and
   * nothing else. No PayPal address: that is a payout detail, it is personal
   * data, and asking for it before anyone is approved collects it from people
   * who will never be paid.
   */
  form: {
    id: 'apply',
    eyebrow: 'The application',
    title: 'Apply to the programme',
    lead: 'A person reads every application. Expect a reply by email either way.',

    name: { label: 'Your name', placeholder: 'Alex Fischer' },
    email: { label: 'Email', placeholder: 'you@example.com' },
    country: { label: 'Country', placeholder: 'United Kingdom' },
    channels: {
      label: 'Where you would promote it',
      placeholder: 'YouTube, a Discord server, a newsletter — whatever you actually run',
    },
    audience: { label: 'Roughly how many people you reach', placeholder: '4,000 subscribers' },
    links: {
      label: 'Links to your channels',
      placeholder: 'youtube.com/@yourchannel\ninstagram.com/yourhandle',
    },

    /* The consent line. It links the contract rather than summarising it —
       a summary of a contract inside a checkbox is not the contract. */
    consent: {
      before: 'I have read and agree to the ',
      link: { label: 'affiliate programme terms', href: '/affiliate/terms' },
      after: '.',
    },

    submit: 'Send application',
    sending: 'Sending…',

    /* No fake success. Same rule the contact form is built on: without an
       endpoint the application is handed to the visitor's mail client and the
       page says so, rather than showing a tick for a thing that never left. */
    done: 'Application sent. We read every one and will reply by email.',
    handoff:
      'Your email app should be opening with the application filled in. Press send there and it reaches us.',
    error: 'That did not send. Email management@ecomsniper.io and we will pick it up from there.',
    trap: 'Leave this field empty',
  },

  /** The contract, one click away and named as what it is. */
  terms: {
    title: 'The full terms',
    body: 'Eleven clauses covering enrollment, conduct, referral ownership, commissions, payment and termination. Worth reading before you apply, not after.',
    cta: { label: 'Read the affiliate terms', href: '/affiliate/terms' },
  },
};
