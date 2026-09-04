# Session notes — 4 Sep 2026

Continues `SESSION-NOTES-03-SEP.md` without a break — the date rolled over
mid-session. Read that file's §6 for the measuring traps; they still apply.

---

## 1. Where this stopped, and what is next

**8 pages left.** Affiliate and terms are built and pushed.

| Next up             | State                                                             |
| ------------------- | ----------------------------------------------------------------- |
| Contact             | Needs a form-endpoint decision — the only thing blocking it       |
| Blog index + 1 post | Ships static; template shape captured                             |
| ~~Terms~~           | **Built.** It was never blocked — see §7                          |
| 4 feature pages     | Need the slug call (`/product-hunter` vs `/productHunterV6`)       |
| Course              | Needs client sign-off on the income claims                        |
| About               | Rebuild from their layout; copy, research and photographs kept    |
| Affiliate landing   | New, optional — see §3                                            |

Branch state: everything on **`prerender`**. `main` untouched.

---

## 2. The budget ceiling went up, deliberately

560KB → **575KB**, agreed with the user before building further.

What grew was never application code: it is the router's route manifest, about
**1KB per route**, and it is eager because hydration cannot begin without the
route table. At 557KB with ten pages to go, the budget would have fired on the
next page, and "make it lazy" — the answer that worked for page copy the day
before — has no purchase on a manifest the router needs in order to start.

Why this was the right 15KB:

- Prerendering already took paint off the critical path. The document draws
  from HTML with no JavaScript, so none of this touches LCP.
- What it does affect is hydration and TBT, and that has measured room:
  **0ms** total blocking time against **120ms** on the live site.

**Where the 15KB comes back:** `errorBoundaries` is 107KB eager and
`vendor-react` 187KB, and neither has been looked at. That is tuning work and
the phase is building out. Recorded in `TODO.md` under Future.

If the budget fires again on something that is not the manifest, it is a real
regression. Look before raising it.

---

## 3. Affiliate

`299ccac`. Their `/affiliate/join` is **not** a signup page — no form, no
inputs, no redirect to login. It is the programme's terms and conditions, a
public legal document, which is what affiliate terms are for.

So it is reproduced as one: 11 numbered clauses at a reading measure, no cards.
The numbers are content, because a clause gets referred to by number.

Their footer links "Affiliate" to `/login`, so today the terms are unlinked
while a password prompt sits where the programme should be. Ours links to the
page, and our footer gained the row it was missing entirely.

Two omissions, both deliberate:

- The **NEW / UPDATED badges** on clauses 2, 3, 4, 6 and 8. They date their
  edit and mean nothing to a first-time reader.
- The **commission percentage**. Their own terms decline to state it
  ("communicated separately"), so it is not ours to supply.

**Open question for the client:** whether they also want a programme *landing*
page in front of the terms — what an affiliate earns, how it works. That is
what "Affiliate" in a footer usually promises, and it is a different page.

The German translation is positionally mirrored against the English, because
the deck merges arrays **by index** — a clause added on one side without the
other silently shifts every clause after it. Adding one means editing both
files in the same commit. It is not legally reviewed and sits under the same
open item as the privacy and cookie policies.

---

## 4. Careers, from the tail of the 3 Sep session

`816ece3`. Static list. Their page renders four filter controls and a search
field above **one** listing; none of that survived, because a filter over one
row is furniture pretending to be a feature.

The role description is **left blank on purpose**. Theirs reads "This is a one
liner description" — placeholder text that reached production. Every other fact
about the role is real and kept. A job advert is a promise about work and pay.

German translates the page furniture and the role's location and type; title,
department and salary fall through to English deliberately. The terms of an
employment advert are not ours to translate unreviewed.

---

## 5. Two findings that touch our own build

Both came out of the audit and both are still with the user:

- **`t.me/ecomsniper` is a personal account** — "Sammy EcomSniper, Lead
  Developer", a Send Message button, no member count. It is in our footer
  labelled Telegram, which implies a community. The client supplied the
  address, so it has not been changed unilaterally.
- **`@EcomSniper` on X belongs to someone else** — an unrelated dormant
  Shopify account from 2016, one post, seven followers.

---

## 5b. The client deck

`docs/CLIENT-DECK.md`. Twenty slides, written as **build instructions** rather
than a document to interpret — Canva runs from the other end of the connector,
on the user's claude.ai account, not from this session.

Constraints the user set: white background, black text, presentation shape,
persuasive. So the design rules are explicit and restrictive — one red accent
for a broken number, green only on the three "already fixed" slides, 35 words
of body maximum, no icons or stock imagery. The file ends with an instruction
not to invent any statistic that is not in it, because the deck's whole force
is that every figure is checkable.

