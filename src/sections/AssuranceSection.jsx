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
 * The stamp. Two rings and two words, drawn rather than fetched — an image
 * would be one more request for something the type already says.
 */
function Seal({ className }) {
  const { seal } = ASSURANCE.guarantee;

  return (
    <span
      aria-hidden="true"
      className={`relative grid shrink-0 place-items-center rounded-full border-2 border-signal-green/45 ${className}`}
    >
      <span className="absolute inset-[7px] rounded-full border border-signal-green/25" />
      <span className="text-center font-display text-3xl font-extrabold leading-none text-signal-green-soft">
        {seal.top}
        <span className="mt-1 block font-label text-[0.58rem] uppercase tracking-[0.18em]">
          {seal.bottom}
        </span>
      </span>
    </span>
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
            <Seal className="size-28 sm:size-32" />

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
