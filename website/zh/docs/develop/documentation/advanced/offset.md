# 坐标偏移

- A Taichi field can be defined with **coordinate offsets**. The offsets will move field bounds so that field origins are no longer zero vectors. A typical use case is to support voxels with negative coordinates in physical simulations. 偏移量会移动场的边界，使得场的原点不再是零向量。 一个典型的应用案例是在物理模拟中支持负坐标的体素。
- For example, a matrix of `32x64` elements with coordinate offset `(-16, 8)` can be defined as the following:

```python
a = ti.Matrix.field(2, 2, dtype=ti.f32, shape=(32, 64), offset=(-16, 8))
```

通过这样，场的下标就是从`(-16, 8)` 到 `(16, 72)`了（开区间）。

```python
a[-16, 32]  # 左下角
a[16, 32]   # 右下角
a[-16, 64]  # 左上角
a[16, 64]   # 右上角
```

::: note
The dimensionality of field shapes should **be consistent** with that of the offset. Otherwise, a `AssertionError` will be raised. ::: 否则，将引发`AssertionError`错误。
:::

```python
a = ti.Matrix.field(2, 3, dtype=ti.f32, shape=(32,), offset=(-16, ))          # 有效！
b = ti.Vector.field(3, dtype=ti.f32, shape=(16, 32, 64), offset=(7, 3, -4))   # 有效！
a = ti.Matrix.field(2, 3, dtype=ti.f32, shape=(32,), offset=(-16, ))          # Works!
b = ti.Vector.field(3, dtype=ti.f32, shape=(16, 32, 64), offset=(7, 3, -4))   # Works!
c = ti.Matrix.field(2, 1, dtype=ti.f32, shape=None, offset=(32,))             # AssertionError
d = ti.Matrix.field(3, 2, dtype=ti.f32, shape=(32, 32), offset=(-16, ))       # AssertionError
e = ti.field(dtype=ti.i32, shape=16, offset=-16)                              # Works!
f = ti.field(dtype=ti.i32, shape=None, offset=-16)                            # AssertionError
g = ti.field(dtype=ti.i32, shape=(16, 32), offset=-16)                        # AssertionError
f = ti.field(dtype=ti.i32, shape=None, offset=-16)                            # 断言错误
g = ti.field(dtype=ti.i32, shape=(16, 32), offset=-16)                        # 断言错误
```
