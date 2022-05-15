const resolve = require('path').resolve
const compareFunc = require('compare-func')
const Q = require('q')
const readFile = Q.denodeify(require('fs').readFile)
const headerPattern = /^(:.*: (.*))$/

const compareTitleFunc = (a, b) => {
  const sortMap = {
    'Features': 10,
    'Bug Fixes': 9,
    'BREAKING CHANGES': 8,
  }
  const typeA = a.title.match(headerPattern)[2]
  const typeB = b.title.match(headerPattern)[2]

  return (sortMap[typeB] || 0) - (sortMap[typeA] || 0)
}

module.exports = Q.all([
  readFile(resolve(__dirname, './templates/template.hbs'), 'utf-8'),
  readFile(resolve(__dirname, './templates/header.hbs'), 'utf-8'),
  readFile(resolve(__dirname, './templates/commit.hbs'), 'utf-8'),
  readFile(resolve(__dirname, './templates/footer.hbs'), 'utf-8'),
])
  .spread((template, header, commit, footer) => {
    const writerOpts = getWriterOpts()

    writerOpts.mainTemplate = template
    writerOpts.headerPartial = header
    writerOpts.commitPartial = commit
    writerOpts.footerPartial = footer

    return writerOpts
  })

function getWriterOpts() {
  return {
    transform: (commit, context) => {
      let discard = true
      const issues = []

      commit.notes.forEach((note) => {
        note.title = 'BREAKING CHANGES'
        discard = false
      })

      if (commit.type === ':sparkles: Feature')
        commit.type = ':sparkles: Features'
      else if (commit.type === ':bug: Fix')
        commit.type = ':bug: Bug Fixes'
      else if (commit.type === ':zap: Perf')
        commit.type = ':zap: Performance Improvements'
      else if (commit.type === ':back: Revert')
        commit.type = ':back: Revert'
      else if (commit.type === ':pencil: Docs')
        commit.type = ':pencil: Documentation'
      else if (commit.type === ':package: Chore')
        commit.type = ':package: Chore'
      else if (commit.type === ':pushpin: Init')
        commit.type = ':pushpin: Init'
      else if (discard)
        return
      else if (commit.type === ':arrow_up: Upgrade')
        commit.type = ':arrow_up: Dependencies Upgrade'
      else if (commit.type === ':art: Style')
        commit.type = ':art: Styles'
      else if (commit.type === ':hammer: Refactor')
        commit.type = ':hammer: Code Refactoring'
      else if (commit.type === ':white_check_mark: Test')
        commit.type = ':white_check_mark: Tests'
      else if (commit.type === ':construction: WIP' || commit.type === ':tada: Release')
        return

      if (commit.scope === '*')
        commit.scope = ''

      if (typeof commit.hash === 'string')
        commit.hash = commit.hash.substring(0, 7)

      if (typeof commit.subject === 'string') {
        let url = context.repository
          ? `${context.host}/${context.owner}/${context.repository}`
          : context.repoUrl
        if (url) {
          url = `${url}/issues/`
          // Issue URLs.
          commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
            issues.push(issue)
            return `[#${issue}](${url}${issue})`
          })
        }
        if (context.host) {
          // User URLs.
          commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g, (_, username) => {
            if (username.includes('/'))
              return `@${username}`

            return `[@${username}](${context.host}/${username})`
          })
        }
      }

      // remove references that already appear in the subject
      commit.references = commit.references.filter((reference) => {
        if (!issues.includes(reference.issue))
          return true

        return false
      })

      return commit
    },
    groupBy: 'type',
    commitGroupsSort: compareTitleFunc,
    commitsSort: ['scope', 'subject'],
    noteGroupsSort: 'title',
    notesSort: compareFunc,
  }
}
