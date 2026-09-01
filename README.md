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

The homepage is seventeen sections in a deliberate order. The order is the
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
| 06 | Three pillars | The page's table of contents |
| 07 | Feature tour | What the software does |
| 08 | Community | The real differentiator vs cheaper tools |
| 09 | Step by step | The mechanism, then the course that teaches it |
| 10 | Founders | Who is behind it |
| 11 | Comparison | The decision they are making elsewhere |
| 12 | Pricing | The price, on the page most people see |
| 13 | FAQ | Last objections, answered in place |
| 14 | Assurance | Countries + guarantee |
| 15 | Final CTA | Pay now, **or** take a free door |

### Design pass status

Sections are being reworked top-down, one at a time, against the live site and
the client's notes. Everything below renders and is on the page; "built" means
it came out of the 29 Aug scaffold and has not had its pass yet.

| Section | State | Last worked |
|---------|-------|-------------|
| 01 Hero | **Passed** — entrance on the compositor, no WebGL | 31 Aug |
| 02 Proof bar | **Passed** — ink band of tone cards | 29 Aug |
| 03 Who it's for | **Passed** — rotating panels, font-swap re-measure | 31 Aug |
| 04a Proof wall | **Passed** — drifting evidence behind an ink card | 31 Aug |
| 04b Interviews | **Passed** — stage cycles all twelve | 31 Aug |
| 04c Receipts | **Passed** — figures on plates, closes with a door | 31 Aug |
| 04d Testimonials | **Passed** — ink band, two rows, swipe rail on mobile | 31 Aug |
| 06 Three pillars | **Passed** — wired as one system, cards tilt | 31 Aug |
| 07 Feature tour | **Passed** — sticky stepper, chosen from five shapes | 31 Aug |
| 08 Community | **Passed** — the 2am answer, drawn and typed | 1 Sep |
| 09 Step by step | **Passed** — staircase beside the course card, counted on a loop | 1 Sep |
| 10 Founders | **Passed** — the founder's book, and a third free door | 1 Sep |
| 11 Comparison | **Passed** — two columns read down, misses in red | 1 Sep |
| 12 Pricing preview | **Built** ← next | 29 Aug |
| 13 FAQ | **Built** | 29 Aug |
| 14 Assurance | **Built** | 29 Aug |
| 15 Final CTA | **Built** | 29 Aug |

Section 07 ends on a bridge line marked with **"never alone"** — section 08's
own headline, asked as a question. The two are joined already; rewriting 08's
headline breaks that hinge.

Section 08 draws a question being answered at 2am rather than asserting that
it would be: the thread composes itself, dots then typing, and the panel says
in words that it is an illustration. Two other shapes were built beside it and
deleted — one standing on the fifteen of eighteen reviews that raise support
unprompted, one laid out around captures nobody has supplied. If the client
ever supplies real chat captures, that third shape is the one to rebuild.

Section 09's shape was read off ecomsniper.io rather than designed: the steps
are a staircase beside the course card, not a row above it, and the card ends
on the instructors with both faces. **Check the live site before redesigning a
section** — this one had drifted a long way from it, and the live version was
better in three separate ways.

Sections 09 and 10 both introduce the founders, so they divide the job: 09
names them with their faces, 10 says why the software exists and hands over
the book. Section 10 is the one section with no live counterpart at all.

The playbook is the founder's own book. `ecomsniper.io/free-play-book` states
it — *"the exact system Sammy (CEO EcomSniper) used"* — and the cover artwork
in `thumb-security-guard-300k` says the same. That is why section 10 can offer
it as evidence rather than as another banner.

Section 11 is two columns read down, not a table read across: the version it
replaced put 925px of feature name between a row and its own answer. Both
columns carry all eleven rows, because a column showing only what it has is a
brochure rather than a comparison, and the two rows we lose stay in plain
sight. **A named-competitor version was built and deleted** — naming a real
tool means factual claims about someone else's product, which have to come
from the client with a checked date and be re-checked as their pricing pages
change.

### What changed against the old site, and why

- **The `$` now appears on the homepage.** It appeared nowhere before, and most
  visitors never load `/pricing`.
- **The unverifiable income claim is gone from the hero.** "99% make 1–3k/month"
  is replaced by a Trustpilot score that links to the live profile, the real
  member count, and the entry price.
