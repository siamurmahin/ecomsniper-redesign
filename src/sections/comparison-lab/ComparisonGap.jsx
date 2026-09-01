import { useEffect, useRef } from 'react';
import SectionHeading from '../../components/ui/SectionHeading';
import CtaButton from '../../components/ui/CtaButton';
import Icon from '../../components/ui/Icon';
import { COMPARISON } from '../../data/siteContent';
import { toneOf } from '../../lib/signalTones';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import { groupOf } from './groupRows';

/** Rows in reading order, each carrying the index its animation is timed from. */
const ORDERED = [...COMPARISON.rows]
  .map((row, i) => ({ row, group: groupOf(row), source: i }))
  .sort((a, b) => {
    const rank = { both: 0, ours: 1, theirs: 2 };
    return rank[a.group] - rank[b.group] || a.source - b.source;
  })
  .map((entry, i) => ({ ...entry, i }));

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

/**
 * 11 — the gap, opening.
 *
 * The static version was twenty-two rows of ticks at one weight, and the only
 * section left on the page with nothing happening in it. The argument is
 * unchanged; what changes is that the reader watches the two columns diverge
 * instead of scanning for where they do.
 *
 * Rows are re-ordered into shared / only ours / where they win, so the run
 * down the page is the argument itself. They land 90ms apart, and the five a
 * listing tool does not have flash as they arrive — that is the moment the
 * section exists for.
 *
 * The animation is CSS keyframes off each row's `--i`; this only sets an
 * attribute when the block is in view.
 */
export default function ComparisonGap({ id = 'comparison' }) {
  const sectionRef = useRevealOnScroll();
  const gridRef = useRef(null);
  const headlineId = `${id}-headline`;
  const gold = toneOf('gold');

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        grid.dataset.cmp = 'in';
        observer.disconnect();
      },
      { threshold: 0.25 },
    );
    observer.observe(grid);

    return () => observer.disconnect();
  }, []);

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

        <div ref={gridRef} className="mt-12 overflow-hidden rounded-3xl border border-hairline bg-white">
          {/* One grid, not two lists: the two answers sit on the same line as
              the feature, so the divergence is read across a single row. */}
          <div className="grid grid-cols-[minmax(0,1fr)_5.5rem_5.5rem] items-center gap-x-3 border-b border-hairline px-5 py-4 sm:grid-cols-[minmax(0,1fr)_8rem_8rem] sm:px-7">
            <span className="micro-label text-muted">Feature</span>
            <span className="text-center text-[0.8rem] font-extrabold">{COMPARISON.columns[0]}</span>
            <span className="text-center text-[0.8rem] font-medium text-muted">
              {COMPARISON.columns[1]}
            </span>
          </div>

          {ORDERED.map(({ row, group, i }) => (
            <div
              key={row.feature}
              data-cmp-row
              data-cmp-gap={group === 'ours' || undefined}
              style={{ '--i': i }}
              className="grid grid-cols-[minmax(0,1fr)_5.5rem_5.5rem] items-center gap-x-3 border-b border-hairline/60 px-5 py-3 last:border-0 sm:grid-cols-[minmax(0,1fr)_8rem_8rem] sm:px-7"
            >
              <span className="text-[0.9rem] leading-snug">
                {row.feature}
                {typeof row.us === 'string' && row.us !== 'partial' && (
                  <span className="ml-1.5 text-[0.78rem] font-semibold text-muted">({row.us})</span>
                )}
              </span>
              <span className="flex justify-center">
                <State value={row.us} strong />
              </span>
              <span className="flex justify-center">
                <State value={row.them} />
              </span>
            </div>
          ))}
        </div>


        <div
          data-reveal
          data-reveal-group="gap-concession"
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

        <div data-reveal data-reveal-group="gap-cta" className="mt-8">
          <CtaButton href={COMPARISON.cta.href} intent="comparison-pricing">
            {COMPARISON.cta.label}
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
