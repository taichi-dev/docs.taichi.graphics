# (WIP) Taichi Website

Hosted at https://taichi.graphics

A static website built with [VuePress](https://vuepress.vuejs.org/) and [Bulma](https://bulma.io/) for [Taichi](https://taichi.graphics), and its documentation, tutorials, event and etc.

## For documentation writters

**To update existing documentation or create new documentation, please always work on `website/docs/src/versioned_docs/develop` only, and merge back to that directly, versions should be cut-off following the guidelines below. Please carefully consider if you really need to update a doc that belongs to an older version!**

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

## Verioning

This site ships with a built-in verioning mechanism, to cut-off a new version from the
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

## Deploy

**Subject to change shortly**

This website currently hosted on Github Pages at https://rexwang.cc/taichi.graphics/. The `gh-pages` branch is hosting the static files.

Run `bash deploy.sh` to deploy for now.

## Future Work

**Top Priorities**

- [ ] Implement Doc versioning
- [ ] Integrate into Taichi release workflow
- [ ] Search integration with Algolia
- [ ] Chinese docs migration
- [ ] i18n translation workflow migration
- [ ] Taichi API docs auto-gen
- [ ] Auto deploy Github Action
- [ ] Docs about how to write the docs
- [ ] "Make"-ify the commands

## Credits

This website is built on top of the wonderful VuePress along with a list of
great plugins, thanks to all of the contributors of the [plugins that are used by
this site](./website/docs/src/.vuepress/config.js)!