- **The mechanism is explained where it is taught.** It was tried as its own
  section (05) a third of the page above the course that teaches the same four
  steps, and neither half mentioned the other. Section 09 now runs the steps
  first and the course under them, as the live site does — the steps are the
  syllabus, so explaining them is the argument for the course. `#how-it-works`
  stays on the feature tour, which is what the nav points at.
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
- **The homepage runs no WebGL context.** The hero's shader field was dropped on
  31 Aug: shader compilation is one uninterruptible main-thread block and it
  landed inside the first second, alongside React mounting, the font swap and
  the panel's images decoding. The static wash under it always carried the hero
  alone — it is what reduced-motion visitors already saw.
- **The hero entrance is CSS keyframes, not a GSAP timeline.** It plays during
  the busiest moment the page has, and `lagSmoothing(0)` (which Lenis needs)
  means GSAP jumps a stalled timeline forward rather than stretching it. On the
  compositor the timing holds through a blocked main thread.
- **A preloader is inlined in `index.html`**, markup and styles both, on screen
  at 79ms and removed once the first route paints. It is removed rather than
  faded, because an invisible fixed sheet swallows the first click. Its colours
  are literal copies of the CSS tokens — it renders before the stylesheet
  exists. Change a brand token, change these too.
- **Section 08's thread types on one rAF loop writing `textContent`, never
  through React state.** A character every 18ms through `setState` re-renders
  the subtree ~55 times a second. The text is rendered in full first and only
  cleared once the sequence starts, so no-JS and reduced-motion visitors read
  the finished conversation; each bubble stacks the typed layer over an
  invisible copy of the final sentence in one grid cell, so the card holds its
  height from the first frame instead of growing as it types.

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

1. Set `VITE_PLAYBOOK_ENDPOINT` and confirm the file actually delivers. Unset,
   the form fakes success and logs a warning — and every free door on the site
   leads to it. Section 10 now prints `PLAYBOOK.privacy` next to that door —
   *"your information is 100% secure and will never be shared"* — so whatever
   sits behind the endpoint has to be able to keep that promise.
2. Add routes for `/about`, `/blog`, `/contact`, `/help` and the four legal
   pages, or point those footer links at the existing site. Eight links 404
   today, and the guarantee copy leans on a refund policy that is not there.
3. Replace the step visuals in `FeatureTourSection` with real dashboard
   screenshots (same aspect ratio) — they are on-brand representations of what
   each step does, not captures.
4. Replace the seven member titles written in `AUDIENCE.people` with real
   ones if they exist — they are paraphrases of the client’s own sentences,
   flagged in `siteContent.js`.
5. Re-check the Trustpilot figures in `PROOF_BAR` before launch. They were
   corrected to 4.7 from 41 reviews on 29 Aug 2026 and will drift.
6. Repoint `FEATURES.items[].links` — Product Hunter, Competitor Research, AI
   Powered Lister and Price Monitoring go to `ecomsniper.io/*V6` because this
   site has no feature pages yet.
7. Remove `/design-lab`, or decide it stays. It is a 303-line internal
   comparison page from the 29 Aug build, still routed in `App.jsx`, in the
   production bundle, and not disallowed in `robots.txt`.
8. Delete `src/components/three/ReticleScene.jsx` and the `three`,
   `@react-three/fiber` and `@react-three/drei` dependencies, or find the
   reticle a home. Nothing has imported it since the hero's aurora was dropped.
9. Decide whether the founder's book summary belongs in `PROOF.videos`.
   `AIy19fmMutw` is "Full Summary of The Invisible Store" on Sammy's own
   channel — it is labelled honestly now and carries no figure, but it still
   sits among twelve videos section 04b introduces as *"members on what
   actually happened"*. Removing it takes that section to eleven.
10. Get a larger portrait of Marc. Sammy's is 800×800 now, taken from the
    client's own playbook page; `founder-marc.jpg` is still the original
    200×200, which caps him at roughly 100px on a retina screen.

**Done:** founder portraits are real photographs, resolved through
`import.meta.glob`; `PROOF.reviews` holds eighteen, so neither testimonial row
repeats a name; `/free-play-book` — the live site's URL for the playbook, and
the link in that video's own description — 301s to `/free-playbook` in
`netlify.toml`, `public/_redirects` and the router.
