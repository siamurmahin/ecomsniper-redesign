import MountInSlices from './MountInSlices';
import StickyConversionBar from './StickyConversionBar';
import BackToTop from './BackToTop';
import ConsultOffer from './ConsultOffer';
import ExitIntentOffer from './ExitIntentOffer';

/**
 * The conversion furniture: the sticky bar, the back-to-top button and the two
 * offer dialogs. This was `SiteChrome`, which also carried the footer.
 *
 * The footer left because the two halves want opposite things. The footer is
 * content — it has to be in the prerendered HTML for a crawler to follow its
 * links, which means the server renders it, which means the client has to
 * hydrate it. None of these four is content. The bar waits for a scroll, the
 * button waits for a scroll, and both dialogs wait for an intent that has not
 * happened; without JavaScript every one of them is dead markup. They were
 * being written into all fourteen prerendered documents for nobody.
 *
 * So they are client-only now, and that is also what fixes them. Rendered on
 * the server and lazily on the client, they sat inside a Suspense boundary
 * that suspended in both places and completed in neither — 131 elements on the
 * page owned by no React tree, wired to nothing, on every cold load. Rendering
 * nothing on the server means there is nothing to reconcile: they mount after
 * hydration, once, and work.
 *
 * They still go up one per idle slot so the four cannot combine into one long
 * task — see `MountInSlices`.
 */
export default function ConversionFurniture() {
  return (
    <MountInSlices>
      <StickyConversionBar />
      <BackToTop />
      <ConsultOffer />
      <ExitIntentOffer />
    </MountInSlices>
  );
}
