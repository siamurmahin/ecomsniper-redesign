import { COURSE as EN_COURSE } from '../content/en/course';
import { overlay as germanCourse } from '../content/de/course';
import { usePageContent } from '../hooks/usePageContent';
import { useContent } from '../hooks/useContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { toneOf } from '../lib/signalTones';
import CtaButton from '../components/ui/CtaButton';
import HeroSurface from '../components/hero/HeroSurface';
import MarkedHeadline from '../components/ui/MarkedHeadline';
import Icon from '../components/ui/Icon';
import TestimonialsSection from '../sections/TestimonialsSection';
import FaqSection from '../sections/FaqSection';
import AssuranceSection from '../sections/AssuranceSection';

/**
 * Dropship Mastery — the course sales page.
 *
 * The one page on this site that is a funnel rather than a description, and it
 * is built as one: the promise, the mechanic, why the market works, what you
 * get, who teaches it, what other people say, and what happens if it goes
 * wrong — with a door held open at the top, in the middle and at the foot.
 *
 * Their slug is `/course/dropshipMastery`, listed a second time in their
 * sitemap in lowercase. Ours is `/course/dropship-mastery`, kebab-case like
 * every other route here, and both of theirs 301 onto it.
 *
 * **The claims that are not carried are listed in `content/en/course.js`**,
 * beside the words, with the About page's own promise quoted against each.
 * Three of them are income claims and false urgency that About explicitly
 * rules out; the fourth is a figure about eBay that is simply not true. All
 * four are flagged for the client rather than reworded quietly.
 *
 * **The proof is `TestimonialsSection`, not a third review card.** The
 * homepage already renders the real Trustpilot reviews with the critical ones
 * left in, and a sales page that invented its own testimonial component would
 * be the place where a made-up one eventually appears. Same for the guarantee
 * and the questions: this page closes on the sections the rest of the site
 * closes on.
 */

/* Module scope so the hook memo has a stable dependency. */
const OVERLAYS = { de: germanCourse.COURSE };

/** A band heading: eyebrow, marked headline, optional lead. */
function BandHead({ id, section, align = '' }) {
  return (
    <div className={`max-w-3xl ${align}`.trim()}>
      <p className="section-eyebrow" data-reveal data-reveal-group={id}>
        {section.eyebrow}
      </p>

      <h2
        id={`${id}-headline`}
        className="mt-4 text-[length:var(--text-section)] leading-[1.05]"
        data-reveal
        data-reveal-group={id}
      >
        <MarkedHeadline parts={section.headlineParts} />
      </h2>

      {section.lead ? (
        <p
          className="mt-5 font-serif text-xl leading-relaxed italic text-muted"
          data-reveal
          data-reveal-group={id}
        >
          {section.lead}
        </p>
      ) : null}
    </div>
  );
}

