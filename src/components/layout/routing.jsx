import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getScrollTrigger } from '../../lib/scrollMotion';
import { dismissPreloader } from '../../lib/preloader';
import { getLenis, holdLanding, scrollToTarget } from '../../lib/smoothScroll';
import {
  DEFAULT_LANGUAGE,
  languageFromPath,
  pathForLanguage,
  rememberedLanguage,
} from '../../lib/language';

/**
 * The three pieces of behaviour every route shares: where a new route lands,
 * which language a returning visitor gets, and when the preloader comes off.
 *
 * They were in `App.jsx`, which the router's framework mode replaced with
 * `root.jsx`. Nothing about them changed in the move except the router import
 * — v8 exports from `react-router` rather than `react-router-dom`.
 */

/**
 * Restores scroll position on navigation and honours in-page hash targets.
 *
 * Scrolling is routed through the shared helper so Lenis owns the movement;
 * a native smooth scroll here would run against Lenis and the page would drift.
 * ScrollTrigger is refreshed after the new route paints, otherwise triggers
 * registered by the outgoing page leave stale measurements behind.
 */
/**
 * Sends a returning visitor back to the language they chose.
 *
 * Only on an unprefixed URL, and only once per page load: someone who is
 * already on /de needs nothing, and someone who has just switched to English
 * has "en" stored, so nothing happens to them either. Without this, a German
 * reader who bookmarks the homepage lands in English every time.
 *
 * replace, not push, so the back button still leaves the site rather than
 * bouncing between the two languages.
 */
export function LanguageMemory() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    // An explicit language in the URL always wins over a remembered one.
    if (languageFromPath(pathname) !== DEFAULT_LANGUAGE) return;

    const saved = rememberedLanguage();
    if (!saved || saved === DEFAULT_LANGUAGE) return;

    navigate(`${pathForLanguage(pathname, saved)}${hash}`, { replace: true });
  }, [pathname, hash, navigate]);

  return null;
}

export function RouteScrollManager() {
  const { pathname, hash } = useLocation();

  /* The browser puts the old position back after a navigation, asynchronously.
     This app decides where a route lands, so turn that off. */
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    /*
     * Where a new route lands.
     *
     * No page has its content yet when this runs — DeferUntilPainted mounts
     * everything below the hero a frame late — so a hash target may not exist,
     * and the short document makes the browser clamp the inherited scroll
     * position. That is how the playbook page opened at its own footer.
     *
     * And Lenis is absent on touch and reduced motion, so nothing here may
     * wait for it. Settle first, then move, and treat Lenis as optional.
     */
    let frame = 0;
    const startedAt = performance.now();
    let lastHeight = -1;
    let stableFrames = 0;

    /* Held from here rather than from the scroll itself: the settle loop below
       measures the document while it waits, and it has to be measuring the
       real thing. See `holdLanding`. */
    if (hash) holdLanding();

    /*
     * The visitor wins.
     *
     * The reset below runs until the page stops growing, and on a slow
     * connection that is up to a second and a half after the first screen is
     * readable — during which someone who scrolled was put back at the top,
     * once per frame. Measured on Slow 3G: a scroll to 404px was undone 36ms
     * later. A gesture ends it; a programmatic scroll is not a gesture, so
     * this listens for the input rather than for the movement.
     */
    let moved = false;
    const yieldToVisitor = () => {
      moved = true;
    };
    const gestures = ['wheel', 'touchstart', 'keydown'];
    gestures.forEach((type) => window.addEventListener(type, yieldToVisitor, { passive: true }));

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

      // Somewhere else is where they want to be, and they said so.
      if (moved) return;

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

    return () => {
      cancelAnimationFrame(frame);
      gestures.forEach((type) => window.removeEventListener(type, yieldToVisitor));
    };
  }, [pathname, hash]);

  /*
   * Re-measure once the new page has stopped growing, not one frame in.
   *
   * A single frame lands before DeferUntilPainted has mounted anything below
   * the hero, so every trigger was measured against a page a fraction of its
   * final height. On a language switch that is the whole route remounting, so
   * the miss is the entire page rather than a section or two.
   */
  useEffect(() => {
    let frame = 0;
    const startedAt = performance.now();
    let lastHeight = -1;
    let stable = 0;

    const tick = () => {
      const height = document.documentElement.scrollHeight;
      stable = height === lastHeight ? stable + 1 : 0;
      lastHeight = height;

      if (stable >= 2 || performance.now() - startedAt > 1500) {
        getScrollTrigger()?.refresh();
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
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
export function PreloaderRelease() {
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
