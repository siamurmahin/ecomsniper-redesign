import { useEffect, useRef, useState } from 'react';
import Icon from '../../components/ui/Icon';
import SectionHeading from '../../components/ui/SectionHeading';
import { FEATURES } from '../../data/siteContent';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import { toneOf } from '../../lib/signalTones';
import { StepBody, StepNumber } from './parts';

/**
 * Option 1 — sticky stepper.
 *
 * The steps scroll on the left against a spine that fills as each one is
 * passed; a sticky panel on the right shows whichever step you are level with.
 *
 * No pin. That is the point of choosing it: a pinned stack has to hold the
 * viewport still for its whole run, so it ADDS scroll rather than saving it —
 * measured at about a screen per card when the same device was tried on
 * section 04. This costs exactly the height of its own content.
 *
 * The active step is decided by an IntersectionObserver with a band across the
 * middle of the screen, not by a scroll handler doing arithmetic on every
 * frame. The browser is better at that than we are and it costs nothing on the
 * main thread.
 */
export default function StickyStepperVariant() {
  const sectionRef = useRevealOnScroll();
  const stepRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean);
    if (!nodes.length) return undefined;

    /* A band across the middle third: a step becomes current when it reaches
       the middle of the screen, which is where a reader's eye actually is —
       not when its top edge clips the bottom of the viewport. */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = nodes.indexOf(entry.target);
          if (index >= 0) setActiveIndex(index);
        });
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const active = FEATURES.items[activeIndex];
  const activeTone = toneOf(active.tone);

  return (
    <section ref={sectionRef} id="how-it-works" className="section-band bg-paper-sunk">
      <div className="site-shell">
        <SectionHeading
          align="center"
          eyebrow={FEATURES.eyebrow}
          headline={FEATURES.headline}
          lead={FEATURES.lead}
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          {/* The steps, and the spine they hang off. */}
          <ol className="relative">
            {/* The spine's unfilled length. */}
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-5 top-6 w-px bg-hairline"
            />
            {/* The filled part, to the step you are level with. Height is a
                transition rather than a scroll-linked tween: it only changes
                four times, and a scrubbed tween would run every frame to sit
                still most of them. */}
            <span
              aria-hidden="true"
              className={`absolute left-5 top-6 w-px origin-top transition-[height] duration-700 ease-[var(--ease-out-expo)] ${activeTone.rule}`}
              style={{
                height: `calc((100% - 3rem) * ${activeIndex / (FEATURES.items.length - 1)})`,
              }}
            />

            {FEATURES.items.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <li
                  key={item.n}
                  ref={(node) => {
                    stepRefs.current[index] = node;
                  }}
                  className="relative flex gap-6 pb-14 last:pb-0"
                >
                  <span
                    className={`relative z-10 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-45'}`}
                  >
                    <StepNumber item={item} />
                  </span>

                  <div
                    className={`min-w-0 flex-1 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-55'}`}
                  >
                    <StepBody item={item} />
                  </div>
                </li>
              );
            })}
          </ol>

          {/* The panel. Sticky rather than pinned — the page keeps scrolling
              normally and this simply stays put inside its own column. */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="overflow-hidden rounded-[1.75rem] border border-hairline bg-white shadow-lift">
                <span aria-hidden="true" className={`block h-1.5 w-full ${activeTone.rule}`} />

                <div className="p-8">
                  <div className="flex items-center gap-4">
                    <StepNumber item={active} size="lg" />
                    <span className="micro-label text-muted">
                      Step {active.n} of {FEATURES.items.length}
                    </span>
                  </div>

                  {/* Keyed so the swap reads as a change rather than as text
                      quietly replacing itself. */}
                  <div
                    key={active.n}
                    className="mt-6 animate-[panel-in_0.5s_var(--ease-out-expo)_both]"
                  >
                    <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight">
                      {active.title}
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{active.body}</p>
                  </div>

                  <div className="mt-8 flex items-center gap-2">
                    {FEATURES.items.map((item, index) => (
                      <span
                        key={item.n}
                        aria-hidden="true"
                        className={`h-1 rounded-full transition-all duration-500 ease-[var(--ease-out-expo)] ${
                          index === activeIndex
                            ? `w-8 ${toneOf(item.tone).rule}`
                            : 'w-2 bg-hairline'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-16 flex items-center justify-center gap-2 text-center font-display text-xl font-extrabold tracking-tight">
          <Icon name="checkCircle" className="size-5 shrink-0 text-signal-green-deep" />
          {FEATURES.closer}
        </p>
      </div>
    </section>
  );
}
