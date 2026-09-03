import { StrictMode, startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';

/*
 * `js-motion` is what arms the reveal animations. Because it is added by
 * script, a visitor without JS never gets the CSS that hides `[data-reveal]`
 * elements, so the page stays fully readable either way.
 *
 * It has to be set before hydration rather than in a component: the entrance
 * animations are keyed off it, and adding it later would let one frame paint
 * with everything already in place before it all hid itself again.
 */
document.documentElement.classList.add('js-motion');

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});