Two corrections caught before it shipped: a stray character in the German
table, and "Pages as real HTML: 16", which was true when the audit ran and is
now 20. The build grew between the measurement and the deck — worth watching
for on every future re-run of these numbers.

---

## 5c. About — the design pass

`ff66467`. The page was typeset, not designed: seven left-aligned prose bands,
the right 45% of each empty, a figure that read like a form field, and none of
the homepage's visual vocabulary — so it did not look like the same site.

Five changes, all from existing tokens and components. No images, no
dependencies, nothing new on the first screen.

The hero ships as one component with three variants behind a prop, and
**`/about-lab`** renders all three for the choice. Not prerendered, not
linked, marked noindex, and asserted at commit time to emit no document. It
gets deleted with the two losing branches and their content keys.

Two content restructures, both their words rearranged rather than new claims,
and both noted in `content/en/about.js`:

- `cost.hours` / `cost.unknown` — the first sentence of the cost section split
  so the hero can show it as a comparison. Delete with variant A if it loses.
- `giving.gifts` — the three things one sentence names, split into three
  cells. Bodies verbatim; labels are headers over their own words.

### The trap this pass found

A screenshot showed the ink panel rendering **grey** and the headings missing
entirely. It looked like a styling bug. It was not: the localhost tab was not
the *selected* tab, background tabs throttle `requestAnimationFrame`, and GSAP
runs on rAF — so every reveal was frozen mid-animation at `opacity: 0.088`.

Setting `style.opacity = '1'` does not fix it, because GSAP owns those inline
styles and overwrites them. What works is dropping `js-motion` from `<html>`
and removing the inline styles outright. Now in `CLAUDE.md`.

Same family as the three traps in the 3 Sep notes: **a thing read before it
had settled, and the reading believed.**

---

## 5d. About — the capture was wrong, and the rebuild with what was missing

**I built About on an incomplete capture.** The 3 Sep pass recorded two of
their sections — "How this started" and "What you actually get" — as rendering
a heading with no body, and the page shipped without them on that basis. The
file even argued the point: "a heading over silence reads worse than an
absence."

Both sections have full copy. The page was read before it had hydrated. That is
the **fourth** time this session's family of mistakes has bitten — see the
3 Sep notes §6 — and the first time it removed real client content from a
shipped page rather than just producing a wrong note.

What else the first pass missed:

- The hero's three lines — "The late shifts. The overtime. The tired mornings."
  — and its statement
- The giving section's "Every subscription helps us do a little more…"
- Their **six-image gallery**, with captions
- The **founder quote from Sammy**
- Seven photographs

Re-captured after `readyState === 'complete'`, then scrolling the whole page to
force lazy content, then waiting again. 5,179 characters against the
~2,600 first taken.

### What that changed

About went from six sections to nine, and from an essay to a page with
structure: hero lines as a tally, the giving gallery, the offer as three toned
cards, the founder quote as a figure. The design complaint and the capture
error had the same root — there was less content on the page than their page
has.

### Their gallery contains a stock photograph

"Children smiling" is served from Unsplash, among five real charity images,
captioned "Moments that matter". Not carried into the rebuild. It is a
credibility risk on the one page whose argument is honesty, and it sits three
screens under a promise not to create false impressions.

### Still open

The six real photographs are the client's own and we hold none of them. Tiles
render a labelled placeholder and take a `src` the moment there is one.

---

## 6. Housekeeping

Per the rule set on 3 Sep, this file was created when the date rolled rather
than at the end of the day, and is updated as work lands.

The 3 Sep note's §4 carried a claim that was later disproved — that their
sitemap listed dead blog URLs. It has been corrected in place there, in
`source-copy/blog.md`, and in `AUDIT-THEIR-SITE.md` §2. The real shape: 12 live
posts, 9 in the sitemap, **0 in both**.

---

## 7. Terms — the page that was never blocked

Built in both languages. It was on the Blocked list with "their page is empty",
and that was wrong.

### The fifth read-before-hydration, and the most expensive one

Their `/terms-and-conditions` carries **fifteen numbered sections, 9,730
characters**, headed "Last Updated: Tue Mar 18 2025". The 3 Sep capture recorded
423 characters and the line "Last Updated: Invalid Date", and everything
downstream followed from it: `source-copy/terms-and-conditions.md` said "there
is no copy to capture", `ISSUES.md` carried **"there is no terms of service, on
a site taking $199 a month"** as a high-severity finding about the client, the
footer pointed at their live site, and the page went on the Blocked list to wait
for a client who had nothing to send.

