import { useRef } from 'react';
import { useNearViewport } from '../../hooks/useNearViewport';
import { toneOf } from '../../lib/signalTones';
import Icon from '../ui/Icon';

/**
 * The sequence, as numbers the stylesheet can read.
 *
 * One pass of the beam, then the rows resolve behind it one at a time, then
 * the count lands. It ran as an infinite sweep for a while and that was wrong
 * twice over: a page that never stops moving reads as one that has not
 * finished loading, and a total sitting on screen while the scan is still
 * running says the scan was theatre.
 *
 * Computed here rather than written into the CSS so the stagger stays correct
 * whatever number of rows a panel has.
 */
const SCAN_SECONDS = 2;
const ROW_STEP = 0.16;

export function huntTiming(rowCount) {
  return {
    '--hunt-scan': `${SCAN_SECONDS}s`,
    /* The beam has crossed the whole panel before the last row lands. */
    '--hunt-summary-delay': `${(SCAN_SECONDS + rowCount * ROW_STEP + 0.2).toFixed(2)}s`,
  };
}

/** When row `i` resolves: after the sweep, then in turn. */
export const rowDelay = (i) => `${(SCAN_SECONDS + i * ROW_STEP).toFixed(2)}s`;

/**
 * The Product Hunter panels — the software working, drawn rather than
 * screenshotted.
 *
 * Their page is seven screenshots of the extension, Amazon and eBay, and we
 * hold none of them. These are not stand-ins for those pictures: a screenshot
 * shows a frozen moment and needs recapturing every time the UI moves, while
 * this shows the mechanic — a price gap being found, a list being scanned —
 * which is the part that actually explains the product.
 *
 * **One sequence, once.** `is-running` is added when the panel is first
 * reached and never removed: the beam crosses the panel over rows that are
 * still bars, the rows resolve behind it one at a time, the count lands, and
 * it stops. Nothing repeats and nothing plays off screen.
 *
 * Two earlier versions were wrong in opposite directions. A fixed two cycles
 * went still a few seconds after load and read as broken; an infinite sweep
 * with a pulsing wash read as a page that had never finished loading, and a
 * total sitting on screen while the scan was still running said the scan was
 * theatre. Holding the count until the last row lands is what makes the scan
 * look like the thing that produced it.
 *
 * With `prefers-reduced-motion` the global rule collapses every duration, and
 * because the fill has `forwards` the panel reads as a completed result rather
 * than as an empty box.
 *
 * **On the numbers.** They are prices, not earnings. This site promises, on
 * the About page, not to show screenshots of big earnings, and a panel
 * implying a return would break that promise on a page selling the tool. What
 * is shown is the arithmetic the software does — what an item costs in two
 * places — and the panels are labelled as an illustration.
 */

/**
 * The scanning state: what the panel looks like while the sweep is running.
 *
 * This is the homepage's own "find products already selling" visual, from the
 * first step of `FeatureTourSection` — a sunken ground, candidate cards with a
 * coloured tile and bars where the values will be, each breathing on
 * `step-row-in`, with the beam crossing them. Reusing it rather than inventing
 * a second idea of what scanning looks like is the point: a reader who has
 * seen the homepage recognises this as the same machine doing the same job.
 *
 * A flat set of grey bars was tried first and read as an empty table rather
 * than as work in progress.
 *
 * It covers the real rows and clears when the sweep finishes, so the results
 * arrive out of the scan instead of beside it. `aria-hidden`, because the real
 * values are underneath and a screen reader should never be handed a loading
 * state that is illustrative.
 */
