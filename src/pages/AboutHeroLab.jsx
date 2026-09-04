import { ABOUT as EN_ABOUT } from '../content/en/about';
import { overlay as germanAbout } from '../content/de/about';
import { usePageContent } from '../hooks/usePageContent';
import { useContent } from '../hooks/useContent';
import { SAMMY_PORTRAIT } from '../assets/giving';
import CtaButton from '../components/ui/CtaButton';

/**
 * THROWAWAY. About hero directions, fourth pass.
 *
 * A and B adapt the two shadcn/studio heroes the client sent. Both of those
 * are dense two-column marketing heroes, and the transferable part is the
 * RIGHT COLUMN: not a single card, but a layered composition that bleeds past
 * its own bounds. That is what the earlier passes were missing.
 *
 * What does not transfer is their content. Hero 03 fills that column with
 * revenue dashboards — "$89.34k Total Profit", "Sales Growth" — and this page
 * says, four screens down, that it will not show screenshots of big earnings
 * because they create false hope. So the wall is built from the client's own
 * charity photographs instead, which is the one rich asset we actually hold.
 *
 *   A  THE WALL.   After hero-03. Two staggered photo columns bleeding off
 *                  the top and bottom edges, masked at both.
 *   B  THE BREAK.  After hero-12. The founder escapes his frame — the panel
 *                  is behind him and he overflows it.
 *   C  THE FIELD.  Kept from the third pass for contrast: one saturated
 *                  colour, no imagery at all.
 *
 * Not linked, not prerendered, noindex. Deleted with the losers.
 */

const OVERLAYS = { de: germanAbout.ABOUT };

/**
 * Which reviews may appear in the About hero.
 *
 * This page promises, four screens down, that it will not show screenshots of
 * big earnings because "those create false hope. They make people spend money
 * expecting the same results." A hero stacked with income claims would break
 * that promise before the reader reaches it.
 *
 * So the rule is enforced here rather than remembered: any review quoting a
 * sum of money is filtered out, and stays out when someone adds reviews to the
 * deck later without reading this file. Today that removes exactly one — the
 * "$99 made me $500" review — and every remaining one is about the support,
 * the community and whether the team is straight with you, which is what this
 * page is actually claiming about itself.
 */
const QUOTES_MONEY = /\$|\bUSD\b|\bdollars?\b|\bprofits?\b/i;

const characterReviews = (reviews = []) => reviews.filter((r) => !QUOTES_MONEY.test(r.body));

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-paper py-1 pr-4 pl-1">
      <span className="rounded-full bg-ink px-2.5 py-1 font-label text-[0.65rem] tracking-[0.1em] text-paper uppercase">
        {children.chip}
      </span>
      <span className="text-sm text-muted">{children.label}</span>
    </span>
  );
}

function Ctas({ ctas, variant = 'secondary', className = '' }) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <CtaButton href={ctas.primary.href}>{ctas.primary.label}</CtaButton>
      <CtaButton href={ctas.secondary.href} variant={variant}>
        {ctas.secondary.label}
      </CtaButton>
    </div>
  );
}

/* The proof row hero-03 puts under its buttons. Theirs is a stack of avatars
   and a star rating; ours is three figures that can be checked, because
   inventing reviewer faces on this page of all pages would be indefensible.
   The Trustpilot score is a link for the same reason. */
