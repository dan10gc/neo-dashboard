// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import { defineConfig, globalIgnores } from 'eslint/config'
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', 'src/test/**/*'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.app.json',
        },
      },
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: "./tsconfig.app.json",
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      'sort-imports': ['error', {
        ignoreCase: false,
        ignoreDeclarationSort: true, // Let import/order handle declaration sorting
        ignoreMemberSort: false,
        allowSeparatedGroups: true,
      }],
      'import/order': ['error', {
        groups: [
          'builtin',   // Node.js built-in modules
          'external',  // npm packages
          'internal',  // Aliased modules (@/)
          'parent',    // ../
          'sibling',   // ./
          'index',     // ./index
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      }],
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', 'src/test/**/*'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        project: "./tsconfig.app.json",
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ['vite.config.ts', 'vitest.config.ts', 'vitest.shims.d.ts', '.storybook/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      parserOptions: {
        project: "./tsconfig.node.json",
        tsconfigRootDir: __dirname,
      },
    },
  },
  ...storybook.configs['flat/recommended'],
])
