import { useState } from 'react';
import { ASSURANCE, PROOF_BAR } from '../data/siteContent';
import CountUp from '../components/reactbits/CountUp';
import Icon from '../components/ui/Icon';
import RatingStars from '../components/ui/RatingStars';
import CountryTicker from '../components/ui/CountryTicker';
import SpotlightCard from '../components/reactbits/SpotlightCard';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { prefersReducedMotion } from '../lib/motion';
import { toneOf } from '../lib/signalTones';

/**
 * 02 — Proof bar. Its whole value is that every number is checkable: the score
 * links to the live profile and the member count matches the rest of the site.
 * Inconsistent numbers read as advertising; consistent ones read as evidence.
 *
 * Ink rather than paper because this sits between a white hero and a near-white
 * section, and a bordered white card on a white page is a box with nothing in
 * it. The cards themselves are the hero's support tiles rebuilt for a dark
 * ground — corner wash, filled glyph tile, hover lift — so the two read as one
 * system rather than as a hero and then a caption.
 */

/**
 * Presentation per figure, aligned to PROOF_BAR.items by index.
 *
 * `spotlight` is the pointer highlight, and it is set here rather than taken
 * from the tone: the values in the tone table are mixed for paper, where a
 * tint darkens the surface it lands on. On ink the highlight has to add light
 * instead, so each one is the tone's soft step — the one drawn to survive on a
 * dark ground — carried a little further up.
 */
const ITEM_META = [
  { kind: 'rating', tone: 'gold', icon: 'star', spotlight: 'rgb(232 184 102 / 0.22)' },
  { kind: 'figure', tone: 'blue', icon: 'people', spotlight: 'rgb(91 157 240 / 0.24)' },
  { kind: 'figure', tone: 'green', icon: 'headset', spotlight: 'rgb(158 212 32 / 0.20)' },
  { kind: 'marketplaces', tone: 'red', icon: 'verified', spotlight: 'rgb(239 122 118 / 0.22)' },
];

/**
 * A figure that counts up and then states the exact number.
 *
 * `CountUp` uses a spring, and a spring approaches its target asymptotically —
 * it settled on "4.5" and "392+". On a bar claiming these numbers are
 * checkable, landing near the number is landing wrong. So the moment it reports
 * done it is swapped for the copy deck's string, which also unmounts the spring.
 */
function ProofFigure({ item }) {
  const [settled, setSettled] = useState(false);

  if (settled) return item.value;

  return (
    <>
      <CountUp to={item.countTo} duration={1.6} onEnd={() => setSettled(true)} />
      {item.suffix}
    </>
  );
}