export default function CoursePage() {
  const COURSE = usePageContent(EN_COURSE, OVERLAYS);
  const { SITE } = useContent();
  const mechanicRef = useRevealOnScroll();
  const marketRef = useRevealOnScroll();
  const includedRef = useRevealOnScroll();
  const instructorsRef = useRevealOnScroll();
  const closeRef = useRevealOnScroll();

  return (
    <>
      <HeroSurface>
        <div className="max-w-4xl">
          <p className="section-eyebrow" data-reveal data-reveal-group="course-hero">
            {COURSE.eyebrow}
          </p>

          <h1
            className="mt-5 text-[length:var(--text-hero)] leading-[0.98]"
            data-reveal
            data-reveal-group="course-hero"
          >
            <MarkedHeadline parts={COURSE.headlineParts} />
          </h1>

          <p
            className="mt-6 max-w-2xl font-serif text-2xl leading-relaxed italic text-muted"
            data-reveal
            data-reveal-group="course-hero"
          >
            {COURSE.lead}
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-4"
            data-reveal
            data-reveal-group="course-hero"
          >
            <CtaButton href={COURSE.ctas.primary.href}>{COURSE.ctas.primary.label}</CtaButton>
            {/* Their above-the-fold button. It keeps its place as the second
                door: the free room is the right one for a reader who has not
                decided yet, and this page is long. */}
            <CtaButton href={SITE.discordUrl} variant="secondary">
              {COURSE.ctas.secondary.label}
            </CtaButton>
          </div>

          {/* What stands in for the income claims their page opens with: three
              figures a reader can go and check, one of which is a link. */}
          <dl
            className="mt-12 grid gap-6 border-t border-hairline pt-8 sm:grid-cols-3"
            data-reveal
            data-reveal-group="course-hero"
          >
            {COURSE.proof.map((item) => (
              <div key={item.label}>
                <dt className="font-display text-2xl font-extrabold text-ink">{item.value}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </HeroSurface>

      {/* 1. The mechanic. A reader who does not believe the model works will
             not read anything below this. */}
      <section
        ref={mechanicRef}
        id="how-it-works"
        aria-labelledby="mechanic-headline"
        className="section-band bg-paper-sunk"
      >
        <div className="site-shell">
          <BandHead id="mechanic" section={COURSE.mechanic} />

          <ol className="mt-14 grid gap-6 md:grid-cols-2">
            {COURSE.mechanic.steps.map((step) => {
              const tone = toneOf(step.tone);

              return (
                <li
                  key={step.title}
                  data-reveal
                  data-reveal-group="mechanic-steps"
                  className="rounded-2xl border border-hairline bg-paper p-7"
                >
                  <span
                    className={`inline-grid size-11 place-items-center rounded-full border border-dashed font-display text-sm font-extrabold ${tone.ring} ${tone.text}`}
                  >
                    {step.n}
                  </span>
                  <h3 className="mt-5 font-display text-xl leading-snug font-extrabold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
                </li>
              );
            })}
          </ol>

          {/* Their example, labelled as one, with the honest note under it and
              a link to their own post that works the fees through. A sales
              page that shows a 69% gap and says nothing about fees is the kind
              of page this rebuild keeps taking apart. */}
          <div
            data-reveal
            data-reveal-group="mechanic-steps"
            className="mt-10 rounded-2xl border border-hairline bg-paper p-7"
          >
            <p className="micro-label text-muted">{COURSE.mechanic.example.label}</p>

            <div className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-4">
              <div>
                <p className="font-display text-3xl font-extrabold text-ink tabular-nums">
                  {COURSE.mechanic.example.cost}
                </p>
                <p className="mt-1 text-sm text-muted">{COURSE.mechanic.example.costLabel}</p>
              </div>

              <Icon name="arrowRight" className="size-5 shrink-0 text-muted/60" />

              <div>
                <p className="font-display text-3xl font-extrabold text-ink tabular-nums">
                  {COURSE.mechanic.example.list}
                </p>
                <p className="mt-1 text-sm text-muted">{COURSE.mechanic.example.listLabel}</p>
              </div>
            </div>

            <p className="mt-6 max-w-2xl border-t border-hairline pt-5 text-sm leading-relaxed text-muted">
              {COURSE.mechanic.example.note}{' '}
              <a
                href={COURSE.mechanic.example.noteCta.href}
                className="text-ink underline underline-offset-2"
              >
                {COURSE.mechanic.example.noteCta.label}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* 2. Why the market works. */}
      <section ref={marketRef} aria-labelledby="market-headline" className="section-band">
        <div className="site-shell">
          <BandHead id="market" section={COURSE.market} />

          <div className="mt-8 grid max-w-3xl gap-5">
            {COURSE.market.body.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[length:var(--text-lead)] leading-relaxed text-muted"
                data-reveal
                data-reveal-group="market"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {COURSE.market.points.map((point) => (
              <li
                key={point.label}
                data-reveal
                data-reveal-group="market"
                className="border-t-2 border-hairline pt-5"
              >
                <p className="font-display text-lg leading-snug font-extrabold text-ink">
                  {point.label}
                </p>
                <p className="mt-2 leading-relaxed text-muted">{point.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. The offer. */}
      <section
        ref={includedRef}
        id="what-you-get"
        aria-labelledby="included-headline"
        className="section-band bg-paper-sunk"
      >
        <div className="site-shell">
          <BandHead id="included" section={COURSE.included} />

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-start">
            {/* The course itself, given the weight the bonuses do not get. */}
            <div
              data-reveal
              data-reveal-group="included"
              className="panel-brand-outline bg-paper p-8"
            >
              <p className="micro-label text-muted">{COURSE.eyebrow}</p>
              <h3 className="mt-3 font-display text-2xl font-extrabold text-ink">
                {COURSE.included.course.name}
              </h3>
              <p className="mt-4 text-[length:var(--text-lead)] leading-relaxed text-muted">
                {COURSE.included.course.body}
              </p>

              <ul className="mt-6 grid gap-3">
                {COURSE.included.course.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <Icon
                      name="checkCircle"
                      className="mt-0.5 size-4 shrink-0 text-signal-green-deep"
                    />
                    <span className="leading-relaxed text-muted">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <CtaButton href={COURSE.ctas.primary.href}>{COURSE.ctas.primary.label}</CtaButton>
              </div>
            </div>

            {/* The three that come with it. Their value is stated and not
                counted down — see the deck's header. */}
            <ul className="grid gap-5">
              {COURSE.included.bonuses.map((bonus) => {
                const tone = toneOf(bonus.tone);

                return (
                  <li
                    key={bonus.name}
                    data-reveal
                    data-reveal-group="included"
                    className="flex gap-5 rounded-2xl border border-hairline bg-paper p-6"
                  >
                    <span
                      aria-hidden="true"
                      className={`grid size-11 shrink-0 place-items-center rounded-xl ${tone.tile}`}
                    >
                      <Icon name={bonus.icon} className="size-5" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <span className="font-display text-lg leading-snug font-extrabold text-ink">
                          {bonus.name}
                        </span>
                        <span className="micro-label shrink-0 text-muted">
                          <span className="line-through">{bonus.value}</span>{' '}
                          <span className={tone.text}>{COURSE.included.includedLabel}</span>
                        </span>
                      </span>
                      <span className="mt-2 block leading-relaxed text-muted">{bonus.body}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Who teaches it. */}
      <section ref={instructorsRef} aria-labelledby="instructors-headline" className="section-band">
        <div className="site-shell">
          <BandHead id="instructors" section={COURSE.instructors} />

          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {COURSE.instructors.people.map((person) => (
              <li
                key={person.name}
                data-reveal
                data-reveal-group="instructors"
                className="rounded-2xl border border-hairline bg-paper p-8"
              >
                <p className="font-display text-xl font-extrabold text-ink">{person.name}</p>
                <p className="font-label text-xs tracking-[0.12em] text-muted uppercase">
                  {person.role}
                </p>

                <p className="mt-5 leading-relaxed text-muted">{person.body}</p>

                <a
                  href={person.email}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink underline underline-offset-2"
                >
                  <Icon name="mail" className="size-4" />
                  {person.emailLabel}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. The proof, which is the site's own and not this page's invention. */}
      <TestimonialsSection />

      {/* 6. The last door, before the questions and the guarantee. */}
      <section ref={closeRef} aria-labelledby="close-headline" className="section-band">
        <div className="site-shell">
          <BandHead id="close" section={COURSE.close} />

          <p
            className="mt-6 max-w-3xl text-[length:var(--text-lead)] leading-relaxed text-muted"
            data-reveal
            data-reveal-group="close"
          >
            {COURSE.close.body}
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-4"
            data-reveal
            data-reveal-group="close"
          >
            <CtaButton href={COURSE.close.ctas.primary.href}>
              {COURSE.close.ctas.primary.label}
            </CtaButton>
            <CtaButton href={COURSE.close.ctas.secondary.href} variant="secondary">
              {COURSE.close.ctas.secondary.label}
            </CtaButton>
          </div>
        </div>
      </section>

      <FaqSection />

      <AssuranceSection />
    </>
  );
}
