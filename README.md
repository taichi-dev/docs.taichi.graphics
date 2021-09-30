# Taichi Documentation Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/6825e411-c5f7-4148-ab43-023663f41b6a/deploy-status)](https://app.netlify.com/sites/docs-taichi-graphics/deploys)
[![Crowdin](https://badges.crowdin.net/taichi-programming-language/localized.svg)](https://crowdin.com/project/taichi-programming-language)

[English]:./README.md
[中文]:./README-zh_CN.md

English | [中文]

A static documentation website built with [docusaurus](https://docusaurus.io/) for [Taichi](https://taichi.graphics) documentation.

---

💡 **Please make sure you understand the following before moving forward:**

- If you want to **update any Taichi documentation**, go to [the main repository](https://github.com/taichi-dev/taichi/tree/master/docs) instead and **please do not work on this repo**! This repo only hosts the mirrored version of the docs in order to build and deploy the documentation website.
- If you want to **contribute to the translations** of any Taichi documentation, go to **[Our Translation Page](https://translate.taichi.graphics)** instead. Our [help-us-translate](https://docs.taichi.graphics/help-us-translate) page has more details about the i18n workflow. _Note: we don't support deploy-previews for translations for performance reasons, and usually you don't need to preview the full website for translation strings._
- If you want to **update any non-doc pages that are not versioned** (e.g., the `community` and `help-us-translate` pages), you are at the right place. We welcome pull requests directly to this repo!
- If you want to **make a functional change to the website**, such as updating the styles or adding a new React
component, you are at the right place. We welcome related pull requests directly to this repo!

<details>
  <summary>Tips for Documentation Website Maintainers</summary>

  We follow the corresponding
  [docusaurus guide](https://docusaurus.io/docs/i18n/crowdin#crowdin-tutorial) for the translation setup. Please refer to the guide for technical details.

  If you want to spin up the development server locally for a specific locale,
  add `--locale TARGET_LOCALE` after the command. For example, in order to start
  the server for `zh-Hans`:

  ```bash
  yarn --cwd=website start --locale zh-Hans
  ```
  To preview the translated website, you can use

  ```bash
  yarn --cwd=website run crowdin download
  ```

  to download **approved** translations to your local disk, and run the `start` command listed above to preview the website in your desired locale locally. Note you may need to set the corresponding environment variable
  `CROWDIN_TOKEN` locally. It can be generated from the Crowdin settings page, if you have the right permission.

  You need to periodically check/refactor the file structure on Crowdin for any
  source file refactor. Please see more details [here](https://docusaurus.io/docs/i18n/crowdin#maintaining-your-site).
</details>

---

## Prerequisites

You need to install the following before setting up this project:

- `yarn`

1. On macOS, you can install the above by:

```bash
brew install yarn
```

2. On Debian-based Linux distribution, you can install the above by:

```bash
sudo apt install yarn
```

For Arch Linux, use the following command:

```bash
sudo pacman -S yarn
```

3. To install yarn on Windows, you need to install Node.js first. You can check it using `node -v‘` in the terminal. After it's verified, download the [Yarn installer(.smi)](https://classic.yarnpkg.com/en/docs/install#windows-stable) from the official yarn website and install it. To verifiy the installation, use `yarn --version`.

## Setup

Install all of the dependencies by:

```bash
# from the root of the project
yarn --cwd=website install
```

### Trouble shooting

#### Ubuntu issues

If you are using `ubuntu`, you might get errors as below:
```
Usage: yarn [options]
yarn: error: no such option: --cwd
```
which indicates your  `yarn` is too old. You could install new version yarn with `npm`:
```
sudo apt install nodejs npm
sudo npm install -g yarn
```

#### Development server issues

If you run into `TypeError: Cannot read property 'latest' of undefined` error,
try to remove both of `website/node_modules` and `website/yarn.lock` and re-run the
`install` command. This issue has been reported [here](https://github.com/facebook/docusaurus/issues/5106).

## Local Development

In order to spin up the dev server locally for development:

```bash
yarn --cwd=website start
```

(Currently we don't have the client-side redirect setup which means you will get 404 on root locally. Simply go to `/docs/` if you run into this)

### Build

To build the static site, from the root, run:

```bash
yarn --cwd=website build
```

you can then serve the built static website locally using:

```bash
yarn --cwd=website serve
```

## Versioning

This site leverages the versioning mechanism provided by docusaurus, for details, check
their docs about versioning [here](https://docusaurus.io/docs/versioning).

## Deployment

This website is currently hosted on [Netlify](netlify.com).

The deployment is automatically done when Pull Requests are merged to `master` branch.
You may preview your PR before merging utilizing Netlify's preview feature.

## Credits

This website is built on top of the wonderful Docusaurus along with a list of
great open source projects, thanks to all of the contributors of them!

## Acknowledgements (documentation, website and i18n)

- Thanks to all contributors who have contributed to the development of Taichi documentation, community and website in the past. Please navigate to the [members page of Taichi website](https://docs.taichi.graphics/community/members) to see the full acknowledgements.
Specifically, we have built a avatar atlas for whoever have contributed to the [taichi-docs-zh-cn](https://github.com/taichi-dev/taichi-docs-zh-cn) translations:

- Taichi中文文档及其社区、网站能够如此快速地成长，离不开每一位贡献者的工作和付出，感谢大家！请移步至 [Taichi网站的社区成员页面](https://taichi.graphics/community/members.html#simplified-chinese-documentation-contributors)来查看完整的鸣谢列表。特别地，我们在这里将曾参与过 [taichi-docs-zh-cn](https://github.com/taichi-dev/taichi-docs-zh-cn) 仓库翻译文档的贡献者特别列出。

![contributors](./assets/contributors_taichi-dev_taichi-docs-zh-cn_12.svg)
