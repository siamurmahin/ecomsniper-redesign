import PricingPage from '../pages/PricingPage';
import { contentFor } from '../content';
import { languageFromPath } from '../lib/language';
import { metaFor } from '../lib/meta';

/**
 * The plans, as structured data.
 *
 * Built from the same deck the page renders, so a price can never be one thing
 * in the markup and another in the rich result.
 */
function schemaFor(language) {
  const { PRICING } = contentFor(language);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'EcomSniper',
    description: 'eBay dropshipping software, training and community.',
    brand: { '@type': 'Brand', name: 'EcomSniper' },
    offers: PRICING.plans.map((plan) => ({
      '@type': 'Offer',
      name: plan.name,
      price: plan.priceLabel.replace(/[$,]/g, ''),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    })),
  };
}

export const meta = ({ location }) =>
  metaFor('pricing', location.pathname, '/pricing', schemaFor(languageFromPath(location.pathname)));

export default PricingPage;
