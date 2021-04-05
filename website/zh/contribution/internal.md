# 内部设计（WIP）

## 中间表示（Intermediate representation）

使用 `ti.init(print_ir=True)` 来将中间表示代码输出到控制台。

查看 [Taichi 内核的生命周期](./compilation.md) 来了解更多关于 Taichi 的 JIT 系统的详细信息。

## 数据结构组织

Taichi 的数据结构的内部组织可能会令人困惑。 区分 **容器(containers)**、 **单元(cells)**、 和 **单元(components)** 的概念是很重要的。

- 一个**容器(container)** 可以有多个 **单元(cells)**。 我们推荐使用2的幂次方作为**单元(cells)** 的数量。
- 一个**单元(cell)** 可以有多个**组件(components)**。
- 每个**组件(component)**都是一个较低级别的 SNode 的一个**容器(container)**。

请注意， `place` SNodes 的容器有单元。 相反，它们直接包含数值。

请考虑下面的示例：

```python
# misc/listgen_demo.py

x = ti.field(ti.i32)
y = ti.field(ti.i32)
z = ti.field(ti.i32)

S0 = ti.root
S1 = S0.pointer(ti.i, 4)

S2 = S1.dense(ti.i, 2)
S2.place(x, y) # S3: x; S4: y

S5 = S1.dense(ti.i, 2)
S5.place(z) # S6: z
```

- The whole data structure is an `S0root` **container**, containing
  - `1x` `S0root` **cell**, which has only one **component**, which is
    - An `S1pointer` **container**, containing
      - 4x `S1pointer` **cells**, each with two **components**, which are
        - An `S2dense` **container**, containing
          - 2x `S2dense` **cells**, each with two **components**, which are
            - An `S3place_x` container which directly contains a `x: ti.i32` value
            - An `S4place_y` container which directly contains a `y: ti.i32` value
        - An `S5dense` **container**, containing
          - 2x `S5dense` **cells**, each with one **component**, which is
            - An `S6place` container which directly contains a `z: ti.i32` value

The following figure shows the hierarchy of the data structure. The numbers are `indices` of the containers and cells.

![图像](https://raw.githubusercontent.com/taichi-dev/public_files/fa03e63ca4e161318c8aa9a5db7f4a825604df88/taichi/data_structure_organization.png)

Note that the `S0root` container and cell do not have an `index`.

In summary, we will have the following containers:

- `1 S0root` container
- `1 S1pointer` container
- `4 S2dense` containers
- `4 S5dense` containers
- `8 S3place_x` containers, each directly contains an `i32` value
- `8 S4place_y` containers, each directly contains an `i32` value
- `8 S6place_z` containers, each directly contains an `i32` value

... and the following cells:

- `1 S0root` cell
- `4 S1pointer` cells
- `8 S2dense` cells
- `8 S5dense` cells

Again, note that `S3place_x, S4place_x, S6place_x` SNodes do **not** have corresponding cells.

In struct compilers, each SNode has two types: `container` type and `cell` type. **Components** of a higher level SNode **cell** are **containers** of a lower level SNode.

Note that **cells** are never exposed to end-users.

**List generation** generates lists of SNode **containers** (instead of SNode **cells**).

::: note
We are on our way to remove usages of **children**, **instances**, and **elements** in Taichi. These are very ambiguous terms.
:::

## 表生成 (WIP)

Taichi 中的结构 for 循环会以**并行**的方式遍历一个稀疏数据结构中的所有活跃元素。 这把“在稀疏数据结构中均匀分配负载到处理器核心上”这一任务变得十分具有挑战性。具体来说，简单地把一个不规则树分片很容易产生数个叶节点数量严重不均衡的分区。

对此，我们的策略是循序渐进地对于每一层生成（对于该层）活跃的 SNode。 这个表的生成计算将发生在和正常计算内核相同的设备上，并且具体取决于在用户调用 `ti.init` 函数时所提供的 `arch` 参数。

表的生成将会把数据结构的叶节点展平成一维的稠密数组，并因此规避不完整树的不规则性。 然后，我们就可以直接在表上调用一个正常的**并行 for** 循环。

例如，

```python
# misc/listgen_demo.py

import taichi as ti

ti.init(print_ir=True)

x = ti.field(ti.i32)

S0 = ti.root
S1 = S0.dense(ti.i, 4)
S2 = S1.bitmasked(ti.i, 4)
S2.place(x)

@ti.kernel
def func():
    for i in x:
        print(i)

func()
```

以上的代码会生成下面的中间表示（IR）

```
$0 = offloaded clear_list S1dense
$1 = offloaded listgen S0root->S1dense
$2 = offloaded clear_list S2bitmasked
$3 = offloaded listgen S1dense->S2bitmasked
$4 = offloaded struct_for(S2bitmasked) block_dim=0 {
  <i32 x1> $5 = loop index 0
  print i, $5
}
```

请注意， `func` 的使用会生成以下两个表：

- （任务 `$0` 和 `$1`）基于 `root` 节点 （`S0`）的表会生成一个关于 `dense` 节点们（`S1`）的表；
- （任务 `$2` 和 `$3`）基于 `dense` 节点们（`S1`）的表会生成一个关于 `bitmasked` 节点们（`S2`）的表。

关于 `root` 节点的表总会有且仅有一个元素（实例），所以我们永远不会去清空或者重新生成这个表。

::: note

关于 `place` （叶）节点的表 （比如说，在这个例子里它是 `S3`)，永远不会被生成。 相反，我们可以遍历关于这些节点的父节点们的表，并且于每个父节点，我们（在不生成额外的表的情况下）直接遍历所有 `place`节点。

