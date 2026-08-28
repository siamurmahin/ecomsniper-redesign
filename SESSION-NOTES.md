# Session notes — 28 Aug 2026

Everything changed in this session, why, and what is still open.

---

## 1. Ran the site and found where the last session stopped

`npm run dev` → http://localhost:5173. Production build passed (721 modules, 21.6s).

Last edits were **2:30 PM the same day** (`dev.log`): a polish pass over
`AudienceSection` → `FoundersSection` → `AssuranceSection` → `PillarsSection` →
`CommunitySection`. Nothing was left half-broken. All 15 homepage sections
rendered, all 4 routes worked, zero console errors.

Three problems found by walking the page:

| Problem | Verdict |
|---|---|
| Exit-intent modal fired mid-scroll | Real bug, fixed |
| ~256px of dead space at every section seam | Real, fixed |
| Wordmark read as "7eComSniper" | **Not** a broken asset — see §4 |

---

## 2. Exit-intent modal fired while scrolling

**File:** `src/components/layout/ExitIntentOffer.jsx`

**Cause.** The listener was `mouseout` on `document`. That event bubbles from
every element the pointer crosses, and reports `relatedTarget: null` whenever
the next element is not resolved yet. Captured one live while scrolling with a
stationary pointer:

```
{ y: 356, rt: null, trusted: true, tgt: SECTION }
```

A scroll moves content out from under a still pointer, and the browser reports
that as leaving.

**Fix.** `mouseleave` on `document.documentElement`, which only fires on a true
document exit, plus an `isTrusted` check and a 250 ms post-scroll cooldown.

**Verified:** 30 scroll ticks → zero `mouseleave` fires, modal stayed shut.

### A second bug behind it

The page scrolled away *underneath* the open dialog. `lenis.stop()` alone does
not hold it — it only ends Lenis' easing and hands the gesture back to the
browser, which scrolls natively. Now `wheel` / `touchmove` are blocked
non-passively along with the scroll keys.

`overflow: hidden` was deliberately **not** used: it turns the element into a
scroll container, which is exactly what the stylesheet's `overflow-x: clip` on
`html`/`body` exists to prevent.

**Verified** with a temporary force-open flag (since removed): 3×PageDown +
5×ArrowDown + space → `scrollY` stayed 0; dismissing restored scrolling.

That test also caught a flaw in the first attempt at the fix — keys aimed at
the dialog were exempted, but focus sits *on* the dialog and the dialog does not
scroll, so the exemption handed PageDown straight to the page. Only real input
fields keep those keys now.

**Not verified:** the true-exit path (pointer leaving out the top of the
viewport). `isTrusted` rejects synthetic events, so it cannot be automated.
Worth one manual check.

---

## 3. 256px gap at every section seam

**File:** `src/styles/index.css`

Not a per-section problem. `.section-band` pads both edges, so the visible gap
between two sections was exactly **2× `lg:py-32` = 256px** — identical at all
fourteen seams, about a third of a laptop viewport each time. The page read as
evenly spaced rather than paced.

```
py-20 sm:py-24 lg:py-32   →   py-16 sm:py-20 lg:py-24
```

Seams are now 192px. Page height **14409px → 13641px** (768px of dead space
removed).

Padding stays symmetric on purpose: the coloured bands (ink, paper-sunk) would
sit off-centre in their own colour block otherwise.

---

## 4. The logo — the earlier diagnosis was wrong

The asset is fine. The red "e" **is** a shopping cart — handle sweeping up-left,
two wheels below. It only collapsed into "7e" at 32px.

The real constraint: the reticle spans the full height of the artwork and the
lettering only 46% of it, so at `h-8` the text rendered ~14px. Stepped through
36 / 40 / 44 / 48px — 44px is where the cart handle survives.

- `BrandLogo`: `h-8` → `h-11`
- `SiteHeader` pill: `py-2.5` → `py-2`, so the bar height holds (61 → 62px)

Nav still fits at the `lg` breakpoint with ~50px slack.

---

## 5. Gold → blue accent

`#b8842f` was only a button hover state (`--color-gold-deep`). The colour
actually visible everywhere was its sibling `--color-gold` `#dca54c`, on 19
elements. The whole family was replaced, and the tokens renamed so the name
cannot lie about the value later.

```css
--color-accent:      #0064d2;  /* fills; white text on it = 5.4:1 */
--color-accent-deep: #0052ab;  /* hover / pressed */
--color-accent-soft: #5b9df0;  /* accent text + icons on ink = 5.9:1 */
--color-accent-wash: #eaf2fd;  /* background tint */
```

Four values because one blue cannot serve both grounds — `accent` is dark enough
to carry white button text, `accent-soft` light enough to read as text on ink.

**Measured in the live page:** sticky CTA 5.4:1, featured-plan text 5.9:1,
guarantee line 5.9:1. All pass WCAG AA. The old gold-on-ink text did not.

