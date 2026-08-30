# EcomSniper — marketing site rebuild

Conversion-focused rebuild of [ecomsniper.io](https://ecomsniper.io), built to the
approved copy deck (27 Aug 2026) and the funnel teardown that accompanied it.

**Stack:** Vite 5 · React 18 · Tailwind CSS 4 · GSAP 3 (ScrollTrigger) · Lenis · React Three Fiber

---

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

Copy `.env.example` to `.env.local` and set `VITE_PLAYBOOK_ENDPOINT` before the
playbook form can actually deliver.

---

## The funnel

The homepage is eighteen sections in a deliberate order. The order is the
product here — each one answers the question the previous one raises.

| # | Section | Job it does |
|---|---------|-------------|
| 01 | Hero | What this is, who it is for, **what it costs** |
| 02 | Proof bar | Checkable numbers, immediately |
| 03 | Who it's for | Self-identification |
| 04a | Proof wall | The volume of the evidence, and a door |
| 04b | Interviews | Members, in their own words |
| 04c | Receipts | Screenshots members posted themselves |
| 04d | Testimonials | Written Trustpilot reviews, two running rows |
| 05 | The model | The mechanism — **before** the feature tour |
| 06 | Three pillars | The page's table of contents |
| 07 | Feature tour | What the software does |
| 08 | Community | The real differentiator vs cheaper tools |
| 09 | Training | What a beginner actually gets |
| 10 | Founders | Who is behind it |
| 11 | Comparison | The decision they are making elsewhere |
| 12 | Pricing | The price, on the page most people see |
| 13 | FAQ | Last objections, answered in place |
| 14 | Assurance | Countries + guarantee |
| 15 | Final CTA | Pay now, **or** take a free door |

### What changed against the old site, and why

- **The `$` now appears on the homepage.** It appeared nowhere before, and most
  visitors never load `/pricing`.
- **The unverifiable income claim is gone from the hero.** "99% make 1–3k/month"
  is replaced by a Trustpilot score that links to the live profile, the real
  member count, and the entry price.
- **"How it works" moved up.** It used to sit near the bottom inside the course
  section, so a cold visitor met the feature tour before learning the business
  model. Nothing above it means anything without it.
- **The guarantee reads the same everywhere.** Previously an unqualified
  "no refunds, final sale" contradicted the 30-day guarantee. Refund terms are
  now stated per plan: the monthly plan is covered, the other two are not.
- **Three new sections**: founders, honest comparison, and pricing preview.
- **Reviews are no longer truncated mid-sentence**, and the results disclaimer
  sits under the proof rather than in a footnote.
- **A second door.** The old page had one exit — pay today — which loses the
  ~95% who are not ready. There are now free doors in the hero, in the final
  CTA, and on exit intent, all pointing at `/free-playbook`.
- **Three near-empty "who it's for" viewports** are collapsed into one screen.

---

## Structure

```
src/
├── components/
│   ├── layout/     Header, footer, smooth scroll, sticky CTA, exit intent
│   ├── three/      The hero's 3D reticle (lazy-loaded)
│   └── ui/         Buttons, headings, accordion, SEO, brand mark
├── data/
│   └── siteContent.js   Every word on the site, in one file
├── hooks/          useRevealOnScroll, useParallax
├── lib/            GSAP setup, shared Lenis handle
├── pages/          Home, Pricing, Playbook, 404
├── sections/       The homepage sections, one file each
└── styles/         Design tokens + component classes
```

**All copy lives in `src/data/siteContent.js`.** Wording changes never require
touching a component, and it is why the price and the guarantee cannot drift
between the homepage and `/pricing` — both render the same objects.

---

## Motion

- **GSAP + ScrollTrigger** for reveals and scroll-linked effects; **Lenis** for
  smooth scrolling. `src/lib/motion.js` registers plugins once.
- **All programmatic scrolling goes through `src/lib/smoothScroll.js`.** Native
  `scrollIntoView({behavior:'smooth'})` and Lenis ease toward different targets
  on every frame, and the page visibly drifts on its own. Don't reintroduce it.
- `html`/`body` use `overflow-x: clip`, not `hidden`. `hidden` turns the element
  into a scroll container, which breaks `position: sticky` and desynchronises
  Lenis from `window.scrollY`.
- **Reduced motion is a CSS-level guarantee, not a JS one.** Elements are hidden
  by `.js-motion [data-reveal]`, and the `prefers-reduced-motion` block forces
  them visible with `!important`. If the JS never runs, every word still shows.
- The 3D canvas mounts on `requestIdleCallback`, is skipped entirely for
  reduced-motion visitors, and ships in its own chunk that nothing else imports.

## Accessibility

Skip link, real landmarks, a proper tablist for the feature tour, an accordion
with `aria-expanded`/`aria-controls` and arrow-key navigation, visible focus
rings, and `aria-hidden` on every decorative layer. FAQ answers stay in the DOM
when collapsed so crawlers read them.

## SEO

Semantic headings (one `h1` per route), per-route metadata and canonicals via
`<Seo>`, `FAQPage` + `Product` + `Organization` JSON-LD, `robots.txt`,
`sitemap.xml`, and a `<noscript>` summary in `index.html`.

**Known gap:** the site is client-rendered, so link-preview scrapers that do not
execute JS see only the defaults baked into `index.html`. If that matters,
add [`vite-prerender-plugin`](https://www.npmjs.com/package/vite-prerender-plugin)
and move `<Seo>`'s tag writing into render so the prerendered HTML carries
per-route metadata.

---

## Before launch

1. Set `VITE_PLAYBOOK_ENDPOINT` and confirm the file actually delivers.
2. Replace the founder initials in `FoundersSection` with real portraits.
3. Replace `AppFrame` in `FeatureTourSection` with real dashboard screenshots
   (same aspect ratio) — it is an on-brand representation, not a capture.
4. Replace the seven member titles written in `AUDIENCE.people` with real
   ones if they exist — they are paraphrases of the client’s own sentences,
   flagged in `siteContent.js`.
5. Re-check the Trustpilot figures in `PROOF_BAR` before launch. They were
   corrected to 4.7 from 41 reviews on 29 Aug 2026 and will drift.
6. Pull more reviews into `PROOF.reviews`. Six are in the deck and the
   profile has 41; with six, both testimonial rows show every name twice.
6. Add routes for `/about`, `/blog`, `/contact`, `/help` and the legal pages, or
   keep those footer links pointing at the existing site.
