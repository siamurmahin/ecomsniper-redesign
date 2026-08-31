# Session notes — 31 Aug 2026 (early hours)

Handoff for the session that ran **00:04 → 04:11 on 31 Aug** and ended when the
Claude limit was hit. Written after the fact, from the commits, so it is a
record rather than a diary — the reasoning is quoted from the commit bodies,
which are the primary source if you need more than is here.

**Nothing was lost.** All 27 commits are on `main` and pushed; the tree is
clean, there is no stash, and the PC shutdown that morning cost nothing.

Read §1 for where the session stopped, and §7 for the traps.

---

## 1. Where this stopped, and what is next

The session walked the funnel top-down: hero performance → the four proof
sections → §05 merged into §09 → §06 pillars → §07 software → site furniture.
It stopped at the software section being finished, plus a back-to-top button.

**Sections that have never had a design pass** — untouched since the 29 Aug
initial build:

```
08  Community          ← next in the walk
10  Founders
11  Comparison
12  Pricing preview
13  FAQ
14  Assurance          (comment trim only)
15  Final CTA          (comment trim only)
```

`§07` ends on a bridge line written specifically to hand over to `§08`
(see §5 below), so Community is the section that section is now pointing at.

The previous notes are `SESSION-NOTES-30-AUG.md` (§1 there is still the correct
orientation: stack, commands, design system, client conventions). This file only
covers what happened after commit `6502917`.

---

## 2. Hero: two performance passes

**`56302f5` — the entrance runs on the compositor now, not the main thread.**

It was a GSAP timeline, so the main thread wrote opacity and transform on every
element every frame — during the busiest second the page has (React mounting,
SplitText splitting, the webfont swapping, the panel's images decoding, the
WebGL aurora compiling shaders). Any one of those blocks a frame.

The compounding factor: `SmoothScrollProvider` sets `gsap.ticker.lagSmoothing(0)`
because Lenis needs it. With lag smoothing off, GSAP does not stretch a stall —
after a 200ms block it advances the timeline 200ms in one step. That is why
elements **popped in rather than arrived**.

Now CSS keyframes on opacity and transform, keyed off the existing `data-hero-*`
attributes, `both` fill mode so nothing flashes at full opacity during the
delay, gated on `.js-motion` so the hero is simply visible without JS.
SplitText stays — copy wraps differently at every width and lines can only be
found from rendered text — but it now only tags each word and hands it a step.
**Nothing writes inline styles on hero elements any more.**

Chains land together at ~1.0s: words 1010ms, support cards 990ms, assurances
970ms, panel 800ms. The signal that releases the rest of the page is derived
from the split, not hard-coded, because headline length depends on the copy and
on where it wraps.

**`0f2d95b` — the WebGL aurora is gone.**

Shader compilation is a single uninterruptible block and it landed inside the
first second. Nothing is lost visually: the static wash underneath was always
written to carry the hero alone — that is what it did under reduced motion,
where the canvas never mounted.

Removed `HeroAurora`, `SoftAurora` + stylesheet, and the `ogl` dependency they
were the only users of. The SoftAurora chunk was 51.5kB (15.4kB gzipped).
**The homepage now runs no WebGL context at all.**

> Left behind by this: `src/components/three/ReticleScene.jsx` is orphaned —
> nothing imports it — and `three`, `@react-three/fiber` and `@react-three/drei`
> are in `package.json` for it alone. See §9. (The README's 3D-canvas claim was
> corrected on 31 Aug.)

---

## 3. The preloader

**`91dd252`, `64fcdbe`.** Measured on the production build the document painted
at ~116ms and the hero did not appear until ~1.3s — a second and a bit of blank
white. It is now the brand mark, on screen at **79ms**, gone at **718ms**.

Decisions worth keeping:

- **Inlined in `index.html`**, markup and styles both. A preloader that waits on
  a request of its own is covering for a load with another load, so the mark is
  the favicon's artwork pasted in rather than fetched.
- **The spin is a CSS animation, deliberately.** A JS spinner stalls exactly
  when the main thread is busiest — the whole time this is on screen — and would
  sit frozen while claiming to show progress. Only the rings and spikes turn;
  the centre dot is the thing being aimed with, so the reticle rolls around it.
- **It comes down when the first route has painted**, not when animation
  finishes — the hero's entrance is the first thing worth seeing. Two frames,
  because a rAF callback runs before the paint it was scheduled against.
