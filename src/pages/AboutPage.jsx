import { ABOUT as EN_ABOUT } from '../content/en/about';
import { overlay as germanAbout } from '../content/de/about';
import { usePageContent } from '../hooks/usePageContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import SectionHeading from '../components/ui/SectionHeading';
import CtaButton from '../components/ui/CtaButton';
import Icon from '../components/ui/Icon';
import AboutHero from '../components/about/AboutHero';
import GivingGallery from '../components/about/GivingGallery';
import BoundaryStack from '../components/about/BoundaryStack';
import { SAMMY_PORTRAIT } from '../assets/giving';
import ProofBarSection from '../sections/ProofBarSection';
import { toneOf } from '../lib/signalTones';

/**
 * About.
 *
 * All nine of their sections, in their order. The 3 Sep build was missing two
 * of them — "How this started" and "What you actually get" — because the page
 * was read before it had hydrated and both looked empty. Re-captured 4 Sep;
 * see `docs/source-copy/about.md`.
 *
 * The page borrows the homepage's vocabulary — ink panels, the bordered strip,
 * signal tones, the serif accent — in a quieter register. It should read as the
 * same site making a smaller claim, not as a second landing page.
 */

/* Module scope so the hook memo has a stable dependency. */
const OVERLAYS = { de: germanAbout.ABOUT };

/** Tone per offer card, matched by index — the homepage's pillar idiom. */
const OFFER_TONES = ['blue', 'green', 'gold'];

function Band({ className = '', children }) {
  const ref = useRevealOnScroll();
  return (
    <section ref={ref} className={`section-band ${className}`.trim()}>
      <div className="site-shell">{children}</div>
    </section>
  );
}

/** A band's paragraphs at reading measure. */
function Prose({ body, tone = 'paper' }) {
  const color = tone === 'ink' ? 'text-muted-dark' : 'text-muted';
  return body.map((paragraph) => (
    <p
      key={paragraph}
      data-reveal
      data-reveal-group="prose"
      className={`mt-5 max-w-2xl text-[length:var(--text-lead)] leading-relaxed first:mt-7 ${color}`}
    >
      {paragraph}
    </p>
  ));
}

/**
 * A closing line, set as a statement rather than another paragraph.
 *
 * The serif italic is the homepage's own accent — the treatment on "In shaa
 * Allah" — reused to break the body copy. At most one per band.
 */
function Pullquote({ children, tone = 'paper' }) {
  return (
    <p
      data-reveal
      data-reveal-group="pullquote"
      className={`mt-10 max-w-xl font-serif text-[1.45rem] italic leading-snug ${
        tone === 'ink' ? 'text-paper' : 'text-ink'
      }`}
    >
      {children}
    </p>
  );
}

