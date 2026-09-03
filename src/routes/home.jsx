import HomePage from '../pages/HomePage';
import { contentFor } from '../content';
import { languageFromPath } from '../lib/language';
import { metaFor } from '../lib/meta';

/**
 * The homepage's structured data, built from the copy the page renders.
 *
 * No `offers` on the Product: the plans moved to /pricing, and structured data
 * must not state prices the page does not show. /pricing carries them.
 */
function schemaFor(language) {
  const { FAQ } = contentFor(language);

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'EcomSniper',
      description:
        'eBay dropshipping automation software with training and a private community. Finds products, bulk lists them, and monitors price and stock 24/7.',
      brand: { '@type': 'Brand', name: 'EcomSniper' },
    },
  ];
}

export const meta = ({ location }) =>
  metaFor('home', location.pathname, '/', schemaFor(languageFromPath(location.pathname)));

export default HomePage;
