import { useEffect, useMemo, useRef } from 'react';
import './TextType.css';

/**
 * Types a word out, deletes it, types the next one.
 *
 * The version this replaces held the typed string in React state and called
 * `setDisplayedText` once per character, so every ~70ms the component
 * re-rendered and the browser re-laid-out the headline it sits inside. It
 * loops, so that never stopped: measured at 6x CPU, a 60ms task every few
 * seconds for as long as the page was open, on a page nobody was touching.
 *
 * A character is one text node write. It goes through a ref now, and nothing
 * re-renders — the same pattern section 08's conversation uses, for the same
 * reason. One timer is in flight at a time.
 *
 * The first word is rendered, not typed into an empty box, so the headline
 * reads as a whole sentence before any JavaScript runs and in the HTML a
 * crawler is given. The sequence clears it and types it back when it starts,
 * which is what it looked like before.
 *
 * It also stops when the hero leaves the screen. The visitor cannot see it,
 * and a laptop should not be animating text nobody is looking at.
 *
 * Trimmed to what this site passes. The original carried a cursor element,
 * per-sentence colours, variable speed, a reverse mode and a completion
 * callback; the one call site uses none of them, and the cursor here is drawn
 * by `.headline-type::after` in the stylesheet.
 *
 * @param {object} props
 * @param {string|string[]} props.text Word, or words to rotate through.
 * @param {string} [props.as] Element to render.
 * @param {number} [props.typingSpeed] ms per character typed.
 * @param {number} [props.deletingSpeed] ms per character deleted.
 * @param {number} [props.pauseDuration] ms a finished word is held.
 * @param {number} [props.initialDelay] ms before the first word is typed.
 * @param {boolean} [props.loop] Start again after the last word.
 */
export default function TextType({
  text,
  as: Component = 'span',
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseDuration = 2000,
  initialDelay = 0,
  loop = true,
  className = '',
  ...rest
}) {
  const ref = useRef(null);
  const words = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !words.length) return undefined;

    let timer = 0;
    let stopped = false;
    let wordIndex = 0;
    let typed = 0;

    const write = () => {
      node.textContent = words[wordIndex].slice(0, typed);
    };

    const at = (delay, next) => {
      if (stopped) return;
      timer = setTimeout(next, delay);
    };

    const type = () => {
      const word = words[wordIndex];
      if (typed < word.length) {
        typed += 1;
        write();
        at(typingSpeed, type);
        return;
      }

      // The last word of a run that does not loop simply stays.
      if (!loop && wordIndex === words.length - 1) return;
      at(pauseDuration, erase);
    };

    const erase = () => {
      if (typed > 0) {
        typed -= 1;
        write();
        at(deletingSpeed, erase);
        return;
      }

      wordIndex = (wordIndex + 1) % words.length;
      type();
    };

    /* The rendered word is cleared here rather than in the markup, so a
       visitor without JavaScript keeps it. */
    const start = () => {
      typed = 0;
      write();
      type();
    };

    let hasRun = false;
    let running = false;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (running) return;
        running = true;

        // The opening delay belongs to the page's arrival, not to a scroll back.
        if (hasRun) start();
        else {
          hasRun = true;
          at(initialDelay, start);
        }
        return;
      }

      /* Off screen: stop, and leave a whole word behind. Stopping where it
         stood would park "COMM" in the headline — invisible now, but it is
         what a visitor scrolling back sees for the instant before the
         observer fires, and what a screenshot of the page would catch. */
      running = false;
      clearTimeout(timer);
      typed = words[wordIndex].length;
      write();
    });

    observer.observe(node);

    return () => {
      stopped = true;
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [words, typingSpeed, deletingSpeed, pauseDuration, initialDelay, loop]);

  return (
    <Component ref={ref} className={`text-type ${className}`} {...rest}>
      {words[0]}
    </Component>
  );
}
