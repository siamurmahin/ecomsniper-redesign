import { useMemo, useRef } from 'react';
import RatingStars from '../ui/RatingStars';
import { useContent } from '../../hooks/useContent';
import { useNearViewport } from '../../hooks/useNearViewport';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * The About hero's right column: real Trustpilot reviews, drifting.
 *
 * Same cards and same motion as section 04d on the homepage — `card-ink`, the
 * initial disc, the rating drawn from the review's own score, the body never
 * clipped — dealt into columns that drift at different speeds so no two rows
 * ever line up. A reader who has seen the homepage should recognise this as
 * the same evidence, not a second design of it, which is why this imports
 * nothing new and reuses `animate-rail-up` / `animate-rail-down` and
 * `rail-hold edge-fade-y` from the stylesheet.
 *
 * **Two columns rather than three.** The hero gives this half a screen where
 * section 04d gets the full width; a third column here squeezes every card to
 * a measure nobody reads, which is the same reason 04d drops its third at
 * tablet width.
 *
 * **Reviews rather than the charity photographs**, decided 4 Sep: ~243KB off
 * the first screen, LCP stays text, and the reviews corroborate what this page
 * claims about the company — that the team answers its own support and is
 * straight with people — which a photograph of charity work cannot. The
 * photographs have their own section further down, where they are the subject.
 */

/** Two columns, different speeds and opposite directions so no row lines up. */
const COLUMN_SETTINGS = [
  { direction: 'animate-rail-up', duration: '64s' },
  { direction: 'animate-rail-down', duration: '78s' },
];

/**
 * Which reviews may appear here.
 *
 * This page promises that it will not show screenshots of big earnings because
 * "those create false hope. They make people spend money expecting the same
 * results." A hero stacked with income claims breaks that promise before the
 * reader reaches it.
 *
 * So the rule is enforced rather than remembered: any review quoting a sum of
 * money is filtered out, and stays out when someone adds reviews to the deck
 * later without reading this file. Today it removes exactly one — the reviewer
 * who reports turning $99 into $500 — and every remaining one is about
 * support, community, and whether the team is straight with you.
 *
 * It is deliberately blunt. A filter that tried to tell a fair mention of money
 * from an unfair one would be a judgement call re-made every time the deck
 * changes; this one fails safe, and the cost of it being over-eager is a
 * slightly shorter wall.
 */
const QUOTES_MONEY = /\$|\bUSD\b|\bdollars?\b|\bprofits?\b/i;

export const characterReviews = (reviews = []) =>
  reviews.filter((review) => !QUOTES_MONEY.test(review.body));

/** Dealt round-robin, not sliced: sliced, one column gets all the short ones. */
function dealColumns(reviews) {
  const columns = [[], []];
  reviews.forEach((review, index) => columns[index % 2].push(review));
  return columns;
}

/** Section 04d's card, unchanged. */
function ReviewCard({ review }) {
  const { A11Y } = useContent();

  return (
    <article className="card-ink flex w-full flex-col">
      <div className="flex items-center gap-3">
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

      <p className="mt-4 flex items-center gap-2">
        <RatingStars rating={review.rating ?? 5} />
        <span className="sr-only">{A11Y.rating.replace('{n}', review.rating ?? 5)}</span>
      </p>

      <h3 className="mt-2 text-sm font-semibold text-paper">{review.title}</h3>

      {/* Full, never clipped. A review cut mid-sentence to fit a card is a
          quote put into someone's mouth, on the page arguing this company does
          not do that. */}
      <p className="mt-2 text-[0.85rem] leading-relaxed text-muted-dark">{review.body}</p>
    </article>
  );
}

/**
 * The wall.
 *
 * Fixed height with the columns running past it, masked top and bottom, so it
 * reads as a wall rather than as two sliding lists. `rail-hold` pauses the
 * drift under the pointer instead of stopping it, so a card a reader is trying
 * to read holds still.
 *
 * **Hidden below `lg`.** Two columns of review cards on a phone is unreadable,
 * and unlike the homepage this page has no second reviews section to fall back
 * on — so what a phone gets is the hero's own argument, its figures and its
 * doors, which is the right thing for it to get.
 *
 * **Only the echo copy is `aria-hidden`.** An earlier version hid the whole
 * wall from screen readers on the grounds that the reviews appear again
 * further down the page. They do on the homepage; they do not here, and hiding
 * them would have removed this page's only social proof from anyone not
 * reading it with their eyes.
 *
 * **Under reduced motion it becomes a scrollable list.** The global rule
 * collapses every animation to its end frame, which would park a drifting
 * column on its second copy with the first unreachable — so `rail-viewport`
 * gives the box a scrollbar when the drift is off, the way `ProofWallSection`
 * already does. The echo copy is not rendered at all in that case: it exists
 * to close a loop that is no longer running, and a reader scrolling this by
 * hand would otherwise reach the same sixteen reviews twice.
 */
export default function ReviewWall({ reviews }) {
  const ref = useRef(null);
  /* The second copy is built when the wall is approached, not on first paint:
     it is the same content twice, and doubling the DOM for a seam nobody has
     scrolled to yet is weight on the first screen. */
  const isNear = useNearViewport(ref);
  /* False for the prerendered and hydrating render, which is what keeps the
     markup matching; true afterwards for a visitor who has asked the OS to
     reduce motion. */
  const isStill = useReducedMotion();
  const usable = useMemo(() => characterReviews(reviews), [reviews]);
  const columns = useMemo(() => dealColumns(usable), [usable]);

  return (
    <div
      ref={ref}
      className="rail-hold edge-fade-y rail-viewport hidden h-[34rem] overflow-hidden lg:block lg:h-[40rem]"
    >
      <div className="grid h-full grid-cols-2 items-start gap-5">
        {columns.map((column, index) => (
          <div
            key={COLUMN_SETTINGS[index].direction}
            /* The drift only starts once the wall is near: an animation
               running off screen is work nobody asked for. */
            className={isNear ? COLUMN_SETTINGS[index].direction : undefined}
            style={{ '--rail-duration': COLUMN_SETTINGS[index].duration }}
          >
            <div className="flex flex-col gap-5">
              {column.map((review) => (
                <ReviewCard key={review.name + review.title} review={review} />
              ))}
            </div>

            {/* The second copy closes the loop — the keyframe walks the column
                up by half its own height, so the seam never reaches the
                viewport. Same content, so it is hidden rather than read out
                twice. */}
            {isNear && !isStill && (
              <div aria-hidden="true" className="mt-5 flex flex-col gap-5">
                {column.map((review) => (
                  <ReviewCard key={`echo-${review.name}${review.title}`} review={review} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
