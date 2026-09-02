import ReticleMark from '../components/ui/ReticleMark';
import { useEffect, useRef, useState } from 'react';
import CtaButton from '../components/ui/CtaButton';
import Icon from '../components/ui/Icon';
import SectionHeading from '../components/ui/SectionHeading';
import { useContent } from '../hooks/useContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { toneOf } from '../lib/signalTones';

/**
 * 07 — The software, as a sticky stepper. Steps scroll on the left, a panel
 * sticks on the right and swaps to whichever step you are level with.
 *
 * Sticky, not pinned. A pin holds the viewport still for its whole run, so it
 * adds length: 4,401px against 2,517px here for the same four steps.
 */

/**
 * The named tools, as dashed accent pills like the live site draws them.
 * They link out to feature pages this rebuild does not have yet.
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
            /* Taller where it is a thumb doing the pressing: at `py-1.5`
               these measured 29px, which is a small target for a finger.
               They stay compact from `lg`, where a pointer is doing it. */
            className="group/pill inline-flex items-center gap-1.5 rounded-full border border-dashed border-accent/60 px-3.5 py-2.5 font-label text-[0.62rem] font-semibold uppercase tracking-[0.09em] text-accent transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-paper lg:px-3 lg:py-1.5"
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

/**
 * The step number as a tone tile. Never translucent — the spine runs through
 * the middle of these, and a faded tile lets the line show through the number.
 */
