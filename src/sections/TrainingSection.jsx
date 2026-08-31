import { useEffect, useRef } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import CtaButton from '../components/ui/CtaButton';
import Icon from '../components/ui/Icon';
import { TRAINING, FOUNDERS } from '../data/siteContent';
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
              whole idea — the indent is the argument, not decoration.

              No indent at all below `md`. On a phone the column is ~290px, so
              stepping the fourth card in costs it a line of copy to say
              something the numbers already say; the four run full width and
              the travelling mark carries the sequence instead. */}
          <ol ref={stairsRef} className="flex flex-col gap-4">
            {TRAINING.steps.map((step, index) => {
              const tone = toneOf(STEP_TONES[index % STEP_TONES.length]);
              const isLast = index === lastIndex;

              return (
                <li
                  key={step.n}
                  data-step
                  data-step-last={isLast || undefined}
                  style={{ '--i': index }}
                  className="relative flex items-center gap-4 rounded-2xl border border-hairline bg-white p-4 shadow-lift sm:p-5 md:ms-[calc(var(--i)*1.6rem)]"
                >
                  {/* The mark, drawn over the card rather than on it: a ring
                      that fades is one composited layer, where animating the
                      card's own border-color would repaint it every frame. */}
                  <span
                    aria-hidden="true"
                    data-step-mark
                    className={`pointer-events-none absolute inset-0 rounded-2xl border-2 ${tone.edge}`}
                  />

                  {/* The dotted link to the next step, drawn as the count
                      reaches it. It sits in the gap rather than behind the
                      cards, so it never has to guess a card's height, and on
                      the number chip's own centre line — 34px in at `p-4`,
                      38px from `sm:p-5`.

                      Card bottom to card top is what it can honestly join:
                      the chips are centred inside cards of different heights,
                      so no line reaches from one chip to the next. */}
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      data-step-link
                      style={{ '--i': index }}
                      className={`absolute left-[34px] top-full h-4 border-l-2 border-dotted sm:left-[38px] ${tone.edge}`}
                    />
                  )}
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-lg font-display text-sm font-extrabold ${tone.tile}`}
                  >
                    {String(index + 1)}
                  </span>

                  <p className="text-[0.95rem] leading-relaxed text-ink">{step.text}</p>

                  {/* The tick travels with the ring — one on screen at a time,
                      so the four read as a count rather than as a finished
                      checklist — and the count runs on a loop. Its resting
                      state, with no JS or under reduced motion, is the mark
                      parked on the last step: the live site's composition. */}
                  <span
                    aria-hidden="true"
                    data-step-mark
                    className={`ml-auto grid size-6 shrink-0 place-items-center rounded-full ${tone.tile}`}
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
            <CtaButton href={TRAINING.cta.href} intent="training-signup">
              {TRAINING.cta.label}
            </CtaButton>
          </div>

          {/* The tick flows WITH the text rather than sitting beside it as a
              flex sibling. As a sibling under `items-center` it centred against
              the whole block, so the moment the line wrapped on a phone it
              landed in the gap between the two lines — the same fault section
              07's closer had. */}
          <p className="mt-4 text-[0.85rem] leading-relaxed text-muted">
            <Icon
              name="checkCircle"
              className="mr-1.5 inline-block size-4 align-middle text-signal-green-deep"
              aria-hidden="true"
            />
            {TRAINING.guarantee}
          </p>
        </div>
      </div>
    </section>
  );
}
