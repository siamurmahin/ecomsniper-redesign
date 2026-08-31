import { useEffect, useRef, useState } from 'react';
import Seo from '../components/ui/Seo';
import FoundersSection from '../sections/FoundersSection';
import FoundersOrigin from '../sections/founders-lab/FoundersOrigin';
import FoundersStories from '../sections/founders-lab/FoundersStories';
import FoundersMessage from '../sections/founders-lab/FoundersMessage';
import FoundersBook from '../sections/founders-lab/FoundersBook';

/**
 * Internal comparison page for section 10. Delete this file, its route and
 * `src/sections/founders-lab/` once a direction is picked.
 *
 * There is no live version of this section to compare against — ecomsniper.io
 * has nine sections and none of them is a founders block. It is one of the
 * three the review added, so option 0 is the 29 Aug scaffold rather than
 * something real.
 */
const OPTIONS = [
  {
    n: 0,
    name: 'Live now',
    note: 'Two paragraphs and two bio cards — the same introduction §09 now makes with faces, 800px later.',
    render: () => <FoundersSection />,
  },
  {
    n: 'A',
    name: 'The origin',
    note: 'Stops introducing them, since §09 does that, and says why the software exists. Faces become a signature; each keeps its credential.',
    render: (id) => <FoundersOrigin id={id} />,
  },
  {
    n: 'B',
    name: 'Two stories',
    note: 'Both men kept, each with a story rather than a role and a line. §09 becomes the name-drop, this is the substance.',
    render: (id) => <FoundersStories id={id} />,
  },
  {
    n: 'C',
    name: 'The message',
    note: 'Register change: an ink band, their words at reading size, signed with both faces. Stands out because it is not another grid.',
    render: (id) => <FoundersMessage id={id} />,
  },
  {
    n: 'D',
    name: 'The book',
    note: 'Gives the section something to be about — the free playbook this site hands out was written by one of the two men in it, and nothing says so. Authorship needs confirming.',
    render: (id) => <FoundersBook id={id} />,
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
  const id = option.n === 0 ? 'founders' : `founders-opt-${option.n}`;

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

export default function FoundersLabPage() {
  return (
    <>
      <Seo
        title="Founders lab — internal"
        description="Internal comparison of section 10 shapes."
        path="/founders-lab"
        noindex
      />
      <div className="border-b border-hairline bg-paper-sunk py-10">
        <div className="site-shell">
          <p className="micro-label">Internal · not linked from the site</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Section 10 — three shapes
          </h1>
          <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
            Same copy, same tokens. The question is what this section is for now
            that §09 introduces both founders with their faces. Heights are
            measured live at your current width.
          </p>
        </div>
      </div>

      {OPTIONS.map((option) => (
        <LabOption key={option.n} option={option} />
      ))}
    </>
  );
}
