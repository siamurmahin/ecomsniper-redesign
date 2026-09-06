import { useEffect, useRef, useState } from 'react';
import CtaButton from '../ui/CtaButton';

/**
 * The bar that follows a reader down the course page.
 *
 * This page is nearly ten thousand pixels tall and had a door at the top and a
 * door at the foot. Everything between them — the mechanic, the offer, the
 * instructors, the reviews — is where somebody actually decides, and deciding
 * there meant scrolling to one end or the other to act on it.
 *
 * **It carries no urgency.** The price, the guarantee and the button. No
 * timer, no counter, no "3 people are viewing this" — the About page promises
 * the client does not do that, and a bar that nagged would be the fourth thing
 * on this page contradicting it. What it is for is removing a scroll, not
 * manufacturing a deadline.
 *
 * It appears once the hero's own buttons have gone off screen and hides again
 * when the closing section's arrive, so it is only ever on screen when there is
 * no other door in view. Both are watched with one `IntersectionObserver` on
 * the button rows themselves, rather than a scroll listener doing arithmetic
 * every frame.
 *
 * Hidden below `sm`: on a phone it would sit on top of the content it is
 * trying to sell, and the closing section is only ever a thumb-flick away.
 */
export default function StickyEnrol({ copy, heroCtaRef, closeCtaRef }) {
  const [isVisible, setIsVisible] = useState(false);
  const stateRef = useRef({ heroOnScreen: true, closeOnScreen: false });

  useEffect(() => {
    const hero = heroCtaRef.current;
    const close = closeCtaRef.current;
    if (!hero || !close) return undefined;

    /* The two real call-to-action rows are watched, not a 1px sentinel.
       A sentinel was tried and is a trap: a zero-height element can start
       outside the observer's root and then go from not-intersecting straight
       to not-intersecting without ever crossing a threshold, so the callback
       fires once on setup and never again. Watching an element that genuinely
       enters and leaves the viewport cannot fail that way, and "is one of the
       page's own buttons on screen" is the actual question. */
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) stateRef.current.heroOnScreen = entry.isIntersecting;
        if (entry.target === close) stateRef.current.closeOnScreen = entry.isIntersecting;
      }
      setIsVisible(!stateRef.current.heroOnScreen && !stateRef.current.closeOnScreen);
    });

    observer.observe(hero);
    observer.observe(close);
    return () => observer.disconnect();
  }, [heroCtaRef, closeCtaRef]);

  return (
    <div
      /* `hidden` rather than unmounting, so the button is in the prerendered
         document and a crawler or a no-JS visitor still finds the link. */
      hidden={!isVisible}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden justify-center px-6 pb-6 sm:flex"
    >
      <div className="pointer-events-auto flex items-center gap-5 rounded-full border border-hairline bg-paper/95 py-2.5 pr-2.5 pl-6 shadow-float backdrop-blur-xl">
        <span className="min-w-0">
          <span className="block font-display text-sm font-extrabold text-ink">{copy.label}</span>
          <span className="block text-xs text-muted">{copy.price}</span>
        </span>

        <CtaButton href={copy.cta.href}>{copy.cta.label}</CtaButton>
      </div>
    </div>
  );
}
