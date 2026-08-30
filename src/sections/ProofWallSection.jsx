import Icon from '../components/ui/Icon';
import CtaButton from '../components/ui/CtaButton';
import RatingStars from '../components/ui/RatingStars';
import { PROOF, SITE } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { receiptUrl, thumbUrl } from '../lib/proofMedia';
import { toneOf } from '../lib/signalTones';

/**
 * 04 — Proof, variant C: a wall of evidence with the argument standing still
 * in front of it.
 *
 * The other two variants present the proof one piece at a time. This one makes
 * the quantity itself the argument: the first thing a visitor registers is not
 * any single receipt but that there are a lot of them, and they keep coming.
 * The centre card is the only thing not moving, which is what makes it read as
 * the thing to act on.
 *
 * The wall is real content in a real list — the same receipts and reviews,
 * uncut — not a decorative texture. That is the whole point: a wall of
 * placeholder shapes would be a lie about how much proof exists.
 */

/** Three columns, each a different speed and direction so no row lines up. */
const COLUMN_SETTINGS = [
  { direction: 'animate-rail-up', duration: '58s' },
  { direction: 'animate-rail-down', duration: '74s' },
  { direction: 'animate-rail-up', duration: '66s' },
];

/*
 * Every piece of evidence on the page, dealt round-robin into three columns so
 * each one carries a mix. Dealt rather than sliced: sliced, one column is all
 * screenshots and another is all text, and the wall stops reading as one body
 * of evidence.
 */
const COLUMNS = (() => {
  const all = [
    ...PROOF.reviews.map((item) => ({ kind: 'review', id: item.name + item.title, item })),
    ...PROOF.receipts.map((item) => ({ kind: 'receipt', id: item.key, item })),
    ...PROOF.videos.map((item) => ({ kind: 'video', id: item.id, item })),
  ];

  const columns = [[], [], []];
  all.forEach((entry, index) => columns[index % 3].push(entry));
  return columns;
})();

