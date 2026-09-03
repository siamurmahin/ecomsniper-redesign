/**
 * Brand, the URLs everything else points at, and the top navigation.
 *
 * Part of the copy deck — see `src/content/index.js`. English is the base;
 * German overlays it key by key from `../de`.
 */

/* Named before SITE so the door below can be built from it. */
const SIGNUP_URL = 'https://ecomsniper.io/register';

export const SITE = {
  name: 'EcomSniper',
  domain: 'https://ecomsniper.io',
  /* All three were wrong and dead. app.ecomsniper.io has no DNS at all, and
     discord.gg/ecomsniper is not a server — it answers 200 for any code. */
  signupUrl: SIGNUP_URL,
  loginUrl: 'https://ecomsniper.io/login',
  discordUrl: 'https://discord.gg/DGkSJ5QZww',
  telegramUrl: 'https://t.me/ecomsniper',
  trustpilotUrl: 'https://uk.trustpilot.com/review/ecomsniper.io',

  /* One copy of the guarantee. "On the monthly plan" matters: the credits
     bundle and Enterprise are final sale, so the short version contradicts them. */
  guarantee: '30 day money back guarantee on the monthly plan',

  /* One signup door. Six sections used to carry their own copy of it. */
  startCta: { label: 'Start your eBay business', href: SIGNUP_URL },
  priceFrom: 'From $97 for your first month',

  /* Said wherever we ask for an email, so it exists once. */
  privacyNote: 'Your information is 100% secure and will never be shared.',
  /* Chrome the layout writes rather than a section: the header buttons and
     the skip link. In the deck so they translate too. */
  loginLabel: 'Log in',
  headerCta: 'Start for $97',
  skipLabel: 'Skip to content',

  /* The four things a member gets, in the order they reach them. Section 14
     and the /pricing header both read this list. */
  /* The icon belongs to the line, not to its position — tone is positional,
     the mark is not. */
  promises: [
    { text: 'The training teaches', icon: 'graduationCap' },
    { text: 'The software lifts', icon: 'robot' },
    { text: 'The community catches', icon: 'people' },
    { text: 'The guarantee protects', icon: 'shield' },
  ],
};

/* The nav maps this page, not the site. About points at our founders
   section; Contact goes to the live site, as the footer already does. */
export const NAV_LINKS = [
  /* In the order the page actually runs, measured not assumed. The routes
     and the outside link come last, because they leave the page. */
  { label: 'Proof', href: '/#proof' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Training', href: '/#training' },
  { label: 'About', href: '/#founders' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: 'https://ecomsniper.io/contact' },
];
