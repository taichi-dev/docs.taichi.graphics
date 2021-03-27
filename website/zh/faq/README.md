---
sidebar: auto
---

# 常见问题

## **Q：** 用 `pip` 安装 Taichi 时，报错 `package not found` 。

**A:** Is your Python version \>= 3.6, and 64-bit? See [Troubleshooting](../documentation/overview/install.md#troubleshooting). 请参阅[ Troubleshooting ](../documentation/overview/install.md#troubleshooting)。

## ** Q：** 我们有提供像 `ti.pi` 之类的常量吗？

**A:** No, but you may use `math.pi` or `numpy.pi` instead. Taichi is able to bake in these constants during JIT, so your kernels incur no runtime cost. Taichi能够在 JIT 期间处理这些常量，因此内核不会承担运行时成本。

## **Q：** 如何 **强制** 串行执行最外层的循环，即 **不并行化**？

**A：** 试试这个技巧：

```python {1}
for _ in range(1):  # I'm the outer-most loop!
    for _ in range(1):  # I'm the outer-most loop!
    for i in range(100):  # This loop will not be parallelized
        ...
```

## **Q：** 怎样才能最方便地将图像/纹理加载到 Taichi 张量中？

**A：** 只需使用 `tensor.from_numpy(ti.imread('filename.png'))` 即可。

## ** Q：** Taichi能否像 </strong>matplotlib</code> 那样和 **其他 Python 包** 合作呢？

**A:** Yes, as long as that _package_ provides an interface with `numpy`, see [Interacting with other Python packages](../documentation/overview/hello.md#interacting-with-other-python-packages).

## **Q：** 我们可以添加一些诸如 `ti.smoothstep` 或 `ti.vec3` 之类的便捷函数吗？

**A:** No, but we provide them in an extension library [Taichi GLSL](https://taichi-glsl.readthedocs.io) , install it using:

```bash
python -m pip install taichi_glsl
```

## **Q：** 如何不用自己编写光线跟踪，就能 **渲染出 3D 结果**？

**A：** 你可以使用[ export_ply_files ](../documentation/misc/export_results.md#export-ply-files) 导出模型，接着就可以在 Houdini 或 Blender 中查看了。

::: tip
Or make use the extension library [Taichi THREE](https://github.com/taichi-dev/taichi_glsl) to render images and update to GUI in real-time. :::
:::

## **Q：** 如何声明具有 **动态长度**的张量？

**A：** 你想要的可能是 `dynamic` SNode，这是一种稀疏张量，详见 [dynamic](../documentation/api/snode.md#working-with-dynamic-snodes)。

::: tip
Or simply allocate a dense field large enough, and another 0-D field `field_len[None]` for length record. But in fact, the `dynamic` SNode could be slower than the latter solution, due to the cost of maintaining the sparsity information. ::: 不过事实上，由于维护稀疏信息的成本开销，`dynamic`SNode 可能比后者慢。
:::

## **Q：**用户能否在不规则拓扑（例如曲线或四面体网格）而不是常规网格上迭代？

**A:** These structures have to be represented using 1D arrays in Taichi. You can still iterate over them using `for i in x` or `for i in range(n)`. 接着你就可以通过`for i in x`或`for i in range(n)`迭代遍历它们了。

但是，在编译时，Taichi 编译器几乎无法对其优化。 However, at compile time, there\'s little the Taichi compiler can do for you to optimize it. You can still tweak the data layout to get different runtime cache behaviors and performance numbers.
