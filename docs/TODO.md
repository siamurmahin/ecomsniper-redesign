# TODO

Three lists: **Done**, **Now**, **Future**. Plus what is waiting on somebody
else, and what was decided and should not be re-argued.

See `ISSUES.md` for what is _wrong_. This file is what is _planned_.

## How this file is kept

Every instruction lands here before it is built. When something is asked for,
it is written into **Now** or **Future** first — say which, and if it is not
said, it is asked. Nothing is built that is not on the list, and nothing is
finished without moving to **Done** with the commit that did it.

Dates are absolute. A task moves the moment it is true, not at the end of a
session.

---

## Now

- **Microsoft Clarity, alongside GTM.** Decided 4 Sep, on the paste of their
  live privacy copy. Clarity is not gone: it comes back beside the GTM
  container rather than replacing it. Built the way GTM is — declared in
  `config/vendors.js`, loaded only from `src/third-party/`, consent-gated, and
  **inert until `VITE_CLARITY_ID` is set**, so it costs a visitor nothing until
  the client hands over an id. Behind **marketing**, not analytics: Clarity
  syncs with Microsoft Advertising and sets `MUID`, and their own policy says
  the data may be used for advertising. Same rule already written against GTM —
  the consent has to cover the worst thing a vendor might do.

- **Their Privacy Policy Disclosures section, restored verbatim.** Decided
  4 Sep. The Clarity and Microsoft Advertising paragraph, and the Microsoft
  Privacy Statement link, go back in as they wrote them. The **implied-consent
  sentence does not** — "By using our site, you consent to this data being
  collected" is not valid consent under GDPR and contradicts a banner that
  asks. That single change stands until someone says otherwise.

- **Clause 6.1 of the terms contradicts the rest of the site.** Their terms
  promise a flat 30-day refund from the date of purchase; the client told us it
  is monthly-plan only, and every marketing page here says so. It ships as they
  wrote it, because a contract is not ours to edit — but the terms are the
  document that governs, so the client has to decide which is true.
  **Before launch.** `ISSUES.md` 2b carries this and two smaller defects.

Nothing on the About page is in flight — see Parked below.

- **The About photographs.** Their giving gallery is five real images plus a
  founder portrait. **We hold optimised copies of all seven** in
  `src/assets/giving/` (`b02e651`) — an earlier note here claiming "we have
  none of them" was stale. What is still missing is a portrait big enough to
  use: theirs is 260 × 260 and goes soft above about 300px.
- **Their charity gallery contains a stock photo.** "Children smiling" is an
  Unsplash image sitting among real charity work, three screens under a promise
  not to create false impressions. Kept out of the hero wall by name. Raise
  with the client.

Nothing in flight. The environment work is finished and verified; the items
below are what it left behind.

| #   | Task                     | Why it matters                                                                                                                                       |
| --- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | The last expensive frame | Worst frame in the first second is still ~83ms after everything in Done. Total blocking work halved; this one frame did not move. Not yet attributed |

---

## Parked

- **The About page, and its hero.** Paused 4 Sep on request to move on to other
  pages. Nothing about it is lost, and it should not be restarted from scratch:

  - `src/pages/AboutHeroLab.jsx` holds **four passes of hero design**, ending
    on the direction that was closest — a dense two-column hero after
    shadcn hero-03, with a staggered wall of real Trustpilot reviews bleeding
    off both edges. It is **deliberately not routed**: an unrouted module is
    never bundled, so it costs nothing while it waits. One commented line in
    `src/routes.js` brings it back.
  - What the passes established, so it is not re-litigated: the earlier
    designs failed because they were sparse left-aligned text in one column,
    and because each carried five competing devices instead of committing to
    one. The references that fixed that are in `SESSION-NOTES-04-SEP.md` §9.
  - **Reviews, not photographs, in the hero.** Decided 4 Sep. It removes
    ~243KB from the first screen, keeps LCP as text, and the reviews
    corroborate the page's actual claim — that the team answers its own
    support — which a charity photograph cannot.
  - The **money-claim filter** in that file is not cosmetic. This page promises
    not to show earnings screenshots; the filter enforces it against the deck
    so a review added later cannot quietly break the promise.

  Still undecided when it resumes: whether the hero is that one, and whether
  the section order moves the offer up from 7th, which was agreed in principle
  and never built.

---

## Future

- **Win the 15KB back from the router runtime.** `errorBoundaries` is 107KB
  eager and `vendor-react` 187KB; neither has been examined. This is where the
  raised ceiling gets repaid.
