# 调试

Debugging a parallel program is not easy, so Taichi provides builtin utilities that could hopefully help you debug your Taichi program.

## 在内核中的运行时`print`

```python
print(arg1, ..., sep='', end='\n')
```

Debug your program with `print()` in Taichi-scope. For example: 例如：

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

For now, Taichi-scope `print` supports string, scalar, vector, and matrix expressions as arguments. `print` in Taichi-scope may be a little different from `print` in Python-scope. Please see details below. Taichi 作用域中的`print`可能与 Python 作用域中的`print`略有不同。 请参阅下面的详细信息。

::: warning
For the **CPU and CUDA backend**, `print` will not work in Graphical Python Shells including IDLE and Jupyter notebook. This is because these backends print the outputs to the console instead of the GUI. Use the **OpenGL or Metal backend** if you wish to use `print` in IDLE / Jupyter. ::: 这是因为这些后端将输出打印到控制台而非GUI。 如果你希望在 IDLE/ Jupyter 中使用`print`，请使用**OpenGL 或 Metal 后端**。
:::

::: warning

For the **CUDA backend**, the printed result will not show up until `ti.sync()` is called:

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

Note that host access or program end will also implicitly invoke `ti.sync()`. :::
:::

::: note
Note that `print` in Taichi-scope can only receive **comma-separated parameter**. Neither f-string nor formatted string should be used. For example: 不应使用f-字符串或格式化的字符串。 例如：

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

Sometimes it is useful to print Python-scope objects and constants like data types or SNodes in Taichi-scope. So, similar to `ti.static` we provide `ti.static_print` to print compile-time constants. It is similar to Python-scope `print`. 因此，类似于`ti.static`，我们提供`ti.static_print`来打印编译时常数。 它类似与Python作用域中的`print`。

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

Unlike `print`, `ti.static_print` will only print the expression once at compile-time, and therefore it has no runtime cost.

## 串行执行

Taichi的自动并行化特性有时会导致不确定的行为。 为了方便调试，可能需要串行化程序的执行来获得可重复的结果并诊断数据竞争问题。 The automatic parallelization feature of Taichi may lead to undeterministic behaviors. For debugging purposes, it may be useful to serialize program execution to get repeatable results and to diagnose data races. When running your Taichi program on CPUs, you can initialize Taichi to use a single thread using `cpu_max_num_threads=1`, so that the whole program becomes serial and deterministic. For example, 例如，

`ti.init(arch=ti.cpu, cpu_max_num_threads=1)`

If you program works well in serial but not in parallel, check parallelization-related issues such as data races.

## 在内核中的运行时`assert`

程序员可以在 Taichi 作用域内使用`assert`语句。 Programmers may use `assert` statements in Taichi-scope. When the assertion condition failed, a `RuntimeError` will be raised to indicate the error.

To make `assert` work, first make sure you are using the **CPU backend**. For performance reason, `assert` only works when `debug` mode is on, For example: 其次出于性能方面的考量，`assert`仅在`debug`模式开启时有效，例如：

```python
ti.init(arch=ti.cpu, debug=True)

x = ti.field(ti.f32, 128)

@ti.kernel
def do_sqrt_all():
    for i in x:
        assert x[i] >= 0
        x[i] = ti.sqrt(x)
```

When you are done with debugging, simply set `debug=False`. Now `assert` will be ignored and there will be no runtime overhead. 此时，`assert`将被忽略，并且不会产生运行时开销。

## 编译时`ti.static_assert`

```python
ti.static_assert(cond, msg=None)
```

Like `ti.static_print`, we also provide a static version of `assert`: `ti.static_assert`. It can be useful to make assertions on data types, dimensionality, and shapes. It works whether `debug=True` is specified or not. When an assertion fails, it will raise an `AssertionError`, just like a Python-scope `assert`. 它对数据类型、维度和形状进行断言可能很有用。 无论是否指定`debug=True`，它都有效。 当断言失败时，它将引发一个`AssertionError`，就像 Python 作用域中的 `assert` 一样。

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

