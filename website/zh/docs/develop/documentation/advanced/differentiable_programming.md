# 可微编程

我们建议您从`ti.Tape()`开始，然后如有必要，再逐步迁移到更高阶的使用`kernel.grad()`语法的可微编程。

## 简介

例如，若你有如下内核：

```python
x = ti.field(float, ())
y = ti.field(float, ())

@ti.kernel
def compute_y():
    y[None] = ti.sin(x[None])
```

现在，如果你想要y对应x的导数，也即dy/dx， 你可能想要自己实现导数内核：

```python
x = ti.field(float, ())
y = ti.field(float, ())
dy_dx = ti.field(float, ())

@ti.kernel
def compute_dy_dx():
    dy_dx[None] = ti.cos(x[None])
```

但是如果我改变了`compute_y`的原始值怎么办？ 我们将会需要重新手动计算导数然后重新写入`compute_dy_dx`，这是很容易出错，且很不方便的。

如果你遇到这种情况，请不要担心！ Taichi 提供了一个便捷的自动微分系统来帮你获取一个内核的导数！

## 使用`ti.Tape()`

我们仍使用上面的`compute_y`作为例子。 有什么便捷的方法来获得一个从x计算$dy/dx$的内核？

1.  在声明需要求导的场时，使用`needs_grad=True`选项。
2.  Use `with ti.Tape(y):` to embrace the invocation into kernel(s) you want to compute derivative.
3.  Now `x.grad[None]` is the dy/dx value at current x.

```python
x = ti.field(float, (), needs_grad=True)
y = ti.field(float, (), needs_grad=True)

@ti.kernel
def compute_y():
    y[None] = ti.sin(x[None])

with ti.Tape(y):
    compute_y()

print('dy/dx =', x.grad[None])
print('at x =', x[None])
```

It\'s equivalant to:

```python
x = ti.field(float, ())
y = ti.field(float, ())
dy_dx = ti.field(float, ())

@ti.kernel
def compute_dy_dx():
    dy_dx[None] = ti.cos(x[None])

compute_dy_dx()

print('dy/dx =', dy_dx[None])
print('at x =', x[None])
```

### Usage example

For a physical simulation, sometimes it could be easy to compute the energy but hard to compute the force on each particles.

But recall that we can differentiate (negative) potential energy to get forces. a.k.a.: $F_i = -dU / dx_i$. So once you\'ve write a kernel that is able to compute the potential energy, you may use Taichi\'s autodiff system to obtain the derivative of it and then the force on each particles.

Take [examples/ad_gravity.py](https://github.com/taichi-dev/taichi/blob/master/examples/ad_gravity.py) as an example:

```python
import taichi as ti
ti.init()

N = 8
dt = 1e-5

x = ti.Vector.field(2, float, N, needs_grad=True)  # position of particles
v = ti.Vector.field(2, float, N)  # velocity of particles
U = ti.field(float, (), needs_grad=True)  # potential energy


@ti.kernel
def compute_U():
    for i, j in ti.ndrange(N, N):
        r = x[i] - x[j]
        # r.norm(1e-3) is equivalent to ti.sqrt(r.norm()**2 + 1e-3)
        # This is to prevent 1/0 error which can cause wrong derivative
        U[None] += -1 / r.norm(1e-3)  # U += -1 / |r|


@ti.kernel
def advance():
    for i in x:
        v[i] += dt * -x.grad[i]  # dv/dt = -dU/dx
    for i in x:
        x[i] += dt * v[i]  # dx/dt = v


def substep():
    with ti.Tape(U):
        # every kernel invocation within this indent scope
        # will also be accounted into the partial derivate of U
        # with corresponding input variables like x.
        compute_U()  # will also computes dU/dx and save in x.grad
    advance()


@ti.kernel
def init():
    for i in x:
        x[i] = [ti.random(), ti.random()]


init()
gui = ti.GUI('Autodiff gravity')
while gui.running:
    for i in range(50):
        substep()
    print('U = ', U[None])
    gui.circles(x.to_numpy(), radius=3)
    gui.show()
```

::: note

The argument `U` to `ti.Tape(U)` must be a 0D field.

For using autodiff with multiple output variables, please see the `kernel.grad()` usage below.
:::

::: note

`ti.Tape(U)` will automatically set _`U[None]`_ to 0 on start up.
:::

::: tip
See [examples/mpm_lagrangian_forces.py](https://github.com/taichi-dev/taichi/blob/master/examples/mpm_lagrangian_forces.py) and [examples/fem99.py](https://github.com/taichi-dev/taichi/blob/master/examples/fem99.py) for examples on using autodiff for MPM and FEM.
:::

## Using `kernel.grad()`

TODO: Documentation WIP.

## Kernel Simplicity Rule

Unlike tools such as TensorFlow where **immutable** output buffers are generated, the **imperative** programming paradigm adopted in Taichi allows programmers to freely modify global fields.

To make automatic differentiation well-defined under this setting, we make the following assumption on Taichi programs for differentiable programming:

**Global Data Access Rules:**

- If a global field element is written more than once, then starting from the second write, the write **must** come in the form of an atomic add ("accumulation\", using `ti.atomic_add` or simply `+=`).
- No read accesses happen to a global field element, until its accumulation is done.

**Kernel Simplicity Rule:** Kernel body consists of multiple [simply nested]{.title-ref} for-loops. I.e., each for-loop can either contain exactly one (nested) for-loop (and no other statements), or a group of statements without loops.

Example:

```python
@ti.kernel
def differentiable_task():
    for i in x:
        x[i] = y[i]

    for i in range(10):
        for j in range(20):
            for k in range(300):
                ... do whatever you want, as long as there are no loops

    # Not allowed. The outer for loop contains two for loops
    for i in range(10):
        for j in range(20):
            ...
        for j in range(20):
            ...
```

Taichi programs that violate this rule will result in an error.

::: note
**static for-loops** (e.g. `for i in ti.static(range(4))`) will get unrolled by the Python frontend preprocessor and therefore does not count as a level of loop.
:::

## DiffTaichi

The [DiffTaichi repo](https://github.com/yuanming-hu/difftaichi) contains 10 differentiable physical simulators built with Taichi differentiable programming. A few examples with neural network controllers optimized using differentiable simulators and brute-force gradient descent:

![image](https://github.com/yuanming-hu/public_files/raw/master/learning/difftaichi/ms3_final-cropped.gif)

![image](https://github.com/yuanming-hu/public_files/raw/master/learning/difftaichi/rb_final2.gif)

![image](https://github.com/yuanming-hu/public_files/raw/master/learning/difftaichi/diffmpm3d.gif)

::: tip
Check out [the DiffTaichi paper](https://arxiv.org/pdf/1910.00935.pdf) and [video](https://www.youtube.com/watch?v=Z1xvAZve9aE) to learn more about Taichi differentiable programming.
:::