**Changed:** every CTA on a dark band, the "MOST PEOPLE START HERE" badge,
featured-plan price sub-text and check bullets, hero pulse ring and dot,
assurance shield and seal rings, both radial washes, the final-CTA aura (a
hardcoded `rgba(220,165,76,0.18)` that a grep for "gold" would have missed), the
3D reticle metal + particles + rim light, `::selection`, and the favicon dot.

Project-wide sweep for `gold|dca54c|b8842f|f7edda|220,165,76` returns one hit:
the comment explaining why it is gone.

---

## 6. Button hover states

**File:** `src/styles/index.css`

Three of the four variants only moved and changed shadow — no background
change at all.

| Variant | Rest | Hover background |
|---|---|---|
| `btn-primary` | ink `#1e1f23` | accent `#0064d2` |
| `btn-secondary` | paper `#fbfbfa` | accent-wash `#eaf2fd` + blue border |
| `btn-on-ink` | accent `#0064d2` | accent-deep `#0052ab` |
| `btn-ghost-on-ink` | transparent | accent-soft @ 15% |

The `.btn` base already transitions `background-color` over 300ms, so all four
cross-fade. Every button routes through `CtaButton`, so this covered the header,
sticky bar, pricing cards, final CTA and playbook form at once.

**Open question:** `btn-primary` turns *blue* on hover rather than a lighter
black. Consistent with the other three, but the main CTA changes hue, not just
value. `hover:bg-ink-soft` (`#2a2c31`) is a one-word swap if that is wrong.

---

## 7. Things already done before this session

Checked because they had been asked for and looked undone. They were not:

- **Font.** No monospace anywhere. `--font-label` is Bricolage Grotesque,
  loaded at `index.html:48`. The only match for "monospace" in the project is a
  comment explaining the swap.
- **Images.** All yours, byte-identical: 8 flags (`64*.png`), 3 logo files, both
  founder portraits, all 3 receipts. `og-image.png` is your artwork,
  recompressed 1.24 MB → 294 kB.
- **YouTube.** All five real IDs from `youtube.txt` are in
  `siteContent.js:122-149` — `SosyiNFvbVc`, `sTVqFsxxwIo`, `-cDk4ztkWaw`,
  `uW1LL8NSvaI`, `Bm9UKs-Lw_o`.

---

## 8. React Bits

License checked at source: **MIT + Commons Clause**. Free for commercial use in
the site; the clause only stops reselling React Bits itself. Not a runtime
dependency — source lives in `src/components/reactbits/`.

### Vendored

| Component | Where | Dependency |
|---|---|---|
| `CountUp` | proof bar figures | `motion` |
| `SpotlightCard` | the three pillar cards | none |
| `DotGrid` | hero background | gsap (InertiaPlugin) |
| `LogoLoop` | countries strip | none |
| `MagicBento` | design-lab only | gsap |
| `CardSwap` | design-lab only | gsap |

**`motion@13.1.1` is the only new dependency.** Split into its own chunk in
`vite.config.js` to match the existing vendor strategy.

### A bug caught before shipping

The proof-bar counters settled on **4.5** and **392+** — not 4.6 and 400+.
`useSpring` approaches its target asymptotically, so the figure left on screen
after the animation "ended" was simply wrong, on the one section whose entire
argument is that the numbers are checkable.

Fixed by swapping `CountUp` for the literal string from the copy deck the moment
it reports done, which also unmounts the spring so nothing can overwrite it.
Verified: `2.2 → 4.6`, `188+ → 400+`, exact.

`countTo` / `suffix` were added to `PROOF_BAR` in `siteContent.js` so the copy
deck stays the single source of truth. "24/7" and "eBay · Amazon" do not
animate — they are not quantities.

### Adaptations

- **`SpotlightCard.css` rewritten.** Upstream also paints the card — `#111`
  background, `#222` border, fixed padding and radius — which fought the design
  system. Kept the mechanism, dropped the surface, added the
  `prefers-reduced-motion` guard it did not have.
- **`MagicBento` given a `cards` prop.** It hardcoded its own six demo cards.

### Removed

`TargetCursor` (a crosshair cursor) was added and then **deleted at your
request** — component files, wrapper, route mount and the `cursor-target` class
on `CtaButton` are all gone.

---

## 9. Lightswind — blocked, needs you

MIT, supports Tailwind v4 + Vite, so it is a fine choice. But its components are
not in the public repo. The CLI pulls them from an authenticated registry:

```
GET https://lightswind.com/api/v1/components?name=border-beam
→ 401 {"error":"Unauthorized: Missing API Key"}
```

The CLI reads `LIGHTSWIND_API_KEY` or an `.lightswindrc`, and `init` is
interactive (prompts for framework and a colour theme). Two blockers: prompts
cannot be answered from here, and there is no key.

