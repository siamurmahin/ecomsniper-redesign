import { useEffect, useRef } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import CtaButton from '../components/ui/CtaButton';
import Icon from '../components/ui/Icon';
import { TRAINING, FOUNDERS, SITE } from '../data/siteContent';
import { toneOf } from '../lib/signalTones';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

const PORTRAITS = import.meta.glob('../assets/people/*.jpg', { eager: true, import: 'default' });
const portraitUrl = (key) => PORTRAITS[`../assets/people/${key}.jpg`];

/** One signal tone per step, as every enumerated set on this page is coloured. */
const STEP_TONES = ['blue', 'red', 'gold', 'green'];

/**
 * 09 — Step by step: the model and the course, in one section.
 *
 * This absorbed section 05 on 31 Aug. "The model, in plain English" ran the
 * same four steps on its own band a third of the page above the course that
 * teaches them, and neither half mentioned the other. The steps are the
 * syllabus, so explaining them is the argument for the course.
 *
 * The shape was read off ecomsniper.io on 1 Sep 2026. The rebuild had drifted
 * a long way from it and the live version is better in three specific ways:
 *
 * The steps are a staircase, not a row. Each one is indented past the last, so
 * the shape says "step by step" before a word is read — which is the section's
 * own eyebrow. A row of four says "four things".
 *
 * The course card sits beside the steps rather than under them, so the offer
 * and the mechanism are one viewport instead of two, and the card is a portrait
 * shape that does not need a second column filling it.
 *
 * The card ends on the instructors, with faces. That is what the right side of
 * that card is for — not a syllabus. Trust in this category rests on the
 * operator, which is the argument section 10 makes at length.
 *
 * Two deliberate departures from live: the guarantee keeps "on the monthly
 * plan", because the credits bundle and Enterprise are final sale and the
 * unqualified version contradicts both the pricing page and the FAQ; and the
 * instructors are read from `FOUNDERS.people` so the two names cannot drift
 * from section 10's copy of them.
 */
export default function TrainingSection() {
  const sectionRef = useRevealOnScroll();
  const stairsRef = useRef(null);
  const { course, closer } = TRAINING;
  const lastIndex = TRAINING.steps.length - 1;

  /**
   * The staircase runs once, when it is properly in view. The steps are
   * deliberately outside the shared `data-reveal` system: that reveals a group
   * together on one stagger, and this needs its own, longer beat to read as a
   * sequence rather than as four cards arriving at once.
   *
   * All this does is set an attribute — the animation itself is CSS keyframes
   * driven by each step's `--i`, so nothing here touches a style on any node.
   */
  useEffect(() => {
    const stairs = stairsRef.current;
    if (!stairs) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        stairs.dataset.steps = 'in';
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(stairs);

    return () => observer.disconnect();
  }, []);

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
          headline={
            <span id="training-headline">
              Starting from <span className="headline-mark">zero?</span>
            </span>
          }
          lead={TRAINING.lead}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          {/* The staircase. Each step steps right by its index, which is the
              whole idea — the indent is the argument, not decoration. Half the
              travel below `md`, where a full stagger would eat the measure. */}
          <ol ref={stairsRef} className="flex flex-col gap-3">
            {TRAINING.steps.map((step, index) => {
              const tone = toneOf(STEP_TONES[index % STEP_TONES.length]);
              const isLast = index === lastIndex;

              return (
                <li
                  key={step.n}
                  data-step
                  style={{ '--i': index }}
                  className={`flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-lift ms-[calc(var(--i)*0.6rem)] sm:p-5 md:ms-[calc(var(--i)*1.6rem)] ${
                    isLast ? 'border-signal-green/60' : 'border-hairline'
                  }`}
                >
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-lg font-display text-sm font-extrabold ${tone.tile}`}
                  >
                    {String(index + 1)}
                  </span>

                  <p className="text-[0.95rem] leading-relaxed text-ink">{step.text}</p>

                  {/* Every step is ticked as it lands, so the four are counted
                      off one to four rather than simply appearing. The last
                      one keeps its green border as well: the others are marked
                      done, that one is the payoff. */}
                  <span
                    aria-hidden="true"
                    data-step-done
                    className={`ml-auto grid size-6 shrink-0 place-items-center rounded-full ${
                      isLast ? toneOf('green').tile : 'bg-signal-green/15 text-signal-green-deep'
                    }`}
                  >
                    <Icon name="check" className="size-3.5" />
                  </span>
                </li>
              );
            })}
          </ol>

          {/* The course card. Portrait rather than a wide band, so it stands
              beside the steps instead of needing a second column of its own. */}
          <div
            data-reveal
            data-reveal-group="training-course"
            className="rounded-[1.75rem] border border-ink-line bg-ink p-7 text-paper shadow-float sm:p-9"
          >
            <span className={`grid size-11 place-items-center rounded-xl ${toneOf('green').tile}`}>
              <Icon name="graduationCap" className="size-5" />
            </span>

            <p className="section-eyebrow section-eyebrow-on-ink mt-6">{course.eyebrow}</p>

            <h3 className="mt-3 font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl">
              {course.name}
            </h3>

            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-dark">{course.body}</p>

            <ul className="mt-6 flex flex-col gap-2.5">
              {course.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5 text-[0.9rem] font-semibold text-paper">
                  <Icon
                    name="checkCircle"
                    className="mt-0.5 size-4 shrink-0 text-signal-green-soft"
                    aria-hidden="true"
                  />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-7 border-t border-paper/10 pt-6">
              <p className="micro-label text-muted-dark">{course.instructorsLabel}</p>
              <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
                {FOUNDERS.people.map((person) => (
                  <li key={person.name} className="flex items-center gap-2.5">
                    <img
                      src={portraitUrl(person.photo)}
                      alt=""
                      width={80}
                      height={80}
                      loading="lazy"
                      decoding="async"
                      className="size-9 rounded-full object-cover ring-2 ring-ink"
                    />
                    <span className="text-[0.9rem] font-semibold text-paper">{person.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Both of section 05's closing lines, then the door. They answer the
            question the steps raise — where does the stock live, then? */}
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

          <div className="mt-9">
            <CtaButton href={SITE.signupUrl} intent="training-signup">
              Start your eBay business
            </CtaButton>
          </div>

          <p className="mt-4 flex items-center justify-center gap-2 text-[0.85rem] text-muted">
            <Icon name="checkCircle" className="size-4 text-signal-green-deep" aria-hidden="true" />
            30 day money back guarantee on the monthly plan
          </p>
        </div>
      </div>
    </section>
  );
}
