import { useRef } from 'react';
import { useNearViewport } from '../../hooks/useNearViewport';
import { toneOf } from '../../lib/signalTones';
import Icon from '../ui/Icon';
import { Frame, huntTiming, rowDelay } from '../hunt/HuntPanels';

/**
 * The Price Monitor panels.
 *
 * Third page built on `HuntPanels` — the window chrome, the row stagger and
 * the `.hunt-*` rules in the initial stylesheet are all imported, so the four
 * feature pages read as four views of one product rather than four designs.
 *
 * What is different here is what the panels have to show. Product Hunter and
 * Competitor Research both illustrate a **search**: a scan runs, results
 * resolve, a count lands. This page illustrates the opposite — work that
 * happens while nobody is watching, on its own schedule, and whose whole claim
 * is that it needed nothing from you. So there is no beam and no scanning
 * state: the events arrive in sequence and stay, which is what a log does.
 *
 * `ScanningState` is deliberately not imported. A skeleton implies a wait, and
 * the reader was not waiting — they were asleep, which is the point of the
 * page.
 */

/**
 * The hero: the store, and a day of it in three events.
 *
 * Each event is a pair — what was detected, and what was done about it — with
 * the arrow between them carrying the whole product. The line at the foot is
 * the argument: the work happened and nobody was asked to do anything.
 *
 * Three events rather than a full day's worth, for the reason the hunt table's
 * five rows exist: the panel is an illustration of the mechanic, not a log
 * viewer, and a longer list reads as data to audit rather than a glance.
 */
export function MonitorFeed({ copy }) {
  const ref = useRef(null);
  const running = useNearViewport(ref, '0px 0px -15% 0px');

  return (
    <div
      ref={ref}
      className={running ? 'is-running' : undefined}
      style={huntTiming(copy.events.length)}
    >
      <Frame title={copy.title} note={copy.note}>
        {/* The store, and the fact that something is watching it. The dot is
            the only thing on this page that pulses, and it is the one element
            whose meaning is "still running". */}
        <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-3">
          <span className="font-display text-sm font-extrabold">{copy.store}</span>
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="watch-pulse size-1.5 rounded-full bg-signal-green"
            />
            <span className="micro-label text-muted">{copy.state}</span>
          </span>
        </div>

        <ul>
          {copy.events.map((event, i) => {
            const t = toneOf(event.tone);

            return (
              <li
                key={`${event.at}-${event.item}`}
                style={{ '--hunt-delay': rowDelay(i) }}
                className={`hunt-row px-4 py-3.5 ${i ? 'border-t border-hairline/70' : ''}`}
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className={`micro-label inline-flex items-center gap-1.5 ${t.text}`}>
                    <span aria-hidden="true" className={`size-1.5 rounded-full ${t.dot}`} />
                    {event.detected}
                  </span>
                  <span className="micro-label shrink-0 text-muted/70 tabular-nums">
                    {event.at}
                  </span>
                </span>

                <span className="mt-1.5 block truncate text-sm text-ink">{event.item}</span>

                <span className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-muted line-through tabular-nums">{event.from}</span>
                  <Icon name="arrowRight" className="size-3 shrink-0 text-muted/60" />
                  <span className="font-semibold text-ink tabular-nums">{event.to}</span>
                  <span className="ml-auto inline-flex items-center gap-1 text-muted">
                    <Icon name="checkCircle" className="size-3 shrink-0" />
                    {event.done}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>

        <p className="hunt-summary flex items-center justify-between gap-3 border-t border-hairline bg-paper-sunk px-4 py-3">
          <span className="font-display text-sm font-extrabold text-signal-green-deep">
            {copy.idleLabel}
          </span>
          <span className="micro-label text-muted">{copy.idleNote}</span>
        </p>
      </Frame>
    </div>
  );
}

/**
 * Case one: the cost moved, so the price moved with it.
 *
 * Four lines and a conclusion, static, on `UndercutPanel`'s rule — this is
 * arithmetic a reader will want to check rather than watch. The two "was"
 * lines are struck through so the pairs read as a change rather than as four
 * unrelated numbers.
 *
 * The footer is the only claim: the margin held, and nobody was asked. A price
 * that merely "updated" is a fact about a database.
 */
export function PriceChangePanel({ copy, tone = 'blue' }) {
  const t = toneOf(tone);

  return (
    <Frame title={copy.title} note={copy.note}>
      <p className="border-b border-hairline px-4 py-3 text-sm font-semibold text-ink">
        {copy.item}
      </p>

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

      <p className="border-t border-hairline bg-paper-sunk px-4 py-3">
        <span className={`font-display text-sm font-extrabold ${t.text}`}>{copy.footer}</span>
      </p>
    </Frame>
  );
}

/**
 * Case two: the listing whose supplier has nothing left.
 *
 * Paused rather than ended — that is the reversible one, and it is what their
 * homepage claims happens. Three rows still live beside the one that is not,
 * because a panel where everything is broken is not the state this describes:
 * the store carries on, minus one item.
 */
export function StockPanel({ copy, tone = 'red' }) {
  const t = toneOf(tone);

  return (
    <Frame title={copy.title} note={copy.note}>
      <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 border-b border-hairline px-4 py-2.5">
        <span className="micro-label text-muted">{copy.column}</span>
        <span className="micro-label w-16 text-right text-muted">{copy.status}</span>
      </div>

      <ul>
        {copy.rows.map((row, i) => (
          <li
            key={row.name}
            className={`grid grid-cols-[1fr_auto] items-center gap-x-4 px-4 py-3 ${
              i ? 'border-t border-hairline/70' : ''
            }`}
          >
            <span className={`truncate text-sm ${row.live ? 'text-ink' : 'text-muted'}`}>
              {row.name}
            </span>
            <span className="w-16 text-right">
              {row.live ? (
                <span className="micro-label inline-flex items-center gap-1 text-signal-green-deep">
                  <Icon name="checkCircle" className="size-3" />
                  {copy.live}
                </span>
              ) : (
                <span className={`micro-label inline-flex items-center gap-1 ${t.text}`}>
                  <Icon name="shield" className="size-3" />
                  {copy.paused}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      <p className="border-t border-hairline bg-paper-sunk px-4 py-3 text-xs text-muted">
        {copy.footer}
      </p>
    </Frame>
  );
}
