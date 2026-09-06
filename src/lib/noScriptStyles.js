/**
 * What the page needs to be readable when the script never runs.
 *
 * Every route is prerendered, so the markup a no-JS visitor receives is
 * already the whole page. This is only about what is painted over it, and what
 * is hidden underneath.
 *
 * It renders inside a `<noscript>` in the head, which a browser that runs
 * scripts never parses. It still travels in `root.jsx`'s chunk, though — the
 * client re-renders the document during hydration, so the string has to exist
 * on both sides. **That is eager JS**, which is why the rules below carry no
 * comments and no whitespace worth trimming: the explanation lives here, in a
 * comment the minifier removes, rather than inside the template literal where
 * it would be shipped to every visitor. Written out longhand it cost 2KB;
 * this is a quarter of that.
 *
 * ### `#preloader`
 *
 * The important one. The preloader covers the viewport at `z-index: 9999` and
 * is removed **by script** — by the app once it has painted, and otherwise by
 * the 6-second backstop in `preloaderShell`, which is also a script. With
 * scripts off neither ever runs, so the whole site was a spinner over an empty
 * ground, on every page, permanently, with the finished page sitting
 * underneath it the entire time.
 *
 * ### `[data-panel-steps]`, `[data-panel-step]`
 *
 * The hero panel pages through five steps, stacked absolutely inside a
 * fixed-height box with only the active one at full opacity. Right when
 * something can advance them, wrong when nothing can: four of the five are
 * unreachable, including the offer the panel is building towards. Unstacked
 * they are simply a list. The panel grows taller than the design intends,
 * which is the correct trade — a hero a screen taller beats a hero missing
 * four fifths of its content.
 *
 * ### `[data-panel-rail]`
 *
 * Its nodes are buttons and its connectors are a progress bar. With no script
 * the buttons do nothing and the bar claims "step 1 of 5" over a list showing
 * all five, which is worse than saying nothing.
 */

export const NO_SCRIPT_STYLES =
  '#preloader{display:none!important}' +
  '[data-panel-rail]{display:none!important}' +
  '[data-panel-steps]{height:auto!important;padding-bottom:1.25rem}' +
  '[data-panel-step]{position:static!important;opacity:1!important}' +
  '[data-panel-step]+[data-panel-step]{margin-top:1.25rem;border-top:1px solid rgba(255,255,255,.1);padding-top:1.25rem}';
