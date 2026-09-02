import SectionHeading from '../components/ui/SectionHeading';
import CtaButton from '../components/ui/CtaButton';
import Icon from '../components/ui/Icon';
import { useContent } from '../hooks/useContent';
import { toneOf } from '../lib/signalTones';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

/**
 * Which side a row falls on, worked out from its own values rather than
 * stored beside them: a row we do not have is a loss, a row they do not have
 * is a win, everything else is shared. Derived, so it cannot drift out of step
 * with the rows it describes.
 */
const groupOf = (row) => {
  if (row.us === false) return 'theirs';
  if (row.them === false) return 'ours';
  return 'both';
};

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
  const { COMPARISON } = useContent();
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
export default function ComparisonSection({ cta }) {
  const { COMPARISON, SITE } = useContent();
  /* Defaulted here, not in the signature: the deck is only known once
     the hook has run, and a parameter default runs before it. */
  const resolvedCta = cta ?? COMPARISON.cta;
  const sectionRef = useRevealOnScroll();
  const gold = toneOf('gold');


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

        <div
          data-reveal
          data-reveal-group="comparison-columns"
          className="mt-12 grid gap-5 md:grid-cols-2"
        >
          <Column subtitle="What most tools give you" title={COMPARISON.columns[1]} side="them" />
          <Column subtitle="What you get here" title={COMPARISON.columns[0]} side="us" strong />
        </div>

        {/* The close. An admission that ends on nothing converts nothing: the
            section hands the reader the cheaper option, so the answer to it
            has to be in the same box, with the price and the risk reversal
            attached. This is why it is ink rather than a gold tint — it is the
            end of the argument, not a footnote to the table. */}
        <div
          data-reveal
          data-reveal-group="comparison-close"
          className="relative mt-8 overflow-hidden rounded-3xl border border-ink-line bg-ink p-7 text-paper shadow-float sm:p-10"
        >
          {/* Gold, because this block belongs to the two rows they win. Kept
              to a wash behind the type rather than a filled surface. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-signal-gold/25 blur-3xl"
          />

          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12">
            <div>
              <p className={`micro-label ${gold.onInk}`}>{COMPARISON.groupLabels.theirs}</p>

              <p className="mt-4 max-w-xl font-display text-[length:var(--text-section)] font-extrabold leading-[1.1] tracking-tight">
                {COMPARISON.concession}
              </p>

              <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted-dark">
                {COMPARISON.closer}
              </p>

              <p className="mt-5 max-w-xl font-display text-lg font-bold leading-snug">
                {COMPARISON.pivot}
              </p>
            </div>

            {/* The door, with what it costs and what happens if it is wrong.
                Both sit beside the button rather than under the section, so
                the objection and its answer are read together. */}
            <div className="lg:border-l lg:border-paper/12 lg:pl-12">
              <CtaButton href={resolvedCta.href} variant="onInk" intent="comparison-pricing">
                {resolvedCta.label}
              </CtaButton>

              <ul className="mt-5 flex flex-col gap-2.5">
                <li className="flex items-start gap-2.5 text-[0.85rem] leading-relaxed text-paper">
                  <Icon
                    name="salesGrowth"
                    className="mt-0.5 size-4 shrink-0 text-signal-blue-soft"
                    aria-hidden="true"
                  />
                  {SITE.priceFrom}
                </li>
                <li className="flex items-start gap-2.5 text-[0.85rem] leading-relaxed text-paper">
                  <Icon
                    name="shield"
                    className="mt-0.5 size-4 shrink-0 text-signal-green-soft"
                    aria-hidden="true"
                  />
                  {SITE.guarantee}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
