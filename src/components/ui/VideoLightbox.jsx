import { useCallback, useRef } from 'react';
import Icon from './Icon';
import { useModalLayer } from '../../hooks/useModalLayer';

/**
 * A YouTube interview, played over the page.
 *
 * The player only exists while this is open, so the section's promise — that
 * nothing loads from YouTube until you press play — still holds. Opening the
 * lightbox IS pressing play: there is no poster-then-iframe step here the way
 * there is in `YouTubeFacade`, because the click that opened it was already
 * the decision to watch.
 *
 * `key` on the iframe in the parent is not enough to stop a video when the
 * selection changes — the src has to change, and it does, because the whole
 * component unmounts when `video` goes null.
 *
 * @param {object} props
 * @param {object|null} props.video The video to play, or null when closed.
 * @param {() => void} props.onClose
 * @param {(direction: number) => void} [props.onStep] Previous/next, if the caller has a list.
 * @param {number} [props.index] Position in that list, zero-based.
 * @param {number} [props.total]
 */
export default function VideoLightbox({ video, onClose, onStep, index, total }) {
  const dialogRef = useRef(null);

  const close = useCallback(() => onClose(), [onClose]);

  useModalLayer(Boolean(video), { onClose: close, dialogRef });

  if (!video) return null;

  const hasList = typeof onStep === 'function' && typeof total === 'number';
  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-ink/80 p-4 backdrop-blur-sm sm:p-8"
      onClick={(event) => event.target === event.currentTarget && close()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-dialog-title"
        tabIndex={-1}
        className="flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-ink-line bg-ink text-paper shadow-float focus-visible:outline-none"
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

        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4 p-5 sm:p-6">
          <div className="min-w-0 flex-1">
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

          <div className="flex items-center gap-2">
            {hasList && (
              <>
                <span className="mr-1 text-xs tabular-nums text-muted-dark">
                  {index + 1} / {total}
                </span>
                <button
                  type="button"
                  onClick={() => onStep(-1)}
                  aria-label="Previous interview"
                  className="grid size-10 place-items-center rounded-full border border-ink-line text-paper transition-colors duration-300 hover:bg-paper/10"
                >
                  <Icon name="arrowRight" className="size-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => onStep(1)}
                  aria-label="Next interview"
                  className="grid size-10 place-items-center rounded-full border border-ink-line text-paper transition-colors duration-300 hover:bg-paper/10"
                >
                  <Icon name="arrowRight" className="size-4" />
                </button>
              </>
            )}

            <button
              type="button"
              onClick={close}
              aria-label="Close"
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