**Warning before you run it:** `init` registers a Tailwind plugin and writes a
colour theme, which could overwrite the accent tokens from §5. Pick
**`default` (Classic Blue)** — closest to `#0064d2`.

```bash
npx lightswind@latest init
```

Then name the components and they can be added with `npx lightswind add <name>`.

---

## 10. Visible changes now on the homepage

The first React Bits pass was too subtle to notice — `CountUp` fires once on one
bar, `SpotlightCard` only appears on hover. Two changes you can actually see
were added after that:

- **Hero dot field** (`DotGrid`). Dots scatter from the pointer and settle back,
  turning blue near it. Skipped under reduced motion, lazy-loaded.
- **Countries marquee** (`LogoLoop`). Replaces a static two-row wrap. Pauses on
  hover; screen readers get a plain static list.

---

## 11. `/design-lab` — awaiting your decision

**http://localhost:5173/design-lab** — internal route, not linked from the site.
Three directions for the feature tour, same copy, real tokens.

1. **Current** — tabbed list + app frame. Calm, reads like every other SaaS page.
2. **MagicBento, dark band** — spotlight, tilt, particles. Loudest.
3. **CardSwap** — copy left, four steps cycling through a 3D stack.

Known issues with option 2: the grid is designed for **six** cards and there are
four, so it sits lopsided; and its particles are still hardcoded purple in the
CSS — the blue only reached the glow. Both fixable, neither is a blocker.

**Recommendation: option 3.** Genuinely different, but it keeps the
top-to-bottom reading order the funnel was built around. Option 2 gives that up.

Delete `src/pages/DesignLabPage.jsx` and its route in `App.jsx` once a direction
is picked.

---

## Still outstanding

Carried over, not addressed this session:

1. **Dashboard screenshots** — `FeatureTourSection.jsx:15` still uses `AppFrame`,
   an on-brand mock, not a capture. Four needed, matching the four steps:
   Product Hunter results, the listing composer, the price/stock monitor, the
   one-click order screen. Landscape, ~1200×750 or wider, same aspect for all
   four. The laptop in the OG image is the right screen but far too low-res.
2. `VITE_PLAYBOOK_ENDPOINT` is unset — the playbook form delivers nothing.
3. Confirm the live Trustpilot score matches the stated 4.6 from 90+ reviews.
4. No routes for `/about`, `/blog`, `/contact`, `/help` or the legal pages —
   the footer links point at nothing.
5. `npm run lint` fails: no `eslint.config.js` exists (ESLint 9 requires flat
   config). The script is aspirational.

## Build

Clean throughout. Final:

```
vendor-motion     9.10 kB gzip   (new)
vendor-gsap      33.30 kB gzip
vendor-react     52.78 kB gzip
index            77.51 kB gzip   (includes /design-lab)
vendor-three    221.24 kB gzip   (lazy)
```

---

# Session notes — 29 Aug 2026

## 12. ESLint — the lint script now runs

`npm run lint` had no config at all (ESLint 9 needs flat config), so the script
was decoration. `eslint.config.js` added, plus five dev dependencies:
`eslint`, `@eslint/js`, `globals`, `eslint-plugin-react`,
`eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`.

Two decisions worth recording:

