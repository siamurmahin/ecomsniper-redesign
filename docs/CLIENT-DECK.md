# EcomSniper — client presentation deck

**Upload this file to Claude with the Canva connector enabled and say:
"Build this as a Canva presentation, following the design rules exactly."**

Every number in here was measured directly against ecomsniper.io on
3–4 September 2026. Nothing is estimated. The rebuild's own figures come from
the same Lighthouse run, against the production build. Do not soften, round, or embellish
any figure — the persuasive force of this deck is that it is checkable.

---

## DESIGN RULES — apply to every slide

- **Background: pure white (#FFFFFF). Text: black (#000000).** No gradients, no
  photographs, no stock imagery, no decorative shapes.
- **One accent only: red `#D0021B`** for a broken number or a problem word.
  Use it on no more than one element per slide. Everything else stays black.
- **A second accent, green `#1E7A4D`, appears only on slides 15–17** — the
  slides about what is already fixed. Nowhere else.
- **Type:** one bold sans for headlines (Archivo, Inter or Montserrat), the
  same family at regular weight for body. Nothing else.
- **Headline size ~54pt, big numbers ~140pt, body ~20pt, labels ~13pt
  uppercase with wide letter-spacing.**
- **Alignment:** left-aligned throughout. Do not centre text except on the
  title and closing slides.
- **Whitespace is the design.** Generous margins. Never fill a slide.
- **Maximum 35 words of body text per slide.** If a slide needs more, cut it.
- Slide numbers bottom-right, small, grey. No footer logos on interior slides.
- Do not add icons, emoji, or illustrations anywhere.

---

## SLIDE 1 — Title

**Headline:** Your website works for people.
It does not work for machines.

**Subhead:** A measured audit of ecomsniper.io, and the rebuild answering it.

**Small text at bottom:** 4 September 2026 · 16 URLs tested · 2 languages ·
14 findings

_Layout: centred. Nothing else on the slide._

---

## SLIDE 2 — How we checked

**Label:** METHOD

**Headline:** Measured, not estimated.

**Body, as three short lines:**

- What a search engine receives, before any JavaScript runs
- What a visitor sees, in a real browser, fully loaded
- Google Lighthouse, desktop, identical settings for both sites

**Bottom line, smaller:** Every figure in this deck can be re-run and checked.

---

## SLIDE 3 — The headline finding

**Big number:** 16 → 1

**Headline:** Sixteen pages. One identity.

**Body:** Every URL we tested returns the same file, and every one tells Google
to index the homepage instead of itself.

_Layout: the number fills the left half in black. Text on the right._

---

## SLIDE 4 — The proof

**Label:** WHAT EVERY URL SENDS

**Headline:** All 16 return a byte-identical file.

**Build a 4 × 4 grid of 16 small white boxes with thin black outlines.**
Each box contains a URL in small mono type, and beneath it, in **red**:
`canonical → /`

The 16 URLs:

```
/                      /pricing              /about                /contact
/blog                  /careers              /terms-and-conditions /privacy-policy
/affiliate/join        /course/dropshipMastery /productHunterV6    /product-hunter
/priceMonitorV6        /de                   /de/pricing           /a-url-that-does-not-exist
```

**Caption under the grid:** Unique titles: 1. Unique descriptions: 1. Unique
canonical tags: 1. File size: 6,024 bytes — the same for all sixteen.

---

## SLIDE 5 — Why that matters

**Headline:** A canonical tag is an instruction to Google.

**Body:** It says: _index that page instead of this one._

**Then, in red, large:** Every page on the site is currently volunteering to be
ignored in favour of the homepage.

---

## SLIDE 6 — What a crawler receives

**Big number in red:** 0

**Headline:** Words of content in the page a search engine is handed.

**Body:** The file contains one empty container. All copy, headings and links
are assembled afterwards, in the visitor's browser.

**Show this as a small code block:**

```
<body>
  <div id="root"></div>
</body>
```

**Caption:** Google can sometimes run JavaScript to see past this. Link
previews in WhatsApp and Slack, and most other crawlers, cannot.

---

## SLIDE 7 — Broken links look healthy

**Headline:** A page that does not exist returns "OK".

**Two lines, large, mono:**

`/a-url-that-does-not-exist` → **HTTP 200 OK** _(in red)_

**Body:** Search engines call these soft 404s. They waste crawl budget and can
be indexed as duplicates. The same rule means the site's own icon file returns
a web page instead of an icon.

---

## SLIDE 8 — The blog

**Three big numbers across the slide:**

**12** — posts live on the blog
**9** — posts in the sitemap
**0** — posts in both _(this number in red)_

**Headline:** Your best content is in no sitemap.

**Body:** The twelve current guides — tariffs, Cassini, VeRO, margins, account
health — are not submitted to Google at all. The nine that are submitted are no
longer linked from the blog, so nobody can find them by browsing.

---

## SLIDE 9 — The German site

**Headline:** Not a translation. A different, smaller site.

**Build a two-column comparison table. Left column English, right column
German. Right-hand numbers in red.**

| Measured            | English     | German      |
| ------------------- | ----------- | ----------- |
| Page height         | 11,682 px   | 5,109 px    |
| Copy on page        | 9,972 chars | 2,806 chars |
| Images              | 27          | 4           |
| Footer links        | 13          | **0**       |
| Language tag        | en          | **en**      |
| Canonical points at | itself      | **English** |

---

## SLIDE 10 — The German site has no footer

**Big number in red:** 0

**Headline:** Links in the German footer. There is no footer.

**Body:** A German visitor has no route to your privacy policy, your terms, or
your contact details from the page they land on. German law separately expects
an Impressum.

**Bottom line, in red:** This is the highest-risk finding in the audit.

---

## SLIDE 11 — German cannot rank in Germany

**Headline:** Three signals make a translated page rank. All three are wrong.

**Three lines:**

- The page declares itself **English** — `lang="en"` _(red)_
- Its canonical tag points at **the English homepage** _(red)_
- It has **no hreflang tags** at all _(red)_

**Body:** Screen readers will also read German text with English pronunciation.

---

## SLIDE 12 — Measurement

**Headline:** Ads are running. Nothing is measuring them.

**Two columns.**

**Left, headed "Running today":**

- Reddit Ads pixel — records a page view and nothing else
- Microsoft Clarity — records user sessions
- Tawk.to live chat

**Right, headed "Not present" — all in red:**

- Google Analytics
- Google Tag Manager
- Meta Pixel
- Any conversion or signup event

**Bottom line:** You cannot currently tell which ads produce customers.

---

## SLIDE 13 — Consent

**Headline:** No cookie consent, while EU sessions are being recorded.

**Body:** We checked for seven common consent tools. None is present. Microsoft
Clarity records mouse movement, clicks and scrolling, and it starts before
anyone is asked.

**Bottom line, in red:** You publish a German site, so you are inviting EU
visitors. Under GDPR this requires consent first.

---

## SLIDE 14 — Two things worth knowing

**Headline:** Two smaller faults, both costing you.

**First, headed "Your headings are unreadable to machines":**

What a visitor sees: IS THIS GOING TO WORK FOR YOU?
What the page actually says: **Isthisgoingtoworkforyou?** _(red)_

Every section heading on the homepage is affected. Screen readers and Google
read the second version.

**Second, headed "An earnings claim in two languages":**

"99% of users earn 1–3k per month after 3 months" appears on the English
homepage and three times in the German headings. Your own About page promises
you will not create false hope with earnings figures.

---

## SLIDE 15 — The comparison

**Label:** LIGHTHOUSE, DESKTOP, IDENTICAL SETTINGS

**Headline:** The same audit, run against both.

**Table. Left number black, right number green.**

| Metric              | Live site | Rebuild    |
| ------------------- | --------- | ---------- |
| Performance         | 75        | **96**     |
| Accessibility       | 87        | **97**     |
| Best practices      | 78        | **96**     |
| Time to interactive | 4.0 s     | **1.1 s**  |
| Page weight         | 1,928 KB  | **864 KB** |
| Pages as real HTML  | 0         | **20**     |

**Caption:** The rebuild is built. These are its measured numbers, not
projections.

---

## SLIDE 16 — The honest note

**Headline:** Lighthouse scores your homepage 100 for SEO.

**Body:** That is not a contradiction. Lighthouse runs JavaScript and grades
one page on its own, so it cannot see that sixteen pages all claim to be the
same page.

**Bottom line:** That is exactly why this survived for so long.

_Layout: quiet slide. Black text only, no accent. This slide builds trust —
give it room._

---

## SLIDE 17 — Already fixed

**Headline:** What the rebuild already does.

**Two columns of short lines. Small green tick before each.**

- 16 pages as real HTML, each with its own identity
- Genuine 404s for broken links
- German as a full site — correct language, own canonical, full footer
- Consent asked before any tracking loads
- Analytics wired and waiting on one ID
- The 99% earnings claim removed
- Headings that machines can read
- A speed limit the build enforces automatically

---

## SLIDE 18 — Your brand elsewhere

**Headline:** Your social presence is built around a person, not a company.

**Four short lines:**

- **YouTube** — 408 videos, 1,370 subscribers. The channel is named "Sammy",
  so none of that work builds the EcomSniper brand.
- **Telegram** — the link is a personal contact profile, not a community
  channel.
- **X / Twitter** — @EcomSniper belongs to an unrelated dormant account from 2016. The handle is not yours.
- **Reddit** — you pay for ads there and have no presence there.

**Bottom line:** The 408-video library is your most under-used asset. It is a
search channel of its own, filed under the wrong name.

---

## SLIDE 19 — What we need from you

**Headline:** Five things unblock the rest.

**Numbered list, generous spacing:**

1. **Google Search Console access** — we measured what your site sends. Only
   Search Console shows what Google kept.
2. **A decision on the earnings claims** — removed in the rebuild. If they
   return, they need evidence behind them.
3. **Your terms and conditions copy** — the page is currently empty, and your
   refund guarantee points at it.
4. **The real Telegram community link** — the one we have is a personal
   account.
5. **A Google Tag Manager ID** — everything behind it is built.

---

## SLIDE 20 — Close

**Headline:** Nothing here is guesswork.

**Body:** Every figure was measured against your live site and can be checked
again in front of you.

**Bottom line, larger:** The rebuild is 9 of 18 page types complete.

_Layout: centred, mostly empty. End the deck here._

---

## NOTES FOR WHOEVER BUILDS THIS

- If a slide feels crowded, **cut words, not white space.**
- Do not add a "thank you" slide, a team slide, or a pricing slide.
- Do not invent statistics to fill a layout. If a number is not in this file,
  it was not measured, and it does not go in the deck.
- Slides 3, 6, 8 and 10 carry the argument. If time is short, make those four
  perfect and keep the rest plain.
