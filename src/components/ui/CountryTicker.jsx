import { useContent } from '../../hooks/useContent';
import { prefersReducedMotion } from '../../lib/motion';

/* Flag artwork, resolved from each country's ISO code. Real artwork, not flag
   emoji: regional indicator pairs render as two bare letters on Windows. */
const FLAGS = import.meta.glob('../../assets/flags/*.webp', { eager: true, import: 'default' });
const flagUrl = (code) => FLAGS[`../../assets/flags/flag-${code.toLowerCase()}.webp`];

/**
 * Supported countries as a slow ticker of flags. Eight names in a sentence get
 * skimmed; eight flags are read at a glance, and moving says "more than fits".
 *
 * Decorative: the count is stated in a label beside it and the countries are
 * named in full elsewhere, so a screen reader gains nothing here.
 *
 * @param {object} props
 * @param {boolean} [props.onInk] Sitting on a dark band rather than paper.
 */
export default function CountryTicker({ onInk = false, className = '' }) {
  const { ASSURANCE } = useContent();
  const countries = ASSURANCE.countries.list;
  // Read once at mount: a ticker is motion like any other, and a reader who has
  // asked for less of it gets the plain wrapped row instead.
  const isStatic = prefersReducedMotion();

  const textTone = onInk ? 'text-muted-dark' : 'text-muted';

  const item = (country, index) => (
    <span key={`${country.code}-${index}`} className="flex shrink-0 items-center gap-2 px-3.5">
      <img
        src={flagUrl(country.code)}
        alt=""
        aria-hidden="true"
        width={64}
        height={64}
        /* Not lazy. Sixteen 16px flags weigh almost nothing, and the
           IntersectionObserver behind lazy loading has to re-test each one
           against the viewport while the row is moving — paying observer work
           every frame to defer a few kilobytes. */
        className="size-4 rounded-[3px] object-contain"
      />
      {country.name}
    </span>
  );

  if (isStatic) {
    return (
      <p
        aria-hidden="true"
        className={`micro-label flex flex-wrap items-center gap-y-2 ${textTone} ${className}`.trim()}
      >
        {countries.map(item)}
      </p>
    );
  }

  return (
    <div aria-hidden="true" className={`relative ${className}`.trim()}>
      {/* Faded at both edges so the flags arrive and leave rather than being cut
          off against a hard border. The left fade is shorter: the row starts
          against a label rather than against open space. */}
      {/* Two painted overlays, not a mask on the scrolling box: a mask is
          composited against its content, so over a layer that moves every
          frame it is re-composited every frame. A phone feels that. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r ${
          onInk ? 'from-ink' : 'from-paper'
        } to-transparent`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l ${
          onInk ? 'from-ink' : 'from-paper'
        } to-transparent`}
      />

      <div className="overflow-hidden">
        {/* Two identical copies translated by exactly half the pair's width, so
            the second lands where the first began and the loop has no seam.
            Paused on hover for anyone who wants to actually read a name. */}
        <div
          className={`micro-label flex w-max animate-marquee-drift will-change-transform [backface-visibility:hidden] hover:[animation-play-state:paused] ${textTone}`}
          style={{ '--marquee-duration': '38s' }}
        >
          <span className="flex shrink-0">{countries.map(item)}</span>
          <span className="flex shrink-0">{countries.map(item)}</span>
        </div>
      </div>
    </div>
  );
}
