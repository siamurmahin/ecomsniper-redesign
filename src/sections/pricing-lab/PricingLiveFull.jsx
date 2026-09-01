import SectionHeading from '../../components/ui/SectionHeading';
import CtaButton from '../../components/ui/CtaButton';
import Icon from '../../components/ui/Icon';
import { PRICING } from '../../data/siteContent';
import { toneOf } from '../../lib/signalTones';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import PlanCardLive from './PlanCardLive';
import { orderedPlans } from './orderedPlans';

/**
 * 12 — option F, the live block including its reassurance header.
 *
 * The client's page answers the money question before showing a price: a
 * guarantee pill, "no questions asked" under it, then four chips naming what
 * the money buys, one per signal tone. That is the part of their page doing
 * the most work and this site had none of it.
 *
 * Their headline over it is "Is this going to work for you?" — section 03's
 * headline here, so this keeps ours. Asking the same question twice on one
 * page makes the second one rhetorical.
 */
export default function PricingLiveFull({ id = 'pricing' }) {
  const sectionRef = useRevealOnScroll();
  const headlineId = `${id}-headline`;
  const plans = orderedPlans();
  const { assurance } = PRICING;

  return (
    <section ref={sectionRef} id={id} aria-labelledby={headlineId} className="section-band">
      <div className="site-shell">
        <SectionHeading
          eyebrow={PRICING.eyebrow}
          align="center"
          headline={<span id={headlineId}>{PRICING.headline}</span>}
          lead={PRICING.lead}
        />

        {/* The risk answered before the price is shown. */}
        <div data-reveal data-reveal-group="pricing-assurance" className="mt-9 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.85rem] font-semibold text-paper">
            <Icon name="shield" className="size-4 text-signal-green-soft" aria-hidden="true" />
            {assurance.pill}
          </p>
          <p className="mt-2.5 micro-label text-muted">{assurance.note}</p>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {assurance.chips.map((chip) => {
              const tone = toneOf(chip.tone);
              return (
                <li
                  key={chip.label}
                  className="flex items-center gap-2 rounded-full border border-hairline bg-white px-3.5 py-2 text-[0.82rem] font-semibold"
                >
                  <span className={`grid size-5 shrink-0 place-items-center rounded-full ${tone.tile}`}>
                    <Icon name={chip.icon} className="size-2.5" aria-hidden="true" />
                  </span>
                  {chip.label}
                </li>
              );
            })}
          </ul>
        </div>

        <ul
          data-reveal
          data-reveal-group="pricing-plans"
          className="mt-14 grid items-start gap-5 lg:grid-cols-3"
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
