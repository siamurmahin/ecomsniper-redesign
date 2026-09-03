/**
 * The footer: its columns, its links and its small print.
 *
 * Part of the copy deck — see `src/content/index.js`. English is the base;
 * German overlays it key by key from `../de`.
 */

import { SITE } from './site';

/* This rebuild ships /, /pricing and /free-playbook. The other footer paths
   exist on the current production site — point them there or add the routes
   before this replaces it, or they land on the 404 page. */
export const FOOTER = {
  tagline: 'Software, training and community for eBay sellers.',

  /* Checked against what exists. Eight of these used to point at routes this
     app does not have, so three whole columns were 404s — they go to the live
     site now, at its own slugs. Note it answers 200 for any path, so a link
     checker proves nothing; these came from their markup. */
  columns: [
    {
      title: 'Product',
      links: [
        { label: 'How it works', href: '/#how-it-works' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Dropship Mastery', href: '/#training' },
        { label: 'Free playbook', href: '/free-play-book' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: 'https://ecomsniper.io/about' },
        { label: 'Blog', href: 'https://ecomsniper.io/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Affiliate', href: '/affiliate' },
        { label: 'Contact', href: 'https://ecomsniper.io/contact' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'FAQ', href: '/faq' },
        { label: 'The guarantee', href: '/#guarantee' },
        { label: 'Join the Discord', href: SITE.discordUrl },
        { label: 'Log in', href: SITE.loginUrl },
      ],
    },
    {
      title: 'Legal',
      /* Privacy and cookies are this app's own routes now, prerendered in
         both languages. Terms still points at the live site, which answers
         200 for any path — it is on the list, not fixed. */
      links: [
        { label: 'Terms and conditions', href: 'https://ecomsniper.io/terms-and-conditions' },
        { label: 'Privacy policy', href: '/privacy-policy' },
        { label: 'Cookie policy', href: '/cookie-policy' },
        { label: 'Reviews', href: SITE.trustpilotUrl },
      ],
    },
  ],

  /* Their own contact block, which this footer did not carry at all. A page
     that asks for $97 and states no phone number, no email and no address is
     asking to be taken on faith. Every value is off their live footer. */
  contact: {
    title: 'Contact',
    phone: { label: '1 (800) 994-9831', href: 'tel:+18009949831' },
    email: { label: 'management@ecomsniper.io', href: 'mailto:management@ecomsniper.io' },
    location: 'Toronto, Ontario, Canada',
  },

  /* Telegram was left out while their own footer link pointed at /pricing —
     it still does. The real group address came from the client. */
  social: {
    title: 'Join our community',
    links: [
      { label: 'Discord', href: SITE.discordUrl, icon: 'discord' },
      { label: 'Telegram', href: SITE.telegramUrl, icon: 'telegram' },
      { label: 'YouTube', href: 'https://www.youtube.com/@sammyecomsniper', icon: 'youtube' },
      {
        label: 'Facebook',
        href: 'https://www.facebook.com/profile.php?id=61558534291940',
        icon: 'facebook',
      },
    ],
  },

  /* The second door. It lived at the foot of section 15 until that section
     was cut, and it is the only offer on the site that costs nothing — worth
     more than the blank space it would otherwise leave here. Copy is the
     deleted section's, unchanged. */
  secondDoor: {
    title: 'Not ready yet?',
    body: 'Take the free playbook and read it first. No card, no pressure.',
    cta: { label: 'Get the free playbook', href: '/free-play-book' },
  },

  reviewsCta: 'Read the reviews on Trustpilot',

  disclaimer:
    'EcomSniper is not affiliated with, endorsed by, or sponsored by eBay Inc. or Amazon.com, Inc. Results shown are from individual members and are not typical. Your results depend on the time you put in, your market, and factors outside anyone’s control.',
};
