import Icon from './Icon';

/**
 * Stars filled to the exact fraction of the score. Two rows stacked: a dim
 * track and a bright one clipped to width. Rounding to a half star would round
 * the evidence, and 4.7 has to look like 4.7.
 *
 * Decoration only — the figure is always written beside it as text.
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
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pct}%` }}>
        {row(fill)}
      </span>
    </span>
  );
}
