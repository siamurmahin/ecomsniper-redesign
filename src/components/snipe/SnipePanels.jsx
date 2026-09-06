import { useRef } from 'react';
import { useNearViewport } from '../../hooks/useNearViewport';
import { toneOf } from '../../lib/signalTones';
import Icon from '../ui/Icon';
import { Frame, ScanningState, huntTiming, rowDelay } from '../hunt/HuntPanels';

/**
 * The Competitor Research panels — the software working, drawn rather than
 * screenshotted.
 *
 * Their page is screenshots we do not hold, and the answer is the one
 * `HuntPanels` already made for Product Hunter: draw the mechanic in markup,
 * because a screenshot shows a frozen moment and needs recapturing every time
 * the UI moves, while the mechanic is the part that explains the product.
 *
 * **Built on `HuntPanels` rather than beside it.** The window chrome, the
 * scanning state, the sweep timings and the `.hunt-*` rules in the stylesheet
 * are all imported. Two feature pages showing the same software should look
 * like the same software, and the CSS is already in the initial sheet — a
 * second set of nearly-identical rules would cost bytes to say the same thing
 * slightly differently.
 *
 * **Only the two panels where a scan genuinely runs animate**: the price
 * ladder, where the listings resolve into an order, and the store scan. The
 * dossier, the arithmetic and the published listings are static, for the
 * reason `ExtractPanel` gives — animating a panel where nothing is being
 * computed is inventing work.
 *
 * **On the numbers.** Prices, not earnings. The site promises on the About
 * page not to show screenshots of big earnings, so nothing here implies a
 * return: what is shown is what an item is listed at in several places, and
 * every panel is labelled an illustration.
 */

/**
 * The hero: one item, four listings, ordered by price, with yours underneath.
 *
 * This is the page's argument in a picture — the cheapest listing wins the
 * sale, so yours becomes the cheapest listing — which is why it is the hero
 * rather than step three's panel.
 *
 * The floor line at the foot is not decoration. It is the only thing on the
 * page that says undercutting has a bottom, and without it the ladder reads
 * as a race to zero rather than as a margin being kept.
 */
