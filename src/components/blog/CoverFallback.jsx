import ReticleMark from '../ui/ReticleMark';

/**
 * The cover a post gets when it has none.
 *
 * Not every post has cover art and not every post will: their founder's letter
 * has none on their own site, and a company writing a letter is not going to
 * commission a graphic for it. A card with a hole where the others have an
 * image reads as a page that failed to load rather than as a post without a
 * picture, which is what it is.
 *
 * Drawn rather than fetched — the brand ground under the reticle, both of
 * which already exist. It costs no request and no bytes beyond the markup, so
 * a hundred coverless posts cost what one does. A stock photograph would have
 * been the obvious answer and is the wrong one: it would be the only image on
 * this site that illustrates nothing, on the one post that is a person
 * speaking plainly.
 *
 * The category sits under the mark so the panel says something true about the
 * post rather than being pure decoration.
 *
 * @param {object} props
 * @param {string} [props.label] Usually the post's category.
 */
export default function CoverFallback({ label }) {
  return (
    <span
      aria-hidden="true"
      className="brand-ground absolute inset-0 grid place-items-center overflow-hidden bg-paper-sunk"
    >
      {/* The dot field, as CSS rather than the canvas: this is a 400px panel
          that never animates, and mounting a second `HeroDots` per card to
          draw a static texture would be a canvas for every post on the page. */}
      <span
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '14px 14px',
          color: 'rgb(30 31 35 / 0.10)',
        }}
      />

      <span className="relative flex flex-col items-center gap-3">
        <ReticleMark className="size-12 opacity-90" />
        {label && (
          <span className="font-label text-[0.62rem] uppercase tracking-[0.18em] text-muted">
            {label}
          </span>
        )}
      </span>
    </span>
  );
}
