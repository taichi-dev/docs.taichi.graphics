# 开发与贡献指南

首先，感谢你的参与和贡献！ 我们欢迎一切形式的贡献，包括但不限于

- 修复 Bug
- 提出和实现新功能
- 对本文档进行改进和翻译（欢迎前往\[Taichi 中文文档\](https://crowdin.com/project/taichi-programming-language/zh-CN#)）
- 完善错误时的提示，使之对用户更友好
- 提交新的测试用例
- 提交新的样例程序
- 提交编译器性能补丁
- 发布有关 Taichi 的博客文章和教程
- 加入我们的 [Taichi 论坛](https://forum.taichi.graphics/)
- 向你的朋友们介绍 Taichi 或者直接在 GitHub 上星标[Taichi 项目](https://github.com/taichi-dev/taichi)。
- 修复文档，代码，注释中的拼写错误（像这样的小问题请直接创建一个 PR 而不必开一个 issue）

## 如何参与 Bug 修复，添加新特性

标记了 [good first issue](https://github.com/taichi-dev/taichi/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) 的 issue 对新手来说较容易上手。

- 请先在这个 issue 中留下一句评论（比如： _我知道怎么解决这个，并且乐于提供帮助！_）。这样大家就知道已经有人在解决这个问题了。 这样有助于避免重复劳动；
- 如果没有核心开发成员说明一个 issue 可能的解决方案，请简要地描述你的方案，并在开始前静候开发成员的回复确认。 这可以保障实现的简洁高效。

标记了 [welcome contribution](https://github.com/taichi-dev/taichi/issues?q=is%3Aopen+is%3Aissue+label%3A%22welcome+contribution%22) 的 issue 相比之下更有挑战性但对新手仍然是比较友好的。

## 基本准则

- 切实解决问题是我们的最终目标。
- 不要小题大做：用_简单_的方案去解决简单的问题，这样你可以抽出时间和精力处理那些真正困难的问题。
- 几乎每一个设计都有两面性。 如果利大于弊，那就可以看作是一个好的_决定_ ，请务必权衡利弊。 请务必权衡利弊。
- 调试是很困难的。 每一次的改动应该很小，这样 Bug 的源头就可以很容易地找到。
- 单元/集成测试是我们的好伙伴。

::: note
"软件设计过程中中存在两种模式：一种是使之结构简单明了到没有任何问题，另一种是令结构设计足够复杂到完美无缺。 _而第一种方案则要困难的多_。" ——[C.A.R. 霍尔](https://en.wikipedia.org/wiki/Tony_Hoare)
:::

需要记住的一点是，Taichi 最初是作为一个学术研究项目而诞生的。 这通常意味着有些部分没有机会经过稳固坚实的设计。 虽然我们一直在努力提高代码质量，但这并不意味着项目能没有技术负债。 有些地方仍可能会过于复杂而让人感到困惑。 一旦你发现这种情形的存在，非常欢迎给我们提出 PR！ :-)

## 高效率地沟通

- 传达了多少有效信息，比打了多少字重要的多。
- 在沟通中保持积极， 礼貌， 注意语言的组织性、 准确性。
- 注意除了文字之外，列表（Bulleted lists）也是我们表达过程中的好伙伴。
- 提交评论前请仔细预读：如果你是读者，你能读懂自己所写的内容么？
- 如果你的母语不是英语，考虑使用拼写检查器，例如 [Grammarly](https://app.grammarly.com/)。

请根据事实进行讨论与反馈，而不是个人感觉。 对我们所有人来说，保持一个友好、零责备的社区环境是非常重要的。 一些例子如下：

::: tip
可接受的表达方式 :-) 这种设计可能会让 Taichi 的初学者感到困惑。
:::

::: danger
不可接受的表达方式 这种设计真是太糟糕了。
:::

## 提交良好的 PR

- 我们鼓励改动**很小**的 PR。 一个 PR 理想情况下应该 **只针对一个问题(issue)** 。
  - 也可以掺杂一些**无关紧要**的优化重构，比如修正笔误；
  - 审稿人保留要求 PR 作者删除一些**无关紧要**的改动的权利。
- PR 中的所有 commit 都应被**压缩&合并到 master 分支的一个 commit 里** 。
- 为保留清晰的提交日志 PR 作者**不应该将多条 commit 压缩(squash) 后提交**；
- 当实现一个复杂的特性时，考虑将其分散为许多个小 PR，从而保证更具细节的开发时间线，保证与开发者更频繁的沟通。
- 如果你想更及时的得到核心开发成员的反馈
  - 通过 GitHub 的 [Draft](https://github.blog/2019-02-14-introducing-draft-pull-requests/) 状态开一个 PR，这样就可以和我们实时分享你的进展了；
  - 请确保在评论中 @ 相应开发成员，或者使用请求评审(request the review)。
- 如果你同时在处理多个 PR
  - 互不依赖的 PR 都应该是基于 `master` 衍生出的 **不同** 分支；
  - 存在依赖的 PR 应该在所有前置 PR 合并入 `master` 后再进行提出。
- 所有 PR 理想情况下都应该伴随着相应的**测试**；
- 除了内部编译器的实现外，其余的 PR 都应该带有与其功能相对应的**文档更新**；
- 所有 PR 必须通过**持续集成测试(continuous integration tests)**后才能被合并；
- PR 的标题应当按照 `prtag` 的要求编写；
- 除此之外，谷歌有篇相当棒的文章 [how to have your PR merged quickly](https://testing.googleblog.com/2017/06/code-health-too-many-comments-on-your.html) 可供参考。 [[PDF]](https://github.com/yuanming-hu/public_files/blob/master/graphics/taichi/google_review_comments.pdf)

## 审核与 PR 的合并

- 请尝试遵循以下几个来自谷歌的建议
  - [Code Health: Understanding Code In Review](https://testing.googleblog.com/2018/05/code-health-understanding-code-in-review.html)；[[PDF]](https://github.com/yuanming-hu/public_files/blob/master/graphics/taichi/google_understanding_code.pdf)
  - [Code Health: Respectful Reviews == Useful Reviews](https://testing.googleblog.com/2019/11/code-health-respectful-reviews-useful.html)。 [[PDF]](https://github.com/yuanming-hu/public_files/blob/master/graphics/taichi/google_respectful_reviews.pdf)
- 合并操作应当始终将 PR **压缩&合并(squash and merge)** 到主分支（默认为master）上；
- 主分支要求记录**线性历史(linear history)**；
- 确保 PR 能够顺利通过**持续集成测试**，文档更新等情况除外；
- 确保标题遵循 `prtag` 的要求。

## 持续集成的运用

- 持续集成(Continuous Integration, CI)，将在 CI 环境中**构建**和**测试**你所提交的 PR。
- 目前，Taichi 使用的集成测试服务是 [TravisCI](https://travis-ci.org) (OS X 和Linux 平台) 以及 [AppVeyor](https://www.appveyor.com) (Windows 平台)。
- 每次你推送提交到一个开着的 PR 时，CI 将被触发。
- 可以在提交消息前加上 `[skip ci]` 以避免触发 CI。例如 `[skip ci] This commit will not trigger CI`
- 提交 ID 右侧有绿色对勾表示 CI 通过，红色叉号表示 CI 失败。

## 规范代码风格

- 在本地，可以通过在命令行中运行 `ti format` 来自动格式化代码。 请注意，在使用 `ti format` 之前，您必须在本地安装 `clang-format-6.0` 和 `yapf v0.29.0`。

- 如果不想在本地安装这些格式化工具，也可以使用我们的**格式化服务器(format server)**。 这是一个 `ti format` 的在线版本。

  - 访问 ☷ <http://kun.csail.mit.edu:31415/>, 并点击选取所需格式化的 PR id。
  - 回到 PR 页面，你将看到一个名为 @taichi-gardener (机器人) 的用户推送了一个名为 `[skip ci] enforce code format` 的提交。
  - 如果你没能找到机器人的提交，说明格式化服务器未发现任何不规范的代码格式。
  - 然后请在本地分支中运行 `git pull` 来提取格式化代码。
  - 值得留意的是，备注(commit message) 带有 `[format]` 的提交信息将自动触发格式化服务。 例如：`[format] our commit message`

## PR 标题格式和标签

PR 标题将成为 `master` 分支中提交历史的一部分，因此保证 PR 标题的可读性非常重要。

- 请务必在 PR 标题前附加上**至少一个**标签，如 `[Lang]` 等：
  - 当使用多个标签时，确保标签之间只留有一个空格分隔；
  - 例如， `\[Lang\]\[refactor\]`（没有空格）应该被格式化为 `\[Lang\] \[refactor\]`；
- PR 标题主干部分的首字母应该大写：
  - 例如，`[Doc] improve documentation` 应该被格式化为 `[Doc] Improve documentation`；
  - 同时，`[Lang] "ti.sqr(x)" is now deprecated` 是被允许的，因为 `"`是一个符号。
- 请不要在 PR 标题中包括反引号 ("`")。
- 例如，"\[Metal] Support bitmasked SNode"，"[OpenGL] AtomicMin/Max support"，或 "[Opt\] \[IR\] Enhanced constant folding"。

常用的标签：

- `[Metal], [OpenGL], [CPU], [CUDA]`：后端；
- `[LLVM]`：CPU 和 CUDA 共享的 LLVM 后端；
- `[Lang]`：前端语言特性，包括语法糖；
- `[Std]`：标准库，例如 `ti.Matrix` 和 `ti.Vector`；
- `[Sparse]`：稀疏计算；
- `[IR]`：中间表示(intermediate representation, IR)；
- `[Opt]`：IR 优化迭代轮数；
- `[GUI]`：内嵌的 GUI 系统；
- `[Refactor]`：代码重构；
- `[CLI]`：命令行接口，例如 `ti` 命令；
- `[Doc]`：与 `docs/` 目录下的文档相关；
- `[Example]`：与 `examples/` 目录下的样例程序相关；
- `[Test]`：在 `tests/` 目录下增加和改进测试程序；
- `[Linux]`：与 Linux 平台相关；
- `[Mac]`：与 Mac OS X 平台相关；
- `[Windows]`：与 Windows 平台相关；
- `[Perf]`：性能改进；
- `[Misc]`：难以归类的杂项，如版本跳跃，格式优化等；
- `[Bug]`：Bug修复；
- 在 [misc/prtags.json](https://github.com/taichi-dev/taichi/blob/master/misc/prtags.json) 中查看更多标签。
- 在引进新标签时，请在首先使用该标签的 PR 中一并更新 `misc/prtags.json` 列表，以便其他成员跟随使用。

::: note

我们感谢所有的贡献，但是我们不应该把每一个 PR 的标题暴露给终端用户。 因此，有必要将变更日志分类成用户应该知道什么和开发人员正在做什么。 而这是通过**大写 PR 标签**实现的：

- 对用户可见/值得注意的 PR，应该将其一开始的标签以**大写的首字母**进行标记，例如`[Metal], [OpenGL], [IR], [Lang], [CLI]`。 在发布新版本时，脚本（`python/taichi/make_changelog.py`）将生成一个突出显示这些更改（PR 标题）的变更日志。 因此，确保终端用户能够理解你的 PR 所做的工作是非常**重要**的，而这都是**基于你的 PR 标题**。
- 其他类型的 PR（底层开发/中间实现）应该使用**全小写字母**的标签：例如`[metal], [opengl], [ir], [lang], [cli]`。
- 由于发布更新日志的生成方式，PR 标题中应该**最多只有一个大写标记**，以防止重复的 PR 突出显示。 例如， `[GUI] [Mac] Support modifier keys` (#1189) 就是一个不好的例子，我们应该用 `[gui] [Mac] Support modifier keys in GUI` 来替代。 请只大写与 PR 内容最相关的标签。
:::

## C++ 和 Python 标准

Taichi 的 C++ 模块是基于 C++ 17 编写的，Python 模块是基于 3.6+ 编写的。 所以你可以合理地认为 C++ 17 和 Python 3.6 特性总是可用的。

## Taichi 编译器的开发建议

[Taichi 内核的生命周期](./compilation.md)这一章也许有助于你理解我们的工作。 它解释了整个编译过程。

如果你的工作涉及 IR 优化，请参见[基准测试和回归测试](./utilities.md#benchmarking-and-regression-tests)。

使用 `ti.init(arch=desired_arch, **kwargs)` 创建 Taichi 程序时，传入以下参数，可以使 Taichi 编译器打印出 IR：

- `print_preprocessed = True`：打印前端 Python AST 转换的结果。 结果脚本(resulting scripts) 在执行时将生成一个 Taichi 前端 AST。
- `print_ir = True` 打印内核编译（不包括访问器）中的 Taichi IR 转换过程。
- `print_accessor_ir = True`：打印数据访问器的 IR 转换过程，这是一种特殊而简单的内核的信息。 （这很少使用，除非你正在调试数据访问器相关的编译）
- `print_struct_llvm_ir = True`：保存由 Taichi 结构编译器生成的 LLVM IR。
- `print_kernel_llvm_ir = True`： 保存由 Taichi 内核编译器生成的 LLVM IR。
- `print_kernel_llvm_ir_optimized = True`：保存每个内核优化的 LLVM IR。
- `print_kernel_nvptx = True`：保存每个内核生成的 NVPTX（仅限 CUDA）。

::: note
Python 作用域中的数据访问器被实现为特殊的 Taichi 内核。 例如，`x[1, 2, 3] = 3` 将调用 `x` 的写访问器内核，`print(y[42])` 将调用 `y` 的读取访问器内核。
:::

## 目录结构

关键目录包括：

_（下面的目录可以通过[`tree . -L 2`](https://linux.die.net/man/1/tree)生成）_

```
.
├── benchmarks              # 性能基准
├── docs                    # 文档
├── examples                # 样例程序
├── external                # 扩展库
├── misc                    # 零散（但仍很有用）的文件
├── python                  # Python 前端实现
│   ├── core                # Taichi 核心的加载 & 交互
│   ├── lang                # 嵌入在 Python 中的 Taichi 语言 & 语法（重要）
│   ├── tools               # 提供给终端用户的便捷工具
│   └── misc                # 各种各样的工具
├── taichi                  # 核心编译器实现
│   ├── analysis            # 静态分析
│   ├── backends            # 基于设备的代码生成/运行时环境
│   ├── codegen             # 代码生成基类
│   ├── common
│   ├── gui                 # GUI 系统
│   ├── inc                 # 需要被重复引用的定义文件
│   ├── ir                  # 中间表示
│   ├── jit                 # 即时(Just-in-Time) 编译器基类
│   ├── llvm                # LLVM 实用工具
│   ├── math                # 数学类使用工具
│   ├── platform            # 平台支持依赖
│   ├── program             # 上层结构
│   ├── python              # C++/Python 接口
│   ├── runtime             # LLVM 运行环境
│   ├── struct              # 结构编译器基类
│   ├── system              # 操作系统相关的基础结构
│   ├── transforms          # IR 转换传递(Passes)
│   └── util                # 各种各样的工具
└── tests                   # 功能测试
    ├── cpp                 # C++ 测试
    └── python              # Python 测试（重要）
```

## 测试

测试程序应该添加到 `tests/` 目录下。

### 命令行工具

- 使用 `ti test` 运行所有测试用例。
- 使用 `ti test -v` 查看详细输出信息。
- 使用 `ti test -C` 运行测试并记录代码覆盖率，参阅[代码测试覆盖率](./utilities.md#coverage)查看更多信息。
- 使用 `ti test -a <arch(s)>` 针对指定后端进行测试。 例如，`ti test -a cuda,metal`。
- 使用 `ti test -na <arch(s)>` 测试除指定架构外的其余所有架构。 例如，`ti test -na opengl,x64`。
- 使用 `ti test <filename(s)>` 运行指定文件名的测试实例。 例如，`ti test numpy_io` 将会运行 `tests/python/test_numpy_io.py` 中的所有测试用例。
- 使用 `ti test -c` 以仅运行 C++ 测试程序。 例如，`ti test -c alg_simp` 将会运行 `tests/cpp/test_alg_simp.cpp` 测试。
- 使用 `ti test -k <key>` 运行与指定关键词相匹配的测试。 例如，`ti test linalg -k "cross or diag"` 将会运行 `tests/python/test_linalg.py` 中的 `test_cross` 和 `test_diag`。

使用 `ti test -h` 来查看更多选项。

要了解更多有关如何编写测试用例的详细信息，请参阅[编写Python测试的工作流程](./write_test.md)章节。

## 文档

文档被放置于 `docs/` 目录下。

- 我们使用 [reStructured text](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html)(.rst) 来撰写文档。
- 我们使用 [readthedocs.io](https://taichi.readthedocs.io/en/stable) 在线托管我们的文档。
- 使用 `ti doc` 在本地构建文档。
- 打开 `docs/build/index.html` 以查看构建的文档。

::: note

在 Linux/OS X 下, 使用 `watch -n 1 ti doc` 以持续地构建文档。

如果 OpenGL 后端检测器一直在创建新窗口，请在 `ti doc` 前执行 `export TI_WITH_OPENGL=0`。
:::

## 跨 Python/C++ 的高效代码导航

如果你使用的是前端语言（Python/C++接口），要在代码库中导航，[ffi-navigator](https://github.com/tqchen/ffi-navigator) 允许从 Python 跳转到它们在 C++ 中绑定的定义。按照前述链接的 README 设置你的编辑器。

## 升级 CUDA

目前我们的开发工作是针对 CUDA 10。 在升级 CUDA 版本时，当前 `external/cuda_libdevice/slim_libdevice.10.bc` 文件会被新的版本所取代。

要生成基于 CUDA 安装时完整 `libdevice.X.bc` 文件的精简版本，使用：

```bash
ti task make_slim_libdevice [libdevice.X.bc file]
```
