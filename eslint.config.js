import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    ignores: ['src/config/storage.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    'no-restricted-globals': [
        'error',
        { name: 'localStorage', message: 'Use the helpers in src/config/storage.ts.' },
        { name: 'reportError', message: "Import reportError from 'errors.ts' instead of using the browser's global." },
    ],
    'no-restricted-imports': ['error', {
            paths: [
                { name: '..', message: 'Import the component file directly. The barrel imports back into this file.' },
                { name: '../', message: 'Import the component file directly. The barrel imports back into this file.' },
            ],
        }],
    },
  },
)
