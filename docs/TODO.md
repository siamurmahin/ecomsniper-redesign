# TODO

Three lists: **Done**, **Now**, **Future**. Plus what is waiting on somebody
else, and what was decided and should not be re-argued.

See `ISSUES.md` for what is _wrong_. This file is what is _planned_.

## How this file is kept

Every instruction lands here before it is built. When something is asked for,
it is written into **Now** or **Future** first — say which, and if it is not
said, it is asked. Nothing is built that is not on the list, and nothing is
finished without moving to **Done** with the commit that did it.

Dates are absolute. A task moves the moment it is true, not at the end of a
session.

---

## Now

- **"Who is behind this" moves onto About.** Asked 8 Sep. `FoundersSection` —
  the homepage's section 10, the two founder bios beside the playbook card —
  renders on About too, **after origin**: how this started, then who did it and
  the book one of them wrote, then what they give back. Placement chosen by the
  user from three. The section is imported, not copied: one component, two
  pages, so a change to either founder's copy moves both.

- **Two of the homepage's three proof sections move onto About**, after team
  and before the invitation. `InterviewsSection` (04b, members on video) and
  `TestimonialsSection` (04d, the written reviews). **`ReceiptsSection` is
  deliberately not among them** — its three cards are `$5,059.44 in 31 days`,
  `4,224 active listings` and `2 accounts at all-time highs`, and About says in
  the client's own words _"We will not show you screenshots of big earnings.
  Those create false hope."_ Putting the receipts on that page breaks its own
  promise four screens above the section that makes it. Asked 8 Sep, decided by
  the user after the collision was raised. The client is told it is a choice
  they can reverse.

- **The money filter comes back with the reviews.** The About hero enforced it
  until the hero became `PipelinePanel`: any review quoting a sum of money is
  dropped **on this page only**. Measured on the built page it removes two of
  eighteen: the reviewer who turns 99 USD into 500 USD, and the one reporting
  200,000 USD of revenue — the second is the big-earnings claim this page
  promises not to show, arriving as a review rather than a screenshot. It
  exists so a review added to the deck next month cannot quietly break the
  same promise. Blunt on purpose: a
  filter judging a fair mention of money from an unfair one is a decision
  re-made every time the deck changes.

- **The course page's sticky enrol bar is removed.** Asked 8 Sep. `StickyEnrol`
  — the floating pill carrying "Dropship Mastery / $97 first month / Enrol now"
  between the hero's buttons and the closing section's — goes entirely:
  component, its copy block in both languages, and the two refs on the page's
  own call-to-action rows that fed its `IntersectionObserver`. The page keeps
  the door at the top and the door at the foot.

- **The login and registration designs are built.** Asked 7 Sep, designed and
  built 8 Sep, and it **changes a Decided row** — "everything except login,
  registration and checkout" has been the scope line since the start. Login and
  registration are now in; checkout is still out, and the registration page
  says so where step two would begin.

  Their pages were captured out of the live DOM first —
  `docs/source-copy/auth.md` — because a plain fetch of an SPA that slow to
  hydrate returns the shell with nothing in it. What that capture found:
  `/login` is a bare Material card, and **`/register` is not a registration
  page at all, it is step one of a two-step checkout** with an order summary
  beside it.

  Four decisions, all taken before building:

  - **The register page covers step one only.** The subscription summary is
    beside it in their own figures; where payment begins the page says
    checkout is not built here.
  - **Their headline is not carried.** It is _"99% of People Who Use
    EcomSniper for 3 Months Make 1-3k/month"_ — the one claim `CLAUDE.md`
    bans by name. See Blocked.
  - **The password minimum is eight, not their six.** See Blocked.
  - **Every "Start your eBay business" CTA still points at their live
    signup.** Ours takes no payment and creates no account; pointing the
    site's primary door at it would break the funnel on every page to show a
    design. The switch happens when there is an endpoint.

  Neither form posts, stores or logs anything: `ssr: false`, there is nowhere
  for it to go, and both carry a visible line saying so before anybody types.
  Both pages are `noindex` in both languages — a sign-in form has nothing to
  rank, their own sitemap omits them, and a design that is not connected is the
  last thing that should appear in results as a way to log in.

  **Eager JS ceiling raised 590 → 596**, decided with the number in front of it
  rather than after: four routes at the ~1.3KB each every measurement since
  4 Sep has found. Measured after: 594KB, 2KB spare.

- **Dropship Mastery, five changes after looking at the page.** Asked 8 Sep,
  all five built.

  The hero panel was chosen from three built side by side at
  `/lab/course-hero`: **the syllabus won**, and the lab and both losing panels
  are deleted with the choice. What the old loop panel got wrong was not taste
  — `CourseFlow` was `bg-ink` and its own header said it was drawn for a pale
  hero, but `7e07b92` made that hero `surface-deep`, and its four nodes were
  the four steps the section directly below it expands.

  The other four: the step cards lost the tinted circle bleeding out of their
  top right; their example is a three-column ledger with the fees caveat
  attached to the gap rather than to the box; the offer's two columns are equal
  height with the button at the foot; the instructors have faces at 64px; and
  the objections took the homepage's `FaqAccordion` while keeping this page's
  own questions — the site-wide FAQ stays on /faq, which is the only page
  carrying the schema.

  The panel's copy is in both decks under `heroPanel`. Nothing in it is
  invented: the four module names are the client's own line, and there are no
  lesson counts, durations or hours of content, because none of that is known.

