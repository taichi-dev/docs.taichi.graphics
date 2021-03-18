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
- 向你的朋友们介绍 Taichi 或者直接在 GitHub 上星标[Taichi项目](https://github.com/taichi-dev/taichi)。
- 修复文档，代码，注释中的拼写错误（像这样的小问题请直接创建一个 PR 而不必开一个issue）

## 如何参与 Bug 修复，添加新特性

标记了 [\"good first issue\"](https://github.com/taichi-dev/taichi/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) 的 issue 对新手来说较容易上手。

- 请先在这个 issue 中留下一句评论（比如： _我知道怎么解决这个，并且乐于提供帮助！_）。这样大家就知道已经有人在解决这个问题了。 这样有助于避免重复劳动；
- 如果没有核心开发成员说明一个 issue 可能的解决方案，请简要地描述你的方案，并在开始前静候开发成员的回复确认。 这可以保障实现的简洁高效。

标记了 [\"welcome contribution\"](https://github.com/taichi-dev/taichi/issues?q=is%3Aopen+is%3Aissue+label%3A%22welcome+contribution%22) 的 issue 相比之下更有挑战性但对新手仍然是比较友好的。

## 进阶指导

- 切实解决问题是我们的最终目标。
- 不要小题大做：用 _简单_ 的方案去解决简单的问题，这样你可以抽出时间和精力处理那些真正困难的问题。
- 几乎每一个设计都有两面性。 如果利大于弊，那就可以看作是一个 好的_决定_ ，请务必权衡利弊。 请务必权衡利弊。
- 调试是很困难的。 每一次的改动应该很小，这样 Bug 的源头就可以很容易地找到。
- 单元/集成测试是我们的好伙伴。

::: note
"软件设计过程中中存在两种模式：一种是使之结构简单明了到没有任何问题，另一种是令结构设计足够复杂到完美无缺。 _而第一种方案则要困难的多_。" [C.A.R. 霍尔](https://en.wikipedia.org/wiki/Tony_Hoare)
:::

需要记住的一点是，Taichi 最初是作为一个学术研究项目而诞生的。 这通常意味着有些部分没有机会经过稳固坚实的设计。 虽然我们一直在努力提高代码质量，但这并不意味着项目能没有技术负债。 有些地方仍可能会过于复杂而让人感到困惑。 一旦你发现这种情形的存在，非常欢迎给我们提出 PR！ :-)

## 高效率地沟通

- 传达了多少有效信息，比打了多少字重要的多。
- 在沟通中保持积极， 礼貌， 注意语言的组织性、 准确性。
- 注意除了文字之外，列表（Bulleted lists）也是我们表达过程中的好伙伴。
- 提交评论前请仔细预读：如果你是读者，你能读懂自己所写的内容么？
- 如果你的母语不是英语，考虑使用拼写检查器，例如[Grammarly](https://app.grammarly.com/)。

请根据事实进行讨论与反馈，而不是个人感觉。 对我们所有人来说，保持一个友好、零责备的社区环境是非常重要的。 一些例子如下：

::: tip
可接受的表达方式 :-) 这种设计可能会让 Taichi 的初学者感到困惑。
:::

::: danger
不可接受的表达方式 这种设计真是太糟糕了。
:::

## 提交良好的 PR

- 我们鼓励改动**很小**的 PR。 一个 PR 理想情况下应该 **只针对一个问题(issue)** 。
  - 也可以掺杂一些 **无关紧要** 的优化重构，比如修正笔误；
  - 审稿人保留要求 PR 作者删除一些 **无关紧要** 的改动的权利。
- PR 中的所有 commit 都应被 **压缩&合并到 master 分支的一个 commit 里** 。
- 为保留清晰的提交日志 PR 作者 **不应该将多条 commit 压缩(squash) 后提交**；
- 当实现一个复杂的特性时，考虑将其分散为许多个小 PR，从而保证更具细节的开发时间线，保证与开发者更频繁的沟通。
- 如果你想更及时的得到核心开发成员的反馈
  - 通过 GitHub 的 [Draft](https://github.blog/2019-02-14-introducing-draft-pull-requests/)状态开一个 PR，这样就可以和我们实时分享你的进展了；
  - 请确保在评论中 @ 相应开发成员，或者使用请求评审(request the review)。
- 如果你同时在处理多个 PR
  - 互不依赖的 PR 都应该是基于 `master` 衍生出的 **不同** 分支；
  - 互相依赖的 PR 应该在所有前置 PR 合并入 `master` 后再进行提出。
- 所有 PR 理想情况下都应该伴随着相应的 **测试**；
- 除了内部编译器的实现外，其余的 PR 都应该带有与其功能相对应的 **文档更新**；
- 所有 PR 必须通过 **持续集成测试(continuous integration tests)** 后才能被合并；
- PR 的标题应当按照 `prtag` 的要求编写；
- 除此之外，谷歌有篇相当棒的文章[how to have your PR merged quickly](https://testing.googleblog.com/2017/06/code-health-too-many-comments-on-your.html)可供参考。 [[PDF]](https://github.com/yuanming-hu/public_files/blob/master/graphics/taichi/google_review_comments.pdf)

## 审核与 PR 的合并

- 请按照以下几个来自谷歌的建议
  - [Code Health: Understanding Code In Review](https://testing.googleblog.com/2018/05/code-health-understanding-code-in-review.html); [\[PDF\]](https://github.com/yuanming-hu/public_files/blob/master/graphics/taichi/google_understanding_code.pdf)
  - [Code Health: Respectful Reviews == Useful Reviews](https://testing.googleblog.com/2019/11/code-health-respectful-reviews-useful.html). [\[PDF\]](https://github.com/yuanming-hu/public_files/blob/master/graphics/taichi/google_respectful_reviews.pdf)
- 合并操作应当始终将 PR **压缩&合并** 到主分支（默认为master）上；
- 主分支要求记录 **线性历史**；
- 确保 PR 能够顺利通过 **持续集成测试**，文档更新等情况除外；
- 确保标题遵循 `prtag` 的要求。

## 持续集成的运用

- 持续集成(Continuous Integration, CI)，将在 CI 环境中 **构建** 和 **测试**你所提交的 PR。
- 目前，Taichi 使用的集成测试服务是[TravisCI](https://travis-ci.org)(OS X 和Linux 平台) 以及[AppVeyor](https://www.appveyor.com)(Windows 平台)。
- 每次你推送提交到一个开着的 PR 时，CI 将被触发。
- 可以在提交消息前加上 `[skip ci]` 以避免触发 CI。例如 `[skip ci] This commit will not trigger CI`
- 提交 ID 右侧有绿色对勾表示 CI 通过，红色叉号表示 CI 失败。

## 规范代码结构

- 在本地，可以通过在命令行中运行 `ti format` 来自动格式化代码。 请注意，在使用`ti format`之前，您必须在本地安装 `clang-format-6.0`和`yapf v0.29.0`。

- 如果不想在本地安装这些格式化工具，也可以使用我们的**格式化服务器(format server)**。 这是个 `ti format` 的在线版本。

  - 访问 ☷ <http://kun.csail.mit.edu:31415/>, 并点击选取所需格式化的 PR id。
  - 回到 PR 页面，你将看到一个名为 @taichi-gardener (机器人) 的用户推送了一个名为`[skip ci] enforce code format`的提交。
  - 如果你没能找到机器人的提交，说明没有发现任何不规范的代码格式。
  - 然后请在本地分支中运行 `git pull` 来提取格式化代码。
  - 值得留意的是，备注带有为 `[format]` 的提交信息将自动触发格式化服务。 例如：`[format] our commit message`

## PR 标题格式和标签

PR 标题将成为 `master` 分支中提交历史的一部分，因此保证 PR 标题的可读性非常重要。

- 请务必在 PR 标题前附加上**至少一个**标签，如 `[Lang]` 等：
  - 当使用多个标签时，确保标签之间只留有一个空格分隔；
  - 例如， `\[Lang\]\[refactor\]`（没有空格）应该被格式化为 `\[Lang\] \[refactor\]`；
- PR 标题主干部分的首字母应该大写：
  - 例如，`[Doc] improve documentation` 应该被格式化为 `[Doc] Improve documentation`；
  - 同时，`[Lang] "ti.sqr(x)" is now deprecated` 是可以的，因为 `"`是一个符号。
- 请不要在 PR 标题中包括反引号 (\"`\")。
- 例如，\"\[Metal\] Support bitmasked SNode\", \"\[OpenGL\] AtomicMin/Max support\", 或 \"\[Opt\] \[IR\] Enhanced constant folding\"。

常用的标签：

- `[Metal], [OpenGL], [CPU], [CUDA]`：后端；
- `[LLVM]`：CPU 和 CUDA 共享的 LLVM 后端；
- `[Lang]`：前端语法特性，包括语法糖；
- `[Std]`：标准库，例如 `ti.Matrix` 和 `ti.Vector`；
- `[Sparse]`：稀疏计算；
- `[IR]`：中间表示(intermediate representation, IR)；
- `[Opt]`：IR 优化迭代轮数；
- `[GUI]`：内嵌的 GUI 系统；
- `[Refactor]`：代码重构；
- `[CLI]`：命令行接口，例如 `ti`命令；
- `[Doc]`: documentation under `docs/`;
- `[Example]`: examples under `examples/`;
- `[Test]`: adding or improving tests under `tests/`;
- `[Linux]`: Linux platform;
- `[Mac]`: Mac OS X platform;
- `[Windows]`: Windows platform;
- `[Perf]`: performance improvements;
- `[Misc]`: something that doesn\'t belong to any category, such as version bump, reformatting;
- `[Bug]`: bug fixes;
- Check out more tags in [misc/prtags.json](https://github.com/taichi-dev/taichi/blob/master/misc/prtags.json).
- When introducing a new tag, please update the list in `misc/prtags.json` in the first PR with that tag, so that people can follow.

::: note

We do appreciate all kinds of contributions, yet we should not expose the title of every PR to end-users. Therefore the changelog will distinguish [what the user should know]{.title-ref} from [what the developers are doing]{.title-ref}. This is done by **capitalizing PR tags**:

- PRs with visible/notable features to the users should be marked with tags starting with **the first letter capitalized**, e.g. `[Metal], [OpenGL], [IR], [Lang], [CLI]`. When releasing a new version, a script (`python/taichi/make_changelog.py`) will generate a changelog with these changes (PR title) highlighted. Therefore it is **important** to make sure the end-users can understand what your PR does, **based on your PR title**.
- Other PRs (underlying development/intermediate implementation) should use tags with **everything in lowercase letters**: e.g. `[metal], [opengl], [ir], [lang], [cli]`.
- Because of the way the release changelog is generated, there should be **at most one captialized tag** in a PR title to prevent duplicate PR highlights. For example, `[GUI] [Mac] Support modifier keys` (\#1189) is a bad example, we should use `[gui] [Mac] Support modifier keys in GUI` instead. Please capitalize the tag that is most relevant to the PR.
:::

## C++ and Python standards

The C++ part of Taichi is written in C++17, and the Python part in 3.6+. You can assume that C++17 and Python 3.6 features are always available.

## Tips on the Taichi compiler development

[Life of a Taichi kernel](./compilation.md) may worth checking out. It explains the whole compilation process.

See also [Benchmarking and regression tests](./utilities.md#benchmarking-and-regression-tests) if your work involves IR optimization.

When creating a Taichi program using `ti.init(arch=desired_arch, **kwargs)`, pass in the following parameters to make the Taichi compiler print out IR:

- `print_preprocessed = True`: print results of the frontend Python AST transform. The resulting scripts will generate a Taichi Frontend AST when executed.
- `print_ir = True`: print the Taichi IR transformation process of kernel (excluding accessors) compilation.
- `print_accessor_ir = True`: print the IR transformation process of data accessors, which are special and simple kernels. (This is rarely used, unless you are debugging the compilation of data accessors.)
- `print_struct_llvm_ir = True`: save the emitted LLVM IR by Taichi struct compilers.
- `print_kernel_llvm_ir = True`: save the emitted LLVM IR by Taichi kernel compilers.
- `print_kernel_llvm_ir_optimized = True`: save the optimized LLVM IR of each kernel.
- `print_kernel_nvptx = True`: save the emitted NVPTX of each kernel (CUDA only).

::: note
Data accessors in Python-scope are implemented as special Taichi kernels. For example, `x[1, 2, 3] = 3` will call the writing accessor kernel of `x`, and `print(y[42])` will call the reading accessor kernel of `y`.
:::

## Folder structure

Key folders are:

_(the following chart can be generated by [`tree . -L 2`](https://linux.die.net/man/1/tree))_

```
.
├── benchmarks              # Performance benchmarks
├── docs                    # Documentation
├── examples                # Examples
├── external                # External libraries
├── misc                    # Random (yet useful) files
├── python                  # Python frontend implementation
│   ├── core                # Loading & interacting with Taichi core
│   ├── lang                # Python-embbed Taichi language & syntax (major)
│   ├── tools               # Handy end-user tools
│   └── misc                # Miscellaneous utilities
├── taichi                  # The core compiler implementation
│   ├── analysis            # Static analysis passes
│   ├── backends            # Device-dependent code generators/runtime environments
│   ├── codegen             # Code generation base classes
│   ├── common
│   ├── gui                 # GUI system
│   ├── inc                 # Small definition files to be included repeatedly
│   ├── ir                  # Intermediate representation
│   ├── jit                 # Just-In-Time compilation base classes
│   ├── llvm                # LLVM utilities
│   ├── math                # Math utilities
│   ├── platform            # Platform supports
│   ├── program             # Top-level constructs
│   ├── python              # C++/Python interfaces
│   ├── runtime             # LLVM runtime environments
│   ├── struct              # Struct compiler base classes
│   ├── system              # OS-related infrastructure
│   ├── transforms          # IR transform passes
│   └── util                # Miscellaneous utilities
└── tests                   # Functional tests
    ├── cpp                 # Python tests (major)
    └── python              # C++ tests
```

## Testing

Tests should be added to `tests/`.

### Command line tools

- Use `ti test` to run all the tests.
- Use `ti test -v` for verbose outputs.
- Use `ti test -C` to run tests and record code coverage, see [Code coverage](./utilities.md#coverage) for more infomations.
- Use `ti test -a <arch(s)>` for testing against specified backend(s). e.g. `ti test -a cuda,metal`.
- Use `ti test -na <arch(s)>` for testing all architectures excluding some of them. e.g. `ti test -na opengl,x64`.
- Use `ti test <filename(s)>` to run specific tests in filenames. e.g. `ti test numpy_io` will run all tests in `tests/python/test_numpy_io.py`.
- Use `ti test -c` to run only the C++ tests. e.g. `ti test -c alg_simp` will run `tests/cpp/test_alg_simp.cpp`.
- Use `ti test -k <key>` to run tests that match the specified key. e.g. `ti test linalg -k "cross or diag"` will run the `test_cross` and `test_diag` in `tests/python/test_linalg.py`.

For more options, see `ti test -h`.

For more details on how to write a test case, see [Workflow for writing a Python test](./write_test.md).

## Documentation

Documentations are put under the folder `docs/`.

- We use [reStructured text](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html) (.rst) to write documentation.
- We host our documentation online using [readthedocs.io](https://taichi.readthedocs.io/en/stable).
- Use `ti doc` to build the documentation locally.
- Open the documentation at `docs/build/index.html`.

::: note

On Linux/OS X, use `watch -n 1 ti doc` to continuously build the documentation.

If the OpenGL backend detector keeps creating new windows, execute `export TI_WITH_OPENGL=0` for `ti doc`.
:::

## Efficient code navigation across Python/C++

If you work on the language frontend (Python/C++ interface), to navigate around the code base, [ffi-navigator](https://github.com/tqchen/ffi-navigator) allows you to jump from Python bindings to their definitions in C++, please follow their README to set up your editor.

## Upgrading CUDA

Right now we are targeting CUDA 10. When upgrading CUDA version, the file `external/cuda_libdevice/slim_libdevice.10.bc` should also be replaced with a newer version.

To generate the slimmed version of libdevice based on a full `libdevice.X.bc` file from a CUDA installation, use:

```bash
ti task make_slim_libdevice [libdevice.X.bc file]
```
