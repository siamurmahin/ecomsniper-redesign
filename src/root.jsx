import { Links, Meta, Outlet, Scripts, useLocation } from 'react-router';
import { Suspense, lazy } from 'react';
import SmoothScrollProvider from './components/layout/SmoothScrollProvider';
import SiteHeader from './components/layout/SiteHeader';
import { useContent } from './hooks/useContent';
import { languageFromPath } from './lib/language';
import { LanguageMemory, PreloaderRelease, RouteScrollManager } from './components/layout/routing';
import { PRELOADER_MARKUP, PRELOADER_STYLES, PRELOADER_BACKSTOP } from './lib/preloaderShell';
import { CONSENT_MODE_BOOTSTRAP } from './consent/consentMode';
import ConsentBanner from './consent/ConsentBanner';
import './styles/index.css';

/* The footer and the conversion furniture. None of it is on the first screen
   and all of it used to mount in the commit that drew one. */
const SiteChrome = lazy(() => import('./components/layout/SiteChrome'));

/**
 * The document.
 *
 * This was `index.html`. Under the router's framework mode the document is
 * rendered from here, which is what lets each route ship its own `<title>` and
 * description in the HTML rather than writing them from JavaScript after the
 * page has already been fetched, read and thrown away by a crawler.
 *
 * `<Meta />` and `<Links />` are where each route's `meta` and `links` exports
 * land. The static tags below are the ones that never change per route.
 */
export function Layout({ children }) {
  /*
   * The URL decides the language, so the document says which one it is in.
   *
   * Hardcoded to "en" this told every /de page's reader — a screen reader
   * picking a voice, a browser offering to translate, a search engine deciding
   * who to show it to — that German copy was English. `language.js` has said
   * "the lang attribute is real" since the switcher was built; it stopped
   * being real when this document moved out of `index.html`.
   *
   * From `useLocation` rather than a route export, because it has to be right
   * for the not-found page too, which has no language of its own — /de/nope is
   * German because of where it is.
   */
  const { pathname } = useLocation();

  return (
    /*
     * `suppressHydrationWarning` is for one attribute and one only: the
     * `js-motion` class that `entry.client.jsx` puts on this element before
     * hydration runs. It has to go on before, because the reveal animations
     * are keyed off it, and it has to be added by script, because a visitor
     * without JavaScript must never get the CSS that hides `[data-reveal]`
     * elements. So the server cannot render it and the client always has it,
     * which React reports as a mismatch on every page load. Intended
     * behaviour, and the warning was drowning real ones.
     *
     * Attributes on this element only. It does not reach head, body, or
     * anything below them.
     */
    <html lang={languageFromPath(pathname)} suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#fbfbfa" />
        <meta name="author" content="EcomSniper" />

        <Meta />
        <Links />

        {/* Renders before the bundle's stylesheet exists, so every value in it
            is literal — see `preloaderShell`. */}
        <style dangerouslySetInnerHTML={{ __html: PRELOADER_STYLES }} />
      </head>

      <body>
        <div
          id="preloader"
          role="status"
          aria-label="Loading EcomSniper"
          dangerouslySetInnerHTML={{ __html: PRELOADER_MARKUP }}
        />
        <script dangerouslySetInnerHTML={{ __html: PRELOADER_BACKSTOP }} />

        {children}

        {/* Consent Mode v2 defaults — every signal denied before anything
            can read them. Inline and before <Scripts /> because a tag that
            fires ahead of this fired without consent, and no later update
            takes that back. See `consent/consentMode`. */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_MODE_BOOTSTRAP }} />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Everything every route shares: the scroll behaviour, the header, the footer
 * and the conversion furniture. The route itself renders into `<Outlet />`.
 */
export default function Root() {
  const { SITE } = useContent();

  return (
    <SmoothScrollProvider>
      <PreloaderRelease />
      <LanguageMemory />
      <RouteScrollManager />

      {/* Skip link: first thing in the tab order on every page. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
      >
        {SITE.skipLabel}
      </a>

      <SiteHeader />

      <main id="main-content">
        <Outlet />
      </main>

      {/* Eager, unlike everything in `SiteChrome`. It renders null until it
          has read the stored decision, so it costs the first screen a few
          hundred bytes and no markup — and unlike a lazy chunk it is
          guaranteed to be there when hydration runs. It was in SiteChrome
          for one build and only worked on a warm cache. */}
      <ConsentBanner />

      {/* Nothing here is on screen when the page paints, so none of it is in
          the bundle the first screen waits for — see `SiteChrome`. */}
      <Suspense fallback={null}>
        <SiteChrome />
      </Suspense>
    </SmoothScrollProvider>
  );
}
