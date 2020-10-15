---
home: true
heroText:
heroImage: /logo_large.png
tagline: Computer graphics programming for everyone
actionText: Documentation →
actionLink: /versioned_docs/develop/documentation/overview/overview/
features:
  - title: Productive
    details: As a language embedded in Python, Taichi has a Python-style syntax which is extremely easy to learn. Research shows Taichi programs are 10x shorter compared to equivalent C++/CUDA code while achieving higher performance.
  - title: Portable
    details: Without any code modification, a Taichi program can run on various platforms, including x64 & ARM CPUs, GPUs, web browsers and smartphones. Taichi supports Windows, Linux, and OS X.
  - title: Performant
    details: Taichi's Just-In-Time compiler offloads compute-intensive tasks to multi-core CPUs and massively parallel GPUs. The Taichi language design allows effective performance optimizations by the Taichi compiler.
footer: MIT License | The Taichi Developers
---

::: danger REMINDER <Badge text="beta" type="warning"/>
This docsite is still under construction 🚧  and the content is subject to change. For detailed instructions, especially the API docs of Taichi and the Chinese version of the Taichi documentation, please visit our old documentation site on [Read the Docs](https://taichi.readthedocs.io/) and [中文文档](https://taichi.readthedocs.io/zh_CN/latest/)
:::

## Hello, Taichi!

<Index-Branding/>

::: slot install
Taichi can be easily installed via `pip`:

```
python3 -m pip install taichi
```

(Please make sure you are using 64-bit Python 3.6/3.7/3.8.)

Download [fractal.py](https://raw.githubusercontent.com/taichi-dev/taichi/master/examples/fractal.py) and run it with

```
python3 fractal.py
```

You will see the animation below:
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
    for i, j in pixels: # Automatically parallelized
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
