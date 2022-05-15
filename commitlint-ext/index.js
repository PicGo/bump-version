const typeEnum = require('../commit-emoji.cjs').types
const types = typeEnum.map(type => type.value)

module.exports = {
  parserPreset: '../conventional-changelog-ext/parser-opts',
  rules: {
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 100],
    'scope-case': [
      2,
      'always',
      ['lower-case', 'kebab-case'],
    ],
    'subject-case': [
      2,
      'never',
      ['sentence-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [0, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', types],
  },
}