- **Microsoft Clarity, alongside GTM.** Decided 4 Sep, on the paste of their
  live privacy copy. Clarity is not gone: it comes back beside the GTM
  container rather than replacing it. Built the way GTM is — declared in
  `config/vendors.js`, loaded only from `src/third-party/`, consent-gated, and
  **inert until `VITE_CLARITY_ID` is set**, so it costs a visitor nothing until
  the client hands over an id. Behind **marketing**, not analytics: Clarity
  syncs with Microsoft Advertising and sets `MUID`, and their own policy says
  the data may be used for advertising. Same rule already written against GTM —
  the consent has to cover the worst thing a vendor might do.

- **Their Privacy Policy Disclosures section, restored verbatim.** Decided
  4 Sep. The Clarity and Microsoft Advertising paragraph, and the Microsoft
  Privacy Statement link, go back in as they wrote them. The **implied-consent
  sentence does not** — "By using our site, you consent to this data being
  collected" is not valid consent under GDPR and contradicts a banner that
  asks. That single change stands until someone says otherwise.

- **Clause 6.1 of the terms contradicts the rest of the site.** Their terms
  promise a flat 30-day refund from the date of purchase; the client told us it
  is monthly-plan only, and every marketing page here says so. It ships as they
  wrote it, because a contract is not ours to edit — but the terms are the
  document that governs, so the client has to decide which is true.
  **Before launch.** `ISSUES.md` 2b carries this and two smaller defects.

Nothing on the About page is in flight — see Parked below.

- **A founder portrait big enough to use.** Theirs is 260 × 260 and goes soft
  above about 300px, so the About page renders it at 56px beside the quote
  rather than as the portrait the section wants. The layout takes a larger file
  in the same slot the day one arrives.
- **The stock photograph is out of the build, and the client should still hear
  about it.** "Children smiling" was an Unsplash image sitting among five real
  charity photographs, three screens under a promise not to create false
  impressions. Removed 7 Sep — deck, asset map and file — so the gallery is
  five real photographs. Tell them anyway, in case they have a sixth real one:
  it is on their live site now, and this is the page that argues they are
  honest.
- **`giving-education.webp` is oversized.** 1100 × 688 for a slot that renders
  at 397 × 298, where the other four are 720 × 540. 94KB, lazy and below the
  fold, so it is a tidy-up rather than a defect — fold it into the image pass
  rather than re-encoding one file on its own.

Nothing in flight. The environment work is finished and verified; the items
below are what it left behind.

| #   | Task                     | Why it matters                                                                                                                                       |
| --- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | The last expensive frame | Worst frame in the first second is still ~83ms after everything in Done. Total blocking work halved; this one frame did not move. Not yet attributed |

---

## Parked

_Nothing is parked._ The About page was, from 4 to 7 September, and it came back
built rather than restarted — which is what the entry was for. The four hero
passes, the references that fixed them and the reviews-not-photographs decision
all survived the pause in `AboutHeroLab.jsx` and `SESSION-NOTES-04-SEP.md` §9,
and the lab was deleted the day the page shipped. Worth copying the next time
something has to be put down mid-design.

---

## Future

- **Generate `sitemap.xml` from the route list.** The prerender list reads role slugs from the content deck, so adding a role writes its page automatically — but the sitemap is still hand-kept, which makes it the one list that can now disagree with the others. It already carries two job URLs added by hand. Not urgent while there is one role; it becomes a real trap at five.

- **A real CSS reduction pass.** The ceiling was raised 130 → 135KB on 6 Sep to unblock the build-out, with the reason written into `check-budget.mjs`. That is a deferral, not a fix. Candidates not yet investigated: utilities Tailwind generates that no markup matches, the vendored `LogoLoop.css`, the four dead token declarations sitting inside `@layer components` with no selector, and whatever the safelist is holding open. **If the budget fires again, this is the answer rather than another raise.**

- **Win the 15KB back from the router runtime.** `errorBoundaries` is 107KB
  eager and `vendor-react` 187KB; neither has been examined. This is where the
  raised ceiling gets repaid.

In the order the work wants to happen, not the order it was asked.

| #   | Task                                                                                                                                                                     | Waiting on                                                                               |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| 1   | **Storyblok CMS** — content fetched at build time, webhook triggers a Netlify rebuild, schemas mirroring `src/content/` file for file, so the CMS adds no runtime weight | **Pricing confirmation.** Do not start before it                                         |
| 2   | **New pages** — four, plus five more blog posts, listed in the Pages section below                                                                                       | Slug decisions and copy, per that section                                                |
| 3   | **Wire GTM and Clarity for real** — both loaders, the consent gate and the generated cookie policy are built and inert                                                   | `VITE_GTM_ID`, `VITE_CLARITY_ID`                                                         |
| 4   | **Playbook form endpoint** — the playbook form still fakes success; contact does not, it hands off to a mail client instead                                              | Deferred by decision until the move to the client's server                               |
| 5   | **Dashboard screenshots** — still mocks in `FeatureTourSection`                                                                                                          | Real captures from the client                                                            |
| 6   | **Tawk.to** — built and inert, loads on click behind consent when it returns                                                                                             | `VITE_TAWK_ID`, and a decision that it is coming back                                    |
| 7   | **Orphan CSS in the build** — `@react-router/dev` moves a 115KB server-build stylesheet into `build/client` where nothing links it                                       | Nothing. Costs deploy size, not visitor bandwidth. A post-build prune if it ever matters |
| 8   | **Vite 7 → 8.** `@react-router/dev@8.3.1` supports it (`vite: ^7                                                                                                         |                                                                                          | ^8`), and the reason it was backed out in `064d77e`is gone — that was`@vitejs/plugin-react@6`pulling a`@babel/core` release candidate, and that plugin is no longer a dependency at all | Nothing technical. Held deliberately: a bundler major can move chunking and CSS splitting, which is what most of 3 Sep went on. Wants a quiet moment and a before/after measurement, not a half-built site |
| 10  | **Decide how Careers and Blog are edited** — static now by decision. Storyblok, markdown in the repo, or something else, once the whole site is up                       | The client, after the site is complete                                                   |
| 11  | Login / registration / checkout                                                                                                                                          | Out of this phase entirely — payments and auth are not in scope                          |

