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
  route('careers', 'routes/careers.jsx'),
  route('careers/:slug', 'routes/job.jsx'),
  route('blog', 'routes/blog.jsx'),
  route('blog/:slug', 'routes/blog-post.jsx'),
  route('affiliate', 'routes/affiliate.jsx'),
  route('affiliate/terms', 'routes/affiliate-terms.jsx'),
  route('product-hunter', 'routes/product-hunter.jsx'),
  route('ai-powered-lister', 'routes/ai-powered-lister.jsx'),
  route('competitor-research', 'routes/competitor-research.jsx'),
  route('price-monitor', 'routes/price-monitor.jsx'),
  route('about', 'routes/about.jsx'),
  route('login', 'routes/login.jsx'),
  route('register', 'routes/register.jsx'),

  route('course/dropship-mastery', 'routes/course.jsx'),
  route('contact', 'routes/contact.jsx'),
  route('terms-and-conditions', 'routes/terms.jsx'),
  route('privacy-policy', 'routes/privacy.jsx'),
  route('cookie-policy', 'routes/cookies.jsx'),
  route('sitemap', 'routes/sitemap.jsx'),

  route('de', 'routes/home.jsx', { id: 'de-home' }),
  route('de/pricing', 'routes/pricing.jsx', { id: 'de-pricing' }),
  route('de/faq', 'routes/faq.jsx', { id: 'de-faq' }),
  route('de/free-play-book', 'routes/playbook.jsx', { id: 'de-playbook' }),
  route('de/careers', 'routes/careers.jsx', { id: 'de-careers' }),
  route('de/careers/:slug', 'routes/job.jsx', { id: 'de-job' }),
  route('de/blog', 'routes/blog.jsx', { id: 'de-blog' }),
  route('de/blog/:slug', 'routes/blog-post.jsx', { id: 'de-blog-post' }),
  route('de/affiliate', 'routes/affiliate.jsx', { id: 'de-affiliate' }),
  route('de/affiliate/terms', 'routes/affiliate-terms.jsx', { id: 'de-affiliate-terms' }),
  route('de/product-hunter', 'routes/product-hunter.jsx', { id: 'de-product-hunter' }),
  route('de/ai-powered-lister', 'routes/ai-powered-lister.jsx', { id: 'de-ai-lister' }),
  route('de/competitor-research', 'routes/competitor-research.jsx', {
    id: 'de-competitor-research',
  }),
  route('de/price-monitor', 'routes/price-monitor.jsx', { id: 'de-price-monitor' }),
  route('de/about', 'routes/about.jsx', { id: 'de-about' }),
  route('de/login', 'routes/login.jsx', { id: 'de-login' }),
  route('de/register', 'routes/register.jsx', { id: 'de-register' }),
  route('de/course/dropship-mastery', 'routes/course.jsx', { id: 'de-course' }),
  route('de/contact', 'routes/contact.jsx', { id: 'de-contact' }),
  route('de/terms-and-conditions', 'routes/terms.jsx', { id: 'de-terms' }),
  route('de/privacy-policy', 'routes/privacy.jsx', { id: 'de-privacy' }),
  route('de/cookie-policy', 'routes/cookies.jsx', { id: 'de-cookies' }),
  route('de/sitemap', 'routes/sitemap.jsx', { id: 'de-sitemap' }),

  route('*', 'routes/not-found.jsx'),
];
