# Issues

Known problems. Things that are wrong, not things that are planned — planned
work lives in `TODO.md`.

## How this file is kept

An issue goes here the moment it is found, whether or not anyone intends to
fix it. Each one says what is wrong, how it shows up, how it was measured, and
who can fix it. When one is fixed it moves to **Closed** with the commit.

**Severity** is about consequence, not effort:

- **blocker** — ships broken, or breaks the build
- **high** — visitors or search engines see it
- **medium** — wrong, but nobody has noticed yet
- **low** — cosmetic, or only developers meet it

---

## Open

### 2b. Three defects inside their terms — `medium`, owner: client

Found while reproducing the document. All three are carried into the rebuild
**verbatim**: a contract is not ours to silently edit, and a rebuild that
quietly improves a binding document creates a second version of an agreement
someone has already accepted.

1. **Clause 6.1 promises a flat 30-day refund from the date of purchase.**
   The client told us the refund is monthly-plan only — not the credits bundle,
   not Enterprise — and every marketing page on the rebuild qualifies it that
   way. Their terms do not, and the terms are the document that governs.
   Either the qualification goes into clause 6.1 or the site is promising less
   than the contract does. **This one needs answering before launch.**
2. **Clause 9.3 contains the literal string `[USD$100]`** — square brackets
   and all. An unfilled template placeholder sitting inside the liability cap.
3. **Refunds are directed to `sammy@ecomsniper.io`**, a personal address,
   while the published contact address is `management@ecomsniper.io`.

### 4. Eight footer links are soft-404s — `high`

`/about`, `/blog`, `/careers`, `/contact`, `/terms-and-conditions` on
`ecomsniper.io` all return **200 with the homepage shell**, not a 404. A link
checker therefore reports them healthy.

The legal ones matter most: the guarantee copy leans on a refund policy that
does not exist.

**Fix:** the client publishes the pages, or the links come out. Owner: client.

### 5. The live site is invisible to anything that does not run JavaScript — `high`

`ecomsniper.io` serves the same 6KB shell — `<div id="root"></div>` — at every
URL under a 200. The privacy policy only exists once React has run.

The rebuild fixes this for the pages it owns. The **live** site still has it
everywhere, and will until the rebuild replaces it.

**Fix:** ship the rebuild. Owner: us + client.

### 6. Legal text has not been reviewed by a lawyer — `high`

The privacy copy is the client's own with two changes: the implied-consent
sentence removed, and Microsoft Clarity replaced by what actually loads. The
cookie policy and the entire German translation are new and written by us.

The live policy also still says _"By using our site, you consent to this data
being collected"_ — implied consent, not valid under GDPR, and it contradicts
the banner that now asks.

**Fix:** client's lawyer reads `src/content/en/legal.js` and `de/legal.js`.
Owner: client.

### 7. One expensive frame remains at startup — `medium`

Worst frame in the first second is ~83ms. Total blocking work is down by half
after the layout deferral, but this one frame did not move and is not yet
attributed.

Ruled out by measurement: fonts (metric-matched, 0px delta), images (CLS
0.002), the marquee reflow (fixed), full-document layout (520ms → 169ms),
`ScrollTrigger.refresh()` (1ms), `lenis.resize()` (0ms).

**Fix:** unknown. Needs another profiling pass in an untuned browser —
`chrome-devtools-mcp` throttles `requestAnimationFrame` to a couple of frames a
second, so nothing about frame timing can be read through it. Owner: us.

**Measured again 8 Sep, after the day's work**, three Lighthouse runs on the
production build: performance **97**, accessibility **100**, best practices
**96**, SEO **100**; LCP **1.0s**, CLS **0.002**, **TBT 0ms**.

Total blocking time of zero does not prove the frame is gone — it counts only
what blocks after first paint, and this frame was measured in the first second,
which may be before it. It does mean the frame is not costing a visitor
interactivity, which is what `medium` was about. Worth one profiling pass
before launch, not worth holding launch for.

### 9. "Prerendered" is less literal than it sounds — `low`

