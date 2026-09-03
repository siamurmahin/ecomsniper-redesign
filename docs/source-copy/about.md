# About — `/about`

**Re-captured in full on 4 Sep 2026.** The 3 Sep capture was incomplete and is
corrected below.

## What the first capture got wrong

The 3 Sep pass recorded two sections — "How this started" and "What you
actually get" — as **rendering a heading with no body**, and the page was built
without them on that basis.

That was wrong. Both have full copy. The page was read before it had finished
hydrating, which is the same failure as the three recorded in
`SESSION-NOTES-03-SEP.md` §6. Their site is slow to hydrate and a half-rendered
section is indistinguishable from an empty one.

Also missed on the first pass:

- The hero's three short lines and its statement
- The giving section's closing line and its **six-image gallery**
- The founder quote in the team section
- Seven photographs

Re-read after `readyState === 'complete'`, then scrolled the full page to force
lazy content, then waited again. 5,179 characters.

---

## The page, in order

### Hero

**Eyebrow:** ABOUT US
**H1:** We know what it took to earn this money.

Three short lines:

> The late shifts.
> The overtime.
> The tired mornings.

Then: _"When you pay for something, you are giving us hours of your life. We
think about that."_

Then the figure: **$200**

### The cost — "We know what this costs."

Three paragraphs. Already captured correctly on 3 Sep.

### How this started — **MISSED FIRST TIME**

> Years ago, we were doing all of this by hand. Finding products. Making
> listings. Checking prices every day. It took hours. The results were okay,
> but the work never stopped.
>
> So we built some tools to make it easier for ourselves. Then other people
> asked if they could use them too. That is how this became a company.
>
> We are not geniuses. We just got tired of doing the same thing over and over.
> And now we feel responsible for the people who pay us to make their work
> easier.

### The giving — "Where some of it goes."

Lead, then the three-part sentence, then "This is not marketing…", then a line
missed first time:

> Every subscription helps us do a little more for people who need it.

Then a **gallery of six images** with these captions:

| Caption                      | Image alt            |
| ---------------------------- | -------------------- |
| School supplies for children | Supporting education |
| Time spent at the orphanage  | Orphanage visit      |
| School supplies distribution | Community support    |
| Medical support program      | Medical assistance   |
| Orphanage visit              | Education program    |
| Moments that matter          | Children smiling     |

Closer: "We share this because you are part of it now. Not to impress."

### The boundaries — "Things we will not do."

Four numbered items. Captured correctly on 3 Sep.

### When things do not work out

Five paragraphs. Captured correctly on 3 Sep.

### What you actually get — **MISSED FIRST TIME**

Eyebrow on their page is **THE OFFER**.

> Tools that do the boring stuff. Listing products. Watching prices. Tracking
> stock. The things that eat up hours when you do them by hand.
>
> Support from people who have actually done this work. When you ask a
> question, you get a real answer. Not a script.
>
> A community of people figuring it out together. Some days are good. Some are
> frustrating. People share both.
>
> That is it. We save you time on the repetitive stuff so you can spend it on
> the parts that need a human brain.

### The team — "Who we are."

Two paragraphs as captured, **plus a founder quote missed first time**:

> "I remember spending full weekends on work that went nowhere. That feeling
> stuck with me. It is why I care about not wasting other people's time. Time
> is the one thing you cannot get back."
>
> — **Sammy**, FOUNDER

With a portrait, `sammy-two-f343ed3d.jpg`, 960 × 958.

### The invitation

Three paragraphs, **View pricing**, "30-day refund policy", then the closing
line. Captured correctly on 3 Sep.

---

## The photographs

Seven, all above 300px:

| Alt                          | Source                                            |
| ---------------------------- | ------------------------------------------------- |
| Supporting education         | their Firebase bucket, `charity/charity-1.webp`   |
| Orphanage visit              | their Firebase bucket, `charity/charity-221.webp` |
| Community support            | their Firebase bucket, `charity/charity-2.webp`   |
| Medical assistance           | their own `/assets/charity-medical-thumb-…webp`   |
| Education program            | their Firebase bucket, `charity/charity-454.webp` |
| Children smiling             | **Unsplash — `photo-1559027615-cd4628902d4a`**    |
| Sammy, Founder of EcomSniper | their own `/assets/sammy-two-…jpg`                |

### One of the charity photos is a stock image

"Children smiling" is served from Unsplash, inside a gallery whose other five
images are their own charity work and whose caption reads "Moments that
matter".

A stock photograph presented among real charity photographs is a credibility
risk on the one page whose entire argument is that the company is honest — and
it sits three screens below a promise not to create false impressions. It
should not be carried into the rebuild. Raise it with the client; the honest
fix is five real photographs rather than six with one bought in.

## Still to decide

The other six are the client's own assets and the rebuild needs copies of them
at a sensible weight. Either we pull them from their site and optimise, or the
client sends originals. Not resolved yet — see `docs/TODO.md`.
