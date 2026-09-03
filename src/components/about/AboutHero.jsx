import CtaButton from '../ui/CtaButton';

/**
 * The About hero.
 *
 * Chosen from three shapes tried on a throwaway `/about-lab`; the photograph
 * and centred variants lost and left with it. This one follows the homepage:
 * two columns, with the dark panel on the right in the same family as the
 * hero's product panel, so About reads as the same site.
 *
 * No images and no new dependencies — every class is already in the
 * stylesheet.
 */

/** Shared: eyebrow + headline, used by all three. */
function Title({ eyebrow, headline, align = 'left' }) {
  return (
    <>
      <p
        className={`section-eyebrow ${align === 'center' ? 'justify-center' : ''}`}
        data-reveal
        data-reveal-group="hero"
      >
        {eyebrow}
      </p>
      <h1
        className={`mt-4 text-[length:var(--text-display)] leading-[0.98] ${
          align === 'center' ? 'mx-auto max-w-3xl text-balance' : 'max-w-2xl'
        }`}
        data-reveal
        data-reveal-group="hero"
      >
        {headline}
      </h1>
    </>
  );
}

/**
 * Variant A — the cost, as hours.
 *
 * The figure stops being a caption and becomes the page's thesis: $200 is not
 * a price, it is a number of hours, and the page's whole argument is that the
 * company does not know how many hours it was for you. The panel says that in
 * the shape of a receipt.
 *
 * The two rows are their own words from `cost.body[0]`, not new claims.
 */
function CostPanel({ figure, cost }) {
  return (
    <div
      className="card-ink shadow-float lg:justify-self-end"
      data-reveal
      data-reveal-group="hero-panel"
    >
      <p className="micro-label text-muted-dark">{figure.label}</p>

      <p className="mt-3 text-[3.25rem] font-extrabold leading-none tracking-[-0.04em] tabular-nums text-paper">
        {figure.value}
      </p>

      <dl className="mt-7 grid gap-3 border-t border-ink-line pt-6 text-sm">
        {cost.hours.map((row) => (
          <div key={row.who} className="grid grid-cols-[7.5rem_1fr] gap-4">
            <dt className="text-muted-dark">{row.who}</dt>
            <dd className="font-semibold text-paper">{row.what}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 border-t border-ink-line pt-5 font-serif text-lg italic leading-snug text-paper">
        {cost.unknown}
      </p>
    </div>
  );
}

export default function AboutHero({ about }) {
  const { eyebrow, headline, hours, statement, figure, cost, ctas } = about;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
      <div>
        <Title eyebrow={eyebrow} headline={headline} />

        {/* Their three short lines, run as separate lines on their page and
            missed on the first capture. Rules between them rather than commas:
            they are a tally, not a sentence. */}
        <ul className="mt-8 max-w-xs" data-reveal data-reveal-group="hero">
          {hours.map((line) => (
            <li
              key={line}
              className="border-t border-hairline py-2.5 text-[length:var(--text-lead)] font-semibold last:border-b"
            >
              {line}
            </li>
          ))}
        </ul>

        <p
          className="mt-7 max-w-md text-[length:var(--text-lead)] leading-relaxed text-muted"
          data-reveal
          data-reveal-group="hero"
        >
          {statement}
        </p>

        {/* The page had no door until its last screen. Someone arriving here
            from search could read the whole argument and find nothing to do
            with it. Same pair as the homepage hero, in About's order: the
            quiet door first, because this page tells people not to rush. */}
        <div
          className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
          data-reveal
          data-reveal-group="hero"
        >
          <CtaButton href={ctas.primary.href} intent="about-hero-pricing">
            {ctas.primary.label}
          </CtaButton>
          <CtaButton href={ctas.secondary.href} variant="secondary" intent="about-hero-playbook">
            {ctas.secondary.label}
          </CtaButton>
        </div>
      </div>

      <CostPanel figure={figure} cost={cost} />
    </div>
  );
}
