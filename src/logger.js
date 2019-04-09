const ora = require('./ora')
const chalk = require('chalk')
const level = {
  success: 'green',
  info: 'blue',
  warn: 'yellow',
  error: 'red'
}
module.exports = (msg, type) => {
  let log = chalk[level[type]](`[Bump ${type.toUpperCase()}]: `)
  log += msg
  ora.clear()
  ora.frame()
  console.log(log)
}
