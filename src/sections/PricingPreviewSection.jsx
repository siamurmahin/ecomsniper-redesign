import SectionHeading from '../components/ui/SectionHeading';
import CtaButton from '../components/ui/CtaButton';
import Icon from '../components/ui/Icon';
import { PRICING } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { toneOf } from '../lib/signalTones';

/**
 * One tone per plan, by position — the rule every enumerated set on this site
 * follows. It lives here rather than beside the price because it is
 * presentation: the colour tells three cards apart, it does not describe them.
 * The recommended plan ignores it and wears the brand ramp instead.
 */
const PLAN_TONES = ['blue', 'gold', 'green'];

/**
 * 12 — Pricing.
 *
 * The review's sharpest finding: the "$" symbol appeared nowhere on the
 * homepage, so most visitors never learned the price because most visitors
 * never load /pricing. That is answered now by §11, which states the entry
 * price and the guarantee and sends the reader here, so these cards run on
 * /pricing only.
 *
 * All three plans carry their own refund terms, because they differ: only the
 * monthly plan is covered by the guarantee.
 *
 * The three cards are one design and one height. An earlier pass gave the
 * recommended plan its own treatment — ink against two white cards, and taller
 * by a negative margin. It read as three offers from three places, and the two
 * white cards read as the cheap seats. The recommended one is now marked the
 * way the client marks it, with a chip and the brand ramp, and nothing else
 * separates them.
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

        <ul
          className={`grid items-stretch gap-4 lg:grid-cols-3 lg:gap-5 ${showHeading ? 'mt-14' : ''}`}
        >
          {PRICING.plans.map((plan, index) => {
            const tone = toneOf(PLAN_TONES[index % PLAN_TONES.length]);

            return (
              <li
                key={plan.id}
                data-reveal
                data-reveal-group="pricing-plans"
                className={`group relative flex flex-col overflow-hidden rounded-3xl border border-ink-line bg-ink p-7 text-paper shadow-lift transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-2 hover:shadow-float sm:p-8 ${
                  /* A ring rather than a size: the recommended card has to
                     stand out without being taller than the two it is being
                     compared against. */
                  plan.featured ? 'ring-1 ring-accent/45' : ''
                }`}
              >
                {/* The recommended plan wears the brand ramp, the other two
                    their own tone. One line each, so the three cards are told
                    apart before a word is read. */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-[3px] ${
                    plan.featured ? 'bg-[image:var(--gradient-brand)]' : tone.rule
                  }`}
                />
                {/* A corner wash, not a fill: enough to light the card without
                    putting type on a tint. */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-gradient-to-br to-transparent blur-3xl ${
                    plan.featured ? 'from-accent/30' : tone.wash
                  }`}
                />

                <div className="relative flex flex-1 flex-col">
                  {/* The kicker sits above the name, the way the client's own
                      cards read it: it says which buyer this card is for
                      before the name says what it is called. Only the
                      recommended one is filled — three filled chips and none
                      of them leads. */}
                  {plan.badge && (
                    <span
                      className={`mb-4 w-fit rounded-full px-3 py-1 font-label text-[0.6rem] uppercase tracking-[0.14em] ${
                        plan.featured
                          ? 'bg-accent text-paper'
                          : `border border-paper/15 bg-paper/[0.06] ${tone.onInk}`
                      }`}
                    >
                      {plan.badge}
                    </span>
                  )}

                  <h3 className="font-display text-xl font-extrabold tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-snug text-muted-dark">{plan.summary}</p>

                  {/* The price sits on its own plate, and the three plates are
                      held to one height on the wide layout so the feature
                      lists start on the same line: the credits plan carries
                      two extra lines of billing terms, and without this the
                      lists sit at three heights and stop being comparable. */}
                  <div className="mt-6 flex flex-col justify-center rounded-2xl border border-paper/12 bg-paper/[0.06] p-5 lg:min-h-[9.5rem]">
                    <p className="flex flex-wrap items-baseline gap-x-2.5">
                      {/* The price this one is struck down from, where there is
                          one. The client's pricing page lists the credits
                          bundle at $597 before $499; this site was showing only
                          the lower number and dropping a real discount. */}
                      {plan.was && (
                        <span className="text-lg font-semibold text-muted-dark line-through">
                          {plan.was}
                        </span>
                      )}
                      <span className="font-display text-[2.75rem] font-extrabold leading-none tracking-tight sm:text-5xl">
                        {plan.priceLabel}
                      </span>
                      <span className="text-sm text-muted-dark">{plan.priceSuffix}</span>
                    </p>

                    <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm">
                      {plan.thereafter}
                      {plan.saving && (
                        <span className="rounded-full bg-signal-gold/25 px-2 py-0.5 text-[0.7rem] font-bold text-signal-gold-soft">
                          {plan.saving}
                        </span>
                      )}
                    </p>

                    {/* Stated, not implied: "billed every 3 months" does not
                        say the cycle repeats, and the client's page calls it
                        recurring. */}
                    {plan.recurring && (
                      <p className="mt-1.5 text-xs text-muted-dark">{plan.recurring}</p>
                    )}
                  </div>

                  <ul className="mt-7 flex flex-1 flex-col gap-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-[0.9rem] leading-snug"
                      >
                        {/* Filled, not tinted. A 15% wash of the green on ink
                            is a smudge at 18px; the tone's own tile pairing —
                            full green, ink glyph — is the one that reads, and
                            it is what §11 already uses for a win. */}
                        <span
                          aria-hidden="true"
                          className="mt-px grid size-[18px] shrink-0 place-items-center rounded-full bg-signal-green text-ink"
                        >
                          <Icon name="check" className="size-2.5" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Refund terms are per-plan, which is what removes the old
                      contradiction: only the monthly plan is covered. The icon
                      follows the flag on the plan, never the sentence — a
                      shield beside "no refunds" would say the opposite of the
                      words next to it. */}
                  <p
                    className={`mt-7 flex items-start gap-2 border-t border-paper/12 pt-4 text-xs leading-relaxed ${
                      plan.guaranteeProtected ? 'text-signal-green-soft' : 'text-muted-dark'
                    }`}
                  >
                    <Icon
                      name={plan.guaranteeProtected ? 'shield' : 'close'}
                      className="mt-px size-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    {plan.guarantee}
                  </p>

                  <div className="mt-5">
                    <CtaButton
                      href={plan.cta.href}
                      variant={plan.featured ? 'onInk' : 'ghost'}
                      intent={`pricing-${plan.id}`}
                      className="w-full"
                    >
                      {plan.cta.label}
                    </CtaButton>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Deck: state the real cost of entry rather than let it ambush them. */}
        <p
          data-reveal
          data-reveal-group="pricing-footer"
          className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-muted"
        >
          {PRICING.footnote}
        </p>
      </div>
    </section>
  );
}
