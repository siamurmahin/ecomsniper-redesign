import { ABOUT as EN_ABOUT } from '../content/en/about';
import { overlay as germanAbout } from '../content/de/about';
import { usePageContent } from '../hooks/usePageContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import SectionHeading from '../components/ui/SectionHeading';
import CtaButton from '../components/ui/CtaButton';
import Icon from '../components/ui/Icon';
import AboutHero from '../components/about/AboutHero';

/**
 * About.
 *
 * The page's argument is restraint, so it borrows the homepage's vocabulary —
 * ink panels, the bordered strip, the serif accent — in a quieter register. It
 * should read as the same site making a smaller claim, not as a second landing
 * page.
 *
 * Their two empty sections, "How this started" and "What you actually get",
 * are still absent. See `content/en/about.js`.
 */

/* Module scope so the hook memo has a stable dependency. */
const OVERLAYS = { de: germanAbout.ABOUT };

/**
 * Which hero shape is live.
 *
 * `/about-lab` renders all three. When one is chosen, inline it here and
 * delete the component's other branches, the lab route, and whichever content
 * keys the losing variants used.
 */
const HERO_VARIANT = 'cost';

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
 * Allah" — reused here to break six bands of body copy. It marks the sentence
 * the section wants remembered, so there is at most one per band.
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
  const { cost, giving, boundaries, responsibility, team, invitation } = ABOUT;

  return (
    <>
      <Band>
        <AboutHero about={ABOUT} variant={HERO_VARIANT} />
      </Band>

      <Band className="defer-render bg-paper-sunk [--defer-h:820px] lg:[--defer-h:560px]">
        <SectionHeading eyebrow={cost.eyebrow} headline={cost.headline} />
        <Prose body={cost.body} />
      </Band>

      {/* The giving. Their copy names three things in one sentence; showing
          them as three makes the section scannable without adding a claim. */}
      <Band className="defer-render [--defer-h:860px] lg:[--defer-h:600px]">
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
        <Pullquote>{giving.closer}</Pullquote>
      </Band>

      {/* The list that gives the page its spine. Numbered because each item is
          a separate promise, and a reader should be able to point at one. */}
      <Band className="defer-render bg-ink text-paper [--defer-h:1180px] lg:[--defer-h:720px]">
        <SectionHeading eyebrow={boundaries.eyebrow} headline={boundaries.headline} tone="ink" />

        <ol className="mt-10 grid gap-5 sm:grid-cols-2">
          {boundaries.items.map((item, index) => (
            <li key={item.lead} data-reveal data-reveal-group="boundaries" className="card-ink">
              <span className="micro-label tabular-nums text-muted-dark">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="mt-3 text-[length:var(--text-lead)] leading-relaxed">
                <strong className="font-semibold">{item.lead}</strong>{' '}
                <span className="text-muted-dark">{item.body}</span>
              </p>
            </li>
          ))}
        </ol>

        <Pullquote tone="ink">{boundaries.closer}</Pullquote>
      </Band>

      {/* The emotional core, and the only band given a rule. Five paragraphs in
          the same column as everything else read as filler; set apart, they
          read as the page meaning it. */}
      <Band className="defer-render [--defer-h:1080px] lg:[--defer-h:700px]">
        <div className="border-l-2 border-hairline pl-6 sm:pl-10">
          <SectionHeading eyebrow={responsibility.eyebrow} headline={responsibility.headline} />
          <Prose body={responsibility.body} />
        </div>
      </Band>

      <Band className="defer-render bg-paper-sunk [--defer-h:640px] lg:[--defer-h:460px]">
        <SectionHeading eyebrow={team.eyebrow} headline={team.headline} />
        <Prose body={team.body} />
      </Band>

      {/* The close. One door, no urgency — which is what the boundaries band
          three screens up just promised. */}
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
