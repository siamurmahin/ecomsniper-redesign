/**
 * The brand reticle, drawn rather than fetched — the favicon's own artwork, so
 * it cannot go out of step with the mark. Section 07 drew it inline first;
 * section 08 needed it too, and two copies of a logo are two places for it to
 * drift.
 *
 * The colours are literal because this is the mark, not a themed element: the
 * reticle is green, blue, gold and red wherever it appears.
 *
 * @param {object} props
 * @param {string} [props.className] Sizing for the svg itself.
 */
export default function ReticleMark({ className = 'size-7' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g fill="none" strokeLinecap="round">
        <circle cx="32" cy="32" r="24" stroke="#86b817" strokeWidth="4" />
        <circle cx="32" cy="32" r="16.5" stroke="#0064d2" strokeWidth="6" />
        <path d="M32 5v11M32 48v11M5 32h11M48 32h11" stroke="#f5af02" strokeWidth="6" />
      </g>
      <circle cx="32" cy="32" r="9.5" fill="#e53238" />
      <circle cx="32" cy="32" r="3.6" fill="#fbfbfa" />
    </svg>
  );
}
