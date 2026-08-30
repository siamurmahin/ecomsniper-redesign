import { useEffect, useRef, useState } from 'react';
import Icon from '../components/ui/Icon';
import SectionHeading from '../components/ui/SectionHeading';
import { FEATURES } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { toneOf } from '../lib/signalTones';

/**
 * 07 — The software, as a sticky stepper.
 *
 * The steps scroll on the left against a spine that fills as each one is
 * passed; a panel on the right sticks and swaps to whichever step you are
 * level with. Chosen from five shapes compared at /software-lab.
 *
 * NO PIN, and that is most of why. The obvious version of this section is a
 * pinned deck that deals cards as you scroll — the device the live site uses
 * on its own system section, and it looks good. But a pin holds the viewport
 * still for its entire run, so it ADDS length: measured across the five
 * options, the pinned stack took 4,401px of page against this one's 2,517px to
 * show the same four steps. Sticky costs exactly its own height.
 *
 * This replaced a rotating card stack on a timer. A stack advancing on its own
 * clock decides for the reader how long each step gets; a stepper hands that
 * back — you are on step 3 because you scrolled to step 3.
 */

/**
 * The named tools, drawn as the live site draws them: dashed accent pills,
 * uppercase and tracked.
 *
 * They leave for the live site's feature pages, which THIS site does not have
 * yet — see the note on `FEATURES.items`. When those pages are rebuilt here,
 * the hrefs in the content file are the only thing to change.
 */
function ToolPills({ links }) {
  if (!links?.length) return null;

  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/pill inline-flex items-center gap-1.5 rounded-full border border-dashed border-accent/60 px-3 py-1.5 font-label text-[0.62rem] font-semibold uppercase tracking-[0.09em] text-accent transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-paper"
          >
            {link.label}
            <Icon
              name="arrowRight"
              className="size-3 transition-transform duration-300 group-hover/pill:translate-x-0.5"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** The number, as a tone tile — the same glyph vocabulary as every other set. */
function StepNumber({ item, size = 'md' }) {
  const tone = toneOf(item.tone);
  const box = size === 'lg' ? 'size-12 text-base' : 'size-10 text-sm';

  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl font-display font-extrabold ${box} ${tone.tile}`}
    >
      {item.n}
    </span>
  );
}

export default function FeatureTourSection() {
  const sectionRef = useRevealOnScroll();
  const stepRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean);
    if (!nodes.length) return undefined;

    /* A band across the middle of the screen: a step becomes current when it
       reaches where a reader is actually looking, not when its top edge clips
       the bottom of the viewport.

       An observer rather than a scroll handler — the browser does this off the
       main thread, and a handler recomputing four rects on every scroll event
       is work this page has already been taught not to spend. */
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
            <span aria-hidden="true" className="absolute bottom-6 left-5 top-6 w-px bg-hairline" />

            {/* The filled length, down to the step you are level with. A height
                transition rather than a scroll-scrubbed tween: it changes four
                times in the whole section, and a scrub would run every frame
                to sit still for most of them. */}
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
                    className={`relative z-10 transition-opacity duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-45'
                    }`}
                  >
                    <StepNumber item={item} />
                  </span>

                  <div
                    className={`min-w-0 flex-1 transition-opacity duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-55'
                    }`}
                  >
                    <h3 className="font-display text-xl font-extrabold leading-tight tracking-tight sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{item.body}</p>

                    <div className="mt-5 inline-flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={`size-1.5 rounded-full ${toneOf(item.tone).dot}`}
                      />
                      <span className={`micro-label ${toneOf(item.tone).text}`}>{item.metric}</span>
                    </div>

                    <ToolPills links={item.links} />
                  </div>
                </li>
              );
            })}
          </ol>

          {/* The panel. Sticky, not pinned — the page scrolls normally and this
              simply stays put inside its own column. Hidden below lg, where
              there is no second column for it to stay put in and the steps are
              already the whole story. */}
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

                  {/* Keyed, so a swap reads as a change rather than as text
                      quietly replacing itself under the reader. */}
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
