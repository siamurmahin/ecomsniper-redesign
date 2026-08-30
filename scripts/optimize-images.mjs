/**
 * One-shot asset resizer. Run with `npm run optimize:images`.
 *
 * Every target below is the largest size the asset is ACTUALLY rendered at
 * anywhere on the site, doubled for 2x screens, and then rounded up. Those
 * rendered widths were measured off the live page with all lazy images
 * committed — not guessed from the layout, because several of these appear at
 * two very different sizes (a video thumbnail is 96px in the interview list
 * and 398px in the proof wall, and the larger one is what has to be served).
 *
 * Assets already at or below their target are left alone, and anything that
 * fails to get meaningfully smaller is left alone too: re-encoding a file to
 * save 2% just costs quality.
 *
 * Sources are overwritten in place. They are in git; `git checkout` is the
 * undo.
 */

import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

/** maxRendered x 2 (for 2x screens), rounded up. */
const TARGETS = [
  // Thumbnails peak at 398px wide in the proof wall.
  { dir: 'src/assets/video', width: 800 },
  // Founder portraits render at 80px.
  { dir: 'src/assets/people', width: 200 },
  // Wordmark renders at 197px; the reticle mark is smaller still.
  { dir: 'src/assets/brand', width: 480 },
];

/** Below this saving, the re-encode is not worth the quality it costs. */
const MIN_SAVING = 0.12;

/**
 * Assets that are rendered much larger somewhere than the rest of their folder
 * and must not be shrunk to the folder's target.
 *
 * The first interview is the lead card in section 04b, which renders 753px
 * wide — so it needs ~1500px for a 2x screen, not the 800px the other eleven
 * need for their 398px slot in the proof wall. Shrinking it to 800 made the
 * lead card visibly soft on retina; this list is why that will not happen
 * again. If the lead interview changes, change this too.
 */
const KEEP_FULL_SIZE = new Set(['thumb-17-year-old-100-day.jpg']);

const kb = (n) => (n / 1024).toFixed(1) + 'KB';

async function processFile(file, targetWidth) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return null;

  if (KEEP_FULL_SIZE.has(path.basename(file))) {
    const size = (await stat(file)).size;
    return { file, skipped: 'kept full size (rendered large elsewhere)', before: size, width: null };
  }

  const before = (await stat(file)).size;

  /* Read to a Buffer first. Constructed from a path, sharp keeps the file open
     lazily, and writing back to that same path fails on Windows with
     `UNKNOWN: unknown error` rather than a recognisable lock error. */
  const input = await readFile(file);
  const image = sharp(input);
  const meta = await image.metadata();
  if (!meta.width || meta.width <= targetWidth) {
    return { file, skipped: 'already <= target', before, width: meta.width };
  }

  const resized = image.resize({ width: targetWidth, withoutEnlargement: true });
  const out =
    ext === '.png'
      ? await resized.png({ compressionLevel: 9, effort: 10 }).toBuffer()
      : await resized.jpeg({ quality: 82, mozjpeg: true, progressive: true }).toBuffer();

  if (out.length > before * (1 - MIN_SAVING)) {
    return { file, skipped: 'saving too small', before, after: out.length, width: meta.width };
  }

  await writeFile(file, out);
  return { file, before, after: out.length, from: meta.width, to: targetWidth };
}

let totalBefore = 0;
let totalAfter = 0;
const changed = [];
const skipped = [];

for (const { dir, width } of TARGETS) {
  let entries;
  try {
    entries = await readdir(dir);
  } catch {
    console.log(`(skipping ${dir} — not found)`);
    continue;
  }

  for (const name of entries) {
    const result = await processFile(path.join(dir, name), width);
    if (!result) continue;

    if (result.skipped) {
      totalBefore += result.before;
      totalAfter += result.before;
      skipped.push(`  – ${result.file} (${result.skipped}, ${result.width}px)`);
      continue;
    }

    totalBefore += result.before;
    totalAfter += result.after;
    changed.push(
      `  ✓ ${result.file}  ${result.from}px → ${result.to}px  ${kb(result.before)} → ${kb(result.after)}`,
    );
  }
}

console.log(changed.join('\n') || '  (nothing resized)');
if (skipped.length) console.log('\nLeft alone:\n' + skipped.join('\n'));
console.log(
  `\nTotal: ${kb(totalBefore)} → ${kb(totalAfter)}  (saved ${kb(totalBefore - totalAfter)}, ` +
    `${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(0)}%)`,
);
