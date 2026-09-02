/**
 * Media lookups for section 04. Eager globs so the JSX can reach a file by the
 * plain key stored in `content/en/home/proof` instead of importing each one
 * so a poster can never end up on the wrong clip.
 *
 * Shared: the wall in 04a, the interviews in 04b and the receipts in 04c all
 * reach the same two folders, and three copies of these globs would be three
 * places to fix when a file is renamed.
 */
const VIDEO_THUMBS = import.meta.glob('../assets/video/*.webp', { eager: true, import: 'default' });
const RECEIPTS = import.meta.glob('../assets/proof/*.webp', { eager: true, import: 'default' });

export const thumbUrl = (key) => VIDEO_THUMBS[`../assets/video/${key}.webp`];
export const receiptUrl = (key) => RECEIPTS[`../assets/proof/${key}.webp`];
