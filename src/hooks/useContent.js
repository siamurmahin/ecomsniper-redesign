import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { contentFor } from '../content';
import { languageFromPath } from '../lib/language';

/**
 * The copy deck in the language of the current URL.
 *
 * Sections call this instead of importing from the deck directly. The
 * shape is identical, so a section changes by one line:
 *
 *   import { HERO } from '../content/en/home/hero';  ->  const { HERO } = useContent();
 */
export function useContent() {
  const { pathname } = useLocation();
  const language = languageFromPath(pathname);

  return useMemo(() => contentFor(language), [language]);
}
