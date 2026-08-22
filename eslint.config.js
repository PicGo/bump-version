import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  {
    ignores: ['node_modules', 'dist']
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:n/recommended',
    'plugin:promise/recommended'
  ),
  {
    // The CLI and its src/ modules are ESM, as is this config.
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    },
    rules: {
      // Resolution of bare ESM specifiers is handled by Node, not the plugin.
      'import/no-unresolved': 'off'
    }
  },
  {
    // Configs consumed by other tools' CommonJS loaders stay CJS.
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        module: 'writable',
        require: 'readonly',
        __dirname: 'readonly'
      }
    }
  },
  {
    files: ['eslint.config.js'],
    rules: {
      'n/no-unpublished-import': 'off'
    }
  },
  {
    files: ['test/**/*.js'],
    rules: {
      'n/no-unpublished-import': 'off'
    }
  }
]
