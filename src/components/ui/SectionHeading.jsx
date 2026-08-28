/**
 * The shared headline block used at the top of every section.
 *
 * Keeping eyebrow + headline + lead in one component is what makes the page
 * feel like one document rather than fifteen stitched-together designs.
 *
 * @param {object} props
 * @param {string} props.eyebrow Small mono label above the headline.
 * @param {import('react').ReactNode} props.headline Section headline.
 * @param {import('react').ReactNode} [props.lead] Supporting sentence.
 * @param {'left'|'center'} [props.align]
 * @param {'paper'|'ink'} [props.tone] Which band the heading sits on.
 */
export default function SectionHeading({
  eyebrow,
  headline,
  lead,
  align = 'left',
  tone = 'paper',
  className = '',
}) {
  const isCentered = align === 'center';
  const leadTone = tone === 'ink' ? 'text-muted-dark' : 'text-muted';

  return (
    <header
      className={`${isCentered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`.trim()}
    >
      {eyebrow && (
        <p className="section-eyebrow" data-reveal data-reveal-group="heading">
          {eyebrow}
        </p>
      )}

      <h2
        className="mt-4 text-[length:var(--text-section)] leading-[0.98]"
        data-reveal
        data-reveal-group="heading"
      >
        {headline}
      </h2>

      {lead && (
        <p
          className={`mt-5 text-[length:var(--text-lead)] leading-relaxed ${leadTone}`}
          data-reveal
          data-reveal-group="heading"
        >
          {lead}
        </p>
      )}
    </header>
  );
}