- **An affiliate programme landing page**, if the client wants one — what an
  affiliate earns and how it works, with the terms linked from it. Their footer
  label promises this; the terms alone do not deliver it.

In the order the work wants to happen, not the order it was asked.

| #   | Task                                                                                                                                                                     | Waiting on                                                                               |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| 1   | **Storyblok CMS** — content fetched at build time, webhook triggers a Netlify rebuild, schemas mirroring `src/content/` file for file, so the CMS adds no runtime weight | **Pricing confirmation.** Do not start before it                                         |
| 2   | **New pages** — eight, listed in the Pages section below                                                                                                                 | Slug decisions and copy, per that section                                                |
| 3   | **Wire GTM and Clarity for real** — both loaders, the consent gate and the generated cookie policy are built and inert                                                   | `VITE_GTM_ID`, `VITE_CLARITY_ID`                                                         |
| 4   | **Playbook form endpoint** — the playbook form still fakes success; contact does not, it hands off to a mail client instead                                              | Deferred by decision until the move to the client's server                               |
| 5   | **Dashboard screenshots** — still mocks in `FeatureTourSection`                                                                                                          | Real captures from the client                                                            |
| 6   | **Tawk.to** — built and inert, loads on click behind consent when it returns                                                                                             | `VITE_TAWK_ID`, and a decision that it is coming back                                    |
| 7   | **Orphan CSS in the build** — `@react-router/dev` moves a 115KB server-build stylesheet into `build/client` where nothing links it                                       | Nothing. Costs deploy size, not visitor bandwidth. A post-build prune if it ever matters |
| 8   | **Vite 7 → 8.** `@react-router/dev@8.3.1` supports it (`vite: ^7                                                                                                         |                                                                                          | ^8`), and the reason it was backed out in `064d77e`is gone — that was`@vitejs/plugin-react@6`pulling a`@babel/core` release candidate, and that plugin is no longer a dependency at all | Nothing technical. Held deliberately: a bundler major can move chunking and CSS splitting, which is what most of 3 Sep went on. Wants a quiet moment and a before/after measurement, not a half-built site |
| 10  | **Decide how Careers and Blog are edited** — static now by decision. Storyblok, markdown in the repo, or something else, once the whole site is up                       | The client, after the site is complete                                                   |
| 11  | Login / registration / checkout                                                                                                                                          | Out of this phase entirely — payments and auth are not in scope                          |

---

## Pages — the full set, from their live site

Taken from `sitemap.xml` (23 URLs), cross-checked against the live nav and
footer, and against the route table inside their JS bundle. The three disagree,
which is itself a finding — see the note under the table.

Auth and dashboard are excluded on purpose: `/login`, `/register`,
`/dashboard/*`, `/activation/*`. Their own `robots.txt` disallows those, and
payments and auth are out of this phase.

### Built

| Page           | Route                                                          |
| -------------- | -------------------------------------------------------------- |
| Home           | `/`                                                            |
| Pricing        | `/pricing`                                                     |
| FAQ            | `/faq`                                                         |
| Free playbook  | `/free-play-book`                                              |
| Privacy policy | `/privacy-policy`                                              |
| Cookie policy  | `/cookie-policy` — ours, no equivalent on their site           |
| Careers        | `/careers` — static list; role description awaited from client |
| Affiliate      | `/affiliate` — their full terms, 11 clauses, both languages    |
| Terms          | `/terms-and-conditions` — their 15 sections, verbatim          |
| Contact        | `/contact` — their copy; the form never fakes a delivery       |

All of the above exist in both languages — nine pages, eighteen URLs, which is
exactly what `react-router.config.js` prerenders and what `sitemap.xml` lists.
Those three numbers agreeing is the check; when they last disagreed the sitemap
was four pages behind without anyone noticing.

**About is not on this list.** Its design was withdrawn in `c2c95b8` and there
is no `/about` route today. It sits in To build below.

### To build

| #   | Page                    | Route on their site                                   | Notes                                                                       |
| --- | ----------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------- |
| 4   | Competitor Research     | `/competitor-research` **or** `/competitorResearchV6` | Both live                                                                   |
| 5   | Price Monitor           | `/priceMonitorV6`                                     | In the nav and the bundle, **no sitemap entry and no non-V6 slug**          |
| 6   | Dropship Mastery course | `/course/dropshipMastery`                             | Sitemap also lists a lowercase `/course/dropshipmastery`                    |
| 7   | Blog index              | `/blog`                                               |                                                                             |
| 8   | Blog posts              | `/blog/<slug>`                                        | Nine in the sitemap. Template plus content — see below                      |
| 9   | About                   | `/about`                                              | Design withdrawn 4 Sep — copy, research and images kept, page rebuilt later |

