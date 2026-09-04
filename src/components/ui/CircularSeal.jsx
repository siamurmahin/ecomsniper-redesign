/**
 * Text set around a ring, turning slowly, with the brand mark in the middle.
 *
 * The idea is React Bits' `CircularText`
 * (https://reactbits.dev/text-animations/circular-text). It is not vendored
 * into `components/reactbits/` like the others, because that component is
 * built on `motion/react` and this project has no motion library — adding one
 * for a rotating badge would put tens of kilobytes on every page that imports
 * it. The maths here is the same as theirs; the animation is a CSS keyframe on
 * the compositor instead, so it costs no JavaScript at all.
 *
 * The tinted field and the perforated edge are borrowed from the guarantee
 * seal in `AssuranceSection` — that is what makes it read as pressed into the
 * ink rather than stuck on top of it, and this site already had the idea.
 * Its ring is static SVG text on a path; this one turns, which is the reason
 * for a second component rather than a prop on that one.
 *
 * **It is used once, and it says something.** This page's claim is that
 * somebody is there at any hour. A ring that never stops turning states that
 * continuously in a way a static pill cannot. A second one anywhere would make
 * both decoration.
 *
 * The global `prefers-reduced-motion` rule stops the rotation; the words stay
 * where they are and stay readable, because they are real text in the document
 * rather than a picture of text.
 *
 * @param {string} text Runs clockwise from the top. Pad it to fill the ring.
 * @param {number} [spinSeconds] One full turn. Slow: this is a seal, not a spinner.
 */
export default function CircularSeal({ text, spinSeconds = 26, className = '' }) {
  const letters = Array.from(text);

  return (
    <div className={`circular-seal ${className}`.trim()}>
      {/* The field and its perforated edge. Both decorative, both behind. */}
      <span aria-hidden="true" className="circular-seal-field" />

      {/* The ring turns; the mark inside it does not, or the logo would read
          as a loading spinner. */}
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

      {/* The favicon itself, not a redrawn copy of it. `public/favicon.svg` is
          667 bytes, scales to any size, and is the one file that cannot fall
          out of step with the mark in the browser tab. Decorative here — the
          words around it already name the company. */}
      <img src="/favicon.svg" alt="" width="32" height="32" className="circular-seal-mark" />
    </div>
  );
}
