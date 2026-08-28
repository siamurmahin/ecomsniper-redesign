import { useEffect } from 'react';
import { SITE } from '../../data/siteContent';

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
  useEffect(() => {
    const canonical = `${SITE.domain}${path}`;

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
  }, [title, description, path, noindex]);

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
