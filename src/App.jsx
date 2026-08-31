import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import SmoothScrollProvider from './components/layout/SmoothScrollProvider';
import SiteHeader from './components/layout/SiteHeader';
import SiteFooter from './components/layout/SiteFooter';
import StickyConversionBar from './components/layout/StickyConversionBar';
import ExitIntentOffer from './components/layout/ExitIntentOffer';
import BackToTop from './components/layout/BackToTop';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import PlaybookPage from './pages/PlaybookPage';
import NotFoundPage from './pages/NotFoundPage';
import DesignLabPage from './pages/DesignLabPage';
import FoundersLabPage from './pages/FoundersLabPage';
import { ScrollTrigger } from './lib/motion';
import { dismissPreloader } from './lib/preloader';
import { scrollToTarget } from './lib/smoothScroll';

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

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        scrollToTarget(target);
        return;
      }
    }
    // New route: land at the top without an animation across the whole page.
    scrollToTarget(0, { immediate: true });
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
          <Route path="/free-playbook" element={<PlaybookPage />} />
          {/* Internal comparison routes; remove with the pages once a direction is picked. */}
          <Route path="/design-lab" element={<DesignLabPage />} />
          <Route path="/founders-lab" element={<FoundersLabPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <SiteFooter />

      {/* Conversion furniture, shared across every route. */}
      <StickyConversionBar />
      <BackToTop />
      <ExitIntentOffer />
    </SmoothScrollProvider>
  );
}