- **`react-hooks` v7 ships the React Compiler rule set in its recommended
  config.** Enabling it produced 8 errors, nearly all inside vendored React
  Bits components ("Cannot call impure function during render", "Cannot access
  refs during render"). This project does not run the compiler, so only the two
  classic rules are on: `rules-of-hooks` (error) and `exhaustive-deps` (warn).
- **`react/jsx-uses-vars` is pulled in from `eslint-plugin-react`.** Without
  it, `no-unused-vars` cannot see a component that is only referenced from JSX
  and reports 118 false warnings — every component import in the project.

Four real findings, all fixed: unused `Icon` imports in `SiteFooter`,
`ProofBarSection` and `TrainingSection`, and a stale
`eslint-disable-next-line react-hooks/exhaustive-deps` in `DotField`.

**`npx eslint .` is now silent. `npm run build` clean.**

## 13. The colour system was wrong — one accent, not four

Checked the live site as asked. Its stylesheet
(`/assets/index-4afdf710.css`) resolves to seven brand values, and the count
of each tells the story:

```
#dca54c gold   49   #86b817 green  29   #e53238 red 19
#08457e navy   18   #0064d2 blue   16   #f5af02 yellow 12   #16191d ink 27
```

Walking the page shows what they are *for*. **Colour there is identity, not
decoration.** Every enumerated thing owns one of eBay's four colours and keeps
it across its icon tile, number chip, edge rule and corner wash:

| | Live site | Rebuild before | Now |
|---|---|---|---|
| Pillar 01 software | blue | blue | blue |
| Pillar 02 community | gold | blue | gold |
| Pillar 03 training | green | blue | green |
| Steps 1–4 | blue, red, green, gold | blue ×4 | blue, red, green, gold |
| Hero ticks | blue, gold, green | green ×3 | blue, green, gold |

The rebuild had one blue everywhere. Every card in a row was the same colour,
so nothing in a list of three or four was distinguishable by anything except
its position.

### The signal set

`--color-signal-{blue,red,green,gold}` in `index.css`, three values each, for
the same reason the accent needs four — the brand value is a fill, not a text
colour:

| | plain (fills) | deep (text on paper) | soft (text on ink) |
|---|---|---|---|
| blue | `#0064d2` | `#0052ab` 6.4:1 | `#5b9df0` 5.9:1 |
| red | `#e53238` | `#c1272d` 5.6:1 | `#ef7a76` 6.1:1 |
| green | `#86b817` | `#547310` 5.3:1 | `#9ed420` 9.3:1 |
| gold | `#dca54c` | `#8a6318` 5.2:1 | `#e8b866` 9.0:1 |

Raw brand values as text fail badly — green 2.3:1 and gold 2.1:1 on paper —
which is why the deep variants exist and why the live site's own coloured chip
labels do not pass AA.

**Gold is back**, deliberately. Removing it as the site accent (§5) was right:
it had spread across buttons, prices and body copy as a de facto primary. As
one of four signals carrying one pillar, it is what the brand actually does.

**Glyph colour is part of the tone, not a constant.** Blue and red tiles carry
a paper glyph (5.6:1, 4.3:1); green and gold are too light for white even at
the 3:1 non-text bar (2.4:1, 2.2:1) and take an ink glyph instead (7.0:1,
7.5:1).

### Applied

- `src/lib/signalTones.js` — one lookup table, since `bg-signal-${tone}` would
  compile to nothing: Tailwind only emits classes it can see in the source.
- **Pillars** — filled tile, dashed number chip, corner wash, and an edge rule
  that draws itself along the bottom on hover or focus.
- **Feature tour** — each card wears its step's colour as a top edge, which is
  the only part of a card visible while it sits behind the front of the stack.
  The stack now reads as four distinct things instead of one card redrawing
  itself. The nav dots take the active step's colour (the `deep` variant: the
  plain green and gold miss the 3:1 bar a state indicator needs).
- **Hero ticks** — three facts, three colours.
- **Header** — the four colours as a hairline under the bar, faded in with the
  condensed state, as on the live header.

## Still outstanding

Unchanged from the previous session, except that item 5 is done:

1. **Dashboard screenshots** — `FeatureTourSection` still uses `AppFrame`.
2. `VITE_PLAYBOOK_ENDPOINT` is unset.
3. Confirm the live Trustpilot score matches the stated 4.6 from 90+ reviews.
4. `/about`, `/blog`, `/contact`, `/help` and the legal pages still have no
   routes. `/terms` and `/privacy` are parked at your instruction — the other
   six can be written from copy already in `siteContent.js`.
5. ~~`npm run lint` fails~~ — done, §12.
6. `/design-lab` still awaits a direction (§11).

## 14. Hero rebuilt — brand gradient, and a panel that says something

### The gradient

Red to blue, as asked, as the site's **one** gradient. Three stops, not two: a
straight red→blue ramp passes through a dead grey-violet at the midpoint, so a
magenta stop at 48% keeps the middle saturated.

```css
--gradient-brand: linear-gradient(135deg, #d0212a 0%, #8e2a86 48%, #0064d2 100%);
```

The red end is `#d0212a`, **not** the signal red `#e53238`: white on the signal
red is 4.3:1, which fails AA for button text. Every point along this ramp
clears 5.3:1 against white — checked by sampling the ramp at 2% steps, not by
eye.

It carries three things only — the primary button, the hero badge, and the
marked phrase in the headline. A gradient on more surfaces than that stops
signalling anything. The four signal colours (§13) still do the identity work.

### What was removed

- **The cursor-reactive dot field.** It moved under the headline while the
  headline was being read, which is the one thing hero decoration must not do.
- **The floating 3D reticle.** It was the reason the first split hero failed:
  an object with nothing to say, in the most expensive space on the site.

Removing the reticle took `three` and `@react-three/*` out of the graph:

```
vendor-three  821.95 kB → 1.98 kB   (221.24 → 1.15 kB gzip)
```

`ReticleScene.jsx` and the dependencies are still in the project — the chunk
is empty, not deleted. Say the word and they come out of `package.json` too.

### What replaced it — `components/hero/PipelinePanel.jsx`

One product moving through the software, in four beats: **found → listed →
watched → paid**. Each beat wears its step's colour from the signal set, and
each shows the two numbers behind it. It answers the question the headline
raises — *what actually happens after I sign up?* — by showing it rather than
claiming it.

Rules it keeps:

