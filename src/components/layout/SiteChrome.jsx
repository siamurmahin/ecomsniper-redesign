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
 *
 * The consent banner was briefly in this list and had to come out: everything
 * below is behind a lazy import, and on a cold load the chunk is not there
 * when hydration runs, so React renders nothing where the server rendered all
 * of this and abandons the markup — visible, but owned by nobody and wired to
 * nothing. A banner that works only for a visitor with a warm cache is not a
 * consent mechanism. It lives in `root.jsx` now. See TODO.md: the same fault
 * is why nothing else in here responds either.
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