---

## Pages — the full set, from their live site

Taken from `sitemap.xml` (23 URLs), cross-checked against the live nav and
footer, and against the route table inside their JS bundle. The three disagree,
which is itself a finding — see the note under the table.

Auth and dashboard are excluded on purpose: `/login`, `/register`,
`/dashboard/*`, `/activation/*`. Their own `robots.txt` disallows those, and
payments and auth are out of this phase.

### Built

| Page                | Route                                                                |
| ------------------- | -------------------------------------------------------------------- |
| Home                | `/`                                                                  |
| Pricing             | `/pricing`                                                           |
| FAQ                 | `/faq`                                                               |
| Free playbook       | `/free-play-book`                                                    |
| Privacy policy      | `/privacy-policy`                                                    |
| Cookie policy       | `/cookie-policy` — ours, no equivalent on their site                 |
| Careers             | `/careers` — static list; role description awaited from client       |
| Affiliate           | `/affiliate` — their full terms, 11 clauses, both languages          |
| Terms               | `/terms-and-conditions` — their 15 sections, verbatim                |
| Contact             | `/contact` — their copy; the form never fakes a delivery             |
| Product Hunter      | `/product-hunter` — `/productHunterV6` 301s onto it                  |
| AI Lister           | `/ai-powered-lister` — `/aiListerV6` 301s onto it                    |
| Blog                | `/blog`, and four posts at `/blog/<slug>`                            |
| Competitor Research | `/competitor-research` — `/competitorResearchV6` 301s onto it        |
| Price Monitor       | `/price-monitor` — `/priceMonitorV6` 301s onto it; the slug is ours  |
| About               | `/about` — the review-wall hero, and the offer moved up from seventh |
| Dropship Mastery    | `/course/dropship-mastery` — all four of their spellings 301 onto it |

All of the above exist in both languages — **twenty-three URLs per language, 46
in all**, which is exactly what `sitemap.xml` lists and what
`react-router.config.js` prerenders (48 documents: the 46 plus a 404 per
language, which is kept out of the sitemap). Those three numbers agreeing is
the check; when they last disagreed the sitemap was four pages behind without
anyone noticing. Twenty-three rather than the sixteen pages above because the
advert, the affiliate terms and the four posts each own a URL.

**About was withdrawn in `c2c95b8` and is back**, built 7 Sep from the material
that was kept rather than from scratch — which is what the Parked entry existed
to make possible.

### To build — five blog posts, and nothing else

| #   | Page                     | Route          | Notes                                                                                                                                                                                |
| --- | ------------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Blog posts, five of them | `/blog/<slug>` | Template and index are built; four of the nine in their sitemap are written. They cost **no** route table: `/blog/:slug` is one route and the prerender list turns it into documents |

**Every page in the plan is now built.** All four feature pages, and section 07 of the homepage no longer
links off this site: both remaining pills became relative hrefs the day their
pages landed, with no change to the component, exactly as
`SESSION-NOTES-05-SEP.md` said they would.

### Decided 4 Sep

- **Feature-page slugs: the readable ones win.** `/product-hunter`,
  `/ai-powered-lister`, `/competitor-research`. The `V6` spellings become
  **301s onto them**, not deletions, so anything already linking or indexed
  against `/productHunterV6` keeps working. Same rule as `/free-playbook`,
  which is a 301 in `netlify.toml` and `public/_redirects` for the same
  reason. Each redirect ships with its page, never before it — a 301 onto a
  route that does not exist yet is a 301 onto a 404.
- **Price Monitor takes `/price-monitor`.** Their site has only
  `/priceMonitorV6` — no readable slug exists to inherit — so one is chosen to
  match the other three rather than leaving one page speaking camelCase. The
  `V6` spelling redirects onto it like the rest.
- **Where two versions of the copy exist, the newer one is the source.** Both
  spellings are live on their site with different words; `V6` reads as the
  later rewrite. Checked page by page rather than assumed, and recorded in the
  relevant `source-copy` file.

### Decided 3 Sep

- **Refund is monthly-plan only.** Not on the credits bundle, not on
  Enterprise. Their About page says "30-day refund policy" unqualified; the
  rebuild qualifies it, as the rest of the deck already does. Done — About
  states it in both languages.
- **$199 is the monthly charge from month two.** $97 is the first month. No
  mismatch — their About page framing "$200" is the monthly price.
- **Telegram is real** — `https://t.me/ecomsniper`, from the client. Their own
  footer link still points at `/pricing`. Now in ours.
- **Careers and Blog ship static first.** No CMS for either. Whether they move
  to Storyblok or something else is a conversation with the client once the
  site is complete — in Future below.

- **Careers stays**, and **all four feature pages stay.** They can come out
  later if they turn out not to earn their place.
- **Slug choice is deferred** — readable vs `V6` — and sits in Future below.
  It has to be settled before those four are built, because the loser needs a
  301 rather than a deletion.

### Source copy — captured 3 Sep

All twelve pages read from their live site and written to `source-copy/`,
each after `readyState === 'complete'`. Nothing left to extract.

Two of them cannot be rebuilt as-is. **Terms was listed here as a third and
should not have been** — the capture was taken before their page had hydrated,
and the page has fifteen full sections. Built in `42e0361`; the finding is
withdrawn as `ISSUES.md` 2.