82% of the prerendered HTML — 425KB of 518KB — is delivered inside
`<div hidden id="S:0">` and moved into place by inline script, because
`HomeBelowFold` is `lazy()` inside `<Suspense>`. `<main>` as served holds 2
sections; the document has 15.

Costs no layout time, and Google runs JavaScript, so indexing is unaffected. A
naive scraper or link preview reads the below-fold content out of a hidden
container.

**Fix:** none proposed. Recorded so nobody relies on the HTML being
straightforwardly readable. Owner: us, if it ever matters.

### 10. Metric-matched fallbacks are exact only where Arial and Georgia exist — `low`

The fallback faces are measured against Arial and Georgia. Android substitutes
its own fonts, so the match there is approximate rather than the 0px measured
on desktop — still far closer than an unadjusted fallback.

**Fix:** none sensible without per-platform measurement. Owner: us.

### 11. The privacy policy names three vendors the cookie policy does not list — `medium`

The privacy page names Microsoft Clarity, Microsoft Advertising and Google Tag
Manager. The cookie policy's table, three clicks away, is **empty**.

Both are correct on their own terms, which is what makes this worth writing
down. The table is generated from `config/vendors.js` and deliberately excludes
any vendor with no id — "the policy describes what this build actually loads,
not what it could load if someone filled in an env var". None of
`VITE_GTM_ID`, `VITE_CLARITY_ID` or `VITE_TAWK_ID` is set, so nothing loads and
nothing is listed. The privacy copy is the client's own document and describes
the service they run.

A reader cannot see that distinction. They see a policy admitting to session
recordings and an advertising identifier, and a cookie table saying this site
sets nothing.

It resolves itself the moment the ids arrive — the table fills in from the
declarations already written. It becomes a real defect only if the site ships
to production with the copy naming vendors and the ids still empty.

**Fix:** the ids, which are already on the Blocked list. Owner: client.

**The check is now automatic.** `npm run check:launch` fails while the privacy
copy names a vendor whose id is unset, and it is the last gate before a merge
to `main` — a merge is a deploy. It currently reports exactly this issue, twice
(Clarity and Tag Manager), which is the correct answer and will stay the
correct answer until the ids arrive. Confirmed 8 Sep: the ids are still not
available, and the client has been asked again.

---

### 16. `npm run build` fails about two times in three, locally — `medium`

The prerender dies on the **second route in the list**, whichever route that
is, with an empty message:

```
Prerender (html): / -> buildclientindex.html
Error: Prerender: Request failed for /pricing/:
```

Measured 6 Sep. Three builds at HEAD: fail, pass, fail. Three more with the
blog added: fail, pass, fail. It is not the blog, and it is not `/pricing` —
swapping `/faq` into second position moved the failure onto `/faq`. It is
**positional**, which rules out route content and points at a race in
`@react-router/dev`'s prerender as it starts.

Ruled out by measurement, not by reasoning: the blog work (fails identically
without it), the JSON-LD on `/pricing` (fails with the schema removed), and a
file lock from a running preview server (fails with nothing serving).

**The leading suspect is the Node version.** `.nvmrc` pins **22.22.0**; this
machine is on **24.20.0**. CI and Netlify honour the pin, which would explain
why deploys have not been failing while local builds have.

**Fix:** run the pinned Node locally and confirm the flake disappears. If it
survives on 22.22.0 this is a real bug in the toolchain and belongs upstream.

**Checked 8 Sep, and it is narrower than `high` suggested.** Both places that
matter honour the pin: `.github/workflows/quality.yml` reads
`node-version-file: .nvmrc`, and `netlify.toml` sets
`NODE_VERSION = "22.22.0"`. The failures are on this machine's unpinned
**24.20.0**, and no deploy has failed. So it is a local development annoyance
rather than something that can break a launch — **downgraded to `medium`**.

Still untested on 22.22.0, because this machine has no version manager
installed (no nvm, fnm, volta or nvs) and installing one, or a second Node, is
a change to the machine rather than to this repository. Worth doing before
anybody concludes the toolchain is at fault.

