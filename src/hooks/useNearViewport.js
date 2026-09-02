import { useEffect, useState } from 'react';

/**
 * True once the element is within a screen of the viewport.
 *
 * For work a section only owes once it can be reached — the second copy of a
 * marquee, say. A screen, in percent rather than pixels, so a phone gets a
 * phone's warning and a desktop a desktop's; the evidence wall starts 1,310px
 * below a 940px fold, which a fixed 1,500px would have counted as "here".
 *
 * It never goes back to false. Something built because it was approached does
 * not want taking apart again when it is scrolled past.
 *
 * @param {import('react').RefObject<Element>} ref the element to watch
 * @param {string} [rootMargin]
 * @returns {boolean}
 */
export function useNearViewport(ref, rootMargin = '100% 0px') {
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isNear) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setIsNear(true);
      },
      { rootMargin },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [ref, rootMargin, isNear]);

  return isNear;
}
