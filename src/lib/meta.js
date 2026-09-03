import { contentFor } from '../content';
import { LANGUAGES, languageFromPath, pathForLanguage } from './language';

/**
 * What a route tells search engines, social scrapers and the browser tab.
 *
 * This was `Seo.jsx`, which wrote these tags from a `useEffect` after the page
 * had loaded. That works for Google, which runs JavaScript, and for nobody
 * else: Facebook, WhatsApp, LinkedIn and X never do, so every route shared
 * whatever `index.html` happened to say — the homepage's title and
 * description on the pricing page, the FAQ and the playbook alike.
 *
 * A route's `meta` export is rendered into the HTML at build time instead, so
 * the tags are in the document before anything runs.
 *
 * @param {string} key A key in the deck's `SEO` — home, pricing, faq…
 * @param {string} pathname Where we are, which decides the language.
 * @param {string} route The route's own path, unprefixed, for the canonical.
 * @param {object|object[]} [schema] JSON-LD for this route.
 * @returns {Array} React Router meta descriptors.
 */
export function metaFor(key, pathname, route, schema) {
  const language = languageFromPath(pathname);
  const { SEO, SITE } = contentFor(language);
  const { title, description } = SEO[key];

  /* The canonical follows the language, so /de/pricing does not declare itself
     a duplicate of /pricing. */
  const canonical = `${SITE.domain}${pathForLanguage(route, language)}`;
  const image = `${SITE.domain}/og-image.png`;

  const tags = [
    { title },
    { name: 'description', content: description },
    { name: 'robots', content: 'index, follow, max-image-preview:large' },
    { tagName: 'link', rel: 'canonical', href: canonical },

    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'EcomSniper' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonical },
    { property: 'og:image', content: image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ];

  /*
   * Every language of this page, pointed at from every other, plus x-default
   * for a reader whose own language is neither. Without these two pages
   * carrying the same argument in two languages compete with each other.
   */
  for (const { code } of LANGUAGES) {
    tags.push({
      tagName: 'link',
      rel: 'alternate',
      hrefLang: code,
      href: `${SITE.domain}${pathForLanguage(route, code)}`,
    });
  }
  tags.push({
    tagName: 'link',
    rel: 'alternate',
    hrefLang: 'x-default',
    href: `${SITE.domain}${route}`,
  });

  if (schema) {
    for (const entry of Array.isArray(schema) ? schema : [schema]) {
      tags.push({ 'script:ld+json': entry });
    }
  }

  return tags;
}

/** The same, for a page that must stay out of search results. */
export function noindexMetaFor(key, pathname) {
  const language = languageFromPath(pathname);
  const { SEO } = contentFor(language);

  return [
    { title: SEO[key].title },
    { name: 'description', content: SEO[key].description },
    { name: 'robots', content: 'noindex, nofollow' },
  ];
}
