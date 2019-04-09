const bumpVersion = require('./bumpVersion')
const commit = require('./commit')
const changeLog = require('./changelog')
const tag = require('./tag')
const spinner = require('./ora')
module.exports = (argv, currentVersion, newVersion) => {
  spinner.start()
  return new Promise((resolve, reject) => {
    spinner.text = 'Bumping version...'
    return resolve(bumpVersion(argv, newVersion))
  }).then(() => {
    spinner.text = 'Generating changelog...'
    return changeLog(argv, newVersion)
  }).then(() => {
    spinner.text = 'Commiting changes...'
    return commit(argv, newVersion)
  }).then(() => {
    spinner.text = 'Creating tag...'
    return tag(argv, newVersion)
  }).then(() => {
    spinner.succeed('Done!')
  }).catch(e => {
    spinner.fail('Failed!')
  })
}