Same shape as About, About's re-capture, the feature pages, and the blog
sitemap. The difference is where it landed: this one became a written accusation
that the client had not written their own terms.

**Withdrawn in `ISSUES.md` as issue 2**, alongside the two already withdrawn
there. Three of the file's first three issues are now retractions of
measurements taken before a page had settled.

### What was done differently

The document was re-read after `readyState === 'complete'` plus a full scroll,
then **every clause was checked against the live DOM before a line of the page
was written** — both directions, ours against theirs and theirs against ours:

| Check                                       | Result                                  |
| ------------------------------------------- | --------------------------------------- |
| Numbered clauses on their page found in ours | 37 of 37                                |
| Our strings found verbatim in their page     | 44 of 45                                |
| The one difference                           | §15 sets their two-line address as one  |

That check is cheap and it is the only thing that separates this page from the
last four mistakes. It stays part of capturing a page.

### Three defects, reproduced rather than fixed

A rebuild that quietly improves a binding document creates a second version of
an agreement people have already accepted. So all three ship verbatim and go to
the client as questions, in `ISSUES.md` as issue 2b:

1. **Clause 6.1 promises a flat 30-day refund from the date of purchase.** The
   client told us it is monthly-plan only, and every marketing page here says
   so. Their terms do not — and in a dispute the terms are the document that
   governs. **This one needs answering before launch.**
2. **Clause 9.3 contains the literal `[USD$100]`**, square brackets and all — an
   unfilled template placeholder inside a liability cap.
3. **Refunds are directed to `sammy@ecomsniper.io`**, a personal address, while
   the published contact address is `management@ecomsniper.io`.

### The budget fired, and it was not the manifest

First build came in at **578KB against the 575KB ceiling**. The 4 Sep note above
says a fire that is not the route manifest is a real regression — so it was
measured against a stashed baseline instead of assumed:

| | baseline | first attempt | delta |
| --- | --- | --- | --- |
| route manifest | 12KB | 13KB | +1KB |
| eager JS | 557KB | 578KB | **+21KB** |

Only 1KB was the manifest. The other 20KB was the contract itself: it had gone
into `content/en|de/legal.js`, which `content/en/index.js` re-exports, so both
languages of a ~10KB legal document were **eager on every route** — downloaded
by everyone who lands on the homepage and never opens a contract. Exactly the
trap `CLAUDE.md` records from About, at three times the weight.

Fixed the documented way rather than by raising the ceiling: the body moved to
page-owned `content/en|de/terms.js`, imported by `routes/terms.jsx` and merged
with `usePageContent`, so it lands in that route's lazy chunk. `LegalPage` takes
an optional pre-merged `doc`; privacy and cookies are small and site-wide and
still read the deck. Only the **title** stays in the deck, because the other two
documents link to the terms by name.

**Final: 559KB, 16KB spare.** +2KB on the baseline, all of it manifest.

### Two things found on the way

- **The sitemap was listing 8 URLs while 16 pages were prerendered.** Careers,
  affiliate, privacy and cookies had all shipped without being added. Fixed with
  terms rather than after it — a half-listed sitemap is one defect, not four.
  Now 18 URLs, 9 pages × 2 languages, matching `react-router.config.js` exactly.
- **`vite preview` serves the SPA fallback for an extensionless directory URL.**
  `/terms-and-conditions` returned the homepage's title and `/pricing` did too,
  so it is pre-existing and not a regression; `/terms-and-conditions/` with the
  slash is correct, and so is the built file. Netlify serves these properly.
  Read the file in `build/client` before believing the preview server.

### A trap worth writing down

`*/` inside a block comment closes it. The path `content/*/index.js` in a JSDoc
header broke the build with a parse error 15 lines below where the comment
actually ended. Also: backticks in a bash `node -e` string are command
substitution, and they silently ate spans of prose from three different files
before it was noticed. **Write prose with the file tools, not through a shell.**

---

## 8. Clarity comes back, and the privacy policy goes back to theirs

The client pasted their live privacy copy. Checked against the live page before
acting on it — 3,349 characters, eleven sections, and it matches the paste.
Their page carries **no "Last Updated" line at all**, while its own Policy
Updates section promises "we will revise the Date".

Eight of their eleven sections were already carried across essentially verbatim.
The gap was the two that name Microsoft.

### The 3 Sep decision was reversed, and the site moved instead of the copy

