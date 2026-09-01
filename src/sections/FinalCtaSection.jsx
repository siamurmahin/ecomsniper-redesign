import CtaButton from '../components/ui/CtaButton';
import Icon from '../components/ui/Icon';
import { FINAL_CTA } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useParallax } from '../hooks/useParallax';

/**
 * 15 — Final CTA, plus the second door.
 *
 * The single most important change on the page. The old ending offered exactly
 * one way out — pay today — which loses the roughly 95% of visitors who are not
 * ready yet, permanently. The paid CTA stays primary and unmissable; underneath
 * it, two free doors keep everyone else reachable.
 */
export default function FinalCtaSection() {
  const sectionRef = useRevealOnScroll();
  const auraRef = useParallax(0.1, { axis: 'y' });

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      aria-labelledby="final-cta-headline"
      className="relative isolate overflow-hidden bg-ink py-24 text-paper sm:py-32"
    >
      {/* Slow accent aura drifting behind the headline. */}
      <div
        ref={auraRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50rem_30rem_at_50%_35%,rgba(91,157,240,0.18),transparent_65%)]"
      />

      <div className="site-shell text-center">
        <h2
          id="final-cta-headline"
          className="mx-auto max-w-4xl text-[length:var(--text-display)] leading-[0.98]"
        >
          {FINAL_CTA.headlineParts.map((line) => (
            <span key={line} className="block" data-reveal data-reveal-group="final-headline">
              {line}
            </span>
          ))}
        </h2>

        {/* The headline states the escape and the ambition. This states what
            the thing actually is — the sentence a reader repeats to someone
            else — and it was missing from the ending entirely. */}
        <p
          data-reveal
          data-reveal-group="final-lead"
          className="mx-auto mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted-dark"
        >
          {FINAL_CTA.lead}
        </p>

        <p
          data-reveal
          data-reveal-group="final-blessing"
          className="mt-6 flex items-baseline justify-center gap-3"
        >
          <span className="font-serif text-2xl italic">{FINAL_CTA.blessing.arabic}</span>
          <span className="font-label text-[0.68rem] uppercase tracking-[0.22em] text-muted-dark">
            {FINAL_CTA.blessing.translation}
          </span>
        </p>

        <div data-reveal data-reveal-group="final-cta" className="mt-10">
          <CtaButton href={FINAL_CTA.primaryCta.href} variant="onInk" intent="final-primary">
            {FINAL_CTA.primaryCta.label}
          </CtaButton>

          {/* The shield, the same mark section 14 puts on the same sentence. A
              refund promise set as grey small print reads as a disclaimer. */}
          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-signal-green-soft">
            <Icon name="shield" className="size-3.5 shrink-0" aria-hidden="true" />
            {FINAL_CTA.reassurance}
          </p>
        </div>

        {/* The second door */}
        <div
          data-reveal
          data-reveal-group="final-second-door"
          className="mx-auto mt-16 max-w-2xl rounded-3xl border border-ink-line p-7 sm:p-9"
        >
          <h3 className="text-xl font-extrabold tracking-tight sm:text-2xl">
            {FINAL_CTA.secondDoor.title}
          </h3>

          <p className="mx-auto mt-3 max-w-lg text-[0.92rem] leading-relaxed text-muted-dark">
            {FINAL_CTA.secondDoor.body}
          </p>

          {/* Marks on both, because these are two different places rather than
              two phrasings of one button: one is a file to read, the other is
              a room full of people. */}
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {FINAL_CTA.secondDoor.ctas.map((cta) => (
              <CtaButton
                key={cta.label}
                href={cta.href}
                variant={cta.variant === 'primary' ? 'onInk' : 'ghost'}
                intent={`final-${cta.variant}-door`}
              >
                <Icon name={cta.icon} className="size-4 shrink-0" aria-hidden="true" />
                {cta.label}
              </CtaButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
