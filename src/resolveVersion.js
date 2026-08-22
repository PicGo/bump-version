const semver = require('semver')

const releaseTypes = ['major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', 'prerelease']

/**
 * Work out which version to bump to.
 *
 * Pure on purpose: the CLI turns the result into either an error exit or a
 * lifecycle run, and keeping the decision separate is what makes it testable
 * without spawning a process or touching a git repo.
 *
 * @param {object} argv parsed arguments; reads `version`, `t`/`type`, `a`, `b`
 * @param {string} currentVersion the version currently in package.json
 * @returns {{ version: string } | { error: string }}
 */
module.exports = (argv, currentVersion) => {
  // An explicit --version wins over --type: naming a version is unambiguous,
  // so silently deriving a different one from the type would be surprising.
  const explicit = typeof argv.version === 'string' ? argv.version.trim() : ''

  if (explicit !== '') {
    // Accept a leading `v` because that is how the tag is written and how
    // people say it out loud.
    const version = semver.valid(explicit.replace(/^v/, ''))
    if (version === null) {
      return { error: `Invalid version: ${explicit}` }
    }
    if (semver.lte(version, currentVersion)) {
      return { error: `Version ${version} is not greater than the current ${currentVersion}!` }
    }
    return { version }
  }

  const releaseType = typeof argv.t === 'string' ? argv.t : 'patch'
  if (!releaseTypes.includes(releaseType)) {
    return { error: `Invalid release type: ${releaseType}. Expected one of ${releaseTypes.join(', ')}` }
  }

  const preid = argv.a ? 'alpha' : argv.b ? 'beta' : ''
  const version = semver.inc(currentVersion, releaseType, preid)
  if (version === null) {
    return { error: `Cannot bump ${currentVersion} with release type ${releaseType}` }
  }
  return { version }
}

module.exports.releaseTypes = releaseTypes
