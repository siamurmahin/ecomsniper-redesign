/**
 * Login and registration.
 *
 * Page-scoped: imported by `LoginPage` and `RegisterPage`, never re-exported
 * from `content/en/index.js`, so these words land in those routes' chunks
 * rather than in the bundle every visitor downloads. See CLAUDE.md → Content.
 *
 * Their pages are captured verbatim in `docs/source-copy/auth.md`. Two things
 * there are deliberately not carried, and both are recorded in `TODO.md`:
 *
 * 1. **"99% of People Who Use EcomSniper for 3 Months Make 1-3k/month"** is the
 *    headline of their registration page. It is the one claim this repository
 *    has banned by name since the start — CLAUDE.md says so — and it is the
 *    same class as the four held out of the course page. What stands in its
 *    place says what happens next and how to get out, which is what somebody
 *    about to pay actually wants to know.
 *
 * 2. **"Must be 6 characters."** Six is below every current guideline, and a
 *    design that asks for six is telling people six is enough. This asks for
 *    eight and imposes no composition rules — no forced symbol, no forced
 *    digit — which is what the standard actually says.
 *
 * Everything else is theirs: the fields, their order, the two steps, the
 * subscription summary, the billing sentence, the guarantee.
 */

const NOT_CONNECTED =
  'This form is a design. There is no server behind this site yet, so nothing you type is sent, stored or logged anywhere.';

export const AUTH = {
  login: {
    eyebrow: 'Members',
    headline: 'Welcome back.',
    lead: 'Sign in to your dashboard, your listings and the training.',

    form: {
      panelTitle: 'Log in',
      email: { label: 'Email', placeholder: 'you@example.com' },
      password: { label: 'Password', placeholder: 'Your password' },
      /* The reveal's label says what pressing it does next, which is what a
         screen reader announces. */
      reveal: { show: 'Show password', hide: 'Hide password' },
      submit: 'Log in',
      forgot: 'Forgot your password?',
      /* Their own foot, their own words. */
      switchPrompt: 'Don’t have an account?',
      switchCta: { label: 'Sign up', href: '/register' },
      notConnected: NOT_CONNECTED,
    },

    /* What is beside the form. A returning member does not need selling to,
       so this is orientation rather than an argument: the three things they
       came back for, named the way the site names them everywhere else. */
    aside: {
      headline: 'Everything you left running.',
      items: [
        { icon: 'magnifier', tone: 'blue', label: 'Product Hunter, Competitor Research' },
        { icon: 'robot', tone: 'gold', label: 'The AI lister and your drafts' },
        { icon: 'graduationCap', tone: 'green', label: 'Dropship Mastery, where you got to' },
      ],
      support: 'Locked out? Support answers 24/7, and a person reads it.',
    },
  },

  register: {
    eyebrow: 'Create your account',
    /* What replaces their income claim. Both halves are already true and
       already on this site: the price and the guarantee are in the pricing
       deck, and "cancel whenever you like" is their own sentence. */
    headline: 'Start today. Leave within 30 days and pay nothing.',
    lead: 'One account for the software and the course. The first month is $97, and the guarantee is the whole month — not a trial period.',

    steps: [
      { label: 'Create account', note: 'Your details' },
      { label: 'Payment', note: 'Card and billing' },
    ],

    form: {
      panelTitle: 'Your details',
      email: { label: 'Email address', placeholder: 'you@example.com' },
      confirmEmail: { label: 'Confirm email address', placeholder: 'The same address again' },
      password: { label: 'Password', placeholder: 'At least 8 characters' },
      /* Theirs says six. See this file's header. */
      passwordHint: 'At least 8 characters. Length beats symbols — a phrase is fine.',
      reveal: { show: 'Show password', hide: 'Hide password' },
      consent: {
        before: 'I agree to EcomSniper’s ',
        terms: { label: 'Terms & Conditions', href: '/terms-and-conditions' },
        between: ' and ',
        privacy: { label: 'Privacy Policy', href: '/privacy-policy' },
        after: '.',
      },
      submit: 'Continue to payment',
      switchPrompt: 'Already a member?',
      switchCta: { label: 'Log in', href: '/login' },
      notConnected: NOT_CONNECTED,
      /* Where their step two would begin. Saying it plainly is the whole
         reason this page is allowed to exist under the scope line. */
      stepTwoNote:
        'Payment is step two, and it is not built here — checkout is outside this rebuild.',
    },

    errors: {
      email: 'Enter an email address, including the @.',
      confirmEmail: 'The two email addresses do not match.',
      password: 'Use at least 8 characters.',
      consent: 'Tick the box to agree to the terms and the privacy policy.',
    },

    /* Their subscription panel, their words and their figures. */
    summary: {
      title: 'Your subscription',
      plan: 'Dropship Mastery & EcomSniper AI',
      items: [
        'List 3,000 products a month',
        'AI-generated titles, descriptions and item specifics',
        'Your own store brand or watermark on items',
        'The full training, updated as the platform changes',
      ],
      dueLabel: 'Total due today',
      dueValue: '$97',
      dueCurrency: 'USD',
      guarantee: '30-day money-back guarantee, on the monthly plan.',
      billing:
        'Starting next month you are billed $199 a month for the Sniper Package unless you cancel. You can cancel any time.',
    },
  },
};
