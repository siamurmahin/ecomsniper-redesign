import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import Icon from '../components/ui/Icon';
import { AUDIENCE } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useLocation } from 'react-router-dom';
import { languageFromPath, pathForLanguage } from '../lib/language';
import { gsap, prefersReducedMotion, MOTION, SplitText } from '../lib/motion';
import { toneOf } from '../lib/signalTones';

/**
 * 03 — Who this is for. Eight panels, all on screen; the one you point at opens.
 * You answer "is this for me?" by recognising yourself, so keep everyone visible.
 */

/** A colour per member, cycled so no two neighbours in the row share one. */
const PERSON_TONES = ['blue', 'gold', 'green', 'red'];

/**
 * How much width the open panel takes when the panels sit side by side.
 * Below md they stack instead, and height is measured from the copy.
 */
const EXPAND_RATIO = { row: 0.44 };

/** Height of a shut strip when the panels are stacked, in pixels. */
const CLOSED_STRIP = 56;

/** Floor for the row across, so a mis-measure cannot collapse it. */
const MIN_ROW_HEIGHT = 288;

/** Seconds a member holds the floor before the next one takes it. */
const DWELL = 5;

export default function AudienceSection() {
  const sectionRef = useRevealOnScroll();
  const language = languageFromPath(useLocation().pathname);
  const rowRef = useRef(null);
  const panelRefs = useRef([]);
  const openRefs = useRef([]);
  const shutRefs = useRef([]);
  const quoteRef = useRef(null);
  const progressRef = useRef(null);
  const timelineRef = useRef(null);
  const isFirstLayout = useRef(true);

  const [activeIndex, setActiveIndex] = useState(0);
  // Three ways to pause: leaving resumes, a click stops for good, scrolling
  // out of view just parks it.
  const [isHeld, setIsHeld] = useState(false);
  const [hasTakenOver, setHasTakenOver] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isStatic] = useState(() => prefersReducedMotion());

  const people = AUDIENCE.people;
  const count = people.length;

  const select = useCallback((index) => {
    setActiveIndex(index);
    // A click means "I want this one" — stop the rotation, do not close it.
    setHasTakenOver(true);
  }, []);

  /**
   * Measure the height a story needs. The text layer is positioned, so it can
   * be measured even while its panel is shut.
   */
  const measureOpenHeight = useCallback((index) => {
    const layer = openRefs.current[index];
    if (!layer) return CLOSED_STRIP;
    const [glyph, block] = layer.children;
    if (!glyph || !block) return CLOSED_STRIP;
    const style = getComputedStyle(layer);
    return Math.ceil(
      block.scrollHeight +
        glyph.getBoundingClientRect().height +
        parseFloat(style.paddingTop) +
        parseFloat(style.paddingBottom) +
        (parseFloat(style.rowGap) || 0),
    );
  }, []);

  /*
   * Lay out the row for whoever is open. Side by side, flex-grow does it and
   * the row keeps a fixed height. Stacked, we measure the copy instead.
   */
  const applyLayout = useCallback(
    (animate) => {
      const row = rowRef.current;
      const panels = panelRefs.current.filter(Boolean);
      if (!row || !panels.length) return;

      const style = getComputedStyle(row);
      const isColumn = style.flexDirection === 'column';
      const duration = animate && !isStatic ? 0.62 : 0;

      timelineRef.current?.kill();
      const timeline = gsap.timeline();

      if (isColumn) {
        // Stacked panels are already full width, so no pin is needed.
        row.style.removeProperty('--panel-open-w');

        /*
         * Measure what each story needs rather than guessing a height. Every
         * open panel uses the tallest one, so the row never jumps as it turns.
         */
        const gap = parseFloat(style.rowGap) || 0;
        const needs = panels.map((_, index) => measureOpenHeight(index));
        const openHeight = Math.max(...needs, CLOSED_STRIP);
        row.style.height = `${openHeight + CLOSED_STRIP * (count - 1) + gap * (count - 1)}px`;

        panels.forEach((panel, index) => {
          timeline.to(
            panel,
            {
              height: index === activeIndex ? openHeight : CLOSED_STRIP,
              flexGrow: 0,
              flexBasis: 'auto',
              duration,
              ease: MOTION.ease,
            },
            0,
          );
        });
      } else {
        const ratio = EXPAND_RATIO.row;
        const grow = (ratio * (count - 1)) / (1 - ratio);
        const gap = parseFloat(style.columnGap) || 0;
        const usable = row.clientWidth - gap * (count - 1);
        // Pin the width first, or we measure the copy at the wrong size.
        row.style.setProperty('--panel-open-w', `${Math.round(usable * ratio)}px`);

        /*
         * Height comes from the longest story at this width. A fixed number
         * looked fine wide and clipped the glyph on smaller screens.
         */
        const needs = panels.map((_, index) => measureOpenHeight(index));
        row.style.height = `${Math.max(...needs, MIN_ROW_HEIGHT)}px`;

        panels.forEach((panel, index) => {
          timeline.to(
            panel,
            {
              flexGrow: index === activeIndex ? grow : 1,
              flexBasis: 0,
              height: '',
              duration,
              ease: MOTION.ease,
            },
            0,
          );
        });
      }

      /*
       * Fade and movement use different curves: expo suits the panel opening,
       * but pops the text, so opacity uses power2. They are offset, not
       * simultaneous, or two stories overlap for a beat.
       */
      panels.forEach((panel, index) => {
        const isOpen = index === activeIndex;
        const open = openRefs.current[index];
        const shut = shutRefs.current[index];

        if (open) {
          timeline.to(
            open,
            {
              opacity: isOpen ? 1 : 0,
              duration: isOpen ? duration * 0.72 : duration * 0.3,
              ease: 'power2.out',
            },
            isOpen ? duration * 0.18 : 0,
          );
        }
        if (shut) {
          timeline.to(
            shut,
            {
              opacity: isOpen ? 0 : 1,
              duration: isOpen ? duration * 0.3 : duration * 0.6,
              ease: 'power2.out',
            },
            isOpen ? 0 : duration * 0.18,
          );
        }
      });

      timelineRef.current = timeline;
    },
    [activeIndex, count, isStatic, measureOpenHeight],
  );

  /*
   * A resize can flip the row into a column, so lay it out again — without
   * animating, since nothing was chosen. Width only: we set the height
   * ourselves, and reacting to that would cut our own transition short.
   */
  const lastWidth = useRef(0);
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return undefined;
    lastWidth.current = row.clientWidth;
    const observer = new ResizeObserver(() => {
      if (row.clientWidth === lastWidth.current) return;
      lastWidth.current = row.clientWidth;
      applyLayout(false);
    });
    observer.observe(row);
    return () => observer.disconnect();
  }, [applyLayout]);

  /*
   * Measure again after the webfont loads. The fallback has different metrics,
   * and a font swap is not a resize, so nothing else notices it.
   */
  useEffect(() => {
    if (!document.fonts) return undefined;

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) applyLayout(false);
    });

    return () => {
      cancelled = true;
    };
  }, [applyLayout]);

  // Nothing animates off screen — it would be finished before anyone looked.
  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(scope);
    return () => observer.disconnect();
  }, [sectionRef]);

  useLayoutEffect(() => {
    // First paint is placed, not animated, so it does not look like a late reflow.
    applyLayout(!isFirstLayout.current);
    isFirstLayout.current = false;
  }, [applyLayout]);

  useEffect(() => () => timelineRef.current?.kill(), []);

  // Re-split every time: the copy wraps differently at each width and member.
  useLayoutEffect(() => {
    const el = quoteRef.current;
    if (!el || isStatic) return undefined;

    let split;
    const ctx = gsap.context(() => {
      // Lines, not words: these are whole stories, and per-word would be slow.
      /*
       * Spans because this sits inside a <button>, which only allows phrasing
       * content. Hidden from screen readers so the story stays one sentence.
       */
      split = SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        tag: 'span',
        aria: 'hidden',
        linesClass: 'block overflow-hidden',
      });
      // Starts just after the panel does, so both finish together.
      gsap.from(split.lines, {
        yPercent: 105,
        opacity: 0,
        duration: 0.5,
        ease: MOTION.easeSoft,
        stagger: 0.05,
        delay: 0.16,
      });
    }, el);

    return () => {
      // Undo the split, or the next one runs on already-split markup.
      split?.revert();
      ctx.revert();
    };
  }, [activeIndex, isStatic]);

  // One timer drives both the bar and the turn, so they cannot drift apart.
  useEffect(() => {
    if (isStatic || hasTakenOver || isHeld || !isInView) return undefined;
    const bar = progressRef.current;
    if (!bar) return undefined;

    const tween = gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: DWELL,
        ease: 'none',
        onComplete: () => setActiveIndex((index) => (index + 1) % count),
      },
    );
    return () => tween.kill();
  }, [activeIndex, isHeld, hasTakenOver, isInView, isStatic, count]);

  return (
    <section
      ref={sectionRef}
      id="who-its-for"
      aria-labelledby="audience-headline"
      className="section-band bg-paper-sunk"
    >
      <div className="site-shell">
        <SectionHeading
          eyebrow={AUDIENCE.eyebrow}
          align="center"
          headline={
            <span id="audience-headline">
              {AUDIENCE.headline} <span className="headline-mark">{AUDIENCE.headlineMark}</span>
              {AUDIENCE.headlineTail}
            </span>
          }
          lead={AUDIENCE.lead}
        />

        {/* Hovering or tabbing into the row holds the open panel in place — it
            should not close on someone who is reading it. */}
        <div
          ref={rowRef}
          data-reveal
          data-reveal-group="audience-row"
          // Tall enough for the longest story and no taller, or a gap shows.
          className="mx-auto mt-12 flex w-full max-w-md flex-col gap-2 md:h-[23rem] md:max-w-none md:flex-row"
          onMouseEnter={() => setIsHeld(true)}
          onMouseLeave={() => setIsHeld(false)}
          onFocusCapture={() => setIsHeld(true)}
          onBlurCapture={() => setIsHeld(false)}
        >
          {people.map((person, index) => {
            const isOpen = index === activeIndex;
            const tone = toneOf(PERSON_TONES[index % PERSON_TONES.length]);

            return (
              <button
                key={person.name}
                ref={(el) => (panelRefs.current[index] = el)}
                type="button"
                // Hover and focus open it; click only stops the rotation.
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => select(index)}
                aria-expanded={isOpen}
                aria-label={`${person.name}, ${person.role}`}
                style={{ flexGrow: 1, flexBasis: 0 }}
                className={`group relative isolate min-h-0 min-w-0 overflow-hidden rounded-2xl border text-left transition-[border-color,background-color] duration-500 ${
                  isOpen
                    ? 'border-ink/25 bg-ink text-paper'
                    : 'border-hairline bg-white/60 text-ink hover:bg-white'
                }`}
              >
                {/* The member's colour, thrown from the corner their glyph sits
                    in. Only the open panel carries it: eight lit corners would
                    be a pattern rather than a signal. */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br to-transparent transition-opacity duration-700 ${tone.wash} ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Closed: glyph and name, sideways on a desktop sliver and
                    upright on a phone strip. Name only — a five-word role set
                    vertically would be taller than the panel. */}
                <span
                  ref={(el) => (shutRefs.current[index] = el)}
                  className="absolute inset-0 flex items-center gap-3 px-3 py-2 md:flex-col md:items-start md:justify-between md:px-2 md:py-3 lg:px-3 lg:py-4"
                >
                  <span
                    aria-hidden="true"
                    className={`grid size-8 shrink-0 place-items-center rounded-xl transition-colors duration-300 md:size-7 lg:size-9 ${tone.tile}`}
                  >
                    <Icon name={person.icon} className="size-4" />
                  </span>
                  {/* Turned to read upward from the foot of the panel, like the
                      spine of a book. `vertical-rl` on its own runs the name
                      downward, which is the convention for CJK text rather than
                      for a Latin name stood on its side — and it starts the
                      word at the top, leaving the gap under it. */}
                  <span className="min-w-0 text-sm font-semibold md:rotate-180 md:[writing-mode:vertical-rl]">
                    {person.name}
                  </span>
                </span>

                {/* Open: the words. Absolutely placed so the closed panels are
                    never asked to reserve room for a quote they are not
                    showing. */}
                <span
                  ref={(el) => (openRefs.current[index] = el)}
                  aria-hidden={!isOpen}
                  style={{ opacity: 0 }}
                  /* Anchored to the top below md, the bottom above it. With
                     justify-end everywhere, a story needing a few extra pixels
                     pushed them out of the top and the glyph hit the edge —
                     silently, with no overflow to notice. */
                  className="absolute inset-y-0 left-0 flex w-full flex-col justify-start gap-5 p-6 md:justify-end md:w-[var(--panel-open-w)] lg:p-7"
                >
                  <span
                    aria-hidden="true"
                    className={`grid size-10 shrink-0 place-items-center self-start rounded-xl ${tone.tile}`}
                  >
                    <Icon name={person.icon} className="size-[1.15rem]" />
                  </span>

                  <span className="mt-auto block">
                    {/* The words only. The name and the label below are the
                        panel's furniture — they should be there the moment it
                        opens, not arrive line by line after it. */}
                    <span className="block" ref={isOpen ? quoteRef : null}>
                      {/* Every member leads with a line at display size. Rory's
                          is his own words, so it takes quote marks; the other
                          seven are titles written about them, and marking those
                          as speech would put words in their mouths. */}
                      <span className="mb-2.5 block max-w-xl font-display text-base leading-snug sm:text-lg lg:text-xl">
                        {person.quote ? `“${person.quote}”` : person.title}
                      </span>

                      <span className="block max-w-xl text-[0.82rem] leading-relaxed text-paper/75 sm:text-sm">
                        {person.story}
                      </span>
                    </span>

                    {/* Label beside the name only once there is room. Between
                        md and xl the panel is ~300px, where the role broke
                        over four lines. */}
                    <span className="mt-5 flex flex-col gap-1.5 border-t border-ink-line pt-4 xl:flex-row xl:items-end xl:gap-3">
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">{person.name}</span>
                        <span className="block text-xs leading-snug text-muted-dark">
                          {person.role}
                        </span>
                      </span>
                      {/* The soft step, not the brand green: #86b817 on ink is
                          about 4:1, which is under the bar for a label this
                          small and this letter-spaced. */}
                      <span className="micro-label shrink-0 whitespace-nowrap text-signal-green-soft xl:ml-auto">
                        {AUDIENCE.memberLabel}
                      </span>
                    </span>
                  </span>
                </span>

                {/* The dwell timer, drawn along the foot of the open panel.
                    Only while it is actually running. */}
                {isOpen && !isStatic && !hasTakenOver && (
                  <span
                    ref={progressRef}
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 ${tone.rule}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/*
          The closer lands as three beats rather than one sentence, staggered so
          they arrive in the order they argue: the eight are set apart, put back
          together, and then it turns on the reader.

          The first two are the setup and are sized and coloured as such. The
          question is the only part that asks for anything, so it is the only
          part at full size — and it marks "you" exactly as the headline above
          marks it, which closes the section on the word it opened with.
        */}
        {/*
          The closer is a line and a way down, not a headline and a button.

          It sits below the eight it is about, so it does not need to compete
          with the section's own heading — set at the weight of a caption and in
          the brand green, it reads as the page speaking rather than as another
          title. The deep step of the green, since #86b817 on this band is about
          2.4:1 and unreadable at this size.
        */}
        {/* Two weights: the first sentence sets up, the question asks. Joined
            with a space, not spaced by margin — margin reads as
            "Different lives.Same system." to a screen reader or a copy-paste. */}
        <p
          data-reveal
          data-reveal-group="audience-closer"
          className="mt-14 text-center font-display"
        >
          <span className="block text-sm font-semibold text-muted sm:text-base">
            {AUDIENCE.closer.beats.join(' ')}
          </span>
          <span className="mt-1.5 block text-base font-bold sm:text-lg">
            {AUDIENCE.closer.questionLead} {AUDIENCE.closer.questionMark}{' '}
            {AUDIENCE.closer.questionTail}
          </span>
        </p>

        <div className="mt-4 flex justify-center">
          {/* Keeps the language, like every other internal link. */}
          <a
            href={pathForLanguage(AUDIENCE.closer.cta.href, language)}
            aria-label={AUDIENCE.closer.cta.label}
            data-cta-intent="audience-to-pricing-mouse"
            // Fills on hover so the whole cue is the target; contents invert with it.
            className="group flex flex-col items-center gap-2.5 rounded-2xl px-5 py-4 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            {/* The shell is a plain icon; only the wheel inside it moves. Drawn
                rather than pulled from a Lottie: it is an outline and one
                travelling part, which is a few lines of SVG here and inherits
                currentColor — a player plus a hosted JSON would be a dependency
                and a network round trip for a glyph this size. */}
            <Icon
              name="mouseScroll"
              className="mouse-cue size-9 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5"
            />

            {/* Ink and bold rather than the green it was: at this size and
                letter-spacing the green sat quieter than the glyph above it,
                and it was the third green in a section that already has two.
                No colour of its own now — it takes the anchor's, so it flips to
                paper when the fill lands. */}
            <span className="font-label text-xs font-bold uppercase tracking-[0.16em]">
              {AUDIENCE.closer.cta.nudge}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
