import CtaButton from '../components/ui/CtaButton';
import { TRAINING } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useParallax } from '../hooks/useParallax';

/**
 * 09 — The course.
 *
 * Kept as a card, per the review. The naming collision it flagged is resolved
 * in the pricing data: "Dropship Mastery" is now only ever the course, and the
 * middle plan is the "10K credits bundle", so a visitor is never told the same
 * name is both a plan and a thing included in all plans.
 */
export default function TrainingSection() {
  const sectionRef = useRevealOnScroll();
  const plateRef = useParallax(-0.06);

  return (
    <section
      ref={sectionRef}
      id="training"
      aria-labelledby="training-headline"
      className="section-band bg-paper-sunk"
    >
      <div className="site-shell">
        <div className="overflow-hidden rounded-[2rem] border border-hairline bg-ink text-paper">
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:p-16">
            <div>
              <p className="section-eyebrow section-eyebrow-on-ink" data-reveal data-reveal-group="training">
                {TRAINING.eyebrow}
              </p>

              <h2
                id="training-headline"
                className="mt-4 text-[length:var(--text-display)] leading-[1.02]"
                data-reveal
                data-reveal-group="training"
              >
                {TRAINING.headline}
              </h2>

              <p
                className="mt-5 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted-dark"
                data-reveal
                data-reveal-group="training"
              >
                {TRAINING.lead}
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {TRAINING.bullets.map((bullet) => (
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
                {['Account setup', 'Finding products', 'Your first listing', 'Scaling up'].map(
                  (module, index) => (
                    <div
                      key={module}
                      className="absolute inset-x-0 rounded-2xl border border-ink-line bg-ink-soft px-5 py-4 shadow-float"
                      style={{
                        top: `${index * 3.9}rem`,
                        transform: `translateX(${index * 12}px) rotate(${index * 0.7 - 1}deg)`,
                        zIndex: 10 - index,
                      }}
                    >
                      <p className="micro-label text-muted-dark">
                        Module {index + 1}
                      </p>
                      <p className="mt-1 text-sm font-semibold">{module}</p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
