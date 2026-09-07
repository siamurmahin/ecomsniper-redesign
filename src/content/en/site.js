/**
 * Brand, the URLs everything else points at, and the top navigation.
 *
 * Part of the copy deck — see `src/content/index.js`. English is the base;
 * German overlays it key by key from `../de`.
 */

import { DOMAIN } from '../../config/site';

/* Named before SITE so the door below can be built from it. */
/* Ours, since 8 Sep. It was `https://ecomsniper.io/register` — every CTA on
   the site handed the visitor to their live signup, which was right while
   there was no page here to send them to and wrong the moment there was.
   `CtaButton` reads the leading slash and renders a router `Link` in the
   reader's own language, so this one line moves every door on the site.

   **The page it lands on takes no payment and creates no account.** That is
   the trade, and it was made deliberately: see `TODO.md`. */
const SIGNUP_URL = '/register';

export const SITE = {
  name: 'EcomSniper',
  /* From `config/site.js`, which reads it from the environment. It was a
     second copy of the same string, and the copy in the deck is the one
     `lib/meta.js` builds every canonical and hreflang from — so a change to
     the config alone would have moved nothing. */
  domain: DOMAIN,
  /* All three were wrong and dead. app.ecomsniper.io has no DNS at all, and
     discord.gg/ecomsniper is not a server — it answers 200 for any code. */
  signupUrl: SIGNUP_URL,
  loginUrl: '/login',
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

/**
 * The nav maps the site. It used to map the homepage.
 *
 * Until 7 Sep four of its seven entries were hash links into homepage
 * sections — `/#proof`, `/#how-it-works`, `/#training`, `/#founders` — which
 * is what it had to be when the homepage was the only page there was. With
 * fifteen pages built, a nav that mostly scrolls one of them is a table of
 * contents for the wrong document, and the four feature pages were reachable
 * from nothing but a pill in section 07.
 *
 * Every href is now a real route and every one is relative, so
 * `pathForLanguage` prefixes it and a German reader gets `/de/pricing` rather
 * than being dropped back into English.
 *
 * **The three dropped entries are not lost.** Proof, How it works and Training
 * are homepage sections, and the homepage is the logo — one click from
 * anywhere, which is where a reader looks for them. Careers and Affiliate are
 * in the footer, which is where a visitor looks for a company's own business
 * rather than its product.
 *
 * An item with `items` is a group. It renders as a dropdown on desktop and as
 * a labelled block inside the mobile panel, so a phone never hides anything
 * behind a tap it has to discover.
 */
export const NAV_LINKS = [
  {
    label: 'Features',
    /* The four tools, in the order somebody uses them: find the product,
       list it, watch what the competition does, keep the listing right. */
    items: [
      { label: 'Product Hunter', href: '/product-hunter' },
      { label: 'AI Powered Lister', href: '/ai-powered-lister' },
      { label: 'Competitor Research', href: '/competitor-research' },
      { label: 'Price Monitor', href: '/price-monitor' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];
