import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/motion';
import { registerLenis, unregisterLenis, scrollToTarget } from '../../lib/smoothScroll';

/**
 * Drives page scrolling through Lenis and keeps ScrollTrigger in sync. Skipped
 * for reduced motion and coarse pointers, where native momentum already feels
 * better. Anchor clicks are intercepted so a native smooth scroll cannot run
 * alongside Lenis and fight it for the position.
 */
export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion() || isTouch) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      // Gentle exponential ease-out: fast to respond, quiet to settle.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    registerLenis(lenis);

    // ScrollTrigger must read Lenis' virtual position, not window.scrollY.
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000); // gsap ticker is in seconds
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      unregisterLenis();
      lenis.destroy();
    };
  }, []);

  // Same-page anchors ("#faq", "/#training") are routed through Lenis.
  useEffect(() => {
    const onClick = (event) => {
      // Ignore modified clicks — the visitor wants a new tab or a download.
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
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
