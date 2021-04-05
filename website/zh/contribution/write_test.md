# 编写 Python 测试的工作流程

通常，我们用 Python 编写功能测试。

- 我们将 [pytest](https://github.com/pytest-dev/pytest) 作为 Python 测试的基础架构。
- Python 测试应添加到 `tests/python/test_xxx.py` 中。

例如，你刚刚添加了一个功能函数 `ti.log10`。 现在想要编写一个 **test**，以测试其是否正常运行。

## 添加一个新的测试用例

在 `tests/python` 中查看是否已经有适合你测试的文件。 如果没有，请随时为它创建一个新文件 :) 如此，为简化这个例子，按照上述示例创建一个新文件 `tests/python/test_logarithm.py`。

添加一个函数，函数名称**必须**以 `test_` 开头，以便 `pytest` 可以找到它。例如：

```python {3}
import taichi as ti

def test_log10():
    pass
```

利用我们的 `ti.log10` 添加一些简单代码，以确保其正常工作。 提示：你可以使用 0 维场，（即 `r[None]`）向 Taichi-scop 传递值或从中返回。

```python
import taichi as ti

def test_log10():
    ti.init(arch=ti.cpu)

    r = ti.field(ti.f32, ())

    @ti.kernel
    def foo():
        r[None] = ti.log10(r[None])

    r[None] = 100
    foo()
    assert r[None] == 2
```

执行 `ti test logarithm`，随后 `tests/python/test_logarithm.py` 中以 `test_` 开头的函数就会被运行。

## 针对多个后端进行测试

上面的方法还不够好，例如，`ti.init(arch=ti.cpu)`，意味着它将仅在 CPU 后端进行测试。 那么，我们是否必须编写繁多的测试文件，诸如：`test_log10_cpu`， `test_log10_cuda`，...，而它们只有第一行的代码是不同的？ 为了解决此问题，我们提供了一个有用的装饰器 `@ti.test`：

```python
import taichi as ti

# 将同时测试 CPU 和 CUDA 后端
@ti.test(ti.cpu, ti.cuda)
def test_log10():
    r = ti.field(ti.f32, ())

    @ti.kernel
    def foo():
        r[None] = ti.log10(r[None])

    r[None] = 100
    foo()
    assert r[None] == 2
```

你可以通过不指定参数来针对**所有后端**进行测试：

```python
import taichi as ti

# 将针对你的运行环境中可用的所有后端进行测试
@ti.test()
def test_log10():
    r = ti.field(ti.f32, ())

    @ti.kernel
    def foo():
        r[None] = ti.log10(r[None])

    r[None] = 100
    foo()
    assert r[None] == 2
```

这已经有所 改进， 但是还不够完美。

## 使用 `ti.approx` 与公差进行比较

有时，在某些后端（例如 OpenGL）上，数学精准度可能很差。在这种情况下，`ti.log10(100)` 可能会返回 `2.001` 或 `1.999`。

为了解决此问题，我们提供了 `ti.approx`，它可以在不同的后端上容忍此类错误，例如，`2.001 == ti.approx(2)` 将在 OpenGL 后端上返回`True`。

```python
import taichi as ti

# 将针对你的运行环境中可用的所有后端进行测试
@ti.test()
def test_log10():
    r = ti.field(ti.f32, ())

    @ti.kernel
    def foo():
        r[None] = ti.log10(r[None])

    r[None] = 100
    foo()
    assert r[None] == ti.approx(2)
```

::: warning
直接使用 `pytest.approx` 在这里表现不是很好，因为它的公差在不同的 Taichi 后端之间不会有所不同。 而它在 OpenGL 后端上可能会失败。

`ti.approx` 也会对布尔类型进行处理，例如：`2 == ti.approx(True)`。
:::

这已经极大地提高了测试的稳定性！ 但是测试到此还不够完美。

## 参数化测试输入

例如，`r[None] = 100`，意味着它将仅仅测试 `ti.log10(100)` 的情况， 那如果我们需要测试 `ti.log10(10)` 怎么办？ 如果还需要测试 `ti.log10(1)` 呢？

我们可以使用 `@pytest.mark.parametrize` 装饰器针对不同的输入值进行测试：

```python {5}
import taichi as ti
import pytest
import math

@pytest.mark.parametrize('x', [1, 10, 100])
@ti.test()
def test_log10(x):
    r = ti.field(ti.f32, ())

    @ti.kernel
    def foo():
        r[None] = ti.log10(r[None])

    r[None] = x
    foo()
    assert r[None] == math.log10(x)
```

将逗号分隔的表用于多个输入值：

```python
import taichi as ti
import pytest
import math

@pytest.mark.parametrize('x,y', [(1, 2), (1, 3), (2, 1)])
@ti.test()
def test_atan2(x, y):
    r = ti.field(ti.f32, ())
    s = ti.field(ti.f32, ())

    @ti.kernel
    def foo():
        r[None] = ti.atan2(r[None])

    r[None] = x
    s[None] = y
    foo()
    assert r[None] == math.atan2(x, y)
```

使用两个独立的`参数`来测试输入参数的**所有组合**：

```python {5-6}
import taichi as ti
import pytest
import math

@pytest.mark.parametrize('x', [1, 2])
@pytest.mark.parametrize('y', [1, 2])
# 等同于：  .parametrize('x,y', [(1, 1), (1, 2), (2, 1), (2, 2)])
@ti.test()
def test_atan2(x, y):
    r = ti.field(ti.f32, ())
    s = ti.field(ti.f32, ())

    @ti.kernel
    def foo():
        r[None] = ti.atan2(r[None])

    r[None] = x
    s[None] = y
    foo()
    assert r[None] == math.atan2(x, y)
```

## 指定 `ti.init` 配置

你可以在 `ti.test()` 中为 `ti.init()` 指定关键字参数，例如：

```python {1}
@ti.test(ti.cpu, debug=True, log_level=ti.TRACE)
def test_debugging_utils():
    # ... （某些测试必须在调试模式下完成）
```

等同于：

```python {2}
def test_debugging_utils():
    ti.init(arch=ti.cpu, debug=True, log_level=ti.TRACE)
    # ... （某些测试必须在调试模式下完成）
```

## 在测试时排除一些后端

有时，一些后端无法执行特定的测试，我们必须将它们从测试中排除：

```python
# 在除 OpenGL 之外的所有后端上运行此测试
@ti.test(excludes=[ti.opengl])
def test_sparse_field():
    # ... （某些测试需要稀疏特征，而这是 OpenGL 所不支持的）
```

你也可以使用 `extensions` 关键字来排除没有特定功能的后端：

```python
# 在除 OpenGL 之外的所有后端上运行此测试
@ti.test(extensions=[ti.extension.sparse])
def test_sparse_field():
    # ...（某些测试需要稀疏特征，而这是 OpenGL 所不支持的)
```