- **Labelled as an illustration**, in words, under the panel. No fabricated
  dashboard, no numbers dressed up as a live account. The figures are
  deliberately ordinary ($38.90 order, $13.20 profit): the argument is that it
  repeats, not that it is spectacular.
- **The rail is a control**, four real buttons. A click stops the autoplay for
  good.
- **Reduced motion** gets all four beats as a plain list — which is also what
  renders if the JS never runs.
- **A live region** names each beat as it comes forward.
- **A footer strip** naming eBay and Amazon: the one fact in the panel that is
  not an illustration.

The panel is also the slot for the real dashboard screenshots when they exist
(outstanding item 1) — same geometry, image above the copy.

### Layout

Split again, but top-aligned rather than centred: the copy column is the taller
of the two and centring left a hole above the window. The headline needed its
own ceiling — `--text-hero-split: clamp(2.3rem, 3.7vw, 3.55rem)`, because at
the full `--text-hero` it broke as "ESCAPE THE / 9 TO 5", splitting the one
joke the headline makes. The full-width heroes on `/pricing` and
`/free-playbook` keep `--text-hero`.

The two beginner objections ("no experience needed", "an active community") are
now a divided strip under the ticks instead of three floating cards.

**Known overlap:** the proof bar directly below repeats "eBay · Amazon", which
the panel footer now also states. One of the two should change when that
section gets its pass.

## 15. Hero, second pass

**Gradient, dialled back.** It was on the badge, the button, the headline mark
and the panel's top edge — four things in one viewport, which made the ramp the
loudest voice on the page and left it nothing to emphasise. Now on two: the
marked phrase and the primary button. The badge is ink again; the panel's top
edge tracks the active beat's colour; the ramp survives as ambience in the
background.

**Looping background** — `components/hero/HeroAurora.jsx`, wrapping React Bits'
`SoftAurora` (an `ogl` shader; ogl was already a dependency). Three
constraints, all about the field it replaces:

- `enableMouseInteraction={false}` — it does not follow the pointer.
- Masked to `82% 2%`, so it sits over the panel side and never behind the copy.
  No line of type is read against moving colour.
- An `IntersectionObserver` unmounts the canvas once the hero scrolls past —
  WebGL keeps a rAF loop alive for as long as it is mounted.

**Headline animation** — GSAP `SplitText`, now registered in `lib/motion.js`.
All GSAP plugins are free from 3.13 and this project is on **3.15**, so
SplitText, ScrambleText, Flip, DrawSVG, MorphSVG, MotionPath and Observer are
all available with no dependency to add.

The headline is now one paragraph of copy split at runtime with
`type: 'lines,words', mask: 'lines', autoSplit: true`, rather than three
hand-written lines. Hardcoded spans animate the author's idea of the line
breaks; the split measures the visitor's. `autoSplit` re-splits on a late font
swap or a resize, which is what stops a slow reload from stranding half a
headline mid-animation. Words rise from behind a hard edge, 0.028s apart.

Both styled phrases are wrapped in `whitespace-nowrap` **including their full
stops** — SplitText treats a trailing stop as its own word, and the line was
breaking between "9 TO 5" and the stop that belongs to it.

**Panel timing — the progress bar is the clock.** Was 3.4s a beat on a
`setInterval` with a separate CSS bar; two clocks drifting apart every cycle.
Now there is no interval: the active rail segment animates for exactly
`BEAT_MS = 2100`, and its `animationend` advances the beat. The bar cannot
disagree with the content, pausing the animation pauses the sequence, and the
visitor can see how long is left. Transitions are 380ms, and outgoing beats
leave in the direction of travel so the strip reads as footage being pulled
past a window rather than as cards crossfading in place. Rows inside a beat
arrive 140ms and 250ms late, so the numbers get a moment of their own.

Four beats now run in 8.4s, down from 13.6s.

**The two objection boxes moved** out of the copy column to directly under the
panel, at its width. They answer what the panel provokes — *that looks like
software I could not drive*, and *I would be on my own with it* — so they
belong under the window, not under the headline.

## 16. Hero, third pass — the stepper rail

**React Bits `Stepper` was tried and rejected, on its API rather than its
looks.** It owns its step state with no controlled prop, ships a
Back/Continue footer built for a form, hardcodes a purple accent, and
spring-animates its height on every change. Driving it from an autoplay clock
would mean synthesising clicks on its own buttons. Its *pattern* is right —
numbered nodes, connectors that fill as you advance, a check once a step is
behind you — so that is rebuilt in `PipelinePanel`, in brand colour, on our
clock.

**This also fixed the jump between beats.** The old rail refilled a fresh
segment from zero on every change, so 1 → 2 read as progress going backwards.
Connectors now stay filled once passed: the line grows across the panel once,
beat one to the loop node, and the only thing that moves at the change is the
node scaling up. The connector out of the active node is still the clock — it
animates for `BEAT_MS` and its `animationend` advances the beat.

