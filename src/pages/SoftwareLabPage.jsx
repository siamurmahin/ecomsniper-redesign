import { useEffect, useRef, useState } from 'react';
import FeatureTourSection from '../sections/FeatureTourSection';
import StickyStepperVariant from '../sections/software-lab/StickyStepperVariant';
import ScrollStackVariant from '../sections/software-lab/ScrollStackVariant';
import BentoGridVariant from '../sections/software-lab/BentoGridVariant';
import DeckToBentoVariant from '../sections/software-lab/DeckToBentoVariant';
import { ScrollTrigger } from '../lib/motion';

/**
 * Not part of the site. A scratch route for choosing the shape of section 07,
 * "The software does the heavy lifting".
 *
 * One option at a time rather than five stacked: these are full sections and
 * two of them pin, so a column of all five would mean scrolling past option 2
 * to re-check option 1 — a memory test, not a comparison. The switcher keeps
 * every option in the same place on screen.
 *
 * Option 0 is what ships today, so the comparison is always against the real
 * thing rather than against a description of it.
 *
 * The height readout matters as much as the sections. Two of these options buy
 * their effect with scroll distance and the others do not, and that difference
 * should be a number on screen while the choice is being made rather than a
 * surprise afterwards.
 *
 * Delete this file, `src/sections/software-lab/` and the route in `App.jsx`
 * once a direction is picked.
 */

const OPTIONS = [
  {
    key: 'current',
    n: '0',
    name: 'Now live — the card stack',
    verdict:
      'What ships today: the rotating card stack chosen in the earlier design lab. Here for comparison.',
    Render: FeatureTourSection,
  },
  {
    key: 'stepper',
    n: '1',
    name: 'Sticky stepper',
    verdict:
      'Steps scroll on the left against a spine that fills as you pass each one; a sticky panel on the right swaps to the step you are level with. No pin, so it costs exactly its own height. The active step is chosen by an IntersectionObserver banded across the middle of the screen — where a reader actually looks — rather than by arithmetic on every scroll event.',
    Render: StickyStepperVariant,
  },
  {
    key: 'stack',
    n: '2',
    name: 'Scroll stack',
    verdict:
      'The four steps as a deck: scrolling pushes the front card away and lifts the next into place. This is the device the live site uses on its own system section. It pins, so it ADDS scroll rather than saving it — about a screen per card. Watch the height readout against option 1.',
    Render: ScrollStackVariant,
  },
  {
    key: 'bento',
    n: '3',
    name: 'Bento grid — the live site',
    verdict:
      'What ecomsniper.io actually does: four white tiles of mixed width, wide/narrow over narrow/wide, with the tool names as dashed accent pills. No scroll choreography; the life is in the pointer tilt, the same one built for the pillars. The uneven widths are the trick — four equal tiles read as a list to get through.',
    Render: BentoGridVariant,
  },
  {
    key: 'deck',
    n: '4',
    name: 'Deck that unpacks into the bento',
    verdict:
      'Arrives stacked and fans out into the bento as the section comes up the screen, then stays put. The stack moment without the pin. Animated with FLIP — the grid lays the tiles out, then they animate FROM a stacked position INTO where CSS already put them, so nothing is hard-coded to a breakpoint. Plays once.',
    Render: DeckToBentoVariant,
  },
];

export default function SoftwareLabPage() {
  const [activeKey, setActiveKey] = useState(OPTIONS[0].key);
  const [height, setHeight] = useState(null);
  const stageRef = useRef(null);

  const active = OPTIONS.find((option) => option.key === activeKey) ?? OPTIONS[0];

  /* Measured off the rendered DOM, never guessed. A ResizeObserver rather than
     one read after paint because these settle late: fonts swap, and a pinned
     option only reports its true scroll cost once ScrollTrigger has built its
     spacer. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const observer = new ResizeObserver(([entry]) => setHeight(Math.round(entry.contentRect.height)));
    observer.observe(stage);

    // Each option registers its own triggers, and two of them pin. Without a
    // refresh after the swap the outgoing option's measurements are what the
    // incoming one scrolls against.
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [activeKey]);

  return (
    <>
      <header className="border-b border-hairline bg-paper-sunk pb-10 pt-32">
        <div className="site-shell">
          <p className="section-eyebrow">Internal — not linked from the site</p>

          <h1 className="mt-4 text-[length:var(--text-display)] leading-[1.02]">
            Homepage section 07 — the software.
          </h1>

          <p className="mt-5 max-w-3xl text-[length:var(--text-lead)] leading-relaxed text-muted">
            Five shapes for the same four steps. Same copy, same tones, same tool pills in every
            one — only the arrangement and the motion change.
          </p>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
            Two things worth knowing while you choose. A pinned stack (option 2) is{' '}
            <strong className="font-semibold text-ink">longer</strong> than the section it
            replaces, not shorter — the pin holds the screen still for the whole run, so watch the
            height readout. And the tool pills link to{' '}
            <strong className="font-semibold text-ink">the live site&rsquo;s feature pages</strong>,
            which do not exist here yet.
          </p>
        </div>
      </header>

      <div className="sticky top-[4.5rem] z-40 border-b border-hairline bg-paper/85 backdrop-blur-md">
        <div className="site-shell flex flex-wrap items-center gap-x-2 gap-y-2 py-3">
          {OPTIONS.map((option) => {
            const isActive = option.key === activeKey;

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setActiveKey(option.key)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                  isActive
                    ? 'bg-ink text-paper'
                    : 'border border-hairline bg-white text-muted hover:text-ink'
                }`}
              >
                <span
                  className={`font-label text-[0.7rem] ${isActive ? 'text-paper/60' : 'text-accent'}`}
                >
                  {option.n}
                </span>
                {option.name}
              </button>
            );
          })}

          <p className="ml-auto flex items-center gap-2 text-xs text-muted">
            <span className="micro-label">Measured height</span>
            <span className="font-display text-base font-extrabold tabular-nums text-ink">
              {height === null ? '—' : `${height.toLocaleString()}px`}
            </span>
          </p>
        </div>
      </div>

      <div className="border-b border-hairline bg-white">
        <div className="site-shell py-5">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-label text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Option {active.n}
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">{active.name}</h2>
          </div>
          <p className="mt-2 max-w-4xl text-sm leading-relaxed text-muted">{active.verdict}</p>
        </div>
      </div>

      {/* `key` so switching unmounts the old option outright. A pinned
          ScrollTrigger that is merely re-rendered leaves its pin spacer behind
          and the next option inherits it. */}
      <div key={activeKey} ref={stageRef}>
        <active.Render />
      </div>

      <div className="border-t border-hairline bg-paper-sunk py-14">
        <div className="site-shell">
          <p className="text-sm text-muted">
            Switch options above — the height readout updates as each one renders. Compare every
            option against 0.
          </p>
        </div>
      </div>
    </>
  );
}
