import { useEffect, useMemo, useRef, useState } from 'react';
import CtaButton from '../components/ui/CtaButton';
import Icon from '../components/ui/Icon';
import HeroDots from '../components/hero/HeroDots';
import PipelinePanel from '../components/hero/PipelinePanel';
import TextType from '../components/reactbits/TextType';
import { useContent } from '../hooks/useContent';
import { announceHeroReady } from '../lib/heroReady';
// The hero's entrance is CSS; its easing comes from the stylesheet.
import { prefersReducedMotion } from '../lib/motion';
import { toneOf } from '../lib/signalTones';

/** The two objections, and the colour each answer carries. */
const SUPPORT_META = [
  { icon: 'graduationCap', tone: 'blue' },
  { icon: 'people', tone: 'gold' },
];

/**
 * 01 — Hero. What this is, who it is for and what it costs, above the fold,
 * with two ways out: buy today, or take the free playbook.
 *
 * The brand ramp appears twice, on the marked phrase and the main button. It
 * was on four things at once, which left it nothing to emphasise.
 */
/* Mirrors of the hero entrance timings in `index.css`. Only used to work out
   when the entrance is over, so the rest of the page knows it may mount.
   If the stylesheet's numbers change, change these too. */
const WORD_DELAY_MS = 60;
const STAGGER_MS = 40;
const WORD_DURATION_MS = 550;
/** Support cards: 500ms base + two steps + 450ms. The other chains are shorter. */
const SUPPORT_END_MS = 500 + 2 * STAGGER_MS + 450;

/**
 * The fixed half of the headline, one word at a time.
 *
 * This was GSAP's SplitText, splitting the rendered text into lines and words
 * and masking each line. Splitting by line means measuring where the lines
 * fall, and that measurement ran inside the commit that mounts the hero:
 * traced at 4x CPU, 158ms of forced layout in the page's first and longest
 * task, plus the plugin in the bundle the first screen waits for.
 *
 * Words are known without measuring anything — they are in the deck. Each one
 * carries its own edge to rise from behind instead of sharing its line's, and
 * at this line height the two are the same edge. The stagger index and the
 * animation are the stylesheet's, exactly as before.
 *
 * The struck phrase rises as one word: its rule is drawn across the whole
 * phrase, so splitting it would leave the rule crossing three words that are
 * still arriving.
 *
 * @param {Array<{text: string, tone?: string, breakBefore?: boolean}>} parts
 * @returns {{nodes: Array, count: number}} the markup, and how many words it has
 */
function splitIntoWords(parts) {
  const nodes = [];
  let index = 0;

  const word = (key, text, innerClass = '') => {
    nodes.push(
      <span key={key} className={`hero-word${innerClass ? ' whitespace-nowrap' : ''}`}>
        <span data-hero-word style={{ '--hero-stagger': index }} className={innerClass}>
          {text}
        </span>
      </span>,
    );
    index += 1;
  };

  parts.forEach((part, partIndex) => {
    // The deck's own line break. Without it the full stop leads the next line.
    if (part.breakBefore) nodes.push(<br key={`break-${partIndex}`} />);

    if (part.tone === 'strike') {
      word(`part-${partIndex}`, part.text, 'headline-strike');
      return;
    }

    // Split on whitespace but keep it: the spacing between words is the copy's.
    part.text.split(/(\s+)/).forEach((token, tokenIndex) => {
      if (!token) return;
      if (/^\s+$/.test(token)) {
        nodes.push(' ');
        return;
      }
      word(`part-${partIndex}-${tokenIndex}`, token);
    });
  });

  return { nodes, count: index };
}

