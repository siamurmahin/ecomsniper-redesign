import SectionHeading from '../components/ui/SectionHeading';
import { COMPARISON } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

/** Renders a cell value: true, false, "partial", or a short label. */
function ComparisonCell({ value, emphasis }) {
  if (value === true) {
    return (
      <span
        className={`grid size-6 place-items-center rounded-full text-xs ${
          emphasis ? 'bg-ebay-green/15 text-ebay-green' : 'bg-ink/8 text-ink/70'
        }`}
        role="img"
        aria-label="Included"
      >
        ✓
      </span>
    );
  }

  if (value === false) {
    return (
      <span
        className="grid size-6 place-items-center rounded-full bg-ink/5 text-xs text-muted"
        role="img"
        aria-label="Not included"
      >
        —
      </span>
    );
  }

  if (value === 'partial') {
    return (
      <span className="text-xs text-muted" role="img" aria-label="Partly included">
        Sometimes
      </span>
    );
  }

  return <span className="text-xs font-semibold text-ink">{value}</span>;
}

/**
 * 11 — Honest comparison. New section.
 *
 * Buyers compare three or four tools before deciding, so the review's argument
 * was that if we do not host the comparison, someone else does. Two rows are
 * deliberately lost — cheapest price and free plan — because a table we win
 * outright is a table nobody believes.
 */
export default function ComparisonSection() {
  const sectionRef = useRevealOnScroll();

  return (
    <section
      ref={sectionRef}
      id="comparison"
      aria-labelledby="comparison-headline"
      className="section-band bg-paper-sunk"
    >
      <div className="site-shell">
        <SectionHeading
          eyebrow={COMPARISON.eyebrow}
          headline={<span id="comparison-headline">{COMPARISON.headline}</span>}
          lead={COMPARISON.lead}
        />

        {/* Wide table scrolls inside its own container, never the page body. */}
        <div
          data-reveal
          data-reveal-group="comparison-table"
          className="mt-12 overflow-x-auto rounded-3xl border border-hairline bg-white/70"
        >
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <caption className="sr-only">
              Feature comparison between EcomSniper and a typical eBay listing tool
            </caption>

            <thead>
              <tr className="border-b border-hairline">
                <th scope="col" className="px-5 py-4 text-sm font-semibold sm:px-7">
                  Feature
                </th>
                <th
                  scope="col"
                  className="w-36 px-5 py-4 text-center text-sm font-extrabold sm:px-7"
                >
                  {COMPARISON.columns[0]}
                </th>
                <th
                  scope="col"
                  className="w-40 px-5 py-4 text-center text-sm font-medium text-muted sm:px-7"
                >
                  {COMPARISON.columns[1]}
                </th>
              </tr>
            </thead>

            <tbody>
              {COMPARISON.rows.map((row) => (
                <tr
                  key={row.feature}
                  className="border-b border-hairline/70 transition-colors duration-200 last:border-0 hover:bg-ink/[0.03]"
                >
                  <th
                    scope="row"
                    className="px-5 py-3.5 text-[0.9rem] font-normal sm:px-7"
                  >
                    {row.feature}
                  </th>
                  <td className="px-5 py-3.5 sm:px-7">
                    <span className="flex justify-center">
                      <ComparisonCell value={row.us} emphasis />
                    </span>
                  </td>
                  <td className="px-5 py-3.5 sm:px-7">
                    <span className="flex justify-center">
                      <ComparisonCell value={row.them} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p
          data-reveal
          data-reveal-group="comparison-closer"
          className="mt-7 max-w-2xl text-[0.92rem] leading-relaxed text-muted"
        >
          {COMPARISON.closer}
        </p>
      </div>
    </section>
  );
}
