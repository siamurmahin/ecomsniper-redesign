# Session notes — 3 Sep 2026

Continues `SESSION-NOTES-01-SEP.md`. That session finished the homepage walk;
this one took the site from "one good page" to "a site being built out".

Read §6 first if you are short of time. **Three findings this session were
wrong, and all three failed the same way: reading a thing before it had
settled, then trusting the reading.** All three guards are now in `CLAUDE.md`.

---

## 1. Where this stopped, and what is next

About is built and pushed. **11 pages left.**

| Next up            | State                                                     |
| ------------------ | --------------------------------------------------------- |
| Careers            | Unblocked — static, plain list, copy captured             |
| Affiliate          | Unblocked — copy captured                                 |
| Contact            | Needs a form-endpoint decision                            |
| Terms              | **Blocked** — their page is empty                         |
| 4 feature pages    | Need the slug call (`/product-hunter` vs `/productHunterV6`) |
| Course             | Needs client sign-off on income claims — see `docs/source-copy/course-dropship-mastery.md` |
| Blog index + 1 post | Ships static; CMS decision deferred                       |

Branch state: everything is on **`prerender`** through `e1b6f42`. `main` is at
`797017a` and is not to be touched — a merge is a deploy, and that is the
user's call to time.

---

## 2. What shipped

Ordered by when, not by size.

| Commit    | What                                                                    |
| --------- | ----------------------------------------------------------------------- |
| `63f9be1` | Every page is prerendered HTML. Ten routes, per-route SEO, real 404s     |
| `098c559` | Consent environment. `config/`, `third-party/`, `consent/`; Consent Mode v2 denied inline before anything can read it; Tawk moved to click-to-load |
| `88c081d` | Accessibility 82 → 100. Six real markup defects                         |
| `7aa1cf0` | **Reverted** `b171f93` — see §6                                         |
| `b9ba189` | The page stopped painting itself and then hiding. 66ms flash gone        |
| `4436e81` | Colour washes stop re-blurring through every fade. 52ms long task gone   |
| `1cd66b2` | Metric-matched font fallbacks. Body paragraph reflow 24px → 0px          |
| `8513d61` | The marquee's CSS ships with the page that renders it. −380px → −14px    |
| `a504959` | Four heavy below-fold sections skip first layout. 494ms → 169ms          |
| `c86825c` | `docs/TODO.md` and `docs/ISSUES.md`, and the rule for keeping them       |
| `742daf9` | `CLAUDE.md` — the working agreement                                      |
| `233c4f9` | The speed gate written down                                             |
| `27775b6` | Telegram in the footer, with an address that works                      |
| `c6c8271` | Page copy loads with its route — see §5                                 |
| `edfc2a5` | **About**, both languages                                               |

Cumulative on the homepage: long frames **1208ms → 591ms**, document settling
**684px → 248px**, a11y **100**, TBT **0ms**, CLS **0.002**.

One frame of ~83ms in the first second is still unattributed. It is in
`TODO.md` under Now.

---

## 3. About, and the two deviations from their copy

Their About page is the best-written thing on their site, so it is kept close
to verbatim. Two deliberate departures, both recorded in
`src/content/en/about.js`:

1. **The refund is qualified to the monthly plan.** Their page closes on a flat
   "30-day refund policy". The credits bundle and Enterprise are final sale, so
   unqualified here would contradict the pricing page.
2. **Two of their sections render a heading and no body** — "How this started"
   and "What you actually get". Nothing was invented to fill them. The second
   is answered by the closing line the page already has; the first waits for
   the client.

A bug caught in my own first draft, worth remembering because it is the same
class as the mobile late-reveal complaint: I wrapped all seven bands in **one**
`useRevealOnScroll` ref. That hook buckets `[data-reveal]` by group name across
its whole scope and triggers each bucket off `els[0]`, so every
`SectionHeading` would have shared one `"heading"` group and the last band
would have revealed when the first scrolled in. Every homepage section calls
the hook on its own ref for exactly this reason.

---

## 4. Their site — what the inventory found

18 distinct page types, ~31 unique URLs. Copy captured into
`docs/source-copy/` (12 files), all read **after `readyState === 'complete'`**.

Three things the client needs to know:

- **Their sitemap is stale.** It lists nine blog posts and **not one** is in
  the live index. It is advertising URLs to search engines that may now 404.
- **Their terms page is empty**, and the guarantee copy leans on it.
  `ISSUES.md` #2, `high`.
- **The course page is the most claim-heavy page they have** — "Six-Figure",
  "$1,000,000 on eBay", "2 billion transactions daily", a "Limited Time Bonus"
  of three $97 items struck to $0. That last one is the same device their own
  About page promises not to use. None of it is mine to soften or to keep; it
  goes to them as a question with their own promise quoted back.

