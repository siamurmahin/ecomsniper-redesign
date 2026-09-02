import { useContent } from '../hooks/useContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import LogoLoop from '../components/reactbits/LogoLoop';
import CtaButton from '../components/ui/CtaButton';
import Icon from '../components/ui/Icon';
import { toneOf } from '../lib/signalTones';

/** One tone per promise, in the order the four reach a member. */
const PROMISE_TONES = ['blue', 'red', 'green', 'gold'];

/** The ink surface, as a value: LogoLoop paints its fade mask, not a class. */
const INK = '#1e1f23';

/**
 * The stamp. It was two thin rings around two words, which is a circle with
 * type in it — a seal has an edge and says what it certifies around the rim.
 *
 * Drawn, not fetched: an image is another request for something the type
 * already says, and it would not take the page's colours with it. textLength
 * pins the ring text, so the copy can be reworded without the letters bunching.
 */
const RING_RADIUS = 76;
const RING_LENGTH = Math.round(2 * Math.PI * RING_RADIUS);

function Seal({ className }) {
  const { ASSURANCE } = useContent();
  const { seal, marquee } = ASSURANCE.guarantee;

  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className={`shrink-0 text-signal-green-soft ${className}`}
    >
      <defs>
        {/* Clockwise from the top, so the words read the right way up. */}
        <path
          id="guarantee-seal-ring"
          fill="none"
          d={`M100,100 m0,-${RING_RADIUS} a${RING_RADIUS},${RING_RADIUS} 0 1,1 -0.01,0`}
        />
      </defs>

      {/* The field. A tint, so the seal reads as pressed into the ink rather
          than stuck on top of it. */}
      <circle cx="100" cy="100" r="94" className="fill-signal-green/10" />

      {/* The perforated edge — the part that makes it a stamp and not a badge. */}
      <circle
        cx="100"
        cy="100"
        r="94"
        fill="none"
        strokeWidth="2"
        strokeDasharray="2 7"
        strokeLinecap="round"
        className="stroke-signal-green/60"
      />

      <text className="font-label uppercase" fill="currentColor" fontSize="11" letterSpacing="1">
        <textPath
          href="#guarantee-seal-ring"
          startOffset="0"
          textLength={RING_LENGTH}
          lengthAdjust="spacing"
        >
          {`${marquee} · ${marquee} ·`}
        </textPath>
      </text>

      {/* The inner rule separates the certificate from what it certifies. */}
      <circle
        cx="100"
        cy="100"
        r="58"
        fill="none"
        strokeWidth="1"
        className="stroke-signal-green/30"
      />

      <text
        x="100"
        y="96"
        textAnchor="middle"
        fill="currentColor"
        className="font-display font-extrabold"
        fontSize="52"
      >
        {seal.top}
      </text>
      <text
        x="100"
        y="124"
        textAnchor="middle"
        fill="currentColor"
        className="font-label uppercase"
        fontSize="13"
        letterSpacing="3.5"
      >
        {seal.bottom}
      </text>
    </svg>
  );
}

/**
 * 14 — The guarantee.
 *
 * It used to carry a supported-countries block too, which was the third time
 * the page said the same thing: the hero eyebrow, section 03's flag marquee
 * and the FAQ all state it. Section 03 keeps the flags. ASSURANCE.countries
 * stays in the deck, since those two still read it.
 *
 * What is left is the last argument before the page asks for money, and it
 * has a door now. The claim names the plan it covers, as it does everywhere.
 */
/**
 * @param {object} props
 * @param {boolean} [props.showCloser] Set false on /pricing, whose header
 *   already carries the four promises and carries them above the plans.
 */
