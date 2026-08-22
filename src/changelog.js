import cc from 'conventional-changelog'
import fs from 'node:fs'
import config from '../conventional-changelog-picgo/index.cjs'

export default (argv, newVersion) => {
  if (argv.changelog === false) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    let content = ''
    let oldContent = ''
    try {
      oldContent = fs.readFileSync(argv.file, 'utf8')
    } catch {
      oldContent = ''
    }
    let context = ''
    if (argv.dry) {
      context = {
        version: newVersion
      }
    }
    let changeLogStream = cc({
      config
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
      } else {
        fs.writeFileSync(argv.file, content + oldContent)
      }
      return resolve()
    })
  })
}
