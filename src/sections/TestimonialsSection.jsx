import { useCallback, useEffect, useRef, useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import Icon from '../components/ui/Icon';
import RatingStars from '../components/ui/RatingStars';
import { PROOF, SITE } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

/** Below this the wall becomes a swipe rail. Matches Tailwind's `sm`. */
const NARROW_QUERY = '(max-width: 639px)';

/**
 * 04d — Written reviews, as a drifting wall.
 *
 * Three columns of reviews moving at different speeds, the same device the
 * proof wall in 04a uses. Worth saying plainly: 04a already drifts three
 * columns, and running the same device twice in one section is the exact thing
 * the row version was chosen to avoid. What keeps them apart is that 04a's
 * columns sit BEHIND an ink card and carry mixed evidence — video, receipts,
 * reviews — while this is a plain wall of one kind of thing with nothing over
 * it. If the two still read as one idea repeated, this is the one to change,
 * because 04a is making the harder argument.
 *
 * Eighteen reviews, dealt round-robin into the columns rather than sliced.
 * Sliced, one column gets the run of short recent ones and another gets the
 * long older ones, and the columns visibly differ in density.
 *
 * Every card is unique — no name appears twice anywhere in the section. That
 * was the open problem when there were six reviews, and it was fixed by
 * collecting more of them rather than by a layout that hides the repeat.
 */

/** Three columns, each a different speed and direction so no row lines up. */
const COLUMN_SETTINGS = [
  { direction: 'animate-rail-up', duration: '62s' },
  { direction: 'animate-rail-down', duration: '78s' },
  { direction: 'animate-rail-up', duration: '70s' },
];

const COLUMNS = (() => {
  const columns = [[], [], []];
  PROOF.reviews.forEach((review, index) => columns[index % 3].push(review));
  return columns;
})();

function ReviewCard({ review }) {
  return (
    <article className="card-ink flex w-full flex-col">
      <div className="flex items-center gap-3">
        {/* Inverted with the band: paper disc, ink initial. */}
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-paper text-sm font-bold text-ink"
        >
          {review.name.charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-paper">{review.name}</span>
          <span className="block text-xs text-muted-dark">
            {review.country} · {review.when}
          </span>
        </span>
      </div>

      {/* Drawn from the review's own score rather than five stars for
          everyone. Manor left four, and the `?? 5` fallback was rendering him
          five until every review started carrying a rating. */}
      <p className="mt-4 flex items-center gap-2">
        <RatingStars rating={review.rating ?? 5} />
        <span className="sr-only">Rated {review.rating ?? 5} out of 5</span>
      </p>

      <h4 className="mt-2 text-sm font-semibold text-paper">{review.title}</h4>

      {/* Full, never clipped. A review cut mid-sentence to fit a card is the
          one thing already rejected here. */}
      <p className="mt-2 text-[0.85rem] leading-relaxed text-muted-dark">{review.body}</p>
    </article>
  );
}

/**
 * The mobile shape: one row you swipe, with arrows for anyone who would rather
 * press something.
 *
 * A wall needs columns, and below `sm` there is only room for one — a single
 * column of reviews drifting past is a much weaker thing than the wall it is
 * standing in for. Across, the same eighteen read as a stack you move through.
 *
 * Native `overflow-x` with scroll snapping, so the swipe is the browser's own
 * and costs nothing: momentum, rubber-banding and the scrollbar all come free.
 * Lenis is not a concern here — it disables itself entirely on coarse
 * pointers, and it only ever drives the vertical axis anyway, so there is
 * deliberately no `data-lenis-prevent`: that would trap the page's own scroll
 * under a thumb that is trying to leave the section.
 */
function ReviewRail() {
  const railRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const syncEdges = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    // 1px of slack: scrollLeft is fractional at some zoom levels and an exact
    // comparison never becomes true.
    setEdges({
      start: rail.scrollLeft <= 1,
      end: rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 1,
    });
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;

    syncEdges();
    rail.addEventListener('scroll', syncEdges, { passive: true });
    const observer = new ResizeObserver(syncEdges);
    observer.observe(rail);

    return () => {
      rail.removeEventListener('scroll', syncEdges);
      observer.disconnect();
    };
  }, [syncEdges]);

  const step = useCallback((direction) => {
    const rail = railRef.current;
    if (!rail) return;
    // One card, not one screen: a card is the unit the snap points are on.
    const card = rail.firstElementChild;
    const distance = card ? card.getBoundingClientRect().width + 16 : rail.clientWidth;
    rail.scrollBy({ left: direction * distance, behavior: 'smooth' });
  }, []);

  return (
    <div className="sm:hidden">
      <div
        ref={railRef}
        className="edge-fade-x flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {PROOF.reviews.map((review) => (
          <div key={review.name + review.title} className="w-[82vw] max-w-sm shrink-0 snap-center">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={edges.start}
          aria-label="Previous review"
          className="grid size-11 place-items-center rounded-full border border-ink-line bg-ink-soft text-paper transition-colors duration-300 hover:bg-paper/10 disabled:pointer-events-none disabled:opacity-35"
        >
          <Icon name="arrowRight" className="size-4 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={edges.end}
          aria-label="Next review"
          className="grid size-11 place-items-center rounded-full border border-ink-line bg-ink-soft text-paper transition-colors duration-300 hover:bg-paper/10 disabled:pointer-events-none disabled:opacity-35"
        >
          <Icon name="arrowRight" className="size-4" />
        </button>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRevealOnScroll();
  const { testimonials } = PROOF;

  /* Which shape to build, decided in JS rather than by hiding one with CSS.
     Both are eighteen cards, and the wall duplicates its columns to close the
     loop — rendering both would put fifty-four review cards in a document
     already carrying about 4,500 nodes, for the sake of showing eighteen.

     Read synchronously on the first render so a phone never paints the wall
     and then swaps it out. */
  const [isNarrow, setIsNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(NARROW_QUERY).matches,
  );

  useEffect(() => {
    const query = window.matchMedia(NARROW_QUERY);
    const sync = () => setIsNarrow(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-headline"
      /* Ink, for two reasons. The band before this is paper-sunk and the one
         after is paper, so on paper it had no edges — the section-band padding
         either side read as dead space rather than as separation, worst of all
         against the pillars below. And written reviews are the quietest
         evidence on the page; the lights down is what makes a wall of them
         feel like something rather than a list.

         Sequence is now sunk → ink → sunk → ink → paper across 04a to 06. */
      className="section-band relative overflow-hidden bg-ink text-paper"
    >
      <div className="site-shell">
        <SectionHeading
          tone="ink"
          eyebrow={testimonials.eyebrow}
          align="center"
          headline={
            <span id="testimonials-headline">
              {testimonials.headline}{' '}
              {/* Inverted: the ink block would vanish on this band. */}
              <span className="headline-mark-on-ink">{testimonials.headlineMark}</span>
              {testimonials.headlineTail}
            </span>
          }
          lead={testimonials.lead}
        />
      </div>

      {/* Below sm the wall has room for exactly one column, which is not a
          wall — it is a single list drifting past. Across is the better shape
          at that width, and it is the one a thumb already knows. */}
      {isNarrow && (
        <div className="mt-12">
          <ReviewRail />
        </div>
      )}

      {/* The wall. A fixed height with a mask top and bottom: the columns run
          past it in both directions, which is what makes it read as a wall
          rather than as three lists that happen to be sliding.

          `rail-hold` pauses rather than stops, so a column holds its place
          under the pointer instead of snapping back to the top. */}
      {!isNarrow && (
      <div className="site-shell mt-12">
        {/* Height is what sets how many reviews are on screen at once, and at
            34rem the wall showed about two cards per column — enough to read
            as a list, not enough to read as a wall. 48rem clears a third card
            in every column, which is the point: the argument a written review
            makes is cumulative, and one more row is one more of it.

            A card here runs 200–320px depending on how long the review is, so
            this is sized off the tallest rather than an average. */}
        <div className="rail-hold edge-fade-y h-[38rem] overflow-hidden lg:h-[48rem]">
          <div className="grid h-full grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COLUMNS.map((column, index) => (
              <div
                key={COLUMN_SETTINGS[index].direction + index}
                /* The third column is the one to drop first: two columns of
                   reviews still read as a wall, three at tablet width squeeze
                   every card to a measure nobody can read. */
                className={index === 2 ? 'hidden lg:block' : index === 1 ? 'hidden sm:block' : ''}
              >
                <div
                  className={COLUMN_SETTINGS[index].direction}
                  style={{ '--rail-duration': COLUMN_SETTINGS[index].duration }}
                >
                  <div className="flex flex-col gap-5">
                    {column.map((review) => (
                      <ReviewCard key={review.name + review.title} review={review} />
                    ))}
                  </div>

                  {/* Second copy closes the loop — the keyframe walks the
                      column up by half its own height, so the seam never
                      reaches the viewport. Same content, so it is hidden
                      rather than read out twice. */}
                  <div aria-hidden="true" className="mt-5 flex flex-col gap-5">
                    {column.map((review) => (
                      <ReviewCard key={`echo-${review.name}${review.title}`} review={review} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}

      {/* A button, because this is the section's one real action: eighteen
          reviews are a claim, and this is the reader checking it. As a line of
          muted text under a wall of cards it read as a caption.

          Bordered rather than filled. It leaves for somebody else's site, so
          it must not carry more weight than "Start your eBay business" — the
          same reasoning as the YouTube pill in 04b, and the two now match.

          The star stays gold: every RatingStars on this page is gold, and
          reaching for Trustpilot's own green here would put a fifth colour on
          a page built from four signal tones. */}
      <div className="site-shell mt-12 flex justify-center">
        <a
          href={SITE.trustpilotUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 rounded-full border border-ink-line bg-ink-soft py-3 pl-3 pr-5 text-sm font-semibold text-paper transition-[background-color,border-color,transform] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-paper/30 hover:bg-paper/10"
        >
          <span
            aria-hidden="true"
            className="grid size-7 shrink-0 place-items-center rounded-full bg-signal-gold text-ink"
          >
            <Icon name="star" className="size-4" />
          </span>
          {PROOF.verifyLabel}
          <Icon
            name="arrowRight"
            className="size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>
    </section>
  );
}
