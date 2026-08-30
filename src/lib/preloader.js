/**
 * Takes down the preloader that `index.html` painted before the bundle
 * existed.
 *
 * Called once the app has painted real content — NOT once everything has
 * finished animating. The hero's entrance is the first thing worth seeing, and
 * holding the cover until it was over would hide the very thing it is covering
 * for.
 *
 * The element removes itself rather than staying in the DOM at `opacity: 0`: it
 * is `position: fixed` across the whole viewport, and an invisible sheet over
 * the page is the kind of thing that swallows the first click somebody makes.
 */
export function dismissPreloader() {
  const el = document.getElementById('preloader');
  if (!el || el.dataset.dismissed) return;

  el.dataset.dismissed = 'true';
  el.classList.add('is-done');

  const remove = () => el.remove();
  el.addEventListener('transitionend', remove, { once: true });
  /* `transitionend` does not fire if the element is never composited — a
     background tab, or reduced motion shortening the transition to nothing. */
  window.setTimeout(remove, 700);
}
