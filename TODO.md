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

## Next — the footer does not hydrate

**Found 3 Sep while testing the consent banner. Pre-existing, from `63f9be1`.
Nothing to do with consent — the banner was just the first thing put in there
that needed JavaScript.**

`SiteChrome` is a `lazy()` import inside `<Suspense fallback={null}>`. Under
the SPA there was nothing to hydrate and it worked. Under prerendering the
server renders the whole subtree, and on a cold load the chunk has not arrived
when hydration runs — so React renders `null` where the server rendered all of
it, reports a mismatch, and abandons the markup. The HTML stays on screen,
owned by nobody, wired to nothing.

Measured on `/pricing` and `/privacy-policy` with a cold cache: **131 footer
elements, 0 with a React fiber.** The header hydrates normally (46 of 46). It
is a race, so it looks fine once the chunk is cached — which is why it went
unnoticed, and why it fails for exactly the first-time visitor who matters.

Dead on a cold load: the footer wordmark hover, `StickyConversionBar`,
`BackToTop`, `ConsultOffer`, `ExitIntentOffer`. Every footer _link_ still
works, being plain HTML — which is the whole reason nobody caught it.

The consent banner was moved out to `root.jsx` and the reopen control to the
cookie policy page, so consent does not depend on this being fixed. The rest
still does.

Three ways out, none free — **this is a call to make, not a task to pick up**:

| Option                                                     | Cost                                                                                                                           |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Drop the `lazy()` and import `SiteChrome` directly         | Undoes `49cff9c`. Adds its weight back to the first-screen bundle, which has 8KB of headroom left                              |
| Render it client-only (skip it during prerender)           | Keeps the perf win and fixes hydration, but the footer leaves the prerendered HTML — losing the internal links a crawler reads |
| Await the chunk in `entry.client.jsx` before `hydrateRoot` | Keeps footer HTML and the split, but delays hydration by one chunk fetch — the exact cost the split was buying                 |

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
