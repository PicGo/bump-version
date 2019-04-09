module.exports = {
  // types,
  types: [
    {
      value: ":sparkles: Feature",
      name: "Feature:  when adding new features"
    },
    {
      value: ":bug: Fix",
      name: "Fix:      when fixing bugs"
    },
    {
      value: ":construction: WIP",
      name: "WIP:      when working in progress"
    },
    {
      value: ":hammer: Refactor",
      name: "Refactor: when changing the code without adding features or fixing bugs"
    },
    {
      value: ":package: Chore",
      name: "Chore:    when changing the build process or auxiliary tools and libraries such as documentation generation"
    },
    {
      value: ":art: Style",
      name: "Style:    when improving the format/structure of the code"
    },
    {
      value: ":arrow_up: Upgrade",
      name: "Upgrade:  when upgrading dependencies"
    },
    {
      value: ":zap: Perf",
      name: "Perf:     when improving performance"
    },
    {
      value: ":pencil: Docs",
      name: "Docs:     when wrting docs"
    },
    {
      value: ":white_check_mark: Test",
      name: "Test:     when adding or updating tests"
    },
    {
      value: ":back: Revert",
      name: "Revert:   when reverting some commits"
    },
    {
      value: ":tada: Release",
      name: "Release:   when releasing a new version"
    },
    {
      value: ":pushpin: Init",
      name: "Init:     when initializing a project"
    }
  ],

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
