import { useCallback, useEffect, useRef } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import Icon from '../components/ui/Icon';
import { PILLARS } from '../data/siteContent';
import { useParallax } from '../hooks/useParallax';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { prefersReducedMotion } from '../lib/motion';
import { toneOf } from '../lib/signalTones';

/**
 * 06 — Three things, one system.
 *
 * The page's table of contents. It has to stay scannable in about four
 * seconds, so nothing here is allowed to make the three harder to compare.
 *
 * THE DEPTH IS THE DESIGN. This was three flat rectangles in a row, and no
 * amount of colour on a rectangle stops it being a rectangle. Each card is now
 * a small stage: the pointer tilts it, and the things inside sit at different
 * depths so they slide against each other as it moves — the wash furthest
 * back, the number floating behind the words, the content nearest the reader.
 * That is real parallax rather than a drop shadow pretending to be one.
 *
 * The oversized number is doing the work the dashed 9px chip could not. Every
 * card needs something big enough to tell them apart at a glance, and the
 * numbers were already in the content.
 *
 * The wire from the previous pass stays. The tiles are still nodes on it, and
 * the tilt is per-card so the row's alignment never breaks.
 *
 * COST. The tilt is two custom properties written straight to the node inside
 * a rAF, never through React state — a `mousemove` that re-renders three cards
 * would put a component tree on the main thread sixty times a second, and this
 * page has already learned what that does. Everything animated is `transform`,
 * so it composites. Touch and reduced motion get no tilt at all: there is no
 * pointer to follow, and a card that lurches when a thumb lands on it is worse
 * than a flat one.
 */

/** Degrees at the far corner. Past about 8 it stops reading as depth and starts reading as a bug. */
const MAX_TILT = 6;

function PillarCard({ item, index }) {
  const tone = toneOf(item.tone);
  const cardRef = useRef(null);
  const frameRef = useRef(0);
  /* The number drifts against the scroll, so the card has depth before the
     pointer ever arrives — most visitors will never hover it. Alternating
     direction keeps the three from moving as one block. */
  const numberRef = useParallax(index % 2 === 0 ? 0.05 : -0.05, { axis: 'y' });

  const setTilt = useCallback((rx, ry) => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--pillar-rx', `${rx}deg`);
    card.style.setProperty('--pillar-ry', `${ry}deg`);
  }, []);

  const onPointerMove = useCallback(
    (event) => {
      if (event.pointerType === 'touch') return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      // -0.5…0.5 from the card's centre.
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      // One write per frame. A raw pointermove fires far faster than the screen
      // refreshes, and every extra write is a layout read nobody sees.
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => setTilt(-py * MAX_TILT * 2, px * MAX_TILT * 2));
    },
    [setTilt],
  );

  const onPointerLeave = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    setTilt(0, 0);
  }, [setTilt]);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const isStatic = prefersReducedMotion();

  return (
    <li
      data-reveal
      data-reveal-group="pillars"
      className="relative h-full [perspective:1100px]"
      onPointerMove={isStatic ? undefined : onPointerMove}
      onPointerLeave={isStatic ? undefined : onPointerLeave}
    >
      <a
        ref={cardRef}
        href={item.anchor}
        style={{ '--pillar-rx': '0deg', '--pillar-ry': '0deg' }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-white p-7 shadow-lift transition-[box-shadow,border-color,transform] duration-500 ease-[var(--ease-out-expo)] [transform:rotateX(var(--pillar-rx))_rotateY(var(--pillar-ry))] [transform-style:preserve-3d] hover:border-ink/25 hover:shadow-float motion-reduce:[transform:none] sm:p-8"
      >
        {/* Furthest back: the tone wash. Pushed away from the reader so it
            lags behind everything else as the card turns. */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-gradient-to-br to-transparent blur-2xl [transform:translateZ(-30px)] ${tone.wash}`}
        />

        {/* The number, big enough to be the card's landmark. Bottom right and
            mostly off the edge, so it is texture rather than a label — the
            small chip in the corner is still the one that has to be read. */}
        <span
          ref={numberRef}
          aria-hidden="true"
          className={`pointer-events-none absolute -bottom-10 -right-4 font-display text-[9rem] font-extrabold leading-none tracking-tighter opacity-[0.07] [transform:translateZ(6px)] ${tone.text}`}
        >
          {item.n}
        </span>

        <span className="relative flex items-center justify-between [transform:translateZ(38px)]">
          <span className="relative grid place-items-center">
            {/* Pulses in time with the current on the wire, staggered a third
                of the cycle apart so it travels left to right. */}
            <span
              aria-hidden="true"
              className={`system-node-halo absolute size-11 rounded-xl ${tone.rule}`}
              style={{ animationDelay: `${index * 1.4}s` }}
            />
            <span
              className={`relative grid size-11 place-items-center rounded-xl shadow-lift transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover:scale-110 ${tone.tile}`}
            >
              <Icon name={item.icon} className="size-5" />
            </span>
          </span>

          <span
            className={`grid size-9 place-items-center rounded-full font-label text-[0.68rem] font-bold tracking-[0.08em] ${tone.tile}`}
          >
            {item.n}
          </span>
        </span>

        <h3 className="relative mt-6 text-xl font-extrabold tracking-tight [transform:translateZ(28px)] sm:text-2xl">
          {item.title}
        </h3>

        <p className="relative mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted [transform:translateZ(20px)]">
          {item.body}
        </p>

        <span
          className={`relative mt-7 inline-flex items-center gap-1.5 text-sm font-semibold [transform:translateZ(28px)] ${tone.text}`}
        >
          See how
          <Icon
            name="arrowRight"
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>

        {/* The pillar's colour, always on. Three cards that are identical until
            you touch them are three identical cards. */}
        <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-[3px] ${tone.rule}`} />
      </a>
    </li>
  );
}

