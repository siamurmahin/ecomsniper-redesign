import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../lib/motion';

const SoftAurora = lazy(() => import('../reactbits/SoftAurora'));

/**
 * The hero's looping background: a shader aurora in the two ends of the brand
 * ramp, on its own clock. Three constraints, all about the field it replaces:
 * it does not follow the pointer (that one moved under the headline while the
 * headline was being read), it is masked off the copy column so no type is
 * read against moving colour, and an `IntersectionObserver` unmounts it once
 * the hero scrolls past — WebGL holds a rAF loop for as long as it is mounted.
 *
 * Under reduced motion nothing mounts, and the static wash underneath is the
 * whole background.
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
      /* Weighted to the panel side, not centred: keeps the field off the
         copy column and puts the light where the window is. */
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
