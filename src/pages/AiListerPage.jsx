import { AI_LISTER as EN_AI_LISTER } from '../content/en/aiLister';
import { overlay as germanAiLister } from '../content/de/aiLister';
import { usePageContent } from '../hooks/usePageContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { toneOf } from '../lib/signalTones';
import {
  PickPanel,
  ImagePanel,
  TitlePanel,
  OptiListPanel,
  LinksPanel,
  BulkPanel,
} from '../components/hunt/ListerPanels';
import CtaButton from '../components/ui/CtaButton';
import HeroDots from '../components/hero/HeroDots';
import FaqSection from '../sections/FaqSection';
import AssuranceSection from '../sections/AssuranceSection';

/**
 * AI Lister — the second feature page.
 *
 * Their `V6` copy, which is the fuller of the two live spellings and the
 * tighter draft; `/aiListerV6` redirects onto the readable slug. Decided
 * 4 Sep, in `docs/TODO.md`.
 *
 * Two groups of steps rather than one, because their page has two and they are
 * different claims: four moves to list a single item, then the bulk lister
 * doing hundreds. The second only means anything after the first, so it
 * follows rather than sitting beside it.
 *
 * The hero shows the end of the story — the AI title, which is the one moment
 * a reader can see the software think. The panels follow the rule set on
 * Product Hunter: only what the software produces animates, so picking a
 * product and pasting links are drawn finished, while finding images, writing
 * the title and posting the listings play out.
 *
 * The questions, then the guarantee, in the order Contact and /faq use.
 */

/* Module scope so the hook memo has a stable dependency. */
const OVERLAYS = { de: germanAiLister.AI_LISTER };

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

/** One step: marker, words, and its own panel, alternating sides. */
function Step({ item, index, children }) {
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
        {children}
      </div>
    </li>
  );
}

/** A band of steps: eyebrow, headline, lead, then the steps themselves. */
function StepBand({ id, copy, deferHeight, sunken, children }) {
  const ref = useRevealOnScroll();

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-headline`}
      className={`section-band defer-render ${sunken ? 'bg-paper-sunk' : ''} ${deferHeight}`}
    >
      <div className="site-shell">
        <p className="section-eyebrow" data-reveal data-reveal-group={`${id}-head`}>
          {copy.eyebrow}
        </p>

        <h2
          id={`${id}-headline`}
          className="mt-4 max-w-[18ch] text-[length:var(--text-section)] leading-[1.05]"
          data-reveal
          data-reveal-group={`${id}-head`}
        >
          <Marked parts={copy.headlineParts} />
        </h2>

        <p
          className="mt-5 max-w-xl font-serif text-xl leading-relaxed italic text-muted"
          data-reveal
          data-reveal-group={`${id}-head`}
        >
          {copy.lead}
        </p>

        <ol className="mt-16 grid gap-20 lg:gap-28">{children}</ol>
      </div>
    </section>
  );
}

export default function AiListerPage() {
  const AL = usePageContent(EN_AI_LISTER, OVERLAYS);
  const heroRef = useRevealOnScroll();
  const { panel } = AL;

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
              <p className="section-eyebrow" data-reveal data-reveal-group="al-hero">
                {AL.eyebrow}
              </p>

              <h1
                className="mt-5 max-w-[15ch] text-[length:var(--text-hero)] leading-[0.95]"
                data-reveal
                data-reveal-group="al-hero"
              >
                <Marked parts={AL.headlineParts} />
              </h1>

              <p
                className="mt-6 max-w-xl font-serif text-2xl leading-relaxed italic text-muted"
                data-reveal
                data-reveal-group="al-hero"
              >
                {AL.lead}
              </p>

              {/* The door their page does not have above the fold. */}
              <div
                className="mt-9 flex flex-wrap items-center gap-4"
                data-reveal
                data-reveal-group="al-hero"
              >
                <CtaButton href={AL.ctas.primary.href}>{AL.ctas.primary.label}</CtaButton>
                <CtaButton href={AL.ctas.secondary.href} variant="secondary">
                  {AL.ctas.secondary.label}
                </CtaButton>
              </div>
            </div>

            {/* The title being rewritten: the one moment on this page where a
                reader can watch the software think, so it leads. */}
            <div data-reveal data-reveal-group="al-hero">
              <TitlePanel copy={panel.title} tone="green" />
            </div>
          </div>
        </div>
      </section>

      <StepBand
        id="the-moves"
        copy={AL.moves}
        sunken
        deferHeight="[--defer-h:3200px] lg:[--defer-h:2100px]"
      >
        {AL.moves.items.map((item, index) => (
          <Step key={item.title} item={item} index={index}>
            {index === 0 ? <PickPanel copy={panel.pick} tone={item.tone} /> : null}
            {index === 1 ? <ImagePanel copy={panel.image} tone={item.tone} /> : null}
            {index === 2 ? <TitlePanel copy={panel.title} tone={item.tone} /> : null}
            {index === 3 ? <OptiListPanel copy={panel.list} tone={item.tone} /> : null}
          </Step>
        ))}
      </StepBand>

      <StepBand id="the-bulk" copy={AL.bulk} deferHeight="[--defer-h:1700px] lg:[--defer-h:1200px]">
        {AL.bulk.items.map((item, index) => (
          <Step key={item.title} item={item} index={index}>
            {index === 0 ? (
              <LinksPanel copy={panel.bulk} links={panel.links} tone={item.tone} />
            ) : (
              <BulkPanel copy={panel.bulk} tone={item.tone} />
            )}
          </Step>
        ))}
      </StepBand>

      <FaqSection />
      <AssuranceSection />
    </>
  );
}
