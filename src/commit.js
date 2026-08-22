import { checkFileAndGetPath } from './utils.js'
import exec from './exec.js'
const VERSION_FILES = [
  'package.json',
  'package-lock.json'
]
export default (argv, newVersion) => {
  // Built per call: reassigning a module-level array leaks the previous
  // run's resolved paths into the next one.
  const files = argv.changelog !== false ? [...VERSION_FILES, argv.file] : [...VERSION_FILES]
  const releaseMsg = `:tada: Release: v${newVersion}`
  if (argv.skipCommit) return Promise.resolve()
  const changedFiles = checkFileAndGetPath(argv, files).join(' ')
  if (changedFiles === '' || argv.dry) {
    return Promise.resolve()
  }
  return exec(argv, `git add ${changedFiles}`)
    .then(() => {
      return exec(argv, `git commit ${changedFiles} -m "${releaseMsg}"`)
    })
}
