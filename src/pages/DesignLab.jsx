import { COURSE as EN_COURSE } from '../content/en/course';
import { toneOf } from '../lib/signalTones';
import CtaButton from '../components/ui/CtaButton';
import MarkedHeadline from '../components/ui/MarkedHeadline';
import Icon from '../components/ui/Icon';
import HeroDots from '../components/hero/HeroDots';

/**
 * THROWAWAY. Three directions for About and Dropship Mastery, side by side.
 *
 * Built to be looked at and argued with, not to ship. Same content in all
 * three so the only variable is the treatment: the course hero, and the four
 * steps under it, because those two decide what the page feels like.
 *
 *   A  DARK & LUMINOUS.    Ink pages. The signal colours stop being accents
 *                          on white and become the light source.
 *   B  EDITORIAL & OVERSIZED. Pale ground, no cards. Huge type, asymmetric
 *                          grid, ghosted numerals, content past the edges.
 *   C  LAYERED & DIMENSIONAL. Current palette, real depth: panels lapping
 *                          each other and the band edges, the brand ramp as
 *                          a light source behind the section.
 *
 * Not routed, not prerendered, not in the sitemap. An unrouted module is
 * never bundled, so it costs nothing while it waits — and it is deleted with
 * the losers. Restore the route in `src/routes.js` to look at it again.
 */

const COURSE = EN_COURSE;
const STEPS = COURSE.mechanic.steps;

function Label({ children }) {
  return (
    <div className="site-shell">
      <p className="border-t-4 border-ink pt-4 font-display text-sm font-extrabold tracking-[0.2em] text-ink uppercase">
        {children}
      </p>
    </div>
  );
}

/* ================================================================ A ====== */
/* DARK & LUMINOUS. The page is ink; colour is light rather than decoration.
   Every panel glows from its own tone, the type is paper on near-black, and
   the pale ground survives only as the band between two dark ones. */