- **The element is removed, not left at `opacity: 0`.** An invisible fixed sheet
  swallows the first click. A 6s timer in the document removes it regardless, so
  a bundle that never executes cannot strand a visitor on a spinner.
- The ground is the hero's own floor (red left, blue right) so it dissolves into
  the page rather than cutting from a white card.
- **A sweep, not a progress bar.** Nothing here knows how far through the load
  it is, and a bar filling to an invented number lies about something checkable.
- The name is text, not the wordmark PNG — inlining that as a data URI would
  bloat the very document whose parse speed this depends on. Falls back to the
  system UI face; the webfonts have not arrived at 79ms.
- **Every value is literal**, with a note saying so: this renders before the
  bundle's stylesheet exists, so there are no tokens to reach for. Copied from
  `--color-paper`, `--color-ink`, `--color-brand-red`, `--color-brand-violet`,
  `--color-accent`. **If you change those tokens, change these too.**

---

## 4. Sections 04b–04d and the §05 → §09 merge

**`8be1f20` — the receipts got a door.** Four sections of proof run before that
point; someone already convinced had to scroll past four more to find anything
to act on. The section now ends with sign-up + guarantee. The guarantee reads
"30 day money back guarantee **on the monthly plan**" — the 10K credits bundle
and Enterprise are final sale, so the unqualified version contradicts both the
pricing page and the FAQ. Same trap as §14; it is one of the two claim rules
`siteContent.js` exists to enforce.

**`c2e5fd9` — the interview stage cycles all twelve.** Eleven of the twelve were
only ever a 96px thumbnail. Turns every 5s; the list carries all twelve with the
one on stage marked, because a list of "the others" would change membership
every five seconds. Holds under the pointer over either half, parks off screen,
stops while the lightbox is open, nothing under reduced motion. The list follows
the stage by scrolling the marked row into view — **the list element only**,
because `scrollIntoView` walks every scrollable ancestor including the page, and
the page belongs to Lenis. No progress bar: §03 has one so its countdown and its
tween cannot drift, and a timer with nothing to keep in step does not need one.

Same commit fixed the lightbox below `sm`: title and controls were side by side
at every width and `flex-1` with `min-w-0` lets a title shrink rather than wrap —
at 500px that was a 199px column of broken words. Stacked below `sm` the title
gets 199px → 427px. The dialog scrolls its own overflow now, so a short viewport
cannot cut off the close button.

**`4249f14`, `ef895cf` — the two "go and verify this elsewhere" controls.** The
YouTube channel link is a red pill (50px, a real tap target) and the Trustpilot
link is a bordered button. Both **outlined, not filled**: they leave for someone
else's site and must not outweigh "Start your eBay business". The red is the
palette's `ebay-red`, not YouTube's `#FF0000` — one foreign red on a page built
from four signal tones reads as a pasted-in widget. The star stays gold rather
than reaching for Trustpilot's green, for the same reason. The matching link
inside the proof wall is **deliberately not promoted**: it sits under "See what
it costs" and two stacked buttons make the reader choose instead of seeing one
next step.

**`cc677fe` — testimonials swipe rail below `sm`.** One column is not a wall.
Native `overflow-x` with scroll snapping so momentum, rubber-banding and the
scrollbar come free; two arrows step one card and disable at the ends.
**Deliberately no `data-lenis-prevent`** — Lenis disables itself on coarse
pointers and only drives the vertical axis, so there is nothing to prevent, and
adding it would trap the page's scroll under a thumb trying to leave. The wall
is **not rendered at all** on narrow screens rather than hidden with CSS: both
shapes are eighteen cards and the wall duplicates columns to loop, so rendering
both would put 54 review cards in a document already carrying ~4,500 nodes. The
choice is read synchronously on first render so a phone never paints the wall
and swaps it out.

**`3b1972f` — §05 is gone; the model now opens §09.** "The model, in plain
English" ran four steps; §09 then sold the course that teaches those steps.
Neither half mentioned the other and they sat a third of the page apart. The
live site runs them as one — the steps **are** the syllabus, so the explanation
is the argument for the course. Steps first, course second: leading with the
offer sells a solution before the reader has the problem. Both of §05's closing
lines are kept (the live site has neither) because "You never buy stock. You
never ship a box." is the clearest sentence on the page and "No warehouse. No
website. No money tied up in stock you might not sell." answers the question the
steps raise. The steps run **across** rather than down — §05 stacked them in the
left third of an ink band and left two thirds empty. Nothing linked to
`#the-model` and `#how-it-works` is on the feature tour, so the nav is
untouched. **Seventeen sections now.**

