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
