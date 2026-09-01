import CtaButton from '../../components/ui/CtaButton';
import Icon from '../../components/ui/Icon';

/**
 * One plan card. Lifted out of the live section so the lab options can share
 * it and only differ in how many of them a section shows.
 *
 * The anchor price is new: the client's own pricing page lists the credits
 * bundle at $597 struck through to $499. A struck price is a claim, so it only
 * renders when the data carries one.
 */
export default function PlanCard({ plan, compact = false }) {
  return (
    <li
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
        {plan.was && (
          <span
            className={`text-lg font-semibold line-through ${
              plan.featured ? 'text-muted-dark' : 'text-muted'
            }`}
          >
            {plan.was}
          </span>
        )}
        <span className="font-display text-[2.75rem] font-extrabold leading-none tracking-tight">
          {plan.priceLabel}
        </span>
        <span className={`text-sm ${plan.featured ? 'text-muted-dark' : 'text-muted'}`}>
          {plan.priceSuffix}
        </span>
      </p>

      <p className={`mt-1.5 text-sm ${plan.featured ? 'text-accent-soft' : 'text-accent'}`}>
        {plan.thereafter}
      </p>

      {plan.saving && (
        <p className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-signal-green/15 px-3 py-1 text-[0.78rem] font-semibold text-signal-green-deep">
          <Icon name="checkCircle" className="size-3.5" aria-hidden="true" />
          {plan.saving}
        </p>
      )}

      {!compact && (
        <ul className="mt-7 flex flex-1 flex-col gap-2.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-[0.9rem]">
              <Icon
                name="checkCircle"
                className={`mt-0.5 size-4 shrink-0 ${
                  plan.featured ? 'text-signal-green-soft' : 'text-signal-green-deep'
                }`}
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* The billing term, where the plan has one worth stating outright. */}
      {plan.recurring && (
        <p className={`mt-5 text-[0.8rem] ${plan.featured ? 'text-muted-dark' : 'text-muted'}`}>
          {plan.recurring}
        </p>
      )}

      <p
        className={`mt-5 text-[0.82rem] ${
          plan.featured ? 'text-accent-soft' : 'text-muted'
        }`}
      >
        {plan.guarantee}
      </p>

      <div className="mt-6">
        <CtaButton
          href={plan.cta.href}
          variant={plan.featured ? 'onInk' : 'secondary'}
          intent={`pricing-${plan.id}`}
        >
          {plan.cta.label}
        </CtaButton>
      </div>
    </li>
  );
}
