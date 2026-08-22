# :tada: 3.0.0 (2026-08-22)


### :sparkles: Features

* convert the CLI to ESM and upgrade its dependencies ([9165570](https://github.com/PicGo/bump-version/commit/9165570))


### :bug: Bug Fixes

* stop dropping Upgrade, Style, Refactor and Test from changelogs ([cd252e2](https://github.com/PicGo/bump-version/commit/cd252e2))


### :arrow_up: Dependencies Upgrade

* clear the remaining dev vulnerabilities ([bdd1fb2](https://github.com/PicGo/bump-version/commit/bdd1fb2))
* move contributor tooling out of dependencies ([08093ca](https://github.com/PicGo/bump-version/commit/08093ca))


### :package: Chore

* update actions and run tests before publishing ([3317c25](https://github.com/PicGo/bump-version/commit/3317c25))


### :white_check_mark: Tests

* cover version resolution and the version write ([4b98e2a](https://github.com/PicGo/bump-version/commit/4b98e2a))


### BREAKING CHANGES

* note — otherwise it was silently discarded. Four of the
PicGo convention's own types never appeared in a changelog.

Moved the discard branch below them, where it now only catches genuinely
unrecognised types, and kept WIP and Release excluded explicitly.



# :tada: 2.1.0 (2026-08-22)


### :sparkles: Features

* add non-interactive mode and an explicit --version ([278d034](https://github.com/PicGo/bump-version/commit/278d034))


### :bug: Bug Fixes

* fix deps bug ([caba420](https://github.com/PicGo/bump-version/commit/caba420))
* github actions error ([03c0733](https://github.com/PicGo/bump-version/commit/03c0733))
* write the version when --no-dry is passed ([1c042cd](https://github.com/PicGo/bump-version/commit/1c042cd))


### :package: Chore

* update actions ([4b0c924](https://github.com/PicGo/bump-version/commit/4b0c924))
* update readme ([1819726](https://github.com/PicGo/bump-version/commit/1819726))



# :tada: 2.0.0 (2025-12-10)


### :bug: Bug Fixes

* some deps not installed ([f2a4f74](https://github.com/PicGo/bump-version/commit/f2a4f74))


### :package: Chore

* add pnpm-lock to npmignore ([6de1b65](https://github.com/PicGo/bump-version/commit/6de1b65))
* update deps \&\& add node 20 limit ([d2d96e9](https://github.com/PicGo/bump-version/commit/d2d96e9))



## :tada: 1.1.2 (2021-09-16)


### :package: Chore

* change travis-ci -> github actions ([d3c896f](https://github.com/PicGo/bump-version/commit/d3c896f))



## :tada: 1.1.1 (2021-04-10)



# :tada: 1.1.0 (2020-04-30)


### :sparkles: Features

* change some dev deps to deps ([12bd7b0](https://github.com/PicGo/bump-version/commit/12bd7b0))



## :tada: 1.0.3 (2019-05-11)


### :sparkles: Features

* **header:** add header-max-length from 72 to 100 ([7a5ec79](https://github.com/PicGo/bump-version/commit/7a5ec79))


### :bug: Bug Fixes

* **lint:** subject case can't be sentence-case ([860a327](https://github.com/PicGo/bump-version/commit/860a327))


### :pencil: Documentation

* refine readme ([#1](https://github.com/PicGo/bump-version/issues/1)) ([1984de2](https://github.com/PicGo/bump-version/commit/1984de2))
* remove a comma ([f484287](https://github.com/PicGo/bump-version/commit/f484287))



## :tada: 1.0.2 (2019-04-10)


### :bug: Bug Fixes

* preid command from 'pa' to 'a' && eslint error ([cf989fa](https://github.com/PicGo/bump-version/commit/cf989fa))


### :pencil: Documentation

* fix word error && change version badge ([0cbeb79](https://github.com/PicGo/bump-version/commit/0cbeb79))



## :tada: 1.0.1 (2019-04-09)


### :bug: Bug Fixes

* npm test command missed ([0c5301f](https://github.com/PicGo/bump-version/commit/0c5301f))
* symbolic links bug ([1a95111](https://github.com/PicGo/bump-version/commit/1a95111))
* travis yarn test bug ([77e97d4](https://github.com/PicGo/bump-version/commit/77e97d4))



# :tada: 1.0.0 (2019-04-09)


### :pushpin: Init

* picgo bump-version init commit ([b04432f](https://github.com/PicGo/bump-version/commit/b04432f))



