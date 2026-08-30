import { useCallback, useEffect, useRef } from 'react';
import Icon from '../../components/ui/Icon';
import SectionHeading from '../../components/ui/SectionHeading';
import { FEATURES } from '../../data/siteContent';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import { prefersReducedMotion } from '../../lib/motion';
import { toneOf } from '../../lib/signalTones';
import { StepBody, StepNumber } from './parts';

/**
 * Option 3 — the bento, as the live site builds it.
 *
 * Four white tiles of mixed width in a two-row bento: wide, narrow / narrow,
 * wide. Measured off ecomsniper.io, its tiles are 24px radius on a hairline at
 * 10% ink, and the tool names are dashed accent pills inside each one.
 *
 * No scroll choreography at all. The life comes from the pointer — the same
 * tilt built for the pillars in section 06, so the two sections feel like one
 * hand rather than two.
 *
 * The mixed widths are the whole trick. Four equal tiles are a grid and the eye
 * treats them as a list to get through; uneven ones are a composition and the
 * eye reads them.
 */

const MAX_TILT = 5;

/** Wide, narrow / narrow, wide. Index 0 and 3 take the long slot. */
const SPAN = ['lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3'];

function BentoTile({ item, index }) {
  const tone = toneOf(item.tone);
  const cardRef = useRef(null);
  const frameRef = useRef(0);

  const setTilt = useCallback((rx, ry) => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--tile-rx', `${rx}deg`);
    card.style.setProperty('--tile-ry', `${ry}deg`);
  }, []);

  const onPointerMove = useCallback(
    (event) => {
      if (event.pointerType === 'touch') return;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      // One write per frame; pointermove fires faster than the screen refreshes.
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
      data-reveal-group="bento"
      className={`h-full [perspective:1200px] ${SPAN[index]}`}
      onPointerMove={isStatic ? undefined : onPointerMove}
      onPointerLeave={isStatic ? undefined : onPointerLeave}
    >
      <article
        ref={cardRef}
        style={{ '--tile-rx': '0deg', '--tile-ry': '0deg' }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-white p-7 shadow-lift transition-[box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] [transform:rotateX(var(--tile-rx))_rotateY(var(--tile-ry))] [transform-style:preserve-3d] hover:shadow-float motion-reduce:[transform:none] sm:p-9"
      >
        <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-[3px] ${tone.rule}`} />

        {/* Furthest back, so it lags as the tile turns. */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -right-20 -top-20 size-52 rounded-full bg-gradient-to-br to-transparent blur-2xl [transform:translateZ(-30px)] ${tone.wash}`}
        />

        <div className="relative flex gap-5 [transform:translateZ(30px)]">
          <StepNumber item={item} size="lg" />
          <div className="min-w-0 flex-1">
            <StepBody item={item} />
          </div>
        </div>
      </article>
    </li>
  );
}

export default function BentoGridVariant() {
  const sectionRef = useRevealOnScroll();

  return (
    <section ref={sectionRef} id="how-it-works" className="section-band bg-paper-sunk">
      <div className="site-shell">
        <SectionHeading
          align="center"
          eyebrow={FEATURES.eyebrow}
          headline={FEATURES.headline}
          lead={FEATURES.lead}
        />

        <ul className="mt-14 grid gap-5 lg:grid-cols-5">
          {FEATURES.items.map((item, index) => (
            <BentoTile key={item.n} item={item} index={index} />
          ))}
        </ul>

        <p className="mt-14 flex items-center justify-center gap-2 text-center font-display text-xl font-extrabold tracking-tight">
          <Icon name="checkCircle" className="size-5 shrink-0 text-signal-green-deep" />
          {FEATURES.closer}
        </p>
      </div>
    </section>
  );
}
