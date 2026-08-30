import { useEffect, useRef } from 'react';
import Icon from '../../components/ui/Icon';
import SectionHeading from '../../components/ui/SectionHeading';
import { FEATURES } from '../../data/siteContent';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/motion';
import { toneOf } from '../../lib/signalTones';
import { StepBody, StepNumber } from './parts';

/**
 * Option 2 — scroll stack.
 *
 * The four steps sit as a deck in the middle of a pinned section. Scrolling
 * pushes the front card down and away while the one behind rises into its
 * place. This is the device the live site uses on its own system section,
 * where the three cards were measured running at opacity 0.86 / 0.55 / 0.06
 * with their heights shrinking behind the front one.
 *
 * THE COST IS SCROLL. A pin holds the viewport still for its whole run, so
 * this ADDS length rather than saving it — about a screen per card, four
 * cards, so roughly four screens to show what the stepper shows in one. That
 * is not a reason to reject it, but it should be chosen knowing it.
 *
 * Pin only above `lg` and never under reduced motion: below that the deck
 * becomes an ordinary stacked list, because a stack that cannot be scrolled
 * through is just four cards on top of each other.
 */

const WIDE_QUERY = '(min-width: 1024px)';

/** Scroll distance per card, as a fraction of the viewport height. */
const SCREENS_PER_CARD = 0.85;

export default function ScrollStackVariant() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!section || !cards.length) return undefined;

    const context = gsap.matchMedia();

    context.add({ isWide: WIDE_QUERY, reduced: '(prefers-reduced-motion: reduce)' }, (ctx) => {
      const { isWide, reduced } = ctx.conditions;
      if (!isWide || reduced) return undefined;

      const steps = cards.length - 1;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${steps * window.innerHeight * SCREENS_PER_CARD}`,
        pin: true,
        anticipatePin: 1,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const travelled = self.progress * steps;

          cards.forEach((card, index) => {
            /* How far this card is from the front of the deck. Negative once
               it has been dealt away. */
            const distance = index - travelled;

            if (distance <= -1) {
              // Gone: pushed down and faded out.
              gsap.set(card, { yPercent: 24, scale: 0.9, opacity: 0, zIndex: index });
              return;
            }

            const behind = Math.max(distance, 0);
            gsap.set(card, {
              // Cards behind sit lower and smaller, so the deck reads as depth.
              yPercent: behind * 7 + Math.min(distance, 0) * 24,
              scale: 1 - behind * 0.05,
              opacity: distance < 0 ? 1 + distance : 1 - behind * 0.35,
              zIndex: cards.length - index,
            });
          });
        },
      });

      return () => trigger.kill();
    });

    return () => context.revert();
  }, []);

  const isStatic = prefersReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative bg-paper-sunk py-16 sm:py-20 lg:h-svh lg:py-0"
    >
      <div className="site-shell lg:flex lg:h-full lg:flex-col lg:justify-center">
        <SectionHeading
          align="center"
          eyebrow={FEATURES.eyebrow}
          headline={FEATURES.headline}
          lead={FEATURES.lead}
        />

        {/* The deck. Above lg the cards are stacked absolutely and GSAP moves
            them; below it they are an ordinary column. */}
        <div className="relative mx-auto mt-12 w-full max-w-3xl lg:mt-14 lg:h-[22rem]">
          {FEATURES.items.map((item, index) => {
            const tone = toneOf(item.tone);

            return (
              <article
                key={item.n}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className={`overflow-hidden rounded-[1.75rem] border border-hairline bg-white shadow-float lg:absolute lg:inset-x-0 lg:top-0 ${
                  index > 0 ? 'mt-5 lg:mt-0' : ''
                }`}
                style={isStatic ? undefined : { willChange: 'transform, opacity' }}
              >
                <span aria-hidden="true" className={`block h-1.5 w-full ${tone.rule}`} />

                <div className="flex gap-6 p-7 sm:p-9">
                  <StepNumber item={item} size="lg" />
                  <div className="min-w-0 flex-1">
                    <StepBody item={item} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-14 flex items-center justify-center gap-2 text-center font-display text-xl font-extrabold tracking-tight">
          <Icon name="checkCircle" className="size-5 shrink-0 text-signal-green-deep" />
          {FEATURES.closer}
        </p>
      </div>
    </section>
  );
}
