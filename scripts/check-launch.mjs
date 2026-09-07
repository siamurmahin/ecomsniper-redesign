/**
 * The checks that only matter on the day this goes live.
 *
 * Not part of `npm run build`: every one of these is fine to have wrong while
 * the site is being built, and none of them is fine on the morning it
 * replaces `ecomsniper.io`. Run it before the merge to `main` — a merge is a
 * deploy — and it exits non-zero if anything here would ship broken.
 *
 * Each check says what is wrong, why it matters, and who can fix it. Add one
 * when a launch-day mistake becomes imaginable, not when it happens.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const problems = [];
const notes = [];

const read = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : '');

/* ---------------------------------------------------------------------------
   1. Vendors named in the privacy policy, with no id set.

   Issue 11. The privacy copy is the client's own document and names Microsoft
   Clarity, Microsoft Advertising and Google Tag Manager. The cookie policy's
   table is generated from `config/vendors.js` and lists only vendors that have
   an id, so with none set it is empty. Both are correct on their own terms and
   a reader cannot see the distinction: a policy admitting to session
   recordings, beside a table saying this site sets nothing.
--------------------------------------------------------------------------- */
const legal = read('src/content/en/legal.js');
const env = read('.env.local') || read('.env');

const NAMED_VENDORS = [
  { copy: 'Clarity', key: 'VITE_CLARITY_ID' },
  { copy: 'Tag Manager', key: 'VITE_GTM_ID' },
];

for (const vendor of NAMED_VENDORS) {
  const named = legal.includes(vendor.copy);
  const configured = new RegExp(`^${vendor.key}\\s*=\\s*\\S`, 'm').test(env);
  if (named && !configured) {
    problems.push(
      `The privacy policy names "${vendor.copy}" and ${vendor.key} is not set. ` +
        `The cookie table will be empty while the policy describes tracking. ` +
        `Fix: set the id, or take the vendor out of the client's copy — with their sign-off.`,
    );
  }
}

/* ---------------------------------------------------------------------------
   2. Nothing in the built site links back to the old one.

   Every door pointed at `ecomsniper.io` until 8 Sep. If one comes back, it
   sends a visitor from the new site to the old one, which is the exact defect
   this rebuild records against them.
--------------------------------------------------------------------------- */
const ROOT = 'build/client';
if (existsSync(ROOT)) {
  const walk = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const full = join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : [full];
    });

  const documents = walk(ROOT).filter((file) => extname(file) === '.html');
  const offenders = [];

  for (const file of documents) {
    const html = readFileSync(file, 'utf8');
    /* Anchors only, and matched on the host.

       Two false positives got here before this was right. Matching the string
       `ecomsniper.io` anywhere in an href flagged their Trustpilot profile,
       which lives at uk.trustpilot.com/review/ecomsniper.io. Matching every
       href flagged the canonical and all the hreflang alternates, which are
       `<link>` tags and are *supposed* to name the production domain — the
       comment here claimed they were outside the loop and they were not.

       What this is actually looking for is a visitor being sent from the new
       site to the old one, and only an `<a>` can do that. */
    for (const match of html.matchAll(/<a\b[^>]*\shref="(https?:\/\/[^"]+)"/g)) {
      let host;
      try {
        host = new URL(match[1]).host;
      } catch {
        continue;
      }
      if (!/(^|\.)ecomsniper\.io$/i.test(host)) continue;
      if (!offenders.includes(match[1])) offenders.push(match[1]);
    }
  }

  if (offenders.length) {
    problems.push(
      `The built site links to the old one: ${offenders.slice(0, 5).join(', ')}. ` +
        `Fix: point them at this site's own routes.`,
    );
  }

  /* -------------------------------------------------------------------------
     3. The canonical says what this deploy actually is.
  ------------------------------------------------------------------------- */
  const home = read(join(ROOT, 'index.html'));
  const canonical = (home.match(/rel="canonical" href="([^"]*)"/) || [])[1];
  if (!canonical) {
    problems.push('The homepage has no canonical.');
  } else {
    notes.push(`Canonical origin in this build: ${new URL(canonical).origin}`);
    if (!canonical.startsWith('https://ecomsniper.io')) {
      notes.push(
        'That is not the production domain. Correct for a preview build; wrong for the deploy that goes live — production sets VITE_SITE_ORIGIN in netlify.toml.',
      );
    }
  }

  /* -------------------------------------------------------------------------
     4. The auth pages stay out of search.
  ------------------------------------------------------------------------- */
  for (const route of ['login', 'register']) {
    const doc = read(join(ROOT, route, 'index.html'));
    if (doc && !doc.includes('noindex')) {
      problems.push(`/${route} is missing its noindex. It is a design with no server behind it.`);
    }
  }

  /* -------------------------------------------------------------------------
     5. The deploy is not carrying a stylesheet nothing links.
  ------------------------------------------------------------------------- */
  const stylesheets = walk(ROOT).filter((file) => extname(file) === '.css');
  const haystack = walk(ROOT)
    .filter((file) => ['.html', '.js'].includes(extname(file)))
    .map((file) => readFileSync(file, 'utf8'))
    .join('\n');

  for (const sheet of stylesheets) {
    const name = sheet.split(/[\\/]/).pop();
    if (!haystack.includes(name)) {
      problems.push(
        `${name} (${(statSync(sheet).size / 1024).toFixed(0)}KB) is in the build and nothing links it. ` +
          `Fix: npm run build runs scripts/prune-orphan-css.mjs — this build did not.`,
      );
    }
  }
} else {
  problems.push('No build/client. Run npm run build first: half of these checks read the output.');
}

/* ------------------------------------------------------------------------ */
for (const note of notes) console.log(`note   ${note}`);

if (problems.length === 0) {
  console.log('\nok     nothing here blocks a launch');
  process.exit(0);
}

console.error('');
for (const problem of problems) console.error(`BLOCK  ${problem}\n`);
console.error(`${problems.length} thing(s) to settle before this goes live.`);
process.exit(1);
