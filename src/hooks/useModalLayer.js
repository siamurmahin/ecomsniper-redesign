import { useEffect } from 'react';
import { getLenis } from '../lib/smoothScroll';

/**
 * Everything a modal layer has to do to the page underneath it: hold the
 * scroll still, close on Escape, take focus, and give focus back.
 *
 * Extracted from `ExitIntentOffer`, which had all of it inline. A second
 * dialog was about to copy it, and this is not logic worth having two of —
 * the scroll lock in particular is a pile of non-obvious decisions that would
 * quietly drift apart:
 *
 * - Stopping Lenis is NOT enough. `lenis.stop()` only ends its own easing and
 *   hands the gesture straight back to the browser, so the page keeps
 *   scrolling natively behind the dialog. The events have to be refused too.
 *
 * - `overflow: hidden` on the body is avoided deliberately. It would make the
 *   element a scroll container, which is the very thing the stylesheet's
 *   `overflow-x: clip` exists to prevent.
 *
 * - The scroll keys are blocked even though focus sits on the dialog. The
 *   dialog does not scroll, so leaving them alone hands them to the page
 *   behind it. Real fields are exempted so typing still works.
 *
 * @param {boolean} isOpen
 * @param {object} options
 * @param {() => void} options.onClose Called on Escape.
 * @param {import('react').RefObject<HTMLElement>} options.dialogRef Focused on open.
 */
export function useModalLayer(isOpen, { onClose, dialogRef }) {
  // Escape to dismiss, and move focus into the dialog when it opens.
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKey);
    dialogRef.current?.focus();

    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose, dialogRef]);

  // Hold the page still behind the dialog.
  useEffect(() => {
    if (!isOpen) return undefined;

    const lenis = getLenis();
    lenis?.stop();

    const block = (event) => event.preventDefault();
    // Keys that scroll: space, page up/down, home/end, arrows.
    const scrollKeys = new Set([' ', 'PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown']);
    const onKeyDown = (event) => {
      if (!scrollKeys.has(event.key)) return;
      const el = event.target;
      if (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)) return;
      event.preventDefault();
    };

    window.addEventListener('wheel', block, { passive: false });
    window.addEventListener('touchmove', block, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', block);
      window.removeEventListener('touchmove', block);
      window.removeEventListener('keydown', onKeyDown);
      lenis?.start();
    };
  }, [isOpen]);
}
