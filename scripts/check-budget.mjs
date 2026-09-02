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

const DIST = 'dist';

/**
 * Ceilings in KB, raw bytes rather than gzip — parse and execute time tracks
 * the raw size, and that is what the budget is protecting.
 *
 * Set just above where the site sits today, not at a round number: a budget
 * with room in it is a budget nobody notices breaking.
 */
const BUDGETS = {
  /* 440, raised from 400 when React 18 became React 19: the vendor chunk went
     158KB -> 213KB raw, 53KB -> 67KB gzip, for the same application code. That
     is the toll on the road to React Router v8, which needs React 19, and it
     is paid once.

     It should come back down. Prerendering takes the first paint off the
     critical path entirely, and routing the pages through the router's own
     splitting should leave the homepage carrying less than it does today. If
     it does not, this number is the thing that says so. */
  eagerJs: 440,

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
   later by the code, so it is not in here — which is the point. */
const eager = new Set();
for (const match of html.matchAll(/<script[^>]+src="\/([^"]+\.js)"/g)) eager.add(match[1]);
for (const match of html.matchAll(/<link[^>]+rel="modulepreload"[^>]+href="\/([^"]+\.js)"/g)) {
  eager.add(match[1]);
}
if (!eager.size) throw new Error('No eager scripts found in dist/index.html — did the build run?');

const sizeOf = async (file) => (await stat(path.join(DIST, file))).size;

let eagerBytes = 0;
const eagerFiles = [];
for (const file of eager) {
  const bytes = await sizeOf(file);
  eagerBytes += bytes;
  eagerFiles.push(`${kb(bytes)}KB  ${file}`);
}

const assets = await readdir(path.join(DIST, 'assets'));
let cssBytes = 0;
for (const file of assets.filter((f) => f.endsWith('.css'))) {
  cssBytes += await sizeOf(path.join('assets', file));
}

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
