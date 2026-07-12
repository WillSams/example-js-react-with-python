import js from '@eslint/js';
import react from 'eslint-plugin-react';
import comments from 'eslint-plugin-eslint-comments';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/**', 'public/**', 'build/**', 'dist/**', 'specs/**'],
  },
  js.configs.recommended,
  react.configs.flat['jsx-runtime'],
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: {
      'eslint-comments': comments,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: { version: '18.2' },
    },
    rules: {
      ...comments.configs.recommended.rules,
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/jsx-no-target-blank': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '_' }],
      'no-empty-function': ['error', { allow: ['methods', 'arrowFunctions'] }],
      'no-case-declarations': 'off',
      'no-console': 'error',
      'no-debugger': 'error',
    },
  },
];
