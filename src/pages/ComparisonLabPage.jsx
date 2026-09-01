import { useEffect, useRef, useState } from 'react';
import Seo from '../components/ui/Seo';
import ComparisonSection from '../sections/ComparisonSection';
import ComparisonCards from '../sections/comparison-lab/ComparisonCards';
import ComparisonTable from '../sections/comparison-lab/ComparisonTable';
import ComparisonLosses from '../sections/comparison-lab/ComparisonLosses';

/**
 * Internal comparison page for section 11. Delete this file, its route and
 * `src/sections/comparison-lab/` once a direction is picked.
 *
 * No live counterpart: ecomsniper.io has nine sections and none of them is a
 * comparison. Like section 10, this is one of the three the review added, so
 * option 0 is the 29 Aug scaffold rather than something real.
 */
const OPTIONS = [
  {
    n: 0,
    name: 'Live now',
    note: 'One table, 925px of feature name and both answers pinned to the far right — 986px from a row to its own tick. Green ticks use the raw brand value as text.',
    render: () => <ComparisonSection />,
  },
  {
    n: 'A',
    name: 'Two columns',
    note: 'Read down, not across. Each column lists all eleven rows so it can be read on its own; the concession is stated under them.',
    render: (id) => <ComparisonCards id={id} />,
  },
  {
    n: 'B',
    name: 'The table, fixed',
    note: 'Still a table, which is the format buyers expect — but half-and-quarters so the answers sit beside the question, and banded into both / only us / where they win.',
    render: (id) => <ComparisonTable id={id} />,
  },
  {
    n: 'C',
    name: 'Losses first',
    note: 'Opens on the two rows we lose, then what the difference buys, then the shared ground compressed. Hands over the objection before the answer.',
    render: (id) => <ComparisonLosses id={id} />,
  },
];

/**
 * Measured after `document.fonts.ready`: the page is laid out in the fallback
 * face until the swap lands, and a number read before it is a number for a
 * font nobody sees.
 */
function useMeasuredHeight() {
  const ref = useRef(null);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const measure = () => setHeight(Math.round(el.getBoundingClientRect().height));
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    document.fonts?.ready.then(measure);

    return () => observer.disconnect();
  }, []);

  return [ref, height];
}

function LabOption({ option }) {
  const [ref, height] = useMeasuredHeight();
  const id = option.n === 0 ? 'comparison' : `comparison-opt-${option.n}`;

  return (
    <div>
      <div className="sticky top-0 z-30 border-y border-ink bg-ink px-5 py-3 text-paper">
        <div className="site-shell flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-signal-gold-soft">
            Option {option.n}
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">{option.name}</span>
          <span className="font-mono text-[0.72rem] text-muted-dark">
            {height === null ? 'measuring…' : `${height}px`}
          </span>
          <span className="w-full text-[0.8rem] leading-relaxed text-muted-dark sm:w-auto sm:flex-1">
            {option.note}
          </span>
        </div>
      </div>
      <div ref={ref}>{option.render(id)}</div>
    </div>
  );
}

export default function ComparisonLabPage() {
  return (
    <>
      <Seo
        title="Comparison lab — internal"
        description="Internal comparison of section 11 shapes."
        path="/comparison-lab"
        noindex
      />
      <div className="border-b border-hairline bg-white py-10">
        <div className="site-shell">
          <p className="micro-label">Internal · not linked from the site</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Section 11 — four shapes
          </h1>
          <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
            Same eleven rows, same copy. What varies is how the two lost rows
            are treated and how far the eye has to travel. Heights are measured
            live at your current width.
          </p>
        </div>
      </div>

      {OPTIONS.map((option) => (
        <LabOption key={option.n} option={option} />
      ))}
    </>
  );
}
