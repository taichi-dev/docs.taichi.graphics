---
home: true
heroText:
heroImage: /logo_large.png
tagline: 为在GPU上进行高性能稀疏及可微分计算设计的高效可移植编程语言
actionText: 从这里开始 →
actionLink: /documentation/overview/overview/
features:
- title: PLACEHOLDER-FEATURE
  details: PLACEHOLDER-FEATURE
- title: PLACEHOLDER-FEATURE
  details: PLACEHOLDER-FEATURE
- title: PLACEHOLDER-FEATURE
  details: PLACEHOLDER-FEATURE
footer: MIT License | The Taichi Developers
---


## 概览

Taichi (太极) is a programming language designed for high-performance computer graphics. It is deeply embedded in Python, and its just-in-time compiler offloads compute-intensive tasks to multi-core CPUs and massively parallel GPUs.

<center>

![](/fractal_small.gif)

</center>

```python {1}
import taichi as ti

ti.init(arch=ti.gpu)

n = 320
pixels = ti.field(dtype=float, shape=(n * 2, n))


@ti.func
def complex_sqr(z):
    return ti.Vector([z[0]**2 - z[1]**2, z[1] * z[0] * 2])


@ti.kernel
def paint(t: float):
    for i, j in pixels:  # Parallized over all pixels
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
