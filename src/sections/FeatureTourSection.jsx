import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import Icon from '../components/ui/Icon';
import { FEATURES } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { prefersReducedMotion } from '../lib/motion';
import { toneOf } from '../lib/signalTones';

const STEP_INTERVAL = 4600;

/** How far back each card sits behind the one in front. Large enough to
    read as depth rather than as a rendering artefact. */
const OFFSET = { x: 38, y: -30, z: -90, skew: 5 };

/**
 * One step, placed by how far it sits behind the front. `rank` is 0 at the
 * front and counts back, so the stack stays evenly spaced at any step count.
 */
function StepCard({ item, rank, total, isActive }) {
  const tone = toneOf(item.tone);

  const style = {
    // Skew scales with depth so the card in front is upright and readable;
    // a constant skew tilts the one card the visitor is meant to be reading.
    transform: `translate3d(${rank * OFFSET.x}px, ${rank * OFFSET.y}px, ${rank * OFFSET.z}px) skewY(${rank * OFFSET.skew}deg)`,
    zIndex: total - rank,
    opacity: rank > 2 ? 0 : 1,
  };

  return (
    <article
      // Behind the front card the text is skewed and overlapped: present for
      // the effect, not readable. Only the front card is exposed.
      aria-hidden={!isActive}
      style={style}
      className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-ink-line bg-ink p-8 text-paper shadow-float transition-[transform,opacity] duration-[650ms] ease-[var(--ease-out-expo)] sm:p-9"
    >
      {/* The step's colour along the top edge — the one part of the card that
          is visible while it is still behind the front of the stack. */}
      <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 ${tone.rule}`} />

      <span className={`font-label text-xs font-semibold tracking-[0.18em] ${tone.onInk}`}>
        Step {item.n}
      </span>

      <h3 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-[1.7rem]">{item.title}</h3>

      <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-muted-dark">{item.body}</p>

      <p className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${tone.onInk}`}>
        <span aria-hidden="true" className={`size-1.5 rounded-full ${tone.onInkDot}`} />
        {item.metric}
      </p>
    </article>
  );
}

/**
 * 07 — What the software does. Four steps on a stack of cards; it advances on
 * its own so a passive scroller sees all four, and any deliberate interaction
 * ends the autoplay for good.
 *
 * The three things a decorative carousel usually costs are kept: the controls
 * are real buttons, only the front card is exposed to screen readers (with a
 * live region announcing each), and reduced motion renders all four as a plain
 * list — which is also the no-JS rendering.
 *
 * The cards are where the dashboard screenshots go: same geometry, image above
 * the copy.
 */
export default function FeatureTourSection() {
  const sectionRef = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  // Read on the first render: `useRevealOnScroll` collects its targets once
  // on mount, so anything added later keeps the stylesheet's hidden state and
  // never appears.
  const [isStatic] = useState(() => prefersReducedMotion());
  const isPausedRef = useRef(false);

  const items = FEATURES.items;
  const total = items.length;

  useEffect(() => {
    if (isStatic || !isAutoPlaying) return undefined;

    const timer = window.setInterval(() => {
      if (isPausedRef.current) return;
      setActiveIndex((index) => (index + 1) % total);
    }, STEP_INTERVAL);

    return () => window.clearInterval(timer);
  }, [isAutoPlaying, isStatic, total]);

  // Any deliberate move is a decision to drive it manually from then on.
  const goTo = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  // Reads the current index, not the one this render closed over: two clicks
  // in one batch would otherwise resolve to the same step.
  const step = (delta) => {
    setActiveIndex((current) => (current + delta + total) % total);
    setIsAutoPlaying(false);
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-labelledby="features-headline"
      className="section-band bg-paper-sunk"
    >
      <div className="site-shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
          {/* Framing copy */}
          <div>
            <SectionHeading
              eyebrow={FEATURES.eyebrow}
              headline={<span id="features-headline">{FEATURES.headline}</span>}
              lead={FEATURES.lead}
            />

            <p data-reveal data-reveal-group="features" className="mt-9 font-display text-lg font-bold">
              {FEATURES.closer}
            </p>

            {!isStatic && (
              <div data-reveal data-reveal-group="features" className="mt-8 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous step"
                    className="grid size-10 place-items-center rounded-full border border-hairline bg-paper transition-colors duration-300 hover:border-accent/40 hover:bg-accent-wash"
                  >
                    <Icon name="arrowRight" className="size-3.5 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next step"
                    className="grid size-10 place-items-center rounded-full border border-hairline bg-paper transition-colors duration-300 hover:border-accent/40 hover:bg-accent-wash"
                  >
                    <Icon name="arrowRight" className="size-3.5" />
                  </button>
                </div>

                {/* Dots double as the step count and as direct access. */}
                <ul className="flex items-center gap-2">
                  {items.map((item, index) => (
                    <li key={item.n}>
                      <button
                        type="button"
                        onClick={() => goTo(index)}
                        aria-label={`Step ${item.n}: ${item.title}`}
                        aria-current={index === activeIndex}
                        // The active dot wears the step's own colour, so the
                        // control and the card in front agree.
                        className={`h-1.5 rounded-full transition-all duration-400 ${
                          index === activeIndex
                            ? `w-7 ${toneOf(item.tone).dot}`
                            : 'w-3 bg-ink/20 hover:bg-ink/40'
                        }`}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* The stack */}
          {isStatic ? (
            // No motion: every step, plainly, in order.
            <ul className="flex flex-col gap-4">
              {items.map((item) => {
                const tone = toneOf(item.tone);

                return (
                  <li
                    key={item.n}
                    className="relative overflow-hidden rounded-3xl border border-ink-line bg-ink p-7 text-paper"
                  >
                    <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 ${tone.rule}`} />
                    <span className={`font-label text-xs font-semibold tracking-[0.18em] ${tone.onInk}`}>
                      Step {item.n}
                    </span>
                    <h3 className="mt-3 text-xl font-extrabold tracking-tight">{item.title}</h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-dark">{item.body}</p>
                    <p className={`mt-4 text-sm font-semibold ${tone.onInk}`}>{item.metric}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div
              data-reveal
              data-reveal-group="features-panel"
              role="group"
              aria-roledescription="carousel"
              aria-label="What the software does"
              onMouseEnter={() => {
                isPausedRef.current = true;
              }}
              onMouseLeave={() => {
                isPausedRef.current = false;
              }}
              onFocusCapture={() => {
                isPausedRef.current = true;
              }}
              onBlurCapture={() => {
                isPausedRef.current = false;
              }}
              className="relative h-[24rem] [perspective:1100px] sm:h-[25rem]"
            >
              {/* Announced to screen readers as the stack turns. */}
              <p aria-live="polite" className="sr-only">
                {`Step ${items[activeIndex].n} of ${total}: ${items[activeIndex].title}`}
              </p>

              <div className="absolute inset-0 [transform-style:preserve-3d]">
                {items.map((item, index) => (
                  <StepCard
                    key={item.n}
                    item={item}
                    // Distance from the front of the stack, wrapping around.
                    rank={(index - activeIndex + total) % total}
                    total={total}
                    isActive={index === activeIndex}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
