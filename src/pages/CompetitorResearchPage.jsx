import { COMPETITOR_RESEARCH as EN_COMPETITOR_RESEARCH } from '../content/en/competitorResearch';
import { overlay as germanCompetitorResearch } from '../content/de/competitorResearch';
import { usePageContent } from '../hooks/usePageContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { toneOf } from '../lib/signalTones';
import {
  PriceLadder,
  DossierPanel,
  StoreScanPanel,
  UndercutPanel,
  ListedPanel,
} from '../components/snipe/SnipePanels';
import CtaButton from '../components/ui/CtaButton';
import HeroSurface from '../components/hero/HeroSurface';
import MarkedHeadline from '../components/ui/MarkedHeadline';
import FaqSection from '../sections/FaqSection';
import AssuranceSection from '../sections/AssuranceSection';

/**
 * Competitor Research — the third of the four feature pages.
 *
 * Their copy exists twice, and unlike Product Hunter and the AI Lister the two
 * versions are not a draft and a rewrite: `V6` has the better headline and
 * loses the procedure, the readable slug has four concrete steps and a weaker
 * hero. The page takes the hero from one and the steps from the other — the
 * reasoning is in `content/en/competitorResearch.js`, beside the words.
 *
 * The slug follows the decision of 4 Sep: the readable one is canonical and
 * `/competitorResearchV6` 301s onto it, in `netlify.toml` and `_redirects`.
 *
 * **On the pictures.** Five drawn panels, built on `HuntPanels` so that the
 * two feature pages showing the same software look like the same software.
 * Replace with real captures when the client sends them; each takes an image
 * in the same slot.
 *
 * **The hero gets a door**, which neither of their versions has above the
 * fold, and the guarantee closes the page as it does on Product Hunter,
 * Contact and `/faq`.
 */

/* Module scope so the hook memo has a stable dependency. */
const OVERLAYS = { de: germanCompetitorResearch.COMPETITOR_RESEARCH };

/**
 * The panel that belongs to each step. One each, and no two alike.
 *
 * The ladder is the hero's, and it stays there: it answers "why undercut at
 * all", which is the page's argument rather than one of its steps. Step three
 * gets the arithmetic instead — the same idea at the moment a reader wants to
 * check it rather than be persuaded by it.
 */
function StepPanel({ index, panel }) {
  if (index === 0) return <DossierPanel copy={panel.dossier} />;
  if (index === 1) return <StoreScanPanel copy={panel.scan} />;
  if (index === 2) return <UndercutPanel copy={panel.price} />;

  return <ListedPanel copy={panel.listed} />;
}

/** One step: marker, words, and its own panel, alternating sides. */
function Step({ item, index, panel }) {
  const tone = toneOf(item.tone);
  const flip = index % 2 === 1;

  return (
    <li className="relative grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
      <div className={flip ? 'lg:order-2' : undefined}>
        <span
          data-reveal
          data-reveal-group={`snipe-${index}`}
          className={`inline-grid size-12 place-items-center rounded-full border border-dashed font-display text-base font-extrabold ${tone.ring} ${tone.text}`}
        >
          {item.n}
        </span>

        <h3
          data-reveal
          data-reveal-group={`snipe-${index}`}
          className="mt-5 text-[length:var(--text-section)] leading-tight"
        >
          {item.title}
        </h3>

        <p
          data-reveal
          data-reveal-group={`snipe-${index}`}
          className="mt-4 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted"
        >
          {item.body}
        </p>
      </div>

      <div
        data-reveal
        data-reveal-group={`snipe-${index}`}
        className={flip ? 'lg:order-1' : undefined}
      >
        <StepPanel index={index} panel={panel} />
      </div>
    </li>
  );
}

export default function CompetitorResearchPage() {
  const CR = usePageContent(EN_COMPETITOR_RESEARCH, OVERLAYS);
  const stepsRef = useRevealOnScroll();

  return (
    <>
      <HeroSurface>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <p className="section-eyebrow" data-reveal data-reveal-group="cr-hero">
              {CR.eyebrow}
            </p>

            <h1
              className="mt-5 max-w-[14ch] text-[length:var(--text-hero)] leading-[0.95]"
              data-reveal
              data-reveal-group="cr-hero"
            >
              <MarkedHeadline parts={CR.headlineParts} />
            </h1>

            <p
              className="mt-6 max-w-xl font-serif text-2xl leading-relaxed italic text-muted"
              data-reveal
              data-reveal-group="cr-hero"
            >
              {CR.lead}
            </p>

            {/* The door their page does not have above the fold. */}
            <div
              className="mt-9 flex flex-wrap items-center gap-4"
              data-reveal
              data-reveal-group="cr-hero"
            >
              <CtaButton href={CR.ctas.primary.href}>{CR.ctas.primary.label}</CtaButton>
              <CtaButton href={CR.ctas.secondary.href} variant="secondary">
                {CR.ctas.secondary.label}
              </CtaButton>
            </div>
          </div>

          {/* The snipe itself, shown rather than described: the cheapest
              listing wins the sale, so yours becomes the cheapest listing. */}
          <div data-reveal data-reveal-group="cr-hero">
            <PriceLadder copy={CR.panel.ladder} />
          </div>
        </div>
      </HeroSurface>

      {/* The placeholder heights are measured, not estimated: 2246px laid out
          in two columns and 3867px stacked, so a reader scrolling into this
          band does not have the ground moved under them when it renders. The
          stacked figure was read by forcing the grid to one column at 360px
          rather than by halving the desktop number, which four steps and five
          panels would have got wrong in the direction that hurts. */}
      <section
        ref={stepsRef}
        id="the-snipe"
        aria-labelledby="snipe-headline"
        className="section-band defer-render bg-paper-sunk [--defer-h:3900px] lg:[--defer-h:2250px]"
      >
        <div className="site-shell">
          <p className="section-eyebrow" data-reveal data-reveal-group="snipe-head">
            {CR.steps.eyebrow}
          </p>

          <h2
            id="snipe-headline"
            className="mt-4 max-w-[18ch] text-[length:var(--text-section)] leading-[1.05]"
            data-reveal
            data-reveal-group="snipe-head"
          >
            <MarkedHeadline parts={CR.steps.headlineParts} />
          </h2>

          <p
            className="mt-5 max-w-xl font-serif text-xl leading-relaxed italic text-muted"
            data-reveal
            data-reveal-group="snipe-head"
          >
            {CR.steps.lead}
          </p>

          <ol className="mt-16 grid gap-20 lg:gap-28">
            {CR.steps.items.map((item, index) => (
              <Step key={item.title} item={item} index={index} panel={CR.panel} />
            ))}
          </ol>
        </div>
      </section>

      {/* The questions, then the guarantee — the order Product Hunter,
          Contact and /faq all use. The same sections the homepage renders,
          never a second set of answers, and no FAQPage schema here: that
          lives on the /faq route. */}
      <FaqSection />

      <AssuranceSection />
    </>
  );
}
