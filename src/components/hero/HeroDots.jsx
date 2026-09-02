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
      /* Transparent over the copy, solid towards the edges. Two masks: from
         lg the copy is a left column, so the hole is radial; stacked below lg
         there is no column, so the field is just held back at the top.

         Softened, not cut. A fully transparent top left the part everyone sees
         first completely flat. */
      className="pointer-events-none absolute inset-0 -z-[25] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.55),#000_32%)] lg:[mask-image:radial-gradient(46%_46%_at_26%_40%,transparent_30%,black_82%)]"
    >
      {isRunning && (
        <Suspense fallback={null}>
          <DotField
            dotRadius={1.9}
            dotSpacing={22}
            cursorRadius={200}
            bulgeStrength={26}
            /* No cursor halo: the blue bloom under the pointer read as a
               highlight the page had not earned. */
            glowRadius={0}
            gradientFrom="rgba(30, 31, 35, 0.55)"
            gradientTo="rgba(30, 31, 35, 0.22)"
          />
        </Suspense>
      )}
    </div>
  );
}
