# 调试

调试并行程序并不容易，因此Taichi提供了内置的支持，希望能帮助你更方便地调试Taichi程序。

## 在内核中的运行时`print`

```python
print(arg1, ..., sep='', end='\n')
```

在 Taichi 作用域内用 `print()` 调试程序。 例如：

```python {1}
@ti.kernel
def inside_taichi_scope():
    x = 233
    print('hello', x)
    #=> hello 233

    print('hello', x * 2 + 200)
    #=> hello 666

    print('hello', x, sep='')
    #=> hello233

    print('hello', x, sep='', end='')
    print('world', x, sep='')
    #=> hello233world233

    m = ti.Matrix([[2, 3, 4], [5, 6, 7]])
    print('m =', m)
    #=> m = [[2, 3, 4], [5, 6, 7]]

    v = ti.Vector([3, 4])
    print('v =', v)
    #=> v = [3, 4]
```

目前，Taichi 作用域的 `print`支持字符串、标量、向量和矩阵表达式作为参数。 Taichi 作用域中的`print`可能与 Python 作用域中的`print`略有不同。 请参阅下面的详细信息。

::: warning
对于 **CPU 和 CUDA 后端**, `print` 在图形化的 Python 界面中（包括 IDLE 和 Jupyter notebook）不起作用。 这是因为这些后端将输出打印到控制台而非GUI。 如果你希望在 IDLE/ Jupyter 中使用`print`，请使用**OpenGL 或 Metal 后端**。
:::

::: warning

对于**CUDA 后端**，打印的结果不会显示，直到`ti.sync()`被调用“

```python
import taichi as ti
ti.init(arch=ti.cuda)

@ti.kernel
def kern():
    print('inside kernel')

print('before kernel')
kern()
print('after kernel')
ti.sync()
print('after sync')
```

得到：

```
before kernel
after kernel
inside kernel
after sync
```

请注意，主机访问或程序终止也将隐式地触发`ti.sync()`。
:::

::: note
注意Taichi作用域中的`print` 只能接受 **逗号分隔的参数**。 不应使用f-字符串或格式化的字符串。 例如：

```python {9-11}
import taichi as ti
ti.init(arch=ti.cpu)
a = ti.field(ti.f32, 4)


@ti.kernel
def foo():
    a[0] = 1.0
    print('a[0] = ', a[0]) # 正确
    print(f'a[0] = {a[0]}') # 错误, 不支持f-字符创
    print("a[0] = %f" % a[0]) # 错误, 不支持格式化的字符串

foo()
```

:::

## 编译时`ti.static_print`

有时，在Taichi 作用域中打印 Python 作用域的对象和常量（如数据类型或 SNodes）非常有用。 因此，类似于`ti.static`，我们提供`ti.static_print`来打印编译时常数。 它类似与Python作用域中的`print`。

```python
x = ti.field(ti.f32, (2, 3))
y = 1

@ti.kernel
def inside_taichi_scope():
    ti.static_print(y)
    # => 1
    ti.static_print(x.shape)
    # => (2, 3)
    ti.static_print(x.dtype)
    # => DataType.float32
    for i in range(4):
            ti.static_print(i.dtype)
            # => DataType.int32
            # 只会打印一次
```

与`print`不同，`ti.static_print`在编译时只打印一次表达式，因此没有运行时成本。

## 串行执行

Taichi的自动并行化特性有时会导致不确定的行为。 为了方便调试，可能需要串行化程序的执行来获得可重复的结果并诊断数据竞争问题。 当在CPU上运行你的Taichi程序时，你可以使用`cpu_max_num_threads=1`来初始化Taichi来使用单线程，这样整个程序就变为串行的和确定性的。 例如，

`ti.init(arch=ti.cpu, cpu_max_num_threads=1)`

如果你的程序在串行时表现良好但并行时出现了问题，请检查并行相关的问题，例如数据竞争。

## 在内核中的运行时`assert`

程序员可以在 Taichi 作用域内使用`assert`语句。 当断言的条件失败时，一个`RuntimeError`会被触发以指示错误。

