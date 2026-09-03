import FaqPage from '../pages/FaqPage';
import { contentFor } from '../content';
import { languageFromPath } from '../lib/language';
import { metaFor } from '../lib/meta';

/** The questions, as structured data, from the deck the page renders. */
function schemaFor(language) {
  const { FAQ } = contentFor(language);

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export const meta = ({ location }) =>
  metaFor('faq', location.pathname, '/faq', schemaFor(languageFromPath(location.pathname)));

export default FaqPage;