On 3 Sep the rebuild dropped Microsoft Clarity and Microsoft Advertising from
the policy, reasoning that a policy must not name a vendor the site does not
load. Sound reasoning, wrong direction: **Clarity was never going away.** Asked
rather than assumed, and the client confirmed it comes back alongside GTM.

So their "Privacy Policy Disclosures" section is restored **verbatim** —
heatmaps, session recordings, click tracking, first- and third-party cookies,
the Microsoft Privacy Statement linked — and the site was changed to match the
document rather than the document cut to match the site.

**One sentence of theirs is still not here**, and it is now the only divergence
in the whole policy: _"By using our site, you consent to this data being
collected and used."_ That is implied consent. It is not valid under GDPR and it
contradicts a banner that asks. Kept out, and said so rather than done quietly.

### Clarity sits behind marketing, not analytics

A heatmap tool instinctively reads as analytics. It is not, here: Clarity
integrates with Microsoft Advertising and sets `MUID`, an advertising identifier
shared across Microsoft properties, and their own copy says the data "may be
used for advertising". The rule was already written in this repo against the GTM
container — _the consent has to cover the worst thing the vendor might do, not
the mildest_ — and a session recorder is the most invasive thing this site can
load. Marketing.

### What it cost

Built the way GTM already is: declared in `config/vendors.js` with its six
cookies, loaded only from `src/third-party/clarity.js`, consent-gated, and
**inert until `VITE_CLARITY_ID` is set** — with no id it creates no script at
all, which was asserted on the built page (`0` scripts from `clarity.ms`,
`window.clarity` undefined).

**559KB → 561KB eager, 14KB spare.** That is the loader and the declaration;
the runtime cost today is zero, and lands only when the client supplies an id.

`.env.example` documented none of the three vendor ids it needs. All three are
in it now.

### A link in a legal page, without putting markup in the deck

Their section ends by linking the Microsoft Privacy Statement inline. The copy
deck holds strings, and the alternatives were splitting one sentence across
three keys or putting HTML in content and trusting it — and content is untrusted
by rule. A section now takes an optional `link: { label, href }`, rendered on
its own line with `rel="noopener noreferrer"` so a policy page cannot leak a
referrer. German links the German statement.

### What this leaves open

**The privacy policy now names three vendors and the cookie table lists none.**
Both are right on their own terms: the table is generated and excludes any
vendor without an id, and no id is set. A reader cannot see that distinction —
they see a policy admitting to session recordings above a table saying this site
sets no cookies. It fixes itself when the ids arrive, and becomes a real defect
only if the site ships without them. `ISSUES.md` 11, to be checked before
launch.

---

## 9. Four passes at the About hero, and why the first three failed

Parked on request before a direction was chosen. The work is kept, unrouted, in
`src/pages/AboutHeroLab.jsx`. This section is the reasoning, so the next
attempt starts from pass four rather than from pass one.

### The failures, and what they had in common

- **Pass 1 — type and tone.** Four variants: a ledger, a founder portrait, a
  dark single sentence, an inverted hierarchy. Rejected: _"need better layout,
  I don't like any of them."_
- **Pass 2 — arrangement.** Split screen, homepage-parallel, magazine cover,
  asymmetric grid. Rejected: _"design is very poor and the layout is not good
  enough."_
- **Pass 3 — one device each**, after going and looking at work that lands.

The first pass varied typography and kept one column of left-aligned text
underneath — which is **the same criticism that killed the withdrawn design**
("seven left-aligned prose bands, the right 45% empty"). The second varied
arrangement but still gave every variant an eyebrow *and* a marked word *and* a
tally *and* a panel *and* two buttons. Five devices, none dominant.

**The lesson, which cost three passes: variety is not design.** Each variant
has to commit to one idea and subordinate everything else to it.

### What looking at real work changed

Three references, chosen for proximity to this brief rather than for fame:

