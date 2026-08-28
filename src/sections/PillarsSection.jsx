import SectionHeading from '../components/ui/SectionHeading';
import Icon from '../components/ui/Icon';
import SpotlightCard from '../components/reactbits/SpotlightCard';
import { PILLARS } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { toneOf } from '../lib/signalTones';

/**
 * 06 — Three things, one system.
 *
 * Compressed to a single screen per the review: three cards side by side, each
 * one an anchor into the section that expands it. This is the page's table of
 * contents, so it should be scannable in about four seconds.
 */
export default function PillarsSection() {
  const sectionRef = useRevealOnScroll();

  return (
    <section ref={sectionRef} aria-labelledby="pillars-headline" className="section-band">
      <div className="site-shell">
        <SectionHeading
          eyebrow={PILLARS.eyebrow}
          align="center"
          headline={<span id="pillars-headline">{PILLARS.headline}</span>}
          lead={PILLARS.lead}
        />

        {/*
          Each card carries its pillar's colour from the signal set, the way
          the live site does it: filled icon tile, dashed number chip, and an
          edge rule that draws itself along the bottom on hover. Three cards
          in three colours also stop the row reading as one repeated block.
        */}
        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {PILLARS.items.map((item) => {
            const tone = toneOf(item.tone);

            return (
              <li key={item.n} data-reveal data-reveal-group="pillars" className="h-full">
                <SpotlightCard className="h-full rounded-3xl" spotlightColor={tone.spotlight}>
                  <a
                    href={item.anchor}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-white/60 p-7 transition-[transform,border-color,box-shadow] duration-400 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-ink/25 hover:shadow-float sm:p-8"
                  >
                    {/* Corner wash in the pillar's colour: a tint, not a fill. */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-gradient-to-br to-transparent blur-2xl ${tone.wash}`}
                    />

                    <span className="relative flex items-center justify-between">
                      <span
                        className={`grid size-11 place-items-center rounded-xl transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 ${tone.tile}`}
                      >
                        <Icon name={item.icon} className="size-5" />
                      </span>

                      {/* Dashed chip, straight from the live cards. */}
                      <span
                        className={`grid size-9 place-items-center rounded-full border border-dashed font-label text-[0.68rem] font-semibold tracking-[0.08em] ${tone.ring} ${tone.text}`}
                      >
                        {item.n}
                      </span>
                    </span>

                    <h3 className="relative mt-6 text-xl font-extrabold tracking-tight sm:text-2xl">
                      {item.title}
                    </h3>

                    <p className="relative mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                      {item.body}
                    </p>

                    <span className={`relative mt-7 inline-flex items-center gap-1.5 text-sm font-semibold ${tone.text}`}>
                      See how
                      <Icon
                        name="arrowRight"
                        className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>

                    {/* Edge rule: 0 → full width on hover, keyboard included. */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none ${tone.rule}`}
                    />
                  </a>
                </SpotlightCard>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
