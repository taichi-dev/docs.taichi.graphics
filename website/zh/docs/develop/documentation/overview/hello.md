# 你好，世界！

我们将通过一个_分形程序_的例子来介绍 Taichi。

通过 （`python3 fractal.py`或`ti example fractal`） 运行下面这段 Taichi 代码，你将得到 [朱利亚集 (Julia set)](https://en.wikipedia.org/wiki/Julia_set) 的一段动画：

<center>

![image](https://github.com/yuanming-hu/public_files/raw/master/graphics/taichi/fractal.gif)

</center>

```python
# fractal.py

import taichi as ti

ti.init(arch=ti.gpu)

n = 320
pixels = ti.field(dtype=float, shape=(n * 2, n))


@ti.func
def complex_sqr(z):
    return ti.Vector([z[0]**2 - z[1]**2, z[1] * z[0] * 2])


@ti.kernel
def paint(t: float):
    for i, j in pixels:  # 对于所有像素，并行执行
        c = ti.Vector([-0.8, ti.cos(t) * 0.2])
        z = ti.Vector([i / n - 1, j / n - 0.5]) * 2
        iterations = 0
        while z.norm() < 20 and iterations < 50:
            z = complex_sqr(z) + c
            iterations += 1
        pixels[i, j] = 1 - iterations * 0.02


gui = ti.GUI("Julia Set", res=(n * 2, n))

for i in range(1000000):
    paint(i * 0.03)
    gui.set_image(pixels)
    gui.show()
```

让我们来深入剖析一下这段简单的 Taichi 程序吧。

## import taichi as ti

Taichi 是一种嵌入在 Python 中的领域特定语言(\[Domain-Specific Language, DSL\](https://en.wikipedia.org/wiki/Domain-specific_language))。 为了使 Taichi能像 Python 包一样易于使用，基于这个目标我们做了大量的工程工作——使得每个 Python 程序员能够以最低的学习成本编写 Taichi程序。 你甚至可以选择你最喜欢的 Python 包管理系统、Python IDE 以及其他 Python 包和 Taichi 一起结合使用。

## 可移植性

Taichi 既能在 CPU，也能在 GPU 上运行。 你只需根据你的硬件平台初始化 Taichi：

```python
# 在 GPU 上运行，自动选择后端
ti.init(arch=ti.gpu)

# 在 GPU 上运行， 使用 NVIDIA CUDA 后端
ti.init(arch=ti.cuda)
# 在 GPU 上运行， 使用 OpenGL 后端
ti.init(arch=ti.opengl)
# 在 GPU 上运行， 使用苹果 Metal 后端（仅对 OS X）有效
ti.init(arch=ti.metal)

# 在 CPU 上运行 (默认)
ti.init(arch=ti.cpu)
```

::: note

不同操作系统所支持的后端：

|  **平台**  | **CPU** | **CUDA** | **OpenGL** | **Metal** | **C source** |
|:--------:|:-------:|:--------:|:----------:|:---------:|:------------:|
| Windows  |   可用    |    可用    |     可用     |    不可用    |     不可用      |
|  Linux   |   可用    |    可用    |     可用     |    不可用    |      可用      |
| Mac OS X |   可用    |   不可用    |    不可用     |    可用     |     不可用      |

（可用: 该系统上有最完整的支持；不可用: 由于平台限制，我们无法实现该后端）

在参数 `arch=ti.gpu` 下，Taichi 将首先尝试在 CUDA 上运行。 如果你的设备不支持 CUDA，那么 Taichi将会转到 Metal 或 OpenGL。 如果所在平台不支持 GPU 后端（CUDA、Metal 或 OpenGL），Taichi 将默认使用CPU后端运行。
:::

::: note

当在 Windows 平台 或者 ARM 设备（如 NVIDIA Jetson）上使用 CUDA 后端时，Taichi 会默认分配 1 GB显存用于张量存储。 如需重载显存分配，你可以在初始化的时候通过`ti.init(arch=ti.cuda, device_memory_GB=3.4)`来分配`3.4`GB显存，或者使用`ti.init(arch=ti.cuda, device_memory_fraction=0.3)`来分配所有可用显存的`30%`。

在其他平台上， Taichi 将会使用它的自适应内存分配器来动态分配内存。
:::

## 场

Taichi 是一门面向数据的程序设计语言，其中（稠密、稀疏）场是第一类公民(First-class Citizen)。 在[Scalar fields](../api/scalar_field.md#scalar-fields) 这一章节，你可以了解到更多关于场的详细信息。

在以上代码中，`pixels = ti.field(dtype=float, shape=(n * 2, n))`分配了一个叫做`pixels`的二维稠密场，大小是 `(640, 320)` ，数据类型是 ` float`。

## 函数与内核

计算发生在 Taichi 的 **内核(kernel)**和**函数(function)** 中。

我们使用`@ti.kernel`来定义Taichi 的**内核**。 内核可被从Python调用来进行计算。 内核如果有参数的话，则参数必须显式指定类型。

你应该使用关键字 `@ti.func` 来进行定义Taichi 的 **函数**。 他们可以被 Taichi 内核和其他 Taichi 函数调用。

在 [ 语法](../basic/syntax.md) 这一章节获得更多有关Taichi内核与函数的细节。

Taichi 内核与函数中所用的语法，看起来和Python的语法很像，然而 Taichi 的前端编译器会将其转换为**编译型，静态类型，有词法作用域，并行执行且可微分**的语言。

::: note

**Taichi 作用域与 Python 作用域**：

任何被 `@ti.kernel` 和 `@ti.func` 修饰的函数体都处于Taichi 作用域中，这些代码会由 Taichi 编译器编译。

而在 Taichi 作用域之外的代码就都处于 Python 作用域。 它们是单纯的Python 代码。
:::

::: warning

Taichi 内核只有在 Python 作用域中才能被调用。 Taichi 函数只有在 Taichi 作用域中才能被调用。
:::

::: note

如果用 CUDA 做类比的话，`ti.func`就像是`__device__`，而`ti.kernel`就像是`__global__`。
:::

::: warning

Taichi**不支持**嵌套的内核。

Taichi**支持**嵌套的函数。

Taichi**目前暂时不支持**递归的函数。
:::

## 并行执行的for循环

最外层作用域的 for 循环是被 **自动并行执行** 的。 Taichi 的 for 循环具有两种形式，_区间 for 循环_，和 _结构for 循环_。

**区间 for 循环**和普通的 Python for 循环没多大区别，只是 Taichi 最外层的 for 会并行执行而已。 区间 for 循环可以嵌套。

```python {3,7,14-15}
@ti.kernel
def fill():
    for i in range(10): # Parallelized
        x[i] += i

        s = 0
        for j in range(5): # 在每个并行的线程中顺序执行
            s += j

        y[i] = s

@ti.kernel
def fill_3d():
    # 在区间 3 <= i < 8, 1 <= j < 6, 0 <= k < 9 上展开并行
    for i, j, k in ti.ndrange((3, 8), (1, 6), 9):
        x[i, j, k] = i + j + k
```

::: note

是最外层 **作用域** 的循环并行执行，而不是最外层的循环。

```python {3,9}
@ti.kernel
def foo():
    for i in range(10): # 并行 :-)
        ...

@ti.kernel
def bar(k: ti.i32):
    if k > 42:
        for i in range(10): # 串行 :-(
            ...
```

:::

**结构 for 循环**在遍历（稀疏）场元素的时候很有用。 例如在上述的代码中，`for i, j in pixels`将遍历所有像素点坐标, 即`(0, 0), (0, 1), (0, 2), ... , (0, 319), (1, 0), ..., (639, 319)`。

::: note

结构 for 循环是 Taichi[稀疏计算](../advanced/sparse.md)的关键，它只会遍历稀疏场中的活跃元素。 对于稠密场而言，所有元素都是活跃元素。
:::

::: warning

结构 for 循环只能使用在内核的最外层作用域。

是最外层 **作用域** 的循环并行执行，而不是最外层的循环。

```python
@ti.kernel
def foo():
    for i in x:
        ...

@ti.kernel
def bar(k: ti.i32):
    # 最外层作用域是 `if` 语句
    if k > 42:
        for i in x: # 语法错误。 结构 for 循环 只能用于最外层作用域。
            ...
```

:::

::: warning

**并行循环不支持** `break` 语句：

```python {5,9,16}
@ti.kernel
def foo():
  for i in x:
      ...
      break # 错误！并行执行的循环不能有 break

  for i in range(10):
      ...
      break # 错误！并行执行的循环不能有 break

@ti.kernel
def foo():
  for i in x:
      for j in range(10):
          ...
          break # 可以!
```

:::

## 与其他 Python 程序交互

### Python 作用域的数据访问

所有在 Taichi 作用域（`ti.func` 和 `ti.kernel`）之外的部分都只是单纯的 Python 代码。 在 Python 作用域中，你可以通过一般的索引语法访问 Taichi 场元素。 例如，要在 Python 中访问渲染图像的某个像素，只需使用以下代码：

```python
import taichi as ti
pixels = ti.field(ti.f32, (1024, 512))

pixels[42, 11] = 0.7  # 将数据存储到像素点中
print(pixels[42, 11]) # 打印 0.7
```

### 与其他软件包共享数据

Taichi 提供了诸如`from_numpy`和`to_numpy`等辅助函数来在 Taichi 场和 NumPy 数组之间传输数据。这样你就可以将最喜欢的 Python 软件包（例如`numpy`，`pytorch`， `matplotlib`等）与 Taichi 一起使用。 例如：

```python
import taichi as ti
pixels = ti.field(ti.f32, (1024, 512))

import numpy as np
arr = np.random.rand(1024, 512)
pixels.from_numpy(arr)   # 将numpy数据载入到taichi 场中

import matplotlib.pyplot as plt
arr = pixels.to_numpy()  # 将taichi数据导出至numpy数组中
plt.imshow(arr)
plt.show()

import matplotlib.cm as cm
cmap = cm.get_cmap('magma')
gui = ti.GUI('Color map')
while gui.running:
    render_pixels()
    arr = pixels.to_numpy()
    gui.set_image(cmap(arr))
    gui.show()
```

在 [external](../basic/external.md#interacting-with-external-arrays) 这一章节获得更多有关细节。
