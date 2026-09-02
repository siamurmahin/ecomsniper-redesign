import { useParallax } from '../../hooks/useParallax';

/**
 * Member figures as two rows of pills sliding past each other on scroll.
 *
 * Parallax, not a marquee: the page already has seven things moving on a
 * timer, and an eighth reads as noise. These move only while scrolling, so
 * standing still the section is still.
 *
 * Do not combine the two — useParallax writes x through GSAP while a marquee
 * keyframe writes transform, and in Tailwind v4 those multiply, not override.
 *
 * @param {object} props
 * @param {Array} props.videos Full video list; entries without a figure are skipped.
 * @param {(index: number, event: Event) => void} props.onSelect Given the index in videos.
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
