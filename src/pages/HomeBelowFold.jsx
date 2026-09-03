import MountInSlices from '../components/layout/MountInSlices';
import AudienceSection from '../sections/AudienceSection';
import ProofWallSection from '../sections/ProofWallSection';
import InterviewsSection from '../sections/InterviewsSection';
import ReceiptsSection from '../sections/ReceiptsSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import PillarsSection from '../sections/PillarsSection';
import FeatureTourSection from '../sections/FeatureTourSection';
import CommunitySection from '../sections/CommunitySection';
import TrainingSection from '../sections/TrainingSection';
import FoundersSection from '../sections/FoundersSection';
import ComparisonSection from '../sections/ComparisonSection';
import FaqSection from '../sections/FaqSection';
import AssuranceSection from '../sections/AssuranceSection';

/**
 * Everything on the homepage under the first screen, in its own chunk.
 *
 * These thirteen sections were in the bundle the hero waits for. None of them
 * can be seen until the page is scrolled, but all of them had to be parsed and
 * executed before React could paint the first screen — the largest part of the
 * page's render delay, on a page whose network was never the problem.
 *
 * `HomePage` asks for this only once the hero has finished, so the download
 * and the parse both land in time the visitor is already spending reading.
 *
 * The order is the funnel's; see `HomePage` for what each section is for.
 */
export default function HomeBelowFold() {
  /* A deep link needs its target now, not thirteen idle slots from now. The
     window check is for the build: this renders in Node when the page is
     prerendered, where there is no location to read a hash from. */
  const isDeepLink = typeof window !== 'undefined' && window.location.hash.length > 1;

  return (
    <MountInSlices immediate={isDeepLink}>
      <AudienceSection />
      <ProofWallSection />
      <InterviewsSection />
      <ReceiptsSection />
      <TestimonialsSection />
      <PillarsSection />
      <FeatureTourSection />
      <CommunitySection />
      <TrainingSection />
      <FoundersSection />
      <ComparisonSection />
      <FaqSection />
      <AssuranceSection />
    </MountInSlices>
  );
}
