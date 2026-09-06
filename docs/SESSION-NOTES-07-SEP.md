# 7 September 2026

Continues from `SESSION-NOTES-06-SEP.md`, which ran past midnight — the
Competitor Research build and the `lhci` correction are in that file.

## Price Monitor, and the four feature pages are finished

The last of the four, and the only one that had no decision waiting for it.
Their site publishes the other three twice, under a readable slug and a `V6`
one, with different copy in each; this page exists as `/priceMonitorV6` alone,
with no sitemap entry, reachable from their nav and their JS bundle. So there
was nothing to choose between. `/price-monitor` is ours, written to match the
three beside it, and `/priceMonitorV6` 301s onto it exactly as the others do —
which makes it the one slug on the site the client is most likely to have an
opinion about, and it is flagged as a naming decision rather than a
reproduction.

### The page is not a list of steps, and that took noticing

Product Hunter and Competitor Research are both numbered lists, because using
those tools is a procedure: find the seller, extract the titles, scan Amazon;
or spot the competitor, scan the store, undercut, list. The obvious third page
is a third numbered list.

This product has no procedure. Its entire claim is that **you do nothing** —
the software watches, and the reader's involvement is that they were asleep. A
numbered list here would have been the previous page's shape borrowed, and it
would have invented steps to fill itself. So the page is the two cases their
copy names, then the background claim, and it is shorter than the two before
it because there is less to do.

### The panels drop the beam

`WatchPanels` imports the window chrome, the row stagger and the `.hunt-*`
rules from `HuntPanels`, the same as `SnipePanels` does. What it deliberately
does **not** import is `ScanningState`.

A skeleton state is honest on the other two pages: a scan is running and the
reader is waiting for it. Here nobody was waiting. The events arrive and stay,
the way a log does, because the panel is showing something that already
happened while the reader was not there.

**The one repeating animation on the site is on this page.** Everywhere else a
looping animation has been removed for saying "still loading" — the infinite
sweep taken out of the hunt table, the note above `hunt-hit` about a colour
that keeps breathing turning a result into a status light. The 6px dot beside
"Monitoring" is the exception those removals define: the page's sentence is
that something is still running, and a status light that stops contradicts the
words next to it. Opacity only, so it composites and never lays out, and the
global reduced-motion rule collapses it to a single 0.001ms iteration — which
leaves the dot at full strength, reading as on rather than as broken.

### Their copy, and the two paragraphs that are not theirs

Everything on the page is their wording except the two case bodies. Theirs are:

> **Prices change** — Never have an issue keeping track of your inventory for
> price changes.
> **Items go out of stock** — Never have an issue keeping track of your
> inventory for stockouts.

Both repeat the headline's own sentence with one word swapped. That is
placeholder nobody came back to, and reproducing it faithfully would ship the
same hole in a rebuild whose argument is that the details were looked at. The
replacements say what each case actually costs a seller — margin on the price
side, a defect on the account on the stock side — and every claim in them is
one their own page or the homepage already makes. Filed under Blocked to be
replaced or signed off, the same as the job advert and the blog bodies.

### A stale link found while looking at something else

`/blog` shipped yesterday. The footer's Blog link did not move with it, so a
link in the site furniture — on every page, in both languages — still pointed
at `ecomsniper.io/blog`, which is a soft-404 on their own site. It is the exact
defect `ISSUES.md` records against them, shipped from here.

Now `/blog`. About is the only external link left in the footer, and only until
that page exists. Worth a rule rather than a fix: **a page landing is not
finished until every link that was waiting for it has been moved**, and the
homepage pills got that treatment on both feature pages while the footer was
not checked either time.

### Numbers

| | |
| --- | --- |
| Page chunk | 14KB lazy, 4.5KB gzipped |
| Eager JS | 591,853 → 594,299 bytes (+2,446, two routes) |
| CSS | 132KB → 133KB |
| Sitemap / documents | 42 URLs, 44 prerendered documents |

The eager growth is the route table again, and it lands inside the 586 ceiling
raised for exactly these six routes yesterday — 6KB still spare with two pages
left to build.

