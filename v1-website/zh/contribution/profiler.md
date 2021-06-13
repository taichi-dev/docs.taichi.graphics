# 性能分析器

Taichi 的分析器可以帮助你分析程序的运行时开销。 在 Taichi 中有两个分析系统：`KernelProfiler` 和 `ScopedProfiler`。

`KernelProfiler` 用于分析用户内核的性能。

而 `ScopedProfiler` 被 Taichi 开发者用来分析编译器本身的性能。

## 内核性能分析器（KernelProfiler）

1.  `KernelProfiler`记录了 Taichi 内核在设备上的开销。 如要开启该分析器，请在 `ti.init` 中设置 `kernel_profiler=True`。
2.  通过调用 `ti.kernel_profiler_print()` 以显示内核分析器的结果。 例如：

```python {3,13}
import taichi as ti

ti.init(ti.cpu, kernel_profiler=True)
var = ti.field(ti.f32, shape=1)


@ti.kernel
def compute():
    var[0] = 1.0


compute()
ti.kernel_profiler_print()
```

输出将会是：

```
[ 22.73%] jit_evaluator_0_kernel_0_serial             min   0.001 ms   avg   0.001 ms   max   0.001 ms   total   0.000 s [      1x]
[  0.00%] jit_evaluator_1_kernel_1_serial             min   0.000 ms   avg   0.000 ms   max   0.000 ms   total   0.000 s [      1x]
[ 77.27%] compute_c4_0_kernel_2_serial                min   0.004 ms   avg   0.004 ms   max   0.004 ms   total   0.000 s [      1x]
```

::: note
目前，由于缺乏 `ti.sync()` 的支持，`KernelProfiler` 的结果在 OpenGL 后端上可能会不准确。
:::

## 基于作用域的性能分析器（ScopedProfiler）

1.  `ScopedProfiler` 能够有层次地度量**宿主机上**执行任务所花费的时间。
2.  这个分析器是自动开启的。 如要显示它的结果，请调用 `ti.print_profile_info()`。 例如：

```python
import taichi as ti

ti.init(arch=ti.cpu)
var = ti.field(ti.f32, shape=1)


@ti.kernel
def compute():
    var[0] = 1.0
    print("Setting var[0] =", var[0])


compute()
ti.print_profile_info()
```

`ti.print_profile_info()` 会以有层次的格式打印分析结果。

::: note
`ScopedProfiler` 是 Taichi 的一个核心 C++ 类。 它不会向 Python 用户公开。
:::
