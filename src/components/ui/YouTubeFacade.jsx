import { useState } from 'react';
import Icon from './Icon';

/**
 * A YouTube player that costs nothing until it is wanted: a local poster and a
 * button until play is pressed — no script, no iframe, no third-party cookies.
 * The click that reveals the player also starts it (`autoplay=1`).
 *
 * @param {object} props
 * @param {string} props.videoId YouTube video id.
 * @param {string} props.title Video title, used as the accessible name.
 * @param {string} props.poster Imported thumbnail URL.
 * @param {string} [props.guest] Small label above the title.
 */
export default function YouTubeFacade({ videoId, title, poster, guest, className = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className={`group relative aspect-video overflow-hidden rounded-2xl border border-ink-line bg-ink ${className}`.trim()}
    >
      {isPlaying ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 size-full text-left"
        >
          {/* The accessible name carries the real title, not "play". */}
          <span className="sr-only">Play video: {title}</span>

          <img
            src={poster}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
          />

          {/* Scrim keeps the caption legible over a busy thumbnail. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/10"
          />

          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink shadow-float transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover:scale-110"
          >
            <Icon name="play" className="size-5 translate-x-0.5" />
          </span>

          <span className="absolute inset-x-0 bottom-0 block p-4 text-paper">
            {guest && <span className="micro-label block text-paper/60">{guest}</span>}
            <span className="mt-1 block text-sm font-semibold leading-snug">{title}</span>
          </span>
        </button>
      )}
    </div>
  );
}
