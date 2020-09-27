# (WIP) Taichi Website

The Taichi website uses [VuePress](https://vuepress.vuejs.org/), a static site generator.

**Top Priorities**

- [ ] Doc versioning
- [ ] Integrate into Taichi release workflow
- [ ] Search integration with Algolia
- [ ] Chinese docs migration
- [ ] i18n translation workflow migration
- [ ] Taichi API docs auto-gen
- [ ] Auto deploy Github Action

## Pre-requisites

You need to have:

- `yarn` installed (`brew install yarn` on macOS)
- `vuepress` and its dependencies installed:
    ```bash
    yarn --cwd=website/docs install
    ```

## Development

### Local Development with hot-reload

Run `yarn --cwd=website/docs dev` to spin up the dev server.

### Routing

The routing table of the entire site can be found at `website/docs/src/.vuepress/config.js`. See [VuePress Docs](https://vuepress.vuejs.org/guide/directory-structure.html#directory-structure) for more details about this.

### Custom Styles

Most of the customization is done in 3 places:

- The plugin section of `website/docs/src/.vuepress/config.js`.
- `website/docs/src/.vuepress/style/index.styl`.
- `website/docs/src/.vuepress/style/palette.styl`.

### Formatting

Run `yarn --cwd=website/docs prettier --write .`

## Deploy

Run `bash deploy.sh` to deploy for now.

## Credits

This website is built on top of the wonderful Vuepress along with a list of
great plugins, thanks to all of the contributors of the [plugins that are used by
this site](./website/docs/src/.vuepress/config.js)!
