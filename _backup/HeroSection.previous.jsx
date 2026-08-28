import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import CtaButton from '../components/ui/CtaButton';
import { HERO } from '../data/siteContent';
import { gsap, prefersReducedMotion, MOTION } from '../lib/motion';

// The 3D layer is decoration: never let it block the headline's first paint.
const ReticleScene = lazy(() => import('../components/three/ReticleScene'));
// Same rule for the dot field: its canvas is not worth a slower headline.
const DotGrid = lazy(() => import('../components/reactbits/DotGrid'));

/**
 * 01 — Hero.
 *
 * Funnel job: say what this is, who it is for, and what it costs, above the
 * fold. The review found the old hero led with an unverifiable income claim and
 * hid the price entirely, so the eyebrow now carries checkable proof and the
 * reassurance row carries the entry price and the guarantee.
 */
export default function HeroSection() {
  const heroRef = useRef(null);
  const [is3dReady, setIs3dReady] = useState(false);
  // Read once at mount rather than during render, so the server-less first
  // paint and the client agree on what the hero contains.
  const [staticHero, setStaticHero] = useState(true);

  useEffect(() => {
    setStaticHero(prefersReducedMotion());
  }, []);

  // Mount the canvas only after the browser is idle and motion is welcome.
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const schedule = window.requestIdleCallback ?? ((fn) => window.setTimeout(fn, 400));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = schedule(() => setIs3dReady(true));

    return () => cancel(handle);
  }, []);

  // Entrance choreography: the headline lines lift in, then everything below.
  useLayoutEffect(() => {
    const scope = heroRef.current;
    if (!scope || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: MOTION.ease } });

      timeline
        .from('[data-hero-eyebrow]', { opacity: 0, y: 12, duration: 0.7 })
        .from(
          '[data-hero-line]',
          { opacity: 0, yPercent: 108, duration: 1.15, stagger: 0.09 },
          '-=0.45',
        )
        .from('[data-hero-blessing]', { opacity: 0, y: 14, duration: 0.8 }, '-=0.7')
        .from('[data-hero-sub]', { opacity: 0, y: 16, duration: 0.8 }, '-=0.6')
        .from('[data-hero-cta]', { opacity: 0, y: 18, duration: 0.8, stagger: 0.09 }, '-=0.55')
        .from('[data-hero-reassure]', { opacity: 0, y: 12, duration: 0.7, stagger: 0.07 }, '-=0.5')
        .from('[data-hero-canvas]', { opacity: 0, scale: 0.94, duration: 1.6 }, '-=1.3');
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      aria-labelledby="hero-headline"
      className="relative isolate overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-44"
    >
      {/* Radial wash behind the reticle, keeps the paper from going flat. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(60rem_40rem_at_72%_38%,var(--color-accent-wash),transparent_65%)]"
      />

      {/*
       * React Bits' DotGrid, sitting between the wash and the copy. The dots
       * scatter away from the pointer and settle back, so the hero has
       * something alive in it before the 3D reticle has finished loading.
       * Skipped entirely under reduced motion — it is decoration, and it
       * tracks the cursor, which is exactly what that setting asks us not to
       * do. A soft mask keeps it from running into the headline.
       */}
      {!staticHero && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-95 [mask-image:radial-gradient(70rem_45rem_at_70%_45%,black,transparent_72%)]"
        >
          <Suspense fallback={null}>
          <DotGrid
            dotSize={4}
            gap={26}
            baseColor="#b7c4d6"
            activeColor="#0064d2"
            proximity={130}
            shockRadius={220}
            shockStrength={4}
            returnDuration={1.4}
          />
          </Suspense>
        </div>
      )}

      <div className="site-shell">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* ---------------------------------------------------------------- */}
          {/* Copy column                                                       */}
          {/* ---------------------------------------------------------------- */}
          <div className="relative z-10 max-w-3xl">
            <p
              data-hero-eyebrow
              className="section-eyebrow flex flex-wrap items-center gap-x-2 gap-y-1"
            >
              {HERO.eyebrow}
            </p>

            <h1
              id="hero-headline"
              className="mt-6 text-[length:var(--text-hero)] font-extrabold leading-[0.94] tracking-[-0.03em]"
            >
              {/* Each line is masked so it can slide up from behind its own edge. */}
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-hero-line className="block">
                  ESCAPE THE <span className="headline-strike">9 TO 5</span>.
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-hero-line className="block">
                  BUILD PASSIVE INCOME
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.12em]">
                <span data-hero-line className="block">
                  THAT RUNS <span className="headline-mark">WHILE YOU SLEEP</span>.
                </span>
              </span>
            </h1>

            <p data-hero-blessing className="mt-6 flex items-baseline gap-3">
              <span className="font-serif text-2xl italic text-ink">{HERO.blessing.arabic}</span>
              <span className="font-label text-[0.68rem] uppercase tracking-[0.22em] text-muted">
                {HERO.blessing.translation}
              </span>
            </p>

            <p
              data-hero-sub
              className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted"
            >
              {HERO.subhead}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <span data-hero-cta>
                <CtaButton href={HERO.primaryCta.href} intent="hero-primary">
                  {HERO.primaryCta.label}
                </CtaButton>
              </span>
              <span data-hero-cta>
                {/* The second door: for the majority who will not buy today. */}
                <CtaButton
                  href={HERO.secondaryCta.href}
                  variant="secondary"
                  intent="hero-playbook"
                >
                  {HERO.secondaryCta.label}
                </CtaButton>
              </span>
            </div>

            <ul className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {HERO.reassurance.map((item) => (
                <li
                  key={item}
                  data-hero-reassure
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-4 shrink-0 place-items-center rounded-full bg-ebay-green/15 text-[0.6rem] text-ebay-green"
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* 3D column                                                         */}
          {/* ---------------------------------------------------------------- */}
          <div
            data-hero-canvas
            aria-hidden="true"
            className="relative h-[22rem] sm:h-[26rem] lg:h-[34rem]"
          >
            {is3dReady && (
              <Suspense fallback={null}>
                <ReticleScene />
              </Suspense>
            )}

            {/* Static fallback ring, visible until (or instead of) the canvas. */}
            {!is3dReady && (
              <div className="absolute inset-0 grid place-items-center">
                <span className="relative grid size-40 place-items-center rounded-full border border-accent/30">
                  <span className="absolute size-40 rounded-full border border-accent/20 animate-pulse-ring" />
                  <span className="size-3 rounded-full bg-accent" />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
