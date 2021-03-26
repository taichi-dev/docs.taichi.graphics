# 元编程

Taichi 为元编程提供了基础架构。 元编程可以

- 统一依赖维度的代码开发工作，例如2维/3维的物理仿真
- 通过将运行时开销转移到编译时来提高运行时的性能
- 简化 Taichi 标准库的开发

Taichi 内核是_惰性实例化_的，并且很多有计算可以发生在_编译时_。 即使没有模板参数，Taichi 中的每一个内核也都是模板内核。

## 模版元编程

你可以使用`ti.template()`作为类型提示来传递一个场作为参数。 例如：

```python {2}
@ti.kernel
def copy(x: ti.template(), y: ti.template()):
    for i in x:
        y[i] = x[i]

a = ti.field(ti.f32, 4)
b = ti.field(ti.f32, 4)
c = ti.field(ti.f32, 12)
d = ti.field(ti.f32, 12)
copy(a, b)
copy(c, d)
```

如上例所示，模板编程可以使我们复用代码，并提供了更多的灵活性。

## 使用组合索引（grouped indices）的对维度不依赖的编程

然而，上面提供的`copy`模板函数并不完美。 例如，它只能用于复制1维场。 如果我们想复制2维场呢？ 我们是否需要再写一个内核？

```python
@ti.kernel
def copy2d(x: ti.template(), y: ti.template()):
    for i, j in x:
        y[i, j] = x[i, j]
```

:tada:没有必要！ Taichi provides `ti.grouped` syntax which enables you to pack loop indices into a grouped vector to unify kernels of different dimensionalities. For example:

```python {3-10,15-16}
@ti.kernel
def copy(x: ti.template(), y: ti.template()):
    for I in ti.grouped(y):
        # I is a vector with same dimensionality with x and data type i32
        # If y is 0D, then I = ti.Vector([]), which is equivalent to `None` when used in x[I]
        # If y is 1D, then I = ti.Vector([i])
        # If y is 2D, then I = ti.Vector([i, j])
        # If y is 3D, then I = ti.Vector([i, j, k])
        # ...
        x[I] = y[I]

@ti.kernel
def array_op(x: ti.template(), y: ti.template()):
    # if field x is 2D:
    for I in ti.grouped(x): # I is simply a 2D vector with data type i32
        y[I + ti.Vector([0, 1])] = I[0] + I[1]

    # then it is equivalent to:
    for i, j in x:
        y[i, j + 1] = i + j
```

## Field metadata

Sometimes it is useful to get the data type (`field.dtype`) and shape (`field.shape`) of fields. These attributes can be accessed in both Taichi- and Python-scopes.

```python {2-6}
@ti.func
def print_field_info(x: ti.template()):
    print('Field dimensionality is', len(x.shape))
    for i in ti.static(range(len(x.shape))):
        print('Size alone dimension', i, 'is', x.shape[i])
    ti.static_print('Field data type is', x.dtype)
```

See [Scalar fields](../api/scalar_field.md) for more details.

::: note
For sparse fields, the full domain shape will be returned.
:::

## Matrix & vector metadata

Getting the number of matrix columns and rows will allow you to write dimensionality-independent code. For example, this can be used to unify 2D and 3D physical simulators.

`matrix.m` equals to the number of columns of a matrix, while `matrix.n` equals to the number of rows of a matrix. Since vectors are considered as matrices with one column, `vector.n` is simply the dimensionality of the vector.

```python {4-5,7-8}
@ti.kernel
def foo():
    matrix = ti.Matrix([[1, 2], [3, 4], [5, 6]])
    print(matrix.n)  # 3
    print(matrix.m)  # 2
    vector = ti.Vector([7, 8, 9])
    print(vector.n)  # 3
    print(vector.m)  # 1
```

## Compile-time evaluations

Using compile-time evaluation will allow certain computations to happen when kernels are being instantiated. This saves the overhead of those computations at runtime.

- Use `ti.static` for compile-time branching (for those who come from C++17, this is [if constexpr](https://en.cppreference.com/w/cpp/language/if).):

```python {5}
enable_projection = True

@ti.kernel
def static():
  if ti.static(enable_projection): # No runtime overhead
    x[0] = 1
```

- Use `ti.static` for forced loop unrolling:

```python {3}
@ti.kernel
def func():
  for i in ti.static(range(4)):
      print(i)

  # is equivalent to:
  print(0)
  print(1)
  print(2)
  print(3)
```

## When to use for loops with `ti.static`

There are several reasons why `ti.static` for loops should be used.

- Loop unrolling for performance.
- Loop over vector/matrix elements. Indices into Taichi matrices must be a compile-time constant. Indexing into taichi fields can be run-time variables. For example, if you want to access a vector field `x`, accessed as `x[field_index][vector_component_index]`. The first index can be variable, yet the second must be a constant.

For example, code for resetting this vector fields should be

```python {4}
@ti.kernel
def reset():
  for i in x:
    for j in ti.static(range(x.n)):
      # The inner loop must be unrolled since j is a vector index instead
      # of a global field index.
      x[i][j] = 0
```
