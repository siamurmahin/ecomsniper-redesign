/**
 * The signal set as class strings — one colour per enumerated item, carried
 * across its tile, chip, rule and wash. Values live in `styles/index.css`.
 *
 * A lookup table rather than `bg-signal-${tone}` because Tailwind only
 * compiles classes it can see: a template literal would silently produce no
 * stylesheet output at all.
 *
 * The glyph colour is part of the tone, not a constant: blue and red carry a
 * paper glyph (5.6:1, 4.3:1), green and gold are too light and take ink
 * (7.0:1, 7.5:1) — white on them misses even the 3:1 non-text bar.
 */
export const SIGNAL_TONES = {
  blue: {
    tile: 'bg-signal-blue text-paper', // filled tile + a glyph colour that survives on it
    text: 'text-signal-blue-deep', // the hue as text on paper
    dot: 'bg-signal-blue-deep', // small indicators, where the brand value misses 3:1
    ring: 'border-signal-blue/40',
    edge: 'border-signal-blue', // the tone at full strength, for an active edge
    rule: 'bg-signal-blue', // edge rules
    wash: 'from-signal-blue/10', // corner tint, not a fill
    spotlight: 'rgb(0 100 210 / 0.16)', // SpotlightCard takes a value, not a class
    onInk: 'text-signal-blue-soft', // the plain value is too dark to read on ink
    onInkDot: 'bg-signal-blue-soft',
  },
  red: {
    tile: 'bg-signal-red text-paper',
    text: 'text-signal-red-deep',
    dot: 'bg-signal-red-deep',
    ring: 'border-signal-red/40',
    edge: 'border-signal-red', // the tone at full strength, for an active edge
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
    edge: 'border-signal-green', // the tone at full strength, for an active edge
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
    edge: 'border-signal-gold', // the tone at full strength, for an active edge
    rule: 'bg-signal-gold',
    wash: 'from-signal-gold/12',
    spotlight: 'rgb(220 165 76 / 0.18)',
    onInk: 'text-signal-gold-soft',
    onInkDot: 'bg-signal-gold-soft',
  },
};

/** Falls back to blue so a missing or mistyped tone degrades to the accent. */
export const toneOf = (tone) => SIGNAL_TONES[tone] ?? SIGNAL_TONES.blue;
