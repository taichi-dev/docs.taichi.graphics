# 与外部数组进行交互

尽管 Taichi 场主要被用于 Taichi-作用域，在一些情况下在 Python 作用域中高效地操作场数据是很有用的。

我们提供了不同的接口用以在 Taichi 场和外部数组之间直接拷贝数据。 最典型的案例可能是在 Taichi 场和 numpy 数组之间复制数据。 让我们来看一下接下来的两个例子。

使用`to_numpy()`将**Taichi场中的数据导出至 Numpy 数组**。 这允许我们将计算结果导出至其他支持 NumPy 的 Python 包中，例如`matplotlib`。

```python {8}
@ti.kernel
def my_kernel():
   for i in x:
      x[i] = i * 2

x = ti.field(ti.f32, 4)
my_kernel()
x_np = x.to_numpy()
print(x_np)  # np.array([0, 2, 4, 6])
```

使用`from_numpy()`将**NumPy数组导入至 Taichi 场**。 这允许我们使用 NumPy 数组来初始化 Taichi 场。 例如：

```python {3}
x = ti.field(ti.f32, 4)
x_np = np.array([1, 7, 3, 5])
x.from_numpy(x_np)
print(x[0])  # 1
print(x[1])  # 7
print(x[2])  # 3
print(x[3])  # 5
```

## API 参考

我们提供了不同的接口用以在 Taichi 场和**外部数组**之间直接拷贝数据。 此处外部数组（external arrays）是指 NumPy 数组或者 PyTorch 张量。

我们建议普通用户从 NumPy 数组开始。

欲了解更多细节，请查看[场的API参考手册](../api/field.md)。

## 外部数组形状

Taichi 场的形状（请查看[标量场](../api/scalar_field.md)的章节来了解更多）和它们对应的 NumPy 数组通过以下规则紧密地联系在一起：

- 对于Taichi标量场，**NumPy 数组的形状与场的形状完全相同**：

```python
field = ti.field(ti.i32, shape=(233, 666))
field.shape  # (233, 666)

array = field.to_numpy()
array.shape  # (233, 666)

field.from_numpy(array)  # 输入数组的形状必须为 (233, 666)
```

- 对于Taichi向量场，如果向量是`n`-维的，则**NumPy 数组的形状应当为** `(*field_shape, vector_n)`：

```python
field = ti.Vector.field(3, ti.i32, shape=(233, 666))
field.shape  # (233, 666)
field.n      # 3

array = field.to_numpy()
array.shape  # (233, 666, 3)

field.from_numpy(array)  # 输入数组的形状必须为 (233, 666, 3)
```

- 对于 Taichi 矩阵场，如果矩阵的形状是`n*m`，则**NumPy 数组的形状应当为** `(*field_shape, matrix_n, matrix_m)`：

```python
field = ti.Matrix.field(3, 4, ti.i32, shape=(233, 666))
field.shape  # (233, 666)
field.n      # 3
field.m      # 4

array = field.to_numpy()
array.shape  # (233, 666, 3, 4)

field.from_numpy(array)  # 输入数组的形状必须为 (233, 666, 3, 4)
```

## 使用外部数组作为 Taichi 内核的参数

使用类型提示 `ti.ext_arr()` 将外部数组作为内核的参数传递。 例如：

```python {12}
import taichi as ti
import numpy as np

ti.init()

n = 4
m = 7

val = ti.field(ti.i32, shape=(n, m))

@ti.kernel
def test_numpy(arr: ti.ext_arr()):
  for i in range(n):
    for j in range(m):
      arr[i, j] += i + j

a = np.empty(shape=(n, m), dtype=np.int32)

for i in range(n):
  for j in range(m):
    a[i, j] = i * j

test_numpy(a)

for i in range(n):
  for j in range(m):
    assert a[i, j] == i * j + i + j
```

::: note
结构for-循环不支持外部数组。
:::
