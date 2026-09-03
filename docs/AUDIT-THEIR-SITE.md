# Audit — ecomsniper.io as it stands

Measured 3 Sep 2026. Raw evidence behind the client-facing fact sheet.

The fact sheet is a presentation; this file is the working record, so every
claim can be re-run and checked. Rendered pages were read only after
`document.readyState === 'complete'` — see `CLAUDE.md`, Measuring.

---

## 1. What a crawler receives

Sixteen URLs fetched with `curl`, no JavaScript:

```
unique titles       1
unique descriptions 1
unique canonicals   1
unique byte sizes   1     (6,024 bytes each)
<h1> in HTML        0
body text           0 characters
```

Body of every document:

```html
<body>
  <div id="root"></div>
  <!-- Tawk.to -->
  <script>
    …
  </script>
</body>
```

Canonical on **every** URL, including `/de` and a URL that does not exist:

```html
<link rel="canonical" href="https://ecomsniper.io/" />
```

URLs tested: `/`, `/pricing`, `/about`, `/contact`, `/blog`, `/careers`,
`/terms-and-conditions`, `/privacy-policy`, `/affiliate/join`,
`/course/dropshipMastery`, `/productHunterV6`, `/product-hunter`,
`/priceMonitorV6`, `/de`, `/de/pricing`, `/this-page-does-not-exist-12345`.

**Soft 404s.** The invented URL returns `HTTP 200`. So do `/favicon.ico` and
`/manifest.json`, both with `content-type: text/html` — the catch-all rewrite
serves the shell for every path.

Head tags that _are_ correct on the homepage: title, description, canonical,
8 Open Graph tags, 4 Twitter tags, `robots: index, follow`. Missing: any
JSON-LD structured data (0 blocks), any `hreflang`.

`og-image.png` is **1.24 MB** — heavy for a preview image.

## 2. Sitemap vs the live blog

```
live on /blog     12 posts
in sitemap.xml     9 posts
in both            0
```

Sitemap totals: 23 URLs, **0** `<lastmod>`, 23 `<priority>` (Google ignores
priority). No German URLs, no hreflang alternates.

Not in the sitemap at all: `/careers`, `/affiliate/join`, every V6 feature
page, and all twelve current blog posts.

**Correction to an earlier note.** `docs/source-copy/blog.md` previously said
the sitemap listed posts that no longer exist. It does not —
`/blog/how-we-avoid-vero-ebay-dropshipping` renders fully (9,419 chars, dated
Wed Apr 08 2026). The nine sitemap posts are live but no longer linked from
the blog index, which makes them orphans. The failure is the opposite
direction to the one first recorded.

## 3. English vs German, both rendered

| Measured         | `/`         | `/de`                  |
| ---------------- | ----------- | ---------------------- |
| Page height      | 11,682px    | 5,109px                |
| Body text        | 9,972 chars | 2,806 chars            |
| Headings (h1–h3) | 20          | 13                     |
| Images           | 27          | 4                      |
| Footer links     | 13          | **0 — no footer node** |
| `lang` attribute | `en`        | **`en`**               |
| Canonical        | `/`         | **`/`**                |
| hreflang         | none        | none                   |

German nav that stays German: `Über uns → /de/about`, `Preise → /de/pricing`.
German nav that reverts to English: `Dropshipping Kurs`, `Blog`, `Kontakt`,
`FAQ`.

## 4. Tracking and consent

Present:

- Reddit Ads pixel `a2_ghzwlgek4jvr` — `rdt('track','PageVisit')` only, no
  conversion events
- Microsoft Clarity `l9xxediqgg` — session recording
- Tawk.to live chat

Absent: GA4, Google Tag Manager, Meta Pixel, TikTok, any conversion event.

Consent: seven platforms checked (`cookieconsent`, `cookiebot`, `onetrust`,
`usercentrics`, `iubenda`, `klaro`, generic `consent`) — **none present**.
Clarity loads immediately. The site publishes a German version.

## 5. Markup defects

**Headings contain no spaces.** Each word is its own `inline-block` span with
no separator, so the text content is one run-together string:

```
rendered   IS THIS GOING TO WORK FOR YOU?
textContent  Isthisgoingtoworkforyou?
```

Confirmed on the first `<h2>`: 7 children, `word-spacing: 0px`, no
`aria-label`. Affects every section heading on the homepage.

Other: no `<header>` element on the page; 18 of 27 images have no `alt`;
27 of 27 have no `width`/`height`.

## 6. Claims

- Homepage, EN: "99% of EcomSniper users earn 1-3k/month per account after
  3 months"
- `/de`: the same claim, in **three** headings
- Course page: "Six-Figure", "$1,000,000 on eBay", "2 billion transactions
  daily" for eBay, and a "Limited Time Bonus" of three $97 items struck to $0

Their About page states they will not show earnings screenshots ("those create
false hope") and will not use countdown timers or limited spots.

## 7. Lighthouse 12, desktop preset, identical flags

|                | Live site | Rebuild |
| -------------- | --------- | ------- |
| Performance    | 75        | 96      |
| Accessibility  | 87        | 97      |
| Best practices | 78        | 96      |
| SEO            | 100       | 100     |
| LCP            | 2.8s      | 1.1s    |
| TBT            | 120ms     | 0ms     |
| CLS            | 0.021     | 0.001   |
| TTI            | 4.0s      | 1.1s    |
| Weight         | 1,928 KiB | 864 KiB |

Their failing a11y audits: prohibited ARIA attributes, contrast, iframe
without title, visible labels not matching accessible names.

Ours: one contrast warning, on text over a cross-fading background. Every
token passes measured on its own — the audit samples a mid-transition frame.
Logged, not claimed clean.

**Their SEO score is 100.** Lighthouse renders JavaScript and grades one page
in isolation, so it cannot see sixteen URLs claiming to be the same page. Say
this before the client runs Lighthouse themselves.

## 8. Social

| Platform           | State              | Evidence                                                                      |
| ------------------ | ------------------ | ----------------------------------------------------------------------------- |
| YouTube            | Live, misnamed     | `@sammyecomsniper`, channel titled "Sammy", 408 videos, 1.37K subs            |
| Discord            | Live               | `discord.gg/DGkSJ5QZww` resolves, linked in footer                            |
| Telegram           | **Personal**       | `t.me/ecomsniper` → "Telegram: Contact @ecomsniper", Send Message, no members |
| Facebook           | Personal profile   | `profile.php?id=61558534291940` — profile URL shape, not a Page               |
| X                  | **Someone else's** | `@EcomSniper` = unrelated Shopify account, joined 2016, 1 post, 7 followers   |
| Reddit             | Ads only           | Pixel running, no account or subreddit found                                  |
| Trustpilot         | Not linked         | Site mentions reviews, links to no review platform                            |
| Instagram / TikTok | Unverified         | Not linked from the site; existence not confirmable from outside              |

**Do not treat HTTP 200 as proof a social profile exists** — Instagram, TikTok,
X and LinkedIn all return 200 for profiles that do not. Verify by page content
or mark unverified.

## 9. Not done

Google Search Console was not checked — it needs client access, and it is the
only source for what Google has actually indexed. Everything above measures
what the site _sends_, not what Google _kept_. Do not claim anything about
their index position without it.
