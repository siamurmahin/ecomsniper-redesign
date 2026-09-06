/**
 * A headline with one run set in an inverted block — their device, and the
 * one thing every page's title on this site has in common.
 *
 * It was written out three times, in `AffiliatePage`, `AiListerPage` and
 * `ProductHunterPage`, identically. This is that function, once. A fourth and
 * fifth copy were about to be added for careers.
 *
 * The deck supplies `headlineParts`, and each part is either plain text or a
 * marked run:
 *
 * ```js
 * headlineParts: [{ text: 'Get paid for the people you ' }, { text: 'bring.', mark: true }]
 * ```
 *
 * The whitespace lives inside the parts rather than between the spans, because
 * JSX collapses whitespace between elements and the gap before a marked run is
 * the difference between "you bring" and "youbring".
 *
 * Decks keep a plain `headline` string beside `headlineParts` for the places
 * that need text rather than markup — `aria-label`, meta descriptions, the
 * sitemap. Keep the two in step.
 *
 * @param {object} props
 * @param {Array<{text: string, mark?: boolean}>} props.parts
 * @param {'ink'|'brand'} [props.tone] Which block the marked run wears.
 */
export default function MarkedHeadline({ parts, tone = 'ink' }) {
  const markClass = tone === 'brand' ? 'headline-mark-brand' : 'headline-mark-ink';

  return (
    <>
      {parts.map((part, index) =>
        part.mark ? (
          <span key={index} className={markClass}>
            {part.text}
          </span>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </>
  );
}

/**
 * The same device for a headline that is not written as parts — a job title
 * out of the deck, say, where marking a run by hand would mean a second field
 * on every role that must be kept in step with the first.
 *
 * Marks the last word, which is where the emphasis falls in a title read
 * aloud. A single-word title is marked whole rather than left plain, because
 * an unmarked title on one page and a marked one on the next reads as a bug.
 *
 * @param {object} props
 * @param {string} props.text
 * @param {'ink'|'brand'} [props.tone]
 */
export function MarkedLastWord({ text, tone = 'ink' }) {
  const words = String(text).trim().split(/\s+/);
  const last = words.pop() ?? '';
  const head = words.join(' ');

  return (
    <MarkedHeadline
      parts={
        head ? [{ text: `${head} ` }, { text: last, mark: true }] : [{ text: last, mark: true }]
      }
      tone={tone}
    />
  );
}
