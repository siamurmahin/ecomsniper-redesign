# Blog — `/blog` and one post

Captured 3 Sep 2026 after `readyState === 'complete'`.

Only one post is captured, by decision — the blog may move to a CMS, and
transcribing nine posts that then get imported from elsewhere is work done
twice. The template shape is what the rebuild needs.

---

## The index — `/blog`

Page title: "Blog | EcomSniper - Dropshipping Insights & eBay Tips"
1923 characters, **12 post links**.

**Controls:** a search field, then category filters —
`All` · `Dropshipping` · `General` · `News & Updates` · `Tools & Features` ·
`eBay Tips`

**Card shape**, from the rendered list:

```
[category]  [read time]
[title]
[optional #tags]
EcomSniper Team
[date]
Read more
```

One card is marked **Featured** and carries no date, only "6m Read".

### The twelve live slugs

1. `how-us-tariffs-in-2026-are-changing-ebay-dropshipping-what-suppliers-to-use-now-and-how-to-protect-your-margins`
2. `ebay-cassini-algorithm-in-2026-what-dropshippers-must-know-to-rank-higher-and-get-more-orders`
3. `ebay-feedback-strategy-for-dropshippers-in-2026-how-to-build-seller-reputation-fast-and-protect-it-long-term`
4. `ebay-dropshipping-supplier-vetting-in-2026-how-to-find-reliable-suppliers-and-avoid-the-ones-that-kill-your-account`
5. `ebay-promoted-listings-in-2026-are-they-worth-it-for-dropshippers-and-how-to-use-them-without-killing-your-margin`
6. `ebay-dropshipping-taxes-in-2026-what-every-seller-actually-owes-uk-us`
7. `ebay-vero-violations-the-complete-2026-guide-for-dropshippers-how-to-check-avoid-and-recover`
8. `building-the-engine-for-the-next-era-of-ecomsniper`
9. `ebay-dropshipping-profit-margins-in-2026-real-numbers-hidden-fees-and-how-to-never-sell-at-a-loss`
10. `ebay-se…` _(truncated in capture)_

Plus two more not read off before the capture was cut.

### The sitemap and the index share nothing — corrected 3 Sep

An earlier version of this file said the sitemap listed posts that no longer
exist. **That was wrong.** Checked directly:
`/blog/how-we-avoid-vero-ebay-dropshipping` renders in full — 9,419
characters, dated Wed Apr 08 2026.

The real shape of it:

```
live on /blog   12 posts
in sitemap.xml   9 posts
in both          0
```

So the nine sitemap posts are live but no longer linked from the index —
orphans — and the twelve current posts are in no sitemap. Both directions are
broken, and neither is the "dead URLs" first recorded. See
`docs/AUDIT-THEIR-SITE.md` §2.

---

## One post — `/blog/building-the-engine-for-the-next-era-of-ecomsniper`

Page title: "Building the Engine for the Next Era of EcomSniper"
**25,723 characters. 24 min read.** A founder's letter, not a how-to.

### Metadata shown on the page

```
Title:      Building the Engine for the Next Era of EcomSniper
Author:     EcomSniper Team
Date:       Thu May 28 2026
Read time:  24 min read
```

### Opening

> Building the Engine for the Next Era of EcomSniper
> A Founder's Letter to the EcomSniper Community
>
> Bismillahirrahmanirrahim.
>
> Assalamu Alaikum.
>
> To Baba, Icy, and everyone in the EcomSniper community,
>
> First and foremost, I want to thank you honestly from the bottom of my heart.
>
> For those of you who have been here for a long time, I want you to know that
> I remember you. We remember you. You are not just a username in a group or a
> customer in a system. You are people who believed in us, supported us, and
> stayed with us through different phases of this journey.

Body not transcribed — 25KB of prose that would be imported rather than
retyped if the blog moves to a CMS.

### What the template needs

Title, author, date, read time, a body of long-form prose with its own
subheadings, and tags. The date renders as a raw `Date` string —
`Thu May 28 2026` — rather than a formatted one.

### A defect on the post page

**Two `<h1>` elements with identical text.** The title appears once as the page
heading and again as the first line of the article body. One of them should be
an `<h2>` or not a heading at all — duplicate H1s are the same class of
problem the accessibility pass fixed on the homepage.

Not filed as an issue against their site because the rebuild will not
reproduce it; noted here so the template does not inherit it.
