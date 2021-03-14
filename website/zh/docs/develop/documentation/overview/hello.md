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

Taichi **kernels** are defined with the decorator `@ti.kernel`. They can be called from Python to perform computation. Kernel arguments must be type-hinted (if any).

Taichi **functions** are defined with the decorator `@ti.func`. They can be called by Taichi kernels or other Taichi functions.

See [syntax](../basic/syntax.md) for more details about Taichi kernels and functions.

The language used in Taichi kernels and functions looks exactly like Python, yet the Taichi frontend compiler converts it into a language that is **compiled, statically-typed, lexically-scoped, parallel and differentiable**.

::: note

**Taichi-scopes v.s. Python-scopes**:

Everything decorated with `@ti.kernel` and `@ti.func` is in Taichi-scope and hence will be compiled by the Taichi compiler.

Everything else is in Python-scope. They are simply Python native code.
:::

::: warning

Taichi kernels must be called from the Python-scope. Taichi functions must be called from the Taichi-scope.
:::

::: note

For those who come from the world of CUDA, `ti.func` corresponds to `__device__` while `ti.kernel` corresponds to `__global__`.
:::

::: warning

Nested kernels are **not supported**.

Nested functions are **supported**.

Recursive functions are **not supported for now**.
:::

## Parallel for-loops

For loops at the outermost scope in a Taichi kernel is **automatically parallelized**. For loops can have two forms, i.e. _range-for loops_ and _struct-for loops_.

**Range-for loops** are no different from Python for loops, except that it will be parallelized when used at the outermost scope. Range-for loops can be nested.

```python {3,7,14-15}
@ti.kernel
def fill():
    for i in range(10): # Parallelized
        x[i] += i

        s = 0
        for j in range(5): # Serialized in each parallel thread
            s += j

        y[i] = s

@ti.kernel
def fill_3d():
    # Parallelized for all 3 <= i < 8, 1 <= j < 6, 0 <= k < 9
    for i, j, k in ti.ndrange((3, 8), (1, 6), 9):
        x[i, j, k] = i + j + k
```

::: note

It is the loop **at the outermost scope** that gets parallelized, not the outermost loop.

```python {3,9}
@ti.kernel
def foo():
    for i in range(10): # Parallelized :-)
        ...

@ti.kernel
def bar(k: ti.i32):
    if k > 42:
        for i in range(10): # Serial :-(
            ...
```

:::

**Struct-for loops** are particularly useful when iterating over (sparse) field elements. In the code above, `for i, j in pixels` loops over all the pixel coordinates, i.e. `(0, 0), (0, 1), (0, 2), ... , (0, 319), (1, 0), ..., (639, 319)`.

::: note

Struct-for is the key to [sparse computation](../advanced/sparse.md) in Taichi, as it will only loop over active elements in a sparse field. In dense fields, all elements are active.
:::

::: warning

Struct-for loops must live at the outer-most scope of kernels.

It is the loop **at the outermost scope** that gets parallelized, not the outermost loop.

```python
@ti.kernel
def foo():
    for i in x:
        ...

@ti.kernel
def bar(k: ti.i32):
    # The outermost scope is a `if` statement
    if k > 42:
        for i in x: # Not allowed. Struct-fors must live in the outermost scope.
            ...
```

:::

::: warning

`break` **is not supported in parallel loops**:

```python {5,9,16}
@ti.kernel
def foo():
  for i in x:
      ...
      break # Error!

  for i in range(10):
      ...
      break # Error!

@ti.kernel
def foo():
  for i in x:
      for j in range(10):
          ...
          break # OK!
```

:::

## Interacting with other Python packages

### Python-scope data access

Everything outside Taichi-scopes (`ti.func` and `ti.kernel`) is simply Python code. In Python-scopes, you can access Taichi field elements using plain indexing syntax. For example, to access a single pixel of the rendered image in Python-scope, simply use:

```python
import taichi as ti
pixels = ti.field(ti.f32, (1024, 512))

pixels[42, 11] = 0.7  # store data into pixels
print(pixels[42, 11]) # prints 0.7
```

### Sharing data with other packages

Taichi provides helper functions such as `from_numpy` and `to_numpy` for transfer data between Taichi fields and NumPy arrays, So that you can also use your favorite Python packages (e.g. `numpy`, `pytorch`, `matplotlib`) together with Taichi. e.g.:

```python
import taichi as ti
pixels = ti.field(ti.f32, (1024, 512))

import numpy as np
arr = np.random.rand(1024, 512)
pixels.from_numpy(arr)   # load numpy data into taichi fields

import matplotlib.pyplot as plt
arr = pixels.to_numpy()  # store taichi data into numpy arrays
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

See [external](../basic/external.md#interacting-with-external-arrays) for more details.
