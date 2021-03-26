# Taichi 内核的生命周期

有时了解 Taichi 内核的生命周期会有所帮助。 简而言之，编译只会在第一次调用内核实例时发生。

Taichi 内核的生命周期有如下几个阶段：

- 内核注册
- 模板实例化和缓存
- Python 抽象语法树转换(AST: \[Abstact Syntax Tree\](https://en.wikipedia.org/wiki/Abstract_syntax_tree))
- Taichi 中间表示代码编译，优化和可执行文件生成
- 启动

![图像](https://raw.githubusercontent.com/taichi-dev/public_files/fa03e63ca4e161318c8aa9a5db7f4a825604df88/taichi/life_of_kernel.png)

让我们考虑以下简单内核：

```python
@ti.kernel
def add(field: ti.template(), delta: ti.i32):
    for i in field:
        field[i] += delta
```

我们分配了两个1维张量以简化讨论：

```python
x = ti.field(dtype=ti.f32, shape=128)
y = ti.field(dtype=ti.f32, shape=16)
```

## 内核注册

当执行 `ti.kernel` 装饰器时，将注册一个名为 `add` 的内核。 具体来说，Taichi将记住`add`函数的Python抽象语法树(AST)。 在第一次调用 `add` 之前不会进行编译。

## 模板实例化和缓存

```python
add(x, 42)
```

第一次调用 `add` 时，Taichi前端编译器将实例化内核。

当你以相同的 **模板签名**（稍后说明）进行第二次调用时，例如，

```python
add(x, 1)
```

Taichi将直接重复使用之前编译的二进制文件。

用 `ti.template()` 提示的参数是模板参数，将引起模板实例化。 例如，

```python
add(y, 42)
```

将导致 **add** 的新实例化。

::: note
**模板签名** 可以区分内核模板的不同实例。 `add(x, 42)` 的签名是 `(x, ti.i32)` ，这与 `add(x, 1)` 的签名相同。 因此，后者可以重用之前编译的二进制文件。 `add(y, 42)`的签名是`(y, ti.i32)`，与之前 x 的签名不同，因此一个新的内核将被实例化和编译。
:::

::: note
Taichi 标准库中的许多基本操作都是使用 Taichi 内核和元编程技巧实现的。 调用它们将导致**隐式内核实例化**。

示例包括 `x.to_numpy()` 和 `y.from_torch(torch_tensor)`。 调用这些函数时，你将看到内核实例化，因为Taichi内核们将被生成，以来把繁重的工作分流给多个CPU内核/ GPU。

如前所述，第二次调用相同的操作时，缓存的已编译内核将被重用，并且不需要进一步的编译。
:::

## 代码转换和优化

当一个新的实例化发生时，Taichi 的前端编译器（即 Python 类 `ASTTransformer` ）将把内核函数体的 AST 转换为 Python 脚本，当该脚本执行时会输出一个 Taichi 前端 AST。 大体上讲，由于应用在 Python AST 上的一些补丁，使得 Taichi 前端可以识别它。

AST 的降阶过程 (lowering pass) 会将前端的中间表示代码转换为分层静态单任务 (SSA: \[Static Single Assignment\](https://en. wikipedia. org/wiki/Static_single_assignment_form) 的中间表示代码，从而允许一系列过程更进一步地处理中间表示代码，例如

- 循环矢量化
- 类型推断和检查
- 一般简化，例如通用子表达式消除(CSE)，无效指令消除(DIE)，常数折叠和存储转发
- 降低访问权限
- 数据访问优化
- 反向模式自动微分（如果使用微分编程）
- 并行化和卸载
- 原子操作降级

## 即时（JIT）编译引擎

最后，优化后的 SSA IR 被输入后端编译器，如 LLVM 或 Apple Metal/OpenGL 着色器编译器。 然后后端编译器生成高性能可执行的 CPU/GPU 程序。

## 内核启动

Taichi 内核最终将作为多线程 CPU 任务或 CUDA 内核启动。
