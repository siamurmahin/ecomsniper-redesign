# Session notes — 1 Sep 2026 (early hours)

Continues `SESSION-NOTES-31-AUG.md`. That file's §1 and §7 are still the
orientation and the trap list; this one only covers what happened after commit
`b7110cc`.

Read §4 and §6 — the traps. §5 is the one lesson worth taking from this
session as a whole: **open the live section before designing it.**

---

## 1. Where this stopped, and what is next

Sections 08, 09 and 10 have all had their pass. The walk is now at
**11 Comparison**.

```
11  Comparison        ← next in the walk
12  Pricing preview
13  FAQ
14  Assurance         (comment trim only)
15  Final CTA         (comment trim only)
```

Commits: `f48692d`, `42d8c76`, `ec164e3`, `b77c8bd`, `63c90f2`, `ceb0ec5`,
`71d6d04`, `5bc2331`, `40fd14c`, `da12455`, `48b0880`, `aa73867`.

Three throwaway labs were built and deleted this session — `/community-lab`,
`/training-lab`, `/founders-lab`. The pattern works and is worth keeping:
option 0 is what is live, every option carries its measured height, and the
losing options are deleted with the lab rather than left in the tree.

**`b7110cc` was sitting unpushed** when this session started, despite the
31 Aug notes saying all 27 commits were on `main` — the docs commit that wrote
that sentence was itself still local. Both are up now.

---

## 2. Section 04b — two children, one key

`f48692d`. The console carried this on every render of the homepage:

```
Warning: Encountered two children with the same key, `oEjX-90LJ8w`
    at button
    at InterviewsSection
```

Not the data: all twelve ids in `PROOF.videos` are distinct. Inside the stage
button, the poster `<img>` and the caption `<span>` are siblings and **both**
carried `key={lead.id}`. The keys are there on purpose — they restart the
`panel-in` fade on every turn of the 5s stage, which is what makes a change
read as a change — so neither could be removed. They are suffixed instead,
`-poster` and `-caption`.

React is free to drop one of a duplicate-keyed pair, and the one at risk was
the caption, which carries the guest name and the view count.

**Verified across a live stage turn**, not just by the gate: poster swaps,
caption follows, fade still replays.

---

## 3. Section 08 — chosen from three shapes

The 31 Aug notes left this section's evidence question open and marked it
**"Not decided — ask"**. It was asked, and the answer was to see all three
built, which is the client convention: render the options on a page with
temporary labels rather than describing them in prose.

`/community-lab` was built for it on the section 07 lab's pattern — option 0
is what was live, so every comparison is against the real thing, and each
option carries its **measured height**, because that is the cost of choosing it
and it is invisible in a screenshot.

```
0  live 29 Aug scaffold   three icon cards asserting the claims
1  the chorus             1,105px
2  drawn                    797px   ← chosen
3  sized slots            1,252px
```

**Option 1, "the chorus".** Fifteen of the eighteen reviews in `PROOF.reviews`
raise support or the community without being asked — the three that do not are
Allen, Tyrone and Delta. That ratio is itself a checkable figure, and verbatim
fragments cut at clause boundaries were pinned under the claim each one proves.
Not chosen, but **the count was re-derived from the file this session and it
holds**, so if the section is ever revisited the evidence is still there.

**Option 3, "sized slots".** Plates at a stated ratio for captures the client
has never supplied. **If those captures ever arrive, this is the shape to
rebuild** — it is the only one that puts real evidence in this section.

**Option 2 won and the lab was deleted with the other two.** The section claims
a question at 2am gets answered; this draws that happening, in DOM and CSS, the
way section 07 draws its four steps. No player, no new dependency.

Decisions worth keeping:

- **The thread composes itself.** Dots while a reply is written, then the reply
  typing in. The claim is about a reply *arriving* — a thread that is simply
  present when you reach it shows the aftermath instead.
- **One rAF loop writing `textContent`, never React state.** A character every
  18ms through `setState` re-renders the subtree ~55 times a second, and
  section 06 already established what that costs on this page.
- **Rendered in full first, cleared only when the sequence starts.** A visitor
  whose observer never fires, or whose JS never runs, reads the finished
  conversation rather than empty bubbles.
- **Each bubble stacks the typed layer over an invisible copy of the finished
  sentence in one grid cell.** Measured: the card holds **574px for the whole
  run**. A bubble that grows as it types walks the page down the screen while
  it is being read.
- **Gated on the card being 40% in view.** The sequence is ~4s; running it on
  mount means a visitor arrives at a conversation that finished without them.
