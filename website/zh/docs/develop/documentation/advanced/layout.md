# 高级数据布局

场（[标量场](../api/scalar_field.md)）可以被_放置_在特定的形状和_布局_中。 构造适当的数据布局对性能来说非常关键，特别是对内存密集型的应用程序而言。 精心设计的数据布局可以显著提高缓存/转址旁路缓存(TLB) 命中率和缓存行(CacheLine) 利用率。 不过某些情况下性能不是最优先要考虑的因素，因此你可能不需要去担心它。

Taichi 将算法与数据布局解耦，并且 Taichi 编译器可以自动优化特定数据布局上的数据访问。 这些 Taichi 特性使得程序员可以快速尝试不同的数据布局，并找出针对特定任务和计算机体系结构的最有效布局。

在 Taichi 中，布局是以递归的方式定义的。 请参阅[结构节点(SNodes)](../api/snode.md)获得更多关于其工作方式的细节。 我们建议从默认的布局规范开始（通过在 `ti.field/ti.Vector.field/ti.Matrix.field` 中指定 `shape` 来创建张量），如果需要的话，之后可以再使 `ti.root.X` 语法迁移到更高级的布局。

## 由 `shape` 到 `ti.root.X`

例如，这里声明了一个零维场：

```python {1-2}
x = ti.field(ti.f32)
ti.root.place(x)
# 相当于：
x = ti.field(ti.f32, shape=())
```

这里声明了一个尺寸为 `3` 的一维场：

```python {1-2}
x = ti.field(ti.f32)
ti.root.dense(ti.i, 3).place(x)
# 相当于：
x = ti.field(ti.f32, shape=3)
```

这里声明了一个尺寸为 `(3, 4)` 的二维场：

```python {1-2}
x = ti.field(ti.f32)
ti.root.dense(ti.ij, (3, 4)).place(x)
# 相当于：
x = ti.field(ti.f32, shape=(3, 4))
```

你可能会有些疑问，单纯的指定场的 `尺寸(shape)` 不就行了? 为什么还要使用更为复杂的放置方式？ 这是个相当好的问题，接着读下去让我们一起找出原因。

## 行优先 v.s. 列优先

让我们先从最简单的布局开始。

由于地址空间在现代计算机结构中是线性排列的，所以对于 Taichi 中的一维场，第 `i` 个元素的地址就是简单的处于第 `i` 号位置上。

为了存储一个多维场，必须将它扁平化(flatten)，以适应一维地址空间。 例如，要存储一个大小为 `(3, 2)` 的二维场，有两种方法：

1.  第 `(i, j)` 位置的地址是 `起始位置 + i * 2 + j` （行优先）。
2.  第 `(i, j)` 位置的地址是 `起始位置 + j * 3 + i` （列优先）。

下面是在 Taichi 中指定使用以上哪种布局的方式：

```python
ti.root.dense(ti.i, 3).dense(ti.j, 2).place(x)    # （默认）行优先
ti.root.dense(ti.j, 2).dense(ti.i, 3).place(y)    # 列优先
```

`x` 和 `y` 的形状都是 `(3, 2)`，访问它们的下标都满足 `0 <= i < 3 && 0 <= j < 2`的约束。 当然也可以通过相同的下标访问它们：`x[i, j]` 和 `y[i, j]`。 不过它们有着非常不同的内存布局：

```
#     存储地址低 ————————————————————> 存储地址高
# x:  x[0,0]   x[0,1]   x[0,2] | x[1,0]   x[1,1]   x[1,2]
# y:  y[0,0]   y[1,0] | y[0,1]   y[1,1] | y[0,2]   y[1,2]
```

由此可见， `x` 的存储地址首先根据第一个索引下标（即行优先）增加，而 `y` 首先根据第二个索引下标（即列优先）增加。

::: note

对于熟悉 C/C++ 的人来说，这可能看起来像是：

```c
int x[3][2];  // 行优先
int y[2][3];  // 列优先

for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 2; j++) {
        do_something( x[i][j] );
        do_something( y[j][i] );
    }
}
```

:::

## 数组结构体(AoS)，结构体数组(SoA)

同样大小的场可以被放置到一起。

例如，这里在尺寸为 `3` 的一层中放置了两个一维场（数组结构体，AoS）:

```python
ti.root.dense(ti.i, 3).place(x, y)
```

他们的内存布局：

```
#  存储地址低 ————————————————————> 存储地址高
#  x[0]   y[0] | x[1]  y[1] | x[2]   y[2]
```

相反地，下列两个场则被分开放置（结构体数组，SoA）:

```python
ti.root.dense(ti.i, 3).place(x)
ti.root.dense(ti.i, 3).place(y)
```

