/**
 * The headline block at the top of every section. One component for eyebrow,
 * headline and lead is what makes the page read as one document.
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
  const onInk = tone === 'ink';
  const leadTone = onInk ? 'text-muted-dark' : 'text-muted';
  /* `tone="ink"` used to change the lead and leave the eyebrow alone, so an
     ink section either got the paper eyebrow — whose rule is drawn for a light
     ground — or had to render its own outside this component. It carries both
     now, which is the whole point of the tone prop. */
  const eyebrowTone = onInk ? 'section-eyebrow section-eyebrow-on-ink' : 'section-eyebrow';

  return (
    <header
      className={`${isCentered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`.trim()}
    >
      {eyebrow && (
        <p className={eyebrowTone} data-reveal data-reveal-group="heading">
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