- **The accessible name is the finished sentence.** The typed layer is
  `aria-hidden` — it spends most of its life as a fragment.
- **Labelled an illustration, in words, under the panel**, on the hero panel's
  rule. An invented interface that does not say it is invented is a claim.
- **Faces are photographs already on this site** — both founders and one member
  from the interviews. Cropped per image: the interview thumbnails are 16:9
  with the face right of centre at different heights, so one shared
  `object-position` puts at least one of them off-centre.
  `thumb-security-guard-300k` was a candidate until it was actually looked at —
  it is a rendered illustration, not a photograph.
- **No invented names.** The member in the pile is not named in `PROOF.videos`,
  so the pile is `aria-hidden` and the strip carries the words.
- **The chip reads `+400`**, the member figure the section already claims, in
  the gold that claim wears in the column beside it. Not a seat count for a
  call nobody has counted. Ink on gold is 7.5:1; paper on it misses even the
  3:1 bar.

**The left column was tried as cards** — tone wash, an always-on tone rule, a
tile answering the pointer, each row carrying its `body`. It balanced the
column against the card (635px against 611px, where the bare rows leave it
~200px short) and **the client rejected it**. The bare rows are what ships. Do
not rebuild it.

`COMMUNITY.pullQuote` went with `ec164e3`. The deck asked this section for one
verbatim member quote about support and it already has one **in 04d** — Clay C
is one of the eighteen, so that exact sentence renders on the page with its
attribution and a link to the profile. A comment sits where the data was, so
the deck line is not read as unmet and quietly restored.

---

## 4. Traps found this session

**A rAF loop that reads past the end of its own array dies silently.** After
the last reply the loop set `phase = 'tail'` but still ran
`const step = steps[index]` at the top of the next frame, with `index` now past
the end. `TypeError: Cannot read properties of undefined (reading 'full')`,
thrown **inside the rAF callback** — nothing catches it, the loop simply stops,
and the closing "two more members replying" line stayed hidden for good. The
tail phase is handled before anything indexes the array now.

Worth the general form: **an exception inside a rAF callback ends the
animation and leaves the DOM in whatever half-state it had reached.** It does
not look like a crash. It looks like a design decision.

**A wrapping flex row with two fixed-width children starves the flexible one.**
Section 08's weekly-call row was `flex-wrap` with a 40px icon and an 88px face
pile either side of a sentence. On a phone the sentence got ~137px and the row
ran to **316px tall**. It is one grid placed differently per width now — the
pile sits on the title's line below `sm` and the sentence takes the full width
under it — and the row is **124px**. Desktop went 106px → 112px.

Card padding below `sm` was the same class of problem measured a different way:
the gutters, the reply indent and the bubble were spending **104px of a 361px
screen** before a word of the conversation appeared.

**The console buffer in browser automation is cumulative.** A duplicate-key
error "still present" after a fix was three copies of the error from before it.
Clear the buffer, reload, then read — otherwise you are debugging history.

**Do not read a CountUp figure off a screenshot.** The proof bar was reported
this session as claiming "142+ members" against section 08's "400+". It does
not: `PROOF_BAR` is `{ value: '400+', countTo: 400 }` and the screenshot caught
the animation at 142, the same way the score read 1.7 on its way to 4.7. There
was no contradiction and nothing to fix.

**`resize_window` can silently no-op on a maximized window.** It reported
success while `window.innerWidth` stayed at 1920 through several attempts. A
tab in a **freshly created window** took the resize immediately. Mobile numbers
in §3 were measured at a real 390px viewport after that, not computed.

---

## 5. Sections 09 and 10 — read the live site first

Both were designed twice: once from the rebuild's own copy, and again after
actually opening ecomsniper.io. The second attempt was better both times, and
the first was wasted. **Open the live section before designing anything.**

### 09 — what the live site does that the rebuild had lost

The rebuild had four numbered steps in a row above a full-width course band,
109px of a 1,286px section. The live site runs a **staircase** — each pill
indented past the last, so the shape says "step by step" before a word is read
— **beside** a portrait course card, with the CTA and guarantee under both.
That is 1,219px including instructor faces the rebuild did not have, against
1,286px without them.

The card ends on **the instructors, with faces**, which is what that space is
for. Every attempt to fill it with a syllabus failed because four module names
cannot carry half a card — and the live site has no module list at all. Adding
one is what put four numbered things on screen twice.

Two deliberate departures from live: the guarantee keeps "on the monthly plan",
and the instructors are read from `FOUNDERS.people` so the two names cannot
drift from section 10's copy of them.

