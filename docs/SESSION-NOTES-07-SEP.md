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
