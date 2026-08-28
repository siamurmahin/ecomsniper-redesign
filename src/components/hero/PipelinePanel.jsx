import { useState } from 'react';
import CtaButton from '../ui/CtaButton';
import Icon from '../ui/Icon';
import { HERO_PANEL } from '../../data/siteContent';
import { prefersReducedMotion } from '../../lib/motion';
import { toneOf } from '../../lib/signalTones';

/**
 * How long one beat holds. Short: this is a loop a visitor watches out of the
 * corner of their eye while reading the headline, not a slideshow they are
 * waiting on. The four beats run in under nine seconds.
 */
const BEAT_MS = 2100;

/**
 * The hero's right-hand side: one product moving through the software, and
 * then the ask.
 *
 * Four beats — found, listed, watched, paid — on one product, in the order
 * they happen, followed by a fifth node that **ends the run instead of looping
 * it**. That last node is the whole reason this component is shaped the way it
 * is: a visitor who has just watched a product go from found to paid is at the
 * highest-intent moment the page will get, and the old behaviour was to
 * silently restart at step 1 and spend that moment on a repeat. The run now
 * finishes, autoplay stops, and the offer is sitting there. Replay is offered,
 * never forced.
 *
 * **The rail is a stepper, and the connectors are the clock.**
 *
 * React Bits' `Stepper` was tried here first and is the wrong shape for this
 * job: it owns its own step state with no controlled prop, ships a
 * Back/Continue footer meant for a form, hardcodes a purple accent, and
 * spring-animates its height on every change. Driving it from an autoplay
 * clock would mean synthesising clicks on its internal buttons. What it gets
 * right is the *pattern* — numbered nodes, connectors that fill as you
 * advance, a check once a step is behind you — so that is what is rebuilt
 * here, in brand colour, driven by our own clock.
 *
 * The connector out of the active step animates for exactly `BEAT_MS`, and its
 * `animationend` advances the step. Two things follow from that:
 *
 * - **Progress accumulates instead of resetting.** An earlier rail refilled a
 *   fresh segment from zero every beat, so a step change read as progress
 *   going backwards. Completed connectors stay filled — the line grows across
 *   the panel once, beat one to the offer.
 * - **The bar cannot drift from the content.** No `setInterval` racing a
 *   separate CSS animation; one clock, and pausing it pauses the sequence.
 *
 * Other rules it keeps:
 *
 * - **It is labelled as an illustration.** No fabricated dashboard, no numbers
 *   presented as a live account. The caption says so in words.
 * - **The nodes are controls.** Real buttons; clicking one stops the autoplay,
 *   because a panel that keeps moving after a deliberate choice is fighting
 *   the visitor.
 * - **Reduced motion gets every step at once**, as a plain list with the offer
 *   at the end — which is also what renders if the JS never runs.
 * - **The step is announced** through a polite live region.
 */