---

## 5. The speed gate, and the first thing it caught

The rule set this session: **the phase is building out, not tuning. If
something is about to cost speed, name the cost and get a decision before
building it, not after.**

About tripped it immediately. Re-exporting its copy from
`content/en/index.js` put both languages in the chunk **every** route
downloads — the header and footer read that deck on every page — and took the
budget from 8KB of headroom to **2KB over**. That is 7KB paid on the homepage
by someone who never opens About, and the 11 remaining pages would have added
roughly 80KB on the same path.

Fixed rather than paid for: `usePageContent` merges a page's own `en`/`de`
files with the same overlay rules, so the copy lands in that route's lazy
chunk. **562KB (over) → 555KB, 5KB spare.**

Rejected: raising the 560KB ceiling. It buys one page and leaves the same
problem eleven pages later.

`merge()` moved out of `content/index.js` into `content/merge.js` because that
file imports every word of both languages by design — importing the merge
function from it would drag the whole deck back into the chunk trying to
escape it.

---

## 6. The traps — three wrong findings, one shared cause

**Read this before quoting any measurement.** Each of these was reported
confidently and each was wrong.

### 6.1 The footer hydration bug that did not exist

Measured on the **dev server**: 0 of 131 footer elements hydrated. Diagnosed
`SiteChrome`'s `lazy()` + `<Suspense>`, restructured the app (`b171f93`).

Production measurement afterwards: the footer was **129/131 hydrated at both
earlier commits**. My fix caused a real regression — 3488 → 806 → 3530 nodes,
long tasks 281ms vs 51ms, a11y 82 vs 100, TBT 23 vs 0ms. Reverted in
`7aa1cf0`.

Cause: Vite serves modules unbundled in dev, so a lazy chunk is still in flight
during hydration. Production has no such gap.

> **Measure the production build, never the dev server.**

### 6.2 The CRLF diagnosis that was wrong twice

Claimed CI was blocked by 171 committed CRLF files. Both halves were wrong:
`git archive` on Windows applies `core.autocrlf` (48 CRLF pairs in the archive,
**0 in the blob**), and my `grep -c '\r'` was counting every line rather than
CRLF lines. The repo is LF (`i/lf` on 191 files) and Linux CI passes. Real
problem was local-only; fixed with one line in `.gitattributes`.

> **`git ls-files --eol` is the truth. `git archive` on Windows is not.**

### 6.3 The "broken" feature pages

Claimed `/ai-powered-lister` and `/competitor-research` never render. The user
said "Try again" and both loaded fine. Their site is slow to hydrate and I read
while `readyState` was still `interactive`. This also corrupted the slug
evidence — `/productHunterV6` was recorded at 316 chars when it is actually
1063 with all three steps explained.

> **A page is not readable until `readyState === 'complete'`.** A half-loaded
> SPA is indistinguishable from a dead one.

Both withdrawn issues are kept visible in `ISSUES.md` with the reasoning,
rather than deleted.

### 6.4 Two smaller ones

- **Colour-contrast false alarm.** The user approved darkening the `-deep`
  steps; I checked first and every token already passes (blue 6.82, red 5.30,
  green 4.97, gold 4.91). The flagged colours were blends of PipelinePanel's
  crossfading beats at partial opacity. Not applied, and said so.
- **A dangling commit hash.** Wrote a hash into a Done row, then `--amend`ed,
  orphaning it. Caught with `git merge-base --is-ancestor`. **A Done row is
  added after the work it records, never before.**

---

## 7. Open, and waiting on someone else

**Awaiting the client:** Storyblok pricing, GTM container ID, legal sign-off,
terms copy, dashboard captures, footer link targets, the feature-page slug
choice, and a decision on the course page's claims.

**Decided and recorded** in `TODO.md`: refund is monthly-plan only; $199 is the
charge from month two; Telegram is `https://t.me/ecomsniper`; careers and all
four feature pages stay; no CMS for now — careers and blog ship static; Vite 8
deferred to Future.

**Known gap:** `lhci` only audits `index.html`. About shipped unmeasured by it,
and so will the next 11 pages. Raised, not yet decided.

---

## 8. Housekeeping

Session notes are now a standing rule: **one dated note per day**, updated as
the work happens rather than written at the end. Naming follows the files
already here — `docs/SESSION-NOTES-DD-MMM.md`. Recorded in `CLAUDE.md` §Where
work is recorded.

All `.md` files were gathered into `docs/` this session (`64cbad4`), except
`CLAUDE.md`, which has to stay at the repository root to be loaded
automatically.
