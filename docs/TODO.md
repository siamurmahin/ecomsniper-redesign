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

Nothing in flight. The environment work is finished and verified; the items
below are what it left behind.

| #   | Task                     | Why it matters                                                                                                                                       |
| --- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | The last expensive frame | Worst frame in the first second is still ~83ms after everything in Done. Total blocking work halved; this one frame did not move. Not yet attributed |

---

## Future

In the order the work wants to happen, not the order it was asked.

| #   | Task                                                                                                                                                                                                 | Waiting on                                                                               |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 1   | **Storyblok CMS** — content fetched at build time, webhook triggers a Netlify rebuild, schemas mirroring `src/content/` file for file, so the CMS adds no runtime weight                             | **Pricing confirmation.** Do not start before it                                         |
| 2   | **New pages** — eleven, listed in the Pages section below                                                                                                                                            | Slug decisions and copy, per that section                                                |
| 3   | **Wire GTM for real** — loader, consent gate and cookie policy are built and inert                                                                                                                   | `VITE_GTM_ID`                                                                            |
| 4   | **Playbook form endpoint** — every form currently fakes success                                                                                                                                      | Deferred by decision until the move to the client's server                               |
| 5   | **Dashboard screenshots** — still mocks in `FeatureTourSection`                                                                                                                                      | Real captures from the client                                                            |
| 6   | **Tawk.to** — built and inert, loads on click behind consent when it returns                                                                                                                         | `VITE_TAWK_ID`, and a decision that it is coming back                                    |
| 7   | **Orphan CSS in the build** — `@react-router/dev` moves a 115KB server-build stylesheet into `build/client` where nothing links it                                                                   | Nothing. Costs deploy size, not visitor bandwidth. A post-build prune if it ever matters |
| 8   | **Vite 7 → 8.** `@react-router/dev@8.3.1` supports it (`vite: ^7                                                                                                                                     |                                                                                          | ^8`), and the reason it was backed out in `064d77e`is gone — that was`@vitejs/plugin-react@6`pulling a`@babel/core` release candidate, and that plugin is no longer a dependency at all | Nothing technical. Held deliberately: a bundler major can move chunking and CSS splitting, which is what most of 3 Sep went on. Wants a quiet moment and a before/after measurement, not a half-built site |
| 9   | **Pick the feature-page slugs** — readable (`/product-hunter`) or `V6` (`/productHunterV6`). Both live now with different copy; nav points at `V6`, sitemap at readable. Whichever loses needs a 301 | The client. Blocks pages 5–8                                                             |
| 10  | **Decide how Careers and Blog are edited** — static now by decision. Storyblok, markdown in the repo, or something else, once the whole site is up                                                   | The client, after the site is complete                                                   |
| 11  | Login / registration / checkout                                                                                                                                                                      | Out of this phase entirely — payments and auth are not in scope                          |

---

## Pages — the full set, from their live site

Taken from `sitemap.xml` (23 URLs), cross-checked against the live nav and
footer, and against the route table inside their JS bundle. The three disagree,
which is itself a finding — see the note under the table.

Auth and dashboard are excluded on purpose: `/login`, `/register`,
`/dashboard/*`, `/activation/*`. Their own `robots.txt` disallows those, and
payments and auth are out of this phase.

### Built

| Page           | Route                                                |
| -------------- | ---------------------------------------------------- |
| Home           | `/`                                                  |
| Pricing        | `/pricing`                                           |
| FAQ            | `/faq`                                               |
| Free playbook  | `/free-play-book`                                    |
| Privacy policy | `/privacy-policy`                                    |
| Cookie policy  | `/cookie-policy` — ours, no equivalent on their site |

All of the above exist in both languages.

### To build

| #   | Page                    | Route on their site                                   | Notes                                                                                      |
| --- | ----------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 1   | About                   | `/about`                                              | In the sitemap and the nav. Footer currently links out to it                               |
| 2   | Contact                 | `/contact`                                            | In the sitemap and the nav                                                                 |
| 3   | Terms and conditions    | `/terms-and-conditions`                               | In the sitemap. The guarantee copy leans on it                                             |
| 4   | Careers                 | `/careers`                                            | In the nav, **not** in the sitemap                                                         |
| 5   | Product Hunter          | `/product-hunter` **or** `/productHunterV6`           | Both live, different copy                                                                  |
| 6   | AI Lister               | `/ai-powered-lister` **or** `/aiListerV6`             | Both live                                                                                  |
| 7   | Competitor Research     | `/competitor-research` **or** `/competitorResearchV6` | Both live                                                                                  |
| 8   | Price Monitor           | `/priceMonitorV6`                                     | In the nav and the bundle, **no sitemap entry and no non-V6 slug**                         |
| 9   | Dropship Mastery course | `/course/dropshipMastery`                             | Sitemap also lists a lowercase `/course/dropshipmastery`                                   |
| 10  | Blog index              | `/blog`                                               |                                                                                            |
| 11  | Blog posts              | `/blog/<slug>`                                        | Nine in the sitemap. Template plus content — see below                                     |
| 12  | Affiliate               | `/affiliate/join`                                     | Their footer "Affiliate" link points at `/login`, not at a page. Confirmed as one to build |

