import { useEffect } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/motion';
import { loadScrollTrigger } from '../../lib/scrollMotion';
import { registerLenis, unregisterLenis, scrollToTarget } from '../../lib/smoothScroll';

/**
 * Drives page scrolling through Lenis and keeps ScrollTrigger in sync. Skipped
 * for reduced motion and coarse pointers, where native momentum already feels
 * better. Anchor clicks are intercepted so a native smooth scroll cannot run
 * alongside Lenis and fight it for the position.
 */
export default function SmoothScrollProvider({ children }) {
  /*
   * Lenis and ScrollTrigger are fetched rather than bundled with the first
   * screen: 64KB of scrolling machinery that had to be parsed before the hero
   * could be drawn, for a page nobody has scrolled yet. Until they arrive the
   * browser scrolls the page itself, which is what a visitor gets on a phone
   * or under reduced motion anyway.
   */
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion() || isTouch) return undefined;

    let lenis = null;
    let tick = null;
    let cancelled = false;

    Promise.all([import('lenis'), loadScrollTrigger()]).then(
      ([{ default: Lenis }, ScrollTrigger]) => {
        if (cancelled) return;

        lenis = new Lenis({
          duration: 1.05,
          // Gentle exponential ease-out: fast to respond, quiet to settle.
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 1.6,
        });

        registerLenis(lenis);

        // ScrollTrigger must read Lenis' virtual position, not window.scrollY.
        lenis.on('scroll', ScrollTrigger.update);

        tick = (time) => lenis.raf(time * 1000); // gsap ticker is in seconds
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        /* It takes over a page the visitor may already have moved. Without this
         Lenis starts from a virtual zero and the page jumps back to the top. */
        lenis.scrollTo(window.scrollY, { immediate: true });
      },
    );

    return () => {
      cancelled = true;
      if (tick) gsap.ticker.remove(tick);
      if (lenis) {
        unregisterLenis();
        lenis.destroy();
      }
    };
  }, []);

  // Same-page anchors ("#faq", "/#training") are routed through Lenis.
  useEffect(() => {
    const onClick = (event) => {
      // Ignore modified clicks — the visitor wants a new tab or a download.
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.button !== 0
      ) {
        return;
      }

      const anchor = event.target.closest?.('a[href*="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      const hashIndex = href.indexOf('#');
      const hash = href.slice(hashIndex);
      const path = href.slice(0, hashIndex);

      // Only handle anchors that point at the page we are already on.
      if (path && path !== '/' && path !== window.location.pathname) return;
      if (path === '/' && window.location.pathname !== '/') return;
      if (hash.length < 2) return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      scrollToTarget(target);
      // Keep the URL shareable without letting the browser jump as well.
      window.history.replaceState(null, '', hash);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return children;
}
