import semver from 'semver'

const RELEASE_TYPES = ['major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', 'prerelease']

export const releaseTypes = RELEASE_TYPES

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
export default (argv, currentVersion) => {
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
  if (!RELEASE_TYPES.includes(releaseType)) {
    return { error: `Invalid release type: ${releaseType}. Expected one of ${RELEASE_TYPES.join(', ')}` }
  }

  const preid = argv.a ? 'alpha' : argv.b ? 'beta' : ''
  const version = semver.inc(currentVersion, releaseType, preid)
  if (version === null) {
    return { error: `Cannot bump ${currentVersion} with release type ${releaseType}` }
  }
  return { version }
}

