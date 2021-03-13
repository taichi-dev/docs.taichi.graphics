# Taichi 内核的生命周期

有时了解 Taichi 内核的生命周期会有所帮助。 简而言之，编译只会在第一次调用内核实例时发生。

Taichi 内核的生命周期有如下几个阶段：

- 内核注册
- 模板实例化和缓存
- Python 抽象语法树转换(AST: \[Abstact Syntax Tree\](https://en.wikipedia.org/wiki/Abstract_syntax_tree))
- Taichi 中间表示代码编译，优化和可执行文件生成
- 启动

![image](https://raw.githubusercontent.com/taichi-dev/public_files/fa03e63ca4e161318c8aa9a5db7f4a825604df88/taichi/life_of_kernel.png)

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
**模板签名** 可以区分内核模板的不同实例。 The signature of `add(x, 42)` is `(x, ti.i32)`, which is the same as that of `add(x, 1)`. Therefore, the latter can reuse the previously compiled binary. The signature of `add(y, 42)` is `(y, ti.i32)`, a different value from the previous signature, hence a new kernel will be instantiated and compiled.
:::

::: note
Many basic operations in the Taichi standard library are implemented using Taichi kernels using metaprogramming tricks. Invoking them will incur **implicit kernel instantiations**.

Examples include `x.to_numpy()` and `y.from_torch(torch_tensor)`. When you invoke these functions, you will see kernel instantiations, as Taichi kernels will be generated to offload the hard work to multiple CPU cores/GPUs.

As mentioned before, the second time you call the same operation, the cached compiled kernel will be reused and no further compilation is needed.
:::

## Code transformation and optimizations

When a new instantiation happens, the Taichi frontend compiler (i.e., the `ASTTransformer` Python class) will transform the kernel body AST into a Python script, which, when executed, emits a Taichi frontend AST. Basically, some patches are applied to the Python AST so that the Taichi frontend can recognize it.

The Taichi AST lowering pass translates Taichi frontend IR into hierarchical static single assignment (SSA) IR, which allows a series of further IR passes to happen, such as

- Loop vectorization
- Type inference and checking
- General simplifications such as common subexpression elimination (CSE), dead instruction elimination (DIE), constant folding, and store forwarding
- Access lowering
- Data access optimizations
- Reverse-mode automatic differentiation (if using differentiable programming)
- Parallelization and offloading
- Atomic operation demotion

## The just-in-time (JIT) compilation engine

Finally, the optimized SSA IR is fed into backend compilers such as LLVM or Apple Metal/OpenGL shader compilers. The backend compilers then generate high-performance executable CPU/GPU programs.

## Kernel launching

Taichi kernels will be ultimately launched as multi-threaded CPU tasks or GPU kernels.
