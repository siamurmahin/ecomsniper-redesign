import { useRef } from 'react';
import CtaButton from '../ui/CtaButton';
import Icon from '../ui/Icon';
import { PLAYBOOK, SITE } from '../../data/siteContent';
import { useModalLayer } from '../../hooks/useModalLayer';
import playbookCover from '../../assets/brand/playbook-cover.webp';

/**
 * What a visitor gets once the address is in: the file, and one offer.
 *
 * A dialog, not a panel replacing the form — the page behind it is spent. The
 * download is a real file, not a promise of an email: someone who just typed
 * their address has earned it, and it works whether or not the mail lands.
 *
 * Closing leaves for the homepage; see closeDone on the page.
 *
 * @param {object} props
 * @param {() => void} props.onClose Runs on Escape, the backdrop and both close controls.
 */
export default function PlaybookDelivered({ onClose }) {
  const dialogRef = useRef(null);

  useModalLayer(true, { onClose, dialogRef });

  return (
    <div
      className="fixed inset-0 z-[60] grid items-start justify-center overflow-y-auto bg-ink/60 p-4 backdrop-blur-sm sm:items-center sm:p-5"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="playbook-delivered-title"
        tabIndex={-1}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-ink text-paper shadow-float"
        style={{ animation: 'consult-in 520ms var(--ease-out-expo) both' }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] bg-[image:var(--gradient-brand)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-signal-green/25 blur-3xl"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-ink-line text-muted-dark transition-colors duration-200 hover:border-paper/40 hover:text-paper"
        >
          <Icon name="close" className="size-3" aria-hidden="true" />
        </button>

        <div className="relative grid gap-5 p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8 sm:p-9">
          <img
            src={playbookCover}
            alt=""
            aria-hidden="true"
            width={855}
            height={1370}
            className="h-28 w-auto -rotate-3 drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] sm:h-40"
          />

          <div>
            <span
              aria-hidden="true"
              className="grid size-10 place-items-center rounded-full bg-signal-green text-ink"
            >
              <Icon name="check" className="size-5" />
            </span>

            <h2
              id="playbook-delivered-title"
              className="mt-4 font-display text-2xl font-extrabold tracking-tight"
            >
              {PLAYBOOK.done.title}
            </h2>

            <p className="mt-2.5 text-[0.85rem] leading-relaxed text-muted-dark sm:mt-3 sm:text-[0.9rem]">
              {PLAYBOOK.done.body}
            </p>

            <a
              href={PLAYBOOK.file.href}
              download={PLAYBOOK.file.name}
              data-cta-intent="playbook-download"
              className="btn-on-ink mt-5 w-full"
            >
              <Icon name="openBook" className="size-4 shrink-0" aria-hidden="true" />
              {PLAYBOOK.done.downloadCta}
            </a>

            <p className="mt-2.5 text-xs text-muted-dark">
              PDF · {PLAYBOOK.file.pages} pages · {PLAYBOOK.file.size}
            </p>
          </div>
        </div>

        {/* The offer, ruled off. It is the only place on this site that asks
            for money from somebody who has just been given something free, so
            it reads as the next step and carries the guarantee. */}
        <div className="relative border-t border-paper/12 p-5 sm:p-9 sm:pt-7">
          <p className="font-display text-lg font-bold leading-snug">
            {PLAYBOOK.done.upsell.title}
          </p>

          <p className="mt-2 max-w-xl text-[0.85rem] leading-relaxed text-muted-dark sm:text-[0.9rem]">
            {PLAYBOOK.done.upsell.body}
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CtaButton
              href={SITE.startCta.href}
              variant="onInk"
              intent="playbook-signup"
              className="w-full sm:w-auto"
            >
              Start for $97
            </CtaButton>

            <button
              type="button"
              onClick={onClose}
              className="text-sm text-muted-dark underline underline-offset-4 transition-colors duration-200 hover:text-paper"
            >
              Not now, take me back
            </button>
          </div>

          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-signal-green-soft">
            <Icon name="shield" className="mt-px size-3.5 shrink-0" aria-hidden="true" />
            {SITE.guarantee}.
          </p>
        </div>
      </div>
    </div>
  );
}
