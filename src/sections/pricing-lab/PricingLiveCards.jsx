import SectionHeading from '../../components/ui/SectionHeading';
import CtaButton from '../../components/ui/CtaButton';
import { PRICING } from '../../data/siteContent';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import PlanCardLive from './PlanCardLive';
import { orderedPlans } from './orderedPlans';

/**
 * 12 — option D, the live card structure.
 *
 * Keeps our plan names. The live page calls the monthly plan "Dropship
 * Mastery", which is also the name of the course included in all three — the
 * collision an earlier review flagged, and the reason this site renamed it.
 */
export default function PricingLiveCards({ id = 'pricing' }) {
  const sectionRef = useRevealOnScroll();
  const headlineId = `${id}-headline`;
  const plans = orderedPlans();

  return (
    <section ref={sectionRef} id={id} aria-labelledby={headlineId} className="section-band">
      <div className="site-shell">
        <SectionHeading
          eyebrow={PRICING.eyebrow}
          align="center"
          headline={<span id={headlineId}>{PRICING.headline}</span>}
          lead={PRICING.lead}
        />

        <ul
          data-reveal
          data-reveal-group="pricing-plans"
          className="mt-16 grid items-start gap-5 lg:grid-cols-3"
        >
          {plans.map((plan) => (
            <PlanCardLive key={plan.id} plan={plan} featured={plan.featured} />
          ))}
        </ul>

        <div data-reveal data-reveal-group="pricing-more" className="mt-12 text-center">
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
