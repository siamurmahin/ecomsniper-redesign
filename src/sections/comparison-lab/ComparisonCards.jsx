import SectionHeading from '../../components/ui/SectionHeading';
import Icon from '../../components/ui/Icon';
import { COMPARISON } from '../../data/siteContent';
import { toneOf } from '../../lib/signalTones';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import { groupOf } from './groupRows';

/**
 * A single row's state in one of the two columns.
 *
 * The green is `signal-green-deep`, not the brand green. The live section used
 * the raw value as text, which is about 2.4:1 on paper — the reason the deep
 * variant exists at all.
 */
function State({ value, strong }) {
  if (value === false) {
    return (
      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-ink/[0.06] text-muted">
        <Icon name="close" className="size-2.5" aria-label="Not included" />
      </span>
    );
  }

  if (value === 'partial') {
    return (
      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-signal-gold/20 text-signal-gold-deep">
        <span aria-label="Partly included" className="text-[0.7rem] font-bold">
          ~
        </span>
      </span>
    );
  }

  return (
    <span
      className={`grid size-5 shrink-0 place-items-center rounded-full ${
        strong ? 'bg-signal-green text-ink' : 'bg-signal-green/15 text-signal-green-deep'
      }`}
    >
      <Icon name="check" className="size-3" aria-label="Included" />
    </span>
  );
}

/** One column of the comparison, read top to bottom on its own. */
function Column({ title, subtitle, side, strong }) {
  return (
    <div
      className={`rounded-3xl border p-6 sm:p-8 ${
        strong
          ? 'border-ink/15 bg-white shadow-float'
          : 'border-hairline bg-white/50'
      }`}
    >
      <p className="micro-label text-muted">{subtitle}</p>
      <p
        className={`mt-2 font-display text-xl font-extrabold tracking-tight sm:text-2xl ${
          strong ? '' : 'text-muted'
        }`}
      >
        {title}
      </p>

      <ul className="mt-6 flex flex-col gap-3">
        {COMPARISON.rows.map((row) => {
          const value = side === 'us' ? row.us : row.them;
          const isLoss = side === 'us' && groupOf(row) === 'theirs';

          return (
            <li key={row.feature} className="flex items-start gap-3">
              <State value={value} strong={strong && value === true} />
              <span
                className={`text-[0.9rem] leading-snug ${
                  value === false || isLoss ? 'text-muted' : ''
                }`}
              >
                {row.feature}
                {typeof value === 'string' && value !== 'partial' && (
                  <span className="ml-1.5 text-[0.78rem] font-semibold text-muted">({value})</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * 11 — option A, two columns instead of a table.
 *
 * The live table put 925px of feature name between the row and its own tick:
 * the eye travelled 986px from "Bulk lister" to the mark that answers it. Two
 * columns are read down rather than across, so nothing has to be tracked.
 *
 * Both columns list all eleven rows so each one can be read on its own —
 * a column showing only what it has is a brochure, not a comparison.
 */
export default function ComparisonCards({ id = 'comparison' }) {
  const sectionRef = useRevealOnScroll();
  const headlineId = `${id}-headline`;

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
          data-reveal-group="comparison-columns"
          className="mt-12 grid gap-5 md:grid-cols-2"
        >
          <Column
            subtitle="What most tools give you"
            title={COMPARISON.columns[1]}
            side="them"
          />
          <Column subtitle="What you get here" title={COMPARISON.columns[0]} side="us" strong />
        </div>

        {/* The concession, stated rather than left to two dashes. */}
        <p
          data-reveal
          data-reveal-group="comparison-closer"
          className="mt-8 flex items-start gap-2.5 text-[0.95rem] font-semibold"
        >
          <Icon
            name="verified"
            className={`mt-0.5 size-4 shrink-0 ${toneOf('gold').text}`}
            aria-hidden="true"
          />
          {COMPARISON.concession}
        </p>

        <p
          data-reveal
          data-reveal-group="comparison-closer"
          className="mt-3 max-w-2xl text-[0.92rem] leading-relaxed text-muted"
        >
          {COMPARISON.closer}
        </p>
      </div>
    </section>
  );
}