function ScanningState({ rows, tone, counts }) {
  return (
    <div aria-hidden="true" className="hunt-scanning">
      <ul className="grid gap-2">
        {Array.from({ length: rows }, (_, i) => (
          <li
            key={i}
            className="flex items-center gap-2.5 rounded-lg bg-white p-2.5 shadow-sm"
            style={{ animation: `step-row-in 1.6s ease-in-out ${i * 0.14}s infinite` }}
          >
            <span className={`size-7 shrink-0 rounded-md ${tone.tile}`} />
            <span className="flex-1 space-y-1.5">
              <span className="block h-1.5 w-3/4 rounded-full bg-ink/15" />
              <span className="block h-1.5 w-1/2 rounded-full bg-ink/10" />
            </span>
            {counts ? <span className={`micro-label ${tone.text}`}>{counts[i]}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Window chrome, so a panel reads as software rather than as a chart. */
export function Frame({ title, note, children }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-float">
      <div className="flex items-center gap-2 border-b border-hairline bg-paper-sunk px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-signal-red/60" />
          <span className="size-2.5 rounded-full bg-signal-gold/60" />
          <span className="size-2.5 rounded-full bg-signal-green/60" />
        </span>
        <span className="micro-label ml-1 text-muted">{title}</span>
      </div>

      {children}

      {note ? (
        <figcaption className="border-t border-hairline px-4 py-2.5 text-xs text-muted">
          {note}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * The hunt itself: eBay listings beside their Amazon price, with the beam
 * resolving each row as it passes and flagging the ones worth listing.
 *
 * This is step one and the hero both, because it is the whole idea of the
 * product in one picture — the thing the page has to explain before anything
 * else lands.
 */
export function HuntTable({ copy, tone = 'blue', rows }) {
  const ref = useRef(null);
  const running = useNearViewport(ref, '0px 0px -15% 0px');
  const t = toneOf(tone);
  const hits = rows.filter((row) => row.hit).length;

  return (
    <div ref={ref} className={running ? 'is-running' : undefined} style={huntTiming(rows.length)}>
      <Frame title={copy.title} note={copy.note}>
        {/* Column heads sit outside the scanned region. They are the panel's
            furniture, not one of its results — covering them made the table
            look like it was still deciding what its own columns were. */}
        <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-4 border-b border-hairline px-4 py-2.5 sm:gap-x-6">
          <span className="micro-label text-muted">{copy.item}</span>
          <span className="micro-label text-right text-muted">{copy.ebay}</span>
          <span className="micro-label text-right text-muted">{copy.amazon}</span>
          <span className="micro-label w-14 text-right text-muted">{copy.verdict}</span>
        </div>

        <div className="relative">
          {/* No verdicts during the scan: a row labelled "gap" before the
              sweep has finished gives the answer away, which is the same
              fault as showing the count early. */}
          <ScanningState rows={rows.length} tone={t} />

          <ul>
            {rows.map((row, i) => (
              <li
                key={row.name}
                style={{ '--hunt-delay': rowDelay(i) }}
                className={`hunt-row grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-4 px-4 py-3 sm:gap-x-6 ${
                  row.hit ? 'hunt-hit' : ''
                } ${i ? 'border-t border-hairline/70' : ''}`}
              >
                <span className="truncate text-sm text-ink">{row.name}</span>
                <span className="text-right text-sm font-semibold text-ink tabular-nums">
                  {row.ebay}
                </span>
                <span className="text-right text-sm text-muted tabular-nums">{row.amazon}</span>
                <span
                  className="hunt-value w-14 text-right"
                  style={{ '--hunt-delay': rowDelay(i) }}
                >
                  {row.hit ? (
                    <span
                      className={`micro-label inline-flex items-center gap-1 ${t.text}`}
                      title={copy.hitTitle}
                    >
                      <Icon name="checkCircle" className="size-3" />
                      {row.gap}
                    </span>
                  ) : (
                    <span className="micro-label text-muted/50">{copy.skip}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          {/* The sweep. Purely decorative: every row's result is in the DOM
              whether or not this ever runs. */}
          <span
            aria-hidden="true"
            className="hunt-beam pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-transparent via-accent/20 to-transparent"
          />
        </div>

        {/* The count, which is the answer the reader wants: of these, how many
            are worth my time. */}
        <p className="hunt-summary flex items-center justify-between border-t border-hairline bg-paper-sunk px-4 py-3">
          <span className="micro-label text-muted">{copy.scanned.replace('{n}', rows.length)}</span>
          <span className={`font-display text-sm font-extrabold ${t.text}`}>
            {copy.found.replace('{n}', hits)}
          </span>
        </p>
      </Frame>
    </div>
  );
}

/**
 * Step one: the competitor's profile, and everything they have sold coming
 * off it in one press.
 *
 * Deliberately not the hunt table again. That table is the hero's job and it
 * answers "which items are worth listing"; this answers a different question —
 * where the list of candidates comes from in the first place — and showing the
 * same panel twice would make the second one read as decoration.
 */
export function ExtractPanel({ copy, listings, tone = 'blue' }) {
  const t = toneOf(tone);

  /* Static, like the paste box. These listings are already on the seller's
     profile — they are what the page found, not what the software produced —
     so loading them in would be inventing work. Only the two panels where a
     scan genuinely runs animate: the hunt table and the results. */
  return (
    <>
      <Frame title={copy.title} note={copy.note}>
        {/* The seller, so it is clear whose listings these are. */}
        <div className="flex items-center gap-3 border-b border-hairline px-4 py-3.5">
          <span
            aria-hidden="true"
            className={`grid size-9 place-items-center rounded-full ${t.tile}`}
          >
            <Icon name="people" className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-extrabold">
              {copy.seller}
            </span>
            <span className="block text-xs text-muted">{copy.meta}</span>
          </span>
        </div>

        <div className="px-4 py-3">
          <p className="micro-label text-muted">{copy.listed}</p>

          <ul className="mt-2.5 grid gap-2">
            {listings.map((name) => (
              <li key={name} className="flex items-center gap-2.5">
                <span aria-hidden="true" className="size-6 shrink-0 rounded-md bg-ink/[0.06]" />
                <span className="truncate text-sm text-muted">{name}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="flex items-center justify-between border-t border-hairline bg-paper-sunk px-4 py-3">
          <span
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${t.tile}`}
          >
            <Icon name="arrowRight" className="size-3.5" />
            {copy.button}
          </span>
          <span className="micro-label tabular-nums">
            <span className={t.text}>{copy.collected.replace('{n}', '238')}</span>
          </span>
        </p>
      </Frame>
    </>
  );
}

/**
 * Step three: what came back, and what it is now ready for.
 *
 * The hunt table asked which listings had a gap; this shows the answer to the
 * whole run — the matches Amazon returned, the ones it could not match, and
 * the handoff to the AI Lister that the copy promises at the end of the step.
 */
export function ResultsPanel({ copy, matches, tone = 'red' }) {
  const ref = useRef(null);
  const running = useNearViewport(ref, '0px 0px -15% 0px');
  const t = toneOf(tone);
  const ready = matches.filter((m) => m.ready).length;

  return (
    <div
      ref={ref}
      className={running ? 'is-running' : undefined}
      style={huntTiming(matches.length)}
    >
      <Frame title={copy.title} note={copy.note}>
        {/* Furniture, not a result — outside the scanned region. */}
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-hairline px-4 py-2.5 sm:gap-x-6">
          <span className="micro-label text-muted">{copy.item}</span>
          <span className="micro-label text-right text-muted">{copy.source}</span>
          <span className="micro-label w-16 text-right text-muted">{copy.state}</span>
        </div>

        <div className="relative">
          <ScanningState rows={matches.length} tone={t} />

          <ul>
            {matches.map((match, i) => (
              <li
                key={match.name}
                style={{ '--hunt-delay': rowDelay(i) }}
                className={`hunt-row grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-4 py-3 sm:gap-x-6 ${
                  match.ready ? 'hunt-hit' : ''
                } ${i ? 'border-t border-hairline/70' : ''}`}
              >
                <span className="truncate text-sm text-ink">{match.name}</span>
                <span className="text-right text-sm text-muted tabular-nums">
                  {match.price ?? '—'}
                </span>
                <span
                  className="hunt-value w-16 text-right"
                  style={{ '--hunt-delay': rowDelay(i) }}
                >
                  {match.ready ? (
                    <span className={`micro-label inline-flex items-center gap-1 ${t.text}`}>
                      <Icon name="checkCircle" className="size-3" />
                      {copy.ready}
                    </span>
                  ) : (
                    <span className="micro-label text-muted/50">{copy.checking}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          <span
            aria-hidden="true"
            className="hunt-beam pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-transparent via-accent/20 to-transparent"
          />
        </div>

        {/* The handoff the step's own copy ends on. */}
        <p className="hunt-summary flex flex-wrap items-center justify-between gap-3 border-t border-hairline bg-paper-sunk px-4 py-3">
          <span className={`font-display text-sm font-extrabold ${t.text}`}>
            {copy.summary.replace('{n}', ready)}
          </span>
          <span className="inline-flex items-center gap-2 rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-paper">
            {copy.handoff}
            <Icon name="arrowRight" className="size-3.5" />
          </span>
        </p>
      </Frame>
    </div>
  );
}

/**
 * Step two: the extracted titles going into the box, one line at a time, with
 * the count climbing beside them.
 *
 * The count is the point of the step — a seller pastes a whole competitor's
 * catalogue at once, not one product — so it is stated rather than implied.
 */
export function PastePanel({ copy, titles, tone = 'gold' }) {
  const t = toneOf(tone);

  /* Nothing animates here, and nothing should. This step is not a scan: the
     titles were pasted by the seller a moment ago, the count is simply how
     many of them there are, and the button has not been pressed yet. Loading
     any of it in would be pretending work is happening that is not — the
     panel's whole job is to show the box already full, waiting. */
  return (
    <Frame title={copy.title} note={copy.note}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="micro-label text-muted">{copy.field}</span>
          <span className="micro-label tabular-nums">
            <span className={t.text}>{copy.count}</span>
          </span>
        </div>

        <div className="mt-2.5 grid gap-2 rounded-lg border border-hairline bg-paper-sunk p-3">
          {titles.map((title) => (
            <span
              key={title}
              className="truncate font-mono text-[0.7rem] leading-relaxed text-muted"
            >
              {title}
            </span>
          ))}
        </div>

        <span
          className={`mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${t.tile}`}
        >
          <Icon name="magnifier" className="size-3.5" />
          {copy.button}
        </span>
      </div>
    </Frame>
  );
}