Counted again on 8 Sep across the day's builds: 9 failures, 6 passes, every
failure identical — second route in the list, empty message. Retrying works and
a green build is a correct build, because the failure is total rather than
partial.

Workaround until then: rebuild. A green build is a correct build — the failure
is total, not partial, so there is no risk of shipping a half-prerendered site.

---

### 21. Untranslated German pages share a title and description with the English — `low`

Seven pairs: both blog listing pages, all four posts, `/affiliate/terms` and
`/careers/video-editor`. The German deck has no overlay for them, so they fall
through to English — which is the fallback working as designed, and it does
mean two indexed URLs with identical metadata. `hreflang` tells search engines
they are alternates, so this is a translation backlog item rather than a bug.
Recorded so it is not re-found as one.

## Closed

### 13. ~~Nothing linked the favicon~~ — fixed 6 Sep

`public/` has carried `favicon.svg`, `apple-touch-icon.png` and
`site.webmanifest` since the move off `index.html`, and nothing has referenced
any of them since. The document is rendered from `root.jsx` now and the tags
did not come with it, so every tab on the site showed the blank default page
icon and every page load spent a request on `/favicon.ico` to be told it does
not exist.

Three `<link>` tags in `root.jsx`. Costs less than the 404 it replaces.
**Fixed 6 Sep.**

### 1. ~~CI never gets past its first step~~ — withdrawn, was a bad measurement

**This issue was wrong and is kept for the record.** It claimed CI was blocked
by CRLF committed to the repository. Neither half was true.

The repository content is LF and always was: `git ls-files --eol` reports 191
text files at `i/lf` and none at `i/crlf`. CI checks out on Linux, gets LF,
and prettier passes.

What produced the false reading was the test itself. `git archive` on Windows
applies `core.autocrlf`, so the "clean export" I measured had CRLF that no CI
runner would ever see — 48 CRLF pairs in the archive against 0 in the blob. An
earlier `grep -c` compounded it by counting every line rather than the CRLF
ones.

There was a real problem underneath, a smaller one: `core.autocrlf=true` writes
CRLF into a **Windows working tree**, so `npm run format:check` failed locally
on 28 files while passing in CI on the same commit. A check that passes in one
place and fails in another teaches people to ignore it. Fixed by `eol=lf` in
`.gitattributes` — one line, no source file touched.

### 2. ~~Their Terms and Conditions page is empty~~ — withdrawn, wrong

**Wrong, and kept for the same reason as issues 1 and 3.** It claimed
`https://ecomsniper.io/terms-and-conditions` renders a heading, the line
**"Last Updated: Invalid Date"** and nothing else, and concluded there was
**no terms of service on a site taking $199 a month**. That was the strongest
finding in this file about the client, and it was not true.

Their page carries fifteen numbered sections — 9,730 characters, headed
"Last Updated: Tue Mar 18 2025". Re-read on 4 Sep after
`readyState === 'complete'` and a full scroll, then checked clause by clause:
37 clauses. The full text is in `source-copy/terms-and-conditions.md`.

The original reading was taken before the page had hydrated. Fifth in that
family this week, and the second time it produced a finding against the client
rather than only a wrong note. **A screenshot of a half-loaded SPA is evidence
of nothing.** The "Invalid Date" line was real at the time of reading and is
not on the page now.

Rebuilt as `/terms-and-conditions` in both languages.

### 3. ~~Two of their four feature pages never finish loading~~ — withdrawn, wrong again

**Also wrong, and kept for the same reason as issue 1.** It claimed
`/ai-powered-lister` and `/competitor-research` never render. Both load
perfectly well when given time:

| Page                   | Result                                             |
| ---------------------- | -------------------------------------------------- |
| `/ai-powered-lister`   | `complete`, 1700 chars, title "Ai Powered Lister"  |
| `/competitor-research` | `complete`, 864 chars, title "Competitor Research" |
| `/aiListerV6`          | `complete`, 1822 chars                             |
| `/productHunterV6`     | `complete`, 1230 chars                             |