export default function AboutPage() {
  const ABOUT = usePageContent(EN_ABOUT, OVERLAYS);
  const { cost, origin, giving, boundaries, responsibility, offer, team, invitation } = ABOUT;

  return (
    <>
      <Band>
        <AboutHero about={ABOUT} />
      </Band>

      {/* The homepage's proof bar, in the same position it holds there. Six
          sections of this page claim the company treats people carefully; this
          is the only thing on it a reader can check. Its jump link is off —
          the target lives on the homepage, not here. */}
      <ProofBarSection showAnchorLink={false} />

      <Band className="defer-render bg-paper-sunk [--defer-h:820px] lg:[--defer-h:560px]">
        <SectionHeading eyebrow={cost.eyebrow} headline={cost.headline} />
        <Prose body={cost.body} />
      </Band>

      {/* How this started. Missing from the first build entirely. */}
      <Band className="defer-render [--defer-h:820px] lg:[--defer-h:560px]">
        <SectionHeading eyebrow={origin.eyebrow} headline={origin.headline} />
        <Prose body={origin.body} />
      </Band>

      {/* The giving. Their three-part sentence as three cells, then their
          gallery — the page's only photography and the reason it does not read
          as an essay. */}
      <Band className="defer-render bg-paper-sunk [--defer-h:1500px] lg:[--defer-h:1100px]">
        <SectionHeading eyebrow={giving.eyebrow} headline={giving.headline} />

        <p
          className="mt-7 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-muted"
          data-reveal
          data-reveal-group="giving-lead"
        >
          {giving.lead}
        </p>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-3">
          {giving.gifts.map((gift) => (
            <li key={gift.label} data-reveal data-reveal-group="gifts" className="bg-paper p-6">
              <p className="micro-label text-muted">{gift.label}</p>
              <p className="mt-3 leading-relaxed">{gift.body}</p>
            </li>
          ))}
        </ul>

        <Prose body={giving.body} />

        <p data-reveal data-reveal-group="giving-lead" className="mt-6 max-w-2xl font-semibold">
          {giving.everySubscription}
        </p>

        <GivingGallery items={giving.gallery} />

        <Pullquote>{giving.closer}</Pullquote>
      </Band>

      {/* Their pinned card stack. Four separate promises read as four
          objects; a bulleted list lets the eye slide off all of them at
          once. Paper, as on their page — the ink band was ours. */}
      <Band className="[--defer-h:1600px] lg:[--defer-h:1200px]">
        <SectionHeading eyebrow={boundaries.eyebrow} headline={boundaries.headline} />
        <BoundaryStack items={boundaries.items} />
        <Pullquote>{boundaries.closer}</Pullquote>
      </Band>

      {/* The emotional core, and the only band given a rule. Five paragraphs in
          the same column as everything else read as filler. */}
      <Band className="defer-render [--defer-h:1080px] lg:[--defer-h:700px]">
        <div className="border-l-2 border-hairline pl-6 sm:pl-10">
          <SectionHeading eyebrow={responsibility.eyebrow} headline={responsibility.headline} />
          <Prose body={responsibility.body} />
        </div>
      </Band>

      {/* What you actually get. Also missing from the first build. Three cards
          rather than three paragraphs, because it is the one section on the
          page that is a list of things. */}
      <Band className="defer-render bg-paper-sunk [--defer-h:900px] lg:[--defer-h:620px]">
        <SectionHeading eyebrow={offer.eyebrow} headline={offer.headline} />

        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {offer.items.map((item, index) => {
            const tone = toneOf(OFFER_TONES[index]);
            return (
              <li
                key={item.lead}
                data-reveal
                data-reveal-group="offer"
                className="group relative isolate overflow-hidden rounded-2xl border border-hairline bg-paper p-6 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-lift"
              >
                {/* The corner wash the hero tiles and pillar cards use. */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-10 -top-10 size-24 rounded-full bg-gradient-to-br to-transparent blur-2xl ${tone.wash}`}
                />
                <p className="relative font-semibold leading-snug">{item.lead}</p>
                <p className="relative mt-3 leading-relaxed text-muted">{item.body}</p>
              </li>
            );
          })}
        </ul>

        <Pullquote>{offer.closer}</Pullquote>
      </Band>

      {/* The team, and the founder quote that was missed the first time. */}
      <Band className="defer-render [--defer-h:900px] lg:[--defer-h:640px]">
        <SectionHeading eyebrow={team.eyebrow} headline={team.headline} />
        <Prose body={team.body} />

        <figure
          className="mt-12 grid max-w-3xl gap-6 rounded-2xl border border-hairline bg-paper-sunk p-6 sm:grid-cols-[7rem_1fr] sm:items-center sm:p-8"
          data-reveal
          data-reveal-group="founder"
        >
          <img
            src={SAMMY_PORTRAIT.src}
            alt={team.quote.portraitAlt}
            width={SAMMY_PORTRAIT.width}
            height={SAMMY_PORTRAIT.height}
            loading="lazy"
            decoding="async"
            className="size-24 rounded-full border border-hairline object-cover sm:size-28"
          />

          <div>
            <blockquote className="font-serif text-[1.35rem] italic leading-snug">
              {team.quote.text}
            </blockquote>
            <figcaption className="mt-4">
              <span className="font-semibold">{team.quote.name}</span>
              <span className="micro-label ml-3 text-muted">{team.quote.role}</span>
            </figcaption>
          </div>
        </figure>
      </Band>

      {/* The close. Two doors and no urgency, which is what the boundaries band
          promised: one costs money, one does not, and neither is a countdown. */}
      <Band className="defer-render [--defer-h:900px] lg:[--defer-h:620px]">
        <SectionHeading eyebrow={invitation.eyebrow} headline={invitation.headline} />
        <Prose body={invitation.body} />

        <div
          className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          data-reveal
          data-reveal-group="close"
        >
          <CtaButton href={invitation.cta.href} intent="about-to-pricing">
            {invitation.cta.label}
          </CtaButton>

          <CtaButton
            href={invitation.secondaryCta.href}
            variant="secondary"
            intent="about-to-playbook"
          >
            {invitation.secondaryCta.label}
          </CtaButton>

          <p className="inline-flex items-center gap-2 text-sm text-muted">
            <Icon name="shield" className="size-4 shrink-0" aria-hidden="true" />
            {invitation.assurance}
          </p>
        </div>

        <Pullquote>{invitation.closer}</Pullquote>
      </Band>
    </>
  );
}
