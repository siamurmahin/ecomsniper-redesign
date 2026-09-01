import SectionHeading from '../../components/ui/SectionHeading';
import CtaButton from '../../components/ui/CtaButton';
import Icon from '../../components/ui/Icon';
import { COMPARISON } from '../../data/siteContent';
import { toneOf } from '../../lib/signalTones';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import { groupedRows } from './groupRows';

const DIFF_TONES = ['blue', 'red', 'gold', 'green', 'blue'];

/**
 * 11 — cut to the argument.
 *
 * By the time a reader reaches this section the page has spent 3,600px
 * proving the software, the support and the training. Listing them again as
 * ticks is the third telling, and a feature matrix is the least interesting
 * way to tell it.
 *
 * So the matrix goes. What is left is the only thing no other section says: a
 * bare listing tool is cheaper, and here is what the difference buys. The four
 * shared rows are named in one line — nobody chooses on them — and the five
 * that differ are set at a size worth reading.
 */
export default function ComparisonLean({ id = 'comparison' }) {
  const sectionRef = useRevealOnScroll();
  const headlineId = `${id}-headline`;
  const groups = Object.fromEntries(groupedRows().map((g) => [g.key, g]));
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
        />

        {/* The concession, first and at headline size. It is the sentence that
            buys the rest of the section. */}
        <p
          data-reveal
          data-reveal-group="lean-concession"
          className="mt-6 max-w-3xl font-display text-[length:var(--text-section)] font-extrabold leading-[1.1] tracking-tight"
        >
          {COMPARISON.concession}
        </p>

        <p
          data-reveal
          data-reveal-group="lean-concession"
          className="mt-5 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-muted"
        >
          {COMPARISON.closer}
        </p>

        {/* What the difference buys, one tile each rather than a tick each. */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {groups.ours.rows.map((row, index) => {
            const tone = toneOf(DIFF_TONES[index % DIFF_TONES.length]);
            return (
              <li
                key={row.feature}
                data-reveal
                data-reveal-group="lean-diff"
                className="relative overflow-hidden rounded-2xl border border-hairline bg-white p-5 shadow-lift"
              >
                <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-[3px] ${tone.rule}`} />
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-gradient-to-br to-transparent blur-2xl ${tone.wash}`}
                />
                <span className="relative block font-display text-[0.95rem] font-extrabold leading-snug tracking-tight">
                  {row.feature}
                </span>
                {typeof row.us === 'string' && (
                  <span className="relative mt-2 block text-[0.78rem] font-semibold text-muted">
                    {row.us}
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        {/* The shared ground, said once and small — it is table stakes, and
            pretending otherwise is what made the matrix feel like padding. */}
        <p
          data-reveal
          data-reveal-group="lean-both"
          className="mt-8 max-w-3xl text-[0.9rem] leading-relaxed text-muted"
        >
          <span className={`font-semibold ${gold.text}`}>Everything else is even.</span>{' '}
          {groups.both.rows.map((row) => row.feature).join(', ')} — a decent listing tool does all
          of that too, and we are not pretending otherwise.
        </p>

        <p
          data-reveal
          data-reveal-group="lean-proof"
          className="mt-6 flex items-start gap-2.5 text-[0.88rem] leading-relaxed text-muted"
        >
          <Icon name="verified" className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {COMPARISON.proofNote}
        </p>

        <div data-reveal data-reveal-group="lean-cta" className="mt-9">
          <CtaButton href={COMPARISON.cta.href} intent="comparison-pricing">
            {COMPARISON.cta.label}
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
