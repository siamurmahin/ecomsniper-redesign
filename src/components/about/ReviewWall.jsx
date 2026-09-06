/**
 * The About hero's right column: a staggered wall of real Trustpilot reviews.
 *
 * Chosen 7 Sep from the four passes in `AboutHeroLab`, which is deleted with
 * this commit. The direction is shadcn hero-03's — a dense two-column hero
 * whose right side is a layered composition bleeding past its own bounds,
 * rather than a single card sitting politely in a box. What does not transfer
 * is hero-03's content: it fills that column with revenue dashboards, and this
 * page promises four screens down that it will not show screenshots of big
 * earnings.
 *
 * **Reviews rather than the charity photographs**, decided 4 Sep. Three
 * reasons, in order of how much they mattered: it keeps ~243KB off the first
 * screen, it keeps LCP as text, and the reviews corroborate this page's actual
 * claim — that the team answers its own support and is straight with people —
 * which a photograph of charity work cannot. The photographs have their own
 * section further down, where they are the subject rather than the wallpaper.
 */

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
 * later without reading this file. Today it removes exactly one — the review
 * whose author reports turning $99 into $500 — and every remaining one is
 * about support, community, and whether the team is straight with you.
 *
 * It is deliberately blunt. A filter that tried to tell a fair mention of
 * money from an unfair one would be a judgement call re-made every time the
 * deck changes; this one fails safe, and the cost of it being over-eager is a
 * slightly shorter wall.
 */
const QUOTES_MONEY = /\$|\bUSD\b|\bdollars?\b|\bprofits?\b/i;

export const characterReviews = (reviews = []) =>
  reviews.filter((review) => !QUOTES_MONEY.test(review.body));

/**
 * One review, as a card.
 *
 * Never truncated: a clipped review is a quote put into someone's mouth, and
 * this is the page arguing that the company does not do that. Cards therefore
 * vary in height, which is the thing that makes the wall read as real rather
 * than as a grid of widgets.
 */
function ReviewCard({ review }) {
  return (
    <figure className="rounded-2xl bg-paper p-6 ring-1 ring-hairline">
      <div aria-hidden="true" className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`size-3 rounded-[2px] ${
              i < review.rating ? 'bg-signal-green' : 'bg-hairline'
            }`}
          />
        ))}
      </div>

      <figcaption className="sr-only">
        {review.rating} out of 5, by {review.name}
      </figcaption>

      <p className="mt-4 font-label text-base text-ink">{review.title}</p>
      <blockquote className="mt-2 text-sm leading-relaxed text-muted">{review.body}</blockquote>
      <p className="mt-4 text-xs text-muted">
        {review.name} · {review.country} · {review.when}
      </p>
    </figure>
  );
}

/**
 * The wall.
 *
 * Hero-03's right column works because it does not end: the cards run off the
 * top and the bottom, so the eye reads "there is more of this" without a word
 * saying so. Two columns, one offset against the other, with a fixed height
 * shorter than the stacks inside it so both ends genuinely overflow rather
 * than being faked with padding, and a mask at each end so the bleed reads as
 * intentional rather than as clipping.
 *
 * **Hidden below `lg`.** Two columns of review cards on a phone is unreadable,
 * and every one of these reviews appears again in the proof section further
 * down the page, so nothing is lost — which is why this is `hidden` rather
 * than a stacked fallback that would repeat that section badly.
 *
 * `aria-hidden`, for the same reason: a screen reader reaching the top of this
 * page should hear the argument, not eight reviews it will be read again
 * later. They are decoration here and content there.
 */
export default function ReviewWall({ reviews }) {
  const usable = characterReviews(reviews);
  const columns = [usable.filter((_, i) => i % 2 === 0), usable.filter((_, i) => i % 2 === 1)];

  return (
    <div
      aria-hidden="true"
      className="relative hidden h-[36rem] overflow-hidden lg:block"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)',
      }}
    >
      <div className="absolute inset-0 grid grid-cols-2 items-start gap-5">
        {columns.map((column, ci) => (
          <div
            key={ci}
            className="grid gap-5"
            style={{ transform: `translateY(${ci === 0 ? '-2rem' : '-7rem'})` }}
          >
            {column.map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
