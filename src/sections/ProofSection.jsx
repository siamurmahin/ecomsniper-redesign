import SectionHeading from '../components/ui/SectionHeading';
import Icon from '../components/ui/Icon';
import YouTubeFacade from '../components/ui/YouTubeFacade';
import { PROOF, SITE } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useParallax } from '../hooks/useParallax';

// Eager glob so the JSX can look media up by the plain key in siteContent
// instead of importing eight files by hand.
const VIDEO_THUMBS = import.meta.glob('../assets/video/*.jpg', { eager: true, import: 'default' });
const RECEIPTS = import.meta.glob('../assets/proof/*.png', { eager: true, import: 'default' });

const thumbUrl = (key) => VIDEO_THUMBS[`../assets/video/${key}.jpg`];
const receiptUrl = (key) => RECEIPTS[`../assets/proof/${key}.png`];

/**
 * 04 — Proof: video, reviews, receipts. Structure kept from the original, with
 * the review fixes applied: a live Trustpilot link, reviews in full rather than
 * cut mid-sentence, and the disclaimer under the proof instead of in a footnote.
 *
 * Three kinds of evidence on purpose — a face, a written review and a
 * dashboard answer the same objection for three kinds of sceptic.
 */
export default function ProofSection() {
  const sectionRef = useRevealOnScroll();
  const glowRef = useParallax(0.12);

  const [featuredVideo, ...moreVideos] = PROOF.videos;

  return (
    <section
      ref={sectionRef}
      id="proof"
      aria-labelledby="proof-headline"
      className="section-band relative overflow-hidden"
    >
      {/* Slow-drifting wash — the parallax cue that this band has depth. */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(48rem_28rem_at_50%_20%,var(--color-accent-wash),transparent_70%)]"
      />

      <div className="site-shell">
        <SectionHeading
          eyebrow={PROOF.eyebrow}
          align="center"
          headline={
            <span id="proof-headline">
              {PROOF.headline} <span className="headline-mark">{PROOF.headlineMark}</span>{' '}
              {PROOF.headlineTail}
            </span>
          }
          lead={PROOF.lead}
        />

        {/* Member interviews */}
        <div className="mt-14 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          <div data-reveal data-reveal-group="proof-video-lead">
            <YouTubeFacade
              videoId={featuredVideo.id}
              title={featuredVideo.title}
              guest={featuredVideo.guest}
              poster={thumbUrl(featuredVideo.thumb)}
              className="shadow-float"
            />
          </div>

          {/* The remaining four sit in a compact 2×2 beside the lead video. */}
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-2">
            {moreVideos.map((video) => (
              <li key={video.id} data-reveal data-reveal-group="proof-video-grid">
                <YouTubeFacade
                  videoId={video.id}
                  title={video.title}
                  guest={video.guest}
                  poster={thumbUrl(video.thumb)}
                />
              </li>
            ))}
          </ul>
        </div>

        <p
          data-reveal
          data-reveal-group="proof-video-note"
          className="mt-5 flex items-center justify-center gap-2 text-xs text-muted"
        >
          <Icon name="youtube" className="size-4 text-ebay-red" />
          Full interviews on the EcomSniper channel. Nothing loads from YouTube until you press play.
        </p>

        {/* Receipts */}
        <div className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="micro-label text-muted">The receipts</h3>
            <p className="text-sm text-muted">Screenshots members posted themselves.</p>
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROOF.receipts.map((receipt) => (
              <li
                key={receipt.key}
                data-reveal
                data-reveal-group="proof-receipts"
                className="overflow-hidden rounded-2xl border border-hairline bg-white/70 transition-[transform,box-shadow] duration-400 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-lift"
              >
                {/* Fixed-height window: the screenshots have different aspect
                    ratios, and letterboxing them would waste the whole row. */}
                <div className="h-52 overflow-hidden border-b border-hairline bg-paper-sunk">
                  <img
                    src={receiptUrl(receipt.key)}
                    alt={receipt.detail}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover object-top"
                  />
                </div>

                <div className="p-5">
                  <p className="font-display text-lg font-extrabold tracking-tight">
                    {receipt.caption}
                  </p>
                  <p className="mt-1 text-[0.85rem] leading-relaxed text-muted">{receipt.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Written reviews */}
        <div className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="micro-label text-muted">Read them</h3>
            {/* Deck fix: the review column has to reach the live profile. */}
            <a
              href={SITE.trustpilotUrl}
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              Verify every review on Trustpilot
              <Icon
                name="arrowRight"
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROOF.reviews.map((review) => (
              <li
                key={review.name + review.title}
                data-reveal
                data-reveal-group="proof-reviews"
                className="card-paper flex flex-col transition-[transform,box-shadow] duration-400 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-lift"
              >
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

                <p className="mt-4 flex gap-0.5 text-ebay-green" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Icon key={index} name="star" className="size-3.5" />
                  ))}
                </p>

                <h4 className="mt-2 text-sm font-semibold">{review.title}</h4>

                {/* Deck fix: no mid-sentence truncation. Reviews run in full. */}
                <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">{review.body}</p>
              </li>
            ))}
          </ul>

          {/* Deck fix: the disclaimer belongs under the proof, in plain sight. */}
          <p
            data-reveal
            data-reveal-group="proof-disclaimer"
            className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-muted"
          >
            {PROOF.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
