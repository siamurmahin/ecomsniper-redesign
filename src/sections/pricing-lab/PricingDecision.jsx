import SectionHeading from '../../components/ui/SectionHeading';
import CtaButton from '../../components/ui/CtaButton';
import Icon from '../../components/ui/Icon';
import { PRICING } from '../../data/siteContent';
import { toneOf } from '../../lib/signalTones';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

/**
 * 12 — option C, the decision rather than the table.
 *
 * Nobody arriving here is choosing between three plans; they are choosing
 * whether to start at all. So the section states one price, what it includes,
 * and what happens if it turns out to be wrong — and the other two plans are a
 * single sentence pointing at the page that exists for them.
 *
 * The risk is that a reader who wants the volume plan has to click to find it.
 * That is the trade: fewer things on screen at the moment of the decision.
 */
export default function PricingDecision({ id = 'pricing' }) {
  const sectionRef = useRevealOnScroll();
  const headlineId = `${id}-headline`;
  const [featured, ...rest] = PRICING.plans;
  const green = toneOf('green');

  return (
    <section ref={sectionRef} id={id} aria-labelledby={headlineId} className="section-band">
      <div className="site-shell">
        <SectionHeading
          eyebrow={PRICING.eyebrow}
          align="center"
          headline={<span id={headlineId}>{PRICING.headline}</span>}
        />

        <div
          data-reveal
          data-reveal-group="pricing-decision"
          className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-[2rem] border border-ink-line bg-ink text-paper shadow-float"
        >
          <div className="grid gap-8 p-8 sm:p-11 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
            <div>
              <span className="inline-flex w-fit rounded-full bg-accent px-3 py-1 font-label text-[0.6rem] uppercase tracking-[0.16em] text-paper">
                Most people start here
              </span>

              <p className="mt-6 flex flex-wrap items-baseline gap-x-2.5">
                <span className="font-display text-[3.5rem] font-extrabold leading-none tracking-tight">
                  {featured.priceLabel}
                </span>
                <span className="text-sm text-muted-dark">{featured.priceSuffix}</span>
              </p>
              <p className="mt-2 text-sm text-accent-soft">{featured.thereafter}</p>

              <div className="mt-7">
                <CtaButton href={featured.cta.href} variant="onInk" intent="pricing-monthly">
                  {featured.cta.label}
                </CtaButton>
              </div>

              <p className="mt-4 flex items-start gap-2 text-[0.82rem] leading-relaxed text-paper">
                <Icon
                  name="shield"
                  className={`mt-0.5 size-4 shrink-0 ${green.onInk}`}
                  aria-hidden="true"
                />
                {featured.guarantee}
              </p>
            </div>

            <ul className="flex flex-col gap-2.5 lg:border-l lg:border-paper/12 lg:pl-12">
              {featured.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-[0.92rem]">
                  <Icon
                    name="checkCircle"
                    className={`mt-0.5 size-4 shrink-0 ${green.onInk}`}
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The other two, in one sentence. They exist, they are priced, and the
            page that compares them proprly is one click away. */}
        <p
          data-reveal
          data-reveal-group="pricing-rest"
          className="mx-auto mt-8 max-w-2xl text-center text-[0.92rem] leading-relaxed text-muted"
        >
          Listing in volume or running at scale?{' '}
          {rest.map((plan, index) => (
            <span key={plan.id}>
              {index > 0 && ' and '}
              <span className="font-semibold text-ink">{plan.name}</span> at {plan.priceLabel}{' '}
              {plan.priceSuffix}
            </span>
          ))}
          . Both are final sale.
        </p>

        <div data-reveal data-reveal-group="pricing-more" className="mt-6 text-center">
          <CtaButton href={PRICING.cta.href} variant="secondary" intent="pricing-details">
            {PRICING.cta.label}
          </CtaButton>
          <p className="mx-auto mt-5 max-w-2xl text-[0.85rem] leading-relaxed text-muted">
            {PRICING.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