**The placeholder heights were guessed wrong again, in a new way.** The first
pass reasoned "two cases is half of four steps" and set 1200px and 2000px
against Competitor Research's 2250 and 3900. Measured: 1280px and 2430px. Two
cases are not half of four steps, because the band's own eyebrow, headline and
lead do not halve with the list inside it. Read off the built page, as the rule
says, rather than derived from the page before.

## The lhci note was wrong twice, and the third version admits it

Yesterday's note said the `EPERM` at cleanup was fixed by redirecting `TMP`.
That was corrected last night to "close the `chrome-devtools-mcp` browser; that
is the whole fix", after the redirect failed at the new path.

Today it failed with no browser open at all. Then, in a single invocation, runs
one and two passed and run three failed — same command, same conditions, same
minute. That is not a variable anybody controls; it is flaky, and both fixes
were coincidences that happened to sit next to a passing run.

`CLAUDE.md` now says so, names both wrong diagnoses so neither gets re-derived
from the same symptom, and says to check `.lighthouseci/` for written reports
before reporting the gate as failed. It also says not to write a third fix in
there without three failures and three passes each way.

The pattern is worth stating on its own: **a fix confirmed by one passing run
is a coincidence with a commit message.** Twice now the confirming run was the
first one after the change, and twice the change was not what made it pass. The
gate does pass — three runs, every assertion, on the fourth invocation.

## About, off the shelf

Parked on 4 September mid-design, with four hero passes in an unrouted file and
two questions left open: whether the hero was the closest of those passes, and
whether the offer moved up from seventh. Both were answered today, and the page
was built from the parked material rather than restarted — which is the whole
reason the Parked entry was written the way it was.

### The hero

`hero-03`'s device is a right column that does not end: cards running off the
top and bottom edges so the eye reads "there is more of this" without a word
saying so. What does not transfer is its content — that column is filled with
revenue dashboards, and this page promises four screens down that it will not
show screenshots of big earnings.

So the wall is real Trustpilot reviews. Decided 4 Sep and still right: it keeps
~243KB off the first screen, keeps LCP as text, and the reviews corroborate
what this page actually claims — that the team answers its own support and is
straight with people. A charity photograph cannot corroborate that; it can only
decorate it. The photographs have their own section further down, where they
are the subject.

**The money filter moved across with the wall**, and it is the part of this page
worth keeping. Any review quoting a sum of money is dropped from the hero, so a
review added to the deck next month cannot quietly break a promise made further
down the same page. Today it removes exactly one — the reviewer who reports
turning $99 into $500 — and it is deliberately blunt, because a filter that
tried to tell a fair mention of money from an unfair one would be a judgement
call re-made every time the deck changed.

### The order is not theirs, and that was the user's call to delegate

Their page: cost, origin, giving, boundaries, responsibility, **offer**, team,
invitation. The one section saying what a reader receives for their money is
seventh, after four screens of ethics.

Here it is third. The page now reads: this is what it costs you, this is what
you get, this is how we behave. Everything after it keeps their sequence,
because origin → giving → boundaries → responsibility earn each other properly
in that order and there was no reason to touch them.

### The sixth photograph is gone

Their gallery is six images. Five are the client's own charity work; the sixth
is an Unsplash stock photograph captioned "Moments that matter", sitting among
them three screens below a promise not to create false impressions, on the one
page whose entire argument is that this company is honest.

It is out of the deck, out of the asset map and off the disk. Five real
photographs is not a gallery with a hole in it — it is the honest version of
the same gallery. The client is still told, in case they have a sixth real
photograph to send.

### The lab was deleted, not kept

`AboutHeroLab.jsx` held four passes of design and a commented line in
`routes.js` that would restore it. Both are gone. What it established is in the
page header and in `SESSION-NOTES-04-SEP.md` §9, and a lab kept "just in case"
is a second version of a page waiting to drift out of step with the first.

It paid for itself on the way out: **CSS went down**, 133KB to 130KB, because
the utilities only the lab used went with it. That is the first time this
budget has moved in the right direction without anyone trying.

### A third screenshot artefact, and the check that settles it

