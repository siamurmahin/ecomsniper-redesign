import { gsap } from './motion';
import { SplitText } from 'gsap/SplitText';

/**
 * SplitText, registered where the one section that still needs it can reach it.
 *
 * It was registered in `motion.js`, which the hero imports, so it was in the
 * bundle the first screen waits for. The hero splits its own headline in the
 * markup now — the words are in the deck, and knowing them costs no
 * measurement. Section 03 splits by line, which cannot be known without
 * measuring the rendered text, and it is a screen down and in the page's own
 * chunk, so the plugin travels with it.
 */
gsap.registerPlugin(SplitText);

export { SplitText };
