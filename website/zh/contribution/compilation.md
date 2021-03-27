# Taichi 内核的生命周期

Sometimes it is helpful to understand the life cycle of a Taichi kernel. In short, compilation will only happen on the first invocation of an instance of a kernel. 简而言之，编译只会在第一次调用内核实例时发生。

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

当执行 `ti.kernel` 装饰器时，将注册一个名为 `add` 的内核。 When the `ti.kernel` decorator is executed, a kernel named `add` is registered. Specifically, the Python Abstract Syntax Tree (AST) of the `add` function will be memorized. No compilation will happen until the first invocation of `add`. 在第一次调用 `add` 之前不会进行编译。

## 模板实例化和缓存

```python
add(x, 42)
```

When `add` is called for the first time, the Taichi frontend compiler will instantiate the kernel.

When you have a second call with the same **template signature** (explained later), e.g.,

```python
add(x, 1)
```

Taichi将直接重复使用之前编译的二进制文件。

Arguments hinted with `ti.template()` are template arguments, and will incur template instantiation. For example, 例如，

```python
add(y, 42)
```

将导致 **add** 的新实例化。

::: note
**Template signatures** are what distinguish different instantiations of a kernel template. The signature of `add(x, 42)` is `(x, ti.i32)`, which is the same as that of `add(x, 1)`. Therefore, the latter can reuse the previously compiled binary. The signature of `add(y, 42)` is `(y, ti.i32)`, a different value from the previous signature, hence a new kernel will be instantiated and compiled. ::: `add(x, 42)` 的签名是 `(x, ti.i32)` ，这与 `add(x, 1)` 的签名相同。 因此，后者可以重用之前编译的二进制文件。 `add(y, 42)`的签名是`(y, ti.i32)`，与之前 x 的签名不同，因此一个新的内核将被实例化和编译。
:::

::: note
Many basic operations in the Taichi standard library are implemented using Taichi kernels using metaprogramming tricks. Invoking them will incur **implicit kernel instantiations**. 调用它们将导致**隐式内核实例化**。

示例包括 `x.to_numpy()` 和 `y.from_torch(torch_tensor)`。 Examples include `x.to_numpy()` and `y.from_torch(torch_tensor)`. When you invoke these functions, you will see kernel instantiations, as Taichi kernels will be generated to offload the hard work to multiple CPU cores/GPUs.

As mentioned before, the second time you call the same operation, the cached compiled kernel will be reused and no further compilation is needed. :::
:::

## 代码转换和优化

When a new instantiation happens, the Taichi frontend compiler (i.e., the `ASTTransformer` Python class) will transform the kernel body AST into a Python script, which, when executed, emits a Taichi frontend AST. Basically, some patches are applied to the Python AST so that the Taichi frontend can recognize it. 大体上讲，由于应用在 Python AST 上的一些补丁，使得 Taichi 前端可以识别它。

The Taichi AST lowering pass translates Taichi frontend IR into hierarchical static single assignment (SSA) IR, which allows a series of further IR passes to happen, such as

- 循环矢量化
- 类型推断和检查
- General simplifications such as common subexpression elimination (CSE), dead instruction elimination (DIE), constant folding, and store forwarding
- 降低访问权限
- 数据访问优化
- Reverse-mode automatic differentiation (if using differentiable programming)
- 并行化和卸载
- 原子操作降级

## 即时（JIT）编译引擎

Finally, the optimized SSA IR is fed into backend compilers such as LLVM or Apple Metal/OpenGL shader compilers. The backend compilers then generate high-performance executable CPU/GPU programs. 然后后端编译器生成高性能可执行的 CPU/GPU 程序。

## 内核启动

Taichi kernels will be ultimately launched as multi-threaded CPU tasks or GPU kernels.
