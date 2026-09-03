# Session notes — 4 Sep 2026

Continues `SESSION-NOTES-03-SEP.md` without a break — the date rolled over
mid-session. Read that file's §6 for the measuring traps; they still apply.

---

## 1. Where this stopped, and what is next

**9 pages left.** Affiliate is built and pushed.

| Next up             | State                                                        |
| ------------------- | ------------------------------------------------------------ |
| Contact             | Needs a form-endpoint decision — the only thing blocking it  |
| Blog index + 1 post | Ships static; template shape captured                        |
| Terms               | **Blocked** — their page is empty                            |
| 4 feature pages     | Need the slug call (`/product-hunter` vs `/productHunterV6`)  |
| Course              | Needs client sign-off on the income claims                   |
| Affiliate landing   | New, optional — see §3                                       |

Branch state: everything on **`prerender`** through `299ccac`. `main`
untouched.

---

## 2. The budget ceiling went up, deliberately

560KB → **575KB**, agreed with the user before building further.

What grew was never application code: it is the router's route manifest, about
**1KB per route**, and it is eager because hydration cannot begin without the
route table. At 557KB with ten pages to go, the budget would have fired on the
next page, and "make it lazy" — the answer that worked for page copy the day
before — has no purchase on a manifest the router needs in order to start.

Why this was the right 15KB:

- Prerendering already took paint off the critical path. The document draws
  from HTML with no JavaScript, so none of this touches LCP.
- What it does affect is hydration and TBT, and that has measured room:
  **0ms** total blocking time against **120ms** on the live site.

**Where the 15KB comes back:** `errorBoundaries` is 107KB eager and
`vendor-react` 187KB, and neither has been looked at. That is tuning work and
the phase is building out. Recorded in `TODO.md` under Future.

If the budget fires again on something that is not the manifest, it is a real
regression. Look before raising it.

---

## 3. Affiliate

`299ccac`. Their `/affiliate/join` is **not** a signup page — no form, no
inputs, no redirect to login. It is the programme's terms and conditions, a
public legal document, which is what affiliate terms are for.

So it is reproduced as one: 11 numbered clauses at a reading measure, no cards.
The numbers are content, because a clause gets referred to by number.

Their footer links "Affiliate" to `/login`, so today the terms are unlinked
while a password prompt sits where the programme should be. Ours links to the
page, and our footer gained the row it was missing entirely.

Two omissions, both deliberate:

- The **NEW / UPDATED badges** on clauses 2, 3, 4, 6 and 8. They date their
  edit and mean nothing to a first-time reader.
- The **commission percentage**. Their own terms decline to state it
  ("communicated separately"), so it is not ours to supply.

**Open question for the client:** whether they also want a programme *landing*
page in front of the terms — what an affiliate earns, how it works. That is
what "Affiliate" in a footer usually promises, and it is a different page.

The German translation is positionally mirrored against the English, because
the deck merges arrays **by index** — a clause added on one side without the
other silently shifts every clause after it. Adding one means editing both
files in the same commit. It is not legally reviewed and sits under the same
open item as the privacy and cookie policies.

---

## 4. Careers, from the tail of the 3 Sep session

`816ece3`. Static list. Their page renders four filter controls and a search
field above **one** listing; none of that survived, because a filter over one
row is furniture pretending to be a feature.

The role description is **left blank on purpose**. Theirs reads "This is a one
liner description" — placeholder text that reached production. Every other fact
about the role is real and kept. A job advert is a promise about work and pay.

German translates the page furniture and the role's location and type; title,
department and salary fall through to English deliberately. The terms of an
employment advert are not ours to translate unreviewed.

---

## 5. Two findings that touch our own build

Both came out of the audit and both are still with the user:

- **`t.me/ecomsniper` is a personal account** — "Sammy EcomSniper, Lead
  Developer", a Send Message button, no member count. It is in our footer
  labelled Telegram, which implies a community. The client supplied the
  address, so it has not been changed unilaterally.
- **`@EcomSniper` on X belongs to someone else** — an unrelated dormant
  Shopify account from 2016, one post, seven followers.

---

## 5b. The client deck

`docs/CLIENT-DECK.md`. Twenty slides, written as **build instructions** rather
than a document to interpret — Canva runs from the other end of the connector,
on the user's claude.ai account, not from this session.

Constraints the user set: white background, black text, presentation shape,
persuasive. So the design rules are explicit and restrictive — one red accent
for a broken number, green only on the three "already fixed" slides, 35 words
of body maximum, no icons or stock imagery. The file ends with an instruction
not to invent any statistic that is not in it, because the deck's whole force
is that every figure is checkable.

Two corrections caught before it shipped: a stray character in the German
table, and "Pages as real HTML: 16", which was true when the audit ran and is
now 20. The build grew between the measurement and the deck — worth watching
for on every future re-run of these numbers.

---

## 5c. About — the design pass

`ff66467`. The page was typeset, not designed: seven left-aligned prose bands,
the right 45% of each empty, a figure that read like a form field, and none of
the homepage's visual vocabulary — so it did not look like the same site.

Five changes, all from existing tokens and components. No images, no
dependencies, nothing new on the first screen.

The hero ships as one component with three variants behind a prop, and
**`/about-lab`** renders all three for the choice. Not prerendered, not
linked, marked noindex, and asserted at commit time to emit no document. It
gets deleted with the two losing branches and their content keys.

Two content restructures, both their words rearranged rather than new claims,
and both noted in `content/en/about.js`:

- `cost.hours` / `cost.unknown` — the first sentence of the cost section split
  so the hero can show it as a comparison. Delete with variant A if it loses.
- `giving.gifts` — the three things one sentence names, split into three
  cells. Bodies verbatim; labels are headers over their own words.

### The trap this pass found

A screenshot showed the ink panel rendering **grey** and the headings missing
entirely. It looked like a styling bug. It was not: the localhost tab was not
the *selected* tab, background tabs throttle `requestAnimationFrame`, and GSAP
runs on rAF — so every reveal was frozen mid-animation at `opacity: 0.088`.

Setting `style.opacity = '1'` does not fix it, because GSAP owns those inline
styles and overwrites them. What works is dropping `js-motion` from `<html>`
and removing the inline styles outright. Now in `CLAUDE.md`.

Same family as the three traps in the 3 Sep notes: **a thing read before it
had settled, and the reading believed.**

---

## 6. Housekeeping

Per the rule set on 3 Sep, this file was created when the date rolled rather
than at the end of the day, and is updated as work lands.

The 3 Sep note's §4 carried a claim that was later disproved — that their
sitemap listed dead blog URLs. It has been corrected in place there, in
`source-copy/blog.md`, and in `AUDIT-THEIR-SITE.md` §2. The real shape: 12 live
posts, 9 in the sitemap, **0 in both**.
