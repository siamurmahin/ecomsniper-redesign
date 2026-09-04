import { PRODUCT_HUNTER as EN_PRODUCT_HUNTER } from '../content/en/productHunter';
import { overlay as germanProductHunter } from '../content/de/productHunter';
import { usePageContent } from '../hooks/usePageContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { toneOf } from '../lib/signalTones';
import { HuntTable, ExtractPanel, PastePanel, ResultsPanel } from '../components/hunt/HuntPanels';
import CtaButton from '../components/ui/CtaButton';
import HeroDots from '../components/hero/HeroDots';
import AssuranceSection from '../sections/AssuranceSection';

/**
 * Product Hunter — the first of the four feature pages.
 *
 * Their copy is the `V6` rewrite; the readable slug is the one we keep, with
 * `/productHunterV6` redirecting onto it. Decided 4 Sep, in `docs/TODO.md`.
 *
 * **On the pictures.** Their page is seven screenshots — the extension's own
 * windows, Amazon results, eBay filters — and we hold none of them; real
 * captures are still waiting on the client. Rather than ship labelled holes,
 * each step draws a small mock of itself in markup and CSS, which is what
 * `FeatureTourSection` already does on the homepage for the same reason. It
 * costs no bytes, it cannot go stale against a UI that changes, and it shows
 * the step happening rather than illustrating it. Replace with real captures
 * when they arrive; the layout takes an image in the same slot.
 *
 * **The hero gets a door.** Theirs has no call to action above the fold at
 * all — the first is at the foot, past three steps. That is the same funnel
 * hole their About page has, and the fix is the one the rest of this site
 * uses: the pricing door, and the free playbook beside it for the reader who
 * is not ready.
 *
 * The guarantee closes the page, as it does on Contact and /faq: the last
 * thing read before a decision should be what happens if it goes wrong.
 */

/* Module scope so the hook memo has a stable dependency. */
const OVERLAYS = { de: germanProductHunter.PRODUCT_HUNTER };

/** Their device: a run of the headline set in an inverted block. */
function Marked({ parts }) {
  return (
    <>
      {parts.map((part, i) =>
        part.mark ? (
          <span key={i} className="headline-mark-ink">
            {part.text}
          </span>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}

/** One step: marker, words, and its own mock, alternating sides. */
/**
 * The panel that belongs to each step. One each, and no two alike.
 *
 * An earlier pass showed the hunt table for both step one and step three. Two
 * steps illustrated by the same picture makes the second one read as
 * decoration, and it left the real question of each step unanswered: where the
 * candidate list comes from, and what the run hands back at the end. The hunt
 * table stays in the hero, where it is the argument for the whole page.
 */
function StepPanel({ index, panel, tone }) {
  if (index === 0) {
    return <ExtractPanel copy={panel.extract} listings={panel.listings} tone={tone} />;
  }

  if (index === 1) {
    return <PastePanel copy={panel.paste} titles={panel.titles} tone={tone} />;
  }

  return <ResultsPanel copy={panel.results} matches={panel.matches} tone={tone} />;
}

function Step({ item, index, panel }) {
  const tone = toneOf(item.tone);
  const flip = index % 2 === 1;

  return (
    <li className="relative grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
      <div className={flip ? 'lg:order-2' : undefined}>
        <span
          data-reveal
          data-reveal-group={`step-${index}`}
          className={`inline-grid size-12 place-items-center rounded-full border border-dashed font-display text-base font-extrabold ${tone.ring} ${tone.text}`}
        >
          {item.n}
        </span>

        <h3
          data-reveal
          data-reveal-group={`step-${index}`}
          className="mt-5 text-[length:var(--text-section)] leading-tight"
        >
          {item.title}
        </h3>

        <p
          data-reveal
          data-reveal-group={`step-${index}`}
          className="mt-4 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted"
        >
          {item.body}
        </p>
      </div>

      <div
        data-reveal
        data-reveal-group={`step-${index}`}
        className={flip ? 'lg:order-1' : undefined}
      >
        <StepPanel index={index} panel={panel} tone={item.tone} />
      </div>
    </li>
  );
}

export default function ProductHunterPage() {
  const PH = usePageContent(EN_PRODUCT_HUNTER, OVERLAYS);
  const heroRef = useRevealOnScroll();
  const stepsRef = useRevealOnScroll();

  return (
    <>
      <section
        ref={heroRef}
        className="brand-ground relative isolate overflow-hidden pt-36 pb-20 sm:pt-44 lg:pt-52 lg:pb-24"
      >
        <HeroDots />

        <div className="site-shell">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div>
              <p className="section-eyebrow" data-reveal data-reveal-group="ph-hero">
                {PH.eyebrow}
              </p>

              <h1
                className="mt-5 max-w-[16ch] text-[length:var(--text-hero)] leading-[0.95]"
                data-reveal
                data-reveal-group="ph-hero"
              >
                <Marked parts={PH.headlineParts} />
              </h1>

              <p
                className="mt-6 max-w-xl font-serif text-2xl leading-relaxed italic text-muted"
                data-reveal
                data-reveal-group="ph-hero"
              >
                {PH.lead}
              </p>

              {/* The door their page does not have above the fold. */}
              <div
                className="mt-9 flex flex-wrap items-center gap-4"
                data-reveal
                data-reveal-group="ph-hero"
              >
                <CtaButton href={PH.ctas.primary.href}>{PH.ctas.primary.label}</CtaButton>
                <CtaButton href={PH.ctas.secondary.href} variant="secondary">
                  {PH.ctas.secondary.label}
                </CtaButton>
              </div>
            </div>

            {/* The result of the hunt, shown rather than described. Their page
                puts a screenshot of Amazon here; this is the same idea drawn
                in markup until real captures arrive. */}
            <div data-reveal data-reveal-group="ph-hero">
              <HuntTable copy={PH.panel.hunt} rows={PH.panel.rows} tone="blue" />
            </div>
          </div>
        </div>
      </section>

      <section
        ref={stepsRef}
        id="the-hunt"
        aria-labelledby="hunt-headline"
        className="section-band defer-render bg-paper-sunk [--defer-h:2400px] lg:[--defer-h:1600px]"
      >
        <div className="site-shell">
          <p className="section-eyebrow" data-reveal data-reveal-group="hunt-head">
            {PH.steps.eyebrow}
          </p>

          <h2
            id="hunt-headline"
            className="mt-4 max-w-[18ch] text-[length:var(--text-section)] leading-[1.05]"
            data-reveal
            data-reveal-group="hunt-head"
          >
            <Marked parts={PH.steps.headlineParts} />
          </h2>

          <p
            className="mt-5 max-w-xl font-serif text-xl leading-relaxed italic text-muted"
            data-reveal
            data-reveal-group="hunt-head"
          >
            {PH.steps.lead}
          </p>

          <ol className="mt-16 grid gap-20 lg:gap-28">
            {PH.steps.items.map((item, index) => (
              <Step key={item.title} item={item} index={index} panel={PH.panel} />
            ))}
          </ol>
        </div>
      </section>

      {/* The guarantee closes it, as on Contact and /faq: the last thing read
          before a decision should be what happens if it goes wrong. */}
      <AssuranceSection />
    </>
  );
}
