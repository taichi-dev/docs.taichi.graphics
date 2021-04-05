# 开发者工具

本节详细描述了 Taichi 开发者常用的工具。

## 日志

Taichi 使用 [spdlog](https://github.com/gabime/spdlog) 作为其日志系统。 日志可以有从低到高的不同级别，它们是：

| 级别    |
| ----- |
| trace |
| debug |
| info  |
| warn  |
| error |

级别越高，则日志信息就越重要。

默认日志级别是 `info`。 你可以通过下面的方式覆盖默认的日志级别：

1.  设置环境变量，例如 `export TI_LOG_LEVEL=warn`。
2.  在 Python 内设置日志级别： `ti.set_logging_level(ti.WARN)`。

在 **Python**中，你可以使用 `ti.*` 接口来写日志：

```python
# Python
ti.trace("Hello world!")
ti.debug("Hello world!")
ti.info("Hello world!")
ti.warn("Hello world!")
ti.error("Hello world!")
```

在 **C++** 中，你可以使用 `TI_*` 接口写入日志：

```cpp
// C++
TI_TRACE("Hello world!");
TI_DEBUG("Hello world!");
TI_INFO("Hello world!");
TI_WARN("Hello world!");
TI_ERROR("Hello world!");
```

如果一个级别为 `error` 的信息被抛出，Taichi将会被立刻**终止**并在 Python 中报出 `RuntimeError` 错误。

```cpp
// C++
int func(void *p) {
  if (p == nullptr)
    TI_ERROR("The pointer cannot be null!");

  // 如果 p == nullptr，则代码不会执行到此处
  do_something(p);
}
```

::: note
对熟悉 Linux 内核的开发者来说， `TI_ERROR` 其实相当于 `panic`。
:::

你可以通过使用 `TI_ASSERT` 来简化上述代码：

```cpp
int func(void *p) {
  TI_ASSERT_INFO(p != nullptr, "The pointer cannot be null!");
  // 或
  // TI_ASSERT(p != nullptr);

  // 如果 p == nullptr，则代码不会执行到此处
  do_something(p);
}
```

## 基准测试和回归测试

- 使用 `ti benchmark` 以基准模式运行测试。 这将记录 `ti test` 的性能，并将其保存到 `benchmarks/output` 目录下。
- 运行 `ti regression` 以显示与 `benchmarks/baseline` 中先前结果的差异。 你还可以查看提交后的性能是提高还是降低了。 当你的工作与中间表示码优化相关时，这很有帮助。
- 运行 `ti baseline` 以将基准结果保存到 `benchmarks/baseline` 目录以供将来比较，这可以在与性能有关的 PR 上执行，然后再合并到 master 分支中。

例如，这是启用常数折叠优化传递后 `ti regression` 输出的一部分：

```
linalg__________________polar_decomp______________________________
codegen_offloaded_tasks                       37 ->    39    +5.4%
codegen_statements                          3179 ->  3162    -0.5%
codegen_kernel_statements                   2819 ->  2788    -1.1%
codegen_evaluator_statements                   0 ->    14    +inf%

linalg__________________init_matrix_from_vectors__________________
codegen_offloaded_tasks                       37 ->    39    +5.4%
codegen_statements                          3180 ->  3163    -0.5%
codegen_kernel_statements                   2820 ->  2789    -1.1%
codegen_evaluator_statements                   0 ->    14    +inf%
```

::: note
目前，`ti benchmark` 仅支持基准测试语句数，不包含时间基准测试。这是因为后者取决于硬件性能，因此如果基准来自另一台计算机则很难进行客观的比较。 我们将在某个时间点购买固定性能的机器作为时间基准服务器。 关于这个问题的详细讨论请参阅：[Github Issue #948](https://github.com/taichi-dev/taichi/issues/948)
:::

我们推荐的 Pull Request 的作者运行回归测试的工作流程是：

- 在 `master` 分支中运行 `ti baseline && ti baseline ` 将当前 性能的结果保存为基线。
- 运行 `git checkout -b your-branch-name`（分支名称）。
- 尝试解决问题（第一阶段）。
- 运行 `ti baseline && ti retression` 以获取结果。
- （结果不理想）继续优化直至结果理想。
- （结果理想）在合并之前，运行 `ti baseline` 以将第一阶段结果保存为新基线。
- 继续进行第二，第三阶段，并遵循同样的工作流程。

## 程序崩溃时触发 `gdb`（仅限于 Linux 操作系统）

```python
# Python
ti.set_gdb_trigger(True)
```

```cpp
// C++
CoreState::set_trigger_gdb_when_crash(true);
```

```bash
# Shell
export TI_GDB_TRIGGER=1
```

::: note
使用 `gdb` 来**快速定位段错误 (segmentation fault) 和断言错误 (assertion failure)**：在Taichi 崩溃时，`gdb` 会被触发并附着到当前的线程上。 您可能需要输入和 `sudo` 超级用户权限相关的密码来允许 gdb 附着到当前的线程上。 在输入 `gdb` 之后，你可以使用 `bt` （`backtrace`）指令检查堆的回溯，从而定位产生错误的代码的具体行数。
:::

## 代码测试覆盖率

为了确保我们的测试用例涵盖所有情况，我们需要**覆盖率**报告。 也即，检测代码行在测试中执行了多少百分比。

- 一般来说，覆盖率越高，我们的测试就越强健。
- 当创建 PR 时，我们想要**确保它与相应的测试用例**一起完成。 否则代码测试覆盖率将降低。
- 你可以在 [Codecov](https://codecov.io/gh/taichi-dev/taichi) 上查看当前代码覆盖状态。
- 目前，Taichi 代码测试覆盖率报告仅用于 Python 代码，暂时不涵盖 C++ 。

```bash
ti test -C       # 执行测试并将结果保存至 .coverage
coverage report  # 生成一份覆盖报告并在终端输出
coverage html    # 生成一份覆盖报告并输出至 htmlcov/index.html
```

## 接口系统（遗留）

打印所有接口和单位

```python
ti.core.print_all_units()
```

## 序列化（遗留）

Taichi 的序列化模块可以允许你将对象序列化/反序列化成二进制字符串。

你可以使用 `TI_IO` 宏来显式定义 Taichi 中必要的字段。

```cpp
// TI_IO_DEF
struct Particle {
    Vector3f position, velocity;
    real mass;
    string name;

    TI_IO_DEF(position, velocity, mass, name);
}

// TI_IO_DECL
struct Particle {
    Vector3f position, velocity;
    real mass;
    bool has_name
    string name;

    TI_IO_DECL() {
        TI_IO(position);
        TI_IO(velocity);
        TI_IO(mass);
        TI_IO(has_name);
        // More flexibility:
        if (has_name) {
            TI_IO(name);
        }
    }
}

// TI_IO_DEF_VIRT();
```

## 进展通知（遗留）

当任务完成或崩溃时，Taichi 消息传递程序可以将邮件发送到 `$TI_MONITOR_EMAIL` 。 通过下面的方式来启用：

```python
from taichi.tools import messenger
messenger.enable(task_id='test')
```