export function PriceLadder({ copy, tone = 'blue' }) {
  const ref = useRef(null);
  const running = useNearViewport(ref, '0px 0px -15% 0px');
  const t = toneOf(tone);

  return (
    <div
      ref={ref}
      className={running ? 'is-running' : undefined}
      style={huntTiming(copy.rows.length)}
    >
      <Frame title={copy.title} note={copy.note}>
        {/* The item, once, above the ladder: every row below is the same
            product, and a column head saying "item" four times would say it
            worse. */}
        <p className="border-b border-hairline px-4 py-3 text-sm font-semibold text-ink">
          {copy.item}
        </p>

        <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 border-b border-hairline px-4 py-2.5">
          <span className="micro-label text-muted">{copy.seller}</span>
          <span className="micro-label text-right text-muted">{copy.price}</span>
        </div>

        <div className="relative">
          <ScanningState rows={copy.rows.length} tone={t} />

          <ul>
            {copy.rows.map((row, i) => (
              <li
                key={row.seller}
                style={{ '--hunt-delay': rowDelay(i) }}
                className={`hunt-row grid grid-cols-[1fr_auto] items-center gap-x-4 px-4 py-3 ${
                  row.yours ? `${t.wash} bg-gradient-to-r` : ''
                } ${i ? 'border-t border-hairline/70' : ''}`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`size-1.5 shrink-0 rounded-full ${row.yours ? t.dot : 'bg-ink/20'}`}
                  />
                  <span
                    className={`truncate text-sm ${
                      row.yours ? 'font-semibold text-ink' : 'text-muted'
                    }`}
                  >
                    {row.seller}
                  </span>

                  {row.yours ? (
                    <span className={`micro-label shrink-0 ${t.text}`}>{copy.yoursLabel}</span>
                  ) : null}
                </span>

                <span
                  className="hunt-value text-right text-sm tabular-nums"
                  style={{ '--hunt-delay': rowDelay(i) }}
                >
                  <span
                    className={row.yours || row.lowest ? 'font-semibold text-ink' : 'text-muted'}
                  >
                    {row.price}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <span
            aria-hidden="true"
            className="hunt-beam pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-transparent via-accent/20 to-transparent"
          />
        </div>

        <p className="hunt-summary flex items-center justify-between gap-3 border-t border-hairline bg-paper-sunk px-4 py-3">
          <span className="micro-label text-muted">{copy.floor}</span>
          <span className={`font-display text-sm font-extrabold ${t.text}`}>{copy.summary}</span>
        </p>
      </Frame>
    </div>
  );
}

/**
 * Step one: what makes somebody a competitor worth saving.
 *
 * Their copy says "spot Amazon-to-eBay dropshippers", and the tell is a
 * listing priced well above the same item on Amazon. So the panel shows the
 * comparison that identifies one rather than a list of shop names, and the
 * third row is a seller who is not one — a page where every row is a hit is a
 * page nobody believes.
 */
export function DossierPanel({ copy, tone = 'blue' }) {
  const t = toneOf(tone);
  const flagged = copy.rows.filter((row) => row.flagged).length;

  return (
    <Frame title={copy.title} note={copy.note}>
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-hairline px-4 py-2.5 sm:gap-x-6">
        <span className="micro-label text-muted">{copy.column}</span>
        <span className="micro-label text-right text-muted">{copy.ebay}</span>
        <span className="micro-label text-right text-muted">{copy.amazon}</span>
      </div>

      <ul>
        {copy.rows.map((row, i) => (
          <li
            key={row.seller}
            className={`grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-4 py-3 sm:gap-x-6 ${
              i ? 'border-t border-hairline/70' : ''
            }`}
          >
            <span className="min-w-0">
              <span className="block truncate text-sm text-ink">{row.seller}</span>
              {row.flagged ? (
                <span className={`micro-label mt-1 inline-flex items-center gap-1 ${t.text}`}>
                  <Icon name="magnifier" className="size-3" />
                  {copy.flag}
                </span>
              ) : null}
            </span>

            <span className="text-right text-sm font-semibold text-ink tabular-nums">
              {row.ebay}
            </span>
            <span className="text-right text-sm text-muted tabular-nums">{row.amazon}</span>
          </li>
        ))}
      </ul>

      <p className="flex items-center justify-between border-t border-hairline bg-paper-sunk px-4 py-3">
        <span
          className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${t.tile}`}
        >
          <Icon name="check" className="size-3.5" />
          {copy.button}
        </span>
        <span className={`micro-label tabular-nums ${t.text}`}>
          {copy.saved.replace('{n}', flagged)}
        </span>
      </p>
    </Frame>
  );
}

/**
 * Step two: their store, filtered to what sold more than once.
 *
 * The count carries the whole step. One sale is an accident and four in three
 * days is a product, and that distinction is the reason the tool scans a store
 * rather than reading its front page.
 */
export function StoreScanPanel({ copy, tone = 'gold' }) {
  const ref = useRef(null);
  const running = useNearViewport(ref, '0px 0px -15% 0px');
  const t = toneOf(tone);

  return (
    <div
      ref={ref}
      className={running ? 'is-running' : undefined}
      style={huntTiming(copy.rows.length)}
    >
      <Frame title={copy.title} note={copy.note}>
        <p className="border-b border-hairline px-4 py-2.5">
          <span className="micro-label text-muted">{copy.window}</span>
        </p>

        <div className="relative">
          <ScanningState
            rows={copy.rows.length}
            tone={t}
            counts={copy.rows.map((row) => copy.repeat.replace('{n}', row.sold))}
          />

          <ul>
            {copy.rows.map((row, i) => (
              <li
                key={row.name}
                style={{ '--hunt-delay': rowDelay(i) }}
                className={`hunt-row grid grid-cols-[1fr_auto] items-center gap-x-4 px-4 py-3 ${
                  i ? 'border-t border-hairline/70' : ''
                }`}
              >
                <span className="truncate text-sm text-ink">{row.name}</span>
                <span
                  className={`hunt-value micro-label text-right tabular-nums ${t.text}`}
                  style={{ '--hunt-delay': rowDelay(i) }}
                >
                  {copy.repeat.replace('{n}', row.sold)}
                </span>
              </li>
            ))}
          </ul>

          <span
            aria-hidden="true"
            className="hunt-beam pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-transparent via-accent/20 to-transparent"
          />
        </div>

        <p className="hunt-summary border-t border-hairline bg-paper-sunk px-4 py-3">
          <span className={`font-display text-sm font-extrabold ${t.text}`}>
            {copy.summary.replace('{n}', copy.rows.length)}
          </span>
        </p>
      </Frame>
    </div>
  );
}

/**
 * Step three: the decision, as arithmetic.
 *
 * Four lines and nothing else. This is the step a reader will want to check
 * rather than admire — it is where their money is — and a panel that animated
 * it would be asking them to watch a sum they are trying to read.
 *
 * The cost line is what stops the page reading as "go lower until you win".
 * The caveat under the fees is there because a number that precise, unsourced,
 * is a promise the software cannot keep for every category.
 */
export function UndercutPanel({ copy, tone = 'red' }) {
  const t = toneOf(tone);

  return (
    <Frame title={copy.title} note={copy.note}>
      <dl className="divide-y divide-hairline/70">
        {copy.lines.map((line) => (
          <div key={line.label} className="flex items-center justify-between gap-4 px-4 py-3.5">
            <dt className={`text-sm ${line.highlight ? 'font-semibold text-ink' : 'text-muted'}`}>
              {line.label}
            </dt>
            <dd
              className={`text-right tabular-nums ${
                line.highlight
                  ? `font-display text-lg font-extrabold ${t.text}`
                  : 'text-sm text-ink'
              }`}
            >
              {line.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="border-t border-hairline bg-paper-sunk px-4 py-3 text-xs text-muted">
        {copy.caveat}
      </p>
    </Frame>
  );
}

/**
 * Step four: the button, pressed.
 *
 * The only claim this panel makes is that a listing now exists. One row is
 * still going up, because a run that finishes perfectly every time is the sort
 * of mock that makes a reader distrust the other three.
 */
export function ListedPanel({ copy, tone = 'green' }) {
  const t = toneOf(tone);
  const live = copy.rows.filter((row) => row.live).length;

  return (
    <Frame title={copy.title} note={copy.note}>
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-hairline px-4 py-2.5 sm:gap-x-6">
        <span className="micro-label text-muted">{copy.button}</span>
        <span className="micro-label text-right text-muted" />
        <span className="micro-label w-16 text-right text-muted">{copy.state}</span>
      </div>

      <ul>
        {copy.rows.map((row, i) => (
          <li
            key={row.name}
            className={`grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-4 py-3 sm:gap-x-6 ${
              i ? 'border-t border-hairline/70' : ''
            }`}
          >
            <span className="truncate text-sm text-ink">{row.name}</span>
            <span className="text-right text-sm text-muted tabular-nums">{row.price}</span>
            <span className="w-16 text-right">
              {row.live ? (
                <span className={`micro-label inline-flex items-center gap-1 ${t.text}`}>
                  <Icon name="checkCircle" className="size-3" />
                  {copy.live}
                </span>
              ) : (
                <span className="micro-label text-muted/60">{copy.queued}</span>
              )}
            </span>
          </li>
        ))}
      </ul>

      <p className="border-t border-hairline bg-paper-sunk px-4 py-3">
        <span className={`font-display text-sm font-extrabold ${t.text}`}>
          {copy.summary.replace('{n}', live)}
        </span>
      </p>
    </Frame>
  );
}
