import { useLayoutEffect, useRef } from 'react';
import Icon from '../ui/Icon';
import { gsap, prefersReducedMotion } from '../../lib/motion';
import { loadScrollTrigger } from '../../lib/scrollMotion';
import { toneOf } from '../../lib/signalTones';

/**
 * "Things we will not do", as a stack of cards dealt out by scrolling.
 *
 * Follows their page, which pins a stage and slides each promise up over the
 * last one. Four separate commitments read as four objects; a bulleted list
 * lets the eye slide off all of them at once.
 *
 * **The whole thing is progressive enhancement.** Without JavaScript, with
 * reduced motion, or before ScrollTrigger arrives, the cards render as a
 * normal stacked list and every word is readable — the pinning is layered on
 * afterwards and removed cleanly by the GSAP context. That matters here more
 * than usual: this section is the page's argument, not decoration.
 *
 * Cost: one pinned ScrollTrigger and one timeline, built only when the section
 * comes near. GSAP and ScrollTrigger are already on the page for every other
 * section, so this adds no dependency and no eager bytes.
 */
export default function BoundaryStack({ items }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    /* Reduced motion keeps the list, drops the choreography. The cards are
       already legible stacked; there is nothing to reveal. */
    if (prefersReducedMotion()) return undefined;

    let ctx = null;
    let cancelled = false;

    /* Built on approach rather than on mount, like every other section here:
       creating a pinned trigger measures the document, and doing that for a
       section three screens down is work spent before it can be seen. */
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        loadScrollTrigger().then((ScrollTrigger) => {
          if (cancelled || !rootRef.current) return;

          ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('[data-boundary-card]', rootRef.current);
            if (cards.length < 2) return;

            /* Card 0 sits where it is; the rest arrive over it. Each starts
               below the fold of the stage and settles slightly scaled down,
               so the pile reads as depth rather than as a jump cut. */
            gsap.set(cards.slice(1), { yPercent: 110 });

            const timeline = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: rootRef.current,
                start: 'top top+=96',
                /* One viewport of scroll per card after the first. */
                end: () => `+=${(cards.length - 1) * window.innerHeight * 0.8}`,
                pin: true,
                pinSpacing: true,
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            });

            cards.forEach((card, index) => {
              if (index === 0) return;
              timeline
                .to(card, { yPercent: 0 }, index - 1)
                .to(
                  cards[index - 1],
                  { scale: 0.965, opacity: 0.55, transformOrigin: 'center top' },
                  index - 1,
                );
            });

            ScrollTrigger.refresh();
          }, rootRef);
        });
      },
      { rootMargin: '600px 0px' },
    );

    observer.observe(root);

    return () => {
      cancelled = true;
      observer.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="relative mt-12">
      <div className="relative grid gap-5">
        {items.map((item, index) => {
          const tone = toneOf(item.tone);

          return (
            <article
              key={item.lead}
              data-boundary-card
              className="relative isolate overflow-hidden rounded-2xl border border-hairline bg-paper p-6 shadow-lift sm:p-8"
            >
              {/* Their coloured rule along the card's top edge. */}
              <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 ${tone.rule}`} />

              {/* Their oversized ghost number, sitting behind the text. */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute -top-3 right-4 font-display text-[5.5rem] font-extrabold leading-none tabular-nums opacity-[0.09] sm:text-[7rem] ${tone.text}`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <span
                className={`relative grid size-10 place-items-center rounded-xl ${tone.tile}`}
                aria-hidden="true"
              >
                <Icon name={item.icon} className="size-5" />
              </span>

              <p className="relative mt-5 max-w-2xl text-[length:var(--text-lead)] leading-relaxed">
                <strong className="font-semibold">{item.lead}</strong>{' '}
                <span className="text-muted">{item.body}</span>
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