function ProofRow({ trustpilotUrl }) {
  return (
    <dl className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-hairline pt-6">
      <div className="flex items-baseline gap-2">
        <dt className="font-display text-lg font-extrabold text-ink">4.7</dt>
        <dd className="text-sm text-muted">
          on{' '}
          <a
            href={trustpilotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline underline-offset-2"
          >
            Trustpilot
          </a>
          , from 42 reviews
        </dd>
      </div>
      <div className="flex items-baseline gap-2">
        <dt className="font-display text-lg font-extrabold text-ink">400+</dt>
        <dd className="text-sm text-muted">members in 8 countries</dd>
      </div>
    </dl>
  );
}

/** One review, set as a card. Never truncated — a clipped review is a quote
    put into someone's mouth. Cards therefore vary in height, which is what
    makes the staggered wall read as real rather than as a grid of widgets. */
function ReviewCard({ review }) {
  return (
    <figure className="rounded-2xl bg-paper p-6 ring-1 ring-hairline">
      <div aria-hidden className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`size-3 rounded-[2px] ${i < review.rating ? 'bg-signal-green' : 'bg-hairline'}`}
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

/* ================================================================ A ====== */
/* THE WALL. Hero 03's right column works because it does not end: the cards
   run off the top and the bottom, so the eye reads "there is more of this"
   without a single word saying so. Two columns, one offset against the other,
   masked top and bottom so the bleed reads as intentional rather than clipped. */
function HeroWall({ about, reviews, trustpilotUrl }) {
  const usable = characterReviews(reviews);
  const columns = [usable.filter((_, i) => i % 2 === 0), usable.filter((_, i) => i % 2 === 1)];

  return (
    <section className="mx-auto grid max-w-[92rem] items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-10">
      <div>
        <Badge>{{ chip: 'About us', label: 'Why we are careful with your money' }}</Badge>

        <h1 className="mt-7 max-w-[16ch] font-display text-[clamp(2.5rem,5.2vw,4.25rem)] leading-[1.06] font-extrabold tracking-tight text-ink">
          {about.headline}
        </h1>

        <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-muted">{about.statement}</p>

        <Ctas ctas={about.ctas} className="mt-9" />
        <ProofRow trustpilotUrl={trustpilotUrl} />
      </div>

      {/* The wall. Fixed viewport height with the stacks taller than it, so
          both ends genuinely overflow rather than being faked with padding,
          and masked at each end so the bleed reads as intentional. Hidden
          below lg: two columns of review cards on a phone is unreadable, and
          the page has the full proof section further down anyway. */}
      <div
        className="relative hidden h-[36rem] overflow-hidden lg:block"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)',
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
    </section>
  );
}

/* ================================================================ B ====== */
/* THE BREAK. Hero 12's device is that the subject does not stay inside the
   panel behind her — she overflows it, which is what stops the composition
   reading as a stock photo in a box. Same here with the founder: the panel is
   a flat field, he sits proud of its top edge, and a small offset card laps
   its corner. Nothing is centred and nothing is symmetrical. */
function HeroBreak({ about, trustpilotUrl }) {
  return (
    <section className="mx-auto grid max-w-[86rem] items-center gap-16 px-6 py-16 lg:grid-cols-[1.1fr_1fr] lg:px-10">
      <div>
        <Badge>{{ chip: 'About us', label: 'The people behind the software' }}</Badge>

        <h1 className="mt-7 max-w-[15ch] font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.08] font-extrabold tracking-tight text-ink">
          We know what it took to earn{' '}
          {/* Their marked run, but as hero 12 sets it: a selection rather than
              a highlighter, with handles at the corners. */}
          <span className="relative inline-block bg-accent-wash px-2 py-0.5 text-ink">
            this money
            <span aria-hidden className="absolute -top-1 -left-1 size-2 bg-accent" />
            <span aria-hidden className="absolute -right-1 -bottom-1 size-2 bg-accent" />
          </span>
          .
        </h1>

        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">{about.statement}</p>

        <Ctas ctas={about.ctas} className="mt-9" />
        <ProofRow trustpilotUrl={trustpilotUrl} />
      </div>

      <div className="relative isolate mx-auto w-full max-w-[26rem]">
        {/* The field he stands proud of. */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[78%] rounded-3xl bg-ink" />

        <img
          src={SAMMY_PORTRAIT.src}
          width={SAMMY_PORTRAIT.width}
          height={SAMMY_PORTRAIT.height}
          alt="Sammy, founder of EcomSniper"
          className="relative mx-auto w-[86%] translate-y-[-2.5rem] rounded-2xl object-cover shadow-xl"
        />

        {/* The lapping card, carrying the one line the page is really about. */}
        <figure className="relative -mt-10 ml-auto w-[78%] rounded-2xl bg-paper p-5 shadow-lg ring-1 ring-hairline">
          <blockquote className="font-serif text-base leading-relaxed italic text-ink">
            “Time is the one thing you cannot get back.”
          </blockquote>
          <figcaption className="mt-3 text-xs text-muted">Sammy — Founder</figcaption>
        </figure>

        <div className="h-8" />
      </div>
    </section>
  );
}

/* ================================================================ C ====== */
/* Kept from the third pass so there is still a no-imagery option in front of
   you: one saturated field, the argument as an index, the money a footnote. */
function HeroField({ about }) {
  return (
    <section className="bg-signal-blue px-6 py-20 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="max-w-[16ch] font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.04] font-extrabold tracking-tight text-white uppercase">
          {about.headline}
        </h1>

        <ol className="mt-16 grid gap-2">
          {about.hours.map((line, i) => (
            <li
              key={line}
              className="flex items-baseline gap-5 font-display text-[clamp(1.75rem,4.5vw,3.5rem)] leading-tight font-extrabold text-white"
              style={{ opacity: 1 - i * 0.22 }}
            >
              <span className="tabular-nums opacity-60">{String(i + 1).padStart(2, '0')}</span>
              <span>{line.replace(/\.$/, '')}</span>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-8 border-t border-white/25 pt-8">
          <p className="max-w-[46ch] font-serif text-lg leading-relaxed italic text-white/85 sm:text-xl">
            {about.statement}
          </p>
          <p className="font-display text-2xl font-extrabold text-white">
            {about.figure.value}
            <span className="ml-3 align-middle font-sans text-sm font-normal text-white/70">
              {about.figure.label.toLowerCase()}
            </span>
          </p>
        </div>

        <Ctas ctas={about.ctas} className="mt-12" variant="onInk" />
      </div>
    </section>
  );
}

const HEROES = [
  {
    id: 'A',
    device: 'The wall',
    after: 'after shadcn hero-03',
    note: 'Two staggered photo columns bleeding off the top and bottom, masked at both ends. Their charity photographs, not revenue cards.',
    Component: HeroWall,
  },
  {
    id: 'B',
    device: 'The break',
    after: 'after shadcn hero-12',
    note: 'The founder overflows the panel behind him; a quote card laps its corner. Selection handles on the marked run instead of a highlighter.',
    Component: HeroBreak,
  },
  {
    id: 'C',
    device: 'One colour',
    after: 'kept from the third pass',
    note: 'No imagery at all. The hours are the headline and the money is the footnote.',
    Component: HeroField,
  },
];

export default function AboutHeroLab() {
  const about = usePageContent(EN_ABOUT, OVERLAYS);
  /* PROOF is already re-exported from content/en/index.js, so it is in the
     eager global deck every visitor downloads. Reading it here costs nothing. */
  const { PROOF, SITE } = useContent();

  return (
    <div className="bg-paper">
      <div className="border-b border-hairline bg-paper-sunk px-6 py-6">
        <p className="mx-auto max-w-6xl text-sm text-muted">
          <strong className="text-ink">About hero — fourth pass.</strong> A and B adapt the two
          shadcn heroes; C is kept for contrast. Scratch page: not linked, not indexed.
        </p>
      </div>

      {HEROES.map(({ id, device, after, note, Component }) => (
        <div key={id} className="border-b-4 border-hairline">
          <div className="mx-auto flex max-w-6xl items-baseline gap-4 px-6 pt-10 pb-4">
            <span className="font-display text-3xl font-extrabold text-ink">{id}</span>
            <span>
              <span className="font-label text-base text-ink">{device}</span>
              <span className="ml-2 text-sm text-muted italic">{after}</span>
              <span className="block max-w-2xl text-sm text-muted">{note}</span>
            </span>
          </div>
          <Component about={about} reviews={PROOF.reviews} trustpilotUrl={SITE.trustpilotUrl} />
        </div>
      ))}
    </div>
  );
}
