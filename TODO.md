# TODO

What we are building, what is done, and what is waiting on someone else.

Updated as work lands — a task moves the moment it is true, not at the end of a
session. If something is planned, it is written here before it is built.

Status: **todo** · **wip** · **done** · **blocked** · **parked**

---

## Now — environment scaffolding

The base the client's developer asked for: existing pages, content and
environment solid before any new pages. Agreed 3 Sep 2026.

| #   | Task                                                                                                                                             | Status   |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| 1   | `TODO.md` — this file                                                                                                                            | **done** |
| 2   | `src/config/` — `site.js`, `vendors.js`, `consent.js`. Data only, no logic. Every ID and toggle lives here and nowhere else                      | **done** |
| 3   | `src/consent/` — decision store, Consent Mode v2 mapping, banner + customise panel, EN/DE copy                                                   | **done** |
| 4   | `src/third-party/` — `gtm.js`, `tawk.js`, loader registry. Nothing outside this directory may inject a script tag. Deleted `lib/trackingGate.js` | **done** |
| 5   | `/privacy-policy` and `/cookie-policy` — both languages, prerendered, footer links pointed at the local routes                                   | **done** |
| 6   | Verify — CI gates green, banner behaviour checked in both languages                                                                              | **done** |

Verified on a cold load with storage cleared: the banner appears, the customise
panel opens with every optional box unticked, saving analytics alone stores
`granted: ["analytics"]` and sends a Consent Mode update that flips
`analytics_storage` and nothing else, the decision survives a reload without
asking again, and the reopen button on the cookie policy clears it and brings
the banner back. Zero external scripts in the built HTML, fourteen routes
prerendered, format/lint/build/budget green.

### Decisions behind it

- **Consent UX is accept / reject / customise.** Two one-click paths plus a
  panel with per-category toggles. Reject is as prominent as accept, which is
  what German law wants and the site is bilingual DE.
- **Categories:** essential (locked on), analytics, marketing.
- **GTM only.** One container carries GA4, Meta and TikTok. Microsoft Clarity
  is dropped from the code — see the contradiction under Blockers.
- **Consent Mode v2 defaults are denied** for `ad_storage`,
  `analytics_storage`, `ad_user_data` and `ad_personalization`, granted for
  `security_storage`, written before GTM loads. An `update` follows the choice.
- **`VITE_GTM_ID` is empty for now.** Empty means GTM never loads, so this
  merges safely before the client provides a container.
- **Tawk.to moves to click-to-load**, behind consent. It loads on page load
  today.
- **Storyblok is not started** and should not start until the pricing question
  under Blockers is answered.

---

## Next — accessibility, and what was hiding it

**The footer hydration bug is fixed.** `SiteChrome` is gone, split in two:
`SiteFooter` is imported eagerly by `root.jsx` because it is content that
has to be in the prerendered HTML and therefore has to hydrate, and
`ConversionFurniture` (sticky bar, back-to-top, both dialogs) is client-only
behind `ClientOnly`, because none of it is content and none of it works
without JavaScript. Neither side can now disagree with the server: one is
rendered on both, the other on neither. Footer went from 0 of 131 elements
hydrated to 129 of 129, on every route, in both languages, with the console
clean. The furniture also left all fourteen prerendered documents, which it
had been bloating for nobody.

**Fixing it uncovered seven accessibility defects, and why nobody had seen
them.** While hydration was failing, most of `<main>` below the hero never
mounted — so Lighthouse was auditing a fraction of the page and scoring it 100. The whole page renders now, and the whole page fails:

| Audit                         | Where                                                                      |
| ----------------------------- | -------------------------------------------------------------------------- |
| `definition-list` + `dlitem`  | `ProofBarSection` — a `<dl>` whose direct children are `<div>`s            |
| `aria-prohibited-attr`        | `HeroSection` — `aria-label` on a bare `<span>` with no role               |
| `heading-order`               | `ProofWallSection`, `TestimonialsSection` — `<h4>` with no `<h3>` above it |
| `aria-hidden-focus`           | focusable descendants inside an `aria-hidden="true"` wrapper               |
| `label-content-name-mismatch` | the dashboard panel tabs — `aria-label` does not contain the visible text  |
| `color-contrast`              | micro-labels on ink; 1.02 against a 4.5 requirement                        |

