import SectionHeading from '../../components/ui/SectionHeading';
import CtaButton from '../../components/ui/CtaButton';
import { PRICING } from '../../data/siteContent';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import PlanCard from './PlanCard';

/**
 * 12 — option B, the three cards kept and corrected.
 *
 * Same shape as the live section, because three cards side by side is what a
 * buyer expects and comparing them is the job. What changes is what was
 * missing: the credits bundle now shows the $597 it is struck down from and
 * the $98 saved, both from the client's own pricing page, and it states that
 * the three-month cycle recurs rather than implying it.
 */
export default function PricingCardsFixed({ id = 'pricing' }) {
  const sectionRef = useRevealOnScroll();
  const headlineId = `${id}-headline`;

  return (
    <section ref={sectionRef} id={id} aria-labelledby={headlineId} className="section-band">
      <div className="site-shell">
        <SectionHeading
          eyebrow={PRICING.eyebrow}
          align="center"
          headline={<span id={headlineId}>{PRICING.headline}</span>}
          lead={PRICING.lead}
        />

        <ul className="mt-14 grid items-stretch gap-4 lg:grid-cols-3">
          {PRICING.plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </ul>

        <div data-reveal data-reveal-group="pricing-more" className="mt-10 text-center">
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
