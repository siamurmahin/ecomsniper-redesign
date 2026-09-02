import { useCallback, useEffect, useRef } from 'react';
import CtaButton from '../components/ui/CtaButton';
import SectionHeading from '../components/ui/SectionHeading';
import Icon from '../components/ui/Icon';
import { useContent } from '../hooks/useContent';
import { useParallax } from '../hooks/useParallax';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { prefersReducedMotion } from '../lib/motion';
import { toneOf } from '../lib/signalTones';

/**
 * 06 — Three things, one system. The page's table of contents, so it has to
 * stay scannable in about four seconds.
 *
 * The depth is the design. These were three flat rectangles; each card is now
 * a small stage where the pointer tilts it and the contents sit at different
 * depths. The oversized number is what tells them apart at a glance.
 *
 * The tilt writes two custom properties straight to the node inside a rAF,
 * never through React state. Touch and reduced motion get no tilt: there is
 * no pointer to follow, and a card that lurches under a thumb is worse.
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
  const { PILLARS } = useContent();
  const sectionRef = useRevealOnScroll();

  return (
    <section
      ref={sectionRef}
      id="the-system"
      aria-labelledby="pillars-headline"
      /* Less lead-in at the top: this follows an ink band, and the colour
         edge already separates them — 96px of ink then 132px of paper read as
         228px of nothing. Safe here only because this section paints no
         background of its own. */
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
          {/* The wire, threaded through the centre of the tiles so they read
              as things on it. 3.375rem, measured — 3.75rem left them floating.
              Only from md: stacked, a vertical wire is a fake diagram. */}
          <div
            aria-hidden="true"
            className="system-wire left-[16.66%] right-[16.66%] top-[3.375rem] hidden h-px rounded-full bg-hairline md:block"
          />

          <ul className="grid gap-5 md:grid-cols-3">
            {PILLARS.items.map((item, index) => (
              <PillarCard key={item.n} item={item} index={index} />
            ))}
          </ul>

          {/* The line still says the three are distinct; the button is the
              door for anyone who does not need the other three sections to
              prove it. The cards keep their own links for anyone who does. */}
          <div
            data-reveal
            data-reveal-group="pillars-closer"
            className="mx-auto mt-14 flex max-w-2xl flex-col items-center text-center"
          >
            <p className="font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
              {PILLARS.closer.lead}
            </p>

            <div className="mt-7">
              <CtaButton href={PILLARS.closer.cta.href} intent="pillars-primary">
                {PILLARS.closer.cta.label}
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
