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
export default {
  appDirectory: 'src',
  ssr: false,
  prerender: [
    '/',
    '/pricing',
    '/faq',
    '/free-play-book',
    '/about',
    '/careers',
    '/privacy-policy',
    '/cookie-policy',
    '/404',
    '/de',
    '/de/pricing',
    '/de/faq',
    '/de/free-play-book',
    '/de/about',
    '/de/careers',
    '/de/privacy-policy',
    '/de/cookie-policy',
    '/de/404',
  ],
};
