import { ABOUT as EN_ABOUT } from '../content/en/about';
import { overlay as germanAbout } from '../content/de/about';
import { usePageContent } from '../hooks/usePageContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import SectionHeading from '../components/ui/SectionHeading';
import CtaButton from '../components/ui/CtaButton';
import Icon from '../components/ui/Icon';

/**
 * About.
 *
 * Six bands of prose and one numbered list, which is why there is a local
 * `Prose` rather than six copies of the same paragraph markup. The page's
 * argument is carried by the words, so the layout gets out of their way: one
 * measure, one rhythm, no cards.
 *
 * The two sections their page renders empty — "How this started" and "What you
 * actually get" — are not here. Nothing was invented to fill them, and a
 * heading over silence reads worse than an absence. See `content/en/about.js`.
 */

/**
 * One band, with its own reveal scope.
 *
 * The scope is the point. `useRevealOnScroll` buckets `[data-reveal]` by group
 * name across everything under its ref and triggers each bucket off its FIRST
 * element — so one ref around all seven bands would put every `SectionHeading`
 * into a single `"heading"` group and reveal the last one when the first band
 * scrolled in. Every homepage section calls the hook on its own ref for
 * exactly this reason; a page of bands has to do the same.
 */
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

/* Module scope so the hook memo has a stable dependency. The German file
   keeps its `overlay = { ABOUT }` shape even though this page unwraps it,
   because `de/` mirrors `en/` filename for filename and key for key — a
   translator should not have to know which pages are route-scoped. */
const OVERLAYS = { de: germanAbout.ABOUT };

export default function AboutPage() {
  const ABOUT = usePageContent(EN_ABOUT, OVERLAYS);

  return (
    <>
      {/* The opening. Their page leads with the figure, and it earns the
          position: the whole argument is what that number cost the reader. */}
      <Band>
        <p className="section-eyebrow" data-reveal data-reveal-group="hero">
          {ABOUT.eyebrow}
        </p>

        <h1
          className="mt-4 max-w-3xl text-[length:var(--text-display)] leading-[0.98]"
          data-reveal
          data-reveal-group="hero"
        >
          {ABOUT.headline}
        </h1>

        <div
          className="mt-10 inline-flex items-baseline gap-3 rounded-2xl border border-hairline bg-paper-sunk px-6 py-4"
          data-reveal
          data-reveal-group="hero"
        >
          <span className="text-4xl font-extrabold tracking-tight tabular-nums">
            {ABOUT.figure.value}
          </span>
          <span className="micro-label text-muted">{ABOUT.figure.label}</span>
        </div>
      </Band>

      <Band className="defer-render bg-paper-sunk [--defer-h:820px] lg:[--defer-h:560px]">
        <SectionHeading eyebrow={ABOUT.cost.eyebrow} headline={ABOUT.cost.headline} />
        <Prose body={ABOUT.cost.body} />
      </Band>

      <Band className="defer-render [--defer-h:760px] lg:[--defer-h:520px]">
        <SectionHeading eyebrow={ABOUT.giving.eyebrow} headline={ABOUT.giving.headline} />
        <Prose body={ABOUT.giving.body} />
        <p
          data-reveal
          data-reveal-group="closer"
          className="mt-7 max-w-2xl border-l-2 border-hairline pl-5 text-sm text-muted"
        >
          {ABOUT.giving.closer}
        </p>
      </Band>

      {/* The list that gives the page its spine. Numbered because each item is
          a separate promise, and a reader should be able to point at one. */}
      <Band className="defer-render bg-ink text-paper [--defer-h:1180px] lg:[--defer-h:720px]">
        <SectionHeading
          eyebrow={ABOUT.boundaries.eyebrow}
          headline={ABOUT.boundaries.headline}
          tone="ink"
        />

        <ol className="mt-10 grid gap-5 sm:grid-cols-2">
          {ABOUT.boundaries.items.map((item, index) => (
            <li
              key={item.lead}
              data-reveal
              data-reveal-group="boundaries"
              className="rounded-2xl border border-ink-line bg-paper/[0.04] p-6"
            >
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

        <p
          data-reveal
          data-reveal-group="closer"
          className="mt-8 text-[length:var(--text-lead)] text-muted-dark"
        >
          {ABOUT.boundaries.closer}
        </p>
      </Band>

      <Band className="defer-render [--defer-h:1080px] lg:[--defer-h:700px]">
        <SectionHeading
          eyebrow={ABOUT.responsibility.eyebrow}
          headline={ABOUT.responsibility.headline}
        />
        <Prose body={ABOUT.responsibility.body} />
      </Band>

      <Band className="defer-render bg-paper-sunk [--defer-h:640px] lg:[--defer-h:460px]">
        <SectionHeading eyebrow={ABOUT.team.eyebrow} headline={ABOUT.team.headline} />
        <Prose body={ABOUT.team.body} />
      </Band>

      {/* The close. One door, no urgency — which is what the boundaries band
          three screens up just promised. */}
      <Band className="defer-render [--defer-h:900px] lg:[--defer-h:620px]">
        <SectionHeading eyebrow={ABOUT.invitation.eyebrow} headline={ABOUT.invitation.headline} />
        <Prose body={ABOUT.invitation.body} />

        <div
          className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          data-reveal
          data-reveal-group="close"
        >
          <CtaButton href={ABOUT.invitation.cta.href} intent="about-to-pricing">
            {ABOUT.invitation.cta.label}
          </CtaButton>

          <p className="inline-flex items-center gap-2 text-sm text-muted">
            <Icon name="shield" className="size-4 shrink-0" aria-hidden="true" />
            {ABOUT.invitation.assurance}
          </p>
        </div>

        <p
          data-reveal
          data-reveal-group="close"
          className="mt-10 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted"
        >
          {ABOUT.invitation.closer}
        </p>
      </Band>
    </>
  );
}
