# 内核和函数

## Taichi-作用域 vs Python-作用域

被`@ti.kernel`或`@ti.func`装饰的代码在**Taichi-作用域**中。

They are to be compiled and executed on CPU or GPU devices with high parallelization performance, on the cost of less flexibility.

::: note
For people from CUDA, Taichi-scope = **device** side. :::
:::

在`@ti.kernel`或`@ti.func`之外的代码即在**Python-作用域**中。

They are not compiled by the Taichi compiler and have lower performance but with a richer type system and better flexibility.

::: note
For people from CUDA, Python-scope = **host** side. :::
:::

## 内核

一个由`@ti.kernel`装饰的 Python 函数是一个 **Taichi 内核**：

```python {1}
@ti.kernel
def my_kernel():
    ...

my_kernel()
```

内核应该被从 **Python-作用域**内调用。

::: note
For people from CUDA, Taichi kernels = `__global__` functions. :::
:::

### 参数

Kernels can have at most 8 parameters so that you can pass values from Python-scope to Taichi-scope easily.

内核如果有参数的话，则参数必须显式指定类型。

```python {2}
@ti.kernel
def my_kernel(x: ti.i32, y: ti.f32):
    print(x + y)

my_kernel(2, 3.3)  # 打印: 5.3
```

::: note

目前，我们仅支持标量作为参数。 For now, we only support scalars as arguments. Specifying `ti.Matrix` or `ti.Vector` as argument is not supported. For example: 例如：

```python {2,6}
@ti.kernel
def bad_kernel(v: ti.Vector):
    ...

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

A kernel may or may not have a **scalar** return value. If it does, the type of return value must be hinted: 如果内核有一个返回值，那它必须有类型提示：

```python {2}
@ti.kernel
def my_kernel() -> ti.f32:
    return 233.33

print(my_kernel())  # 233.33
```

The return value will be automatically cast into the hinted type. e.g., 例如，

```python {2-3,5}
@ti.kernel
def add_xy() -> ti.i32:  # int32
    return 233.33

print(my_kernel())  # 233, 因为返回值类型是 ti.i32
```

::: note

目前，内核只能返回一个标量。 For now, a kernel can only have one scalar return value. Returning `ti.Matrix` or `ti.Vector` is not supported. Python-style tuple return is not supported either. For example: Python风格的元祖作为返回值也是不被支持的。 例如：

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

We also support **template arguments** (see [Template metaprogramming](../advanced/meta.md#template-metaprogramming)) and **external array arguments** (see [Interacting with external arrays](./external.md)) in Taichi kernels. Use `ti.template()` or `ti.ext_arr()` as their type-hints respectively. 分别使用 `ti.template()` 或 `ti.ext_arr()` 作为他们的 类型提示。

::: note

当使用可微分编程时，内核结构会受到一些更多的限制。 When using differentiable programming, there are a few more constraints on kernel structures. See the [**Kernel Simplicity Rule**](../advanced/differentiable_programming.md#kernel-simplicity-rule).

Also, please do not use kernel return values in differentiable programming, since the return value will not be tracked by automatic differentiation. Instead, store the result into a global variable (e.g. `loss[None]`). ::: 取而代之的是，可以把结果存入一个全局变量中（例如`loss[None]`）。
:::

### 函数

一个由`@ti.func`装饰的 Python 函数是一个 **Taichi 函数**：

```python {8,11}
@ti.func
def my_func():
    ...

@ti.kernel
def my_kernel():
    ...

my_kernel()
    my_func()  # 从 Taichi-作用域内调用函数
    ...

@ti.func
def my_func():
    ...

@ti.kernel
def my_kernel():
    ...
    my_func()  # call functions from Taichi-scope
    ...

my_kernel()    # call kernels from Python-scope
```

Taichi 函数应该被从 **Taichi-作用域**内调用。

::: note
For people from CUDA, Taichi functions = `__device__` functions. :::
:::

::: note
Taichi functions can be nested. :::
:::

::: warning
Currently, all functions are force-inlined. Therefore, no recursion is allowed. ::: 因此，Taichi函数不能使用递归。
:::

### 参数和返回值

Taichi函数可以包含多个参数和返回值。 Functions can have multiple arguments and return values. Unlike kernels, arguments in functions don\'t need to be type-hinted:

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
    ret = my_add(2, 3.3)
    print(ret)  # 5.3
    ...
```

函数的参数是按值传递的。 Function arguments are passed by value. So changes made inside function scope won\'t affect the outside value in the caller:

```python {3,9,11}
@ti.func
def my_func(x):
    x = x + 1  # won't change the original value of x


@ti.kernel
def my_kernel():
    ...
    x = 233
    my_func(x)
    print(x)  # 233
    ...
    x = 233
    my_func(x)
    print(x)  # 233
    ...
```

### 高级参数

You may use `ti.template()` as type-hint to force arguments to be passed by reference:

```python {3,9,11}
@ti.func
def my_func(x: ti.template()):
    x = x + 1  # will change the original value of x


@ti.kernel
def my_kernel():
    ...
    x = 233
    my_func(x)
    print(x)  # 234
    ...
    x = 233
    my_func(x)
    print(x)  # 234
    ...
```

::: note

Unlike kernels, functions **do support vectors or matrices as arguments and return values**:

```python {2,6}
@ti.func
def sdf(u):  # 函数支持矩阵和向量作为参数， 无需类型提示。
    @ti.func
def sdf(u):  # functions support matrices and vectors as arguments. No type-hints needed.
    return u.norm() - 1

@ti.kernel
def render(d_x: ti.f32, d_y: ti.f32):  # kernels do not support vector/matrix arguments yet. We have to use a workaround.
    d = ti.Vector([d_x, d_y])
    p = ti.Vector([0.0, 0.0])
    t = sdf(p)
    p += d * t
    ... 我们必须要对此使用一个替代方案。
    d = ti.Vector([d_x, d_y])
    p = ti.Vector([0.0, 0.0])
    t = sdf(p)
    p += d * t
    ...
```

:::

::: warning

目前不支持具有多个 `return` 语句的 Taichi 函数。 Functions with multiple `return` statements are not supported for now. Use a **local** variable to store the results, so that you end up with only one `return` statement:

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