The full-page capture showed the site header floating in the middle of the hero
and every gallery tile blank. Both were the picture, not the page: the header
is `position: fixed` and the capture ran at `scrollY: 4700`, and the five
images were all `complete: true` at their natural sizes with the tiles rendered
at 397 × 298.

That is three today. The check is the same one every time and takes a single
evaluate: read the geometry and the load state out of the DOM instead of
looking at the picture. It is now quicker to do that than to talk myself out of
believing a screenshot.

### Numbers

| | |
| --- | --- |
| Page chunk | 26KB lazy, 8.3KB gzipped |
| Eager JS | 580 → 583KB, two routes, inside the 586 ceiling |
| CSS | 133 → **130KB** |
| Sitemap / documents | 44 URLs, 46 prerendered documents |

`giving-education.webp` is 1100 × 688 for a slot that renders at 397 × 298,
where the other four are 720 × 540. 94KB, lazy, below the fold — filed as a
tidy-up for the image pass rather than re-encoded on its own.

## Two new asks, recorded before either is built

The header nav reorganisation — no hash links, a Features dropdown — and the
login and registration designs. Both went onto `TODO.md` under Now with what
has to be settled first, which is the rule this file keeps.

Two things worth writing down rather than discovering later:

**The nav dropdown is eager JS.** `SiteHeader` lives in the `SiteChrome` chunk
and renders on every route, so a dropdown's open state, its outside-click and
Escape handling and its focus management are paid for by every visitor on every
page, including the ones who never open it. Measure it against the 586 ceiling
before building, and price a `<details>` or CSS-only version against it. This
is exactly the case the speed gate exists for.

**The auth pages contradict a Decided row.** "Everything except login,
registration and checkout" has been the scope line since the start. Rather than
quietly building past it, the row now points at the new entry. Taken as a
design ask — there is no server here, `ssr: false` — so the pages will carry
layout, fields, states and copy in both languages, and say plainly that they
are not connected, the way the contact form already refuses to fake a delivery.
A form that looks like it logs you in and does not is worse than no page.

## The nav, and a cascade rule worth knowing

The header was a table of contents for the homepage: four of its seven entries
were hash links into homepage sections, which is exactly what it should have
been when the homepage was the only page. Fifteen pages later it was pointing
at the wrong document, and the four feature pages — a week of work — were
reachable from nothing but a pill in section 07.

Now it is a **Features** dropdown over the four tools, then Pricing, Blog,
About, FAQ, Contact. Proof, How it works and Training are gone from it: they
are homepage sections and the homepage is the logo, one click from anywhere.
Careers and Affiliate stay in the footer, where a visitor looks for a company's
own business rather than its product.

### It cost 1,548 bytes because it reused what was already there

`SiteHeader` renders on every route and lives in the eager `SiteChrome` chunk,
so a dropdown's machinery is paid for by every visitor including the ones who
never open it. That was flagged before building rather than after.

What made it cheap is that the component already had the machinery: Escape, an
outside `pointerdown` and close-on-route-change were written for the mobile
panel. The dropdown joined the same three effects instead of bringing its own,
so what it actually cost was one piece of state and the markup. Measured on
both sides: 597,012 → 598,560 bytes.

Body scroll locks for the panel and deliberately not for the dropdown. A
dropdown is a few links in a bar, the page behind it stays usable, and locking
the page for it is the modal treatment applied to something that is not a
modal.

The links also stopped being `<a>` and became `Link`. They were anchors because
four of them were hash links; with every entry a real route, an anchor reloads
the entire application to move between two prerendered pages the router already
holds.

### An unlayered `!important` is the weakest important there is

The dropdown's panel is `hidden` when closed rather than unmounted, so the four
hrefs sit in the prerendered HTML for a crawler. That is not the same as being
reachable, and with scripts off the button does nothing — which would have put
four pages behind a control that cannot work, on a site that fixed exactly this
class of bug yesterday.

The fix belongs in `noScriptStyles`, which already exists for it. The rule took
three attempts:

1. `[data-nav-group-panel]{display:flex!important}` — computed to `none`.
2. `[data-nav-group-panel][hidden]{display:flex!important}`, two attributes to
   outrank preflight's one — computed to `none`.
