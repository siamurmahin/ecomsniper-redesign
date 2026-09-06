import { ABOUT as EN_ABOUT } from '../content/en/about';
import { overlay as germanAbout } from '../content/de/about';
import { usePageContent } from '../hooks/usePageContent';
import { useContent } from '../hooks/useContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { toneOf } from '../lib/signalTones';
import { GIVING_IMAGES, SAMMY_PORTRAIT } from '../assets/giving';
import CtaButton from '../components/ui/CtaButton';
import HeroSurface from '../components/hero/HeroSurface';
import PipelinePanel from '../components/hero/PipelinePanel';
import TextType from '../components/reactbits/TextType';
import MarkedHeadline from '../components/ui/MarkedHeadline';
import Icon from '../components/ui/Icon';
import AssuranceSection from '../sections/AssuranceSection';

/**
 * About.
 *
 * Parked on 4 Sep after four passes at the hero, and resumed 7 Sep with the
 * two open questions answered: the hero is the review wall, and the offer
 * moves up. `AboutHeroLab.jsx` is deleted in the same commit — what it
 * established is recorded here and in `SESSION-NOTES-04-SEP.md` §9, and a lab
 * kept "just in case" is a second version of a page that will drift.
 *
 * ## The section order is not theirs
 *
 * Their page runs: the cost, how this started, the giving, the boundaries,
 * when things do not work out, **what you actually get**, the team, the
 * invitation. The offer — the only section that says what a reader receives in
 * exchange for money — is seventh, after four screens of ethics.
 *
 * Here it is third, straight after the cost. The argument this page makes is
 * "we know what this costs you, here is what you get, and here is how we
 * behave"; theirs makes the reader take the ethics on trust before telling
 * them what they are buying. Everything else keeps their order, because the
 * rest of it builds properly — origin, giving, boundaries, responsibility all
 * earn each other in that sequence.
 *
 * ## What is theirs and what is not
 *
 * Every word is theirs, from the 4 Sep re-capture in
 * `docs/source-copy/about.md`. The 3 Sep capture recorded two of these
 * sections as empty headings and the page was nearly built without them; they
 * were being read before their site had hydrated.
 *
 * Two departures, both standing rules: the refund line is qualified to the
 * monthly plan, and the hero has a door — their page's first call to action is
 * on the last screen, which on the page written for the reader who is *not*
 * ready is the one place a door is genuinely needed.
 *
 * The giving gallery is five photographs, not their six. The sixth was an
 * Unsplash stock image captioned "Moments that matter", among five real ones,
 * three screens below a promise not to create false impressions.
 */

/* Module scope so the hook memo has a stable dependency. */
const OVERLAYS = { de: germanAbout.ABOUT };

/* One colour logic for the whole page, the same one the course page uses:
   blue, gold, green in the order things are read. Red is deliberately absent
   from all three — on this site it means the thing that went wrong, and it is
   spent on the boundaries section, where something has. */
const OFFER_TONES = ['blue', 'gold', 'green'];
const OFFER_ICONS = ['robot', 'headset', 'people'];
const GIVING_TONES = ['blue', 'gold', 'green'];
const GIVING_ICONS = ['home', 'shield', 'graduationCap'];
const ORIGIN_TONES = ['blue', 'gold', 'green'];

