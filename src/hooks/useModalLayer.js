import { useEffect } from 'react';
import { getLenis } from '../lib/smoothScroll';

/**
 * What a modal has to do to the page underneath: hold the scroll, close on
 * Escape, take focus and give it back. Shared, because two dialogs need it.
 *
 * Three non-obvious bits: lenis.stop() alone is not enough, since it hands the
 * gesture back to the browser; overflow:hidden on the body is avoided because
 * it makes the element a scroll container; and the scroll keys are blocked,
 * with real fields exempted so typing still works.
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
