'use strict'

const parserOpts = require(`./parser-opts.cjs`)
const writerOpts = require(`./writer-opts.cjs`)

module.exports = Promise.all([parserOpts, writerOpts])
  .then(([parserOpts, writerOpts]) => {
    return { parserOpts, writerOpts }
  })