这种设计的初衷是去平摊生成表所带来的额外开销。 因为去对于每个叶节点（`place` SNode）生成一个表元素会带来过多的开销，并且这些开销极有可能大大超过在叶元素本身上进行的必要的计算。 所以，我们选择只生成和这些叶节点的父节点相关的的元素表，这样就能把生成表所带来的开销平摊到多个倒数第二层的 SNode 元素的子元素上。

在上面的例子中，虽然我们有 `16` 个关于 `x` 的实例，但是我们只生成了 `4` 个 `bitmasked` 节点（和 `1` 个 `dense` 节点）。
:::

## 统计量

在某些情况下，在 Taichi 程序的执行过程中，收集关于内部事件的特定的量化信息是很用帮助的。 `Statistics` 类就是为此设计的。

用法：

```cpp
#include "taichi/util/statistics.h"

// 将 1.0 加到计数器 "codegen_offloaded_tasks"
taichi::stat.add("codegen_offloaded_tasks");

// 将“中间表示”中语句的数量加到计数器 "codegen_statements"
taichi::stat.add("codegen_statements", irpass::analysis::count_statements(this->ir));
```

注意键为 `std::string` 而值类型为 `double`。

在 Python 中使用如下方式来打印出所有的统计量：

```python
ti.core.print_stat()
```

## 为什么使用 Python 作为前端语言

将 Taichi 嵌入到 `Python` 中有以下优点：

- 易于学习。 Taichi 的语法与 Python 非常相似。
- 易于运行。 不需要运行前编译（ahead-of-time compilation）。
- 这样的设计使用户可以重复利用已有的 Python 基础架构：
  - 集成开发环境（IDEs）。 大部分 Python 的集成开发环境提供的语法高亮，语法检查和自动补全功能可以用于 Taichi。
  - 包管理器（pip）。 开发好的 Taichi 程序可以被简单地提交至 `PyPI` 并且其他用户可以轻松地使用 `pip` 安装它。
  - 现有的包。 用户可以很轻松地与其他 Python 组件（例如 `matplotlib` 和 `numpy`）交互。
- 只要内核主体可以被 Python 的解析器解析，那么 `Python` 内置的处理抽象语法树（AST）的工具让我们可以做一些奇妙的事情。

但是，这样的设计同样存在一些不足之处：

- Taichi 内核必须能被 Python 解析器解析。 这意味着 Taichi 的语法不能超出 Python 的语法范畴。
  - 例如，访问 Taichi 场时，即使场是 0 维度也必须使用索引来访问其元素。 如果 `x` 是 0 维的，需要使用 `x[None] = 123` 来给 `x` 中的量赋值。 这是因为在 Python 语法中， `x = 123` 将会将 `x` 本身（而不是它包含的值）设为常数 `123`，不幸的是，我们无法更改这种行为。
- Python 的性能相对较为低下。 这在使用纯 Python 脚本初始化较大 Taichi 场时会导致一些性能问题。 初始化较大的场时必须使用 Taichi 内核。

## Virtual indices v.s. physical indices

In Taichi, _virtual indices_ are used to locate elements in fields, and _physical indices_ are used to specify data layouts in memory.

For example,

- In `a[i, j, k]`, `i`, `j`, and `k` are **virtual** indices.
- In `for i, j in x:`, `i` and `j` are **virtual** indices.
- `ti.i, ti.j, ti.k, ti.l, ...` are **physical** indices.
- In struct-for statements, `LoopIndexStmt::index` is a **physical** index.

The mapping between virtual indices and physical indices for each `SNode` is stored in `SNode::physical_index_position`. I.e., `physical_index_position[i]` answers the question: **which physical index does the i-th virtual index** correspond to?

Each `SNode` can have a different virtual-to-physical mapping. `physical_index_position[i] == -1` means the `i`-th virtual index does not corrspond to any physical index in this `SNode`.

`SNode` s in handy dense fields (i.e., `a = ti.field(ti.i32, shape=(128, 256, 512))`) have **trivial** virtual-to-physical mapping, e.g. `physical_index_position[i] = i`.

However, more complex data layouts, such as column-major 2D fields can lead to `SNodes` with `physical_index_position[0] = 1` and `physical_index_position[1] = 0`.

```python
a = ti.field(ti.f32, shape=(128, 32, 8))

b = ti.field(ti.f32)
ti.root.dense(ti.j, 32).dense(ti.i, 16).place(b)

ti.get_runtime().materialize()

mapping_a = a.snode().physical_index_position()

assert mapping_a == {0: 0, 1: 1, 2: 2}

mapping_b = b.snode().physical_index_position()

assert mapping_b == {0: 1, 1: 0}
# Note that b is column-major:
# the virtual first index exposed to the user comes second in memory layout.
```

Taichi supports up to 8 (`constexpr int taichi_max_num_indices = 8`) virtual indices and physical indices.
