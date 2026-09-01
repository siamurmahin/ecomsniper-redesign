import SectionHeading from '../../components/ui/SectionHeading';
import Icon from '../../components/ui/Icon';
import { COMPARISON } from '../../data/siteContent';
import { toneOf } from '../../lib/signalTones';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import { groupedRows } from './groupRows';

/**
 * 11 — option C, the losses first.
 *
 * The section is called an honest comparison, and the only part of it a reader
 * cannot get from the rest of the page is the part where we lose. Leading with
 * that buys the rest of the table: someone who has just been told the cheaper
 * option is cheaper reads the next block differently.
 *
 * The risk is real and worth stating — it hands the objection over before the
 * answer, and a reader who only skims the first block leaves with "it costs
 * more". That is the trade this option is making.
 */
export default function ComparisonLosses({ id = 'comparison' }) {
  const sectionRef = useRevealOnScroll();
  const headlineId = `${id}-headline`;
  const groups = Object.fromEntries(groupedRows().map((g) => [g.key, g]));
  const gold = toneOf('gold');
  const green = toneOf('green');

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

        {/* The concession, first and at size. */}
        <div
          data-reveal
          data-reveal-group="losses-first"
          className="mt-12 rounded-3xl border border-signal-gold/40 bg-signal-gold/[0.07] p-7 sm:p-9"
        >
          <p className={`micro-label ${gold.text}`}>{groups.theirs.label}</p>
          <p className="mt-3 max-w-2xl font-display text-xl font-extrabold leading-snug tracking-tight sm:text-2xl">
            {COMPARISON.concession}
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {groups.theirs.rows.map((row) => (
              <li key={row.feature} className="flex items-center gap-2.5 text-[0.92rem] font-semibold">
                <Icon name="check" className={`size-4 shrink-0 ${gold.text}`} aria-hidden="true" />
                {row.feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Then what the difference buys. */}
        <div
          data-reveal
          data-reveal-group="losses-ours"
          className="mt-6 rounded-3xl border border-hairline bg-white p-7 shadow-lift sm:p-9"
        >
          <p className={`micro-label ${green.text}`}>{groups.ours.label}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {groups.ours.rows.map((row) => (
              <li key={row.feature} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-signal-green text-ink">
                  <Icon name="check" className="size-3" aria-hidden="true" />
                </span>
                <span className="text-[0.95rem] leading-snug">
                  {row.feature}
                  {typeof row.us === 'string' && (
                    <span className="ml-1.5 text-[0.78rem] font-semibold text-muted">
                      ({row.us})
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* And the shared ground, compressed — nobody is choosing on these. */}
        <div
          data-reveal
          data-reveal-group="losses-both"
          className="mt-6 rounded-2xl border border-hairline bg-white/50 px-6 py-5"
        >
          <p className="micro-label text-muted">{groups.both.label}</p>
          <p className="mt-2.5 text-[0.92rem] leading-relaxed text-muted">
            {groups.both.rows.map((row) => row.feature).join(' · ')}
          </p>
        </div>

        <p
          data-reveal
          data-reveal-group="losses-closer"
          className="mt-8 max-w-2xl text-[0.92rem] leading-relaxed text-muted"
        >
          {COMPARISON.closer}
        </p>
      </div>
    </section>
  );
}
