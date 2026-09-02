import Seo from '../components/ui/Seo';
import Icon from '../components/ui/Icon';
import PricingPreviewSection from '../sections/PricingPreviewSection';
import ComparisonSection from '../sections/ComparisonSection';
import FaqSection from '../sections/FaqSection';
import AssuranceSection from '../sections/AssuranceSection';
import { useContent } from '../hooks/useContent';
import { toneOf } from '../lib/signalTones';

/** The four things a member gets, one tone each, in the order they reach them. */
const PROMISE_TONES = ['blue', 'red', 'green', 'gold'];

/**
 * /pricing — the same plan data as the homepage preview, never a second set of
 * numbers. Reusing the section component is what guarantees the price and the
 * refund terms can never drift between the two pages.
 */
export default function PricingPage() {
  const { PRICING, SITE, SEO, ASSURANCE } = useContent();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'EcomSniper',
    description: 'eBay dropshipping software, training and community.',
    brand: { '@type': 'Brand', name: 'EcomSniper' },
    offers: PRICING.plans.map((plan) => ({
      '@type': 'Offer',
      name: plan.name,
      price: plan.priceLabel.replace(/[$,]/g, ''),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    })),
  };

  return (
    <>
      <Seo
        title={SEO.pricing.title}
        description={SEO.pricing.description}
        path="/pricing"
        schema={schema}
      />

      {/* Page title lives above the reused section so /pricing still has an h1. */}
      <div className="site-shell pb-12 pt-36 sm:pt-44">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="section-eyebrow">{PRICING.page.eyebrow}</p>

            <h1 className="mt-5 max-w-2xl text-[length:var(--text-hero)] leading-[0.95]">
              {PRICING.page.headline}
            </h1>

            <p className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted">
              {PRICING.page.lead}
            </p>
          </div>

          {/* The page asks a question, so the second column answers it before
              a single price is read. Ink, because it is the answer and not a
              sidebar: the three plan cards below it are the argument, this is
              what makes trying any of them safe. */}
          <aside className="relative overflow-hidden rounded-3xl border border-ink-line bg-ink p-7 text-paper shadow-float sm:p-8">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-signal-green/25 blur-3xl"
            />

            <div className="relative flex items-start gap-4">
              {/* The seal, drawn rather than fetched: two words and a ring. */}
              <span
                aria-hidden="true"
                className="grid size-16 shrink-0 place-items-center rounded-full border-2 border-signal-green/50 text-center font-label text-[0.62rem] uppercase leading-tight tracking-[0.08em] text-signal-green-soft"
              >
                {ASSURANCE.guarantee.seal.top}
                <br />
                {ASSURANCE.guarantee.seal.bottom}
              </span>

              <div>
                <h2 className="font-display text-lg font-extrabold leading-tight tracking-tight sm:text-xl">
                  {PRICING.page.guarantee.title}
                </h2>
                <p className="mt-1 micro-label text-signal-green-soft">
                  {PRICING.page.guarantee.note}
                </p>
              </div>
            </div>

            {/* One tone each, in the order the four things reach a member:
                the training, the software, the community, then the guarantee
                standing behind all three. */}
            <ul className="relative mt-6 grid gap-2.5 border-t border-paper/12 pt-6 sm:grid-cols-2">
              {PRICING.page.guarantee.promises.map((promise, index) => {
                const tone = toneOf(PROMISE_TONES[index % PROMISE_TONES.length]);

                return (
                  <li
                    key={promise.text}
                    className="flex items-center gap-3 text-[0.9rem] leading-snug"
                  >
                    <span
                      aria-hidden="true"
                      className={`grid size-7 shrink-0 place-items-center rounded-full bg-paper/[0.07] ${tone.onInk}`}
                    >
                      <Icon name={promise.icon} className="size-3.5" />
                    </span>
                    {promise.text}
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>

      <PricingPreviewSection showHeading={false} />
      {/* On this page the section's own door would point at the page it is
          already on, so it sends the reader to signup instead. */}
      <ComparisonSection cta={SITE.startCta} />
      <FaqSection />
      {/* Its closer is the same four lines the header already carries. */}
      <AssuranceSection showCloser={false} />
    </>
  );
}
