import { useCallback, useEffect, useRef, useState } from 'react';
import CtaButton from '../ui/CtaButton';
import { EXIT_INTENT } from '../../data/siteContent';
import { getLenis } from '../../lib/smoothScroll';

/**
 * Exit-intent capture for the visitors who will not buy today — the page
 * otherwise had one exit, pay now, and 95% of traffic left with no way back.
 *
 * Restrained on purpose: desktop pointer-leave only, once per visitor via
 * localStorage, dismissible with Escape or a click outside.
 */
export default function ExitIntentOffer() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);

  const close = useCallback(() => {
    setIsOpen(false);
    previouslyFocused.current?.focus?.();
  }, []);

  useEffect(() => {
    // Never shown twice, and never on touch devices.
    let alreadySeen = false;
    try {
      alreadySeen = localStorage.getItem(EXIT_INTENT.storageKey) === '1';
    } catch {
      alreadySeen = true; // storage blocked — fail closed rather than nag
    }
    if (alreadySeen || window.matchMedia('(pointer: coarse)').matches) return undefined;

    // Give the visitor a fair chance to read the page first.
    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, 12000);

    // A scroll moves content out from under a still pointer and the browser
    // reports that as a leave, so anything just after a scroll is not an exit.
    let lastScrollAt = 0;
    const onScroll = () => {
      lastScrollAt = performance.now();
    };

    const onPointerLeave = (event) => {
      // Only the top edge counts as leaving; sideways is tab-switching.
      if (!armed || !event.isTrusted || event.clientY > 8) return;
      if (performance.now() - lastScrollAt < 250) return;
      setIsOpen(true);
      previouslyFocused.current = document.activeElement;
      try {
        localStorage.setItem(EXIT_INTENT.storageKey, '1');
      } catch {
        /* storage unavailable — showing once per session is acceptable */
      }
      document.documentElement.removeEventListener('mouseleave', onPointerLeave);
    };

    // `mouseleave` on the root, not `mouseout` on the document: mouseout
    // bubbles from every element crossed and reads as an exit mid-page.
    document.documentElement.addEventListener('mouseleave', onPointerLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(armTimer);
      document.documentElement.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Escape to dismiss, and move focus into the dialog when it opens.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (event) => event.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    dialogRef.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  // Hold the page still behind the dialog. Stopping Lenis is not enough — it
  // only ends its own easing and hands the gesture back to the browser — so
  // the events are refused too. `overflow: hidden` is avoided deliberately: it
  // would make the element a scroll container, which the stylesheet's
  // `overflow-x: clip` exists to prevent.
  useEffect(() => {
    if (!isOpen) return undefined;

    const lenis = getLenis();
    lenis?.stop();

    const block = (event) => event.preventDefault();
    // Keys that scroll: space, page up/down, home/end, arrows.
    const scrollKeys = new Set([' ', 'PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown']);
    const onKeyDown = (event) => {
      if (!scrollKeys.has(event.key)) return;
      // Focus sits on the dialog, which does not scroll, so exempting it
      // would hand these keys to the page behind. Only real fields keep them.
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-ink/50 p-5 backdrop-blur-sm"
      onClick={(event) => event.target === event.currentTarget && close()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        tabIndex={-1}
        className="w-full max-w-lg rounded-3xl border border-hairline bg-paper p-7 shadow-float sm:p-9"
        style={{ animation: 'exit-intent-in 520ms var(--ease-out-expo) both' }}
      >
        <p className="section-eyebrow">{EXIT_INTENT.eyebrow}</p>

        <h2 id="exit-intent-title" className="mt-3 text-[length:var(--text-display)] leading-[1.02]">
          {EXIT_INTENT.title}
        </h2>

        <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{EXIT_INTENT.body}</p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <CtaButton href={EXIT_INTENT.cta.href} intent="exit-intent-playbook" onClick={close}>
            {EXIT_INTENT.cta.label}
          </CtaButton>

          <button
            type="button"
            onClick={close}
            className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-ink"
          >
            {EXIT_INTENT.dismiss}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes exit-intent-in {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
