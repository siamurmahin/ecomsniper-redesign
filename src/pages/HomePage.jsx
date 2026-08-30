import Seo from '../components/ui/Seo';
import DeferUntilPainted from '../components/layout/DeferUntilPainted';
import HeroSection from '../sections/HeroSection';
import ProofBarSection from '../sections/ProofBarSection';
import AudienceSection from '../sections/AudienceSection';
import ProofWallSection from '../sections/ProofWallSection';
import InterviewsSection from '../sections/InterviewsSection';
import ReceiptsSection from '../sections/ReceiptsSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import ModelSection from '../sections/ModelSection';
import PillarsSection from '../sections/PillarsSection';
import FeatureTourSection from '../sections/FeatureTourSection';
import CommunitySection from '../sections/CommunitySection';
import TrainingSection from '../sections/TrainingSection';
import FoundersSection from '../sections/FoundersSection';
import ComparisonSection from '../sections/ComparisonSection';
import PricingPreviewSection from '../sections/PricingPreviewSection';
import FaqSection from '../sections/FaqSection';
import AssuranceSection from '../sections/AssuranceSection';
import FinalCtaSection from '../sections/FinalCtaSection';
import { FAQ, PRICING } from '../data/siteContent';

/**
 * Homepage funnel, in the order a cold visitor needs it.
 *
 *  01 Hero .............. what this is, who for, what it costs
 *  02 Proof bar ......... checkable numbers, immediately
 *  03 Who it's for ...... self-identification
 *  04 Proof wall ........ the volume of it, and the door
 *  04b Interviews ....... members, in their own words
 *  04c Receipts ......... screenshots members posted
 *  04d Testimonials ..... written reviews, two running rows
 *  05 The model ......... the mechanism, BEFORE the feature tour
 *  06 Three pillars ..... the page's table of contents
 *  07 Feature tour ...... what the software actually does
 *  08 Community ......... the real differentiator
 *  09 Training .......... what a beginner gets
 *  10 Founders .......... who is behind it
 *  11 Comparison ........ the decision they are already making elsewhere
 *  12 Pricing ........... the price, on the page most people actually see
 *  13 FAQ ............... last objections, answered in place
 *  14 Assurance ......... countries + guarantee
 *  15 Final CTA ......... pay now, or take a free door
 */
export default function HomePage() {
  // FAQPage + Product schema, built from the same copy the page renders.
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'EcomSniper',
      description:
        'eBay dropshipping automation software with training and a private community. Finds products, bulk lists them, and monitors price and stock 24/7.',
      brand: { '@type': 'Brand', name: 'EcomSniper' },
      offers: PRICING.plans.map((plan) => ({
        '@type': 'Offer',
        name: plan.name,
        price: plan.priceLabel.replace(/[$,]/g, ''),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://ecomsniper.io/pricing',
      })),
    },
  ];

  return (
    <>
      <Seo
        title="EcomSniper — eBay Dropshipping Software, Training & Community"
        description="Find products already selling, list them in one click, and let EcomSniper watch your eBay store 24/7. Software, step-by-step training and a 400+ member community. From $97, 30 day money back guarantee."
        path="/"
        schema={schema}
      />

      {/* The first screen, mounted synchronously. The hero holds a full
          viewport, so the proof bar is already below the fold — it is eager
          anyway because it is small and it is the first thing a scroll
          reaches. */}
      <HeroSection />
      <ProofBarSection />

      {/* Everything below, mounted one frame after the hero has painted.
          Sixteen sections, ~4,000 nodes and sixteen GSAP setups used to run
          before the first frame with the screen blank behind them. See
          `DeferUntilPainted` — including why this is not viewport-based. */}
      <DeferUntilPainted>
        <AudienceSection />
        <ProofWallSection />
        <InterviewsSection />
        <ReceiptsSection />
        <TestimonialsSection />
        <ModelSection />
        <PillarsSection />
        <FeatureTourSection />
        <CommunitySection />
        <TrainingSection />
        <FoundersSection />
        <ComparisonSection />
        <PricingPreviewSection />
        <FaqSection />
        <AssuranceSection />
        <FinalCtaSection />
      </DeferUntilPainted>
    </>
  );
}
