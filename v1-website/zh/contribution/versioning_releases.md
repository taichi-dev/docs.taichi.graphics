# 版本管理与发布

## 1.0 之前的版本

Taichi 遵循 [Semantic Versioning 2.0.0](https://semver.org/) 的标准。

目前 Taichi 还处在 1.0.0 版本以下的迭代，我们使用次版本变更（例如，`0.6.17->0.7.0`）来表示 API 的改版，使用补丁版本变更（例如，`0.6.9->0.6.10`）来代表向后兼容的变化。

## 工作流：发布新版本

- 在 [Jenkins](http://f11.csail.mit.edu:8080/job/taichi/) 上触发 Linux 下的构建，以查看 CUDA 是否通过了所有测试。 请注意，我们仅用 Jenkins 进行 CUDA 构建测试。 （整个过程可能需要半个小时。）

- 请克隆 `master` 分支的最新一次提交，并为提出 PR 新建一个协助分支。

  - 更新 `CMakeLists.txt` 开头的 Taichi 版本号。 例如，将 `SET(TI_VERSION_PATCH 9)` 改为 `SET(TI_VERSION_PATCH 10)` 以进行补丁发布。
  - 提交说明的格式应该为 "[release] vX.Y.Z"，例如 "[release] v0.6.10"。
  - 你应该可以在这次提交中看到有两处更改：一处在 `CMakeLists.txt`，另一处在 `docs/version`。
  - 执行 `ti changelog` 并保存其输出。 你将会在稍后用到它。

- 从你刚刚创建的分支发起一个 PR ，PR 的标题应该为 "[release] vX.Y.Z"。

  - 使用你在上一步保存的 `ti changelog` 输出，用它作为 PR 的描述内容。
  - 等待所有检查和构建工具完成。 (这一步可能需要花费两个小时)。

- 使用 "Squash and merge" 压缩合并 PR。

- 再次触发 Jenkins 上的 Linux 构建，以便将 Linux 包上传到 PyPI。

- 等待所有构建工具完成工作。 这一步将会为 OS X 和 Windows 上传 PyPI 包。 你可能需要等待两个小时。

- 更新 `stable` 分支，使该分支的头(head) 指向你在 `master` 上刚发布的提交。

- 起草新版本[(在这里进入)](https://github.com/taichi-dev/taichi/releases)：

  - 标题格式应该为 "vX.Y.Z"。
  - 标签格式应该为 "vX.Y.Z"。
  - 目标(Target) 应该为 “recent commit” -> release commit。
  - 发布描述应该从提交时的 PR 描述中复制粘贴过来。
  - 点击 "Publish release" 按钮。

## 发布周期

目前 Taichi 每周会发布两次新版本:

- 第一次发布日期在周三。
- 第二次发布日期在周六。

另外，如果有任何 Bug 需要被紧急修复，可能会额外发布补丁。
