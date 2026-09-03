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
export const MOTION_ARM = `document.documentElement.classList.add('js-motion');`;
