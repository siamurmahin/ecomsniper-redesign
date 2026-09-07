# 8 September 2026

Continues from `SESSION-NOTES-07-SEP.md`. Nothing is committed yet at the time
of writing; the hashes go in when it is.

## About took three sections from the homepage, and left one behind

`FoundersSection` after the origin, `InterviewsSection` and
`TestimonialsSection` after the team. Imported, not copied — one component,
two pages, so a change to a founder's copy moves both.

**`ReceiptsSection` was deliberately not among them.** Its three cards are
`$5,059.44 in 31 days`, `4,224 active listings` and `2 accounts at all-time
highs`, and four screens above them the boundaries section says, in the
client's own words, *"We will not show you screenshots of big earnings. Those
create false hope."* Raised before building rather than after; the user chose
to leave them out and the client is told it is reversible.

### The money filter came back, and it removes two, not one

The About hero enforced it until the hero became `PipelinePanel` on 7 Sep. It
is now on the page rather than the hero: any review quoting a sum of money is
dropped, and `TestimonialsSection` grew an optional `reviews` prop to take the
filtered list — the homepage passes nothing and is unchanged.

The note inherited from the old hero said it removed "exactly one of eighteen".
Counted on the built page: **16 cards, not 17**. The second is the review
reporting 200,000 USD of revenue, which is the big-earnings claim this page
bans arriving as a review rather than a screenshot. The comment and `TODO.md`
were corrected to match what was measured.

## Login and registration, from their DOM rather than their HTML

`WebFetch` on `/login` returned "no content": their site is an SPA slow enough
to hydrate that a plain fetch gets the shell. Read out of the live DOM after
`readyState === 'complete'` instead, and captured in `docs/source-copy/auth.md`.

**Their `/register` is not a registration page.** It is step one of a two-step
checkout, with an order summary and a "Proceed to Secure Payment" button. Ours
covers step one and says where step two would begin, which is how it stays
inside the scope line rather than quietly building a checkout.

Two things in their content are not carried, both flagged in Blocked:

- **The headline** — *"99% of People Who Use EcomSniper for 3 Months Make
  1-3k/month"*. `CLAUDE.md` has banned that exact claim by name since the
  start, and it sits on the page where somebody is about to pay.
- **"Must be 6 characters."** Six is below every current guideline. The design
  asks for eight with no composition rules; their server still accepts what it
  accepts, which is a change only they can make.

Neither form posts, stores or logs anything, and both say so before anybody
types. The ceiling went **590 → 596** for four routes, decided with the number
in front of it rather than after — and the note in `check-budget.mjs` that
called 590 "the last raise the build-out needs" was corrected rather than
quietly edited: it was true of the plan as it stood, and the plan grew.

## Every door on the site now points at this site

`SIGNUP_URL` and `loginUrl` were `https://ecomsniper.io/*`. One line each, and
because `CtaButton` reads the leading slash, every CTA became a router `Link`
in the reader's own language.

Two `<a href={SITE.loginUrl}>` in `SiteHeader` had to move with them. They were
anchors because the URL used to be external; left alone they would reload the
whole application to reach a page the router already holds — **the same fault
the nav fixed on 7 Sep, arriving again through a URL that stopped being
external.** Worth the rule: when a link's target moves in-house, the element
type is part of the change.

Audited across all 53 built documents: no link to `ecomsniper.io` anywhere.

## The hydration error that was not there

Measured a React `#418` on every page in the production build and nearly filed
it as a regression of issue 12. It was the measuring.

**`vite preview` serves `index.html` for every path.** `curl` on it returns the
homepage document for `/about`, so the browser hydrates the About route into
the homepage's HTML and React regenerates the tree — on every page, exactly
like the bug that was fixed on 5 Sep. `netlify.toml` has no SPA rewrite; its
catch-all is a 404. Served through something that resolves `<path>/index.html`
and 404s otherwise: **no console errors on any page.**

The trap is now in `CLAUDE.md` beside the others. It is the third time this
project has been fooled by the tool doing the measuring rather than the thing
being measured, and the first two are already written down there.

## What the sweep found

Every link in every document, every heading, every image, every route at
390px. Clean: no broken internal links, no `#` hrefs, no `target="_blank"`
without `noopener`, no duplicate ids, no missing `alt`, no missing or doubled
`h1`, no wrong `lang`, no horizontal overflow on any route.

Three real bugs, now issues 17–19:

- **The cookie banner's three buttons wrapped on a phone** — reported by the
  user. `.btn` is `px-7`, so three of them are ~414px of content in ~350px.
  Not only untidy: a lone Accept button does not look equal to two sitting
  together, and equal weight is what makes the reject valid.
- **Two tap targets under 24px** — "Watch it again" at 114 × **19**, and our
  own consent checkbox at 16px.
- **An empty registration form reported three problems out of four.** Two
  blank email fields compared equal, so the confirmation never flagged.

And one that is a decision rather than a fix: **every canonical points at
`ecomsniper.io`** (issue 20). Right the day this replaces their site at that
address, wrong while it is served from Netlify.

## Dropship Mastery, five changes and a lab that paid for itself

The hero panel was chosen from three built side by side at `/lab/course-hero`.
**The syllabus won.** What it beat is worth keeping:

- The four-node loop that shipped first was `bg-ink` on a hero that became
  `surface-deep` in `7e07b92` — a dark card on a dark ground. Its own header
  said it was drawn for a pale hero. And its four nodes were the four steps the
  section directly below expands, so the first screen spent its picture on the
  page's second section.
