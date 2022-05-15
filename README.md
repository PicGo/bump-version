# bump version

fork from [PicGo/bump-version](https://github.com/PicGo/bump-version)

## Installation

```bash
npm install -D  @oceanlvr/bump-version
```

package.json

```json
{
  "scripts": {
    "cz": "git-cz",
    "release": "bump-version"
  }
}
```

1. `git add` something changed
2. `npm run cz` to commit
3. `npm run release` to release or deploy

## Bump version

```bash
npm run release
```

```txt
Usage
  bump-version

Example
  bump-version -t major

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

  --push                        Auto push commits to origin master
                                Default: false

  --no-tag                      Tag won't be created
                                Default: tag will be created

  --no-changelog                Changelog won't be created
                                Default: changelog will be created
```

If you reject the default next version, then you can choose which version you want or customize one.

If you just want to see what the changelog will be created and nothing will be changed:

```bash
npm run release --dry
```
