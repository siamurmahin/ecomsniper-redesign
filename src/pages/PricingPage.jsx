import Seo from '../components/ui/Seo';
import PricingPreviewSection from '../sections/PricingPreviewSection';
import ComparisonSection from '../sections/ComparisonSection';
import FaqSection from '../sections/FaqSection';
import AssuranceSection from '../sections/AssuranceSection';
import FinalCtaSection from '../sections/FinalCtaSection';
import { PRICING } from '../data/siteContent';

/**
 * /pricing — the same plan data as the homepage preview, never a second set of
 * numbers. Reusing the section component is what guarantees the price and the
 * refund terms can never drift between the two pages.
 */
export default function PricingPage() {
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
        title="Pricing — EcomSniper eBay Dropshipping Software"
        description="Start for $97 your first month, then $199 a month, with a 30 day money back guarantee. Every plan includes the full Dropship Mastery course, the private community and 24/7 support."
        path="/pricing"
        schema={schema}
      />

      {/* Page title lives above the reused section so /pricing still has an h1. */}
      <div className="site-shell pb-12 pt-36 sm:pt-44">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="section-eyebrow">{PRICING.eyebrow}</p>

            <h1 className="mt-5 max-w-2xl text-[length:var(--text-hero)] leading-[0.95]">
              Three ways in. One guarantee.
            </h1>

            <p className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted">
              The monthly plan is the one most people start on, and the only one covered by the 30
              day money back guarantee. The other two trade that protection for a lower effective
              price.
            </p>
          </div>

          {/* Fills the second column with the thing buyers are scanning for. */}
          <aside className="rounded-3xl border border-hairline bg-white/60 p-7">
            <h2 className="micro-label text-muted">
              Included in every plan
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {[
                'The full Dropship Mastery course',
                'The private community',
                '24/7 human support',
                'Price and stock monitoring',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.9rem]">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 grid size-4 shrink-0 place-items-center rounded-full bg-ebay-green/15 text-[0.55rem] text-ebay-green"
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      <PricingPreviewSection showHeading={false} />
      <ComparisonSection />
      <FaqSection />
      <AssuranceSection />
      <FinalCtaSection />
    </>
  );
}
