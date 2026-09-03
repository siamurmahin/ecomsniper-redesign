/**
 * Fails the build when the first screen gets heavier. Run with `npm run budget`.
 *
 * This site went from 42% to 69% on GTmetrix by taking things out, and the
 * thing about that kind of work is that it silently comes undone: a library
 * added for one section, a component made eager to fix a bug at 2am, a route
 * that stops being lazy. Nobody notices for weeks, and then a report says the
 * score dropped and nobody knows which change did it.
 *
 * So the number is checked on every build instead.
 *
 * "Eager" means what the browser must download and execute before it can draw
 * the first screen: the entry script plus everything `index.html` preloads as
 * a module. Chunks fetched later — the page below the fold, the other routes,
 * ScrollTrigger, the footer — are deliberately not counted, because moving
 * work into them is exactly the fix this is meant to encourage.
 *
 * When this fails, the answer is usually "make it lazy", not "raise the
 * ceiling". Raise the ceiling only when the weight is genuinely first-screen,
 * and say why in the commit.
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

/* What the browser is served. `build/server` beside it is the renderer that
   writes the HTML at build time and is never deployed, so it is not measured. */
const DIST = 'build/client';

/**
 * Ceilings in KB, raw bytes rather than gzip — parse and execute time tracks
 * the raw size, and that is what the budget is protecting.
 *
 * Set just above where the site sits today, not at a round number: a budget
 * with room in it is a budget nobody notices breaking.
 */
const BUDGETS = {
  /* 560, raised from 440 by the move to the router's framework mode. It did
     not come back down, and the note here said it should, so this is what
     happened instead.

     Framework mode replaced a `<BrowserRouter>` with the full data router:
     the route manifest, the hydration entry and the error boundaries are all
     on the first screen because hydration cannot start without them. Measured
     on the homepage, 423KB across 3 files became 533KB across 15, and the
     whole 110KB is the router runtime — `errorBoundaries` (107KB) and the
     `react-router/dom` chunk (77KB) are the two new names in the list.

     What the earlier note got wrong is that prerendering does not take that
     off the critical path — it takes the *paint* off it. The document now
     draws from HTML with no JavaScript at all, so none of this delays LCP;
     it delays the moment the page becomes interactive. So this number stopped
     protecting LCP and now protects hydration and TBT, and it is worth having
     for that. Read it that way before raising it again.

     The way to spend less is unchanged: make it lazy. Deferring a route's own
     module is the router's job now, so the application code left in here is
     small — the ceiling is mostly runtime.

     575, raised from 560 on 4 Sep while building the remaining pages out.
     What grew is the route manifest, not application code: roughly 1KB per
     route, and eager because hydration cannot begin without the route table.
     Ten pages left at 557KB meant the budget would fire on the next one, and
     "make it lazy" has no purchase on a manifest the router needs in order to
     start.

     Two reasons this is the right 15KB to spend. Prerendering already took
     paint off the critical path — the document draws from HTML with no
     JavaScript — so none of this touches LCP. And what it does affect,
     hydration and TBT, has measured room: Lighthouse desktop puts total
     blocking time at 0ms against 120ms on the live site.

     This is a ceiling for pages, not for weight. If it fires again on
     something that is not the manifest, that is a real regression — go and
     look rather than raising it. The runtime itself is the place to win the
     15KB back: errorBoundaries is 107KB eager and vendor-react 187KB, and
     neither has been examined. That is tuning work, deliberately deferred
     until the site is complete. */
  eagerJs: 575,

  /* Tailwind's output grows with the classes used, so this needs room to
     breathe or it fires on the next component rather than on a mistake. */
  css: 130,

  /* Every latin face shipped — 155KB — not the 134KB a homepage load actually
     fetches. Playfair's upright is in the build for the pages that use it and
     the homepage only pulls its italic, so counting downloads would make this
     number depend on which page you measured. The latin-ext pair is excluded:
     no first screen has a character that reaches for it. */
  fonts: 165,
};

const kb = (bytes) => Math.round(bytes / 1024);

const html = await readFile(path.join(DIST, 'index.html'), 'utf8');

/* What the document itself asks for before anything runs: the entry module and
   every chunk preloaded beside it. Anything imported dynamically is fetched
   later by the code, so it is not in here — which is the point.

   The modulepreloads carry this on their own now. The router's `<Scripts />`
   emits an inline module that imports the entry rather than a `<script src>`,
   so the first pattern finds nothing in a prerendered document; it is kept
   because a build that ever goes back to a plain src tag should still be
   counted rather than silently measured as weightless. */
const eager = new Set();
for (const match of html.matchAll(/<script[^>]+src="\/([^"]+\.js)"/g)) eager.add(match[1]);
for (const match of html.matchAll(/<link[^>]+rel="modulepreload"[^>]+href="\/([^"]+\.js)"/g)) {
  eager.add(match[1]);
}
if (!eager.size) {
  throw new Error(`No eager scripts found in ${DIST}/index.html — did the build run?`);
}

const sizeOf = async (file) => (await stat(path.join(DIST, file))).size;

let eagerBytes = 0;
const eagerFiles = [];
for (const file of eager) {
  const bytes = await sizeOf(file);
  eagerBytes += bytes;
  eagerFiles.push(`${kb(bytes)}KB  ${file}`);
}

/*
 * The stylesheets this document links, not every .css in the directory.
 *
 * Counting the directory was near enough when one document was built from one
 * CSS graph. Prerendering made it wrong twice over: the other routes' sheets
 * are in there, and so is a copy of the whole stylesheet emitted by the render
 * pass and moved into the client build by the router — 115KB that no document
 * links and no browser fetches. The budget is about what a visitor downloads,
 * so read that off the document like the scripts above.
 */
let cssBytes = 0;
for (const match of html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="\/([^"]+\.css)"/g)) {
  cssBytes += await sizeOf(match[1]);
}
if (!cssBytes) throw new Error(`No stylesheet found in ${DIST}/index.html — did the build run?`);

const fontDir = path.join(DIST, 'fonts');
let fontBytes = 0;
for (const file of await readdir(fontDir)) {
  if (file.includes('latin-ext')) continue;
  fontBytes += (await stat(path.join(fontDir, file))).size;
}

const results = [
  ['eager JS', kb(eagerBytes), BUDGETS.eagerJs],
  ['CSS', kb(cssBytes), BUDGETS.css],
  ['fonts (latin)', kb(fontBytes), BUDGETS.fonts],
];

console.log(eagerFiles.sort().join('\n'));
console.log();

let failed = false;
for (const [label, actual, budget] of results) {
  const headroom = budget - actual;
  const ok = actual <= budget;
  if (!ok) failed = true;
  console.log(
    `${ok ? 'ok  ' : 'OVER'}  ${label.padEnd(14)} ${String(actual).padStart(4)}KB / ${budget}KB` +
      `  (${headroom >= 0 ? headroom + 'KB spare' : Math.abs(headroom) + 'KB over'})`,
  );
}

if (failed) {
  console.error(
    '\nOver budget. Make the new weight lazy if it is not needed for the first\n' +
      'screen; raise the ceiling only if it genuinely is, and say why.',
  );
  process.exit(1);
}
