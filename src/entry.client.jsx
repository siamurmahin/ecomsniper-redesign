import { StrictMode, startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';

/*
 * `js-motion` is set by an inline script in the document head instead of
 * here — see `lib/motionArm`. This module runs when the bundle has loaded,
 * which on a prerendered page is long after the content has been painted, and
 * arming the animations then made the whole page flash visible and then hide.
 */

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});