| Reference | The device |
| --- | --- |
| [Linear](https://linear.app/about) | Scale and restraint — headline, one line, a full-bleed band, nothing else |
| [37signals](https://37signals.com/) | One saturated colour field; the content _is_ the design, as a numbered index |
| [Who Gives A Crap](https://au.whogivesacrap.org/pages/our-impact) | A documentary photograph interrupted by a shaped colour field |

None of the three puts an eyebrow label over its headline. All three were on
every variant of mine.

### Pass four, and the client's own references

The client then sent two shadcn/studio heroes (03 and 12). What transfers from
them is the **right column**: not a single card but a layered composition that
bleeds past its own bounds — cards running off the top and bottom of hero 03, a
subject overflowing its panel in hero 12. That is precisely what the earlier
passes lacked.

What does not transfer is their content. Hero 03 fills that column with revenue
dashboards, and this page says four screens down that it will not show
screenshots of big earnings because they create false hope.

### The decision that came out of it: reviews, not photographs

Asked whether the wall should be testimonials instead of charity photographs.
It should, and for a better reason than density:

- **~243KB comes off the first screen.** Six photographs made an image the LCP
  on a page that otherwise has none. `PROOF` is already re-exported from
  `content/en/index.js`, so the reviews are in the eager deck every visitor
  downloads — they cost **nothing**.
- **They corroborate the claim the page actually makes.** The page says "a
  small team… we read the support messages ourselves". The reviews say "they
  really want you to succeed", "the support puts them above and beyond other
  companies", "someone is on hand 24/7". A charity photograph cannot vouch for
  that; a stranger on a public Trustpilot profile can.

### The money filter is load-bearing

The hero filters out any review quoting a sum of money, in code:

```js
const QUOTES_MONEY = /\$|\bUSD\b|\bdollars?\b|\bprofits?\b/i;
```

Today it removes exactly one — "Cost 99 USD… made me 500 USD". It is there so
that a review added to the deck in six months by someone who never read this
file cannot put an income claim in the hero of the page that promises not to
make them. Verified in the rendered DOM: 16 cards, zero money figures.

**The video testimonials can never go in this hero.** They are titled
"$18K/Month", "$1,600 a month", "$100/Day".

### Also found while looking

`src/assets/charity/` is **44MB of video plus the Unsplash stock photo**, still
tracked and entirely unreferenced — the revert in `c2c95b8` removed the page
but not the assets. `charity-5.mp4` alone is 31MB, and it is in the history of
a public repository. Nothing imports any of it and none of it reaches the
build. Raised, not acted on: deleting from the working tree is easy, purging
history is a rewrite and the client's call.

## The AI Lister gallery got real photographs

The "images found" panel was six grey squares. It is the one panel on the page
whose whole claim is *what the software found*, and a grid of empty boxes says
nothing about that.

Six Unsplash photographs of garden work, under the Unsplash licence, in
`src/assets/lister/`. They are garden tools and planting rather than the
kneeler itself: the running example across both feature pages is a garden
kneeler, and there is no stock set of one product from six angles. Every panel
on the page is already captioned "Illustration of the interface", so the grid
is illustrative, and the `alt` is empty because the label above it already says
what the grid is.

### The example product was left alone deliberately

Changing it to something photographed from more angles would have been the
other way to solve this, and it touches far more than this panel: the seller
handle `homeandgarden_uk`, three extracted titles, the Amazon link list and the
sourcing row all name the kneeler, in English and German. Not worth it for six
thumbnails.

### The size was measured, and then argued down twice

The tiles render **177px** at a 1920 viewport, so the target is 360px for a 2x
screen — that is the `lister` row now in `scripts/optimize-images.mjs`.

First pass at quality 80 came out at **219KB** for six thumbnails, which is
absurd for a grid that occupies 531px of the page. Two of the six were the
problem and both for the same reason: `shovels on grass` alone was 42KB,
because grass and loose soil are noise and WebP pays per pixel of noise. Swapped
those two for flat-lays on plain surfaces and dropped quality to 50 — at a 2x
downscale that is invisible, and it is a mock interface, not the product.

**219KB → 88KB**, all six lazy, all below the fold, all with explicit
dimensions. Budget unchanged at 568KB eager: the glob is eager but it only
pulls in six URL strings, and this module is in the AI Lister route's chunk, so
the homepage never sees it.

### The Amazon panel gets the worst photograph, not the best

First pass reused the tile the gallery marks selected. Wrong, and the client
caught it: step 02 is the software finding better images, and that step only
reads if there is something to improve on. The Amazon panel now carries its own
photograph — an item dumped on pavement, which is what a source listing usually
gives you — and the clean flat-lay is what the tool comes back with. The two
panels are a before and an after rather than the same picture twice.

It is not one of the six, so it is imported directly and the gallery glob was
narrowed to `garden-*.webp`. Left as `*.webp` it would have become a seventh
tile against copy that says "6 found".

Fetched at 160px, because the panel renders it at 80px: 3.2KB, and under Vite's
4KB inline limit, so it ships as a data URI inside the route chunk rather than
a seventh request.

**A trap, for whoever checks this panel in a browser next.** Reaching it with
`scrollIntoView` leaves the reveal unfired and the section renders blank, which
looks exactly like a broken image — two screenshots were read that way before a
real wheel scroll showed the photograph sitting there fine. Same trap `CLAUDE.md`
already warns about with backgrounded tabs, in a new shape.
