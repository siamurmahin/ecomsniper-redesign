import Icon from './Icon';

/**
 * A score drawn as stars, filled to the fraction the score actually is.
 *
 * Two identical rows stacked: a dim one for the track, a bright one clipped to
 * the score's width. Rounding to the nearest whole or half star would round the
 * evidence — 4.7 has to look like 4.7, on a bar whose whole argument is that its
 * numbers are checkable.
 *
 * Decoration only: the figure itself is always rendered as text beside this, so
 * the stars are hidden from assistive tech rather than read out twice.
 *
 * @param {object} props
 * @param {number} props.rating Score to fill to.
 * @param {number} [props.max] Stars in the track.
 * @param {string} [props.fill] Colour class for the filled row.
 * @param {string} [props.track] Colour class for the unfilled row.
 * @param {string} [props.size] Size class for one star.
 */
export default function RatingStars({
  rating,
  max = 5,
  fill = 'text-signal-gold',
  track = 'text-ink/15',
  size = 'size-3.5',
  className = '',
}) {
  const pct = Math.max(0, Math.min(1, rating / max)) * 100;

  // w-max on the row: the clipped copy must keep the full row's width or the
  // flex would compress five stars into the clip instead of hiding the tail.
  const row = (tone) => (
    <span className={`flex w-max gap-0.5 ${tone}`}>
      {Array.from({ length: max }, (_, i) => (
        <Icon key={i} name="star" className={size} />
      ))}
    </span>
  );

  return (
    <span aria-hidden="true" className={`relative inline-flex ${className}`.trim()}>
      {row(track)}
      <span
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${pct}%` }}
      >
        {row(fill)}
      </span>
    </span>
  );
}
