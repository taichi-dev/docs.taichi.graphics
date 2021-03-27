# 你好，世界！

We introduce the Taichi programming language through a very basic _fractal_ example.

Running the Taichi code below (`python3 fractal.py` or `ti example fractal`) will give you an animation of [Julia set](https://en.wikipedia.org/wiki/Julia_set):

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

Taichi is a domain-specific language (DSL) embedded in Python. To make Taichi as easy to use as a Python package, we have done heavy engineering with this goal in mind - letting every Python programmer write Taichi programs with minimal learning effort. You can even use your favorite Python package management system, Python IDEs and other Python packages in conjunction with Taichi. 为了使 Taichi能像 Python 包一样易于使用，基于这个目标我们做了大量的工程工作——使得每个 Python 程序员能够以最低的学习成本编写 Taichi程序。 你甚至可以选择你最喜欢的 Python 包管理系统、Python IDE 以及其他 Python 包和 Taichi 一起结合使用。

## 可移植性

Taichi programs run on either CPUs or GPUs. Initialize Taichi according to your hardware platform as follows: 你只需根据你的硬件平台初始化 Taichi：

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

在参数 `arch=ti.gpu` 下，Taichi 将首先尝试在 CUDA 上运行。 With `arch=ti.gpu`, Taichi will first try to run with CUDA. If CUDA is not supported on your machine, Taichi will fall back on Metal or OpenGL. If no GPU backend (CUDA, Metal, or OpenGL) is supported, Taichi will fall back on CPUs. ::: 如果所在平台不支持 GPU 后端（CUDA、Metal 或 OpenGL），Taichi 将默认使用CPU后端运行。
:::

::: note

当在 Windows 平台 或者 ARM 设备（如 NVIDIA Jetson）上使用 CUDA 后端时，Taichi 会默认分配 1 GB显存用于张量存储。 When used with the CUDA backend on Windows or ARM devices (e.g. NVIDIA Jetson), Taichi by default allocates 1 GB GPU memory for field storage. You can override this behavior by initializing with `ti.init(arch=ti.cuda, device_memory_GB=3.4)` to allocate `3.4` GB GPU memory, or `ti.init(arch=ti.cuda, device_memory_fraction=0.3)` to allocate `30%` of the total GPU memory.

On other platforms, Taichi will make use of its on-demand memory allocator to adaptively allocate memory. :::
:::

## 场

Taichi is a data-oriented programming language where dense or spatially-sparse fields are the first-class citizens. See [Scalar fields](../api/scalar_field.md#scalar-fields) for more details on fields. 在[Scalar fields](../api/scalar_field.md#scalar-fields) 这一章节，你可以了解到更多关于场的详细信息。

In the code above, `pixels = ti.field(dtype=float, shape=(n * 2, n))` allocates a 2D dense field named `pixels` of size `(640, 320)` and element data type `float`.

## 函数与内核

计算发生在 Taichi 的 **内核(kernel)**和**函数(function)** 中。

Taichi **kernels** are defined with the decorator `@ti.kernel`. They can be called from Python to perform computation. Kernel arguments must be type-hinted (if any). 内核可被从Python调用来进行计算。 内核如果有参数的话，则参数必须显式指定类型。

Taichi **functions** are defined with the decorator `@ti.func`. They can be called by Taichi kernels or other Taichi functions. 他们可以被 Taichi 内核和其他 Taichi 函数调用。

See [syntax](../basic/syntax.md) for more details about Taichi kernels and functions.

The language used in Taichi kernels and functions looks exactly like Python, yet the Taichi frontend compiler converts it into a language that is **compiled, statically-typed, lexically-scoped, parallel and differentiable**.

::: note

**Taichi-scopes v.s. Python-scopes**: Python 作用域</strong>：

Everything decorated with `@ti.kernel` and `@ti.func` is in Taichi-scope and hence will be compiled by the Taichi compiler.

Everything else is in Python-scope. They are simply Python native code. ::: 它们是单纯的Python 代码。
:::

::: warning

Taichi kernels must be called from the Python-scope. Taichi functions must be called from the Taichi-scope. ::: Taichi 函数只有在 Taichi 作用域中才能被调用。
:::

::: note

For those who come from the world of CUDA, `ti.func` corresponds to `__device__` while `ti.kernel` corresponds to `__global__`. :::
:::

::: warning

Taichi**不支持**嵌套的内核。

Taichi**支持**嵌套的函数。

Recursive functions are **not supported for now**. :::
:::

## 并行执行的for循环

For loops at the outermost scope in a Taichi kernel is **automatically parallelized**. For loops can have two forms, i.e. _range-for loops_ and _struct-for loops_. Taichi 的 for 循环具有两种形式，_区间 for 循环_，和 _结构for 循环_。

**Range-for loops** are no different from Python for loops, except that it will be parallelized when used at the outermost scope. Range-for loops can be nested. 区间 for 循环可以嵌套。

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

It is the loop **at the outermost scope** that gets parallelized, not the outermost loop.

```python {3,9}
@ti.kernel
def foo():
    for i in range(10): # 并行 :-)
        ...

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

**Struct-for loops** are particularly useful when iterating over (sparse) field elements. In the code above, `for i, j in pixels` loops over all the pixel coordinates, i.e. `(0, 0), (0, 1), (0, 2), ... , (0, 319), (1, 0), ..., (639, 319)`. 例如在上述的代码中，`for i, j in pixels`将遍历所有像素点坐标, 即`(0, 0), (0, 1), (0, 2), ... , (0, 319), (1, 0), ..., (639, 319)`。

::: note

Struct-for is the key to [sparse computation](../advanced/sparse.md) in Taichi, as it will only loop over active elements in a sparse field. In dense fields, all elements are active. ::: 对于稠密场而言，所有元素都是活跃元素。
:::

::: warning

结构 for 循环只能使用在内核的最外层作用域。

It is the loop **at the outermost scope** that gets parallelized, not the outermost loop.

```python
@ti.kernel
def foo():
    for i in x:
        ...

@ti.kernel
def foo():
    for i in x:
        ...

@ti.kernel
def bar(k: ti.i32):
    # The outermost scope is a `if` statement
    if k > 42:
        for i in x: # Not allowed. Struct-fors must live in the outermost scope.
            ... 结构 for 循环 只能用于最外层作用域。
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
          break # 可以!
```

:::

## 与其他 Python 程序交互

### Python 作用域的数据访问

Everything outside Taichi-scopes (`ti.func` and `ti.kernel`) is simply Python code. In Python-scopes, you can access Taichi field elements using plain indexing syntax. For example, to access a single pixel of the rendered image in Python-scope, simply use: 在 Python 作用域中，你可以通过一般的索引语法访问 Taichi 场元素。 例如，要在 Python 中访问渲染图像的某个像素，只需使用以下代码：

```python
import taichi as ti
pixels = ti.field(ti.f32, (1024, 512))

pixels[42, 11] = 0.7  # 将数据存储到像素点中
print(pixels[42, 11]) # 打印 0.7
```

### 与其他软件包共享数据

Taichi provides helper functions such as `from_numpy` and `to_numpy` for transfer data between Taichi fields and NumPy arrays, So that you can also use your favorite Python packages (e.g. `numpy`, `pytorch`, `matplotlib`) together with Taichi. e.g.: 例如：

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
