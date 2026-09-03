/**
 * The About page's photographs.
 *
 * Their own images, taken from ecomsniper.io/about and re-encoded: cropped to
 * the aspect each tile renders rather than merely resized, so object-cover is
 * not throwing away bytes the visitor already downloaded. 669KB of originals
 * became 239KB.
 *
 * Imported through this map rather than by path from the content deck, because
 * the deck is data and must stay free of build-time imports — a `src` string
 * in there would not survive bundling. The deck names an image; this resolves
 * it.
 *
 * Five of these are the client's own charity photographs. `moments` is not: it
 * is the Unsplash stock image their page carries, kept for now so the sixth
 * tile is not empty, and flagged as a launch blocker in `docs/ISSUES.md`.
 */
import education from './giving-education.webp';
import orphanage from './giving-orphanage.webp';
import supplies from './giving-supplies.webp';
import medical from './giving-medical.webp';
import visit from './giving-visit.webp';
import moments from './giving-moments.webp';
import portrait from './sammy-portrait.webp';

/** Intrinsic sizes, so tiles reserve their space before the file arrives. */
export const GIVING_IMAGES = {
  education: { src: education, width: 1100, height: 688 },
  orphanage: { src: orphanage, width: 720, height: 540 },
  supplies: { src: supplies, width: 720, height: 540 },
  medical: { src: medical, width: 720, height: 540 },
  visit: { src: visit, width: 720, height: 540 },
  /* PLACEHOLDER. An Unsplash stock photograph, not the client's charity work.
     It restores the sixth tile their page has while the real image is found.
     Replace or remove before launch — see `docs/ISSUES.md`. */
  moments: { src: moments, width: 720, height: 540 },
};

export const SAMMY_PORTRAIT = { src: portrait, width: 260, height: 260 };
