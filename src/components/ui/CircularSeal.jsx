import Icon from './Icon';

/**
 * Text set around a ring, turning slowly, with a glyph in the middle.
 *
 * The idea is React Bits' `CircularText`
 * (https://reactbits.dev/text-animations/circular-text). It is not vendored
 * into `components/reactbits/` like the others, because that component is
 * built on `motion/react` and this project has no motion library — adding one
 * for a rotating badge would put tens of kilobytes on every page that imports
 * it. The maths here is the same as theirs; the animation is a CSS keyframe on
 * the compositor instead, so it costs no JavaScript at all.
 *
 * **It is used once, and it says something.** This page's claim is that
 * somebody is there at any hour. A ring that never stops turning states that
 * continuously in a way a static pill cannot, which is why the 24/7 line moved
 * off the eyebrow and onto this. A second one anywhere would make both
 * decoration.
 *
 * The global `prefers-reduced-motion` rule stops the rotation; the words stay
 * where they are and remain readable, because they are real text in the
 * document rather than a picture of text.
 *
 * @param {string} text Runs clockwise from the top. Pad it to fill the ring.
 * @param {string} [icon] Icon name for the centre.
 * @param {number} [spinSeconds] One full turn. Slow: this is a seal, not a spinner.
 */
export default function CircularSeal({ text, icon = 'headset', spinSeconds = 26, className = '' }) {
  const letters = Array.from(text);

  return (
    <div className={`circular-seal ${className}`.trim()}>
      {/* The ring turns; the glyph does not, or it would read as loading. */}
      <div className="circular-seal-ring" style={{ '--seal-spin': `${spinSeconds}s` }}>
        {letters.map((letter, i) => (
          <span
            key={`${letter}-${i}`}
            aria-hidden="true"
            style={{ transform: `rotate(${(360 / letters.length) * i}deg)` }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* The ring's letters are per-character spans and read as gibberish to a
          screen reader, so they are hidden and the phrase is given once. */}
      <span className="sr-only">{text.replace(/\s*[•·]\s*/g, '. ').trim()}</span>

      <span aria-hidden="true" className="circular-seal-glyph">
        <Icon name={icon} className="size-5" />
      </span>
    </div>
  );
}
