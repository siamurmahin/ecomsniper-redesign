import { ASSURANCE, SITE } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import LogoLoop from '../components/reactbits/LogoLoop';
import { toneOf } from '../lib/signalTones';
import worldMap from '../assets/brand/world-map-dotted.svg';

/* Flag artwork, resolved from each country's ISO code. */
const FLAGS = import.meta.glob('../assets/flags/*.png', { eager: true, import: 'default' });
const flagUrl = (code) => FLAGS[`../assets/flags/flag-${code.toLowerCase()}.png`];

/** One tone per promise, in the order the four reach a member. */
const PROMISE_TONES = ['blue', 'red', 'green', 'gold'];

/** The ink surface, as a value: LogoLoop paints its fade mask, not a class. */
const INK = '#1e1f23';
/* The card is painted solid rather than white/60 so this value is exact. A
   translucent surface means the mask has to match a blend, and any drift
   shows as a hard cut where the pills should fade out. */
const PAPER_CARD = '#ffffff';

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
 * 14 — Countries and guarantee.
 *
 * The two were merged because neither earned a screen alone, and for a while
 * they sat as two cards of equal size side by side. That said they carry equal
 * weight, and they do not: the countries block is a fact check a visitor runs
 * in two seconds, and the guarantee is the last argument the page makes. So
 * countries is a wide, short band and the guarantee is the block underneath it.
 *
 * The guarantee names the plan it covers, in the same wording as the pricing
 * cards and the FAQ, because an unqualified version contradicted them.
 */
/**
 * @param {object} props
 * @param {boolean} [props.showCloser] Set false on /pricing, whose header
 *   already carries the four promises and carries them above the plans.
 */
export default function AssuranceSection({ showCloser = true }) {
  const sectionRef = useRevealOnScroll();
  const { countries, guarantee } = ASSURANCE;

  return (
    <section
      ref={sectionRef}
      id="countries-and-guarantee"
      aria-label="Supported countries and the money back guarantee"
      className="section-band bg-paper-sunk"
    >
      <div className="site-shell">
        {/* Countries — wide and short. A fact, checked and moved past. */}
        <div
          data-reveal
          data-reveal-group="assurance-countries"
          className="relative overflow-hidden rounded-3xl border border-hairline bg-white p-8 sm:p-10"
        >
          {/* Dotted world map, faint enough to sit under the type. */}
          <img
            src={worldMap}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-8 w-[36rem] max-w-none opacity-[0.07]"
          />

          <div className="relative grid gap-x-12 gap-y-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="section-eyebrow">{countries.eyebrow}</p>
              <h2 className="mt-4 text-[length:var(--text-section)] leading-[1.02]">
                {countries.headline}
              </h2>
            </div>

            <p className="text-[0.95rem] leading-relaxed text-muted">{countries.body}</p>
          </div>

          {/* A marquee, not a static wrap: eight pills in two ragged rows read
              as a leftover list, moving they read as reach. It pauses on hover
              so a name can still be read. `fadeOutColor` must be the card's
              own surface — the mask is painted over the ends. */}
          <div className="relative mt-8">
            <LogoLoop
              logos={countries.list.map((country) => ({
                node: (
                  <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-paper py-1.5 pl-1.5 pr-3.5 text-[0.82rem] font-medium">
                    {/* Real artwork, not flag emoji: regional indicator pairs
                        render as two bare letters on Windows. */}
                    <img
                      src={flagUrl(country.code)}
                      alt=""
                      aria-hidden="true"
                      width={64}
                      height={64}
                      loading="lazy"
                      className="size-5 rounded-sm object-contain"
                    />
                    {country.name}
                  </span>
                ),
                ariaLabel: country.name,
              }))}
              speed={38}
              logoHeight={34}
              gap={12}
              pauseOnHover
              fadeOut
              fadeOutColor={PAPER_CARD}
              ariaLabel="Countries EcomSniper supports"
            />
          </div>

          <p className="relative mt-7 border-t border-hairline pt-5 font-display text-base font-bold leading-snug">
            {countries.closer}
          </p>

          <ul className="sr-only">
            {countries.list.map((country) => (
              <li key={country.name}>{country.name}</li>
            ))}
          </ul>
        </div>

        {/* The guarantee — the block, not a column. It is the last argument the
            page makes before the final CTA, and it is the one that costs the
            reader nothing to accept. */}
        <div
          data-reveal
          data-reveal-group="assurance-guarantee"
          className="relative mt-4 overflow-hidden rounded-3xl bg-ink text-paper"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 size-96 rounded-full bg-signal-green/20 blur-3xl"
          />

          {/* The pair is centred rather than stretched. A 1fr text column
              leaves 380px of empty ink on the right at this width, which reads
              as a column that failed to fill rather than as space. */}
          <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[auto_minmax(0,48rem)] lg:items-center lg:justify-center lg:gap-14">
            <Seal className="size-32 sm:size-36" />

            <div>
              <p className="section-eyebrow section-eyebrow-on-ink">{guarantee.eyebrow}</p>

              <h2 className="mt-3 text-[length:var(--text-section)] leading-[1.02]">
                {guarantee.headline}
              </h2>

              <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-dark">
                {guarantee.body}
              </p>

              {/* Their own closing line. The whole argument in seven words, so
                  it is set larger than the paragraph that leads into it. */}
              <p className="mt-5 font-display text-xl font-bold leading-snug sm:text-2xl">
                {guarantee.closer}
              </p>

              {/* Four lines, not one sentence. Run together in a paragraph they
                  read as a slogan; separated they read as four promises, which
                  is what they are. */}
              {showCloser && (
                <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-2.5">
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
          </div>

          {/* The strip. Stated once in the deck, repeated here — a claim
              written eight times in the copy file is eight places to fix it. */}
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
