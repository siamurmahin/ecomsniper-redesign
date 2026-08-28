import { useLayoutEffect, useRef } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import { MODEL } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { gsap, prefersReducedMotion, MOTION } from '../lib/motion';

/**
 * 05 — How it works, in plain English.
 *
 * Moved up the page. The review's point was blunt: this explainer sat near the
 * bottom inside the course section, so a cold visitor met the feature tour
 * before ever learning what the business model is. Nothing above this section
 * means anything without it.
 *
 * The four steps draw a connecting line as they scroll into view, which is the
 * one place on the page where scroll-scrubbed motion carries real meaning
 * rather than decoration.
 */
export default function ModelSection() {
  // Handles the shared [data-reveal] elements, including the section heading.
  const sectionRef = useRevealOnScroll();
  // Scoped separately so the step choreography below can own its own context.
  const stepsRef = useRef(null);

  useLayoutEffect(() => {
    const scope = stepsRef.current;
    if (!scope) return undefined;

    if (prefersReducedMotion()) {
      gsap.set(scope.querySelectorAll('[data-model-step]'), { opacity: 1, y: 0 });
      gsap.set(scope.querySelector('[data-model-progress]'), { scaleY: 1 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      // The vertical rule fills as the visitor moves through the steps.
      gsap.fromTo(
        '[data-model-progress]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: scope,
            start: 'top 70%',
            end: 'bottom 75%',
            scrub: 0.6,
          },
        },
      );

      gsap.from('[data-model-step]', {
        opacity: 0,
        y: 26,
        duration: MOTION.duration,
        ease: MOTION.ease,
        stagger: 0.12,
        scrollTrigger: { trigger: scope, start: 'top 78%', once: true },
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="the-model"
      aria-labelledby="model-headline"
      className="section-band bg-ink text-paper"
    >
      <div className="site-shell">
        <SectionHeading
          tone="ink"
          eyebrow={MODEL.eyebrow}
          headline={<span id="model-headline">{MODEL.headline}</span>}
          className="[&_.section-eyebrow]:text-muted-dark [&_.section-eyebrow]:before:bg-paper/30"
        />

        <ol ref={stepsRef} data-model-steps className="relative mt-14 max-w-3xl">
          {/* Track + fill for the scroll-linked progress rule. */}
          <span
            aria-hidden="true"
            className="absolute left-[1.35rem] top-2 hidden h-[calc(100%-2rem)] w-px bg-ink-line sm:block"
          />
          <span
            data-model-progress
            aria-hidden="true"
            className="absolute left-[1.35rem] top-2 hidden h-[calc(100%-2rem)] w-px origin-top bg-paper sm:block"
          />

          {MODEL.steps.map((step) => (
            <li
              key={step.n}
              data-model-step
              className="relative flex gap-5 pb-9 last:pb-0 sm:gap-7"
            >
              <span
                aria-hidden="true"
                className="z-10 grid size-11 shrink-0 place-items-center rounded-full border border-ink-line bg-ink font-label text-xs font-semibold text-paper/55"
              >
                {step.n}
              </span>
              <p className="pt-2.5 text-[length:var(--text-lead)] leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>

        <p className="mt-12 max-w-2xl font-display text-xl font-bold leading-snug text-paper sm:text-2xl">
          {MODEL.closer}
        </p>
      </div>
    </section>
  );
}