/** A band of prose: eyebrow, headline, paragraphs. The shape most of this page is. */
function ProseBand({ id, section, tone = '', children, lead }) {
  const ref = useRevealOnScroll();

  return (
    <section ref={ref} aria-labelledby={`${id}-headline`} className={`section-band ${tone}`.trim()}>
      <div className="site-shell">
        <div className="max-w-3xl">
          <p className="section-eyebrow" data-reveal data-reveal-group={id}>
            {section.eyebrow}
          </p>

          <h2
            id={`${id}-headline`}
            className="mt-4 text-[length:var(--text-section)] leading-[1.05]"
            data-reveal
            data-reveal-group={id}
          >
            {section.headline}
          </h2>

          {lead ? (
            <p
              className="mt-5 font-serif text-xl leading-relaxed italic text-muted"
              data-reveal
              data-reveal-group={id}
            >
              {lead}
            </p>
          ) : null}

          {section.body ? (
            <div className="mt-6 grid gap-5">
              {section.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[length:var(--text-lead)] leading-relaxed text-muted"
                  data-reveal
                  data-reveal-group={id}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
        </div>

        {children}
      </div>
    </section>
  );
}

export default function AboutPage() {
  const ABOUT = usePageContent(EN_ABOUT, OVERLAYS);
  const { SITE } = useContent();
  /* False on the server and on the hydrating render, so the markup matches;
     true afterwards for a visitor who has asked the OS to reduce motion, who
     gets all three lines at once instead of a caret that never rests. */
  const isStatic = useReducedMotion();
  const costRef = useRevealOnScroll();
  const originRef = useRevealOnScroll();
  const givingRef = useRevealOnScroll();
  const boundariesRef = useRevealOnScroll();
  const teamRef = useRevealOnScroll();
  const invitationRef = useRevealOnScroll();

  return (
    <>
      {/* The homepage's shape: the argument on the left, the software working
          on the right.

          It carried a wall of drifting reviews until 7 Sep. Eight review cards
          were competing with the one sentence this page exists to say, and
          they answered a question nobody asks on an About page — the reviews
          are in `TestimonialsSection` further down, where they are the subject
          rather than the wallpaper.

          What belongs beside the copy is what the company actually does, so it
          is `PipelinePanel`: the same demo the homepage runs, ending on the
          same offer. */}
      <HeroSurface className="surface-deep">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="section-eyebrow" data-reveal data-reveal-group="about-hero">
              {ABOUT.eyebrow}
            </p>

            <h1
              className="mt-5 max-w-[18ch] text-[length:var(--text-hero)] leading-[0.98]"
              data-reveal
              data-reveal-group="about-hero"
            >
              <MarkedHeadline parts={ABOUT.headlineParts} />
            </h1>

            {/* Their three lines, typed one after another — the homepage's own
              device, the one that cycles WHILE YOU SLEEP / WORK / COMMUTE.

              Set as three stacked lines they were a list of complaints read
              at a glance. Typed one at a time they take as long to read as
              they took to live, which is the sentence underneath them: when
              you pay for something you are giving us hours of your life.

              The accessible name is all three at once — the typed copy is
              mid-word most of the time, and a screen reader should get the
              whole thought rather than "The late shif". */}
            <p
              className="mt-8 flex min-h-[2.25rem] items-center font-display text-xl font-extrabold text-ink"
              data-reveal
              data-reveal-group="about-hero"
            >
              <span className="sr-only">{ABOUT.hours.join(' ')}</span>

              <span aria-hidden="true">
                {isStatic ? (
                  ABOUT.hours.join(' ')
                ) : (
                  <TextType
                    as="span"
                    text={ABOUT.hours}
                    typingSpeed={62}
                    deletingSpeed={30}
                    pauseDuration={1900}
                    initialDelay={700}
                    loop
                  />
                )}
              </span>
            </p>

            <p
              className="mt-8 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-muted"
              data-reveal
              data-reveal-group="about-hero"
            >
              <MarkedHeadline parts={ABOUT.statementParts} />
            </p>

            {/* The door their page does not have until its last screen. */}
            <div
              className="mt-10 flex flex-wrap items-center gap-4"
              data-reveal
              data-reveal-group="about-hero"
            >
              <CtaButton href={ABOUT.ctas.primary.href}>{ABOUT.ctas.primary.label}</CtaButton>
              <CtaButton href={ABOUT.ctas.secondary.href} variant="secondary">
                {ABOUT.ctas.secondary.label}
              </CtaButton>
            </div>

            {/* Two figures that can be checked, rather than a row of invented
              avatars — on this page of all pages. The Trustpilot score is a
              link for the same reason: a number nobody can go and verify is
              worth less than no number. */}
            <dl
              className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-hairline pt-7"
              data-reveal
              data-reveal-group="about-hero"
            >
              <div className="flex items-baseline gap-2">
                <dt className="font-display text-lg font-extrabold text-ink">4.7</dt>
                <dd className="text-sm text-muted">
                  on{' '}
                  <a
                    href={SITE.trustpilotUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink underline underline-offset-2"
                  >
                    Trustpilot
                  </a>
                  , from 42 reviews
                </dd>
              </div>

              <div className="flex items-baseline gap-2">
                <dt className="font-display text-lg font-extrabold text-ink">
                  {ABOUT.figure.value}
                </dt>
                <dd className="text-sm text-muted">{ABOUT.figure.label}</dd>
              </div>
            </dl>
          </div>

          {/* The homepage's own panel, not a second version of it.
              One product through the software — found, listed, watched, paid —
              and then the ask, with the price on it. It answers the question a
              reader arrives at this page with, which is not "who are you" but
              "what is it you actually do", and it answers it by showing the
              thing working rather than describing it.

              It reads `HERO_PANEL` from the global deck, so the two pages
              cannot drift: change the demo once and it changes here too. */}
          <div data-reveal data-reveal-group="about-hero">
            <PipelinePanel />
          </div>
        </div>
      </HeroSurface>

      {/* 1. What it costs them. */}
      {/* The cost, as the comparison the copy is actually making.
          `cost.hours` and `cost.unknown` have been in the deck since 4 Sep
          with a note saying to delete them if no hero used them. Nothing ever
          did, and they are the best thing in the section: the same $200 is a
          few hours to one reader and a week to another, and the page's whole
          argument is that we cannot tell which you are. Shown as two figures
          either side of that sentence, it lands in a glance; buried as the
          first line of a paragraph it did not land at all. */}
      <section ref={costRef} aria-labelledby="cost-headline" className="section-band surface-rich">
        <div className="site-shell">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="section-eyebrow" data-reveal data-reveal-group="cost">
                {ABOUT.cost.eyebrow}
              </p>

              <h2
                id="cost-headline"
                className="mt-4 text-[length:var(--text-section)] leading-[1.05]"
                data-reveal
                data-reveal-group="cost"
              >
                {ABOUT.cost.headline}
              </h2>

              {/* The figure the page opens on, given its own weight here. */}
              <p
                className="mt-8 font-display text-[clamp(3rem,7vw,5rem)] leading-none font-extrabold text-ink"
                data-reveal
                data-reveal-group="cost"
              >
                {ABOUT.figure.value}
              </p>
              <p className="mt-2 text-sm text-muted" data-reveal data-reveal-group="cost">
                {ABOUT.figure.label}
              </p>

              <ul className="mt-10 grid gap-4">
                {ABOUT.cost.hours.map((entry, i) => {
                  const tone = toneOf(i === 0 ? 'blue' : 'gold');

                  return (
                    <li
                      key={entry.who}
                      data-reveal
                      data-reveal-group="cost"
                      className="card-raised relative overflow-hidden rounded-2xl border border-hairline bg-paper p-5 pl-6"
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute inset-y-0 left-0 w-1 ${tone.rule}`}
                      />
                      <p className={`micro-label ${tone.text}`}>{entry.who}</p>
                      <p className="mt-1 font-display text-lg leading-snug font-extrabold text-ink">
                        {entry.what}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <p
                className="mt-6 font-serif text-xl leading-relaxed italic text-ink"
                data-reveal
                data-reveal-group="cost"
              >
                {ABOUT.cost.unknown}
              </p>
            </div>

            <div className="grid content-center gap-5">
              {ABOUT.cost.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[length:var(--text-lead)] leading-relaxed text-muted"
                  data-reveal
                  data-reveal-group="cost"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. What they get for it — moved up from seventh on their page. */}
      <section aria-labelledby="offer-headline" className="section-band surface-deep">
        <div className="site-shell">
          <div className="max-w-3xl">
            <p className="section-eyebrow" data-reveal data-reveal-group="offer">
              {ABOUT.offer.eyebrow}
            </p>

            <h2
              id="offer-headline"
              className="mt-4 text-[length:var(--text-section)] leading-[1.05]"
              data-reveal
              data-reveal-group="offer"
            >
              {ABOUT.offer.headline}
            </h2>
          </div>

          {/* Three cards rather than three hairlines. Each takes the tone of
              what it is — the tools blue, the people gold, the community
              green — as a lit tile, a rule along the top and a wash out of the
              corner, which is the treatment the course page's steps use. Red
              stays out: it means the thing that went wrong. */}
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {ABOUT.offer.items.map((item, i) => {
              const tone = toneOf(OFFER_TONES[i]);

              return (
                <li
                  key={item.lead}
                  data-reveal
                  data-reveal-group="offer"
                  className="card-raised relative overflow-hidden rounded-2xl border border-hairline bg-paper p-7"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-1 ${tone.rule}`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -top-14 -right-14 size-36 rounded-full bg-gradient-to-br ${tone.wash} to-transparent`}
                  />

                  <span
                    aria-hidden="true"
                    className={`relative grid size-11 place-items-center rounded-xl ${tone.tile}`}
                  >
                    <Icon name={OFFER_ICONS[i]} className="size-5" />
                  </span>

                  <p className="relative mt-5 font-display text-lg leading-snug font-extrabold text-ink">
                    {item.lead}
                  </p>
                  <p className="relative mt-3 leading-relaxed text-muted">{item.body}</p>
                </li>
              );
            })}
          </ul>

          <p
            className="mt-10 max-w-3xl font-serif text-xl leading-relaxed italic text-muted"
            data-reveal
            data-reveal-group="offer"
          >
            {ABOUT.offer.closer}
          </p>
        </div>
      </section>

      {/* 3. How it started. */}
      {/* How it started, as the three beats it actually is: doing it by hand,
          building tools to stop, and the tools becoming a company. Three
          paragraphs in a column read as one block of text and the turn in the
          middle — the moment it stopped being their own problem — was
          invisible. Numbered and strung on a rule, the shape of the story is
          the shape of the section. */}
      <section
        ref={originRef}
        aria-labelledby="origin-headline"
        className="section-band surface-rich"
      >
        <div className="site-shell">
          <div className="max-w-3xl">
            <p className="section-eyebrow" data-reveal data-reveal-group="origin">
              {ABOUT.origin.eyebrow}
            </p>

            <h2
              id="origin-headline"
              className="mt-4 text-[length:var(--text-section)] leading-[1.05]"
              data-reveal
              data-reveal-group="origin"
            >
              {ABOUT.origin.headline}
            </h2>
          </div>

          <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {/* The rule the three beats are strung on. Behind the markers, and
                only where there is room for three across. */}
            <span
              aria-hidden="true"
              className="absolute top-6 right-[16%] left-[16%] hidden h-px bg-hairline md:block"
            />

            {ABOUT.origin.body.map((paragraph, i) => {
              const tone = toneOf(ORIGIN_TONES[i]);

              return (
                <li
                  key={paragraph}
                  data-reveal
                  data-reveal-group="origin"
                  className="relative flex gap-5 md:block"
                >
                  <span
                    aria-hidden="true"
                    className={`grid size-12 shrink-0 place-items-center rounded-full border-4 border-[color:var(--surface-rich-marker,transparent)] font-display text-sm font-extrabold ${tone.tile}`}
                    style={{ '--surface-rich-marker': '#efeeea' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <p className="leading-relaxed text-muted md:mt-6">{paragraph}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 4. The giving, and the photographs. */}
      <section
        ref={givingRef}
        aria-labelledby="giving-headline"
        className="section-band surface-deep"
      >
        <div className="site-shell">
          <div className="max-w-3xl">
            <p className="section-eyebrow" data-reveal data-reveal-group="giving">
              {ABOUT.giving.eyebrow}
            </p>

            <h2
              id="giving-headline"
              className="mt-4 text-[length:var(--text-section)] leading-[1.05]"
              data-reveal
              data-reveal-group="giving"
            >
              {ABOUT.giving.headline}
            </h2>

            <p
              className="mt-5 font-serif text-xl leading-relaxed italic text-muted"
              data-reveal
              data-reveal-group="giving"
            >
              {ABOUT.giving.lead}
            </p>
          </div>

          {/* Their one sentence names three things. Shown as three, because a
              list of what a company does with your money is the part a sceptic
              reads, and it was buried mid-paragraph. */}
          {/* This band is dark, so the cards are lit rather than printed: a
              glow in the tone behind each one, the tile at full strength, and
              the label in the tone's own light value. Three grey boxes on
              near-black was the flattest thing on the page. */}
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {ABOUT.giving.gifts.map((gift, i) => {
              const tone = toneOf(GIVING_TONES[i]);

              return (
                <li key={gift.label} data-reveal data-reveal-group="giving" className="relative">
                  <span
                    aria-hidden="true"
                    className={`absolute -inset-px rounded-2xl ${tone.rule} opacity-25 blur-md`}
                  />

                  <div className="relative h-full rounded-2xl border border-ink-line bg-ink-soft/90 p-7">
                    <span
                      aria-hidden="true"
                      className={`grid size-11 place-items-center rounded-xl ${tone.tile}`}
                    >
                      <Icon name={GIVING_ICONS[i]} className="size-5" />
                    </span>

                    <p
                      className={`mt-5 font-label text-sm tracking-[0.08em] uppercase ${tone.onInk}`}
                    >
                      {gift.label}
                    </p>
                    <p className="mt-2 text-[length:var(--text-lead)] leading-relaxed text-paper">
                      {gift.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 grid max-w-3xl gap-5">
            {ABOUT.giving.body.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[length:var(--text-lead)] leading-relaxed text-muted"
                data-reveal
                data-reveal-group="giving"
              >
                {paragraph}
              </p>
            ))}
            <p
              className="text-[length:var(--text-lead)] leading-relaxed text-muted"
              data-reveal
              data-reveal-group="giving"
            >
              {ABOUT.giving.everySubscription}
            </p>
          </div>

          {/* Five photographs, all the client's own. Lazy and dimensioned:
              they are four screens down, and a tile without a width and height
              moves the paragraph under it when the file lands. */}
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ABOUT.giving.gallery.map((tile) => {
              const image = GIVING_IMAGES[tile.image];
              if (!image) return null;

              return (
                <li key={tile.caption} data-reveal data-reveal-group="giving">
                  <figure>
                    <img
                      src={image.src}
                      width={image.width}
                      height={image.height}
                      alt={tile.alt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full rounded-2xl object-cover"
                    />
                    <figcaption className="mt-3 text-sm text-muted">{tile.caption}</figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>

          <p
            className="mt-10 max-w-3xl font-serif text-xl leading-relaxed italic text-muted"
            data-reveal
            data-reveal-group="giving"
          >
            {ABOUT.giving.closer}
          </p>
        </div>
      </section>

      {/* 5. The boundaries. */}
      <section
        ref={boundariesRef}
        aria-labelledby="boundaries-headline"
        className="section-band surface-rich"
      >
        <div className="site-shell">
          <div className="max-w-3xl">
            <p className="section-eyebrow" data-reveal data-reveal-group="boundaries">
              {ABOUT.boundaries.eyebrow}
            </p>

            <h2
              id="boundaries-headline"
              className="mt-4 text-[length:var(--text-section)] leading-[1.05]"
              data-reveal
              data-reveal-group="boundaries"
            >
              {ABOUT.boundaries.headline}
            </h2>
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {ABOUT.boundaries.items.map((item) => {
              const tone = toneOf(item.tone);

              return (
                <li
                  key={item.lead}
                  data-reveal
                  data-reveal-group="boundaries"
                  className="flex gap-5 card-raised rounded-2xl border border-hairline bg-paper p-6"
                >
                  <span
                    aria-hidden="true"
                    className={`grid size-11 shrink-0 place-items-center rounded-xl ${tone.tile}`}
                  >
                    <Icon name={item.icon} className="size-5" />
                  </span>

                  <span>
                    <span className="block font-display text-lg leading-snug font-extrabold text-ink">
                      {item.lead}
                    </span>
                    <span className="mt-2 block leading-relaxed text-muted">{item.body}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <p
            className="mt-10 max-w-3xl font-serif text-xl leading-relaxed italic text-muted"
            data-reveal
            data-reveal-group="boundaries"
          >
            {ABOUT.boundaries.closer}
          </p>
        </div>
      </section>

      {/* 6. When it does not work out. */}
      <ProseBand id="responsibility" section={ABOUT.responsibility} tone="surface-deep" />

      {/* 7. The team, and the founder's own line. */}
      <section ref={teamRef} aria-labelledby="team-headline" className="section-band surface-rich">
        <div className="site-shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-start lg:gap-16">
            <div className="max-w-3xl">
              <p className="section-eyebrow" data-reveal data-reveal-group="team">
                {ABOUT.team.eyebrow}
              </p>

              <h2
                id="team-headline"
                className="mt-4 text-[length:var(--text-section)] leading-[1.05]"
                data-reveal
                data-reveal-group="team"
              >
                {ABOUT.team.headline}
              </h2>

              <div className="mt-6 grid gap-5">
                {ABOUT.team.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[length:var(--text-lead)] leading-relaxed text-muted"
                    data-reveal
                    data-reveal-group="team"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* The portrait is 260px on their site and goes soft above about
                300px, so it is rendered small and beside the quote rather than
                as a hero image. Replace when a bigger one arrives — the layout
                takes it in the same slot. */}
            <figure
              data-reveal
              data-reveal-group="team"
              className="card-raised rounded-2xl border border-hairline bg-paper p-7"
            >
              <blockquote className="font-serif text-lg leading-relaxed italic text-ink">
                “{ABOUT.team.quote.text}”
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-4">
                <img
                  src={SAMMY_PORTRAIT.src}
                  width={SAMMY_PORTRAIT.width}
                  height={SAMMY_PORTRAIT.height}
                  alt={ABOUT.team.quote.portraitAlt}
                  loading="lazy"
                  decoding="async"
                  className="size-14 rounded-full object-cover"
                />
                <span>
                  <span className="block font-display text-base font-extrabold text-ink">
                    {ABOUT.team.quote.name}
                  </span>
                  <span className="font-label text-xs tracking-[0.12em] text-muted uppercase">
                    {ABOUT.team.quote.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 8. The invitation, which is the one place this page asks for anything. */}
      <section
        ref={invitationRef}
        aria-labelledby="invitation-headline"
        className="section-band surface-deep"
      >
        <div className="site-shell">
          <div className="max-w-3xl">
            <p className="section-eyebrow" data-reveal data-reveal-group="invitation">
              {ABOUT.invitation.eyebrow}
            </p>

            <h2
              id="invitation-headline"
              className="mt-4 text-[length:var(--text-section)] leading-[1.05]"
              data-reveal
              data-reveal-group="invitation"
            >
              {ABOUT.invitation.headline}
            </h2>

            <div className="mt-6 grid gap-5">
              {ABOUT.invitation.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[length:var(--text-lead)] leading-relaxed text-muted"
                  data-reveal
                  data-reveal-group="invitation"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div
              className="mt-9 flex flex-wrap items-center gap-4"
              data-reveal
              data-reveal-group="invitation"
            >
              <CtaButton href={ABOUT.invitation.cta.href}>{ABOUT.invitation.cta.label}</CtaButton>
              <CtaButton href={ABOUT.invitation.secondaryCta.href} variant="secondary">
                {ABOUT.invitation.secondaryCta.label}
              </CtaButton>
            </div>

            <p className="mt-5 text-sm text-muted" data-reveal data-reveal-group="invitation">
              {ABOUT.invitation.assurance}
            </p>

            <p
              className="mt-10 font-serif text-xl leading-relaxed italic text-ink"
              data-reveal
              data-reveal-group="invitation"
            >
              {ABOUT.invitation.closer}
            </p>
          </div>
        </div>
      </section>

      {/* The guarantee closes the page, as it does on every feature page: the
          last thing read before a decision should be what happens if it goes
          wrong. No FaqSection here — this page is not selling the software,
          and its own invitation already says take your time. */}
      <AssuranceSection />
    </>
  );
}