The rail ends in a dashed loop node rather than a fourth full stop: the
sequence repeats, which is the product's actual claim.

**Asymmetric crossfade.** Outgoing beats now clear in 180ms while the incoming
one takes 420ms. At equal durations both cards are legible through the middle
of the swap, and two sets of words on top of each other reads as broken rather
than as motion.

**The assurance row was rebuilt.** Three tick-marked sentences at one weight is
the shape of small print, and small print is the wrong voice for the price and
the guarantee. `HERO.reassurance` (three strings) became `HERO.assurances`
(lead, detail, tone, icon), rendered as one divided strip: **From $97 · 30 day
· No inventory** scans in a single pass, with the qualifier under each at
0.78rem. "on the monthly plan" stays attached to the guarantee — that is the
sentence that keeps the claim honest.

## 17. The panel now ends on the offer instead of looping

The rail used to finish at a dashed arrow and silently restart at step 1. That
spent the best moment on the page: a visitor who has just watched a product go
found → listed → watched → paid is at the highest intent the hero will ever
produce, and the panel's answer was a repeat.

`HERO_PANEL.finale` is now a **fifth step**, not an afterword bolted to the
side of one — it lives in `steps = [...beats, finale]`, so the rail, the
crossfade, the live region and the keyboard controls all treat it as a step and
nothing needed a special case.

- **The run ends there.** The last node has no connector after it, and the
  connector is the clock, so autoplay simply has nothing left to fire. No
  timer to cancel, no flag to check.
- **The ask sits in it**: "That was one product. The software does not stop at
  one", the 3,000-listings-a-month figure the plan already guarantees, and a
  `Start for $97` button (`intent="hero-panel-finale"`, so it is measurable
  separately from the two CTAs above it).
- **Replay is offered, not forced** — a text button back to step 1 that
  restarts autoplay.
- **The offer node wears the brand ramp**, not a signal colour: the four beats
  are stages of a process, this one is the thing being sold, and the ramp is
  already the site's mark for that. It is the third and last gradient in the
  hero.
- The claim is a plan limit, not an earnings promise.

Reduced motion renders the four beats as a list with the offer card under them,
minus the replay button — there is nothing to replay when everything is already
on screen.

## 18. The marked phrase rotates

React Bits' `RotatingText` (vendored to `components/reactbits/`, motion-based,
no new dependency) now drives the block at the end of the headline:

> BUILD PASSIVE INCOME THAT RUNS **WHILE YOU SLEEP / WHILE YOU WORK / WHILE
> YOU'RE OFFLINE.**

Chosen over the other candidates because it does merchandising work rather than
only motion. "While you sleep" was already the promise; the other two say the
same thing about the other twenty hours, which is the part a visitor with a
full-time job needs to hear. No new claim — listing and monitoring run
unattended either way. `ShinyText` would have fought the gradient already
drifting across that block, `DecryptedText`/`ScrambledText` scramble the one
phrase that must stay readable, and `TextType` delays the benefit behind a
typewriter.

### Two real problems, both worth writing down

**1. SplitText silently broke React's grip on the DOM.** With the rotating
component inside the split element, the phrase never changed on screen — while
`onNext` logged `1, 2, 0` on schedule. SplitText does not merely wrap text; it
*rebuilds the element's contents, cloning nodes*. React kept updating the node
it had rendered, which was no longer the node on screen. Its `ignore` option
does not help — the ignored element is still moved into the rebuilt structure.

Fix: `headlineRef` moved off the `<h1>` and onto a span holding only the fixed
copy. The rotating mark is a sibling, outside anything SplitText touches, and
is animated in by the main timeline instead (`[data-hero-mark]`).

The general rule: **never mount a React component inside an element you hand to
SplitText.**

**2. The block went blank between phrases.** `RotatingText` defaults to
`AnimatePresence mode="wait"`, which finishes the exit before starting the
entrance — inside a filled block that reads as the gradient bar emptying for a
third of a second, every few seconds. `mode="sync"` renders both at once, but
they then sit side by side and double the block's width.

Fix is the `.headline-rotate` class: the root becomes an `inline-grid` and both
phrases are placed in the same cell, so they cross over in place. The box is
never empty, its width is the wider of the two mid-swap, and `layout` on the
root animates the change.

## 19. Typing, not sliding — `TextType` replaces `RotatingText`

The marked phrase now types itself:

> BUILD PASSIVE INCOME THAT RUNS **WHILE YOU** ▌ → `SLEEP` → `WORK` → `COMMUTE`

`RotatingText` and the `.headline-rotate` grid trick from §18 are deleted;
React Bits' `TextType` (also GSAP-based, no new dependency) is vendored in its
place. Three things had to be decided to make it work in a filled block:

