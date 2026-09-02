import { useContent } from '../../hooks/useContent';
import { useCallback, useRef } from 'react';
import Icon from './Icon';
import { useModalLayer } from '../../hooks/useModalLayer';

/**
 * A YouTube interview played over the page. The player only exists while this
 * is open, so "nothing loads until you press play" stays true — opening it is
 * pressing play. Changing key is not enough to stop a video; the component
 * unmounts when video goes null, which is what does it.
 *
 * @param {object} props
 * @param {object|null} props.video The video to play, or null when closed.
 * @param {() => void} props.onClose
 * @param {(direction: number) => void} [props.onStep] Previous/next, if the caller has a list.
 * @param {number} [props.index] Position in that list, zero-based.
 * @param {number} [props.total]
 */
export default function VideoLightbox({ video, onClose, onStep, index, total }) {
  const { A11Y } = useContent();
  const dialogRef = useRef(null);

  const close = useCallback(() => onClose(), [onClose]);

  useModalLayer(Boolean(video), { onClose: close, dialogRef });

  if (!video) return null;

  const hasList = typeof onStep === 'function' && typeof total === 'number';
  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-ink/80 p-3 backdrop-blur-sm sm:p-8"
      onClick={(event) => event.target === event.currentTarget && close()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-dialog-title"
        tabIndex={-1}
        /* `overflow-y-auto` and not `hidden`: on a short viewport — a phone in
           landscape especially — the player plus its details are taller than
           the screen, and hiding the overflow would cut the close button off
           with no way to reach it. */
        className="flex max-h-full w-full max-w-4xl flex-col overflow-y-auto rounded-2xl border border-ink-line bg-ink text-paper shadow-float focus-visible:outline-none sm:rounded-3xl"
        style={{ animation: 'exit-intent-in 420ms var(--ease-out-expo) both' }}
      >
        {/* Player first: it is what the click asked for, and a header above it
            would push it down the screen on a laptop. */}
        <div className="relative aspect-video w-full shrink-0 bg-black">
          <iframe
            key={video.id}
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        </div>

        {/* Stacked below `sm`, side by side above it. Wrapping alone was not
            enough: `flex-1` with `min-w-0` lets the title shrink instead of
            wrapping, so at 500px it was a 199px column of broken words beside
            199px of buttons. Stacking gives the title the full width and puts
            the controls under it. */}
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-x-6 sm:p-6">
          <div className="min-w-0 sm:flex-1">
            <p className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.14em] text-muted-dark">
              {video.guest}
              {/* Only the videos whose figure was recorded show one. An
                  invented count is worse than none. */}
              {video.views && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{video.views} views</span>
                </>
              )}
            </p>

            <h3
              id="video-dialog-title"
              className="mt-2 font-display text-lg font-extrabold leading-snug tracking-tight"
            >
              {video.title}
            </h3>

            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3 inline-flex items-center gap-2 text-sm font-medium text-muted-dark transition-colors hover:text-paper"
            >
              <Icon name="youtube" className="size-4 shrink-0 text-ebay-red" />
              Watch on YouTube
              <Icon
                name="arrowRight"
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>

          {/* `shrink-0` so the buttons keep their tap size when the title is
              long; `justify-between` on mobile spreads the counter away from
              the controls rather than crowding them into one corner. */}
          <div className="flex shrink-0 items-center justify-between gap-2 sm:justify-end">
            {hasList && (
              <>
                <span className="mr-auto text-xs tabular-nums text-muted-dark sm:mr-1">
                  {index + 1} / {total}
                </span>
                <button
                  type="button"
                  onClick={() => onStep(-1)}
                  aria-label={A11Y.prevInterview}
                  className="grid size-10 place-items-center rounded-full border border-ink-line text-paper transition-colors duration-300 hover:bg-paper/10"
                >
                  <Icon name="arrowRight" className="size-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => onStep(1)}
                  aria-label={A11Y.nextInterview}
                  className="grid size-10 place-items-center rounded-full border border-ink-line text-paper transition-colors duration-300 hover:bg-paper/10"
                >
                  <Icon name="arrowRight" className="size-4" />
                </button>
              </>
            )}

            <button
              type="button"
              onClick={close}
              aria-label={A11Y.close}
              className="ml-1 grid size-10 place-items-center rounded-full border border-ink-line text-paper transition-colors duration-300 hover:bg-paper/10"
            >
              <Icon name="close" className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
