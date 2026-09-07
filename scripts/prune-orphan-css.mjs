/**
 * Deletes stylesheets in the client build that nothing references.
 *
 * `@react-router/dev` moves a stylesheet out of the server build into
 * `build/client/assets` on every build — the line reading "1 asset moved from
 * React Router server build to client assets". Nothing links it: it is the
 * server bundle's copy of the same CSS the client already has under its own
 * hash. 109KB uploaded on every deploy for a file no browser ever asks for.
 *
 * There is no config value that prevents it. The plugin moves the asset when
 * `ssrEmitAssets` is false and copies it when true, so the only way out is to
 * take it off the pile afterwards.
 *
 * **It deletes only what it can prove is unreferenced.** Every HTML and JS
 * file in the client build is read, and a stylesheet is removed only when its
 * filename appears in none of them. If the plugin ever starts linking that
 * file, the reference is found and nothing is deleted — the failure mode is
 * "does nothing", not "breaks the site".
 *
 * Runs as part of `npm run build`, so Netlify gets the same result as a local
 * build rather than a smaller thing nobody tested.
 */
import { readdirSync, readFileSync, statSync, unlinkSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

const ROOT = 'build/client';

/** Every file under a directory, recursively. */
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const files = walk(ROOT);
const stylesheets = files.filter((file) => extname(file) === '.css');

/* Anything that could name a stylesheet. Reading the whole client build once
   is cheap next to the build that just produced it. */
const referrers = files.filter((file) => ['.html', '.js', '.json'].includes(extname(file)));
const haystack = referrers.map((file) => readFileSync(file, 'utf8')).join('\n');

let removed = 0;
let bytes = 0;

for (const sheet of stylesheets) {
  const name = basename(sheet);
  if (haystack.includes(name)) continue;

  bytes += statSync(sheet).size;
  unlinkSync(sheet);
  removed += 1;
  console.log(`prune: removed unreferenced ${name}`);
}

if (removed === 0) {
  console.log('prune: no orphaned stylesheets');
} else {
  console.log(`prune: ${removed} file(s), ${(bytes / 1024).toFixed(1)}KB off the deploy`);
}
