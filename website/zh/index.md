---
home: true
heroText:
heroImage: /logo_large.png
tagline: 大家的计算机图形学编程语言
actionText: 文档 →
actionLink: /zh/docs/develop/documentation/overview/overview/
features:
  - title: 生产力
    details: Taichi嵌入在Python中，其语法与Python极其相近，因此十分容易学习。研究表明Taichi程序比等价的C++/CUDA代码短10倍，并能轻松达到更高性能。
  - title: 可移植
    details: 无需改动任何代码，Taichi程序就可以在多种平台上运行，包括x64/ARM CPU、GPU、浏览器、智能手机等。Taichi支持Windows、Linux、OS X等操作系统。
  - title: 高性能
    details: Taichi的即时编译(JIT)系统能利用多核CPU与大规模并行GPU。Taichi的语言设计使得其编译器能够进行有力的性能优化。
footer: MIT License | The Taichi Developers
---

::: danger 友情提示 <Badge text="beta" type="warning"/>
本网站还处于持续施工 🚧 中，这里的内容极有可能发生改变。访问我们现有的文档站[Read the Docs](https://taichi.readthedocs.io/)来查看详细的，特别是 API 和[中文文档](https://taichi.readthedocs.io/zh_CN/latest/) 的相关内容。
:::

## 你好，Taichi！

<Index-Branding/>

::: slot install
Taichi 可以用`pip`安装:

```
python3 -m pip install taichi
```

(请确保您在使用 64 位的 Python 3.6/3.7/3.8.)

下载 [fractal.py](https://raw.githubusercontent.com/taichi-dev/taichi/master/examples/fractal.py) 并使用 Python 运行：

```
python3 fractal.py
```

您将会看到如下效果：
:::

::: slot fractal

```python {2}
# fractal.py
import taichi as ti

ti.init(arch=ti.gpu)

n = 320
pixels = ti.field(dtype=float, shape=(n * 2, n))

@ti.func
def complex_sqr(z):
    return ti.Vector([z[0]**2 - z[1]**2, z[1] * z[0] * 2])

@ti.kernel
def paint(t: float):
    for i, j in pixels: # 自动并行
        c = ti.Vector([-0.8, ti.cos(t) * 0.2])
        z = ti.Vector([i / n - 1, j / n - 0.5]) * 2
        iterations = 0
        while z.norm() < 20 and iterations < 50:
            z = complex_sqr(z) + c
            iterations += 1
        pixels[i, j] = 1 - iterations * 0.02

gui = ti.GUI("Julia Set", res=(n * 2, n))

for i in range(1000000):
    paint(i * 0.03)
    gui.set_image(pixels)
    gui.show()
```

:::
