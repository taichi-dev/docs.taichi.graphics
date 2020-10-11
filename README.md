# Taichi Website

[![Taichi](https://img.shields.io/badge/A%20Taichi%20Project-black?style=flat-square&labelColor=DCDCDC&logo=data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE1MDBwdCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDE1MDAgMTUwMCIgd2lkdGg9IjE1MDBwdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyB0cmFuc2Zvcm09Im1hdHJpeCguMSAwIDAgLS4xIDAgMTUwMCkiPjxwYXRoIGQ9Im03MDY1IDE0OTg5Yy04MzYtNTUtMTU3OC0yMTktMjMyNS01MTQtOTc1LTM4NS0xODQzLTk2MS0yNTg1LTE3MTYtMjIyLTIyNi0zNDQtMzYzLTUyMS01ODUtMTA5MC0xMzY0LTE2NjUtMzA1OC0xNjMxLTQ4MDQgMTMtNjY4IDk1LTEyNDAgMjY3LTE4NjkgNjM1LTIzMjIgMjM5MC00MjIwIDQ2NzAtNTA1MSAxMjg0LTQ2OCAyNjk2LTU3MiA0MDU1LTI5OSAxNTM4IDMxMCAyOTcwIDExMTkgNDAyNyAyMjc2IDE0NjAgMTU5NyAyMTU0IDM2ODggMTkzNyA1ODQzLTE1OCAxNTc4LTgyOCAzMDc5LTE5MDEgNDI2NS04NjUgOTU1LTE5NzMgMTY3OS0zMTg4IDIwODItNTgwIDE5My0xMTQ4IDMwNy0xODA1IDM2My0xNzIgMTUtODI0IDIxLTEwMDAgOXptNzE1LTE0OWM3NTktNjkgMTQ1OS0zNjEgMjA1NS04NTkgNTAtNDEgMTUzLTEzOCAyMzAtMjE2IDQyOC00MjkgNzUxLTk3NSA5MTgtMTU1NSAxMDItMzQ5IDE0MS02MzcgMTQxLTEwMjUgMC00NDctNTctNzk0LTE5OS0xMjA1LTQwMS0xMTY4LTE0MDAtMjA3MS0yNjA2LTIzNTktMjY0LTYzLTQ1Ny04OC04MDktMTAxLTE0MC02LTMxOC0xNy0zOTUtMjYtODA4LTkwLTE1NjQtNDQ3LTIxNDgtMTAxNC02NDQtNjI0LTEwMjUtMTQxMC0xMTE5LTIzMTAtMTYtMTU0LTE2LTU0NCAxLTcwNSA3NS03NTEgMzUzLTE0MjEgODI5LTIwMDUgMTE0LTEzOSAzNjktMzk0IDUxMC01MDggNDMwLTM1MCA5MDItNTg4IDE0MzItNzI2IDE1Ny00MCAxNDEtNDQtNzQtMTYtMjc1MyAzNTgtNTA3OCAyMjUxLTU5OTMgNDg4MC0xOTYgNTYzLTMwOCAxMDg2LTM4MCAxNzc1LTI1IDI0NS0yNSAxMDI0IDAgMTI3MCAzOCAzNjkgNzcgNjI5IDEzMyA4OTAgMjY2IDEyNDQgODIxIDIzNTAgMTY2OCAzMzI1IDEzMSAxNTEgNTE3IDUzOCA2NjQgNjY2IDk4MiA4NTUgMjA4OCAxNDExIDMzMzcgMTY3OCAzMjMgNjkgODEyIDEzNCAxMTE1IDE0OSAxNjYgOCA1ODcgNiA2OTAtM3ptLTE2My0xMDEzMWMzNDctNDcgNjI1LTI3NyA3MzktNjExIDcyLTIxMiA1My00ODAtNDctNjgxLTQ4LTk2LTExMC0xNzYtMjAxLTI2My0zMjctMzA4LTgyMS0zMjItMTE4NC0zMy0xMjcgMTAxLTI0NiAyODQtMjk1IDQ1MS0zMCAxMDUtMzcgMzA2LTE1IDQxOSA5NCA0NjYgNTM1IDc4MiAxMDAzIDcxOHoiLz48cGF0aCBkPSJtNzQyNSAxMjEyNGMtMTYwLTIzLTI0MC00Ni0zNTAtMTAxLTI0NS0xMjItNDI4LTM1Ni00OTEtNjI5LTI1LTEwNC0yNS0zMTktMS00MTYgODQtMzQxIDMyMi01OTMgNjU0LTY5NSA4MS0yNSAxMDItMjcgMjU4LTI3IDE0OC0xIDE4MCAyIDI1MCAyMiA1NzMgMTY0IDg1NiA3OTcgNTkzIDEzMjctMTI3IDI1OC0zNjMgNDM5LTY0OCA1MDAtNzIgMTUtMjE4IDI2LTI2NSAxOXoiLz48L2c+PC9zdmc+)](https://taichi.graphics)
[![Build Status](https://img.shields.io/github/workflow/status/taichi-dev/taichi.graphics/Deploy%20Taichi%20Website?label=Website%20Deployment&logo=github&style=flat-square)](https://github.com/rexwangcc/taichi.graphics/actions?query=workflow%3A%22Deploy+Taichi+Website%22)

A static website built with [VuePress](https://vuepress.vuejs.org/) and [Bulma](https://bulma.io/) for [Taichi](https://taichi.graphics), its documentation, tutorials, events etc.

## For documentation contributors

---

To update existing documentation or create new documentation, **please always work on `website/docs/src/versioned_docs/develop` only**, and merge back to that directory, versions should be cut-off following the guidelines below. **Please carefully consider if you really need to update a doc that belongs to an older version!**

---

## Prerequisites

You need to install the following before setting up this project:

- `yarn`

On macOS, you can install the above by:

```bash
brew install yarn
```

## Setup

Install all of the dependencies by:

```bash
# from the root of the project
yarn --cwd=website/docs install
```

## Local Development

In order to spin up the dev server locally for development:

```bash
yarn --cwd=website/docs dev
```

### Routing

The routing table of the entire site can be found at [website/docs/src/.vuepress/config.js](./website/docs/src/.vuepress/config.js). See [VuePress Docs](https://vuepress.vuejs.org/guide/directory-structure.html#directory-structure) for more details.

### Custom Styles

Most of the customization is done in 3 places:

- The plugin section of `website/docs/src/.vuepress/config.js`.
- `website/docs/src/.vuepress/style/index.styl`.
- `website/docs/src/.vuepress/style/palette.styl`.

### Build

To build the static site, from the root, run:

```bash
yarn --cwd=website/docs build
```

### Formatting

To format with default code styles, from the root, run:

```bash
yarn --cwd=website/docs format
```

Note: this will by default format most of the files in the project (including markdown, javascript files), which can result in a large set of changes, so run this with caution!

## Versioning

This site ships with a built-in versioning mechanism, to cut-off a new version from the
current **develop** docs:

1. Finish all of the work on `website/docs/src/versioned_docs/develop`.
2. Run the following command with the new version number:
```bash
yarn --cwd=website/docs createVersion ${VERSION} # for example, 0.1.0
```

This will make the following changes:

- Add the new version to `website/docs/src/versions.json`.
- [English Docs] Copy all documentation from `website/docs/src/versioned_docs/develop` to `website/docs/src/versioned_docs/{VERSION}`
- [中文文档] Copy all documentation from `website/docs/src/zh/versioned_docs/develop` to `website/docs/src/zh/versioned_docs/{VERSION}`

The above changes should be regarded as a transaction and shall be reverted **altogether** manually if needed.

## Generating API references

This site ships with a built-in API reference generator by peeking docstring in the `taichi` module. The docstring should be Google-style.
To update the API references (under `website/docs/src/versioned_docs/develop/api/`) with the `taichi` in `PYTHONPATH`:
```bash
python dumper.py
```

## Deployment

This website currently hosted on Github Pages at https://taichi.graphics. The `gh-pages` branch is hosting the static files.

The deployment is automatically done when Pull Requests are merged to `master` branch. It can also be triggered manually [here](https://github.com/rexwangcc/taichi.graphics/actions?query=workflow%3A%22Deploy+Taichi+Website%22).

## Future Work

**Top Priorities**

- [x] Implement Doc versioning
- [ ] Integrate into Taichi release workflow
- [ ] Search integration with Algolia
- [ ] Chinese docs migration
- [ ] i18n translation workflow migration
- [ ] Taichi API docs auto-gen
- [x] Auto deploy Github Action
- [x] Docs about how to write the docs
- [ ] "Make"-ify the commands

## Credits

This website is built on top of the wonderful VuePress along with a list of
great plugins, thanks to all of the contributors of the [plugins that are used by
this site](./website/docs/src/.vuepress/config.js)!