**`8a439ac` — testimonials moved to an ink band.** The 228px gap was the
symptom; two paper sections in a row was the cause — `section-band`'s padding
had no colour change to read against. The sequence 04a→06 alternates properly
now: sunk, ink, sunk, ink, paper. Everything that assumed paper is inverted
(`card-ink`, paper avatar discs, `muted-dark` body). **`.headline-mark` needed a
new variant**: it is an ink block with paper type, invisible on this band, and a
marked word that disappears is worse than no mark because the sentence has
already been split for it — hence `.headline-mark-on-ink`. The pillars then take
a shorter lead-in (228px → 196px). Asymmetric padding is safe **on that section
specifically** because it paints no background; on a coloured band it would sit
the band visibly off-centre, which is why `section-band` is symmetric at all.

**`0953875`, `c8a7215` — the headline-mark pattern is now four deep**: §03's
"you", the wall's "really", 04d's "Trustpilot", §06's "One system". All split
into three parts in the copy file rather than hardcoded in JSX, and the full
stop always stays outside the block.

---

## 5. Section 06 — pillars

**`07a417a` — the three pillars are wired into one system.** The headline said
"Three things. One system." over three disconnected white rectangles: the visual
was arguing against the copy. The icon tiles are nodes on a wire now, running
the width of the row behind the cards, threaded through the tile centres, with a
current travelling along it and each node's halo pulsing as it arrives —
staggered a third of a cycle so it moves left to right rather than all three
breathing together.

**The wire is measured, not guessed**: the card's `sm:p-8` is 32px and the tile
is `size-11`, so the centre is **54px**. `3.75rem` looked about right and put it
6px low with the tiles floating off the line. Only from `md`, where the three
sit across — a vertical wire down a stacked column is a decoration pretending to
be a diagram. Three other things stopped the row reading as one repeated block:
the tone rule is always on rather than on hover, the number chips are solid, and
the cards are opaque with a lift.

**`62d6ae7` — depth instead of a coloured edge.** No amount of colour on a
rectangle stops it being a rectangle. Each card is a small stage: the pointer
tilts it and the contents sit at different depths — wash at -30px, number at
6px, copy at 20–28px, icon row at 38px. The oversized number sits behind the
copy, mostly off the bottom edge, because every card needed something big enough
to tell the three apart at a glance and the 9px chip never could. It drifts
against the scroll, alternating direction per card, **so the depth is there
before a pointer arrives** — which for most visitors is the only version they
see.

Cost was the constraint: the tilt writes two custom properties straight to the
node inside a rAF and **never touches React state** — a mousemove that
re-rendered three cards would put a component tree on the main thread 60×/sec,
and this page has already been taught what that does. Touch and reduced motion
get no tilt.

**`14b2ee0` then `b8b7799` — the closer, twice.** First the live site's "Each
one plays a different role. Let us take them one at a time." was restored,
because the three cards each link into the section that expands them and those
lines are the only thing that says so. Then the handover sentence was dropped
and the **primary CTA** put under "Each one plays a different role" — by this
point the reader has been through the wall, twelve interviews, the receipts and
eighteen reviews, and someone already convinced should not read four more
sections to find a door. The cards keep their own links for anyone who does.
Same label and destination as the hero's primary and the receipts door, rather
than a fourth phrasing of the same action.

---

## 6. Section 07 — the software, chosen in a lab

**`2692e12` — five shapes, side by side at `/software-lab`.** Option 0 was what
shipped, so every comparison was against the real thing. Same copy, same tones,
same tool pills in all of them — the choice was about shape, not card design.

```
0  now live      592px section    1,752px page
1  sticky stepper 1,312px         2,517px
2  scroll stack     900px         4,401px   ← pinned
3  bento grid     1,025px         2,231px
4  deck → bento   1,025px         2,231px
```

The pinned stack costs ~2,200px more scrolling than the bento to show the same
four steps. **That is what a pin does**, and having it on the page-height
readout while choosing beat finding out afterwards.

