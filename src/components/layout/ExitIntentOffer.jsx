import { useCallback, useEffect, useRef, useState } from 'react';
import CtaButton from '../ui/CtaButton';
import { EXIT_INTENT } from '../../data/siteContent';
import { useModalLayer } from '../../hooks/useModalLayer';
import { alreadyInterrupted, claimInterruption } from '../../lib/interruptions';

/**
 * Exit-intent capture for the visitors who will not buy today — the page
 * otherwise had one exit, pay now, and 95% of traffic left with no way back.
 *
 * Restrained on purpose: desktop pointer-leave only, dismissible with Escape
 * or a click outside, and it shares one interruption per visitor with the
 * consultation dialog — see lib/interruptions.
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
    // Never twice, never on touch, and never to someone already stopped once.
    if (alreadyInterrupted(EXIT_INTENT.storageKey)) return undefined;
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;

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
      claimInterruption(EXIT_INTENT.storageKey);
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

  /* Escape, focus and the scroll lock behind the dialog. All of it moved to
     `useModalLayer` when the receipts lightbox became a second dialog — the
     scroll lock in particular is a pile of non-obvious decisions that should
     not exist in two places. Behaviour here is unchanged. */
  useModalLayer(isOpen, { onClose: close, dialogRef });

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
