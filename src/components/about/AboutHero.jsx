/**
 * The About hero, in three shapes.
 *
 * Built as one component with a `variant` prop rather than three files,
 * because they share the eyebrow, the headline and the figure — only the
 * arrangement differs, and three copies would drift apart the first time the
 * copy changed.
 *
 * `/about-lab` renders all three for comparison. Once one is chosen the other
 * two and the lab route are deleted, which is how the homepage sections were
 * decided — see `docs/SESSION-NOTES-01-SEP.md`.
 *
 * None of the variants adds a byte to the first screen: no images, no new
 * dependencies, and every class is already in the stylesheet.
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

export default function AboutHero({ about, variant = 'cost' }) {
  const { eyebrow, headline, figure, cost } = about;

  /* C — text only, centred, so the empty half reads as intent not omission. */
  if (variant === 'centred') {
    return (
      <div className="text-center">
        <Title eyebrow={eyebrow} headline={headline} align="center" />

        <div className="mt-12" data-reveal data-reveal-group="hero">
          <p className="font-display text-[4rem] font-extrabold leading-none tracking-[-0.04em] tabular-nums">
            {figure.value}
          </p>
          <p className="micro-label mt-3 justify-center text-muted">{figure.label}</p>
        </div>
      </div>
    );
  }

  /* B — the layout a photograph would take, so the composition can be judged
     before the client supplies one. The placeholder is deliberately plain and
     labelled; it is not a design element and must not survive the choice. */
  if (variant === 'portrait') {
    return (
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <Title eyebrow={eyebrow} headline={headline} />
          <div
            className="mt-10 inline-flex items-baseline gap-3 rounded-2xl border border-hairline bg-paper-sunk px-6 py-4"
            data-reveal
            data-reveal-group="hero"
          >
            <span className="text-4xl font-extrabold tracking-tight tabular-nums">
              {figure.value}
            </span>
            <span className="micro-label text-muted">{figure.label}</span>
          </div>
        </div>

        <div
          className="grid aspect-[4/5] place-items-center rounded-2xl border border-dashed border-hairline bg-paper-sunk"
          data-reveal
          data-reveal-group="hero-panel"
        >
          <p className="micro-label max-w-[16ch] text-center leading-relaxed text-muted">
            Photograph from the client goes here
          </p>
        </div>
      </div>
    );
  }

  /* A — the default. */
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
      <div>
        <Title eyebrow={eyebrow} headline={headline} />
      </div>
      <CostPanel figure={figure} cost={cost} />
    </div>
  );
}
