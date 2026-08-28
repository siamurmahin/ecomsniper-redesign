import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../lib/motion';

const SoftAurora = lazy(() => import('../reactbits/SoftAurora'));

/**
 * The hero's looping background.
 *
 * A shader aurora in the two ends of the brand ramp, drifting on its own
 * clock. Three deliberate constraints, all of them about the last background
 * this hero had:
 *
 * - **It does not follow the pointer.** `enableMouseInteraction` is off. The
 *   dot field this replaces reacted to the cursor, which meant it moved under
 *   the headline exactly while the headline was being read.
 * - **It is masked away from the type.** The mask holds the field to the top
 *   and outer edges, so the copy column sits on plain paper and nothing is
 *   ever read against moving colour.
 * - **It only runs while it is on screen.** WebGL keeps a `requestAnimationFrame`
 *   loop alive as long as it is mounted, so an `IntersectionObserver` unmounts
 *   the canvas once the hero is scrolled past. A background nobody is looking
 *   at should not be costing a frame budget.
 *
 * Under reduced motion, or before the browser is idle, nothing mounts at all —
 * the static wash underneath is the whole background, and the hero looks
 * finished without it.
 */
export default function HeroAurora() {
  const hostRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isStatic] = useState(() => prefersReducedMotion());

  useEffect(() => {
    const host = hostRef.current;
    if (!host || isStatic) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsRunning(entry.isIntersecting),
      { rootMargin: '120px' },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [isStatic]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      /*
        The mask is weighted to the panel side rather than centred: it keeps
        the field off the copy column entirely, so no line of type is ever read
        against drifting colour, and it puts the light where the window is.
      */
      className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[42rem] opacity-[0.75] [mask-image:radial-gradient(85%_70%_at_82%_2%,black_8%,transparent_68%)]"
    >
      {isRunning && (
        <Suspense fallback={null}>
          <SoftAurora
            color1="#d0212a"
            color2="#0064d2"
            speed={0.28}
            scale={1.1}
            brightness={1.25}
            bandHeight={0.62}
            bandSpread={1.25}
            noiseFrequency={2.1}
            colorSpeed={0.5}
            enableMouseInteraction={false}
          />
        </Suspense>
      )}
    </div>
  );
}
