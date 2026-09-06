import { ABOUT as EN_ABOUT } from '../content/en/about';
import { overlay as germanAbout } from '../content/de/about';
import { usePageContent } from '../hooks/usePageContent';
import { useContent } from '../hooks/useContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { toneOf } from '../lib/signalTones';
import { GIVING_IMAGES, SAMMY_PORTRAIT } from '../assets/giving';
import CtaButton from '../components/ui/CtaButton';
import HeroSurface from '../components/hero/HeroSurface';
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
  const givingRef = useRevealOnScroll();
  const boundariesRef = useRevealOnScroll();
  const teamRef = useRevealOnScroll();
  const invitationRef = useRevealOnScroll();

  return (
    <>
      {/* Centred, and without the review wall it carried until 7 Sep.
          The wall was the page's opening argument when the hero was a
          two-column composition on a pale ground; on the dark surface the
          words hold the screen on their own, and eight review cards beside
          them were competing with the one sentence this page exists to say.
          The reviews still appear — in `TestimonialsSection`, where they are
          the subject rather than the wallpaper. */}
      <HeroSurface className="surface-deep">
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-eyebrow" data-reveal data-reveal-group="about-hero">
            {ABOUT.eyebrow}
          </p>

          <h1
            className="mx-auto mt-5 max-w-[20ch] text-[length:var(--text-hero)] leading-[0.98]"
            data-reveal
            data-reveal-group="about-hero"
          >
            <MarkedHeadline parts={ABOUT.headlineParts} />
          </h1>

          {/* Their three short lines, set as three lines. Run together into a
              paragraph they are a sentence about tiredness; kept apart they
              are the reader's own week. */}
          <ul className="mt-8 grid gap-1" data-reveal data-reveal-group="about-hero">
            {ABOUT.hours.map((line) => (
              <li key={line} className="font-display text-xl font-extrabold text-ink">
                {line}
              </li>
            ))}
          </ul>

          <p
            className="mx-auto mt-8 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-muted"
            data-reveal
            data-reveal-group="about-hero"
          >
            <MarkedHeadline parts={ABOUT.statementParts} />
          </p>

          {/* The door their page does not have until its last screen. */}
          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
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
            className="mx-auto mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-hairline pt-7"
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
              <dt className="font-display text-lg font-extrabold text-ink">{ABOUT.figure.value}</dt>
              <dd className="text-sm text-muted">{ABOUT.figure.label}</dd>
            </div>
          </dl>
        </div>
      </HeroSurface>

      {/* 1. What it costs them. */}
      <ProseBand id="cost" section={ABOUT.cost} tone="surface-rich" />

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

          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {ABOUT.offer.items.map((item, i) => (
              <li
                key={item.lead}
                data-reveal
                data-reveal-group="offer"
                className="border-t-2 border-hairline pt-5"
              >
                <p className="font-display text-lg leading-snug font-extrabold text-ink">
                  {item.lead}
                </p>
                <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
                <span className="sr-only">{i + 1}</span>
              </li>
            ))}
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
      <ProseBand id="origin" section={ABOUT.origin} tone="surface-rich" />

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
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {ABOUT.giving.gifts.map((gift) => (
              <li
                key={gift.label}
                data-reveal
                data-reveal-group="giving"
                className="card-raised rounded-2xl border border-hairline bg-paper p-6"
              >
                <p className="font-label text-sm tracking-[0.08em] text-muted uppercase">
                  {gift.label}
                </p>
                <p className="mt-2 text-[length:var(--text-lead)] leading-relaxed text-ink">
                  {gift.body}
                </p>
              </li>
            ))}
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
