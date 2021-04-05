---
sidebar: auto
---

# 常见问题

## **Q：** 用 `pip` 安装 Taichi 时，报错 `package not found` 。

** A：** 你的 Python 版本是否 >= 3.6 并且是 64 位？ 请参阅 [ Troubleshooting ](../documentation/overview/install.md#troubleshooting)。

## ** Q：** 我们有提供像 `ti.pi` 之类的常量吗？

** A：** 没有，但你可以使用 `math.pi` 或 `numpy.pi` 代替。 Taichi 能够在 JIT 期间处理这些常量，因此内核不会承担运行时成本。

## **Q：** 如何**强制**串行执行最外层的循环，即**不并行化**？

**A：** 试试这个技巧：

```python {1}
for _ in range(1):  # 我是最外层循环！
    for i in range(100):  # 本循环不会被并行化
        ...
```

## **Q：** 怎样才能最方便地将图像/纹理加载到 Taichi 张量中？

**A：** 只需使用 `tensor.from_numpy(ti.imread('filename.png'))` 即可。

## ** Q：** Taichi 能否像 </strong>matplotlib</code> 那样和**其他 Python 包** 合作呢？

**A：** 可以，只要那个_包_提供 `numpy` 接口，请参阅 [other_python_packages](../documentation/overview/hello.md#interacting-with-other-python-packages)。

## **Q：** 我们可以添加一些诸如 `ti.smoothstep` 或 `ti.vec3` 之类的便捷函数吗？

**A：** 不必要，因为我们在扩展库 [ Taichi GLSL ](https://taichi-glsl.readthedocs.io) 中已经进行了提供，请使用以下命令安装：

```bash
python -m pip install taichi_glsl
```

## **Q：** 如何不用自己编写光线跟踪，就能**渲染出 3D 结果**？

**A：** 你可以使用 [export_ply_files](../documentation/misc/export_results.md#export-ply-files) 导出模型，接着就可以在 Houdini 或 Blender 中查看了。

::: tip
或者使用扩展库 [Taichi THREE](https://github.com/taichi-dev/taichi_glsl) 来渲染图像并实时更新到 GUI。
:::

## **Q：** 如何声明具有**动态长度** 的场？

**A：** 你想要的可能是 `dynamic` SNode，这是一种稀疏场，详见 [dynamic](../documentation/api/snode.md#working-with-dynamic-snodes)。

::: tip
或者简单地分配足够大的稠密场，再分配一个 0-维场 `field_len[None]` 用于记录长度。 不过事实上，由于维护稀疏信息的成本开销，`dynamic` SNode 可能比后者慢。
:::

## **Q：**用户能否在不规则拓扑（例如曲线或四面体网格）而不是常规网格上迭代？

**A：**这些结构必须使用 Taichi 中的 1D 数组表示。 接着你就可以通过 `for i in x` 或 `for i in range(n)` 迭代遍历它们了。

但是，在编译时，Taichi 编译器几乎无法对其优化。 不过你仍可以通过调整数据布局，获得不同的运行缓存行为和性能数据。
