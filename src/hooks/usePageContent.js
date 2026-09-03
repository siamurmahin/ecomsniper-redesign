import { useMemo } from 'react';
import { useLocation } from 'react-router';
import { merge } from '../content/merge';
import { languageFromPath } from '../lib/language';

/**
 * One page's copy, in the language of the current URL.
 *
 * The companion to `useContent`, and the difference is what ships: that hook
 * reads the site-wide deck, which is eager because the header and footer need
 * it on every route. A page that put its own copy in that deck would make
 * every visitor download it — About's words cost 7KB of eager JS the moment
 * they were re-exported from `content/en/index.js`, paid for on the homepage
 * by someone who never opens About. Twelve more pages would have made that
 * ~80KB.
 *
 * So page copy is imported by its page, lands in that route's lazy chunk, and
 * is merged here with the same overlay rules as the global deck. Site-wide
 * copy still belongs in the deck; only whole-page copy comes through here.
 *
 * @param {object} base The page's English copy.
 * @param {Record<string, object>} [overlays] Language code to overlay.
 */
export function usePageContent(base, overlays) {
  const { pathname } = useLocation();
  const language = languageFromPath(pathname);

  return useMemo(() => merge(base, overlays?.[language]), [base, overlays, language]);
}
