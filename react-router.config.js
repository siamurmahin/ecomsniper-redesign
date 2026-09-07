/**
 * Static HTML per route, built ahead of time.
 *
 * `ssr: false` means there is no server: the router renders each path below at
 * build time and writes it as a real HTML file, and the client takes over from
 * there. That is what Netlify serves, and what a crawler or a link preview
 * reads without running a line of JavaScript.
 *
 * Before this, `index.html` was an empty `<div id="root">` for every URL, so
 * every route shared the homepage's title and description in any tool that
 * does not execute scripts — which is all of them except Google.
 *
 * The list is the routes worth having in an index. Both languages, because
 * both are indexed separately and point at each other with hreflang.
 *
 * `/404` and `/de/404` are the exception: they are not pages anyone links to,
 * they are the document the host serves under a 404 status for a URL that does
 * not exist. Both match the splat route in `routes.js`, so each renders the
 * not-found page in its own language, with the noindex tags in the HTML rather
 * than written in after the fact. Without them the host has nothing to serve
 * but the homepage. See the redirects in `netlify.toml`.
 */
/*
 * The job adverts are read from the content deck rather than listed here.
 * A role owns its slug; a second list of the same slugs is one edit away from
 * disagreeing with the first, and the copy that goes stale is always the one
 * nobody looks at. Adding a role to `content/en/careers.js` prerenders its
 * page in both languages.
 */
import { ROLE_SLUGS } from './src/content/en/careers.js';
import { POST_SLUGS } from './src/content/en/blog.js';

/** Every blog post, in both languages. */
const postRoutes = [
  ...POST_SLUGS.map((slug) => `/blog/${slug}`),
  ...POST_SLUGS.map((slug) => `/de/blog/${slug}`),
];

/** Every job advert, in both languages. */
const jobRoutes = [
  ...ROLE_SLUGS.map((slug) => `/careers/${slug}`),
  ...ROLE_SLUGS.map((slug) => `/de/careers/${slug}`),
];
export default {
  appDirectory: 'src',
  ssr: false,
  prerender: [
    '/',
    '/pricing',
    '/faq',
    '/free-play-book',
    '/blog',
    '/careers',
    '/affiliate',
    '/affiliate/terms',
    '/product-hunter',
    '/ai-powered-lister',
    '/competitor-research',
    '/price-monitor',
    '/about',
    '/login',
    '/register',
    '/course/dropship-mastery',
    '/contact',
    '/terms-and-conditions',
    '/privacy-policy',
    '/cookie-policy',
    '/sitemap',
    '/404',
    '/de',
    '/de/pricing',
    '/de/faq',
    '/de/free-play-book',
    '/de/blog',
    '/de/careers',
    '/de/affiliate',
    '/de/affiliate/terms',
    '/de/product-hunter',
    '/de/ai-powered-lister',
    '/de/competitor-research',
    '/de/price-monitor',
    '/de/about',
    '/de/login',
    '/de/register',
    '/de/course/dropship-mastery',
    '/de/contact',
    '/de/terms-and-conditions',
    '/de/privacy-policy',
    '/de/cookie-policy',
    '/de/sitemap',
    '/de/404',
    ...jobRoutes,
    ...postRoutes,
  ],
};