**`8cd94ec` — the sticky stepper won; the lab is deleted.** Steps scroll against
a spine that fills as each is passed; a panel sticks alongside. No pin, and that
is most of the reason — a pin holds the viewport still for its whole run, so it
adds length. It replaced a card stack on a 4.6s timer: a stack on its own clock
decides how long each step gets, a stepper hands that back. The spine fills with
a **height transition, not a scrubbed tween** — it changes four times in the
whole section and a scrub would run every frame to sit still for most of them.
Below `lg` the panel is dropped. The lab's shared parts were inlined rather than
left in a lab-shaped folder in production.

Then five fixes, all measured:

- **`7393ec3`** — steps sat 234px apart in a 935px viewport, so one screen of
  scrolling ran through nearly all four. And a passed step was drawn by putting
  its whole row at `opacity: 0.45`, which took the number tile with it — the
  spine runs through the centre of those tiles, so **the coloured line showed
  straight through the number sitting on it**. A non-current step is now a
  different, fully opaque style rather than a faded one. Nothing in that column
  is translucent any more.
- **`ff407ef`** — the panel repeated the title and body sitting six inches to
  its left; the largest thing on screen was a duplicate. It shows the step
  happening instead. Built from DOM and CSS because that is how the live site
  builds its own — checked: ecomsniper.io has no Lottie player and no canvas on
  that section. Spacing has now been wrong in both directions (234px too tight,
  434px left the column empty); **322px** is about a third of a screen each. The
  copy was `text-muted` at 55% on a sunk band, under the floor for text anyone
  is expected to read — `ink/80` at medium weight now, non-current at 80%.
- **`081d348`** — step 2's thumbnail was `tone.wash`, a 10% gradient fading to
  transparent, so on white the largest element in the visual was invisible. It
  draws the handoff now: reticle → packets crossing a dashed line → eBay. eBay
  in eBay's own colours, which cost nothing because **this site's four signal
  tones were taken from that logo in the first place** (`#e53238`, `#0064d2`,
  `#f5af02`, `#86b817`). The reticle is drawn inline from the favicon artwork,
  so it is one request lighter and cannot drift from the brand mark.
- **`f57ae1d`** — see §7, this is the trap worth reading. Also gave the section
  an end: the door plus the guarantee (keeping "on the monthly plan"), then a
  bridge marked on exactly the two words the next headline quotes —
  **"Here's what 'never alone' looks like."** The bridge asks it, §08 answers it
  in the same words. **If you rewrite §08's headline, that mark stops being a
  hinge and becomes decoration.**
- **`d014595`** — the visuals lived only in the sticky panel, which is hidden
  below `lg`, so on a phone the section was four paragraphs and a spine. Each
  step now carries its own visual inline, `lg:hidden` rather than a second
  render — without that the same visual is on screen twice on desktop. Verified
  at 500px, 834px and 1440px. Section is 2,675px on a phone against 1,801px on
  desktop; that is what four mock interfaces cost stacked rather than swapped.
- **`bac3d40`** — the closer's tick was a flex sibling under `items-center`, so
  once the sentence wrapped on a phone it centred across both lines and landed
  in the gap. `inline-block` + `align-middle` now, so it flows with the text.

---

## 7. Traps found this session

**An IntersectionObserver watching for entry cannot track a scroll position.**
This one produced two bugs at once in §07 (`f57ae1d`): scrolling up from 4 to 3
sometimes did nothing, and jumping from 3 to 1 landed on 2. Entering a band is
half the story — **scrolling back to a step that is already intersecting
produces no entry**, so the panel stayed put. And when several entries arrive in
one callback, calling `setActiveIndex` per entry lets whichever is last in the
array win: **entry order is not scroll order.** It reads position now — the
current step is the last one whose top has crossed a line at 45% of the
viewport. One pass over four rects, identical in both directions, throttled to a
frame, and gated by a second observer so nothing runs while the section is off
screen. Verified: down 1,2,3,4; up 4,3,2,1; a hard jump from 4 to 1 lands on 1.

**A layout measured before the webfont swaps is measured in the wrong font.**
Every open audience panel was 12px short — 309px of content in a 297px box — and
identically so on all eight members, which is the signature of a uniform metrics
change rather than one story wrapping badly. The row is laid out from measured
story heights, measured in whatever face was rendering: on a cold load, the
fallback. **The layout re-runs on a width change, and a font swap is not a width
change.** Fixed by re-measuring on `document.fonts.ready` (`1e51623`). Measured
after: 24px on all four sides of every member.

