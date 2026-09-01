import SectionHeading from '../../components/ui/SectionHeading';
import CtaButton from '../../components/ui/CtaButton';
import Icon from '../../components/ui/Icon';
import { COMPARISON } from '../../data/siteContent';
import { toneOf } from '../../lib/signalTones';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import { groupOf } from './groupRows';

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
    /* Filled red, with a paper glyph. The signal red carries paper at 4.3:1,
       which is why blue and red take a light glyph and green and gold take an
       ink one — a white cross on the green would miss even the 3:1 bar. */
    return (
      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-signal-red text-paper">
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
 * A counted scoreboard sat above these and was cut: it answered the section
 * before the columns did, and the two lists are the section.
 */
export default function ComparisonCards({ id = 'comparison' }) {
  const sectionRef = useRevealOnScroll();
  const headlineId = `${id}-headline`;
  const gold = toneOf('gold');


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
          <Column subtitle="What most tools give you" title={COMPARISON.columns[1]} side="them" />
          <Column subtitle="What you get here" title={COMPARISON.columns[0]} side="us" strong />
        </div>

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
