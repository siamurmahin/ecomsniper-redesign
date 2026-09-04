import { TERMS as EN_TERMS } from '../content/en/terms';
import { overlay as germanTerms } from '../content/de/terms';
import { usePageContent } from '../hooks/usePageContent';
import LegalPage from '../pages/LegalPage';
import { metaFor } from '../lib/meta';

/**
 * The terms render through `LegalPage` like the other two documents, but their
 * copy does not travel with them. It is imported here rather than read from the
 * global deck, because the deck is eager: the body measured 20KB of eager JS on
 * every route when it lived there, paid for by every visitor who never opens a
 * contract. Imported from the route, it lands in this route's lazy chunk.
 */

/* Module scope so the hook's memo has a stable dependency. */
const OVERLAYS = { de: germanTerms.TERMS };

export const meta = ({ location }) => metaFor('terms', location.pathname, '/terms-and-conditions');

export default function TermsRoute() {
  const doc = usePageContent(EN_TERMS, OVERLAYS);

  return <LegalPage which="terms" doc={doc} />;
}