### Decided 4 Sep

- **Feature-page slugs: the readable ones win.** `/product-hunter`,
  `/ai-powered-lister`, `/competitor-research`. The `V6` spellings become
  **301s onto them**, not deletions, so anything already linking or indexed
  against `/productHunterV6` keeps working. Same rule as `/free-playbook`,
  which is a 301 in `netlify.toml` and `public/_redirects` for the same
  reason. Each redirect ships with its page, never before it — a 301 onto a
  route that does not exist yet is a 301 onto a 404.
- **Price Monitor takes `/price-monitor`.** Their site has only
  `/priceMonitorV6` — no readable slug exists to inherit — so one is chosen to
  match the other three rather than leaving one page speaking camelCase. The
  `V6` spelling redirects onto it like the rest.
- **Where two versions of the copy exist, the newer one is the source.** Both
  spellings are live on their site with different words; `V6` reads as the
  later rewrite. Checked page by page rather than assumed, and recorded in the
  relevant `source-copy` file.

### Decided 3 Sep

- **Refund is monthly-plan only.** Not on the credits bundle, not on
  Enterprise. Their About page says "30-day refund policy" unqualified; the
  rebuild qualifies it, as the rest of the deck already does. Done — About
  states it in both languages.
- **$199 is the monthly charge from month two.** $97 is the first month. No
  mismatch — their About page framing "$200" is the monthly price.
- **Telegram is real** — `https://t.me/ecomsniper`, from the client. Their own
  footer link still points at `/pricing`. Now in ours.
- **Careers and Blog ship static first.** No CMS for either. Whether they move
  to Storyblok or something else is a conversation with the client once the
  site is complete — in Future below.

- **Careers stays**, and **all four feature pages stay.** They can come out
  later if they turn out not to earn their place.
- **Slug choice is deferred** — readable vs `V6` — and sits in Future below.
  It has to be settled before those four are built, because the loser needs a
  301 rather than a deletion.

### Source copy — captured 3 Sep

All twelve pages read from their live site and written to `source-copy/`,
each after `readyState === 'complete'`. Nothing left to extract.

Two of them cannot be rebuilt as-is. **Terms was listed here as a third and
should not have been** — the capture was taken before their page had hydrated,
and the page has fifteen full sections. Built in `42e0361`; the finding is
withdrawn as `ISSUES.md` 2.

- **Dropship Mastery** is the most claim-heavy page on their site: a
  "Six-Figure" income claim in an H2, a personal "$1,000,000 on eBay" figure,
  "over 2 billion transactions daily" for eBay stated as fact, and a
  "Limited Time Bonus" of three $97 items struck to $0 — which their own About
  page promises they do not do.
- **Price Monitor** has two bullets that repeat its own headline with one word
  swapped. It reads as placeholder.

Their **sitemap is stale for the blog**: nine posts listed, none of them in the
live index, which now carries twelve 2026-dated guides. The post list has to
come from the index, and their sitemap is advertising URLs that may 404.

### Still needs a decision

- **Which feature-page slugs are canonical.** Four feature pages exist twice,
  under a readable slug and a `V6` one, with different copy. The nav links to
  `V6`; the sitemap lists the readable slugs and omits Price Monitor entirely.
  Picking wrong means either building the stale copy or breaking the URLs
  Google already has. The client decides, and the losing slug should 301.
- **Whether the blog is nine static posts or a CMS collection.** Nine today,
  and a blog only grows. If posts are going into Storyblok this waits for it
  rather than being built twice.
- **Copy for About, Contact and Careers.** These make factual claims about the
  business, and their live pages are the source.
- **Confirmation that the terms are current.** Now transcribed verbatim from
  their page, dated 18 March 2025 — but a transcription is not a confirmation,
  and clause 6.1 already disagrees with what the client told us about refunds.
  See Now, and `ISSUES.md` 2b.

---

## Blocked — needs the client

