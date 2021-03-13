---
sidebar: auto
---

# 常见问题

## **Q：** 用 `pip` 安装 Taichi 时，报错 `package not found` 。

** A：** 你的 Python 版本是否 >= 3.6 并且是 64 位？ 请参阅[ Troubleshooting ](../documentation/overview/install.md#troubleshooting)。

## ** Q：** 我们有提供像 `ti.pi` 之类的常量吗？

** A：** 没有，但你可以使用 `math.pi` 或 `numpy.pi` 代替。 Taichi能够在 JIT 期间处理这些常量，因此内核不会承担运行时成本。

## ** Q：** 如何 **强制** 串行执行最外层的循环，即 **不并行化**？

** A：** 试试这个技巧：

```python {1}
for _ in range(1):  # I'm the outer-most loop!
    for i in range(100):  # This loop will not be parallelized
        ...
```

## **Q:** What's the most convenient way to load images or textures into Taichi fields?

**A:** Simply use `field.from_numpy(ti.imread('filename.png'))`.

## **Q:** Can Taichi co-operate with **other Python packages** like `matplotlib`?

**A:** Yes, as long as that _package_ provides an interface with `numpy`, see [Interacting with other Python packages](../documentation/overview/hello.md#interacting-with-other-python-packages).

## **Q:** Shall we add some handy functions like `ti.smoothstep` or `ti.vec3`?

**A:** No, but we provide them in an extension library [Taichi GLSL](https://taichi-glsl.readthedocs.io) , install it using:

```bash
python -m pip install taichi_glsl
```

## **Q:** How can I **render 3D results** without writing a ray tracer myself?

**A:** You may export it with [Export PLY files](../documentation/misc/export_results.md#export-ply-files) so that you could view it in Houdini or Blender.

::: tip
Or make use the extension library [Taichi THREE](https://github.com/taichi-dev/taichi_glsl) to render images and update to GUI in real-time.
:::

## **Q:** How do I declare a field with **dynamic length**?

**A:** What you want may be the `dynamic` SNode, a kind of sparse field, see [Working with dynamic SNodes](../documentation/api/snode.md#working-with-dynamic-snodes).

::: tip
Or simply allocate a dense field large enough, and another 0-D field `field_len[None]` for length record. But in fact, the `dynamic` SNode could be slower than the latter solution, due to the cost of maintaining the sparsity information.
:::

## **Q:** Can a user iterate over irregular topologies (e.g., graphs or tetrahedral meshes) instead of regular grids?

**A:** These structures have to be represented using 1D arrays in Taichi. You can still iterate over them using `for i in x` or `for i in range(n)`.

However, at compile time, there\'s little the Taichi compiler can do for you to optimize it. You can still tweak the data layout to get different runtime cache behaviors and performance numbers.
