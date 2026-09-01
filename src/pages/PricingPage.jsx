import Seo from '../components/ui/Seo';
import Icon from '../components/ui/Icon';
import PricingPreviewSection from '../sections/PricingPreviewSection';
import ComparisonSection from '../sections/ComparisonSection';
import FaqSection from '../sections/FaqSection';
import AssuranceSection from '../sections/AssuranceSection';
import FinalCtaSection from '../sections/FinalCtaSection';
import { PRICING, SITE } from '../data/siteContent';

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
              {PRICING.page.headline}
            </h1>

            <p className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted">
              {PRICING.page.lead}
            </p>
          </div>

          {/* Fills the second column with the thing buyers are scanning for:
              what every plan carries, said once here rather than three times
              down the cards. */}
          <aside className="relative overflow-hidden rounded-3xl border border-hairline bg-white p-7 shadow-lift">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] bg-[image:var(--gradient-brand)]"
            />
            <h2 className="micro-label text-muted">{PRICING.page.includedLabel}</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {PRICING.page.included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.9rem] leading-snug">
                  {/* Was the raw brand green at about 2.4:1 on paper. */}
                  <span
                    aria-hidden="true"
                    className="mt-px grid size-[18px] shrink-0 place-items-center rounded-full bg-signal-green/15 text-signal-green-deep"
                  >
                    <Icon name="check" className="size-2.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      <PricingPreviewSection showHeading={false} />
      {/* On this page the section's own door would point at the page it is
          already on, so it sends the reader to signup instead. */}
      <ComparisonSection cta={{ label: 'Start for $97', href: SITE.signupUrl }} />
      <FaqSection />
      <AssuranceSection />
      <FinalCtaSection />
    </>
  );
}
