# Session notes — 6 Sep 2026

Carries on from `SESSION-NOTES-05-SEP.md`.

Opened on "the website is kind of broken, animation and lots of things not
working". It was two things wearing one coat, and separating them took most of
the session.

## The animations were not broken. The machine had asked for fewer of them

Windows animation effects were off on this machine —
`HKCU\Control Panel\Desktop\WindowMetrics\MinAnimate = 0`, which Chrome maps
straight to `prefers-reduced-motion: reduce`. Every reveal, the headline
typewriter, the Lenis smooth scroll and the hero entrance are gated on it by
design, so the site was correctly serving its still version.

**Settings → Accessibility → Visual effects → Animation effects** turns it back
on. Verified both ways before writing any code: with the query forced to
`no-preference` the page came back with `js-motion lenis` on `<html>`, the
typewriter running and a clean console.

Worth keeping in mind the next time "the animations are gone" is the report.
Check the OS setting before the code.

## The defect that was hiding behind it

Reading a media query during render is a hydration bug, and seven components
were doing it:

```js
const [isStatic] = useState(() => prefersReducedMotion());
```

The prerender has no `window`, so the HTML always carried the animated branch.
A reader with the preference set rendered the still one, and React 19 answers a
mismatch of that size by regenerating the entire tree on the client — error
`#418`, and everything the prerender bought is gone. `js-motion` went with it,
because the inline script in `root.jsx` sets it on `<html>` and React rebuilt
that element without it. So the page could not animate again for the rest of
the visit even if the setting changed.

Present since `619709a`, the first commit — not a regression, and **restoring
from GitHub would have reproduced it exactly**. That was asked for twice and is
the reason it is worth writing down: the branch was not the problem.

`hooks/useReducedMotion.js` reads it through `useSyncExternalStore` with a
server snapshot of `false`, which is what the prerender rendered, so the
hydrating render matches the HTML and the still markup arrives as an ordinary
update. Free — `useSyncExternalStore` is part of React, and the eager JS budget
did not move (570KB, same as before). It subscribes, so toggling the OS setting
now takes effect without a reload.

The split to keep: **the hook where the answer decides what is rendered, the
plain `prefersReducedMotion()` where it only decides what an effect does.**
`useRevealOnScroll`, `useParallax` and `SmoothScrollProvider` run after
hydration and cannot mismatch anything, so they were left alone.

Converted: `HeroSection`, `PipelinePanel`, `CountryTicker`, `AudienceSection`,
`ProofBarSection`, `PillarsSection`, `InterviewsSection`. The last two only
branch event handlers, not markup, so they could not mismatch — they were
converted anyway so the next markup branch added to them does not quietly
reintroduce this.

`components/reactbits/*` reads the query too, in `PixelCard` and
`AccordionGallery`. Both use it only for a duration or a ref, neither branches
markup, and both are vendored — left alone.

## The trap that cost an hour: `vite preview` and the trailing slash

A sweep of all 28 pages said 27 of them still failed after the fix. They did
not.

`vite preview` serves a prerendered directory **only on the trailing slash**.
`/cookie-policy` falls through to the SPA fallback and answers with the
**homepage** HTML; `/cookie-policy/` gets the right file. So every page but the
homepage was being hydrated against the homepage's markup, which mismatches for
reasons that have nothing to do with the code being tested.

```
/cookie-policy    <title>EcomSniper — eBay Dropshipping Software…</title>
/cookie-policy/   <title>Cookie Policy — EcomSniper</title>
```

Netlify resolves the directory itself, so this is a preview-server detail and
not a URL the site has to carry. **Always put the trailing slash on a preview
URL, or measure a route that is not the homepage against the wrong document.**

Add it to the existing list of measurement traps: dev never reproduced the real
mismatch either, because `ssr: false` means dev has no prerendered HTML to
disagree with. The production build was the only thing that could show it, and
the production bundle only says `#418` with no detail — the diff had to be
recovered by client-navigating to a route from a page that hydrates cleanly and
comparing that render against the prerendered file.

With the slash, both sweeps are clean: 28 pages, twice, once with
`--force-prefers-reduced-motion` and once without. No page errors, no failed
requests, `js-motion` on every page, one `h1` each, `lang` correct on all 14
German pages.

## The favicon was never linked

`public/` has held `favicon.svg`, `apple-touch-icon.png` and
`site.webmanifest` since the move off `index.html`. Nothing referenced any of
them: the document is rendered from `root.jsx` now and the tags did not come
with it. Every tab showed the blank default icon, and every load spent a
request on `/favicon.ico` to be told it does not exist. Three `<link>` tags,
and it costs less than the 404 it replaces.

## The affiliate work was finished, not abandoned

The working tree looked mid-edit — a rename in progress, untracked files, one
file failing `format:check`. It was complete. `/affiliate` is the offer,
`/affiliate/terms` is the contract the old page became, both languages
prerender, `/affiliate/join` redirects to the terms in `_redirects` and
`netlify.toml`, and the SEO deck has an entry for each. Only prettier had not
been run. Committed as it stood.

## The ending: it was the Windows setting, and now there is a way past it

Confirmed live once the setting was turned back on — `prefers-reduced-motion`
reporting `false`, the typewriter caught mid-word, the hero panel back to the
compact self-advancing version rather than the four-step stack, 81 reveals
armed. Nothing had been lost at any point.

What made it hard to believe was that the reduced-motion fallback for the hero
panel is not just "the same panel without motion" — it renders **all four steps
stacked**, which is four times the height and runs off the bottom of the
screen. That reads as a broken layout rather than as an accessibility
fallback, which is why "the right side box is not working" was a fair
description of what was on screen. Worth revisiting on its own merits: the
compact panel with autoplay off would be a better still version than the stack.