**Only the last word is typed.** `HERO.marks` (three full phrases) became
`markPrefix: 'WHILE YOU'` plus `markWords: ['SLEEP', 'WORK', 'COMMUTE']`. A
typewriter that deletes the whole phrase empties the gradient block twice a
cycle, which reads as the headline breaking rather than as an effect. With the
prefix held, the block never collapses and the animation lands on the only word
that actually changes. All three verbs are single words, so the block breathes
by a similar amount each time instead of lurching.

**`nowrap` on the mark.** The block's width changes on every keystroke, and
without it the growing line broke between "WHILE YOU" and the word being typed
— the headline reflowing itself mid-keystroke. Caught in the browser, not in
review.

**The accessible name is a real sentence.** `TextType` renders a half-typed
string most of the time, so the typed span is `aria-hidden` and an `sr-only`
span carries "WHILE YOU SLEEP." Reduced motion renders that same static phrase
with no cursor.

The cursor is `▌` rather than `|`: at headline weight a pipe is thinner than
the stems around it and reads as a rendering fault.

## 20. Two faults in the typed mark, both measured

**The gap before the full stop was the cursor.** `TextType` draws its cursor as
a real character in its own span, and `▌` at headline weight is about half an
em — roughly 28px of block sitting between the last letter and the ".". Fixed
by turning the component's cursor off (`showCursor={false}`) and drawing one in
CSS instead: `.headline-type::after`, 0.07em of painted box, blinking on
`steps(1)` because a caret snaps rather than fades.

**That same 28px was what pushed the phrase onto a second line.** Measured in
the page rather than guessed:

| | column | widest block ("WHILE YOU COMMUTE") |
|---|---|---|
| 1920 | 617px | 621px with the glyph cursor → **wrapped** |
| 1920 | 617px | 584px with the CSS caret → fits, 19px spare |
| 1024 | 466px | 390px |
| 375 | 335px | 338px at full size → **clipped** |

The phone case needed its own fix. The marked block is the widest line on the
page at that width, and `nowrap` turns an overflow into clipped text rather
than a wrap. So the block takes the reduction on its own — `text-[0.78em]`
below `sm`, back to `1em` above it, plus `px-2` instead of `px-2.5` — which
brings it to ~304px inside 335px. Shrinking the whole `h1` instead would have
cost the other three lines their weight to fit one word of one line.

---

# Session notes — 29 Aug 2026, later

## 21. Favicon rebuilt from the brand mark

`public/favicon.svg` was a generic ink tile with a blue dot, unrelated to
anything. Redrawn as the actual reticle in the four brand colours: green outer
ring, blue inner ring, red centre with a paper dot, gold crosshair spikes.

Rings are heavier and spikes shorter than the source artwork — at 16px the true
proportions close into a smudge. `apple-touch-icon.png` was already the real
mark and is untouched.

## 22. Comment pass over the whole tree

Every rationale block cut to one or two sentences, three-line divider banners
collapsed to a single label, and comments that restated the code deleted.

```
1,193 comment lines  →  746        19% of the codebase  →  13%
27 files, +337 / −835
```

What stayed is the non-obvious why: the contrast ratio behind each token, why
SplitText and a React component cannot share an element, why the panel's
progress bar is the clock, why `overflow-x: clip` rather than `hidden`, why
`mouseleave` on the root rather than `mouseout`.

**Verified mechanically.** A throwaway script stripped all comments from each
changed file and diffed the result against its committed version; all 26 source
files came back identical, so no code moved. The script is not in the repo.

## 23. On GitHub, and Netlify-ready

**https://github.com/siamurmahin/ecomsniper-redesign** — private, `main`.

`git push` authenticates through Git Credential Manager, which opens a browser
window against the logged-in GitHub session. No token is stored in the project.

