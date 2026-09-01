import { ASSURANCE, SITE } from '../data/siteContent';
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
 * The stamp.
 *
 * It was two thin rings around two words, which is a circle with type in it
 * rather than a seal. A seal has an edge you could feel and it says what it
 * certifies around the rim, so this one does both: a perforated outer edge, a
 * tinted field, and the claim itself set on the ring.
 *
 * Drawn, not fetched. An image would be one more request for something the
 * type already says, and it would not take the page's colours with it.
 *
 * `textLength` pins the ring text to the circumference and lets the browser
 * space it, so the copy can be reworded in the deck without the letters
 * bunching at the top of the circle or running out before they close it.
 */
const RING_RADIUS = 76;
const RING_LENGTH = Math.round(2 * Math.PI * RING_RADIUS);

function Seal({ className }) {
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

      <text
        className="font-label uppercase"
        fill="currentColor"
        fontSize="11"
        letterSpacing="1"
      >
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
      <circle cx="100" cy="100" r="58" fill="none" strokeWidth="1" className="stroke-signal-green/30" />

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
 * This carried a supported-countries block as well, and for a while that block
 * was half the section. It was the third time the page stated the same fact:
 * the hero eyebrow says eight countries, section 03 pins "trusted by sellers in
 * 8 countries" to a marquee of the same eight flags, and the FAQ answers "does
 * it work in my country?" in words one screen above this. By the third telling
 * the flags were decoration, so section 03 keeps them and they are gone from
 * here. `ASSURANCE.countries` stays in the deck — those two still read it.
 *
 * What is left is the last argument the page makes before it asks for money,
 * and it now has a door: the reader this convinces had nowhere to go but the
 * scrollbar. The claim names the plan it covers, in the same wording as the
 * pricing cards and the FAQ, because an unqualified version contradicts both.
 */
/**
 * @param {object} props
 * @param {boolean} [props.showCloser] Set false on /pricing, whose header
 *   already carries the four promises and carries them above the plans.
 */
export default function AssuranceSection({ showCloser = true }) {
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

              {/* Four lines, not one sentence. Run together in a paragraph they
                  read as a slogan; separated they read as four promises, which
                  is what they are. */}
              {/* Two by two, not a wrapping row: with the door taking a column
                  the four broke three and one, which reads as a list that ran
                  out of room rather than as four matched promises. */}
              {showCloser && (
                <ul className="mt-6 grid gap-x-7 gap-y-2.5 sm:grid-cols-2">
                  {SITE.promises.map((promise, index) => {
                    const tone = toneOf(PROMISE_TONES[index % PROMISE_TONES.length]);

                    return (
                      <li key={promise} className="flex items-center gap-2.5 text-[0.9rem]">
                        <span
                          aria-hidden="true"
                          className={`size-1.5 shrink-0 rounded-full ${tone.onInkDot}`}
                        />
                        {promise}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* The door, ruled off the argument rather than trailing it — the
                same shape section 11 closes with, because it is the same move:
                the objection and its answer are read together. */}
            <div className="lg:w-[17rem] lg:border-l lg:border-paper/12 lg:pl-10">
              <CtaButton
                href={guarantee.cta.href}
                variant="onInk"
                intent="guarantee-primary"
                className="w-full"
              >
                {guarantee.cta.label}
              </CtaButton>

              <p className="mt-4 flex items-start gap-2 text-[0.8rem] leading-relaxed text-signal-green-soft">
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