export default function HeroSection() {
  const { HERO } = useContent();
  const heroRef = useRef(null);

  /* The half of the headline that does not change. The marked phrase after it
     is typed, and a component inside a split would be fighting for the same
     nodes. */
  const {
    nodes: headlineNodes,
    count: wordCount,
    text: fixedHeadline,
  } = useMemo(() => {
    const fixed = HERO.headlineParts.slice(
      0,
      HERO.headlineParts.findIndex((part) => part.tone === 'mark'),
    );

    return { ...splitIntoWords(fixed), text: fixed.map((part) => part.text).join('') };
  }, [HERO.headlineParts]);

  // Read on the first render — anything added later would mount after the
  // entrance resolved its targets and stay where it was left.
  const [isStatic] = useState(() => prefersReducedMotion());

  // The eyebrow scrolls rather than wraps, but only where the line really
  // does not fit. Measured, not a breakpoint: the copy can change length.
  const eyebrowTrackRef = useRef(null);
  const eyebrowTextRef = useRef(null);
  const [isEyebrowOverflowing, setIsEyebrowOverflowing] = useState(false);

  /* useEffect, not useLayoutEffect, and measured after the first paint.
     Reading layout during the commit forces a full reflow at the worst
     moment — a trace put 502ms here. The eyebrow starts wrapped, which is
     readable anyway, and switches to the marquee a frame later if it must. */
  useEffect(() => {
    const track = eyebrowTrackRef.current;
    const text = eyebrowTextRef.current;
    // Reduced motion keeps the wrapping version: a line taller, but still.
    if (!track || !text || isStatic) return undefined;

    /* The copy's own width, cached. It only changes when the font swaps or the
       copy itself changes, never when the marquee turns on — so measuring it
       on every resize was paying for a layout to re-learn a constant. */
    let naturalWidth = 0;

    const readNatural = () => {
      // `pe-6` is added only while scrolling, so it has to come off the
      // measurement or the marquee could latch on at the threshold.
      const padEnd = parseFloat(getComputedStyle(text).paddingInlineEnd) || 0;
      naturalWidth = text.getBoundingClientRect().width - padEnd;
    };

    const apply = () => {
      const available = track.clientWidth;
      // A sub-pixel rounding difference is not an overflow worth animating.
      setIsEyebrowOverflowing(available > 0 && naturalWidth - available > 1);
    };

    let frame = requestAnimationFrame(() => {
      readNatural();
      apply();
    });

    /* Only the TRACK is observed. Observing the text as well meant the state
       change resized it (`pe-6`) and fed the observer straight back into
       another forced layout. The track's width changes on viewport resize,
       which is the only thing that can change the answer. */
    const observer = new ResizeObserver(apply);
    observer.observe(track);

    // Glyph widths move when the webfont swaps, so re-read the constant then.
    const onFonts = () => {
      readNatural();
      apply();
    };
    document.fonts?.ready.then(onFonts);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [isStatic]);

  /*
   * When the rest of the page may mount.
   *
   * The entrance itself is CSS, so there is nothing here to drive — only a
   * timer long enough to cover it, derived from the number of words rather
   * than hardcoded, because which one finishes last depends on the copy.
   */
  useEffect(() => {
    if (isStatic) {
      /* Reduced motion has no entrance to wait for. */
      announceHeroReady();
      return undefined;
    }

    const wordsEndMs = WORD_DELAY_MS + (wordCount - 1) * STAGGER_MS + WORD_DURATION_MS;
    const timer = setTimeout(announceHeroReady, Math.max(wordsEndMs, SUPPORT_END_MS));

    return () => clearTimeout(timer);
  }, [isStatic, wordCount]);

  return (
    <section
      ref={heroRef}
      aria-labelledby="hero-headline"
      // A full viewport, so nothing of the next section shows on load and the
      // hero is the whole first impression. min-h rather than h: if the copy
      // ever outgrows a short window the section stretches instead of hiding
      // its own bottom. svh rather than vh because mobile browser chrome makes
      // vh taller than what is actually on screen, which would push the CTAs
      // under the fold on exactly the devices that can least afford it. The top
      // padding stays — it is what keeps the headline clear of the fixed header
      // — and justify-center balances the content in what is left.
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40"
    >
      {/* Dot texture, cut out of the copy column. */}
      <HeroDots />

      {/* The hero's background — red behind the copy, blue behind the panel.
          This was the floor under a WebGL aurora that has been removed: the
          shader compiled on the main thread during the hero's entrance, which
          is the one moment on the page that cannot afford it. It was always
          written to carry the hero on its own. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(48rem_36rem_at_12%_14%,rgb(208_33_42/0.06),transparent_68%),radial-gradient(52rem_40rem_at_88%_28%,rgb(0_100_210/0.09),transparent_70%)]"
      />

      <div className="site-shell">
        {/* Top-aligned, not centred: the copy column is the taller of the two,
            and centring the panel against it left a hole above the window. */}
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Copy */}
          {/* min-w-0: a grid item's automatic minimum is its content, so the
              eyebrow's now-unbreakable line would widen this column past the
              viewport instead of being clipped and scrolled. */}
          <div className="min-w-0 text-center lg:text-left">
            {/* Ink, not the ramp: the first checkable proof on the page
                has to read as a fact, not as a second button. */}
            <p
              data-hero-eyebrow
              className="inline-flex max-w-full items-center gap-x-2.5 rounded-full bg-ink px-4 py-2 font-label text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-paper shadow-lift"
            >
              {/* shrink-0 and no flex-wrap on the row: the copy used to be a
                  bare text node, so on a phone it became its own flex line and
                  pushed the live dot up onto a line of its own. The dot is a
                  fixed item on the left now and never moves. */}
              <span aria-hidden="true" className="relative grid size-2 shrink-0 place-items-center">
                <span className="absolute size-2 rounded-full bg-signal-green-soft/70 motion-safe:animate-ping" />
                <span className="size-2 rounded-full bg-signal-green-soft" />
              </span>

              {/* One line, always. Where the copy fits it simply sits centred;
                  where it does not, it scrolls past rather than wrapping and
                  making the pill twice as tall. min-w-0 lets this shrink below
                  the text's own width, which is what makes the clip possible. */}
              <span ref={eyebrowTrackRef} className="min-w-0 flex-1 overflow-hidden">
                <span
                  // animate-marquee-drift is hand-written CSS rather than a
                  // generated utility, so a `motion-safe:` prefix on it would
                  // never compile — the reduced-motion case is handled by
                  // isStatic gating the measurement instead.
                  className={`flex ${
                    isEyebrowOverflowing ? 'w-max animate-marquee-drift' : 'justify-center'
                  }`}
                  style={isEyebrowOverflowing ? { '--marquee-duration': '14s' } : undefined}
                >
                  {/* While scrolling, the trailing space keeps the seam
                      between the two copies reading as a gap. Both carry it,
                      which is what lands the -50% loop exactly one copy on. */}
                  <span
                    ref={eyebrowTextRef}
                    className={`${isStatic ? '' : 'whitespace-nowrap'} ${
                      isEyebrowOverflowing ? 'pe-6' : ''
                    }`}
                  >
                    {HERO.eyebrow}
                  </span>
                  {isEyebrowOverflowing ? (
                    <span aria-hidden="true" className="whitespace-nowrap pe-6">
                      {HERO.eyebrow}
                    </span>
                  ) : null}
                </span>
              </span>
            </p>

            <h1
              id="hero-headline"
              className="mt-7 text-[length:var(--text-hero-split)] font-extrabold leading-[0.98] tracking-[-0.03em]"
            >
              {/* Read from the deck, not written here: this was hardcoded, so
                  the German page kept an English headline. Everything up to
                  the marked phrase is the fixed half; the mark is typed below.
                  Split into words in the markup — see `splitIntoWords`. */}
              <span className="block" aria-label={fixedHeadline}>
                <span aria-hidden="true">{headlineNodes}</span>
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
              <span data-hero-cta style={{ '--hero-stagger': 0 }}>
                <CtaButton href={HERO.primaryCta.href} intent="hero-primary">
                  {HERO.primaryCta.label}
                </CtaButton>
              </span>
              <span data-hero-cta style={{ '--hero-stagger': 1 }} className="relative">
                {/* The second door: for the majority who will not buy today. */}
                <CtaButton
                  href={HERO.secondaryCta.href}
                  variant="brandOutline"
                  intent="hero-playbook"
                >
                  {HERO.secondaryCta.label}
                </CtaButton>

                {/* A drawn arrow and a note pointing back at the button: the
                    arrow says "look here", the words say why. Hidden below lg,
                    where the buttons stack full width. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-full top-1/2 hidden -translate-y-1/2 items-center gap-1 whitespace-nowrap pl-1 lg:flex"
                >
                  <svg
                    viewBox="0 0 48 28"
                    fill="none"
                    className="h-11 w-[4.5rem] shrink-0 text-signal-blue motion-safe:animate-nudge-x"
                  >
                    {/* Mirrored inside the SVG, not with a scale class: the
                        nudge animation owns transform here and would
                        overwrite it. */}
                    <g transform="rotate(-38 24 14) translate(0,28) scale(1,-1)">
                      {/* One stroke, tail to head, so it reads as a pen mark
                          rather than a UI glyph. */}
                      <path
                        d="M45 6c-9.5-2.6-19.4-1.2-27.4 3.4C13.4 11.9 9.6 15.4 7 19.6"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M5.6 21.8l1.1-7.4M5.6 21.8l7.3 1.5"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>

                  <span className="-translate-y-3 font-serif text-[0.95rem] italic leading-tight text-signal-blue-deep">
                    {HERO.secondaryNote}
                  </span>
                </span>
              </span>
            </div>

            {/* Price, guarantee and what you do not need. Two weights, not
                three equal sentences: at one weight this is the shape of small
                print, which is the wrong voice for a price and a guarantee. */}
            <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-3">
              {HERO.assurances.map((item, index) => {
                const tone = toneOf(item.tone);

                return (
                  <li
                    key={item.lead}
                    data-hero-reassure
                    style={{ '--hero-stagger': index }}
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
                    style={{ '--hero-stagger': index }}
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