### `?motion=on`

A reviewer whose machine has animation turned off cannot see this site's
motion, and that is most of what this site is. `?motion=on` sets `motion-force`
on `<html>` and remembers it for that browser; `?motion=off` forgets it. The
stylesheet's reduced-motion block, `prefersReducedMotion()` and
`useReducedMotion()` all read the class first, so CSS and JS can never
disagree.

Costs 1KB of eager JS — 570KB to 571KB, leaving 4KB of headroom. Flagged
before building rather than after.

It cannot be reached by accident: it takes a deliberate query parameter, and
the default is untouched, so no visitor's stated preference is overridden.

### The regression the test caught, which is the point of writing tests first

The first attempt guarded the block with `html:not(.motion-force) .js-motion
[data-reveal]`. That is a **descendant** combinator, and `js-motion` is on
`<html>` itself — so the selector matched nothing, every `[data-reveal]` kept
the `opacity: 0` that hides it, and a reduced-motion visitor was served a
blank page. `useRevealOnScroll` calls `clearProps` in that branch, so that CSS
rule is the only thing making the content visible.

`html:not(.motion-force).js-motion [data-reveal]` — no space. The `*` list
gained `html` itself for the same reason: `scroll-behavior` is set on the root
element, and a bare `*` had been matching it.

Caught because the override was tested against `--force-prefers-reduced-motion`
with a probe that counts hidden reveals, not by looking at the page. Looking at
it would have shown a blank screen and read as "still broken".

## The hero panel's fallback, fixed on its own merits

Asked for once the setting was back on, and it is the right call: the still
version was not "the panel without motion", it was a different and worse
section. Five steps stacked, roughly four times the panel's height, running off
the bottom of the first screen and pushing everything below it down.

It is now the same panel with autoplay off — 396px in both modes, bottom inside
the fold in both. The stepper rail was already built from real buttons, so
every step stays reachable by click and by keyboard; the connectors render
their settled state rather than running, which is precisely what they already
did the moment a reader clicked a node. The replay button goes, because it
exists to restart a run and there is no run to restart.

Autoplay is **derived**, not stored — `isAutoPlaying && !isStatic`. A
`useState` initialiser would have missed it entirely, for the same reason the
whole hydration bug happened: `isStatic` is false for the hydrating render,
because that is what the prerender wrote, and flips immediately afterwards.

Measured at 1440×900:

| | reduced | normal |
| --- | --- | --- |
| panel height | 396px | 396px |
| bottom inside the fold | yes | yes |
| auto-advances over 9s | no, holds at 0 | yes, reaches step 3 |
| steps reachable via the rail | 5 of 5 | 5 of 5 |
| replay button | hidden | shown |

Eager JS went **down**, 571KB to 570KB: the stacked list was the larger of the
two renderings and it is gone, which paid back the kilobyte `?motion=on` cost.

### Still open, found while in here

The prerendered HTML is the **animated** branch — `useReducedMotion` returns
`false` on the server, which is deliberate and is what makes hydration match.
That means a visitor with **no JavaScript** gets the panel showing step one
only; steps two to five are in the document but `inert` and at `opacity: 0`.
Pre-existing, not introduced here, and not the same question as reduced motion.
Filed as `ISSUES.md` 14 rather than fixed, because the fix is a design decision
about what a no-JS visitor should see.

## Asked for the panel's no-JS rendering; found the site was a spinner

The `<noscript>` stylesheet was agreed as a small thing for the hero panel.
Measuring it first — with `page.setJavaScriptEnabled(false)` rather than by
reasoning about it — turned up something an order of magnitude larger.

`#preloader` is `position: fixed; inset: 0; z-index: 9999`. It is removed by
the app once it has painted, and otherwise by a six-second backstop that exists
precisely for "a bundle that never executes" — but that backstop is itself a
script. With scripts off neither ever runs. **Every page was a spinner over an
empty ground, permanently**, with the finished prerendered page underneath it
the whole time: 1699 characters of main content, unreachable.

That is `ISSUES.md` 5 — the finding written against *their* live site for being
invisible without JavaScript — reproduced in the rebuild, and true since the
preloader was added. The irony is that prerendering was the fix for their
version of it.

One `<noscript>` block in the head answers both halves. The important rule is
one line.

### Two details worth keeping

**The stylesheet is eager JS, even though script-running browsers never parse
it.** `<noscript>` content is skipped by the parser, but the string still has
to exist in `root.jsx`'s chunk, because the client re-renders the document
during hydration. Written longhand with its reasoning inside the template
literal it cost 2KB and took the budget to 572KB. Moving the prose into a
comment above the constant — which the minifier removes — and concatenating
terse rules got it to a quarter of that, landing at 571KB with 4KB spare. The
explanation is not lost; it is just not shipped.

**`aria-hidden` and `inert` had to move behind an effect.** They are correct
once the panel can page itself and wrong before. In the prerendered markup they
hid four steps of five from a screen reader, while the new stylesheet put all
five on screen — so a sighted no-JS visitor and a screen-reader no-JS visitor
would have been given different pages. `false` for the hydrating render, which
is what the prerender wrote, then `true` from an effect: an ordinary update,
not a mismatch.

### And a measuring mistake, made and caught in the same hour

The first screenshots of `/affiliate/terms` came back **blank** — header,
cookie banner, footer, nothing in between — and it looked exactly like a broken
page. It was the screenshot. `CLAUDE.md` says to drop `js-motion` from `<html>`
**and** strip the inline styles GSAP wrote; only the second half was done, so
`.js-motion [data-reveal] { opacity: 0 }` was still hiding all 101 reveals.

Third time this week that a reading, not the thing being read, produced the
defect. The rule in `CLAUDE.md` was right there and was followed halfway.
