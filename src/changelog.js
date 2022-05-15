const fs = require('fs')
const cc = require('conventional-changelog')
const config = require('../conventional-changelog-picgo')

module.exports = (argv, newVersion) => {
  if (argv.changelog === false)
    return Promise.resolve()

  return new Promise((resolve, reject) => {
    let content = ''
    let oldContent = ''
    try {
      oldContent = fs.readFileSync(argv.file, 'utf8')
    }
    catch (e) {
      oldContent = ''
    }
    let context = ''
    if (argv.dry) {
      context = {
        version: newVersion,
      }
    }
    const changeLogStream = cc({
      config,
    }, context, { merges: null, path: argv.path }).on('error', (err) => {
      return reject(err)
    })
    changeLogStream.on('data', (buffer) => {
      content += buffer.toString()
    })
    changeLogStream.on('end', () => {
      if (argv.dry) {
        console.log('Changelog is:')
        console.log(content + oldContent)
      }
      else {
        fs.writeFileSync(argv.file, content + oldContent)
      }
      return resolve()
    })
  })
}