3. The same rule wrapped in `@layer base` — `flex`, and all four links
   reachable.

Tailwind v4 preflight declares `[hidden]{display:none!important}` inside
`@layer base`. **For normal declarations an unlayered rule beats a layered one.
For important declarations that order reverses**, so an unlayered `!important`
loses to every layered `!important` no matter how specific it is. Joining the
same layer puts ordinary specificity back in charge, and the two-attribute
selector then wins on its own merits.

The other rules in that file stay unlayered on purpose — they compete with
nothing important, and unlayered is the stronger place for them.

Two attempts were spent writing more specific selectors, which is the natural
move and the wrong one: specificity cannot cross a layer boundary for an
important declaration. The browser said so in one `getComputedStyle` each time,
which is the only reason this took minutes rather than an afternoon.

### The ceiling is nearly spent

585KB against 586. The Dropship Mastery course page is two more routes, roughly
2.6KB of route table, so the eager budget needs a decision **before** that page
rather than after it — noted on `TODO.md` beside the page itself. The repayment
is still `errorBoundaries` at 107KB and `vendor-react` at 187KB, neither of
which has been looked at once.

## The About hero wall became the homepage's, on request

Asked for section 04d's testimonial animation and design in the About hero, so
the static staggered wall built this morning is gone and the hero now runs the
same component's card and the same motion: `card-ink`, the initial disc, the
rating drawn from each review's own score, the body never clipped, dealt
round-robin into columns drifting at different speeds in opposite directions.

It defines nothing. `animate-rail-up`, `animate-rail-down`, `rail-hold` and
`edge-fade-y` are already in the stylesheet for 04d, so the CSS budget did not
move and a reader who has seen the homepage recognises this as the same
evidence rather than a second design of it. Two columns instead of three,
because the hero has half a screen where 04d has the full width — the same
reason 04d drops its own third column at tablet width.

### Two faults in the version it replaced

**The wall was `aria-hidden`.** The justification, written this morning, was
that the reviews appear again in the proof section further down the page. That
is true of the homepage and false of this one: About has no second reviews
section. The attribute was removing the page's only social proof from anyone
not reading it with their eyes, and the comment explaining it was quoting a
fact about a different page.

**Reduced motion parked it on the second copy.** The global rule collapses
every animation to its end frame, and the end frame of a looping rail is the
echo — so a visitor with reduced motion would have got the duplicate list with
the real one scrolled off the top and unreachable inside `overflow-hidden`.
`ProofWallSection` already solved this with `rail-viewport`, which gives the
box a scrollbar when the drift is off. Added, and the echo copy is not rendered
at all in that case: it exists to close a loop that is no longer running.

Both were verified rather than assumed — drifting, 32 cards with `overflow:
hidden`; still, 5,819px of content scrollable inside a 640px box with every
card reachable.

Worth noting that the second fault would have shipped invisibly to almost
everyone and been the *only* thing the machine this is built on would ever
show, since it runs with animation turned off system-wide.

## Dropship Mastery, and the page that argued with another page

The last page in the plan, and the only one on this site that is a sales page
rather than a description of something. So it is built as a funnel: the
promise, the mechanic, why the market works, what you get, who teaches it, what
other people say, a last door, the questions, the guarantee. Six routes to
`/pricing` on the way down, with the Discord beside the first one because the
free room is the right door for somebody who has not decided yet.

Their slug appears twice in their own sitemap — `/course/dropshipMastery` and a
lowercase `/course/dropshipmastery`. Ours is `/course/dropship-mastery` and all
four spellings, both languages, 301 onto it.

### Four things their page says that this one does not

Three of them are not a matter of taste. They collide with a promise the About
page makes **in the client's own words**, four screens down its own page:

> We will not show you screenshots of big earnings. Those create false hope.
> They make people spend money expecting the same results.
>
> We will not rush you with countdown timers or "limited spots." If you need a
> week to decide, take a week.

Against that, their course page carries "Learn How to Build a Six-Figure eBay
Dropshipping Business" in an H2, "Already Helped People Create A Second Income
Stream" in the H1's subheading, "I have done over $1,000,000 on eBay" in an
instructor bio, and a "Limited Time Bonus" of three $97 items struck to $0.

