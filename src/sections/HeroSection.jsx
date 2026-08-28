import { useLayoutEffect, useRef, useState } from 'react';
import CtaButton from '../components/ui/CtaButton';
import Icon from '../components/ui/Icon';
import HeroAurora from '../components/hero/HeroAurora';
import HeroDots from '../components/hero/HeroDots';
import PipelinePanel from '../components/hero/PipelinePanel';
import TextType from '../components/reactbits/TextType';
import { HERO } from '../data/siteContent';
import { gsap, prefersReducedMotion, MOTION, SplitText } from '../lib/motion';
import { toneOf } from '../lib/signalTones';

/** The two objections, and the colour each answer carries. */
const SUPPORT_META = [
  { icon: 'graduationCap', tone: 'blue' },
  { icon: 'people', tone: 'gold' },
];

/**
 * 01 — Hero. What this is, who it is for and what it costs, above the fold,
 * with two doors out: buy today, or take the free playbook.
 *
 * The right half is `PipelinePanel` — the headline's argument shown rather
 * than claimed, and the slot a real product screenshot can take over later.
 *
 * The brand ramp appears twice here, on the marked phrase and the primary
 * button. It was on four things at once, which left it nothing to emphasise.
 */
export default function HeroSection() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);

  // Read on the first render: anything this flag adds later would mount
  // after the entrance timeline resolved its targets, and stay where it left
  // them.
  const [isStatic] = useState(() => prefersReducedMotion());

  useLayoutEffect(() => {
    const scope = heroRef.current;
    if (!scope || isStatic) return undefined;

    const ctx = gsap.context(() => {
      /* SplitText rather than hand-written line spans: the copy wraps
         differently at every width, so the split has to be measured from the
         rendered text. `mask` gives each line a hard edge to rise from behind;
         `autoSplit` re-splits on a late font swap or a resize, which stops a
         slow reload stranding half a headline mid-animation. */
      const split = SplitText.create(headlineRef.current, {
        type: 'lines,words',
        mask: 'lines',
        autoSplit: true,
        linesClass: 'overflow-hidden',
        onSplit: (self) =>
          gsap.from(self.words, {
            yPercent: 118,
            opacity: 0,
            duration: 1,
            ease: MOTION.ease,
            // Per word, not per line: the eye reads left to right and the
            // stagger should too. Small enough that it never feels typed out.
            stagger: 0.028,
          }),
      });

      const timeline = gsap.timeline({ defaults: { ease: MOTION.ease } });

      timeline
        .from('[data-hero-eyebrow]', { opacity: 0, y: 12, duration: 0.7 })
        .from('[data-hero-mark]', { opacity: 0, y: 22, duration: 0.9 }, 0.34)
        .from('[data-hero-blessing]', { opacity: 0, y: 14, duration: 0.8 }, 0.5)
        .from('[data-hero-sub]', { opacity: 0, y: 16, duration: 0.8 }, 0.62)
        .from('[data-hero-cta]', { opacity: 0, y: 18, duration: 0.8, stagger: 0.09 }, 0.72)
        .from('[data-hero-reassure]', { opacity: 0, y: 12, duration: 0.7, stagger: 0.07 }, 0.86)
        // The panel enters alongside the copy: it is the other half of the
        // fold, not a footnote to the headline.
        .from('[data-hero-panel]', { opacity: 0, x: 28, duration: 1.1 }, 0.28)
        .from('[data-hero-support]', { opacity: 0, y: 14, duration: 0.7, stagger: 0.1 }, 0.95);

      return () => split.revert();
    }, scope);

    return () => ctx.revert();
  }, [isStatic]);

  return (
    <section
      ref={heroRef}
      aria-labelledby="hero-headline"
      className="relative isolate overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40"
    >
      {/* Looping shader field, masked away from the copy column. */}
      <HeroAurora />

      {/* Dot texture under it, cut out of the copy column. */}
      <HeroDots />

      {/* Static floor under the aurora — red behind the copy, blue behind
          the panel. Carries the hero alone when the canvas never mounts. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(48rem_36rem_at_12%_14%,rgb(208_33_42/0.06),transparent_68%),radial-gradient(52rem_40rem_at_88%_28%,rgb(0_100_210/0.09),transparent_70%)]"
      />

      <div className="site-shell">
        {/* Top-aligned, not centred: the copy column is the taller of the two,
            and centring the panel against it left a hole above the window. */}
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Copy */}
          <div className="text-center lg:text-left">
            {/* Ink, not the ramp: the first checkable proof on the page
                has to read as a fact, not as a second button. */}
            <p
              data-hero-eyebrow
              className="inline-flex flex-wrap items-center justify-center gap-x-2.5 rounded-full bg-ink px-4 py-2 font-label text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-paper shadow-lift"
            >
              <span aria-hidden="true" className="relative grid size-2 place-items-center">
                <span className="absolute size-2 rounded-full bg-signal-green-soft/70 motion-safe:animate-ping" />
                <span className="size-2 rounded-full bg-signal-green-soft" />
              </span>
              {HERO.eyebrow}
            </p>

            <h1
              id="hero-headline"
              className="mt-7 text-[length:var(--text-hero-split)] font-extrabold leading-[0.98] tracking-[-0.03em]"
            >
              {/* Only the fixed copy is split — the ref is on this span,
                  and the typed mark below is a sibling. SplitText rebuilds an
                  element's contents and clones nodes, so a React component
                  inside it keeps updating a node that is no longer on screen
                  (its `ignore` option does not help; the element is still
                  moved). The stop after "9 TO 5" shares the strike's nowrap
                  span because SplitText treats it as its own word. */}
              <span ref={headlineRef} className="block">
                ESCAPE THE{' '}
                <span className="whitespace-nowrap">
                  <span className="headline-strike">9 TO 5</span>.
                </span>{' '}
                BUILD PASSIVE INCOME THAT RUNS
              </span>

              {/* nowrap: the block's width changes with every keystroke,
                  and the line was breaking mid-word as it grew. */}
              <span data-hero-mark className="mt-1 inline-flex items-end whitespace-nowrap">
                <span className="headline-mark-brand">
                  {/* The h1's accessible name: the typed copy is mid-word
                      most of the time. */}
                  <span className="sr-only">{`${HERO.markPrefix} ${HERO.markWords[0]}.`}</span>

                  <span aria-hidden="true">
                    {HERO.markPrefix}{' '}
                    {isStatic ? (
                      HERO.markWords[0]
                    ) : (
                      <TextType
                        as="span"
                        text={HERO.markWords}
                        className="headline-type"
                        typingSpeed={70}
                        deletingSpeed={34}
                        pauseDuration={2200}
                        initialDelay={900}
                        // Its own cursor is a glyph wide enough to read as
                        // a gap before the full stop; `.headline-type::after`
                        // draws a thin one instead.
                        showCursor={false}
                        loop
                      />
                    )}
                  </span>
                </span>
                .
              </span>
            </h1>

            <p
              data-hero-blessing
              className="mt-6 flex items-baseline justify-center gap-3 lg:justify-start"
            >
              <span className="font-serif text-2xl italic text-ink">{HERO.blessing.arabic}</span>
              <span className="font-label text-[0.68rem] uppercase tracking-[0.22em] text-muted">
                {HERO.blessing.translation}
              </span>
            </p>

            <p
              data-hero-sub
              className="mx-auto mt-6 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-muted lg:mx-0"
            >
              {HERO.subhead}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <span data-hero-cta>
                <CtaButton href={HERO.primaryCta.href} intent="hero-primary">
                  {HERO.primaryCta.label}
                </CtaButton>
              </span>
              <span data-hero-cta className="relative">
                {/* The second door: for the majority who will not buy today. */}
                <CtaButton href={HERO.secondaryCta.href} variant="brandOutline" intent="hero-playbook">
                  {HERO.secondaryCta.label}
                </CtaButton>

                {/*
                  A drawn arrow pointing back at the button — the second door
                  is the one most visitors should take, and nothing else in the
                  hero says so. Decoration, so it is hidden from assistive tech
                  and from the layout below lg, where the CTAs stack full width
                  and there is no margin for it.
                */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-full top-1/2 hidden -translate-y-1/2 items-center pl-2 lg:flex"
                >
                  <svg
                    viewBox="0 0 48 28"
                    fill="none"
                    className="h-11 w-[4.5rem] shrink-0 text-signal-blue motion-safe:animate-nudge-x"
                  >
                    {/* Drawn in one stroke, tail to head, so it reads as a
                        pen mark rather than a UI glyph. */}
                    <path
                      d="M45 6c-9.5-2.6-19.4-1.2-27.4 3.4C13.4 11.9 9.6 15.4 7 19.6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M5.6 21.8l1.1-7.4M5.6 21.8l7.3 1.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                </span>
              </span>
            </div>

            {/* Price, guarantee and what you do not need. Two weights, not
                three equal sentences: at one weight this is the shape of small
                print, which is the wrong voice for a price and a guarantee. */}
            <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-3">
              {HERO.assurances.map((item) => {
                const tone = toneOf(item.tone);

                return (
                  <li
                    key={item.lead}
                    data-hero-reassure
                    className="group flex items-start gap-3 bg-white/75 px-4 py-3.5 text-left backdrop-blur-sm transition-colors duration-500 hover:bg-white"
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 ${tone.tile}`}
                    >
                      <Icon name={item.icon} className="size-3.5" />
                    </span>

                    <span className="min-w-0">
                      <span className="block font-display text-[0.95rem] font-extrabold leading-tight tracking-tight">
                        {item.lead}
                      </span>
                      <span className="mt-0.5 block text-[0.78rem] leading-snug text-muted">
                        {item.detail}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* The panel, and the two objections under it */}
          <div className="lg:pl-4">
            <div data-hero-panel>
              <PipelinePanel />
            </div>

            {/* These answer the two objections the panel provokes — "I
                could not drive that" and "I would be on my own" — so they sit
                under the window, at its width, rather than under the copy. */}
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {HERO.support.map((item, index) => {
                const meta = SUPPORT_META[index];
                const tone = toneOf(meta.tone);

                return (
                  <li
                    key={item.title}
                    data-hero-support
                    className="group relative overflow-hidden rounded-2xl border border-hairline bg-white/70 p-4 text-left backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-lift"
                  >
                    {/* The same corner wash the pillar cards use, so the hero
                        and the section it introduces are visibly one system. */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute -right-10 -top-10 size-24 rounded-full bg-gradient-to-br to-transparent blur-2xl ${tone.wash}`}
                    />

                    <span className="relative flex items-center gap-3">
                      <span
                        className={`grid size-9 shrink-0 place-items-center rounded-lg transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 ${tone.tile}`}
                      >
                        <Icon name={meta.icon} className="size-[1.05rem]" />
                      </span>

                      <span>
                        <span className="block text-sm font-extrabold tracking-tight">
                          {item.title}
                        </span>
                        <span className="block text-[0.8rem] text-muted">{item.body}</span>
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
