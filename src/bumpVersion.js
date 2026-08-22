const fs = require('fs')
const checkFileAndGetPath = require('./utils').checkFileAndGetPath
// Resolved per call rather than cached at module scope: the resolved list is
// absolute and tied to one `argv.path`, so reusing it across calls would
// silently target the previous directory.
const VERSION_FILES = ['package.json', 'package-lock.json']
module.exports = (argv, version) => {
  // No early return for `dry` here: the write itself is guarded below, so
  // bailing out would also skip it for `--no-dry`, leaving commit and tag to
  // run against an unchanged version.
  const versionFiles = checkFileAndGetPath(argv, VERSION_FILES)

  for (let file of versionFiles) {
    let content = fs.readFileSync(file, 'utf8')
    try {
      content = JSON.parse(content)
      content.version = version
      content = JSON.stringify(content, null, 2) + '\n'
      if (argv.dry) {
        console.log('bump version to:', version)
      } else {
        fs.writeFileSync(file, content, 'utf8')
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }
  return Promise.resolve()
}
