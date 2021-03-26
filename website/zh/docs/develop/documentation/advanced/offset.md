# 坐标偏移

- Taichi 场支持**坐标偏移(coordinate offsets)**的定义方式。 偏移量会移动场的边界，使得场的原点不再是零向量。 一个典型的应用案例是在物理模拟中支持负坐标的体素。
- 例如，一个大小为`32x64`、起始元素坐标偏移为`(-16, 8)`的矩阵可以按照以下形式来定义：

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
场形状的维数应该与偏移量的维数**保持一致** 。 否则，将引发`AssertionError`错误。
:::

```python
a = ti.Matrix.field(2, 3, dtype=ti.f32, shape=(32,), offset=(-16, ))          # 有效！
b = ti.Vector.field(3, dtype=ti.f32, shape=(16, 32, 64), offset=(7, 3, -4))   # 有效！
c = ti.Matrix.field(2, 1, dtype=ti.f32, shape=None, offset=(32,))             # 断言错误
d = ti.Matrix.field(3, 2, dtype=ti.f32, shape=(32, 32), offset=(-16, ))       # 断言错误
e = ti.field(dtype=ti.i32, shape=16, offset=-16)                              # 有效！
f = ti.field(dtype=ti.i32, shape=None, offset=-16)                            # 断言错误
g = ti.field(dtype=ti.i32, shape=(16, 32), offset=-16)                        # 断言错误
```