A site that promises something on one page and does the opposite two clicks
away has not been rebuilt; it has been re-typeset. So all four are held out and
all four are flagged for the client, who can reinstate them — but not silently,
and not while About says the opposite.

The bonuses themselves stay, and so do their values. What is gone is the
countdown around them. Saying what something is worth is ordinary; saying it
expires when it does not is the part About rules out.

### And one that is not a claim but an error

Their page states eBay has **"over 2 billion transactions daily"**. That is not
a real eBay figure — its own reported numbers are nowhere near it, and it reads
as a garbled version of its live listing count. It is a factual assertion about
a third party, so it is not carried at all: the section makes the same argument
from figures that are true and checkable. The client is asked what they meant,
because if it was live listings then the real number is worth having.

### What replaces an income claim in a hero

Three figures a reader can go and check: the Trustpilot score, with a link to
the profile it comes from; the member count; and the guarantee. That is the
whole substitution, and it is the same move the About hero makes.

Their $89 → $150 example is kept, because it is how they explain the model —
but labelled an illustration, and carrying a link to **their own blog post**
that works through the six fees which come out of that gap. A sales page
showing a 69% margin and saying nothing about fees is precisely the thing this
rebuild keeps taking apart on their behalf.

The proof is `TestimonialsSection`, the questions `FaqSection`, the guarantee
`AssuranceSection` — the site's own, not this page's invention. A sales page
that grows its own testimonial component is where a made-up testimonial
eventually appears.

### The last ceiling raise

+2,826 bytes for two routes, 598,856 → 601,682, so 586 → 590. It is the last
one the build-out needs and the reason is worth writing down: **blog posts do
not add routes.** `/blog/:slug` is one entry in `routes.js` and the prerender
list turns it into as many documents as there are slugs, so the five remaining
posts cost HTML files and nothing in this number.

Which means the next time the budget fires it is either a regression or the
repayment finally being attempted. `errorBoundaries` at 107KB and
`vendor-react` at 187KB have been named in that file since 4 September and
neither has been opened once.

## "Black and white, nothing impressive" — and the fix was already in the sheet

Fair, and it was worth hearing said plainly. The course page shipped as a wall
of white cards on paper and paper-sunk, with the tones showing up only as a
dashed ring around a number and a small tile on each bonus. Every other page
opens on something — the feature pages on a drawn software panel, About on the
drifting reviews — and the one page whose entire job is to sell had the least
to look at.

### What was added, and what was deliberately not

The hero has a panel now: the model as four nodes on an **ink** field, tones at
full strength instead of a tint on white, a halo at each node, and the brand
ramp at 7% underneath so it is not a flat black rectangle.

**Nothing new went into the stylesheet.** `system-wire`, `system-current` and
`system-node-halo` were written for section 06, to say that three separate
cards are one system. The claim here has the same shape — four steps that are
one loop — so the device is reused rather than reinvented. That is also why the
CSS moved 130KB to 131KB and not further: almost every class was already
generated for somewhere else.

Colour then goes in **structurally**, not as decoration:

- The four step cards take a rule down the edge, a solid number tile and a wash
  out of the far corner, in the tone that stage already wears on the homepage
  and the feature pages. Four identical white cards said nothing about which
  stage you were reading.
- The hero's three figures and the three reasons eBay works both run blue,
  gold, green — the same order the steps run — so the page has one colour logic
  rather than a different one per band.
- Red stays out of both. It is the tone this site uses for the thing that goes
  wrong, and spending it on a proof figure would cost it that meaning.
- The example panel's two numbers take blue and gold, the tones those two
  stages already wear, so the arithmetic is tied to the story rather than being
  two large grey numbers.

### One list, not two

The hero panel and the section below read the same four steps out of the deck.
A `kicker` and an `icon` joined the existing entries rather than a second array
being written for the panel — two lists of the same four steps is one edit away
from a hero that disagrees with the section under it.

### The thing not done

