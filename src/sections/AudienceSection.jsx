import { useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import Icon from '../components/ui/Icon';
import { AUDIENCE } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

/**
 * 03 — Who this is for.
 *
 * The review flagged this idea as strong but spread across three near-empty
 * viewports. It is collapsed into one screen: a grid of eight real member
 * profiles where selecting one swaps the quote panel, so the visitor
 * self-identifies in a single interaction instead of three scrolls.
 */
export default function AudienceSection() {
  const sectionRef = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = AUDIENCE.people[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="who-its-for"
      aria-labelledby="audience-headline"
      className="section-band bg-paper-sunk"
    >
      <div className="site-shell">
        <SectionHeading
          eyebrow={AUDIENCE.eyebrow}
          align="center"
          headline={
            <span id="audience-headline">
              {AUDIENCE.headline} <span className="headline-mark">{AUDIENCE.headlineMark}</span>
              {AUDIENCE.headlineTail}
            </span>
          }
          lead={AUDIENCE.lead}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-12">
          {/* Person selector */}
          <ul
            className="grid grid-cols-2 gap-2.5 sm:grid-cols-2"
            aria-label="Members using EcomSniper"
          >
            {AUDIENCE.people.map((person, index) => {
              const isActive = index === activeIndex;

              return (
                <li key={person.name} data-reveal data-reveal-group="audience-people">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={isActive}
                    className={`flex w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-[transform,border-color,background-color,box-shadow] duration-300 ease-[var(--ease-out-expo)] ${
                      isActive
                        ? '-translate-y-0.5 border-ink/25 bg-white shadow-lift'
                        : 'border-hairline bg-white/50 hover:-translate-y-0.5 hover:border-ink/15'
                    }`}
                  >
                    {/*
                      An icon for the life, not a coloured initial: it says
                      "delivery driver" or "stay at home parent" at a glance,
                      and ink-on-tint keeps contrast passing for all eight.
                    */}
                    <span
                      aria-hidden="true"
                      className={`grid size-9 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
                        isActive ? 'bg-ebay-blue text-paper' : 'bg-ink/8 text-ink'
                      }`}
                    >
                      <Icon name={person.icon} className="size-4" />
                    </span>

                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{person.name}</span>
                      <span className="block truncate text-xs text-muted">{person.role}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Quote panel — swaps with the selection */}
          <figure
            data-reveal
            data-reveal-group="audience-panel"
            className="rounded-3xl bg-ink p-8 text-paper sm:p-10"
          >
            {/* key forces a remount so the fade replays on every change. */}
            <blockquote key={active.name} className="animate-[quote-in_500ms_var(--ease-out-expo)]">
              <p className="font-display text-2xl leading-snug sm:text-[1.7rem]">
                “{active.quote}”
              </p>
            </blockquote>

            <figcaption className="mt-7 flex items-center gap-3 border-t border-ink-line pt-6">
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-xl bg-paper/10 text-paper"
              >
                <Icon name={active.icon} className="size-[1.15rem]" />
              </span>
              <span>
                <span className="block text-sm font-semibold">{active.name}</span>
                <span className="block text-xs text-muted-dark">{active.role}</span>
              </span>
              <span className="ml-auto micro-label text-muted-dark">
                Real member
              </span>
            </figcaption>
          </figure>
        </div>

        <p
          data-reveal
          data-reveal-group="audience-closer"
          className="mt-12 text-center font-display text-xl font-bold sm:text-2xl"
        >
          {AUDIENCE.closer}
        </p>
      </div>

      <style>{`
        @keyframes quote-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
