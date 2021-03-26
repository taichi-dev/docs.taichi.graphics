# 扩展库

Taichi 编程语言提供了一个最小化的通用内置标准库。 额外的领域特定功能通过**扩展库**提供：

## Taichi GLSL

[Taichi GLSL](https://github.com/taichi-dev/taichi_glsl)是一个Taichi的扩展库，其旨在提供各种有用的辅助函数，包括：

1.  便捷的标量型函数，诸如`clamp`， `smoothstep`， `mix`， `round`。
2.  类 GLSL 向量函数，诸如`normalize`， `distance`， `reflect`。
3.  表现良好的随机生成器，诸如`randUnit2D`， `randNDRange`。
4.  便捷的向量和矩阵初始化方式，诸如`vec` 和 `mat`。
5.  便捷的向量分量随机访问器，例如`v.xy`。

点击这里查看[Taichi GLSL的文档](https://taichi-glsl.readthedocs.io)。

```bash
python3 -m pip install taichi_glsl
```

## Taichi THREE

[Taichi THREE](https://github.com/taichi-dev/taichi_three)是一个Taichi的扩展库，用于将3D场景实时渲染成美观的2D图像（正在开发中）。

<center>

![图像](https://raw.githubusercontent.com/taichi-dev/taichi_three/16d98cb1c1f2ab7a37c9e42260878c047209fafc/assets/monkey.png)

</center>

点击这里查看[Taichi THREE 教程](https://github.com/taichi-dev/taichi_three#how-to-play)。

```bash
python3 -m pip install taichi_three
```
