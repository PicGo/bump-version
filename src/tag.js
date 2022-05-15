const exec = require('./exec')
module.exports = (argv, newVersion) => {
  if (argv.dry)
    return Promise.resolve()

  let flow
  if (argv.tag === false)
    flow = Promise.resolve()
  else
    flow = exec(argv, `git tag -a v${newVersion} -m v${newVersion}`)

  return flow
    .then(async() => {
      if (argv.push)
        await exec('git push --follow-tags origin master')

      return Promise.resolve()
    })
}
