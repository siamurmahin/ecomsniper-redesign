import SectionHeading from '../../components/ui/SectionHeading';
import CtaButton from '../../components/ui/CtaButton';
import Icon from '../../components/ui/Icon';
import { COMPARISON } from '../../data/siteContent';
import { toneOf } from '../../lib/signalTones';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import { groupOf, groupedRows } from './groupRows';

/**
 * A row's state in one column.
 *
 * Green is `signal-green-deep` as text, never the brand value: the live
 * section used the raw green, which is about 2.4:1 on paper and is exactly
 * what the deep variants exist for. A miss is red rather than grey — grey
 * reads as "not applicable", and these are things the tool does not do.
 */
function State({ value, strong }) {
  if (value === false) {
    return (
      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-signal-red/12 text-signal-red-deep">
        <Icon name="close" className="size-2.5" aria-label="Not included" />
      </span>
    );
  }

  if (value === 'partial') {
    return (
      <span
        className="grid size-5 shrink-0 place-items-center rounded-full bg-signal-gold/20 text-[0.7rem] font-bold text-signal-gold-deep"
        aria-label="Partly included"
      >
        ~
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

/** One column, read top to bottom on its own. */
function Column({ subtitle, title, side, strong }) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-3xl border p-6 sm:p-8 ${
        strong ? 'border-ink/15 bg-white shadow-float' : 'border-hairline bg-white/45'
      }`}
    >
      {/* The winning column wears the brand ramp as an edge. One line, not a
          surface — the ramp already carries the hero mark and the primary
          button, and a third filled surface would stop it signalling. */}
      {strong && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] bg-[image:var(--gradient-brand)]"
        />
      )}

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
          const dimmed = value === false || (side === 'us' && groupOf(row) === 'theirs');

          return (
            <li key={row.feature} className="flex items-start gap-3">
              <State value={value} strong={strong && value === true} />
              <span className={`text-[0.9rem] leading-snug ${dimmed ? 'text-muted' : ''}`}>
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
 * 11 — Honest comparison.
 *
 * The live table put 925px of feature name between a row and its own answer:
 * 986px from "Bulk lister" to the tick resolving it. Two columns are read
 * down rather than across, so nothing has to be tracked.
 *
 * Both columns list all eleven rows so each can be read alone — a column
 * showing only what it has is a brochure, not a comparison.
 *
 * The scoreboard above them is counted from the rows themselves, so it can
 * never disagree with the lists underneath it.
 */
export default function ComparisonCards({ id = 'comparison' }) {
  const sectionRef = useRevealOnScroll();
  const headlineId = `${id}-headline`;
  const groups = groupedRows();
  const gold = toneOf('gold');

  const TALLY_TONES = { both: 'blue', ours: 'green', theirs: 'gold' };

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

        {/* The shape of the answer before the detail: how many rows fall each
            way. Counted from the data, so it cannot drift from the lists. */}
        <ul
          data-reveal
          data-reveal-group="comparison-tally"
          className="mt-10 grid gap-3 sm:grid-cols-3"
        >
          {groups.map((group) => {
            const tone = toneOf(TALLY_TONES[group.key]);
            return (
              <li
                key={group.key}
                className="flex items-baseline gap-3 rounded-2xl border border-hairline bg-white/60 px-5 py-4"
              >
                <span className={`font-display text-2xl font-extrabold leading-none ${tone.text}`}>
                  {group.rows.length}
                </span>
                <span className="text-[0.88rem] font-semibold leading-snug">{group.label}</span>
              </li>
            );
          })}
        </ul>

        <div
          data-reveal
          data-reveal-group="comparison-columns"
          className="mt-5 grid gap-5 md:grid-cols-2"
        >
          <Column subtitle="What most tools give you" title={COMPARISON.columns[1]} side="them" />
          <Column subtitle="What you get here" title={COMPARISON.columns[0]} side="us" strong />
        </div>

        {/* The four we win on are the four the page has already proved. */}
        <p
          data-reveal
          data-reveal-group="comparison-proof"
          className="mt-6 flex items-start gap-2.5 text-[0.88rem] leading-relaxed text-muted"
        >
          <Icon name="verified" className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {COMPARISON.proofNote}
        </p>

        {/* The concession, given its own ground. It is the reason to believe
            the rest of the section, so it is stated rather than left to two
            dashes at the bottom of a list. */}
        <div
          data-reveal
          data-reveal-group="comparison-concession"
          className="mt-8 rounded-3xl border border-signal-gold/40 bg-signal-gold/[0.07] p-6 sm:p-8"
        >
          <p className={`micro-label ${gold.text}`}>{COMPARISON.groupLabels.theirs}</p>
          <p className="mt-3 max-w-2xl font-display text-xl font-extrabold leading-snug tracking-tight sm:text-2xl">
            {COMPARISON.concession}
          </p>
          <p className="mt-4 max-w-2xl text-[0.92rem] leading-relaxed text-muted">
            {COMPARISON.closer}
          </p>
        </div>

        <div data-reveal data-reveal-group="comparison-cta" className="mt-8">
          <CtaButton href={COMPARISON.cta.href} intent="comparison-pricing">
            {COMPARISON.cta.label}
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
