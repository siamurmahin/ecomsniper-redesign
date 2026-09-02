import MountInSlices from './MountInSlices';
import SiteFooter from './SiteFooter';
import StickyConversionBar from './StickyConversionBar';
import BackToTop from './BackToTop';
import ConsultOffer from './ConsultOffer';
import ExitIntentOffer from './ExitIntentOffer';

/**
 * The footer and the conversion furniture, in a chunk of their own.
 *
 * None of these five is on screen when the page paints — the footer is at the
 * bottom of a 16,000px document, the bar and the button wait for a scroll, and
 * both offers are dialogs waiting for an intent that has not happened yet. All
 * five were in the bundle the first screen waits for and mounted in the commit
 * that drew it, and the footer measures its own lettering while doing so.
 *
 * They go up one per idle slot, so the five of them cannot combine into one
 * task — see `MountInSlices`.
 */
export default function SiteChrome() {
  return (
    <MountInSlices>
      <SiteFooter />
      <StickyConversionBar />
      <BackToTop />
      <ConsultOffer />
      <ExitIntentOffer />
    </MountInSlices>
  );
}
