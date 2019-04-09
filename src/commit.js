const utils = require('./utils')
const exec = require('./exec')
let changedFiles = [
  'package.json',
  'package-lock.json'
]
module.exports = (argv, newVersion) => {
  if (argv.changelog !== false) {
    changedFiles.push(argv.file)
  }
  const releaseMsg = `:tada: Release: v${newVersion}`
  if (argv.skipCommit) return Promise.resolve()
  changedFiles = utils.checkFileAndGetPath(argv, changedFiles).join(' ')
  if (changedFiles === '' || argv.dry) {
    return Promise.resolve()
  }
  return exec(argv, `git add ${changedFiles}`)
    .then(() => {
      return exec(argv, `git commit ${changedFiles} -m "${releaseMsg}"`)
    })
}
