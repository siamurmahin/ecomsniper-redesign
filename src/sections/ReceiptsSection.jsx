import { useCallback, useRef, useState } from 'react';
import CtaButton from '../components/ui/CtaButton';
import Icon from '../components/ui/Icon';
import SectionHeading from '../components/ui/SectionHeading';
import { PROOF } from '../data/siteContent';
import { useModalLayer } from '../hooks/useModalLayer';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { toneOf } from '../lib/signalTones';
import { receiptUrl } from '../lib/proofMedia';

/**
 * 04c — The receipts.
 *
 * Three cards, and the screenshot opens properly when you click one.
 *
 * The card can only ever be a thumbnail: an eBay sales dashboard set into a
 * 256px window is a picture OF evidence rather than evidence you can read. The
 * figure on the plate carries the claim in the row, and the click is there for
 * the reader who wants to check it — which is the whole point of calling them
 * receipts.
 *
 * In the lightbox the screenshot is `object-contain`, not `object-cover`. The
 * card crops on purpose so the row stays even; cropping it a second time in
 * the one place it is meant to be legible would defeat the click.
 */

/** One signal tone each, the way every other enumerated set here is coloured. */
const TONES = ['blue', 'gold', 'green'];

export default function ReceiptsSection() {
  const sectionRef = useRevealOnScroll();
  const { receiptsSection } = PROOF;

  const [openIndex, setOpenIndex] = useState(null);
  const dialogRef = useRef(null);
  /* The card that opened the lightbox, so focus goes back where it came from
     rather than to the top of the document. */
  const openerRef = useRef(null);

  const close = useCallback(() => {
    setOpenIndex(null);
    openerRef.current?.focus?.();
  }, []);

  const open = (index, event) => {
    openerRef.current = event.currentTarget;
    setOpenIndex(index);
  };

  /* Wraps, so the arrows never dead-end on three items. */
  const step = useCallback((direction) => {
    setOpenIndex((current) => {
      if (current === null) return current;
      const count = PROOF.receipts.length;
      return (current + direction + count) % count;
    });
  }, []);

  useModalLayer(openIndex !== null, { onClose: close, dialogRef });

  const active = openIndex === null ? null : PROOF.receipts[openIndex];
  const activeTone = openIndex === null ? null : toneOf(TONES[openIndex % TONES.length]);

  return (
    <section
      ref={sectionRef}
      id="receipts"
      aria-labelledby="receipts-headline"
      className="section-band relative bg-paper-sunk"
    >
      <div className="site-shell">
        <SectionHeading
          eyebrow={receiptsSection.eyebrow}
          align="center"
          headline={<span id="receipts-headline">{receiptsSection.headline}</span>}
          lead={receiptsSection.lead}
        />

        {/* Bottom padding on the list, not the cards: the plates hang past the
            bottom of each card and would otherwise be clipped by the grid. */}
        <ul className="mt-14 grid gap-8 pb-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {PROOF.receipts.map((receipt, index) => {
            const tone = toneOf(TONES[index % TONES.length]);

            return (
              <li
                key={receipt.key}
                data-reveal
                data-reveal-group="receipts"
                /* The middle card sits lower on wide screens. Three identical
                   cards in a straight line is a table; the step makes it a
                   composition, and it only applies where there are three
                   across to step. */
                className={`group relative ${index === 1 ? 'lg:mt-12' : ''}`}
              >
                {/* One button around the whole card, so the target is the card
                    and not a link buried in it. Everything inside is a span:
                    a button takes phrasing content only, and divs inside one
                    are invalid — that already bit this repo once. */}
                <button
                  type="button"
                  onClick={(event) => open(index, event)}
                  aria-haspopup="dialog"
                  className="block w-full text-left"
                >
                  <span className="relative block overflow-hidden rounded-[1.5rem] border border-hairline bg-white shadow-lift transition-[transform,box-shadow] duration-400 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 group-hover:shadow-float">
                    <span aria-hidden="true" className={`block h-1.5 w-full ${tone.rule}`} />

                    {/* Fixed window: the screenshots have different aspect
                        ratios, and letterboxing them wastes the whole row. Top
                        aligned because a sales dashboard puts its total at the
                        top. */}
                    <span className="block h-64 overflow-hidden bg-paper-sunk">
                      <img
                        src={receiptUrl(receipt.key)}
                        alt={receipt.detail}
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                      />
                    </span>

                    {/* Says what the click does. A cropped screenshot gives no
                        hint that there is a bigger one behind it. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-1.5 grid h-64 place-items-center bg-ink/45 opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      <span className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-sm font-semibold text-ink shadow-float">
                        <Icon name="magnifier" className="size-4" />
                        See the full screenshot
                      </span>
                    </span>
                  </span>

                  {/* The plate overlaps the screenshot rather than sitting
                      under it, so the figure and its evidence read as one
                      object. */}
                  <span className="relative -mt-8 mx-4 block rounded-2xl border border-hairline bg-paper p-5 shadow-lift">
                    <span className={`micro-label block ${tone.text}`}>Posted by a member</span>
                    <span className="mt-2 block font-display text-xl font-extrabold leading-tight tracking-tight">
                      {receipt.caption}
                    </span>
                    <span className="mt-1.5 block text-[0.85rem] leading-relaxed text-muted">
                      {receipt.detail}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* The qualification sits with the figures it qualifies, in plain
            sight, not in a footnote nobody reaches. */}
        <p
          data-reveal
          data-reveal-group="receipts-disclaimer"
          className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-muted"
        >
          {PROOF.disclaimer}
        </p>

        {/* The door. Four sections of evidence have run by this point, and
            someone the figures have already convinced should not have to
            scroll past four more to act on it. */}
        <div
          data-reveal
          data-reveal-group="receipts-closer"
          className="mt-14 flex flex-col items-center"
        >
          <CtaButton href={receiptsSection.closer.cta.href} intent="receipts-primary">
            {receiptsSection.closer.cta.label}
          </CtaButton>

          {/* "on the monthly plan" is not optional — see the note in
              `siteContent`. The bundle and Enterprise plans are final sale. */}
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted">
            <Icon name="shield" className="size-4 shrink-0 text-signal-green-deep" />
            {receiptsSection.closer.guarantee}
          </p>

          {/* Hands over to what the money actually buys. A question rather
              than a heading, because it is the reader's question at this
              point and the sections after it are the answer. */}
          <p className="mt-14 text-center text-[length:var(--text-section)] leading-[0.98]">
            {receiptsSection.closer.question}
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------- lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-ink/70 p-4 backdrop-blur-sm sm:p-8"
          onClick={(event) => event.target === event.currentTarget && close()}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="receipt-dialog-title"
            tabIndex={-1}
            /* max-w-3xl, not 5xl. The screenshots are only ~615px wide
               natively and upscaling one makes the numbers soft, so a wider
               dialog just floats the image in empty paper. */
            className="flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-hairline bg-paper shadow-float focus-visible:outline-none"
            style={{ animation: 'exit-intent-in 420ms var(--ease-out-expo) both' }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-hairline p-5 sm:p-6">
              <div>
                <p className={`micro-label ${activeTone.text}`}>Posted by a member</p>
                <h3
                  id="receipt-dialog-title"
                  className="mt-2 font-display text-2xl font-extrabold leading-tight tracking-tight"
                >
                  {active.figure}{' '}
                  <span className="font-bold text-muted">{active.figureLabel}</span>
                </h3>
              </div>

              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="grid size-10 shrink-0 place-items-center rounded-full border border-hairline bg-white text-ink transition-colors duration-300 hover:bg-paper-sunk"
              >
                <Icon name="close" className="size-4" />
              </button>
            </div>

            {/* `object-contain`, not `cover`. This is the one place the
                screenshot is meant to be readable in full. */}
            <div className="min-h-0 flex-1 overflow-auto bg-paper-sunk p-4 sm:p-6">
              <img
                key={active.key}
                src={receiptUrl(active.key)}
                alt={active.detail}
                className="mx-auto max-h-[60vh] w-auto max-w-full rounded-xl border border-hairline bg-white object-contain shadow-lift"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline p-5 sm:p-6">
              <p className="max-w-xl text-[0.85rem] leading-relaxed text-muted">{active.detail}</p>

              <div className="flex items-center gap-2">
                <span className="mr-1 text-xs tabular-nums text-muted">
                  {openIndex + 1} / {PROOF.receipts.length}
                </span>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous receipt"
                  className="grid size-10 place-items-center rounded-full border border-hairline bg-white text-ink transition-colors duration-300 hover:bg-paper-sunk"
                >
                  <Icon name="arrowRight" className="size-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next receipt"
                  className="grid size-10 place-items-center rounded-full border border-hairline bg-white text-ink transition-colors duration-300 hover:bg-paper-sunk"
                >
                  <Icon name="arrowRight" className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
