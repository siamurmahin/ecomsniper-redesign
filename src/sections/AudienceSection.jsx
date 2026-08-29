import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import Icon from '../components/ui/Icon';
import { AUDIENCE } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { gsap, prefersReducedMotion, MOTION, SplitText } from '../lib/motion';
import { toneOf } from '../lib/signalTones';

/**
 * 03 — Who this is for.
 *
 * Eight panels, all of them on screen at once, and the one under the pointer
 * opens and speaks. The question the headline asks — is this going to work for
 * *you* — is answered by recognising yourself in someone, so every life is
 * visible from the first glance and reading one costs a hover rather than a
 * click and a wait.
 *
 * Two earlier shapes were wrong. Three stacked viewports buried it. A quote
 * card above a grid of eight buttons was a menu: everything the same size, the
 * same colour, and nothing moving until you asked it to. Panels that hold their
 * place while one of them grows keep the whole cast present and still give one
 * member the floor — and it stays a single screen, which is the constraint that
 * collapsed those three viewports into one in the first place.
 *
 * Nothing here is new copy. The eight members, their roles, their words and the
 * closing line are the deck's, unchanged.
 */

/** A colour per member, cycled so no two neighbours in the row share one. */
const PERSON_TONES = ['blue', 'gold', 'green', 'red'];