export default function PipelinePanel() {
  const { beats, finale } = HERO_PANEL;
  // The offer is the last step, not an afterword bolted to the side of one.
  const steps = [...beats, { ...finale, isFinale: true }];
  const total = steps.length;
  const lastIndex = total - 1;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  // Direction of travel, so a step always leaves the way the strip is moving.
  const [direction, setDirection] = useState(1);
  // Read on the first render: a flag set later would arrive after the entrance
  // timeline has already resolved its targets.
  const [isStatic] = useState(() => prefersReducedMotion());

  const goTo = (index) => {
    setDirection(index >= activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  const replay = () => {
    setDirection(1);
    setActiveIndex(0);
    setIsAutoPlaying(true);
  };

  const activeStep = steps[activeIndex];
  const activeTone = activeStep.isFinale ? null : toneOf(activeStep.tone);

  return (
    <div className="relative">
      {/*
        Colour cast behind the window, in the active step's colour — and the
        brand wash on the offer, which is the one step that is not a stage of
        the process.
      */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br to-transparent opacity-60 blur-3xl transition-colors duration-[1200ms] ${
          activeTone ? activeTone.wash : 'from-brand-red/12'
        }`}
      />

      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
        className="overflow-hidden rounded-[1.75rem] border border-ink-line bg-ink text-paper shadow-float"
      >
        {/* Top edge in the active step's colour, so the window itself tracks
            the step and the eye does not have to hunt for what changed. */}
        <div
          aria-hidden="true"
          className={`h-1 w-full transition-colors duration-500 ${
            activeTone ? activeTone.rule : 'brand-fill'
          }`}
        />

        {/* ---------------------------------------------------------------- */}
        {/* Title bar                                                         */}
        {/* ---------------------------------------------------------------- */}
        <div className="flex items-center gap-3 border-b border-ink-line px-5 py-3.5">
          <span aria-hidden="true" className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-signal-red/70" />
            <span className="size-2.5 rounded-full bg-signal-gold/70" />
            <span className="size-2.5 rounded-full bg-signal-green/70" />
          </span>

          <p className="micro-label text-muted-dark">{HERO_PANEL.windowLabel}</p>

          <p className="micro-label ml-auto flex items-center gap-2 text-signal-green-soft">
            <span aria-hidden="true" className="relative grid size-2 place-items-center">
              <span className="absolute size-2 rounded-full bg-signal-green-soft/60 motion-safe:animate-ping" />
              <span className="size-2 rounded-full bg-signal-green-soft" />
            </span>
            {HERO_PANEL.statusLabel}
          </p>
        </div>

        {isStatic ? (
          <>
            <ul className="flex flex-col divide-y divide-ink-line">
              {beats.map((beat, index) => (
                <li key={beat.chip} className="flex gap-4 px-5 py-5">
                  <span
                    className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full font-label text-xs font-bold ${
                      toneOf(beat.tone).tile
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Beat beat={beat} isActive={false} />
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-ink-line px-5 py-5">
              <Finale finale={finale} onReplay={null} />
            </div>
          </>
        ) : (
          <>
            {/* -------------------------------------------------------------- */}
            {/* Stepper rail                                                    */}
            {/* -------------------------------------------------------------- */}
            <div className="flex items-center px-5 py-5">
              {steps.map((step, index) => {
                const tone = step.isFinale ? null : toneOf(step.tone);
                const isActive = index === activeIndex;
                const isDone = index < activeIndex;
                const isLast = index === lastIndex;

                return (
                  <div key={step.chip} className="flex flex-1 items-center last:flex-none">
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      aria-label={`${step.chip}: ${step.title}`}
                      aria-current={isActive}
                      className="shrink-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-paper/60"
                    >
                      {/*
                        The offer node wears the brand ramp rather than a
                        signal colour: the four beats are stages of a process,
                        this one is the thing being sold, and the ramp is
                        already the site's mark for that.
                      */}
                      <span
                        className={`grid size-8 place-items-center rounded-full border font-label text-xs font-bold transition-[background-color,border-color,color,transform] duration-500 ease-[var(--ease-out-expo)] ${
                          isActive
                            ? `${step.isFinale ? 'brand-fill text-paper' : tone.tile} scale-110 border-transparent`
                            : isDone
                              ? `border-transparent opacity-85 ${step.isFinale ? 'brand-fill text-paper' : tone.tile}`
                              : `bg-ink-soft text-muted-dark hover:border-paper/40 ${
                                  step.isFinale ? 'border-dashed border-paper/35' : 'border-ink-line'
                                }`
                        }`}
                      >
                        {step.isFinale ? (
                          <Icon name="salesGrowth" className="size-3.5" />
                        ) : isDone ? (
                          <Icon name="check" className="size-3.5" />
                        ) : (
                          index + 1
                        )}
                      </span>
                    </button>

                    {/*
                      The connector out of this node. Filled for good once the
                      step is behind us; the active one is the clock. The last
                      node has nothing after it — that is what ends the run.
                    */}
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded-full bg-paper/12"
                      >
                        <span
                          key={isActive ? `run-${activeIndex}` : `state-${index}`}
                          onAnimationEnd={() => {
                            if (isActive && isAutoPlaying) {
                              setDirection(1);
                              setActiveIndex(index + 1);
                            }
                          }}
                          style={isActive ? { animationDuration: `${BEAT_MS}ms` } : undefined}
                          className={`absolute inset-y-0 left-0 w-full origin-left rounded-full transition-transform duration-500 ${
                            step.isFinale ? 'brand-fill' : tone.rule
                          } ${
                            isDone
                              ? 'scale-x-100'
                              : isActive
                                ? `${isAutoPlaying ? 'animate-beat-fill' : 'scale-x-100'} ${
                                    isPaused ? '[animation-play-state:paused]' : ''
                                  }`
                                : 'scale-x-0'
                          }`}
                        />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* -------------------------------------------------------------- */}
            {/* Steps                                                           */}
            {/* -------------------------------------------------------------- */}
            <p aria-live="polite" className="sr-only">
              {`Step ${activeIndex + 1} of ${total}: ${activeStep.title}`}
            </p>

            {/*
              Fixed height, so the panel does not resize as steps of different
              lengths come forward — a hero that changes height while it is
              being read pushes everything under it around.

              The steps are absolutely positioned, so `pb-*` on this box
              reserves nothing: the height itself has to carry the gap. It is
              set from the tallest step — the offer, at 199px on a desktop
              width — plus room to breathe under its button, and the wider base
              value covers the extra lines that copy takes when the panel is
              the width of a phone.
            */}
            <div className="relative h-[16.5rem] px-5 sm:h-[14rem]">
              {steps.map((step, index) => {
                const isActive = index === activeIndex;
                // Leaving steps exit the way the strip is travelling, and
                // arriving ones come from the opposite edge, so the panel reads
                // as one strip being pulled past a window.
                const leaveClass = direction > 0 ? '-translate-x-6' : 'translate-x-6';
                const enterClass = direction > 0 ? 'translate-x-6' : '-translate-x-6';

                return (
                  <div
                    key={step.chip}
                    aria-hidden={!isActive}
                    /*
                     * The outgoing step clears in 180ms while the incoming one
                     * takes 420ms. Equal durations leave both cards legible at
                     * once through the middle of the swap, and two sets of
                     * words on top of each other is the part that reads as
                     * broken rather than as motion.
                     */
                    className={`absolute inset-x-5 top-0 ease-[var(--ease-out-expo)] ${
                      isActive
                        ? 'translate-x-0 opacity-100 transition-[opacity,transform] duration-[420ms]'
                        : `pointer-events-none opacity-0 transition-[opacity,transform] duration-[180ms] ${
                            index < activeIndex ? leaveClass : enterClass
                          }`
                    }`}
                  >
                    {step.isFinale ? (
                      <Finale finale={step} onReplay={replay} />
                    ) : (
                      <Beat beat={step} isActive={isActive} />
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/*
          Where the loop actually runs. Two marketplaces, stated plainly — the
          one fact in the panel that is not an illustration, and the answer to
          the question the headline raises: sell where, exactly?
        */}
        <div className="flex items-center justify-between gap-4 border-t border-ink-line bg-ink-soft/60 px-5 py-3.5">
          <p className="micro-label text-muted-dark">Runs on</p>

          <ul className="flex items-center gap-4">
            <li className="flex items-center gap-2 text-sm font-semibold">
              <Icon name="ebay" className="h-4 w-auto" />
              eBay
            </li>
            <li aria-hidden="true" className="h-4 w-px bg-ink-line" />
            <li className="flex items-center gap-2 text-sm font-semibold">
              <Icon name="amazon" className="h-4 w-auto" />
              Amazon
            </li>
          </ul>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-muted lg:text-left">{HERO_PANEL.caption}</p>
    </div>
  );
}

/**
 * One beat: whose job it is, what it did, and the two numbers behind it.
 *
 * The rows animate in after the card, a beat apart, so a value lands *as* the
 * eye reaches it. Without that the whole card arrives at once and the numbers
 * — the part worth reading — get no moment of their own.
 */
function Beat({ beat, isActive = true }) {
  const tone = toneOf(beat.tone);

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className={`micro-label ${tone.onInk}`}>{beat.chip}</span>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full border border-dashed px-2.5 py-1 font-label text-[0.62rem] font-semibold uppercase tracking-[0.12em] ${tone.ring} ${tone.onInk}`}
        >
          <Icon name="check" className="size-2.5" />
          {beat.status}
        </span>
      </div>

      <p className="mt-3 text-lg font-extrabold leading-snug tracking-tight sm:text-xl">
        {beat.title}
      </p>

      <dl className="mt-4 divide-y divide-ink-line overflow-hidden rounded-xl border border-ink-line bg-ink-soft">
        {beat.rows.map((row, index) => (
          <div
            key={row.label}
            style={isActive ? { animationDelay: `${140 + index * 110}ms` } : undefined}
            className={`flex items-baseline justify-between gap-4 px-3.5 py-2.5 ${
              isActive ? 'motion-safe:animate-row-in' : ''
            }`}
          >
            <dt className="text-[0.8rem] text-muted-dark">{row.label}</dt>
            <dd className="font-label text-sm font-semibold tabular-nums">{row.value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

/**
 * The last step: what the four beats add up to, and the ask.
 *
 * `onReplay` is null in the reduced-motion rendering, where every step is
 * already on screen and there is nothing to replay.
 */
function Finale({ finale, onReplay }) {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="micro-label text-signal-gold-soft">{finale.chip}</span>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-paper/30 px-2.5 py-1 font-label text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-paper/80">
          <Icon name="check" className="size-2.5" />
          On repeat
        </span>
      </div>

      <p className="mt-3 text-lg font-extrabold leading-snug tracking-tight sm:text-xl">
        {finale.title}
      </p>

      <p className="mt-2 text-[0.85rem] leading-relaxed text-muted-dark">{finale.body}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <CtaButton
          href={finale.cta.href}
          intent="hero-panel-finale"
          className="!px-5 !py-2.5 text-[0.82rem]"
        >
          {finale.cta.label}
        </CtaButton>

        {onReplay && (
          <button
            type="button"
            onClick={onReplay}
            className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-muted-dark underline-offset-4 transition-colors duration-300 hover:text-paper hover:underline"
          >
            <Icon name="play" className="size-3" />
            {finale.replay}
          </button>
        )}
      </div>
    </>
  );
}