export default function ProofBarSection() {
  const sectionRef = useRevealOnScroll({ start: 'top 92%' });
  // Read once at mount: a number ticking upward is motion like any other.
  const staticNumbers = prefersReducedMotion();
  // Counted rather than written down, so the label cannot drift from the flags.
  const countryCount = ASSURANCE.countries.list.length;

  return (
    <section
      ref={sectionRef}
      aria-label="Proof and trust signals"
      className="relative isolate overflow-hidden bg-ink py-12 text-paper sm:py-14"
    >
      {/* The signal set as a hairline along the top edge, as on the header. It
          is the one place the four brand colours appear together, so it marks
          the band as ours without tinting anything inside it. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,var(--color-signal-blue)_0%,var(--color-signal-red)_34%,var(--color-signal-gold)_67%,var(--color-signal-green)_100%)]"
      />
      {/* Light thrown from above so the band has a centre rather than reading as
          a flat rectangle. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_22rem_at_50%_-10%,rgba(91,157,240,0.18),transparent_70%)]"
      />

      <div className="site-shell">
        {/* The label is pinned and the flags run past it, so the row reads as
            one statement rather than as a caption sitting above a decoration.
            min-w-0 lets the track be clipped instead of widening the row. */}
        <div
          className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6"
          data-reveal
          data-reveal-group="proof-bar"
        >
          {/* self-center only while the label is stacked above the ticker:
              once it sits beside it the row handles alignment, and centring a
              pinned label would pull it off the flags it introduces. */}
          {/* The soft step, not the brand green: #86b817 on ink sits at about
              4:1, which is under the bar for text this small.

              The eyebrow's rule takes the same hue at under half strength. Left
              grey it read as a leftover from the default style, and at full
              strength it competed with the words it is only there to lead into. */}
          <p className="section-eyebrow section-eyebrow-on-ink shrink-0 self-center text-signal-green-soft before:bg-signal-green-soft/45 sm:self-auto">
            Trusted by sellers in {countryCount} countries
          </p>
          <CountryTicker onInk className="min-w-0 flex-1" />
        </div>

        <dl className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {PROOF_BAR.items.map((item, index) => {
            const meta = ITEM_META[index];
            const tone = toneOf(meta.tone);
            const Wrapper = item.href ? 'a' : 'div';

            return (
              <SpotlightCard
                key={item.label}
                className="rounded-2xl"
                spotlightColor={meta.spotlight}
              >
                <div
                  data-reveal
                  data-reveal-group="proof-bar"
                  className="group relative h-full overflow-hidden rounded-2xl border border-ink-line bg-ink-soft/70 p-4 transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-paper/25 hover:shadow-float sm:p-5"
                >
                  {/* The same corner wash the hero tiles and the pillar cards use,
                      carried a little stronger here because a tint has less to
                      work with on ink than it does on paper. */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-10 -top-10 size-24 rounded-full bg-gradient-to-br to-transparent opacity-70 blur-2xl ${tone.wash}`}
                  />

                  <Wrapper
                    {...(item.href
                      ? { href: item.href, rel: 'noopener noreferrer', className: 'relative block' }
                      : { className: 'relative block' })}
                  >
                    <span
                      className={`grid size-9 place-items-center rounded-lg transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 ${tone.tile}`}
                    >
                      <Icon name={meta.icon} className="size-[1.05rem]" />
                    </span>

                    <dd className="mt-3.5 font-display text-2xl font-extrabold tracking-tight tabular-nums sm:text-3xl">
                      {meta.kind === 'marketplaces' ? (
                        // The marks rather than their names in type: a logo a
                        // visitor already recognises is the evidence here, and it
                        // carries at a smaller size than a figure needs.
                        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg leading-none">
                          <span className="flex items-center gap-1.5">
                            <Icon name="ebay" className="size-5" />
                            eBay
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Icon name="amazon" className="size-4" />
                            Amazon
                          </span>
                        </span>
                      ) : (
                        <>
                          {item.countTo && !staticNumbers ? (
                            <ProofFigure item={item} />
                          ) : (
                            item.value
                          )}
                          {item.href && (
                            <span
                              aria-hidden="true"
                              className="ml-1 inline-block text-base text-paper/40 transition-transform duration-300 group-hover:translate-x-0.5"
                            >
                              ↗
                            </span>
                          )}
                        </>
                      )}
                    </dd>

                    {meta.kind === 'rating' && (
                      // Gold rather than the card's own tone: review stars are
                      // gold everywhere a visitor has ever seen one, and a rating
                      // in the wrong colour stops reading as a rating. The soft
                      // step is the one drawn to survive on ink.
                      <RatingStars
                        rating={item.countTo}
                        fill="text-signal-gold-soft"
                        track="text-paper/15"
                        className="mt-1.5"
                      />
                    )}

                    <dt className="mt-1.5 text-sm font-semibold">{item.label}</dt>
                    <p className="mt-0.5 text-xs text-muted-dark">{item.detail}</p>
                  </Wrapper>
                </div>
              </SpotlightCard>
            );
          })}
        </dl>

        {/* A link, not a button. The hero one screen up already asks twice; a
            third button here would compete with it, and the job of this band is
            to be checkable rather than to sell again. It points at the section
            that shows the working. */}
        <p className="mt-7 text-center text-sm text-muted-dark" data-reveal data-reveal-group="proof-bar">
          <a
            href="#proof"
            className="group inline-flex items-center gap-1.5 font-semibold text-paper underline decoration-paper/30 underline-offset-4 transition-colors hover:text-signal-green-soft hover:decoration-signal-green-soft/60"
          >
            See the proof — video, reviews and receipts
            <Icon
              name="arrowRight"
              className="size-3.5 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5"
            />
          </a>
        </p>
      </div>
    </section>
  );
}