我们都知道，Python 提供了一个有用的堆栈回溯系统，它可以帮你轻松定位到问题。 As we all know, Python provides a useful stack traceback system, which could help you locate the issue easily. But sometimes stack tracebacks from **Taichi-scope** could be extremely complicated and hard to read. For example: 例如：

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

You may already feel brain fried by the annoying `decorated`\'s and `__call__`\'s. These are the Taichi internal stack frames. They have almost no benefit for end-users but make the traceback hard to read. 其实这些是Taichi的内部堆栈帧。 直接暴露它们对普通用户几乎没有好处，并且会使回溯日志很难阅读。

For this purpose, we may want to use `ti.init(excepthook=True)`, which _hooks_ on the exception handler, and make the stack traceback from Taichi-scope easier to read and intuitive. e.g.: 例如：

```python {2}
import taichi as ti
ti.init(excepthook=True)  # just add this option!
...
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

我们可以看到， 这里的异常挂钩(exception hook) 已经从回溯中删除了一些无用的 Taichi 内部堆栈帧。 See? Our exception hook has removed some useless Taichi internal frames from traceback. What's more, although not visible in the doc, the output is **colorful**!

::: note
For IPython / Jupyter notebook users, the IPython stack traceback hook will be overriden by the Taichi one when `ti.enable_excepthook()`. :::
:::

## 调试技巧

Debugging a Taichi program can be hard even with the builtin tools above. Here we showcase some common bugs that one may encounter in a Taichi program. 在这里，我们展示了一些 Taichi 程序中可能会遇到的常见错误。

### 静态类型系统

Python code in Taichi-scope is translated into a statically typed language for high performance. This means code in Taichi-scope can have a different behavior compared with that in Python-scope, especially when it comes to types. 这意味着Taichi 作用域中的代码与 Python 作用域中的代码可以有不同的行为，尤其是在类型方面。

The type of a variable is simply **determined at its initialization and never changes later**.

Although Taichi\'s static type system provides better performance, it may lead to bugs if programmers carelessly used the wrong types. For example, 例如，

```python
@ti.kernel
def buggy():
    ret = 0  # 0 is an integer, so `ret` is typed as int32
    for i in range(3):
        ret += 0.1 * i  # i32 += f32, the result is still stored in int32!
    print(ret)  # will show 0

buggy()
    print(ret)  # 会显示 0

buggy()
```

The code above shows a common bug due to Taichi\'s static type system. The Taichi compiler should show a warning like: Taichi编译器应显示以下警告：

```
[W 06/27/20 21:43:51.853] [type_check.cpp:visit@66] [$19] Atomic add (float32 to int32) may lose precision.
```

This means that Taichi cannot store a `float32` result precisely to `int32`. The solution is to initialize `ret` as a float-point value: 解决方案是初始化`ret`作为浮点值：

```python
@ti.kernel
def not_buggy():
    ret = 0.0  # 0 is a floating point number, so `ret` is typed as float32
    for i in range(3):
        ret += 0.1 * i  # f32 += f32. OK!
    print(ret)  # will show 0.6

not_buggy() 成立！
    print(ret)  # 会显示 0.6

not_buggy()
```

### 高级优化

Taichi有一个先进的优化引擎，可以使你的Taichi内核尽可能地快。 但是，就像`gcc -O3`一样，高级优化偶尔也会导致错误，因为它过于努力了。 这包括运行时错误，例如：

`RuntimeError: [verify.cpp:basic_verify@40] stmt 8 cannot have operand 7.`

You may use `ti.init(advanced_optimization=False)` to turn off advanced optimization and see if the issue still exists:

```python {3}
import taichi as ti

ti.init(advanced_optimization=False)
...
```

Whether or not turning off optimization fixes the issue, please feel free to report this bug on [GitHub](https://github.com/taichi-dev/taichi/issues/new?labels=potential+bug&template=bug_report.md). Thank you! 谢谢！