The design guidance for this kind of work warns against ALL-CAPS eyebrows and
accenting a single word in a headline, as generic tells. Both are used here,
and both stay: they are `section-eyebrow` and `headline-mark-ink`, the devices
this site has used on all sixteen pages since the beginning and lifted from the
client's own live site. Consistency across the site beats novelty on one page
of it, and a course page that quietly adopted different typographic furniture
would read as a page from somewhere else.

## The course page, rebuilt as a funnel

Asked for a CRO pass. The page was structurally sound — promise, mechanic,
market, offer, instructors, proof, close — and was leaking in six places that
have nothing to do with how it looks.

### The biggest one: it never said the price

"Enrol now" sent a reader to `/pricing` to find out what it costs. Price
discovered *after* the decision is where a funnel loses people who had already
made it, and it also made the guarantee meaningless — a risk reversal against
an unknown number reassures nobody.

$97 for the first month, then $199, cancel whenever, now sits beside the button
in the hero and again beside the button at the foot, with the 30-day reversal
on the same line both times.

### The H1 was a product name

"Dropship Mastery" tells a reader what the thing is called, not what changes
for them. The name moved into the eyebrow — still said, still indexed — and the
headline carries the promise.

The promise is deliberately **the mechanism, not an outcome**: "Learn eBay
dropshipping without buying stock first." No income, no timeframe, nothing that
needs a disclaimer under it, and it is the one thing that genuinely separates
this model from every other e-commerce course. On a page where four claims were
already held out for being unsupportable, the headline had to be the kind of
claim that survives being checked.

### Qualification, before anything is sold

Four things that fit and four that do not, including "you need this month's
rent from it" and "you want to be told exactly how much you will make — we will
not tell you, because we do not know."

Naming who should not buy costs a few sign-ups and buys back the refunds that
follow the wrong ones. It is also the About page's own promise being kept
rather than contradicted: *"we would rather have 100 users who get real value
than 1,000 who feel like they wasted their money."*

### Objections instead of the site-wide FAQ

`FaqSection` answers site-wide questions — the plans, the software, what the
community is for. None of those is what stands between a reader and this
button. The five that do: is it still worth doing in 2026, will eBay suspend
me, what do I need beyond the course, I have never sold anything online, and
what if I want out.

Three of them link to evidence rather than asking to be believed — our own
margins post, the VeRO guide, the FAQ's cost breakdown. Answering "will eBay
ban me" with a link to a guide we wrote about exactly that is worth more than
any amount of reassurance.

Two FAQs on one page would also have been two things claiming to be the FAQ,
and only one of them carries the schema. `/faq` keeps that, and is linked twice
from here.

### A sticky bar, and the trap under it

Ten thousand pixels with a door at each end. The bar carries the price and the
button, appears when the hero's buttons leave, and hides when the closing ones
arrive — so it is only ever on screen when no other door is.

**No urgency in it.** No timer, no counter, no "3 people are viewing this".
About rules that out, and it would have been the fourth thing on this page
contradicting a promise two clicks away.

The mechanism is worth writing down. The first version watched a 1px sentinel
placed under the hero buttons, and it never appeared. An `IntersectionObserver`
fires on threshold *crossings*: a zero-height element can start outside the
root — the hero is tall, the sentinel began below the fold — and then go from
not-intersecting straight to not-intersecting without ever crossing anything,
so the callback fires once on setup and is never heard from again. Watching the
button rows themselves, which genuinely enter and leave, cannot fail that way,
and "is one of the page's own buttons on screen" was the real question anyway.

### A measuring trap, again

Three separate readings said the bar was broken when it was not. The waits were
400–700ms, and this browser throttles rAF to a couple of frames a second —
`IntersectionObserver` delivery rides the same loop, so the callbacks had
genuinely not been dispatched yet. At 2,500ms every state read correctly.

`CLAUDE.md` already says this browser is useless for frame timing. It is worth
extending: **anything delivered on the rendering loop needs seconds, not
milliseconds, when read through it** — intersection observers, resize
observers, transitions. The fourth wrong reading of the week and the second
today, both from trusting a measurement taken too early rather than the code.

Eager JS and CSS both unchanged: all of it is in the page's own lazy chunk.
