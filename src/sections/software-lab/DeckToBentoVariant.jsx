import { useEffect, useRef } from 'react';
import Icon from '../../components/ui/Icon';
import SectionHeading from '../../components/ui/SectionHeading';
import { FEATURES } from '../../data/siteContent';
// ScrollTrigger is registered in `lib/motion` and reached through the tween's
// own config, so it is deliberately not imported here.
import { gsap, prefersReducedMotion } from '../../lib/motion';
import { toneOf } from '../../lib/signalTones';
import { StepBody, StepNumber } from './parts';

/**
 * Option 4 — the deck that unpacks.
 *
 * The four tiles arrive as a stacked deck and fan out into the bento as the
 * section comes up the screen. You get the stack moment and the readable end
 * state, and unlike option 2 it does not hold the viewport: it plays once on
 * the way in and then the section is an ordinary grid for as long as you look
 * at it.
 *
 * FLIP, not a hand-written path. The tiles are laid out by the grid, then
 * measured, then animated FROM a stacked position INTO where the grid already
 * put them. Animating them to hard-coded coordinates would be a second layout
 * engine that disagrees with CSS the moment the copy or the breakpoint
 * changes.
 *
 * `once: true`, because an entrance that replays every time you scroll past
 * stops being an entrance and becomes a fidget.
 */

const WIDE_QUERY = '(min-width: 1024px)';

/** Wide, narrow / narrow, wide — the same bento as option 3. */
const SPAN = ['lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3'];

export default function DeckToBentoVariant() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const tileRefs = useRef([]);

  useEffect(() => {
    const grid = gridRef.current;
    const tiles = tileRefs.current.filter(Boolean);
    if (!grid || !tiles.length) return undefined;

    const context = gsap.matchMedia();

    context.add({ isWide: WIDE_QUERY, reduced: '(prefers-reduced-motion: reduce)' }, (ctx) => {
      const { isWide, reduced } = ctx.conditions;
      if (!isWide || reduced) return undefined;

      /* Where the grid put each tile, relative to the first. That offset is
         what has to be undone to stack them, and re-applied to deal them out. */
      const base = tiles[0].getBoundingClientRect();

      const tween = gsap.from(tiles, {
        x: (index) => base.left - tiles[index].getBoundingClientRect().left,
        y: (index) => base.top - tiles[index].getBoundingClientRect().top,
        // A deck is not perfectly square: each card sits a little lower and
        // smaller than the one in front.
        scale: (index) => 1 - index * 0.03,
        rotate: (index) => (index - 1.5) * 1.2,
        opacity: (index) => (index === 0 ? 1 : 0.55),
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: grid,
          start: 'top 78%',
          once: true,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => context.revert();
  }, []);

  const isStatic = prefersReducedMotion();

  return (
    <section ref={sectionRef} id="how-it-works" className="section-band bg-paper-sunk">
      <div className="site-shell">
        <SectionHeading
          align="center"
          eyebrow={FEATURES.eyebrow}
          headline={FEATURES.headline}
          lead={FEATURES.lead}
        />

        <ul ref={gridRef} className="mt-14 grid gap-5 lg:grid-cols-5">
          {FEATURES.items.map((item, index) => {
            const tone = toneOf(item.tone);

            return (
              <li
                key={item.n}
                ref={(node) => {
                  tileRefs.current[index] = node;
                }}
                className={`h-full ${SPAN[index]}`}
                style={isStatic ? undefined : { willChange: 'transform, opacity' }}
              >
                <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-white p-7 shadow-lift transition-shadow duration-500 hover:shadow-float sm:p-9">
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-[3px] ${tone.rule}`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-20 -top-20 size-52 rounded-full bg-gradient-to-br to-transparent blur-2xl ${tone.wash}`}
                  />

                  <div className="relative flex gap-5">
                    <StepNumber item={item} size="lg" />
                    <div className="min-w-0 flex-1">
                      <StepBody item={item} />
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        <p className="mt-14 flex items-center justify-center gap-2 text-center font-display text-xl font-extrabold tracking-tight">
          <Icon name="checkCircle" className="size-5 shrink-0 text-signal-green-deep" />
          {FEATURES.closer}
        </p>
      </div>
    </section>
  );
}
