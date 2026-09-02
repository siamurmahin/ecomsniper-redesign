import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import SmoothScrollProvider from './components/layout/SmoothScrollProvider';
import SiteHeader from './components/layout/SiteHeader';
import SiteFooter from './components/layout/SiteFooter';
import StickyConversionBar from './components/layout/StickyConversionBar';
import ExitIntentOffer from './components/layout/ExitIntentOffer';
import ConsultOffer from './components/layout/ConsultOffer';
import BackToTop from './components/layout/BackToTop';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import FaqPage from './pages/FaqPage';
import PlaybookPage from './pages/PlaybookPage';
import NotFoundPage from './pages/NotFoundPage';
import DesignLabPage from './pages/DesignLabPage';
import { ScrollTrigger } from './lib/motion';
import { dismissPreloader } from './lib/preloader';
import { getLenis, scrollToTarget } from './lib/smoothScroll';

/**
 * Restores scroll position on navigation and honours in-page hash targets.
 *
 * Scrolling is routed through the shared helper so Lenis owns the movement;
 * a native smooth scroll here would run against Lenis and the page would drift.
 * ScrollTrigger is refreshed after the new route paints, otherwise triggers
 * registered by the outgoing page leave stale measurements behind.
 */
function RouteScrollManager() {
  const { pathname, hash } = useLocation();

  /* The browser's own scroll restoration fights the reset below: it puts the
     previous position back after a navigation, asynchronously, which on a
     phone is the difference between landing at the top and landing wherever
     the last page happened to be. This app decides where a route lands. */
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    /*
     * Where a new route lands.
     *
     * Two things make this harder than it looks.
     *
     * No page has its content when this runs. Every section below the hero is
     * mounted a frame late by DeferUntilPainted, so the document is briefly
     * only as tall as its hero: a hash target does not exist yet, and the
     * sections above one that does are still arriving, so its offset is about
     * to change. Worse, the short document means the browser clamps the
     * inherited scroll position to that small height — and then the rest of
     * the page mounts underneath a position nobody reset. Coming from the foot
     * of the homepage, that is how the playbook page opened at its footer.
     *
     * And Lenis is not always there. SmoothScrollProvider skips it for coarse
     * pointers and reduced motion, so on a phone getLenis() is null for the
     * life of the page. Anything that waits for Lenis waits forever there,
     * which is exactly what the previous version of this did.
     *
     * So: settle first, then move, and treat Lenis as optional throughout.
     */
    let frame = 0;
    const startedAt = performance.now();
    let lastHeight = -1;
    let stableFrames = 0;

    /* Two frames at the same document height. One is not enough — a frame
       between two mounts reads as stable and is not. */
    const settled = () => {
      const height = document.documentElement.scrollHeight;
      stableFrames = height === lastHeight ? stableFrames + 1 : 0;
      lastHeight = height;
      return stableFrames >= 2;
    };

    const land = () => {
      const lenis = getLenis();
      const isSettled = settled();
      const timedOut = performance.now() - startedAt > 1500;

      if (hash) {
        const target = document.querySelector(hash);

        if (target && (isSettled || timedOut)) {
          lenis?.resize();
          /* Eased where Lenis drives it, immediate otherwise: the native
             fallback would be a browser smooth-scroll racing this one. */
          scrollToTarget(target, { immediate: !lenis });
          return;
        }

        if (!timedOut) {
          frame = requestAnimationFrame(land);
          return;
        }

        // A hash naming nothing. Fall through to the top.
      }

      lenis?.resize();
      scrollToTarget(0, { immediate: true });

      /* Keep resetting until the page stops growing. Without Lenis the browser
         owns the scroll position, and it restores its own idea of it as the
         deferred sections arrive — one reset lands before that happens and is
         quietly undone. */
      if (!isSettled && !timedOut) {
        frame = requestAnimationFrame(land);
      }
    };

    /* Immediately as well, so the inherited position is never painted even
       once while the first frame is waited for. */
    if (!hash) scrollToTarget(0, { immediate: true });

    frame = requestAnimationFrame(land);

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

/**
 * Uncovers the page once the first route has actually painted.
 *
 * Two frames, not one: a `requestAnimationFrame` callback runs BEFORE the
 * paint it was scheduled against, so dismissing there would pull the cover off
 * a frame early and show the blank moment it exists to hide. The second frame
 * runs after pixels are on screen.
 */
function PreloaderRelease() {
  useEffect(() => {
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(dismissPreloader);
    });

    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, []);

  return null;
}

export default function App() {
  return (
    <SmoothScrollProvider>
      <PreloaderRelease />
      <RouteScrollManager />

      {/* Skip link: first thing in the tab order on every page. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/free-play-book" element={<PlaybookPage />} />
          {/* The live site's URL for the same page. A 301 in netlify.toml and
              public/_redirects handles it at the edge; this covers local dev and
              any host that ignores those files. */}
          <Route path="/free-playbook" element={<Navigate to="/free-play-book" replace />} />
          {/* Internal comparison route; remove with the page once a direction is picked. */}
          <Route path="/design-lab" element={<DesignLabPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <SiteFooter />

      {/* Conversion furniture, shared across every route. */}
      <StickyConversionBar />
      <BackToTop />
      <ConsultOffer />
      <ExitIntentOffer />
    </SmoothScrollProvider>
  );
}
