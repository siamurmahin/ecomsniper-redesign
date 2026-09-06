import { PRICE_MONITOR as EN_PRICE_MONITOR } from '../content/en/priceMonitor';
import { overlay as germanPriceMonitor } from '../content/de/priceMonitor';
import { usePageContent } from '../hooks/usePageContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { toneOf } from '../lib/signalTones';
import { MonitorFeed, PriceChangePanel, StockPanel } from '../components/watch/WatchPanels';
import CtaButton from '../components/ui/CtaButton';
import HeroSurface from '../components/hero/HeroSurface';
import MarkedHeadline from '../components/ui/MarkedHeadline';
import FaqSection from '../sections/FaqSection';
import AssuranceSection from '../sections/AssuranceSection';

/**
 * Price Monitor — the last of the four feature pages.
 *
 * The only one with no second version of itself. There is no readable slug on
 * their site and no sitemap entry; the page is reachable from their nav and
 * their JS bundle alone. So `/price-monitor` is ours, written to match the
 * three beside it, and `/priceMonitorV6` 301s onto it the same way.
 *
 * **Two sections rather than a run of steps.** Product Hunter and Competitor
 * Research are both procedures — do this, then this, then this — and their
 * pages are numbered lists because that is what using the tool is like. This
 * one is not a procedure: the entire product is that you do nothing. So the
 * page is the two cases it covers, then the claim that it runs while you are
 * not looking, and a numbered list would have been the wrong shape borrowed
 * from the page before it.
 *
 * The bodies of those two cases are **our draft** — theirs repeat the
 * headline's sentence with one word swapped, which is placeholder that was
 * never rewritten. Flagged in `docs/TODO.md` under Blocked, as the job advert
 * and the blog bodies were. Everything else on the page is their copy.
 *
 * The hero gets a door their page does not have above the fold, and the
 * guarantee closes the page as it does on the other three.
 */

/* Module scope so the hook memo has a stable dependency. */
const OVERLAYS = { de: germanPriceMonitor.PRICE_MONITOR };

/** One of the two cases: marker, words, and the panel that shows it. */
function Case({ item, index, panel }) {
  const tone = toneOf(item.tone);
  const flip = index % 2 === 1;

  return (
    <li className="relative grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
      <div className={flip ? 'lg:order-2' : undefined}>
        <span
          data-reveal
          data-reveal-group={`watch-${index}`}
          className={`inline-grid size-12 place-items-center rounded-full border border-dashed font-display text-base font-extrabold ${tone.ring} ${tone.text}`}
        >
          {item.n}
        </span>

        <h3
          data-reveal
          data-reveal-group={`watch-${index}`}
          className="mt-5 text-[length:var(--text-section)] leading-tight"
        >
          {item.title}
        </h3>

        <p
          data-reveal
          data-reveal-group={`watch-${index}`}
          className="mt-4 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted"
        >
          {item.body}
        </p>
      </div>

      <div
        data-reveal
        data-reveal-group={`watch-${index}`}
        className={flip ? 'lg:order-1' : undefined}
      >
        {index === 0 ? <PriceChangePanel copy={panel.price} /> : <StockPanel copy={panel.stock} />}
      </div>
    </li>
  );
}

export default function PriceMonitorPage() {
  const PM = usePageContent(EN_PRICE_MONITOR, OVERLAYS);
  const casesRef = useRevealOnScroll();
  const backgroundRef = useRevealOnScroll();

  return (
    <>
      <HeroSurface>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <p className="section-eyebrow" data-reveal data-reveal-group="pm-hero">
              {PM.eyebrow}
            </p>

            <h1
              className="mt-5 max-w-[15ch] text-[length:var(--text-hero)] leading-[0.95]"
              data-reveal
              data-reveal-group="pm-hero"
            >
              <MarkedHeadline parts={PM.headlineParts} />
            </h1>

            <p
              className="mt-6 max-w-xl font-serif text-2xl leading-relaxed italic text-muted"
              data-reveal
              data-reveal-group="pm-hero"
            >
              {PM.lead}
            </p>

            {/* The door their page does not have above the fold. */}
            <div
              className="mt-9 flex flex-wrap items-center gap-4"
              data-reveal
              data-reveal-group="pm-hero"
            >
              <CtaButton href={PM.ctas.primary.href}>{PM.ctas.primary.label}</CtaButton>
              <CtaButton href={PM.ctas.secondary.href} variant="secondary">
                {PM.ctas.secondary.label}
              </CtaButton>
            </div>
          </div>

          {/* A day of the store, in three events. Their page's one animated
              sequence is the whole product, so it is the hero. */}
          <div data-reveal data-reveal-group="pm-hero">
            <MonitorFeed copy={PM.panel.feed} />
          </div>
        </div>
      </HeroSurface>

      {/* Measured, not estimated — the same reading taken on Competitor
          Research, because a wrong `--defer-h` moves the ground under a reader
          mid-scroll. 1280px in two columns and 2430px stacked, read by forcing
          the grid to one column at 360px. Guessing from the page before it got
          both numbers low: two cases are not half of four steps, because the
          band's own heading and lead do not halve with them. */}
      <section
        ref={casesRef}
        id="what-changes"
        aria-labelledby="changes-headline"
        className="section-band defer-render bg-paper-sunk [--defer-h:2450px] lg:[--defer-h:1300px]"
      >
        <div className="site-shell">
          <p className="section-eyebrow" data-reveal data-reveal-group="changes-head">
            {PM.changes.eyebrow}
          </p>

          <h2
            id="changes-headline"
            className="mt-4 max-w-[18ch] text-[length:var(--text-section)] leading-[1.05]"
            data-reveal
            data-reveal-group="changes-head"
          >
            <MarkedHeadline parts={PM.changes.headlineParts} />
          </h2>

          <p
            className="mt-5 max-w-xl font-serif text-xl leading-relaxed italic text-muted"
            data-reveal
            data-reveal-group="changes-head"
          >
            {PM.changes.lead}
          </p>

          <ol className="mt-16 grid gap-20 lg:gap-28">
            {PM.changes.items.map((item, index) => (
              <Case key={item.title} item={item} index={index} panel={PM.panel} />
            ))}
          </ol>
        </div>
      </section>

      {/* Their closing claim, and the reason the page exists at all. No panel:
          the two above have shown the work, and a third picture of the same
          idea would be the "two steps illustrated by one screenshot" fault
          that `HuntPanels` was written to avoid, in reverse. */}
      <section ref={backgroundRef} aria-labelledby="background-headline" className="section-band">
        <div className="site-shell">
          <div className="max-w-3xl">
            <p className="section-eyebrow" data-reveal data-reveal-group="bg">
              {PM.background.eyebrow}
            </p>

            <h2
              id="background-headline"
              className="mt-4 text-[length:var(--text-section)] leading-[1.05]"
              data-reveal
              data-reveal-group="bg"
            >
              <MarkedHeadline parts={PM.background.headlineParts} />
            </h2>

            <p
              className="mt-5 font-serif text-xl leading-relaxed italic text-muted"
              data-reveal
              data-reveal-group="bg"
            >
              {PM.background.lead}
            </p>

            <p
              className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted"
              data-reveal
              data-reveal-group="bg"
            >
              {PM.background.body}
            </p>
          </div>
        </div>
      </section>

      {/* The questions, then the guarantee — the order every feature page,
          Contact and /faq all use. The same sections the homepage renders,
          never a second set of answers, and no FAQPage schema here: that lives
          on the /faq route. */}
      <FaqSection />

      <AssuranceSection />
    </>
  );
}