function WallCard({ entry }) {
  if (entry.kind === 'receipt') {
    const { item } = entry;
    return (
      <figure className="overflow-hidden rounded-2xl border border-hairline bg-white/80 shadow-lift">
        <div className="h-36 overflow-hidden border-b border-hairline bg-paper-sunk">
          <img
            src={receiptUrl(item.key)}
            alt={item.detail}
            loading="lazy"
            decoding="async"
            className="size-full object-cover object-top"
          />
        </div>
        <figcaption className="p-4">
          <p className="font-display text-base font-extrabold tracking-tight">{item.caption}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">{item.detail}</p>
        </figcaption>
      </figure>
    );
  }

  if (entry.kind === 'video') {
    const { item } = entry;
    return (
      <figure className="overflow-hidden rounded-2xl border border-hairline shadow-lift">
        <div className="relative">
          <img
            src={thumbUrl(item.thumb)}
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-video w-full object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink"
          >
            <Icon name="play" className="size-3.5 translate-x-px" />
          </span>
        </div>
        <figcaption className="bg-white/80 p-4">
          <p className="micro-label text-muted">{item.guest}</p>
          <p className="mt-1 text-sm font-semibold leading-snug">{item.title}</p>
        </figcaption>
      </figure>
    );
  }

  const { item } = entry;
  return (
    <article className="card-paper shadow-lift">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-paper"
        >
          {item.name.charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold">{item.name}</span>
          <span className="block text-[0.7rem] text-muted">
            {item.country} · {item.when}
          </span>
        </span>
      </div>

      <p className="mt-3 flex items-center gap-2">
        <RatingStars rating={item.rating ?? 5} />
        <span className="sr-only">Rated {item.rating ?? 5} out of 5</span>
      </p>

      <h4 className="mt-2 text-sm font-semibold">{item.title}</h4>
      <p className="mt-1.5 text-[0.8rem] leading-relaxed text-muted">{item.body}</p>
    </article>
  );
}

export default function ProofWallSection() {
  const sectionRef = useRevealOnScroll();

  return (
    <section
      ref={sectionRef}
      id="proof"
      aria-labelledby="proof-headline"
      className="section-band relative overflow-hidden bg-paper-sunk"
    >
      {/* The wall. Held behind the card and masked at both ends so it has no
          visible first or last row — the point is that it does not end. */}
      <div className="rail-hold pointer-events-none absolute inset-0 overflow-hidden">
        <div className="edge-fade-y site-shell h-full">
          <div className="grid h-full grid-cols-2 gap-4 lg:grid-cols-3">
            {COLUMNS.map((column, index) => (
              <div
                key={COLUMN_SETTINGS[index].direction + index}
                /* The third column is the one to drop first: two columns of
                   evidence on a phone is already a wall, three is a wall you
                   cannot read anything on. */
                className={`${index === 2 ? 'hidden lg:block' : ''} rail-viewport overflow-hidden`}
              >
                <div
                  className={COLUMN_SETTINGS[index].direction}
                  style={{ '--rail-duration': COLUMN_SETTINGS[index].duration }}
                >
                  <ul className="flex flex-col gap-4">
                    {column.map((entry) => (
                      <li key={entry.id}>
                        <WallCard entry={entry} />
                      </li>
                    ))}
                  </ul>
                  {/* Second copy closes the loop; same content, so it is
                      hidden rather than read out twice. */}
                  <ul aria-hidden="true" className="mt-4 flex flex-col gap-4">
                    {column.map((entry) => (
                      <li key={`echo-${entry.id}`}>
                        <WallCard entry={entry} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The still thing. Ink against a paper wall, so it separates by value
          and not only by shadow — a paper card on a paper wall needs a heavy
          shadow to hold, and the shadow is what makes those look generic.

          It carries the question and the door, nothing else. The interview,
          the receipts and the reviews moved to 04b: a card big enough to hold
          them is a card that covers the wall it is supposed to be standing in
          front of, and then neither half works. */}
      <div className="site-shell relative flex min-h-[34rem] flex-col lg:min-h-[40rem]">
        {/* The card centres in whatever space is left after the disclaimer
            takes the bottom. Centring the two together instead parks the
            disclaimer in the middle of the wall with a gap under it, reading
            as a label stuck on the artwork rather than a footing. */}
        <div className="flex flex-1 items-center justify-center py-4">
          <div
            data-reveal
            data-reveal-group="proof-card"
            className="w-full max-w-xl rounded-[1.75rem] border border-ink-line bg-ink p-7 text-center text-paper shadow-float sm:p-10"
          >
          <p className="section-eyebrow section-eyebrow-on-ink justify-center before:hidden">
            {PROOF.eyebrow}
          </p>

          <h2
            id="proof-headline"
            className="mt-4 text-[length:var(--text-section)] leading-[0.98] text-paper"
          >
            {PROOF.headline}{' '}
            <span className="inline-block bg-paper px-2.5 pb-1 text-ink">{PROOF.headlineMark}</span>{' '}
            {PROOF.headlineTail}
          </h2>

          <p className="mt-5 text-[length:var(--text-lead)] leading-relaxed text-muted-dark">
            {PROOF.lead}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4">
            <CtaButton href={PROOF.cta.href} variant="onInk" intent="proof-pricing">
              {PROOF.cta.label}
            </CtaButton>

            {/* Left as a link, deliberately, unlike the matching one in 04d.
                It sits directly under "See what it costs" — the page's own
                CTA — and two buttons stacked would make the reader choose
                between them. This one is the quiet second option. */}
            <a
              href={SITE.trustpilotUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-dark transition-colors hover:text-paper"
            >
              {PROOF.verifyLabel}
              <Icon
                name="arrowRight"
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            </div>
          </div>
        </div>

        {/* The wall itself carries earnings screenshots, so the qualification
            has to sit in this section and not only under the readable copies
            in 04b.

            Set as a solid card rather than a translucent wash. At 85% over
            drifting evidence cards the type was competing with whatever
            happened to be behind it, and a disclaimer that cannot be read
            comfortably is not doing the job it is there for. Opaque paper, a
            hairline, a lift and a tone rule down the leading edge — the same
            parts every other surface on this page is built from, so it reads
            as a deliberate note and not as a caption that lost its
            background. */}
        <div className="mx-auto flex max-w-3xl overflow-hidden rounded-xl border border-hairline bg-paper shadow-lift">
          <span aria-hidden="true" className={`w-1 shrink-0 ${toneOf('gold').rule}`} />
          <p className="px-5 py-4 text-center text-xs leading-relaxed text-muted">
            {PROOF.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
