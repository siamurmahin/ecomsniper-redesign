import { useCallback, useEffect, useRef, useState } from 'react';
import CtaButton from '../ui/CtaButton';
import Icon from '../ui/Icon';
import { useContent } from '../../hooks/useContent';
import playbookCover from '../../assets/brand/playbook-cover.webp';
import { useModalLayer } from '../../hooks/useModalLayer';
import {
  hasSeen,
  isDialogOpen,
  mark,
  outcomeOf,
  setDialogOpen,
  OUTCOME,
} from '../../lib/interruptions';
import { isPreviewing } from '../../lib/dialogPreview';

/**
 * Exit-intent capture for the visitors who will not buy today — the page
 * otherwise had one exit, pay now, and 95% of traffic left with no way back.
 *
 * Restrained on purpose: desktop pointer-leave only, dismissible with Escape
 * or a click outside, and it shares one interruption per visitor with the
 * consultation dialog — see lib/interruptions.
 */
export default function ExitIntentOffer() {
  const { CONSULT, EXIT_INTENT, PLAYBOOK } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);

  const close = useCallback(() => {
    setIsOpen(false);
    setDialogOpen(false);
    previouslyFocused.current?.focus?.();
  }, []);

  useEffect(() => {
    /* Never twice, never on touch, and never to someone who already gave the
       consultation dialog their details — they said yes, and a popup on the
       way out is a poor reward for it. Someone who dismissed that offer is
       still fair game for a smaller one. */
    // See lib/dialogPreview: development only, dropped from the build.
    if (isPreviewing('exit')) {
      setDialogOpen(true);
      setIsOpen(true);
      return undefined;
    }

    if (hasSeen(EXIT_INTENT.storageKey)) return undefined;
    if (outcomeOf(CONSULT.storageKey) === OUTCOME.converted) return undefined;
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
      /* Both re-checked at the moment of firing: the consultation dialog may
         be open, or may have been submitted, since this effect armed. */
      if (isDialogOpen()) return;
      if (outcomeOf(CONSULT.storageKey) === OUTCOME.converted) return;
      setIsOpen(true);
      setDialogOpen(true);
      previouslyFocused.current = document.activeElement;
      mark(EXIT_INTENT.storageKey, OUTCOME.dismissed);
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
      className="fixed inset-0 z-[60] grid items-start justify-center overflow-y-auto bg-ink/60 p-4 backdrop-blur-sm sm:items-center sm:p-5"
      onClick={(event) => event.target === event.currentTarget && close()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        tabIndex={-1}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-ink text-paper shadow-float"
        style={{ animation: 'exit-intent-in 520ms var(--ease-out-expo) both' }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] bg-[image:var(--gradient-brand)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-accent/25 blur-3xl"
        />

        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-ink-line text-muted-dark transition-colors duration-200 hover:border-paper/40 hover:text-paper"
        >
          <Icon name="close" className="size-3" aria-hidden="true" />
        </button>

        {/* The book itself, not a description of it. This offer is a specific
            object and the cover says in one glance what three lines of copy
            were being asked to carry. */}
        <div className="relative grid gap-6 p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8 sm:p-9">
          <img
            src={playbookCover}
            alt=""
            aria-hidden="true"
            width={855}
            height={1370}
            className="mx-auto w-24 drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] sm:w-32"
          />

          <div className="text-center sm:text-left">
            <p className="section-eyebrow section-eyebrow-on-ink justify-center sm:justify-start">
              {EXIT_INTENT.eyebrow}
            </p>

            <h2
              id="exit-intent-title"
              className="mt-3 font-display text-2xl font-extrabold leading-[1.1] sm:text-3xl"
            >
              {EXIT_INTENT.title}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-dark">{EXIT_INTENT.body}</p>

            {/* The playbook page's own reassurances, so the two descriptions of
                one thing cannot drift apart. */}
            <ul className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 sm:justify-start">
              {PLAYBOOK.reassurances.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-xs text-muted-dark">
                  <Icon name="check" className="size-3 shrink-0 text-signal-green-soft" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:items-center">
              <CtaButton
                href={EXIT_INTENT.cta.href}
                variant="onInk"
                intent="exit-intent-playbook"
                onClick={close}
                className="w-full sm:w-auto"
              >
                {EXIT_INTENT.cta.label}
              </CtaButton>

              <button
                type="button"
                onClick={close}
                className="text-xs text-muted-dark underline underline-offset-4 transition-colors duration-200 hover:text-paper"
              >
                {EXIT_INTENT.dismiss}
              </button>
            </div>
          </div>
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