| Item                                  | Detail                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Storyblok pricing                     | Free tier is one user; paid starts ~$99/mo. Flagged 3 Sep, still unconfirmed. **No CMS work should begin until this is answered** — schemas get built against whatever plan they buy                                                                                                                                                     |
| GTM container ID                      | Needed to fill `VITE_GTM_ID`. Until then GTM is wired but never loads                                                                                                                                                                                                                                                                    |
| Legal text needs sign-off             | The privacy copy is the client's own with two changes: the implied-consent sentence removed, and Microsoft Clarity replaced by what actually loads. The cookie policy, the terms' German translation and the whole German deck are new. **No lawyer has read any of it.** See the headers of `src/content/en/legal.js` and `en/terms.js` |
| Microsoft Clarity project id          | **Answered 4 Sep: Clarity stays, alongside GTM.** Declared in vendors.js, consent-gated behind marketing, inert until VITE_CLARITY_ID is set. Until it is, the privacy policy names a vendor the build does not load — ISSUES.md 11                                                                                                      |
| Privacy policy contradicts the banner | The live copy says _"By using our site, you consent to this data being collected"_ — implied consent, not valid under GDPR, and it contradicts asking permission                                                                                                                                                                         |
| Footer links                          | Those still pointing at `https://ecomsniper.io/*` are soft-404s on their site: `/about`, `/blog`, `/contact`. Careers, affiliate and terms now point at our own routes                                                                                                                                                                   |

---

## Decided — do not re-argue

- **Phase: build out, tune later.** Deep performance work waits until the site
  is complete. Until then nothing may cost speed without a decision taken in
  advance — see the speed gate in `CLAUDE.md`.

- **Stack stays React**, extended into the full production site: everything except login, registration and checkout.
- **SEO is fixed by prerendering, not meta tags.** Done.
- **CMS is Storyblok**, build-time fetch, webhook rebuild.
- **Consent is accept / reject / customise.** Categories: essential (locked), analytics, marketing. Consent Mode v2 denied by default.
- **GTM only.** One container carries GA4, Meta and TikTok. Clarity is not in the code.
- **Tawk.to loads on click**, never on page load, and behind consent.
- **Config is centralised**: `src/config/` for ids and toggles, `src/third-party/` for every external script, nothing external imported from anywhere else.
- **Base before new pages** — the developer's own instruction.

---

## Done

