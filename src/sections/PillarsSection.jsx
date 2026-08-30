import SectionHeading from '../components/ui/SectionHeading';
import Icon from '../components/ui/Icon';
import SpotlightCard from '../components/reactbits/SpotlightCard';
import { PILLARS } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { toneOf } from '../lib/signalTones';

/**
 * 06 — Three things, one system.
 *
 * The page's table of contents: three cards, each an anchor into the section
 * that expands it, scannable in about four seconds.
 *
 * THE WIRE IS THE POINT. This was three white rectangles in a row, and the
 * headline above them claims they are one system — the layout was arguing
 * against the copy. The icon tiles now sit as nodes on a wire that runs the
 * width of the row with a current travelling along it, so "one system" is
 * something a reader sees before they read a word of it.
 *
 * The wire is drawn behind the cards and only from `md`, where the three sit
 * across. Stacked on a phone there is nothing to run between: a vertical wire
 * through a column of cards would be a decoration pretending to be a diagram.
 *
 * All of it is CSS on `transform` and `opacity`, so it composites and cannot
 * stutter behind whatever else the page is doing — the same reason the hero's
 * entrance was moved off the main thread.
 */
export default function PillarsSection() {
  const sectionRef = useRevealOnScroll();

  return (
    <section
      ref={sectionRef}
      id="the-system"
      aria-labelledby="pillars-headline"
      className="section-band"
    >
      <div className="site-shell">
        <SectionHeading
          eyebrow={PILLARS.eyebrow}
          align="center"
          headline={
            <span id="pillars-headline">
              {PILLARS.headline} <span className="headline-mark">{PILLARS.headlineMark}</span>
              {PILLARS.headlineTail}
            </span>
          }
          lead={PILLARS.lead}
        />

        <div className="relative mt-14">
          {/* The wire. Threaded through the centre of the icon tiles so they
              read as things ON it rather than near it: the card's `sm:p-8` is
              32px and the tile is `size-11`, so half of it is 22px — 54px, or
              3.375rem. Measured, not guessed; 3.75rem put it 6px low and the
              tiles floated off the line.

              Padding is `p-7` below `sm`, which would move this — but the wire
              is `md` and up, where it is always `p-8`.

              Inset a sixth at each end, which is half a card, so it starts and
              stops under the outer tiles instead of running into the margin. */}
          <div
            aria-hidden="true"
            className="system-wire left-[16.66%] right-[16.66%] top-[3.375rem] hidden h-px rounded-full bg-hairline md:block"
          />

          <ul className="grid gap-4 md:grid-cols-3">
            {PILLARS.items.map((item, index) => {
              const tone = toneOf(item.tone);

              return (
                <li
                  key={item.n}
                  data-reveal
                  data-reveal-group="pillars"
                  className="relative h-full"
                >
                  <SpotlightCard className="h-full rounded-3xl" spotlightColor={tone.spotlight}>
                    <a
                      href={item.anchor}
                      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-white p-7 shadow-lift transition-[transform,border-color,box-shadow] duration-400 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-ink/25 hover:shadow-float sm:p-8"
                    >
                      {/* The pillar's colour, always on rather than only under
                          the pointer. Three cards that are identical until you
                          touch them are three identical cards. */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 top-0 h-[3px] ${tone.rule}`}
                      />

                      {/* Corner wash in the pillar's colour: a tint, not a fill. */}
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-gradient-to-br to-transparent blur-2xl ${tone.wash}`}
                      />

                      <span className="relative flex items-center justify-between">
                        <span className="relative grid place-items-center">
                          {/* The halo pulses in time with the current on the
                              wire, so a node reads as something the current
                              passes through. Staggered by a third of the cycle
                              each, so it travels left to right rather than all
                              three breathing together. */}
                          <span
                            aria-hidden="true"
                            className={`system-node-halo absolute size-11 rounded-xl ${tone.rule}`}
                            style={{ animationDelay: `${index * 1.4}s` }}
                          />
                          <span
                            className={`relative grid size-11 place-items-center rounded-xl transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 ${tone.tile}`}
                          >
                            <Icon name={item.icon} className="size-5" />
                          </span>
                        </span>

                        {/* Solid, not a dashed outline. At 9px in a dashed ring
                            the number was the least legible thing on a card
                            whose whole job is to be scanned. */}
                        <span
                          className={`grid size-9 place-items-center rounded-full font-label text-[0.68rem] font-bold tracking-[0.08em] ${tone.tile}`}
                        >
                          {item.n}
                        </span>
                      </span>

                      <h3 className="relative mt-6 text-xl font-extrabold tracking-tight sm:text-2xl">
                        {item.title}
                      </h3>

                      <p className="relative mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                        {item.body}
                      </p>

                      <span
                        className={`relative mt-7 inline-flex items-center gap-1.5 text-sm font-semibold ${tone.text}`}
                      >
                        See how
                        <Icon
                          name="arrowRight"
                          className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>

                      {/* Edge rule: 0 → full width on hover, keyboard included. */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none ${tone.rule}`}
                      />
                    </a>
                  </SpotlightCard>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