Their site is slow to hydrate, and every reading was taken while
`readyState` was still `interactive`. A partially loaded SPA looks exactly
like a broken one from outside: zero text, generic title, wedged renderer. The
conclusion followed the symptom instead of waiting for the page.

It also corrupted a second finding. `/productHunterV6` was recorded at 316
characters against 992 for the readable slug, and that gap was written up as
evidence that the V6 redesign had dropped its copy into images. Read after
completion it is **1063 characters with all three steps explained** — the same
substance, reworded. There was no gap. The slug comparison in
`source-copy/product-hunter.md` has been corrected.

**The guard, now in `CLAUDE.md`:** assert `readyState === 'complete'` before
reading anything out of a page, and never conclude "broken" from a single
timeout. This is the third measurement mistake of the day with the same shape
— reading a thing before it had settled, then trusting the reading.

### 12. ~~A reader with reduced motion got the prerender thrown away~~ — fixed 6 Sep

Reported as "the animations stopped working". Two separate things, and only
one of them was ours.

**Not a defect:** this machine has Windows animation effects off
(`HKCU\Control Panel\Desktop\WindowMetrics\MinAnimate = 0`), so Chrome reports
`prefers-reduced-motion: reduce` and the site serves its still version — no
reveals, no typewriter, no smooth scroll. That is the site working correctly.
Turning the setting back on brings all of it back, verified.

**The defect underneath it:** seven components read `prefersReducedMotion()`
**during render**. The prerender has no `window`, so the HTML always carried
the animated branch, and a reader with the preference set rendered the still
one. React 19 does not patch a mismatch of that size up — it reports error
`#418` and regenerates the whole tree on the client. The prerendered document
was thrown away on every page, and `js-motion` — set on `<html>` by the inline
script in `root.jsx` before first paint — went with it, so nothing on the page
could animate for the rest of the visit even after the setting changed.

`hooks/useReducedMotion.js` now reads it through `useSyncExternalStore` with a
server snapshot of `false`, which is what the prerender rendered. Nothing was
added to the bundle; `useSyncExternalStore` is part of React. Callers that only
decide what an **effect** does still call `prefersReducedMotion()` — those run
after hydration and cannot mismatch anything.

Verified across all 28 prerendered pages, Chrome run twice, once with
`--force-prefers-reduced-motion` and once without: no page errors, no failed
requests, `js-motion` intact on every page in both modes.

### 17. The cookie banner's three buttons wrapped on a phone — fixed 8 Sep

Reported by the user, reproduced at 390px: `Reject all` and `Customise` on one
line, `Accept all` alone on the next. `.btn` is `px-7`, so three of them are
~414px of content in the ~350px a phone leaves inside the banner.

It is not only untidy. The row is the one control on the site where the three
options have to look equally available — a quieter reject is a dark pattern and
under the TTDSG is not valid consent — and a button on its own line does not
look equal to two sitting together.

Now `grid-cols-3` with tighter padding below `sm`, the auto-width flex row from
`sm` up. Measured after: one row at 320, 360, 390 and 414px, equal widths, no
label clipped, no page overflow.

### 18. Two tap targets under the WCAG 2.2 minimum — fixed 8 Sep

Found by sweeping every route at 390px and measuring every link, button and
input against the 24 × 24px minimum:

- **`Watch it again`** in `PipelinePanel`'s finale: 114 × **19**. Padding only,
  `-my-1.5 py-1.5`, so the label does not move. Now 114 × 31.
- **The consent checkbox** on `/register`: 16 × 16, ours, shipped the same day.
  Now 20 × 20. The `<label>` wraps the box and the sentence, so the whole line
  toggles it — that is the equivalent larger target the rule allows, and the
  box being aimable on its own is the part that was missing.

The other small hits the sweep returned are correct and were left alone: the
`Skip to content` link is 1 × 1 until it takes focus, and the 1 × 1 input on
`/contact` is the honeypot, which must not be reachable.

### 19. An empty registration form reported three problems out of four — fixed 8 Sep