/**
 * Share of the row's width the open panel takes when the panels are across.
 *
 * They go across from md, where eight of them finally have the width: each shut
 * panel lands around 52px there, which holds the glyph once it steps down a
 * size. Below md they stack, and there height is measured from the copy rather
 * than shared out by ratio. The stacked list is also capped to a phone's
 * measure — run full width on a tablet it became 685px bars holding one glyph
 * and one name against a field of nothing.
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
  const rowRef = useRef(null);
  const panelRefs = useRef([]);
  const openRefs = useRef([]);
  const shutRefs = useRef([]);
  const quoteRef = useRef(null);
  const progressRef = useRef(null);
  const timelineRef = useRef(null);
  const isFirstLayout = useRef(true);

  const [activeIndex, setActiveIndex] = useState(0);
  // Three separate reasons to hold still, because they lift differently: a
  // pointer or a focus ring leaving resumes the cycle, a click ends it, and
  // scrolling the row out of view only parks it.
  const [isHeld, setIsHeld] = useState(false);
  const [hasTakenOver, setHasTakenOver] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isStatic] = useState(() => prefersReducedMotion());

  const people = AUDIENCE.people;
  const count = people.length;

  const select = useCallback((index) => {
    setActiveIndex(index);
    // A click is a decision: stop advancing rather than closing a panel on
    // someone who chose to open it.
    setHasTakenOver(true);
  }, []);

  /**
   * The height one panel's content needs, measured rather than assumed.
   *
   * The text layer is absolutely placed, so it never contributes to its panel's
   * height and can be measured at any time — including while the panel is shut.
   * Its width is the panel's, which stacked is the full row, so what comes back
   * is what that story will actually occupy once it opens.
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
   * Lay the row out for whichever member is open. The two axes want different
   * things, so they are handled separately rather than by one shared formula.
   *
   * Across, `flex-grow` moves and the row's fixed height rules: the panels stay
   * in normal flow, so the shut ones give up exactly the width the open one
   * takes and the row can never be pushed out of its own bounds. It also
   * publishes the width an open panel settles at, which every text layer is
   * pinned to — without that the story is laid out against whatever width its
   * panel happens to have at that instant, 95px while it is still opening, so
   * the lines get measured one word wide and stay that way once it has finished
   * growing.
   *
   * Stacked, height is measured from the copy instead. See below for why.
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
        // Stacked, the panel is already full width, so the copy has nothing to
        // reflow against and the pin is not wanted.
        row.style.removeProperty('--panel-open-w');

        /*
         * Measure what each story actually needs at this width and give the row
         * exactly that, rather than betting a fixed height covers the worst
         * case. The bet kept losing: adding one title line pushed the longest
         * story from 323px to 425px on a 320px phone, and every guess that
         * fixed one width clipped another.
         *
         * Every open panel is sized to the *tallest* member rather than to its
         * own story, so the row is one height for all eight — sizing each to
         * itself would move everything below by up to 90px each time the panel
         * turned, which on a five second rotation is the page walking down the
         * screen on its own.
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
        // Pin first: the measurement below has to be taken against the width
        // the copy will actually be set at.
        row.style.setProperty('--panel-open-w', `${Math.round(usable * ratio)}px`);

        /*
         * The row is as tall as the longest story needs at that pinned width,
         * measured rather than picked. A fixed height looked fine at 1280 and
         * clipped the glyph by 27px at 820, where the open panel is barely
         * 300px wide and the same story runs to twice the lines: the text layer
         * is anchored to the foot of the panel, so anything that does not fit
         * goes out of the top rather than the bottom, which is why it took a
         * screenshot to catch and never showed up as an overflow.
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
       * The crossfade is eased apart from the geometry above.
       *
       * expo.out is right for a panel opening — nearly all of the movement
       * happens up front, which is what makes it feel quick. It is wrong for
       * opacity: the same curve takes the incoming content to most of its
       * opacity in the first fraction of the tween, so it arrives as a pop
       * rather than a fade. Opacity gets power2 instead.
       *
       * They are also offset rather than run together. Fading both layers from
       * zero at the same instant leaves a beat where a name and a story are
       * both half visible on top of each other; the outgoing one clears first,
       * and the incoming one starts once the panel has begun to move.
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
   * A resize can cross the breakpoint that turns the row into a column, which
   * changes both the ratio and whether the width pin applies. Re-lay it out
   * without animating: nothing was chosen, the container just changed shape.
   *
   * Width only. `applyLayout` sets the row's height itself, so an observer that
   * reacted to every resize would hear its own write, re-enter with animation
   * off, and snap the transition it had just started — a 620ms open finished in
   * 77ms. Height changes here are this component's own doing; width is the only
   * thing the outside world changes.
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

  // Nothing animates while the row is off screen. A rotation running down the
  // page is work nobody sees, and it would have moved on by the time a visitor
  // arrives.
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
    // The first paint is placed, not animated: a panel growing from nothing on
    // load reads as the layout settling late.
    applyLayout(!isFirstLayout.current);
    isFirstLayout.current = false;
  }, [applyLayout]);

  useEffect(() => () => timelineRef.current?.kill(), []);

  // Re-split on every change: the copy wraps differently at every width and for
  // every member, so the lines have to be measured from what was actually
  // rendered rather than assumed.
  useLayoutEffect(() => {
    const el = quoteRef.current;
    if (!el || isStatic) return undefined;

    let split;
    const ctx = gsap.context(() => {
      // Lines, not words. These are stories of twenty-odd words rather than the
      // one-line quotes this replaced, and a per-word stagger across all of
      // them would both take too long to finish and mean hundreds of spans.
      /*
       * `tag: 'span'` because this all lives inside a <button>, which takes
       * phrasing content only. Left at its default the split wraps each line in
       * a <div>, which put eight of them inside buttons — invalid nesting that
       * browsers render anyway, so nothing complains until something does.
       * The lines still need to stack, hence `block` on the class.
       *
       * `aria: 'hidden'` keeps the story one string for a screen reader. The
       * split is a visual device; read out as separate fragments it becomes a
       * list of line-length pieces rather than a sentence.
       */
      split = SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        tag: 'span',
        aria: 'hidden',
        linesClass: 'block overflow-hidden',
      });
      // Lands with the panel rather than after it: the layer it sits in starts
      // fading at 0.11s, so the lines follow a beat behind that and the last
      // one settles as the panel finishes opening.
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
      // Revert the split explicitly: leaving the wrapper spans behind would
      // hand the next split a DOM that is already carved up.
      split?.revert();
      ctx.revert();
    };
  }, [activeIndex, isStatic]);

  // The dwell timer doubles as the progress bar, so what the bar shows and when
  // the panel turns can never drift apart.
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
          // Tall enough for the longest story at the open panel's width, and no
          // taller: the row is a fixed height so the closed panels have
          // something to give up, and any surplus shows as a hole between the
          // glyph at the top and the words at the foot.
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
                // Hover and focus open a panel; the click is only there to stop
                // the rotation for someone who has chosen where to stay.
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

                {/* Closed: the glyph and the name, turned on their side on a
                    desktop where the panel is a tall sliver, and left upright on
                    a phone where it is a wide strip. The name only — these roles
                    run to five words, and set vertically in a 95px panel one of
                    them would be a column of text taller than the panel. The
                    role is what the panel opens to say. */}
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
                  className="absolute inset-y-0 left-0 flex w-full flex-col justify-end gap-5 p-6 md:w-[var(--panel-open-w)] lg:p-7"
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

                    {/* The label sits beside the name only once the panel is
                        wide enough for both. Between md and xl the open panel
                        is around 300px, where "Career switcher, corporate job"
                        and the label were splitting that between them and the
                        role broke over four lines. Stacked, each gets the full
                        measure. */}
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
        {/* The question alone. "Different lives. Same system." summarised the
            eight, and the eight are directly above saying it themselves — read
            after them it was a caption on something already understood, and it
            pushed the line long enough to read as a heading again. The sentence
            is still in the deck under `closer.beats` if it is wanted back. */}
        <p
          data-reveal
          data-reveal-group="audience-closer"
          className="mt-14 text-center font-display text-base font-bold sm:text-lg"
        >
          {AUDIENCE.closer.questionLead} {AUDIENCE.closer.questionMark}{' '}
          {AUDIENCE.closer.questionTail}
        </p>

        <div className="mt-4 flex justify-center">
          <a
            href={AUDIENCE.closer.cta.href}
            aria-label={AUDIENCE.closer.cta.label}
            data-cta-intent="audience-to-pricing-mouse"
            // Fills to ink on hover, so the whole cue becomes the target rather
            // than the words inside it. Everything on top inverts to paper with
            // it — leaving the glyph or the label in ink would drop them into
            // the fill the moment it landed.
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
