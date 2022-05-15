const types = require('./commit-emoji.cjs').types

module.exports = {
  types,

  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    scope: "\nDenote the SCOPE of this change (optional):",
    // used if allowCustomScopes is true
    customScope: "Denote the SCOPE of this change:",
    subject: "[subject] Write a SHORT, IMPERATIVE tense description of the change:\n",
    body:
      '[body] Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: "List any BREAKING CHANGES (optional):\n",
    footer:
      "[footer] List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n",
    confirmCommit: "Are you sure you want to proceed with the commit above?"
  },

  allowCustomScopes: false,
  allowBreakingChanges: [":sparkles: Feature", ":bug: Fix"]
};
