import CtaButton from '../ui/CtaButton';
import Icon from '../ui/Icon';

/**
 * The About hero, following theirs.
 *
 * Their page opens on one wide column, not two: an oversized uppercase
 * headline with a single word set in an inverted block, then the three lines
 * as serif italic against a coloured rule, then the statement with its own
 * marked phrase, then a scroll cue.
 *
 * An earlier version put the headline beside a dark panel. That was ours, not
 * theirs, and it made the page read as a product page rather than a letter.
 * The panel is gone.
 */

/** Renders `[{ text, mark }]` with the marked run in an ink block. */
function Marked({ parts, markClass = 'headline-mark-ink' }) {
  return parts.map((part, index) =>
    part.mark ? (
      <span key={index} className={markClass}>
        {part.text}
      </span>
    ) : (
      <span key={index}>{part.text}</span>
    ),
  );
}

/* Blue, gold, red — the homepage's order, minus the green it keeps for
   confirmations. One rule per line, because the lines are a tally. */
const RULE_TONES = ['bg-signal-blue', 'bg-signal-gold', 'bg-signal-red'];

export default function AboutHero({ about }) {
  const { eyebrow, headline, headlineParts, hours, statement, statementParts, ctas } = about;

  return (
    <div className="max-w-4xl">
      <p className="section-eyebrow" data-reveal data-reveal-group="hero">
        {eyebrow}
      </p>

      <h1
        className="mt-5 text-[length:var(--text-display)] uppercase leading-[0.94] tracking-[-0.03em]"
        data-reveal
        data-reveal-group="hero"
      >
        {headlineParts ? <Marked parts={headlineParts} /> : headline}
      </h1>

      {/* Their three lines: serif italic against a coloured rule, each its own
          row, because they are three separate costs rather than a sentence. */}
      <ul className="mt-11 grid gap-3.5">
        {hours.map((line, index) => (
          <li
            key={line}
            data-reveal
            data-reveal-group="hero-hours"
            className="flex items-center gap-4"
          >
            <span
              aria-hidden="true"
              className={`h-0.5 w-7 shrink-0 rounded-full ${RULE_TONES[index % RULE_TONES.length]}`}
            />
            <span className="font-serif text-[1.6rem] italic leading-tight sm:text-[1.9rem]">
              {line}
            </span>
          </li>
        ))}
      </ul>

      <p
        className="mt-11 max-w-xl text-[length:var(--text-lead)] leading-relaxed"
        data-reveal
        data-reveal-group="hero"
      >
        {statementParts ? (
          <Marked parts={statementParts} markClass="headline-mark-ink" />
        ) : (
          statement
        )}
      </p>

      {/* Their page has no button here — it closes on one, five screens down.
          These stay because someone arriving from search could otherwise read
          the whole argument with nothing to do about it, and the quiet door
          comes first on a page that tells people not to rush. */}
      <div
        className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
        data-reveal
        data-reveal-group="hero"
      >
        <CtaButton href={ctas.primary.href} intent="about-hero-pricing">
          {ctas.primary.label}
        </CtaButton>
        <CtaButton href={ctas.secondary.href} variant="secondary" intent="about-hero-playbook">
          {ctas.secondary.label}
        </CtaButton>
      </div>

      {/* Their scroll cue. Decorative, so hidden from assistive tech. */}
      <span
        aria-hidden="true"
        className="mt-14 hidden justify-center text-muted/60 sm:flex"
        data-reveal
        data-reveal-group="hero"
      >
        <Icon name="mouseScroll" className="size-6" />
      </span>
    </div>
  );
}