`confirmEmail` was validated as `next.confirmEmail !== next.email`. Two blanks
are equal, so submitting an empty form marked email, password and the consent
box and said nothing about the confirmation — the reader fixed what they were
shown and submitted one short. Now an empty confirmation fails on its own.
Verified in the browser: four fields carry `aria-invalid` on an empty submit.

### 20. ~~Every canonical pointed at `ecomsniper.io`~~ — fixed 8 Sep

`config/site.js` sets `DOMAIN = 'https://ecomsniper.io'`, and `lib/meta.js`
builds every `rel="canonical"`, every `hreflang` alternate and the OG image URL
from it. On all 53 prerendered documents the canonical is on **their** domain.

That is correct the day this replaces their site at that address, and wrong
while it is served from `ecomsniper.netlify.app`: it tells Google the real copy
of every page is somewhere else, which is a request not to index this one.

**Fixed** the way it was proposed, once the decision was taken.
`config/site.js` reads `VITE_SITE_ORIGIN` and falls back to the real domain,
so a local build and CI are unchanged. `netlify.toml` sets it to
`$DEPLOY_PRIME_URL` for deploy previews and branch deploys and to
`https://ecomsniper.io` for production.

`content/en/site.js` carried a second copy of the same string, and it is the
one `lib/meta.js` actually builds canonicals from — changing the config alone
would have moved nothing. It now imports `DOMAIN`.

Verified end to end: `VITE_SITE_ORIGIN=https://preview.example.com npm run build`
put `rel="canonical" href="https://preview.example.com/about"` in the
prerendered HTML, and a plain build puts the production domain back.

### 8. ~~136KB of dead CSS shipped on every deploy~~ — fixed 8 Sep

`@react-router/dev` moves a stylesheet from the server build into
`build/client`, where nothing links it. Confirmed orphaned: no HTML or JS in
the client build references it.

No config value prevents it — the plugin moves the asset when `ssrEmitAssets`
is false and copies it when true. Costs deploy size, not visitor bandwidth.

**Fixed.** `scripts/prune-orphan-css.mjs` runs as the second half of
`npm run build`, so Netlify gets the same result as a local build. It reads
every HTML and JS file in the client build and deletes a stylesheet **only**
when its filename appears in none of them — if the plugin ever starts linking
that file, nothing is removed. Measured on the build that shipped this:
`server-build-DJ8R30sa.css`, **136.1KB**, gone; `root-*.css` at the same size
correctly kept, which is what proves the reference check works rather than the
size heuristic somebody would have reached for instead.

| Issue                                                                                                                                                                                                  | Fixed by           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| Netlify published `dist`, which the router no longer writes — the deploy would have shipped the pre-migration SPA                                                                                      | `63f9be1`          |
| Every `/de` page declared `lang="en"`                                                                                                                                                                  | `63f9be1`          |
| Unknown URLs returned the homepage under a 200 — a soft 404 on the rebuild itself                                                                                                                      | `63f9be1`          |
| eslint and prettier ignored `dist` but not `build`, so lint reported 151 errors that were all minified output                                                                                          | `63f9be1`          |
| Node pinned to a floating `22` while both router packages require `>=22.22.0`                                                                                                                          | `63f9be1`          |
| Tawk.to loaded on every page view, before anyone was asked                                                                                                                                             | `098c559`          |
| Six accessibility defects — a `<dl>` of `<div>`s, `aria-label` on a bare `<span>`, `<h4>` under `<h2>`, focusable content inside `aria-hidden`, two accessible names not containing their visible text | `88c081d`          |
| A footer hydration "bug" that was only ever real on the dev server, and whose fix caused a production regression                                                                                       | `7aa1cf0` (revert) |
| The prerendered page painted in full, then every reveal snapped to invisible when `js-motion` arrived with the bundle                                                                                  | `b9ba189`          |
| Blurred colour washes re-rasterised on every frame of every fade — a 52ms long task on the two sections nearest the top                                                                                | `4436e81`          |
| `font-display: swap` with no metric overrides: Arial rendered a body paragraph 24px shorter than Montserrat                                                                                            | `1cd66b2`          |
| The marquee's CSS sat in a lazy chunk while its markup was prerendered — a 366px reflow                                                                                                                | `8513d61`          |
| First layout of the whole 15,700px document cost 494ms with no JavaScript involved                                                                                                                     | `a504959`          |
| Diagnostic reveal probe left in the repo after its question was answered                                                                                                                               | `7917e4b`          |

