# 面向数据对象式编程

Taichi是一种[面向数据的](https://en.wikipedia.org/wiki/Data-oriented_design)编程(DOP) 语言。 但是，单纯的 DOP 会使模块化变得困难。

为了允许代码模块化，Taichi 从面向对象编程(OOP) 中借鉴了一些概念。

为了方便起见，我们将称此混合方案为**面向数据对象式编程** (ODOP)。

::: note
待办事项：此处应有更多文档。
:::

一个简单的例子：

```python
import taichi as ti

ti.init()

@ti.data_oriented
class Array2D:
  def __init__(self, n, m, increment):
    self.n = n
    self.m = m
    self.val = ti.field(ti.f32)
    self.total = ti.field(ti.f32)
    self.increment = increment
    ti.root.dense(ti.ij, (self.n, self.m)).place(self.val)
    ti.root.place(self.total)

  @staticmethod
  @ti.func
  def clamp(x):  # Clamp to [0, 1)
      return max(0, min(1 - 1e-6, x))

  @ti.kernel
  def inc(self):
    for i, j in self.val:
      ti.atomic_add(self.val[i, j], self.increment)

  @ti.kernel
  def inc2(self, increment: ti.i32):
    for i, j in self.val:
      ti.atomic_add(self.val[i, j], increment)

  @ti.kernel
  def reduce(self):
    for i, j in self.val:
      ti.atomic_add(self.total, self.val[i, j] * 4)

arr = Array2D(128, 128, 3)

double_total = ti.field(ti.f32, shape=())

ti.root.lazy_grad()

arr.inc()
arr.inc.grad()
assert arr.val[3, 4] == 3
arr.inc2(4)
assert arr.val[3, 4] == 7

with ti.Tape(loss=arr.total):
  arr.reduce()

for i in range(arr.n):
  for j in range(arr.m):
    assert arr.val.grad[i, j] == 4

@ti.kernel
def double():
  double_total[None] = 2 * arr.total

with ti.Tape(loss=double_total):
  arr.reduce()
  double()

for i in range(arr.n):
  for j in range(arr.m):
    assert arr.val.grad[i, j] == 8
```
