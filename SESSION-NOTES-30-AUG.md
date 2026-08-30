# Session notes — 29–30 Aug 2026

Handoff for whoever picks this up next. Everything changed this session, why it
was changed, what is still uncommitted, and the traps that cost time so you do
not pay for them twice.

Read §1 and §7 first. §7 is the part that will save you an hour.

---

## 1. Orientation

Marketing site for EcomSniper. Vite + React 18, Tailwind **v4**, GSAP (with
ScrollTrigger and SplitText), Lenis for smooth scroll, React Router.

```
cd "G:/Web Design Project/Vibe Code/ecomsniper/ecomsniper-web"
npm run dev      # http://localhost:5173
npm run build    # production gate — run it before you call anything done
npm run lint     # eslint, must stay at 0
```

Repo: `github.com/siamurmahin/ecomsniper-redesign`, branch `main`.

**Every word on the site lives in `src/data/siteContent.js`.** Sections read
from it and never hardcode copy. If you are changing text, change it there.

Homepage order (`src/pages/HomePage.jsx`):

```
Hero → ProofBar → Audience →
ProofWall → Interviews → Receipts → Testimonials →
Model → Pillars → FeatureTour → Community → Training → Founders →
Comparison → PricingPreview → Faq → Assurance → FinalCta
```

Design system is in `src/styles/index.css`:

- **Signal tones** — blue / red / gold / green, one per enumerated item, via
  `src/lib/signalTones.js`. Three values per hue: `plain` fills, `deep` is text
  on paper (≥5.2:1), `soft` is text on ink (≥5.9:1). **Use the right one.** The
  brand green `#86b817` on paper is ~2.4:1 and unreadable; `-deep` is 4.97:1.
- **Vocabulary** — hairlines, rounded glyph tiles, pill buttons, the brand
  gradient ramp, `micro-label` and `section-eyebrow`. Anything built from other
  parts looks foreign here, and the client will say so. This happened twice.
- `useRevealOnScroll` + `data-reveal` / `data-reveal-group` drives entrances.

---

## 2. Conventions the client cares about

- **No Claude attribution in commits.** No `Co-Authored-By`, no
  `Claude-Session`, no "Generated with" footer. The repo is public and they
  asked for this explicitly. History was rewritten once to strip it — do not
  reintroduce it.
- Conventional Commits, with a body that explains **why**, not what.
- Comments explain the reason a thing is the way it is, especially where a
  simpler-looking option was rejected. Match that density.
- The client iterates hard on visuals and will reject things. Build the variant,
  render it **on the page next to the current one** with a temporary label, and
  let them choose. Do not describe options in prose — they want to see them.

---

## 3. Shipped and pushed (4 commits)

| Commit | What |
|---|---|
| `a0c6425` | Header and hero eyebrow hold one line down to 320px |
| `df07559` | Proof bar (§02) rebuilt as an ink band of tone cards |
| `b19d8b5` | Hero holds a full viewport |
| `13599ee` | Dropped the scraped homepage image folder (76 files, 2.2MB) |

### Header / hero fixes (`a0c6425`)

- Sign-up label wrapped to two lines at ~500px, doubling header height. Cause
  was no `whitespace-nowrap`. CTA was 76px tall, now 39px at every width.
- Wordmark is 4.5:1, so height is a width decision. It is now fluid —
  `clamp(1.5rem, 7.5vw, 2.75rem)` — with `max-w-full object-contain` as a
  floor-breaker so a 320px phone gives up logo pixels rather than clipping the
  button. Zero overflow 320→1600.
- Hero eyebrow: the copy was a bare text node in a wrapping flex row, so the
  live dot became its own line and sat above the words. Dot is a fixed left item
  now; the copy scrolls as a marquee when it does not fit, measured with a
  `ResizeObserver` rather than guessed at a breakpoint.

### Proof bar (`df07559`)

Was a bordered white card on a white page between a white hero and a near-white
section — a box with nothing in it. Now an ink band of four tone cards using the
hero's tile parts, with `SpotlightCard` (already in the repo, used by
`PillarsSection`) for the pointer glow.

- `RatingStars` (`src/components/ui/RatingStars.jsx`) fills to the true
  fraction. Rounding to a half star would round the evidence.
- Country line is a flag ticker — **real PNG artwork** in `src/assets/flags`,
  because Windows renders emoji flags as two bare letters. The codebase already
  knew this; see `AssuranceSection`.
