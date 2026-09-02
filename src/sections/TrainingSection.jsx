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
 * 09 — Step by step: the steps and the course together. They used to be two
 * sections explaining the same four steps a third of a page apart.
 *
 * Shape taken from the live site: a staircase rather than a row, so the layout
 * says "step by step" before a word is read; the course card beside the steps,
 * not under them; and the card ending on the instructors, with faces.
 *
 * Two departures: the guarantee keeps "on the monthly plan", and the
 * instructors are read from FOUNDERS.people so the names cannot drift.
 */
export default function TrainingSection() {
  const sectionRef = useRevealOnScroll();
  const stairsRef = useRef(null);
  const { course, closer } = TRAINING;
  const lastIndex = TRAINING.steps.length - 1;

  /**
   * The staircase runs once, in view. Outside the shared reveal system, which
   * staggers a group together — this needs a longer beat to read as a
   * sequence. All this sets is an attribute; the animation is CSS.
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
          {/* Each step steps right by its index — the indent is the argument.
              No indent below md: on a ~290px column it would cost a line of
              copy to say what the numbers already say. */}
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
                      reaches it. In the gap rather than behind the cards, so
                      it never has to guess a card's height. */}
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

                  {/* One tick at a time, travelling, so the four read as a count
                      rather than a finished checklist. With no JS it rests on
                      the last step, which is the live site's composition. */}
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

          {/* The tick flows with the text. As a flex sibling it centred on the
              whole block and dropped into the gap when the line wrapped. */}
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
