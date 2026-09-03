# Working on this project

Read this before building anything. It is the flow the rest of the site gets
built in.

## Before writing code, answer four questions

1. **Is it futureproof?** Will it survive the next framework upgrade, the CMS
   arriving, a second language, someone else editing it in six months? Prefer
   the boring standard mechanism over the clever one.
2. **Speed.** What does it cost the visitor — bytes on the critical path,
   layout, main-thread time? Measure, do not assume.
3. **Less code, same result.** The smallest change that solves the whole
   problem. No new file, dependency, abstraction or config knob that is not
   earning its place. Deleting is a valid fix.
4. **Security.** No secret in the client bundle, no unsanitised HTML, no
   third-party script before consent, no permission widened by default.
   Anything from a CMS, a URL or an API is untrusted.

When two conflict, say which and pick. Do not silently take the easy one.

## The speed gate

The phase is **building the site out**, not tuning it. Deep performance work is
deliberately deferred until the site is complete. Until then, every piece of
work has to hold the speed already won.

**If something you are about to build would cost speed, say so and get a
decision first — not afterwards, not in the commit message.** Name the cost,
name the cheaper alternative, let the choice be made with the number in front
of it.

What trips the gate:

- A new dependency, or anything that grows the first-screen bundle —
  `npm run budget` currently has ~8KB of headroom on eager JS
- A third-party script, embed, font or icon set
- An unoptimised image or video, or one without dimensions
- Anything running on scroll, resize, or every frame
- Anything that lengthens the document, adds nodes to the first screen, or
  forces layout during load
- A blocking request in the critical path — a fetch before first paint, a
  render-blocking stylesheet, a synchronous script
- Making an existing lazy thing eager

Not every cost is a refusal; some are worth paying. The rule is that it is
decided in advance rather than discovered later.

## Where work is recorded

- `docs/TODO.md` — what is **planned**: Done / Now / Future, plus Blocked and
  Decided. Every instruction lands on a list _before_ it is built. If it is
  not said whether something is for now or later, ask.
- `docs/ISSUES.md` — what is **wrong**. An issue goes in when found, whether or not
  anyone intends to fix it.

Move items to Done the moment they are true, with the commit hash.

## Measuring — read this before quoting any number

**Measure the production build, never the dev server.** Vite serves modules
unbundled in dev, so a lazy chunk is still in flight during hydration and
behaves nothing like the built site. A whole day was lost to a "hydration bug"
that only ever existed on localhost, and the fix for it caused a real
regression. Build, `vite preview --outDir build/client`, then measure.

Other traps this codebase has already fallen into:

- **`chrome-devtools-mcp` throttles requestAnimationFrame** to a couple of
  frames a second. Fine for geometry and DOM state, useless for frame timing.
  Use the untuned browser for anything time-based.
- **Lighthouse will happily measure a page that is still settling.** A score
  of 100 once meant "most of the page had not rendered yet", not "good".
- **A page is not readable until `readyState === 'complete'`.** Assert it
  before reading anything out of a browser, and never conclude "broken" from a
  timeout. Their site is slow to hydrate, and a half-loaded SPA is
  indistinguishable from a dead one: no text, generic title, wedged renderer.
  Two findings were filed wrong this way.
- **`git archive` on Windows applies `core.autocrlf`.** It is not a faithful
  export of what CI checks out. Use `git ls-files --eol` to see the truth.
- Verify a claim against the thing itself before reporting it. Two wrong
  diagnoses in one day both came from trusting a proxy measurement.

## Architecture, and the rules that hold it together

**Prerendering.** Routes in `react-router.config.js` are rendered to HTML at
build time. `ssr: false` — there is no server. Netlify publishes
`build/client`.

- **CSS that lays out prerendered markup must be in the initial stylesheet**,
  however lazy the component behind it. A component's own CSS import lands in
  that component's chunk; if its markup is in the HTML and its rules are not,
  the page renders unstyled and then reflows. Import it from `styles/index.css`.
- Anything the browser must apply before first paint is an inline string in
  `root.jsx` — the preloader, the Consent Mode defaults, `js-motion`. See
  `lib/preloaderShell`, `lib/motionArm`. Adding it from `entry.client` is too
  late: the prerendered page has already painted.

**Third-party scripts.** `src/config/` holds ids and toggles as data.
`src/third-party/` is the only place allowed to create a `<script>` element.
`src/consent/` holds the decision. Nothing external is imported anywhere else,
and nothing loads before consent. Consent Mode v2 defaults are denied inline
before anything can read them.

**Content.** `src/content/en/` is the base deck; `de/` is an overlay merged
key by key, so a missing German key falls through to English rather than
blanking. Arrays merge **by position** — inserting an item shifts every label
after it.

**Motion.** `.js-motion [data-reveal] { opacity: 0 }` is what hides a section
until it scrolls in. It is applied by script so a no-JS visitor never receives
CSS that hides the page.

**Deferred layout.** `.defer-render` puts `content-visibility: auto` on a
section. Each one carries its own `--defer-h` placeholder height, set narrow
and overridden at `lg`, because a phone stacks these to nearly double their
desktop height. A wrong estimate moves the ground under a reader mid-scroll.

## Do not edit

- `src/components/reactbits/*` — vendored. Re-fetch from source instead.
- `src/styles/fonts.css` — written by `npm run fetch:fonts`.

## Gates

`npm run format:check`, `npm run lint`, `npm run build`, `npm run budget`,
`npx lhci autorun`. All must pass. The budget's "eager JS" is what the
document asks for before anything runs; when it fails the answer is usually
"make it lazy", not "raise the ceiling" — and if you do raise it, say why in
the commit.

## Branches

Push to **`prerender`**. Never push `main`, and never merge `prerender` into
`main` unless asked for that merge in that message.

`main` is what Netlify builds for `https://ecomsniper.netlify.app`, so a merge
is a deploy. The user reviews locally and merges when satisfied — their call to
time, not something to offer as a convenience.

## Commits

Conventional Commits, lowercase after the colon, declarative rather than
imperative — match what is already in `git log`. The body explains _why_, and
records what was measured and what was tried and rejected.

**Never add Claude attribution** — no `Co-Authored-By`, no `Claude-Session`,
no "Generated with" footer. The repository is public and the client reads it.