与之对应，它们的内存布局是：

```
#  存储地址低 ————————————————————> 存储地址高
#  x[0]  x[1]   x[2] | y[0]   y[1]   y[2]
```

通常情况下，你不必担心不同布局之间的性能差别，可以从定义最简单的布局开始。 然而，局部性(locality) 有时会对性能产生重大影响，尤其是当场很大的时候。

**为了改善内存访问的空间局部性(即缓存命中率/ 缓存行利用率)，有时将数据元素放置在相对较近的存储位置（如果它们经常一起被访问的话）会很有帮助。**以一个简单的一维波动方程的求解为例：

```python
N = 200000
pos = ti.field(ti.f32)
vel = ti.field(ti.f32)
ti.root.dense(ti.i, N).place(pos)
ti.root.dense(ti.i, N).place(vel)

@ti.kernel
def step():
    pos[i] += vel[i] * dt
    vel[i] += -k * pos[i] * dt
```

这里，我们将 `pos` 和 `vel` 分开放置。 由此 `pos[i]` 和 `vel[i]` 之间地址空间的距离是 `200000`。 这将导致糟糕的空间局部性和大量的缓存缺失(Cache-Misses)，会在很大程度上降低性能。 一个更好的放置方案是把它们放置在一起：

```python
ti.root.dense(ti.i, N).place(pos, vel)
```

将 `vel[i]` 放在 `pos[i]` 旁边，这样就可以提高缓存命中率，从而提高性能。

## 平面布局 v.s. 层次布局

默认情况下，当分配一个 `ti.var` 时，它遵循的是最简单的数据布局。

```python
val = ti.field(ti.f32, shape=(32, 64, 128))
```

相当于 C++ 中的：

```cpp
float val[32][64][128]
```

但是，对于计算机图形任务而言，有些时候这种数据布局不是最理想的。 例如，`val[i, j, k]` 和 `val[i + 1, j, k]` 彼此之间的距离非常远（`32 KB`），这导致对于某些计算任务会有着低效的地址访问。 具体而言，在诸如纹理的三线性插值之类任务中，这两个元素甚至不在同一 `4KB` 的页面内，这将产生巨大的缓存/转址旁路缓存压力。

此时更好的布局可能是

```python
val = ti.field(ti.f32)
ti.root.dense(ti.ijk, (8, 16, 32)).dense(ti.ijk, (4, 4, 4)).place(val)
```

这会在 `4x4x4` 模块中放置 `val`，因此很有可能有 `val[i, j, k]` 及其邻居在存储上彼此靠近（即，在同一高速缓存行或内存页中））。

## 对高级稠密数据布局进行结构 for 循环

在嵌套稠密数据结构上的结构 for 循环将会自动地遵循它们在内存中的数据顺序。 例如，如果二维标量场 `A` 是以行为主的顺序存储的，

```python
for i, j in A:
    A[i, j] += 1
```

将按照行优先的顺序对 `A` 中的元素进行遍历。 如果 `A` 是列优先的，则按照列优先进行遍历。

如果 `A` 是分层的，则迭代将在层级之间发生。 在大多数情况下，这可以最大化内存带宽利用率。

稀疏张量的结构 for 循环遵循相同的原理，这将在[稀疏计算](./sparse.md)章节中进一步讨论。

## 示例

二维矩阵，行优先

```python
A = ti.field(ti.f32)
ti.root.dense(ti.ij, (256, 256)).place(A)
```

二维矩阵，列优先

```python
A = ti.field(ti.f32)
ti.root.dense(ti.ji, (256, 256)).place(A) # 注意是 ti.ji 而不是 ti.ij
```

_8x8_ 的大小将 _1024x1024_ 的二维数组分块

```python
density = ti.field(ti.f32)
ti.root.dense(ti.ij, (128, 128)).dense(ti.ij, (8, 8)).place(density)
```

三维粒子位置和速度，数组结构体(AoS)

```python
pos = ti.Vector.field(3, dtype=ti.f32)
vel = ti.Vector.field(3, dtype=ti.f32)
ti.root.dense(ti.i, 1024).place(pos, vel)
# 相当于
ti.root.dense(ti.i, 1024).place(pos(0), pos(1), pos(2), vel(0), vel(1), vel(2))
```

三维粒子位置和速度，结构体数组(SoA)

```python
pos = ti.Vector.field(3, dtype=ti.f32)
vel = ti.Vector.field(3, dtype=ti.f32)
for i in range(3):
    ti.root.dense(ti.i, 1024).place(pos(i))
for i in range(3):
    ti.root.dense(ti.i, 1024).place(vel(i))
```
