import { useRef } from 'react';
import { useNearViewport } from '../../hooks/useNearViewport';
import { toneOf } from '../../lib/signalTones';
import Icon from '../ui/Icon';
import { Frame, huntTiming, rowDelay } from './HuntPanels';
import amazonSource from '../../assets/lister/amazon-source.webp';

/**
 * The photographs the gallery tiles show.
 *
 * Globbed rather than named one by one so the set is changed by dropping files
 * in the folder, and eager because that only pulls in six URL strings — the
 * files themselves are still fetched by the browser, lazily, when the panel
 * scrolls up. This module is in the AI Lister route's chunk, so none of it is
 * on the homepage's critical path.
 *
 * They are stock photographs of garden work, not the real listing: the client
 * has not supplied captures yet, and every panel on this page is captioned as
 * an illustration. Quality 50 at 360px, which is 2x the 177px the tiles
 * measure — see the `lister` row in `scripts/optimize-images.mjs`.
 */
const GALLERY = import.meta.glob('../../assets/lister/garden-*.webp', {
  eager: true,
  import: 'default',
});
const PHOTOS = Object.keys(GALLERY)
  .sort()
  .map((key) => GALLERY[key]);

/**
 * The AI Lister panels.
 *
 * Same rule the Product Hunter panels follow, and it is the one that decides
 * every choice here: **only what the software produces is allowed to animate.**
 *
 *   picking a product   the seller does it   static
 *   pasting links       the seller does it   static
 *   finding images      the software does it plays
 *   writing the title   the software does it plays
 *   posting listings    the software does it plays
 *
 * Loading in something the seller already had is pretending work is happening
 * that is not, which is what an earlier pass did with the pasted titles on the
 * other page.
 *
 * Nothing implies a return. The About page promises no screenshots of big
 * earnings, so these show a listing being made rather than what it made.
 */

/** Step one. Static: the seller picked this. */
export function PickPanel({ copy, tone = 'blue' }) {
  const t = toneOf(tone);

  return (
    <Frame title={copy.title} note={copy.note}>
      <div className="flex gap-4 p-4">
        {/* Deliberately the worst photograph in the set: an item dumped on
            pavement, which is what a source listing usually gives you. The
            next panel is the software finding better ones, and that step only
            reads if there is something here to improve on. It is not one of
            the six, so it is imported rather than globbed. */}
        <img
          src={amazonSource}
          alt=""
          width="160"
          height="160"
          loading="lazy"
          decoding="async"
          className="size-20 shrink-0 rounded-lg bg-ink/[0.06] object-cover"
        />

        <span className="min-w-0 flex-1">
          <span className="block text-sm leading-snug text-ink">{copy.name}</span>
          <span className="mt-1.5 block font-display text-xl font-extrabold text-ink">
            {copy.price}
          </span>
          <span className="mt-1 block text-xs text-muted">{copy.meta}</span>
        </span>
      </div>

      <p className="border-t border-hairline bg-paper-sunk px-4 py-3">
        <span
          className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${t.tile}`}
        >
          <Icon name="arrowRight" className="size-3.5" />
          {copy.action}
        </span>
      </p>
    </Frame>
  );
}

/**
 * Step two. The images arrive, because the software finds them — "EcomSniper
 * automatically finds product images" is the claim, so the panel shows them
 * being found rather than sitting there already found.
 */
export function ImagePanel({ copy, tone = 'gold' }) {
  const ref = useRef(null);
  const running = useNearViewport(ref, '0px 0px -15% 0px');
  const t = toneOf(tone);

  return (
    <div ref={ref} className={running ? 'is-running' : undefined} style={huntTiming(PHOTOS.length)}>
      <Frame title={copy.title} note={copy.note}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className="micro-label text-muted">{copy.label}</span>
            <span className="hunt-summary micro-label tabular-nums">
              <span className={t.text}>{copy.found}</span>
            </span>
          </div>

          <ul className="mt-3 grid grid-cols-3 gap-2.5">
            {PHOTOS.map((src, i) => (
              <li
                key={src}
                style={{ '--hunt-delay': rowDelay(i) }}
                className={`hunt-row relative aspect-square rounded-lg bg-ink/[0.06] ${
                  i === 0 ? `ring-2 ${t.edge}` : ''
                }`}
              >
                {/* Decorative: the label above already says what this grid is,
                    and the photographs are a mock rather than the listing. */}
                <img
                  src={src}
                  alt=""
                  width="360"
                  height="360"
                  loading="lazy"
                  decoding="async"
                  className="size-full rounded-lg object-cover"
                />

                {i === 0 ? (
                  <span
                    className={`hunt-summary absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full ${t.tile}`}
                  >
                    <Icon name="check" className="size-3" />
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </Frame>
    </div>
  );
}

/**
 * Step three, and the best thing on the page: the title being rewritten.
 *
 * The raw Amazon title is there from the start — it is what the seller already
 * has — and the optimised one arrives after the button, because that is the
 * part the AI does. Showing both is what makes the claim legible: a reader can
 * see what changed.
 */
export function TitlePanel({ copy, tone = 'green' }) {
  const ref = useRef(null);
  const running = useNearViewport(ref, '0px 0px -15% 0px');
  const t = toneOf(tone);

  return (
    <div ref={ref} className={running ? 'is-running' : undefined} style={huntTiming(1)}>
      <Frame title={copy.title} note={copy.note}>
        <div className="p-4">
          {/* What Amazon gave you. Static. */}
          <p className="rounded-lg bg-paper-sunk p-3 font-mono text-[0.7rem] leading-relaxed text-muted line-through decoration-ink/25">
            {copy.before}
          </p>

          <p className="mt-3">
            <span
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${t.tile}`}
            >
              <Icon name="aiSparkle" className="size-3.5" />
              {copy.button}
            </span>
          </p>

          {/* What the AI wrote. Arrives after the sweep. */}
          <div className="hunt-row mt-3" style={{ '--hunt-delay': rowDelay(0) }}>
            <p className={`rounded-lg p-3 text-sm leading-relaxed text-ink ring-1 ${t.ring}`}>
              {copy.after}
            </p>
            <span className={`micro-label mt-2 inline-flex items-center gap-1 ${t.text}`}>
              <Icon name="checkCircle" className="size-3" />
              {copy.badge}
            </span>
          </div>
        </div>
      </Frame>
    </div>
  );
}

