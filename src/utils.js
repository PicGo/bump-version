import path from 'node:path'
import fs from 'node:fs'
export const checkFileAndGetPath = (argv, files) => {
  return files.map(item => {
    if (path.isAbsolute(item)) {
      return item
    }
    return path.join(argv.path, item)
  }).filter(item => {
    return fs.existsSync(item)
  })
}
export const helperMsg = `
BumpVersion -- By PicGo Group

Usage
  bump-version

Example
  bump-version -t major                 Interactive, confirms before running
  bump-version -t minor -y              Non-interactive, no TTY needed
  bump-version --version 1.0.0 -y       Bump to an exact version
  bump-version -t minor -y -d           Preview without changing anything

Options
  -a, --preid-alpha             Prerelease id: alpha. Exp. 1.0.0.alpha-0

  -b, --preid-beta              Prerelease id: beta.  Exp. 1.0.0.beta-0

  -d, --dry                     Run bump version without change anything & output the log in console

  -f, --file                    Read and write the CHANGELOG file, relative to package.json's path
                                Default: CHANGELOG.md

  -p, --path                    A filepath of where your package.json is located
                                Default: ./

  -h, --help                    Display help message

  -t, --type                    Release type. [major, minor, patch, premajor, preminor, prepatch, prerelease]
                                Default: patch

  -y, --yes                     Skip all prompts and run immediately. Needs no TTY,
                                so it works in CI and in scripts
                                Default: false

      --version                 Bump to this exact version instead of deriving one
                                from --type. A leading "v" is accepted. Exp. 1.0.0

  --push                        Auto push commits to origin master
                                Default: false

  --no-tag                      Tag won't be created
                                Default: tag will be created

  --no-changelog                Changelog won't be created
                                Default: changelog will be created
`

