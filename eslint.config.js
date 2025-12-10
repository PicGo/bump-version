const { FlatCompat } = require('@eslint/eslintrc')
const js = require('@eslint/js')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

module.exports = [
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
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script'
    }
  },
  {
    files: ['eslint.config.js'],
    rules: {
      'n/no-unpublished-require': 'off'
    }
  }
]
