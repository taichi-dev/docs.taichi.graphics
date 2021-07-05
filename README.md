# Taichi Documentation Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/6825e411-c5f7-4148-ab43-023663f41b6a/deploy-status)](https://app.netlify.com/sites/docs-taichi-graphics/deploys)

A static documentation website built with [docusaurus](https://docusaurus.io/) for [Taichi](https://taichi.graphics) documentation.

## For documentation contributors

To update existing documentation or create new documentation, **please do not work on this repo**, this repo uses the
[main repo](https://github.com/taichi-dev/taichi) as the source of truth and regularly pulls the source documentation
from the main repo here.

However, this repo hosts the un-versioned non-doc pages, such as the `community` page, you can edit those pages directly
in this repo.

## For translation contributors

**(Still under construction, coming soon...)**

We plan to use Crowdin as our primary translation collaboration platform. Please
visit our [Crowdin project page](https://crowdin.com/project/taichi-programming-language) for translation progress and contribution opportunities!

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

If you are using `ubuntu`, you might get errors as below:
```
Usage: yarn [options]
yarn: error: no such option: --cwd
```
That is because yarn is too old. You could install new version yarn with `npm`:
```
sudo apt install nodejs npm
sudo npm install -g yarn
```

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