若要使`assert`正常工作，首先请确保使用**CPU后端**运行程序。 其次出于性能方面的考量，`assert`仅在`debug`模式开启时有效，例如：

```python
ti.init(arch=ti.cpu, debug=True)

x = ti.field(ti.f32, 128)

@ti.kernel
def do_sqrt_all():
    for i in x:
        assert x[i] >= 0
        x[i] = ti.sqrt(x)
```

完成调试后，只需设置`debug=False`。 此时，`assert`将被忽略，并且不会产生运行时开销。

## 编译时`ti.static_assert`

```python
ti.static_assert(cond, msg=None)
```

与 `ti.static_print` 类似，我们还提供了 `assert` 的静态版本：`ti.static_assert`。 它对数据类型、维度和形状进行断言可能很有用。 无论是否指定`debug=True`，它都有效。 当断言失败时，它将引发一个`AssertionError`，就像 Python 作用域中的 `assert` 一样。

例如：

```python
@ti.func
def copy(dst: ti.template(), src: ti.template()):
    ti.static_assert(dst.shape == src.shape, "copy() needs src and dst fields to be same shape")
    for I in ti.grouped(src):
        dst[I] = src[I]
    return x % 2 == 1
```

## 优雅的 Taichi 作用域的栈回溯

我们都知道，Python 提供了一个有用的堆栈回溯系统，它可以帮你轻松定位到问题。 但有时 **Taichi 作用域** 的堆栈回溯(stack traceback) 日志可能极其复杂且难以阅读。 例如：

```python
import taichi as ti
ti.init()

@ti.func
def func3():
    ti.static_assert(1 + 1 == 3)

@ti.func
def func2():
    func3()

@ti.func
def func1():
    func2()

@ti.kernel
def func0():
    func1()

func0()
```

当然，运行此代码将导致`AssertionError`错误：

```
Traceback (most recent call last):
  File "misc/demo_excepthook.py", line 20, in <module>
    func0()
  File "/root/taichi/python/taichi/lang/kernel.py", line 559, in wrapped
    return primal(*args, **kwargs)
  File "/root/taichi/python/taichi/lang/kernel.py", line 488, in __call__
    self.materialize(key=key, args=args, arg_features=arg_features)
  File "/root/taichi/python/taichi/lang/kernel.py", line 367, in materialize
    taichi_kernel = taichi_kernel.define(taichi_ast_generator)
  File "/root/taichi/python/taichi/lang/kernel.py", line 364, in taichi_ast_generator
    compiled()
  File "misc/demo_excepthook.py", line 18, in func0
    func1()
  File "/root/taichi/python/taichi/lang/kernel.py", line 39, in decorated
    return fun.__call__(*args)
  File "/root/taichi/python/taichi/lang/kernel.py", line 79, in __call__
    ret = self.compiled(*args)
  File "misc/demo_excepthook.py", line 14, in func1
    func2()
  File "/root/taichi/python/taichi/lang/kernel.py", line 39, in decorated
    return fun.__call__(*args)
  File "/root/taichi/python/taichi/lang/kernel.py", line 79, in __call__
    ret = self.compiled(*args)
  File "misc/demo_excepthook.py", line 10, in func2
    func3()
  File "/root/taichi/python/taichi/lang/kernel.py", line 39, in decorated
    return fun.__call__(*args)
  File "/root/taichi/python/taichi/lang/kernel.py", line 79, in __call__
    ret = self.compiled(*args)
  File "misc/demo_excepthook.py", line 6, in func3
    ti.static_assert(1 + 1 == 3)
  File "/root/taichi/python/taichi/lang/error.py", line 14, in wrapped
    return foo(*args, **kwargs)
  File "/root/taichi/python/taichi/lang/impl.py", line 252, in static_assert
    assert cond
AssertionError
```

分析诸如 `decorated` 和 `__call__` 之类晦涩的信息有时会让人感到异常困难和烦躁。 其实这些是Taichi的内部堆栈帧。 直接暴露它们对普通用户几乎没有好处，并且会使回溯日志很难阅读。

