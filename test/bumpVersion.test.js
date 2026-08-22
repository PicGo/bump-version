import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mkdtempSync, rmSync, writeFileSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import bumpVersion from '../src/bumpVersion.js'

let dir

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'bump-'))
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: 't', version: '1.0.0' }, null, 2) + '\n')
})

afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
  vi.restoreAllMocks()
})

const versionOf = (file = 'package.json') =>
  JSON.parse(readFileSync(join(dir, file), 'utf8')).version

describe('bumpVersion', () => {
  it('writes the new version to package.json', async () => {
    await bumpVersion({ path: dir }, '2.0.0')
    expect(versionOf()).toBe('2.0.0')
  })

  it('writes the version when --no-dry is passed', async () => {
    // Regression: the guard read `argv.dry === false`, which is exactly the
    // value minimist produces for `--no-dry`. The write was skipped while
    // commit and tag still ran, tagging an unchanged version.
    await bumpVersion({ path: dir, dry: false }, '2.0.0')
    expect(versionOf()).toBe('2.0.0')
  })

  it('changes nothing in dry mode', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    await bumpVersion({ path: dir, dry: true }, '2.0.0')

    expect(versionOf()).toBe('1.0.0')
    expect(log).toHaveBeenCalledWith('bump version to:', '2.0.0')
  })

  it('updates package-lock.json too when present', async () => {
    writeFileSync(join(dir, 'package-lock.json'), JSON.stringify({ name: 't', version: '1.0.0' }, null, 2) + '\n')
    await bumpVersion({ path: dir }, '2.0.0')

    expect(versionOf()).toBe('2.0.0')
    expect(versionOf('package-lock.json')).toBe('2.0.0')
  })

  it('preserves the other fields and stays valid JSON', async () => {
    const original = { name: 't', version: '1.0.0', scripts: { test: 'x' }, dependencies: { a: '^1.0.0' } }
    writeFileSync(join(dir, 'package.json'), JSON.stringify(original, null, 2) + '\n')
    await bumpVersion({ path: dir }, '2.0.0')

    const parsed = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'))
    expect(parsed).toEqual({ ...original, version: '2.0.0' })
  })

  it('ends the file with a newline', async () => {
    // Without it every release commit shows a spurious no-newline-at-eof diff.
    await bumpVersion({ path: dir }, '2.0.0')
    expect(readFileSync(join(dir, 'package.json'), 'utf8').endsWith('}\n')).toBe(true)
  })

  it('rejects rather than throwing synchronously on malformed JSON', async () => {
    writeFileSync(join(dir, 'package.json'), '{ not json')
    await expect(bumpVersion({ path: dir }, '2.0.0')).rejects.toBeInstanceOf(Error)
  })
})
