/*
 * Counts a figure up the first time it scrolls into view.
 *
 * Was a vendored React Bits component running on `motion` — 98KB of animation
 * library downloaded and parsed before the page was interactive, to animate
 * four numbers in the proof bar. GSAP is already loaded for everything else
 * here and tweens a number just as well, so `motion` left the critical path.
 *
 * Trimmed to the three props the proof bar actually passes.
 *
 * textContent rather than state: this writes on every frame.
 */
import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/motion';

export default function CountUp({ to, duration = 2, onEnd }) {
  const ref = useRef(null);

  // In a ref so an inline arrow from the caller cannot restart the count.
  const finished = useRef(onEnd);
  finished.current = onEnd;

  useEffect(() => {
    const el = ref.current;
    const places = (String(to).split('.')[1] || '').length;
    const write = (value) => {
      el.textContent = value.toFixed(places);
    };

    write(0);

    // Reduced motion: state the figure, do not count up to it.
    if (prefersReducedMotion()) {
      write(to);
      finished.current?.();
      return undefined;
    }

    const counter = { value: 0 };
    let tween;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      tween = gsap.to(counter, {
        value: to,
        duration,
        ease: 'power2.out',
        onUpdate: () => write(counter.value),
        onComplete: () => finished.current?.(),
      });
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
      tween?.kill();
    };
  }, [to, duration]);

  return <span ref={ref} />;
}
