import { Suspense, lazy, useEffect, useRef, useState } from 'react';

const DotField = lazy(() => import('../reactbits/DotField'));

/**
 * Dot texture across the hero band.
 *
 * The version of this that was removed earlier reacted to the pointer across
 * the whole hero, which meant the field moved under the headline while the
 * headline was being read. The fix is the mask, not the interaction: dots are
 * cut out of the copy column entirely, so the cursor can only ever disturb
 * them out where there is nothing to read.
 *
 * Ink at low alpha rather than a colour — the aurora above it is the hero's
 * colour, and this is only texture under it. Unmounted once the hero scrolls
 * past, since the canvas holds a rAF loop for as long as it is mounted.
 */
export default function HeroDots() {
  const hostRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const observer = new IntersectionObserver(([entry]) => setIsRunning(entry.isIntersecting), {
      rootMargin: '120px',
    });

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      /* Transparent over the copy, solid towards the edges and the panel. Only
         from lg up: below that the layout stacks and the copy spans the full
         width, so there is nowhere the field can sit without being behind
         text. */
      className="pointer-events-none absolute inset-0 -z-[25] hidden lg:block [mask-image:radial-gradient(62%_58%_at_24%_42%,transparent_38%,black_88%)]"
    >
      {isRunning && (
        <Suspense fallback={null}>
          <DotField
            dotRadius={1.5}
            dotSpacing={26}
            cursorRadius={200}
            bulgeStrength={26}
            glowRadius={150}
            gradientFrom="rgba(30, 31, 35, 0.28)"
            gradientTo="rgba(30, 31, 35, 0.10)"
            glowColor="#0064d2"
          />
        </Suspense>
      )}
    </div>
  );
}