- **Dropship Mastery** was the most claim-heavy page on their site: a
  "Six-Figure" income claim in an H2, a personal "$1,000,000 on eBay" figure,
  "over 2 billion transactions daily" for eBay stated as fact, and a
  "Limited Time Bonus" of three $97 items struck to $0 — which their own About
  page promises they do not do. **Built 7 Sep** with all four held out and each
  one flagged in Blocked; the funnel, the offer and the instructors are theirs.
- **Price Monitor** had two bullets that repeat its own headline with one word
  swapped. It read as placeholder, and it was. **Built 7 Sep** with those two
  bodies written here and flagged in Blocked as our draft.

Their **sitemap is stale for the blog**: nine posts listed, none of them in the
live index, which now carries twelve 2026-dated guides. The post list has to
come from the index, and their sitemap is advertising URLs that may 404.

### Still needs a decision

- **Which feature-page slugs are canonical.** Four feature pages exist twice,
  under a readable slug and a `V6` one, with different copy. The nav links to
  `V6`; the sitemap lists the readable slugs and omits Price Monitor entirely.
  Picking wrong means either building the stale copy or breaking the URLs
  Google already has. The client decides, and the losing slug should 301.
  **All four are built on the 4 Sep precedent** — readable slug canonical,
  `V6` 301ing onto it — so a decision the other way is a redirect edit and a
  canonical, not a rebuild. Price Monitor had no readable slug of theirs to
  keep, so `/price-monitor` is ours; that one is a naming decision rather than
  a choice between two of their URLs, and it is the one the client is most
  likely to have an opinion about.
- **Whether the blog is nine static posts or a CMS collection.** Nine today,
  and a blog only grows. If posts are going into Storyblok this waits for it
  rather than being built twice.
- **Copy for About, Contact and Careers.** These make factual claims about the
  business, and their live pages are the source.
- **Confirmation that the terms are current.** Now transcribed verbatim from
  their page, dated 18 March 2025 — but a transcription is not a confirmation,
  and clause 6.1 already disagrees with what the client told us about refunds.
  See Now, and `ISSUES.md` 2b.

---

## Blocked — needs the client

| Item                                              | Detail                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Storyblok pricing                                 | Free tier is one user; paid starts ~$99/mo. Flagged 3 Sep, still unconfirmed. **No CMS work should begin until this is answered** — schemas get built against whatever plan they buy                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| GTM container ID                                  | Needed to fill `VITE_GTM_ID`. Until then GTM is wired but never loads                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Legal text needs sign-off                         | The privacy copy is the client's own with two changes: the implied-consent sentence removed, and Microsoft Clarity replaced by what actually loads. The cookie policy, the terms' German translation and the whole German deck are new. **No lawyer has read any of it.** See the headers of `src/content/en/legal.js` and `en/terms.js`                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Microsoft Clarity project id                      | **Answered 4 Sep: Clarity stays, alongside GTM.** Declared in vendors.js, consent-gated behind marketing, inert until VITE_CLARITY_ID is set. Until it is, the privacy policy names a vendor the build does not load — ISSUES.md 11                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Privacy policy contradicts the banner             | The live copy says _"By using our site, you consent to this data being collected"_ — implied consent, not valid under GDPR, and it contradicts asking permission                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Blog post bodies                                  | **The four post bodies are our draft, not the client's.** Their slugs, titles, categories and dates are real, read off the live index; the prose is written by us on the same instruction as the job advert. Their real posts run to ~25,000 characters each and should be imported rather than retyped. The founder's letter carries only its captured opening and says so. **Replace before launch**                                                                                                                                                                                                                                                                                                                                                                   |
| Job advert copy                                   | **The Video Editor description on `/careers/video-editor` is our draft, not the client's.** Written 6 Sep on the instruction to build now and replace later. Every fact around it — title, department, location, type, pay — is real; the summary, the about, the responsibilities and both requirement lists are not. `content/en/careers.js` says so in its header. **Replace or sign off before launch** — an unread draft is exactly how "This is a one liner description" reached their production site                                                                                                                                                                                                                                                             |
| CV upload on job applications                     | The application form asks for a portfolio link rather than a file. A `mailto:` cannot carry an attachment, and no endpoint exists to receive one — the hand-off tells the applicant to attach a CV to the email instead. Add the field when `VITE_JOBS_ENDPOINT` exists and can take multipart                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| The registration page's headline                  | Their `/register` opens on **"99% of People Who Use EcomSniper for 3 Months Make 1-3k/month"** — the one claim this repository has banned by name since the start, and it sits on the page where somebody is about to pay. It is not carried. What replaces it is what it costs today and how to leave, both already published here. **Theirs to reinstate — but it is the same claim About rules out, on the worst page to make it**                                                                                                                                                                                                                                                                                                                                    |
| "Must be 6 characters"                            | The password helper on their registration page. Six is below every current guideline, and a form that asks for six is telling people six is enough. The rebuild asks for eight with no forced composition rules. **Their server still accepts what it accepts — that is a change only they can make, and it is worth making**                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Four claims on the course page                    | The most claim-heavy page they have, and three of the four collide with a promise the **About page** makes in the client's own words. **"Six-Figure eBay Dropshipping Business"** in an H2 and **"Already Helped People Create A Second Income Stream"** in the H1 subheading, against _"we will not show you screenshots of big earnings. Those create false hope."_ **"I have done over $1,000,000 on eBay"** in Marc's bio — the same promise, and unverifiable. **"Limited Time Bonus"** over three $97 items struck to $0, against _"we will not rush you with countdown timers or limited spots."_ The bonuses and their values ship; the urgency does not. **All four are theirs to reinstate or drop — but not silently, and not while About says the opposite** |
| eBay does not have "2 billion transactions daily" | Stated as fact on their course page. eBay's own reported figures are nowhere near it — the annual GMV implies a tiny fraction — and it reads as a garbled version of its live listing count. It is an assertion about a third party, so it is not carried: the section argues the same point from figures that are true. **Ask what they meant**; if it was live listings, that number is worth having and is checkable                                                                                                                                                                                                                                                                                                                                                  |
| Price Monitor's two cases are our draft           | Their page lists two things that change and both entries repeat the headline with a single word swapped — _"Never have an issue keeping track of your inventory for price changes"_ under **Prices change**, and the same again with _"stockouts"_. That is placeholder that was never rewritten, so the bodies are ours, written to say what each case does. Every claim in them is one their own page or the homepage already makes. **Replace or sign off before launch**, as with the job advert and the blog bodies                                                                                                                                                                                                                                                 |
| Competitor Research says "snipe them"             | The page is built on undercutting **named** competitors — spot Amazon-to-eBay dropshippers, save them, post under their listing. That is their product and their positioning, and it ships as they wrote it. But it is the one page whose copy makes a claim about how the tool treats other sellers, and the rebuild has been careful about claims everywhere else. **Raise it; do not soften it unasked.** The price ladder's floor line — what the item costs from Amazon — is the one thing added, so the panel does not read as a race to zero                                                                                                                                                                                                                      |
| Footer links                                      | Those still pointing at `https://ecomsniper.io/*` are soft-404s on their site: `/about`, `/blog`, `/contact`. Careers, affiliate and terms now point at our own routes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

