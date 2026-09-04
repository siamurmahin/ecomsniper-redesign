import { PRODUCT_HUNTER as EN_PRODUCT_HUNTER } from '../content/en/productHunter';
import { overlay as germanProductHunter } from '../content/de/productHunter';
import { usePageContent } from '../hooks/usePageContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { toneOf } from '../lib/signalTones';
import Icon from '../components/ui/Icon';
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

/**
 * A small mock of each step, drawn rather than photographed.
 *
 * One per step and each specific to it — a generic panel three times would be
 * decoration. The animations are the step happening; `prefers-reduced-motion`
 * stops every one of them through the global rule in `index.css`.
 */
function StepVisual({ index, tone }) {
  /* 01 — eBay rows scanned for a price gap against Amazon. */
  if (index === 0) {
    const rows = [
      { ebay: '£24.99', amazon: '£11.40', gap: true },
      { ebay: '£18.50', amazon: '£16.90', gap: false },
      { ebay: '£42.00', amazon: '£19.75', gap: true },
      { ebay: '£9.99', amazon: '£8.80', gap: false },
    ];

    return (
      <ul className="step-visual grid gap-2">
        {rows.map((row, i) => (
          <li
            key={i}
            className="flex items-center gap-3 rounded-lg bg-white px-3 py-2.5 shadow-sm"
            style={{ animation: `step-row-in 3.2s ease-in-out ${i * 0.18}s infinite` }}
          >
            <span className={`size-6 shrink-0 rounded-md ${tone.tile}`} />
            <span className="flex-1 space-y-1.5">
              <span className="block h-1.5 w-3/4 rounded-full bg-ink/15" />
              <span className="block h-1.5 w-1/2 rounded-full bg-ink/10" />
            </span>
            <span className="text-right text-xs leading-tight">
              <span className="block font-semibold text-ink">{row.ebay}</span>
              <span className="block text-muted">{row.amazon}</span>
            </span>
            {row.gap ? (
              <span className={`micro-label ${tone.text}`}>gap</span>
            ) : (
              <span className="micro-label text-muted/50">—</span>
            )}
          </li>
        ))}
      </ul>
    );
  }

  /* 02 — titles pasted into the box. */
  if (index === 1) {
    return (
      <div className="step-visual">
        <div className="rounded-lg bg-white p-3 shadow-sm">
          <p className="micro-label text-muted">Paste titles</p>
          <div className="mt-2.5 grid gap-1.5 rounded-md border border-hairline p-2.5">
            {[0, 1, 2, 3, 4].map((line) => (
              <span
                key={line}
                className="block h-1.5 rounded-full bg-ink/12"
                style={{
                  width: `${[92, 78, 88, 64, 71][line]}%`,
                  animation: `step-row-in 3.2s ease-in-out ${line * 0.12}s infinite`,
                }}
              />
            ))}
          </div>
          <span
            className={`mt-3 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold ${tone.tile}`}
          >
            <Icon name="magnifier" className="size-3" />
            Open Product Hunter
          </span>
        </div>
      </div>
    );
  }

  /* 03 — the scan returning matches. */
  return (
    <div className="step-visual">
      <div className="relative overflow-hidden rounded-lg bg-white p-3 shadow-sm">
        <p className="micro-label text-muted">Results</p>
        <ul className="mt-2.5 grid gap-2">
          {[0, 1, 2].map((row) => (
            <li key={row} className="flex items-center gap-3">
              <span className="size-7 shrink-0 rounded-md bg-ink/8" />
              <span className="flex-1 space-y-1.5">
                <span className="block h-1.5 w-2/3 rounded-full bg-ink/15" />
                <span className="block h-1.5 w-1/3 rounded-full bg-ink/10" />
              </span>
              <span className={`micro-label ${tone.text}`}>+{[38, 61, 24][row]}%</span>
            </li>
          ))}
        </ul>

        {/* The beam, the same device the homepage's first step visual uses. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-accent/25 to-transparent"
          style={{ animation: 'step-scan 3.2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
        />
      </div>
    </div>
  );
}

/** One step: marker, words, and its own mock, alternating sides. */
function Step({ item, index }) {
  const tone = toneOf(item.tone);
  const flip = index % 2 === 1;

  return (
    <li className="relative grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
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
        <StepVisual index={index} tone={tone} />
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
              <StepVisual index={0} tone={toneOf('blue')} />
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

          <ol className="mt-16 grid gap-16 lg:gap-24">
            {PH.steps.items.map((item, index) => (
              <Step key={item.title} item={item} index={index} />
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
