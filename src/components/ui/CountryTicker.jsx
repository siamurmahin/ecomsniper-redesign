import { ASSURANCE } from '../../data/siteContent';
import { prefersReducedMotion } from '../../lib/motion';

/* Flag artwork, resolved from each country's ISO code. Real artwork, not flag
   emoji: regional indicator pairs render as two bare letters on Windows. */
const FLAGS = import.meta.glob('../../assets/flags/*.png', { eager: true, import: 'default' });
const flagUrl = (code) => FLAGS[`../../assets/flags/flag-${code.toLowerCase()}.png`];

/**
 * The supported countries as a slow ticker of flags.
 *
 * A sentence naming eight countries is a sentence people skim past; eight flags
 * are read at a glance, and moving them says "more than fits here" in a way a
 * static row of exactly eight cannot. It is deliberately slow — this is a
 * texture beside the figures, not something competing with them.
 *
 * The list comes from the same deck the countries section renders, so the two
 * can never disagree about where EcomSniper works.
 *
 * Decorative throughout: whatever renders this states the count in a visible
 * label, and the countries are named in full in the countries section, so a
 * screen reader gains nothing from eight more flags and a repeated list.
 *
 * @param {object} props
 * @param {boolean} [props.onInk] Sitting on a dark band rather than paper.
 */
export default function CountryTicker({ onInk = false, className = '' }) {
  const countries = ASSURANCE.countries.list;
  // Read once at mount: a ticker is motion like any other, and a reader who has
  // asked for less of it gets the plain wrapped row instead.
  const isStatic = prefersReducedMotion();

  const textTone = onInk ? 'text-muted-dark' : 'text-muted';

  const item = (country, index) => (
    <span
      key={`${country.code}-${index}`}
      className="flex shrink-0 items-center gap-2 px-3.5"
    >
      <img
        src={flagUrl(country.code)}
        alt=""
        aria-hidden="true"
        width={64}
        height={64}
        loading="lazy"
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
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_5%,black_88%,transparent)]">
        {/* Two identical copies translated by exactly half the pair's width, so
            the second lands where the first began and the loop has no seam.
            Paused on hover for anyone who wants to actually read a name. */}
        <div
          className={`micro-label flex w-max animate-marquee-drift hover:[animation-play-state:paused] ${textTone}`}
          style={{ '--marquee-duration': '38s' }}
        >
          <span className="flex shrink-0">{countries.map(item)}</span>
          <span className="flex shrink-0">{countries.map(item)}</span>
        </div>
      </div>
    </div>
  );
}