---

## Decided — do not re-argue

- **The blog index has search, category tabs and cover images.** Decided 6 Sep,
  on their live blog rather than on the captured notes. The first build left
  all three out, arguing that a control over four posts is furniture — the same
  reasoning that keeps a filter off the careers page. That was right about four
  posts and wrong about the blog: theirs runs twelve across six categories, and
  the **covers are doing most of the work**, which no amount of typography
  replaces. Filters that cost nothing until the deck grows are cheaper than
  retro-fitting them at forty posts.

  What did not come across: their Search **button**. Both filter live, so a
  button submitting a filter the page could apply on the keystroke is a step
  the reader has to find.

- **Phase: build out, tune later.** Deep performance work waits until the site
  is complete. Until then nothing may cost speed without a decision taken in
  advance — see the speed gate in `CLAUDE.md`.

- **Stack stays React**, extended into the full production site: everything except login, registration and checkout. **Superseded in part, 7 Sep** — the login and registration _designs_ were asked for; see Now. Checkout is still out, and nothing here is wired to an authentication backend.
- **SEO is fixed by prerendering, not meta tags.** Done.
- **CMS is Storyblok**, build-time fetch, webhook rebuild.
- **Consent is accept / reject / customise.** Categories: essential (locked), analytics, marketing. Consent Mode v2 denied by default.
- **GTM only.** One container carries GA4, Meta and TikTok. Clarity is not in the code.
- **Tawk.to loads on click**, never on page load, and behind consent.
- **Config is centralised**: `src/config/` for ids and toggles, `src/third-party/` for every external script, nothing external imported from anywhere else.
- **Base before new pages** — the developer's own instruction.

---

## Done

