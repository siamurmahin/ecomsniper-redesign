import { lazy, Suspense } from 'react';
import DeferUntilPainted from '../components/layout/DeferUntilPainted';
import HeroSection from '../sections/HeroSection';
import ProofBarSection from '../sections/ProofBarSection';
import { useContent } from '../hooks/useContent';

/* The rest of the page is a chunk of its own, asked for only once the hero
   has finished. Statically imported, its thirteen sections had to be parsed
   and executed before React could paint the first screen. See
   `HomeBelowFold`. */
const HomeBelowFold = lazy(() => import('./HomeBelowFold'));

/**
 * Homepage funnel, in the order a cold visitor needs it.
 *
 *  01 Hero .............. what this is, who for, what it costs
 *  02 Proof bar ......... checkable numbers, immediately
 *  03 Who it's for ...... self-identification
 *  04 Proof wall ........ the volume of it, and the door
 *  04b Interviews ....... members, in their own words
 *  04c Receipts ......... screenshots members posted
 *  04d Testimonials ..... written reviews
 *  06 Three pillars ..... the page's table of contents
 *  07 Feature tour ...... what the software does
 *  08 Community ......... the real differentiator
 *  09 Step by step ...... the four steps, then the course that teaches them
 *  10 Founders .......... who is behind it
 *  11 Comparison ........ the decision they are already making
 *  12 Comparison close .. price and guarantee, then out to /pricing
 *  13 FAQ ............... last objections, answered in place
 *  14 Guarantee ......... the last argument, and the door out of it
 *
 * 05 is gone: it explained the same four steps a third of a page above the
 * course that teaches them. Both now open 09, as the live site does.
 */
export default function HomePage() {
  const { FAQ, SEO } = useContent();
  return (
    <>
      {/* The first screen, mounted synchronously. The hero holds a full
          viewport, so the proof bar is already below the fold — it is eager
          anyway because it is small and it is the first thing a scroll
          reaches. */}
      <HeroSection />
      <ProofBarSection />

      {/* Everything below, fetched and mounted once the hero has painted.
          Sixteen sections, ~4,000 nodes and sixteen GSAP setups used to run
          before the first frame with the screen blank behind them. See
          `DeferUntilPainted` — including why this is not viewport-based —
          and `MountInSlices` for why they no longer arrive in one pass. */}
      <DeferUntilPainted>
        <Suspense fallback={null}>
          <HomeBelowFold />
        </Suspense>
      </DeferUntilPainted>
    </>
  );
}
