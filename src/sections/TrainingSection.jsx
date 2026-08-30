import CtaButton from '../components/ui/CtaButton';
import SectionHeading from '../components/ui/SectionHeading';
import { TRAINING } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useParallax } from '../hooks/useParallax';
import { toneOf } from '../lib/signalTones';

/**
 * 09 — Step by step: the model and the course, in one section.
 *
 * This absorbed section 05. "The model, in plain English" ran the same four
 * steps on its own ink band a third of the page above the course that teaches
 * them — the page explained the mechanism, then later offered to teach the
 * mechanism, and neither half mentioned the other. The live site
 * (ecomsniper.io) runs them as one and it is the better shape.
 *
 * The steps come first because they are the argument: this is simple enough to
 * learn. The course comes second because it is the offer that follows from it.
 * Putting the offer first would be selling a solution before the reader has the
 * problem.
 *
 * Section 05's two closing lines are kept. The live site drops them, but they
 * answer the objection the steps raise — "where does the stock live, then?" —
 * and losing them with the section they came from would be losing the answer.
 *
 * The naming collision an earlier review flagged is still resolved in the
 * pricing data: "Dropship Mastery" is only ever the course, and the middle plan
 * is the "10K credits bundle".
 */

/** One signal tone per step, the way every enumerated set on this page is coloured. */
const STEP_TONES = ['blue', 'red', 'gold', 'green'];

export default function TrainingSection() {
  const sectionRef = useRevealOnScroll();
  const plateRef = useParallax(-0.06);
  const { course, closer } = TRAINING;

  return (
    <section
      ref={sectionRef}
      id="training"
      aria-labelledby="training-headline"
      className="section-band bg-paper-sunk"
    >
      <div className="site-shell">
        <SectionHeading
          align="center"
          eyebrow={TRAINING.eyebrow}
          headline={<span id="training-headline">{TRAINING.headline}</span>}
          lead={TRAINING.lead}
        />

        {/* The four steps, across rather than stacked. They are a sequence, and
            a sequence read left to right says "this is short" — which is the
            point being made. Section 05 ran them down the left third of an ink
            band and left the other two thirds empty. */}
        <ol className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {TRAINING.steps.map((step, index) => {
            const tone = toneOf(STEP_TONES[index % STEP_TONES.length]);

            return (
              <li key={step.n} data-reveal data-reveal-group="training-steps" className="relative">
                {/* The rule runs from each step towards the next, so the row
                    reads as one movement rather than four separate cards. It
                    stops at the last one, which has nowhere to point. */}
                {index < TRAINING.steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-12 right-0 top-5 hidden h-px bg-hairline lg:block"
                  />
                )}

                <span
                  className={`relative grid size-10 place-items-center rounded-xl font-display text-sm font-extrabold ${tone.tile}`}
                >
                  {step.n}
                </span>

                <p className="mt-5 text-[0.95rem] leading-relaxed text-ink">{step.text}</p>
              </li>
            );
          })}
        </ol>

        {/* The payoff. Set at two weights: the first line is the claim, the
            second is what it costs you to believe it. */}
        <div
          data-reveal
          data-reveal-group="training-closer"
          className="mx-auto mt-14 max-w-3xl text-center"
        >
          <p className="font-display text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-tight">
            {closer.lead}
          </p>
          <p className="mt-3 text-[length:var(--text-lead)] leading-relaxed text-muted">
            {closer.detail}
          </p>
        </div>

        {/* And this is who teaches it. An ink card under the steps, so the
            offer is visibly a different kind of thing from the explanation
            above it rather than more of the same. */}
        <div className="mt-16 overflow-hidden rounded-[2rem] border border-hairline bg-ink text-paper">
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:p-16">
            <div>
              <p
                className="section-eyebrow section-eyebrow-on-ink"
                data-reveal
                data-reveal-group="training-course"
              >
                {course.eyebrow}
              </p>

              <h3
                className="mt-4 text-[length:var(--text-display)] leading-[1.02]"
                data-reveal
                data-reveal-group="training-course"
              >
                {course.name}
              </h3>

              <p
                className="mt-5 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted-dark"
                data-reveal
                data-reveal-group="training-course"
              >
                {course.body}
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {course.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    data-reveal
                    data-reveal-group="training-bullets"
                    className="flex items-start gap-2.5 text-[0.92rem] text-paper"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 grid size-4 shrink-0 place-items-center rounded-full bg-paper/10 text-[0.55rem] text-paper"
                    >
                      ✓
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-10" data-reveal data-reveal-group="training-cta">
                <CtaButton href={TRAINING.cta.href} variant="onInk" intent="training-pricing">
                  {TRAINING.cta.label}
                </CtaButton>
              </div>
            </div>

            {/* Stacked "module" plates — drift slightly against the scroll. */}
            <div ref={plateRef} aria-hidden="true" className="relative hidden lg:block">
              <div className="relative mx-auto h-72 w-full max-w-sm">
                {course.modules.map((module, index) => (
                  <div
                    key={module}
                    className="absolute inset-x-0 rounded-2xl border border-ink-line bg-ink-soft px-5 py-4 shadow-float"
                    style={{
                      top: `${index * 3.9}rem`,
                      transform: `translateX(${index * 12}px) rotate(${index * 0.7 - 1}deg)`,
                      zIndex: 10 - index,
                    }}
                  >
                    <p className="micro-label text-muted-dark">Module {index + 1}</p>
                    <p className="mt-1 text-sm font-semibold">{module}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