- **Both Trustpilot figures were wrong.** Score was 4.6, actually 4.7. Review
  count said "90+", actually **41**. I read the live profile to confirm. The
  card links straight to it, so a wrong number is checked and found wrong in one
  click. If these drift again, they are hardcoded in `siteContent.js`.

### Hero full viewport (`b19d8b5`)

`min-h-svh`, not `h-vh`. `min-h` so long copy stretches rather than clipping;
`svh` because mobile browser chrome makes `vh` taller than the screen and would
push the CTAs under the fold.

---

## 4. UNCOMMITTED — the Audience section rebuild

**This is the live work. It is not committed.** 5 modified files plus one new
asset:

```
 M src/components/ui/Icon.jsx        (registers mouseScroll)
 M src/data/siteContent.js           (AUDIENCE rewritten, +101 lines)
 M src/lib/smoothScroll.js           (anchor easing — see §6)
 M src/sections/AudienceSection.jsx  (+643 lines, the rebuild)
 M src/styles/index.css              (mouse-wheel-run keyframe)
?? src/assets/icons/mouse-scroll.svg (new)
```

`npm run lint` is clean and `npm run build` passes as of the last change.
Commit it or keep iterating, but know it is pending.

### What §03 is now

Eight expanding panels, all eight members on screen at once. The one under the
pointer opens and tells its story. Two earlier shapes were rejected:

1. Three stacked viewports (before this session) — buried it.
2. A quote card above a grid of eight buttons — the client called it "very
   static". It was a menu: everything the same size and colour, nothing moving
   until you asked.

**It must stay one screen.** That constraint is why the original three viewports
were collapsed. Do not undo it.

Behaviour:

- Hover or focus opens a panel. Click stops the 5s auto-rotation for good.
- Rotation parks when off screen (`IntersectionObserver`) — nothing animates
  where nobody is looking.
- `SplitText` reveals the story by line on change.
- Reduced motion: no rotation, no splits, plain swaps.

### Content — the client supplied real copy mid-session

`AUDIENCE.people` now carries `name`, `role`, `icon`, optional `quote`, and
`story`. Only **Rory** has a quote (his own words, in quote marks). The other
seven are third-person stories with a `title`.

**Those seven titles are mine, not the client's.** Every figure in them comes
from their own sentences — nothing new is claimed — but the wording is written.
They are flagged in `siteContent.js` and are the first thing to replace if real
ones exist.

`memberLabel` is `'Real EcomSniper member'`, stored once.

The closer renders the full deck line — `"Different lives. Same system. Could
you be next?"` — but at two weights. It was briefly cut back to the question
alone because at one size the whole thing read as another section heading; the
size was the problem, not the words. The first sentence sits back at caption
weight, the question keeps the emphasis, and the mouse cue sits under it. The
beats are joined with a real space, not spaced with margin, so the paragraph
reads back identical to the deck.

### Responsive rules, all measured

| Width | Layout |
|---|---|
| < 768px | Stacked. Row capped to `max-w-md` and centred. |
| ≥ 768px | Across. Eight panels, glyph steps down a size. |

- Panels go across at **md, not sm**. At 768px each shut panel is ~52px against
  a glyph tile needing 68px with its inset — at `sm` the glyph broke out of its
  own panel by up to 7px between 640 and 1024.
- Below md the list is capped to a phone's measure. Full width on a tablet it
  became **685px bars** holding one glyph and one name against a field of
  nothing.
- **Heights are measured, never guessed.** `measureOpenHeight()` reads what each
  story actually needs at the current width and sizes the row to the tallest
  member. Four separate fixed-height guesses each fixed one width and clipped
  another. Every open panel gets the tallest member's height so the page does
  not walk down the screen every 5 seconds as the rotation turns.
- Across, the text layer is **pinned** to `--panel-open-w`. Without it the story
  is laid out against whatever width the panel has at that instant — 95px while
  opening — so lines get measured one word wide and stay that way.

### The closer CTA

Question in ink, then a mouse cue: outline with the wheel running down inside
it, **"BE NEXT"** under it, black and bold. Hover fills the whole block to ink
and inverts everything to paper. Links to `#pricing`.

Drawn as a normal icon (`mouse-scroll.svg`, stroked, `currentColor`) rather than
Lottie — the client asked about Lottie, but it is an outline and one moving
part, so a player dependency plus a hosted JSON was not worth it. If they insist
on the Lottie easing, wire the player properly.

