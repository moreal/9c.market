import { defineConfig } from 'eslint/config';
import solid from 'eslint-plugin-solid';
import typescript from '@typescript-eslint/parser';

export default defineConfig([
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescript,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        JSX: 'readonly',
      },
    },
    plugins: {
      solid,
    },
    rules: {
      ...solid.configs.recommended.rules,
      'solid/reactivity': 'warn',
      'solid/no-destructure': 'warn',
      'solid/jsx-no-duplicate-props': 'error',
      'solid/prefer-for': 'warn',
      'solid/event-handlers': 'error',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', '.vinxi/**', '.output/**'],
  },
]);
