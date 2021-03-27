# 开发与贡献指南

首先，感谢你的参与和贡献！ First of all, thank you for contributing! We welcome contributions of all forms, including but not limited to

- 修复 Bug
- 提出和实现新功能
- Documentation improvement and translations (e.g. [Simplified Chinese](https://github.com/taichi-dev/taichi-docs-zh-cn))
- 完善错误时的提示，使之对用户更友好
- 提交新的测试用例
- 提交新的样例程序
- 提交编译器性能补丁
- 发布有关 Taichi 的博客文章和教程
- 加入我们的 [Taichi 论坛](https://forum.taichi.graphics/)
- Introduce Taichi to your friends or simply star [the project](https://github.com/taichi-dev/taichi).
- Typo fixes in the documentation, code or comments (please directly make a pull request for minor issues like these)

## 如何参与 Bug 修复，添加新特性

Issues marked with [\"good first issue\"](https://github.com/taichi-dev/taichi/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) are great chances for starters.

- Please first leave a note (e.g. _I know how to fix this and would like to help!_) on the issue, so that people know someone is already working on it. This helps prevent redundant work; 这样有助于避免重复劳动；
- If no core developer has commented and described a potential solution on the issue, please briefly describe your plan, and wait for a core developer to reply before you start. This helps keep implementations simple and effective. 这可以保障实现的简洁高效。

Issues marked with [\"welcome contribution\"](https://github.com/taichi-dev/taichi/issues?q=is%3Aopen+is%3Aissue+label%3A%22welcome+contribution%22) are slightly more challenging but still friendly to beginners.

## 进阶指导

- 切实解决问题是我们的最终目标。
- No overkills: always use _easy_ solutions to solve easy problems, so that you have time and energy for real hard ones.
- Almost every design decision has pros and cons. A decision is [good]{.title-ref} if its pros outweigh its cons. Always think about both sides. 如果利大于弊，那就可以看作是一个 好的_决定_ ，请务必权衡利弊。 请务必权衡利弊。
- 调试是很困难的。 Debugging is hard. Changesets should be small so that sources of bugs can be easily pinpointed.
- 单元/集成测试是我们的好伙伴。

::: note
"There are two ways of constructing a software design: One way is to make it so simple that there are obviously no deficiencies, and the other way is to make it so complicated that there are no obvious deficiencies. _The first method is far more difficult_." — [C.A.R. Hoare](https://en.wikipedia.org/wiki/Tony_Hoare) ::: _而第一种方案则要困难的多_。" [C.A.R. 霍尔](https://en.wikipedia.org/wiki/Tony_Hoare)
:::

需要记住的一点是，Taichi 最初是作为一个学术研究项目而诞生的。 这通常意味着有些部分没有机会经过稳固坚实的设计。 虽然我们一直在努力提高代码质量，但这并不意味着项目能没有技术负债。 有些地方仍可能会过于复杂而让人感到困惑。 一旦你发现这种情形的存在，非常欢迎给我们提出 PR！ :-)

## 高效率地沟通

- How much information we effectively convey, is way more important than how many words we typed.
- 在沟通中保持积极， 礼貌， 注意语言的组织性、 准确性。
- 注意除了文字之外，列表（Bulleted lists）也是我们表达过程中的好伙伴。
- Proofread before you post: if you are the reader, can you understand what you typed?
- If you are not a native speaker, consider using a spell checker such as [Grammarly](https://app.grammarly.com/).

Please base your discussion and feedback on facts, and not personal feelings. It is very important for all of us to maintain a friendly and blame-free community. Some examples: 对我们所有人来说，保持一个友好、零责备的社区环境是非常重要的。 一些例子如下：

::: tip
Acceptable :-) This design could be confusing to new Taichi users. :::
:::

::: danger
Not Acceptable This design is terrible. :::
:::

## 提交良好的 PR

- 我们鼓励改动**很小**的 PR。 PRs with **small** changesets are preferred. A PR should ideally address **only one issue**.
  - It is fine to include off-topic **trivial** refactoring such as typo fixes;
  - The reviewers reserve the right to ask PR authors to remove off-topic **non-trivial** changes.
- All commits in a PR will always be **squashed and merged into master as a single commit**.
- 为保留清晰的提交日志 PR 作者 **不应该将多条 commit 压缩(squash) 后提交**；
- When implementing a complex feature, consider breaking it down into small PRs, to keep a more detailed development history and to interact with core developers more frequently.
- 如果你想更及时的得到核心开发成员的反馈
  - Open a PR in [Draft](https://github.blog/2019-02-14-introducing-draft-pull-requests/) state on GitHub so that you can share your progress;
  - Make sure you @ the corresponding developer in the comments or request the review.
- 如果你同时在处理多个 PR
  - Independent PRs should be based on **different** branches forking from `master`;
  - PRs with dependencies should be raised only after all prerequisite PRs are merged into `master`.
- 所有 PR 理想情况下都应该伴随着相应的 **测试**；
- All PRs should come with **documentation update**, except for internal compiler implementations;
- All PRs must pass **continuous integration tests** before they get merged;
- PR 的标题应当按照 `prtag` 的要求编写；
- A great article from Google on [how to have your PR merged quickly](https://testing.googleblog.com/2017/06/code-health-too-many-comments-on-your.html). [\[PDF\]](https://github.com/yuanming-hu/public_files/blob/master/graphics/taichi/google_review_comments.pdf) [[PDF]](https://github.com/yuanming-hu/public_files/blob/master/graphics/taichi/google_review_comments.pdf)

## 审核与 PR 的合并

- 请按照以下几个来自谷歌的建议
  - [Code Health: Understanding Code In Review](https://testing.googleblog.com/2018/05/code-health-understanding-code-in-review.html); [\[PDF\]](https://github.com/yuanming-hu/public_files/blob/master/graphics/taichi/google_understanding_code.pdf)
  - [Code Health: Respectful Reviews == Useful Reviews](https://testing.googleblog.com/2019/11/code-health-respectful-reviews-useful.html). [\[PDF\]](https://github.com/yuanming-hu/public_files/blob/master/graphics/taichi/google_respectful_reviews.pdf) [\[PDF\]](https://github.com/yuanming-hu/public_files/blob/master/graphics/taichi/google_respectful_reviews.pdf)
- The merger should always **squash and merge** PRs into the master branch;
- 主分支要求记录 **线性历史**；
- Make sure the PR passes **continuous integration tests**, except for cases like documentation updates;
- 确保标题遵循 `prtag` 的要求。

## 持续集成的运用

- Continuous Integration (CI), will **build** and **test** your commits in a PR against in environments.
- Currently, Taichi uses [Travis CI](https://travis-ci.org) (for OS X and Linux) and [AppVeyor](https://www.appveyor.com) (for Windows).
- 每次你推送提交到一个开着的 PR 时，CI 将被触发。
- You can prepend `[skip ci]` to your commit message to avoid triggering CI. e.g. `[skip ci] This commit will not trigger CI`
- A tick on the right of commit hash means CI passed, a cross means CI failed.

## 规范代码结构

- 在本地，可以通过在命令行中运行 `ti format` 来自动格式化代码。 Locally, you can run `ti format` in the command line to re-format code style. Note that you have to install `clang-format-6.0` and `yapf v0.29.0` locally before you use `ti format`.

- If you don't have to install these formatting tools locally, use the **format server**. It\'s an online version of `ti format`. 这是个 `ti format` 的在线版本。

  - Go to ☷ <http://kun.csail.mit.edu:31415/>, and click at the desired PR id.
  - Come back to the PR page, you'll see a user called \@taichi-gardener (bot) pushed a commit named `[skip ci] enforce code format`.
  - You won't see the bot's commit if it didn't find anything not matching the format.
  - Then please run `git pull` in your local branch to pull the formatted code.
  - Note that commit messages marked with `[format]` will automatically trigger the format server. e.g. `[format] your commit message` 例如：`[format] our commit message`

## PR 标题格式和标签

PR titles will be part of the commit history reflected in the `master` branch, therefore it is important to keep PR titles readable.

- Please always prepend **at least one tag** such as `[Lang]` to PR titles:
  - When using multiple tags, make sure there is exactly one space between tags;
  - E.g., \"\[Lang\]\[refactor\]\" (no space) should be replaced by \"\[Lang\] \[refactor\]\";
- PR 标题主干部分的首字母应该大写：
  - E.g., `[Doc] improve documentation` should be replaced by `[Doc] Improve documentation`;
  - `[Lang] "ti.sqr(x)" is now deprecated` is fine because `"` is a symbol.
- 请不要在 PR 标题中包括反引号 (\"`\")。
- For example, \"\[Metal\] Support bitmasked SNode\", \"\[OpenGL\] AtomicMin/Max support\", or \"\[Opt\] \[IR\] Enhanced constant folding\".

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
- `[Doc]`：与`docs/`目录下的文档相关；
- `[Example]`：与 `examples/` 目录下的样例程序相关；
- `[Test]`：与 `tests/` 目录下增加和改进测试程序相关；
- `[Linux]`：与 Linux 平台相关；
- `[Mac]`：与 Mac OS X 平台相关；
- `[Windows]`：与 Windows 平台相关；
- `[Perf]`：性能改进；
- `[Misc]`: something that doesn\'t belong to any category, such as version bump, reformatting;
- `[Bug]`：Bug修复；
- Check out more tags in [misc/prtags.json](https://github.com/taichi-dev/taichi/blob/master/misc/prtags.json).
- When introducing a new tag, please update the list in `misc/prtags.json` in the first PR with that tag, so that people can follow.

::: note

我们感谢所有的贡献，但是我们不应该把每一个 PR 的标题暴露给终端用户。 We do appreciate all kinds of contributions, yet we should not expose the title of every PR to end-users. Therefore the changelog will distinguish [what the user should know]{.title-ref} from [what the developers are doing]{.title-ref}. This is done by **capitalizing PR tags**: 而这是通过**大写 PR 标签**实现的：

- PRs with visible/notable features to the users should be marked with tags starting with **the first letter capitalized**, e.g. `[Metal], [OpenGL], [IR], [Lang], [CLI]`. When releasing a new version, a script (`python/taichi/make_changelog.py`) will generate a changelog with these changes (PR title) highlighted. Therefore it is **important** to make sure the end-users can understand what your PR does, **based on your PR title**. When releasing a new version, a script (`python/taichi/make_changelog.py`) will generate a changelog with these changes (PR title) highlighted. Therefore it is **important** to make sure the end-users can understand what your PR does, **based on your PR title**.
- Other PRs (underlying development/intermediate implementation) should use tags with **everything in lowercase letters**: e.g. `[metal], [opengl], [ir], [lang], [cli]`.
- Because of the way the release changelog is generated, there should be **at most one captialized tag** in a PR title to prevent duplicate PR highlights. For example, `[GUI] [Mac] Support modifier keys` (\#1189) is a bad example, we should use `[gui] [Mac] Support modifier keys in GUI` instead. Please capitalize the tag that is most relevant to the PR. ::: For example, `[GUI] [Mac] Support modifier keys` (\#1189) is a bad example, we should use `[gui] [Mac] Support modifier keys in GUI` instead. Please capitalize the tag that is most relevant to the PR.
:::

## C++ and Python standards

The C++ part of Taichi is written in C++17, and the Python part in 3.6+. You can assume that C++17 and Python 3.6 features are always available. You can assume that C++17 and Python 3.6 features are always available.

## Tips on the Taichi compiler development

[Life of a Taichi kernel](./compilation.md) may worth checking out. It explains the whole compilation process. It explains the whole compilation process.

See also [Benchmarking and regression tests](./utilities.md#benchmarking-and-regression-tests) if your work involves IR optimization.

When creating a Taichi program using `ti.init(arch=desired_arch, **kwargs)`, pass in the following parameters to make the Taichi compiler print out IR:

- `print_preprocessed = True`: print results of the frontend Python AST transform. The resulting scripts will generate a Taichi Frontend AST when executed. The resulting scripts will generate a Taichi Frontend AST when executed.
- `print_ir = True`: print the Taichi IR transformation process of kernel (excluding accessors) compilation.
- `print_accessor_ir = True`: print the IR transformation process of data accessors, which are special and simple kernels. (This is rarely used, unless you are debugging the compilation of data accessors.) (This is rarely used, unless you are debugging the compilation of data accessors.)
- `print_struct_llvm_ir = True`: save the emitted LLVM IR by Taichi struct compilers.
- `print_kernel_llvm_ir = True`: save the emitted LLVM IR by Taichi kernel compilers.
- `print_kernel_llvm_ir_optimized = True`: save the optimized LLVM IR of each kernel.
- `print_kernel_nvptx = True`: save the emitted NVPTX of each kernel (CUDA only).

::: note
Data accessors in Python-scope are implemented as special Taichi kernels. For example, `x[1, 2, 3] = 3` will call the writing accessor kernel of `x`, and `print(y[42])` will call the reading accessor kernel of `y`. ::: For example, `x[1, 2, 3] = 3` will call the writing accessor kernel of `x`, and `print(y[42])` will call the reading accessor kernel of `y`.
:::

## Folder structure

Key folders are:

_(the following chart can be generated by [`tree . -L 2`](https://linux.die.net/man/1/tree)) -L 2</code></a>)_

```
.
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
- Use `ti test -a <arch(s)>` for testing against specified backend(s). e.g. `ti test -a cuda,metal`. e.g. `ti test -a cuda,metal`.
- Use `ti test -na <arch(s)>` for testing all architectures excluding some of them. e.g. `ti test -na opengl,x64`. e.g. `ti test -na opengl,x64`.
- Use `ti test <filename(s)>` to run specific tests in filenames. Use `ti test <filename(s)>` to run specific tests in filenames. e.g. `ti test numpy_io` will run all tests in `tests/python/test_numpy_io.py`.
- Use `ti test -c` to run only the C++ tests. Use `ti test -c` to run only the C++ tests. e.g. `ti test -c alg_simp` will run `tests/cpp/test_alg_simp.cpp`.
- Use `ti test -k <key>` to run tests that match the specified key. Use `ti test -k <key>` to run tests that match the specified key. e.g. `ti test linalg -k "cross or diag"` will run the `test_cross` and `test_diag` in `tests/python/test_linalg.py`.

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

If the OpenGL backend detector keeps creating new windows, execute `export TI_WITH_OPENGL=0` for `ti doc`. :::
:::

## Efficient code navigation across Python/C++

If you work on the language frontend (Python/C++ interface), to navigate around the code base, [ffi-navigator](https://github.com/tqchen/ffi-navigator) allows you to jump from Python bindings to their definitions in C++, please follow their README to set up your editor.

## Upgrading CUDA

Right now we are targeting CUDA 10. Right now we are targeting CUDA 10. When upgrading CUDA version, the file `external/cuda_libdevice/slim_libdevice.10.bc` should also be replaced with a newer version.

To generate the slimmed version of libdevice based on a full `libdevice.X.bc` file from a CUDA installation, use:

```bash
ti task make_slim_libdevice [libdevice.X.bc file]
```