`netlify.toml` pins Node 22 (Netlify's own default drifts between deploys),
restates the SPA fallback that `public/_redirects` also carries, and sets cache
headers: immutable for the content-hashed assets, `must-revalidate` for
`index.html` so a cached document can never point at assets from a previous
deploy.

**Not yet connected.** Connecting is a browser-side authorisation on the GitHub
account: app.netlify.com → Add new project → Import from GitHub → grant access
to this repo only → deploy. Settings auto-fill from `netlify.toml`.

## 24. Hero background — dot field under the aurora

`components/hero/HeroDots.jsx` wraps React Bits' `DotField`.

Two rounds of tuning, both worth remembering:

- **First attempt was invisible.** Ink at 0.28 alpha on 26px spacing, under an
  aurora running at 0.75 opacity — what showed was the aurora, which reads as a
  plain gradient wash. Dots are now 0.55/0.22 alpha, 22px spacing, 1.9px
  radius, and the aurora is down to 0.42.
- **The cursor glow had to go.** `glowRadius` painted a blue bloom that tracked
  the pointer and read as a highlight the page had not earned. Zero now. Dots
  still displace slightly under the cursor.

Masked out of the copy column and hidden below `lg`, where the layout stacks
and the copy spans full width. Unmounted by an `IntersectionObserver` once the
hero scrolls past — the canvas holds a rAF loop for as long as it is mounted.

**`ShapeGrid` was tried alongside it** behind a temporary `?bg=squares` switch.
It draws a full ruled floor across the hero — visible lines behind the headline
and through the panel, fighting the panel's own borders. Rejected; the switch
and the wrapper are gone.

## 25. The line under the panel: added, then removed

The illustration caption was replaced with an earnings claim, in the only form
that could stand behind it — attributed ("members report"), bounded ("who
stayed 3 months"), stated as a report rather than a rate, and qualified
directly underneath rather than in a footnote.

Then removed entirely at your call, caption included.

**Live consequence, worth knowing:** the panel's figures — $11.40 margin, 142
sold, $38.90 order, $13.20 profit — are invented for the demonstration, and
nothing on the page says so any more. The footer disclaimer covers results in
general but not the panel. Cheapest fix if it ever matters: a "Sample data"
chip in the panel's title bar next to WORKING, which costs no vertical space.

## 26. Panel timing — three passes to a fade

| | v1 | v2 | now |
|---|---|---|---|
| Hold per step | 2100ms | 2900ms | **3800ms** |
| Step in | 420ms slide | 620ms slide | **900ms fade, 420ms delay** |
| Step out | 180ms | 340ms | **500ms fade** |
| Value rows | +140/250ms | +260/390ms | **+620/770ms** |

**The slide was the problem, not the numbers.** Horizontal movement reads as
speed however generous the timing is. It is opacity only now, and the fades are
staggered rather than simultaneous — old one out over 500ms, new one waits
420ms then takes 900ms, so they overlap for about 80ms. A true simultaneous
crossfade leaves two legible cards stacked for half a second, which is what
reads as broken. The gap between them is what makes it a fade rather than a
swap.

`direction` state went with the slide; nothing reads it now.

## 27. Buttons: hover was never animating

Both gradient variants changed `background-image` on hover, and **that property
is not animatable** — the change lands on one frame no matter what the
transition says. No duration would ever have fixed it.

They change `filter` instead, which interpolates: the primary saturates and
darkens (`saturate(1.12) brightness(0.93)`), the outline saturates and takes
the accent on its label. The base `.btn` transition is 400ms on expo and now
covers `transform, box-shadow, background-color, border-color, color, filter`.

**`.btn-brand-outline`** — the hero's second CTA. Paper fill, brand ramp as the
border, drifting on the hero mark's loop. Two background layers: a solid fill
clipped to the padding box over the ramp clipped to the border box, which is
how a gradient gets into a border without a wrapper element. A separate variant
rather than a change to `btn-secondary`, because the pricing and 404 pages use
that one and should stay quiet.

## 28. The arrow beside the playbook button

A drawn arrow with the note *Grab it for free* in serif italic, blue, pointing
back at the second CTA — the door most visitors should take, which nothing else
in the hero said.

Three faults on the way, all silent:

1. **It never animated.** The hand-written rule read
   `.motion-safe:animate-nudge-x` — an unescaped colon, so it parsed as a
   pseudo-class on `.motion-safe` and matched nothing. Caught with
   `getAnimations()` on the element, not by looking at it.
2. **Running, it still read as static.** `ease-in-out-quint` parks the travel
   at both ends. It is 14px left and 12px up on a gentler curve over 1.2s now.
3. **Rotation fought the mirror.** Replacing the mirror with a rotate sent the
   head one way and the tail the other. Both compose inside the SVG:
   `rotate(-38 24 14) translate(0,28) scale(1,-1)`. It has to be inside the
   SVG — the nudge animation owns `transform` on that element and would
   overwrite a Tailwind rotate class outright.

The note is lifted 12px, because the tilt puts the arrow's tail above the
vertical centre it was aligned to.

## Where this stands

The hero is finished unless you want more: typed rotating headline, dot field
under a shader aurora, five-step panel that ends on the offer, three assurance
facts, two objection cards, and a gradient-bordered second CTA with the arrow.

**Next section by the funnel order: 02 proof bar, then 03 who this is for.**

Still outstanding, unchanged:

1. **Dashboard screenshots** — `FeatureTourSection` still uses `AppFrame`, and
   the hero panel is the other slot they would fit.
2. `VITE_PLAYBOOK_ENDPOINT` unset — the playbook form delivers nothing. Set it
   in Netlify's environment variables once the ESP endpoint exists.
3. Confirm the live Trustpilot score still matches the stated 4.6 from 90+.
4. No routes for `/about`, `/blog`, `/contact`, `/help` or the legal pages —
   the footer links point at nothing. `/terms` and `/privacy` are parked
   awaiting real text; the other six can be written from `siteContent.js`.
5. `/design-lab` is still mounted and reachable by URL on any deploy.
6. The panel's illustrative figures are no longer labelled — see §25.
