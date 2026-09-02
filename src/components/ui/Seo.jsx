import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useContent } from '../../hooks/useContent';
import { LANGUAGES, languageFromPath, pathForLanguage } from '../../lib/language';

/** Creates or updates a single <meta>/<link> tag, keyed by attribute. */
function upsertTag(tagName, keyAttr, keyValue, valueAttr, value) {
  if (!value) return;
  const selector = `${tagName}[${keyAttr}="${keyValue}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(tagName);
    el.setAttribute(keyAttr, keyValue);
    document.head.appendChild(el);
  }
  el.setAttribute(valueAttr, value);
}

/**
 * Per-route document metadata. index.html carries the defaults for crawlers
 * that do not execute JS; this overrides them per route for the ones that do.
 *
 * @param {object} props
 * @param {string} props.title Full <title> for the route.
 * @param {string} props.description Meta description, ~155 characters.
 * @param {string} props.path Route path, used to build the canonical URL.
 * @param {object|object[]} [props.schema] JSON-LD injected for this route.
 * @param {boolean} [props.noindex] Keep the route out of search results.
 */
export default function Seo({ title, description, path = '/', schema, noindex = false }) {
  const { SITE } = useContent();
  const { pathname } = useLocation();
  const language = languageFromPath(pathname);

  useEffect(() => {
    /* The canonical follows the language, so /de/pricing does not declare
       itself a duplicate of /pricing. `path` is the plain route; the prefix
       comes from where we actually are. */
    const canonical = `${SITE.domain}${pathForLanguage(path, language)}`;

    document.title = title;

    upsertTag('meta', 'name', 'description', 'content', description);
    upsertTag('meta', 'name', 'robots', 'content', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

    upsertTag('meta', 'property', 'og:title', 'content', title);
    upsertTag('meta', 'property', 'og:description', 'content', description);
    upsertTag('meta', 'property', 'og:url', 'content', canonical);
    upsertTag('meta', 'name', 'twitter:title', 'content', title);
    upsertTag('meta', 'name', 'twitter:description', 'content', description);

    // Canonical link
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);

    /* One alternate per language, plus x-default. This is how a search engine
       is told the pages are the same content in different languages rather
       than two pages competing for the same terms. */
    for (const item of LANGUAGES) {
      upsertTag(
        'link',
        'hreflang',
        item.code,
        'href',
        `${SITE.domain}${pathForLanguage(path, item.code)}`
      );
      document.head.querySelector(`link[hreflang="${item.code}"]`)?.setAttribute('rel', 'alternate');
    }

    upsertTag('link', 'hreflang', 'x-default', 'href', `${SITE.domain}${pathForLanguage(path, 'en')}`);
    document.head.querySelector('link[hreflang="x-default"]')?.setAttribute('rel', 'alternate');

    upsertTag('meta', 'property', 'og:locale', 'content', language === 'de' ? 'de_DE' : 'en_US');
  }, [title, description, path, noindex, language]);

  useEffect(() => {
    if (!schema) return undefined;

    // Route-owned JSON-LD is tagged so it can be removed on unmount without
    // touching the organisation schema hard-coded in index.html.
    const node = document.createElement('script');
    node.type = 'application/ld+json';
    node.dataset.seoRoute = 'true';
    node.textContent = JSON.stringify(schema);
    document.head.appendChild(node);

    return () => node.remove();
  }, [schema]);

  return null;
}
