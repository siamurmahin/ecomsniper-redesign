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
      /* Transparent over the copy, solid towards the edges and the panel.
         Two masks, because the layout is two different shapes.

         From lg the copy sits in a left column, so the hole is a radial one
         punched over it. Below lg the layout stacks and the copy spans the
         full width — there is no column to cut around, so the field is simply
         held back a little at the top and full strength from a third down.

         Softened, not cut. A first pass made the top 38% fully transparent to
         keep dots off the headline, which meant the top of the hero — the part
         everyone sees first — was flat. At 55% the texture is present behind
         the headline without competing with it; the dots are 1.9px at 22px
         spacing in ink at 0.22–0.55 alpha, so there is not much to compete
         with in the first place. It used to be hidden outright below lg, which
         left the hero flat on exactly the screens that see it most. */
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
