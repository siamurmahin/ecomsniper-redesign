import SectionHeading from '../../components/ui/SectionHeading';
import Icon from '../../components/ui/Icon';
import { COMPARISON } from '../../data/siteContent';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import { groupedRows } from './groupRows';

/** A cell's state. Deep green as text; the brand value is a fill, not a colour to read. */
function Cell({ value, strong }) {
  if (value === true) {
    return (
      <span
        className={`mx-auto grid size-6 place-items-center rounded-full ${
          strong ? 'bg-signal-green text-ink' : 'bg-signal-green/15 text-signal-green-deep'
        }`}
      >
        <Icon name="check" className="size-3" aria-label="Included" />
      </span>
    );
  }

  if (value === false) {
    return (
      <span className="mx-auto grid size-6 place-items-center rounded-full bg-ink/[0.06] text-muted">
        <Icon name="close" className="size-2.5" aria-label="Not included" />
      </span>
    );
  }

  if (value === 'partial') {
    return (
      <span className="mx-auto block text-[0.78rem] font-semibold text-signal-gold-deep">
        Sometimes
      </span>
    );
  }

  return <span className="mx-auto block text-[0.78rem] font-semibold">{value}</span>;
}

/**
 * 11 — option B, the table kept but made readable.
 *
 * Two things were wrong with it. The feature column took 925px of 1,230 and
 * pushed both answers to the far right, so reading one row meant crossing
 * 986px of nothing; `table-fixed` with a half-and-quarters split puts the
 * answers beside the question. And the rows arrived in one undifferentiated
 * run of eleven, so the four we win on trust and the two we lose read the
 * same — they are banded now, with the losses named as such.
 */
export default function ComparisonTable({ id = 'comparison' }) {
  const sectionRef = useRevealOnScroll();
  const headlineId = `${id}-headline`;
  const groups = groupedRows();

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

        <div
          data-reveal
          data-reveal-group="comparison-table"
          className="mx-auto mt-12 max-w-4xl overflow-x-auto rounded-3xl border border-hairline bg-white"
        >
          <table className="w-full min-w-[32rem] table-fixed border-collapse text-left">
            <caption className="sr-only">
              Feature comparison between EcomSniper and a typical eBay listing tool
            </caption>

            <colgroup>
              <col className="w-1/2" />
              <col className="w-1/4" />
              <col className="w-1/4" />
            </colgroup>

            <thead>
              <tr className="border-b border-hairline">
                <th scope="col" className="px-5 py-4 text-sm font-semibold sm:px-7">
                  Feature
                </th>
                <th scope="col" className="px-4 py-4 text-center text-sm font-extrabold">
                  {COMPARISON.columns[0]}
                </th>
                <th scope="col" className="px-4 py-4 text-center text-sm font-medium text-muted">
                  {COMPARISON.columns[1]}
                </th>
              </tr>
            </thead>

            {groups.map((group) => (
              <tbody key={group.key}>
                <tr className="bg-paper-sunk/70">
                  <th
                    scope="colgroup"
                    colSpan={3}
                    className="px-5 py-2.5 text-left micro-label text-muted sm:px-7"
                  >
                    {group.label}
                  </th>
                </tr>

                {group.rows.map((row) => (
                  <tr key={row.feature} className="border-t border-hairline/70">
                    <th
                      scope="row"
                      className="px-5 py-3.5 text-[0.9rem] font-normal sm:px-7"
                    >
                      {row.feature}
                    </th>
                    <td className="px-4 py-3.5">
                      <Cell value={row.us} strong />
                    </td>
                    <td className="px-4 py-3.5">
                      <Cell value={row.them} />
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>

        <p
          data-reveal
          data-reveal-group="comparison-closer"
          className="mx-auto mt-7 max-w-4xl text-[0.92rem] leading-relaxed text-muted"
        >
          {COMPARISON.closer}
        </p>
      </div>
    </section>
  );
}
