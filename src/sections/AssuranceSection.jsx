import { ASSURANCE } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import Icon from '../components/ui/Icon';
import LogoLoop from '../components/reactbits/LogoLoop';
import worldMap from '../assets/brand/world-map-dotted.svg';

/* Flag artwork, resolved from each country's ISO code. */
const FLAGS = import.meta.glob('../assets/flags/*.png', { eager: true, import: 'default' });
const flagUrl = (code) => FLAGS[`../assets/flags/flag-${code.toLowerCase()}.png`];

/**
 * 14 — Countries and guarantee, merged.
 *
 * These were two separate full-height sections. The review's note was that
 * neither earns a screen alone, and that the unqualified "no refunds, final
 * sale" line elsewhere contradicted the guarantee. Both now sit side by side,
 * and the guarantee names the plan it covers — the same wording used in the
 * pricing cards and the FAQ.
 */
export default function AssuranceSection() {
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
        <div className="grid gap-4 lg:grid-cols-2">
          {/* -------------------------------------------------------------- */}
          {/* Countries                                                       */}
          {/* -------------------------------------------------------------- */}
          <div
            data-reveal
            data-reveal-group="assurance"
            className="relative overflow-hidden rounded-3xl border border-hairline bg-white/60 p-8 sm:p-10"
          >
            {/* Dotted world map, faint enough to sit under the type. */}
            <img
              src={worldMap}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-6 w-[34rem] max-w-none opacity-[0.07]"
            />

            <p className="section-eyebrow relative">{countries.eyebrow}</p>

            <h2 className="relative mt-4 text-[length:var(--text-section)] leading-[1.02]">
              {countries.headline}
            </h2>

            <p className="relative mt-5 text-[0.95rem] leading-relaxed text-muted">
              {countries.body}
            </p>

            {/*
              The eight countries ride a marquee (React Bits' LogoLoop) rather
              than sitting in a static wrap. Eight pills in two ragged rows read
              as a leftover list; moving, they read as reach. The pill markup is
              unchanged — LogoLoop only takes over the scrolling, and it pauses
              when a visitor points at it so a name can still be read.

              `fadeOutColor` has to be the card's own surface, not the page's:
              the mask is a solid-to-transparent gradient painted over the ends.
            */}
            <div className="relative mt-8">
              <LogoLoop
                logos={countries.list.map((country) => ({
                  node: (
                    <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-paper py-1.5 pl-1.5 pr-3.5 text-[0.82rem] font-medium">
                      {/*
                        Real flag artwork rather than a flag emoji: regional
                        indicator pairs do not render on Windows, where they
                        show as two bare letters and read as a bug.
                      */}
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
                fadeOutColor="#fdfdfc"
                ariaLabel="Countries EcomSniper supports"
              />
            </div>

            <ul className="sr-only">
              {countries.list.map((country) => (
                <li key={country.name}>{country.name}</li>
              ))}
            </ul>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Guarantee                                                       */}
          {/* -------------------------------------------------------------- */}
          <div
            data-reveal
            data-reveal-group="assurance"
            className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-ink p-8 text-paper sm:p-10"
          >
            {/* Seal motif, purely decorative. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full border border-accent-soft/20"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full border border-accent-soft/15"
            />

            <Icon
              name="shield"
              className="relative size-8 text-accent-soft"
              label="Money back guarantee"
            />

            <div className="relative mt-6">
              <p className="section-eyebrow section-eyebrow-on-ink">{guarantee.eyebrow}</p>

              <h2 className="mt-4 text-[length:var(--text-section)] leading-[1.02]">
                {guarantee.headline}
              </h2>

              <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-muted-dark">
                {guarantee.body}
              </p>
            </div>

            <p className="relative mt-10 font-display text-lg font-bold leading-snug text-paper sm:text-xl">
              {guarantee.closer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
