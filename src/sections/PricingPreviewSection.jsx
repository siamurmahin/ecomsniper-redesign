import SectionHeading from '../components/ui/SectionHeading';
import CtaButton from '../components/ui/CtaButton';
import { PRICING } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

/**
 * 12 — Pricing preview. New section.
 *
 * The review's sharpest finding: the "$" symbol appeared nowhere on the
 * homepage, so most visitors never learned the price because most visitors
 * never load /pricing. All three plans are stated here, each with its own
 * refund terms, so the guarantee reads the same way on every page.
 */
/**
 * @param {object} props
 * @param {boolean} [props.showHeading] Set false where the page already has its
 *   own h1 for the plans, so /pricing does not state the same headline twice.
 */
export default function PricingPreviewSection({ showHeading = true }) {
  const sectionRef = useRevealOnScroll();

  return (
    <section
      ref={sectionRef}
      id="pricing"
      {...(showHeading ? { 'aria-labelledby': 'pricing-headline' } : { 'aria-label': 'Plans' })}
      className={showHeading ? 'section-band' : 'pb-20 pt-4 sm:pb-24 lg:pb-32'}
    >
      <div className="site-shell">
        {showHeading && (
          <SectionHeading
            eyebrow={PRICING.eyebrow}
            align="center"
            headline={<span id="pricing-headline">{PRICING.headline}</span>}
            lead={PRICING.lead}
          />
        )}

        <ul className={`grid items-stretch gap-4 lg:grid-cols-3 ${showHeading ? 'mt-14' : ''}`}>
          {PRICING.plans.map((plan) => (
            <li
              key={plan.id}
              data-reveal
              data-reveal-group="pricing-plans"
              className={`flex flex-col rounded-3xl border p-7 transition-[transform,box-shadow] duration-400 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 sm:p-8 ${
                plan.featured
                  ? 'border-ink bg-ink text-paper shadow-float lg:-my-3 lg:py-11'
                  : 'border-hairline bg-white/60 hover:shadow-lift'
              }`}
            >
              {plan.featured && (
                <span className="mb-5 inline-flex w-fit rounded-full bg-accent px-3 py-1 font-label text-[0.6rem] uppercase tracking-[0.16em] text-paper">
                  Most people start here
                </span>
              )}

              <h3 className="text-lg font-extrabold tracking-tight">{plan.name}</h3>
              <p className={`mt-1 text-sm ${plan.featured ? 'text-muted-dark' : 'text-muted'}`}>
                {plan.summary}
              </p>

              <p className="mt-6 flex flex-wrap items-baseline gap-x-2.5">
                {/* The price this one is struck down from, where there is one.
                    The client's pricing page lists the credits bundle at $597
                    before $499; this site was showing only the lower number and
                    dropping a real discount. */}
                {plan.was && (
                  <span
                    className={`text-lg font-semibold line-through ${
                      plan.featured ? 'text-muted-dark' : 'text-muted'
                    }`}
                  >
                    {plan.was}
                  </span>
                )}
                <span className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                  {plan.priceLabel}
                </span>
                <span className={`text-sm ${plan.featured ? 'text-muted-dark' : 'text-muted'}`}>
                  {plan.priceSuffix}
                </span>
              </p>
              <p
                className={`mt-1 text-sm ${plan.featured ? 'text-accent-soft' : 'text-muted'}`}
              >
                {plan.thereafter}
                {plan.saving && <span className="ml-1.5 font-semibold">{plan.saving}</span>}
              </p>

              {/* Stated, not implied: "billed every 3 months" does not say the
                  cycle repeats, and the client's page calls it recurring. */}
              {plan.recurring && (
                <p className={`mt-1 text-xs ${plan.featured ? 'text-muted-dark' : 'text-muted'}`}>
                  {plan.recurring}
                </p>
              )}

              <ul className="mt-7 flex flex-1 flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[0.88rem]">
                    <span
                      aria-hidden="true"
                      className={`mt-1.5 grid size-4 shrink-0 place-items-center rounded-full text-[0.55rem] ${
                        plan.featured ? 'bg-accent-soft/20 text-accent-soft' : 'bg-ebay-green/15 text-ebay-green'
                      }`}
                    >
                      ✓
                    </span>
                    <span className={plan.featured ? '' : 'text-muted'}>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Refund terms are per-plan, which is what removes the old contradiction. */}
              <p
                className={`mt-6 text-xs ${plan.featured ? 'text-accent-soft' : 'text-muted'}`}
              >
                {plan.guarantee}
              </p>

              <div className="mt-6">
                <CtaButton
                  href={plan.cta.href}
                  variant={plan.featured ? 'onInk' : 'secondary'}
                  intent={`pricing-${plan.id}`}
                  className="w-full"
                >
                  {plan.cta.label}
                </CtaButton>
              </div>
            </li>
          ))}
        </ul>

        <div
          data-reveal
          data-reveal-group="pricing-footer"
          className="mt-10 flex flex-col items-center gap-5 text-center"
        >
          <CtaButton href={PRICING.cta.href} variant="secondary" intent="pricing-full-details">
            {PRICING.cta.label}
          </CtaButton>

          {/* Deck: state the real cost of entry rather than let it ambush them. */}
          <p className="max-w-2xl text-xs leading-relaxed text-muted">{PRICING.footnote}</p>
        </div>
      </div>
    </section>
  );
}
