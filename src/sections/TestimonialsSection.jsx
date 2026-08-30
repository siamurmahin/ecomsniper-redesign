import SectionHeading from '../components/ui/SectionHeading';
import Icon from '../components/ui/Icon';
import RatingStars from '../components/ui/RatingStars';
import { PROOF, SITE } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

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
    <article className="card-paper flex w-full flex-col">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-paper"
        >
          {review.name.charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold">{review.name}</span>
          <span className="block text-xs text-muted">
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

      <h4 className="mt-2 text-sm font-semibold">{review.title}</h4>

      {/* Full, never clipped. A review cut mid-sentence to fit a card is the
          one thing already rejected here. */}
      <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">{review.body}</p>
    </article>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRevealOnScroll();
  const { testimonials } = PROOF;

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-headline"
      className="section-band relative overflow-hidden"
    >
      <div className="site-shell">
        <SectionHeading
          eyebrow={testimonials.eyebrow}
          align="center"
          headline={<span id="testimonials-headline">{testimonials.headline}</span>}
          lead={testimonials.lead}
        />
      </div>

      {/* The wall. A fixed height with a mask top and bottom: the columns run
          past it in both directions, which is what makes it read as a wall
          rather than as three lists that happen to be sliding.

          `rail-hold` pauses rather than stops, so a column holds its place
          under the pointer instead of snapping back to the top. */}
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

      <div className="site-shell mt-10 flex justify-center">
        <a
          href={SITE.trustpilotUrl}
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          <Icon name="star" className="size-4 shrink-0 text-signal-gold" />
          {PROOF.verifyLabel}
          <Icon
            name="arrowRight"
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>
    </section>
  );
}