None of these are in code this work touched. All of them are real, stable
across three Lighthouse runs, and were true before today — they were simply
never measured.

**This turns the CI accessibility gate red.** `lighthouserc.json` asserts
`categories:accessibility` at `error` with `minScore: 0.9`; the page scores
0.82. Six of the seven are small markup corrections. `color-contrast` is a
design call, not a markup one.

Worth knowing: every Lighthouse number reported before this fix was measured
against a page that was not fully rendering, so the morning's "a11y 100, perf
98" on `63f9be1` described less of the site than it appeared to.

---

## Blocked — needs the client

| Item                                  | Detail                                                                                                                                                                                                                                                                                         |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Storyblok pricing                     | Free tier is one user; paid starts ~$99/mo. Flagged 3 Sep, still unconfirmed. **No CMS work should begin until this is answered** — the schemas are built against whatever plan they buy                                                                                                       |
| GTM container ID                      | Needed to fill `VITE_GTM_ID`. Until then GTM is wired but inert                                                                                                                                                                                                                                |
| Privacy policy contradicts the banner | The live copy says _"By using our site, you consent to this data being collected"_ — implied consent, not valid under GDPR, and it contradicts asking permission. The sentence has to change when the banner ships                                                                             |
| Clarity vs GTM                        | The live privacy policy names Microsoft Clarity and Microsoft Advertising. The 3 Sep plan named GTM/GA4/Meta/TikTok. We are building GTM-only; the client needs to confirm Clarity is genuinely going away, and the policy text updated to match                                               |
| Legal text needs sign-off             | The privacy copy is the client's own, with two changes: the implied-consent sentence removed, and Microsoft Clarity replaced by what actually loads. The cookie policy and the whole German translation are new. **No lawyer has read any of it.** See the header of `src/content/en/legal.js` |
| Legal pages are invisible to crawlers | `/privacy-policy` renders client-side only — the served HTML is an empty `#root`, and every legal URL returns the same 6KB homepage shell under a 200. The rebuild fixes this for the pages it owns; the live site still has it everywhere                                                     |
| No cookie policy exists               | `/cookie-policy` renders blank on the live site. Ours is written fresh, generated from `config/vendors.js` so it cannot drift from what actually loads                                                                                                                                         |
| Footer links                          | Eight point at `https://ecomsniper.io/*` pages that are soft-404s: `/about`, `/blog`, `/careers`, `/contact`, `/terms-and-conditions`. Legal ones matter most — the guarantee copy leans on a refund policy that is not there                                                                  |

---

## Parked — deliberately not doing now

| Item                            | Why                                                                                                                                                                                                         |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playbook form endpoint          | `VITE_PLAYBOOK_ENDPOINT` is unset, so every form fakes success. Deferred until the move to the client's server                                                                                              |
| Dashboard screenshots           | Still mocks in `FeatureTourSection`. Fine for now                                                                                                                                                           |
| New pages                       | The developer was explicit: base first. Page list comes later                                                                                                                                               |
| Login / registration / checkout | Out of scope — payments and auth are not in this phase                                                                                                                                                      |
| Orphan CSS in the build         | `@react-router/dev` moves a 115KB server-build stylesheet into `build/client` where nothing links it. Costs deploy size, not visitor bandwidth. No config removes it; a post-build prune if it ever matters |

---

## Next up — after the environment

Not started, listed so the order is not re-argued later.

1. **Storyblok** — once pricing is confirmed. Content fetched at build time,
   webhook triggers a Netlify rebuild, schemas mirroring `src/content/` file
   for file, so the CMS adds no runtime weight.
2. **New pages** — page list still to come from the client.

---

## Done

| Date       | What                                                                                                                                                                                                                                                 |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3 Sep 2026 | Prerendered routes (`63f9be1`). Ten routes as real HTML, per-route title/description/canonical/hreflang, `lang` correct in both languages, real 404s. Deploy, Lighthouse, budget and lint all pointed at the router's output; Node pinned to 22.22.0 |
