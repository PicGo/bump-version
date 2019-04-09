const exec = require('child_process').exec
const logger = require('./logger')

module.exports = (argv, cmd) => {
  return new Promise((resolve, reject) => {
    // Exec given cmd and handle possible errors
    exec(cmd, { cwd: argv.path }, function (err, stdout, stderr) {
      // If exec returns content in stderr, but no error, print it as a warning
      // If exec returns an error, print it and exit with return code 1
      if (err) {
        logger(stderr || err.message, 'error')
        return reject(err)
      } else if (stderr) {
        logger(stderr, 'warn')
      }
      return resolve(stdout)
    })
  })
}
