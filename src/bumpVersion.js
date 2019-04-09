const fs = require('fs')
const checkFileAndGetPath = require('./utils').checkFileAndGetPath
let versionFiles = ['package.json', 'package-lock.json']
module.exports = (argv, version) => {
  if (argv.dry === false) {
    return Promise.resolve()
  }
  versionFiles = checkFileAndGetPath(argv, versionFiles)

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
