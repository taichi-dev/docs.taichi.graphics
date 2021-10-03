# Taichi 文档站

[![Netlify Status](https://api.netlify.com/api/v1/badges/6825e411-c5f7-4148-ab43-023663f41b6a/deploy-status)](https://app.netlify.com/sites/docs-taichi-graphics/deploys)
[![Crowdin](https://badges.crowdin.net/taichi-programming-language/localized.svg)](https://crowdin.com/project/taichi-programming-language)

[English]:./README.md
[中文]:./README-zh_CN.md

[English] | 中文

文本档是 [Taichi](https://taichi.graphics) 的官方文档, 基于 [docusaurus](https://docusaurus.io/)

---

💡 **变更前须知**

- 如果你想要**对 Taichi 的文档做任何变更**, 请移步[主仓库](https://github.com/taichi-dev/taichi/tree/master/docs)**而非在本仓库直接进行变更**! 该仓库仅仅是主仓库的文档的镜像版本, 专用于文档的编译和部署.
- 如果你希望为太极的文档**贡献多语言翻译**, 请移步[**我们的翻译页面**](https://translate.taichi.graphics). 在 [help-us-translate](https://docs.taichi.graphics/help-us-translate) 页面有更多关于多语言工作的细节. **注意: 出于性能的原因, 我们并未支持对翻译内容的部署预览, 如果你只是做了部分翻译文本的变更, 通常不需要做整站的预览**.
- 如果你希望**变更任何无关版本的非文档类页面**(比如, `commnunity` 和 `help-us-translate` 页面), 在本仓库操作即可. 欢迎对本仓库的任何 PR!
- 如果你希望**对网站做任何功能性变更**, 比如改变外观样式或者添加一个新的 React 组件, 在本仓库操作即可. 欢迎对本仓库的任何 PR!

<details>
  <summary>给文档站维护者的提示</summary>

  我们遵循本文档对应的 [docusaurus 指南](https://docusaurus.io/docs/i18n/crowdin#crowdin-tutorial)进行翻译工作. 请阅读这份指南以了解技术细节.

  如果你希望单独在本地为某个具体的多语言项启用开发服务环境, 在命令后添加 `--locale TARGET_LOCALE` 即可, 比如, 为 `zh-Hans` 启动服务环境的命令:

  ```bash
  yarn --cwd=website start --locale zh-Hans
  ```

  要预览翻译后的网站效果, 可执行

  ```bash
  yarn --cwd=website run crowdin download
  ```

  以下载经过**通过审核**的的翻译项到你本地, 并执行上文的 `start` 命令, 在本地预览你关心的多语言项.

  注意, 你可能需要在本地设置相应的环境变量 `CROWDIN_TOKEN`. 如果你有对应的权限, 可以从 Crowdin 的设置页生成 token.

  为了适配源文件可能的重构, 你需要不定期地检查或重构 Crowdin 上的文件结构. 更多细节请参考[这里](https://docusaurus.io/docs/i18n/crowdin#maintaining-your-site).
</details>

---

## 项目准备

在开始本项目前, 你需要安装以下工具:

- `yarn`

1. 在 macOS 上, 你可以这样安装:

```bash
brew install yarn
```

2. 在基于 Debian 的 Linux 发行版中, 你可以这样安装:

```bash
sudo apt install yarn
```

在 Arch Linux 上, 可以使用以下命令:

```bash
sudo pacman -S yarn
```

3. 在 Windows 上, 你需要首先安装 Node.js. 你可以在终端中运行 `node -v` 以检查它是否安装. 确认 Node.js 安装后, 从 yarn 的官方站点下载 [Yarn installer(.smi)](https://classic.yarnpkg.com/en/docs/install#windows-stable) 并安装它. 安装完毕后, 运行 `yarn --version` 以检查是否安装成功.

## 项目设置

安装所有的依赖:

```bash
# 在项目根目录执行
yarn --cwd=website install
```

### 常见问题

#### Ubuntu 上的 issues

如果你在使用 `ubuntu`, 你可能会遇到以下错误:

```
Usage: yarn [options]
yarn: error: no such option: --cwd
```

这说明你的 `yarn` 版本太旧. 你可以通过 `npm` 来更新 yarn:

```
sudo apt install nodejs npm
sudo npm install -g yarn
```

#### Development Server 的 issues

如果你遇到了 `TypeError: Cannot read property 'latest' of undefined` 错误, 请尝试删除 `website/node_modules` 和 `website/yarn.lock`, 然后重新运行 `install` 命令. 该问题可参考[这里](https://github.com/facebook/docusaurus/issues/5106).

## 本地开发

要在本地启动 dev server, 请运行

```bash
yarn --cwd=website start
```

### 编译

要编译静态站点, 请在项目根目录运行:

```bash
yarn --cwd=website build
```

你可以通过以下命令在本地 serve 编译后的静态站点:

```bash
yarn --cwd=website serve
```

## 多版本

该站点采用了 docusaurus 提供的多版本机制, 要了解更多细节, 请访问 docusaurus [关于多版本的文档](https://docusaurus.io/docs/versioning).

## 部署

该站点目前部署在 [Netlify](netlify.com) 上.

部署动作会在 Pull Requests 被合并到 `master` 分之后自动执行. 如需在合并前预览你的 PR 的效果, 可使用 Netlify 的预览特性.

## 鸣谢

该站点基于 Docusaurus 和其它很棒的开源项目构建, 感谢所有这些项目的贡献者们!

## 关于文档, 站点和多语言协作

- Thanks to all contributors who have contributed to the development of Taichi documentation, community and website in the past. Please navigate to the [members page of Taichi website](https://docs.taichi.graphics/community/members) to see the full acknowledgements.
Specifically, we have built a avatar atlas for whoever have contributed to the [taichi-docs-zh-cn](https://github.com/taichi-dev/taichi-docs-zh-cn) translations:

- Taichi中文文档及其社区、网站能够如此快速地成长，离不开每一位贡献者的工作和付出，感谢大家！请移步至 [Taichi网站的社区成员页面](https://taichi.graphics/community/members.html#simplified-chinese-documentation-contributors)来查看完整的鸣谢列表。特别地，我们在这里将曾参与过 [taichi-docs-zh-cn](https://github.com/taichi-dev/taichi-docs-zh-cn) 仓库翻译文档的贡献者特别列出。

![contributors](./assets/contributors_taichi-dev_taichi-docs-zh-cn_12.svg)
