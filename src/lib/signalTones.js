/**
 * The signal set, as class strings.
 *
 * The four eBay colours are used the way the live site uses them: one per
 * enumerated item, carried across every part of that item — icon tile, number
 * chip, rule, wash — so colour reads as identity rather than as decoration.
 * The values themselves live in `styles/index.css` under `--color-signal-*`.
 *
 * Why a lookup table rather than `bg-signal-${tone}`: Tailwind compiles the
 * classes it can see in the source. A template literal produces nothing at
 * build time, and every one of these utilities would be missing from the
 * stylesheet with no error to show for it.
 *
 * On the icon glyph inside a filled tile. Blue and red are dark enough to
 * carry a paper glyph (5.6:1 and 4.3:1); green and gold are not (2.4:1, 2.2:1)
 * and take an ink glyph instead (7.0:1, 7.5:1). Icons are non-text content, so
 * the bar is 3:1 — but the two light fills miss even that with white on them,
 * which is why the glyph colour is part of the tone and not a constant.
 */
export const SIGNAL_TONES = {
  blue: {
    // Filled tile: the brand value, with the glyph colour that survives on it.
    tile: 'bg-signal-blue text-paper',
    // The hue as text on paper, and the dashed number chip that goes with it.
    text: 'text-signal-blue-deep',
    // Solid fill of the readable variant: for small indicators on paper,
    // where the plain brand value is too light to signal state (3:1).
    dot: 'bg-signal-blue-deep',
    ring: 'border-signal-blue/40',
    // Edge rule along the bottom of a card.
    rule: 'bg-signal-blue',
    // Corner wash. Kept faint: it tints the card, it does not colour it.
    wash: 'from-signal-blue/10',
    // SpotlightCard takes a colour value, not a class.
    spotlight: 'rgb(0 100 210 / 0.16)',
    // On the ink bands the plain value is too dark to read as text.
    onInk: 'text-signal-blue-soft',
    onInkDot: 'bg-signal-blue-soft',
  },
  red: {
    tile: 'bg-signal-red text-paper',
    text: 'text-signal-red-deep',
    dot: 'bg-signal-red-deep',
    ring: 'border-signal-red/40',
    rule: 'bg-signal-red',
    wash: 'from-signal-red/10',
    spotlight: 'rgb(229 50 56 / 0.16)',
    onInk: 'text-signal-red-soft',
    onInkDot: 'bg-signal-red-soft',
  },
  green: {
    tile: 'bg-signal-green text-ink',
    text: 'text-signal-green-deep',
    dot: 'bg-signal-green-deep',
    ring: 'border-signal-green/50',
    rule: 'bg-signal-green',
    wash: 'from-signal-green/12',
    spotlight: 'rgb(134 184 23 / 0.18)',
    onInk: 'text-signal-green-soft',
    onInkDot: 'bg-signal-green-soft',
  },
  gold: {
    tile: 'bg-signal-gold text-ink',
    text: 'text-signal-gold-deep',
    dot: 'bg-signal-gold-deep',
    ring: 'border-signal-gold/50',
    rule: 'bg-signal-gold',
    wash: 'from-signal-gold/12',
    spotlight: 'rgb(220 165 76 / 0.18)',
    onInk: 'text-signal-gold-soft',
    onInkDot: 'bg-signal-gold-soft',
  },
};

/** Falls back to blue so a missing or mistyped tone degrades to the accent. */
export const toneOf = (tone) => SIGNAL_TONES[tone] ?? SIGNAL_TONES.blue;
