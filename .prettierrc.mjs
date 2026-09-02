/**
 * Formatting, written down.
 *
 * Every value here was read off the code that already existed rather than
 * chosen — the repo has been consistent since the first commit, and the point
 * of this file is to stop that consistency depending on whoever is typing.
 *
 * It exists because it was nearly lost: a `prettier --write` with no config
 * ran during this session and rewrote a file's quotes from single to double,
 * because Prettier's own default is double and nothing here said otherwise.
 * With this committed, the same command is safe from any machine.
 */
export default {
  // Single quotes in JS, double in JSX attributes — what the code already does.
  singleQuote: true,
  jsxSingleQuote: false,

  /* 100, not the default 80. Measured across src: the 95th-percentile line is
     91 characters, so 80 would rewrap most of the codebase to prove a point
     nobody had made. */
  printWidth: 100,

  semi: true,
  tabWidth: 2,
  useTabs: false,

  /* Trailing commas everywhere, including function arguments — the code has
     them, and they keep a one-line addition from touching the line above it. */
  trailingComma: 'all',

  bracketSpacing: true,
  arrowParens: 'always',

  /* LF, matching what git stores. `.gitattributes` normalises on the way in,
     so a Windows checkout has CRLF on disk and LF in the repo; without this
     Prettier would rewrite every line ending on that machine. */
  endOfLine: 'lf',
};