function StepNumber({ item, size = 'md', isActive = true }) {
  const tone = toneOf(item.tone);
  const box = size === 'lg' ? 'size-12 text-base' : 'size-10 text-sm';
  const skin = isActive ? tone.tile : 'border border-hairline bg-paper-sunk text-muted';

  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl font-display font-extrabold transition-colors duration-500 ${box} ${skin}`}
    >
      {item.n}
    </span>
  );
}

/**
 * A small mock interface per step, built from DOM and CSS like the live site
 * does. Each shows the step happening rather than illustrating it.
 */
function StepVisual({ item, index }) {
  const tone = toneOf(item.tone);

  // 1 — Product Hunter sweeping a list of candidates.
  if (index === 0) {
    return (
      <div className="step-visual rounded-2xl bg-ink/[0.035] p-4">
        <div className="relative overflow-hidden rounded-xl">
          <ul className="space-y-2">
            {[0, 1, 2, 3].map((row) => (
              <li
                key={row}
                className="flex items-center gap-2.5 rounded-lg bg-white p-2 shadow-sm"
                style={{ animation: `step-row-in 3.2s ease-in-out ${row * 0.18}s infinite` }}
              >
                <span className={`size-7 shrink-0 rounded-md ${tone.tile}`} />
                <span className="flex-1 space-y-1.5">
                  <span className="block h-1.5 w-3/4 rounded-full bg-ink/15" />
                  <span className="block h-1.5 w-1/2 rounded-full bg-ink/10" />
                </span>
                <span className={`micro-label ${tone.text}`}>{[142, 96, 210, 63][row]}</span>
              </li>
            ))}
          </ul>

          {/* The beam. A gradient the height of one row, run down the panel. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-accent/25 to-transparent"
            style={{ animation: 'step-scan 3.2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
          />
        </div>
      </div>
    );
  }

  /* 2 — the listing handed from EcomSniper to eBay.
     The live site draws this as its own mark pointing at eBay, and that is the
     claim: you press once here and it appears there. */
  if (index === 1) {
    return (
      <div className="step-visual rounded-2xl bg-ink/[0.035] p-5">
        <div className="flex items-center justify-between gap-3">
          {/* The reticle, drawn rather than fetched — the favicon's own
              artwork, so it cannot go out of step with the brand mark. */}
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white shadow-sm">
            <ReticleMark />
          </span>

          {/* The packet crossing. Three dots on one keyframe, offset by a
              third each, so the run reads as continuous rather than as three
              things blinking. */}
          <span aria-hidden="true" className="relative h-2 flex-1">
            <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-ink/15" />
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="absolute left-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-accent"
                style={{ animation: `step-travel 2.4s linear ${dot * 0.8}s infinite` }}
              />
            ))}
          </span>

          {/* eBay, in eBay's own colours — which are this site's four signal
              tones, because the palette was taken from the logo. */}
          <span className="shrink-0 font-display text-2xl font-extrabold lowercase tracking-tight">
            <span style={{ color: '#e53238' }}>e</span>
            <span style={{ color: '#0064d2' }}>b</span>
            <span style={{ color: '#f5af02' }}>a</span>
            <span style={{ color: '#86b817' }}>y</span>
          </span>
        </div>

        {/* And what lands there. */}
        <div className="mt-4 rounded-xl bg-white p-3 shadow-sm">
          <div className="flex gap-3">
            <span className={`grid size-14 shrink-0 place-items-center rounded-lg ${tone.tile}`}>
              <Icon name="salesGrowth" className="size-6" />
            </span>
            <span className="flex-1 space-y-2 pt-1">
              <span className="block h-2 w-full rounded-full bg-ink/15" />
              <span className="block h-2 w-3/5 rounded-full bg-ink/10" />
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-hairline pt-3">
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-signal-green"
                style={{ animation: 'step-live 1.6s ease-in-out infinite' }}
              />
              <span className="micro-label text-signal-green-deep">Live on eBay</span>
            </span>
            <span className="font-display text-sm font-extrabold tracking-tight">$38.90</span>
          </div>
        </div>
      </div>
    );
  }

  // 3 — the monitor listening for a change at the retailer.
  if (index === 2) {
    return (
      <div className="step-visual grid place-items-center rounded-2xl bg-ink/[0.035] p-8">
        <div className="relative grid size-32 place-items-center">
          {[0, 1, 2].map((ring) => (
            <span
              key={ring}
              aria-hidden="true"
              className={`absolute size-24 rounded-full border-2 ${tone.ring}`}
              style={{
                animation: `step-sonar 3s cubic-bezier(0.2, 0.6, 0.4, 1) ${ring * 1}s infinite`,
              }}
            />
          ))}
          <span className={`relative grid size-12 place-items-center rounded-2xl ${tone.tile}`}>
            <Icon name="magnifier" className="size-5" />
          </span>
        </div>

        <p className="mt-6 text-center">
          <span className="micro-label text-muted">Retailer price</span>
          <span className="mt-1 block font-display text-lg font-extrabold tracking-tight">
            $24.99 <span className={tone.text}>→ $22.49</span>
          </span>
        </p>
      </div>
    );
  }

  // 4 — the order confirmed.
  return (
    <div className="step-visual grid place-items-center rounded-2xl bg-ink/[0.035] p-8">
      <span className={`grid size-20 place-items-center rounded-full ${tone.tile}`}>
        <svg viewBox="0 0 32 32" className="size-10" fill="none" aria-hidden="true">
          <path
            className="step-check-path"
            d="M8 16.5l5.5 5.5L24 11"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="30"
            strokeDashoffset="30"
            style={{ animation: 'step-draw 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards' }}
          />
        </svg>
      </span>

      <p className="mt-6 text-center">
        <span className="micro-label text-muted">Order total</span>
        <span className="mt-1 block font-display text-lg font-extrabold tracking-tight">
          $38.90 <span className={tone.text}>· $13.20 profit</span>
        </span>
      </p>
    </div>
  );
}

export default function FeatureTourSection() {
  const { FEATURES, A11Y } = useContent();
  const sectionRef = useRevealOnScroll();
  const stepRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const nodes = stepRefs.current.filter(Boolean);
    if (!section || !nodes.length) return undefined;

    /*
     * The current step is the last one whose top has crossed the middle of the
     * screen. Read from positions, not from events: an IntersectionObserver
     * only fires on entry, so scrolling back up left the panel stale.
     */
    let frame = 0;
    let live = false;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.45;

      let next = 0;
      nodes.forEach((node, index) => {
        if (node.getBoundingClientRect().top <= line) next = index;
      });

      // Only re-render when the answer actually changes.
      setActiveIndex((current) => (current === next ? current : next));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    // Nothing is measured while the section is far from the viewport.
    const gate = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting === live) return;
        live = entry.isIntersecting;

        if (live) {
          window.addEventListener('scroll', onScroll, { passive: true });
          measure();
        } else {
          window.removeEventListener('scroll', onScroll);
        }
      },
      { rootMargin: '100px' },
    );

    gate.observe(section);

    return () => {
      gate.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [sectionRef]);

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
                  /* The spacing sets the pacing. 36 lands each step about a
                     third of a screen apart — close enough to read one before
                     the next, far enough to avoid a hole. */
                  className="relative flex gap-6 pb-16 last:pb-0 lg:pb-36"
                >
                  {/* No opacity on this wrapper: it would take the number tile
                      with it and the spine would show through. */}
                  <span className="relative z-10">
                    <StepNumber item={item} isActive={isActive} />
                  </span>

                  {/* 0.8, not 0.55. A step that is not current still has to be
                      readable — the whole column is on screen at once, and a
                      reader looks ahead and back. `text-muted` on
                      `paper-sunk` at 55% was under the contrast floor. */}
                  <div
                    className={`min-w-0 flex-1 transition-opacity duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-80'
                    }`}
                  >
                    <h3 className="font-display text-xl font-extrabold leading-tight tracking-tight sm:text-2xl">
                      {item.title}
                    </h3>
                    {/* `ink/80` rather than `muted`: this is body copy people
                        are meant to read, not a caption. */}
                    <p className="mt-3 text-[0.95rem] font-medium leading-relaxed text-ink/80">
                      {item.body}
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={`size-1.5 rounded-full ${toneOf(item.tone).dot}`}
                      />
                      <span className={`micro-label ${toneOf(item.tone).text}`}>{item.metric}</span>
                    </div>

                    <ToolPills links={item.links} />

                    {/* Below lg the sticky panel is gone, so each step
                        carries its own visual and the phone gets the same
                        four pictures. lg:hidden, or it shows twice. */}
                    <div className="mt-7 lg:hidden">
                      <StepVisual item={item} index={index} />
                    </div>
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
                    <StepNumber item={active} size="lg" isActive />
                    <span className="micro-label text-muted">
                      {A11Y.step.replace('{n}', active.n).replace('{total}', FEATURES.items.length)}
                    </span>
                  </div>

                  {/* The step happening, not described again — the title and
                      body are already beside it. Keyed on the step so the
                      animation restarts on every change. */}
                  <div
                    key={active.n}
                    className="mt-6 animate-[panel-in_0.5s_var(--ease-out-expo)_both]"
                  >
                    <StepVisual item={active} index={activeIndex} />
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

        {/* The close: the payoff, a door, and the question that hands over to
            the community section directly below — which opens "Here's what
            'never alone' looks like", so the bridge is that section's own
            headline asked as a question. */}
        <div className="mt-16 flex flex-col items-center text-center">
          {/* Inline, not a flex sibling: as a sibling it centred against the
              whole block and dropped into the gap when the line wrapped.
              Sized down on small screens, where it broke to three lines. */}
          <p className="mx-auto max-w-md font-display text-xl font-extrabold leading-snug tracking-tight sm:max-w-lg sm:text-2xl lg:text-3xl">
            <Icon
              name="checkCircle"
              className="mr-2 inline-block size-6 -translate-y-0.5 align-middle text-signal-green-deep"
            />
            {FEATURES.closer.lead}
          </p>

          <div className="mt-8">
            <CtaButton href={FEATURES.closer.cta.href} intent="software-primary">
              {FEATURES.closer.cta.label}
            </CtaButton>
          </div>

          {/* "on the monthly plan" is not optional — see the note in
              `content/en/pricing`. The bundle and Enterprise plans are final sale. */}
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-muted">
            <Icon name="shield" className="size-4 shrink-0 text-signal-green-deep" />
            {FEATURES.closer.guarantee}
          </p>

          {/* Set as a statement, not a caption. It is the hinge into the next
              section, and the marked words are that section's own headline. */}
          <p className="mt-12 max-w-2xl border-t border-hairline pt-10 font-display text-xl font-extrabold leading-snug tracking-tight sm:text-2xl">
            {FEATURES.closer.bridge.lead}{' '}
            <span className="headline-mark">{FEATURES.closer.bridge.mark}</span>
            {FEATURES.closer.bridge.tail}
          </p>
        </div>
      </div>
    </section>
  );
}
