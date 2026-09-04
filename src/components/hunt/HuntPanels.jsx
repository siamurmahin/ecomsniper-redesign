import { useEffect, useRef, useState } from 'react';
import { useNearViewport } from '../../hooks/useNearViewport';
import { toneOf } from '../../lib/signalTones';
import Icon from '../ui/Icon';

/**
 * Two states, because the panels do two different things.
 *
 * `is-running` is one-shot and sticky, from `useNearViewport`: the rows fill
 * in once and stay filled, because a row that keeps re-appearing is a page
 * that never settles.
 *
 * `is-live` toggles both ways, which `useNearViewport` deliberately does not —
 * it is written never to go back to false. The sweep and the flash loop for as
 * long as a panel is on screen and stop the moment it leaves, so a page with
 * four panels on it is only ever animating the one being looked at.
 */
function useLive(ref) {
  const [live, setLive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting), {
      rootMargin: '0px 0px -10% 0px',
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return live;
}

/** Both classes for a panel, as one string. */
function panelState(running, live) {
  return (
    [running ? 'is-running' : '', live ? 'is-live' : ''].filter(Boolean).join(' ') || undefined
  );
}

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
 * **Two states, and they do different jobs.** `is-running` fills the rows in
 * once and leaves them filled — a row that keeps re-appearing is a page that
 * never settles. `is-live` drives the sweep and the flash, and it toggles with
 * visibility, so the panel being looked at is the only one animating and an
 * off-screen panel runs nothing at all. That was first written as a fixed two
 * cycles to avoid a permanent spinner, which just looked broken: the page went
 * still a few seconds after it loaded.
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
 * The unscanned state of a row: bars where the values will be.
 *
 * Sits over the real content and clears once the beam has passed, so the scan
 * reads as the cause of the result rather than as decoration beside it.
 * `aria-hidden`, because the values underneath are the real ones and a screen
 * reader should never be told about a loading state that is illustrative.
 */
function SkeletonRow({ columns = 3 }) {
  const widths = ['45%', '18%', '18%', '14%'];

  return (
    <span aria-hidden="true" className="hunt-skel">
      {Array.from({ length: columns + 1 }, (_, i) => (
        <span
          key={i}
          className={`h-2 rounded-full ${i === 0 ? 'flex-1' : ''} bg-ink/[0.09]`}
          style={i === 0 ? undefined : { width: widths[i] }}
        />
      ))}
    </span>
  );
}

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
  const live = useLive(ref);
  const t = toneOf(tone);
  const hits = rows.filter((row) => row.hit).length;

  return (
    <div ref={ref} className={panelState(running, live)}>
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
                className={`hunt-row relative grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-4 px-4 py-3 sm:gap-x-6 ${
                  row.hit ? 'hunt-hit' : ''
                } ${i ? 'border-t border-hairline/70' : ''}`}
              >
                <SkeletonRow columns={3} />
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
 * Step one: the competitor's profile, and everything they have sold coming
 * off it in one press.
 *
 * Deliberately not the hunt table again. That table is the hero's job and it
 * answers "which items are worth listing"; this answers a different question —
 * where the list of candidates comes from in the first place — and showing the
 * same panel twice would make the second one read as decoration.
 */
export function ExtractPanel({ copy, listings, tone = 'blue' }) {
  const ref = useRef(null);
  const running = useNearViewport(ref, '0px 0px -15% 0px');
  const live = useLive(ref);
  const t = toneOf(tone);

  return (
    <div ref={ref} className={panelState(running, live)}>
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
            {listings.map((name, i) => (
              <li
                key={name}
                style={{ '--hunt-delay': `${0.2 + i * 0.16}s` }}
                className="hunt-row flex items-center gap-2.5"
              >
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
          <span className="hunt-value micro-label tabular-nums" style={{ '--hunt-delay': '1.5s' }}>
            <span className={t.text}>{copy.collected.replace('{n}', '238')}</span>
          </span>
        </p>
      </Frame>
    </div>
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
  const live = useLive(ref);
  const t = toneOf(tone);
  const ready = matches.filter((m) => m.ready).length;

  return (
    <div ref={ref} className={panelState(running, live)}>
      <Frame title={copy.title} note={copy.note}>
        <div className="relative">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-hairline px-4 py-2.5 sm:gap-x-6">
            <span className="micro-label text-muted">{copy.item}</span>
            <span className="micro-label text-right text-muted">{copy.source}</span>
            <span className="micro-label w-16 text-right text-muted">{copy.state}</span>
          </div>

          <ul>
            {matches.map((match, i) => (
              <li
                key={match.name}
                style={{ '--hunt-delay': `${0.25 + i * 0.2}s` }}
                className={`hunt-row relative grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-4 py-3 sm:gap-x-6 ${
                  match.ready ? 'hunt-hit' : ''
                } ${i ? 'border-t border-hairline/70' : ''}`}
              >
                <SkeletonRow columns={2} />
                <span className="truncate text-sm text-ink">{match.name}</span>
                <span className="text-right text-sm text-muted tabular-nums">
                  {match.price ?? '—'}
                </span>
                <span
                  className="hunt-value w-16 text-right"
                  style={{ '--hunt-delay': `${0.45 + i * 0.2}s` }}
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
        <p className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline bg-paper-sunk px-4 py-3">
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
  const ref = useRef(null);
  const running = useNearViewport(ref, '0px 0px -15% 0px');
  const live = useLive(ref);
  const t = toneOf(tone);

  return (
    <div ref={ref} className={panelState(running, live)}>
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
