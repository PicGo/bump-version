'use strict'
const conventionalChangelog = require(`./conventional-changelog.cjs`)
const parserOpts = require(`./parser-opts.cjs`)
const recommendedBumpOpts = require(`./conventional-recommended-bump.cjs`)
const writerOpts = require(`./writer-opts.cjs`)

module.exports = Promise.all([conventionalChangelog, parserOpts, recommendedBumpOpts, writerOpts])
  .then(([conventionalChangelog, parserOpts, recommendedBumpOpts, writerOpts]) => {
    return { conventionalChangelog, parserOpts, recommendedBumpOpts, writerOpts }
  })
