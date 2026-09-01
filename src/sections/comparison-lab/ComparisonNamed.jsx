import SectionHeading from '../../components/ui/SectionHeading';
import Icon from '../../components/ui/Icon';
import { COMPARISON } from '../../data/siteContent';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import { groupOf } from './groupRows';

/**
 * 11 — named competitors. THE SHAPE ONLY.
 *
 * The columns are deliberately unnamed and every competitor cell is blank.
 *
 * Naming a real company and then stating what it does or does not do is a
 * factual claim about somebody else's product. Those claims have to come from
 * the client, be checked against each tool's current pricing page, and be
 * re-checked when they change — a comparison that is wrong about a competitor
 * is worse than no comparison, and it is the kind of wrong that gets a letter.
 *
 * So this renders the layout and nothing else. To finish it the client
 * supplies: which tools buyers actually weigh this against, and a verified
 * yes/no/partial for each of the eleven rows, with the date checked.
 */
export default function ComparisonNamed({ id = 'comparison' }) {
  const sectionRef = useRevealOnScroll();
  const headlineId = `${id}-headline`;
  const placeholders = ['Competitor A', 'Competitor B'];

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={headlineId}
      className="section-band bg-paper-sunk"
    >
      <div className="site-shell">
        <SectionHeading
          eyebrow={COMPARISON.eyebrow}
          headline={<span id={headlineId}>{COMPARISON.headline}</span>}
          lead={COMPARISON.lead}
        />

        <p
          data-reveal
          data-reveal-group="named-warning"
          className="mt-8 flex items-start gap-2.5 rounded-2xl border border-dashed border-signal-red/40 bg-signal-red/[0.05] p-5 text-[0.88rem] leading-relaxed"
        >
          <Icon
            name="shield"
            className="mt-0.5 size-4 shrink-0 text-signal-red-deep"
            aria-hidden="true"
          />
          <span>
            <span className="font-semibold">Shape only — not shippable as is.</span> Every
            competitor cell is blank on purpose. Naming a tool and stating what it does is a
            factual claim about someone else&apos;s product: the names and a verified
            yes/no/partial for all eleven rows have to come from the client, with the date each
            was checked.
          </span>
        </p>

        <div
          data-reveal
          data-reveal-group="named-table"
          className="mt-6 overflow-x-auto rounded-3xl border border-hairline bg-white"
        >
          <div className="min-w-[40rem]">
            <div className="grid grid-cols-[minmax(0,1fr)_8rem_8rem_8rem] items-center gap-x-3 border-b border-hairline px-6 py-4">
              <span className="micro-label text-muted">Feature</span>
              <span className="text-center text-[0.8rem] font-extrabold">
                {COMPARISON.columns[0]}
              </span>
              {placeholders.map((name) => (
                <span
                  key={name}
                  className="text-center text-[0.8rem] font-medium text-muted/70 [font-variant:small-caps]"
                >
                  {name}
                </span>
              ))}
            </div>

            {COMPARISON.rows.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-[minmax(0,1fr)_8rem_8rem_8rem] items-center gap-x-3 border-b border-hairline/60 px-6 py-3 last:border-0"
              >
                <span className="text-[0.9rem] leading-snug">{row.feature}</span>

                <span className="flex justify-center">
                  {row.us === false ? (
                    <span className="grid size-5 place-items-center rounded-full bg-signal-red/12 text-signal-red-deep">
                      <Icon name="close" className="size-2.5" aria-label="Not included" />
                    </span>
                  ) : (
                    <span className="grid size-5 place-items-center rounded-full bg-signal-green text-ink">
                      <Icon name="check" className="size-3" aria-label="Included" />
                    </span>
                  )}
                </span>

                {placeholders.map((name) => (
                  <span key={name} className="flex justify-center" aria-label="Awaiting verified data">
                    <span className="h-px w-8 rounded bg-ink/15" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <p
          data-reveal
          data-reveal-group="named-note"
          className="mt-6 max-w-2xl text-[0.88rem] leading-relaxed text-muted"
        >
          Our own column is filled from `COMPARISON.rows`, so the two rows we lose —{' '}
          {COMPARISON.rows
            .filter((row) => groupOf(row) === 'theirs')
            .map((row) => row.feature.toLowerCase())
            .join(' and ')}{' '}
          — stay visible whoever the other columns turn out to be.
        </p>
      </div>
    </section>
  );
}
