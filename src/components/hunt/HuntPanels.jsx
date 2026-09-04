import { useRef } from 'react';
import { useNearViewport } from '../../hooks/useNearViewport';
import { toneOf } from '../../lib/signalTones';
import Icon from '../ui/Icon';

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
 * **Each panel plays once, when it is reached.** `useNearViewport` adds
 * `is-running`; the CSS in `index.css` runs a fixed two cycles rather than an
 * infinite loop, so nothing animates off screen and nothing turns a marketing
 * page into a permanent spinner. Every element's resting state is its finished
 * state, so with `prefers-reduced-motion` the panel reads as a completed
 * result rather than as an empty box.
 *
 * **On the numbers.** They are prices, not earnings. This site promises, on
 * the About page, not to show screenshots of big earnings, and a panel
 * implying a return would break that promise on a page selling the tool. What
 * is shown is the arithmetic the software does — what an item costs in two
 * places — and the panels are labelled as an illustration.
 */

/** Window chrome, so a panel reads as software rather than as a chart. */
function Frame({ title, note, children }) {
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
    <div ref={ref} className={running ? 'is-running' : undefined}>
      <Frame title={copy.title} note={copy.note}>
        <div className="relative">
          {/* Column heads, so the two prices are unambiguous. */}
          <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-4 border-b border-hairline px-4 py-2.5 sm:gap-x-6">
            <span className="micro-label text-muted">{copy.item}</span>
            <span className="micro-label text-right text-muted">{copy.ebay}</span>
            <span className="micro-label text-right text-muted">{copy.amazon}</span>
            <span className="micro-label w-14 text-right text-muted">{copy.verdict}</span>
          </div>

          <ul>
            {rows.map((row, i) => (
              <li
                key={row.name}
                style={{ '--hunt-delay': `${0.25 + i * 0.22}s` }}
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
                  style={{ '--hunt-delay': `${0.45 + i * 0.22}s` }}
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
        <p className="flex items-center justify-between border-t border-hairline bg-paper-sunk px-4 py-3">
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
 * Step two: the extracted titles going into the box, one line at a time, with
 * the count climbing beside them.
 *
 * The count is the point of the step — a seller pastes a whole competitor's
 * catalogue at once, not one product — so it is stated rather than implied.
 */
export function PastePanel({ copy, titles, tone = 'gold' }) {
  const ref = useRef(null);
  const running = useNearViewport(ref, '0px 0px -15% 0px');
  const t = toneOf(tone);

  return (
    <div ref={ref} className={running ? 'is-running' : undefined}>
      <Frame title={copy.title} note={copy.note}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className="micro-label text-muted">{copy.field}</span>
            <span
              className="hunt-value micro-label tabular-nums"
              style={{ '--hunt-delay': '1.5s' }}
            >
              <span className={t.text}>{copy.count}</span>
            </span>
          </div>

          <div className="mt-2.5 grid gap-2 rounded-lg border border-hairline bg-paper-sunk p-3">
            {titles.map((title, i) => (
              <span
                key={title}
                style={{ '--hunt-delay': `${0.25 + i * 0.2}s` }}
                className="hunt-row truncate font-mono text-[0.7rem] leading-relaxed text-muted"
              >
                {title}
              </span>
            ))}
          </div>

          <span
            className={`hunt-value mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${t.tile}`}
            style={{ '--hunt-delay': '1.7s' }}
          >
            <Icon name="magnifier" className="size-3.5" />
            {copy.button}
          </span>
        </div>
      </Frame>
    </div>
  );
}
