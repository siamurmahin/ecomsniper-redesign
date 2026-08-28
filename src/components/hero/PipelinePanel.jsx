import { useState } from 'react';
import CtaButton from '../ui/CtaButton';
import Icon from '../ui/Icon';
import { HERO_PANEL } from '../../data/siteContent';
import { prefersReducedMotion } from '../../lib/motion';
import { toneOf } from '../../lib/signalTones';

/** How long one step holds. Short — this is watched out of the corner of an
    eye while the headline is read, not waited on. */
const BEAT_MS = 2100;

/**
 * The hero's right-hand side: one product through the software — found,
 * listed, watched, paid — then the ask.
 *
 * The fifth step ends the run rather than looping it. A demonstration that
 * restarts itself spends the highest-intent moment on a repeat, so autoplay
 * stops there and the offer sits waiting. Replay is offered, not forced.
 *
 * The connectors are the clock: the one out of the active step animates for
 * `BEAT_MS` and its `animationend` advances the step, so the bar cannot drift
 * from the content and pausing it pauses the sequence. Completed connectors
 * stay filled — an earlier rail refilled from zero each beat, which read as
 * progress going backwards.
 *
 * React Bits' `Stepper` was tried first and is the wrong shape (uncontrolled
 * state, a Back/Continue footer for forms, a hardcoded accent), so only its
 * pattern is reused.
 *
 * Nodes are real buttons and a click ends autoplay. Reduced motion renders
 * every step at once as a plain list, which is also the no-JS rendering.
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
      {/* Colour cast in the active step's colour; the brand ramp on the
          offer, the one step that is not a stage of the process. */}
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

        {/* Title bar */}
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
            {/* Stepper rail */}
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
                      {/* Brand ramp on the offer node: the beats are stages,
                          this one is the thing being sold. */}
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

                    {/* Filled for good once passed; the active one is the
                        clock. The last node has none, which ends the run. */}
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

            {/* Steps */}
            <p aria-live="polite" className="sr-only">
              {`Step ${activeIndex + 1} of ${total}: ${activeStep.title}`}
            </p>

            {/* Fixed height so the panel does not resize as steps come
                forward. The steps are absolutely positioned, so padding here
                reserves nothing — the height carries the gap, set from the
                tallest step (the offer, 199px) plus room under its button. */}
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
                    // Outgoing clears in 180ms, incoming takes 420ms: at
                    // equal durations both cards are legible mid-swap, and two
                    // sets of words at once is what reads as broken.
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

        {/* The one fact in the panel that is not an illustration, and the
            answer to the question the headline raises: sell where? */}
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

      {/* The claim reads at body weight; the qualification sits under it at
          small print size but is never further away than the claim itself. */}
      <div className="mt-3.5 text-center lg:text-left">
        <p className="text-[0.92rem] font-semibold leading-snug tracking-tight text-ink">
          {HERO_PANEL.claim}
        </p>
        <p className="mt-1.5 text-[0.7rem] leading-relaxed text-muted">{HERO_PANEL.claimNote}</p>
      </div>
    </div>
  );
}

/**
 * One beat: whose job it is, what it did, and the two numbers behind it. Rows
 * arrive after the card so each value lands as the eye reaches it.
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
 * The last step: what the four beats add up to, and the ask. `onReplay` is
 * null under reduced motion, where every step is already on screen.
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
