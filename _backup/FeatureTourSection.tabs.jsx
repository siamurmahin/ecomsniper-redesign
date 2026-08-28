import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import { FEATURES } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { prefersReducedMotion } from '../lib/motion';

/**
 * A stand-in for the real product UI.
 *
 * The review called the existing grey mock-ups "unfinished", so this draws an
 * on-brand app frame instead of a placeholder rectangle. It is still a
 * representation, not a screenshot: swap `<AppFrame>` for real captures of the
 * dashboard when they are exported, keeping the same aspect ratio.
 */
function AppFrame({ activeIndex }) {
  const rows = [
    { label: 'Wireless earbuds, ANC', source: 'Amazon', price: '$24.10', sell: '$41.99', margin: '+$17.89' },
    { label: 'Stainless water bottle 1L', source: 'Amazon', price: '$11.40', sell: '$22.50', margin: '+$11.10' },
    { label: 'LED desk lamp, dimmable', source: 'Amazon', price: '$18.75', sell: '$34.99', margin: '+$16.24' },
    { label: 'Cable organiser, 6 pack', source: 'Amazon', price: '$6.20', sell: '$14.99', margin: '+$8.79' },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-line bg-ink-soft shadow-float">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-ink-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-ebay-red" />
        <span className="size-2.5 rounded-full bg-ebay-yellow" />
        <span className="size-2.5 rounded-full bg-ebay-green" />
        <span className="ml-3 font-label text-[0.65rem] tracking-wide text-muted-dark">
          ecomsniper / {['product-hunter', 'bulk-lister', 'monitor', 'orders'][activeIndex]}
        </span>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[1.6fr_0.7fr_0.7fr_0.8fr] gap-3 border-b border-ink-line px-4 py-2.5 font-label text-[0.6rem] uppercase tracking-[0.14em] text-muted-dark">
        <span>Item</span>
        <span>Cost</span>
        <span>List</span>
        <span className="text-right">Profit</span>
      </div>

      {/* Rows — the "scanned" row advances with the active feature. */}
      <ul>
        {rows.map((row, index) => {
          const isScanning = index === activeIndex;

          return (
            <li
              key={row.label}
              className={`grid grid-cols-[1.6fr_0.7fr_0.7fr_0.8fr] items-center gap-3 border-b border-ink-line/60 px-4 py-3 text-[0.78rem] transition-colors duration-500 ${
                isScanning ? 'bg-ebay-yellow/10' : ''
              }`}
            >
              <span className="flex min-w-0 items-center gap-2 text-paper">
                <span
                  className={`size-1.5 shrink-0 rounded-full transition-colors duration-500 ${
                    isScanning ? 'bg-ebay-yellow' : 'bg-ink-line'
                  }`}
                />
                <span className="truncate">{row.label}</span>
              </span>
              <span className="text-muted-dark">{row.price}</span>
              <span className="text-paper">{row.sell}</span>
              <span className="text-right font-medium text-ebay-green">{row.margin}</span>
            </li>
          );
        })}
      </ul>

      {/* Status strip reflects the selected capability. */}
      <div className="flex items-center justify-between px-4 py-3 text-[0.7rem]">
        <span className="flex items-center gap-2 text-muted-dark">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-2 rounded-full bg-ebay-green/60 animate-pulse-ring" />
            <span className="relative inline-flex size-2 rounded-full bg-ebay-green" />
          </span>
          {FEATURES.items[activeIndex].metric}
        </span>
        <span className="font-label text-muted-dark">live</span>
      </div>
    </div>
  );
}

/**
 * 07 — What the software does.
 *
 * Built as a proper tablist: four capabilities, one panel. It advances on its
 * own so a passive scroller still sees all four, but any interaction stops the
 * autoplay for good — an auto-rotating panel that fights the visitor is worse
 * than no motion at all.
 */
export default function FeatureTourSection() {
  const sectionRef = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const tabRefs = useRef([]);

  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion()) return undefined;

    const timer = window.setInterval(
      () => setActiveIndex((index) => (index + 1) % FEATURES.items.length),
      5200,
    );
    return () => window.clearInterval(timer);
  }, [isAutoPlaying]);

  const select = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  // Standard tablist keyboard support.
  const onKeyDown = (event) => {
    const last = FEATURES.items.length - 1;
    let next = null;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = activeIndex === last ? 0 : activeIndex + 1;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = activeIndex === 0 ? last : activeIndex - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = last;
    if (next === null) return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-labelledby="features-headline"
      className="section-band bg-paper-sunk"
    >
      <div className="site-shell">
        <SectionHeading
          eyebrow={FEATURES.eyebrow}
          headline={<span id="features-headline">{FEATURES.headline}</span>}
          lead={FEATURES.lead}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14">
          {/* ---------------------------------------------------------------- */}
          {/* Capability tabs                                                   */}
          {/* ---------------------------------------------------------------- */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="What the software does"
            onKeyDown={onKeyDown}
            className="flex flex-col"
          >
            {FEATURES.items.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={item.n}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  role="tab"
                  type="button"
                  id={`feature-tab-${index}`}
                  aria-selected={isActive}
                  aria-controls="feature-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(index)}
                  data-reveal
                  data-reveal-group="features"
                  className={`relative border-l-2 py-5 pl-6 pr-4 text-left transition-[border-color,opacity] duration-400 ${
                    isActive ? 'border-ink opacity-100' : 'border-hairline opacity-60 hover:opacity-90'
                  }`}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-label text-xs font-semibold text-ink/35">{item.n}</span>
                    <span className="text-lg font-extrabold tracking-tight sm:text-xl">
                      {item.title}
                    </span>
                  </span>

                  <span
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] ${
                      isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <span className="overflow-hidden">
                      <span className="block pt-2 text-[0.92rem] leading-relaxed text-muted">
                        {item.body}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}

            <p className="mt-8 pl-6 font-display text-lg font-bold">{FEATURES.closer}</p>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Product panel                                                     */}
          {/* ---------------------------------------------------------------- */}
          <div
            id="feature-panel"
            role="tabpanel"
            aria-labelledby={`feature-tab-${activeIndex}`}
            data-reveal
            data-reveal-group="features-panel"
            className="lg:sticky lg:top-28"
          >
            <AppFrame activeIndex={activeIndex} />
          </div>
        </div>
      </div>
    </section>
  );
}