**Overflow out of the top does not register as overflow.** The same audience
panels were a flex column at `justify-end` at every width, so when a story
needed a few pixels more than the row was measured for, the excess came out of
the **top** and pushed the glyph tile against the panel edge — no scrollbar, no
overflow, nothing to notice. Anchored to the start below `md` now. (This is the
same class of thing §30-Aug's notes flagged; it has now cost time twice.)

**Fixing the anchored edge just moves the problem.** Those 12px came out of
whichever edge the content was not anchored to. Fixing the top edge moved it to
the bottom. The measurement was the bug, not the alignment.

**An invisible fixed element still takes clicks.** True for the preloader
(removed, not faded) and for the back-to-top button (`hidden`, not just faded
out). Both would otherwise swallow the first click aimed at what is underneath.

**Never use `window.scrollTo` on this site.** Lenis owns the scroll position and
keeps its own target; a native scroll behind its back leaves it stale and the
page slides away on the next wheel tick. Everything goes through
`scrollToTarget` — the back-to-top button included.

---

## 8. Section 08 — groundwork, not started

Read but not designed. Two findings worth keeping so nobody re-derives them:

**Fifteen of the eighteen reviews in `PROOF.reviews` mention support or the
community without being asked.** Manor ("ask a question 24/7 and someone will
respond"), Aldair, Clay C, Manar Kazi, Samuele, Jacob, Hasan-Ali, Justin H,
Ellie, Lynx, Mattias, zsaltsman, Toto and Rupp — Rupp's names both claims the
section makes: "I get 24/7 support and also access to weekly calls." The
section currently asserts 24/7 / 400+ / weekly with icons and one pull quote,
while the checkable evidence for exactly those claims is already in the file.
**15 of 18 is itself a countable stat**, and this is the section the review
called the real differentiator against cheaper listing tools.

**The tension to resolve first:** 04d already renders all eighteen reviews. Any
use of them here has to read as a chorus rather than a repeat — short fragments
attached to the claim they prove, not review cards a second time.

**No community assets exist.** `src/assets` has `social-discord.svg`,
`community-people.svg`, `chat-bubble.svg` and nothing else — no Discord
captures, no chat screenshots. So the options are: build on the reviews, draw
the community the way 07 draws its steps (DOM and CSS, no new dependency), or
leave a sized slot for captures the client supplies. **Not decided — ask.**

---

## 9. Open

Also written up as the README's "Before launch" list, which was re-ordered and
de-staled on 31 Aug — that is the client-facing version, this is the reasoning.

- **`ReticleScene.jsx` is orphaned.** Nothing imports it since the aurora was
  dropped. `three`, `@react-three/fiber` and `@react-three/drei` are
  dependencies for it alone. Decide: bring the reticle back somewhere, or delete
  the component and the three packages.
- **`/design-lab` still ships.** A 303-line internal comparison page from the
  29 Aug build, still routed in `App.jsx`, in the production bundle, and not
  disallowed in `robots.txt`. This is a *different* lab from `/software-lab`,
  which was correctly deleted with `8cd94ec`.
- **`FEATURES.items[].links` point at the live site.** Product Hunter,
  Competitor Research, AI Powered Lister, Price Monitoring go to
  `ecomsniper.io/*V6` because this site has no feature pages. Relative paths
  would 404 and dropping them would lose the product names, which are the most
  concrete thing in the section. Repoint when those pages are rebuilt here.
- **Eight footer links 404** — `/about`, `/blog`, `/contact`, `/help`, `/terms`,
  `/privacy`, `/refunds`, `/results-disclaimer`. The legal four matter most: the
  guarantee copy leans on a refund policy that is not there.
- **`VITE_PLAYBOOK_ENDPOINT` is unset**, so every free door on the site leads to
  a form that fakes success and logs a warning.
- **`FoundersSection.jsx`'s header comment is stale** — it still says the
  portraits are placeholders to be replaced. They are real photographs, resolved
  through `import.meta.glob`. One comment, not yet touched.

**Closed since the previous notes:** the six-reviews problem is fixed —
`PROOF.reviews` now holds **eighteen**, so neither testimonial row repeats a
name. Founder portraits are real. Both were still listed as open in the README
and are not any more.
