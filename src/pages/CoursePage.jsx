import { COURSE as EN_COURSE } from '../content/en/course';
import { overlay as germanCourse } from '../content/de/course';
import { usePageContent } from '../hooks/usePageContent';
import { useContent } from '../hooks/useContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { toneOf } from '../lib/signalTones';
import CtaButton from '../components/ui/CtaButton';
import CourseHero from '../components/course/CourseHero';
import CourseSyllabusPanel from '../components/course/CourseSyllabusPanel';
import FaqAccordion from '../components/ui/FaqAccordion';
import MarkedHeadline from '../components/ui/MarkedHeadline';
import Icon from '../components/ui/Icon';
import TestimonialsSection from '../sections/TestimonialsSection';
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

/* The hero's three figures and the three reasons eBay works both read left to
   right as blue, gold, green — the same order the steps run in, so the page
   has one colour logic rather than a different one per section. Red is kept
   out of both: it is the tone this site uses for the thing that goes wrong. */
const PROOF_TONES = ['blue', 'gold', 'green'];

/* The instructors' own photographs, by the name the deck gives them. The
   German overlay translates the roles and the bios but not the names, so this
   lookup holds in both languages. */
const PORTRAITS = import.meta.glob('../assets/people/*.webp', {
  eager: true,
  import: 'default',
});
const portraitUrl = (key) => PORTRAITS[`../assets/people/${key}.webp`];
const PORTRAITS_BY_NAME = {
  'Marc Augustine': 'founder-marc',
  Sammy: 'founder-sammy',
};

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

/**
 * Their example, as three figures.
 *
 * It has been two things and this is the third. First two numbers with an
 * arrow between them, which is the shape every dropshipping screenshot uses.
 * Then a bordered three-column ledger, which was accurate and was still a box
 * with rules in it competing with the four cards above.
 *
 * Now it is the hero's own device: a value, a label, and a signal rule over
 * the top of each. The same pattern carries the Trustpilot score and the
 * member count on the first screen, so a reader has already learned to read it
 * once by the time they reach this, and the section stops introducing a new
 * kind of container two thirds of the way down the page.
 *
 * Blue for what it costs and gold for what it lists at, which are the tones
 * those two stages wear in the cards above. The gap is green — the tone this
 * site gives an outcome — and it is arithmetic on the client's own two
 * figures, not a claim added to their example. If either stops parsing, the
 * third figure is not rendered at all: a wrong sum here would be worse than no
 * sum.
 *
 * The note stays, and stays directly under the figures. A gap shown without
 * saying what eBay takes out of it is the thing this page keeps refusing to
 * be.
 */