export default function PillarsSection() {
  const sectionRef = useRevealOnScroll();

  return (
    <section
      ref={sectionRef}
      id="the-system"
      aria-labelledby="pillars-headline"
      /* Standard band, less lead-in at the top. This follows the ink
         testimonials band, and a hard colour edge already does the separating
         that padding does between two sections of the same ground — 96px of
         ink and then 132px of paper measured as 228px of nothing between the
         Trustpilot button and this heading.

         Safe to make asymmetric here specifically because this section paints
         no background of its own. On a coloured band uneven padding would sit
         the band visibly off-centre, which is why `section-band` is symmetric
         in the first place. */
      className="section-band pt-12 sm:pt-14 lg:pt-16"
    >
      <div className="site-shell">
        <SectionHeading
          eyebrow={PILLARS.eyebrow}
          align="center"
          headline={
            <span id="pillars-headline">
              {PILLARS.headline} <span className="headline-mark">{PILLARS.headlineMark}</span>
              {PILLARS.headlineTail}
            </span>
          }
          lead={PILLARS.lead}
        />

        <div className="relative mt-14">
          {/* The wire. Threaded through the centre of the icon tiles so they
              read as things ON it rather than near it: the card's `sm:p-8` is
              32px and the tile is `size-11`, so the centre is 54px — 3.375rem.
              Measured; 3.75rem put it 6px low and the tiles floated off it.

              Only from `md`, where the three sit across. Stacked on a phone a
              vertical wire down a column would be a decoration pretending to
              be a diagram. */}
          <div
            aria-hidden="true"
            className="system-wire left-[16.66%] right-[16.66%] top-[3.375rem] hidden h-px rounded-full bg-hairline md:block"
          />

          <ul className="grid gap-5 md:grid-cols-3">
            {PILLARS.items.map((item, index) => (
              <PillarCard key={item.n} item={item} index={index} />
            ))}
          </ul>

          {/* The handover. Each card links into the section that expands it,
              and this is what says so — without it the row is three cards that
              happen to be clickable. Two weights: the claim, then what happens
              next. */}
          <div
            data-reveal
            data-reveal-group="pillars-closer"
            className="mx-auto mt-14 max-w-2xl text-center"
          >
            <p className="font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
              {PILLARS.closer.lead}
            </p>
            <p className="mt-2 text-[length:var(--text-lead)] leading-relaxed text-muted">
              {PILLARS.closer.detail}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