### 14. ~~Without JavaScript the panel shows only its first step~~ — fixed 6 Sep, and it was the smaller half

Filed as a panel problem. Measuring it found what was sitting on top: with
JavaScript disabled the **whole site was a spinner**, on every page.

`#preloader` is `position: fixed; inset: 0; z-index: 9999` and is removed by
script — by the app once it has painted, and otherwise by the six-second
backstop in `preloaderShell`, which is also a script. With scripts off neither
ever runs. Measured: preloader fixed and opaque at z-index 9999, with 1699
characters of main content sitting behind it, unreachable. Every route is
prerendered, so the finished page was there the entire time.

That is **issue 5 above** — the one filed against their live site for being
invisible without JavaScript — reproduced in the rebuild, and it had been true
since the preloader was added.

The panel half was real too: five steps stacked absolutely in a fixed-height
box with only the active one at full opacity, and nothing able to advance them.
Four of five unreachable, including the offer the panel builds towards.

`lib/noScriptStyles.js`, rendered in a `<noscript>` in the head, hides the
preloader and un-stacks the steps. `aria-hidden` and `inert` moved behind an
effect, because in the prerendered markup they hid four steps from a screen
reader while the stylesheet showed all five — seen and announced have to agree.

The panel is taller than the design intends in that rendering. That is the
right trade: a hero a screen taller beats a hero missing four fifths of its
content, and nothing can page through it anyway.

Verified with JavaScript disabled — preloader not covering, five of five steps
visible — and with it on, where nothing moved: steps still 224px and absolute,
rail still shown, all six `.defer-render` sections still `content-visibility:
auto`, panel 396px in both motion modes. Fixed by `6c36468`.

### 15. ~~Half of `index.css` was a verbatim duplicate~~ — fixed 6 Sep

`src/styles/index.css` carried a **287-line duplicated prefix**: lines 161-439
reappeared at 591-869, giving two `@layer base` blocks, two `@utility btn`
blocks and two openings of `@layer components`.

Found while adding a radius to `.panel-brand-outline`, and it found itself: the
class was defined twice, so editing the first definition would have changed
nothing and produced no error. It looks exactly like the browser ignoring valid
CSS.

**The weight claim in the first version of this issue was wrong.** It said this
was where the CSS headroom lived. Measured both ways, built:

```
root stylesheet: before=131506  after=131506  diff=0 bytes
all css:         before=269788  after=269788  diff=0 bytes
```

The bundler already collapses identical rules, so nothing was shipping twice.
The cost was **maintenance only** — real, and it nearly cost a fix the same
day, but it is not bytes. CSS stays at 129KB of 130KB, and the headroom is
still to be found elsewhere.

What made the deletion safe rather than assumed safe:

- The two regions are **not** copies of each other. Only the first 279 lines
  match; after that region A holds the `hunt-*` rules and region B holds
  `headline-*`, `card-*`, `btn-*` and `brand-*`. Both tails are unique and both
  were kept. Deleting a whole region would have removed live rules.
- **Zero selector collisions** between the duplicated prefix and either tail,
  so removing the later copy could not change a cascade outcome.
- The cut is at a rule boundary, not at the line where the text diverges — the
  divergence falls inside a shared comment, and cutting there would have left a
  broken one.
- A computed-style fingerprint of **every element on 14 pages** — 33 properties
  each, reduced motion forced, reveals neutralised — is identical before and
  after. Same element counts, same hashes, all fourteen.

One thing left behind deliberately: `--ease-out-expo`, `--ease-in-out-quint`,
`--shadow-lift` and `--shadow-float` are declared in `@theme` at 149-154 and
again at 579-584, the second time directly inside `@layer components` with no
selector, where they do nothing. Four dead lines, left alone to keep this
change reviewable. They cost nothing.
