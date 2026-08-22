// The test files are ESM (vitest requires it); the source under test stays
// CommonJS, which `createRequire` loads unchanged.
import { describe, it, expect } from 'vitest'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const resolveVersion = require('../src/resolveVersion')

describe('resolveVersion — release types', () => {
  it('defaults to patch', () => {
    expect(resolveVersion({}, '1.2.3')).toEqual({ version: '1.2.4' })
  })

  it('bumps each release type from the current version', () => {
    expect(resolveVersion({ t: 'major' }, '1.2.3')).toEqual({ version: '2.0.0' })
    expect(resolveVersion({ t: 'minor' }, '1.2.3')).toEqual({ version: '1.3.0' })
    expect(resolveVersion({ t: 'patch' }, '1.2.3')).toEqual({ version: '1.2.4' })
  })

  it('applies the alpha and beta prerelease ids', () => {
    expect(resolveVersion({ t: 'preminor', a: true }, '1.2.3')).toEqual({ version: '1.3.0-alpha.0' })
    expect(resolveVersion({ t: 'preminor', b: true }, '1.2.3')).toEqual({ version: '1.3.0-beta.0' })
  })

  it('prefers alpha when both prerelease ids are given', () => {
    expect(resolveVersion({ t: 'prepatch', a: true, b: true }, '1.2.3')).toEqual({ version: '1.2.4-alpha.0' })
  })

  it('rejects an unknown release type instead of silently patching', () => {
    const result = resolveVersion({ t: 'bogus' }, '1.2.3')
    expect(result.error).toMatch(/Invalid release type: bogus/)
    expect(result.version).toBeUndefined()
  })
})

describe('resolveVersion — explicit --version', () => {
  it('takes the version verbatim', () => {
    expect(resolveVersion({ version: '2.0.0' }, '1.2.3')).toEqual({ version: '2.0.0' })
  })

  it('accepts a leading v, since that is how the tag reads', () => {
    expect(resolveVersion({ version: 'v2.0.0' }, '1.2.3')).toEqual({ version: '2.0.0' })
  })

  it('keeps a prerelease version intact', () => {
    // Regression: minimist parses `--version 1.0.0-beta.1` as a number and
    // truncates it unless the option is declared as a string.
    expect(resolveVersion({ version: '1.0.0-beta.1' }, '0.9.0')).toEqual({ version: '1.0.0-beta.1' })
  })

  it('tolerates surrounding whitespace', () => {
    expect(resolveVersion({ version: '  2.0.0  ' }, '1.2.3')).toEqual({ version: '2.0.0' })
  })

  it('wins over --type', () => {
    expect(resolveVersion({ version: '5.0.0', t: 'minor' }, '1.2.3')).toEqual({ version: '5.0.0' })
  })

  it('rejects a non-semver value', () => {
    expect(resolveVersion({ version: 'abc' }, '1.2.3').error).toMatch(/Invalid version: abc/)
  })

  it('refuses to go backwards', () => {
    const result = resolveVersion({ version: '1.0.0' }, '1.2.3')
    expect(result.error).toMatch(/not greater than the current 1\.2\.3/)
  })

  it('refuses to republish the current version', () => {
    expect(resolveVersion({ version: '1.2.3' }, '1.2.3').error).toMatch(/not greater/)
  })

  it('treats an empty or whitespace-only value as absent', () => {
    // Falls through to the --type path rather than erroring, so
    // `--version=""` behaves like not passing it at all.
    expect(resolveVersion({ version: '', t: 'minor' }, '1.2.3')).toEqual({ version: '1.3.0' })
    expect(resolveVersion({ version: '   ', t: 'minor' }, '1.2.3')).toEqual({ version: '1.3.0' })
  })

  it('ignores a non-string value rather than crashing', () => {
    // minimist can hand back a number or a boolean depending on how the flag
    // was written.
    expect(resolveVersion({ version: true, t: 'minor' }, '1.2.3')).toEqual({ version: '1.3.0' })
    expect(resolveVersion({ version: 2, t: 'minor' }, '1.2.3')).toEqual({ version: '1.3.0' })
  })

  it('allows a prerelease that sorts above the current version', () => {
    expect(resolveVersion({ version: '2.0.0-beta.1' }, '1.9.0')).toEqual({ version: '2.0.0-beta.1' })
  })

  it('rejects a prerelease that sorts below the current version', () => {
    // 2.0.0-beta.1 < 2.0.0 in semver, which is easy to get wrong by eye.
    expect(resolveVersion({ version: '2.0.0-beta.1' }, '2.0.0').error).toMatch(/not greater/)
  })
})