**The steps count on a loop.** One mark — a ring in the step's tone and a tick
— travels 1, 2, 3, 4 and starts again on a 6s cycle, 1.5s each. Four ticks on
screen said "all done"; one that moves says what is being counted. Delays come
from the same `--i` as the indent, so the count cannot fall out of order. Its
resting state, with no JS or under reduced motion, is the mark parked on step
four: green ring, green tick, on the profit, which is the live composition.

### 10 — the section with no live counterpart

ecomsniper.io has nine sections and none is a founders block, so there was
nothing to read. Three shapes were built and rejected, all of them
arrangements of the same two paragraphs; **no layout of thin material reads as
anything but thin**, and section 09 had just spent the faces.

What fixed it was finding more material. `PROOF.videos` had a video labelled
"Member story / Ex-security guard"; on the channel it is **"Full Summary of
The Invisible Store" on Sammy's own channel**, and the book it summarises is
the free playbook this site already gives away. Nothing on the site said the
founder wrote it. That turns "trust the operator" into something checkable and
puts a third free door where the reader is asking who these people are.

Two real assets came out of `ecomsniper.io/free-play-book`:

- the **book cover**, 855×1370 with its own transparency — it had been a drawn
  plate until the artwork was found;
- a **960×958 photograph of Sammy**, resized to 800 square. The same shot as
  the 200×200 already in the repo, so every crop still holds. Every design
  decision about portrait size up to that point had been made around a
  limitation that did not exist. **Check whether a bigger asset exists before
  designing around a small one.** Marc is still 200×200.

Authorship is the client's own wording. That page says eight years where this
site says seven, and 300+ students where this site says 400+ members; the
client confirmed **this site's figures are the right ones**.

---

## 6. Traps found in the second half

**`window.scrollTo` does not trigger anything on this page.** Lenis owns the
scroll, so a native jump leaves the position unchanged as far as observers are
concerned and a scroll-gated animation never fires. This is §7 of the 31 Aug
notes and it has now cost time three times. Append a hidden `<a href="#id">`,
click it, remove it.

**A backgrounded tab throttles timers to roughly 1Hz.** A sampling loop with
210ms waits came back with ~1000ms gaps and every animation reading zero,
which looks exactly like a regression. `document.hidden` was true. Check it
before believing a timing measurement.

**A resting state and a JS-driven animation will fight over first paint.** The
step marks are hidden until the count starts, but the resting mark — the one a
no-JS visitor sees — was outside that rule, so step four sat ticked from first
paint and snapped back to step one when the count began. Anything drawn for
the no-JS case has to be suppressed under `.js-motion` as well.

**A duplicate key in an object literal is silent.** Adding `TRAINING.cta`
without noticing the existing one meant the last definition won and the first
was dead. Lint did not flag it.

**`SectionHeading`'s `tone="ink"` only ever changed the lead.** The eyebrow
stayed on the paper variant, whose rule is drawn for a light ground, which is
why every ink section had been rendering its own eyebrow outside the
component. It carries both now.

---

## 7. Open

Unchanged from the 31 Aug list except that sections 08, 09 and 10 are off it:

- **`/design-lab` still ships.** 303 lines from the 29 Aug build, still routed
  in `App.jsx`, in the production bundle, not disallowed in `robots.txt`.
  `/community-lab` was deleted with its options; this one is still there.
- **`ReticleScene.jsx` is orphaned**, and `three`, `@react-three/fiber` and
  `@react-three/drei` are dependencies for it alone.
- **`VITE_PLAYBOOK_ENDPOINT` is unset**, so every free door leads to a form
  that fakes success.
- **Eight footer links 404.** The legal four matter most — the guarantee copy
  leans on a refund policy that is not there.
- **`FEATURES.items[].links` point at the live site.**
- **Dashboard screenshots are still mocks** in `FeatureTourSection`.
- **Trustpilot figures**: 4.7 from 42 reviews, read off the profile 30 Aug.
  They drift.
- **No community captures.** If they arrive, see option 3 in §3.
- **`founder-marc.jpg` is still 200×200.** Sammy's is 800 now. A larger one of
  Marc is the last thing blocking a founders treatment built on photography.
- **The founder's book summary is still filed as an interview.** Labelled
  honestly and stripped of its figure, but section 04b introduces its twelve
  videos as members. Removing it takes that section to eleven — a content call.
- **`PLAYBOOK.privacy` is now on the page.** "Your information is 100% secure
  and will never be shared" sits under the section 10 door, so the endpoint
  behind `VITE_PLAYBOOK_ENDPOINT` has to be able to keep it.