/** Step four: the listing being assembled and posted, one line at a time. */
export function OptiListPanel({ copy, tone = 'red' }) {
  const ref = useRef(null);
  const running = useNearViewport(ref, '0px 0px -15% 0px');
  const t = toneOf(tone);

  return (
    <div
      ref={ref}
      className={running ? 'is-running' : undefined}
      style={huntTiming(copy.steps.length)}
    >
      <Frame title={copy.title} note={copy.note}>
        <div className="p-4">
          <p>
            <span
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${t.tile}`}
            >
              <Icon name="play" className="size-3.5" />
              {copy.button}
            </span>
          </p>

          <ul className="mt-4 grid gap-2.5">
            {copy.steps.map((step, i) => (
              <li
                key={step}
                style={{ '--hunt-delay': rowDelay(i) }}
                className="hunt-row flex items-center gap-2.5 text-sm text-muted"
              >
                <span className={`grid size-5 shrink-0 place-items-center rounded-full ${t.tile}`}>
                  <Icon name="check" className="size-3" />
                </span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        <p className="hunt-summary border-t border-hairline bg-paper-sunk px-4 py-3">
          <span className={`font-display text-sm font-extrabold ${t.text}`}>{copy.done}</span>
        </p>
      </Frame>
    </div>
  );
}

/** Bulk, step one. Static: the seller pasted these. */
export function LinksPanel({ copy, links, tone = 'blue' }) {
  const t = toneOf(tone);

  return (
    <Frame title={copy.title} note={copy.note}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="micro-label text-muted">{copy.label}</span>
          <span className="micro-label tabular-nums">
            <span className={t.text}>{copy.pasted}</span>
          </span>
        </div>

        <div className="mt-2.5 grid gap-2 rounded-lg border border-hairline bg-paper-sunk p-3">
          {links.map((link) => (
            <span
              key={link}
              className="truncate font-mono text-[0.7rem] leading-relaxed text-muted"
            >
              {link}
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/** Bulk, step two: the run posting, which is the whole point of the tool. */
export function BulkPanel({ copy, tone = 'red' }) {
  const ref = useRef(null);
  const running = useNearViewport(ref, '0px 0px -15% 0px');
  const t = toneOf(tone);
  const rows = [0, 1, 2, 3, 4];

  return (
    <div ref={ref} className={running ? 'is-running' : undefined} style={huntTiming(rows.length)}>
      <Frame title={copy.title} note={copy.note}>
        <div className="p-4">
          <p className="flex items-center justify-between">
            <span className="micro-label text-muted">{copy.posting}</span>
            <span
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold ${t.tile}`}
            >
              {copy.button}
            </span>
          </p>

          {/* Each bar is one listing going up. */}
          <ul className="mt-4 grid gap-2">
            {rows.map((i) => (
              <li
                key={i}
                style={{ '--hunt-delay': rowDelay(i) }}
                className="hunt-row flex items-center gap-3"
              >
                <span className="h-1.5 flex-1 rounded-full bg-ink/[0.08]">
                  <span className={`block h-full w-full rounded-full ${t.rule}`} />
                </span>
                <span className={`micro-label ${t.text}`}>
                  <Icon name="check" className="size-3" />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="hunt-summary border-t border-hairline bg-paper-sunk px-4 py-3">
          <span className={`font-display text-sm font-extrabold ${t.text}`}>
            {copy.done.replace('{n}', '184')}
          </span>
        </p>
      </Frame>
    </div>
  );
}
