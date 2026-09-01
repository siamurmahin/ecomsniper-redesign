import CtaButton from '../../components/ui/CtaButton';
import Icon from '../../components/ui/Icon';
import { toneOf } from '../../lib/signalTones';

/**
 * A plan card built the way the client's own pricing page builds one, read off
 * ecomsniper.io/pricing on 1 Sep 2026.
 *
 * The change that matters is the order: price, then the button, then the
 * refund terms, and only then the feature list. On the version this replaces
 * the button sat under six bullets, so on a phone it was off screen until the
 * whole list had been read. A price with no way to act on it is a price.
 */
export default function PlanCardLive({ plan, featured = false }) {
  const tone = toneOf(plan.tone);

  return (
    <li
      className={`relative flex flex-col rounded-3xl border bg-white p-6 pt-8 sm:p-8 sm:pt-10 ${
        featured
          ? 'border-ink/15 shadow-float lg:-my-4 lg:py-12'
          : 'border-hairline shadow-lift'
      }`}
    >
      {/* The badge sits on the card's top edge rather than inside it, so the
          three read as a set with one of them raised. */}
      <span
        className={`absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3.5 py-1 font-label text-[0.6rem] uppercase tracking-[0.16em] ${
          featured ? 'bg-ink text-paper' : 'border border-hairline bg-white text-muted'
        }`}
      >
        {plan.badge}
      </span>

      <div className="flex items-start gap-3.5">
        <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${tone.tile}`}>
          <Icon name={plan.icon} className="size-5" />
        </span>
        <span className="min-w-0">
          <span className="block font-display text-lg font-extrabold tracking-tight">
            {plan.name}
          </span>
          <span className="mt-0.5 block font-serif text-[0.88rem] italic text-muted">
            {plan.tagline}
          </span>
        </span>
      </div>

      <div className="mt-7 text-center">
        {plan.was && (
          <p className="text-base font-semibold text-muted line-through">{plan.was}</p>
        )}
        <p className="font-display text-[3rem] font-extrabold leading-none tracking-tight">
          {plan.priceLabel}
        </p>
        <p className="mt-2 micro-label text-muted">{plan.priceSuffix}</p>

        {/* The follow-on price as a bordered pill, not a footnote: it is the
            number the reader is actually committing to from month two. */}
        {plan.id === 'monthly' ? (
          <p className="mt-3 inline-flex rounded-full border border-accent/40 px-3.5 py-1 text-[0.82rem] font-semibold text-accent">
            {plan.thereafter}
          </p>
        ) : (
          <p className="mt-3 inline-flex rounded-full border border-hairline px-3.5 py-1 text-[0.8rem] font-semibold text-muted">
            {plan.thereafter}
            {plan.saving ? `, ${plan.saving.toLowerCase()}` : ''}
          </p>
        )}
      </div>

      <div className="mt-6">
        <CtaButton
          href={plan.cta.href}
          variant={featured ? 'primary' : 'secondary'}
          intent={`pricing-${plan.id}`}
          className="w-full"
        >
          {plan.cta.label}
        </CtaButton>
      </div>

      {/* Refund terms directly under the button, where the decision is made. */}
      <p
        className={`mt-3 flex items-start justify-center gap-1.5 text-center text-[0.8rem] ${
          plan.featured ? 'text-signal-green-deep' : 'text-signal-gold-deep'
        }`}
      >
        <Icon
          name={plan.featured ? 'shield' : 'verified'}
          className="mt-0.5 size-3.5 shrink-0"
          aria-hidden="true"
        />
        {plan.guarantee}
      </p>

      <ul className="mt-7 flex flex-1 flex-col gap-2.5 border-t border-hairline pt-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-[0.88rem] leading-snug">
            <Icon
              name="checkCircle"
              className={`mt-0.5 size-4 shrink-0 ${tone.text}`}
              aria-hidden="true"
            />
            {feature}
          </li>
        ))}
      </ul>

      {plan.recurring && (
        <p className="mt-4 text-[0.78rem] text-muted">{plan.recurring}</p>
      )}
    </li>
  );
}
