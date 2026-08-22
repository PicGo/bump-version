import bumpVersion from './bumpVersion.js'
import commit from './commit.js'
import changeLog from './changelog.js'
import tag from './tag.js'
import spinner from './ora.js'
export default (argv, currentVersion, newVersion) => {
  spinner.start()
  return Promise.resolve()
    .then(() => {
      spinner.text = 'Bumping version...'
      return bumpVersion(argv, newVersion)
    })
    .then(() => {
      spinner.text = 'Generating changelog...'
      return changeLog(argv, newVersion)
    })
    .then(() => {
      spinner.text = 'Commiting changes...'
      return commit(argv, newVersion)
    })
    .then(() => {
      spinner.text = 'Creating tag...'
      return tag(argv, newVersion)
    })
    .then(() => {
      return spinner.succeed('Done!')
    })
    .catch(err => {
      spinner.fail('Failed!')
      throw err
    })
}
