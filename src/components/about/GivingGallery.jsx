/**
 * The giving gallery.
 *
 * Their page runs six captioned photographs here. Five are carried over; the
 * sixth was a stock image from Unsplash sitting among real charity work, three
 * screens under a promise not to create false impressions — see
 * `docs/source-copy/about.md`.
 *
 * The photographs themselves are the client's and are not in the repo yet, so
 * each tile renders its caption over a labelled placeholder. When the images
 * arrive, add `src` to each item in `content/en/about.js` and the tile uses it
 * — nothing else changes.
 */
export default function GivingGallery({ items }) {
  return (
    <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
      {items.map((item, index) => (
        <li
          key={item.caption}
          data-reveal
          data-reveal-group="gallery"
          /* The first tile takes two columns so the grid reads as a gallery
             rather than as six equal boxes. */
          className={`group relative isolate overflow-hidden rounded-2xl border border-hairline bg-paper-sunk ${
            index === 0 ? 'col-span-2 aspect-[16/10] sm:col-span-2' : 'aspect-[4/3]'
          }`}
        >
          {item.src ? (
            <img
              src={item.src}
              alt={item.alt ?? ''}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
            />
          ) : (
            <span
              aria-hidden="true"
              className="absolute inset-0 grid place-items-center text-[0.6rem] uppercase tracking-[0.18em] text-muted/70"
            >
              Photograph to come
            </span>
          )}

          {/* The caption sits on the image, so it needs its own ground. */}
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/45 to-transparent p-4 pt-10">
            <span className="text-sm font-semibold leading-snug text-paper">{item.caption}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
