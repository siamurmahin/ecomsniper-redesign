import { useEffect, useRef, useState } from 'react';
import Seo from '../components/ui/Seo';
import ComparisonSection from '../sections/ComparisonSection';
import ComparisonCards from '../sections/comparison-lab/ComparisonCards';
import ComparisonGap from '../sections/comparison-lab/ComparisonGap';
import ComparisonLean from '../sections/comparison-lab/ComparisonLean';
import ComparisonNamed from '../sections/comparison-lab/ComparisonNamed';

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
    note: 'One table, 925px of feature name and both answers pinned to the far right — 986px from a row to its own tick.',
    render: () => <ComparisonSection />,
  },
  {
    n: 'A',
    name: 'Two columns (current)',
    note: 'Where we got to: scoreboard, red misses, brand edge on the winning column, concession and a door. Static.',
    render: (id) => <ComparisonCards id={id} />,
  },
  {
    n: 'D',
    name: 'The gap, opening',
    note: 'One grid instead of two lists, re-ordered into shared / only us / where they win, and the rows land 90ms apart — the five we win on flash as they arrive.',
    render: (id) => <ComparisonGap id={id} />,
  },
  {
    n: 'E',
    name: 'Cut to the argument',
    note: 'No matrix. The concession at headline size, the five differences as tiles, the shared four named in one line. Shortest by far.',
    render: (id) => <ComparisonLean id={id} />,
  },
  {
    n: 'F',
    name: 'Named competitors — shape only',
    note: 'Layout for a three-way comparison, competitor cells deliberately blank. Needs the client to supply names and verified data per row.',
    render: (id) => <ComparisonNamed id={id} />,
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
