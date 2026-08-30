import { useParallax } from '../../hooks/useParallax';

/**
 * The member figures as two rows of pills that slide past each other on scroll.
 *
 * PARALLAX AND NOT A MARQUEE, deliberately. The page already carries seven
 * things that move on a timer — the aurora and dot field in the hero, the
 * country ticker, the audience rotation, and three drifting columns each in
 * the proof wall and the reviews. An eighth would read as noise. These move
 * only while the reader is scrolling, in opposite directions, so the effect is
 * depth rather than another thing demanding attention. Standing still, the
 * section is still.
 *
 * The two must not be combined: `useParallax` writes `x` through GSAP while a
 * marquee keyframe writes `transform`, and in Tailwind v4 those are separate
 * properties that multiply rather than override. That is the hour-costing trap
 * already recorded for `scale-y-0`.
 *
 * Each pill opens its interview, so this is a fast index into the twelve for
 * someone scanning for a number rather than a name — and the numbers make the
 * section's argument on their own: twelve people, twelve different results.
 *
 * @param {object} props
 * @param {Array} props.videos Full video list; entries without a `figure` are skipped.
 * @param {(index: number, event: Event) => void} props.onSelect Given the index in `videos`.
 */
export default function FigureRail({ videos, onSelect }) {
  const topRef = useParallax(0.09, { axis: 'x' });
  const bottomRef = useParallax(-0.09, { axis: 'x' });

  /* Index is captured against the FULL list, not the filtered one: the
     lightbox steps through all twelve, so a pill has to know where its video
     sits among them and not among the eight that happen to carry a figure. */
  const withFigures = videos
    .map((video, index) => ({ video, index }))
    .filter(({ video }) => Boolean(video.figure));

  if (withFigures.length === 0) return null;

  const rows = [
    { items: withFigures.filter((_, i) => i % 2 === 0), ref: topRef },
    { items: withFigures.filter((_, i) => i % 2 === 1), ref: bottomRef },
  ];

  return (
    <div className="edge-fade-x space-y-3 overflow-hidden py-1">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} ref={row.ref} className="flex w-max gap-3">
          {/* Three passes so each row is wider than any viewport and the
              parallax never drags an end into view. Only the first pass is
              real; the copies are hidden from assistive tech AND taken out of
              the tab order, so nothing focusable hides inside `aria-hidden`. */}
          {[0, 1, 2].map((pass) =>
            row.items.map(({ video, index }) => {
              const isEcho = pass > 0;

              return (
                <button
                  key={`${pass}-${video.id}`}
                  type="button"
                  onClick={(event) => onSelect(index, event)}
                  aria-hidden={isEcho || undefined}
                  tabIndex={isEcho ? -1 : undefined}
                  aria-haspopup={isEcho ? undefined : 'dialog'}
                  aria-label={isEcho ? undefined : `Play: ${video.title}`}
                  className="group inline-flex shrink-0 items-baseline gap-2.5 rounded-full border border-ink-line bg-ink-soft/70 py-2.5 pl-5 pr-4 transition-[background-color,border-color,transform] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-paper/30 hover:bg-paper/10"
                >
                  <span className="font-display text-base font-extrabold tracking-tight text-paper">
                    {video.figure}
                  </span>
                  <span className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-dark">
                    {video.figureWho}
                  </span>
                </button>
              );
            }),
          )}
        </div>
      ))}
    </div>
  );
}
