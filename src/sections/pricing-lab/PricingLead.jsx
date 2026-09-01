import SectionHeading from '../../components/ui/SectionHeading';
import CtaButton from '../../components/ui/CtaButton';
import Icon from '../../components/ui/Icon';
import { PRICING } from '../../data/siteContent';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import PlanCard from './PlanCard';

/**
 * 12 — option A, an actual preview.
 *
 * The section is called a pricing preview and is currently the whole pricing
 * table, repeated in full on `/pricing` from the same component. Most visitors
 * take the monthly plan, so it gets the room; the other two become one line
 * each, with their price, their term and a link.
 *
 * Nothing is hidden — both other plans still state what they cost and that
 * they are final sale. They just stop competing with the plan the section is
 * actually asking the reader to take.
 */
export default function PricingLead({ id = 'pricing' }) {
  const sectionRef = useRevealOnScroll();
  const headlineId = `${id}-headline`;
  const [featured, ...rest] = PRICING.plans;

  return (
    <section ref={sectionRef} id={id} aria-labelledby={headlineId} className="section-band">
      <div className="site-shell">
        <SectionHeading
          eyebrow={PRICING.eyebrow}
          align="center"
          headline={<span id={headlineId}>{PRICING.headline}</span>}
          lead={PRICING.lead}
        />

        <ul className="mx-auto mt-12 grid max-w-xl">
          <PlanCard plan={featured} />
        </ul>

        {/* The other two, stated rather than sold. */}
        <ul
          data-reveal
          data-reveal-group="pricing-rest"
          className="mx-auto mt-4 grid max-w-xl gap-3"
        >
          {rest.map((plan) => (
            <li
              key={plan.id}
              className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-2xl border border-hairline bg-white/50 px-5 py-4"
            >
              <span className="text-[0.95rem] font-semibold">{plan.name}</span>
              <span className="flex items-baseline gap-2">
                {plan.was && (
                  <span className="text-[0.85rem] text-muted line-through">{plan.was}</span>
                )}
                <span className="font-display text-lg font-extrabold tracking-tight">
                  {plan.priceLabel}
                </span>
                <span className="text-[0.82rem] text-muted">{plan.priceSuffix}</span>
              </span>
              <span className="ml-auto text-[0.78rem] text-muted">{plan.guarantee}</span>
            </li>
          ))}
        </ul>

        <div data-reveal data-reveal-group="pricing-more" className="mt-8 text-center">
          <CtaButton href={PRICING.cta.href} variant="secondary" intent="pricing-details">
            {PRICING.cta.label}
          </CtaButton>
          <p className="mx-auto mt-5 flex max-w-2xl items-start justify-center gap-2 text-[0.85rem] leading-relaxed text-muted">
            <Icon name="verified" className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {PRICING.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
