# 内核和函数

## Taichi-作用域 vs Python-作用域

被 `@ti.kernel` 或 `@ti.func` 装饰的代码在 **Taichi-作用域**中。

它们将被编译并在 CPU 或 GPU 设备上执行，以降低灵活性的代价换取很高的并行性能。

::: note
如果用 CUDA 做类比的话，Taichi-作用域 = **device** side。
:::

在 `@ti.kernel` 或 `@ti.func` 之外的代码即在 **Python-作用域**中。

它们不会被 Taichi 编译器编译，性能较低，但有这更丰富的类型系统和更好的灵活性。

::: note
如果用 CUDA 做类比的话，Python-作用域 = **host** side。
:::

## 内核

一个由 `@ti.kernel` 装饰的 Python 函数是一个 **Taichi 内核**：

```python {1}
@ti.kernel
def my_kernel():
    ...

my_kernel()
```

内核应该被从 **Python-作用域**内调用。

::: note
如果用 CUDA 做类比的话，Taichi 内核 = `__global__` 函数。
:::

### 参数

为方便地从 Python-作用域传递到 Taichi-作用域，内核最多只能有 8 个参数。

内核如果有参数的话，则参数必须显式指定类型。

```python {2}
@ti.kernel
def my_kernel(x: ti.i32, y: ti.f32):
    print(x + y)

my_kernel(2, 3.3)  # 打印: 5.3
```

::: note

目前，我们仅支持标量作为参数。 指定 `ti.Matrix` 或 `ti.Vector` 作为参数是不被支持的。 例如：

```python {2,6}
@ti.kernel
def bad_kernel(v: ti.Vector):
    ...

@ti.kernel
def good_kernel(vx: ti.f32, vy: ti.f32):
    v = ti.Vector([vx, vy])
    ...
```

:::

### 返回值

一个内核可以有或者没有（一个**标量**）返回值。 如果内核有一个返回值，那它必须有类型提示：

```python {2}
@ti.kernel
def my_kernel() -> ti.f32:
    return 233.33

print(my_kernel())  # 233.33
```

这个返回值会自动转换到所提示的类型。 例如，

```python {2-3,5}
@ti.kernel
def add_xy() -> ti.i32:  # int32
    return 233.33

print(my_kernel())  # 233, 因为返回值类型是 ti.i32
```

::: note

目前，内核只能返回一个标量。 返回 `ti.Matrix` 或 `ti.Vector` 是不被支持的。 Python 风格的元组作为返回值也是不被支持的。 例如：

```python {3,9}
@ti.kernel
def bad_kernel() -> ti.Matrix:
    return ti.Matrix([[1, 0], [0, 1]])  # 错误

@ti.kernel
def bad_kernel() -> (ti.i32, ti.f32):
    x = 1
    y = 0.5
    return x, y  # 错误
```

:::

### 高级参数

我们还支持传递**模板参数** （参见[模板元编程](../advanced/meta.md#template-metaprogramming)章节）和**外部数组参数**（参见[与外部数组的交互](./external.md)章节）至 Taichi 内核。 分别使用 `ti.template()` 或 `ti.ext_arr()` 作为他们的 类型提示。

::: note

当使用可微分编程时，内核结构会受到一些更多的限制。 请参阅[**内核简化规则**](../advanced/differentiable_programming.md#kernel-simplicity-rule)章节。

此外，请不要在可微编程中使用内核返回值，因为这种返回值并不会被自动微分追踪。 取而代之的是，可以把结果存入一个全局变量中（例如 `loss[None]` ）。
:::

### 函数

一个由 `@ti.func` 装饰的 Python 函数是一个 **Taichi 函数**：

```python {8,11}
@ti.func
def my_func():
    ...

@ti.kernel
def my_kernel():
    ...
    my_func()  # 从 Taichi-作用域内调用函数
    ...

my_kernel()    # 从 Python-作用域内调用内核
```

Taichi 函数应该被从 **Taichi-作用域**内调用。

::: note
如果用 CUDA 做类比的话，Taichi 函数 = `__device__` 函数。
:::

::: note
Taichi 函数可以被嵌套。
:::

::: warning
目前，所有函数都是强制内联的。 因此，Taichi 函数不能使用递归。
:::

### 参数和返回值

Taichi 函数可以包含多个参数和返回值。 不同于内核，函数中的参数不需要被类型提示：

```python
@ti.func
def my_add(x, y):
    return x + y


@ti.kernel
def my_kernel():
    ...
    ret = my_add(2, 3.3)
    print(ret)  # 5.3
    ...
```

函数的参数是按值传递的。 所以在函数作用域中的更改不会影响到调用者之外的值：

```python {3,9,11}
@ti.func
def my_func(x):
    x = x + 1  # 不会改变 x 原本的值


@ti.kernel
def my_kernel():
    ...
    x = 233
    my_func(x)
    print(x)  # 233
    ...
```

### 高级参数

您可以使用 `ti.template()` 作为类型提示来强制参数按引用传递：

```python {3,9,11}
@ti.func
def my_func(x: ti.template()):
    x = x + 1  # 会改变 x 原来的值


@ti.kernel
def my_kernel():
    ...
    x = 233
    my_func(x)
    print(x)  # 234
    ...
```

::: note

不同于内核，Taichi 函数 **支持向量或矩阵作为参数和返回值**：

```python {2,6}
@ti.func
def sdf(u):  # 函数支持矩阵和向量作为参数， 无需类型提示。
    return u.norm() - 1

@ti.kernel
def render(d_x: ti.f32, d_y: ti.f32):  # 内核目前还不支持向量/矩阵参数。 我们必须要对此使用一个替代方案。
    d = ti.Vector([d_x, d_y])
    p = ti.Vector([0.0, 0.0])
    t = sdf(p)
    p += d * t
    ...
```

:::

::: warning

目前不支持具有多个 `return` 语句的 Taichi 函数。 使用一个**局部变量**暂存结果，以便最终只有一个 `return` 语句：

```python {1,5,7,9,17}
# 错误的函数示范 - 两个返回语句
@ti.func
def safe_sqrt(x):
  if x >= 0:
    return ti.sqrt(x)
  else:
    return 0.0

# 正确的函数示范 - 一个返回语句
@ti.func
def safe_sqrt(x):
  ret = 0.0
  if x >= 0:
    ret = ti.sqrt(x)
  else:
    ret = 0.0
  return ret
```

:::
