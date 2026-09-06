import { toneOf } from '../../lib/signalTones';
import Icon from '../ui/Icon';

/**
 * The hero panel: the whole model as four nodes with a current running through
 * them.
 *
 * The page was built without a hero visual and read as a wall of white cards —
 * every other page on this site opens on something, and the one page whose job
 * is to sell had the least to look at. This is what it opens on now.
 *
 * **Ink, not paper.** The hero stands on `brand-ground`, which is pale, and
 * every band below it is paper or paper-sunk. A dark panel is the one place on
 * the page where the signal colours reach full strength instead of sitting as
 * a tint on white, and it gives the first screen a figure rather than a page
 * of text with buttons.
 *
 * **The device is section 06's, deliberately.** `system-wire` and its current
 * were written for the pillars, to say that three separate cards are one
 * system. The claim here is the same shape — four steps are one loop that pays
 * you — so it reuses the wire, the current and the node halo rather than
 * inventing a second way to draw the same idea. Nothing new lands in the
 * stylesheet.
 *
 * The four nodes carry two or three words each. The section below expands them
 * into the actual explanation, which is the right order: the picture says
 * *there is a loop*, the prose says what each turn of it involves.
 */
export default function CourseFlow({ steps, caption }) {
  return (
    <figure className="relative overflow-hidden rounded-3xl border border-ink-line bg-ink p-7 shadow-float sm:p-9">
      {/* The floor: the brand ramp at low strength, so the panel is not a flat
          black rectangle. */}
      <span
        aria-hidden="true"
        className="brand-fill pointer-events-none absolute inset-0 opacity-[0.07]"
      />

      <div className="relative">
        <ol className="grid gap-5 sm:grid-cols-2">
          {steps.map((step, index) => {
            const tone = toneOf(step.tone);

            return (
              <li key={step.title} className="relative">
                <div className="flex items-start gap-4 rounded-2xl border border-ink-line bg-ink-soft p-5">
                  <span className="relative shrink-0">
                    {/* The halo pulses as the current reaches the node. */}
                    <span
                      aria-hidden="true"
                      className={`system-node-halo absolute -inset-1.5 rounded-full ${tone.rule} opacity-35`}
                      style={{ animationDelay: `${index * 0.5}s` }}
                    />
                    <span
                      aria-hidden="true"
                      className={`relative grid size-10 place-items-center rounded-full ${tone.tile}`}
                    >
                      <Icon name={step.icon} className="size-4" />
                    </span>
                  </span>

                  <span className="min-w-0">
                    <span className={`micro-label block ${tone.onInk}`}>{step.kicker}</span>
                    <span className="mt-1 block font-display text-base leading-snug font-extrabold text-paper">
                      {step.title}
                    </span>
                  </span>
                </div>

                {/* The wire out of every node but the last. Horizontal between
                    the two columns, and the vertical run is left to the gap:
                    a second keyframe for the down-leg would be new CSS to
                    draw a line nobody reads as motion. */}
                {index % 2 === 0 && index < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="system-wire top-1/2 -right-5 hidden h-px w-5 bg-ink-line sm:block"
                  />
                ) : null}
              </li>
            );
          })}
        </ol>

        <figcaption className="mt-6 border-t border-ink-line pt-5 text-sm leading-relaxed text-muted-dark">
          {caption}
        </figcaption>
      </div>
    </figure>
  );
}
