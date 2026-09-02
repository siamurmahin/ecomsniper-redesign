import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LANGUAGES,
  languageFromPath,
  pathForLanguage,
  rememberLanguage,
} from '../lib/language';

/**
 * The current language, and a way to switch it.
 *
 * Read from the URL rather than held in state: the address is what a visitor
 * can share, and two copies of the same fact drift.
 */
export function useLanguage() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  const code = languageFromPath(pathname);
  const current = LANGUAGES.find((language) => language.code === code) ?? LANGUAGES[0];

  // Screen readers and search engines both read this; it must follow the URL.
  useEffect(() => {
    document.documentElement.lang = code;
  }, [code]);

  const switchTo = useCallback(
    (next) => {
      if (next === code) return;
      rememberLanguage(next);
      // Same page, other language — keep the hash so a section stays put.
      navigate(`${pathForLanguage(pathname, next)}${hash}`);
    },
    [code, hash, navigate, pathname]
  );

  return { code, current, languages: LANGUAGES, switchTo };
}
