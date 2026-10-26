import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier/flat';
import globals from 'globals';
import { readFileSync } from 'node:fs';

const profile = JSON.parse(readFileSync(new URL('./profile.json', import.meta.url), 'utf8'));
export default defineConfig([
  {
    ignores: [
      '**/node_modules/**',
      '**/vendor/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/.astro/**',
      '**/.output/**',
      '**/.vinxi/**',
      '**/coverage/**',
      '**/*.gen.ts',
      '**/*.min.js',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    extends: [js.configs.recommended],
    linterOptions: { reportUnusedDisableDirectives: 'error' },
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    rules: {
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-debugger': 'error',
      'no-eval': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },

  { files: profile.browserFiles, languageOptions: { globals: globals.browser } },
  {
    files: [
      '.quality/**/*.mjs',
      'scripts/**/*.{js,mjs,cjs,ts,mts}',
      '*config.{js,mjs,cjs,ts}',
      'server/**/*.{js,mjs,cjs,ts}',
    ],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['.quality/**/*.mjs', 'scripts/**/*.{js,mjs,cjs,ts,mts}'],
    rules: { 'no-console': 'off' },
  },

  { ...prettier, rules: { ...prettier.rules, curly: ['error', 'all'] } },
]);
