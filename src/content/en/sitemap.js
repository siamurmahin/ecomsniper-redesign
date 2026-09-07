/**
 * The sitemap a person reads.
 *
 * `sitemap.xml` is for crawlers and is generated from the prerender list.
 * This is the other half: one page that shows what the site is made of, for
 * anyone who would rather see the shape of it than use the nav — and for a
 * crawler arriving on a deep page with one link back to everything else.
 *
 * Page-scoped, so these words land in this route's chunk rather than in the
 * bundle every visitor downloads. See CLAUDE.md → Content.
 *
 * **The blog posts and the job adverts are not listed here.** They are read
 * from `blog.js` and `careers.js` by the page itself, the same two files the
 * prerender list reads, so publishing a post puts it on this page and in
 * `sitemap.xml` without anybody remembering to. A second list of the same
 * slugs is one edit away from disagreeing with the first, and the live site
 * is the standing proof of it: 12 posts published, 9 in the sitemap, no
 * overlap.
 *
 * **Login and registration are deliberately absent.** They are `noindex` and
 * disallowed in `robots.txt`; putting them in a directory of the site would
 * be the third place saying something different about the same two pages.
 */

export const SITEMAP = {
  eyebrow: 'Site directory',
  headline: 'Every page on this site.',
  lead: 'The whole site in one place — the tools, the training, the company and the small print, in English and German.',

  /* One tone per group, in the order the site itself introduces them: the
     software first, then what it teaches, then who is behind it, then the
     paperwork. Red is absent on purpose — on this site it means the thing
     that went wrong. */
  groups: [
    {
      title: 'Start here',
      tone: 'blue',
      icon: 'magnifier',
      links: [
        { label: 'Homepage', href: '/', note: 'What this is, who it is for, what it costs.' },
        { label: 'Product Hunter', href: '/product-hunter', note: 'Find what is already selling.' },
        {
          label: 'AI Powered Lister',
          href: '/ai-powered-lister',
          note: 'Titles, descriptions and specifics, written for you.',
        },
        {
          label: 'Competitor Research',
          href: '/competitor-research',
          note: 'Watch the sellers you are up against.',
        },
        {
          label: 'Price Monitor',
          href: '/price-monitor',
          note: 'Prices and stock, watched while you sleep.',
        },
        { label: 'Pricing', href: '/pricing', note: 'What each plan costs, and what is in it.' },
      ],
    },
    {
      title: 'Learn',
      tone: 'gold',
      icon: 'graduationCap',
      links: [
        {
          label: 'Dropship Mastery',
          href: '/course/dropship-mastery',
          note: 'The course, taught from zero.',
        },
        {
          label: 'The Invisible Store',
          href: '/free-play-book',
          note: 'The free playbook, no payment.',
        },
        { label: 'Blog', href: '/blog', note: 'What is working on eBay right now.' },
      ],
      /* Rendered under the Blog link from the copy deck itself. */
      children: 'posts',
    },
    {
      title: 'The company',
      tone: 'green',
      icon: 'people',
      links: [
        { label: 'About', href: '/about', note: 'Who is behind this, and how it started.' },
        { label: 'Contact', href: '/contact', note: 'A phone number, an address and a person.' },
        { label: 'Careers', href: '/careers', note: 'Open roles, and how to apply.' },
        { label: 'Affiliate programme', href: '/affiliate', note: 'Earn on what you refer.' },
        {
          label: 'Affiliate terms',
          href: '/affiliate/terms',
          note: 'The rules that programme runs on.',
        },
      ],
      children: 'roles',
    },
    {
      title: 'Answers and small print',
      tone: 'blue',
      icon: 'shield',
      links: [
        { label: 'FAQ', href: '/faq', note: 'The questions support answers most.' },
        {
          label: 'Terms and conditions',
          href: '/terms-and-conditions',
          note: 'What you agree to.',
        },
        { label: 'Privacy policy', href: '/privacy-policy', note: 'What is collected, and why.' },
        { label: 'Cookie policy', href: '/cookie-policy', note: 'Every cookie this site can set.' },
      ],
    },
  ],

  /* Counted by the page, not typed here — a total somebody wrote down is the
     first thing to go stale. */
  countLabel: '{n} pages listed, in two languages',

  /* Headings for the two lists the page reads out of the other decks. */
  postsLabel: 'Posts',
  rolesLabel: 'Open roles',

  /* The one link a crawler wants from this page and cannot get from the nav. */
  crawler: {
    text: 'Machines want the other one:',
    cta: { label: 'sitemap.xml', href: '/sitemap.xml' },
  },

  language: {
    text: 'This site is published in English and German. Every page above has a German twin.',
    cta: { label: 'Diese Seite auf Deutsch', href: '/de/sitemap' },
  },
};
