import { lazy, Suspense } from 'react';
import FeatureTourSection from '../sections/FeatureTourSection';
import CardSwap, { Card } from '../components/reactbits/CardSwap';
import Stepper, { Step } from '../components/reactbits/Stepper';
import FlowingMenu from '../components/reactbits/FlowingMenu';
import PixelCard from '../components/reactbits/PixelCard';
import { FEATURES } from '../data/siteContent';

const MagicBento = lazy(() => import('../components/reactbits/MagicBento'));

/**
 * Not part of the site. A scratch route for comparing directions for ONE
 * section side by side, on the real tokens and the real copy, so the choice is
 * made against what it will actually look like rather than a mockup.
 *
 * The section under test is the feature tour — homepage section 07, "The
 * software does the heavy lifting", the four steps. It carries the most
 * content of any section, so a shape that survives here survives anywhere.
 *
 * Delete this file and its route in `App.jsx` once a direction is picked.
 */

const OPTIONS = [
  { n: 1, id: 'opt-1', name: 'Now live — the card stack' },
  { n: 2, id: 'opt-2', name: 'Bento grid, dark band' },
  { n: 3, id: 'opt-3', name: 'Rotating card stack' },
  { n: 4, id: 'opt-4', name: 'Stepper, one step at a time' },
  { n: 5, id: 'opt-5', name: 'Flowing menu rows' },
  { n: 6, id: 'opt-6', name: 'Pixel cards' },
];

/** Frame around each option, with the trade-offs stated plainly. */
function Option({ n, id, name, verdict, tone = 'paper', children }) {
  return (
    <section id={id} className={tone === 'ink' ? 'bg-ink py-14 text-paper' : 'bg-paper py-14'}>
      <div className="site-shell">
        <div
          className={`mb-8 border-b pb-4 ${tone === 'ink' ? 'border-ink-line' : 'border-hairline'}`}
        >
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-label text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Option {n}
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">{name}</h2>
          </div>
          <p className={`mt-2 max-w-3xl text-sm ${tone === 'ink' ? 'text-muted-dark' : 'text-muted'}`}>
            {verdict}
          </p>
        </div>
      </div>
      {children}
    </section>
  );
}

