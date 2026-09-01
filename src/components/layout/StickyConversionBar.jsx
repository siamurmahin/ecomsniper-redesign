import { useEffect, useRef, useState } from 'react';
import CtaButton from '../ui/CtaButton';
import Icon from '../ui/Icon';
import { STICKY_CTA } from '../../data/siteContent';

/**
 * Persistent conversion bar.
 *
 * Per the funnel review, the offer has to stay reachable once a visitor is
 * deep in the page: it appears after 25% scroll and hides again over section
 * 14, where a second copy of the same button would only compete with itself.
 */
export default function StickyConversionBar() {
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef(null);

  /*
   * Publish the bar's real height, so whatever sits above it can clear it.
   * The token was a hardcoded 4.25rem and the bar measures 77px on a desktop,
   * more once the copy wraps on a narrow phone — the back to top button was
   * being placed 7px above a bar it is meant to sit clear of, and less than
   * that at any width where the bar grows.
   */
  useEffect(() => {
    const node = barRef.current;
    if (!node) return undefined;

    const publish = ([entry]) => {
      const height = Math.round(entry.contentRect.height);
      if (height > 0) {
        document.documentElement.style.setProperty('--sticky-cta-height', height + 'px');
      }
    };

    /* Once up front: a ResizeObserver only delivers on a rendering
       opportunity, which a background tab never gives it. */
    const first = Math.round(node.getBoundingClientRect().height);
    if (first > 0) {
      document.documentElement.style.setProperty('--sticky-cta-height', first + 'px');
    }

    const observer = new ResizeObserver(publish);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    /*
     * Looked up on every scroll, not once on mount.
     *
     * This used to resolve the element in the effect body and keep it. Every
     * section below the hero is mounted a frame later by DeferUntilPainted, so
     * at the moment this effect runs the element does not exist yet — the
     * lookup returned null, kept null, and the bar simply never hid. It sat
     * over the closing section and, at the very bottom, over the footer.
     *
     * getElementById on an id is cheap and this is already running on scroll.
     *
     * The anchor is section 14, which is the page's close since the final CTA
     * section was removed: it carries the seal, the price and the same signup
     * button, so a floating copy of that button over the top of it is the bar
     * competing with the thing it exists to stand in for.
     */
    const onScroll = () => {
      /* Section 14 where it exists, the footer where it does not.
         /free-playbook has no guarantee section, so the lookup returned null,
         nothing was ever "the close", and the bar sat over that page's own
         footer CTA — two calls to action stacked on top of each other, one of
         them covering the other. */
      const closer = document.getElementById('guarantee') ?? document.querySelector('footer');

      const scrolled = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? scrolled / scrollable : 0;

      // Hide once the real close enters the viewport.
      const closerVisible = closer
        ? closer.getBoundingClientRect().top < window.innerHeight * 0.9
        : false;

      setIsVisible(ratio > STICKY_CTA.showAfterScrollRatio && !closerVisible);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className={`fixed inset-x-0 bottom-0 z-40 transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)] ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
      // Announced only when it actually appears, never as a page-load surprise.
      aria-hidden={!isVisible}
    >
      {/* Full width on a phone, where there is no room to be anything else.
          Above that it docks to the right at its own width: it used to stretch
          the whole shell for one short line and a button, which made a
          thousand pixels of bar to carry about three hundred of content, and
          read as a toolbar rather than as an offer. */}
      <div className="site-shell pb-3 sm:pb-4">
        <div className="relative ms-auto flex w-full items-center justify-between gap-4 overflow-hidden rounded-2xl border border-ink-line bg-ink/95 py-2.5 pe-2.5 ps-4 text-paper shadow-float backdrop-blur-xl sm:w-fit sm:gap-6 sm:ps-5">
          {/* The brand edge, the same mark the plan cards and the dialogs
              carry. It is what makes this the site's own furniture rather
              than a floating advert. */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 start-0 w-[3px] bg-[image:var(--gradient-brand)]"
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{STICKY_CTA.price}</p>

            {/* The risk reversal, not a description of the product. */}
            <p className="mt-0.5 hidden items-center gap-1.5 text-xs text-signal-green-soft sm:flex">
              <Icon name="shield" className="size-3 shrink-0" aria-hidden="true" />
              {STICKY_CTA.message}
            </p>
          </div>

          <CtaButton
            href={STICKY_CTA.cta.href}
            variant="onInk"
            intent="sticky-bar"
            className="shrink-0 !px-6 !py-2.5 text-[0.82rem]"
            tabIndex={isVisible ? 0 : -1}
          >
            {STICKY_CTA.cta.label}
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