| Date       | What                                                                                                                                                                                                                                                                                                                                                                     | Commit    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| 4 Sep 2026 | **Photographs in the AI Lister gallery and Amazon panels.** Six grey squares replaced with stock garden photographs, since that panel is the one whose claim is what the software found. Measured at 177px, served at 360px; 219KB at quality 80 argued down to 88KB by swapping two noisy subjects and dropping to quality 50. Lazy, below the fold, eager JS unchanged | `45eda2c` |
| 3 Sep 2026 | **Prerendered routes.** Ten routes as real HTML, per-route title/description/canonical/hreflang, `lang` correct in both languages, real 404s. Deploy, Lighthouse, budget and lint pointed at the router's output; Node pinned to 22.22.0                                                                                                                                 | `63f9be1` |
| 3 Sep 2026 | **Consent environment.** `src/config/`, `src/third-party/`, `src/consent/`; Consent Mode v2 denied before anything can load; banner in both languages; `/privacy-policy` and `/cookie-policy` prerendered; `lib/trackingGate.js` deleted, Tawk moved to click-to-load                                                                                                    | `098c559` |
| 3 Sep 2026 | **Accessibility.** Six real markup defects — a `<dl>` of `<div>`s, `aria-label` on a bare `<span>`, `<h4>` under `<h2>`, focusable content inside `aria-hidden`, two accessible names not containing their visible text. Score 82 → 100                                                                                                                                  | `88c081d` |
| 4 Sep 2026 | **Client deck spec.** `docs/CLIENT-DECK.md` — 20 slides, white ground and black text, one red accent, written as build instructions for Canva. Every figure measured; the file says so and forbids inventing any                                                                                                                                                         | `44b47bc` |
| 4 Sep 2026 | **Affiliate terms, in both languages.** Their full 11-clause document; not a signup page, theirs has no form either. Footer gained the Affiliate row it was missing                                                                                                                                                                                                      | `299ccac` |
| 4 Sep 2026 | **Contact, in both languages.** Their copy, capture re-verified first. The form posts to `VITE_CONTACT_ENDPOINT` when set and otherwise hands the message to the visitor's mail client rather than faking success — theirs has no form action at all. Honeypot, real labels, one live region                                                                             | `483a5ba` |
| 4 Sep 2026 | **Terms and conditions, in both languages.** Never blocked — their page has 15 sections; the "empty page" note was a read before hydration, now withdrawn as `ISSUES.md` 2. Capture verified both ways before building: 37 of 37 clauses, 44 of 45 strings verbatim. Three defects reproduced, not fixed, and raised as 2b                                               | `42e0361` |
| 4 Sep 2026 | **Terms copy kept out of the eager deck.** In `content/*/legal.js` it cost 20KB eager on every route and fired the budget at 578KB. Moved to page-owned `content/en\|de/terms.js` behind `usePageContent`; 559KB with 16KB spare, +2KB all manifest                                                                                                                      | `42e0361` |
| 4 Sep 2026 | **Sitemap listed 8 URLs against 16 prerendered pages.** Careers, affiliate, privacy and cookies had all shipped without being added. Now 18, matching `react-router.config.js`                                                                                                                                                                                           | `42e0361` |
| 4 Sep 2026 | **Eager ceiling 560KB → 575KB.** Route-manifest growth, ~1KB per route, eager because hydration needs the route table. Agreed before building further; the 15KB comes back out of the router runtime later                                                                                                                                                               | `11a69f1` |
| 3 Sep 2026 | **Careers, in both languages.** Static list, no filters over a single role. The listing description is left blank rather than invented — theirs is placeholder text in production                                                                                                                                                                                        | `816ece3` |
| 3 Sep 2026 | **Audit of their live site.** 16 URLs, both languages, sitemap, tracking, markup and social measured directly; evidence in `docs/AUDIT-THEIR-SITE.md`, client fact sheet published separately. Corrected one earlier wrong claim about their sitemap                                                                                                                     | `816ece3` |
| 3 Sep 2026 | **About, in both languages.** Their copy kept close to verbatim; the refund qualified to the monthly plan, and their two empty sections left out rather than invented. Nav and footer now point at the local route instead of their live site                                                                                                                            | `edfc2a5` |
| 3 Sep 2026 | **Page copy stopped being eager.** Adding About to the global deck put its words in the chunk every route downloads — 7KB paid on the homepage by someone who never opens About, and ~80KB once the remaining twelve pages landed. Page decks now load with their route via `usePageContent`; eager JS 562KB (over) → 555KB                                              | `c6c8271` |
| 3 Sep 2026 | **Reverted a bad fix of mine.** See the note below                                                                                                                                                                                                                                                                                                                       | `7aa1cf0` |
| 3 Sep 2026 | **The page stopped painting itself and then hiding.** `js-motion` moved to an inline head script; it had been arriving after the bundle, so the prerendered page painted in full and every reveal then snapped to invisible                                                                                                                                              | `b9ba189` |
| 3 Sep 2026 | **Colour washes stop re-blurring through every fade.** Promoted to their own layer; the 52ms long task on the two sections nearest the top disappeared                                                                                                                                                                                                                   | `4436e81` |
| 3 Sep 2026 | **Metric-matched font fallbacks.** Measured rather than copied: Arial rendered a body paragraph 24px shorter than Montserrat; now 0px                                                                                                                                                                                                                                    | `1cd66b2` |
| 3 Sep 2026 | **The marquee's CSS ships with the page that renders it.** It sat in a lazy chunk while its markup was prerendered, so the loop rendered unstyled at 417px then snapped to 51px — a 366px reflow                                                                                                                                                                         | `8513d61` |
| 3 Sep 2026 | **Four heaviest below-fold sections skip first layout.** Style and layout 520ms → 169ms, long frames 1208ms → 591ms, document settling 684px → 248px, deep links still exact                                                                                                                                                                                             | `a504959` |
| 3 Sep 2026 | **Removed the reveal probe.** Diagnostic code added to measure late reveals on a real device; the question was answered, so it is gone — file, the `useEffect` in `root.jsx`, and the now-unused import                                                                                                                                                                  | `7917e4b` |

### The mistake, kept on purpose

`b171f93` was diagnosed on the **dev server** and never checked against a
production build. In dev, Vite serves modules unbundled, so a lazy chunk is
still in flight during hydration and the footer genuinely does not hydrate. In
production it always did — measured afterwards at 129 of 129 elements, on both
earlier commits. The "fix" then caused the fault it was meant to prevent: the
page began discarding its own prerendered markup, 3,488 nodes down to 806.

Cost, all production: long tasks scrolling from load 281ms against 51ms; worst
frame 122ms against 64ms; accessibility 82 against 100.

**Measure the production build.** Dev-only hydration behaviour is not a bug,
and a Lighthouse run against a page still settling is not a measurement.

### Also worth knowing

**82% of the prerendered HTML — 425KB of 518KB — is delivered inside
`<div hidden id="S:0">`** and moved into place by inline script, because
`HomeBelowFold` is `lazy()` inside `<Suspense>`. `<main>` as served holds 2
sections; the document has 15. It costs no layout time, and Google runs
JavaScript so indexing is unaffected — but "prerendered" is less literal than
it sounds, and a naive scraper reads that content out of a hidden container.