function DarkLuminous() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-20 text-paper">
      {/* Two coloured lights behind everything, at low opacity. This is the
          whole idea: the brand palette as illumination. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-32 size-[34rem] rounded-full bg-signal-blue opacity-25 blur-[120px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -bottom-52 size-[38rem] rounded-full bg-signal-green opacity-20 blur-[130px]"
      />

      <div className="site-shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="font-label text-xs tracking-[0.18em] text-signal-gold uppercase">
              {COURSE.eyebrow}
            </p>

            <h2 className="mt-6 text-[length:var(--text-hero)] leading-[0.95] text-paper">
              Learn eBay dropshipping without buying{' '}
              <span className="relative whitespace-nowrap text-signal-green">
                stock
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-signal-green"
                />
              </span>{' '}
              first.
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-dark">{COURSE.lead}</p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <CtaButton href="/pricing">{COURSE.ctas.primary.label}</CtaButton>
              <a
                href="#"
                className="rounded-full border border-ink-line px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-paper/10"
              >
                {COURSE.ctas.secondary.label}
              </a>
            </div>

            <p className="mt-5 text-sm text-muted-dark">
              <span className="font-semibold text-paper">
                {COURSE.price.value} {COURSE.price.suffix}
              </span>{' '}
              — {COURSE.price.thereafter}
            </p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {COURSE.proof.map((item, i) => {
                const t = toneOf(['blue', 'gold', 'green'][i]);
                return (
                  <div key={item.label} className={`border-t-2 pt-4 ${t.edge}`}>
                    <dt className="font-display text-2xl font-extrabold text-paper">
                      {item.value}
                    </dt>
                    <dd className="mt-1 text-sm text-muted-dark">{item.label}</dd>
                  </div>
                );
              })}
            </dl>
          </div>

          {/* The steps as lit tiles. Each one carries its tone as a glow
              behind it rather than a tint inside it. */}
          <ol className="grid gap-4">
            {STEPS.map((step) => {
              const t = toneOf(step.tone);
              return (
                <li key={step.title} className="relative">
                  <span
                    aria-hidden="true"
                    className={`absolute -inset-px rounded-2xl ${t.rule} opacity-30 blur-md`}
                  />
                  <div className="relative flex items-center gap-4 rounded-2xl border border-ink-line bg-ink-soft/90 p-5">
                    <span
                      className={`grid size-11 shrink-0 place-items-center rounded-xl ${t.tile}`}
                    >
                      <Icon name={step.icon} className="size-5" />
                    </span>
                    <span>
                      <span className={`micro-label block ${t.onInk}`}>{step.kicker}</span>
                      <span className="mt-1 block font-display font-extrabold text-paper">
                        {step.title}
                      </span>
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ================================================================ B ====== */
/* EDITORIAL & OVERSIZED. No cards at all. The grid is asymmetric, the type is
   the largest thing on the page, and each step is numbered by a ghosted
   numeral sitting behind its own text rather than inside a box. */
function EditorialOversized() {
  return (
    <section className="bg-paper py-20">
      <div className="site-shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <p className="font-label text-xs tracking-[0.18em] text-muted uppercase lg:col-span-3">
            {COURSE.eyebrow}
          </p>

          <div className="lg:col-span-9">
            <h2 className="text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[0.92] font-extrabold tracking-[-0.02em] text-ink">
              Learn eBay
              <br />
              dropshipping without
              <br />
              buying <em className="font-serif italic">stock</em> first.
            </h2>

            <div className="mt-10 grid gap-10 border-t border-ink pt-8 sm:grid-cols-[1.4fr_1fr]">
              <p className="max-w-[52ch] text-lg leading-relaxed text-muted">{COURSE.lead}</p>

              <div>
                <p className="font-display text-4xl font-extrabold text-ink tabular-nums">
                  {COURSE.price.value}
                </p>
                <p className="mt-1 text-sm text-muted">{COURSE.price.suffix}</p>
                <div className="mt-6">
                  <CtaButton href="/pricing">{COURSE.ctas.primary.label}</CtaButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The steps as a set text list. The numeral is the structure; there
            is no box anywhere. */}
        <ol className="mt-20 grid gap-px bg-hairline">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative overflow-hidden bg-paper py-10">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 right-4 font-display text-[8rem] leading-none font-extrabold text-ink/[0.05] tabular-nums sm:right-16 sm:text-[11rem]"
              >
                {step.n}
              </span>

              <div className="relative grid gap-6 sm:grid-cols-[0.9fr_1.4fr]">
                <h3 className="text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.05] font-extrabold text-ink">
                  {step.title}
                </h3>
                <p className="max-w-[54ch] text-lg leading-relaxed text-muted">{step.body}</p>
              </div>

              {i === STEPS.length - 1 ? null : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ================================================================ C ====== */
/* LAYERED & DIMENSIONAL. The current palette, given depth: the brand ramp as
   a light behind the section, panels overlapping each other and the band
   edge, and cards at three different elevations rather than one. */
function LayeredDimensional() {
  return (
    <section className="brand-ground relative isolate overflow-hidden py-20">
      <HeroDots />

      {/* The brand ramp as a light source rather than a border. */}
      <span
        aria-hidden="true"
        className="brand-fill pointer-events-none absolute -top-32 left-1/2 h-[26rem] w-[80rem] -translate-x-1/2 rounded-full opacity-[0.13] blur-[90px]"
      />

      <div className="site-shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="section-eyebrow">{COURSE.eyebrow}</p>

            <h2 className="mt-5 text-[length:var(--text-hero)] leading-[0.98]">
              <MarkedHeadline parts={COURSE.headlineParts} />
            </h2>

            <p className="mt-6 max-w-xl font-serif text-2xl leading-relaxed italic text-muted">
              {COURSE.lead}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <CtaButton href="/pricing">{COURSE.ctas.primary.label}</CtaButton>
              <CtaButton href="/free-play-book" variant="secondary">
                {COURSE.ctas.secondary.label}
              </CtaButton>
            </div>
          </div>

          {/* Three panels at three elevations, lapping each other. */}
          <div className="relative pb-10">
            <div className="rounded-3xl border border-hairline bg-paper p-6 shadow-float">
              <p className="micro-label text-muted">{STEPS[0].kicker}</p>
              <p className="mt-2 font-display text-lg font-extrabold text-ink">{STEPS[0].title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{STEPS[0].body}</p>
            </div>

            <div className="relative -mt-6 ml-10 rounded-3xl border border-hairline bg-paper p-6 shadow-lift">
              <p className={`micro-label ${toneOf('gold').text}`}>{STEPS[1].kicker}</p>
              <p className="mt-2 font-display text-lg font-extrabold text-ink">{STEPS[1].title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{STEPS[1].body}</p>
            </div>

            <div className="relative -mt-6 mr-6 ml-4 rounded-3xl border border-hairline bg-ink p-6 text-paper shadow-float">
              <p className={`micro-label ${toneOf('green').onInk}`}>{STEPS[3].kicker}</p>
              <p className="mt-2 font-display text-lg font-extrabold text-paper">
                {STEPS[3].title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-dark">{STEPS[3].body}</p>
            </div>
          </div>
        </div>

        {/* A card lapping the band edge below, which is the device this
            direction is really about. */}
        <div className="relative mt-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => {
              const t = toneOf(step.tone);
              return (
                <div
                  key={step.title}
                  className={`relative overflow-hidden rounded-2xl border border-hairline bg-paper p-6 ${
                    i % 2 === 1 ? 'sm:translate-y-6' : ''
                  } ${i === 1 ? 'shadow-lift' : 'shadow-float'}`}
                >
                  <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 ${t.rule}`} />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-10 -bottom-10 size-28 rounded-full bg-gradient-to-br ${t.wash} to-transparent`}
                  />
                  <p className={`font-display text-3xl font-extrabold ${t.text} tabular-nums`}>
                    {step.n}
                  </p>
                  <p className="mt-3 font-display font-extrabold text-ink">{step.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DesignLab() {
  return (
    <div className="pt-32 pb-24">
      <div className="site-shell">
        <h1 className="text-[length:var(--text-section)] leading-tight">
          Three directions, same content.
        </h1>
        <p className="mt-4 max-w-2xl text-lead text-muted">
          The course hero and its four steps, treated three ways. Pick one and it goes on both
          Dropship Mastery and About; the other two are deleted.
        </p>
      </div>

      <div className="mt-16 grid gap-4">
        <Label>A — Dark &amp; luminous</Label>
        <DarkLuminous />

        <Label>B — Editorial &amp; oversized</Label>
        <EditorialOversized />

        <Label>C — Layered &amp; dimensional</Label>
        <LayeredDimensional />
      </div>
    </div>
  );
}
