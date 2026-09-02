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

  useEffect(() => {
    /*
     * Where a new route lands.
     *
     * The hard part is that no page has its content yet when this runs. Every
     * section below the hero is mounted a frame late by DeferUntilPainted, so
     * at this moment the document is only as tall as its hero and the section
     * a hash points at does not exist.
     *
     * That broke both directions. Without a hash, Lenis measured the short
     * document, clamped the position to it, and the rest of the page then
     * appeared underneath a position that was never reset — arriving from the
     * foot of the homepage put the reader at the bottom of the page they had
     * just opened. With a hash, querySelector found nothing and the code fell
     * through to "scroll to the top", which is why /#proof from /pricing
     * landed on the homepage hero rather than the proof section.
     *
     * Both wait for the page to exist instead of assuming it does, and each
     * attempt re-measures first, because a stale document height is what made
     * the first one wrong.
     */
    let frame = 0;

    if (hash) {
      /* Wait for the section, then go. The position is left alone while
         waiting: jumping to the top first and then to the section would show
         the hero for a frame on the way past. Capped so a hash naming nothing
         settles at the top rather than spinning. */
      const startedAt = performance.now();
      let lastHeight = -1;
      let stableFrames = 0;

      const findTarget = () => {
        const target = document.querySelector(hash);
        const lenis = getLenis();
        const height = document.documentElement.scrollHeight;

        /* Existing is not enough: the sections ABOVE the target are mounting
           too, so an element found on the first frame is sitting at an offset
           that is about to change. Scrolling to it then lands somewhere that
           promptly moves. Wait until the document stops growing as well. */
        stableFrames = height === lastHeight ? stableFrames + 1 : 0;
        lastHeight = height;

        /* Lenis has to exist first. Scrolling before it starts moves the
           page natively, and Lenis then begins from its own stored position —
           zero — and snaps straight back. Same desync the shared helper's
           comment warns about, arrived at from the other end. */
        if (target && lenis && stableFrames >= 2) {
          lenis.resize();
          /* Eased, not immediate. A cross-page hash is the same gesture as an
             in-page one — the reader asked for a section, not for a different
             page — so it travels the way every other jump on this site does.
             It reads as the page arriving at the right place rather than
             flickering through the hero on the way. */
          scrollToTarget(target);
          return;
        }

        if (performance.now() - startedAt < 1500) {
          frame = requestAnimationFrame(findTarget);
          return;
        }

        /* Out of time. Go where we can rather than leaving them at the top of
           a page they did not ask for. */
        if (target) {
          lenis?.resize();
          scrollToTarget(target, { immediate: true });
          return;
        }

        scrollToTarget(0, { immediate: true });
      };

      frame = requestAnimationFrame(findTarget);
      return () => cancelAnimationFrame(frame);
    }

    /* No hash: top, immediately so the old position is never shown, and once
       more after a frame when the real height is known. Exactly twice — any
       longer and it would fight a reader who scrolls the moment they land. */
    scrollToTarget(0, { immediate: true });

    frame = requestAnimationFrame(() => {
      getLenis()?.resize();
      scrollToTarget(0, { immediate: true });
    });

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