function ExampleFigures({ example }) {
  const cost = Number(String(example.cost).replace(/[^0-9.]/g, ''));
  const list = Number(String(example.list).replace(/[^0-9.]/g, ''));
  const symbol = String(example.cost).replace(/[0-9.,\s]/g, '') || '';
  const hasGap = Number.isFinite(cost) && Number.isFinite(list) && list > cost;

  const figures = [
    { value: example.cost, label: example.costLabel, tone: 'blue' },
    { value: example.list, label: example.listLabel, tone: 'gold' },
  ];

  if (hasGap) {
    figures.push({
      value: `${symbol}${(list - cost).toFixed(2).replace(/\.00$/, '')}`,
      label: example.gapLabel,
      tone: 'green',
    });
  }

  return (
    <div data-reveal data-reveal-group="mechanic-steps" className="mt-12">
      <p className="micro-label text-muted">{example.label}</p>

      <dl className="mt-6 grid gap-6 sm:grid-cols-3">
        {figures.map((figure) => (
          <div key={figure.label} className={`border-t-2 pt-4 ${toneOf(figure.tone).edge}`}>
            <dt className="font-display text-3xl font-extrabold tabular-nums text-ink">
              {figure.value}
            </dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted">{figure.label}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-7 max-w-3xl text-sm leading-relaxed text-muted">
        {example.note}{' '}
        <a href={example.noteCta.href} className="text-ink underline underline-offset-2">
          {example.noteCta.label}
        </a>
        .
      </p>
    </div>
  );
}

export default function CoursePage() {
  const COURSE = usePageContent(EN_COURSE, OVERLAYS);
  const { SITE } = useContent();
  const fitRef = useRevealOnScroll();
  const objectionsRef = useRevealOnScroll();
  const mechanicRef = useRevealOnScroll();
  const marketRef = useRevealOnScroll();
  const includedRef = useRevealOnScroll();
  const instructorsRef = useRevealOnScroll();
  const closeRef = useRevealOnScroll();

  /* The accordion takes { q, a }. The answer keeps its link by being a node
     rather than a string — the accordion renders it inside the answer's own
     paragraph, and every one of these links is inline text. */
  const objectionItems = COURSE.objections.items.map((item) => ({
    q: item.question,
    a: item.cta ? (
      <>
        {item.answer}{' '}
        <a
          href={item.cta.href}
          className={`font-semibold underline underline-offset-2 ${toneOf(item.tone).text}`}
        >
          {item.cta.label}
        </a>
        .
      </>
    ) : (
      item.answer
    ),
  }));

  return (
    <>
      {/* The first screen lives in `CourseHero` so the panel beside it could
          be swapped without a second copy of the hero drifting from this one.
          Three panels were built against it on 8 Sep and the syllabus won; the
          lab and the two that lost are deleted, and what they established is
          in `CourseSyllabusPanel`'s header. */}
      <CourseHero
        course={COURSE}
        site={SITE}
        panel={<CourseSyllabusPanel panel={COURSE.heroPanel} />}
      />

      {/* 1. Who it is not for, before anything is sold.
             Self-selection lifts the conversion that matters and cuts the
             refunds that follow the one that does not — and it is the same
             promise About makes: "we would rather have 100 users who get real
             value than 1,000 who feel like they wasted their money." */}
      <section
        ref={fitRef}
        id="is-it-for-me"
        aria-labelledby="fit-headline"
        className="section-band surface-rich"
      >
        <div className="site-shell">
          <BandHead id="fit" section={COURSE.fit} />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {[
              { side: COURSE.fit.for, tone: 'green', icon: 'checkCircle' },
              { side: COURSE.fit.against, tone: 'red', icon: 'close' },
            ].map(({ side, tone, icon }) => {
              const t = toneOf(tone);

              return (
                <div
                  key={side.label}
                  data-reveal
                  data-reveal-group="fit"
                  className="relative overflow-hidden card-raised rounded-2xl border border-hairline bg-paper p-7 pl-8"
                >
                  <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 ${t.rule}`} />

                  <p className={`micro-label ${t.text}`}>{side.label}</p>

                  <ul className="mt-5 grid gap-4">
                    {side.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Icon name={icon} className={`mt-0.5 size-4 shrink-0 ${t.text}`} />
                        <span className="leading-relaxed text-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. The mechanic. A reader who does not believe the model works will
             not read anything below this. */}
      <section
        ref={mechanicRef}
        id="how-it-works"
        aria-labelledby="mechanic-headline"
        className="section-band surface-deep"
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
                  className="relative overflow-hidden card-raised rounded-2xl border border-hairline bg-paper p-7 pl-8"
                >
                  {/* The tone as a rule down the edge, and nothing in the
                      opposite corner. There was a 160px tinted circle bleeding
                      out of the top right of every card: it put the loudest
                      thing on the card furthest from the words, and four of
                      them across two columns read as decoration competing with
                      the content. The rule and the numbered tile already say
                      which stage this is — the same four tones the rest of the
                      site uses for the same four stages — so the wash was the
                      accessory to take off. */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 w-1 ${tone.rule}`}
                  />

                  <span className="flex items-center gap-3">
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-xl font-display text-sm font-extrabold ${tone.tile}`}
                    >
                      {step.n}
                    </span>
                    <span className={`micro-label ${tone.text}`}>{step.kicker}</span>
                  </span>

                  <h3 className="mt-5 font-display text-xl leading-snug font-extrabold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
                </li>
              );
            })}
          </ol>

          {/* What the four steps add up to, in the client's own words. It was
              the caption under the hero's loop panel until that panel was
              replaced; the sentence is theirs and it is the one thing the four
              cards cannot say on their own, so it moved here rather than being
              deleted with the component that used to hold it. */}
          <p
            data-reveal
            data-reveal-group="mechanic-steps"
            className="mt-10 max-w-3xl font-serif text-xl leading-relaxed italic text-ink"
          >
            {COURSE.mechanic.flowCaption}
          </p>

          {/* Their example, labelled as one, with the honest note under it and
              a link to their own post that works the fees through. A sales
              page that shows a 69% gap and says nothing about fees is the kind
              of page this rebuild keeps taking apart. */}
          <ExampleFigures example={COURSE.mechanic.example} />
        </div>
      </section>

      {/* 2. Why the market works. */}
      <section
        ref={marketRef}
        aria-labelledby="market-headline"
        className="section-band surface-rich"
      >
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
            {COURSE.market.points.map((point, index) => (
              <li
                key={point.label}
                data-reveal
                data-reveal-group="market"
                className={`border-t-2 pt-5 ${toneOf(PROOF_TONES[index]).edge}`}
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
        className="section-band surface-deep"
      >
        <div className="site-shell">
          <BandHead id="included" section={COURSE.included} />

          {/* items-stretch, not items-start: the course card was ending
              wherever its own copy ran out, which left a step of dead space
              beside the third bonus. The two columns are one offer and should
              read as one block. */}
          <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-stretch">
            {/* The course itself, given the weight the bonuses do not get. */}
            <div
              data-reveal
              data-reveal-group="included"
              className="panel-brand-outline card-raised flex flex-col bg-paper p-8"
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

              {/* mt-auto: the card is now as tall as the bonuses beside it,
                  so the door sits at its foot rather than halfway up. */}
              <div className="mt-auto pt-8">
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
                    className="flex gap-5 card-raised rounded-2xl border border-hairline bg-paper p-6"
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
      <section
        ref={instructorsRef}
        aria-labelledby="instructors-headline"
        className="section-band surface-rich"
      >
        <div className="site-shell">
          <BandHead id="instructors" section={COURSE.instructors} />

          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {COURSE.instructors.people.map((person) => (
              <li
                key={person.name}
                data-reveal
                data-reveal-group="instructors"
                className="card-raised rounded-2xl border border-hairline bg-paper p-8"
              >
                {/* The faces, at 64px. The files are 160px square — the same
                    ones the homepage's founders row uses — so they are sharp
                    here and nowhere near sharp enough to run larger. A bigger
                    portrait is on TODO waiting for the client; this slot takes
                    it unchanged when it arrives. */}
                <div className="flex items-center gap-4">
                  <img
                    src={portraitUrl(PORTRAITS_BY_NAME[person.name])}
                    alt={`${person.name}, ${person.role} on Dropship Mastery`}
                    width={160}
                    height={160}
                    loading="lazy"
                    decoding="async"
                    className="size-16 shrink-0 rounded-full object-cover ring-2 ring-paper-sunk"
                  />

                  <span className="min-w-0">
                    <span className="block font-display text-xl font-extrabold text-ink">
                      {person.name}
                    </span>
                    <span className="block font-label text-xs tracking-[0.12em] text-muted uppercase">
                      {person.role}
                    </span>
                  </span>
                </div>

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

      {/* 6. The objections, before the last door rather than after it.
             This replaces the site-wide FaqSection, which answers site-wide
             questions — the plans, the software, what the community is for.
             None of those are what stands between somebody reading this page
             and the button. These five are, and the general ones keep their
             home on /faq, which this links to twice. Two FAQs on one page
             would also be two things claiming to be the FAQ, and only one of
             them carries the schema. */}
      <section
        ref={objectionsRef}
        id="questions"
        aria-labelledby="objections-headline"
        className="section-band surface-rich"
      >
        <div className="site-shell">
          <BandHead id="objections" section={COURSE.objections} />

          {/* The homepage's accordion, carrying this page's questions.
              Asked for on 8 Sep: the same control the FAQ uses everywhere else,
              so a reader who has met it once knows how it opens.

              The questions stay this page's own — refunds, time, experience,
              whether the model still works, the price — because those are what
              stand between a reader and the button, while the site-wide FAQ
              answers plans and software and keeps its home on /faq. Only that
              one carries the FAQPage schema, so the two never compete for the
              same result.

              defaultOpen={-1}: every item here is an objection, and opening one
              on arrival answers a doubt the reader may not have had. */}
          <div className="mt-12">
            <FaqAccordion items={objectionItems} defaultOpen={-1} />
          </div>

          <p className="mt-8 text-sm text-muted" data-reveal data-reveal-group="objections">
            {COURSE.objections.footer.text}{' '}
            <a
              href={COURSE.objections.footer.cta.href}
              className="font-semibold text-ink underline underline-offset-2"
            >
              {COURSE.objections.footer.cta.label}
            </a>
            .
          </p>
        </div>
      </section>

      {/* 7. The last door, with the guarantee beside it rather than a screen
             below it. */}
      <section
        ref={closeRef}
        aria-labelledby="close-headline"
        className="section-band surface-deep"
      >
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

          {/* The price and the reversal again, at the point of the decision.
              Somebody who has read nine thousand pixels should not have to
              scroll back to the hero to remember what it costs. */}
          <p
            className="mt-5 text-sm leading-relaxed text-muted"
            data-reveal
            data-reveal-group="close"
          >
            <span className="font-semibold text-ink">
              {COURSE.price.value} {COURSE.price.suffix}
            </span>{' '}
            — {COURSE.price.thereafter}
            <br />
            {COURSE.price.reversal}
          </p>
        </div>
      </section>

      <AssuranceSection />
    </>
  );
}
