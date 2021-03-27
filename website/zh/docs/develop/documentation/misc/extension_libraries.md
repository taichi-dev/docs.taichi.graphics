# 扩展库

The Taichi programming language offers a minimal and generic built-in standard library. Extra domain-specific functionalities are provided via **extension libraries**: 额外的领域特定功能通过**扩展库**提供：

## Taichi GLSL

[Taichi GLSL](https://github.com/taichi-dev/taichi_glsl) is an extension library of Taichi, aiming at providing useful helper functions including:

1.  便捷的标量型函数，诸如`clamp`， `smoothstep`， `mix`， `round`。
2.  类 GLSL 向量函数，诸如`normalize`， `distance`， `reflect`。
3.  Well-behaved random generators including `randUnit2D`, `randNDRange`.
4.  便捷的向量和矩阵初始化方式，诸如`vec` 和 `mat`。
5.  便捷的向量分量随机访问器，例如`v.xy`。

Click here for [Taichi GLSL Documentation](https://taichi-glsl.readthedocs.io).

```bash
python3 -m pip install taichi_glsl
```

## Taichi THREE

[Taichi THREE](https://github.com/taichi-dev/taichi_three) is an extension library of Taichi to render 3D scenes into nice-looking 2D images in real-time (work in progress).

<center>

![图像](https://raw.githubusercontent.com/taichi-dev/taichi_three/16d98cb1c1f2ab7a37c9e42260878c047209fafc/assets/monkey.png)

</center>

Click here for [Taichi THREE Tutorial](https://github.com/taichi-dev/taichi_three#how-to-play).

```bash
python3 -m pip install taichi_three
```
