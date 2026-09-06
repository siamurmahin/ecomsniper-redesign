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

## Picked up after a power cut, mid-component

The machine lost power with `CoverFallback.jsx` written and unstaged and
`BlogPage.jsx` half-edited around it. Nothing was lost — the working tree held
both, eslint passed on both, and the build ran all sixty-odd routes. What had
not survived was the bookkeeping: `1342b36` was committed without its Done row,
so `TODO.md` recorded the decision to build search and tabs and not the fact
that they existed.

### The budget fired, and the interesting part is by how much

`npm run budget` said `OVER eager JS 576KB / 575KB`. The obvious reading is
that the coverless-cover work costs a kilobyte on the first screen, and the
obvious fix — inline the reticle's SVG so the blog stops sharing a module with
the homepage — contradicts the comment inside `ReticleMark` itself, which says
in as many words that two copies of a logo are two places for it to drift.

So it was measured instead of reasoned about. Stash, build, count the bytes the
document actually preloads; unstash, build, count again.

```
HEAD  589,218 bytes  575.41KB
WIP   589,322 bytes  575.51KB
```

**104 bytes.** The chunk list is identical on both sides — same twenty files,
same sizes — and `ReticleMark-BQlJyW9_.js` does exist as a new shared chunk but
is nowhere in the preload list. The 104 bytes are the route manifest naming a
chunk the first screen never fetches. The ceiling did not fire on weight; it
fired on rounding, because 575 had 0.6KB of room left and `kb()` rounds.

`check-budget.mjs` already answers this case: "a ceiling for pages, not for
weight — if it fires again on something that is not the manifest, that is a
real regression". It was the manifest. Raised to 578, with the measurement in
the comment so the next person does not have to take it on trust.

Worth keeping: a budget with no headroom stops measuring the thing it was
written to measure. At 0.6KB of room the next component was going to fail it
whatever the component was, and the failure would have said "1KB over" while
meaning "104 bytes and a rounding boundary".

### The fallback itself

Verified on the production build at `:4173`, not on the dev server, with
`js-motion` dropped and the GSAP inline styles stripped — the rule in
`CLAUDE.md` that was followed halfway earlier in the day. The founder's letter
card is now the same height as the two beside it, brand ground under the
reticle with `NEWS & UPDATES` beneath the mark. No stock photograph, which
would have been the only image on the site illustrating nothing, on the one
post that is a person speaking plainly.

### The last gate failed twice for a reason that was not the site

`npx lhci autorun` exited 1 with `Runtime error encountered: EPERM, Permission
denied: ...\Temp\lighthouse.12485175`, and again on a fresh temp directory. It
looks like a failed audit and is not one: the line arrives after "Generating
results", and it is chrome-launcher failing to delete its own profile
directory. Windows holds the handle; lhci reads the exit code and throws the
run away regardless.

Running it with `TMP` and `TEMP` pointed at a directory of our own passed three
runs and every assertion. Written into `CLAUDE.md` beside the other measuring
traps, because the failure names Lighthouse and means the filesystem.

## Competitor Research, and the first page where V6 was the worse draft

Product Hunter and the AI Lister both settled the same way: their site
publishes each feature page twice, the `V6` spelling turned out to be the
fuller rewrite, and the readable slug was kept as the URL with `V6` redirecting
onto it. Going into this page the assumption was that it would settle the same
way a third time.

It does not. `V6` here is 640 characters against 864, and the difference is
real rather than editorial: the readable slug explains four concrete steps —
identify competitors, scan for top sellers, undercut the lowest price, launch
your listings — and `V6` compresses all four into two atmospheric sections that
describe the idea rather than the procedure. What `V6` does have is the better
headline. So the page takes the hero from one and the steps from the other, and
`docs/source-copy/competitor-research-v6.md` had already written down that this
would be needed, which is the reason the capture files exist.

Three of their lines did not survive, all of them standing rules rather than
opinions about this page: the flat "30 day money back guarantee" is qualified
to the monthly plan, the hero gets a call to action that neither of their
versions has above the fold, and "prices shown as blocks on purpose. The real
numbers come from the live listings you are looking at" is dropped — that is a
design note apologising for a mock, printed as product copy.

### Building the panels on `HuntPanels` rather than beside it

Five panels were needed and none of them existed. The temptation was a second
`SnipePanels.css` and a second idea of what a scanning state looks like, which
would have been a kilobyte of stylesheet to say almost exactly what the sheet
already says.

Instead the window chrome, the sweep timings, the row stagger and the
`.hunt-*` rules are imported from the Product Hunter panels, and
`ScanningState` was exported to go with them. Two feature pages showing the
same software should look like the same software; that is the argument, and the
byte count agrees with it — the whole page is 17KB in its own lazy chunk and
the stylesheet grew by 1KB.

Only two of the five animate. The ladder resolves into an order and the store
scan sweeps, because in both a scan genuinely runs. The dossier, the arithmetic
and the published listings are static, on `ExtractPanel`'s rule: animating a
panel where nothing is being computed is inventing work.

### The floor line

The hero is the price ladder — four sellers on one item, ordered by price, with
yours arriving underneath — because "the cheapest listing wins the sale, so
yours becomes the cheapest listing" is the argument for the whole page rather
than one of its steps.

Under it sits what the item costs from Amazon. That line is the only thing on
the page which says undercutting has a bottom, and without it the ladder reads
as a race to zero. It is also the one thing added to their copy rather than
taken from it, which is why it is a number and not a sentence.

The page's positioning — spot named competitors, save them, post under them —
is theirs and ships as they wrote it. It is filed under Blocked for the client
to look at rather than quietly reworded, because a rebuild that edits what a
business says about its own product has stopped being a rebuild.

### Two numbers measured rather than assumed

**The ceiling.** The speed gate was declared before the page was built rather
than after: two routes, roughly a kilobyte each of route manifest, against a
budget with 2KB of headroom. Measured afterwards it was 589,322 bytes to
591,853 — **+2,531**, of which 2,057 is the manifest and 542 the lazy-import
plumbing in the eager `index` chunk. No application code reached the first
screen; the page's own 17KB is not in that number at all.

Raised 578 → 586 in one move rather than three. Price Monitor, Dropship Mastery
and About are six routes between them, and raising the ceiling a page at a time
produces three commits that each look like a regression and none of which is
one. The repayment is unchanged and unstarted: `errorBoundaries` at 107KB and
`vendor-react` at 187KB.

**The placeholder heights.** `defer-render` needs a `--defer-h` per breakpoint,
and a wrong one moves the ground under a reader mid-scroll. The first pass
guessed 2000px and 3000px by eye. Measured, the band is 2246px in two columns
and 3867px stacked — the stacked figure read by forcing the grid to one column
at 360px rather than by halving the desktop number, which four steps and five
panels would have got wrong in the direction that hurts. Now 2250 and 3900.

### A blank screenshot that was not a blank page

The full-page capture came back with two screens of nothing between the last
step and the footer, which looked like the FAQ and guarantee sections had
failed to render. They had not: `content-visibility: auto` skips painting what
is off screen, and a full-page screenshot is exactly the case that exposes it.
The DOM had both sections at 1822px and 802px with their text in them.

Fourth reading this week that produced a defect the page did not have. The
check that settles it takes one line — read the section heights out of the DOM
rather than looking at the picture.
