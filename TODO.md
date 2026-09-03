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

## Note — the footer hydration "bug" was a dev-server artifact

Recorded because it cost a day and the mistake is easy to repeat.

While testing the consent banner, a footer button did nothing. Measuring on the
**dev server** showed the whole footer unhydrated — 0 of 131 elements with a
React fiber, on several routes. The diagnosis was that `SiteChrome`, a
`lazy()` import inside `<Suspense fallback={null}>`, suspends on the client
while the server rendered the subtree, so React abandons the markup. `SiteChrome`
was split up to fix it: the footer imported eagerly, the furniture made
client-only behind a new `ClientOnly`.

**It was never true in production.** Measured after the fact, on production
builds served from `build/client`:

| Build                         | Page collapses during hydration? | Footer hydrated |
| ----------------------------- | -------------------------------- | --------------- |
| `63f9be1` prerender migration | no — 3483 to 3539 nodes          | yes             |
| `098c559` consent             | no — min 3475 nodes              | 129 of 129      |
| `b171f93` the "fix"           | **yes — 3488 to 806 to 3530**    | yes             |

Vite serves modules unbundled in dev, so the lazy chunk is a separate request
that has not arrived when hydration runs. The production build does not have
that gap. The fix addressed a condition that only exists on localhost.

Worse, it caused what it was meant to prevent. Making the furniture client-only
changed when the shared `hasHydrated` module flags in `DeferUntilPainted` and
`MountInSlices` get set, and the page began tearing itself down during
hydration — 3,488 nodes to 806, 16,968px to 3,130px, then rebuilt over ~320ms.
That is the thing `DeferUntilPainted`'s own comment exists to warn about.

Measured cost of the change, all production:

|                                | `098c559` before | `b171f93` after | reverted        |
| ------------------------------ | ---------------- | --------------- | --------------- |
| Long tasks scrolling from load | —                | 281ms over 4    | **51ms over 1** |
| Worst frame                    | —                | 122ms           | **64ms**        |
| Lighthouse a11y                | 100              | 82              | **100**         |
| TBT                            | —                | 23ms            | **0ms**         |

Reverted in the commit that carries this note. The seven accessibility failures
it appeared to expose were the same artifact: with the page in flux during the
audit, axe sampled elements mid-animation. Six were still genuine markup
defects and their fixes are kept (`88c081d`); the seventh, colour contrast, was
entirely the artifact — every `-deep` token already clears 4.5:1 (blue 6.82,
red 5.30, green 4.97, gold 4.91 on the sunk band), and what Lighthouse measured
were blends of the PipelinePanel's crossfading beats at partial opacity.

**The lesson: measure the production build.** Dev-only hydration behaviour is
not a bug, and a Lighthouse run against a page that is still settling is not a
measurement. Both traps were hit in one day.

Still open, and genuinely pre-existing: scrolling immediately after load costs
one ~51ms long task and a 64ms worst frame. Mild, at the threshold rather than
over it, and not yet attributed.

---

## Temporary — reveal probe, delete when answered

`src/lib/revealProbe.js` plus four lines in `root.jsx`. Loads only for
`?probe=reveal`, as its own chunk, so a normal visit neither runs nor
downloads it. It records, per `[data-reveal]` element, how far the page was
scrolled while that element sat inside the viewport still invisible.

There to answer one question that could not be reproduced here: text sections
reported appearing late on a phone. A maximised desktop window cannot be shrunk
to a phone viewport, and the browser that emulates one throttles
requestAnimationFrame to a couple of frames a second — which distorts the exact
animation timing in question. So it gets measured on the real device.

**Delete both once the answer is in.**

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
