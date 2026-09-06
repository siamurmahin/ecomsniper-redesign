/**
 * Arms the reveal animations, before the first paint.
 *
 * `.js-motion [data-reveal] { opacity: 0 }` is what hides a section until it
 * scrolls in, and the hero's entrance keyframes are gated on the same class.
 * Both need it on `<html>` before anything is drawn.
 *
 * It used to be added from `entry.client.jsx`, which runs when the bundle has
 * downloaded and executed. That was correct for the SPA — the document was an
 * empty `#root`, so there was nothing on screen to flash. Prerendering made it
 * wrong: the browser now paints the whole page from HTML, and the class lands
 * afterwards, so every reveal on the page snaps from visible to invisible and
 * then fades back in. Measured locally at 66ms between the two; on a phone it
 * is the length of a bundle download, and it reads as the page loading twice.
 *
 * A string in the document rather than a module, for the same reason as
 * `preloaderShell` and the consent defaults: an inline script in `<head>` runs
 * before the body is parsed, so the class is on the element before a single
 * pixel of content exists.
 *
 * Still applied by script, never rendered onto `<html>` in the markup: a
 * visitor without JavaScript must never receive the CSS that hides the page,
 * and prerendered HTML is exactly what they are served.
 */
/**
 * The review escape hatch, armed in the same breath.
 *
 * `?motion=on` sets `motion-force` on `<html>` and remembers it for this
 * browser; `?motion=off` forgets it. Everything that asks whether to animate —
 * the stylesheet's `prefers-reduced-motion` block, `prefersReducedMotion()`
 * and `useReducedMotion()` — reads that class first.
 *
 * It exists because Windows turns animation off system-wide far more readily
 * than a designer expects, so the person reviewing this site's motion is quite
 * often a person the site is refusing to animate for, and the only remedy was
 * to change an accessibility preference they may have set deliberately. A
 * whole day was lost to a site that was working exactly as written.
 *
 * It cannot be reached by accident — it takes a query parameter and a
 * deliberate one — so no visitor's stated preference is ever overridden. It
 * has to be here rather than in a module for the same reason `js-motion` does:
 * the class must be on `<html>` before the first pixel is drawn.
 *
 * Wrapped in try/catch because `localStorage` throws outright in a browser set
 * to block site data, and an exception here would leave `js-motion` unset and
 * the whole page unhidden.
 */
export const MOTION_ARM = `(function(){var d=document.documentElement;d.classList.add('js-motion');try{var m=/[?&]motion=(on|off)/.exec(location.search);if(m)localStorage.setItem('motionForce',m[1]);if(localStorage.getItem('motionForce')==='on')d.classList.add('motion-force')}catch(e){}})();`;