### Decided 3 Sep

- **Refund is monthly-plan only.** Not on the credits bundle, not on
  Enterprise. Their About page says "30-day refund policy" unqualified; the
  rebuild qualifies it, as the rest of the deck already does. Fix when About is
  built.
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

### Still needs a decision

- **Which feature-page slugs are canonical.** Four feature pages exist twice,
  under a readable slug and a `V6` one, with different copy. The nav links to
  `V6`; the sitemap lists the readable slugs and omits Price Monitor entirely.
  Picking wrong means either building the stale copy or breaking the URLs
  Google already has. The client decides, and the losing slug should 301.
- **Whether the blog is nine static posts or a CMS collection.** Nine today,
  and a blog only grows. If posts are going into Storyblok this waits for it
  rather than being built twice.
- **Copy for About, Contact, Terms and Careers.** These make factual claims
  about the business. Their live pages are the source, but Terms in particular
  should not be transcribed without the client confirming it is current.

---

## Blocked — needs the client

| Item                                  | Detail                                                                                                                                                                                                                                                                                         |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Storyblok pricing                     | Free tier is one user; paid starts ~$99/mo. Flagged 3 Sep, still unconfirmed. **No CMS work should begin until this is answered** — schemas get built against whatever plan they buy                                                                                                           |
| GTM container ID                      | Needed to fill `VITE_GTM_ID`. Until then GTM is wired but never loads                                                                                                                                                                                                                          |
| Legal text needs sign-off             | The privacy copy is the client's own with two changes: the implied-consent sentence removed, and Microsoft Clarity replaced by what actually loads. The cookie policy and the entire German translation are new. **No lawyer has read any of it.** See the header of `src/content/en/legal.js` |
| Clarity vs GTM                        | The live privacy policy names Microsoft Clarity and Microsoft Advertising; the 3 Sep plan named GTM/GA4/Meta/TikTok. Built GTM-only. The client needs to confirm Clarity is genuinely going, and update the live policy text to match                                                          |
| Privacy policy contradicts the banner | The live copy says _"By using our site, you consent to this data being collected"_ — implied consent, not valid under GDPR, and it contradicts asking permission                                                                                                                               |
| Footer links                          | Eight point at `https://ecomsniper.io/*` pages that are soft-404s: `/about`, `/blog`, `/careers`, `/contact`, `/terms-and-conditions`. The legal ones matter most — the guarantee copy leans on a refund policy that is not there                                                              |

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

| Date       | What                                                                                                                                                                                                                                                                  | Commit    |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 3 Sep 2026 | **Prerendered routes.** Ten routes as real HTML, per-route title/description/canonical/hreflang, `lang` correct in both languages, real 404s. Deploy, Lighthouse, budget and lint pointed at the router's output; Node pinned to 22.22.0                              | `63f9be1` |
| 3 Sep 2026 | **Consent environment.** `src/config/`, `src/third-party/`, `src/consent/`; Consent Mode v2 denied before anything can load; banner in both languages; `/privacy-policy` and `/cookie-policy` prerendered; `lib/trackingGate.js` deleted, Tawk moved to click-to-load | `098c559` |
| 3 Sep 2026 | **Accessibility.** Six real markup defects — a `<dl>` of `<div>`s, `aria-label` on a bare `<span>`, `<h4>` under `<h2>`, focusable content inside `aria-hidden`, two accessible names not containing their visible text. Score 82 → 100                               | `88c081d` |
| 3 Sep 2026 | **Reverted a bad fix of mine.** See the note below                                                                                                                                                                                                                    | `7aa1cf0` |
| 3 Sep 2026 | **The page stopped painting itself and then hiding.** `js-motion` moved to an inline head script; it had been arriving after the bundle, so the prerendered page painted in full and every reveal then snapped to invisible                                           | `b9ba189` |
| 3 Sep 2026 | **Colour washes stop re-blurring through every fade.** Promoted to their own layer; the 52ms long task on the two sections nearest the top disappeared                                                                                                                | `4436e81` |
| 3 Sep 2026 | **Metric-matched font fallbacks.** Measured rather than copied: Arial rendered a body paragraph 24px shorter than Montserrat; now 0px                                                                                                                                 | `1cd66b2` |
| 3 Sep 2026 | **The marquee's CSS ships with the page that renders it.** It sat in a lazy chunk while its markup was prerendered, so the loop rendered unstyled at 417px then snapped to 51px — a 366px reflow                                                                      | `8513d61` |
| 3 Sep 2026 | **Four heaviest below-fold sections skip first layout.** Style and layout 520ms → 169ms, long frames 1208ms → 591ms, document settling 684px → 248px, deep links still exact                                                                                          | `a504959` |
| 3 Sep 2026 | **Removed the reveal probe.** Diagnostic code added to measure late reveals on a real device; the question was answered, so it is gone — file, the `useEffect` in `root.jsx`, and the now-unused import                                                               | `7917e4b` |

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
