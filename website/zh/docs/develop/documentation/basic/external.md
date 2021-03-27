# 与外部数组进行交互

Although Taichi fields are mainly used in Taichi-scope, in some cases efficiently manipulating Taichi field data in Python-scope could also be helpful.

We provide various interfaces to copy the data between Taichi fields and external arrays. The most typical case maybe copying between Tachi fields and Numpy arrays. Let\'s take a look at two examples below. 最典型的案例可能是在 Taichi 场和 numpy 数组之间复制数据。 让我们来看一下接下来的两个例子。

使用`to_numpy()`将**Taichi场中的数据导出至 Numpy 数组**。 **Export data in Taichi fields to a NumPy array** via `to_numpy()`. This allows us to export computation results to other Python packages that support NumPy, e.g. `matplotlib`.

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

**Import data from NumPy array to Taichi fields** via `from_numpy()`. This allows people to initialize Taichi fields via NumPy arrays. E.g., 这允许我们使用 NumPy 数组来初始化 Taichi 场。 例如：

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

We provide interfaces to copy data between Taichi field and **external arrays**. External arrays refers to NumPy arrays or PyTorch tensors. 此处外部数组（external arrays）是指 NumPy 数组或者 PyTorch 张量。

我们建议普通用户从 NumPy 数组开始。

欲了解更多细节，请查看[场的API参考手册](../api/field.md)。

## 外部数组形状

Shapes of Taichi fields (see [Scalar fields](../api/scalar_field.md)) and those of corresponding NumPy arrays are closely connected via the following rules:

- For scalar fields, **the shape of NumPy array is exactly the same as the Taichi field**:

```python
field = ti.field(ti.i32, shape=(233, 666))
field.shape  # (233, 666)

array = field.to_numpy()
array.shape  # (233, 666)

field.from_numpy(array)  # 输入数组的形状必须为 (233, 666)
```

- For vector fields, if the vector is `n`-D, then **the shape of NumPy array should be** `(*field_shape, vector_n)`:

```python
field = ti.Vector.field(3, ti.i32, shape=(233, 666))
field.shape  # (233, 666)
field.n      # 3

array = field.to_numpy()
array.shape  # (233, 666, 3)

field.from_numpy(array)  # 输入数组的形状必须为 (233, 666, 3)
```

- For matrix fields, if the matrix is `n*m`, then **the shape of NumPy array should be** `(*field_shape, matrix_n, matrix_m)`:

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

Use the type hint `ti.ext_arr()` for passing external arrays as kernel arguments. For example: 例如：

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
Struct-for\'s are not supported on external arrays. :::
:::