export default function AssuranceSection({ showCloser = true }) {
  const { ASSURANCE, PRICING, SITE } = useContent();
  /* The plan a reader actually starts on, so its price is stated once. */
  const entryPlan = PRICING.plans.find((plan) => plan.featured) ?? PRICING.plans[0];
  const sectionRef = useRevealOnScroll();
  const { guarantee } = ASSURANCE;

  return (
    <section
      ref={sectionRef}
      id="guarantee"
      aria-labelledby="guarantee-headline"
      className="section-band bg-paper-sunk"
    >
      <div className="site-shell">
        <div
          data-reveal
          data-reveal-group="assurance-guarantee"
          className="relative overflow-hidden rounded-3xl bg-ink text-paper shadow-float"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 size-96 rounded-full bg-signal-green/20 blur-3xl"
          />

          <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-12">
            <Seal className="size-32 sm:size-40" />

            <div>
              <p className="section-eyebrow section-eyebrow-on-ink">{guarantee.eyebrow}</p>

              <h2
                id="guarantee-headline"
                className="mt-3 text-[length:var(--text-section)] leading-[1.02]"
              >
                {guarantee.headline}
              </h2>

              <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-muted-dark">
                {guarantee.body}
              </p>

              {/* Their own closing line. The whole argument in seven words, so
                  it is set larger than the paragraph that leads into it. */}
              <p className="mt-5 max-w-xl font-display text-xl font-bold leading-snug sm:text-2xl">
                {guarantee.closer}
              </p>

              {/* Four separate lines, two by two. Run together they read as a
                  slogan; wrapped three-and-one they read as a list that ran
                  out of room. */}
              {showCloser && (
                <ul className="mt-6 grid gap-x-7 gap-y-3 sm:grid-cols-2">
                  {SITE.promises.map((promise, index) => {
                    const tone = toneOf(PROMISE_TONES[index % PROMISE_TONES.length]);

                    return (
                      <li key={promise.text} className="flex items-center gap-3 text-[0.9rem]">
                        {/* A dot said "here is an item". The mark says which of
                            the four it is, which is the only thing four lines
                            this short have to tell apart. */}
                        <span
                          aria-hidden="true"
                          className={`grid size-7 shrink-0 place-items-center rounded-full bg-paper/[0.07] ${tone.onInk}`}
                        >
                          <Icon name={promise.icon} className="size-3.5" />
                        </span>
                        {promise.text}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* The door. A bare button on a rule read as an afterthought; a
                panel answers the two things a convinced reader wants — what it
                costs, and what happens if they are wrong. The price is read
                from the plan, so it cannot drift from /pricing. */}
            <div className="rounded-2xl border border-paper/12 bg-paper/[0.06] p-6 lg:w-[17.5rem]">
              <p className="micro-label text-muted-dark">{guarantee.ctaEyebrow}</p>

              <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
                <span className="font-display text-4xl font-extrabold leading-none tracking-tight">
                  {entryPlan.priceLabel}
                </span>
                <span className="text-sm text-muted-dark">{entryPlan.priceSuffix}</span>
              </p>
              <p className="mt-1.5 text-xs text-muted-dark">{entryPlan.thereafter}</p>

              <div className="mt-5">
                <CtaButton
                  href={guarantee.cta.href}
                  variant="onInk"
                  intent="guarantee-primary"
                  className="w-full"
                >
                  {guarantee.cta.label}
                </CtaButton>
              </div>

              <p className="mt-4 flex items-start gap-2 border-t border-paper/12 pt-4 text-[0.78rem] leading-relaxed text-signal-green-soft">
                <Icon name="shield" className="mt-px size-3.5 shrink-0" aria-hidden="true" />
                {guarantee.reassurance}
              </p>
            </div>
          </div>

          {/* The strip. Stated once in the deck, repeated here — a claim written
              eight times in the copy file is eight places to fix it. */}
          <div className="relative border-t border-paper/12 py-4 text-signal-green-soft">
            <LogoLoop
              logos={Array.from({ length: 8 }, (_, index) => ({
                node: (
                  <span className="inline-flex items-center gap-3 whitespace-nowrap font-label text-[0.7rem] uppercase tracking-[0.2em]">
                    {guarantee.marquee}
                    <span className="opacity-50">·</span>
                  </span>
                ),
                ariaLabel: `${guarantee.marquee} ${index}`,
              }))}
              speed={26}
              logoHeight={18}
              gap={20}
              fadeOut
              fadeOutColor={INK}
              ariaLabel={guarantee.marquee}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
