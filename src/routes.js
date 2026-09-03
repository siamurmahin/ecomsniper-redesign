import { index, route } from '@react-router/dev/routes';

/**
 * Every page, twice: once plain, once under /de.
 *
 * Written out rather than generated from a language list, because each one
 * needs an id the router can tell apart — two routes rendering the same module
 * are still two routes — and because this file is the list of what gets
 * prerendered. Seeing the URLs is the point.
 *
 * Anything the German deck has not translated falls through to English, so a
 * /de route is never blank. See `src/content/index.js`.
 *
 * `/free-playbook` is not here: it is a 301 in `netlify.toml`, which is where
 * a permanent redirect belongs — the browser learns it once instead of
 * loading an app to be told.
 */
export default [
  index('routes/home.jsx'),
  route('pricing', 'routes/pricing.jsx'),
  route('faq', 'routes/faq.jsx'),
  route('free-play-book', 'routes/playbook.jsx'),
  route('about', 'routes/about.jsx'),
  route('careers', 'routes/careers.jsx'),
  route('affiliate', 'routes/affiliate.jsx'),
  route('privacy-policy', 'routes/privacy.jsx'),
  route('cookie-policy', 'routes/cookies.jsx'),

  route('de', 'routes/home.jsx', { id: 'de-home' }),
  route('de/pricing', 'routes/pricing.jsx', { id: 'de-pricing' }),
  route('de/faq', 'routes/faq.jsx', { id: 'de-faq' }),
  route('de/free-play-book', 'routes/playbook.jsx', { id: 'de-playbook' }),
  route('de/about', 'routes/about.jsx', { id: 'de-about' }),
  route('de/careers', 'routes/careers.jsx', { id: 'de-careers' }),
  route('de/affiliate', 'routes/affiliate.jsx', { id: 'de-affiliate' }),
  route('de/privacy-policy', 'routes/privacy.jsx', { id: 'de-privacy' }),
  route('de/cookie-policy', 'routes/cookies.jsx', { id: 'de-cookies' }),

  route('*', 'routes/not-found.jsx'),
];
