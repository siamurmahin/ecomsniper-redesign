import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

/**
 * Flat config (ESLint 9). Three things are checked and nothing else: real JS
 * mistakes, the rules of hooks, and whether a module stays fast-refresh safe.
 *
 * No stylistic rules — formatting is not litigated here. A linter that shouts
 * about spacing gets muted, and takes the correctness rules down with it.
 *
 * `react-hooks` v7 ships the React Compiler rule set in its recommended
 * config. This project does not run the compiler, and those rules fire mostly
 * inside vendored React Bits components, so only the two classic rules are
 * enabled. Turn the rest on the day the compiler is adopted.
 *
 * `react/jsx-uses-vars` is the one rule pulled from eslint-plugin-react:
 * without it `no-unused-vars` cannot see a component referenced only from JSX
 * and reports every import in the file.
 */
export default [
  /* `build/**` and `.react-router/**` alongside `dist/**`: the router writes
     the first two, and linting a minified bundle reports the minifier's work
     as 151 errors in the application's own name. */
  {
    ignores: [
      'dist/**',
      'build/**',
      '.react-router/**',
      'node_modules/**',
      '_backup/**',
      'public/**',
    ],
  },

  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.es2021 },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'react/jsx-uses-vars': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Vendored components use `_`-prefixed throwaways.
      'no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // Build tooling runs in Node, not the browser.
  {
    files: ['vite.config.js', 'eslint.config.js', 'scripts/**/*.{js,mjs}'],
    languageOptions: { globals: globals.node },
  },
];