export default function DesignLabPage() {
  // The same four features every option renders, mapped to each one's shape.
  const bentoCards = FEATURES.items.map((item) => ({
    color: '#12131a',
    title: item.title,
    description: item.body,
    label: item.metric,
  }));

  const menuItems = FEATURES.items.map((item) => ({
    link: '#opt-5',
    text: item.title,
    image: '',
  }));

  return (
    <>
      <header className="border-b border-hairline bg-paper-sunk pb-10 pt-32">
        <div className="site-shell">
          <p className="section-eyebrow">Internal — not linked from the site</p>

          <h1 className="mt-4 text-[length:var(--text-display)] leading-[1.02]">
            Homepage section 07 — the feature tour.
          </h1>

          <p className="mt-5 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-muted">
            <strong className="font-semibold text-ink">
              Every option below is the same section:
            </strong>{' '}
            “The software does the heavy lifting”, and its four steps — find
            products, list in one click, it watches your store, orders finish in
            one click. Same words every time. Only the shape changes.
          </p>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            It is the test section because it holds more content than any other,
            so whatever works here will work on the shorter sections too. Pick a
            number and I will apply that direction across the rest of the page.
          </p>

          <nav aria-label="Jump to an option" className="mt-8 flex flex-wrap gap-2">
            {OPTIONS.map((o) => (
              <a
                key={o.id}
                href={`#${o.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-hairline bg-paper px-4 py-2 text-sm font-medium transition-colors hover:border-accent/40 hover:bg-accent-wash"
              >
                <span className="font-label text-xs font-semibold text-accent">{o.n}</span>
                {o.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <Option
        n={1}
        id="opt-1"
        name="Now live on the homepage — the card stack"
        verdict="Option 3, adopted and built for real: keyboard controls, a live region, and a plain-list fallback under reduced motion. The previous tabbed version is kept at _backup/FeatureTourSection.tabs.jsx."
      >
        <FeatureTourSection />
      </Option>

      <Option
        n={2}
        id="opt-2"
        name="Bento grid, dark band"
        verdict="React Bits MagicBento. Spotlight follows the pointer, cards tilt and pull toward it, particles on hover. Loudest option. Two known issues: the grid is built for six cards and there are four, so it sits lopsided; and the particles are still hardcoded purple in the CSS — the blue only reached the glow. Both fixable."
        tone="ink"
      >
        <div className="site-shell">
          <Suspense fallback={<p className="text-muted-dark">Loading…</p>}>
            <MagicBento
              cards={bentoCards}
              glowColor="0, 100, 210"
              particleCount={8}
              spotlightRadius={280}
              enableTilt
              enableStars
              enableSpotlight
              enableBorderGlow
              enableMagnetism
              textAutoHide={false}
            />
          </Suspense>
        </div>
      </Option>

      <Option
        n={3}
        id="opt-3"
        name="Rotating card stack"
        verdict="React Bits CardSwap. Copy stays left, the four steps cycle through a 3D stack on the right, pausing on hover. Keeps the top-to-bottom reading order the funnel depends on."
      >
        <div className="site-shell">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="section-eyebrow">{FEATURES.eyebrow}</p>
              <h3 className="mt-4 text-[length:var(--text-section)] leading-[1.02]">
                {FEATURES.headline}
              </h3>
              <p className="mt-5 text-[length:var(--text-lead)] leading-relaxed text-muted">
                {FEATURES.lead}
              </p>
              <p className="mt-8 font-display text-lg font-bold">{FEATURES.closer}</p>
            </div>

            {/* The stack is absolutely positioned by the component, so it needs
                a sized box of its own to sit in. */}
            <div className="relative h-[26rem]">
              <CardSwap
                width={440}
                height={310}
                cardDistance={52}
                verticalDistance={62}
                delay={3600}
                pauseOnHover
              >
                {FEATURES.items.map((item) => (
                  <Card
                    key={item.n}
                    className="rounded-3xl border border-ink-line bg-ink p-8 text-paper"
                  >
                    <span className="font-label text-xs font-semibold tracking-[0.18em] text-accent-soft">
                      Step {item.n}
                    </span>
                    <h4 className="mt-4 text-2xl font-extrabold tracking-tight">{item.title}</h4>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-dark">
                      {item.body}
                    </p>
                    <p className="mt-6 text-sm font-semibold text-accent-soft">{item.metric}</p>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>
        </div>
      </Option>

      <Option
        n={4}
        id="opt-4"
        name="Stepper, one step at a time"
        verdict="React Bits Stepper. The four steps become a walkthrough with numbered indicators and Back / Continue. The most literal match to the content — it is genuinely four steps — but it hides three quarters of the section behind clicks, which costs a scanner."
      >
        <div className="site-shell">
          <div className="mx-auto max-w-2xl">
            <p className="section-eyebrow">{FEATURES.eyebrow}</p>
            <h3 className="mt-4 text-[length:var(--text-section)] leading-[1.02]">
              {FEATURES.headline}
            </h3>

            <div className="mt-8">
              <Stepper initialStep={1} backButtonText="Back" nextButtonText="Next step">
                {FEATURES.items.map((item) => (
                  <Step key={item.n}>
                    <h4 className="text-xl font-extrabold tracking-tight">{item.title}</h4>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{item.body}</p>
                    <p className="mt-5 text-sm font-semibold text-accent">{item.metric}</p>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
        </div>
      </Option>

      <Option
        n={5}
        id="opt-5"
        name="Flowing menu rows"
        verdict="React Bits FlowingMenu. Four full-width rows; hovering one sweeps a marquee of the step title across it. Editorial and confident, but it is built to reveal an image on hover and there are no per-step images yet, so it is showing text only."
        tone="ink"
      >
        <div className="site-shell">
          <p className="section-eyebrow section-eyebrow-on-ink">{FEATURES.eyebrow}</p>
          <h3 className="mt-4 text-[length:var(--text-section)] leading-[1.02]">
            {FEATURES.headline}
          </h3>

          <div className="mt-8 h-[24rem]">
            <FlowingMenu
              items={menuItems}
              textColor="#fbfbfa"
              bgColor="#1e1f23"
              marqueeBgColor="#0064d2"
              marqueeTextColor="#fbfbfa"
              borderColor="#3a3d44"
            />
          </div>
        </div>
      </Option>

      <Option
        n={6}
        id="opt-6"
        name="Pixel cards"
        verdict="React Bits PixelCard. The current four-card idea kept, but each card dissolves a field of pixels in on hover. Closest to what is there now — a texture change rather than a structural one."
      >
        <div className="site-shell">
          <p className="section-eyebrow">{FEATURES.eyebrow}</p>
          <h3 className="mt-4 text-[length:var(--text-section)] leading-[1.02]">
            {FEATURES.headline}
          </h3>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.items.map((item) => (
              <PixelCard
                key={item.n}
                variant="blue"
                className="!h-auto !w-auto rounded-3xl border border-hairline bg-white/60"
              >
                <div className="absolute inset-0 flex flex-col p-7">
                  <span className="font-label text-xs font-semibold tracking-[0.18em] text-accent">
                    Step {item.n}
                  </span>
                  <h4 className="mt-4 text-lg font-extrabold tracking-tight">{item.title}</h4>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-muted">
                    {item.body}
                  </p>
                  <p className="mt-4 text-xs font-semibold text-accent">{item.metric}</p>
                </div>
              </PixelCard>
            ))}
          </div>
        </div>
      </Option>

      <section className="bg-paper-sunk py-14">
        <div className="site-shell max-w-2xl">
          <p className="section-eyebrow">Two more, once the screenshots exist</p>
          <h2 className="mt-4 text-[length:var(--text-section)] leading-[1.02]">
            ChromaGrid and AccordionGallery need images.
          </h2>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">
            Both are image-led: ChromaGrid is a grid of picture tiles that light
            up under the pointer, AccordionGallery a row of panels that expand.
            They are the best-looking options in the library for this section,
            and both are blocked on the four dashboard screenshots. Nothing is
            faked here with stock imagery — send the captures and I will wire
            them up as options 7 and 8.
          </p>
        </div>
      </section>
    </>
  );
}
