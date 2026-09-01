import { useEffect, useRef, useState } from 'react';
import Seo from '../components/ui/Seo';
import PricingPreviewSection from '../sections/PricingPreviewSection';
import PricingCardsFixed from '../sections/pricing-lab/PricingCardsFixed';
import PricingLead from '../sections/pricing-lab/PricingLead';
import PricingDecision from '../sections/pricing-lab/PricingDecision';
import PricingLiveCards from '../sections/pricing-lab/PricingLiveCards';
import PricingLiveFull from '../sections/pricing-lab/PricingLiveFull';

/**
 * Internal comparison page for section 12. Delete this file, its route and
 * `src/sections/pricing-lab/` once a direction is picked.
 *
 * Note before choosing: `PricingPreviewSection` is rendered twice — here as
 * section 12 and again on `/pricing` with `showHeading={false}`. Anything that
 * shows fewer than three plans has to have the cards pulled into their own
 * component first, or the pricing page loses its table.
 */
const OPTIONS = [
  {
    n: 0,
    name: 'Live now',
    note: 'Three full cards. Also the entire plan table on /pricing, from this same component.',
    render: () => <PricingPreviewSection />,
  },
  {
    n: 'A',
    name: 'A real preview',
    note: 'The monthly plan in full, the other two as one priced line each. Nothing hidden — they still state cost and refund terms.',
    render: (id) => <PricingLead id={id} />,
  },
  {
    n: 'B',
    name: 'Three cards, corrected',
    note: 'Same shape, with the $597 anchor, the $98 saving and the recurring term the live pricing page states and this site was dropping.',
    render: (id) => <PricingCardsFixed id={id} />,
  },
  {
    n: 'C',
    name: 'The decision',
    note: 'One price, what it includes, what happens if it is wrong. The other two plans are a sentence.',
    render: (id) => <PricingDecision id={id} />,
  },
  {
    n: 'D',
    name: 'The live card structure',
    note: 'Their card order and hierarchy: featured centre and raised, CTA directly under the price, refund terms beneath it, icon and badge per plan. Our plan names kept.',
    render: (id) => <PricingLiveCards id={id} />,
  },
  {
    n: 'F',
    name: 'Live, header and all',
    note: 'D plus the reassurance block their page runs above the cards — guarantee pill, no questions asked, and four chips in the four signal tones.',
    render: (id) => <PricingLiveFull id={id} />,
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
  const id = option.n === 0 ? 'pricing' : `pricing-opt-${option.n}`;

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

export default function PricingLabPage() {
  return (
    <>
      <Seo
        title="Pricing lab — internal"
        description="Internal comparison of section 12 shapes."
        path="/pricing-lab"
        noindex
      />
      <div className="border-b border-hairline bg-paper-sunk py-10">
        <div className="site-shell">
          <p className="micro-label">Internal · not linked from the site</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Section 12 — four shapes
          </h1>
          <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
            Every price is checked against ecomsniper.io/pricing. What varies is
            how much of the pricing page the homepage repeats. Heights are
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