为此，我们可能希望使用`ti.init(excepthook=True)`，这会与异常处理程序_挂钩(hook)_，从而使 Taichi 作用域中的堆栈回溯日志更直观且易于阅读。 例如：

```python {2}
import taichi as ti
ti.init(excepthook=True)  # 简单地传入这个选项!
...
```

这样结果会是：

```python
========== Taichi Stack Traceback ==========
In <module>() at misc/demo_excepthook.py:21:
--------------------------------------------
@ti.kernel
def func0():
    func1()

func0()  <--
--------------------------------------------
In func0() at misc/demo_excepthook.py:19:
--------------------------------------------
    func2()

@ti.kernel
def func0():
    func1()  <--

func0()
--------------------------------------------
In func1() at misc/demo_excepthook.py:15:
--------------------------------------------
    func3()

@ti.func
def func1():
    func2()  <--

@ti.kernel
--------------------------------------------
In func2() at misc/demo_excepthook.py:11:
--------------------------------------------
    ti.static_assert(1 + 1 == 3)

@ti.func
def func2():
    func3()  <--

@ti.func
--------------------------------------------
In func3() at misc/demo_excepthook.py:7:
--------------------------------------------
ti.enable_excepthook()

@ti.func
def func3():
    ti.static_assert(1 + 1 == 3)  <--

@ti.func
--------------------------------------------
AssertionError
```

我们可以看到， 这里的异常挂钩(exception hook) 已经从回溯中删除了一些无用的 Taichi 内部堆栈帧。 更重要的是，虽然在文档中不可见，但这些输出都是 **彩色** 的！

::: note
For IPython / Jupyter notebook users, the IPython stack traceback hook will be overriden by the Taichi one when `ti.enable_excepthook()`.
:::

## Debugging Tips

Debugging a Taichi program can be hard even with the builtin tools above. Here we showcase some common bugs that one may encounter in a Taichi program.

### Static type system

Python code in Taichi-scope is translated into a statically typed language for high performance. This means code in Taichi-scope can have a different behavior compared with that in Python-scope, especially when it comes to types.

The type of a variable is simply **determined at its initialization and never changes later**.

Although Taichi\'s static type system provides better performance, it may lead to bugs if programmers carelessly used the wrong types. For example,

```python
@ti.kernel
def buggy():
    ret = 0  # 0 is an integer, so `ret` is typed as int32
    for i in range(3):
        ret += 0.1 * i  # i32 += f32, the result is still stored in int32!
    print(ret)  # will show 0

buggy()
```

The code above shows a common bug due to Taichi\'s static type system. The Taichi compiler should show a warning like:

```
[W 06/27/20 21:43:51.853] [type_check.cpp:visit@66] [$19] Atomic add (float32 to int32) may lose precision.
```

This means that Taichi cannot store a `float32` result precisely to `int32`. The solution is to initialize `ret` as a float-point value:

```python
@ti.kernel
def not_buggy():
    ret = 0.0  # 0 is a floating point number, so `ret` is typed as float32
    for i in range(3):
        ret += 0.1 * i  # f32 += f32. OK!
    print(ret)  # will show 0.6

not_buggy()
```

### Advanced Optimization

Taichi has an advanced optimization engine to make your Taichi kernel to be as fast as it could. But like what `gcc -O3` does, advanced optimization may occasionally lead to bugs as it tries too hard. This includes runtime errors such as:

`RuntimeError: [verify.cpp:basic_verify@40] stmt 8 cannot have operand 7.`

You may use `ti.init(advanced_optimization=False)` to turn off advanced optimization and see if the issue still exists:

```python {3}
import taichi as ti

ti.init(advanced_optimization=False)
...
```

Whether or not turning off optimization fixes the issue, please feel free to report this bug on [GitHub](https://github.com/taichi-dev/taichi/issues/new?labels=potential+bug&template=bug_report.md). Thank you!