| Date       | What                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Commit                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| 7 Sep 2026 | **About rebuilt on the new surfaces, section by section.** Hero takes the homepage's shape — copy left, `PipelinePanel` right, so the page shows what the company does rather than describing it, and the two pages cannot drift because both read `HERO_PANEL`. The three hours lines are typed with the homepage's `TextType`. Cost, origin, offer and giving all redesigned; the offer and giving share one card anatomy with the course page's steps, and `cost.hours` — in the deck unused since 4 Sep — is finally what the section is built on                                                                        | `671ac15`, `5cedded`, `7ccf577`, `c105a60` |
| 7 Sep 2026 | **The offer section was invisible on arrival, and had been since it was written.** Its heading and cards carry `data-reveal`, which CSS holds at `opacity: 0` while JavaScript runs; the only thing that restores them is a `useRevealOnScroll` scope on an ancestor, and that section had the attributes and no `ref`. Content in the DOM, laid out, permanently transparent. Reduced motion hid the bug by forcing every reveal visible, so whether you saw it depended on the browser rather than on a reload                                                                                                             | `3360a09`                                  |
| 7 Sep 2026 | **The Features dropdown could not be reached with a pointer.** It hangs 8px under its button and the hover listener is only as tall as the button, so moving towards the menu fired `mouseleave` and closed it. The panel now grows a transparent strip up across the gap; as a descendant of the group, hovering it still counts                                                                                                                                                                                                                                                                                            | `3360a09`                                  |
| 7 Sep 2026 | **Three header faults from the dark heroes.** The ink wordmark lost half its lettering on near-black — the header takes the paper artwork while the bar is transparent and the ink one once it condenses. Both popovers in that bar turned white on their own white panels. And the eyebrow dash, drawn as a `::before` at `bg-ink/25`, was black on black on every deep band                                                                                                                                                                                                                                                | `45e2482`, `0c539f2`, `c105a60`            |
| 7 Sep 2026 | **Dropship Mastery, and every planned page is built.** `/course/dropship-mastery` in both languages, with all four of their spellings 301ing onto it. The one sales page on the site, built as a funnel — promise, mechanic, market, offer, instructors, proof, last door, questions, guarantee, six doors to `/pricing`. Four of their claims are held out and flagged; see Blocked. Eager JS +2,826 for two routes, ceiling 586 → 590, **the last raise the build-out needs**                                                                                                                                              | `a585667`                                  |
| 7 Sep 2026 | **The nav maps the site instead of the homepage.** Four of its seven entries were hash links into homepage sections; now a **Features** dropdown carries the four tools and the rest are real routes — Pricing, Blog, About, FAQ, Contact. The dropdown reuses the mobile panel's Escape, outside-`pointerdown` and close-on-route-change rather than adding its own, so it costs one piece of state and the markup. Links became `Link` rather than `<a>`, which stops a nav click reloading the whole app between two prerendered pages. **+1,548 bytes eager**, measured both sides                                       | `128439e`                                  |
| 7 Sep 2026 | **An unlayered `!important` is the weakest important there is.** The no-JS rule revealing the dropdown lost twice to Tailwind preflight's `[hidden]{display:none!important}` — plain, then with a two-attribute selector to outrank it. For normal declarations unlayered beats layered; for important declarations that order **reverses**. Joining `@layer base` put ordinary specificity back in charge                                                                                                                                                                                                                   | `128439e`                                  |
| 7 Sep 2026 | **About, off the shelf after three days parked.** The hero is the review wall — hero-03's layered column built from real Trustpilot reviews rather than its revenue dashboards, on the page that promises not to show earnings screenshots. The money filter came with it and is enforced, not remembered. The offer moves from seventh to third: what it costs you, what you get, how we behave. The giving gallery is five real photographs, not six with an Unsplash one among them. `AboutHeroLab.jsx` deleted. Eager 580 → 583KB; CSS went **down** 133 → 130KB, because the lab took its own utilities with it         | `7137a9c`                                  |
| 7 Sep 2026 | **No link in the site furniture points at `ecomsniper.io` any more.** The footer's About link was the last one, and it was a soft-404 on their own site                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `7137a9c`                                  |
| 7 Sep 2026 | **Price Monitor, and the four feature pages are done.** `/price-monitor` in both languages, `/priceMonitorV6` 301ing onto it. The one page with no second version: no readable slug on their site and no sitemap entry, so there was nothing to choose between and the slug is ours. Two sections rather than numbered steps, because the product is that you do nothing — a numbered list would have been the previous page's shape borrowed. The two case bodies are our draft: theirs repeat the headline with one word swapped. Eager JS +2,446 bytes, page 14KB in its own chunk                                        | `e0b987e`                                  |
| 7 Sep 2026 | **The footer's Blog link stopped pointing at their site.** `/blog` shipped 6 Sep and the footer was not moved with it, so a link in the site furniture was still a soft-404 on `ecomsniper.io`. About is the only external one left, and only until that page exists                                                                                                                                                                                                                                                                                                                                                         | `e0b987e`                                  |
| 6 Sep 2026 | **Competitor Research, the third feature page.** `/competitor-research` in both languages, `/competitorResearchV6` 301ing onto it. Their copy exists twice and this is the first page where V6 was the _worse_ of the two: it has the better headline and loses the four concrete steps, so the hero is V6's and the steps are the readable slug's, verbatim. Five drawn panels built on `HuntPanels` — same chrome, same scan, no second set of CSS. Eager JS +2,531 bytes, all route table; the page itself is 17KB in its own chunk. Ceiling 578 → 586, once, for the six routes the three remaining pages need           | `1d7725e`                                  |
| 6 Sep 2026 | **A post without cover art gets a drawn one.** Not every post has a cover and not every post will — the founder's letter has none on their own site. A card with a gap where the others have an image reads as a page that failed to load rather than as a post without a picture. The fallback is the brand ground, a CSS dot field and the reticle that already exists: no request, no bytes beyond markup, so a hundred coverless posts cost what one does. Eager ceiling 575 → 578, and the raise is the manifest naming a shared `ReticleMark` chunk the first screen never fetches — 104 bytes, measured on both sides | `cbacfd8`                                  |
| 6 Sep 2026 | **Search, category tabs and cover art on the blog index.** Built after looking at their live blog rather than the captured notes: theirs runs twelve posts across six categories and the covers do most of the work. Both controls filter on the keystroke, so their Search button is not reproduced. Covers are the client's own, re-encoded and cropped to the 16:9 the cards render at rather than left square and cropped with `object-fit`, which still downloads the rows it throws away — the margins cover is a 1.8MB PNG on their site and 55KB here. Three covers, 144KB, all page-local                           | `1342b36`                                  |
| 6 Sep 2026 | **Blog index and post template.** `/blog` and `/blog/<slug>` in both languages, slugs read from the deck like the job adverts. Bodies are typed blocks rather than HTML, so a CMS maps onto them without sanitising anything. Neither of their blog defects is reproduced: their index and sitemap share no posts at all, and their post pages carry two `<h1>`s                                                                                                                                                                                                                                                             | `f51d9d3`                                  |
| 6 Sep 2026 | **The blog owns its own meta.** Adding the index to `content/en/seo.js` cost every visitor on every route, because that deck is eager — it took eager JS 1KB over. `metaForContent` reads it from the page deck instead, which travels in the blog's own chunk. 576KB → 575KB without touching a ceiling                                                                                                                                                                                                                                                                                                                     | `f51d9d3`                                  |
| 6 Sep 2026 | **Open roles redesigned, and every role has its own page.** The section groups by department — only departments with something open — and each role is a full-width row that is itself the link. `/careers/<slug>` in both languages carries the advert and an application form. `react-router.config.js` reads the slugs from the deck, so adding a role prerenders its page with no second list to keep in step                                                                                                                                                                                                            | `ed43011`                                  |
| 6 Sep 2026 | **`HeroSurface` and `MarkedHeadline`, extracted.** The dot field over the colour floor was written out by hand in three pages and the marked-run helper in three more. Both are one component now, and every page built from here gets the treatment by importing it rather than remembering it                                                                                                                                                                                                                                                                                                                              | `ed43011`                                  |
| 6 Sep 2026 | **287 duplicated lines out of `index.css`.** Lines 161-439 reappeared at 591-869 — two `@layer base` blocks, two `@utility btn`, two openings of `@layer components`. The later copy won, so editing the first silently did nothing. Only the prefix was duplicated; both regions had unique tails and both were kept. Zero shipped bytes saved — the bundler already deduped — so the win is the removed trap, not weight. Computed styles identical on 14 pages                                                                                                                                                            | `6cecf01`                                  |
| 6 Sep 2026 | **The affiliate application panel had square corners.** `.panel-brand-outline` set a gradient border and no radius, so it rendered square unless the caller added one — contact did, affiliate did not. Radius moved onto the class so it cannot be forgotten                                                                                                                                                                                                                                                                                                                                                                | `2ba87f7`                                  |
| 6 Sep 2026 | **The site was a permanent spinner without JavaScript.** `#preloader` is fixed at `z-index: 9999` and removed only by script — the app, or a 6s backstop that is also a script — so with scripts off every page was a spinner over the finished prerendered page. A `<noscript>` block hides it and un-stacks the hero panel, whose five steps were otherwise four-fifths unreachable. `aria-hidden`/`inert` moved behind an effect so seen and announced agree. 571KB eager, 4KB spare                                                                                                                                      | `6c36468`                                  |
| 6 Sep 2026 | **The hero panel keeps its layout under reduced motion.** The still version rendered all five steps stacked — four times the panel height, off the bottom of the first screen, and reported as a broken layout. Now the same 396px panel with autoplay off; the rail was already real buttons, so every step stays reachable by click and by keyboard. Eager JS 571KB → 570KB                                                                                                                                                                                                                                                | `5240bac`                                  |
| 6 Sep 2026 | **`?motion=on`, so this site's motion can be reviewed on a machine that has animation turned off.** Sets `motion-force` on `<html>` and remembers it; the stylesheet's reduced-motion block, `prefersReducedMotion()` and `useReducedMotion()` all read the class first. Takes a deliberate query parameter, so no visitor's stated preference is ever overridden. 1KB eager                                                                                                                                                                                                                                                 | `4577256`                                  |
| 6 Sep 2026 | **Reading the OS motion preference during render threw the prerender away.** Seven components did it, so a reduced-motion reader mismatched and React regenerated the whole tree — taking `js-motion` off `<html>` with it. Now `useSyncExternalStore` with a server snapshot of `false`. Present since `619709a`; verified across 28 pages in both motion modes                                                                                                                                                                                                                                                             | `688c0da`                                  |
| 6 Sep 2026 | **The favicon, apple-touch-icon and manifest are linked again.** All three had sat in `public/` unreferenced since the document moved out of `index.html`, so every tab showed the browser default and every load spent a request on `/favicon.ico` to be told it does not exist                                                                                                                                                                                                                                                                                                                                             | `f46d673`                                  |
| 6 Sep 2026 | **The affiliate offer and the contract become two pages.** `/affiliate` is new — what it pays, the three steps, the four conditions worth knowing before applying, and the application. `/affiliate/terms` is their document unchanged, and `/affiliate/join` redirects to it. Page-owned copy in both languages                                                                                                                                                                                                                                                                                                             | `a1dd8cb`                                  |
| 4 Sep 2026 | **Photographs in the AI Lister gallery and Amazon panels.** Six grey squares replaced with stock garden photographs, since that panel is the one whose claim is what the software found. Measured at 177px, served at 360px; 219KB at quality 80 argued down to 88KB by swapping two noisy subjects and dropping to quality 50. Lazy, below the fold, eager JS unchanged                                                                                                                                                                                                                                                     | `45eda2c`                                  |
| 3 Sep 2026 | **Prerendered routes.** Ten routes as real HTML, per-route title/description/canonical/hreflang, `lang` correct in both languages, real 404s. Deploy, Lighthouse, budget and lint pointed at the router's output; Node pinned to 22.22.0                                                                                                                                                                                                                                                                                                                                                                                     | `63f9be1`                                  |
| 3 Sep 2026 | **Consent environment.** `src/config/`, `src/third-party/`, `src/consent/`; Consent Mode v2 denied before anything can load; banner in both languages; `/privacy-policy` and `/cookie-policy` prerendered; `lib/trackingGate.js` deleted, Tawk moved to click-to-load                                                                                                                                                                                                                                                                                                                                                        | `098c559`                                  |
| 3 Sep 2026 | **Accessibility.** Six real markup defects — a `<dl>` of `<div>`s, `aria-label` on a bare `<span>`, `<h4>` under `<h2>`, focusable content inside `aria-hidden`, two accessible names not containing their visible text. Score 82 → 100                                                                                                                                                                                                                                                                                                                                                                                      | `88c081d`                                  |
| 4 Sep 2026 | **Client deck spec.** `docs/CLIENT-DECK.md` — 20 slides, white ground and black text, one red accent, written as build instructions for Canva. Every figure measured; the file says so and forbids inventing any                                                                                                                                                                                                                                                                                                                                                                                                             | `44b47bc`                                  |
| 4 Sep 2026 | **Affiliate terms, in both languages.** Their full 11-clause document; not a signup page, theirs has no form either. Footer gained the Affiliate row it was missing                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `299ccac`                                  |
| 4 Sep 2026 | **Contact, in both languages.** Their copy, capture re-verified first. The form posts to `VITE_CONTACT_ENDPOINT` when set and otherwise hands the message to the visitor's mail client rather than faking success — theirs has no form action at all. Honeypot, real labels, one live region                                                                                                                                                                                                                                                                                                                                 | `483a5ba`                                  |
| 4 Sep 2026 | **Terms and conditions, in both languages.** Never blocked — their page has 15 sections; the "empty page" note was a read before hydration, now withdrawn as `ISSUES.md` 2. Capture verified both ways before building: 37 of 37 clauses, 44 of 45 strings verbatim. Three defects reproduced, not fixed, and raised as 2b                                                                                                                                                                                                                                                                                                   | `42e0361`                                  |
| 4 Sep 2026 | **Terms copy kept out of the eager deck.** In `content/*/legal.js` it cost 20KB eager on every route and fired the budget at 578KB. Moved to page-owned `content/en\|de/terms.js` behind `usePageContent`; 559KB with 16KB spare, +2KB all manifest                                                                                                                                                                                                                                                                                                                                                                          | `42e0361`                                  |
| 4 Sep 2026 | **Sitemap listed 8 URLs against 16 prerendered pages.** Careers, affiliate, privacy and cookies had all shipped without being added. Now 18, matching `react-router.config.js`                                                                                                                                                                                                                                                                                                                                                                                                                                               | `42e0361`                                  |
| 4 Sep 2026 | **Eager ceiling 560KB → 575KB.** Route-manifest growth, ~1KB per route, eager because hydration needs the route table. Agreed before building further; the 15KB comes back out of the router runtime later                                                                                                                                                                                                                                                                                                                                                                                                                   | `11a69f1`                                  |
| 3 Sep 2026 | **Careers, in both languages.** Static list, no filters over a single role. The listing description is left blank rather than invented — theirs is placeholder text in production                                                                                                                                                                                                                                                                                                                                                                                                                                            | `816ece3`                                  |
| 3 Sep 2026 | **Audit of their live site.** 16 URLs, both languages, sitemap, tracking, markup and social measured directly; evidence in `docs/AUDIT-THEIR-SITE.md`, client fact sheet published separately. Corrected one earlier wrong claim about their sitemap                                                                                                                                                                                                                                                                                                                                                                         | `816ece3`                                  |
| 3 Sep 2026 | **About, in both languages.** Their copy kept close to verbatim; the refund qualified to the monthly plan, and their two empty sections left out rather than invented. Nav and footer now point at the local route instead of their live site                                                                                                                                                                                                                                                                                                                                                                                | `edfc2a5`                                  |
| 3 Sep 2026 | **Page copy stopped being eager.** Adding About to the global deck put its words in the chunk every route downloads — 7KB paid on the homepage by someone who never opens About, and ~80KB once the remaining twelve pages landed. Page decks now load with their route via `usePageContent`; eager JS 562KB (over) → 555KB                                                                                                                                                                                                                                                                                                  | `c6c8271`                                  |
| 3 Sep 2026 | **Reverted a bad fix of mine.** See the note below                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `7aa1cf0`                                  |
| 3 Sep 2026 | **The page stopped painting itself and then hiding.** `js-motion` moved to an inline head script; it had been arriving after the bundle, so the prerendered page painted in full and every reveal then snapped to invisible                                                                                                                                                                                                                                                                                                                                                                                                  | `b9ba189`                                  |
| 3 Sep 2026 | **Colour washes stop re-blurring through every fade.** Promoted to their own layer; the 52ms long task on the two sections nearest the top disappeared                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `4436e81`                                  |
| 3 Sep 2026 | **Metric-matched font fallbacks.** Measured rather than copied: Arial rendered a body paragraph 24px shorter than Montserrat; now 0px                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `1cd66b2`                                  |
| 3 Sep 2026 | **The marquee's CSS ships with the page that renders it.** It sat in a lazy chunk while its markup was prerendered, so the loop rendered unstyled at 417px then snapped to 51px — a 366px reflow                                                                                                                                                                                                                                                                                                                                                                                                                             | `8513d61`                                  |
| 3 Sep 2026 | **Four heaviest below-fold sections skip first layout.** Style and layout 520ms → 169ms, long frames 1208ms → 591ms, document settling 684px → 248px, deep links still exact                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `a504959`                                  |
| 3 Sep 2026 | **Removed the reveal probe.** Diagnostic code added to measure late reveals on a real device; the question was answered, so it is gone — file, the `useEffect` in `root.jsx`, and the now-unused import                                                                                                                                                                                                                                                                                                                                                                                                                      | `7917e4b`                                  |

### The mistake, kept on purpose

`b171f93` was diagnosed on the **dev server** and never checked against a
production build. In dev, Vite serves modules unbundled, so a lazy chunk is
still in flight during hydration and the footer genuinely does not hydrate. In
production it always did — measured afterwards at 129 of 129 elements, on both
earlier commits. The "fix" then caused the fault it was meant to prevent: the
page began discarding its own prerendered markup, 3,488 nodes down to 806.

Cost, all production: long tasks scrolling from load 281ms against 51ms; worst
frame 122ms against 64ms; accessibility 82 against 100.

**Measure the production build.** Dev-only hydration behaviour is not a bug,
and a Lighthouse run against a page still settling is not a measurement.

### Also worth knowing

**82% of the prerendered HTML — 425KB of 518KB — is delivered inside
`<div hidden id="S:0">`** and moved into place by inline script, because
`HomeBelowFold` is `lazy()` inside `<Suspense>`. `<main>` as served holds 2
sections; the document has 15. It costs no layout time, and Google runs
JavaScript so indexing is unaffected — but "prerendered" is less literal than
it sounds, and a naive scraper reads that content out of a hidden container.
