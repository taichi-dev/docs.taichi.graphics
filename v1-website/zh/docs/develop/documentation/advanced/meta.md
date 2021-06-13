# 元编程

Taichi 为元编程提供了基础架构。 元编程可以

- 统一依赖维度的代码开发工作，例如2维/3维的物理仿真
- 通过将运行时开销转移到编译时来提高运行时的性能
- 简化 Taichi 标准库的开发

Taichi 内核是_惰性实例化_的，并且很多有计算可以发生在_编译时_。 即使没有模板参数，Taichi 中的每一个内核也都是模板内核。

## 模版元编程

你可以使用 `ti.template()` 作为类型提示来传递一个场作为参数。 例如：

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

然而，上面提供的 `copy` 模板函数并不完美。 例如，它只能用于复制 1 维场。 如果我们想复制 2 维场呢？ 我们是否需要再写一个内核？

```python
@ti.kernel
def copy2d(x: ti.template(), y: ti.template()):
    for i, j in x:
        y[i, j] = x[i, j]
```

:tada:没有必要！ Taichi 提供了 `ti.grouped` 语法，使你可以将 for 循环索引打包成一个分组向量，以统一不同维度的内核。 例如：

```python {3-10,15-16}
@ti.kernel
def copy(x: ti.template(), y: ti.template()):
    for I in ti.grouped(y):
        # I 是与 x 相同维度的、类型为 i32 向量
        # 如果 y 是 0 维的，则 I = ti.Vector([])，其在 x[I] 中与 `None` 相同
        # 如果 y 是 1 维的，则 I = ti.Vector([i])
        # 如果 y 是 2 维的，则 I = ti.Vector([i, j])
        # 如果 y 是 3 维的，则 I = ti.Vector([i, j, k])
        # ...
        x[I] = y[I]

@ti.kernel
def array_op(x: ti.template(), y: ti.template()):
    # 如果场 x 是 2 维的:
    for I in ti.grouped(x): # I is simply a 2D vector with data type i32
        y[I + ti.Vector([0, 1])] = I[0] + I[1]

    # 则其相当于下面的：
    for i, j in x:
        y[i, j + 1] = i + j
```

## 场元数据

有时获取场的数据类型（`field.dtype`）和形状（`field.shape`）是很有用的。 这些属性值在 Taichi 作用域和 Python 作用域中都可以访问到。

```python {2-6}
@ti.func
def print_field_info(x: ti.template()):
    print('Field dimensionality is', len(x.shape))
    for i in ti.static(range(len(x.shape))):
        print('Size alone dimension', i, 'is', x.shape[i])
    ti.static_print('Field data type is', x.dtype)
```

参阅[标量场](../api/scalar_field.md)以了解更多细节。

::: note
对于稀疏场，此处会返回其完整域的形状（full domain shape）。
:::

## 矩阵 & 向量元数据

获得矩阵的行和列数将有利于你编写不依赖维度的代码。 例如，这可以用来统一 2 维和 3 维物理模拟器的编写。

`matrix.m` 等于矩阵的列数，而 `matrix.n` 等于矩阵的行数。 同时向量被认为是只有一列的矩阵，，所以 `vector.n` 就是向量的维数。

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

## 编译时求值（Compile-time evaluations）

编译时计算的使用将允许在内核实例化时进行部分计算。 这节省了运行时计算的开销。

- 使用 `ti.static` 对编译时分支展开（对 C++17 的用户来说，这相当于是 [if constexpr](https://en.cppreference.com/w/cpp/language/if)）：

```python {5}
enable_projection = True

@ti.kernel
def static():
  if ti.static(enable_projection): # 没有运行时开销
    x[0] = 1
```

- 使用 `ti.static` 强制循环展开（forced loop unrolling）

```python {3}
@ti.kernel
def func():
  for i in ti.static(range(4)):
      print(i)

  # 相当于：
  print(0)
  print(1)
  print(2)
  print(3)
```

## 何时使用 `ti.static` 来进行 for 循环

下面是一些为何应该在 for 循环时使用 `ti.static` 的原因。

- 循环展开以提高性能。
- 对向量/矩阵的元素进行循环。 矩阵的索引必须为编译时常量。 场的索引可以为运行时变量。 例如，如果你想访问一个向量场 `x`，可以使用 `x[field_index][vector_component_index]` 的形式访问。 第一个索引（field_index）可以是变量，但是第二个索引（vector_component_index）必须是一个常量。

例如，向量场（vector fields）的重置代码应该为

```python {4}
@ti.kernel
def reset():
  for i in x:
    for j in ti.static(range(x.n)):
      # 内部循环必须被展开， 因为 j 是向量索引
      # 而不是全局场索引
      x[i][j] = 0
```
