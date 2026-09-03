import { GIVING_IMAGES } from '../../assets/giving';

/**
 * The giving gallery.
 *
 * Their own five charity photographs, captioned as they caption them. A sixth
 * on their page is an Unsplash stock image sitting among real charity work,
 * three screens under a promise not to create false impressions — it is not
 * carried over. See `docs/source-copy/about.md`.
 *
 * Every tile declares `width` and `height` so the grid holds its shape before
 * the files arrive; the whole set is below the fold and lazily fetched, so it
 * costs the first screen nothing.
 */
export default function GivingGallery({ items }) {
  return (
    <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
      {items.map((item, index) => {
        const image = GIVING_IMAGES[item.image];
        /* The first tile spans two columns, so the grid reads as a gallery
           rather than as five equal boxes. */
        const isLead = index === 0;

        return (
          <li
            key={item.caption}
            data-reveal
            data-reveal-group="gallery"
            className={`group relative isolate overflow-hidden rounded-2xl border border-hairline bg-paper-sunk ${
              isLead ? 'col-span-2 aspect-[16/10]' : 'aspect-[4/3]'
            }`}
          >
            {image && (
              <img
                src={image.src}
                alt={item.alt ?? ''}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
                sizes={
                  isLead ? '(min-width: 1024px) 720px, 90vw' : '(min-width: 1024px) 360px, 45vw'
                }
                className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
              />
            )}

            {/* The caption sits on the photograph, so it carries its own
                ground rather than relying on whatever is underneath it. */}
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/45 to-transparent p-4 pt-10">
              <span className="text-sm font-semibold leading-snug text-paper">{item.caption}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