A thread-and-tile variant was built and rejected; its keyframes were deleted.
No dead CSS left.

---

## 5. Rejected — do not rebuild these

The client saw and turned down:

- Proof bar as a plain dark band with dividers (chose tone cards).
- Audience as a quote card + button grid ("very static").
- A reworked panel variant with centred glyphs and spine-set names — but
  **keep** the phone-strip padding fix from it, which is in.
- `.headline-mask` — brand ramp clipped into the "you" letterforms. Built,
  rejected, utility removed.
- A bare chevron scroll cue ("looks really old"), then a filled arrow ("that's
  not the right arrow type"), then a thread-and-tile.
- Green "Click here" as the CTA label. They picked "Be next", black and bold.

---

## 6. Smooth scroll — fixed this session

Anchors were animating but felt like a teleport. Lenis' easing is
`1.001 − 2^(−10t)`, an exponential ease-**out** — right for a wheel, wrong for a
jump between sections. It put ~29% of the distance into the first 50ms; on a
4,700px trip that is 1,400px in three frames.

`scrollToTarget()` in `src/lib/smoothScroll.js` now uses an ease-in-out cubic and
scales duration with distance (0.7s–1.5s). Wheel feel is untouched.

Measured on a 10,453px jump: travel in the first 100ms went from **~29% to
0.3%**, settling at 1.45s. Applies to every `#` link — nav, proof bar, CTA — as
they all route through this one helper.

---

## 7. Traps — read this before debugging anything

**Lenis owns the scroll.** `window.scrollTo` and `scrollIntoView` fight it and
the page drifts back. The instance is module-scoped in `src/lib/smoothScroll.js`
behind `getLenis()`; `window.lenis` is only a version marker. If you are
automating the browser, drive scroll through element refs, not coordinates. If
you want console access, add `if (import.meta.env.DEV) window.__lenis = lenis`
in `SmoothScrollProvider`.

**Tailwind v4 writes `scale` and `rotate` as standalone properties**, not inside
`transform`. So `scale-y-0` multiplies with a keyframe's `transform: scaleY()`
and pins it at zero forever. Cost an hour. If a transform animation silently
does nothing, check for a Tailwind transform utility on the same element.

**The dev server's Tailwind scan goes stale** after a long session of edits. A
`hover:` class can be on the element, correct in the production CSS, and simply
absent from the dev stylesheet. If a new utility does nothing, **restart the dev
server** before you debug the code.

**`npm run dev` orphans node processes.** Stopping the task does not always kill
the child. Three were found holding 5173/5174/5175. Check with
`Get-NetTCPConnection -LocalPort 5173 -State Listen` and kill by PID.

**Buttons take phrasing content only.** `SplitText` defaults to `<div>` line
wrappers, which put 8 invalid divs inside `<button>`s here. It is configured
with `tag: 'span'` + `aria: 'hidden'` now. Keep that if you touch it.

**Measure, do not eyeball.** Every real bug this session was found by measuring
and invisible in a screenshot: 38px layout shift, 27px glyph clipping, one-word
line wrapping, a trail drawing underneath the tile that covered it. Conversely a
screenshot caught what measurement missed — content anchored to the bottom of a
flex box overflows out of the **top**, which never registers as an overflow.

**Browser automation coordinate space is scaled.** Screenshots come back capped
at 1568px wide; JS reports CSS pixels. The ratio changes with window size.

---

## 8. Open

- ~~Commit §4.~~ Done — `6a308ff`, `475ff9f`, `15df52f`, `303367e`.
- **Seven member titles are written by me** — replace with real ones if they
  exist.
- **CTA jumps §03 → pricing**, skipping proof, model, features, community and
  training. A deliberate shortcut for someone already sold; `#proof` is a
  one-word change in `siteContent.js` if they change their mind.
- **Auto-rotation is a judgement call.** 5s dwell, holds on hover, stops on
  click. If it reads as busy, make it hover-only.
- `ProofSection` still uses the flat ink `headline-mark` on "really" — untouched
  and consistent.
- `youtube.txt` in the deleted folder held a video not used on the site:
  `-cDk4ztkWaw`. Recoverable via `git checkout a0c6425 -- "images from the home page"`.

---

## 9. 30 Aug (early hours) — section 04 rebuilt as four sections

The old `ProofSection` is **deleted**. So is the audience-style comparison
scaffolding used to choose its replacement. Nothing is committed yet.

### What replaced it

```
04a  ProofWallSection    id="proof"         832px
04b  InterviewsSection   id="interviews"    861px
04c  ReceiptsSection     id="receipts"      951px
04d  TestimonialsSection id="testimonials" 1145px
```

One 2,139px section became four. It is more page, not less — that was the
client's call after seeing all of it, and the wall now carries the argument
early so the length after it is opt-in.

**`#proof` moved to the wall.** Both `NAV_LINKS` and the proof bar's "See the
proof" link point at it, so the id had to follow, not the file name.

- **04a Proof wall.** Three columns of real evidence drifting at different
  speeds behind a small ink card holding the question and one CTA. The card is
  deliberately small: it was tried holding the lead video and the receipts,
  and a card big enough for them covers the wall it is meant to stand in front
  of. The disclaimer is pinned to the section's bottom — centred with the card
  it floated mid-wall with 186px of dead space under it and read as a sticker.
- **04b Interviews.** Ink band, because video wants the lights down and it
  separates 04b from the paper sections either side. Stage on the left, all
  twelve interviews in a scrollable list on the right. Twelve in a grid is four
  rows of large thumbnails. The list carries `data-lenis-prevent` — without it
  Lenis scrolls the page while the pointer is over a list that plainly scrolls
  itself. (Lenis 1.3.26; the attribute is supported.)
- **04c Receipts.** Three screenshots, each with its figure on a plate that
  overlaps the image, because the number is the claim and the screenshot is the
  evidence for it. Middle card steps down at `lg` so three cards do not read as
  a table. The disclaimer lives here now, with the figures it qualifies.
- **04d Testimonials.** Two full-bleed rows, running right then left. It was
  built with three; three put every one of the six names on screen **three
  times**, which looked like padding. Two rows halve that and save ~370px.

### Videos: 5 → 12

Pulled from the channel's **Popular** tab (`@sammyecomsniper`), which needed the
browser — the page is JS-rendered and WebFetch gets only the shell. Seven added,
all member-success stories, with the view count each had recorded in
`siteContent.js` so the next person to prune can see what was popular rather
than guess. Thumbnails downloaded at maxres into `src/assets/video`, because
posters are local here on purpose.

**Deliberately excluded, and worth a decision.** The channel's three most-viewed
videos are sniping guides, and further down sit "Multiple eBay Accounts with
LLCs (Full Stealth Guide)", "MC011 Account Restriction Removal", "Avoid
Suspensions" and one whose own title mentions "Fake INRs". They are popular and
they are about evading eBay and Amazon enforcement. On the page selling the
product they read as an admission. The reasoning is in `siteContent.js` so they
do not get re-added by accident. If the client wants them, that is their call.

### Stars now come from data

Every review rendered five gold stars and announced "Rated 5 out of 5", with no
score anywhere in the data. All three new sections use `RatingStars` with
`review.rating ?? 5`. It still lands on 5 — but from data, and a review that is
not a five will show as one the moment a score is added. Same class of problem
as the 4.6→4.7 and "90+"→41 fixes in §3.

### The open one

**Six reviews, two rows, every name on screen twice.** The honest fix is more
reviews — the profile has 41 — not a trick that hides the repeat. Roughly twelve
more would fill both rows without repeating.

### Traps found this session

**Do not drive the page with synthetic wheel events.** Lenis amplifies them; a
settling loop oscillates and overshoots by hundreds of pixels. Anchor clicks
work properly — `SmoothScrollProvider` has a document-level click handler that
routes any same-page `#` anchor through `scrollToTarget`. Append a hidden
`<a href="#id">`, click it, remove it.

**`scrollIntoView` still lies.** Using it to jump to §03 left the closer's
reveal at `opacity: 0` — the entrance never fired because ScrollTrigger never
saw the movement. It is not a bug in the section; it is §7's trap, and it will
waste an hour again.

**Screenshot pixels are not CSS pixels.** A 30px gap measured as ~120 in a
3× mobile capture. Measure in the DOM, per §7.

### Not a code problem: the Python errors

The `remember` plugin runs a `PostToolUse` hook that shells out to Python, and
`python` on this machine is the Microsoft Store alias stub — the plugin's own
error text warns against exactly that. It fired after every tool call. Disabled
in `.claude/settings.json` (backup at `.claude/settings.json.bak`) and the empty
`.remember/` folder removed. Nothing in this project needs Python.
