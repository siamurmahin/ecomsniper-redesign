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

### 2. Their Terms and Conditions page is empty — `high`

`https://ecomsniper.io/terms-and-conditions` renders a heading, the line
**"Last Updated: Invalid Date"**, and nothing else. Confirmed on a full page
load with a screenshot: 423 characters in `<main>`, all of it navigation and
footer.

Two problems in one page.

There is **no terms of service**, on a site taking $199 a month. The refund
promise, the guarantee copy and the footer all point at a document that does
not exist. Their affiliate programme has full terms at `/affiliate/join`, so
the omission looks accidental rather than deliberate.

And **"Invalid Date"** is a date-parsing bug rendered to visitors on a legal
page — a literal `Invalid Date` string from an unparsed value.

This also blocks us: `/terms-and-conditions` is on the build list, to be
written from their live copy, and there is no live copy to write from.

**Fix:** the client supplies the terms. Nothing to rebuild until they do.
Owner: client.

### 3. Eight footer links are soft-404s — `high`

`/about`, `/blog`, `/careers`, `/contact`, `/terms-and-conditions` on
`ecomsniper.io` all return **200 with the homepage shell**, not a 404. A link
checker therefore reports them healthy.

The legal ones matter most: the guarantee copy leans on a refund policy that
does not exist.

**Fix:** the client publishes the pages, or the links come out. Owner: client.

### 4. The live site is invisible to anything that does not run JavaScript — `high`

`ecomsniper.io` serves the same 6KB shell — `<div id="root"></div>` — at every
URL under a 200. The privacy policy only exists once React has run.

The rebuild fixes this for the pages it owns. The **live** site still has it
everywhere, and will until the rebuild replaces it.

**Fix:** ship the rebuild. Owner: us + client.

### 5. Legal text has not been reviewed by a lawyer — `high`

The privacy copy is the client's own with two changes: the implied-consent
sentence removed, and Microsoft Clarity replaced by what actually loads. The
cookie policy and the entire German translation are new and written by us.

The live policy also still says _"By using our site, you consent to this data
being collected"_ — implied consent, not valid under GDPR, and it contradicts
the banner that now asks.

**Fix:** client's lawyer reads `src/content/en/legal.js` and `de/legal.js`.
Owner: client.

### 6. One expensive frame remains at startup — `medium`

Worst frame in the first second is ~83ms. Total blocking work is down by half
after the layout deferral, but this one frame did not move and is not yet
attributed.

Ruled out by measurement: fonts (metric-matched, 0px delta), images (CLS
0.002), the marquee reflow (fixed), full-document layout (520ms → 169ms),
`ScrollTrigger.refresh()` (1ms), `lenis.resize()` (0ms).

**Fix:** unknown. Needs another profiling pass. Owner: us.

### 7. 115KB of dead CSS ships on every deploy — `low`

`@react-router/dev` moves a stylesheet from the server build into
`build/client`, where nothing links it. Confirmed orphaned: no HTML or JS in
the client build references it.

No config value prevents it — the plugin moves the asset when `ssrEmitAssets`
is false and copies it when true. Costs deploy size, not visitor bandwidth.

**Fix:** a post-build prune, if it ever matters. Owner: us.

### 8. "Prerendered" is less literal than it sounds — `low`

82% of the prerendered HTML — 425KB of 518KB — is delivered inside
`<div hidden id="S:0">` and moved into place by inline script, because
`HomeBelowFold` is `lazy()` inside `<Suspense>`. `<main>` as served holds 2
sections; the document has 15.

Costs no layout time, and Google runs JavaScript, so indexing is unaffected. A
naive scraper or link preview reads the below-fold content out of a hidden
container.

**Fix:** none proposed. Recorded so nobody relies on the HTML being
straightforwardly readable. Owner: us, if it ever matters.

### 9. Metric-matched fallbacks are exact only where Arial and Georgia exist — `low`

The fallback faces are measured against Arial and Georgia. Android substitutes
its own fonts, so the match there is approximate rather than the 0px measured
on desktop — still far closer than an unadjusted fallback.

**Fix:** none sensible without per-platform measurement. Owner: us.

---

## Closed

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