- The offer panel was strong and was a second copy of "What you get".

The lab and both losing panels are deleted in the same commit that picks the
winner. `src/routes/about-lab.jsx` was found still importing a page deleted on
7 Sep, which is the argument for deleting a lab the day it is answered.

The other four, all asked for after looking at the page:

- **The step cards lost the corner wash** — a 160px tinted circle bleeding out
  of the top right of each one, putting the loudest thing furthest from the
  words. The left rule and the numbered tile already say which stage it is.
- **Their example became three figures.** It went through two versions in one
  sitting: first a bordered three-column ledger, then — on the note that it
  could be much simpler — the hero's own device, a value with a label and a
  signal rule over the top, which is the pattern already carrying the
  Trustpilot score on the first screen. Same content, one less kind of
  container. What it costs, what it lists at, and the difference, with the
  sentence about fees under the number it qualifies. The difference is
  arithmetic on their own two figures and is not rendered at all if either
  stops parsing.
- **The offer's two columns are equal height**, and the button falls to the
  foot of the card rather than sitting halfway up it.
- **The instructors have faces**, at 64px from the 200px files the homepage
  already uses.
- **The objections took the homepage's accordion**, keeping this page's own
  questions. `defaultOpen={-1}`: every item is an objection, and opening one on
  arrival answers a doubt the reader may not have had.

Measured after: offer columns 522px each, the ledger's gap `$61`, all four
portraits loaded, the accordion opens and closes, no corner washes left, and
nothing overflows at 390px.

## Numbers

| | |
| --- | --- |
| Eager JS | 594KB / 596 (ceiling raised once, for the auth routes) |
| CSS | 134KB / 135 |
| Sitemap / documents | 44 URLs, 53 prerendered documents |
| Course chunk | 36KB, 11.6KB gzipped |

`npm run build` failed twice before passing on the third attempt, second route
in the list, empty message — issue 16, unchanged and still unexplained.

## The issue list, worked through for launch

Asked to fix everything in `ISSUES.md` because the design is done and the site
is going live. Eleven were open. What actually happened to them:

**Fixed:**

- **8 — dead CSS on every deploy.** `@react-router/dev` moves a stylesheet out
  of the server build into `build/client` and nothing links it. There is no
  config value that stops it, so `scripts/prune-orphan-css.mjs` now runs as the
  second half of `npm run build`. It deletes a stylesheet only when its
  filename appears in no HTML or JS in the build — measured: 136.1KB removed,
  and `root-*.css`, which is the same size and *is* referenced, correctly kept.
  That last part is the point: a size threshold would have deleted the wrong
  file.
- **20 — every canonical said `ecomsniper.io`.** Now `VITE_SITE_ORIGIN`, with
  the real domain as the fallback so local builds and CI are unchanged.
  `netlify.toml` sets it from `$DEPLOY_PRIME_URL` for previews. The catch was
  that `content/en/site.js` held a second copy of the string and that is the
  one `lib/meta.js` builds canonicals from — changing the config alone would
  have moved nothing at all.
- **13 — the favicon.** Fixed on 6 Sep and still sitting in Open, because the
  body said "Fixed" and the heading did not. Moved. So were 1, 2, 3, 12, 17,
  18 and 19: the Open list had eight settled entries in it, which is how a
  list stops being read.

**Downgraded on evidence:**

- **16 — the build flake, `high` → `medium`.** Both places that matter honour
  the pin: CI reads `node-version-file: .nvmrc` and `netlify.toml` sets
  `NODE_VERSION = "22.22.0"`. Every failure has been on this machine's
  unpinned 24.20.0, and no deploy has failed. Still untested on 22.22.0 —
  there is no version manager on this machine, and installing one is a change
  to the machine rather than to this repository. Today's tally: 9 failures, 6
  passes, every failure identical.

**Guarded rather than fixed:**

- **11 — the privacy policy names vendors the cookie table does not list.**
  Only the ids fix it and the client does not have them yet, so
  `npm run check:launch` now fails while a vendor is named in the copy with no
  id set. It is the last gate before a merge to `main`, it reads the built
  site rather than the source, and it also checks for anchors pointing back at
  `ecomsniper.io`, the canonical origin this build carries, `noindex` on both
  auth pages, and any stylesheet in the deploy nothing links.

  **It found two of its own false positives before it found anything real**,
  and both are worth keeping in mind for the next check somebody writes.
  Matching `ecomsniper.io` as a substring flagged their Trustpilot profile,
  which lives at `uk.trustpilot.com/review/ecomsniper.io`. Matching every
  `href` then flagged the canonical and all the hreflang alternates — `<link>`
  tags that are *supposed* to name the production domain, and my comment
  claimed they were outside the loop when they were not. It matches `<a>` on
  the host now, because what it is actually looking for is a visitor being sent
  from the new site to the old one.

**Left open, with the reason:**

- **4, 5, 6, 2b** are the client's: their soft-404s, their JS-only shell, their
  lawyer, their terms. 4 and 5 die the day this replaces them.
- **7 — the 83ms frame.** Not attributable with the tools here:
  `chrome-devtools-mcp` throttles `requestAnimationFrame` to a couple of frames
  a second, which `CLAUDE.md` already records, so any frame timing read through
  it is fiction. It needs a profiling pass in an untuned browser.
- **9, 10** have no sensible fix and are recorded so they are not re-found.
- **21 — German pages sharing English metadata** is the fallback working as
  designed. It is a translation backlog item, not a defect.
